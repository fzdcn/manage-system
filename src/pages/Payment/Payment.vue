<template>
    <div class="company-payment">
        <div class="container">
            <div class="order-info">
                <el-table
                    :data="tableData"
                    border
                    style="width: 100%">
                    <el-table-column
                        prop="orderNumber"
                        label="订单号"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="money"
                        label="订单金额(元)"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="date"
                        label="交易时间">
                    </el-table-column>
                    <el-table-column
                        prop="orderInfo"
                        label="订单信息">
                    </el-table-column>
                </el-table>
            </div>
            <div class="tab-change-payment">
                <el-tabs type="border-card">
                    <el-tab-pane class="tab-quick-payment" label="快捷支付">
                        <el-form ref="form" :model="form" label-width="100px">
                            <el-form-item label="银行卡：">
                                <el-select clearable v-model="form.selectedBank" placeholder="请选择银行">
                                    <el-option
                                        v-for="item in form.bankList"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                        <span style="float: left">{{ item.label }}</span>
                                        <span
                                            style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="银行卡号：">
                                <el-input v-model.trim="form.bankNumber"></el-input>
                            </el-form-item>
                            <el-form-item label="银行卡类型：">
                                <el-select clearable v-model="form.selectedBankCardType" placeholder="请选择">
                                    <el-option
                                        v-for="item in form.bankCardType"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="开户名：">
                                <el-input v-model.trim="form.accountName"></el-input>
                            </el-form-item>
                            <el-form-item label="证件类型：">
                                <el-select clearable v-model="form.selectedCertificatesType" placeholder="请选择">
                                    <el-option
                                        v-for="item in form.certificatesType"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="证件号码：">
                                <el-input v-model.trim="form.identificationNumber"></el-input>
                            </el-form-item>
                            <el-form-item label="手机号码：">
                                <el-input v-model.trim="form.telephone"></el-input>
                            </el-form-item>
                            <el-form-item label="验证码：">
                                <el-row :gutter="50">
                                    <el-col :span="10">
                                        <el-input v-model.trim="form.verificationCode"></el-input>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-button type="primary" plain>点击发送短信验证码</el-button>
                                    </el-col>
                                </el-row>
                            </el-form-item>
                            <div class="submit-button">
                                <el-form-item>
                                    <el-row :gutter="50">
                                        <el-col :span="6">
                                            <el-button size="medium" type="primary" @click="onSubmit">提交</el-button>
                                        </el-col>
                                        <el-col :span="16">
                                            <el-button class="introduce" icon="iconfont icon-tishi" type="info"
                                                       disabled="disabled">
                                                无需开通网银即可完成支付
                                            </el-button>
                                        </el-col>
                                    </el-row>
                                </el-form-item>
                            </div>
                        </el-form>
                    </el-tab-pane>
                    <el-tab-pane class="tab-company-payment" label="企业网银支付">
                        <div class="choice">请选择付款银行：</div>
                        <div class="bank-list">
                            <template>
                                <el-radio-group v-model="bank" size="small">
                                    <el-radio label="中国工商银行" border>中国工商银行</el-radio>
                                    <el-radio label="中国农业银行" border>中国农业银行</el-radio>
                                    <el-radio label="中国银行" border>中国银行</el-radio>
                                    <el-radio label="招商银行" border>招商银行</el-radio>
                                    <el-radio label="中信银行" border>中信银行</el-radio>
                                    <el-radio label="浦发银行" border>浦发银行</el-radio>
                                    <el-radio label="中国民生银行" border>中国民生银行</el-radio>
                                    <el-radio label="平安银行" border>平安银行</el-radio>
                                    <el-radio label="交通银行" border>交通银行</el-radio>
                                    <el-radio label="广发银行" border>广发银行</el-radio>
                                    <el-radio label="华夏中国邮政储蓄银行" border>华夏中国邮政储蓄银行</el-radio>
                                    <el-radio label="东亚银行" border>东亚银行</el-radio>
                                    <el-radio label="青岛银行" border>青岛银行</el-radio>
                                </el-radio-group>
                            </template>
                            <div class="submit-payment">
                                <el-col :span="12">
                                    <el-button type="primary">去银行页面充值</el-button>
                                </el-col>
                                <el-col :span="12">
                                    <el-button class="introduce" icon="iconfont icon-tishi" type="info"
                                               disabled="disabled">
                                        企业网银付款流程较为复杂，具体问题可咨询发卡行或联系我们
                                    </el-button>
                                </el-col>
                            </div>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: "CompanyPayment",
        data() {
            return {
                tableData: [{
                    orderNumber: '1526534228500',
                    money: '30',
                    date: '2018-5-17 13:17:08',
                    orderInfo: '测试产品'
                }],
                bank: '中国工商银行',
                form: {
                    // 银行卡
                    bankList: [
                        {
                            value: '中国工商银行',
                            label: '中国工商银行'
                        }, {
                            value: '中国农业银行',
                            label: '中国农业银行'
                        }, {
                            value: '中国银行',
                            label: '中国银行'
                        }
                    ],
                    // 被选中的银行
                    selectedBank: '',
                    // 银行卡号
                    bankNumber: '',
                    // 银行卡类型
                    bankCardType: [
                        {
                            value: '借记卡',
                            label: '借记卡'
                        }, {
                            value: '信用卡',
                            label: '信用卡'
                        }
                    ],
                    selectedBankCardType: '借记卡',
                    // 开户名
                    accountName: '',
                    // 证件类型
                    certificatesType: [
                        {
                            value: '身份证',
                            label: '身份证'
                        }
                    ],
                    // 被选中的证件类型
                    selectedCertificatesType: '身份证',
                    // 证件号码
                    identificationNumber: '',
                    // 手机号
                    telephone: '',
                    // 验证码
                    verificationCode: ''
                }
            }
        },
        methods: {
            onSubmit() {
                alert("test");
            }
        }
    }
</script>

<style scoped lang="stylus">
    .company-payment
        .order-info
            margin-bottom 50px
        .tab-change-payment
            .tab-quick-payment
                margin-top 50px
                .el-form
                    width 500px
                    margin auto
                    .submit-button
                        margin-top 50px
                        .introduce
                            color #333
            .tab-company-payment
                .choice
                    font-size 15px
                    color red
                    margin 30px 0 30px 20px
                .bank-list
                    display flex
                    flex-flow row wrap
                    justify-content flex-start
                    align-items center
                    .el-radio
                        margin 30px 20px 30px
                        width 200px
                    .submit-payment
                        margin 50px 0 20px 20px
                        .introduce
                            color #333

</style>
