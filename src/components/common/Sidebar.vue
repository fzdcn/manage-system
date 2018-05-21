<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
                 text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
            <template v-for="item in items">
                <template style="line-height: 66px;height: 66px;" v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                        </template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">
                            {{ subItem.title }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                        <img src="" alt="">
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    import bus from '../common/bus';

    export default {
        data() {
            return {
                collapse: false,
                items: [
                    {
                        icon: 'el-icon-setting',
                        index: 'index',
                        title: '首页'
                    },
                    {
                        icon: 'el-icon-date',
                        index: '1',
                        title: '测试支付链接',
                        subs: [
                            {
                                index: 'payment',
                                title: '测试支付'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-tickets',
                        index: 'table',
                        title: '表格'
                    },
                    {
                        icon: 'el-icon-warning',
                        index: 'permission',
                        title: '角色管理'
                    }
                ]
            }
        },
        computed: {
            onRoutes() {
                return this.$route.path.replace('/', '');
            }
        },
        created() {
            let vm = this;
            // // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on('collapse', msg => {
                this.collapse = msg;
            });
            /*bus.$on('msg', item => {
                vm.items = item;
            });*/
        },
        /*beforeDestroy() {
            var vm = this;
            bus.$off('msg', item => {
                vm.items = item;
            })
        }*/
    }
</script>

<style scoped>
    .sidebar {
        display: block;
        position: absolute;
        left: 0;
        top: 70px;
        bottom: 0;
    }

    .sidebar-el-menu:not(.el-menu--collapse) {
        width: 250px;
    }

    .sidebar > ul {
        height: 100%;
    }
</style>
