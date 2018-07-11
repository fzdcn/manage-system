<template>
    <div id="myChart" :style="{width: '100%', height: '500px'}"></div>
</template>

<script>

    //引入基本模板
    let echarts = require('echarts/lib/echarts')

    // 引入line图组件
    require('echarts/lib/chart/line')
    // 引入提示框和title组件，图例
    require('echarts/lib/component/tooltip')
    require('echarts/lib/component/title')
    require('echarts/lib/component/toolbox')
    require('echarts/lib/component/legend')
    require('echarts/lib/component/markLine')

    export default {
        name: "eCharts",
        props: {
            weekTradeAmountList: {
                type: Array,
                required: true
            }
        },
        data() {
            return {
                tradeTime: [],
                tradeAmount: []
            }
        },
        methods: {
            getData() {
                let vm = this;
                for (let values of vm.weekTradeAmountList) {
                    vm.tradeTime.push(values.tradeTime);
                    vm.tradeAmount.push(values.tradeAmount);
                }
                this.$nextTick(function () {
                    vm.drawLine();
                })
            },
            drawLine() {
                // 基于准备好的dom，初始化echarts实例
                let myChart = echarts.init(document.getElementById('myChart'));
                // 绘制图表
                myChart.setOption({
                    title: {
                        text: '一周每天交易总额（元）'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['交易总额']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: this.tradeTime
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            name: '交易总额',
                            type: 'line',
                            data: this.tradeAmount
                        },
                    ]
                });
            }
        },
        created() {
            this.getData();
        }
    }
</script>

<style scoped>

</style>
