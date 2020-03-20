import { MutationTree } from 'vuex';
import { JwtService } from '../services/JwtService';
// eslint-disable-next-line @typescript-eslint/camelcase
import { AuthState } from './auth-state';

const jwtService = new JwtService();


const state: AuthState = {
  jwt: localStorage.jwtSkeleton,
  payload: jwtService.getPayLoad(localStorage.jwtSkeleton)
};


const mutations: MutationTree<AuthState> = {
  emitLogout: () => {
    localStorage.jwtSkeleton = '';
    state.jwt = '';
    state.payload = undefined;
  },
  emitLogin: (state, token: string) => {
    localStorage.jwtSkeleton = token;
    state.jwt = token;
    state.payload = jwtService.getPayLoad(token);
  }
};

export const AuthStore = {
  state,
  mutations
};
