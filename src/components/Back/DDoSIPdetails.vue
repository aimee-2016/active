<template>
    <div id="background">
        <div id="wrapper">
            <span class="title">云安全 / DDoS高防IP / <span>概览详情</span></span>
             <div id="content">
                <div id="header">
                     <div class="host-name">
                        <img style="cursor:pointer;" @click="$router.push('DDoSIPBack')" src="../../assets/img/host/h-icon9.png"/>
                        <span >概览详情</span>
                    </div>
                </div>
                <div class="ds-box">
                    <p class="t-psize">基本信息</p>
                    <div class='ds-row'>
                        <div class="ds-ct">
                            <p>套餐ID</p>
                            <p>{{ddosipDetails.packageId}}</p>
                        </div>
                        <div class="ds-ct">
                            <p>DDoS防护能力</p>
                            <p>{{ddosipDetails.ddosProtectNumber+'GB'}}</p>
                        </div>
                        <div class="ds-ct">
                            <p>CC防护能力</p>
                            <p>{{ddosipDetails.ccProtectNumber+'QPS'}}</p>
                        </div>
                    </div>

                    <div class='ds-row'>
                        <div class="ds-ct">
                            <p>正常业务带宽</p>
                            <p>{{ddosipDetails.bandwith+'M'}}</p>
                        </div>
                        <div class="ds-ct">
                            <p>转发端口数</p>
                            <p>{{ddosipDetails.portTransNumber}}</p>
                        </div>
                        <div class="ds-ct">
                            <p>支持域名数</p>
                            <p>{{ddosipDetails.domainNumber}}</p>
                        </div>
                    </div>
                </div>

                 <div class="ds-box">
                    <p class="t-psize">购买信息</p>
                    <div class='ds-row'>
                        <div class="ds-ct">
                            <p>购买时长</p>
                            <p>{{ddosipDetails.buyMounthNumber+'个月'}}</p>
                        </div>
                        <div class="ds-ct">
                            <p>购买时间</p>
                            <p>{{ddosipDetails.buyTime}}</p>
                        </div>
                        <div class="ds-ct">
                            <p>到期时间<span class="ds-blf" @click="showModal.meal = true">续费</span></p>
                            <p>{{ddosipDetails.endTime}}</p>
                        </div>
                    </div>
                </div>

                <div class="ds-box">
                    <p class="t-psize">应用信息</p>
                    <div class='ds-row'>
                        <div class="ds-ct">
                            <p>套餐下网站业务 <span class="ds-blf" @click="goDip">查看详情</span></p>
                            <div>
                                <p v-for="(item,index) in ddosipDetails.domainName" :key="index">{{item.domainname}}</p>
                            </div>
                            
                        </div>
                        <div class="ds-ct">
                            <p>套餐下非网站业务 <span class="ds-blf" >查看详情</span></p>
                            <p>{{ddosipDetails.count}}条转发规则</p>
                        </div>
                        <div class="ds-ct">
                            <p><span class="ds-blf" >查看业务监控统计</span></p>
                        </div>
                    </div>
                </div>
             </div>
        </div>

        <!-- 套餐续费 -->
         <Modal :mask-closable="false" v-model="showModal.meal">
             <p slot="header" class="modal-header-border">
                <span class="universal-modal-title">套餐续费</span>
            </p>
             <div class="dp-er" v-if="renewPrice.status != 1 && renewPrice.status !== undefined">
                 <Icon type="close-circled" color='#ED4014' size='12px'></Icon>
                 <span style="margin-left:4px;">{{renewPrice.message}}</span>
             </div>
             <ul class="dp-xfu">
                 <li class="dp-xfl">
                     <div class="dp-xfz">
                        <p>续费套餐ID</p>
                     </div>
                     <div class="dp-xfy">
                        <p>{{ddosipDetails.packageId||"无"}}</p> 
                     </div>
                 </li>
                 <li class="dp-xfl">
                     <div class="dp-xfz">
                        <p>购买时长</p>
                     </div>
                     <div class="dp-xfy" style="padding-left:26px;">
                        <div class="dp-ti" :class="durationIndex == index?'dp-tis':''" v-for="(item,index) in durationList" :key="item.value" @click="queryMealRenew(index)">{{item.label}}</div> 
                     </div>
                 </li>
                 <li class="dp-xfl">
                     <div class="dp-xfz">
                        <p>续费到期时间</p>
                     </div>
                     <div class="dp-xfy">
                        <p>{{renewPrice.endTime}}</p> 
                     </div>
                 </li>
             </ul>
            <p class="dp-ren">续费订单费用<span>{{renewPrice.price}}元</span></p>
             <div slot="footer" class="modal-footer-border">
                <Button type="ghost" @click="showModal.meal = false">取消</Button>
                <Button type="primary" @click="createMealRenew">确定</Button>
            </div>
         </Modal>   
    </div>
</template>
<script>
export default {
    data(){
        return{
            ddosipDetails:{},
            showModal:{meal:false},
            durationIndex:0,
            duration:'',
            durationIndex:0,
            durationList:[
                {
                    value:'1',
                    label:'1个月',
                    isTrue:0
                },
                {
                    value:'2',
                    label:'2个月',
                    isTrue:-1
                },
                {
                    value:'3',
                    label:'3个月',
                    isTrue:-2
                },
                {
                    value:'4',
                    label:'4个月',
                        isTrue:-3
                },
                {
                    value:'5',
                    label:'5个月',
                    isTrue:-4
                },
                {
                    value:'6',
                    label:'6个月',
                    isTrue:-5
                },
                {
                    value:'12',
                    label:'1年',
                    isTrue:-6
                },
                {
                    value:'24',
                    label:'2年',
                    isTrue:-7
                },
                {
                    value:'36',
                    label:'3年',
                    isTrue:-8
                },
            ],
            renewPrice:{}
        }
    },
    created(){
        this.getDDosDetails();
       
    },
    methods:{
        getDDosDetails(){
            this.$http.get('ddosImitationIp/userinfo.do',{
                params:{
                    packageId:sessionStorage.getItem('ddopId')
                }
            }).then(res =>{
                if(res.status == 200 && res.data.status == 1){
                    this.ddosipDetails = res.data.result;
                     this.queryMealRenew(0);
                }else{
                    this.$Message.info(res.data.message);
                }
            }).catch(err =>{

            })
        },
            // 获取续费套餐价格
        queryMealRenew(index){
            this.durationIndex = index;
            this.$http.get('ddosImitationIp/PackageRenewalPrice.do',{
                params:{
                    packageId:this.ddosipDetails.packageId,
                    timeVlue:this.durationList[index].value
                }
            }).then(res => {
                if(res.status == 200 && res.data.status == 1){
                    this.renewPrice = res.data;
                }else{
                    this.renewPrice = res.data;
                }
            }).catch(err =>{

            })
        },
        createMealRenew(){
            this.$http.get('ddosImitationIp/creatPackageRenewal.do',{
                params:{
                    packageId:this.ddosipDetails.packageId,
                    timeVlue:this.durationList[this.durationIndex].value,
                    cost:this.renewPrice.price
                }
            }).then(res => {
                if(res.status == 200 && res.data.status == 1){
                    this.showModal.meal = false;
                    this.$router.push('order');
                    this.getDdosOverview(1);
                }else{
                    this.renewPrice = res.data;
                }
            }).catch(err =>{

            }) 
        },

        goDip(){
            this.$router.push('ddosipback')
        },
    },
    computed:{}
}
</script>
<style lang="less" scoped>
.host-name{
      display: inline-block;
      img{
          vertical-align: middle;
      }
      span{
          vertical-align: middle;
          font-size: 18px;
          margin: 0 10px 0 5px;
      }
  }
  .ds-row{
      display: flex;
      background-color: rgba(239, 246, 254, 0.7);
      padding:0 0px 0 20px;
      height: 58px;
      margin-top:10px;
      line-height: 68px;
  }
  .ds-box{
      border-bottom: 1px solid #E9E9E9;
      padding-bottom: 20px;
      margin-bottom: 18px;
      .t-psize{
          font-size: 18px;
          color: #333333;
      }
      .ds-ct{
          width: 367px;
          margin-right: 18px;
          padding: 10px 0;
          position: relative;
          p{
              font-size: 14px;
              color: #333333;
          }
          p:first-child{
              margin-bottom: 10px;
          }
      }
      .ds-ct:last-child::before{
          display: none;
      }
      .ds-ct::before{
          content: '';
          position: absolute;
          right: 0;
          width: 2px;
          height: 48px;
          background-color: #CBD0D5;
      }
  }
  .ds-blf{
      margin-left:10px;color:#4297F2;cursor:pointer;
  }
  .dp-tis {
  color: #ffffff;
  background-color: #4297f2;
  border: 1px solid #4297f2;
    border-collapse: collapse;
}
  .dp-xfu {
  margin-bottom: 20px;
  .dp-xfl {
    margin-bottom: 10px;
    display: flex;
    .dp-xfz {
      width: 84px;
      margin-right: 10px;
      text-align: left;
      color: #333333;
      font-size: 14px;
    }
    .dp-xfy {
      color: #666666;
      font-size: 14px;
    }
  }
}
.dp-er {
  height: 32px;
  line-height: 32px;
  margin-bottom: 20px;
  padding: 0 20px;
  border: 1px solid #ed4014;
  border-radius: 4px;
  background-color: rgba(237, 64, 20, 0.08);
}
.dp-ti {
  width: 61px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  border: 1px solid #e1e1e1;
  display: inline-block;
  margin-bottom: 10px;
   border-collapse: collapse;
  cursor: pointer;
}
.dp-ren {
  text-align: right;
  font-size: 14px;
  color: #333333;
  margin-right: 10px;
  span {
    font-size: 18px;
    color: #ff624b;
    font-weight: bold;
  }
}
</style>
