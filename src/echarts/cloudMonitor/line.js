export default {
  // title: {
  //   text: '折线图堆叠'
  // },
  tooltip: {
    trigger: 'axis'
  },
  // legend: {
  //   data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
  // },
  grid: {
    left: '0%',
    right: '3%',
    bottom: '0%',
    top: '5%',
    containLabel: true
  },
  toolbox: {
    // feature: {
    //   saveAsImage: {}
    // }
  },
  xAxis: {
    type: 'category',
    splitLine: {
      show: false
    },
    boundaryGap: false,
    data: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
    // axisTick: {
    //   alignWithLabel: true
    // }
    axisLine: {
      lineStyle: {
        color: '#D8D8D8'
      }
    },
    axisLabel: {
      show: true,
      textStyle: {
        color: 'rgba(17,17,17,0.65)'
      }
    }
  },
  yAxis: {
    type: 'value',
    splitLine: {
      show: false
    },
    axisLine: {
      lineStyle: {
        color: '#D8D8D8'
      }
    },
    axisLabel: {
      show: true,
      textStyle: {
        color: 'rgba(17,17,17,0.65)'
      }
    },
  },
  color: ['#FFE777', '#BFE0FB', '#2A99F2', '#6CC0B5','red'],
  // color: ['#3398DB'],
  series: [
    {
      name: 'host1',
      type: 'line',
      stack: '总量',
      data: [20, 32, 1, 34, 90, 30, 10],
      barWidth: '60%',
    },
    {
      name: 'host2',
      type: 'line',
      stack: '总量',
      data: [20, 12, 11, 24, 80, 30, 30],
      barWidth: '60%',
    },
    {
      name: 'host3',
      type: 'line',
      stack: '总量',
      data: [20, 12, 11, 24, 80, 30, 30],
      barWidth: '60%',
    },
    {
      name: 'host4',
      type: 'line',
      stack: '总量',
      data: [20, 12, 11, 24, 80, 30, 30],
      barWidth: '60%',
    },
    {
      name: 'host5',
      type: 'line',
      stack: '总量',
      data: [20, 12, 11, 24, 80, 30, 30],
      barWidth: '60%',
    }
  ]
}
