<template>
    <div class="table">
        <div class="container">
            <div class="add" style="margin-bottom: 30px;">
                <el-button type="primary" size="medium" icon="el-icon-plus" @click="add">增加</el-button>
            </div>

            <div class="handle-box clearfix" style="margin-bottom: 20px;">
                <div style="margin: 0px 20px 10px 0;float:left;">
                    <span>银行卡号标识：</span>
                    <el-input style="width: 150px;" class="username" v-model.trim="searchDataForm.cardNoMark" clearable placeholder="银行卡号标识">
                    </el-input>
                </div>
                <div style="margin: 0px 20px 10px 0;float:left;">
                    <span>银行名称：</span>
                    <el-input style="width: 150px;" class="username" v-model.trim="searchDataForm.bankName" clearable placeholder="银行名称">
                    </el-input>
                </div>
                <div style="margin: 0px 20px 10px 0;float:left;">
                    <span>银行卡类型：</span>
                    <el-select clearable style="width: 150px;" v-model="searchDataForm.cardType" placeholder="银行卡类型">
                        <el-option v-for="item in cardTypeList" :key="item.cardType" :label="item.name" :value="item.cardType">
                        </el-option>
                    </el-select>
                </div>
                <div style="float:left;">
                    <el-button type="primary" icon="el-icon-search" @click="handleCurrentChange(1)">搜索</el-button>
                </div>
            </div>

            <el-table v-loading="loading" :data="getDataList" border style="width: 100%;">
                <el-table-column show-overflow-tooltip prop="cardNoMark" label="银行卡号标识" />
                <el-table-column show-overflow-tooltip prop="bankName" label="银行名称" />
                <el-table-column show-overflow-tooltip prop="cardType" label="银行卡类型">
                    <template slot-scope="scope">
                        <span v-if="scope.row.cardType==item.cardType" v-for="item in cardTypeList">{{ item.name }}</span>
                    </template>
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="cardExplain" label="银行卡说明" />
                <el-table-column show-overflow-tooltip prop="bankCode" label="银行代码" />
                <el-table-column show-overflow-tooltip prop="bankNumber" label="银行编号" />
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
        <el-dialog title="增加银行卡识别信息" :visible.sync="isShowAdd" :before-close="cancelAdd" width="500px" center>
            <div class="form-content" style="margin: 0 auto;width: 90%;">
                <el-form ref="addDataForm" :model="addDataForm" label-width="120px">
                    <el-form-item :rules="[{ required: true}]" label="银行卡号标识：">
                        <el-input type="number" v-model.trim="addDataForm.cardNoMark" maxlength="10" placeholder="不超过10位纯数字">
                        </el-input>
                    </el-form-item>
                    <el-form-item :rules="[{ required: true}]" label="银行名称：">
                        <el-input clearable v-model.trim="addDataForm.bankName" maxlength="32" placeholder="不超过32位"></el-input>
                    </el-form-item>
                    <el-form-item :rules="[{ required: true}]" label="银行卡类型：">
                        <el-select clearable v-model="addDataForm.cardType" style="width: 285px;" placeholder="银行卡类型">
                            <el-option v-for="item in cardTypeList" :key="item.cardType" :label="item.name" :value="item.cardType">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item :rules="[{ required: true}]" label="银行卡说明：">
                        <el-input clearable v-model.trim="addDataForm.cardExplain" maxlength="32" placeholder="不超过32位"></el-input>
                    </el-form-item>
                    <el-form-item :rules="[{ required: true}]" label="银行代码：">
                        <el-input clearable v-model.trim="addDataForm.bankCode" maxlength="15" placeholder="不超过15位"></el-input>
                    </el-form-item>
                    <el-form-item :rules="[{ required: true}]" label="银行编号：">
                        <el-input clearable v-model.trim="addDataForm.bankNumber" maxlength="32" placeholder="不超过32位"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitAdd">确 定</el-button>
                <el-button @click="cancelAdd">取 消</el-button>
            </span>
        </el-dialog>

        <!--编辑-->
        <el-dialog title="编辑银行卡识别信息" :visible.sync="isShowEdit" :before-close="cancelEdit" width="500px" center>
            <div class="form-content" style="margin: 0 auto;width: 90%;">
                <el-form ref="editDataForm" :model="editDataForm" label-width="120px">
                    <el-form-item :rules="[{ required: true}]" label="银行卡号标识：">
                        <el-input type="number" v-model.trim="editDataForm.cardNoMark" maxlength="10" placeholder="不超过10位纯数字">
                        </el-input>
                    </el-form-item>
                    <el-form-item :rules="[{ required: true}]" label="银行名称：">
                        <el-input clearable v-model.trim="editDataForm.bankName" maxlength="32" placeholder="不超过32位"></el-input>
                    </el-form-item>
                    <el-form-item :rules="[{ required: true}]" label="银行卡类型：">
                        <el-select clearable v-model="editDataForm.cardType" style="width: 285px;" placeholder="银行卡类型">
                            <el-option v-for="item in cardTypeList" :key="item.cardType" :label="item.name" :value="item.cardType">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item :rules="[{ required: true}]" label="银行卡说明：">
                        <el-input clearable v-model.trim="editDataForm.cardExplain" maxlength="32" placeholder="不超过32位"></el-input>
                    </el-form-item>
                    <el-form-item :rules="[{ required: true}]" label="银行代码：">
                        <el-input clearable v-model.trim="editDataForm.bankCode" maxlength="15" placeholder="不超过15位"></el-input>
                    </el-form-item>
                    <el-form-item :rules="[{ required: true}]" label="银行编号：">
                        <el-input clearable v-model.trim="editDataForm.bankNumber" maxlength="32" placeholder="不超过32位"></el-input>
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
            // 增加
            addDataForm: {},
            searchDataForm: {},
            cardTypeList: [
                {
                    cardType: '1',
                    name: '借记卡'
                },
                {
                    cardType: '2',
                    name: '贷记卡'
                },
                {
                    cardType: '3',
                    name: '准贷记卡'
                },
                {
                    cardType: '4',
                    name: '预付费卡'
                }
            ],
            // 编辑
            editDataForm: {
                id: '',
                cardNoMark: '',
                bankName: '',
                cardType: '',
                cardExplain: '',
                bankCode: '',
                bankNumber: ''
            }
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
                        .$httpGet('/admin/epay/bankCard/deleteBin', {
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
            this.$httpGet('/admin/epay/bankCard/index', {
                pageNo: this.cur_page,
                pageSize: 10,
                cardNoMark: this.searchDataForm.cardNoMark,
                bankName: this.searchDataForm.bankName,
                cardType: this.searchDataForm.cardType
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
            if (!this.addDataForm.cardNoMark) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '银行卡号标识不能为空！'
                })
                return false
            }
            if (!/^\d{1,10}$/.test(vm.addDataForm.cardNoMark)) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '银行卡号标识不超过10位纯数字！'
                })
                return false
            }
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
            if (!this.addDataForm.cardType) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '银行卡类型不能为空！'
                })
                return false
            }
            if (!this.addDataForm.cardExplain) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '银行卡说明不能为空！'
                })
                return false
            }
            if (this.addDataForm.cardExplain.length > 32) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '银行卡说明不超过32位！'
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
            if (!this.addDataForm.bankNumber) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '银行编号不能为空！'
                })
                return false
            }
            if (this.addDataForm.bankNumber.length > 32) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '银行编号不超过32位！'
                })
                return false
            }
            this.$httpPost('/admin/epay/bankCard/saveBin', {
                cardNoMark: this.addDataForm.cardNoMark,
                bankName: this.addDataForm.bankName,
                cardType: this.addDataForm.cardType,
                cardExplain: this.addDataForm.cardExplain,
                bankCode: this.addDataForm.bankCode,
                bankNumber: this.addDataForm.bankNumber,
                uniBankNumId: this.addDataForm.uniBankNumId
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
            this.editDataForm.cardNoMark = row.cardNoMark
            this.editDataForm.bankName = row.bankName
            this.editDataForm.cardType = row.cardType
            this.editDataForm.cardExplain = row.cardExplain
            this.editDataForm.bankCode = row.bankCode
            this.editDataForm.bankNumber = row.bankNumber
        },
        cancelEdit() {
            this.isShowEdit = false
        },
        submitEdit() {
            let vm = this
            if (!this.editDataForm.cardNoMark) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '银行卡号标识不能为空！'
                })
                return false
            }
            if (!/^\d{1,10}$/.test(vm.editDataForm.cardNoMark)) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '银行卡号标识不超过10位纯数字！'
                })
                return false
            }
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
            if (!this.editDataForm.cardType) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '银行卡类型不能为空！'
                })
                return false
            }
            if (!this.editDataForm.cardExplain) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '银行卡说明不能为空！'
                })
                return false
            }
            if (this.editDataForm.cardExplain.length > 32) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '银行卡说明不超过32位！'
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
            if (!this.editDataForm.bankNumber) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '银行编号不能为空！'
                })
                return false
            }
            if (this.editDataForm.bankNumber.length > 32) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '银行编号不超过32位！'
                })
                return false
            }
            this.$httpPost('/admin/epay/bankCard/updateBin', {
                id: this.editDataForm.id,
                cardNoMark: this.editDataForm.cardNoMark,
                bankName: this.editDataForm.bankName,
                cardType: this.editDataForm.cardType,
                cardExplain: this.editDataForm.cardExplain,
                bankCode: this.editDataForm.bankCode,
                bankNumber: this.editDataForm.bankNumber,
                uniBankNumId: this.editDataForm.uniBankNumId
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
