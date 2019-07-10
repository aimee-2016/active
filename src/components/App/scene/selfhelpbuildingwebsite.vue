<template>
  <div>
    <h1 id="hide-h1">自助建站</h1>
    <div class="scene-page">
      <div class="center">
        <div class="head">
          <img src="../../../assets/img/sceneInfo/free-hint.png" alt="icon"/>
          <span >免费使用一年</span>
          <div class="title">
            <h3>{{ currentSceneGroup.currentScene }}</h3>
          </div>
          <div class="content">
            {{ currentSceneGroup.disc }}
          </div>
          <div class="footer">
            <a @click="otherSceneShow = !otherSceneShow">查看其它场景></a>
            <transition name="slide-fade">
              <ul v-show="otherSceneShow">
                <li v-for="(otherScene,index) in sceneGroup" :key="index">
                  <a :href="otherScene.link">
                    {{otherScene.name}}
                  </a>
                </li>
              </ul>
            </transition>
          </div>
        </div>
        <div class="body">
          <h2>典型配置推荐</h2>
          <div class="configGroup">
            <div v-for="(cfg,index1) in currentSceneGroup.configGroup" :key="index1" class="config">
              <div class="cf-title">{{cfg.days == 30 ? '包月云服务器' : cfg.days == 360 ? '包年云服务器' : cfg.days/30 + '个月'  }}</div>
              <div class="cf-body">
                <div class="cf-content">
                  <ul >
                    <li>
                      <span class="s1">服务器资源</span>
                      <span></span>
                    </li>
                    <li>
                      <span>服务器ECS</span>
                      <span class="s2">{{cfg.cpu}}核 {{cfg.mem}}G</span>
                    </li>  
                    <li>
                      <span>系统盘</span>
                      <span class="s2">{{cfg.disksize}}G {{cfg.disktype}}</span>
                    </li>
                    <li>
                      <span>弹性负载均衡</span>
                      <span>按需开通</span>
                    </li>    
                    <li>
                      <span class="s1">网络</span>
                      <span></span>
                    </li>
                    <li>
                      <span>弹性公网IP</span>
                      <span class="s2">{{cfg.bandwith}}M</span>
                    </li>
                    <li>
                      <span>虚拟私有云VPC</span>
                      <span>默认开通</span>
                    </li>
                    <li>
                      <span class="s1">存储</span>
                      <span></span>
                    </li>
                    <li>
                      <span>对象存储服务OBS</span>
                      <span>按需开通</span>
                    </li>   
                    <li style="margin-top: 10px"><span class="s1">选择区域</span></li>
                    <Select v-model="cfg.zoneId" style="width:310px;"
                            @on-change="getOriginalPrice(cfg,index1)">
                      <Option v-for="item2 in areaGroup" :value="item2.value" :key="item2.value">{{ item2.name }}</Option>
                    </Select>
                    <li class="special"><span class="s1">选择系统</span></li>
                    <Select v-model="cfg.system" style="width:310px;margin-bottom: 10px">
                      <Option v-for="item3 in systemGroup" :value="item3.systemtemplateid" :key="item3.systemtemplateid">{{ item3.templatedescript }}</Option>
                    </Select>
                  </ul>
                </div>
                <div class="cf-footer">
                  <p><span>押金：</span>¥{{ cfg.cost}}</p>
                  <p>原价：¥{{cfg.originalPrice}}</p>
                  <Button type="primary"  @click="getHost(index1)">免费使用</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 领取提示 -->
    <Modal v-model="showModal.rechargeHint" :scrollable="true" :closable="false" :width="390">
      <div class="modal-content-s" style="padding: 30px 30px 0 50px">
        <div>
          <div class="ivu-modal-confirm-body-icon ivu-modal-confirm-body-icon-success" style="top: 48px;left: 30px;">
            <i class="ivu-icon ivu-icon-checkmark-circled"></i>
          </div>
          <strong>提示</strong>
          <p class="lh24">本免费活动充值押金<span style="color: #D0021B ">{{ cashPledge }}</span>元，主机到期或删除时押金自动退还到账户余额。
          </p>
        </div>
      </div>
      <p slot="footer" class="modal-footer-s">
        <Button @click="showModal.rechargeHint = false">取消</Button>
        <Button type="primary" @click="nextStep">下一步</Button>
      </p>
    </Modal>
    <!-- 不满足条件-->
    <Modal v-model="showModal.inConformityModal" :scrollable="true" :closable="false" :width="390">
      <div class="modal-content-s" style="padding: 30px 30px 0 50px">
        <div>
          <div class="ivu-modal-confirm-body-icon ivu-modal-confirm-body-icon-warning" style="top: 48px;left: 30px;">
            <i class="ivu-icon ivu-icon-android-alert"></i>
          </div>
          <p class="lh24">您好，您不符合本活动的参与条件，去<span style="color: #2A99F2;cursor: pointer" @click="$router.push('/activity/')">活动中心</span>看看其他活动吧！如果有其他需要可联系我们销售或者客服。
          </p>
        </div>
      </div>
      <p slot="footer" class="modal-footer-s">
        <Button @click="showModal.inConformityModal = false">取消</Button>
        <Button type="primary" @click="$router.push('/activity/')">去活动中心</Button>
      </p>
    </Modal>
    <!-- 领取成功 -->
    <Modal v-model="showModal.getSuccessModal" :scrollable="true" :closable="false" :width="390">
      <div class="modal-content-s" style="padding: 30px 30px 0 50px">
        <div>
          <div class="ivu-modal-confirm-body-icon ivu-modal-confirm-body-icon-success" style="top: 48px;left: 30px;">
            <i class="ivu-icon ivu-icon-checkmark-circled"></i>
          </div>
          <strong>提示</strong>
          <p class="lh24">恭喜您押金已冻结完成，主机领取成功，主机在实名认证之前只可保留3天，请尽快使用。
          </p>
        </div>
      </div>
      <p slot="footer" class="modal-footer-s">
        <Button @click="showModal.getSuccessModal = false">取消</Button>
        <Button type="primary" @click="$router.push('/host')">查看主机</Button>
      </p>
    </Modal>
    <!-- 支付充值失败 -->
    <Modal v-model="showModal.payDefeatedModal" width="640" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">支付/充值</span>
      </p>
      <div class="universal-modal-content-flex">
        <div class="modal-p">
          <Steps :current="2" status="error">
            <Step title="订单确认"></Step>
            <Step title="支付"></Step>
            <Step title="支付失败"></Step>
          </Steps>
          <p><img src="../../../assets/img/sceneInfo/si-defeated.png" alt="支付失败"/><span>抱歉，支付失败，请再次尝试！</span></p>
        </div>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="primary" @click="showModal.payDefeatedModal = false,showModal.orderConfirmationModal = true">再次支付</Button>
      </div>
    </Modal>
    <!-- 支付充值成功 -->
    <Modal v-model="showModal.paySuccessModal" width="640" :scrollable="true" :closable="false" :mask-closable="false">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">支付/充值</span>
      </p>
      <div class="universal-modal-content-flex">
        <div class="modal-p">
          <Steps :current="2">
            <Step title="订单确认"></Step>
            <Step title="支付"></Step>
            <Step title="支付成功"></Step>
          </Steps>
          <p><img src="../../../assets/img/sceneInfo/si-success.png" alt="支付成功"/><span>恭喜您支付成功！我们即将冻结押金</span><span style="color: #D0021B;margin-left: 0">{{ cashPledge }}</span><span
            style="margin-left: 0">元</span></p>
        </div>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="primary" @click="getFreeHost">确认冻结</Button>
      </div>
    </Modal>

    <!-- 微信支付弹窗 -->
    <Modal v-model="showModal.weChatRechargeModal" width="640" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">微信支付/充值</span>
      </p>
      <div class="universal-modal-content-flex">
        <div class="modal-p">
          <Steps :current="1">
            <Step title="订单确认"></Step>
            <Step title="支付"></Step>
            <Step title="支付成功"></Step>
          </Steps>
          <div class="payInfo">
            <div id="code">
              <vue-q-art :config="config" v-if="config.value!=''"></vue-q-art>
            </div>
            <div class="pay-p">
              <p>应付金额(元)：<span>{{cashPledge}}</span></p>
              <p>请使用微信扫一扫，扫描二维码支付</p>
            </div>
          </div>
        </div>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button @click="isPay">已完成支付</Button>
        <Button type="primary" @click="showModal.weChatRechargeModal = false,showModal.orderConfirmationModal = true">更换支付方式</Button>
      </div>
    </Modal>

    <!-- 订单确认弹窗 -->
    <Modal v-model="showModal.orderConfirmationModal" width="640" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">订单确认</span>
      </p>
      <div>
        <div class="modal-p">
          <Steps :current="0">
            <Step title="订单确认"></Step>
            <Step title="支付"></Step>
            <Step title="支付成功"></Step>
          </Steps>
        </div>
        <Table :columns="orderColumns" :data="orderData" style="margin-top: 30px"></Table>
        <div class="pay-wap">
          <p>选择支付方式</p>
          <RadioGroup v-model="payWay" vertical @on-change="payWayChange">
            <Radio label="balancePay">
              <span style="color:rgba(51,51,51,1);font-size: 14px;margin-right: 40px">余额支付</span>
              <span style="color:rgba(102,102,102,1);font-size: 14px">账户余额：</span>
              <span style="color:#D0021B;font-size: 14px">¥{{ balance }}</span>
            </Radio>
            <Radio label="otherPay" class="pw-img" :disabled="balance >= cashPledge">
              <span style="color:rgba(51,51,51,1);font-size: 14px;margin-right: 25px">第三方支付</span>
              <img src="../../../assets/img/payresult/alipay.png" :class="{selected: otherPayWay == 'zfb'}" @click="balance < cashPledge?otherPayWay = 'zfb':null" alt="支付宝">
              <img src="../../../assets/img/payresult/wxpay.png" :class="{selected: otherPayWay == 'wx'}" @click="balance < cashPledge?otherPayWay = 'wx':null" alt="微信">
            </Radio>
            <!--            <Radio label="otherPay" class="pw-img">
                          <span style="color:rgba(51,51,51,1);font-size: 14px;margin-right: 25px">第三方支付</span>
                          <img src="../../assets/img/payresult/alipay.png" :class="{selected: otherPayWay == 'zfb'}" @click="otherPayWay = 'zfb'">
                          <img src="../../assets/img/payresult/wxpay.png" :class="{selected: otherPayWay == 'wx'}" @click="otherPayWay = 'wx'">
                        </Radio>-->
          </RadioGroup>
        </div>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="primary" @click="getHost_ok">确认</Button>
      </div>
    </Modal>
    <!-- 购买前实名认证 -->
    <Modal v-model="showModal.authentication" width="640" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">实名认证</span>
      </p>
      <Form :model="quicklyAuthForm" :label-width="100" ref="quicklyAuth"
            :rules="quicklyAuthFormValidate"
            style="width:450px;margin-top:20px;">
        <FormItem label="真实姓名" prop="name" style="width: 100%">
          <Input v-model="quicklyAuthForm.name" placeholder="请输入姓名"></Input>
        </FormItem>
        <FormItem label="身份证号" prop="IDCard" style="width: 100%">
          <Input v-model="quicklyAuthForm.IDCard" placeholder="请输入身份证号"></Input>
        </FormItem>
        <Form :model="quicklyAuthForm" :rules="quicklyAuthFormValidate" ref="sendCode"
              :label-width="100">
          <FormItem label="图形验证码" prop="pictureCode">
            <div style="display: flex">
              <Input v-model="quicklyAuthForm.pictureCode" placeholder="请输入图片验证码"
                     style="width:250px;margin-right: 10px"></Input>
              <img :src="imgSrc" style="height:33px;"
                   @click="imgSrc=`https://www.xrcloud.net/user/getKaptchaImage.do?t=${new Date().getTime()}`" alt="验证码">
            </div>
          </FormItem>
          <FormItem label="手机号码" prop="phone" style="width: 100%">
            <Input v-model="quicklyAuthForm.phone" placeholder="请输入以该身份证开户的手机号码"></Input>
          </FormItem>
        </Form>
        <FormItem label="验证码" prop="validateCode" style="width: 100%">
          <div style="display: flex;justify-content: space-between">
            <Input v-model="quicklyAuthForm.validateCode" placeholder="请输入验证码" style="width:260px;margin-right: 10px"></Input>
            <Button type="primary" @click="sendCode"
                    :disabled="quicklyAuthForm.sendCodeText!='获取验证码'">
              {{quicklyAuthForm.sendCodeText}}
            </Button>
          </div>
        </FormItem>
      </Form>
      <div slot="footer" class="modal-footer-border">
        <Button type="primary" @click="quicklyAuth">提交</Button>
      </div>
    </Modal>
    <!-- 实名认证成功 -->
    <Modal v-model="showModal.authenticationSuccess" width="640" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">实名认证</span>
      </p>
      <div style="text-align:center;padding:40px 0;">
        <img src="../../../assets/img/payresult/paySuccess.png"
             style="width:36px;vertical-align:middle;margin-right:10px;" alt="实名认证成功">
        <span style="font-size:14px;line-height:36px">恭喜您，实名认证成功！</span>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="primary" @click="showModal.authenticationSuccess=false">确认</Button>
      </div>
    </Modal>
    <!-- 实名认证失败 -->
    <Modal v-model="showModal.authenticationError" width="640" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">实名认证</span>
      </p>
      <div style="text-align:center;padding:40px 0;">
        <img src="../../../assets/img/payresult/payFail.png"
             style="width:36px;vertical-align:middle;margin-right:10px;" alt="实名认证失败">
        <span style="font-size:14px;line-height:36px">抱歉，实名认证失败，原因：{{authErrorText}}</span>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="primary" @click="showModal.authenticationError=false">确认</Button>
      </div>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from '../../../util/axiosInterceptor'
  import reg from '../../../util/regExp'
  import VueQArt from 'vue-qart'

  export default {
    metaInfo: {
      title: '网站自助建站免费 - 企业自助建站 - 应用场景 - 新睿云', // set a title
      meta: [{                 // set meta
        name: 'keywords',
        content: '自助建站,自助建站免费,企业自助建站,网站自助建站'
      },
        {                 // set meta
          name: 'description',
          content: '新睿云个人建站服务，助您轻松获得一站式的建站服务方案支持。包括配置好各类开源建站镜像模板，帮助您快速搭建网站、微博、论坛等服务内容。'
        }]
    },
    components: {
      VueQArt
    },
    data() {
      const validaRegisteredPhone = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('电话号码不能为空'));
        }
        if (!(/^1(3|4|5|7|8|9)\d{9}$/.test(value)) && !(/^0\d{2,3}-?\d{7,8}$/.test(value))) {
          callback(new Error('请输入正确的电话号码'));
        } else {
          callback()
        }
      }
      const validaRegisteredID = (rule, value, callback) => {
        if (!reg.IDCardVail(value)) {
          callback(new Error('请输入正确的身份证号码'));
        } else {
          callback()
        }
      }
      const validaRegisteredName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('联系人不能为空'));
        }
        if ((/[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im.test(value)) || (/[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im.test(value)) || (/\s+/.test(value)) || (/^[0-9]*$/.test(value))) {
          callback(new Error('输入姓名不能包含特殊字符、空格或是纯数字'));
        } else {
          callback()
        }
      }
      return {
        authErrorText: '',
        showModal: {
          rechargeHint: false,
          inConformityModal: false,
          getSuccessModal: false,
          payDefeatedModal: false,
          paySuccessModal: false,
          weChatRechargeModal: false,
          orderConfirmationModal: false,
          authentication: false,
          authenticationSuccess: false,
          authenticationError: false
        },
        currentSceneGroup:{
            currentScene: '自助建站',
            disc: '基于新睿云个人建站服务，助您轻松获得一站式的建站服务方案支持。包括配置好各类开源建站镜像模板，帮助您快速搭建网站、微博、论坛等服务内容；可无限扩容的对象存储OSS服务帮助您存储网站内容与数据；域名购买注册系统、备案系统等一套完整的服务流程。并且因所有内容部署于云端，您可以根据内容与实际需要，弹性调整您的计算规格与资源大小，合理控制预算，以极具性价比的方式完成个人网站搭建。',
            configGroup: [],
          },
        // 标记当前场景信息
        index1: '',
        vmConfig: '',
        userType: '2',
        scene: '自助建站',
        sceneGroup: [
          {name: '云桌面', link: '/yundiannao/'},
          {name: '个人建站', link: '/selfhelpbuildingwebsite/'},
          {name: '个人网盘', link: '/storagedisk/'},
          {name: '软件研发', link: '/softwaredevelopment/'},
          {name: '云游戏服务', link: '/gameservice/'},
          {name: '图形设计', link: '/graphicdesign/'},
          {name: '人工智能', link: '/ai/'},
          {name: '超级运算', link: '/supercomputing/'},
        ],
        otherSceneShow: false,
        areaGroup: [],
        systemGroup: [],
        cashPledge: '--',
        time: '',
        config: {
          value: '0',
          imagePath: require('../../../assets/img/pay/payBackground.png'),
          filter: 'black',
          size: 500
        },
        orderColumns: [
          {
            title: '产品类型',
            key: 'productType'
          },
          {
            title: '资源',
            width: 200,
            render: (h, params) => {
              let arr = []
              let cpu = h('li', {}, 'CPU ： ' + params.row.cpu + '核')
              let mem = h('li', {}, '内存 ： ' + params.row.mem + 'G')
              let disksize = h('li', {}, '磁盘 ： ' + params.row.disksize + 'G')
              let bandwith = h('li', {}, '带宽 ： ' + params.row.bandwith + 'M')
              arr.push(cpu,mem,disksize,bandwith)
              return h('ul', {}, arr)
            }
          },
          {
            title: '计费类型',
            render: (h, params) => {
              return h('span', {}, '包年包月')
            }
          },
          {
            title: '购买时长',
            key: 'time'
          },
          {
            title: '押金金额',
            width: 130,
            render: (h, params) => {
              let arr = []
              let param1 = h('li', {
                style: {
                  textDecoration: 'line-through'
                }
              }, '原价：¥' + params.row.originalPrice)
              let param2 = h('li', {
                style: {
                  color: '#D0021B'
                }
              }, '¥' + params.row.cashPledge)
              arr.push(param1)
              arr.push(param2)
              return h('ul', {}, arr)
            }
          },
        ],
        orderData: [],
        payWay: 'balancePay',
        otherPayWay: '',
        balance: '0.0',
        // 快速认证表单
        quicklyAuthForm: {
          name: '',
          IDCard: '',
          pictureCode: '',
          phone: '',
          validateCode: '',
          sendCodeText: '获取验证码'
        },
        // 快速认证表单验证
        quicklyAuthFormValidate: {
          name: [
            {required: true, message: '请输入姓名'},
            {validator: validaRegisteredName}
          ],
          IDCard: [
            {required: true, message: '请输入身份证号'},
            {validator: validaRegisteredID}
          ],
          pictureCode: [
            {required: true, message: '请输入图片验证码'}
          ],
          phone: [
            {required: true, message: '请输入以该身份证开户的手机号码'},
            {validator: validaRegisteredPhone}
          ],
          validateCode: [
            {required: true, message: '请输入验证码'}
          ]
        },
        imgSrc: `https://www.xrcloud.net/user/getKaptchaImage.do?t=${new Date().getTime()}`,
        //定时器
        pageTimer: null,
        serialNum: ''
      }
    },
    created() {
      this.getRegion()
    },
    methods: {
      init() {
        axios.get('user/GetUserInfo.do').then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.$store.commit('setAuthInfo', {authInfo: response.data.authInfo, userInfo: response.data.result,authInfoPersion: response.data.authInfo_persion})
          }
        })
      },
      getOriginalPrice(item,index) {
        let url = '/activity/getOriginalPrice.do'
        let params ={
          zoneId: item.zoneId,
          vmConfigId: item.id,
          month: item.days/30 + ''
        }
        axios.get(url, {params}).then(res => {
          if (res.data.status == 1 && res.status == 200) {
            item.originalPrice = res.data.result.originalPrice
            this.currentSceneGroup.configGroup.splice(index,1,item)
            this.getMirror(item)
          }
        })
      },
      getRegion() {
        let url = '/activity/getTemActInfoById.do'
        let params = {
          activityNum: '51'
        }
        axios.get(url,{params}).then(res=>{
          if(res.data.status == 1 && res.status == 200){
            this.areaGroup = res.data.result.optionalArea
            this.currentSceneGroup.configGroup = res.data.result.freevmconfigs
            if(this.areaGroup.length !== 0 && this.currentSceneGroup.configGroup.length !== 0){
              this.currentSceneGroup.configGroup.forEach((item,index)=>{
                item.zoneId = this.areaGroup[0].value
                this.getOriginalPrice(item,index)
              })     
            }
          }
        })
      },
      getMirror(item) {
        let url = 'information/listTemplateFunction.do'
        axios.get(url, {
          params: {
            useType: this.userType,
            zoneId: item.zoneId
          }
        }).then(res => {
          if (res.data.status == 1 && res.status == 200) {
            this.systemGroup = res.data.result
            if(this.systemGroup.length !==0 ){
              this.currentSceneGroup.configGroup.forEach(cfg=>{
                cfg.system = this.systemGroup[0].systemtemplateid
              })
            }
          }
        })
      },
      getHost(index) {
        if (!this.currentSceneGroup.configGroup[index].zoneId) {
          this.$Message.info('请选择需要领取的区域')
          return
        }
        if (!this.currentSceneGroup.configGroup[index].system) {
          this.$Message.info('请选择需要领取的镜像系统')
          return
        }
        if (!this.$store.state.userInfo) {
          this.$LR({type: 'register'})
          return
        }
        if ((!this.authInfo)|| (this.authInfo&&this.authInfo.authtype==0&&this.authInfo.checkstatus!=0)||(!this.authInfoPersion &&this.authInfo&&this.authInfo.authtype==1&&this.authInfo.checkstatus!=0)||(this.authInfoPersion&&this.authInfoPersion.checkstatus!=0 && this.authInfo&&this.authInfo.checkstatus!=0)) {
          this.showModal.authentication = true
          return
        }
        this.$http.post('device/DescribeWalletsBalance.do').then(response => {
            if (response.status == 200 && response.data.status == '1') {
              this.balance = Number(response.data.data.remainder)
              this.index1 = index
              this.cashPledge = this.currentSceneGroup.configGroup[index].cost
              this.time = this.currentSceneGroup.configGroup[index].days/30 + '个月'
              this.showModal.rechargeHint = true
            } else {
              this.$message.info({
                content: response.data.message
              })
            }
          })
      },
      nextStep() {
        let title = '云服务器'
        // 判断新老用户
        axios.get('activity/jdugeTeam.do', {
          params: {sign: 'freeReceive'}
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            if (response.data.result.flag) {
              this.orderData = []
              this.orderData.push({
                productType: title,
                cpu: this.currentSceneGroup.configGroup[this.index1].cpu,
                mem: this.currentSceneGroup.configGroup[this.index1].mem,
                disksize: this.currentSceneGroup.configGroup[this.index1].disksize,
                bandwith: this.currentSceneGroup.configGroup[this.index1].bandwith,
                originalPrice: this.currentSceneGroup.configGroup[this.index1].originalPrice,
                time: this.time,
                cashPledge: Number(this.cashPledge)
              })
              this.showModal.rechargeHint = false
              this.showModal.orderConfirmationModal = true
            } else {
              this.showModal.rechargeHint = false
              this.showModal.inConformityModal = true
            }
          } else {
            this.$message.info({
              content: response.data.message
            })
          }
        })
      },
      getHost_ok() {
        if (this.payWay == 'balancePay') {
          if (this.balance < this.cashPledge) {
            this.$Message.info('可用余额不足')
          } else {
            this.showModal.orderConfirmationModal = false
            this.getFreeHost()
          }
        } else {
          switch (this.otherPayWay) {
            case '':
              this.$Message.info('请选择一个支付方式')
              break
            case 'zfb':
              window.open(`/zfb/alipayapi.do?total_fee=${this.cashPledge}`)
              this.pageTimer = setInterval(() => {
                axios.get('activity/compareForMoney.do', {
                  params: {freezeMoney: this.cashPledge}
                }).then(val => {
                  if (val.status == 200 && val.data.status == 1) {
                    this.showModal.orderConfirmationModal = false
                    clearInterval(this.pageTimer)
                    this.showModal.paySuccessModal = true
                  }
                })
              }, 2000)
              break
            case 'wx':
              clearInterval(this.pageTimer)
              axios.get('wx/wxpayapi.do', {
                params: {
                  total_fee: this.cashPledge
                }
              }).then(response => {
                if (response.status == 200 && response.data.status == 1) {
                  this.serialNum = response.data.result.serialNum
                  this.config.value = response.data.result.codeUrl
                  this.showModal.orderConfirmationModal = false
                  this.showModal.weChatRechargeModal = true
                } else {
                  this.$message.info({
                    content: response.data.message
                  })
                }
              })
              break
          }
        }
      },
      getFreeHost() {
        this.showModal.paySuccessModal = false
        let url = '/activity/getFreeHostNew.do'
        let params = {
          vmConfigId: this.currentSceneGroup.configGroup[this.index1].id,
          osType: this.currentSceneGroup.configGroup[this.index1].system,
          defzoneid: this.currentSceneGroup.configGroup[this.index1].zoneId,
          templateFunction: '1',
          functionType: '2'
        }
        axios.get(url,{params}).then(res=>{
          if(res.data.status == 1&&res.status == 200){
            this.showModal.getSuccessModal = true
            this.toggleZone(this.currentSceneGroup.configGroup[this.index1].zoneId)
          } else {
            this.$message.info({
              content:res.data.message
            })
          }
        })
      },
      // 快速认证时发送验证码
      sendCode() {
        this.$refs.sendCode.validate(validate => {
          if (validate) {
            axios.get('user/code.do', {
              params: {
                aim: this.quicklyAuthForm.phone,
                isemail: 0,
                vailCode: this.quicklyAuthForm.pictureCode
              }
            }).then(response => {
              // 发送成功，进入倒计时
              if (response.status == 200 && response.data.status == 1) {
                var countdown = 60
                this.quicklyAuthForm.sendCodeText = `重新发送(${countdown})S`
                var Interval = setInterval(() => {
                  countdown--
                  this.quicklyAuthForm.sendCodeText = `重新发送(${countdown})S`
                  if (countdown == 0) {
                    clearInterval(Interval)
                    this.quicklyAuthForm.sendCodeText = '获取验证码'
                  }
                }, 1000)
              } else {
                this.$Message.error(response.data.message)
              }
            })
          }
        })
      },
      // 快速认证
      quicklyAuth() {
        var quicklyAuth = this.$refs.quicklyAuth.validate(validate => {
          return Promise.resolve(validate)
        })
        var sendCode = this.$refs.sendCode.validate(validate => {
          return Promise.resolve(validate)
        })
        Promise.all([quicklyAuth, sendCode]).then(results => {
          if (results[0] === true && results[1] === true) {
            axios.post('user/personalAttest.do', {
              cardID: this.quicklyAuthForm.IDCard,
              name: this.quicklyAuthForm.name,
              phone: this.quicklyAuthForm.phone,
              phoneCode: this.quicklyAuthForm.validateCode,
              type: '0'
            }).then(response => {
              if (response.status == 200 && response.data.status == 1) {
                this.showModal.authentication = false
                this.showModal.authenticationSuccess = true
                this.init()
              } else {
                this.showModal.authenticationError = true
                this.authErrorText = response.data.message
              }
            })
          }
        })
      },
      isPay() {
        axios.get('user/payStatus.do', {
          params: {
            serialNum: this.serialNum
          }
        }).then(response => {
          this.showModal.weChatRechargeModal = false
          if (response.status == 200 && response.data.status == 1) {
            this.showModal.paySuccessModal = true
          } else {
            this.showModal.payDefeatedModal = true
          }
        })
      },
      payWayChange() {
        if (this.payWay == 'otherPay' && this.otherPayWay == '') {
          this.otherPayWay = 'zfb'
        } else if (this.payWay == 'balancePay') {
          this.otherPayWay = ''
        }
      },
      toggleZone(zoneId) {
        // 切换默认区域
        axios.get('user/setDefaultZone.do', {params: {zoneId: zoneId}}).then(response => {
        })
        for (var zone of this.$store.state.zoneList) {
          if (zone.zoneid == zoneId) {
            this.$store.commit('setZone', zone);
          }
        }
      },
    },
    computed: {
      authInfo() {
        return this.$store.state.authInfo ? this.$store.state.authInfo : null
      },
      authInfoPersion(){
        return this.$store.state.authInfoPersion
      },
    },
    beforeRouteLeave(to, from, next) {
      clearInterval(this.pageTimer)
      next()
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .scene-page {
    padding: 50px 0;
    background: url('../../../assets/img/sceneInfo/si-banner1.png') no-repeat;
    .center {
      width: 1200px;
      margin: 0 auto;
      background: linear-gradient(360deg, rgba(249, 249, 249, 1) 0%, rgba(247, 247, 247, 1) 100%);
      .head {
        padding: 35px 50px 30px;
        border-bottom: 1px solid rgba(217, 217, 217, 1);
        position: relative;
        > img {
          position: absolute;
          top: 0;
          right: 0;
        }
        > span {
          position: absolute;
          top: 40px;
          right: 0;
          font-size: 18px;
          font-family: MicrosoftYaHei;
          font-weight: 600;
          color: rgba(255, 255, 255, 1);
          transform: rotate(45deg);
        }
        .title {
          display: flex;
          h3 {
            font-size: 20px;
            font-family: MicrosoftYaHei;
            font-weight: 600;
            color: rgba(51, 51, 51, 1);
          }
        }
        .content {
          margin: 20px 0;
          font-size: 16px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          line-height: 22px;
        }
        .footer {
          position: relative;
          > a {
            font-size: 14px;
            font-family: MicrosoftYaHei;
            font-weight: 400;
            color: rgba(42, 153, 242, 1);
          }
          ul {
            position: absolute;
            background: rgba(255, 255, 255, 1);
            box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.15);
            border-radius: 4px;
            border: 1px solid rgba(232, 232, 232, 1);
            top: 20px;
            left: 0;
            width: 110px;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            li {
              font-size: 12px;
              font-family: MicrosoftYaHei;
              font-weight: 400;
              line-height: 32px;
              cursor: pointer;
              height: 32px;
              padding-left: 15px;
              > a {
                color: rgba(0, 0, 0, 0.65);
                display: inline-block;
                width: 100%;
              }
              &:hover {
                background: #108EE9;
                > a {
                  color: #FFFFFF;
                }
              }
            }
          }
        }
      }
      .body {
        padding: 30px 50px 50px;
        h2 {
          text-align: center;
          font-size: 28px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
        }
        .configGroup {
          margin-top: 40px;
          display: flex;
          .config {
            width: 350px;
            margin-right: 40px;
            background: rgba(255, 255, 255, 1);
            &.hidden{
              display: none;
            }
            &:hover {
              box-shadow: 0px 0px 20px 0px rgba(179, 179, 179, 1);
            }
            &.gpu {
              width: 300px;
            }
            .cf-title {
              padding: 29px 30px 28px;
              background: rgba(55, 125, 255, 1);
              font-size: 24px;
              font-family: MicrosoftYaHei;
              font-weight: 600;
              color: rgba(255, 255, 255, 1);
              &.gpu {
                padding: 29px 20px 28px;
              }
            }
            .cf-body {
              padding: 20px 20px;
              .cf-content {
                border-bottom: 1px solid rgba(217, 217, 217, 1);
                padding-bottom: 10px;
                > ul {
                  > li {
                    margin-bottom: 10px;
                    span {
                      font-size: 14px;
                      font-family: MicrosoftYaHei;
                      font-weight: 400;
                      color: rgba(102, 102, 102, 1);
                      &.s1 {
                        font-size: 16px;
                        font-family: MicrosoftYaHei;
                        font-weight: 600;
                        color: rgba(51, 51, 51, 1);
                      }
                    }
                    span:nth-child(2) {
                      float: right;
                      color: rgba(178, 178, 178, 1);
                      &.s2 {
                        color: #F85E1D;
                      }
                    }
                    &.special {
                      margin-top: 20px;
                    }
                  }
                }
              }
              .cf-footer {
                > p {
                  font-size: 28px;
                  font-family: MicrosoftYaHei;
                  font-weight: 600;
                  color: rgba(208, 2, 27, 1);
                  margin-top: 10px;
                  span {
                    font-size: 20px;
                  }
                }
                p:nth-child(2) {
                  font-size: 14px;
                  font-family: MicrosoftYaHei;
                  font-weight: 400;
                  color: rgba(153, 153, 153, 1);
                  text-decoration: line-through;
                }
                button {
                  margin-top: 10px;
                  font-size: 18px;
                  font-family: MicrosoftYaHei;
                  font-weight: 400;
                  padding: 8px 40px 7px;
                }
              }
            }
          }
        }
      }
    }
  }

  .slide-fade-enter-active {
    transition: all .6s ease;
  }

  .slide-fade-leave-active {
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .slide-fade-enter, .slide-fade-leave-to {
    opacity: 0;
  }

  .modal-p {
    > div {
      margin-left: 60px;
    }
    > p {
      span {
        font-size: 16px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 22px;
        margin-left: 10px;
        position: relative;
        bottom: 18px;
      }
      margin: 50px 0;
      text-align: center;
    }
    .payInfo {
      margin-top: 50px;
      display: flex;
      .pay-p {
        p {
          font-size: 16px;
          font-family: MicrosoftYaHei;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          line-height: 22px;
          margin: 30px 40px;
          span {
            font-size: 36px;
            font-weight: 600;
            color: rgba(208, 2, 27, 1);
          }
        }
      }
    }
  }

  .pay-wap {
    padding: 20px;
    > p {
      font-size: 14px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      margin-bottom: 10px;
    }
    .pw-img {
      img {
        display: inline-block;
        margin-right: 20px;
        cursor: pointer;
        position: relative;
        top: 12px;
        border: 1px solid #FFF;
        &.selected {
          border: 1px solid rgba(74, 144, 226, 1);
        }
      }
    }
  }

  .p1 {
    padding: 20px;
    font-size: 12px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: rgba(255, 0, 0, 1);
    line-height: 17px;
  }

  //图标箭头向下样式
  .click_icon.icons {
    width: 13px !important;
    height: 13px !important;
    border: 1px solid #2a99f2;
    border-radius: 50%;
    transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
    transition: all 0.5s;
    cursor: pointer;
    margin-left: 10px;
  }

  .click_icon.icons::before {
    content: "";
    position: absolute;
    top: 2px;
    left: 3px;
    width: 7px !important;
    height: 6px !important;
    border: #2a99f2 solid 1px;
    border-top-style: none;
    border-right-style: none;
  }

  //图标向上样式
  .hide_icon.icons {
    transform: rotate(-225deg);
    -ms-transform: rotate(-225deg);
    -webkit-transform: rotate(-225deg);
  }

  .attestationForm {
    display: flex;
    > p {
      padding-left: 20px;
      font-size: 14px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
    }
  }
</style>
