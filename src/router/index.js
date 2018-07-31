import Vue from 'vue';
import Router from 'vue-router';
import store from '../store'

Vue.use(Router);

// breadcrumb 面包屑
const routes = [{
        path: '/',
        redirect: '/index'
    },
    {
        path: '/',
        component: resolve => require(['../components/common/Home.vue'], resolve),
        meta: {
            title: '公共部分'
        },
        children: [{
                path: '/index',
                name: 'index',
                component: resolve => require(['../pages/index/Index.vue'], resolve),
                meta: {
                    title: '首页',
                    permission: false
                }
            },
            {
                path: '/payment',
                name: 'payment',
                component: resolve => require(['../pages/payment/Payment.vue'], resolve),
                meta: {
                    title: '企业网银支付',
                    permission: false
                }
            },
            {
                path: '/account-manage',
                name: 'account-manage',
                component: resolve => require(['../pages/system-manage/account-manage/AccountManage.vue'], resolve),
                meta: {
                    title: '后台账户管理',
                    permission: false,
                    breadcrumb: [{
                            url: false,
                            title: '系统设置'
                        },
                        {
                            url: false,
                            title: '后台账户管理'
                        }
                    ]
                }
            },
            {
                path: '/role-manage',
                name: 'role-manage',
                component: resolve => require(['../pages/system-manage/role-manage/RoleManage.vue'], resolve),
                meta: {
                    title: '后台角色管理',
                    permission: false,
                    breadcrumb: [{
                            url: false,
                            title: '系统设置'
                        },
                        {
                            url: false,
                            title: '后台角色管理'
                        }
                    ]
                },
            }, {
                path: '/role-manage/modify-role-permissions/:id',
                name: 'modify-role-permissions',
                component: resolve => require(['../pages/system-manage/role-manage/ModifyRolePermissions.vue'], resolve),
                meta: {
                    title: '后台角色权限修改',
                    permission: false,
                    breadcrumb: [{
                            url: false,
                            title: '系统设置'
                        },
                        {
                            url: 'role-manage',
                            title: '后台角色管理'
                        },
                        {
                            url: false,
                            title: '后台角色权限修改'
                        }
                    ]
                },
            }, {
                path: '/menu-manage',
                name: 'menu-manage',
                component: resolve => require(['../pages/system-manage/menu-manage/MenuManage.vue'], resolve),
                meta: {
                    title: '后台菜单管理',
                    permission: false,
                    breadcrumb: [{
                            url: false,
                            title: '系统设置'
                        },
                        {
                            url: false,
                            title: '后台菜单管理'
                        }
                    ]
                },
            }, {
                path: '/salesman-manage',
                name: 'salesman-manage',
                component: resolve => require(['../pages/system-manage/salesman-manage/SalesmanManage.vue'], resolve),
                meta: {
                    title: '后台业务员管理',
                    permission: false,
                    breadcrumb: [{
                            url: false,
                            title: '系统设置'
                        },
                        {
                            url: false,
                            title: '后台业务员管理'
                        }
                    ]
                },
            },
            {
                path: '/bankcard-manage',
                name: 'bankcard-manage',
                component: resolve => require(['../pages/system-manage/bankcard-manage/BankCardManage.vue'], resolve),
                meta: {
                    title: '银行卡管理',
                    permission: false,
                    breadcrumb: [{
                            url: false,
                            title: '系统设置'
                        },
                        {
                            url: false,
                            title: '银行卡管理'
                        }
                    ]
                },
            },
            {
                path: '/bank-number-manage',
                name: 'bank-number-manage',
                component: resolve => require(['../pages/system-manage/bank-number-manage/BankNumberManage.vue'], resolve),
                meta: {
                    title: '银行号管理',
                    permission: false,
                    breadcrumb: [{
                            url: false,
                            title: '系统设置'
                        },
                        {
                            url: false,
                            title: '银行号管理'
                        }
                    ]
                },
            },
            {
                path: '/bank-info-manage',
                name: 'bank-info-manage',
                component: resolve => require(['../pages/system-manage/bank-info-manage/BankInfoManage.vue'], resolve),
                meta: {
                    title: '银行管理',
                    permission: false,
                    breadcrumb: [{
                            url: false,
                            title: '系统设置'
                        },
                        {
                            url: false,
                            title: '银行管理'
                        }
                    ]
                },
            },
            {
                path: '/risk-manage',
                name: 'risk-manage',
                component: resolve => require(['../pages/risk-manage/RiskManage.vue'], resolve),
                meta: {
                    title: '风控信息列表',
                    permission: false,
                    breadcrumb: [{
                            url: false,
                            title: '风控管理'
                        },
                        {
                            url: false,
                            title: '风控信息列表'
                        }
                    ]
                },
            },
            {
                path: '/message-manage',
                name: 'message-manage',
                component: resolve => require(['../pages/message-manage/MessageManage.vue'], resolve),
                meta: {
                    title: '短信模板列表',
                    permission: false,
                    breadcrumb: [{
                            url: false,
                            title: '短信管理'
                        },
                        {
                            url: false,
                            title: '短信模板列表'
                        }
                    ]
                },
            },
            {
                path: '/message-record-manage',
                name: 'message-record-manage',
                component: resolve => require(['../pages/message-manage/MessageRecordManage.vue'], resolve),
                meta: {
                    title: '短信记录列表',
                    permission: false,
                    breadcrumb: [{
                            url: false,
                            title: '短信管理'
                        },
                        {
                            url: false,
                            title: '短信记录列表'
                        }
                    ]
                },
            },
            {
                path: '/platform-information-manage',
                name: 'platform-information-manage',
                component: resolve => require(['../pages/platform-information-manage/PlatformInformationManage.vue'], resolve),
                meta: {
                    title: '平台信息列表',
                    permission: false,
                    breadcrumb: [{
                            url: false,
                            title: '平台管理'
                        },
                        {
                            url: false,
                            title: '平台信息列表'
                        }
                    ]
                },
            },
            {
                path: '/channel-routes-manage',
                name: 'channel-routes-manage',
                component: resolve => require(['../pages/routes-manage/ChannelRoutesManage.vue'], resolve),
                meta: {
                    title: '渠道路由列表',
                    permission: false,
                    breadcrumb: [{
                            url: false,
                            title: '路由管理'
                        },
                        {
                            url: false,
                            title: '渠道路由列表'
                        }
                    ]
                },
            },
            {
                path: '/authentication-routes-manage',
                name: 'authentication-routes-manage',
                component: resolve => require(['../pages/routes-manage/AuthenticationRoutesManage.vue'], resolve),
                meta: {
                    title: '鉴权路由列表',
                    permission: false,
                    breadcrumb: [{
                            url: false,
                            title: '路由管理'
                        },
                        {
                            url: false,
                            title: '鉴权路由列表'
                        }
                    ]
                },
            },
            {
                path: '/channel-manage',
                name: 'channel-manage',
                component: resolve => require(['../pages/channel-manage/ChannelManage.vue'], resolve),
                meta: {
                    title: '通道信息列表',
                    permission: false,
                    breadcrumb: [{
                            url: false,
                            title: '通道管理'
                        },
                        {
                            url: false,
                            title: '通道信息列表'
                        }
                    ]
                },
            },
            {
                path: '/product-manage',
                name: 'product-manage',
                component: resolve => require(['../pages/product-manage/ProductManage.vue'], resolve),
                meta: {
                    title: '产品信息列表',
                    permission: false,
                    breadcrumb: [{
                            url: false,
                            title: '产品管理'
                        },
                        {
                            url: false,
                            title: '产品信息列表'
                        }
                    ]
                },
            },
            {
                path: '/trade-manage',
                name: 'trade-manage',
                component: resolve => require(['../pages/trade-manage/TradeManage.vue'], resolve),
                meta: {
                    title: '交易信息列表',
                    permission: false,
                    breadcrumb: [{
                            url: false,
                            title: '交易管理'
                        },
                        {
                            url: false,
                            title: '交易信息列表'
                        }
                    ]
                },
            },
            {
                path: '/subscription-information',
                name: 'subscription-information',
                component: resolve => require(['../pages/trade-manage/SubscriptionInformation.vue'], resolve),
                meta: {
                    title: '签约信息列表',
                    permission: false,
                    breadcrumb: [{
                            url: false,
                            title: '交易管理'
                        },
                        {
                            url: false,
                            title: '签约信息列表'
                        }
                    ]
                },
            },
            {
                path: '/refund-information',
                name: 'refund-information',
                component: resolve => require(['../pages/trade-manage/RefundInformation.vue'], resolve),
                meta: {
                    title: '退款信息列表',
                    permission: false,
                    breadcrumb: [{
                            url: false,
                            title: '交易管理'
                        },
                        {
                            url: false,
                            title: '退款信息列表'
                        }
                    ]
                },
            },
            {
                path: '/icon-font',
                name: 'icon-font',
                component: resolve => require(['../pages/icon-font/IconFont.vue'], resolve),
                meta: {
                    title: 'icon-font',
                    permission: false,
                    breadcrumb: [{
                            url: false,
                            title: '系统设置'
                        },
                        {
                            url: 'menu-manage',
                            title: '后台菜单管理'
                        },
                        {
                            url: false,
                            title: 'icon-font'
                        }
                    ]
                },
            },
            {
                path: '/authentication-manage',
                name: 'authentication-manage',
                component: resolve => require(['../pages/authentication-manage/AuthenticationManage.vue'], resolve),
                meta: {
                    title: '鉴权信息列表',
                    permission: false,
                    breadcrumb: [{
                            url: false,
                            title: '鉴权管理'
                        },
                        {
                            url: false,
                            title: '鉴权信息列表'
                        }
                    ]
                },
            },
            {
                // 权限页面
                path: '/permission',
                name: 'permission',
                component: resolve => require(['../pages/permission/Index.vue'], resolve),
                meta: {
                    title: '角色管理',
                    permission: true
                }
            }
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: resolve => require(['../pages/login/Login.vue'], resolve),
        meta: {
            permission: false
        }
    },
    {
        path: '/404',
        name: '404',
        component: resolve => require(['../pages/error/404.vue'], resolve)
    },
    {
        path: '/403',
        name: '403',
        component: resolve => require(['../pages/error/403.vue'], resolve)
    },
    {
        path: '*',
        redirect: '/404'
    }
]

let router = new Router({
    // mode: 'history',
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return {
                x: 0,
                y: 0
            }
        }
    }
})

//使用钩子函数对路由进行权限跳转
router.beforeEach(({
    meta,
    name,
    fullPath,
    path
}, from, next) => {
    // let {permission = true} = meta;
    let role = store.getters.loginType;
    if (!role && path !== '/login') {
        next('/login');
    } else if (meta.permission) {
        // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
        role === 'admin' ? next() : next('/403');
    } else {
        next();
    }
});

router.afterEach(() => {})

export default router
