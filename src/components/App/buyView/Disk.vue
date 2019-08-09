<template>
  <div class="disk-page">
    <buy-header title-name="购买云硬盘" @toOldVersion="toOldVersion"></buy-header>
    <div class="container">
      <div>
        <buy-area isNotServer="true" :area-group="areaGroup" :area="area" @changeArea="changeArea"></buy-area>
        <buy-billing-type
          isNotServer="true"
          :billing-type-group="billingTypeGroup"
          :billing-type="billingType"
          @changeBillingType="changeBillingType"
        ></buy-billing-type>
        <buy-disk-group
          isNotServer="true"
          :area="area"
          :diskSpecification="diskSpecification"
          @addSystemDisk="addSystemDisk"
          @changeSystemDiskType="changeSystemDiskType"
          @deleteSystemDisk="deleteSystemDisk"
          @changeSystemDiskSize="changeSystemDiskSize"
          @changeAutoRenewal="changeAutoRenewal"
        ></buy-disk-group>
      </div>
      <div class="lists">
        <buy-budget-list ref="budget"></buy-budget-list>
        <buy-selected-config :current-disk-config="currentDiskConfig" @addToCart="addToCart"></buy-selected-config>
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
.disk-page {
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
import buyDiskGroup from "../buyComponents/buy-disk-group";
import buySelectedConfig from "../buyComponents/buy-selected-config";
import buyBudgetList from "../buyComponents/buy-budget-list";
import buyFooter from "../buyComponents/buy-footer";
export default {
  components: {
    buyHeader,
    buyArea,
    buyDiskGroup,
    buyFooter,
    buyBillingType,
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
      diskSpecification: {
        systemDiskName: "",
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
            size: 20,
            minDiskSize: 20
          }
        ],
        autoRenewal: true,
        price: 0,
        coupon: 0
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
      },
      buyStep: 3,
      buybudget: []
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
      this.areaGroup = this.$store.state.zoneList;
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
        this.queryDiskPrice();
      }
    },
    toOldVersion() {
      this.$router.push("/buy/disk");
    },
    changeArea(item) {
      this.area = item;
      this.queryDiskPrice();
    },
    changeBillingType(item) {
      this.billingType = item.value;
      this.queryDiskPrice();
    },
    addSystemDisk() {
      let len = this.diskSpecification.systemDisk.length;
      if (len === 5) {
        return;
      }
      let diskItem = {
        type: "ssd",
        size: 20,
        minDiskSize: 20
      };
      this.diskSpecification.systemDisk.push(diskItem);
      this.queryDiskPrice();
    },
    changeSystemDiskType(item, index) {
      if (this.area.gpuserver == 1 && item.value !== "ssd") {
        return;
      }
      this.diskSpecification.systemDisk[index].type = item.value;
      if (item.value === "sata") {
        this.diskSpecification.systemDisk[index].minDiskSize = 100;
        this.diskSpecification.systemDisk[index].size = 100;
      } else if (item.value === "sas") {
        this.diskSpecification.systemDisk[index].minDiskSize = 50;
        this.diskSpecification.systemDisk[index].size = 50;
      } else {
        this.diskSpecification.systemDisk[index].minDiskSize = 20;
        this.diskSpecification.systemDisk[index].size = 20;
      }
      this.queryDiskPrice();
    },
    deleteSystemDisk(index) {
      this.diskSpecification.systemDisk.splice(index, 1);
      this.queryDiskPrice();
    },
    changeSystemDiskSize() {
      this.queryDiskPrice();
    },
    changeAutoRenewal(val) {
      this.diskSpecification.autoRenewal = val;
    },
    minusBuyCount() {
      //this.timeConfig.buyCount > 1 ? (this.timeConfig.buyCount -= 1) : null;
    },
    addBuyCount() {
      //this.timeConfig.buyCount < 2 ? (this.timeConfig.buyCount += 1) : null;
    },
    changeBuyTime() {
      this.queryDiskPrice();
    },
    nextStep() {
      if (this.userInfo == null) {
        this.$LR({ type: "login" });
        return;
      }
      if (!this.area) {
        this.$Message.info("请选择需要购买的区域");
        return;
      }
      if (!this.diskSpecification.systemDiskName) {
        this.$Message.info("请输入磁盘名称");
        return;
      }
      if (this.diskSpecification.systemDiskName.indexOf(" ") != -1) {
        this.$Message.info("磁盘名称不能包含空格");
        return;
      }
      this.createdDiskOrder();
    },
    addToCart() {
      if (!this.area) {
        this.$Message.info("请选择需要购买的区域");
        return;
      }
      if (!this.diskSpecification.systemDiskName) {
        this.$Message.info("请输入磁盘名称");
        return;
      }
      if (this.diskSpecification.systemDiskName.indexOf(" ") != -1) {
        this.$Message.info("磁盘名称不能包含空格");
        return;
      }
      this.buybudget = [];
      if (localStorage.getItem("buybudget")) {
        this.buybudget = JSON.parse(localStorage.getItem("buybudget"));
      }
      this.addDisk();
    },
    // 查询磁盘价格
    queryDiskPrice: debounce(500, function() {
      let url = "device/QueryBillingPrice.do";
      let diskSize = "";
      let diskType = "";
      for (let disk of this.diskSpecification.systemDisk) {
        diskSize += `${disk.size},`;
        diskType += `${disk.type},`;
      }
      let params = {
        cpuNum: "0",
        diskSize,
        diskType,
        memory: "0",
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
        this.diskSpecification.price = response.data.cost;
        if (response.data.coupon) {
          this.diskSpecification.coupon = response.data.coupon;
        } else {
          this.diskSpecification.coupon = 0;
        }
      });
    }),
    addDisk() {
      let diskSize = "";
      let diskType = "";
      this.diskSpecification.systemDisk.forEach(item => {
        diskSize += `${item.size},`;
        diskType += `${item.type},`;
      });
      let params = {
        zoneId: this.area.zoneid,
        diskSize,
        diskName: this.diskSpecification.systemDiskName,
        diskOfferingId: diskType,
        timeType: this.billingType,
        timeValue: this.timeConfig.buyTime,
        count: this.timeConfig.buyCount,
        isAutorenew: this.diskSpecification.autoRenewal ? "1" : "0",
        diskList: this.diskSpecification.systemDisk,
        type: "disk",
        price: this.totalCost
      };
      if (
        parseInt(this.timeConfig.buyTime) > 11 &&
        this.billingType !== "current"
      ) {
        // 购买时间单位为年
        params.timeType = "year";
        params.timeValue = this.timeConfig.buyTime / 12 + "";
      }
      this.buybudget.push(params);
      localStorage.setItem("buybudget", JSON.stringify(this.buybudget));
      this.$refs.budget.setBuyBudget();
    },
    createdDiskOrder: debounce(500, function() {
      let url = "Disk/createVolume.do";
      let diskSize = "";
      let diskType = "";
      this.diskSpecification.systemDisk.forEach(item => {
        diskSize += `${item.size},`;
        diskType += `${item.type},`;
      });
      let params = {
        zoneId: this.area.zoneid,
        diskSize,
        diskName: this.diskSpecification.systemDiskName,
        diskOfferingId: diskType,
        timeType: this.billingType,
        timeValue: this.timeConfig.buyTime,
        count: this.timeConfig.buyCount,
        isAutorenew: this.diskSpecification.autoRenewal ? "1" : "0"
      };
      if (
        parseInt(this.timeConfig.buyTime) > 11 &&
        this.billingType !== "current"
      ) {
        // 购买时间单位为年
        params.timeType = "year";
        params.timeValue = this.timeConfig.buyTime / 12 + "";
      }
      axios.get(url, { params }).then(response => {
        if (response.status == 200 && response.data.status == 1) {
          this.$router.push("/order");
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
      return (this.diskSpecification.price * this.timeConfig.buyCount).toFixed(
        2
      );
    },
    // 折扣金额，设计图上没用到
    totalCoupon() {
      return "0";
    },
    currentDiskConfig() {
      let config = {
        serverType: this.serverType,
        step: this.buyStep,
        area: this.area,
        billingType: this.billingType,
        buyTime: this.timeConfig.buyTime,
        diskList: this.diskSpecification.systemDisk,
        buyCount: this.timeConfig.buyCount
      };
      return config;
    }
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  }
};
</script>