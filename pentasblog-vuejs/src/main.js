// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import router from '../route'

Vue.prototype.$http = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router
})