/**
 * Created by Tome on 2018/5/18
 */
// API接口基础地址
export const DEBUG = process.env.NODE_ENV !== 'production'
export const API_BASE = DEBUG ? 'https://www.easy-mock.com/mock/592501a391470c0ac1fab128' : ('http://' + window.location.host + '/api/v2')
