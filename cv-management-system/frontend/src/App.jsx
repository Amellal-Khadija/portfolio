import React, { useState } from 'react';
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Container,
  Box,
  Typography,
  Grid,
  AppBar,
  Toolbar,
  Chip,
} from '@mui/material';
import { Description, CheckCircle } from '@mui/icons-material';
import FileUpload from './components/FileUpload';
import CandidateForm from './components/CandidateForm';
import CandidateList from './components/CandidateList';

// Create MUI theme
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    success: {
      main: '#4caf50',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function App() {
  const [extractedData, setExtractedData] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Handle extraction complete
  const handleExtractionComplete = (data) => {
    setExtractedData(data);
  };

  // Handle save success
  const handleSaveSuccess = () => {
    // Trigger refresh of candidate list
    setRefreshTrigger((prev) => prev + 1);
    
    // Reset extracted data after save
    setTimeout(() => {
      setExtractedData(null);
    }, 1000);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
      {/* App Bar */}
      <AppBar position="static" elevation={2}>
        <Toolbar>
          <Description sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            CV Management System
          </Typography>
          <Chip
            label="v1.0.0"
            size="small"
            sx={{ bgcolor: 'white', color: 'primary.main', fontWeight: 600 }}
          />
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        {/* Header */}
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant="h3" component="h1" gutterBottom fontWeight={700}>
            🎯 Système de Gestion de Candidatures
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Extraction automatique des CV avec IA | Validation manuelle | Base de données structurée
          </Typography>
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
            <Chip
              icon={<CheckCircle />}
              label="Upload PDF, DOCX, TXT, Images"
              color="primary"
              variant="outlined"
            />
            <Chip
              icon={<CheckCircle />}
              label="Extraction intelligente des données"
              color="primary"
              variant="outlined"
            />
            <Chip
              icon={<CheckCircle />}
              label="Validation en temps réel"
              color="primary"
              variant="outlined"
            />
            <Chip
              icon={<CheckCircle />}
              label="CRUD complet"
              color="primary"
              variant="outlined"
            />
          </Box>
        </Box>

        {/* Two-Column Layout: Upload + Form */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {/* Left Column: File Upload */}
          <Grid item xs={12} md={5}>
            <FileUpload onExtractionComplete={handleExtractionComplete} />
          </Grid>

          {/* Right Column: Candidate Form */}
          <Grid item xs={12} md={7}>
            <CandidateForm
              extractedData={extractedData}
              onSaveSuccess={handleSaveSuccess}
            />
          </Grid>
        </Grid>

        {/* Candidate List */}
        <Box sx={{ mt: 4 }}>
          <CandidateList refreshTrigger={refreshTrigger} />
        </Box>

        {/* Footer */}
        <Box sx={{ mt: 6, py: 3, textAlign: 'center', borderTop: '1px solid #e0e0e0' }}>
          <Typography variant="body2" color="text.secondary">
            © 2024 CV Management System | Développé avec React 18, Material-UI 5, FastAPI & MySQL
          </Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
