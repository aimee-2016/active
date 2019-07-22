<template>
  <div class="server-page">
    <buy-header title="购买云服务器" @toOldVersion="toOldVersion('host')"></buy-header>
    <div class="buy-step">
      <div
        v-for="(item,index) in buyStepGroup"
        :key="index"
        class="step-item"
        :class="{onStep: buyStep >= index}"
      >
        <div class="step-index">
          <span>{{index + 1}}</span>
        </div>
        <div class="step-text">
          <span>{{ item }}</span>
        </div>
        <div class="step-line" v-if="index < 3"></div>
      </div>
    </div>
    <div class="buy-type">
      <h2>类型选择</h2>
      <div class="type-list">
        <div
          v-for="(item,index) in typeGroup"
          :key="index"
          class="type-item"
          :class="{selected: index === 0,disabled: index === 3}"
        >
          <div class="type-img">
            <img :src="item.imgurl" alt="buy type" />
          </div>
          <div class="type-title">
            <h3>{{ item.title}}</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.server-page {
  background: rgba(248, 248, 248, 1);
  .buy-step {
    width: 1200px;
    margin: 20px auto;
    display: flex;
    justify-content: space-between;
    .step-item {
      position: relative;
      display: flex;
      .step-index {
        width: 28px;
        height: 28px;
        border: 1px solid rgba(153, 153, 153, 1);
        background: #fff;
        border-radius: 50%;
        text-align: center;
        span {
          font-size: 14px;
          font-family: HelveticaNeue;
          color: rgba(153, 153, 153, 1);
          line-height: 28px;
        }
      }
      .step-text {
        margin-left: 10px;
        span {
          font-size: 16px;
          font-family: MicrosoftYaHei;
          color: rgba(153, 153, 153, 1);
          line-height: 28px;
        }
      }
      .step-line {
        margin-left: 20px;
        height: 2px;
        width: 218px;
        border: 1px solid rgba(233, 233, 233, 1);
        position: relative;
        top: 50%;
      }
      &.onStep {
        .step-index {
          border: 1px solid rgba(74, 151, 238, 1);
          background: rgba(74, 151, 238, 1);
          span {
            color: #fff;
          }
        }
        .step-text {
          span {
            color: #666666;
          }
        }
        .step-line {
          border: 1px solid rgba(74, 151, 238, 1);
        }
      }
    }
  }
  .buy-type {
    width: 1200px;
    margin: 0 auto;
    padding: 30px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 14px -7px rgba(166, 166, 166, 0.3);
    > h2 {
      font-size: 18px;
      font-family: MicrosoftYaHei-Bold;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
    }
    .type-list {
      margin-top: 20px;
      display: flex;
      justify-content: space-between;
      .type-item {
        width: 270px;
        height: 172px;
        cursor: pointer;
        background: rgba(255, 255, 255, 1);
        border-radius: 4px;
        border: 1px solid rgba(233, 233, 233, 1);
        padding-bottom: 15px;
        &.selected {
          box-shadow: 0px 2px 12px -4px rgba(66, 151, 242, 0.43);
          border: 1px solid rgba(66, 151, 242, 1);
        }
        &.disabled {
          background: rgba(233, 233, 233, 0.22);
          border: 1px solid rgba(233, 233, 233, 1);
          cursor: not-allowed;
        }
        .type-img {
          padding-top: 15px;
          padding-left: 80px;
        }
        .type-title {
          > h3 {
            text-align: center;
            font-size: 16px;
            font-family: MicrosoftYaHei;
            color: rgba(51, 51, 51, 1);
            font-weight: normal;
          }
        }
      }
    }
  }
}
</style>
<script type="text/ecmascript-6">
import buyHeader from "../buyComponents/buy-header";
export default {
  components: {
    buyHeader
  },
  data() {
    return {
      buyStep: 0,
      buyStepGroup: ["主机配置", "网络与带宽", "登陆信息", "订单确认"],
      typeGroup: [
        {
          imgurl: require("../../../assets/img/buy/buy_serverType1.png"),
          title: "云服务器"
        },
        {
          imgurl: require("../../../assets/img/buy/buy_serverType2.png"),
          title: "高防服务器"
        },
        {
          imgurl: require("../../../assets/img/buy/buy_serverType3.png"),
          title: "GPU服务器"
        },
        {
          imgurl: require("../../../assets/img/buy/buy_serverType4.png"),
          title: "裸金属服务器"
        }
      ]
    };
  },
  methods: {
    toOldVersion(val) {
      this.$router.push("/buy/host");
    }
  }
};
</script>