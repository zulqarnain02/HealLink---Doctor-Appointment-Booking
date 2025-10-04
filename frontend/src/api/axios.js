// src/api/axios.js
import axios from 'axios';
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL || '';
const VITE_API_URL = import.meta.env.VITE_API_URL || '';

const instance = axios.create({
  baseURL: VITE_BASE_URL || 'http://localhost:5000/api/auth',
});



export default instance;


export const apiurl = VITE_API_URL || 'http://localhost:5000'
