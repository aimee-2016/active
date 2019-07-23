<template>
  <div id="bhost">
    <h1 id="hide-h1">DDoS高防IP套餐</h1>
    <!--公网IP div-->
    <div id="Peip" style="padding: 30px 40px 40px 40px;">
      <!--两种配置方式公共页面-->
      <!--区域选择-->
      <div style="border-bottom: 1px solid #D9D9D9;">
        <h2>套餐类型</h2>
        <div class="item-wrapper">
         <div v-for="(item,index) in mealList" :key="item.ddosprotectnumber"  class="zoneItem"
                 :class="{zoneSelect:meal ==item.ddosprotectnumber}"
                 @click="zoneChange(item.ddosprotectnumber,index)">{{item.packagename+'GB'}}
            </div>
        </div>
        <p style="margin-top: 10px;margin-bottom: 20px;font-size: 12px;color: #999999;line-height: 25px;">
         如需申请300GB以上资源，请联系客服。</p>
         <div>
             <div class="b-meal">
                <div class="bm-rg">套餐说明  </div>
                <div>
                    <p>DDoS防护能力：{{selectList.ddosprotectnumber}}Gbps </p>
                    <p>CC防护能力：{{selectList.ccprotectnumber}}QPS </p>
                    <p>套餐包含的正常业务带宽：{{selectList.bandwith}}M </p>
                    <p>转发的端口数（非网站业务：TCP/UDP）：{{selectList.porttransnumber}} </p>
                    <p>支持的域名数（网站业务：Http/Https）：{{selectList.domainnumber}}</p>
                </div>
             </div>
             <div class="b-meal">
                 <div class="bm-rg">价格  </div>
                <div class="bm-price">
                    {{selectList.price}}元/月
                </div>
             </div>
         </div>
      </div>
      <!--计费方式选择-->
      <div style="border-bottom: 1px solid #D9D9D9;margin-top: 20px">
        <h2 style="margin-bottom:20px;">线路与基础配置</h2>
        <div>
            <div class="b-meal">
                <div class="bm-rg">线路  </div>
               <div v-for="(item,index) in line.lineList" :key="index" class="zoneItem"
                    :class="{zoneSelect:selectList.zonename==item.label}"
                    @click="line.lineIndex=item.value">{{item.label}}
                </div>
             </div>
             <div class="b-meal">
                 <div class="bm-rg">弹性防护宽带 </div>
                    <div class="item-wrapper" style="width:77%;margin-top:0;">
                            <div v-for="(item,index) in mealList" :key="index" class="timeType"
                                :class="bandwidths.bandwidthIndex  > item.ddosprotectnumber && item.ddosprotectnumber < meal ? 'dis-no':bandwidths.bandwidthIndex==item.ddosprotectnumber ? 'zoneSelect':''"
                                @click="elasticClick(item)"
                            :style="item.ddosprotectnumber == 60 ||  item.ddosprotectnumber == 300 ?'border-right:1px solid #d9d9d9;':''">
                                {{item.ddosprotectnumber+'GB'}}
                                <!-- <span v-if="item.type=='year'" class="discount-icon">惠</span> -->
                            </div>
                         <p class="bm-fn">
         弹性防护带宽为最高防护带宽，如果弹性防护带宽值跟保底防护带宽值设置一样，则不会产生后付费且最高防护带宽为保底防护带宽值，如果弹性带宽值设置高于保底带宽值，则超过保底带宽值但不大于弹性带宽值的攻击仍然可以进行有效防护，超出部分按天计费 ，如超过封顶抗攻击量，则回源，2小时后自动解封。</p>
                    </div>
             </div>
            <div class="b-meal">
                <div class="bm-rg">端口数</div>
               <div>
                   <InputNumber v-model="port" :step='1' :min='selectList.porttransnumber'   @on-change='changeTime("port")'></InputNumber><span style="margin-left:5px;color:#999">个</span>
                   <p class="bm-fn">50个以上，每增加一个，增加200元/个/月</p>
                </div>
             </div>
             <div class="b-meal">
                <div class="bm-rg">域名防护数</div>
               <div>
                   <InputNumber v-model="domainCount"  :step='1' :min='selectList.domainnumber'   @on-change='changeTime("domain")'></InputNumber><span style="margin-left:5px;color:#999">个</span>
                   <p class="bm-fn">100个以上，每增加一个，增加200元/个/月</p>
                </div>
             </div>
             <div class="b-meal">
                <div class="bm-rg">业务带宽</div>
               <div style="width:500px;display: flex;align-items:center">
                   <i-slider
                        v-model="bandWidth"
                        unit="MB"
                        :min='selectList.bandwith'
                        :max=400
                        :step=1
                        :points="[50,100,150,200,300]"
                        style="margin-right:30px;vertical-align: middle;">
                    </i-slider>
                    <InputNumber :max="400" :min="selectList.bandwith" v-model="bandWidth" size="large"
                           style="position: relative;bottom: 5px" :precision="0"></InputNumber>
                </div>
             </div>
             <div class="b-meal">
                <div class="bm-rg">价格</div>
                <div class="bm-price">
                    {{price}}元/月
                </div>
             </div>
              <h2 style="margin-bottom:20px;">购买量</h2>
              <div class="b-meal">
                <div class="bm-rg">购买时长</div>
                <div v-for="(item,index) in timeValue" :key="index" class="timeType"
                    :class="{zoneSelect:timeForm.currentTimeValue.label==item.label}"
                    @click="timeForm.currentTimeValue=item"
                    style="margin:0px;border-right:none;width:55px">
                    {{item.label}}
                </div>
             </div>
              <div class="b-meal">
                <div class="bm-rg">购买数量</div>
               <div>
                   <InputNumber @on-change='changeTime' v-model="buyNumber" :step='1' :min='1' :max='10' :editable="false"></InputNumber><span style="margin-left:5px;color:#999">个</span>
                </div>
             </div>
             <!-- <div class="b-meal">
                <div class="bm-rg">价格</div>
                <div class="bm-price">
                    {{totalPrice}}元
                </div>
             </div> -->
         </div>
            
      </div>
      <div style="margin-top: 20px">
                <p style="text-align: left;font-size: 14px;color: #2A99F2;cursor: pointer"
                  @click="$router.push('computed/3-1')">查看计价详情</p>
                <p style="text-align: right;font-size: 14px;color: #666666;margin-bottom: 10px;">
                   <!-- <span v-if="timeForm.currentTimeType == 'annual'&&timeForm.currentTimeValue.type == 'year'">折后费用：</span> -->
                 <span >费用：</span><span style="font-size: 24px;color: #EE6723;">{{totalPrice.toFixed(2)}}元</span><span
                  v-show="timeForm.currentTimeType == 'current'">/小时</span>
                </p>
                <!-- <p style="text-align: right;font-size: 14px;color: #666666;" v-if="coupon!=0">已省：<span
                  style="font-size: 14px;color: #EE6723;">{{coupon.toFixed(2)}}元</span></p> -->
                <div style="text-align: right;margin-top: 20px;">
                  <Button size="large"
                          class="btn" @click="addIPCart">
                    加入预算清单
                  </Button>
                  <Button  type="primary" @click="buyIp"
                          style="border-radius: 10px;width: 128px;height: 39px;font-size: 16px;color: #FFFFFF;background-color: #377DFF;border: 1px solid #377DFF;">
                    立即购买
                  </Button>
                </div>
              </div>
    </div>
      <!-- 当前区域没有主机提示 -->
    <!-- <Modal v-model="showModal.withoutHost" :scrollable="true" :closable="false" :width="390">
      <p slot="header" class="modal-header-border">
        <Icon type="android-alert" class="yellow f24 mr10" style="font-size: 20px"></Icon>
        <span class="universal-modal-title">提示信息</span>
      </p>
      <div class="modal-content-s">
        <div>
          <p class="lh24">检测到您所选择区域内没有可用主机，确认在{{ zone.zonename}}购买公网IP吗 
          </p>
        </div>
      </div>
      <p slot="footer" class="modal-footer-s">
        <Button @click="showModal.withoutHost = false">取消</Button>
        <Button type="primary" @click="buyIpOK">确认</Button>
      </p>
    </Modal> -->
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from '@/util/axiosInterceptor'
  import regExp from '@/util/regExp'
  var debounce = require('throttle-debounce/debounce')
  export default{
    data(){
      var zoneList = this.$store.state.zoneList.filter(zone => {
        return zone.gpuserver == 0 || zone.gpuserver == 1
      })
      var zone = this.$store.state.zone
      // 如果默认区域在该资源下不存在
      if(!zoneList.some(i=>{
        return i.zoneid == zone.zoneid
        })){
        // 默认选中zoneList中第一个区域
        zone = zoneList[0]
      }
      return {
        zoneList,
        zone,

        // 套餐类型
        mealList:[
        ],
        meal:1,

        // 线路
        line:{
            lineList:[
                {
                    label:'中国大陆',
                    value:'1'
                },
                {
                    label:'海外',
                    value:'2'
                }
            ],
            lineIndex:'1'
        },

        // 端口
        port:50,

        // 域名防护数
        domainCount:100,

        // 弹性防护带宽
        bandwidths:{
            bandwidthList:[
            ],
            bandwidthIndex:10
        },

        // 计费方式
        timeType: [{label: '包年包月', value: 'annual'}, {label: '实时计费', value: 'current'}],
        timeValue: [
          {label: '1月', value: '1', type: 'month'},
          {label: '2月', value: '2', type: 'month'},
          {label: '3月', value: '3', type: 'month'},
          {label: '4月', value: '4', type: 'month'},
          {label: '5月', value: '5', type: 'month'},
          {label: '6月', value: '6', type: 'month'},
          {label: '1年', value: '1', type: 'year'},
          {label: '2年', value: '2', type: 'year'},
          {label: '3年', value: '3', type: 'year'}
        ],
        // 计费方式
        timeForm: {
          currentTimeType: 'annual',
          currentTimeValue: {label: '1月', value: '1', type: 'month'}
        },
        buyNumber:1,
        
        // 带宽大小
        bandWidth: 1,
        // 自动续费
        autoRenewal: true,
        // 花费
        cost: 0,
        coupon: 0,
        showModal:{
          withoutHost: false
        },
        selectList:{},
        elasticIpPrice:0,
        businessPrice:0,
        protPirce:0,
        wisetPrice:0,
        originNum:0,
        origindNum:0,
        dPrice:0,
        pPrice:0
      }
    },
    created(){
      // this.queryIPPrice();
      this.queryVpc();
    
    },
    mounted(){
    },
    methods: {
      // 查询虚拟私有云vpc列表
      queryVpc() {
        axios.get('ddosImitationIp/ddospackage.do', {
        }).then(res => {
          if(res.status == 200 && res.data.status ==1){
            this.mealList = res.data.result;
            this.zoneChange(res.data.result[0].ddosprotectnumber,0);
            this.queryElasticbandprice();
            this.queryPackagePrice();
            this.changeTime();
          }else{
            this.$Message.info(res.data.message);
          }
        })
      },

      elasticClick(item){
        if(this.bandwidths.bandwidthIndex  > item.ddosprotectnumber && item.ddosprotectnumber < this.meal ){
          return
        }
        this.bandwidths.bandwidthIndex=item.ddosprotectnumber;
     
        this.queryElasticbandprice();
      },

      // 查询弹性防护带宽价格
      queryElasticbandprice(){
        axios.get('ddosImitationIp/elasticbandprice.do',{
          params:{
            elasticband:this.bandwidths.bandwidthIndex,
            packageName:this.selectList.packagename,
            zoneId:this.selectList.zoneid,
            // timeVlue:this.timeForm.currentTimeValue.value,
            // timeType: this.timeForm.currentTimeType == 'annual' ? this.timeForm.currentTimeValue.type : 'current',
            count:this.buyNumber
          }
        }).then(res =>{
          if(res.status == 200 && res.data.status == 1){
            this.elasticIpPrice = res.data.price;
          }else{
            this.$Message.info(res.data.message);
          }
        }).catch(err =>{})
      },

      // 查询业务带宽价格
      queryPackagePrice: debounce(500, function (){
        axios.get('ddosImitationIp/packagePrice.do',{
          params:{
            elasticband:this.bandWidth,
            zoneId:this.selectList.zoneid,
            packagename:this.selectList.packagename,
            count:this.buyNumber
          }
        }).then(res =>{
          if(res.status == 200 && res.data.status == 1){
            this.businessPrice = res.data.price;
          }else{
            this.$Message.info(res.data.message);
          }
        }).catch(err =>{})
      }),

      changeTime(name){
        if(name != undefined){
          switch (name){
            case 'port':
              this.pPrice =(this.port-50)*200;
            break;
            case 'domain':
              this.dPrice = (this.domainCount-100)*200;
          }
          this.originNum = this.port;
          this.origindNum = this.domainCount;
        }
       axios.get('ddosImitationIp/packageprice.do',{
         params:{
          packageName:this.selectList.packagename,
          zoneId:this.selectList.zoneid,
          count:this.buyNumber,
          port:this.port,
          timeVlue:this.timeForm.currentTimeValue.value,
          timeType: this.timeForm.currentTimeType == 'annual' ? this.timeForm.currentTimeValue.type : 'current',
          website:this.domainCount,
         }
       }).then(res => {
         if(res.status == 200 && res.data.status == 1){
           this.protPirce = res.data.price;
           this.queryElasticbandprice();
            this.queryPackagePrice();
         }else{
           this.$Message.info(res.data.message);
         }
       }).catch(err =>{})
      },

      // 公网IP加入购物车
      addIPCart() {
        if (this.zone.buyover == 1) {
          this.$Message.info({
            content: '请选择需要购买的区域'
          })
          return
        }
        if (this.$parent.cart.length > 4) {
          this.$message.info({
            content: '购物车已满'
          })
        }
        let prod = {
          typeName: 'DDoS高防IP',
          type: 'Pddosip',
          zone: this.selectList.zoneid,
          line:this.selectList.zonename,
          timeForm: this.timeForm,
          cost: this.totalPrice,
           packageName:this.selectList.packagename,
            elasticband:this.bandwidths.bandwidthIndex,
            port:this.port,
            website:this.domainCount,
            serviceband:this.bandWidth,
            count:this.buyNumber,
            isAutoRenew:'1',
            ddosProtectNumber:this.selectList.ddosprotectnumber
        }
        this.$parent.cart.push(JSON.parse(JSON.stringify(prod)))
      },
      // queryIPPrice: debounce(500, function () {
      //   var params = {
      //     brand: this.bandWidth,
      //     timeType: this.timeForm.currentTimeValue.type,
      //     timeValue: this.timeForm.currentTimeValue.value,
      //     zoneId: this.zone.zoneid
      //   }
      //   if (this.timeForm.currentTimeType === 'current') {
      //     params.timeType = 'current'
      //   }
      //   axios.post('device/queryIpPrice.do', params).then(response => {
      //     this.cost = response.data.cost
      //     if (response.data.coupon) {
      //       this.coupon = response.data.coupon
      //     } else {
      //       this.coupon = 0
      //     }
      //   })
      // }),
      zoneChange(item,index){
        // if(item.buyover != 1){
         this.meal = item;
         this.selectList = this.mealList[index];
         this.bandwidths.bandwidthList = this.mealList[index];
         this.bandwidths.bandwidthIndex = item;
         this.port =  this.originNum = this.mealList[index].porttransnumber;
         this.domainCount = this.origindNum = this.mealList[index].domainnumber;
         this.bandWidth = this.mealList[index].bandwith;
         this.changeTime();
         
        // }
      },

      buyIp(){
        axios.get('ddosImitationIp/creatDdosIP.do',{
          params:{
            packageName:this.selectList.packagename,
            elasticband:this.bandwidths.bandwidthIndex,
            port:this.port,
            website:this.domainCount,
            serviceband:this.bandWidth,
            count:this.buyNumber,
            timeVlue:this.timeForm.currentTimeValue.value,
            timeType: this.timeForm.currentTimeType == 'annual' ? this.timeForm.currentTimeValue.type : 'current',
            zoneId:this.selectList.zoneid,
            cost:this.price,
            isAutoRenew:'1'
          }
        }).then(res => {
          if(res.status == 200 && res.data.status ==1){
             this.$router.push('/order')
          }else{
             this.$message.info({
              content: res.data.message
            })
          }
        }).catch(err =>{})
      },
      test(){
        
      }
    },
    computed: {
      userInfo(){
        return this.$store.state.userInfo
      },
      price(){
        return this.elasticIpPrice +  this.businessPrice + this.pPrice+ this.dPrice;
      },
      totalPrice(){
       return this.elasticIpPrice +  this.businessPrice + this.protPirce;
      },
      disNo(){
       if(this.bandwidths.bandwidthIndex  > item.ddosprotectnumber && item.ddosprotectnumber < this.meal ){
         return true
       }else{
         return false;
       }
      }
    },
    watch: {
      'zone': {
        handler(){
           this.changeTime()
        },
        deep: true
      },
      'timeForm': {
        handler(){
          this.changeTime()
        },
        deep: true
      },
      'bandWidth':{
          handler(){
          this.queryPackagePrice()
        },
        deep: true
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  #app {
    height: 100%;
  }

  #buy {
    background-color: #F7F7F7;
    #wrapper {
      width: 1200px;
      margin: 0px auto;
      padding: 50px 0px;
      #header {
        a {
          margin-left: 20px;
          font-size: 14px;
        }
      }
      #body {
        display: flex;
        justify-content: space-between;
        > div {
          width: 800px;
          background-color: #ffffff;
        }

        .config-title {
          font-size: 24px;
          line-height: 60px;
          width: 50%;
          text-align: center;
          cursor: pointer;
          color: #666666;
          background: #E9E9E9;
        }
        .typeSelect {
          background-color: #FFFFFF;
          color: #2A99F2;
          border-top: 3px solid #377DFF;
        }
        .zoneItem {
          width: 120px;
          height: 35px;
          line-height: 35px;
          background-color: white;
          border: 1px solid #d9d9d9;
          font-size: 14px;
          text-align: center;
          color: #666666;
          cursor: pointer;
          margin-right: 10px;
          margin-bottom: 10px;
          display: inline-block;
        }
        .timeType {
          margin: 0px 0 10px 0px;
          width: 80px;
          height: 35px;
          line-height: 35px;
          text-align: center;
          border: 1px solid #d9d9d9;
          font-size: 14px;
          cursor: pointer;
          border-right: none;
          display: inline-block;
          position: relative;
          .discount-icon {
            display: inline-block;
            position: absolute;
            background-color: rgb(255, 125, 45);
            color: #ffffff;
            right: 2px;
            top: 1px;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            line-height: 20px;
          }
          &:last-of-type {
            border-right: 1px solid #d9d9d9 !important;
          }
        }
        .zoneSelect {
          border-color: #377dff;
          background-color: #377dff;
          color: #ffffff;
        }
        .zoneDisabled{
          background: #666666;
          border: 1px solid #666666;
          cursor: not-allowed;
          color: #fff;
        }
        .item-wrapper {
            margin-top: 20px;
          .item-title {
            font-size: 16px;
            color: #333333;
            width: 90px;
            margin-top: 9px;
          }
          .item-desc {
            margin-top: 10px;
            margin-left: 90px;
            font-size: 14px;
            color: #999999;
            line-height: 25px;
          }
          .mirror {
            display: flex;
            width: 480px;
            margin-top: 20px;
            padding: 10px;
            cursor: pointer;
            border: 1px solid #d9d9d9;
            .appName {
              font-size: 14px;
              color: #666666;
            }
            .desc {
              font-size: 14px;
              color: rgb(153, 153, 153);
              margin-top: 10px;
            }
          }
          .mirrorSelect {
            background-color: #377dff;
            .appName {
              color: #ffffff;
            }
            .desc {
              color: #ffffff
            }
          }
        }
        .btn {
          border-color: #377DFF;
          font-size: 16px;
          color: #377DFF;
          border-radius: 10px;
          background: #FFFFFF;
          &:first-of-type {
            margin-right: 10px;
          }
          &:hover {
            background-color: #377DFF;
            color: #FFFFFF;
          }
        }

        #list {
          width: 380px;
          background-color: #f7f7f7;
          .item {
            font-size: 14px;
            color: #666666;
            line-height: 25px;
            .title {
              width: 70px;
              margin-right: 20px;
              text-align: right;
              display: inline-block;
            }
          }
        }
      }
    }
    /*购买按钮*/
    .buyButton {
      cursor: pointer;
      outline: none;
      padding: 10px 38px;
      border: 1px solid #377dff;
      border-radius: 10px;
      background-color: #ffffff;
      font-size: 16px;
      color: #377DFF;
      &:hover {
        background-image: linear-gradient(-42deg, #377DFF 0%, #4481EB 100%);
        color: #FFF;
      }
    }
  }

  .body {
    height: 55%;
    form {
      margin-top: 15px;
    }
    input {
      border: none;
      border-bottom: 1px solid #ccc;
      outline: none;
      background: rgba(0, 0, 0, 0);
      height: 50px;
      font-size: 14px;
      width: 80%;
      margin: 0px auto;
      display: block;
      margin-bottom: 20px;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px white inset;
      }
      &::-webkit-input-placeholder { /* Chrome/Opera/Safari */
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #B6B6B6;
      }
      &::-moz-placeholder { /* Firefox 19+ */
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #B6B6B6;
      }
      &:-ms-input-placeholder { /* IE 10+ */
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #B6B6B6;
      }
      &:-moz-placeholder { /* Firefox 18- */
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #B6B6B6;
      }
    }
    span {
      display: block;
      width: 80%;
      margin: 0px auto;
      font-family: PingFangSC-Regular;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #B6B6B6;
      font-size: 14px;
      line-height: 14px;
      height: 14px;
      transition: all .5s;
      &.warning {
        color: #F24747;
      }
    }
    img {
      width: 80px;
      height: 30px;
      position: absolute;
      display: block;
      bottom: 12px;
      right: 43px;
      cursor: pointer;
      //background: #4990E2;
      //border: 1px solid white;
      border-radius: 3px;
      font-family: PingFangSC-Regular;
      font-size: 11px;
      color: #FFFFFF;
      letter-spacing: 0.71px;
      outline: none;
    }
  }

  .foot {
    padding-top: 10px;
    height: 32%;
    button {
      width: 80%;
      margin: 0px auto;
      display: block;
      height: 45px;
      background-color: #4990E2;
      border: none;
      font-family: MicrosoftYaHei;
      font-size: 14px;
      color: #FFFFFF;
      letter-spacing: 0.83px;
      cursor: pointer;
      margin-bottom: 15px;
      &.disabled {
        cursor: not-allowed;
      }
    }
    .checkBox {
      width: 12px;
      height: 12px;
      border-radius: 2px;
      display: inline-block;
      border: 1px solid #ccc;
      cursor: pointer;
    }
    .agree {
      background-color: #2d8cf0;
      border-color: #2d8cf0;
      position: relative;
      &::after {
        content: "";
        display: table;
        width: 4px;
        height: 8px;
        position: absolute;
        top: 0px;
        left: 3px;
        border: 2px solid #fff;
        border-top: 0;
        border-left: 0;
        transform: rotate(45deg) scale(1);
      }
    }
    div {
      width: 80%;
      height: 35px;
      margin: 0px auto;
    }
    span {
      vertical-align: middle;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      letter-spacing: 0.83px;
    }
  }

  .hidden {
    font-size: 0px;
  }

  .numberAdd {
    border: 1px solid #D9D9D9;
    padding: 4px 10px;
    margin-right: -5px;
  }

  .numberMinus {
    border: 1px solid #D9D9D9;
    padding: 4px 8px;
    margin-left: -5px;
  }
  .b-meal{
      display: flex;
      margin-bottom: 20px;
      .bm-rg{
          width: 100px;
          color: #333333;
          font-size: 16px;
      }
      p{
          line-height: 22px;
          color:#999999;
          font-size: 14px;
      }
      .bm-fn{
          margin-top: 10px;margin-bottom: 20px;font-size: 12px;color: #999999;line-height: 25px;
      }
      .bm-price{
          color:#F85E1D;font-size:18px;
      }
  }
  .dis-no{
    color: #bbbec4;
    background-color: #f7f7f7;
    border-color: 1px solid #dddee1;
    cursor: not-allowed !important;
  }
</style>
