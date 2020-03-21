<template>
  <div class="page-container">
    <LandingPageAuth />
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
  height: 100vh;
  background: $primary-gradient;
  display: flex;
  justify-content: center;
}

</style>
