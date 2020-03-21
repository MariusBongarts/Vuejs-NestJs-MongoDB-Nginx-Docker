<template>
  <div class="sign-in-container">
    <div class="form">
      <md-field>
        <label>{{ $t('LandingPageAuthSignIn.email') }}</label>
        <md-input v-model="loginData.email" autofocus></md-input>
      </md-field>

      <md-field md-has-password>
        <label>{{ $t('LandingPageAuthSignIn.password') }}</label>
        <md-input v-model="loginData.password" type="password"></md-input>
      </md-field>
      <span class="md-error" v-if="error">{{ error }}</span>
      <div class="actions">
        <a>{{ $t('LandingPageAuthSignIn.resetPassword') }}</a>
        <md-button class="md-raised md-primary" @click="auth">{{ $t('LandingPageAuthSignIn.login') }}</md-button>
      </div>
    </div>

    <div class="loading-overlay" v-if="loading">
      <md-progress-spinner md-mode="indeterminate" :md-stroke="2"></md-progress-spinner>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AuthService from '../services/AuthService';
import { LoginUserDto } from '../models/LoginUserDto';

@Component({
  components: {}
})
export default class LandingPageAuthSignIn extends Vue {
  private authService = new AuthService();

  showDialog = false;
  loading = false;
  loginData: LoginUserDto = {
    email: '',
    password: ''
  };
  error = '';

  async auth() {
    this.loading = true;
    try {
      await this.authService.login(this.loginData);
    } catch (error) {
      this.error = error.error;
      this.loading = false;
    }
  }
}
</script>

<style scoped lang="scss">
.sign-in-container {
  width: 100%;
  .form {
    .actions {
      display: flex;
      justify-content: space-between;
      margin-top: 30px;
    }
    input {
      background-color: none;
    }
  }
  .loading-overlay {
    z-index: 10;
    top: 0;
    left: 0;
    right: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
