<template>
  <div>
    <div class="hot-host">
      <div class="wrap">
        <div class="product">
          <div v-for="(item,index) in hotHostList" :key="index">
            <div class="head">
              <span class="cer" v-if="item.post.certification==3">企业用户专享</span>
              <h3>{{killTitle(item.post)}}</h3>
              <p v-if="item.post.servicetype=='G5500'"><span>{{item.post.bandwith}}M带宽</span><span>{{item.post.disksize}}G系统盘</span></p>
            </div>
            <div class="body" v-if="item.post.servicetype!='G5500'">
              <div class="configure">
                <ul>
                  <li>
                    <i>CPU</i>
                    <span>{{item.post.cpu}}核</span>
                  </li>
                  <li>
                    <i>内存</i>
                    <span>{{item.post.mem}}G</span>
                  </li>
                  <li v-if="item.post.servicetype!='db'">
                    <i>宽带</i>
                    <span>{{item.post.bandwith}}M</span>
                  </li>
                  <li>
                    <i>系统盘</i>
                    <span v-if="item.post.servicetype!='db'">
                      {{item.post.disksize}}G
                      <span>SSD</span>
                    </span>
                    <span v-else>
                      40G
                    </span>
                  </li>
                  <li v-if="item.post.servicetype=='db'">
                    <i>数据盘</i>
                    <span>
                      100G
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div class="body">
              <div v-if="item.post.servicetype=='G5500'" class="mb15 mt5">
                <span class="label">配置：</span>
                <Select
                        v-model="item.gpuConfigIndex"
                        style="width:184px"
                        placeholder=" "
                        @on-change="changConfigGPU(item)"
                      >
                        <Option
                          v-for="(item1,index1) in item.postArr"
                          :value="index1"
                          :key="index1"
                        >{{ item1.cpu+'核'+item1.mem+'G'+' '+item1.gpusize+'*NVIDIA P100' }}</Option>
                      </Select>
              </div>
              <div class="mb15">
                <span class="label">区域：</span>
                <Select
                  v-model="item.zoneId"
                  style="width:184px"
                  @on-change="changeZoneHot(item)"
                >
                  <Option
                    v-for="item1 in item.zoneList"
                    :value="item1.value"
                    :key="item1.value"
                  >{{ item1.name }}</Option>
                </Select>
              </div>
              <div class="mb15">
                <span class="label" v-if="item.post.servicetype=='db'">镜像系统：</span>
                <span class="label" v-else>系统：</span>
                <Cascader :data="item.systemList" v-model="item.system" style="width:184px;"></Cascader>
              </div>
              <div class="price">
                价格：¥
                <span>{{0+'/'}}</span>
                {{month(item.post.days)}}
              </div>
              <div class="origin-price">
                保证金：¥
                <span>{{item.price+'/'+month(item.post.days)}}</span>
              </div>
              <div class="origin-price line-thr">
                原价：¥
                <span>{{item.originPrice}}</span>
              </div>
              <Button @click="pushOrderHot(item)">免费领取</Button>
            </div>
          </div>
        </div>
        <div class="tips">
          新用户专享，为防止恶意刷抢免费云资源，遂需缴纳保证金，保证金随时可退
          <span class="blue">活动规则></span>
          <span class="red">领取优惠券></span>
        </div>
        <div class="tips">
          温馨提示：使用期间若到“百度口碑”发布使用体验等相关评论，截图联系发送至在线客服，可领取满200减100优惠券
          <span
            class="blue under-line"
          >点击发布评论></span>
        </div>
        <div class="renew">
          <div class="head-g">
            <img src="../../../../assets/img/active/deposit/num1.png" alt="数字1" />
            <div>
              <h3>续费尊享 看看你能省多少</h3>
              <p>
                已参与免费领云产品的用户续费享更多优惠
                <span>活动规则></span>
              </p>
            </div>
          </div>
          <div class="content">
            <div v-for="(item,index) in renewHostList" :key="index" class="item">
              <div class="icon-text">个人/企业续费优惠</div>
              <h4>{{item.cpu+'核'+item.memery+'G云服务器'}}</h4>
              <div class="box">
                <div class="left">
                  <div class="row">
                    <i>系统盘</i>
                    <div>
                      <span class="bold">{{item.ssd}}G SSD</span>
                    </div>
                  </div>
                  <div class="row">
                    <i>带宽</i>
                    <div>
                      <RadioGroup v-model="item.bandwidth" type="button" v-if="item.bandwidth!=5" @on-change="changeBandwith(item.bandwidth,item)">
                          <Radio  v-for="(item1,index) in item.bandwidthList" :key="index" :label="item1">{{item1}}M</Radio>
                      </RadioGroup>
                      <span class="bold" v-else>{{item.bandwidth}}M</span>
                    </div>
                  </div>
                  <div class="row">
                    <i>续费时长</i>
                    <div>
                      <Select v-model="item.time" style="width:200px">
                        <Option
                          v-for="item1 in item.timeList"
                          :value="item1"
                          :key="item1"
                        >{{ item1 }}</Option>
                      </Select>
                    </div>
                  </div>
                </div>
                <div class="right">
                  <div class="row">
                    <i>续费价：</i>
                    <div>
                      <span>¥{{item.price}}</span>
                    </div>
                  </div>
                  <div class="row">
                    <i>原价：¥{{item.originPrice}}</i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="update">
          <div class="head-g">
            <img src="../../../../assets/img/active/deposit/num2.png" alt="数字2" />
            <div>
              <h3>升级配置 立享优惠</h3>
              <p>
                已参与免费领云产品的用户，升级云服务器配置或带宽即可享受优惠
                <span>活动规则></span>
              </p>
            </div>
          </div>
          <div class="content">
            <div v-for="(item,index) in updateList" :key="index">
              <h4>{{item.name}}</h4>
              <div class="box">
                <div v-for="(item1,index) in item.configs" :key="index" class="item">
                  <div>
                    <span class="icon">升至</span>
                    {{item1.params}}
                  </div>
                  <p>
                    立享
                    <span>{{item1.discount}}</span>
                    折优惠
                  </p>
                </div>
              </div>
            </div>
          </div>
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
  data () {
    return {
      updateList: [
        {
          name: '云服务器任意配置升级至以下配置',
          configs: [
            {
              params: '2核8G',
              discount: '4'
            },
            {
              params: '4核8G',
              discount: '3'
            },
            {
              params: '4核16G',
              discount: '2.1'
            },
          ],
        },
        {
          name: '弹性IP任意配置升级至以下配置',
          configs: [
            {
              params: '5M带宽',
              discount: '3.5'
            },
            {
              params: '10M带宽',
              discount: '2.1'
            },
          ],
        }
      ],
      renewHostList: [
        {
          cpu: 2,
          memery: 4,
          ssd: '40',
          bandwidthList: [1, 2],
          bandwidth: 1,
          timeList: [24, 12, 6, 3, 1],
          time: 24,
          price: 1099.00,
          originPrice: 5201.28,
        },
        {
          cpu: 4,
          memery: 8,
          ssd: '40',
          bandwidthList: [5],
          bandwidth: 5,
          timeList: [24, 12, 6],
          time: 24,
          price: 1269.00,
          originPrice: 3112.31,
        },
      ],
      hotHostList: [
        {
          post: {
            servicetype: "host",
            bandwith: 2,
            cost: 69,
            cpu: 2,
            mem: 4,
            days: 30,
            disksize: 40,
            disktype: "ssd",
            id: 497
          },
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
          zoneList: [],
          zoneId: '',
          price: '69',
          originPrice: '176.72',
        },
        {
          post: {
            servicetype: "host",
            bandwith: 2,
            cost: 69,
            cpu: 2,
            mem: 8,
            days: 360,
            disksize: 40,
            disktype: "ssd",
            id: 497
          },
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
          zoneList: [],
          zoneId: '',
          price: '69',
          originPrice: '176.72',
        },
        {
          post: {
            servicetype: "host",
            bandwith: 2,
            certification: 3,
            cost: 69,
            cpu: 2,
            mem: 8,
            days: 360,
            disksize: 40,
            disktype: "ssd",
            id: 497
          },
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
          zoneList: [],
          zoneId: '',
          price: '69',
          originPrice: '176.72',
        },
        {
          post: {
            servicetype: "db",
            bandwith: 2,
            cost: 69,
            cpu: 2,
            mem: 8,
            days: 60,
            disksize: 40,
            disktype: "ssd",
            id: 497
          },
          systemList: [
            {
              value: 'mysql',
              label: 'mysql',
              children: [],
            },
            {
              value: 'redis',
              label: 'redis',
              children: []
            }, {
              value: 'postgresql',
              label: 'postgresql',
              children: [],
            }
         ],
          system: [],
          zoneList: [],
          zoneId: '',
          price: '69',
          originPrice: '176.72',
        },
        {
          post: {
            servicetype: "G5500",
            bandwith: 2,
            cost: 69,
            cpu: 2,
            mem: 8,
            days: 3,
            disksize: 40,
            disktype: "ssd",
            id: 497
          },
          postArr:[],
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
          zoneList: [],
          zoneId: '',
          price: '69',
          originPrice: '176.72',
          gpuConfigIndex: 0,
        },
      ],
    }
  },
  created () {
    this.getConfigureHot()
    this.getRenew()
    this.getUpgrade()
    // let url = 'activity/getActInfo.do'
    // axios.get(url, {
    //   params: {
    //     activityNum: '58'
    //   }
    // }).then(res => {})
  },
  mounted () {

  },
  methods: {
    // 获取活动配置,区域
    getConfigureHot () {
      let url = 'activity/getTemActInfoById.do'
      axios.get(url, {
        params: {
          activityNum: '57'
        }
      }).then(res => {
        if (res.data.status == 1 && res.status == 200) {
          let gpuConfigList = res.data.result.freevmconfigs.filter((item,index) => {
            return item.servicetype == 'G5500'
          })
          // console.log(gpuConfigList)
          this.hotHostList.forEach((item,index) => {
            item.post = res.data.result.freevmconfigs[index]
            if (item.post.servicetype == 'G5500') {
              item.zoneList = res.data.result.optionalAreaGpu
              item.postArr = gpuConfigList
            } else {
              item.zoneList = res.data.result.optionalArea
            }
            if(item.zoneList.length>0) {
              // 设置默认区域
              item.zoneId = item.zoneList[0].value
              // 设置默认系统
              this.changeZoneHost(item)
            }
        })
      }
      })
    },
    // 获取升级配置
    getUpgrade () {
      let url = 'activity/getUpgrade.do'
      axios.get(url, {
        params: {
          activityNum: '59'
        }
      }).then(res => {
        if (res.data.status == 1 && res.status == 200) {
         
        }
      })
    },
    // 获取升级配置
    getRenew () {
      let url = 'activity/getRenewal.do'
      axios.get(url, {
        params: {
          activityNum: '60'
        }
      }).then(res => {
        if (res.data.status == 1 && res.status == 200) {
         
        }
      })
    },
    changeZoneHot (item) {
      this.changeZoneHost(item)
      this.getPriceHot(item)
    },
    // 根据区域获得不同系统
    changeZoneHost (item) {
      let url = ''
      let systemType = ''
      let showName = ''
      if(item.post.servicetype == 'db') {
        url = 'database/listDbTemplates.do'
        systemType = 'mysql'
        showName = 'dbname'
      } else{
        url = 'information/listTemplates.do'
        systemType = 'window'
        showName = 'templatedescript'
      }
      axios.get(url, {
        params: {
          zoneId: item.zoneId,
        }
      }).then(res => {
        if (res.status == 200 && res.data.status == 1) {
          var x
          for (x in res.data.result) {
            item.systemList.forEach(item => {
              if (item.value == x) {
                item.children = res.data.result[x]
              }
            })
          }
          item.systemList.forEach(item => {
            item.children.forEach(item => {
              item.value = item.systemtemplateid
              item.label = item[showName]
            })
          })
          item.systemList.forEach((item, index) => {
            if (item.children.length == 0) {
              item.disabled = true
            }
          })
          // 设置默认系统
          item.system = [systemType, res.data.result[systemType][0].systemtemplateid]
        }
      })
    },
    getPriceHot (item) {
      let params = {}
      if(item.post.servicetype=='G5500'){
        params= {
            zoneId: item.zoneId,
            vmConfigId: item.post.id,
          }
      } else {
        params = {
          zoneId: item.zoneId,
          vmConfigId: item.post.id,
          month: item.post.days / 30
        }
      }
      axios.get('activity/getOriginalPrice.do', {
        params: params
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
          defzoneid: item.zoneId,
          vmConfigId: item.post.id,
          osType: item.system[1]
        }
      }).then(res => {
        if (res.status == 200 && res.data.status == 1) {
          this.$Message.success('创建订单成功')
          window.open('https://i.xinruiyun.cn/order','_self')
        } else {
          this.$message.info({
            content: res.data.message
          })
        }
      })
    },
    changConfigGPU(item) {
      item.post = item.postArr[item.gpuConfigIndex]
      this.getPriceHot(item)
    },
    changeBandwith(val,item) {
      if (val==2) {
        item.timeList = [30,90,180,360,720]
      } else {
        item.timeList = [360]
      }
    },
    month (val) {
      let text = ''
      if (val>=360) {
        text = '年'
        if(val/360>1) {
          text = val/360+'年'
        }
      } else if(val>=30){
        text = '月'
        if(val/30>1) {
          text = val/30+'个月'
        }
      } else {
        text = '天'
        if(val>1) {
          text = val+'天'
        }
      }
      return text
    },
    killTitle (val) {
      let result = ''
      switch (val.servicetype) {
        case 'host':
          if(val.days==360) {
            result = '包年云服务器'
          } else if(val.days==30)
            result = '包月云服务器'
          break
        case 'db':
          result = '云数据库'
          break
        case 'G5500':
          result = 'GPU服务器'
          break
        default:
          result = ''
      }
      
      return result
    },
  },
  computed: {
    authInfo () {
      return this.$store.state.authInfo ? this.$store.state.authInfo : null
    },
    authInfoPersion () {
      return this.$store.state.authInfoPersion
    },
    userInfo () {
      return this.$store.state.userInfo
    },
  },
  watch: {

  },
  components: {

  }
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
.under-line {
  text-decoration: underline;
}

.hot-host {
  .product {
    display: flex;
    justify-content: space-between;
    text-align: left;
    background: #fff;
    padding-bottom: 10px;
    > div {
      width: 224px;
      box-shadow: 0px 3px 10px -3px rgba(195, 205, 230, 0.7);
      border: 1px solid rgba(220, 226, 242, 1);
      &:nth-of-type(1) .head {
        background: url("../../../../assets/img/active/deposit/head-bg-1.png");
      }
      &:nth-of-type(2) .head{
        background: url("../../../../assets/img/active/deposit/head-bg-2.png");
      }
      &:nth-of-type(3) .head{
        background: url("../../../../assets/img/active/deposit/head-bg-3.png");
      }
      &:nth-of-type(4) .head{
        background: url("../../../../assets/img/active/deposit/head-bg-4.png");
      }
      &:nth-of-type(5) .head{
        background: url("../../../../assets/img/active/deposit/head-bg-5.png");
      }
    }
    .head {
      position: relative;
      padding: 0 46px 0 20px;
      height: 80px;
      display: flex;
      flex-direction: column; 
      justify-content: center;
      color: #fff;
      h3 {
        font-size: 18px;
      }
      p {
        margin-top: 6px;
        display: flex;
        justify-content: space-between;
      }
      >span {
        display: inline-block;
        line-height: 20px;
        font-size: 12px;
        text-align: center;
        &:nth-of-type(1) {
          position: absolute;
          right: 0;
          top: 0;
        }
      }
      .cer {
        width: 86px;
        background:linear-gradient(270deg,rgba(255,57,42,1) 0%,rgba(255,189,118,1) 100%);
        color: #fff;
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
        margin-bottom: 10px;
      }
      .label {
        display: block;
        margin-bottom: 7px;
        width: 70px;
        font-size: 12px;
        color: #222274;
      }
      .configure {
        // margin-bottom: 10px;
        ul {
          display: flex;
          justify-content: space-between;
          li {
              color: #0F0F68;
              font-size: 12px;
            i {
              margin-bottom: 10px;
              display: block;
              font-style: normal;
            }
          }
        }
      }
      // .time {
      //   ul {
      //     display: flex;
      //     flex-wrap: wrap;
      //     justify-content: space-between;
      //     li {
      //       position: relative;
      //       width: 110px;
      //       height: 34px;
      //       margin-bottom: 10px;
      //       line-height: 32px;
      //       border-radius: 2px;
      //       border: 1px solid rgba(125, 161, 217, 1);
      //       text-align: center;
      //       color: #4b3c3d;
      //       cursor: pointer;
      //       &:nth-child(3n + 3) {
      //         margin-right: 0;
      //       }
      //       span {
      //         position: absolute;
      //         top: -14px;
      //         right: 5px;
      //         display: inline-block;
      //         width: 38px;
      //         height: 20px;
      //         background: rgba(246, 109, 89, 1);
      //         font-size: 14px;
      //         color: rgba(255, 255, 255, 1);
      //         line-height: 19px;
      //       }
      //     }
      //     .selected {
      //       background: rgba(56, 125, 255, 1);
      //       color: #fff;
      //     }
      //   }
      // }
      .mb15{
        margin-bottom: 15px;
      }
      .mt5 {
        margin-top: 5px;
      }
      .price {
        color: #e70520;
        font-size: 14px;
        span {
          font-size: 24px;
          font-weight: bold;
        }
      }
      .origin-price {
        font-size: 14px;
        color: #0f0f68;
      }
      .line-thr{
        text-decoration: line-through;
      }
      button {
        width: 100%;
        background: #f66d59;
        border: none;
        border-radius: 0px;
        color: #fff;
        height: 40px;
        font-size: 16px;
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
.head-g {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  > div {
    margin-left: 20px;
    h3 {
      margin-bottom: 10px;
      font-size: 20px;
      font-weight: bold;
      color: rgba(71, 104, 177, 1);
      line-height: 1;
    }
    p {
      font-size: 14px;
      color: rgba(102, 102, 102, 1);
      line-height: 1;
      span {
        color: #5893ff;
      }
    }
  }
}
.renew {
  margin-top: 40px;
  text-align: left;
  .content {
    display: flex;
    justify-content: space-between;
    background: url("../../../../assets/img/active/deposit/right-top-icon.png")
      no-repeat top right;
    .item {
      width: 583px;
      padding: 20px 0 20px 20px;
      box-shadow: 0px 3px 10px -3px rgba(195, 205, 230, 0.7);
      background: #fff;
    }
    .icon-text {
      float: right;
      width: 110px;
      height: 100px;
      transform: rotate(0.125turn);
      transform-origin: 40px 34px;
      color: #fff;
    }
    h4 {
      font-size: 20px;
      font-weight: bold;
      color: rgba(79, 85, 123, 1);
      line-height: 26px;
    }
    .box {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      // padding-right: 50px;
    }
    .left,
    .right {
      .row {
        display: flex;
        margin-top: 10px;
        i {
          display: inline-block;
          font-size: 12px;
          font-style: normal;
          color: rgba(102, 102, 102, 1);
          line-height: 30px;
          vertical-align: middle;
        }
        span {
          line-height: 30px;
        }
      }
    }
    .left {
      // margin-right: 100px;
      .row {
        i {
          width: 76px;
        }
        .bold {
          font-weight: bold;
        }
      }
    }
    .right {
      span {
        font-size: 22px;
        font-weight: bold;
        color: rgba(255, 98, 75, 1);
      }
    }
  }
}
.update {
  padding-top: 20px;
  text-align: left;
  .content {
    display: flex;
    justify-content: space-between;
    text-align: center;
    > div {
      width: 583px;
      background: #fff;
      padding: 30px 0;
      box-shadow: 0px 3px 10px -3px rgba(195, 205, 230, 0.7);
    }
    h4 {
      font-size: 20px;
      font-weight: bold;
      color: rgba(79, 85, 123, 1);
      line-height: 1;
    }
    .box {
      display: flex;
      justify-content: center;
      margin-top: 40px;
      .item {
        padding: 0 30px;
        color: rgba(71, 104, 177, 1);
        border-left: 1px rgba(216, 216, 216, 1) solid;
        &:nth-of-type(1) {
          border: none;
        }
        div {
          margin-bottom: 10px;
          font-size: 20px;
          line-height: 24px;
          .icon {
            display: inline-block;
            width: 39px;
            height: 24px;
            background: rgba(71, 104, 177, 1);
            border-radius: 12px 12px 0px 12px;
            color: #fff;
            font-size: 14px;
            line-height: 24px;
          }
        }
        p {
          font-size: 16px;
          span {
            color: #ff624b;
          }
        }
      }
    }
  }
}
</style>
