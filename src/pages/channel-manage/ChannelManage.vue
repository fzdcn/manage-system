<template>
    <div class="table">
        <div class="container">
            <div class="add" style="margin-bottom: 30px;">
                <el-button type="primary" size="medium" icon="el-icon-plus" @click="add">增加</el-button>
            </div>
            <div class="handle-box clearfix" style="margin-bottom: 20px;">
                <div style="margin: 0px 20px 10px 0;float: left;">
                    <span>通道名称：</span>
                    <el-input style="width: 150px;" class="username" v-model.trim="searchDataForm.channelName" clearable placeholder="请填写通道名称">
                    </el-input>
                </div>
                <div style="margin: 0px 20px 10px 0;float: left;">
                    <span>通道接入码：</span>
                    <el-input style="width: 150px;" class="username" v-model.trim="searchDataForm.channelAccessCode" clearable placeholder="请填写通道接入码">
                    </el-input>
                </div>
                <div style="float: left;">
                    <el-button type="primary" icon="el-icon-search" @click="handleCurrentChange(1)">
                        搜索
                    </el-button>
                </div>
            </div>
            <el-table v-loading="loading" :data="getDataList" border style="width: 100%;">
                <el-table-column show-overflow-tooltip prop="channelName" label="通道名称">
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="channelAccessCode" label="通道接入码">
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="bankUrl" label="通道接入请求地址">
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="unionMerNo" label="商户号">
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="acqInsCode" label="机构号">
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="channelState" label="使用状态">
                    <template slot-scope="scope">
                        <span v-if="scope.row.channelState == item.id" v-for="item in channelStateList">{{ item.name }}</span>
                    </template>
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="executeTime" label="操作时间" :formatter="dateFormatter">
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="operator" label="操作人">
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="localFee" label="银行收取费率" :formatter="localFee">
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="computeMode" label="收费方式">
                    <template slot-scope="scope">
                        <span v-if="scope.row.computeMode == item.id" v-for="item in computeModeList">{{ item.name }}</span>
                    </template>
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="refundType" label="退款类型">
                    <template slot-scope="scope">
                        <span v-if="scope.row.refundType == item.id" v-for="item in refundType">{{ item.name }}</span>
                    </template>
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="remark" label="备注">
                </el-table-column>
                <el-table-column label="操作" width="200px" align="center">
                    <template v-if="getDataList.length > 0" slot-scope="scope">
                        <el-button @click="handleEdit(scope.row)" type="primary" icon="el-icon-edit" size="small">编辑
                        </el-button>
                        <el-button @click="handleDelete(scope.row)" type="danger" icon="el-icon-delete" size="small">
                            删除
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
        <el-dialog title="增加通道信息" :visible.sync="isShowAdd" :before-close="cancelAdd" width="720px" center>
            <div class="form-content" style="margin: 0 auto;width: 90%;">
                <el-form ref="addDataForm" :model="addDataForm" label-width="150px">
                    <el-form-item :rules="[{ required: true}]" label="通道名称：">
                        <el-input clearable v-model.trim="addDataForm.channelName" placeholder="通道名称"></el-input>
                    </el-form-item>
                    <el-form-item :rules="[{ required: true}]" label="通道接入码：">
                        <el-input clearable v-model.trim="addDataForm.channelAccessCode" placeholder="通道接入码"></el-input>
                    </el-form-item>
                    <el-form-item :rules="[{ required: true}]" label="通道接入请求地址：">
                        <el-input clearable v-model.trim="addDataForm.bankUrl" placeholder="通道接入请求地址"></el-input>
                    </el-form-item>
                    <el-form-item :rules="[{ required: true}]" label="商户号：">
                        <el-input type="number" v-model.trim="addDataForm.unionMerNo" maxlength="20" placeholder="20位以内的数字"></el-input>
                    </el-form-item>
                    <el-form-item :rules="[{ required: true}]" label="机构号：">
                        <el-input type="number" v-model.trim="addDataForm.acqInsCode" maxlength="10" placeholder="10位以内的数字"></el-input>
                    </el-form-item>
                    <el-form-item :rules="[{ required: true}]" label="银行收取费率：">
                        <el-input v-model.number="addDataForm.localFee" type="number" placeholder="不能为负数,整数最多10位，小数最多5位,>=1时，收费方式只能是定额"></el-input>
                    </el-form-item>
                    <el-form-item :rules="[{ required: true}]" label="使用状态：">
                        <el-select clearable v-model="addDataForm.channelState" style="width: 453px;" placeholder="使用状态">
                            <el-option v-for="item in channelStateList" :key="item.id" :label="item.name" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item :rules="[{ required: true}]" label="收费方式：">
                        <el-select clearable v-model="addDataForm.computeMode" style="width: 453px;" placeholder="收费方式">
                            <el-option v-if="addDataForm.localFee >= 1" v-for="item in otherComputeModeList" :key="item.id" :label="item.name" :value="item.id">
                            </el-option>
                            <el-option v-else v-for="item in computeModeList" :key="item.id" :label="item.name" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item :rules="[{ required: true}]" label="银行列表：">
                        <el-select clearable filterable multiple collapse-tags v-model="addDataForm.bids" style="width: 453px;" placeholder="银行列表">
                            <el-option v-for="item in bankList" :key="item.id" :label="item.bankName" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item :rules="[{ required: true}]" label="退款类型：">
                        <el-select clearable v-model="addDataForm.refundType" style="width: 453px;" placeholder="退款类型">
                            <el-option v-for="item in refundType" :key="item.id" :label="item.name" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="备注：">
                        <el-input maxlength="255" type="textarea" v-model.trim="addDataForm.remark" placeholder="长度最多为255"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitAdd">确 定</el-button>
                <el-button @click="cancelAdd">取 消</el-button>
            </span>
        </el-dialog>

        <!--编辑-->
        <el-dialog title="编辑通道信息" :visible.sync="isShowEdit" :before-close="cancelEdit" width="720px" center>
            <div class="form-content" style="margin: 0 auto;width: 90%;">
                <el-form ref="editDataForm" :model="editDataForm" label-width="150px">
                    <el-form-item :rules="[{ required: true}]" label="通道名称：">
                        <el-input clearable v-model.trim="editDataForm.channelName" placeholder="通道名称"></el-input>
                    </el-form-item>
                    <el-form-item :rules="[{ required: true}]" label="通道接入码：">
                        <el-input clearable v-model.trim="editDataForm.channelAccessCode" placeholder="通道接入码"></el-input>
                    </el-form-item>
                    <el-form-item :rules="[{ required: true}]" label="通道接入请求地址：">
                        <el-input clearable v-model.trim="editDataForm.bankUrl" placeholder="通道接入请求地址"></el-input>
                    </el-form-item>
                    <el-form-item :rules="[{ required: true}]" label="商户号：">
                        <el-input type="number" v-model.trim="editDataForm.unionMerNo" maxlength="20" placeholder="20位以内的数字"></el-input>
                    </el-form-item>
                    <el-form-item :rules="[{ required: true}]" label="机构号：">
                        <el-input type="number" v-model.trim="editDataForm.acqInsCode" maxlength="10" placeholder="10位以内的数字"></el-input>
                    </el-form-item>
                    <el-form-item :rules="[{ required: true}]" label="银行收取费率：">
                        <el-input v-model.number="editDataForm.localFee" type="number" placeholder="不能为负数,整数最多10位，小数最多5位,>=1时，收费方式只能是定额"></el-input>
                    </el-form-item>
                    <el-form-item :rules="[{ required: true}]" label="使用状态：">
                        <el-select clearable v-model="editDataForm.channelState" style="width: 453px;" placeholder="使用状态">
                            <el-option v-for="item in channelStateList" :key="item.id" :label="item.name" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item :rules="[{ required: true}]" label="收费方式：">
                        <el-select clearable v-model="editDataForm.computeMode" style="width: 453px;" placeholder="收费方式">
                            <el-option v-if="editDataForm.localFee >= 1" v-for="item in otherComputeModeList" :key="item.id" :label="item.name" :value="item.id">
                            </el-option>
                            <el-option v-else v-for="item in computeModeList" :key="item.id" :label="item.name" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item :rules="[{ required: true}]" label="银行列表：">
                        <el-select clearable filterable multiple collapse-tags v-model="editDataForm.bids" style="width: 453px;" placeholder="银行列表">
                            <el-option v-for="item in bankList" :key="item.id" :label="item.bankName" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item :rules="[{ required: true}]" label="退款类型：">
                        <el-select clearable v-model="editDataForm.refundType" style="width: 453px;" placeholder="退款类型">
                            <el-option v-for="item in refundType" :key="item.id" :label="item.name" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="备注：">
                        <el-input maxlength="255" type="textarea" v-model.trim="editDataForm.remark" placeholder="长度最多为255"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitEdit">确 定</el-button>
                <el-button @click="cancelEdit">取 消</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { timestampToDate } from '../../functions/index.js'
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
            // 是否显示增加弹框
            isShowAdd: false,
            // 是否显示编辑弹框
            isShowEdit: false,
            searchDataForm: {},
            // 增加参数
            addDataForm: {
                bids: []
            },
            num: null,
            // 编辑参数
            editDataForm: {
                id: '',
                channelName: '',
                channelAccessCode: '',
                bankUrl: '',
                unionMerNo: '',
                acqInsCode: '',
                localFee: '',
                channelState: '',
                computeMode: '',
                bids: [],
                refundType: '',
                remark: ''
            },
            channelStateList: [
                {
                    id: 1,
                    name: '开启'
                },
                {
                    id: 2,
                    name: '关闭'
                }
            ],
            computeModeList: [
                {
                    id: 1,
                    name: '通用比例'
                },
                {
                    id: 2,
                    name: '借贷比例'
                },
                {
                    id: 3,
                    name: '定额'
                }
            ],
            otherComputeModeList: [
                {
                    id: 3,
                    name: '定额'
                }
            ],
            // 银行列表
            bankList: [],
            // 退款类型（1:联机原路退款、2:脱机原路退款、3:手工打款）
            refundType: [
                {
                    id: '1',
                    name: '联机原路退款'
                },
                {
                    id: '2',
                    name: '脱机原路退款'
                },
                {
                    id: '3',
                    name: '手工打款'
                }
            ]
        }
    },
    methods: {
        localFee(row) {
            if (row.computeMode == 3) {
                return row.localFee
            } else {
                return row.localFee * 100 + '%'
            }
        },
        dateFormatter(row) {
            return timestampToDate(row.executeTime)
        },
        // 分页导航
        handleCurrentChange(val) {
            this.cur_page = val
            this.paginationShow = false
            this.getData()
        },
        handleDelete(row) {
            let vm = this
            this.$confirm('确认删除吗?', '删除', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    vm
                        .$httpGet('/admin/epay/channelInfo/delete', {
                            id: row.id
                        })
                        .then(data => {
                            vm.$notify.success({
                                duration: 2000,
                                title: '成功',
                                message: data.message
                            })
                            vm.getData()
                        })
                        .catch(data => {
                            console.log(data)
                        })
                })
                .catch(() => {
                    vm.$notify.info({
                        duration: 2000,
                        title: '消息',
                        message: '已取消删除'
                    })
                })
        },
        // 获取银行列表
        getBankList() {
            let vm = this
            this.$httpGet('/admin/bankInfo/option', {})
                .then(({ data }) => {
                    vm.bankList = data
                })
                .catch(data => {
                    console.log(data)
                })
        },
        // 根据当前id获取银行列表
        findBankListByCid(row) {
            let vm = this
            let bids = []
            this.$httpGet('/admin/epay/channelInfo/findBankListByCid', {
                cid: row.id
            })
                .then(({ data }) => {
                    for (let values of data) {
                        bids.push(values.id)
                    }
                    vm.editDataForm.bids = [...bids]
                })
                .catch(data => {
                    console.log(data)
                })
        },
        getData() {
            let vm = this
            this.$httpGet('/admin/epay/channelInfo/index', {
                pageNo: this.cur_page,
                pageSize: 10,
                channelName: this.searchDataForm.channelName,
                channelAccessCode: this.searchDataForm.channelAccessCode
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
        add() {
            this.isShowAdd = true
        },
        cancelAdd() {
            this.isShowAdd = false
            this.addDataForm = {
                bids: []
            }
        },
        submitAdd() {
            let vm = this
            if (!this.addDataForm.channelName) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '通道名称不能为空！'
                })
                return false
            }
            if (!this.addDataForm.channelAccessCode) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '通道接入码不能为空！'
                })
                return false
            }
            if (!this.addDataForm.bankUrl) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '通道接入请求地址不能为空！'
                })
                return false
            }
            if (!this.addDataForm.unionMerNo) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '商户号不能为空！'
                })
                return false
            }
            if (!/^\d{1,20}$/.test(vm.addDataForm.unionMerNo)) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '商户号20位以内的数字！'
                })
                return false
            }
            if (!this.addDataForm.acqInsCode) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '机构号不能为空！'
                })
                return false
            }
            if (!/^\d{1,10}$/.test(vm.addDataForm.acqInsCode)) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '机构号10位以内的数字！'
                })
                return false
            }
            if (!this.addDataForm.localFee) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '银行收取费率不能为空！'
                })
                return false
            }
            if (/^\-\d+\.?\d*$/.test(vm.addDataForm.localFee)) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '银行收取费率不能是负数'
                })
                return false
            }
            if (!/^\d{1,10}(\.\d{1,5})?$/.test(vm.addDataForm.localFee)) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '银行收取费率整数最多10位，小数最多为5位！'
                })
                return false
            }
            if (!this.addDataForm.channelState) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '使用状态不能为空！'
                })
                return false
            }
            if (!this.addDataForm.computeMode) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '收费方式不能为空！'
                })
                return false
            }
            if (
                (Number(this.addDataForm.localFee) >= 1 &&
                    this.addDataForm.computeMode == 1) ||
                (Number(this.addDataForm.localFee) >= 1 &&
                    this.addDataForm.computeMode == 2)
            ) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '银行收取费率大于等于1时，收费方式只能是定额！'
                })
                return false
            }
            if (this.addDataForm.bids.length <= 0) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '银行列表不能为空！'
                })
                return false
            }
            if (!this.addDataForm.refundType) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '退款类型不能为空！'
                })
                return false
            }
            this.$httpPost('/admin/epay/channelInfo/save', {
                channelName: this.addDataForm.channelName,
                channelAccessCode: this.addDataForm.channelAccessCode,
                bankUrl: this.addDataForm.bankUrl,
                localFee: Number(this.addDataForm.localFee),
                channelState: this.addDataForm.channelState,
                computeMode: this.addDataForm.computeMode,
                remark: this.addDataForm.remark,
                unionMerNo: this.addDataForm.unionMerNo,
                acqInsCode: this.addDataForm.acqInsCode,
                bids: this.addDataForm.bids,
                refundType: this.addDataForm.refundType
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
        handleEdit(row) {
            this.findBankListByCid(row)
            this.isShowEdit = true
            this.editDataForm.id = row.id
            this.editDataForm.channelName = row.channelName
            this.editDataForm.channelAccessCode = row.channelAccessCode
            this.editDataForm.bankUrl = row.bankUrl
            this.editDataForm.localFee = row.localFee
            this.editDataForm.channelState = row.channelState
            this.editDataForm.computeMode = row.computeMode
            this.editDataForm.remark = row.remark
            this.editDataForm.unionMerNo = row.unionMerNo
            this.editDataForm.acqInsCode = row.acqInsCode
            this.editDataForm.refundType = row.refundType
        },
        cancelEdit() {
            this.isShowEdit = false
        },
        submitEdit() {
            let vm = this
            if (!this.editDataForm.channelName) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '通道名称不能为空！'
                })
                return false
            }
            if (!this.editDataForm.channelAccessCode) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '通道接入码不能为空！'
                })
                return false
            }
            if (!this.editDataForm.bankUrl) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '通道接入请求地址不能为空！'
                })
                return false
            }
            if (!this.editDataForm.unionMerNo) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '商户号不能为空！'
                })
                return false
            }
            if (!/^\d{1,20}$/.test(vm.editDataForm.unionMerNo)) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '商户号20位以内的数字！'
                })
                return false
            }
            if (!this.editDataForm.acqInsCode) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '机构号不能为空！'
                })
                return false
            }
            if (!/^\d{1,10}$/.test(vm.editDataForm.acqInsCode)) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '机构号10位以内的数字！'
                })
                return false
            }
            if (!this.editDataForm.localFee) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '银行收取费率不能为空！'
                })
                return false
            }
            if (/^\-\d+\.?\d*$/.test(vm.editDataForm.localFee)) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '银行收取费率不能是负数'
                })
                return false
            }
            if (!/^\d{1,10}(\.\d{1,5})?$/.test(vm.editDataForm.localFee)) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '银行收取费率整数最多10位，小数最多为5位！'
                })
                return false
            }
            if (!this.editDataForm.channelState) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '使用状态不能为空！'
                })
                return false
            }
            if (!this.editDataForm.computeMode) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '收费方式不能为空！'
                })
                return false
            }
            if (
                (Number(this.editDataForm.localFee) >= 1 &&
                    this.editDataForm.computeMode == 1) ||
                (Number(this.editDataForm.localFee) >= 1 &&
                    this.editDataForm.computeMode == 2)
            ) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '银行收取费率大于等于1时，收费方式只能是定额！'
                })
                return false
            }
            if (this.editDataForm.bids.length <= 0) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '银行列表不能为空！'
                })
                return false
            }
            if (!this.editDataForm.refundType) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '退款类型不能为空！'
                })
                return false
            }
            this.$httpPost('/admin/epay/channelInfo/update', {
                id: this.editDataForm.id,
                channelName: this.editDataForm.channelName,
                channelAccessCode: this.editDataForm.channelAccessCode,
                bankUrl: this.editDataForm.bankUrl,
                localFee: this.editDataForm.localFee,
                channelState: this.editDataForm.channelState,
                computeMode: this.editDataForm.computeMode,
                remark: this.editDataForm.remark,
                unionMerNo: this.editDataForm.unionMerNo,
                acqInsCode: this.editDataForm.acqInsCode,
                bids: this.editDataForm.bids,
                refundType: this.editDataForm.refundType
            })
                .then(data => {
                    vm.$notify.success({
                        duration: 2000,
                        title: '成功',
                        message: data.message
                    })
                    vm.cancelEdit()
                    vm.getData()
                })
                .catch(data => {
                    console.log(data)
                })
        }
    },
    created() {
        this.getBankList()
        this.getData()
    }
}
</script>

<style scoped>
</style>
