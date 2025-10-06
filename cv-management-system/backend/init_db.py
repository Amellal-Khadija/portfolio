"""
Database initialization script
Creates the database tables and optionally inserts sample data
"""
import sys
import os

# Add parent directory to path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from database import Base, engine, SessionLocal
from models import CVModel
from datetime import datetime

def init_database():
    """Create all tables"""
    print("Creating database tables...")
    Base.metadata.create_all(bind=engine)
    print("✅ Tables created successfully!")

def insert_sample_data():
    """Insert sample candidate data"""
    db = SessionLocal()
    
    try:
        # Check if data already exists
        existing = db.query(CVModel).first()
        if existing:
            print("⚠️ Sample data already exists. Skipping...")
            return
        
        print("Inserting sample data...")
        
        # Sample candidate 1
        candidate1 = CVModel(
            prenom="Marie",
            nom="Dubois",
            email="marie.dubois@example.com",
            telephone="+33612345678",
            profil_linkedin="https://linkedin.com/in/mariedubois",
            has_photo=False,
            niveau_etude="Master Informatique",
            experience="5 ans",
            poste_actuel="Développeuse Full Stack",
            disponibilite="1 mois",
            salaire_actuel=45000.00,
            salaire_souhaite=55000.00,
            evaluation=4,
            commentaires="Excellente candidate avec une bonne expérience en React et Node.js",
            competences=["React", "Node.js", "JavaScript", "TypeScript", "MongoDB", "PostgreSQL"],
            langues=[
                {"langue": "Français", "niveau": "Natif"},
                {"langue": "Anglais", "niveau": "Courant"}
            ],
            tags=["Full Stack", "React", "Disponible rapidement"],
            experiences=[
                {
                    "entreprise": "Tech Solutions",
                    "poste": "Développeuse Full Stack Senior",
                    "date_debut": "2020-01",
                    "date_fin": "2024-01",
                    "description": "Développement d'applications web modernes avec React et Node.js"
                },
                {
                    "entreprise": "WebCorp",
                    "poste": "Développeuse Frontend",
                    "date_debut": "2018-06",
                    "date_fin": "2019-12",
                    "description": "Création d'interfaces utilisateur responsive"
                }
            ],
            formations=[
                {
                    "etablissement": "Université Paris Diderot",
                    "diplome": "Master Informatique",
                    "date_debut": "2016-09",
                    "date_fin": "2018-06",
                    "description": "Spécialisation développement web"
                }
            ]
        )
        
        # Sample candidate 2
        candidate2 = CVModel(
            prenom="Thomas",
            nom="Martin",
            email="thomas.martin@example.com",
            telephone="+33698765432",
            profil_linkedin="https://linkedin.com/in/thomasmartin",
            has_photo=False,
            niveau_etude="Licence Informatique",
            experience="3 ans",
            poste_actuel="Développeur Backend",
            disponibilite="Immédiate",
            salaire_actuel=38000.00,
            salaire_souhaite=45000.00,
            evaluation=5,
            commentaires="Excellent profil technique, très motivé",
            competences=["Python", "FastAPI", "Django", "PostgreSQL", "Docker", "AWS"],
            langues=[
                {"langue": "Français", "niveau": "Natif"},
                {"langue": "Anglais", "niveau": "Intermédiaire"}
            ],
            tags=["Backend", "Python", "Immédiatement disponible"],
            experiences=[
                {
                    "entreprise": "DataCorp",
                    "poste": "Développeur Backend",
                    "date_debut": "2021-03",
                    "date_fin": "Présent",
                    "description": "Développement d'APIs REST avec FastAPI et Django"
                }
            ],
            formations=[
                {
                    "etablissement": "IUT Informatique Lyon",
                    "diplome": "Licence Professionnelle Informatique",
                    "date_debut": "2018-09",
                    "date_fin": "2021-06",
                    "description": "Développement d'applications"
                }
            ]
        )
        
        # Sample candidate 3
        candidate3 = CVModel(
            prenom="Sarah",
            nom="Lemoine",
            email="sarah.lemoine@example.com",
            telephone="+33656781234",
            has_photo=False,
            niveau_etude="Ingénieur",
            experience="7 ans",
            poste_actuel="Lead Developer",
            disponibilite="2 mois",
            salaire_actuel=60000.00,
            salaire_souhaite=70000.00,
            evaluation=5,
            commentaires="Profil senior avec leadership confirmé",
            competences=["Java", "Spring Boot", "Microservices", "Kubernetes", "React", "Angular"],
            langues=[
                {"langue": "Français", "niveau": "Natif"},
                {"langue": "Anglais", "niveau": "Courant"},
                {"langue": "Espagnol", "niveau": "Intermédiaire"}
            ],
            tags=["Lead", "Architecture", "Microservices"],
            experiences=[
                {
                    "entreprise": "Enterprise Solutions",
                    "poste": "Lead Developer",
                    "date_debut": "2020-01",
                    "date_fin": "Présent",
                    "description": "Direction technique d'une équipe de 8 développeurs"
                },
                {
                    "entreprise": "Software Inc",
                    "poste": "Senior Developer",
                    "date_debut": "2017-06",
                    "date_fin": "2019-12",
                    "description": "Développement d'applications d'entreprise"
                }
            ],
            formations=[
                {
                    "etablissement": "École d'Ingénieurs",
                    "diplome": "Diplôme d'Ingénieur Informatique",
                    "date_debut": "2014-09",
                    "date_fin": "2017-06",
                    "description": "Spécialisation systèmes d'information"
                }
            ]
        )
        
        db.add(candidate1)
        db.add(candidate2)
        db.add(candidate3)
        db.commit()
        
        print("✅ Sample data inserted successfully!")
        print(f"   - Added {candidate1.prenom} {candidate1.nom}")
        print(f"   - Added {candidate2.prenom} {candidate2.nom}")
        print(f"   - Added {candidate3.prenom} {candidate3.nom}")
        
    except Exception as e:
        print(f"❌ Error inserting sample data: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    print("=" * 50)
    print("CV Management System - Database Initialization")
    print("=" * 50)
    
    # Create tables
    init_database()
    
    # Ask if user wants sample data
    response = input("\nDo you want to insert sample data? (y/n): ").lower()
    if response == 'y':
        insert_sample_data()
    
    print("\n✅ Database initialization complete!")
    print("=" * 50)
