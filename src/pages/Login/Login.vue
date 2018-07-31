<template>
    <div class="login-wrap">
        <canvas id="canvas"></canvas>
        <div class="login">
            <div class="ms-title">双乾支付系统管理后台</div>
            <div class="login-info">
                <div class="user-name">
                    <i ref="userNameIcon" class="iconfont icon-zhang-hu"></i>
                    <input type="text" @keyup.enter="submitForm" v-model.trim="ruleForm.username" @focus="$refs.userNameIcon.style.color='#fff'" @blur="$refs.userNameIcon.style.color='#656060'" placeholder="请输入用户名">
                </div>
                <div class="user-password">
                    <i ref="userPasswordIcon" class="iconfont icon-password"></i>
                    <input type="password" @keyup.enter="submitForm" v-model.trim="ruleForm.password" @focus="$refs.userPasswordIcon.style.color='#fff'" @blur="$refs.userPasswordIcon.style.color='#656060'" placeholder="请输入密码">
                </div>
                <div class="verification-code">
                    <i ref="verificationCode" class="iconfont icon-yan-zheng-ma"></i>
                    <input type="text" @keyup.enter="submitForm" v-model.trim="ruleForm.verificationCode" @focus="$refs.verificationCode.style.color='#fff'" @blur="$refs.verificationCode.style.color='#656060'" placeholder="验证码">
                    <span class="verification-img" @click="changeImgUrl">{{imgUrl ? imgUrl :'错误'}}</span>
                </div>
            </div>
            <div class="login-btn">
                <button class="fl" @click="submitForm">登&nbsp&nbsp陆</button>
                <button class="fr" @click="resetForm">重&nbsp&nbsp置</button>
            </div>
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
            }
        }
    },
    methods: {
        // 提交表单
        submitForm() {
            let vm = this
            if (!this.ruleForm.username) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '用户名不能为空！'
                })
                return false
            }
            if (!this.ruleForm.password) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '密码不能为空！'
                })
                return false
            }
            if (!this.ruleForm.verificationCode) {
                this.$notify.warning({
                    duration: 2000,
                    title: '警告',
                    message: '验证码不能为空！'
                })
                return false
            }
            this.$httpPost('/admin/login/submit', {
                username: this.ruleForm.username,
                password: this.ruleForm.password,
                captcha: this.ruleForm.verificationCode
            })
                .then(({ data }) => {
                    this.$notify.success({
                        duration: 2000,
                        title: '成功',
                        message: '登陆成功！'
                    })
                    vm.$store.dispatch('userSignIn', data.admin)
                    vm.$store.dispatch(
                        'setNavigationMenu',
                        JSON.stringify(data.adminMenuList[0].subs)
                    )
                    if (vm.$route.query.redirect) {
                        let redirect = vm.$route.query.redirect
                        vm.$router.replace({ path: redirect })
                    } else {
                        vm.$router.replace({ path: '/' })
                    }
                })
                .catch(data => {
                    console.log(data)
                })
        },
        // 重置表单
        resetForm() {
            this.ruleForm.username = ''
            this.ruleForm.password = ''
            this.ruleForm.verificationCode = ''
        },
        // 点击更换验证码
        changeImgUrl() {
            this.$httpGet('/admin/utils/getCaptcha?' + new Date().getTime(), {})
                .then(({ data }) => {
                    this.imgUrl = data
                })
                .catch(data => {
                    console.log(data)
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
                    this.x = x
                    this.y = y
                    this.r = Math.random() * 8
                    this._mx = Math.random()
                    this._my = Math.random()
                }

                //canvas 画圆和画直线
                //画圆就是正常的用canvas画一个圆
                //画直线是两个圆连线，为了避免直线过多，给圆圈距离设置了一个值，距离很远的圆圈，就不做连线处理
                drawCircle(ctx) {
                    ctx.beginPath()
                    //arc() 方法使用一个中心点和半径，为一个画布的当前子路径添加一条弧。
                    ctx.arc(this.x, this.y, this.r, 0, 360)
                    ctx.closePath()
                    ctx.fillStyle = 'rgba(255, 255, 255, 1)'
                    ctx.fill()
                }

                drawLine(ctx, _circle) {
                    let dx = this.x - _circle.x
                    let dy = this.y - _circle.y
                    let d = Math.sqrt(dx * dx + dy * dy)
                    if (d < 150) {
                        ctx.beginPath()
                        //开始一条路径，移动到位置 this.x,this.y。创建到达位置 _circle.x,_circle.y 的一条线：
                        ctx.moveTo(this.x, this.y) //起始点
                        ctx.lineTo(_circle.x, _circle.y) //终点
                        ctx.closePath()
                        ctx.strokeStyle = 'rgba(12,56,100, 1)'
                        ctx.stroke()
                    }
                }

                // 圆圈移动
                // 圆圈移动的距离必须在屏幕范围内
                move(w, h) {
                    this._mx = this.x < w && this.x > 0 ? this._mx : -this._mx
                    this._my = this.y < h && this.y > 0 ? this._my : -this._my
                    this.x += this._mx / 2
                    this.y += this._my / 2
                }
            }

            //鼠标点画圆闪烁变动
            class currentCirle extends Circle {
                constructor(x, y) {
                    super(x, y)
                }

                drawCircle(ctx) {
                    ctx.beginPath()
                    //注释内容为鼠标焦点的地方圆圈半径变化
                    //this.r = (this.r < 14 && this.r > 1) ? this.r + (Math.random() * 2 - 1) : 2;
                    this.r = 8
                    ctx.arc(this.x, this.y, this.r, 0, 360)
                    ctx.closePath()
                    //ctx.fillStyle = 'rgba(0,0,0,' + (parseInt(Math.random() * 100) / 100) + ')'
                    ctx.fillStyle = 'rgba(204, 204, 204, 0.3)'
                    ctx.fill()
                }
            }

            //更新页面用setTimeout替代requestAnimationFrame
            // window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

            let canvas = document.getElementById('canvas')
            let ctx = canvas.getContext('2d')
            let w = (canvas.width = canvas.offsetWidth)
            let h = (canvas.height = canvas.offsetHeight)
            let circles = []
            let current_circle = new currentCirle(0, 0)

            let draw = function() {
                ctx.clearRect(0, 0, w, h)
                for (let i = 0; i < circles.length; i++) {
                    circles[i].move(w, h)
                    circles[i].drawCircle(ctx)
                    // for (let j = i + 1; j < circles.length; j++) {
                    //     circles[i].drawLine(ctx, circles[j])
                    // }
                }
                if (current_circle.x) {
                    current_circle.drawCircle(ctx)
                    // for (var k = 1; k < circles.length; k++) {
                    //     current_circle.drawLine(ctx, circles[k])
                    // }
                }
                // requestAnimationFrame(draw)
                setTimeout(draw, 10)
            }

            let init = function(num) {
                for (var i = 0; i < num; i++) {
                    circles.push(
                        new Circle(Math.random() * w, Math.random() * h)
                    )
                }
                draw()
            }

            window.addEventListener('load', init(110))

            window.onmousemove = function(e) {
                e = e || window.event
                current_circle.x = e.clientX
                current_circle.y = e.clientY
            }

            window.onmouseout = function() {
                current_circle.x = null
                current_circle.y = null
            }
        }
    },
    mounted() {
        this.getCanvas()
        this.changeImgUrl()
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
    /* background-color: #242645; */
    background-image: url('../../../static/img/login-bg.png');
    background-repeat: no-repeat;
    background-size: cover;
}

.login {
    position: absolute;
    width: 320px;
    height: 430px;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    opacity: 1;
    padding: 40px 20px;
    box-shadow: -15px 15px 15px rgba(13, 16, 22, 0.4);
    -webkit-transition-property: -webkit-transform, opacity, box-shadow, top,
        left;
    transition-property: transform, opacity, box-shadow, top, left;
    -webkit-transition-duration: 0.5s;
    transition-duration: 0.5s;
    -webkit-transform-origin: 161px 100%;
    -ms-transform-origin: 161px 100%;
    transform-origin: 161px 100%;
    -webkit-transform: rotateX(0deg);
    transform: rotateX(0deg);
    background: #35394a;
    /* Old browsers */
    /* FF3.6+ */
    background: -webkit-gradient(
        linear,
        left bottom,
        right top,
        color-stop(0%, #35394a),
        color-stop(100%, rgb(0, 0, 0))
    );
    /* Chrome,Safari4+ */
    background: -webkit-linear-gradient(
        230deg,
        rgba(53, 57, 74, 0) 0%,
        rgb(0, 0, 0) 100%
    );
    /* Chrome10+,Safari5.1+ */
    /* Opera 11.10+ */
    /* IE10+ */
    background: linear-gradient(
        230deg,
        rgba(53, 57, 74, 0) 0%,
        rgb(0, 0, 0) 100%
    );
    /* W3C */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='rgba(53, 57, 74, 0)', endColorstr='rgb(0, 0, 0)',GradientType=1 );
    /* IE6-9 fallback on horizontal gradient */
}
.login-info {
    text-align: left;
    margin-top: 45px;
}
.user-name,
.user-password,
.verification-code {
    height: 40px;
    width: 100%;
    padding: 15px 0;
    text-align: center;
}
.user-name input,
.user-password input {
    color: #ffffff;
    width: 200px;
    left: 0;
    padding: 0px 15px 0 15px;
    height: 40px;
    border-radius: 30px;
    border: none;
    outline: none;
    font-size: 16px;
    background: rgba(57, 61, 82, 0);
}
.verification-code input {
    color: #fff;
    width: 70px;
    left: 0;
    padding: 0px 15px 0 15px;
    height: 40px;
    border-radius: 30px;
    border: none;
    outline: none;
    font-size: 16px;
    background: rgba(57, 61, 82, 0);
}
.user-name i,
.user-password i,
.verification-code i {
    font-size: 20px;
    margin-top: 9px;
    color: #656060;
    left: 35px;
    position: absolute;
    margin-right: 0;
}
.verification-img {
    display: inline-block;
    width: 100px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    margin-left: 25px;
    border-radius: 30px;
    cursor: pointer;
    color: #afb1be;
    font-size: 16px;
    background: rgba(57, 61, 82, 0.1);
}
.verification-img:hover {
    color: #fff;
}
.login-btn {
    width: 100%;
    text-align: center;
    height: 40px;
    line-height: 50px;
    margin-top: 30px;
}
.login-btn button {
    width: 150px;
    text-align: center;
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    border: none;
    background: rgba(57, 61, 82, 0.1);
    border-radius: 30px;
    color: #afb1be;
    cursor: pointer;
    outline: none;
}
.login-btn button:hover {
    color: #fff;
    background-color: rgba(57, 61, 82, 0.2);
}
::-webkit-input-placeholder {
    color: #afb1be;
}
:-moz-placeholder {
    /* Firefox 18- */

    color: #afb1be;
}

::-moz-placeholder {
    /* Firefox 19+ */

    color: #afb1be;
}

:-ms-input-placeholder {
    color: #afb1be;
}
.ms-title {
    text-align: center;
    font-size: 30px;
    color: #fff;
}
</style>
