<template>
  <div>
    <div class="free-host">
      <div class="wrap">
        <img class="pc" src="../../../../assets/img/active/freeToReceive.1/free-host-text.png" />
        <img class='mobile' src="../../../../assets/img/active/deposit/m-banner.png" />
        <div class="main">
          <div class="tabs">
            <div :class="{selected:currentView=='child1'}">
              <span class="bar"></span>
              <a href="javascript:void(0)" @click="tabChange(child1)">免费领云产品</a>
            </div>
            <div :class="{selected:currentView=='child2'}">
              <span class="bar"></span>
              <a href="javascript:void(0)" @click="tabChange(child2)">天天特惠活动</a>
            </div>
          </div>
          <div :is="currentView" class="container"></div>
        </div>
      </div>
    </div>
    <div class="summary-host">
        <div class="wrap">
          <div class="headline">
            <h2>云服务器大集合</h2>
            <p>你想要的云服务器都在这里</p>
          </div>
          <div class="product">
            <div>
              <div class="head">
                <h3>云服务器/GPG服务器</h3>
              </div>
              <div class="body">
                <div class="left">
                  <RadioGroup v-model="single" size="large">
                    <Radio label="选择云服务器" style="color:#4768B1;margin-bottom:20px;font-size:18px;"></Radio>
                    <div class="configure">
                      <ul>
                        <li
                          v-for="(item,index) in configureList"
                          :key="index"
                          :class="{'selected':selectConfig==item.cpu+','+item.mem}"
                          @click="changConfigHost(item.cpu+','+item.mem)"
                        >{{ item.cpu+'核'+item.mem+'G'}}</li>
                      </ul>
                      <span class="tips">*以上配置皆包含40G SSD系统盘</span>
                    </div>
                    <Radio
                      label="选择GPU服务器"
                      style="color:#4768B1;margin-top:40px;margin-bottom:20px;font-size:18px;"
                    ></Radio>
                    <div ref="summary-host-select">
                      <Select
                        v-model="selectConfig"
                        placeholder=" "
                        @on-change="changConfigGPU"
                      >
                        <Option
                          v-for="(item,index) in gpuConfigList"
                          :value="item.cpu+','+item.mem+','+item.num"
                          :key="index"
                        >{{ item.cpu+'核'+item.mem+'G'+item.num+' *NVIDIA_P100' }}</Option>
                      </Select>
                    </div>
                  </RadioGroup>
                  <div class="area" v-if="configLength==2">
                    <span class="label">区域选择</span>
                    <ul>
                      <li
                        v-for="(item,index) in hostZoneList"
                        :key="index"
                        :class="{'selected':selectZone==item.zoneid}"
                        @click="changzone(item.zoneid)"
                      >{{item.zonename}}</li>
                    </ul>
                  </div>
                  <div class="area" v-else>
                    <span class="label">区域选择</span>
                    <ul>
                      <li
                        v-for="(item,index) in gpuZoneList"
                        :key="index"
                        :class="{'selected':selectZone==item.zoneid}"
                        @click="changzone(item.zoneid)"
                      >{{item.zonename}}</li>
                    </ul>
                  </div>
                </div>
                <div class="right">
                  <div>
                    <span class="label">带宽选择</span>
                    <Select v-model="selectBandWidth">
                      <Option v-for="item in bandWidthList" :value="item" :key="item">{{item}}M</Option>
                    </Select>
                  </div>
                  <div>
                    <span class="label">系统选择</span>
                    <Cascader
                      :data="summarySystemList"
                      v-model="selectSummarySystem"
                    ></Cascader>
                  </div>
                  <div class="ssd">
                    <span class="label">SSD数据盘</span>
                    <ul>
                      <li
                        v-for="(item,index) in ssdList"
                        :key="index"
                        :class="{'selected':selectedSSD==item}"
                        @click="selectedSSD=item"
                      >{{item}}G</li>
                    </ul>
                  </div>
                  <div>
                    <span class="label">购买时长</span>
                    <Select v-model="selectTime">
                      <Option
                        v-for="(item,index) in hostTimeList"
                        :value="item"
                        :key="index"
                      >{{item<12?item+'月':item/12+'年'}}</Option>
                    </Select>
                  </div>
                  <div>
                    <span class="label">购买数量</span>
                    <InputNumber :max="10" :min="1" v-model="count"></InputNumber>
                  </div>
                  <div class="price">
                    ￥
                    <span>{{(totalDataCost*count).toFixed(2)}}</span>
                  </div>
                  <Button @click="pushOrderHost()" v-if="configLength==2">立即购买</Button>
                  <Button @click="pushOrderGpu()" v-else>立即购买</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script type="text/ecmascript-6">
import child1 from './freeHost';
import child2 from './lowDiscount';
import axios from 'axios'
import reg from '../../../../util/regExp'
import VueQArt from 'vue-qart'
import $ from 'jquery'
export default {
  data () {
    return {
      child1: 'child1',
      child2: 'child2',
      currentView: 'child1',
      // 云服务器大集合参数
      single: '选择云服务器',
      vmCost: 0,
      vmCoupon: 0,
      dataDiskCost: 0,
      coupon: 0,
      ipCost: 0,
      ipCoupon: 0,
      selectSummarySystem: [],
      summarySystemList: [{
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
      hostZoneList: [],
      gpuZoneList: [],
      selectZone: '',
      configureList: [
        { cpu: 1, mem: 1 },
        { cpu: 1, mem: 2 },
        { cpu: 2, mem: 4 },
        { cpu: 4, mem: 8 },
        { cpu: 8, mem: 16 },
        { cpu: 16, mem: 32 },
        { cpu: 32, mem: 64 },
        { cpu: 64, mem: 256 }
      ],
      gpuConfigList: [
        { cpu: 8, mem: 64, num: 1 },
        { cpu: 16, mem: 128, num: 2 },
        { cpu: 16, mem: 192, num: 3 },
        { cpu: 32, mem: 256, num: 4 },
        { cpu: 64, mem: 384, num: 6 },
      ],
      selectConfig: '1,1',
      configLength: 2,
      bandWidthList: [1, 2, 5, 10, 20],
      selectBandWidth: 1,
      hostTimeList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 24, 36],
      selectTime: 1,
      ssdList: [0, 20, 50, 100, 500],
      selectedSSD: 0,
      count: 1,
      // 结束
    }
  },
  created () {
    this.getZoneList()
  },
  mounted () {

  },
  methods: {
    tabChange (tabItem) {
      this.currentView = tabItem;
    },
     init () {
      axios.get('user/GetUserInfo.do').then(response => {
        if (response.status == 200 && response.data.status == 1) {
          this.$store.commit('setAuthInfo', { authInfo: response.data.authInfo, userInfo: response.data.result, authInfoPersion: response.data.authInfo_persion })
        }
      })
    },
    // 获取活动配置,区域
    getConfigureDeposit () {
      let url = 'activity/getTemActInfoById.do'
      axios.get(url, {
        params: {
          activityNum: '50'
        }
      }).then(res => {
        if (res.data.status == 1 && res.status == 200) {
          // console.log(res.data.result.freevmconfigs)
          let responseData = res.data.result.freevmconfigs
          // 获取区域列表
          this.zoneListDeposit = res.data.result.optionalArea
          this.depositList.forEach((item, index) => {
            item.config = responseData[index]
            this.changgeZoneDeposite(item, this.zoneListDeposit[0], index, 'depositList')
          })
        }
      })
    },
    changgeZoneDeposite (item, item1, index, name) {
      item.zone = item1.value
      this.changeZoneHost(item, index, name)
      this.getPriceDeposit(item)
    },
    getPriceDeposit (item) {
      axios.get('activity/getOriginalPrice.do', {
        params: {
          zoneId: item.zone,
          vmConfigId: item.config.id,
          month: item.config.days / 30
        }
      }).then(res => {
        if (res.status == 200 && res.data.status == 1) {
          item.cashPledge = res.data.result.cost;
          item.originPrice = res.data.result.originalPrice;
        }
      })
    },
    nextStep () {
      // 判断新老用户
      axios.get('activity/jdugeTeam.do', {
        params: { 
          sign: 'freeReceive',
          vmConfigId: this.depositList[this.index1].config.id
         }
      }).then(response => {
        if (response.status == 200 && response.data.status == 1) {
          if (response.data.result.flag) {
            this.orderData = []
            this.orderData.push({
              productType: '云服务器',
              configs: this.depositList[this.index1],
              originalPrice: this.depositList[this.index1].originPrice,
              time: this.time,
              title: this.depositList[this.index1].headline,
              cashPledge: Number(this.cashPledge)
            })
            this.showModal.rechargeHint = false
            this.showModal.orderConfirmationModal = true
          } else {
            this.inConformityModalMsg = response.data.result.info
            this.showModal.rechargeHint = false
            this.showModal.inConformityModal = true
          }
        } else {
          this.$message.info({
            content: response.data.message
          })
        }
      })
    },
    getHost_ok () {
      if (this.payWay == 'balancePay') {
        if (this.balance < this.cashPledge) {
          this.$Message.info('可用余额不足')
        } else {
          this.showModal.orderConfirmationModal = false
          this.getFreeHost()
        }
      } else {
        switch (this.otherPayWay) {
          case '':
            this.$Message.info('请选择一个支付方式')
            break
          case 'zfb':
            window.open(`/zfb/alipayapi.do?total_fee=${this.cashPledge}`)
            this.pageTimer = setInterval(() => {
              axios.get('activity/compareForMoney.do', {
                params: { freezeMoney: this.cashPledge }
              }).then(val => {
                if (val.data.status == 1) {
                  this.showModal.orderConfirmationModal = false
                  clearInterval(this.pageTimer)
                  this.showModal.paySuccessModal = true
                }
              })
            }, 2000)
            break
          case 'wx':
            clearInterval(this.pageTimer)
            axios.get('wx/wxpayapi.do', {
              params: {
                total_fee: this.cashPledge
              }
            }).then(response => {
              if (response.status == 200 && response.data.status == 1) {
                this.serialNum = response.data.result.serialNum
                this.config.value = response.data.result.codeUrl
                this.showModal.orderConfirmationModal = false
                this.showModal.weChatRechargeModal = true
              } else {
                this.$message.info({
                  content: response.data.message
                })
              }
            })
            break
        }
      }
    },
    payWayChange () {
      if (this.payWay == 'otherPay' && this.otherPayWay == '') {
        this.otherPayWay = 'zfb'
      } else if (this.payWay == 'balancePay') {
        this.otherPayWay = ''
      }
    },
    getFreeHost () {
      this.showModal.paySuccessModal = false
     
      let url = 'activity/getFreeHostNew.do'
        axios.get(url, {
          params: {
            vmConfigId: this.depositList[this.index1].config.id,
            osType: this.depositList[this.index1].system[1],
            defzoneid: this.depositList[this.index1].zone
          }
        }).then(res => {
          if (res.status == 200 && res.data.status == 1) {
            this.showModal.getSuccessModal = true
            this.toggleZone(this.depositList[this.index1].zone)
          } else {
            this.$message.info({
              content: res.data.message
            })
          }
        })
    },
    toggleZone (zoneId) {
      // 切换默认区域
      axios.get('user/setDefaultZone.do', { params: { zoneId: zoneId } }).then(response => {
      })
      for (var zone of this.$store.state.zoneList) {
        if (zone.zoneid == zoneId) {
          $store.commit('setZone', zone);
        }
      }
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
        // this.$message.info({
        //       content: '未实名认证'
        //     })
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
          window.open('https://i.xinruiyun.cn/order','_self')
        } else {
          this.$message.info({
            content: res.data.message
          })
        }
      })
    },
    judgeUserFlow () {
      this.$http.get('user/GetUserInfo.do', { params: { t: new Date().getTime() } }).then(res => {
        if (res.data.status === 1) {
          if (res.data.authInfo && res.data.authInfo.status) {
            this.onStep = res.data.authInfo.status
          } else {
            this.onStep = 1
          }
        } else {
          this.onStep = 0
        }
      })
    },
    month (val) {
      return val >= 360 ? val / 360 + '年' : val / 30 + '个月'
    },
    // 快速认证时发送验证码
    sendCode () {
      this.$refs.sendCode.validate(validate => {
        if (validate) {
          axios.get('user/code.do', {
            params: {
              aim: this.quicklyAuthForm.phone,
              isemail: 0,
              vailCode: this.quicklyAuthForm.pictureCode
            }
          }).then(response => {
            // 发送成功，进入倒计时
            if (response.status == 200 && response.data.status == 1) {
              var countdown = 60
              this.quicklyAuthForm.sendCodeText = `重新发送(${countdown})S`
              var Interval = setInterval(() => {
                countdown--
                this.quicklyAuthForm.sendCodeText = `重新发送(${countdown})S`
                if (countdown == 0) {
                  clearInterval(Interval)
                  this.quicklyAuthForm.sendCodeText = '获取验证码'
                }
              }, 1000)
            } else {
              this.$Message.error(response.data.message)
            }
          })
        }
      })
    },
    // 快速认证
    quicklyAuth () {
      var quicklyAuth = this.$refs.quicklyAuth.validate(validate => {
        return Promise.resolve(validate)
      })
      var sendCode = this.$refs.sendCode.validate(validate => {
        return Promise.resolve(validate)
      })
      Promise.all([quicklyAuth, sendCode]).then(results => {
        if (results[0] === true && results[1] === true) {
          axios.post('user/personalAttest.do', {
            cardID: this.quicklyAuthForm.IDCard,
            name: this.quicklyAuthForm.name,
            phone: this.quicklyAuthForm.phone,
            phoneCode: this.quicklyAuthForm.validateCode,
            type: '0'
          }).then(response => {
            if (response.status == 200 && response.data.status == 1) {
              this.showModal.authentication = false
              this.showModal.authenticationSuccess = true
              this.init()
            } else {
              this.showModal.authenticationError = true
              this.authErrorText = response.data.message
            }
          })
        }
      })
    },
    isPay () {
      axios.get('user/payStatus.do', {
        params: {
          serialNum: this.serialNum
        }
      }).then(response => {
        this.showModal.weChatRechargeModal = false
        if (response.status == 200 && response.data.status == 1) {
          this.showModal.paySuccessModal = true
        } else {
          this.showModal.payDefeatedModal = true
        }
      })
    },
    changConfigHost (config) {
      let originLength = this.configLength
      this.configLength = config.split(',').length
      this.selectConfig = config
      if (this.configLength != originLength) {
        // console.log('进入2')
        this.changzone(this.hostZoneList[0].zoneid)
      }
    },
    changConfigGPU (config) {
      let originLength = this.configLength
      this.configLength = config.split(',').length
      this.selectConfig = config
      if (this.configLength != originLength) {
        // console.log('进入3')
        this.changzone(this.gpuZoneList[0].zoneid)
      }
    },
    changzone (zoneid) {
      this.selectZone = zoneid
      this.setTemplateHost(zoneid)
    },
    getZoneList () {
      axios.get('information/zone.do', { params: { t: new Date().getTime() } }).then(res => {
        if (res.status == 200 && res.data.status == 1) {
          this.hostZoneList = res.data.result.filter(item => {
            return item.gpuserver == 0
          })
          this.gpuZoneList = res.data.result.filter(item => {
            return item.gpuserver == 1
          })
          this.changzone(this.hostZoneList[0].zoneid)
          this.queryCustomVM()
          this.queryDiskPrice()
          this.queryIPPrice()
        }
      })
    },
    // 查询自定义云服务器价格
    queryCustomVM () {
      var params = {}
      if (this.selectConfig.split(',').length == 3) {
        //gpu
        params = {
          cpuNum: this.selectConfig.split(',')[0],
          diskSize: '128',
          diskType: 'ssd',
          memory: this.selectConfig.split(',')[1],
          timeType: this.selectTime < 12 ? 'month' : 'year',
          timeValue: this.selectTime < 12 ? this.selectTime : this.selectTime / 12,
          zoneId: this.selectZone,
          gpu: '100',
          gpuSize: this.selectConfig.split(',')[2],
        }
      } else if (this.selectConfig.split(',').length == 2) {
        // 云服务器
        params = {
          cpuNum: this.selectConfig.split(',')[0],
          diskSize: '40',
          diskType: 'ssd',
          memory: this.selectConfig.split(',')[1],
          timeType: this.selectTime < 12 ? 'month' : 'year',
          timeValue: this.selectTime < 12 ? this.selectTime : this.selectTime / 12,
          zoneId: this.selectZone,
        }
      }
      axios.post('device/QueryBillingPrice.do', params).then(response => {
        this.vmCost = response.data.cost
        if (response.data.coupon) {
          this.vmCoupon = response.data.coupon
        } else {
          this.vmCoupon = 0
        }
      })
    },
    // 磁盘页面数据盘价格
    queryDiskPrice () {
      var params = {
        cpuNum: '0',
        diskSize: this.selectedSSD,
        diskType: 'ssd',
        memory: '0',
        timeType: this.selectTime < 12 ? 'month' : 'year',
        timeValue: this.selectTime < 12 ? this.selectTime : this.selectTime / 12,
        zoneId: this.selectZone,
      }
      axios.post('device/QueryBillingPrice.do', params).then(response => {
        this.dataDiskCost = response.data.cost
        if (response.data.coupon) {
          this.coupon = response.data.coupon
        } else {
          this.coupon = 0
        }
      })
    },
    // 查询数据库IP价格
    queryIPPrice () {
      var params = {
        brand: this.selectBandWidth,
        timeType: this.selectTime < 12 ? 'month' : 'year',
        timeValue: this.selectTime < 12 ? this.selectTime : this.selectTime / 12,
        zoneId: this.selectZone
      }
      axios.post('device/queryIpPrice.do', params).then(response => {
        this.ipCost = response.data.cost
        if (response.data.coupon) {
          this.ipCoupon = response.data.coupon
        } else {
          this.ipCoupon = 0
        }
      })
    },
    pushOrderGpu () {
      if (!this.$store.state.userInfo) {
        this.$LR({ type: 'register' })
        return
      }
      let params = {
        zoneId: this.selectZone,
        templateId: this.selectSummarySystem[1],
        bandWidth: this.selectBandWidth,
        timeType: this.selectTime < 12 ? 'month' : 'year',
        timeValue: this.selectTime < 12 ? this.selectTime : this.selectTime / 12,
        count: this.count,
        isAutoRenew: '1',
        cpuNum: this.selectConfig.split(',')[0],
        memory: this.selectConfig.split(',')[1],
        networkId: 'no',
        rootDiskType: 'ssd',
        vpcId: 'no',
        gpusize: this.selectConfig.split(',')[2],
        serviceType: 'G5500',
        diskType: 'ssd',
        diskSize: this.selectedSSD
      }
      // console.log(params)
      axios.get('gpuserver/createGpuServer.do', { params }).then(response => {
        if (response.status == 200 && response.data.status == 1) {
          window.open('https://i.xinruiyun.cn/order','_self')
        } else {
          this.$message.info({
            content: response.data.message
          })
        }
      })
    },
    // 购买云服务器
    pushOrderHost () {
      if (!this.$store.state.userInfo) {
        this.$LR({ type: 'register' })
        return
      }
      let params = {
        zoneId: this.selectZone,
        templateId: this.selectSummarySystem[1],
        bandWidth: this.selectBandWidth,
        timeType: this.selectTime < 12 ? 'month' : 'year',
        timeValue: this.selectTime < 12 ? this.selectTime : this.selectTime / 12,
        count: this.count,
        isAutoRenew: '1',
        cpuNum: this.selectConfig.split(',')[0],
        memory: this.selectConfig.split(',')[1],
        networkId: 'no',
        rootDiskType: 'ssd',
        vpcId: 'no',
        diskType: 'ssd',
        diskSize: this.selectedSSD
      }
      // console.log(params)
      axios.get('information/deployVirtualMachine.do', { params }).then(response => {
        if (response.status == 200 && response.data.status == 1) {
          window.open('https://i.xinruiyun.cn/order','_self')
        } else {
          this.$message.info({
            content: response.data.message
          })
        }
      })
    },
    setTemplateHost (zoneId) {
      axios.get('information/listTemplates.do', {
        params: {
          zoneId: zoneId,
        }
      }).then(res => {
        if (res.status == 200 && res.data.status == 1) {
          var obj = this.cascaderSystemM(res.data.result, this.summarySystemList, this.selectSummarySystem)
          this.selectSummarySystem = obj
        }
      })
    },
    // 处理级联选择组件需要的数据格式
    cascaderSystemM (responseData, obj, selectobj) {
      var x;
      for (x in responseData) {
        obj.forEach(item => {
          if (item.value == x) {
            item.children = responseData[x]
          }
        })
      }
      obj.forEach(item => {
        item.children.forEach(item => {
          item.value = item.systemtemplateid
          item.label = item.templatename
        })
      })
      // 为空的系统不能点击
      obj.forEach((item, index) => {
        if (item.children.length == 0) {
          item.disabled = true
        }
      })
      selectobj = ['window', responseData.window[0].systemtemplateid]
      return selectobj
    },
    
  },
  computed: {
    totalDataCost () {
      return this.vmCost + this.ipCost + this.dataDiskCost
    },
  },
  watch: {
    'selectZone': {
      handler () {
        this.queryCustomVM()
        this.queryDiskPrice()
        this.queryIPPrice()
      },
      deep: true
    },
    'selectTime': {
      handler () {
        this.queryCustomVM()
        this.queryDiskPrice()
        this.queryIPPrice()
      },
      deep: true
    },
    'selectConfig': {
      handler () {
        this.queryCustomVM()
      },
      deep: true
    },
    'selectedSSD': {
      handler () {
        this.queryDiskPrice()
      },
      deep: true
    },
    'selectBandWidth': {
      handler () {
        this.queryIPPrice()
      },
      deep: true
    },
    // select组件，选中的值不在选项中，不清空选中数据的bug
    'configLength': {
      handler (val) {
        if (val == 2) {
          this.single = '选择云服务器'
          let dom = this.$refs['summary-host-select']
          dom.getElementsByClassName('ivu-select-placeholder')[0].style.display = "block"
          dom.getElementsByClassName('ivu-select-selected-value')[0].style.display = "none"
        } else if (val == 3) {
          this.single = '选择GPU服务器'
          let dom = this.$refs['summary-host-select']
          dom.getElementsByClassName('ivu-select-placeholder')[0].style.display = "none"
          dom.getElementsByClassName('ivu-select-selected-value')[0].style.display = "block"
        }
      },
      deep: true
    },
    'single': {
      handler (val) {
        if (val == '选择云服务器') {
          this.changConfigHost('1,1')
        } else if (val == '选择GPU服务器') {
          this.changConfigGPU('8,64,1')
        }
      },
      deep: true
    }
  },
  components: {
    child1,
    child2,
  }
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
.wrap {
  margin: 0 auto;
  width: 1260px;
}
.headline {
  padding: 50px 0 30px 0;
  color: #0f0f68;
  line-height: 1;
  h2 {
    font-size: 32px;
  }
  p {
    margin-top: 12px;
    font-size: 16px;
  }
}
.free-host {
  margin: 0 auto;
  padding: 60px 0 40px;
  background: url("../../../../assets/img/active/freeToReceive.1/free-host-bg.png")
      top no-repeat,
    url("../../../../assets/img/active/freeToReceive.1/circle-left.png") 0% 500px 
      no-repeat,
    url("../../../../assets/img/active/freeToReceive.1/circle-right.png") 100%
      800px no-repeat;
  background-color: #395fc5;
  text-align: center;
  .main {
    margin-top: 40px;
  }
  .tabs {
    display: flex;
    > div {
      flex-grow: 1;
      &.selected {
        span {
          background: linear-gradient(
            160deg,
            rgba(145, 255, 223, 1) 0%,
            rgba(69, 191, 255, 1) 100%
          );
        }
        a {
          background: rgba(242, 248, 255, 1);
        }
      }
      span {
        display: block;
        height: 6px;
      }
      a {
        display: block;
        height: 64px;
        line-height: 64px;
        font-size: 20px;
        font-family: MicrosoftYaHei;
        font-weight: bold;
        color: rgba(52, 57, 101, 1);
        background: rgba(218, 221, 237, 1);
      }
    }
  }
  .container {
    width: 100%;
    padding: 30px 10px 30px 30px;
    background: rgba(242, 248, 255, 1);
  }
}
.summary-host {
  line-height: 1;
  padding-bottom: 40px;
  text-align: center;
  // height: 839px;
  padding-bottom: 50px;
  background: #f2f8ff
    url("../../../../assets/img/active/freeToReceive.1/summary-host-bg.png") center
    no-repeat;
    background-size:cover; 
  .product {
    text-align: left;
    > div {
    margin: 0 auto;
      width: 1120px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 6px 20px -6px rgba(13, 48, 130, 0.49);
      border-radius: 8px;
    }
    .head {
      height: 80px;
      padding-left: 40px;
      line-height: 80px;
      color: #fff;
      background: url("../../../../assets/img/active/freeToReceive.1/summary-product-bg.png")
        no-repeat;
      background-size: 100%;
      h3 {
        font-size: 22px;
      }
      span {
        font-size: 14px;
      }
    }
    .body {
      padding: 0 40px;
      background: #fff;
      display: flex;
      justify-content: space-between;
      .label {
        display: block;
        margin-bottom: 20px;
        font-size: 18px;
        color: #4768b1;
      }
      .left {
        padding-top: 40px;
        width: 50%;
        > div {
          margin-bottom: 40px;
        }
      }
      .right {
        padding-top: 20px;
        padding-bottom: 30px;
        > div {
          margin-bottom: 20px;
        }
      }
      .configure,
      .area,
      .ssd {
        ul {
          display: flex;
          flex-wrap: wrap;
          width: 100%;
          li {
            width: 110px;
            height: 34px;
            margin-right: 12px;
            margin-bottom: 20px;
            line-height: 32px;
            border-radius: 2px;
            border: 1px solid rgba(125, 161, 217, 1);
            text-align: center;
            color: #4b3c3d;
            cursor: pointer;
            font-size: 14px;
          }
          .selected {
            background: #387dff;
            color: #fff;
          }
        }
      }
      .configure,
      .area {
        ul {
          li {
            &:nth-child(4n) {
              margin-right: 0;
            }
          }
        }
      }
      .configure {
        .tips {
          color: #4768b1;
          font-size: 14px;
        }
      }
      .ssd {
        ul {
          li {
            margin-bottom: 0;
            width: 74px;
            &:nth-child(5n) {
              margin-right: 0;
            }
          }
        }
      }
      .price {
        color: #e70520;
        font-size: 14px;
        span {
          font-size: 24px;
          font-weight: bold;
        }
      }
      button {
        width: 100%;
        background: #f66d59;
        border-radius: 4px;
        border: none;
        color: #fff;
        height: 40px;
        font-size: 18px;
      }
    }
  }
}
@media screen and (max-width: 1281px) {
  .wrap {
    width: 100%;
  }
  .summary-host {
    .wrap {
      width: 100%;
    }
    .product {
      >div {
        width: 95%;
      }
      .body {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    }
  }
}
@media screen and (min-width: 1280px) {
  .wrap {
    width: 1260px;
  }
  
}
@media screen and (max-width: 1020px) {
  .pc {
    display: none;
  }
  .mobile {
    display: inline-block;
  }
}
@media screen and (min-width: 1021px) {
  .pc {
    display: inline-block;
  }
  .mobile {
    display: none;
  }
}

@media screen and (max-width: 540px) {
  .summary-host {
    .product {
      .body {
        padding: 0 10px;
        .left {
          width: 100%;
          // padding: 0 2px;
        }
      }
    }
  }
}



</style>
