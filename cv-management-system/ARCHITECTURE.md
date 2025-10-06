# 🏗️ Architecture du Système CV Management

## Vue d'ensemble

```
┌─────────────────────────────────────────────────────────────────┐
│                         UTILISATEUR                              │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    FRONTEND (React + MUI)                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │ FileUpload   │  │CandidateForm │  │CandidateList │          │
│  │ Component    │  │  Component   │  │  Component   │          │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘          │
│         │                  │                  │                  │
│         └──────────────────┼──────────────────┘                  │
│                            │                                     │
│                   ┌────────▼────────┐                           │
│                   │   API Service   │                           │
│                   │    (Axios)      │                           │
│                   └────────┬────────┘                           │
└────────────────────────────┼────────────────────────────────────┘
                             │ HTTP/REST
                             │
┌────────────────────────────▼────────────────────────────────────┐
│                   BACKEND (FastAPI)                              │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                    API Endpoints                         │   │
│  │  /api/upload-cv      /api/create-candidate              │   │
│  │  /api/cv/{id}        /api/update-cv/{id}                │   │
│  │  /api/cvs            /api/search-cv                      │   │
│  │  /health             /api/debug/cv-ids                   │   │
│  └─────────────┬─────────────────────────────────────┬──────┘   │
│                │                                      │          │
│       ┌────────▼────────┐                   ┌────────▼────────┐ │
│       │   CV Parser     │                   │   SQLAlchemy    │ │
│       │   (IA/NLP)      │                   │      ORM        │ │
│       │                 │                   │                 │ │
│       │ • pdfplumber    │                   │  • Models       │ │
│       │ • python-docx   │                   │  • Schemas      │ │
│       │ • Pillow/OCR    │                   │  • Validation   │ │
│       │ • regex/spaCy   │                   │                 │ │
│       └─────────────────┘                   └────────┬────────┘ │
│                                                      │          │
└──────────────────────────────────────────────────────┼──────────┘
                                                       │
                                                       │ SQL
                                                       │
┌──────────────────────────────────────────────────────▼──────────┐
│                      BASE DE DONNÉES                             │
│                       MySQL 8.0+                                 │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │              Table: cv_model                              │  │
│  │                                                           │  │
│  │  • Informations personnelles (nom, email, téléphone)     │  │
│  │  • Photo encodée en base64                                │  │
│  │  • Informations professionnelles                          │  │
│  │  • Compétences, langues (JSON)                            │  │
│  │  • Expériences, formations (JSON)                         │  │
│  │  • Évaluation, tags, commentaires                         │  │
│  │  • CV original (base64)                                   │  │
│  │  • Timestamps (création, modification)                    │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

## Flux de Données - Upload et Extraction de CV

```
┌─────────┐
│ Upload  │  1. Utilisateur uploade un CV (PDF/DOCX/Image)
│   CV    │
└────┬────┘
     │
     ▼
┌─────────────────┐
│  FileUpload     │  2. Validation (format, taille < 10MB)
│  Component      │
└────┬────────────┘
     │ FormData
     ▼
┌─────────────────┐
│  API Service    │  3. POST /api/upload-cv?save=false
│   (Axios)       │
└────┬────────────┘
     │ HTTP
     ▼
┌─────────────────┐
│  FastAPI        │  4. Réception du fichier
│  main.py        │
└────┬────────────┘
     │
     ▼
┌─────────────────┐
│  CV Parser      │  5. Extraction intelligente
│  cv_parser.py   │     • Lecture du fichier (PDF/DOCX/Image)
│                 │     • OCR si nécessaire (images)
│                 │     • Extraction avec regex/NLP
│                 │     • Détection: email, téléphone, compétences
│                 │     • Structure: expériences, formations
└────┬────────────┘
     │ Dict
     ▼
┌─────────────────┐
│  Response       │  6. Données extraites retournées
│  (CVResponse)   │     avec champs auto-remplis marqués
└────┬────────────┘
     │ JSON
     ▼
┌─────────────────┐
│ CandidateForm   │  7. Pré-remplissage du formulaire
│  Component      │     Indicateurs visuels (✓) sur champs auto
└────┬────────────┘
     │
     ▼
┌─────────────────┐
│ Validation      │  8. Utilisateur valide/complète les données
│  Manuelle       │
└────┬────────────┘
     │
     ▼
┌─────────────────┐
│  Sauvegarde     │  9. POST /api/create-candidate
│  en BDD         │     Stockage permanent
└─────────────────┘
```

## Flux de Données - CRUD Opérations

### Lecture (Read)
```
Liste tous:     GET /api/cvs          → Table complète
Un candidat:    GET /api/cv/{id}      → Ligne spécifique
Recherche:      GET /api/search-cv    → Filtre SQL (LIKE)
```

### Création (Create)
```
Manuel:         POST /api/create-candidate
Depuis CV:      POST /api/upload-cv?save=true
```

### Mise à jour (Update)
```
Modification:   PUT /api/update-cv/{id}
                → UPDATE SQL avec données partielles
```

### Suppression (Delete)
```
Suppression:    DELETE /api/cv/{id}
                → DELETE SQL avec confirmation
```

## Architecture des Composants

### Frontend (React)

```
App.jsx (Conteneur principal)
│
├── FileUpload.jsx
│   ├── Drag & Drop Zone
│   ├── File Validation
│   ├── Progress Bar
│   └── API Call (uploadCV)
│
├── CandidateForm.jsx
│   ├── Personal Info Section
│   ├── Professional Info Section
│   ├── Skills Management
│   ├── Tags Management
│   ├── Rating System
│   ├── Auto-fill Indicators
│   └── API Call (createCandidate)
│
└── CandidateList.jsx
    ├── Search Bar
    ├── Data Table
    ├── View Dialog
    ├── Delete Confirmation
    └── API Calls (list, search, get, delete)
```

### Backend (FastAPI)

```
main.py (Application principale)
│
├── Endpoints
│   ├── /health
│   ├── /api/upload-cv
│   ├── /api/create-candidate
│   ├── /api/cv/{id}
│   ├── /api/update-cv/{id}
│   ├── /api/cvs
│   └── /api/search-cv
│
├── Dependencies
│   ├── database.py (SQLAlchemy config)
│   ├── models.py (Table definitions)
│   ├── schemas.py (Pydantic validation)
│   └── cv_parser.py (Extraction logic)
│
└── Middleware
    └── CORS (Cross-Origin Resource Sharing)
```

## Modèle de Données

```
CVModel (Table MySQL)
│
├── Clé Primaire
│   └── id (INT, AUTO_INCREMENT)
│
├── Informations Obligatoires
│   ├── prenom (VARCHAR)
│   ├── nom (VARCHAR)
│   └── email (VARCHAR, UNIQUE)
│
├── Informations Optionnelles
│   ├── telephone
│   ├── profil_linkedin
│   ├── photo_base64 (LONGTEXT)
│   ├── niveau_etude
│   ├── experience
│   ├── poste_actuel
│   ├── disponibilite
│   ├── salaire_actuel (DECIMAL)
│   └── salaire_souhaite (DECIMAL)
│
├── Données Structurées (JSON)
│   ├── experiences []
│   ├── formations []
│   ├── competences []
│   ├── langues []
│   └── tags []
│
├── Méta-données
│   ├── evaluation (INT 0-5)
│   ├── commentaires (TEXT)
│   ├── informations_supplementaires (TEXT)
│   └── cv_original (LONGTEXT base64)
│
└── Timestamps
    ├── date_creation (DATETIME)
    └── date_modification (DATETIME)
```

## Technologies et Dépendances

### Frontend Stack
- **React 18.2**: UI Framework
- **Material-UI 5.15**: Component Library
- **Axios 1.6**: HTTP Client
- **Emotion**: CSS-in-JS

### Backend Stack
- **Python 3.9+**: Language
- **FastAPI 0.109**: Web Framework
- **SQLAlchemy 2.0**: ORM
- **Pydantic 2.5**: Data Validation
- **Uvicorn**: ASGI Server

### Parsing Stack
- **pdfplumber**: PDF Text Extraction
- **python-docx**: DOCX Reading
- **Pillow**: Image Processing
- **pytesseract**: OCR Engine
- **spaCy**: NLP (optional)
- **regex**: Pattern Matching

### Database
- **MySQL 8.0+**: Relational Database
- **PyMySQL**: MySQL Connector

## Sécurité

### Validation des Entrées
```
Frontend:  Material-UI validation + regex
Backend:   Pydantic schemas + size limits
Database:  Contraintes SQL (UNIQUE, NOT NULL)
```

### Limites de Sécurité
- Taille max fichier: 10MB
- Formats autorisés: PDF, DOCX, TXT, JPG, JPEG, PNG
- Validation email (EmailStr)
- Échappement SQL automatique (SQLAlchemy)
- CORS configuré

### Données Sensibles
- CV originaux encodés en base64
- Photos encodées en base64
- Pas de stockage de fichiers en clair
- Salaires stockés en DECIMAL sécurisé

## Performance

### Optimisations Backend
- Indexation sur email (recherche rapide)
- Pagination (skip/limit)
- Connection pooling (SQLAlchemy)
- Chargement lazy des relations

### Optimisations Frontend
- Composants React optimisés
- Lazy loading des listes
- Debouncing sur recherche
- Cache des requêtes API

## Scalabilité

### Horizontal Scaling
- Backend stateless (peut être répliqué)
- Sessions stockées en DB
- Load balancer possible

### Vertical Scaling
- Augmentation des workers Uvicorn
- Optimisation des requêtes SQL
- Indexes sur colonnes fréquentes

### Future Improvements
- Cache Redis pour recherches
- Queue système pour upload (Celery)
- Stockage S3 pour fichiers
- CDN pour frontend
- Elasticsearch pour recherche avancée

---

**Note**: Cette architecture est conçue pour être modulaire et extensible.
