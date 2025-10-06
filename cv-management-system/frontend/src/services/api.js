import axios from 'axios';

// API Base URL - update this to match your backend URL
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// CV Upload and Extraction
export const uploadCV = async (file, save = false) => {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await api.post(`/api/upload-cv?save=${save}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  
  return response.data;
};

// Create Candidate Manually
export const createCandidate = async (candidateData) => {
  const response = await api.post('/api/create-candidate', candidateData);
  return response.data;
};

// Get Single Candidate
export const getCandidate = async (id) => {
  const response = await api.get(`/api/cv/${id}`);
  return response.data;
};

// Update Candidate
export const updateCandidate = async (id, candidateData) => {
  const response = await api.put(`/api/update-cv/${id}`, candidateData);
  return response.data;
};

// Delete Candidate
export const deleteCandidate = async (id) => {
  const response = await api.delete(`/api/cv/${id}`);
  return response.data;
};

// List All Candidates
export const listCandidates = async (skip = 0, limit = 100) => {
  const response = await api.get('/api/cvs', {
    params: { skip, limit },
  });
  return response.data;
};

// Search Candidates
export const searchCandidates = async (name = '', email = '') => {
  const params = {};
  if (name) params.name = name;
  if (email) params.email = email;
  
  const response = await api.get('/api/search-cv', { params });
  return response.data;
};

// Health Check
export const checkHealth = async () => {
  const response = await api.get('/health');
  return response.data;
};

export default api;
