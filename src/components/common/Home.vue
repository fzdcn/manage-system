<template>
    <div class="wrapper">
        <v-head></v-head>
        <v-sidebar></v-sidebar>
        <div class="content-box" :class="{'content-collapse':collapse}">
            <v-tags></v-tags>
            <div class="content">
                <breadcrumb class="breadcrumb-container"></breadcrumb>
                <transition name="move" mode="out-in">
                    <!--<keep-alive>-->
                    <router-view></router-view>
                    <!--</keep-alive>-->
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
    import vHead from './Header.vue';
    import vSidebar from './Sidebar.vue';
    import vTags from './Tags.vue';
    import bus from '../common/bus';
    import Breadcrumb from './Breadcrumb.vue';

    export default {
        data() {
            return {
                collapse: false
            }
        },
        components: {
            vHead, vSidebar, vTags, Breadcrumb
        },
        created() {
            bus.$on('collapse', msg => {
                this.collapse = msg;
            })
        }
    }
</script>
<style lang="stylus" scoped>
    /*.breadcrumb-container*/
    /*float left*/
</style>
