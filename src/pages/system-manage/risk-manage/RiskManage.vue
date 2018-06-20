<template>
    <div class="table">
        <div class="container">
            <div class="add" style="margin-bottom: 30px;">
                <el-button type="primary" size="medium" icon="el-icon-plus" @click="add">增加</el-button>
            </div>
            <el-table :data="getDataList" border style="width: 100%;text-align: center;">
                <el-table-column prop="ip" label="IP" header-align="center"/>
                <el-table-column prop="type" label="类型" header-align="center">
                    <template slot-scope="scope">
                        <span v-if="scope.row.type==1">黑名单</span>
                        <span v-if="scope.row.type==2">白名单</span>
                    </template>
                </el-table-column>
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
                <el-pagination background @current-change="handleCurrentChange"
                               layout="total, prev, pager, next, jumper"
                               :page-size="10" :pager-count="11" :total="total">
                </el-pagination>
            </div>
        </div>
        <!--增加-->
        <el-dialog title="增加风控信息" :visible.sync="isShowAdd" :before-close="cancelAdd" width="500px" center>
            <div class="form-content" style="margin: 0 auto;width: 90%;">
                <el-form ref="addDataForm" :model="addDataForm" label-width="120px">
                    <el-form-item label="IP：">
                        <el-input v-model.trim="addDataForm.ip"></el-input>
                    </el-form-item>
                    <el-form-item label="类型：">
                        <el-select clearable v-model="addDataForm.type" placeholder="类型">
                            <el-option
                                v-for="item in typeList"
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

        <!--编辑-->
        <el-dialog title="编辑风控信息" :visible.sync="isShowEdit" :before-close="cancelEdit" width="500px" center>
            <div class="form-content" style="margin: 0 auto;width: 90%;">
                <el-form ref="ditDataForm" :model="ditDataForm" label-width="120px">
                    <el-form-item label="IP：">
                        <el-input v-model.trim="ditDataForm.ip"></el-input>
                    </el-form-item>
                    <el-form-item label="类型：">
                        <el-select clearable v-model="ditDataForm.type" placeholder="类型">
                            <el-option
                                v-for="item in typeList"
                                :key="item.type"
                                :label="item.name"
                                :value="item.type">
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

    export default {
        data() {
            return {
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
                typeList: [
                    {
                        type: "1",
                        name: '黑名单'
                    },
                    {
                        type: "2",
                        name: '白名单'
                    },
                ],
                // 编辑
                ditDataForm: {
                    id: "",
                    ip: "",
                    type: ""
                }
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
                    vm.$httpGet('/admin/epay/riskInfo/deleteRisk', {
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
                this.$httpGet('/admin/epay/riskInfo/listRisk', {
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
                if (!this.addDataForm.ip) {
                    this.$message.warning('ip不能为空！');
                    return false;
                }
                if (!this.addDataForm.type) {
                    this.$message.warning('类型不能为空！');
                    return false;
                }
                this.$httpPost('/admin/epay/riskInfo/insertRisk', {
                    ip: this.addDataForm.ip,
                    type: this.addDataForm.type
                }).then((data) => {
                    vm.$message.success(data.message);
                    vm.isShowAdd = false;
                    vm.addDataForm = {};
                    vm.$httpGet('/admin/epay/riskInfo/listRisk', {
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
                this.ditDataForm.id = row.id;
                this.ditDataForm.ip = row.ip;
                this.ditDataForm.type = row.type;
            },
            cancelEdit() {
                this.isShowEdit = false;
            },
            submitEdit() {
                let vm = this;
                if (!this.ditDataForm.ip) {
                    this.$message.warning('ip不能为空！');
                    return false;
                }
                if (!this.ditDataForm.type) {
                    this.$message.warning('类型不能为空！');
                    return false;
                }
                this.$httpPost('/admin/epay/riskInfo/updateRisk', {
                    id: this.ditDataForm.id,
                    ip: this.ditDataForm.ip,
                    type: this.ditDataForm.type
                }).then((data) => {
                    vm.$message.success(data.message);
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

</style>
