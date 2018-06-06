/**
 * Created by Tome on 2018/5/18.
 */
import axios from 'axios'
import {API_BASE, DEBUG} from './config'
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
            Message.error(data.error);
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
            Message.error(data.error);
            break
        case 500:
            !DEBUG ? Message.error('系统错误:' + data.error) : Message.error('系统错误:' + data.error);
            break
        default:
            resolve(data);
            break
    }
}

function rejectResponse(data, reject) {
    !DEBUG ? Message.error('系统错误:' + data) : Message.error('系统错误:' + data);
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
        showFullScreenLoading()
        bindAccessToken(params)
        return new Promise((resolve, reject) => {
            instance.get(url, {params: params})
                .then(({data}) => {
                    resolveResponse(data, resolve, invalidTokenRedirect)
                    tryHideFullScreenLoading()
                }, (data) => {
                    rejectResponse(data, reject)
                    tryHideFullScreenLoading()
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
        showFullScreenLoading()
        bindAccessToken(params)
        return new Promise((resolve, reject) => {
            instance.post(url, params)
                .then(({data}) => {
                    resolveResponse(data, resolve, invalidTokenRedirect)
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
