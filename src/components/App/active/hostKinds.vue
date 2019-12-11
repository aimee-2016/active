<template>
  <div>
    <Spin fix v-show="loading">
      <Icon type="load-c" size="18" class="demo-spin-icon-load"></Icon>
      <div>{{loadingMessage}}</div>
    </Spin>
    <div class="free-host">
      <div class="wrap">
        <img class="pc" src="../../../assets/img/active/freeToReceive.1/free-host-text.png" />
        <img
          class="mobile"
          src="../../../assets/img/active/deposit/m-banner.png"
          style="width:300px;"
        />
        <div class="main">
          <div class="tabs">
            <div :class="{selected:currentView=='child1'}">
              <span class="bar"></span>
              <a href="javascript:void(0)" @mouseover="tabChange('child1')">
                <span>免费领云产品</span>
                <i>4核8G 5M 云服务器免费用1年</i>
              </a>
            </div>
            <div :class="{selected:currentView=='child2'}">
              <span class="bar"></span>
              <a href="javascript:void(0)" @mouseover="tabChange('child2')">
                <span>天天特惠活动</span>
                <i>4核8G 10M云服务器 首次体验只需99.9/月 数量有限，按需抢购</i>
              </a>
            </div>
          </div>
          <div class="container">
            <div class="deposite-host" v-show="currentView=='child1'">
              <div class="wrap-inner">
                <div class="product">
                  <div v-for="(item,index) in depositeList" :key="index">
                    <div class="head">
                      <span class="cer" v-if="item.post.certification==3">企业用户专享</span>
                      <span class="cer" v-if="item.post.freeddeposit==1" style="width:60px;">免保证金</span>
                      <h3>{{titleD(item.post)}}</h3>
                      <p v-if="item.post.servicetype=='G5500'">
                        <span>{{item.post.bandwith}}M带宽</span>
                        <span>{{item.post.disksize}}G系统盘</span>
                      </p>
                    </div>
                    <div class="body bodyt" v-if="item.post.servicetype!='G5500'">
                      <div class="configure">
                        <ul>
                          <li>
                            <i>CPU</i>
                            <span>{{item.post.cpu}}核</span>
                          </li>
                          <li>
                            <i>内存</i>
                            <span>{{item.post.mem}}G</span>
                          </li>
                          <li v-if="item.post.servicetype!='db'">
                            <i>宽带</i>
                            <span>{{item.post.bandwith}}M</span>
                          </li>
                          <li>
                            <i>系统盘</i>
                            <span v-if="item.post.servicetype!='db'">
                              {{item.post.disksize}}G
                              <span>SSD</span>
                            </span>
                            <span v-else>40G</span>
                          </li>
                          <li v-if="item.post.servicetype=='db'">
                            <i>数据盘</i>
                            <span>100G</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div class="body bodyb">
                      <div v-if="item.post.servicetype=='G5500'" class="mb15 mt5">
                        <span class="label">配置：</span>
                        <Select
                          v-model="item.gpuConfigIndex"
                          placeholder=" "
                          @on-change="changConfigGPUD(item)"
                        >
                          <Option
                            v-for="(item1,index1) in item.postArr"
                            :value="index1"
                            :key="index1"
                          >{{ item1.cpu+'核'+item1.mem+'G'+' '+item1.gpusize+'*NVIDIA P100' }}</Option>
                        </Select>
                      </div>
                      <div class="mb15">
                        <span class="label">区域：</span>
                        <Select
                          class="systemw"
                          v-model="item.zoneId"
                          @on-change="changeZoneD(item)"
                        >
                          <Option
                            v-for="item1 in item.zoneList"
                            :value="item1.value"
                            :key="item1.value"
                          >{{ item1.name }}</Option>
                        </Select>
                      </div>
                      <div class="mb15">
                        <span class="label-db" v-if="item.post.servicetype=='db'">镜像系统：</span>
                        <span class="label-db" v-else>系统：</span>
                        <Cascader class="systemw" :data="item.systemList" v-model="item.system"></Cascader>
                      </div>
                      <!-- <div class="price">
                        价格：¥
                        <span>{{0+'/'}}</span>
                        {{monthD(item.post.days)}}
                      </div>-->
                      <div class="price">
                        保证金：¥
                        <span>{{item.price}}</span>
                        /{{monthD(item.post.days)}}
                      </div>
                      <div class="origin-price line-thr">
                        原价：¥
                        <span>{{item.originPrice}}</span>
                      </div>
                      <div class="btns" v-if="item.post.freeddeposit==1">
                        <Button @click="pushOrderFree(item,'p')" class="pc-640">做任务 免费领</Button>
                        <Button @click="pushOrderFree(item,'m')" class="mobile-640">做任务 免费领</Button>
                      </div>
                      <div class="btns" v-else>
                        <Button @click="pushOrderD(item,'p')" class="pc-640">免费领取</Button>
                        <Button @click="pushOrderD(item,'m')" class="mobile-640">免费领取</Button>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="tips" style="margin-bottom:20px;">
                  新用户专享，为防止恶意刷抢免费云资源，遂需缴纳保证金，保证金随时可退
                  <span
                    class="blue"
                    @click="showModal.rule=true"
                  >活动规则></span>
                </div>
                <div class="flex-col dotask">
                  <!-- 温馨提示：使用期间若到“百度口碑”发布使用体验等相关评论，截图联系发送至在线客服，可领取满200减100优惠券
                  <a
                    href="https://koubei.baidu.com/s/510a4f5f6316c2d0f81b3e63bc75b537?fr=search"
                    target="blank"
                    style="text-decoration: underline;"
                  >点击发布评论></a>-->
                  <div>
                    <img src="../../../assets/img/active/deposit/dotask.png" alt="做任务文字图标" />
                  </div>
                  <div class="tips">
                    <p style="margin-bottom:4px">
                      1.关注新睿云微信公众号，将活动图片保存分享并发送内容：“我正在申请参与新睿云的免费云服务器活动，大家一起来参与吧！”至朋友圈，截图发送给我们即可领取“免保证金”云服务器
                      <span
                        class="blue pc-640-inline"
                        @click="pushOrderFree(0,'p')"
                      >上传截图></span>
                      <span class="blue mobile-640-inline" @click="pushOrderFree(0,'m')">上传截图></span>
                    </p>
                    <p>
                      2.使用“免保证金”云服务器10天后并在使用期内去“百度口碑”发布真实的使用体验等相关评论，并截图发送给我们，该2核4G的云服务器可延长1个月免费使用期。<span style="color:#e70520">抄袭其他用户体验的评论将取消延长使用的资格</span>
                      <a
                        href="https://koubei.baidu.com/s/510a4f5f6316c2d0f81b3e63bc75b537?fr=search"
                        target="blank"
                      >发布评论></a>
                      <span class="blue pc-640-inline" @click="uploadBaidu('p')">上传截图></span>
                      <span class="blue mobile-640-inline" @click="uploadBaidu('m')">上传截图></span>
                    </p>
                  </div>
                </div>
                <div class="renew">
                  <div class="head-g">
                    <img src="../../../assets/img/active/deposit/num1.png" alt="数字1" />
                    <div>
                      <h3>续费尊享 看看你能省多少</h3>
                      <p>
                        <span @click="showModal.ruleHost=true" style="cursor:pointer">活动规则></span>
                      </p>
                    </div>
                  </div>
                  <div class="content">
                    <div v-for="(item,index) in renewHostList" :key="index" class="item">
                      <div class="icon-bg">
                        <div class="icon-text">{{item.text}}</div>
                      </div>
                      <h4>{{item.cpu+'核'+item.memery+'G云服务器'}}</h4>
                      <div class="box">
                        <div class="left">
                          <div class="row">
                            <i>系统盘</i>
                            <div>
                              <span class="bold">{{item.ssd}}G SSD</span>
                            </div>
                          </div>
                          <div class="row">
                            <i>带宽</i>
                            <div>
                              <RadioGroup
                                v-model="item.bandwidth"
                                type="button"
                                v-if="item.bandwidth!=5"
                                @on-change="changeBandwith(item.bandwidth,item)"
                              >
                                <Radio
                                  v-for="(item1,index) in item.bandwidthList"
                                  :key="index"
                                  :label="item1"
                                >{{item1}}M</Radio>
                              </RadioGroup>
                              <span class="bold" v-else>{{item.bandwidth}}M</span>
                            </div>
                          </div>
                          <div class="row">
                            <i>续费时长</i>
                            <div>
                              <Select
                                v-model="item.time"
                                style="width:200px"
                                @on-change="getRenewPrice(item)"
                              >
                                <Option
                                  v-for="item1 in item.timeList"
                                  :value="item1"
                                  :key="item1"
                                >{{ renewtime(item1) }}</Option>
                              </Select>
                            </div>
                          </div>
                        </div>
                        <div class="right">
                          <div class="row">
                            <i>续费价：</i>
                            <div>
                              <span>¥{{item.price}}</span>
                            </div>
                          </div>
                          <div class="row">
                            <i>原价：¥{{item.originPrice}}</i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="update">
                  <div class="head-g">
                    <img src="../../../assets/img/active/deposit/num2.png" alt="数字2" />
                    <div>
                      <h3>升级配置 立享优惠</h3>
                      <p>
                        已参与免费领云产品的用户，升级云服务器配置或带宽即可享受优惠
                        <span
                          @click="showModal.ruleCoupon=true"
                          style="cursor:pointer"
                        >活动规则></span>
                      </p>
                    </div>
                  </div>
                  <div class="content">
                    <div v-for="(item,index) in updateList" :key="index">
                      <h4>{{item.name}}</h4>
                      <div class="box">
                        <div v-for="(item1,index) in item.configs" :key="index" class="item">
                          <div>
                            <span class="icon">升至</span>
                            {{item1.params}}
                          </div>
                          <p>
                            立享
                            <span>{{item1.discount}}</span>
                            折优惠
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="low-discount" v-show="currentView=='child2'">
              <div class="wrap-inner">
                <div class="product">
                  <div v-for="(item,index) in hostlist5" :key="index">
                    <div class="head">
                      <div class="icon-bg" v-if="item.cpu==4&&item.mem==8">
                        <div class="icon-text">爆款</div>
                      </div>
                      <h3 v-if="item.bandWidthList.length>1">云服务器{{item.cpu}}核{{item.mem}}G</h3>
                      <h3 v-else>云服务器{{item.bandwith}}M带宽</h3>
                    </div>
                    <div class="body">
                      <div v-if="item.configList.length>1">
                        <span class="label">配置：</span>
                        <Select class="select-w" v-model="item.cpumem" @on-change="getPrice5(item)">
                          <Option
                            v-for="item1 in item.configList"
                            :value="item1.cpu+'#'+item1.mem"
                            :key="item1.cpu+'#'+item1.mem"
                          >{{ item1.cpu+'核'+item1.mem+'G' }}</Option>
                        </Select>
                      </div>
                      <div v-if="item.bandWidthList.length>1">
                        <span class="label">带宽：</span>
                        <Select
                          class="select-w"
                          v-model="item.bandwith"
                          @on-change="getPrice5(item)"
                        >
                          <Option
                            v-for="item1 in item.bandWidthList"
                            :value="item1"
                            :key="item1"
                          >{{ item1 }}M</Option>
                        </Select>
                      </div>
                      <div>
                        <span class="label">区域：</span>
                        <Select
                          class="select-w"
                          v-model="item.zoneId"
                          @on-change="changeZone5(item)"
                        >
                          <Option
                            v-for="item1 in zoneList5"
                            :value="item1.value"
                            :key="item1.value"
                          >{{ item1.name }}</Option>
                        </Select>
                      </div>
                      <div>
                        <span class="label">系统：</span>
                        <Cascader class="select-w" :data="item.systemList" v-model="item.system"></Cascader>
                      </div>
                      <div class="time">
                        <span class="label">时长：</span>
                        <i
                          v-if="item.timeList.length<2"
                          style="font-style:normal;"
                        >{{monthL(item.days)}}</i>
                        <ul v-else>
                          <li
                            v-for="(item1,index1) in item.timeList"
                            :key="index1"
                            :class="{'selected':item.days==item1}"
                            @click="timeSelect(item,item1)"
                            style="margin-bottom:0"
                          >{{monthL(item1)}}</li>
                        </ul>
                      </div>
                      <div class="price">
                        {{item.days==7?'7天体验价':'价格'}}：￥
                        <span>{{item.price}}</span>
                      </div>
                      <Button @click="pushOrder5(item,'p')" class="pc-640">立即抢购</Button>
                      <Button @click="pushOrder5(item,'m')" class="mobile-640">立即抢购</Button>
                    </div>
                  </div>
                  <div v-for="(item,index) in allList" :key="index+5">
                    <div class="head">
                      <div
                        class="icon-bg"
                        v-if="item.post.cpu==4&&item.post.bandwith==10&&item.post.mem==8"
                      >
                        <div class="icon-text">爆款</div>
                      </div>
                      <h3 v-if="item.post.servicetype!='ticket'">
                        {{titleL(item)}}
                        <span>{{item.post.cpu+'核'+item.post.mem+'G'}}</span>
                      </h3>
                      <h3 v-else>{{item.post.ticketDescript}}</h3>
                    </div>
                    <div class="body" v-if="item.post.servicetype!='ticket'">
                      <div>
                        <span class="label">带宽：</span>
                        {{item.post.bandwith}}M
                      </div>
                      <div
                        v-if="item.post.servicetype=='G5500'"
                        style="margin-top:-20px;margin-bottom:0px;"
                      >
                        <span class="label">配置：</span>
                        {{item.post.gpusize}}* NVIDIA P100
                      </div>
                      <div>
                        <span class="label">区域：</span>
                        <Select
                          class="select-w"
                          v-model="item.zoneId"
                          @on-change="changeZoneL(item)"
                        >
                          <Option
                            v-for="item1 in item.zoneList"
                            :value="item1.value"
                            :key="item1.value"
                          >{{ item1.name }}</Option>
                        </Select>
                      </div>
                      <div>
                        <span class="label">系统：</span>
                        <Cascader class="select-w" :data="item.systemList" v-model="item.system"></Cascader>
                      </div>
                      <div class="time">
                        <span class="label">时长：</span>
                        <i
                          v-if="item.postArr.length<2"
                          style="font-style:normal;"
                          :style="{marginBottom:item.post.servicetype=='G5500'?'0px':'12px'}"
                        >{{monthL(item.post.days)}}</i>
                        <ul v-else>
                          <li
                            v-for="(item1,index1) in item.postArr"
                            :key="index1"
                            :class="{'selected':item.post.days==item1.days}"
                            @click="changgeTimeL(item,item1)"
                          >
                            {{monthL(item1.days)}}
                            <!-- <span>{{item1.discount}}折</span> -->
                          </li>
                        </ul>
                      </div>
                      <div class="price">
                        {{item.post.days==7?'7天体验价':'价格'}}：￥
                        <span>{{item.price}}</span>
                      </div>
                      <Button @click="pushOrderL(item,'p')" class="pc-640">立即抢购</Button>
                      <Button @click="pushOrderL(item,'m')" class="mobile-640">立即抢购</Button>
                    </div>
                    <div class="body coupen" v-else>
                      <div style="margin-bottom:5px;" v-if="item.post.useType == 7">
                        <span class="label" style="width:70px">抵扣金额：</span>
                        <i style="font-style:normal;color:#FF392A">{{item.post.money}}元</i>
                      </div>
                      <div style="margin-bottom:5px;">
                        <span class="label" style="width:70px">使用条件：</span>
                        <i style="font-style:normal;color:#FF392A">{{item.post.userCondition}}</i>
                      </div>
                      <div>
                        <span class="label" style="width:70px">使用方法：</span>
                        <div>{{item.post.useMethod}}</div>
                      </div>
                      <div style="margin-bottom:25px;">
                        <span class="label" style="width:70px">使用时间：</span>
                        <div>自领取之日{{item.post.expday/30}}个月内使用</div>
                      </div>
                      <div v-if="item.post.useType == 9" style="height:22px;"></div>
                      <Button @click="pushOrderL(item,'p')" class="pc-640">立即抢购</Button>
                      <Button @click="pushOrderL(item,'m')" class="mobile-640">立即抢购</Button>
                    </div>
                  </div>
                  <div v-for="(item,index) in gpuList" :key="index+8">
                    <div class="head">
                      <h3>GPU云服务器{{item.cpu}}核{{item.mem}}G</h3>
                    </div>
                    <div class="body gpu-body">
                      <div style="margin-bottom:5px;">
                        <span class="label">带宽：</span>
                        <Select
                          class="select-w"
                          v-model="item.bandwith"
                          @on-change="getPriceGpu(item)"
                        >
                          <Option
                            v-for="item1 in item.arr"
                            :value="item1.bandwith"
                            :key="item1.bandwith"
                          >{{ item1.bandwith }}M</Option>
                        </Select>
                      </div>
                      <div
                      >
                        <span class="label">配置：</span>
                        {{item.gpusize}}* NVIDIA P100
                      </div>
                      <div>
                        <span class="label">区域：</span>
                        <Select
                          class="select-w"
                          v-model="item.zoneId"
                          @on-change="changeZonegpu(item)"
                        >
                          <Option
                            v-for="item1 in zoneListgpu"
                            :value="item1.value"
                            :key="item1.value"
                          >{{ item1.name }}</Option>
                        </Select>
                      </div>
                      <div>
                        <span class="label">系统：</span>
                        <Cascader class="select-w" :data="item.systemList" v-model="item.system"></Cascader>
                      </div>
                      <div class="time">
                        <span class="label">时长：</span>
                        <i
                          style="font-style:normal;"
                        >{{item.days}}天</i>
                      </div>
                      <div class="price">
                        {{item.days==7?'7天体验价':'价格'}}：￥
                        <span>{{item.price}}</span>
                      </div>
                      <Button @click="pushOrder5(item,'p')" class="pc-640">立即抢购</Button>
                      <Button @click="pushOrder5(item,'m')" class="mobile-640">立即抢购</Button>
                    </div>
                  </div>
                  <div v-for="(item,index) in coupenList" :key="index+9">
                    <div class="head">
                      <h3>{{item.post.ticketDescript}}</h3>
                    </div>
                    <div class="body coupen">
                      <div style="margin-bottom:5px;" v-if="item.post.useType == 7">
                        <span class="label" style="width:70px">抵扣金额：</span>
                        <i style="font-style:normal;color:#FF392A">{{item.post.money}}元</i>
                      </div>
                      <div style="margin-bottom:5px;">
                        <span class="label" style="width:70px">使用条件：</span>
                        <i style="font-style:normal;color:#FF392A">{{item.post.userCondition}}</i>
                      </div>
                      <div>
                        <span class="label" style="width:70px">使用方法：</span>
                        <div>{{item.post.useMethod}}</div>
                      </div>
                      <div style="margin-bottom:25px;">
                        <span class="label" style="width:70px">使用时间：</span>
                        <div>自领取之日{{item.post.expday/30}}个月内使用</div>
                      </div>
                      <div v-if="item.post.useType == 9" style="height:22px;"></div>
                      <Button @click="pushOrderL(item,'p')" class="pc-640">立即抢购</Button>
                      <Button @click="pushOrderL(item,'m')" class="mobile-640">立即抢购</Button>
                    </div>
                  </div>
                </div>
                <div class="tips">
                  *以上配置GPU云服务器为128G系统盘，其他弹性云服务器均为40G SSD系统盘。
                  <span
                    @click="showModal.dayHost=true"
                    class="blue"
                  >活动规则></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="summary-host">
      <div class="wrap">
        <div class="headline">
          <h2>云服务器大集合</h2>
          <p>你想要的云服务器都在这里</p>
        </div>
        <div class="product">
          <div>
            <div class="head">
              <h3>云服务器/GPU服务器</h3>
            </div>
            <div class="body">
              <div class="left">
                <RadioGroup v-model="single" size="large" style="width:100%;">
                  <Radio label="选择云服务器" style="color:#4768B1;margin-bottom:20px;font-size:18px;"></Radio>
                  <div class="configure">
                    <ul>
                      <li
                        v-for="(item,index) in configureList"
                        :key="index"
                        :class="{'selected':selectConfig==item.cpu+','+item.mem}"
                        @click="changConfigHost(item.cpu+','+item.mem)"
                        v-if="!((hideconfig&&item.cpu==64&&item.mem==256)||(hideconfig&&item.cpu==32&&item.mem==64))"
                      >{{ item.cpu+'核'+item.mem+'G'}}</li>
                    </ul>
                    <span class="tips">*以上配置皆包含40G SSD系统盘</span>
                  </div>
                  <Radio
                    label="选择GPU服务器"
                    style="color:#4768B1;margin-top:40px;margin-bottom:20px;font-size:18px;"
                  ></Radio>
                  <div ref="summary-host-select">
                    <Select v-model="selectConfig" placeholder=" " @on-change="changConfigGPU">
                      <Option
                        v-for="(item,index) in gpuConfigList"
                        :value="item.cpu+','+item.mem+','+item.num"
                        :key="index"
                      >{{ item.cpu+'核'+item.mem+'G'+item.num+' *NVIDIA_P100' }}</Option>
                    </Select>
                  </div>
                </RadioGroup>
                <div class="area" v-if="configLength==2">
                  <span class="label">区域选择</span>
                  <ul>
                    <li
                      v-for="(item,index) in hostZoneList"
                      :key="index"
                      :class="{'selected':selectZone==item.zoneid}"
                      @click="changzone(item,item.zonename)"
                    >{{item.zonename}}</li>
                  </ul>
                </div>
                <div class="area" v-else>
                  <span class="label">区域选择</span>
                  <ul>
                    <li
                      v-for="(item,index) in gpuZoneList"
                      :key="index"
                      :class="{'selected':selectZone==item.zoneid}"
                      @click="changzone(item)"
                    >{{item.zonename}}</li>
                  </ul>
                </div>
              </div>
              <div class="right">
                <div>
                  <span class="label">带宽选择</span>
                  <Select v-model="selectBandWidth">
                    <Option v-for="item in bandWidthList" :value="item" :key="item">{{item}}M</Option>
                  </Select>
                </div>
                <div>
                  <span class="label">系统选择</span>
                  <Cascader :data="summarySystemList" v-model="selectSummarySystem"></Cascader>
                </div>
                <div class="ssd">
                  <span class="label">SSD数据盘</span>
                  <ul>
                    <li
                      v-for="(item,index) in ssdList"
                      :key="index"
                      :class="{'selected':selectedSSD==item}"
                      @click="selectedSSD=item"
                    >{{item}}G</li>
                  </ul>
                </div>
                <div>
                  <span class="label">购买时长</span>
                  <Select v-model="selectTime">
                    <Option
                      v-for="(item,index) in hostTimeList"
                      :value="item"
                      :key="index"
                    >{{item<12?item+'月':item/12+'年'}}</Option>
                  </Select>
                </div>
                <div>
                  <span class="label">购买数量</span>
                  <InputNumber :max="10" :min="1" v-model="count"></InputNumber>
                </div>
                <div class="price">
                  ￥
                  <span>{{(totalDataCost*count).toFixed(2)}}</span>
                </div>
                <Button @click="pushOrderHost('p')" v-if="configLength==2" class="pc-640">立即购买</Button>
                <Button @click="pushOrderGpu('p')" v-else class="pc-640">立即购买</Button>
                <Button @click="pushOrderHost('m')" v-if="configLength==2" class="mobile-640">立即购买</Button>
                <Button @click="pushOrderGpu('m')" v-else class="mobile-640">立即购买</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 活动规则 -->
    <transition name="fade">
      <div class="overlay" @click.stop="showModal.rule=true" v-if="showModal.rule">
        <div class="rule-modal" style="max-height: 80%;overflow-y: auto;">
          <div class="header">
            <span>活动规则</span>
            <img src=../../../assets/img/active/freeToReceive.1/close-icon.png alt="关闭图标" @click.stop="showModal.rule=false">
          </div>
          <div class="body">
            <p>1、活动时间：2019年9月6日开始，总量有限，先到先得！</p>
            <p>2、活动对象：新注册或者一直未使用过平台资源（第三方产品除外）及未参加过其他免费活动并已通过实名认证的用户。</p>
            <dl>
              <dt>3、活动内容：</dt>
              <dd>（1）活动产品需充值对应的保证金后方可使用；云服务器未到期可自行删除，删除后或者云服务器使用到期后，用户可解冻保证金。</dd>
              <dd>（2）若您需要续费保证金云服务器，可选择在云服务器未到期之前将保证金转换为云服务器续费费用，续费后云服务器最长可使用3年。</dd>
            </dl>
            <p>4、解冻操作流程：进入控制台，点击右上角用户名，选择【费用中心】，在账户概览中点击【历史冻结记录】，在弹出的弹窗中选择需要解冻的保证金，点击【申请解冻】，根据弹窗提示完成操作。</p>
            <dl>
              <dt>5、活动规则：</dt>
              <dd>（1）每个用户只能参与一次，同一手机号对应的多个账号、同一实名认证用户等满足同一条件的均视为一个用户。</dd>
              <dd>（2）免费产品中的资源可随时进行升级，升级费用按新睿云标准收费进行收取。</dd>
              <dd>（3）在各产品免费使用期间，若对免费资源进行了销毁，则视为放弃免费使用权。</dd>
              <dd>（4）因押金主机为免费产品，暂不支持备案，若您需要备案可执行押金转续费操作，或者购买包年包月主机及IP之后进行备案。</dd>
            </dl>
            <p>6、活动声明：为保证活动的公平公正，新睿云有权对恶意刷抢（如通过程序等技术手段）活动资源；领取后3天内未使用资源；利用资源从事违法违规行为；因用户主机遭受DDOS攻击而给平台方带来损失的用户，收回免费套餐使用资格。因此造成任何损失的，由该用户自行负责。</p>
            <p>
              7、请注意：在未支付订单情况下，系统会对您的资格造成误判，需要您将账号下未支付订单作废后，即可正常参与。
              <a
                href="https://i.xinruiyun.cn/expenses"
                style="color:#2A99F2"
              >去订单管理</a>
            </p>
          </div>
          <div class="footer">
            <span @click.stop="showModal.rule=false">知道了</span>
          </div>
        </div>
      </div>
    </transition>
    <!-- 活动规则 -->
    <transition name="fade">
      <div class="overlay" @click.stop="showModal.ruleHost=true" v-if="showModal.ruleHost">
        <div class="rule-modal">
          <div class="header">
            <span>活动规则</span>
            <img src=../../../assets/img/active/freeToReceive.1/close-icon.png alt="关闭图标" @click.stop="showModal.ruleHost=false">
          </div>
          <div class="body">
            <p>1、活动时间：2019年9月6日开始。</p>
            <p>2、活动对象：已参与免费活动的用户。</p>
            <dl>
              <dt>3、活动内容：</dt>
              <dd>（1）若免费产品快到期时后期不再使用，将删除资源或者云服务器使用到期后，用户可解冻保证金。</dd>
              <dd>（2）若您需要续费保证金云服务器，可选择在云服务器未到期之前将保证金转换为云服务器续费费用，续费后云服务器最长可使用3年。</dd>
              <dd>（3）续费金额将按照选择的时间进行保证金抵扣续费。</dd>
              <dd>（4）保证金转续费时间说明：续费时间根据用户到期后加上续费的日期，不影响免费的使用时长。</dd>
            </dl>
            <p>4、此次活动产品不能用于转售，如若利用资源从事违法违规行为的用户，新睿云有权收回使用资格，并且不予退款。</p>
            <p>
              5、请注意：在未支付订单情况下，系统会对您的资格造成误判，需要您将账号下未支付订单作废后，即可正常参与。
              <a
                href="https://i.xinruiyun.cn/expenses"
                style="color:#2A99F2"
              >去订单管理</a>
            </p>
            <p>6、活动最终解释权为新睿云所有。</p>
          </div>
          <div class="footer">
            <span @click.stop="showModal.ruleHost=false">知道了</span>
          </div>
        </div>
      </div>
    </transition>
    <!-- 活动规则 -->
    <transition name="fade">
      <div class="overlay" @click.stop="showModal.ruleCoupon=true" v-if="showModal.ruleCoupon">
        <div class="rule-modal">
          <div class="header">
            <span>活动规则</span>
            <img src=../../../assets/img/active/freeToReceive.1/close-icon.png alt="关闭图标" @click.stop="showModal.ruleCoupon=false">
          </div>
          <div class="body">
            <p>1、活动时间：2019年9月6日开始。</p>
            <p>2、活动对象：已参与免费活动的用户。</p>
            <p>3、数量限制：每个用户限领取一次，有效期为1年。</p>
            <p>4、配置升级说明：参与免费用1年的用户在升级CPU及带宽后，需要到期后才能退换保证金，不能提前退还，升级费用不予退款。</p>
            <p>5、活动最终解释权为新睿云所有。</p>
          </div>
          <div class="footer">
            <span @click.stop="showModal.ruleCoupon=false">知道了</span>
          </div>
        </div>
      </div>
    </transition>
    <!-- 活动规则 -->
    <transition name="fade">
      <div class="overlay" @click.stop="showModal.dayHost=true" v-if="showModal.dayHost">
        <div class="rule-modal">
          <div class="header">
            <span>活动规则</span>
            <img src=../../../assets/img/active/freeToReceive.1/close-icon.png alt="关闭图标" @click.stop="showModal.dayHost=false">
          </div>
          <div class="body">
            <p>1、活动时间：2019年9月6日开始，总量有限，先到先得！</p>
            <p>2、平台已完成实名认证的新老用户。</p>
            <p>3、数量限制：活动期间同一用户（同一手机、邮箱、实名认证用户视为同一用户）按照不同的配置进行按需购买，同配置产品可以同时购买不同时长，每款配置同一时长限购3台。数量有限，先到先得（实名认证后每个用户云服务器最多可拥有7台）。</p>
            <p>4、参与本次活动购买的产品不支持退款。</p>
            <p>5、此次活动产品不能用于转售，如若利用资源从事违法违规行为的用户，新睿云有权收回使用资格，并且不予退款。</p>
            <p>6、购买时不可使用任何优惠券和现金券，特惠产品不支持会员折扣。</p>
            <p>7、域名无门槛抵扣券每次只能使用1张，有效期为1个月；续费&升级券也是每次只能使用1张，有效期为1年。此次活动券仅用于支付新睿云平台订单支付时，抵减应支付的订单金额，不能进行兑现或其他用途。</p>
            <p>
              8、请注意：在未支付订单情况下，系统会对您的资格造成误判，需要您将账号下未支付订单作废后，即可正常参与。
              <a
                href="https://i.xinruiyun.cn/expenses"
                style="color:#2A99F2"
              >去订单管理</a>
            </p>
            <p>6、活动最终解释权为新睿云所有。</p>
          </div>
          <div class="footer">
            <span @click.stop="showModal.dayHost=false">知道了</span>
          </div>
        </div>
      </div>
    </transition>
    <!-- 领取提示 -->
    <Modal v-model="showModal.rechargeHint" :scrollable="true" :closable="false" :width="390">
      <div class="modal-content-s" style="padding: 30px 30px 0 50px">
        <div>
          <div
            class="ivu-modal-confirm-body-icon ivu-modal-confirm-body-icon-success"
            style="top: 48px;left: 30px;"
          >
            <i class="ivu-icon ivu-icon-checkmark-circled"></i>
          </div>
          <strong>提示</strong>
          <p class="lh24">
            本免费活动充值保证金
            <span style="color: #D0021B ">{{ cashPledge }}</span>元，云服务器到期或删除时保证金自动退还到账户余额。
          </p>
        </div>
      </div>
      <p slot="footer" class="modal-footer-s">
        <Button @click="showModal.rechargeHint = false">取消</Button>
        <Button type="primary" @click="nextStep('p')" class="pc-640-inline">下一步</Button>
        <Button type="primary" @click="nextStep('m')" class="mobile-640-inline">下一步</Button>
      </p>
    </Modal>
    <!-- 不满足条件-->
    <Modal v-model="showModal.inConformityModal" :scrollable="true" :closable="false" :width="390">
      <div class="modal-content-s" style="padding: 30px 30px 0 50px">
        <div>
          <div
            class="ivu-modal-confirm-body-icon ivu-modal-confirm-body-icon-warning"
            style="top: 48px;left: 30px;"
          >
            <i class="ivu-icon ivu-icon-android-alert"></i>
          </div>
          <p class="lh24">{{inConformityModalMsg}}您还可以去看看其他活动。</p>
        </div>
      </div>
      <p slot="footer" class="modal-footer-s">
        <Button @click="showModal.inConformityModal = false">取消</Button>
        <Button type="primary" @click="$router.push('/')">现在就去</Button>
      </p>
    </Modal>
    <!-- 领取成功 -->
    <Modal v-model="showModal.getSuccessModal" :scrollable="true" :closable="false" :width="390">
      <div class="modal-content-s" style="padding: 30px 30px 0 50px">
        <div>
          <div
            class="ivu-modal-confirm-body-icon ivu-modal-confirm-body-icon-success"
            style="top: 48px;left: 30px;"
          >
            <i class="ivu-icon ivu-icon-checkmark-circled"></i>
          </div>
          <strong>提示</strong>
          <p class="lh24">恭喜您保证金已冻结完成，云服务器领取成功，云服务器在实名认证之前只可保留3天，请尽快使用。</p>
        </div>
      </div>
      <p slot="footer" class="modal-footer-s">
        <Button @click="showModal.getSuccessModal = false">取消</Button>
        <a href="https://i.xinruiyun.cn/host">
          <Button type="primary">查看云服务器</Button>
        </a>
      </p>
    </Modal>
    <!-- 支付充值失败 -->
    <Modal v-model="showModal.payDefeatedModal" width="640" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">支付/充值</span>
      </p>
      <div class="universal-modal-content-flex">
        <div class="modal-p">
          <Steps :current="2" status="error">
            <Step title="订单确认"></Step>
            <Step title="支付"></Step>
            <Step title="支付失败"></Step>
          </Steps>
          <p>
            <img src="../../../assets/img/sceneInfo/si-defeated.png" alt="支付失败" />
            <span>抱歉，支付失败，请再次尝试！</span>
          </p>
        </div>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button
          type="primary"
          @click="showModal.payDefeatedModal = false,showModal.orderConfirmationModal = true"
        >再次支付</Button>
      </div>
    </Modal>
    <!-- 支付充值成功 -->
    <Modal
      v-model="showModal.paySuccessModal"
      width="640"
      :scrollable="true"
      :closable="false"
      :mask-closable="false"
    >
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">支付/充值</span>
      </p>
      <div class="universal-modal-content-flex">
        <div class="modal-p">
          <Steps :current="2">
            <Step title="订单确认"></Step>
            <Step title="支付"></Step>
            <Step title="支付成功"></Step>
          </Steps>
          <p>
            <img src="../../../assets/img/sceneInfo/si-success.png" alt="支付成功" />
            <span>恭喜您支付成功！我们即将冻结保证金</span>
            <span style="color: #D0021B;margin-left: 0">{{ cashPledge }}</span>
            <span style="margin-left: 0">元</span>
          </p>
        </div>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="primary" @click="getFreeHost">确认冻结</Button>
      </div>
    </Modal>

    <!-- 微信支付弹窗 -->
    <Modal
      v-model="showModal.weChatRechargeModal"
      width="640"
      :scrollable="true"
      :mask-closable="false"
    >
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">微信支付/充值</span>
      </p>
      <div class="universal-modal-content-flex">
        <div class="modal-p">
          <Steps :current="1">
            <Step title="订单确认"></Step>
            <Step title="支付"></Step>
            <Step title="支付成功"></Step>
          </Steps>
          <div class="payInfo">
            <div id="code">
              <vue-q-art :config="config" v-if="config.value!=''"></vue-q-art>
            </div>
            <div class="pay-p">
              <p>
                应付金额(元)：
                <span>{{cashPledge}}</span>
              </p>
              <p>请使用微信扫一扫，扫描二维码支付</p>
            </div>
          </div>
        </div>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button @click="isPay">已完成支付</Button>
        <Button
          type="primary"
          @click="showModal.weChatRechargeModal = false,showModal.orderConfirmationModal = true"
        >更换支付方式</Button>
      </div>
    </Modal>

    <!-- 订单确认弹窗 -->
    <Modal
      v-model="showModal.orderConfirmationModal"
      width="640"
      :scrollable="true"
      :mask-closable="false"
    >
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">订单确认</span>
      </p>
      <div>
        <div class="modal-p">
          <Steps :current="0">
            <Step title="订单确认"></Step>
            <Step title="支付"></Step>
            <Step title="支付成功"></Step>
          </Steps>
        </div>
        <Table :columns="orderColumns" :data="orderData" style="margin-top: 30px"></Table>
        <div class="pay-wap">
          <p>选择支付方式</p>
          <RadioGroup v-model="payWay" vertical @on-change="payWayChange">
            <Radio label="balancePay">
              <span style="color:rgba(51,51,51,1);font-size: 14px;margin-right: 40px">余额支付</span>
              <span style="color:rgba(102,102,102,1);font-size: 14px">账户余额：</span>
              <span style="color:#D0021B;font-size: 14px">¥{{ balance }}</span>
            </Radio>
            <Radio label="otherPay" class="pw-img" :disabled="balance >= cashPledge">
              <span style="color:rgba(51,51,51,1);font-size: 14px;margin-right: 25px">第三方支付</span>
              <img
                src="../../../assets/img/payresult/alipay.png"
                :class="{selected: otherPayWay == 'zfb'}"
                @click="balance < cashPledge?otherPayWay = 'zfb':null"
                alt="支付宝"
              />
              <img
                src="../../../assets/img/payresult/wxpay.png"
                :class="{selected: otherPayWay == 'wx'}"
                @click="balance < cashPledge?otherPayWay = 'wx':null"
                alt="微信"
              />
            </Radio>
          </RadioGroup>
        </div>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="primary" @click="getHost_ok">确认</Button>
      </div>
    </Modal>
    <!-- 身份验证弹窗 -->
    <Modal
      v-model="showModal.cashverification"
      :scrollable="true"
      :closable="true"
      :width="520"
      :mask-closable="false"
      class="person-check"
    >
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">身份验证</span>
      </p>
      <div class="modal-content-s">
        <div>
          <p
            class="lh24"
            style="font-size:14px;font-family:MicrosoftYaHei;color:rgba(51,51,51,1);line-height:24px;"
          >为保障您的账户安全，请进行手机验证：</p>
        </div>
      </div>
      <div class="modal-content-s">
        <Form
          ref="cashverification"
          label-position="left"
          :model="formCustom"
          :rules="ruleCustom"
          style="width: 500px;"
        >
          <FormItem prop="VerificationPhone">
            <Input v-model="formCustom.VerificationPhone" placeholder="请输入手机号码" class="w300"></Input>
          </FormItem>
          <FormItem prop="Verificationcode">
            <Input v-model="formCustom.Verificationcode" placeholder="请输入随机验证码" class="w300"></Input>
            <img
              :src="imgSrc"
              @click="imgSrc=`user/getKaptchaImage.do?t=${new Date().getTime()}`"
              style="height:32px;vertical-align: middle;margin-left: 10px;"
            />
          </FormItem>
          <FormItem prop="messagecode">
            <Input v-model="formCustom.messagecode" placeholder="请输入收到的验证码" class="w300"></Input>
            <Button
              type="primary"
              @click="getPhoneCode('code')"
              :disabled="formCustom.newCodeText !='获取验证码'"
              style="margin-left: 10px;"
            >{{formCustom.newCodeText}}</Button>
          </FormItem>
        </Form>
      </div>
      <div class="modal-content-s divall">
        <div
          style="width: 91%;margin-left: 4%;margin-top: 10px;font-size: 14px;margin-bottom: 20px;"
        >
          <p style="float: left;line-height:24px;">没有收到验证码？</p>
          <br />
          <p style="line-height:24px;">
            1、网络异常可能会造成短信丢失，请
            <span
              class="spanaa"
              :class="{notallow:formCustom.newCodeText !='获取验证码'}"
              @click="getPhoneCode('againCode')"
            >重新获取</span>或
            <span
              class="spanaa"
              :class="{notallow:formCustom.newCodeText !='获取验证码'}"
              @click.prevent="getPhoneCode('voice')"
            >接收语音验证码</span>。
          </p>
          <p v-if="authInfo&&authInfo.checkstatus==0" style="line-height:24px;">
            2、如果手机已丢失或停机，请
            <span
              class="spanaa"
              @click="showModal.modifyPhoneID = true;showModal.cashverification=false"
            >通过身份证号码验证</span>或
            <a href="https://i.xinruiyun.cn/work">提交工单</a>更改手机号。
          </p>
          <p v-if="!authInfo||authInfo&&authInfo.checkstatus!=0" style="line-height:24px;">
            2、如果手机已丢失或停机，请
            <a href="https://i.xinruiyun.cn/work">提交工单</a>或
            <a
              target="_blank"
              :href="`tencent://message/?uin=${$store.state.qq.qqnumber}&amp;Site=www.cloudsoar.com&amp;Menu=yes`"
              class="spanaa"
              style="font-size: 13px;"
            >联系客服</a>更改手机号。
          </p>
        </div>
      </div>
      <p slot="footer" class="modal-footer-s">
        <Button @click="showModal.cashverification = false">取消</Button>
        <Button type="primary" :disabled="disabled" @click="Callpresentation">确定</Button>
      </p>
    </Modal>
    <!-- 人脸识别二维码弹出框 -->
    <Modal
      v-model="showModal.qrCode"
      width="550"
      :scrollable="true"
      :mask-closable="false"
      :closable="false"
    >
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">扫码认证</span>
      </p>
      <div class="universal-modal-content-flex qrcode-modal">
        <p class="p-top">认证完成之前，请勿关闭或者切换此页面，否则可能导致认证失败</p>
        <p>请使用手机扫描二维码，并根据提示完成实名认证</p>
        <p v-show="authStatus" class="p-top">您的实名认证提交失败，请刷新二维码重新认证</p>
        <div class="qr-code">
          <vue-q-art :config="qrConfig"></vue-q-art>
          <div
            class="shade"
            :class="{scanSuccess: codeLoseEfficacy=== 'scanSuccess'}"
            v-show="codeLoseEfficacy"
          ></div>
        </div>
        <p class="p-bottom">
          若二维码失效或异常，请
          <span @click="refreshQRCode">刷新</span>
        </p>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="primary" @click="showModal.qrCode = false">确定</Button>
      </div>
    </Modal>
    <Modal v-model="showModal.rechargeHintzfb" :scrollable="true" :closable="false" :width="390">
      <p slot="header" class="modal-header-border">
        <Icon type="android-alert" class="yellow f24 mr10" style="font-size: 20px"></Icon>
        <span class="universal-modal-title">提示</span>
      </p>
      <div class="modal-content-s">
        <div>
          <p class="lh24">请您在新打开的页面进行支付，支付完成前请不要关闭此窗口。</p>
        </div>
      </div>
      <p slot="footer" class="modal-footer-s">
        <Button @click="showModal.rechargeHintzfb = false">支付遇到问题</Button>
        <Button type="primary" @click="isPayzfb">支付完成</Button>
      </p>
    </Modal>
    <!-- 关注微信公众号 -->
    <Modal
      v-model="showModal.wechatShare"
      width="550"
      :scrollable="true"
      :mask-closable="false"
      :closable="false"
    >
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">做任务 得好礼</span>
      </p>
      <div class="wechat-modal">
        <h3>完成以下任务免费领取云服务器：</h3>
        <div class="content">
          <div class="wechat">
            <h4>关注微信公众号并截图</h4>
            <div class="center">
              <img src="../../../assets/img/active/deposit/wechat-qr.png" alt="新睿云二维码" />
            </div>
            <div style="position:relative;height:58px;">
              <div
                class="demo-upload-list"
                v-for="(item,index) in uploadList1"
                :key="index"
                style="position:absolute;top:0;left:0;z-index:1"
              >
                <template v-if="item.status === 'finished'">
                  <img :src="item.url" />
                  <div class="demo-upload-list-cover">
                    <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
                    <Icon type="ios-trash-outline" @click.native="handleRemove(item,'upload1')"></Icon>
                  </div>
                </template>
                <template v-else>
                  <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                </template>
              </div>
              <Upload
                ref="upload1"
                :show-upload-list="false"
                :on-success="handleSuccess1"
                :format="['jpg','gif','png']"
                :max-size="4096"
                :on-format-error="handleFormatError"
                :on-exceeded-size="handleMaxSize"
                type="drag"
                action="https://activity.xinruiyun.cn/file/upFile.do"
                style="display: inline-block;width:58px;position:absolute;top:0;left:0"
              >
                <div style="width: 58px;height:58px;line-height: 58px;color:4a97ee">上传截图</div>
              </Upload>
            </div>
          </div>
          <div class="url">
            <h4>将活动图片保存分享并发送内容：“我正在申请参与新睿云的免费云服务器活动，大家一起来参与吧！”至朋友圈并截图</h4>
            <div class="center">
              <img
                src="../../../assets/img/active/deposit/free-qr.png"
                alt="押金活动二维码"
                style="width:60px;"
              />
            </div>
            <div style="position:relative;height:58px;">
              <div
                class="demo-upload-list"
                v-for="(item,index) in uploadList"
                :key="index"
                style="position:absolute;top:0;left:0;z-index:1"
              >
                <template v-if="item.status === 'finished'">
                  <img :src="item.url" />
                  <div class="demo-upload-list-cover">
                    <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
                    <Icon type="ios-trash-outline" @click.native="handleRemove(item,'upload')"></Icon>
                  </div>
                </template>
                <template v-else>
                  <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                </template>
              </div>
              <Upload
                ref="upload"
                :show-upload-list="false"
                :on-success="handleSuccess"
                :format="['jpg','gif','png']"
                :max-size="4096"
                :on-format-error="handleFormatError"
                :on-exceeded-size="handleMaxSize"
                type="drag"
                action="https://activity.xinruiyun.cn/file/upFile.do"
                style="display: inline-block;width:58px;position:absolute;top:0;left:0"
              >
                <div style="width: 58px;height:58px;line-height: 58px;">上传截图</div>
              </Upload>
            </div>
          </div>
        </div>
        <span>*上传文件支持jpg/png/gif，单个文件最大不超过4MB</span>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button @click="showModal.wechatShare = false">取消</Button>
        <Button type="primary" @click="wechat_submit">提交</Button>
      </div>
    </Modal>
    <!-- 预览图片弹窗 -->
    <Modal title="View Image" v-model="visible" style="position:absolute;z-index:2000">
      <img :src="imgName" v-if="visible" style="width: 100%" />
    </Modal>
    <!-- 发布百度口碑评论 -->
    <Modal
      v-model="showModal.baiducomment"
      width="550"
      :scrollable="true"
      :mask-closable="false"
      :closable="false"
    >
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">做任务 得好礼</span>
      </p>
      <div class="baidu-modal">
        <h3>完成以下任务免费延长1个月使用期：</h3>
        <div class="content">
          <h4 style="width:100%">到“百度口碑”发布使用体验等相关评论通过审核后提交截图”</h4>
          <a
            href="https://koubei.baidu.com/s/510a4f5f6316c2d0f81b3e63bc75b537?fr=search"
            target="blank"
          >点击发布评论></a>
          <div style="position:relative;height:58px;">
            <div
              class="demo-upload-list"
              v-for="(item,index) in uploadList2"
              :key="index"
              style="position:absolute;top:0;left:0;z-index:1"
            >
              <template v-if="item.status === 'finished'">
                <img :src="item.url" />
                <div class="demo-upload-list-cover">
                  <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
                  <Icon type="ios-trash-outline" @click.native="handleRemove(item,'upload2')"></Icon>
                </div>
              </template>
              <template v-else>
                <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
              </template>
            </div>
            <Upload
              ref="upload2"
              :show-upload-list="false"
              :on-success="handleSuccess2"
              :format="['jpg','gif','png']"
              :max-size="4096"
              :on-format-error="handleFormatError"
              :on-exceeded-size="handleMaxSize"
              type="drag"
              action="https://activity.xinruiyun.cn/file/upFile.do"
              style="display: inline-block;width:58px;position:absolute;top:0;left:0"
            >
              <div style="width: 58px;height:58px;line-height: 58px;">上传截图</div>
            </Upload>
          </div>
        </div>
        <span>*上传文件支持jpg/png/gif，单个文件最大不超过4MB</span>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button @click="showModal.baiducomment = false">取消</Button>
        <Button type="primary" @click="baidu_submit">提交</Button>
      </div>
    </Modal>
    <!-- 审核中 -->
    <Modal
      v-model="showModal.checking"
      width="550"
      :scrollable="true"
      :mask-closable="false"
      :closable="false"
    >
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">做任务 得好礼</span>
      </p>
      <div class="check-modal">审核中，请您耐心等待…</div>
      <div slot="footer" class="modal-footer-border">
        <Button @click="showModal.checking = false">关闭</Button>
      </div>
    </Modal>
    <!-- 审核未通过 -->
    <Modal
      v-model="showModal.checkfail"
      width="550"
      :scrollable="true"
      :mask-closable="false"
      :closable="false"
    >
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">做任务 得好礼</span>
      </p>
      <div class="check-modal">
        审核未通过，请重新提交。
        未通过原因：{{failMsg}}。
        如有疑问，请
        <a
          style="text-decoration:underline"
          href="https://im.xrcloud.net/im/question/index.html"
        >联系客服</a>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button
          v-if="failType == 'wechat'"
          type="primary"
          @click="showModal.checkfail = false;showModal.wechatShare = true;"
        >重新提交</Button>
        <Button
          v-else
          type="primary"
          @click="showModal.checkfail = false;showModal.baiducomment = true;"
        >重新提交</Button>
      </div>
    </Modal>
    <!-- 审核通过 -->
    <Modal
      v-model="showModal.checksuccess"
      width="550"
      :scrollable="true"
      :mask-closable="false"
      :closable="false"
    >
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">做任务 得好礼</span>
      </p>
      <div class="check-modal">
        您已领取免费云服务器，您还可以参与
        <span style="color:#4A97EE">到“百度口碑”发布使用体验</span>
        任务，免费延长云服务器1个月使用期。
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button @click="showModal.checksuccess = false">取消</Button>
        <Button type="primary" @click="seeComment()">查看任务</Button>
      </div>
    </Modal>
    <!-- 审核通过，百度评论 -->
    <Modal
      v-model="showModal.baidusuccess"
      width="550"
      :scrollable="true"
      :mask-closable="false"
      :closable="false"
    >
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">做任务 得好礼</span>
      </p>
      <div class="check-modal">您已领取免费延长云服务器1个月使用期，敬请关注其他活动。</div>
      <div slot="footer" class="modal-footer-border">
        <Button @click="showModal.baidusuccess = false">关闭</Button>
      </div>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
import axios from 'axios'
import reg from '../../../util/regExp'
import VueQArt from 'vue-qart'
import $ from 'jquery'
import throttle from 'throttle-debounce/debounce'
export default {
  metaInfo: {
    title: '免费云主机体验试用 -云服务器免费试用可申请1年或30天 - 活动中心 - 新睿云', // set a title
    meta: [{                 // set meta
      name: 'keywords',
      content: '免费云主机,免费云主机试用一年,免费云主机申请,云主机免费体验,云服务器免费,云服务器免费试用,免费云服务器试用一年'
    },
    {                 // set meta
      name: 'description',
      content: '新睿云推出爆款云主机免费试用活动，2款云服务器产品最长免费试用1年，每天随时可领，押金随时可退，2018年8月3日开始，总量有限，先到先得！'
    }]
  },
  data () {
    const validaRegisteredPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('电话号码不能为空'));
      }
      if (!(/^1(3|4|5|7|8|9)\d{9}$/.test(value)) && !(/^0\d{2,3}-?\d{7,8}$/.test(value))) {
        callback(new Error('请输入正确的电话号码'));
      } else {
        callback()
      }
    }
    const validaRegisteredID = (rule, value, callback) => {
      if (!reg.IDCardVail(value)) {
        callback(new Error('请输入正确的身份证号码'));
      } else {
        callback()
      }
    }
    const validaRegisteredName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('联系人不能为空'));
      }
      if ((/[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im.test(value)) || (/[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im.test(value)) || (/\s+/.test(value)) || (/^[0-9]*$/.test(value))) {
        callback(new Error('输入姓名不能包含特殊字符、空格或是纯数字'));
      } else {
        callback()
      }
    }
    return {
      showModal: {
        rechargeHint: false,
        inConformityModal: false,
        getSuccessModal: false,
        payDefeatedModal: false,
        paySuccessModal: false,
        weChatRechargeModal: false,
        orderConfirmationModal: false,
        qrCode: false,
        cashverification: false,
        rule: false,
        ruleHost: false,
        dayHost: false,
        ruleCoupon: false,
        rechargeHintzfb: false,
        wechatShare: false,
        baiducomment: false,
        checking: false,
        checkfail: false,
        checksuccess: false,
        baidusuccess: false
      },
      uploadImg: '',
      uploadImg1: '',
      uploadImg2: '',
      failMsg: '',
      failType: 'wechat',
      hostFree: {},
      imgName: '',
      visible: false,
      uploadList: [
        {
          name: '',
          file: ''
        }
      ],
      // imgName: '',
      // visible: false,
      uploadList1: [
        {
          name: '',
          file: ''
        }
      ],
      uploadList2: [
        {
          name: '',
          file: ''
        }
      ],
      activityNumfree: '',
      vmConfigIdfree: '',
      hintMsg: '',
      qrConfig: {
        value: '',
        imagePath: require('../../../assets/img/pay/payBackground.png'),
        filter: 'black',
        size: 500
      },
      // 二维码失效
      codeLoseEfficacy: '',
      tempCode: '',
      codeTimer: null,
      authStatus: false,
      //验证码和短信验证
      formCustom: {
        VerificationPhone: '',
        //图片随机码
        Verificationcode: '',
        //短信验证码
        messagecode: '',
        newCodeText: '获取验证码',
        codeText: '获取验证码',
      },
      ruleCustom: {
        VerificationPhone: [{
          required: true,
          validator: validaRegisteredPhone,
          trigger: 'blur'
        }],
        Verificationcode: [{
          required: true,
          message: '请输入图形验证码',
          trigger: 'blur'
        }],
        messagecode: [{
          required: true,
          message: '请输入收到的验证码',
          trigger: 'blur'
        }]
      },
      regExpObj: {
        phone: /^1[3|4|5|8|9|6|7]\d{9}$/,
        email: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
        password: /(?!(^[^a-z]+$))(?!(^[^A-Z]+$))(?!(^[^\d]+$))^[\w`~!#$%_()^&*,-<>?@.+=]{8,32}$/
      },
      imgSrc: 'https://activity.xinruiyun.cn/user/getKaptchaImage.do',
      indexD: '',
      onStep: 0,
      time: '',
      config: {
        value: '',
        imagePath: require('../../../assets/img/pay/payBackground.png'),
        filter: 'black',
        size: 500
      },
      cashPledge: 0,
      orderColumns: [
        {
          title: '产品类型',
          key: 'productType',
          render: (h, params) => {
            let result = ''
            switch (params.row.post.servicetype) {
              case 'host':
                result = '云服务器'
                break
              case 'db':
                result = '云数据库'
                break
              case 'G5500':
                result = 'GPU服务器'
                break
            }
            return h('span', {}, result)
          }
        },
        {
          title: '资源',
          width: 150,
          render: (h, params) => {
            let arr = []
            let param = h('li', {}, '带宽： ' + params.row.post.bandwith + 'M')
            let param1 = h('li', {}, '磁盘： ' + params.row.post.disksize + 'G SSD')
            let param2 = h('li', {}, '系统： ' + params.row.system[0])
            arr = [param, param1, param2]
            return h('ul', {}, arr)
          }
        },
        {
          title: '计费类型',
          render: (h, params) => {

            return h('span', {}, '包年包月')
          }
        },
        {
          title: '购买时长',
          key: 'time',
          render: (h, params) => {
            let text = this.monthD(params.row.post.days)
            if (text == '年') {
              text = '1年'
            } else if (text == '月') {
              text = '1个月'
            } else if (text == '天') {
              text = '1天'
            }
            return h('span', {}, text)
          }
        },
        {
          title: '保证金金额',
          width: 130,
          render: (h, params) => {
            let arr = []
            let param1 = h('li', {
              style: {
                textDecoration: 'line-through'
              }
            }, '原价：¥' + params.row.originPrice)
            let param2 = h('li', {
              style: {
                color: '#D0021B'
              }
            }, '¥' + params.row.price)
            arr.push(param1)
            arr.push(param2)
            return h('ul', {}, arr)
          }
        },
      ],
      orderData: [],
      payWay: 'balancePay',
      otherPayWay: '',
      balance: '0.0',
      authErrorText: '',
      inConformityModalMsg: '您好！本活动仅限新注册或者一直未使用过平台资源（第三方产品除外）及未参加过其他免费活动用户参与。',
      // 天天特惠参数
      allList: [],
      zoneList5: [],
      hostlist5: [
      ],
      lowHostList: [
        {
          post: {
            servicetype: "host",
            bandwith: 2,
            cost: '--',
            cpu: 2,
            mem: 4,
            days: 30,
            disksize: 40,
            disktype: "ssd",
            id: 497
          },
          postArr: [],
          systemList: [{
            value: 'window',
            label: 'Windows',
            children: []
          }, {
            value: 'centos',
            label: 'Centos',
            children: [],
          },
          {
            value: 'debian',
            label: 'Debian',
            children: [],
          },
          {
            value: 'ubuntu',
            label: 'Ubuntu',
            children: [],
          }],
          system: [],
          zoneList: [],
          zoneId: '',
          price: '--',
          originPrice: '176.72',
        },
        {
          post: {
            servicetype: "host",
            bandwith: 2,
            cost: '--',
            cpu: 2,
            mem: 8,
            days: 360,
            disksize: 40,
            disktype: "ssd",
            id: 497
          },
          postArr: [],
          systemList: [{
            value: 'window',
            label: 'Windows',
            children: []
          }, {
            value: 'centos',
            label: 'Centos',
            children: [],
          },
          {
            value: 'debian',
            label: 'Debian',
            children: [],
          },
          {
            value: 'ubuntu',
            label: 'Ubuntu',
            children: [],
          }],
          system: [],
          zoneList: [],
          zoneId: '',
          price: '--',
          originPrice: '176.72',
        },
        {
          post: {
            servicetype: "host",
            bandwith: 2,
            certification: 3,
            cost: '--',
            cpu: 2,
            mem: 8,
            days: 360,
            disksize: 40,
            disktype: "ssd",
            id: 497
          },
          postArr: [],
          systemList: [{
            value: 'window',
            label: 'Windows',
            children: []
          }, {
            value: 'centos',
            label: 'Centos',
            children: [],
          },
          {
            value: 'debian',
            label: 'Debian',
            children: [],
          },
          {
            value: 'ubuntu',
            label: 'Ubuntu',
            children: [],
          }],
          system: [],
          zoneList: [],
          zoneId: '',
          price: '--',
          originPrice: '176.72',
        },
        // {
        //   post: {
        //     servicetype: "db",
        //     bandwith: 2,
        //     cost: '--',
        //     cpu: 2,
        //     mem: 8,
        //     days: 60,
        //     disksize: 40,
        //     disktype: "ssd",
        //     id: 497
        //   },
        //   postArr: [],
        //   systemList: [{
        //     value: 'window',
        //     label: 'Windows',
        //     children: []
        //   }, {
        //     value: 'centos',
        //     label: 'Centos',
        //     children: [],
        //   },
        //   {
        //     value: 'debian',
        //     label: 'Debian',
        //     children: [],
        //   },
        //   {
        //     value: 'ubuntu',
        //     label: 'Ubuntu',
        //     children: [],
        //   }],
        //   system: [],
        //   zoneList: [],
        //   zoneId: '',
        //   price: '--',
        //   originPrice: '176.72',
        // },
        // {
        //   post: {
        //     servicetype: "G5500",
        //     bandwith: 2,
        //     cost: '--',
        //     cpu: 2,
        //     mem: 8,
        //     days: 3,
        //     disksize: 40,
        //     disktype: "ssd",
        //     id: 497
        //   },
        //   postArr: [],
        //   systemList: [{
        //     value: 'window',
        //     label: 'Windows',
        //     children: []
        //   }, {
        //     value: 'centos',
        //     label: 'Centos',
        //     children: [],
        //   },
        //   {
        //     value: 'debian',
        //     label: 'Debian',
        //     children: [],
        //   },
        //   {
        //     value: 'ubuntu',
        //     label: 'Ubuntu',
        //     children: [],
        //   }],
        //   system: [],
        //   zoneList: [],
        //   zoneId: '',
        //   price: '--',
        //   originPrice: '176.72',
        //   gpuConfigIndex: 0,
        // },
        // {
        //   post: {
        //     servicetype: "host",
        //     bandwith: 2,
        //     cost: '--',
        //     cpu: 2,
        //     mem: 4,
        //     days: 30,
        //     disksize: 40,
        //     disktype: "ssd",
        //     id: 497
        //   },
        //   postArr: [],
        //   systemList: [{
        //     value: 'window',
        //     label: 'Windows',
        //     children: []
        //   }, {
        //     value: 'centos',
        //     label: 'Centos',
        //     children: [],
        //   },
        //   {
        //     value: 'debian',
        //     label: 'Debian',
        //     children: [],
        //   },
        //   {
        //     value: 'ubuntu',
        //     label: 'Ubuntu',
        //     children: [],
        //   }],
        //   system: [],
        //   zoneList: [],
        //   zoneId: '',
        //   price: '--',
        //   originPrice: '176.72',
        // },
        // {
        //   post: {
        //     servicetype: "host",
        //     bandwith: 2,
        //     cost: '--',
        //     cpu: 2,
        //     mem: 8,
        //     days: 360,
        //     disksize: 40,
        //     disktype: "ssd",
        //     id: 497
        //   },
        //   postArr: [],
        //   systemList: [{
        //     value: 'window',
        //     label: 'Windows',
        //     children: []
        //   }, {
        //     value: 'centos',
        //     label: 'Centos',
        //     children: [],
        //   },
        //   {
        //     value: 'debian',
        //     label: 'Debian',
        //     children: [],
        //   },
        //   {
        //     value: 'ubuntu',
        //     label: 'Ubuntu',
        //     children: [],
        //   }],
        //   system: [],
        //   zoneList: [],
        //   zoneId: '',
        //   price: '--',
        //   originPrice: '176.72',
        // },
        // {
        //   post: {
        //     servicetype: "host",
        //     bandwith: 2,
        //     certification: 3,
        //     cost: '--',
        //     cpu: 2,
        //     mem: 8,
        //     days: 360,
        //     disksize: 40,
        //     disktype: "ssd",
        //     id: 497
        //   },
        //   postArr: [],
        //   systemList: [{
        //     value: 'window',
        //     label: 'Windows',
        //     children: []
        //   }, {
        //     value: 'centos',
        //     label: 'Centos',
        //     children: [],
        //   },
        //   {
        //     value: 'debian',
        //     label: 'Debian',
        //     children: [],
        //   },
        //   {
        //     value: 'ubuntu',
        //     label: 'Ubuntu',
        //     children: [],
        //   }],
        //   system: [],
        //   zoneList: [],
        //   zoneId: '',
        //   price: '--',
        //   originPrice: '176.72',
        // },
      ],
      zoneListgpu: [],
      gpuList: [
      ],
      coupenList: [
        { post: {} }
      ],
      //结束
      // 免费领取云主机参数
      updateList: [
        {
          name: '云服务器任意配置升级至以下配置',
          configs: [
            {
              params: '2核8G',
              discount: '4'
            },
            {
              params: '4核8G',
              discount: '3'
            },
            {
              params: '4核16G',
              discount: '2.1'
            },
          ],
        },
        {
          name: '弹性IP任意带宽升级至以下带宽',
          configs: [
            {
              params: '5M带宽',
              discount: '3.5'
            },
            {
              params: '10M带宽',
              discount: '2.1'
            },
          ],
        }
      ],
      renewHostList: [
        {
          text: '个人/企业续费优惠',
          cpu: 2,
          memery: 4,
          ssd: '40',
          bandwidthList: [1, 2],
          bandwidth: 2,
          timeList: [30, 90, 180, 360, 720],
          time: 30,
          price: 1099.00,
          originPrice: 5201.28,
        },
        {
          text: '企业续费优惠',
          cpu: 4,
          memery: 8,
          ssd: '40',
          bandwidthList: [5],
          bandwidth: 5,
          timeList: [180, 360, 720],
          time: 180,
          price: 1269.00,
          originPrice: 3112.31,
        },
      ],
      depositeList: [
        {
          post: {
            servicetype: "host",
            bandwith: 2,
            cost: '--',
            cpu: 2,
            mem: 4,
            days: 30,
            disksize: 40,
            disktype: "ssd",
            id: 497
          },
          systemList: [{
            value: 'window',
            label: 'Windows',
            children: []
          }, {
            value: 'centos',
            label: 'Centos',
            children: [],
          },
          {
            value: 'debian',
            label: 'Debian',
            children: [],
          },
          {
            value: 'ubuntu',
            label: 'Ubuntu',
            children: [],
          }],
          system: [],
          zoneList: [],
          zoneId: '',
          price: '--',
          originPrice: '176.72',
        },
        {
          post: {
            servicetype: "host",
            bandwith: 2,
            cost: '--',
            cpu: 2,
            mem: 8,
            days: 360,
            disksize: 40,
            disktype: "ssd",
            id: 497
          },
          systemList: [{
            value: 'window',
            label: 'Windows',
            children: []
          }, {
            value: 'centos',
            label: 'Centos',
            children: [],
          },
          {
            value: 'debian',
            label: 'Debian',
            children: [],
          },
          {
            value: 'ubuntu',
            label: 'Ubuntu',
            children: [],
          }],
          system: [],
          zoneList: [],
          zoneId: '',
          price: '--',
          originPrice: '176.72',
        },
        {
          post: {
            servicetype: "host",
            bandwith: 2,
            certification: 3,
            cost: '--',
            cpu: 2,
            mem: 8,
            days: 360,
            disksize: 40,
            disktype: "ssd",
            id: 497
          },
          systemList: [{
            value: 'window',
            label: 'Windows',
            children: []
          }, {
            value: 'centos',
            label: 'Centos',
            children: [],
          },
          {
            value: 'debian',
            label: 'Debian',
            children: [],
          },
          {
            value: 'ubuntu',
            label: 'Ubuntu',
            children: [],
          }],
          system: [],
          zoneList: [],
          zoneId: '',
          price: '--',
          originPrice: '176.72',
        },
        {
          post: {
            servicetype: "db",
            bandwith: 2,
            cost: '--',
            cpu: 2,
            mem: 8,
            days: 60,
            disksize: 40,
            disktype: "ssd",
            id: 497
          },
          // systemList: [
          //   {
          //     value: 'mysql',
          //     label: 'mysql',
          //     children: [],
          //   },
          //   {
          //     value: 'redis',
          //     label: 'redis',
          //     children: []
          //   }, {
          //     value: 'postgresql',
          //     label: 'postgresql',
          //     children: [],
          //   }
          // ],
          systemList: [{
            value: 'window',
            label: 'Windows',
            children: []
          }, {
            value: 'centos',
            label: 'Centos',
            children: [],
          },
          {
            value: 'debian',
            label: 'Debian',
            children: [],
          },
          {
            value: 'ubuntu',
            label: 'Ubuntu',
            children: [],
          }],
          system: [],
          zoneList: [],
          zoneId: '',
          price: '--',
          originPrice: '176.72',
        },
        {
          post: {
            servicetype: "G5500",
            bandwith: 2,
            cost: '--',
            cpu: 2,
            mem: 8,
            days: 3,
            disksize: 40,
            disktype: "ssd",
            id: 497
          },
          postArr: [],
          zoneList: [],
          zoneId: '',
          price: '--',
          originPrice: '176.72',
          gpuConfigIndex: 0,
        },
      ],
      hideconfig: false,
      //结束
      // 云服务器大集合参数
      currentView: 'child1',
      single: '选择云服务器',
      vmCost: 0,
      vmCoupon: 0,
      dataDiskCost: 0,
      coupon: 0,
      ipCost: 0,
      ipCoupon: 0,
      selectSummarySystem: [],
      summarySystemList: [{
        value: 'window',
        label: 'Windows',
        children: []
      }, {
        value: 'centos',
        label: 'Centos',
        children: [],
      },
      {
        value: 'debian',
        label: 'Debian',
        children: [],
      },
      {
        value: 'ubuntu',
        label: 'Ubuntu',
        children: [],
      }],
      hostZoneList: [],
      gpuZoneList: [],
      selectZone: '',
      configureList: [
        { cpu: 1, mem: 1 },
        { cpu: 1, mem: 2 },
        { cpu: 2, mem: 4 },
        { cpu: 4, mem: 8 },
        { cpu: 8, mem: 16 },
        { cpu: 16, mem: 32 },
        { cpu: 32, mem: 64 },
        { cpu: 64, mem: 256 }
      ],
      gpuConfigList: [
        { cpu: 8, mem: 64, num: 1 },
        { cpu: 16, mem: 128, num: 2 },
        { cpu: 16, mem: 192, num: 3 },
        { cpu: 32, mem: 256, num: 4 },
        { cpu: 64, mem: 384, num: 6 },
      ],
      selectConfig: '1,1',
      configLength: 2,
      bandWidthList: [1, 2, 5, 10, 20],
      selectBandWidth: 1,
      hostTimeList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 24, 36],
      selectTime: 1,
      ssdList: [0, 20, 50, 100, 500],
      selectedSSD: 0,
      count: 1,
      // 结束
      loading: false,
      loadingMessage: '',
      serialNum: ''
    }
  },
  created () {
    this.getParams()
    this.getZoneList()
    this.getConfigureD()
    this.promise()
    this.getRenewPrice(this.renewHostList[0])
    this.getRenewPrice(this.renewHostList[1])
  },
  mounted () {
    this.uploadList = this.$refs.upload.fileList;
    this.uploadList1 = this.$refs.upload1.fileList;
    this.uploadList2 = this.$refs.upload2.fileList;
  },
  methods: {
    // test1(item) {
    //   console.log(item)
    //   let configId = ''
    //   item.arr.forEach(element=>{
    //     if(element.bandWidth == item.bandWidth&&element.time==item.time){
    //       configId = element.id
    //     }
    //   })
    //   console.log(configId)
    // },
    wechat_submit () {
      let urls = this.uploadImg1 + ',' + this.uploadImg
      if (this.uploadImg1 && this.uploadImg) {
        axios.post('activity/addReviewInfo.do', {
          sharePics: urls,
          activityNum: this.activityNumfree,
          vmConfigId: this.vmConfigIdfree,
          osType: this.hostFree.system[1],
          defzoneid: this.hostFree.zoneId,
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.showModal.wechatShare = false
            this.$message.info({
              content: response.data.message
            })
          } else {
            this.$message.info({
              content: response.data.message
            })
          }
        })
      } else {
        this.$message.info({
          content: '请上传截图'
        })
      }
    },
    baidu_submit () {
      if (this.uploadImg2) {
        axios.post('activity/addCommentInfo.do', {
          commentPics: this.uploadImg2,
          activityNum: this.activityNumfree,
          vmConfigId: this.vmConfigIdfree,
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.showModal.baiducomment = false
            this.$message.info({
              content: response.data.message
            })
          } else {
            this.$message.info({
              content: response.data.message
            })
          }
        })
      } else {
        this.$message.info({
          content: '请上传截图'
        })
      }
    },
    seeComment () {
      this.showModal.checksuccess = false
      let item = this.hostFree
      axios.get('activity/judgeCommentTime.do', {
        params: {
          activityNum: 57,
          vmConfigId: item.post.id
        }
      }).then(response => {
        if (response.status == 200 && response.data.status == 1) {
          axios.get('activity/getReviewInfo.do', {
            params: {
              activityNum: item.post.activitynum,
              vmConfigId: item.post.id
            }
          }).then(response => {
            if (response.status == 200 && response.data.status == 1) {
              // result返回为空的情况
              if (response.data.result.commentResult) {
                if (response.data.result.commentResult && JSON.stringify(response.data.result.commentResult) != '{}') {
                  switch (response.data.result.commentResult.commentStatus) {
                    case 0:
                      this.showModal.checkfail = true
                      this.failMsg = response.data.result.commentResult.commentInfo
                      this.failType = 'baidu'
                      break;
                    case 1:
                      this.showModal.baidusuccess = true
                      break;
                    case 2:
                      this.showModal.checking = true
                      break;
                  }
                  // result有值，commentResult为空的情况
                } else {
                  if (response.data.result.reviewResult.reviewStatus == 1) {
                    this.showModal.baiducomment = true
                  }
                }
              } else {
                this.$message.info({
                  content: '请先成功领取主机再进行该操作！'
                })
              }
            }
          })
        } else {
          this.$message.info({
            content: response.data.message
          })
        }
      })
    },
    //复制文件外链路径
    // copyUrl () {
    //   this.$refs.copy.focus()
    //   var obj = this.$refs.copy
    //   obj.select()
    //   document.execCommand("copy");
    //   try {
    //     if (document.execCommand("copy")) {
    //       this.$Message.success("复制成功");
    //     } else {
    //       this.$Message.info("平台出小差了");
    //     }
    //   } catch (err) {
    //     if (err) {
    //       this.$Message.info("该浏览器暂不支持复制");
    //     }
    //   }
    // },
    handleView (name) {
      this.imgName = name;
      this.visible = true;
    },
    handleRemove (file, name) {
      const fileList = this.$refs[name].fileList;
      this.$refs[name].fileList.splice(fileList.indexOf(file), 1);
    },
    handleSuccess (res, file, name) {
      if (res.status == 1) {
        file.url = res.result
        file.name = res.result
        this.uploadImg = res.result
      }
    },
    handleSuccess1 (res, file, name) {
      if (res.status == 1) {
        file.url = res.result
        file.name = res.result
        this.uploadImg1 = res.result
      }
    },
    handleSuccess2 (res, file, name) {
      if (res.status == 1) {
        file.url = res.result
        file.name = res.result
        this.uploadImg2 = res.result
      }
    },
    handleFormatError () {
      this.$Message.info({
        content: '仅支持jpg,png,gif格式的文件上传'
      })
    },
    handleMaxSize (file) {
      this.$Message.info({
        content: '上传的文件过大'
      })
    },
    getParams () {
      if (this.$route.hash) {
        if (this.$route.hash.split('#')[1].slice(0, 4) == 'days') {
          this.currentView = 'child2'
        }
      }
    },
    tabChange (tabItem) {
      this.currentView = tabItem;
    },
    init () {
      axios.get('user/GetUserInfo.do').then(response => {
        if (response.status == 200 && response.data.status == 1) {
          this.$store.commit('setAuthInfo', { authInfo: response.data.authInfo, userInfo: response.data.result, authInfoPersion: response.data.authInfo_persion })
        }
      })
    },
    // 天天特惠函数
    promise () {
      let reshost = axios.get('activity/getActInfo.do', {
        params: {
          activityNum: '58'
        }
      })
      let resgpu = axios.get('activity/getTemActInfoById.do', {
        params: {
          activityNum: '61'
        }
      })
      let rescoupen = axios.get('activity/getActTicket.do', {
        params: {
          activityNum: '62'
        }
      })
      Promise.all([reshost, resgpu, rescoupen]).then(res => {
        if (res[0].status == 200 && res[0].data.status == 1 && res[1].status == 200 && res[1].data.status == 1 && res[2].status == 200 && res[2].data.status == 1) {
          this.getConfigureL(res[0])
          this.getConfigureGPUL(res[1])
          this.getCoupen(res[2])
        }
      })
    },
    getConfigureL (res) {
      if (res.data.status == 1 && res.status == 200) {
        let receiveVal = res.data.result.freevmconfigs
        let newArr = []
        // 数组去重（相同配置的）
        for (var i = 0; i < receiveVal.length; i++) {
          for (var j = 0; j < newArr.length; j++) {
            if (receiveVal[i].cpu == newArr[j].cpu && receiveVal[i].mem == newArr[j].mem && receiveVal[i].bandwith == newArr[j].bandwith) {
              break
            }
          }
          if (j == newArr.length) {
            newArr[newArr.length] = receiveVal[i];
          }
        }
        this.lowHostList.forEach((item, index) => {
          item.post = newArr[index]
          item.zoneList = res.data.result.optionalArea
          // 设置默认区域
          item.zoneId = item.zoneList[0].value
          // 设置默认系统
          this.changeZoneL(item)
        })
        for (var i = 0; i < receiveVal.length; i++) {
          for (var j = 0; j < this.lowHostList.length; j++) {
            if (receiveVal[i].cpu == this.lowHostList[j].post.cpu && receiveVal[i].mem == this.lowHostList[j].post.mem && receiveVal[i].bandwith == this.lowHostList[j].post.bandwith) {
              this.lowHostList[j].postArr.push(receiveVal[i])
            }
          }
        }
        this.allList = this.lowHostList
        // 天天特惠前面默认5个配置
        this.zoneList5 = res.data.result.optionalArea
        this.hostlist5 = res.data.s
        let systemList = [{
          value: 'window',
          label: 'Windows',
          children: []
        }, {
          value: 'centos',
          label: 'Centos',
          children: [],
        },
        {
          value: 'debian',
          label: 'Debian',
          children: [],
        },
        {
          value: 'ubuntu',
          label: 'Ubuntu',
          children: [],
        }]
        let newdata = []
        for (let key in this.hostlist5) {
          newdata.push({
            'arr': this.hostlist5[key],
            'cpu': this.hostlist5[key][0].cpu,
            'mem': this.hostlist5[key][0].mem,
            'bandwith': this.hostlist5[key][0].bandwith,
            'days': this.hostlist5[key][0].days,
            'price': '',
            'originPrice': '',
            'systemList': systemList,
            'system': [],
            'zoneId': this.zoneList5[0].value,
            'cpumem': this.hostlist5[key][0].cpu + '#' + this.hostlist5[key][0].mem,
            'servicetype': this.hostlist5[key][0].servicetype
          })
        }
        newdata.forEach(element => {
          let obj = {}
          let timeList = []
          let obj1 = {}
          let bandWidthList = []
          element.arr.forEach(element1 => {
            if (!obj[element1.days]) {
              timeList.push(element1.days)
              obj[element1.days] = 1
            }
            if (!obj1[element1.bandwith]) {
              bandWidthList.push(element1.bandwith)
              obj1[element1.bandwith] = 1
            }
          })
          element.timeList = timeList
          element.bandWidthList = bandWidthList
        })
        newdata.forEach(element => {
          let configList = element.arr.map(element1 => {
            return `${element1.cpu}#${element1.mem}`
          })
          configList = Array.from(new Set(configList))
          let configListF = configList.map(element2 => {
            return { 'cpu': element2.split('#')[0], 'mem': element2.split('#')[1] }
          })
          element.configList = configListF
        })
        newdata.forEach(inner => {
          this.changeZone5(inner)
        })
        this.hostlist5 = newdata
      }
    },
    timeSelect (item, item1) {
      item.days = item1
      this.changeZone5(item)
    },
    changeZone5 (item) {
      this.getSystem5(item)
      this.getPrice5(item)
    },
    getSystem5 (item) {
      let url = ''
      let systemType = ''
      let showName = ''
      if (item.servicetype == 'db') {
        url = 'database/listDbTemplates.do'
        systemType = 'mysql'
        showName = 'dbname'
      } else {
        url = 'information/listTemplates.do'
        systemType = 'window'
        showName = 'templatedescript'
      }
      let params = {}
      if (item.servicetype == 'G5500') {
        url = 'information/listTemplateFunctionActivity.do'
        params = {
          // user: '0',
          // gpu: '1',
          // normalTemplate: '0',
          zoneId: item.zoneId,
        }
      } else {
        params = {
          user: '0',
          normalTemplate: '1',
          zoneId: item.zoneId,
        }
      }
      axios.get(url, {
        params
      }).then(res => {
        if (res.status == 200 && res.data.status == 1) {
          if (item.servicetype == 'G5500') {
            this.$set(item, 'systemList', this.formatSystem(res.data.result))
            // console.log(this.formatSystem(res.data.result.gpuTem))
            this.$set(item, 'system', [item.systemList[0].label, item.systemList[0].children[0].value])
          } else {
            var x
            for (x in res.data.result) {
              item.systemList.forEach(item => {
                if (item.value == x) {
                  item.children = res.data.result[x]
                }
              })
            }
            item.systemList.forEach(item => {
              item.children.forEach(item => {
                item.value = item.systemtemplateid
                item.label = item[showName]
              })
            })
            item.systemList.forEach((item, index) => {
              if (item.children.length == 0) {
                item.disabled = true
              }
            })
            // 设置默认系统
            item.system = [systemType, res.data.result[systemType][0].systemtemplateid]
          }
        }
      })
    },
    getId (item) {
      let configId = ''
      if (item.configList.length > 1) {
        item.arr.forEach(element => {
          if (element.mem == item.cpumem.split('#')[1] && element.days == item.days && element.cpu == item.cpumem.split('#')[0]) {
            configId = element.id
          }
        })
      } else {
        item.arr.forEach(element => {
          if (element.bandwith == item.bandwith && element.days == item.days) {
            configId = element.id
          }
        })
      }
      return configId
    },
    getPrice5 (item) {
      let params = {}
      let id = this.getId(item)
      if (item.days <= 7) {
        params = {
          zoneId: item.zoneId,
          vmConfigId: id,
        }
      } else {
        params = {
          zoneId: item.zoneId,
          vmConfigId: id,
          month: item.days / 30
        }
      }
      axios.get('activity/getOriginalPrice.do', {
        params: params
      }).then(res => {
        if (res.status == 200 && res.data.status == 1) {
          item.price = res.data.result.cost;
          item.originPrice = res.data.result.originalPrice;
        }
      })
    },
    pushOrder5 (item, type) {
      if (!this.$store.state.userInfo) {
        if (type == 'p') {
          this.$LR({ type: 'register' })
        } else {
          window.open('https://m.xinruiyun.cn/login', '_self')
        }
        return
      }
      if ((!this.authInfo) || (this.authInfo && this.authInfo.authtype == 0 && this.authInfo.checkstatus != 0) || (!this.authInfoPersion && this.authInfo && this.authInfo.authtype == 1 && this.authInfo.checkstatus != 0) || (this.authInfoPersion && this.authInfoPersion.checkstatus != 0 && this.authInfo && this.authInfo.checkstatus != 0)) {
        if (type == 'p') {
          if (!this.userInfo.phone) {
            this.showModal.cashverification = true
          } else {
            this.refreshQRFirst()
          }
          return
        } else {
          window.open('https://m.xinruiyun.cn/faceindex', '_self')
        }
      }
      let url = ''
      let params = {}
      let id = ''
      if (item.servicetype == 'G5500') {
        id = this.getIdgpu(item)
        url = 'activity/getDiskcountGPU.do'
        params = {
          defzoneid: item.zoneId,
          vmConfigId: id,
          osType: item.system[1]
        }
      } else if (item.servicetype == 'host') {
        id = this.getId(item)
        url = 'information/getDiskcountMv.do'
        params = {
          defzoneid: item.zoneId,
          vmConfigId: id,
          osType: item.system[1]
        }
      }
      axios.get(url, {
        params: params
      }).then(res => {
        if (res.status == 200 && res.data.status == 1) {
          this.$Message.success('创建订单成功')
          if (type == 'p') {
            window.open('https://i.xinruiyun.cn/order', '_self')
          } else {
            window.open('https://m.xinruiyun.cn/orderconfirm', '_self')
          }
        } else {
          this.$message.info({
            content: res.data.message
          })
        }
      })
    },
    getConfigureGPUL (res) {
      if (res.data.status == 1 && res.status == 200) {
        let newdata = []
        this.zoneListgpu = res.data.result.optionalAreaGpu
        let gpuD = res.data.result.freevmconfigs
        newdata.push({
            'arr': gpuD,
            'cpu': gpuD[0].cpu,
            'mem': gpuD[0].mem,
            'bandwith': gpuD[0].bandwith,
            'days': gpuD[0].days,
            'price': '',
            'originPrice': '',
            'zoneId': this.zoneListgpu[0].value,
            'gpusize': gpuD[0].gpusize,
            'servicetype': gpuD[0].servicetype
          })
        this.changeZonegpu(newdata[0])
        this.gpuList = newdata
      }
    },
    changeZonegpu (item) {
      this.getSystem5(item)
      this.getPriceGpu(item)
    },
    getIdgpu (item) {
      let configId = ''
      item.arr.forEach(element => {
          if (element.bandwith == item.bandwith) {
            configId = element.id
          }
        })
      return configId
    },
    getPriceGpu(item) {
      let params = {}
      let id = this.getIdgpu(item)
      if (item.days <= 7) {
        params = {
          zoneId: item.zoneId,
          vmConfigId: id,
        }
      } else {
        params = {
          zoneId: item.zoneId,
          vmConfigId: id,
          month: item.days / 30
        }
      }
      axios.get('activity/getOriginalPrice.do', {
        params: params
      }).then(res => {
        if (res.status == 200 && res.data.status == 1) {
          item.price = res.data.result.cost;
          item.originPrice = res.data.result.originalPrice;
        }
      })
    },
    getCoupen (res) {
      if (res.data.status == 1 && res.status == 200) {
        this.coupenList.forEach((item, index) => {
          item.post = res.data.result.freevmconfigs[index]
        })
      }
    },
    changgeTimeL (item, select) {
      item.post = select
      this.getPriceL(item)
    },
    changeZoneL (item) {
      this.getSystemL(item)
      this.getPriceL(item)
    },
    getSystemL (item) {
      let url = ''
      let systemType = ''
      let showName = ''
      if (item.post.servicetype == 'db') {
        url = 'database/listDbTemplates.do'
        systemType = 'mysql'
        showName = 'dbname'
      } else {
        url = 'information/listTemplates.do'
        systemType = 'window'
        showName = 'templatedescript'
      }
      let params = {}
      if (item.post.servicetype == 'G5500') {
        params = {
          user: '0',
          gpu: '1',
          normalTemplate: '0',
          zoneId: item.zoneId,
        }
      } else {
        params = {
          user: '0',
          normalTemplate: '1',
          zoneId: item.zoneId,
        }
      }
      axios.get(url, {
        params
      }).then(res => {
        if (res.status == 200 && res.data.status == 1) {
          var x
          for (x in res.data.result) {
            item.systemList.forEach(item => {
              if (item.value == x) {
                item.children = res.data.result[x]
              }
            })
          }
          item.systemList.forEach(item => {
            item.children.forEach(item => {
              item.value = item.systemtemplateid
              item.label = item[showName]
            })
          })
          item.systemList.forEach((item, index) => {
            if (item.children.length == 0) {
              item.disabled = true
            }
          })
          // 设置默认系统
          item.system = [systemType, res.data.result[systemType][0].systemtemplateid]
        }
      })
    },
    getPriceL (item) {
      let params = {}
      if (item.post.days <= 7) {
        params = {
          zoneId: item.zoneId,
          vmConfigId: item.post.id,
        }
      } else {
        params = {
          zoneId: item.zoneId,
          vmConfigId: item.post.id,
          month: item.post.days / 30
        }
      }
      axios.get('activity/getOriginalPrice.do', {
        params: params
      }).then(res => {
        if (res.status == 200 && res.data.status == 1) {
          item.price = res.data.result.cost;
          item.originPrice = res.data.result.originalPrice;
        }
      })
    },
    pushOrderL (item, type) {
      if (!this.$store.state.userInfo) {
        if (type == 'p') {
          this.$LR({ type: 'register' })
        } else {
          window.open('https://m.xinruiyun.cn/login', '_self')
        }
        return
      }
      if ((!this.authInfo) || (this.authInfo && this.authInfo.authtype == 0 && this.authInfo.checkstatus != 0) || (!this.authInfoPersion && this.authInfo && this.authInfo.authtype == 1 && this.authInfo.checkstatus != 0) || (this.authInfoPersion && this.authInfoPersion.checkstatus != 0 && this.authInfo && this.authInfo.checkstatus != 0)) {
        if (type == 'p') {
          if (!this.userInfo.phone) {
            this.showModal.cashverification = true
          } else {
            this.refreshQRFirst()
          }
          return
          // this.$message.confirm({
          //   title: '提示',
          //   content: '抱歉，只有实名认证用户才可以参加活动',
          //   okText: '去实名认证',
          //   onOk: () => {
          //     window.open('https://i.xinruiyun.cn/usercenter', '_self')
          //   }
          // })
          // return false
        } else {
          window.open('https://m.xinruiyun.cn/faceindex', '_self')
        }
      }
      let url = ''
      let params = {}
      if (item.post.servicetype == 'ticket') {
        url = 'ticket/getTicketForActivity.do'
        params = { activityNum: 62 }
      } else if (item.post.servicetype == 'G5500') {
        url = 'activity/getDiskcountGPU.do'
        params = {
          defzoneid: item.zoneId,
          vmConfigId: item.post.id,
          osType: item.system[1]
        }
      } else if (item.post.servicetype == 'host') {
        url = 'information/getDiskcountMv.do'
        params = {
          defzoneid: item.zoneId,
          vmConfigId: item.post.id,
          osType: item.system[1]
        }
      }
      axios.get(url, {
        params: params
      }).then(res => {
        if (res.status == 200 && res.data.status == 1) {
          if (item.post.servicetype == 'ticket') {
            this.$message.info({
              content: res.data.message
            })
          } else {
            this.$Message.success('创建订单成功')
            if (type == 'p') {
              window.open('https://i.xinruiyun.cn/order', '_self')
            } else {
              window.open('https://m.xinruiyun.cn/orderconfirm', '_self')
            }
          }
        } else {
          this.$message.info({
            content: res.data.message
          })
        }
      })
    },
    monthL (val) {
      let text = ''
      if (val >= 360) {
        text = val / 360 + '年'
      } else if (val >= 30) {
        text = val / 30 + '个月'
      } else {
        text = val + '天'
      }
      return text
    },
    titleL (val) {
      // console.log(val.post)
      let result = ''
      switch (val.post.servicetype) {
        case 'host':
          result = '云服务器'
          break
        case 'ticket':
          result = '域名抵用券'
          break
        case 'G5500':
          result = 'GPU云服务器'
          break
        default:
          result = '1213'
      }
      return result
    },
    //结束
    //免费领取云服务器方法
    getConfigureD () {
      let url = 'activity/getTemActInfoById.do'
      axios.get(url, {
        params: {
          activityNum: '57'
        }
      }).then(res => {
        if (res.data.status == 1 && res.status == 200) {
          let gpuConfigList = res.data.result.freevmconfigs.filter((item, index) => {
            return item.servicetype == 'G5500'
          })
          // console.log(gpuConfigList)
          this.depositeList.forEach((item, index) => {
            item.post = res.data.result.freevmconfigs[index]
            if (item.post.servicetype == 'G5500') {
              item.zoneList = res.data.result.optionalAreaGpu
              item.postArr = gpuConfigList
              this.$set(item, 'systemList', this.formatSystem(res.data.result.gpuTem))
              this.$set(item, 'system', [item.systemList[0].label, item.systemList[0].children[0].value])
              item.zoneId = item.zoneList[0].value
            } else {
              item.zoneList = res.data.result.optionalArea
              item.zoneId = item.zoneList[0].value
              this.getSystemD(item)
            }
          })
          // 获取免押金主机参数
          let filterdata = []
          filterdata = this.depositeList.filter(item => {
            return item.post.freeddeposit == 1
          })
          this.hostFree = filterdata[0]
          this.activityNumfree = this.hostFree.post.activitynum
          this.vmConfigIdfree = this.hostFree.post.id
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
    changeZoneD (item) {
      this.getSystemD(item)
      this.getPriceD(item)
    },
    getSystemD (item) {
      let url = ''
      let systemType = ''
      let showName = ''
      if (item.post.servicetype == 'db') {
        url = 'database/listDbTemplates.do'
        systemType = 'mysql'
        showName = 'dbname'
      } else {
        url = 'information/listTemplates.do'
        systemType = 'window'
        showName = 'templatedescript'
      }
      let params = {}
      if (item.post.servicetype == 'G5500') {
        url = 'listTemplateFunctionActivity.do'
        params = {
          // user: '0',
          // gpu: '1',
          // normalTemplate: '0',
          zoneId: item.zoneId,
        }
      } else {
        params = {
          user: '0',
          normalTemplate: '1',
          zoneId: item.zoneId,
        }
      }
      axios.get(url, {
        params
      }).then(res => {
        if (res.status == 200 && res.data.status == 1) {
          var x
          for (x in res.data.result) {
            item.systemList.forEach(item => {
              if (item.value == x) {
                item.children = res.data.result[x]
              }
            })
          }
          item.systemList.forEach(item => {
            item.children.forEach(item => {
              item.value = item.systemtemplateid
              item.label = item[showName]
            })
          })
          item.systemList.forEach((item, index) => {
            if (item.children.length == 0) {
              item.disabled = true
            }
          })
          // 设置默认系统
          item.system = [systemType, res.data.result[systemType][0].systemtemplateid]
        }
      })
    },
    getPriceD (item) {
      let params = {}
      if (item.post.servicetype == 'G5500') {
        params = {
          zoneId: item.zoneId,
          vmConfigId: item.post.id,
        }
      } else {
        params = {
          zoneId: item.zoneId,
          vmConfigId: item.post.id,
          month: item.post.days / 30
        }
      }
      axios.get('activity/getOriginalPrice.do', {
        params: params
      }).then(res => {
        if (res.status == 200 && res.data.status == 1) {
          item.price = res.data.result.cost;
          item.originPrice = res.data.result.originalPrice;
        }
      })
    },
    refreshQRFirst () {
      this.tempCode = this.uuid(6, 16)
      let url = '/faceRecognition/getUserInfoByPcQRCode.do'
      let config1 = {
        phone: this.userInfo.phone ? this.userInfo.phone : this.formCustom.VerificationPhone,
      }
      let params = {
        faceType: '1',
        tempCode: this.tempCode
      }
      params.config = JSON.stringify(config1)
      axios.post(url, params).then(res => {
        if (res.status == 200 && res.data.status == 1) {
          this.refreshUserStatus()
          this.showModal.qrCode = true
          this.qrConfig.value = res.data.result.url
          this.codeLoseEfficacy = ''
        } else {
          this.codeLoseEfficacy = 'lose'
        }
      })
    },
    checkstatusFree (item, type) {
      axios.get('activity/getReviewInfo.do', {
        params: {
          activityNum: item.post.activitynum,
          vmConfigId: item.post.id
        }
      }).then(response => {
        if (response.status == 200 && response.data.status == 1) {
          if (response.data.result.reviewResult) {
            if (response.data.result.reviewResult.reviewStatus == 1 && response.data.result.commentResult.commentStatus == 1) {
              this.$message.info({
                content: '你好！同一认证手机号只能参加一次本次活动。'
              })
            } else {
              switch (response.data.result.reviewResult.reviewStatus) {
                case 0:
                  this.showModal.checkfail = true
                  this.failMsg = response.data.result.reviewResult.reviewInfo
                  this.failType = 'wechat'
                  break;
                case 1:
                  this.showModal.checksuccess = true
                  break;
                case 2:
                  this.showModal.checking = true
                  break;
              }
            }
          } else {
            axios.get('activity/judgeGetFreeVmByActivity.do', {
              params: {
                vmConfigId: item.post.id
              }
            }).then(response => {
              if (response.status == 200 && response.data.status == 1) {
                this.showModal.wechatShare = true
              } else {
                this.$message.info({
                  content: response.data.message
                })
              }
            })
          }
        }
      })
    },
    // uploadWechat () {
    //   if (!this.$store.state.userInfo) {
    //     this.$LR({ type: 'register' })
    //     return
    //   }
    //   this.showModal.wechatShare = true
    // },
    uploadBaidu (type) {
      let item = this.hostFree
      if (!this.$store.state.userInfo) {
        if (type == 'p') {
          this.$LR({ type: 'register' })
        } else {
          window.open('https://m.xinruiyun.cn/login', '_self')
        }
        return
      }
      if ((!this.authInfo) || (this.authInfo && this.authInfo.authtype == 0 && this.authInfo.checkstatus != 0) || (!this.authInfoPersion && this.authInfo && this.authInfo.authtype == 1 && this.authInfo.checkstatus != 0) || (this.authInfoPersion && this.authInfoPersion.checkstatus != 0 && this.authInfo && this.authInfo.checkstatus != 0)) {
        if (type == 'p') {
          if (!this.userInfo.phone) {
            this.showModal.cashverification = true
          } else if (item.post.certification == 3) {
            this.$message.confirm({
              title: '提示',
              content: '抱歉，只有实名认证用户才可以参加活动',
              okText: '去实名认证',
              onOk: () => {
                window.open('https://i.xinruiyun.cn/usercenter', '_self')
              }
            })
          } else {
            this.refreshQRFirst()
          }
          return
        } else {
          if (item.post.certification == 3) {
            window.open('https://i.xinruiyun.cn/usercenter', '_self')
          } else {
            window.open('https://m.xinruiyun.cn/faceindex', '_self')
          }
        }
      }
      // this.showModal.baiducomment = true
      axios.get('activity/judgeCommentTime.do', {
        params: {
          activityNum: 57,
          vmConfigId: item.post.id
        }
      }).then(response => {
        if (response.status == 200 && response.data.status == 1) {
          axios.get('activity/getReviewInfo.do', {
            params: {
              activityNum: item.post.activitynum,
              vmConfigId: item.post.id
            }
          }).then(response => {
            if (response.status == 200 && response.data.status == 1) {
              // result返回为空的情况
              if (response.data.result.commentResult) {
                if (response.data.result.commentResult && JSON.stringify(response.data.result.commentResult) != '{}') {
                  switch (response.data.result.commentResult.commentStatus) {
                    case 0:
                      this.showModal.checkfail = true
                      this.failMsg = response.data.result.commentResult.commentInfo
                      this.failType = 'baidu'
                      break;
                    case 1:
                      this.showModal.baidusuccess = true
                      break;
                    case 2:
                      this.showModal.checking = true
                      break;
                  }
                } else {
                  if (response.data.result.reviewResult.reviewStatus == 1) {
                    this.showModal.baiducomment = true
                  }
                }
              } else {
                this.$message.info({
                  content: '请先成功领取主机再进行该操作！'
                })
              }
            }
          })
        } else {
          this.$message.info({
            content: response.data.message
          })
        }
      })
    },
    pushOrderFree (item, type) {
      if (item == 0) {
        item = this.hostFree
      }
      if (!this.$store.state.userInfo) {
        if (type == 'p') {
          this.$LR({ type: 'register' })
        } else {
          window.open('https://m.xinruiyun.cn/login', '_self')
        }
        return
      }
      if ((!this.authInfo) || (this.authInfo && this.authInfo.authtype == 0 && this.authInfo.checkstatus != 0) || (!this.authInfoPersion && this.authInfo && this.authInfo.authtype == 1 && this.authInfo.checkstatus != 0) || (this.authInfoPersion && this.authInfoPersion.checkstatus != 0 && this.authInfo && this.authInfo.checkstatus != 0)) {
        if (type == 'p') {
          if (!this.userInfo.phone) {
            this.showModal.cashverification = true
          } else if (item.post.certification == 3) {
            this.$message.confirm({
              title: '提示',
              content: '抱歉，只有实名认证用户才可以参加活动',
              okText: '去实名认证',
              onOk: () => {
                window.open('https://i.xinruiyun.cn/usercenter', '_self')
              }
            })
          } else {
            this.refreshQRFirst()
          }
          return
        } else {
          if (item.post.certification == 3) {
            window.open('https://i.xinruiyun.cn/usercenter', '_self')
          } else {
            window.open('https://m.xinruiyun.cn/faceindex', '_self')
          }
        }
      }
      this.checkstatusFree(item)
    },
    pushOrderD (item, type) {
      if (!this.$store.state.userInfo) {
        if (type == 'p') {
          this.$LR({ type: 'register' })
        } else {
          window.open('https://m.xinruiyun.cn/login', '_self')
        }
        return
      }
      if ((!this.authInfo) || (this.authInfo && this.authInfo.authtype == 0 && this.authInfo.checkstatus != 0) || (!this.authInfoPersion && this.authInfo && this.authInfo.authtype == 1 && this.authInfo.checkstatus != 0) || (this.authInfoPersion && this.authInfoPersion.checkstatus != 0 && this.authInfo && this.authInfo.checkstatus != 0)) {
        if (type == 'p') {
          if (!this.userInfo.phone) {
            this.showModal.cashverification = true
          } else if (item.post.certification == 3) {
            this.$message.confirm({
              title: '提示',
              content: '抱歉，只有实名认证用户才可以参加活动',
              okText: '去实名认证',
              onOk: () => {
                window.open('https://i.xinruiyun.cn/usercenter', '_self')
              }
            })
          } else {
            this.refreshQRFirst()
          }
          return
        } else {
          if (item.post.certification == 3) {
            window.open('https://i.xinruiyun.cn/usercenter', '_self')
          } else {
            window.open('https://m.xinruiyun.cn/faceindex', '_self')
          }
        }
      }
      let url = ''
      if (item.post.servicetype == 'db') {
        url = 'activity/judgeDatabase.do'
      } else {
        url = 'activity/jdugeTeam.do'
      }
      axios.get(url, {
        params: {
          sign: 'freeReceive',
          vmConfigId: item.post.id
        }
      }).then(response => {
        if (response.status == 200 && response.data.status == 1) {
          if (response.data.result.flag) {
            this.orderData = [item]
            // console.log(this.orderData)
            this.cashPledge = item.price
            this.showModal.rechargeHint = true
          } else {
            this.$message.info({
              content: response.data.result.info
            })
          }
        } else {
          this.$message.info({
            content: response.data.message
          })
        }
      })
    },
    nextStep (type) {
      if (type == 'p') {
        this.$http.post('device/DescribeWalletsBalance.do').then(response => {
          if (response.status == 200 && response.data.status == '1') {
            this.balance = Number(response.data.data.remainder)
            this.showModal.rechargeHint = false
            this.showModal.orderConfirmationModal = true
          } else {
            this.$message.info({
              content: response.data.message
            })
          }
        })
      } else {
        axios.get('/activity/createFreevmTemp.do', {
          params: {
            vmConfigId: this.orderData[0].post.id,
            osType: this.orderData[0].system[1],
            defzoneid: this.orderData[0].zoneId
          }
        }).then(res => {
          if (res.status == 200 && res.data.status == 1) {
            window.open('https://m.xinruiyun.cn/freeBuy', '_self')
          }
        })
      }
    },
    getHost_ok () {
      if (this.payWay == 'balancePay') {
        if (this.balance < this.cashPledge) {
          this.$Message.info('可用余额不足')
        } else {
          this.showModal.orderConfirmationModal = false
          this.serialNum = ''
          this.getFreeHost()
        }
      } else {
        switch (this.otherPayWay) {
          case '':
            this.$Message.info('请选择一个支付方式')
            break
          case 'zfb':
            window.open("about:blank", "alipay")
            this.$http.get('zfb/getzfbinfo.do', {
              params: {
                total_fee: this.cashPledge
              }
            }).then(res => {
              if (res.data.status == 1 && res.status == 200) {
                this.showModal.orderConfirmationModal = false
                this.serialNum = res.data.serialNum
                localStorage.setItem('serialNum', this.serialNum)
                window.open(null, 'alipay').location.href = `https://i.xinruiyun.cn/zfb/alipaypage.do?serialNum=${this.serialNum}&route=rechargeresult`
                this.showModal.rechargeHintzfb = true
              } else {
                this.$message.info({
                  content: res.data.message
                })
              }
            })
            break
          case 'wx':
            axios.get('wx/wxpayapi.do', {
              params: {
                total_fee: this.cashPledge
              }
            }).then(response => {
              if (response.status == 200 && response.data.status == 1) {
                this.serialNum = response.data.result.serialNum
                this.config.value = response.data.result.codeUrl
                this.showModal.orderConfirmationModal = false
                this.showModal.weChatRechargeModal = true
              } else {
                this.$message.info({
                  content: response.data.message
                })
              }
            })
            break
        }
      }
    },
    isPay () {
      axios.get('user/payStatus.do', {
        params: {
          serialNum: this.serialNum
        }
      }).then(response => {
        this.showModal.weChatRechargeModal = false
        if (response.status == 200 && response.data.status == 1) {
          this.showModal.paySuccessModal = true
        } else {
          this.showModal.payDefeatedModal = true
        }
      })
    },
    isPayzfb () {
      this.showModal.rechargeHintzfb = false
      this.loading = true
      this.loadingMessage = '正在支付，请稍后...'
      this.$http.get('user/payStatus.do', {
        params: {
          serialNum: this.serialNum
        }
      }).then(response => {
        if (response.status == 200 && response.data.status == 1) {
          this.loading = false
          this.showModal.paySuccessModal = true
        } else {
          this.loading = false;
          this.$message.info({
            content: response.data.message
          })
        }
      })
    },
    payWayChange () {
      if (this.payWay == 'otherPay' && this.otherPayWay == '') {
        this.otherPayWay = 'zfb'
      } else if (this.payWay == 'balancePay') {
        this.otherPayWay = ''
      }
    },
    getFreeHost () {
      let servicetype = this.orderData[0].post.servicetype
      let url = ''
      let params = {}
      let text = ''
      let pushurl = ''
      if (servicetype == 'db') {
        url = 'activity/getFreeDBNew.do'
        params = {
          vmConfigId: this.orderData[0].post.id,
          dbVersion: this.orderData[0].system[0],
          defzoneid: this.orderData[0].zoneId,
          serialNum: this.serialNum
        }
        text = '云数据库'
        pushurl = 'clouddatabase'
      } else if (servicetype == 'G5500') {
        url = 'activity/getFreeGPUNew.do'
        params = {
          vmConfigId: this.orderData[0].post.id,
          osType: this.orderData[0].system[1],
          defzoneid: this.orderData[0].zoneId,
          serialNum: this.serialNum
        }
        text = 'GPU服务器'
        pushurl = 'gpulist'
      } else {
        url = 'activity/getFreeHostNew.do'
        params = {
          vmConfigId: this.orderData[0].post.id,
          osType: this.orderData[0].system[1],
          defzoneid: this.orderData[0].zoneId,
          serialNum: this.serialNum
        }
        text = '云服务器'
        pushurl = 'host'
      }
      this.showModal.paySuccessModal = false
      axios.get(url, {
        params
      }).then(res => {
        if (res.status == 200 && res.data.status == 1) {
          // this.showModal.getSuccessModal = true
          this.$message.confirm({
            title: '提示',
            content: `恭喜您保证金已冻结完成，${text}领取成功，${text}在实名认证之前只可保留3天，请尽快使用。`,
            okText: `查看${text}`,
            onOk: () => {
              window.open('https://i.xinruiyun.cn/' + pushurl, '_self')
            }
          })
          this.toggleZone(this.orderData[0].zoneId)
        } else {
          this.$message.info({
            content: res.data.message
          })
        }
      })
    },
    changConfigGPUD (item) {
      item.post = item.postArr[item.gpuConfigIndex]
      this.getPriceD(item)
    },
    changeBandwith (val, item) {
      if (val == 2) {
        item.timeList = [30, 90, 180, 360, 720]
      } else {
        item.timeList = [360]
      }
      item.time = item.timeList[0]
      this.getRenewPrice(item)
    },
    getRenewPrice (item) {
      let url = 'activity/getRenewalOriginalPrice.do'
      axios.get(url, {
        params: {
          cpu: item.cpu,
          mem: item.memery,
          bandwith: item.bandwidth,
          days: item.time,
          activityNum: '60'
        }
      }).then(res => {
        if (res.data.status == 1 && res.status == 200) {
          item.price = res.data.result.cost
          item.originPrice = res.data.result.originalPrice
        }
      })
    },
    monthD (val) {
      let text = ''
      if (val >= 360) {
        text = '年'
        if (val / 360 > 1) {
          text = val / 360 + '年'
        }
      } else if (val >= 30) {
        text = '月'
        if (val / 30 > 1) {
          text = val / 30 + '个月'
        }
      } else {
        text = '天'
        if (val > 1) {
          text = val + '天'
        }
      }
      return text
    },
    titleD (val) {
      let result = ''
      switch (val.servicetype) {
        case 'host':
          if (val.days == 360) {
            result = '包年云服务器'
          } else if (val.days == 30)
            result = '包月云服务器'
          break
        case 'db':
          result = '云数据库'
          break
        case 'G5500':
          result = 'GPU服务器'
          break
        default:
          result = ''
      }
      return result
    },
    renewtime (val) {
      let text = ''
      if (val >= 360) {
        text = val / 360 + '年'
      } else if (val >= 30) {
        text = val / 30 + '个月'
      }
      return text
    },
    //结束

    toggleZone (zoneId) {
      // 切换默认区域
      axios.get('user/setDefaultZone.do', { params: { zoneId: zoneId } }).then(response => {
      })
      for (var zone of this.$store.state.zoneList) {
        if (zone.zoneid == zoneId) {
          $store.commit('setZone', zone);
        }
      }
    },
    judgeUserFlow () {
      this.$http.get('user/GetUserInfo.do', { params: { t: new Date().getTime() } }).then(res => {
        if (res.data.status === 1) {
          if (res.data.authInfo && res.data.authInfo.status) {
            this.onStep = res.data.authInfo.status
          } else {
            this.onStep = 1
          }
        } else {
          this.onStep = 0
        }
      })
    },

    changConfigHost (config) {
      let originLength = this.configLength
      this.configLength = config.split(',').length
      this.selectConfig = config
      if (this.configLength != originLength) {
        this.changzone(this.hostZoneList[0])
      }
    },
    changConfigGPU (config) {
      let originLength = this.configLength
      this.configLength = config.split(',').length
      this.selectConfig = config
      if (this.configLength != originLength) {
        this.changzone(this.gpuZoneList[0])
      }
    },
    changzone (item, name) {
      this.selectZone = item.zoneid
      this.setTemplateHost(item)
      if (name == '北方一区') {
        this.hideconfig = true
      } else {
        this.hideconfig = false
      }
    },
    getZoneList () {
      axios.get('information/zone.do', { params: { buy: '1', t: new Date().getTime() } }).then(res => {
        if (res.status == 200 && res.data.status == 1) {
          this.hostZoneList = res.data.result.filter(item => {
            return item.gpuserver == 0
          })
          this.gpuZoneList = res.data.result.filter(item => {
            return item.gpuserver == 1
          })
          this.changzone(this.hostZoneList[0])
          this.queryCustomVM()
          this.queryDiskPrice()
          this.queryIPPrice()
        }
      })
    },
    // 查询自定义云服务器价格
    queryCustomVM () {
      var params = {}
      if (this.selectConfig.split(',').length == 3) {
        //gpu
        params = {
          cpuNum: this.selectConfig.split(',')[0],
          diskSize: '128',
          diskType: 'ssd',
          memory: this.selectConfig.split(',')[1],
          timeType: this.selectTime < 12 ? 'month' : 'year',
          timeValue: this.selectTime < 12 ? this.selectTime : this.selectTime / 12,
          zoneId: this.selectZone,
          gpu: '100',
          gpuSize: this.selectConfig.split(',')[2],
        }
      } else if (this.selectConfig.split(',').length == 2) {
        // 云服务器
        params = {
          cpuNum: this.selectConfig.split(',')[0],
          diskSize: '40',
          diskType: 'ssd',
          memory: this.selectConfig.split(',')[1],
          timeType: this.selectTime < 12 ? 'month' : 'year',
          timeValue: this.selectTime < 12 ? this.selectTime : this.selectTime / 12,
          zoneId: this.selectZone,
        }
      }
      axios.post('device/QueryBillingPrice.do', params).then(response => {
        this.vmCost = response.data.cost
        if (response.data.coupon) {
          this.vmCoupon = response.data.coupon
        } else {
          this.vmCoupon = 0
        }
      })
    },
    // 磁盘页面数据盘价格
    queryDiskPrice () {
      var params = {
        cpuNum: '0',
        diskSize: this.selectedSSD,
        diskType: 'ssd',
        memory: '0',
        timeType: this.selectTime < 12 ? 'month' : 'year',
        timeValue: this.selectTime < 12 ? this.selectTime : this.selectTime / 12,
        zoneId: this.selectZone,
      }
      axios.post('device/QueryBillingPrice.do', params).then(response => {
        this.dataDiskCost = response.data.cost
        if (response.data.coupon) {
          this.coupon = response.data.coupon
        } else {
          this.coupon = 0
        }
      })
    },
    // 查询数据库IP价格
    queryIPPrice () {
      var params = {
        brand: this.selectBandWidth,
        timeType: this.selectTime < 12 ? 'month' : 'year',
        timeValue: this.selectTime < 12 ? this.selectTime : this.selectTime / 12,
        zoneId: this.selectZone
      }
      axios.post('device/queryIpPrice.do', params).then(response => {
        this.ipCost = response.data.cost
        if (response.data.coupon) {
          this.ipCoupon = response.data.coupon
        } else {
          this.ipCoupon = 0
        }
      })
    },
    pushOrderGpu (type) {
      if (!this.$store.state.userInfo) {
        if (type == 'p') {
          this.$LR({ type: 'register' })
        } else {
          window.open('https://m.xinruiyun.cn/login', '_self')
        }
        return
      }
      let params = {
        zoneId: this.selectZone,
        templateId: this.selectSummarySystem[1],
        bandWidth: this.selectBandWidth,
        timeType: this.selectTime < 12 ? 'month' : 'year',
        timeValue: this.selectTime < 12 ? this.selectTime : this.selectTime / 12,
        count: this.count,
        isAutoRenew: '1',
        cpuNum: this.selectConfig.split(',')[0],
        memory: this.selectConfig.split(',')[1],
        networkId: 'no',
        rootDiskType: 'ssd',
        vpcId: 'no',
        gpusize: this.selectConfig.split(',')[2],
        serviceType: 'G5500',
        diskType: 'ssd',
        diskSize: this.selectedSSD
      }
      // console.log(params)
      axios.get('gpuserver/createGpuServer.do', { params }).then(response => {
        if (response.status == 200 && response.data.status == 1) {
          if (type == 'p') {
            window.open('https://i.xinruiyun.cn/order', '_self')
          } else {
            window.open('https://m.xinruiyun.cn/orderconfirm', '_self')
          }
        } else {
          this.$message.info({
            content: response.data.message
          })
        }
      })
    },
    // 购买云服务器
    pushOrderHost (type) {
      if (!this.$store.state.userInfo) {
        if (type == 'p') {
          this.$LR({ type: 'register' })
        } else {
          window.open('https://m.xinruiyun.cn/login', '_self')
        }
        return
      }
      let params = {
        zoneId: this.selectZone,
        templateId: this.selectSummarySystem[1],
        bandWidth: this.selectBandWidth,
        timeType: this.selectTime < 12 ? 'month' : 'year',
        timeValue: this.selectTime < 12 ? this.selectTime : this.selectTime / 12,
        count: this.count,
        isAutoRenew: '1',
        cpuNum: this.selectConfig.split(',')[0],
        memory: this.selectConfig.split(',')[1],
        networkId: 'no',
        rootDiskType: 'ssd',
        vpcId: 'no',
        diskType: 'ssd',
        diskSize: this.selectedSSD
      }
      // console.log(params)
      axios.get('information/deployVirtualMachine.do', { params }).then(response => {
        if (response.status == 200 && response.data.status == 1) {
          if (type == 'p') {
            window.open('https://i.xinruiyun.cn/order', '_self')
          } else {
            window.open('https://m.xinruiyun.cn/orderconfirm', '_self')
          }
        } else {
          this.$message.info({
            content: response.data.message
          })
        }
      })
    },
    setTemplateHost (item) {
      let params = {}
      if (item.gpuserver == 1) {
        params = {
          user: '0',
          gpu: '1',
          normalTemplate: '0',
          zoneId: item.zoneid,
        }
      } else {
        params = {
          user: '0',
          normalTemplate: '1',
          zoneId: item.zoneid,
        }
      }
      axios.get('information/listTemplates.do', {
        params
      }).then(res => {
        if (res.status == 200 && res.data.status == 1) {
          var obj = this.cascaderSystemM(res.data.result, this.summarySystemList, this.selectSummarySystem)
          this.selectSummarySystem = obj
        }
      })
    },
    // 处理级联选择组件需要的数据格式
    cascaderSystemM (responseData, obj, selectobj) {
      var x;
      for (x in responseData) {
        obj.forEach(item => {
          if (item.value == x) {
            item.children = responseData[x]
          }
        })
      }
      obj.forEach(item => {
        item.children.forEach(item => {
          item.value = item.systemtemplateid
          item.label = item.templatename
        })
      })
      // 为空的系统不能点击
      obj.forEach((item, index) => {
        if (item.children.length == 0) {
          item.disabled = true
        }
      })
      selectobj = ['window', responseData.window[0].systemtemplateid]
      return selectobj
    },
    // 刷新用户认证状态
    refreshUserStatus () {
      clearInterval(this.codeTimer)
      this.codeTimer = setInterval(() => {
        this.$http.get('/faceRecognition/getAllStatus.do', { params: { tempCode: this.tempCode } }).then(res => {
          if (res.status == 200 && res.data.status == 1) {
            if (res.data.result.qrCode == 0) {
              this.codeLoseEfficacy = 'lose'
            }
            if (res.data.result.qrCode == 2) {
              this.codeLoseEfficacy = 'scanSuccess'
            }
            if (res.data.result.authStatus == 1) {
              this.init()
              this.showModal.qrCode = false
              clearInterval(this.codeTimer)
            }
            if (res.data.result.authStatus == 0) {
              this.authStatus = true
            } else if (res.data.result.authStatus == 3) {
              // this.showModal.authHint = true
              this.$message.confirm({
                title: '提示',
                content: '抱歉，人脸识别实名认证失败！您也可以前往用户中心上传身份证照片进行实名认证。',
                okText: '去实名认证',
                onOk: () => {
                  window.open('https://i.xinruiyun.cn/usercenter', '_self')
                }
              })
            }
          }
        })
      }, 3000)
    },
    // 刷新二维码状态状态
    refreshQRCode: throttle(1000, function () {
      this.authStatus = false
      this.tempCode = this.uuid(6, 16)
      let url = '/faceRecognition/getUserInfoByPcQRCode.do'
      let config1 = {
        phone: this.userInfo.phone ? this.userInfo.phone : this.formCustom.VerificationPhone,
      }
      let params = {
        faceType: '1',
        tempCode: this.tempCode
      }
      params.config = JSON.stringify(config1)
      axios.post(url, params).then(res => {
        if (res.status == 200 && res.data.status == 1) {
          this.$Message.success('刷新成功')
          this.qrConfig.value = res.data.result.url
          this.codeLoseEfficacy = ''
        } else {
          this.codeLoseEfficacy = 'lose'
        }
      })
    }),
    //短信验证码
    getPhoneCode (codeType) {
      if (!this.userInfo.phone && !this.regExpObj.phone.test(this.formCustom.VerificationPhone)) {
        this.$Message.info('请输入正确的手机号')
        return
      }
      if (this.formCustom.VerificationPhone) {
        axios.get('user/isRegister.do', {
          params: {
            username: this.formCustom.VerificationPhone
          }
        }).then(res => {
          if (res.status === 200 && res.data.status === 1) {
            this.$refs.cashverification.validateField('Verificationcode', (text) => {
              if (text == '') {
                var url = ''
                if (codeType == 'code' || codeType == 'againCode' && this.formCustom.newCodeText == '获取验证码') {
                  url = 'user/code.do'
                } else if (codeType == 'voice' && this.formCustom.newCodeText == '获取验证码') {
                  url = 'user/voiceCode.do'
                } else {
                  return false
                }
                axios.get(url, {
                  params: {
                    aim: this.formCustom.VerificationPhone,
                    isemail: 0,
                    vailCode: this.formCustom.Verificationcode
                  }
                }).then(response => {
                  // 发送成功，进入倒计时
                  if (response.status == 200 && response.data.status == 1) {
                    var countdown = 60
                    this.formCustom.newCodeText = `${countdown}S`
                    var Interval = setInterval(() => {
                      countdown--
                      this.formCustom.newCodeText = `${countdown}S`
                      if (countdown == 0) {
                        clearInterval(Interval)
                        this.formCustom.newCodeText = '获取验证码'
                      }
                    }, 1000)
                  } else {
                    this.$message.info({
                      content: response.data.message
                    })
                    this.imgSrc = `user/getKaptchaImage.do?t=${new Date().getTime()}`
                    this.formCustom.Verificationcode = ''
                  }
                })
              }
            })
          } else {
            this.$Message.info('该手机号已被使用')
          }
        })
      }
    },
    Callpresentation () {
      this.$refs.cashverification.validateField('messagecode', (text) => {
        if (text == '') {
          let url = 'user/judgeCode.do'
          let params = {}
          if (this.formCustom.VerificationPhone) {
            params = {
              aim: this.formCustom.VerificationPhone,
              isemail: 0,
              code: this.formCustom.messagecode
            }
          }
          axios.get(url, {
            params
          }).then(res => {
            if (res.data.status == 1 && res.status == 200) {
              if (this.phoneVerifyType === 'identification') {
                this.showModal.cashverification = false
                this.tempCode = this.uuid(6, 16)
                let url = '/faceRecognition/getUserInfoByPcQRCode.do'
                let config = {
                  phone: this.userInfo.phone ? this.userInfo.phone : this.formCustom.VerificationPhone,
                }
                axios.post(url, {
                  faceType: '1',
                  config: JSON.stringify(config),
                  tempCode: this.tempCode
                }).then(res => {
                  if (res.status == 200 && res.data.status == 1) {
                    this.qrConfig.value = res.data.result.url
                    this.showModal.qrCode = true
                    this.codeLoseEfficacy = ''
                    this.refreshUserStatus()
                  } else {
                    this.codeLoseEfficacy = 'lose'
                    this.showModal.qrCode = true
                    this.refreshUserStatus()
                  }
                })
              }
            } else {
              this.$message.info({
                content: res.data.message
              })
            }
          })
        }
      })
    },
    uuid (len, radix) {
      var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
      var uuid = [], i;
      radix = radix || chars.length;

      if (len) {
        // Compact form
        for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
      } else {
        // rfc4122, version 4 form
        var r;

        // rfc4122 requires these characters
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
        uuid[14] = '4';

        // Fill in random data.  At i==19 set the high bits of clock sequence as
        // per rfc4122, sec. 4.1.5
        for (i = 0; i < 36; i++) {
          if (!uuid[i]) {
            r = 0 | Math.random() * 16;
            uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
          }
        }
      }
      return uuid.join('');
    },
    toAuthPage () {
      this.showModal.authHint = false
      var paneStatue = {
        vpc: 'VPC',
        vpn: 'remote',
        usercenter: 'certification',
        expenses: 'accountSummary'
      }
      window.open('https://i.xinruiyun.cn/usercenter', '_self')
      this.$store.commit('setPane', paneStatue)
    }
  },
  computed: {
    totalDataCost () {
      return this.vmCost + this.ipCost + this.dataDiskCost
    },
    authInfo () {
      return this.$store.state.authInfo ? this.$store.state.authInfo : null
    },
    authInfoPersion () {
      return this.$store.state.authInfoPersion
    },
    userInfo () {
      return this.$store.state.userInfo
    },
    disabled () {
      if (this.formCustom.Verificationcode == '' || this.formCustom.messagecode == '') {
        return true
      } else {
        return false
      }
    }
  },
  watch: {
    'selectZone': {
      handler () {
        this.queryCustomVM()
        this.queryDiskPrice()
        this.queryIPPrice()
      },
      deep: true
    },
    'selectTime': {
      handler () {
        this.queryCustomVM()
        this.queryDiskPrice()
        this.queryIPPrice()
      },
      deep: true
    },
    'selectConfig': {
      handler () {
        this.queryCustomVM()
      },
      deep: true
    },
    'selectedSSD': {
      handler () {
        this.queryDiskPrice()
      },
      deep: true
    },
    'selectBandWidth': {
      handler () {
        this.queryIPPrice()
      },
      deep: true
    },
    // select组件，选中的值不在选项中，不清空选中数据的bug
    'configLength': {
      handler (val) {
        if (val == 2) {
          this.single = '选择云服务器'
          let dom = this.$refs['summary-host-select']
          dom.getElementsByClassName('ivu-select-placeholder')[0].style.display = "block"
          dom.getElementsByClassName('ivu-select-selected-value')[0].style.display = "none"
        } else if (val == 3) {
          this.single = '选择GPU服务器'
          let dom = this.$refs['summary-host-select']
          dom.getElementsByClassName('ivu-select-placeholder')[0].style.display = "none"
          dom.getElementsByClassName('ivu-select-selected-value')[0].style.display = "block"
        }
      },
      deep: true
    },
    'single': {
      handler (val) {
        if (val == '选择云服务器') {
          this.changConfigHost('1,1')
        } else if (val == '选择GPU服务器') {
          this.changConfigGPU('8,64,1')
        }
      },
      deep: true
    }
  },
  components: {
    VueQArt
  },
  beforeRouteLeave (to, from, next) {
    clearInterval(this.codeTimer)
    next()
  }
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
.flex {
  display: flex;
  justify-content: center;
}
.flex-col {
  display: flex;
  align-items: center;
}
.wrap {
  margin: 0 auto;
  width: 1260px;
}
.headline {
  padding: 50px 0 30px 0;
  color: #0f0f68;
  line-height: 1;
  h2 {
    font-size: 32px;
  }
  p {
    margin-top: 12px;
    font-size: 16px;
  }
}
.free-host {
  margin: 0 auto;
  padding: 60px 0 40px;
  background: url("../../../assets/img/active/freeToReceive.1/free-host-bg.png")
      top no-repeat,
    url("../../../assets/img/active/freeToReceive.1/circle-left.png") 0% 500px
      no-repeat,
    url("../../../assets/img/active/freeToReceive.1/circle-right.png") 100%
      800px no-repeat;
  background-color: #395fc5;
  text-align: center;
  .main {
    margin-top: 40px;
  }
  .tabs {
    display: flex;
    > div {
      flex-grow: 1;
      width: 50%;
      // width: 50%;
      &.selected,
      &:hover {
        > span {
          background: linear-gradient(
            160deg,
            rgba(145, 255, 223, 1) 0%,
            rgba(69, 191, 255, 1) 100%
          );
        }
        a {
          background: rgba(242, 248, 255, 1);
        }
      }
      > span {
        display: block;
        height: 6px;
      }
      a {
        display: block;
        padding-top: 20px;
        height: 64px;
        font-family: MicrosoftYaHei;
        color: rgba(52, 57, 101, 1);
        background: rgba(218, 221, 237, 1);
        span {
          font-weight: bold;
          font-size: 20px;
          display: block;
        }
        i {
          display: inline-block;
          margin-top: 4px;
          font-size: 12px;
          font-style: normal;
        }
      }
    }
  }
  .container {
    width: 100%;
    padding: 30px 10px 30px 30px;
    background: rgba(242, 248, 255, 1);
  }
}
.summary-host {
  line-height: 1;
  padding-bottom: 40px;
  text-align: center;
  // height: 839px;
  padding-bottom: 50px;
  background: #f2f8ff
    url("../../../assets/img/active/freeToReceive.1/summary-host-bg.png") center
    no-repeat;
  background-size: cover;
  .product {
    text-align: left;
    > div {
      margin: 0 auto;
      width: 1120px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 6px 20px -6px rgba(13, 48, 130, 0.49);
      border-radius: 8px;
    }
    .head {
      height: 80px;
      padding-left: 40px;
      line-height: 80px;
      color: #fff;
      background: url("../../../assets/img/active/freeToReceive.1/summary-product-bg.png")
        no-repeat;
      background-size: cover;
      border-radius: 10px 10px 0 0;
      h3 {
        font-size: 22px;
      }
      span {
        font-size: 14px;
      }
    }
    .body {
      padding: 0 40px;
      background: #fff;
      display: flex;
      justify-content: space-between;
      .label {
        display: block;
        margin-bottom: 20px;
        font-size: 18px;
        color: #4768b1;
      }
      .left {
        padding-top: 40px;
        width: 50%;
        > div {
          margin-bottom: 40px;
        }
      }
      .right {
        padding-top: 20px;
        padding-bottom: 30px;
        > div {
          margin-bottom: 20px;
        }
      }
      .configure,
      .area,
      .ssd {
        ul {
          display: flex;
          flex-wrap: wrap;
          width: 100%;
          li {
            width: 110px;
            height: 34px;
            margin-right: 12px;
            margin-bottom: 10px;
            line-height: 32px;
            border-radius: 2px;
            border: 1px solid rgba(125, 161, 217, 1);
            text-align: center;
            color: #4b3c3d;
            cursor: pointer;
            font-size: 14px;
          }
          .selected {
            background: #387dff;
            color: #fff;
          }
        }
      }
      .configure,
      .area {
        ul {
          li {
            &:nth-child(4n) {
              margin-right: 0;
            }
          }
        }
      }
      .configure {
        .tips {
          color: #4768b1;
          font-size: 14px;
        }
      }
      .ssd {
        ul {
          li {
            // margin-bottom: 0;
            width: 74px;
            &:nth-child(5n) {
              margin-right: 0;
            }
          }
        }
      }
      .price {
        color: #e70520;
        font-size: 14px;
        span {
          font-size: 24px;
          font-weight: bold;
        }
      }
      button {
        width: 100%;
        background: #f66d59;
        border-radius: 4px;
        border: none;
        color: #fff;
        height: 40px;
        font-size: 18px;
      }
    }
  }
}

.under-line {
  text-decoration: underline;
}

.deposite-host {
  // background: blue;
  .product {
    margin: 0 auto;
    // background:violet;
    display: flex;
    flex-wrap: wrap;
    text-align: left;
    width: 1220px;
    > div {
      width: 224px;
      margin-right: 20px;
      margin-bottom: 20px;
      box-shadow: 0px 3px 10px -3px rgba(195, 205, 230, 0.7);
      border: 1px solid rgba(220, 226, 242, 1);
      background: #fff;
      &:nth-of-type(1) .head {
        background: url("../../../assets/img/active/deposit/head-bg-1.png")
          no-repeat;
        background-size: cover;
      }
      &:nth-of-type(2) .head {
        background: url("../../../assets/img/active/deposit/head-bg-2.png")
          no-repeat;
        background-size: cover;
      }
      &:nth-of-type(3) .head {
        background: url("../../../assets/img/active/deposit/head-bg-3.png")
          no-repeat;
        background-size: cover;
      }
      &:nth-of-type(4) .head {
        background: url("../../../assets/img/active/deposit/head-bg-4.png")
          no-repeat;
        background-size: cover;
      }
      &:nth-of-type(5) .head {
        background: url("../../../assets/img/active/deposit/head-bg-5.png")
          no-repeat;
        background-size: cover;
      }
    }
    .head {
      position: relative;
      padding: 0 46px 0 20px;
      height: 80px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      color: #fff;
      h3 {
        font-size: 18px;
      }
      p {
        margin-top: 6px;
        display: flex;
        justify-content: space-between;
      }
      > span {
        display: inline-block;
        line-height: 20px;
        font-size: 12px;
        text-align: center;
        &:nth-of-type(1) {
          position: absolute;
          right: 0;
          top: 0;
        }
      }
      .cer {
        width: 86px;
        background: linear-gradient(
          270deg,
          rgba(255, 57, 42, 1) 0%,
          rgba(255, 189, 118, 1) 100%
        );
        color: #fff;
      }
    }
    .body {
      padding: 15px 20px 20px 20px;
      background: #fff;
      > div {
        margin-bottom: 10px;
      }
      .label {
        display: block;
        margin-bottom: 7px;
        width: 70px;
        font-size: 12px;
        color: #222274;
      }
      .label-db {
        line-height: 32px;
      }
      .configure {
        // margin-bottom: 10px;
        ul {
          display: flex;
          justify-content: space-between;
          li {
            color: #0f0f68;
            font-size: 12px;
            i {
              margin-bottom: 10px;
              display: block;
              font-style: normal;
            }
          }
        }
      }
      .mb15 {
        margin-bottom: 15px;
      }
      .mt5 {
        margin-top: 5px;
      }
      .price {
        color: #e70520;
        font-size: 14px;
        span {
          font-size: 24px;
          font-weight: bold;
        }
      }
      .origin-price {
        line-height: 1;
        font-size: 14px;
        color: #0f0f68;
      }
      .line-thr {
        text-decoration: line-through;
      }
      .btns {
        margin-bottom: 0px;
      }
      button {
        width: 100%;
        background: #f66d59;
        border: none;
        border-radius: 0px;
        color: #fff;
        height: 40px;
        font-size: 16px;
      }
    }
    .bodyt {
      padding-bottom: 0;
    }
    .bodyb {
      border-top: 1px solid rgba(220, 226, 242, 1);
    }
  }
  .tips {
    text-align: left;
    font-size: 16px;
    color: #4f557b;
    font-family: MicrosoftYaHei;
    span {
      cursor: pointer;
    }
    .blue {
      color: #5893ff;
    }
    .red {
      color: #f0624d;
    }
  }
  .dotask {
    border: 1px dashed #99c0ee;
    border-radius: 5px;
    padding: 10px 0 10px 16px;
    margin-right: 20px;
    padding-right: 10px;
    img {
      margin-right: 16px;
    }
    .tips {
      p {
        line-height: 24px;
      }
    }
  }
  .head-g {
    width: 583px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 20px;
    > div {
      margin-left: 20px;
      h3 {
        margin-bottom: 10px;
        font-size: 20px;
        font-weight: bold;
        color: rgba(71, 104, 177, 1);
        line-height: 1;
      }
      p {
        font-size: 14px;
        color: rgba(102, 102, 102, 1);
        line-height: 1.5;
        span {
          color: #5893ff;
        }
      }
    }
  }
  .renew {
    margin-top: 40px;
    text-align: left;
    .content {
      display: flex;
      justify-content: flex-start;
      .item {
        width: 583px;
        padding: 20px 0 20px 20px;
        box-shadow: 0px 3px 10px -3px rgba(195, 205, 230, 0.7);
        background: #fff;
        margin-bottom: 20px;
        position: relative;
        margin-right: 20px;
      }
      .icon-bg {
        position: absolute;
        top: 0;
        right: 0;
        width: 100px;
        height: 100px;
        background: url("../../../assets/img/active/deposit/right-top-icon.png")
          no-repeat top right;
      }
      .icon-text {
        width: 100px;
        height: 100px;
        transform: rotate(0.125turn);
        transform-origin: 10px 38px;
        color: #fff;
        text-align: center;
      }
      h4 {
        font-size: 20px;
        font-weight: bold;
        color: rgba(79, 85, 123, 1);
        line-height: 26px;
      }
      .box {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        // padding-right: 50px;
      }
      .left,
      .right {
        .row {
          display: flex;
          margin-top: 10px;
          i {
            display: inline-block;
            font-size: 12px;
            font-style: normal;
            color: rgba(102, 102, 102, 1);
            line-height: 30px;
            vertical-align: middle;
          }
          span {
            line-height: 30px;
          }
        }
      }
      .left {
        // margin-right: 100px;
        .row {
          i {
            width: 76px;
          }
          .bold {
            font-weight: bold;
          }
        }
      }
      .right {
        margin-right: 40px;
        span {
          font-size: 22px;
          font-weight: bold;
          color: rgba(255, 98, 75, 1);
        }
      }
    }
  }
  .update {
    padding-top: 20px;
    text-align: left;
    .content {
      display: flex;
      justify-content: flex-start;
      text-align: center;
      > div {
        width: 583px;
        margin-bottom: 20px;
        background: #fff;
        padding: 30px 0;
        box-shadow: 0px 3px 10px -3px rgba(195, 205, 230, 0.7);
        margin-right: 20px;
      }
      h4 {
        font-size: 20px;
        font-weight: bold;
        color: rgba(79, 85, 123, 1);
        line-height: 1;
      }
      .box {
        display: flex;
        justify-content: center;
        margin-top: 40px;
        .item {
          padding: 0 30px;
          color: rgba(71, 104, 177, 1);
          border-left: 1px rgba(216, 216, 216, 1) solid;
          &:nth-of-type(1) {
            border: none;
          }
          div {
            margin-bottom: 10px;
            font-size: 20px;
            line-height: 24px;
            .icon {
              display: inline-block;
              width: 39px;
              height: 24px;
              background: rgba(71, 104, 177, 1);
              border-radius: 12px 12px 0px 12px;
              color: #fff;
              font-size: 14px;
              line-height: 24px;
            }
          }
          p {
            font-size: 16px;
            line-height: 1.5;
            span {
              color: #ff624b;
            }
          }
        }
      }
    }
  }
}

// 弹窗公共样式
.overlay {
  padding: 0 10px;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(55, 55, 55, 0.3);
  height: 100%;
  z-index: 1000;
  > div {
    position: relative;
    margin: 0 auto;
    top: 15%;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    font-size: 14px;
  }
}
.rule-modal {
  width: 680px;
  .header {
    height: 66px;
    padding-top: 20px;
    padding-right: 20px;
    font-size: 20px;
    color: rgba(31, 31, 114, 1);
    text-align: center;
    span {
      margin-left: 20px;
    }
    img {
      float: right;
      cursor: pointer;
    }
  }
  .body {
    padding: 30px;
    padding-top: 0;
    text-align: left;
    font-size: 14px;
    color: rgba(31, 31, 114, 1);
    p {
      margin-bottom: 10px;
      line-height: 19px;
    }
    dl {
      margin-bottom: 10px;
      dd {
        line-height: 19px;
      }
    }
  }
  .footer {
    height: 60px;
    padding-top: 18px;
    background: rgba(242, 248, 255, 1);
    font-size: 18px;
    color: rgba(31, 31, 114, 1);
    text-align: center;
    span {
      cursor: pointer;
    }
  }
}

.low-discount {
  .product {
    // background: red;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    text-align: left;
    padding-bottom: 10px;
    > div {
      width: 224px;
      height: 380px;
      box-shadow: 0px 3px 10px -3px rgba(195, 205, 230, 0.7);
      border: 1px solid rgba(220, 226, 242, 1);
      margin-bottom: 20px;
      margin-right: 20px;
    }
    .head {
      height: 65px;
      padding: 25px 0 0 16px;
      background: #fff;
      position: relative;
      h3 {
        font-size: 18px;
      }
      .icon-bg {
        position: absolute;
        top: 0;
        right: 0;
        width: 65px;
        height: 65px;
        background: url("../../../assets/img/active/deposit/low-icon-bg.png")
          no-repeat top right;
      }
      .icon-text {
        width: 65px;
        height: 65px;
        transform: rotate(0.125turn);
        transform-origin: 14px 26px;
        color: #fff;
        text-align: center;
      }
    }

    .body {
      padding: 10px 16px 20px 16px;
      background: #fff;
      > div {
        margin-bottom: 15px;
        display: flex;
        line-height: 32px;
        font-size: 14px;
        .select-w {
          width: 142px;
        }
      }
      // .mb0 {
      //   margin-bottom: 0;
      // }
      .label {
        display: block;
        width: 44px;
        line-height: 32px;
        font-size: 14px;
        color: rgba(102, 102, 102, 1);
      }
      .configure {
        ul {
          display: flex;
          justify-content: space-between;
          li {
            i {
              margin-bottom: 10px;
              display: block;
              font-style: normal;
              color: #0f0f68;
              font-size: 12px;
            }
            span {
              color: #0f0f68;
              font-size: 18px;
              span {
                font-size: 14px;
              }
            }
          }
        }
      }
      .time {
        ul {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          li {
            position: relative;
            width: 70px;
            height: 34px;
            margin-bottom: 10px;
            line-height: 32px;
            border: 1px solid rgba(125, 161, 217, 1);
            text-align: center;
            color: #4b3c3d;
            cursor: pointer;
            &:nth-of-type(1) {
              border-right: none;
            }
            &:nth-child(3n + 3) {
              margin-right: 0;
            }
            span {
              position: absolute;
              top: -14px;
              right: 5px;
              display: inline-block;
              width: 38px;
              height: 20px;
              background: rgba(246, 109, 89, 1);
              font-size: 14px;
              color: rgba(255, 255, 255, 1);
              line-height: 19px;
            }
          }
          .selected {
            background: rgba(56, 125, 255, 1);
            color: #fff;
          }
        }
      }
      .price {
        color: #e70520;
        font-size: 12px;
        span {
          font-size: 24px;
          font-weight: bold;
        }
      }
      .origin-price {
        font-size: 12px;
        color: #0f0f68;
        text-decoration: line-through;
      }
      button {
        width: 100%;
        background: #f66d59;
        border: none;
        border-radius: 0px;
        color: #fff;
        height: 40px;
        font-size: 18px;
      }
    }
    .gpu-body {
      >div {
        margin-bottom: 10px;
      }
    }
    .coupen {
      > div {
        display: block;
        div {
          padding-left: 10px;
          border-radius: 2px;
          border: 1px dashed rgba(125, 161, 217, 1);
        }
      }
      .label {
        display: inline-block;
        width: 70px;
      }
    }
  }
  .tips {
    margin-top: 15px;
    text-align: left;
    font-size: 16px;
    color: #4f557b;
    line-height: 1;
    span {
      cursor: pointer;
    }
    .blue {
      color: #5893ff;
    }
    .red {
      color: #f0624d;
    }
  }
}

@media screen and (max-width: 1280px) {
  .wrap {
    width: 100%;
  }
  .wrap-inner {
    width: 100%;
  }
  .deposite-host .product,
  .low-discount .product {
    width: 978px;
  }

  .summary-host {
    .wrap {
      padding: 0 20px;
      width: 100%;
    }
    .product {
      > div {
        width: 100%;
      }
      .body {
        display: flex;
        flex-direction: column;
        // align-items: center;
        .left {
          width: 100%;
          > div {
            margin-bottom: 20px;
          }
        }
        .right {
          padding-top: 0;
        }
        .configure,
        .area {
          ul {
            li {
              &:nth-child(4n) {
                margin-right: 12px;
              }
            }
          }
        }
      }
    }
  }
}
@media screen and (max-width: 1028px) {
  .deposite-host,
  .low-discount {
    .product {
      width: 732px;
    }
  }
}
@media screen and (max-width: 786px) {
  .deposite-host,
  .low-discount {
    .product {
      width: 488px;
    }
  }
}
@media screen and (max-width: 1020px) {
  .pc {
    display: none;
  }
  .mobile {
    display: inline-block;
  }
  .head-g {
    margin: 0 auto;
  }
  .deposite-host .renew .content {
    flex-wrap: wrap;
    justify-content: center;
    .item {
      margin-right: 0;
    }
  }
  .deposite-host .update .content {
    flex-wrap: wrap;
    justify-content: center;
    > div {
      margin-right: 0;
    }
  }
}
@media screen and (min-width: 1021px) {
  .pc {
    display: inline-block;
  }
  .mobile {
    display: none;
  }
}

@media screen and (max-width: 700px) {
  .rule-modal {
    width: 100%;
  }
}
.pc-640 {
  display: block;
}
.mobile-640 {
  display: none;
}
.pc-640-inline {
  display: inline-block;
}
.mobile-640-inline {
  display: none;
}
.person-check {
  .w300 {
    width: 300px;
  }
}

.modal-p {
  > div {
    margin-left: 60px;
  }
  > p {
    span {
      font-size: 16px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      line-height: 22px;
      margin-left: 10px;
      position: relative;
      bottom: 18px;
    }
    margin: 50px 0;
    text-align: center;
  }
  .payInfo {
    margin-top: 50px;
    display: flex;
    .pay-p {
      p {
        font-size: 16px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 22px;
        margin: 30px 40px;
        span {
          font-size: 36px;
          font-weight: 600;
          color: rgba(208, 2, 27, 1);
        }
      }
    }
  }
}
.pay-wap {
  padding: 20px;
  > p {
    font-size: 14px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    margin-bottom: 10px;
  }
  .pw-img {
    img {
      display: inline-block;
      margin-right: 20px;
      cursor: pointer;
      position: relative;
      top: 12px;
      border: 1px solid #fff;
      &.selected {
        border: 1px solid rgba(74, 144, 226, 1);
      }
    }
  }
}
.qrcode-modal {
  text-align: center;
  .qr-code {
    height: 198px;
    width: 197px;
    background: url("../../../assets/img/app/auth_background.png") no-repeat
      center;
    margin: 30px auto;
    position: relative;
    .shade {
      position: absolute;
      top: 0;
      height: 198px;
      width: 197px;
      background: url("../../../assets/img/app/lose_efficacy.png") center;
      &.scanSuccess {
        background: url("../../../assets/img/app/scan_success.png") center;
      }
    }
  }
  > p {
    font-size: 14px;
    font-family: MicrosoftYaHei;
    color: rgba(51, 51, 51, 1);
    margin: 10px;
    > span {
      color: #ff624b;
    }
  }
  .p-top {
    font-family: MicrosoftYaHei-Bold;
    font-weight: bold;
    color: rgba(237, 64, 20, 1);
  }
  .p-bottom {
    margin-top: 14px;
    margin-bottom: 0;
    > span {
      color: #4297f2;
      cursor: pointer;
    }
  }
}
.wechat-modal {
  h3 {
    margin-bottom: 10px;
    color: #4768b1;
    font-size: 14px;
    line-height: 19px;
    font-weight: normal;
  }
  .content {
    display: flex;
    padding: 10px 20px;
    color: #4768b1;
    .center {
      height: 68px;
    }
    h4 {
      font-size: 14px;
      line-height: 19px;
      font-weight: normal;
      margin-bottom: 10px;
    }
    .wechat {
      width: 80px;
      margin-right: 28px;
      img {
        width: 60px;
        display: block;
      }
      h4 {
        width: 72px;
      }
    }
    .upload-btn {
      display: block;
      margin-bottom: 10px;
      font-size: 12px;
      color: rgba(74, 151, 238, 1);
      line-height: 16px;
      cursor: pointer;
    }
  }
  > span {
    display: inline-block;
    margin-top: 20px;
    margin-left: 20px;
    font-size: 12px;
    color: rgba(153, 153, 153, 1);
    line-height: 16px;
  }
}
.baidu-modal {
  h3 {
    margin-bottom: 20px;
    color: #4768b1;
    font-size: 14px;
    line-height: 19px;
    font-weight: normal;
  }
  .content {
    padding: 10px 18px;
    color: #4768b1;
    font-size: 14px;
    h4 {
      margin-bottom: 6px;
      color: rgba(71, 104, 177, 1);
      font-weight: normal;
    }
    a {
      font-size: 14px;
      color: rgba(88, 147, 255, 1);
      line-height: 24px;
      text-decoration: underline;
    }
    span {
      display: block;
      margin-bottom: 10px;
      font-size: 12px;
      color: #4a97ee;
      line-height: 1.5;
    }
    // div {
    //   display: flex;
    //   justify-content: space-between;
    //   .comment-btn {
    //     color: #5893ff;
    //     text-decoration: underline;
    //     cursor: pointer;
    //   }
    //   .upload-btn {
    //     font-size: 12px;
    //     color: #4a97ee;
    //     cursor: pointer;
    //   }
    // }
  }
  > span {
    display: inline-block;
    margin-top: 20px;
    margin-left: 18px;
    font-size: 12px;
    color: rgba(153, 153, 153, 1);
    line-height: 16px;
  }
}
.demo-upload-list {
  display: inline-block;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
.demo-upload-list img {
  width: 100%;
  height: 100%;
}
.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}
.demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
.check-modal {
  padding: 50px 0;
  text-align: center;
  font-size: 14px;
}
@media screen and (max-width: 640px) {
  .deposite-host .head-g {
    width: 100%;
  }
  .free-host .tabs > div a i {
    display: none;
  }
  .pc-640 {
    display: none;
  }
  .mobile-640 {
    display: block;
  }
  .pc-640-inline {
    display: none;
  }
  .mobile-640-inline {
    display: inline-block;
  }
  .person-check {
    .w300 {
      width: 150px;
    }
  }
  .free-host .container {
    padding: 30px 10px 10px 10px;
  }
  .deposite-host .renew .content {
    .box {
      flex-wrap: wrap;
    }
    .item {
      width: 100%;
    }
  }
  .deposite-host .wrap-inner,
  .low-discount .wrap-inner {
    width: 100%;
  }
  .deposite-host .product {
    width: 100%;
    > div {
      width: 100%;
      margin-right: 0px;
      background: #fff;
      &:nth-of-type(1) .head {
        background: url("../../../assets/img/active/deposit/head-bg-1m.png")
          no-repeat;
        background-size: cover;
      }
      &:nth-of-type(2) .head {
        background: url("../../../assets/img/active/deposit/head-bg-2m.png")
          no-repeat;
        background-size: cover;
      }
      &:nth-of-type(3) .head {
        background: url("../../../assets/img/active/deposit/head-bg-3m.png")
          no-repeat;
        background-size: cover;
      }
      &:nth-of-type(4) .head {
        background: url("../../../assets/img/active/deposit/head-bg-4m.png")
          no-repeat;
        background-size: cover;
      }
      &:nth-of-type(5) .head {
        background: url("../../../assets/img/active/deposit/head-bg-4m.png")
          no-repeat;
        background-size: cover;
      }
    }
    .body {
      .label {
        display: inline;
        margin-bottom: 0;
        line-height: 32px;
        width: 41px;
      }
    }
    .bodyb {
      > div {
        display: flex;
        .systemw {
          flex-grow: 1;
        }
      }
    }
  }
  .low-discount {
    .product {
      width: 100%;
      > div {
        width: 100%;
        margin-right: 0;
      }
      .body {
        > div .select-w {
          // width: 100%;
          flex-grow: 1;
        }
      }
    }
  }
  .summary-host {
    .wrap {
      padding: 0 10px;
    }
    .product {
      > div {
        box-shadow: none;
      }
      .body {
        padding: 0 10px;
      }
    }
  }
  .deposite-host{ 
    .dotask {
      display: flex;
      flex-direction: column;
      // justify-content: flex-start;
      align-items: flex-start;
      margin-right: 0px;
      padding-right: 0px;
    }
  }
  .wechat-modal .content .wechat {
    width: 200px;
    margin-right: 20px;
  }
  .wechat-modal .content {
    display: flex;
    flex-direction: column;
  }
}
</style>
