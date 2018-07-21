/**
 * Created by Tome on 2018/5/18
 */
import Vue from 'vue'
import Vuex from 'vuex'
import userInfo from './modules/user-info/user-info'
import setNavigationMenu from './modules/navigation/navigation-menu'
import 'babel-polyfill'

Vue.use(Vuex);
let debug = false;
if (process.env.NODE_ENV === 'development') {
    // 开发环境
    debug = true;
// 编译环境
} else {
    // 测试环境
    if (process.env.type === 'test') {
        debug = false;
        // 正式环境
    } else {
        debug = false;
    }
}
export default new Vuex.Store({
    modules: {
        userInfo,
        setNavigationMenu
    },
    strict: debug
})
