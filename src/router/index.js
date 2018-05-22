import Vue from 'vue';
import Router from 'vue-router';
import store from '../store'

Vue.use(Router);

const routes = [
    {
        path: '/',
        redirect: '/index'
    },
    {
        path: '/',
        component: resolve => require(['../components/common/Home.vue'], resolve),
        meta: {title: '公共部分'},
        children: [
            {
                path: '/index',
                name: 'index',
                component: resolve => require(['../pages/Index/Index.vue'], resolve),
                meta: {title: '首页',permission:false}
            },
            {
                path: '/payment',
                name: 'payment',
                component: resolve => require(['../pages/Payment/Payment.vue'], resolve),
                meta: {title: '企业网银支付',permission:false}
            },

            {
                path: '/table',
                name: 'table',
                component: resolve => require(['../pages/Table/Index.vue'], resolve),
                meta: {title: '基础表格',permission:false}
            },
            {
                // 权限页面
                path: '/permission',
                name: 'permission',
                component: resolve => require(['../pages/Permission/Index.vue'], resolve),
                meta: {title: '角色管理',permission:true}
            }
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: resolve => require(['../pages/Login/Login.vue'], resolve),
        meta:{permission:false}
    },
    {
        path: '/404',
        name: '404',
        component: resolve => require(['../pages/Error/404.vue'], resolve)
    },
    {
        path: '/403',
        name: '403',
        component: resolve => require(['../pages/Error/403.vue'], resolve)
    },
    {
        path: '*',
        redirect: '/404'
    }
]

let router = new Router({
    mode: 'history',
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return {x: 0, y: 0}
        }
    }
})

//使用钩子函数对路由进行权限跳转
router.beforeEach(({meta, name, fullPath, path}, from, next) => {
    store.dispatch('pageLoadingUpdate', true);
    // let {permission = true} = meta;
    let role = localStorage.getItem('username');
    if(!role && path !== '/login'){
        next('/login');
    }else if(meta.permission){
        // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
        role === 'admin' ? next() : next('/403');
    }else{
        // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
        if(navigator.userAgent.indexOf('MSIE') > -1 && path === '/editor'){
            Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
                confirmButtonText: '确定'
            });
        }else{
            next();
        }
    }
});

router.afterEach(() => {
    store.dispatch('pageLoadingUpdate', false)
})

export default router
