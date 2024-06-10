import axios from 'axios';

const API_URL = 'http://localhost:5000/api/categories';

export const getCategories = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar categorias:', error);
    throw error;
  }
};

export const addCategory = async (category) => {
  try {
    const response = await axios.post(API_URL, category);
    return response.data;
  } catch (error) {
    console.error('Erro ao adicionar categoria:', error);
    throw error;
  }
};

export const updateCategory = async (id, category) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, category);
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar categoria:', error);
    throw error;
  }
};

export const deleteCategory = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error('Erro ao deletar categoria:', error);
    throw error;
  }
};
