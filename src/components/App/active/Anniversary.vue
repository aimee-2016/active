<template>
  <div class="anniversary">
    <div class="an-lf">
      <div class="an-sm">
        <span>活动导航</span>
      </div>
      <aside class="an-aside">
        <ul>
          <li
            v-for="(item,index) in asideList"
            :key="index"
            :class="{'checked':rollIndex == index}"
            @click="roll(item.height),rollIndex = index"
          >{{item.text}}</li>
        </ul>
        <div class="to-top" @click="roll(0)">回到顶部</div>
      </aside>
    </div>
    <section class="banner">
      <img
        src="../../../assets/img/active/anniversary/aa-banner-m.png"
        alt="banner"
        class="mobile-640 banner-m"
      />
      <div class="wrap pc-640">
        <div class="container">
          <div class="text">
            <img
              src="../../../assets/img/active/anniversary/anniversary-banner-title.png"
              alt="2周年庆典"
            />
            <img
              src="../../../assets/img/active/anniversary/anniversary-banner-text.png"
              alt="企业上云突破5万，回馈老用户"
            />
          </div>
          <div class="center-banner">
            <img src="../../../assets/img/active/anniversary/aa-ac-banner.png" alt="banner">
          </div>
          <div class="menu">
            <div class="content">
              <a v-for="(item,index) in bannerNavList" :key="index" @click="goAnchor('#'+item.href)">
                <div>
                  <p>{{item.title}}</p>
                  <span v-if="item.text">{{item.text}}</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div class="wrap">
        <div class="new-user">
          <span class="left">
            <img
              src="../../../assets/img/active/anniversary/anniversary-newuser-text.png"
              alt="邀新福利"
            />
            <img
              src="../../../assets/img/active/anniversary/anniversary-newuser-img.png"
              alt="邀新福利图片"
              class="ml10"
            />
          </span>
          <span class="desc">老用户邀请新用户成功购买以下任1款商品（域名除外），即可获得“爆款秒杀专区”或“企业用户限购专区”的额外购买权1次。</span>
          <span class="btn pc-640-inline" @click="shareNew('p')">邀请新用户</span>
          <span class="btn mobile-640-inline" @click="shareNew('m')">邀请新用户</span>
        </div>
        <div class="seckill" id="seckill">
          <header class="sub-head">
            <h2>爆款秒杀专区</h2>
            <p>
              爆款云产品，邀新送好礼
              <span @click="showModal.ruleKill=true">活动规则></span>
            </p>
          </header>
          <div class="container">
            <div class="item" v-for="(item,index) in seckillList" :key="index">
              <header>{{titleType(item.servicetype)}}</header>
              <div class="content">
                <div class="middle">
                  <ul class="configure" v-if="item.servicetype!='oss'">
                    <li>
                      <i>CPU</i>
                      <span>{{item.cpu}}核</span>
                    </li>
                    <li>
                      <i>内存</i>
                      <span>{{item.mem}}G</span>
                    </li>
                    <li>
                      <i>带宽</i>
                      <span>{{item.bandwith}}M</span>
                    </li>
                    <li>
                      <i>系统盘</i>
                      <span>{{item.disksize}}G SSD</span>
                    </li>
                  </ul>
                  <div class="center aa-system" :class="{pt16:item.servicetype=='G5500'}">
                    <div
                      class="row-yellow lh1"
                      :class="{mb10:item.servicetype=='G5500'}"
                      v-if="item.servicetype=='G5500'"
                    >GPU：Tesla P{{item.gpu}}</div>
                    <div
                      class="row-yellow"
                      v-if="item.servicetype=='oss'"
                    >存储规格：{{item.capacityDesc}}</div>
                    <div
                      class="row-yellow"
                      v-if="item.servicetype=='oss'"
                    >下载流量：{{item.flowpackageDesc}}</div>
                    <div :class="{mb10:item.servicetype=='G5500'}">
                      <span class="label">区域：</span>
                      <Select v-model="item.zone" class="w" @on-change="changeZoneSeckill(item)">
                        <Option
                          v-for="(item,index) in item.zoneList"
                          :value="item.value"
                          :key="index"
                        >{{ item.name }}</Option>
                      </Select>
                    </div>
                    <div v-if="item.servicetype!='oss'" :class="{mb10:item.servicetype=='G5500'}">
                      <span class="label">系统：</span>
                      <Cascader :data="item.systemList" v-model="item.system" class="w"></Cascader>
                    </div>
                  </div>
                </div>

                <div class="price">
                  <p>
                    <i>￥</i>
                    {{item.cost}}
                    <i>/{{formatDay(item.days)}}</i>
                  </p>
                  <span>原价：￥{{item.originalPrice}}/{{formatDay(item.days)}}</span>
                </div>
                <span class="btn pc-640-inline" @click="orderSeckill(item,'p')">立即抢购</span>
                <span class="btn mobile-640-inline" @click="orderSeckill(item,'m')">立即抢购</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div class="wrap">
        <div class="enterprise" id="enterprise">
          <header class="sub-head">
            <h2>企业用户限购专区</h2>
            <p>
              企业限购专区，老用户享同等价购买
              <span @click="showModal.ruleE=true">活动规则></span>
            </p>
          </header>
          <div class="container">
            <div class="item" v-for="(item,index) in enterpriseList" :key="index">
              <div class="left">
                <p>{{item.cpu+'核'+item.mem+'G '+item.bandwith+'M带宽'}}</p>
                <span>{{item.disksize+'G '+item.disktype.toUpperCase()+'盘'}}</span>
              </div>
              <div class="content aa-system-2">
                <ul class="center">
                  <li class="aa-system-1">
                    <span class="label">区域</span>
                    <Select v-model="item.zone" class="w150" @on-change="changeZoneSeckill(item)">
                      <Option
                        v-for="(item,index) in item.zoneList"
                        :value="item.value"
                        :key="index"
                      >{{ item.name }}</Option>
                    </Select>
                  </li>
                  <li class="aa-system-1">
                    <span class="label">系统</span>
                    <Cascader :data="item.systemList" v-model="item.system" style="w230"></Cascader>
                  </li>
                  <li class="aa-system-1">
                    <span class="label">可选时长</span>
                    <div class="time">
                      <span
                        v-for="(inner,index) in item.timeList"
                        :key="index"
                        @click="changeTimeE(item,inner,index)"
                        :class="{'selected':inner.days == item.days}"
                      >
                        {{inner.days/360}}年
                        <i>{{(inner.discount*10).toFixed(1)}}折</i>
                      </span>
                    </div>
                  </li>
                </ul>
                <div class="right">
                  <div class="price">
                    <p class="cost">
                      <i>￥</i>
                      <span>{{item.cost}}</span>
                    </p>
                    <span class="origin-cost">原价：￥{{item.originalPrice}}</span>
                  </div>
                  <span class="btn pc-640-inline" @click="orderSeckill(item,'p')">立即抢购</span>
                  <span class="btn mobile-640-inline" @click="orderSeckill(item,'m')">立即抢购</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="enterprise" id="database">
          <header class="sub-head">
            <h2>云数据库限购专区</h2>
            <p>
              数据库现时抢购
              <span @click="showModal.ruleDB=true">活动规则></span>
            </p>
          </header>
          <div class="container">
            <div class="item" v-for="(item,index) in databaseList" :key="index">
              <div class="left">
                <p>{{item.key}}</p>
                <span>{{item.rootDiskSize+'G系统盘 '+item.dataDiskSize+'G数据盘'}}</span>
              </div>
              <div class="content aa-system-2">
                <ul class="center">
                  <li class="aa-system-1">
                    <span class="label">可选规格</span>
                    <Select v-model="item.specs" class="w120" @on-change="changeConfig(item)">
                      <Option
                        v-for="(inner,index) in item.specsList"
                        :value="inner.cpu+'#'+inner.mem"
                        :key="index"
                      >{{ inner.cpu+'核'+inner.mem+'G' }}</Option>
                    </Select>
                  </li>
                  <li class="aa-system-1">
                    <span class="label">可选带宽</span>
                    <Select v-model="item.bandwith" class="w100" @on-change="changeBandwith(item)">
                      <Option
                        v-for="inner in item.bandwithList"
                        :value="inner.bandwith"
                        :key="inner.bandwith"
                      >{{ inner.bandwith}}M</Option>
                    </Select>
                  </li>
                  <li class="aa-system-1">
                    <span class="label">可选区域</span>
                    <Select v-model="item.zone" class="w140" @on-change="changeZoneDB(item)">
                      <Option
                        v-for="(inner,index2) in item.zoneList"
                        :value="inner.value"
                        :key="index2"
                      >{{ inner.name }}</Option>
                    </Select>
                  </li>
                  <li class="aa-system-1" style="margin-right:30px;">
                    <span class="label">可选时长</span>
                    <div class="time">
                      <span
                        v-for="(inner,index) in item.timeList"
                        :key="index"
                        @click="changeTimeD(item,inner)"
                        :class="{'selected':inner.days === item.days&&inner.discount === item.discount}"
                      >
                        {{inner.days<360?inner.days/30+'月':inner.days/360+'年'}}
                        <i>{{inner.discount}}折</i>
                      </span>
                    </div>
                  </li>
                </ul>
                <div class="right">
                  <div class="price" style="width:156px">
                    <p class="cost">
                      <i>￥</i>
                      <span>{{item.cost}}</span>
                    </p>
                    <span class="origin-cost">原价：￥{{item.originalPrice}}</span>
                  </div>
                  <span class="btn pc-640-inline" @click="orderDB(item,'p')">立即抢购</span>
                  <span class="btn mobile-640-inline" @click="orderDB(item,'m')">立即抢购</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div class="wrap">
        <div class="domain" id="domain">
          <header class="sub-head">
            <h2>域名专区</h2>
          </header>
          <div class="container">
            <div class="item" v-for="(item,index) in domainList" :key="index">
              <header>
                <h3>{{item.name}} 域名</h3>
                <div class="input-group">
                  <input
                    v-model="item.value"
                    type="text"
                    placeholder="Enter something..."
                    style="width: 230px;height:30px"
                  />
                  <img
                    src="../../../assets/img/active/anniversary/search-icon.png"
                    alt="搜索图标"
                    @click="checkDomain(item)"
                  />
                </div>
                <span class="tip">{{item.tip}}</span>
              </header>
              <div class="content">
                <div class="price">
                  ¥{{item.price}}
                  <span>/{{item.unit}}年</span>
                </div>
                <span class="btn pc-640" @click="buyDomain('p',item)">立即购买</span>
                <span class="btn mobile-640" @click="buyDomain('m',item)">立即购买</span>
              </div>
            </div>
          </div>
        </div>
        <div class="renew" id="renew">
          <header class="sub-head">
            <h2>续费专区</h2>
            <p>
              老用户续费折扣享不停
              <span @click="showModal.ruleRenew=true">活动规则></span>
            </p>
          </header>
          <div class="container">
            <div class="item" v-for="(item,index) in renewList" :key="index">
              <img
                src="../../../assets/img/active/anniversary/anniversary-renew-bg.png"
                alt="续费背景图"
              />
              <div class="box">
                <div class="top">
                  <div class="p">
                    <div class="discount">
                      <p>
                        <span>{{item.moneyDesc}}</span>
                        <i>折</i>
                      </p>
                      <span>年续费券</span>
                    </div>
                    <span class="btn pc-640-inline" @click="toRenew(item.id,'p')">立即领取</span>
                    <span class="btn mobile-640-inline" @click="toRenew(item.id,'m')">立即领取</span>
                  </div>
                </div>
                <div class="text">
                  <span>新睿云11.17周年庆回馈老用户</span>
                  <p>
                    云产品年续费一律
                    <span>{{item.moneyDesc}}折</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Modal
      v-model="showModal.share"
      width="550"
      class="aa-modal"
      title="邀请新用户"
      :mask-closable="false"
    >
      <div class="share-modal">
        <p>邀请新用户，获取“秒杀专区”和“企业限购专区”购买权</p>
        <div class="wrapper">
          <div class="qr-code">
            <vue-q-art :config="qrConfig"></vue-q-art>
            <span>扫码分享</span>
          </div>
          <div class="url">
            <p class="btn" @click="copyUrl('p')">
              <img src="../../../assets/img/active/anniversary/aa-url-icon.png" alt="分享图标" />
              复制链接
            </p>
            <input
              ref="copy_content"
              type="text"
              value
              style="position: absolute;top: 0;left: 0;opacity: 0;z-index: -10;"
            />
            <span>链接分享</span>
          </div>
        </div>
      </div>
      <div slot="footer"></div>
    </Modal>
    <Modal
      v-model="showModal.ruleKill"
      width="550"
      class="aa-modal rule"
      title="活动规则"
      :mask-closable="false"
      :scrollable="true"
    >
      <div class="content">
        <ul>
          <li v-for="(item,index) in ruleListKill" :key="index">{{item}}</li>
        </ul>
      </div>
      <div slot="footer" class="footer">
        <span class="btn" @click="showModal.ruleKill=false">我知道了</span>
      </div>
    </Modal>
    <Modal
      v-model="showModal.ruleE"
      width="550"
      class="aa-modal rule"
      title="活动规则"
      :mask-closable="false"
      :scrollable="true"
    >
      <div class="content">
        <ul>
          <li v-for="(item,index) in ruleListE" :key="index">{{item}}</li>
        </ul>
      </div>
      <div slot="footer" class="footer">
        <span class="btn" @click="showModal.ruleE=false">我知道了</span>
      </div>
    </Modal>
    <Modal
      v-model="showModal.ruleDB"
      width="550"
      class="aa-modal rule"
      title="活动规则"
      :mask-closable="false"
      :scrollable="true"
    >
      <div class="content">
        <ul>
          <li v-for="(item,index) in ruleListDB" :key="index">{{item}}</li>
        </ul>
      </div>
      <div slot="footer" class="footer">
        <span class="btn" @click="showModal.ruleDB=false">我知道了</span>
      </div>
    </Modal>
    <Modal
      v-model="showModal.ruleRenew"
      width="550"
      class="aa-modal rule"
      title="活动规则"
      :mask-closable="false"
      :scrollable="true"
    >
      <div class="content">
        <ul>
          <li v-for="(item,index) in ruleListRenew" :key="index">{{item}}</li>
        </ul>
      </div>
      <div slot="footer" class="footer">
        <span class="btn" @click="showModal.ruleRenew=false">我知道了</span>
      </div>
    </Modal>
    <!-- 续费提示弹窗 -->
    <Modal
      v-model="showModal.renewHint"
      width="400"
      class="aa-modal hint"
      title="温馨提示"
      :mask-closable="false"
      :scrollable="true"
    >
      <div class="content" v-html="domainText"></div>
      <div slot="footer" class="footer">
        <a class="btn" v-if="renewStatus==1" href="https://csi.xrcloud.net/renew">立即续费</a>
        <span class="btn" v-else @click="showModal.renewHint=false">我知道了</span>
      </div>
    </Modal>
    <!-- 公共提示弹窗 -->
    <Modal
      v-model="showModal.hint"
      width="400"
      class="aa-modal hint"
      title="温馨提示"
      :mask-closable="false"
      :scrollable="true"
    >
      <div class="content" v-html="hintText"></div>
      <div slot="footer" class="footer">
        <span class="btn" @click="showModal.hint=false">确认</span>
      </div>
    </Modal>
    <!-- 身份验证弹窗 -->
    <Modal
      v-model="showModal.cashverification"
      :scrollable="true"
      :closable="true"
      :width="520"
      :mask-closable="false"
      class="person-check"
    >
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">身份验证</span>
      </p>
      <div class="modal-content-s">
        <div>
          <p
            class="lh24"
            style="font-size:14px;font-family:MicrosoftYaHei;color:rgba(51,51,51,1);line-height:24px;"
          >为保障您的账户安全，请进行手机验证：</p>
        </div>
      </div>
      <div class="modal-content-s">
        <Form
          ref="cashverification"
          label-position="left"
          :model="formCustom"
          :rules="ruleCustom"
          style="width: 500px;"
        >
          <FormItem prop="VerificationPhone">
            <Input v-model="formCustom.VerificationPhone" placeholder="请输入手机号码" class="w300"></Input>
          </FormItem>
          <FormItem prop="Verificationcode">
            <Input v-model="formCustom.Verificationcode" placeholder="请输入随机验证码" class="w300"></Input>
            <img
              :src="imgSrc"
              @click="imgSrc=`user/getKaptchaImage.do?t=${new Date().getTime()}`"
              style="height:32px;vertical-align: middle;margin-left: 10px;"
            />
          </FormItem>
          <FormItem prop="messagecode">
            <Input v-model="formCustom.messagecode" placeholder="请输入收到的验证码" class="w300"></Input>
            <Button
              type="primary"
              @click="getPhoneCode('code')"
              :disabled="formCustom.newCodeText !='获取验证码'"
              style="margin-left: 10px;"
            >{{formCustom.newCodeText}}</Button>
          </FormItem>
        </Form>
      </div>
      <div class="modal-content-s divall">
        <div
          style="width: 91%;margin-left: 4%;margin-top: 10px;font-size: 14px;margin-bottom: 20px;"
        >
          <p style="float: left;line-height:24px;">没有收到验证码？</p>
          <br />
          <p style="line-height:24px;">
            1、网络异常可能会造成短信丢失，请
            <span
              class="spanaa"
              :class="{notallow:formCustom.newCodeText !='获取验证码'}"
              @click="getPhoneCode('againCode')"
            >重新获取</span>或
            <span
              class="spanaa"
              :class="{notallow:formCustom.newCodeText !='获取验证码'}"
              @click.prevent="getPhoneCode('voice')"
            >接收语音验证码</span>。
          </p>
          <p v-if="authInfo&&authInfo.checkstatus==0" style="line-height:24px;">
            2、如果手机已丢失或停机，请
            <span
              class="spanaa"
              @click="showModal.modifyPhoneID = true;showModal.cashverification=false"
            >通过身份证号码验证</span>或
            <a href="https://csi.xrcloud.net/work">提交工单</a>更改手机号。
          </p>
          <p v-if="!authInfo||authInfo&&authInfo.checkstatus!=0" style="line-height:24px;">
            2、如果手机已丢失或停机，请
            <a href="https://csi.xrcloud.net/work">提交工单</a>或
            <a
              target="_blank"
              :href="`tencent://message/?uin=${$store.state.qq.qqnumber}&amp;Site=www.cloudsoar.com&amp;Menu=yes`"
              class="spanaa"
              style="font-size: 13px;"
            >联系客服</a>更改手机号。
          </p>
        </div>
      </div>
      <p slot="footer" class="modal-footer-s">
        <Button @click="showModal.cashverification = false">取消</Button>
        <Button type="primary" :disabled="disabled" @click="Callpresentation">确定</Button>
      </p>
    </Modal>
    <!-- 人脸识别二维码弹出框 -->
    <Modal
      v-model="showModal.qrCode"
      width="550"
      :scrollable="true"
      :mask-closable="false"
      :closable="false"
    >
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">扫码认证</span>
      </p>
      <div class="universal-modal-content-flex qrcode-modal">
        <p class="p-top">认证完成之前，请勿关闭或者切换此页面，否则可能导致认证失败</p>
        <p>请使用手机扫描二维码，并根据提示完成实名认证</p>
        <p v-show="authStatus" class="p-top">您的实名认证提交失败，请刷新二维码重新认证</p>
        <div class="qr-code">
          <vue-q-art :config="qrConfig"></vue-q-art>
          <div
            class="shade"
            :class="{scanSuccess: codeLoseEfficacy=== 'scanSuccess'}"
            v-show="codeLoseEfficacy"
          ></div>
        </div>
        <p class="p-bottom">
          若二维码失效或异常，请
          <span @click="refreshQRCode">刷新</span>
        </p>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="primary" @click="qrcodeClose">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
import axios from 'axios'
import VueQArt from 'vue-qart'
import throttle from 'throttle-debounce/debounce'
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
    return {
      showModal: {
        share: false,
        ruleKill: false,
        ruleE: false,
        ruleDB: false,
        ruleRenew: false,
        cashverification: false,
        qrCode: false,
        renewHint: false,
        hint: false
      },
      hintText: '',
      asideList: [
        { text: '爆款秒杀', height: 850 },
        { text: '企业限购', height: 1500 },
        { text: '云数据库', height: 2100 },
        { text: '域名专区', height: 3000 },
        { text: '续费专区', height: 3500 }
      ],
      bannerNavList: [
        { title: '爆款云产品', text: '邀新送好礼', href: 'seckill' },
        { title: '企业限购专区', text: '老用户享同等价购买', href: 'enterprise' },
        { title: '云数据库限时抢购', text: '', href: 'database' },
        { title: '域名最低8元可领', text: '', href: 'domain' },
        { title: '老用户续费', text: '折扣享不停', href: 'renew' }
      ],
      valueDomain: '',
      seckillList: [],
      enterpriseList: [],
      databaseList: [],
      ruleListKill: [
        '1、活动时间：2019.11.13-2019.12.18',
        '2、活动对象：新老用户皆可参与；新用户是未使用过平台资源（第三方产品除外）及未参加过其他免费活动并已通过实名认证的用户',
        '3、活动期间同一用户（同一手机、邮箱、实名认证用户视为同一用户）可同时购买GPU服务器1次、对象存储1次',
        '4、新用户可直接购买任意一台爆款云服务器，购买成功后再邀请1名新用户成功购买周年庆活动产品（域名除外）即可获得“爆款秒杀专区”或“企业用户限购专区”的额外购买权1次；老用户成功邀请1名新用户购买周年庆活动产品，即可获得“爆款秒杀专区”或“企业用户限购专区”的额外购买权1次，购买权可叠加；',
        '5、参与本次活动购买的产品不能进行退款。',
        '6、此次活动产品不能用于转售，如若利用资源从事违法违规行为的用户，新睿云有权收回使用资格，并且不予退款。',
        '7、购买时不可使用任何优惠券和现金券，秒杀活动不支持会员折扣。',
        '8、活动最终解释权为新睿云所有。'
      ],
      ruleListE: [
        '1、活动时间：2019.11.13-2019.12.18',
        '2、活动对象：活动期间企业用户限购1台，新老用户皆可参与。新用户是未使用过平台资源（第三方产品除外）及未参加过其他免费活动并已通过实名认证的用户',
        '3、企业用户可直接购买任意一台爆款云服务器，购买成功后再邀请1名新用户成功购买周年庆活动产品（域名除外）即可获得“爆款秒杀专区”或“企业用户限购专区”的额外购买权1次，购买权可叠加；',
        '4、参与本次活动购买的产品不能进行退款。',
        '5、此次活动产品不能用于转售，如若利用资源从事违法违规行为的用户，新睿云有权收回使用资格，并且不予退款。',
        '6、购买时不可使用任何优惠券和现金券，限购活动不支持会员折扣。',
        '7、活动最终解释权为新睿云所有。'
      ],
      ruleListDB: [
        '1、活动时间：2019.11.13-2019.12.18，每天7点至23.17点开抢。',
        '2、活动对象：新老用户皆可参与。新用户是未使用过平台资源（第三方产品除外）及未参加过其他免费活动并已通过实名认证的用户',
        '3、数量限制：活动期间同一用户（同一手机、邮箱、实名认证用户视为同一用户）按照不同的配置进行抢购，同配置产品可以同时购买不同时长，但每款配置同一时长只能购买一次。数量有限，先到先得。',
        '4、参与本次活动购买的产品不能进行退款。',
        '5、此次活动产品不能用于转售，如若利用资源从事违法违规行为的用户，新睿云有权收回使用资格，并且不予退款。',
        '6、购买时不可使用任何优惠券和现金券，限购活动不支持会员折扣。',
        '7、活动最终解释权为新睿云所有。'
      ],
      ruleListRenew: [
        '1、年续费券同一用户（同一手机、邮箱、实名认证用户视为同一用户）限领1张，有效期为1年',
        '2、仅限有购买过云产品记录的用户领取',
        '3、1.17折续费券不能与其他优惠券和现金券叠加使用，每次只能使用1张',
        '4、1.17折续费券只能在原价的基础上进行打折，不能与其他折扣重叠',
        '5、1.17折续费券不能用于域名、SSL证书和高防IP的续费',
        '6、此次活动券仅用于支付新睿云平台订单支付时，抵减应支付的订单金额，不能进行兑现或其他用途。'
      ],
      qrConfig: {
        value: '',
        imagePath: require('../../../assets/img/active/anniversary/qrCode.png'),
        filter: 'black',
        size: 500
      },
      shareUrl: '',
      domainList: [
        { name: '.club', price: '11.00', unit: '1', bg: require('../../../assets/img/active/anniversary/anniversary-domain-1.png'), value: '', tip: '' },
        { name: '.top', price: '9.00', unit: '1', bg: require('../../../assets/img/active/anniversary/anniversary-domain-2.png'), value: '', tip: '' },
        { name: '.site', price: '8.00', unit: '1', bg: require('../../../assets/img/active/anniversary/anniversary-domain-3.png'), value: '', tip: '' }
      ],
      domainText: '',
      domainVail: false,
      renewList: [],
      renewStatus: '',
      // 实名认证参数
      regExpObj: {
        phone: /^1[3|4|5|8|9|6|7]\d{9}$/,
        email: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
        password: /(?!(^[^a-z]+$))(?!(^[^A-Z]+$))(?!(^[^\d]+$))^[\w`~!#$%_()^&*,-<>?@.+=]{8,32}$/
      },
      codeLoseEfficacy: '',
      tempCode: '',
      codeTimer: null,
      authStatus: false,
      imgSrc: 'https://csactivity.xrcloud.net/user/getKaptchaImage.do',
      formCustom: {
        VerificationPhone: '',
        Verificationcode: '',
        messagecode: '',
        newCodeText: '获取验证码',
        codeText: '获取验证码',
      },
      ruleCustom: {
        VerificationPhone: [{
          required: true,
          validator: validaRegisteredPhone,
          trigger: 'blur'
        }],
        Verificationcode: [{
          required: true,
          message: '请输入图形验证码',
          trigger: 'blur'
        }],
        messagecode: [{
          required: true,
          message: '请输入收到的验证码',
          trigger: 'blur'
        }]
      },
      rollIndex: 0
      // 实名认证参数结束
    }
  },
  created () {
    this.getSeckill()
    this.getEnterprise()
    this.getDatabase()
    // this.getDomain()
    this.getRenew()
    if (document.URL.indexOf('?') > -1) {
      let ddd = document.URL.substring(document.URL.indexOf('?') + 1, document.URL.length);
      var date = new Date();
      date.setTime(date.getTime() + 86400000);
      document.cookie = 'anniver=' + ddd.split('=')[1] + ';expires=' + date.toUTCString() + ';domain=.xrcloud.net;path=/'
    }
  },
  mounted () {
    let asideList = this.asideList;
    window.addEventListener('scroll',()=>{
        if (document.documentElement.scrollTop > asideList[this.rollIndex].height  && this.rollIndex != asideList.length-1) {
          this.rollIndex ++;
        }
        if(document.documentElement.scrollTop < asideList[this.rollIndex].height && this.rollIndex != 0){
          this.rollIndex --;
        }
        if(document.documentElement.scrollTop > asideList[asideList.length-1].height){
          this.rollIndex = asideList.length-1;
        } 
    },true)
  },
  methods: {
    //活动编码 秒杀64 企业65 云数据库 域名
    getSeckill () {
      axios.get('activity/getTemActInfoById.do', {
        params: {
          activityNum: 64
        }
      }).then(response => {
        if (response.status == 200 && response.data.status == 1) {
          this.seckillList = response.data.result.freevmconfigs
          this.seckillList.forEach((item, index) => {
            switch (item.servicetype) {
              case 'host':
                item.zoneList = response.data.result.optionalArea
                item.zone = item.zoneList[0].value
                this.$set(item, 'systemList', this.formatSystem(response.data.result.mvTem))
                this.$set(item, 'system', [item.systemList[0].label, item.systemList[0].children[0].value])
                break;
              case 'G5500':
                item.zoneList = response.data.result.optionalAreaGpu
                item.zone = item.zoneList[0].value
                this.$set(item, 'systemList', this.formatSystem(response.data.result.gpuTem))
                this.$set(item, 'system', [item.systemList[0].label, item.systemList[0].children[0].value])
                break;
              case 'oss':
                item.zoneList = response.data.result.zoneListMapOss
                item.zone = item.zoneList[0].value
                break;
              default:
                break;
            }
          })
          // console.log(this.seckillList)
        }
      })
    },
    changeZoneSeckill (item) {
      if (item.servicetype == 'oss') {
        this.getPriceOSS(item)
      } else {
        this.getHostSystem(item)
        this.getPriceHost(item)
      }
    },
    getHostSystem (item) {
      let params = {}
      let url = ''
      switch (item.servicetype) {
        case 'host':
          params = {
            user: '0',
            normalTemplate: '1',
            zoneId: item.zone,
          }
          url = 'information/listTemplates.do'
          break
        case 'G5500':
          params = {
            user: '0',
            gpu: '1',
            normalTemplate: '0',
            zoneId: item.zone,
          }
          url = 'information/listTemplates.do'
          break
      }
      axios.get(url, {
        params: params
      }).then(response => {
        if (response.status == 200 && response.data.status == 1) {
          item.systemList = this.formatSystem(response.data.result)
          item.system = [item.systemList[0].label, item.systemList[0].children[0].value]
        }
      })
    },
    getPriceOSS (item) {
      let url = 'activity/getOssOriginalPrice.do'
      let params = {
        flowPackage: item.flowpackage,
        capacity: item.capacity,
        timeType: item.days < 360 ? 'month' : 'year',
        timeValue: item.days < 360 ? item.days / 30 : item.days / 360,
      }
      axios.post(url, params).then(response => {
        if (response.status == 200 && response.data.status == 1) {
          item.originalPrice = response.data.result.originalPrice
        }
      })
    },
    getPriceHost (item) {
      let url = 'activity/getOriginalPrice.do'
      let params = {
        vmConfigId: item.id,
        zoneId: item.zone
      }
      axios.get(url, {
        params: params
      }).then(response => {
        if (response.status == 200 && response.data.status == 1) {
          item.cost = response.data.result.cost
          item.originalPrice = response.data.result.originalPrice
        }
      })
    },
    orderSeckill (item, type) {
      if (!this.$store.state.userInfo) {
        if (type == 'p') {
          this.$LR({ type: 'register' })
        } else {
          window.open('https://csm.xrcloud.net/login', '_self')
        }
        return
      }
      if ((!this.authInfo) || (this.authInfo && this.authInfo.authtype == 0 && this.authInfo.checkstatus != 0) || (!this.authInfoPersion && this.authInfo && this.authInfo.authtype == 1 && this.authInfo.checkstatus != 0) || (this.authInfoPersion && this.authInfoPersion.checkstatus != 0 && this.authInfo && this.authInfo.checkstatus != 0)) {
        if (type == 'p') {
          if (!this.userInfo.phone) {
            this.showModal.cashverification = true
          } else if (item.certification == 3) {
            this.$message.confirm({
              title: '提示',
              content: '抱歉，只有实名认证用户才可以参加活动',
              okText: '去实名认证',
              onOk: () => {
                window.open('https://csi.xrcloud.net/usercenter', '_self')
              }
            })
          } else {
            this.refreshQRFirst()
          }
        } else {
          if (item.certification == 3) {
            window.open('https://csi.xrcloud.net/usercenter', '_self')
          } else {
            window.open('https://csm.xrcloud.net/faceindex', '_self')
          }
        }
        return
      }
      let params = {}
      let url = ''
      switch (item.servicetype) {
        case 'host':
          params = {
            vmConfigId: item.id,
            osType: item.system[1],
            defzoneid: item.zone,
          }
          url = 'information/getDiskcountMv.do'
          break
        case 'G5500':
          params = {
            vmConfigId: item.id,
            osType: item.system[1],
            defzoneid: item.zone,
          }
          url = 'activity/getDiskcountGPU.do'
          break
        case 'oss':
          params = {
            OOSConfigId: item.id,
            zoneId: item.zone,
          }
          url = 'ruiradosPrice/getDickCountOSS.do'
          break
      }
      if (item.servicetype == 'oss') {
        axios.post(url, params).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.$Message.success('创建订单成功')
            if (type == 'p') {
              window.open('https://csi.xrcloud.net/order', '_self')
            } else {
              window.open('https://csm.xrcloud.net/orderconfirm', '_self')
            }
          } else {
            this.hintText = response.data.message
            this.showModal.hint = true
          }
        })
      } else {
        axios.get(url, {
          params: params
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.$Message.success('创建订单成功')
            if (type == 'p') {
              window.open('https://csi.xrcloud.net/order', '_self')
            } else {
              window.open('https://csm.xrcloud.net/orderconfirm', '_self')
            }
          } else {
            this.hintText = response.data.message
            this.showModal.hint = true
          }
        })
      }
    },
    getEnterprise () {
      axios.get('activity/getTemActInfoById.do', {
        params: {
          activityNum: 65
        }
      }).then(response => {
        if (response.status == 200 && response.data.status == 1) {
          this.enterpriseList = response.data.result.freevmconfigResultMap
          for (let i in this.enterpriseList) {
            this.enterpriseList[i].zoneList = response.data.result.optionalArea
            this.enterpriseList[i].zone = this.enterpriseList[i].zoneList[0].value
            this.$set(this.enterpriseList[i], 'systemList', this.formatSystem(response.data.result.mvTem))
            this.enterpriseList[i].system = [this.enterpriseList[i].systemList[0].label, this.enterpriseList[i].systemList[0].children[0].value]
            let dayList = this.enterpriseList[i].days.split(',')
            let discountList = this.enterpriseList[i].discount.split(',')
            this.enterpriseList[i].timeList = []
            dayList.forEach((inner, index) => {
              this.enterpriseList[i].timeList.push({ 'days': inner, 'discount': discountList[index] })
            })
            this.enterpriseList[i].days = this.enterpriseList[i].timeList[0].days
            this.enterpriseList[i].discount = this.enterpriseList[i].timeList[0].disount
            this.enterpriseList[i].costList = this.enterpriseList[i].cost.split(',')
            this.enterpriseList[i].cost = this.enterpriseList[i].costList[0]
            this.enterpriseList[i].originalPriceList = this.enterpriseList[i].originalPrice.split(',')
            this.enterpriseList[i].originalPrice = this.enterpriseList[i].originalPriceList[0]
            this.enterpriseList[i].idList = this.enterpriseList[i].id.split(',')
            this.enterpriseList[i].id = this.enterpriseList[i].idList[0]
          }
        }
        // console.log(this.enterpriseList)
      })
    },
    changeTimeE (item, inner, index) {
      item.days = inner.days
      item.discount = inner.discount
      item.id = item.idList[index]
      this.getPriceHost(item)
    },
    getDatabase () {
      axios.get('activity/getActivityInfo.do', {
        params: {
          activityNum: 66
        }
      }).then(response => {
        if (response.status == 200 && response.data.status == 1) {
          this.databaseList = response.data.result.listMap
          this.databaseList.forEach(item => {
            this.$set(item, 'specsList', [])
            item.specsList = item.value.map(inner => {
              inner.config = JSON.parse(inner.config)
              return { 'cpu': inner.cpu, 'mem': inner.mem }
            })
            this.$set(item, 'specs', item.value[0].cpu + '#' + item.value[0].mem)
            item.name = item.value[0].configdesc
            item.rootDiskSize = item.value[0].rootDiskSize
            item.dataDiskSize = item.value[0].dataDiskSize
            item.disktype = item.value[0].disktype
            this.$set(item, 'timeList', [])
            this.$set(item, 'bandwithList', [])
            item.zoneList = response.data.result.optionalArea
            item.zone = item.zoneList[0].value
            // this.changeConfig(item)
            // 初始化数据赋值(为了一开始不调取很多接口)
            item.value.forEach(inner => {
              if (inner.cpu == item.specs.split('#')[0] && inner.mem == item.specs.split('#')[1]) {
                item.sList = inner.config
                item.id = inner.id
                item.bandwithList = inner.config.map(sec => {
                  return { 'bandwith': sec.bandwidth }
                })
              }
            })
            this.$set(item, 'bandwith', item.bandwithList[0].bandwith)
            item.daysPricelist = item.sList.filter(inner => {
              return inner.bandwidth == item.bandwith
            })
            item.daysPricelist[0].value = item.daysPricelist[0].value.sort((a, b) => {
              return a.days - b.days
            })
            item.timeList = item.daysPricelist[0].value.map(sec => {
              return { 'days': sec.days, 'discount': sec.discount }
            })
            this.$set(item, 'days', item.timeList[0].days)
            this.$set(item, 'discount', item.timeList[0].discount)
            //给价格赋初始值
            this.$set(item, 'cost', item.daysPricelist[0].value[0].cost)
            this.$set(item, 'originalPrice', item.daysPricelist[0].value[0].originalPrice)
          })
        }
      })
    },
    changeConfig (item) {
      item.value.forEach(inner => {
        if (inner.cpu == item.specs.split('#')[0] && inner.mem == item.specs.split('#')[1]) {
          item.sList = inner.config
          item.id = inner.id
          item.bandwithList = inner.config.map(sec => {
            return { 'bandwith': sec.bandwidth }
          })
        }
      })
      this.$set(item, 'bandwith', item.bandwithList[0].bandwith)
      this.changeBandwith(item)
    },
    changeBandwith (item) {
      item.daysPricelist = item.sList.filter(inner => {
        return inner.bandwidth == item.bandwith
      })
      item.daysPricelist[0].value = item.daysPricelist[0].value.sort((a, b) => {
        return a.days - b.days
      })
      item.timeList = item.daysPricelist[0].value.map(sec => {
        return { 'days': sec.days, 'discount': sec.discount }
      })
      item.days = item.timeList[0].days
      item.discount = item.timeList[0].discount
      this.getPriceDB(item)
    },
    changeTimeD (item, inner) {
      item.days = inner.days
      item.discount = inner.discount
      this.getPriceDB(item)
    },
    changeZoneDB (item) {
      this.getPriceDB(item)
    },
    getPriceDB (item) {
      let url = 'activity/getHostOriginalPrice.do'
      let params = {
        cpuNum: item.specs.split('#')[0],
        memory: item.specs.split('#')[1],
        diskSize: item.rootDiskSize + item.dataDiskSize,
        zoneId: item.zone,
        timeType: item.days < 360 ? 'month' : 'year',
        timeValue: item.days < 360 ? item.days / 30 : item.days / 360,
        diskType: item.disktype,
        resourceType: "db",
        bandwidth: item.bandwith,
        discount: item.discount
      }
      axios.post(url, params).then(response => {
        if (response.status == 200 && response.data.status == 1) {
          item.cost = response.data.result.discountCost
          item.originalPrice = response.data.result.originalPrice
        }
      })
    },
    orderDB (item, type) {
      if (!this.$store.state.userInfo) {
        if (type == 'p') {
          this.$LR({ type: 'register' })
        } else {
          window.open('https://csm.xrcloud.net/login', '_self')
        }
        return
      }
      if ((!this.authInfo) || (this.authInfo && this.authInfo.authtype == 0 && this.authInfo.checkstatus != 0) || (!this.authInfoPersion && this.authInfo && this.authInfo.authtype == 1 && this.authInfo.checkstatus != 0) || (this.authInfoPersion && this.authInfoPersion.checkstatus != 0 && this.authInfo && this.authInfo.checkstatus != 0)) {
        if (type == 'p') {
          if (!this.userInfo.phone) {
            this.showModal.cashverification = true
          } else if (item.certification == 3) {
            this.$message.confirm({
              title: '提示',
              content: '抱歉，只有实名认证用户才可以参加活动',
              okText: '去实名认证',
              onOk: () => {
                window.open('https://csi.xrcloud.net/usercenter', '_self')
              }
            })
          } else {
            this.refreshQRFirst()
          }
        } else {
          if (item.certification == 3) {
            window.open('https://csi.xrcloud.net/usercenter', '_self')
          } else {
            window.open('https://csm.xrcloud.net/faceindex', '_self')
          }
        }
        return
      }
      axios.get('database/getDeductionsDatabase.do', {
        params: {
          vmConfigId: item.id,
          defzoneid: item.zone,
          days: item.days,
          bandwidth: item.bandwith,
          dbVersion: item.name
        }
      }).then(response => {
        if (response.status == 200 && response.data.status == 1) {
          this.$Message.success('创建订单成功')
            if (type == 'p') {
              window.open('https://csi.xrcloud.net/order', '_self')
            } else {
              window.open('https://csm.xrcloud.net/orderconfirm', '_self')
            }
        } else {
          this.hintText = response.data.message
          this.showModal.hint = true
        }
      })
    },
    formatSystem (system) {
      let newSystem = []
      for (let i in system) {
        if (system[i].length) {
          let newItem = {}
          newItem.label = newItem.value = i
          newItem.children = system[i].map(inner => {
            return { 'label': inner.templatedescript, 'value': inner.systemtemplateid }
          })
          newSystem.push(newItem)
        }
      }
      newSystem.sort((a, b) => {
        return b.value.charCodeAt(0) - a.value.charCodeAt(0)
      })
      // console.log(newSystem)
      return newSystem
    },
    titleType (type) {
      let text = '弹性云服务器'
      switch (type) {
        case 'host':
          text = '弹性云服务器'
          break
        case 'G5500':
          text = 'GPU云服务器'
          break
        case 'oss':
          text = '对象存储OSS'
          break
      }
      return text
    },
    formatDay (days) {
      let text = '7天'
      if (days >= 30 && days < 360) {
        text = `${days / 30}月`
      } else if (days >= 360) {
        text = `${days / 360}年`
      }
      return text
    },
    shareNew (type) {
      if (!this.$store.state.userInfo) {
        if (type == 'p') {
          this.$LR({ type: 'register' })
        } else {
          window.open('https://csm.xrcloud.net/login', '_self')
        }
        return false
      }
      axios.get('activity/createTimeLink.do', {
        params: {
          ts: '4Y1V0J'
        }
      }).then(response => {
        if (response.status == 200 && response.data.status == 1) {
          this.shareUrl = response.data.result.url
          this.qrConfig.value = this.shareUrl
          this.showModal.share = true
        } else {
          this.hintText = response.data.message
          this.showModal.hint = true
        }
      })
    },
    copyUrl () {
      let dom = this.$refs.copy_content
      dom.value = this.shareUrl
      dom.select()
      document.execCommand("copy")
      try {
        if (document.execCommand("copy")) {
          this.$Message.success("链接复制成功");
        } else {
          this.$Message.info("平台出小差了");
        }
      } catch (err) {
        if (err) {
          this.$Message.info("该浏览器暂不支持复制");
        }
      }
      this.showModal.share = false
    },
    // getDomain () {
    //   axios.get('activity/getTemActInfoById.do', {
    //     params: {
    //       activityNum: 67
    //     }
    //   }).then(response => {

    //   })
    // },
    checkDomain (item) {
      if (item.value == '') {
        item.tip = '请输入域名'
        return false
      }
      axios.post('domain/domainFound.do', {
        domainName: item.value,
        tids: item.name
      }).then(response => {
        if (response.status == 200 && response.data.status == 1) {
          if (response.data.data.results.length == 0) {
            item.tip = '暂无数据！'
          } else if (response.data.data.results[0].status == 1) {
            item.tip = '* 对不起，域名已被注册，换个域名试试吧！'
          } else if (response.data.data.results[0].isRes == 'unavailable') {
            item.tip = '* 对不起，域名不可注册！'
          } else if (response.data.data.results[0].isRes == 'available') {
            item.tip = '域名可注册'
          }
        } else {
          this.$Message.info(response.data.msg);
        }
      })
    },
    buyDomain (type, item) {
      if (!this.$store.state.userInfo) {
        if (type == 'p') {
          this.$LR({ type: 'register' })
        } else {
          window.open('https://csm.xrcloud.net/login', '_self')
        }
        return false
      }
      if (item.value == '') {
        item.tip = '请输入域名'
        return false
      }
      axios.post('domain/domainFound.do', {
        domainName: item.value,
        tids: item.name
      }).then(response => {
        if (response.status == 200 && response.data.status == 1) {
          if (response.data.data.results.length == 0) {
            item.tip = '暂无数据！'
          } else if (response.data.data.results[0].status == 1) {
            item.tip = '* 对不起，域名已被注册，换个域名试试吧！'
          } else if (response.data.data.results[0].isRes == 'unavailable') {
            item.tip = '* 对不起，域名不可注册！'
          } else if (response.data.data.results[0].isRes == 'available') {
            item.tip = '域名可注册'
            window.open('https://csi.xrcloud.net/domaininfotemplate', '_self')
            var domNames = item.value + item.name
            var domYear = item.unit
            var domPrice = item.price
            this.setCookie('domNames', domNames + ',')
            this.setCookie('domYear', domYear + ',')
            this.setCookie('domPrice', domPrice + ',')
          }
        } else {
          this.$Message.info(response.data.msg);
        }
      })
    },
    setCookie(name, val) {
      document.cookie = name + '=' + val + ';domain=.xrcloud.net;path=/'
    },
    getRenew () {
      axios.get('activity/getActTicket.do', {
        params: {
          activityNum: '68'
        }
      }).then(response => {
        if (response.status == 200 && response.data.status == 1) {
          this.renewList = response.data.result.freevmconfigs
        }
      })
    },
    toRenew (id, type) {
      if (!this.$store.state.userInfo) {
        if (type == 'p') {
          this.$LR({ type: 'register' })
        } else {
          window.open('https://csm.xrcloud.net/login', '_self')
        }
        return false
      }
      axios.get('ticket/getTicketForConfigId.do', {
        params: {
          vmConfigId: id
        }
      }).then(response => {
        if (response.status == 200 && response.data.status == 1) {
          this.domainText = response.data.message
          this.renewStatus = 1
          this.showModal.renewHint = true
        } else {
          this.domainText = response.data.message
          this.renewStatus = 2
          this.showModal.renewHint = true
        }
      })
    },
    roll (val) {
      $('html, body').animate({ scrollTop: val }, 300);
    },
    goAnchor(type) {
      var anchor = this.$el.querySelector(type)
      // chrome
      document.body.scrollTop = anchor.offsetTop;
      // firefox
      document.documentElement.scrollTop = anchor.offsetTop;
    },
    // 实名认证方法
    init () {
      axios.get('user/GetUserInfo.do').then(response => {
        if (response.status == 200 && response.data.status == 1) {
          this.$store.commit('setAuthInfo', { authInfo: response.data.authInfo, userInfo: response.data.result, authInfoPersion: response.data.authInfo_persion })
        }
      })
    },
    refreshQRFirst () {
      this.tempCode = this.uuid(6, 16)
      let url = '/faceRecognition/getUserInfoByPcQRCode.do'
      let config1 = {
        phone: this.userInfo.phone ? this.userInfo.phone : this.formCustom.VerificationPhone,
      }
      let params = {
        faceType: '1',
        tempCode: this.tempCode
      }
      params.config = JSON.stringify(config1)
      axios.post(url, params).then(res => {
        if (res.status == 200 && res.data.status == 1) {
          this.refreshUserStatus()
          this.showModal.qrCode = true
          this.qrConfig.value = res.data.result.url
          this.codeLoseEfficacy = ''
        } else {
          this.codeLoseEfficacy = 'lose'
        }
      })
    },
    refreshUserStatus () {
      clearInterval(this.codeTimer)
      this.codeTimer = setInterval(() => {
        this.$http.get('/faceRecognition/getAllStatus.do', { params: { tempCode: this.tempCode } }).then(res => {
          if (res.status == 200 && res.data.status == 1) {
            if (res.data.result.qrCode == 0) {
              this.codeLoseEfficacy = 'lose'
            }
            if (res.data.result.qrCode == 2) {
              this.codeLoseEfficacy = 'scanSuccess'
            }
            if (res.data.result.authStatus == 1) {
              this.init()
              this.showModal.qrCode = false
              clearInterval(this.codeTimer)
            }
            if (res.data.result.authStatus == 0) {
              this.authStatus = true
            } else if (res.data.result.authStatus == 3) {
              // this.showModal.authHint = true
              this.$message.confirm({
                title: '提示',
                content: '抱歉，人脸识别实名认证失败！您也可以前往用户中心上传身份证照片进行实名认证。',
                okText: '去实名认证',
                onOk: () => {
                  window.open('https://csi.xrcloud.net/usercenter', '_self')
                }
              })
            }
          }
        })
      }, 3000)
    },
    qrcodeClose () {
      this.showModal.qrCode = false
      clearInterval(this.codeTimer)
    },
    Callpresentation () {
      this.$refs.cashverification.validateField('messagecode', (text) => {
        if (text == '') {
          let url = 'user/judgeCode.do'
          let params = {}
          if (this.formCustom.VerificationPhone) {
            params = {
              aim: this.formCustom.VerificationPhone,
              isemail: 0,
              code: this.formCustom.messagecode
            }
          }
          axios.get(url, {
            params
          }).then(res => {
            if (res.data.status == 1 && res.status == 200) {
              if (this.phoneVerifyType === 'identification') {
                this.showModal.cashverification = false
                this.tempCode = this.uuid(6, 16)
                let url = '/faceRecognition/getUserInfoByPcQRCode.do'
                let config = {
                  phone: this.userInfo.phone ? this.userInfo.phone : this.formCustom.VerificationPhone,
                }
                axios.post(url, {
                  faceType: '1',
                  config: JSON.stringify(config),
                  tempCode: this.tempCode
                }).then(res => {
                  if (res.status == 200 && res.data.status == 1) {
                    this.qrConfig.value = res.data.result.url
                    this.showModal.qrCode = true
                    this.codeLoseEfficacy = ''
                    this.refreshUserStatus()
                  } else {
                    this.codeLoseEfficacy = 'lose'
                    this.showModal.qrCode = true
                    this.refreshUserStatus()
                  }
                })
              }
            } else {
              this.hintText = res.data.message
              this.showModal.hint = true
            }
          })
        }
      })
    },
    uuid (len, radix) {
      var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
      var uuid = [], i;
      radix = radix || chars.length;

      if (len) {
        // Compact form
        for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
      } else {
        // rfc4122, version 4 form
        var r;

        // rfc4122 requires these characters
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
        uuid[14] = '4';

        // Fill in random data.  At i==19 set the high bits of clock sequence as
        // per rfc4122, sec. 4.1.5
        for (i = 0; i < 36; i++) {
          if (!uuid[i]) {
            r = 0 | Math.random() * 16;
            uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
          }
        }
      }
      return uuid.join('');
    },
    refreshQRCode: throttle(1000, function () {
      this.authStatus = false
      this.tempCode = this.uuid(6, 16)
      let url = '/faceRecognition/getUserInfoByPcQRCode.do'
      let config1 = {
        phone: this.userInfo.phone ? this.userInfo.phone : this.formCustom.VerificationPhone,
      }
      let params = {
        faceType: '1',
        tempCode: this.tempCode
      }
      params.config = JSON.stringify(config1)
      axios.post(url, params).then(res => {
        if (res.status == 200 && res.data.status == 1) {
          this.$Message.success('刷新成功')
          this.qrConfig.value = res.data.result.url
          this.codeLoseEfficacy = ''
        } else {
          this.codeLoseEfficacy = 'lose'
        }
      })
    }),
    getPhoneCode (codeType) {
      if (!this.userInfo.phone && !this.regExpObj.phone.test(this.formCustom.VerificationPhone)) {
        this.$Message.info('请输入正确的手机号')
        return
      }
      if (this.formCustom.VerificationPhone) {
        axios.get('user/isRegister.do', {
          params: {
            username: this.formCustom.VerificationPhone
          }
        }).then(res => {
          if (res.status === 200 && res.data.status === 1) {
            this.$refs.cashverification.validateField('Verificationcode', (text) => {
              if (text == '') {
                var url = ''
                if (codeType == 'code' || codeType == 'againCode' && this.formCustom.newCodeText == '获取验证码') {
                  url = 'user/code.do'
                } else if (codeType == 'voice' && this.formCustom.newCodeText == '获取验证码') {
                  url = 'user/voiceCode.do'
                } else {
                  return false
                }
                axios.get(url, {
                  params: {
                    aim: this.formCustom.VerificationPhone,
                    isemail: 0,
                    vailCode: this.formCustom.Verificationcode
                  }
                }).then(response => {
                  // 发送成功，进入倒计时
                  if (response.status == 200 && response.data.status == 1) {
                    var countdown = 60
                    this.formCustom.newCodeText = `${countdown}S`
                    var Interval = setInterval(() => {
                      countdown--
                      this.formCustom.newCodeText = `${countdown}S`
                      if (countdown == 0) {
                        clearInterval(Interval)
                        this.formCustom.newCodeText = '获取验证码'
                      }
                    }, 1000)
                  } else {
                    this.hintText = response.data.message
                    this.showModal.hint = true
                    this.imgSrc = `user/getKaptchaImage.do?t=${new Date().getTime()}`
                    this.formCustom.Verificationcode = ''
                  }
                })
              }
            })
          } else {
            this.$Message.info('该手机号已被使用')
          }
        })
      }
    }
    // 实名认证方法结束
  },
  computed: {
    authInfo () {
      return this.$store.state.authInfo ? this.$store.state.authInfo : null
    },
    authInfoPersion () {
      return this.$store.state.authInfoPersion
    },
    userInfo () {
      return this.$store.state.userInfo
    },
    disabled () {
      if (this.formCustom.Verificationcode == '' || this.formCustom.messagecode == '') {
        return true
      } else {
        return false
      }
    }
  },
  watch: {
  },
  components: {
    VueQArt
  },
  beforeRouteLeave (to, from, next) {
    clearInterval(this.codeTimer)
    next()
  }
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
.anniversary {
  color: #222;
  font-family: MicrosoftYaHei;
}
i {
  font-style: normal;
}
.wrap {
  width: 1200px;
  margin-left: auto;
  margin-right: auto;
}
.ml10 {
  margin-left: 10px;
}
.sub-head {
  padding-top: 80px;
  padding-bottom: 20px;
  color: #000;
  h2 {
    font-size: 36px;
    line-height: 47px;
    font-weight: normal;
    margin-bottom: 10px;
  }
  p {
    font-size: 18px;
    line-height: 24px;
    span {
      color: #ff624b;
      cursor: pointer;
    }
  }
}
.btn {
  display: inline-block;
  width: 184px;
  height: 40px;
  background: linear-gradient(
    128deg,
    rgba(249, 239, 184, 1) 0%,
    rgba(227, 183, 111, 1) 100%
  );
  border-radius: 2px;
  font-size: 18px;
  color: rgba(51, 51, 51, 1);
  line-height: 40px;
  text-align: center;
  cursor: pointer;
}

aside {
  position: fixed;
  z-index: 100;
  top: 50%;
  left: 0px;
  width: 90px;
  height: 306px;
  padding-top: 100px;
  background: url(../../../assets/img/active/anniversary/anniversary-aside-bg.png)
    center no-repeat;
  ul {
    li {
      height: 30px;
      line-height: 30px;
      text-align: center;
      cursor: pointer;
      &:hover {
        background: linear-gradient(
          135deg,
          rgba(221, 203, 161, 1) 0%,
          rgba(188, 160, 110, 1) 100%
        );
      }
    }
    .checked{
      background: linear-gradient(
          135deg,
          rgba(221, 203, 161, 1) 0%,
          rgba(188, 160, 110, 1) 100%
        );
    }
  }
  .to-top {
    position: absolute;
    bottom: 8px;
    width: 100%;
    text-align: center;
    cursor: pointer;
  }
}
.banner {
  height: 576px;
  background: url(../../../assets/img/active/anniversary/anniversary-banner.png)
    center no-repeat;
  .container {
    position: relative;
  }
  .center-banner {
    position: absolute;
    top: 30px;
    right: -230px;
  }
  .text {
    padding-top: 140px;
    img:first-of-type {
      margin-bottom: 40px;
      display: block;
    }
  }
  .menu {
    width: 1200px;
    height: 92px;
    position: relative;
    margin-top: 188px;
    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 1200px;
      height: 92px;
      background: rgba(230, 227, 218, 0.2);
    }
    .content {
      color: #fff;
      padding: 16px 0;
      height: 92px;
      a {
        position: relative;
        display: inline-block;
        width: 240px;
        height: 60px;
        font-size: 18px;
        font-weight: bold;
        color: #fff;
        border-right: 1px solid rgba(151, 151, 151, 1);
        z-index: 100;
        cursor: pointer;
        div {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 100%;
          text-align: center;
          p,
          span {
            line-height: 27px;
          }
        }
      }
      a:last-of-type {
        border-right: none;
      }
    }
  }
}
section:nth-of-type(2) {
  background: rgba(245, 243, 240, 1);
}
.new-user {
  background: url(../../../assets/img/active/anniversary/anniversary-newuser-bg.png)
    center no-repeat;
  padding: 14px 0px 0 40px;
  span {
    vertical-align: middle;
  }
  .left {
    img {
      vertical-align: middle;
    }
  }
  .desc {
    display: inline-block;
    width: 474px;
    margin: 0 98px 0 136px;
    font-size: 16px;
    line-height: 24px;
  }
  .btn {
    background: #222222;
    width: 184px;
    color: #fff;
  }
}
.seckill {
  margin-bottom: 92px;
  .item {
    width: 224px;
    background: #312b1f;
    color: rgba(255, 255, 255, 1);
    display: inline-block;
    margin-right: 20px;
    vertical-align: middle;
    &:last-of-type {
      margin-right: 0;
    }
    header {
      position: relative;
      padding: 25px 0 15px 0;
      font-size: 20px;
      font-weight: bold;
      line-height: 26px;
      text-align: center;
      &::after {
        content: "";
        display: block;
        height: 1px;
        width: 100%;
        background: url(../../../assets/img/active/anniversary/anniversary-border-img.png)
          center no-repeat;
        background-size: 100% auto;
        position: absolute;
        bottom: 0;
      }
    }
    .content {
      padding: 20px 20px 30px 20px;
      .middle {
        height: 162px;
        .configure {
          text-align: justify;
          &:after {
            display: inline-block;
            width: 100%;
            content: "";
          }
          li {
            display: inline-block;
            i {
              display: block;
            }
          }
        }
        .center {
          padding-top: 26px;
          > div {
            margin-bottom: 15px;
          }
          .mb10 {
            margin-bottom: 10px;
          }
          .row-yellow {
            font-size: 16px;
            font-weight: 600;
            color: rgba(255, 208, 140, 1);
            font-style: italic;
          }
          .lh1 {
            line-height: 1;
          }
          .w {
            width: 142px;
            display: inline-block;
          }
        }
        .pt16 {
          padding-top: 16px;
        }
      }
      .price {
        p {
          margin-bottom: 10px;
          color: rgba(255, 98, 75, 1);
          font-size: 24px;
          font-weight: bold;
          i {
            font-size: 12px;
            font-weight: normal;
          }
        }
        span {
          display: inline-block;
          text-decoration: line-through;
          margin-bottom: 10px;
        }
      }
      .btn {
        width: 184px;
      }
    }
  }
}
section:nth-of-type(3) {
  background: url(../../../assets/img/active/anniversary/anniversary-bg-icon-1.png)
      90px 190px no-repeat,
    url(../../../assets/img/active/anniversary/anniversary-bg-icon-2.png) 95%
      90% no-repeat;
  background-color: rgba(20, 20, 17, 1);
  padding-bottom: 80px;
  .sub-head {
    color: #fff;
    p {
      font-size: 18px;
      line-height: 24px;
      span {
        color: #eed292;
      }
    }
  }
}
.enterprise {
  .item {
    color: #fff;
    font-size: 0;
    // border-top: solid 1px #a99b8a;
    border-bottom: solid 1px #666666;
    // margin-bottom: 1px;
    .left {
      width: 200px;
      height: 130px;
      display: inline-block;
      background: url(../../../assets/img/active/anniversary/anniversary-item-left-bg-1.png)
        center no-repeat;
      font-weight: bold;
      padding: 40px 0 0 20px;
      vertical-align: bottom;
      p {
        margin-bottom: 10px;
        font-size: 20px;
        line-height: 26px;
      }
      span {
        font-size: 14px;
      }
    }
    .content {
      display: inline-block;
      padding: 36px 0 0 20px;
      background: #fff;
      width: 1000px;
      height: 130px;
      color: #000;
      .center {
        display: inline-block;
        border-right: solid 1px #a8a8a8;
        .aa-system-1 {
          display: inline-block;
          margin-right: 20px;
          .w150 {
            width: 150px;
          }
          .w230 {
            width: 230px;
            display: inline-block;
          }
          .w140 {
            width: 140px;
          }
          .w120 {
            width: 120px;
          }
          .w100 {
            width: 100px;
          }
          .label {
            display: block;
            margin-bottom: 14px;
          }
          .time {
            font-size: 0;
            span {
              position: relative;
              display: block;
              display: inline-block;
              width: 50px;
              height: 35px;
              border: 1px solid rgba(235, 193, 98, 1);
              border-right: none;
              text-align: center;
              line-height: 32px;
              font-size: 14px;
              cursor: pointer;
              &:last-of-type {
                border-right: 1px solid rgba(235, 193, 98, 1);
              }
              i {
                position: absolute;
                top: -8px;
                left: 6px;
                display: inline-block;
                padding: 1px 2px;
                line-height: 16px;
                background: rgba(191, 191, 191, 1);
                color: #fff;
                font-size: 12px;
              }
              &.selected {
                background: linear-gradient(
                  130deg,
                  rgba(249, 239, 184, 1) 0%,
                  rgba(227, 183, 111, 1) 100%
                );
                i {
                  background: #ff624b;
                }
              }
            }
          }
          &:last-of-type {
            margin-right: 60px;
          }
        }
      }
      .right {
        display: inline-block;
        .price {
          display: inline-block;
          width: 176px;
          padding-left: 20px;
          .cost {
            color: rgba(255, 98, 75, 1);
            font-size: 0;
            i {
              font-size: 12px;
            }
            span {
              font-size: 28px;
              font-weight: bold;
            }
          }
          .origin-cost {
            display: inline-block;
            margin-top: 10px;
            font-size: 12px;
            color: #222;
            text-decoration: line-through;
          }
        }
        .btn {
          width: 150px;
          vertical-align: bottom;
        }
      }
    }
  }
}
section:nth-of-type(4) {
  background: url(../../../assets/img/active/anniversary/anniversary-bg-icon-3.png)
      90px 190px no-repeat,
    url(../../../assets/img/active/anniversary/anniversary-bg-icon-4.png) 95%
      90% no-repeat;
  background-color: rgba(245, 243, 240, 1);
}
.domain {
  .item {
    display: inline-block;
    margin-right: 75px;
    width: 350px;
    height: 340px;
    border: 1px solid rgba(235, 193, 98, 1);
    border-radius: 2px;
    &:last-of-type {
      margin-right: 0;
    }
    &:nth-of-type(1) header {
      background: url(../../../assets/img/active/anniversary/anniversary-domain-1.png)
        center no-repeat;
    }
    &:nth-of-type(2) header {
      background: url(../../../assets/img/active/anniversary/anniversary-domain-2.png)
        center no-repeat;
    }
    &:nth-of-type(3) header {
      background: url(../../../assets/img/active/anniversary/anniversary-domain-3.png)
        center no-repeat;
    }
    header {
      height: 170px;
      padding: 30px 0 0 30px;
      h3 {
        margin-bottom: 30px;
        color: #e9ba45;
        font-size: 24px;
        font-weight: normal;
      }
      .input-group {
        font-size: 0;
        input {
          vertical-align: bottom;
          font-size: 12px;
          border-radius: 2px 0px 0px 2px;
          border: none;
          padding-left: 10px;
        }
        img {
          cursor: pointer;
        }
      }
      .tip {
        display: inline-block;
        margin-top: 12px;
        font-size: 12px;
        color: #ff624b;
      }
    }
    .content {
      padding: 30px 30px 0 30px;
      .price {
        color: #ff624b;
        font-size: 28px;
        span {
          font-size: 14px;
          vertical-align: middle;
        }
      }
      .btn {
        margin-top: 20px;
        width: 100%;
      }
    }
  }
}
.renew {
  margin-bottom: 100px;
  .container {
    width: 1200px;
    height: 474px;
    padding-top: 47px;
    border-radius: 10px;
    border: 2px solid rgba(235, 193, 98, 1);
    background: #f6f1e8;
    text-align: center;
    .item {
      display: inline-block;
      position: relative;
      .box {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        .top {
          height: 60%;
          position: relative;
          .p {
            width: 100%;
            position: absolute;
            bottom: 10%;
          }
        }
      }
      .discount {
        p {
          margin-bottom: 10px;
          color: #ff624b;
          span {
            font-size: 72px;
          }
          i {
            font-size: 36px;
            vertical-align: super;
          }
        }
        span {
          font-size: 20px;
        }
      }
      .btn {
        margin-top: 20px;
        width: 162px;
        background: rgba(13, 12, 11, 1);
        border-radius: 20px;
        font-size: 20px;
        color: rgba(252, 192, 50, 1);
      }
      .text {
        position: absolute;
        bottom: 10%;
        width: 100%;
        span {
          font-size: 18px;
          color: rgba(255, 255, 255, 1);
          line-height: 24px;
        }
        p {
          font-size: 24px;
          font-weight: bold;
          color: rgba(255, 255, 255, 1);
          line-height: 31px;
          span {
            color: #ff624b;
          }
        }
      }
    }
  }
}
.share-modal {
  > p {
    font-size: 16px;
    line-height: 1.5;
    text-align: center;
  }
  .wrapper {
    margin-top: 30px;
    text-align: center;
    div {
      display: inline-block;
      span {
        display: block;
        margin-top: 20px;
        font-size: 14px;
      }
    }
  }
  .qr-code {
    margin-right: 50px;
  }
  .url {
    width: 120px;
    .btn {
      margin-bottom: 85px;
      width: 120px;
      font-size: 16px;
      border-radius: 20px;
    }
  }
}
.rule {
  ul {
    padding: 10px;
    li {
      margin-bottom: 20px;
      font-size: 16px;
      line-height: 24px;
    }
  }
  .footer {
    text-align: center;
    padding-bottom: 10px;
  }
}
.hint {
  .content {
    font-size: 16px;
    padding: 10px;
  }
  .footer {
    text-align: center;
    padding-bottom: 10px; 
  }
}
.pc-640 {
  display: block;
}
.mobile-640 {
  display: none;
}
.pc-640-inline {
  display: inline-block;
}
.mobile-640-inline {
  display: none;
}
// 实名认证样式
.qrcode-modal {
  text-align: center;
  .qr-code {
    height: 198px;
    width: 197px;
    background: url("../../../assets/img/app/auth_background.png") no-repeat
      center;
    margin: 30px auto;
    position: relative;
    .shade {
      position: absolute;
      top: 0;
      height: 198px;
      width: 197px;
      background: url("../../../assets/img/app/lose_efficacy.png") center;
      &.scanSuccess {
        background: url("../../../assets/img/app/scan_success.png") center;
      }
    }
  }
  > p {
    font-size: 14px;
    font-family: MicrosoftYaHei;
    color: rgba(51, 51, 51, 1);
    margin: 10px;
    > span {
      color: #ff624b;
    }
  }
  .p-top {
    font-family: MicrosoftYaHei-Bold;
    font-weight: bold;
    color: rgba(237, 64, 20, 1);
  }
  .p-bottom {
    margin-top: 14px;
    margin-bottom: 0;
    > span {
      color: #4297f2;
      cursor: pointer;
    }
  }
}
.person-check {
  .w300 {
    width: 300px;
  }
}

.an-lf {
  position: fixed;
  top: 50%;
  left: 0;
  width: 36px;
  height: 116px;
  z-index: 10000;
}
// 实名认证结束
@media screen and (max-width: 768px) {
  .pc-640 {
    display: none;
  }
  .mobile-640 {
    display: block;
  }
  .pc-640-inline {
    display: none;
  }
  .mobile-640-inline {
    display: inline-block;
  }
  .wrap {
    width: 100%;
  }
  aside {
    display: none;
  }
  .an-lf {
    display: none;
  }
  .banner {
    height: auto;
    .banner-m {
      width: 100%;
    }
  }
  .new-user {
    padding: 10px 15px 15px 15px;
    background: linear-gradient(
      180deg,
      rgba(221, 203, 161, 1) 0%,
      rgba(184, 155, 104, 1) 100%
    );
    .left {
      display: none;
    }
    .desc {
      width: 100%;
      margin: 0;
    }
    .btn {
      width: 100%;
      margin-top: 8px;
    }
  }
  .seckill {
    padding: 15px;
    margin-bottom: 0;
    .item {
      width: 100%;
      margin-right: 0;
      margin-bottom: 15px;
      .content {
        .middle .center .w {
          width: e("calc(100% - 44px)");
          width: calc(~"100% - 44px");
        }
        .price {
          display: inline-block;
        }
        .btn {
          float: right;
          width: auto;
          padding-left: 30px;
          padding-right: 30px;
          margin-top: 10px;
        }
      }
    }
  }
  section:nth-of-type(3) {
    background: #141411;
    padding-bottom: 0;
  }
  .enterprise {
    padding: 15px;
    .item {
      margin-bottom: 15px;
      .left {
        width: 100%;
        height: auto;
        padding: 10px 15px;
        background: url("../../../assets/img/active/anniversary/aa-item-bg-m.png")
          center no-repeat;
        background-size: cover;
      }
      .content {
        width: 100%;
        height: auto;
        background: #fff;
        padding: 15px;
        .center {
          border-right: none;
          .aa-system-1 {
            width: 100%;
            margin-bottom: 15px;
            .w150 {
              width: 100%;
            }
            .w230 {
              width: 100%;
              display: inline-block;
            }
            .w140 {
              width: 100%;
            }
            .w120 {
              width: 100%;
            }
            .w100 {
              width: 100%;
            }
            .label {
              margin-bottom: 10px;
            }
          }
        }
        .right {
          width: 100%;
          .price {
            padding-left: 0;
            width: auto;
          }
          .btn {
            float: right;
          }
        }
      }
    }
  }
  section:nth-of-type(4) {
    padding: 15px;
    background: #f5f3f0;
  }
  .anniversary {
    .domain {
      .item {
        margin-right: 0;
        margin-bottom: 15px;
        width: 100%;
        height: auto;
        header {
          padding: 15px;
          height: auto;
          background: #0d0c0b;
          h3 {
            margin-bottom: 10px;
          }
        }
        .content {
          padding: 10px 15px 15px 15px;
          .btn {
            margin-top: 15px;
          }
        }
      }
    }
    .renew {
      margin-bottom: 10px;
      .container {
        width: 100%;
        height: auto;
        padding: 15px 0;
        .item {
          width: 100%;
          img {
            width: 100%;
          }
          .discount {
            p {
              margin-bottom: 0;
              span {
                font-size: 36px;
              }
              i {
                font-size: 24px;
                font-weight: bold;
              }
            }
            span {
              font-size: 14px;
            }
          }
          .btn {
            margin-top: 5px;
            font-size: 14px;
          }
          .text {
            span {
              font-size: 14px;
            }
            p {
              font-size: 18px;
            }
          }
        }
      }
    }
  }
  .sub-head {
    padding-top: 25px;
    padding-bottom: 10px;
    h2 {
      font-size: 28px;
      line-height: 1;
    }
    p {
      font-size: 16px;
    }
  }
  .share-modal {
    .wrapper {
      margin-top: 30px;
      text-align: center;
      div {
        display: inline-block;
        span {
          margin-top: 0px;
        }
      }
    }
    .qr-code {
      margin-right: 0px;
    }
    .url {
      .btn {
        margin-bottom: 15px;
        margin-top: 20px;
      }
    }
  }
}
@media screen and (max-width: 1366px) {
  .an-aside {
    left: -100px;
    transition: all ease-out 0.3s;
  }
  .an-sm{
      position: fixed;
      width: 36px;
      height: inherit;
      left: 0;
      text-align: center;
      transition: all ease-out 0.3s;
      font-size:16px;
      color: #333333;
      background:linear-gradient(180deg,rgba(255,250,224,1) 0%,rgba(217,195,145,1) 100%);
      span{
        display: inline-block;
        margin-top: 21px;
        width: 17px;
      }
    }

  .an-lf:hover > .an-aside{
    left: 0;
    transition: all ease-out 0.3s;
  }
  .an-lf:hover > .an-sm {
    // width: 0px;
    transition: all ease-out 0.3s;
    left: -50px;
  }
}
</style>
