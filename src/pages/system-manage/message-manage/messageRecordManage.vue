<template>
    <div class="table">
        <div class="container">
            <div class="handle-box" style="margin-bottom: 20px;display: flex;flex-flow: row wrap;">
                <div style="margin: 0px 20px 10px 0;">
                    <span>短信通道：</span>
                    <el-select style="width: 150px;" v-model="searchDataForm.smsChannel" placeholder="请选择短信通道">
                        <el-option
                            v-for="item in smsChannel"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <div style="margin: 0px 20px 10px 0;">
                    <span>手机号：</span>
                    <el-input style="width: 150px;" class="username" v-model.trim="searchDataForm.phone"
                              clearable placeholder="请填写手机号">
                    </el-input>
                </div>
                <div style="margin: 0px 20px 10px 0;">
                    <span>短信内容：</span>
                    <el-input style="width: 150px;" class="username" v-model.trim="searchDataForm.content"
                              clearable placeholder="请填写短信内容">
                    </el-input>
                </div>
                <div style="margin: 0px 20px 10px 0;">
                    <span>发送开始时间：</span>
                    <el-date-picker type="datetime" placeholder="选择发送开始时间" v-model="searchDataForm.startTime"
                                    style="width: 190px;"></el-date-picker>
                </div>
                <div style="margin: 0px 20px 10px 0;">
                    <span>发送结束时间：</span>
                    <el-date-picker type="datetime" placeholder="选择发送开始时间" v-model="searchDataForm.endTime"
                                    style="width: 190px;">

                    </el-date-picker>
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
                <el-table-column prop="platformId" label="平台名称">
                    <template slot-scope="scope">
                        <span v-if="scope.row.platformId == item.id" v-for="(item,index) in platformIdList">{{ item.platformName }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="channel" label="短信通道">
                    <template slot-scope="scope">
                        <span v-if="scope.row.channel == item.id"
                              v-for="(item,index) in smsChannel">{{ item.name }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="content" label="短信内容">
                </el-table-column>
                <el-table-column prop="phone" label="手机号">
                </el-table-column>
                <el-table-column prop="result" label="短信返回">
                </el-table-column>
                <el-table-column prop="sendTime" label="发送时间" :formatter="dateFormatter">
                </el-table-column>
            </el-table>
            <div class="pagination" style="overflow: hidden;">
                <el-pagination background @current-change="handleCurrentChange"
                               layout="total, prev, pager, next, jumper"
                               :page-size="10" :pager-count="11" :total="total">
                </el-pagination>
            </div>
        </div>
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
                platformIdList: [],
            }
        },
        methods: {
            // 分页导航
            handleCurrentChange(val) {
                this.cur_page = val;
                this.getData();
            },
            dateFormatter(row, column) {
                let loginDate = row.sendTime;
                if (loginDate)
                    return this.$moment(loginDate).format('YYYY-MM-DD HH:mm:ss');
            },
            getData() {
                let vm = this;
                this.$httpGet('/admin/sms/smsRecordList', {
                    pageNo: this.cur_page,
                    pageSize: 10,
                    smsChannel: this.searchDataForm.smsChannel,
                    phone: this.searchDataForm.phone,
                    content: this.searchDataForm.content,
                    startTime: this.searchDataForm.startTime ? this.$moment(vm.searchDataForm.startTime).format('YYYY-MM-DD HH:mm:ss') : '',
                    endTime: this.searchDataForm.endTime ? this.$moment(vm.searchDataForm.endTime).format('YYYY-MM-DD HH:mm:ss') : '',
                    platformId: this.searchDataForm.platformId,
                }).then(({data}) => {
                    vm.getDataList = data.list;
                    vm.total = data.total;
                }).catch((data) => {
                    console.log(data)
                })
            },
            search() {
                let vm = this;
                this.$httpGet('/admin/sms/smsRecordList', {
                    pageNo: 1,
                    pageSize: 10,
                    smsChannel: this.searchDataForm.smsChannel,
                    phone: this.searchDataForm.phone,
                    content: this.searchDataForm.content,
                    startTime: this.searchDataForm.startTime ? this.$moment(vm.searchDataForm.startTime).format('YYYY-MM-DD HH:mm:ss') : '',
                    endTime: this.searchDataForm.endTime ? this.$moment(vm.searchDataForm.endTime).format('YYYY-MM-DD HH:mm:ss') : '',
                    platformId: this.searchDataForm.platformId,
                }).then(({data}) => {
                    vm.getDataList = data.list;
                    vm.total = data.total;
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
