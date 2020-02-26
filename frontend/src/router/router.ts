import Vue from 'vue';
import VueRouter from 'vue-router';
import HelloWorld from '@/components/HelloWorld.vue';
import { AuthStore } from '../store/auth-store';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children: [
      { path: '/home', component: HelloWorld, name: 'dashboard' },
      { path: '/calendar', component: HelloWorld },
      { path: '/customer', component: HelloWorld },
      { path: '/company', component: HelloWorld }
    ]
  },
  {
    path: '/',
    name: 'landing',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
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
    if ((to.path === '/' || to.path === '/login') && localStorage.jwtTermino) next('/home');

    // If user is not loggedIn
    if ((to.path === '/' || to.path === '/login') && !localStorage.jwtTermino) next();

    // If logged In
    else localStorage.jwtTermino ? next() : next('/');
  } catch (error) {
    //
  }
});

export default router;
