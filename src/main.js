import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
// 默认主题
import 'element-ui/lib/theme-chalk/index.css';
// 浅绿色主题
// import '../static/css/theme-green/index.css';
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

// https://www.jianshu.com/p/1d9b42012ecb
const isDebug_mode = process.env.NODE_ENV === 'development';
Vue.config.debug = isDebug_mode;
Vue.config.devtools = isDebug_mode;
Vue.config.productionTip = isDebug_mode;

new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {App},
    mounted() {
        const childElem = document.getElementById('loader');
        childElem.parentNode.removeChild(childElem);
    },
})
