<template>
    <div class="login-wrap">
        <canvas id="canvas"></canvas>
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
                this.$httpGet('/admin/utils/getCaptcha?' + new Date().getTime(), {})
                    .then(({data}) => {
                        this.imgUrl = data;
                    }).catch((data) => {
                    console.log(data);
                })
            },
            getCanvas() {
                class Circle {
                    //创建对象
                    //以一个圆为对象
                    //设置随机的 x，y坐标，r半径，_mx，_my移动的距离
                    //this.r是创建圆的半径，参数越大半径越大
                    //this._mx,this._my是移动的距离，参数越大移动
                    constructor(x, y) {
                        this.x = x;
                        this.y = y;
                        this.r = Math.random() * 10;
                        this._mx = Math.random();
                        this._my = Math.random();

                    }

                    //canvas 画圆和画直线
                    //画圆就是正常的用canvas画一个圆
                    //画直线是两个圆连线，为了避免直线过多，给圆圈距离设置了一个值，距离很远的圆圈，就不做连线处理
                    drawCircle(ctx) {
                        ctx.beginPath();
                        //arc() 方法使用一个中心点和半径，为一个画布的当前子路径添加一条弧。
                        ctx.arc(this.x, this.y, this.r, 0, 360)
                        ctx.closePath();
                        ctx.fillStyle = 'rgba(204, 204, 204, 0.3)';
                        ctx.fill();
                    }

                    drawLine(ctx, _circle) {
                        let dx = this.x - _circle.x;
                        let dy = this.y - _circle.y;
                        let d = Math.sqrt(dx * dx + dy * dy)
                        if (d < 150) {
                            ctx.beginPath();
                            //开始一条路径，移动到位置 this.x,this.y。创建到达位置 _circle.x,_circle.y 的一条线：
                            ctx.moveTo(this.x, this.y); //起始点
                            ctx.lineTo(_circle.x, _circle.y); //终点
                            ctx.closePath();
                            ctx.strokeStyle = 'rgba(204, 204, 204, 0.3)';
                            ctx.stroke();
                        }
                    }

                    // 圆圈移动
                    // 圆圈移动的距离必须在屏幕范围内
                    move(w, h) {
                        this._mx = (this.x < w && this.x > 0) ? this._mx : (-this._mx);
                        this._my = (this.y < h && this.y > 0) ? this._my : (-this._my);
                        this.x += this._mx / 2;
                        this.y += this._my / 2;
                    }
                }

                //鼠标点画圆闪烁变动
                class currentCirle extends Circle {
                    constructor(x, y) {
                        super(x, y)
                    }

                    drawCircle(ctx) {
                        ctx.beginPath();
                        //注释内容为鼠标焦点的地方圆圈半径变化
                        //this.r = (this.r < 14 && this.r > 1) ? this.r + (Math.random() * 2 - 1) : 2;
                        this.r = 8;
                        ctx.arc(this.x, this.y, this.r, 0, 360);
                        ctx.closePath();
                        //ctx.fillStyle = 'rgba(0,0,0,' + (parseInt(Math.random() * 100) / 100) + ')'
                        ctx.fillStyle = 'rgba(255, 77, 54, 0.6)'
                        ctx.fill();

                    }
                }

                //更新页面用requestAnimationFrame替代setTimeout
                // window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

                let canvas = document.getElementById('canvas');
                let ctx = canvas.getContext('2d');
                let w = canvas.width = canvas.offsetWidth;
                let h = canvas.height = canvas.offsetHeight;
                let circles = [];
                let current_circle = new currentCirle(0, 0)

                let draw = function () {
                    ctx.clearRect(0, 0, w, h);
                    for (let i = 0; i < circles.length; i++) {
                        circles[i].move(w, h);
                        circles[i].drawCircle(ctx);
                        for (let j = i + 1; j < circles.length; j++) {
                            circles[i].drawLine(ctx, circles[j])
                        }
                    }
                    if (current_circle.x) {
                        current_circle.drawCircle(ctx);
                        for (let k = 1; k < circles.length; k++) {
                            current_circle.drawLine(ctx, circles[k])
                        }
                    }
                    // requestAnimationFrame(draw)
                    setTimeout(draw, 10)
                };

                let init = function (num) {
                    for (let i = 0; i < num; i++) {
                        circles.push(new Circle(Math.random() * w, Math.random() * h));
                    }
                    draw();
                };

                window.addEventListener('load', init(60));

                window.onmousemove = function (e) {
                    e = e || window.event;
                    current_circle.x = e.clientX;
                    current_circle.y = e.clientY;
                };

                window.onmouseout = function () {
                    current_circle.x = null;
                    current_circle.y = null;
                }
            },
        },
        mounted() {
            this.getCanvas();
            this.changeImgUrl();
        }
    }
</script>

<style scoped>
    canvas {
        display: block;
        width: 100%;
        height: 100%;
    }

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
