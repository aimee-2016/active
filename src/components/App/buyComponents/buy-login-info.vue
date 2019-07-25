<template>
  <div class="buy-login-info">
    <div class="wrap">
      <div class="content">
        <h2>登录信息</h2>
        <div class="specification-item">
          <div class="item-label">
            <span>主机信息</span>
          </div>
          <div class="item-text">
            <span
              v-for="(item,index) in loginInfo.setTypeGroup"
              :key="index"
              :class="{selected: loginInfo.setType === item.value}"
              @click="changeSetType(item)"
            >{{ item.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.buy-login-info {
  padding: 20px 0;
  .wrap {
    width: 1200px;
    margin: 0 auto;
    .content {
      width: 800px;
      min-height: 500px;
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
        }
      }
    }
  }
}
</style>
<script type="text/ecmascript-6">
export default {
  data() {
    return {};
  },
  props: {
    loginInfo: {
      type: Object,
      default: () => {
        return new Object();
      }
    }
  },
  methods: {
    changeSetType(item) {}
  }
};
</script>