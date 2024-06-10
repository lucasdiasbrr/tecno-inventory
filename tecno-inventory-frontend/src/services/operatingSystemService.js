import axios from 'axios';

const API_URL = 'http://localhost:5000/api/operatingSystems';

export const getOperatingSystems = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar sistemas operacionais:', error);
    throw error;
  }
};

export const addOperatingSystem = async (operatingSystem) => {
  try {
    const response = await axios.post(API_URL, operatingSystem);
    return response.data;
  } catch (error) {
    console.error('Erro ao adicionar sistema operacional:', error);
    throw error;
  }
};

export const deleteOperatingSystem = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao deletar sistema operacional:', error);
    throw error;
  }
};

export const updateOperatingSystem = async (id, operatingSystem) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, operatingSystem);
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar sistema operacional:', error);
    throw error;
  }
};
