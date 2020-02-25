// eslint-disable-next-line @typescript-eslint/camelcase
import * as jwt_decode from 'jwt-decode';
import { MutationTree } from 'vuex';
import { JwtPayload } from '../models/JwtPayload';
import { AuthState } from './auth-state';

const state: AuthState = {
  jwt: localStorage.jwtTermino
};

const getters = {
  getJwtPayload: () => {
    try {
      return jwt_decode(state.jwt) as JwtPayload;
    } catch (error) {
      return {};
    }
  }
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
