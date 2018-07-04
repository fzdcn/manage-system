<template>
    <div class="table">
        <div class="container">
            <div class="add" style="margin-bottom: 30px;">
                <el-button type="primary" size="medium" icon="el-icon-plus" @click="add">增加</el-button>
            </div>

            <div class="handle-box" style="margin-bottom: 20px;display: flex;flex-flow: row wrap;">
                <div style="margin: 0px 20px 10px 0;">
                    <span>平台名称：</span>
                    <el-input style="width: 150px;" class="username" v-model.trim="searchDataForm.platformName"
                              clearable placeholder="">
                    </el-input>
                </div>

                <div style="margin: 0px 20px 10px 0;">
                    <span>平台IP：</span>
                    <el-input style="width: 150px;" class="username" v-model.trim="searchDataForm.platformIp"
                              clearable placeholder="">
                    </el-input>
                </div>

                <div style="margin: 0px 20px 10px 0;">
                    <span>商户IP：</span>
                    <el-input style="width: 150px;" class="username" v-model.trim="searchDataForm.merchantIp"
                              clearable placeholder="">
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
                <el-table-column prop="platformName" label="平台名称" header-align="center"/>
                <el-table-column prop="platformIp" label="平台IP" header-align="center"/>
                <el-table-column prop="merchantIp" label="商户IP" header-align="center"/>
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
                        <el-select clearable v-model="addDataForm.platformNo"
                                   placeholder="平台名称">
                            <el-option
                                v-for="item in platformIdList"
                                :key="item.platformNo"
                                :label="item.platformName"
                                :value="item.platformNo">
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
                    <el-form-item label="平台名称：">
                        <el-select clearable v-model="ditDataForm.platformNo" placeholder="平台名称">
                            <el-option
                                v-for="item in platformIdList"
                                :key="item.platformNo"
                                :label="item.platformName"
                                :value="item.platformNo">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="平台IP：">
                        <el-input clearable v-model.trim="ditDataForm.platformIp"
                                  placeholder="ip格式应该位xxx.xxx.xxx.xxx">
                        </el-input>
                    </el-form-item>

                    <el-form-item label="商户IP：">
                        <el-input clearable v-model.trim="ditDataForm.merchantIp"
                                  placeholder="ip格式应该位xxx.xxx.xxx.xxx">
                        </el-input>
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
                ditDataForm: {
                    id: "",
                    platformNo:"",
                    platformIp: "",
                    merchantIp: "",
                    type: ""
                },
                // 平台列表
                platformIdList: [],
                //平台名称
                platformName:""
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
                this.$httpGet('/admin/epay/riskInfo/listRisk', {
                    pageNo: this.cur_page,
                    pageSize: 10,
                    platformIp: this.searchDataForm.platformIp,
                    merchantIp: this.searchDataForm.merchantIp,
                    platformName: this.searchDataForm.platformName,
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
                if (!this.addDataForm.platformNo) {
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

                // 取平台名称
                let object = {};
                object = this.platformIdList.find((item => {
                    return item.platformNo == this.addDataForm.platformNo;
                }));

                this.$httpPost('/admin/epay/riskInfo/insertRisk', {
                    platformNo: this.addDataForm.platformNo,
                    platformName: object.platformName,
                    merchantIp: this.addDataForm.merchantIp,
                    platformIp: this.addDataForm.platformIp,
                    type: this.addDataForm.type
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
                this.ditDataForm.id = row.id;
                this.ditDataForm.platformNo = row.platformNo;
                this.ditDataForm.merchantIp = row.merchantIp;
                this.ditDataForm.platformIp = row.platformIp;
                this.ditDataForm.type = row.type;
            },
            cancelEdit() {
                this.isShowEdit = false;
            },
            submitEdit() {
                let vm = this;
                if (!this.ditDataForm.platformNo) {
                    this.$message.warning('平台名称不能为空！');
                    return false;
                }
                if (!this.ditDataForm.platformIp) {
                    this.$message.warning('平台ip不能为空！');
                    return false;
                }
                if (!this.ditDataForm.merchantIp) {
                    this.$message.warning('商户ip不能为空！');
                    return false;
                }
                if (!/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/.test(vm.ditDataForm.platformIp)) {
                    this.$message.warning('平台ip格式不对！');
                    return false;
                }
                if (!/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/.test(vm.ditDataForm.merchantIp)) {
                    this.$message.warning('商户ip格式不对！');
                    return false;
                }
                if (!this.ditDataForm.type) {
                    this.$message.warning('类型不能为空！');
                    return false;
                }

                // 取平台名称
                let object = {};
                object = this.platformIdList.find((item => {
                    return item.platformNo == this.ditDataForm.platformNo;
                }));

                this.$httpPost('/admin/epay/riskInfo/updateRisk', {
                    id: this.ditDataForm.id,
                    platformNo: this.ditDataForm.platformNo,
                    platformName: object.platformName,
                    merchantIp: this.ditDataForm.merchantIp,
                    platformIp: this.ditDataForm.platformIp,
                    type: this.ditDataForm.type
                }).then((data) => {
                    vm.$message.success(data.message);
                    vm.cancelEdit();
                    vm.getData();
                }).catch((data) => {
                    console.log(data)
                })
            }
        }
        ,
        created() {
            this.getData();
            this.getPlatFormList();

        }
    }

</script>

<style scoped>

</style>
