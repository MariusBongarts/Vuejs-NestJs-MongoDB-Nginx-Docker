<template>
  <md-toolbar class="md-transparent" md-elevation="0">
    <span>Navigation</span>

    <div class="md-toolbar-section-end">
      <md-button class="md-icon-button md-dense" @click="toggleMenu">
        <md-icon>keyboard_arrow_left</md-icon>
      </md-button>
    </div>
  </md-toolbar>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {}
})
export default class NavigationSideToolbar extends Vue {
  /**
   * Emits event to open/close sidebar in parent componnet
   * @method toggleMenu()
   */
  toggleMenu() {
    this.$emit('toggleMenu');
  }
}
</script>

<style lang="scss" scoped></style>
