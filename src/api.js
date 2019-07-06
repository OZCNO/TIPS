import axios from 'axios';
axios.defaults.baseURL = 'http://127.0.0.1:8083';

export const getList = (params) => { return axios.get(`list`,{params:params}); };
export const taxStatus = (params) => { return axios.post(`tax`,params); };