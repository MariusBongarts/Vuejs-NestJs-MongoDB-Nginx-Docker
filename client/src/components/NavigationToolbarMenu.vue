<template>
  <md-menu md-size="medium" md-align-trigger>
    <md-button md-menu-trigger class="menu-btn toolbar-btn">
      <md-avatar class="md-avatar-icon md-accent">
        <md-ripple>{{ getLetterForAvatar() }}</md-ripple>
      </md-avatar>
      <div class="account-info">
        <span class="md-body-1">Admin Skeleton</span>
        <br>
        <span class="md-caption">{{ email }}</span>
      </div>
    </md-button>
    <md-menu-content>
      <md-menu-item class="profile" to="profile">{{
        $t('NavigationToolbarMenu.profile')
      }}</md-menu-item>
      <md-menu-item class="logout-btn" @click="logout">{{
        $t('NavigationToolbarMenu.logout')
      }}</md-menu-item>
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
  private email = AuthStore.state.payload?.email;

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
    const firstLetter = this.email?.substring(0, 1).toUpperCase();
    return firstLetter;
  }
}
</script>

<style lang="scss" scoped>
.md-menu,
.menu-btn {
  display: flex;
  height: 100%;
}

.account-info {
  margin: 0px 15px;
}


::v-deep .md-button-content {
  display: flex;
}

::v-deep .md-ripple {
  height: 100% !important;
}

</style>
