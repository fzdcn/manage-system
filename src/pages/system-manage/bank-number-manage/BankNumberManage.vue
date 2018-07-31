<template>
    <div class="table">
        <div class="container">
            <div class="add" style="margin-bottom: 30px;">
                <el-button type="primary" size="medium" icon="el-icon-plus" @click="add">增加</el-button>
            </div>
            <div class="handle-box clearfix" style="margin-bottom: 20px;">
                <div style="margin: 0px 20px 10px 0;float: left;">
                    <span>银行名称：</span>
                    <el-input style="width: 150px;" class="bankName" v-model.trim="searchDataForm.bankName" clearable placeholder="请填写银行名称">
                    </el-input>
                </div>
                <div style="margin: 0px 20px 10px 0;float: left;">
                    <span>联行号：</span>
                    <el-input style="width: 150px;" class="bankNumber" v-model.trim="searchDataForm.bankNumber" clearable placeholder="请填写联行号">
                    </el-input>
                </div>
                <div style="margin: 0px 20px 10px 0;float: left;">
                    <span>银行编号：</span>
                    <el-input style="width: 150px;" class="numbers" v-model.trim="searchDataForm.numbers" clearable placeholder="请填写银行编号">
                    </el-input>
                </div>
                <div style="float: left;">
                    <el-button type="primary" icon="el-icon-search" @click="handleCurrentChange(1)">搜索</el-button>
                </div>
            </div>
            <el-table :data="getDataList" border style="width: 100%;">
                <el-table-column show-overflow-tooltip prop="bankName" label="银行名称">
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="bankNumber" label="联行号">
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="bankCode" label="银行代码">
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="numbers" label="银行编号">
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="identity" label="收款方账户所属机构标识">
                </el-table-column>
                <el-table-column label="操作" width="100px" align="center">
                    <template v-if="getDataList.length > 0" slot-scope="scope">
                        <el-button @click="handleEdit(scope.row)" type="primary" icon="el-icon-edit" size="small">编辑
                        </el-button>
                        <!--<el-button @click="handleDelete(scope.row)" type="danger" icon-font="el-icon-font-delete" size="small">-->
                        <!--删除-->
                        <!--</el-button>-->
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination" style="overflow: hidden;">
                <el-pagination v-if="paginationShow" background :current-page="cur_page" @current-change="handleCurrentChange" layout="total, prev, pager, next, jumper" :page-size="10" :pager-count="11" :total="total">
                </el-pagination>
            </div>
        </div>
        <!--增加银行号-->
        <el-dialog title="增加银行号" :visible.sync="isShowAdd" :before-close="cancelAdd" width="550px" center>
            <div class="form-content" style="margin: 0 auto;width: 90%;">
                <el-form ref="addDataForm" :model="addDataForm" label-width="180px">
                    <el-form-item :rules="[{ required: true}]" label="银行名称：">
                        <el-input clearable v-model.trim="addDataForm.bankName" maxlength="32" placeholder="不超过32位"></el-input>
                    </el-form-item>
                    <el-form-item :rules="[{ required: true}]" label="联行号：">
                        <el-input type="number" v-model.trim="addDataForm.bankNumber" maxlength="12" placeholder="12位的纯数字"></el-input>
                    </el-form-item>
                    <el-form-item :rules="[{ required: true}]" label="银行代码：">
                        <el-input clearable v-model.trim="addDataForm.bankCode" maxlength="15" placeholder="不超过15位"></el-input>
                    </el-form-item>
                    <el-form-item :rules="[{ required: true}]" label="银行编号：">
                        <el-input type="number" v-model.trim="addDataForm.numbers" maxlength="32" placeholder="不超过32位的纯数字"></el-input>
                    </el-form-item>
                    <el-form-item :rules="[{ required: true}]" label="收款方账户所属机构标识：">
                        <el-input clearable v-model.trim="addDataForm.identity" maxlength="14" placeholder="14位的大写英文字母加数字组合"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitAdd">确 定</el-button>
                <el-button @click="cancelAdd">取 消</el-button>
            </span>
        </el-dialog>

        <!--编辑银行号-->
        <el-dialog title="编辑银行号" :visible.sync="isShowEdit" :before-close="cancelEdit" width="550px" center>
            <div class="form-content" style="margin: 0 auto;width: 90%;">
                <el-form ref="editDataForm" :model="editDataForm" label-width="180px">
                    <el-form-item :rules="[{ required: true}]" label="银行名称：">
                        <el-input clearable v-model.trim="editDataForm.bankName" maxlength="32" placeholder="不超过32位"></el-input>
                    </el-form-item>
                    <el-form-item :rules="[{ required: true}]" label="联行号：">
                        <el-input type="number" v-model.trim="editDataForm.bankNumber" maxlength="12" placeholder="12位的纯数字"></el-input>
                    </el-form-item>
                    <el-form-item :rules="[{ required: true}]" label="银行代码：">
                        <el-input clearable v-model.trim="editDataForm.bankCode" maxlength="15" placeholder="不超过15位"></el-input>
                    </el-form-item>
                    <el-form-item :rules="[{ required: true}]" label="银行编号：">
                        <el-input type="number" v-model.trim="editDataForm.numbers" maxlength="32" placeholder="不超过32位的纯数字"></el-input>
                    </el-form-item>
                    <el-form-item :rules="[{ required: true}]" label="收款方账户所属机构标识：">
                        <el-input clearable v-model.trim="editDataForm.identity" maxlength="14" placeholder="14位的大写英文字母加数字组合"></el-input>
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
            addDataForm: {},
            editDataForm: {
                id: '',
                bankName: '',
                bankNumber: '',
                bankCode: '',
                numbers: '',
                identity: ''
            },
            searchDataForm: {}
        }
    },
    methods: {
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
                        .$httpGet('/admin/role/deleteAdminRole', {
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
        getData() {
            let vm = this
            this.$httpGet('/admin/epay/unionBankNumber/index', {
                pageNo: this.cur_page,
                pageSize: 10,
                bankName: this.searchDataForm.bankName,
                bankNumber: this.searchDataForm.bankNumber,
                numbers: this.searchDataForm.numbers
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
            this.addDataForm = {}
        },
        submitAdd() {
            let vm = this
            if (!this.addDataForm.bankName) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '银行名称不能为空！'
                })
                return false
            }
            if (this.addDataForm.bankName.length > 32) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '银行名称不超过32位！'
                })
                return false
            }
            if (!this.addDataForm.bankNumber) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '联行号不能为空！'
                })
                return false
            }
            if (!/^\d{12}$/.test(vm.addDataForm.bankNumber)) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '联行号为12位的纯数字！'
                })
                return false
            }
            if (!this.addDataForm.bankCode) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '银行代码不能为空！'
                })
                return false
            }
            if (this.addDataForm.bankCode.length > 15) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '银行代码不超过15位！'
                })
                return false
            }
            if (!this.addDataForm.numbers) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '银行编号不能为空！'
                })
                return false
            }
            if (!/^\d{4}$/.test(vm.addDataForm.numbers)) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '银行编号为4位纯数字！'
                })
                return false
            }
            if (!this.addDataForm.identity) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '收款方账户所属机构标识不能为空！'
                })
                return false
            }
            if (
                !/^(?![0-9]+$)(?![A-Z]+$)[0-9A-Z]{14}$/.test(
                    vm.addDataForm.identity
                )
            ) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message:
                        '收款方账户所属机构标识为14位的大写英文字母加数字组合！'
                })
                return false
            }

            this.$httpPost('/admin/epay/unionBankNumber/save', {
                bankName: this.addDataForm.bankName,
                bankNumber: this.addDataForm.bankNumber,
                bankCode: this.addDataForm.bankCode,
                numbers: this.addDataForm.numbers,
                identity: this.addDataForm.identity
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
        handleModify(row) {
            this.$router.push({
                name: 'modify-role-permissions',
                params: { id: row.id }
            })
        },
        handleEdit(row) {
            this.isShowEdit = true
            this.editDataForm.id = row.id
            this.editDataForm.bankName = row.bankName
            this.editDataForm.bankNumber = row.bankNumber
            this.editDataForm.bankCode = row.bankCode
            this.editDataForm.numbers = row.numbers
            this.editDataForm.identity = row.identity
        },
        cancelEdit() {
            this.isShowEdit = false
        },
        submitEdit() {
            let vm = this
            if (!this.editDataForm.bankName) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '银行名称不能为空！'
                })
                return false
            }
            if (this.editDataForm.bankName.length > 32) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '银行名称不超过32位！'
                })
                return false
            }
            if (!this.editDataForm.bankNumber) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '联行号不能为空！'
                })
                return false
            }
            if (!/^\d{12}$/.test(vm.editDataForm.bankNumber)) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '联行号为12位的纯数字！'
                })
                return false
            }
            if (!this.editDataForm.bankCode) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '银行代码不能为空！'
                })
                return false
            }
            if (this.editDataForm.bankCode.length > 15) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '银行代码不超过15位！'
                })
                return false
            }
            if (!this.editDataForm.numbers) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '银行编号不能为空！'
                })
                return false
            }
            if (!/^\d{4}$/.test(vm.editDataForm.numbers)) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '银行编号为4位纯数字！'
                })
                return false
            }
            if (!this.editDataForm.identity) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '收款方账户所属机构标识不能为空！'
                })
                return false
            }
            if (
                !/^(?![0-9]+$)(?![A-Z]+$)[0-9A-Z]{14}$/.test(
                    vm.editDataForm.identity
                )
            ) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message:
                        '收款方账户所属机构标识为14位的大写英文字母加数字组合！'
                })
                return false
            }
            this.$httpPost('/admin/epay/unionBankNumber/update', {
                id: this.editDataForm.id,
                bankName: this.editDataForm.bankName,
                bankNumber: this.editDataForm.bankNumber,
                bankCode: this.editDataForm.bankCode,
                numbers: this.editDataForm.numbers,
                identity: this.editDataForm.identity
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
        this.getData()
    }
}
</script>

<style scoped>
</style>
