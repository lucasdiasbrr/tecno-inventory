import axios from 'axios';

const API_URL = 'http://localhost:5000/api/states';

export const getStates = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar estados:', error);
    throw error;
  }
};

export const addState = async (state) => {
  try {
    const response = await axios.post(API_URL, state);
    return response.data;
  } catch (error) {
    console.error('Erro ao adicionar estado:', error);
    throw error;
  }
};

export const deleteState = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao deletar estado:', error);
    throw error;
  }
};

export const updateState = async (id, state) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, state);
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar estado:', error);
    throw error;
  }
};
