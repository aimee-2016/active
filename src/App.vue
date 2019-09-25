<template>
  <div id="front">
    <!-- <div class="app-hint" ref="hint" @click="$router.push('/ruicloud/AnniversaryActive')">
      <div class="center">
        <div class="countdown" v-if="hintShow">
          <p>{{ day }}<span>天</span>{{ hour }}<span>时</span>{{ minute }}<span>分</span>{{ second }}<span>秒</span></p>
        </div>
      </div>
      <img v-if="hintShow" @click="closeHeadHint" src="./assets/img/app/hint-icon1.png"/>
    </div> -->
    <!-- 首页公用header -->
    <header>
          <div class='pc-top'>
                <div class="pc-head">
                    <a class="navbar-brand logo" href="https://www.xinruiyun.cn/" alt='新睿云'>
                        <img src='./assets/img/home/logo.gif'>
                    </a>
                    <div class="p-collapse">
                        <div style="display: flex;">
                            <a class="p-link" href="https://help.xinruiyun.cn/" target="_blank">
                                帮助文档
                            </a>
                            <a class="p-link" href="https://www.xinruiyun.cn/news" target="_blank"> 
                                新闻动态
                            </a>
                            <a class="p-link pb" href='https://i.xinruiyun.cn/overview' title="控制台">
                                控制台
                            </a>
                            <div v-if='!userInfo'>
                                <a class="lg-in" href="https://i.xinruiyun.cn/login"  title="登录">登录</a>
                                <a class="lg-re" href="https://i.xinruiyun.cn/register" title="注册">注册</a>
                            </div>

                            <ul v-else class="user-list">
                                <li >
                                  <Dropdown @on-click="go">
                                    <a href="javascript:void(0)" class="user-fn">
                                      {{ userInfo?userInfo.realname:''}}
                                      <Icon type="arrow-down-b"></Icon>
                                    </a>
                                    <DropdownMenu slot="list">
                                      <DropdownItem name="usercenter">
                                        <a href="https://i.xinruiyun.cn/usercenter">用户中心</a>
                                      </DropdownItem>
                                      <DropdownItem name="expenses">
                                        <a href="https://i.xinruiyun.cn/expenses">费用中心</a>
                                      </DropdownItem>
                                      <DropdownItem name="msgcenter" style="position:relative">
                                        <a href="https://i.xinruiyun.cn/msgcenter">消息中心</a>
                                      </DropdownItem>
                                      <DropdownItem name="operationlog">
                                        <a href="https://i.xinruiyun.cn/operationlog">操作日志</a>
                                      </DropdownItem>
                                      <DropdownItem divided name="exit">
                                        <span style="color:#666;">退出</span>
                                      </DropdownItem>
                                    </DropdownMenu>
                                  </Dropdown>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="nav-list">
                    <ul class="nav-left" @mouseleave='styleClass(-1,$event)'>
                        <li class="nav-item" @mouseenter='styleClass(0,$event)'>
                            <router-link to="/" title="活动中心">活动中心</router-link>
                        </li>
                        <li class="nav-item" @mouseenter='styleClass(1,$event)'>
                            <a href="https://www.xinruiyun.cn/">首页</a>
                        </li>
                        <Poptip placement="bottom-start" trigger="hover">
                            <li class="nav-item active" @mouseenter='styleClass(-1,$event)'>
                                <a>云计算</a>
                            </li>
                            <ul slot="content" class="np-bs" v-cloak>
                                <li class="np-item">
                                    <a href="https://www.xinruiyun.cn/ecs/">弹性云服务器ECS <img src="./assets/img/home/iconHot.png" /></a>
                                    <div class="buy-box">
                                        <img class="buy-img" src="./assets/img/home/buy-icon.png" />
                                        <a class="buy-font" href="https://i.xinruiyun.cn/buy/host">立即购买</a>
                                    </div>
                                </li>
                                <li class="np-item">
                                    <a href='https://www.xinruiyun.cn/ims/'>镜像服务</a>
                                </li>
                                <li class="np-item">
                                    <a href="https://www.xinruiyun.cn/ecss/">云服务器快照</a>
                                </li>
                                <li class="np-item">
                                    <a href="https://www.xinruiyun.cn/gpu/">GPU加速云服务器</a>
                                    <div class="buy-box">
                                        <img class="buy-img" src='./assets/img/home/buy-icon.png' />
                                        <a class="buy-font" href="https://i.xinruiyun.cn/buy/gpu">立即购买</a>
                                    </div>
                                </li>
                                <li class="np-item">
                                    <a href="https://www.xinruiyun.cn/ddos/">DDoS高防云服务器</a>
                                    <div class="buy-box">
                                        <img class="buy-img" src='./assets/img/home/buy-icon.png' />
                                        <a class="buy-font" href="https://i.xinruiyun.cn/buy/ddos">立即购买</a>
                                    </div>
                                </li>
                                <li class="np-dis">
                                    裸金属服务器(敬请期待)
                                </li>
                                <li class="np-item">
                                    <a href='https://www.xinruiyun.cn/evs/'>云硬盘</a>
                                    <div class="buy-box">
                                        <img class="buy-img" src="./assets/img/home/buy-icon.png" />
                                        <a class="buy-font" href="https://i.xinruiyun.cn/buy/disk">立即购买</a>
                                    </div>
                                </li>
                                <li class="np-item">
                                    <a href='https://www.xinruiyun.cn/vbs'>云硬盘备份</a>
                                </li>
                            </ul>
                        </Poptip>

                        <Poptip placement="bottom-start" trigger="hover">
                            <li class="nav-item active" @mouseenter='styleClass(-1,$event)'>
                                <a href="#">网络与安全</a>
                            </li>
                            <div slot='content' class="np-box" v-cloak>
                                <div class="np-title">
                                    <p>云网络</p>
                                </div>
                                <ul class="np-bs">
                                    <li class="np-item">
                                        <a href='https://www.xinruiyun.cn/vpc/'>虚拟私有云VPC</a>
                                    </li>
                                    <li class="np-item">
                                        <a href='https://www.xinruiyun.cn/nat/'>NAT网关</a>
                                    </li>
                                    <li class="np-item">
                                        <a href="https://www.xinruiyun.cn/eip/">弹性公网IP</a>
                                        <div class="buy-box">
                                            <img class="buy-img" src="./assets/img/home/buy-icon.png" />
                                            <a class="buy-font" href='https://i.xinruiyun.cn/buy/elasticip'>立即购买</a>
                                        </div>
                                    </li>
                                    <li class="np-item">
                                        <a href='https://www.xinruiyun.cn/slb/'>负载均衡</a>
                                    </li>
                                    <li class="np-item">
                                        <a href='https://www.xinruiyun.cn/vpn/'>虚拟专网VPN</a>
                                    </li>
                                    <li class="np-dis">
                                        CDN(敬请期待)
                                    </li>
                                </ul>
                                <div class="np-title2">
                                    <p>云安全</p>
                                </div>
                                <ul class="np-bs">
                                    <li class="np-item">
                                        <a href='https://www.xinruiyun.cn/fw/'>防火墙</a>
                                    </li>
                                    <li class="np-item">
                                        <a>SSL证书</a>
                                        <div class="buy-box">
                                            <img class="buy-img" src="./assets/img/home/buy-icon.png" />
                                            <span class="buy-font">立即购买</span>
                                        </div>
                                    </li>
                                    <li class="np-item">
                                        <a href="https://www.xinruiyun.cn/ddosip/">DDoS高防IP</a>
                                        <div class="buy-box">
                                            <img class="buy-img" src="./assets/img/home/buy-icon.png" />
                                             <a class="buy-font" href='https://i.xinruiyun.cn/buy/ddosip'>立即购买</a>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </Poptip>

                    
                        <li class="nav-item active" @mouseenter='styleClass(3,$event)'>
                          <a href='https://www.xinruiyun.cn/oss/'>对象存储</a>
                        </li>

                        <Poptip placement="bottom-start" trigger="hover">
                            <li class="nav-item active" @mouseenter='styleClass(-1,$event)'>
                                <a>域名与备案</a>
                            </li>
                            <ul slot="content" class="np-bs" v-cloak>
                                <li class="np-item">
                                    <a href="https://i.xinruiyun.cn/domain/">域名注册</a>
                                </li>
                                <li class="np-item">
                                    <a href="https://i.xinruiyun.cn/icp/">域名备案</a>
                                </li>
                            </ul>
                        </Poptip>

                        <Poptip placement="bottom-start" trigger="hover">
                            <li class="nav-item active" @mouseenter='styleClass(-1,$event)'>
                                <a href="#">其他产品</a>
                            </li>
                            <div slot='content' class="np-box" v-cloak>
                                <div class="np-title">
                                    <p>云数据库</p>
                                </div>
                                <ul class="np-bs">
                                    <li class="np-item">
                                        <a href='https://www.xinruiyun.cn/mysql/'>云数据库MySQL</a>
                                        <div class="buy-box">
                                            <img class="buy-img" src="./assets/img/home/buy-icon.png" />
                                            <a class="buy-font" href="https://i.xinruiyun.cn/buy/database">立即购买</a>
                                        </div>
                                    </li>
                                    <li class="np-item">
                                        <a href='https://www.xinruiyun.cn/postgresql/'>云数据库PostgreSQL</a>
                                        <div class="buy-box">
                                            <img class="buy-img" src="./assets/img/home/buy-icon.png" />
                                            <a class="buy-font" href="https://i.xinruiyun.cn/buy/database">立即购买</a>
                                        </div>
                                    </li>
                                    <li class="np-item">
                                        <a href='https://www.xinruiyun.cn/sqlserver/'>云数据库SQLServer</a>
                                        <div class="buy-box">
                                            <img class="buy-img" src="./assets/img/home/buy-icon.png" />
                                            <a class="buy-font" href="https://i.xinruiyun.cn/buy/database">立即购买</a>
                                        </div>
                                    </li>
                                    <li class="np-item">
                                        <a href='https://www.xinruiyun.cn/mongodb/'>云数据库MongoDB</a>
                                        <div class="buy-box">
                                            <img class="buy-img" src="./assets/img/home/buy-icon.png" />
                                            <a class="buy-font" href="https://i.xinruiyun.cn/buy/database">立即购买</a>
                                        </div>
                                    </li>
                                    <li class="np-item">
                                        <a href='https://www.xinruiyun.cn/redis/'>云数据库Redis</a>
                                        <div class="buy-box">
                                            <img class="buy-img" src="./assets/img/home/buy-icon.png" />
                                            <a class="buy-font" href="https://i.xinruiyun.cn/buy/database">立即购买</a>
                                        </div>
                                    </li>
                                </ul>
                                <div class="np-title2">
                                    <p>云运维</p>
                                </div>
                                <ul class="np-bs">
                                    <li class="np-item">
                                        <a href='https://www.xinruiyun.cn/cms/'>云监控</a>
                                    </li>
                                    <li class="np-dis">
                                        访问控制(敬请期待)
                                    </li>
                                </ul>
                            </div>
                        </Poptip>

                        <!-- <li class="nav-item active" @mouseenter='styleClass(3,$event)'>
                            <a href="#">解决方案</a>
                        </li> -->
                         <li class="nav-item active" @mouseenter='styleClass(4,$event)'>
                            <a href="https://www.xinruiyun.cn/price/ecs/">定价</a>
                        </li>
                        <li class="nav-item active" @mouseenter='styleClass(4,$event)'>
                            <a href="https://www.xinruiyun.cn/about/">关于我们</a>
                        </li>
                        <!-- <li class="nav-item active" @mouseenter='styleClass(5,$event)'>
                            <a href="https://i.xinruiyun.cn/market">云市场</a>
                        </li>  -->
                    </ul>
                    <div class="line" :style='lineStyle'></div>
                </div>
          </div>

          <div class="m-head">
                <div class="mobile-head" >
                    <div class="mh-top">
                        <div class="mr-icon" @click="mIcon = !mIcon">
                            <Icon type="navicon-round" size="40" color='#9B908E' :class="mIcon?'mhead-icons':'mhead-icon'" />
                        </div>
                        <a class="mobile-logo" href="https://www.xinruiyun.cn/" alt='新睿云'>
                            <div class="mobile-limg">
                                <img src='./assets/img/home/logo.gif'>
                            </div>
                        </a>
                        <div class="m-logining" v-if="userInfo" @click='mLogin =!mLogin'>
                            <img :src="userInfo.headportrait">
                            <div class="ml-text">{{ userInfo?userInfo.realname:''}}</div>
                            <div :class="mLogin?'ml-block':'ml-blocks'" ></div>
                        </div>
                        
                        <div class="m-pople" v-else @click="mLogin = !mLogin">
                            <Icon type="person" size='40'  />
                        </div>
                    </div>


                    <div class="m-login" :class='mLogin?"":"m-logins"' v-if="!userInfo">
                        <div>
                            <a ref="external nofollow" target="_blank" href="https://m.xinruiyun.cn/console?from=xinruiyun-kongzhitai" title="控制台">控制台</a>
                        </div>
                        <div>
                            <a ref="external nofollow" target="_blank" href="https://m.xinruiyun.cn/login?from=xinruiyun-denglu" title="登录">登录</a>
                        </div>
                        <div>
                            <a ref="external nofollow" target="_blank" href="https://m.xinruiyun.cn/register?from=xinruiyun-zhuce" title="注册">注册</a>
                        </div>
                    </div>
                </div>
                <div class="ml-right" :class="mLogin?'ml-rights':''" v-if="userInfo">
                    <ul class="m-list">
                        <li class="m-item">
                             <a href="https://i.xinruiyun.cn/usercenter">用户中心</a>
                        </li>
                        <li class="m-item">
                             <a href="https://i.xinruiyun.cn/expenses">费用中心</a>
                        </li>
                        <li class="m-item">
                            <a href="https://i.xinruiyun.cn/msgcenter">消息中心</a>
                        </li>
                        <li class="m-item">
                            <a href="https://i.xinruiyun.cn/operationlog">操作日志</a>
                        </li>
                        <li class="m-item">
                            <span @click="go('exit')" style="font-size:14px">退出登录</span>
                        </li>
                    </ul>
                </div>
                <div class="mhead-list" :class="mIcon?'':'mhead-lists'">
                    <div style="text-align: center;">
                        <i-input style="width:87%;margin:20px 0;">
                            <Icon type="search" size='30' slot="suffix" />
                        </i-input>
                    </div>

                    <div class="mhead-product">
                        <div style="padding: 10px 10px;">
                            <a ref="external nofollow" href="/" title="活动中心">活动中心</a>
                        </div>
                    </div>
                    <div class="mhead-product">
                        <div style="padding: 10px 10px;" @click='getSelectDown(0)'>
                            <span>产品</span>
                            <span class="active mhead-arrow2"></span>
                        </div>
                        <div class="mhead-pone mhead-pones">
                            <div class="mhead-child">
                                <div class="mhead-cdd" @click="getSelectDown2(0)">
                                    <span>云计算</span>
                                    <span class='select mhead-arrow2'></span>
                                </div>
                                <div class="mhead-box mhead-boxs">
                                    <div class="mhead-chd">
                                        <a href="https://www.xinruiyun.cn/ecs/" target="blank">弹性云服务器ECS</a>
                                    </div>
                                    <div class="mhead-chd">
                                        <a href="https://www.xinruiyun.cn/ims/" target="blank">镜像服务器</a>
                                    </div>
                                    <div class="mhead-chd">
                                        <a href="https://www.xinruiyun.cn/ecss/" target="blank"> 云服务器快照</a>
                                    </div>
                                    <div class="mhead-chd">
                                        <a href="https://www.xinruiyun.cn/gpu/" target="blank"> GPU加速服务器</a>
                                    </div>
                                    <div class="mhead-chd">
                                        <a href="https://www.xinruiyun.cn/ddos/" target="blank"> DDoS高防云服务器</a>
                                    </div>
                                </div>
                            </div>
                            <div class="mhead-child">
                                <div class="mhead-cdd" @click="getSelectDown2(1)">
                                    <span>云存储</span>
                                    <span class='select mhead-arrow2'></span>
                                </div>
                                <div class="mhead-box mhead-boxs">
                                    <div class="mhead-chd">
                                        <a href="https://www.xinruiyun.cn/oss/" target="blank"> 对象存储</a>
                                    </div>
                                    <div class="mhead-chd">
                                        <a href="https://www.xinruiyun.cn/evs/" target="blank"> 云硬盘</a>
                                    </div>
                                    <div class="mhead-chd">
                                        <a href="https://www.xinruiyun.cn/vbs/" target="blank">云硬盘备份</a>
                                    </div>
                                </div>
                            </div>
                            <div class="mhead-child">
                                <div class="mhead-cdd" @click="getSelectDown2(2)">
                                    <span>云安全</span>
                                    <span class='select mhead-arrow2'></span>
                                </div>
                                <div class="mhead-box mhead-boxs">
                                    <div class="mhead-chd">
                                        <a href="https://www.xinruiyun.cn/fw/" target="blank"> 防火墙</a>
                                    </div>
                                    <div class="mhead-chd">
                                        <a href="#" target="blank">SSL证书</a>
                                    </div>
                                    <div class="mhead-chd">
                                        <a href="https://www.xinruiyun.cn/ddosip/" target="blank">DDoS高防IP</a>
                                    </div>
                                </div>
                            </div>
                            <div class="mhead-child">
                                <div class="mhead-cdd" @click="getSelectDown2(3)">
                                    <span>云网络</span>
                                    <span class='select mhead-arrow2'></span>
                                </div>
                                <div class="mhead-box mhead-boxs">
                                    <div class="mhead-chd">
                                        <a href="https://www.xinruiyun.cn/vpc/" target="blank"> 虚拟私有云VPC</a>
                                    </div>
                                    <div class="mhead-chd">
                                        <a href="https://www.xinruiyun.cn/nat/" target="blank"> NAT网关</a>
                                    </div>
                                    <div class="mhead-chd">
                                        <a href="https://www.xinruiyun.cn/eip/" target="blank">弹性公网IP</a>
                                    </div>
                                    <div class="mhead-chd">
                                        <a href="https://www.xinruiyun.cn/slb/" target="blank"> 负载均衡</a>
                                    </div>
                                    <div class="mhead-chd">
                                        <a href="https://www.xinruiyun.cn/vpn/" target="blank">虚拟专网VPN</a>
                                    </div>
                                    <div class="mhead-chd">
                                        <a href="#" target="blank"> CDN（敬请期待）</a>
                                    </div>
                                </div>
                            </div>
                            <div class="mhead-child">
                                <div class="mhead-cdd" @click="getSelectDown2(4)">
                                    <span>云运维</span>
                                    <span class='select mhead-arrow2'></span>
                                </div>
                                <div class="mhead-box mhead-boxs">
                                    <div class="mhead-chd">
                                        <a href="https://www.xinruiyun.cn/cms/" target="blank"> 云监控</a>
                                    </div>
                                    <div class="mhead-chd">
                                        <a href="#" target="blank"> 访问控制（敬请期待）</a>
                                    </div>
                                </div>
                            </div>
                            <div class="mhead-child">
                                <div class="mhead-cdd" @click="getSelectDown2(5)">
                                    <span>云数据库</span>
                                    <span class='select mhead-arrow2'></span>
                                </div>
                                <div class="mhead-box mhead-boxs">
                                    <div class="mhead-chd">
                                        <a href="https://www.xinruiyun.cn/mysql/" target="blank">云数据库MySQL</a>
                                    </div>
                                    <div class="mhead-chd">
                                        <a href="https://www.xinruiyun.cn/postgresql/" target="blank"> 云数据库PostgreSQL</a>
                                    </div>
                                    <div class="mhead-chd">
                                        <a href="https://www.xinruiyun.cn/sqlserver/" target="blank"> 云数据库Redis</a>
                                    </div>
                                    <div class="mhead-chd">
                                        <a href='https://www.xinruiyun.cn/mongodb/' target="blank">云数据库MongoDB</a>
                                    </div>
                                    <div class="mhead-chd">
                                        <a href='https://www.xinruiyun.cn/redis/' target="blank">云数据库Redis</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="mhead-product">
                        <div style="padding: 10px 10px;" @click='getSelectDown(1)'>
                            <span>域名与备案</span>
                            <span class="active mhead-arrow2"></span>
                        </div>
                        <div class="mhead-pone mhead-pones">
                            <div class="mhead-box">
                                <div class="mhead-child">
                                    <div class="mhead-cdd">
                                        <span>
                                            <a href="https://i.xinruiyun.cn/domain/" target="blank">域名注册</a>
                                        </span>
                                    </div>
                                    <div class="mhead-cdd">
                                        <span>
                                            <a href="https://i.xinruiyun.cn/icp/" target="blank">域名备案</a>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- <div class="mhead-product">
                        <div style="padding: 10px 10px;">
                            <span>解决方案</span>
                        </div>
                    </div> -->
                    <div class="mhead-product">
                        <div style="padding: 10px 10px;">
                            <a href="https://www.xinruiyun.cn/price/ecs/">定价</a>
                        </div>
                    </div>
                    <!-- <div class="mhead-product">
                        <div style="padding: 10px 10px;">
                            <a href="https://i.xinruiyun.cn/market">云市场</a>
                            <span :class='item.itemShow?"mhead-arrow":"mhead-arrow2"'></span>
                        </div>
                    </div> -->
                    <div class="mhead-product">
                        <div style="padding: 10px 10px;">
                            <a href="https://help.xinruiyun.cn/">帮助文档</a>
                            <!-- <span :class='item.itemShow?"mhead-arrow":"mhead-arrow2"'></span> -->
                        </div>
                    </div>
                    <div class="mhead-product">
                        <div style="padding: 10px 10px;">
                            <a href="https://www.xinruiyun.cn/news/">新闻动态</a>
                            <!-- <span :class='item.itemShow?"mhead-arrow":"mhead-arrow2"'></span> -->
                        </div>
                    </div>
                    <div class="mhead-product">
                        <div style="padding: 10px 10px;">
                            <a href="https://www.xinruiyun.cn/about/">关于我们</a>
                            <!-- <span :class='item.itemShow?"mhead-arrow":"mhead-arrow2"'></span> -->
                        </div>
                    </div>
                </div>
          </div>
    </header>
    <!-- 页面展示 -->
    <router-view/>
    <!-- 所有前台页面共用底部导航块 -->
    <div id="app-foot">
      <!--      &lt;!&ndash; 新用户注册最大6个月免费 &ndash;&gt;
            <div id="foot-free">
              <p>新用户注册享最大2个月免费试用</p>
              <span>零成本体验，快速认证与审核通道</span>
              <router-link to="vps" target="_blank">立即体验</router-link>
            </div>-->
      <!-- 客服支持、意见反馈 -->
      <!-- <div id="foot-support">
        <div id="wrapper">
          <div v-for="(support,index) in support" class="flex-item" :key="index">
            <i class="iconfont" :class="support.img"></i>
            <div style="display: inline-block;vertical-align: middle">
              <span>{{support.title}}</span>
              <span style="display: block">{{support.subTitle}}</span>
            </div>
          </div>
        </div>
      </div> -->
      <!--页面尾部-->
      <div class="bottom">
        <div class="bottom-register">
                <div class="br-bg">
                    <div class="box">
                        <p class="title">为您提供出众的上云实践机会和全面的尊贵服务</p>
                        <a href="https://i.xinruiyun.cn/register/"><div class="bottom-button">立即注册</div></a>
                    </div>
                </div>
        </div>
        <div class="bottom-support">
            <div class="bottom-box">
                <div class="support">
                    <div style="margin-right: 9px;">
                        <img src="./assets/img/home/b-icon.png" alt="24小时客服">
                    </div>
                    <div>
                        <p>7*24</p>
                        <p>多渠道服务与支持</p>
                    </div>
                </div>
                <div class="support">
                    <div style="margin-right: 9px;">
                        <img src="./assets/img/home/b-icon2.png" alt="投诉建议">
                    </div>
                    <div>
                        <p>意见</p>
                        <p>反馈与投诉建议</p>
                    </div>
                </div>
                <div class="support">
                    <div style="margin-right: 9px;">
                        <img src="./assets/img/home/b-icon3.png" alt="专项服务">
                    </div>
                    <div>
                        <p>1V1</p>
                        <p>专项服务</p>
                    </div>
                </div>
                <div class="support">
                    <div style="margin-right: 9px;">
                        <img src="./assets/img/home/b-icon4.png" alt="7天无理由退款">
                    </div>
                    <div>
                        <p>退款</p>
                        <p>7天无理由退款</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="bottom-black">
            <div class="bottom-product">
                <div class="cloud-product-bg">
                    <div class="bg">
                        <div class="bg-title">
                            产品
                        </div>
                        <div class="bg-content">
                            <div>
                                <p class="p_true"><a href="https://www.xinruiyun.cn/ecs/">弹性云服务器ECS</a></p>
                            </div>
                            <div>
                                <p class="p_true"><a href="https://www.xinruiyun.cn/ims/">镜像服务</a></p>
                            </div>
                            <div>
                                <p class="p_true"><a href="https://www.xinruiyun.cn/ecss/">云服务器快照</a></p>
                            </div>
                            <div>
                                <p class="p_true"><a href="https://www.xinruiyun.cn/gpu/">GPU加速云服务器</a></p>
                            </div>
                            <div>
                                <p class="p_true"><a href="https://www.xinruiyun.cn/ddos/">DDoS高防IP</a></p>
                            </div>
                            <div>
                                <p class="p_true"><a href="https://www.xinruiyun.cn/oss/">对象存储</a></p>
                            </div>
                            <div>
                                <p class="p_true"><a href="https://www.xinruiyun.cn/evs/">云硬盘</a></p>
                            </div>
                            <div>
                                <p class="p_true"><a href="https://www.xinruiyun.cn/vbs/">云硬盘备份</a></p>
                            </div>
                            <div>
                                <p class="p_true"><a href="https://www.xinruiyun.cn/fw/">防火墙</a></p>
                            </div>
                            <div>
                                <p class="p_true"><a href="https://www.xinruiyun.cn/ddos/">DDoS高防云服务器</a></p>
                            </div>
                            <div>
                                <p class="p_true"><a href="https://www.xinruiyun.cn/ess/">弹性伸缩</a></p>
                            </div>
                            <div>
                                <p class="p_true"><a href="https://www.xinruiyun.cn/cms/">云监控</a></p>
                            </div>
                            <div>
                                <p class="p_true"><a href="https://www.xinruiyun.cn/vpc/">虚拟私有云VPC</a></p>
                            </div>
                            <div>
                                <p class="p_true"><a href="https://www.xinruiyun.cn/nat/">NAT网关</a></p>
                            </div>
                            <div>
                                <p class="p_true"><a href="https://www.xinruiyun.cn/eip/">弹性公网IP</a></p>
                            </div>
                            <div>
                                <p class="p_true"><a href="https://www.xinruiyun.cn/slb/">负载均衡</a></p>
                            </div>
                            <div>
                                <p class="p_true"><a href="https://www.xinruiyun.cn/vpn/">虚拟专网VPN</a></p>
                            </div>
                            <div>
                                <p class="p_true"><a href="https://www.xinruiyun.cn/mysql/">云数据库MySQL</a></p>
                            </div>
                            <div>
                                <p class="p_true"><a href="https://www.xinruiyun.cn/postgresql/">云数据库PostgreSQL</a></p>
                            </div>
                            <div>
                                <p class="p_true"><a href="https://www.xinruiyun.cn/mongodb/">云数据库MongoDB</a></p>
                            </div>
                            <div>
                                <p class="p_true"><a href="https://www.xinruiyun.cn/redis/">云数据库Redis</a></p>
                            </div>
                            <div>
                                    <p class="p_true"><a href="https://www.xinruiyun.cn/sqlserver/">云数据库SQLServer</a></p>
                            </div>
                        </div>
                    </div>
                    <div class="bg">
                        <div class="bg-title">
                            快速入口
                        </div>
                        <div class="bg-content">
                            <div>
                                <p class="p_true"><a ref="external nofollow" target="_blank" href="https://i.xinruiyun.cn/brecords/">备案管理</a></p>
                            </div>
                            <div>
                                <p class="p_true"><a target="_blank" href="https://www.xinruiyun.cn/price/ecs/">定价说明</a></p>
                            </div>
                            <div>
                                <p class="p_true"><a target="_blank" href="https://help.xinruiyun.cn/quick/">快速入门</a></p>
                            </div>
                            <div>
                                <p class="p_true"><a target="_blank" href="https://help.xinruiyun.cn/">使用文档</a></p>
                            </div>
                            <div>
                                <p class="p_true"><a target="_blank" href="https://help.xinruiyun.cn/ask/">常见问题</a></p>
                            </div>
                            <div>
                                <p class="p_true"><a href="https://www.xinruiyun.cn/about/">公司介绍</a></p>
                            </div>
                            <div>
                                <p class="p_true"><a href="#">资质认证</a></p>
                            </div>
                        </div>
                    </div>
                    <div class="bg">
                        <div class="bg-title">
                            管理与支持
                        </div>
                        <div class="bg-content">
                            <div>
                                <p class="p_true"><a href="https://i.xinruiyun.cn/overview">控制台</a></p>
                            </div>
                            <div>
                                <p class="p_true"><a href="https://i.xinruiyun.cn/usercenter">用户中心</a></p>
                            </div>
                            <div>
                                <p class="p_true"><a href="https://i.xinruiyun.cn/expenses">费用中心</a></p>
                            </div>
                            <div>
                                <p class="p_true"><a href="https://i.xinruiyun.cn/work">工单管理</a></p>
                            </div>
                        </div>
                    </div>
                    <div class="bg">
                        <div class="bg-title">
                            服务与公告
                        </div>
                        <div class="bg-content">
                            <div>
                                <p class="p_true"><a href="https://www.xinruiyun.cn/hdgg/">产品公告</a></p>
                            </div>
                            <div>
                                <p class="p_true"><a href="https://activity.xinruiyun.cn/">最新活动</a></p>
                            </div>
                            <div>
                                <p class="p_true"><a href="https://im.xrcloud.net/im/question/index.html" target="_blank">技术支持</a></p>
                            </div>
                        </div>
                    </div>
                    <div class="bg">
                        <div class="bg-title">
                            联系我们
                        </div>
                        <div class="bg-content">
                            <div>
                                <p>企业电话：400-0505-565</p>
                            </div>
                            <div>
                                <p>企业邮箱：service@unionstech.cn</p>
                            </div>
                            <div>
                                <p>总部地址：北京海淀区东升大厦B座612室、519室</p>
                            </div>
                            <div>
                                <img src="./assets/img/app/QR-code.jpg" alt="新睿云二维码">
                                <p>每周有1个神秘大奖哟！</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="bc-box">
                    <div class="friendship">
                        <div style="width: 10%;">
                            <span>友情链接</span>
                        </div>
                        <div style="width: 87%;text-align: justify;">
                            <span v-for="(item,index) in links" :key="index"> <a :href="item.linkurl" target="_blank">{{ item.linkname }}</a></span>
                        </div>
                    </div>
                    <div class="share">
                        <span>分享给好友：</span>
                        <div>
                            <img src="./assets/img/home/weibo.png"  @click='share("weibo")' alt="微博">
                            <img src="./assets/img/home/weixin.png" @click='share("weixin")' alt="微信">
                            <img src="./assets/img/home/QQ.png" @click='share("qq")' alt="QQ">
                            <img class="showweixinpic" v-if="isweixinShow" src="./assets/img/home/shareweixin.png"/>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <div class="bottom-info">
            <div class="bi-box">
                <div class="support">
                    <div>
                        <p><a href="#">©2019</a></p>
                    </div>
                </div>
                <div class="support">
                    <div>
                        <p><a href="#" target="_blank">允睿讯通科技有限公司</a></p>
                    </div>
                </div>
                <div class="support">
                    <div>
                        <p><a href="http://www.beian.miit.gov.cn/" target="_blank" rel = "nofollow">京ICP备15035854号</a></p>
                    </div>
                </div>
                <!-- <div class="support">
                    <div>
                        <p><a href="http://www.beian.miit.gov.cn/" target="_blank" rel = "nofollow">京公网安备11010802024922号</a></p>
                    </div>
                </div> -->
                <div class="support">
                    <div>
                        <p><a href="#" rel = "nofollow">增值电信业务经营许可证 B1-20180455</a></p>
                    </div>
                </div>
                <div class="support">
                    <div>
                        <p><a href="https://www.xinruiyun.cn/about/" target="_blank">关于我们</a></p>
                    </div>
                </div>
            </div>
        </div>
      </div>

      <div class="m-bottom">
          <div class="m-register">
              <p>为您提供出众的上云实践机会和全面的尊贵服务</p>
              <a href='https://i.xinruiyun.cn/register/' style="color:#fff"><div class="m-button">立即注册</div></a>
          </div>
          <div class="m-we">
              <div class="mwe-text">
                  <div class="mwe-left">
                      <div class="mwe-img">
                          <img src="./assets/img/app/QR-code.jpg" alt="新睿云二维码">
                      </div>
                      <p>每周有1个神秘大奖哟</p>
                  </div>
                  <div class="mwe-right">
                      <p><span>联系我们</span></p>
                      <p><span>400-0505-565</span></p>
                      <p><span>service@unionstech.cn</span></p>
                      <p><span>北京海淀区东升大厦B座612室、519室</span></p>
                  </div>
              </div>
          </div>
          <div class="mb-text">
              <div class="mb-top">
                  <span>北京允睿讯通科技有限公司</span>
                  <span style="margin-left: 10px;">
                      <div class="mb-img">
                          <img src="./assets/img/app/record.png" alt="备案号">
                      </div>
                      <a href="http://www.beian.miit.gov.cn/" target="_blank" rel = "nofollow"></a>京ICP备15035854号</a>
                  </span>
              </div>
              <div><span>Copyright © 2019</span><span style="margin-left: 10px;">增值电信业务经营许可证B1-20180455</span>
              </div>
          </div>
      </div>
    </div>
    <!-- 客服浮动块 -->
    <div class="ph-left">
            <div class="ph-gg">
                <h3>免费用</h3>
                <a class="ph-button" @click="$router.push('/free/')">立即领取</a>
            </div>
            <div style="background-color: #FCECE0;padding: 10px 9px;margin-top: -1px;">
                <div class="ph-cs">
                    <img class="ke-black" src="./assets/img/home/kefu.png">
                    <span>联系客服</span>
                    <div class="ph-connect">
                        <div v-if="QQInfo.length > 0">
                            <div style="padding: 20px;width: 200px;">
                                <span class="q-tile">人工客服</span>
                                <div class="info-wrapper">
                                    <div v-for="(qq,index) of QQInfo" :key="index">
                                        <Tooltip :content="qq.qqstatus?'在线咨询':'请留言'" placement="top">
                                            <a target="_blank"
                                                :href="`tencent://message/?uin=${qq.qqnumber}&amp;Site=www.xrcloud.net&amp;Menu=yes`"
                                                style="color:rgb(73, 80, 96)" rel="nofollow">
                                                <img src="./assets/img/home/qq-blue.png" v-if="qq.qqstatus" alt="人工客服">
                                                <img src="./assets/img/home/qq-6.png" v-else alt="人工客服">
                                                <span
                                                    style="width: 56px;display: inline-block;font-size: 12px;">{{qq.servicename}}</span>
                                            </a>
                                        </Tooltip>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style="padding:0 20px;cursor:pointer;width:200px;" @click="linkService">
                            <span class="q-tile">在线客服&nbsp&nbsp&nbsp<img style="vertical-align: bottom;"
                                    src="./assets/img/home//tubiao-.png" /></span>
                        </div>
                        <div v-if="xiaoshouInfo.length>0">
                            <div style="padding: 20px;width: 200px;clear: both;">
                                <span class="q-tile">售前咨询</span>
                                <div class="info-wrapper">
                                    <div v-for="(qq,index) of xiaoshouInfo" :key="index">
                                        <Tooltip :content="qq.qqstatus?'在线咨询':'请留言'" placement="top">
                                            <a target="_blank"
                                                :href="`tencent://message/?uin=${qq.qqnumber}&amp;Site=www.xrcloud.net&amp;Menu=yes`"
                                                style="color:rgb(73, 80, 96)" rel="nofollow">
                                                <img src="./assets/img/home/qq-blue.png" v-if="qq.qqstatus" alt="售前咨询">
                                                <img src="./assets/img/home/qq-6.png" v-else alt="售前咨询">
                                                <span>{{qq.servicename}}</span>
                                                <i :class="{inline:qq.qqstatus}"></i>
                                            </a>
                                        </Tooltip>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="ph-cs" @click="showModal.complaintModal = true">
                    <img class="bo-black" src="./assets/img/home/icon-bookb.png">
                    <span>反馈意见</span>
                </div>
                <div class="ph-cs" @click='toTopBtn'>
                    <img class="ke-black" src="./assets/img/home/backtop.png"> 
                    <span>返回顶部</span>
                </div>
            </div>
            
        </div>
    <!-- 投诉框 -->
    <Modal v-model="showModal.complaintModal" width="500" :scrollable="true" :mask-closable="false">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">投诉与建议</span>
      </p>
      <div v-show="complaintForm.step==1">
        <Form label-position="left" :model="complaintForm" ref="complaintForm" :rules="complaintFormRule" :label-width="80">
          <Form-item label="反馈标题" prop="complaintTitle">
            <Input v-model="complaintForm.complaintTitle" placeholder="请以1-20个字简单描述一下问题" :maxlength="20"></Input>
          </Form-item>
          <Form-item label="问题类型" prop="issueType">
            <Select v-model="complaintForm.issueType" placeholder="请选择">
              <Option v-for="(item,index) in complaintForm.typeList" :value="item.id" :key="index">{{item.description}}</Option>
            </Select>
          </Form-item>
          <Form-item label="问题描述" prop="issueDesc">
            <Input v-model="complaintForm.issueDesc" type="textarea" :autosize="{minRows: 5,maxRows: 7}"
                   placeholder="请输入..."></Input>
          </Form-item>
          <Form-item label="联系电话" prop="phone">
            <Input v-model="complaintForm.phone" placeholder="请留下您的联系电话，方便我们将结果反馈给您。"></Input>
          </Form-item>
        </Form>
      </div>
      <div v-show="complaintForm.step==2" class="complain-modal" style="text-align:center;font-size:14px;">
        <img src="./assets/img/payresult/paySuccess.png" style="width:40px;height:40px;" />
        <p style="text-align:center;line-height:1.5">—您的烦恼我们已经收到—</p>
        <p style="text-align:center;line-height:1.5">我们会将处理结果发送至您的手机</p>
        <p style="text-align:center;line-height:1.5">请耐心等待</p>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="ghost" @click="showModal.complaintModal = false">取消</Button>
        <Button type="primary" @click="sumbitComplaint('complaintForm')" v-show="complaintForm.step==1">提交反馈
        </Button>
        <Button type="primary" @click="showModal.complaintModal = false" v-show="complaintForm.step==2">确定
        </Button>
      </div>
    </Modal>

  </div>
</template>

<script>
import axios from "@/util/axiosInterceptor";
import $store from "./vuex";
import { mapState } from "vuex";
import debounce from "throttle-debounce/debounce";
import "@/assets/iconfont/frontend/iconfont.css";
import "@/assets/iconfont/frontend/iconfont.js";
import uuid from "uuid";
import regExp from "./util/regExp";

export default {
  name: "app",
  data() {
    const validPhoneNumber = (rule, value, callback) => {
      let reg = /^1[3|5|7|8|9|6|7]\d{9}$/;
      if (!reg.test(this.complaintForm.phone)) {
        return callback(new Error("请输入正确的手机号码"));
      } else {
        callback();
      }
    };
    return {
      links: "",
      currentItem: -1, // 当前选中item  默认为-1(未选中)
      lineStyle: {
        width: "0px",
        left: "0px",
        transition: "width .3s"
      }, // line的width和left属性
      lineIndex: 0,
      mLogin: true,
      mIcon: true,
      support: [
        {
          img: "icon-duoqudaofuwuyuzhichi",
          title: "7*24",
          subTitle: "多渠道服务与支持"
        },
        {
          img: "icon-fankuiyutousujianyiA",
          title: "意见",
          subTitle: "反馈与投诉建议"
        },
        { img: "icon-zhuanxiangfuwu", title: "1V1", subTitle: "专项服务" },
        {
          img: "icon-tianwuliyoutuihuo",
          title: "退款",
          subTitle: "7天无理由退款"
        }
      ],
      description: [
        {
          title: "云计算",
          desc: [
            { subTitle: "弹性云服务器（ECS）", url: "/ecs/" },
            { subTitle: "镜像服务", url: "/mirrorservice/" },
            { subTitle: "ESC快照", url: "/ecssnapshot/" },
            { subTitle: "GPU服务器", url: "/gpu/" },
            { subTitle: "弹性伸缩", url: "/elasticscalable/" },
            { subTitle: "裸金属服务器（敬请期待）", url: "/" }
          ]
        },
        {
          title: "云网络",
          desc: [
            { subTitle: "虚拟私有云VPC", url: "/vpc/" },
            { subTitle: "弹性IP", url: "/elasticip/" },
            { subTitle: "负载均衡", url: "/loadbalancing/" },
            { subTitle: "NAT网关", url: "/natgateway/" },
            { subTitle: "虚拟专网VPN", url: "/vpn/" },
            { subTitle: "CDN（敬请期待）", url: "/" }
          ]
        },
        {
          title: "云储存",
          desc: [
            { subTitle: "云硬盘", url: "/disk/" },
            { subTitle: "云硬盘备份", url: "/diskbackup/" },
            { title: "对象存储", url: "/objectstorage/" }
          ]
        },
        {
          title: "云安全",
          desc: [
            { subTitle: "防火墙", url: "/firewall/" },
            { subTitle: "DDOS高防IP", url: "/ddosip/" }
          ]
        },
        {
          title: "云维护",
          desc: [
            { subTitle: "云监控", url: "/monitor/" },
            { subTitle: "访问监控（敬请期待）", url: "/" }
          ]
        }
      ], // 页尾列表详情
      Preparation: [
        {
          time: "©2019",
          title: "北京允睿讯通科技有限公司",
          preparation: "京ICP备15035854号",
          desc: "京公网安备11010802024922号",
          msg: "关于我们"
        }
      ], // footer-bottom
      kfURL: "", // 客服url地址
      QQInfo: [], // QQ客服在线情况
      xiaoshouInfo: [], // QQ销售在线情况
      yunweiInfo: [], // QQ运维在线情况,
      /* 倒计时参数 */
      day: "00",
      hour: "00",
      minute: "00",
      second: "00",
      hintShow: false,
      timer: null,
      UUID: "",
      showModal: {
        complaintModal: false
      },
      complaintForm: {
        complaintTitle: "",
        issueType: "",
        typeList: [],
        issueDesc: "",
        phone: "",
        step: 1
      },
      complaintFormRule: {
        complaintTitle: [
          {
            required: true,
            validator: regExp.validaRegisteredName,
            trigger: "blur"
          }
        ],
        issueType: [
          { required: true, message: "请选择问题类型", trigger: "change" }
        ],
        issueDesc: [
          { required: true, message: "请描述一下您的问题", trigger: "blur" }
        ],
        phone: [
          { required: true, validator: validPhoneNumber, trigger: "blur" }
        ]
      },
      isweixinShow: false,
      from: "",
      sellCode: ""
    };
  },
  mounted() {
    // this.hintShow = sessionStorage.getItem('hintShow') == 'true' ? true : false
    // if (sessionStorage.getItem('hintShow') == 'true') {
    //   this.$refs.hint.style.height = '80px'
    // }
    //this.setTime()
    let params = {
      batchNumber: window.UUID,
      type: "1",
      pageURL: window.location.href
    };
    // 获取入口信息
    axios.post("information/webReachableRecord.do", params);
  },
  created() {
    // if(!localStorage.getItem('isLogin')){
    //   this.getloginPromptMessage()
    // }
    // if (sessionStorage.getItem('hintShow') == null) {
    //   sessionStorage.setItem('hintShow', 'true')
    // }
    window.UUID = uuid.v4();
    let params = {
      batchNumber: window.UUID,
      type: "0",
      pageURL: window.location.href
    };
    // 写入入口信息
    axios.post("information/webReachableRecord.do", params);
    // 获取所有后台需要的基本信息
    // 获取用户信息
    var userInfo = axios.get("user/GetUserInfo.do", {
      params: { t: new Date().getTime() }
    });
    // 获取zone信息
    var zoneList = axios.get("information/zone.do", {
      params: { t: new Date().getTime(), buy: "1" }
    });
    Promise.all([userInfo, zoneList]).then(values => {
      if (values[0].data.status == 1 && values[0].status == 200) {
        $store.commit("setAuthInfo", {
          authInfo: values[0].data.authInfo,
          userInfo: values[0].data.result,
          authInfoPersion: values[0].data.authInfo_persion
        });
        localStorage.setItem("realname", values[0].data.result.realname);
      }
      if (values[1].data.status == 1 && values[1].status == 200) {
        $store.commit("setZoneList", values[1].data.result);
      }
    });
    this.$http
      .get("user/getKfAdd.do", {
        params: {
          type: ""
        }
      })
      .then(response => {
        this.kfURL = response.data.result;
      });
    // QQ客服在线情况
    this.$http.get("network/getQQCustomerServiceStatus.do").then(response => {
      this.QQInfo = response.data.kefu;
      this.xiaoshouInfo = response.data.xiaoshou;
      this.yunweiInfo = response.data.yunwei;
      /*for (let key in response.data.result) {
         this.QQInfo.push({
         key,
         value: response.data.result[key]
         })
         }*/
    });
    // 设置友情链接
    this.$http.get("friendshipLink.do").then(response => {
      this.links = response.data.result;
    });
    this.from = window.location.href.split("from=")[1]
      ? window.location.href.split("from=")[1]
      : "";
    this.sellCode = window.location.href.split("sellCode=")[1]
      ? window.location.href.split("sellCode=")[1]
      : "";
    // if (this.from) {
    //   // 流量来源记录
    //   localStorage.setItem('comefrom', this.from)
    // }
    // if (this.sellCode) {
    //   // 销售来源渠道
    //   localStorage.setItem('sellCode', this.sellCode)
    // }
    this.setCookie("sellCode", this.sellCode, 1);
    this.setCookie("comefrom", this.from, 1);
  },
  methods: {
    // 获取销售数据与流量
    setCookie(c_name, value, expiredays) {
      var exdate = new Date();
      exdate.setDate(exdate.getDate() + expiredays);
      document.cookie =
        c_name +
        "=" +
        escape(value) +
        (expiredays == null ? "" : ";expires=" + exdate.toGMTString()) +
        ";domain=.xinruiyun.cn;path=/";
    },
    login() {
      this.$router.push("login");
    },
    /* li mouseenter事件 重新设置line样式 */
    QME() {
      this.$refs.qq.style.width = "200px";
    },
    QML() {
      this.$refs.qq.style.width = "0px";
    },
    PME() {
      this.$refs.phoneE.style.width = "95px";
    },
    PML() {
      this.$refs.phoneE.style.width = "0px";
    },
    // 移动端头部产品手风琴动效
    getSelectDown(index) {
      let arry = document.querySelectorAll(".mhead-product .mhead-pone");
      let arry2 = document.querySelectorAll(".mhead-product .active");
      if (arry[index].className == "mhead-pone mhead-pones") {
        arry[index].className = "mhead-pone mhead-pone";
        arry2[index].className = "active mhead-arrow";
      } else {
        arry[index].className = "mhead-pone mhead-pones";
        arry2[index].className = "active mhead-arrow2";
      }
    },
    getSelectDown2(index) {
      let arry = document.querySelectorAll(".mhead-child .mhead-box");
      let arry2 = document.querySelectorAll(".mhead-child .mhead-cdd .select");
      if (arry[index].className == "mhead-box mhead-boxs") {
        arry[index].className = "mhead-box";
        arry2[index].className = "select mhead-arrow";
      } else {
        arry[index].className = "mhead-box mhead-boxs";
        arry2[index].className = "select mhead-arrow2";
      }
    },
    styleClass: function(index, event) {
      if (index != -1) {
        this.lineStyle.transition = "all  .3s";
        this.lineStyle.left = event.target.offsetLeft + "px";
        this.lineStyle.width = event.target.clientWidth + "px";
      } else {
        this.lineStyle.width = "0px";
        this.lineIndex = -1;
      }
    },
    go(path) {
      if (path == "exit") {
        this.exit();
        return;
      }
      // this.$router.push(path)
    },
    exit() {
      localStorage.removeItem("realname");
      axios.get("user/logout.do").then(response => {
        this.delCookie("XRYSYAN");
        window.location.reload();
      });
    },
    getCookie(name) {
      var arr,
        reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
      if ((arr = document.cookie.match(reg))) {
        return true;
        // return (arr[2]);
      } else {
        return false;
      }
    },
    //删除cookie
    delCookie(name) {
      var exp = new Date();
      exp.setTime(exp.getTime() - 1);
      var cval = this.getCookie(name);
      if (cval != null)
        document.cookie =
          name +
          "=" +
          cval +
          ";expires=" +
          exp.toGMTString() +
          ";domain=.xinruiyun.cn;path=/";
    },
    closeHeadHint() {
      this.hintShow = false;
      this.$refs.hint.style.height = 0;
      sessionStorage.setItem("hintShow", "false");
    },
    /* 倒计时方法 */
    setTime() {
      axios.get("network/getTime.do").then(res => {
        if (res.data.status == 1) {
          let startTime = res.data.result;
          let endTime = new Date("2018/12/17").getTime();
          let limitTime = endTime - startTime;
          if (limitTime > 0) {
            this.setLimit(limitTime);
            this.timer = setInterval(() => {
              this.setLimit(limitTime);
              limitTime -= 1000;
              if (limitTime <= 0) {
                window.clearInterval(this.timer);
              }
            }, 1000);
          } else {
            this.day = this.checkTime(0);
            this.hour = this.checkTime(0);
            this.minute = this.checkTime(0);
            this.second = this.checkTime(0);
          }
        }
      });
    },
    setLimit(time) {
      let days = parseInt(time / 1000 / 60 / 60 / 24, 10); //计算剩余的天数
      let hours = parseInt((time / 1000 / 60 / 60) % 24, 10); //计算剩余的小时
      let minutes = parseInt((time / 1000 / 60) % 60, 10); //计算剩余的分钟
      let seconds = parseInt((time / 1000) % 60, 10); //计算剩余的秒数
      this.day = this.checkTime(days);
      this.hour = this.checkTime(hours);
      this.minute = this.checkTime(minutes);
      this.second = this.checkTime(seconds);
    },
    checkTime(i) {
      //将0-9的数字前面加上0，例1变为01
      if (i < 10) {
        i = "0" + i;
      }
      return i;
    },
    openInfo(href) {
      window.open(href);
    },
    getOrderType() {
      this.complaintForm.step = 1;
      this.$http
        .get("order/orderType.do", {
          params: {
            gid: "5"
          }
        })
        .then(res => {
          if (res.data.status == 1 && res.status == 200) {
            this.complaintForm.typeList = res.data.result["投诉建议"];
            this.showModal.complaintModal = true;
          } else {
            this.$message.info({
              content: res.data.message
            });
          }
        });
    },
    sumbitComplaint(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          let url = "order/createSuggestions.do";
          let params = {
            phone: this.complaintForm.phone,
            title: this.complaintForm.complaintTitle,
            gid: "5",
            cid: this.complaintForm.issueType,
            questionDesc: this.complaintForm.issueDesc
          };
          this.$http.post(url, params).then(res => {
            if (res.status == 200) {
              this.complaintForm.step = 2;
            } else {
              this.$message.info({
                content: res.data.message
              });
            }
          });
        }
      });
    },
    getloginPromptMessage() {
      this.$http.get("user/loginPromptMessage.do", { params: {} }).then(res => {
        if (res.data.status == 1) {
          localStorage.setItem("isLogin", "已提示");
          this.$Message.info({
            content: res.data.message,
            duration: 10,
            closable: true
          });
        }
      });
    },
    linkService() {
      if (this.userInfo) {
        window.open(
          `https://im.xrcloud.net/im/question/index.html?companyId=${
            this.userInfo.companyid
          }`
        );
      } else {
        window.open("https://im.xrcloud.net/im/question/index.html");
      }
    },
    share(name) {
      if (name == "qq") {
        window.open(
          "http://connect.qq.com/widget/shareqq/index.html?url=" +
            "http://www.yrclouds.cn" +
            "&sharesource=qzone&title=" +
            "新睿云云服务器" +
            "&desc=" +
            "便宜实惠的云服务器"
        );
      } else if (name == "weibo") {
        window.open(
          "http://service.weibo.com/share/share.php?url=http://www.xinruiyun.cn&title=" +
            "新睿云 - 提供免费云服务器租用、便宜弹性云主机试用等云产品服务！" +
            "&pic=" +
            "" +
            "&searchPic=false"
        );
      } else if (name == "weixin") {
        this.isweixinShow = !this.isweixinShow;
      }
    },
     toTopBtn: function() {
            document.documentElement.scrollTop = 0;
        },
  },
  computed: mapState({
    userInfo: state => state.userInfo
  }),
  watch: {
    /* 观察currentItem变化 设置content高度 */
    currentItem() {
      var content = this.$refs.content;
      for (var i in content) {
        if (i == this.currentItem) {
          content[i].style.height = `${content[i].firstChild.clientHeight +
            25}px`;
        } else {
          content[i].style.height = "0px";
        }
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    clearInterval(this.timer);
    next();
  }
};
</script>

<style rel="stylesheet/less" lang="less" scoped>
#front {
  .app-hint {
    height: 0;
    background: url("./assets/img/app/hint-banner.png") center no-repeat,
      linear-gradient(to right, #ff4439, #ff1569);
    position: relative;
    transition: height 0.5s ease;
    cursor: pointer;
    > img {
      position: absolute;
      right: 15px;
      top: 10px;
      cursor: pointer;
    }
    .center {
      position: relative;
      width: 1200px;
      height: 100%;
      margin: 0 auto;
      .countdown {
        position: absolute;
        left: 74.4%;
        top: 45%;
        > p {
          font-family: MicrosoftYaHei;
          font-size: 24px;
          font-weight: 500;
          color: rgba(255, 45, 0, 1);
          > span {
            font-size: 14px;
            margin: 0 8px;
            color: #fff;
          }
        }
      }
    }
  }

  header {
    .pc-head {
      width: 100%;
      background-color: #1d1716;
      height: 40px;
      display: flex;
      justify-content: space-between;
    }
    .pc-head a {
      display: inline-block;
      margin: 0;
    }
    .pc-head .p-collapse .lg-in {
      color: #ff624b;
      width: 66px;
      display: inline-block;
      text-align: center;
      line-height: 40px;
      font-size: 14px;
      vertical-align: top;
    }
    .user-list {
      margin-right: 20px;
      a {
        color: #333333;
      }
      .user-fn {
        position: relative;
        line-height: 40px;
        padding-left: 20px;
        color: #ffffff;
      }
    }
    .pc-head .p-collapse .lg-re {
      width: 68px;
      display: inline-block;
      height: 40px;
      vertical-align: middle;
      line-height: 40px;
      text-align: center;
      color: #ffffff;
      font-size: 14px;
      background: #ff624b;
    }
    .logo {
      width: 101px;
      overflow: hidden;
    }

    .logo img {
      width: 102%;
      height: 167%;
      margin-top: -13px;
    }

    .navbar-brand {
      padding: 0;
    }

    .p-link {
      padding: 10px 18px;
      color: #fff;
      font-size: 14px;
    }

    .pb {
      border-left: 1px solid rgba(111, 115, 128, 0.52);
      border-right: 1px solid rgba(111, 115, 128, 0.52);
    }

    .nav-list {
      height: 60px;
      background: #2d2523;
      color: #fff;
      font-family: MicrosoftYaHei;
      display: flex;
      border-bottom: 1px solid #9a9da5;
    }

    .nav-list .nav-right {
      width: 50px;
      font-size: 14px;
      padding: 10px 0;
      text-align: center;
      display: inline-block;
      margin: 0 30px 0 20px;
    }

    .nav-list .nav-left {
      display: inline-block;
      margin: 0;
    }

    .nav-list .nav-left .np-box {
      color: #514644;
      font-size: 14px;
      width: 220px;
    }

    .nav-list .nav-left .np-box,
    .np-bs a {
      color: #514644;
      text-decoration: none;
    }

    .nav-list .nav-left .np-box .np-title {
      border-bottom: 1px solid #e8dfdd;
      padding-bottom: 10px;
    }

    .nav-list .nav-left .np-box .np-title2 {
      border-bottom: 1px solid #e8dfdd;
      padding-bottom: 10px;
      margin-top: 20px;
    }

    .nav-list .nav-left .np-bs {
      color: #514644;
      font-size: 14px;
      width: 220px;
    }

    .nav-list .nav-left .np-bs .np-item a:hover {
      color: #ff624b;
    }

    .nav-list .nav-left .np-bs .np-item {
      margin: 12px 0;
    }

    .nav-list .nav-left .np-bs .np-item .buy-box {
      float: right;
    }

    .nav-list .nav-left .np-bs .np-item .buy-box:hover > .buy-img {
      display: none;
      opacity: 0;
      transition: all 0.3s ease-in-out;
    }

    .nav-list .nav-left .np-bs .np-item .buy-box:hover > .buy-font {
      display: inline-block;
      color: #4297f2;
      font-size: 12px;
      opacity: 1;
      transition: all 0.3s ease-in-out;
    }

    .nav-list .nav-left .np-bs .np-dis {
      color: #c5c0bf;
      font-size: 14px;
    }

    .nav-list .nav-left .np-bs .np-item .buy-font {
      display: none;
      opacity: 0;
      transition: all 0.3s ease-in-out;
      cursor: pointer;
      font-size: 12px;
    }

    .nav-list .nav-left .nav-item {
      display: inline-block;
      // height: 60px;
      line-height: 60px;
      font-size: 14px;
      padding: 0 10px;
    }
    .nav-list .nav-left .nav-item a {
      color: #fff;
      text-decoration: none;
    }
    .nav-list .nav-left .nav-item a:hover {
      color: #fff;
      text-decoration: none;
    }

    .nav-list .line {
      width: 20px;
      height: 2px;
      background-color: #ff624b;
      position: absolute;
      top: 99px;
      left: 101px;
      z-index: 9999;
      transition: all ease-in-out 0.3s;
    }

    // 移动
    .m-head {
      display: none;
      min-width: 320px;
      width: 100%;
      a {
        color: #ffffff;
      }
      a:hover {
        text-decoration: none;
        color: #ffffff;
      }
    }
    .mobile-head .m-pople {
      float: right;
      padding: 10px;
      color: #fff;
    }
    .mobile-head .mobile-logo {
      width: 103px;
      height: 60px;
    }

    .mobile-head .mobile-logo .mobile-limg {
      height: 60px;
      display: inline-block;
      vertical-align: middle;
      overflow: hidden;
    }
    .mobile-head .m-login {
      display: flex;
      background-color: #1d1716;
      color: #fff;
      font-size: 12px;
      text-align: center;
      width: 100%;
      overflow: hidden;
      max-height: 0px;
      transition: max-height ease-in-out 0.3s;
    }

    .mobile-head .m-logins {
      max-height: 39px;
      transition: max-height ease-in-out 0.3s;
    }
    .mobile-head .m-login div:last-child {
      background-color: #ff624b;
      border-right: none;
    }
    .mobile-head .m-logining {
      float: right;
      margin-top: 15px;
    }
    .mobile-head .m-logining img {
      border-radius: 50%;
      width: 30px;
      vertical-align: middle;
    }
    .mobile-head .mobile-logo .mobile-limg img {
      max-width: 100%;
      max-height: 66px;
      position: relative;
      top: -3px;
    }

    .mobile-head .m-logining .ml-text {
      vertical-align: middle;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      display: inline-block;
      font-size: 12px;
      width: 76px;
      color: #9b908e;
    }
    .ml-right {
      background-color: #34302f;
      position: absolute;
      z-index: 999;
      right: 0;
      transition: height ease-in-out 0.5s;
    }

    .ml-rights {
      overflow: hidden;
      height: 0;
    }

    .ml-right .m-item {
      padding: 0.3rem 1rem;
      color: #fff;
      font-size: 14px;
      width: 8rem;
    }

    .ml-blocks {
      border-color: rgba(0, 0, 0, 0) rgba(0, 0, 0, 0) #9b908e;
      border-width: 7px;
      border-style: solid;
      height: 0px;
      width: 0px;
      display: inline-block;
      transform: rotate(-180deg);
      transition: transform ease-in-out 0.5s;
    }

    .mobile-head .m-logining .ml-block {
      border-color: rgba(0, 0, 0, 0) rgba(0, 0, 0, 0) #9b908e;
      border-width: 7px;
      border-style: solid;
      height: 0px;
      width: 0px;
      display: inline-block;
      transform: rotate(0);
      transition: transform ease-in-out 0.5s;
    }
    .mhead-list {
      position: absolute;
      z-index: 222;
      width: 100%;
      overflow: hidden;
      background-color: #34302f;
      max-height: 0px;
      font-size: 14px;
      transition: max-height ease-in-out 0.3s;
    }

    .mhead-lists {
      max-height: 2000px;
      font-size: 14px;
      transition: max-height ease-in-out 0.3s;
      background-color: #34302f;
    }

    .mhead-list .mhead-product {
      background-color: #141211;
      color: #fff;
      box-shadow: 0px 1px 0px 0px rgba(111, 106, 106, 0.5);
      font-size: 0.14px;
    }

    .mhead-lists .mhead-product {
      background-color: #141211;
      color: #fff;
      box-shadow: 0px 1px 0px 0px rgba(111, 106, 106, 0.5);
      overflow: hidden;
    }

    .mhead-list .mhead-products {
      background-color: #141211;
      color: #fff;
      box-shadow: 0px 1px 0px 0px rgba(111, 106, 106, 0.5);
      height: 0rem;
      transition: height ease-in-out 0.5s;
    }

    .mhead-lists .mhead-products {
      background-color: #141211;
      color: #fff;
      box-shadow: 0px 1px 0px 0px rgba(111, 106, 106, 0.5);
      height: 0rem;
      transition: height ease-in-out 0.5s;
    }

    .mhead-list,
    .mhead-lists .mhead-product .mhead-child {
      background-color: #24201d;
    }

    .mhead-pone {
      max-height: 68rem;
      transition: max-height ease-in-out 0.3s;
      -webkit-transition: max-height ease-in-out 0.3s;
      -moz-transition: max-height ease-in-out 0.3s;
      overflow: hidden;
    }

    .mhead-pones {
      max-height: 0;
      transition: max-height ease-in-out 0.3s;
      -webkit-transition: max-height ease-in-out 0.3s;
      -moz-transition: max-height ease-in-out 0.3s;
      overflow: hidden;
    }

    .mhead-product span,
    a {
      font-size: 14px;
    }
    .mhead-cdd {
      box-shadow: 0px 1px 0px 0px rgba(111, 106, 106, 0.5);
      padding: 10px;
      background-color: #24201d;
    }
    .mhead-cdd a {
      font-size: 14px;
    }
    .mhead-chd a {
      font-size: 14px;
    }
    .mhead-chd {
      background-color: #34302f;
      padding: 10px 20px;
    }

    .mhead-arrow {
      transform: rotate(-45deg);
      transition: transform ease-in-out 0.5s;
      float: right;
      cursor: pointer;
    }

    .mhead-arrow2 {
      transform: rotate(133deg);
      transition: transform ease-in-out 0.5s;
      float: right;
      cursor: pointer;
    }

    .mhead-arrow2::before {
      content: "";
      width: 10px;
      display: inline-block;
      height: 10px;
      border-radius: 2px;
      border-top: 2px solid #c5c0bf;
      border-right: 2px solid #c5c0bf;
    }

    .mhead-arrow::before {
      content: "";
      width: 10px;
      display: inline-block;
      height: 10px;
      border-radius: 2px;
      border-top: 2px solid #c5c0bf;
      border-right: 2px solid #c5c0bf;
    }
    .mhead-box {
      max-height: 320px;
      transition: max-height ease-in-out 0.3s;
      -webkit-transition: max-height ease-in-out 0.3s;
      -moz-transition: max-height ease-in-out 0.3s;
      overflow: hidden;
    }

    .mhead-boxs {
      max-height: 0;
    }

    .mobile-head .m-login div {
      width: 34%;
      padding: 10px 0;
      border-right: 1px solid #6f6a6a;
    }

    .mobile-head .mr-icon {
      display: inline-block;
      vertical-align: middle;
    }
    .mobile-head .mh-top {
      padding: 0 20px;
      background-color: #1d1716;
      border-bottom: 1px solid rgba(220, 214, 213, 0.24);
    }
    .mobile-head .mhead-icons {
      transform: rotate(0);
      transition: transform ease-in-out 0.3s;
    }

    .mobile-head .mhead-icon {
      transform: rotate(90deg);
      transition: transform ease-in-out 0.3s;
    }
  }
  #app-foot {
    #foot-free {
      padding: 54px 0px 50px;
      background-color: #377dff;
      text-align: center;
      > p {
        // text-align: center;
        font-size: 28px;
        color: #ffffff;
      }
      > span {
        text-align: center;
        font-size: 14px;
        display: block;
        color: #ffffff;
        margin-top: 26px;
      }
      > a {
        margin: 28px auto 0px;
        outline: none;
        border: none;
        display: inline-block;
        padding: 13px 60px;
        background-color: #ffe777;
        font-size: 14px;
        color: #377dff;
        width: max-content;
        line-height: 100%;
      }
    }

  }
}
.bottom .bottom-register {
  background-color: #ff7f4b;
  text-align: center;
  padding: 36px 0 0 0;
}
.bottom .bottom-register .br-bg {
  max-width: 1920px;
  background: url("./assets/img/home/bottom-bg.png") no-repeat top center;
  background-size: 100%;
  height: 146px;
}
.bottom .bottom-register .br-bg .box {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}
.bottom .bottom-register .title {
  font-size: 24px;
  font-weight: normal;
  color: #fff;
  text-align: center;
}

.bottom .bottom-register .bottom-button {
  padding: 9px 50px 9px 50px;
  border: 1px solid #ffffff;
  border-radius: 4px;
  color: #ffffff;
  display: inline-block;
  font-size: 18px;
  margin: 36px 0 0 0;
  cursor: pointer;
}

.bottom .bottom-support {
  background-color: #1c1a1e;
  padding: 20px 118px 20px 120px;
  box-shadow: -3px 3px 8px 2px rgba(0, 0, 0, 0.5);
  transform: translate3d(0, 0, 0);
}
.bottom .bottom-support .bottom-box {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.bottom .bottom-support .support {
  display: flex;
  justify-content: space-between;
  color: #ffffff;
  font-size: 14px;
}

.bottom .bottom-black {
  background-color: #1e1b1a;
  padding: 40px 0 60px 0;
}

.bottom .bottom-black .bottom-product {
  max-width: 1200px;
  margin: 0 auto;
}

.bottom .bottom-black .bottom-product .cloud-product-bg {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.bottom .bottom-black .bottom-product .cloud-product-bg .bg {
  font-size: 14px;
  min-width: 136px;
}

.bottom .bottom-black .bottom-product .cloud-product-bg .bg .bg-title {
  color: #fff;
  font-weight: 500;
  padding-bottom: 20px;
}
.bottom .bottom-black .bottom-product .cloud-product-bg .bg:nth-child(1) {
  width: 215px;
}
.bottom .bottom-black .bottom-product .cloud-product-bg .bg .bg-content {
  border-top: 1px solid #666666;
  color: #c8c8c8;
  padding-top: 21px;
  flex-wrap: wrap;
  display: flex;
  flex-direction: column;
  padding-right: 50px;
  height: 400px;
}

.bottom .bottom-black .bottom-product .cloud-product-bg .bg .bg-content img {
  width: 72px;
  height: 72px;
}

.bottom .bottom-black .bottom-product .cloud-product-bg .bg .bg-content p {
  line-height: 33px;
  margin-right: 30px;
}
.bottom .bottom-black .bottom-product .cloud-product-bg .bg .bg-content p span {
  font-size: 12px;
  color: #999999;
}
.bottom .bottom-black .bottom-product .cloud-product-bg .bg .bg-content p a {
  color: #999999;
  font-size: 12px;
}

.bottom
  .bottom-black
  .bottom-product
  .cloud-product-bg
  .bg
  .bg-content
  .p_true {
  cursor: pointer;
}

.bottom
  .bottom-black
  .bottom-product
  .cloud-product-bg
  .bg
  .bg-content
  .p_true
  a:hover {
  color: #ff624b;
}

.bottom
  .bottom-black
  .bottom-product
  .cloud-product-bg
  .bg
  .bg-content
  .p_false {
  cursor: default;
}
.bottom .bottom-black .bottom-product .bc-box {
  display: flex;
}
.bottom .bottom-black .bottom-product .friendship {
  width: 73%;
  margin-top: 50px;
  display: flex;
  flex-wrap: wrap;
}
.bottom .bottom-black .bottom-product .friendship span {
  color: #999999;
  font-size: 14px;
  height: 20px;
  line-height: 20px;
}
.bottom .bottom-black .bottom-product .friendship span:nth-child(1) {
  color: #fff;
  font-size: 18px;
  font-weight: 500;
  margin-left: 0;
}
.bottom .bottom-black .bottom-product .share {
  width: 21%;
  margin: 47px 0 0 0;
  position: relative;
}
.bottom .bottom-black .bottom-product .share span {
  font-size: 14px;
  color: #fff;
  vertical-align: middle;
}
.bottom .bottom-black .bottom-product .friendship span a {
  font-size: 14px;
  color: #999;
  vertical-align: middle;
  margin-right: 5px;
}
.bottom .bottom-black .bottom-product .share div {
  display: inline-block;
  vertical-align: middle;
}
.bottom .bottom-black .bottom-product .share div img {
  cursor: pointer;
  margin-right: 20px;
}

.bottom .bottom-black .bottom-product .friendship span:nth-child(1) {
  color: #fff;
  font-size: 18px;
  font-weight: 500;
  margin-left: 0;
}

.bottom .bottom-info {
  background-color: #0b0605;

  padding: 20px 0;
}
.bottom .bottom-info .bi-box {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  max-width: 1200px;
  margin: 0 auto;
}
.bottom .bottom-info .support a {
  color: #ffffff;
  font-size: 14px;
}

.m-bottom {
  display: none;
}

.m-bottom img {
  width: 100%;
  height: 100%;
  font-family: MicrosoftYaHei;
}

.m-bottom .m-register {
  background-color: #ff624b;
  text-align: center;
  color: #fff;
  padding: 0.7rem 0;
}

.m-bottom .m-register p {
  font-size: 14px;
}

.m-bottom .m-register .m-button {
  margin-top: 13px;
  border: 1px solid #fff;
  padding: 7px 25px;
  font-size: 14px;
  display: inline-block;
  border-radius: 2px;
  color: #fff;
}

.m-bottom .m-we {
  background-color: #1e1b1a;
  padding: 20px;
}

.m-bottom .m-we .mwe-text {
  display: flex;
  justify-content: space-around;
  max-width: 528px;
  margin: 0 auto;
}

.m-bottom .m-we .mwe-text .mwe-left {
  color: #fff;
  font-size: 14px;
  text-align: center;
}

.m-bottom .m-we .mwe-text .mwe-left .mwe-img {
  width: 95px;
  height: 90px;
  display: inline-block;
}

.m-bottom .m-we .mwe-text .mwe-right {
  margin-left: 20px;
}

.m-bottom .m-we .mwe-text .mwe-right p:nth-child(1) {
  font-size: 18px;
}

.m-bottom .m-we .mwe-text .mwe-right p:nth-child(2) {
  color: #ff624b;
  font-size: 24px;
}

.m-bottom .m-we .mwe-text .mwe-right p {
  color: #fff;
  font-size: 14px;
  margin-top: 7px;
}

.m-bottom .mb-text {
  background-color: #0b0605;
  padding: 11px 0;
  color: rgba(255, 255, 255, 0.5);
  font-size: 12px;
  text-align: center;
}
.m-bottom .mb-text a {
  color: rgba(255, 255, 255, 0.5);
  font-size: 12px;
}
.m-bottom .mb-text .mb-top {
  margin-bottom: 11px;
}

.m-bottom .mb-text .mb-top .mb-img {
  width: 10px;
  height: 10px;
  vertical-align: top;
  display: inline-block;
}

ul li {
  list-style: none;
}

p {
  margin: 0;
  font-family: "pingfang sc medium", Microsoft YaHei;
}

span {
  font-family: "pingfang sc medium", Microsoft YaHei;
}

.ph-left .ph-gg {
  background: url('./assets/img/home/noteic.png');
  background-size: 100%;
  text-align: center;
  cursor: pointer;
  text-align: center;
  height: 170px;
}

.ph-left .ph-gg h3 {
  font-size: 32px;
  color: #FFFFFF;
  font-weight: bold;
  display: inline-block;
  padding: 8px 0;
  margin-top: 28px;
  margin-bottom: 18px;
}

.ph-left .ph-gg .ph-button{
  display: inline-block;
  width: 132px;
  height: 44px;
  line-height: 44px;
  color: #FF624B;
  font-size: 22px;
  background-color: #FCECE0;
  box-shadow:0px 11px 18px -6px rgba(161,38,20,0.75);
}

.ph-left .ph-cs {
  background-color: #FFFFFF;
  height: 40px;
  text-align: center;
  cursor: pointer;
  margin-bottom: 10px;
  padding: 7px 0;
  box-shadow: 0px 2px 16px -5px rgba(130, 130, 130, 0.5);
  transition: all ease-in-out 0.2s;
  position: relative;
  box-sizing: border-box;
}
.ph-left .ph-cs >img,.ph-left .ph-cs >span{
  vertical-align: middle;
  font-size: 18px;
  color: #4F1B1B;
}
.ph-left {
  position: fixed;
  right: 0;
  bottom: 14%;
  z-index: 999;
  margin-right: 5px;
  width: 150px;
}
.ph-cs:hover > .ph-connect{
  width: 210px;
}
.cc-title{
  font-size: 14px;
  color: #1D1716;
  line-height: normal;
}
.ph-connect{
  background: #ffffff;
  width: 0;
  position: absolute;
  right: 148px;
  top: 0;
  transition: width 0.3s ;
  overflow: hidden;
  border-radius:15px 0px 15px 15px;
  box-shadow:0px 2px 16px -2px rgba(130,130,130,0.5);
  color: #514644;
  font-size: 12px;
}

.ivu-tooltip-inner {
  min-height: 22px!important;
  padding: 2px 12px!important;
}

.info-wrapper{
  line-height: normal;
  clear: left;
  width: 200px;
}
.q-tile{
  font-size: 14px;
  color: #1D1716;
  float: left;
  margin-bottom: 6px;
  line-height: normal;
}
.info-wrapper > div {
  margin-bottom: 5px;
  width: 50%;
  display: inline-block;
  line-height: normal;
  text-align: left;
}

.info-wrapper > div  img{
  vertical-align: middle;
}
.info-wrapper > div  span{
  vertical-align: middle;
  width: 56px;
  display: inline-block;
}


@media only screen and (max-width: 1366px) {
  .m-bottom {
    display: none;
  }
}

@media only screen and (max-width: 1023px) {
  #front .ivu-input {
    border: 1px solid rgba(96, 87, 86, 1);
    background-color: rgba(29, 23, 22, 1);
  }
  #foot-footer {
    display: none;
  }
  .bottom {
    display: none;
  }
   .ph-left {
    display: none;
  }

  .m-bottom {
    display: block;
  }

  #front header .pc-top {
    display: none;
  }

  #front header .m-head {
    display: block;
  }

  #front header .mp-pro {
    display: block;
    padding-top: 30px;
    background-color: #f8f7f7;
  }

  #front header .m-product {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  #front header .m-product div {
    width: 44%;
    height: 44px;
    line-height: 44px;
    text-align: center;
    background-color: #f8f7f7;
    border: 1px solid #dcd6d5;
    color: #1d1716;
    font-size: 14px;
    border-radius: 4px;
    margin: 0 10px 10px 0;
  }
  #front header .m-bottom {
    display: block;
  }
  #front header .mobile-head .mobile-logo {
    width: 103px;
    height: 60px;
  }
}

@media only screen and (min-width: 1024px) and (max-width: 1365px) {
  // .ivu-input{
  //   border: 1px solid rgba(96,87,86,1);
  //   background-color: rgba(29,23,22,1);
  // }
   .ph-left {
    display: none;
  }
  #front header .m-head {
    display: block;
  }

  #front header .m-product {
    display: flex;
    flex-wrap: wrap;
  }
  #front header .m-product div {
    width: 31%;
    height: 44px;
    line-height: 44px;
  }
  #front header .pc-top {
    display: none;
  }
  #front header .m-bottom {
    display: block;
  }

  #front header .bottom {
    display: none;
  }

  #front header .mp-pro {
    display: block;
  }
  .m-bottom {
    display: block;
  }
}
.showweixinpic {
  position: absolute;
  top: 40px;
  left: 109px;
  width: 100px;
  height: 100px;
}
@media only screen and (max-width: 640px) {
  #front .affix > .mobileq {
    display: none;
  }
  .mobileq {
    display: none;
  }
   .ph-left {
    display: none;
  }
}


</style>
