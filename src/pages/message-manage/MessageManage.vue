<template>
    <div class="table">
        <div class="container">
            <div class="add" style="margin-bottom: 30px;">
                <el-button type="primary" size="medium" icon="el-icon-plus" @click="add">增加</el-button>
                <el-button type="primary" size="medium" icon="el-icon-plus" @click="addFile">上传文件</el-button>
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
                    <el-select clearable style="width: 150px;" v-model="searchDataForm.platformId"
                               placeholder="请选择平台标识">
                        <el-option
                            v-for="item in platformIdList"
                            :key="item.id"
                            :label="item.platformName"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <div>
                    <el-button type="primary" icon="el-icon-search" @click="handleCurrentChange(1)">搜索</el-button>
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
                <el-table-column prop="explain" label="短信说明">
                </el-table-column>
                <el-table-column prop="content" label="短信模板内容">
                    <template slot-scope="scope">
                        <el-popover trigger="hover" placement="top">
                            <p>{{ scope.row.content }}</p>
                            <div slot="reference">
                                <el-tag
                                    style="width: 150px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;"
                                    size="medium">{{ scope.row.content }}
                                </el-tag>
                            </div>
                        </el-popover>
                    </template>
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
        <el-dialog title="增加短信" :visible.sync="isShowAdd" :before-close="cancelAdd" width="500px" center>
            <div class="form-content" style="margin: 0 auto;width: 90%;">
                <el-form ref="addDataForm" :model="addDataForm" label-width="120px">
                    <el-form-item label="模板号：">
                        <el-input v-model.trim="addDataForm.templateCode"></el-input>
                    </el-form-item>
                    <el-form-item label="平台标识：">
                        <el-select clearable v-model="addDataForm.platformId" placeholder="请选择平台标识">
                            <el-option
                                v-for="item in platformIdList"
                                :key="item.id"
                                :label="item.platformName"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="短信说明：">
                        <el-input v-model.trim="addDataForm.explain"></el-input>
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
        <!--上传文件-->
        <el-dialog title="上传文件" :visible.sync="isShowFile" :before-close="cancelFile" width="500px" center>
            <div class="form-content" style="margin: 0 auto;width: 90%;">
                <el-form label-position="left" ref="fileDataForm" :model="fileDataForm" label-width="120px">
                    <el-form-item label="平台标识：">
                        <el-col :span="24">
                            <el-select style="width: 100%;" clearable v-model="fileDataForm.platformId"
                                       placeholder="请选择平台标识">
                                <el-option
                                    v-for="item in platformIdList"
                                    :key="item.id"
                                    :label="item.platformName"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </el-col>
                    </el-form-item>
                </el-form>
                <div style="text-align: center;margin-top:30px;">
                    <el-upload
                        class="upload-demo"
                        ref="upload"
                        :multiple="false"
                        :action="uploadUrl"
                        :data="fileDataForm"
                        :file-list="fileList"
                        :limit="1"
                        :before-upload="beforeUpload"
                        :on-remove="handleRemove"
                        :on-change="handleChange"
                        :on-success="handleSuccess"
                        :on-error="handleError"
                        :auto-upload="false"
                        accept=".xlsx,.xls"
                        list-type="picture">
                        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                        <el-button size="small" type="primary"><a style="color: white" :href="downLoadUrl">下载文件示例</a>
                        </el-button>
                        <div slot="tip" class="el-upload__tip">只能上传.xlsx及.xls表格文件</div>
                    </el-upload>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitFile">确 定</el-button>
                <el-button @click="cancelFile">取 消</el-button>
            </span>
        </el-dialog>
        <!--编辑短信-->
        <el-dialog title="编辑短信" :visible.sync="isShowEdit" :before-close="cancelEdit" width="500px" center>
            <div class="form-content" style="margin: 0 auto;width: 90%;">
                <el-form ref="editDataForm" :model="editDataForm" label-width="120px">
                    <el-form-item label="模板号：">
                        <el-input v-model.trim="editDataForm.templateCode"></el-input>
                    </el-form-item>
                    <el-form-item label="平台标识：">
                        <el-select clearable v-model="editDataForm.platformId" placeholder="请选择平台标识">
                            <el-option
                                v-for="item in platformIdList"
                                :key="item.id"
                                :label="item.platformName"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="短信说明：">
                        <el-input v-model.trim="editDataForm.explain"></el-input>
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
    import {API_BASE, DEBUG} from '../../config/config';

    export default {
        data() {
            return {
                fileList: [],
                uploadUrl: API_BASE + '/admin/sms/importSmsTemplate',
                downLoadUrl: 'http://' + window.location.host + '/SMS_template.xlsx',
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
                // 是否显示上传文件弹框
                isShowFile: false,
                // 增加参数
                addDataForm: {},
                // 上传文件参数
                fileDataForm: {},
                // 编辑参数
                editDataForm: {},
                searchDataForm: {},
                platformIdList: [],
            }
        },
        methods: {
            addFile() {
                this.fileList = [];
                this.fileDataForm = {};
                this.isShowFile = true;
            },
            submitFile() {
                if (!this.fileDataForm.platformId) {
                    this.$message.warning('平台标识不能为空！');
                    return false;
                }
                if (!this.fileList.length) {
                    this.$message.warning('上传文件不能为空！');
                    return false;
                }
                this.$refs.upload.submit();
            },
            cancelFile() {
                this.fileList = [];
                this.isShowFile = false;
                this.fileDataForm = {};
            },
            handleChange(file, fileList) {
                this.fileList.push(file);
            },
            handleRemove(file, fileList) {
                this.fileList = fileList;
            },
            beforeUpload(file) {
                this.fileList.push(file);
                let isXlsx = file.name.split('.')[1] === 'xls' || 'xlsx';
                if (!isXlsx) {
                    this.$message.warning('文件类型必须是.xlsx或者.xls表格文件');
                }
                return isXlsx;
            },
            handleSuccess(response, file, fileList) {
                this.fileList = [];
                this.isShowFile = false;
                this.$message.warning(response.message);
                this.getData();
            },
            handleError(error, file, fileList) {
                this.$message.warning(error.message);
            },
            // 分页导航
            handleCurrentChange(val) {
                this.cur_page = val;
                this.paginationShow = false;
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
                    vm.paginationShow = true;
                }).catch((data) => {
                    console.log(data)
                })
            },
            // 需要同步
            getListData() {
                return this.$httpGet('/admin/sms/smsTemplateList', {
                    pageNo: this.cur_page,
                    pageSize: 10,
                    templateCode: this.searchDataForm.templateCode,
                    platformId: this.searchDataForm.platformId
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
                if (!this.addDataForm.templateCode) {
                    this.$message.warning('模板号不能为空！');
                    return false;
                }
                if (!this.addDataForm.platformId) {
                    this.$message.warning('平台标识不能为空！');
                    return false;
                }
                if (!this.addDataForm.explain) {
                    this.$message.warning('短信说明不能为空！');
                    return false;
                }
                if (!this.addDataForm.content) {
                    this.$message.warning('短信模板内容不能为空！');
                    return false;
                }
                this.$httpPost('/admin/sms/insertSmsTemplate', {
                    templateCode: this.addDataForm.templateCode,
                    platformId: this.addDataForm.platformId,
                    content: this.addDataForm.content,
                    explain: this.addDataForm.explain
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
                this.editDataForm.platformId = row.platformId;
                this.editDataForm.templateCode = row.templateCode;
                this.editDataForm.content = row.content;
                this.editDataForm.explain = row.explain;

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
                if (!this.editDataForm.explain) {
                    this.$message.warning('短信说明不能为空！');
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
                    explain: this.editDataForm.explain
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
                return this.$httpGet('/admin/platformInfo/option', {});
            },
            async getAllData() {
                let vm = this;
                await Promise.all([vm.getPlatFormList(), vm.getListData()])
                    .then((data) => {
                        vm.platformIdList = data[0].data;
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
