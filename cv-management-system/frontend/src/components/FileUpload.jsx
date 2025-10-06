import React, { useState, useCallback } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  LinearProgress,
  Alert,
  AlertTitle,
  Chip,
} from '@mui/material';
import {
  CloudUpload,
  CheckCircle,
  Error,
  Refresh,
} from '@mui/icons-material';
import { uploadCV } from '../services/api';

const FileUpload = ({ onExtractionComplete }) => {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Accepted file types
  const acceptedTypes = [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/msword',
    'text/plain',
    'image/jpeg',
    'image/jpg',
    'image/png',
  ];

  const acceptedExtensions = ['pdf', 'docx', 'doc', 'txt', 'jpg', 'jpeg', 'png'];

  // Validate file
  const validateFile = (file) => {
    // Check file size (10MB max)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      setError('Fichier trop volumineux. Taille maximum: 10MB');
      return false;
    }

    // Check file type
    const extension = file.name.split('.').pop().toLowerCase();
    if (!acceptedExtensions.includes(extension)) {
      setError(`Type de fichier non supporté. Types acceptés: ${acceptedExtensions.join(', ')}`);
      return false;
    }

    return true;
  };

  // Handle file selection
  const handleFileSelect = useCallback((selectedFile) => {
    setError(null);
    setSuccess(false);
    setUploadProgress(0);

    if (validateFile(selectedFile)) {
      setFile(selectedFile);
    }
  }, []);

  // Handle drag events
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handleFileSelect(droppedFile);
    }
  };

  // Handle file input change
  const handleFileInputChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      handleFileSelect(selectedFile);
    }
  };

  // Extract CV data
  const handleExtractCV = async () => {
    if (!file) return;

    setLoading(true);
    setError(null);
    setSuccess(false);
    setUploadProgress(10);

    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      // Upload and extract CV (save=false for extraction only)
      const extractedData = await uploadCV(file, false);

      clearInterval(progressInterval);
      setUploadProgress(100);
      setSuccess(true);
      setLoading(false);

      // Pass extracted data to parent component
      if (onExtractionComplete) {
        onExtractionComplete(extractedData);
      }
    } catch (err) {
      setLoading(false);
      setUploadProgress(0);
      const errorMessage = err.response?.data?.detail || err.message || 'Erreur lors de l\'extraction du CV';
      setError(errorMessage);
    }
  };

  // Reset component
  const handleReset = () => {
    setFile(null);
    setError(null);
    setSuccess(false);
    setUploadProgress(0);
    setLoading(false);
  };

  return (
    <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
      <Typography variant="h5" gutterBottom sx={{ mb: 3, fontWeight: 600 }}>
        📄 Upload et Extraction de CV
      </Typography>

      {/* Drag & Drop Zone */}
      <Box
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        sx={{
          border: `2px dashed ${isDragging ? '#1976d2' : '#ccc'}`,
          borderRadius: 2,
          p: 4,
          textAlign: 'center',
          bgcolor: isDragging ? 'action.hover' : 'background.default',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          mb: 2,
        }}
        onClick={() => document.getElementById('file-input').click()}
      >
        <CloudUpload sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
        <Typography variant="h6" gutterBottom>
          Glissez-déposez votre CV ici
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          ou cliquez pour sélectionner un fichier
        </Typography>
        <Box sx={{ mt: 2 }}>
          {acceptedExtensions.map((ext) => (
            <Chip key={ext} label={ext.toUpperCase()} size="small" sx={{ m: 0.5 }} />
          ))}
        </Box>
        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
          Taille maximum: 10MB
        </Typography>
        <input
          id="file-input"
          type="file"
          accept={acceptedExtensions.map((ext) => `.${ext}`).join(',')}
          onChange={handleFileInputChange}
          style={{ display: 'none' }}
        />
      </Box>

      {/* Selected File Info */}
      {file && (
        <Box sx={{ mb: 2, p: 2, bgcolor: 'action.hover', borderRadius: 1 }}>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            Fichier sélectionné:
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
          </Typography>
        </Box>
      )}

      {/* Progress Bar */}
      {loading && (
        <Box sx={{ mb: 2 }}>
          <LinearProgress variant="determinate" value={uploadProgress} />
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
            Extraction en cours... {uploadProgress}%
          </Typography>
        </Box>
      )}

      {/* Error Message */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }} icon={<Error />}>
          <AlertTitle>Erreur</AlertTitle>
          {error}
        </Alert>
      )}

      {/* Success Message */}
      {success && (
        <Alert severity="success" sx={{ mb: 2 }} icon={<CheckCircle />}>
          <AlertTitle>Succès</AlertTitle>
          CV extrait avec succès! Les données ont été chargées dans le formulaire.
        </Alert>
      )}

      {/* Action Buttons */}
      <Box sx={{ display: 'flex', gap: 2 }}>
        {!success ? (
          <Button
            variant="contained"
            color="primary"
            fullWidth
            disabled={!file || loading}
            onClick={handleExtractCV}
            startIcon={<CloudUpload />}
          >
            {loading ? 'Extraction en cours...' : 'Extraire les données'}
          </Button>
        ) : (
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            onClick={handleReset}
            startIcon={<Refresh />}
          >
            Analyser un autre CV
          </Button>
        )}
      </Box>

      {/* Instructions */}
      <Box sx={{ mt: 3, p: 2, bgcolor: 'info.lighter', borderRadius: 1 }}>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
          <strong>ℹ️ Instructions:</strong>
        </Typography>
        <Typography variant="caption" color="text.secondary" component="div">
          1. Uploadez votre CV (PDF, DOCX, TXT ou Image)
          <br />
          2. Cliquez sur "Extraire les données" pour analyser le CV
          <br />
          3. Vérifiez les informations extraites dans le formulaire
          <br />
          4. Complétez ou modifiez les données si nécessaire
          <br />
          5. Enregistrez le candidat dans la base de données
        </Typography>
      </Box>
    </Paper>
  );
};

export default FileUpload;
