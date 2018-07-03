<template>
    <div class="table">
        <div class="container">
            <div class="add" style="margin-bottom: 30px;">
                <el-button type="primary" size="medium" icon="el-icon-plus" @click="add">增加</el-button>
            </div>
            <el-table :data="getDataList" border style="width: 100%;">
                <el-table-column prop="id" label="ID">
                </el-table-column>
                <el-table-column prop="name" label="角色">
                </el-table-column>
                <el-table-column prop="defaultOrNo" label="是否默认" :formatter="defaultOrNoFormatter">
                </el-table-column>
                <el-table-column label="操作" width="300px" align="center">
                    <template v-if="getDataList.length > 0" slot-scope="scope">
                        <el-button @click="handleEdit(scope.row)" type="primary" icon="el-icon-edit" size="small">编辑
                        </el-button>
                        <el-button @click="handleModify(scope.row)" type="primary" icon="el-icon-setting"
                                   size="small">修改权限
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
        <!--增加后台账户-->
        <el-dialog title="增加后台角色" :visible.sync="isShowAdd" :before-close="cancelAdd" width="500px" center>
            <div class="form-content" style="margin: 0 auto;width: 90%;">
                <el-form ref="addDataForm" :model="addDataForm" label-width="100px">
                    <el-form-item label="角色名称：">
                        <el-input clearable v-model.trim="addDataForm.name" maxlength="10"
                                  placeholder="只能是10位以内英文或汉字"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitAdd">确 定</el-button>
                <el-button @click="cancelAdd">取 消</el-button>
            </span>
        </el-dialog>

        <!--编辑后台角色-->
        <el-dialog title="编辑后台角色" :visible.sync="isShowEdit" :before-close="cancelEdit" width="500px" center>
            <div class="form-content" style="margin: 0 auto;width: 90%;">
                <el-form ref="editDataForm" :model="editDataForm" label-width="100px">
                    <el-form-item label="角色名称：">
                        <el-input clearable v-model.trim="editDataForm.name" maxlength="10"
                                  placeholder="只能是10位以内英文或汉字"></el-input>
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
                getDataList: [
                    /*{
                        "defaultOrNo": '',
                        "id": '',
                        "name": ''
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
                // 编辑时的id
                editId: '',
                // 编辑时的name
                editName: '',
                // 增加后台账户参数
                addDataForm: {},
                // 编辑后台角色参数
                editDataForm: {},
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
                this.$httpGet('/admin/role/index', {
                    pageNo: this.cur_page,
                    pageSize: 10
                }).then(({data}) => {
                    vm.getDataList = data.page.list;
                    vm.total = data.page.total;
                }).catch((data) => {
                    console.log(data)
                })
            },
            defaultOrNoFormatter(row, column) {
                let defaultOrNo = row.defaultOrNo;
                if (defaultOrNo) {
                    return '是';
                } else if (defaultOrNo === false) {
                    return '否';
                }
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
                    this.$message.warning('角色名称不能为空！');
                    return false;
                }
                if (!/^[\u4e00-\u9fa5]{1,10}$/.test(vm.addDataForm.name) && !/^[A-Za-z]{1,10}$/.test(vm.addDataForm.name)) {
                    this.$message.warning('角色名称只能是10位以内英文或汉字！');
                    return false;
                }
                this.$httpPost('/admin/role/save', {
                    name: this.addDataForm.name
                }).then((data) => {
                    vm.$message.success(data.message);
                    vm.cancelAdd();
                    vm.$httpGet('/admin/role/index', {
                        pageNo: 1,
                        pageSize: 10
                    }).then(({data}) => {
                        vm.getDataList = data.page.list;
                        vm.total = data.page.total;
                    }).catch((data) => {
                        console.log(data)
                    })
                }).catch((data) => {
                    console.log(data)
                })
            },
            handleModify(row) {
                this.$router.push({name: 'modify-role-permissions', params: {id: row.id}});
            },
            handleEdit(row) {
                this.isShowEdit = true;
                this.editDataForm.id = row.id;
                this.editDataForm.name = row.name;
            },
            cancelEdit() {
                this.isShowEdit = false;
            },
            submitEdit() {
                let vm = this;
                if (!this.editDataForm.name) {
                    this.$message.warning('角色名称不能为空！');
                    return false;
                }
                if (!/^[\u4e00-\u9fa5]{1,10}$/.test(vm.editDataForm.name) && !/^[A-Za-z]{1,10}$/.test(vm.editDataForm.name)) {
                    this.$message.warning('角色名称只能是10位以内英文或汉字！');
                    return false;
                }
                this.$httpPost('/admin/role/update', {
                    id: this.editDataForm.id,
                    name: this.editDataForm.name
                }).then((data) => {
                    vm.$message.success(data.message);
                    vm.cancelEdit();
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
