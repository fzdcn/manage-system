/**
 * Created by Tome on 2018/5/18.
 */
import axios from 'axios'
import {API_BASE} from './config'
import store from '../store/index'
import router from '../router/index'
import qs from 'qs'
import {Loading, Message} from 'element-ui'

let needLoadingRequestCount = 0
let loading = {}

// 显示loading
function showFullScreenLoading() {
    if (needLoadingRequestCount === 0) {
        startLoading()
    }
    needLoadingRequestCount++
}

// 隐藏loading
function tryHideFullScreenLoading() {
    if (needLoadingRequestCount <= 0) return
    needLoadingRequestCount--
    if (needLoadingRequestCount === 0) {
        endLoading()
    }
}

// 启动loading配置
function startLoading() {
    loading = Loading.service({
        lock: true,
        text: '加载中……',
        background: 'rgba(0, 0, 0, 0.8)',
        fullscreen: true,
        spinner: 'el-icon-loading'
    })
}

// 关闭loading
function endLoading() {
    loading.close()
}

axios.defaults.baseURL = API_BASE;
axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] = 'application/json';

function bindAccessToken(params) {
    let accessToken = store.getters.accessToken
    accessToken && (params['access-token'] = accessToken)
}

/**
 * @param data
 * @param resolve
 */
function resolveResponse(data, resolve) {
    switch (data.code) {
        case '01':
            Message.error('系统错误:' + data.message);
            break
        case '401':
            Message.error(data.message);
            if (router.currentRoute.name != 'login') {  //这里必须限制为非login页面
                router.replace({
                    path: '/login',
                    query: {redirect: router.currentRoute.fullPath}
                })
            }
            store.dispatch('userSignOut');
            store.dispatch('DeleteNavigationMenu');
            break
        case '403':
            Message.error('系统错误:' + data.message);
            router.replace({
                path: '/403'
            });
            break
        default:
            resolve(data);
            break
    }
}

function rejectResponse(data, reject) {
    if (data.response) {
        switch (data.response.status) {
            case 500:
                Message.error('系统错误:' + data);
                /*router.replace({
                    path: '/403'
                });*/
                break
            default:
                reject(data);
                break
        }
    } else {
        reject(data);
        Message.error('系统错误:' + data.message);
    }
}

class HttpResource {
    static install(Vue) {
        Vue.prototype.$httpGet = HttpResource.httpGet;
        Vue.prototype.$httpPost = HttpResource.httpPost;
    }

    /**
     * @param url
     * @param params
     * @returns {Promise}
     */

    static httpGet(url, params) {
        store.dispatch('pageLoadingUpdate', true);
        showFullScreenLoading();
        bindAccessToken(params)
        return new Promise((resolve, reject) => {
            axios.get(url, {params: params})
                .then(({data}) => {
                    resolveResponse(data, resolve)
                    store.dispatch('pageLoadingUpdate', false)
                    tryHideFullScreenLoading()
                }, (data) => {
                    rejectResponse(data, reject)
                    store.dispatch('pageLoadingUpdate', false)
                    tryHideFullScreenLoading()
                })
        })
    }

    /**
     * @param url
     * @param params
     * @returns {Promise}
     */

    static httpPost(url, params, isFormData) {
        if (!isFormData) {
            params = qs.stringify(params);
        }
        store.dispatch('pageLoadingUpdate', true)
        showFullScreenLoading()
        bindAccessToken(params)
        return new Promise((resolve, reject) => {
            axios.post(url, params, {
                headers: {
                    "Content-Type": isFormData ? "application/json" : "application/x-www-form-urlencoded;charset=UTF-8"
                }
            }).then(({data}) => {
                resolveResponse(data, resolve)
                store.dispatch('pageLoadingUpdate', false)
                tryHideFullScreenLoading()
            }, (data) => {
                rejectResponse(data, reject)
                store.dispatch('pageLoadingUpdate', false)
                tryHideFullScreenLoading()
            })
        })
    }
}

export default HttpResource
