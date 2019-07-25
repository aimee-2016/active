<template>
  <div class="ddos-active">
    <img src="../../../assets/img/active/ddos/background-2-left.png" alt="背景图片">
    <div class="banner">
      <div class="wrap">
        <div class="product">
          <div class="content">
            <div class="left">
              <span>7/25–9/25</span>
              <img
                class="text"
                src="../../../assets/img/active/ddos/ddos-banner-text.png"
                alt="高仿云服务器限时秒杀"
              >
              <p>更有首月8折等超多优惠</p>
            </div>
            <img
              class="banner"
              src="../../../assets/img/active/ddos/ddos-banner.png"
              alt="高仿云服务器限时秒杀"
            >
          </div>
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
        </div>
      </div>
    </div>
    <div class="seckill">
      <div class="wrap">
        <div class="top">
          <div class="text">
            <p>
              每天6场秒杀，2点、6点、10点、14点、18点、22点开抢
              <span>活动规则></span>
            </p>
            <p>
              下场秒杀预告：高防云服务器2核8G、云服务器2核4G、GPU云服务器8核64G、DMS-50G
              <span>更多场次预告 ></span>
            </p>
          </div>
          <div class="timer">
            <i>本场秒杀倒计时</i>
            <div>
              <span>2</span>:
              <span>5</span>
              <span>8</span>:
              <span>2</span>
              <span>2</span>
            </div>
          </div>
        </div>
        <div class="product">
          <div v-for="(item,index) in hotHostList" :key="index">
            <div class="head">
              <h3>{{item.headline}}</h3>
              <span v-if="item.hot" class="hot">爆款</span>
              <span v-if="item.new" class="new">限新用户</span>
            </div>
            <div class="body">
              <div class="params" v-if="index!=4">
                <div class="configure">
                  <ul>
                    <li>
                      <i>CPU</i>
                      <span>{{item.cpu}}核</span>
                    </li>
                    <li>
                      <i>内存</i>
                      <span>{{item.mem}}G</span>
                    </li>
                    <li>
                      <i>宽带</i>
                      <span>{{item.bandwith}}M</span>
                    </li>
                    <li>
                      <i>系统盘</i>
                      <span>
                        {{item.disksize}}G
                        <span>SSD</span>
                      </span>
                    </li>
                  </ul>
                </div>
                <div v-if="item.pronum">
                  <span class="label">防御：</span>
                  {{ item.pronum }}G
                </div>
                <div v-if="item.gpu">
                  <span class="label">GPU：</span>
                  P{{ item.gpu }}
                </div>
                <div v-if="index==0||index==1">
                  <span class="label">区域：</span>
                  华东一区
                </div>
                <div v-else>
                  <span class="label">区域：</span>
                  <Select
                    v-model="item.zone"
                    style="width:142px;display:inline-block"
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
                  <Cascader
                    :data="item.systemList"
                    v-model="item.system"
                    style="width:142px;display:inline-block"
                  ></Cascader>
                </div>
              </div>
              <div class="params" v-else>
                <div class="configure">
                  <ul>
                    <li>
                      <i>端口数</i>
                      <span>{{item.ports}}</span>
                    </li>
                    <li>
                      <i>域名数</i>
                      <span>{{item.domains}}</span>
                    </li>
                    <li>
                      <i>宽带</i>
                      <span>{{item.bandwith}}M</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <span class="label">DDoS防护：</span>
                  {{item.ddospros}}
                </div>
                <div>
                  <span class="label">cc防护：</span>
                  {{item.ccpros}}
                </div>
                <div>
                  <span class="label">区域：</span>
                  中国大陆
                </div>
              </div>
              <div class="cost">
                <div class="price">
                  ￥
                  <span>{{item.price}}</span>/{{item.time==12?'月':'年'}}
                </div>
                <div class="origin-price">
                  原价：￥
                  <span>{{item.originPrice}}</span>
                </div>
                <div>
                  <Button class="btn" @click="pushOrderHot(item)">立即购买</Button>
                </div>
              </div>
              <div class="percentage">
                <span>已抢购100%</span>
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
          <span style="color:#EED292;" @click="showModal.ruleHost=true">活动规则></span>
        </p>
      </div>
      <div class="product">
        <div class="wrap">
          <ul>
            <li v-for="(item,index) in ddosList" :key="index">
              <div class="title">
                <p>高防云服务器 {{item.config}}</p>
              </div>
              <div class="content">
                <div class="left">
                  <dl>
                    <dt>带宽</dt>
                    <dd>{{item.bandwith}}M</dd>
                  </dl>
                  <dl>
                    <dt>区域</dt>
                    <dd>{{item.zone}}</dd>
                  </dl>
                  <dl>
                    <dt>系统</dt>
                    <dd>
                      <Cascader
                        :data="systemList1"
                        v-model="system1"
                        style="width:142px;display:inline-block"
                      ></Cascader>
                    </dd>
                  </dl>
                  <dl>
                    <dt>防御</dt>
                    <dd>
                      <span
                        :class="{select:item.disk==item1}"
                        v-for="(item1,index) in item.diskList"
                        :key="index"
                      >{{item1}}G</span>
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
                  <Button class="btn">立即购买</Button>
                </div>
              </div>
            </li>
          </ul>
          <div class="tips">
            以上配置皆包含40G SSD系统盘
            <span>查看更多配置>></span>
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
          <p style="color:#666666">高防云服务器买3/6/12个月赠送188元域名无门槛抵用券</p>
        </div>
        <div class="product">
          <div v-for="(item,index) in hotHostList1" :key="index">
            <div class="head">
              <h3>{{item.headline}}</h3>
            </div>
            <div class="body">
              <div class="configure">
                <ul>
                  <li>
                    <i>系统盘:</i>
                    <span>
                      {{item.config.disksize}}G
                      <span>SSD</span>
                    </span>
                  </li>
                  <li>
                    <i>宽带:</i>
                    <span>{{item.config.bandwith}}M</span>
                  </li>
                  <li>
                    <i>区域:</i>
                    <span>{{item.zone}}</span>
                  </li>
                  <li>
                    <i>防护等级:</i>
                    <span>{{item.config.mem}}G</span>
                  </li>
                </ul>
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
                <span>{{item.originPrice+'/'+month(item.time)}}</span>
              </div>
              <Button class="btn" @click="pushOrderHot(item)">立即购买</Button>
              <p class="text">购买即赠送188元域名无门槛抵用券</p>
            </div>
          </div>
        </div>
        <div class="tips">
          <span>查看更多配置>></span>
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
              <Button class="btn" @click="$router.push('/buy')">立即选购</Button>
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
              <Button class="btn" @click="$router.push('/buy')">立即选购</Button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import axios from 'axios'
import reg from '../../../util/regExp'
import VueQArt from 'vue-qart'
import $ from 'jquery'
export default {
  data () {
    return {
      systemList1: [{
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
        { title: '活动一', text: '高防云产品超低折扣 专属秒杀', distance: 1400, },
        { title: '活动二', text: '高防云服务器首月8折优惠', distance: 2200, },
        { title: '活动三', text: '超低折扣 买时长送域名', distance: 3000, },
        { title: '活动四', text: '自选配置 打折再送时长', distance: 4000, }
      ],
      selectedNav: 0,
      hotHostList: [
        {
          headline: '高防云服务器',
          new: 0,
          hot: 1,
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
          price: '69',
          originPrice: '176.72',
          configId: ''
        },
        {
          headline: '高防云服务器',
          new: 0,
          hot: 0,
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
          price: '69',
          originPrice: '176.72',
          configId: ''
        },
        {
          headline: '弹性云服务器',
          new: 1,
          hot: 1,
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
          price: '69',
          originPrice: '176.72',
          configId: ''
        },
        {
          headline: 'GPU云服务器',
          new: 1,
          hot: 0,
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
          price: '69',
          originPrice: '176.72',
          configId: ''
        },
        {
          headline: 'DDOS高防IP',
          new: 0,
          hot: 0,
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
          price: '69',
          originPrice: '176.72',
          configId: ''
        }
      ],
      zoneListHot: [],
      ddosList: [
        {
          config: '2核4G',
          bandwith: 5,
          zone: '华东一区',
          systemList: [],
          system: [],
          diskList: [60, 100, 200],
          disk: 60,
          price: 707.23,
          originPrice: 852.12
        },
        {
          config: '2核8G',
          bandwith: 5,
          zone: '华东一区',
          systemList: [],
          system: [],
          diskList: [60, 100, 200],
          disk: 60,
          price: 790.26,
          originPrice: 852.12
        },
        {
          config: '4核8G',
          bandwith: 5,
          zone: '华东一区',
          systemList: [],
          system: [],
          diskList: [60, 100, 200],
          disk: 60,
          price: 895.67,
          originPrice: 852.12
        },
        {
          config: '4核16G',
          bandwith: 5,
          zone: '华东一区',
          systemList: [],
          system: [],
          diskList: [60, 100, 200],
          disk: 60,
          price: 995.27,
          originPrice: 852.12
        }
      ],
      hotHostList1: [
        {
          headline: '高防云服务器2核4G',
          subtitle: '适用于：日常运营活动、小型开发测试环境、普通数据处理服务等场景。',
          config: {
            cpu: 1,
            mem: 2,
            bandwith: 3,
            disksize: 40
          },
          timeList: [
            { days: 3, discount: 0.8 },
            { days: 6, discount: 0.75 },
            { days: 12, discount: 0.7 }
          ],
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
          zone: '华东一区',
          price: '69',
          originPrice: '176.72',
          configId: ''
        },
        {
          headline: '高防云服务器2核8G',
          subtitle: '适用于：日常运营活动、小型开发测试环境、普通数据处理服务等场景。',
          config: {
            cpu: 1,
            mem: 2,
            bandwith: 3,
            disksize: 40
          },
          timeList: [
            { days: 3, discount: 0.8 },
            { days: 6, discount: 0.75 },
            { days: 12, discount: 0.7 }
          ],
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
          zone: '华东一区',
          price: '69',
          originPrice: '176.72',
          configId: ''
        },
        {
          headline: '高防云服务器4核8G',
          subtitle: '适用于：日常运营活动、小型开发测试环境、普通数据处理服务等场景。',
          config: {
            cpu: 1,
            mem: 2,
            bandwith: 3,
            disksize: 40
          },
          timeList: [
            { days: 3, discount: 0.8 },
            { days: 6, discount: 0.75 },
            { days: 12, discount: 0.7 }
          ],
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
          zone: '华东一区',
          price: '69',
          originPrice: '176.72',
          configId: ''
        },
        {
          headline: '高防云服务器4核16G',
          subtitle: '适用于：日常运营活动、小型开发测试环境、普通数据处理服务等场景。',
          config: {
            cpu: 1,
            mem: 2,
            bandwith: 3,
            disksize: 40
          },
          timeList: [
            { days: 3, discount: 0.8 },
            { days: 6, discount: 0.75 },
            { days: 12, discount: 0.7 }
          ],
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
          zone: '华东一区',
          price: '69',
          originPrice: '176.72',
          configId: ''
        }
      ],
    }
  },
  created () {
    this.getConfigureHot()
  },
  mounted () {
  },
  methods: {
    roll (val, index) {
      this.selectedNav = index
      $('html, body').animate({ scrollTop: val }, 300)
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
          //区域赋值
          this.hotHostList[0].zoneList = this.hotHostList[1].zoneList = res.data.result.optionalAreaHighPrevention
          this.hotHostList[0].zone = this.hotHostList[1].zone = res.data.result.optionalAreaHighPrevention[0].value
          this.hotHostList[2].zoneList = res.data.result.optionalArea
          this.hotHostList[2].zone = res.data.result.optionalArea[0].value
          this.hotHostList[3].zoneList = res.data.result.optionalAreaGpu
          this.hotHostList[3].zone = res.data.result.optionalAreaGpu[0].value
          //参数赋值
          let originArr = res.data.result.freevmconfigs
          this.hotHostList.forEach((item, index) => {
            if (index!=4) {
              item.cpu = originArr[index].cpu
              item.mem = originArr[index].mem
              item.bandwith = originArr[index].bandwith
              item.disksize = originArr[index].disksize
              item.configId = originArr[index].id
              item.time = originArr[index].days
              if (item.pronum) {
                item.pronum = originArr[index]  .pronum
              }
              this.getPriceKill(item)
            } else {
              //高仿ip赋值
              item.ports = originArr[4].ports
              item.domains = originArr[4].domains
              item.bandwith = originArr[4].bandwith
              item.ddospros = originArr[4].ddospros
              item.ccpros = originArr[4].ccpros
              item.configId = originArr[4].id
              item.time = originArr[index].days
              this.getPriceDDOSIP(item)
            }
          })
        }
        //默认选择
        // this.hotHostList.forEach(item => {
        //   // console.log(item)
        //   item.configId = item.timeList[0].id
        //   item.time = item.timeList[0].days
        //   item.zone = this.zoneListHot[0].value
        //   this.changgeTimeHot(item, item.timeList[0])
        // })
      })
    },
    getPriceKill (item) {
      axios.get('activity/getOriginalPrice.do', {
        params: {
          zoneId: item.zone,
          vmConfigId: item.configId,
          month: item.time
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
          vmConfigId: item.configId,
          month: item.time
        }
      }).then(res => {
        if (res.status == 200 && res.data.status == 1) {
          item.price = res.data.result.cost;
          item.originPrice = res.data.result.originalPrice;
        }
      })
    },
    changeZoneHot() {

    },
    month (val) {
      return val >= 360 ? val / 360 + '年' : val / 30 + '个月'
    },
  },
  computed: {

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
.banner {
  background: #2a2936;
  .product {
    .content {
      position: relative;
      height: 313px;
      padding-top: 50px;
      text-align: left;
      .left {
        position: relative;
        z-index: 2;
      }
      span {
        display: block;
        font-size: 28px;
        font-family: Helvetica-Light;
        font-weight: 300;
        color: rgba(255, 255, 255, 1);
        line-height: 34px;
      }
      .text {
        margin: 27px 0 20px 0;
      }
      p {
        font-size: 24px;
        font-family: PingFangSC-Light;
        font-weight: 300;
        color: rgba(255, 237, 210, 1);
        line-height: 33px;
      }
      .banner {
        position: absolute;
        z-index: 1;
        top: 0;
        right: -100px;
      }
    }
    ul {
      display: flex;
      justify-content: space-between;
      li {
        width: 299px;
        height: 118px;
        padding-top: 23px;
        background: rgba(62, 60, 78, 1);
        color: #ffe0a3;
        font-family: MicrosoftYaHei-Bold;
        font-weight: bold;
        cursor: pointer;
        &:hover {
          background: rgba(255, 224, 163, 1);
          color: #222222;
        }
        span {
          display: inline-block;
          font-size: 18px;
          margin-bottom: 15px;
        }
        p {
          font-size: 20px;
        }
      }
    }
  }
}
.seckill {
  padding: 53px 0 60px;
  background: url(../../../assets/img/active/ddos/background-2-right.png) 100%
    60% no-repeat;
  background-color: #2a2936;
  .top {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    .text {
      text-align: left;
      p {
        margin-bottom: 20px;
        font-size: 18px;
        font-family: MicrosoftYaHei-Bold;
        font-weight: bold;
        color: rgba(255, 255, 255, 1);
        line-height: 20px;
        span {
          font-family: MicrosoftYaHei;
          color: rgba(255, 208, 140, 1);
          cursor: pointer;
        }
        &:nth-of-type(2) {
          margin-bottom: 0;
          font-size: 16px;
          font-family: MicrosoftYaHei;
          font-weight: normal;
          color: rgba(255, 255, 255, 1);
          line-height: 21px;
          span {
            font-family: MicrosoftYaHei;
            color: rgba(255, 208, 140, 1);
          }
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
    margin-top: 50px;
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
            color: #fff;
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
</style>
