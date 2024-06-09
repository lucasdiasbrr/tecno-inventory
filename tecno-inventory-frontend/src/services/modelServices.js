import axios from 'axios';

const API_URL = 'http://localhost:5000/api/models';

export const getModels = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar modelos:', error);
    throw error;
  }
};

export const addModel = async (model) => {
  try {
    const response = await axios.post(API_URL, model);
    return response.data;
  } catch (error) {
    console.error('Erro ao adicionar modelo:', error);
    throw error;
  }
};

export const deleteModel = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao deletar modelo:', error);
    throw error;
  }
};
