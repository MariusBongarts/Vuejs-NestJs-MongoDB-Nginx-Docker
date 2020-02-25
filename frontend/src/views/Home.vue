<template>
  <div class="home">
    <Navigation>
      <router-view></router-view>
    </Navigation>
  </div>
</template>

<script>
// @ is an alias to /src
import Navigation from '../components/Navigation.vue';

export default {
  name: 'Home',
  components: {
    Navigation
  }
};
</script>
