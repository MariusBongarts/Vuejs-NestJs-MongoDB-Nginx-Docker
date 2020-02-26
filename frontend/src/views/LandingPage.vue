<template>
  <div class="page-container">
    <md-button class="md-raised md-accent login-button" @click="login">Login</md-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AuthService from '../services/AuthService';

@Component({
  components: {}
})
export default class LandingPage extends Vue {
  private authService = new AuthService();

  async login() {
    await this.authService.login();
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

.login-button {
  margin: auto;
}
</style>
