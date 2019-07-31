<template>
  <div class="product">
    <h1 id="hide-h1">DDoS高防IP</h1>
    <!-- logo -->
    <div class="logo">
      <div class="logo-wrapper">
        <img :src="logo.img" alt="描述">
        <div class="info">
          <h3 >{{logo.title}}</h3>
          <span class="desc">{{logo.desc}}</span>
          <router-link :to="logo.linkRouter">立即购买</router-link>
        </div>
      </div>
    </div>
    <!-- 功能描述 -->
    <div class="features">
      <div class="features-wrapper">
        <p class="subTitle">功能描述</p>
        <div class="features-flex">
          <div v-for="(feature,index) in features" class="flex-item">
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
            <div  v-for="(stage,index) in stageInfo.stages"
                 :class="{active:index == stageInfo.selectIndex}"
                 @click="stageInfo.selectIndex=index">
              <div>
                <i class="iconfont" :class="stage.icon" style="font-size:40px;color:#2A99F2;" v-show="index != stageInfo.selectIndex"></i>
                <i class="iconfont" :class="stage.icon" style="font-size:40px;color:#fff;" v-show="index == stageInfo.selectIndex"></i>
                <p style="margin-top: 10px;">{{stage.title}}</p>
              </div>
            </div>
          </div>
          <div class="right">
            <div v-for="(stage,index) in stageInfo.stages" v-show="index == stageInfo.selectIndex">
              <img :src="stage.img" alt="描述">
              <div style="padding:20px;">
                <span>场景描述</span>
                <p v-for="(p,i) in stage.desc">
                  {{p}}
                </p>

                <span style="margin-top:40px;">配合使用</span>
                <div style="display: flex">
                  <div v-for="pimg in stageInfo.pImg" style="margin-right: 10px;">
                    <div style="width: 100px;height: 90px;background-color: #ffffff;text-align: center;padding:24px 0">
                      <i class="iconfont" :class="pimg.img" style="font-size:40px;color:#2A99F2;"></i>
                      <span style="font-size: 14px; color:#666666;margin-top:11px;">{{pimg.isc}}</span>
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
    <div class="advantage">
      <div class="wrapper">
        <p class="subTitle">产品优势</p>
        <div class="advantage-flex">
          <div v-for="(advantage,index) in advantages" class="flex-item">
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
          <div v-for="(recommendation,index) in recommendations" class="flex-item">
            <div class="icon-wrap">
              <i class="iconfont" :class="recommendation.img" style="font-size:40px;color:#fff;display:inline-block;"></i>
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
          title: 'DDOS高防IP',
          desc: 'DDoS云清洗是新睿云针对易遭受大流量DDoS攻击的用户推出的付费服务，依托于庞大的节点、带宽资源，高达10T的云防护容量，全方位防护各类DDoS和CC攻击，保证您的业务稳定在线。',
          linkRouter: $store.state.userInfo ? '/ddosipback' : '/login'
        },
        features: [
          {img: 'icon-DDOSliuliangqingxi', title: 'DDOS攻击防护', desc: '防护多种类型的DDoS攻击包括但不限于SYN Flood、ACK Flood 、ICMP Flood、UDP Flood、TCP Flood、CC等攻击，并提供黑白名单等精准防御机制。'},
          {img: 'icon-jiyuyingyongcengdejichufanghu', title: '源站隐藏', desc: '不再直接暴露在攻击者面前开启IP高防服务后，将自动隐藏源站，使您的源站IP将不再暴露。解析您的网站返回的将是高防的防护节点IP，从而使攻击者无法直接对您的源站服务器发起攻击。'},
          {img: 'icon-jiyuwangluochuanshudegongjifanghu', title: '精准防护报表', desc: '提供精准的防护报表，帮您及时了解攻击情况，提供实时精准的防护相关报表及日志详情，使您及时、准确了解IP高防的防护效果。 '},
          {img: 'icon-linghuoguanli', title: '弹性防护', desc: '弹性防护，灵活计费。开启弹性防护后，当您受到的攻击超过购买套餐的峰值时，您的业务仍可继续得到新睿云的防护。使用弹性防护功能，您无需再担心因为攻击超过套餐峰值导致服务中断的问题。 '}
        ],
        advantages: [
          {
            img: 'icon-gaoxingnengyingjian',
            title: '超大清洗容量',
            desc: '单点800G，全网10T+防御带宽，超大流量攻击时智能调度全网节点，化攻击于无形。'
          },
         {
           img: 'icon-lingbushuchengben',
           title: '高性价比',
           desc: '按需购买保底带宽，弹性防护，超保底的大流量攻击按天付费，既保证成本可控，又无需担心攻击过大导致服务中断。'
         },
          {
            img: 'icon-xiangyingxunsu',
            title: '业务友好化',
            desc: 'HTTP/TCP/UDP全协议支持，适用于游戏、金融、电商等各类网站或非网站业务。基于CDN的云高防平台，用户就近访问，可定制缓存，节约源站带宽成本'
          },
          {
            img: 'icon-hailiangqingxinengli',
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
//              activeIcon: require('../../../assets/img/product/ddos-stage-2-blue.png'),
              icon: 'icon-dianshangwangzhan',
              img: require('../../../assets/img/product/ddos_fang.png'),
              desc: ['涉及资金交易，安全稳定性要求高。如遇到DDoS攻击导致业务不可用，交易失败，直接造成经济损失']
            },
            {
              title: '游戏',
//              activeIcon: require('../../../assets/img/product/ddos-stage-3-icon-blue.png'),
              icon: 'icon-youxi',
              img: require('../../../assets/img/product/ddos_fang.png'),
              desc: ['频繁遭受黑客勒索，竞争对手恶意DDoS攻击，营收损失极大被攻击时往往会遇到DDoS攻击导致带宽堵塞，或因流量过大被云主机厂商强制黑洞；登录、游戏端口被CC攻击，导致服务器连接数暴涨，服务不可用；']
            },
            {
              title: '其他',
//              activeIcon: require('../../../assets/img/product/ddos-stage-3-icon-blue.png'),
              icon: 'icon-youxi',
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
            img: 'icon-NATwangguan',
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
