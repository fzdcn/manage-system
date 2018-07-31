<template>
    <div class="table">
        <div class="container">
            <div class="handle-box clearfix" style="margin-bottom: 20px;">
                <div style="margin: 0px 20px 10px 0;float: left;">
                    <span>姓名：</span>
                    <el-input style="width: 150px;" class="username" v-model.trim="searchDataForm.customerName" clearable placeholder="姓名">
                    </el-input>
                </div>
                <div style="margin: 0px 20px 10px 0;float: left;">
                    <span>证件号：</span>
                    <el-input style="width: 150px;" class="username" v-model.trim="searchDataForm.idNo" clearable placeholder="证件号">
                    </el-input>
                </div>
                <div style="margin: 0px 20px 10px 0;float: left;">
                    <span>卡号：</span>
                    <el-input style="width: 150px;" class="username" v-model.trim="searchDataForm.cardNo" clearable placeholder="卡号">
                    </el-input>
                </div>
                <div style="margin: 0px 20px 10px 0;float: left;">
                    <span>手机号：</span>
                    <el-input style="width: 150px;" class="username" v-model.trim="searchDataForm.phoneNo" clearable placeholder="手机号">
                    </el-input>
                </div>
                <div style="margin: 0px 20px 10px 0;float: left;">
                    <span>签约渠道：</span>
                    <el-input style="width: 150px;" class="username" v-model.trim="searchDataForm.signChannel" clearable placeholder="签约渠道">
                    </el-input>
                </div>
                <div style="margin: 0px 20px 10px 0;float: left;">
                    <span>签约状态：</span>
                    <el-select clearable style="width: 150px;" v-model="searchDataForm.signStatus" placeholder="签约状态">
                        <el-option v-for="item in status" :key="item.id" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <div style="margin: 0px 20px 10px 0;float: left;">
                    <span>请求流水号：</span>
                    <el-input style="width: 150px;" class="username" v-model.trim="searchDataForm.reqOrderNo" clearable placeholder="请求流水号">
                    </el-input>
                </div>
                <div style="margin: 0px 20px 10px 0;float: left;">
                    <span>签约开始时间：</span>
                    <el-date-picker type="datetime" style="width: 185px;" class="username" v-model.trim="searchDataForm.startTime" clearable placeholder="签约开始时间">
                    </el-date-picker>
                </div>
                <div style="margin: 0px 20px 10px 0;float: left;">
                    <span>签约结束时间：</span>
                    <el-date-picker type="datetime" style="width: 185px;" class="username" v-model.trim="searchDataForm.endTime" clearable placeholder="签约结束时间">
                    </el-date-picker>
                </div>
                <div style="float: left;">
                    <el-button type="primary" icon="el-icon-search" @click="handleCurrentChange(1)">搜索</el-button>
                </div>
            </div>
            <el-table :data="getDataList" border style="width: 100%;">
                <el-table-column show-overflow-tooltip prop="customerName" label="姓名">
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="idNo" label="证件号">
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="idType" label="证件类型">
                    <template slot-scope="scope">
                        <span v-if="scope.row.idType == item.id" v-for="item in idType">{{ item.name }}</span>
                    </template>
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="cardNo" label="卡号">
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="cardType" label="卡类型">
                    <template slot-scope="scope">
                        <span v-if="scope.row.cardType == item.id" v-for="item in cardType">{{ item.name }}</span>
                    </template>
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="bankCode" label="银行代码">
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="phoneNo" label="手机号">
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="happenTime" label="签约时间" :formatter="happenTimeForMatter">
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="status" label="签约状态">
                    <template slot-scope="scope">
                        <span v-if="scope.row.status == item.id" v-for="item in status">{{ item.name }}</span>
                    </template>
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="signChannel" label="签约渠道">
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="businessType" label="业务类型">
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
                <el-form ref="detailDataForm" :model="detailDataForm" label-width="100px" size="mini">
                    <el-form-item label="姓名：">
                        <el-input :disabled="true" v-model.trim="detailDataForm.customerName" placeholder="姓名">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="证件号：">
                        <el-input :disabled="true" v-model.trim="detailDataForm.idNo" placeholder="证件号"></el-input>
                    </el-form-item>
                    <el-form-item label="证件类型：">
                        <el-input :disabled="true" v-model.trim="detailDataForm.idType" placeholder="证件类型"></el-input>
                    </el-form-item>
                    <el-form-item label="卡号：">
                        <el-input :disabled="true" v-model.trim="detailDataForm.cardNo" placeholder="卡号"></el-input>
                    </el-form-item>
                    <el-form-item label="卡类型：">
                        <el-input :disabled="true" v-model.trim="detailDataForm.cardType" placeholder="卡类型"></el-input>
                    </el-form-item>
                    <el-form-item label="银行代码：">
                        <el-input :disabled="true" v-model.trim="detailDataForm.bankCode" placeholder="银行代码"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号：">
                        <el-input :disabled="true" v-model.trim="detailDataForm.phoneNo" placeholder="手机号"></el-input>
                    </el-form-item>
                    <el-form-item label="签约时间：">
                        <el-input :disabled="true" v-model.trim="detailDataForm.happenTime" placeholder="签约时间"></el-input>
                    </el-form-item>
                    <el-form-item label="签约状态：">
                        <el-input :disabled="true" v-model.trim="detailDataForm.status" placeholder="签约状态"></el-input>
                    </el-form-item>
                    <el-form-item label="签约渠道：">
                        <el-input :disabled="true" v-model.trim="detailDataForm.signChannel" placeholder="签约渠道"></el-input>
                    </el-form-item>
                    <el-form-item label="业务类型：">
                        <el-input :disabled="true" v-model.trim="detailDataForm.businessType" placeholder="业务类型"></el-input>
                    </el-form-item>
                    <el-form-item label="签约号：">
                        <el-input :disabled="true" v-model.trim="detailDataForm.signContractNo" placeholder="签约号"></el-input>
                    </el-form-item>
                    <el-form-item label="请求流水号：">
                        <el-input :disabled="true" v-model.trim="detailDataForm.reqOrderNo" placeholder="请求流水号"></el-input>
                    </el-form-item>
                    <el-form-item label="认证订单号：">
                        <el-input :disabled="true" v-model.trim="detailDataForm.authOrderNo" placeholder="认证订单号"></el-input>
                    </el-form-item>
                    <el-form-item label="签约订单号：">
                        <el-input :disabled="true" v-model.trim="detailDataForm.signOrderNo" placeholder="签约订单号"></el-input>
                    </el-form-item>
                    <el-form-item label="短信关联码：">
                        <el-input :disabled="true" v-model.trim="detailDataForm.smsKey" placeholder="短信关联码"></el-input>
                    </el-form-item>
                    <el-form-item label="系统备注：">
                        <el-input :disabled="true" type="textarea" v-model.trim="detailDataForm.sysRemark" placeholder="系统备注"></el-input>
                    </el-form-item>
                    <el-form-item label="备注：">
                        <el-input :disabled="true" type="textarea" v-model.trim="detailDataForm.remark" placeholder="备注"></el-input>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { timestampToDate } from '../../functions/index'
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
            // 签约状态
            status: [
                {
                    id: '0',
                    name: '失败'
                },
                {
                    id: '1',
                    name: '已认证'
                },
                {
                    id: '2',
                    name: '已签约'
                },
                {
                    id: '3',
                    name: '已解约'
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
        // 分页导航
        handleCurrentChange(val) {
            this.cur_page = val
            this.paginationShow = false
            this.getData()
        },
        handleDetail(row) {
            this.isShowDetail = true
            this.detailDataForm.customerName = row.customerName
            this.detailDataForm.idNo = row.idNo
            this.detailDataForm.idType = this.getIdType(row.idType)
            this.detailDataForm.cardNo = row.cardNo
            this.detailDataForm.cardType = this.getCardType(row.cardType)
            this.detailDataForm.bankCode = row.bankCode
            this.detailDataForm.phoneNo = row.phoneNo
            this.detailDataForm.happenTime = timestampToDate(row.happenTime)
            this.detailDataForm.status = this.getStatus(row.status)
            this.detailDataForm.signChannel = row.signChannel
            this.detailDataForm.businessType = row.businessType
            this.detailDataForm.signContractNo = row.signContractNo
            this.detailDataForm.reqOrderNo = row.reqOrderNo
            this.detailDataForm.authOrderNo = row.authOrderNo
            this.detailDataForm.signOrderNo = row.signOrderNo
            this.detailDataForm.smsKey = row.smsKey
            this.detailDataForm.sysRemark = row.sysRemark
            this.detailDataForm.remark = row.remark
        },
        cancelDetail() {
            this.isShowDetail = false
        },
        getIdType(params) {
            switch (params) {
                case '01':
                    return '身份证'
                    break
                default:
                    return '暂无'
                    break
            }
        },
        getCardType(params) {
            switch (params) {
                case '00':
                    return '借记卡'
                    break
                case '01':
                    return '贷记卡'
                    break
                default:
                    return '暂无'
                    break
            }
        },
        getStatus(params) {
            switch (params) {
                case '0':
                    return '失败'
                    break
                case '1':
                    return '已认证'
                    break
                case '2':
                    return '已签约'
                    break
                case '3':
                    return '已解约'
                    break
                default:
                    return '暂无'
                    break
            }
        },
        getData() {
            let vm = this
            this.$httpGet('/admin/realName/signInfoList', {
                pageNo: this.cur_page,
                pageSize: 10,
                customerName: this.searchDataForm.customerName,
                idNo: this.searchDataForm.idNo,
                cardNo: this.searchDataForm.cardNo,
                phoneNo: this.searchDataForm.phoneNo,
                signChannel: this.searchDataForm.signChannel,
                signStatus: this.searchDataForm.signStatus,
                reqOrderNo: this.searchDataForm.reqOrderNo,
                startTime: this.searchDataForm.startTime
                    ? this.$moment(vm.searchDataForm.startTime).format(
                          'YYYY-MM-DD HH:mm:ss'
                      )
                    : '',
                endTime: this.searchDataForm.endTime
                    ? this.$moment(vm.searchDataForm.endTime).format(
                          'YYYY-MM-DD HH:mm:ss'
                      )
                    : ''
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
        }
    },
    created() {
        this.getData()
    }
}
</script>

<style scoped>
</style>
