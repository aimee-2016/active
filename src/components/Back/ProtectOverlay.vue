<template>
  <div id="background">
    <div id="wrapper">
      <span class="title">云服务器 /
         <span>DDoS高防云服务器 / </span>
        <span>防护叠加</span>
      </span>
      <Alert type="warning" show-icon style="margin-bottom:10px" v-if="!auth">您尚未进行实名认证，只有认证用户才能对外提供服务，
        <router-link to="/userCenter">立即认证</router-link>
      </Alert>
      <div id="content">
        <div id="header" style="border-bottom:1px solid #E9E9E9;">
          <img class="reTrunImg" @click="$router.go(-1)" src="../../assets/img/host/h-icon9.png" alt="back to Expenses">
          <span id="title">防护叠加</span>
          <button id="refresh_button" @click="$router.go(0)" style="margin-top: 10px;">刷新</button>
        </div>
        <div class="host-config">
          <div class="config-top">
            <h3>叠加前防护配置</h3>
          </div>
          <div class="config-bottom">
            <table cellpadding="0" cellspacing="0">
              <tr>
                <td>主机名称</td>
                <td>{{hostInfo.computerName}}</td>
              </tr>
              <tr>
                <td>IP地址</td>
                <td>{{hostInfo.publicIp}}(公)；{{hostInfo.privateIp}}(内)</td>
              </tr>
              <tr>
                <td>防护配置</td>
                <td>{{hostInfo.ddosProtectNumber}}GB</td>
              </tr>
              <tr>
                <td>防护到期时间</td>
                <td>{{hostInfo.endTime}}</td>
              </tr>
            </table>
          </div>
        </div>
        <div class="config-selected">
          <div class="config-group">
            <p class="upgradeInfo">可叠加配置</p>
            <div class="confBox">
              <div class="proConf">
                <div class="item" v-for="(item, index) in overlayData" :key="(index+2)*12" :class="{'active': item.value == selectOverlay.value}" @click="changeOverlay(item)">{{item.name}}GB</div>
              </div>
              <div class="dayAdd">
                <div class="countmins">
                  <div class="minusbtn" @click="minusCount"></div>
                  <input class="countNum" type="text" maxlength="2" disabled v-model="purchDay"/>
                  <div class="addbtn" @click="addCount"></div>
                  <div class="depart">天</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="end-config">
          <div class="end-info">
            <p class="upgradeInfo">叠加后防护配置</p>
            <table cellpadding="0" cellspacing="0">
              <tr>
                <td>防护配置</td>
                <td>{{hostInfo.ddosProtectNumber}}GB <span v-show="selectOverlay.value">+ {{selectOverlay.value}}GB</span></td>
              </tr>
              <tr>
                <td>防护到期时间</td>
                <td>{{hostInfo.endTime}} <span v-show="changeEndTime">+ {{changeEndTime}}</span></td>
              </tr>
            </table>
            <div class="price">
              <a href="/support_docs/kiRWuMFJd_kmeqtVSId.html" target="_blank">购买和计费说明</a><br />
              <span>提示：购买完成之后，需等待30分钟完成升级配置，升级套餐生效时间以服务短信通知为准。</span>
              <p>应付差价：<span>{{ price.toFixed(2) }}</span>元</p>
            </div>
          </div>
        </div>
        <div class="footer">
          <Button style="margin-right: 10px" type="ghost" @click="$router.push('BackDdos')">取消叠加</Button>
          <Button type="primary" :disabled="price == 0" @click="payOrder">确认叠加</Button>
        </div>
      </div>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  import uuid from 'uuid'
  import axios from '@/util/axiosInterceptor'

  export default {
    data() {
      return {
        hostInfo: {},
        computerId: '',
        purchDay: 1,
        overlayData: [
          {name: '400', value: 400},
          {name: '500', value: 500},
          {name: '600', value: 600},
          {name: '700', value: 700},
          {name: '800', value: 800}
        ],
        selectOverlay: {},
        interfacePrice: 0,
        backData: {},
        changeEndTime: ''
      }
    },
    created() {
      this.backData = JSON.parse(sessionStorage.getItem('ProtectUpgrade'))
      this.computerId = this.backData.computerId
      this.getHostInfo()
    },
    methods: {
      getHostInfo() {
        let url = 'information/listVMByComputerId.do'
        this.$http.get(url, {
          params: {
            VMId: this.computerId
          }
        }).then(res => {
          if (res.status == 200 && res.data.status == 1) {
            this.hostInfo = res.data.result
          }
        })
      },
      // 改变防护配置
      changeOverlay(item) {
        if((this.hostInfo.ddosProtectNumber+item.value) <= 800){
          this.selectOverlay = item
        } else {
          this.$Message.info('总防护配置不能超过800GB');
        }
      },
      payOrder() {
        if((this.hostInfo.ddosProtectNumber + this.selectOverlay.value) <= 800){
          axios.get('ddosImitationhost/OverlayDdosProtectEquipment.do', {
            params: {
              ddosProtectNumber: this.selectOverlay.value,
              computerId: this.backData.id,
              timeType: 'day',
              timeValue: this.purchDay,
            }
          }).then(res => {
            if(res.status == 200 && res.data.status == 1){
              this.$Message.success('订单提交成功')
              this.$router.push('order')
            } else {
              this.$Message.info(res.data.message)
            }
          })
        }
      },
      // 购买天数 - 
      minusCount() {
        let tempCountminus = this.purchDay - 1
        if(tempCountminus < 1){
          this.$Message.info('防护叠加天数不能小于1天');
        } else {
          this.purchDay = tempCountminus
        }
      },
      // 购买天数 + 
      addCount() {
        let tempAddCount = this.purchDay + 1
        if(tempAddCount > 1) {
          this.$Message.info('防护叠加天数不能超过1天');
        }else {
          this.purchDay = tempAddCount
        }
      },
      // 计算防护价格
      computedProtectPrice() {
        axios.get('ddosImitationhost/OverlayDdosProtectPrice.do',{
          params: {
            computerId: this.backData.id,
            ddosProtectNumber: this.selectOverlay.value,
            timeType: 'day',
            timeValue: this.purchDay
          }
        }).then(res => {
          if (res.status == 200 && res.data.status == 1){
            this.interfacePrice = res.data.price
            this.changeEndTime = res.data.endTime
          } else {
            this.$Message.info(res.data.message)
          }
        })
      }
    },
    computed: {
      auth() {
        return this.$store.state.authInfo != null
      },
      price() {
        return this.interfacePrice
      }
    },
    watch: {
      '$store.state.zone': {
        handler: function () {
        },
        deep: true
      },
      selectOverlay: {
        handler: function() {
          this.computedProtectPrice()
        },
        deep: true
      }
    },
    beforeRouteLeave(to, from, next) {
      // 导航离开该组件的对应路由时调用
      next()
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .host-config {
    padding: 20px;
    margin-top: 18px;
    background: rgba(246, 250, 253, 1);
    border-radius: 2px;
    .config-top {
      border-bottom: 1px solid rgba(233, 233, 233, 1);
      padding-bottom: 10px;
      > p {
        font-size: 14px;
        font-family: MicrosoftYaHei;
        color: rgba(51, 51, 51, 1);
        line-height: 28px;
      }
      h3 {
        font-size: 18px;
        color:rgba(51,51,51,1);
        line-height: 24px;
        font-weight: normal;
      }
    }
    .config-bottom {
      padding-top: 10px;
      > p {
        font-size: 14px;
        color: rgba(102, 102, 102, 1);
        line-height: 28px;
        > span {
          color: #333333;
        }
      }

      table{
        width: auto;
        height: auto;
        tr{
          td{
            padding: 3px 0;
            font-size: 14px;
            color: #666;
            line-height:20px;
            &:last-child {
              padding-left: 10px;
              color: #333333;
            }
          }
        }
      }
    }
  }

  h4 {
    font-size: 14px;
    font-family: MicrosoftYaHei;
    color: rgba(51, 51, 51, 1);
    font-weight: normal;
    margin-bottom: 10px;
  }

  .config-selected {
    padding: 20px 0 10px 0;
    .config-group {
      border-radius: 2px;
      border: 1px solid #E9E9E9;
      padding: 20px;
      > p {
        font-size: 14px;
        font-family: MicrosoftYaHei;
        color: rgba(51, 51, 51, 1);
      }
      .upgradeInfo {
        font-size: 18px;
        color:rgba(51,51,51,1);
        line-height: 24px;
      }
      .confBox{
        .proConf {
          float: left;
          width: auto;
          height: auto;
          zoom: 1;
          &:before {
            content: "";
            display: table;
          }
          &:after {
            content: "";
            display: table;
            clear: both;
          }
          .item {
            float: left;
            width: 80px;
            height: 35px;
            background:rgba(255,255,255,1);
            border: 1px solid rgba(229,233,237,1);
            border-radius:2px 0px 0px 2px;
            text-align: center;
            line-height: 34px;
            color: #333333;
            cursor: pointer;
            &.active {
              border-color: #2A99F2!important;
              background:rgba(237,247,255,1)!important;
              color: #2A99F2!important;
            }
          }
        }
        .dayAdd {
          float: left;
          margin-left: 20px;
          .countmins {
            width: auto;
            height: auto;
            zoom: 1;
            &::before {
              content: "";
              display: table;
            }
            &::after {
              content: "";
              display: table;
              clear: both;
            }
            .minusbtn {
              float: left;
              position: relative;
              display: block;
              width:38px;
              height:35px;
              cursor: pointer;
              background:rgba(247,249,250,1);
              border-radius: 2px 0px 0px 2px;
              border:1px solid rgba(229,233,237,1);
              cursor: pointer;
              &:hover {
                &::before{
                  background: #2A99F2;
                }
              }
              &::before {
                position: absolute;
                content: "";
                top: 50%;
                left: 50%;
                margin-top: -1px;
                margin-left: -7px;
                width: 15px;
                height: 2px;
                background: #999999;
              }
            }
            .countNum {
              float: left;
              margin-left: -2px;
              display: block;
              width: 60px;
              height: 35px;
              background:rgba(255,255,255,1);
              border: none;
              outline: none;
              border-top: 1px solid rgba(229,233,237,1);
              border-bottom: 1px solid rgba(229,233,237,1);
              line-height: .35rem;
              text-align: center;
              font-size: 14px;
              color:rgba(51,51,51,1);
            }
            .addbtn {
              float: left;
              position: relative;
              width:38px;
              height:35px;
              cursor: pointer;
              background:rgba(247,249,250,1);
              border-radius:2px 0px 0px 2px;
              border:1px solid rgba(229,233,237,1);
              cursor: pointer;
              &:hover {
                &::before{
                  background: #2A99F2;
                }
                &::after{
                  background: #2A99F2;
                }
              }
              &::before {
                position: absolute;
                content: "";
                top: 50%;
                left: 50%;
                margin-top: -1px;
                margin-left: -7px;
                width: 15px;
                height: 2px;
                background: #999999;
              }
              &::after {
                position: absolute;
                content: "";
                top: 50%;
                left: 50%;
                margin-top: -7px;
                margin-left: -1px;
                width: 2px;
                height: 15px;
                background: #999999;
              }
            }
            .depart {
              float: left;
              margin-left: 13px;
              display: block;
              font-size: 14px;
              color:rgba(51,51,51,1);
              line-height: 34px;
            }
          }
        }
      }
      > div {
        display: flex;
        margin-top: 10px;
        > ul {
          width: 59px;
          height: 35px;
          background: rgba(255, 255, 255, 1);
          border-radius: 0px 2px 2px 0px;
          border: 1px solid rgba(229, 233, 237, 1);
          font-size: 14px;
          font-family: MicrosoftYaHei;
          color: rgba(51, 51, 51, 1);
          cursor: pointer;
          text-align: center;
          line-height: 34px;
          &.selected {
            background: rgba(237, 247, 255, 1);
            border-radius: 2px 0px 0px 2px;
            border: 1px solid rgba(42, 153, 242, 1);
            color: #2A99F2;
          }
        }
      }
    }
  }

  .end-config {
    padding: 20px 0 10px 0;
    .end-info {
      padding: 20px;
      border-radius: 2px;
      border: 1px solid rgba(233, 233, 233, 1);
      table{
        margin-top: 6px;
        width: auto;
        height: auto;
        tr {
          td{
            padding: 3px 0;
            font-size: 14px;
            color: #666666;
            line-height: 20px;
            &:last-child {
              padding-left: 10px;
              color: #666666;
              span{
                color: #FF624B;
              }
            }
          }
        }
      }
      .upgradeInfo {
        font-size: 18px;
        color:rgba(51,51,51,1);
        line-height: 24px;
      }
      .price {
        margin-top: 20px;
        padding-top: 20px;
        border-top: 1px solid rgba(233, 233, 233, 1);
        > a {
          font-size: 12px;
          color: rgba(42, 153, 242, 1);
          cursor: pointer;
        }
        > span {
          display: block;
          margin-top: 10px;
          font-size: 12px;
          color:rgba(255,152,1,1);
          line-height: 16px;
        }
        > p {
          font-size: 14px;
          color: rgba(0, 0, 0, 0.65);
          float: right;
          > span {
            font-size: 24px;
            color: #FF624B;
          }
        }
      }
    }
  }

  .reTrunImg{
    cursor: pointer;
    margin-top: 9px;
  }
  .footer {
    margin-top: 20px;
    text-align: right;
  }
</style>
