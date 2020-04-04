<template>
  <md-card class="settings">
    <md-card-header>
      <md-card-header-text>
        <div class="md-subheading">
          <md-icon>{{ settingItem.icon }}</md-icon
          >{{ $t(settingItem.title) }}
        </div>
      </md-card-header-text>
    </md-card-header>
    <md-divider></md-divider>
    <md-card-content>
      <component
        @success="$emit('success')"
        @error="$emit('error')"
        :is="'profile-settings-' + settingItem.component"
        :settingItem="settingItem"
      ></component>
    </md-card-content>
    <md-divider v-if="settingItem.hasFooter"></md-divider>
  </md-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { MdCard } from 'vue-material/dist/components';
import ProfileSettingsLanguage from './ProfileSettingsLanguage.vue';
import ProfileSettingsPassword from './ProfileSettingsPassword.vue';
import { SettingsItem } from '../models/SettingsItem';

// Vue Material needed in this component
Vue.use(MdCard);

@Component({
  components: {
    ProfileSettingsLanguage,
    ProfileSettingsPassword,
  },
})
export default class ProfileSettingsContainer extends Vue {
  @Prop() settingItem!: SettingsItem;

  onSuccess() {
    this.$emit('success');
    console.log("ad")
  }
}
</script>

<style lang="scss" scoped>
.md-card-header-text {
  flex: none;
  .md-subheading {
    text-align: left;
    display: flex;
    .md-icon {
      margin-right: 10px;
    }
  }
}

.md-card-content {
  padding: 10px 16px;
}

.md-card {
  margin: 0;
}
</style>
