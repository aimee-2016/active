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
        <div class="specification-item">
          <div class="item-label">
            <span>系统用户名</span>
          </div>
          <div class="item-text">
            <span class="text">{{ loginInfo.loginName }}</span>
          </div>
        </div>
        <div class="specification-item short" v-if="loginInfo.setType==='defaultSet'">
          <div class="item-label">
            <span>登录密码</span>
          </div>
          <div class="item-text">
            <span class="text">默认密码 创建成功后通过短信查看</span>
          </div>
        </div>
        <div class="specification-item short" v-if="loginInfo.setType==='customSet'">
          <div class="item-label">
            <span>主机名称</span>
          </div>
          <div class="item-text">
            <Input v-model="serverInfo.serverName" placeholder="请输入主机名" style="width: 200px"></Input>
          </div>
        </div>
        <div
          class="specification-item short"
          v-if="loginInfo.setType==='customSet'&&loginInfo.mirrorName !== 'W'"
        >
          <div class="item-label">
            <span>登录方式</span>
          </div>
          <div class="item-text">
            <div class="login-type">
              <RadioGroup v-model="loginInfo.loginType">
                <Radio
                  v-for="(item,index) in loginInfo.loginTypeGroup"
                  :key="index"
                  :label="item.value"
                >{{ item.name}}</Radio>
              </RadioGroup>
            </div>
          </div>
        </div>
        <div
          class="specification-item short"
          v-if="loginInfo.setType==='customSet'&&loginInfo.loginType ==='password'"
        >
          <div class="item-label">
            <span>登录密码</span>
          </div>
          <div class="item-text">
            <Input
              v-model="serverInfo.serverPassword"
              placeholder="请输入主机登陆密码"
              style="width: 200px"
              @on-change="passwordWarning=''"
              @on-focus="passwordForm.passwordHint = true"
              @on-blur="passwordForm.passwordHint = false"
            ></Input>
            <div class="popTip" v-show="passwordForm.passwordHint">
              <div>
                <i :class="{reach: passwordForm.secondDegree}"></i>
                <p>不能输入连续6位数字或字母，如123456aA</p>
              </div>
              <div>
                <i :class="{reach: passwordForm.firstDegree}"></i>
                <p>长度8~30位，推荐使用12位以上的密码</p>
              </div>
              <div>
                <i :class="{reach: passwordForm.thirdDegree}"></i>
                <p>至少包含：小写字母，大写字母，数字</p>
              </div>
              <div>
                <p style="color:rgba(102,102,102,1);">可用特殊符号：~:，*_</p>
              </div>
            </div>
          </div>
        </div>
        <div
          class="specification-item short"
          v-if="loginInfo.setType==='customSet'&&loginInfo.loginType ==='ssh'"
        >
          <div class="item-label">
            <span>秘钥选择</span>
          </div>
          <div class="item-text">
            <Select placeholder="请选择秘钥" v-model="loginInfo.SSHID" style="width:200px;">
              <Option
                v-for="item in loginInfo.SSHIDGroup"
                :value="item.value"
                :key="item.value"
              >{{ item.label }}</Option>
            </Select>
            <p>
              <a class="view">新建SSH秘钥</a>
            </p>
          </div>
        </div>
        <div class="specification-item short">
          <div class="item-label">
            <span>自动续费</span>
          </div>
          <div class="item-text">
            <div class="renewal">
              <i-switch v-model="loginInfo.autoRenewal" @on-change="changeAutoRenewal"></i-switch>
              <span>开启后，资源到期会自动续费，请确保账户内有足够的余额。</span>
            </div>
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
          position: relative;
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
          .text {
            font-size: 14px;
            border: none;
            width: inherit;
            margin: 0;
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
          .login-type {
            padding-top: 6px;
          }
          > p {
            .view {
              line-height: 33px;
              margin-left: 10px;
              cursor: pointer;
              color: #4297f2;
            }
          }
          .popTip {
            width: 350px;
            padding: 19px 21px;
            position: absolute;
            background: #fff;
            border-radius: 8px;
            box-shadow: 0 2px 24px 0 rgba(125, 125, 125, 0.35);
            left: 200px;
            top: -50px;
            z-index: 3;
            > div {
              display: flex;
              > i {
                display: inline-block;
                border: 1px solid rgba(151, 151, 151, 1);
                margin-right: 3px;
                margin-top: 5px;
                height: 12px;
                width: 12px;
                border-radius: 6px;
                &.reach {
                  background: #09bc1d;
                  border: 1px solid #09bc1d;
                  &:before {
                    content: "";
                    display: inline-block;
                    background: #fff;
                    height: 1px;
                    width: 10px;
                    transform: translate(3px, -8px) rotate(-55deg);
                  }
                  &:after {
                    content: "";
                    display: inline-block;
                    background: #fff;
                    height: 1px;
                    width: 6px;
                    transform: translate(0px, -23px) rotate(215deg);
                  }
                }
                &.notreach {
                  background: #ff0000;
                  border: 1px solid #ff0000;
                  &:before {
                    content: "";
                    display: inline-block;
                    background: #fff;
                    height: 1px;
                    width: 10px;
                    transform: translate(0.5px, -7.5px) rotate(-45deg);
                  }
                  &:after {
                    content: "";
                    display: inline-block;
                    background: #fff;
                    height: 1px;
                    width: 10px;
                    transform: translate(0px, -25px) rotate(215deg);
                  }
                }
              }
              > p {
                font-size: 14px;
                font-family: MicrosoftYaHei;
                color: rgba(51, 51, 51, 1);
                line-height: 24px;
              }
            }
          }
        }
      }
      .short {
        margin-top: 8px;
      }
    }
  }
}
</style>
<script type="text/ecmascript-6">
import regExp from "@/util/regExp";
export default {
  data() {
    return {
      serverInfo: {
        serverName: "",
        serverPassword: ""
      },
      passwordForm: {
        passwordHint: false,
        //密码强度
        firstDegree: false,
        secondDegree: false,
        thirdDegree: false,
        firstError: false,
        secondError: false,
        thirdError: false
      }
    };
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
    changeSetType(item) {
      this.$emit("changeSetType", item);
    },
    changeAutoRenewal(val) {
      this.$emit("changeAutoRenewal", val);
    }
  },
  watch: {
    "serverInfo.serverPassword": {
      handler: function(val) {
        if (val.length > 7 && val.length < 31) {
          this.passwordForm.firstDegree = true;
        } else {
          this.passwordForm.firstDegree = false;
        }
        let len = val.length;
        let reg = /[0-9]/;
        let flag = false;
        // 当用户输入到第6位时，开始校验是否有6位连续字符
        if (len > 5) {
          flag = check(len);
          function check(index) {
            let count = 0;
            for (let i = index - 5; i < index; i++) {
              let next = reg.test(val[i]) ? val[i] : val[i].charCodeAt(); // 检查字符是数字还是字母，数字没转原因是9和：ACSII码连续
              let current = reg.test(val[i - 1])
                ? val[i - 1]
                : val[i - 1].charCodeAt();
              if (next - current === 1) {
                // 字母ACSII 码相差1 则为连续
                count += 1;
              }
            }
            if (count > 4) {
              // 有6位连续字符
              return true;
            } else if (count < 5 && index > 6) {
              return check(index - 1); // 递归继续校验
            } else {
              return false;
            }
          }
          if (flag && len > 5) {
            this.passwordForm.secondDegree = false;
          } else if (!flag && len > 5) {
            this.passwordForm.secondDegree = true;
          }
          if (len === 0) {
            this.passwordForm.secondDegree = false;
          }
          if (regExp.hostPassword(val)) {
            this.passwordForm.thirdDegree = true;
          } else {
            this.passwordForm.thirdDegree = false;
          }
        } else {
          this.passwordForm.secondDegree = false;
          this.passwordForm.secondDegree = true;
        }
      },
      deep: true
    }
  }
};
</script>