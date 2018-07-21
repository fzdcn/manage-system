<template>
    <div class="table">
        <div class="container">
            <div class="add" style="margin-bottom: 30px;">
                <el-button type="primary" size="medium" icon="el-icon-plus" @click="add">增加</el-button>
            </div>
            <div class="handle-box clearfix" style="margin-bottom: 20px;">
                <div style="margin: 0px 20px 10px 0;float: left;">
                    <span>用户名：</span>
                    <el-input style="width: 150px;" class="username" v-model.trim="searchDataForm.username" clearable placeholder="请填写用户名">
                    </el-input>
                </div>
                <div style="margin: 0px 20px 10px 0;float: left;">
                    <span>状态：</span>
                    <el-select clearable style="width: 150px;" v-model="searchDataForm.status" placeholder="请选择状态">
                        <el-option v-for="item in roleStatus" :key="item.status" :label="item.name" :value="item.status">
                        </el-option>
                    </el-select>
                </div>
                <div style="margin: 0px 20px 10px 0;float: left;">
                    <span>角色：</span>
                    <el-select clearable style="width: 150px;" v-model="searchDataForm.role" placeholder="请选择角色">
                        <el-option v-for="item in roleList" :key="item.id" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <div style="float: left;">
                    <el-button type="primary" icon="el-icon-search" @click="handleCurrentChange(1)">搜索</el-button>
                </div>
            </div>
            <el-table :data="getDataList" border style="width: 100%;">
                <el-table-column show-overflow-tooltip prop="id" label="ID">
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="username" label="用户名">
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="roleName" label="角色">
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="name" label="姓名">
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="phone" label="手机号码">
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="email" label="邮箱">
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="loginDate" label="最后登录时间" sortable :formatter="loginDateFormatter">
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="status" label="状态" :formatter="statusFormatter">
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="lockedOrNo" label="是否被锁" :formatter="lockedOrNoFormatter">
                </el-table-column>
                <el-table-column label="操作" width="300px" align="center">
                    <template v-if="getDataList.length > 0" slot-scope="scope">
                        <el-button @click="handleEdit(scope.row)" type="primary" icon="el-icon-edit" size="small">编辑
                        </el-button>
                        <el-button @click="handleModify(scope.row)" type="primary" icon="el-icon-setting" size="small">修改密码
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
        <!--增加后台账户-->
        <el-dialog title="增加后台账户" :visible.sync="isShowAdd" :before-close="cancelAdd" width="500px" center>
            <div class="form-content" style="margin: 0 auto;width: 90%;">
                <el-form ref="addDataForm" :model="addDataForm" label-width="100px">
                    <el-form-item label="用户名：">
                        <el-input clearable v-model.trim="addDataForm.username" maxlength="15" placeholder="只能是15位以内英文或英文加数字组合"></el-input>
                    </el-form-item>
                    <el-form-item label="密码：">
                        <el-input clearable type="password" v-model.trim="addDataForm.password" maxlength="15" placeholder="长度不超过20位的字母数字组合"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码：">
                        <el-input clearable type="password" v-model.trim="addDataForm.confirmPassword" maxlength="15" placeholder="长度不超过20位的字母数字组合"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名：">
                        <el-input clearable v-model.trim="addDataForm.name" maxlength="10" placeholder="姓名只能是10位以内汉字"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号码：">
                        <el-input clearable type="tel" v-model.trim="addDataForm.telephone" placeholder="请输入手机号码"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱：">
                        <el-input clearable type="email" v-model.trim="addDataForm.email" placeholder="邮箱"></el-input>
                    </el-form-item>
                    <el-form-item label="角色：">
                        <el-select clearable v-model="addDataForm.selectedRole" placeholder="请选择角色">
                            <el-option v-for="item in roleList" :key="item.id" :label="item.name" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="U盾值：">
                        <el-input clearable v-model.trim="addDataForm.uTypeShield" placeholder="请输入U盾值"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitAdd">确 定</el-button>
                <el-button @click="cancelAdd">取 消</el-button>
            </span>
        </el-dialog>

        <!--修改密码-->
        <el-dialog title="修改密码" :visible.sync="isShowModify" :before-close="cancelModify" width="500px" center>
            <div class="form-content" style="margin: 0 auto;width: 90%;">
                <el-form ref="modifyDataForm" :model="modifyDataForm" label-width="100px">
                    <el-form-item label="用户名：">
                        <el-input clearable v-model.trim="modifyDataForm.username" maxlength="15" placeholder="最长15位" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="密码：">
                        <el-input clearable type="password" v-model.trim="modifyDataForm.password" maxlength="20" placeholder="长度不超过20位的字母数字组合"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码：">
                        <el-input clearable type="password" v-model.trim="modifyDataForm.confirmPassword" maxlength="20" placeholder="长度不超过20位的字母数字组合"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitModify">修改密码</el-button>
                <el-button @click="cancelModify">取 消</el-button>
            </span>
        </el-dialog>

        <!--编辑后台账户-->
        <el-dialog title="编辑后台账户" :visible.sync="isShowEdit" :before-close="cancelEdit" width="500px" center>
            <div class="form-content" style="margin: 0 auto;width: 90%;">
                <el-form ref="editDataForm" :model="editDataForm" label-width="100px">
                    <el-form-item label="用户名：">
                        <el-input clearable v-model.trim="editDataForm.username" maxlength="15" placeholder="只能是15位以内英文或英文加数字组合" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名：">
                        <el-input clearable v-model.trim="editDataForm.name" maxlength="10" placeholder="姓名只能是10位以内汉字"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号码：">
                        <el-input clearable type="tel" v-model.trim="editDataForm.phone" placeholder="手机号码"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱：">
                        <el-input clearable type="email" v-model.trim="editDataForm.email" placeholder="邮箱"></el-input>
                    </el-form-item>
                    <el-form-item label="角色：">
                        <el-select clearable v-model="editDataForm.roleId" placeholder="角色">
                            <el-option v-for="item in roleList" :key="item.id" :label="item.name" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="状态：">
                        <el-select clearable v-model="editDataForm.status" placeholder="状态">
                            <el-option v-for="item in roleStatus" :key="item.status" :label="item.name" :value="item.status">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="锁定状态：">
                        <el-select clearable v-model="editDataForm.lockedOrNo" placeholder="锁定状态">
                            <el-option v-for="item in roleLockedOrNo" :key="item.lockedOrNo" :label="item.name" :value="item.lockedOrNo">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="U盾值：">
                        <el-input clearable v-model.trim="editDataForm.passId" placeholder="U盾值"></el-input>
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
            paginationShow: true,
            getDataList: [
                /*{
                        email: "",
                        id: '',
                        lockedOrNo: '',
                        name: "",
                        passId: "",
                        phone: "",
                        roleId: '',
                        roleName: "",
                        status: '',
                        username: "",
                        loginDate: ""
                    }*/
            ],
            searchDataForm: {
                username: '',
                status: '',
                role: ''
            },
            // 角色列表
            roleList: [],
            // 状态列表
            roleStatus: [
                {
                    status: 0,
                    name: '申请中'
                },
                {
                    status: 1,
                    name: '开放中'
                },
                {
                    status: 2,
                    name: '冻结中'
                }
            ],
            // 开放状态
            roleLockedOrNo: [
                {
                    lockedOrNo: false,
                    name: '未锁定'
                },
                {
                    lockedOrNo: true,
                    name: '已锁定'
                }
            ],
            // 当前页
            cur_page: 1,
            // 所有数量
            total: null,
            isShowAdd: false,
            isShowModify: false,
            isShowEdit: false,
            // 增加后台账户参数
            addDataForm: {},
            // 修改后台账户参数
            modifyDataForm: {},
            // 编辑后台账户参数
            editDataForm: {
                id: '',
                username: '',
                name: '',
                phone: '',
                email: '',
                // 被选中的角色
                roleId: '',
                // 被选中的状态
                status: '',
                // 是否被锁定
                lockedOrNo: '',
                // U盾
                passId: ''
            }
        }
    },
    methods: {
        getRoleList() {
            let vm = this
            return this.$httpGet('/admin/admin/getAdminRoleList', {})
        },
        // 分页导航
        handleCurrentChange(val) {
            this.cur_page = val
            this.paginationShow = false
            this.dataList()
        },
        handleDelete(row) {
            let vm = this
            let id = row.id
            this.$confirm('确认删除吗?', '删除', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    vm
                        .$httpGet('/admin/admin/deleteLogic', {
                            id: id
                        })
                        .then(data => {
                            vm.$notify.success({
                                duration: 2000,
                                title: '成功',
                                message: data.message
                            })
                            vm.dataList()
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
        dataList() {
            let vm = this
            this.$httpGet('/admin/admin/index', {
                pageNo: this.cur_page,
                pageSize: 10,
                userName: this.searchDataForm.username,
                status: this.searchDataForm.status,
                roleId: this.searchDataForm.role
            })
                .then(({ data }) => {
                    vm.getDataList = data.page.list
                    vm.total = data.page.total
                    vm.paginationShow = true
                })
                .catch(data => {
                    console.log(data)
                })
        },
        getData() {
            return this.$httpGet('/admin/admin/index', {
                pageNo: this.cur_page,
                pageSize: 10,
                userName: this.searchDataForm.username,
                status: this.searchDataForm.status,
                roleId: this.searchDataForm.role
            })
        },
        statusFormatter(row, column) {
            let status = row.status
            switch (status) {
                case 0:
                    return '申请中'
                    break
                case 1:
                    return '开放中'
                    break
                case 2:
                    return '冻结中'
                    break
            }
        },
        lockedOrNoFormatter(row, column) {
            let lockedOrNo = row.lockedOrNo
            if (lockedOrNo) {
                return '已被锁'
            } else if (lockedOrNo === false) {
                return '未被锁'
            }
        },
        loginDateFormatter(row, column) {
            let loginDate = row.loginDate
            if (loginDate)
                return this.$moment(loginDate).format('YYYY-MM-DD HH:mm:ss')
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
            if (!this.addDataForm.username) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '用户名不能为空！'
                })
                return false
            }
            if (
                !/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{1,15}$/.test(
                    vm.addDataForm.username
                ) &&
                !/^[A-Za-z]{1,15}$/.test(vm.addDataForm.username)
            ) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '用户名只能是15位以内英文或英文加数字组合！'
                })
                return false
            }
            if (!this.addDataForm.password) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '密码不能为空！'
                })
                return false
            }
            if (
                !/^(?![^a-zA-Z]+$)(?!\D+$){1,20}/.test(vm.addDataForm.password)
            ) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '密码长度不超过20位的字母数字组合！'
                })
                return false
            }
            if (!this.addDataForm.confirmPassword) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '确认密码不能为空！'
                })
                return false
            }
            if (
                !/^(?![^a-zA-Z]+$)(?!\D+$){1,20}/.test(
                    vm.addDataForm.confirmPassword
                )
            ) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '确认密码长度不超过20位的字母数字组合！'
                })
                return false
            }
            if (this.addDataForm.password != this.addDataForm.confirmPassword) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '两次输入密码不一致！'
                })
                return false
            }
            if (!this.addDataForm.name) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '姓名不能为空！'
                })
                return false
            }
            if (!/^[\u4e00-\u9fa5]{1,10}$/.test(vm.addDataForm.name)) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '姓名只能是10位以内汉字！'
                })
                return false
            }
            if (!this.addDataForm.telephone) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '手机号码不能为空！'
                })
                return false
            }
            if (!regTel.test(this.addDataForm.telephone)) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '手机号码格式不正确！'
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
            if (!regEmail.test(this.addDataForm.email)) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '邮箱格式不正确！'
                })
                return false
            }
            if (!this.addDataForm.selectedRole) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '角色不能为空！'
                })
                return false
            }
            this.$httpPost('/admin/admin/save', {
                username: this.addDataForm.username,
                pwd: this.addDataForm.password,
                name: this.addDataForm.name,
                phone: this.addDataForm.telephone,
                email: this.addDataForm.email,
                roleId: this.addDataForm.selectedRole,
                passId: this.addDataForm.uTypeShield
            })
                .then(data => {
                    vm.$notify.success({
                        duration: 2000,
                        title: '成功',
                        message: data.message
                    })
                    vm.cancelAdd()
                    vm
                        .$httpGet('/admin/admin/index', {
                            pageNo: 1,
                            pageSize: 10,
                            userName: '',
                            status: '',
                            roleId: ''
                        })
                        .then(({ data }) => {
                            vm.getDataList = data.page.list
                            vm.total = data.page.total
                            vm.handleCurrentChange(1)
                        })
                        .catch(data => {
                            console.log(data)
                        })
                })
                .catch(data => {
                    console.log(data)
                })
        },
        handleModify(row) {
            this.isShowModify = true
            this.modifyDataForm.id = row.id
            this.modifyDataForm.username = row.username
        },
        cancelModify() {
            this.isShowModify = false
            this.modifyDataForm = {}
        },
        submitModify() {
            let vm = this
            if (!this.modifyDataForm.password) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '密码不能为空！'
                })
                return false
            }
            if (
                !/^(?![^a-zA-Z]+$)(?!\D+$){1,20}/.test(
                    vm.modifyDataForm.password
                )
            ) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '密码长度不超过20位的字母数字组合！'
                })
                return false
            }
            if (!this.modifyDataForm.confirmPassword) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '确认密码不能为空！'
                })
                return false
            }
            if (
                !/^(?![^a-zA-Z]+$)(?!\D+$){1,20}/.test(
                    vm.modifyDataForm.confirmPassword
                )
            ) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '确认密码长度不超过20位的字母数字组合！'
                })
                return false
            }
            if (
                this.modifyDataForm.password !=
                this.modifyDataForm.confirmPassword
            ) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '两次输入密码不一致！'
                })
                return false
            }
            this.$httpPost('/admin/admin/updatePwd', {
                id: this.modifyDataForm.id,
                newPwd: this.modifyDataForm.confirmPassword
            })
                .then(data => {
                    vm.$notify.success({
                        duration: 2000,
                        title: '成功',
                        message: data.message
                    })
                    vm.cancelModify()
                })
                .catch(data => {
                    console.log(data)
                })
        },
        handleEdit(row) {
            this.isShowEdit = true
            this.editDataForm.id = row.id
            this.editDataForm.username = row.username
            this.editDataForm.name = row.name
            this.editDataForm.phone = row.phone
            this.editDataForm.email = row.email
            this.editDataForm.roleId = row.roleId
            this.editDataForm.status = row.status
            this.editDataForm.lockedOrNo = row.lockedOrNo
            this.editDataForm.passId = row.passId
        },
        cancelEdit() {
            this.isShowEdit = false
        },
        submitEdit() {
            let vm = this
            if (!this.editDataForm.name) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '姓名不能为空！'
                })
                return false
            }
            if (!/^[\u4e00-\u9fa5]{1,10}$/.test(vm.editDataForm.name)) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '姓名只能是10位以内汉字！'
                })
                return false
            }
            if (!this.editDataForm.phone) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '手机号码不能为空！'
                })
                return false
            }
            if (!regTel.test(this.editDataForm.phone)) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '手机号码格式不正确！'
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
            if (!regEmail.test(this.editDataForm.email)) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '邮箱格式不正确！'
                })
                return false
            }
            if (!this.editDataForm.roleId) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '角色不能为空！'
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
            if (!this.editDataForm.lockedOrNo) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '锁定状态不能为空！'
                })
                return false
            }
            this.$httpPost('/admin/admin/update', {
                id: this.editDataForm.id,
                name: this.editDataForm.name,
                phone: this.editDataForm.phone,
                email: this.editDataForm.email,
                roleId: this.editDataForm.roleId,
                status: this.editDataForm.status,
                lockedOrNo: this.editDataForm.lockedOrNo,
                passId: this.editDataForm.passId
            })
                .then(data => {
                    vm.$notify.success({
                        duration: 2000,
                        title: '成功',
                        message: data.message
                    })
                    vm.cancelEdit()
                    vm.dataList()
                })
                .catch(data => {
                    console.log(data)
                })
        },
        async getAllData() {
            let vm = this
            await Promise.all([vm.getRoleList(), vm.getData()])
                .then(data => {
                    vm.roleList = data[0].data
                    vm.getDataList = data[1].data.page.list
                    vm.total = data[1].data.page.total
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
