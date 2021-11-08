import axios from 'axios';

const API = axios.create({ baseURL: 'https://villauth.herokuapp.com/' })

export const getinfo = () => API.get('https://villauth.herokuapp.com/getinfo');
export const signIn = (formData) => API.post('https://villauth.herokuapp.com/authenticate', formData);
export const signUp = (formData) => API.post('https://villauth.herokuapp.com/addUser', formData);