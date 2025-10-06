# 🎯 CV Management System

Système complet de gestion de candidatures avec extraction automatique des données depuis les CV. Une application web moderne développée avec React, Material-UI, FastAPI et MySQL.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![React](https://img.shields.io/badge/React-18.x-61dafb.svg)
![FastAPI](https://img.shields.io/badge/FastAPI-0.109-009688.svg)
![Python](https://img.shields.io/badge/Python-3.9+-3776ab.svg)
![MySQL](https://img.shields.io/badge/MySQL-8.0-4479a1.svg)

## ✨ Fonctionnalités Principales

### 🤖 Extraction Intelligente des CV
- **Formats supportés**: PDF, DOCX, TXT, JPG, JPEG, PNG
- **Taille maximum**: 10MB par fichier
- **Extraction automatique** de:
  - Informations personnelles (prénom, nom, email, téléphone)
  - Photo du candidat (encodage base64)
  - Profil LinkedIn
  - Niveau d'étude et années d'expérience
  - Poste actuel et disponibilité
  - Compétences techniques
  - Langues parlées
  - Expériences professionnelles structurées
  - Formations académiques
  - Salaires (actuel et souhaité)

### 🎨 Interface Utilisateur Duale
- **Colonne gauche**: Zone d'upload avec drag & drop
- **Colonne droite**: Formulaire de candidat pré-rempli
- **Indicateurs visuels**: Champs auto-remplis marqués en vert ✓
- **Validation en temps réel**: Messages d'erreur et de succès

### 📝 Workflow en Deux Étapes
1. **ÉTAPE 1**: Upload et extraction (sans sauvegarde)
2. **ÉTAPE 2**: Validation manuelle et sauvegarde

### 📊 Gestion Complète des Candidats (CRUD)
- ✅ **Création**: Manuelle ou via extraction de CV
- 👁️ **Lecture**: Liste et détails des candidats
- ✏️ **Modification**: Mise à jour des informations
- 🗑️ **Suppression**: Avec confirmation
- 🔍 **Recherche**: Par nom et email
- ⭐ **Évaluation**: Système de notation 1-5 étoiles
- 🏷️ **Tags**: Étiquettes personnalisées
- 💬 **Commentaires**: Notes sur les candidats

## 🏗️ Architecture du Projet

```
cv-management-system/
├── backend/                      # API FastAPI + Python
│   ├── main.py                  # Point d'entrée de l'API
│   ├── database.py              # Configuration SQLAlchemy
│   ├── models.py                # Modèles de base de données
│   ├── schemas.py               # Schémas Pydantic
│   ├── cv_parser.py             # Parser de CV avec IA
│   ├── requirements.txt         # Dépendances Python
│   └── .env.example            # Configuration exemple
│
├── frontend/                    # Application React
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── FileUpload.jsx      # Composant d'upload
│   │   │   ├── CandidateForm.jsx   # Formulaire candidat
│   │   │   └── CandidateList.jsx   # Liste des candidats
│   │   ├── services/
│   │   │   └── api.js               # Service API
│   │   ├── App.jsx                  # Composant principal
│   │   └── index.js                 # Point d'entrée
│   ├── package.json
│   └── .env.example
│
└── README.md                    # Ce fichier
```

## 🛠️ Technologies Utilisées

### Frontend
- **React 18.2** - Framework JavaScript
- **Material-UI (MUI) 5.15** - Bibliothèque de composants UI
- **Axios 1.6** - Client HTTP
- **Emotion** - Styling CSS-in-JS
- **HTML5 Drag & Drop** - Interface d'upload intuitive

### Backend
- **Python 3.9+** - Langage de programmation
- **FastAPI 0.109** - Framework web moderne
- **SQLAlchemy 2.0** - ORM pour MySQL
- **Pydantic 2.5** - Validation de données
- **Uvicorn** - Serveur ASGI
- **PyMySQL** - Connecteur MySQL

### Traitement des CV
- **pdfplumber** - Extraction de texte PDF
- **python-docx** - Lecture de fichiers DOCX
- **Pillow (PIL)** - Traitement d'images
- **pytesseract** - OCR pour les images
- **spaCy** - Traitement du langage naturel (NLP)
- **regex** - Extraction de patterns

### Base de Données
- **MySQL 8.0+** - Base de données relationnelle

## 📦 Installation

### Prérequis
- Python 3.9 ou supérieur
- Node.js 16 ou supérieur
- MySQL 8.0 ou supérieur
- Tesseract OCR (pour l'extraction d'images)

### 1. Cloner le Repository
```bash
git clone <repository-url>
cd cv-management-system
```

### 2. Configuration de la Base de Données MySQL

```sql
-- Créer la base de données
CREATE DATABASE cv_management CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Créer un utilisateur (optionnel)
CREATE USER 'cv_user'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON cv_management.* TO 'cv_user'@'localhost';
FLUSH PRIVILEGES;
```

### 3. Installation du Backend

```bash
cd backend

# Créer un environnement virtuel
python -m venv venv

# Activer l'environnement virtuel
# Sur Windows:
venv\Scripts\activate
# Sur Linux/Mac:
source venv/bin/activate

# Installer les dépendances
pip install -r requirements.txt

# Télécharger le modèle spaCy (optionnel pour NLP avancé)
python -m spacy download fr_core_news_sm

# Configurer les variables d'environnement
cp .env.example .env
# Éditer .env avec vos paramètres MySQL
```

**Configuration .env du backend:**
```env
DATABASE_URL=mysql+pymysql://root:password@localhost:3306/cv_management
HOST=0.0.0.0
PORT=8000
CORS_ORIGINS=http://localhost:3000,http://localhost:3001
```

### 4. Installation du Frontend

```bash
cd frontend

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env
# Éditer .env avec l'URL de votre backend
```

**Configuration .env du frontend:**
```env
REACT_APP_API_URL=http://localhost:8000
```

### 5. Installer Tesseract OCR (pour l'extraction d'images)

**Windows:**
- Télécharger depuis: https://github.com/UB-Mannheim/tesseract/wiki
- Ajouter au PATH: `C:\Program Files\Tesseract-OCR`

**Linux (Ubuntu/Debian):**
```bash
sudo apt-get update
sudo apt-get install tesseract-ocr
sudo apt-get install tesseract-ocr-fra  # Support français
```

**Mac:**
```bash
brew install tesseract
brew install tesseract-lang  # Support multilingue
```

## 🚀 Démarrage

### 1. Démarrer le Backend
```bash
cd backend
source venv/bin/activate  # Windows: venv\Scripts\activate
python main.py
```
Le backend sera accessible sur: **http://localhost:8000**

Documentation API interactive: **http://localhost:8000/docs**

### 2. Démarrer le Frontend
```bash
cd frontend
npm start
```
Le frontend sera accessible sur: **http://localhost:3000**

## 📚 Documentation API

### Endpoints Principaux

#### 🏥 Health Check
```http
GET /health
```
Vérifie l'état de l'API et de la connexion à la base de données.

#### 📤 Upload et Extraction de CV
```http
POST /api/upload-cv?save=false
Content-Type: multipart/form-data

file: [CV file]
```
**Paramètres:**
- `save`: `false` pour extraction seule, `true` pour extraction + sauvegarde
- `file`: Fichier CV (PDF, DOCX, TXT, JPG, JPEG, PNG)

**Réponse:**
```json
{
  "id": null,
  "prenom": "Jean",
  "nom": "Dupont",
  "email": "jean.dupont@example.com",
  "telephone": "+33612345678",
  "profil_linkedin": "https://linkedin.com/in/jeandupont",
  "photo_base64": "base64_encoded_string...",
  "has_photo": true,
  "niveau_etude": "Master",
  "experience": "5 ans",
  "poste_actuel": "Développeur Full Stack",
  "disponibilite": "Immédiate",
  "competences": ["Python", "React", "JavaScript"],
  "langues": [{"langue": "Français", "niveau": "Natif"}],
  "auto_filled_fields": ["email", "prenom", "nom", "telephone"]
}
```

#### ➕ Créer un Candidat
```http
POST /api/create-candidate
Content-Type: application/json
```

#### 👁️ Obtenir un Candidat
```http
GET /api/cv/{id}
```

#### ✏️ Mettre à Jour un Candidat
```http
PUT /api/update-cv/{id}
Content-Type: application/json
```

#### 🗑️ Supprimer un Candidat
```http
DELETE /api/cv/{id}
```

#### 📋 Lister les Candidats
```http
GET /api/cvs?skip=0&limit=100
```

#### 🔍 Rechercher des Candidats
```http
GET /api/search-cv?name=Dupont&email=jean@
```

## 🗄️ Modèle de Base de Données

### Table: `cv_model`

| Colonne | Type | Description |
|---------|------|-------------|
| `id` | INT | Clé primaire (auto-increment) |
| `prenom` | VARCHAR(100) | Prénom du candidat (obligatoire) |
| `nom` | VARCHAR(100) | Nom du candidat (obligatoire) |
| `email` | VARCHAR(255) | Email (unique, obligatoire) |
| `telephone` | VARCHAR(50) | Numéro de téléphone |
| `profil_linkedin` | VARCHAR(500) | URL du profil LinkedIn |
| `photo_base64` | LONGTEXT | Photo encodée en base64 |
| `has_photo` | BOOLEAN | Indicateur de présence de photo |
| `niveau_etude` | VARCHAR(100) | Niveau d'études |
| `experience` | VARCHAR(100) | Années d'expérience |
| `poste_actuel` | VARCHAR(200) | Poste actuel |
| `disponibilite` | VARCHAR(100) | Disponibilité |
| `salaire_actuel` | DECIMAL(10,2) | Salaire actuel |
| `salaire_souhaite` | DECIMAL(10,2) | Salaire souhaité |
| `evaluation` | INT | Note de 0 à 5 étoiles |
| `commentaires` | TEXT | Commentaires sur le candidat |
| `informations_supplementaires` | TEXT | Informations additionnelles |
| `experiences` | JSON | Expériences professionnelles |
| `formations` | JSON | Formations académiques |
| `competences` | JSON | Liste des compétences |
| `langues` | JSON | Langues parlées avec niveaux |
| `tags` | JSON | Tags personnalisés |
| `cv_original` | LONGTEXT | CV original encodé en base64 |
| `date_creation` | DATETIME | Date de création |
| `date_modification` | DATETIME | Date de dernière modification |

## 🎯 Guide d'Utilisation

### Workflow Complet

1. **Upload du CV**
   - Glissez-déposez un CV ou cliquez pour sélectionner
   - Formats acceptés: PDF, DOCX, TXT, JPG, JPEG, PNG
   - Taille max: 10MB

2. **Extraction Automatique**
   - Cliquez sur "Extraire les données"
   - L'IA analyse le CV et extrait les informations
   - Les champs auto-remplis sont marqués avec ✓

3. **Validation et Complétion**
   - Vérifiez les données extraites
   - Complétez les champs manquants
   - Ajoutez des compétences, tags, évaluation
   - Ajoutez des commentaires personnalisés

4. **Sauvegarde**
   - Cliquez sur "Enregistrer le candidat"
   - Le candidat est ajouté à la base de données

5. **Gestion**
   - Consultez la liste des candidats
   - Recherchez par nom ou email
   - Visualisez les détails
   - Modifiez ou supprimez des candidats

## 🧪 Tests

### Test du Backend
```bash
cd backend
pytest  # Si des tests sont implémentés
```

### Test du Frontend
```bash
cd frontend
npm test
```

### Test Manuel de l'API
Utilisez la documentation interactive Swagger:
```
http://localhost:8000/docs
```

## 📝 Structure des Données JSON

### Expériences
```json
{
  "experiences": [
    {
      "entreprise": "Société XYZ",
      "poste": "Développeur Full Stack",
      "date_debut": "2020-01",
      "date_fin": "2023-12",
      "description": "Développement d'applications web"
    }
  ]
}
```

### Formations
```json
{
  "formations": [
    {
      "etablissement": "Université ABC",
      "diplome": "Master Informatique",
      "date_debut": "2018-09",
      "date_fin": "2020-06",
      "description": "Spécialisation développement web"
    }
  ]
}
```

### Langues
```json
{
  "langues": [
    {
      "langue": "Français",
      "niveau": "Natif"
    },
    {
      "langue": "Anglais",
      "niveau": "Courant"
    }
  ]
}
```

## 🔧 Configuration Avancée

### Personnaliser l'Extraction de CV

Modifiez `backend/cv_parser.py` pour:
- Ajouter de nouveaux patterns d'extraction
- Améliorer la détection de compétences
- Personnaliser l'extraction de langues
- Ajouter le support de nouvelles langues

### Modifier le Thème Material-UI

Éditez `frontend/src/App.jsx`:
```javascript
const theme = createTheme({
  palette: {
    mode: 'light', // ou 'dark'
    primary: {
      main: '#1976d2', // Votre couleur principale
    },
    // ... autres personnalisations
  },
});
```

## 🐛 Dépannage

### Problème: Le backend ne démarre pas
```bash
# Vérifier la connexion MySQL
mysql -u root -p
USE cv_management;

# Vérifier les dépendances Python
pip list
pip install -r requirements.txt --upgrade
```

### Problème: Erreur CORS
Ajoutez votre origine dans `backend/main.py`:
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Ajoutez vos URLs
    ...
)
```

### Problème: L'extraction d'images ne fonctionne pas
```bash
# Vérifier Tesseract
tesseract --version

# Sur Linux, installer les packs de langues
sudo apt-get install tesseract-ocr-fra
```

## 🚀 Déploiement en Production

### Backend (FastAPI)
```bash
# Utiliser Gunicorn ou Uvicorn avec plusieurs workers
uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4

# Ou avec Gunicorn
gunicorn main:app --workers 4 --worker-class uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```

### Frontend (React)
```bash
cd frontend
npm run build
# Déployer le dossier build/ sur votre serveur web (Nginx, Apache, Vercel, Netlify)
```

### Base de Données
- Utilisez des connexions sécurisées (SSL)
- Créez des sauvegardes régulières
- Configurez des utilisateurs avec privilèges limités

## 📄 License

Ce projet est sous licence MIT. Voir le fichier LICENSE pour plus de détails.

## 👨‍💻 Auteur

Développé dans le cadre d'un système de gestion de candidatures moderne avec extraction automatique de CV.

## 🙏 Remerciements

- React et Material-UI pour l'interface utilisateur
- FastAPI pour l'API backend performante
- pdfplumber et python-docx pour l'extraction de documents
- La communauté open-source pour les outils et bibliothèques

## 📧 Support

Pour toute question ou problème:
- Ouvrez une issue sur GitHub
- Consultez la documentation API: `http://localhost:8000/docs`

---

**Note**: Ce système est conçu pour être facilement extensible. N'hésitez pas à contribuer et à l'améliorer!
