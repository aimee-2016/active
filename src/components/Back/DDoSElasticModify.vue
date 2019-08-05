<template>
    <div id="background">
        <div id="wrapper">
            <span class="title">云安全 / DDoS高防IP / <span>概览详情</span></span>
             <div id="content">
                <div id="header">
                    <i class="back-btn" @click="$router.push('/DDoSIPdetails')">
                        <Icon type="chevron-left" style="font-size:12px;"></Icon>
                    </i>
                    <span id="title">修改弹性防护带宽</span>
                    <button id="refresh_button" @click="$router.go(0)" style="margin-top: 10px;">刷新</button>
                </div>
                <div class="du-top">
                    <p class="du-bft">修改前弹性防护峰值配置</p>
                    <div class="du-tdb">
                        <div class="du-tbox">
                            <div>
                                <span class="du-lft">套餐名称</span>
                            </div>
                            <div>
                                <span class="du-sft">{{newList.packageName}}</span>
                            </div>
                        </div>
                        <div class="du-tbox">
                            <div>
                                <span class="du-lft">套餐保底防护</span>
                            </div>
                            <div>
                                <span class="du-sft">{{newList.elasticband}}GB</span>
                            </div>
                        </div>
                        <div class="du-tbox">
                            <div>
                                <span class="du-lft">弹性防护配置</span>
                            </div>
                            <div>
                                <span class="du-sft">{{newList.oldElasticband}}GB</span>
                            </div>
                        </div>
                        <div class="du-tbox">
                            <div>
                                <span class="du-lft">当前峰值阶梯计费金额</span>
                            </div>
                            <div>
                                <span class="du-sft">{{newList.oldProtectBandwithPrice}}元/天</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div style="margin:40px 0 20px 0;">
                    <div class="du-up">
                         <p class="du-bft">可修改配置</p>
                         <div style="width:700px;margin-bottom:10px;">
                             <div v-for="(item,index) in elasticList" :key="index" class="timeType"
                                :class="{zoneSelect : elasticIndex  == index}"
                                @click="changeElastic(index)"
                            >
                                {{item.label}}
                            </div>
                         </div>
                         
                         <p>当前峰值阶梯计费金额：{{newList.newProtectBandwithPrice}}元/天</p>
                    </div>
                </div>
                <div class="du-up">
                    <p class="du-bft">修改后弹性防护峰值配置</p>
                     <div class="du-tdb" style="border:none;">
                        <div class="du-tbox">
                            <div>
                                <span class="du-lft">套餐保底防护</span>
                            </div>
                            <div>
                                <span class="du-oft">{{newList.newElasticband}}GB</span>
                            </div>
                        </div>
                        <div class="du-tbox">
                            <div>
                                <span class="du-lft">弹性防护配置</span>
                            </div>
                            <div>
                                <span class="du-oft">{{elasticList[elasticIndex].label}}</span>
                            </div>
                        </div>
                        <div class="du-tbox">
                            <div>
                                <span class="du-lft">当前峰值阶梯计费金额</span>
                            </div>
                            <div>
                                <span class="du-oft">{{newList.newProtectBandwithPrice}}元/天</span>
                            </div>
                        </div>
                    </div>
                     <p class="du-nft">购买和计费说明</p>
                    <div style="display:flex;">
                        <div>
                            <p style="color:#FF9801;">提示：当您调整您的弹性防护峰值之时，我们将根据弹性防护的阶梯计费表来计算您的冻结费用。</p>
                        </div>
                        <div sty>
                            <p>应补冻结费用：<span class="du-oft" style="font-size:24px;">{{newList.price}}元</span></p>
                        </div>
                    </div>
                    
                </div>
                <div style="text-align:right;margin-top:20px;">
                    <Button style="margin-right:10px;">取消修改</Button>
                    <Button type="primary" @click="modalW = true,renewPrice ={}">确认修改</Button>
                </div>
            </div>
        </div>

        <Modal :mask-closable="false" v-model="modalW">
            <p slot="header" class="modal-header-border">
                <span class="universal-modal-title">冻结押金</span>
            </p>
            <div class="dp-er" v-if="renewPrice.status != 1 && renewPrice.status !== undefined">
                 <Icon type="close-circled" color='#ED4014' size='12px'></Icon>
                 <span style="margin-left:4px;">{{renewPrice.message}}</span>
             </div>
            <div >
                <div>
                    <span style="margin-right:10px;">需冻结金额</span> <span>{{newList.price}}元</span>
                </div>
                <div>
                    <span style="margin-right:24px;">可用余额</span><span>{{newList.remainder}}元</span>
                </div>
            </div>
            <div slot="footer" class="modal-footer-border">
                <Button type="ghost" @click="modalW = false">取消</Button>
                <Button type="primary" @click="gotopMoeny">确定</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
export default {
    data(){
        return{
            elasticList:[
                {
                    label:"0GB",
                    value:"0"
                },
                {
                    label:"10GB",
                    value:"10"
                },
                {
                    label:"20GB",
                    value:"20"
                },
                {
                    label:"30GB",
                    value:"30"
                },
                {
                    label:"40GB",
                    value:"40"
                },
                {
                    label:"50GB",
                    value:"50"
                },
                {
                    label:"60GB",
                    value:"60"
                },
                {
                    label:"70GB",
                    value:"70"
                },
                {
                    label:"80GB",
                    value:"80"
                },
                {
                    label:"90GB",
                    value:"90"
                },
                {
                    label:"100GB",
                    value:"100"
                },
                {
                    label:"110GB",
                    value:"110"
                },
                {
                    label:"120GB",
                    value:"120"
                },
                {
                    label:"130GB",
                    value:"130"
                },
                {
                    label:"140GB",
                    value:"140"
                },
                {
                    label:"150GB",
                    value:"150"
                },
                {
                    label:"220GB",
                    value:"220"
                },
                {
                    label:"320GB",
                    value:"320"
                },
                {
                    label:"420GB",
                    value:"420"
                },
                {
                    label:"520GB",
                    value:"520"
                },
                {
                    label:"620GB",
                    value:"620"
                },
                {
                    label:"720GB",
                    value:"720"
                },
                {
                    label:"820GB",
                    value:"820"
                },
                {
                    label:"920GB",
                    value:"920"
                },
                {
                    label:"1020GB",
                    value:"1020"
                },
            ],
            elasticIndex:0,
            pId:sessionStorage.getItem('pgId'),
            newList:{},
            modalW:false,
            renewPrice:{}
        }
    },
    created(){
        this.getElasticModify();
    },
    methods:{
        getElasticModify(){
            let value = this.elasticList[this.elasticIndex].value;
            this.$http.get('ddosImitationIp/alterElasticbandprice.do',{
                params:{
                    newElasticband:value,
                    packageId:this.pId
                }
            }).then(res => {
                if(res.status == 200 && res.data.status == 1){
                    this.newList = res.data.result;
                }else{
                    this.$Message.info(res.data.message);
                }
            }).catch(err => {})
        },
        
        changeElastic(index){
            this.elasticIndex = index;
            this.getElasticModify();
        },
        gotopMoeny(){
            let value = this.elasticList[this.elasticIndex].value;
            this.$http.post('ddosImitationIp/getRemainderFrozen.do',{
                eachMoney:this.newList.price,
                packageId:this.pId,
                elasticband:value
            }).then(res => {
                if(res.status == 200 && res.data.status == 1){
                    this.$Message.success('修改成功');
                }else{
                    this.renewPrice = res.data;
                }
            })
        }
    }
}
</script>

<style lang="less" scoped>
  .back-btn {
    margin-top: 8px;
    display: inline-block;
    width: 25px;
    height: 25px;
    border-radius: 4px;
    border: 1px solid rgba(225, 225, 225, 1);
    color: #999999;
    text-align: center;
    cursor:pointer;
    line-height: 24px;
    }
  .du-top{
      background-color:rgba(239,246,254,0.7);
      height: 172px;
      padding: 20px;
  }  
  .du-tdb{
          border-top: 1px solid #E9E9E9;
          padding-top:10px; 
        .du-tbox{
          display:flex;
          width:300px;
          margin-bottom: 10px;
          div{
              width: 50%;
          }
      }
    }
  .du-bft{
      font-size: 18px;
      color: #333333;
      margin-bottom: 10px;
  }
  .du-sft{
      font-size: 14px;
      color: #333333;
  }
  .du-lft{
      font-size: 14px;
      color: #666666;
  }
  .du-oft{
       font-size: 14px;
      color: #FF624B;
      font-weight: Bold;
  }
  .du-nft{
      color: #2A99F2;
      cursor: pointer;
  }
  .du-up{
      border: 1px solid #E9E9E9;
      padding: 20px;
  }
       .zoneSelect {
          border-color: #377dff;
          background-color: #377dff;
          color: #ffffff;
        }
        .timeType {
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
        .dp-er {
  height: 32px;
  line-height: 32px;
  margin-bottom: 20px;
  padding: 0 20px;
  border: 1px solid #ed4014;
  border-radius: 4px;
  background-color: rgba(237, 64, 20, 0.08);
}
</style>
