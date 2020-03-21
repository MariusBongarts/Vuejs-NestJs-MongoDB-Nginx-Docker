<template>
  <div class="login-button">
    <md-dialog :md-active.sync="showDialog">
      <md-icon class="close-button" @click.native="showDialog = false">close</md-icon>
      <div class="tab-container">
      <md-tabs md-dynamic-height>
        <md-tab md-label="SIGN IN">
          <LandingPageAuthSignIn />
        </md-tab>
        <md-tab md-label="SIGN UP">
          <LandingPageAuthSignUp />
        </md-tab>
      </md-tabs>
      </div>
    </md-dialog>

    <md-button class="md-raised md-accent" @click="showDialog = true">{{ $t('LandingPageAuthSignIn.login') }}</md-button>
  </div>
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
  showDialog = false;
}
</script>

<style scoped lang="scss">

.tab-container {
  // Necesarry because otherwise tabs were wider tha screen on mobile screens
  max-width: 100vw;
}
.md-dialog {
  max-width: 100vw;
}
.md-dialog {
  padding: 0px;

  .close-button {
    cursor: pointer;
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 2;
  }
}

.md-tabs {
  display: flex;
  max-width: 100%;
}

.md-tab {
  padding: 50px 20px;
}

.login-button {
  margin: auto;
}
</style>
