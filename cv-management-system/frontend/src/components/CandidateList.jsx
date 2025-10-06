import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Rating,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  InputAdornment,
  Avatar,
} from '@mui/material';
import {
  Search,
  Edit,
  Delete,
  Visibility,
  Email,
  Phone,
  Refresh,
} from '@mui/icons-material';
import { listCandidates, searchCandidates, deleteCandidate, getCandidate } from '../services/api';

const CandidateList = ({ refreshTrigger }) => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchName, setSearchName] = useState('');
  const [searchEmail, setSearchEmail] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [candidateToDelete, setCandidateToDelete] = useState(null);

  // Load candidates on mount and when refreshTrigger changes
  useEffect(() => {
    loadCandidates();
  }, [refreshTrigger]);

  // Load all candidates
  const loadCandidates = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await listCandidates();
      setCandidates(data);
    } catch (err) {
      setError(err.response?.data?.detail || err.message || 'Erreur lors du chargement des candidats');
    } finally {
      setLoading(false);
    }
  };

  // Search candidates
  const handleSearch = async () => {
    if (!searchName && !searchEmail) {
      loadCandidates();
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const data = await searchCandidates(searchName, searchEmail);
      setCandidates(data);
    } catch (err) {
      setError(err.response?.data?.detail || err.message || 'Erreur lors de la recherche');
    } finally {
      setLoading(false);
    }
  };

  // View candidate details
  const handleView = async (id) => {
    try {
      const data = await getCandidate(id);
      setSelectedCandidate(data);
      setViewDialogOpen(true);
    } catch (err) {
      setError(err.response?.data?.detail || err.message || 'Erreur lors du chargement des détails');
    }
  };

  // Open delete confirmation dialog
  const handleDeleteClick = (candidate) => {
    setCandidateToDelete(candidate);
    setDeleteDialogOpen(true);
  };

  // Confirm delete
  const handleDeleteConfirm = async () => {
    if (!candidateToDelete) return;

    try {
      await deleteCandidate(candidateToDelete.id);
      setDeleteDialogOpen(false);
      setCandidateToDelete(null);
      loadCandidates(); // Reload list
    } catch (err) {
      setError(err.response?.data?.detail || err.message || 'Erreur lors de la suppression');
    }
  };

  // Close dialogs
  const handleCloseViewDialog = () => {
    setViewDialogOpen(false);
    setSelectedCandidate(null);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setCandidateToDelete(null);
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom sx={{ mb: 3, fontWeight: 600 }}>
        📋 Liste des Candidats
      </Typography>

      {/* Search Section */}
      <Box sx={{ mb: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <TextField
          size="small"
          label="Rechercher par nom"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') handleSearch();
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          sx={{ flexGrow: 1, minWidth: 200 }}
        />
        <TextField
          size="small"
          label="Rechercher par email"
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') handleSearch();
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Email />
              </InputAdornment>
            ),
          }}
          sx={{ flexGrow: 1, minWidth: 200 }}
        />
        <Button
          variant="contained"
          onClick={handleSearch}
          startIcon={<Search />}
        >
          Rechercher
        </Button>
        <Button
          variant="outlined"
          onClick={loadCandidates}
          startIcon={<Refresh />}
        >
          Actualiser
        </Button>
      </Box>

      {/* Error Message */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {/* Candidates Table */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Photo</TableCell>
              <TableCell>Nom</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Téléphone</TableCell>
              <TableCell>Poste</TableCell>
              <TableCell>Évaluation</TableCell>
              <TableCell>Tags</TableCell>
              <TableCell>Date</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={9} align="center">
                  Chargement...
                </TableCell>
              </TableRow>
            ) : candidates.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} align="center">
                  Aucun candidat trouvé
                </TableCell>
              </TableRow>
            ) : (
              candidates.map((candidate) => (
                <TableRow key={candidate.id} hover>
                  <TableCell>
                    <Avatar
                      src={candidate.photo_base64 ? `data:image/jpeg;base64,${candidate.photo_base64}` : undefined}
                      alt={`${candidate.prenom} ${candidate.nom}`}
                    >
                      {candidate.prenom?.charAt(0)}{candidate.nom?.charAt(0)}
                    </Avatar>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight={600}>
                      {candidate.prenom} {candidate.nom}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <Email fontSize="small" color="action" />
                      {candidate.email}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <Phone fontSize="small" color="action" />
                      {candidate.telephone || '-'}
                    </Typography>
                  </TableCell>
                  <TableCell>{candidate.poste_actuel || '-'}</TableCell>
                  <TableCell>
                    <Rating value={candidate.evaluation || 0} readOnly size="small" />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                      {candidate.tags && candidate.tags.length > 0 ? (
                        candidate.tags.slice(0, 2).map((tag, index) => (
                          <Chip key={index} label={tag} size="small" />
                        ))
                      ) : (
                        '-'
                      )}
                      {candidate.tags && candidate.tags.length > 2 && (
                        <Chip label={`+${candidate.tags.length - 2}`} size="small" />
                      )}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="caption">
                      {formatDate(candidate.date_creation)}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => handleView(candidate.id)}
                      title="Voir les détails"
                    >
                      <Visibility />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleDeleteClick(candidate)}
                      title="Supprimer"
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* View Dialog */}
      <Dialog
        open={viewDialogOpen}
        onClose={handleCloseViewDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Détails du Candidat
        </DialogTitle>
        <DialogContent dividers>
          {selectedCandidate && (
            <Box>
              {/* Photo and Basic Info */}
              <Box sx={{ display: 'flex', gap: 3, mb: 3 }}>
                <Avatar
                  src={selectedCandidate.photo_base64 ? `data:image/jpeg;base64,${selectedCandidate.photo_base64}` : undefined}
                  sx={{ width: 100, height: 100 }}
                >
                  {selectedCandidate.prenom?.charAt(0)}{selectedCandidate.nom?.charAt(0)}
                </Avatar>
                <Box>
                  <Typography variant="h6">
                    {selectedCandidate.prenom} {selectedCandidate.nom}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <Email fontSize="small" sx={{ mr: 0.5, verticalAlign: 'middle' }} />
                    {selectedCandidate.email}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <Phone fontSize="small" sx={{ mr: 0.5, verticalAlign: 'middle' }} />
                    {selectedCandidate.telephone || '-'}
                  </Typography>
                  {selectedCandidate.profil_linkedin && (
                    <Button
                      size="small"
                      href={selectedCandidate.profil_linkedin}
                      target="_blank"
                      sx={{ mt: 1 }}
                    >
                      LinkedIn
                    </Button>
                  )}
                </Box>
              </Box>

              {/* Professional Info */}
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" gutterBottom fontWeight={600}>
                  Informations Professionnelles
                </Typography>
                <Typography variant="body2">
                  <strong>Poste actuel:</strong> {selectedCandidate.poste_actuel || '-'}
                </Typography>
                <Typography variant="body2">
                  <strong>Niveau d'étude:</strong> {selectedCandidate.niveau_etude || '-'}
                </Typography>
                <Typography variant="body2">
                  <strong>Expérience:</strong> {selectedCandidate.experience || '-'}
                </Typography>
                <Typography variant="body2">
                  <strong>Disponibilité:</strong> {selectedCandidate.disponibilite || '-'}
                </Typography>
              </Box>

              {/* Salary */}
              {(selectedCandidate.salaire_actuel || selectedCandidate.salaire_souhaite) && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" gutterBottom fontWeight={600}>
                    Salaire
                  </Typography>
                  {selectedCandidate.salaire_actuel && (
                    <Typography variant="body2">
                      <strong>Actuel:</strong> {selectedCandidate.salaire_actuel}€
                    </Typography>
                  )}
                  {selectedCandidate.salaire_souhaite && (
                    <Typography variant="body2">
                      <strong>Souhaité:</strong> {selectedCandidate.salaire_souhaite}€
                    </Typography>
                  )}
                </Box>
              )}

              {/* Skills */}
              {selectedCandidate.competences && selectedCandidate.competences.length > 0 && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" gutterBottom fontWeight={600}>
                    Compétences
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {selectedCandidate.competences.map((skill, index) => (
                      <Chip key={index} label={skill} size="small" />
                    ))}
                  </Box>
                </Box>
              )}

              {/* Languages */}
              {selectedCandidate.langues && selectedCandidate.langues.length > 0 && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" gutterBottom fontWeight={600}>
                    Langues
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {selectedCandidate.langues.map((langue, index) => (
                      <Chip
                        key={index}
                        label={`${langue.langue} - ${langue.niveau}`}
                        size="small"
                        variant="outlined"
                      />
                    ))}
                  </Box>
                </Box>
              )}

              {/* Tags */}
              {selectedCandidate.tags && selectedCandidate.tags.length > 0 && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" gutterBottom fontWeight={600}>
                    Tags
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {selectedCandidate.tags.map((tag, index) => (
                      <Chip key={index} label={tag} size="small" color="primary" />
                    ))}
                  </Box>
                </Box>
              )}

              {/* Evaluation */}
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" gutterBottom fontWeight={600}>
                  Évaluation
                </Typography>
                <Rating value={selectedCandidate.evaluation || 0} readOnly />
              </Box>

              {/* Comments */}
              {selectedCandidate.commentaires && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" gutterBottom fontWeight={600}>
                    Commentaires
                  </Typography>
                  <Typography variant="body2">{selectedCandidate.commentaires}</Typography>
                </Box>
              )}

              {/* Additional Info */}
              {selectedCandidate.informations_supplementaires && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" gutterBottom fontWeight={600}>
                    Informations supplémentaires
                  </Typography>
                  <Typography variant="body2">
                    {selectedCandidate.informations_supplementaires}
                  </Typography>
                </Box>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseViewDialog}>Fermer</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleCloseDeleteDialog}
      >
        <DialogTitle>Confirmer la suppression</DialogTitle>
        <DialogContent>
          <Typography>
            Êtes-vous sûr de vouloir supprimer le candidat{' '}
            <strong>
              {candidateToDelete?.prenom} {candidateToDelete?.nom}
            </strong>
            ?
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Cette action est irréversible.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Annuler</Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
          >
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default CandidateList;
