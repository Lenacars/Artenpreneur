// lib/api.ts
import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3100', // Prod ortamda değiştir
  // headers: { Authorization: `Bearer ${token}` } gibi eklemeler yapabilirsin
});
