import axios from 'axios';

const API_URL = 'http://localhost:5000/api/companies';

export const createCompany = async (company) => {
  const response = await axios.post(API_URL, company);
  return response.data;
};

export const getCompanies = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const updateCompany = async (id, updates) => {
  const response = await axios.put(`${API_URL}/${id}`, updates);
  return response.data;
};

export const deleteCompany = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
