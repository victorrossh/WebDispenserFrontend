import { createRouter, createWebHistory } from 'vue-router';
import { isAuthenticated } from './auth'; 

import PublicLayout from '../components/layouts/PublicLayout.vue';
import LogedLayout from '../components/layouts/LogedLayout.vue';

import Home from '../views/HomeView.vue';
import About from '../views/AboutView.vue';
import Login from '../views/LoginView.vue';
import Dashboard from '../views/DashboardView.vue';

const routes = [
  {
    path: '/',
    component: PublicLayout,
    children: [
      {
        path: '',
        name: 'home',
        component: Home,
      },
      {
        path: 'about',
        name: 'about',
        component: About,
      },
      {
        path: 'login',
        name: 'login',
        component: Login,
      },
    ],
  },
  {
    path: '/',
    component: LogedLayout, 
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: Dashboard,
        meta: { requiresAuth: true }, 
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (isAuthenticated()) {
      next();
    } else {
      next('/login');
    }
  } else {
    next();
  }
});

export default router;
