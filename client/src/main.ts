import '@/theme/theme.scss';
import 'vue-material/dist/vue-material.min.css';
import {
  MdContent, MdIcon, MdList, MdToolbar,
  MdButton, MdDrawer, MdApp, MdAvatar,
  MdRipple, MdMenu, MdDialog, MdDialogPrompt,
  MdField, MdTabs, MdProgress, MdDivider
} from 'vue-material/dist/components';
import Vue from 'vue';
// import VueMaterial from 'vue-material';
import App from './App.vue';
import './registerServiceWorker';
import router from './router/router';
import store from './store/store';
import i18n from './i18n';
import Vuelidate from 'vuelidate';

Vue.use(Vuelidate);

// Imports for Vue Material
Vue.use(MdApp);
Vue.use(MdContent);
Vue.use(MdIcon);
Vue.use(MdList);
Vue.use(MdToolbar);
Vue.use(MdButton);
Vue.use(MdDrawer);
Vue.use(MdAvatar);
Vue.use(MdRipple);
Vue.use(MdMenu);
Vue.use(MdField);
Vue.use(MdDialog);
Vue.use(MdDialogPrompt);
Vue.use(MdTabs);
Vue.use(MdProgress);
Vue.use(MdDivider)
// Vue.use(VueMaterial);

Vue.config.productionTip = false;


new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App)
}).$mount('#app');
