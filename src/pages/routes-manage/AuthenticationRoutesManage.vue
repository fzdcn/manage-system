<template>
    <div class="table">
        <div class="container">
            <div class="add" style="margin-bottom: 30px;">
                <el-button type="primary" size="medium" icon="el-icon-plus" @click="add">增加</el-button>
            </div>
            <div class="handle-box clearfix" style="margin-bottom: 20px;">
                <div style="margin: 0px 20px 10px 0;float: left;">
                    <span>银行名称：</span>
                    <el-select clearable filterable style="width: 150px;" v-model="searchDataForm.bankId" placeholder="请选择银行名称">
                        <el-option v-for="item in bankInfoList" :key="item.id" :label="item.bankName" :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <div style="margin: 0px 20px 10px 0;float: left;">
                    <span>产品名称：</span>
                    <el-select clearable style="width: 150px;" v-model="searchDataForm.productId" placeholder="请选择产品名称">
                        <el-option v-for="item in productNameList" :key="item.id" :label="item.productName" :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <div style="margin: 0px 20px 10px 0;float: left;">
                    <span>鉴权通道：</span>
                    <el-select clearable style="width: 150px;" v-model="searchDataForm.authChannelId" placeholder="请选择鉴权通道">
                        <el-option v-for="item in authChannel" :key="item.id" :label="item.channelName" :value="item.id">
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
                    <span>通道可用状态：</span>
                    <el-select clearable style="width: 170px;" v-model="searchDataForm.status" placeholder="请选择通道可用状态">
                        <el-option v-for="item in status" :key="item.id" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <div style="float: left;">
                    <el-button type="primary" icon="el-icon-search" @click="handleCurrentChange(1)">搜索</el-button>
                </div>
            </div>
            <el-table v-loading="loading" :data="getDataList" border style="width: 100%;">
                <el-table-column show-overflow-tooltip prop="bankId" label="银行名称">
                    <template slot-scope="scope">
                        <span v-if="scope.row.bankId==item.id" v-for="item in bankInfoList">{{item.bankName}}</span>
                    </template>
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="productId" label="产品名称">
                    <template slot-scope="scope">
                        <span v-if="scope.row.productId==item.id" v-for="item in productNameList">{{item.productName}}</span>
                    </template>
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="authChannelId" label="鉴权通道">
                    <template slot-scope="scope">
                        <span v-if="scope.row.authChannelId==item.id" v-for="item in authChannel">{{item.channelName}}</span>
                    </template>
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="cardType" label="卡类型">
                    <template slot-scope="scope">
                        <span v-if="scope.row.cardType==item.id" v-for="item in cardType">{{item.name}}</span>
                    </template>
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="status" label="通道可用状态">
                    <template slot-scope="scope">
                        <span v-if="scope.row.status==item.id" v-for="item in status">{{item.name}}</span>
                    </template>
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="authType" label="认证方式">
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="remark" label="备注">
                </el-table-column>
                <el-table-column label="操作" width="100px" align="center">
                    <template v-if="getDataList.length > 0" slot-scope="scope">
                        <el-button @click="handleEdit(scope.row)" type="primary" icon="el-icon-edit" size="small">编辑
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
        <el-dialog title="添加渠道路由" :visible.sync="isShowAdd" :before-close="cancelAdd" width="550px" center>
            <div class="form-content" style="margin: 0 auto;width: 90%;">
                <el-form ref="addDataForm" :model="addDataForm" label-width="140px">
                    <el-form-item :rules="[{ required: true}]" label="银行名称：">
                        <el-select clearable filterable v-model="addDataForm.bankId" placeholder="银行名称" style="width: 300px">
                            <el-option v-for="item in bankInfoList" :key="item.id" :label="item.bankName" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item :rules="[{ required: true}]" label="产品名称：">
                        <el-select clearable v-model="addDataForm.productId" placeholder="产品名称" style="width: 300px">
                            <el-option v-for="item in productNameList" :key="item.id" :label="item.productName" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item :rules="[{ required: true}]" label="鉴权通道：">
                        <el-select clearable v-model="addDataForm.authChannelId" placeholder="鉴权通道" style="width: 300px">
                            <el-option v-for="item in authChannel" :key="item.id" :label="item.channelName" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item :rules="[{ required: true}]" label="卡类型：">
                        <el-select clearable v-model="addDataForm.cardType" placeholder="卡类型" style="width: 300px">
                            <el-option v-for="item in cardType" :key="item.id" :label="item.name" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item :rules="[{ required: true}]" label="认证方式：">
                        <el-input clearable v-model.trim="addDataForm.authType" placeholder="认证方式" style="width: 300px"></el-input>
                    </el-form-item>
                    <el-form-item :rules="[{ required: true}]" label="通道可用状态：">
                        <el-select clearable v-model="addDataForm.status" placeholder="通道可用状态" style="width: 300px">
                            <el-option v-for="item in status" :key="item.id" :label="item.name" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="备注：">
                        <el-input clearable type="textarea" v-model.trim="addDataForm.remark" placeholder="备注" style="width: 300px"></el-input>
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
                    <el-form-item :rules="[{ required: true}]" label="银行名称：">
                        <el-select clearable filterable v-model="editDataForm.bankId" placeholder="银行名称" style="width: 300px">
                            <el-option v-for="item in bankInfoList" :key="item.id" :label="item.bankName" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item :rules="[{ required: true}]" label="产品名称：">
                        <el-select clearable v-model="editDataForm.productId" placeholder="产品名称" style="width: 300px">
                            <el-option v-for="item in productNameList" :key="item.id" :label="item.productName" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item :rules="[{ required: true}]" label="鉴权通道：">
                        <el-select clearable v-model="editDataForm.authChannelId" placeholder="鉴权通道" style="width: 300px">
                            <el-option v-for="item in authChannel" :key="item.id" :label="item.channelName" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item :rules="[{ required: true}]" label="卡类型：">
                        <el-select clearable v-model="editDataForm.cardType" placeholder="卡类型" style="width: 300px">
                            <el-option v-for="item in cardType" :key="item.id" :label="item.name" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item :rules="[{ required: true}]" label="认证方式：">
                        <el-input clearable v-model.trim="editDataForm.authType" placeholder="认证方式" style="width: 300px"></el-input>
                    </el-form-item>
                    <el-form-item :rules="[{ required: true}]" label="通道可用状态：">
                        <el-select clearable v-model="editDataForm.status" placeholder="通道可用状态" style="width: 300px">
                            <el-option v-for="item in status" :key="item.id" :label="item.name" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="备注：">
                        <el-input clearable type="textarea" v-model.trim="editDataForm.remark" placeholder="备注" style="width: 300px"></el-input>
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
            // 增加参数
            addDataForm: {},
            // 编辑参数
            editDataForm: {
                id: '',
                bankId: '',
                productId: '',
                authChannelId: '',
                cardType: '',
                authType: '',
                status: '',
                remark: ''
            },
            searchDataForm: {},
            // 银行名称
            bankInfoList: [],
            // 产品名称
            productNameList: [],
            // 卡类型
            cardType: [
                {
                    id: '00',
                    name: '借记卡'
                },
                {
                    id: '01',
                    name: '贷记卡'
                },
                {
                    id: '0',
                    name: '未知'
                }
            ],
            // 鉴权通道
            authChannel: [],
            // 通道可用状态
            status: [
                {
                    id: '1',
                    name: '启用'
                },
                {
                    id: '2',
                    name: '未启用'
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
        // 鉴权通道
        getAuthChannel() {
            let vm = this
            this.$httpGet('/admin/epay/channelInfo/findChannelAll', {})
                .then(({ data }) => {
                    vm.authChannel = data
                })
                .catch(data => {
                    console.log(data)
                })
        },
        getData() {
            let vm = this
            this.$httpGet('admin/authRoute/index', {
                pageNo: this.cur_page,
                pageSize: 10,
                bankId: this.searchDataForm.bankId,
                cardType: this.searchDataForm.cardType,
                productId: this.searchDataForm.productId,
                authChannelId: this.searchDataForm.authChannelId,
                status: this.searchDataForm.status
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
            this.addDataForm = {}
        },
        submitAdd() {
            let vm = this
            if (
                !(this.addDataForm.bankId === 0 ? '0' : this.addDataForm.bankId)
            ) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '银行名称不能为空！'
                })
                return false
            }
            if (!this.addDataForm.productId) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '产品名称不能为空！'
                })
                return false
            }
            if (!this.addDataForm.authChannelId) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '鉴权通道不能为空！'
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
            if (!this.addDataForm.authType) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '认证方式不能为空！'
                })
                return false
            }
            if (!this.addDataForm.status) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '通道可用状态不能为空'
                })
                return false
            }
            this.$httpPost('/admin/authRoute/save', {
                bankId: this.addDataForm.bankId,
                productId: this.addDataForm.productId,
                authChannelId: this.addDataForm.authChannelId,
                cardType: this.addDataForm.cardType,
                authType: this.addDataForm.authType,
                status: this.addDataForm.status,
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
            this.editDataForm.bankId = row.bankId
            this.editDataForm.productId = row.productId
            this.editDataForm.authChannelId = row.authChannelId
            this.editDataForm.cardType = row.cardType
            this.editDataForm.authType = row.authType
            this.editDataForm.status = row.status
            this.editDataForm.remark = row.remark
        },
        cancelEdit() {
            this.isShowEdit = false
        },
        submitEdit() {
            let vm = this
            if (
                !(this.editDataForm.bankId === 0
                    ? '0'
                    : this.editDataForm.bankId)
            ) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '银行名称不能为空！'
                })
                return false
            }
            if (!this.editDataForm.productId) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '产品名称不能为空！'
                })
                return false
            }
            if (!this.editDataForm.authChannelId) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '鉴权通道不能为空！'
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
            if (!this.editDataForm.authType) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '认证方式不能为空！'
                })
                return false
            }
            if (!this.editDataForm.status) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '通道可用状态不能为空'
                })
                return false
            }
            this.$httpPost('/admin/authRoute/update', {
                id: this.editDataForm.id,
                bankId: this.editDataForm.bankId,
                productId: this.editDataForm.productId,
                authChannelId: this.editDataForm.authChannelId,
                cardType: this.editDataForm.cardType,
                authType: this.editDataForm.authType,
                status: this.editDataForm.status,
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
        // 产品名称
        getProductNameList() {
            let vm = this
            this.$httpGet('/admin/epay/productsInfo/findProductAll', {})
                .then(({ data }) => {
                    vm.productNameList = data
                })
                .catch(data => {
                    console.log(data)
                })
        },
        // 银行信息下拉列表
        getBankInfoList() {
            let vm = this
            this.$httpGet('/admin/bankInfo/option', {})
                .then(({ data }) => {
                    vm.bankInfoList = data
                })
                .catch(data => {
                    console.log(data)
                })
        }
    },
    mounted() {
        this.getData()
        this.getAuthChannel()
        this.getProductNameList()
        this.getBankInfoList()
    }
}
</script>

<style scoped>
</style>
