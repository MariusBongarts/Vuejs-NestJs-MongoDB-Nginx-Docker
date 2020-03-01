<template>
  <md-menu md-size="medium" md-align-trigger>
    <md-avatar md-menu-trigger class="md-avatar-icon md-accent">
      <md-ripple>{{getLetterForAvatar()}}</md-ripple>
    </md-avatar>

    <md-menu-content>
      <md-menu-item @click="logout">Logout</md-menu-item>
    </md-menu-content>
  </md-menu>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { AuthStore } from '../store/auth-store';

@Component({
  components: {}
})
export default class NavigationToolbarMenu extends Vue {

  /**
   * Emits event to logout
   * @method logout
   */
  logout() {
    this.$emit('logout');
  }

  /**
   * Gets the email adress of logged user in AuthState and
   * returns the first letter in capital case
   * @method getLetterForAvatar
   */
  getLetterForAvatar() {
    const email = AuthStore.state.payload?.email;
    const firstLetter = email?.substring(0,1).toUpperCase();
    return firstLetter;
  }
}
</script>

<style lang="scss" scoped></style>
