<template>
  <div class="server-page">
    <buy-header :title="headerTitle" @toOldVersion="toOldVersion('host')"></buy-header>
    <buy-step :buy-step-group="buyStepGroup" :buy-step="buyStep"></buy-step>
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
      @changeMirrorType="changeMirrorType"
    ></buy-mirror>
    <buy-server-specification
      :server-specification-group="serverSpecificationGroup"
      :server-specification="serverSpecification"
    ></buy-server-specification>
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
export default {
  components: {
    buyHeader,
    buyStep,
    buyServerType,
    buyBillingType,
    buyArea,
    buyMirror,
    buyServerSpecification
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
      area: {},
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
        rootDiskSize: "ssd"
      },
      // 每个区域对应的服务器规格配置
      serverSpecificationGroup: {}
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
                  this.serverSpecification.memory =
                    item.kernelList[0].RAMList[0].value;
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
    }
  }
};
</script>