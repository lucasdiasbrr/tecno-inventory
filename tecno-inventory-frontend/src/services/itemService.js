// services/itemService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/items';

export const getItems = async (includeDetails = false) => {
  try {
    const response = await axios.get(`${API_URL}?includeDetails=${includeDetails}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar itens:', error);
    throw error;
  }
};

export const addItem = async (item) => {
  try {
    const response = await axios.post(API_URL, item);
    return response.data;
  } catch (error) {
    console.error('Erro ao adicionar item:', error);
    throw error;
  }
};

export const updateItem = async (id, item) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, item);
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar item:', error);
    throw error;
  }
};

export const deleteItem = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao deletar item:', error);
    throw error;
  }
};

// Fetch related data
export const getBrands = async () => {
  const response = await axios.get('http://localhost:5000/api/brands');
  return response.data;
};

export const getModels = async () => {
  const response = await axios.get('http://localhost:5000/api/models');
  return response.data;
};

export const getCategories = async () => {
  const response = await axios.get('http://localhost:5000/api/categories');
  return response.data;
};

export const getLocations = async () => {
  const response = await axios.get('http://localhost:5000/api/locations');
  return response.data;
};

export const getStates = async () => {
  const response = await axios.get('http://localhost:5000/api/states');
  return response.data;
};

export const getSuppliers = async () => {
  const response = await axios.get('http://localhost:5000/api/suppliers');
  return response.data;
};

export const getResponsibles = async () => {
  const response = await axios.get('http://localhost:5000/api/responsibles');
  return response.data;
};

export const getPhysicalConditions = async () => {
  const response = await axios.get('http://localhost:5000/api/physicalConditions');
  return response.data;
};

export const getOperatingSystems = async () => {
  const response = await axios.get('http://localhost:5000/api/operatingSystems');
  return response.data;
};

export const getTechnicalSpecifications = async () => {
  const response = await axios.get('http://localhost:5000/api/technicalSpecifications');
  return response.data;
};
