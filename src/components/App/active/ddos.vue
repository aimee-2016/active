<template>
  <div class="ddos-active">
    <div class="banner">
      <div class="wrap">
        <div class="product">
          <div class="content">
            <div class="left">
              <span>7/25–9/25</span>
              <img
                class="text"
                src="../../../assets/img/active/ddos/ddos-banner-text.png"
                alt="高仿云服务器限时秒杀"
              >
              <p>更有首月8折等超多优惠</p>
            </div>
            <img
              class="banner"
              src="../../../assets/img/active/ddos/ddos-banner.png"
              alt="高仿云服务器限时秒杀"
            >
          </div>
          <ul>
            <li
              v-for="(item,index) in navs"
              :key="index"
              :class="{'selected':selectedNav==index}"
              @click="roll(item.distance,index)"
            >
              <span>{{ item.title}}</span>
              <p>{{ item.text}}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="seckill">
      <div class="wrap">
        <div class="top">
          <div class="text">
            <p>
              每天6场秒杀，2点、6点、10点、14点、18点、22点开抢
              <span>活动规则></span>
            </p>
            <p>
              下场秒杀预告：高防云服务器2核8G、云服务器2核4G、GPU云服务器8核64G、DMS-50G
              <span>更多场次预告 ></span>
            </p>
          </div>
          <div class="timer">
            <i>本场秒杀倒计时</i>
            <div>
              <span>2</span>:
              <span>5</span>
              <span>8</span>:
              <span>2</span>
              <span>2</span>
            </div>
          </div>
        </div>
        <div class="product">
          <div v-for="(item,index) in hotHostList" :key="index">
            <div class="head">
              <h3>{{item.headline}}</h3>
              <span v-if="item.hot" class="hot">爆款</span>
              <span v-if="item.new" class="new">限新用户</span>
            </div>
            <div class="configs">
              <div class="configure">
                <ul>
                  <li>
                    <i>CPU</i>
                    <span>{{item.config.cpu}}核</span>
                  </li>
                  <li>
                    <i>内存</i>
                    <span>{{item.config.mem}}G</span>
                  </li>
                  <li>
                    <i>宽带</i>
                    <span>{{item.config.bandwith}}M</span>
                  </li>
                  <li>
                    <i>系统盘</i>
                    <span>
                      {{item.config.disksize}}G
                      <span>SSD</span>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div class="body">
              <div>
                <span class="label">区域：</span>
                <Select
                  v-model="item.zone"
                  style="width:142px;display:inline-block"
                  @on-change="changeZoneHot(item,index,'hotHostList')"
                >
                  <Option
                    v-for="item in zoneListHot"
                    :value="item.value"
                    :key="item.value"
                  >{{ item.name }}</Option>
                </Select>
              </div>
              <div>
                <span class="label">系统：</span>
                <Cascader :data="item.systemList" v-model="item.system" style="width:142px;display:inline-block"></Cascader>
              </div>
              <div class="price">
               ￥
                <span>{{item.price}}</span>/月
              </div>
              <div class="origin-price">
                原价：￥
                <span>{{item.originPrice+'/'+month(item.time)}}</span>
              </div>
              <Button @click="pushOrderHot(item)">立即购买</Button>
              <div class="percentage">
                <span>已抢购100%</span>
              </div>
            </div>
          </div>
        </div>
        <div class="tips">100%性能可用，内网收发包无限制，使用顶级Intel品牌硬件，40G SSD系统盘（好于高性能盘和高效云盘）</div>
      </div>
    </div>
    <div class="first-month">
      <div class="wrap">
        <div class="headline">
          <div>
            <img src="../../../assets/img/active/ddos/text-left.png" alt="icon">
            <img src="../../../assets/img/active/ddos/text-3.png" alt="icon">
            <img src="../../../assets/img/active/ddos/text-right.png" alt="icon">
          </div>
          <p>
            <span
              style="color:#EED292;cursor:pointer"
              @click="showModal.ruleHost=true"
            >活动规则></span>
          </p>
        </div>
        <div class="product">
          <!-- <ul>
            <li
              v-for="(item,index) in configureList"
              :key="index"
              :class="{'selected':selectConfig==item.cpu+','+item.mem}"
              @click="changConfigHost(item.cpu+','+item.mem)"
            >{{ item.cpu+'核'+item.mem+'G'}}</li>
          </ul>-->
          <ul>
            <li>
              
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="super-discount">
      <div class="wrap">
        <div class="headline">
          <h2>热销云服务器</h2>
          <p>
            购买时长越长越便宜，年付低至3折
            <span
              style="color:#387dff;cursor:pointer;text-decoration: underline;"
              @click="showModal.ruleHost=true"
            >活动规则></span>
          </p>
        </div>
        <div class="product">
          <!-- <ul>
            <li
              v-for="(item,index) in configureList"
              :key="index"
              :class="{'selected':selectConfig==item.cpu+','+item.mem}"
              @click="changConfigHost(item.cpu+','+item.mem)"
            >{{ item.cpu+'核'+item.mem+'G'}}</li>
          </ul>-->
        </div>
      </div>
    </div>
    <div class="give-time">
      <div class="wrap">
        <div class="headline">
          <h2>热销云服务器</h2>
          <p>
            购买时长越长越便宜，年付低至3折
            <span
              style="color:#387dff;cursor:pointer;text-decoration: underline;"
              @click="showModal.ruleHost=true"
            >活动规则></span>
          </p>
        </div>
        <div class="product">
          <!-- <ul>
            <li
              v-for="(item,index) in configureList"
              :key="index"
              :class="{'selected':selectConfig==item.cpu+','+item.mem}"
              @click="changConfigHost(item.cpu+','+item.mem)"
            >{{ item.cpu+'核'+item.mem+'G'}}</li>
          </ul>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import axios from 'axios'
import reg from '../../../util/regExp'
import VueQArt from 'vue-qart'
import $ from 'jquery'
export default {
  data () {
    return {
      navs: [
        { title: '活动一', text: '高防云产品超低折扣 专属秒杀', distance: 1400, },
        { title: '活动二', text: '高防云服务器首月8折优惠', distance: 2200, },
        { title: '活动三', text: '超低折扣 买时长送域名', distance: 3000, },
        { title: '活动四', text: '自选配置 打折再送时长', distance: 4000, }
      ],
      selectedNav: 0,
      hotHostList: [
        {
          headline: '高防云服务器',
          new: 0,
          hot: 1,
          config: {
            cpu: 1,
            mem: 2,
            bandwith: 3,
            disksize: 40
          },
          timeList: [],
          time: 180,
          systemList: [{
            value: 'window',
            label: 'Windows',
            children: []
          }, {
            value: 'centos',
            label: 'Centos',
            children: [],
          },
          {
            value: 'debian',
            label: 'Debian',
            children: [],
          },
          {
            value: 'ubuntu',
            label: 'Ubuntu',
            children: [],
          }],
          system: [],
          zone: '',
          price: '69',
          originPrice: '176.72',
          configId: ''
        },
        {
          headline: '高防云服务器',
          new: 0,
          hot: 0,
          config: {
            cpu: 1,
            mem: 2,
            bandwith: 3,
            disksize: 40
          },
          timeList: [],
          time: 180,
          systemList: [{
            value: 'window',
            label: 'Windows',
            children: []
          }, {
            value: 'centos',
            label: 'Centos',
            children: [],
          },
          {
            value: 'debian',
            label: 'Debian',
            children: [],
          },
          {
            value: 'ubuntu',
            label: 'Ubuntu',
            children: [],
          }],
          system: [],
          zone: '',
          price: '69',
          originPrice: '176.72',
          configId: ''
        },
        {
          headline: '弹性云服务器',
          new: 1,
          hot: 1,
          config: {
            cpu: 1,
            mem: 2,
            bandwith: 3,
            disksize: 40
          },
          timeList: [],
          time: 180,
          systemList: [{
            value: 'window',
            label: 'Windows',
            children: []
          }, {
            value: 'centos',
            label: 'Centos',
            children: [],
          },
          {
            value: 'debian',
            label: 'Debian',
            children: [],
          },
          {
            value: 'ubuntu',
            label: 'Ubuntu',
            children: [],
          }],
          system: [],
          zone: '',
          price: '69',
          originPrice: '176.72',
          configId: ''
        },
        {
          headline: 'GPU云服务器',
          new: 1,
          hot: 0,
          config: {
            cpu: 1,
            mem: 2,
            bandwith: 3,
            disksize: 40
          },
          timeList: [],
          time: 180,
          systemList: [{
            value: 'window',
            label: 'Windows',
            children: []
          }, {
            value: 'centos',
            label: 'Centos',
            children: [],
          },
          {
            value: 'debian',
            label: 'Debian',
            children: [],
          },
          {
            value: 'ubuntu',
            label: 'Ubuntu',
            children: [],
          }],
          system: [],
          zone: '',
          price: '69',
          originPrice: '176.72',
          configId: ''
        },
        {
          headline: 'DDOS高防IP',
          new: 0,
          hot: 0,
          config: {
            cpu: 1,
            mem: 2,
            bandwith: 3,
            disksize: 40
          },
          timeList: [],
          time: 180,
          systemList: [{
            value: 'window',
            label: 'Windows',
            children: []
          }, {
            value: 'centos',
            label: 'Centos',
            children: [],
          },
          {
            value: 'debian',
            label: 'Debian',
            children: [],
          },
          {
            value: 'ubuntu',
            label: 'Ubuntu',
            children: [],
          }],
          system: [],
          zone: '',
          price: '69',
          originPrice: '176.72',
          configId: ''
        }
      ],
      zoneListHot: [],
    }
  },
  created () {

  },
  mounted () {
  },
  methods: {
    roll (val, index) {
      this.selectedNav = index
      $('html, body').animate({ scrollTop: val }, 300)
    },
    // 获取活动配置,区域
    getConfigureHot () {
      let url = 'activity/getTemActInfoById.do'
      axios.get(url, {
        params: {
          activityNum: '48'
        }
      }).then(res => {
        if (res.data.status == 1 && res.status == 200) {
          // 处理数组格式
          let originArr = res.data.result.freevmconfigs
          let timeList = []
          originArr.forEach((item, index) => {
            if ((index + 1) % 2 != 0) {
              timeList = []
            }
            let rObj = {};
            rObj['id'] = item.id;
            rObj['discount'] = item.discount;
            rObj['days'] = item.days;
            timeList.push(rObj)
            if ((index + 1) % 2 == 0) {
              let num = index - (index + 1) / 2
              this.hotHostList[num].config = item
              this.hotHostList[num].timeList = timeList
            }
          })
          // 获取区域列表
          this.zoneListHot = res.data.result.optionalArea
          // console.log(this.hotHostList)
        }
        //默认选择
        this.hotHostList.forEach(item => {
          // console.log(item)
          item.configId = item.timeList[0].id
          item.time = item.timeList[0].days
          item.zone = this.zoneListHot[0].value
          this.changgeTimeHot(item, item.timeList[0])
        })
      })
    },
    month (val) {
      return val >= 360 ? val / 360 + '年' : val / 30 + '个月'
    },
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
.ddos-active {
  font-family: MicrosoftYaHei;
  text-align: center;
}
.headline {
  padding: 50px 0;
  div {
    img:nth-of-type(2) {
      margin: 0 12px;
    }
  }
  p {
    margin-top: 20px;
    font-size: 18px;
  }
}
.wrap {
  margin: 0 auto;
  width: 1200px;
}
.banner {
  background: #2a2936;
  .product {
    .content {
      position: relative;
      height: 313px;
      padding-top: 50px;
      text-align: left;
      .left {
        position: relative;
        z-index: 2;
      }
      span {
        display: block;
        font-size: 28px;
        font-family: Helvetica-Light;
        font-weight: 300;
        color: rgba(255, 255, 255, 1);
        line-height: 34px;
      }
      .text {
        margin: 27px 0 20px 0;
      }
      p {
        font-size: 24px;
        font-family: PingFangSC-Light;
        font-weight: 300;
        color: rgba(255, 237, 210, 1);
        line-height: 33px;
      }
      .banner {
        position: absolute;
        z-index: 1;
        top: 0;
        right: -100px;
      }
    }
    ul {
      display: flex;
      justify-content: space-between;
      li {
        width: 299px;
        height: 118px;
        padding-top: 23px;
        background: rgba(62, 60, 78, 1);
        color: #ffe0a3;
        font-family: MicrosoftYaHei-Bold;
        font-weight: bold;
        cursor: pointer;
        &:hover {
          background: rgba(255, 224, 163, 1);
          color: #222222;
        }
        span {
          display: inline-block;
          font-size: 18px;
          margin-bottom: 15px;
        }
        p {
          font-size: 20px;
        }
      }
    }
  }
}
.seckill {
  padding: 53px 0 60px;
  background: #2a2936;
  .top {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    .text {
      text-align: left;
      p {
        margin-bottom: 20px;
        font-size: 18px;
        font-family: MicrosoftYaHei-Bold;
        font-weight: bold;
        color: rgba(255, 255, 255, 1);
        line-height: 20px;
        span {
          font-family: MicrosoftYaHei;
          color: rgba(255, 208, 140, 1);
        }
        &:nth-of-type(2) {
          margin-bottom: 0;
          font-size: 16px;
          font-family: MicrosoftYaHei;
          font-weight: normal;
          color: rgba(255, 255, 255, 1);
          line-height: 21px;
          span {
            font-family: MicrosoftYaHei;
            color: rgba(255, 208, 140, 1);
          }
        }
      }
    }
    .timer {
      display: flex;
      justify-content: space-between;
      color: #fff;
      font-size: 18px;
      i {
        padding-top: 10px;
        margin-right: 10px;
        font-style: normal;
      }
      div {
        height: 46px;
        span {
          display: inline-block;
          width: 36px;
          height: 46px;
          margin-left: 10px;
          background: linear-gradient(
            180deg,
            rgba(254, 231, 190, 1) 0%,
            rgba(252, 202, 138, 1) 100%
          );
          font-size: 36px;
          font-weight: bold;
          color: rgba(8, 13, 76, 1);
          line-height: 42px;
          &:nth-of-type(1),
          &:nth-of-type(3) {
            margin-right: 10px;
          }
        }
      }
    }
  }
  .product {
    display: flex;
    justify-content: space-between;
    margin-top: 50px;
    text-align: left;
    > div {
      // border: 1px solid rgba(220, 226, 242, 1);
      background: #4d4b61;
      width: 224px;
      // height:390px;
    }
    .head {
      position: relative;
      padding: 25px 0 15px 0;
      border-bottom: 2px solid transparent;
      border-image: url("../../../assets/img/active/ddos/border-bottom.png") 30
        30 stretch;
      color: #fff;
      text-align: center;
      h3 {
        font-size: 20px;
      }
      span {
        display: inline-block;
        padding: 0 6px;
        line-height: 20px;
        font-size: 12px;
        &:nth-of-type(1) {
          position: absolute;
          left: 0;
          top: 0;
        }
        &:nth-of-type(2) {
          position: absolute;
          left: 36px;
          top: 0;
        }
      }
      .hot {
        background: #ff624b;
        color: #fff;
      }
      .new {
        background: #ffd08c;
        color: #333;
      }
    }
    .configs {
      padding: 20px;
      color: #fff0de;
      .configure {
        ul {
          display: flex;
          justify-content: space-between;
          li {
            i {
              display: block;
              font-style: normal;
              font-size: 12px;
              font-family:MicrosoftYaHei;
            }
          }
        }
      }
    }
    .body {
      color: #fff0de;
      padding: 0px 0px 0px 20px;
      > div {
        margin-bottom: 10px;
      }
      .label {
        margin-bottom: 8px;
        width: 70px;
        font-size: 14px;
      }
      .price {
        color: #ff624b;
        font-size: 12px;
        span {
          font-size: 24px;
          font-weight: bold;
        }
      }
      .origin-price {
        font-size: 12px;
        color: #fff;
        text-decoration: line-through;
      }
      button {
        margin-bottom: 10px;
        width: 184px;
        height: 40px;
        background: linear-gradient(
          128deg,
          rgba(249, 239, 184, 1) 0%,
          rgba(227, 183, 111, 1) 100%
        );
        border-radius: 2px;
        border: none;
        color: #333333;
        font-size: 18px;
      }
    }
  }
  .tips {
    margin-top: 20px;
    text-align: left;
    font-size: 16px;
    color: #FFD08C;
  }
}
.first-month {
  background:rgba(42,41,54,1);
  .product {
    background:linear-gradient(360deg,rgba(96,102,130,1) 0%,rgba(42,41,54,1) 100%);
  }
}
</style>
