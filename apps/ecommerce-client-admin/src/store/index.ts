import Vue from 'vue';
import Vuex from 'vuex';

import { http } from '@/lib/http';
import router from '@/router';

Vue.use(Vuex);

interface StoreState {
  products: [];
  categories: [];
  product: {
    [key: string]: unknown;
    categories?: unknown[];
  };
}

export default new Vuex.Store<StoreState>({
  state: {
    products: [],
    categories: [],
    product: {},
  },
  mutations: {
    setProducts(state, payload) {
      state.products = payload;
    },
    setProduct(state, payload) {
      state.product = payload;
    },
    setCategories(state, payload) {
      state.categories = payload;
    },
    setProductCategories(state, payload) {
      state.product.categories = payload;
    },
  },
  actions: {
    login(_, payload) {
      return http
        .post('login', payload)
        .then(({ data }) => {
          window.localStorage.setItem('user', JSON.stringify(data.user));
          router.push({ name: 'Dashboard' });
        })
        .catch(e => console.log('Failed to login:', e));
    },
    fetchProducts({ commit }) {
      http.get('products').then(({ data }) => {
        commit('setProducts', data);
      });
    },
    fetchProductsByCategory({ commit }, payload) {
      http.get('products', { params: payload }).then(({ data }) => {
        commit('setProducts', data);
      });
    },
    getProduct({ commit }, id) {
      http.get('products/' + id).then(({ data }) => {
        commit('setProduct', data);
      });
    },
    addProduct(_, payload) {
      http
        .post('products', payload, {
          headers: {
            access_token: getToken(),
          },
        })
        .then(_ => {
          // console.log('data', data)
          router.push({ name: 'TableProducts' });
        });
    },
    editProduct(_, payload) {
      http
        .put('products/' + payload.id, payload, {
          headers: {
            access_token: getToken(),
          },
        })
        .then(_ => {
          router.push({ name: 'TableProducts' });
        });
    },
    deleteProduct({ dispatch }, payload) {
      return http
        .delete('products/' + payload.id, {
          headers: {
            access_token: getToken(),
          },
        })
        .then(_ => {
          dispatch('fetchProducts');
        });
    },
    fetchCategories({ commit }) {
      http.get('categories').then(({ data }) => {
        commit('setCategories', data.categories);
      });
    },
    addCategory({ dispatch }, payload) {
      http
        .post('categories', payload, {
          headers: {
            access_token: getToken(),
          },
        })
        .then(_ => {
          dispatch('fetchCategories');
        });
    },
    deleteCategory({ dispatch }, payload) {
      return http
        .delete('categories/' + payload.id, {
          headers: {
            access_token: getToken(),
          },
        })
        .then(_ => {
          dispatch('fetchCategories');
        });
    },
  },
  modules: {},
});

function getToken(): string | undefined {
  try {
    const user = window.localStorage.getItem('user') ?? '{}';
    return JSON.parse(user).access_token;
  } catch (_) {
    return undefined;
  }
}
