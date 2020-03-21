<template>
  <div class="sign-in-container">
    <div class="form">
      <md-field>
        <label>E-mail</label>
        <md-input v-model="login.email" autofocus></md-input>
      </md-field>

      <md-field md-has-password>
        <label>Password</label>
        <md-input v-model="login.password" type="password"></md-input>
      </md-field>
      <div class="actions">
        <md-button class="md-raised md-primary" @click="auth">SIGN UP</md-button>
      </div>
    </div>

    <div class="loading-overlay" v-if="loading">
      <md-progress-spinner md-mode="indeterminate" :md-stroke="2"></md-progress-spinner>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {}
})
export default class LandingPageAuthSignUp extends Vue {
  showDialog = false;
  loading = false;
  login = {
    email: '',
    password: ''
  };

  auth() {
    this.loading = true;
    console.log(this.login);
    setTimeout(() => {
      this.loading = false;
      this.showDialog = false;
    }, 5000);
  }
}
</script>

<style scoped lang="scss">
.sign-in-container {
  width: 100%;
  .form {
    .actions {
      display: flex;
      justify-content: flex-end;
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
