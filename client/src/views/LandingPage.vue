<template>
  <div class="page-container">
    <!-- <LandingPageAuth /> -->
    <div class="landing-info-container">
      <span class="md-headline">Vuejs + Nestjs Skeleton</span>
      <span class="md-subheading"
        >This project provides a skeleton to build a response WebApp with authorization</span
      >
      <md-divider></md-divider>

      <!-- Get started -->
      <router-link to="auth/sign-in"
        ><md-button class="md-raised md-accent" id="getStartedBtn"
          >Get started</md-button
        ></router-link
      >
    </div>

    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AuthService from '../services/AuthService';
import { LoginUserDto } from '../models/LoginUserDto';
import LandingPageAuth from './../components/LandingPageAuth.vue';

@Component({
  components: {
    LandingPageAuth
  }
})
export default class LandingPage extends Vue {
  private authService = new AuthService();

  async login() {
    const loginData: LoginUserDto = {
      email: process.env.VUE_APP_ADMIN_USER as string,
      password: process.env.VUE_APP_ADMIN_PASSWORD as string
    };
    try {
      await this.authService.login(loginData);
    } catch (error) {
      //
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import './src/theme/variables.scss';

.page-container {
  align-items: center;
  background: $primary-gradient;
  color: white;
  display: flex;
  height: 100vh;
  justify-content: center;
}

.landing-info-container > * {
  display: block;
  margin: 10px 0px;
  max-width: 400px;
}

#getStartedBtn {
  font-size: 0.8em;
  padding: 10px;
}
</style>
