<template>
    <div class="table">
        <div class="container">
            <div class="handle-box clearfix" style="margin-bottom: 20px;">
                <div style="margin: 0px 20px 10px 0;float: left;">
                    <span>平台名称：</span>
                    <el-select clearable style="width: 150px;" v-model="searchDataForm.platformId" placeholder="认证结果">
                        <el-option v-for="item in platformIdList" :key="item.id" :label="item.platformName" :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <div style="margin: 0px 20px 10px 0;float: left;">
                    <span>用户姓名：</span>
                    <el-input style="width: 150px;" class="username" v-model.trim="searchDataForm.customerName" clearable placeholder="用户姓名">
                    </el-input>
                </div>
                <div style="margin: 0px 20px 10px 0;float: left;">
                    <span>证件号：</span>
                    <el-input style="width: 150px;" class="username" v-model.trim="searchDataForm.idNo" clearable placeholder="证件号">
                    </el-input>
                </div>
                <div style="margin: 0px 20px 10px 0;float: left;">
                    <span>银行卡号：</span>
                    <el-input style="width: 150px;" class="username" v-model.trim="searchDataForm.cardNo" clearable placeholder="银行卡号">
                    </el-input>
                </div>
                <div style="margin: 0px 20px 10px 0;float: left;">
                    <span>手机号：</span>
                    <el-input style="width: 150px;" class="username" v-model.trim="searchDataForm.phoneNo" clearable placeholder="手机号">
                    </el-input>
                </div>
                <div style="margin: 0px 20px 10px 0;float: left;">
                    <span>鉴权通道：</span>
                    <el-select clearable style="width: 150px;" v-model="searchDataForm.authChannel" placeholder="鉴权通道">
                        <el-option v-for="item in authChannel" :key="item.id" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <div style="margin: 0px 20px 10px 0;float: left;">
                    <span>认证结果：</span>
                    <el-select clearable style="width: 150px;" v-model="searchDataForm.authStatus" placeholder="认证结果">
                        <el-option v-for="item in authStatus" :key="item.id" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <div style="margin: 0px 20px 10px 0;float: left;">
                    <span>商户请求流水号：</span>
                    <el-input style="width: 150px;" class="username" v-model.trim="searchDataForm.merchantOrderNo" clearable placeholder="商户请求流水号">
                    </el-input>
                </div>
                <div style="margin: 0px 20px 10px 0;float: left;">
                    <span>鉴权开始时间：</span>
                    <el-date-picker type="datetime" style="width: 185px;" class="username" v-model.trim="searchDataForm.startTime" clearable placeholder="鉴权开始时间">
                    </el-date-picker>
                </div>
                <div style="margin: 0px 20px 10px 0;float: left;">
                    <span>鉴权结束时间：</span>
                    <el-date-picker type="datetime" style="width: 185px;" class="username" v-model.trim="searchDataForm.endTime" clearable placeholder="鉴权结束时间">
                    </el-date-picker>
                </div>
                <div style="float: left;">
                    <el-button type="primary" icon="el-icon-search" @click="handleCurrentChange(1)">搜索</el-button>
                </div>
            </div>
            <el-table :data="getDataList" border style="width: 100%;">
                <el-table-column show-overflow-tooltip prop="platformId" label="平台名称">
                    <template slot-scope="scope">
                        <span v-if="scope.row.platformId == item.id" v-for="item in platformIdList">{{ item.platformName }}</span>
                    </template>
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="customerName" label="用户姓名">
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="idNo" label="证件号">
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="cardNo" label="银行卡号">
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="phoneNo" label="手机号">
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="authChannel" label="鉴权通道">
                    <template slot-scope="scope">
                        <span v-if="scope.row.authChannel == item.id" v-for="item in authChannel">{{ item.name }}</span>
                    </template>
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="authStatus" label="认证结果">
                    <template slot-scope="scope">
                        <span v-if="scope.row.authStatus == item.id" v-for="item in authStatus">{{ item.name }}</span>
                    </template>
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="merchantOrderNo" label="商户请求流水号">
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="authType" label="认证方式">
                    <template slot-scope="scope">
                        <span v-if="scope.row.authType == item.id" v-for="item in authType">{{ item.name }}</span>
                    </template>
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="authTime" label="鉴权时间" :formatter="authTimeForMatter">
                </el-table-column>
                <el-table-column align="center" show-overflow-tooltip prop="photo" label="身份认证">
                    <template slot-scope="scope">
                        <el-button v-if="scope.row.photo" @click="handleSeeImg(scope.row)" type="primary" icon="el-icon-view" size="small">
                            查看图片
                        </el-button>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="操作" width="100px">
                    <template v-if="getDataList.length> 0" slot-scope="scope">
                        <el-button @click="handleDetail(scope.row)" type="primary" icon="el-icon-view" size="small">
                            查看
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination" style="overflow: hidden;">
                <el-pagination v-if="paginationShow" background :current-page="cur_page" @current-change="handleCurrentChange" layout="total, prev, pager, next, jumper" :page-size="10" :pager-count="11" :total="total">
                </el-pagination>
            </div>
        </div>
        <!--查看图片-->
        <el-dialog title="查看图片" :visible.sync="isShowImgDetail" :before-close="cancelSeeImg" width="400px" center>
            <div class="form-content" style="margin: 0 auto;width: 100%;">
                <img :src="'data:image/png;base64,' + detailDataImg.photo" alt="" style="width: 100%;">
            </div>
        </el-dialog>
        <!--查看详情-->
        <el-dialog title="查看详情" :visible.sync="isShowDetail" :before-close="cancelDetail" width="700px" center>
            <div class="form-content" style="margin: 0 auto;width: 90%;">
                <el-form ref="detailDataForm" :model="detailDataForm" label-width="170px" size="mini">
                    <el-form-item label="平台名称：">
                        <el-input :disabled="true" v-model.trim="detailDataForm.platformId" placeholder="平台名称">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="姓名：">
                        <el-input :disabled="true" v-model.trim="detailDataForm.customerName" placeholder="姓名">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="证件号：">
                        <el-input :disabled="true" v-model.trim="detailDataForm.idNo" placeholder="证件号"></el-input>
                    </el-form-item>
                    <el-form-item label="证件类型：">
                        <el-input :disabled="true" v-model.trim="detailDataForm.idType" placeholder="证件类型"></el-input>
                    </el-form-item>
                    <el-form-item label="卡号：">
                        <el-input :disabled="true" v-model.trim="detailDataForm.cardNo" placeholder="卡号"></el-input>
                    </el-form-item>
                    <el-form-item label="卡类型：">
                        <el-input :disabled="true" v-model.trim="detailDataForm.cardType" placeholder="卡类型"></el-input>
                    </el-form-item>
                    <el-form-item label="银行代码：">
                        <el-input :disabled="true" v-model.trim="detailDataForm.bankCode" placeholder="银行代码"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号：">
                        <el-input :disabled="true" v-model.trim="detailDataForm.phoneNo" placeholder="手机号"></el-input>
                    </el-form-item>
                    <el-form-item label="认证方式：">
                        <el-input :disabled="true" v-model.trim="detailDataForm.authType" placeholder="认证方式"></el-input>
                    </el-form-item>
                    <el-form-item label="鉴权时间：">
                        <el-input :disabled="true" v-model.trim="detailDataForm.authTime" placeholder="鉴权时间"></el-input>
                    </el-form-item>
                    <el-form-item label="鉴权通道：">
                        <el-input :disabled="true" v-model.trim="detailDataForm.authChannel" placeholder="鉴权通道"></el-input>
                    </el-form-item>
                    <el-form-item label="认证结果：">
                        <el-input :disabled="true" v-model.trim="detailDataForm.authStatus" placeholder="认证结果"></el-input>
                    </el-form-item>
                    <el-form-item label="鉴权手续费(元)：">
                        <el-input :disabled="true" v-model.trim="detailDataForm.authFee" placeholder="鉴权手续费"></el-input>
                    </el-form-item>
                    <el-form-item label="信用卡校验码：">
                        <el-input :disabled="true" v-model.trim="detailDataForm.cvn2" placeholder="信用卡校验码"></el-input>
                    </el-form-item>
                    <el-form-item label="商户请求流水号：">
                        <el-input :disabled="true" v-model.trim="detailDataForm.merchantOrderNo" placeholder="商户请求流水号"></el-input>
                    </el-form-item>
                    <el-form-item label="双乾请求合作方流水号：">
                        <el-input :disabled="true" v-model.trim="detailDataForm.sysOrderNo" placeholder="双乾请求合作方流水号"></el-input>
                    </el-form-item>
                    <el-form-item label="备注：">
                        <el-input :disabled="true" type="textarea" v-model.trim="detailDataForm.remark" placeholder="备注"></el-input>
                    </el-form-item>
                    <el-form-item label="身份认证：">
                        <img v-if="detailDataForm.photo" :src="'data:image/png;base64,' + detailDataForm.photo" alt="" style="width: 150px;">
                        <el-input v-else :disabled="true" v-model.trim="detailDataForm.photo = '暂无数据'" placeholder="身份认证"></el-input>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { timestampToDate } from '../../functions/index.js'
export default {
    data() {
        return {
            paginationShow: true,
            getDataList: [],
            // 当前页
            cur_page: 1,
            // 所有数量
            total: null,
            searchDataForm: {},
            isShowDetail: false,
            isShowImgDetail: false,
            detailDataImg: {},
            detailDataForm: {},
            platformIdList: [],
            // 鉴权通道 鉴权通道 YMT:云码通,YLDK:银联,FP:悦园,XS:小视,JHSJ:聚合数据,GZT:国政通
            authChannel: [
                {
                    id: 'YMT',
                    name: '云码通'
                },
                {
                    id: 'YLDK',
                    name: '银联'
                },
                {
                    id: 'FP',
                    name: '悦园'
                },
                {
                    id: 'XS',
                    name: '小视'
                },
                {
                    id: 'JHSJ',
                    name: '聚合数据'
                },
                {
                    id: 'GZT',
                    name: '国政通'
                },
                {
                    id: 'SQ',
                    name: '双乾'
                }
            ],
            // 认证结果
            authStatus: [
                {
                    id: '0',
                    name: '失败'
                },
                {
                    id: '1',
                    name: '成功'
                },
                {
                    id: '2',
                    name: '未知'
                }
            ],
            /**
             * 认证方式
             * 2:二要素认证；3:三要素认证；4：四要素认证；6:六要素认证；--银行卡
             * 00:身份认证-无图；01:身份认证-有图；02:运营商实名认证 --身份证
             */
            authType: [
                {
                    id: '2',
                    name: '二要素认证'
                },
                {
                    id: '3',
                    name: '三要素认证'
                },
                {
                    id: '4',
                    name: '四要素认证'
                },
                {
                    id: '6',
                    name: '六要素认证'
                },
                {
                    id: '00',
                    name: '身份认证-无图'
                },
                {
                    id: '01',
                    name: '身份认证-有图'
                },
                {
                    id: '02',
                    name: '运营商实名认证'
                }
            ]
        }
    },
    methods: {
        // 分页导航
        handleCurrentChange(val) {
            this.cur_page = val
            this.paginationShow = false
            this.getData()
        },
        handleSeeImg(row) {
            this.isShowImgDetail = true
            this.detailDataImg.photo = row.photo
        },
        cancelSeeImg() {
            this.isShowImgDetail = false
        },
        handleDetail(row) {
            this.isShowDetail = true
            this.detailDataForm.platformId = this.getPlatFormName(
                row.platformId
            )
            this.detailDataForm.customerName = row.customerName
            this.detailDataForm.idNo = row.idNo
            this.detailDataForm.idType = this.getIdType(row.idType)
            this.detailDataForm.cardNo = row.cardNo
            this.detailDataForm.cardType = this.getCardType(row.cardType)
            this.detailDataForm.bankCode = row.bankCode
            this.detailDataForm.phoneNo = row.phoneNo
            this.detailDataForm.authStatus = this.getStatus(row.authStatus)
            this.detailDataForm.authFee = row.authFee
            this.detailDataForm.authType = this.getAuthType(row.authType)
            this.detailDataForm.authTime = timestampToDate(row.authTime)
            this.detailDataForm.authChannel = this.getAuthChannel(
                row.authChannel
            )
            this.detailDataForm.cvn2 = row.cvn2
            this.detailDataForm.photo = row.photo
            this.detailDataForm.merchantOrderNo = row.merchantOrderNo
            this.detailDataForm.sysOrderNo = row.sysOrderNo
            this.detailDataForm.remark = row.remark
        },
        cancelDetail() {
            this.isShowDetail = false
        },
        // 获取鉴权通道
        getAuthChannel(params) {
            switch (params) {
                case 'YMT':
                    return '云码通'
                    break
                case 'YLDK':
                    return '银联'
                    break
                case 'FP':
                    return '悦园'
                    break
                case 'XS':
                    return '小视'
                    break
                case 'JHSJ':
                    return '聚合数据'
                    break
                case 'GZT':
                    return '国政通'
                    break
                case 'SQ':
                    return '双乾'
                    break
                default:
                    return '暂无'
                    break
            }
        },
        // 获取鉴权通道
        getAuthType(params) {
            switch (params) {
                case '2':
                    return '二要素认证'
                    break
                case '3':
                    return '三要素认证'
                    break
                case '4':
                    return '四要素认证'
                    break
                case '6':
                    return '六要素认证'
                    break
                case '00':
                    return '身份认证-无图'
                    break
                case '01':
                    return '身份认证-有图'
                    break
                case '02':
                    return '运营商实名认证'
                    break
                default:
                    return '暂无'
                    break
            }
        },
        getIdType(params) {
            switch (params) {
                case '01':
                    return '身份证'
                    break
                default:
                    return '暂无'
                    break
            }
        },
        getCardType(params) {
            switch (params) {
                case '00':
                    return '借记卡'
                    break
                case '01':
                    return '贷记卡'
                    break
                default:
                    return '暂无'
                    break
            }
        },
        getStatus(params) {
            switch (params) {
                case '0':
                    return '失败'
                    break
                case '1':
                    return '成功'
                    break
                case '2':
                    return '未知'
                    break
                default:
                    return '暂无'
                    break
            }
        },
        // 获取平台名称
        getPlatFormName(params) {
            let platformIdObject = []
            platformIdObject = this.platformIdList.filter(item => {
                return item.id == params
            })
            return platformIdObject[0].platformName
        },
        getData() {
            let vm = this
            this.$httpGet('/admin/auth/authInfoList', {
                pageNo: this.cur_page,
                pageSize: 10,
                platformId: this.searchDataForm.platformId,
                customerName: this.searchDataForm.customerName,
                idNo: this.searchDataForm.idNo,
                cardNo: this.searchDataForm.cardNo,
                phoneNo: this.searchDataForm.phoneNo,
                authChannel: this.searchDataForm.authChannel,
                authStatus: this.searchDataForm.authStatus,
                merchantOrderNo: this.searchDataForm.merchantOrderNo,
                startTime: timestampToDate(this.searchDataForm.startTime),
                endTime: timestampToDate(this.searchDataForm.endTime)
            })
                .then(({ data }) => {
                    vm.getDataList = data.list
                    vm.total = data.total
                    vm.paginationShow = true
                })
                .catch(data => {
                    console.log(data)
                })
        },
        authTimeForMatter(row, column) {
            return timestampToDate(row.authTime)
        },
        // 获取平台名称列表
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
    created() {
        this.getPlatFormList()
        this.getData()
    }
}
</script>

<style scoped>
</style>
