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
                            <p>到期时间<span class="ds-blf">续费</span></p>
                            <p>{{ddosipDetails.endTime}}</p>
                        </div>
                    </div>
                </div>

                <div class="ds-box">
                    <p class="t-psize">应用信息</p>
                    <div class='ds-row'>
                        <div class="ds-ct">
                            <p>套餐下网站业务 <span class="ds-blf" >查看详情</span></p>
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
    </div>
</template>
<script>
export default {
    data(){
        return{
            ddosipDetails:{}
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
                }
            }).catch(err =>{

            })
        }
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
      padding:10px 0px 10px 20px;
      height: 68px;
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
</style>
