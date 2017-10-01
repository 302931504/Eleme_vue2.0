// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';

import seller from './components/seller/seller';
import goods from './components/goods/goods';
import ratings from './components/ratings/ratings';

import axios from 'axios';
var instance = axios.create({
  headers: {'content-type': 'application/x-www-form-urlencoded'}
});

/* instance.defaults.baseURL = '/api'; */
Vue.prototype.$http = instance;

import './common/css/index.css';

Vue.use(VueRouter);

const routes = [
  {path: '/goods', component: goods},
  {path: '/seller', component: seller},
  {path: '/ratings', component: ratings},
  {path: '/', redirect: '/goods'}
];
const router = new VueRouter({
  routes
});

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  router,
  components: { App }
});

