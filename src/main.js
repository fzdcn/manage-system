import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';    // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题
import 'babel-polyfill';
import './assets/iconfont/iconfont.css';
import http from './config/http';
import moment from 'moment';

// Vue.filter('moment', function (value, formatString = 'YYYY-MM-DD HH:mm:ss') {
//     return moment(value * 1000).format(formatString)
// })
Vue.prototype.$moment = moment;
Vue.use(http);
Vue.use(ElementUI, {size: 'small'});
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
