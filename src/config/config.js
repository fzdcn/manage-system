/**
 * Created by Tome on 2018/5/18
 */
// API接口基础地址
export const DEBUG = process.env.NODE_ENV !== 'production'
export const API_BASE = DEBUG ? 'http://10.62.22.131:8081' : ('http://' + window.location.host)
// export const API_BASE = DEBUG ? 'http://10.62.22.24:8081' : ('http://' + window.location.host)
