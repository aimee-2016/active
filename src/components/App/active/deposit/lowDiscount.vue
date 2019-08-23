<template>
  <div>
    <div class="hot-host">
      <div class="wrap">
        <div class="product">
          <div v-for="(item,index) in hotHostList" :key="index">
            <div class="head">
              <h3>云服务器</h3>
              <span>100%性能可用，更低价格，拒绝套路</span>
            </div>
            <div class="body">
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
                  style="width:237px"
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
                <Cascader :data="item.systemList" v-model="item.system" style="width:237px;"></Cascader>
              </div>
              <div class="time">
                <span class="label">时长：</span>
                <ul>
                  <li
                    v-for="(item1,index1) in item.timeList"
                    :key="index1"
                    :class="{'selected':item.configId==item1.id}"
                    @click="changgeTimeHot(item,item1)"
                  >
                    {{month(item1.days)}}
                    <span>{{item1.discount*10}}折</span>
                  </li>
                </ul>
              </div>
              <div class="price">
                价格：￥
                <span>{{item.price}}</span>
              </div>
              <div class="origin-price">
                原价：￥
                <span>{{item.originPrice+'/'+month(item.time)}}</span>
              </div>
              <Button @click="pushOrderHot(item)">立即购买</Button>
            </div>
          </div>
        </div>
        <div class="tips">
          *以上配置GPU云服务器为128G系统盘，其他弹性云服务器均为40G SSD系统盘。
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import axios from 'axios'
import reg from '../../../../util/regExp'
import VueQArt from 'vue-qart'
import $ from 'jquery'
export default {
  data() {
    return {
      hotHostList: [
        {
          headline: '包月云服务器',
          subtitle: '适用于：日常运营活动、小型开发测试环境、普通数据处理服务等场景。',
          config: {},
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
          headline: '包年云服务器',
          subtitle: '适用于：日常运营活动、小型开发测试环境、普通数据处理服务等场景。',
          config: {},
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
          headline: '包月云服务器',
          subtitle: '适用于：日常运营活动、小型开发测试环境、普通数据处理服务等场景。',
          config: {},
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
          headline: '包年云服务器',
          subtitle: '适用于：日常运营活动、小型开发测试环境、普通数据处理服务等场景。',
          config: {},
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
  created() {

  },
  mounted() {

  },
  methods: {
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
    changgeTimeHot (item, innerItem) {
      item.configId = innerItem.id
      item.time = innerItem.days
      this.getPriceHot(item)
    },
    changeZoneHot (item, index, name) {
      this.changeZoneHost(item, index, name)
      this.getPriceHot(item)
    },
    // 根据区域获得不同系统
    changeZoneHost (item, index, name) {
      axios.get('information/listTemplates.do', {
        params: {
          zoneId: item.zone,
        }
      }).then(res => {
        if (res.status == 200 && res.data.status == 1) {
          var x
          for (x in res.data.result) {
            this[name][index].systemList.forEach(item => {
              if (item.value == x) {
                item.children = res.data.result[x]
              }
            })
          }
          this[name][index].systemList.forEach(item => {
            item.children.forEach(item => {
              item.value = item.systemtemplateid
              item.label = item.templatedescript
            })
          })
          this[name][index].systemList.forEach((item, index) => {
            if (item.children.length == 0) {
              item.disabled = true
            }
          })
          // 设置默认系统
          this[name].forEach(item => {
            item.system = ['window', res.data.result.window[0].systemtemplateid]
          })
        }
      })
    },
    getPriceHot (item) {
      // console.log(item.zone)
      axios.get('activity/getOriginalPrice.do', {
        params: {
          zoneId: item.zone,
          vmConfigId: item.configId,
          month: item.time / 30
        }
      }).then(res => {
        if (res.status == 200 && res.data.status == 1) {
          item.price = res.data.result.cost;
          item.originPrice = res.data.result.originalPrice;
        }
      })
    },
    pushOrderHot (item) {
      if (!this.$store.state.userInfo) {
        this.$LR({ type: 'register' })
        return
      }
      if ((!this.authInfo) || (this.authInfo && this.authInfo.authtype == 0 && this.authInfo.checkstatus != 0) || (!this.authInfoPersion && this.authInfo && this.authInfo.authtype == 1 && this.authInfo.checkstatus != 0) || (this.authInfoPersion && this.authInfoPersion.checkstatus != 0 && this.authInfo && this.authInfo.checkstatus != 0)) {
        this.showModal.authentication = true
        return
      }
      axios.get('information/getDiskcountMv.do', {
        params: {
          defzoneid: item.zone,
          vmConfigId: item.configId,
          osType: item.system[1]
        }
      }).then(res => {
        if (res.status == 200 && res.data.status == 1) {
          this.$Message.success('创建订单成功')
          this.$router.push('/order')
        } else {
          this.$message.info({
            content: res.data.message
          })
        }
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
.hot-host {
  .product {
    display: flex;
    justify-content: space-between;
    text-align: left;
    background: #fff;
    padding-bottom: 10px;
    > div {
      width: 277px;
      box-shadow: 0px 3px 10px -3px rgba(195, 205, 230, 0.7);
      border: 1px solid rgba(220, 226, 242, 1);
    }
    .head {
      padding: 15px 20px;
      color: #fff;
      background: url("../../../../assets/img/active/freeToReceive.1/hot-host-product-bg.png");
      h3 {
        margin-bottom: 6px;
        font-size: 18px;
      }
      span {
        font-size: 14px;
      }
    }
    .body {
      padding: 15px 20px 20px 20px;
      background: #fff;
      &:nth-of-type(2) {
        padding-bottom: 0;
      }
      &:nth-of-type(3) {
        border-top: 1px solid rgba(220, 226, 242, 1);
      }
      > div {
        margin-bottom: 15px;
      }
      .label {
        display: block;
        margin-bottom: 8px;
        width: 70px;
        font-size: 14px;
        color: #222274;
      }
      .configure {
        ul {
          display: flex;
          justify-content: space-between;
          li {
            i {
              margin-bottom: 10px;
              display: block;
              font-style: normal;
              color: #0f0f68;
              font-size: 12px;
            }
            span {
              color: #0f0f68;
              font-size: 18px;
              span {
                font-size: 14px;
              }
            }
          }
        }
      }
      .time {
        ul {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          li {
            position: relative;
            width: 110px;
            height: 34px;
            margin-bottom: 10px;
            line-height: 32px;
            border-radius: 2px;
            border: 1px solid rgba(125, 161, 217, 1);
            text-align: center;
            color: #4b3c3d;
            cursor: pointer;
            &:nth-child(3n + 3) {
              margin-right: 0;
            }
            span {
              position: absolute;
              top: -14px;
              right: 5px;
              display: inline-block;
              width: 38px;
              height: 20px;
              background: rgba(246, 109, 89, 1);
              font-size: 14px;
              color: rgba(255, 255, 255, 1);
              line-height: 19px;
            }
          }
          .selected {
            background: rgba(56, 125, 255, 1);
            color: #fff;
          }
        }
      }
      .price {
        color: #e70520;
        font-size: 12px;
        span {
          font-size: 24px;
          font-weight: bold;
        }
      }
      .origin-price {
        font-size: 12px;
        color: #0f0f68;
        text-decoration: line-through;
      }
      button {
        width: 100%;
        background: #f66d59;
        border: none;
        border-radius: 0px;
        color: #fff;
        height: 40px;
        font-size: 18px;
      }
    }
  }
  .tips {
    margin-top: 15px;
    text-align: left;
    font-size: 16px;
    color: #4f557b;
    line-height: 1;
    .blue {
      color: #5893ff;
    }
    .red {
      color: #f0624d;
    }
  }
}
</style>
