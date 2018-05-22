/**
 * Created by Tome on 2018/5/18
 */
// API接口基础地址
export const DEBUG = process.env.NODE_ENV !== 'production'
export const API_BASE = DEBUG ? 'http://192.168.0.164/zhuomuniao/frontend/web/api/v2/' : ('http://' + window.location.host + '/api/v2')
