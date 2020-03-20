import store from '@/store/store';
import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Dashboard from '../components/Dashboard.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/home',
        component: Dashboard,
        name: 'dashboard'
      },
      {
        path: '/calendar',
        // Lazy loading of component when route is visited
        component: () => import('../components/Calendar.vue'),
        name: 'calendar'
      },
      {
        path: '/customers',
        // Lazy loading of component when route is visited
        component: () => import('../components/Customers.vue'),
        name: 'customers'
      },
      {
        path: '/company',
        // Lazy loading of component when route is visited
        component: () => import('../components/Company.vue'),
        name: 'company'
      }
    ]
  },
  {
    path: '/',
    name: 'landing',
    // Lazy loading of component when route is visited
    component: () => import(/* webpackChunkName: "about" */ '../views/LandingPage.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

// Check beforeEach if user is logged in
router.beforeEach((to, from, next) => {
  try {
    // If user is loggedIn but navigates to login or root
    if ((to.path === '/' || to.path === '/login') && localStorage.jwtSkeleton) next('/home');

    // If user is not loggedIn
    if ((to.path === '/' || to.path === '/login') && !localStorage.jwtSkeleton) {
      store.commit('emitLogout');
      next();
    } else localStorage.jwtSkeleton ? next() : next('/');
  } catch (error) {
    //
  }
});

export default router;
