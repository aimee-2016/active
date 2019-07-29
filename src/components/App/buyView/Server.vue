<template>
  <div class="server-page">
    <buy-header :title="headerTitle" @toOldVersion="toOldVersion('host')"></buy-header>
    <buy-step :buy-step-group="buyStepGroup" :buy-step="buyStep"></buy-step>
    <div v-if="buyStep===0">
      <buy-server-type
        :server-type-group="serverTypeGroup"
        :server-type="serverType"
        @changeServerType="changeServerType"
      ></buy-server-type>
      <buy-billing-type
        :billing-type-group="billingTypeGroup"
        :billing-type="billingType"
        @changeBillingType="changeBillingType"
      ></buy-billing-type>
      <buy-area :area-group="areaGroup" :area="area" @changeArea="changeArea"></buy-area>
      <buy-mirror
        :mirror-type-group="mirrorTypeGroup"
        :mirrorType="mirrorType"
        :area="area"
        :mirrorID="mirrorID"
        :mirrorName="mirrorName"
        @changeMirrorType="changeMirrorType"
        @changePublicMirror="changePublicMirror"
      ></buy-mirror>
      <buy-server-specification
        :server-specification-group="serverSpecificationGroup"
        :server-specification="serverSpecification"
        @changeCPU="changeCPU"
        @changeMemory="changeMemory"
        @changeRootDiskType="changeRootDiskType"
        @addSystemDisk="addSystemDisk"
        @changeSystemDiskType="changeSystemDiskType"
        @deleteSystemDisk="deleteSystemDisk"
      ></buy-server-specification>
      <buy-defend v-if="serverType==='NOKIAServer'"></buy-defend>
    </div>
    <div v-if="buyStep === 1">
      <buy-network
        :area="area"
        :server-network="serverNetwork"
        @changepublicIPType="changepublicIPType"
      ></buy-network>
    </div>
    <div v-if="buyStep === 2">
      <buy-login-info
        :login-info="loginInfo"
        @changeSetType="changeSetType"
        @changeAutoRenewal="changeAutoRenewal"
      ></buy-login-info>
    </div>
    <buy-footer :buyStep="buyStep" @nextStep="nextStep"></buy-footer>
  </div>
</template>
<style lang="less" scoped>
.server-page {
  background: rgba(248, 248, 248, 1);
}
</style>
<script type="text/ecmascript-6">
import axios from "axios";
import $store from "@/vuex";
import buyHeader from "../buyComponents/buy-header";
import buyStep from "../buyComponents/buy-step";
import buyServerType from "../buyComponents/buy-server-type";
import buyBillingType from "../buyComponents/buy-billing-type";
import buyArea from "../buyComponents/buy-area";
import buyMirror from "../buyComponents/buy-mirror";
import buyServerSpecification from "../buyComponents/buy-server-specification";
import buyNetwork from "../buyComponents/buy-network";
import buyLoginInfo from "../buyComponents/buy-login-info";
import buyFooter from "../buyComponents/buy_footer";
import buyDefend from "../buyComponents/buy-defend";
export default {
  components: {
    buyHeader,
    buyStep,
    buyServerType,
    buyBillingType,
    buyArea,
    buyMirror,
    buyServerSpecification,
    buyDefend,
    buyNetwork,
    buyLoginInfo,
    buyFooter
  },
  // 以前统一写在app里，由于静态打包与写在app里冲突，所以vuex必须先在这里获取到区域信息,不然区域信息是null,
  beforeRouteEnter(to, from, next) {
    // 获取用户信息
    let userInfo = axios.get("user/GetUserInfo.do", {
      params: { t: new Date().getTime() }
    });
    // 获取zone信息
    let zoneList = axios.get("information/zone.do", {
      params: { t: new Date().getTime(), buy: "1" }
    });
    Promise.all([userInfo, zoneList]).then(
      values => {
        if (values[0].data.status == 1 && values[0].status == 200) {
          $store.commit("setAuthInfo", {
            authInfo: values[0].data.authInfo,
            userInfo: values[0].data.result,
            authInfoPersion: values[0].data.authInfo_persion
          });
          localStorage.setItem("realname", values[0].data.result.realname);
        }
        if (values[1].data.status == 1 && values[1].status == 200) {
          $store.commit("setZoneList", values[1].data.result);
        }
        next();
      },
      value => {
        next(vm => {
          vm.$message.info({
            content: "获取区域信息失败，请稍候再试"
          });
        });
      }
    );
  },
  data() {
    return {
      headerTitle: "购买云服务器",
      buyStep: 0,
      buyStepGroup: ["主机配置", "网络与带宽", "登陆信息", "订单确认"],
      serverType: "cloudServer",
      serverTypeGroup: [
        {
          imgurl: require("../../../assets/img/buy/buy_serverType1.png"),
          title: "云服务器",
          value: "cloudServer"
        },
        {
          imgurl: require("../../../assets/img/buy/buy_serverType2.png"),
          title: "高防服务器",
          value: "NOKIAServer"
        },
        {
          imgurl: require("../../../assets/img/buy/buy_serverType3.png"),
          title: "GPU服务器",
          value: "GPUServer"
        },
        {
          imgurl: require("../../../assets/img/buy/buy_serverType4.png"),
          title: "裸金属服务器",
          value: "bareMetalServer"
        }
      ],
      billingTypeGroup: [
        { text: "包年包月", value: "monthly" },
        { text: "实时计费", value: "timely" }
      ],
      billingType: "monthly",
      areaGroup: [],
      area: null,
      mirrorType: "mirrorMarket",
      mirrorTypeGroup: [
        {
          text: "镜像市场",
          value: "mirrorMarket"
        },
        {
          text: "公共镜像",
          value: "piblicMirror"
        },
        {
          text: "自制镜像",
          value: "customMirror"
        }
      ],
      mirrorID: "",
      mirrorName: "",
      // 当前服务器规格
      serverSpecification: {
        CPU: "",
        memoryGroup: [],
        memory: "",
        rootDiskTypeGroup: [
          {
            name: "SSD",
            value: "ssd"
          },
          {
            name: "SAS",
            value: "sas"
          }
        ],
        rootDiskType: "ssd",
        rootDiskSize: 40,
        systemDiskTypeGroup: [
          {
            name: "SSD",
            value: "ssd"
          },
          {
            name: "SAS",
            value: "sas"
          },
          {
            name: "SATA",
            value: "sata"
          }
        ],
        systemDisk: [
          {
            type: "ssd",
            size: 20
          }
        ]
      },
      // 每个区域对应的服务器规格配置
      serverSpecificationGroup: {},
      serverNetwork: {
        vpcGroup: [],
        vpcId: "",
        networkGroup: [],
        networkId: "",
        publicIPTypeGroup: [
          {
            name: "现在购买",
            value: "buyNow"
          },
          {
            name: "使用已有",
            value: "useOwn"
          },
          {
            name: "暂不购买",
            value: "notBuy"
          }
        ],
        publicIPType: "buyNow",
        bandwidth: 1,
        publicIPGroup: [],
        publicIPID: "",
        firewallGroup: [],
        firewall: ""
      },
      loginInfo: {
        setTypeGroup: [
          {
            name: "默认设置",
            value: "defaultSet"
          },
          {
            name: "自定义设置",
            value: "customSet"
          }
        ],
        setType: "defaultSet",
        loginName: "administrator",
        autoRenewal: true,
        serverName: "",
        serverPassword: "",
        mirrorName: "u",
        loginType: "password",
        loginTypeGroup: [
          { name: "密码", value: "password" },
          { name: "SSH密钥", value: "ssh" }
        ],
        SSHID: "",
        SSHIDGroup: []
      }
    };
  },
  created() {
    this.setAreaData();
  },
  methods: {
    setAreaData() {
      this.areaGroup = this.$store.state.zoneList.filter(zone => {
        return zone.gpuserver == 0;
      });
      this.area = this.$store.state.zone;
      // 如果默认区域在该资源下不存在
      if (
        !this.areaGroup.some(i => {
          return i.zoneid == this.area.zoneid;
        })
      ) {
        // 默认选中zoneList中第一个区域
        this.area = this.areaGroup[0];
      }
      if (this.area) {
        this.setSpecification();
      }
    },
    setSpecification() {
      axios.get("information/getServiceoffers.do").then(res => {
        if (res.status === 200 && res.data.status === 1) {
          res.data.info.length > 0
            ? res.data.info.forEach(item => {
                if (this.area.zoneid === item.zoneId) {
                  this.serverSpecificationGroup = item;
                  this.serverSpecification.CPU = item.kernelList[0].value;
                  this.serverSpecification.memoryGroup =
                    item.kernelList[0].RAMList;
                  this.serverSpecification.memory = this.serverSpecification.memoryGroup[0].value;
                }
              })
            : false;
        } else {
          this.$message.info({
            content: res.data.message
          });
        }
      });
    },
    toOldVersion(val) {
      this.$router.push("/buy/host");
    },
    changeServerType(item) {
      this.serverType = item.value;
    },
    changeBillingType(item) {
      this.billingType = item.value;
    },
    changeArea(item) {
      this.area = item;
    },
    changeMirrorType(item) {
      this.mirrorType = item.value;
    },
    changePublicMirror(arr) {
      this.mirrorID = arr[1];
      this.mirrorName = arr[0];
    },
    changeCPU(item) {
      this.serverSpecification.CPU = item.value;
      this.serverSpecification.memoryGroup = item.RAMList;
      this.serverSpecification.memory = this.serverSpecification.memoryGroup[0].value;
    },
    changeMemory(item) {
      this.serverSpecification.memory = item.value;
    },
    changeRootDiskType(item) {
      this.serverSpecification.rootDiskType = item.value;
    },
    addSystemDisk() {
      let len = this.serverSpecification.systemDisk.length;
      if (len === 5) {
        return;
      }
      let diskItem = {
        type: "ssd",
        size: 20
      };
      this.serverSpecification.systemDisk.push(diskItem);
    },
    changeSystemDiskType(item, index) {
      this.serverSpecification.systemDisk[index].type = item.value;
    },
    deleteSystemDisk(index) {
      this.serverSpecification.systemDisk.splice(index, 1);
    },
    changepublicIPType(item) {
      this.serverNetwork.publicIPType = item.value;
      if (item.value === "buyNow") {
        this.serverNetwork.bandwidth = 1;
      } else {
        this.serverNetwork.bandwidth = 0;
      }
    },
    changeSetType(item) {
      this.loginInfo.setType = item.value;
    },
    changeAutoRenewal(val) {
      this.loginInfo.autoRenewal = val;
    },
    nextStep() {
      this.buyStep += 1;
    }
  }
};
</script>