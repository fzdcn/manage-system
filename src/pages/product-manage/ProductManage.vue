<template>
    <div class="table">
        <div class="container">
            <div class="add" style="margin-bottom: 30px;">
                <el-button type="primary" size="medium" icon="el-icon-plus" @click="add">增加</el-button>
            </div>
            <div class="handle-box" style="margin-bottom: 20px;display: flex;flex-flow: row wrap;">
                <div style="margin: 0px 20px 10px 0;">
                    <span>产品名称：</span>
                    <el-input style="width: 150px;" class="username" v-model.trim="searchDataForm.productName"
                              clearable placeholder="请填写产品名称">
                    </el-input>
                </div>
                <div style="margin: 0px 20px 10px 0;">
                    <span>产品接入码：</span>
                    <el-input style="width: 150px;" class="username" v-model.trim="searchDataForm.productAccessCode"
                              clearable placeholder="请填写产品接入码">
                    </el-input>
                </div>
                <div>
                    <el-button type="primary" icon="el-icon-search" @click="handleCurrentChange(1)">
                        搜索
                    </el-button>
                </div>
            </div>
            <el-table :data="getDataList" border style="width: 100%;">
                <el-table-column prop="productName" label="产品名称">
                </el-table-column>
                <el-table-column prop="productAccessCode" label="产品接入码">
                </el-table-column>
                <el-table-column prop="productState" label="产品状态">
                    <template slot-scope="scope">
                        <span v-if="scope.row.productState">开启</span>
                        <span v-else>关闭</span>
                    </template>
                </el-table-column>
                <el-table-column prop="localFee" label="基础参考费率">
                    <template slot-scope="scope">
                        <span v-if="scope.row.localFee < 1">{{ scope.row.localFee * 100 }}%</span>
                        <span v-else>{{ scope.row.localFee }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="computeMode" label="收费方式">
                    <template slot-scope="scope">
                        <span v-if="scope.row.computeMode == 1">通用比例</span>
                        <span v-if="scope.row.computeMode == 2">借贷比例</span>
                        <span v-if="scope.row.computeMode == 3">定额</span>
                    </template>
                </el-table-column>
                <el-table-column prop="productDesc" label="产品描述">
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
        <el-dialog title="增加产品信息" :visible.sync="isShowAdd" :before-close="cancelAdd" width="720px" center>
            <div class="form-content" style="margin: 0 auto;width: 90%;">
                <el-form ref="addDataForm" :model="addDataForm" label-width="150px">
                    <el-form-item label="产品名称：">
                        <el-input clearable v-model.trim="addDataForm.productName"></el-input>
                    </el-form-item>
                    <el-form-item label="产品接入码：">
                        <el-input clearable v-model.trim="addDataForm.productAccessCode"></el-input>
                    </el-form-item>
                    <el-form-item label="产品状态：">
                        <el-select clearable v-model="addDataForm.productState" placeholder="使用状态">
                            <el-option
                                v-for="item in productStateList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="基础参考费率：">
                        <el-input v-model.number="addDataForm.localFee" type="number"
                                  placeholder="不能为负数,整数最多10位，小数最多5位,>=1时，收费方式只能是定额"></el-input>
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
                    <el-form-item label="产品描述：">
                        <el-input maxlength="255" type="textarea" v-model.trim="addDataForm.productDesc"
                                  placeholder="长度最多为255"></el-input>
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
                    <el-form-item label="产品名称：">
                        <el-input clearable v-model.trim="editDataForm.productName"></el-input>
                    </el-form-item>
                    <el-form-item label="产品接入码：">
                        <el-input clearable v-model.trim="editDataForm.productAccessCode"></el-input>
                    </el-form-item>
                    <el-form-item label="产品状态：">
                        <el-select clearable v-model="editDataForm.productState" placeholder="产品状态">
                            <el-option
                                v-for="item in productStateList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="基础参考费率：">
                        <el-input v-model.number="editDataForm.localFee" type="number"
                                  placeholder="不能为负数,整数最多10位，小数最多5位,>=1时，收费方式只能是定额"></el-input>
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
                    <el-form-item label="产品描述：">
                        <el-input maxlength="255" type="textarea" v-model.trim="editDataForm.productDesc"
                                  placeholder="长度最多为255"></el-input>
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
                    id: "",
                    productName: "",
                    productAccessCode: "",
                    bankUrl: "",
                    localFee: "",
                    productState: "",
                    computeMode: "",
                    productDesc: "",
                    remark: ""
                },
                productStateList: [
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
                    vm.$httpGet('/admin/epay/productsInfo/delete', {
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
                this.$httpGet('/admin/epay/productsInfo/index', {
                    pageNo: this.cur_page,
                    pageSize: 10,
                    productName: this.searchDataForm.productName,
                    productAccessCode: this.searchDataForm.productAccessCode
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
                if (!this.addDataForm.productName) {
                    this.$message.warning('产品名称不能为空！');
                    return false;
                }
                if (!this.addDataForm.productAccessCode) {
                    this.$message.warning('产品接入码不能为空！');
                    return false;
                }
                if (!this.addDataForm.productState) {
                    this.$message.warning('产品状态不能为空！');
                    return false;
                }
                if (!this.addDataForm.localFee) {
                    this.$message.warning('基础参考费率不能为空！');
                    return false;
                }
                if (/^\-\d+\.?\d*$/.test(vm.addDataForm.localFee)) {
                    this.$message.warning('基础参考费率不能为负数！');
                    return false;
                }
                if (!/^\d{1,10}(\.\d{1,5})?$/.test(vm.addDataForm.localFee)) {
                    this.$message.warning('基础参考费率整数最多10位，小数最多为5位！');
                    return false;
                }
                if (!this.addDataForm.computeMode) {
                    this.$message.warning('收费方式不能为空！');
                    return false;
                }
                if (!this.addDataForm.productDesc) {
                    this.$message.warning('产品描述不能为空！');
                    return false;
                }
                this.$httpPost('/admin/epay/productsInfo/save', {
                    productName: this.addDataForm.productName,
                    productAccessCode: this.addDataForm.productAccessCode,
                    productState: this.addDataForm.productState,
                    localFee: Number(this.addDataForm.localFee),
                    computeMode: this.addDataForm.computeMode,
                    productDesc: this.addDataForm.productDesc,
                    remark: this.addDataForm.remark
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
                this.editDataForm.productName = row.productName;
                this.editDataForm.productAccessCode = row.productAccessCode;
                this.editDataForm.bankUrl = row.bankUrl;
                this.editDataForm.localFee = row.localFee;
                this.editDataForm.productState = row.productState;
                this.editDataForm.computeMode = row.computeMode;
                this.editDataForm.productDesc = row.productDesc;
                this.editDataForm.remark = row.remark;
            },
            cancelEdit() {
                this.isShowEdit = false;
            },
            submitEdit() {
                let vm = this;
                if (!this.editDataForm.productName) {
                    this.$message.warning('产品名称不能为空！');
                    return false;
                }
                if (!this.editDataForm.productAccessCode) {
                    this.$message.warning('产品接入码不能为空！');
                    return false;
                }
                if (!this.editDataForm.productState) {
                    this.$message.warning('产品状态不能为空！');
                    return false;
                }
                if (!this.editDataForm.localFee) {
                    this.$message.warning('基础参考费率不能为空！');
                    return false;
                }
                if (/^\-\d+\.?\d*$/.test(vm.editDataForm.localFee)) {
                    this.$message.warning('基础参考费率不能为负数！');
                    return false;
                }
                if (!/^\d{1,10}(\.\d{1,5})?$/.test(vm.editDataForm.localFee)) {
                    this.$message.warning('基础参考费率整数最多10位，小数最多为5位！');
                    return false;
                }
                if (!this.editDataForm.computeMode) {
                    this.$message.warning('收费方式不能为空！');
                    return false;
                }
                if (!this.editDataForm.productDesc) {
                    this.$message.warning('产品描述不能为空！');
                    return false;
                }
                this.$httpPost('/admin/epay/productsInfo/update', {
                    id: this.editDataForm.id,
                    productName: this.editDataForm.productName,
                    productAccessCode: this.editDataForm.productAccessCode,
                    productState: this.editDataForm.productState,
                    localFee: this.editDataForm.localFee,
                    computeMode: this.editDataForm.computeMode,
                    productDesc: this.editDataForm.productDesc,
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
            this.getData();
        }
    }

</script>

<style scoped>

</style>
