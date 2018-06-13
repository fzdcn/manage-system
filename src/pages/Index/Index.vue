<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="24">
                <el-row>
                    <el-col>
                        <el-card shadow="hover" class="mgb20">
                            <div class="user-info">
                                <img src="static/img/img.jpg" class="user-avator" alt="">
                                <div class="user-info-cont">
                                    <div class="user-info-name">{{username}}</div>
                                    <div style="margin-top: 20px;">{{managerLevel}}</div>
                                </div>
                            </div>
                            <div class="user-info-list">登录时间：<span>{{ loginDate }}</span></div>
                            <div class="user-info-list">联系电话：<span>{{ phone }}</span></div>
                        </el-card>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="24" class="mgb20">
                <el-row class="panel-group" :gutter="40">
                    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-1">
                                <i class="el-icon-view grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">1234</div>
                                    <div>用户访问量</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-2">
                                <i class="el-icon-message grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">321</div>
                                    <div>系统消息</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-3">
                                <i class="el-icon-goods grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">5000</div>
                                    <div>数量</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-3">
                                <i class="el-icon-goods grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">5000</div>
                                    <div>数量</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        <el-row>
            <el-card shadow="hover" :body-style="{padding: '20px',height:'450px'}">
                <e-charts></e-charts>
            </el-card>
        </el-row>
    </div>
</template>

<script>
    import eCharts from '../../components/echarts/eCharts'

    export default {
        components: {
            eCharts
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
        height 80px

    .grid-cont-right
        flex 1
        text-align center
        font-size 12px
        color #999

    .grid-con-1
        .grid-con-icon
            background rgb(45, 140, 240)
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
            width 80px
            height 80px
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
