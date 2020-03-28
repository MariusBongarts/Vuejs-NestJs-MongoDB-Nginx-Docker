<template>
  <div class="sign-in-container">
    <md-field>
      <label>{{ $t('LandingPageAuthSignIn.email') }}</label>
      <md-input name="email" id="emailSignIn" v-model="loginData.email" autofocus></md-input>
    </md-field>

    <md-field md-has-password>
      <label>{{ $t('LandingPageAuthSignIn.password') }}</label>
      <md-input
        name="password"
        id="passwordSignIn"
        v-model="loginData.password"
        type="password"
      ></md-input>
    </md-field>

    <!-- Errors -->
    <span class="md-error server-error" v-for="(error, index) in errors" :key="index"
      >{{ $t(error) }}<br
    /></span>

    <div class="actions">
      <md-button class="md-raised md-primary" @click="auth">{{
        $t('LandingPageAuthSignIn.login')
      }}</md-button>

      <div class="divider-container">
        <a class="reset-password">{{ $t('LandingPageAuthSignIn.resetPassword') }}</a>
        <md-divider></md-divider>
        <span class="md-caption">{{ $t('LandingPageAuth.NOTREGISTEREDYET') }}</span>
      </div>

      <router-link tag="md-button" to="sign-up" class="md-raised md-accent"
        >{{ $t('LandingPageAuth.signUp') }}</router-link
      >
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
import { getHttpErrors } from '../helper/getHttpErrors';

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
  errors: string[] = [];

  async auth() {
    this.loading = true;
    try {
      await this.authService.login(this.loginData);
    } catch (error) {
      this.errors = getHttpErrors(error);
      this.loading = false;
    }
  }
}
</script>

<style scoped lang="scss">
@import '../shared/scss/sign-in-out.scss';

.reset-password {
  cursor: pointer;
  margin: 0;
}
</style>
