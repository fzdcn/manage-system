<template>
    <div class="login-wrap">
        <div class="ms-title">双乾支付系统管理后台</div>
        <div class="ms-login">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="username">
                    <el-input clearable @keyup.enter.native="submitForm('ruleForm')" v-model.trim="ruleForm.username"
                              placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input clearable type="password" placeholder="请输入密码" v-model.trim="ruleForm.password"
                              @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                <el-form-item prop="verificationCode">
                    <el-row :gutter="30">
                        <el-col :span="12">
                            <el-input clearable @keyup.enter.native="submitForm('ruleForm')" type="text"
                                      placeholder="请输入验证码"
                                      v-model.trim="ruleForm.verificationCode"></el-input>
                        </el-col>
                        <el-col :span="10" class="image-code">
                            <p style="background: url('/static/img/bc-img.jpg') repeat;cursor: pointer;"
                               @click="changeImgUrl">
                                {{ imgUrl }}
                            </p>
                        </el-col>
                    </el-row>
                </el-form-item>
                <div class="login-button">
                    <el-form-item>
                        <el-row>
                            <el-col :span="24">
                                <el-button type="primary" @click="submitForm('ruleForm')">登录
                                </el-button>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item>
                        <el-row>
                            <el-col :span="24">
                                <el-button @click="resetForm('ruleForm')">重置</el-button>
                            </el-col>
                        </el-row>
                    </el-form-item>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                imgUrl: '',
                ruleForm: {
                    username: '',
                    password: '',
                    verificationCode: ''
                },
                rules: {
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'}
                    ],
                    verificationCode: [
                        {required: true, message: '请输入验证码', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            // 提交表单
            submitForm(formName) {
                let vm = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$httpPost('/admin/login/submit', {
                            username: this.ruleForm.username,
                            password: this.ruleForm.password,
                            captcha: this.ruleForm.verificationCode
                        }).then(({data}) => {
                            vm.$message({message: '登陆成功', type: 'success'});
                            vm.$store.dispatch('userSignIn', data.admin);
                            vm.$store.dispatch('setNavigationMenu', JSON.stringify(data.adminMenuList[0].subs));
                            if (vm.$route.query.redirect) {
                                let redirect = vm.$route.query.redirect;
                                vm.$router.replace({path: redirect});
                            } else {
                                vm.$router.replace({path: '/'});
                            }
                        }).catch((data) => {
                            console.log(data)
                        })
                    } else {
                        return false;
                    }
                });
            },
            // 重置表单
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            // 点击更换验证码
            changeImgUrl() {
                this.$httpGet('/admin/utils/getCaptcha', {})
                    .then(({data}) => {
                        this.imgUrl = data;
                    }).catch((data) => {
                    console.log(data);
                })
            }
        },
        mounted() {
            this.changeImgUrl();
        }
    }
</script>

<style scoped>
    .login-wrap {
        position: relative;
        width: 100%;
        height: 100%;
    }

    .ms-title {
        position: absolute;
        top: 50%;
        width: 100%;
        margin-top: -230px;
        text-align: center;
        font-size: 30px;
        color: #fff;
    }

    .ms-login {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 300px;
        height: 230px;
        margin: -150px 0 0 -190px;
        padding: 40px;
        border-radius: 5px;
        background: #fff;
    }

    .image-code {
        height: 32px;
        line-height: 32px;
        text-align: center;
    }

    .image-code img {
        width: 80px;
        height: 32px;
        line-height: 32px;
    }

    .image-code img:hover {
        cursor: pointer;
    }

    .login-button {
        text-align: center;
    }

    .login-button button {
        width: 100%;
    }
</style>
