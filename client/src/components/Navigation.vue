<template>
  <div class="page-container">
    <md-app>
      <md-app-toolbar class="md-transparent">
        <!-- Toolbar on top -->
        <NavigationToolbar @toggleMenu="toggleMenu" @logout="logout" :menuVisible="menuVisible" />
      </md-app-toolbar>

      <md-app-drawer :md-active.sync="menuVisible" md-persistent="full">
        <!-- Toolbar for side navigation -->
        <NavigationSideToolbar @toggleMenu="toggleMenu" />

        <!-- Navigation Items in left sidebar -->
        <NavigationSideNavBar />
      </md-app-drawer>
      <md-app-content>
        <slot></slot>
      </md-app-content>
    </md-app>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import NavigationSideToolbar from './NavigationSideToolbar.vue';
import NavigationToolbar from './NavigationToolbar.vue';
import NavigationSideNavBar from './NavigationSideNavBar.vue';
import AuthService from '../services/AuthService';

@Component({
  components: {
    NavigationSideToolbar,
    NavigationToolbar,
    NavigationSideNavBar
  }
})
export default class Navigation extends Vue {
  menuVisible = false;

  authService = new AuthService();

  mobile = true;

  mounted() {
    this.listenForResize();
  }

  listenForResize() {
    this.checkMobile();
    window.addEventListener('resize', () => {
      this.checkMobile();
    });
  }

  checkMobile() {
    this.mobile = window.innerWidth < 900;
    this.menuVisible = !this.mobile;
  }

  toggleMenu() {
    this.menuVisible = !this.menuVisible;
  }

  async logout() {
    await this.authService.logout();
  }
}
</script>

<style lang="scss" scoped>
@import './src/theme/variables.scss';

@media (min-width: $mobile) {
  .page-container {
    padding: 10px;
    background: $primary-gradient;
  }
}

.md-toolbar {
  min-height: 55px;
  padding: 0;
}

.md-app {
  height: 100%;
  border-radius: 8px;
}

// Demo purposes only
.md-drawer {
  width: 230px;
  max-width: calc(100vw - 125px);
}

.page-container {
  height: 100vh;
}
</style>
