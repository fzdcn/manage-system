import {
    NAVIGATION_MEMU,
    DELETE_NAVIGATION_MEMU
} from '../mutation-type'

function setNavigationMenu(state, menu) {
    window.localStorage.setItem('menu', menu);
    state.menu = JSON.parse(menu);
}

export default {
    state: {
        menu: JSON.parse(window.localStorage.getItem('menu'))
    },
    getters: {
        menu: (state) => state.menu
    },
    mutations: {
        [NAVIGATION_MEMU](state, menu) {

            setNavigationMenu(state, menu);
        },
        [DELETE_NAVIGATION_MEMU](state) {
            state.menu = null;
            window.localStorage.removeItem('menu');
        }
    },
    actions: {
        setNavigationMenu: ({
            commit
        }, menu) => {
            commit(NAVIGATION_MEMU, menu);
        },
        DeleteNavigationMenu: ({
            commit
        }) => {
            commit(DELETE_NAVIGATION_MEMU);
        }
    }
}