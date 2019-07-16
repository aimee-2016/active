<template>
  <div id="background">
    <div id="wrapper">
      <span class="title">
        云安全 / DDoS高防IP /业务管理 /
        <span>添加域名</span>
      </span>
      <div id="content">
        <div id="header">
          <i class="back-btn" @click="$router.push('/ddosipback')">
            <Icon type="chevron-left" style="font-size:12px;"></Icon>
          </i>
          <span id="title">添加域名</span>
          <button id="refresh_button" @click="$router.go(0)" style="margin-top: 10px;">刷新</button>
        </div>
        <div class="main">
          <Steps :current="steps">
            <Step title="填写域名信息"></Step>
            <Step title="修改DNS解析"></Step>
            <Step title="高防IP加白"></Step>
          </Steps>
          <div class="md-cer universal-modal-label-14px hide-star-symbol" v-if="steps==0">
            <Form
              ref="addDomainList"
              :model="addDomainList"
              :rules="addDomainListRule"
              :label-width="100"
            >
              <FormItem label="套餐选择" prop="attackMeal">
                <Select v-model="addDomainList.attackMeal" style="width:394px;">
                  <Option
                    v-for="item in setMealList"
                    :value="item.packageid"
                    :key="item.packageid"
                  >{{ item.packageid }}</Option>
                </Select>
              </FormItem>
              <FormItem label="添加域名" prop="domain">
                <Input
                  v-model="addDomainList.domain"
                  placeholder="www.test.com"
                  style="width:394px;"
                ></Input>
                <p class="y-p">注意：一级域名与二级域名需要分开配置</p>
              </FormItem>
              <FormItem label="使用协议" prop="http">
                <CheckboxGroup v-model="addDomainList.http">
                  <Checkbox label="http"></Checkbox>
                  <Checkbox label="https"></Checkbox>
                </CheckboxGroup>
                <p class="y-p">域名添加完成之后，请继续添加证书和私钥</p>
              </FormItem>
              <FormItem label="协议端口" prop="agreement">
                <Input v-model="addDomainList.agreement" placeholder="请输入协议端口" style="width:394px;"></Input>
              </FormItem>
              <FormItem label="源站IP/域名" prop="ip">
                <Input
                  type="textarea"
                  v-model="addDomainList.ip"
                  placeholder="多个域名与IP用；隔开"
                  style="width:394px;"
                ></Input>
                <p class="dp-bf">
                  如果源站暴露，请参考使用
                  <span>高防后源站IP暴露的解决方法</span>
                </p>
              </FormItem>
              <FormItem>
                <Button
                  type="ghost"
                  @click="handleReset('addDomainList')"
                  style="margin-right:10px;"
                >取消</Button>
                <Button type="primary" @click="addDomain('addDomainList')">下一步</Button>
              </FormItem>
            </Form>
          </div>
          <div v-if="steps==1">
            <div class="alert-warning" style="margin-top:20px;color:#666;">
              <p>您的域名以成功创建，您还需要在域名服务商处将您的域名解析至高防的CNAME记录</p>
              <p>记录值：xxxx.cdn30.com</p>
              <p>
                若您在新睿云购买的域名，点击跳转
                <span>域名解析</span>
              </p>
            </div>
            <Table :columns="columns1" :data="data1" style="margin-top:10px;"></Table>
            <div style="margin-top:20px;">
              <Button type="ghost" @click="steps=0" style="margin-right:10px;">上一步</Button>
              <Button type="primary" @click="steps=2">下一步</Button>
            </div>
          </div>
          <div v-if="steps==2">
            <div v-if="domainResult">
              <div class="alert-warning" style="margin-top:20px;color:#666;">
                <p
                  style="line-height:24px;"
                >1、如果您网站的源站服务器已经部署其他防火墙，请将高防回源IP地址段添加到防火墙的白名单。将网站访问流量切换DDoS云清洗的高防IP，通过这些回源IP地址转发给源站服务器，因此如果高防IP的回源地址未被加入防火墙的白名单中，访问流量可能被防火墙错误拦截，导致网站无法访问。</p>
                <p
                  style="line-height:24px;"
                >2、如果源站使用了带有基础防护功能的云主机，需要在云主机基础防护页面添加白名单。部分云主机厂商存在白名单个数限制，请直接添加0.0.0.0（放行所有IP）。</p>
              </div>
              <Table :columns="columns1" :data="data1" style="margin-top:10px;"></Table>
              <div style="margin-top:20px;">
                <Button type="ghost" @click="steps=1" style="margin-right:10px;">上一步</Button>
                <Button type="primary" @click="result()">完成</Button>
              </div>
            </div>
            <div v-else class="domain-result">
              <div style="margin-top:80px;">
                <Icon type="checkmark-circled" style="color:#28be6d;font-size:80px;"></Icon>
              </div>
              <p>添加完成</p>
              <span>由于解析需要一定时间，请根据列表“部署状态”查询域名添加结果</span>
              <Button type="primary" @click="domainResult=true">返回列表</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      steps: 0,
      domainResult: true,
      addDomainList: {
        attackMeal: "",
        domain: "",
        http: ["https"],
        agreement: "",
        ip: ""
      },
      addDomainListRule: {
        attackMeal: [
          { required: true, message: "请选择一个套餐", trigger: "change" }
        ],
        domain: [{ required: true, message: "请输入域名", trigger: "blur" }],
        agreement: [
          { required: true, message: "请输入协议端口", trigger: "blur" }
        ],
        ip: [{ required: true, message: "请输入源站IP/域名", trigger: "blur" }]
      },
      setMealList: [],
      columns1: [
        {
          title: "域名",
          key: "name"
        },
        {
          title: "端口",
          key: "age"
        },
        {
          title: "源站IP/域名",
          key: "address"
        },
        {
          title: "套餐信息",
          key: "dataF"
        }
      ],
      data1: [
        {
          name: "John Brown",
          age: 18,
          address: "New York No. 1 Lake Park",
          date: "2016-10-03"
        }
      ]
    };
  },
  created() {
    this.getId();
  },
  mounted() {},
  methods: {
    //   获取用户套餐ID
    getId() {
      this.$http.get("ddosImitationIp/packageIdInfo.do", {}).then(res => {
        if (res.status == 200 && res.data.status == 1) {
          for (let i = 0; i < res.data.result.length; i++) {
            for (let key in res.data.result[i]) {
              this.setMealList.push({ packageid: key});
            }
          }
          this.setMeal = this.attackMeal = this.setMealList[0].packageid;
        } else {
          this.$Message.info(res.data.message);
        }
      });
    },
    addDomain(name) {
         let http = 0,
            https = 0;
        if(this.addDomainList.http.length != 0){
             http = this.addDomainList.http.join(',').indexOf('http') == -1 ?0 :1;
             https = this.addDomainList.http.join(',').indexOf('https') == -1 ? 0:1;
        }
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$http
            .get("ddosImitationIp/AddDomain.do", {
              params: {
                packageId: this.addDomainList.attackMeal,
                domain: this.addDomainList.domain,
                source: this.addDomainList.ip,
                crtId: "",
                port: this.addDomainList.agreement,
                http: http,
                https: https
              }
            })
            .then(res => {
              if (res.status == 200 && res.data.status == 1) {
                //  this.getDomainList(1);
              } else {
                this.$Message.info(res.data.message);
              }
            })
            .catch(err => {});
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    result() {
      this.domainResult = false;
    }
  },
  computed: {},
  watch: {},
  components: {}
};
</script>

<style lang="less" scoped>
.back-btn {
  margin-top: 8px;
  display: inline-block;
  width: 25px;
  height: 25px;
  border-radius: 4px;
  border: 1px solid rgba(225, 225, 225, 1);
  color: #999999;
  text-align: center;
  line-height: 24px;
}
.main {
  width: 600px;
  margin: 0 auto;
}
.md-cer {
  margin-top: 20px;
  .y-p {
    margin-top: 5px;
    color: #ff9801;
  }
  .dp-bf {
    color: #999999;
    margin-top: 10px;
    > span {
      color: #2a99f2;
      cursor: pointer;
    }
  }
}
.domain-result {
  text-align: center;
  p {
    margin: 20px 0 10px;
    font-size: 18px;
    font-family: MicrosoftYaHei-Bold;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
    line-height: 24px;
  }
  span {
    display: block;
    margin: 10px 0 20px;
    font-size: 14px;
    color: rgba(102, 102, 102, 1);
    line-height: 20px;
  }
}
</style>
