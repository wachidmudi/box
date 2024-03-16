import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '@/views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/product/:id',
    name: 'Product',
    component: () => import('../views/Product.vue'),
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('../views/Cart.vue'),
  },
  {
    path: '/transaction',
    name: 'Transaction',
    component: () => import('../views/Transaction.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: import.meta.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  try {
    const user = JSON.parse(window.localStorage.getItem('user') ?? '{}');

    if (user?.access_token) {
      if (to.name == 'Login' || to.name == 'Register') {
        next({ name: 'Home' });
      } else {
        next();
      }
    } else {
      next();
    }
  } catch (_) {
    next();
  }
});

export default router;
