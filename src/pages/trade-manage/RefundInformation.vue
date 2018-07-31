<template>
    <div class="table">
        <div class="container">
            <div class="add" style="margin-bottom: 30px;">
                <el-button type="primary" size="medium" icon="el-icon-plus" @click="add">增加退款申请</el-button>
            </div>
            <div class="handle-box clearfix" style="margin-bottom: 20px;">
                <div style="margin: 0px 20px 10px 0;float:left;">
                    <span>平台id：</span>
                    <el-select clearable style="width: 150px;" v-model="searchDataForm.platformId" placeholder="平台id">
                        <el-option v-for="item in platformIdList" :key="item.id" :label="item.platformName" :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <div style="margin: 0px 20px 10px 0;float:left;">
                    <span>商户号：</span>
                    <el-input style="width: 150px;" class="username" v-model.trim="searchDataForm.merchantCode" clearable placeholder="商户号">
                    </el-input>
                </div>
                <div style="margin: 0px 20px 10px 0;float:left;">
                    <span>商户订单号：</span>
                    <el-input style="width: 150px;" class="username" v-model.trim="searchDataForm.merchantOrderNo" clearable placeholder="商户订单号">
                    </el-input>
                </div>
                <div style="margin: 0px 20px 10px 0;float:left;">
                    <span>退款订单号：</span>
                    <el-input style="width: 150px;" class="username" v-model.trim="searchDataForm.refundNo" clearable placeholder="退款订单号">
                    </el-input>
                </div>
                <div style="margin: 0px 20px 10px 0;float:left;">
                    <span>系统订单号：</span>
                    <el-input style="width: 150px;" class="username" v-model.trim="searchDataForm.sysOrderNo" clearable placeholder="系统订单号">
                    </el-input>
                </div>
                <div style="margin: 0px 20px 10px 0;float:left;">
                    <span>退款状态：</span>
                    <el-select clearable style="width: 150px;" v-model="searchDataForm.refundState" placeholder="退款状态">
                        <el-option v-for="item in refundState" :key="item.id" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <div style="margin: 0px 20px 10px 0;float:left;">
                    <span>申请时间开始：</span>
                    <el-date-picker type="datetime" style="width: 185px;" class="username" v-model.trim="searchDataForm.applyStartTime" clearable placeholder="申请时间开始">
                    </el-date-picker>
                </div>
                <div style="margin: 0px 20px 10px 0;float:left;">
                    <span>申请时间结束：</span>
                    <el-date-picker type="datetime" style="width: 185px;" class="username" v-model.trim="searchDataForm.applyEndTime" clearable placeholder="申请时间结束">
                    </el-date-picker>
                </div>
                <div style="margin: 0px 20px 10px 0;float:left;">
                    <span>退款时间开始：</span>
                    <el-date-picker type="datetime" style="width: 185px;" class="username" v-model.trim="searchDataForm.refundStartTime" clearable placeholder="退款时间开始">
                    </el-date-picker>
                </div>
                <div style="margin: 0px 20px 10px 0;float:left;">
                    <span>退款时间结束：</span>
                    <el-date-picker type="datetime" style="width: 185px;" class="username" v-model.trim="searchDataForm.refundEndTime" clearable placeholder="退款时间结束">
                    </el-date-picker>
                </div>
                <div style="float:left;">
                    <el-button type="primary" icon="el-icon-search" @click="handleCurrentChange(1)">搜索</el-button>
                </div>
                <div style="margin-left: 20px;float: left;">
                    <el-button type="primary" icon="el-icon-download" @click="downLoad">下载</el-button>
                </div>
            </div>
            <el-table :data="getDataList" border style="width: 100%;">
                <el-table-column show-overflow-tooltip prop="platformId" label="平台名称">
                    <template slot-scope="scope">
                        <span v-if="scope.row.platformId == item.id" v-for="item in platformIdList">{{ item.platformName }}</span>
                    </template>
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="merchantCode" label="商户号">
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="merchantOrderNo" label="商户订单号">
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="refundNo" label="商户退款订单号">
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="orderNo" label="系统订单号">
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="refundState" label="退款状态">
                    <template slot-scope="scope">
                        <span v-if="scope.row.refundState == item.id" v-for="item in refundState">{{ item.name }}</span>
                    </template>
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="refundAmount" label="退款金额(元)">
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="applyTime" label="申请时间" :formatter="applyTimeForMatter">
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="refundTime" label="退款时间" :formatter="refundTimeForMatter">
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
        <!--增加-->
        <el-dialog title="增加退款申请" :visible.sync="isShowAdd" :before-close="cancelAdd" width="720px" center>
            <div class="form-content" style="margin: 0 auto;width: 90%;">
                <div class="handle-box clearfix">
                    <div style="margin: 0px 20px 10px 0;float:left;">
                        <span>系统订单号：</span>
                        <el-input style="width: 157px;" class="username" v-model.trim="searchDialogDataForm.orderNo" clearable placeholder="系统订单号">
                        </el-input>
                    </div>
                    <div style="margin: 0px 20px 10px 0;float:left;">
                        <span>商户订单号：</span>
                        <el-input style="width: 157px;" class="username" v-model.trim="searchDialogDataForm.merchantOrderNo" clearable placeholder="商户订单号">
                        </el-input>
                    </div>
                    <div style="float:left;">
                        <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
                    </div>
                </div>
                <div style="padding:15px 0;border-bottom:1px solid #409EFF;margin-bottom:20px;width: 56px;">订单信息</div>
                <el-form v-if="addDataForm.id" ref="addDataForm" :model="addDataForm" label-width="130px">
                    <el-form-item label="支付流水号：">
                        <el-input :disabled="true" clearable v-model.trim="addDataForm.orderNo" placeholder="支付流水号"></el-input>
                    </el-form-item>
                    <el-form-item label="商户订单号：">
                        <el-input :disabled="true" clearable v-model.trim="addDataForm.merchantOrderNo" placeholder="商户订单号"></el-input>
                    </el-form-item>
                    <el-form-item label="支付状态：">
                        <el-input :disabled="true" v-model.trim="addDataForm.tradeState" placeholder="付款日期"></el-input>
                    </el-form-item>
                    <el-form-item label="付款日期：">
                        <el-input :disabled="true" v-model.trim="addDataForm.tradeTime" placeholder="付款日期"></el-input>
                    </el-form-item>
                    <el-form-item label="交易金额(元)：">
                        <el-input :disabled="true" v-model.trim="addDataForm.tradeAmount" placeholder="交易金额"></el-input>
                    </el-form-item>
                    <el-form-item label="退款状态：">
                        <el-input :disabled="true" v-model.trim="addDataForm.refundState" placeholder="退款状态"></el-input>
                    </el-form-item>
                    <el-form-item :rules="[{ required: true}]" label="未退款金额(元)：">
                        <el-input v-model.trim="addDataForm.refundAmount" placeholder="未退款金额"></el-input>
                    </el-form-item>
                    <el-form-item label="备注：">
                        <el-input type="textarea" v-model.trim="addDataForm.refundRemark" placeholder="备注"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <span v-if="addDataForm.id" slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitAdd">确 定</el-button>
                <el-button @click="cancelAdd">取 消</el-button>
            </span>
        </el-dialog>
        <!--查看详情-->
        <el-dialog title="查看详情" :visible.sync="isShowDetail" :before-close="cancelDetail" width="700px" center>
            <div class="form-content" style="margin: 0 auto;width: 90%;">
                <el-form ref="detailDataForm" :model="detailDataForm" label-width="130px" size="mini">
                    <el-form-item label="平台名称：">
                        <el-input :disabled="true" v-model.trim="detailDataForm.platformId" placeholder="平台名称">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="商户号：">
                        <el-input :disabled="true" v-model.trim="detailDataForm.merchantCode" placeholder="商户号"></el-input>
                    </el-form-item>
                    <el-form-item label="原商户订单号：">
                        <el-input :disabled="true" v-model.trim="detailDataForm.merchantOrderNo" placeholder="原商户订单号"></el-input>
                    </el-form-item>
                    <el-form-item label="商户退款订单号：">
                        <el-input :disabled="true" v-model.trim="detailDataForm.refundNo" placeholder="商户退款订单号"></el-input>
                    </el-form-item>
                    <el-form-item label="原系统订单号：">
                        <el-input :disabled="true" v-model.trim="detailDataForm.orderNo" placeholder="原系统订单号"></el-input>
                    </el-form-item>
                    <el-form-item label="退款状态：">
                        <el-input :disabled="true" v-model.trim="detailDataForm.refundState" placeholder="退款状态"></el-input>
                    </el-form-item>
                    <el-form-item label="退款金额(元)：">
                        <el-input :disabled="true" v-model.trim="detailDataForm.refundAmount" placeholder="退款金额"></el-input>
                    </el-form-item>
                    <el-form-item label="结算状态：">
                        <el-input :disabled="true" v-model.trim="detailDataForm.settleState" placeholder="结算状态"></el-input>
                    </el-form-item>
                    <el-form-item label="申请时间：">
                        <el-input :disabled="true" v-model.trim="detailDataForm.applyTime" placeholder="申请时间"></el-input>
                    </el-form-item>
                    <el-form-item label="退款时间：">
                        <el-input :disabled="true" v-model.trim="detailDataForm.refundTime" placeholder="退款时间"></el-input>
                    </el-form-item>
                    <el-form-item label="批次号：">
                        <el-input :disabled="true" v-model.trim="detailDataForm.batchNo" placeholder="批次号"></el-input>
                    </el-form-item>
                    <el-form-item label="审核时间：">
                        <el-input :disabled="true" v-model.trim="detailDataForm.auditingTime" placeholder="审核时间"></el-input>
                    </el-form-item>
                    <el-form-item label="审核人：">
                        <el-input :disabled="true" v-model.trim="detailDataForm.auditingMan" placeholder="审核人"></el-input>
                    </el-form-item>
                    <el-form-item label="原因：">
                        <el-input :disabled="true" v-model.trim="detailDataForm.refundReason" placeholder="原因"></el-input>
                    </el-form-item>
                    <el-form-item label="备注：">
                        <el-input type="textarea" :disabled="true" v-model.trim="detailDataForm.remark" placeholder="备注"></el-input>
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
            // 是否显示增加弹框
            isShowAdd: false,
            isShowDetail: false,
            addDataForm: {},
            // 增加表单弹框里面的搜索
            searchDialogDataForm: {},
            // 查看详情
            detailDataForm: {},
            // 平台名称
            platformIdList: [],
            // 退款状态
            refundState: [
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
                }
            ],
            // 证件类型
            idType: [
                {
                    id: '01',
                    name: '身份证'
                }
            ],
            // 卡类型
            cardType: [
                {
                    id: '00',
                    name: '借记卡'
                },
                {
                    id: '01',
                    name: '贷记卡'
                }
            ]
        }
    },
    methods: {
        downLoad() {
            let vm = this
            let platformId = this.searchDataForm.platformId
                ? this.searchDataForm.platformId
                : ''
            let merchantCode = this.searchDataForm.merchantCode
                ? this.searchDataForm.merchantCode
                : ''
            let merchantOrderNo = this.searchDataForm.merchantOrderNo
                ? this.searchDataForm.merchantOrderNo
                : ''
            let applyStartTime = timestampToDate(
                this.searchDataForm.applyStartTime
            )
            let applyEndTime = timestampToDate(this.searchDataForm.applyEndTime)
            let refundStartTime = timestampToDate(
                this.searchDataForm.refundStartTime
            )
            let refundEndTime = timestampToDate(
                this.searchDataForm.refundEndTime
            )
            let refundNo = this.searchDataForm.refundNo
                ? this.searchDataForm.refundNo
                : ''
            let sysOrderNo = this.searchDataForm.sysOrderNo
                ? this.searchDataForm.sysOrderNo
                : ''
            let refundState = this.searchDataForm.refundState
                ? this.searchDataForm.crefundStatehannelId
                : ''
            if (!applyStartTime) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '申请时间开始不能为空！'
                })
                return false
            }
            window.location.href =
                API_BASE +
                '/admin/refund/exportRefundInfo?' +
                'platformId=' +
                platformId +
                '&merchantCode=' +
                merchantCode +
                '&merchantOrderNo=' +
                merchantOrderNo +
                '&applyStartTime=' +
                applyStartTime +
                '&applyEndTime=' +
                applyEndTime +
                '&refundStartTime=' +
                refundStartTime +
                '&refundEndTime=' +
                refundEndTime +
                '&refundNo=' +
                refundNo +
                '&sysOrderNo=' +
                sysOrderNo +
                '&refundState=' +
                refundState
        },
        // 分页导航
        handleCurrentChange(val) {
            this.cur_page = val
            this.paginationShow = false
            this.getData()
        },
        // 支付状态 0 失败 1 成功 2 待处理 3 取消 4 待确认 5 未返回 8 异常
        getTradeState(params) {
            switch (params) {
                case 0:
                    return '失败'
                    break
                case 1:
                    return '成功'
                    break
                case 2:
                    return '待处理'
                    break
                case 3:
                    return '取消'
                    break
                case 4:
                    return '待确认'
                    break
                case 5:
                    return '未返回'
                    break
                case 8:
                    return '异常'
                    break
                default:
                    return '暂无'
                    break
            }
        },
        // 退款状态 (1：未退款，2：部分退款，3：已全额退款)
        getRefundState(params) {
            switch (params) {
                case '1':
                    return '未退款'
                    break
                case '2':
                    return '部分退款'
                    break
                case '3':
                    return '已全额退款'
                    break
                default:
                    return '暂无'
                    break
            }
        },
        search() {
            let vm = this
            this.addDataForm = {}
            if (
                !this.searchDialogDataForm.orderNo &&
                !this.searchDialogDataForm.merchantOrderNo
            ) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '两个不能同时为空！'
                })
                return false
            }
            this.$httpGet('/admin/refund/findRefundTradeInfo', {
                orderNo: this.searchDialogDataForm.orderNo,
                merchantOrderNo: this.searchDialogDataForm.merchantOrderNo
            })
                .then(({ data }) => {
                    data.tradeTime = timestampToDate(data.tradeTime)
                    data.tradeState = this.getTradeState(data.tradeState)
                    data.refundState = this.getRefundState(data.refundState)
                    this.addDataForm = data
                })
                .catch(data => {
                    console.log(data)
                })
        },
        add() {
            this.isShowAdd = true
        },
        cancelAdd() {
            this.isShowAdd = false
            this.searchDialogDataForm = {}
            this.addDataForm = {}
        },
        submitAdd() {
            let vm = this
            if (!this.addDataForm.refundAmount) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '退款金额不能为空！'
                })
                return false
            }
            this.$httpGet('/admin/refund/saveRefundInfo', {
                tradeId: this.addDataForm.id,
                refundAmount: this.addDataForm.refundAmount,
                refundRemark: this.addDataForm.refundRemark
            })
                .then(data => {
                    vm.$notify.success({
                        duration: 2000,
                        title: '成功',
                        message: data.message
                    })
                    vm.cancelAdd()
                    vm.handleCurrentChange(1)
                })
                .catch(data => {
                    console.log(data)
                })
        },
        handleDetail(row) {
            this.isShowDetail = true
            this.detailDataForm.platformId = this.getPlatFormName(
                row.platformId
            )
            this.detailDataForm.merchantCode = row.merchantCode
            this.detailDataForm.merchantOrderNo = row.merchantOrderNo
            this.detailDataForm.refundNo = row.refundNo
            this.detailDataForm.orderNo = row.orderNo
            this.detailDataForm.refundState = this.getStatus(row.refundState)
            this.detailDataForm.refundAmount = row.refundAmount
            this.detailDataForm.settleState = row.settleState
            this.detailDataForm.applyTime = timestampToDate(row.applyTime)
            this.detailDataForm.refundTime = timestampToDate(row.refundTime)
            this.detailDataForm.batchNo = row.batchNo
            this.detailDataForm.auditingTime = timestampToDate(row.auditingTime)
            this.detailDataForm.auditingMan = row.auditingMan
            this.detailDataForm.refundReason = row.refundReason
            this.detailDataForm.remark = row.remark
        },
        cancelDetail() {
            this.isShowDetail = false
        },
        getStatus(params) {
            switch (params) {
                case '0':
                    return '失败'
                    break
                case '1':
                    return '成功'
                    break
                case '2':
                    return '待处理'
                    break
                case '3':
                    return '取消'
                    break
                default:
                    return '暂无'
                    break
            }
        },
        applyTimeForMatter(row, column) {
            return timestampToDate(row.applyTime)
        },
        refundTimeForMatter(row, column) {
            return timestampToDate(row.refundTime)
        },
        // 同步
        getListData() {
            let vm = this
            return this.$httpGet('/admin/refund/refundInfoList', {
                pageNo: this.cur_page,
                pageSize: 10,
                platformId: this.searchDataForm.platformId,
                merchantCode: this.searchDataForm.merchantCode,
                merchantOrderNo: this.searchDataForm.merchantOrderNo,
                refundNo: this.searchDataForm.refundNo,
                sysOrderNo: this.searchDataForm.sysOrderNo,
                refundState: this.searchDataForm.refundState,
                applyStartTime: timestampToDate(
                    this.searchDataForm.applyStartTime
                ),
                applyEndTime: timestampToDate(this.searchDataForm.applyEndTime),
                refundStartTime: timestampToDate(
                    this.searchDataForm.refundStartTime
                ),
                refundEndTime: timestampToDate(
                    this.searchDataForm.refundEndTime
                )
            })
        },
        getData() {
            let vm = this
            this.$httpGet('/admin/refund/refundInfoList', {
                pageNo: this.cur_page,
                pageSize: 10,
                platformId: this.searchDataForm.platformId,
                merchantCode: this.searchDataForm.merchantCode,
                merchantOrderNo: this.searchDataForm.merchantOrderNo,
                refundNo: this.searchDataForm.refundNo,
                sysOrderNo: this.searchDataForm.sysOrderNo,
                refundState: this.searchDataForm.refundState,
                applyStartTime: timestampToDate(
                    this.searchDataForm.applyStartTime
                ),
                applyEndTime: timestampToDate(this.searchDataForm.applyEndTime),
                refundStartTime: timestampToDate(
                    this.searchDataForm.refundStartTime
                ),
                refundEndTime: timestampToDate(
                    this.searchDataForm.refundEndTime
                )
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
        happenTimeForMatter(row, column) {
            return timestampToDate(row.happenTime)
        },
        // 获取平台名称
        getPlatFormName(params) {
            let platformIdObject = []
            platformIdObject = this.platformIdList.filter(item => {
                return item.id == params
            })
            return platformIdObject[0].platformName
        },
        // 获取平台名称列表
        getPlatFormList() {
            return this.$httpGet('/admin/platformInfo/option', {})
        },
        async getAllData() {
            let vm = this
            await Promise.all([vm.getPlatFormList(), vm.getListData()])
                .then(data => {
                    vm.platformIdList = data[0].data
                    vm.getDataList = data[1].data.list
                    vm.total = data[1].data.total
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
