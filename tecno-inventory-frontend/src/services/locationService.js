import axios from 'axios';

const API_URL = 'http://localhost:5000/api/locations';

export const getLocations = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar localizações:', error);
    throw error;
  }
};

export const addLocation = async (location) => {
  try {
    const response = await axios.post(API_URL, location);
    return response.data;
  } catch (error) {
    console.error('Erro ao adicionar localização:', error);
    throw error;
  }
};

export const updateLocation = async (id, location) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, location);
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar localização:', error);
    throw error;
  }
};

export const deleteLocation = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error('Erro ao deletar localização:', error);
    throw error;
  }
};
