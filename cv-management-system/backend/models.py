from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text, DECIMAL, JSON
from database import Base
from datetime import datetime

class CVModel(Base):
    __tablename__ = "cv_model"
    
    # Primary Key
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    
    # Personal Information (Required)
    prenom = Column(String(100), nullable=False)
    nom = Column(String(100), nullable=False)
    email = Column(String(255), unique=True, nullable=False, index=True)
    telephone = Column(String(50), nullable=True)
    profil_linkedin = Column(String(500), nullable=True)
    
    # Photo
    photo_base64 = Column(Text, nullable=True)
    has_photo = Column(Boolean, default=False)
    
    # Professional Information
    niveau_etude = Column(String(100), nullable=True)
    experience = Column(String(100), nullable=True)
    poste_actuel = Column(String(200), nullable=True)
    disponibilite = Column(String(100), nullable=True)
    
    # Salary Information
    salaire_actuel = Column(DECIMAL(10, 2), nullable=True)
    salaire_souhaite = Column(DECIMAL(10, 2), nullable=True)
    
    # Evaluation and Comments
    evaluation = Column(Integer, default=0)
    commentaires = Column(Text, nullable=True)
    informations_supplementaires = Column(Text, nullable=True)
    
    # JSON Fields
    experiences = Column(JSON, nullable=True)
    formations = Column(JSON, nullable=True)
    competences = Column(JSON, nullable=True)
    langues = Column(JSON, nullable=True)
    tags = Column(JSON, nullable=True)
    
    # Original CV
    cv_original = Column(Text, nullable=True)
    
    # Timestamps
    date_creation = Column(DateTime, default=datetime.utcnow)
    date_modification = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
