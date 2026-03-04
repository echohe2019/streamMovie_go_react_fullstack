import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

const axiosClient = axios.create({
    baseURL: apiUrl,
    headers:{'Content-Type':'application/json'},
    withCredentials: true
})
export default axiosClient;