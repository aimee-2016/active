<template>
    <div id="background">
        <div id="wrapper">
            <span class="title">云安全 / DDoS高防IP / <span>概览详情</span></span>
             <div id="content">
                <div id="header">
                    <i class="back-btn" @click="$router.push('/ddosipback')">
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
                                <span class="du-sft">test</span>
                            </div>
                        </div>
                        <div class="du-tbox">
                            <div>
                                <span class="du-lft">套餐保底防护</span>
                            </div>
                            <div>
                                <span class="du-sft">20GB</span>
                            </div>
                        </div>
                        <div class="du-tbox">
                            <div>
                                <span class="du-lft">弹性防护配置</span>
                            </div>
                            <div>
                                <span class="du-sft">30GB</span>
                            </div>
                        </div>
                        <div class="du-tbox">
                            <div>
                                <span class="du-lft">当前峰值阶梯计费金额</span>
                            </div>
                            <div>
                                <span class="du-sft">1500元/天</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div style="margin:40px 0 20px 0;">
                    <div class="du-up">
                         <p class="du-bft">可修改配置</p>
                         <p>当前峰值阶梯计费金额：0元/天</p>
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
                                <span class="du-oft">20GB</span>
                            </div>
                        </div>
                        <div class="du-tbox">
                            <div>
                                <span class="du-lft">弹性防护配置</span>
                            </div>
                            <div>
                                <span class="du-oft">30GB</span>
                            </div>
                        </div>
                        <div class="du-tbox">
                            <div>
                                <span class="du-lft">当前峰值阶梯计费金额</span>
                            </div>
                            <div>
                                <span class="du-oft">0元/天</span>
                            </div>
                        </div>
                    </div>
                    <p class="du-nft">购买和计费说明</p>
                    <p style="color:#FF9801;">提示：当您调整您的弹性防护峰值之时，我们将根据弹性防护的阶梯计费表来计算您的冻结费用。</p>
                </div>
                <div style="text-align:right;margin-top:20px;">
                    <Button style="margin-right:10px;">取消修改</Button>
                    <Button type="primary">确认修改</Button>
                </div>
            </div>
        </div>
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
            ]
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
      height: 206px;
      border: 1px solid #E9E9E9;
      padding: 20px;
  }
</style>
