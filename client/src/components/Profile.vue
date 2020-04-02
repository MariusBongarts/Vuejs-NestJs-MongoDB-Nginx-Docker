<template>
  <div class="profile-container">
    <ProfileSettingsContainer
      v-for="(setting, index) in settingItems"
      :key="index"
      :settingItem="setting"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ProfileSettingsContainer from './ProfileSettingsContainer.vue';
import { SettingsItem } from './../models/SettingsItem';
@Component({
  components: {
    ProfileSettingsContainer
  }
})
export default class Profile extends Vue {
  public settingItems: SettingsItem[] = [
    {
      component: 'language',
      title: 'ProfilePage.Settings.language.title'
    }
  ];
}
</script>

<style scoped lang="scss">
.profile-container {
  display: flex;
  padding: 100px;
}
</style>
