<template>
  <div class="buy-network">
    <div class="wrap">
      <div class="content">
        <h2>网络选择</h2>
        <div class="specification-item">
          <div class="item-label">
            <span>网络</span>
          </div>
          <div class="item-text">
            <Select
              placeholder="请选择VPC"
              v-model="serverNetwork.vpcId"
              style="width:200px;margin-right: 10px"
            >
              <Option
                v-for="(item,index) in serverNetwork.vpcGroup"
                :value="item.vpcid"
                :key="index"
              >{{ item.vpcname }}</Option>
            </Select>
            <Select placeholder="请选择子网" v-model="serverNetwork.networkId" style="width:200px">
              <Option
                v-for="(item,index) in serverNetwork.networkGroup"
                :value="item.ipsegmentid"
                :key="index"
              >{{ item.name }}</Option>
            </Select>
          </div>
        </div>
        <div class="specification-item text-hint">
          <div class="item-label"></div>
          <div class="item-text">
            <p>
              如需使用其他虚拟私有云（VPC），请选择已有虚拟私有云（VPC），也可以自行到控制台
              <a>新建VPC</a>
            </p>
          </div>
        </div>
        <div class="specification-item">
          <div class="item-label">
            <span>弹性公网IP</span>
          </div>
          <div class="item-text">
            <span
              v-for="(item,index) in serverNetwork.publicIPTypeGroup"
              :key="index"
              :class="{selected: serverNetwork.publicIPType === item.value}"
              @click="changepublicIPType(item)"
            >{{ item.name }}</span>
          </div>
        </div>
        <div class="specification-item" v-show="serverNetwork.publicIPType === 'buyNow'">
          <div class="item-label">
            <span>带宽</span>
          </div>
          <div class="item-slider">
            <i-slider
              v-model="serverNetwork.bandwidth"
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
              v-model="serverNetwork.bandwidth"
              size="large"
              :step="1"
              :precision="0"
            ></InputNumber>
          </div>
        </div>
        <div v-show="serverNetwork.publicIPType === 'useOwn'">
          <div class="specification-item">
            <div class="item-label"></div>
            <div class="item-text">
              <Select
                placeholder="请选择公网IP"
                v-model="serverNetwork.publicIPID"
                style="width:200px;margin-right: 10px"
              >
                <Option
                  v-for="item in serverNetwork.publicIPGroup"
                  :value="item.value"
                  :key="item.value"
                >{{ item.label }}</Option>
              </Select>
            </div>
          </div>
          <div class="specification-item text-hint">
            <div class="item-label"></div>
            <div class="item-text">
              <p>
                <span>没有公网IP？</span>
                请检查您已有的公网IP所属网络与本次购买主机网络是否一致
              </p>
            </div>
          </div>
        </div>
        <div class="specification-item">
          <div class="item-label">
            <span>防火墙</span>
          </div>
          <div class="item-text">
            <Select placeholder="请选择防火墙" v-model="serverNetwork.firewall" style="width:200px;">
              <Option
                v-for="(item,index) in serverNetwork.firewallGroup"
                :value="item.acllistid"
                :key="index"
              >{{ item.acllistname }}</Option>
            </Select>
            <p>
              <span class="view" @click="viewFireWallRule">查看防火墙配置详情</span>
            </p>
          </div>
        </div>
        <div class="specification-item text-hint">
          <div class="item-label"></div>
          <div class="item-text">
            <p>
              如您有业务需要开通其他端口，您可以
              <a>新建防火墙</a>
            </p>
          </div>
        </div>
        <div class="specification-item" v-show="fireWallRuleShow">
          <div class="item-label">
            <span>防火墙规则</span>
          </div>
          <div class="item-text">
            <Tabs type="card" :animated="false">
              <TabPane label="入站规则">
                <Table
                  :columns="serverNetwork.upRuleCol"
                  :data="serverNetwork.upRuleData"
                  style="width:620px;"
                ></Table>
              </TabPane>
              <TabPane label="出站规则">
                <Table
                  :columns="serverNetwork.downRuleCol"
                  :data="serverNetwork.downRuleData"
                  style="width:620px;"
                ></Table>
              </TabPane>
            </Tabs>
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
.buy-network {
  padding: 20px 0;
  .wrap {
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
    return {
      fireWallRuleShow: false
    };
  },
  props: {
    serverNetwork: {
      type: Object,
      default: () => {
        return new Object();
      }
    },
    area: {
      type: Object,
      default: () => {
        return new Object();
      }
    }
  },
  methods: {
    changepublicIPType(item) {
      this.$emit("changepublicIPType", item);
    },
    viewFireWallRule() {
      //   axios
      //     .get("network/listAclList.do", {
      //       params: {
      //         zoneId: this.area.zoneid,
      //         aclId: this.serverNetwork.networkId
      //       }
      //     })
      //     .then(response => {
      //       if (response.status == 200 && response.data.status == 1) {
      //         this.acllist[0].acllistname = response.data.result[0].acllistname;
      //         this.upRuleData = response.data.result[0].acllistitem.filter(
      //           item => {
      //             return item.type == "Ingress";
      //           }
      //         );
      //         this.downRuleData = response.data.result[0].acllistitem.filter(
      //           item => {
      //             return item.type != "Ingress";
      //           }
      //         );
      //         this.fireWallRuleShow = true;
      //       } else {
      //         this.$message.info({
      //           content: response.data.message
      //         });
      //       }
      //     });
      this.fireWallRuleShow = true;
    }
  }
};
</script>