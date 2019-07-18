var echart = require('echarts/lib/echarts');
export default {
    tooltip: {
    trigger: 'axis',
    backgroundColor:'rgba(255,255,255,1)',
    padding:10,
    textStyle:{
        color:'#333333',
        fontFamily:'MicrosoftYaHei',
        fontSize:'12'
    },
       axisPointer: {
         type: 'line',
         lineStyle: {
           color: '#000000',
           opacity: 0.5,
           type: 'dashed'
         },
       },
   },
   legend: {
        data: ['已清洗流量', '正常业务流量'],
        bottom: 0,
        icon: 'circle',
        padding: [20, 0, 0, 0],
        itemWidth: 100,
        itemHeight: 20
    },
   grid: {
       left: '3%',
       right: '4%',
       bottom: '3%',
       containLabel: true,
   },
   toolbox: {
   },
     dataZoom: [
        {
            show: true,
            realtime: true,
            start: 65,
            end: 85
        },
        {
            type: 'inside',
            realtime: true,
            start: 65,
            end: 85
        }
    ],
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
           name: 'Syn带宽',
           type: 'line',
           stack: 'Syn带宽',
           smooth: true,
           smoothMonotone: 'x',
           symbol: 'circle',
           itemStyle: {
               normal: {
                    color: '#2A99F2'
                },
                lineStyle: {
                    color: "#2A99F2"//折线的颜色
                }
           },
           data: [80, 94, 117, 141, 90, 230, 210],
       },
        {
           name: 'Ack带宽',
           type: 'line',
           stack: 'Ack带宽',
           smooth: true,
           symbol: 'circle',
           symbolSize: 4, 
           smoothMonotone: 'x',
           itemStyle: {
                normal: {
                    color: '#19BE6A'
                },
                lineStyle:{
                    color:'#19BE6A'
                }
           },
           data: [160, 99, 140, 130, 90, 230, 210],
       },
       {
           name: 'Udp带宽',
           type: 'line',
           stack: 'Udp带宽',
           smooth: true,
           symbol: 'circle',
           symbolSize: 4, 
           smoothMonotone: 'x',
           itemStyle: {
               normal: {
                    color: '#FCCF14'
                },
                lineStyle:{
                    color: '#FCCF14'
                }
           },
           data: [90, 145, 61, 134, 90, 230, 210],
       },
       {
           name: 'ICMP带宽',
           type: 'line',
           stack: 'ICMP带宽',
           smooth: true,
           symbol: 'circle',
           symbolSize: 4, 
           smoothMonotone: 'x',
           itemStyle: {
               normal: {
                    color: '#F82B79'
                },
                lineStyle:{
                     color: '#F82B79'
                }
           },
           data: [100, 112, 91, 134, 90, 230, 210],
       },
       {
           name: 'Other带宽',
           type: 'line',
           stack: 'Other带宽',
           smooth: true,
           symbol: 'circle',
           symbolSize: 4, 
           smoothMonotone: 'x',
           itemStyle: {
               normal: {
                    color: '#723BCA'
                },
                lineStyle:{
                     color: '#723BCA'
                }
           },
           data: [110, 152, 71, 134, 90, 230, 210],
       },
   ]
};

