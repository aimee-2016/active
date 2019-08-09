<template>
  <div class="safelyIP-page">
    <buy-header title-name="购买高仿IP" @toOldVersion="toOldVersion"></buy-header>
    <div class="container">
      <div>
        <buy-area isNotServer="true" :area-group="areaGroup" :area="area" @changeArea="changeArea"></buy-area>
        <buy-billing-type
          isNotServer="true"
          :billing-type-group="billingTypeGroup"
          :billing-type="billingType"
          @changeVpc="changeVpc"
          @changeBandwidth="changeBandwidth"
          @changeBillingType="changeBillingType"
        ></buy-billing-type>
        <buy-ip-specification
          :network="network"
          @changeVpc="changeVpc"
          @changeBandwidth="changeBandwidth"
          @changeAutoRenewal="changeAutoRenewal"
        ></buy-ip-specification>
        <buy-defend
          isNotServer="true"
          :defend-specification="defendSpecification"
          @changeDefendBandwidth="changeDefendBandwidth"
        ></buy-defend>
      </div>
      <div class="lists">
        <buy-budget-list ref="budget"></buy-budget-list>
        <buy-selected-config
          :current-safelyip-config="currentSafelyIPConfig"
          @addToCart="addToCart"
        ></buy-selected-config>
      </div>
    </div>
    <div id="footer_page">
      <buy-footer
        server-type="NOKIAServer"
        :buyStep="buyStep"
        :is-fixed="isFixed"
        :time-config="timeConfig"
        :billing-type="billingType"
        :total-cost="totalCost"
        :total-coupon="totalCoupon"
        @minusBuyCount="minusBuyCount"
        @addBuyCount="addBuyCount"
        @minusBuyDay="minusBuyDay"
        @addBuyDay="addBuyDay"
        @changeBuyTime="changeBuyTime"
        @nextStep="nextStep"
      ></buy-footer>
    </div>
  </div>
</template>
<style lang="less" scoped>
.safelyIP-page {
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
import buyIpSpecification from "../buyComponents/buy-ip-specification";
import buyDefend from "../buyComponents/buy-defend";
import buySelectedConfig from "../buyComponents/buy-selected-config";
import buyBudgetList from "../buyComponents/buy-budget-list";
import buyFooter from "../buyComponents/buy-footer";
export default {
  components: {
    buyHeader,
    buyArea,
    buyBillingType,
    buyIpSpecification,
    buyDefend,
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
      billingTypeGroup: [{ text: "包年包月", value: "month" }],
      billingType: "month",
      network: {
        vpcId: "",
        vpcName: "",
        vpcGroup: [],
        bandwidth: 1,
        autoRenewal: true,
        price: 0,
        coupon: 0
      },
      // 防护配置
      defendSpecification: {
        defendBandwidthGroup: [
          {
            name: "60GB",
            value: 60
          },
          {
            name: "100GB",
            value: 100
          },
          {
            name: "200GB",
            value: 200
          },
          { name: "300GB", value: 300 },
          {
            name: "400GB",
            value: 400
          },
          {
            name: "500GB",
            value: 500
          },
          {
            name: "600GB",
            value: 600
          },
          {
            name: "700GB",
            value: 700
          },
          {
            name: "800GB",
            value: 800
          }
        ],
        defendBandwidth: 60,
        price: "0",
        coupon: "0"
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
    // 获取虚拟私有云vpc列表
    getVpcList() {
      axios
        .get("network/listVpcBuyComputer.do", {
          params: {
            zoneId: this.area.zoneid
          }
        })
        .then(response => {
          this.network.vpcGroup = response.data.result;
          this.network.vpcId = this.network.vpcGroup[0].vpcid;
          this.network.vpcName = this.network.vpcGroup[0].vpcname;
        });
    },
    setAreaData() {
      this.areaGroup = this.$store.state.zoneList.filter(zone => {
        return zone.gpuserver === 2;
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
        this.queryIPPrice();
        this.queryNOKIAServerSpecificationPrice();
        this.getVpcList();
      }
    },
    toOldVersion() {
      this.$router.push("/buy/ip");
    },
    changeArea(item) {
      this.area = item;
      this.queryIPPrice();
      this.queryNOKIAServerSpecificationPrice();
    },
    changeBillingType(item) {
      this.billingType = item.value;
      this.queryIPPrice();
      this.queryNOKIAServerSpecificationPrice();
    },
    changeVpc(val) {
      this.network.vpcId = val;
      this.network.vpcGroup.forEach(item => {
        if (this.network.vpcId === item.vpcid) {
          this.network.vpcName = item.vpcname;
        }
      });
    },
    changeBandwidth() {
      this.queryIPPrice();
    },
    changeDefendBandwidth(item) {
      this.defendSpecification.defendBandwidth = item.value;
      if (item.value >= 400) {
        this.billingTypeGroup = [
          { text: "包年包月", value: "month" },
          { text: "按天计费", value: "day" }
        ];
        this.billingType = "day";
      } else {
        this.billingTypeGroup = [{ text: "包年包月", value: "month" }];
        this.billingType = "month";
      }
      this.timeConfig.buyTime = 1;
      this.queryNOKIAServerSpecificationPrice();
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
    minusBuyDay() {
      this.timeConfig.buyDay > 1 ? (this.timeConfig.buyDay -= 1) : null;
      this.queryNOKIAServerSpecificationPrice();
      this.queryIPPrice();
    },
    addBuyDay() {
      this.timeConfig.buyDay += 1;
      this.queryNOKIAServerSpecificationPrice();
      this.queryIPPrice();
    },
    changeBuyTime() {
      this.queryIPPrice();
      this.queryNOKIAServerSpecificationPrice();
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
      this.createdSafelyIPOrder();
    },
    addToCart() {
      if (!this.area) {
        this.$Message.info("请选择需要购买的区域");
        return;
      }
      this.buybudget = [];
      if (localStorage.getItem("buybudget")) {
        this.buybudget = JSON.parse(localStorage.getItem("buybudget"));
      }
      this.addSafelyIP();
    },
    queryIPPrice: debounce(500, function() {
      let url = "device/queryIpPrice.do";
      let params = {
        brand: this.network.bandwidth,
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
      if (this.billingType === "day") {
        url = "ddosImitationhost/queryIpPrice.do";
        params.timeType = "current";
        params.timeValue = this.timeConfig.buyDay * 24;
      }
      axios.post(url, params).then(response => {
        this.network.price = response.data.cost;
        if (response.data.coupon) {
          this.network.coupon = response.data.coupon;
        } else {
          this.network.coupon = 0;
        }
      });
    }),
    // 查询高仿防护配置价格
    queryNOKIAServerSpecificationPrice: debounce(500, function() {
      let url = "device/QueryDdosPrice.do";
      let params = {
        zoneId: this.area.zoneid,
        timeType: this.billingType,
        timeValue: this.timeConfig.buyTime,
        ddosProtectNumber: this.defendSpecification.defendBandwidth
      };
      if (this.billingType === "day") {
        params.timeValue = this.timeConfig.buyDay;
      }
      axios.post(url, params).then(response => {
        this.defendSpecification.price = response.data.cost;
        if (response.data.coupon) {
          this.defendSpecification.coupon = response.data.coupon;
        } else {
          this.defendSpecification.coupon = 0;
        }
      });
    }),
    addSafelyIP() {},
    createdSafelyIPOrder() {}
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    },
    totalCost() {
      return (
        (this.network.price + this.defendSpecification.price) *
        this.timeConfig.buyCount
      ).toFixed(2);
    },
    // 折扣金额，设计图上没用到
    totalCoupon() {
      return "0";
    },
    currentSafelyIPConfig() {
      let config = {
        area: this.area,
        billingType: this.billingType,
        buyTime: this.timeConfig.buyTime,
        buyDay: this.timeConfig.buyDay,
        network: this.network.vpcName,
        bandwidth: this.network.bandwidth,
        defendBandwidth: this.defendSpecification.defendBandwidth,
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
    }
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  }
};
</script>