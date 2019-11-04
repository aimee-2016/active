<template>
  <div class="anniversary">
    <aside>
      <ul>
        <li v-for="(item,index) in asideList" :key="index">{{item.text}}</li>
      </ul>
      <div class="to-top">回到顶部</div>
    </aside>
    <section class="banner">
      <div class="wrap">
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
          <div class="menu">
            <ul>
              <li v-for="(item,index) in bannerNavList" :key="index">
                <div>
                  <p>{{item.title}}</p>
                  <span v-if="item.text">{{item.text}}</span>
                </div>
              </li>
            </ul>
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
          <span class="desc">老用户邀请新用户成功购买以下任1款商品（域名专区除外），即可获得“爆款秒杀专区”或“企业用户限购专区”的额外购买权1次。</span>
          <span class="btn">邀请新用户</span>
        </div>
        <div class="seckill">
          <header class="sub-head">
            <h2>爆款秒杀专区</h2>
            <p>
              爆款云产品，邀新送好礼
              <span>活动规则></span>
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
                    <div class="row-yellow" v-if="item.servicetype=='oss'">存储规格：1TB</div>
                    <div class="row-yellow" v-if="item.servicetype=='oss'">下载流量：1TB</div>
                    <div :class="{mb10:item.servicetype=='G5500'}">
                      <span class="label">区域：</span>
                      <Select
                        v-model="item.zone"
                        style="width:142px"
                        @on-change="changeZoneSeckill(item)"
                      >
                        <Option
                          v-for="(item,index) in item.zoneList"
                          :value="item.value"
                          :key="index"
                        >{{ item.name }}</Option>
                      </Select>
                    </div>
                    <div v-if="item.servicetype!='oss'" :class="{mb10:item.servicetype=='G5500'}">
                      <span class="label">系统：</span>
                      <Cascader
                        :data="item.systemList"
                        v-model="item.system"
                        style="width:142px;display:inline-block"
                      ></Cascader>
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
                <span class="btn" @click="orderSeckill(item)">立即抢购</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div class="wrap">
        <div class="enterprise">
          <header class="sub-head">
            <h2>企业用户限购专区</h2>
            <p>
              企业限购专区，老用户享同等价购买
              <span>活动规则></span>
            </p>
          </header>
          <div class="container">
            <div class="item" v-for="(item,index) in enterpriseList" :key="index">
              <div class="left">
                <p>{{item.cpu+'核'+item.mem+'G '+item.bandwith+'M带宽'}}</p>
                <span>{{item.disksize+'G '+item.disktype.toUpperCase()+'盘'}}</span>
              </div>
              <div class="content">
                <ul class="center">
                  <li>
                    <span class="label">区域</span>
                    <Select v-model="item.zone" style="width:150px">
                      <Option
                        v-for="(item,index) in item.zoneList"
                        :value="item.value"
                        :key="index"
                      >{{ item.name }}</Option>
                    </Select>
                  </li>
                  <li>
                    <span class="label">系统</span>
                    <Cascader
                      :data="item.systemList"
                      v-model="item.system"
                      style="width:230px;display:inline-block"
                    ></Cascader>
                  </li>
                  <li>
                    <span class="label">可选时长</span>
                    <div class="time">
                      <span
                        v-for="(inner,index) in item.timeList"
                        :key="index"
                        @click="changeTimeE(item,inner,index)"
                        :class="{'selected':inner == item.days}"
                      >{{inner/360}}年</span>
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
                  <span class="btn" @click="orderSeckill(item)">立即抢购</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="database">
          <header class="sub-head">
            <h2>云数据库限购专区</h2>
            <p>
              数据库现时抢购
              <span>活动规则></span>
            </p>
          </header>
          <div class="content">
            <div class="item"></div>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div class="wrap">
        <div class="domain">
          <header class="sub-head">
            <h2>域名专区</h2>
          </header>
          <div class="container">
            <div class="item">
              <header>
                <h3>.club 域名</h3>
                <div class="input-group">
                  <input
                    v-model="valueDomain"
                    type="text"
                    placeholder="Enter something..."
                    style="width: 230px;height:30px"
                  />
                  <img src="../../../assets/img/active/anniversary/search-icon.png" alt="搜索图标" />
                </div>
              </header>
              <div class="content">
                <div class="price">
                  ¥11.00
                  <span>/1年</span>
                </div>
                <span class="btn">立即抢购</span>
              </div>
            </div>
          </div>
        </div>
        <div class="renew">
          <header class="sub-head">
            <h2>续费专区</h2>
            <p>
              老用户续费折扣享不停
              <span>活动规则></span>
            </p>
          </header>
          <div class="container">
            <div class="item">
              <div></div>
              <div class="discount">
                <p>
                  <span>1.17</span>
                  <i>折</i>
                </p>
                <span>年续费券</span>
              </div>
              <span class="btn">我要续费</span>
              <div class="text">
                <span>新睿云11.17周年庆回馈老用户</span>
                <p>
                  云服务器年续费一律
                  <span>1.17折</span>
                </p>
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
            <img src="../../../assets/img/active/anniversary/qrCode.png" alt="新睿云二维码" />
            <span>扫码分享</span>
          </div>
          <div class="url">
            <p class="btn">
              <img src="../../../assets/img/active/anniversary/aa-url-icon.png" alt="f分享图标" />
              复制链接
            </p>
            <span>链接分享</span>
          </div>
        </div>
      </div>
      <div slot="footer"></div>
    </Modal>
    <Modal
      v-model="showModal.ruleKill"
      width="550"
      class="aa-modal ruleKill"
      title="邀请新用户"
      :mask-closable="false"
    >
      <div class="content">
        <ul>
          <li></li>
        </ul>
      </div>
      <div slot="footer">
        <span class="btn">我知道了</span>
      </div>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
import axios from 'axios'
export default {
  data () {
    return {
      showModal: {
        share: false,
        ruleListKill: false,
        ruleListE: false,
        ruleListDB: false,
        ruleListRenew: false
      },
      asideList: [
        { text: '爆款秒杀', height: '' },
        { text: '企业限购', height: '' },
        { text: '云数据库', height: '' },
        { text: '域名专区', height: '' },
        { text: '续费专区', height: '' }
      ],
      bannerNavList: [
        { title: '爆款云产品', text: '邀新送好礼' },
        { title: '企业限购专区', text: '老用户享同等价购买' },
        { title: '云数据库限时抢购', text: '' },
        { title: '域名最低8元可领', text: '' },
        { title: '老用户续费', text: '折扣享不停' }
      ],
      cityList: [
        {
          value: 'New York',
          label: 'New York'
        },
        {
          value: 'London',
          label: 'London'
        },
        {
          value: 'Sydney',
          label: 'Sydney'
        },
        {
          value: 'Ottawa',
          label: 'Ottawa'
        },
        {
          value: 'Paris',
          label: 'Paris'
        },
        {
          value: 'Canberra',
          label: 'Canberra'
        }
      ],
      model1: '',
      value2: [],
      data2: [{
        value: 'beijing',
        label: '北京',
        children: [
          {
            value: 'gugong',
            label: '故宫'
          },
          {
            value: 'tiantan',
            label: '天坛'
          },
          {
            value: 'wangfujing',
            label: '王府井'
          }
        ]
      }, {
        value: 'jiangsu',
        label: '江苏',
        children: [
          {
            value: 'nanjing',
            label: '南京',
            children: [
              {
                value: 'fuzimiao',
                label: '夫子庙',
              }
            ]
          },
          {
            value: 'suzhou',
            label: '苏州',
            children: [
              {
                value: 'zhuozhengyuan',
                label: '拙政园',
              },
              {
                value: 'shizilin',
                label: '狮子林',
              }
            ]
          }
        ],
      }],
      valueDomain: '',
      seckillList: [],
      enterpriseList: [],
      ruleListKill: [
        '1、活动时间：2019.11.7-2019.12.31',
        '2、活动对象：新老用户皆可参与；新用户是未使用过平台资源（第三方产品除外）及未参加过其他免费活动并已通过实名认证的用户',
        '3、活动期间同一用户（同一手机、邮箱、实名认证用户视为同一用户）可同时购买GPU服务器1次、对象存储1次',
        '4、新用户可直接购买任意一台爆款云服务器，购买成功后再邀请1名新用户成功购买周年庆活动产品（域名除外）即可获得“爆款秒杀专区”或“企业用户限购专区”的额外购买权1次；老用户成功邀请1名新用户购买周年庆活动产品，即可获得“爆款秒杀专区”或“企业用户限购专区”的额外购买权1次，购买权可叠加；',
        '5、参与本次活动购买的产品不能进行退款。',
        '6、此次活动产品不能用于转售，如若利用资源从事违法违规行为的用户，新睿云有权收回使用资格，并且不予退款。',
        '7、购买时不可使用任何优惠券和现金券，秒杀活动不支持会员折扣。',
        '8、活动最终解释权为新睿云所有。'
      ],
      ruleListE: [
        '1、活动时间：2019.11.7-2019.12.31',
        '2、活动对象：活动期间企业用户限购1台，新老用户皆可参与。新用户是未使用过平台资源（第三方产品除外）及未参加过其他免费活动并已通过实名认证的用户',
        '3、企业新用户可直接购买任意一台爆款云服务器，购买成功后再邀请1名新用户成功购买周年庆活动产品（域名除外）即可获得“爆款秒杀专区”或“企业用户限购专区”的额外购买权1次；老用户成功邀请1名新用户购买周年庆活动产品，即可获得“爆款秒杀专区”或“企业用户限购专区”的额外购买权1次，购买权可叠加；',
        '4、参与本次活动购买的产品不能进行退款。',
        '5、此次活动产品不能用于转售，如若利用资源从事违法违规行为的用户，新睿云有权收回使用资格，并且不予退款。',
        '6、购买时不可使用任何优惠券和现金券，限购活动不支持会员折扣。',
        '7、活动最终解释权为新睿云所有。'
      ],
      ruleListDB: [
        '1、活动时间：2019.11.7-2019.12.31，每天7点至23.17点开抢。',
        '2、活动对象：新老用户皆可参与。新用户是未使用过平台资源（第三方产品除外）及未参加过其他免费活动并已通过实名认证的用户',
        '3、数量限制：活动期间同一用户（同一手机、邮箱、实名认证用户视为同一用户）按照不同的配置进行抢购，同配置产品可以同时购买不同时长，但每款配置同一时长只能购买一次。数量有限，先到先得。',
        '4、参与本次活动购买的产品不能进行退款。',
        '5、此次活动产品不能用于转售，如若利用资源从事违法违规行为的用户，新睿云有权收回使用资格，并且不予退款。',
        '6、购买时不可使用任何优惠券和现金券，限购活动不支持会员折扣。',
        '7、活动最终解释权为新睿云所有。'
      ],
      ruleListRenew: [
        '1、 年续费券限领1张，有效期为1年',
        '2、 仅限有已经购买云产品的用户领取',
        '3、 此次活动券仅用于支付新睿云平台订单支付时，抵减应支付的订单金额，不能进行兑现或其他用途'
      ],
    }
  },
  created () {
    this.getSeckill()
    this.getEnterprise()
    this.getDatabase()
  },
  mounted () {

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
                item.system = [item.systemList[0].label, item.systemList[0].children[0].value]
                break;
              case 'G5500':
                item.zoneList = response.data.result.optionalAreaGpu
                item.zone = item.zoneList[0].value
                this.$set(item, 'systemList', this.formatSystem(response.data.result.gpuTem))
                item.system = [item.systemList[0].label, item.systemList[0].children[0].value]
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
      console.log(item)
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
          console.log(item.systemList)
        }
      })
    },
    getPrice (item) {
      let url = 'activity/getHostOriginalPrice.do'
      let params = {
        cpuNum: item.cpu,
        diskSize: item.disksize,
        diskType: item.disktype,
        memory: item.mem,
        timeType: item.days < 360 ? 'month' : 'year',
        timeValue: item.days < 360 ? item.days / 30 : item.days / 360,
        zoneId: item.zone,
      }
      if (item.servicetype == 'G5500') {
        params.gpu = item.gpu
        params.gpuSize = item.gpusize
      }
      axios.get(url, {
        params: params
      }).then(response => {
        if (response.status == 200 && response.data.status == 1) {

        }
      })
    },
    orderSeckill (item) {
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
      axios.get(url, {
        params: params
      }).then(response => {
        if (response.status == 200 && response.data.status == 1) {
          window.open('https://kfi.xrcloud.net/order', '_self')
        } else {
          this.$Message.info(response.data.message)
        }
      })
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
            this.enterpriseList[i].timeList = this.enterpriseList[i].days.split(',')
            this.enterpriseList[i].days = this.enterpriseList[i].timeList[0]
            this.enterpriseList[i].costList = this.enterpriseList[i].cost.split(',')
            this.enterpriseList[i].cost = this.enterpriseList[i].costList[0]
            this.enterpriseList[i].originalPriceList = this.enterpriseList[i].originalPrice.split(',')
            this.enterpriseList[i].originalPrice = this.enterpriseList[i].originalPriceList[0]
            this.enterpriseList[i].idList = this.enterpriseList[i].id.split(',')
            this.enterpriseList[i].id = this.enterpriseList[i].idList[0]
          }
        }
        console.log(this.enterpriseList)
      })
    },
    changeTimeE (item, inner, index) {
      item.days = inner
      item.cost = item.costList[index]
      item.originalPrice = item.originalPriceList[index]
      item.id = item.idList[index]
    },
    getDatabase () {
      axios.get('activity/getActivityInfo.do', {
        params: {
          activityNum: 66
        }
      }).then(response => {
        if (response.status == 200 && response.data.status == 1) {
          // this.enterpriseList = response.data.result.freevmconfigResultMap
          // for (let i in this.enterpriseList) {
          //   this.enterpriseList[i].zoneList = response.data.result.optionalArea
          //   this.enterpriseList[i].zone = this.enterpriseList[i].zoneList[0].value
          //   this.$set(this.enterpriseList[i], 'systemList', this.formatSystem(response.data.result.mvTem))
          //   this.enterpriseList[i].system = [this.enterpriseList[i].systemList[0].label, this.enterpriseList[i].systemList[0].children[0].value]
          //   this.enterpriseList[i].timeList = this.enterpriseList[i].days.split(',')
          //   this.enterpriseList[i].days = this.enterpriseList[i].timeList[0]
          //   this.enterpriseList[i].costList = this.enterpriseList[i].cost.split(',')
          //   this.enterpriseList[i].cost = this.enterpriseList[i].costList[0]
          //   this.enterpriseList[i].originalPriceList = this.enterpriseList[i].originalPrice.split(',')
          //   this.enterpriseList[i].originalPrice = this.enterpriseList[i].originalPriceList[0]
          //   this.enterpriseList[i].idList = this.enterpriseList[i].id.split(',')
          //   this.enterpriseList[i].id = this.enterpriseList[i].idList[0]
          // }
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
    copyUrl () {
      this.$refs.copy.focus()
      var obj = this.$refs.copy
      obj.select()
      document.execCommand("copy");
      try {
        if (document.execCommand("copy")) {
          this.$Message.success("复制成功");
        } else {
          this.$Message.info("平台出小差了");
        }
      } catch (err) {
        if (err) {
          this.$Message.info("该浏览器暂不支持复制");
        }
      }
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
  top: 510px;
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
  height: 577px;
  background: url(../../../assets/img/active/anniversary/anniversary-banner.png)
    center no-repeat;
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
    ul {
      color: #fff;
      padding: 16px 0;
      height: 92px;
      li {
        position: relative;
        display: inline-block;
        width: 240px;
        height: 60px;
        font-size: 18px;
        font-weight: bold;
        color: #fff;
        border-right: 1px solid rgba(151, 151, 151, 1);
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
      li:last-of-type {
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
        position: absolute;
        bottom: 0;
      }
    }
    .content {
      padding: 20px 0 30px 20px;
      .middle {
        height: 162px;
        .configure {
          li {
            display: inline-block;
            margin-right: 20px;
            &:last-of-type {
              margin-right: 0;
            }
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
    // border-bottom: solid 1px #a99b8a;
    margin-bottom: 1px;
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
        li {
          display: inline-block;
          margin-right: 20px;
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
              width: 46px;
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
    width: 350px;
    height: 340px;
    border: 1px goldenrod solid;
    border-radius: 2px;
    header {
      height: 170px;
      padding: 30px 0 0 30px;
      background: url(../../../assets/img/active/anniversary/anniversary-domain-1.png)
        top no-repeat;
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
    .item {
      margin: 0 auto;
      padding-top: 55px;
      width: 615px;
      height: 371px;
      background: url(../../../assets/img/active/anniversary/anniversary-domain-bg.png)
        top no-repeat;
      text-align: center;
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
        margin-top: 50px;
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
  p {
    font-size: 16px;
    text-align: center;
  }
  .wrapper {
    margin-top: 30px;
    text-align: center;
    div {
      display: inline-block;
      span {
        display: inline-block;
        margin-top: 20px;
        font-size: 14px;
      }
    }
  }
  .qr-code {
    width: 100px;
    margin-right: 115px;
    img {
      width: 100px;
    }
  }
  .url {
    width: 120px;
    .btn {
      margin-bottom: 25px;
      width: 120px;
      font-size: 16px;
      border-radius: 20px;
    }
  }
}
</style>
