<template>
  <md-dialog :md-active.sync="showDialog" @md-closed="navigateBack">
    <!-- Box for background header and closing button -->
    <div class="header-box">
      <md-icon class="close-button" @click.native="showDialog = false">close</md-icon>
    </div>

    <div class="dialog-container">
      <div class="tab-container">
        <router-view />
      </div>
    </div>
  </md-dialog>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import LandingPageAuthSignIn from './LandingPageAuthSignIn.vue';
import LandingPageAuthSignUp from './LandingPageAuthSignUp.vue';

@Component({
  components: {
    LandingPageAuthSignIn,
    LandingPageAuthSignUp
  }
})
export default class LandingPageAuth extends Vue {
  showDialog = true;

  /**
   * Navigate back to landing page when dialog closes
   */
  async navigateBack() {
    await this.$router.push({ name: 'landing' });
  }
}
</script>

<style scoped lang="scss">
@import './src/theme/variables.scss';

.dialog-container > * {
  margin-top: 10px;
}

.dialog-container {
  max-width: 100vw;
  overflow: scroll;
  padding: 20px 0px;
}

.dialog-container::-webkit-scrollbar {
  display: none;
}

@media (min-width: $mobile) {
  .dialog-container {
    padding: 20px 30px;
  }
}

.header-box {
  background: $primary-gradient;
  height: 40px;
  display: flex;
  justify-content: flex-end;
  width: 100%;

  .close-button {
    color: white;
    cursor: pointer;
    position: absolute;
    right: 20px;
    top: 10px;
  }
}
</style>
