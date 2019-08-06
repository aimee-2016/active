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
          :mirror-config="mirrorConfig"
          @changeCPU="changeCPU"
          @changeMemory="changeMemory"
          @changeRootDiskType="changeRootDiskType"
          @changeRootDiskSize="changeRootDiskSize"
          @addServerSystemDisk="addServerSystemDisk"
          @changeServerSystemDiskType="changeServerSystemDiskType"
          @changeServerSystemDiskSize="changeServerSystemDiskSize"
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
          @changePublicIPBandwidth="changePublicIPBandwidth"
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
        :total-cost="totalCost"
        :total-coupon="totalCoupon"
        @minusBuyCount="minusBuyCount"
        @addBuyCount="addBuyCount"
        @changeBuyTime="changeBuyTime"
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
import regExp from "@/util/regExp";
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
import debounce from "throttle-debounce/debounce";
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
        { text: "实时计费", value: "current" }
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
        ],
        price: 0,
        coupon: 0
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
        downRuleData: [],
        price: 0,
        coupon: 0
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
        loginType: "password",
        loginTypeGroup: [
          { name: "密码", value: "password" }
          //{ name: "SSH密钥", value: "ssh" }
        ],
        SSHID: "",
        SSHIDGroup: [],
        passwordHint: false,
        //密码强度
        firstDegree: false,
        secondDegree: false,
        thirdDegree: false
      },
      timeConfig: {
        buyTime: "1",
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
        this.queryIPPrice();
        if (this.userInfo) {
          this.getPrivatelyMirror();
        }
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
    // 获取私有镜像
    getPrivatelyMirror() {
      axios
        .get("information/listTemplates.do", {
          params: {
            user: "1",
            zoneId: this.area.zoneid
          }
        })
        .then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.mirrorConfig.ownMirrorGroup = response.data.result.window.concat(
              response.data.result.centos,
              response.data.result.debian,
              response.data.result.ubuntu
            );
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
                  this.queryServerSpecificationPrice();
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
      this.queryServerSpecificationPrice();
      this.queryIPPrice();
    },
    changeArea(item) {
      this.area = item;
      this.queryServerSpecificationPrice();
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
      if (
        item.value > 4 &&
        this.mirrorConfig.mirrorName === "windows-2003-32bit"
      ) {
        return;
      }
      this.serverSpecification.CPU = item.value;
      this.serverSpecification.memoryGroup = item.RAMList;
      this.serverSpecification.memory = this.serverSpecification.memoryGroup[0].value;
      this.queryServerSpecificationPrice();
    },
    changeMemory(item) {
      if (
        item.value > 4 &&
        this.mirrorConfig.mirrorName == "windows-2003-32bit"
      ) {
        return;
      }
      this.serverSpecification.memory = item.value;
      this.queryServerSpecificationPrice();
    },
    changeRootDiskType(item) {
      this.serverSpecification.rootDiskType = item.value;
      this.queryServerSpecificationPrice();
    },
    changeRootDiskSize() {
      this.queryServerSpecificationPrice();
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
      this.queryServerSpecificationPrice();
    },
    changeServerSystemDiskType(item, index) {
      this.serverSpecification.systemDisk[index].type = item.value;
      this.queryServerSpecificationPrice();
    },
    changeServerSystemDiskSize() {
      this.queryServerSpecificationPrice();
    },
    deleteServerSystemDisk(index) {
      this.serverSpecification.systemDisk.splice(index, 1);
      this.queryServerSpecificationPrice();
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
    changePublicIPBandwidth() {
      this.queryIPPrice();
    },
    changeSetType(item) {
      this.loginInfo.setType = item.value;
    },
    changeAutoRenewal(val) {
      this.loginInfo.autoRenewal = val;
    },
    changeBuyTime() {
      this.queryServerSpecificationPrice();
      this.queryIPPrice();
    },
    minusBuyCount() {
      this.timeConfig.buyCount > 1 ? (this.timeConfig.buyCount -= 1) : null;
    },
    addBuyCount() {
      this.timeConfig.buyCount < 5 ? (this.timeConfig.buyCount += 1) : null;
    },
    nextStep(val) {
      switch (val) {
        case 1:
          if (!this.area) {
            this.$Message.info("请选择购买区域");
            return;
          }
          if (!this.mirrorConfig.mirrorID) {
            this.$Message.info("请选择服务器镜像");
            return;
          }
          this.buyStep = val;
          window.scroll(0, 0);
          break;
        case 2:
          if (
            this.serverNetwork.publicIPType === "useOwn" &&
            !this.serverNetwork.publicIPID
          ) {
            this.$Message.info("请选择需要使用的公网IP");
            return;
          }
          this.buyStep = val;
          window.scroll(0, 0);
          break;
        case 3:
          if (this.loginInfo.setType === "customSet") {
            if (!this.loginInfo.serverName) {
              this.$Message.info("请输入主机名称");
              return;
            }
            if (this.loginInfo.serverName.indexOf(" ") != -1) {
              this.$Message.info("主机名称不能包含空格");
              return;
            }
            if (
              !(
                this.loginInfo.firstDegree &&
                this.loginInfo.secondDegree &&
                this.loginInfo.thirdDegree
              ) &&
              this.loginInfo.loginType === "password"
            ) {
              this.$Message.info("您输入的密码不符合格式要求");
              return;
            }
          }
          if (this.serverType === "cloudServer") {
            this.createdCloudServerOrder();
          }
          break;
      }
    },
    // 查询服务器配置价格价格
    queryServerSpecificationPrice: debounce(500, function() {
      let diskSize = this.serverSpecification.rootDiskSize + ",";
      let diskType = this.serverSpecification.rootDiskType + ",";
      for (let disk of this.serverSpecification.systemDisk) {
        diskSize += `${disk.size},`;
        diskType += `${disk.type},`;
      }
      var params = {
        cpuNum: this.serverSpecification.CPU,
        diskSize,
        diskType,
        memory: this.serverSpecification.memory,
        timeType: this.billingType,
        timeValue: this.timeConfig.buyTime,
        zoneId: this.area.zoneid
      };
      if (
        parseInt(this.timeConfig.buyTime) > 11 &&
        this.billingType !== "current"
      ) {
        params.timeType = "year";
        params.timeValue = this.timeConfig.buyTime / 12 + "";
      }
      axios.post("device/QueryBillingPrice.do", params).then(response => {
        this.serverSpecification.price = response.data.cost;
        if (response.data.coupon) {
          this.serverSpecification.coupon = response.data.coupon;
        } else {
          this.serverSpecification.coupon = 0;
        }
      });
    }),
    // 查询服务器IP价格
    queryIPPrice: debounce(500, function() {
      let params = {
        brand: this.serverNetwork.bandwidth,
        timeType: this.billingType,
        timeValue: this.timeConfig.buyTime,
        zoneId: this.area.zoneid
      };
      if (
        parseInt(this.timeConfig.buyTime) > 11 &&
        this.billingType !== "current"
      ) {
        params.timeType = "year";
        params.timeValue = this.timeConfig.buyTime / 12 + "";
      }
      axios.post("device/queryIpPrice.do", params).then(response => {
        this.serverNetwork.price = response.data.cost;
        if (response.data.coupon) {
          this.serverNetwork.coupon = response.data.coupon;
        } else {
          this.serverNetwork.coupon = 0;
        }
      });
    }),
    // 创建主机订单
    createdCloudServerOrder() {
      //   if (this.userInfo == null) {
      //     this.$LR({ type: "login" });
      //     return;
      //   }

      let url = "information/deployVirtualMachine.do";
      let diskType = "",
        diskSize = "";
      for (let disk of this.serverSpecification.systemDisk) {
        diskType += `${disk.type},`;
        diskSize += `${disk.size},`;
      }
      let params = {
        zoneId: this.area.zoneid,
        timeType: this.billingType,
        timeValue: this.timeConfig.buyTime,
        templateId: this.mirrorConfig.mirrorID,
        isAutoRenew: this.loginInfo.autoRenewal ? "1" : "0",
        count: this.timeConfig.buyCount,
        cpuNum: this.serverSpecification.CPU,
        memory: this.serverSpecification.memory,
        bandWidth: this.serverNetwork.bandwidth,
        rootDiskType: this.serverSpecification.rootDiskType,
        rootDiskSize: this.serverSpecification.rootDiskSize,
        vpcId: this.serverNetwork.vpcId,
        networkId: this.serverNetwork.networkId,
        diskType,
        diskSize
      };
      if (
        parseInt(this.timeConfig.buyTime) > 11 &&
        this.billingType !== "current"
      ) {
        // 购买时间单位为年
        params.timeType = "year";
        params.timeValue = this.timeConfig.buyTime / 12 + "";
      }
      if (this.serverNetwork.publicIPType !== "buyNow") {
        params.bandWidth = "0"; // 没有选择立即购买IP
      }
      // 设置了主机名和密码
      if (this.loginInfo.setType == "customSet") {
        params.VMName = this.loginInfo.serverName;
        params.password = this.loginInfo.serverPassword;
      }
      axios.get(url, { params }).then(response => {
        if (response.status == 200 && response.data.status == 1) {
          this.$router.push({
            path: "/order"
          });
        } else {
          this.$message.info({
            content: response.data.message
          });
        }
      });
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    },
    totalCost() {
      if (this.serverType === "cloudServer") {
        let price = "0";
        if (this.serverNetwork.publicIPType === "buyNow") {
          price = (
            (this.serverSpecification.price + this.serverNetwork.price) *
            this.timeConfig.buyCount
          ).toFixed(2);
        } else {
          price = (
            this.serverSpecification.price * this.timeConfig.buyCount
          ).toFixed(2);
        }
        return price;
      }
    },
    // 折扣金额，设计图上没用到
    totalCoupon() {
      if (this.serverType === "cloudServer") {
        return "0";
      }
    }
  },
  watch: {
    userInfo(val) {
      if (val) {
        this.getVpcList();
        this.getPrivatelyMirror();
      }
    },
    buyStep() {
      this.isFixed = false; // 步骤改变重置浮动
    },
    serverType(val) {
      switch (val) {
        case "cloudServer":
          // 初始化计费方式
          this.billingTypeGroup = [
            { text: "包年包月", value: "month" },
            { text: "实时计费", value: "current" }
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
    },
    "mirrorConfig.mirrorName": {
      handler: function(value) {
        let s = value.substr(0, 1);
        if (s === "W" || s === "w") {
          this.loginInfo.loginName = "administrator";
        } else {
          this.loginInfo.loginName = "root";
        }
        if (value === "windows-2003-32bit") {
          this.setSpecification();
        }
      },
      deep: true
    },
    "loginInfo.serverPassword": {
      handler: function(val) {
        if (val.length > 7 && val.length < 31) {
          this.loginInfo.firstDegree = true;
        } else {
          this.loginInfo.firstDegree = false;
        }
        let len = val.length;
        let reg = /[0-9]/;
        let flag = false;
        // 当用户输入到第6位时，开始校验是否有6位连续字符
        if (len > 5) {
          flag = check(len);
          function check(index) {
            let count = 0;
            for (let i = index - 5; i < index; i++) {
              let next = reg.test(val[i]) ? val[i] : val[i].charCodeAt(); // 检查字符是数字还是字母，数字没转原因是9和：ACSII码连续
              let current = reg.test(val[i - 1])
                ? val[i - 1]
                : val[i - 1].charCodeAt();
              if (next - current === 1) {
                // 字母ACSII 码相差1 则为连续
                count += 1;
              }
            }
            if (count > 4) {
              // 有6位连续字符
              return true;
            } else if (count < 5 && index > 6) {
              return check(index - 1); // 递归继续校验
            } else {
              return false;
            }
          }
          if (flag && len > 5) {
            this.loginInfo.secondDegree = false;
          } else if (!flag && len > 5) {
            this.loginInfo.secondDegree = true;
          }
          if (len === 0) {
            this.loginInfo.secondDegree = false;
          }
          if (regExp.hostPassword(val)) {
            this.loginInfo.thirdDegree = true;
          } else {
            this.loginInfo.thirdDegree = false;
          }
        } else {
          this.loginInfo.secondDegree = false;
          this.loginInfo.secondDegree = true;
        }
      },
      deep: true
    }
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  }
};
</script>