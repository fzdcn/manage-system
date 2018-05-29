<template>
    <div class="table">
        <div class="container">
            <div class="add">
                <el-button type="primary" size="medium" @click="add">增加</el-button>
            </div>
            <el-table :data="roleData" border style="width: 100%">
                <el-table-column prop="id" label="ID">
                </el-table-column>
                <el-table-column prop="name" label="角色">
                </el-table-column>
                <el-table-column prop="defaultOrNo" label="是否默认" :formatter="defaultOrNoFormatter">
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
        <el-dialog title="增加后台角色" :visible.sync="isShowRole" :before-close="cancelShowRole" width="500px" center>
            <div class="form-content">
                <el-form ref="addUserRoleForm" :model="addUserRoleForm" label-width="100px">
                    <el-form-item label="角色名称：">
                        <el-input v-model.trim="addUserRoleForm.name"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelShowRole">取 消</el-button>
                <el-button type="primary" @click="roleVerification">确 定</el-button>
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

        <!--编辑后台角色-->
        <el-dialog title="编辑后台角色" :visible.sync="isShowEdit" width="500px" center>
            <div class="form-content">
                <el-form ref="editUserRoleForm" :model="editUserRoleForm" label-width="100px">
                    <el-form-item label="角色名称：">
                        <el-input v-model.trim="editUserRoleForm.name"></el-input>
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

    export default {
        data() {
            return {
                roleData: [
                    {
                        "defaultOrNo": '',
                        "id": '',
                        "name": ""
                    }
                ],
                // 当前页
                cur_page: 1,
                // 所有数量
                total: null,
                // 是否显示增加弹框
                isShowRole: false,
                // 是否显示修改弹框
                isShowModifyPassword: false,
                // 是否显示编辑弹框
                isShowEdit: false,
                userId: '',
                username: '',
                // 编辑时的id
                editId: '',
                // 编辑时的name
                editName: '',
                // 增加后台账户参数
                addUserRoleForm: {
                    name: '',
                },
                // 修改后台账户参数
                modifyUserAccountForm: {
                    password: '',
                    confirmPassword: ''
                },
                // 编辑后台角色参数
                editUserRoleForm: {
                    id: '',
                    name: ''
                },
            }
        },
        methods: {
            // 分页导航
            handleCurrentChange(val) {
                this.cur_page = val;
                this.getData();
            },
            handleDelete(row) {
                let vm = this;
                this.$confirm('确认删除吗?', '删除', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    vm.$httpGet('/admin/role/deleteAdminRole', {
                        id: row.id
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
                this.$httpGet('/admin/role/index', {
                    pageNo: this.cur_page,
                    pageSize: 10
                }).then(({data}) => {
                    vm.roleData = data.page.list;
                    vm.total = data.page.total;
                }).catch((data) => {
                    console.log(data.error)
                })
            },
            defaultOrNoFormatter(row, column) {
                let defaultOrNo = row.defaultOrNo;
                if (defaultOrNo) {
                    return '是';
                } else {
                    return '否';
                }
            },
            add() {
                this.isShowRole = true;
            },
            cancelShowRole() {
                this.isShowRole = false;
                this.addUserRoleForm.name = '';
            },
            roleVerification() {
                let vm = this;
                if (!this.addUserRoleForm.name) {
                    this.$message.warning('角色名称不能为空！');
                    return false;
                }
                this.$httpPost('/admin/role/save', {
                    name: this.addUserRoleForm.name
                }).then(({data}) => {
                    vm.$message.success('添加后台角色成功！');
                    vm.isShowRole = false;
                    this.addUserRoleForm.name = '';
                    vm.$httpGet('/admin/role/index', {
                        pageNo: 1,
                        pageSize: 10
                    }).then(({data}) => {
                        vm.roleData = data.page.list;
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
                }).catch((data) => {
                    console.log(data.error)
                })
            },
            handleEdit(row) {
                let vm = this;
                this.isShowEdit = true;
                this.editUserRoleForm.id = row.id;
                this.editUserRoleForm.name = row.name;
            },
            cancelShowEdit() {
                this.isShowEdit = false;
                this.editUserRoleForm.id = '';
                this.editUserRoleForm.name = '';
            },
            editUserInfo() {
                let vm = this;
                if (!this.editUserRoleForm.name) {
                    this.$message.warning('角色名称不能为空！');
                    return false;
                }
                this.$httpPost('/admin/role/update', {
                    id: this.editUserRoleForm.id,
                    name: this.editUserRoleForm.name
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
            this.getData();
        }
    }

</script>

<style scoped>
    .add {
        margin-bottom: 30px;
    }

    .form-content {
        margin: 0 auto;
        width: 90%;
    }
</style>
