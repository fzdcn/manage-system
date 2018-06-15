<template>
    <div class="table">
        <div class="container">
            <div class="add" style="margin-bottom: 30px;">
                <el-button type="primary" size="medium" icon="el-icon-plus" @click="add">增加</el-button>
            </div>
            <el-table :data="getDataList" border style="width: 100%;">
                <el-table-column prop="name" label="名字">
                </el-table-column>
                <el-table-column prop="phone" label="电话">
                </el-table-column>
                <el-table-column prop="email" label="邮箱">
                </el-table-column>
                <el-table-column prop="type" label="业务员类型">
                    <template slot-scope="scope">
                        <span v-if="scope.row.type==1">销售</span>
                        <span v-if="scope.row.type==2">客服</span>
                    </template>
                </el-table-column>
                <el-table-column prop="status" label="状态">
                    <template slot-scope="scope">
                        <span v-if="scope.row.status==1">开通</span>
                        <span v-if="scope.row.status==2">关闭</span>
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
                <el-pagination background @current-change="handleCurrentChange"
                               layout="total, prev, pager, next, jumper"
                               :page-size="10" :pager-count="11" :total="total">
                </el-pagination>
            </div>
        </div>
        <!--增加后台业务员-->
        <el-dialog title="增加后台业务员" :visible.sync="isShowAdd" :before-close="cancelAdd" width="500px"
                   center>
            <div class="form-content" style="margin: 0 auto;width: 90%;">
                <el-form ref="addDataForm" :model="addDataForm" label-width="100px">
                    <el-form-item label="名称：">
                        <el-input v-model.trim="addDataForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="电话：">
                        <el-input v-model.trim="addDataForm.phone"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱：">
                        <el-input v-model.trim="addDataForm.email"></el-input>
                    </el-form-item>
                    <el-form-item label="业务员类型：">
                        <el-select v-model="addDataForm.type" placeholder="业务员类型">
                            <el-option
                                v-for="item in salesmanTypeList"
                                :key="item.type"
                                :label="item.name"
                                :value="item.type">
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
                <el-form ref="editDataForm" :model="editDataForm" label-width="100px">
                    <el-form-item label="名称：">
                        <el-input v-model.trim="editDataForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="电话：">
                        <el-input v-model.trim="editDataForm.phone"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱：">
                        <el-input v-model.trim="editDataForm.email"></el-input>
                    </el-form-item>
                    <el-form-item label="业务员类型：">
                        <el-select v-model="editDataForm.type" placeholder="业务员类型">
                            <el-option
                                v-for="item in salesmanTypeList"
                                :key="item.type"
                                :label="item.name"
                                :value="item.type">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="状态：">
                        <el-select v-model="editDataForm.status" placeholder="状态">
                            <el-option
                                v-for="item in salesmanStatusList"
                                :key="item.status"
                                :label="item.name"
                                :value="item.status">
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
    import {regTel, regEmail} from '../../../functions/index';

    export default {
        data() {
            return {
                getDataList: [
                    /*{
                        "code":"00003",
                        "name":"caolsq",
                        "phone":"18551222611",
                        "email":"1468947221@qq.com",
                        "type":1,
                        "status":1
                    }*/
                ],
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
                        name: "销售"
                    },
                    {
                        type: 2,
                        name: "客服"
                    },
                ],
                salesmanStatusList: [
                    {
                        status: 1,
                        name: "开通"
                    },
                    {
                        status: 2,
                        name: "关闭"
                    },
                ],
                // 编辑后台角色参数
                editDataForm: {
                    code: '',
                    name: '',
                    phone: '',
                    email: '',
                    type: '',
                    status: ''
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
                    vm.$httpGet('/admin/epay/salesman/delete', {
                        code: row.code
                    }).then((data) => {
                        vm.$message.success(data.message);
                        vm.getData();
                    }).catch((data) => {
                        console.log(data)
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
                this.$httpGet('/admin/epay/salesman/index', {
                    pageNo: this.cur_page,
                    pageSize: 10
                }).then(({data}) => {
                    vm.getDataList = data.list;
                    vm.total = data.total;
                }).catch((data) => {
                    console.log(data)
                })
            },
            add() {
                this.isShowAdd = true;
            },
            cancelAdd() {
                this.isShowAdd = false;
                this.addDataForm = {};
            },
            submitAdd() {
                let vm = this;
                if (!this.addDataForm.name) {
                    this.$message.warning('名称不能为空！');
                    return false;
                }
                if (!this.addDataForm.phone) {
                    this.$message.warning('电话不能为空！');
                    return false;
                }
                if (!regTel.test(this.addDataForm.phone)) {
                    this.$message.warning('电话格式不正确！！');
                    return false;
                }
                if (!this.addDataForm.email) {
                    this.$message.warning('邮箱不能为空！');
                    return false;
                }
                if (!regEmail.test(this.addDataForm.email)) {
                    this.$message.warning('邮箱格式不正确！');
                    return false;
                }
                if (!this.addDataForm.type) {
                    this.$message.warning('业务员类型不能为空！');
                    return false;
                }
                this.$httpPost('/admin/epay/salesman/save', {
                    name: this.addDataForm.name,
                    phone: this.addDataForm.phone,
                    email: this.addDataForm.email,
                    type: this.addDataForm.type
                }).then((data) => {
                    vm.$message.success(data.message);
                    vm.isShowAdd = false;
                    vm.addDataForm = {};
                    vm.$httpGet('/admin/epay/salesman/index', {
                        pageNo: 1,
                        pageSize: 10
                    }).then(({data}) => {
                        vm.getDataList = data.list;
                        vm.total = data.total;
                    }).catch((data) => {
                        console.log(data)
                    })
                }).catch((data) => {
                    console.log(data)
                })
            },
            handleEdit(row) {
                this.isShowEdit = true;
                this.editDataForm.code = row.code;
                this.editDataForm.name = row.name;
                this.editDataForm.phone = row.phone;
                this.editDataForm.email = row.email;
                this.editDataForm.type = row.type;
                this.editDataForm.status = row.status;
            },
            cancelEdit() {
                this.isShowEdit = false;
            },
            submitEdit() {
                let vm = this;
                if (!this.editDataForm.name) {
                    this.$message.warning('名称不能为空！');
                    return false;
                }
                if (!this.editDataForm.phone) {
                    this.$message.warning('电话不能为空！');
                    return false;
                }
                if (!regTel.test(this.editDataForm.phone)) {
                    this.$message.warning('电话格式不正确！！');
                    return false;
                }
                if (!this.editDataForm.email) {
                    this.$message.warning('邮箱不能为空！');
                    return false;
                }
                if (!regEmail.test(this.editDataForm.email)) {
                    this.$message.warning('邮箱格式不正确！');
                    return false;
                }
                if (!this.editDataForm.type) {
                    this.$message.warning('业务员类型不能为空！');
                    return false;
                }
                if (!this.editDataForm.status) {
                    this.$message.warning('状态不能为空！');
                    return false;
                }
                this.$httpPost('/admin/epay/salesman/update', {
                    code: this.editDataForm.code,
                    name: this.editDataForm.name,
                    phone: this.editDataForm.phone,
                    email: this.editDataForm.email,
                    type: this.editDataForm.type,
                    status: this.editDataForm.status
                }).then((data) => {
                    vm.$message.success(data.message);
                    vm.isShowEdit = false;
                    vm.getData();
                }).catch((data) => {
                    console.log(data)
                })
            }
        },
        created() {
            this.getData();
        }
    }

</script>

<style scoped>

</style>
