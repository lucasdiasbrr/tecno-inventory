import axios from 'axios';

const API_URL = 'http://localhost:5000/api/brands';

export const getBrands = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar marcas:', error);
    throw error;
  }
};

export const addBrand = async (brand) => {
  try {
    const response = await axios.post(API_URL, brand);
    return response.data;
  } catch (error) {
    console.error('Erro ao adicionar marca:', error);
    throw error;
  }
};

export const updateBrand = async (id, brand) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, brand);
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar marca:', error);
    throw error;
  }
};

export const deleteBrand = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error('Erro ao deletar marca:', error);
    throw error;
  }
};
