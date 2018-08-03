<template>
    <div class="table">
        <div class="container">
            <div class="add" style="margin-bottom: 30px;">
                <el-button type="primary" size="medium" icon="el-icon-plus" @click="add">增加</el-button>
            </div>

            <div class="handle-box clearfix" style="margin-bottom: 20px;">
                <div style="margin: 0px 20px 10px 0;float: left;">
                    <span>平台标识：</span>
                    <el-select clearable style="width: 150px;" v-model="searchDataForm.platformId" placeholder="请选择平台标识">
                        <el-option v-for="item in platformIdList" :key="item.id" :label="item.platformName" :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <div style="float:left;">
                    <el-button type="primary" icon="el-icon-search" @click="handleCurrentChange(1)">搜索
                    </el-button>
                </div>
            </div>

            <el-table v-loading="loading" :data="getDataList" border style="width: 100%;text-align: center;">
                <el-table-column show-overflow-tooltip prop="platformId" label="平台名称">
                    <template slot-scope="scope">
                        <span v-if="scope.row.platformId == item.id" v-for="(item,index) in platformIdList">{{ item.platformName }}</span>
                    </template>
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="merchantCode" label="商户编码" header-align="center" />
                <el-table-column show-overflow-tooltip prop="zfbMerchantId" label="支付宝商户编号" header-align="center" />
                <el-table-column show-overflow-tooltip prop="appid" label="微信公众账号ID" header-align="center" />
                <el-table-column show-overflow-tooltip prop="subAppid" label="微信子商户公众账号ID" header-align="center" />
                <el-table-column show-overflow-tooltip prop="mchid" label="微信支付分配的商户号" header-align="center" />
                <el-table-column show-overflow-tooltip prop="subMchid" label="微信支付分配的子商户号" header-align="center" />
                <el-table-column show-overflow-tooltip prop="channelId" label="微信支付分配给收单服务商的ID" header-align="center" />

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
                <el-pagination v-if="paginationShow" background :current-page="cur_page" @current-change="handleCurrentChange" layout="total, prev, pager, next, jumper" :page-size="10" :pager-count="11" :total="total">
                </el-pagination>
            </div>
        </div>
        <!--增加-->
        <el-dialog title="增加信息" :visible.sync="isShowAdd" :before-close="cancelAdd" width="550px" center>
            <div class="form-content" style="margin: 0 auto;width: 90%;">
                <el-form ref="addDataForm" :model="addDataForm" label-width="180px">
                    <el-form-item :rules="[{ required: true}]" label="平台名称：">
                        <el-select clearable v-model="addDataForm.platformId" style="width: 285px;" placeholder="平台名称">
                            <el-option v-for="item in platformIdList" :key="item.id" :label="item.platformName" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="商户编码：">
                        <el-input clearable v-model.trim="addDataForm.merchantCode" placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item label="支付宝商户编号：">
                        <el-input clearable v-model.trim="addDataForm.zfbMerchantId" placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item label="微信公众账号ID：">
                        <el-input clearable v-model.trim="addDataForm.appid" placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item label="微信子商户公众账号ID：">
                        <el-input clearable v-model.trim="addDataForm.subAppid" placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item label="微信支付分配的商户号：">
                        <el-input clearable v-model.trim="addDataForm.mchid" placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item label="微信支付分配的子商户号：">
                        <el-input clearable v-model.trim="addDataForm.subMchid" placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item label="微信支付分配给收单服务商的ID：">
                        <el-input clearable v-model.trim="addDataForm.channelId" placeholder=""></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitAdd">确 定</el-button>
                <el-button @click="cancelAdd">取 消</el-button>
            </span>
        </el-dialog>

        <!--编辑-->
        <el-dialog title="编辑信息" :visible.sync="isShowEdit" :before-close="cancelEdit" width="700px" center>
            <div class="form-content" style="margin: 0 auto;width: 90%;">
                <el-form ref="editDataForm" :model="editDataForm" label-width="190px">
                    <el-form-item :rules="[{ required: true}]" label="平台名称：">
                        <el-select clearable v-model="editDataForm.platformId" style="width: 285px;" placeholder="平台名称">
                            <el-option v-for="item in platformIdList" :key="item.id" :label="item.platformName" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="商户编码：">
                        <el-input clearable v-model.trim="editDataForm.merchantCode" placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item label="支付宝商户编号：">
                        <el-input clearable v-model.trim="editDataForm.zfbMerchantId" placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item label="微信公众账号ID：">
                        <el-input clearable v-model.trim="editDataForm.appid" placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item label="微信子商户公众账号ID：">
                        <el-input clearable v-model.trim="editDataForm.subAppid" placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item label="微信支付分配的商户号：">
                        <el-input clearable v-model.trim="editDataForm.mchid" placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item label="微信支付分配的子商户号：">
                        <el-input clearable v-model.trim="editDataForm.subMchid" placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item label="微信支付分配给收单服务商的ID：">
                        <el-input clearable v-model.trim="editDataForm.channelId" placeholder=""></el-input>
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
            loading: true,
            paginationShow: true,
            platformIdList: [],
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
                platformId: ''
            },
            // 编辑
            editDataForm: {
                id: '',
                platformId: '',
                merchantCode: '',
                zfbMerchantId: '',
                appid: '',
                subAppid: '',
                mchid: '',
                subMchid: '',
                channelId: ''
            }
        }
    },
    methods: {
        // 分页导航
        handleCurrentChange(val) {
            this.cur_page = val
            this.paginationShow = false
            this.getData()
        },
        handleDelete(row) {
            let vm = this
            this.$confirm('确认删除吗?', '删除', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    vm
                        .$httpGet('/admin/merchant/account/delete', {
                            id: row.id
                        })
                        .then(data => {
                            vm.$message.success(data.message)
                            vm.getData()
                        })
                        .catch(data => {
                            console.log(data)
                        })
                })
                .catch(() => {
                    vm.$message({
                        type: 'info',
                        message: '已取消删除'
                    })
                })
        },
        getData() {
            let vm = this
            this.$httpGet('/admin/merchant/account/index', {
                pageNo: this.cur_page,
                pageSize: 10,
                platformId: this.searchDataForm.platformId
            })
                .then(({ data }) => {
                    vm.getDataList = data.list
                    vm.total = data.total
                    vm.paginationShow = true
                    vm.loading = false
                })
                .catch(data => {
                    console.log(data)
                })
        },
        add() {
            this.isShowAdd = true
        },
        cancelAdd() {
            this.isShowAdd = false
            this.addDataForm = {}
        },
        submitAdd() {
            let vm = this
            if (!this.addDataForm.merchantCode) {
                this.$message.warning('商户编码不能为空！')
                return false
            }
            if (!this.addDataForm.zfbMerchantId) {
                this.$message.warning('支付宝商户编号不能为空！')
                return false
            }
            if (!this.addDataForm.appid) {
                this.$message.warning('微信公众账号ID不能为空！')
                return false
            }
            if (!this.addDataForm.subAppid) {
                this.$message.warning('微信子商户公众账号ID不能为空！')
                return false
            }
            if (!this.addDataForm.mchid) {
                this.$message.warning('微信支付分配的商户号不能为空！')
                return false
            }
            if (!this.addDataForm.subMchid) {
                this.$message.warning('微信支付分配的子商户号不能为空！')
                return false
            }
            if (!this.addDataForm.channelId) {
                this.$message.warning('微信支付分配给收单服务商的ID不能为空！')
                return false
            }

            this.$httpPost('/admin/merchant/account/save', {
                platformId: this.addDataForm.platformId,
                merchantCode: this.addDataForm.merchantCode,
                zfbMerchantId: this.addDataForm.zfbMerchantId,
                appid: this.addDataForm.appid,
                subAppid: this.addDataForm.subAppid,
                mchid: this.addDataForm.mchid,
                subMchid: this.addDataForm.subMchid,
                channelId: this.addDataForm.channelId
            })
                .then(data => {
                    vm.$message.success(data.message)
                    vm.cancelAdd()
                    vm.handleCurrentChange(1)
                })
                .catch(data => {
                    console.log(data)
                })
        },
        handleEdit(row) {
            this.isShowEdit = true
            this.editDataForm.id = row.id
            this.editDataForm.platformId = row.platformId
            this.editDataForm.merchantCode = row.merchantCode
            this.editDataForm.zfbMerchantId = row.zfbMerchantId
            this.editDataForm.appid = row.appid
            this.editDataForm.subAppid = row.subAppid
            this.editDataForm.mchid = row.mchid
            this.editDataForm.subMchid = row.subMchid
            this.editDataForm.channelId = row.channelId
        },
        cancelEdit() {
            this.isShowEdit = false
        },
        submitEdit() {
            let vm = this
            if (!this.editDataForm.merchantCode) {
                this.$message.warning('商户编码不能为空！')
                return false
            }
            if (!this.editDataForm.zfbMerchantId) {
                this.$message.warning('支付宝商户编号不能为空！')
                return false
            }
            if (!this.editDataForm.appid) {
                this.$message.warning('微信公众账号ID不能为空！')
                return false
            }
            if (!this.editDataForm.subAppid) {
                this.$message.warning('微信子商户公众账号ID不能为空！')
                return false
            }
            if (!this.editDataForm.mchid) {
                this.$message.warning('微信支付分配的商户号不能为空！')
                return false
            }
            if (!this.editDataForm.subMchid) {
                this.$message.warning('微信支付分配的子商户号不能为空！')
                return false
            }
            if (!this.editDataForm.channelId) {
                this.$message.warning('微信支付分配给收单服务商的ID不能为空！')
                return false
            }
            this.$httpPost('/admin/merchant/account/update', {
                id: this.editDataForm.id,
                platformId: this.editDataForm.platformId,
                merchantCode: this.editDataForm.merchantCode,
                zfbMerchantId: this.editDataForm.zfbMerchantId,
                appid: this.editDataForm.appid,
                subAppid: this.editDataForm.subAppid,
                mchid: this.editDataForm.mchid,
                subMchid: this.editDataForm.subMchid,
                channelId: this.editDataForm.channelId
            })
                .then(data => {
                    vm.$message.success(data.message)
                    vm.cancelEdit()
                    vm.getData()
                })
                .catch(data => {
                    console.log(data)
                })
        },
        getPlatFormList() {
            let vm = this
            this.$httpGet('/admin/platformInfo/option', {})
                .then(({ data }) => {
                    vm.platformIdList = data
                })
                .catch(data => {
                    console.log(data)
                })
        }
    },
    mounted() {
        this.getData()
        this.getPlatFormList()
    }
}
</script>

<style scoped>
</style>
