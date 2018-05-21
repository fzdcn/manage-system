import Vue from 'vue';
import Toasted from 'vue-toasted';
import router from '../../router';
Vue.use(Toasted)
/**
 * 显示alert
 * @param msg
 * @param type
 */
export function showAlert(msg, type = 'error') {
    let option = {
        position: 'top-center',
        className: 'toast',
        fullWidth: true,
        duration: 2000, // 毫秒,
        theme: 'bubble', // ['primary', 'outline', 'bubble']
        type: type, // ['success', 'info', 'error']
    }
    Vue.toasted.show(msg, option);
}


/**
 * 返回上一步
 */
export function goBack() {
    if (window.history.length > 1) {
        window.history.go(-1)
    } else {
        router.push({name: 'index'})
    }
}


