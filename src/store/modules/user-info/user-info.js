import {
    USER_SIGN_IN,
    USER_SIGN_OUT,
    USER_UPDATE
} from '../mutation-type'

function setUser(state, user) {
    window.localStorage.setItem('user', JSON.stringify(user));
    window.localStorage.setItem('loginType', user.loginType);
    state.user = user;
    state.loginType = user.loginType
}

export default {
    state: {
        user: JSON.parse(window.localStorage.getItem('user')),
        loginType: window.localStorage.getItem('loginType')
    },
    getters: {
        user: (state) => state.user,
        loginType: (state) => state.loginType
    },
    mutations: {
        [USER_SIGN_IN](state, user) {
            setUser(state, user)
        },
        [USER_SIGN_OUT](state) {
            state.user = null;
            state.loginType = null;
            window.localStorage.removeItem('user');
            window.localStorage.removeItem('loginType');
        },
        [USER_UPDATE](state, user) {
            setUser(state, user)
        }
    },
    actions: {
        userSignIn: ({
            commit
        }, user) => {
            commit(USER_SIGN_IN, user)
        },
        userSignOut: ({
            commit
        }) => {
            commit(USER_SIGN_OUT)
        },
        userUpdate: ({
            commit
        }, user) => {
            commit(USER_UPDATE, user)
        }
    }
}
