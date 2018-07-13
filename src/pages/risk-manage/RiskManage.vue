<template>
    <div class="table">
        <div class="container">
            <div class="add" style="margin-bottom: 30px;">
                <el-button type="primary" size="medium" icon="el-icon-plus" @click="add">增加</el-button>
            </div>
            <div class="handle-box" style="margin-bottom: 20px;display: flex;flex-flow: row wrap;">
                <div style="margin: 0px 20px 10px 0;">
                    <div style="margin: 0px 20px 10px 0;">
                        <span>平台id：</span>
                        <el-select clearable style="width: 150px;" v-model="searchDataForm.platformId"
                                   placeholder="平台id">
                            <el-option
                                v-for="item in platformIdList"
                                :key="item.id"
                                :label="item.platformName"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </div>
                </div>

                <div style="margin: 0px 20px 10px 0;">
                    <span>平台IP：</span>
                    <el-input style="width: 150px;" class="username" v-model.trim="searchDataForm.platformIp"
                              clearable placeholder="平台IP">
                    </el-input>
                </div>

                <div style="margin: 0px 20px 10px 0;">
                    <span>商户IP：</span>
                    <el-input style="width: 150px;" class="username" v-model.trim="searchDataForm.merchantIp"
                              clearable placeholder="商户IP">
                    </el-input>
                </div>

                <div style="margin: 0px 20px 10px 0;">
                    <span>类型：</span>
                    <el-select clearable style="width: 150px;" v-model="searchDataForm.type" placeholder="">
                        <el-option
                            v-for="item in typeList"
                            :key="item.type"
                            :label="item.name"
                            :value="item.type">
                        </el-option>
                    </el-select>
                </div>
                <div>
                    <el-button type="primary" icon="el-icon-search" @click="handleCurrentChange(1)">搜索</el-button>
                </div>
            </div>

            <el-table :data="getDataList" border style="width: 100%;text-align: center;">
                <el-table-column show-overflow-tooltip prop="platformId" label="平台名称" header-align="center">
                    <template slot-scope="scope">
                        <span v-if="scope.row.platformId==item.id" v-for="item in platformIdList">{{ item.platformName }}</span>
                    </template>
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="platformIp" label="平台IP" header-align="center">
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="merchantIp" label="商户IP" header-align="center">
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="type" label="类型" header-align="center">
                    <template slot-scope="scope">
                        <span v-if="scope.row.type==item.type" v-for="item in typeList">{{ item.name }}</span>
                    </template>
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="remark" label="备注" header-align="center">
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
                <el-pagination v-if="paginationShow" background :current-page="cur_page"
                               @current-change="handleCurrentChange"
                               layout="total, prev, pager, next, jumper"
                               :page-size="10" :pager-count="11" :total="total">
                </el-pagination>
            </div>
        </div>
        <!--增加-->
        <el-dialog title="增加风控信息" :visible.sync="isShowAdd" :before-close="cancelAdd" width="500px" center>
            <div class="form-content" style="margin: 0 auto;width: 90%;">
                <el-form ref="addDataForm" :model="addDataForm" label-width="120px">
                    <el-form-item label="平台名称：">
                        <el-select clearable v-model="addDataForm.platformId"
                                   placeholder="平台名称">
                            <el-option
                                v-for="item in platformIdList"
                                :key="item.id"
                                :label="item.platformName"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="平台IP：">
                        <el-input clearable v-model.trim="addDataForm.platformIp" placeholder="ip格式应该位xxx.xxx.xxx.xxx">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="商户IP：">
                        <el-input clearable v-model.trim="addDataForm.merchantIp" placeholder="ip格式应该位xxx.xxx.xxx.xxx">
                        </el-input>
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
                    <el-form-item label="备注：">
                        <el-input type="textarea" clearable v-model.trim="addDataForm.remark" placeholder="i备注">
                        </el-input>
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
                <el-form ref="ditDataForm" :model="editDataForm" label-width="120px">
                    <el-form-item label="平台名称：">
                        <el-select clearable v-model="editDataForm.platformId" placeholder="平台名称">
                            <el-option
                                v-for="item in platformIdList"
                                :key="item.id"
                                :label="item.platformName"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="平台IP：">
                        <el-input clearable v-model.trim="editDataForm.platformIp"
                                  placeholder="ip格式应该位xxx.xxx.xxx.xxx">
                        </el-input>
                    </el-form-item>

                    <el-form-item label="商户IP：">
                        <el-input clearable v-model.trim="editDataForm.merchantIp"
                                  placeholder="ip格式应该位xxx.xxx.xxx.xxx">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="类型：">
                        <el-select clearable v-model="editDataForm.type" placeholder="类型">
                            <el-option
                                v-for="item in typeList"
                                :key="item.type"
                                :label="item.name"
                                :value="item.type">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="备注：">
                        <el-input type="textarea" clearable v-model.trim="editDataForm.remark" placeholder="i备注">
                        </el-input>
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
                // 增加
                addDataForm: {},
                // 获取平台名称
                platformNameObject: {},
                searchDataForm: {
                    platformIp: "",
                    merchantIp: "",
                    type: ""
                },
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
                editDataForm: {
                    id: "",
                    platformId: "",
                    platformIp: "",
                    merchantIp: "",
                    type: "",
                    remark: ""
                },
                // 平台列表
                platformIdList: [],
                //平台名称
                platformName: ""
            }
        },
        methods: {
            // 分页导航
            handleCurrentChange(val) {
                this.cur_page = val;
                this.paginationShow = false;
                this.getData();
            },
            handleDelete(row) {
                let vm = this;
                this.$confirm('确认删除吗?', '删除', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    vm.$httpGet('/admin/riskInfo/deleteRisk', {
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
            // 平台名称
            getPlatFormList() {
                let vm = this;
                this.$httpGet('/admin/platformInfo/option', {})
                    .then(({data}) => {
                        vm.platformIdList = data;
                    }).catch((data) => {
                    console.log(data)
                })
            },
            getData() {
                let vm = this;
                this.$httpGet('/admin/riskInfo/listRisk', {
                    pageNo: this.cur_page,
                    pageSize: 10,
                    platformIp: this.searchDataForm.platformIp,
                    merchantIp: this.searchDataForm.merchantIp,
                    platformId: this.searchDataForm.platformId,
                    type: this.searchDataForm.type
                }).then(({data}) => {
                    vm.getDataList = data.list;
                    vm.total = data.total;
                    vm.paginationShow = true;
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
                if (!this.addDataForm.platformId) {
                    this.$message.warning('平台名称不能为空！');
                    return false;
                }
                if (!this.addDataForm.platformIp) {
                    this.$message.warning('平台ip不能为空！');
                    return false;
                }
                if (!this.addDataForm.merchantIp) {
                    this.$message.warning('商户ip不能为空！');
                    return false;
                }
                if (!/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/.test(vm.addDataForm.platformIp)) {
                    this.$message.warning('平台ip格式不对！');
                    return false;
                }
                if (!/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/.test(vm.addDataForm.merchantIp)) {
                    this.$message.warning('商户ip格式不对！');
                    return false;
                }
                if (!this.addDataForm.type) {
                    this.$message.warning('类型不能为空！');
                    return false;
                }
                this.$httpPost('/admin/riskInfo/insertRisk', {
                    platformId: this.addDataForm.platformId,
                    merchantIp: this.addDataForm.merchantIp,
                    platformIp: this.addDataForm.platformIp,
                    type: this.addDataForm.type,
                    remark: this.addDataForm.remark
                }).then((data) => {
                    vm.$message.success(data.message);
                    vm.cancelAdd();
                    vm.handleCurrentChange(1);
                }).catch((data) => {
                    console.log(data)
                })
            },
            handleEdit(row) {
                this.isShowEdit = true;
                this.editDataForm.id = row.id;
                this.editDataForm.platformId = row.platformId;
                this.editDataForm.merchantIp = row.merchantIp;
                this.editDataForm.platformIp = row.platformIp;
                this.editDataForm.type = row.type;
                this.editDataForm.remark = row.remark;
            },
            cancelEdit() {
                this.isShowEdit = false;
            },
            submitEdit() {
                let vm = this;
                if (!this.editDataForm.platformId) {
                    this.$message.warning('平台名称不能为空！');
                    return false;
                }
                if (!this.editDataForm.platformIp) {
                    this.$message.warning('平台ip不能为空！');
                    return false;
                }
                if (!this.editDataForm.merchantIp) {
                    this.$message.warning('商户ip不能为空！');
                    return false;
                }
                if (!/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/.test(vm.editDataForm.platformIp)) {
                    this.$message.warning('平台ip格式不对！');
                    return false;
                }
                if (!/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/.test(vm.editDataForm.merchantIp)) {
                    this.$message.warning('商户ip格式不对！');
                    return false;
                }
                if (!this.editDataForm.type) {
                    this.$message.warning('类型不能为空！');
                    return false;
                }

                this.$httpPost('/admin/riskInfo/updateRisk', {
                    id: this.editDataForm.id,
                    platformId: this.editDataForm.platformId,
                    merchantIp: this.editDataForm.merchantIp,
                    platformIp: this.editDataForm.platformIp,
                    type: this.editDataForm.type,
                    remark: this.editDataForm.remark
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
            this.getPlatFormList();
            this.getData();

        }
    }

</script>

<style scoped>

</style>
