import { LoginUserDto } from './../models/LoginUserDto';
import router from '@/router/router';
import store from '@/store/store';
import httpClient from './HttpService';

export default class AuthService {


  /**
   * Call server to login and save JSON Web Token in store
   *
   * @param {LoginUserDto} loginUserDto
   * @memberof AuthService
   */
  async login(loginUserDto: LoginUserDto) {
    const response = await httpClient.post('auth', loginUserDto);
    const token = response.data.token;
    // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDdlYTYyMzU2NTZmMTJiNDAyYjUzYzAiLCJlbWFpbCI6Im1hcml1c2JvbmdhcnRzQHdlYi5kZSIsImlhdCI6MTU4MjIzMTk1MiwiZXhwIjoxNjE4MjMxOTUyfQ.xw8gQ1fyUaP0oom-zGopibWshkO3kQF8ICuhX5wSHb4';
    if (token) {
      store.commit('emitLogin', token);
      router.push({ path: 'home', name: 'dashboard' });
    }
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
