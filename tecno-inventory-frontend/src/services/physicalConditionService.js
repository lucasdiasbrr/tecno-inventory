import axios from 'axios';

const API_URL = 'http://localhost:5000/api/physicalConditions';

export const getPhysicalConditions = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar condições físicas:', error);
    throw error;
  }
};

export const addPhysicalCondition = async (physicalCondition) => {
  try {
    const response = await axios.post(API_URL, physicalCondition);
    return response.data;
  } catch (error) {
    console.error('Erro ao adicionar condição física:', error);
    throw error;
  }
};

export const deletePhysicalCondition = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao deletar condição física:', error);
    throw error;
  }
};

export const updatePhysicalCondition = async (id, physicalCondition) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, physicalCondition);
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar condição física:', error);
    throw error;
  }
};
