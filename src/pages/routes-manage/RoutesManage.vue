<template>
    <div class="table">
        <div class="container">
            <div class="add" style="margin-bottom: 30px;">
                <el-button type="primary" size="medium" icon="el-icon-plus" @click="add">增加</el-button>
            </div>
            <div class="handle-box" style="margin-bottom: 20px;display: flex;flex-flow: row wrap;">
                <div style="margin: 0px 20px 10px 0;">
                    <span>银行名称：</span>
                    <el-input style="width: 150px;" class="username" v-model.trim="searchDataForm.templateCode"
                              clearable placeholder="请填写银行名称">
                    </el-input>
                </div>
                <div style="margin: 0px 20px 10px 0;">
                    <span>通道卡类型：</span>
                    <el-select clearable style="width: 150px;" v-model="searchDataForm.platformId" placeholder="通道卡类型">
                        <el-option
                            v-for="item in platformIdList"
                            :key="item.id"
                            :label="item.platformName"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <div style="margin: 0px 20px 10px 0;">
                    <span>指定商户类型：</span>
                    <el-select clearable style="width: 150px;" v-model="searchDataForm.platformId"
                               placeholder="通指定商户类型">
                        <el-option
                            v-for="item in platformIdList"
                            :key="item.id"
                            :label="item.platformName"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <div style="margin: 0px 20px 10px 0;">
                    <span>公司支付通道：</span>
                    <el-select clearable style="width: 150px;" v-model="searchDataForm.platformId" placeholder="公司支付通道">
                        <el-option
                            v-for="item in platformIdList"
                            :key="item.id"
                            :label="item.platformName"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <div style="margin: 0px 20px 10px 0;">
                    <span>银行支付通道：</span>
                    <el-select clearable style="width: 150px;" v-model="searchDataForm.platformId" placeholder="银行支付通道">
                        <el-option
                            v-for="item in platformIdList"
                            :key="item.id"
                            :label="item.platformName"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <div>
                    <el-button type="primary" icon="el-icon-search" @click="cur_page=1;getData();">搜索</el-button>
                </div>
            </div>
            <el-table :data="getDataList" border style="width: 100%;">
                <el-table-column prop="platformNo" label="id">
                </el-table-column>
                <el-table-column prop="name" label="银行名称">
                </el-table-column>
                <el-table-column prop="md5Key" label="银行代码">
                </el-table-column>
                <el-table-column prop="publicKey" label="银行编号">
                </el-table-column>
                <el-table-column prop="privateKey" label="公司通道名称">
                </el-table-column>
                <el-table-column prop="privateKey" label="公司通道接入码">
                </el-table-column>
                <el-table-column prop="privateKey" label="银行通道名称">
                </el-table-column>
                <el-table-column prop="privateKey" label="银行通道接入码">
                </el-table-column>
                <el-table-column prop="privateKey" label="通道卡类型">
                </el-table-column>
                <el-table-column prop="privateKey" label="交易金额下限">
                </el-table-column>
                <el-table-column prop="privateKey" label="交易金额上限">
                </el-table-column>
                <el-table-column prop="privateKey" label="使用范围">
                </el-table-column>
                <el-table-column prop="privateKey" label="商户号">
                </el-table-column>
                <el-table-column prop="privateKey" label="指定商户类型">
                </el-table-column>
                <el-table-column prop="privateKey" label="操作人">
                </el-table-column>
                <el-table-column prop="privateKey" label="执行时间">
                </el-table-column>
                <el-table-column prop="privateKey" label="备注">
                </el-table-column>
                <el-table-column prop="privateKey" label="执行时间">
                </el-table-column>
                <el-table-column label="操作" width="160px" align="center">
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
                <el-pagination background :current-page="cur_page" @current-change="handleCurrentChange"
                               layout="total, prev, pager, next, jumper"
                               :page-size="10" :pager-count="11" :total="total">
                </el-pagination>
            </div>
        </div>
        <!--增加-->
        <el-dialog title="增加交易通道" :visible.sync="isShowAdd" :before-close="cancelAdd" width="650px" center>
            <div class="form-content" style="margin: 0 auto;width: 90%;">
                <el-form ref="addDataForm" :model="addDataForm" label-width="140px">
                    <el-form-item label="银行：">
                        <el-select clearable v-model="addDataForm.roleId" placeholder="银行" style="width: 400px">
                            <el-option
                                v-for="item in roleList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="公司支付通道：">
                        <el-select clearable v-model="addDataForm.roleId" placeholder="公司支付通道" style="width: 400px">
                            <el-option
                                v-for="item in roleList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="银行支付通道：">
                        <el-select clearable v-model="addDataForm.roleId" placeholder="银行支付通道" style="width: 400px">
                            <el-option
                                v-for="item in roleList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="使用卡类型：">
                        <el-radio-group v-model="addDataForm.resource">
                            <el-radio label="借贷通用"></el-radio>
                            <el-radio label="借记卡"></el-radio>
                            <el-radio label="贷记卡"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="指定商户类型：">
                        <el-radio-group v-model="addDataForm.resource1">
                            <el-radio label="通用"></el-radio>
                            <el-radio label="直营商户"></el-radio>
                            <el-radio label="存管商户"></el-radio>
                            <el-radio label="会员商户"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="指定商户号：">
                        <el-input v-model.trim="addDataForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="通道支付金额下限：">
                        <el-input v-model.trim="addDataForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="通道支付金额上限：">
                        <el-input v-model.trim="addDataForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="备注：">
                        <el-input v-model.trim="addDataForm.name"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitAdd">确 定</el-button>
                <el-button @click="cancelAdd">取 消</el-button>
            </span>
        </el-dialog>

        <!--编辑-->
        <el-dialog title="编辑平台信息" :visible.sync="isShowEdit" :before-close="cancelEdit" width="600px" center>
            <div class="form-content" style="margin: 0 auto;width: 90%;">
                <el-form ref="editDataForm" :model="editDataForm" label-width="120px">
                    <el-form-item label="平台号：">
                        <el-input v-model.trim="editDataForm.platformNo"></el-input>
                    </el-form-item>
                    <el-form-item label="平台名称：">
                        <el-input v-model.trim="editDataForm.platformName"></el-input>
                    </el-form-item>
                    <el-form-item label="md5Key：">
                        <el-input v-model.trim="editDataForm.md5Key"></el-input>
                    </el-form-item>
                    <el-form-item label="公钥：">
                        <!--<el-input v-model.trim="editDataForm.publicKey"></el-input>-->
                        <template slot-scope="scope">
                            <el-popover trigger="hover" placement="top">
                                <p>标题: 公钥</p>
                                <p>{{ scope.row.publicKey }}</p>
                                <div slot="reference" class="name-wrapper">
                                    <el-tag size="medium">{{ scope.row.publicKey }}</el-tag>
                                </div>
                            </el-popover>
                        </template>
                    </el-form-item>
                    <el-form-item label="私钥：">
                        <el-input v-model.trim="editDataForm.privateKey"></el-input>
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
                // 增加参数
                addDataForm: {
                    resource: '借贷通用'
                },
                // 编辑参数
                editDataForm: {},
                searchDataForm: {},
                platformIdList: [],
            }
        },
        methods: {
            // 分页导航
            handleCurrentChange(val) {
                this.cur_page = val;
                this.getData();
            },
            getData() {
                let vm = this;
                this.$httpGet('/admin/platformInfo/list', {
                    pageNo: this.cur_page,
                    pageSize: 10,
                    platformNo: this.searchDataForm.platformNo
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
                if (!this.addDataForm.platformNo) {
                    this.$message.warning('平台号不能为空！');
                    return false;
                }
                if (!this.addDataForm.platformName) {
                    this.$message.warning('平台名称不能为空！');
                    return false;
                }
                this.$httpPost('/admin/platformInfo/add', {
                    platformNo: this.addDataForm.platformNo,
                    platformName: this.addDataForm.platformName
                }).then((data) => {
                    vm.$message.success(data.message);
                    vm.isShowAdd = false;
                    vm.addDataForm = {};
                    vm.$httpGet('/admin/platformInfo/list', {
                        pageNo: 1,
                        pageSize: 10,
                        platformNo: this.searchDataForm.platformNo
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
                this.editDataForm.platformNo = row.platformNo;
                this.editDataForm.platformName = row.platformName;
                this.editDataForm.md5Key = row.md5Key;
                this.editDataForm.publicKey = row.publicKey;
                this.editDataForm.privateKey = row.privateKey;
                this.editDataForm.id = row.id;
            },
            cancelEdit() {
                this.isShowEdit = false;
                this.editDataForm = {};
            },
            submitEdit() {
                let vm = this;
                if (!this.editDataForm.platformNo) {
                    this.$message.warning('平台号不能为空！');
                    return false;
                }
                if (!this.editDataForm.platformName) {
                    this.$message.warning('平台名称不能为空！');
                    return false;
                }
                if (!this.editDataForm.md5Key) {
                    this.$message.warning('md5Key不能为空！');
                    return false;
                }
                if (!this.editDataForm.publicKey) {
                    this.$message.warning('公钥不能为空！');
                    return false;
                }
                if (!this.editDataForm.privateKey) {
                    this.$message.warning('私钥不能为空！');
                    return false;
                }
                this.$httpPost('/admin/platformInfo/update', {
                    id: this.editDataForm.id,
                    platformNo: this.editDataForm.platformNo,
                    platformName: this.editDataForm.platformName,
                    md5Key: this.editDataForm.md5Key,
                    publicKey: this.editDataForm.publicKey,
                    privateKey: this.editDataForm.privateKey
                }).then((data) => {
                    vm.$message.success(data.message);
                    vm.isShowEdit = false;
                    vm.editDataForm = {};
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
