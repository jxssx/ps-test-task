import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { AuthStateInterface } from './state';

const getters: GetterTree<AuthStateInterface, StateInterface> = {
  getMe(state) {
    return state.me;
  },

  getToken(state) {
    return state.token;
  },

  isAuthenticated(state) {
    return state.isAuthenticated;
  },
};

export default getters;
