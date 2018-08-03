<template>
    <div class="sidebar">
        <el-menu @select="handleSelect" class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157" text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened>
            <template v-for="item in menuItems">
                <template v-if="item.subs">
                    <el-submenu :index="item.url" :key="item.url">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span slot="title">{{ item.name }}</span>
                        </template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.url">
                            <i :class="subItem.icon"></i>
                            {{ subItem.name }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.url" :key="item.url">
                        <i :class="item.icon"></i>
                        <span slot="title">{{ item.name }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
import bus from '../common/bus'

export default {
    data() {
        return {
            collapse: false,
            menuItems: this.$store.getters.menu
            // 菜单列表形式
            /*menuItems: [
                    {
                        "name": "首页",
                        "icon-font": "iconfont icon-font-shouye1",
                        "url": "index",
                    }, {
                        "name": "运营管理",
                        "icon-font": "iconfont icon-font-shezhi",
                        "url": "1",
                        "subs": [
                            {
                                "name": "合同管理",
                                "icon-font": "iconfont icon-font-guanli1",
                                "url": "",
                            }, {
                                "name": "客服管理",
                                "icon-font": "iconfont icon-font-guanli1",
                                "url": "",
                            }, {
                                "name": "业务管理",
                                "icon-font": "iconfont icon-font-guanli1",
                                "url": "",
                            }
                        ]
                    }, {
                        "name": "系统设置",
                        "icon-font": "iconfont icon-font-shezhi",
                        "url": "2",
                        "subs": [
                            {
                                "name": "后台账户管理",
                                "icon-font": "iconfont icon-font-guanli1",
                                "url": "account-manage",
                            }, {
                                "name": "后台角色管理",
                                "icon-font": "iconfont icon-font-guanli1",
                                "url": "role-manage",
                            }, {
                                "name": "后台菜单管理",
                                "icon-font": "iconfont icon-font-guanli1",
                                "url": "menu-manage",
                            }, {
                                "name": "后台业务员管理",
                                "icon-font": "iconfont icon-font-guanli1",
                                "url": "salesman-manage",
                            }
                        ]
                    }
                ]*/
        }
    },
    computed: {
        onRoutes() {
            return this.$route.path.replace('/', '')
        }
    },
    methods: {
        handleSelect(key, keyPath) {
            this.$router.push({ name: key })
        }
    },
    created() {
        let vm = this
        // 通过 Event Bus 进行组件间通信，来折叠侧边栏
        bus.$on('collapse', msg => {
            vm.collapse = msg
        })
        // 通过 Event Bus 进行组件间通信，来刷新侧边栏数据
        bus.$on('menuItems', () => {
            vm.menuItems = vm.$store.getters.menu
        })
    }
}
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
}

.sidebar-el-menu:not(.el-menu--collapse) {
    width: 200px;
}

.sidebar > ul {
    height: 100%;
}
</style>
