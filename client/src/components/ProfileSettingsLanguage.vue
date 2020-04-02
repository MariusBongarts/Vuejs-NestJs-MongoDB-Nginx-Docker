<template>
  <div class="lng-settings">
    <md-field>
      <label for="movie">Movie</label>
      <md-select v-model="currentLanguage"
      @md-selected="switchLanguage"
       name="language" id="language">
        <md-option v-for="(lng, index) in languages" :key="index" :value="lng">{{
          $t('ProfilePage.Settings.language.' + lng)
        }}</md-option>
      </md-select>
    </md-field>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { changeLanguage } from '../helper/i18n.service';
import { Language } from '../models/Types';

@Component({
  name: 'profile-settings-language',
  components: {}
})
export default class ProfileSettingsLanguage extends Vue {
  languages: Language[] = ['de', 'en'];
  currentLanguage = '';

  mounted() {
    this.currentLanguage = this.$i18n.locale || 'en';
  }

  switchLanguage(lng: Language) {
    changeLanguage(lng);
  }
}
</script>

<style lang="scss" scoped></style>
