<template>
    <div class="table">
        <div class="container">
            <div class="back" style="margin-bottom: 30px;position:relative;">
                <el-button type="primary" size="medium" icon="el-icon-back" @click="back">返回</el-button>
            </div>
            <div style="width: 70%;;margin: auto;">
                <el-form label-width="150px" ref="dataForm" :model="dataForm">
                    <el-form-item label="商户号:">
                        <el-input :disabled="true" v-model="dataForm.merchantCode"></el-input>
                    </el-form-item>
                    <el-form-item label="商户订单号:">
                        <el-input :disabled="true" v-model="dataForm.merchantOrderNo"></el-input>
                    </el-form-item>
                    <el-form-item label="双乾流水号:">
                        <el-input :disabled="true" v-model="dataForm.orderNo"></el-input>
                    </el-form-item>
                    <el-form-item label="交易状态:">
                        <el-input :disabled="true" v-model="dataForm.orderNo"></el-input>
                    </el-form-item>
                    <el-form-item label="交易时间:">
                        <el-input :disabled="true" v-model="dataForm.tradeTime"></el-input>
                    </el-form-item>
                    <el-form-item label="交易金额:">
                        <el-input :disabled="true" v-model="dataForm.tradeAmount"></el-input>
                    </el-form-item>
                    <el-form-item label="交易费率:">
                        <el-input :disabled="true" v-model="dataForm.tradeRate"></el-input>
                    </el-form-item>
                    <el-form-item label="交易手续费:">
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
                        <el-input :disabled="true" v-model="dataForm.platformNo"></el-input>
                    </el-form-item>
                    <el-form-item label="产品备注:">
                        <el-input :disabled="true" v-model="dataForm.tradeDesc"></el-input>
                    </el-form-item>
                    <el-form-item label="商户备注:">
                        <el-input :disabled="true" v-model="dataForm.merchantRemark"></el-input>
                    </el-form-item>
                    <el-form-item label="系统备注:">
                        <el-input :disabled="true" v-model="dataForm.sysRemark"></el-input>
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
                dataForm: {}
            }
        },
        methods: {
            getData() {
                let vm = this;
                this.$httpGet('/admin/epay/tradeInfo/findById', {
                    id: this.$route.params.id
                }).then(({data}) => {
                    vm.dataForm = data;
                }).catch((data) => {
                    console.log(data)
                })
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
