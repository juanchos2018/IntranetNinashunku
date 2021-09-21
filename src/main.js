import Vue from 'vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import App from './App.vue'
import DefaultLayout from './layouts/Default.vue'
import DashboardLayout from './layouts/Dashboard.vue'
import DashboardRTLLayout from './layouts/DashboardRTL.vue'
import router from './router'
// import './plugins/click-away'
import VueSession from 'vue-session'
import './scss/app.scss';
import axios from 'axios';
import store from './store';
import Vuex from 'vuex'
//import { store } from "./store/state";
Vue.use(Vuex)
Vue.prototype.$eventHub = new Vue()
Vue.use(Antd);
Vue.use(VueSession)
    //axios.defaults.baseURL = 'http://localhost:8000/'

//axios.defaults.baseURL = 'http://localhost/apiphp/'
Vue.config.productionTip = false

// Adding template layouts to the vue components.
Vue.component("layout-default", DefaultLayout);
Vue.component("layout-dashboard", DashboardLayout);
Vue.component("layout-dashboard-rtl", DashboardRTLLayout);
import { BFormFile } from 'bootstrap-vue'
Vue.component('b-form-file', BFormFile)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')