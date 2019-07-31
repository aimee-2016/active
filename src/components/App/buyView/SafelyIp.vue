<template>
  <div class="safelyIP-page">
    <buy-header title-name="购买高仿IP" @toOldVersion="toOldVersion"></buy-header>
    <buy-area isNotServer="true" :area-group="areaGroup" :area="area" @changeArea="changeArea"></buy-area>
    <buy-billing-type
      isNotServer="true"
      :billing-type-group="billingTypeGroup"
      :billing-type="billingType"
      @changeBillingType="changeBillingType"
    ></buy-billing-type>
    <buy-ip-specification :network="network" @changeAutoRenewal="changeAutoRenewal"></buy-ip-specification>
    <buy-defend isNotServer="true"></buy-defend>
    <div id="footer_page">
      <buy-footer :buyStep="buyStep" :is-fixed="isFixed" @nextStep="nextStep"></buy-footer>
    </div>
  </div>
</template>
<style lang="less" scoped>
.safelyIP-page {
  background: rgba(248, 248, 248, 1);
  #footer_page {
    margin-top: 20px;
  }
}
</style>
<script type="text/ecmascript-6">
import axios from "axios";
import $store from "@/vuex";
import buyHeader from "../buyComponents/buy-header";
import buyArea from "../buyComponents/buy-area";
import buyBillingType from "../buyComponents/buy-billing-type";
import buyIpSpecification from "../buyComponents/buy-ip-specification";
import buyDefend from "../buyComponents/buy-defend";
import buyFooter from "../buyComponents/buy-footer";
export default {
  components: {
    buyHeader,
    buyArea,
    buyBillingType,
    buyIpSpecification,
    buyDefend,
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
      // 标志购买栏是否固定于底部
      isFixed: false,
      areaGroup: [],
      area: null,
      billingTypeGroup: [
        { text: "包年包月", value: "monthly" },
        { text: "实时计费", value: "timely" }
      ],
      billingType: "monthly",
      network: {
        vpcId: "",
        vpcGroup: [],
        bandwidth: 1,
        autoRenewal: true
      },
      buyStep: 3
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
    changeAutoRenewal(val) {
      this.network.autoRenewal = val;
    },
    nextStep() {}
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  }
};
</script>