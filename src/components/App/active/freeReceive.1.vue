<template>
  <div class="deposit-activity">
    <img class="discount-icon" src="../../../assets/img/active/freeToReceive.1/discount-1.png" alt="一折秒杀" @click="$router.push('/activity/BlacKActivities')">
    <section>
      <div class="free-host">
        <div class="wrap">
          <img src="../../../assets/img/active/freeToReceive.1/free-host-text.png">
          <div class="steps">
           <div @click="roll(400)">
              <img src="../../../assets/img/active/freeToReceive.1/c-left.png">
              <img class="number" src="../../../assets/img/active/freeToReceive.1/wnumber-1.png">
              <span style="color:#fff">免费领云服务器</span>
            </div>
            <!-- 这只能用v-show,不然index会出现错乱 -->
            <div v-for="(item,index) in stepsList" :key="index"  @mouseenter="enter(item,index)" @mouseleave="leave(item,index)" @click="roll(item.distance)">
              <img  :src="item.imgbg" v-show="item.isShow">
              <img  class="number" :src="item.imgnum" v-show="item.isShow">
              <img  :src="item.imgbgH" v-show="!item.isShow">
              <img  class="number" :src="item.imgnumH" v-show="!item.isShow">
              <span :class="{'selctedStep':!item.isShow}">{{item.text}}</span>
            </div>
          </div>
          <div style="padding:0 30px;">
            <p style="margin:80px 0 20px;text-align:left;font-size:18px;color:#fff;">
              新用户专享，为防止恶意刷抢主机，遂需缴纳保证金，保证金随时可退
              <span
                style="color:#53FFEF;cursor:pointer;text-decoration: underline;"
                @click="showModal.rule=true"
              >活动规则></span>
            </p>
            <div class="product">
              <div v-for="(item,index) in depositList" :key="index">
                <div class="head">
                  <h3>{{item.headline}}</h3>
                  <span>{{item.subtitle}}</span>
                </div>
                <div class="body">
                  <div class="configure">
                    <ul>
                      <li>
                        <i>CPU</i>
                        <span>{{item.config.cpu}}核</span>
                      </li>
                      <li>
                        <i>内存</i>
                        <span>{{item.config.mem}}G</span>
                      </li>
                      <li>
                        <i>宽带</i>
                        <span>{{item.config.bandwith}}M</span>
                      </li>
                      <li>
                        <i>系统盘</i>
                        <span>{{item.config.disksize}}G<span>SSD</span></span>
                      </li>
                    </ul>
                  </div>
                  <div class="area">
                    <span class="label" style="padding-top: 10px;">选择区域:</span>
                    <ul>
                      <li
                        v-for="(item1,index1) in zoneListDeposit"
                        :key="index1"
                        :class="{'selected':item.zone==item1.value}"
                        @click="changgeZoneDeposite(item,item1,index,'depositList')"
                      >{{item1.name}}</li>
                    </ul>
                  </div>
                  <div>
                    <span class="label">选择系统:</span>
                    <Cascader
                      :data="item.systemList"
                      v-model="item.system"
                      style="width:237px;display:inline-block"
                    ></Cascader>
                  </div>
                  <div class="price">
                    使用价格：
                    <span>¥0</span>
                    /{{item.unit}}
                  </div>
                  <div class="deposit">
                    保证金：¥{{item.cashPledge+'/'+item.unit}}
                    <span
                      style="text-decoration: line-through;"
                    >原价：¥{{item.originPrice}}</span>
                  </div>
                  <Button @click="getHost(index)">免费领取</Button>
                </div>
              </div>
            </div>
            <div class="tips">
              温馨提示：使用期间若到“百度口碑”发布使用体验等相关评论，截图并发送至在线客服，可领取满200减100优惠券。
              <a
                href="https://koubei.baidu.com/s/510a4f5f6316c2d0f81b3e63bc75b537?fr=search"
                target="blank"
                style="text-decoration: underline;"
              >点击发布评论></a>
            </div>
          </div>
          <div class="fr-flow">
            <div class="headline" style="color:#fff;width:1180px;">
              <h2>活动流程</h2>
              <p>新用户注册登录账号并且完成实名认证就可参与此活动</p>
            </div>
            <div class="flow">
              <div
                v-for="(item,index) in flowGroup"
                :key="index"
                class="item"
                :class="{onStep:onStep > index,outStep: onStep <= index }"
                :style="{right: index * 30 + 'px'}"
              >
                <div class="item-img">
                  <img v-if="onStep <= index" :src="item.src">
                  <img v-else :src="item.onSrc" alt="描述">
                </div>
                <div class="item-text">
                  <p :class="{onStep: onStep > index}">{{ item.text }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div class="hot-host">
        <div class="wrap">
          <div class="headline">
            <h2>热销云服务器</h2>
            <p>购买时长越长越便宜，年付低至3折
              <span
                style="color:#387dff;cursor:pointer;text-decoration: underline;"
                @click="showModal.ruleHost=true"
              >活动规则></span>
            </p>
          </div>
          <div class="product">
            <div v-for="(item,index) in hotHostList" :key="index">
              <div class="head">
                <h3>云服务器</h3>
                <span>100%性能可用，更低价格，拒绝套路</span>
              </div>
              <div class="body">
                <div class="configure">
                  <ul>
                    <li>
                      <i>CPU</i>
                      <span>{{item.config.cpu}}核</span>
                    </li>
                    <li>
                      <i>内存</i>
                      <span>{{item.config.mem}}G</span>
                    </li>
                    <li>
                      <i>宽带</i>
                      <span>{{item.config.bandwith}}M</span>
                    </li>
                    <li>
                      <i>系统盘</i>
                      <span>{{item.config.disksize}}G<span>SSD</span></span>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="body">
                <div>
                  <span class="label">区域：</span>
                  <Select
                    v-model="item.zone"
                    style="width:237px"
                  @on-change="changeZoneHot(item,index,'hotHostList')"
                  >
                    <Option
                      v-for="item in zoneListHot"
                      :value="item.value"
                      :key="item.value"
                    >{{ item.name }}</Option>
                  </Select>
                </div>
                <div>
                  <span class="label">系统：</span>
                  <Cascader :data="item.systemList" v-model="item.system" style="width:237px;"></Cascader>
                </div>
                <div class="time">
                  <span class="label">时长：</span>
                  <ul>
                    <li
                      v-for="(item1,index1) in item.timeList"
                      :key="index1"
                      :class="{'selected':item.configId==item1.id}"
                      @click="changgeTimeHot(item,item1)"
                    >{{month(item1.days)}}
                    <span>{{item1.discount*10}}折</span>
                    </li>
                  </ul>
                </div>
                <div class="price">
                  价格：￥
                  <span>{{item.price}}</span>
                </div>
                <div class="origin-price">
                  原价：￥
                  <span>{{item.originPrice+'/'+month(item.time)}}</span>
                </div>
                <Button @click="pushOrderHot(item)">立即购买</Button>
              </div>
            </div>
          </div>
          <div class="tips">100%性能可用，内网收发包无限制，使用顶级Intel品牌硬件，40G SSD系统盘（好于高性能盘和高效云盘）</div>
        </div>
      </div>
    </section>
    <section>
      <div class="summary-host">
        <div class="wrap">
          <div class="headline">
            <h2>云服务器大集合</h2>
            <p>你想要的云服务器都在这里</p>
          </div>
          <div class="product">
            <div>
              <div class="head">
                <h3>云服务器/GPG服务器</h3>
              </div>
              <div class="body">
                <div class="left">
                    <RadioGroup v-model="single" size="large">
                        <Radio label="选择云服务器" style="color:#4768B1;margin-bottom:20px;font-size:18px;"></Radio>
                  <div class="configure">
                    <ul>
                      <li
                        v-for="(item,index) in configureList"
                        :key="index"
                        :class="{'selected':selectConfig==item.cpu+','+item.mem}"
                        @click="changConfigHost(item.cpu+','+item.mem)"
                      >{{ item.cpu+'核'+item.mem+'G'}}</li>
                    </ul>
                    <span class="tips">*以上配置皆包含40G SSD系统盘</span>
                  </div>
                  <Radio label="选择GPU服务器" style="color:#4768B1;margin-top:40px;margin-bottom:20px;font-size:18px;"></Radio>
                  <div ref="summary-host-select">
                    <Select
                      v-model="selectConfig"
                      style="width:476px"
                      placeholder=" "
                      @on-change="changConfigGPU"
                    >
                      <Option
                        v-for="(item,index) in gpuConfigList"
                        :value="item.cpu+','+item.mem+','+item.num"
                        :key="index"
                      >{{ item.cpu+'核'+item.mem+'G'+item.num+' *NVIDIA_P100' }}</Option>
                    </Select>
                  </div>
                  </RadioGroup>
                  <div class="area" v-if="configLength==2">
                    <span class="label">区域选择</span>
                    <ul>
                      <li
                        v-for="(item,index) in hostZoneList"
                        :key="index"
                        :class="{'selected':selectZone==item.zoneid}"
                        @click="changzone(item.zoneid)"
                      >{{item.zonename}}</li>
                    </ul>
                  </div>
                  <div class="area" v-else>
                    <span class="label">区域选择</span>
                    <ul>
                      <li
                        v-for="(item,index) in gpuZoneList"
                        :key="index"
                        :class="{'selected':selectZone==item.zoneid}"
                        @click="changzone(item.zoneid)"
                      >{{item.zonename}}</li>
                    </ul>
                  </div>
                </div>
                <div class="right">
                  <div>
                    <span class="label">带宽选择</span>
                    <Select v-model="selectBandWidth" style="width:408px">
                      <Option v-for="item in bandWidthList" :value="item" :key="item">{{item}}M</Option>
                    </Select>
                  </div>
                  <div>
                    <span class="label">系统选择</span>
                    <Cascader
                      :data="summarySystemList"
                      v-model="selectSummarySystem"
                      style="width:408px;"
                    ></Cascader>
                  </div>
                  <div class="ssd">
                    <span class="label">SSD数据盘</span>
                    <ul>
                      <li
                        v-for="(item,index) in ssdList"
                        :key="index"
                        :class="{'selected':selectedSSD==item}"
                        @click="selectedSSD=item"
                      >{{item}}G</li>
                    </ul>
                  </div>
                  <div>
                    <span class="label">购买时长</span>
                    <Select v-model="selectTime" style="width:408px">
                      <Option
                        v-for="(item,index) in hostTimeList"
                        :value="item"
                        :key="index"
                      >{{item<12?item+'月':item/12+'年'}}</Option>
                    </Select>
                  </div>
                  <div>
                    <span class="label">购买数量</span>
                    <InputNumber :max="10" :min="1" v-model="count"></InputNumber>
                  </div>
                  <div class="price">
                    ￥
                    <span>{{(totalDataCost*count).toFixed(2)}}</span>
                    <!-- <span>{{vmCost}}</span>/
                    <span>{{ipCost}}</span>/
                    <span>{{dataDiskCost}}</span> -->
                    <!-- <i>{{totalDataCoupon}}</i> -->
                  </div>
                  <Button @click="pushOrderHost()" v-if="configLength==2">立即购买</Button>
                  <Button @click="pushOrderGpu()" v-else>立即购买</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div class="coupon">
        <div class="wrap">
          <div class="headline">
            <h2>配置不够用 券券来帮忙</h2>
            <p><span
                style="color:#387dff;cursor:pointer;text-decoration: underline;"
                @click="showModal.ruleCoupon=true"
              >活动规则></span></p>
          </div>
          <div class="product">
            <div v-for="(item,index) in activityList" :key="index" @click="$router.push(item.url)">
              <div class="head">
                <h3>
                  {{item.text}}
                  <span>{{item.config}}</span>
                </h3>
              </div>
            </div>
          </div>
          <div class="coupons">
            <div class="box">
              <div>
                <div class="head">
                  <span>
                    <i>8</i>折
                  </span>
                  <span>域名优惠券</span>
                </div>
                <span>立即领取</span>
              </div>
              <div>
                <div class="head">
                  <span>
                    <i>7</i>折
                  </span>
                  <span>SSL证书优惠券</span>
                </div>
                <span>立即领取</span>
              </div>
              <div>
                <div class="head">
                  <span class="full-cut">
                    满
                    <i>500</i>减
                    <i>200</i>
                  </span>
                </div>
                <span>升级续费券</span>
              </div>
              <div>
                <div class="head" style="padding-right:0">
                  <span class="full-cut">
                    满
                    <i>1000</i>减
                    <i>500</i>
                  </span>
                </div>
                <span>升级续费券</span>
              </div>
            </div>
            <Button @click="getTiket()">一键领取</Button>
          </div>
        </div>
      </div>
    </section>
    <!-- 领取提示 -->
    <Modal v-model="showModal.rechargeHint" :scrollable="true" :closable="false" :width="390">
      <div class="modal-content-s" style="padding: 30px 30px 0 50px">
        <div>
          <div class="ivu-modal-confirm-body-icon ivu-modal-confirm-body-icon-success" style="top: 48px;left: 30px;">
            <i class="ivu-icon ivu-icon-checkmark-circled"></i>
          </div>
          <strong>提示</strong>
          <p class="lh24">本免费活动充值保证金<span style="color: #D0021B ">{{ cashPledge }}</span>元，主机到期或删除时保证金自动退还到账户余额。
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
          <p class="lh24">您好，您不符合本活动的参与条件，您还可以去看看<span style="color: #FF9700;cursor: pointer" @click="$router.push('/activity/BlacKActivities')">“低价秒杀，买一赠一”</span>活动。
          </p>
        </div>
      </div>
      <p slot="footer" class="modal-footer-s">
        <Button @click="showModal.inConformityModal = false">取消</Button>
        <Button type="primary" @click="$router.push('/activity/BlacKActivities')">现在就去</Button>
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
          <p class="lh24">恭喜您保证金已冻结完成，主机领取成功，主机在实名认证之前只可保留3天，请尽快使用。
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
          <p><img src="../../../assets/img/sceneInfo/si-success.png" alt="支付成功"/><span>恭喜您支付成功！我们即将冻结保证金</span><span style="color: #D0021B;margin-left: 0">{{ cashPledge }}</span><span
            style="margin-left: 0">元</span></p>
        </div>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="primary" @click="getFreeHost">确认冻结</Button>
      </div>
    </Modal>

    <!-- 微信支付弹窗 -->
    <Modal v-model="showModal.weChatRechargeModal" width="640" :scrollable="true" :mask-closable="false">
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
    <Modal v-model="showModal.orderConfirmationModal" width="640" :scrollable="true" :mask-closable="false">
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
                          <img src="../../../assets/img/payresult/alipay.png" :class="{selected: otherPayWay == 'zfb'}" @click="otherPayWay = 'zfb'">
                          <img src="../../../assets/img/payresult/wxpay.png" :class="{selected: otherPayWay == 'wx'}" @click="otherPayWay = 'wx'">
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
                   @click="imgSrc=`https://www.xrcloud.net/user/getKaptchaImage.do?t=${new Date().getTime()}`">
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
    <!-- 活动规则 -->
    <transition name="fade">
      <div class="overlay" @click.stop="showModal.rule=true" v-if="showModal.rule">
        <div class="rule-modal">
          <div class="header">
            <span>活动规则</span>
            <img src=../../../assets/img/active/freeToReceive.1/close-icon.png alt="关闭图标" @click.stop="showModal.rule=false">
          </div>
          <div class="body">
            <p>1、活动时间：2019年5月7日开始，总量有限，先到先得！</p>
            <p>2、活动对象：新注册或者一直未使用过平台资源（第三方产品除外）及未参加过其他免费活动并已通过实名认证的用户。</p>
            <dl>
              <dt>3、活动内容：</dt>
              <dd>（1）活动产品需充值对应的保证金后方可使用；云服务器未到期可自行删除，删除后或者云服务器使用到期后，用户可解冻保证金。</dd>
              <dd>（2）若您需要续费保证金云服务器，可选择在云服务器未到期之前将保证金转换为云服务器续费费用，最多可延长云服务器使用时间1年。</dd>
              <dd>（3）保证金转续费时间说明：用户A在2019年4月30日选择保证金云服务器2核4G，一年的配置，冻结保证金1269元，云服务器到期时间为2020年4月30日，若用户在2019年4月30日当天操作保证金转续费，则云服务器到期时间仍为2020年4月30日，如用户在2020年4月29日操作保证金转续费，则云服务器实际到期时间为2021年4月29日，可低价续费一年时间。续费时间根据用户之前选择的云服务器规格时间为准，一月期续费一月，一年期续费一年。</dd>
            </dl>
            <p>4、解冻操作流程：进入控制台，点击右上角用户名，选择【费用中心】，在账户概览中点击【历史冻结记录】，在弹出的弹窗中选择需要解冻的保证金，点击【申请解冻】，根据弹窗提示完成操作。</p>
            <dl>
              <dt>5、活动规则：</dt>
              <dd>（1）每个用户只能参与一次，同一手机号对应的多个账号、同一实名认证用户等满足同一条件的均视为一个用户。</dd>
              <dd>（2）免费产品中的资源可随时进行升级，升级费用按新睿云标准收费进行收取。</dd>
              <dd>（3）在各产品免费使用期间，若对免费资源进行了销毁，则视为放弃免费使用权。</dd>
            </dl>
            <p>6、活动声明：为保证活动的公平公正，新睿云有权对恶意刷抢（如通过程序等技术手段）活动资源，领取后3天内未使用资源、利用资源从事违法违规行为的用户收回免费套餐使用资格。因此造成任何损失的，由该用户自行负责。</p>
          </div>
          <div class="footer">
            <span @click.stop="showModal.rule=false">知道了</span>
          </div>
        </div>
      </div>
    </transition>
    <!-- 活动规则 -->
    <transition name="fade">
      <div class="overlay" @click.stop="showModal.ruleHost=true" v-if="showModal.ruleHost">
        <div class="rule-modal">
          <div class="header">
            <span>活动规则</span>
            <img src=../../../assets/img/active/freeToReceive.1/close-icon.png alt="关闭图标" @click.stop="showModal.ruleHost=false">
          </div>
          <div class="body">
            <p>1、活动时间：2019.6.19开始</p>
            <p>2、活动对象：平台已完成实名认证的新老用户。</p>
            <p>3、数量限制：云服务器产品每个用户限购7台（若有更多需求，可向客服申请提高配额）</p>
            <p>4、参与本次活动购买的产品不能进行退款。</p>
            <p>5、购买时不可使用任何优惠券。</p>
            <p>6、活动最终解释权为新睿云所有。</p>
          </div>
          <div class="footer">
            <span @click.stop="showModal.ruleHost=false">知道了</span>
          </div>
        </div>
      </div>
    </transition>
    <!-- 活动规则 -->
    <transition name="fade">
      <div class="overlay" @click.stop="showModal.ruleCoupon=true" v-if="showModal.ruleCoupon">
        <div class="rule-modal">
          <div class="header">
            <span>活动规则</span>
            <img src=../../../assets/img/active/freeToReceive.1/close-icon.png alt="关闭图标" @click.stop="showModal.ruleCoupon=false">
          </div>
          <div class="body">
            <p>1、活动时间：2019.6.19开始</p>
            <p>2、活动对象：平台已完成实名认证的新老用户。</p>
            <p>3、数量限制：优惠券每个用户限领取一次，不同账号同一认证信息视为一个用户</p>
            <p>4、域名与SSL证书优惠券有效期为3个月、续费优惠券有效期为1年</p>
            <p>5、活动最终解释权为新睿云所有。</p>
          </div>
          <div class="footer">
            <span @click.stop="showModal.ruleCoupon=false">知道了</span>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
import axios from 'axios'
import reg from '../../../util/regExp'
import VueQArt from 'vue-qart'
import $ from 'jquery'
export default {
  data () {
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
        authenticationError: false,
        rule: false,
        ruleHost: false,
        ruleCoupon: false,
      },
      // 云服务器大集合参数
      single:'选择云服务器',
      vmCost: 0,
      vmCoupon: 0,
      dataDiskCost: 0,
      coupon: 0,
      ipCost: 0,
      ipCoupon: 0,
      selectSummarySystem: [],
      summarySystemList: [{
        value: 'window',
        label: 'Windows',
        children: []
      }, {
        value: 'centos',
        label: 'Centos',
        children: [],
      },
      {
        value: 'debian',
        label: 'Debian',
        children: [],
      },
      {
        value: 'ubuntu',
        label: 'Ubuntu',
        children: [],
      }],
      hostZoneList: [],
      gpuZoneList: [],
      selectZone: '',
      configureList: [
        { cpu: 1, mem: 1 },
        { cpu: 1, mem: 2 },
        { cpu: 2, mem: 4 },
        { cpu: 4, mem: 8 },
        { cpu: 8, mem: 16 },
        { cpu: 16, mem: 32 },
        { cpu: 32, mem: 64 },
        { cpu: 64, mem: 256 }
      ],
      gpuConfigList: [
        { cpu: 8, mem: 64, num: 1 },
        { cpu: 16, mem: 128, num: 2 },
        { cpu: 16, mem: 192, num: 3 },
        { cpu: 32, mem: 256, num: 4 },
        { cpu: 64, mem: 384, num: 6 },
      ],
      selectConfig: '1,1',
      configLength: 2,
      bandWidthList: [1, 2, 5, 10, 20],
      selectBandWidth: 1,
      hostTimeList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 24, 36],
      selectTime: 1,
      ssdList: [0, 20, 50, 100, 500],
      selectedSSD: 0,
      count:1,
      // 结束
      zoneListDeposit: [],
      depositList: [
        {
          headline: '包月云服务器',
          subtitle: '适用于：日常运营活动、小型开发测试环境、普通数据处理服务等场景。',
          config: {},
          timeList: [],
          time: '1个月',
          systemList: [{
            value: 'window',
            label: 'Windows',
            children: []
          }, {
            value: 'centos',
            label: 'Centos',
            children: [],
          },
          {
            value: 'debian',
            label: 'Debian',
            children: [],
          },
          {
            value: 'ubuntu',
            label: 'Ubuntu',
            children: [],
          }],
          system: [],
          zone: '',
          cashPledge: '69',
          originPrice: '176.72',
          configId: '',
          unit: '月'
        },
        {
          headline: '包年云服务器',
          subtitle: '适用于：日常运营活动、小型开发测试环境、普通数据处理服务等场景。',
          config: {},
          timeList: [],
          time: '12个月',
          systemList: [{
            value: 'window',
            label: 'Windows',
            children: []
          }, {
            value: 'centos',
            label: 'Centos',
            children: [],
          },
          {
            value: 'debian',
            label: 'Debian',
            children: [],
          },
          {
            value: 'ubuntu',
            label: 'Ubuntu',
            children: [],
          }],
          system: [],
          zone: '',
          cashPledge: '1269',
          originPrice: '2120.64',
          configId: '',
          unit: '年'
        }
      ],
      zoneListHot: [],
      hotHostList: [
        {
          headline: '包月云服务器',
          subtitle: '适用于：日常运营活动、小型开发测试环境、普通数据处理服务等场景。',
          config: {},
          timeList: [],
          time: 180,
          systemList: [{
            value: 'window',
            label: 'Windows',
            children: []
          }, {
            value: 'centos',
            label: 'Centos',
            children: [],
          },
          {
            value: 'debian',
            label: 'Debian',
            children: [],
          },
          {
            value: 'ubuntu',
            label: 'Ubuntu',
            children: [],
          }],
          system: [],
          zone: '',
          price: '69',
          originPrice: '176.72',
          configId: ''
        },
        {
          headline: '包年云服务器',
          subtitle: '适用于：日常运营活动、小型开发测试环境、普通数据处理服务等场景。',
          config: {},
          timeList: [],
          time: 180,
          systemList: [{
            value: 'window',
            label: 'Windows',
            children: []
          }, {
            value: 'centos',
            label: 'Centos',
            children: [],
          },
          {
            value: 'debian',
            label: 'Debian',
            children: [],
          },
          {
            value: 'ubuntu',
            label: 'Ubuntu',
            children: [],
          }],
          system: [],
          zone: '',
          price: '69',
          originPrice: '176.72',
          configId: ''
        },
        {
          headline: '包月云服务器',
          subtitle: '适用于：日常运营活动、小型开发测试环境、普通数据处理服务等场景。',
          config: {},
          timeList: [],
          time: 180,
          systemList: [{
            value: 'window',
            label: 'Windows',
            children: []
          }, {
            value: 'centos',
            label: 'Centos',
            children: [],
          },
          {
            value: 'debian',
            label: 'Debian',
            children: [],
          },
          {
            value: 'ubuntu',
            label: 'Ubuntu',
            children: [],
          }],
          system: [],
          zone: '',
          price: '69',
          originPrice: '176.72',
          configId: ''
        },
        {
          headline: '包年云服务器',
          subtitle: '适用于：日常运营活动、小型开发测试环境、普通数据处理服务等场景。',
          config: {},
          timeList: [],
          time: 180,
          systemList: [{
            value: 'window',
            label: 'Windows',
            children: []
          }, {
            value: 'centos',
            label: 'Centos',
            children: [],
          },
          {
            value: 'debian',
            label: 'Debian',
            children: [],
          },
          {
            value: 'ubuntu',
            label: 'Ubuntu',
            children: [],
          }],
          system: [],
          zone: '',
          price: '69',
          originPrice: '176.72',
          configId: ''
        }
      ],
      flowGroup: [
        {
          src: require('../../../assets/img/active/freeToReceive/fr-icon21.png'),
          onSrc: require('../../../assets/img/active/freeToReceive/fr-icon27.png'),
          text: '注册/登录 新睿云'
        },
        {
          src: require('../../../assets/img/active/freeToReceive/fr-icon22.png'),
          onSrc: require('../../../assets/img/active/freeToReceive/fr-icon28.png'),
          text: '实名认证'
        },
        {
          src: require('../../../assets/img/active/freeToReceive/fr-icon23.png'),
          onSrc: require('../../../assets/img/active/freeToReceive/fr-icon29.png'),
          text: '充值保证金 领取云服务器'
        },
        {
          src: require('../../../assets/img/active/freeToReceive/fr-icon24.png'),
          onSrc: require('../../../assets/img/active/freeToReceive/fr-icon30.png'),
          text: '免费使用 云服务器'
        },
        {
          src: require('../../../assets/img/active/freeToReceive/fr-icon25.png'),
          onSrc: require('../../../assets/img/active/freeToReceive/fr-icon31.png'),
          text: '到期或者 删除资源'
        },
        {
          src: require('../../../assets/img/active/freeToReceive/fr-icon26.png'),
          onSrc: require('../../../assets/img/active/freeToReceive/fr-icon32.png'),
          text: '退还保证金'
        },
      ],
      onStep: 0,
      time: '',
      config: {
        value: '',
        imagePath: require('../../../assets/img/pay/payBackground.png'),
        filter: 'black',
        size: 500
      },
      cashPledge: 0,
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
            let param3 = h('li', {}, '主机： ' + params.row.title)
            let param = h('li', {}, '带宽： ' + params.row.configs.config.bandwith) + 'M'
            let param1 = h('li', {}, '磁盘： ' + params.row.configs.config.disksize) + 'G SSD'
            let param2 = h('li', {}, '系统： ' + params.row.configs.system[0])
            arr.push(param3)
            arr.push(param)
            arr.push(param1)
            arr.push(param2)
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
          title: '保证金金额',
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
      authErrorText: '',
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
          { required: true, message: '请输入姓名' },
          { validator: validaRegisteredName }
        ],
        IDCard: [
          { required: true, message: '请输入身份证号' },
          { validator: validaRegisteredID }
        ],
        pictureCode: [
          { required: true, message: '请输入图片验证码' }
        ],
        phone: [
          { required: true, message: '请输入以该身份证开户的手机号码' },
          { validator: validaRegisteredPhone }
        ],
        validateCode: [
          { required: true, message: '请输入验证码' }
        ]
      },
      imgSrc: 'https://www.xrcloud.net/user/getKaptchaImage.do',
      index1: '',
      stepsList: [
        {
          distance: 1400,
          imgbg: require('../../../assets/img/active/freeToReceive.1/w-center.png'),
          imgnum: require('../../../assets/img/active/freeToReceive.1/cnumber-2.png'),
          imgbgH: require('../../../assets/img/active/freeToReceive.1/c-center.png'),
          imgnumH: require('../../../assets/img/active/freeToReceive.1/wnumber-2.png'),
          text:'热销云服务器',
          isShow: true,
        },
        {
          distance: 2200,
          imgbg: require('../../../assets/img/active/freeToReceive.1/w-center.png'),
          imgnum: require('../../../assets/img/active/freeToReceive.1/cnumber-3.png'),
          imgbgH: require('../../../assets/img/active/freeToReceive.1/c-center.png'),
          imgnumH: require('../../../assets/img/active/freeToReceive.1/wnumber-3.png'),
          text:'云服务器大集合',
          isShow: true,
        },
        {
          distance: 3000,
          imgbg: require('../../../assets/img/active/freeToReceive.1/w-right.png'),
          imgnum: require('../../../assets/img/active/freeToReceive.1/cnumber-4.png'),
          imgbgH: require('../../../assets/img/active/freeToReceive.1/c-right.png'),
          imgnumH: require('../../../assets/img/active/freeToReceive.1/wnumber-4.png'),
          text:'优惠券随时领',
          isShow: true,
        },
      ],
      activityList: [
        {
          text: '对象存储免费领取',
          config: '50G',
          url: '/activity/objectstorage/',
        },
        {
          text: '云数据库免费试用',
          config: '60天',
          url: '/activity/objectstorage/',
        }
      ],
    }
  },
  created () {
    this.judgeUserFlow()
    this.getConfigureHot()
    this.getConfigureDeposit()
    this.getZoneList()
  },
  mounted () {

  },
  methods: {
    init() {
        axios.get('user/GetUserInfo.do').then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.$store.commit('setAuthInfo', {authInfo: response.data.authInfo, userInfo: response.data.result, authInfoPersion: response.data.authInfo_persion})
          }
        })
      },
    // 获取活动配置,区域
    getConfigureDeposit () {
      let url = 'activity/getTemActInfoById.do'
      axios.get(url, {
        params: {
          activityNum: '50'
        }
      }).then(res => {
        if (res.data.status == 1 && res.status == 200) {
          // console.log(res.data.result.freevmconfigs)
          let responseData = res.data.result.freevmconfigs
          // 获取区域列表
          this.zoneListDeposit = res.data.result.optionalArea
          this.depositList.forEach((item, index) => {
            item.config = responseData[index]
            this.changgeZoneDeposite(item, this.zoneListDeposit[0], index, 'depositList')
          })
        }
      })
    },
    changgeZoneDeposite (item, item1, index, name) {
      item.zone = item1.value
      this.changeZoneHost(item, index, name)
      this.getPriceDeposit(item)
    },
    getPriceDeposit (item) {
      axios.get('activity/getOriginalPrice.do', {
        params: {
          zoneId: item.zone,
          vmConfigId: item.config.id,
          month: item.config.days / 30
        }
      }).then(res => {
        if (res.status == 200 && res.data.status == 1) {
          item.cashPledge = res.data.result.cost;
          item.originPrice = res.data.result.originalPrice;
        }
      })
    },
    getHost (index1) {
      if (!this.$store.state.userInfo) {
        this.$LR({ type: 'register' })
        return
      }
      if ((!this.authInfo) || (this.authInfo && this.authInfo.authtype == 0 && this.authInfo.checkstatus != 0) || (!this.authInfoPersion && this.authInfo && this.authInfo.authtype == 1 && this.authInfo.checkstatus != 0) || (this.authInfoPersion && this.authInfoPersion.checkstatus != 0 && this.authInfo && this.authInfo.checkstatus != 0)) {
        this.showModal.authentication = true
        return
      }
      this.$http.post('device/DescribeWalletsBalance.do').then(response => {
        if (response.status == 200 && response.data.status == '1') {
          this.balance = Number(response.data.data.remainder)
          this.index1 = index1
          this.time = this.depositList[index1].time
          this.cashPledge = this.depositList[index1].cashPledge
          this.showModal.rechargeHint = true
        } else {
          this.$message.info({
            content: response.data.message
          })
        }
      })
    },
    nextStep () {
      // 判断新老用户
      axios.get('activity/jdugeTeam.do', {
        params: { sign: 'freeReceive' }
      }).then(response => {
        if (response.status == 200 && response.data.status == 1) {
          if (response.data.result.flag) {
            this.orderData = []
            this.orderData.push({
              productType: '云服务器',
              configs: this.depositList[this.index1],
              originalPrice: this.depositList[this.index1].originPrice,
              time: this.time,
              title: this.depositList[this.index1].headline,
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
    getHost_ok () {
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
                params: { freezeMoney: this.cashPledge }
              }).then(val => {
                if (val.data.status == 1) {
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
    payWayChange () {
      if (this.payWay == 'otherPay' && this.otherPayWay == '') {
        this.otherPayWay = 'zfb'
      } else if (this.payWay == 'balancePay') {
        this.otherPayWay = ''
      }
    },
    getFreeHost () {
      this.showModal.paySuccessModal = false
      let vmConfigId = ''
      switch (this.index1) {
        case 0:
          vmConfigId = '451'
          this.time = '1'
          break
        case 1:
          vmConfigId = '452'
          this.time = '12'
          break
      }
      this.vmConfig = vmConfigId
      let url = 'user/getRemainderFrozen.do'
      let params = {
        eachFrozenMoney: this.cashPledge,
        describe: '领取主机',
        operationType: '领取主机',
        thawCondition: '删除主机、公网IP',
        vmConfig: this.vmConfig,
        zoneId: this.depositList[this.index1].zone
      }
      axios.post(url, params).then(response => {
        if (response.data.status == 1 && response.status == 200) {
          let url = 'activity/getFreeHost.do'
          axios.get(url, {
            params: {
              vmConfigId: vmConfigId,
              osType: this.depositList[this.index1].system[1],
              defzoneid: this.depositList[this.index1].zone
            }
          }).then(res => {
            if (res.status == 200 && res.data.status == 1) {
              this.showModal.getSuccessModal = true
              this.toggleZone(this.depositList[this.index1].zone)
            } else {
              this.$message.info({
                content: res.data.message
              })
            }
          })
        } else {
          this.$message.info({
            content: response.data.message
          })
        }
      })
    },
    // 获取活动配置,区域
    getConfigureHot () {
      let url = 'activity/getTemActInfoById.do'
      axios.get(url, {
        params: {
          activityNum: '48'
        }
      }).then(res => {
        if (res.data.status == 1 && res.status == 200) {
          // 处理数组格式
          let originArr = res.data.result.freevmconfigs
          let timeList = []
          originArr.forEach((item, index) => {
            if ((index + 1) % 2 != 0) {
              timeList = []
            }
            let rObj = {};
            rObj['id'] = item.id;
            rObj['discount'] = item.discount;
            rObj['days'] = item.days;
            timeList.push(rObj)
            if ((index + 1) % 2 == 0) {
              let num = index - (index + 1) / 2
              this.hotHostList[num].config = item
              this.hotHostList[num].timeList = timeList
            }
          })
          // 获取区域列表
          this.zoneListHot = res.data.result.optionalArea
          // console.log(this.hotHostList)
        }
        //默认选择
        this.hotHostList.forEach(item => {
          // console.log(item)
          item.configId = item.timeList[0].id
          item.time = item.timeList[0].days
          item.zone = this.zoneListHot[0].value
          this.changgeTimeHot(item, item.timeList[0])
        })
      })
    },
    changgeTimeHot (item, innerItem) {
      item.configId = innerItem.id
      item.time = innerItem.days
      this.getPriceHot(item)
    },
    changeZoneHot(item, index, name) {
      this.changeZoneHost (item, index, name)
      this.getPriceHot(item)
    },
    // 根据区域获得不同系统
    changeZoneHost (item, index, name) {
      axios.get('information/listTemplates.do', {
        params: {
          zoneId: item.zone,
        }
      }).then(res => {
        if (res.status == 200 && res.data.status == 1) {
          var x
          for (x in res.data.result) {
            this[name][index].systemList.forEach(item => {
              if (item.value == x) {
                item.children = res.data.result[x]
              }
            })
          }
          this[name][index].systemList.forEach(item => {
            item.children.forEach(item => {
              item.value = item.systemtemplateid
              item.label = item.templatedescript
            })
          })
          this[name][index].systemList.forEach((item, index) => {
            if (item.children.length == 0) {
              item.disabled = true
            }
          })
          // 设置默认系统
          this[name].forEach(item => {
            item.system = ['window', res.data.result.window[0].systemtemplateid]
          })
        }
      })
    },
    getPriceHot (item) {
      // console.log(item.zone)
      axios.get('activity/getOriginalPrice.do', {
        params: {
          zoneId: item.zone,
          vmConfigId: item.configId,
          month: item.time / 30
        }
      }).then(res => {
        if (res.status == 200 && res.data.status == 1) {
          item.price = res.data.result.cost;
          item.originPrice = res.data.result.originalPrice;
        }
      })
    },
    pushOrderHot (item) {
      if (!this.$store.state.userInfo) {
        this.$LR({ type: 'register' })
        return
      }
      if ((!this.authInfo) || (this.authInfo && this.authInfo.authtype == 0 && this.authInfo.checkstatus != 0) || (!this.authInfoPersion && this.authInfo && this.authInfo.authtype == 1 && this.authInfo.checkstatus != 0) || (this.authInfoPersion && this.authInfoPersion.checkstatus != 0 && this.authInfo && this.authInfo.checkstatus != 0)) {
        this.showModal.authentication = true
        return
      }
      axios.get('information/getDiskcountMv.do', {
        params: {
          defzoneid: item.zone,
          vmConfigId: item.configId,
          osType: item.system[1]
        }
      }).then(res => {
        if (res.status == 200 && res.data.status == 1) {
          this.$Message.success('创建订单成功')
          this.$router.push('/order')
        } else {
          this.$message.info({
            content: res.data.message
          })
        }
      })
    },
    judgeUserFlow () {
      this.$http.get('user/GetUserInfo.do', { params: { t: new Date().getTime() } }).then(res => {
        if (res.data.status === 1) {
          if (res.data.authInfo && res.data.authInfo.status) {
            this.onStep = res.data.authInfo.status
          } else {
            this.onStep = 1
          }
        } else {
          this.onStep = 0
        }
      })
    },
    month (val) {
      return val >= 360 ? val / 360 + '年' : val / 30 + '个月'
    },
    // 快速认证时发送验证码
    sendCode () {
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
    quicklyAuth () {
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
    isPay () {
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
    changConfigHost (config) {
      let originLength = this.configLength
      this.configLength = config.split(',').length
      this.selectConfig = config
      if(this.configLength!=originLength){
        // console.log('进入2')
        this.changzone(this.hostZoneList[0].zoneid)
      }
    },
    changConfigGPU (config) {
      let originLength = this.configLength
      this.configLength = config.split(',').length
      this.selectConfig = config
      if(this.configLength!=originLength){
        // console.log('进入3')
        this.changzone(this.gpuZoneList[0].zoneid)
      }
    },
    changzone (zoneid) {
      this.selectZone = zoneid
      this.setTemplateHost(zoneid)
    },
    getZoneList () {
      axios.get('information/zone.do', { params: { t: new Date().getTime() } }).then(res => {
        if (res.status == 200 && res.data.status == 1) {
          this.hostZoneList = res.data.result.filter(item => {
            return item.gpuserver == 0
          })
          this.gpuZoneList = res.data.result.filter(item => {
            return item.gpuserver == 1
          })
          this.changzone(this.hostZoneList[0].zoneid)
          this.queryCustomVM()
          this.queryDiskPrice()
          this.queryIPPrice()
        }
      })
    },
    // 查询自定义主机价格
    queryCustomVM () {
      var params = {}
      if (this.selectConfig.split(',').length == 3) {
        //gpu
        params = {
          cpuNum: this.selectConfig.split(',')[0],
          diskSize: '128',
          diskType: 'ssd',
          memory: this.selectConfig.split(',')[1],
          timeType: this.selectTime < 12 ? 'month' : 'year',
          timeValue: this.selectTime < 12 ? this.selectTime : this.selectTime / 12,
          zoneId: this.selectZone,
          gpu: '100',
          gpuSize: this.selectConfig.split(',')[2],
        }
      } else if (this.selectConfig.split(',').length == 2) {
        // 主机
        params = {
          cpuNum: this.selectConfig.split(',')[0],
          diskSize: '40',
          diskType: 'ssd',
          memory: this.selectConfig.split(',')[1],
          timeType: this.selectTime < 12 ? 'month' : 'year',
          timeValue: this.selectTime < 12 ? this.selectTime : this.selectTime / 12,
          zoneId: this.selectZone,
        }
      }
      axios.post('device/QueryBillingPrice.do', params).then(response => {
        this.vmCost = response.data.cost
        if (response.data.coupon) {
          this.vmCoupon = response.data.coupon
        } else {
          this.vmCoupon = 0
        }
      })
    },
    // 磁盘页面数据盘价格
    queryDiskPrice () {
      var params = {
        cpuNum: '0',
        diskSize: this.selectedSSD,
        diskType: 'ssd',
        memory: '0',
        timeType: this.selectTime < 12 ? 'month' : 'year',
        timeValue: this.selectTime < 12 ? this.selectTime : this.selectTime / 12,
        zoneId: this.selectZone,
      }
      axios.post('device/QueryBillingPrice.do', params).then(response => {
        this.dataDiskCost = response.data.cost
        if (response.data.coupon) {
          this.coupon = response.data.coupon
        } else {
          this.coupon = 0
        }
      })
    },
    // 查询数据库IP价格
    queryIPPrice () {
      var params = {
        brand: this.selectBandWidth,
        timeType: this.selectTime < 12 ? 'month' : 'year',
        timeValue: this.selectTime < 12 ? this.selectTime : this.selectTime / 12,
        zoneId: this.selectZone
      }
      axios.post('device/queryIpPrice.do', params).then(response => {
        this.ipCost = response.data.cost
        if (response.data.coupon) {
          this.ipCoupon = response.data.coupon
        } else {
          this.ipCoupon = 0
        }
      })
    },
    pushOrderGpu () {
      if (!this.$store.state.userInfo) {
        this.$LR({ type: 'register' })
        return
      }
      let params = {
        zoneId: this.selectZone,
        templateId: this.selectSummarySystem[1],
        bandWidth: this.selectBandWidth,
        timeType: this.selectTime < 12 ? 'month' : 'year',
        timeValue: this.selectTime < 12 ? this.selectTime : this.selectTime / 12,
        count: this.count,
        isAutoRenew: '1',
        cpuNum: this.selectConfig.split(',')[0],
        memory: this.selectConfig.split(',')[1],
        networkId: 'no',
        rootDiskType: 'ssd',
        vpcId: 'no',
        gpusize: this.selectConfig.split(',')[2],
        serviceType: 'G5500',
        diskType: 'ssd',
        diskSize: this.selectedSSD
      }
      // console.log(params)
      axios.get('gpuserver/createGpuServer.do', { params }).then(response => {
        if (response.status == 200 && response.data.status == 1) {
          this.$router.push('/order')
        } else {
          this.$message.info({
            content: response.data.message
          })
        }
      })
    },
     // 购买主机
      pushOrderHost() {
        if (!this.$store.state.userInfo) {
        this.$LR({ type: 'register' })
        return
      }
        let params = {
          zoneId: this.selectZone,
          templateId: this.selectSummarySystem[1],
          bandWidth: this.selectBandWidth,
          timeType: this.selectTime < 12 ? 'month' : 'year',
          timeValue: this.selectTime < 12 ? this.selectTime : this.selectTime / 12,
          count: this.count,
          isAutoRenew: '1',
          cpuNum: this.selectConfig.split(',')[0],
          memory: this.selectConfig.split(',')[1],
          networkId: 'no',
          rootDiskType: 'ssd',
          vpcId: 'no',
          diskType: 'ssd',
          diskSize: this.selectedSSD
        }
        // console.log(params)
        axios.get('information/deployVirtualMachine.do', {params}).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.$router.push({
              path: '/order'
            })
          } else {
            this.$message.info({
              content: response.data.message
            })
          }
        })
      },
    setTemplateHost (zoneId) {
      axios.get('information/listTemplates.do', {
        params: {
          zoneId: zoneId,
        }
      }).then(res => {
        if (res.status == 200 && res.data.status == 1) {
          var obj = this.cascaderSystemM(res.data.result, this.summarySystemList, this.selectSummarySystem)
          this.selectSummarySystem = obj
        }
      })
    },
    // 处理级联选择组件需要的数据格式
    cascaderSystemM (responseData, obj, selectobj) {
      var x;
      for (x in responseData) {
        obj.forEach(item => {
          if (item.value == x) {
            item.children = responseData[x]
          }
        })
      }
      obj.forEach(item => {
        item.children.forEach(item => {
          item.value = item.systemtemplateid
          item.label = item.templatename
        })
      })
      // 为空的系统不能点击
      obj.forEach((item, index) => {
        if (item.children.length == 0) {
          item.disabled = true
        }
      })
      selectobj = ['window', responseData.window[0].systemtemplateid]
      return selectobj
    },
    getTiket () {
      if (!this.$store.state.userInfo) {
        this.$LR({ type: 'register' })
        return
      }
      axios.get('ticket/getTicketForActivity.do', {
        params: {
          activityNum: 49
        }
      }).then(response => {
        if (response.status == 200 && response.data.status == 1) {
          this.$message.info({
            content: response.data.message
          })
        } else {
          this.$message.info({
            content: response.data.message
          })
        }
      })
    },
    roll(val) {
      $('html, body').animate({scrollTop: val}, 300)
    },
    enter(item,index){
      this.stepsList[index].isShow = false
    },
    leave(item,index){
      this.stepsList[index].isShow = true
    }
  },
  computed: {
    notAuth () {
      return (!this.$store.state.authInfo) || (this.$store.state.authInfo && this.$store.state.authInfo.authtype == 0 && this.$store.state.authInfo.checkstatus != 0) || (!this.$store.state.authInfoPersion && this.$store.state.authInfo && this.$store.state.authInfo.authtype == 1 && this.$store.state.authInfo.checkstatus != 0) || (this.$store.state.authInfoPersion && this.$store.state.authInfoPersion.checkstatus != 0 && this.$store.state.authInfo && this.$store.state.authInfo.checkstatus != 0)
    },
    disabled () {
      return !(this.form.loginname && this.form.password && this.form.vailCode && this.vailForm.loginname.warning == false)
    },
    authInfo () {
      return this.$store.state.authInfo ? this.$store.state.authInfo : null
    },
    authInfoPersion () {
      return this.$store.state.authInfoPersion
    },
    totalDataCost () {
      return this.vmCost + this.ipCost + this.dataDiskCost
    },
    totalDataCoupon () {
      return this.vmCoupon + this.ipCoupon + this.coupon
    },
  },
  watch: {
    'selectZone': {
      handler () {
        this.queryCustomVM()
        this.queryDiskPrice()
        this.queryIPPrice()
      },
      deep: true
    },
    'selectConfig': {
      handler () {
        this.queryCustomVM()
      },
      deep: true
    },
    'selectedSSD': {
      handler () {
        this.queryDiskPrice()
      },
      deep: true
    },
    'selectBandWidth': {
      handler () {
        this.queryIPPrice()
      },
      deep: true
    },
    // select组件，选中的值不在选项中，不清空选中数据的bug
    'configLength': {
      handler (val) {
        if(val==2) {
          this.single = '选择云服务器'
          let dom = this.$refs['summary-host-select']
          dom.getElementsByClassName('ivu-select-placeholder')[0].style.display = "block"
          dom.getElementsByClassName('ivu-select-selected-value')[0].style.display = "none"
        } else if(val==3){
          this.single = '选择GPU服务器'
          let dom = this.$refs['summary-host-select']
          dom.getElementsByClassName('ivu-select-placeholder')[0].style.display = "none"
          dom.getElementsByClassName('ivu-select-selected-value')[0].style.display = "block"
        }
      },
      deep: true
    },
    'single': {
      handler (val) {
        if (val == '选择云服务器') {
          this.changConfigHost('1,1')
        } else if(val == '选择GPU服务器'){
          this.changConfigGPU('8,64,1')
        }
      },
      deep: true
    }
  },
  components: {
    'vue-q-art': VueQArt
  },
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
.deposit-activity {
  font-family: MicrosoftYaHei;
  text-align: center;
}
.headline {
  padding: 40px 0;
  color: #0f0f68;
  h2 {
    font-size: 36px;
  }
  p {
    margin-top: 10px;
    font-size: 18px;
  }
}
.wrap {
  margin: 0 auto;
  width: 1180px;
}
section:nth-of-type(1) {
  background: linear-gradient(
    360deg,
    rgba(32, 73, 194, 1) 0%,
    rgba(55, 156, 240, 1) 100%
  );
}
.discount-icon {
  position: fixed;
  z-index: 100;
  top: 470px;
  right: 190px;
}
.free-host {
  margin: 0 auto;
  padding: 60px 0 40px;
  background: url("../../../assets/img/active/freeToReceive.1/free-host-bg.png")
      top no-repeat,
    url("../../../assets/img/active/freeToReceive.1/circle-left.png") left
      no-repeat,
    url("../../../assets/img/active/freeToReceive.1/circle-right.png") 100% 90%
      no-repeat;
  .steps{
    display: flex;
    margin-top: 40px;
    >div {
      position: relative;
      margin-left: -16px;
      cursor: pointer;
      &:nth-of-type(1) {
        margin-left: 0;
      }
    }
    .number {
      position: absolute;
      top: 6px;
      left: 60px;
    }
    span {
      position: absolute;
      top: 18px;
      left: 92px;
      font-size:20px;
      font-weight:bold;
      color:#191275;
    }
    .selctedStep {
      color: #fff
    }
  }
  .product {
    display: flex;
    justify-content: space-between;
    text-align: left;
    > div {
      width: 534px;
      box-shadow: 0px 3px 10px -3px rgba(45, 58, 91, 1);
      border-radius: 4px;
      &:nth-of-type(1) .head {
        background: url("../../../assets/img/active/freeToReceive.1/free-host-product-bg.png");
      }
      &:nth-of-type(2) .head {
        background: url("../../../assets/img/active/freeToReceive.1/free-host-product-bg1.png");
      }
    }
    .head {
      padding: 20px 30px;
      color: #fff;
      h3 {
        margin-bottom: 6px;
        font-size: 18px;
      }
      span {
        font-size: 14px;
      }
    }
    .body {
      padding: 24px 50px 30px 50px;
      background: #fff;
      > div {
        margin-bottom: 20px;
      }
      .label {
        display: inline-block;
        margin-right: 10px;
        width: 70px;
        font-size: 14px;
        color: #404040;
      }
      .configure {
        ul {
          display: flex;
          justify-content: space-between;
          li {
            i {
              margin-bottom: 10px;
              display: block;
              font-style: normal;
              color: #999999;
              font-size: 16px;
            }
            span {
              color: #333;
              font-size: 20px;
              span {
                font-size: 14px;
              }
            }
          }
        }
      }
      .area {
        display: flex;
        ul {
          display: flex;
          flex-wrap: wrap;
          width: 354px;
          li {
            width: 110px;
            height: 34px;
            margin-right: 12px;
            margin-bottom: 10px;
            line-height: 32px;
            border-radius: 2px;
            border: 1px solid rgba(125, 161, 217, 1);
            text-align: center;
            color: #4b3c3d;
            cursor: pointer;
            &:nth-child(3n + 3) {
              margin-right: 0;
            }
          }
          .selected {
            background: rgba(56, 125, 255, 1);
            color: #fff;
          }
        }
      }
      .price {
        color: #e6001b;
        font-size: 14px;
        span {
          font-size: 24px;
        }
      }
      .deposit {
        color: #666666;
        font-size: 14px;
        span {
          margin-left: 30px;
          color: #999999;
          font-size: 12px;
        }
      }
      button {
        width: 100%;
        background: #f66d59;
        border: none;
        // box-shadow: 0px 3px 10px -3px rgba(45, 58, 91, 1);
        border-radius: 4px;
        color: #fff;
        height: 40px;
        font-size: 18px;
      }
    }
  }
  .tips {
    margin-top: 20px;
    font-size: 16px;
    color: #fff;
    text-align: left;
    a {
      color: #53ffef;
    }
  }
  .fr-flow {
    text-align: center;
    width: 1344px;
    // margin: 0 auto;
    > p {
      font-family: "Microsoft YaHei", "微软雅黑";
      margin-top: 30px;
      font-size: 18px;
      color: rgba(255, 255, 255, 1);
    }
    .flow {
      display: flex;
      height: 120px;
      position: relative;
      .item {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 224px;
        height: 100%;
        position: relative;
        padding-left: 20px;
        &:nth-of-type(3) .item-text>p {
          width: 120px;
        }
        &.onStep {
          background: url("../../../assets/img/active/freeToReceive/fr-banner14.png");
        }
        &.outStep {
          background: url("../../../assets/img/active/freeToReceive/fr-banner17.png");
        }
        .item-img {
          margin-right: 10px;
        }
        .item-text {
          > p {
            width: 100px;
            overflow: hidden;
            line-height: 26px;
            font-size: 20px;
            font-family: MicrosoftYaHei-Bold;
            font-weight: bold;
            color: rgba(25, 18, 117, 1);
            text-align: left;
            &.onStep {
              color: rgba(255, 255, 255, 1);
            }
          }
        }
      }
      .item:first-child {
        padding-left: 0;
        &.onStep {
          background: url("../../../assets/img/active/freeToReceive/fr-banner13.png");
        }
        &.outStep {
          background: url("../../../assets/img/active/freeToReceive/fr-banner16.png");
        }
      }
      .item:last-child {
        &.onStep {
          background: url("../../../assets/img/active/freeToReceive/fr-banner15.png");
        }
        &.outStep {
          background: url("../../../assets/img/active/freeToReceive/fr-banner18.png");
        }
      }
    }
  }
}
.hot-host {
  padding: 40px 0;
  background: #fff;
  .product {
    display: flex;
    justify-content: space-between;
    text-align: left;
    background: #fff;
    > div {
      width: 277px;
      box-shadow: 0px 3px 10px -3px rgba(195, 205, 230, 0.7);
      border: 1px solid rgba(220, 226, 242, 1);
    }
    .head {
      padding: 15px 20px;
      color: #fff;
      background: url("../../../assets/img/active/freeToReceive.1/hot-host-product-bg.png");
      h3 {
        margin-bottom: 6px;
        font-size: 18px;
      }
      span {
        font-size: 14px;
      }
    }
    .body {
      padding: 15px 20px 20px 20px;
      background: #fff;
      &:nth-of-type(2) {
        padding-bottom: 0;
      }
      &:nth-of-type(3) {
        border-top: 1px solid rgba(220, 226, 242, 1);
      }
      > div {
        margin-bottom: 15px;
      }
      .label {
        display: block;
        margin-bottom: 8px;
        width: 70px;
        font-size: 14px;
        color: #222274;
      }
      .configure {
        ul {
          display: flex;
          justify-content: space-between;
          li {
            i {
              margin-bottom: 10px;
              display: block;
              font-style: normal;
              color: #0f0f68;
              font-size: 12px;
            }
            span {
              color: #0f0f68;
              font-size: 18px;
              span {
                font-size: 14px;
              }
            }
          }
        }
      }
      .time {
        ul {
          display: flex;
          flex-wrap: wrap;
          width: 354px;
          li {
            position: relative;
            width: 110px;
            height: 34px;
            margin-right: 12px;
            margin-bottom: 10px;
            line-height: 32px;
            border-radius: 2px;
            border: 1px solid rgba(125, 161, 217, 1);
            text-align: center;
            color: #4b3c3d;
            cursor: pointer;
            &:nth-child(3n + 3) {
              margin-right: 0;
            }
            span {
              position: absolute;
              top: -14px;
              right: 5px;
              display: inline-block;
              width:38px;
              height:20px;
              background:rgba(246,109,89,1);
              font-size:14px;
              color:rgba(255,255,255,1);
              line-height:19px;
            }
          }
          .selected {
            background: rgba(56, 125, 255, 1);
            color: #fff;
          }
        }
      }
      .price {
        color: #e70520;
        font-size: 12px;
        span {
          font-size: 24px;
          font-weight: bold;
        }
      }
      .origin-price {
        font-size: 12px;
        color: #0f0f68;
        text-decoration: line-through;
      }
      button {
        width: 100%;
        background: #f66d59;
        border: none;
        border-radius: 0px;
        color: #fff;
        height: 40px;
        font-size: 18px;
      }
    }
  }
  .tips {
    margin-top: 20px;
    text-align: left;
    font-size: 14px;
    color: rgba(31, 31, 114, 1);
  }
}
.summary-host {
  height: 839px;
  background: #f2f8ff
    url("../../../assets/img/active/freeToReceive.1/summary-host-bg.png") center
    no-repeat;
  .product {
    display: flex;
    text-align: left;
    > div {
      width: 1120px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 6px 20px -6px rgba(13, 48, 130, 0.49);
      border-radius: 8px;
    }
    .head {
      padding: 15px 20px;
      color: #fff;
      background: url("../../../assets/img/active/freeToReceive.1/summary-product-bg.png")
        no-repeat;
      // background-size: cover;
      h3 {
        margin-bottom: 6px;
        font-size: 18px;
      }
      span {
        font-size: 14px;
      }
    }
    .body {
      padding: 0 40px;
      background: #fff;
      display: flex;
      justify-content: space-between;
      .label {
        display: block;
        margin-bottom: 20px;
        font-size: 18px;
        color: #4768b1;
      }
      .left {
        padding-top: 40px;
        > div {
          margin-bottom: 40px;
        }
      }
      .right {
        padding-top: 20px;
        padding-bottom: 30px;
        > div {
          margin-bottom: 20px;
        }
      }
      .configure,
      .area,
      .ssd {
        ul {
          display: flex;
          flex-wrap: wrap;
          width: 476px;
          li {
            width: 110px;
            height: 34px;
            margin-right: 12px;
            margin-bottom: 20px;
            line-height: 32px;
            border-radius: 2px;
            border: 1px solid rgba(125, 161, 217, 1);
            text-align: center;
            color: #4b3c3d;
            cursor: pointer;
            font-size: 14px;
          }
          .selected {
            background: #387dff;
            color: #fff;
          }
        }
      }
      .configure,
      .area {
        ul {
          li {
            &:nth-child(4n) {
              margin-right: 0;
            }
          }
        }
      }
      .configure {
        .tips {
          color: #4768b1;
          font-size: 14px;
        }
      }
      .ssd {
        ul {
          li {
            margin-bottom: 0;
            width: 74px;
            &:nth-child(5n) {
              margin-right: 0;
            }
          }
        }
      }
      .price {
        color: #e70520;
        font-size: 14px;
        span {
          font-size: 24px;
          font-weight: bold;
        }
      }
      button {
        width: 100%;
        background: #f66d59;
        border-radius: 4px;
        border: none;
        color: #fff;
        height: 40px;
        font-size: 18px;
      }
    }
  }
}
.coupon {
  padding: 40px 0 80px;
  background: #fff;
  .product {
    display: flex;
    justify-content: space-between;
    background: #fff;
    margin-bottom: 30px;
    > div {
      width: 578px;
      box-shadow: 0px 3px 10px -3px rgba(237, 190, 175, 0.7);
      &:nth-of-type(2) .head{
        background: url("../../../assets/img/active/freeToReceive.1/coupon-database-bg.png");
      }
    }
    .head {
      padding: 55px 0;
      height: 152px;
      font-size: 32px;
      color: rgba(53, 14, 3, 1);
      background: url("../../../assets/img/active/freeToReceive.1/coupon-obj-bg.png");
      h3 {
        font-weight: normal;
        font-size: 32px;
      }
      span {
        font-weight: bold;
      }
    }
    button {
      margin: 15px 0;
      width: 160px;
      background: #f66d59;
      border-radius: 3px;
      border: none;
      color: #fff;
      height: 40px;
      font-size: 18px;
    }
  }
  .coupons {
    .box {
      display: flex;
      justify-content: space-between;
      color: #fff;
      > div {
        width: 291px;
        height: 166px;
        background: url("../../../assets/img/active/freeToReceive.1/coupon-bg.png");
        .head {
          height: 100px;
          padding: 40px 37px 12px;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          span {
            font-size: 20px;
            i {
              font-size: 72px;
              font-style: normal;
            }
          }
          .full-cut {
            margin-bottom: 10px;
            font-size: 32px;
            i {
              font-size: 32px;
              font-weight: bold;
            }
          }
        }
        > span {
          display: inline-block;
          padding-top: 10px;
          font-size: 20px;
        }
      }
    }
  }
  button {
    margin-top: 10px;
    width: 160px;
    background: #e55965;
    border-radius: 3px;
    border: none;
    color: #fff;
    height: 40px;
    font-size: 18px;
  }
}
.shipmodel {
  background: url("../../../assets/img/active/freeToReceive/fr-welcome.png")
    no-repeat;
  width: 400px;
  height: 220px;
  position: relative;
  margin: 0 auto;
  cursor: pointer;
  top: 33%;
  .header {
    background: none;
    > img {
      position: absolute;
      right: 10px;
      top: 10px;
      cursor: pointer;
    }
  }
}
// 弹窗公共样式
.overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(55, 55, 55, 0.3);
  height: 100%;
  z-index: 1000;
  > div {
    position: relative;
    margin: 0 auto;
    top: 15%;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    font-size: 14px;
  }
}
.rule-modal {
  width: 680px;
  .header {
    height: 66px;
    padding-top: 20px;
    padding-right: 30px;
    font-size: 20px;
    color: rgba(31, 31, 114, 1);
    span {
      margin-left: 20px;
    }
    img {
      float: right;
      cursor: pointer;
    }
  }
  .body {
    padding: 30px;
    padding-top: 0;
    text-align: left;
    font-size: 14px;
    color: rgba(31, 31, 114, 1);
    p {
      margin-bottom: 10px;
      line-height: 19px;
    }
    dl {
      margin-bottom: 10px;
      dd {
        line-height: 19px;
      }
    }
  }
  .footer {
    height: 60px;
    padding-top: 18px;
    background: rgba(242, 248, 255, 1);
    font-size: 18px;
    color: rgba(31, 31, 114, 1);
    span {
      cursor: pointer;
    }
  }
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
</style>
