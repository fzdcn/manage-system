import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/index'
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: {title: '自述文件'},
            children: [
                {
                    path: '/index',
                    component: resolve => require(['../components/app/page/Index/Index.vue'], resolve),
                    meta: {title: '首页'}
                },
                {
                    path: '/table',
                    component: resolve => require(['../components/app/page/Table/Index.vue'], resolve),
                    meta: {title: '基础表格'}
                },
                {
                    // 权限页面
                    path: '/permission',
                    component: resolve => require(['../components/app/page/Permission/Index.vue'], resolve),
                    meta: {title: '角色管理', permission: true}
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/app/page/Login/Login.vue'], resolve)
        },
        {
            path: '/404',
            component: resolve => require(['../components/app/page/Error/404.vue'], resolve)
        },
        {
            path: '/403',
            component: resolve => require(['../components/app/page/Error/403.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})
