import Vue from 'vue';
import Toasted from 'vue-toasted';
import router from '../router/index';

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

// 11位数字，以1开头
export const regTel = /^1\d{10}$/;

/*
验证规则：姑且把邮箱地址分成“第一部分@第二部分”这样

第一部分：由字母、数字、下划线、短线“-”、点号“.”组成，

第二部分：为一个域名，域名由字母、数字、短线“-”、域名后缀组成，

而域名后缀一般为.xxx或.xxx.xx，一区的域名后缀一般为2-4位，如cn,com,net，现在域名有的也会大于4位
*/

export const regEmail = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;

/*
中国的身份证号，
一代身份证号是15位的数字，
二代身份证都是18位的，
最后一位校验位除了可能是数字还可能是‘X‘或‘x‘，
所以有四种可能性：a.15位数字 b.18位数字 c.17位数字，
第十八位是‘X‘ d.17位数字，
第十八位是‘x‘
*/
export const regIdCode = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/







