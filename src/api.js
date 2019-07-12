import axios from 'axios';
// axios.defaults.baseURL = 'http://127.0.0.1:8888/api/tax';

export const getList = (params) => { return axios.get(`api/tax/checkTax`,{params:params}); };
export const taxStatus = (params) => { return axios.post(`api/tax/payTax`,params); };
export const test=(params)=>{return axios.get("api/tax/test",{params:params});}
