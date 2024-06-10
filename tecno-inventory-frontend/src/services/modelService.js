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

export const updateModel = async (id, model) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, model);
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar modelo:', error);
    throw error;
  }
};

export const deleteModel = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error('Erro ao deletar modelo:', error);
    throw error;
  }
};
