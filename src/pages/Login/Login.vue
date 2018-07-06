<template>
    <div class="login-wrap">
        <canvas></canvas>
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
                            <p style="background-color: rgb(109, 120, 132);cursor: pointer;"
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
            getCanvas() {
                let FastRandom = function () {
                    this.getNextFloat = function () {
                        return Math.random();
                    };
                };
                let ParticleWave = function () {
                    let me = this;

                    let config = {
                        colors: {
                            background: 0x000000,
                            particle: 0x477cc2
                        },
                        alpha: {
                            particle: 1
                        },
                        particleCount: 30000
                    };

                    let TAU = Math.PI * 2;

                    let random = new FastRandom();

                    let particle;
                    let particleFillStyle;
                    let particleColorRGB = new Float32Array(3);

                    let smoothGradient;
                    let waterGradient;

                    let canvas;
                    let engine;

                    let width;
                    let height;

                    let particleWaveWalker = 0;
                    let randomWalker = 0;

                    let requestTick = function () {
                        window.requestAnimationFrame(tick);
                    };

                    let initParticle = function () {
                        particle = new Float32Array(config.particleCount * 2);

                        eachParticle(function (x, z) {
                            particle[x] = random.getNextFloat();
                            particle[z] = random.getNextFloat();
                        });
                    };

                    let initCanvas = function () {
                        let cs = document.getElementsByTagName('canvas');

                        canvas = cs[0];
                        engine = canvas.getContext('2d');

                        width = window.innerWidth;
                        height = window.innerHeight;

                        canvas.setAttribute('width', width);
                        canvas.setAttribute('height', height);
                    };

                    let initParticleColor = function () {
                        particleColorRGB[0] = config.colors.particle >> 16 & 0xff;
                        particleColorRGB[1] = config.colors.particle >> 8 & 0xff;
                        particleColorRGB[2] = config.colors.particle & 0xff;

                        particleFillStyle = 'rgb(' + particleColorRGB[0] + ',' + particleColorRGB[1] + ',' + particleColorRGB[2] + ')';
                    };

                    let initSmoothGradient = function () {
                        smoothGradient = engine.createLinearGradient(
                            width / 2,
                            0,
                            width / 2,
                            height
                        );

                        smoothGradient.addColorStop(0.25, 'rgba(0, 0, 0, 0)');

                        smoothGradient.addColorStop(0.45, 'rgba(0, 0, 0, 0.9)');
                        smoothGradient.addColorStop(0.5, 'rgba(0, 0, 0, 1)');
                        smoothGradient.addColorStop(0.55, 'rgba(0, 0, 0, 0.9)');

                        smoothGradient.addColorStop(0.75, 'rgba(0, 0, 0, 0)');
                    };

                    let initWaterGradient = function () {
                        waterGradient = engine.createLinearGradient(
                            width / 2,
                            height / 2,
                            width / 2,
                            height
                        );

                        waterGradient.addColorStop(0, 'rgba(0, 0, 30, 0)');
                        waterGradient.addColorStop(1, 'rgba(30, 0, 60, 0.5)');
                    };

                    let init = function () {
                        initCanvas();
                        initParticle();
                        initParticleColor();
                        initSmoothGradient();
                        initWaterGradient();
                    };

                    let eachParticle = function (cb) {
                        for (let i = 0; i < particle.length; i += 2) {
                            cb(i, i + 1);
                        }
                    };

                    let renderParticle = function () {
                        randomWalker += (Math.random() - 0.5) * 0.1;

                        particleWaveWalker += 0.03;

                        let radius = {
                            min: 1,
                            add: 5
                        };

                        let midY = height / 2;
                        let midX = width / 2;

                        let spreadX = 5;
                        let spreadZ = 0.0;

                        let modZ = 0.0;

                        let addX = 0;
                        let addY = 0;

                        let p = {
                            x: 0.0,
                            y: 0.0,
                            r: 0.0
                        };

                        engine.fillStyle = particleFillStyle;
                        // engine.beginPath();

                        let waveControl = 10;

                        for (let i = 0, xIndex, zIndex; i < particle.length; i += 2) {

                            xIndex = i;
                            zIndex = i + 1;

                            particle[zIndex] += 0.003;

                            if (particle[zIndex] > 1) {
                                particle[zIndex] = 0;
                                particle[xIndex] = random.getNextFloat();
                            }

                            if (particle[zIndex] < 0.3) {
                                continue;
                            }

                            modZ = Math.pow(particle[zIndex], 2);
                            spreadZ = 1 + (spreadX - 1) * modZ;

                            //bottom

                            addX = (0.5 - particle[xIndex]) * width * spreadZ;
                            addY = midY * modZ * (1 + 3 / waveControl);

                            p.x = midX + addX;
                            p.y = midY + addY;
                            p.r = radius.min + modZ * radius.add;

                            p.y += Math.sin(particle[xIndex] * 50 + particleWaveWalker) * addY / waveControl;
                            p.y += Math.cos(particle[zIndex] * 10 + particleWaveWalker) * addY / waveControl;

                            p.y -= Math.cos(particle[zIndex] + particle[xIndex] * 10 + particleWaveWalker) * addY / waveControl;

                            p.y -= Math.cos(particle[xIndex] * 50 + particleWaveWalker) * addY / waveControl;
                            p.y -= Math.sin(particle[zIndex] * 10 + particleWaveWalker) * addY / waveControl;

                            if (p.x < 0 || p.x > width) {
                                continue;
                            }

                            engine.fillRect(p.x, p.y, p.r, p.r);

                            // engine.moveTo(p.x, p.y);
                            // engine.arc(p.x, p.y, p.r, 0, TAU);

                            //top
                            // p.y = height - p.y;
                            //
                            // engine.moveTo(p.x, p.y);
                            // engine.arc(p.x, p.y, p.r, 0, TAU);
                        }

                        engine.fillStyle = particleFillStyle;

                        // engine.closePath();
                        // engine.fill();
                    };

                    let colorIntToHexString = function (color) {
                        let s = color.toString(16);

                        return '0'.repeat(6 - s.length) + s;
                    };

                    let clear = function () {
                        engine.fillStyle = '#' + colorIntToHexString(config.colors.background);
                        engine.fillRect(0, 0, width, height);
                    };

                    let drawSmooth = function () {
                        engine.fillStyle = smoothGradient;
                        engine.fillRect(0, 0, width, height);
                    };

                    let drawWater = function () {
                        engine.fillStyle = waterGradient;
                        engine.fillRect(0, height / 2, width, height / 2);
                    };

                    let tick = function () {
                        clear();

                        drawWater();
                        renderParticle();
                        drawSmooth();

                        requestTick();
                    };

                    this.run = function () {
                        init();
                        tick();
                    };
                };

                let pw = new ParticleWave();
                pw.run();
            },
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
            this.getCanvas();
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
        animation: myTitle 2s cubic-bezier(0.68, -0.55, 0.27, 1.55);
        /* Firefox: */
        -moz-animation: myTitle 2s cubic-bezier(0.68, -0.55, 0.27, 1.55);
        /* Safari and Chrome: */
        -webkit-animation: myTitle 2s cubic-bezier(0.68, -0.55, 0.27, 1.55);
        /* Opera: */
        -o-animation: myTitle 2s cubic-bezier(0.68, -0.55, 0.27, 1.55);
    }

    @keyframes myTitle {
        0% {
            top: 0%;
        }
        100% {
            top: 50%;
        }
    }

    @-moz-keyframes myTitle /* Firefox */
    {
        0% {
            top: 0%;
        }
        100% {
            top: 50%;
        }
    }

    @-webkit-keyframes myTitle /* Safari and Chrome */
    {
        0% {
            top: 0%;
        }
        100% {
            top: 50%;
        }
    }

    @-o-keyframes myTitle /* Opera */
    {
        0% {
            top: 0%;
        }
        100% {
            top: 50%;
        }
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
        background-color: rgba(255, 255, 255, 0.2);
        animation: myLogin 2s cubic-bezier(0.68, -0.55, 0.27, 1.55);
        /* Firefox: */
        -moz-animation: myLogin 2s cubic-bezier(0.68, -0.55, 0.27, 1.55);
        /* Safari and Chrome: */
        -webkit-animation: myLogin 2s cubic-bezier(0.68, -0.55, 0.27, 1.55);
        /* Opera: */
        -o-animation: myLogin 2s cubic-bezier(0.68, -0.55, 0.27, 1.55);

    }

    @keyframes myLogin {
        0% {
            left: -300px;
        }
        100% {
            left: 50%;
        }
    }

    @-moz-keyframes myLogin /* Firefox */
    {
        0% {
            left: -300px;
        }
        100% {
            left: 50%;
        }
    }

    @-webkit-keyframes myLogin /* Safari and Chrome */
    {
        0% {
            left: -300px;
        }
        100% {
            left: 50%;
        }
    }

    @-o-keyframes myLogin /* Opera */
    {
        0% {
            left: -300px;
        }
        100% {
            left: 50%;
        }
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
