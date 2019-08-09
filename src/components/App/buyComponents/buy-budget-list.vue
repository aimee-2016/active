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
        <Table :height="maxHeight" :columns="buyBudgetColumns" :data="buyBudgetData"></Table>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="primary">立即购买</Button>
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
</style>
<script type="text/ecmascript-6">
import axios from "axios";
export default {
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
          width: 200
        },
        {
          title: "计费类型"
        },
        {
          title: "购买时长"
        },
        {
          title: "数量"
        },
        {
          title: "价格"
        },
        {
          title: "操作"
        }
      ],
      buyBudgetData: [{}, {}, {}]
    };
  },
  props: {},
  methods: {
    setBuyBudget() {
      console.log(111111111111);
    },
    viewBuyBudget() {
      this.showModal.budgetDetails = true;
    }
  },
  computed: {
    maxHeight() {
      if (this.buyBudgetData.length > 2) {
        return 400;
      } else {
        return "";
      }
    }
  }
};
</script>