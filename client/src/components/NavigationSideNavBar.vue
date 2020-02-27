<template>
  <md-list>
    <NavigationSideNavBarItem
      v-for="(navItem, index) in navItems"
      :key="index"
      :navItem="navItem"
    />
  </md-list>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import NavigationSideNavBarItem from './NavigationSideNavBarItem.vue';
import { CONSTANTS } from '../constants/constants';
import { NavItem } from '../models/NavItem';
@Component({
  components: {
    NavigationSideNavBarItem
  }
})
export default class NavigationSideNavBar extends Vue {
  navItems: NavItem[] = CONSTANTS.NAVITEMS;
}
</script>

<style lang="scss" scoped></style>
