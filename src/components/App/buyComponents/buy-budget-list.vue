<template>
  <div class="buy-budget-list">
    <div class="wrap">
      <h3>
        预算清单
        <span v-if="buyBudgetData.length !==0">{{buyBudgetData.length}}</span>
      </h3>
      <button @click="viewBuyBudget">查看清单详情</button>
    </div>
    <!-- 挂载硬盘模态框 -->
    <Modal v-model="showModal.budgetDetails" width="800" :scrollable="true" :mask-closable="false">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">预算清单</span>
      </p>
      <div class="universal-modal-content-flex">
        <Table
          :height="maxHeight"
          :columns="buyBudgetColumns"
          :data="buyBudgetData"
          @on-selection-change="changeBudgetSelected"
        ></Table>
        <div class="modal-price clearfix">
          <div class="left">
            <p>
              <img src="../../../assets/img/buy/buy_icon2.png" />
              <a>下载当前清单详情</a>
            </p>
          </div>
          <div class="right">
            <p>
              <span>
                已选择
                <span>{{ budgetSelected.length}}</span> 项
              </span>
              总价：¥ {{totalCost}}
            </p>
          </div>
        </div>
      </div>
      <div slot="footer" class="modal-footer-border">
        <p class="modal-hint">
          批量购买之前您可以联系新睿云客户经理获取专属优惠支持，点击
          <a>联系客户经理</a>
        </p>
        <Button type="primary" @click="buyNow">立即购买</Button>
      </div>
    </Modal>
  </div>
</template>
<style lang="less" scoped>
.buy-budget-list {
  padding: 14px 20px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 20px -8px rgba(0, 0, 0, 0.5);
  .wrap {
    display: flex;
    justify-content: space-between;
    > h3 {
      font-size: 18px;
      font-family: MicrosoftYaHei-Bold;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
      line-height: 36px;
      > span {
        width: 20px;
        height: 20px;
        background: rgba(255, 0, 0, 1);
        font-size: 14px;
        font-family: MicrosoftYaHei;
        color: rgba(255, 255, 255, 1);
        line-height: 20px;
        text-align: center;
        display: inline-block;
        border-radius: 50%;
      }
    }
    > button {
      cursor: pointer;
      border: none;
      outline: none;
      padding: 8px 18px;
      font-size: 14px;
      font-family: MicrosoftYaHei;
      color: rgba(255, 255, 255, 1);
      background: rgba(42, 153, 242, 1);
      border-radius: 2px;
    }
  }
}
.modal-price {
  margin-top: 20px;
  .left {
    float: left;
    a {
      font-size: 12px;
      font-family: MicrosoftYaHei;
      color: rgba(66, 151, 242, 1);
    }
  }
  .right {
    float: right;
    > p {
      font-size: 24px;
      font-family: MicrosoftYaHei-Bold;
      font-weight: bold;
      color: rgba(255, 98, 75, 1);
      > span {
        margin-right: 10px;
        font-weight: normal;
        font-size: 12px;
        font-family: MicrosoftYaHei;
        color: rgba(102, 102, 102, 1);
        > span {
          color: #4297f2;
        }
      }
    }
  }
}
.modal-hint {
  float: left;
  > a {
    font-size: 12px;
    font-family: MicrosoftYaHei;
    color: #4297f2;
  }
}
.clearfix {
  &::after {
    content: "";
    display: block;
    clear: both;
    zoom: 1;
  }
}
</style>
<script type="text/ecmascript-6">
import axios from "axios";
import uuid from "uuid";
export default {
  name: "budget",
  data() {
    return {
      showModal: {
        budgetDetails: false
      },
      buyBudgetColumns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "资源",
          width: 200,
          render: (h, params) => {
            let arr = [];
            // 数据盘转文字
            let diskListText = "无数据盘";
            if (params.row.diskList) {
              if (params.row.diskList.length === 0) {
                diskListText = "无数据盘";
              } else {
                diskListText = "";
                params.row.diskList.forEach(item => {
                  diskListText += item.size + "G " + item.type + " ";
                });
              }
            }
            // 公网IP转文字
            let publicIPTypeText = "";
            if (params.row.publicIPType) {
              publicIPTypeText =
                params.row.publicIPType === "buyNow" ? "立即购买" : "暂不购买";
            }
            let item_1 = "",
              item_2 = h("li", {}, "地区：" + params.row.zoneName),
              item_3 = h("li", {}, "镜像：" + params.row.templateName),
              item_4 = h(
                "li",
                {},
                "服务器规格：" +
                  params.row.cpuNum +
                  "核" +
                  params.row.memory +
                  "G"
              ),
              item_5 = h(
                "li",
                {},
                "系统盘与存储：" +
                  params.row.rootDiskSize +
                  "G " +
                  params.row.rootDiskType +
                  " " +
                  diskListText
              ),
              item_6 = h("li", {}, "网络：" + params.row.network),
              item_7 = h("li", {}, "公网IP：" + publicIPTypeText),
              item_8 = h("li", {}, "带宽大小：" + params.row.bandWidth + "MB"),
              item_9 = h("li", {}, "防火墙：" + params.row.firewall),
              item_10 = h("li", {}, "GPU类型：" + params.row.GPUType),
              item_11 = h(
                "li",
                {},
                "防护带宽：" + params.row.ddosProtectNumber + "GB"
              ),
              item_12 = h("li", {}, "虚拟私有云：" + params.row.vpcName),
              item_13 = h("li", {}, "带宽大小：" + params.row.brandWith + "MB");
            switch (params.row.type) {
              case "cloudServer":
                item_1 = h("li", {}, "类型：云服务器");
                arr.push(
                  item_1,
                  item_2,
                  item_3,
                  item_4,
                  item_5,
                  item_6,
                  item_7,
                  item_8,
                  item_9
                );
                break;
              case "GPUServer":
                item_1 = h("li", {}, "类型：GPU服务器");
                arr.push(
                  item_1,
                  item_2,
                  item_3,
                  item_4,
                  item_10,
                  item_5,
                  item_6,
                  item_7,
                  item_8,
                  item_9
                );
                break;
              case "NOKIAServer":
                item_1 = h("li", {}, "类型：高仿服务器");
                arr.push(
                  item_1,
                  item_2,
                  item_3,
                  item_4,
                  item_11,
                  item_5,
                  item_6,
                  item_7,
                  item_8,
                  item_9
                );
                break;
              case "database":
                item_1 = h("li", {}, "类型：云数据库");
                arr.push(
                  item_1,
                  item_2,
                  item_3,
                  item_4,
                  item_5,
                  item_6,
                  item_7,
                  item_8,
                  item_9
                );
                break;
              case "disk":
                item_1 = h("li", {}, "类型：云硬盘");
                item_5 = h("li", {}, "存储：" + diskListText);
                arr.push(item_1, item_5);
                break;
              case "networkip":
                item_1 = h("li", {}, "类型：公网IP");
                arr.push(item_1, item_12, item_13);
                break;
            }
            return h(
              "ul",
              {
                style: {
                  paddingTop: "10px",
                  paddingBottom: "10px"
                }
              },
              arr
            );
          }
        },
        {
          title: "计费类型",
          render: (h, params) => {
            let billingType = "";
            switch (params.row.timeType) {
              case "year":
                billingType = "包年包月";
              case "month":
                billingType = "包年包月";
                break;
              case "current":
                billingType = "实时计费";
                break;
              case "week":
                billingType = "7天计费";
                break;
              case "day":
                billingType = "按天计费";
                break;
            }
            return h("span", {}, billingType);
          }
        },
        {
          title: "购买时长",
          render: (h, params) => {
            let buyTime = "";
            switch (params.row.timeType) {
              case "year":
                buyTime = params.row.timeValue + "年";
                break;
              case "month":
                buyTime = params.row.timeValue + "月";
                break;
              case "current":
                buyTime = "实时计费";
                break;
              case "week":
                buyTime = "7天";
                break;
              case "day":
                buyTime = params.row.timeValue + "天";
                break;
            }
            return h("span", {}, buyTime);
          }
        },
        {
          title: "数量",
          key: "count"
        },
        {
          title: "价格",
          render: (h, params) => {
            return h("span", {}, "￥" + params.row.price);
          }
        },
        {
          title: "操作",
          render: (h, params) => {
            return h(
              "span",
              {
                style: {
                  cursor: "pointer",
                  color: "#2A99F2"
                }
              },
              "删除"
            );
          }
        }
      ],
      buyBudgetData: [],
      budgetSelected: []
    };
  },
  props: {},
  created() {
    if (localStorage.getItem("buybudget")) {
      this.buyBudgetData = JSON.parse(localStorage.getItem("buybudget"));
    }
  },
  methods: {
    setBuyBudget() {
      this.buyBudgetData = [];
      if (localStorage.getItem("buybudget")) {
        this.buyBudgetData = JSON.parse(localStorage.getItem("buybudget"));
      }
      this.$Message.success("添加预算清单成功");
    },
    viewBuyBudget() {
      this.showModal.budgetDetails = true;
    },
    changeBudgetSelected(arr) {
      this.budgetSelected = arr;
    },
    buyNow() {
      if (this.userInfo == null) {
        this.$LR({ type: "login" });
        return;
      }
      if (this.budgetSelected.length === 0) {
        this.$Message.info("请选择需要购买的资源");
        return;
      }
      let PromiseList = [];
      let countOrder = uuid.v4();
      let url = "";
      let params = {};
      this.budgetSelected.forEach(item => {
        switch (item.type) {
          case "cloudServer":
            url = "information/deployVirtualMachine.do";
            params = {
              zoneId: item.zoneId,
              timeType: item.timeType,
              timeValue: item.timeValue,
              templateId: item.templateId,
              isAutoRenew: item.isAutoRenew,
              count: item.count,
              cpuNum: item.cpuNum,
              memory: item.memory,
              bandWidth: item.bandWidth,
              rootDiskType: item.rootDiskType,
              rootDiskSize: item.rootDiskSize,
              vpcId: item.vpcId,
              networkId: item.networkId,
              diskType: item.diskType,
              diskSize: item.diskSize,
              countOrder
            };
            if (item.VMName) {
              params.VMName = item.VMName;
              params.password = item.password;
            }
            PromiseList.push(axios.get(url, { params }));
            break;
        }
      });
      console.log(PromiseList)
      Promise.all(PromiseList).then(responseList => {
        if (
          responseList.every(item => {
            return item.status == 200 && item.data.status == 1;
          })
        ) {
          this.$router.push({
            path: "/order",
            query: {
              countOrder
            }
          });
        } else {
          let len = responseList.length;
          if (len > 0) {
            for (let i = 0; i < len; i++) {
              if (responseList[i].data.status != 1) {
                this.$message.info({
                  content: responseList[i].data.message
                });
                break;
              }
            }
          } else {
            this.$message.info({
              content: "网络出现问题，请稍候再试"
            });
          }
        }
      });
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    },
    maxHeight() {
      if (this.buyBudgetData.length > 2) {
        return 400;
      } else {
        return "";
      }
    },
    totalCost() {
      let price = 0;
      if (this.budgetSelected.length !== 0) {
        this.budgetSelected.forEach(item => {
          price += parseFloat(item.price);
        });
      }
      return price.toFixed(2);
    }
  }
};
</script>