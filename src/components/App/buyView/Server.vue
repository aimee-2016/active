<template>
  <div class="server-page">
    <buy-header :title-name="headerTitle" @toOldVersion="toOldVersion"></buy-header>
    <div class="container">
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
          :mirror-config="mirrorConfig"
          @changeMirrorType="changeMirrorType"
          @changeMirrorMarketType="changeMirrorMarketType"
          @changePublicMirror="changePublicMirror"
          @changeMirrorMarketItem="changeMirrorMarketItem"
        ></buy-mirror>
        <buy-server-specification
          v-if="serverType!=='GPUServer'"
          :server-specification-group="serverSpecificationGroup"
          :server-specification="serverSpecification"
          @changeCPU="changeCPU"
          @changeMemory="changeMemory"
          @changeRootDiskType="changeRootDiskType"
          @addServerSystemDisk="addServerSystemDisk"
          @changeServerSystemDiskType="changeServerSystemDiskType"
          @deleteServerSystemDisk="deleteServerSystemDisk"
        ></buy-server-specification>
        <buy-defend v-if="serverType==='NOKIAServer'"></buy-defend>
        <buy-gpu-specification
          v-if="serverType==='GPUServer'"
          :gpu-specification="gpuSpecification"
          :gpu-specificationGroup="gpuSpecificationGroup"
          @addGpuSystemDisk="addGpuSystemDisk"
          @changeGpuSystemDiskType="changeGpuSystemDiskType"
          @deleteGpuSystemDisk="deleteGpuSystemDisk"
        ></buy-gpu-specification>
      </div>
      <div v-if="buyStep === 1" class="list-wrap">
        <buy-network
          :area="area"
          :server-network="serverNetwork"
          @changepublicIPType="changepublicIPType"
        ></buy-network>
        <div class="lists">
          <buy-budget-list></buy-budget-list>
          <buy-selected-config></buy-selected-config>
        </div>
      </div>
      <div v-if="buyStep === 2" class="list-wrap">
        <buy-login-info
          :login-info="loginInfo"
          @changeSetType="changeSetType"
          @changeAutoRenewal="changeAutoRenewal"
        ></buy-login-info>
        <div class="lists">
          <buy-budget-list></buy-budget-list>
          <buy-selected-config></buy-selected-config>
        </div>
      </div>
    </div>
    <div id="footer_page">
      <buy-footer
        :buyStep="buyStep"
        :is-fixed="isFixed"
        :time-config="timeConfig"
        :billing-type="billingType"
        @minusBuyCount="minusBuyCount"
        @addBuyCount="addBuyCount"
        @nextStep="nextStep"
      ></buy-footer>
    </div>
  </div>
</template>
<style lang="less" scoped>
.server-page {
  background: rgba(248, 248, 248, 1);
  .container {
    width: 1200px;
    margin: 0 auto;
    .list-wrap {
      display: flex;
      justify-content: space-between;
      .lists {
        width: 380px;
        padding-top: 20px;
      }
    }
  }
  #footer_page {
    margin-top: 20px;
  }
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
import buyGpuSpecification from "../buyComponents/buy-gpu-specification";
import buyNetwork from "../buyComponents/buy-network";
import buyLoginInfo from "../buyComponents/buy-login-info";
import buyFooter from "../buyComponents/buy-footer";
import buyDefend from "../buyComponents/buy-defend";
import buySelectedConfig from "../buyComponents/buy-selected-config";
import buyBudgetList from "../buyComponents/buy-budget-list";
export default {
  components: {
    buyHeader,
    buyStep,
    buyServerType,
    buyBillingType,
    buyArea,
    buyMirror,
    buyServerSpecification,
    buyGpuSpecification,
    buyDefend,
    buyNetwork,
    buyLoginInfo,
    buyFooter,
    buySelectedConfig,
    buyBudgetList
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
      // 标志购买栏是否固定于底部
      isFixed: false,
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
        { text: "包年包月", value: "month" },
        { text: "实时计费", value: "year" }
      ],
      billingType: "month",
      areaGroup: [],
      area: null,
      mirrorConfig: {
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
        mirrorMarketGroup: [],
        selectedMirrorMarket: "",
        mirrorMarketItems: [],
        publicMirrorGroup: [],
        mirrorID: "",
        mirrorName: "",
        ownMirrorGroup: []
      },
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
      // 当前GPU服务器规格
      gpuSpecification: {
        rootDiskTypeGroup: [
          {
            name: "SSD",
            value: "ssd"
          }
        ],
        rootDiskType: "ssd",
        rootDiskSizeGroup: [
          {
            name: "128G",
            value: 128
          }
        ],
        rootDiskSize: 128,
        systemDiskTypeGroup: [
          {
            name: "SSD",
            value: "ssd"
          }
        ],
        systemDisk: [
          {
            type: "ssd",
            size: 20
          }
        ]
      },
      // 每个区域对应的GPU服务器规格配置
      gpuSpecificationGroup: {},
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
        firewallGroup: [
          {
            acllistname: "默认防火墙",
            acllistid: "1"
          }
        ],
        firewall: "1",
        upRuleCol: [
          {
            title: "名称",
            key: "acllistitemname"
          },
          {
            title: "来源",
            key: "cidr"
          },
          {
            title: "协议端口",
            render: (h, params) => {
              var port = "";
              if (params.row.startport == params.row.endport) {
                port = params.row.startport;
              } else {
                port = params.row.startport + " " + params.row.endport;
              }
              return h("span", {}, port);
            }
          },
          {
            title: "策略",
            key: "operation",
            render: (h, params) => {
              return h(
                "span",
                {},
                params.row.operation == "Allow" ? "允许" : "拒绝"
              );
            }
          }
        ],
        upRuleData: [
          {
            acllistitemname: "默认防火墙",
            acllistname: "默认防火墙",
            cidr: "0.0.0.0/0",
            operation: "Allow",
            startport: "3360 3389 443 80",
            endport: ""
          }
        ],
        downRuleCol: [
          {
            title: "名称",
            key: "acllistitemname"
          },
          {
            title: "来源",
            key: "cidr"
          },
          {
            title: "协议端口",
            render: (h, params) => {
              var port = "";
              if (params.row.startport == params.row.endport) {
                port = params.row.startport;
              } else {
                port = params.row.startport + "" + params.row.endport;
              }
              return h("span", {}, port);
            }
          },
          {
            title: "策略",
            key: "operation",
            render: (h, params) => {
              return h(
                "span",
                {},
                params.row.operation == "Allow" ? "允许" : "拒绝"
              );
            }
          }
        ],
        downRuleData: []
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
      },
      timeConfig: {
        buyTime: "1",
        buyTimeType: "month",
        buyTimeGroup: [
          {
            label: "1个月",
            value: "1"
          },
          {
            label: "2个月",
            value: "2"
          },
          {
            label: "3个月",
            value: "3"
          },
          {
            label: "4个月",
            value: "4"
          },
          {
            label: "5个月",
            value: "5"
          },
          {
            label: "6个月",
            value: "6"
          },
          {
            label: "7个月",
            value: "7"
          },
          {
            label: "8个月",
            value: "8"
          },
          {
            label: "9个月",
            value: "9"
          },
          {
            label: "10个月",
            value: "10"
          },
          {
            label: "1年",
            value: "12"
          },
          {
            label: "2年",
            value: "24"
          },
          {
            label: "3年",
            value: "36"
          }
        ],
        buyCount: 1,
        buyDay: 1
      }
    };
  },
  created() {
    this.setAreaData();
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll); // 监听滚动事件
  },
  methods: {
    handleScroll() {
      //获取div距离顶部的偏移量
      var top = document.getElementById("footer_page").offsetTop;
      //获取屏幕高度
      var windowTop =
        window.innerHeight || document.documentElement.clientHeight;
      //屏幕卷去的高度
      var scrollTops =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      if (windowTop + scrollTops > top) {
        this.isFixed = false;
      } else {
        this.isFixed = true;
      }
    },
    setAreaData() {
      switch (this.serverType) {
        case "cloudServer":
          this.areaGroup = this.$store.state.zoneList.filter(zone => {
            return zone.gpuserver === 0;
          });
          break;
        case "NOKIAServer":
          this.areaGroup = this.$store.state.zoneList.filter(zone => {
            return zone.gpuserver === 2;
          });
          break;
        case "GPUServer":
          this.areaGroup = this.$store.state.zoneList.filter(zone => {
            return zone.gpuserver === 1;
          });
          break;
      }
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
        this.getPublicMirror();
        this.getMirrorMarket();
        this.getVpcList();
      }
    },
    // 获取公共镜像
    getPublicMirror() {
      axios
        .get("information/listTemplates.do", {
          params: {
            zoneId: this.area.zoneid,
            // 0代表系统镜像
            user: "0"
          }
        })
        .then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.mirrorConfig.publicMirrorGroup = [];
            for (let key in response.data.result) {
              this.mirrorConfig.publicMirrorGroup.push({
                publicMirrorType: key,
                publicMirrorList: response.data.result[key],
                key
              });
            }
          }
        });
    },
    // 获取镜像市场
    getMirrorMarket() {
      axios
        .get("information/listTemplateFunctionAll.do", {
          params: {
            zoneId: this.area.zoneid
          }
        })
        .then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.mirrorConfig.mirrorMarketGroup = [];
            for (let key in response.data.result) {
              this.mirrorConfig.mirrorMarketGroup.push({
                mirrorMarketType: key,
                mirrorMarketList: response.data.result[key]
              });
            }
            this.mirrorConfig.selectedMirrorMarket = this.mirrorConfig.mirrorMarketGroup[0].mirrorMarketType;
            this.mirrorConfig.mirrorMarketItems = this.mirrorConfig.mirrorMarketGroup[0].mirrorMarketList;
            this.mirrorConfig.mirrorID = this.mirrorConfig.mirrorMarketItems[0].systemtemplateid;
            this.mirrorConfig.mirrorName = this.mirrorConfig.mirrorMarketItems[0].templatedescript;
          }
        });
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
    toOldVersion() {
      switch (this.serverType) {
        case "cloudServer":
          this.$router.push("/buy/host/");
          break;
        case "NOKIAServer":
          this.$router.push("/buy/ddos/");
          break;
        case "GPUServer":
          this.$router.push("/buy/gpu/");
          break;
      }
    },
    changeServerType(item) {
      if (item.value === "bareMetalServer") {
        return;
      }
      this.serverType = item.value;
      this.setAreaData();
    },
    changeBillingType(item) {
      this.billingType = item.value;
    },
    changeArea(item) {
      this.area = item;
    },
    changeMirrorType(item) {
      this.mirrorConfig.mirrorType = item.value;
      switch (item.value) {
        case "mirrorMarket":
          this.mirrorConfig.mirrorID = this.mirrorConfig.mirrorMarketItems[0].systemtemplateid;
          this.mirrorConfig.mirrorName = this.mirrorConfig.mirrorMarketItems[0].templatedescript;
          break;
        case "piblicMirror":
          this.mirrorConfig.mirrorID = "";
          this.mirrorConfig.mirrorName = "";
          this.mirrorConfig.publicMirrorGroup.forEach((item, index) => {
            item.publicMirrorType = item.key; // 重置公共镜像列表
          });
          break;
        case "customMirror":
          break;
      }
    },
    changeMirrorMarketType(item) {
      this.mirrorConfig.selectedMirrorMarket = item.mirrorMarketType;
      this.mirrorConfig.mirrorMarketItems = item.mirrorMarketList;
      this.mirrorConfig.mirrorID = this.mirrorConfig.mirrorMarketItems[0].systemtemplateid;
      this.mirrorConfig.mirrorName = this.mirrorConfig.mirrorMarketItems[0].templatedescript;
    },
    changeMirrorMarketItem(item) {
      this.mirrorConfig.mirrorID = item.systemtemplateid;
      this.mirrorConfig.mirrorName = item.templatedescript;
    },
    changePublicMirror(val) {
      let arr = val.split("#");
      this.mirrorConfig.publicMirrorGroup.forEach((item, index) => {
        if (index !== arr[2]) {
          item.publicMirrorType = item.key; // 重置其他公共镜像列表
        }
      });
      this.mirrorConfig.publicMirrorGroup[arr[2]].publicMirrorType = arr[0];
      this.mirrorConfig.mirrorID = arr[1];
      this.mirrorConfig.mirrorName = arr[0];
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
    addServerSystemDisk() {
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
    changeServerSystemDiskType(item, index) {
      this.serverSpecification.systemDisk[index].type = item.value;
    },
    deleteServerSystemDisk(index) {
      this.serverSpecification.systemDisk.splice(index, 1);
    },
    addGpuSystemDisk() {
      let len = this.gpuSpecification.systemDisk.length;
      if (len === 5) {
        return;
      }
      let diskItem = {
        type: "ssd",
        size: 20
      };
      this.gpuSpecification.systemDisk.push(diskItem);
    },
    changeGpuSystemDiskType(item, index) {
      this.gpuSpecification.systemDisk[index].type = item.value;
    },
    deleteGpuSystemDisk(index) {
      console.log(index);
      this.gpuSpecification.systemDisk.splice(index, 1);
    },
    // 查询虚拟私有云vpc列表
    getVpcList() {
      axios
        .get("network/listVpcBuyComputer.do", {
          params: {
            zoneId: this.area.zoneid
          }
        })
        .then(response => {
          this.serverNetwork.vpcGroup = response.data.result;
          this.serverNetwork.vpcId = this.serverNetwork.vpcGroup[0].vpcid;
          this.getNetworkList();
        });
    },
    // 查询vpc所属的子网
    getNetworkList() {
      axios
        .get("network/listNetworkBuyComputer.do", {
          params: {
            zoneId: this.area.zoneid,
            vpcId: this.serverNetwork.vpcId
          }
        })
        .then(response => {
          this.serverNetwork.networkGroup = response.data.result;
          this.serverNetwork.networkId = this.serverNetwork.networkGroup[0].ipsegmentid;
          this.getFireWallList();
        });
    },
    // 查询防火墙信息
    getFireWallList() {
      axios
        .get("network/listAclList.do", {
          params: {
            zoneId: this.area.zoneid,
            aclId: this.serverNetwork.networkId
          }
        })
        .then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.serverNetwork.firewallGroup[0].acllistname =
              response.data.result[0].acllistname;
            this.serverNetwork.upRuleData = response.data.result[0].acllistitem.filter(
              item => {
                return item.type == "Ingress";
              }
            );
            this.serverNetwork.downRuleData = response.data.result[0].acllistitem.filter(
              item => {
                return item.type != "Ingress";
              }
            );
          }
        });
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
    minusBuyCount() {
      this.timeConfig.buyCount > 1 ? (this.timeConfig.buyCount -= 1) : null;
    },
    addBuyCount() {
      this.timeConfig.buyCount < 5 ? (this.timeConfig.buyCount += 1) : null;
    },
    nextStep(val) {
      window.scroll(0, 0);
      this.buyStep = val;
    }
  },
  watch: {
    buyStep() {
      this.isFixed = false; // 步骤改变重置浮动
    },
    serverType(val) {
      switch (val) {
        case "cloudServer":
          // 初始化计费方式
          this.billingTypeGroup = [
            { text: "包年包月", value: "month" },
            { text: "实时计费", value: current }
          ];
          break;
        case "NOKIAServer":
          this.billingTypeGroup = [{ text: "包年包月", value: "month" }];
          break;
        case "GPUServer":
          this.billingTypeGroup = [
            { text: "包年包月", value: "month" },
            { text: "实时计费", value: "current" }
          ];
          break;
      }
      this.billingType = "month";
    }
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  }
};
</script>