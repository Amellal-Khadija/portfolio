from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List, Dict
from datetime import datetime

# Base Schemas
class ExperienceSchema(BaseModel):
    entreprise: Optional[str] = None
    poste: Optional[str] = None
    date_debut: Optional[str] = None
    date_fin: Optional[str] = None
    description: Optional[str] = None

class FormationSchema(BaseModel):
    etablissement: Optional[str] = None
    diplome: Optional[str] = None
    date_debut: Optional[str] = None
    date_fin: Optional[str] = None
    description: Optional[str] = None

class LangueSchema(BaseModel):
    langue: Optional[str] = None
    niveau: Optional[str] = None

# CV Response Schema
class CVResponse(BaseModel):
    id: Optional[int] = None
    prenom: Optional[str] = None
    nom: Optional[str] = None
    email: Optional[str] = None
    telephone: Optional[str] = None
    profil_linkedin: Optional[str] = None
    photo_base64: Optional[str] = None
    has_photo: bool = False
    niveau_etude: Optional[str] = None
    experience: Optional[str] = None
    poste_actuel: Optional[str] = None
    disponibilite: Optional[str] = None
    salaire_actuel: Optional[float] = None
    salaire_souhaite: Optional[float] = None
    evaluation: int = 0
    commentaires: Optional[str] = None
    informations_supplementaires: Optional[str] = None
    experiences: Optional[List[Dict]] = None
    formations: Optional[List[Dict]] = None
    competences: Optional[List[str]] = None
    langues: Optional[List[Dict]] = None
    tags: Optional[List[str]] = None
    cv_original: Optional[str] = None
    date_creation: Optional[datetime] = None
    date_modification: Optional[datetime] = None
    auto_filled_fields: Optional[List[str]] = []

    class Config:
        from_attributes = True

# Create Candidate Schema
class CreateCandidateSchema(BaseModel):
    prenom: str = Field(..., min_length=1, max_length=100)
    nom: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    telephone: Optional[str] = Field(None, max_length=50)
    profil_linkedin: Optional[str] = Field(None, max_length=500)
    photo_base64: Optional[str] = None
    has_photo: bool = False
    niveau_etude: Optional[str] = Field(None, max_length=100)
    experience: Optional[str] = Field(None, max_length=100)
    poste_actuel: Optional[str] = Field(None, max_length=200)
    disponibilite: Optional[str] = Field(None, max_length=100)
    salaire_actuel: Optional[float] = None
    salaire_souhaite: Optional[float] = None
    evaluation: int = Field(0, ge=0, le=5)
    commentaires: Optional[str] = None
    informations_supplementaires: Optional[str] = None
    experiences: Optional[List[Dict]] = None
    formations: Optional[List[Dict]] = None
    competences: Optional[List[str]] = None
    langues: Optional[List[Dict]] = None
    tags: Optional[List[str]] = None
    cv_original: Optional[str] = None

# Update Candidate Schema
class UpdateCandidateSchema(BaseModel):
    prenom: Optional[str] = Field(None, min_length=1, max_length=100)
    nom: Optional[str] = Field(None, min_length=1, max_length=100)
    email: Optional[EmailStr] = None
    telephone: Optional[str] = Field(None, max_length=50)
    profil_linkedin: Optional[str] = Field(None, max_length=500)
    photo_base64: Optional[str] = None
    has_photo: Optional[bool] = None
    niveau_etude: Optional[str] = Field(None, max_length=100)
    experience: Optional[str] = Field(None, max_length=100)
    poste_actuel: Optional[str] = Field(None, max_length=200)
    disponibilite: Optional[str] = Field(None, max_length=100)
    salaire_actuel: Optional[float] = None
    salaire_souhaite: Optional[float] = None
    evaluation: Optional[int] = Field(None, ge=0, le=5)
    commentaires: Optional[str] = None
    informations_supplementaires: Optional[str] = None
    experiences: Optional[List[Dict]] = None
    formations: Optional[List[Dict]] = None
    competences: Optional[List[str]] = None
    langues: Optional[List[Dict]] = None
    tags: Optional[List[str]] = None

    class Config:
        from_attributes = True
