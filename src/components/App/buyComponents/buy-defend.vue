<template>
  <div class="buy-defend">
    <div class="wrap">
      <h2>防护选择</h2>
      <div class="specification-item">
        <div class="item-label">
          <span>防护带宽</span>
        </div>
        <div class="item-text">
          <span
            v-for="(item,index) in defendBandwidthGroup"
            :key="index"
            :class="{selected: defendBandwidth === item.value}"
          >{{ item.name }}</span>
        </div>
      </div>
      <div class="specification-hint">
        <p>高防服务器适用于网站、ERP、邮局、游戏、OA等所有应用，严禁一切私服、外挂、色情、传播病毒等非法网站，严禁利用服务器资源进行流量穿透、扫描肉机、架设私服、翻墙破网、黑客攻击等非法应用。一经发现违规网站/非法应用，立即永久关闭。</p>
      </div>
      <div class="specification-item">
        <div class="item-label">
          <span>
            价格
            <Poptip trigger="hover" placement="top-start" content="包含CPU、内存、系统盘与数据盘在内的价格总计">
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
</template>
<style lang="less" scoped>
.buy-defend {
  margin-top: 10px;
  .wrap {
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
          width: 80px;
          border: 1px solid rgba(217, 217, 217, 1);
          line-height: 33px;
          cursor: pointer;
          &.selected {
            color: rgba(66, 151, 242, 1);
            box-shadow: 0px 2px 10px -3px rgba(66, 151, 242, 0.49);
            border: 1px solid rgba(66, 151, 242, 1);
          }
        }
        .price {
          font-size: 16px;
          font-family: MicrosoftYaHei;
          color: rgba(255, 98, 75, 1);
          line-height: 33px;
        }
      }
    }
    .specification-hint {
      margin-top: 10px;
      padding-left: 14px;
      > p {
        font-size: 12px;
        font-family: MicrosoftYaHei;
        color: rgba(102, 102, 102, 1);
        line-height: 20px;
      }
    }
  }
}
</style>
<script type="text/ecmascript-6">
export default {
  data() {
    return {
      defendBandwidthGroup: [
        {
          name: "60GB",
          value: 60
        },
        {
          name: "100GB",
          value: 100
        },
        {
          name: "200GB",
          value: 200
        },
        { name: "300GB", value: 300 }
      ],
      defendBandwidth: 60
    };
  },
  props: {},
  methods: {}
};
</script>