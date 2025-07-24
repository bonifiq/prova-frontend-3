import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptador para requisições
api.interceptors.request.use(
  (config) => {
    console.log('🚀 Fazendo requisição para:', config.url);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptador para respostas
api.interceptors.response.use(
  (response) => {
    console.log('✅ Resposta recebida de:', response.config.url);
    return response;
  },
  (error) => {
    console.error('❌ Erro na requisição:', error.message);
    return Promise.reject(error);
  }
);