# 🚀 Quick Start Guide - CV Management System

## Option 1: Installation Locale (Recommandée pour le développement)

### Étape 1: Prérequis
```bash
# Vérifier les versions
python --version  # Python 3.9+
node --version    # Node.js 16+
mysql --version   # MySQL 8.0+
```

### Étape 2: Base de Données
```bash
# Se connecter à MySQL
mysql -u root -p

# Créer la base de données
CREATE DATABASE cv_management CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
EXIT;
```

### Étape 3: Backend
```bash
cd backend

# Créer environnement virtuel
python -m venv venv

# Activer (Linux/Mac)
source venv/bin/activate
# Activer (Windows)
# venv\Scripts\activate

# Installer dépendances
pip install -r requirements.txt

# Configurer .env
cp .env.example .env
# Éditer .env avec vos paramètres MySQL

# Lancer le backend
python main.py
```

Backend accessible sur: http://localhost:8000
Documentation API: http://localhost:8000/docs

### Étape 4: Frontend
```bash
# Dans un nouveau terminal
cd frontend

# Installer dépendances
npm install

# Configurer .env
cp .env.example .env

# Lancer le frontend
npm start
```

Frontend accessible sur: http://localhost:3000

## Option 2: Docker (Recommandée pour la production)

### Prérequis
- Docker
- Docker Compose

### Démarrage
```bash
# À la racine du projet
docker-compose up -d

# Vérifier les logs
docker-compose logs -f
```

**URLs:**
- Frontend: http://localhost:3000
- Backend: http://localhost:8000
- API Docs: http://localhost:8000/docs

### Arrêt
```bash
docker-compose down

# Avec suppression des volumes (⚠️ supprime les données)
docker-compose down -v
```

## 📝 Test Rapide

### 1. Vérifier le Backend
```bash
curl http://localhost:8000/health
```

Réponse attendue:
```json
{
  "status": "healthy",
  "api": "operational",
  "database": "connected"
}
```

### 2. Tester l'Upload de CV
1. Ouvrir http://localhost:3000
2. Glisser-déposer un fichier CV (PDF, DOCX, etc.)
3. Cliquer sur "Extraire les données"
4. Vérifier le formulaire pré-rempli
5. Compléter les informations
6. Cliquer sur "Enregistrer le candidat"
7. Vérifier la liste des candidats

## 🔧 Dépannage Rapide

### Backend ne démarre pas
```bash
# Vérifier MySQL
mysql -u root -p -e "SHOW DATABASES;"

# Réinstaller les dépendances
pip install -r requirements.txt --force-reinstall
```

### Frontend ne démarre pas
```bash
# Nettoyer et réinstaller
rm -rf node_modules package-lock.json
npm install
```

### Erreur de connexion API
```bash
# Vérifier que le backend est lancé
curl http://localhost:8000/health

# Vérifier la configuration frontend
cat frontend/.env
# REACT_APP_API_URL doit être http://localhost:8000
```

## 📚 Ressources

- **Documentation API**: http://localhost:8000/docs
- **README complet**: [README.md](README.md)
- **Code source**: [GitHub Repository]

## ✅ Checklist de Démarrage

- [ ] MySQL installé et en cours d'exécution
- [ ] Base de données `cv_management` créée
- [ ] Backend lancé sur port 8000
- [ ] Frontend lancé sur port 3000
- [ ] Test d'upload de CV réussi
- [ ] Candidat enregistré dans la base de données

## 💡 Prochaines Étapes

1. Explorer la documentation API interactive
2. Tester toutes les fonctionnalités CRUD
3. Personnaliser le thème de l'interface
4. Améliorer l'extraction de CV pour vos besoins
5. Déployer en production

Bon développement! 🚀
