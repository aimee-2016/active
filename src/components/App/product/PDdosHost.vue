<template>
  <div class="product">
    <h1 id="hide-h1">DDOS高防主机</h1>
    <!-- logo -->
    <div class="logo">
      <div class="logo-wrapper">
        <img :src="logo.img" alt="描述">
        <div class="info">
          <h3 >{{logo.title}}</h3>
          <span class="desc">{{logo.desc}}</span>
          <router-link :to="logo.linkRouter">立即体验</router-link>
        </div>
      </div>
    </div>
    <!-- 功能描述 -->
    <div class="features" style="background: #f0f2f5;">
      <div class="features-wrapper">
        <p class="subTitle">功能描述</p>
        <div class="features-flex">
          <div v-for="(feature, index) in features" class="flex-item" :key="(index+2)*11">
            <div>
              <i class="iconfont" :class="feature.img" style="font-size:40px;color:#fff;"></i>
              <div>
                <span class="title">{{feature.title}}</span>
                <span class="desc">{{feature.desc}}</span>
              </div>
            </div>
            <div class="hover">
              <p>{{feature.desc}}</p>
            </div>
          </div>
        </div>
      </div>

    </div>
    <!-- 使用场景 -->
    <div class="stage">
      <div class="wrapper">
        <p class="subTitle">使用场景</p>
        <div class="flex">
          <div class="left">
            <div style="padding: 30px 20px;"  v-for="(stage,index) in stageInfo.stages" :key="(index+3)*17"
                 :class="{active:index == stageInfo.selectIndex}"
                 @click="stageInfo.selectIndex=index">
              <div style="width: 50px;">
                <i class="iconfont" :class="stage.icon" style="font-size:40px;color:#2A99F2;" v-show="index != stageInfo.selectIndex"></i>
                <i class="iconfont" :class="stage.icon" style="font-size:40px;color:#fff;" v-show="index == stageInfo.selectIndex"></i>
                <p style="margin-top: 10px;">{{stage.title}}</p>
              </div>
            </div>
          </div>
          <div class="right">
            <div v-for="(stage,index) in stageInfo.stages" v-show="index == stageInfo.selectIndex" :key="(index+1)*11">
              <img :src="stage.img" alt="描述">
              <div style="padding:20px;">
                <span>场景描述</span>
                <p v-for="(p,i) in stage.desc" :key="(i+2)*19">
                  {{p}}
                </p>

                <span style="margin-top:40px;">配合使用</span>
                <div style="display: flex">
                  <div v-for="(pimg, ins) in stageInfo.pImg" style="margin-right: 10px;" :key="(ins+3)*24">
                    <div style="width: 100px;height: 100px;background-color: #ffffff;text-align: center;padding-top: 24px">
                      <i class="iconfont" :class="pimg.img" style="font-size:40px;color:#2A99F2;"></i>
                      <span style="margin-top: 7px;font-size: 14px; color:#666;">{{pimg.isc}}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 产品优势 -->
    <div class="advantage" style="background: #f0f2f5;">
      <div class="wrapper">
        <p class="subTitle">产品优势</p>
        <div class="advantage-flex">
          <div v-for="(advantage,index) in advantages" class="flex-item" :key="(index+4)*42">
            <i class="iconfont" :class="advantage.img"></i>
            <div>
              <span class="title">{{advantage.title}}</span>
              <span class="desc">{{advantage.desc}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 相关产品推荐 -->
    <div class="recommendation">
      <div class="wrapper">
        <p class="subTitle">相关产品推荐</p>
        <div class="recommendation-flex">
          <div v-for="(recommendation,index) in recommendations" class="flex-item" :key="(index+6)*54">
            <div class="icon-wrap">
              <i v-if="index==3" class="iconfont" :class="recommendation.img" style="font-size:34px;color:#fff;display:inline-block;"></i>
              <i v-else class="iconfont" :class="recommendation.img" style="font-size:40px;color:#fff;display:inline-block;"></i>
            </div>
            <div>
              <span class="title">{{recommendation.title}}</span>
              <span class="desc">{{recommendation.desc}}</span>
            </div>
            <router-link :to="recommendation.path" target="_blank">详情</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import $store from '@/vuex'
  export default{
    metaInfo: {
      title: 'ddos高防云服务器 - ddos防御 - 防护ddos攻击 - 云安全 - 新睿云', // set a title
      meta: [{                 // set meta
        name: 'keywords',
        content: 'ddos,ddos防御,防ddos攻击,ddos防护,防御ddos,ddos服务器,防ddos服务器,ddos云防御,ddos高防'
      },
        {                 // set meta
          name: 'description',
          content: '新睿云通过专用硬件，针对DDoS攻击，为用户提供高防IP服务。高防IP为用户已备案的域名提供最高40Gbps的DDoS高级防护。用户在遭遇大流量DDoS攻击的情况下，可以在配置高防IP后将攻击流量引至高防IP，确保源站稳定可用。'
        }]
    },
    data(){
      return {
        logo: {
          img: require('../../../assets/img/product/ddos-logo.png'),
          title: 'DDOS防护',
          desc: '新睿云通过专用硬件，针对DDoS攻击，为用户提供高防IP服务。高防IP为用户已备案的域名提供最高40Gbps的DDoS高级防护。用户在遭遇大流量DDoS攻击的情况下，可以在配置高防IP后将攻击流量引至高防IP，确保源站稳定可用。',
          linkRouter: $store.state.userInfo ? '/firewallList' : '/login'
        },
        features: [
          {img: 'icon-DDosliuliangqingxi1', title: '低成本、高易用', desc: '弹性防护，灵活计费相较于高防IP，高防主机应用成本价格更低，且更易用，管理方式与云服务器一致，无需任何额外学习成本。'},
          {img: 'icon-jingzhunfanghu1', title: '精准防护报表', desc: '提供精准的防护报表，帮您及时了解攻击情况提供实时精准的防护相关报表及日志详情，使您及时、准确了解IP高防的防护效果。'},
          {img: 'icon-jiyuwangluochuanshudegongjifanghu', title: 'DDoS攻击防护', desc: '防护多种类型的DDoS攻击包括但不限于SYN Flood、ACK Flood 、ICMP Flood、UDP Flood、TCP Flood、CC等攻击，支持攻击取证和攻击溯源。'}
        ],
        advantages: [
          {
            img: 'icon-hailiangqingxinengli',
            title: '超大清洗容量',
            desc: '最大800GB防御带宽，超大流量攻击时智能调度全网节点，化攻击于无形。'
          },
          {
            img: 'icon-yewuyouhao',
            title: '业务友好化',
            desc: 'HTTP/TCP/UDP全协议支持，适用于游戏、金融、电商等各类网站或非网站业务。'
          },
          {
            img: 'icon-gaoxingjiabi',
            title: '高性价比',
            desc: '弹按需购买，弹性防护，大流量攻击按天付费，既保证成本可控，又无需担心攻击过大导致服务中断。'
          },
          {
            img: 'icon-zhuanyefuwutuandui',
            title: '专业服务团队',
            desc: '7*24小时安全专家服务团队随时待命，为您的业务保驾护航。'
          }
        ],
        stageInfo: {
          stages: [
            {
              title: '互联网',
//              activeIcon: require('../../../assets/img/product/ddos-stage-1-blue.png'),
              icon: 'icon-menhuwangzhan',
              img: require('../../../assets/img/product/ddos_fang.png'),
              desc: ['DDoS攻击导致网页无法访问，或访问变慢，用户流失。营销/推广活动重要时间段被针对性攻击，白白浪费营销投入。']
            },
            {
              title: '金融',
//              activeIcon: require('../../../assets/img/product/ddos-stage-1-blue.png'),
              icon: 'icon-dianshangwangzhan',
              img: require('../../../assets/img/product/ddos_fang.png'),
              desc: ['涉及资金交易，安全稳定性要求高。如遇到DDoS攻击导致业务不可用，交易失败，直接造成经济损失']
            },
            {
              title: '游戏',
//              activeIcon: require('../../../assets/img/product/ddos-stage-2-blue.png'),
              icon: 'icon-youxi',
              img: require('../../../assets/img/product/ddos_fang.png'),
              desc: ['频繁遭受黑客勒索，竞争对手恶意DDoS攻击，营收损失极大被攻击时往往会遇到DDoS攻击导致带宽堵塞，或因流量过大被云主机厂商强制黑洞；登录、游戏端口被CC攻击，导致服务器连接数暴涨，服务不可用；']
            },
            {
              title: '其他',
//              activeIcon: require('../../../assets/img/product/ddos-stage-3-icon-blue.png'),
              icon: 'icon-dianshangwangzhanlan',
              img: require('../../../assets/img/product/ddos_fang.png'),
              desc: ['企业门户网站遭受DDoS攻击无法访问，损害企业声誉；新业务上线，容易被竞争对手盯上，针对性打压。']
            }
          ],
          pImg: [
            {img: 'icon-danxingyunfuwuqiECS', isc: 'DDoS高防主机'},
            {img: 'icon-vpn', isc: 'DDoS高防IP'},
            {img: 'icon-yuming', isc: '域名'}
          ],
          selectIndex: 0
        },
        recommendations: [
          {
            img: 'icon-danxingyunfuwuqiECS',
            title: '云服务器',
            desc: '云主机是一种可以根据需求随时改变处理能力并且按照实际使用量来计费的计算服务。',
            path: '/ecs/'
          },
          {
            img: 'icon-xunisiyouyunVPC',
            title: '虚拟私有云VPC',
            desc: 'VPC（Virtual Private Cloud）是一个用户定义的虚拟网络，云主机可以放置在其中...',
            path: '/vpc/'
          },
          {
            img: 'icon-fuzaijunheng2',
            title: '负载均衡',
            desc: '负载均衡处理器可以通过监听负载均衡实例上的四层和七层请求，并将这些请求分发到后端服务器...',
            path: '/loadbalancing/'
          },
          {
            img: 'icon-duankouzhuanfa',
            title: 'NAT网关',
            desc: '添加端口转发规则，允许来自公网或其他VPC对您的私有网络服务进行访问。',
            path: '/natgateway/'
          }
        ]
      }
    }
  }
</script>
<style lang="less" rel="stylesheet/less" scoped>

</style>
