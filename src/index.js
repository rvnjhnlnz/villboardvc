import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
//import Dashboard from './component/User/Admin/Admin';
//import { Provider } from 'react-redux'
//import { createStore, applyMiddleware, compose } from 'redux'
//import thunk from 'redux-thunk'
//import reducers from './reducers'
import axios from 'axios'
//import { BrowserRouter } from 'react-router-dom';

axios.defaults.baseURL = "https://villauth.herokuapp.com/"
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
ReactDOM.render(<>
    <App />
</>
, document.getElementById('root'));

