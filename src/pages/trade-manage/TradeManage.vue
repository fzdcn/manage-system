<template>
    <div class="table">
        <div class="container">
            <div class="handle-box" style="margin-bottom: 20px;display: flex;flex-flow: row wrap;">
                <div style="margin: 0px 20px 10px 0;">
                    <span>商户号：</span>
                    <el-input style="width: 150px;" class="username" v-model.trim="searchDataForm.merchantCode"
                              clearable placeholder="请填写商户号">
                    </el-input>
                </div>
                <div style="margin: 0px 20px 10px 0;">
                    <span>商户订单号：</span>
                    <el-input style="width: 150px;" class="username" v-model.trim="searchDataForm.merchantOrderNo"
                              clearable placeholder="请填写商户订单号">
                    </el-input>
                </div>
                <div style="margin: 0px 20px 10px 0;">
                    <span>双乾流水号：</span>
                    <el-input style="width: 150px;" class="username" v-model.trim="searchDataForm.orderNo"
                              clearable placeholder="请填写双乾流水号">
                    </el-input>
                </div>
                <div style="margin: 0px 20px 10px 0;">
                    <span>交易时间（始）：</span>
                    <el-date-picker type="datetime" style="width: 185px;" class="username"
                                    v-model.trim="searchDataForm.startTradeTime"
                                    clearable placeholder="请填写交易时间（始）">
                    </el-date-picker>
                </div>
                <div style="margin: 0px 20px 10px 0;">
                    <span>交易时间（终）：</span>
                    <el-date-picker type="datetime" style="width: 185px;" class="username"
                                    v-model.trim="searchDataForm.endTradeTime"
                                    clearable placeholder="请填写交易时间（终）">
                    </el-date-picker>
                </div>
                <div style="margin: 0px 20px 10px 0;">
                    <span>银行返回时间（始）：</span>
                    <el-date-picker type="datetime" style="width: 185px;" class="username"
                                    v-model.trim="searchDataForm.startBankReturnTime"
                                    clearable placeholder="请填写银行返回时间（始）">
                    </el-date-picker>
                </div>
                <div style="margin: 0px 20px 10px 0;">
                    <span>银行返回时间（终）：</span>
                    <el-date-picker type="datetime" style="width: 185px;" class="username"
                                    v-model.trim="searchDataForm.endBankReturnTime"
                                    clearable placeholder="请填写银行返回时间（终）">
                    </el-date-picker>
                </div>
                <div style="margin: 0px 20px 10px 0;">
                    <span>交易状态：</span>
                    <el-select clearable style="width: 150px;" v-model="searchDataForm.tradeState"
                               placeholder="请选择交易状态">
                        <el-option
                            v-for="item in tradeStateList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <div style="margin: 0px 20px 10px 0;">
                    <span>支付类型：</span>
                    <el-select clearable style="width: 150px;" v-model="searchDataForm.payType"
                               placeholder="请选择支付类型">
                        <el-option
                            v-for="item in payTypeList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <div style="margin: 0px 20px 10px 0;">
                    <span>银行支付通道：</span>
                    <el-select clearable style="width: 150px;" v-model="searchDataForm.channelAccessCode"
                               placeholder="请选择银行支付通道">
                        <el-option
                            v-for="item in channelNameList"
                            :key="item.channelAccessCode"
                            :label="item.channelName"
                            :value="item.channelAccessCode">
                        </el-option>
                    </el-select>
                </div>
                <div style="margin: 0px 20px 10px 0;">
                    <span>平台名称：</span>
                    <el-select clearable style="width: 150px;" v-model="searchDataForm.platformId"
                               placeholder="请选择平台名称">
                        <el-option
                            v-for="item in platformIdList"
                            :key="item.id"
                            :label="item.platformName"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <div>
                    <el-button type="primary" icon="el-icon-search" @click="handleCurrentChange(1)">搜索</el-button>
                </div>
                <div style="margin-left: 20px;">
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
                <el-table-column show-overflow-tooltip prop="tradeRate" label="交易费率">
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="tradeFee" label="交易手续费（元）">
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="payType" label="支付类型">
                    <template slot-scope="scope">
                        <span v-if="scope.row.payType==item.id" v-for="item in payTypeList">{{ item.name }}</span>
                    </template>
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="platformId" label="平台名称">
                    <template slot-scope="scope">
                        <span v-if="scope.row.platformId==item.platformId" v-for="item in platformIdList">{{ item.platformName }}</span>
                    </template>
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
                <el-pagination v-if="paginationShow" background :current-page="cur_page"
                               @current-change="handleCurrentChange"
                               layout="total, prev, pager, next, jumper"
                               :page-size="10" :pager-count="11" :total="total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import {API_BASE, DEBUG} from '../../config/config';

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
                // 交易状态列表
                tradeStateList: [
                    {
                        id: '0',
                        name: "失败"
                    },
                    {
                        id: '1',
                        name: "成功"
                    },
                    {
                        id: '2',
                        name: "待处理"
                    },
                    {
                        id: '3',
                        name: "取消"
                    },
                    {
                        id: '4',
                        name: "待确认"
                    },
                    {
                        id: '5',
                        name: "未返回"
                    },
                    {
                        id: '8',
                        name: "异常"
                    },
                ],
                // 支付类型列表
                payTypeList: [
                    {
                        id: '0',
                        name: "个人网银"
                    },
                    {
                        id: '1',
                        name: "企业网银"
                    },
                    {
                        id: '2',
                        name: "快捷支付"
                    },
                    {
                        id: '3',
                        name: "认证支付"
                    },
                    {
                        id: '4',
                        name: "代扣"
                    },
                    {
                        id: '5',
                        name: "微信支付"
                    },
                    {
                        id: '6',
                        name: "支付宝支付"
                    },
                ],
                // 银行支付通道
                channelNameList: [],
                // 平台名称
                platformIdList: [],
            }
        },
        methods: {
            downLoad() {
                let vm = this;
                let merchantCode = this.searchDataForm.merchantCode ? this.searchDataForm.merchantCode : "";
                let merchantOrderNo = this.searchDataForm.merchantOrderNo ? this.searchDataForm.merchantOrderNo : "";
                let orderNo = this.searchDataForm.orderNo ? this.searchDataForm.orderNo : "";
                let startTradeTime = this.searchDataForm.startTradeTime ? this.$moment(vm.searchDataForm.startTradeTime).format('YYYY-MM-DD HH:mm:ss') : "";
                let endTradeTime = this.searchDataForm.endTradeTime ? this.$moment(vm.searchDataForm.endTradeTime).format('YYYY-MM-DD HH:mm:ss') : "";
                let startBankReturnTime = this.searchDataForm.startBankReturnTime ? this.$moment(vm.searchDataForm.startBankReturnTime).format('YYYY-MM-DD HH:mm:ss') : "";
                let endBankReturnTime = this.searchDataForm.endBankReturnTime ? this.$moment(vm.searchDataForm.endBankReturnTime).format('YYYY-MM-DD HH:mm:ss') : "";
                let tradeState = this.searchDataForm.tradeState ? this.searchDataForm.tradeState : "";
                let payType = this.searchDataForm.payType ? this.searchDataForm.payType : "";
                let constchannelAccessCode = this.searchDataForm.channelAccessCode ? this.searchDataForm.channelAccessCode : "";
                const platformId = this.searchDataForm.platformId ? this.searchDataForm.platformId : "";
                window.location.href = API_BASE
                    + "/admin/epay/tradeInfo/exportTradeInfoList?"
                    + "merchantCode=" + merchantCode
                    + "&merchantOrderNo=" + merchantOrderNo
                    + "&orderNo=" + orderNo
                    + "&startTradeTime=" + startTradeTime
                    + "&endTradeTime=" + endTradeTime
                    + "&startBankReturnTime=" + startBankReturnTime
                    + "&endBankReturnTime=" + endBankReturnTime
                    + "&tradeState=" + tradeState
                    + "&payType=" + payType
                    + "&constchannelAccessCode=" + constchannelAccessCode
                    + "&platformId=" + platformId;
            },
            tradeTimeForMatter(row, column) {
                let tradeTime = row.tradeTime;
                if (tradeTime)
                    return this.$moment(tradeTime).format('YYYY-MM-DD HH:mm:ss');
            },
            handleDetail(row) {
                this.$router.push({name: 'trade-detail', params: {id: row.id}});
            },
            // 分页导航
            handleCurrentChange(val) {
                this.cur_page = val;
                this.paginationShow = false;
                this.getData();
            },
            getData() {
                let vm = this;
                this.$httpGet('/admin/epay/tradeInfo/index', {
                    pageNo: this.cur_page,
                    pageSize: 10,
                    merchantCode: this.searchDataForm.merchantCode,
                    merchantOrderNo: this.searchDataForm.merchantOrderNo,
                    orderNo: this.searchDataForm.orderNo,
                    startTradeTime: this.searchDataForm.startTradeTime ? this.$moment(vm.searchDataForm.startTradeTime).format('YYYY-MM-DD HH:mm:ss') : '',
                    endTradeTime: this.searchDataForm.endTradeTime ? this.$moment(vm.searchDataForm.endTradeTime).format('YYYY-MM-DD HH:mm:ss') : '',
                    startBankReturnTime: this.searchDataForm.startBankReturnTime ? this.$moment(vm.searchDataForm.startBankReturnTime).format('YYYY-MM-DD HH:mm:ss') : '',
                    endBankReturnTime: this.searchDataForm.endBankReturnTime ? this.$moment(vm.searchDataForm.endBankReturnTime).format('YYYY-MM-DD HH:mm:ss') : '',
                    tradeState: this.searchDataForm.tradeState,
                    payType: this.searchDataForm.payType,
                    channelAccessCode: this.searchDataForm.channelAccessCode,
                    platformId: this.searchDataForm.platformId
                }).then(({data}) => {
                    vm.getDataList = data.list;
                    vm.total = data.total;
                    vm.paginationShow = true;
                }).catch((data) => {
                    console.log(data)
                })
            },
            // 同步
            getListData() {
                let vm = this;
                return this.$httpGet('/admin/epay/tradeInfo/index', {
                    pageNo: this.cur_page,
                    pageSize: 10,
                    merchantCode: this.searchDataForm.merchantCode,
                    merchantOrderNo: this.searchDataForm.merchantOrderNo,
                    orderNo: this.searchDataForm.orderNo,
                    startTradeTime: this.searchDataForm.startTradeTime ? this.$moment(vm.searchDataForm.startTradeTime).format('YYYY-MM-DD HH:mm:ss') : '',
                    endTradeTime: this.searchDataForm.endTradeTime ? this.$moment(vm.searchDataForm.endTradeTime).format('YYYY-MM-DD HH:mm:ss') : '',
                    startBankReturnTime: this.searchDataForm.startBankReturnTime ? this.$moment(vm.searchDataForm.startBankReturnTime).format('YYYY-MM-DD HH:mm:ss') : '',
                    endBankReturnTime: this.searchDataForm.endBankReturnTime ? this.$moment(vm.searchDataForm.endBankReturnTime).format('YYYY-MM-DD HH:mm:ss') : '',
                    tradeState: this.searchDataForm.tradeState,
                    payType: this.searchDataForm.payType,
                    channelAccessCode: this.searchDataForm.channelAccessCode,
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
                let vm = this;
                await Promise.all([vm.getChannelInfoList(), vm.getPlatFormList(), vm.getListData()])
                    .then((data) => {
                        vm.channelNameList = data[0].data;
                        vm.platformIdList = data[1].data;
                        vm.getDataList = data[2].data.list;
                        vm.total = data[2].data.total;
                    }).catch((data) => {
                        console.log(data);
                    })
            }
        },
        created() {
            this.getAllData();
        }
    }

</script>

<style scoped>

</style>
