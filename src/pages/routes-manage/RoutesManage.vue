<template>
    <div class="table">
        <div class="container">
            <div class="add" style="margin-bottom: 30px;">
                <el-button type="primary" size="medium" icon="el-icon-plus" @click="add">增加</el-button>
            </div>
            <div class="handle-box" style="margin-bottom: 20px;display: flex;flex-flow: row wrap;">
                <div style="margin: 0px 20px 10px 0;">
                    <span>银行名称：</span>
                    <el-select clearable style="width: 150px;" v-model="searchDataForm.bankCode" placeholder="请选择银行名称">
                        <el-option v-for="item in bankInfoList" :key="item.bankCode" :label="item.bankName"
                                   :value="item.bankCode">
                        </el-option>
                    </el-select>
                </div>
                <div style="margin: 0px 20px 10px 0;">
                    <span>卡类型：</span>
                    <el-select clearable style="width: 150px;" v-model="searchDataForm.cardType" placeholder="请选择卡类型">
                        <el-option v-for="item in cardType" :key="item.id" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <div style="margin: 0px 20px 10px 0;">
                    <span>平台名称：</span>
                    <el-select clearable style="width: 150px;" v-model="searchDataForm.platformNo"
                               placeholder="请选择平台名称">
                        <el-option v-for="item in platformIdList" :key="item.platformNo" :label="item.platformName"
                                   :value="item.platformNo">
                        </el-option>
                    </el-select>
                </div>
                <div style="margin: 0px 20px 10px 0;">
                    <span>产品名称：</span>
                    <el-select clearable style="width: 150px;" v-model="searchDataForm.productAccessCode"
                               placeholder="请选择产品名称">
                        <el-option v-for="item in productNameList" :key="item.productAccessCode"
                                   :label="item.productName" :value="item.productAccessCode">
                        </el-option>
                    </el-select>
                </div>
                <div style="margin: 0px 20px 10px 0;">
                    <span>银行支付通道：</span>
                    <el-select clearable style="width: 150px;" v-model="searchDataForm.channelAccessCode"
                               placeholder="请选择银行支付通道">
                        <el-option v-for="item in channelNameList" :key="item.channelAccessCode"
                                   :label="item.channelName" :value="item.channelAccessCode">
                        </el-option>
                    </el-select>
                </div>
                <div>
                    <el-button type="primary" icon="el-icon-search" @click="handleCurrentChange(1)">搜索</el-button>
                </div>
            </div>
            <el-table :data="getDataList" border style="width: 100%;">
                <el-table-column show-overflow-tooltip prop="id" label="编号">
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="bankName" label="银行名称">
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="cardType" label="卡类型">
                    <template slot-scope="scope">
                        <span v-if="scope.row.cardType==1">借记卡</span>
                        <span v-if="scope.row.cardType==2">贷记卡</span>
                        <span v-if="scope.row.cardType==9">通用</span>
                    </template>
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="platformName" label="平台名称">
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="productName" label="产品名称">
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="channelName" label="银行支付通道">
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="amountMin" label="交易下限（元）">
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="amountMax" label="交易上限（元）">
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="remark" label="备注">
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="status" label="状态">
                    <template slot-scope="scope">
                        <span v-if="scope.row.status==1">可用</span>
                        <span v-else>不可用</span>
                    </template>
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="createBy" label="创建人">
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="createAt" label="创建时间">
                </el-table-column>
                <el-table-column label="操作" width="100px" align="center">
                    <template v-if="getDataList.length > 0" slot-scope="scope">
                        <el-button @click="handleEdit(scope.row)" type="primary" icon="el-icon-edit" size="small">编辑
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
        <el-dialog title="添加渠道路由" :visible.sync="isShowAdd" :before-close="cancelAdd" width="650px" center>
            <div class="form-content" style="margin: 0 auto;width: 90%;">
                <el-form ref="addDataForm" :model="addDataForm" label-width="140px">
                    <el-form-item label="银行名称：">
                        <el-select clearable v-model="addDataForm.bankCode" placeholder="银行名称" style="width: 400px">
                            <el-option
                                v-for="item in bankInfoList"
                                :key="item.bankCode"
                                :label="item.bankName"
                                :value="item.bankCode">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="产品名称：">
                        <el-select clearable v-model="addDataForm.productAccessCode" placeholder="产品名称"
                                   style="width: 400px">
                            <el-option
                                v-for="item in productNameList"
                                :key="item.productAccessCode"
                                :label="item.productName"
                                :value="item.productAccessCode">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="银行支付通道：">
                        <el-select clearable v-model="addDataForm.channelAccessCode" placeholder="银行支付通道"
                                   style="width: 400px">
                            <el-option
                                v-for="item in channelNameList"
                                :key="item.channelAccessCode"
                                :label="item.channelName"
                                :value="item.channelAccessCode">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="卡类型：">
                        <el-select clearable v-model="addDataForm.cardType" placeholder="卡类型"
                                   style="width: 400px">
                            <el-option
                                v-for="item in cardType"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="平台名称：">
                        <el-select clearable v-model="addDataForm.platformCode" placeholder="平台名称"
                                   style="width: 400px">
                            <el-option
                                v-for="item in platformIdList"
                                :key="item.platformNo"
                                :label="item.platformName"
                                :value="item.platformNo">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="交易上限：">
                        <el-input type="number" v-model.trim="addDataForm.amountMax"></el-input>
                    </el-form-item>
                    <el-form-item label="交易下限：">
                        <el-input type="number" v-model.trim="addDataForm.amountMin"></el-input>
                    </el-form-item>
                    <el-form-item label="备注：">
                        <el-input clearable type="textarea" v-model.trim="addDataForm.remark"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitAdd">确 定</el-button>
                <el-button @click="cancelAdd">取消</el-button>
            </span>
        </el-dialog>

        <!--编辑-->
        <el-dialog title="编辑渠道路由" :visible.sync="isShowEdit" :before-close="cancelEdit" width="600px" center>
            <div class="form-content" style="margin: 0 auto;width: 90%;">
                <el-form ref="editDataForm" :model="editDataForm" label-width="120px">
                    <el-form-item label="银行名称：">
                        <el-select clearable v-model="editDataForm.bankCode" placeholder="银行名称" style="width: 400px">
                            <el-option
                                v-for="item in bankInfoList"
                                :key="item.bankCode"
                                :label="item.bankName"
                                :value="item.bankCode">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="产品名称：">
                        <el-select clearable v-model="editDataForm.productAccessCode" placeholder="产品名称"
                                   style="width: 400px">
                            <el-option
                                v-for="item in productNameList"
                                :key="item.productAccessCode"
                                :label="item.productName"
                                :value="item.productAccessCode">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="银行支付通道：">
                        <el-select clearable v-model="editDataForm.channelAccessCode" placeholder="银行支付通道"
                                   style="width: 400px">
                            <el-option
                                v-for="item in channelNameList"
                                :key="item.channelAccessCode"
                                :label="item.channelName"
                                :value="item.channelAccessCode">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="卡类型：">
                        <el-select clearable v-model="editDataForm.cardType" placeholder="卡类型"
                                   style="width: 400px">
                            <el-option
                                v-for="item in cardType"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="平台名称：">
                        <el-select clearable v-model="editDataForm.platformCode" placeholder="平台名称"
                                   style="width: 400px">
                            <el-option
                                v-for="item in platformIdList"
                                :key="item.platformNo"
                                :label="item.platformName"
                                :value="item.platformNo">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="交易上限：">
                        <el-input type="number" v-model.trim="editDataForm.amountMax"></el-input>
                    </el-form-item>
                    <el-form-item label="交易下限：">
                        <el-input type="number" v-model.trim="editDataForm.amountMin"></el-input>
                    </el-form-item>
                    <el-form-item label="备注：">
                        <el-input clearable type="textarea" v-model.trim="editDataForm.remark"></el-input>
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
                // 增加参数
                addDataForm: {},
                // 编辑参数
                editDataForm: {
                    bankCode: "",
                    productAccessCode: "",
                    channelAccessCode: "",
                    cardType: "",
                    platformCode: "",
                    remark: ""
                },
                searchDataForm: {},
                // 平台名称
                platformIdList: [],
                // 银行名称
                bankInfoList: [],
                // 产品名称
                productNameList: [],
                // 银行支付通道
                channelNameList: [],
                // 卡类型
                cardType: [
                    {
                        id: '1',
                        name: '借记卡'
                    },
                    {
                        id: '2',
                        name: '贷记卡'
                    },
                    {
                        id: '9',
                        name: '通用'
                    }
                ],
            }
        },
        methods: {
            // 分页导航
            handleCurrentChange(val) {
                this.cur_page = val;
                this.paginationShow = false;
                this.getData();
            },
            getData() {
                let vm = this;
                this.$httpGet('/admin/routeInfo/list', {
                    pageNo: this.cur_page,
                    pageSize: 10,
                    bankCode: this.searchDataForm.bankCode,
                    cardType: this.searchDataForm.cardType,
                    platformCode: this.searchDataForm.platformNo,
                    productAccessCode: this.searchDataForm.productAccessCode,
                    channelAccessCode: this.searchDataForm.channelAccessCode
                }).then(({data}) => {
                    vm.getDataList = data.list;
                    vm.total = data.total;
                    vm.paginationShow = true;
                }).catch((data) => {
                    console.log(data)
                })
            },
            // 获取同步数据
            getListData() {
                return this.$httpGet('/admin/routeInfo/list', {
                    pageNo: this.cur_page,
                    pageSize: 10,
                    bankCode: this.searchDataForm.bankCode,
                    cardType: this.searchDataForm.cardType,
                    platformCode: this.searchDataForm.platformNo,
                    productAccessCode: this.searchDataForm.productAccessCode,
                    channelAccessCode: this.searchDataForm.channelAccessCode
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
                if (!this.addDataForm.bankCode) {
                    this.$message.warning('银行名称不能为空！');
                    return false;
                }
                if (!this.addDataForm.productAccessCode) {
                    this.$message.warning('产品名称不能为空！');
                    return false;
                }
                if (!this.addDataForm.channelAccessCode) {
                    this.$message.warning('银行支付通道不能为空！');
                    return false;
                }
                if (!this.addDataForm.cardType) {
                    this.$message.warning('卡类型不能为空！');
                    return false;
                }
                if (!this.addDataForm.platformCode) {
                    this.$message.warning('平台名称不能为空！');
                    return false;
                }
                this.$httpPost('/admin/routeInfo/add', {
                    bankCode: this.addDataForm.bankCode,
                    productAccessCode: this.addDataForm.productAccessCode,
                    channelAccessCode: this.addDataForm.channelAccessCode,
                    cardType: this.addDataForm.cardType,
                    platformCode: this.addDataForm.platformCode,
                    amountMax: this.addDataForm.amountMax,
                    amountMin: this.addDataForm.amountMin,
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
                this.editDataForm.bankCode = row.bankCode;
                this.editDataForm.productAccessCode = row.productAccessCode;
                this.editDataForm.channelAccessCode = row.channelAccessCode;
                this.editDataForm.cardType = row.cardType;
                this.editDataForm.platformCode = row.platformCode;
                this.editDataForm.remark = row.remark;
            },
            cancelEdit() {
                this.isShowEdit = false;
            },
            submitEdit() {
                let vm = this;
                if (!this.editDataForm.bankCode) {
                    this.$message.warning('银行名称不能为空！');
                    return false;
                }
                if (!this.editDataForm.productAccessCode) {
                    this.$message.warning('产品名称不能为空！');
                    return false;
                }
                if (!this.editDataForm.channelAccessCode) {
                    this.$message.warning('银行支付通道不能为空！');
                    return false;
                }
                if (!this.editDataForm.cardType) {
                    this.$message.warning('卡类型不能为空！');
                    return false;
                }
                if (!this.editDataForm.platformCode) {
                    this.$message.warning('平台名称不能为空！');
                    return false;
                }
                this.$httpPost('/admin/routeInfo/edit', {
                    id: this.editDataForm.id,
                    bankCode: this.editDataForm.bankCode,
                    productAccessCode: this.editDataForm.productAccessCode,
                    channelAccessCode: this.editDataForm.channelAccessCode,
                    cardType: this.editDataForm.cardType,
                    platformCode: this.editDataForm.platformCode,
                    remark: this.editDataForm.remark
                }).then((data) => {
                    vm.$message.success(data.message);
                    vm.cancelEdit();
                    vm.getData();
                }).catch((data) => {
                    console.log(data)
                })
            },
            // 平台名称
            getPlatFormList() {
                return this.$httpGet('/admin/platformInfo/option', {})
            },
            // 产品名称
            getProductNameList() {
                return this.$httpGet('/admin/epay/productsInfo/findProductAll', {})
            },
            // 银行支付通道
            getChannelInfoList() {
                return this.$httpGet('/admin/epay/channelInfo/findChannelAll', {})
            },
            // 银行信息下拉列表
            getBankInfoList() {
                return this.$httpGet('/admin/bankInfo/option', {})
            },
            async getAllData() {
                let vm = this;
                await Promise.all([vm.getPlatFormList(), vm.getListData(), vm.getProductNameList(), vm.getChannelInfoList(), vm.getBankInfoList()])
                    .then((data) => {
                        vm.platformIdList = data[0].data;
                        vm.productNameList = data[2].data;
                        vm.channelNameList = data[3].data;
                        vm.bankInfoList = data[4].data;
                        vm.getDataList = data[1].data.list;
                        vm.total = data[1].data.total;
                    }).catch((data) => {
                        console.log(data);
                    })
            }
        },
        created() {
            this.getAllData();
        }
    }

</script>

<style scoped>

</style>
