<template>
    <div class="table">
        <div class="container">
            <div class="add" style="margin-bottom: 30px;">
                <el-button type="primary" size="medium" icon="el-icon-plus" @click="add">增加</el-button>
            </div>
            <div class="handle-box clearfix" style="margin-bottom: 20px;">
                <div style="margin: 0px 20px 10px 0;float: left;">
                    <span>银行名称：</span>
                    <el-select clearable filterable style="width: 150px;" v-model="searchDataForm.bankCode" placeholder="请选择银行名称">
                        <el-option v-for="item in bankInfoList" :key="item.bankCode" :label="item.bankName" :value="item.bankCode">
                        </el-option>
                    </el-select>
                </div>
                <div style="margin: 0px 20px 10px 0;float: left;">
                    <span>卡类型：</span>
                    <el-select clearable style="width: 150px;" v-model="searchDataForm.cardType" placeholder="请选择卡类型">
                        <el-option v-for="item in cardType" :key="item.id" :label="item.name" :value="item.id">
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
                <div style="margin: 0px 20px 10px 0;float: left;">
                    <span>产品名称：</span>
                    <el-select clearable style="width: 150px;" v-model="searchDataForm.productAccessCode" placeholder="请选择产品名称">
                        <el-option v-for="item in productNameList" :key="item.productAccessCode" :label="item.productName" :value="item.productAccessCode">
                        </el-option>
                    </el-select>
                </div>
                <div style="margin: 0px 20px 10px 0;float: left;">
                    <span>银行支付通道：</span>
                    <el-select clearable style="width: 150px;" v-model="searchDataForm.channelAccessCode" placeholder="请选择银行支付通道">
                        <el-option v-for="item in channelNameList" :key="item.channelAccessCode" :label="item.channelName" :value="item.channelAccessCode">
                        </el-option>
                    </el-select>
                </div>
                <div style="float: left;">
                    <el-button type="primary" icon="el-icon-search" @click="handleCurrentChange(1)">搜索</el-button>
                </div>
            </div>
            <el-table :data="getDataList" border style="width: 100%;">
                <el-table-column show-overflow-tooltip prop="id" label="编号">
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="bankName" label="银行名称">
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="cardType" label="卡类型">
                    <template slot-scope="scope">
                        <span v-if="scope.row.cardType==item.id" v-for="item in cardType">{{item.name}}</span>
                    </template>
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="platformName" label="平台名称">
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="productName" label="产品名称">
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="channelName" label="银行支付通道">
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="amountMin" label="交易下限（元）">
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="amountMax" label="交易上限（元）">
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="createBy" label="创建人">
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="createAt" label="创建时间">
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
        <el-dialog title="添加渠道路由" :visible.sync="isShowAdd" :before-close="cancelAdd" width="650px" center>
            <div class="form-content" style="margin: 0 auto;width: 90%;">
                <el-form ref="addDataForm" :model="addDataForm" label-width="140px">
                    <el-form-item label="银行支付通道：">
                        <el-select clearable @change="addDataForm.bankCode = '';getAddChangeChannelInfoId();" v-model="addDataForm.channelAccessCode" placeholder="银行支付通道" style="width: 400px">
                            <el-option v-for="item in channelNameList" :key="item.channelAccessCode" :label="item.channelName" :value="item.channelAccessCode">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="银行名称：">
                        <el-select clearable v-model="addDataForm.bankCode" placeholder="银行名称" style="width: 400px">
                            <el-option v-for="item in addFormBankInfoList" :key="item.bankCode" :label="item.bankName" :value="item.bankCode">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="产品名称：">
                        <el-select clearable v-model="addDataForm.productAccessCode" placeholder="产品名称" style="width: 400px">
                            <el-option v-for="item in productNameList" :key="item.productAccessCode" :label="item.productName" :value="item.productAccessCode">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="卡类型：">
                        <el-select clearable v-model="addDataForm.cardType" placeholder="卡类型" style="width: 400px">
                            <el-option v-for="item in cardType" :key="item.id" :label="item.name" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="平台名称：">
                        <el-select clearable v-model="addDataForm.platformId" placeholder="平台名称" style="width: 400px">
                            <el-option v-for="item in platformIdList" :key="item.id" :label="item.platformName" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="交易上限：">
                        <el-input type="number" v-model.trim="addDataForm.amountMax" placeholder="不能为负数,整数最多10位，小数最多5位"></el-input>
                    </el-form-item>
                    <el-form-item label="交易下限：">
                        <el-input type="number" v-model.trim="addDataForm.amountMin" placeholder="不能为负数,整数最多10位，小数最多5位"></el-input>
                    </el-form-item>
                    <el-form-item label="备注：">
                        <el-input clearable type="textarea" v-model.trim="addDataForm.remark" placeholder="备注"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitAdd">确 定</el-button>
                <el-button @click="cancelAdd">取消</el-button>
            </span>
        </el-dialog>

        <!--编辑-->
        <el-dialog title="编辑渠道路由" :visible.sync="isShowEdit" :before-close="cancelEdit" width="600px" center>
            <div class="form-content" style="margin: 0 auto;width: 90%;">
                <el-form ref="editDataForm" :model="editDataForm" label-width="120px">
                    <el-form-item label="银行支付通道：">
                        <el-select clearable @change="editDataForm.bankCode = '';getEditChangeChannelInfoId();" v-model="editDataForm.channelAccessCode" placeholder="银行支付通道" style="width: 400px">
                            <el-option v-for="item in channelNameList" :key="item.channelAccessCode" :label="item.channelName" :value="item.channelAccessCode">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="银行名称：">
                        <el-select clearable v-model="editDataForm.bankCode" placeholder="银行名称" style="width: 400px">
                            <el-option v-for="item in editFormBankInfoList" :key="item.bankCode" :label="item.bankName" :value="item.bankCode">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="产品名称：">
                        <el-select clearable v-model="editDataForm.productAccessCode" placeholder="产品名称" style="width: 400px">
                            <el-option v-for="item in productNameList" :key="item.productAccessCode" :label="item.productName" :value="item.productAccessCode">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="卡类型：">
                        <el-select clearable v-model="editDataForm.cardType" placeholder="卡类型" style="width: 400px">
                            <el-option v-for="item in cardType" :key="item.id" :label="item.name" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="平台名称：">
                        <el-select clearable v-model="editDataForm.platformId" placeholder="平台名称" style="width: 400px">
                            <el-option v-for="item in platformIdList" :key="item.id" :label="item.platformName" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="交易上限：">
                        <el-input type="number" v-model.trim="editDataForm.amountMax" placeholder="不能为负数,整数最多10位，小数最多5位"></el-input>
                    </el-form-item>
                    <el-form-item label="交易下限：">
                        <el-input type="number" v-model.trim="editDataForm.amountMin" placeholder="不能为负数,整数最多10位，小数最多5位"></el-input>
                    </el-form-item>
                    <el-form-item label="备注：">
                        <el-input clearable type="textarea" v-model.trim="editDataForm.remark" placeholder="备注"></el-input>
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
export default {
    data() {
        return {
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
            // 增加参数
            addDataForm: {
                bankCode: '',
                productAccessCode: '',
                channelAccessCode: '',
                cardType: '',
                platformId: '',
                amountMax: '',
                amountMin: '',
                remark: ''
            },
            // 编辑参数
            editDataForm: {
                id: '',
                bankCode: '',
                productAccessCode: '',
                channelAccessCode: '',
                cardType: '',
                platformId: '',
                amountMax: '',
                amountMin: '',
                remark: ''
            },
            searchDataForm: {},
            // 平台名称
            platformIdList: [],
            // 银行名称
            bankInfoList: [],
            // 增加中的表单银行名称
            addFormBankInfoList: [],
            // 编辑中的表单银行名称
            editFormBankInfoList: [],
            // 产品名称
            productNameList: [],
            // 银行支付通道
            channelNameList: [],
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
        getData() {
            let vm = this
            this.$httpGet('/admin/routeInfo/list', {
                pageNo: this.cur_page,
                pageSize: 10,
                bankCode: this.searchDataForm.bankCode,
                cardType: this.searchDataForm.cardType,
                platformId: this.searchDataForm.platformId,
                productAccessCode: this.searchDataForm.productAccessCode,
                channelAccessCode: this.searchDataForm.channelAccessCode
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
        add() {
            this.isShowAdd = true
        },
        cancelAdd() {
            this.isShowAdd = false
            this.addDataForm = {
                bankCode: ''
            }
            this.addFormBankInfoList = []
        },
        submitAdd() {
            let vm = this
            if (!this.addDataForm.channelAccessCode) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '银行支付通道不能为空！'
                })
                return false
            }
            if (!this.addDataForm.bankCode) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '银行名称不能为空！'
                })
                return false
            }
            if (!this.addDataForm.productAccessCode) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '产品名称不能为空！'
                })
                return false
            }
            if (!this.addDataForm.cardType) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '卡类型不能为空！'
                })
                return false
            }
            if (!this.addDataForm.platformId) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '平台名称不能为空！'
                })

                return false
            }
            if (!this.addDataForm.amountMax) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '交易上限不能为空'
                })
                return false
            }
            if (/^\-\d+\.?\d*$/.test(vm.addDataForm.amountMax)) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '交易上限不能是负数'
                })
                return false
            }
            if (!/^\d{1,10}(\.\d{1,2})?$/.test(vm.addDataForm.amountMax)) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '交易上限整数最多10位，小数最多为2位！'
                })
                return false
            }
            if (!this.addDataForm.amountMin) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '交易下限不能为空'
                })
                return false
            }
            if (/^\-\d+\.?\d*$/.test(vm.addDataForm.amountMin)) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '交易下限不能是负数'
                })
                return false
            }
            if (!/^\d{1,10}(\.\d{1,2})?$/.test(vm.addDataForm.amountMin)) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '交易下限整数最多10位，小数最多为2位！'
                })
                return false
            }
            if (this.addDataForm.amountMax < this.addDataForm.amountMin) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '交易上限要大于等于交易下限'
                })
                return false
            }
            this.$httpPost('/admin/routeInfo/add', {
                bankCode: this.addDataForm.bankCode,
                productAccessCode: this.addDataForm.productAccessCode,
                channelAccessCode: this.addDataForm.channelAccessCode,
                cardType: this.addDataForm.cardType,
                platformId: this.addDataForm.platformId,
                amountMax: this.addDataForm.amountMax,
                amountMin: this.addDataForm.amountMin,
                remark: this.addDataForm.remark
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
            this.isShowEdit = true
            this.editDataForm.id = row.id
            this.editDataForm.bankCode = row.bankCode
            this.editDataForm.productAccessCode = row.productAccessCode
            this.editDataForm.channelAccessCode = row.channelAccessCode
            this.editDataForm.cardType = row.cardType
            this.editDataForm.platformId = row.platformId
            this.editDataForm.amountMax = row.amountMax
            this.editDataForm.amountMin = row.amountMin
            this.editDataForm.remark = row.remark
            this.getEditChangeChannelInfoId()
        },
        cancelEdit() {
            this.isShowEdit = false
            this.editFormBankInfoList = []
        },
        submitEdit() {
            let vm = this
            if (!this.editDataForm.channelAccessCode) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '银行支付通道不能为空！'
                })
                return false
            }
            if (!this.editDataForm.bankCode) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '银行名称不能为空！'
                })
                return false
            }
            if (!this.editDataForm.productAccessCode) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '产品名称不能为空！'
                })
                return false
            }
            if (!this.editDataForm.cardType) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '卡类型不能为空！'
                })
                return false
            }
            if (!this.editDataForm.platformId) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '平台名称不能为空！'
                })
                return false
            }
            if (!this.editDataForm.amountMax) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '交易上限不能为空'
                })
                return false
            }
            if (/^\-\d+\.?\d*$/.test(vm.editDataForm.amountMax)) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '交易上限不能是负数'
                })
                return false
            }
            if (!/^\d{1,10}(\.\d{1,2})?$/.test(vm.editDataForm.amountMax)) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '交易上限整数最多10位，小数最多为2位！'
                })
                return false
            }
            if (!this.editDataForm.amountMin) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '交易下限不能为空'
                })
                return false
            }
            if (/^\-\d+\.?\d*$/.test(vm.editDataForm.amountMin)) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '交易下限不能是负数'
                })
                return false
            }
            if (!/^\d{1,10}(\.\d{1,2})?$/.test(vm.editDataForm.amountMin)) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '交易下限整数最多10位，小数最多为2位！'
                })
                return false
            }
            if (this.editDataForm.amountMax < this.editDataForm.amountMin) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '交易上限要大于等于交易下限'
                })
                return false
            }
            this.$httpPost('/admin/routeInfo/edit', {
                id: this.editDataForm.id,
                bankCode: this.editDataForm.bankCode,
                productAccessCode: this.editDataForm.productAccessCode,
                channelAccessCode: this.editDataForm.channelAccessCode,
                cardType: this.editDataForm.cardType,
                platformId: this.editDataForm.platformId,
                amountMin: this.editDataForm.amountMin,
                amountMax: this.editDataForm.amountMax,
                remark: this.editDataForm.remark
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
        },
        handleDelete(row) {
            let vm = this
            this.$httpPost('/admin/routeInfo/delete', {
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
        },
        // 平台名称
        getPlatFormList() {
            let vm = this
            return this.$httpGet('/admin/platformInfo/option', {})
                .then(({ data }) => {
                    vm.platformIdList = data
                })
                .catch(data => {
                    console.log(data)
                })
        },
        // 产品名称
        getProductNameList() {
            let vm = this
            return this.$httpGet('/admin/epay/productsInfo/findProductAll', {})
                .then(({ data }) => {
                    vm.productNameList = data
                })
                .catch(data => {
                    console.log(data)
                })
        },
        // 银行支付通道
        getChannelInfoList() {
            let vm = this
            return this.$httpGet('/admin/epay/channelInfo/findChannelAll', {})
                .then(({ data }) => {
                    vm.channelNameList = data
                })
                .catch(data => {
                    console.log(data)
                })
        },
        // 获取当前增加的选中的银行支付通道id
        getAddChangeChannelInfoId() {
            let vm = this
            let arrary = []
            arrary = this.channelNameList.filter(item => {
                return (
                    item.channelAccessCode == vm.addDataForm.channelAccessCode
                )
            })
            if (arrary.length <= 0) {
                this.addFormBankInfoList = []
                return false
            }

            this.findAddBankListByCid(arrary)
        },
        // 获取当前编辑的选中的银行支付通道id
        getEditChangeChannelInfoId() {
            let vm = this
            let arrary = []
            arrary = this.channelNameList.filter(item => {
                return (
                    item.channelAccessCode == vm.editDataForm.channelAccessCode
                )
            })
            if (arrary.length <= 0) {
                this.editFormBankInfoList = []
                return false
            }

            this.findEditBankListByCid(arrary)
        },
        // 银行信息下拉列表
        getBankInfoList() {
            let vm = this
            return this.$httpGet('/admin/bankInfo/option', {})
                .then(({ data }) => {
                    vm.bankInfoList = data
                })
                .catch(data => {
                    console.log(data)
                })
        },
        // 根据当前增加表单里的银行支付通道id获取银行信息下拉列表
        findAddBankListByCid(row) {
            let vm = this
            this.$httpGet('/admin/epay/channelInfo/findBankListByCid', {
                cid: row.length ? row[0].id.toString() : ''
            })
                .then(({ data }) => {
                    data.length
                        ? (vm.addFormBankInfoList = data)
                        : vm.$notify.warning({
                              duration: 2000,
                              title: '警告',
                              message:
                                  '银行名称不能为空，可以去通道列表添加银行信息！'
                          })
                })
                .catch(data => {
                    console.log(data)
                })
        },
        // 根据当前编辑表单里的银行支付通道id获取银行信息下拉列表
        findEditBankListByCid(row) {
            let vm = this
            this.$httpGet('/admin/epay/channelInfo/findBankListByCid', {
                cid: row.length ? row[0].id.toString() : ''
            })
                .then(({ data }) => {
                    data.length
                        ? (vm.editFormBankInfoList = data)
                        : vm.$notify.warning({
                              duration: 2000,
                              title: '警告',
                              message:
                                  '银行名称不能为空，可以去通道列表添加银行信息！'
                          })
                })
                .catch(data => {
                    console.log(data)
                })
        }
    },
    created() {
        this.getData()
        this.getPlatFormList()
        this.getProductNameList()
        this.getChannelInfoList()
        this.getBankInfoList()
    }
}
</script>

<style scoped>
</style>
