# 🔧 Troubleshooting Guide - CV Management System

## Table des matières
1. [Problèmes Backend](#problèmes-backend)
2. [Problèmes Frontend](#problèmes-frontend)
3. [Problèmes de Base de Données](#problèmes-de-base-de-données)
4. [Problèmes d'Extraction de CV](#problèmes-dextraction-de-cv)
5. [Problèmes Docker](#problèmes-docker)

---

## Problèmes Backend

### ❌ Backend ne démarre pas

**Erreur: `ModuleNotFoundError`**
```bash
# Solution: Réinstaller les dépendances
cd backend
pip install -r requirements.txt --upgrade
```

**Erreur: `ImportError: cannot import name 'get_db'`**
```bash
# Solution: Vérifier la structure des imports
# Assurez-vous que database.py est présent et correct
python -c "from database import get_db; print('OK')"
```

**Erreur: Port 8000 déjà utilisé**
```bash
# Solution 1: Arrêter le processus utilisant le port
# Linux/Mac:
lsof -ti:8000 | xargs kill -9

# Windows:
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# Solution 2: Changer le port
# Dans main.py, ligne finale:
uvicorn.run("main:app", host="0.0.0.0", port=8001, reload=True)
```

### ❌ Erreur de connexion MySQL

**Erreur: `Can't connect to MySQL server`**
```bash
# Vérifier que MySQL est démarré
# Linux:
sudo systemctl status mysql

# Windows:
# Vérifier dans Services

# Tester la connexion
mysql -u root -p

# Vérifier la configuration dans .env
DATABASE_URL=mysql+pymysql://root:votre_mot_de_passe@localhost:3306/cv_management
```

**Erreur: `Access denied for user`**
```bash
# Recréer l'utilisateur MySQL
mysql -u root -p
CREATE USER 'cv_user'@'localhost' IDENTIFIED BY 'votre_mot_de_passe';
GRANT ALL PRIVILEGES ON cv_management.* TO 'cv_user'@'localhost';
FLUSH PRIVILEGES;
```

### ❌ Erreur de création de tables

**Erreur: `Table doesn't exist`**
```bash
# Solution: Initialiser la base de données
cd backend
python init_db.py

# Ou manuellement dans Python
python
>>> from database import Base, engine
>>> Base.metadata.create_all(bind=engine)
>>> exit()
```

---

## Problèmes Frontend

### ❌ Frontend ne démarre pas

**Erreur: `npm ERR! code ELIFECYCLE`**
```bash
# Solution: Nettoyer et réinstaller
cd frontend
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

**Erreur: Port 3000 déjà utilisé**
```bash
# Solution 1: Arrêter le processus
# Linux/Mac:
lsof -ti:3000 | xargs kill -9

# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Solution 2: Utiliser un autre port
# Créer un fichier .env
PORT=3001
```

**Erreur: `Module not found`**
```bash
# Solution: Vérifier les dépendances
npm install @mui/material @mui/icons-material @emotion/react @emotion/styled axios

# Ou réinstaller tout
npm install
```

### ❌ Erreurs CORS

**Erreur: `CORS policy: No 'Access-Control-Allow-Origin'`**

Solution 1: Vérifier la configuration backend
```python
# Dans backend/main.py
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

Solution 2: Vérifier l'URL de l'API dans frontend
```env
# frontend/.env
REACT_APP_API_URL=http://localhost:8000
```

### ❌ Erreur: API non accessible

**Erreur: `Network Error` ou `Failed to fetch`**
```bash
# 1. Vérifier que le backend est lancé
curl http://localhost:8000/health

# 2. Vérifier la configuration .env
cat frontend/.env
# REACT_APP_API_URL=http://localhost:8000

# 3. Redémarrer le frontend
npm start
```

---

## Problèmes de Base de Données

### ❌ Base de données n'existe pas

```sql
-- Créer la base de données
CREATE DATABASE cv_management CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Vérifier
SHOW DATABASES;
USE cv_management;
SHOW TABLES;
```

### ❌ Erreur de charset/collation

```sql
-- Modifier la base de données existante
ALTER DATABASE cv_management CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Ou recréer proprement
DROP DATABASE IF EXISTS cv_management;
CREATE DATABASE cv_management CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### ❌ Tables corrompues ou structure incorrecte

```bash
# Supprimer et recréer les tables
python
>>> from database import Base, engine
>>> Base.metadata.drop_all(bind=engine)
>>> Base.metadata.create_all(bind=engine)
>>> exit()
```

---

## Problèmes d'Extraction de CV

### ❌ Erreur: `Tesseract not found`

**Linux (Ubuntu/Debian):**
```bash
sudo apt-get update
sudo apt-get install tesseract-ocr
sudo apt-get install tesseract-ocr-fra
```

**Mac:**
```bash
brew install tesseract
brew install tesseract-lang
```

**Windows:**
1. Télécharger: https://github.com/UB-Mannheim/tesseract/wiki
2. Installer
3. Ajouter au PATH: `C:\Program Files\Tesseract-OCR`
4. Redémarrer le terminal

Vérifier l'installation:
```bash
tesseract --version
```

### ❌ Erreur: spaCy model not found

```bash
# Télécharger le modèle français
python -m spacy download fr_core_news_sm

# Vérifier
python -c "import spacy; nlp = spacy.load('fr_core_news_sm'); print('OK')"
```

### ❌ PDF non lisible

**Erreur: `pdfplumber.exceptions.PDFSyntaxError`**
```bash
# Le PDF est peut-être corrompu ou protégé
# Essayer de le réouvrir et sauvegarder avec Adobe Reader ou un autre outil
```

### ❌ DOCX non lisible

**Erreur: `BadZipFile`**
```bash
# Le fichier n'est pas un vrai DOCX
# Vérifier l'extension et le format du fichier
file sample.docx
```

### ❌ Image non traitée (OCR)

**Problème: Texte non extrait des images**
```bash
# 1. Vérifier Tesseract
tesseract --list-langs
# Doit afficher 'fra' et 'eng'

# 2. Installer les packs de langues
# Linux:
sudo apt-get install tesseract-ocr-fra tesseract-ocr-eng

# 3. Tester manuellement
tesseract image.jpg output.txt -l fra
```

---

## Problèmes Docker

### ❌ Docker Compose ne démarre pas

**Erreur: `no configuration file provided`**
```bash
# S'assurer d'être dans le bon répertoire
cd cv-management-system
docker-compose up -d
```

**Erreur: Port already allocated**
```bash
# Solution 1: Arrêter les conteneurs existants
docker-compose down
docker ps -a
docker stop <container_id>

# Solution 2: Modifier les ports dans docker-compose.yml
ports:
  - "8001:8000"  # Au lieu de 8000:8000
```

### ❌ Backend ne se connecte pas à MySQL dans Docker

```yaml
# Vérifier docker-compose.yml
# Le backend doit utiliser 'mysql' comme host, pas 'localhost'
environment:
  DATABASE_URL: mysql+pymysql://cv_user:cv_password@mysql:3306/cv_management
```

### ❌ Images Docker trop volumineuses

```bash
# Nettoyer les images non utilisées
docker system prune -a

# Reconstruire les images
docker-compose build --no-cache
docker-compose up -d
```

---

## Tests de Diagnostic

### Test Backend
```bash
cd backend

# Test 1: Importer les modules
python -c "from database import get_db; from models import CVModel; from cv_parser import CVParser; print('✅ All imports OK')"

# Test 2: Connexion base de données
python -c "from database import engine; engine.connect(); print('✅ Database connection OK')"

# Test 3: API Health
curl http://localhost:8000/health
```

### Test Frontend
```bash
cd frontend

# Test 1: Dépendances installées
npm list @mui/material axios

# Test 2: Compilation sans erreurs
npm run build

# Test 3: API accessible
curl http://localhost:8000/health
```

### Test Complet
```bash
# Test de bout en bout
cd backend
python test_api.py
```

---

## Logs de Débogage

### Logs Backend
```bash
# Ajouter dans main.py pour plus de logs
import logging
logging.basicConfig(level=logging.DEBUG)
```

### Logs Frontend
```javascript
// Dans src/services/api.js
api.interceptors.request.use(request => {
  console.log('Starting Request', request);
  return request;
});

api.interceptors.response.use(response => {
  console.log('Response:', response);
  return response;
});
```

---

## Contact Support

Si le problème persiste:
1. Vérifier les logs détaillés
2. Consulter la documentation API: http://localhost:8000/docs
3. Vérifier les issues GitHub du projet
4. Créer une nouvelle issue avec:
   - Description du problème
   - Messages d'erreur complets
   - Versions (Python, Node.js, MySQL)
   - Système d'exploitation

---

**Dernière mise à jour**: 2024
