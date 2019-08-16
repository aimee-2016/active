<template>
  <div id="obj">
    <div class="banner">
      <div>
        <h1>对象存储OSS重磅上线</h1>
        <p>安全稳定、海量、便捷、低延迟、低成本的云端存储服务</p>
        <span>免费领取 <span>50G</span> 存储包</span>
      </div>
      <img src="../../../assets/img/active/objstorage-active-m/obj-banner.png">
    </div>

    <div class="tab">
      <h1>什么是对象存储？</h1>
      <img src="../../../assets/img/active/objstorage-active-m/obj-tab.png">
      <p>新睿云对象存储OSS聚焦海量、安全、低成本、高可靠的云存储服务，提供99.999999999%的数据可靠性。使用RESTful API
        可以在互联网任何位置随时随地存储和访问，与国际标准协议完全兼容最大程度降低用户接入门槛。容量和处理能力弹性扩展，按需付费，无需设施投入和运维，有效降低用户成本，帮助您专注于核心业务。</p>
    </div>

    <div class="active-pro">
      <h1>
        <img src="../../../assets/img/active/objstorage-active-m/obj-lr.png">
        活动产品
        <img src="../../../assets/img/active/objstorage-active-m/obj-lr.png">
      </h1>
      <p class="desc">只需在控制台通过简单的几步操作，即可轻松快速地创建自己的对象存储私人空间，随时随地获取所需文件和数据。</p>
      <div class="product" v-show="!getFulx">
        <h1>开始使用新睿云对象存储</h1>
        <span>北京一区</span>
        <p><span class="numG">{{fulxSize}}G</span>存储包规格</p>
        <button  v-if="isReceive" @click="freeReceive()">免费领取</button>
        <button style="background:rgba(255,156,149,1);" v-else>领取成功</button>
        <p class="onlyOne">新老用户均可领取，每人只可领取一次</p>
      </div>
      <div v-show="getFulx" class="product">
        <h1>开始使用新睿云对象存储</h1>
        <p>{{fulxMessage}}</p>
        <i style="display: block;font-size: .28rem;color: rgba(255,57,42,1);line-height: .28rem;padding: 0 .2rem">
          注意：使用对象存储需要您先创建AccessKey，领取完成之后请前往个人中心-AccessKey管理-创建AccessKey完成密钥创建。</i>
        <button @click="createdKey" v-if="!isAccessKey" class="creatBtn">立即创建</button>
        <button v-else class="creatBtn">领取成功</button>
        <p style="height: .4rem;"></p>
      </div>
    </div>

    <div class="advantage">
      <h1>
        <img src="../../../assets/img/active/objstorage-active-m/obj-lr.png">
        产品优势
        <img src="../../../assets/img/active/objstorage-active-m/obj-lr.png">
      </h1>
      <ul>
        <li v-for="(item,index) in advantage" :key="index">
          <img :src="item.img" alt="123">
          <h2>{{item.title}}</h2>
          <p>{{item.dec}}</p>
        </li>
      </ul>
    </div>

    <div class="apply">
      <h1>
        <img src="../../../assets/img/active/objstorage-active-m/obj-lr.png">
        应用场景
        <img src="../../../assets/img/active/objstorage-active-m/obj-lr.png">
      </h1>
      <tab :line-width="2" active-color="#FF624B" style="margin-top: .3rem">
        <tab-item selected @on-item-click="stageInfo.showBf=true,stageInfo.showFz=false,stageInfo.showFf=false">
          <h6 class="tab-item">数据加速分发</h6>
        </tab-item>
        <tab-item @on-item-click="stageInfo.showBf=false,stageInfo.showFz=true,stageInfo.showFf=false">
          <h6 class="tab-item">跨区域复制容灾</h6>
        </tab-item>
        <tab-item @on-item-click="stageInfo.showBf=false,stageInfo.showFz=false,stageInfo.showFf=true">
          <h6 class="tab-item">海量数据归档</h6>
        </tab-item>
      </tab>
      <div class="describe" v-if="stageInfo.showBf">
        <img src="../../../assets/img/active/objstorage-active-m/obj-bl.png">
        <ul>
          <li>{{stageInfo.Bf.content}}</li>
        </ul>
        <img src="../../../assets/img/active/objstorage-active-m/obj-bl.png">
      </div>
      <div class="describe" v-if="stageInfo.showFz">
        <img src="../../../assets/img/active/objstorage-active-m/obj-bl.png">
        <ul>
          <li>{{stageInfo.Fz.content}}</li>
        </ul>
        <img src="../../../assets/img/active/objstorage-active-m/obj-bl.png">
      </div>
      <div class="describe" v-if="stageInfo.showFf">
        <img src="../../../assets/img/active/objstorage-active-m/obj-bl.png">
        <ul>
          <li>{{stageInfo.Ff.content}}</li>
        </ul>
        <img src="../../../assets/img/active/objstorage-active-m/obj-bl.png">
      </div>
    </div>

    <!--未实名认证弹窗-->
    <div v-transfer-dom>
      <confirm v-model="approve"
               title="提示"
               @on-confirm="$router.push('certification')">
        <p style="font-size: .28rem;color: #666;">您好，你还未进行实名认证，请先实名认证即可参加此活动。
          <router-link to="certification" style="color:#FF624B ">立即认证</router-link>
        </p>
      </confirm>
    </div>
  </div>
</template>

<script>
  import {Tab, TabItem, Confirm, TransferDomDirective as TransferDom} from 'vux'
  import axios from 'axios'
  import $store from '@/vuex'
  export default{
    directives: {
      TransferDom
    },
    components: {
      Tab,
      TabItem,
      Confirm
    },
    created () {
      // 获取token
      axios.post('user/getRuiRadosApiacess.do', {
        zoneId: '75218bb2-9bfe-4c87-91d4-0b90e86a8ff2',
        companyId: $store.state.authInfo.companyid
      }).then(response => {
        if (response.status == 200 && response.data.status == 1) {
          var radosApIaccessKey = response.data.data.data
          axios.get('user/getRadosToken.do', {
            params: {
              companyId: $store.state.authInfo.companyid,
              secret: radosApIaccessKey
            }
          }).then(response => {
            if (response.status == 200) {
              this.token = response.data.token
              axios.post('user/getFluxs.do', {token: this.token}).then(response => {
                if (response.status == 200 && response.data.status == 1) {
                  if (response.data.data.fulxList.length != 0) {
                    this.fulxSize = response.data.data.fulxList[0].size
                    // 2领取成功 1未领取成功
                    this.isReceive = response.data.data.fulxList[0].status == '2' ? false : true
                    this.fulxId = response.data.data.fulxList[0].id
                  }
                }
              })
            }
          })
        }
      })
    },
    data(){
      window.scrollTo(0, 0);
      return {
        fulxSize: '50',
        isReceive: true,
        fulxId: '',
        token: '',
        advantage: [
          {
            img: require('../../../assets/img/active/objstorage-active-m/obj-1.png'),
            title: '安全可靠',
            dec: '数据自动冗余备份，智能调度。可实现自动故障恢复，服务可用性不低于99.9%通过密钥鉴权，实现读写权限分离，服务器端加密，VPC网络隔离，支持跨区域复制，异地容灾机制。'
          },
          {
            img: require('../../../assets/img/active/objstorage-active-m/obj-2.png'),
            title: '简单易用',
            dec: '可通过Restful API多版本SDK进行各类操作，如创建、删除存储空间，上传、分享、下载、删除数据文件，以及设置文件，存储空间权限等；随时随地可存储、获取所需数据文件。'
          },
          {
            img: require('../../../assets/img/active/objstorage-active-m/obj-3.png'),
            title: '弹性存储',
            dec: '超高硬件设施，全SSD存储，超高IOPS，提供PB级海量存储空间，用户理论上可以使用无限大小的空间，随时弹性伸缩，无需担心存储空间成为业务爆发性增长的瓶颈。'
          },
        ],
        stageInfo: {
          showBf: true,
          showFz: false,
          showFf: false,
          Bf: {
            content: '面对海量数据上云备份（冷/热备）的场景，新睿云对象存储根据数据的访问频度提供了两种存储方式，针对那些访问频率比较低且对访问速度要求不高的冷数据，可以建议您将数据保存在低频访问型存储中，如此可以在不降低数据耐久性的前提之下，降低存储费用约50%，为您的数据备份提供了一个海量低价的空间。'
          },
          Fz: {
            content: '用户存储数据可以通过的跨区域复制功能实时同步到指定区域，实现数据异地容灾，从容应对极端灾难保证业务流畅，为重要数据加上多重保险。'
          },
          Ff: {
            content: '面对视频点播源，图片资源等热点文件下发的场景，您可以将新睿云的对象存储和CDN服务搭配使用，实现全网覆盖、快速高效的内容分发，使您灵活应对大流量和高并发的业务场景。您可以使用对象存储作为源站，将热点资源放在对象存储，然后通过CDN将资源下发给终端用户。这样以来，既降低了您下发的流量费用，又降低了终端访问的时延。'
          }
        },
        getFulx: false,
        isAccessKey: false,
        fulxMessage: '存储包已领取成功，请前往控制台进行查看！',
        //未认证
        approve: false,
      }
    },
    methods: {
      freeReceive () {
        if (this.$store.state.userInfo == null) {
          return this.$router.push('/ruicloud/login')
        }
        if (!this.$store.state.authInfo) {
          this.approve = true
          return
        }
        axios.post('user/increaseFlux.do', {
          flux_id: this.fulxId,
          zoneId: '75218bb2-9bfe-4c87-91d4-0b90e86a8ff2',
          token: this.token
        }).then(response => {
          if (response.status == 200 && response.data.status == 27 || response.status == 200 && response.data.status == 28) {
            this.getFulx = true
            this.fulxMessage = response.data.msg
            this.isAccessKey = $store.state.accessKey
          } else {
            this.getFulx = false
            this.$vux.toast.text('领取失败', 'middle')
          }
        })
      },
      //立即创建
      createdKey () {
        this.$router.push('/ruicloud/AccessKey')
      },
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  #obj {
    background: #FFF;

    .banner {
      width: 100%;
      background: linear-gradient(90deg, rgba(255, 235, 222, 1) 0%, rgba(255, 255, 255, 1) 100%);
      padding: .6rem 0 .6rem .3rem;
      position: relative;
      h1 {
        font-size: .36rem;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        line-height: .48rem;
      }
      p {
        width: 4.4rem;
        font-size: .24rem;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: .33rem;
        padding: .38rem 0 .3rem 0;
      }
      span {
        display: flex;
        font-size: .24rem;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        line-height: .18rem;
        span {
          display: inline;
          color: #FF624B;
        }
      }
      img {
        position: absolute;
        right: 0;
        bottom: 0;
        display: block;
        width: 4.81rem;
        height: 1.84rem;

      }
    }

    .tab {
      padding-top: 1rem;
      h1 {
        font-size: .48rem;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: .67rem;
        text-align: center;
        margin-bottom: .5rem;
      }
      img {
        width: 3.23rem;
        height: 2.5rem;
        display: block;
        margin: 0 auto;
      }
      p {
        margin-top: .4rem;
        padding: 0 .5rem;
        font-size: .24rem;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: .33rem;
      }
    }

    .active-pro {
      padding-top: 1rem;
      h1 {
        text-align: center;
        font-size: .48rem;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: .67rem;
        img {
          width: .41rem;
          height: .41rem;
          display: inline-block;
          &:first-of-type {
            margin-right: .3rem;
          }
          &:last-of-type {
            margin-left: .3rem;
          }
        }
      }
      .desc {
        text-align: center;
        font-size: .22rem;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: .3rem;
        width: 6.46rem;
        margin: .3rem auto;
      }
      .product {
        text-align: center;
        width: 7rem;
        margin: 0 auto;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 2px 10px 6px rgba(255, 90, 28, 0.22);
        h1 {
          width: 100%;
          font-size: .32rem;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          line-height: .45rem;
          background: url(../../../assets/img/active/objstorage-active-m/obj-mask.png) no-repeat center;
          padding: .26rem 0 .29rem 0;
        }
        span {
          font-size: .24rem;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          line-height: .33rem;
          display: block;
          padding-top: .4rem;
        }
        p {
          padding-bottom: .28rem;
          font-size: .32rem;
          font-weight: 600;
          color: #333;
          line-height: .45rem;
          .numG {
            font-size: .32rem;
            color: #FF0000;
            display: inline-block;
          }
        }
        button {
          background: rgba(255, 57, 42, 1);
          font-size: .32rem;
          font-weight: 500;
          color: rgba(255, 255, 255, 1);
          line-height: .45rem;
          padding: .16rem .81rem .19rem .81rem;
          outline: none;
          border: none;
          display: block;
          margin: 0 auto;
        }
        .creatBtn {
          margin-top: .2rem;
        }
        .onlyOne {
          padding: .41rem 0 .15rem 0;
          font-size: .24rem;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
          line-height: .33rem;
        }
      }
    }

    .advantage {
      padding-top: 1rem;
      h1 {
        text-align: center;
        font-size: .48rem;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: .67rem;
        img {
          width: .41rem;
          height: .41rem;
          display: inline-block;
          &:first-of-type {
            margin-right: .3rem;
          }
          &:last-of-type {
            margin-left: .3rem;
          }
        }

      }
      ul {
        li {
          list-style: none;
          padding-top: .53rem;
          img {
            width: .68rem;
            height: .68rem;
            display: block;
            margin: 0 auto;
          }
          h2 {
            text-align: center;
            font-size: .32rem;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
            line-height: .45rem;
            padding: .2rem 0;
          }
          p {
            font-size: .24rem;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
            line-height: .33rem;
            padding-bottom: .5rem;
            width: 6.5rem;
            margin: 0 auto;

          }
        }
      }
    }

    .apply {
      h1 {
        text-align: center;
        font-size: .48rem;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: .67rem;
        img {
          width: .41rem;
          height: .41rem;
          display: inline-block;
          &:first-of-type {
            margin-right: .3rem;
          }
          &:last-of-type {
            margin-left: .3rem;
          }
        }

      }
      .describe {
        width: 5.02rem;
        margin: 0 auto;
        padding: .73rem 0 1.03rem 0;
        position: relative;
        ul {
          li {
            list-style: none;
            font-size: .24rem;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
            line-height: .33rem;
          }
        }
        img {
          width: .54rem;
          height: .46rem;
          display: block;
          position: absolute;
          &:first-of-type {
            top: .5rem;
            left: -.8rem;
          }
          &:last-of-type {
            bottom: .8rem;
            right: -.8rem;
          }
        }
      }
    }
  }
</style>
