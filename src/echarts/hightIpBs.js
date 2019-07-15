var echart = require('echarts/lib/echarts');
export default {
  
    tooltip: {
    trigger: 'axis',
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
           name: '流出带宽',
           type: 'line',
           stack: '总量',
           smooth: true,
           smoothMonotone: 'x',
           symbol: 'circle',
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
           data: [120, 132, 101, 134, 90, 230, 210],
       }
   ]
};

