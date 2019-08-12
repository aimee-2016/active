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
       }
   },
   legend: {
        data: ['流出带宽'],
        bottom: 0,
        icon: 'circle',
    },
   grid: {
       top: 20,
       left: '3%',
       right: '4%',
       bottom: '7%',
       containLabel: true,
   },

   xAxis: {
       type: 'category',
       boundaryGap: false,
       data: ['周一','周二','周三','周四','周五'],
   },
   yAxis: {
       type: 'value'
   },
   series: [
       {
           name: '流出带宽',
           type: 'line',
           stack: '总量',
           smooth: true,
           smoothMonotone: 'x',
           symbol: 'circle',
           itemStyle: {
               normal: {
                   color: '#2A99F2'
               }
           },
           lineStyle: {
               normal: {
                   width: 8,
                   shadowColor: 'rgba(42, 153, 242, 0.5)',
                   shadowBlur: 10,
                   shadowOffsetY: 10,
                   color: {
                   type: 'linear',
                   x: 0,
                   y: 0,
                   x2: 0,
                   y2: 1,
                   colorStops: [{
                       offset: 0, color: 'rgba(42, 109, 242, 1)' // 0% 处的颜色
                   }, {
                       offset: 1, color: 'rgba(42, 153, 242, 1)' // 100% 处的颜色
                   }],
                   global: false // 缺省为 false
               },
               },
               itemStyle: {
                   color: '#fff'
               }
           },
           data: [],
       }
   ]
};

