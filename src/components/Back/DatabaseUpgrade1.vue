<template>
  <div id="background">
    <div id="wrapper">
      <span class="title">
        云数据库 /
        <span>云数据库实例 /</span>
        <span>云数据库升级</span>
      </span>
      <Alert type="warning" show-icon style="margin-bottom:10px" v-if="!auth">
        您尚未进行实名认证，只有认证用户才能对外提供服务，
        <router-link to="/userCenter">立即认证</router-link>
      </Alert>
      <div id="content">
        <div id="header" style="border-bottom:1px solid rgba(233,233,233,1);">
          <span class="back-button" @click="$router.push('cloudDatabase')">
            <Icon type="ios-arrow-left"></Icon>
          </span>
          <span id="title">数据库升级</span>
          <button id="refresh_button" @click="$router.go(0)" style="margin-top: 10px;">刷新</button>
        </div>
        <div class="host-config">
          <div class="config-top">
            <p>数据库名称：{{ hostInfo.computername}}</p>
            <p>{{ hostInfo.serviceoffername.split('+')[0] }}CPU，{{ hostInfo.serviceoffername.split('+')[1]}}，{{ hostInfo.rootdisksize}}G硬盘 | {{ hostInfo.zonename}}</p>
          </div>
          <div class="config-bottom">
            <!-- <p>
              系统盘类型:
              <span>{{ hostInfo.rootDiskType}}</span>
            </p> -->
            <!-- <p>系统盘大小: <span> {{ hostInfo.rootDiskSize}}GB</span></p> -->
            <p>到期时间: <span> {{ hostInfo.endtime}}</span></p>
          </div>
        </div>
        <div class="config-selected">
          <h4>可升级配置</h4>
          <div class="config-group">
            <p>CPU</p>
            <div>
              <ul
                v-for="(item,index) in CPUList"
                :key="index"
                :class="{selected: endCPU== item.CPU}"
                v-if="item.CPU >=hostInfo.serviceoffername.split('+')[0].slice(0,1)"
                @click="changeCPU(item)"
              >{{ item.CPU }}核</ul>
            </div>
            <p>内存</p>
            <div>
              <ul
                v-for="(item,index) in memoryList"
                :key="index"
                :class="{selected: endMemory==item.memory}"
                v-if="item.memory >=hostInfo.serviceoffername.split('+')[1].slice(0,1)"
                @click="endMemory = item.memory"
              >{{ item.memory }}GB</ul>
            </div>
          </div>
        </div>
        <div class="end-config">
          <h4>升级后配置</h4>
          <div class="end-info">
            <p>
              主机CPU:
              <span>{{endCPU}}核</span>
            </p>
            <p>
              主机内存:
              <span>{{endMemory}}G</span>
            </p>
            <div class="price">
              <a href="/#/computed/3-1" target="_blank">查看计费说明</a>
              <p>
                应付差价：
                <span>{{ cpuMemoryCost }}</span>元
              </p>
            </div>
          </div>
        </div>
        <div class="footer">
          <Button style="margin-right: 10px" type="ghost" @click="$router.push('cloudDatabase')">取消升级</Button>
          <Button type="primary" :disabled="cpuMemoryCost == 0" @click="payOrder">确认升级</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import uuid from 'uuid'

export default {
  data () {
    return {
      hostInfo: {},
      computerId: '',
      vmid: '',
      endCPU: '',
      CPUList: [],
      endMemory: '',
      memoryList: [],
      rootDiskSize: 0,
      cpuMemoryCost: 0,
    }
  },
  created () {
    this.computerId = sessionStorage.getItem('upgradeId')
    this.vmid = sessionStorage.getItem('vmid')
    this.getHostInfo()
  },
  methods: {
    getHostInfo () {
      let url = 'database/listDB.do'
      this.$http.get(url, {
        params: {
          id: this.computerId
        }
      }).then(res => {
        if (res.status == 200 && res.data.status == 1) {
          this.hostInfo = res.data.result.info[0]
          this.endCPU = this.hostInfo.serviceoffername.split('+')[0].slice(0,1)
          this.endMemory = this.hostInfo.serviceoffername.split('+')[1].slice(0,1)
          this.rootDiskSize = this.hostInfo.rootdisksize
          this.getZoneConfig()
        }
      })
    },
    getZoneConfig () {
      let url = 'information/getZonesConfig.do'
      this.$http.get(url, {
        params: {}
      }).then(res => {
        if (res.data.status == 1 && res.status == 200) {
          this.CPUList = res.data.data
          this.CPUList.forEach(item => {
            if (this.endCPU == item.CPU) {
              this.memoryList = item.list
              this.memoryList.forEach((mem, index) => {
                if (mem.memory < this.hostInfo.serviceoffername.split('+')[1].slice(0,1)) {
                  this.memoryList.splice(index, 1)
                }
              })
            }
          })
        }
      })
    },
    changeCPU (item) {
      this.endCPU = item.CPU
      this.memoryList = item.list
      this.memoryList.forEach((mem, index) => {
        if (mem.memory < this.hostInfo.memory) {
          this.memoryList.splice(index, 1)
        }
      })
      this.endMemory = this.memoryList[0].memory
      this.getCfgCost()
    },
    getCfgCost () {
      this.$http.get('database/UpDBConfigCost.do', {
        params: {
          cpunum: this.endCPU,
          memory: this.endMemory,
          VMId: this.vmid
        }
      }).then(response => {
        if (response.status == 200 && response.data.status == 1) {
          this.cpuMemoryCost = response.data.result
        } else {
          this.$Message.info(response.data.message)
        }
      })
    },
    payOrder () {
      if (this.cpuMemoryCost != 0) {
        this.$http.get('database/upDBConfig.do', {
          params: {
            cpunum: this.endCPU,
            memory: this.endMemory,
            VMId: this.vmid
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.$Message.success('订单提交成功')
            this.$router.push('order')
          } else {
            this.$Message.info(response.data.message)
          }
        })
      }
    }
  },
  computed: {
    auth () {
      return this.$store.state.authInfo != null
    },
  },
  watch: {
    '$store.state.zone': {
      handler: function () {
      },
      deep: true
    },
    endMemory () {
      this.getCfgCost()
    }
  },
  beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    next()
  }
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
.back-button {
  display: inline-block;
  margin-top: 8px;
  width: 25px;
  height: 25px;
  background: rgba(255, 255, 255, 1);
  border-radius: 4px;
  border: 1px solid rgba(225, 225, 225, 1);
  color: #999999;
  font-size: 18px;
  text-align: center;
  line-height: 23px;
}
.host-config {
  padding: 20px;
  margin-top: 18px;
  background: rgba(246, 250, 253, 1);
  border-radius: 2px;
  .config-top {
    border-bottom: 1px solid rgba(233, 233, 233, 1);
    padding-bottom: 20px;
    > p {
      font-size: 14px;
      font-family: MicrosoftYaHei;
      color: rgba(51, 51, 51, 1);
      line-height: 28px;
    }
  }
  .config-bottom {
    padding-top: 20px;
    > p {
      font-size: 14px;
      font-family: MicrosoftYaHei;
      color: rgba(102, 102, 102, 1);
      line-height: 28px;
      > span {
        color: #333333;
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
    border: 1px solid rgba(233, 233, 233, 1);
    padding: 20px;
    > p {
      font-size: 14px;
      font-family: MicrosoftYaHei;
      color: rgba(51, 51, 51, 1);
    }
    > div {
      display: flex;
      margin: 10px 0 20px;
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
          color: #2a99f2;
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
    > p {
      font-size: 14px;
      font-family: MicrosoftYaHei;
      color: rgba(102, 102, 102, 1);
      line-height: 28px;
      > span {
        color: #ff624b;
      }
    }
    .price {
      margin-top: 20px;
      padding-top: 20px;
      border-top: 1px solid rgba(233, 233, 233, 1);
      > a {
        font-size: 12px;
        font-family: MicrosoftYaHei;
        color: rgba(42, 153, 242, 1);
        cursor: pointer;
      }
      > p {
        font-size: 14px;
        font-family: MicrosoftYaHei;
        color: rgba(0, 0, 0, 0.65);
        float: right;
        > span {
          font-size: 24px;
          color: #ff624b;
        }
      }
    }
  }
}

.footer {
  margin-top: 20px;
  text-align: right;
}
</style>
