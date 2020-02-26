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

        <md-list>
          <md-list-item to="/home">
            <md-icon>dashboard</md-icon>
            <span class="md-list-item-text">Dashboard</span>
          </md-list-item>

          <md-list-item to="/calendar">
            <md-icon>calendar_today</md-icon>
            <span class="md-list-item-text">Kalender</span>
          </md-list-item>

          <md-list-item to="/customer">
            <md-icon>people</md-icon>
            <span class="md-list-item-text">Kunden</span>
          </md-list-item>

          <md-list-item to="/company">
            <md-icon>house</md-icon>
            <span class="md-list-item-text">Unternehmen</span>
          </md-list-item>
        </md-list>
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
import { CONSTANTS } from '../constants/constants';

@Component({
  components: {
    NavigationSideToolbar,
    NavigationToolbar
  }
})
export default class Navigation extends Vue {
  menuVisible = false;

  mobile = true;

  mounted() {
    this.listenForResize();
    console.log(CONSTANTS.NAVITEMS);
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
    localStorage.jwtTermino = '';
    await this.$router.push({ path: '/', name: 'landing' });
  }
}
</script>

<style lang="scss" scoped>
@import './src/theme/variables.scss';

@media (min-width: 900px) {
  .page-container {
    padding: 10px;
    background: $primary-gradient;
  }
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
