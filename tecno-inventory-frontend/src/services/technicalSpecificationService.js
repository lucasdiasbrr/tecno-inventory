// services/technicalSpecificationService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/technicalSpecifications';

export const getTechnicalSpecifications = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar especificações técnicas:', error);
    throw error;
  }
};

export const addTechnicalSpecification = async (technicalSpecification) => {
  try {
    const response = await axios.post(API_URL, technicalSpecification);
    return response.data;
  } catch (error) {
    console.error('Erro ao adicionar especificação técnica:', error);
    throw error;
  }
};

export const updateTechnicalSpecification = async (id, technicalSpecification) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, technicalSpecification);
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar especificação técnica:', error);
    throw error;
  }
};

export const deleteTechnicalSpecification = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao deletar especificação técnica:', error);
    throw error;
  }
};
