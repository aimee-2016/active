<template>
  <div>
    <div class="hot-host">
      <div class="wrap">
        <div class="product">
          <div v-for="(item,index) in allList" :key="index">
            <div class="head">
                <h3>{{killTitle(item)}}
                <span v-if="item.post.servicetype!='ticket'">{{item.post.cpu+'核'+item.post.mem+'G'}}</span></h3>
            </div>
            <div class="body" v-if="item.post.servicetype!='ticket'">
              <div>
                <span class="label">带宽：</span>
                {{item.post.bandwith}}M
              </div>
              <div v-if="item.post.servicetype=='G5500'">
                <span class="label">配置：</span>
                {{item.post.gpusize}}* NVIDIA P100
              </div>
              <div>
                <span class="label">区域：</span>
                <Select
                  v-model="item.zoneId"
                  style="width:142px"
                  @on-change="changeZoneHot(item)"
                >
                  <Option
                    v-for="item1 in item.zoneList"
                    :value="item1.value"
                    :key="item1.value"
                  >{{ item1.name }}</Option>
                </Select>
              </div>
              <div>
                <span class="label">系统：</span>
                <Cascader :data="item.systemList" v-model="item.system" style="width:142px;"></Cascader>
              </div>
              <div class="time">
                <span class="label">时长：</span>
                 <i v-if="item.postArr.length<2" style="font-style:normal">
                  {{month(item.post.days)}}
                </i>
                <ul v-else>
                  <li
                    v-for="(item1,index1) in item.postArr"
                    :key="index1"
                    :class="{'selected':item.post.days==item1.days}"
                    @click="changgeTimeHot(item,item1)"
                  >
                    {{month(item1.days)}}
                    <!-- <span>{{item1.discount}}折</span> -->
                  </li>
                </ul>
              </div>
              <div class="price">
                价格：￥
                <span>{{item.price}}</span>
              </div>
              <!-- <div class="origin-price">
                原价：￥
                <span>{{item.originPrice+'/'+month(item.time)}}</span>
              </div> -->
              <Button @click="pushOrderHot(item)">立即抢购</Button>
            </div>
            <div class="body coupen" v-else>
              <div>
                <span class="label" style="width:70px">抵扣金额：</span>
                {{item.post.money}}元
              </div>
              <div>
                <span class="label" style="width:70px">使用条件：</span>
                无门槛
              </div>
              <div>
                <span class="label" style="width:70px">使用方法：</span>
                <div>购买域名时抵扣</div>
              </div>
              <div>
                <span class="label" style="width:70px">使用时间：</span>
                <div>自领取之日1个月内使用</div>
              </div>
              <Button @click="pushOrderHot(item)">立即抢购</Button>
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
      allList: [],
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
          postArr: [],
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
          postArr: [],
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
          postArr: [],
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
          postArr: [],
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
          postArr: [],
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
          postArr: [],
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
          postArr: [],
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
      ],
      gpuList: [
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
          postArr: [],
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
      ],
      zoneListHot: [],
      coupenList: [
        {post: {}}
      ],
    }
  },
  created() {
    
    this.promise()
  },
  mounted() {

  },
  methods: {
    promise() {
      let reshost = axios.get('activity/getActInfo.do', {
        params: {
          activityNum: '58'
        }
      })
      let resgpu = axios.get('activity/getActInfo.do', {
        params: {
          activityNum: '61'
        }
      })
      let rescoupen = axios.get('activity/getActTicket.do', {
        params: {
          activityNum: '62'
        }
      })
      Promise.all([reshost,resgpu,rescoupen]).then(res => {
        if (res[0].status == 200 && res[0].data.status == 1 && res[1].status == 200 && res[1].data.status == 1 && res[2].status == 200 && res[2].data.status == 1) {
          // this.$Message.success('订单提交成功')
          // this.$router.push({
          //   path: '/order', query: {
          //     countOrder
          //   }
          // })
          this.getConfigureHot(res[0])
          this.getConfigureGPU(res[1])
          this.getCoupen(res[2])
        }
      })

    },
    // 获取活动配置,区域
    getConfigureHot (res) {
      // let url = 'activity/getActInfo.do'
      // axios.get(url, {
      //   params: {
      //     activityNum: '58'
      //   }
      // }).then(res => {
        if (res.data.status == 1 && res.status == 200) {
          let receiveVal =  res.data.result.freevmconfigs
          let newArr = []
          // 数组去重（相同配置的）
          for(var i=0;i<receiveVal.length;i++) {
            for(var j=0;j<newArr.length;j++){
              if(receiveVal[i].cpu==newArr[j].cpu&&receiveVal[i].mem==newArr[j].mem&&receiveVal[i].bandwith==newArr[j].bandwith) {
                break
              }
            }
            if (j == newArr.length) {
              newArr[newArr.length] = receiveVal[i];
            }
          }
          // console.log(newArr)
          this.hotHostList.forEach((item,index)=> {
            item.post = newArr[index]
            item.zoneList = res.data.result.optionalArea
            // 设置默认区域
            item.zoneId = item.zoneList[0].value
            // 设置默认系统
            this.changeZoneHot(item)
          })
          for(var i=0;i<receiveVal.length;i++) {
            for(var j=0;j<this.hotHostList.length;j++){
              if(receiveVal[i].cpu==this.hotHostList[j].post.cpu&&receiveVal[i].mem==this.hotHostList[j].post.mem&&receiveVal[i].bandwith==this.hotHostList[j].post.bandwith) {
                this.hotHostList[j].postArr.push(receiveVal[i])
              }
            }
          }
          // console.log(this.hotHostList)
        }
      // })
    },
    
    // 获取gpu配置,区域
    getConfigureGPU (res) {
      // let url = 'activity/getActInfo.do'
      // axios.get(url, {
      //   params: {
      //     activityNum: '61'
      //   }
      // }).then(res => {
        if (res.data.status == 1 && res.status == 200) {
          this.gpuList.forEach((item,index)=> {
            item.post = res.data.result.freevmconfigs[index]
            item.zoneList = res.data.result.optionalAreaGpu
            // 设置默认区域
            item.zoneId = item.zoneList[0].value
            // 设置默认系统
            this.changeZoneHot(item)
          })
          // console.log(this.allList)
        }
      // })
    },
    // 获取优惠券配置
    getCoupen (res) {
      // let url = 'activity/getActTicket.do'
      // axios.get(url, { 
      //   params: {
      //     activityNum: '62'
      //   }
      // }).then(res => {
        if (res.data.status == 1 && res.status == 200) {
          this.coupenList.forEach((item,index)=> {
            item.post = res.data.result.freevmconfigs[index]
          })
          console.log(this.coupenList)
          this.allList = (this.hotHostList.concat(this.gpuList)).concat(this.coupenList)
        }
      // })
    },
    changgeTimeHot (item,select) {
      // console.log(item)
      item.post = select
      this.getPriceHot(item)
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
      if(item.post.days<=7){
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
      let url = 'information/getDiskcountMv.do'
      let params = {
          defzoneid: item.zoneId,
          vmConfigId: item.post.id,
          osType: item.system[1]
        }
      if (item.post.servicetype == 'ticket') {
        // url = 'activity/getDiskcountHighPreventionMv.do'
        params = {}
      } else if (item.post.servicetype == 'high_ip') {
        url = 'activity/getDiskcountHighIP.do'
      } else if(item.post.servicetype == 'G5500') {
        url = 'activity/getDiskcountGPU.do'
      }
      
      axios.get(url, {
        params:params
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
    month (val) {
      let text = ''
      if (val>=360) {
        text = val/360+'年'
      } else if(val>=30){
        text = val/30+'个月'
      } else {
        text = val+'天'
      }
      return text
    },
    killTitle (val) {
      // console.log(val.post)
      let result = ''
      switch (val.post.servicetype) {
        case 'host':
          result = '云服务器'
          break
        case 'ticket':
          result = '域名抵用券'
          break
        case 'G5500':
          result = 'GPU云服务器'
          break
        default:
          result = '1213'
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
.hot-host {
  .product-wrap {
    // display: flex;
  }
  .product {
    display: flex;
    // justify-content: space-between;
    flex-wrap: wrap; 
    text-align: left;
    background: #fff;
    padding-bottom: 10px;
    > div {
      width: 224px;
      box-shadow: 0px 3px 10px -3px rgba(195, 205, 230, 0.7);
      border: 1px solid rgba(220, 226, 242, 1);
      margin-bottom: 20px;
      margin-right: 20px;
      &:nth-of-type(5n+5){
        margin-right: 0;
      }
    }
    .head {
      height: 65px;
      padding: 25px 0 0 16px;
      // color: #fff;
      // background: url("../../../../assets/img/active/freeToReceive.1/hot-host-product-bg.png");
      h3 {
        // margin-bottom: 6px;
        font-size: 18px;
      }
      // span {
      //   font-size: 14px;
      // }
    }
    
    .body {
      padding: 10px 16px 20px 16px;
      background: #fff;
      // &:nth-of-type(2) {
      //   padding-bottom: 0;
      // }
      // &:nth-of-type(3) {
      //   border-top: 1px solid rgba(220, 226, 242, 1);
      // }
      > div {
        margin-bottom: 15px;
        display: flex;
        line-height: 32px;
        font-size: 14px;
      }
      .label {
        display: block;
        // margin-bottom: 8px;
        width: 44px;
        line-height: 32px;
        font-size: 14px;
        color:rgba(102,102,102,1);
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
            width: 70px;
            height: 34px;
            margin-bottom: 10px;
            line-height: 32px;
            border: 1px solid rgba(125, 161, 217, 1);
            text-align: center;
            color: #4b3c3d;
            cursor: pointer;
            &:nth-of-type(1) {
              border-right: none;
            }
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
    .coupen {
      >div {
        display: block;
        div {
          padding-left: 10px;
          border-radius:2px;
          border:1px dashed rgba(125,161,217,1);
        }
      }
      .label {
        display: inline-block;
        width: 70px;
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
