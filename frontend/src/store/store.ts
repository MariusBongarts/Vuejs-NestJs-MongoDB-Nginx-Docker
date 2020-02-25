import Vue from 'vue';
import Vuex from 'vuex';
import { AuthStore } from './auth-store';

Vue.use(Vuex);

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth: AuthStore
  }
});
