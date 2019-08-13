<template>
    <!--高仿主机活动页面-->
    <div id="higncopy">
        <!--banner-->
        <div class="banner">
            <img src="../../../assets/img/active/ddos-m/hign-banner.png" alt="">
        </div>

        <!--活动tab-->
        <div class="tabs">
           <ul>
               <li v-for="(item,index) in tabList" :key="item.title" @click="point(index)">
                   <p>{{item.title}}</p>
                   <p>{{item.desc}}</p>
                   <span v-show="item.value">{{item.value}}</span>
               </li>
           </ul>
        </div>

        <!--限时秒杀-->
        <div class="miaosha" ref="active1">
            <div class="title">
                <img src="../../../assets/img/active/ddos-m/msha.png" alt="">
                <p>每天6场秒杀，2点、6点、10点、14点、18点、22点开抢 <br> <span @click="seckilling = 'seckilling'">活动规则</span></p>
            </div>
            <!--倒计时-->
            <div class="down">
                <p>本场秒杀倒计时</p>
                <p><span>{{hours}}</span> ：<span>{{minO}}</span><span>{{minT}}</span> ：<span>{{secO}}</span><span>{{secT}}</span></p>
                <p class="more" @click="showmore = 'showmore'">更多场次预告 ></p>
            </div>
            <div class="onlytime">
                <ul>
                    <li v-for="(item,index) in freevmconfigs" :key="item.id">
                        <div class="hign_host" v-if="item.servicetype == 'high_host'">
                            <div class="top">
                                <p>高防云服务器</p>
                                <span v-if="item.explosives == 1">爆款</span>
                                <span v-if="item.highdist == 1">高配</span>
                            </div>
                            <div class="middle">
                                <p>CPU<br> <span>{{item.cpu}}核</span></p>
                                <p>内存<br> <span>{{item.mem}}G</span></p>
                                <p>带宽<br> <span>{{item.bandwith}}M</span></p>
                                <p>系统盘<br> <span>{{item.disksize}}G SSD</span></p>
                                <p>防御<br> <span>{{item.pronum}}G</span></p>
                            </div>
                            <div class="miao-group">
                                <Group>
                                    <popup-picker title="区域" :data="zoiendListHign" :columns="3" v-model="item.zoneId" show-name @on-change="getSys(item,53)"></popup-picker>
                                    <popup-picker title="系统" :data="item.systemList" :columns="3" v-model="item.systems" show-name></popup-picker>
                                </Group>
                            </div>
                            <div class="buybtn">
                                <div class="price">
                                    <p>￥<span>{{item.cost}}</span>/{{item.days == '1' ? '月' : item.days/12 + '年'}} <span class="old">原价:￥{{item.oldPrice}}/{{item.days == '1' ? '月' : item.days/12 + '年'}}</span></p>
                                    <p class='press'>已抢购{{item.percent}}%</p>
                                </div>
                                <button :class="{over:item.percent == 100}" @click="m_Hign(item)" :disabled="item.percent == 100">立即抢购</button>
                            </div>
                        </div>
                        <div class="hign_host" v-if="item.servicetype == 'host'">
                            <div class="top">
                                <p>云服务器</p>
                                <span class="host gpu" v-if="item.newusers == 1"><a>限新用户</a></span>
                            </div>
                            <div class="middle">
                                <p>CPU<br> <span>{{item.cpu}}核</span></p>
                                <p>内存<br> <span>{{item.mem}}G</span></p>
                                <p>带宽<br> <span>{{item.bandwith}}M</span></p>
                                <p>系统盘<br> <span>{{item.disksize}}G SSD</span></p>
                            </div>
                            <div class="miao-group">
                                <Group>
                                    <popup-picker title="区域" :data="zoiendListH" :columns="3" v-model="item.zoneId" show-name @on-change="getSys(item,53)"></popup-picker>
                                    <popup-picker title="系统" :data="item.systemList" :columns="3" v-model="item.systems" show-name></popup-picker>
                                </Group>
                            </div>
                            <div class="buybtn">
                                <div class="price">
                                    <p>￥<span>{{item.cost}}</span>/{{item.days == '1' ? '月' : item.days/12 + '年'}} <span class="old">原价:￥{{item.oldPrice}}/{{item.days == '1' ? '月' : item.days/12 + '年'}}</span></p>
                                    <p class='press'>已抢购{{item.percent}}%</p>
                                </div>
                                <button :class="{over:item.percent == 100}" @click="m_Host(item)" :disabled="item.percent == 100">立即抢购</button>
                            </div>
                        </div>
                        <div class="hign_host" v-if="item.servicetype == 'G5500'">
                            <div class="top">
                                <p>GPU云服务器</p>
                                <span class="host gpu" v-if="item.newusers == 1"><a>限新用户</a></span>
                            </div>
                            <div class="middle">
                                <p>CPU<br> <span>{{item.cpu}}核</span></p>
                                <p>内存<br> <span>{{item.mem}}G</span></p>
                                <p>带宽<br> <span>{{item.bandwith}}M</span></p>
                                <p>系统盘<br> <span>{{item.disksize}}G SSD</span></p>
                                <p>GPU<br> <span>{{item.gpu}}</span></p>
                            </div>
                            <div class="miao-group">
                                <Group>
                                    <popup-picker title="区域" :data="zoiendListG" :columns="3" v-model="item.zoneId" show-name @on-change="getSys(item,53)"></popup-picker>
                                    <popup-picker title="系统" :data="item.systemList" :columns="3" v-model="item.systems" show-name></popup-picker>
                                </Group>
                            </div>
                            <div class="buybtn">
                                <div class="price">
                                    <p>￥<span>{{item.cost}}</span>/{{item.days == '1' ? '月' : item.days/12 + '年'}} <span class="old">原价:￥{{item.oldPrice}}/{{item.days == '1' ? '月' : item.days/12 + '年'}}</span></p>
                                    <p class='press'>已抢购{{item.percent}}%</p>
                                </div>
                                <button :class="{over:item.percent == 100}" :disabled="item.percent == 100" @click="m_Gpu(item)">立即抢购</button>
                            </div>
                        </div>
                        <div class="hign_host" v-if="item.servicetype == 'high_ip'">
                            <div class="top">
                                <p>高防IP</p>
                                <p class="ip">
                                    DDoS防护：{{item.ddospros}}Gbps  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; cc防护：{{item.ccpros}}Qps
                                </p>
                                <span>多线防护</span>
                            </div>
                            <div class="middle">
                                <p>端口数<br> <span>{{item.ports}}</span></p>
                                <p>域名数<br> <span>{{item.domains}}</span></p>
                                <p>带宽<br> <span>{{item.bandwith}}M</span></p>
                            </div>
                            <div class="buybtn">
                                <div class="price">
                                    <p>￥<span>{{item.cost}}</span>/{{item.days == '1' ? '月' : item.days/12 + '年'}} <span class="old">原价:￥{{item.oldPrice}}/{{item.days == '1' ? '月' : item.days/12 + '年'}}</span></p>
                                    <p class='press'>已抢购{{item.percent}}%</p>
                                </div>
                                <button :class="{over:item.percent == 100}" :disabled="item.percent == 100" @click="m_Ip(item)">立即抢购</button>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <p class="warn">温馨提示，秒杀产品不支持7天无理由退款；购买区域不同，价格会有差异，请确认之后再进行购买。</p>
        </div>

        <!--高仿云主机首月8折优惠-->
        <div class="eight" ref="active2">
            <div class="title">
                <img src="../../../assets/img/active/ddos-m/fold.png" alt="">
                <p>以下配置皆包含40G SSD系统盘<span @click="favourable = 'favourable'">活动规则></span></p>
            </div>
            <div class="first">
                <ul>
                    <p class="ftitle">
                        高防云服务器
                        <img src="../../../assets/img/active/ddos-m/a2-right.png" alt="">
                    </p>
                    <li v-for="(item,index) in FirstMonth" :key="(index+1)*4">
                         <div class="top">
                             <p>CPU<br><span>{{item.cpu}}核</span></p>
                             <p>内存<br><span>{{item.mem}}G</span></p>
                             <p>带宽<br><span>{{item.bandwith}}M</span></p>
                         </div>
                         <div class="middle" v-show="item.open">
                             <div class="defense">
                                 <p>防御:<span v-for="(subItem,subIndex) in item.pronums" :key="subIndex+2" :class="{spanClick: item.defense == subItem}" @click="MhignHostPrices(item,subItem)">{{subItem}}G</span></p>
                             </div>
                             <Group class="first-group">
                                 <popup-picker title="区域" :data="fMzoiendList" :columns="3" v-model="item.zoneId" show-name @on-change="getSys(item,54)"></popup-picker>
                                 <popup-picker title="系统" :data="item.systemList" :columns="3" v-model="item.systems" show-name></popup-picker>
                             </Group>
                         </div>
                         <div class="btns">
                             <div class="prices">
                                 <p class="now">￥<span>{{item.price}}</span>/首月</p>
                                 <p class="old">原价: ￥<span>{{item.oldPrice}}</span>/月 <span class="bot">首月优惠</span></p>
                             </div>
                             <button v-show="item.open" @click="HignHostBuy(item,54)">立即抢购</button>
                             <button v-show="!item.open" @click="item.open = !item.open">展开购买<img src="../../../assets/img/active/ddos-m/down.png" alt=""></button>
                         </div>
                    </li>
                </ul>
            </div>
        </div>

        <!--超低折扣送域名-->
        <div class="giving" ref="active3">
            <div class="title">
                <img src="../../../assets/img/active/ddos-m/give.png" alt="">
                <p>高防云服务器买3/6/12个月赠送188元域名无门槛抵用券<br> <span @click="present = 'present'">活动规则></span></p>
            </div>
            <div class="cloudHost">
                <ul>
                    <li v-for="(item,index) in hignHosts" :key="(index+3)*2">
                        <div class="top">
                            <p>高防云服务器{{item.cpu}}核{{item.mem}}G</p>
                            <img src="../../../assets/img/active/ddos-m/a3-right.png" alt="">
                        </div>
                        <div class="middle">
                            <p>带宽<br><span>{{item.bandwith}}M</span></p>
                            <p>系统盘<br><span>{{item.disksize}}G SSD</span></p>
                        </div>
                        <div class="groups" v-show="item.open">
                           <Group class="giving-Group">
                               <popup-picker title="区域" :data="hHzoinedList" :columns="3" v-model="item.zoneId" show-name @on-change="getSys(item,55)"></popup-picker>
                               <popup-picker title="系统" :data="item.systemList" :columns="3" v-model="item.systems" show-name></popup-picker>
                               <popup-picker title="时长" :data="timeList" :columns="3" v-model="item.times" show-name @on-change="ShignHostPrices(item)"></popup-picker>
                               <cell title="防御" :value="item.defense+'G'"></cell>
                           </Group>
                        </div>
                        <div class="btns">
                           <div class="prices">
                               <p>￥<span>{{item.price}}</span> <span>原价:￥{{item.oldPrice}}</span></p>
                               <p class="nomove">购买即赠送188元域名无门槛抵用券</p>
                           </div>
                            <button v-show="item.open" @click="HignHostBuy(item,55)">立即购买</button>
                            <button v-show="!item.open" @click="item.open = !item.open">展开购买 <img src="../../../assets/img/active/ddos-m/down.png" alt=""></button>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

        <!--页尾-->
        <div class="footer">
            <div class="foot-top">
                <img src="../../../assets/img/active/ddos-m/footer.png" alt="">
                <h1>联系我们</h1>
                <p class="phone"><a href="tel:400-0505-565">400-0505-565</a></p>
                <p class="addressEN">service@unionstech.cn</p>
                <p class="addressZH">北京市海淀区东升大厦AB座611、612</p>
            </div>
            <div class="foot-bottom">
                <ul>
                    <li v-for="(item,index5) in foots" :key="index5">
                        <img :src="item.img">
                        <p>{{item.title}}</p>
                        <p>{{item.name}}</p>
                    </li>
                </ul>
            </div>
            <div class="foot">
                <p><span>Copyright &#169 2014-2017</span><span class="icpIcon">京ICP备15035854号</span></p>
                <p class="company">北京允睿讯通科技有限公司</p>
            </div>
        </div>

        <!--秒杀活动规则弹窗-->
        <div class="userAlert" :class="seckilling">
            <div class="alert1">
                <div class="top">
                    <h1>秒杀活动规则</h1>
                    <img src="../../../assets/img/active/ddos-m/close.png" alt="" @click="seckilling = ''">
                </div>
                <ul class="rules">
                    <li><b>1、</b>活动时间：2019.7.25-2019.9.25，每天6场秒杀， 2点、6点、10点、14点、18点、22点开抢。</li>
                    <li><b>2、</b>活动对象：新老用户皆可参与，其中云服务器、GPU服务器仅限于新用户。</li>
                    <li><b>3、</b>数量限制：活动期间同一用户（同一手机、邮箱、实名认证用户视为同一用户）按照不同的配置进行秒杀，其中云服务器和GPU服务器仅限新用户抢购，每次秒杀每款配置限抢购1台</li>
                    <li><b>4、</b>参与本次活动购买的产品不能进行退款。</li>
                    <li><b>5、</b>此次活动产品不能用于转售，不能用于第三方业务，只能用于自身业务。如若利用资源从事违法违规行为的用户，新睿云有权收回使用资格，并且不予退款。</li>
                    <li><b>6、</b>购买时不可使用任何优惠券和现金券，秒杀活动不支持会员折扣。</li>
                    <li><b>7、</b>活动最终解释权为新睿云所有。</li>
                </ul>
                <div class="foot">
                    <button @click="seckilling = ''">我知道了</button>
                </div>
            </div>
        </div>
        <!--8折优惠动规则弹窗-->
        <div class="userAlert" :class="favourable">
            <div class="alert2">
                <div class="top">
                    <h1>活动规则</h1>
                    <img src="../../../assets/img/active/ddos-m/close.png" alt="" @click="favourable = ''">
                </div>
                <ul class="rules">
                    <li><b>1、</b>活动时间：2019.7.25-2019.9.25。</li>
                    <li><b>2、</b>活动对象：平台已完成实名认证的新老用户。</li>
                    <li><b>3、</b>该活动购买的资源不支持退款，不支持优惠券抵扣，支持会员折扣。</li>
                    <li><b>4、</b>配置选择：2核4G/2核8G/4核8G/4核16G；带宽默认5M，系统盘默认40G，不含数据盘。</li>
                </ul>
                <div class="foot">
                    <button @click="favourable = ''">我知道了</button>
                </div>
            </div>
        </div>
        <!--赠送域名弹窗-->
        <div class="userAlert" :class="present">
            <div class="alert3">
                <div class="top">
                    <h1>送域名活动规则</h1>
                    <img src="../../../assets/img/active/ddos-m/close.png" alt="" @click="present = ''">
                </div>
                <ul class="rules">
                    <li><b>1、</b>活动时间：2019.7.25-2019.9.25。</li>
                    <li><b>2、</b>活动对象：平台已完成实名认证的新老用户。</li>
                    <li><b>3、</b>数量限制：云服务器产品每个用户限购7台（若有更多需求，可向客服申请提高配额）</li>
                    <li><b>4、</b>参与本次活动购买的产品不能进行退款。</li>
                    <li><b>5、</b>此次产品不能用于转售，不能用于第三方业务，只能用于自身业务。如若利用资源从事违法违规行为的用户，新睿云有权收回使用资格，并且不予退款。</li>
                    <li><b>6、</b>购买时不可使用任何其它优惠券和现金券，支持会员折扣，188元域名无门槛抵用券仅用于域名购买，有效期为1年。</li>
                    <li><b>7、</b>活动最终解释权为新睿云所有。</li>
                </ul>
                <div class="foot">
                    <button @click="present = ''">我知道了</button>
                </div>
            </div>
        </div>
        <!--未实名认证-->
        <div class="userAlert" :class="certify">
            <div class="alert4">
                <div class="top">
                    <h1>提示</h1>
                    <img src="../../../assets/img/active/ddos-m/close.png" alt="" @click="certify = ''">
                </div>
                <div class="rules">
                    根据国家规定，使用公共互联网需进行实名认证。
                </div>
                <div class="foot">
                    <button @click="$router.push('certification')">实名认证</button>
                </div>
            </div>
        </div>
        <!-- 购买status 为2信息提示-->
        <div class="userAlert" :class="msg">
            <div class="alert5">
                <div class="top">
                    <h1>提示</h1>
                    <img src="../../../assets/img/active/ddos-m/close.png" alt="" @click="msg = ''">
                </div>
                <div class="rules">
                   {{message}}
                </div>
                <div class="foot">
                    <button @click="msg = ''">知道了</button>
                </div>
            </div>
        </div>
        <!--更多场次预告-->
        <div class="userAlert" :class="showmore">
            <div class="alert6">
                <div class="top">
                    <h1>更多秒杀场次预告</h1>
                    <img src="../../../assets/img/active/ddos-m/close.png" alt="" @click="showmore = ''">
                </div>
                <ul class="rules">
                    <li v-for="(item,index) in  showDatas" :key="item.date">
                        <div class="ing">
                            <p>{{item.date}}</p>
                            <span :class="{ising:item.flag == 1}">{{item.flag == 1 ? '进行中' : '未开始'}}</span>
                        </div>
                        <div class="flag">
                            <p v-for="(subItem,subIndex) in item.freevmconfigs" :key="subIndex">
                                {{subItem.type == 'high_host'? '高防云服务器' : subItem.type == 'host' ? '云服务器' : subItem.type == 'G5500' ? 'GPU云服务器P100' : subItem.value}}
                                <span v-show="subItem.type != 'high_ip'">{{subItem.value}}</span>
                            </p>
                        </div>
                    </li>
                </ul>
                <div class="foot">
                    <button @click="showmore = ''">我知道了</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {PopupPicker,Group, Cell } from 'vux'
    import axios from 'axios'
    import $store from '@/vuex'
    export default{
      components: {
        PopupPicker,
        Group,
        Cell
      },
      beforeRouteEnter (to,from,next) {
        axios.get('activity/activityTime.do',{
          params: {
            activityId: 53
          }
        }).then(res => {
          next(vm => {
            if (res.status == 200 && res.data.status != 1){
              vm.$router.push('/ruicloud/down')
            }
          })
        })
      },
      data () {
        return {
          overH: 0,
          // 倒计时
          hours: 0,
          minO: 0,
          minT: 0,
          secO: 0,
          secT: 0,
          // 限时秒杀
          freevmconfigs: [],
          zoiendListHign: [],
          zoiendListH: [],
          zoiendListG: [],
          // 首月优惠
          FirstMonth: [],
          fMzoiendList: [],
          // 秒杀活动规则
          seckilling: '',
          // 预告
          showmore: '',
          showDatas: [],
          // 8折优惠活动规则
          favourable: '',
          // 赠送域名
          present: '',
          hignHosts: [],
          hHzoinedList: [],
          timeList: [
            {name:'3个月（8折）',value: '3'},
            {name:'6个月（7.5折）',value: '6'},
            {name:'1年（7折）',value: '12'},
          ],
          tabList: [
            {title: '专属秒杀', desc: '高防云产品超低折扣',value: '活动一'},
            {title: '高防云服务里', desc: '首月享8折优惠',value: '活动二'},
            {title: '超低折扣', desc: '买时长送域名',value: '活动三'},
            {title: '更多优惠', desc: '请前往PC端新睿云官网',value: ''},
          ],
          foots: [
            {img: require('../../../assets/img/active/ddos-m/ft-1.png'), title: '7x24', name: '多渠道服务与支持'},
            {img: require('../../../assets/img/active/ddos-m/ft-2.png'), title: '意见', name: '反馈与投诉建议'},
            {img: require('../../../assets/img/active/ddos-m/ft-3.png'), title: '1v1', name: '一对一专项服务'},
            {img: require('../../../assets/img/active/ddos-m/ft-4.png'), title: '退款', name: '7天无理由退款'},
          ],
          certify: '', // 未认证
          msg: '', // status 为2
          message: ''
        }
      },
      methods: {
        //倒计时时间
        timeRange() {
          axios.get("network/getTime.do", {params:{}}).then(response => {
            this.times = response.data.result
            let countdown = new Date(response.data.result).getHours()
            if (countdown>=0 && countdown<2) {
              this.overH = 1
            } else if (countdown>=2 && countdown<6) {
              this.overH = 5
            } else if (countdown>=6 && countdown<10) {
              this.overH = 9
            } else if (countdown>=10 && countdown<14) {
              this.overH = 13
            } else if (countdown>=14 && countdown<18) {
              this.overH = 17
            } else if (countdown>=18 && countdown<22) {
              this.overH = 21
            } else {
              this.overH = 25
            }
            this.countDownTimes()
          })
        },
        countDownTimes(){
          var timer= null
          var that = this
          var h = 0
          var m = 0
          var s = 0
          timer = setInterval(function(){
            that.times+=1000;
            h = Math.floor(that.overH  - new Date(that.times).getHours());
            m = Math.floor(59 - new Date(that.times).getMinutes());
            s = Math.floor(59 - new Date(that.times).getSeconds());
            that.hours = h
            if (m>=10) {
              // 取整
              that.minO = parseInt(m/10)
              // 取余数
              that.minT = m%10
            } else {
              that.minO = 0
              that.minT = m
            }
            if (s>=10) {
              that.secO = parseInt(s/10)
              that.secT = s%10
            } else {
              that.secO = 0
              that.secT = s
            }
            if(h === 0 && m === 0 && s === 0){
              clearInterval(timer);
              window.location.reload()
            }
          },1000);
        },

        // 活动导航锚点
        point (index) {
          if (index == 0) {
            window.scrollTo(0,this.$refs.active1.offsetTop)
          } else if (index == 1) {
            window.scrollTo(0,this.$refs.active2.offsetTop)
          } else if (index == 2) {
            window.scrollTo(0,this.$refs.active3.offsetTop)
          }
        },

        // 更多場次預告
        forCast () {
          axios.get('activity/getActivityTrailer.do', {
            params: {
              activityNum: '53'
            }
          }).then(res => {
            if (res.status === 200 && res.data.status ===1 ) {
              this.showDatas  =res.data.result
            }
          })
        },

        // 获取系统镜像
        getSys (item,acid) {
          axios.get('information/listTemplates.do', {
            params: {
              zoneId: item.zoneId[0],
              user:  '0'
            }
          }).then(res => {
            if (res.status == 200 && res.data.status ==1) {
              item.systemList = []
              for (let type in res.data.result) {
                if (res.data.result[type].length > 0) {
                  item.systemList.push({name: type, value: type, parent: 0})
                  res.data.result[type].forEach(e => {
                    item.systemList.push({name: e.templatename, value: e.systemtemplateid, parent: type})
                  })
                }
              }
              if (item.systemList.length >0 ) {
                let tempSystem1 = item.systemList[1].name
                let tempSystem2 = item.systemList[1].value
                item.systems[0] = tempSystem1
                item.systems[1] = tempSystem2
              }
            }
          })
          if (acid == 53) {
            this.MhOrGPrices(item)
          } else if (acid == 54) {
            this.MhignHostPrices(item,item.defense)
          } else if (acid == 55) {
            this.ShignHostPrices(item)
          }
        },

        // 秒杀 云主机 获取原价
        MhOrGPrices (item) {
          axios.get('activity/getOriginalPrice.do', {
            params: {
              zoneId: item.zoneId[0],
              vmConfigId: item.id,
              month: item.days
            }
          }).then(res => {
            if (res.status == 200 && res.data.status == 1) {
              item.cost = res.data.result.cost
              item.oldPrice = res.data.result.originalPrice
            }
          })
        },

        // 秒杀 高仿IP 获取原价
        MIpPrices (item) {
          axios.get('activity/getOriginalPriceDDosIP.do', {
            params: {
              zoneId: '3e483b69-ea57-40c6-9fba-d470d665b238',
              vmConfigId: item.id,
              month: item.days,
              activityNum: '53'
            }
          }).then(res => {
            if (res.status == 200 && res.data.status == 1) {
              item.cost = res.data.result.cost
              item.oldPrice = res.data.result.originalPrice
            }
          })
        },

        // 54 活动 主机获取原价
        MhignHostPrices (item,subItem) {
          item.defense = subItem
          axios.get('activity/getOriginalPrice.do', {
            params: {
              zoneId: item.zoneId[0],
              vmConfigId: item.defense == '60' ? item.vmId[0] : item.defense == '100' ? item.vmId[1] : item.vmId[2],
              month: '1'
            }
          }).then(res => {
            if (res.status == 200 && res.data.status == 1) {
              item.price = res.data.result.cost
              item.oldPrice = res.data.result.originalPrice
            }
          })
        },

        // 55 活动 赠送域名时长变化,价格变化
        ShignHostPrices (item) {
          if (item.times[0] == '6') {
            item.defense = '100'
          } else {
            item.defense = '60'
          }
          axios.get('activity/getOriginalPrice.do', {
            params: {
              zoneId: item.zoneId[0],
              vmConfigId: item.times[0] == '3' ? item.vmId[0] : item.times[0] == '6' ? item.vmId[1] : item.vmId[2],
              month: item.times[0]
            }
          }).then(res => {
            if (res.status == 200 && res.data.status == 1) {
              item.price = res.data.result.cost
              item.oldPrice = res.data.result.originalPrice
            }
          })
        },

        // 高仿主机购买
        HignHostBuy (item,num) {
          if (this.$store.state.userInfo == null) {
            // 未登录
            return this.$router.push('login')
          } else if(this.$store.state.isCheck) {
            // 未认证
            this.certify = 'certify'
            return false
          } else {
            var params = {
                osType: item.systems[1],
                defzoneid:item.zoneId[0]
            }
            if (num == 54) {
              params.vmConfigId = item.defense == '60' ? item.vmId[0] : item.defense == '100' ? item.vmId[1] : item.vmId[2]
            } else {
              params.vmConfigId = item.times[0] == '3' ? item.vmId[0] : item.times[0] == '6' ? item.vmId[1] : item.vmId[2]
            }
            axios.get('activity/getDiskcountHighPreventionMv.do', {
              params: params
            }).then(res => {
              if (res.status == 200 && res.data.status == 1) {
                sessionStorage.setItem('countOrder', item.price.toString())
                sessionStorage.setItem('hignHost', 'hignHost')
                this.$router.push('orderconfirm')
              } else {
                this.message  = res.data.message
                this.msg = 'msg'
              }
            })
          }
        },

        // 秒杀购买-高仿主机
        m_Hign (item) {
          if (this.$store.state.userInfo == null) {
            // 未登录
            return this.$router.push('login')
          } else if(this.$store.state.isCheck) {
            // 未认证
            this.certify = 'certify'
            return false
          } else {
            axios.get('activity/getDiskcountHighPreventionMv.do', {
              params: {
                vmConfigId: item.id,
                osType: item.systems[1],
                defzoneid: item.zoneId[0]
              }
            }).then(res => {
              if (res.status == 200 && res.data.status == 1) {
                sessionStorage.setItem('countOrder', item.cost.toString())
                sessionStorage.setItem('hignHost', 'hignHost')
                this.$router.push('orderconfirm')
              } else {
                this.message  = res.data.message
                this.msg = 'msg'
              }
            })
          }
        },

        // 秒杀购买-云主机
        m_Host (item) {
          if (this.$store.state.userInfo == null) {
            // 未登录
            return this.$router.push('login')
          } else if(this.$store.state.isCheck) {
            // 未认证
            this.certify = 'certify'
            return false
          } else {
            axios.get('information/getDiskcountMv.do', {
              params: {
                vmConfigId: item.id,
                osType: item.systems[1],
                defzoneid: item.zoneId[0]
              }
            }).then(res => {
              if (res.status == 200 && res.data.status == 1) {
                sessionStorage.setItem('countOrder', item.cost.toString())
                this.$router.push('orderconfirm')
              } else {
                this.message  = res.data.message
                this.msg = 'msg'
              }
            })
          }
        },

        // 秒杀购买-Gpu
        m_Gpu (item) {
          if (this.$store.state.userInfo == null) {
            // 未登录
            return this.$router.push('login')
          } else if(this.$store.state.isCheck) {
            // 未认证
            this.certify = 'certify'
            return false
          } else {
            axios.get('activity/getDiskcountGPU.do', {
              params: {
                vmConfigId: item.id,
                osType: item.systems[1],
                defzoneid: item.zoneId[0]
              }
            }).then(res => {
              if (res.status == 200 && res.data.status == 1) {
                sessionStorage.setItem('countOrder', item.cost.toString())
                sessionStorage.setItem('hignHost', 'hignHost')
                this.$router.push('orderconfirm')
              } else {
                this.message  = res.data.message
                this.msg = 'msg'
              }
            })
          }
        },

        // 秒杀购买-高仿Ip
        m_Ip (item) {
          if (this.$store.state.userInfo == null) {
            // 未登录
            return this.$router.push('login')
          } else if(this.$store.state.isCheck) {
            // 未认证
            this.certify = 'certify'
            return false
          } else {
            axios.get('activity/getDiskcountHighIP.do', {
              params: {
                vmConfigId: item.id
              }
            }).then(res => {
              if (res.status == 200 && res.data.status == 1) {
                sessionStorage.setItem('countOrder', item.cost.toString())
                sessionStorage.setItem('hignHost', 'hignHost')
                this.$router.push('orderconfirm')
              } else {
                this.message  = res.data.message
                this.msg = 'msg'
              }
            })
          }
        }
      },
      created () {
        this.timeRange()
        this.forCast()
        var active1 = axios.get('activity/getActInfoById.do', {params: {activityNum: 53}})
        var active2 = axios.get('activity/getTemActInfoById.do', {params: {activityNum: 54}})
        var active3 = axios.get('activity/getTemActInfoById.do', {params: {activityNum: 55}})
        var subse = axios.get('activity/getSubsection.do', {params: {activityNum: 53}})
        Promise.all([active1,active2,active3,subse]).then(values => {
          // 限时秒杀 区域 配置
          if (values[0].status == 200 && values[0].data.status == 1) {
            // 高仿主机区域
            this.zoiendListHign = values[0].data.result.optionalAreaHighPrevention
            // 主机区域
            this.zoiendListH = values[0].data.result.optionalArea
            // GPU 区域
            this.zoiendListG = values[0].data.result.optionalAreaGpu
            // 秒杀数据
            this.freevmconfigs = values[0].data.result.freevmconfigs
            this.freevmconfigs.forEach(e => {
              if (e.servicetype == 'high_host') {
                e.zoneId[0] = this.zoiendListHign[0].value
              }
              if (e.servicetype == 'host') {
                e.zoneId[0] = this.zoiendListH[0].value
              }
              if (e.servicetype == 'G5500') {
                e.zoneId[0] = this.zoiendListG[0].value
              }
              if (e.servicetype == 'high_ip') {
                this.MIpPrices(e)
              } else {
                this.MhOrGPrices(e)
                this.getSys(e,0)
              }
            })
          }
          // 首月优惠 区域 配置
          if (values[1].status == 200 && values[1].data.status == 1) {
            this.fMzoiendList = values[1].data.result.optionalAreaHighPrevention
            var datas = values[1].data.result.freevmconfigResultMap
            this.FirstMonth = []
            for(var e in datas) {
              this.FirstMonth.push(datas[e])
            }
            this.FirstMonth.forEach(e => {
              e.vmId = e.id.split(',')
              e.open = false
              e.defense = '60'
              e.pronums = e.pronum.split(',')
              e.zoneId = [this.fMzoiendList[0].value]
              e.systems = []
              e.systemList = []
            })
            this.FirstMonth.forEach(e => {
              this.MhignHostPrices(e,e.defense)
              this.getSys(e,0)
            })
            this.FirstMonth[0].open = true
          }
           // 送域名 区域 配置
          if (values[2].status == 200 && values[2].data.status == 1) {
            this.hHzoinedList = values[2].data.result.optionalAreaHighPrevention
            var datas = values[2].data.result.freevmconfigResultMap
            this.hignHosts = []
            for(var e in datas) {
              this.hignHosts.push(datas[e])
            }
            this.hignHosts.forEach(e => {
              e.vmId = e.id.split(',')
              e.open = false
              e.defense = '60'
              e.zoneId = [this.hHzoinedList[0].value]
              e.systems = []
              e.systemList = []
              e.times = ['3']
            })
            this.hignHosts.forEach(e => {
             this.ShignHostPrices(e)
             this.getSys(e,0)
            })
            this.hignHosts[0].open = true
          }
          // 秒杀 百分比
          if (values[3].status == 200 && values[3].data.status == 1) {
            // 秒杀活动购买数量百分比
            var section = values[3].data.result
            section.forEach(i => {
              this.freevmconfigs.forEach(j => {
                if (j.id == i.freevmconfigId) {
                  j.percent = parseInt(i.receive)/parseInt(i.total)*100
                }
              })
            })
          }
        })
      }
    }
</script>

<style rel="stylesheet/less" lang="less" scoped>
    #higncopy {
        .banner {
            width: 100%;
            background:rgba(42,41,54,1);
            img {
                width: 100%;
            }
        }

        .tabs {
            width: 100%;
            background:rgba(42,41,54,1);
            ul {
                padding: 17px 30px 0 30px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                flex-wrap: wrap;
                li {
                    list-style: none;
                    position: relative;
                    width: 340px;
                    padding: 23px 0 19px 40px;
                    background:rgba(62,60,78,1);
                    border:1px solid rgba(84,82,104,1);
                    margin-bottom: 10px;
                    p {
                        font-size:26px;
                        font-weight:600;
                        color:rgba(255,224,163,1);
                        line-height:34px;
                    }
                    span {
                        background:rgba(219,221,224,1);
                        display: block;
                        position: absolute;
                        top: 0;
                        right: 0;
                        font-size:20px;
                        font-weight:bold;
                        color:rgba(52,51,69,1);
                        line-height:28px;
                        padding: 5px;
                    }
                }
            }
        }

        .miaosha {
            width: 100%;
            background:rgba(42,41,54,1);
            .title {
                padding-top: 60px;
                img {
                    width: 226px;
                    display: block;
                    margin: 0 auto;
                }
                p {
                    padding: 16px 44px 0 44px;
                    text-align: center;
                    font-size:26px;
                    font-weight:400;
                    color:rgba(255,255,255,1);
                    line-height:34px;
                    span {
                        color: #FDC58F;
                        text-decoration: underline;
                    }
                }
            }
            .down {
                display: flex;
                justify-content: space-between;
                flex-wrap: wrap;
                align-items: baseline;
                padding: 30px 30px 22px 30px;
              p{
                  font-size:24px;
                  color:rgba(255,255,255,1);
                  line-height:31px;
                  span {
                      margin-left: 10px;
                      display: inline-block;
                      padding: 2px 8px;
                      font-size:36px;
                      font-weight:bold;
                      color:rgba(8,13,76,1);
                      line-height:42px;
                      background:linear-gradient(180deg,rgba(254,231,190,1) 0%,rgba(252,202,138,1) 100%);
                  }
                &:nth-of-type(2) {
                    margin: 10px 0;
                }
              }
              .more {
                  color:rgba(255,208,140,1);
              }
            }
            .onlytime {
                margin-top: 10px;
                ul {
                    // width: 690px;
                    width: 100%;
                    margin: 0 auto;
                    li {
                        background:rgba(77,75,97,1);
                        list-style: none;
                        margin-bottom: 30px;
                        .hign_host {
                            .top {
                                background:rgba(84,81,106,1);
                                position: relative;
                                padding: 22px 0 23px 30px;
                                border-bottom: 1.2px dashed #625F76;
                                p{
                                    font-size:32px;
                                    font-weight:500;
                                    color:rgba(255,255,255,1);
                                    line-height:45px;
                                }
                                span {
                                    display: inline-block;
                                    font-size:22px;
                                    font-weight:bold;
                                    color:rgba(255,255,255,1);
                                    line-height:30px;
                                    position: absolute;
                                    top: 29px;
                                    right: 0;
                                    background:rgba(255,98,75,1);
                                    padding: 8px;
                                }
                                .host {
                                    height: 30px;
                                    overflow: hidden;
                                    display: block;
                                    font-size:22px;
                                    font-weight:bold;
                                    color:rgba(255,255,255,1);
                                    line-height:30px;
                                    position: absolute;
                                    top: 29px;
                                    right: 0;
                                    background:rgba(255,98,75,1);
                                    padding: 0 0 0 8px;
                                    a {
                                        font-size:22px;
                                        background:rgba(255,224,163,1);
                                        color:rgba(51,51,51,1);
                                        padding: 4px;
                                        margin-left: 8px;
                                    }
                                }
                                .gpu {
                                    padding: 0;
                                    a {
                                        margin-left: 0;
                                    }
                                }
                                .ip {
                                    font-size:28px;
                                    font-weight:500;
                                    color:rgba(255,255,255,1);
                                    line-height:40px;
                                    padding-top: 10px;
                                }
                            }
                            .middle {
                                padding: 20px 0;
                                border-bottom: 1px solid #625F76;
                                display: flex;
                                justify-content: space-around;
                                align-items: center;
                                p {
                                    font-size:28px;
                                    font-weight:400;
                                    color:rgba(255,240,222,1);
                                    line-height:40px;
                                    span {
                                        font-weight: bold;
                                    }
                                }
                            }
                            .buybtn {
                                display: flex;
                                justify-content: space-between;
                                align-items: center;
                                padding: 40px 30px 35px 20px;
                                .price {
                                    p {
                                        font-size:24px;
                                        font-weight:400;
                                        color:rgba(255,98,75,1);
                                        line-height:32px;
                                        span {
                                            font-weight: bold;
                                            font-size: 36px;
                                        }
                                        .old {
                                            font-size:24px;
                                            font-weight:400;
                                            line-height:32px;
                                            color:#FFFFFF;
                                            text-decoration: line-through;
                                            padding-left: 5px;
                                        }
                                    }
                                    .press {
                                        padding-top: 15px;
                                        font-size:24px;
                                        font-weight:400;
                                        color:rgba(219,207,196,1);
                                        line-height:32px;
                                    }
                                }
                                button {
                                    background:linear-gradient(90deg,rgba(249,239,184,1) 0%,rgba(227,183,111,1) 100%);
                                    width: 230px;
                                    font-size:32px;
                                    color:rgba(51,51,51,1);
                                    line-height:45px;
                                    font-weight: bold;
                                    outline: none;
                                    border: none;
                                    padding: 18px 0 17px 0;
                                    text-align: center;
                                }
                                .over {
                                    background:linear-gradient(90deg,rgba(206,206,206,1) 0%,rgba(168,168,168,1) 100%);
                                }
                            }
                        }
                    }
                }
            }
            .warn {
                padding: 0 30px;
                font-size:24px;
                font-weight:400;
                color:rgba(219,207,196,1);
                line-height:34px;
            }
        }

        .eight {
            width: 100%;
            background:rgba(42,41,54,1);
            padding-bottom: 10px;
            .title {
                padding-top: 60px;
                img {
                    width: 500px;
                    display: block;
                    margin: 0 auto;
                }
                p {
                   padding-top: 20px;
                    text-align: center;
                    font-size:24px;
                    font-weight:400;
                    color:rgba(255,255,255,1);
                    line-height:33px;
                    span {
                        padding-left: 20px;
                        color: #EED292;
                    }
                }
            }
            .first {
                // width: 690px;
                width: 100%;
                margin: 30px auto;
                ul {
                    .ftitle {
                        width: 100%;
                        background:rgba(62,60,78,1);
                        position: relative;
                        padding: 22px 0 23px 30px;
                        font-size:32px;
                        font-weight:500;
                        color:rgba(255,208,140,1);
                        line-height:45px;
                        img {
                            display: block;
                            position: absolute;
                            right: 0;
                            top: 0;
                            width: 150px;
                            height: 89px;
                        }
                    }
                    li{
                        list-style: none;
                        margin-bottom: 20px;
                        .top {
                            padding: 20px 0;
                            background:rgba(77,75,97,1);
                            display: flex;
                            align-items: center;
                            justify-content: space-around;
                            p{
                                font-size:28px;
                                font-weight:400;
                                color:rgba(255,240,222,1);
                                line-height:40px;
                                span {
                                    font-weight: bold;
                                }
                            }
                        }
                        .middle {
                            background: #FFFFFF;
                            .defense {
                                padding: 20px 20px 0 20px;
                                font-size:28px;
                                font-weight:400;
                                color:rgba(102,102,102,1);
                                line-height:28px;
                                p {
                                    padding-bottom: 20px;
                                    border-bottom: 1px solid #DBD9E9;
                                    span {
                                        width: 170px;
                                        display: inline-block;
                                        font-size:28px;
                                        font-weight:500;
                                        color:rgba(85,85,85,1);
                                        line-height:40px;
                                        padding: 10px 0;
                                        border:1px solid rgba(238,210,146,1);
                                        margin-left: 20px;
                                        text-align: center;
                                    }
                                    .spanClick {
                                        background:linear-gradient(90deg,rgba(249,239,184,1) 0%,rgba(227,183,111,1) 100%);
                                    }
                                }
                            }
                        }
                        .btns {
                            background:rgba(255,255,255,1);
                            padding: 40px 30px 40px 20px;
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            .prices {
                                .now {
                                    font-size:24px;
                                    font-weight:400;
                                    color:rgba(255,98,75,1);
                                    line-height:34px;
                                    span {
                                        font-size: 36px;
                                        font-weight: bold;
                                    }
                                }
                                .old {
                                    padding-top: 10px;
                                    font-size:24px;
                                    font-weight:400;
                                    color:#666666;
                                    line-height:34px;
                                    text-decoration: line-through;
                                    .bot {
                                        padding: 3px 8px;
                                        margin-left: 20px;
                                        display: inline-block;
                                        text-decoration: none;
                                        font-size:22px;
                                        font-weight:400;
                                        color:rgba(255,208,140,1);
                                        line-height:22px;
                                        background:rgba(77,75,97,1);
                                    }
                                }
                            }
                            button {
                                display: block;
                                width: 230px;
                                background:linear-gradient(128deg,rgba(249,239,184,1) 0%,rgba(227,183,111,1) 100%);
                                outline: none;
                                border: none;
                                font-size:32px;
                                font-weight:bold;
                                color:rgba(51,51,51,1);
                                line-height:45px;
                                padding: 18px 0 17px 0;
                                img {
                                    width: 26px;
                                    vertical-align: middle;
                                    margin-left: 9px;
                                }
                            }
                        }
                    }
                }
            }
        }

        .giving {
            width: 100%;
            background:rgba(226,228,240,1);
            padding-bottom: 60px;
            .title {
                padding-top: 30px;
                img {
                    width: 454px;
                    display: block;
                    margin: 0 auto;
                }
                p {
                    padding: 20px .7100px 0 .7100px;
                    text-align: center;
                    font-size:24px;
                    font-weight:400;
                    color:rgba(102,102,102,1);
                    line-height:33px;
                    span {
                        color: #FF624B;
                    }
                }
            }
            .cloudHost {
            //    width: 690px;
               width: 100%;
                margin: 0 auto;
                ul {
                    li {
                        list-style: none;
                        margin-top: 30px;
                        background:rgba(255,255,255,1);
                        box-shadow:0px 4px 20px -5px rgba(0,0,0,0.3);
                        .top {
                            width: 100%;
                            background:rgba(62,60,78,1);
                            position: relative;
                            padding: 22px 0 23px 30px;
                            p {
                                font-size:32px;
                                font-weight:500;
                                color:rgba(255,208,140,1);
                                line-height:45px;
                            }
                            img {
                                display: block;
                                position: absolute;
                                right: 0;
                                top: 0;
                                width: 261px;
                                height: 89px;
                            }
                        }
                        .middle {
                            padding: 20px 0;
                            border-bottom: 1px solid #DBD9E9;
                            display: flex;
                            justify-content: space-around;
                            align-items: center;
                            p {
                                font-size:28px;
                                font-weight:400;
                                color:rgba(62,60,78,1);
                                line-height:40px;
                                span {
                                    font-weight: bold;
                                }
                            }
                        }
                        .groups {
                            margin: 0 20px;
                        }
                        .btns {
                            padding: 44px 30px 44px 20px;
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            .prices {
                                p {
                                    font-size:24px;
                                    font-weight:400;
                                    color:rgba(255,98,75,1);
                                    line-height:34px;
                                    span {
                                        font-size: 36px;
                                        font-weight: bold;
                                        &:last-of-type {
                                            font-size:24px;
                                            color: #666666;
                                            text-decoration: line-through;
                                        }
                                    }
                                    &:last-of-type {
                                        padding-top: 14px;
                                    }
                                }

                            }
                            button {
                                display: block;
                                width: 230px;
                                background:linear-gradient(128deg,rgba(249,239,184,1) 0%,rgba(227,183,111,1) 100%);
                                outline: none;
                                border: none;
                                font-size:32px;
                                font-weight:bold;
                                color:rgba(51,51,51,1);
                                line-height:45px;
                                padding: 18px 0 17px 0;
                                img {
                                    width: 26px;
                                    vertical-align: middle;
                                    margin-left: 9px;
                                }
                            }
                        }
                    }
                }
            }
        }

        .footer {
        background: rgba(43, 43, 47, 1);
        text-align: center;
    .foot-top {
        padding: 100px 0 99px 0;
    img {
        width: 230px;
        height: 230px;
    }
    h1 {
        font-size: 32px;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 45px;
        padding-bottom: 40px;
    }
    .phone {
        font-size: 36px;
        font-weight: 500;
        color: rgba(55, 125, 255, 1);
        line-height: 50px;
    a {
        text-decoration: none;
        font-size: 36px;
        font-weight: 500;
        color: rgba(55, 125, 255, 1);
        line-height: 50px;
    }
    }
    .addressEN {
        font-size: 26px;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        line-height: 37px;
        padding: 9px 0 8px 0;
    }
    .addressZH {
        font-size: 26px;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 37px;
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
        padding: 58px 0;
        width: 50%;
        border-bottom: 1px solid #999;
    img {
        width: 60px;
        height: 60px;
    }
    p {
        font-size: 26px;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 37px;
    /*padding-top: 30px;*/
    &:last-of-type {
         color: rgba(255, 255, 255, 0.7);
         padding: 0;
     }
    }
    &:first-of-type {
         border-right: 1px solid #999;
     }
    &:last-of-type {
         border-bottom: none;
     }
    &:nth-last-child(2) {
         border-bottom: none;
         border-right: 1px solid #999;
     }
    }
    }
    }
    .foot {
        background: rgba(20, 20, 23, 1);
        text-align: center;
        padding: 18px 0 22px 0;
    p {
        font-size: 20px;
        font-weight: 400;
        color: rgba(255, 255, 255, 0.5);
        line-height: 28px;
        padding-bottom: 4px;
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
         background: url('../../../assets/img/active/ddos-m/record.png') no-repeat center top;
         background-size: cover;
     }
    }
    }
    .company {
        padding-bottom: 0;
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
            .alert1 {
                position: absolute;
                left: 50%;
                margin-left: -300px;
                top: 50%;
                margin-top: -372px;
                height: 850px;
                width: 600px;
                transform: scale(1.2);
                transition-property: transform;
                transition-duration: 0.3s;
                background: #FFFFFF;
                border-radius:10px;
                .top {
                    background:linear-gradient(90deg,rgba(12,12,27,1) 0%,rgba(34,36,61,1) 55%,rgba(12,12,27,1) 100%);
                    border-radius:10px 10px 0 0;
                    position: relative;
                    h1 {
                        padding: 25px 0;
                        text-align: center;
                        font-size:36px;
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
                    height:640px;
                    padding: 25px 30px 50px 30px;
                    border-bottom: 1px solid rgba(216,216,216,1);
                    overflow-y: auto;
                    li {
                        list-style: none;
                        font-size:28px;
                        font-weight:500;
                        color:rgba(51,51,51,1);
                        line-height:36px;
                    }
                }
                .foot {
                    button {
                        width:220px;
                        background:linear-gradient(128deg,rgba(249,239,184,1) 0%,rgba(227,183,111,1) 100%);
                        border-radius:6px;
                        display: block;
                        outline: none;
                        border: none;
                        font-size:32px;
                        font-weight:500;
                        color:rgba(34,34,34,1);
                        line-height:45px;
                        padding: 18px 0;
                        margin: 10px auto;
                    }
                }
            }
            &.seckilling {
                opacity: 1;
                visibility: visible;
                transition: opacity .3s 0s, visibility 0s 0s;
                .alert1 {
                    transform: scale(1);
                }
            }
            .alert2 {
                position: absolute;
                left: 50%;
                margin-left: -300px;
                top: 50%;
                margin-top: -372px;
                height: auto;
                width: 600px;
                transform: scale(1.2);
                transition-property: transform;
                transition-duration: 0.3s;
                background: #FFFFFF;
                border-radius:10px;
                .top {
                    background:linear-gradient(90deg,rgba(12,12,27,1) 0%,rgba(34,36,61,1) 55%,rgba(12,12,27,1) 100%);
                    border-radius:10px 10px 0 0;
                    position: relative;
                    h1 {
                        padding: 25px 0;
                        text-align: center;
                        font-size:36px;
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
                    height:auto;
                    padding: 25px 30px 50px 30px;
                    border-bottom: 1px solid rgba(216,216,216,1);
                    li {
                        list-style: none;
                        font-size:28px;
                        font-weight:500;
                        color:rgba(51,51,51,1);
                        line-height:36px;
                    }
                }
                .foot {
                    button {
                        width:220px;
                        background:linear-gradient(128deg,rgba(249,239,184,1) 0%,rgba(227,183,111,1) 100%);
                        border-radius:6px;
                        display: block;
                        outline: none;
                        border: none;
                        font-size:32px;
                        font-weight:500;
                        color:rgba(34,34,34,1);
                        line-height:45px;
                        padding: 18px 0;
                        margin: 10px auto;
                    }
                }
            }
            &.favourable {
                opacity: 1;
                visibility: visible;
                transition: opacity .3s 0s, visibility 0s 0s;
                .alert2 {
                    transform: scale(1);
                }
            }
            .alert3 {
                position: absolute;
                left: 50%;
                margin-left: -300px;
                top: 50%;
                margin-top: -372px;
                height: auto;
                width: 600px;
                transform: scale(1.2);
                transition-property: transform;
                transition-duration: 0.3s;
                background: #FFFFFF;
                border-radius:10px;
                .top {
                    background:linear-gradient(90deg,rgba(12,12,27,1) 0%,rgba(34,36,61,1) 55%,rgba(12,12,27,1) 100%);
                    border-radius:10px 10px 0 0;
                    position: relative;
                    h1 {
                        padding: 25px 0;
                        text-align: center;
                        font-size:36px;
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
                    height:auto;
                    padding: 25px 30px 50px 30px;
                    border-bottom: 1px solid rgba(216,216,216,1);
                    li {
                        list-style: none;
                        font-size:28px;
                        font-weight:500;
                        color:rgba(51,51,51,1);
                        line-height:36px;
                    }
                }
                .foot {
                    button {
                        width:220px;
                        background:linear-gradient(128deg,rgba(249,239,184,1) 0%,rgba(227,183,111,1) 100%);
                        border-radius:6px;
                        display: block;
                        outline: none;
                        border: none;
                        font-size:32px;
                        font-weight:500;
                        color:rgba(34,34,34,1);
                        line-height:45px;
                        padding: 18px 0;
                        margin: 10px auto;
                    }
                }
            }
            &.present {
                opacity: 1;
                visibility: visible;
                transition: opacity .3s 0s, visibility 0s 0s;
                .alert3 {
                    transform: scale(1);
                }
            }
            .alert4{
                position: absolute;
                left: 50%;
                margin-left: -300px;
                top: 50%;
                margin-top: -372px;
                height: auto;
                width: 600px;
                transform: scale(1.2);
                transition-property: transform;
                transition-duration: 0.3s;
                background: #FFFFFF;
                border-radius:10px;
                .top {
                    background:linear-gradient(90deg,rgba(12,12,27,1) 0%,rgba(34,36,61,1) 55%,rgba(12,12,27,1) 100%);
                    border-radius:10px 10px 0 0;
                    position: relative;
                    h1 {
                        padding: 25px 0;
                        text-align: center;
                        font-size:36px;
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
                    height:auto;
                    padding: 25px 30px 50px 30px;
                    border-bottom: 1px solid rgba(216,216,216,1);
                    font-size:28px;
                    font-weight:400;
                    color:rgba(51,51,51,1);
                    line-height:36px;
                    text-indent:40px;
                }
                .foot {
                    button {
                        width:220px;
                        background:linear-gradient(128deg,rgba(249,239,184,1) 0%,rgba(227,183,111,1) 100%);
                        border-radius:6px;
                        display: block;
                        outline: none;
                        border: none;
                        font-size:32px;
                        font-weight:500;
                        color:rgba(34,34,34,1);
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
                .alert4 {
                    transform: scale(1);
                }
            }
            .alert5{
                position: absolute;
                left: 50%;
                margin-left: -300px;
                top: 50%;
                margin-top: -372px;
                height: auto;
                width: 600px;
                transform: scale(1.2);
                transition-property: transform;
                transition-duration: 0.3s;
                background: #FFFFFF;
                border-radius:10px;
                .top {
                    background:linear-gradient(90deg,rgba(12,12,27,1) 0%,rgba(34,36,61,1) 55%,rgba(12,12,27,1) 100%);
                    border-radius:10px 10px 0 0;
                    position: relative;
                    h1 {
                        padding: 25px 0;
                        text-align: center;
                        font-size:36px;
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
                    height:auto;
                    padding: 25px 30px 50px 30px;
                    border-bottom: 1px solid rgba(216,216,216,1);
                    font-size:28px;
                    font-weight:400;
                    color:rgba(51,51,51,1);
                    line-height:36px;
                    text-indent:40px;
                }
                .foot {
                    button {
                        width:220px;
                        background:linear-gradient(128deg,rgba(249,239,184,1) 0%,rgba(227,183,111,1) 100%);
                        border-radius:6px;
                        display: block;
                        outline: none;
                        border: none;
                        font-size:32px;
                        font-weight:500;
                        color:rgba(34,34,34,1);
                        line-height:45px;
                        padding: 18px 0;
                        margin: 10px auto;
                    }
                }
            }
            &.msg {
                opacity: 1;
                visibility: visible;
                transition: opacity .3s 0s, visibility 0s 0s;
                .alert5 {
                    transform: scale(1);
                }
            }
            .alert6{
                position: absolute;
                left: 50%;
                margin-left: -300px;
                top: 50%;
                margin-top: -372px;
                height: 880px;
                width: 600px;
                transform: scale(1.2);
                transition-property: transform;
                transition-duration: 0.3s;
                background: #FFFFFF;
                border-radius:10px;
                .top {
                    background:linear-gradient(90deg,rgba(12,12,27,1) 0%,rgba(34,36,61,1) 55%,rgba(12,12,27,1) 100%);
                    border-radius:10px 10px 0 0;
                    position: relative;
                    h1 {
                        padding: 25px 0;
                        text-align: center;
                        font-size:36px;
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
                    height:670px;
                    overflow-y: auto;
                    padding: 20px 20px 40px 20px;
                    border-bottom: 1px solid rgba(216,216,216,1);
                    li {
                        list-style: none;
                        border:1px solid rgba(219,207,196,1);
                        margin-bottom: 10px;
                        .ing {
                            background:rgba(241,237,234,1);
                            border-bottom:1px solid rgba(219,207,196,1);
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            padding: 12px 20px;
                            font-size:28px;
                            font-weight: bold;
                            color:rgba(102,102,102,1);
                            line-height:40px;
                            .ising {
                                color:rgba(255,136,28,1);
                            }
                        }
                        .flag {
                            line-height: 0;
                            padding: 10px 20px;
                            p {
                                display: inline-block;
                                font-size:28px;
                                font-weight:400;
                                color:rgba(102,102,102,1);
                                line-height:40px;
                                span {
                                    padding-left: 10px;
                                }
                            }
                        }
                    }
                }
                .foot {
                    button {
                        width:220px;
                        background:linear-gradient(128deg,rgba(249,239,184,1) 0%,rgba(227,183,111,1) 100%);
                        border-radius:6px;
                        display: block;
                        outline: none;
                        border: none;
                        font-size:32px;
                        font-weight:500;
                        color:rgba(34,34,34,1);
                        line-height:45px;
                        padding: 18px 0;
                        margin: 10px auto;
                    }
                }
            }
            &.showmore {
                opacity: 1;
                visibility: visible;
                transition: opacity .3s 0s, visibility 0s 0s;
                .alert6 {
                    transform: scale(1);
                }
            }
        }
    }
</style>