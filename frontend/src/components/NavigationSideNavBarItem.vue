<template>
    <md-list-item :to="navItem.path">
      <md-icon>{{ navItem.icon }}</md-icon>
      <span class="md-list-item-text">{{ navItem.name }}</span>
    </md-list-item>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { NavItem } from '../models/NavItem';


@Component({
  components: {}
})
export default class NavigationSideNavBarItem extends Vue {
  @Prop() navItem!: NavItem;
}
</script>

<style lang="scss" scoped></style>
