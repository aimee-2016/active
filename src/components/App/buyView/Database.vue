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
          @changeCPU="changeCPU"
          @changeMemory="changeMemory"
          @changeRootDiskType="changeRootDiskType"
          @addServerSystemDisk="addServerSystemDisk"
          @changeServerSystemDiskType="changeServerSystemDiskType"
          @deleteServerSystemDisk="deleteServerSystemDisk"
        ></buy-server-specification>
        <buy-network :area="area" :server-network="serverNetwork"></buy-network>
        <buy-login-info
          :login-info="loginInfo"
          @changeSetType="changeSetType"
          @changeAutoRenewal="changeAutoRenewal"
        ></buy-login-info>
      </div>
      <div class="lists">
        <buy-budget-list></buy-budget-list>
        <buy-selected-config></buy-selected-config>
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
import debounce from "throttle-debounce/debounce";
import buyHeader from "../buyComponents/buy-header";
import buyArea from "../buyComponents/buy-area";
import buyBillingType from "../buyComponents/buy-billing-type";
import buyMirror from "../buyComponents/buy-mirror";
import buyServerSpecification from "../buyComponents/buy-server-specification";
import buyNetwork from "../buyComponents/buy-network";
import buyLoginInfo from "../buyComponents/buy-login-info";
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
        { text: "实时计费", value: "time" }
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
        networkGroup: [],
        networkId: "",
        publicIPTypeGroup: [
          {
            name: "现在购买",
            value: "buyNow"
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
        loginName: "administrator",
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
        SSHIDGroup: []
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
        this.getPublicMirror();
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
    toOldVersion() {
      this.$router.push("/buy/ip");
    },
    changeArea(item) {
      this.area = item;
    },
    changeBillingType(item) {
      this.billingType = item.value;
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
      this.queryIPPrice();
    },
    nextStep() {}
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    },
    totalCost() {
      return "0";
    },
    // 折扣金额，设计图上没用到
    totalCoupon() {
      return "0";
    }
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  }
};
</script>