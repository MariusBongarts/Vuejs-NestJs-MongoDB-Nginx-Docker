import { ChangePasswordDto } from './../models/ChangePasswordDto';
import { SignUpUserDto } from './../models/SignUpUserDto';
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
    if (response) {
      const token = response.data.token;
      store.commit('emitLogin', token);
      router.push({ path: 'home', name: 'dashboard' });
    }
  }


  /**
   * Call server to sign up a new user
   *
   * @param {SignUpUserDto} signUpUserDto
   * @memberof AuthService
   */
  async signUp(signUpUserDto: SignUpUserDto) {
    const response = await httpClient.post('/users/register', signUpUserDto);
    if (response) {
      const token = response.data.token;
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
    localStorage.jwtSkeleton = '';
    router.push({ path: '', name: 'landing' });
  }

  /**
   * Changes the user´s password in the server
   *
   * @param changePasswordDto
   */
  async changePassword(changePasswordDto: ChangePasswordDto) {
    return await httpClient.post('/users/change-password', changePasswordDto);
  }
}
