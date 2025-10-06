import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Chip,
  Avatar,
  Rating,
  Divider,
  Alert,
  IconButton,
  InputAdornment,
} from '@mui/material';
import {
  Save,
  Clear,
  Add,
  Delete,
  CheckCircle,
  LinkedIn,
  Email,
  Phone,
  Work,
  School,
} from '@mui/icons-material';
import { createCandidate } from '../services/api';

const CandidateForm = ({ extractedData, onSaveSuccess }) => {
  const [formData, setFormData] = useState({
    prenom: '',
    nom: '',
    email: '',
    telephone: '',
    profil_linkedin: '',
    photo_base64: '',
    has_photo: false,
    niveau_etude: '',
    experience: '',
    poste_actuel: '',
    disponibilite: '',
    salaire_actuel: '',
    salaire_souhaite: '',
    evaluation: 0,
    commentaires: '',
    informations_supplementaires: '',
    experiences: [],
    formations: [],
    competences: [],
    langues: [],
    tags: [],
  });

  const [autoFilledFields, setAutoFilledFields] = useState([]);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [newSkill, setNewSkill] = useState('');
  const [newTag, setNewTag] = useState('');

  // Update form when extractedData changes
  useEffect(() => {
    if (extractedData) {
      setFormData((prev) => ({
        ...prev,
        ...extractedData,
      }));
      setAutoFilledFields(extractedData.auto_filled_fields || []);
      
      if (extractedData.photo_base64) {
        setPhotoPreview(`data:image/jpeg;base64,${extractedData.photo_base64}`);
      }
    }
  }, [extractedData]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setSaveSuccess(false);
    setError(null);
  };

  // Handle rating change
  const handleRatingChange = (event, newValue) => {
    setFormData((prev) => ({
      ...prev,
      evaluation: newValue || 0,
    }));
  };

  // Add skill
  const handleAddSkill = () => {
    if (newSkill.trim()) {
      setFormData((prev) => ({
        ...prev,
        competences: [...(prev.competences || []), newSkill.trim()],
      }));
      setNewSkill('');
    }
  };

  // Remove skill
  const handleRemoveSkill = (index) => {
    setFormData((prev) => ({
      ...prev,
      competences: prev.competences.filter((_, i) => i !== index),
    }));
  };

  // Add tag
  const handleAddTag = () => {
    if (newTag.trim()) {
      setFormData((prev) => ({
        ...prev,
        tags: [...(prev.tags || []), newTag.trim()],
      }));
      setNewTag('');
    }
  };

  // Remove tag
  const handleRemoveTag = (index) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index),
    }));
  };

  // Check if field is auto-filled
  const isAutoFilled = (fieldName) => {
    return autoFilledFields.includes(fieldName);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSaveSuccess(false);

    try {
      // Prepare data for submission
      const submitData = {
        ...formData,
        salaire_actuel: formData.salaire_actuel ? parseFloat(formData.salaire_actuel) : null,
        salaire_souhaite: formData.salaire_souhaite ? parseFloat(formData.salaire_souhaite) : null,
      };

      await createCandidate(submitData);
      setSaveSuccess(true);
      setIsLoading(false);

      // Notify parent component
      if (onSaveSuccess) {
        onSaveSuccess();
      }

      // Reset form after 2 seconds
      setTimeout(() => {
        handleReset();
      }, 2000);
    } catch (err) {
      setIsLoading(false);
      const errorMessage = err.response?.data?.detail || err.message || 'Erreur lors de la sauvegarde';
      setError(errorMessage);
    }
  };

  // Reset form
  const handleReset = () => {
    setFormData({
      prenom: '',
      nom: '',
      email: '',
      telephone: '',
      profil_linkedin: '',
      photo_base64: '',
      has_photo: false,
      niveau_etude: '',
      experience: '',
      poste_actuel: '',
      disponibilite: '',
      salaire_actuel: '',
      salaire_souhaite: '',
      evaluation: 0,
      commentaires: '',
      informations_supplementaires: '',
      experiences: [],
      formations: [],
      competences: [],
      langues: [],
      tags: [],
    });
    setAutoFilledFields([]);
    setPhotoPreview(null);
    setSaveSuccess(false);
    setError(null);
  };

  return (
    <Paper elevation={3} sx={{ p: 3, height: '100%', overflow: 'auto', maxHeight: '90vh' }}>
      <Typography variant="h5" gutterBottom sx={{ mb: 3, fontWeight: 600 }}>
        👤 Formulaire Candidat
      </Typography>

      <form onSubmit={handleSubmit}>
        {/* Photo and LinkedIn Section */}
        <Box sx={{ mb: 3, textAlign: 'center' }}>
          {photoPreview ? (
            <Avatar
              src={photoPreview}
              alt="Photo du candidat"
              sx={{ width: 120, height: 120, mx: 'auto', mb: 2 }}
            />
          ) : (
            <Avatar sx={{ width: 120, height: 120, mx: 'auto', mb: 2, bgcolor: 'primary.main' }}>
              {formData.prenom?.charAt(0)}{formData.nom?.charAt(0)}
            </Avatar>
          )}
          
          {formData.profil_linkedin && (
            <Button
              variant="outlined"
              size="small"
              startIcon={<LinkedIn />}
              href={formData.profil_linkedin}
              target="_blank"
              sx={{ mb: 2 }}
            >
              Profil LinkedIn
            </Button>
          )}
        </Box>

        <Divider sx={{ mb: 3 }}>
          <Chip label="Informations Personnelles (Obligatoires)" />
        </Divider>

        {/* Personal Information */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Prénom"
              name="prenom"
              value={formData.prenom}
              onChange={handleChange}
              InputProps={{
                endAdornment: isAutoFilled('prenom') && (
                  <InputAdornment position="end">
                    <CheckCircle color="success" fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Nom"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              InputProps={{
                endAdornment: isAutoFilled('nom') && (
                  <InputAdornment position="end">
                    <CheckCircle color="success" fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              type="email"
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              InputProps={{
                startIcon: <Email />,
                endAdornment: isAutoFilled('email') && (
                  <InputAdornment position="end">
                    <CheckCircle color="success" fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Téléphone"
              name="telephone"
              value={formData.telephone}
              onChange={handleChange}
              InputProps={{
                startIcon: <Phone />,
                endAdornment: isAutoFilled('telephone') && (
                  <InputAdornment position="end">
                    <CheckCircle color="success" fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Profil LinkedIn"
              name="profil_linkedin"
              value={formData.profil_linkedin}
              onChange={handleChange}
              InputProps={{
                endAdornment: isAutoFilled('profil_linkedin') && (
                  <InputAdornment position="end">
                    <CheckCircle color="success" fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>

        <Divider sx={{ mb: 3 }}>
          <Chip label="Informations Professionnelles" />
        </Divider>

        {/* Professional Information */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Niveau d'étude"
              name="niveau_etude"
              value={formData.niveau_etude}
              onChange={handleChange}
              InputProps={{
                startIcon: <School />,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Années d'expérience"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Poste actuel"
              name="poste_actuel"
              value={formData.poste_actuel}
              onChange={handleChange}
              InputProps={{
                startIcon: <Work />,
                endAdornment: isAutoFilled('poste_actuel') && (
                  <InputAdornment position="end">
                    <CheckCircle color="success" fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Disponibilité"
              name="disponibilite"
              value={formData.disponibilite}
              onChange={handleChange}
              placeholder="Ex: Immédiate, 1 mois"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              type="number"
              label="Salaire actuel (€)"
              name="salaire_actuel"
              value={formData.salaire_actuel}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              type="number"
              label="Salaire souhaité (€)"
              name="salaire_souhaite"
              value={formData.salaire_souhaite}
              onChange={handleChange}
            />
          </Grid>
        </Grid>

        <Divider sx={{ mb: 3 }}>
          <Chip label="Compétences" />
        </Divider>

        {/* Skills Section */}
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <TextField
              fullWidth
              size="small"
              label="Ajouter une compétence"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddSkill();
                }
              }}
            />
            <Button
              variant="contained"
              size="small"
              onClick={handleAddSkill}
              startIcon={<Add />}
            >
              Ajouter
            </Button>
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {formData.competences?.map((skill, index) => (
              <Chip
                key={index}
                label={skill}
                onDelete={() => handleRemoveSkill(index)}
                color={isAutoFilled('competences') ? 'success' : 'default'}
                variant={isAutoFilled('competences') ? 'filled' : 'outlined'}
              />
            ))}
          </Box>
        </Box>

        <Divider sx={{ mb: 3 }}>
          <Chip label="Tags Personnalisés" />
        </Divider>

        {/* Tags Section */}
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <TextField
              fullWidth
              size="small"
              label="Ajouter un tag"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddTag();
                }
              }}
            />
            <Button
              variant="contained"
              size="small"
              onClick={handleAddTag}
              startIcon={<Add />}
            >
              Ajouter
            </Button>
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {formData.tags?.map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                onDelete={() => handleRemoveTag(index)}
                color="primary"
                variant="outlined"
              />
            ))}
          </Box>
        </Box>

        {/* Experiences (Read-only if extracted) */}
        {formData.experiences && formData.experiences.length > 0 && (
          <>
            <Divider sx={{ mb: 3 }}>
              <Chip
                label="Expériences Professionnelles"
                color={isAutoFilled('experiences') ? 'success' : 'default'}
              />
            </Divider>
            <Box sx={{ mb: 3 }}>
              {formData.experiences.map((exp, index) => (
                <Paper key={index} variant="outlined" sx={{ p: 2, mb: 2 }}>
                  <Typography variant="subtitle2" fontWeight={600}>
                    {exp.poste}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {exp.entreprise}
                  </Typography>
                  {exp.date_debut && (
                    <Typography variant="caption" color="text.secondary">
                      {exp.date_debut} - {exp.date_fin || 'Présent'}
                    </Typography>
                  )}
                </Paper>
              ))}
            </Box>
          </>
        )}

        {/* Formations (Read-only if extracted) */}
        {formData.formations && formData.formations.length > 0 && (
          <>
            <Divider sx={{ mb: 3 }}>
              <Chip
                label="Formations"
                color={isAutoFilled('formations') ? 'success' : 'default'}
              />
            </Divider>
            <Box sx={{ mb: 3 }}>
              {formData.formations.map((formation, index) => (
                <Paper key={index} variant="outlined" sx={{ p: 2, mb: 2 }}>
                  <Typography variant="subtitle2" fontWeight={600}>
                    {formation.diplome}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {formation.etablissement}
                  </Typography>
                  {formation.date_debut && (
                    <Typography variant="caption" color="text.secondary">
                      {formation.date_debut} - {formation.date_fin || 'Présent'}
                    </Typography>
                  )}
                </Paper>
              ))}
            </Box>
          </>
        )}

        {/* Langues (Read-only if extracted) */}
        {formData.langues && formData.langues.length > 0 && (
          <>
            <Divider sx={{ mb: 3 }}>
              <Chip
                label="Langues"
                color={isAutoFilled('langues') ? 'success' : 'default'}
              />
            </Divider>
            <Box sx={{ mb: 3, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {formData.langues.map((langue, index) => (
                <Chip
                  key={index}
                  label={`${langue.langue} - ${langue.niveau}`}
                  variant="outlined"
                />
              ))}
            </Box>
          </>
        )}

        <Divider sx={{ mb: 3 }}>
          <Chip label="Évaluation & Commentaires" />
        </Divider>

        {/* Evaluation and Comments */}
        <Box sx={{ mb: 3 }}>
          <Typography component="legend" sx={{ mb: 1 }}>
            Évaluation du candidat
          </Typography>
          <Rating
            name="evaluation"
            value={formData.evaluation}
            onChange={handleRatingChange}
            size="large"
          />
        </Box>

        <TextField
          fullWidth
          multiline
          rows={3}
          label="Commentaires"
          name="commentaires"
          value={formData.commentaires}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          multiline
          rows={3}
          label="Informations supplémentaires"
          name="informations_supplementaires"
          value={formData.informations_supplementaires}
          onChange={handleChange}
          sx={{ mb: 3 }}
        />

        {/* Success/Error Messages */}
        {saveSuccess && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Candidat enregistré avec succès!
          </Alert>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={isLoading || !formData.prenom || !formData.nom || !formData.email}
            startIcon={<Save />}
          >
            {isLoading ? 'Enregistrement...' : 'Enregistrer le candidat'}
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleReset}
            startIcon={<Clear />}
          >
            Réinitialiser
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default CandidateForm;
