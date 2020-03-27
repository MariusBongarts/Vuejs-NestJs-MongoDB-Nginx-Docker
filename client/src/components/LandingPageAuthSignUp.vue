<template>
  <div class="sign-in-container">
    <form class="form">
      <!-- Email form field -->
      <md-field :class="getValidationClass('email')">
        <label>{{ $t('LandingPageAuthSignIn.email') }}</label>
        <md-input v-model="email" autofocus type="email" name="email" id="emailSignUp"></md-input>
        <!-- Error required -->
        <span class="md-error" v-if="!$v.email.required"
          >{{ $t('LandingPageAuthSignIn.email') }}
          {{ $t('ERRORS.CONSTRAINTS.FIELDREQUIRED') }}</span
        >
        <!-- Error invalid email -->
        <span class="md-error" v-if="!$v.email.email"> {{ $t('ERRORS.CONSTRAINTS.isEmail') }}</span>
      </md-field>

      <!-- Password form field -->
      <md-field md-has-password :class="getValidationClass('password')">
        <label>{{ $t('LandingPageAuthSignIn.password') }}</label>
        <md-input v-model="password" type="password" name="password" id="passwordSignUp"></md-input>
        <!-- Error missing password -->
        <span class="md-error" v-if="!$v.password.required"
          >{{ $t('LandingPageAuthSignIn.password') }}
          {{ $t('ERRORS.CONSTRAINTS.FIELDREQUIRED') }}</span
        >
      </md-field>


      <!-- Password repeat form field -->
      <md-field md-has-password :class="getValidationClass('passwordRepeat')">
        <label>{{ $t('LandingPageAuth.repeatPassword') }}</label>
        <md-input v-model="passwordRepeat" type="password" name="passwordRepeat"  id="passwordRepeatSignUp"></md-input>
        <!-- Passwords do not match -->
        <span class="md-error" v-if="!$v.passwordRepeat.sameAs"
          >
          {{ $t('ERRORS.CONSTRAINTS.passwordsNotMatch') }}</span
        >
      </md-field>


      <!-- Errors from server -->
      <span class="md-error" v-for="(error, index) in errors" :key="index"
        >{{ $t(`${error}`) }}<br
      /></span>

      <div class="actions">
        <md-button class="md-raised md-primary sign-up-button" @click="validateCredentials">{{
          $t('LandingPageAuth.signUp')
        }}</md-button>
      </div>
    </form>

    <div class="loading-overlay" v-if="loading">
      <md-progress-spinner md-mode="indeterminate" :md-stroke="2"></md-progress-spinner>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AuthService from '../services/AuthService';
import { getHttpErrors } from '../helper/getHttpErrors';
import { SignUpUserDto } from '../models/SignUpUserDto';
import { validationMixin } from 'vuelidate';
import { required, email, sameAs } from 'vuelidate/lib/validators';
import { Validate } from 'vuelidate-property-decorators';

/**
 * This components makes use of vuelidate-property-decorators to validate sign up data
 * https://www.npmjs.com/package/vuelidate-property-decorators
 */
@Component({
  components: {},
  mixins: [validationMixin]
})
export default class LandingPageAuthSignUp extends Vue {
  private authService = new AuthService();

  @Validate({ required, email })
  email = '';

  @Validate({ required })
  password = '';

  @Validate({ sameAsPassword: sameAs('password') })
  passwordRepeat = '';

  showDialog = false;
  loading = false;

  errors: string[] = [];

  getValidationClass(fieldName) {
    console.log(this.$v);
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

  /**
   * Signs up user in server and pushes
   * possible erros to errors array
   */
  async auth() {
    this.errors = [];
    this.loading = true;
    const signUpUserDto: SignUpUserDto = {
      email: this.email,
      password: this.password
    };
    try {
      await this.authService.signUp(signUpUserDto);
    } catch (error) {
      this.errors = getHttpErrors(error);
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
      .sign-up-button {
        margin-left: auto;
      }
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

.reset-password {
  cursor: pointer;
}
</style>
