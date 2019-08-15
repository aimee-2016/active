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
                    <a class="navbar-brand logo" href="#" alt='新睿云'>
                        <img src='./assets/img/home/logo.gif'>
                    </a>
                    <div class="p-collapse">
                        <div style="display: flex;">
                            <a class="p-link" href="#">
                                帮助文档
                            </a>
                            <a class="p-link" href="#">
                                新闻动态
                            </a>
                            <router-link class="p-link pb" to='/overview' title="控制台">
                                控制台
                            </router-link>
                            <div v-if='!userInfo'>
                                <router-link class="lg-in" to="/login"  title="登陆">登录</router-link>
                                <router-link class="lg-re" to="/register" title="注册">注册</router-link>
                            </div>

                            <ul v-else class="user-list">
                                <li >
                                  <Dropdown> <!-- @on-click="go"-->
                                    <a href="javascript:void(0)" class="user-fn">
                                      {{ userInfo?userInfo.realname:''}}
                                      <Icon type="arrow-down-b"></Icon>
                                    </a>
                                    <DropdownMenu slot="list">
                                      <DropdownItem name="/usercenter">
                                        <a to="/usercenter">用户中心</a>
                                      </DropdownItem>
                                      <DropdownItem name="/expenses">
                                        <a to="/expenses">费用中心</a>
                                      </DropdownItem>
                                      <DropdownItem name="/msgcenter" style="position:relative">
                                        <span>消息中心</span>
                                      </DropdownItem>
                                      <DropdownItem name="/operationlog">
                                        <span>操作日志</span>
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
                            <router-link to="/activity" title="活动中心">活动中心</router-link>
                        </li>
                        <li class="nav-item" @mouseenter='styleClass(1,$event)'>
                            <a href="#">首页</a>
                        </li>
                        <Poptip placement="bottom-start" trigger="hover">
                            <li class="nav-item active" @mouseenter='styleClass(-1,$event)'>
                                <a>云计算</a>
                            </li>
                            <ul slot="content" class="np-bs" v-cloak>
                                <li class="np-item">
                                    <a>弹性云服务器ECS <img src="./assets/img/home/iconHot.png" /></a>
                                    <div class="buy-box">
                                        <img class="buy-img" src="./assets/img/home/buy-icon.png" />
                                        <span class="buy-font">立即购买</span>
                                    </div>
                                </li>
                                <li class="np-item">
                                    <a>镜像服务</a>
                                </li>
                                <li class="np-item">
                                    <a>云服务器快照</a>
                                </li>
                                <li class="np-item">
                                    <a>GPU加速云服务器</a>
                                    <div class="buy-box">
                                        <img class="buy-img" src='./assets/img/home/buy-icon.png' />
                                        <span class="buy-font">立即购买</span>
                                    </div>
                                </li>
                                <li class="np-dis">
                                    裸金属服务器(敬请期待)
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
                                        <a>虚拟私有云VPC</a>
                                    </li>
                                    <li class="np-item">
                                        <a>NAT网关</a>
                                    </li>
                                    <li class="np-item">
                                        <a>弹性公网IP</a>
                                        <div class="buy-box">
                                            <img class="buy-img" src="./assets/img/home/buy-icon.png" />
                                            <span class="buy-font">立即购买</span>
                                        </div>
                                    </li>
                                    <li class="np-item">
                                        <a>负载均衡</a>
                                    </li>
                                    <li class="np-item">
                                        <a>虚拟专网VPN</a>
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
                                        <a>防火墙</a>
                                    </li>
                                    <li class="np-item">
                                        <a>SSL证书</a>
                                        <div class="buy-box">
                                            <img class="buy-img" src="./assets/img/home/buy-icon.png" />
                                            <span class="buy-font">立即购买</span>
                                        </div>
                                    </li>
                                    <li class="np-item">
                                        <a>DDoS高防IP</a>
                                    </li>
                                </ul>
                            </div>
                        </Poptip>

                        <Poptip placement="bottom-start" trigger="hover">
                            <li class="nav-item active" @mouseenter='styleClass(-1,$event)'>
                                <a>云存储</a>
                            </li>
                            <ul slot="content" class="np-bs" v-cloak>
                                <li class="np-item">
                                    <a>对象存储 <img src="./assets/img/home/iconNew.png" /></a>
                                    <div class="buy-box">
                                        <img class="buy-img" src="./assets/img/home/buy-icon.png" />
                                        <span class="buy-font">立即购买</span>
                                    </div>
                                </li>
                                <li class="np-item">
                                    <a>云硬盘</a>
                                    <div class="buy-box">
                                        <img class="buy-img" src="./assets/img/home/buy-icon.png" />
                                        <span class="buy-font">立即购买</span>
                                    </div>
                                </li>
                                <li class="np-item">
                                    <a>云硬盘备份</a>
                                </li>
                            </ul>
                        </Poptip>

                        <Poptip placement="bottom-start" trigger="hover">
                            <li class="nav-item active" @mouseenter='styleClass(-1,$event)'>
                                <a>域名与备案</a>
                            </li>
                            <ul slot="content" class="np-bs" v-cloak>
                                <li class="np-item">
                                    <a>镜像服务</a>
                                </li>
                                <li class="np-item">
                                    <a>云服务器快照</a>
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
                                        <a>云数据库MySQL</a>
                                        <div class="buy-box">
                                            <img class="buy-img" src="./assets/img/home/buy-icon.png" />
                                            <span class="buy-font">立即购买</span>
                                        </div>
                                    </li>
                                    <li class="np-item">
                                        <a>云数据库PostgreSQL</a>
                                        <div class="buy-box">
                                            <img class="buy-img" src="./assets/img/home/buy-icon.png" />
                                            <span class="buy-font">立即购买</span>
                                        </div>
                                    </li>
                                    <li class="np-item">
                                        <a>云数据库SQLServer</a>
                                        <div class="buy-box">
                                            <img class="buy-img" src="./assets/img/home/buy-icon.png" />
                                            <span class="buy-font">立即购买</span>
                                        </div>
                                    </li>
                                    <li class="np-item">
                                        <a>云数据库MongoDB</a>
                                        <div class="buy-box">
                                            <img class="buy-img" src="./assets/img/home/buy-icon.png" />
                                            <span class="buy-font">立即购买</span>
                                        </div>
                                    </li>
                                    <li class="np-item">
                                        <a>云数据库Redis</a>
                                        <div class="buy-box">
                                            <img class="buy-img" src="./assets/img/home/buy-icon.png" />
                                            <span class="buy-font">立即购买</span>
                                        </div>
                                    </li>
                                </ul>
                                <div class="np-title2">
                                    <p>云运维</p>
                                </div>
                                <ul class="np-bs">
                                    <li class="np-item">
                                        <a>云监控</a>
                                    </li>
                                    <li class="np-dis">
                                        访问控制(敬请期待)
                                    </li>
                                </ul>
                            </div>
                        </Poptip>

                        <li class="nav-item active" @mouseenter='styleClass(3,$event)'>
                            <a href="#">解决方案</a>
                        </li>
                        <li class="nav-item active" @mouseenter='styleClass(4,$event)'>
                            <a href="#">定价</a>
                        </li>
                        <li class="nav-item active" @mouseenter='styleClass(5,$event)'>
                            <a href="#">云市场</a>
                        </li>
                    </ul>
                    <div class="line" :style='lineStyle'></div>
                </div>
          </div>

          <div class="m-head">
                <div class="mobile-head" v-cloak>
                    <div class="mh-top">
                        <div class="mr-icon" @click="mIcon = !mIcon">
                            <Icon type="md-menu" size="40" color='#9B908E' :class="mIcon?'mhead-icons':'mhead-icon'" />
                        </div>
                        <a class="mobile-logo" href="#" alt='新睿云'>
                            <div class="mobile-limg">
                                <img src='./assets/img/home/logo.gif'>
                            </div>
                        </a>
                        <div class="m-logining" v-if="userInfo" @click='mLogin =!mLogin'>
                            <img src="./assets/img/home/logining.png">
                            <div class="ml-text">名字有五个多字吗</div>
                            <div :class="mLogin?'ml-block':'ml-blocks'"></div>
                        </div>
                        <div class="m-pople" v-else>
                            <Icon type="md-person" size='40' @click="userInfo = !userInfo" />
                        </div>
                    </div>


                    <div class="m-login" :class='userInfo?"":"m-logins"' v-if="!userInfo">
                        <div>
                            <a ref="external nofollow" target="_blank" href="https://wap.xrcloud.net/ruicloud/console?from=xinruiyun-kongzhitai" title="控制台">控制台</a>
                        </div>
                        <div>
                            <a ref="external nofollow" target="_blank" href="https://wap.xrcloud.net/ruicloud/login?from=xinruiyun-denglu" title="登陆">登陆</a>
                        </div>
                        <div>
                            <a ref="external nofollow" target="_blank" href="  https://wap.xrcloud.net/ruicloud/register?from=xinruiyun-zhuce" title="注册">注册</a>
                        </div>
                    </div>
                </div>
                <div class="ml-right" :class="mLogin?'ml-rights':''" v-cloak>
                    <ul class="m-list">
                        <li class="m-item">
                            <a href="#" alt="用户中心">用户中心</a>
                        </li>
                        <li class="m-item">
                            <a href="#" alt="费用中心">费用中心</a>
                        </li>
                        <li class="m-item">
                            <a href="#" alt="消息中心">消息中心</a>
                        </li>
                        <li class="m-item">
                            <a href="" alt="操作日志">操作日志</a>
                        </li>
                        <li class="m-item">
                            <a href="" alt="退出登录">退出登录</a>
                        </li>
                    </ul>
                </div>
                <div class="mhead-list" :class="mIcon?'':'mhead-lists'">
                    <div style="text-align: center;">
                        <i-input style="width:87%;margin:20px 0;">
                            <Icon type="ios-search" size='30' slot="suffix" />
                        </i-input>
                    </div>

                    <div class="mhead-product">
                        <div style="padding: 10px 10px;">
                            <a ref="external nofollow" target="_blank" href="https://wap.xrcloud.net/ruicloud/sort?from=xinruiyun-huodongzhongxin" title="活动中心">活动中心</a>
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
                                        <a href="#" target="blank">弹性云服务器ECS</a>
                                    </div>
                                    <div class="mhead-chd">
                                        <a href="#" target="blank">镜像服务器</a>
                                    </div>
                                    <div class="mhead-chd">
                                        <a href="#" target="blank"> 云服务器快照</a>
                                    </div>
                                    <div class="mhead-chd">
                                        <a href="#" target="blank"> GPU加速服务器</a>
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
                                        <a href="#" target="blank"> 对象存储</a>
                                    </div>
                                    <div class="mhead-chd">
                                        <a href="#" target="blank"> 云硬盘</a>
                                    </div>
                                    <div class="mhead-chd">
                                        <a href="#" target="blank">云硬盘备份</a>
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
                                        <a href="#" target="blank"> 防火墙</a>
                                    </div>
                                    <div class="mhead-chd">
                                        <a href="#" target="blank"> DDoS基础防护</a>
                                    </div>
                                    <div class="mhead-chd">
                                        <a href="#" target="blank">DDoS高防IP</a>
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
                                        <a href="#" target="blank"> 虚拟私有云VPC</a>
                                    </div>
                                    <div class="mhead-chd">
                                        <a href="#" target="blank"> NAT网关</a>
                                    </div>
                                    <div class="mhead-chd">
                                        <a href="#" target="blank">弹性公网IP</a>
                                    </div>
                                    <div class="mhead-chd">
                                        <a href="#" target="blank"> 负载均衡</a>
                                    </div>
                                    <div class="mhead-chd">
                                        <a href="#" target="blank">虚拟专网VPN</a>
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
                                        <a href="#" target="blank"> 云监控</a>
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
                                        <a href="#" target="blank">云数据库MySQL</a>
                                    </div>
                                    <div class="mhead-chd">
                                        <a href="#" target="blank"> 云数据库PostgreSQL</a>
                                    </div>
                                    <div class="mhead-chd">
                                        <a href="#" target="blank"> 云数据库Redis</a>
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
                                            <a href="#" target="blank">域名注册</a>
                                        </span>
                                    </div>
                                    <div class="mhead-cdd">
                                        <span>
                                            <a href="#" target="blank">域名备案</a>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="mhead-product">
                        <div style="padding: 10px 10px;">
                            <span>解决方案</span>
                        </div>
                    </div>
                    <div class="mhead-product">
                        <div style="padding: 10px 10px;">
                            <span>定价</span>
                        </div>
                    </div>
                    <div class="mhead-product">
                        <div style="padding: 10px 10px;">
                            <span>云市场</span>
                            <!-- <span :class='item.itemShow?"mhead-arrow":"mhead-arrow2"'></span> -->
                        </div>
                    </div>
                    <div class="mhead-product">
                        <div style="padding: 10px 10px;">
                            <span>帮助文档</span>
                            <!-- <span :class='item.itemShow?"mhead-arrow":"mhead-arrow2"'></span> -->
                        </div>
                    </div>
                    <div class="mhead-product">
                        <div style="padding: 10px 10px;">
                            <span>新闻动态</span>
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
      <div id="foot-support">
        <div id="wrapper">
          <div v-for="(support,index) in support" class="flex-item" :key="index">
            <i class="iconfont" :class="support.img"></i>
            <div style="display: inline-block;vertical-align: middle">
              <span>{{support.title}}</span>
              <span style="display: block">{{support.subTitle}}</span>
            </div>
          </div>
        </div>
      </div>
      <!--页面尾部-->
      <div id="foot-footer">
        <div class="footer-top">
          <div class="description">
            <div class="product">
              <p>产品</p>
              <div v-for="(item,index) in description" :key="index">
                <ul>
                  <span>{{item.title}}</span>
                  <li v-for="(subItem,subIndex) in item.desc" :key="subIndex">
                    <a v-if="subItem.url!=''" :href="subItem.url">{{subItem.subTitle}}
                    </a>
                    <a v-else :href="subItem.url">{{subItem.subTitle}}</a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="document">
              <p>新闻动态</p>
              <a v-for="(d,index) in document" :key="index" :href="d.url" target="_blank">
                {{d.title}}
              </a>
            </div>
            <div class="document">
              <p>文档</p>
              <a v-for="(d,index) in notice" :key="index" :href="d.url" target="_blank">
                {{d.title}}
              </a>
            </div>
            <div class="contact">
              <span>联系我们</span>
              <span>服务热线：400-0505-565</span>
              <span>企业邮箱：service@unionstech.cn</span>
              <span>企业地址：北京市海淀区东升大厦AB座611、612</span>
              <img src="./assets/img/app/QR-code.jpg" alt="新睿云二维码">
            </div>
          </div>
          <div class="page-links">
            <div class="links-tit">友情链接</div>
            <div class="links-info">
              <a v-for="(item,index) in links" :key="index" :href="item.linkurl" target="_blank">{{ item.linkname }}</a>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <ul v-for="(item,index) in Preparation " :key="index">
            <p style="margin:0px;margin-right: 20px;">{{item.time}}</p>
            <li style="cursor: auto">{{item.title}}</li>
            <li>
              <a href="http://www.beian.miit.gov.cn/" target="_blank" rel="nofollow">{{item.preparation}}</a>
            </li>
            <li>
              <a href="http://www.beian.miit.gov.cn" rel="nofollow" target="_blank"
              >
                <img src="./assets/img/app/record.png" alt="京公网安备">{{item.desc}}
              </a>
            </li>
            <li>
              <a href="javascript:void(0)" target="_blank" style="cursor: auto">增值电信业务经营许可证B1-20180455</a>
            </li>
            <li>
              <a href="https://www.xrcloud.net/about/" rel="nofollow">关于我们</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 客服浮动块 -->
    <div class="affix">
      <div class="registerImg" @click="$router.push('/activity/free')">
        <p>免费领主机</p>
      </div>
      <!--<img src="./assets/img/app/regiterTag.png"/>-->
      <span class="qq" @mouseenter="QME" @mouseleave="QML">
        <div ref="qq" style="overflow: hidden;bottom:-48px;">
          <div class="wrapper" v-if="QQInfo.length>0">
            <div>
              <span class="title">人工客服</span>
              <div class="info-wrapper">
                <div v-for="(qq,index) of QQInfo" :key="index">
              <Tooltip :content="qq.qqstatus?'在线咨询':'请留言'" placement="top">
                <a target="_blank"
                   :href="`tencent://message/?uin=${qq.qqnumber}&amp;Site=www.xrcloud.net&amp;Menu=yes`"
                   style="color:rgb(73, 80, 96)" rel="nofollow">
                <img src="./assets/img/app/qq-blue.png" v-if="qq.qqstatus" alt="人工客服">
                  <img src="./assets/img/app/qq-gray.png" v-else alt="人工客服">
                <span style="width: 56px;display: inline-block;">{{qq.servicename}}</span>
                </a>
              </Tooltip>
            </div>
              </div>
            </div>
          </div>
            <div class="wrapper">
            <div style="padding:0 20px;cursor:pointer" @click="linkService">
            <span class="title">在线客服&nbsp&nbsp&nbsp<img style="vertical-align: bottom;" src="./assets/img/app/kefu-icon.png" /></span>
              </div>
          </div>
          <div class="wrapper" v-if="xiaoshouInfo.length>0">
            <div>
              <span class="title">售前咨询</span>
              <div class="info-wrapper">
                <div v-for="(qq,index) of xiaoshouInfo" :key="index">
              <Tooltip :content="qq.qqstatus?'在线咨询':'请留言'" placement="top">
                <a target="_blank"
                   :href="`tencent://message/?uin=${qq.qqnumber}&amp;Site=www.xrcloud.net&amp;Menu=yes`"
                   style="color:rgb(73, 80, 96)" rel="nofollow">
                 <img src="./assets/img/app/qq-red.png" v-if="qq.qqstatus" alt="售前咨询">
                  <img src="./assets/img/app/qq-gray.png" v-else alt="售前咨询">
                <span>{{qq.servicename}}</span>
                <i :class="{inline:qq.qqstatus}"></i>
                </a>
              </Tooltip>
            </div>
              </div>
            </div>
          </div>
          <div class="wrapper" v-if="yunweiInfo.length>0">
            <div>
              <span class="title">技术支持</span>
              <div class="info-wrapper">
                <div v-for="(qq,index) of yunweiInfo" :key="index">
              <Tooltip :content="qq.qqstatus?'在线咨询':'请留言'" placement="top">
                <a target="_blank"
                   :href="`tencent://message/?uin=${qq.qqnumber}&amp;Site=www.xrcloud.net&amp;Menu=yes`"
                   style="color:rgb(73, 80, 96)" rel="nofollow">
                 <img src="./assets/img/app/qq-blue.png" v-if="qq.qqstatus" alt="技术支持">
                  <img src="./assets/img/app/qq-gray.png" v-else alt="技术支持">
                <span>{{qq.servicename}}</span>
                <i :class="{inline:qq.qqstatus}"></i>
                </a>
              </Tooltip>
            </div>
              </div>
            </div>
          </div>
          <div class="wrapper">
            <div>
            <span class="title">咨询热线 <span>400-0505-565</span></span>
              </div>
          </div>
        </div>
      </span>
      <span class="phone" @click="getOrderType" @mouseenter="PME" @mouseleave="PML">
        <div ref="phoneE" style="overflow: hidden;bottom:5px;">
          <div class="wrapper">
            <div>
            <span class="title">投诉与建议</span>
              </div>
          </div>
        </div>
      </span>
      <div>
        <BackTop :bottom="161" :right="50" :duration="300" :height="1000" style="position: unset">
          <span class="topLink"></span>
        </BackTop>
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
      <div v-show="complaintForm.step==2" class="complain-modal">
        <img src="./assets/img/payresult/paySuccess.png"/>
        <p>—您的烦恼我们已经收到—</p>
        <p>我们会将处理结果发送至您的手机</p>
        <p>请耐心等待</p>
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
  import axios from '@/util/axiosInterceptor'
  import $store from './vuex'
  import {mapState} from 'vuex'
  import debounce from 'throttle-debounce/debounce'
  import '@/assets/iconfont/frontend/iconfont.css'
  import '@/assets/iconfont/frontend/iconfont.js'
  import uuid from 'uuid'
  import regExp from './util/regExp'

  export default {
    name: 'app',
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
        titleItem: [
          {
            title: '活动中心',
            path: '/activity/'
          },
          {
            title: '首页',
            path: '/'
          },
          {
            title: '产品',
            path: '',
            content: [
              {
                prod: '云计算',
                prodItem: [
                  {title: '弹性云服务器（ECS）', desc: '通用型、内存优化型、高IO型', path: '/ecs/'},
                  {title: '镜像服务', desc: '公共镜像、功能镜像、自定义镜像', path: '/mirrorservice/'},
                  {title: 'ECS快照', desc: '稳定可靠、安全保障', path: '/ecssnapshot/'},
                  {title: 'GPU服务器', desc: 'Tesla P100、Tesla P40 GPU', path: '/gpu/'},
                  {title: '弹性伸缩', desc: '高可用、可视化、低成本', path: '/elasticscalable/'},
                  {title: 'DDoS高防主机', desc: '最大800G超大防护', path: '/ddos'},
                  {title: '裸金属服务器（敬请期待）', desc: '专属物理服务器', path: '/'}
                ]
              },
              {
                prod: '云网络',
                prodItem: [
                  {title: '虚拟私有云VPC', desc: '网络隔离、分配子网', path: '/vpc/'},
                  {title: '弹性IP', desc: '绑定与解绑IP、扩容', path: '/elasticip/'},
                  {title: '负载均衡', desc: '源算法、轮询、最小连接数', path: '/loadbalancing/'},
                  {title: 'NAT网关', desc: 'TCP/HTTP协议、多对一支持', path: '/natgateway/'},
                  {title: '虚拟专网VPN', desc: '跨VPC连接', path: '/vpn/'},
                  {title: 'CDN（敬请期待）', desc: '节点丰富、安全易用', path: '/'}
                ]
              },
              {
                prod: '云存储',
                prodItem: [
                  {title: '云硬盘', desc: '性能型、超高性能型、存储型', path: '/disk/'},
                  {title: '云硬盘备份', desc: '高可用保障、敏捷易用', path: '/diskbackup/'},
                  {title: '对象存储', desc: '安全稳定，海量便捷', path: '/objectstorage'}
                ]
              },
              {
                prod: '云数据库',
                prodItem: [
                  {
                    title: '云数据库',
                    desc: 'MySQL、PostgreSQL、mongoDB、Redis',
                    path: '/database/'
                  },
                ],
                subProd: [
                  {
                    prod: '域名与备案',
                    prodItem: [
                      {
                        title: '域名注册',
                        desc: '自定义域名注册、查询',
                        path: '/domain/'
                      },
                      {
                        title: '域名备案',
                        desc: '高效贴心的域名备案服务',
                        path: '/icp/'
                      },
                    ]
                  },
                ]
              },
              {
                prod: '云安全',
                prodItem: [
                  {title: '防火墙', desc: '自定义规则、协议、端口', path: '/firewall/'},
                  {title: 'DDOS高防IP', desc: '最高10T防护容量', path: '/ddosip/'},
                  {
                    title: 'SSL证书',
                    desc: '网站可信身份认证与安全数据传输',
                    path: '/ssl/'
                  },
                ],
                subProd: [
                  {
                    prod: '云运维',
                    prodItem: [
                      {title: '云监控', desc: '自定义监控项、多告警推送方式', path: '/monitor/'},
                      {title: '访问控制（敬请期待）', desc: '权限管理、精准控制', path: '/'}
                    ]
                  }
                ]
              },
            ]
          },
          {
            title: '云市场',
            path: '/market'
          },
          {
            title: '帮助文档',
            path: 'https://www.xrcloud.net/support/products/',
            content: [
              {
                prod: '产品文档',
                path: 'https://www.xrcloud.net/support/products/'
              },
              {
                prod: '常见问题',
                path: 'https://www.xrcloud.net/support/asks/'
              },
              {
                prod: '快速入门',
                path: 'https://www.xrcloud.net/support/quick/'
              }
            ]
          },
          {
            title: '新闻动态',
            path: 'https://www.xrcloud.net/news/',
            content: [
              {
                prod: '云服务器',
                path: 'https://www.xrcloud.net/news/yunfuwuqi/'
              },
              {
                prod: '云计算',
                path: 'https://www.xrcloud.net/news/yunjisuan/'
              },
              {
                prod: '云安全',
                path: 'https://www.xrcloud.net/news/yunanquan/'
              },
              {
                prod: '香港云服务器 ',
                path: 'https://www.xrcloud.net/news/xianggangyunfuwuqi/'
              },
              {
                prod: '虚拟主机',
                path: 'https://www.xrcloud.net/news/xunizhuji/'
              },
              {
                prod: '服务器虚拟化',
                path: 'https://www.xrcloud.net/news/fuwuqixunihua/'
              },

              {
                prod: '域名交流',
                path: 'https://www.xrcloud.net/news/yumingjiaoliu/'
              }
            ]
          },
          {
            title: '关于我们',
            path: 'https://www.xrcloud.net/about/'
          }
        ], // banner item
        currentItem: -1, // 当前选中item  默认为-1(未选中)
        lineStyle: {
          width: '0px',
          left: '0px',
          transition: 'width .3s'
        }, // line的width和left属性
        lineIndex:0,
        mLogin:true,
        mIcon: true,
        support: [
          {img: 'icon-duoqudaofuwuyuzhichi', title: '7*24', subTitle: '多渠道服务与支持'},
          {img: 'icon-fankuiyutousujianyiA', title: '意见', subTitle: '反馈与投诉建议'},
          {img: 'icon-zhuanxiangfuwu', title: '1V1', subTitle: '专项服务'},
          {img: 'icon-tianwuliyoutuihuo', title: '退款', subTitle: '7天无理由退款'}
        ],
        description: [
          {
            title: '云计算',
            desc: [
              {subTitle: '弹性云服务器（ECS）', url: '/ecs/'},
              {subTitle: '镜像服务', url: '/mirrorservice/'},
              {subTitle: 'ESC快照', url: '/ecssnapshot/'},
              {subTitle: 'GPU服务器', url: '/gpu/'},
              {subTitle: '弹性伸缩', url: '/elasticscalable/'},
              {subTitle: '裸金属服务器（敬请期待）', url: '/'},
            ]
          },
          {
            title: '云网络',
            desc: [
              {subTitle: '虚拟私有云VPC', url: '/vpc/'},
              {subTitle: '弹性IP', url: '/elasticip/'},
              {subTitle: '负载均衡', url: '/loadbalancing/'},
              {subTitle: 'NAT网关', url: '/natgateway/'},
              {subTitle: '虚拟专网VPN', url: '/vpn/'},
              {subTitle: 'CDN（敬请期待）', url: '/'}
            ]
          },
          {
            title: '云储存',
            desc: [
              {subTitle: '云硬盘', url: '/disk/'},
              {subTitle: '云硬盘备份', url: '/diskbackup/'},
              {title: '对象存储', url: '/objectstorage'}
            ]
          },
          {
            title: '云安全',
            desc: [
              {subTitle: '防火墙', url: '/firewall/'},
              {subTitle: 'DDOS高防IP', url: '/ddosip/'}
            ]
          },
          {
            title: '云维护',
            desc: [
              {subTitle: '云监控', url: '/monitor/'},
              {subTitle: '访问监控（敬请期待）', url: '/'}
            ]
          }
        ], // 页尾列表详情
        document: [
          {title: '云服务器', url: 'https://www.xrcloud.net/news/yunfuwuqi/'},
          {title: '云计算', url: 'https://www.xrcloud.net/news/yunjisuan/'},
          {title: '云安全', url: 'https://www.xrcloud.net/news/yunanquan/'},
          {title: '香港云服务器', url: 'https://www.xrcloud.net/news/xianggangyunfuwuqi/'},
          {title: '虚拟主机', url: 'https://www.xrcloud.net/news/xunizhuji/'},
          {title: '服务器虚拟化', url: 'https://www.xrcloud.net/news/fuwuqixunihua/'},
          {title: '域名交流', url: 'https://www.xrcloud.net/news/yumingjiaoliu/'}
        ],
        // 服务与公告
        notice: [
          {title: '产品文档', url: 'https://www.xrcloud.net/support/products/'},
          {title: '常见问题', url: 'https://www.xrcloud.net/support/asks/'},
          {title: '快速入门', url: 'https://www.xrcloud.net/support/quick/'},
        ],
        // 友情链接
        links: [
          {href: 'https://www.xrcloud.net/', text: '新睿云'}
        ],
        Preparation: [
          {
            time: '©2019',
            title: '北京允睿讯通科技有限公司',
            preparation: '京ICP备15035854号',
            desc: '京公网安备11010802024922号',
            msg: '关于我们'
          }
        ], // footer-bottom
        kfURL: '',  // 客服url地址
        QQInfo: [],  // QQ客服在线情况
        xiaoshouInfo: [],  // QQ销售在线情况
        yunweiInfo: [],  // QQ运维在线情况,
        /* 倒计时参数 */
        day: '00',
        hour: '00',
        minute: '00',
        second: '00',
        hintShow: false,
        timer: null,
        UUID: '',
        showModal: {
          complaintModal: false
        },
        complaintForm: {
          complaintTitle: '',
          issueType: '',
          typeList: [],
          issueDesc: '',
          phone: '',
          step: 1
        },
        complaintFormRule: {
          complaintTitle: [
            {required: true, validator: regExp.validaRegisteredName, trigger: 'blur'}
          ],
          issueType: [
            {required: true, message: '请选择问题类型', trigger: 'change'}
          ],
          issueDesc: [
            {required: true, message: '请描述一下您的问题', trigger: 'blur'}
          ],
          phone: [
            {required: true, validator: validPhoneNumber, trigger: 'blur'}
          ]
        },
      }
    },
    mounted() {
      // this.hintShow = sessionStorage.getItem('hintShow') == 'true' ? true : false
      // if (sessionStorage.getItem('hintShow') == 'true') {
      //   this.$refs.hint.style.height = '80px'
      // }
      //this.setTime()
      let params = {
        batchNumber: window.UUID,
        type: '1',
        pageURL:window.location.href ,
      }
      // 获取入口信息
      axios.post('information/webReachableRecord.do', params)

    },
    created() {
      if(!localStorage.getItem('isLogin')){
        this.getloginPromptMessage()
      }
      // if (sessionStorage.getItem('hintShow') == null) {
      //   sessionStorage.setItem('hintShow', 'true')
      // }
      let from = window.location.href.split('from=')[1] ? window.location.href.split('from=')[1] : ''
      let sellCode = window.location.href.split('sellCode=')[1] ? window.location.href.split('sellCode=')[1] : ''
      if (from) {
        // 流量来源记录
        localStorage.setItem('comefrom', from)
      }
      if (sellCode) {
        // 销售来源渠道
        localStorage.setItem('sellCode', sellCode)
      }
      window.UUID = uuid.v4()
      let params = {
        batchNumber: window.UUID,
        type: '0',
        pageURL: window.location.href
      }
      // 写入入口信息
      axios.post('information/webReachableRecord.do', params
      )
      // 获取所有后台需要的基本信息
      // 获取用户信息
      var userInfo = axios.get('user/GetUserInfo.do', {params: {t: new Date().getTime()}})
      // 获取zone信息
      var zoneList = axios.get('information/zone.do', {params: {t: new Date().getTime(),buy: '1'}})
      Promise.all([userInfo, zoneList]).then(values => {
        if (values[0].data.status == 1 && values[0].status == 200) {
          $store.commit('setAuthInfo', {authInfo: values[0].data.authInfo, userInfo: values[0].data.result, authInfoPersion: values[0].data.authInfo_persion})
          localStorage.setItem('realname', values[0].data.result.realname)
        }
        if (values[1].data.status == 1 && values[1].status == 200) {
          $store.commit('setZoneList', values[1].data.result)
        }
      },)
      this.$http.get('user/getKfAdd.do',{
        params:{
          type:''
        }
      }).then(response => {
        this.kfURL = response.data.result
      })
      // QQ客服在线情况
      this.$http.get('network/getQQCustomerServiceStatus.do').then(response => {
        this.QQInfo = response.data.kefu
        this.xiaoshouInfo = response.data.xiaoshou
        this.yunweiInfo = response.data.yunwei
        /*for (let key in response.data.result) {
         this.QQInfo.push({
         key,
         value: response.data.result[key]
         })
         }*/
      })
      // 设置友情链接
      this.$http.get('friendshipLink.do').then(response => {
        this.links = response.data.result
      })
    },
    methods: {
       login () {
        this.$router.push('login')
      },
      /* li mouseenter事件 重新设置line样式 */
      QME() {
        this.$refs.qq.style.width = '200px'
      },
      QML() {
        this.$refs.qq.style.width = '0px'
      },
      PME() {
        this.$refs.phoneE.style.width = '95px'
      },
      PML() {
        this.$refs.phoneE.style.width = '0px'
      },
      styleClass(index, event) {
          if (index != -1) {
                    this.lineStyle.transition = 'all  .3s';
                    this.lineStyle.left = event.target.offsetLeft + 'px';
                    this.lineStyle.width = event.target.clientWidth + 'px';
                    this.lineIndex = index;
          } else {
                    this.lineStyle.width = '0px';
                    this.lineIndex = -1;
          }
        },

         // 移动端头部产品手风琴动效
        getSelectDown(index) {
                let arry = document.querySelectorAll('.mhead-product .mhead-pone');
                let arry2 = document.querySelectorAll('.mhead-product .active');
                if (arry[index].className == 'mhead-pone mhead-pones') {
                    arry[index].className = 'mhead-pone mhead-pone';
                    arry2[index].className = 'active mhead-arrow';
                } else {
                    arry[index].className = 'mhead-pone mhead-pones';
                    arry2[index].className = 'active mhead-arrow2';
                }
        },

      go(path) {
        if (path == 'exit') {
          this.exit()
          return
        }
        // this.$router.push(path)
      },
      exit() {
        localStorage.removeItem("realname")
        axios.get('user/logout.do').then(response => {
          window.location.reload()
        })
      },
      closeHeadHint() {
        this.hintShow = false
        this.$refs.hint.style.height = 0
        sessionStorage.setItem('hintShow', 'false')
      },
      /* 倒计时方法 */
      setTime() {
        axios.get('network/getTime.do').then(res => {
          if (res.data.status == 1) {
            let startTime = res.data.result
            let endTime = new Date('2018/12/17').getTime()
            let limitTime = endTime - startTime
            if (limitTime > 0) {
              this.setLimit(limitTime)
              this.timer = setInterval(() => {
                this.setLimit(limitTime)
                limitTime -= 1000
                if (limitTime <= 0) {
                  window.clearInterval(this.timer)
                }
              }, 1000);
            } else {
              this.day = this.checkTime(0);
              this.hour = this.checkTime(0);
              this.minute = this.checkTime(0);
              this.second = this.checkTime(0);
            }
          }
        })
      },
      setLimit(time) {
        let days = parseInt(time / 1000 / 60 / 60 / 24, 10); //计算剩余的天数
        let hours = parseInt(time / 1000 / 60 / 60 % 24, 10); //计算剩余的小时
        let minutes = parseInt(time / 1000 / 60 % 60, 10);//计算剩余的分钟
        let seconds = parseInt(time / 1000 % 60, 10);//计算剩余的秒数
        this.day = this.checkTime(days);
        this.hour = this.checkTime(hours);
        this.minute = this.checkTime(minutes);
        this.second = this.checkTime(seconds);
      },
      checkTime(i) { //将0-9的数字前面加上0，例1变为01
        if (i < 10) {
          i = '0' + i;
        }
        return i;
      },
      openInfo(href) {
        window.open(href)
      },
      getOrderType(){
        this.complaintForm.step = 1
        this.$http.get('order/orderType.do',{params:{
          gid: '5'
        }}).then(res=>{
          if(res.data.status == 1 && res.status == 200){
            this.complaintForm.typeList = res.data.result['投诉建议']
            this.showModal.complaintModal = true
          } else{
            this.$message.info({
              content: res.data.message
            })
          }
        })
      },
      sumbitComplaint(name) {
        this.$refs[name].validate(valid => {
          if (valid) {
            let url = 'order/createSuggestions.do'
            let params = {
              phone: this.complaintForm.phone,
              title: this.complaintForm.complaintTitle,
              gid: '5',
              cid: this.complaintForm.issueType,
              questionDesc: this.complaintForm.issueDesc
            }
            this.$http.post(url,params).then(res=>{
              if(res.status == 200){
                this.complaintForm.step = 2
              } else{
                this.$message.info({
                  content: res.data.message
                })
              }
            })
          }
        })
      },
      getloginPromptMessage(){
        this.$http.get('user/loginPromptMessage.do',{params:{}}).then(res=>{
          if(res.data.status == 1){
            localStorage.setItem('isLogin','已提示')
            this.$Message.info({
                    content: res.data.message,
                    duration: 10,
                    closable: true
                })
          }
        })
      },
      linkService(){
        if(this.userInfo){
          window.open(`https://im.xrcloud.net/im/text/0Jck1w.html?companyId=${this.userInfo.companyid}`)
        } else{
          window.open('https://im.xrcloud.net/im/text/0Jck1w.html')
        }
      }
    },
    computed: mapState({
      userInfo: state => state.userInfo
    }),
    watch: {
      /* 观察currentItem变化 设置content高度 */
      currentItem() {
        var content = this.$refs.content
        for (var i in content) {
          if (i == this.currentItem) {
            content[i].style.height = `${content[i].firstChild.clientHeight + 25}px`
          } else {
            content[i].style.height = '0px'
          }
        }
      }
    },
    beforeRouteLeave(to, from, next) {
      clearInterval(this.timer)
      next()
    }
  }
</script>

<style rel="stylesheet/less" lang="less">
  #front {
    .app-hint {
      height: 0;
      background: url("./assets/img/app/hint-banner.png") center no-repeat, linear-gradient(to right, #FF4439, #FF1569);
      position: relative;
      transition: height .5s ease;
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
              color: #FFF
            }
          }
        }
      }
    }

    header {

      .pc-head {
        width: 100%;
        background-color: #1D1716;
        height: 40px;
        display: flex;
        justify-content: space-between;
      }
     .pc-head a{
        display: inline-block;
        margin: 0;
      }
    .pc-head .p-collapse .lg-in {
      color: #FF624B;
      width: 66px;
      display: inline-block;
      text-align: center;
      line-height: 40px;
      font-size: 14px;
      vertical-align: top;
    }
    .user-list{
       margin-right: 20px;
      a{
        color: #333333;
      }
    .user-fn{
      position:relative;line-height:40px;padding-left:20px;color:#ffffff;
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
  background: #FF624B;
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
  background: #2D2523;
  color: #fff;
  font-family: MicrosoftYaHei;
  display: flex;
  border-bottom: 1px solid #9A9DA5;
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

.nav-list .nav-left .np-box,.np-bs a {
  color: #514644;
  text-decoration: none;
}

.nav-list .nav-left .np-box .np-title {
  border-bottom: 1px solid #E8DFDD;
  padding-bottom: 10px;
}

.nav-list .nav-left .np-box .np-title2 {
  border-bottom: 1px solid #E8DFDD;
  padding-bottom: 10px;
  margin-top: 20px;
}

.nav-list .nav-left .np-bs {
  color: #514644;
  font-size: 14px;
  width: 220px;
}

.nav-list .nav-left .np-bs .np-item a:hover {
  color: #FF624B;
}

.nav-list .nav-left .np-bs .np-item {
  margin: 12px 0;
}

.nav-list .nav-left .np-bs .np-item .buy-box {
  float: right;
}

.nav-list .nav-left .np-bs .np-item .buy-box:hover>.buy-img {
  display: none;
  opacity: 0;
  transition: all 0.3s ease-in-out;
}

.nav-list .nav-left .np-bs .np-item .buy-box:hover>.buy-font {
  display: inline-block;
  color: #4297F2;
  font-size: 12px;
  opacity: 1;
  transition: all 0.3s ease-in-out;
}

.nav-list .nav-left .np-bs .np-dis {
  color: #C5C0BF;
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
.nav-list .nav-left .nav-item a{
   color: #fff;
  text-decoration: none;
}
.nav-list .nav-left .nav-item a:hover{
  color: #fff;
  text-decoration: none;
}

.nav-list .line {
  width: 20px;
  height: 2px;
  background-color: #FF624B;
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
    position: absolute;
    width: 100%;
    z-index: 999;
  }
    .mobile-head .mobile-logo {
    width: 103px;
    height: 60px;
  }

  .mobile-head .mobile-logo .mobile-limg {
    width: 135px;
    height: 40px;
    display: inline-block;
    vertical-align: middle;
    overflow: hidden;
  }

  .mobile-head .mobile-logo .mobile-limg img {
    width: 103px;
    height: auto;
    max-width: 86%;
    max-height: 66px;
    position: relative;
    top: -11px;
}
    .mobile-head .mr-icon{
    height: 60px;
    line-height: 60px;
    }
    .mobile-head .mh-top {
      padding: 0 39px;
      background-color: rgba(54, 58, 70, 0.24);
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
      #foot-support {
        padding: 30px 0px;
        #wrapper {
          width: 1100px;
          margin: 0px auto;
          display: flex;
          justify-content: space-between;
          .flex-item {
            i {
              vertical-align: middle;
              font-size: 40px;
              color: #cccccc;
            }
            span {
              font-size: 14px;
              color: #999999;
              line-height: 18px;
            }
          }
        }
      }
      #foot-footer {
        .footer-top {
          // height: 340px;
          background-color: #434343;
          padding: 46px 0 20px 0;
          .description {
            width: 1200px;
            margin: 0px auto;
            display: flex;
            .product {
              width: 55%;
              > p {
                color: #ffffff;
                font-size: 14px;
                margin-bottom: 30px;
              }
              > div {
                margin-right: 20px;
                display: inline-block;
                height: 149px;
                vertical-align: bottom;
                ul {
                  span {
                    color: #ffffff;
                    margin-bottom: 15px;
                    display: table;
                    font-size: 12px;
                  }
                  li {
                    font-size: 12px;
                    margin-bottom: 15px;
                    line-height: 100%;
                    a {
                      color: #999999;
                      &:hover {
                        color: #377dff
                      }
                    }
                  }
                }
              }
            }
            .document {
              width: 12%;
              > p {
                color: #ffffff;
                font-size: 14px;
                margin-bottom: 26px;
              }
              > a {
                color: #ffffff;
                display: table;
                margin-bottom: 15px;
                &:hover {
                  color: #377dff
                }
              }
            }
            .contact {
              width: 30%;
              > span {
                color: #ffffff;
                display: table;
                font-size: 14px;
                margin-bottom: 18px;
                &:first-of-type {
                  margin-bottom: 30px;
                }
              }
              img {
                width: 100px;
                height: 100px;
              }
            }
          }
          .page-links {
            width: 1200px;
            margin: 0px auto;
            .links-tit {
              float: left;
              margin-right: 30px;
              font-size: 14px;
              color: #FFF;
              line-height: 16px;
            }
            .links-info {
              width: auto;
              margin-left: 86px;
              a {
                margin-right: 20px;
                display: inline-block;
                font-size: 12px;
                color: #fff;
                line-height: 14px;
                &:hover {
                  color: #377dff
                }
              }
            }

          }
        }
        .footer-bottom {
          background-color: #1B1B1B;
          a {
            color: #fff;
          }
          ul {
            width: 1200px;
            margin: 0 auto;
            padding: 31px 0px;
            display: flex;
            justify-content: flex-start;
            > p {
              margin-right: 20px;
              line-height: 20px;
              font-size: 12px;
            }
            li {
              line-height: 20px;
              font-size: 12px;
              color: #FFF;
              margin-right: 70px;
              cursor: pointer;
            }
            img {
              vertical-align: middle;
              margin-right: 5px
            }
          }
        }
      }
    }
    .affix {
      position: fixed;
      right: 15px;
      bottom: 20px;
      z-index: 100;
      display: flex;
      flex-direction: column;
      > span {
        width: 48px;
        height: 48px;
        display: block;
        padding: 10px;
        background: #E1E1E1 no-repeat center;
      }
      .registerImg {
        height: 100px;
        background: url('./assets/img/app/regiterTag.png');
        margin-bottom: 10px;
        cursor: pointer;
        box-shadow: 0px 2px 19px -8px rgba(239,77,54,1);
        >p{
          font-size:14px;
          font-family:MicrosoftYaHei-Bold;
          font-weight:bold;
          color:rgba(255,255,255,1);
          line-height:16px;
          width: 14px;
          padding: 9px 17px;
        }
      }
      .qq {
        position: relative;
        background-color: #ffffff;
        background-image: url('./assets/img/app/qq.png');
        margin-bottom: 10px;
        /*&:hover {
          background: #2A99F2 url('./assets/img/app/qq-hover.png') no-repeat center;
        }*/
        > div {
          position: absolute;
          width: 0px;
          background-color: #ffffff;
          right: 55px;
          top: unset;
          transition: width .3s;
          box-shadow:0px 2px 16px -5px rgba(130,130,130,0.5);
          border-radius:10px;
        }
        & > a {
          width: 100%;
          height: 100%;
          display: block;
        }
        .wrapper {
          width: 200px;
          right: 0px;
          top: 0px;
          > div {
            padding: 20px 20px 10px;
            > span {
              font-size: 12px;
              font-family: MicrosoftYaHei;
              color: rgba(102, 102, 102, 1);
              line-height: 16px;
              &.title {
                color: rgba(29, 23, 22, 1);
                font-size: 14px;
                span{
                  font-family:MicrosoftYaHei-Bold;
                  font-weight:bold;
                }
              }
            }
            .info-wrapper {
              margin-top: 10px;
              > div {
                margin-bottom: 5px;
                width: 50%;
                display: inline-block;
                img {
                  vertical-align: middle;
                }
                span {
                  vertical-align: middle;
                  width: 56px;
                  display: inline-block;
                }
              }
            }
          }
        }
      }
      .service {
        width: 48px;
        height: 48px;
        display: block;
        padding: 10px;
        background: #E1E1E1;
        background-repeat: no-repeat;
        background-position: center;
        background-image: url('./assets/img/app/customer-service-gray.png');
        &:hover {
          background: #2A99F2;
          background-repeat: no-repeat;
          background-position: center;
          background-image: url('./assets/img/app/customer-service-white.png');
        }
        & > a {
          width: 100%;
          height: 100%;
          display: block;
        }
      }
      .phone {
        width: 48px;
        height: 48px;
        display: block;
        padding: 10px;
        background: #FFF;
        position: relative;
        background-repeat: no-repeat;
        background-position: center;
        background-image: url('./assets/img/app/phone.png');
        cursor: pointer;
        margin-bottom: 10px;
        /*&:hover {
          background: #2A99F2;
          background-repeat: no-repeat;
          background-position: center;
          background-image: url('./assets/img/app/phone-hover.png');
        }*/
        > div {
          position: absolute;
          width: 0px;
          background-color: #ffffff;
          right: 55px;
          top: unset;
          transition: width .3s;
          box-shadow:0px 2px 16px -5px rgba(130,130,130,0.5);
          border-radius:15px;
        }
        .wrapper {
          width: 95px;
          right: 0px;
          top: 0px;
          > div {
            padding: 10px ;
            > span {
              font-size: 12px;
              font-family: MicrosoftYaHei;
              color: rgba(102, 102, 102, 1);
              line-height: 16px;
              &.title {
                color:#333333;
                font-size: 14px;
              }
            }
          }
        }
      }
      .topLink {
        display: block;
        width: 48px;
        height: 48px;
        box-shadow: 0px 2px 16px -5px rgba(255,98,75,1);
        background: #FF624B url(./assets/img/app/top.png) no-repeat center;
      }
    }
    .backtop {
      width: 48px;
      background: #E1E1E1 no-repeat center;
      color: #6a6a6a;
      text-align: center;
      &:hover {
        background: #2A99F2;
        color: #fff;
      }
    }
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

</style>
