<template>
    <div class="table">
        <div class="container">
            <div class="add" style="margin-bottom: 30px;">
                <el-button type="primary" size="medium" icon="el-icon-plus" @click="add">增加</el-button>
            </div>
            <div class="handle-box" style="margin-bottom: 20px;display: flex;flex-flow: row wrap;">
                <div style="margin: 0px 20px 10px 0;">
                    <span>模板号：</span>
                    <el-input style="width: 150px;" class="username" v-model.trim="searchDataForm.templateCode"
                              clearable placeholder="请填写模板号">
                    </el-input>
                </div>
                <div style="margin: 0px 20px 10px 0;">
                    <span>平台标识：</span>
                    <el-select style="width: 150px;" v-model="searchDataForm.platformId" placeholder="请选择平台标识">
                        <el-option
                            v-for="item in platformIdList"
                            :key="item.id"
                            :label="item.platformName"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <div>
                    <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
                </div>
            </div>
            <el-table :data="getDataList" border style="width: 100%;">
                <el-table-column prop="platformId" label="平台标识">
                    <template slot-scope="scope">
                        <span v-if="scope.row.platformId == item.id" v-for="(item,index) in platformIdList">{{ item.platformName }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="templateCode" label="模板号">
                </el-table-column>
                <el-table-column prop="content" label="短信模板内容">
                </el-table-column>
                <el-table-column label="操作" width="100px" align="center">
                    <template v-if="getDataList.length > 0" slot-scope="scope">
                        <el-button @click="handleEdit(scope.row)" type="primary" icon="el-icon-edit" size="small">编辑
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
        <el-dialog title="增加短信" :visible.sync="isShowAdd" :before-close="cancelAdd" width="500px" center>
            <div class="form-content" style="margin: 0 auto;width: 90%;">
                <el-form ref="addDataForm" :model="addDataForm" label-width="120px">
                    <el-form-item label="模板号：">
                        <el-input v-model.trim="addDataForm.templateCode"></el-input>
                    </el-form-item>
                    <el-form-item label="平台标识：">
                        <el-select v-model="addDataForm.platformId" placeholder="请选择平台标识">
                            <el-option
                                v-for="item in platformIdList"
                                :key="item.id"
                                :label="item.platformName"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="短信模板内容：">
                        <el-input type="textarea" v-model.trim="addDataForm.content"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitAdd">确 定</el-button>
                <el-button @click="cancelAdd">取 消</el-button>
            </span>
        </el-dialog>

        <!--编辑后台角色-->
        <el-dialog title="编辑短信" :visible.sync="isShowEdit" :before-close="cancelEdit" width="500px" center>
            <div class="form-content" style="margin: 0 auto;width: 90%;">
                <el-form ref="editDataForm" :model="editDataForm" label-width="120px">
                    <el-form-item label="模板号：">
                        <el-input v-model.trim="editDataForm.templateCode"></el-input>
                    </el-form-item>
                    <el-form-item label="平台标识：">
                        <el-select v-model="editDataForm.platformId" placeholder="请选择平台标识">
                            <el-option
                                v-for="item in platformIdList"
                                :key="item.id"
                                :label="item.platformName"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="短信模板内容：">
                        <el-input type="textarea" v-model.trim="editDataForm.content"></el-input>
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
                this.getData();
            },
            getData() {
                let vm = this;
                this.$httpGet('/admin/sms/smsTemplateList', {
                    pageNo: this.cur_page,
                    pageSize: 10,
                    templateCode: this.searchDataForm.templateCode,
                    platformId: this.searchDataForm.platformId
                }).then(({data}) => {
                    vm.getDataList = data.list;
                    vm.total = data.total;
                }).catch((data) => {
                    console.log(data)
                })
            },
            search() {
                let vm = this;
                this.$httpGet('/admin/sms/smsTemplateList', {
                    pageNo: 1,
                    pageSize: 10,
                    templateCode: this.searchDataForm.templateCode,
                    platformId: this.searchDataForm.platformId
                }).then(({data}) => {
                    vm.getDataList = data.list;
                    vm.total = data.total;
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
                if (!this.addDataForm.templateCode) {
                    this.$message.warning('模板号不能为空！');
                    return false;
                }
                if (!this.addDataForm.platformId) {
                    this.$message.warning('平台标识不能为空！');
                    return false;
                }
                if (!this.addDataForm.content) {
                    this.$message.warning('短信模板内容不能为空！');
                    return false;
                }
                this.$httpPost('/admin/sms/insertSmsTemplate', {
                    templateCode: this.addDataForm.templateCode,
                    platformId: this.addDataForm.platformId,
                    content: this.addDataForm.content
                }).then((data) => {
                    vm.$message.success(data.message);
                    vm.isShowAdd = false;
                    vm.addDataForm = {};
                    vm.$httpGet('/admin/sms/smsTemplateList', {
                        pageNo: 1,
                        pageSize: 10,
                        templateCode: this.searchDataForm.templateCode,
                        platformId: this.searchDataForm.platformId
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
                this.editDataForm.id = row.id;
                this.editDataForm.platformId = row.platformId;
                this.editDataForm.templateCode = row.templateCode;
                this.editDataForm.content = row.content;
            },
            cancelEdit() {
                this.isShowEdit = false;
                this.editDataForm = {};
            },
            submitEdit() {
                let vm = this;
                if (!this.editDataForm.templateCode) {
                    this.$message.warning('模板号不能为空！');
                    return false;
                }
                if (!this.editDataForm.platformId) {
                    this.$message.warning('平台标识不能为空！');
                    return false;
                }
                if (!this.editDataForm.content) {
                    this.$message.warning('短信模板内容不能为空！');
                    return false;
                }
                this.$httpPost('/admin/sms/updateSmsTemplate', {
                    id: this.editDataForm.id,
                    templateCode: this.editDataForm.templateCode,
                    platformId: this.editDataForm.platformId,
                    content: this.editDataForm.content,
                }).then((data) => {
                    vm.$message.success(data.message);
                    vm.isShowEdit = false;
                    vm.editDataForm = {};
                    vm.getData();
                }).catch((data) => {
                    console.log(data)
                })
            },
            getPlatFormList() {
                let vm = this;
                this.$httpGet('/admin/platformInfo/option', {}).then(({data}) => {
                    vm.platformIdList = data;
                    vm.getData();
                }).catch((data) => {
                    console.log(data)
                })
            }
        },
        created() {
            this.getPlatFormList();
        }
    }

</script>

<style scoped>

</style>
