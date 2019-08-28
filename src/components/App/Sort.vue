<template>
  <div>
    <div class="active-box">
      <router-link v-for="(item,index) in actives" :key="index" :to="'/'+item.newurl+'/'" v-show="item.isStart!=2">
        <div class="active-item">
          <img :src="item.mobileImgPathUrl" class="item-img">
          <h6>{{item.name}}</h6>
          <p class="item-bottom">{{item.des}}</p>
        </div>
      </router-link>

    </div>

  </div>
</template>

<script>
  import axios from 'axios'
  import $store from '@/vuex'
  import {Swiper, Flexbox, FlexboxItem} from 'vux'
  import {XButton} from 'vux'
  export default {
    components: {
      Swiper,
      XButton,
      Flexbox,
      FlexboxItem
    },
    data () {
      window.scrollTo(0, 0);
      return {
        actives: [],
      }
    },
    created() {
      this.getData()
    },
    methods: {
      //获取数据
      getData() {
        axios.get('activity/getActivitys.do', {
          params: {
            isStart: '3'
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.actives = response.data.result
          }
        })
      }
    }

  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  //活动页面样式
  .active-box {
    padding: 10px;
    background: rgba(245, 245, 245, 1);
    .active-item {
      margin-bottom: 10px;
      background-color: #FFF;
      padding-bottom: 15px;
      .item-img {
        width: 100%;
        display: block;
      }
      h6 {
        padding: 10px 0 4px 12px;
        color: rgba(51, 51, 51, 1);
        font-weight: normal;
        font-size: 16px;
      }
      .item-bottom {
        padding-left: 12px;
        font-size: 10px;
        color: rgba(102, 102, 102, 1);
      }
    }
  }
</style>
