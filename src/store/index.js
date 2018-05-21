/**
 * Created by Tome on 2018/1/22.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import userInfo from './modules/user-info/user-info'
import setNavigationMenu from './modules/navigation/navigation-menu'
import 'babel-polyfill'

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    modules: {
        userInfo,
        setNavigationMenu
    },
    strict: debug
})
