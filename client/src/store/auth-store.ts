import { MutationTree } from 'vuex';
import { JwtService } from '../services/JwtService';
// eslint-disable-next-line @typescript-eslint/camelcase
import { AuthState } from './auth-state';

const jwtService = new JwtService();


const state: AuthState = {
  jwt: localStorage.jwtTermino,
  payload: jwtService.getPayLoad(localStorage.jwtTermino)
};


const mutations: MutationTree<AuthState> = {
  emitLogout: () => {
    localStorage.jwtTermino = '';
    state.jwt = '';
    state.payload = undefined;
  },
  emitLogin: (state, token: string) => {
    localStorage.jwtTermino = token;
    state.jwt = token;
    state.payload = jwtService.getPayLoad(token);
  }
};

// eslint-disable-next-line import/prefer-default-export
export const AuthStore = {
  state,
  mutations
};
