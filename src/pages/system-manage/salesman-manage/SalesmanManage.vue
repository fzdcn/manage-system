<template>
    <div class="table">
        <div class="container">
            <div class="add" style="margin-bottom: 30px;">
                <el-button type="primary" size="medium" icon="el-icon-plus" @click="add">增加</el-button>
            </div>
            <el-table v-loading="loading" :data="getDataList" border style="width: 100%;">
                <el-table-column show-overflow-tooltip prop="code" label="编号">
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="name" label="名字">
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="phone" label="电话">
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="email" label="邮箱">
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="type" label="业务员类型">
                    <template slot-scope="scope">
                        <span v-if="scope.row.type==item.type" v-for="item in salesmanTypeList">{{item.name}}</span>
                    </template>
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="status" label="状态">
                    <template slot-scope="scope">
                        <span v-if="scope.row.status==item.status" v-for="item in salesmanStatusList">{{item.name}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="操作" width="200px">
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
        <!--增加后台业务员-->
        <el-dialog title="增加后台业务员" :visible.sync="isShowAdd" :before-close="cancelAdd" width="500px" center>
            <div class="form-content" style="margin: 0 auto;width: 90%;">
                <el-form ref="addDataForm" :model="addDataForm" label-width="110px">
                    <el-form-item :rules="[{ required: true}]" label="名字：">
                        <el-input clearable v-model.trim="addDataForm.name" maxlength="10" placeholder="名称只能是10位以内汉字"></el-input>
                    </el-form-item>
                    <el-form-item :rules="[{ required: true}]" label="电话：">
                        <el-input clearable v-model.trim="addDataForm.phone" placeholder="电话"></el-input>
                    </el-form-item>
                    <el-form-item :rules="[{ required: true}]" label="邮箱：">
                        <el-input clearable v-model.trim="addDataForm.email" maxlength="20" placeholder="邮箱"></el-input>
                    </el-form-item>
                    <el-form-item :rules="[{ required: true}]" label="业务员类型：">
                        <el-select clearable v-model="addDataForm.type" style="width: 295px;" placeholder="业务员类型">
                            <el-option v-for="item in salesmanTypeList" :key="item.type" :label="item.name" :value="item.type">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitAdd">确 定</el-button>
                <el-button @click="cancelAdd">取 消</el-button>
            </span>
        </el-dialog>

        <!--编辑后台业务员-->
        <el-dialog title="编辑后台业务员" :visible.sync="isShowEdit" :before-close="cancelEdit" width="500px" center>
            <div class="form-content" style="margin: 0 auto;width: 90%;">
                <el-form ref="editDataForm" :model="editDataForm" label-width="110px">
                    <el-form-item :rules="[{ required: true}]" label="名字：">
                        <el-input clearable v-model.trim="editDataForm.name" maxlength="10" placeholder="名称只能是10位以内汉字"></el-input>
                    </el-form-item>
                    <el-form-item :rules="[{ required: true}]" label="电话：">
                        <el-input clearable v-model.trim="editDataForm.phone" placeholder="电话"></el-input>
                    </el-form-item>
                    <el-form-item :rules="[{ required: true}]" label="邮箱：">
                        <el-input clearable v-model.trim="editDataForm.email" maxlength="20" placeholder="邮箱"></el-input>
                    </el-form-item>
                    <el-form-item :rules="[{ required: true}]" label="业务员类型：">
                        <el-select clearable v-model="editDataForm.type" style="width: 295px;" placeholder="业务员类型">
                            <el-option v-for="item in salesmanTypeList" :key="item.type" :label="item.name" :value="item.type">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item :rules="[{ required: true}]" label="状态：">
                        <el-select clearable v-model="editDataForm.status" style="width: 295px;" placeholder="状态">
                            <el-option v-for="item in salesmanStatusList" :key="item.status" :label="item.name" :value="item.status">
                            </el-option>
                        </el-select>
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
import { regTel, regEmail } from '../../../functions/index'

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
            // 增加后台业务员参数
            addDataForm: {},
            salesmanTypeList: [
                {
                    type: 1,
                    name: '销售'
                },
                {
                    type: 2,
                    name: '客服'
                }
            ],
            salesmanStatusList: [
                {
                    status: 1,
                    name: '开通'
                },
                {
                    status: 2,
                    name: '关闭'
                }
            ],
            // 编辑后台角色参数
            editDataForm: {
                code: '',
                name: '',
                phone: '',
                email: '',
                type: '',
                status: ''
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
                        .$httpGet('/admin/epay/salesman/delete', {
                            code: row.code
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
            this.$httpGet('/admin/epay/salesman/index', {
                pageNo: this.cur_page,
                pageSize: 10
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
            if (!this.addDataForm.name) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '名字不能为空！'
                })
                return false
            }
            if (!/^[\u4e00-\u9fa5]{1,10}$/.test(vm.addDataForm.name)) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '名字只能是10位以内汉字！'
                })
                return false
            }
            if (!this.addDataForm.phone) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '电话不能为空！'
                })
                return false
            }
            if (!regTel.test(this.addDataForm.phone)) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '电话格式不正确！！'
                })
                return false
            }
            if (!this.addDataForm.email) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '邮箱不能为空！'
                })
                return false
            }
            if (this.addDataForm.email.length > 20) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '邮箱长度不超过20位！'
                })
                return false
            }
            if (!regEmail.test(this.addDataForm.email)) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '邮箱格式不正确！'
                })
                return false
            }
            if (!this.addDataForm.type) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '业务员类型不能为空！'
                })
                return false
            }
            this.$httpPost('/admin/epay/salesman/save', {
                name: this.addDataForm.name,
                phone: this.addDataForm.phone,
                email: this.addDataForm.email,
                type: this.addDataForm.type
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
            this.editDataForm.code = row.code
            this.editDataForm.name = row.name
            this.editDataForm.phone = row.phone
            this.editDataForm.email = row.email
            this.editDataForm.type = row.type
            this.editDataForm.status = row.status
        },
        cancelEdit() {
            this.isShowEdit = false
        },
        submitEdit() {
            let vm = this
            if (!/^[\u4e00-\u9fa5]{1,10}$/.test(vm.editDataForm.name)) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '名字只能是10位以内汉字！'
                })
                return false
            }
            if (!this.editDataForm.phone) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '电话不能为空！'
                })
                return false
            }
            if (!regTel.test(this.editDataForm.phone)) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '电话格式不正确！！'
                })
                return false
            }
            if (!this.editDataForm.email) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '邮箱不能为空！'
                })
                return false
            }
            if (this.editDataForm.email.length > 20) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '邮箱长度不超过20位！'
                })
                return false
            }
            if (!regEmail.test(this.editDataForm.email)) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '邮箱格式不正确！'
                })
                return false
            }
            if (!this.editDataForm.type) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '业务员类型不能为空！'
                })
                return false
            }
            if (!this.editDataForm.status) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '状态不能为空！'
                })
                return false
            }
            this.$httpPost('/admin/epay/salesman/update', {
                code: this.editDataForm.code,
                name: this.editDataForm.name,
                phone: this.editDataForm.phone,
                email: this.editDataForm.email,
                type: this.editDataForm.type,
                status: this.editDataForm.status
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
