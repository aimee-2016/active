<template>
  <div class="anniversary">
    <aside>
      <ul>
        <li v-for="(item,index) in asideList" :key="index">{{item.text}}</li>
      </ul>
      <div class="to-top">回到顶部</div>
    </aside>
    <section class="banner">
      <div class="wrap">
        <div class="container">
          <div class="text">
            <img
              src="../../../assets/img/active/anniversary/anniversary-banner-title.png"
              alt="2周年庆典"
            />
            <img
              src="../../../assets/img/active/anniversary/anniversary-banner-text.png"
              alt="企业上云突破5万，回馈老用户"
            />
          </div>
          <ul class="clearfix">
            <li v-for="(item,index) in bannerNavList" :key="index">
              <div>
                <p>{{item.title}}</p>
                <span v-if="item.text">{{item.text}}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
    <section>
      <div class="wrap">
        <div class="new-user">
          <span class="left">
            <img
              src="../../../assets/img/active/anniversary/anniversary-newuser-text.png"
              alt="邀新福利"
            />
            <img
              src="../../../assets/img/active/anniversary/anniversary-newuser-img.png"
              alt="邀新福利图片"
              class="ml10"
            />
          </span>
          <span class="desc">老用户邀请新用户成功购买以下任1款商品（域名专区除外），即可获得“爆款秒杀专区”或“企业用户限购专区”的额外购买权1次。</span>
          <span class="btn">邀请新用户</span>
        </div>
        <div class="seckill">
          <header class="sub-head">
            <h2>爆款秒杀专区</h2>
            <p>
              爆款云产品，邀新送好礼
              <span>活动规则></span>
            </p>
          </header>
          <div class="container">
            <div class="item">
              <header>弹性云服务器</header>
              <div class="content">
                <ul class="configure clearfix">
                  <li>
                    <i>CPU</i>
                    <span>2核</span>
                  </li>
                  <li>
                    <i>内存</i>
                    <span>4G</span>
                  </li>
                  <li>
                    <i>带宽</i>
                    <span>5M</span>
                  </li>
                  <li>
                    <i>系统盘</i>
                    <span>40G SSD</span>
                  </li>
                </ul>
                <div class="center">
                  <div>
                    <span class="label">区域：</span>
                    <Select v-model="model1" style="width:142px">
                      <Option
                        v-for="item in cityList"
                        :value="item.value"
                        :key="item.value"
                      >{{ item.label }}</Option>
                    </Select>
                  </div>
                  <div>
                    <span class="label">系统：</span>
                    <Cascader
                      :data="data2"
                      v-model="value2"
                      style="width:142px;display:inline-block"
                    ></Cascader>
                  </div>
                </div>
                <div class="price">
                  <p>
                    <i>￥</i>2117
                    <i>/2年</i>
                  </p>
                  <span>原价：￥12449.28/2年</span>
                </div>
                <span class="btn">立即抢购</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div class="wrap">
        <div class="enterprise">
          <header class="sub-head">
            <h2>企业用户限购专区</h2>
            <p>
              企业限购专区，老用户享同等价购买
              <span>活动规则></span>
            </p>
          </header>
          <div class="container">
            <div class="item clearfix">
              <div class="left">
                <p>2核4G 3M带宽</p>
                <span>40G SSD盘</span>
              </div>
              <div class="content">
                <ul class="center clearfix">
                  <li>
                    <span class="label">区域</span>
                    <Select v-model="model1" style="width:150px">
                      <Option
                        v-for="item in cityList"
                        :value="item.value"
                        :key="item.value"
                      >{{ item.label }}</Option>
                    </Select>
                  </li>
                  <li>
                    <span class="label">系统</span>
                    <Cascader
                      :data="data2"
                      v-model="value2"
                      style="width:230px;display:inline-block"
                    ></Cascader>
                  </li>
                  <li>
                    <span class="label">可选时长</span>
                    <div class="time clearfix">
                      <span>
                        3年
                        <i>0.7折</i>
                      </span>
                      <span>
                        3年
                        <i>0.7折</i>
                      </span>
                      <span>
                        3年
                        <i>0.7折</i>
                      </span>
                    </div>
                  </li>
                </ul>
                <div class="right">
                  <div class="price">
                    <p class="cost">
                      <i>￥</i>2117
                    </p>
                    <span class="origin-cost">原价：￥12449.28</span>
                  </div>
                  <span class="btn">立即抢购</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="database">
          <header class="sub-head">
            <h2>云数据库限购专区</h2>
            <p>
              数据库现时抢购
              <span>活动规则></span>
            </p>
          </header>
          <div class="content">
            <div class="item"></div>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div class="wrap">
        <div class="domain">
          <header class="sub-head">
            <h2>域名专区</h2>
          </header>
          <div class="container">
            <div class="item">
              <header>
                <span>.club 域名</span>
                <input type="text" name id />
              </header>
              <div class="content">
                <div class="price">
                  ¥11.00
                  <span>/1年</span>
                </div>
                <span class="btn">立即抢购</span>
              </div>
            </div>
          </div>
        </div>
        <div class="renew">
          <header class="sub-head">
            <h2>续费专区</h2>
            <p>
              老用户续费折扣享不停
              <span>活动规则></span>
            </p>
          </header>
        </div>
      </div>
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      asideList: [
        { text: '爆款秒杀', height: '' },
        { text: '企业限购', height: '' },
        { text: '云数据库', height: '' },
        { text: '域名专区', height: '' },
        { text: '续费专区', height: '' }
      ],
      bannerNavList: [
        { title: '爆款云产品', text: '邀新送好礼' },
        { title: '企业限购专区', text: '老用户享同等价购买' },
        { title: '云数据库限时抢购', text: '' },
        { title: '域名最低8元可领', text: '' },
        { title: '老用户续费', text: '折扣享不停' }
      ],
      cityList: [
        {
          value: 'New York',
          label: 'New York'
        },
        {
          value: 'London',
          label: 'London'
        },
        {
          value: 'Sydney',
          label: 'Sydney'
        },
        {
          value: 'Ottawa',
          label: 'Ottawa'
        },
        {
          value: 'Paris',
          label: 'Paris'
        },
        {
          value: 'Canberra',
          label: 'Canberra'
        }
      ],
      model1: '',
      value2: [],
      data2: [{
        value: 'beijing',
        label: '北京',
        children: [
          {
            value: 'gugong',
            label: '故宫'
          },
          {
            value: 'tiantan',
            label: '天坛'
          },
          {
            value: 'wangfujing',
            label: '王府井'
          }
        ]
      }, {
        value: 'jiangsu',
        label: '江苏',
        children: [
          {
            value: 'nanjing',
            label: '南京',
            children: [
              {
                value: 'fuzimiao',
                label: '夫子庙',
              }
            ]
          },
          {
            value: 'suzhou',
            label: '苏州',
            children: [
              {
                value: 'zhuozhengyuan',
                label: '拙政园',
              },
              {
                value: 'shizilin',
                label: '狮子林',
              }
            ]
          }
        ],
      }]
    }
  },
  created () {

  },
  mounted () {

  },
  methods: {

  },
  computed: {

  },
  watch: {

  },
  components: {

  }
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
.anniversary {
  color: #222;
  font-family: MicrosoftYaHei;
  .wrap {
    width: 1200px;
    margin-left: auto;
    margin-right: auto;
  }
  .ml10 {
    margin-left: 10px;
  }
  .sub-head {
    padding-top: 80px;
    padding-bottom: 20px;
    color: #000;
    h2 {
      font-size: 36px;
      line-height: 47px;
      font-weight: normal;
      margin-bottom: 10px;
    }
    p {
      font-size: 18px;
      line-height: 24px;
      span {
        color: #ff624b;
        cursor: pointer;
      }
    }
  }

  aside {
    position: fixed;
    z-index: 100;
    top: 510px;
    left: 0px;
    width: 90px;
    height: 306px;
    padding-top: 100px;
    background: url(../../../assets/img/active/anniversary/anniversary-aside-bg.png)
      center no-repeat;
    ul {
      li {
        height: 30px;
        line-height: 30px;
        text-align: center;
        cursor: pointer;
        &:hover {
          background: gray;
        }
      }
    }
    .to-top {
      position: absolute;
      bottom: 8px;
      width: 100%;
      text-align: center;
      cursor: pointer;
    }
  }
  .banner {
    height: 577px;
    background: url(../../../assets/img/active/anniversary/anniversary-banner.png)
      center no-repeat;
    .text {
      padding-top: 140px;
      img:first-of-type {
        margin-bottom: 40px;
        display: block;
      }
    }
    ul {
      margin-top: 200px;
      padding: 10px 0;
      background: gray;
      li {
        position: relative;
        width: 240px;
        height: 60px;
        float: left;
        font-size: 18px;
        font-weight: bold;
        color: #fff;
        border-right: 1px solid rgba(151, 151, 151, 1);
        div {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 100%;
          text-align: center;
          p,
          span {
            line-height: 27px;
          }
        }
      }
      li:last-of-type {
        border-right: none;
      }
    }
  }
  section:nth-of-type(2) {
    background: rgba(245, 243, 240, 1);
  }
  .new-user {
    background: url(../../../assets/img/active/anniversary/anniversary-newuser-bg.png)
      center no-repeat;
    padding: 14px 0px 0 40px;
    span {
      vertical-align: middle;
    }
    .left {
      img {
        vertical-align: middle;
      }
    }
    .desc {
      display: inline-block;
      width: 474px;
      margin: 0 98px 0 136px;
      font-size: 16px;
      line-height: 24px;
    }
    .btn {
      display: inline-block;
      background: #141411;
      width: 184px;
      height: 40px;
      line-height: 40px;
      font-size: 18px;
      text-align: center;
      color: #fff;
      cursor: pointer;
    }
  }
  .seckill {
    margin-bottom: 92px;
    .item {
      width: 224px;
      background: #2a2936;
      color: rgba(255, 255, 255, 1);
      header {
        position: relative;
        padding: 25px 0 15px 0;
        font-size: 20px;
        font-weight: bold;
        line-height: 26px;
        text-align: center;
        &::after {
          content: "";
          display: block;
          height: 1px;
          width: 100%;
          background: url(../../../assets/img/active/anniversary/anniversary-border-img.png)
            center no-repeat;
          position: absolute;
          bottom: 0;
        }
      }
      .content {
        padding: 20px 0 30px 20px;
        .configure {
          li {
            float: left;
            margin-right: 20px;
            i {
              font-style: normal;
              display: block;
            }
          }
        }
        .center {
          height: 130px;
          padding-top: 26px;
          > div {
            margin-bottom: 15px;
          }
        }
        .price {
          p {
            margin-bottom: 10px;
            color: rgba(255, 98, 75, 1);
            font-size: 24px;
            font-weight: bold;
            i {
              font-style: normal;
              font-size: 12px;
              font-weight: normal;
            }
          }
          span {
            display: inline-block;
            text-decoration: line-through;
            margin-bottom: 10px;
          }
        }
        .btn {
          display: inline-block;
          width: 184px;
          height: 40px;
          background: linear-gradient(
            128deg,
            rgba(249, 239, 184, 1) 0%,
            rgba(227, 183, 111, 1) 100%
          );
          border-radius: 2px;
          font-size: 18px;
          color: rgba(51, 51, 51, 1);
          line-height: 40px;
          text-align: center;
        }
      }
    }
  }
  section:nth-of-type(3) {
    background: url(../../../assets/img/active/anniversary/anniversary-bg-icon-1.png)
        90px 190px no-repeat,
      url(../../../assets/img/active/anniversary/anniversary-bg-icon-2.png) 95%
        90% no-repeat;
    background-color: rgba(20, 20, 17, 1);
    .sub-head {
      color: #fff;
      p {
        font-size: 18px;
        line-height: 24px;
        span {
          color: #eed292;
        }
      }
    }
  }
  .enterprise {
    .item {
      color: #fff;
      .left {
        width: 200px;
        height: 130px;
        float: left;
        background: url(../../../assets/img/active/anniversary/anniversary-item-left-bg-1.png)
          center no-repeat;
        font-weight: bold;
        padding: 40px 0 0 20px;
        p {
          margin-bottom: 10px;
          font-size: 20px;
          line-height: 26px;
        }
        span {
          font-size: 14px;
        }
      }
      .content {
        float: left;
        padding: 36px 0 0 20px;
        background: #fff;
        width: 1000px;
        height: 130px;
        color: #000;
        .center {
          float: left;
          border-right: solid 1px #a8a8a8;
          li {
            float: left;
            margin-right: 20px;
            .label {
              display: block;
              margin-bottom: 14px;
            }
            .time {
              span {
                position: relative;
                display: block;
                float: left;
                width: 46px;
                height: 35px;
                border: 1px solid rgba(235, 193, 98, 1);
                border-right: none;
                text-align: center;
                line-height: 32px;
                font-size: 14px;
                cursor: pointer;
                &:last-of-type {
                  border-right: 1px solid rgba(235, 193, 98, 1);
                }
                i {
                  position: absolute;
                  top: -8px;
                  left: 6px;
                  display: inline-block;
                  padding: 1px 2px;
                  line-height: 16px;
                  background: rgba(191, 191, 191, 1);
                  color: #fff;
                  font-style: normal;
                  font-size: 12px;
                }
                &:hover {
                  background: linear-gradient(
                    130deg,
                    rgba(249, 239, 184, 1) 0%,
                    rgba(227, 183, 111, 1) 100%
                  );
                  i {
                    background: #ff624b;
                  }
                }
              }
            }
            &:last-of-type {
              margin-right: 60px;
            }
          }
        }
        .right {
          float: left;
          .price {
            float: left;
            margin-left: 20px;
            margin-right: 50px;
            .cost {
              // margin-bottom: 10px;
              color: rgba(255, 98, 75, 1);
              font-size: 28px;
              font-weight: bold;
              i {
                font-style: normal;
                font-size: 12px;
                font-weight: normal;
              }
            }
            .origin-cost {
              text-decoration: line-through;
            }
          }
          .btn {
            display: inline-block;
            width: 150px;
            height: 40px;
            background: linear-gradient(
              128deg,
              rgba(249, 239, 184, 1) 0%,
              rgba(227, 183, 111, 1) 100%
            );
            border-radius: 2px;
            font-size: 18px;
            color: rgba(51, 51, 51, 1);
            line-height: 40px;
            text-align: center;
          }
        }
      }
    }
  }
  section:nth-of-type(4) {
    background: url(../../../assets/img/active/anniversary/anniversary-bg-icon-3.png)
        90px 190px no-repeat,
      url(../../../assets/img/active/anniversary/anniversary-bg-icon-4.png) 95%
        90% no-repeat;
    background-color: rgba(245, 243, 240, 1);
  }
  .domain {
    .item {
      header {
        width: 350px;
        height: 170px;
        background: url(../../../assets/img/active/anniversary/anniversary-domain-1.png)
          top no-repeat;
      }
    }
  }
}
</style>
