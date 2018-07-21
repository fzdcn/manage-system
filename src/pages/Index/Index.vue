<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="24" class="mgb20">
                <el-row class="panel-group" :gutter="40">
                    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col" style="margin-bottom:20px;">
                        <el-card shadow="hover" :body-style="{padding: '20px'}">
                            <div class="grid-content grid-con-3">
                                <pan-thumb width="110px" height="110px" border-radius="50%" image="/static/img/head.png">
                                    {{managerLevel}}
                                </pan-thumb>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{ username }}</div>
                                    <div>登录时间</div>
                                    <div>{{ loginDate }}</div>
                                    <div>联系电话</div>
                                    <div>{{ phone }}</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col" style="margin-bottom:20px;">
                        <el-card shadow="hover" :body-style="{padding: '20px'}">
                            <div class="grid-content grid-con-1">
                                <i class="iconfont icon-jiao-yi-one grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <count-to class="card-panel-num grid-num" :decimals="2" :startVal="0" :endVal="currentDaySuccessPayMoney" :duration="5000"></count-to>
                                    <div>当天交易成功金额(元)</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col" style="margin-bottom:20px;">
                        <el-card shadow="hover" :body-style="{padding: '20px'}">
                            <div class="grid-content grid-con-2">
                                <i class="iconfont icon-qian-yue-one grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <count-to class="card-panel-num grid-num" :startVal="0" :endVal="currentDaySuccessPayNumber" :duration="5000"></count-to>
                                    <div>当天交易成功笔数</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col" style="margin-bottom:20px;">
                        <el-card shadow="hover" :body-style="{padding: '20px'}">
                            <div class="grid-content grid-con-3">
                                <i class="iconfont icon-zhang-hu-four grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <count-to class="card-panel-num grid-num" :decimals="2" :startVal="0" :endVal="allSuccessPayMoney" :duration="3000"></count-to>
                                    <div>历史交易成功总金额(元)</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        <el-row>
            <el-card shadow="hover" :body-style="{padding: '20px',height:'500px'}">
                <e-charts v-if="flag" :week-trade-amount-list="weekTradeAmount"></e-charts>
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
            flag: false,
            username: JSON.parse(localStorage.getItem('user')).username,
            managerLevel: JSON.parse(localStorage.getItem('user')).roleName,
            loginDate: JSON.parse(localStorage.getItem('user')).loginDate,
            phone: JSON.parse(localStorage.getItem('user')).phone,
            currentDaySuccessPayMoney: 0,
            currentDaySuccessPayNumber: 0,
            allSuccessPayMoney: 0,
            weekTradeAmount: []
        }
    },
    methods: {
        getAllData() {
            let vm = this
            this.$httpGet('/admin/epay/tradeInfo/findTradeNumAndAmount', {})
                .then(({ data }) => {
                    vm.currentDaySuccessPayMoney = data.todayTradeAmount
                    vm.currentDaySuccessPayNumber = data.todayTradeNum
                    vm.allSuccessPayMoney = data.allTradeAmount
                    vm.weekTradeAmount = data.weekTradeAmountList
                    vm.flag = true
                })
                .catch(data => {
                    console.log(data)
                })
        }
    },
    created() {
        this.getAllData()
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
    height 120px
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
        margin 4px 0
.grid-con-1
    .grid-con-icon
        background rgb(45, 140, 88)
        font-size 50px
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
        font-size 50px
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
        font-size 50px
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
