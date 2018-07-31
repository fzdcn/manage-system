<template>
    <div class="table">
        <div class="container">
            <div class="handle-box clearfix" style="margin-bottom: 20px;">
                <div style="margin: 0px 20px 10px 0;float: left;">
                    <span>商户号：</span>
                    <el-input style="width: 150px;" class="username" v-model.trim="searchDataForm.merchantCode" clearable placeholder="请填写商户号">
                    </el-input>
                </div>
                <div style="margin: 0px 20px 10px 0;float: left;">
                    <span>商户订单号：</span>
                    <el-input style="width: 150px;" class="username" v-model.trim="searchDataForm.merchantOrderNo" clearable placeholder="请填写商户订单号">
                    </el-input>
                </div>
                <div style="margin: 0px 20px 10px 0;float: left;">
                    <span>双乾流水号：</span>
                    <el-input style="width: 150px;" class="username" v-model.trim="searchDataForm.orderNo" clearable placeholder="请填写双乾流水号">
                    </el-input>
                </div>
                <div style="margin: 0px 20px 10px 0;float: left;">
                    <span>交易时间（始）：</span>
                    <el-date-picker type="datetime" style="width: 185px;" class="username" v-model.trim="searchDataForm.startTradeTime" clearable placeholder="请填写交易时间（始）">
                    </el-date-picker>
                </div>
                <div style="margin: 0px 20px 10px 0;float: left;">
                    <span>交易时间（终）：</span>
                    <el-date-picker type="datetime" style="width: 185px;" class="username" v-model.trim="searchDataForm.endTradeTime" clearable placeholder="请填写交易时间（终）">
                    </el-date-picker>
                </div>
                <div style="margin: 0px 20px 10px 0;float: left;">
                    <span>银行返回时间（始）：</span>
                    <el-date-picker type="datetime" style="width: 185px;" class="username" v-model.trim="searchDataForm.startBankReturnTime" clearable placeholder="请填写银行返回时间（始）">
                    </el-date-picker>
                </div>
                <div style="margin: 0px 20px 10px 0;float: left;">
                    <span>银行返回时间（终）：</span>
                    <el-date-picker type="datetime" style="width: 185px;" class="username" v-model.trim="searchDataForm.endBankReturnTime" clearable placeholder="请填写银行返回时间（终）">
                    </el-date-picker>
                </div>
                <div style="margin: 0px 20px 10px 0;float: left;">
                    <span>交易状态：</span>
                    <el-select clearable style="width: 150px;" v-model="searchDataForm.tradeState" placeholder="请选择交易状态">
                        <el-option v-for="item in tradeStateList" :key="item.id" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <div style="margin: 0px 20px 10px 0;float: left;">
                    <span>支付类型：</span>
                    <el-select clearable style="width: 150px;" v-model="searchDataForm.payType" placeholder="请选择支付类型">
                        <el-option v-for="item in payTypeList" :key="item.id" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <div style="margin: 0px 20px 10px 0;float: left;">
                    <span>银行支付通道：</span>
                    <el-select clearable style="width: 150px;" v-model="searchDataForm.channelId" placeholder="请选择银行支付通道">
                        <el-option v-for="item in channelNameList" :key="item.id" :label="item.channelName" :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <div style="margin: 0px 20px 10px 0;float: left;">
                    <span>平台名称：</span>
                    <el-select clearable style="width: 150px;" v-model="searchDataForm.platformId" placeholder="请选择平台名称">
                        <el-option v-for="item in platformIdList" :key="item.id" :label="item.platformName" :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <div style="float: left;">
                    <el-button type="primary" icon="el-icon-search" @click="handleCurrentChange(1)">搜索</el-button>
                </div>
                <div style="margin-left: 20px;float: left;">
                    <el-button type="primary" icon="el-icon-download" @click="downLoad">下载</el-button>
                </div>
            </div>
            <el-table :data="getDataList" border style="width: 100%;">
                <el-table-column show-overflow-tooltip prop="merchantCode" label="商户号">
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="merchantName" label="商户名称">
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="merchantOrderNo" label="商户订单号">
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="orderNo" label="双乾流水号">
                </el-table-column>
                <el-table-column prop="tradeState" label="交易状态">
                    <template slot-scope="scope">
                        <span v-if="scope.row.tradeState==item.id" v-for="item in tradeStateList">{{ item.name }}</span>
                    </template>
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="tradeTime" label="交易时间" :formatter="tradeTimeForMatter">
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="tradeAmount" label="交易金额（元）">
                </el-table-column>
                <!-- <el-table-column show-overflow-tooltip prop="tradeRate" label="交易费率">
                </el-table-column> -->
                <el-table-column show-overflow-tooltip prop="tradeFee" label="交易手续费（元）">
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="payType" label="支付类型">
                    <template slot-scope="scope">
                        <span v-if="scope.row.payType==item.id" v-for="item in payTypeList">{{ item.name }}</span>
                    </template>
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="platformName" label="平台名称">
                </el-table-column>
                <el-table-column align="center" label="操作" width="100px">
                    <template v-if="getDataList.length > 0" slot-scope="scope">
                        <el-button @click="handleDetail(scope.row)" type="primary" icon="el-icon-view" size="small">
                            查看
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination" style="overflow: hidden;">
                <el-pagination v-if="paginationShow" background :current-page="cur_page" @current-change="handleCurrentChange" layout="total, prev, pager, next, jumper" :page-size="10" :pager-count="11" :total="total">
                </el-pagination>
            </div>
        </div>
        <!--查看详情-->
        <el-dialog title="查看详情" :visible.sync="isShowDetail" :before-close="cancelDetail" width="700px" center>
            <div class="form-content" style="margin: 0 auto;width: 90%;">
                <el-form label-width="150px" ref="detailDataForm" :model="detailDataForm" size="mini">
                    <el-form-item label="商户号:">
                        <el-input :disabled="true" v-model="detailDataForm.merchantCode"></el-input>
                    </el-form-item>
                    <el-form-item label="商户名称:">
                        <el-input :disabled="true" v-model="detailDataForm.merchantName"></el-input>
                    </el-form-item>
                    <el-form-item label="商户订单号:">
                        <el-input :disabled="true" v-model="detailDataForm.merchantOrderNo"></el-input>
                    </el-form-item>
                    <el-form-item label="双乾流水号:">
                        <el-input :disabled="true" v-model="detailDataForm.orderNo"></el-input>
                    </el-form-item>
                    <el-form-item label="交易状态:">
                        <el-input :disabled="true" v-model="detailDataForm.tradeState"></el-input>
                    </el-form-item>
                    <el-form-item label="交易时间:">
                        <el-input :disabled="true" v-model="detailDataForm.tradeTime"></el-input>
                    </el-form-item>
                    <el-form-item label="交易金额(元):">
                        <el-input :disabled="true" v-model="detailDataForm.tradeAmount"></el-input>
                    </el-form-item>
                    <!-- <el-form-item  label="交易费率:">
                        <el-input :disabled="true" v-model="detailDataForm.tradeRate"></el-input>
                    </el-form-item> -->
                    <el-form-item label="交易手续费(元):">
                        <el-input :disabled="true" v-model="detailDataForm.tradeFee"></el-input>
                    </el-form-item>
                    <el-form-item label="银行订单号:">
                        <el-input :disabled="true" v-model="detailDataForm.bankOrderNo"></el-input>
                    </el-form-item>
                    <el-form-item label="银行返回时间:">
                        <el-input :disabled="true" v-model="detailDataForm.bankReturnTime"></el-input>
                    </el-form-item>
                    <el-form-item label="补单时间:">
                        <el-input :disabled="true" v-model="detailDataForm.upplementTime"></el-input>
                    </el-form-item>
                    <el-form-item label="银行支付通道:">
                        <el-input :disabled="true" v-model="detailDataForm.channelName"></el-input>
                    </el-form-item>
                    <el-form-item label="银行编码:">
                        <el-input :disabled="true" v-model="detailDataForm.bankCode"></el-input>
                    </el-form-item>
                    <el-form-item label="支付类型:">
                        <el-input :disabled="true" v-model="detailDataForm.payType"></el-input>
                    </el-form-item>
                    <el-form-item label="业务员code:">
                        <el-input :disabled="true" v-model="detailDataForm.saleCode"></el-input>
                    </el-form-item>
                    <el-form-item label="平台名称:">
                        <el-input :disabled="true" v-model="detailDataForm.platformName"></el-input>
                    </el-form-item>
                    <el-form-item label="商户ip:">
                        <el-input :disabled="true" v-model="detailDataForm.merchantIp"></el-input>
                    </el-form-item>
                    <el-form-item label="付款银行流水号:">
                        <el-input :disabled="true" v-model="detailDataForm.bankTradeNo"></el-input>
                    </el-form-item>
                    <el-form-item label="卡类型:">
                        <el-input :disabled="true" v-model="detailDataForm.cardType"></el-input>
                    </el-form-item>
                    <el-form-item label="产品备注:">
                        <el-input type="textarea" :disabled="true" v-model="detailDataForm.tradeDesc"></el-input>
                    </el-form-item>
                    <el-form-item label="商户备注:">
                        <el-input type="textarea" :disabled="true" v-model="detailDataForm.merchantRemark"></el-input>
                    </el-form-item>
                    <el-form-item label="系统备注:">
                        <el-input type="textarea" :disabled="true" v-model="detailDataForm.sysRemark"></el-input>
                    </el-form-item>
                    <el-form-item label="ip:">
                        <el-input :disabled="true" v-model="detailDataForm.ip"></el-input>
                    </el-form-item>
                    <el-form-item label="前台返回地址:">
                        <el-input :disabled="true" v-model="detailDataForm.returnUrl"></el-input>
                    </el-form-item>
                    <el-form-item label="后台返回地址:">
                        <el-input :disabled="true" v-model="detailDataForm.notifyUrl"></el-input>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { API_BASE, DEBUG } from '../../config/config'
import { timestampToDate } from '../../functions/index.js'

export default {
    data() {
        return {
            paginationShow: true,
            getDataList: [],
            // 当前页
            cur_page: 1,
            // 所有数量
            total: null,
            searchDataForm: {},
            isShowDetail: false,
            detailDataForm: {},
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
            // 支付类型列表
            payTypeList: [
                {
                    id: '0',
                    name: '个人网银'
                },
                {
                    id: '1',
                    name: '企业网银'
                },
                {
                    id: '2',
                    name: '快捷支付'
                },
                {
                    id: '3',
                    name: '认证支付'
                },
                {
                    id: '4',
                    name: '代扣'
                },
                {
                    id: '5',
                    name: '微信支付'
                },
                {
                    id: '6',
                    name: '支付宝支付'
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
            let startTradeTime = timestampToDate(
                this.searchDataForm.startTradeTime
            )
            let endTradeTime = timestampToDate(this.searchDataForm.endTradeTime)
            let startBankReturnTime = timestampToDate(
                this.searchDataForm.startBankReturnTime
            )
            let endBankReturnTime = timestampToDate(
                this.searchDataForm.endBankReturnTime
            )
            let tradeState = this.searchDataForm.tradeState
                ? this.searchDataForm.tradeState
                : ''
            let payType = this.searchDataForm.payType
                ? this.searchDataForm.payType
                : ''
            let constchannelAccessCode = this.searchDataForm.channelId
                ? this.searchDataForm.channelId
                : ''
            const platformId = this.searchDataForm.platformId
                ? this.searchDataForm.platformId
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
                '&platformId=' +
                platformId
        },
        tradeTimeForMatter(row, column) {
            return timestampToDate(row.tradeTime)
        },
        // 获取交易状态
        getTradeState(params) {
            switch (params) {
                case 0:
                    return (params = '失败')
                    break
                case 1:
                    return (params = '成功')
                    break
                case 2:
                    return (params = '待处理')
                    break
                case 3:
                    return (params = '取消')
                    break
                case 4:
                    return (params = '待确认')
                    break
                case 5:
                    return (params = '未返回')
                    break
                case 8:
                    return (params = '异常')
                    break
                default:
                    return '暂无'
                    break
            }
        },
        // 支付类型
        getPayTypeList(params) {
            switch (params) {
                case 0:
                    return (params = '个人网银')
                    break
                case 1:
                    return (params = '企业网银')
                    break
                case 2:
                    return (params = '快捷支付')
                    break
                case 3:
                    return (params = '认证支付')
                    break
                case 4:
                    return (params = '代扣')
                    break
                case 5:
                    return (params = '微信支付')
                    break
                case 6:
                    return (params = '支付宝支付')
                    break
                default:
                    return '暂无'
                    break
            }
        },
        // 卡类型
        getCardTypeList(params) {
            switch (params) {
                case '00':
                    return (params = '借记卡')
                    break
                case '01':
                    return (params = '贷记卡')
                    break
                case '02':
                    return (params = '未知')
                    break
                default:
                    return '暂无'
                    break
            }
        },
        handleDetail(row) {
            this.isShowDetail = true
            this.detailDataForm.merchantCode = row.merchantCode
            this.detailDataForm.merchantName = row.merchantName
            this.detailDataForm.merchantOrderNo = row.merchantOrderNo
            this.detailDataForm.orderNo = row.orderNo
            this.detailDataForm.tradeState = this.getTradeState(row.tradeState)
            this.detailDataForm.tradeTime = timestampToDate(row.tradeTime)
            this.detailDataForm.tradeAmount = row.tradeAmount
            this.detailDataForm.tradeRate = row.tradeRate
            this.detailDataForm.tradeFee = row.tradeFee
            this.detailDataForm.bankOrderNo = row.bankOrderNo
            this.detailDataForm.bankReturnTime = timestampToDate(
                row.bankReturnTime
            )
            this.detailDataForm.upplementTime = timestampToDate(
                row.upplementTime
            )
            this.detailDataForm.channelName = row.channelName
            this.detailDataForm.channelCode = row.channelCode
            this.detailDataForm.bankCode = row.bankCode
            this.detailDataForm.payType = this.getPayTypeList(row.payType)
            this.detailDataForm.saleCode = row.saleCode
            this.detailDataForm.platformId = row.platformId
            this.detailDataForm.platformName = row.platformName
            this.detailDataForm.tradeDesc = row.tradeDesc
            this.detailDataForm.merchantRemark = row.merchantRemark
            this.detailDataForm.sysRemark = row.sysRemark
            this.detailDataForm.merchantIp = row.merchantIp
            this.detailDataForm.ip = row.ip
            this.detailDataForm.returnUrl = row.returnUrl
            this.detailDataForm.notifyUrl = row.notifyUrl
            this.detailDataForm.bankTradeNo = row.bankTradeNo
            this.detailDataForm.cardType = this.getCardTypeList(row.cardType)
        },
        cancelDetail() {
            this.isShowDetail = false
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
                startTradeTime: timestampToDate(
                    this.searchDataForm.startTradeTime
                ),
                endTradeTime: timestampToDate(this.searchDataForm.endTradeTime),
                startBankReturnTime: timestampToDate(
                    this.searchDataForm.startBankReturnTime
                ),
                endBankReturnTime: timestampToDate(
                    this.searchDataForm.endBankReturnTime
                ),
                tradeState: this.searchDataForm.tradeState,
                payType: this.searchDataForm.payType,
                channelId: this.searchDataForm.channelId,
                platformId: this.searchDataForm.platformId
            })
                .then(({ data }) => {
                    vm.getDataList = data.list
                    vm.total = data.total
                    vm.paginationShow = true
                })
                .catch(data => {
                    console.log(data)
                })
        },
        // 同步
        getListData() {
            let vm = this
            return this.$httpGet('/admin/epay/tradeInfo/index', {
                pageNo: this.cur_page,
                pageSize: 10,
                merchantCode: this.searchDataForm.merchantCode,
                merchantOrderNo: this.searchDataForm.merchantOrderNo,
                orderNo: this.searchDataForm.orderNo,
                startTradeTime: timestampToDate(
                    this.searchDataForm.startTradeTime
                ),
                endTradeTime: timestampToDate(this.searchDataForm.endTradeTime),
                startBankReturnTime: timestampToDate(
                    this.searchDataForm.startBankReturnTime
                ),
                endBankReturnTime: timestampToDate(
                    this.searchDataForm.endBankReturnTime
                ),
                tradeState: this.searchDataForm.tradeState,
                payType: this.searchDataForm.payType,
                channelId: this.searchDataForm.channelId,
                platformId: this.searchDataForm.platformId
            })
        },
        // 银行支付通道
        getChannelInfoList() {
            return this.$httpGet('/admin/epay/channelInfo/findChannelAll', {})
        },
        // 平台名称
        getPlatFormList() {
            return this.$httpGet('/admin/platformInfo/option', {})
        },
        async getAllData() {
            let vm = this
            await Promise.all([
                vm.getChannelInfoList(),
                vm.getPlatFormList(),
                vm.getListData()
            ])
                .then(data => {
                    vm.channelNameList = data[0].data
                    vm.platformIdList = data[1].data
                    vm.getDataList = data[2].data.list
                    vm.total = data[2].data.total
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

<style scoped>
</style>
