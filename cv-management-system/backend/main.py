from fastapi import FastAPI, UploadFile, File, Depends, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List, Optional
import base64

from database import get_db, init_db, engine
from models import CVModel
from schemas import CVResponse, CreateCandidateSchema, UpdateCandidateSchema
from cv_parser import CVParser

# Initialize FastAPI app
app = FastAPI(
    title="CV Management System API",
    description="API pour la gestion des candidatures avec extraction automatique des CV",
    version="1.0.0"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify exact origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize CV Parser
cv_parser = CVParser()

# Initialize database on startup
@app.on_event("startup")
async def startup_event():
    init_db()

# Health Check Endpoint
@app.get("/health")
async def health_check():
    """Check API and database status"""
    try:
        # Test database connection
        engine.connect()
        return {
            "status": "healthy",
            "api": "operational",
            "database": "connected"
        }
    except Exception as e:
        return {
            "status": "unhealthy",
            "api": "operational",
            "database": "disconnected",
            "error": str(e)
        }

# CV Upload and Extraction Endpoint
@app.post("/api/upload-cv", response_model=CVResponse)
async def upload_cv(
    file: UploadFile = File(...),
    save: bool = Query(False, description="Save to database if true"),
    db: Session = Depends(get_db)
):
    """
    Upload and parse CV file
    - If save=false: Only extract and return data (no database save)
    - If save=true: Extract and save to database
    """
    # Validate file size (10MB max)
    MAX_FILE_SIZE = 10 * 1024 * 1024  # 10MB
    file_content = await file.read()
    
    if len(file_content) > MAX_FILE_SIZE:
        raise HTTPException(status_code=400, detail="Fichier trop volumineux. Taille maximum: 10MB")
    
    # Validate file type
    allowed_types = [
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/msword',
        'text/plain',
        'image/jpeg',
        'image/jpg',
        'image/png'
    ]
    
    if file.content_type not in allowed_types:
        raise HTTPException(
            status_code=400,
            detail=f"Type de fichier non supporté. Types acceptés: PDF, DOCX, TXT, JPG, JPEG, PNG"
        )
    
    # Parse CV
    try:
        extracted_data = cv_parser.parse_file(file_content, file.filename, file.content_type)
        
        if "error" in extracted_data:
            raise HTTPException(status_code=400, detail=extracted_data["error"])
        
        # If save=true, create candidate in database
        if save:
            # Check if email already exists
            if 'email' in extracted_data:
                existing = db.query(CVModel).filter(CVModel.email == extracted_data['email']).first()
                if existing:
                    raise HTTPException(status_code=400, detail="Un candidat avec cet email existe déjà")
            
            # Create new candidate
            new_candidate = CVModel(**{k: v for k, v in extracted_data.items() if k != 'auto_filled_fields'})
            db.add(new_candidate)
            db.commit()
            db.refresh(new_candidate)
            
            response = CVResponse.from_orm(new_candidate)
            response.auto_filled_fields = extracted_data.get('auto_filled_fields', [])
            return response
        else:
            # Return extracted data without saving
            return CVResponse(**extracted_data)
            
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erreur lors du traitement du CV: {str(e)}")

# Create Candidate Manually
@app.post("/api/create-candidate", response_model=CVResponse)
async def create_candidate(
    candidate: CreateCandidateSchema,
    db: Session = Depends(get_db)
):
    """Create a new candidate manually"""
    # Check if email already exists
    existing = db.query(CVModel).filter(CVModel.email == candidate.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Un candidat avec cet email existe déjà")
    
    # Create new candidate
    new_candidate = CVModel(**candidate.dict())
    db.add(new_candidate)
    db.commit()
    db.refresh(new_candidate)
    
    return CVResponse.from_orm(new_candidate)

# Get Single Candidate
@app.get("/api/cv/{cv_id}", response_model=CVResponse)
async def get_candidate(cv_id: int, db: Session = Depends(get_db)):
    """Get details of a specific candidate"""
    candidate = db.query(CVModel).filter(CVModel.id == cv_id).first()
    
    if not candidate:
        raise HTTPException(status_code=404, detail="Candidat non trouvé")
    
    return CVResponse.from_orm(candidate)

# Update Candidate
@app.put("/api/update-cv/{cv_id}", response_model=CVResponse)
async def update_candidate(
    cv_id: int,
    candidate_update: UpdateCandidateSchema,
    db: Session = Depends(get_db)
):
    """Update candidate information"""
    candidate = db.query(CVModel).filter(CVModel.id == cv_id).first()
    
    if not candidate:
        raise HTTPException(status_code=404, detail="Candidat non trouvé")
    
    # Update only provided fields
    update_data = candidate_update.dict(exclude_unset=True)
    
    # Check if email is being changed and if it already exists
    if 'email' in update_data and update_data['email'] != candidate.email:
        existing = db.query(CVModel).filter(CVModel.email == update_data['email']).first()
        if existing:
            raise HTTPException(status_code=400, detail="Un candidat avec cet email existe déjà")
    
    for key, value in update_data.items():
        setattr(candidate, key, value)
    
    db.commit()
    db.refresh(candidate)
    
    return CVResponse.from_orm(candidate)

# Delete Candidate
@app.delete("/api/cv/{cv_id}")
async def delete_candidate(cv_id: int, db: Session = Depends(get_db)):
    """Delete a candidate"""
    candidate = db.query(CVModel).filter(CVModel.id == cv_id).first()
    
    if not candidate:
        raise HTTPException(status_code=404, detail="Candidat non trouvé")
    
    db.delete(candidate)
    db.commit()
    
    return {"message": "Candidat supprimé avec succès", "id": cv_id}

# List All Candidates
@app.get("/api/cvs", response_model=List[CVResponse])
async def list_candidates(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=100),
    db: Session = Depends(get_db)
):
    """List all candidates with pagination"""
    candidates = db.query(CVModel).offset(skip).limit(limit).all()
    return [CVResponse.from_orm(c) for c in candidates]

# Search Candidates
@app.get("/api/search-cv", response_model=List[CVResponse])
async def search_candidates(
    name: Optional[str] = Query(None, description="Search by first or last name"),
    email: Optional[str] = Query(None, description="Search by email"),
    db: Session = Depends(get_db)
):
    """Search candidates by name or email"""
    query = db.query(CVModel)
    
    if name:
        query = query.filter(
            (CVModel.prenom.contains(name)) | (CVModel.nom.contains(name))
        )
    
    if email:
        query = query.filter(CVModel.email.contains(email))
    
    candidates = query.all()
    return [CVResponse.from_orm(c) for c in candidates]

# Debug Endpoint - Get All CV IDs
@app.get("/api/debug/cv-ids")
async def get_cv_ids(db: Session = Depends(get_db)):
    """Get all CV IDs for debugging"""
    candidates = db.query(CVModel.id, CVModel.prenom, CVModel.nom, CVModel.email).all()
    return {
        "count": len(candidates),
        "candidates": [
            {"id": c.id, "prenom": c.prenom, "nom": c.nom, "email": c.email}
            for c in candidates
        ]
    }

# Root endpoint
@app.get("/")
async def root():
    """Root endpoint with API information"""
    return {
        "message": "CV Management System API",
        "version": "1.0.0",
        "endpoints": {
            "health": "/health",
            "upload_cv": "/api/upload-cv",
            "create_candidate": "/api/create-candidate",
            "get_candidate": "/api/cv/{id}",
            "update_candidate": "/api/update-cv/{id}",
            "delete_candidate": "/api/cv/{id}",
            "list_candidates": "/api/cvs",
            "search_candidates": "/api/search-cv"
        }
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
