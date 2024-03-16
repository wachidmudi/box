import Vue from 'vue';
import Vuex from 'vuex';

import { http } from '@/lib/http';
import router from '@/router';

Vue.use(Vuex);

interface StoreState {
  products: [];
  product: {};
  carts: [];
  categories: [];
  transactions: [];
  registerSuccess: boolean;
}

export default new Vuex.Store<StoreState>({
  state: {
    products: [],
    product: {},
    carts: [],
    categories: [],
    transactions: [],
    registerSuccess: false,
  },
  mutations: {
    SET_REGISTER_SUCCESS(state) {
      state.registerSuccess = !state.registerSuccess;
    },
    SET_PRODUCTS(state, payload) {
      state.products = payload;
    },
    SET_PRODUCT(state, payload) {
      state.product = payload;
    },
    SET_CATEGORIES(state, payload) {
      state.categories = payload;
    },
    SET_CARTS(state, payload) {
      state.carts = payload;
    },
    SET_TRANSACTIONS(state, payload) {
      state.transactions = payload;
    },
  },
  actions: {
    login(_, payload) {
      return http.post('login', payload).then(({ data }) => {
        localStorage.setItem('user', JSON.stringify(data.user));
        router.push({ name: 'Home' });
      });
    },
    register({ commit }, payload) {
      return http.post('register', payload).then(() => {
        router.push({ name: 'Login' });
        commit('SET_REGISTER_SUCCESS');
      });
    },
    fetchProducts({ commit }) {
      http.get('products').then(({ data }) => {
        commit('SET_PRODUCTS', data);
      });
    },
    fetchProductsByCategory({ commit }, payload) {
      http.get('products', { params: payload }).then(({ data }) => {
        commit('SET_PRODUCTS', data);
      });
    },
    fetchCategories({ commit }) {
      http.get('categories').then(({ data }) => {
        commit('SET_CATEGORIES', data.categories);
      });
    },
    fetchOneProduct({ commit }, payload) {
      http.get('products/' + payload.id).then(({ data }) => {
        commit('SET_PRODUCT', data);
      });
    },
    fetchCarts({ commit }) {
      http
        .get('cart', {
          headers: {
            access_token: getToken(),
          },
        })
        .then(({ data }) => {
          commit('SET_CARTS', data);
        });
    },
    addCart({ dispatch }, payload: { productId: number }) {
      return http
        .post('cart', payload, {
          headers: {
            access_token: getToken(),
          },
        })
        .then(({ data }) => {
          dispatch('fetchCarts');

          return data.msg;
        });
    },
    editCart(
      { dispatch },
      payload: { id: number; productId: number; increment: boolean }
    ) {
      return http
        .put('cart/' + payload.id, payload, {
          headers: {
            access_token: getToken(),
          },
        })
        .then(() => {
          dispatch('fetchCarts');
        });
    },
    deleteCart({ dispatch }, payload: { id: number }) {
      return http
        .delete('cart/' + payload.id, {
          headers: {
            access_token: getToken(),
          },
        })
        .then(({ data }) => {
          dispatch('fetchCarts');

          return data.msg;
        });
    },
    checkout({ dispatch }) {
      return http
        .get('cart/checkout', {
          headers: {
            access_token: getToken(),
          },
        })
        .then(({ data }) => {
          dispatch('fetchCarts');

          return data.msg;
        });
    },
    getTransactions({ commit }) {
      return http
        .get('cart/transaction', {
          headers: {
            access_token: getToken(),
          },
        })
        .then(({ data }) => {
          commit('SET_TRANSACTIONS', data);
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
