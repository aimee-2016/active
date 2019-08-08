<template>
  <div class="buy-server-type">
    <div class="wrap">
      <h2>类型选择</h2>
      <div class="type-list">
        <div
          v-for="(item,index) in serverTypeGroup"
          :key="index"
          class="type-item"
          :class="{selected: serverType === item.value,disabled: index === 3}"
          @click="changeServerType(item)"
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
.buy-server-type {
  margin-top: 20px;
  .wrap {
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
        position: relative;
        &.selected {
          box-shadow: 0px 2px 12px -4px rgba(66, 151, 242, 0.43);
          border: 1px solid rgba(66, 151, 242, 1);
          &::before {
            content: "";
            display: inline-block;
            height: 31px;
            width: 34px;
            background: url("../../../assets/img/buy/buy_icon1.png");
            position: absolute;
            right: 0;
            top: 0;
          }
        }
        &.disabled {
          background: rgba(233, 233, 233, 0.22);
          border: 1px solid rgba(233, 233, 233, 1);
          cursor: not-allowed;
          .type-title {
            > h3 {
              color: rgba(153, 153, 153, 1);
            }
          }
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
export default {
  data() {
    return {};
  },
  props: {
    serverType: {
      type: String,
      default: ""
    },
    serverTypeGroup: {
      type: Array,
      default: () => {
        return new Array();
      }
    }
  },
  methods: {
    changeServerType(item) {
      this.$emit("changeServerType", item);
    }
  }
};
</script>