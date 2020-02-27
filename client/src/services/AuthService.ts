import router from '@/router/router';
import store from '@/store/store';

export default class AuthService {
  async login() {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDdlYTYyMzU2NTZmMTJiNDAyYjUzYzAiLCJlbWFpbCI6Im1hcml1c2JvbmdhcnRzQHdlYi5kZSIsImlhdCI6MTU4MjIzMTk1MiwiZXhwIjoxNjE4MjMxOTUyfQ.xw8gQ1fyUaP0oom-zGopibWshkO3kQF8ICuhX5wSHb4';
    store.commit('emitLogin', token);
    router.push({ path: 'home', name: 'dashboard' });
  }


  /**
   * Remove JSON Web Token from localstorage. And navigate to landing page.
   * The AuthGuard of the router will trigger the emitLogout in the AuthState
   *
   * @memberof AuthService
   */
  async logout() {
    localStorage.jwtTermino = '';
    router.push({ path: '', name: 'landing' });
  }
}
