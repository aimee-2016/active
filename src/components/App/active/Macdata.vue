<template>
  <div style="background: #FFF;  line-height: 0;">
    <div class="banner">
      <div class="banner-img"></div>
      <div class="bannercon">
        <p class="bancon1">秒级创建 &nbsp;运维便捷 &nbsp;安全可靠</p>
        <h2 class="bancon2">热门云数据库产品免费试用60天</h2>
        <p class="bancon3">0元试用 &nbsp;押金闪退 <span>&nbsp;每天不限量</span></p>
      </div>
    </div>
    <div class="top">
      <h1>明星产品 <span>交押金免费用60天</span></h1>
      <p>实例创建完成后请前往控制台使用，试用期结束可正常续订</p>
    </div>
    <ul class="list">
      <li class="list-item" v-for="(item, index) in products">
        <div class="listimg-st" :class="{sc: index%2!=0}">
          <h6>{{ item.title }}</h6>
          <p>{{ item.desc }}</p>
        </div>
        <div class="listinfo">
          <div class="iteminfo">
            <div>GPU <span>{{item.config.gpu}}核</span></div>
            <div>内存 <span>{{item.config.memory}}G</span></div>
            <div>系统盘 <span>{{item.config.systemDisk}}G</span></div>
            <div>数据盘 <span>{{item.config.wsx}}G</span></div>
          </div>
          <div class="data-cen" :v-model="'district'+index">
            <group>
              <popup-picker title="数据中心" @on-change="getOriginalPrice(index)" :data="areaList" :columns="1"
                            v-model="district" show-name>
              </popup-picker>
            </group>
          </div>
          <div class="data-bot">
            <h4>押金：<span>&yen;{{item.config.currentPrice}}</span></h4>
            <p>原价：￥{{item.config.originalPrice}}</p>
            <button class="freebtn" @click="purchase(index,item)">免费领取</button>
          </div>
        </div>
      </li>
    </ul>
    <div class="product">
      产品优势
    </div>
    <ul class="pro-box">
      <li class="pro-item" v-for="(item, index) in advantages">
        <div class="pro-img"><img :src="item.src" alt=""></div>
        <h6>{{ item.title }}</h6>
        <p>{{ item.desc }}</p>
      </li>
    </ul>
    <div class="product">
      引用场景
    </div>
    <ul class="apply">
      <li v-for="(item, index) in scenarios">
        <h5>{{ item.title }}</h5>
        <p>{{ item.desc }}</p>
      </li>
    </ul>
    <div class="activity">
      <div class="act-tit">活动规则</div>
      <p class="pst1"><span>1.</span>活动时间：2018年8月9日-2018年9月20日</p>
      <p><span>2.</span>活动对象：已完成新睿云实名认证的注册用户均可参与活动</p>
      <p><span>3.</span>领取说明：1元试用套餐只限未体验过新睿云云数据库的用户，每个用户只能参与一次，同一手机号对应的多个账号、同一实名认证用户等满足同一条件的均视为一个用户。</p>
      <p><span>4.</span>试用产品使用规则： 1） 试用产品中的资源可随时进行升级，升级费用按新睿云规则进行收取 2） 在各产品试用期间，若对免费资源进行了销毁，则视为放弃免费使用权。
        3）本活动支付时不可选用任何优惠券和现金券，一旦支付成功不予退费。</p>
      <p><span>5.</span>为保证活动的公平公正，新睿云有权对恶意刷抢（如通过程序等技术手段）活动资源，领取后7天内未使用资源、利用资源从事违法违规行为的用户收回免费套餐使用资格。因此造成任何损失的，由该用户自行负责。
      </p>
      <p class="last1"><span>6.</span>活动最终解释权在法律范围内归新睿云所有</p>
    </div>

    <!--活动结束弹窗-->
    <div v-transfer-dom>
      <confirm v-model="endActivity" show-cancel-button="false" confirm-text="确认"
               @on-confirm="endActivity=false">
        <div style="text-align:center;">
          <button class="cancel" @click="closeEnd()">x</button>
          <div class="calimg3"></div>
          <p class="alert-info">{{ alertInfo3 }}</p>
        </div>
      </confirm>
    </div>

  </div>
</template>

<script>
  import axios from 'axios'
  import {
    PopupPicker,
    Datetime,
    Group,
    Cell,
    Picker,
    XButton,
    Divider,
    Confirm,
    TransferDomDirective as TransferDom
  } from 'vux'
  export default {
    name: "Acdata",
    directives: {
      TransferDom
    },
    components: {
      PopupPicker, Datetime, Group, Cell, Picker, XButton, Divider, Confirm,
    },
    beforeRouteEnter(to, from, next){
      axios.post('activity/getTemActInfo.do', {activityName: '云数据库正式发布 1元试用60天'}).then(response => {
        next(vm => {
          if (response.status == 200 && response.data.status == 1) {
            vm.areaList = response.data.result.optionalArea
            vm.district = [response.data.result.optionalArea[0].value]
          }
        })
      })
    },
    data () {
      window.scrollTo(0, 0);
      return {
        products: [
          {
            title: 'Mysql 单实例',
            desc: '架构成熟稳定，支持各种WEB应用，成本低廉',
            config: {
              gpu: '4',
              memory: '8',
              systemDisk: '40',
              wsx: '100',
              zoneId: '',
              currentPrice: '159',
              originalPrice: '937.04'
            }
          },
          {
            title: 'Redis分布式缓存服务',
            desc: '提供高速数据读写，同时能够满足数据持久化',
            config: {
              gpu: '4',
              memory: '8',
              systemDisk: '40',
              wsx: '100',
              zoneId: '',
              currentPrice: '159',
              originalPrice: '937.04'
            }
          },
          {
            title: 'PostgreSQL 单实例',
            desc: '面向企业复杂SQL处理的OLTP在线事务处理场景',
            config: {
              gpu: '4',
              memory: '8',
              systemDisk: '40',
              wsx: '100',
              zoneId: '',
              currentPrice: '159',
              originalPrice: '937.04'
            }
          },
          {
            title: 'MongoDB 单实例',
            desc: '支持容灾切换，故障迁移自动完成',
            config: {
              gpu: '2',
              memory: '8',
              systemDisk: '40',
              wsx: '100',
              zoneId: '',
              currentPrice: '119',
              originalPrice: '721.04'
            }
          }
        ],
        advantages: [
          {
            src: require('../../../assets/img/active/acdata/pro-1.png'),
            title: '快速部署',
            desc: '选择规格后下单，几分钟内即可创建高可用的云数据库实例。具备完善的监控、告警功能，可立即投入使用，立即创造价值。'
          },
          {
            src: require('../../../assets/img/active/acdata/pro-2.png'),
            title: '高可靠性',
            desc: '拥有完善的数据自动备份机制，每个实例默认每天自动备份一次，同时可根据业务情况手动创建备份，无需担心数据丢失。'
          },
          {
            src: require('../../../assets/img/active/acdata/pro-3.png'),
            title: '弹性扩容',
            desc: '弹性扩容，按需升级，提高资源利用率，降低使用成本；有效满足业务发展对数据库性能的要求。'
          },
          {
            src: require('../../../assets/img/active/acdata/pro-4.png'),
            title: '运维便捷',
            desc: '监控、自动告警功能有效降低用户的数据库运维和服务器网络运维成本，使数据库运维更加便捷、高效，减少人力和设备投入。'
          },
          {
            src: require('../../../assets/img/active/acdata/pro-5.png'),
            title: '超高性能',
            desc: '全SSD本地磁盘存储，支持最大64G 内存、1T 以上磁盘的数据库实例，轻松应对高并发、大规模数据处理需求。'
          }
        ],
        scenarios: [
          {
            title: '新生互联网/移动APP',
            desc: '场景描述：云数据库可作为产品可靠的服务端数据库存储介质，快速便捷的拥有完整的数据库服务，无需购买昂贵的服务器、操作系统和数据库管理系统等软硬件，避免资源闲置浪费。'
          },
          {
            title: '高速发展的企业',
            desc: '场景描述：企业迅速发展过程中，业务量快速增长，需要高性能的数据库服务支持，同时为应对不断增加的业务量，可使用一键创建功能快速扩展数据库，大幅提高查询能力。'
          },
          {
            title: '传统企业及转型中企业',
            desc: '场景描述：被陈旧、繁琐、复杂的上一代数据库系统拖累，急于使用更好、更快、更稳定的新一代数据库服务，同时保留DBA灵活、高级的操作空间，助力企业转型。'
          }
        ],
        district: [],
        //节点选择
        areaList: [
          {name: '北京一区', value: '北京一区'}
        ],
        endActivity: false,
        alertInfo3: '您好，本日活动产品已全部领光， 请明天再来哦！或者联系客服领取。',
      }
    },
    methods: {
      getOriginalPrice(index) {
        let vmConfigId = ''
        switch (index) {
          case 0:
            vmConfigId = '43'
            break
          case 1:
            vmConfigId = '43'
            break
          case 2:
            vmConfigId = '43'
            break
          case 3:
            vmConfigId = '44'
            break
        }
        let url = 'activity/getOriginalPrice.do'
        let params = {
          vmConfigId: vmConfigId,
          month: '2',
          zoneId: this.district[0]
        }
        axios.get(url, {params: params}).then(res => {
          if (res.data.status == 1) {
            this.products[index].config.currentPrice = res.data.result.cost
            this.products[index].config.originalPrice = res.data.result.originalPrice
          }
        })
      },
      purchase(val, item) {
        if (this.$store.state.userInfo == null) {
          return this.$router.push('login')
        }
        let url = 'activity/judgeDatabase.do'
        let vmConfigId = ''
        switch (val) {
          case 0:
            vmConfigId = '43'
            break
          case 1:
            vmConfigId = '43'
            break
          case 2:
            vmConfigId = '43'
            break
          case 3:
            vmConfigId = '44'
            break
        }
        axios.get(url, {
          params: {
            vmConfigId: vmConfigId
          }
        }).then(res => {
          if (res.data.status == 1 && res.data.status == 1) {
            if (res.data.result.flag) {
              // 满足，去支付
              sessionStorage.setItem('nodes', this.district[0])
              sessionStorage.setItem('day', '60天')
              sessionStorage.setItem('cpu', item.config.gpu)
              sessionStorage.setItem('memory', item.config.memory)
              sessionStorage.setItem('price', item.config.currentPrice)
              sessionStorage.setItem('priceOld', item.config.originalPrice)
              sessionStorage.setItem('vmConfigId', vmConfigId)
              sessionStorage.setItem('system', val == '0' ? 'Mysql' : val == '1' ? 'Redis' : val == '2' ? 'PostgreSQL' : 'MongoDB')
              this.$router.push('freeBuy')
            } else {
              // 资源不够、不满足条件
              this.endActivity = true
              this.alertInfo3 = res.data.result.info
            }
          } else {
            this.$vux.toast.text(res.data.message, 'middle')
          }
        })
      },
      closeEnd () {
        this.endActivity = false
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .banner {
    position: relative;
    width: 100%;
    height: 3rem;
    background: linear-gradient(270deg, rgba(255, 235, 222, 1) 0%, rgba(255, 253, 251, 1) 100%);
    .banner-img {
      position: absolute;
      top: 0;
      right: 0;
      z-index: 1;
      width: 3.53rem;
      height: 3rem;
      background: url(../../../assets/img/active/acdata/banner-i.png) no-repeat center top;
      background-size: cover;
    }
    .bannercon {
      padding: .78rem .3rem 0 .3rem;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 3;
      width: 100%;
      height: 3rem;
      .bancon1 {
        font-size: .24rem;
        font-weight: 400;
        line-height: .33rem;
        color: #462121;
      }
      .bancon2 {
        margin-top: .13rem;
        font-size: .32rem;
        font-weight: bold;
        line-height: .45rem;
        color: #462121;
      }
      .bancon3 {
        margin-top: .12rem;
        font-size: .26rem;
        color: #FF462B;
        font-weight: 500;
        line-height: .37rem;
        span {
          color: #462121;
        }
      }
    }
  }

  .top {
    padding: .3rem .3rem .2rem .3rem;
    text-align: center;
    h1 {
      width: 100%;
      font-size: .32rem;
      font-weight: bold;
      color: #333;
      line-height: .5rem;
      span {
        margin-left: .2rem;
        color: #FF624B;
      }
    }
    p {
      padding: .06rem 0 0 0;
      width: 100%;
      font-size: .2rem;
      font-weight: 400;
      color: #666666;
      line-height: .28rem;
    }
  }

  .list {
    padding: 0 .3rem;
    width: 100%;
    height: auto;
    .list-item {
      margin-bottom: .3rem;
      box-sizing: border-box;
      width: 100%;
      height: 3.8rem;
      .listimg-st {
        padding: .18rem .24rem .18rem .24rem;
        overflow: hidden;
        width: 100%;
        height: 1rem;
        background: url(../../../assets/img/active/acdata/listimg-01.png) no-repeat center top;
        background-size: cover;
        h6 {
          margin: 0;
          font-size: .24rem;
          font-weight: bold;
          color: rgba(255, 255, 255, 1);
          line-height: .3rem;
        }
        p {
          margin: 0;
          margin-top: .04rem;
          font-size: .22rem;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          line-height: .3rem;
        }
      }
      .sc {
        background-image: url(../../../assets/img/active/acdata/listimg-02.png) !important;
      }
      .listinfo {
        width: 100%;
        min-height: 2.8rem;
        border-bottom: 1px solid #ccc;
        border-right: 1px solid #ccc;
        border-left: 1px solid #ccc;
        .iteminfo {
          padding: 0 .24rem;
          width: 100%;
          height: .8rem;
          line-height: .8rem;
          overflow: hidden;
          div {
            float: left;
            width: 26%;
            height: .8rem;
            text-align: center;
            font-size: .2rem;
            color: #666666;
            span {
              font-weight: bold;
              font-size: .24rem;
              color: #000;
            }
          }
          & > div:first-child {
            width: 22% !important;
            text-align: left;
          }
          & > div:last-child {
            text-align: right;
          }

        }
      }
      .data-cen {
        padding: 0;
        margin-top: -.17rem !important;
        width: 100%;
        height: .8rem;
        color: #666666;
        font-size: .24rem;
        line-height: .8rem;
        .data-des {
          float: right;
          position: relative;
          padding-right: .3rem;
          color: #333333;
          font-size: .24rem;
          font-weight: 400;
          &:after {
            content: "";
            position: absolute;
            right: 0;
            top: 50%;
            margin-top: -.1rem;
            width: .12rem;
            height: .2rem;
            background: url(../../../assets/img/active/acdata/desc.png) no-repeat center top;
            background-size: cover;
          }
        }
      }
      .data-bot {
        position: relative;
        padding: .21rem .4rem .2rem .3rem;
        width: 100%;
        height: 1.2rem;
        h4 {
          font-style: normal;
          font-weight: normal;
          font-size: .28rem;
          line-height: .4rem;
          color: #000;
          span {
            font-weight: bold;
          }
        }
        p {
          margin: 0;
          color: #666;
          font-size: .28rem;
          text-decoration: line-through;
          line-height: .4rem;
        }
        .freebtn {
          position: absolute;
          right: .4rem;
          top: 50%;
          margin-top: -.4rem;
          width: 2.2rem;
          height: .8rem;
          line-height: .8rem;
          text-align: center;
          font-size: .28rem;
          border: none;
          color: #fff;
          background: rgba(255, 55, 47, 1);
        }
      }
      &:last-child {
        margin-bottom: 0 !important;
      }
    }
  }

  .product {
    padding: .5rem .3rem .2rem .3rem;
    width: 100%;
    height: auto;
    font-size: .32rem;
    font-weight: 500;
    color: #333;
    line-height: .45rem;
    text-align: center;
  }

  .pro-box {
    padding: 0 .3rem;
    width: 100%;
    height: auto;
    overflow: hidden;
    list-style: none;
    .pro-item {
      float: left;
      padding: .3rem .15rem;
      margin-bottom: .1rem;
      list-style: none;
      width: 49%;
      min-height: 4.2rem;
      border-radius: .06rem;
      border: 1px solid #ccc;
      &:nth-child(2n) {
        float: right;
      }
      &:last-child {
        width: 100% !important;
        min-height: 3rem !important;
      }
      .pro-img {
        margin: 0 auto;
        width: .9rem;
        height: .9rem;
        background-repeat: no-repeat;
        background-position: center top;
        background-size: cover;
        img {
          width: .9rem;
          height: .9rem;
        }
      }
      h6 {
        margin-top: .2rem;
        margin-bottom: .1rem;
        font-size: .24rem;
        font-weight: 500;
        text-align: center;
        color: rgba(51, 51, 51, 1);
        line-height: .33rem;
      }
      p {
        font-size: .24rem;
        font-weight: 400;
        text-align: center;
        color: rgba(104, 97, 96, 1);
        line-height: .35rem;
      }
    }
  }

  .apply {
    padding: 0 .3rem;
    width: 100%;
    height: auto;
    list-style: none;
    li {
      position: relative;
      padding: .4rem .15rem .4rem .26rem;
      margin-bottom: .2rem;
      width: 100%;
      min-height: 2.3rem;
      border-radius: .06rem;
      border-top: 1px solid #ccc;
      border-right: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
      &:before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: .06rem;
        height: 100%;
        border-radius: .06rem;
        background: linear-gradient(360deg, rgba(255, 75, 75, 1) 0%, rgba(255, 137, 120, 1) 100%);
      }
      h5 {
        font-size: .28rem;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        line-height: .4rem;
      }
      p {
        margin-top: .1rem;
        font-size: .24rem;
        color: #665f5e;
        line-height: .36rem;
      }
    }
  }

  .activity {
    margin-top: .36rem;
    width: 100%;
    padding: 0 .42rem .5rem .56rem;
    height: auto;
    background: linear-gradient(360deg, rgba(255, 237, 234, 1) 0%, rgba(255, 255, 255, 1) 100%);
    .act-tit {
      width: 100%;
      height: auto;
      font-size: .32rem;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      line-height: .45rem;
      text-align: center;
    }
    p {
      margin: 0;
      margin-bottom: .4rem;
      font-size: .24rem;
      font-weight: 500;
      color: #333333;
      line-height: .34rem;
      span {
        color: #FF624B;
      }
    }
    .pst1 {
      margin-top: .2rem;
    }
    .last1 {
      margin-bottom: 0 !important;
    }
  }

  .cancel {
    position: absolute;
    top: .1rem;
    right: .4rem;
    background: none;
    border: 0;
    font-size: .36rem;
    font-weight: 400;
    color: #999;
    line-height: .5rem;
  }

  .calimg1 {
    margin: 0 auto;
    margin-top: 1.8rem;
    width: .9rem;
    height: .9rem;
    background: url(../../../assets/img/active/acdata/alert1.png) no-repeat center top;
    background-size: cover;
  }

  .alert-info {
    margin-top: .3rem;
    margin-bottom: .4rem;
    width: auto;
    height: auto;
    font-size: .24rem;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    line-height: .33rem;
  }

  .calimg2 {
    margin: 0 auto;
    margin-top: 1.8rem;
    width: .9rem;
    height: .9rem;
    background: url(../../../assets/img/active/acdata/alert2.png) no-repeat center top;
    background-size: cover;
  }

  .calimg3 {
    margin: 0 auto;
    margin-top: 1.8rem;
    width: .86rem;
    height: .72rem;
    background: url(../../../assets/img/active/acdata/alert3.png) no-repeat center top;
    background-size: cover;
  }
</style>
