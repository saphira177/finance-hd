import axios from 'axios';
import Vue from 'vue';

axios.defaults.baseURL = process.env.VUE_APP_API_SERVER;

export const login = (email, password) => axios.post('authentication', {
  strategy: 'local',
  email,
  password,
});

export const loginWithToken = token => axios.post('authentication', {
  strategy: 'jwt',
  accessToken: token,
});

export const getUser = userId => axios.get(`users/${userId}`, {
  headers: {
    Authorization: Vue.localStorage.get('jwt'),
  },
});
