import Vue from 'vue';
import App from './App.vue';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import VueRouter from "vue-router";
Vue.use(VueRouter);

import page1 from "./pages/page1.vue";
import page3 from "./pages/page3.vue";

// import "./mock.js"
import axios from 'axios'

Vue.config.productionTip = false;

let router=new VueRouter({
  routes:[
    {
      path:"/page1",
      name:"page1",
      component:page1
    },
    {
      path:"/page3",
      name:"page3",
      component:page3
    }
  ]
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
