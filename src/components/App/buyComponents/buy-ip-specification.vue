<template>
  <div class="buy-ip-specification">
    <div class="wrap">
      <div class="content">
        <h2>网络与带宽</h2>
        <div class="specification-item">
          <div class="item-label">
            <span>虚拟私有云</span>
          </div>
          <div class="item-text">
            <Select
              placeholder="请选择VPC"
              v-model="network.vpcId"
              style="width:200px;margin-right: 10px"
            >
              <Option
                v-for="item in network.vpcGroup"
                :value="item.value"
                :key="item.value"
              >{{ item.label }}</Option>
            </Select>
          </div>
        </div>
        <div class="specification-item">
          <div class="item-label">
            <span>带宽</span>
          </div>
          <div class="item-slider">
            <i-slider
              v-model="network.bandwidth"
              unit="MB"
              :min="1"
              :max="100"
              :step="1"
              :points="[30,50]"
              style="margin-right:30px;vertical-align: middle;"
            ></i-slider>
            <InputNumber
              :max="100"
              :min="1"
              v-model="network.bandwidth"
              size="large"
              :step="1"
              :precision="0"
            ></InputNumber>
          </div>
        </div>
        <div class="specification-item short">
          <div class="item-label">
            <span>自动续费</span>
          </div>
          <div class="item-text">
            <div class="renewal">
              <i-switch v-model="network.autoRenewal" @on-change="changeAutoRenewal"></i-switch>
              <span>开启后，资源到期会自动续费，请确保账户内有足够的余额。</span>
            </div>
          </div>
        </div>
        <div class="specification-item">
          <div class="item-label">
            <span>
              价格
              <Poptip trigger="hover" placement="top-start" content="包含公网IP与带宽费用">
                <span class="label-hint">?</span>
              </Poptip>
            </span>
          </div>
          <div class="item-text">
            <p class="price">￥750/月</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.buy-ip-specification {
  margin-top: 10px;
  .wrap {
    width: 1200px;
    margin: 0 auto;
    .content {
      width: 800px;
      padding: 30px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 2px 14px -7px rgba(166, 166, 166, 0.3);
      > h2 {
        font-size: 18px;
        font-family: MicrosoftYaHei-Bold;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
      }
      .specification-item {
        margin-top: 20px;
        display: flex;
        .item-label {
          width: 90px;
          padding-right: 20px;
          text-align: right;
          > span {
            font-size: 14px;
            font-family: MicrosoftYaHei;
            color: rgba(51, 51, 51, 1);
            line-height: 33px;
          }
          .label-hint {
            display: inline-block;
            text-align: center;
            color: #2a99f2;
            width: 14px;
            height: 14px;
            border: 1px solid #2a99f2;
            border-radius: 50%;
            font-size: 12px;
          }
        }
        .item-text {
          display: flex;
          > span {
            text-align: center;
            margin-right: 10px;
            font-size: 14px;
            font-family: MicrosoftYaHei;
            color: rgba(102, 102, 102, 1);
            width: 106px;
            border: 1px solid rgba(217, 217, 217, 1);
            line-height: 33px;
            cursor: pointer;
            &.selected {
              color: rgba(66, 151, 242, 1);
              box-shadow: 0px 2px 10px -3px rgba(66, 151, 242, 0.49);
              border: 1px solid rgba(66, 151, 242, 1);
            }
          }
          .cancel {
            text-align: left;
            color: #4297f2;
            border: none;
          }
          > p {
            font-size: 12px;
            font-family: MicrosoftYaHei;
            color: rgba(153, 153, 153, 1);
            > a {
              color: #4297f2;
            }
            > span {
              color: #ff9801;
            }
            .view {
              line-height: 33px;
              margin-left: 10px;
              cursor: pointer;
              color: #4297f2;
            }
          }
          .price {
            font-size: 16px;
            font-family: MicrosoftYaHei;
            color: rgba(255, 98, 75, 1);
            line-height: 33px;
          }
          .renewal {
            > span {
              margin-right: 10px;
              font-size: 12px;
              font-family: MicrosoftYaHei;
              color: rgba(153, 153, 153, 1);
              line-height: 33px;
            }
          }
        }
        .item-slider {
          width: 500px;
          display: flex;
          align-items: center;
        }
      }
      .text-hint {
        margin-top: 10px;
      }
    }
  }
}
</style>
<script type="text/ecmascript-6">
import axios from "axios";
export default {
  data() {
    return {};
  },
  props: {
    network: {
      type: Object,
      default: () => {
        return new Object();
      }
    }
  },
  methods: {
    changeAutoRenewal(val) {
      this.$emit("changeAutoRenewal", val);
    }
  }
};
</script>