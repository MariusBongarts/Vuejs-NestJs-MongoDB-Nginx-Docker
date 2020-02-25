// eslint-disable-next-line @typescript-eslint/camelcase
import { jwt_decode } from 'jwt-decode';
import { MutationTree } from 'vuex';
import { JwtPayload } from '../models/JwtPayload';
import { AuthState } from './auth-state';

const state: AuthState = {
  jwt: localStorage.jwtTermino
};

const getters = {
  getJwtPayload: () => jwt_decode(state.jwt) as JwtPayload
};

const mutations: MutationTree<AuthState> = {
  emitLogout: () => {
    state.jwt = '';
    localStorage.jwtTermino = '';
  },
  emitLogin: () => {
    state.jwt = localStorage.jwtTermino;
  }
};

// eslint-disable-next-line import/prefer-default-export
export const AuthStore = {
  state,
  getters,
  mutations
};
