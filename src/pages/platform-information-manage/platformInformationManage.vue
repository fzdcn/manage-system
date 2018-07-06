<template>
    <div class="table">
        <div class="container">
            <div class="add" style="margin-bottom: 30px;">
                <el-button type="primary" size="medium" icon="el-icon-plus" @click="add">增加</el-button>
            </div>
            <div class="handle-box" style="margin-bottom: 20px;display: flex;flex-flow: row wrap;">
                <div style="margin: 0px 20px 10px 0;">
                    <span>平台号：</span>
                    <el-input style="width: 150px;" class="username" v-model.trim="searchDataForm.platformNo"
                              clearable placeholder="请填写平台号">
                    </el-input>
                </div>
                <div>
                    <el-button type="primary" icon="el-icon-search" @click="handleCurrentChange(1)">搜索</el-button>
                </div>
            </div>
            <el-table :data="getDataList" border style="width: 100%;">
                <el-table-column show-overflow-tooltip prop="platformNo" label="平台号">
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="name" label="平台名称">
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="md5Key" label="md5Key">
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="publicKey" label="公钥">
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="privateKey" label="私钥" align="center">
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
        <el-dialog title="增加平台信息" :visible.sync="isShowAdd" :before-close="cancelAdd" width="500px" center>
            <div class="form-content" style="margin: 0 auto;width: 90%;">
                <el-form ref="addDataForm" :model="addDataForm" label-width="120px">
                    <el-form-item label="平台号：">
                        <el-input clearable v-model.trim="addDataForm.platformNo"></el-input>
                    </el-form-item>
                    <el-form-item label="平台名称：">
                        <el-input clearable v-model.trim="addDataForm.platformName"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitAdd">确 定</el-button>
                <el-button @click="cancelAdd">取 消</el-button>
            </span>
        </el-dialog>

        <!--编辑-->
        <el-dialog title="编辑平台信息" :visible.sync="isShowEdit" :before-close="cancelEdit" width="500px" center>
            <div class="form-content" style="margin: 0 auto;width: 90%;">
                <el-form ref="editDataForm" :model="editDataForm" label-width="120px">
                    <el-form-item label="平台号：">
                        <el-input clearable v-model.trim="editDataForm.platformNo"></el-input>
                    </el-form-item>
                    <el-form-item label="平台名称：">
                        <el-input clearable v-model.trim="editDataForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="md5Key：">
                        <el-input clearable v-model.trim="editDataForm.md5Key"></el-input>
                    </el-form-item>
                    <el-form-item label="公钥：">
                        <el-input clearable type="textarea" v-model.trim="editDataForm.publicKey"></el-input>
                    </el-form-item>
                    <el-form-item label="私钥：">
                        <el-input clearable type="textarea" v-model.trim="editDataForm.privateKey"></el-input>
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
                editDataForm: {},
                searchDataForm: {},
                platformIdList: [],
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
                this.$httpGet('/admin/platformInfo/list', {
                    pageNo: this.cur_page,
                    pageSize: 10,
                    platformNo: this.searchDataForm.platformNo
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
                    vm.cancelAdd();
                    vm.handleCurrentChange(1);
                }).catch((data) => {
                    console.log(data)
                })
            },
            handleEdit(row) {
                this.isShowEdit = true;
                this.editDataForm.platformNo = row.platformNo;
                this.editDataForm.name = row.name;
                this.editDataForm.md5Key = row.md5Key;
                this.editDataForm.publicKey = row.publicKey;
                this.editDataForm.privateKey = row.privateKey;
                this.editDataForm.id = row.id;
            },
            cancelEdit() {
                this.isShowEdit = false;
            },
            submitEdit() {
                let vm = this;
                if (!this.editDataForm.platformNo) {
                    this.$message.warning('平台号不能为空！');
                    return false;
                }
                if (!this.editDataForm.name) {
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
                    platformName: this.editDataForm.name,
                    md5Key: this.editDataForm.md5Key,
                    publicKey: this.editDataForm.publicKey,
                    privateKey: this.editDataForm.privateKey
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
