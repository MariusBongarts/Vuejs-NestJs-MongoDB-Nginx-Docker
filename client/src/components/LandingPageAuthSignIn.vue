<template>
  <div class="sign-in-container">
    <!-- Email -->
    <md-field :class="getValidationClass('email')">
      <label>{{ $t('LandingPageAuthSignIn.email') }}</label>
      <md-input name="email" id="emailSignIn" v-model="email" autofocus></md-input>

      <!-- Error email required -->
      <span class="md-error" v-if="!$v.email.required"
        >{{ $t('LandingPageAuthSignIn.email') }} {{ $t('ERRORS.CONSTRAINTS.FIELDREQUIRED') }}</span
      >
      <!-- Error invalid email -->
      <span class="md-error" v-if="!$v.email.email"> {{ $t('ERRORS.CONSTRAINTS.isEmail') }}</span>
    </md-field>

    <!-- Password  -->
    <md-field md-has-password :class="getValidationClass('password')">
      <label>{{ $t('LandingPageAuthSignIn.password') }}</label>
      <md-input name="password" id="passwordSignIn" v-model="password" type="password"></md-input>
      <!-- Error missing password -->
      <span class="md-error" v-if="!$v.password.required"
        >{{ $t('LandingPageAuthSignIn.password') }}
        {{ $t('ERRORS.CONSTRAINTS.FIELDREQUIRED') }}</span
      >
    </md-field>

    <!-- Server Errors -->
    <span class="md-error server-error" v-for="(error, index) in errors" :key="index"
      >{{ $t(error) }}<br
    /></span>

    <div class="actions">
      <md-button class="md-raised md-primary" @click="validateCredentials">{{
        $t('LandingPageAuthSignIn.login')
      }}</md-button>

      <div class="divider-container">
        <a class="reset-password">{{ $t('LandingPageAuthSignIn.resetPassword') }}</a>
        <md-divider></md-divider>
        <span class="md-caption">{{ $t('LandingPageAuth.NOTREGISTEREDYET') }}</span>
      </div>

      <router-link tag="md-button" to="sign-up" class="md-raised md-accent">{{
        $t('LandingPageAuth.signUp')
      }}</router-link>
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
import { validationMixin } from 'vuelidate';
import { required, email } from 'vuelidate/lib/validators';
import { Validate } from 'vuelidate-property-decorators';

@Component({
  components: {},
  mixins: [validationMixin]
})
export default class LandingPageAuthSignIn extends Vue {
  private authService = new AuthService();

  @Validate({ required, email })
  email = '';

  @Validate({ required })
  password = '';

  showDialog = false;
  loading = false;

  errors: string[] = [];

  getValidationClass(fieldName) {
    const field = this.$v[fieldName];
    if (field) {
      return {
        'md-invalid': field.$invalid && field.$dirty
      };
    }
  }

  /**
   * Validates the form and calls auth
   * function when form is valid
   */
  async validateCredentials() {
    this.$v.$touch();
    if (!this.$v.$invalid) {
      await this.auth();
    }
  }

  async auth() {
    this.loading = true;
    try {
      const loginData: LoginUserDto = {
        email: this.email,
        password: this.password
      };
      await this.authService.login(loginData);
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
