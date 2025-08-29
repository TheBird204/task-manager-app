import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/', // Ajusta si es necesario según tu red Docker
});

api.interceptors.request.use(config => {
  // Agrega el token si existe
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // Establece el tipo de contenido
  config.headers['Content-Type'] = 'application/json';

  return config;
});

export default api;
