<template>
  <!--免费使用主机-->
  <div style="background: #FFF;  line-height: 0;" id="freeAnnual">
    <!--导航图修改-->
    <div class="banner">
      <div class="banner-top">
        <img src="../../../assets/img/active/freeAnnual/bannerText.png" />
      </div>
      <div class="banner-nav">
        <div class="banner-nav-item" v-for="(item,index) in navlist" :key="index" @click="point(index)">
          <span>{{index+1}}</span>{{item}}
        </div>
      </div>
      <!-- <div class="banner-logo" @click="$router.push('may')">
        <img src="../../../assets/img/active/freeAnnual/logo.png" />
      </div> -->
    </div>
    <!--修改--活动主题-->
    <div class="top" ref="top">
      <h1>活动云服务器</h1>
      <p>新用户专享，为防止恶意刷抢主机，</p>
      <p> 遂需缴纳保证金，保证金随时可退 <span @click="showRules = 'showRules'">活动规则 ></span></p>
    </div>
    <div class="content">
      <div class="content-top" v-for="(item,index) in free" :key="index">
        <div class="item-top indexOne" v-show="item.days == 30">
          <p>包月服务器</p>
          <span>适用于低负载、低并发、流量适中的网站应用、简单开发环境等场景。</span>
        </div>
        <div class="item-top indexTwo"  v-show="item.days == 360">
          <p>包年服务器</p>
          <span>适用于低负载、低并发、流量适中的网站应用、简单开发环境等场景。</span>
        </div>
        <div class="item-choose">
          <div class="configs">
                <p><b>{{item.cpu}}核</b><span>cpu</span></p>
                <p><b>{{item.mem}}G</b><span>内存</span></p>
                <p><b>{{item.bandwith}}M</b><span>宽带</span></p>
                <p><b>{{item.disksize}}G</b><span>系统盘</span></p>
            </div>
          <Group>
            <popup-picker title="区域节点" :data="freeAreaList" :columns="3" v-model="item.area" show-name
              @on-hide="changesNode(index,item)">
            </popup-picker>
            <popup-picker title="系统" :data="item.systems" :columns="3" v-model="item.list" show-name></popup-picker>
            <cell title="使用时长"  value="1个月" v-if="item.days == 30"></cell>
            <cell title="使用时长"  value="1年" v-if="item.days == 360"></cell>
            <div class="deposit">
              <div class="deposit-left">
                 <p>使用价格：￥<span><b>0</b></span>/月</p>
                 <p>
                   <span class="money" v-if="item.days == 30">保证金:￥{{priceOne}}</span>
                   <span class="money" v-if="item.days == 360">保证金:￥{{priceTwo}}</span>
                   <span>原价:￥{{item.oldPrice}}</span>
                 </p>
              </div>
              <button @click="freeGet(item,index)">免费领取</button>
            </div>
          </Group>
        </div>
      </div>
    </div>
    <div class="warns">
        <p>
            <b>温馨提示：</b> <br>
            使用期间若到“百度口碑”发布使用体验等相关评论，截图并发送至在线客服，可领取满200减100优惠券。
            <span @click="openOther"> 点击发布评论></span>
        </p>
    </div>
    <div class="steps">
      <h1>活动流程</h1>
      <ul>
          <li>
              <img src="../../../assets/img/active/freeAnnual/un-login.png" alt="" v-show="!$store.state.userInfo">
              <img src="../../../assets/img/active/freeAnnual/login.png" alt="" v-show="$store.state.userInfo">
          </li>
          <li v-for="(item,index) in stepsList">
              <img :src="$store.state.authInfo && $store.state.authInfo.status == item.status ? item.unImg : item.img" alt="">
          </li>
      </ul>
    </div>
    <!--新增-热销云服务器-->
    <div class="sell" ref="sell">
      <div class="sell-header">
        <p>热销云服务器</p>
        <p>购买时长越长越便宜，年付低至3折 <span @click="sysRules = 'sysRules'">活动规则></span></p>
      </div>
    </div>
    <div class="content">
      <div class="content-top">
        <div class="item-top indexThree">
          <p>云服务器、GPU服务器</p>
          <span>100%性能可用，更低价格，拒绝套路</span>
        </div>
        <div class="item-choose" v-for="(item,index) in sellList" :key="index">
          <div class="configs" style="background: rgba(245,246,250,1);">
            <p><b>{{item[0].cpu}}核</b><span>cpu</span></p>
            <p><b>{{item[0].mem}}G</b><span>内存</span></p>
            <p><b>{{item[0].bandwith}}M</b><span>宽带</span></p>
            <p><b>{{item[0].disksize}}G</b><span>系统盘</span></p>
          </div>
          <Group class="sysChoose">
            <popup-picker title="系统" :data="item[0].systems" :columns="3" v-model="item[0].list" show-name></popup-picker>
            <popup-picker title="选择区域" :data="areaList" :columns="3" v-model="item[0].area" show-name
                          @on-change="changeArea(item,index)">
            </popup-picker>
            <popup-picker title="使用时长" v-model="timeValue1" @on-hide="changeHide(item,index)" :data="timeList1" show-name :columns="2" v-if="index==0"></popup-picker>
            <popup-picker title="使用时长" v-model="timeValue2" @on-hide="changeHide(item,index)" :data="timeList2" show-name :columns="3" v-if="index==1"></popup-picker>
            <popup-picker title="使用时长" v-model="timeValue3" @on-hide="changeHide(item,index)" :data="timeList3" show-name :columns="3" v-if="index==2"></popup-picker>
            <popup-picker title="使用时长" v-model="timeValue4" @on-hide="changeHide(item,index)" :data="timeList4" show-name :columns="3" v-if="index==3"></popup-picker>
            <div class="deposit">
              <div class="deposit-left">
                 <p>价格：￥<span v-if="item[0].price">{{item[0].price.toFixed(2)}}</span></p>
                 <p><span  v-if="item[0].oldPrice">原价:￥{{item[0].oldPrice.toFixed(2)}}</span></p>
              </div>
              <button @click="buy(item,index)">立即购买</button>
            </div>
          </Group>
        </div>
      </div>
    </div>
    <!--新增-云服务器大集合-->
    <div class="aggregate" ref="aggregate">
      <div class="aggregate-head">
        <p>云服务器大集合</p>
        <p>你想要的云主机都在这里</p>
      </div>
      <div class="item-top indexFoure">
        <p>云服务器</p>
        <span>100%性能可用，更低价格，拒绝套路</span>
      </div>
      <div class="item-choose">
        <Group>
          <popup-picker title="服务器类型" :data="sysTpye" :columns="3" v-model="sysTemChoose" show-name @on-change="chooseSystem"></popup-picker>
          <popup-picker title="云服务器配置" :data="serverTempArr" :columns="1" v-model="serverData.config" show-name @on-hide="getServerPrice()" v-if="syStemstatus == 1"></popup-picker>
          <popup-picker title="GPU配置" :data="gpuTempArr" :columns="1" v-model="gpuData.config" show-name @on-hide="gpuPriceChange ()" v-if="syStemstatus == 2"></popup-picker>
          <popup-picker title="选择区域" :data="serverList" :columns="3" v-model="server" show-name @on-hide="serverChange"></popup-picker>
          <popup-picker title="带宽" :data="bandwidthListAll" :columns="1" v-model="parameter.bandwidth" :show-name="true" @on-hide="bandChange"></popup-picker>
          <popup-picker title="系统" :data="systemList" :columns="2" v-model="sysTem" show-name></popup-picker>
          <popup-picker title="SSD数据盘" :data="diskSSD" :columns="2" v-model="parameter.ssd" :show-name="true" @on-hide="ssdChange"></popup-picker>
          <popup-picker title="购买时长" :data="useTime" :columns="3" v-model="parameter.defaultUse" show-name @on-hide="changeTime"></popup-picker>
          <popup-picker title="购买数量" :data="number" :columns="1" v-model="parameter.number" :show-name="true" @on-hide="numChange()"></popup-picker>
          <div class="deposit">
            <div class="deposit-left">
               <p>价格：￥<span style="font-size: 24px;color: #e6001b;font-weight: 600;text-decoration:none">{{allPrice}}</span></p>
            </div>
            <button @click="oneBuy">立即购买</button>
          </div>
        </Group>
      </div>
    </div>
    <!--新增-优惠券-->
    <div class="coupon" ref="coupon">
      <div class="coupon-title">
        配置不够用 券券来帮忙
        <p><span @click="couponRules = 'couponRules'">活动规则></span></p>
      </div>
      <div class="coupon-coupon">
        <div class="img-wrap">
          <img src="../../../assets/img/active/freeAnnual/coupon-1.png" />
          <img src="../../../assets/img/active/freeAnnual/coupon-2.png" />
          <img src="../../../assets/img/active/freeAnnual/coupon-3.png" />
          <img src="../../../assets/img/active/freeAnnual/coupon-4.png" />
        </div>
        <div class="btn">
          <button @click="getCoupon">一键领取</button>
        </div>
      </div>
    </div>
    <!--新增-底部-->
    <div class="footer">
      <div class="foot-bottom">
        <ul>
          <li v-for="(item,index) in foots" :key="index">
            <img :src="item.img">
            <p>{{item.title}}</p>
            <p>{{item.name}}</p>
          </li>
        </ul>
      </div>
      <!-- <div class="foot">
        <p><span>Copyright &#169 2014-2017</span><span class="icpIcon">京ICP备15035854号</span></p>
        <p class="company">北京允睿讯通科技有限公司</p>
      </div> -->
    </div>
    <!--规则弹窗  -->
    <div class="userAlert" :class="showRules">
      <div class="alert">
        <div class="head">
          <p>活动规则</p>
          <img src="../../../assets/img/active/home-m/close.png" alt="" @click="showRules = ''">
        </div>
        <ul class="content">
          <li>
            <b>活动时间：</b>
            2019年5月7日开始，总量有限，先到先得！
          </li>
          <li>
            <b>活动对象：</b>
            新注册或者一直未使用过平台资源（第三方产品除外）及未参加过其他免费活动并已通过个人／企业认证的用户。
          </li>
          <li>
            <b>活动内容：</b>
            活动产品免费试用需充值对应的押金后才可使用；主机未到期可自行删除，删除后或者主机使用到期后，用户可解冻押金；若您需要续费押金主机，可选择在主机未到期之前将押金转换为主机续费费用，最多可延长主机使用时间1年；
          </li>
          <li>
            <b>押金转续费时间说明：</b>
            用户A在2019年4月30日选择押金主机2核4G，一年的配置，冻结押金569元，主机到期时间为2020年4月30日，若用户在2019年4月30日当天操作押金转续费，则主机到期时间仍为2020年4月30日，如用户在2020年4月29日操作押金转续费，则主机实际到期时间为2021年4月29日，可低价续费一年时间。续费时间根据用户之前选择的主机规格时间为准，一月期续费一月，一年期续费一年。
          </li>
          <li>
            <b>解冻操作流程：</b>
            进入控制台，点击右上角用户名，选择【费用中心】，在账户概览中点击【冻结押金】，在弹出的弹窗中选择需要解冻的押金，点击【申请解冻】，根据弹窗提示完成操作。
          </li>
          <li>
            <b>活动细则：</b>
            每个用户只能参与一次，同一手机号对应的多个账号、同一实名认证用户等满足同一条件的均视为一个用户。
            免费产品中的资源可随时进行升级，升级费用按新睿云标准收费进行收取。<br>在各产品免费使用期间，若对免费资源进行了销毁，则视为放弃免费使用权。<br>因押金主机为免费产品，暂不支持备案，若您需要备案可执行押金转续费操作，或者购买包年包月主机及IP之后进行备案。
          </li>
          <li>
            <b>活动声明：</b>
            为保证活动的公平公正，新睿云有权对恶意刷抢（如通过程序等技术手段）活动资源；领取后3天内未使用资源；利用资源从事违法违规行为；因用户主机遭受DDOS攻击而给平台方带来损失的用户，收回免费套餐使用资格。因此造成任何损失的，由该用户自行负责。
          </li>
        </ul>
        <div class="foot">
          <button @click="showRules = ''">我知道了</button>
        </div>
      </div>
    </div>
    <!--折扣主机活动规则弹窗-->
    <div class="userAlert" :class="sysRules">
      <div class="alert">
        <div class="head">
          <p>活动规则</p>
          <img src="../../../assets/img/active/home-m/close.png" alt="" @click="sysRules = ''">
        </div>
        <ul class="content">
          <li>
            <b>1、活动时间：</b>
            2019.6.19开始。
          </li>
          <li>
            <b>2、活动对象：</b>
            平台已完成实名认证的新老用户。
          </li>
          <li>
            <b>3、数量限制：</b>
            云服务器产品每个用户限购7台（若有更多需求，可向客服申请提高配额)。
          </li>
          <li>
            <b>4、</b>
            参与本次活动购买的产品不能进行退款。
          </li>
          <li>
            <b>5、</b>
            购买时不可使用任何优惠券。
          </li>
          <li>
            <b> 6、</b>
           活动最终解释权为新睿云所有。
          </li>
        </ul>
        <div class="foot">
          <button @click="sysRules = ''">我知道了</button>
        </div>
      </div>
    </div>
    <!--折扣主机活动规则弹窗-->
    <div class="userAlert" :class="couponRules">
      <div class="alert">
        <div class="head">
          <p>活动规则</p>
          <img src="../../../assets/img/active/home-m/close.png" alt="" @click="couponRules = ''">
        </div>
        <ul class="content">
          <li>
            <b>1、活动时间：</b>
            2019.6.19开始。
          </li>
          <li>
            <b>2、活动对象：</b>
            平台已完成实名认证的新老用户。
          </li>
          <li>
            <b>3、数量限制：</b>
            优惠券每个用户限领取一次，不同账号同一认证信息视为一个用户。
          </li>
          <li>
            <b>4、</b>
            域名与SSL证书优惠券有效期为3个月、续费优惠券有效期为1年。
          </li>
          <li>
            <b>5、</b>
            活动最终解释权为新睿云所有。
          </li>
        </ul>
        <div class="foot">
          <button @click="couponRules = ''">我知道了</button>
        </div>
      </div>
    </div>
    <!--不符合条件弹窗-->
    <div v-transfer-dom>
      <confirm v-model="inconformity" :show-cancel-button="false" confirm-text="去活动中心" onclick="window.open('https://csactivity.xrcloud.net/', '_self')" class="comfirm">
        <div style="text-align:center;">
          <p style="font-size: 14px;font-weight:500;color:#333;line-height:40px;" slot="title">提示</p>
          <p style="font-size: 14px;font-weight:400;color:rgba(51,51,51,1);line-height:32px;">
            您好，您不符合本活动的参与条件，去
            <span style="color: #F56B23" onclick="window.open('https://csactivity.xrcloud.net/', '_self')">活动中心</span>看看其他活动吧！如果有其他需要可联系我们销售或者客服。
          </p>
        </div>
      </confirm>
    </div>
    <!--未实名认证-->
    <div class="userAlert" :class="certify">
      <div class="alert5">
        <div class="top">
          <h1>提示</h1>
          <img src="../../../assets/img/active/home-m/close.png" alt="" @click="certify = ''">
        </div>
        <div class="rules">
          根据国家规定，使用公共互联网需进行实名认证。
        </div>
        <div class="foot">
          <button onclick="window.open('https://csm.xrcloud.net/certification', '_self')">实名认证</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import $store from '@/vuex'
  import {
    Group,
    Cell,
    PopupPicker,
    TransferDomDirective as TransferDom,
    Confirm,
    CheckIcon,
    Toast
  } from 'vux'
  export default{
    directives: {
      TransferDom
    },
    components: {
      Group,
      Cell,
      PopupPicker,
      Confirm,
      CheckIcon,
      Toast
    },
    data(){
      window.scrollTo(0, 0);
      return {
        // 免费主机配置
        freeList: [],
        free: [],
        freeSys: [],
        freeAreaList: [],
        freeArea: [],
        configId: 0,
        //节点选择
        nodeList: [],
        nodes: [],
        //镜像
        systemGroup: [],
        system: ['',''],
        vmConfigId: '',
        priceOne:'69',
        originalPriceOne: '',
        priceTwo:'1269',
        originalPriceTwo: 0,
        //活动流程
        stepsList: [
          {
            status: '2',
            unImg: require('../../../assets/img/active/freeAnnual/un-renzheng.png'),
            img: require('../../../assets/img/active/freeAnnual/renzheng.png')
          },
          {
            status: '3',
            unImg: require('../../../assets/img/active/freeAnnual/un-yajin.png'),
            img: require('../../../assets/img/active/freeAnnual/yajin.png')
          },
          {
            status: '4',
            unImg: require('../../../assets/img/active/freeAnnual/un-shiyong.png'),
            img: require('../../../assets/img/active/freeAnnual/shiyong.png')
          },
          {
            status: '5',
            unImg: require('../../../assets/img/active/freeAnnual/un-shanchu.png'),
            img: require('../../../assets/img/active/freeAnnual/shanchu.png')
          },
          {
            status: '6',
            unImg: require('../../../assets/img/active/freeAnnual/un-tuihuan.png'),
            img: require('../../../assets/img/active/freeAnnual/tuihuan.png')
          },
        ],
        //优势
        advantages: [
          {
            img: require('../../../assets/img/active/freeAnnual/xjb.png'),
            title: '性价比高',
            describe: '0基础设施建设投入，企业级云产品便捷采购，0门槛上云，专家团队免费在线咨询，享受云网超顶级硬件与超大带宽'
          }, {
            img: require('../../../assets/img/active/freeAnnual/sjcj.png'),
            title: '数据持久性',
            describe: '全场景光纤网络数据存储，超低延迟高吞吐，最高20万级IOPS，SDN网络诊断技术，快速屏蔽网络故障'
          }, {
            img: require('../../../assets/img/active/freeAnnual/fwws.png'),
            title: '服务完善',
            describe: '7*24小时在线客服，80秒客户问题快速响应，7天无理由退款，12年运营商级技术团队为您保驾护航'
          }
        ],
        //弹窗
        inconformity: false,
        //规则
        showRules: '',
        sysRules: '',
        couponRules: '',
        //页尾
        foots: [
          {img: require('../../../assets/img/active/home-m/ft-1.png'), title: '7x24', name: '多渠道服务与支持'},
          {img: require('../../../assets/img/active/home-m/ft-2.png'), title: '意见', name: '反馈与投诉建议'},
          {img: require('../../../assets/img/active/home-m/ft-3.png'), title: '1v1', name: '一对一专项服务'},
          {img: require('../../../assets/img/active/home-m/ft-4.png'), title: '退款', name: '7天无理由退款'},
        ],
        // banner导航
        navlist: ['免费领云服务器', '热销云服务器', '云服务器大集合', '优惠券随时领'],
        // 热销云服务器
        sellList: [],
        hotArea: [],
        // 使用时长
        timeList1: [],
        timeValue1: [],
        timeList2: [],
        timeValue2: [],
        timeList3: [],
        timeValue3: [],
        timeList4: [],
        timeValue4: [],
        // 区域节点
        areaList: [],
        area: [],
        // 折扣系统
        systemInfoServer: [],
        defaultSys: ['',''],
        // 云服务器与GPU
        syStemstatus: 1,
        sysTemChoose: ['1'],
        sysTpye: [
          {name: "云服务器", value: "1"},
          {name: "GPU服务器", value: "2"}
        ],
        // 云服务器
        serverTempArr: [],
        serverData: { // 云服务器配置
          config: ["1#1"],
          defaultDis: [""],
          defaultSys: ['',''],
          diskSize: [''],//选择的
          originalDiskSize: 40,//默认
          defalutPrice: '',
          oldPrice: 1424.64,
        },
        configList1: [
          {name: "1核1G", value: "1#1"},
          {name: "1核2G", value: "1#2"},
          {name: "2核4G", value: "2#4"},
          {name: "4核8G", value: "4#8"},
          {name: "8核16G", value: "8#16"},
          {name: "16核32G", value: "16#32"},
          {name: "32核64G", value: "32#64"},
          {name: "64核256G", value: "64#256"}
        ],
        //GPU配置
        gpuList: [],
        gpu: [],
        gpuTempArr: [],
        gpuData: {
          defaultDis: [""],
          vmConfigId: '',
          config: [""],
          diskSize: [''],//选择的
          originalDiskSize: 128,//默认
          defaultSys: ['',''],
          defalutPrice: '',
          oldPrice: 14630.11,
        },
        configList2: [
          {name: "8核64G", value: "8#64"},
          {name: "16核128G", value: "16#128"},
          {name: "16核192G", value: "16#192"},
          {name: "32核256G", value: "32#256"},
          {name: "64核384G", value: "64#384"}
        ],
        // 公共选择
        parameter: {
          bandwidth: ["1"],
          ssd: ['0'],
          defaultUse: ["1"],
          number: ["1"]
        },
        gpuConfigs:[],
        // 云服务器与GPU互转--区域选择
        serverList: [],
        server: [],
        // 云服务器与GPU互转--系统选择
        systemList: [],
        sysTem: [],
        // 宽带
        // 默认选择

        bandwidthListAll: [
          {name: "1M", value: '1'},
          {name: "2M", value: '2'},
          {name: "5M", value: '5'},
          {name: "10M", value: '10'},
          {name: "20M", value: '20'}
        ],
        //数据盘
        diskSSD: [
          {name: "0G", value: '0'},
          {name: "20G", value: '20'},
          {name: "50G", value: '50'},
          {name: "100G", value: '100'},
          {name: "500G", value: '500'},
        ],
        // 使用时长
        useTime: [
          {name: '1个月', value: '1'},
          {name: '2个月', value: '2'},
          {name: '3个月', value: '3'},
          {name: '4个月', value: '4'},
          {name: '5个月', value: '5'},
          {name: '6个月', value: '6'},
          {name: '7个月', value: '7'},
          {name: '8个月', value: '8'},
          {name: '9个月', value: '9'},
          {name: '10个月', value: '10'},
          {name: '1年', value: '12'},
          {name: '2年', value: '24'},
          {name: '3年', value: '36'},
        ],
        // 购买数量
        number: [
          {name: '1', value: '1'},
          {name: '2', value: '2'},
          {name: '3', value: '3'},
          {name: '4', value: '4'},
          {name: '5', value: '5'},
          {name: '6', value: '6'},
          {name: '7', value: '7'},
          {name: '8', value: '8'},
          {name: '9', value: '9'},
          {name: '10', value: '10'}
        ],
        buyNums: 1,//默认购买数量
        // 价格
        allPrice: 0,
        brandPrice: 0,
        originalPrice: 0,
        diskSizePrice: 0,
        // 未实名认证
        certify: '',
        price1: '',
        sysTemList: {
          sys1: [],
          sys2: [],
          sys3: [],
          sys4: []
        }
      }
    },
    methods: {
      // goBack(){
      //   this.$router.push('home')
      // },
      openOther () {
        window.open('https://koubei.baidu.com/s/510a4f5f6316c2d0f81b3e63bc75b537?fr=search')
      },
      // 获取活动配置
      getActive(){
        axios.get('activity/getTemActInfoById.do', {
          params: {
            activityNum: 50
          }
        }).then(res => {
          if (res.status == 200 && res.data.status == 1) {
            let freeList = res.data.result.freevmconfigs
            freeList[0].area = [this.freeArea[0]]
            freeList[1].area = [this.freeArea[0]]
            this.freeList = freeList
            this.getOriginalPrice1(this.freeList)
            this.getOriginalPrice2(this.freeList)
            for (let i = 0; i < this.freeList.length; i++) {
              this.freeSystem(this.freeList[i])
            }
          }
        })
      },
      // 获取免费主机价格及原价
      getOriginalPrice1(item){
        axios.get('activity/getOriginalPrice.do', {
          params: {
            vmConfigId: item[0].id,
            zoneId: item[0].area[0],
            month: item[0].days/30
          }
        }).then(res => {
          if (res.status == 200 && res.data.status == 1) {
            item[0].oldPrice = res.data.result.originalPrice
          }
        })
      },
      getOriginalPrice2(item){
        axios.get('activity/getOriginalPrice.do', {
          params: {
            vmConfigId: item[1].id,
            zoneId: item[1].area[0],
            month: item[1].days/30
          }
        }).then(res => {
          if (res.status == 200 && res.data.status == 1) {
            item[1].oldPrice = res.data.result.originalPrice
          }
        })
      },
      changesNode(index,item){
        this.freeSystem(item)
        if (index == 0) {
          this.getOriginalPrice1(this.freeList)
        } else {
          this.getOriginalPrice2(this.freeList)
        }
      },
      // 获取免费主机系统
      freeSystem (item) {
        axios.get('information/listTemplates.do', {
          params: {
            zoneId: item.area[0]
          }
        }).then(res => {
          if(res.status == 200 && res.data.status == 1){
            this.freeSys = []
            for (let type in res.data.result) {
              if (res.data.result[type].length > 0) {
                this.freeSys.push({name: type, value: type, parent: 0})
              }
              res.data.result[type].forEach(e => {
                this.freeSys.push({name: e.templatename, value: e.systemtemplateid, parent: type})
              })
            }
            let name = this.freeSys[0].name
            let value = this.freeSys[1].value

            item.list[0] = name
            item.list[1] = value
            item.systems = this.freeSys
            if (this.free.length <= 2) {
              this.free.push(item)
            }
          }
        })
      },
      //免费领取
      freeGet(item,index){
        if (this.$store.state.userInfo == null) {
          sessionStorage.setItem('routerName', 'freeAnnual')
          window.open('https://csm.xrcloud.net/Register', '_self')
        } else if(this.$store.state.isCheck) {
          // 未认证
          this.certify = 'certify'
          return false
        } else {
          axios.get('activity/jdugeTeam.do', {
            params: {
              sign: 'freeReceive',
              vmConfigId: item.id
            }
          }).then(response => {
            if (response.status == 200 && response.data.status == 1) {
              if (response.data.result.flag) {
                axios.get('/activity/createFreevmTemp.do', {
                  params: {
                    vmConfigId: item.id,
                    osType: item.list[1],
                    defzoneid: item.area[0]
                  }
                }).then(res => {
                  if (res.status == 200 && res.data.status == 1) {
                    window.open('https://csm.xrcloud.net/freeBuy','_self')
                  }
                })
              } else {
                this.inconformity = true
              }
            } else {
              this.$vux.toast.text(response.data.message, 'middle')
            }
          })
        }
      },
      // 锚点跳转
      point (index) {
        if (index == 0) {
          window.scrollTo(0,this.$refs.top.offsetTop)
        } else if (index == 1) {
          window.scrollTo(0,this.$refs.sell.offsetTop)
        } else if (index == 2) {
          window.scrollTo(0,this.$refs.aggregate.offsetTop)
        } else if (index == 3) {
          window.scrollTo(0,this.$refs.coupon.offsetTop)
        }
      },
      // 立即购买
      buy (item,index) {
        var configId = 0
        if (this.timeValue1[0].split(',')[0] == 6 && index == 0) {
          configId = item[0].id
        } else if (this.timeValue1[0].split(',')[0] == 12 && index == 0){
          configId = item[1].id
        } else if (this.timeValue2[0].split(',')[0] == 6 && index == 1){
          configId = item[0].id
        } else if (this.timeValue2[0].split(',')[0] == 12 && index == 1){
          configId = item[1].id
        } else if (this.timeValue3[0].split(',')[0] == 6 && index == 2){
          configId = item[0].id
        } else if (this.timeValue3[0].split(',')[0] == 12 && index == 2){
          configId = item[1].id
        } else if (this.timeValue4[0].split(',')[0] == 6 && index == 3){
          configId = item[0].id
        } else if (this.timeValue4[0].split(',')[0] == 12 && index == 3){
          configId = item[1].id
        }
        if (this.$store.state.userInfo == null) {
          // 未登录
          //return this.$router.push('Register')
          window.open('https://csm.xrcloud.net/Register', '_self')
        } else if(this.$store.state.isCheck) {
          // 未认证
          this.certify = 'certify'
          return false
        } else {
          axios.get('information/getDiskcountMv.do', {
            params: {
              vmConfigId: configId,
              osType: item[0].list[1],
              defzoneid: item[0].area[0]
            }
          }).then(res => {
            if (res.status == 200 && res.data.status == 1) {
              sessionStorage.setItem('countOrder', item[0].price.toString())
              //this.$router.push('orderconfirm')
              window.open('https://csm.xrcloud.net/orderconfirm','_self')
            } else {
              // this.$vux.toast.text(res.data.message, 'middle')
              this.$message.info({
                content: res.data.message
              })
            }
          })
        }
      },
      //选择使用时长
      changeHide (item,index) {
        this.getPirce(item,index)
      },
      // 获取价格
      getPirce (item,index) {
        if (this.timeValue1[0].split(',')[0] == 6 && index ==0){
          this.configId = item[0].id
        } else if (this.timeValue1[0].split(',')[0] == 12 && index == 0){
          this.configId = item[1].id
        } else if (this.timeValue2[0].split(',')[0] == 6 && index == 1){
          this.configId = item[0].id
        } else if (this.timeValue2[0].split(',')[0] == 12 && index == 1){
          this.configId = item[1].id
        } else if (this.timeValue3[0].split(',')[0] == 6 && index == 2){
          this.configId = item[0].id
        } else if (this.timeValue3[0].split(',')[0] == 12 && index == 2){
          this.configId = item[1].id
        } else if (this.timeValue4[0].split(',')[0] == 6 && index == 3){
          this.configId = item[0].id
        } else if (this.timeValue4[0].split(',')[0] == 12 && index == 3){
          this.configId = item[1].id
        }
        axios.get('activity/getOriginalPrice.do', {
          params: {
            vmConfigId: this.configId,
            zoneId: item[0].area[0],
            // 动态改变使用时间
            month: index == 0 ? this.timeValue1[0].split(',')[0] :index == 1 ?this.timeValue2[0].split(',')[0] : index ==2 ? this.timeValue3[0].split(',')[0] : this.timeValue4[0].split(',')[0]
          }
        }).then(res => {
          if (res.status == 200 && res.data.status == 1) {
            item[0].price = res.data.result.cost
            item[0].oldPrice = res.data.result.originalPrice
          }
        })
      },
      // 获取优惠券
      getCoupon () {
        if (this.$store.state.userInfo == null) {
          // 未登录
          //return this.$router.push('Register')
          window.open('https://csm.xrcloud.net/Register', '_self')
        } else if(this.$store.state.isCheck) {
          // 未认证
          this.certify = 'certify'
          return false
        } else {
          axios.get('ticket/getTicketForActivity.do', {
            params: {
              activityNum: '49'
            }
          }).then(res => {
            if (res.status == 200 && res.data.status == 1) {
              this.$vux.toast.text('恭喜您，领取成功！', 'middle')
            } else {
              this.$vux.toast.text(res.data.message, 'middle')
            }
          })
        }
      },
      // 区域选择
      changeArea (item,index) {
        this.getPirce(item,index)
        this.getSystem(item)
      },
      // 获取云服务器系统
      getSystem (item) {
        axios.get('information/listTemplates.do', {
          params: {
            zoneId: item[0].area[0]
          }
        }).then(res => {
          if(res.status == 200 && res.data.status == 1){
            this.systemInfoServer = []
            for (let type in res.data.result) {
              if (res.data.result[type].length > 0) {
                this.systemInfoServer.push({name: type, value: type, parent: 0})
              }
              res.data.result[type].forEach(e => {
                this.systemInfoServer.push({name: e.templatename, value: e.systemtemplateid, parent: type})
              })
            }
            let tempSystem1 = this.systemInfoServer[0].name
            let tempSystem2 = this.systemInfoServer[1].value

            item[0].list[0] = tempSystem1
            item[0].list[1] = tempSystem2
            item[0].systems = this.systemInfoServer
          }
        })
      },
      // 获取云服务器系统和GPU系统
      getGpuSystem (gpuData) {
        axios.get('information/listTemplates.do', {
          params: {
            zoneId: this.server[0]
          }
        }).then(response => {
          if(response.status == 200 && response.data.status == 1){
            this.gpuConfigs = []
            this.systemList = []
            for (let type in response.data.result) {
              if(response.data.result[type].length > 0) {
                this.gpuConfigs.push({name: type, value: type, parent: 0})
                this.systemList.push({name: type, value: type, parent: 0})
              }
              response.data.result[type].forEach(e => {
                this.gpuConfigs.push({name: e.templatename, value: e.systemtemplateid, parent: type})
                this.systemList.push({name: e.templatename, value: e.systemtemplateid, parent: type})
              })
            }
            let tempSystem1 = this.gpuConfigs[0].name
            let tempSystem2 = this.gpuConfigs[1].value
            gpuData.defaultSys[0] = tempSystem1
            gpuData.defaultSys[1] = tempSystem2
            //云服务器购买默认选择系统
            this.sysTem[0] = this.gpuConfigs[0].name
            this.sysTem[1] = this.gpuConfigs[1].value
          }
        })
      },
      // 获取服务器配置
      getConfig () {
        axios.get('information/getServiceoffersByZoneId.do', {
          params: {
            zoneId: this.area[0],
            type: 'host'
          }
        }).then(res => {
          if (res.status == 200 && res.data.status == 1) {
            let resArr = res.data.info
            this.serverTempArr = []
            // 循环筛选配置信息
            this.configList1.forEach(item => {
              let tempinnerConf = item.value.split("#")
              resArr.forEach(e => {
                if ((e.rootdisktype == 'sas') && (e.zoneid == this.area[0]) && (e.cpunum == tempinnerConf[0]) && (e.memory == tempinnerConf[1])) {
                  this.serverTempArr.push(item)
                }
              })
            })
            // 把改变后的值给一个默认值
            this.serverData.config[0] = this.serverTempArr[0].value
          }
        })
      },
      //GPU配置
      getGpu (gpuData) {
        axios.get('gpuserver/listGpuServerOffer.do', {
          params: {
            zoneId: gpuData.defaultDis[0]
          }
        }).then(res => {
          if (res.status === 200 && res.data.status === 1) {
            let tempArr = res.data.result
            this.gpuTempArr = []
            this.configList2.forEach(item => {
              let gpuConfTemp = item.value.split("#")
              tempArr.forEach(e => {
                if ((e.cpunum==gpuConfTemp[0])&&(e.memory==gpuConfTemp[1])&&e.gputype == 'NVIDIA_P100') {
                  this.gpuTempArr.push({name:e.cpunum + '核' + e.memory + 'G' + ' ' + e.gpusize + '*' + e.gputype, value:e.cpunum + '#' +e.memory + '#' +e.gpusize})
                }
              })
            })
            // 把改变后的值给一个默认值
            gpuData.config[0] = this.gpuTempArr[0].value
          }
        })
      },
      // 选择服务器类型
      chooseSystem (val) {
        if (val[0] == 1) {
          //区域
          this.server[0] = this.area[0]
          this.serverList = this.hotArea
          //系统
          this.sysTem[0] = this.sellList[0][0].list[0]
          this.sysTem[1] = this.sellList[0][0].list[1]
          this.systemList = this.systemInfoServer

          this.syStemstatus = val[0]

          //公共参数选择初始化
          this.parameter.bandwidth = ['1']
          this.parameter.ssd = ['0']
          this.parameter.defaultUse = ['1']
          this.parameter.number = ['1']
        } else if (val[0] == 2) {
          // 区域
          this.server[0] = this.gpu[0]
          this.serverList = this.gpuList
          // 系统
          this.sysTem[0] = this.gpuData.defaultSys[0]
          this.sysTem[1] = this.gpuData.defaultSys[1]
          this.systemList = this.gpuConfigs

          this.syStemstatus = val[0]

          //公共参数选择初始化
          this.parameter.bandwidth = ['1']
          this.parameter.ssd = ['0']
          this.parameter.defaultUse = ['1']
          this.parameter.number = ['1']
        }
        this.getGpuSystem(this.gpuData)
        this.getPrice()
      },
      //选择云服务器配置
      getServerPrice () {
        this.getPrice()
      },
      // 选择区域
      serverChange () {
        this.getPrice()
        this.getGpuSystem(this.gpuData)
      },
      // 宽带选择
      bandChange () {
        this.getBrand()
      },
      getBrand () {
        axios.post('device/queryIpPrice.do', {
          brand: this.parameter.bandwidth[0],
          timeType: this.parameter.defaultUse[0] >=12 ? 'year' : 'month',
          timeValue: this.parameter.defaultUse[0] >=12 ? this.parameter.defaultUse[0]/12 : this.parameter.defaultUse[0],
          zoneId: this.server[0]
        }).then(res => {
          if (res.status == 200 && res.data.status == 1) {
            this.brandPrice = res.data.cost
            this.getPrice()
          }
        })
      },
      // ssd选择
      ssdChange () {
        this.getDiskSizePrice()
      },
      getDiskSizePrice () {
        axios.post('device/QueryBillingPrice.do', {
          cpuNum: '0',
          diskSize: this.parameter.ssd[0],
          diskType: 'ssd',
          memory:  '0',
          timeType: this.parameter.defaultUse[0] >=12 ? 'year' : 'month',
          timeValue: this.parameter.defaultUse[0] >=12 ? this.parameter.defaultUse[0]/12 : this.parameter.defaultUse[0],
          zoneId: this.server[0]
        }).then(res => {
          if (res.status == 200 && res.data.status == 1) {
            this.diskSizePrice = res.data.cost
            if (this.syStemstatus == 1) {
              this.allPrice = ((res.data.cost + this.serverData.defalutPrice) * this.buyNums).toFixed(2)
            } else {
              this.allPrice = ((res.data.cost + this.gpuData.defalutPrice) * this.buyNums).toFixed(2)
            }
          }
        })
      },
      // 选择GPU配置
      gpuPriceChange () {
        this.getPrice()
      },
      //选择使用时长
      changeTime () {
        axios.post('device/QueryBillingPrice.do', {
          cpuNum: '0',
          diskSize: this.parameter.ssd[0],
          diskType: 'ssd',
          memory:  '0',
          timeType: this.parameter.defaultUse[0] >=12 ? 'year' : 'month',
          timeValue: this.parameter.defaultUse[0] >=12 ? this.parameter.defaultUse[0]/12 : this.parameter.defaultUse[0],
          zoneId: this.server[0]
        }).then(res => {
          if (res.status == 200 && res.data.status == 1) {
            this.diskSizePrice = res.data.cost
          }
        })
        this.getBrand()
      },
      // 购买数量
      numChange () {
        this.buyNums = this.parameter.number[0]
        this.getPrice()
      },
      // 获取云服务器的价格
      getPrice () {
        //this.getBrand()
        axios.post('device/QueryBillingPrice.do', {
          cpuNum: this.syStemstatus == 1 ? this.serverData.config[0].split('#')[0] : this.gpuData.config[0].split('#')[0],
          diskSize: this.syStemstatus == 1 ? this.serverData.originalDiskSize : this.gpuData.originalDiskSize,
          diskType: 'ssd',
          gpu: this.syStemstatus == 2 ? '100' : '',
          gpuSize: this.syStemstatus == 2 ? this.gpuData.config[0].split('#')[2] : '',
          memory: this.syStemstatus == 1 ? this.serverData.config[0].split('#')[1] : this.gpuData.config[0].split('#')[1],
          timeType: this.parameter.defaultUse[0] >=12 ? 'year' : 'month',
          timeValue: this.parameter.defaultUse[0] >=12 ? this.parameter.defaultUse[0]/12 : this.parameter.defaultUse[0],
          zoneId: this.server[0]
        }).then(res => {
          if (res.status == 200 && res.data.status == 1) {
            if (this.syStemstatus == 1) {
              this.serverData.defalutPrice = res.data.cost + this.brandPrice
              this.allPrice = (this.serverData.defalutPrice * this.buyNums).toFixed(2)
              this.originalPrice = this.serverData.defalutPrice
              this.allPrice = (parseFloat(this.allPrice) + (parseFloat(this.diskSizePrice) * this.buyNums)).toFixed(2)
            } else {
              this.gpuData.defalutPrice = res.data.cost + this.brandPrice
              this.allPrice = (this.gpuData.defalutPrice * this.buyNums).toFixed(2)
              this.originalPrice = this.gpuData.defalutPrice
              this.allPrice = (parseFloat(this.allPrice) + parseFloat(this.diskSizePrice) * this.buyNums).toFixed(2)
            }
          }
        })
      },
      // 立即购买
      oneBuy () {
        if (this.$store.state.userInfo == null) {
          // 未登录
          //return this.$router.push('Register')
          window.open('https://csm.xrcloud.net/Register', '_self')
        } else if(this.$store.state.isCheck) {
          // 未认证
          this.certify = 'certify'
          return false
        } else {
          //云服务器
          if (this.syStemstatus == 1) {
            axios.get('information/deployVirtualMachine.do', {
              params: {
                zoneId: this.server[0],
                templateId: this.gpuData.defaultSys[1],
                bandWidth: this.parameter.bandwidth[0],
                timeType: this.parameter.defaultUse[0] >=12 ? 'year' : 'month',
                timeValue: this.parameter.defaultUse[0] >=12 ? this.parameter.defaultUse[0]/12 : this.parameter.defaultUse[0],
                count: this.parameter.number[0],
                isAutoRenew: 0,
                cpuNum: this.serverData.config[0].split('#')[0],
                memory: this.serverData.config[0].split('#')[1],
                networkId: 'no',
                rootDiskType: 'ssd',
                rootDiskSize: '40',
                vpcId: 'no',
                diskType: 'ssd',
                diskSize: this.parameter.ssd[0]
              }
            }).then(res => {
              if (res.status == 200 && res.data.status == 1) {
                sessionStorage.setItem('countOrder', this.allPrice.toString())
                //this.$router.push('orderconfirm')
                window.open('https://csm.xrcloud.net/orderconfirm','_self')
              } else if (res.status == 200 && res.data.status == 2) {
                this.$vux.toast.text(res.data.message, 'middle')
              }
            })
          } else {
            // GPU服务器
            axios.get('gpuserver/createGpuServer.do', {
              params: {
                zoneId: this.server[0],
                templateId: this.gpuData.defaultSys[1],
                bandWidth: this.parameter.bandwidth[0],
                timeType: this.parameter.defaultUse[0] >=12 ? 'year' : 'month',
                timeValue: this.parameter.defaultUse[0] >=12 ? this.parameter.defaultUse[0]/12 : this.parameter.defaultUse[0],
                count: this.parameter.number[0],
                isAutoRenew: 0,
                cpuNum: this.syStemstatus == 1 ? this.serverData.config[0].split('#')[0] : this.gpuData.config[0].split('#')[0],
                memory:  this.syStemstatus == 1 ? this.serverData.config[0].split('#')[1] : this.gpuData.config[0].split('#')[1],
                networkId: 'no',
                rootDiskType: 'ssd',
                vpcId: 'no',
                gpusize: this.gpuData.config[0].split('#')[2],
                serviceType: 'G5500',
                diskType: this.parameter.ssd[0] != 0 ? 'ssd' : '',
                diskSize: this.parameter.ssd[0]
              }
            }).then(res => {
              if (res.status == 200 && res.data.status == 1) {
                sessionStorage.setItem('countOrder', this.allPrice.toString())
                window.open('https://csm.xrcloud.net/orderconfirm','_self')
              } else {
                this.$vux.toast.text(res.data.message, 'middle')
              }
            })
          }
        }
      },
      // toStorage () {
      //   this.$router.push('Storage')
      // },
      // toAcdata () {
      //   this.$router.push('acdata')
      // }
    },
    created () {
      axios.get('activity/getTemActInfoById.do', {
        params: {
          activityNum: '48'
        }
      }).then(res => {
        if (res.status == 200 && res.data.status == 1) {
          var datas = res.data.result.resultByJson
          // 免费主机区域选择
          this.freeAreaList = res.data.result.optionalArea
          this.freeArea = [res.data.result.optionalArea[0].value]
          // 热销云主机区域选择
          this.areaList = res.data.result.optionalArea
          this.area = [res.data.result.optionalArea[0].value]
          // 云主机与GPU服务器区域选择
          this.serverList = res.data.result.optionalArea
          this.server = [res.data.result.optionalArea[0].value]
          // 热销云主机系统
          var sell = [datas['2#4#2'],datas['2#8#5'],datas['4#8#5'],datas['8#16#10']]
          for(var n = 0; n < sell.length; n++) {
            sell[n][0].area = this.area
          }
          this.sellList = sell

          // 1
          datas['2#4#2'].forEach(e => {
            var time1 = ''
            if (e.days >= 360) {
              time1 = (e.days/30)/12 + '年'
            } else if (e.days < 360 && e.days >= 30) {
              time1 = e.days/30 + '个月'
            } else {
              time1 = e.days + '天'
            }
            this.timeList1.push({name:`${(time1)}(${(e.discount)*10}折)`, value:(e.days)/30+','+ e.discount})
          })
          this.timeValue1 = [this.timeList1[0].value]
          // 2
          datas['2#8#5'].forEach(e => {
            var time2 = ''
            if (e.days >= 360) {
              time2 = (e.days/30)/12 + '年'
            } else if (e.days < 360 && e.days >= 30) {
              time2 = e.days/30 + '个月'
            } else {
              time2 = e.days + '天'
            }
            this.timeList2.push({name:`${(time2)}(${(e.discount)*10}折)`, value:(e.days)/30+','+ e.discount})
          })
          this.timeValue2 = [this.timeList2[0].value]
          // 3
          datas['4#8#5'].forEach(e => {
            var time3 = ''
            if (e.days >= 360) {
              time3 = (e.days/30)/12 + '年'
            } else if (e.days < 360 && e.days >= 30) {
              time3 = e.days/30 + '个月'
            } else {
              time3 = e.days + '天'
            }
            this.timeList3.push({name:`${(time3)}(${(e.discount)*10}折)`, value:(e.days)/30+','+ e.discount})
          })
          this.timeValue3 = [this.timeList3[0].value]
          // 4
          datas['8#16#10'].forEach(e => {
            var time4 = ''
            if (e.days >= 360) {
              time4 = (e.days/30)/12 + '年'
            } else if (e.days < 360 && e.days >= 30) {
              time4 = e.days/30 + '个月'
            } else {
              time4 = e.days + '天'
            }
            this.timeList4.push({name:`${(time4)}(${(e.discount)*10}折)`, value:(e.days)/30+','+ e.discount})
          })
          this.timeValue4 = [this.timeList4[0].value]

          for(var i=0;i<this.sellList.length;i++){
            //获取价格
            this.getPirce(this.sellList[i],i)
            // 获取系统，避免系统选择同时改变
            this.getSystem(this.sellList[i],i)
          }

          this.getBrand()
          // 获取免费主机配置
          this.getActive()
          // 云服务器和GPU服务器系统切换
          this.getGpuSystem(this.gpuData)
          this.getConfig()
        }
      })
      // 获取GPU区域
      axios.get('information/zone.do', { params: { t: new Date().getTime() } }).then(res => {
        if (res.status == 200 && res.data.status == 1) {
          var areaList = res.data.result
          for (let i = 0; i < areaList.length; i++) {
            if (areaList[i].gpuserver === 1) {
              this.gpuList.push({name: areaList[i].zonename, value: areaList[i].zoneid})
            }
            if (areaList[i].gpuserver === 0) {
              this.hotArea.push({name: areaList[i].zonename, value: areaList[i].zoneid})
            }
          }
          this.gpu[0] = this.gpuList[0].value
          this.gpuData.defaultDis[0] = this.gpuList[0].value
          this.getGpu(this.gpuData)
        }
      })
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .banner {
      width: 100%;
      padding-bottom:25px;
      background: url('../../../assets/img/active/freeAnnual/bannerbg.png') no-repeat,linear-gradient(180deg, #3b9ff6 0%, #3b9bf1 2%);//url('../../../assets/img/active/freeAnnual/bannerbg.png') no-repeat,
      background-size: 100% 333px;
      position: relative;
      .banner-top {
        width: 100%;
        text-align: center;
        padding-top: 50px;
        box-sizing: border-box;
        img {
          width: 220px;
        }
      }
      .banner-nav{
        padding-left: 10px;
        box-sizing: border-box;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        margin-top: 20px;
        .banner-nav-item{
          width: 160px;
          height: 30px;
          background: url('../../../assets/img/active/freeAnnual/num.png') no-repeat;
          background-size: cover;
          margin-top: 10px;
          margin-left: 10px;
          font-size: 12px;
          color: white;
          line-height:30px;
          box-sizing: border-box;
          display: flex;
          span{
            font-size: 25px;
            font-weight: bold;
            line-height:18px;
            margin: 6px 5px 0 26px;
            display: block;
          }
        }
      }
      // .banner-logo{
      //   position: fixed;
      //   right: 10px;
      //   z-index: 99;
      //   img{
      //     width: 25%;
      //     height: 25%;
      //   }
      // }
  }

  .top {
    padding: 25px 0 15px 0;
    text-align: center;
    h1 {
        font-size: 18px;
        font-weight:600;
        color:rgba(2,3,38,1);
        line-height:25px;
    }
    p {
        font-size: 12px;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height: 20px;
    }
    span {
        font-size: 12px;
        font-weight:400;
        color:rgba(248,94,29,1);
        line-height:16px;
    }
  }

  .content {
    .content-top {
      margin: 0 10px 25px 10px;
      .item-top {
        padding: 12px 0px 13px 15px;
        p {
          font-size: 18px;
          font-weight: 600;
          color: rgba(255, 255, 255, 1);
          line-height:25px;
        }
        span {
          font-size: 12px;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          line-height:16px;
        }
      }
      .indexOne {
        background: url('../../../assets/img/active/freeAnnual/head-1.png') no-repeat center;
        background-size:cover;
      }
      .indexTwo {
        background: url('../../../assets/img/active/freeAnnual/head-3.png') no-repeat center;
        background-size: cover;
      }
      .indexThree{
        background: url('../../../assets/img/active/freeAnnual/head-2.png') no-repeat center;
        background-size: cover;
      }
      .item-choose {
          background:rgba(255,255,255,1);
          box-shadow:0 5px 16px -6px rgba(56,84,206,0.5);
          border:1px solid rgba(218,218,218,1);
          margin-bottom: 20px;
          .configs {
              background: #FFFFFF;
              display: flex;
              align-items: center;
              justify-content: space-between;
              padding: 19px 45px 19px 25px;
              p{
                  font-size: 16px;
                  font-weight:500;
                  color:rgba(2,3,38,1);
                  line-height:28px;
                  span {
                      color: #9B9B9B;
                      font-size: 12px;
                  }
              }
          }
         .deposit {
          margin-left: 15px;
          padding: 24px 25px 19px 0px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid #e7e7e7;
          .deposit-left {
            p {
                &:first-of-type{
                   font-size: 14px;
                   font-weight:400;
                   color:rgba(230,0,27,1);
                   line-height:20px;
                   span {
                       font-size: 24px;
                       font-weight: 600;
                   }
               }
                &:last-of-type {
                     span {
                         text-decoration: line-through;
                         font-size: 14px;
                         font-weight:400;
                         color:rgba(153,153,153,1);
                         line-height:40px;
                         display: block;
                    }
                     .money {
                         display: inline-block;
                         padding-right: 5px;
                         color:rgba(102,102,102,1);
                         text-decoration: none;
                    }
                }
            }
          }
          button {
            background:rgba(246,109,89,1);
            outline: none;
            border: none;
            font-size: 14px;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            line-height: 20px;
            padding: 10px 24px;
          }
        }
      }
    }

  }

  .warns {
      margin: 10px 10px 25px 10px;
      p {
          font-size: 12px;
          font-weight:500;
          color:rgba(90,87,125,1);
          line-height:16px;
          span {
              color: #F66D59;
          }
      }
  }

  .steps {
      width: 100%;
      background:rgba(25,18,117,1);
      padding-top: 50px;
      h1 {
          font-size: 18px;
          font-weight:600;
          color:rgba(255,255,255,1);
          line-height:25px;
          text-align: center;
      }
      ul {
          margin: 40px 10px 10px 10px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          li {
              width: 33.3%;
              list-style: none;
              margin-bottom: 40px;
              img {
                  width: 80px;
                  height: 60px;
                  display: block;
                  margin: 0 auto;
              }
          }
      }
  }

  .sell{
    .sell-header {
      text-align: center;
      padding: 15px 0 15px 0;
      box-sizing: border-box;
      width: 100%;
      >p {
        display: block;
        &:first-of-type {
          font-size: 18px;
          font-weight: bold;
          line-height:25px;
          margin-bottom: 10px;
        }
        &:last-of-type {
          font-size: 12px;
          line-height:16px;
          span{
            color: #f85e1d;
          }
        }
      }
    }
  }

  .aggregate {
    width: 100%;
    background: rgba(242,248,255,1);
    padding: 0 10px 10px 10px;
    box-sizing: border-box;
    .aggregate-head {
      text-align: center;
      padding: 15px 0;
      box-sizing: border-box;
      p {
        &:first-of-type {
          font-size: 18px;
          font-weight: 600;
          line-height:25px;
          margin-bottom: 10px;
        }
        &:last-of-type {
          font-size: 14px;
          font-weight: 400;
          line-height:16px;
        }
      }
    }
    .item-top {
      padding: 12px 0px 13px 15px;
      p {
        font-size: 18px;
        font-weight: 600;
        color: rgba(255, 255, 255, 1);
        line-height:25px;
      }
      span {
        font-size: 12px;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height:16px;
      }
    }
    .indexFoure {
      background: url('../../../assets/img/active/freeAnnual/head-2.png') no-repeat center;
      background-size: cover;
    }
    .item-choose {
        background:rgba(255,255,255,1);
        box-shadow:0 5px 16px -6px rgba(56,84,206,0.5);
        border:1px solid rgba(218,218,218,1);
       .deposit {
        margin-left: 15px;
        padding: 24px 25px 19px 8px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-top: 1px solid #e7e7e7;
        .deposit-left {
          p {
              &:first-of-type{
                 font-size: 14px;
                 font-weight:400;
                 color:rgba(230,0,27,1);
                 line-height:20px;
                 span {
                     font-size: 24px;
                 }
             }
              &:last-of-type {
                   span {
                       text-decoration: line-through;
                       font-size: 14px;
                       font-weight:400;
                       color:rgba(153,153,153,1);
                       line-height:20px;
                  }
                   .money {
                       display: inline-block;
                       padding-right: 15px;
                       color:rgba(102,102,102,1);
                       text-decoration: none;
                  }
              }
          }
        }
        button {
          background:rgba(246,109,89,1);
          outline: none;
          border: none;
          font-size: 14px;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          line-height: 20px;
          padding: 10px 24px;
        }
      }
    }
  }

  .coupon {
    width: 100%;
    background: rgba(255,255,255,1);
    .coupon-title {
      font-size: 18px;
      font-weight: 600;
      text-align: center;
      padding: 15px 0;
      box-sizing: border-box;
      line-height:25px;
      span{
        color: #f85e1d;
        font-size: 12px;
        font-weight: 500;
      }
    }
    .coupon-box {
      display: flex;
      justify-content: space-between;
      padding: 0 10px;
      box-sizing: border-box;
      div{
        width: 345px;
        .left,.right  {
          padding: 39px 0;
          box-sizing: border-box;
          width: 100%;
          height: 100%;
          font-size: 14px;
          text-align: center;
          line-height: 30px;
          span{
            font-weight: 600;
          }
        }
        .left {
          background: url('../../../assets/img/active/freeAnnual/left.png') no-repeat center;
          background-size: cover;
        }
        .right {
          background: url('../../../assets/img/active/freeAnnual/right.png') no-repeat center;
          background-size: cover;
        }
        .btn {
          height: 70px;
          width: 100%;
          box-shadow: 0px 3px 10px -3px rgba(237,190,175,0.7);
          button {
            width: 200px;
            height: 50px;
            background: rgba(254,98,75,1);
            border-radius: 3px;
            outline: none;
            border: none;
            color: white;
            margin: 10px 72px;
          }
        }
      }
    }
    .coupon-coupon {
      padding: 10px 10px;
      box-sizing: border-box;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      .img-wrap {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        img {
          width: 180px;
          height: 83px;
        }
      }
      .btn {
        width: 100%;
        padding: 20px 0;
        box-sizing: border-box;
        text-align: center;
        button {
          width: 200px;
          height: 40px;
          background: rgba(254,98,75,1);
          border-radius: 20px;
          border: 1px solid rgba(151,151,151,1);
          color: white;
          font-size: 16px;
          border: none;
          outline: none;
        }
      }
    }
  }

  .userAlert {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 1000;
      width: 100%;
      height: 100%;
      opacity: 0;
      visibility: hidden;
      background: rgba(0, 0, 0, 0.7);
      transition: opacity 0.3s 0s, visibility 0s 0.3s;
      .alert {
          position: absolute;
          left: 50%;
          margin-left: -166px;
          top: 120px;
          height: 425px;
          width: 335px;
          transform: scale(1.2);
          transition-property: transform;
          transition-duration: 0.3s;
          background:rgba(255,255,255,1);
          box-shadow:0px 1px 0px 0px rgba(229,229,229,1);
          border-radius:10px 10px 0px 0px;
          .head {
              padding: 12px 15px;
              position: relative;
              p {
                  text-align: center;
                  font-size: 18px;
                  font-weight:600;
                  color:rgba(2,3,38,1);
                  line-height:24px;
              }
              img {
                  position: absolute;
                  top: 35%;
                  right: 15px;
                  width: 15px;
                  height: 15px;
                  display: block;
              }
          }
          .content {
              height:325px;
              padding: 12px 15px 25px 15px;
              border-top: 1px solid rgba(216,216,216,1);
              border-bottom: 1px solid rgba(216,216,216,1);
              overflow-y: auto;
              li {
                  text-align: left;
                  list-style: none;
                  font-size: 16px;
                  font-weight:500;
                  color:rgba(2,3,38,1);
                  line-height:24px;
              }
          }
          .foot {
              margin: 10px 0;
              button {
                  display: block;
                  margin: 0 auto;
                  outline: none;
                  border: none;
                  width: 110px;
                  height: 40px;
                  text-align: center;
                  background:rgba(25,18,117,1);
                  border-radius:6px;
                  font-size: 16px;
                  font-weight:500;
                  color:rgba(255,255,255,1);
                  line-height:22px;

              }
          }
      }
      &.showRules {
          opacity: 1;
          visibility: visible;
          transition: opacity .3s 0s, visibility 0s 0s;
          .alert{
              transform: scale(1);
          }
      }
      &.sysRules {
          opacity: 1;
          visibility: visible;
          transition: opacity .3s 0s, visibility 0s 0s;
          .alert{
              transform: scale(1);
          }
      }
      &.couponRules {
          opacity: 1;
          visibility: visible;
          transition: opacity .3s 0s, visibility 0s 0s;
          .alert{
              transform: scale(1);
          }
      }
  }

  .footer {
    text-align: center;
    h1 {
      font-size: 20px;
      font-weight: 600;
      color: rgba(34, 34, 34, 1);
      line-height: 56px;
      padding: 24px 0 30px 0;
    }
    .foot-top {
      background: rgba(32, 32, 35, 1);
      padding: 74px 0 64px 0;
      border-top: 1px dashed #e7e7e7;
      border-bottom: 1px dashed #e7e7e7;
      img {
        width: 240px;
        height: 240px;
        display: block;
        margin: 0 auto;
      }
      h1 {
        font-size: 14px;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 40px;
        padding: 20px 0 66px 0;
      }
      p {
        font-size: 12px;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 34px;
        a {
          font-size: 12px;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          line-height: 34px;
        }
      }
      .addressEN {
        padding-top: 14px;
      }
      .addressZH {
        padding-top: 16px;
      }
    }
    .foot-bottom {
      background: rgba(32, 32, 35, 1);
      ul {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        li {
          text-align: center;
          list-style: none;
          padding: 39px 0 32px 0;
          width: 50%;
          border-bottom: 1px solid #e7e7e7;
          img {
            width: 30px;
            height: 30px;
            display: block;
            margin: 0 auto;
          }
          p {
            font-size: 14px;
            font-weight: 600;
            color: rgba(255, 255, 255, 1);
            line-height: 40px;
            padding-top: 10px;
            &:last-of-type {
              font-size: 12px;
              font-weight: 400;
              color: rgba(255, 255, 255, 0.7);
              line-height: 34px;
              padding-top: 0;
            }
          }
          &:first-of-type {
            border-right: 1px solid #e7e7e7;
          }
          &:last-of-type {
            border-bottom: none;
          }
          &:nth-last-child(2) {
            border-bottom: none;
            border-right: 1px solid #e7e7e7;
          }
        }
      }
    }
    .foot {
      background: rgba(20, 20, 23, 1);
      text-align: center;
      padding: 18px 0;
      p {
        font-size: 20px;
        font-weight: 400;
        color: rgba(255, 255, 255, 0.5);
        line-height: 28px;
        padding-bottom: 8px;
        span {
          &:first-of-type {
            display: inline-block;
            padding-right: 20px;
          }
        }
        .icpIcon {
          position: relative;
          padding-left: 24px;
          &:before {
            content: "";
            position: absolute;
            left: 0;
            top: 0;
            width: 20px;
            height: 20px;
            background: url('../../../assets/img/active/home-m/record.png') no-repeat center top;
            background-size: cover;
          }
        }
      }
    }
  }
  .userAlert {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1000;
    width: 100%;
    height: 100%;
    opacity: 0;
    visibility: hidden;
    background: rgba(0, 0, 0, 0.7);
    transition: opacity 0.3s 0s, visibility 0s 0.3s;
    .alert5 {
      position: absolute;
      left: 50%;
      margin-left: -300px;
      top: 50%;
      margin-top: -372px;
      height: 360px;
      width: 6rem;
      transform: scale(1.2);
      transition-property: transform;
      transition-duration: 0.3s;
      background: #FFFFFF;
      border-radius:10px;
      .top {
        background:linear-gradient(90deg,rgba(12,12,27,1) 0%,rgba(34,36,61,1) 55%,rgba(12,12,27,1) 100%);
        border-radius:10px 10px 0 0;
        position: relative;
        padding: 0;
        h1 {
          padding: 25px 0;
          text-align: center;
          font-size: 18px;
          font-weight:500;
          color:rgba(234,179,128,1);
        }
        img {
          width: 30px;
          height: 30px;
          display: block;
          position: absolute;
          right: 35px;
          top: 35px;
        }
      }
      .rules {
        text-indent: 40px;
        font-size: 14px;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:36px;
        padding: 25px 30px 50px 30px;
        border-bottom: 1px solid rgba(216,216,216,1);
      }
      .foot {
        button {
          width:220px;
          background:linear-gradient(90deg,rgba(248,191,136,1) 0%,rgba(255,209,140,1) 36%,rgba(248,191,136,1) 100%);
          border-radius:.06rem;
          display: block;
          outline: none;
          border: none;
          font-size: 16px;
          font-weight:500;
          color:rgba(255,255,255,1);
          line-height:45px;
          padding: 18px 0;
          margin: 10px auto;
        }
      }
    }
    &.certify {
      opacity: 1;
      visibility: visible;
      transition: opacity .3s 0s, visibility 0s 0s;
      .alert5 {
        transform: scale(1);
      }
    }
  }
</style>
