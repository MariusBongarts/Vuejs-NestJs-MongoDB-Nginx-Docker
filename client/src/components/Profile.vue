<template>
  <div class="container-lg">
    <div class="row d-flex justify-content-around">
      <ProfileSettingsContainer
        @success="settingChangedSuccessfully(setting)"
        @error="settingChangedFailed()"
        class="col mt-3 mx-md-2"
        v-for="(setting, index) in settingItems"
        :key="index"
        :settingItem="setting"
      />
    </div>

    <!-- Snackbar to show either success or error toasts -->
    <md-snackbar
      md-position="left"
      :md-duration="snackbarDuration"
      :md-active.sync="showSnackBar"
      md-persistent
    >
      <span :class="'md-' + snackBarColor">{{ $t(snackBarMsg) }}</span>
    </md-snackbar>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ProfileSettingsContainer from './ProfileSettingsContainer.vue';
import { SettingsItem } from './../models/SettingsItem';
@Component({
  components: {
    ProfileSettingsContainer,
  },
})
export default class Profile extends Vue {
  showSnackBar = false;
  snackbarDuration = 4000;
  snackBarMsg = '';
  snackBarColor: 'success' | 'error' = 'success';
  public settingItems: SettingsItem[] = [
    {
      component: 'language',
      icon: 'language',
      title: 'ProfilePage.Settings.language.title',
      successMsg: 'ProfilePage.Settings.language.successMsg',
      hasFooter: false,
    },
    {
      component: 'password',
      icon: 'lock',
      title: 'ProfilePage.Settings.password.title',
      successMsg: 'ProfilePage.Settings.password.successMsg',
      hasFooter: false,
    },
  ];

  settingChangedSuccessfully(setting: SettingsItem) {
    this.snackBarMsg = setting.successMsg;
    this.snackBarColor = 'success';
    this.showSnackBar = true;
  }

  settingChangedFailed() {
    this.snackBarColor = 'error';
    this.snackBarMsg = 'ERRORS.SNACKBAR.CUSTOM';
    this.showSnackBar = true;
  }
}
</script>

<style scoped lang="scss">
@import './../theme/variables.scss';
</style>
