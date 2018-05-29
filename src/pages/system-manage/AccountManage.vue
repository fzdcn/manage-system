<template>
    <div class="table">
        <div class="container">
            <div class="add">
                <el-button type="primary" size="medium" @click="add">增加</el-button>
            </div>
            <div class="handle-box">
                <div>
                    <span>用户名：</span>
                    <el-input style="width: 150px;" class="username" v-model.trim="searchUserAccountForm.username"
                              clearable></el-input>
                </div>
                <div>
                    <span>状态：</span>
                    <el-select style="width: 150px;" v-model="searchUserAccountForm.status" placeholder="请选择状态">
                        <el-option
                            v-for="item in roleStatus"
                            :key="item.status"
                            :label="item.name"
                            :value="item.status">
                        </el-option>
                    </el-select>
                </div>
                <div>
                    <span>角色：</span>
                    <el-select style="width: 150px;" v-model="searchUserAccountForm.role" placeholder="请选择角色">
                        <el-option
                            v-for="item in roleList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <div>
                    <el-button type="primary" icon="search" @click="search">搜索</el-button>
                </div>
            </div>
            <el-table :data="accountData" border style="width: 100%">
                <el-table-column prop="id" label="ID">
                </el-table-column>
                <el-table-column prop="username" label="用户名">
                </el-table-column>
                <el-table-column prop="roleName" label="角色">
                </el-table-column>
                <el-table-column prop="name" label="姓名">
                </el-table-column>
                <el-table-column prop="phone" label="手机号码">
                </el-table-column>
                <el-table-column prop="loginDate" label="最后登录时间" sortable :formatter="loginDateFormatter">
                </el-table-column>
                <el-table-column prop="status" label="状态" :formatter="statusFormatter">
                </el-table-column>
                <el-table-column prop="lockedOrNo" label="是否被锁" :formatter="lockedOrNoFormatter">
                </el-table-column>
                <el-table-column label="操作" width="250px">
                    <template slot-scope="scope">
                        <el-button @click="handleEdit(scope.row)" type="primary" size="small">编辑
                        </el-button>
                        <el-button @click="handleModifyPassword(scope.row)" type="primary" size="small">修改密码</el-button>
                        <el-button @click="handleDelete(scope.row)" type="danger" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next"
                               :page-size="10" :pager-count="11" :total="total">
                </el-pagination>
            </div>
        </div>
        <!--增加后台账户-->
        <el-dialog title="增加后台账户" :visible.sync="isShowAccount" :before-close="cancelShowAccount" width="500px" center>
            <div class="form-content">
                <el-form ref="addUserAccountForm" :model="addUserAccountForm" label-width="100px">
                    <el-form-item label="用户名：">
                        <el-input v-model.trim="addUserAccountForm.username"></el-input>
                    </el-form-item>
                    <el-form-item label="密码：">
                        <el-input type="password" v-model.trim="addUserAccountForm.password"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码：">
                        <el-input type="password" v-model.trim="addUserAccountForm.confirmPassword"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名：">
                        <el-input v-model.trim="addUserAccountForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号码：">
                        <el-input type="tel" v-model.trim="addUserAccountForm.telephone"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱：">
                        <el-input type="email" v-model.trim="addUserAccountForm.email"></el-input>
                    </el-form-item>
                    <el-form-item label="角色：">
                        <el-select v-model="addUserAccountForm.selectedRole" placeholder="角色">
                            <el-option
                                v-for="item in roleList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="U盾值：">
                        <el-input v-model.trim="addUserAccountForm.uTypeShield"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelShowAccount">取 消</el-button>
                <el-button type="primary" @click="accountVerification">确 定</el-button>
            </span>
        </el-dialog>

        <!--修改密码-->
        <el-dialog title="修改密码" :visible.sync="isShowModifyPassword" width="500px" center>
            <div class="form-content">
                <el-form ref="modifyUserAccountForm" :model="modifyUserAccountForm" label-width="100px">
                    <el-form-item label="用户名：">
                        <el-input v-model.trim="username" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="密码：">
                        <el-input type="password" v-model.trim="modifyUserAccountForm.password"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码：">
                        <el-input type="password" v-model.trim="modifyUserAccountForm.confirmPassword"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelShowModifyPassword">取 消</el-button>
                <el-button type="primary" @click="modifyPassword">修改密码</el-button>
            </span>
        </el-dialog>

        <!--编辑后台账户-->
        <el-dialog title="修改后台账户" :visible.sync="isShowEdit" width="500px" center>
            <div class="form-content">
                <el-form ref="editUserAccountForm" :model="editUserAccountForm" label-width="100px">
                    <el-form-item label="用户名：">
                        <el-input v-model.trim="editUserAccountForm.username" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名：">
                        <el-input v-model.trim="editUserAccountForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号码：">
                        <el-input type="tel" v-model.trim="editUserAccountForm.phone"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱：">
                        <el-input type="email" v-model.trim="editUserAccountForm.email"></el-input>
                    </el-form-item>
                    <el-form-item label="角色：">
                        <el-select v-model="editUserAccountForm.roleId" placeholder="角色">
                            <el-option
                                v-for="item in roleList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="状态：">
                        <el-select v-model="editUserAccountForm.status" placeholder="状态">
                            <el-option
                                v-for="item in roleStatus"
                                :key="item.status"
                                :label="item.name"
                                :value="item.status">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="锁定状态：">
                        <el-select v-model="editUserAccountForm.lockedOrNo" placeholder="锁定状态">
                            <el-option
                                v-for="item in roleLockedOrNo"
                                :key="item.lockedOrNo"
                                :label="item.name"
                                :value="item.lockedOrNo">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="U盾值：">
                        <el-input v-model.trim="editUserAccountForm.passId"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelShowEdit">取 消</el-button>
                <el-button type="primary" @click="editUserInfo">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import {regTel, regEmail, regIdCode} from '../../functions/index';

    export default {
        data() {
            return {
                accountData: [
                    {
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
                    }
                ],
                searchUserAccountForm: {
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
                    }, {
                        status: 1,
                        name: '开放中'
                    }, {
                        status: 2,
                        name: '冻结中'
                    }
                ],
                // 开放状态
                roleLockedOrNo: [
                    {
                        lockedOrNo: false,
                        name: '未锁定'
                    }, {
                        lockedOrNo: true,
                        name: '已锁定'
                    }
                ],
                // 当前页
                cur_page: 1,
                // 所有数量
                total: null,
                // 是否显示增加后台账户弹框
                isShowAccount: false,
                // 是否显示修改密码弹框
                isShowModifyPassword: false,
                // 是否显示编辑弹框
                isShowEdit: false,
                userId: '',
                username: '',
                // 增加后台账户参数
                addUserAccountForm: {
                    username: '',
                    password: '',
                    confirmPassword: '',
                    name: '',
                    telephone: '',
                    email: '',
                    // 被选中的角色
                    selectedRole: '',
                    // U盾
                    uTypeShield: ''
                },
                // 修改后台账户参数
                modifyUserAccountForm: {
                    password: '',
                    confirmPassword: ''
                },
                // 编辑后台账户参数
                editUserAccountForm: {
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
                },
            }
        },
        methods: {
            getRoleList() {
                let vm = this;
                this.$httpGet('/admin/admin/getAdminRoleList', {}).then(({data}) => {
                    vm.roleList = data;
                }).catch((data) => {
                    console.log(data.error)
                })
            },
            // 分页导航
            handleCurrentChange(val) {
                this.cur_page = val;
                this.getData();
            },
            handleDelete(row) {
                let vm = this;
                let id = row.id;
                this.$confirm('确认删除吗?', '删除', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    vm.$httpGet('/admin/admin/deleteLogic', {
                        id: id
                    }).then(({data}) => {
                        vm.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        vm.getData();
                    }).catch((data) => {
                        console.log(data.error)
                    })
                }).catch(() => {
                    vm.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            getData() {
                let vm = this;
                this.$httpGet('/admin/admin/index', {
                    pageNo: this.cur_page,
                    pageSize: 10,
                    userName: '',
                    status: '',
                    roleId: ''
                }).then(({data}) => {
                    vm.accountData = data.page.list;
                    vm.total = data.page.total;
                }).catch((data) => {
                    console.log(data.error)
                })
            },
            statusFormatter(row, column) {
                let status = row.status;
                switch (status) {
                    case 0:
                        return '申请中';
                        break;
                    case 1:
                        return '开放中';
                        break;
                    case 2:
                        return '冻结中';
                        break;
                }
            },
            lockedOrNoFormatter(row, column) {
                let lockedOrNo = row.lockedOrNo;
                if (lockedOrNo) {
                    return '被锁';
                } else {
                    return '未被锁';
                }
            },
            loginDateFormatter(row, column) {
                let loginDate = row.loginDate;
                return loginDate ? this.$moment(loginDate).format('YYYY-MM-DD HH:mm:ss') : '暂无';
            },
            search() {
                let vm = this;
                this.$httpGet('/admin/admin/index', {
                    pageNo: 1,
                    pageSize: 10,
                    userName: this.searchUserAccountForm.username,
                    status: this.searchUserAccountForm.status,
                    roleId: this.searchUserAccountForm.role
                }).then(({data}) => {
                    vm.accountData = data.page.list;
                    vm.total = data.page.total;
                }).catch((data) => {
                    console.log(data.error)
                })
            },
            add() {
                this.isShowAccount = true;
            },
            cancelShowAccount() {
                this.isShowAccount = false;
                this.addUserAccountForm.username = '';
                this.addUserAccountForm.password = '';
                this.addUserAccountForm.confirmPassword = '';
                this.addUserAccountForm.name = '';
                this.addUserAccountForm.telephone = '';
                this.addUserAccountForm.email = '';
                this.addUserAccountForm.selectedRole = '';
                this.addUserAccountForm.uTypeShield = '';
            },
            accountVerification() {
                let vm = this;
                if (!this.addUserAccountForm.username) {
                    this.$message.warning('用户名不能为空！');
                    return false;
                }
                if (!this.addUserAccountForm.password) {
                    this.$message.warning('密码不能为空！');
                    return false;
                }
                if (!this.addUserAccountForm.confirmPassword) {
                    this.$message.warning('确认密码不能为空！');
                    return false;
                }
                if (this.addUserAccountForm.password != this.addUserAccountForm.confirmPassword) {
                    this.$message.warning('两次输入密码不一致！');
                    return false;
                }
                if (!this.addUserAccountForm.name) {
                    this.$message.warning('姓名不能为空！');
                    return false;
                }
                if (!this.addUserAccountForm.telephone) {
                    this.$message.warning('手机号码不能为空！');
                    return false;
                }
                if (!regTel.test(this.addUserAccountForm.telephone)) {
                    this.$message.warning('手机号码格式不正确！');
                    return false;
                }
                if (!this.addUserAccountForm.email) {
                    this.$message.warning('邮箱不能为空！');
                    return false;
                }
                if (!regEmail.test(this.addUserAccountForm.email)) {
                    this.$message.warning('邮箱格式不正确！');
                    return false;
                }
                if (!this.addUserAccountForm.selectedRole) {
                    this.$message.warning('角色不能为空！');
                    return false;
                }
                this.$httpPost('/admin/admin/save', {
                    username: this.addUserAccountForm.username,
                    pwd: this.addUserAccountForm.password,
                    name: this.addUserAccountForm.name,
                    phone: this.addUserAccountForm.telephone,
                    email: this.addUserAccountForm.email,
                    roleId: this.addUserAccountForm.selectedRole,
                    passId: this.addUserAccountForm.uTypeShield
                }).then(({data}) => {
                    vm.$message.success('添加后台账户成功！');
                    vm.isShowAccount = false;
                    this.addUserAccountForm.username = '';
                    this.addUserAccountForm.password = '';
                    this.addUserAccountForm.confirmPassword = '';
                    this.addUserAccountForm.name = '';
                    this.addUserAccountForm.telephone = '';
                    this.addUserAccountForm.email = '';
                    this.addUserAccountForm.selectedRole = '';
                    this.addUserAccountForm.uTypeShield = '';
                    vm.$httpGet('/admin/admin/index', {
                        pageNo: 1,
                        pageSize: 10,
                        userName: '',
                        status: '',
                        roleId: ''
                    }).then(({data}) => {
                        vm.accountData = data.page.list;
                        vm.total = data.page.total;
                    }).catch((data) => {
                        console.log(data.error)
                    })
                }).catch((data) => {
                    console.log(data.error)
                })
            },
            handleModifyPassword(row) {
                this.isShowModifyPassword = true;
                this.userId = row.id;
                this.username = row.username;
            },
            cancelShowModifyPassword() {
                this.isShowModifyPassword = false;
                this.userId = '';
                this.username = '';
                this.modifyUserAccountForm.password = '';
                this.modifyUserAccountForm.confirmPassword = '';
            },
            modifyPassword() {
                let vm = this;
                if (!this.modifyUserAccountForm.password) {
                    this.$message.warning('密码不能为空！');
                    return false;
                }
                if (!this.modifyUserAccountForm.confirmPassword) {
                    this.$message.warning('确认密码不能为空！');
                    return false;
                }
                if (this.modifyUserAccountForm.password != this.modifyUserAccountForm.confirmPassword) {
                    this.$message.warning('两次输入密码不一致！');
                    return false;
                }
                this.$httpPost('/admin/admin/updatePwd', {
                    id: this.userId,
                    newPwd: this.modifyUserAccountForm.confirmPassword
                }).then(({data}) => {
                    vm.$message.success('修改密码成功！');
                    vm.isShowModifyPassword = false;
                    this.userId = '';
                    this.username = '';
                    this.modifyUserAccountForm.password = '';
                    this.modifyUserAccountForm.confirmPassword = '';
                }).catch((data) => {
                    console.log(data.error)
                })
            },
            handleEdit(row) {
                let vm = this;
                this.isShowEdit = true;
                this.$httpGet('/admin/admin/getAdminById', {
                    id: row.id
                }).then(({data}) => {
                    vm.editUserAccountForm = data;
                }).catch((data) => {
                    console.log(data.error);
                })
            },
            cancelShowEdit() {
                this.isShowEdit = false;
            },
            editUserInfo() {
                let vm = this;
                if (!this.editUserAccountForm.name) {
                    this.$message.warning('姓名不能为空！');
                    return false;
                }
                if (!this.editUserAccountForm.phone) {
                    this.$message.warning('手机号码不能为空！');
                    return false;
                }
                if (!regTel.test(this.editUserAccountForm.phone)) {
                    this.$message.warning('手机号码格式不正确！');
                    return false;
                }
                if (!this.editUserAccountForm.email) {
                    this.$message.warning('邮箱不能为空！');
                    return false;
                }
                if (!regEmail.test(this.editUserAccountForm.email)) {
                    this.$message.warning('邮箱格式不正确！');
                    return false;
                }
                if (!this.editUserAccountForm.roleId) {
                    this.$message.warning('角色不能为空！');
                    return false;
                }
                this.$httpPost('/admin/admin/update', {
                    id: this.editUserAccountForm.id,
                    name: this.editUserAccountForm.name,
                    phone: this.editUserAccountForm.phone,
                    email: this.editUserAccountForm.email,
                    roleId: this.editUserAccountForm.roleId,
                    status: this.editUserAccountForm.status,
                    lockedOrNo: this.editUserAccountForm.lockedOrNo,
                    passId: this.editUserAccountForm.passId,
                }).then(({data}) => {
                    vm.$message.success('修改成功！');
                    vm.isShowEdit = false;
                    vm.getData();
                }).catch((data) => {
                    console.log(data.error)
                })
            }
        },
        created() {
            this.getRoleList();
            this.getData();
        }
        ,
    }

</script>

<style scoped>
    .add {
        margin-bottom: 30px;
    }

    .handle-box {
        margin-bottom: 20px;
        display: flex;
        flex-flow: row wrap;
    }

    .handle-box > div {
        margin: 0px 20px 10px 0;
    }

    .username {
        width: 150px;
    }

    .form-content {
        margin: 0 auto;
        width: 90%;
    }
</style>
