<template>
  <div>
    <div class="ddos-active">
      <div class="pc-nav nav-a">
        <ul>
          <li
            v-for="(item,index) in navs"
            :key="index"
            :class="{'selected':selectedNav==index}"
            @click="roll(item.distance,index)"
          >
            <span>{{ item.title}}</span>
            <p>{{ item.text}}</p>
          </li>
        </ul>
        <div class="back" @click="roll(0,0)">
          <img src="../../../assets/img/active/ddos/ddos-back-top.png" alt="回到顶部图标">
          <p>返回顶部</p>
        </div>
      </div>
      <div class="mobile-nav">
        活动导航
        <div class="nav nav-a">
          <ul>
            <li
              v-for="(item,index) in navs"
              :key="index"
              :class="{'selected':selectedNav==index}"
              @click="roll(item.distance,index)"
            >
              <span>{{ item.title}}</span>
              <p>{{ item.text}}</p>
            </li>
          </ul>
          <div class="back" @click="roll(0,0)">
            <img src="../../../assets/img/active/ddos/ddos-back-top.png" alt="回到顶部图标">
            <p>返回顶部</p>
          </div>
        </div>
      </div>
      <img src="../../../assets/img/active/ddos/background-2-left.png" alt="背景图片">
      <div class="banner">
        <div class="wrap">
          <div class="product">
            <div class="content">
              <img
                class="banner"
                src="../../../assets/img/active/ddos/ddos-banner.png"
                alt="高仿云服务器限时秒杀"
              >
              <img
                class="text"
                src="../../../assets/img/active/ddos/ddos-banner-text.png"
                alt="高仿云服务器限时秒杀"
              >
            </div>
          </div>
        </div>
      </div>
      <div class="seckill">
        <div class="wrap">
          <div class="top">
            <div class="text">
              <p>
                每天6场秒杀，2点、6点、10点、14点、18点、22点开抢
                <span @click="showModal.ruleForcast=true">更多场次预告 ></span>
                <span @click="showModal.ruleKill=true">活动规则></span>
              </p>
            </div>
            <div class="timer">
              <i>本场秒杀倒计时</i>
              <div>
                <span>{{hh}}</span>:
                <span>{{m1}}</span>
                <span>{{m2}}</span>:
                <span>{{s1}}</span>
                <span>{{s2}}</span>
              </div>
            </div>
          </div>
          <div class="product">
            <div v-for="(item,index) in killHostList" :key="index">
              <div class="head">
                <h3>{{item.headline}}</h3>
                <span v-if="item.hot" class="hot">爆款</span>
                <span v-if="item.new" class="new">限新用户</span>
              </div>
              <div class="body">
                <div class="params" v-if="item.post.servicetype!='high_ip'">
                  <div class="configure">
                    <ul>
                      <li>
                        <i>CPU</i>
                        <span>{{item.post.cpu}}核</span>
                      </li>
                      <li>
                        <i>内存</i>
                        <span>{{item.post.mem}}G</span>
                      </li>
                      <li>
                        <i>宽带</i>
                        <span>{{item.post.bandwith}}M</span>
                      </li>
                      <li>
                        <i>系统盘</i>
                        <span>
                          {{item.post.disksize}}G
                          <span>SSD</span>
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div v-if="item.post.pronum">
                    <span class="label">防御：</span>
                    {{ item.post.pronum }}G
                  </div>
                  <div v-if="item.post.gpu">
                    <span class="label">GPU：</span>
                    P{{ item.post.gpu }}
                  </div>
                  <div v-if="item.post.servicetype=='high_host'">
                    <div style="margin-bottom:10px;">
                      <span class="label">区域：</span>
                      {{item.zoneName}}
                    </div>
                    <div>
                      <span class="label">系统：</span>
                      <Cascader
                          :data="systemDDOSHList"
                          v-model="item.system"
                          style="width:142px;display:inline-block"
                        ></Cascader>
                    </div>
                  </div>
                  <div v-else>
                    <div style="margin-bottom:10px;"> 
                      <span class="label">区域：</span>
                      <Select
                        v-model="item.zone"
                        style="width:142px;display:inline-block"
                        @on-change="changeZoneKill(item,index,'killHostList')"
                      >
                        <Option
                          v-for="item1 in item.zoneList"
                          :value="item1.value"
                          :key="item1.value"
                        >{{ item1.name }}</Option>
                      </Select>
                    </div>
                    <div>
                      <span class="label">系统：</span>
                      <Cascader
                        :data="item.systemList"
                        v-model="item.system"
                        style="width:142px;display:inline-block"
                      ></Cascader>
                    </div>
                  </div>
                </div>
                <div class="params" v-else>
                  <div class="configure">
                    <ul>
                      <li>
                        <i>端口数</i>
                        <span>{{item.post.ports}}</span>
                      </li>
                      <li>
                        <i>域名数</i>
                        <span>{{item.post.domains}}</span>
                      </li>
                      <li>
                        <i>宽带</i>
                        <span>{{item.post.bandwith}}M</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <span class="label">DDoS防护：</span>
                    {{item.post.ddospros}}
                  </div>
                  <div>
                    <span class="label">cc防护：</span>
                    {{item.post.ccpros}}
                  </div>
                  <div>
                    <span class="label">区域：</span>
                    中国大陆
                  </div>
                </div>
                <div class="cost">
                  <div class="price">
                    ￥
                    <span>{{item.price}}</span>
                    /{{item.post.days==12?'月':'年'}}
                  </div>
                  <div class="origin-price">
                    原价：￥
                    <span>{{item.originPrice}}</span>
                  </div>
                  <div>
                    <Button
                      class="btn"
                      v-if="item.num==100"
                      style="background:linear-gradient(90deg,rgba(206,206,206,1) 0%,rgba(168,168,168,1) 100%)"
                    >已抢完</Button>
                    <Button class="btn" @click="pushOrderHot(item)" v-else>立即购买</Button>
                  </div>
                </div>
                <div class="percentage">
                  <span>已抢购{{item.num}}%</span>
                </div>
              </div>
            </div>
          </div>
          <div class="tips">100%性能可用，内网收发包无限制，使用顶级Intel品牌硬件，40G SSD系统盘（好于高性能盘和高效云盘）</div>
        </div>
      </div>
      <div class="first-month">
        <div class="headline">
          <div>
            <img src="../../../assets/img/active/ddos/text-left.png" alt="icon">
            <img src="../../../assets/img/active/ddos/text-3.png" alt="icon">
            <img src="../../../assets/img/active/ddos/text-right.png" alt="icon">
          </div>
          <p>
            <span style="color:#EED292;" @click="showModal.ruleFT=true">活动规则></span>
          </p>
        </div>
        <div class="product">
          <div class="wrap">
            <ul>
              <li v-for="(item,index) in ddosList" :key="index">
                <div class="title">
                  <p>高防云服务器 {{item.postOne.cpu+'核'+item.postOne.mem+'G'}}</p>
                </div>
                <div class="content">
                  <div class="left">
                    <dl>
                      <dt>带宽</dt>
                      <!-- <dd>{{configVal(item.post,'bandwith')}}M</dd> -->
                      <dd>{{item.postOne.bandwith}}M</dd>
                    </dl>
                    <dl>
                      <dt>区域</dt>
                      <dd>{{item.zoneName}}</dd>
                    </dl>
                    <dl>
                      <dt>系统</dt>
                      <dd>
                        <Cascader
                          :data="systemDDOSHList"
                          v-model="item.system"
                          style="width:142px;display:inline-block"
                        ></Cascader>
                      </dd>
                    </dl>
                    <dl>
                      <dt>防御</dt>
                      <dd>
                        <span
                          :class="{select:item.disk==item1.pronum}"
                          v-for="(item1,index) in item.post"
                          :key="index"
                          @click="changeDefense(item,item1)"
                        >{{item1.pronum}}G</span>
                      </dd>
                    </dl>
                  </div>
                  <div class="right">
                    <div>
                      <span class="text">首月优惠价</span>
                      <p>
                        ¥
                        <span>{{item.price}}</span>/首月
                      </p>
                      <i>原价：¥{{item.originPrice}}/月</i>
                    </div>
                    <Button class="btn" @click="pushOrderDDOS(item)">立即购买</Button>
                  </div>
                </div>
              </li>
            </ul>
            <div class="tips">
              以上配置皆包含40G SSD系统盘
              <span @click="$router.push('buy/ddos/')">查看更多配置>></span>
            </div>
          </div>
        </div>
      </div>
      <div class="super-discount">
        <div class="wrap">
          <div class="headline">
            <div>
              <img src="../../../assets/img/active/ddos/text-left-black.png" alt="icon">
              <img src="../../../assets/img/active/ddos/text-4.png" alt="icon">
              <img src="../../../assets/img/active/ddos/text-right-black.png" alt="icon">
            </div>
            <p style="color:#666666">
              高防云服务器买3/6/12个月赠送188元域名无门槛抵用券
              <span
                @click="showModal.ruleGT=true"
                style="color:#FF624B"
              >活动规则</span>
            </p>
          </div>
          <div class="product">
            <div v-for="(item,index) in listGT" :key="index">
              <div class="head">
                <h3>高防云服务器{{item.postOne.cpu+'核'+item.postOne.mem+'G'}}</h3>
              </div>
              <div class="body">
                <div class="configure">
                  <ul>
                    <li>
                      <i>系统盘:</i>
                      <span>
                        {{item.postOne.disksize}}G
                        <span>SSD</span>
                      </span>
                    </li>
                    <li>
                      <i>宽带:</i>
                      <span>{{item.postOne.bandwith}}M</span>
                    </li>
                    <li>
                      <i>区域:</i>
                      <span>{{item.zoneName}}</span>
                    </li>
                    <li>
                      <i>防护等级:</i>
                      <span>{{item.postOne.pronum}}G</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <span class="label">系统：</span>
                  <Cascader :data="systemDDOSHList" v-model="item.system" style="width:237px;"></Cascader>
                </div>
                <div class="time">
                  <span class="label">时长：</span>
                  <ul>
                    <li
                      v-for="(item1,index1) in item.post"
                      :key="index1"
                      :class="{'selected':item.time==item1.days}"
                      @click="changeTime(item,item1)"
                    >
                      {{month(item1.days)}}
                      <span>{{item1.discount*10}}折</span>
                    </li>
                  </ul>
                </div>
                <div class="price">
                  ￥
                  <span>{{item.price}}</span>
                </div>
                <div class="origin-price">
                  原价：￥
                  <span>{{item.originPrice}}</span>
                </div>
                <Button class="btn" @click="pushOrderDDOS(item)">立即购买</Button>
                <p class="text">购买即赠送188元域名无门槛抵用券</p>
              </div>
            </div>
          </div>
          <div class="tips">
            <span @click="$router.push('buy/ddos/')">查看更多配置>></span>
          </div>
        </div>
      </div>
      <div class="give-time">
        <div class="wrap">
          <div class="headline">
            <div>
              <img src="../../../assets/img/active/ddos/text-left.png" alt="icon">
              <img src="../../../assets/img/active/ddos/text-5.png" alt="icon">
              <img src="../../../assets/img/active/ddos/text-right.png" alt="icon">
            </div>
            <p style="color:#fff;">此活动长期有效 新老用户皆可参与</p>
          </div>
          <div class="product">
            <ul>
              <li>
                <div class="top">
                  <div class="left">
                    <p>
                      购
                      <span>6个月</span>高防云服务器
                    </p>
                    <p>免费再送一个月</p>
                  </div>
                  <div class="right">
                    <span>9</span>.5
                    <i>折</i>
                  </div>
                </div>
                <Button class="btn" @click="$router.push('buy/ddos/')">立即选购</Button>
              </li>
              <li>
                <div class="top">
                  <div class="left">
                    <p>
                      购
                      <span>6个月</span>高防云服务器
                    </p>
                    <p>免费再送一个月</p>
                  </div>
                  <div class="right">
                    <span>9</span>.5
                    <i>折</i>
                  </div>
                </div>
                <Button class="btn" @click="$router.push('buy/ddos/')">立即选购</Button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- 购买前实名认证 -->
      <Modal v-model="showModal.authentication" width="640" :scrollable="true">
        <p slot="header" class="modal-header-border">
          <span class="universal-modal-title">实名认证</span>
        </p>
        <Form
          :model="quicklyAuthForm"
          :label-width="100"
          ref="quicklyAuth"
          :rules="quicklyAuthFormValidate"
          style="width:450px;margin-top:20px;"
        >
          <FormItem label="真实姓名" prop="name" style="width: 100%">
            <Input v-model="quicklyAuthForm.name" placeholder="请输入姓名"></Input>
          </FormItem>
          <FormItem label="身份证号" prop="IDCard" style="width: 100%">
            <Input v-model="quicklyAuthForm.IDCard" placeholder="请输入身份证号"></Input>
          </FormItem>
          <Form
            :model="quicklyAuthForm"
            :rules="quicklyAuthFormValidate"
            ref="sendCode"
            :label-width="100"
          >
            <FormItem label="图形验证码" prop="pictureCode">
              <div style="display: flex">
                <Input
                  v-model="quicklyAuthForm.pictureCode"
                  placeholder="请输入图片验证码"
                  style="width:250px;margin-right: 10px"
                ></Input>
                <img
                  :src="imgSrc"
                  style="height:33px;"
                  @click="imgSrc=`https://kaifa.xrcloud.net/user/getKaptchaImage.do?t=${new Date().getTime()}`"
                >
              </div>
            </FormItem>
            <FormItem label="手机号码" prop="phone" style="width: 100%">
              <Input v-model="quicklyAuthForm.phone" placeholder="请输入以该身份证开户的手机号码"></Input>
            </FormItem>
          </Form>
          <FormItem label="验证码" prop="validateCode" style="width: 100%">
            <div style="display: flex;justify-content: space-between">
              <Input
                v-model="quicklyAuthForm.validateCode"
                placeholder="请输入验证码"
                style="width:260px;margin-right: 10px"
              ></Input>
              <Button
                type="primary"
                @click="sendCode"
                :disabled="quicklyAuthForm.sendCodeText!='获取验证码'"
              >{{quicklyAuthForm.sendCodeText}}</Button>
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
          <img
            src="../../../assets/img/payresult/paySuccess.png"
            style="width:36px;vertical-align:middle;margin-right:10px;"
            alt="实名认证成功"
          >
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
          <img
            src="../../../assets/img/payresult/payFail.png"
            style="width:36px;vertical-align:middle;margin-right:10px;"
            alt="实名认证失败"
          >
          <span style="font-size:14px;line-height:36px">抱歉，实名认证失败，原因：{{authErrorText}}</span>
        </div>
        <div slot="footer" class="modal-footer-border">
          <Button type="primary" @click="showModal.authenticationError=false">确认</Button>
        </div>
      </Modal>
      <!-- 活动规则 -->
      <transition name="fade">
        <div class="overlay" @click.stop="showModal.ruleKill=true" v-if="showModal.ruleKill">
          <div class="rule-modal">
            <div class="header">
              <span>秒杀活动规则</span>
              <img src=../../../assets/img/active/ddos/ddos-close-icon.png alt="关闭图标" @click.stop="showModal.ruleKill=false">
            </div>
            <div class="body">
              <p>1、活动时间：2019.7.25-2019.9.25，每天6场秒杀， 2点、6点、10点、14点、18点、22点开抢。</p>
              <p>2、活动对象：新老用户皆可参与，其中云服务器、GPU服务器仅限于新用户。</p>
              <p>3、数量限制：活动期间同一用户（同一手机、邮箱、实名认证用户视为同一用户）按照不同的配置进行秒杀，其中云服务器和GPU服务器仅限新用户抢购，每次秒杀每款配置限量40台，限额以后台配额限制为准（实名认证后每个用户云服务器最多可拥有7台，如有特殊要求，可向销售申请）。</p>
              <p>4、参与本次活动购买的产品不能进行退款。</p>
              <p>5、此次活动产品不能用于转售，不能用于第三方业务，只能用于自身业务。如若利用资源从事违法违规行为的用户，新睿云有权收回使用资格，并且不予退款。</p>
              <p>6、购买时不可使用任何优惠券和现金券，秒杀活动不支持会员折扣。</p>
              <p>7、活动最终解释权为新睿云所有。</p>
            </div>
            <div class="footer">
              <div class="wrap-f">
                <Button class="btn" @click.stop="showModal.ruleKill=false">我知道了</Button>
              </div>
            </div>
          </div>
        </div>
      </transition>
      <transition name="fade">
        <div class="overlay" @click.stop="showModal.ruleFT=true" v-if="showModal.ruleFT">
          <div class="rule-modal">
            <div class="header">
              <span>8折优惠活动规则</span>
              <img src=../../../assets/img/active/ddos/ddos-close-icon.png alt="关闭图标" @click.stop="showModal.ruleFT=false">
            </div>
            <div class="body">
              <p>1、活动时间：2019.7.25-2019.9.25。</p>
              <p>2、活动对象：平台已完成实名认证的新老用户。</p>
              <p>3、配置选择：2核4G/2核8G/4核8G/4核16G；带宽默认5M，系统盘默认40G，不含数据盘。</p>
              <p>4、该活动购买的资源不支持退款，不支持优惠券抵扣，支持会员折扣。</p>
            </div>
            <div class="footer">
              <div class="wrap-f">
                <Button class="btn" @click.stop="showModal.ruleFT=false">我知道了</Button>
              </div>
            </div>
          </div>
        </div>
      </transition>
      <transition name="fade">
        <div class="overlay" @click.stop="showModal.ruleGT=true" v-if="showModal.ruleGT">
          <div class="rule-modal">
            <div class="header">
              <span>送域名活动规则</span>
              <img src=../../../assets/img/active/ddos/ddos-close-icon.png alt="关闭图标" @click.stop="showModal.ruleGT=false">
            </div>
            <div class="body">
              <p>1、活动时间：2019.7.25-2019.9.25。</p>
              <p>2、活动对象：平台已完成实名认证的新老用户。</p>
              <p>3、数量限制：云服务器产品每个用户限购7台（若有更多需求，可向客服申请提高配额）</p>
              <p>4、参与本次活动购买的产品不能进行退款。</p>
              <p>5、此次产品不能用于转售，不能用于第三方业务，只能用于自身业务。如若利用资源从事违法违规行为的用户，新睿云有权收回使用资格，并且不予退款。</p>
              <p>6、购买时不可使用任何其它优惠券和现金券，支持会员折扣，188元域名无门槛抵用券仅用于域名购买，有效期为1年。</p>
              <p>7、活动最终解释权为新睿云所有。</p>
            </div>
            <div class="footer">
              <div class="wrap-f">
                <Button class="btn" @click.stop="showModal.ruleGT=false">我知道了</Button>
              </div>
            </div>
          </div>
        </div>
      </transition>
      <transition name="fade">
        <div class="overlay" @click.stop="showModal.ruleForcast=true" v-if="showModal.ruleForcast">
          <div class="rule-modal" style="width:680px;">
            <div class="header">
              <span>更多秒杀场次预告</span>
              <img src=../../../assets/img/active/ddos/ddos-close-icon.png alt="关闭图标" @click.stop="showModal.ruleForcast=false">
            </div>
            <div class="body">
              <Table border :columns="columnsForcast" :data="dataForcast" size="large"></Table>
            </div>
            <div class="footer">
              <Button class="btn" @click.stop="showModal.ruleForcast=false">返回活动页</Button>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import axios from 'axios'
import reg from '../../../util/regExp'
import VueQArt from 'vue-qart'
import $ from 'jquery'
export default {
  beforeRouteEnter (to, from, next) {
    axios.get('activity/activityTime.do', {
      params: {
        activityId: '53'
      }
    }).then(response => {
      if (response.status == 200 && response.data.status == 1) {
        next()
      } else {
        next({ path: '/activeBefore' })
      }
    })
  },
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
        authentication: false,
        authenticationSuccess: false,
        authenticationError: false,
        rule: false,
        ruleKill: false,
        ruleFT: false,
        ruleGT: false,
        ruleForcast: false,
      },
      systemDDOSHList: [{
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
      system1: [],
      navs: [
        { title: '云产品4折', text: '限时秒杀', distance: 300, },
        { title: '高防云服务器', text: '首月8折优惠', distance: 1000, },
        { title: '超低折扣', text: '买时长送域名', distance: 1900, },
        { title: '自选配置', text: '打折再送时长', distance: 2800, },
      ],
      selectedNav: 0,
      killHostList: [
        {
          headline: '高防云服务器',
          new: 0,
          hot: 1,
          post: {},
          pronum: 100,
          cpu: 1,
          mem: 2,
          bandwith: 3,
          disksize: 40,
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
          zoneList: [],
          zone: '',
          zoneName: '',
          price: '69',
          originPrice: '176.72',
          configId: '',
          num: ''
        },
        {
          headline: '高防云服务器',
          new: 0,
          hot: 0,
          post: {},
          pronum: 100,
          cpu: 1,
          mem: 2,
          bandwith: 3,
          disksize: 40,
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
          zoneList: [],
          zone: '',
          zoneName: '',
          price: '69',
          originPrice: '176.72',
          configId: '',
          num: ''
        },
        {
          headline: '弹性云服务器',
          new: 1,
          hot: 1,
          post: {},
          cpu: 1,
          mem: 2,
          bandwith: 3,
          disksize: 40,
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
          zoneList: [],
          zone: '',
          zoneName: '',
          price: '69',
          originPrice: '176.72',
          configId: '',
          num: ''
        },
        {
          headline: 'GPU云服务器',
          new: 1,
          hot: 0,
          post: {},
          gpu: 100,
          cpu: 1,
          mem: 2,
          bandwith: 3,
          disksize: 40,
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
          zoneList: [],
          zone: '',
          zoneName: '',
          price: '69',
          originPrice: '176.72',
          configId: '',
          num: ''
        },
        {
          headline: 'DDOS高防IP',
          new: 0,
          hot: 0,
          post: {},
          bandwith: 50,
          ports: 50,
          ddospros: 50,
          domains: 100,
          ccpros: 200000,
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
          zoneList: [],
          zone: '3e483b69-ea57-40c6-9fba-d470d665b238',
          zoneName: '',
          price: '69',
          originPrice: '176.72',
          configId: '',
          num: ''
        }
      ],
      zoneListHot: [],
      ddosList: [
        {
          post: [],
          postOne: {},
          config: '2核4G',
          bandwith: 5,
          zone: '华东一区',
          zoneName: '',
          systemList: [],
          system: [],
          diskList: [60, 100, 200],
          disk: 60,
          price: 707.23,
          originPrice: 852.12
        },
        {
          post: [],
          postOne: {},
          config: '2核8G',
          bandwith: 5,
          zone: '华东一区',
          zoneName: '',
          systemList: [],
          system: [],
          diskList: [60, 100, 200],
          disk: 60,
          price: 790.26,
          originPrice: 852.12
        },
        {
          post: [],
          postOne: {},
          config: '4核8G',
          bandwith: 5,
          zone: '华东一区',
          zoneName: '',
          systemList: [],
          system: [],
          diskList: [60, 100, 200],
          disk: 60,
          price: 895.67,
          originPrice: 852.12
        },
        {
          post: [],
          postOne: {},
          config: '4核16G',
          bandwith: 5,
          zone: '华东一区',
          zoneName: '',
          systemList: [],
          system: [],
          diskList: [60, 100, 200],
          disk: 60,
          price: 995.27,
          originPrice: 852.12
        }
      ],
      listGT: [
        {
          post: [],
          postOne: {},
          time: 90,
          systemList: [],
          system: [],
          zone: '',
          zoneName: '华东一区',
          price: '69',
          originPrice: '176.72',
        },
        {
          post: [],
          postOne: {},
          time: 90,
          systemList: [],
          system: [],
          zoneName: '华东一区',
          price: '69',
          originPrice: '176.72',
        },
        {
          post: [],
          postOne: {},
          time: 90,
          systemList: [],
          system: [],
          zone: '',
          zoneName: '华东一区',
          price: '69',
          originPrice: '176.72',
        },
        {
          post: [],
          postOne: {},
          time: 90,
          systemList: [],
          system: [],
          zone: '',
          zoneName: '华东一区',
          price: '69',
          originPrice: '176.72',
        }
      ],
      hh: '',
      m1: '',
      m2: '',
      s1: '',
      s2: '',
      columnsForcast: [
        {
          title: '秒杀时间',
          key: 'date',
          className: 'demo-table-info-column',
          width: 120
        },
        {
          title: '该场次产品',
          key: 'freevmconfigs',
          render: (h, params) => {
            let arrayF = params.row.freevmconfigs
            let text1 = []
            let text2 = ''
            for (let i = 0; i < arrayF.length; i++) {
              if (arrayF[i].type == 'high_host') {
                text2 = '高防云服务器' + arrayF[i].value + ','
              } else if (arrayF[i].type == 'host') {
                text2 = '云服务器' + arrayF[i].value + ','
              } else if (arrayF[i].type == 'G5500') {
                text2 = 'GPU云服务器' + arrayF[i].value + ','
              } else if (arrayF[i].type == 'high_ip') {
                text2 = '' + arrayF[i].value + ''
              }
              text1.push(text2)
            }
            return h('div', {
              style: {
                paddingTop: '6px',
                paddingBottom: '6px',
                lineHeight: '24px'
              }
            }, text1.join(''));
          }
        },
        {
          title: '状态',
          key: 'flag',
          width: 80,
          render: (h, params) => {
            let text = params.row.flag == 1 ? '进行中' : '未开始'
            if (params.row.flag == 1) {
              return h('div', {
                style: {
                  color: '#FF881C'
                }
              }, '进行中')
            } else {
              return h('div', '未开始')
            }
          }
        }
      ],
      dataForcast: [],
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
      imgSrc: 'https://kaifa.xrcloud.net/user/getKaptchaImage.do',
      authErrorText: ''
    }
  },
  created () {
    this.getTime()
    this.getConfigureHot()
    this.getSubsection()
    this.activityForecast()
    this.getConfigureDDOS('55', 'listGT')
    this.getConfigureDDOS('54', 'ddosList')
    this.getSystemDDOS()
  },
  mounted () {
  },
  methods: {
    // 53    高防云服务器，限时秒杀
    // 54    高防服务器首月8折优惠
    // 55    超低折扣 买时长送域名
    // 56    自选配置，打折再送时长
    activityForecast () {
      axios.get('activity/getActivityTrailer.do', {
        params: {
          activityNum: '53'
        }
      }).then(response => {
        if (response.status == 200 && response.data.status == 1) {
          this.dataForcast = response.data.result
        }
      })
    },
    // 获取活动配置,区域
    getConfigureHot () {
      let url = 'activity/getActInfoById.do'
      axios.get(url, {
        params: {
          activityNum: '53'
        }
      }).then(res => {
        if (res.data.status == 1 && res.status == 200) {
          //参数赋值
          let originArr = res.data.result.freevmconfigs
          this.killHostList.forEach((item, index) => {
            item.post = originArr[index]
          })
          //区域赋值
          this.killHostList.forEach((item, index) => {
            if (item.post.servicetype == 'high_host') {
              item.zoneName = res.data.result.optionalAreaHighPrevention[0].name
              item.zone = res.data.result.optionalAreaHighPrevention[0].value
              this.getPriceKill (item)
            } else if(item.post.servicetype == 'host') {
              item.zoneList = res.data.result.optionalArea
              item.zone = res.data.result.optionalArea[0].value
            } else if(item.post.servicetype == 'G5500') {
              item.zoneList = res.data.result.optionalAreaGpu
              item.zone = res.data.result.optionalAreaGpu[0].value
            } else if(item.post.servicetype == 'high_ip') {
              this.getPriceDDOSIP(item)
            } 
          })
        }
      })
    },
    getPriceKill (item) {
      axios.get('activity/getOriginalPrice.do', {
        params: {
          zoneId: item.zone,
          vmConfigId: item.post.id,
          month: item.post.days
        }
      }).then(res => {
        if (res.status == 200 && res.data.status == 1) {
          item.price = res.data.result.cost;
          item.originPrice = res.data.result.originalPrice;
        }
      })
    },
    getPriceDDOSIP (item) {
      axios.get('activity/getOriginalPriceDDosIP.do', {
        params: {
          zoneId: item.zone,
          vmConfigId: item.post.id,
          month: item.post.days
        }
      }).then(res => {
        if (res.status == 200 && res.data.status == 1) {
          item.price = res.data.result.cost;
          item.originPrice = res.data.result.originalPrice;
        }
      })
    },
    changeZoneKill (item, index, name) {
      this.getSystem(item, index, name)
      this.getPriceKill(item)
    },
    // 根据区域获得不同系统
    getSystem (item, index, name) {
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
          this[name][index].system = ['window', res.data.result.window[0].systemtemplateid]
        }
      })
    },
    // 获取抢购剩余数量
    getSubsection (index) {
      axios.get('activity/getSubsection.do', {
        params: {
          activityNum: '53',
        }
      }).then(res => {
        if (res.status == 200 && res.data.status == 1) {
          res.data.result.forEach((itemed, index) => {
            if (itemed.freevmconfigId == this.killHostList[index].post.id) {
              this.killHostList[index].num = (itemed.receive / itemed.total) * 100
            }
          })
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
      let url = 'information/getDiskcountMv.do'
      if (item.post.servicetype == 'high_host') {
        url = 'activity/getDiskcountHighPreventionMv.do'
      } else if (item.post.servicetype == 'high_ip') {
        url = 'activity/getDiskcountHighIP.do'
      }
      axios.get(url, {
        params: {
          defzoneid: item.zone,
          vmConfigId: item.post.id,
          osType: item.system[1] ? item.system[1] : ''
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
    // 获取高仿主机的系统
    getSystemDDOS () {
      let url = 'activity/getTemActInfoById.do'
      axios.get(url, {
        params: {
          activityNum: '54'
        }
      }).then(res => {
        axios.get('information/listTemplates.do', {
          params: {
            zoneId: res.data.result.optionalAreaHighPrevention[0].value,
          }
        }).then(res => {
          if (res.status == 200 && res.data.status == 1) {
            var x
            for (x in res.data.result) {
              this.systemDDOSHList.forEach(item => {
                if (item.value == x) {
                  item.children = res.data.result[x]
                }
              })
            }
            this.systemDDOSHList.forEach(item => {
              item.children.forEach(item => {
                item.value = item.systemtemplateid
                item.label = item.templatedescript
              })
            })
            this.systemDDOSHList.forEach((item, index) => {
              if (item.children.length == 0) {
                item.disabled = true
              }
            })
            // 设置默认系统和价格
            this.ddosList.forEach((item, index) => {
              item.system = ['window', res.data.result.window[0].systemtemplateid]
              this.changeDefense(item, item.post[0])
            })
            this.listGT.forEach((item, index) => {
              item.system = ['window', res.data.result.window[0].systemtemplateid]
              this.changeTime(item, item.post[0])
            })
            this.killHostList.forEach((item, index) => {
              if(item.post.servicetype == 'high_host') {
                item.system = ['window', res.data.result.window[0].systemtemplateid]
              }
            })
          }
        })
      })
    },
    getConfigureDDOS (activityNum, arrayName) {
      let url = 'activity/getTemActInfoById.do'
      axios.get(url, {
        params: {
          activityNum: activityNum
        }
      }).then(res => {
        if (res.data.status == 1 && res.status == 200) {
          this[arrayName].forEach((item, index) => {
            item.zone = res.data.result.optionalAreaHighPrevention[0].value
            item.zoneName = res.data.result.optionalAreaHighPrevention[0].name
            if (index == 0) {
              item.post = res.data.result.freevmconfigs.filter(item => {
                return item.cpu == 2 && item.mem == 4
              })
              item.postOne = item.post[0]
            } else if (index == 1) {
              item.post = res.data.result.freevmconfigs.filter(item => {
                return item.cpu == 2 && item.mem == 8
              })
              item.postOne = item.post[0]
            } else if (index == 2) {
              item.post = res.data.result.freevmconfigs.filter(item => {
                return item.cpu == 4 && item.mem == 8
              })
              item.postOne = item.post[0]
            } else if (index == 3) {
              item.post = res.data.result.freevmconfigs.filter(item => {
                return item.cpu == 4 && item.mem == 16
              })
              item.postOne = item.post[0]
            }
          })
        }
      })
    },
    changeDefense (item, item1) {
      item.disk = item1.pronum
      item.postOne = item1
      this.getPriceDDOS(item)
    },
    getPriceDDOS (item) {
      axios.get('activity/getOriginalPrice.do', {
        params: {
          zoneId: item.zone,
          vmConfigId: item.postOne.id,
          month: item.postOne.days / 30
        }
      }).then(res => {
        if (res.status == 200 && res.data.status == 1) {
          item.price = res.data.result.cost;
          item.originPrice = res.data.result.originalPrice;
        }
      })
    },
    pushOrderDDOS (item) {
      if (!this.$store.state.userInfo) {
        this.$LR({ type: 'register' })
        return
      }
      if ((!this.authInfo) || (this.authInfo && this.authInfo.authtype == 0 && this.authInfo.checkstatus != 0) || (!this.authInfoPersion && this.authInfo && this.authInfo.authtype == 1 && this.authInfo.checkstatus != 0) || (this.authInfoPersion && this.authInfoPersion.checkstatus != 0 && this.authInfo && this.authInfo.checkstatus != 0)) {
        this.showModal.authentication = true
        return
      }
      axios.get('activity/getDiskcountHighPreventionMv.do', {
        params: {
          defzoneid: item.zone,
          vmConfigId: item.postOne.id,
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
    changeTime (item, item1) {
      item.time = item1.days
      item.postOne = item1
      this.getPriceDDOS(item)
    },
    roll (val, index) {
      // console.log(index)
      // this.selectedNav = index
      $('html, body').animate({ scrollTop: val }, 300)
    },
    configVal (val, name) {
      return val[0][name]
    },
    month (val) {
      return val >= 360 ? val / 360 + '年' : val / 30 + '个月'
    },
    getTime () {
      axios.get('network/getTime.do').then(res => {
        if (res.status == 200 && res.data.status == 1) {
          // 每天6场秒杀，2点、6点、10点、14点、18点、22点开抢
          let hourArray = [2, 6, 10, 14, 18, 22]
          let now = new Date(res.data.result)
          let h = now.getHours()
          let hourPoint = ''
          // 22-2点有点bug
          for (let i = 0; i < hourArray.length - 1; i++) {
            if (h >= hourArray[i] && h < hourArray[i + 1]) {
              hourPoint = hourArray[i + 1]
            } else if (h == 22 || h == 23 || h == 0 || h == 1) {
              hourPoint = 2
            }
          }
          let nowb = new Date(res.data.result)
          let endTime = nowb.setHours(hourPoint, 0, 0, 0)
          let leftTime = endTime - now.getTime()
          if (leftTime > 0) {
            this.formatTime(leftTime)
            this.timer = setInterval(() => {
              this.formatTime(leftTime)
              leftTime -= 1000
              if (leftTime <= 0) {
                this.$router.history.go(0)
                window.clearInterval(this.timer)
              }
            }, 1000)
          }
        }
      })
    },
    formatTime (leftTime) {
      this.hh = Math.floor(leftTime / 1000 / 60 / 60 % 24)
      this.m1 = Math.floor(leftTime / 1000 / 60 % 60 / 10)
      this.m2 = Math.floor(leftTime / 1000 / 60 % 60 % 10)
      this.s1 = Math.floor(leftTime / 1000 % 60 / 10)
      this.s2 = Math.floor(leftTime / 1000 % 60 % 10)
    }, // 快速认证时发送验证码
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
  },
  computed: {
    authInfo () {
      return this.$store.state.authInfo ? this.$store.state.authInfo : null
    },
    authInfoPersion () {
      return this.$store.state.authInfoPersion
    },
  },
  watch: {

  },
  components: {
  }
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
.ddos-active {
  font-family: MicrosoftYaHei;
  text-align: center;
  > img {
    position: absolute;
    z-index: 3;
    top: 940px;
    left: 0;
  }
}
.mb10 {
  margin-bottom: 10px;
}
.headline {
  padding: 50px 0;
  div {
    img:nth-of-type(2) {
      margin: 0 12px;
    }
  }
  p {
    margin-top: 20px;
    font-size: 18px;
    span {
      cursor: pointer;
    }
  }
}
.wrap {
  margin: 0 auto;
  width: 1200px;
}
.btn {
  height: 40px;
  background: linear-gradient(
    128deg,
    rgba(249, 239, 184, 1) 0%,
    rgba(227, 183, 111, 1) 100%
  );
  border-radius: 2px;
  border: none;
  color: #333333;
  font-size: 18px;
}
.pc-nav {
  position: fixed;
  top: 280px;
  left: 0;
  z-index: 100;
}
.nav-a {
  font-size: 14px;
  color: #ffe0a3;
  ul {
    li {
      width: 120px;
      height: 60px;
      padding-top: 10px;
      background: linear-gradient(
        180deg,
        rgba(96, 102, 130, 1) 0%,
        rgba(54, 55, 71, 1) 100%
      );
      color: #ffe0a3;
      cursor: pointer;
      &:hover,
      &.select {
        background: linear-gradient(
          180deg,
          rgba(254, 231, 190, 1) 0%,
          rgba(252, 202, 138, 1) 100%
        );
        color: #222222;
      }
      span {
        display: inline-block;
        margin-bottom: 4px;
      }
    }
  }
  .back {
    width: 120px;
    height: 60px;
    padding-top: 10px;
    background: linear-gradient(
      180deg,
      rgba(96, 102, 130, 1) 0%,
      rgba(54, 55, 71, 1) 100%
    );
    cursor: pointer;
  }
}
.mobile-nav {
  position: fixed;
  top: 280px;
  left: 0;
  z-index: 100;
  width: 36px;
  height: 116px;
  padding: 20px 8px;
  background: linear-gradient(
    180deg,
    rgba(254, 231, 190, 1) 0%,
    rgba(252, 202, 138, 1) 100%
  );
  font-size: 14px;
  line-height: 18px;
  color: #222222;
  cursor: pointer;
  &:hover {
    > .nav {
      display: block;
    }
  }
  .nav {
    display: none;
    position: absolute;
    top: 0px;
    left: 36px;
    // font-size: 14px;
    // color: #ffe0a3;
    // ul {
    //   li {
    //     width: 120px;
    //     height: 60px;
    //     padding-top: 10px;
    //     background: linear-gradient(
    //       180deg,
    //       rgba(96, 102, 130, 1) 0%,
    //       rgba(54, 55, 71, 1) 100%
    //     );
    //     color: #ffe0a3;
    //     cursor: pointer;
    //     &:hover,
    //     &.select {
    //       background: linear-gradient(
    //         180deg,
    //         rgba(254, 231, 190, 1) 0%,
    //         rgba(252, 202, 138, 1) 100%
    //       );
    //       color: #222222;
    //     }
    //     span {
    //       display: inline-block;
    //       margin-bottom: 4px;
    //     }
    //   }
  }
}

.banner {
  background: #2a2936;
  .product {
    .content {
      .text {
        margin-top: -30px;
      }
    }
  }
}
.seckill {
  padding: 50px 0 60px;
  background: url(../../../assets/img/active/ddos/background-2-right.png) 100%
    60% no-repeat;
  background-color: #2a2936;
  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .text {
      text-align: left;
      p {
        font-size: 18px;
        font-family: MicrosoftYaHei-Bold;
        font-weight: bold;
        color: rgba(255, 255, 255, 1);
        line-height: 20px;
        span {
          font-family: MicrosoftYaHei;
          font-weight: normal;
          color: #ffd08c;
          cursor: pointer;
        }
      }
    }
    .timer {
      display: flex;
      justify-content: space-between;
      color: #fff;
      font-size: 18px;
      i {
        padding-top: 10px;
        margin-right: 10px;
        font-style: normal;
      }
      div {
        height: 46px;
        span {
          display: inline-block;
          width: 36px;
          height: 46px;
          margin-left: 10px;
          background: linear-gradient(
            180deg,
            rgba(254, 231, 190, 1) 0%,
            rgba(252, 202, 138, 1) 100%
          );
          font-size: 36px;
          font-weight: bold;
          color: rgba(8, 13, 76, 1);
          line-height: 42px;
          &:nth-of-type(1),
          &:nth-of-type(3) {
            margin-right: 10px;
          }
        }
      }
    }
  }
  .product {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    text-align: left;
    position: relative;
    z-index: 4;
    > div {
      background: #4d4b61;
      width: 224px;
      // height: 390px;
    }
    .head {
      position: relative;
      padding: 25px 0 15px 0;
      border-bottom: 2px solid transparent;
      border-image: url("../../../assets/img/active/ddos/border-bottom.png") 30
        30 stretch;
      color: #fff;
      text-align: center;
      h3 {
        font-size: 20px;
      }
      span {
        display: inline-block;
        padding: 0 6px;
        line-height: 20px;
        font-size: 12px;
        &:nth-of-type(1) {
          position: absolute;
          left: 0;
          top: 0;
        }
        &:nth-of-type(2) {
          position: absolute;
          left: 36px;
          top: 0;
        }
      }
      .hot {
        background: #ff624b;
        color: #fff;
      }
      .new {
        background: #ffd08c;
        color: #333;
      }
    }
    .body {
      color: #fff0de;
      padding: 20px 0px 15px 20px;
      font-size: 14px;
      .params {
        height: 170px;
        > div {
          margin-bottom: 10px;
        }
      }
      .cost {
        > div {
          margin-bottom: 10px;
        }
      }
      .configure {
        padding: 0 20px 10px 0;
        ul {
          display: flex;
          justify-content: space-between;
          li {
            i {
              display: block;
              font-style: normal;
              font-size: 12px;
              font-family: MicrosoftYaHei;
            }
          }
        }
      }
      .label {
        width: 70px;
        font-size: 14px;
      }
      .price {
        color: #ff624b;
        font-size: 12px;
        span {
          font-size: 24px;
          font-weight: bold;
        }
      }
      .origin-price {
        font-size: 12px;
        color: #fff;
        text-decoration: line-through;
      }
      button {
        width: 184px;
      }
    }
  }
  .tips {
    position: relative;
    z-index: 4;
    margin-top: 20px;
    text-align: left;
    font-size: 16px;
    color: #ffd08c;
  }
}
.first-month {
  background: rgba(42, 41, 54, 1);
  .product {
    padding-bottom: 80px;
    text-align: left;
    background: linear-gradient(
      360deg,
      rgba(96, 102, 130, 1) 0%,
      rgba(42, 41, 54, 1) 100%
    );
    ul {
      li {
        display: flex;
        height: 130px;
        margin-bottom: 20px;
      }
    }
    .title {
      width: 220px;
      background: url(../../../assets/img/active/ddos/background-3-item.png);
      padding: 39px 0 0 22px;
      p {
        width: 120px;
        font-size: 20px;
        font-family: MicrosoftYaHei-Bold;
        font-weight: bold;
        color: rgba(255, 208, 140, 1);
        line-height: 26px;
      }
    }
    .content {
      display: flex;
      padding: 25px 30px 25px 40px;
      background: #fff;
      color: #222222;
      .left {
        display: flex;
        justify-content: space-between;
        width: 590px;
        padding: 10px 30px 0 0;
        border-right: 1px solid #e2e4f0;
        dl {
          font-size: 14px;
          dt {
            margin-bottom: 12px;
          }
          dd {
            text-align: center;
            line-height: 35px;
            span {
              display: inline-block;
              width: 60px;
              height: 35px;
              line-height: 33px;
              border: 1px solid rgba(235, 193, 98, 1);
              border-left: none;
              cursor: pointer;
              &:nth-of-type(1) {
                border-left: 1px solid rgba(235, 193, 98, 1);
              }
            }
            .select {
              background: linear-gradient(
                130deg,
                rgba(249, 239, 184, 1) 0%,
                rgba(227, 183, 111, 1) 100%
              );
            }
          }
        }
      }
      .right {
        padding-left: 30px;
        width: 320px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        div {
          .text {
            display: inline-block;
            width: 70px;
            height: 21px;
            background: rgba(88, 85, 112, 1);
            color: #ffd08c;
            line-height: 21px;
            text-align: center;
          }
          p {
            margin: 10px 0 5px 0;
            color: #ff624b;
            font-size: 12px;
            span {
              font-size: 20px;
              font-family: MicrosoftYaHei-Bold;
              font-weight: bold;
            }
          }
          i {
            font-size: 12px;
            text-decoration: line-through;
            font-style: normal;
          }
        }
        button {
          width: 150px;
        }
      }
    }
    .tips {
      text-align: center;
      font-size: 14px;
      color: #fff;
      span {
        margin-left: 10px;
        color: #ffd08c;
        cursor: pointer;
      }
    }
  }
}
.super-discount {
  padding-bottom: 50px;
  background: #e2e4f0
    url(../../../assets/img/active/ddos/background-4-right.png) 100% 70%
    no-repeat;
  .product {
    display: flex;
    justify-content: space-between;
    text-align: left;
    > div {
      width: 285px;
      box-shadow: 0px 3px 10px -3px rgba(195, 205, 230, 0.7);
      // border: 1px solid rgba(220, 226, 242, 1);
    }
    .head {
      width: 285px;
      height: 101px;
      padding: 39px 0 0 34px;
      color: #ffd08c;
      background: url("../../../assets/img/active/ddos/background-4-item.png");
      h3 {
        font-size: 24px;
      }
    }
    .body {
      padding: 30px 20px 20px 20px;
      background: #fff;
      > div {
        margin-bottom: 20px;
      }
      .label {
        display: block;
        margin-bottom: 10px;
        width: 70px;
        font-size: 16px;
      }
      .configure {
        ul {
          li {
            margin-bottom: 10px;
            font-size: 16px;
            i {
              margin-bottom: 10px;
              font-style: normal;
            }
          }
        }
      }
      .time {
        ul {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          li {
            position: relative;
            width: 75px;
            height: 35px;
            border-radius: 2px;
            border: 1px solid rgba(235, 193, 98, 1);
            line-height: 33px;
            text-align: center;
            font-size: 14px;
            color: #222222;
            cursor: pointer;
            &:nth-child(3n + 3) {
              margin-right: 0;
            }
            span {
              position: absolute;
              top: -12px;
              right: -5px;
              display: inline-block;
              width: 32px;
              height: 18px;
              background: rgba(246, 109, 89, 1);
              font-size: 12px;
              color: rgba(255, 255, 255, 1);
              line-height: 16px;
            }
          }
          .selected {
            background: linear-gradient(
              90deg,
              rgba(249, 239, 184, 1) 0%,
              rgba(227, 183, 111, 1) 100%
            );
          }
        }
      }
      .price {
        margin-bottom: 5px;
        color: #ff624b;
        font-size: 16px;
        span {
          font-size: 28px;
          font-weight: bold;
        }
      }
      .origin-price {
        font-size: 16px;
        color: #999999;
        text-decoration: line-through;
      }
      button {
        width: 100%;
      }
      .text {
        margin-top: 15px;
        color: #ff624b;
        font-size: 14px;
      }
    }
  }
  .tips {
    margin-top: 20px;
    font-size: 14px;
    color: #606682;
    cursor: pointer;
  }
}
.give-time {
  padding-bottom: 100px;
  background: #606682;
  .product {
    ul {
      display: flex;
      justify-content: space-between;
      li {
        width: 590px;
        box-shadow: 0px 0px 20px -5px rgba(0, 0, 0, 0.5);
      }
    }
    .top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 36px 40px;
      background: #3e3c4d;
      color: #fff;
      text-align: left;
      .left {
        p {
          font-size: 20px;
          &:nth-of-type(1) {
            margin-bottom: 10px;
            font-size: 24px;
            font-family: MicrosoftYaHei-Bold;
            font-weight: bold;
            span {
              color: #ff624b;
            }
          }
        }
      }
      .right {
        color: #ff624b;
        font-size: 48px;
        font-family: MicrosoftYaHei-Bold;
        font-weight: bold;
        span {
          font-size: 80px;
        }
        i {
          font-size: 40px;
          font-style: normal;
          vertical-align: text-top;
        }
      }
    }
    button {
      width: 100%;
      height: 52px;
      font-size: 20px;
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
  width: 500px;
  .header {
    height: 66px;
    padding-top: 20px;
    padding-right: 30px;
    font-size: 20px;
    color: #ffd08c;
    background: linear-gradient(
      90deg,
      rgba(12, 12, 27, 1) 0%,
      rgba(34, 36, 61, 1) 55%,
      rgba(12, 12, 27, 1) 100%
    );
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
    text-align: left;
    font-size: 16px;
    color: #333333;
    p {
      margin-bottom: 10px;
      line-height: 24px;
    }
    dl {
      margin-bottom: 10px;
      dd {
        line-height: 19px;
      }
    }
  }
  .footer {
    padding: 0 30px 30px 30px;
    font-size: 18px;
    color: rgba(31, 31, 114, 1);
    .wrap-f {
      padding-top: 30px;
      border-top: 1px solid rgba(233, 233, 233, 1);
    }
    button {
      width: 150px;
    }
  }
}
.ivu-table td.demo-table-info-column {
  background-color: #2db7f5;
  color: #fff;
}
@media (max-width: 1366px) {
  .mobile-nav {
    display: block;
  }
  .pc-nav {
    display: none;
  }
}
@media (min-width: 1367px) {
  .mobile-nav {
    display: none;
  }
  .pc-nav {
    display: block;
  }
}
</style>
