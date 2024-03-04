import Vue from 'vue';
import VueSweetalert2 from 'vue-sweetalert2';
import App from './App.vue';

import 'sweetalert2/dist/sweetalert2.min.css';

Vue.use(VueSweetalert2);

new Vue({
  render: h => h(App),
}).$mount('#app');
