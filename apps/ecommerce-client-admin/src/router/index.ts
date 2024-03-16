import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';

import Categories from '@/components/Categories.vue';
import Dashboard from '@/components/Dashboard.vue';
import Products from '@/components/Products.vue';

import ProductForm from '@/components/ProductForm.vue';
import ProductView from '@/components/ProductView.vue';
import TableProducts from '@/components/TableProducts.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/home',
    component: Home,
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: Dashboard,
      },
      {
        path: 'products',
        component: Products,
        children: [
          {
            path: '',
            name: 'TableProducts',
            component: TableProducts,
          },
          {
            path: 'add',
            name: 'ProductAdd',
            component: ProductForm,
          },
          {
            path: 'edit/:id',
            name: 'ProductEdit',
            component: ProductForm,
          },
          {
            path: ':id',
            name: 'ProductView',
            component: ProductView,
          },
        ],
      },
      {
        path: 'categories',
        name: 'Categories',
        component: Categories,
      },
    ],
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
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

    if (to.name !== 'Login' && !user?.access_token) {
      next({ name: 'Login' });
    } else {
      next();
    }
  } catch (_) {
    next();
  }
});

export default router;
