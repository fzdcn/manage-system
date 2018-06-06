<template>
    <div class="table">
        <div class="container">
            <div class="add" style="margin-bottom: 30px;">
                <el-button type="primary" size="medium" icon="el-icon-plus" @click="add">增加</el-button>
            </div>
            <el-table :data="salesmanData" border style="width: 100%;text-align: center;">
                <el-table-column prop="name" label="名字" header-align="center">
                </el-table-column>
                <el-table-column prop="phone" label="电话" header-align="center">
                </el-table-column>
                <el-table-column prop="email" label="邮箱" header-align="center">
                </el-table-column>
                <el-table-column prop="type" label="业务员类型" header-align="center">
                    <template slot-scope="scope">
                        <span v-if="scope.row.type==1">销售</span>
                        <span v-if="scope.row.type==2">客服</span>
                    </template>
                </el-table-column>
                <el-table-column prop="status" label="状态" header-align="center">
                    <template slot-scope="scope">
                        <span v-if="scope.row.status==1">开通</span>
                        <span v-if="scope.row.status==2">关闭</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="190px" header-align="center">
                    <template v-if="salesmanData.length > 0" slot-scope="scope">
                        <el-button @click="handleEdit(scope.row)" type="primary" icon="el-icon-edit" size="small">编辑
                        </el-button>
                        <el-button @click="handleDelete(scope.row)" type="danger" icon="el-icon-delete" size="small">
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next"
                               :page-size="10" :pager-count="11" :total="total">
                </el-pagination>
            </div>
        </div>
        <!--增加后台业务员-->
        <el-dialog title="增加后台业务员" :visible.sync="isShowSalesman" :before-close="cancelShowSalesman" width="500px"
                   center>
            <div class="form-content">
                <el-form ref="addSalesmanForm" :model="addSalesmanForm" label-width="100px">
                    <el-form-item label="名称：">
                        <el-input v-model.trim="addSalesmanForm.name"></el-input>
                    </el-form-item>
                    <el-form ref="addSalesmanForm" :model="addSalesmanForm" label-width="100px">
                        <el-form-item label="电话：">
                            <el-input v-model.trim="addSalesmanForm.phone"></el-input>
                        </el-form-item>
                    </el-form>
                    <el-form ref="addSalesmanForm" :model="addSalesmanForm" label-width="100px">
                        <el-form-item label="邮箱：">
                            <el-input v-model.trim="addSalesmanForm.email"></el-input>
                        </el-form-item>
                    </el-form>
                    <el-form-item label="业务员类型：">
                        <el-select v-model="addSalesmanForm.type" placeholder="业务员类型">
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
                <el-button @click="cancelShowSalesman">取 消</el-button>
                <el-button type="primary" @click="entry">确 定</el-button>
            </span>
        </el-dialog>

        <!--编辑后台业务员-->
        <el-dialog title="编辑后台业务员" :visible.sync="isShowEdit" width="500px" center>
            <div class="form-content">
                <el-form ref="editSalesmanForm" :model="editSalesmanForm" label-width="100px">
                    <el-form-item label="名称：">
                        <el-input v-model.trim="editSalesmanForm.name"></el-input>
                    </el-form-item>
                    <el-form ref="addSalesmanForm" :model="editSalesmanForm" label-width="100px">
                        <el-form-item label="电话：">
                            <el-input v-model.trim="editSalesmanForm.phone"></el-input>
                        </el-form-item>
                    </el-form>
                    <el-form ref="addSalesmanForm" :model="editSalesmanForm" label-width="100px">
                        <el-form-item label="邮箱：">
                            <el-input v-model.trim="editSalesmanForm.email"></el-input>
                        </el-form-item>
                    </el-form>
                    <el-form-item label="业务员类型：">
                        <el-select v-model="editSalesmanForm.type" placeholder="业务员类型">
                            <el-option
                                v-for="item in salesmanTypeList"
                                :key="item.type"
                                :label="item.name"
                                :value="item.type">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="状态：">
                        <el-select v-model="editSalesmanForm.status" placeholder="状态">
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
                <el-button @click="cancelShowEdit">取 消</el-button>
                <el-button type="primary" @click="editUserInfo">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import {regTel, regEmail, regIdCode} from '../../../functions/index';

    export default {
        data() {
            return {
                salesmanData: [
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
                isShowSalesman: false,
                // 是否显示编辑弹框
                isShowEdit: false,
                // 增加后台业务员参数
                addSalesmanForm: {
                    name: '',
                    phone: '',
                    email: '',
                    type: ''
                },
                salesmanTypeList: [
                    {
                        type: 1,
                        name: '销售'
                    },
                    {
                        type: 2,
                        name: '客服'
                    },
                ],
                salesmanStatusList: [
                    {
                        status: 1,
                        name: '开通'
                    },
                    {
                        status: 2,
                        name: '关闭'
                    },
                ],
                // 编辑后台角色参数
                editSalesmanForm: {
                    /*code: '',
                    name: '',
                    phone: '',
                    email: '',
                    type: '',
                    status: ''*/
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
                    }).then(({data}) => {
                        vm.$message({
                            type: 'success',
                            message: data
                        });
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
                    vm.salesmanData = data.list;
                    vm.total = data.total;
                }).catch((data) => {
                    console.log(data)
                })
            },
            add() {
                this.isShowSalesman = true;
            },
            cancelShowSalesman() {
                this.isShowSalesman = false;
                for (let key in this.addSalesmanForm) {
                    delete this.addSalesmanForm[key];
                }
            },
            entry() {
                let vm = this;
                if (!this.addSalesmanForm.name) {
                    this.$message.warning('名称不能为空！');
                    return false;
                }
                if (!this.addSalesmanForm.phone) {
                    this.$message.warning('电话不能为空！');
                    return false;
                }
                if (!regTel.test(this.addSalesmanForm.phone)) {
                    this.$message.warning('电话格式不正确！！');
                    return false;
                }
                if (!this.addSalesmanForm.email) {
                    this.$message.warning('邮箱不能为空！');
                    return false;
                }
                if (!regEmail.test(this.addSalesmanForm.email)) {
                    this.$message.warning('邮箱格式不正确！');
                    return false;
                }
                if (!this.addSalesmanForm.type) {
                    this.$message.warning('业务员类型不能为空！');
                    return false;
                }
                this.$httpPost('/admin/epay/salesman/save', {
                    name: this.addSalesmanForm.name,
                    phone: this.addSalesmanForm.phone,
                    email: this.addSalesmanForm.email,
                    type: this.addSalesmanForm.type
                }).then(({data}) => {
                    vm.$message.success(data);
                    vm.isShowSalesman = false;
                    for (let key in vm.addSalesmanForm) {
                        delete vm.addSalesmanForm[key];
                    }
                    vm.$httpGet('/admin/epay/salesman/index', {
                        pageNo: 1,
                        pageSize: 10
                    }).then(({data}) => {
                        vm.salesmanData = data.list;
                        vm.total = data.total;
                    }).catch((data) => {
                        console.log(data)
                    })
                }).catch((data) => {
                    console.log(data)
                })
            },
            handleEdit(row) {
                let vm = this;
                this.isShowEdit = true;
                this.$httpGet('/admin/epay/salesman/findByCode', {
                    code: row.code
                }).then(({data}) => {
                    vm.editSalesmanForm = data;
                }).catch((data) => {
                    console.log(data)
                })
            },
            cancelShowEdit() {
                this.isShowEdit = false;
                for (let key in vm.editSalesmanForm) {
                    delete vm.editSalesmanForm[key];
                }
            },
            editUserInfo() {
                let vm = this;
                if (!this.editSalesmanForm.name) {
                    this.$message.warning('名称不能为空！');
                    return false;
                }
                if (!this.editSalesmanForm.phone) {
                    this.$message.warning('电话不能为空！');
                    return false;
                }
                if (!regTel.test(this.editSalesmanForm.phone)) {
                    this.$message.warning('电话格式不正确！！');
                    return false;
                }
                if (!this.editSalesmanForm.email) {
                    this.$message.warning('邮箱不能为空！');
                    return false;
                }
                if (!regEmail.test(this.editSalesmanForm.email)) {
                    this.$message.warning('邮箱格式不正确！');
                    return false;
                }
                if (!this.editSalesmanForm.type) {
                    this.$message.warning('业务员类型不能为空！');
                    return false;
                }
                if (!this.editSalesmanForm.status) {
                    this.$message.warning('状态不能为空！');
                    return false;
                }
                this.$httpPost('/admin/epay/salesman/update', {
                    code: this.editSalesmanForm.code,
                    name: this.editSalesmanForm.name,
                    phone: this.editSalesmanForm.phone,
                    email: this.editSalesmanForm.email,
                    type: this.editSalesmanForm.type,
                    status: this.editSalesmanForm.status
                }).then(({data}) => {
                    vm.$message.success(data);
                    vm.isShowEdit = false;
                    vm.getData();
                }).catch((data) => {
                    console.log(data)
                })
            }
        }
        ,
        created() {
            this.getData();
        }
    }

</script>

<style scoped>
    .form-content {
        margin: 0 auto;
        width: 90%;
    }
</style>
