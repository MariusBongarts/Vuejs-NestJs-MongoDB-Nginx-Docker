<template>
  <div class="toolbar-container">
    <div class="toolbar-sub-container">
      <md-button class="md-icon-button" @click="toggleMenu" v-if="!menuVisible">
        <md-icon>menu</md-icon>
      </md-button>
      <span class="md-title">{{ $t('title') }}</span>
    </div>
    <div class="toolbar-sub-container">
      <md-button class="md-raised md-transparent login-button" @click="logout">Logout</md-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({
  components: {}
})
export default class NavigationToolbar extends Vue {
  @Prop() menuVisible!: boolean;

  /**
   * Emits event to open/close sidebar in parent componnet
   * @method toggleMenu()
   */
  toggleMenu() {
    this.$emit('toggleMenu');
  }

  logout() {
    this.$emit('logout');
  }
}
</script>

<style lang="scss" scoped>
.toolbar-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.toolbar-sub-container {
  display: flex;
  margin: auto 20px !important;
  align-items: center;

  .md-title {
    margin: auto 20px !important;
  }
}
</style>
