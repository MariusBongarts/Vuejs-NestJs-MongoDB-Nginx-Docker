<template>
  <md-card class="settings">
    <md-card-header>
      <md-card-header-text>
        <div class="md-title">{{ $t(settingItem.title) }}</div>
      </md-card-header-text>
    </md-card-header>
    <md-card-content>
      <component :is="'profile-settings-' + settingItem.component"></component>
    </md-card-content>
    <md-card-actions>
      <md-button class="md-primary">Save</md-button>
    </md-card-actions>
  </md-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { MdCard } from 'vue-material/dist/components';
import ProfileSettingsLanguage from './ProfileSettingsLanguage.vue';
import { SettingsItem } from '../models/SettingsItem';

// Vue Material needed in this component
Vue.use(MdCard);

@Component({
  components: {
    ProfileSettingsLanguage
  }
})
export default class ProfileSettingsContainer extends Vue {
  @Prop() settingItem!: SettingsItem;
}
</script>

<style lang="scss" scoped></style>
