<template>
    <div class="login-wrap">
        <div class="ms-title">平台管理</div>
        <div class="ms-login">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="username">
                    <el-input v-model.trim="ruleForm.username" placeholder="username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="password" v-model.trim="ruleForm.password"
                              @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                <el-form-item prop="verificationCode">
                    <el-row :gutter="30">
                        <el-col :span="12">
                            <el-input type="text" placeholder="请输入验证码"
                                      v-model.trim="ruleForm.verificationCode"></el-input>
                        </el-col>
                        <el-col :span="10" class="image-code">
                            <img :src="imgUrl" alt="" @click="changeImgUrl">
                        </el-col>
                    </el-row>
                </el-form-item>
                <div class="login-button">
                    <el-form-item>
                        <el-row>
                            <el-col :span="24">
                                <el-button type="primary" @click="submitForm('ruleForm')" v-loading="loading">登录
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
    import {API_BASE, DEBUG} from '../../config/config';

    export default {
        data() {
            return {
                loading: false,
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
                },
                items: [
                    {
                        icon: 'el-icon-setting',
                        index: 'index',
                        title: '首页'
                    },
                    {
                        icon: 'el-icon-date',
                        index: '1',
                        title: '测试支付链接',
                        subs: [
                            {
                                index: 'payment',
                                title: '测试支付'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-date',
                        index: '2',
                        title: '系统设置',
                        subs: [
                            {
                                index: 'account-manage',
                                title: '后台账户管理'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-warning',
                        index: 'permission',
                        title: '角色管理'
                    }
                ]
            }
        },
        methods: {
            // 提交表单
            submitForm(formName) {
                let vm = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.loading = true;
                        this.$httpPost('/admin/login/submit', {
                            username: this.ruleForm.username,
                            password: this.ruleForm.password,
                            captcha: this.ruleForm.verificationCode
                        }).then(({data}) => {
                            vm.loading = false;
                            vm.$message({message: '登陆成功', type: 'success'});
                            vm.$store.dispatch('userSignIn', data);
                            vm.$store.dispatch('setNavigationMenu', JSON.stringify(vm.items));
                            if (vm.$route.query.redirect) {
                                let redirect = vm.$route.query.redirect;
                                vm.$router.replace({path: redirect});
                            } else {
                                vm.$router.replace({path: '/'});
                            }
                        }).catch((data) => {
                            console.log(data.error)
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
                this.imgUrl = API_BASE + '/admin/utils/getCaptcha?' + this.getUuid();
            },
            // 获取时间戳
            getUuid: function () {
                return Date.parse(new Date());
            }
        },
        mounted() {
            this.imgUrl = API_BASE + '/admin/utils/getCaptcha?' + this.getUuid();
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
