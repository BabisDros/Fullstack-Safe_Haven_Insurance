import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/covers";

export const typesOfCovers = () => {
  return axios.get(`${API_BASE_URL}/types`);
};

export const createCover = (coverData) => {
  return axios.post(API_BASE_URL, coverData);
};

export const updateCover = (id, coverData) => {
  return axios.put(`${API_BASE_URL}/${id}`, coverData);
};

export const deleteCover = (id) => {
  return axios.delete(`${API_BASE_URL}/${id}`);
};
