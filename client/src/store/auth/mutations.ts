import { MutationTree } from 'vuex';
import { AuthStateInterface, UserProfileInterface } from './state';

const mutation: MutationTree<AuthStateInterface> = {
  setToken(state: AuthStateInterface, token: string) {
    state.token = token;
    state.isAuthenticated = true;
    localStorage.setItem('token', token);
  },
  removeToken(state: AuthStateInterface) {
    state.token = '';
    state.isAuthenticated = false;
    localStorage.removeItem('token');
  },
  setMe(state: AuthStateInterface, me: UserProfileInterface) {
    state.me = me;
  },
};

export default mutation;
