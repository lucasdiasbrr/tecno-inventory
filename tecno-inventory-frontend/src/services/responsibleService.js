import axios from 'axios';

const API_URL = 'http://localhost:5000/api/responsibles';

export const getResponsibles = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar responsáveis:', error);
    throw error;
  }
};

export const addResponsible = async (responsible) => {
  try {
    const response = await axios.post(API_URL, responsible);
    return response.data;
  } catch (error) {
    console.error('Erro ao adicionar responsável:', error);
    throw error;
  }
};

export const deleteResponsible = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao deletar responsável:', error);
    throw error;
  }
};

export const updateResponsible = async (id, responsible) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, responsible);
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar responsável:', error);
    throw error;
  }
};
