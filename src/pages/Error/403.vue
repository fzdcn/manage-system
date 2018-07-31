<template>
    <div class="error-page">
        <div @click="goBack" class="error-code">
            <img src="../../../static/img/403.png" alt="403">
        </div>
        <div class="error-desc">啊哦~ 你没有权限访问该页面哦</div>
        <div class="error-handle">
            <!--<el-button class="error-btn" type="primary" size="large" @click="goBack">返回上一页</el-button>-->
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        goBack() {
            this.$router.go(-1)
        }
    }
}
</script>

<style scoped lang="stylus">
.error-page
    display flex
    justify-content center
    align-items center
    flex-direction column
    width 100%
    height 100%
    background #fff
    box-sizing border-box
.error-code
    line-height 1
    font-size 250px
    font-weight bolder
    color #f02d2d
    img
        cursor pointer
.error-desc
    font-size 30px
    color #777
.error-handle
    margin-top 30px
    padding-bottom 200px
.error-btn
    margin-left 100px
</style>
