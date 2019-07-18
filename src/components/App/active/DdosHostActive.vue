<template>
  <div id="ddosHostActive">
    <div class="active404" v-if="ActivityState=='2'">
      <div id="wrapper">
        <img src="../../../assets/img/active/blackactive/active404.png" class="imgg" />
        <h1>活动已经结束咯，去活动中心看看其它活动吧！</h1>
        <Button @click="$router.push('/activity/')" class="btn1">去活动中心</Button>
      </div>
    </div>
    <div v-else>
      <div class="top-bg">
        <div class="top-bgbox">
          <div class="banner">
            <div class="wrap">
              <div class="top-date">07/25–9/25</div>
              <div class="top-title"><img src="../../../assets/img/active/ddosHostActive/active_tit.png" class="imgg" alt="高防服务器限时秒杀"/></div>
              <div class="topdes">更有首月<span>8</span>折等超多优惠</div>
            </div>
          </div>
          <div class="navigation">
            <div class="navItem" v-for="(item, index) in navList" :key="index+1" :class="{'active': index == navSelect}">
              <div class="nav-tit">{{item.title}}</div>
              <div class="nav-dec">{{item.dec}}</div>
            </div>
          </div>
          <div class="countdown-box">
            
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    name: 'DdosHostActive',
    data () {
      return {
        ActivityState: '1',
        navList: [
          {title: '活动一', dec: '高防云产品超低折扣 专属秒杀'},
          {title: '活动二', dec: '高防云服务器首月8折优惠'},
          {title: '活动三', dec: '超低折扣 买时长送域名'},
          {title: '活动四', dec: '自选配置 打折再送时长'}
        ],
        navSelect: 0, // 默认选中活动一
      }
    },
    methods: {
      getActivitystatus(){
        axios.get('activity/activityTime.do', {
          params: {
            activityId: '43'
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.ActivityState=response.data.status
            /* this.getHostZoneList()
            this.getHostZoneListfornew()
            this.getobjZoneListHot()
            this.getHostZoneListHot()
            this.getGpuZoneListHot()
            this.setTime()
            this.getUserVipLevel()
            this.getBalance()
            this.TOmembership()
            this.getAppointment()
            this.getSpikeKilldata() */
          } else {
            this.ActivityState=response.data.status
          }
        })
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
#ddosHostActive {
  color: #4b3c3d;
  background: rgba(247, 247, 247, 1);
  height: 100%;
  .active404{
      background:rgba(255,255,255,1);
      width: 100%;
      height: 100%;
      #wrapper {
      width: 100%;
      margin: 0px auto;
      text-align: center;
      justify-content: center;
      .imgg{
        margin-top: 180px;
      }
      > h1{
        margin-top: 80px;
      }
      .btn1{
        margin: 50px auto 156px auto;
        color:rgba(255,255,255,1);
        font-size:16px;
        width:128px;
        height:42px;
        background:rgba(42,153,242,1);
        border-radius:4px;
      }
    }
  }
  .top-bg{
    width: 100%;
    height: auto;
    background: #2A2936;
    .top-bgbox{
      margin: 0 auto;
      width: 1200px;
      .banner {
        width: 100%;
        height: 315px;
        .wrap{
          position: relative;
          width: 100%;
          &::after {
            content: "";
            position: absolute;
            background: url('../../../assets/img/active/ddosHostActive/topimg.png') no-repeat center top;
            width: 873px;
            height: 313px;
            top: 0;
            right: -115px;
          }
          .top-date{
            padding-top: 50px;
            font-size: 28px;
            font-weight: 300;
            color:rgba(255,255,255,1);
            line-height: 34px;
          }
          .top-title {
            margin-top: 27px;
            img{
              width: 672px;
              height: auto;
            }
          }
          .topdes {
            margin-top: 20px;
            font-size: 24px;
            font-weight: 300;
            color:rgba(255,237,210,1);
            line-height: 33px;
            span {
              font-weight: bold;
            }
          }
        }
      }
      .navigation {
        display: flex;
        width: 100%;
        height: 118px;
        .navItem {
          width: 25%;
          height: 118px;
          background: #3E3C4E;
          cursor: pointer;
          &.active {
            background: #FFE0A3;
            .nav-tit {
              color:#222222!important;
            }
            .nav-dec {
              color:#222222!important;
            }
          }
          .nav-tit {
            margin-top: 23px;
            font-size: 18px;
            font-weight:bold;
            text-align: center;
            color:rgba(255,224,163,1);
            line-height: 24px;
          }
          .nav-dec {
            margin-top: 15px;
            font-size:20px;
            font-weight:bold;
            text-align: center;
            color:rgba(255,224,163,1);
            line-height:26px;
          }
        }
      }
    }
  }
}

</style>
