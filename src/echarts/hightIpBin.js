 var echart = require('echarts/lib/echarts');
export default {
 tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)",
        backgroundColor:'rgba(255,255,255,1)',
        padding:10,
        textStyle:{
            color:'#333333',
            fontFamily:'MicrosoftYaHei',
            fontSize:'12'
        },
        extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);'
    },
    color:[ '#2A99F2', '#19BE6A', '#FCCF14', '#F82B79', '#723BCA'],
    series: [
        {
            name:'攻击类型',
            type:'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    show: false,
                    textStyle: {
                        fontSize: '30',
                        fontWeight: 'bold'
                    }
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data: [
                {value: 0, name: 'SYN Flood'},
                {value: 0, name: 'Ack Flood'},
                {value: 0, name: 'Udp Flood'},
                {value: 0, name: 'ICMP Flood'},
                {value: 0, name: 'Other'}
            ]
        }
    ]
}