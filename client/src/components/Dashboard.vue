<template>
  <div class="dashboard-container">
    Dashboard
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {changeLanguage} from './../helper/i18n.service';

@Component({
  components: {}
})
export default class Dashboard extends Vue {
}
</script>

<style scoped lang="scss">
</style>
