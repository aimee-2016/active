var echart = require('echarts/lib/echarts');
export default {
    title: {
        text: '折线图堆叠'
    },
    tooltip: {
        trigger: 'axis'
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
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            name: '邮件营销',
            type: 'line',
            smooth: true,
            smoothMonotone: 'x',
            stack: '总量',
            lineStyle: {
                normal: {
                    width: 3,
                    shadowColor: 'rgba(42, 153, 242, 1)',
                    shadowBlur: 10,
                    shadowOffsetY: 10
                },
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                        offset: 0, color: 'rgba(42, 153, 242, 1)' // 0% 处的颜色
                    }, {
                        offset: 1, color: 'rgba(42, 109, 242, 1)' // 100% 处的颜色
                    }],
                    global: false // 缺省为 false
                }
            },
            data: [120, 132, 101, 134, 90, 230, 210]
        }
    ]
};

