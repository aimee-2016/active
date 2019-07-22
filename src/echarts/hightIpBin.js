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
          
            data:[
                {value:335, name:'SYN Flood'},
                {value:310, name:'Ack Flood'},
                {value:234, name:'Udp Flood'},
                {value:135, name:'ICMP Flood'},
                {value:1548, name:'Other'}
            ]
        }
    ]
}