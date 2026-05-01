import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/insurance-products';

export const listInsuranceProducts =  () => {
    return axios.get(API_BASE_URL);
}