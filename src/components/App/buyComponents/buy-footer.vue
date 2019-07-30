<template>
  <div class="buy-footer" :class="{fixed:isFixed}">
    <div class="wrap">
      <div class="footer-content">
        <div class="buy-info">
          <div class="buy-num">
            <span>购买数量：</span>
            <ul>
              <li>-</li>
              <li>1</li>
              <li>+</li>
            </ul>
            <span>台</span>
          </div>
          <div class="buy-time">
            <span>购买时长：</span>
            <Select placeholder="请选择时长" v-model="buyTime" style="width:100px">
              <Option
                v-for="item in buyTimeGroup"
                :value="item.value"
                :key="item.value"
              >{{ item.label }}</Option>
            </Select>
          </div>
          <div class="buy-price">
            <span>总计费用：</span>
            <span class="money">¥ 2000.72</span>
            <a>点击查看计费规则</a>
          </div>
        </div>
        <div class="buy-guide">
          <a v-show="buyStep===0">特惠主机</a>
          <button v-show="buyStep===0" @click="nextStep(1)">下一步：配置网络</button>
          <button class="left-button" v-show="buyStep===1" @click="nextStep(0)">上一步：主机配置</button>
          <button v-show="buyStep===1" @click="nextStep(2)">下一步：登录信息</button>
          <button class="left-button" v-show="buyStep===2" @click="nextStep(1)">上一步：网络与带宽</button>
          <button v-show="buyStep===2" @click="nextStep(3)">下一步：提交订单</button>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.buy-footer {
  width: 100%;
  background: rgba(248, 248, 248, 1);
  box-shadow: 0px -3px 12px -9px rgba(166, 166, 166, 0.71);
  border: 1px solid rgba(225, 225, 225, 1);
  &.fixed {
    position: fixed;
    bottom: 0;
    z-index: 111;
  }
  .wrap {
    width: 1200px;
    margin: 0 auto;
    padding: 30px 0 24px 0;
    .footer-content {
      display: flex;
      justify-content: space-between;
      .buy-info {
        display: flex;
        .buy-num {
          display: flex;
          > span {
            font-size: 14px;
            font-family: MicrosoftYaHei;
            color: rgba(102, 102, 102, 1);
            line-height: 30px;
          }
          > ul {
            margin-left: 10px;
            margin-right: 5px;
            width: 95px;
            height: 30px;
            background: rgba(255, 255, 255, 1);
            border-radius: 2px;
            border: 1px solid rgba(225, 225, 225, 1);
            > li {
              float: left;
              font-size: 14px;
              font-family: MicrosoftYaHei;
              color: #666666;
              line-height: 30px;
              width: 33.3%;
              text-align: center;
            }
            li:nth-child(1) {
              border-right: 1px solid rgba(225, 225, 225, 1);
              cursor: pointer;
            }
            li:nth-child(2) {
              border-right: 1px solid rgba(225, 225, 225, 1);
              width: 33.4%;
            }
            li:nth-child(3) {
              cursor: pointer;
            }
          }
        }
        .buy-time {
          margin-left: 40px;
          display: flex;
          > span {
            font-size: 14px;
            font-family: MicrosoftYaHei;
            color: rgba(102, 102, 102, 1);
            line-height: 30px;
            margin-right: 10px;
          }
        }
        .buy-price {
          display: flex;
          margin-left: 40px;
          > span {
            font-size: 14px;
            font-family: MicrosoftYaHei;
            color: rgba(102, 102, 102, 1);
            line-height: 30px;
            margin-right: 10px;
          }
          .money {
            font-size: 18px;
            font-family: MicrosoftYaHei-Bold;
            font-weight: bold;
            color: rgba(255, 98, 75, 1);
          }
          > a {
            line-height: 30px;
            margin-left: 10px;
            font-size: 14px;
            color: rgba(66, 151, 242, 1);
          }
        }
      }
      .buy-guide {
        > a {
          font-size: 14px;
          font-family: MicrosoftYaHei;
          color: rgba(255, 255, 255, 1);
          background: rgba(255, 98, 75, 1);
          border-radius: 2px;
          padding: 9px 18px;
          margin-right: 10px;
        }
        > button {
          cursor: pointer;
          border: none;
          outline: none;
          padding: 8px 18px;
          background: #2a99f2;
          border-radius: 2px;
          font-size: 14px;
          font-family: MicrosoftYaHei;
          color: rgba(255, 255, 255, 1);
        }
        .left-button {
          margin-right: 10px;
          color: rgba(102, 102, 102, 1);
          background: rgba(247, 249, 250, 1);
          border: 1px solid rgba(198, 207, 216, 1);
        }
      }
    }
  }
}
</style>
<script type="text/ecmascript-6">
export default {
  data() {
    return {
      buyTime: "",
      buyTimeType: "",
      buyTimeGroup: []
    };
  },
  props: {
    buyStep: {
      type: Number,
      default: 0
    },
    isFixed: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    nextStep(val) {
      this.$emit("nextStep", val);
    }
  }
};
</script>