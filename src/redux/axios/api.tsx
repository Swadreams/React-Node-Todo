import axios from 'axios';
import { BASE_URL } from '../urls';
import { store } from '../store';

const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

API.interceptors.request.use((config) => {
  const state = store.getState();
  const token = state.auth.token;
  if (token) {
    config.headers.authorisation = token;
  }
  return config;
});

export default API;
