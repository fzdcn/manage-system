<template>
    <el-breadcrumb class="app-breadcrumb" separator="/">
        <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-if="item.url" :to="{ path: '/'+item.url }" v-for="(item, index) in $route.meta.breadcrumb" :key="index">{{item.title}}</el-breadcrumb-item>
        <el-breadcrumb-item v-else>{{item.title}}</el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
</script>

<style lang="stylus" scoped>
.app-breadcrumb.el-breadcrumb
    display inline-block
    font-size 14px
    line-height 50px
</style>
