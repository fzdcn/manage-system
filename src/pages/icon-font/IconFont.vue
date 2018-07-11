<template>
    <div class="table">
        <div class="container">
            <el-row :gutter="20">
                <el-col v-for="(item,index) in iconFontList" :key="index" :span="6" :xs="24" :sm="12" :md="6" :lg="4">
                    <div>
                        <i class="iconfont" :class="item.iconName"></i>
                        <p>{{ item.iconName }}</p>
                        <p>{{ item.chineseName }}</p>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                iconFontList: [
                    {
                        iconName: 'icon-shou-ye',
                        chineseName: '首页'
                    },
                    {
                        iconName: 'icon-kuai-jie-tong-dao',
                        chineseName: '快捷通道'
                    },
                    {
                        iconName: 'icon-jiao-yi-ji-lu',
                        chineseName: '交易记录'
                    },
                    {
                        iconName: 'icon-feng-kong',
                        chineseName: '风控'
                    },
                    {
                        iconName: 'icon-chan-pin',
                        chineseName: '产品'
                    },
                    {
                        iconName: 'icon-feng-kong-cha-xun',
                        chineseName: '风控查询'
                    },
                    {
                        iconName: 'icon-chan-pin-lie-biao-lie-biao-mo-shi',
                        chineseName: '产品列表-列表模式'
                    },
                    {
                        iconName: 'icon-yin-hang-ka-hao',
                        chineseName: '银行卡号'
                    },
                    {
                        iconName: 'icon-yin-hang',
                        chineseName: '银行'
                    },
                    {
                        iconName: 'icon-zhang-hu',
                        chineseName: '账户'
                    },
                    {
                        iconName: 'icon-ye-wu-yuan-guan-li',
                        chineseName: '业务员管理'
                    },
                    {
                        iconName: 'icon-yin-hang-ka',
                        chineseName: '银行卡'
                    },
                    {
                        iconName: 'icon-jue-se-guan-li',
                        chineseName: '角色管理'
                    },
                    {
                        iconName: 'icon-cai-dan',
                        chineseName: '菜单'
                    },
                    {
                        iconName: 'icon-duan-xin-guan-li',
                        chineseName: '短信管理'
                    },
                    {
                        iconName: 'icon-duan-xin-mo-ban-guan-li',
                        chineseName: '短信模板管理'
                    },
                    {
                        iconName: 'icon-duan-xin-ji-lu-cha-xun',
                        chineseName: '短信记录查询'
                    },
                    {
                        iconName: 'icon-lu-you-zu',
                        chineseName: '路由组'
                    },
                    {
                        iconName: 'icon-lu-you',
                        chineseName: '路由'
                    },
                    {
                        iconName: 'icon-ping-tai-jie-shao',
                        chineseName: '平台介绍'
                    },
                    {
                        iconName: 'icon-ping-tai-guan-li',
                        chineseName: '平台管理'
                    },
                    {
                        iconName: 'icon-she-zhi',
                        chineseName: '设置'
                    },
                    {
                        iconName: 'icon-shou-ye',
                        chineseName: '首页'
                    },
                    {
                        iconName: 'icon-xi-tong-she-zhi',
                        chineseName: '系统设置'
                    },
                    {
                        iconName: 'icon-ti-shi',
                        chineseName: '提示'
                    },
                    {
                        iconName: 'icon-tong-dao-three',
                        chineseName: '通道'
                    },
                    {
                        iconName: 'icon-tong-dao-one',
                        chineseName: '通道'
                    },
                    {
                        iconName: 'icon-tong-dao-two',
                        chineseName: '通道'
                    },
                    {
                        iconName: 'icon-zhang-hu-one',
                        chineseName: '账户'
                    },
                    {
                        iconName: 'icon-zhang-hu-two',
                        chineseName: '账户'
                    },
                    {
                        iconName: 'icon-zhang-hu-three',
                        chineseName: '账户'
                    },
                    {
                        iconName: 'icon-zhang-hu-four',
                        chineseName: '账户'
                    },
                    {
                        iconName: 'icon-chan-pin-one',
                        chineseName: '产品'
                    },
                    {
                        iconName: 'icon-chan-pin-two',
                        chineseName: '产品'
                    },
                    {
                        iconName: 'icon-chan-pin-three',
                        chineseName: '产品'
                    },
                    {
                        iconName: 'icon-chan-pin-four',
                        chineseName: '产品'
                    },
                    {
                        iconName: 'icon-chan-pin-five',
                        chineseName: '产品'
                    },
                    {
                        iconName: 'icon-shou-ye-four',
                        chineseName: '首页'
                    },
                    {
                        iconName: 'icon-shou-ye-three',
                        chineseName: '首页'
                    },
                    {
                        iconName: 'icon-shou-ye-two',
                        chineseName: '首页'
                    },
                    {
                        iconName: 'icon-shou-ye-one',
                        chineseName: '首页'
                    },
                    {
                        iconName: 'icon-she-zhi-one',
                        chineseName: '设置'
                    },
                    {
                        iconName: 'icon-she-zhi-two',
                        chineseName: '设置'
                    },
                    {
                        iconName: 'icon-she-zhi-three',
                        chineseName: '设置'
                    },
                    {
                        iconName: 'icon-she-zhi-four',
                        chineseName: '设置'
                    },
                    {
                        iconName: 'icon-ye-wu-one',
                        chineseName: '业务'
                    },
                    {
                        iconName: 'icon-ye-wu-two',
                        chineseName: '业务'
                    },
                    {
                        iconName: 'icon-ye-wu-three',
                        chineseName: '业务'
                    },
                    {
                        iconName: 'icon-ping-tai-one',
                        chineseName: '平台'
                    },
                    {
                        iconName: 'icon-ping-tai-two',
                        chineseName: '平台'
                    },
                    {
                        iconName: 'icon-ping-tai-three',
                        chineseName: '平台'
                    },
                    {
                        iconName: 'icon-ping-tai-four',
                        chineseName: '平台'
                    },
                    {
                        iconName: 'icon-jue-se-two',
                        chineseName: '角色'
                    },
                    {
                        iconName: 'icon-jue-se-three',
                        chineseName: '角色'
                    },
                    {
                        iconName: 'icon-jue-se-four',
                        chineseName: '角色'
                    },
                    {
                        iconName: 'icon-jue-se-one',
                        chineseName: '角色'
                    },
                    {
                        iconName: 'icon-jue-se-five',
                        chineseName: '角色'
                    },
                    {
                        iconName: 'icon-jue-se-six',
                        chineseName: '角色'
                    },
                    {
                        iconName: 'icon-duan-xin-two',
                        chineseName: '短信'
                    },
                    {
                        iconName: 'icon-duan-xin-three',
                        chineseName: '短信'
                    },
                    {
                        iconName: 'icon-duan-xin-four',
                        chineseName: '短信'
                    },
                    {
                        iconName: 'icon-duan-xin-five',
                        chineseName: '短信'
                    },
                    {
                        iconName: 'icon-tong-dao-one',
                        chineseName: '通道'
                    },
                    {
                        iconName: 'icon-tong-dao-two',
                        chineseName: '通道'
                    },
                    {
                        iconName: 'icon-tong-dao-three',
                        chineseName: '通道'
                    },
                    {
                        iconName: 'icon-cai-dan-one',
                        chineseName: '菜单'
                    },
                    {
                        iconName: 'icon-cai-dan-two',
                        chineseName: '菜单'
                    },
                    {
                        iconName: 'icon-cai-dan-three',
                        chineseName: '菜单'
                    },
                    {
                        iconName: 'icon-cai-dan-four',
                        chineseName: '菜单'
                    },
                    {
                        iconName: 'icon-cai-dan-five',
                        chineseName: '菜单'
                    },
                    {
                        iconName: 'icon-yin-hang-ka-one',
                        chineseName: '银行卡'
                    },
                    {
                        iconName: 'icon-yin-hang-ka-three',
                        chineseName: '银行卡'
                    },
                    {
                        iconName: 'icon-yin-hang-ka-two',
                        chineseName: '银行卡'
                    },
                    {
                        iconName: 'icon-yin-hang-ka-five',
                        chineseName: '银行卡'
                    },
                    {
                        iconName: 'icon-yin-hang-ka-four',
                        chineseName: '银行卡'
                    },
                    {
                        iconName: 'icon-yin-hang-ka-six',
                        chineseName: '银行卡'
                    },
                    {
                        iconName: 'icon-yin-hang-one',
                        chineseName: '银行'
                    },
                    {
                        iconName: 'icon-yin-hang-two',
                        chineseName: '银行'
                    },
                    {
                        iconName: 'icon-yin-hang-four',
                        chineseName: '银行'
                    },
                    {
                        iconName: 'icon-yin-hang-three',
                        chineseName: '银行'
                    },
                    {
                        iconName: 'icon-jiao-yi-one',
                        chineseName: '交易'
                    },
                    {
                        iconName: 'icon-jiao-yi-two',
                        chineseName: '交易'
                    },
                    {
                        iconName: 'icon-jiao-yi-three',
                        chineseName: '交易'
                    },
                    {
                        iconName: 'icon-jiao-yi-five',
                        chineseName: '交易'
                    },
                    {
                        iconName: 'icon-feng-kong-one',
                        chineseName: '风险'
                    },
                    {
                        iconName: 'icon-feng-kong-two',
                        chineseName: '风险'
                    },
                    {
                        iconName: 'icon-feng-kong-three',
                        chineseName: '风险'
                    },
                    {
                        iconName: 'icon-feng-kong-four',
                        chineseName: '风险'
                    },
                    {
                        iconName: 'icon-lu-you-two',
                        chineseName: '路由'
                    },
                    {
                        iconName: 'icon-lu-you-three',
                        chineseName: '路由'
                    },
                    {
                        iconName: 'icon-lu-you-four',
                        chineseName: '路由'
                    },
                    {
                        iconName: 'icon-lu-you-one',
                        chineseName: '路由'
                    },
                    {
                        iconName: 'icon-duan-xin-one',
                        chineseName: '短信'
                    }
                ]
            }
        }
    }

</script>

<style lang="stylus" scoped>
    .el-col
        margin-bottom 20px
        text-align center
        padding 10px 0
        div
            background-color #d3dce6
            padding 5px 0
            &:hover
                cursor pointer
                color #409EFF
                background rgba(13, 10, 49, .9)
            .iconfont
                font-size 30px
                margin-right 0
            p
                padding 5px 0
                overflow hidden
                text-overflow ellipsis
                white-space nowrap

</style>
