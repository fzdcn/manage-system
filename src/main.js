import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';    // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题
import 'babel-polyfill';
import './assets/iconfont/iconfont.css';
import http from './config/http'

Vue.use(http);
Vue.use(ElementUI, {size: 'small'});
Vue.prototype.$axios = axios;

new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {App},
    mounted() {
        const childElem = document.getElementById('loader')
        childElem.parentNode.removeChild(childElem)
    },
})
