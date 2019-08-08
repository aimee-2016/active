<template>
  <div class="database-page">
    <buy-header title-name="购买云数据库" @toOldVersion="toOldVersion"></buy-header>
    <div class="container">
      <div>
        <buy-area isNotServer="true" :area-group="areaGroup" :area="area" @changeArea="changeArea"></buy-area>
        <buy-billing-type
          isNotServer="true"
          :billing-type-group="billingTypeGroup"
          :billing-type="billingType"
          @changeBillingType="changeBillingType"
        ></buy-billing-type>
        <buy-mirror
          isNotServer="true"
          :mirror-config="mirrorConfig"
          @changePublicMirror="changePublicMirror"
        ></buy-mirror>
        <buy-server-specification
          isNotServer="true"
          :server-specification-group="serverSpecificationGroup"
          :server-specification="serverSpecification"
          :mirror-config="mirrorConfig"
          @changeCPU="changeCPU"
          @changeMemory="changeMemory"
          @changeRootDiskType="changeRootDiskType"
          @addServerSystemDisk="addServerSystemDisk"
          @changeServerSystemDiskType="changeServerSystemDiskType"
          @deleteServerSystemDisk="deleteServerSystemDisk"
        ></buy-server-specification>
        <buy-network
          :area="area"
          :server-network="serverNetwork"
          @changepublicIPType="changepublicIPType"
          @changeVpc="changeVpc"
          @changeNetwork="changeNetwork"
          @changePublicIPBandwidth="changePublicIPBandwidth"
        ></buy-network>
        <buy-login-info
          :login-info="loginInfo"
          @changeSetType="changeSetType"
          @changeAutoRenewal="changeAutoRenewal"
        ></buy-login-info>
      </div>
      <div class="lists">
        <buy-budget-list></buy-budget-list>
        <buy-selected-config
          :current-database-config="currentDatabaseConfig"
          @addToCart="addToCart"
        ></buy-selected-config>
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
.database-page {
  background: rgba(248, 248, 248, 1);
  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    .lists {
      width: 380px;
      padding-top: 20px;
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
import debounce from "throttle-debounce/debounce";
import buyHeader from "../buyComponents/buy-header";
import buyArea from "../buyComponents/buy-area";
import buyBillingType from "../buyComponents/buy-billing-type";
import buyMirror from "../buyComponents/buy-mirror";
import buyServerSpecification from "../buyComponents/buy-server-specification";
import buyNetwork from "../buyComponents/buy-network";
import buyLoginInfo from "../buyComponents/buy-dblogin-info";
import buyFooter from "../buyComponents/buy-footer";
import buySelectedConfig from "../buyComponents/buy-selected-config";
import buyBudgetList from "../buyComponents/buy-budget-list";
export default {
  components: {
    buyHeader,
    buyArea,
    buyBillingType,
    buyMirror,
    buyServerSpecification,
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
      areaGroup: [],
      area: null,
      billingTypeGroup: [
        { text: "包年包月", value: "month" },
        { text: "实时计费", value: "current" }
      ],
      billingType: "month",
      buyStep: 3,
      mirrorConfig: {
        mirrorType: "DBpublicMirror",
        mirrorTypeGroup: [
          {
            text: "公共镜像",
            value: "DBpublicMirror"
          }
        ],
        publicMirrorGroup: [],
        mirrorID: "",
        mirrorName: ""
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
      serverNetwork: {
        vpcGroup: [],
        vpcId: "",
        vpcName: "",
        networkGroup: [],
        networkId: "",
        networkName: "",
        publicIPTypeGroup: [
          {
            name: "现在购买",
            value: "buyNow"
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
          //   {
          //     name: "默认设置",
          //     value: "defaultSet"
          //   },
          {
            name: "自定义设置",
            value: "customSet"
          }
        ],
        setType: "customSet",
        loginName: "",
        dbName: "",
        autoRenewal: true,
        serverName: "",
        serverPassword: "",
        mirrorName: "u",
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
        this.queryIPPrice();
        this.getPublicMirror();
        this.getVpcList();
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
      this.$router.push("/buy/ip");
    },
    changeArea(item) {
      this.area = item;
      this.queryServerSpecificationPrice();
      this.queryIPPrice();
    },
    changeBillingType(item) {
      this.billingType = item.value;
      this.queryServerSpecificationPrice();
      this.queryIPPrice();
    },
    // 获取公共镜像
    getPublicMirror() {
      axios
        .get("database/listDbTemplates.do", {
          params: {
            zoneId: this.area.zoneid
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
      // sqlserver 镜像的数据库内存不能小于4G
      if (this.mirrorConfig.mirrorName.indexOf("sqlserver") !== -1) {
        if (this.serverSpecification.memory < 4) {
          this.serverSpecification.memory = "4";
        }
      }
      this.loginInfo.dbName = arr[5];
      this.loginInfo.loginName = arr[3];
    },
    changeCPU(item) {
      this.serverSpecification.CPU = item.value;
      this.serverSpecification.memoryGroup = item.RAMList;
      this.serverSpecification.memory = this.serverSpecification.memoryGroup[0].value;
      if (this.mirrorConfig.mirrorName.indexOf("sqlserver") !== -1) {
        if (this.serverSpecification.memory < 4) {
          this.serverSpecification.memory = "4";
        }
      }
      this.queryServerSpecificationPrice();
    },
    changeMemory(item) {
      if (this.mirrorConfig.mirrorName.indexOf("sqlserver") !== -1) {
        if (item.value < 4) {
          return;
        }
      }
      this.serverSpecification.memory = item.value;
      this.queryServerSpecificationPrice();
    },
    changeRootDiskType(item) {
      this.serverSpecification.rootDiskType = item.value;
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
    deleteServerSystemDisk(index) {
      this.serverSpecification.systemDisk.splice(index, 1);
      this.queryServerSpecificationPrice();
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
          this.serverNetwork.vpcName = this.serverNetwork.vpcGroup[0].vpcname;
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
          this.serverNetwork.networkName = this.serverNetwork.networkGroup[0].name;
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
    changeVpc(val) {
      this.serverNetwork.vpcId = val;
      this.serverNetwork.vpcGroup.forEach(item => {
        if (this.serverSpecification.vpcId === item.vpcid) {
          this.serverNetwork.vpcName = item.vpcname;
        }
      });
      this.getNetworkList();
    },
    changeNetwork(val) {
      this.serverNetwork.networkId = val;
      this.serverNetwork.networkGroup.forEach(item => {
        if (this.serverSpecification.networkId === item.ipsegmentid) {
          this.serverNetwork.networkName = item.name;
        }
      });
      this.getFireWallList();
    },
    changePublicIPBandwidth() {
      this.queryIPPrice();
    },
    changeSetType(item) {
      this.loginInfo.setType = item.value;
    },
    changeAutoRenewal(val) {
      this.network.autoRenewal = val;
    },
    minusBuyCount() {
      this.timeConfig.buyCount > 1 ? (this.timeConfig.buyCount -= 1) : null;
    },
    addBuyCount() {
      this.timeConfig.buyCount < 5 ? (this.timeConfig.buyCount += 1) : null;
    },
    changeBuyTime() {
      this.queryServerSpecificationPrice();
      this.queryIPPrice();
    },
    nextStep() {
      if (!this.area) {
        this.$Message.info("请选择购买区域");
        return;
      }
      if (!this.mirrorConfig.mirrorID) {
        this.$Message.info("请选择数据库镜像");
        return;
      }
      if (!this.loginInfo.serverName) {
        this.$Message.info("请输入实例名称");
        return;
      }
      if (this.loginInfo.serverName.indexOf(" ") != -1) {
        this.$Message.info("实例名称不能包含空格");
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
      this.createdDatabaseOrder();
    },
    addToCart() {
      if (!this.area) {
        this.$Message.info("请选择购买区域");
        return;
      }
      if (!this.mirrorConfig.mirrorID) {
        this.$Message.info("请选择数据库镜像");
        return;
      }
      if (!this.loginInfo.serverName) {
        this.$Message.info("请输入实例名称");
        return;
      }
      if (this.loginInfo.serverName.indexOf(" ") != -1) {
        this.$Message.info("实例名称不能包含空格");
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
      this.$Message.success("添加成功");
    },
    // 查询服务器配置价格价格
    queryServerSpecificationPrice: debounce(500, function() {
      let url = "device/QueryBillingPrice.do";
      let diskSize = this.serverSpecification.rootDiskSize + ",";
      let diskType = this.serverSpecification.rootDiskType + ",";
      for (let disk of this.serverSpecification.systemDisk) {
        diskSize += `${disk.size},`;
        diskType += `${disk.type},`;
      }
      let params = {
        resourceType: "db",
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
        this.billingType === "month"
      ) {
        params.timeType = "year";
        params.timeValue = this.timeConfig.buyTime / 12 + "";
      }
      axios.post(url, params).then(response => {
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
      let url = "device/queryIpPrice.do";
      let params = {
        brand: this.serverNetwork.bandwidth,
        timeType: this.billingType,
        timeValue: this.timeConfig.buyTime,
        zoneId: this.area.zoneid
      };
      if (
        parseInt(this.timeConfig.buyTime) > 11 &&
        this.billingType === "month"
      ) {
        params.timeType = "year";
        params.timeValue = this.timeConfig.buyTime / 12 + "";
      }
      axios.post(url, params).then(response => {
        this.serverNetwork.price = response.data.cost;
        if (response.data.coupon) {
          this.serverNetwork.coupon = response.data.coupon;
        } else {
          this.serverNetwork.coupon = 0;
        }
      });
    }),
    createdDatabaseOrder: debounce(500, function() {
      let url = "database/createDB.do";
      let diskType = "",
        diskSize = "";
      for (let disk of this.serverSpecification.systemDisk) {
        diskType += `${disk.type},`;
        diskSize += `${disk.size},`;
      }
      let params = {
        zoneId: this.area.zoneid,
        templateId: this.mirrorConfig.mirrorID,
        bandWidth: this.serverNetwork.bandwidth,
        timeType: this.billingType,
        timeValue: this.timeConfig.buyTime,
        isAutoRenew: this.loginInfo.autoRenewal ? "1" : "0",
        cpuNum: this.serverSpecification.CPU,
        memory: this.serverSpecification.memory,
        rootDiskType: this.serverSpecification.rootDiskType,
        rootDiskSize: this.serverSpecification.rootDiskSize,
        vpcId: this.serverNetwork.vpcId,
        networkId: this.serverNetwork.networkId,
        password: this.loginInfo.serverPassword,
        VMName: this.loginInfo.serverName,
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
        params.bandWidth = "0"; // 没有选择购买IP
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
    })
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    },
    totalCost() {
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
    },
    // 折扣金额，设计图上没用到
    totalCoupon() {
      return "0";
    },
    currentDatabaseConfig() {
      let config = {
        area: this.area,
        billingType: this.billingType,
        buyTime: this.timeConfig.buyTime,
        buyDay: this.timeConfig.buyDay,
        mirrorName: this.mirrorConfig.mirrorName,
        cpu: this.serverSpecification.CPU,
        memory: this.serverSpecification.memory,
        rootDiskType: this.serverSpecification.rootDiskType,
        rootDiskSize: this.serverSpecification.rootDiskSize,
        diskList: this.serverSpecification.systemDisk,
        network:
          this.serverNetwork.vpcName + " -- " + this.serverNetwork.networkName,
        publicIPType: this.serverNetwork.publicIPType,
        bandwidth: this.serverNetwork.bandwidth,
        firewall: this.serverNetwork.firewallGroup[0].acllistname,
        buyCount: this.timeConfig.buyCount
      };
      return config;
    }
  },
  watch: {
    userInfo(val) {
      if (val) {
        this.getVpcList();
      }
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