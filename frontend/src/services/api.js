import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const login = async (credentials) => {
  const response = await axios.post(`${API_URL}/auth/login`, credentials);
  return response.data;
};

export const register = async (userDetails) => {
  const response = await axios.post(`${API_URL}/auth/register`, userDetails);
  return response.data;
};

export const getDeliveries = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_URL}/deliveries/getall`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const deleteDelivery = async (id) => {
  const token = localStorage.getItem('token');
  const response = await axios.delete(`${API_URL}/deliveries/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updateDelivery = async (id, updatedDelivery) => {
  const token = localStorage.getItem('token');
  const response = await axios.put(`${API_URL}/deliveries/update/${id}`, updatedDelivery, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const addDelivery = async (deliveryData) => {
  const token = localStorage.getItem('token');
  const response = await axios.post(`${API_URL}/deliveries/add`, deliveryData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Add other API functions here as needed
