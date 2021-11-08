import * as api from '../api/index';
import { AUTH } from '../actionTypes/actionTypes'
import axios from 'axios'
export const signin = (formData, router) => async (dispatch) => {
    try {
      const { data } = await api.signIn(formData);
      console.log(data);
      dispatch({ type: AUTH, data});
      alert('Login Successful');
      router.push('/UserHome'); 
    } catch (error) {
      console.log(error);
    }
  };
  export const signup = (formData, router) => async (dispatch) => {
    try {
      const { data } = await api.signUp(formData);
  
      dispatch({ type: AUTH, data });
      alert('Account Registered');
      router.push('/UserHome');
    } catch (error) {
      console.log(error);
      alert('error!');
    }
  };