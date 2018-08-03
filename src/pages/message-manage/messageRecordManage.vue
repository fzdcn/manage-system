<template>
    <div class="table">
        <div class="container">
            <div class="handle-box clearfix" style="margin-bottom: 20px;">
                <div style="margin: 0px 20px 10px 0;float:left;">
                    <span>短信通道：</span>
                    <el-select clearable style="width: 150px;" v-model="searchDataForm.smsChannel" placeholder="请选择短信通道">
                        <el-option v-for="item in smsChannel" :key="item.id" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <div style="margin: 0px 20px 10px 0;float:left;">
                    <span>手机号：</span>
                    <el-input style="width: 150px;" class="username" v-model.trim="searchDataForm.phone" clearable placeholder="请填写手机号">
                    </el-input>
                </div>
                <div style="margin: 0px 20px 10px 0;float:left;">
                    <span>短信内容：</span>
                    <el-input style="width: 150px;" class="username" v-model.trim="searchDataForm.content" clearable placeholder="请填写短信内容">
                    </el-input>
                </div>
                <div style="margin: 0px 20px 10px 0;float:left;">
                    <span>发送开始时间：</span>
                    <el-date-picker type="datetime" placeholder="选择发送开始时间" v-model="searchDataForm.startTime" style="width: 190px;"></el-date-picker>
                </div>
                <div style="margin: 0px 20px 10px 0;float:left;">
                    <span>发送结束时间：</span>
                    <el-date-picker type="datetime" placeholder="选择发送开始时间" v-model="searchDataForm.endTime" style="width: 190px;">

                    </el-date-picker>
                </div>
                <div style="margin: 0px 20px 10px 0;float:left;">
                    <span>平台名称：</span>
                    <el-select clearable style="width: 150px;" v-model="searchDataForm.platformId" placeholder="请选择平台名称">
                        <el-option v-for="item in platformIdList" :key="item.id" :label="item.platformName" :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <div style="margin: 0px 20px 10px 0;float:left;">
                    <span>模板code：</span>
                    <el-input style="width: 150px;" class="username" v-model.trim="searchDataForm.templateCode" clearable placeholder="请填写模板code">
                    </el-input>
                </div>
                <div style="float:left;">
                    <el-button type="primary" icon="el-icon-search" @click="handleCurrentChange(1)">搜索
                    </el-button>
                </div>
            </div>
            <el-table v-loading="loading" :data="getDataList" border style="width: 100%;">
                <el-table-column show-overflow-tooltip prop="platformId" label="平台名称">
                    <template slot-scope="scope">
                        <span v-if="scope.row.platformId == item.id" v-for="(item,index) in platformIdList">{{ item.platformName }}</span>
                    </template>
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="channel" label="短信通道">
                    <template slot-scope="scope">
                        <span v-if="scope.row.channel == item.id" v-for="(item,index) in smsChannel">{{ item.name }}</span>
                    </template>
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="content" label="短信内容">
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="phone" label="手机号">
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="templateCode" label="模板code">
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="sendTime" label="发送时间" :formatter="dateFormatter">
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="result" label="短信返回">
                </el-table-column>
            </el-table>
            <div class="pagination" style="overflow: hidden;">
                <el-pagination v-if="paginationShow" background :current-page="cur_page" @current-change="handleCurrentChange" layout="total, prev, pager, next, jumper" :page-size="10" :pager-count="11" :total="total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import { timestampToDate } from '../../functions/index'
export default {
    data() {
        return {
            loading: true,
            paginationShow: true,
            getDataList: [],
            // 当前页
            cur_page: 1,
            // 所有数量
            total: null,
            smsChannel: [
                {
                    id: 1,
                    name: '阿里大鱼'
                },
                {
                    id: 2,
                    name: '上海助通'
                }
            ],
            searchDataForm: {},
            platformIdList: []
        }
    },
    methods: {
        // 分页导航
        handleCurrentChange(val) {
            this.cur_page = val
            this.paginationShow = false
            this.getData()
        },
        dateFormatter(row, column) {
            return timestampToDate(row.sendTime)
        },
        getData() {
            let vm = this
            this.$httpGet('/admin/sms/smsRecordList', {
                pageNo: this.cur_page,
                pageSize: 10,
                smsChannel: this.searchDataForm.smsChannel,
                phone: this.searchDataForm.phone,
                content: this.searchDataForm.content,
                startTime: timestampToDate(this.searchDataForm.startTime),
                endTime: timestampToDate(this.searchDataForm.endTime),
                platformId: this.searchDataForm.platformId,
                templateCode: this.searchDataForm.templateCode
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
        // 平台类型
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
