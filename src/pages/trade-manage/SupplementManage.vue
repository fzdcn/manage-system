<template>
    <div class="table">
        <div class="container">
            <div class="handle-box" style="margin-bottom: 20px;display: flex;flex-flow: row wrap;">
                <div style="margin: 0px 20px 10px 0;">
                    <span>商户订单号：</span>
                    <el-input style="width: 150px;" class="username" v-model.trim="searchDataForm.merchantOrderNo" clearable placeholder="请填写商户订单号">
                    </el-input>
                </div>
                <div>
                    <el-button type="primary" icon="el-icon-search" @click="handleCurrentChange(1)">搜索</el-button>
                </div>
                <div>
                    <el-button type="primary" icon="el-icon-search" @click="handleCurrentChange(1)">银行补单</el-button>
                </div>
                <div>
                    <el-button type="primary" icon="el-icon-search" @click="handleCurrentChange(1)">商户补单</el-button>
                </div>
            </div>
            <el-table v-loading="loading" :data="getDataList" border style="width: 100%;">
                <el-table-column prop="merchantOrderNo" label="商户订单号">
                </el-table-column>
                <el-table-column prop="tradeState" label="交易状态">
                    <template slot-scope="scope">
                        <span v-if="scope.row.tradeState==0">失败</span>
                        <span v-if="scope.row.tradeState==1">成功</span>
                        <span v-if="scope.row.tradeState==2">待处理</span>
                        <span v-if="scope.row.tradeState==3">取消</span>
                        <span v-if="scope.row.tradeState==4">待确认</span>
                        <span v-if="scope.row.tradeState==5">未返回</span>
                        <span v-if="scope.row.tradeState==8">异常</span>
                    </template>
                </el-table-column>
                <el-table-column prop="upplementTime" label="补单时间" :formatter="upPlementTimeForMatter">
                </el-table-column>
                <el-table-column prop="bankCode" label="银行编码">
                </el-table-column>
                <el-table-column prop="platformNo" label="平台名称">
                    <template slot-scope="scope">
                        <span v-if="scope.row.platformNo==item.platformNo" v-for="item in platformIdList">{{ item.platformName }}</span>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination" style="overflow: hidden;">
                <el-pagination v-if="paginationShow" background :current-page="cur_page" @current-change="handleCurrentChange" layout="total, prev, pager, next, jumper" :page-size="10" :pager-count="11" :total="total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import { API_BASE, DEBUG } from '../../config/config'

export default {
    data() {
        return {
            loading: true,
            paginationShow: true,
            getDataList: [],
            // 当前页
            cur_page: 1,
            // 所有数量
            total: null,
            searchDataForm: {},
            // 交易状态列表
            tradeStateList: [
                {
                    id: '0',
                    name: '失败'
                },
                {
                    id: '1',
                    name: '成功'
                },
                {
                    id: '2',
                    name: '待处理'
                },
                {
                    id: '3',
                    name: '取消'
                },
                {
                    id: '4',
                    name: '待确认'
                },
                {
                    id: '5',
                    name: '未返回'
                },
                {
                    id: '8',
                    name: '异常'
                }
            ],
            // 银行支付通道
            channelNameList: [],
            // 平台名称
            platformIdList: []
        }
    },
    methods: {
        downLoad() {
            let vm = this
            let merchantCode = this.searchDataForm.merchantCode
                ? this.searchDataForm.merchantCode
                : ''
            let merchantOrderNo = this.searchDataForm.merchantOrderNo
                ? this.searchDataForm.merchantOrderNo
                : ''
            let orderNo = this.searchDataForm.orderNo
                ? this.searchDataForm.orderNo
                : ''
            let startTradeTime = this.searchDataForm.startTradeTime
                ? this.$moment(vm.searchDataForm.startTradeTime).format(
                      'YYYY-MM-DD HH:mm:ss'
                  )
                : ''
            let endTradeTime = this.searchDataForm.endTradeTime
                ? this.$moment(vm.searchDataForm.endTradeTime).format(
                      'YYYY-MM-DD HH:mm:ss'
                  )
                : ''
            let startBankReturnTime = this.searchDataForm.startBankReturnTime
                ? this.$moment(vm.searchDataForm.startBankReturnTime).format(
                      'YYYY-MM-DD HH:mm:ss'
                  )
                : ''
            let endBankReturnTime = this.searchDataForm.endBankReturnTime
                ? this.$moment(vm.searchDataForm.endBankReturnTime).format(
                      'YYYY-MM-DD HH:mm:ss'
                  )
                : ''
            let tradeState = this.searchDataForm.tradeState
                ? this.searchDataForm.tradeState
                : ''
            let payType = this.searchDataForm.payType
                ? this.searchDataForm.payType
                : ''
            let constchannelAccessCode = this.searchDataForm.channelAccessCode
                ? this.searchDataForm.channelAccessCode
                : ''
            const platformNo = this.searchDataForm.platformNo
                ? this.searchDataForm.platformNo
                : ''
            window.location.href =
                API_BASE +
                '/admin/epay/tradeInfo/exportTradeInfoList?' +
                'merchantCode=' +
                merchantCode +
                '&merchantOrderNo=' +
                merchantOrderNo +
                '&orderNo=' +
                orderNo +
                '&startTradeTime=' +
                startTradeTime +
                '&endTradeTime=' +
                endTradeTime +
                '&startBankReturnTime=' +
                startBankReturnTime +
                '&endBankReturnTime=' +
                endBankReturnTime +
                '&tradeState=' +
                tradeState +
                '&payType=' +
                payType +
                '&constchannelAccessCode=' +
                constchannelAccessCode +
                '&platformNo=' +
                platformNo
        },
        tradeTimeForMatter(row, column) {
            let tradeTime = row.tradeTime
            if (tradeTime)
                return this.$moment(tradeTime).format('YYYY-MM-DD HH:mm:ss')
        },
        bankReturnTimeForMatter(row, column) {
            let bankReturnTime = row.bankReturnTime
            if (bankReturnTime)
                return this.$moment(bankReturnTime).format(
                    'YYYY-MM-DD HH:mm:ss'
                )
        },
        upPlementTimeForMatter(row, column) {
            let upplementTime = row.upplementTime
            if (upplementTime)
                return this.$moment(upplementTime).format('YYYY-MM-DD HH:mm:ss')
        },
        // 分页导航
        handleCurrentChange(val) {
            this.cur_page = val
            this.paginationShow = false
            this.getData()
        },
        getData() {
            let vm = this
            this.$httpGet('/admin/epay/tradeInfo/index', {
                pageNo: this.cur_page,
                pageSize: 10,
                merchantCode: this.searchDataForm.merchantCode,
                merchantOrderNo: this.searchDataForm.merchantOrderNo,
                orderNo: this.searchDataForm.orderNo,
                startTradeTime: this.searchDataForm.startTradeTime
                    ? this.$moment(vm.searchDataForm.startTradeTime).format(
                          'YYYY-MM-DD HH:mm:ss'
                      )
                    : '',
                endTradeTime: this.searchDataForm.endTradeTime
                    ? this.$moment(vm.searchDataForm.endTradeTime).format(
                          'YYYY-MM-DD HH:mm:ss'
                      )
                    : '',
                startBankReturnTime: this.searchDataForm.startBankReturnTime
                    ? this.$moment(
                          vm.searchDataForm.startBankReturnTime
                      ).format('YYYY-MM-DD HH:mm:ss')
                    : '',
                endBankReturnTime: this.searchDataForm.endBankReturnTime
                    ? this.$moment(vm.searchDataForm.endBankReturnTime).format(
                          'YYYY-MM-DD HH:mm:ss'
                      )
                    : '',
                tradeState: this.searchDataForm.tradeState,
                payType: this.searchDataForm.payType,
                channelAccessCode: this.searchDataForm.channelAccessCode,
                platformNo: this.searchDataForm.platformNo
            })
                .then(({ data }) => {
                    vm.getDataList = data.list
                    vm.total = data.total
                    vm.paginationShow = true
                    vm.loading = false
                })
                .catch(data => {
                    console.log(data)
                })
        },
        // 银行支付通道
        getChannelInfoList() {
            let vm = this
            this.$httpGet('/admin/epay/channelInfo/findChannelAll', {})
                .then(({ data }) => {
                    vm.channelNameList = data
                })
                .catch(data => {
                    console.log(data)
                })
        },
        // 平台名称
        getPlatFormList() {
            let vm = this
            this.$httpGet('/admin/platformInfo/option', {})
                .then(({ data }) => {
                    vm.platformIdList = data
                })
                .catch(data => {
                    console.log(data)
                })
        }
    },
    mounted() {
        this.getData()
        this.getPlatFormList()
        this.getChannelInfoList()
    }
}
</script>

<style scoped>
</style>
