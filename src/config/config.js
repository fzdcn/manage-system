/**
 * Created by Tome on 2018/5/18
 */
// API接口基础地址
export const DEBUG = process.env.NODE_ENV !== "production"
// 测试
export const API_BASE = DEBUG ? 'http://10.62.10.101:8081' : 'http://10.62.10.101:8081'

// 正式
// export const API_BASE = DEBUG ? 'http://10.62.10.101:8081' : "https://adminapi.95epay.com"
// 曹
// export const API_BASE = DEBUG ? 'http://10.62.22.131:8081' : ('http://' + window.location.host)
// 方
// export const API_BASE = DEBUG ? 'http://10.62.22.54:8081' : ('http://' + window.location.host)
// 郇
// export const API_BASE = DEBUG ? 'http://10.62.22.27:8081' : ('http://' + window.location.host)
// 韦
// export const API_BASE = DEBUG ? 'http://10.62.22.16:8081' : ('http://' + window.location.host)
// 上传git时的api
// export const API_BASE = DEBUG ? 'http://localhost:8081' : ('http://' + window.location.host)
