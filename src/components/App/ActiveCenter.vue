<template>
  <div class="active-center">
    <h1 id="hide-h1">活动中心</h1>
    <div class="banner">
      <my-carousel :interval="5000" class="carousel" @on-change="change">
        <!-- <my-carousel-item class="carousel-item">
          <div @click="push('/anniversary/')" style="cursor: pointer;">
            <div class="aa">
              <div class="wrap">
                <div class="text">
                  <img
                    src="../../assets/img/active/anniversary/anniversary-banner-title.png"
                    alt="2周年庆典"
                  />
                  <img
                    src="../../assets/img/active/anniversary/anniversary-banner-text.png"
                    alt="企业上云突破5万，回馈老用户"
                    style="display:block"
                  />
                  <Button>点击查看</Button>
                </div>
              </div>
            </div>
          </div>
        </my-carousel-item> -->
        <my-carousel-item class="carousel-item">
          <div @click="push('/ddosactive/')" style="cursor: pointer;">
            <div class="ddos">
              <div class="wrap">
                <div class="text">
                  <img src="../../assets/img/active/ddos/ddos-banner-text2.png" />
                  <p>数量有限 先到先得</p>
                  <Button>点击查看</Button>
                </div>
                <div class="img">
                  <img
                    src="../../assets/img/active/ddos/ddos-ac-banner.png"
                    style="height:360px;margin-top:40px;"
                  />
                </div>
              </div>
            </div>
          </div>
        </my-carousel-item>
        <my-carousel-item class="carousel-item">
          <div @click="push('/free/')" style="cursor: pointer;background: #F56B23;">
            <div class="free-receive">
              <div class="wrap">
                <div class="text">
                  <p>爆款云服务器免费用一年</p>
                  <p>保证金随时可退</p>
                </div>
                <div class="img">
                  <img src="../../assets/img/active/freeToReceive/fr-banner22.png" />
                </div>
              </div>
            </div>
          </div>
        </my-carousel-item>
        <my-carousel-item class="carousel-item">
          <div @click="push('/objectstorage/')" style="cursor: pointer;">
            <div class="obj-storage">
              <div class="wrap">
                <div>
                  <p>对象存储OSS重磅上线</p>
                  <p>安全稳定、海量、便捷、低延迟、低成本的云端存储服务</p>
                  <p>
                    免费领取
                    <span>50G</span>存储包
                  </p>
                  <Button>立即领取</Button>
                </div>
              </div>
            </div>
          </div>
        </my-carousel-item>
      </my-carousel>
    </div>
    <div class="center-active box-g">
      <div class="wrap">
        <div class="content">
          <div class="sec-headline-g">
            <p>新手上云</p>
            <span>NOVICE TO CLOUD</span>
          </div>
          <div class="box-wrap">
            <router-link
              v-for="(item,index) in allActive"
              :key="index"
              :class="{'box':true}"
              :to="'/'+item.newurl+'/'"
              :style="{background:'url('+item.imgCenter+')',backgroundRepeat:'no-repeat'}"
            >
              <div class="box-head" :style="{color:item.namecolor}">
                <div v-if="item.name">
                  <p>{{item.name}}</p>
                  <p :style="{color:item.colortwo}">{{item.actdesc}}</p>
                </div>
              </div>
              <div class="box-bottom">
                <div>
                  <p>{{item.des}}</p>
                  <p style="line-height:1.2">活动对象：{{item.activeObj}}</p>
                </div>
                <button v-if="item.isStart">立即参与 →</button>
                <button v-else>敬请期待</button>
              </div>
            </router-link>
          </div>
          <div class="sec-headline-g">
            <p>特惠促销</p>
            <span>PREFERENTIAL PROMOTION</span>
          </div>
          <div class="box-wrap">
            <router-link
              v-for="(item,index) in onsaleData"
              :key="index"
              class="box"
              :to="item.url"
              :style="{background:'url('+item.imgPath+')',backgroundRepeat:'no-repeat'}"
            >
              <div class="box-head">
                <p>{{item.name}}</p>
                <p v-html="item.desc"></p>
              </div>
              <div class="box-bottom">
                <div>
                  <p>活动时间：{{item.time}}</p>
                  <p>活动对象：{{item.activeObj}}</p>
                </div>
                <button>立即参与 →</button>
              </div>
            </router-link>
            <div class="comingstart">更多优惠活动即将开启</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import axios from '@/util/axiosInterceptor'
export default {
  // beforeRouteEnter (to, from, next) {
  //   axios.get('activity/getActivitys.do').then(response => {
  //     next(vm => {
  //       vm.setData(response)
  //     })
  //   })
  // },
  metaInfo: {
    title: '云服务器低价优惠活动 - 特价云服务器体验 - 活动中心 - 新睿云',
    meta: [{
      name: 'keywords',
      content: '云服务器活动,云服务器活动,低价云服务器,云服务器体验,云服务器优惠,特价云服务器'
    },
    {
      name: 'description',
      content: '新睿云活动中心汇聚了云服务器,云数据库,对象存储等产品,推出新春采购季、免费云服务器、打折促销,分享赚时长等多种优惠活动！'
    }]
  },
  data () {
    return {
      active: [],
      allActive: [],
      activedata: [
        {
          imgPath: require('../../assets/img/active/ddos/ddos-ac.png'),
          name: '高防云服务器限时秒杀',
          desc: '更有首月8折等超多优惠',
          time: '2019.7.25-2019.9.25',
          activeObj: '新老用户皆可参与',
          url: '/ddosactive/',
          isStart: true,
          weight: '1',
          color: 'rgba(252,202,138,1)',
          colortwo: '#FFEDD2'
        },
        {
          imgPath: require('../../assets/img/activecenter/bg-card-2.png'),
          name: '免费云服务器 不限量领取',
          desc: '保证金闪退',
          time: '2019.06.26开始',
          activeObj: '云服务器 新注册用户',
          url: '/free/',
          isStart: true,
          weight: '1'
        },
        {
          imgPath: require('../../assets/img/activecenter/bg-card-3.png'),
          name: '对象存储 重磅上线',
          desc: '安全稳定高效的云端存储服务 免费试用50G',
          time: ' 2018年8月1日',
          activeObj: '对象存储 新老用户',
          url: '/objectstorage/',
          isStart: true,
          weight: '1',
          color: 'black'
        },
        {
          imgPath: require('../../assets/img/activecenter/bg-card-4.png'),
          name: '热门云数据库产品免费试用60天',
          desc: '秒级创建 一键恢复 安全可靠',
          time: '2018.10.19开始',
          // time: '即将上线',
          activeObj: '云数据库 新老用户',
          url: '/hotdatabase/',
          isStart: true,
          weight: '1',
          color: 'black'
        },
      ]
    }
  },
  methods: {
    push (url) {
      this.$router.push(url)
    },
    setData (response) {
      this.activedata = response.data.result
    },
    change (activeIndex) {
      this.activeBanner = activeIndex + 1
    }
  },
  computed: {
    activeData () {
      var arry = this.activedata.filter(item => {
        return item.weight == '1'
      })
      return arry
    },
    // 特惠促销列表
    onsaleData () {
      var arry = this.activedata.filter(item => {
        return item.weight == '2'
      })
      return arry
    }
  },
  created () {
    axios.get('/activity/getActivitys.do', {
      params: {
        isStart: 2
      }
    }).then(res => {
      if (res.status === 200 && res.data.status === 1) {
        this.allActive = res.data.result
      }
    })
  },
  watch: {},
  components: {}
}
</script>

<style rel="stylesheet/less" lang="less">
.active-center {
  font-family: PingFangSC-Medium;
  // 头部轮播图样式
  .banner {
    height: 400px;
    .carousel {
      .carousel-item {
        > div {
          background-size: cover;
        }
        .xf {
          height: 100%;
          background: url("../../assets/img/active/active_xf_bg.png") no-repeat
            center;
        }
        // .anniversary-active {
        //   height: 400px;
        //   cursor: pointer;
        //   background: #FEEDE0 url("../../assets/img/active/anniversary/aa-banner22.png") center no-repeat;
        // }
        .aa {
          height: 400px;
          background: url("../../assets/img/active/anniversary/anniversary-banner.png") center no-repeat;
          .wrap {
            width: 1200px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            .text {
              margin-top: 148px;
              p {
                font-size: 24px;
                color: #ffedd2;
                line-height: 31px;
              }
              img {
                margin: 0 0 20px 0;
              }
              button {
                margin-top: 30px;
                width: 124px;
                height: 32px;
                background: linear-gradient(
                  90deg,
                  rgba(249, 239, 184, 1) 0%,
                  rgba(227, 183, 111, 1) 100%
                );
                border-radius: 2px;
                border: none;
                &:hover {
                  color: #000;
                }
              }
            }
          }
        }
        .ddos {
          height: 400px;
          background: #2a2936;
          .wrap {
            width: 1200px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            .text {
              margin-top: 148px;
              p {
                font-size: 24px;
                color: #ffedd2;
                line-height: 31px;
              }
              img {
                margin: 0 0 20px 0;
              }
              button {
                margin-top: 30px;
                width: 124px;
                height: 32px;
                background: linear-gradient(
                  90deg,
                  rgba(249, 239, 184, 1) 0%,
                  rgba(227, 183, 111, 1) 100%
                );
                border-radius: 2px;
                border: none;
                &:hover {
                  color: #000;
                }
              }
            }
          }
        }
        .free-receive {
          height: 400px;
          background: linear-gradient(90deg, #ffe3d0, #ffffff),
            url("../../assets/img/active/freeToReceive/fr-banner21.png") center
              no-repeat;
          .wrap {
            width: 1200px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            .text {
              > p {
                font-size: 50px;
                font-family: "Microsoft YaHei", "微软雅黑";
                font-weight: 600;
                color: rgba(51, 51, 51, 1);
              }
              p:nth-child(1) {
                margin-top: 140px;
                font-size: 48px;
                font-weight: 400;
              }
              p:nth-child(2) {
                font-size: 24px;
                margin-top: 25px;
                font-weight: normal;
              }
            }
            .img {
              padding-top: 30px;
            }
          }
        }
        .obj-storage {
          background: linear-gradient(
            90deg,
            rgba(255, 227, 208, 1),
            rgba(255, 255, 255, 1)
          );
          height: 400px;
          position: relative;
          .wrap {
            position: relative;
            width: 1920px;
            margin: 0 auto;
            &:after {
              content: url("./../../assets/img/home/banner-objStorage.png");
              position: absolute;
              top: 0;
              right: 0;
            }
            > div {
              width: 1200px;
              margin: 0 auto;
              padding-top: 70px;
              button {
                background: none;
                outline: none;
                cursor: pointer;
                padding: 11px 50px;
                margin-top: 30px;
                border-radius: 4px;
                border: 1px solid rgba(51, 51, 51, 1);
                font-size: 16px;
                font-family: "Microsoft YaHei", "微软雅黑";
                color: rgba(51, 51, 51, 1);
                &:hover {
                  color: rgba(255, 70, 43, 1);
                  border: 1px solid rgba(255, 70, 43, 1);
                }
              }
              p {
                font-size: 18px;
                font-family: "Microsoft YaHei", "微软雅黑";
                color: #333;
                margin-bottom: 20px;
                span {
                  color: #ff624b;
                }
              }
              p:nth-child(1) {
                margin-bottom: 40px;
                font-size: 48px;
                font-weight: 600;
              }
              p:nth-child(3) {
                font-weight: 700;
              }
            }
          }
        }
        .head-banner {
          background: linear-gradient(
            90deg,
            rgba(255, 251, 250, 1),
            rgba(255, 248, 246, 1)
          );
          position: relative;
          > div {
            width: 1200px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            padding-bottom: 65px;
            div {
              padding-top: 60px;
              button {
                width: 176px;
                height: 54px;
                background: rgba(255, 96, 40, 1);
                font-size: 24px;
                color: #ffffff;
                line-height: 24px;
                margin-top: 50px;
                outline: none;
                border: none;
                cursor: pointer;
                &:hover {
                  background: rgba(255, 57, 54, 1);
                }
              }
            }
            > img {
              margin-top: 10px;
            }
          }
        }
      }
    }
  }
}

.sec-headline-g {
  margin: 0 auto;
  text-align: center;
  margin-bottom: 30px;
  position: relative;
  &::before {
    content: "";
    display: block;
    position: absolute;
    top: 12px;
    left: 42%;
    width: 50px;
    height: 50px;
    background: rgba(254, 171, 124, 1);
    opacity: 0.1531;
    border-radius: 50%;
  }
  &::after {
    content: "";
    display: block;
    position: absolute;
    top: 4px;
    left: 54.2%;
    width: 19px;
    height: 19px;
    background: rgba(242, 67, 35, 1);
    opacity: 0.243;
    border-radius: 50%;
  }
  p {
    margin-bottom: 10px;
    font-size: 24px;
    color: rgba(255, 98, 75, 1);
    line-height: 24px;
  }
  span {
    font-size: 18px;
    color: rgba(153, 153, 153, 1);
    line-height: 18px;
  }
}

.wrap {
  width: 1200px;
  margin: 0 auto;
}

// center和bottom公共样式
.box-g {
  .content {
    padding: 60px 0;
    .box-wrap {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      margin-bottom: 20px;
      .box {
        height: 280px;
        width: 590px;
        margin-bottom: 20px;
        cursor: pointer;
        background-repeat: no-repeat;
        transition: all 0.5s ease-out;
        .box-head {
          height: 162px;
          padding: 40px;
          color: #fff;
          font-size: 18px;
          p {
            line-height: 26px;
          }
          p:nth-of-type(1) {
            font-size: 24px;
            margin-bottom: 20px;
            line-height: 1;
          }
        }
        .box-bottom {
          margin: 20px 40px;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          div {
            color: #000;
            font-size: 18px;
            p:nth-of-type(1) {
              margin-bottom: 20px;
            }
          }
          button {
            width: 150px;
            height: 38px;
            background: rgba(255, 98, 75, 1);
            border-radius: 4px;
            border: none;
            color: #fff;
            outline: none;
            font-size: 14px;
            font-family: PingFangSC-Medium;
          }
        }
      }
    }
  }
}

.center-active {
  // background: url("../../assets/img/activecenter/bg-center.png") no-repeat center;
  background: linear-gradient(0deg, #fee5d8 0%, #fffefe 100%);
  background-size: cover;
  .box {
    &:hover {
      box-shadow: 0 10px 10px -4px rgba(204, 204, 204, 0.38);
      transform: translateY(-4px);
    }
  }
}

.comingstart {
  width: 590px;
  height: 279px;
  background: rgba(254, 251, 249, 1);
  border-radius: 4px;
  border: 1px solid rgba(242, 204, 179, 1);
  font-size: 24px;
  color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
}
.ss-active {
  background: url(../../assets/img/active/schoolSeason/schoolseason_banner_bg.png)
    center no-repeat;
  color: rgba(51, 51, 51, 1);
  .container {
    height: 400px;
    .left {
      h2 {
        font-size: 48px;
        line-height: 64px;
        font-weight: normal;
      }
      p {
        margin-top: 20px;
        font-size: 24px;
        font-weight: 500;
        i {
          color: #ff624b;
          font-style: normal;
        }
      }
      span {
        margin-top: 40px;
        display: inline-block;
        width: 164px;
        height: 44px;
        border-radius: 4px;
        border: 1px solid rgba(51, 51, 51, 1);
        font-size: 16px;
        line-height: 42px;
        text-align: center;
        cursor: pointer;
        transition: all 0.5s;
        &:hover {
          border-color: #ff624b;
          color: #ff624b;
        }
      }
    }
  }
}
.xian-active {
  background: url(../../assets/img/active/xianNode/xian-banner-bg.png) center
      no-repeat,
    linear-gradient(to bottom, #ffdcbc, #ffe7d2);
  .container {
    height: 400px;
    .left {
      p {
        margin-top: 20px;
        font-size: 20px;
        color: #222222;
        font-weight: 500;
        i {
          font-size: 24px;
          color: #ff3000;
          font-style: normal;
        }
      }
      span {
        margin-top: 52px;
        display: inline-block;
        width: 170px;
        height: 50px;
        font-size: 22px;
        color: rgba(255, 48, 0, 1);
        line-height: 44px;
        text-align: center;
        cursor: pointer;
        border: 2px solid rgba(255, 48, 0, 1);
        &:hover {
          background: #ffd1b2;
        }
      }
    }
  }
}
</style>
