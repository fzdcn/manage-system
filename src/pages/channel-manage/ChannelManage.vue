<template>
    <div class="table">
        <div class="container">
            <div class="add" style="margin-bottom: 30px;">
                <el-button type="primary" size="medium" icon="el-icon-plus" @click="add">增加</el-button>
            </div>
            <div class="handle-box" style="margin-bottom: 20px;display: flex;flex-flow: row wrap;">
                <div style="margin: 0px 20px 10px 0;">
                    <span>通道名称：</span>
                    <el-input style="width: 150px;" class="username" v-model.trim="searchDataForm.channelName"
                              clearable placeholder="请填写通道名称">
                    </el-input>
                </div>
                <div style="margin: 0px 20px 10px 0;">
                    <span>通道接入码：</span>
                    <el-input style="width: 150px;" class="username" v-model.trim="searchDataForm.channelAccessCode"
                              clearable placeholder="请填写通道接入码">
                    </el-input>
                </div>
                <div>
                    <el-button type="primary" icon="el-icon-search" @click="handleCurrentChange(1)">
                        搜索
                    </el-button>
                </div>
            </div>
            <el-table :data="getDataList" border style="width: 100%;">
                <el-table-column prop="channelName" label="通道名称">
                </el-table-column>
                <el-table-column prop="channelAccessCode" label="通道接入码">
                </el-table-column>
                <el-table-column prop="bankUrl" label="通道接入请求地址">
                </el-table-column>
                <el-table-column prop="unionMerNo" label="商户号">
                </el-table-column>
                <el-table-column prop="acqInsCode" label="机构号">
                </el-table-column>
                <el-table-column prop="channelState" label="使用状态">
                    <template slot-scope="scope">
                        <span v-if="scope.row.channelState">开启</span>
                        <span v-else>关闭</span>
                    </template>
                </el-table-column>
                <el-table-column prop="executeTime" label="操作时间" :formatter="dateFormatter">
                </el-table-column>
                <el-table-column prop="operator" label="操作人">
                </el-table-column>
                <el-table-column prop="localFee" label="银行收取费率">
                    <template slot-scope="scope">
                        <span>{{ scope.row.localFee * 100 }}%</span>
                    </template>
                </el-table-column>
                <el-table-column prop="computeMode" label="收费方式">
                    <template slot-scope="scope">
                        <span v-if="scope.row.computeMode == 1">通用比例</span>
                        <span v-if="scope.row.computeMode == 2">借贷比例</span>
                        <span v-if="scope.row.computeMode == 3">定额</span>
                    </template>
                </el-table-column>
                <el-table-column prop="remark" label="备注">
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
        <el-dialog title="增加通道信息" :visible.sync="isShowAdd" :before-close="cancelAdd" width="720px" center>
            <div class="form-content" style="margin: 0 auto;width: 90%;">
                <el-form ref="addDataForm" :model="addDataForm" label-width="150px">
                    <el-form-item label="通道名称：">
                        <el-input clearable v-model.trim="addDataForm.channelName"></el-input>
                    </el-form-item>
                    <el-form-item label="通道接入码：">
                        <el-input clearable v-model.trim="addDataForm.channelAccessCode"></el-input>
                    </el-form-item>
                    <el-form-item label="通道接入请求地址：">
                        <el-input clearable v-model.trim="addDataForm.bankUrl"></el-input>
                    </el-form-item>
                    <el-form-item label="商户号：">
                        <el-input type="number" v-model.trim="addDataForm.unionMerNo" maxlength="20"
                                  placeholder="20位以内的数字"></el-input>
                    </el-form-item>
                    <el-form-item label="机构号：">
                        <el-input type="number" v-model.trim="addDataForm.acqInsCode" maxlength="10"
                                  placeholder="10位以内的数字"></el-input>
                    </el-form-item>
                    <el-form-item label="银行收取费率：">
                        <el-input v-model.number="addDataForm.localFee" type="number"
                                  placeholder="不能为负数,整数最多10位，小数最多5位,>=1时，收费方式只能是定额"></el-input>
                    </el-form-item>
                    <el-form-item label="使用状态：">
                        <el-select clearable v-model="addDataForm.channelState" placeholder="使用状态">
                            <el-option
                                v-for="item in channelStateList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="收费方式：">
                        <el-select clearable v-model="addDataForm.computeMode" placeholder="收费方式">
                            <el-option v-if="addDataForm.localFee >= 1" v-for="item in otherComputeModeList"
                                       :key="item.id"
                                       :label="item.name"
                                       :value="item.id">
                            </el-option>
                            <el-option v-else v-for="item in computeModeList"
                                       :key="item.id"
                                       :label="item.name"
                                       :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="备注：">
                        <el-input maxlength="255" type="textarea" v-model.trim="addDataForm.remark"
                                  placeholder="长度最多为255"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitAdd">确 定</el-button>
                <el-button @click="cancelAdd">取 消</el-button>
            </span>
        </el-dialog>

        <!--编辑-->
        <el-dialog title="编辑通道信息" :visible.sync="isShowEdit" :before-close="cancelEdit" width="720px" center>
            <div class="form-content" style="margin: 0 auto;width: 90%;">
                <el-form ref="editDataForm" :model="editDataForm" label-width="150px">
                    <el-form-item label="通道名称：">
                        <el-input clearable v-model.trim="editDataForm.channelName"></el-input>
                    </el-form-item>
                    <el-form-item label="通道接入码：">
                        <el-input clearable v-model.trim="editDataForm.channelAccessCode"></el-input>
                    </el-form-item>
                    <el-form-item label="通道接入请求地址：">
                        <el-input clearable v-model.trim="editDataForm.bankUrl"></el-input>
                    </el-form-item>
                    <el-form-item label="商户号：">
                        <el-input type="number" v-model.trim="editDataForm.unionMerNo" maxlength="20"
                                  placeholder="20位以内的数字"></el-input>
                    </el-form-item>
                    <el-form-item label="机构号：">
                        <el-input type="number" v-model.trim="editDataForm.acqInsCode" maxlength="10"
                                  placeholder="10位以内的数字"></el-input>
                    </el-form-item>
                    <el-form-item label="银行收取费率：">
                        <el-input v-model.number="editDataForm.localFee" type="number"
                                  placeholder="不能为负数,整数最多10位，小数最多5位,>=1时，收费方式只能是定额"></el-input>
                    </el-form-item>
                    <el-form-item label="使用状态：">
                        <el-select clearable v-model="editDataForm.channelState" placeholder="使用状态">
                            <el-option
                                v-for="item in channelStateList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="收费方式：">
                        <el-select clearable v-model="editDataForm.computeMode" placeholder="收费方式">
                            <el-option v-if="editDataForm.localFee >= 1" v-for="item in otherComputeModeList"
                                       :key="item.id"
                                       :label="item.name"
                                       :value="item.id">
                            </el-option>
                            <el-option v-else v-for="item in computeModeList"
                                       :key="item.id"
                                       :label="item.name"
                                       :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="备注：">
                        <el-input maxlength="255" type="textarea" v-model.trim="editDataForm.remark"
                                  placeholder="长度最多为255"></el-input>
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
                searchDataForm: {},
                // 增加参数
                addDataForm: {},
                num: null,
                // 编辑参数
                editDataForm: {
                    id: '',
                    channelName: '',
                    channelAccessCode: '',
                    bankUrl: '',
                    unionMerNo: '',
                    acqInsCode: '',
                    localFee: '',
                    channelState: '',
                    computeMode: '',
                    remark: ''
                },
                channelStateList: [
                    {
                        id: 1,
                        name: '开启'
                    },
                    {
                        id: 2,
                        name: '关闭'
                    }
                ],
                computeModeList: [
                    {
                        id: 1,
                        name: '通用比例'
                    },
                    {
                        id: 2,
                        name: '借贷比例'
                    },
                    {
                        id: 3,
                        name: '定额'
                    },
                ],
                otherComputeModeList: [
                    {
                        id: 3,
                        name: '定额'
                    },
                ]
            }
        },
        methods: {
            dateFormatter(row, column) {
                let date = row.executeTime;
                if (date)
                    return this.$moment(date).format('YYYY-MM-DD HH:mm:ss');
            },
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
                    vm.$httpGet('/admin/epay/channelInfo/delete', {
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
                this.$httpGet('/admin/epay/channelInfo/index', {
                    pageNo: this.cur_page,
                    pageSize: 10,
                    channelName: this.searchDataForm.channelName,
                    channelAccessCode: this.searchDataForm.channelAccessCode
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
                if (!this.addDataForm.channelName) {
                    this.$message.warning('通道名称不能为空！');
                    return false;
                }
                if (!this.addDataForm.channelAccessCode) {
                    this.$message.warning('通道接入码不能为空！');
                    return false;
                }
                if (!this.addDataForm.bankUrl) {
                    this.$message.warning('通道接入请求地址不能为空！');
                    return false;
                }
                if (!this.addDataForm.unionMerNo) {
                    this.$message.warning('商户号不能为空！');
                    return false;
                }
                if (!/^\d{1,20}$/.test(vm.addDataForm.unionMerNo)) {
                    this.$message.warning('商户号20位以内的数字！');
                    return false;
                }
                if (!this.addDataForm.acqInsCode) {
                    this.$message.warning('机构号不能为空！');
                    return false;
                }
                if (!/^\d{1,10}$/.test(vm.addDataForm.acqInsCode)) {
                    this.$message.warning('机构号10位以内的数字！');
                    return false;
                }
                if (!this.addDataForm.localFee) {
                    this.$message.warning('银行收取费率不能为空！');
                    return false;
                }
                if (!/^\d{1,10}(\.\d{1,5})?$/.test(vm.addDataForm.localFee)) {
                    this.$message.warning('银行收取费率整数最多10位，小数最多为5位！');
                    return false;
                }
                if (!this.addDataForm.channelState) {
                    this.$message.warning('使用状态不能为空！');
                    return false;
                }
                if (!this.addDataForm.computeMode) {
                    this.$message.warning('收费方式不能为空！');
                    return false;
                }
                this.$httpPost('/admin/epay/channelInfo/save', {
                    channelName: this.addDataForm.channelName,
                    channelAccessCode: this.addDataForm.channelAccessCode,
                    bankUrl: this.addDataForm.bankUrl,
                    localFee: Number(this.addDataForm.localFee),
                    channelState: this.addDataForm.channelState,
                    computeMode: this.addDataForm.computeMode,
                    remark: this.addDataForm.remark,
                    unionMerNo: this.addDataForm.unionMerNo,
                    acqInsCode: this.addDataForm.acqInsCode
                }).then((data) => {
                    vm.$message.success(data.message);
                    vm.isShowAdd = false;
                    vm.addDataForm = {};
                    vm.handleCurrentChange(1);
                }).catch((data) => {
                    console.log(data)
                })
            },
            handleEdit(row) {
                this.isShowEdit = true;
                this.editDataForm.id = row.id;
                this.editDataForm.channelName = row.channelName;
                this.editDataForm.channelAccessCode = row.channelAccessCode;
                this.editDataForm.bankUrl = row.bankUrl;
                this.editDataForm.localFee = row.localFee;
                this.editDataForm.channelState = row.channelState;
                this.editDataForm.computeMode = row.computeMode;
                this.editDataForm.remark = row.remark;
                this.editDataForm.unionMerNo = row.unionMerNo;
                this.editDataForm.acqInsCode = row.acqInsCode
            },
            cancelEdit() {
                this.isShowEdit = false;
            },
            submitEdit() {
                let vm = this;
                if (!this.editDataForm.channelName) {
                    this.$message.warning('通道名称不能为空！');
                    return false;
                }
                if (!this.editDataForm.channelAccessCode) {
                    this.$message.warning('通道接入码不能为空！');
                    return false;
                }
                if (!this.editDataForm.bankUrl) {
                    this.$message.warning('通道接入请求地址不能为空！');
                    return false;
                }
                if (!this.editDataForm.unionMerNo) {
                    this.$message.warning('商户号不能为空！');
                    return false;
                }
                if (!/^\d{1,20}$/.test(vm.editDataForm.unionMerNo)) {
                    this.$message.warning('商户号20位以内的数字！');
                    return false;
                }
                if (!this.editDataForm.acqInsCode) {
                    this.$message.warning('机构号不能为空！');
                    return false;
                }
                if (!/^\d{1,10}$/.test(vm.editDataForm.acqInsCode)) {
                    this.$message.warning('机构号10位以内的数字！');
                    return false;
                }
                if (!this.editDataForm.localFee) {
                    this.$message.warning('银行收取费率不能为空！');
                    return false;
                }
                if (!/^\d{1,10}(\.\d{1,5})?$/.test(vm.editDataForm.localFee)) {
                    this.$message.warning('银行收取费率整数最多10位，小数最多为5位！');
                    return false;
                }
                if (!this.editDataForm.channelState) {
                    this.$message.warning('使用状态不能为空！');
                    return false;
                }
                if (!this.editDataForm.computeMode) {
                    this.$message.warning('收费方式不能为空！');
                    return false;
                }
                this.$httpPost('/admin/epay/channelInfo/update', {
                    id: this.editDataForm.id,
                    channelName: this.editDataForm.channelName,
                    channelAccessCode: this.editDataForm.channelAccessCode,
                    bankUrl: this.editDataForm.bankUrl,
                    localFee: this.editDataForm.localFee,
                    channelState: this.editDataForm.channelState,
                    computeMode: this.editDataForm.computeMode,
                    remark: this.editDataForm.remark,
                    unionMerNo: this.editDataForm.unionMerNo,
                    acqInsCode: this.editDataForm.acqInsCode
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
