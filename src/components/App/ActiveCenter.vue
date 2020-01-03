<template>
  <div class="active-center">
    <h1 id="hide-h1">活动中心</h1>
    <div class="banner">
      <my-carousel
        :interval="5000"
        class="carousel"
        :radius-dot="true"
        arrow="never"
        @on-change="change"
      >
        <my-carousel-item class="carousel-item">
          <a :href="$project.i+'signup/'" style="cursor: pointer">
            <div class="hongkong">
              <div class="wrap">
                <div class="text">
                  <p>香港云服务器上线</p>
                  <p>请访问XRCLOUD.com. 注册就送10美元！</p>
                  <Button>创建账户</Button>
                </div>
                <div class="img">
                  <img src="../../assets/img/active/hongkong-banner.png" />
                </div>
              </div>
            </div>
          </a>
        </my-carousel-item>
        <my-carousel-item class="carousel-item">
          <div @click="push('/newyearpurchase/')" style="cursor: pointer;">
            <div class="aa">
              <div class="wrap">
                <div class="text">
                  <img
                    src="../../assets/img/active/anniversary/newanniversary-time.png"
                    alt="2020"
                    style="width:276px"
                  />
                  <!-- <img
                    src="../../assets/img/active/anniversary/anniversary-banner-text.png"
                    alt="企业上云突破5万，回馈老用户"
                    style="width:467px"
                  />-->
                  <!-- <Button>点击查看</Button> -->
                </div>
                <div class="img">
                  <img
                    src="../../assets/img/active/anniversary/newanniversary-banner-nav-icon.png"
                    style="height:400px;width: 450px;"
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
          <div @click="push('/free/#days/')" style="cursor: pointer;">
            <div class="tt-active">
              <div class="wrap">
                <div>
                  <p>天天特惠 天天有惊喜</p>
                  <p>4核8G10M云服务器 首月仅需￥99.9</p>
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
            <p>热门活动</p>
            <span>POPULAR ACTIVITICE</span>
          </div>
          <div class="box-wrap">
            <a
              v-for="(item,index) in allActive"
              class="box"
              :key="index"
              :href="item.path+'/'"
              :class="{hide:item.hidden=='1'}"
            >
              <img :src="item.imgCenter" alt="背景图片" />
              <div class="box-content">
                <div class="box-head" :style="{color: item.namecolor}">
                  <p>{{item.name}}</p>
                  <p>{{item.actdesc}}</p>
                </div>
                <div class="box-bottom">
                  <p>{{item.des}}</p>
                  <button>立即参与</button>
                </div>
              </div>
            </a>
          </div>
          <div class="sec-headline-g">
            <p>新手上云</p>
            <span>NOVICE TO CLOUD</span>
          </div>
          <div class="box-wrap">
            <a
              v-for="(item,index) in onsaleData"
              class="box"
              :key="index"
              :href="item.path+'/'"
              :class="{hide:item.hidden=='1'}"
            >
              <img :src="item.imgCenter" alt="背景图片" />
              <div class="box-content">
                <div class="box-head" :style="{color: item.namecolor}">
                  <p>{{item.name}}</p>
                  <p>{{item.actdesc}}</p>
                </div>
                <div class="box-bottom">
                  <p>{{item.des}}</p>
                  <button>立即参与</button>
                </div>
              </div>
            </a>
            <!-- <div class="comingstart">更多优惠活动即将开启</div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import axios from "@/util/axiosInterceptor";
export default {
  metaInfo: {
    title: "云服务器低价优惠活动 - 特价云服务器体验 - 活动中心 - 新睿云",
    meta: [
      {
        name: "keywords",
        content:
          "云服务器活动,云服务器活动,低价云服务器,云服务器体验,云服务器优惠,特价云服务器"
      },
      {
        name: "description",
        content:
          "新睿云活动中心汇聚了云服务器,云数据库,对象存储等产品,推出新春采购季、免费云服务器、打折促销,分享赚时长等多种优惠活动！"
      }
    ]
  },
  data() {
    return {
      active: [],
      allActive: [],
      activedata: [],
      onsaleData: []
    };
  },
  methods: {
    push(url) {
      this.$router.push(url);
    },
    change(activeIndex) {
      this.activeBanner = activeIndex + 1;
    }
  },
  computed: {},
  created() {
    axios
      .get("/activity/getActivitys.do", {
        params: {}
      })
      .then(res => {
        if (res.status === 200 && res.data.status === 1) {
          this.allActive = res.data.result.classfy_one;
          this.onsaleData = res.data.result.classfy_two;
        }
      });
  },
  watch: {},
  components: {}
};
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
        .aa {
          height: 400px;
          background: url("../../assets/img/active/anniversary/newanniversary-banner-nav-bg.png")
            center no-repeat;
          .wrap {
            width: 1200px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            padding: 0 130px 0 116px;
            .text {
              margin-top: 120px;
              p {
                font-size: 24px;
                color: #ffedd2;
                line-height: 31px;
              }
              img {
                width: 406px;
                height: 182px;
              }
              button {
                margin-top: 20px;
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
        .hongkong {
          height: 400px;
          background:linear-gradient(270deg,rgba(255,255,255,1) 0%,rgba(255,227,208,1) 100%);
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
                margin-top: 80px;
                font-size: 48px;
                font-weight: 400;
              }
              p:nth-child(2) {
                font-size: 24px;
                margin-top: 30px;
                font-weight: normal;
              }
            }
            .img {
              padding-top: 30px;
              margin-right: -200px;
            }
            button {
              margin-top:40px;
              width:164px;
              height:44px;
              background:rgba(255,98,75,1);
              border-radius:4px;
              font-size:16px;
              font-family:MicrosoftYaHei;
              color:rgba(255,255,255,1);
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
        .tt-active {
          background: linear-gradient(
            90deg,
            rgba(255, 227, 208, 1) 0%,
            rgba(255, 250, 247, 1) 100%
          );
          height: 400px;
          position: relative;
          .wrap {
            position: relative;
            width: 1920px;
            margin: 0 auto;
            &:after {
              content: url("./../../assets/img/activecenter/ac-banner-tt.png");
              position: absolute;
              top: -10px;
              right: 108px;
            }
            > div {
              width: 1200px;
              margin: 0 auto;
              padding-top: 84px;
              button {
                background: none;
                outline: none;
                cursor: pointer;
                width: 164px;
                height: 44px;
                margin-top: 30px;
                border-radius: 4px;
                border: 1px solid rgba(51, 51, 51, 1);
                font-size: 16px;
                font-family: "Microsoft YaHei", "微软雅黑";
                color: rgba(51, 51, 51, 1);

                // &:hover {
                //   color: rgba(255, 70, 43, 1);
                //   border: 1px solid rgba(255, 70, 43, 1);
                // }
              }
              p {
                font-size: 28px;
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
      justify-content: flex-start;
      margin-bottom: 20px;
      .box {
        width: 386px;
        height: 183px;
        margin-bottom: 20px;
        margin-right: 20px;
        &:nth-of-type(3n + 3) {
          margin-right: 0;
        }
        cursor: pointer;
        background-repeat: no-repeat;
        transition: all 0.5s ease-out;
        position: relative;
        font-size: 0;
        // width: 386px;
        // height: 183px;
        .box-content {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
        }
        .box-head {
          height: 58%;
          padding: 0 20px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          color: #fff;
          p:nth-of-type(1) {
            margin-bottom: 12px;
            font-size: 20px;
            line-height: 26px;
          }
          p:nth-of-type(2) {
            font-size: 16px;
            line-height: 20px;
          }
        }
        .box-bottom {
          height: 42%;
          padding: 0 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          p {
            color: #333;
            font-size: 14px;
          }
          button {
            width: 90px;
            height: 30px;
            background: #ff624b;
            border-radius: 2px;
            border: none;
            color: #fff;
            outline: none;
            font-size: 12px;
          }
        }
      }
    }
  }
}

.center-active {
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
@media screen and (min-width: 1221px) {
}
@media screen and (max-width: 768px) {
  .banner {
    display: none;
  }

  .wrap {
    width: 100%;
    padding: 4px;
  }
  .sec-headline-g {
    margin-bottom: 10px;
  }
  .box-g .content {
    padding: 15px 0;
  }
  .box-g .content .box-wrap {
    .box {
      width: 100%;
      height: auto;
      margin-bottom: 4px;
      margin-right: 0;
    }
    .hide {
      display: none;
    }
  }

  .box-g .content .box-wrap .box {
    // width: auto;
    // height: auto;
    > img {
      width: 100%;
    }
  }
  .center-active {
    .box {
      &:hover {
        box-shadow: none;
        transform: none;
      }
    }
  }
}
</style>
