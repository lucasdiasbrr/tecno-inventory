// tecno-inventory-frontend/src/services/itemService.js
import axios from 'axios';

const apiUrl = 'http://localhost:3000/api/items';

export const getItems = async () => {
  const response = await axios.get(apiUrl);
  return response.data;
};

export const addItem = async (item) => {
  const response = await axios.post(apiUrl, item);
  return response.data;
};

export const deleteItem = async (id) => {
  await axios.delete(`${apiUrl}/${id}`);
};
