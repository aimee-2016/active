<template>
  <div>
    <div class="free-host">
      <div class="wrap">
        <img class="pc" src="../../../../assets/img/active/freeToReceive.1/free-host-text.png" />
        <img class="mobile" src="../../../../assets/img/active/deposit/m-banner.png" />
        <div class="main">
          <div class="tabs">
            <div :class="{selected:currentView=='child1'}">
              <span class="bar"></span>
              <a href="javascript:void(0)" @click="tabChange('child1')">免费领云产品</a>
            </div>
            <div :class="{selected:currentView=='child2'}">
              <span class="bar"></span>
              <a href="javascript:void(0)" @click="tabChange('child2')">天天特惠活动</a>
            </div>
          </div>
          <div class="container">
            <div class="deposite-host" v-if="currentView=='child1'">
              <div class="wrap">
                <div class="product">
                  <div v-for="(item,index) in depositeList" :key="index">
                    <div class="head">
                      <span class="cer" v-if="item.post.certification==3">企业用户专享</span>
                      <h3>{{titleD(item.post)}}</h3>
                      <p v-if="item.post.servicetype=='G5500'">
                        <span>{{item.post.bandwith}}M带宽</span>
                        <span>{{item.post.disksize}}G系统盘</span>
                      </p>
                    </div>
                    <div class="body" v-if="item.post.servicetype!='G5500'">
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
                          <li v-if="item.post.servicetype!='db'">
                            <i>宽带</i>
                            <span>{{item.post.bandwith}}M</span>
                          </li>
                          <li>
                            <i>系统盘</i>
                            <span v-if="item.post.servicetype!='db'">
                              {{item.post.disksize}}G
                              <span>SSD</span>
                            </span>
                            <span v-else>40G</span>
                          </li>
                          <li v-if="item.post.servicetype=='db'">
                            <i>数据盘</i>
                            <span>100G</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div class="body">
                      <div v-if="item.post.servicetype=='G5500'" class="mb15 mt5">
                        <span class="label">配置：</span>
                        <Select
                          v-model="item.gpuConfigIndex"
                          style="width:184px"
                          placeholder=" "
                          @on-change="changConfigGPUD(item)"
                        >
                          <Option
                            v-for="(item1,index1) in item.postArr"
                            :value="index1"
                            :key="index1"
                          >{{ item1.cpu+'核'+item1.mem+'G'+' '+item1.gpusize+'*NVIDIA P100' }}</Option>
                        </Select>
                      </div>
                      <div class="mb15">
                        <span class="label">区域：</span>
                        <Select
                          v-model="item.zoneId"
                          style="width:184px"
                          @on-change="changeZoneD(item)"
                        >
                          <Option
                            v-for="item1 in item.zoneList"
                            :value="item1.value"
                            :key="item1.value"
                          >{{ item1.name }}</Option>
                        </Select>
                      </div>
                      <div class="mb15">
                        <span class="label" v-if="item.post.servicetype=='db'">镜像系统：</span>
                        <span class="label" v-else>系统：</span>
                        <Cascader
                          :data="item.systemList"
                          v-model="item.system"
                          style="width:184px;"
                        ></Cascader>
                      </div>
                      <div class="price">
                        价格：¥
                        <span>{{0+'/'}}</span>
                        {{monthD(item.post.days)}}
                      </div>
                      <div class="origin-price">
                        保证金：¥
                        <span>{{item.price+'/'+monthD(item.post.days)}}</span>
                      </div>
                      <div class="origin-price line-thr">
                        原价：¥
                        <span>{{item.originPrice}}</span>
                      </div>
                      <Button @click="pushOrderD(item)">免费领取</Button>
                    </div>
                  </div>
                </div>
                <div class="tips">
                  新用户专享，为防止恶意刷抢免费云资源，遂需缴纳保证金，保证金随时可退
                  <span
                    class="blue"
                    @click="showModal.rule=true"
                  >活动规则></span>
                  <span class="red">领取优惠券></span>
                </div>
                <div class="tips">
                  温馨提示：使用期间若到“百度口碑”发布使用体验等相关评论，截图联系发送至在线客服，可领取满200减100优惠券
                  <a
                    href="https://koubei.baidu.com/s/510a4f5f6316c2d0f81b3e63bc75b537?fr=search"
                    target="blank"
                    style="text-decoration: underline;"
                  >点击发布评论></a>
                </div>
                <div class="renew">
                  <div class="head-g">
                    <img src="../../../../assets/img/active/deposit/num1.png" alt="数字1" />
                    <div>
                      <h3>续费尊享 看看你能省多少</h3>
                      <p>
                        <span @click="showModal.ruleHost=true">活动规则></span>
                      </p>
                    </div>
                  </div>
                  <div class="content">
                    <div v-for="(item,index) in renewHostList" :key="index" class="item">
                      <div class="icon-text">个人/企业续费优惠</div>
                      <h4>{{item.cpu+'核'+item.memery+'G云服务器'}}</h4>
                      <div class="box">
                        <div class="left">
                          <div class="row">
                            <i>系统盘</i>
                            <div>
                              <span class="bold">{{item.ssd}}G SSD</span>
                            </div>
                          </div>
                          <div class="row">
                            <i>带宽</i>
                            <div>
                              <RadioGroup
                                v-model="item.bandwidth"
                                type="button"
                                v-if="item.bandwidth!=5"
                                @on-change="changeBandwith(item.bandwidth,item)"
                              >
                                <Radio
                                  v-for="(item1,index) in item.bandwidthList"
                                  :key="index"
                                  :label="item1"
                                >{{item1}}M</Radio>
                              </RadioGroup>
                              <span class="bold" v-else>{{item.bandwidth}}M</span>
                            </div>
                          </div>
                          <div class="row">
                            <i>续费时长</i>
                            <div>
                              <Select
                                v-model="item.time"
                                style="width:200px"
                                @on-change="getRenewPrice(item)"
                              >
                                <Option
                                  v-for="item1 in item.timeList"
                                  :value="item1"
                                  :key="item1"
                                >{{ renewtime(item1) }}</Option>
                              </Select>
                            </div>
                          </div>
                        </div>
                        <div class="right">
                          <div class="row">
                            <i>续费价：</i>
                            <div>
                              <span>¥{{item.price}}</span>
                            </div>
                          </div>
                          <div class="row">
                            <i>原价：¥{{item.originPrice}}</i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="update">
                  <div class="head-g">
                    <img src="../../../../assets/img/active/deposit/num2.png" alt="数字2" />
                    <div>
                      <h3>升级配置 立享优惠</h3>
                      <p>
                        已参与免费领云产品的用户，升级云服务器配置或带宽即可享受优惠
                        <span @click="showModal.ruleCoupon=true">活动规则></span>
                      </p>
                    </div>
                  </div>
                  <div class="content">
                    <div v-for="(item,index) in updateList" :key="index">
                      <h4>{{item.name}}</h4>
                      <div class="box">
                        <div v-for="(item1,index) in item.configs" :key="index" class="item">
                          <div>
                            <span class="icon">升至</span>
                            {{item1.params}}
                          </div>
                          <p>
                            立享
                            <span>{{item1.discount}}</span>
                            折优惠
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="low-discount" v-if="currentView=='child2'">
              <div class="wrap">
                <div class="product">
                  <div v-for="(item,index) in allList" :key="index">
                    <div class="head">
                      <h3>
                        {{titleL(item)}}
                        <span
                          v-if="item.post.servicetype!='ticket'"
                        >{{item.post.cpu+'核'+item.post.mem+'G'}}</span>
                      </h3>
                    </div>
                    <div class="body" v-if="item.post.servicetype!='ticket'">
                      <div>
                        <span class="label">带宽：</span>
                        {{item.post.bandwith}}M
                      </div>
                      <div v-if="item.post.servicetype=='G5500'" style="margin-top:-20px;margin-bottom:0px;">
                        <span class="label">配置：</span>
                        {{item.post.gpusize}}* NVIDIA P100
                      </div>
                      <div>
                        <span class="label">区域：</span>
                        <Select
                          v-model="item.zoneId"
                          style="width:142px"
                          @on-change="changeZoneL(item)"
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
                          style="width:142px;"
                        ></Cascader>
                      </div>
                      <div class="time">
                        <span class="label">时长：</span>
                        <i
                          v-if="item.postArr.length<2"
                          style="font-style:normal;" :style="{marginBottom:item.post.servicetype=='G5500'?'0px':'12px'}"
                        >{{monthL(item.post.days)}}</i>
                        <ul v-else>
                          <li
                            v-for="(item1,index1) in item.postArr"
                            :key="index1"
                            :class="{'selected':item.post.days==item1.days}"
                            @click="changgeTimeL(item,item1)"
                          >
                            {{monthL(item1.days)}}
                            <!-- <span>{{item1.discount}}折</span> -->
                          </li>
                        </ul>
                      </div>
                      <div class="price">
                        价格：￥
                        <span>{{item.price}}</span>
                      </div>
                      <Button @click="pushOrderL(item)">立即抢购</Button>
                    </div>
                    <div class="body coupen" v-else>
                      <div style="margin-bottom:5px;">
                        <span class="label" style="width:70px">抵扣金额：</span>
                        {{item.post.money}}元
                      </div>
                      <div style="margin-bottom:5px;">
                        <span class="label" style="width:70px">使用条件：</span>
                        无门槛
                      </div>
                      <div>
                        <span class="label" style="width:70px">使用方法：</span>
                        <div>购买域名时抵扣</div>
                      </div>
                      <div style="margin-bottom:25px;">
                        <span class="label" style="width:70px">使用时间：</span>
                        <div>自领取之日1个月内使用</div>
                      </div>
                      <Button @click="pushOrderL(item)">立即抢购</Button>
                    </div>
                  </div>
                </div>
                <div class="tips">*以上配置GPU云服务器为128G系统盘，其他弹性云服务器均为40G SSD系统盘。</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
                  <Radio
                    label="选择GPU服务器"
                    style="color:#4768B1;margin-top:40px;margin-bottom:20px;font-size:18px;"
                  ></Radio>
                  <div ref="summary-host-select">
                    <Select v-model="selectConfig" placeholder=" " @on-change="changConfigGPU">
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
                  <Select v-model="selectBandWidth">
                    <Option v-for="item in bandWidthList" :value="item" :key="item">{{item}}M</Option>
                  </Select>
                </div>
                <div>
                  <span class="label">系统选择</span>
                  <Cascader :data="summarySystemList" v-model="selectSummarySystem"></Cascader>
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
                  <Select v-model="selectTime">
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
                </div>
                <Button @click="pushOrderHost()" v-if="configLength==2">立即购买</Button>
                <Button @click="pushOrderGpu()" v-else>立即购买</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 活动规则 -->
    <transition name="fade">
      <div class="overlay" @click.stop="showModal.rule=true" v-if="showModal.rule">
        <div class="rule-modal" style="max-height: 80%;overflow-y: auto;">
          <div class="header">
            <span>活动规则</span>
            <img src=../../../../assets/img/active/freeToReceive.1/close-icon.png alt="关闭图标" @click.stop="showModal.rule=false">
          </div>
          <div class="body">
            <p>1、活动时间：2019年5月7日开始，总量有限，先到先得！</p>
            <p>2、活动对象：新注册或者一直未使用过平台资源（第三方产品除外）及未参加过其他免费活动并已通过实名认证的用户。</p>
            <dl>
              <dt>3、活动内容：</dt>
              <dd>（1）活动产品需充值对应的保证金后方可使用；云服务器未到期可自行删除，删除后或者云服务器使用到期后，用户可解冻保证金。</dd>
              <dd>（2）若您需要续费保证金云服务器，可选择在云服务器未到期之前将保证金转换为云服务器续费费用，续费后云服务器最长可使用3年。</dd>
            </dl>
            <p>4、解冻操作流程：进入控制台，点击右上角用户名，选择【费用中心】，在账户概览中点击【历史冻结记录】，在弹出的弹窗中选择需要解冻的保证金，点击【申请解冻】，根据弹窗提示完成操作。</p>
            <dl>
              <dt>5、活动规则：</dt>
              <dd>（1）每个用户只能参与一次，同一手机号对应的多个账号、同一实名认证用户等满足同一条件的均视为一个用户。</dd>
              <dd>（2）免费产品中的资源可随时进行升级，升级费用按新睿云标准收费进行收取。</dd>
              <dd>（3）在各产品免费使用期间，若对免费资源进行了销毁，则视为放弃免费使用权。</dd>
            </dl>
            <p>6、活动声明：为保证活动的公平公正，新睿云有权对恶意刷抢（如通过程序等技术手段）活动资源，领取后3天内未使用资源、利用资源从事违法违规行为的用户收回免费套餐使用资格。因此造成任何损失的，由该用户自行负责。</p>
            <p>7、请注意：在未支付订单情况下，系统会对您的资格造成误判，需要您将账号下未支付订单作废后，即可正常参与。</p>
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
            <img src=../../../../assets/img/active/freeToReceive.1/close-icon.png alt="关闭图标" @click.stop="showModal.ruleHost=false">
          </div>
          <div class="body">
            <p>1、活动时间：2019年8月28日开始。</p>
            <p>2、活动对象：已参与免费活动的用户。</p>
            <dl>
              <dt>3、活动内容：</dt>
              <dd>（1）若免费产品快到期时后期不再使用，将删除资源或者云服务器使用到期后，用户可解冻保证金。</dd>
              <dd>（2）若您需要续费保证金云服务器，可选择在云服务器未到期之前将保证金转换为云服务器续费费用，续费后云服务器最长可使用3年。</dd>
              <dd>（3）续费金额将按照选择的时间进行保证金抵扣续费。</dd>
              <dd>（4）保证金转续费时间说明：续费时间根据用户到期后加上续费的日期，不影响免费的使用时长。</dd>
            </dl>
            <p>4、此次活动产品不能用于转售，如若利用资源从事违法违规行为的用户，新睿云有权收回使用资格，并且不予退款。</p>
            <p>
              5、请注意：在未支付订单情况下，系统会对您的资格造成误判，需要您将账号下未支付订单作废后，即可正常参与。
              <a
                href="https://i.xinruiyun.cn/expenses"
                style="color:#2A99F2"
              >去订单管理</a>
            </p>
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
            <img src=../../../../assets/img/active/freeToReceive.1/close-icon.png alt="关闭图标" @click.stop="showModal.ruleCoupon=false">
          </div>
          <div class="body">
            <p>1、活动时间：2019年8月28日开始。</p>
            <p>2、活动对象：已参与免费活动的用户。</p>
            <p>3、数量限制：每个用户限领取一次，有效期为1年。</p>
            <p>4、配置升级说明：参与免费用1年的用户在升级CPU及带宽后，需要到期后才能退换保证金，不能提前退还，升级费用不予退款。</p>
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
// import child1 from './freeHost';
// import child2 from './lowDiscount';
import axios from 'axios'
import reg from '../../../../util/regExp'
import VueQArt from 'vue-qart'
import $ from 'jquery'
export default {
  data () {
    return {
      showModal: {
        // rechargeHint: false,
        // inConformityModal: false,
        // getSuccessModal: false,
        // payDefeatedModal: false,
        // paySuccessModal: false,
        // weChatRechargeModal: false,
        // orderConfirmationModal: false,
        // authentication: false,
        // authenticationSuccess: false,
        // authenticationError: false,
        rule: false,
        ruleHost: false,
        ruleCoupon: false,
      },
      // 天天特惠参数
      allList: [],
      lowHostList: [
        {
          post: {
            servicetype: "host",
            bandwith: 2,
            cost: 69,
            cpu: 2,
            mem: 4,
            days: 30,
            disksize: 40,
            disktype: "ssd",
            id: 497
          },
          postArr: [],
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
          zoneId: '',
          price: '69',
          originPrice: '176.72',
        },
        {
          post: {
            servicetype: "host",
            bandwith: 2,
            cost: 69,
            cpu: 2,
            mem: 8,
            days: 360,
            disksize: 40,
            disktype: "ssd",
            id: 497
          },
          postArr: [],
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
          zoneId: '',
          price: '69',
          originPrice: '176.72',
        },
        {
          post: {
            servicetype: "host",
            bandwith: 2,
            certification: 3,
            cost: 69,
            cpu: 2,
            mem: 8,
            days: 360,
            disksize: 40,
            disktype: "ssd",
            id: 497
          },
          postArr: [],
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
          zoneId: '',
          price: '69',
          originPrice: '176.72',
        },
        {
          post: {
            servicetype: "db",
            bandwith: 2,
            cost: 69,
            cpu: 2,
            mem: 8,
            days: 60,
            disksize: 40,
            disktype: "ssd",
            id: 497
          },
          postArr: [],
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
          zoneId: '',
          price: '69',
          originPrice: '176.72',
        },
        {
          post: {
            servicetype: "G5500",
            bandwith: 2,
            cost: 69,
            cpu: 2,
            mem: 8,
            days: 3,
            disksize: 40,
            disktype: "ssd",
            id: 497
          },
          postArr: [],
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
          zoneId: '',
          price: '69',
          originPrice: '176.72',
          gpuConfigIndex: 0,
        },
        {
          post: {
            servicetype: "host",
            bandwith: 2,
            cost: 69,
            cpu: 2,
            mem: 4,
            days: 30,
            disksize: 40,
            disktype: "ssd",
            id: 497
          },
          postArr: [],
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
          zoneId: '',
          price: '69',
          originPrice: '176.72',
        },
        {
          post: {
            servicetype: "host",
            bandwith: 2,
            cost: 69,
            cpu: 2,
            mem: 8,
            days: 360,
            disksize: 40,
            disktype: "ssd",
            id: 497
          },
          postArr: [],
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
          zoneId: '',
          price: '69',
          originPrice: '176.72',
        },
        // {
        //   post: {
        //     servicetype: "host",
        //     bandwith: 2,
        //     certification: 3,
        //     cost: 69,
        //     cpu: 2,
        //     mem: 8,
        //     days: 360,
        //     disksize: 40,
        //     disktype: "ssd",
        //     id: 497
        //   },
        //   postArr: [],
        //   systemList: [{
        //     value: 'window',
        //     label: 'Windows',
        //     children: []
        //   }, {
        //     value: 'centos',
        //     label: 'Centos',
        //     children: [],
        //   },
        //   {
        //     value: 'debian',
        //     label: 'Debian',
        //     children: [],
        //   },
        //   {
        //     value: 'ubuntu',
        //     label: 'Ubuntu',
        //     children: [],
        //   }],
        //   system: [],
        //   zoneList: [],
        //   zoneId: '',
        //   price: '69',
        //   originPrice: '176.72',
        // },
      ],
      gpuList: [
        {
          post: {
            servicetype: "host",
            bandwith: 2,
            cost: 69,
            cpu: 2,
            mem: 4,
            days: 30,
            disksize: 40,
            disktype: "ssd",
            id: 497
          },
          postArr: [],
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
          zoneId: '',
          price: '69',
          originPrice: '176.72',
        },
      ],
      coupenList: [
        { post: {} }
      ],
      //结束
      // 免费领取云主机参数
      updateList: [
        {
          name: '云服务器任意配置升级至以下配置',
          configs: [
            {
              params: '2核8G',
              discount: '4'
            },
            {
              params: '4核8G',
              discount: '3'
            },
            {
              params: '4核16G',
              discount: '2.1'
            },
          ],
        },
        {
          name: '弹性IP任意配置升级至以下配置',
          configs: [
            {
              params: '5M带宽',
              discount: '3.5'
            },
            {
              params: '10M带宽',
              discount: '2.1'
            },
          ],
        }
      ],
      renewHostList: [
        {
          cpu: 2,
          memery: 4,
          ssd: '40',
          bandwidthList: [1, 2],
          bandwidth: 1,
          timeList: [360],
          time: 360,
          price: 1099.00,
          originPrice: 5201.28,
        },
        {
          cpu: 4,
          memery: 8,
          ssd: '40',
          bandwidthList: [5],
          bandwidth: 5,
          timeList: [180, 360, 720],
          time: 180,
          price: 1269.00,
          originPrice: 3112.31,
        },
      ],
      depositeList: [
        {
          post: {
            servicetype: "host",
            bandwith: 2,
            cost: 69,
            cpu: 2,
            mem: 4,
            days: 30,
            disksize: 40,
            disktype: "ssd",
            id: 497
          },
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
          zoneId: '',
          price: '69',
          originPrice: '176.72',
        },
        {
          post: {
            servicetype: "host",
            bandwith: 2,
            cost: 69,
            cpu: 2,
            mem: 8,
            days: 360,
            disksize: 40,
            disktype: "ssd",
            id: 497
          },
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
          zoneId: '',
          price: '69',
          originPrice: '176.72',
        },
        {
          post: {
            servicetype: "host",
            bandwith: 2,
            certification: 3,
            cost: 69,
            cpu: 2,
            mem: 8,
            days: 360,
            disksize: 40,
            disktype: "ssd",
            id: 497
          },
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
          zoneId: '',
          price: '69',
          originPrice: '176.72',
        },
        {
          post: {
            servicetype: "db",
            bandwith: 2,
            cost: 69,
            cpu: 2,
            mem: 8,
            days: 60,
            disksize: 40,
            disktype: "ssd",
            id: 497
          },
          systemList: [
            {
              value: 'mysql',
              label: 'mysql',
              children: [],
            },
            {
              value: 'redis',
              label: 'redis',
              children: []
            }, {
              value: 'postgresql',
              label: 'postgresql',
              children: [],
            }
          ],
          system: [],
          zoneList: [],
          zoneId: '',
          price: '69',
          originPrice: '176.72',
        },
        {
          post: {
            servicetype: "G5500",
            bandwith: 2,
            cost: 69,
            cpu: 2,
            mem: 8,
            days: 3,
            disksize: 40,
            disktype: "ssd",
            id: 497
          },
          postArr: [],
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
          zoneId: '',
          price: '69',
          originPrice: '176.72',
          gpuConfigIndex: 0,
        },
      ],
      //结束
      // 云服务器大集合参数
      currentView: 'child1',
      single: '选择云服务器',
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
      count: 1,
      // 结束
    }
  },
  created () {
    this.getZoneList()
    this.getConfigureD()
    this.promise()
  },
  mounted () {

  },
  methods: {
    // 天天特惠函数
    promise () {
      let reshost = axios.get('activity/getActInfo.do', {
        params: {
          activityNum: '58'
        }
      })
      let resgpu = axios.get('activity/getActInfo.do', {
        params: {
          activityNum: '61'
        }
      })
      let rescoupen = axios.get('activity/getActTicket.do', {
        params: {
          activityNum: '62'
        }
      })
      Promise.all([reshost, resgpu, rescoupen]).then(res => {
        if (res[0].status == 200 && res[0].data.status == 1 && res[1].status == 200 && res[1].data.status == 1 && res[2].status == 200 && res[2].data.status == 1) {
          // this.$Message.success('订单提交成功')
          // this.$router.push({
          //   path: '/order', query: {
          //     countOrder
          //   }
          // })
          this.getConfigureL(res[0])
          this.getConfigureGPUL(res[1])
          this.getCoupen(res[2])
        }
      })

    },
    getConfigureL (res) {
      if (res.data.status == 1 && res.status == 200) {
        let receiveVal = res.data.result.freevmconfigs
        let newArr = []
        // 数组去重（相同配置的）
        for (var i = 0; i < receiveVal.length; i++) {
          for (var j = 0; j < newArr.length; j++) {
            if (receiveVal[i].cpu == newArr[j].cpu && receiveVal[i].mem == newArr[j].mem && receiveVal[i].bandwith == newArr[j].bandwith) {
              break
            }
          }
          if (j == newArr.length) {
            newArr[newArr.length] = receiveVal[i];
          }
        }
        // console.log(newArr)
        this.lowHostList.forEach((item, index) => {
          item.post = newArr[index]
          item.zoneList = res.data.result.optionalArea
          // 设置默认区域
          item.zoneId = item.zoneList[0].value
          // 设置默认系统
          this.changeZoneL(item)
        })
        for (var i = 0; i < receiveVal.length; i++) {
          for (var j = 0; j < this.lowHostList.length; j++) {
            if (receiveVal[i].cpu == this.lowHostList[j].post.cpu && receiveVal[i].mem == this.lowHostList[j].post.mem && receiveVal[i].bandwith == this.lowHostList[j].post.bandwith) {
              this.lowHostList[j].postArr.push(receiveVal[i])
            }
          }
        }
        // console.log(this.lowHostList)
      }
    },
    getConfigureGPUL (res) {
      if (res.data.status == 1 && res.status == 200) {
        this.gpuList.forEach((item, index) => {
          item.post = res.data.result.freevmconfigs[index]
          item.zoneList = res.data.result.optionalAreaGpu
          // 设置默认区域
          item.zoneId = item.zoneList[0].value
          // 设置默认系统
          this.changeZoneL(item)
        })
        // console.log(this.allList)
      }
    },
    getCoupen (res) {
      if (res.data.status == 1 && res.status == 200) {
        this.coupenList.forEach((item, index) => {
          item.post = res.data.result.freevmconfigs[index]
        })
        // console.log(this.coupenList)
        this.allList = (this.lowHostList.concat(this.gpuList)).concat(this.coupenList)
      }
    },
    changgeTimeL (item, select) {
      // console.log(item)
      item.post = select
      this.getPriceL(item)
    },
    changeZoneL (item) {
      this.getSystemL(item)
      this.getPriceL(item)
    },
    getSystemL (item) {
      let url = ''
      let systemType = ''
      let showName = ''
      if (item.post.servicetype == 'db') {
        url = 'database/listDbTemplates.do'
        systemType = 'mysql'
        showName = 'dbname'
      } else {
        url = 'information/listTemplates.do'
        systemType = 'window'
        showName = 'templatedescript'
      }
      axios.get(url, {
        params: {
          zoneId: item.zoneId,
        }
      }).then(res => {
        if (res.status == 200 && res.data.status == 1) {
          var x
          for (x in res.data.result) {
            item.systemList.forEach(item => {
              if (item.value == x) {
                item.children = res.data.result[x]
              }
            })
          }
          item.systemList.forEach(item => {
            item.children.forEach(item => {
              item.value = item.systemtemplateid
              item.label = item[showName]
            })
          })
          item.systemList.forEach((item, index) => {
            if (item.children.length == 0) {
              item.disabled = true
            }
          })
          // 设置默认系统
          item.system = [systemType, res.data.result[systemType][0].systemtemplateid]
        }
      })
    },
    getPriceL (item) {
      let params = {}
      if (item.post.days <= 7) {
        params = {
          zoneId: item.zoneId,
          vmConfigId: item.post.id,
        }
      } else {
        params = {
          zoneId: item.zoneId,
          vmConfigId: item.post.id,
          month: item.post.days / 30
        }
      }
      axios.get('activity/getOriginalPrice.do', {
        params: params
      }).then(res => {
        if (res.status == 200 && res.data.status == 1) {
          item.price = res.data.result.cost;
          item.originPrice = res.data.result.originalPrice;
        }
      })
    },
    pushOrderL (item) {
      if (!this.$store.state.userInfo) {
        this.$LR({ type: 'register' })
        return
      }
      if ((!this.authInfo) || (this.authInfo && this.authInfo.authtype == 0 && this.authInfo.checkstatus != 0) || (!this.authInfoPersion && this.authInfo && this.authInfo.authtype == 1 && this.authInfo.checkstatus != 0) || (this.authInfoPersion && this.authInfoPersion.checkstatus != 0 && this.authInfo && this.authInfo.checkstatus != 0)) {
        this.showModal.authentication = true
        // this.$message.info({
        //       content: '未实名认证'
        //     })
        return
      }
      let url = 'information/getDiskcountMv.do'
      let params = {
        defzoneid: item.zoneId,
        vmConfigId: item.post.id,
        osType: item.system[1]
      }
      if (item.post.servicetype == 'ticket') {
        url = 'activity/getActTicket.do'
        params = { activityNum: 62 }
      } else if (item.post.servicetype == 'G5500') {
        url = 'activity/getDiskcountGPU.do'
      }
      axios.get(url, {
        params: params
      }).then(res => {
        if (res.status == 200 && res.data.status == 1) {
          if (item.post.servicetype == 'ticket') {
            this.$message.info({
              content: res.data.message
            })
          } else {
            this.$Message.success('创建订单成功')
            window.open('https://i.xinruiyun.cn/order', '_self')
          }
        } else {
          this.$message.info({
            content: res.data.message
          })
        }
      })
    },
    monthL (val) {
      let text = ''
      if (val >= 360) {
        text = val / 360 + '年'
      } else if (val >= 30) {
        text = val / 30 + '个月'
      } else {
        text = val + '天'
      }
      return text
    },
    titleL (val) {
      // console.log(val.post)
      let result = ''
      switch (val.post.servicetype) {
        case 'host':
          result = '云服务器'
          break
        case 'ticket':
          result = '域名抵用券'
          break
        case 'G5500':
          result = 'GPU云服务器'
          break
        default:
          result = '1213'
      }
      return result
    },
    //结束
    //免费领取云服务器方法
    getConfigureD () {
      let url = 'activity/getTemActInfoById.do'
      axios.get(url, {
        params: {
          activityNum: '57'
        }
      }).then(res => {
        if (res.data.status == 1 && res.status == 200) {
          let gpuConfigList = res.data.result.freevmconfigs.filter((item, index) => {
            return item.servicetype == 'G5500'
          })
          // console.log(gpuConfigList)
          this.depositeList.forEach((item, index) => {
            item.post = res.data.result.freevmconfigs[index]
            if (item.post.servicetype == 'G5500') {
              item.zoneList = res.data.result.optionalAreaGpu
              item.postArr = gpuConfigList
            } else {
              item.zoneList = res.data.result.optionalArea
            }
            if (item.zoneList.length > 0) {
              // 设置默认区域
              item.zoneId = item.zoneList[0].value
              // 设置默认系统
              this.getSystemD(item)
            }
          })
        }
      })
    },
    changeZoneD (item) {
      this.getSystemD(item)
      this.getPriceD(item)
    },
    getSystemD (item) {
      let url = ''
      let systemType = ''
      let showName = ''
      if (item.post.servicetype == 'db') {
        url = 'database/listDbTemplates.do'
        systemType = 'mysql'
        showName = 'dbname'
      } else {
        url = 'information/listTemplates.do'
        systemType = 'window'
        showName = 'templatedescript'
      }
      axios.get(url, {
        params: {
          zoneId: item.zoneId,
        }
      }).then(res => {
        if (res.status == 200 && res.data.status == 1) {
          var x
          for (x in res.data.result) {
            item.systemList.forEach(item => {
              if (item.value == x) {
                item.children = res.data.result[x]
              }
            })
          }
          item.systemList.forEach(item => {
            item.children.forEach(item => {
              item.value = item.systemtemplateid
              item.label = item[showName]
            })
          })
          item.systemList.forEach((item, index) => {
            if (item.children.length == 0) {
              item.disabled = true
            }
          })
          // 设置默认系统
          item.system = [systemType, res.data.result[systemType][0].systemtemplateid]
        }
      })
    },
    getPriceD (item) {
      let params = {}
      if (item.post.servicetype == 'G5500') {
        params = {
          zoneId: item.zoneId,
          vmConfigId: item.post.id,
        }
      } else {
        params = {
          zoneId: item.zoneId,
          vmConfigId: item.post.id,
          month: item.post.days / 30
        }
      }
      axios.get('activity/getOriginalPrice.do', {
        params: params
      }).then(res => {
        if (res.status == 200 && res.data.status == 1) {
          item.price = res.data.result.cost;
          item.originPrice = res.data.result.originalPrice;
        }
      })
    },
    pushOrderD (item) {
      if (!this.$store.state.userInfo) {
        this.$LR({ type: 'register' })
        return
      }
      if ((!this.authInfo) || (this.authInfo && this.authInfo.authtype == 0 && this.authInfo.checkstatus != 0) || (!this.authInfoPersion && this.authInfo && this.authInfo.authtype == 1 && this.authInfo.checkstatus != 0) || (this.authInfoPersion && this.authInfoPersion.checkstatus != 0 && this.authInfo && this.authInfo.checkstatus != 0)) {
        this.showModal.authentication = true
        // this.$message.info({
        //       content: '未实名认证'
        //     })
        return
      }
      axios.get('information/getDiskcountMv.do', {
        params: {
          defzoneid: item.zoneId,
          vmConfigId: item.post.id,
          osType: item.system[1]
        }
      }).then(res => {
        if (res.status == 200 && res.data.status == 1) {
          this.$Message.success('创建订单成功')
          window.open('https://i.xinruiyun.cn/order', '_self')
        } else {
          this.$message.info({
            content: res.data.message
          })
        }
      })
    },
    changConfigGPUD (item) {
      item.post = item.postArr[item.gpuConfigIndex]
      this.getPriceD(item)
    },
    changeBandwith (val, item) {
      if (val == 2) {
        item.timeList = [30, 90, 180, 360, 720]
      } else {
        item.timeList = [360]
      }
      item.time = item.timeList[0]
      this.getRenewPrice(item)
    },
    getRenewPrice (item) {
      let url = 'activity/getRenewalOriginalPrice.do'
      axios.get(url, {
        params: {
          cpu: item.cpu,
          mem: item.memery,
          bandwith: item.bandwidth,
          days: item.time,
          activityNum: '60'
        }
      }).then(res => {
        if (res.data.status == 1 && res.status == 200) {
          item.price = res.data.result.cost
          item.originPrice = res.data.result.originalPrice
        }
      })
    },
    monthD (val) {
      let text = ''
      if (val >= 360) {
        text = '年'
        if (val / 360 > 1) {
          text = val / 360 + '年'
        }
      } else if (val >= 30) {
        text = '月'
        if (val / 30 > 1) {
          text = val / 30 + '个月'
        }
      } else {
        text = '天'
        if (val > 1) {
          text = val + '天'
        }
      }
      return text
    },
    titleD (val) {
      let result = ''
      switch (val.servicetype) {
        case 'host':
          if (val.days == 360) {
            result = '包年云服务器'
          } else if (val.days == 30)
            result = '包月云服务器'
          break
        case 'db':
          result = '云数据库'
          break
        case 'G5500':
          result = 'GPU服务器'
          break
        default:
          result = ''
      }
      return result
    },
    renewtime (val) {
      let text = ''
      if (val >= 360) {
        text = val / 360 + '年'
      } else if (val >= 30) {
        text = val / 30 + '个月'
      }
      return text
    },
    //结束
    tabChange (tabItem) {
      this.currentView = tabItem;
    },
    init () {
      axios.get('user/GetUserInfo.do').then(response => {
        if (response.status == 200 && response.data.status == 1) {
          this.$store.commit('setAuthInfo', { authInfo: response.data.authInfo, userInfo: response.data.result, authInfoPersion: response.data.authInfo_persion })
        }
      })
    },
    nextStep () {
      // 判断新老用户
      axios.get('activity/jdugeTeam.do', {
        params: {
          sign: 'freeReceive',
          vmConfigId: this.depositList[this.index1].config.id
        }
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
            this.inConformityModalMsg = response.data.result.info
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

      let url = 'activity/getFreeHostNew.do'
      axios.get(url, {
        params: {
          vmConfigId: this.depositList[this.index1].config.id,
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
    },
    toggleZone (zoneId) {
      // 切换默认区域
      axios.get('user/setDefaultZone.do', { params: { zoneId: zoneId } }).then(response => {
      })
      for (var zone of this.$store.state.zoneList) {
        if (zone.zoneid == zoneId) {
          $store.commit('setZone', zone);
        }
      }
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

    changConfigHost (config) {
      let originLength = this.configLength
      this.configLength = config.split(',').length
      this.selectConfig = config
      if (this.configLength != originLength) {
        // console.log('进入2')
        this.changzone(this.hostZoneList[0].zoneid)
      }
    },
    changConfigGPU (config) {
      let originLength = this.configLength
      this.configLength = config.split(',').length
      this.selectConfig = config
      if (this.configLength != originLength) {
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
    // 查询自定义云服务器价格
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
        // 云服务器
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
          window.open('https://i.xinruiyun.cn/order', '_self')
        } else {
          this.$message.info({
            content: response.data.message
          })
        }
      })
    },
    // 购买云服务器
    pushOrderHost () {
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
      axios.get('information/deployVirtualMachine.do', { params }).then(response => {
        if (response.status == 200 && response.data.status == 1) {
          window.open('https://i.xinruiyun.cn/order', '_self')
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

  },
  computed: {
    totalDataCost () {
      return this.vmCost + this.ipCost + this.dataDiskCost
    },
    authInfo () {
      return this.$store.state.authInfo ? this.$store.state.authInfo : null
    },
    authInfoPersion () {
      return this.$store.state.authInfoPersion
    },
    userInfo () {
      return this.$store.state.userInfo
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
    'selectTime': {
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
        if (val == 2) {
          this.single = '选择云服务器'
          let dom = this.$refs['summary-host-select']
          dom.getElementsByClassName('ivu-select-placeholder')[0].style.display = "block"
          dom.getElementsByClassName('ivu-select-selected-value')[0].style.display = "none"
        } else if (val == 3) {
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
        } else if (val == '选择GPU服务器') {
          this.changConfigGPU('8,64,1')
        }
      },
      deep: true
    }
  },
  components: {
    // child1,
    // child2,
  }
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
.wrap {
  margin: 0 auto;
  width: 1260px;
}
.headline {
  padding: 50px 0 30px 0;
  color: #0f0f68;
  line-height: 1;
  h2 {
    font-size: 32px;
  }
  p {
    margin-top: 12px;
    font-size: 16px;
  }
}
.free-host {
  margin: 0 auto;
  padding: 60px 0 40px;
  background: url("../../../../assets/img/active/freeToReceive.1/free-host-bg.png")
      top no-repeat,
    url("../../../../assets/img/active/freeToReceive.1/circle-left.png") 0%
      500px no-repeat,
    url("../../../../assets/img/active/freeToReceive.1/circle-right.png") 100%
      800px no-repeat;
  background-color: #395fc5;
  text-align: center;
  .main {
    margin-top: 40px;
  }
  .tabs {
    display: flex;
    > div {
      flex-grow: 1;
      &.selected {
        span {
          background: linear-gradient(
            160deg,
            rgba(145, 255, 223, 1) 0%,
            rgba(69, 191, 255, 1) 100%
          );
        }
        a {
          background: rgba(242, 248, 255, 1);
        }
      }
      span {
        display: block;
        height: 6px;
      }
      a {
        display: block;
        height: 64px;
        line-height: 64px;
        font-size: 20px;
        font-family: MicrosoftYaHei;
        font-weight: bold;
        color: rgba(52, 57, 101, 1);
        background: rgba(218, 221, 237, 1);
      }
    }
  }
  .container {
    width: 100%;
    padding: 30px 10px 30px 30px;
    background: rgba(242, 248, 255, 1);
  }
}
.summary-host {
  line-height: 1;
  padding-bottom: 40px;
  text-align: center;
  // height: 839px;
  padding-bottom: 50px;
  background: #f2f8ff
    url("../../../../assets/img/active/freeToReceive.1/summary-host-bg.png")
    center no-repeat;
  background-size: cover;
  .product {
    text-align: left;
    > div {
      margin: 0 auto;
      width: 1120px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 6px 20px -6px rgba(13, 48, 130, 0.49);
      border-radius: 8px;
    }
    .head {
      height: 80px;
      padding-left: 40px;
      line-height: 80px;
      color: #fff;
      background: url("../../../../assets/img/active/freeToReceive.1/summary-product-bg.png")
        no-repeat;
      background-size: 100%;
      h3 {
        font-size: 22px;
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
        width: 50%;
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
          width: 100%;
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

.under-line {
  text-decoration: underline;
}

.deposite-host {
  .product {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    text-align: left;
    // background: #fff;
    padding-bottom: 10px;
    > div {
      width: 224px;
      margin-right: 20px;
      margin-bottom: 20px;
      box-shadow: 0px 3px 10px -3px rgba(195, 205, 230, 0.7);
      border: 1px solid rgba(220, 226, 242, 1);
      &:nth-of-type(1) .head {
        background: url("../../../../assets/img/active/deposit/head-bg-1.png") no-repeat;
        background-size: cover;
      }
      &:nth-of-type(2) .head {
        background: url("../../../../assets/img/active/deposit/head-bg-2.png") no-repeat;
        background-size: cover;
      }
      &:nth-of-type(3) .head {
        background: url("../../../../assets/img/active/deposit/head-bg-3.png") no-repeat;
        background-size: cover;
      }
      &:nth-of-type(4) .head {
        background: url("../../../../assets/img/active/deposit/head-bg-4.png") no-repeat;
        background-size: cover;
      }
      &:nth-of-type(5) .head {
        background: url("../../../../assets/img/active/deposit/head-bg-5.png") no-repeat;
        background-size: cover;
      }
    }
    .head {
      position: relative;
      padding: 0 46px 0 20px;
      height: 80px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      color: #fff;
      h3 {
        font-size: 18px;
      }
      p {
        margin-top: 6px;
        display: flex;
        justify-content: space-between;
      }
      > span {
        display: inline-block;
        line-height: 20px;
        font-size: 12px;
        text-align: center;
        &:nth-of-type(1) {
          position: absolute;
          right: 0;
          top: 0;
        }
      }
      .cer {
        width: 86px;
        background: linear-gradient(
          270deg,
          rgba(255, 57, 42, 1) 0%,
          rgba(255, 189, 118, 1) 100%
        );
        color: #fff;
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
        margin-bottom: 10px;
      }
      .label {
        display: block;
        margin-bottom: 7px;
        width: 70px;
        font-size: 12px;
        color: #222274;
      }
      .configure {
        // margin-bottom: 10px;
        ul {
          display: flex;
          justify-content: space-between;
          li {
            color: #0f0f68;
            font-size: 12px;
            i {
              margin-bottom: 10px;
              display: block;
              font-style: normal;
            }
          }
        }
      }
      .mb15 {
        margin-bottom: 15px;
      }
      .mt5 {
        margin-top: 5px;
      }
      .price {
        color: #e70520;
        font-size: 14px;
        span {
          font-size: 24px;
          font-weight: bold;
        }
      }
      .origin-price {
        font-size: 14px;
        color: #0f0f68;
      }
      .line-thr {
        text-decoration: line-through;
      }
      button {
        width: 100%;
        background: #f66d59;
        border: none;
        border-radius: 0px;
        color: #fff;
        height: 40px;
        font-size: 16px;
      }
    }
  }
  .tips {
    margin-top: 15px;
    text-align: left;
    font-size: 16px;
    color: #4f557b;
    line-height: 1;
    .blue {
      color: #5893ff;
    }
    .red {
      color: #f0624d;
    }
  }
  .head-g {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    > div {
      margin-left: 20px;
      h3 {
        margin-bottom: 10px;
        font-size: 20px;
        font-weight: bold;
        color: rgba(71, 104, 177, 1);
        line-height: 1;
      }
      p {
        font-size: 14px;
        color: rgba(102, 102, 102, 1);
        line-height: 1;
        span {
          color: #5893ff;
        }
      }
    }
  }
  .renew {
    margin-top: 40px;
    text-align: left;
    .content {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      // background: url("../../../../assets/img/active/deposit/right-top-icon.png")
      //   no-repeat top right;
      .item {
        width: 583px;
        padding: 20px 0 20px 20px;
        box-shadow: 0px 3px 10px -3px rgba(195, 205, 230, 0.7);
        background: #fff;
        margin-bottom: 20px;
        position: relative;
        margin-right: 20px;
      }
      .icon-text {
        float: right;
        width: 110px;
        height: 100px;
        transform: rotate(0.125turn);
        transform-origin: 40px 34px;
        color: #fff;
      }
      h4 {
        font-size: 20px;
        font-weight: bold;
        color: rgba(79, 85, 123, 1);
        line-height: 26px;
      }
      .box {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        // padding-right: 50px;
      }
      .left,
      .right {
        .row {
          display: flex;
          margin-top: 10px;
          i {
            display: inline-block;
            font-size: 12px;
            font-style: normal;
            color: rgba(102, 102, 102, 1);
            line-height: 30px;
            vertical-align: middle;
          }
          span {
            line-height: 30px;
          }
        }
      }
      .left {
        // margin-right: 100px;
        .row {
          i {
            width: 76px;
          }
          .bold {
            font-weight: bold;
          }
        }
      }
      .right {
        span {
          font-size: 22px;
          font-weight: bold;
          color: rgba(255, 98, 75, 1);
        }
      }
    }
  }
  .update {
    padding-top: 20px;
    text-align: left;
    .content {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      text-align: center;
      > div {
        width: 583px;
        margin-bottom: 20px;
        background: #fff;
        padding: 30px 0;
        box-shadow: 0px 3px 10px -3px rgba(195, 205, 230, 0.7);
        margin-right: 20px;
      }
      h4 {
        font-size: 20px;
        font-weight: bold;
        color: rgba(79, 85, 123, 1);
        line-height: 1;
      }
      .box {
        display: flex;
        justify-content: center;
        margin-top: 40px;
        .item {
          padding: 0 30px;
          color: rgba(71, 104, 177, 1);
          border-left: 1px rgba(216, 216, 216, 1) solid;
          &:nth-of-type(1) {
            border: none;
          }
          div {
            margin-bottom: 10px;
            font-size: 20px;
            line-height: 24px;
            .icon {
              display: inline-block;
              width: 39px;
              height: 24px;
              background: rgba(71, 104, 177, 1);
              border-radius: 12px 12px 0px 12px;
              color: #fff;
              font-size: 14px;
              line-height: 24px;
            }
          }
          p {
            font-size: 16px;
            span {
              color: #ff624b;
            }
          }
        }
      }
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

.low-discount {
  .product {
    display: flex;
    // justify-content: center;
    flex-wrap: wrap;
    text-align: left;
    padding-bottom: 10px;
    > div {
      width: 224px;
      height: 380px;
      box-shadow: 0px 3px 10px -3px rgba(195, 205, 230, 0.7);
      border: 1px solid rgba(220, 226, 242, 1);
      margin-bottom: 20px;
      margin-right: 20px;
    }
    .head {
      height: 65px;
      padding: 25px 0 0 16px;
      background: #fff;
      h3 {
        font-size: 18px;
      }
    }

    .body {
      padding: 10px 16px 20px 16px;
      background: #fff;
      > div {
        margin-bottom: 15px;
        display: flex;
        line-height: 32px;
        font-size: 14px;
      }
      // .mb0 {
      //   margin-bottom: 0;
      // }
      .label {
        display: block;
        width: 44px;
        line-height: 32px;
        font-size: 14px;
        color: rgba(102, 102, 102, 1);
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
          justify-content: space-between;
          li {
            position: relative;
            width: 70px;
            height: 34px;
            margin-bottom: 10px;
            line-height: 32px;
            border: 1px solid rgba(125, 161, 217, 1);
            text-align: center;
            color: #4b3c3d;
            cursor: pointer;
            &:nth-of-type(1) {
              border-right: none;
            }
            &:nth-child(3n + 3) {
              margin-right: 0;
            }
            span {
              position: absolute;
              top: -14px;
              right: 5px;
              display: inline-block;
              width: 38px;
              height: 20px;
              background: rgba(246, 109, 89, 1);
              font-size: 14px;
              color: rgba(255, 255, 255, 1);
              line-height: 19px;
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
    .coupen {
      > div {
        display: block;
        div {
          padding-left: 10px;
          border-radius: 2px;
          border: 1px dashed rgba(125, 161, 217, 1);
        }
      }
      .label {
        display: inline-block;
        width: 70px;
      }
    }
  }
  .tips {
    margin-top: 15px;
    text-align: left;
    font-size: 16px;
    color: #4f557b;
    line-height: 1;
    .blue {
      color: #5893ff;
    }
    .red {
      color: #f0624d;
    }
  }
}

@media screen and (max-width: 1280px) {
  .head-g {
    justify-content: center;
  }
  .wrap {
    width: 100%;
  }
  .summary-host {
    .wrap {
      width: 100%;
    }
    .product {
      > div {
        width: 95%;
      }
      .body {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    }
  }
}
@media screen and (min-width: 1281px) {
  .head-g {
    justify-content: flex-start;
  }
  .wrap {
    width: 1260px;
  }
}
@media screen and (max-width: 1020px) {
  .pc {
    display: none;
  }
  .mobile {
    display: inline-block;
  }
}
@media screen and (min-width: 1021px) {
  .pc {
    display: inline-block;
  }
  .mobile {
    display: none;
  }
}

@media screen and (max-width: 540px) {
  .summary-host {
    .product {
      .body {
        padding: 0 10px;
        .left {
          width: 100%;
          // padding: 0 2px;
        }
      }
    }
  }
}
@media screen and (max-width: 640px) {
  .free-host .container {
    padding: 30px 10px 10px 10px;
  }
 
  .deposite-host .product{
    >div {
      width: 100%;
      margin-right: 0px;
      background: #fff;
      &:nth-of-type(1) .head {
        background: url("../../../../assets/img/active/deposit/head-bg-1m.png") no-repeat;
        background-size: cover;
      }
      &:nth-of-type(2) .head {
        background: url("../../../../assets/img/active/deposit/head-bg-2m.png") no-repeat;
        background-size: cover;
      }
      &:nth-of-type(3) .head {
        background: url("../../../../assets/img/active/deposit/head-bg-3m.png") no-repeat;
        background-size: cover;
      }
      &:nth-of-type(4) .head {
        background: url("../../../../assets/img/active/deposit/head-bg-4m.png") no-repeat;
        background-size: cover;
      }
      &:nth-of-type(5) .head {
        background: url("../../../../assets/img/active/deposit/head-bg-4m.png") no-repeat;
        background-size: cover;
      }
    }
    .body{
      &:nth-of-type(1) {
        >div {

        }
      }
      &:nth-of-type(3) {
        >div {
          display: flex;
        }
      }
      >div {
        
        // justify-items: center;
        // justify-content: space-between;
      }
      .label {
        display: inline;
        // width: 0;
        margin-bottom: 0px;
        line-height: 32px;
      }
    }
  }
}
</style>
