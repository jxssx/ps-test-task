import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { AuthStateInterface } from './state';
import { api } from 'src/boot/axios';

const actions: ActionTree<AuthStateInterface, StateInterface> = {
  async doLogin({ commit, dispatch }, payload) {
    const { data } = await api.post('/auth/login', payload);
    commit('setToken', data.token);
    api.defaults.headers.common.Authorization = 'Bearer' + data.token;
    dispatch('getMe', data.token);
  },

  async doRegister({ commit, dispatch }, payload) {
    const { data } = await api.post('/auth/register', payload);
    commit('setToken', data.token);
    api.defaults.headers.common.Authorization = 'Bearer' + data.token;
    dispatch('getMe', data.token);
  },

  async updateUser({ commit, getters }, payload) {
    try {
      const token = getters['getToken'];
      const { data } = await api.patch('/users/profile', payload, {
        headers: { Authorization: 'Bearer ' + token },
      });
      commit('setMe', data);
    } catch (e) {
      alert(e);
    }
  },

  signOut({ commit }) {
    api.defaults.headers.common.Authorization = '';
    commit('removeToken');
  },

  async getMe({ commit }, token) {
    const { data } = await api.get('/users/profile', {
      headers: { Authorization: 'Bearer ' + token },
    });
    commit('setMe', data);
  },

  async init({ commit, dispatch }) {
    const token = localStorage.getItem('token');
    if (token) {
      commit('setToken', token);
      api.defaults.headers.common.Authorization = 'Bearer ' + token;
      await dispatch('getMe', token);
    } else {
      commit('removeToken');
    }
  },
};

export default actions;
