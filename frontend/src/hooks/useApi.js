import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
});

export const getProducts = (params = {}) => api.get('/products', { params }).then(r => r.data);
export const getProductById = (id) => api.get(`/products/${id}`).then(r => r.data);
export const getCategories = () => api.get('/products/categories').then(r => r.data);
export const getBrands = () => api.get('/products/brands').then(r => r.data);

export default api;
