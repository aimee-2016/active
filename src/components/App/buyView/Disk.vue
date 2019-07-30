<template>
  <div class="disk-page">
    <buy-header title-name="购买云硬盘" @toOldVersion="toOldVersion('host')"></buy-header>
    <buy-area isNotServer="true" :area-group="areaGroup" :area="area" @changeArea="changeArea"></buy-area>
    <buy-disk-group
      isNotServer="true"
      :area="area"
      :diskSpecification="diskSpecification"
      @addSystemDisk="addSystemDisk"
      @changeSystemDiskType="changeSystemDiskType"
      @deleteSystemDisk="deleteSystemDisk"
      @changeAutoRenewal="changeAutoRenewal"
    ></buy-disk-group>
  </div>
</template>
<style lang="less" scoped>
.disk-page {
  background: rgba(248, 248, 248, 1);
}
</style>
<script type="text/ecmascript-6">
import axios from "axios";
import $store from "@/vuex";
import buyHeader from "../buyComponents/buy-header";
import buyArea from "../buyComponents/buy-area";
import buyDiskGroup from "../buyComponents/buy-disk-group";
export default {
  components: {
    buyHeader,
    buyArea,
    buyDiskGroup
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
      areaGroup: [],
      area: null,
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
        autoRenewal: true
      }
    };
  },
  created() {
    this.setAreaData();
  },
  methods: {
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
      this.$router.push("/buy/disk");
    },
    changeArea(item) {
      this.area = item;
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
    },
    deleteSystemDisk(index) {
      this.diskSpecification.systemDisk.splice(index, 1);
    },
    changeAutoRenewal(val) {
      this.diskSpecification.autoRenewal = val;
    }
  }
};
</script>