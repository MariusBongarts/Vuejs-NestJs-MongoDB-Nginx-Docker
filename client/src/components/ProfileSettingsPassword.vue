<template class="password-settings">
  <div class="password-settings">
    <!-- Old Password form field -->
    <md-field md-has-password :class="getValidationClass('oldPassword')">
      <label>{{ $t('ProfilePage.Settings.password.oldPassword') }}</label>
      <md-input
        v-model="oldPassword"
        type="password"
        name="oldPassword"
        id="oldPassword"
      ></md-input>
      <!-- Error missing old password -->
      <span class="md-error missing-password" v-if="!$v.oldPassword.required"
        >{{ $t('ProfilePage.Settings.password.oldPassword') }}
        {{ $t('ERRORS.CONSTRAINTS.FIELDREQUIRED') }}</span
      >
    </md-field>
    <!-- Password form field -->
    <md-field md-has-password :class="getValidationClass('password')">
      <label>{{ $t('ProfilePage.Settings.password.newPassword') }}</label>
      <md-input v-model="password" type="password" name="newPassword" id="newPassword"></md-input>
      <!-- Error missing new password -->
      <span class="md-error missing-password" v-if="!$v.password.required"
        >{{ $t('ProfilePage.Settings.password.newPassword') }}
        {{ $t('ERRORS.CONSTRAINTS.FIELDREQUIRED') }}</span
      >
    </md-field>

    <!-- Password repeat form field -->
    <md-field md-has-password :class="getValidationClass('passwordRepeat')">
      <label>{{ $t('LandingPageAuth.repeatPassword') }}</label>
      <md-input
        v-model="passwordRepeat"
        type="password"
        name="passwordRepeat"
        id="passwordRepeat"
      ></md-input>
      <!-- Passwords do not match -->
      <span class="md-error not-match-password" v-if="!$v.passwordRepeat.sameAs">
        {{ $t('ERRORS.CONSTRAINTS.passwordsNotMatch') }}</span
      >
    </md-field>

    <!-- Errors from server -->
    <span class="md-error server-error" v-for="(error, index) in errors" :key="index"
      >{{ $t(`${error}`) }}<br
    /></span>

    <md-card-actions>
      <md-button id="passwordSaveBtn" class="md-primary" @click="validateCredentials">{{ $t('save') }}</md-button>
    </md-card-actions>

    <!-- Loading spinner -->
    <div class="loading-overlay" v-if="loading">
      <md-progress-spinner md-mode="indeterminate" :md-stroke="2"></md-progress-spinner>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { validationMixin } from 'vuelidate';
import { required, sameAs } from 'vuelidate/lib/validators';
import { Validate } from 'vuelidate-property-decorators';
import { getHttpErrors } from '../helper/getHttpErrors';
import AuthService from '../services/AuthService';
import { AuthStore } from '../store/auth-store';
import { ChangePasswordDto } from '../models/ChangePasswordDto';

@Component({
  name: 'profile-settings-password',
  components: {},
  mixins: [validationMixin],
})
export default class ProfileSettingsPassword extends Vue {
  private authService = new AuthService();

  @Validate({ required })
  oldPassword = '';

  @Validate({ required })
  password = '';

  @Validate({ sameAsPassword: sameAs('password') })
  passwordRepeat = '';

  loading = false;

  errors: string[] = [];

  getValidationClass(fieldName) {
    const field = this.$v[fieldName];
    if (field) {
      return {
        'md-invalid': field.$invalid && field.$dirty,
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
      await this.changePassword();
    }
  }

  /**
   * Changes the user´s password
   */
  async changePassword() {
    this.errors = [];
    this.loading = true;

    // eslint-disable-next-line
    const email = AuthStore!.state!.payload!.email! || '';

    const changePasswordDto: ChangePasswordDto = {
      email,
      oldPassword: this.oldPassword,
      newPassword: this.password,
    };
    try {
      await this.authService.changePassword(changePasswordDto);
      this.$emit('success')
      this.resetForm();
      this.loading = false;
    } catch (error) {
      this.$emit('error')
      this.errors = getHttpErrors(error);
      this.loading = false;
    }
  }

  /**
  * Resets all values form form
  */
  resetForm() {
      this.oldPassword = '';
      this.password = '';
      this.passwordRepeat = '';
      this.$v.$reset();
  }
}
</script>

<style lang="scss" scoped>
.password-settings {
  width: 100%;
}
</style>
