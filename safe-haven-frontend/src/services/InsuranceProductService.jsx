import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/insurance-products";

export const listInsuranceProducts = () => {
  return axios.get(API_BASE_URL);
};

export const typesOfInsuranceProducts = () => {
  return axios.get(`${API_BASE_URL}/types`);
};

export const createInsuranceProduct = (productData) => {
  return axios.post(API_BASE_URL, productData);
};

export const updateInsuranceProduct = (id, productData) => {
  return axios.put(`${API_BASE_URL}/${id}`, productData);
};

export const deleteInsuranceProduct = (id) => {
  return axios.delete(`${API_BASE_URL}/${id}`);
};

export const getInsuranceProductById = (id) => {
  return axios.get(`${API_BASE_URL}/${id}`);
};
