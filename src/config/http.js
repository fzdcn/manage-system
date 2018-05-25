/**
 * Created by Tome on 2018/5/18.
 */
import axios from 'axios'
import {API_BASE, DEBUG} from './config'
import store from '../store/index'
import router from '../router/index'
import {showAlert} from '../functions/index'
import qs from 'qs';

let config = {
    baseURL: API_BASE,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    transformRequest: [function (data) {

        data = qs.stringify(data);
        return data;
    }],
}
const instance = axios.create(config)

function bindAccessToken(params) {
    let accessToken = store.getters.accessToken
    accessToken && (params['access-token'] = accessToken)
}

/**
 * @param data
 * @param resolve
 * @param invalidTokenRedirect 登录失效后是否需要跳转到登录页
 */
function resolveResponse(data, resolve, invalidTokenRedirect = true) {
    switch (data.status) {
        case 401:
            showAlert('登录失效，需重新登录');
            if (router.currentRoute.name != 'login') {  //这里必须限制为非login页面
                router.replace({
                    path: '/login',
                    query: {redirect: router.currentRoute.fullPath}
                })
            }
            store.dispatch('userSignOut');
            store.dispatch('DeleteNavigationMenu');
            break
        case 422:
            showAlert(data.errors);
            break
        case 500:
            !DEBUG ? showAlert('系统繁忙') : showAlert('系统错误:' + data.error);
            break
        default:
            resolve(data);
            break
    }
}

function rejectResponse(data, reject) {
    !DEBUG ? showAlert('网络繁忙') : showAlert('系统错误:' + data);
    reject(data)
}

class HttpResource {
    static install(Vue) {
        Vue.prototype.$httpGet = HttpResource.httpGet;
        Vue.prototype.$httpPost = HttpResource.httpPost;
    }

    /**
     * @param url
     * @param params
     * @param invalidTokenRedirect 登录失效后是否需要跳转到登录页
     * @returns {Promise}
     */
    static httpGet(url, params, invalidTokenRedirect = true) {
        bindAccessToken(params)
        return new Promise((resolve, reject) => {
            instance.get(url, {params: params})
                .then(({data}) => {
                    resolveResponse(data, resolve, invalidTokenRedirect)
                }, (data) => {
                    rejectResponse(data, reject)
                })
        })
    }

    /**
     * @param url
     * @param params
     * @param invalidTokenRedirect 登录失效后是否需要跳转到登录页
     * @returns {Promise}
     */
    static httpPost(url, params, invalidTokenRedirect = true) {
        store.dispatch('pageLoadingUpdate', true)
        bindAccessToken(params)
        return new Promise((resolve, reject) => {
            instance.post(url, params)
                .then(({data}) => {
                    resolveResponse(data, resolve, invalidTokenRedirect)
                    store.dispatch('pageLoadingUpdate', false)
                }, (data) => {
                    rejectResponse(data, reject)
                    store.dispatch('pageLoadingUpdate', false)
                })
        })
    }
}

export default HttpResource
