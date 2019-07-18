import axios from 'axios';

export const check = (params) => { return axios.post(`node/check`,params); };

// 访问税局
export const getList = (params) => { return axios.get(`tax/checkTax`,{params:params}); };
export const taxStatus = (params) => { return axios.get(`tax/payTax`,{params:params}); };
export const taxName =(params)=>{return axios.get('tax/checkCollectingOfficeName',{params:params})};


export const save = (params) => { return axios.get(`bank/saveData`,{params:params}); };
export const accountName =(params)=>{return axios.get('bank/checkBranchName',{params:params})};
