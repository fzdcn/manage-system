<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="24" class="mgb20">
                <el-row class="panel-group" :gutter="40">
                    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
                        <el-card shadow="hover" :body-style="{padding: '20px'}">
                            <div class="grid-content grid-con-3" style="height: 150px">
                                <pan-thumb width="120px" height="120px" border-radius="50%" image="static/img/img.jpg">
                                    {{managerLevel}}
                                </pan-thumb>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{ username }}</div>
                                    <div>登录时间：{{ loginDate }}</div>
                                    <div>联系电话：{{ phone }}</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
                        <el-card shadow="hover" :body-style="{padding: '20px'}">
                            <div class="grid-content grid-con-1">
                                <i class="el-icon-view grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <count-to class="card-panel-num grid-num" :startVal="0" :endVal="81212"
                                              :duration="3000"></count-to>
                                    <div>用户访问量</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
                        <el-card shadow="hover" :body-style="{padding: '20px'}">
                            <div class="grid-content grid-con-2">
                                <i class="el-icon-message grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <count-to class="card-panel-num grid-num" :startVal="0" :endVal="88888"
                                              :duration="3000"></count-to>
                                    <div>系统消息</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
                        <el-card shadow="hover" :body-style="{padding: '20px'}">
                            <div class="grid-content grid-con-3">
                                <i class="el-icon-goods grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <count-to class="card-panel-num grid-num" :startVal="0" :endVal="5000"
                                              :duration="3000"></count-to>
                                    <div>数量</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        <el-row>
            <el-card shadow="hover" :body-style="{padding: '20px',height:'500px'}">
                <e-charts></e-charts>
            </el-card>
        </el-row>
    </div>
</template>

<script>
    import eCharts from '../../components/echarts/eCharts'
    import PanThumb from '../../components/pan-thumb/index'
    import CountTo from 'vue-count-to'

    export default {
        components: {
            eCharts,
            PanThumb,
            CountTo
        },
        data() {
            return {
                username: JSON.parse(localStorage.getItem('user')).username,
                managerLevel: JSON.parse(localStorage.getItem('user')).roleName,
                loginDate: JSON.parse(localStorage.getItem('user')).loginDate,
                phone: JSON.parse(localStorage.getItem('user')).phone
            }
        }
    }

</script>

<style scoped lang="stylus">
    .mgb20
        margin-bottom 20px

    .todo-item
        font-size 14px

    .grid-content
        display flex
        align-items center
        height 100px
        cursor pointer
        &:hover
            .grid-con-icon
                background rgb(45, 140, 240)

    .grid-cont-right
        flex 1
        text-align center
        font-size 12px
        color #999
        > div
            margin 10px 0

    .grid-con-1
        .grid-con-icon
            background rgb(45, 140, 88)
            font-size: 50px
            width 100px
            height 100px
            text-align center
            line-height 100px
            color #fff
        .grid-num
            color rgb(45, 140, 240)
            font-size 30px
            font-weight bold

    .grid-con-2
        .grid-con-icon
            background rgb(100, 213, 114)
            font-size: 50px
            width 100px
            height 100px
            text-align center
            line-height 100px
            color #fff
        .grid-num
            color rgb(45, 140, 240)
            font-size 30px
            font-weight bold

    .grid-con-3
        .grid-con-icon
            background rgb(242, 94, 67)
            font-size: 50px
            width 100px
            height 100px
            text-align center
            line-height 100px
            color #fff

        .grid-num
            color rgb(242, 94, 67)
            font-size 30px
            font-weight bold

    .user-info
        display flex
        align-items center
        padding-bottom 10px
        border-bottom 2px solid #ccc
        margin-bottom 10px
        .user-avator
            width 100px
            height 100px
            border-radius 50%
        .user-info-cont
            padding-left 20px
            flex 1
            font-size 14px
            color #999
            div:first-child
                font-size 30px
                color #222

    .user-info-list
        font-size 14px
        color #999
        line-height 25px
        span
            margin-left 20px
</style>
