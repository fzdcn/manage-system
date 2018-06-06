import axios from 'axios'
import qs from 'qs'
import {API_BASE, DEBUG} from './config'
import router from "../router";
import store from '../store/index'

axios.defaults.timeout = 100000;
axios.defaults.baseURL = API_BASE;

//http request 拦截器
axios.interceptors.request.use(
    config => {
        const accessToken = store.getters.accessToken;
        config.data = qs.stringify(config.data);
        config.headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
        };
        if (accessToken) {
            config.params = {'token': accessToken}
        }
        return config;
    },
    error => {
        return Promise.reject(error)
    }
);

//http response 拦截器
axios.interceptors.response.use(
    response => {
        if (response.data.code == 401) {
            if (router.currentRoute.name != 'login') {  //这里必须限制为非login页面
                router.replace({
                    path: 'login',
                    query: {redirect: router.currentRoute.fullPath}
                })
            }
            return response;
        }
    },
    error => {
        return Promise.reject(error)
    }
);

/**
 * @param data
 * @param resolve
 */
function resolveResponse(data, resolve) {
    switch (data.status) {
        case 401:
            store.dispatch('userSignOut');
            store.dispatch('DeleteNavigationMenu');
            this.$message({showClose: true, message: '登录失效，需重新登录', type: 'error'});
            router.push({name: 'login'});
            break
        case 422:
            this.$message({showClose: true, message: data.errors[0].message, type: 'error'});
            break
        case 500:
            !DEBUG ? this.$message({showClose: true, message: '系统繁忙', type: 'error'}) : this.$message({
                showClose: true,
                message: '系统错误:' + data.message,
                type: 'error'
            });
            break
        default:
            resolve(data);
            break
    }
}

function rejectResponse(data, reject) {
    !DEBUG ? this.$message({showClose: true, message: '网络繁忙', type: 'error'}) : this.$message({
        showClose: true,
        message: '系统错误:' + data,
        type: 'error'
    });
    reject(data)
}

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function get(url, params = {}) {
    return new Promise((resolve, reject) => {
        store.dispatch('pageLoadingUpdate', true);
        axios.get(url, {
            params: params
        }).then(({data}) => {
            resolveResponse(data, resolve);
            store.dispatch('pageLoadingUpdate', false);
        }).catch(({data}) => {
            rejectResponse(data, reject);
            store.dispatch('pageLoadingUpdate', false);
        })
    })
}


/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data = {}) {
    store.dispatch('pageLoadingUpdate', true);
    return new Promise((resolve, reject) => {
        axios.post(url, data).then(({data}) => {
            resolve(data, resolve);
            store.dispatch('pageLoadingUpdate', false);
        }).catch(({data}) => {
            reject(data, reject)
            store.dispatch('pageLoadingUpdate', false);
        })
    })
}

