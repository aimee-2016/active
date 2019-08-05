<template>
    <div id="background">
        <div id="wrapper">
            <span class="title">云安全 / DDoS高防IP / <span>概览详情</span></span>
             <div id="content">
                <div id="header">
                    <i class="back-btn" @click="$router.push('/ddosipback')">
                        <Icon type="chevron-left" style="font-size:12px;"></Icon>
                    </i>
                    <span id="title">升级配置</span>
                    <button id="refresh_button" @click="$router.go(0)" style="margin-top: 10px;">刷新</button>
                </div>
                <div class="du-top">
                    <div>
                        <p>套餐ID:DMS-1GB 464654</p>
                        <p>1G DDoS防护，4000QPS CC防护，5M套餐业务带宽，端口数：50，域名数：100 | 中国大陆</p>
                    </div>
                    <div>
                        <p>业务带宽：<span>5M</span></p>
                        <p>到期时间：<span>2019-07-08 19:28:32</span></p>
                    </div>
                </div>
                <div style="margin:10px 0;">
                    <p class="du-bft">可升级配置</p>
                    <div class="du-up">

                    </div>
                </div>
                <div>
                    <p class="du-bft">升级后配置</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{

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
  .du-bft{
      font-size: 14px;
      color: #333333;
      margin-bottom: 10px;
  }
  .du-up{
      height: 276px;
      border: 1px solid #E9E9E9;
  }
</style>
