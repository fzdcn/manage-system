<template>
    <div class="table">
        <div class="container">
            <div class="back" style="margin-bottom: 30px;position:relative;">
                <el-button type="primary" size="medium" icon="el-icon-back" @click="back">返回</el-button>
            </div>
            <div style="width: 70%;margin: auto;">
                <el-form label-width="150px" ref="dataForm" :model="dataForm">
                    <el-form-item label="商户号:">
                        <el-input :disabled="true" v-model="dataForm.merchantCode"></el-input>
                    </el-form-item>
                    <el-form-item label="商户名称:">
                        <el-input :disabled="true" v-model="dataForm.merchantName"></el-input>
                    </el-form-item>
                    <el-form-item label="商户订单号:">
                        <el-input :disabled="true" v-model="dataForm.merchantOrderNo"></el-input>
                    </el-form-item>
                    <el-form-item label="双乾流水号:">
                        <el-input :disabled="true" v-model="dataForm.orderNo"></el-input>
                    </el-form-item>
                    <el-form-item label="交易状态:">
                        <el-input :disabled="true" v-model="dataForm.tradeState"></el-input>
                    </el-form-item>
                    <el-form-item label="交易时间:">
                        <el-input :disabled="true" v-model="dataForm.tradeTime"></el-input>
                    </el-form-item>
                    <el-form-item label="交易金额(元):">
                        <el-input :disabled="true" v-model="dataForm.tradeAmount"></el-input>
                    </el-form-item>
                    <el-form-item label="交易费率:">
                        <el-input :disabled="true" v-model="dataForm.tradeRate"></el-input>
                    </el-form-item>
                    <el-form-item label="交易手续费(元):">
                        <el-input :disabled="true" v-model="dataForm.tradeFee"></el-input>
                    </el-form-item>
                    <el-form-item label="银行订单号:">
                        <el-input :disabled="true" v-model="dataForm.bankOrderNo"></el-input>
                    </el-form-item>
                    <el-form-item label="银行返回时间:">
                        <el-input :disabled="true" v-model="dataForm.bankReturnTime"></el-input>
                    </el-form-item>
                    <el-form-item label="补单时间:">
                        <el-input :disabled="true" v-model="dataForm.upplementTime"></el-input>
                    </el-form-item>
                    <el-form-item label="银行支付通道:">
                        <el-input :disabled="true" v-model="dataForm.channelName"></el-input>
                    </el-form-item>
                    <el-form-item label="银行编码:">
                        <el-input :disabled="true" v-model="dataForm.bankCode"></el-input>
                    </el-form-item>
                    <el-form-item label="支付类型:">
                        <el-input :disabled="true" v-model="dataForm.payType"></el-input>
                    </el-form-item>
                    <el-form-item label="业务员code:">
                        <el-input :disabled="true" v-model="dataForm.saleCode"></el-input>
                    </el-form-item>
                    <el-form-item label="平台名称:">
                        <el-input :disabled="true" v-model="dataForm.platformName"></el-input>
                    </el-form-item>
                    <el-form-item label="商户ip:">
                        <el-input :disabled="true" v-model="dataForm.merchantIp"></el-input>
                    </el-form-item>
                    <el-form-item label="付款银行流水号:">
                        <el-input :disabled="true" v-model="dataForm.bankTradeNo"></el-input>
                    </el-form-item>
                    <el-form-item label="卡类型:">
                        <el-input :disabled="true" v-model="dataForm.cardType"></el-input>
                    </el-form-item>
                    <el-form-item label="产品备注:">
                        <el-input type="textarea" :disabled="true" v-model="dataForm.tradeDesc"></el-input>
                    </el-form-item>
                    <el-form-item label="商户备注:">
                        <el-input type="textarea" :disabled="true" v-model="dataForm.merchantRemark"></el-input>
                    </el-form-item>
                    <el-form-item label="系统备注:">
                        <el-input type="textarea" :disabled="true" v-model="dataForm.sysRemark"></el-input>
                    </el-form-item>
                    <el-form-item label="ip:">
                        <el-input :disabled="true" v-model="dataForm.ip"></el-input>
                    </el-form-item>
                    <el-form-item label="前台返回地址:">
                        <el-input :disabled="true" v-model="dataForm.returnUrl"></el-input>
                    </el-form-item>
                    <el-form-item label="后台返回地址:">
                        <el-input :disabled="true" v-model="dataForm.notifyUrl"></el-input>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                dataForm: {},
                // 交易状态列表
                tradeStateList: [
                    {
                        id: '0',
                        name: "失败"
                    },
                    {
                        id: '1',
                        name: "成功"
                    },
                    {
                        id: '2',
                        name: "待处理"
                    },
                    {
                        id: '3',
                        name: "取消"
                    },
                    {
                        id: '4',
                        name: "待确认"
                    },
                    {
                        id: '5',
                        name: "未返回"
                    },
                    {
                        id: '8',
                        name: "异常"
                    },
                ],
                // 支付类型列表
                payTypeList: [
                    {
                        id: '0',
                        name: "个人网银"
                    },
                    {
                        id: '1',
                        name: "企业网银"
                    },
                    {
                        id: '2',
                        name: "快捷支付"
                    },
                    {
                        id: '3',
                        name: "认证支付"
                    },
                    {
                        id: '4',
                        name: "代扣"
                    },
                    {
                        id: '5',
                        name: "微信支付"
                    },
                    {
                        id: '6',
                        name: "支付宝支付"
                    },
                ],
                // 卡类型
                cardTypeList: [
                    {
                        id: '00',
                        name: "借记卡"
                    },
                    {
                        id: '01',
                        name: "贷记卡"
                    },
                    {
                        id: '02',
                        name: "未知"
                    }
                ],
                platformIdList: []
            }
        },
        methods: {
            getData() {
                let vm = this;
                this.$httpGet('/admin/epay/tradeInfo/findById', {
                    id: this.$route.params.id
                }).then(({data}) => {
                    data.tradeState = vm.getTradeState(data.tradeState);
                    data.tradeTime = vm.timeForMatter(data.tradeTime);
                    data.bankReturnTime = vm.timeForMatter(data.bankReturnTime);
                    data.upplementTime = vm.timeForMatter(data.upplementTime);
                    data.payType = vm.getPayTypeList(data.payType);
                    data.cardType = vm.getCardTypeList(data.cardType);
                    vm.dataForm = data;
                }).catch((data) => {
                    console.log(data)
                })
            },
            // 获取交易状态
            getTradeState(params) {
                if (params == 0) {
                    return params = '失败'
                } else if (params == 1) {
                    return params = '成功'
                } else if (params == 2) {
                    return params = '待处理'
                } else if (params == 3) {
                    return params = '取消'
                } else if (params == 4) {
                    return params = '待确认'
                } else if (params == 5) {
                    return params = '未返回'
                } else if (params == 8) {
                    return params = '异常'
                }
            },
            // 时间戳转换
            timeForMatter(timestamp) {
                if (timestamp)
                    return this.$moment(timestamp).format('YYYY-MM-DD HH:mm:ss');
            },
            // 支付类型
            getPayTypeList(params) {
                if (params == 0) {
                    return params = '个人网银'
                } else if (params == 1) {
                    return params = '企业网银'
                } else if (params == 2) {
                    return params = '快捷支付'
                } else if (params == 3) {
                    return params = '认证支付'
                } else if (params == 4) {
                    return params = '代扣'
                } else if (params == 5) {
                    return params = '微信支付'
                } else if (params == 6) {
                    return params = '支付宝支付'
                }
            },
            // 卡类型
            getCardTypeList(params) {
                if (params == '00') {
                    return params = '借记卡'
                } else if (params == '01') {
                    return params = '贷记卡'
                } else if (params == '03') {
                    return params = '未知'
                }
            },
            back() {
                this.$router.back();
            }
        },
        created() {
            this.getData();
        }
    }

</script>

<style scoped>

</style>
