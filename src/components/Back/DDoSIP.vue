<template>
    <div id="background">
        <div id="wrapper">
            <span class="title">云安全 / DDoS高防IP / <span>业务管理</span></span>
             <div id="content">
                <div id="header">
                    <span id="title">DDoS高防IP</span>
                    <button id="refresh_button" @click="$router.go(0)" style="margin-top: 10px;">刷新</button>
                </div>
                 <div class="text-box">
                    <p>依托于庞大的节点、带宽资源，高达10T的云防护容量，全方位防护各类DDoS和CC攻击，保证您的业务稳定在线。</p>
                </div>
                 <Tabs type="card" :animated='false' :value='tabsValue' @on-click='tabsChange'>
                    <TabPane label="概览" name='概览'>
                        <div class="dp-row">
                            <RadioGroup v-model="overviewRadio" type="button" @on-change='statisticsChange'>
                                <Radio label="概览"></Radio>
                                <Radio label="DDoS攻击统计"></Radio>
                                <Radio label="CC统计"></Radio>
                                <Radio label="业务统计"></Radio>
                            </RadioGroup>
                        </div>

                        <!-- 概览 -->
                       <div v-if="overviewRadio == '概览'">
                           <div>
                               <Button type="primary" @click="$router.push('buy/ddosip')" style="margin-right:10px;">购买套餐</Button>
                               <Button type="primary" :disabled='renewDisabled' @click="showModal.meal = true,queryMealRenew(0)">套餐续费</Button>
                           </div>
                           <div>
                               <div class="selectMark">
                                    <img src="../../assets/img/host/h-icon10.png"/>
                                    <span>共 {{ overviewData.length }} 项 | 已选择 <span style="color:#FF624B;">{{ overviewSelect.length }} </span>项</span>
                                </div>
                                 <Table :columns="overviewList" :data="overviewData" @on-selection-change='overviewTableChange'></Table>
                                 <div class="dp-page">
                                    <Page :total="overviewData.length" @on-change='getDdosOverview' :page-size='pageSize' :current='overviewPage' style="display:inline-block;vertical-align: middle;margin-left:20px;" show-sizer :page-size-opts=[10,20,50,100]></Page>
                                </div>
                           </div>
                       </div>

                       <!-- DDoS攻击统计  -->
                       <div v-if="overviewRadio == 'DDoS攻击统计'">
                           <div class="dp-ds">
                               <div> 
                                   <span>套餐选择</span>
                                    <Select size="small" v-model="attackMeal" style="width:231px;margin-left:10px;">
                                        <Option v-for="item in setMealList" :value="item.packageid" :key="item.packageid">{{ item.packageid }}</Option>
                                    </Select>
                               </div>
                              <div style="margin-left:20px;">
                                   <span>按统计时间</span>
                                   <DatePicker :options="options" v-model='statisticsTime' format='yyyy-MM-dd' size='small' :transfer='true' type="daterange" placeholder='选择时间'  placement="bottom-end"  style="width: 231px;margin:0 10px;"></DatePicker>
                                   <Button size='small' type="primary" style="width:54px;" @click="getMitigatedBandwidth">查询</Button>
                               </div>
                           </div>
                           <div>
                               <div class="dp-grad dp-row">
                                    <div>
                                        <span class="b-font">DDoS清洗流量</span>
                                        <span>统计该套餐下在所选时间段所有域名和转发规则下攻击峰值</span>
                                    </div>
                                    <div>
                                    <span class="l-font">刷新</span> 
                                    </div>
                                </div>
                                <div style="display:flex;">
                                    <div class="dp-fh" style="width:380px;">
                                        <div>
                                            <div>
                                                <span class="fh-sp">峰值时间</span>
                                            </div>
                                            <div class="dp-bt">
                                                <span class="b-font" style="margin:0px;">{{ddosFlow.time}}</span>
                                            </div>
                                        </div> 
                                    </div>
                                    <div class="dp-fh" style="width:380px;">
                                        <div>
                                            <div>
                                                <span class="fh-sp">DDoS攻击带宽峰</span>
                                            </div>
                                            <div class="dp-bt">
                                                <span class="b-font" style="margin:0px;">{{ddosFlow.flow}}</span>
                                            </div>
                                        </div> 
                                    </div>
                                    <div class="dp-fh" style="width:380px;margin:0;">
                                        <div>
                                            <div>
                                                <span class="fh-sp">已清洗流</span>
                                            </div>
                                            <div class="dp-bt">
                                                <span class="b-font" style="margin:0px;">{{ddosFlow.outFlow}}</span>
                                            </div>
                                        </div> 
                                    </div>
                                </div>

                                <div class="dp-mbr">
                                    <p style="font-size:14px;color:#333333;">清洗流量统计（单位Gbps）</p>
                                    <div class="no-data" v-if="hightIp.series[0].data.length == 0">
                                        <p class="no-pfb">暂无数据</p>
                                        <p class="no-pfs">该时段未产生攻击或攻击数据暂未更新，请稍后重试</p>
                                    </div>
                                    <chart v-show="hightIp.series[0].data.length != 0" style="width:100%;" id='hightIp' :options="hightIp"></chart>
                                </div>
                           </div>
                           <div>
                               <div class="dp-grad dp-row">
                                    <div>
                                        <span class="b-font">攻击事件统计</span>
                                        <span>查询指定套餐，及指定时间范围已防护的业务的DDoS的攻击事件</span>
                                    </div>
                                    <div>
                                    <span class="l-font">刷新</span> 
                                    </div>
                                </div>
                                <Table no-data-text='暂无攻击数据' :columns="ddosAttEventList" :data="ddosAttEventData"></Table>
                                <div class="dp-page">
                                    <Page :total="ddosAttEventData.length" style="display:inline-block;vertical-align: middle;margin-left:20px;" ></Page>
                                </div>
                           </div>
                            <div>
                               <div class="dp-grad dp-row">
                                    <div>
                                        <span class="b-font">攻击目标统计</span>
                                        <span>查询指定套餐，及指定时间范围已防护的业务的遭受DDoS的攻击目标IP的相关信息</span>
                                    </div>
                                    <div>
                                    <span class="l-font">刷新</span> 
                                    </div>
                                </div>
                                <Table no-data-text='暂无攻击数据' :columns="ddosAttInfoList" :data="ddosAttInfoData"></Table>
                                <div class="dp-page">
                                    <Page :total="ddosAttInfoData.length" style="display:inline-block;vertical-align: middle;margin-left:20px;"></Page>
                                </div>
                           </div>
                           <div style='display:flex;justify-content: space-between;'>
                            <div class="dp-row">
                               <div class="dp-mbr" style="margin-right:20px;width:570px;">
                                    <div class='dp-tp'>
                                        <span style="font-size:14px;color:#333333;">清洗流量统计（单位Gbps）</span>
                                         <span class="l-font" style='float:right;'>刷新</span> 
                                    </div>
                                    <div style='display:flex;'>
                                    <div class="dp-th">
                                        <div>
                                            <div>
                                                <span class="fh-sp">清洗流量最多类型</span>
                                            </div>
                                            <div class="dp-bts">
                                                <span class="b-font" style="margin:0px;">ICMP</span>
                                            </div>
                                        </div> 
                                    </div>
                                    <div class="dp-th">
                                        <div>
                                            <div>
                                                <span class="fh-sp">清洗最大值</span>
                                            </div>
                                            <div class="dp-bts">
                                                <span class="b-font" style="margin:0px;">5672Mbps</span>
                                            </div>
                                        </div> 
                                    </div>
                                    <div class="dp-th">
                                        <div>
                                            <div>
                                                <span class="fh-sp">峰值时间</span>
                                            </div>
                                            <div class="dp-bts">
                                                <span class="b-font" style="margin:0px;">10-15 24:24</span>
                                            </div>
                                        </div> 
                                    </div>
                                    </div>
                                    <div class="no-dataz" v-if="flowBtm.series[0].data.length == 0">
                                        <p class="no-pfb">暂无数据</p>
                                        <p class="no-pfs">该时段未产生攻击或攻击数据暂未更新，请稍后重试</p>
                                    </div>
                                    <chart v-show="flowBtm.series[0].data.length != 0" style="width:100%;" id='flowBtm'  :options="flowBtm"></chart>
                                </div>
                            </div>
                            <div class="dp-mbr" style="width:570px;">
                                    <div class='dp-tp'>
                                        <span style="font-size:14px;color:#333333;">攻击类型</span>
                                         <span class="l-font" style='float:right;'>刷新</span> 
                                    </div>
                                    <div style='display:flex;'>
                                        <div style="width:260px;height:240px;">   
                                            <chart style="width:100%;" id='hightIpBin'  :options="hightIpBin"></chart>
                                        </div>
                                        <div style="padding-top: 134px;">
                                            <ul class="dp-list sp" style="margin-right:27px;">
                                                <li>协议类型</li>
                                                <li class="itemt">SYN Flood</li>
                                                <li class="items">Ack Flood</li>
                                                <li class="itemf">Udp Flood</li>
                                                <li class="itemw">ICMP Flood</li>
                                                <li class="iteml">Other</li>
                                            </ul>
                                            <ul class="dp-list" style="margin-right:20px;">
                                                <li class="dp-item">攻击占比</li>
                                                <li class="dp-item">| 36%</li>
                                                <li class="dp-item">| 20%</li>
                                                <li class="dp-item">| 16%</li>
                                                <li class="dp-item">| 10%</li>
                                                <li class="dp-item">| 18%</li>
                                            </ul>
                                            <ul class="dp-list">
                                                <li>攻击流量</li>
                                                <li>4.5Gb</li>
                                                <li>3.6Gb</li>
                                                <li>3.2Gb</li>
                                                <li>2.8Gb</li>
                                                <li>1.8Gb</li>
                                            </ul>
                                        </div>
                                    </div>
                            </div>
                           </div>
                            
                       </div>

                         <!-- CC统计  -->
                       <div v-if="overviewRadio == 'CC统计'">
                           <div class="dp-ds">
                               <div style="margin-left:20px;"> 
                                   <span>套餐选择</span>
                                    <Select size="small" v-model="ccStatistics.packageid" style="width:231px;margin-left:10px;" @on-change='domainChange'>
                                        <Option v-for="item in setMealList" :value="item.packageid" :key="item.packageid" >{{ item.packageid }}</Option>
                                    </Select>
                               </div>
                                <div style="margin-left:20px;">
                                   <span>域名选择</span>
                                   <Select size="small" v-model="ccStatistics.domain" style="width:231px;margin-left:10px;">
                                        <Option v-for="item in domainAllList" :value="item" :key="item">{{ item }}</Option>
                                    </Select>
                               </div>
                                <div style="margin-left:20px;">
                                   <span>按统计时间</span> 
                                   <DatePicker :options="options" v-model='ccStatistics.date' format='yyyy-MM-dd' size='small' :transfer='true' type="daterange" placeholder='选择时间'  placement="bottom-end"  style="width: 231px;margin:0 10px;"></DatePicker>
                                   <Button size='small' type="primary" style="width:54px;" @click="getAllCCMap">查询</Button>
                               </div>
                           </div>
                           <div>
                               <div class="dp-grad dp-row">
                                    <div>
                                        <span class="b-font">CC攻击QPS</span>
                                        <span>查看指定套餐中网站业务的域名，查看CC攻击的QPS，包含CC攻击次数和总请求数。</span>
                                    </div>
                                    <div>
                                    <span class="l-font" @click="QueryCCAttackQPS">刷新</span> 
                                    </div>
                                </div>
                                <div class="dp-mbr">
                                    <p style="font-size:14px;color:#333333;">CC攻击QPS统计（单位：次）</p>
                                    <div class="no-data" v-if="ccQps.series[0].data.length == 0">
                                        <p class="no-pfb">暂无数据</p>
                                        <p class="no-pfs">该时段未产生攻击或攻击数据暂未更新，请稍后重试</p>
                                    </div>
                                    <chart v-show="ccQps.series[0].data.length != 0" style="width:100%;" id='ccQps' ref="ccQps" :options="ccQps"></chart>
                                </div>
                           </div>
                           <div>
                               <div class="dp-grad dp-row">
                                    <div>
                                        <span class="b-font">CC攻击动态</span>
                                        <span>查询指定套餐，及指定时间范围已防护网站业务的域名遭受CC攻击的情况</span>
                                    </div>
                                    <div>
                                    <span class="l-font" @click='QueryCCAttackInfo'>刷新</span> 
                                    </div>
                                </div>
                                <Table no-data-text='还未收到攻击/未配置域名' :columns="ccAttackList" :data="ccAttackData"></Table>
                                <div class="dp-page">
                                    <Page :total="ccAttackData.length" style="display:inline-block;vertical-align: middle;margin-left:20px;"></Page>
                                </div>
                           </div>
                            <div>
                               <div class="dp-grad dp-row">
                                    <div>
                                        <span class="b-font">受攻击域名统计</span>
                                        <span>查询指定套餐，及指定时间范围已防护网站业务的域名遭受CC攻击的域名，及攻击总数</span>
                                    </div>
                                    <div>
                                    <span class="l-font" @click='QueryCCAttDomain'>刷新</span> 
                                    </div>
                                </div>
                                <Table no-data-text='还未收到攻击/未配置域名' :columns="ccAttDomainList" :data="ccAttDomainData"></Table>
                                <div class="dp-page">
                                    <Page :total="ccAttDomainData.length" style="display:inline-block;vertical-align: middle;margin-left:20px;"></Page>
                                </div>
                           </div>
                           <div>
                               <div class="dp-grad dp-row">
                                    <div>
                                        <span class="b-font">Top 100IP分布</span>
                                    </div>
                                    <div>
                                    <span class="l-font" @click='QueryCCAttIPDistribution'>刷新</span> 
                                    </div>
                                </div>
                               <div class="dp-mbr">
                                    <p style="font-size:14px;color:#333333;">Top 100IP分布</p>
                                    <div id='topMap' class='dp-inmap' style=" overflow: hidden; position: relative; z-index: 0; background-color: rgb(243, 241, 236); color: rgb(0, 0, 0); text-align: left;"></div>
                                </div>
                           </div>
                       </div>

                        <!-- 业务统计  -->
                       <div v-if="overviewRadio == '业务统计'">
                           <div class="dp-ds">
                               <div style="margin-left:20px;"> 
                                   <span>套餐选择</span>
                                    <Select size="small" v-model="business.packageId" style="width:231px;margin-left:10px;" @on-change='domainChange'>
                                        <Option v-for="item in setMealList" :value="item.packageid" :key="item.packageid" >{{ item.packageid }}</Option>
                                    </Select>
                               </div>
                              <div  style="margin-left:20px;">
                                   <span>按统计时间</span>
                                   <DatePicker :options="options" v-model='business.date' format='yyyy-MM-dd' size='small' :transfer='true' type="daterange" placeholder='选择时间'  placement="bottom-end"  style="width: 231px;margin:0 10px;"></DatePicker>
                                   <Button size='small' type="primary" style="width:54px;" @click="getAllBusinessMap">查询</Button>
                               </div>
                                <div  style="margin-left:20px;">
                                   <span>域名选择</span>
                                   <Select size="small" v-model="business.domain" style="width:231px;margin-left:10px;">
                                        <Option v-for="item in domainAllList" :value="item" :key="item">{{ item }}</Option>
                                    </Select>
                               </div>
                           </div>
                           <div>
                               <div class="dp-grad dp-row">
                                    <div>
                                        <span class="b-font">带宽统计</span>
                                        <span>统计该套餐下在所选时间段所有域名和转发规则下攻击峰值</span>
                                    </div>
                                    <div>
                                    <span class="l-font" @click="QueryBusinessBandwidth">刷新</span> 
                                    </div>
                                </div>
                                <div style="display:flex;">
                                    <div class="dp-fh" style="width:380px;">
                                        <div>
                                            <div>
                                                <span class="fh-sp">峰值时间</span>
                                            </div>
                                            <div class="dp-bt">
                                                <span class="b-font" style="margin:0px;">{{business.peakTime}}</span>
                                            </div>
                                        </div> 
                                    </div>
                                    <div class="dp-fh" style="width:380px;">
                                        <div>
                                            <div>
                                                <span class="fh-sp">带宽峰值</span>
                                            </div>
                                            <div class="dp-bt">
                                                <span class="b-font" style="margin:0px;">{{business.peakValue}}</span>
                                            </div>
                                        </div> 
                                    </div>
                                    <div class="dp-fh" style="width:380px;margin:0;">
                                        <div>
                                            <div>
                                                <span class="fh-sp">总流量</span>
                                            </div>
                                            <div class="dp-bt">
                                                <span class="b-font" style="margin:0px;">{{business.totalFlow}}</span>
                                            </div>
                                        </div> 
                                    </div>
                                </div>

                                <div class="dp-mbr">
                                    <p style="font-size:14px;color:#333333;">带宽流量统计（单位Gbps）</p>
                                    <div class="no-data" v-if="flowOut.series[0].data.length == 0 ">
                                        <p class="no-pfb">暂无数据</p>
                                        <p class="no-pfs">该时段未产生攻击或攻击数据暂未更新，请稍后重试</p>
                                    </div>
                                    <chart v-show="flowOut.series[0].data.length != 0 "  style="width:100%;" id='flowOut' :options="flowOut"></chart>
                                </div>
                           </div>
                           <div>
                               <div class="dp-grad dp-row">
                                    <div>
                                        <span class="b-font">请求数</span>
                                        <span>查询指定套餐，及指定时间范围已防护的业务的DDoS的攻击事件</span>
                                    </div>
                                    <div>
                                    <span class="l-font" @click="QueryRequestNum">刷新</span> 
                                    </div>
                                </div>
                               <div class="dp-mbr">
                                    <p style="font-size:14px;color:#333333;">请求次数（单位：次）</p>
                                    <div class="no-data" v-if="reque.series[0].data.length == 0">
                                        <p class="no-pfb">暂无数据</p>
                                        <p class="no-pfs">该时段未产生攻击或攻击数据暂未更新，请稍后重试</p>
                                    </div>
                                    <chart v-show="reque.series[0].data.length != 0" style="width:100%;" id='reque'  :options="reque"></chart>
                                </div>
                           </div>
                            <div>
                               <div class="dp-grad dp-row">
                                    <div>
                                        <span class="b-font">并发连接数</span>
                                        <span>查询指定套餐，及指定时间范围已防护的业务的遭受DDoS的攻击目标IP的相关信息</span>
                                    </div>
                                    <div>
                                    <span class="l-font" @click="QueryConnectionNum">刷新</span> 
                                    </div>
                                </div>
                                <div style="display:flex;">
                                    <div class="dp-fh" style="width:575px;">
                                        <div>
                                            <div>
                                                <span class="fh-sp">峰值时间</span>
                                            </div>
                                            <div class="dp-bt">
                                                <span class="b-font" style="margin:0px;">{{concurrentLink.peakTime}}</span>
                                            </div>
                                        </div> 
                                    </div>
                                    <div class="dp-fh" style="width:575px;margin:0px;">
                                        <div>
                                            <div>
                                                <span class="fh-sp">最大并发数</span>
                                            </div>
                                            <div class="dp-bt">
                                                <span class="b-font" style="margin:0px;">{{concurrentLink.peakValue}}</span>
                                            </div>
                                        </div> 
                                    </div>
                                </div>
                                <div class="dp-mbr">
                                    <p style="font-size:14px;color:#333333;">并发连接数统计</p>
                                    <div class="no-data" v-if="concurrent.series[0].data.length == 0">
                                        <p class="no-pfb">暂无数据</p>
                                        <p class="no-pfs">该时段未产生攻击或攻击数据暂未更新，请稍后重试</p>
                                    </div>
                                    <chart  style="width:100%;" id='concurrent' :options="concurrent"></chart>
                                </div>
                           </div>
                       </div>
                    </TabPane>
                    <TabPane label="业务管理" name='业务管理'>
                        <div class="dp-row">
                            <div>
                                <RadioGroup v-model="button1" type="button">
                                    <Radio label="网站业务"></Radio>
                                    <Radio label="证书管理"></Radio>
                                    <Radio label="非网站业务"></Radio>
                                </RadioGroup>
                            </div>
                            <div style="line-height:26px;">
                                <span class="link-te">添加域名帮助文档</span>
                            </div>
                        </div>
                        <!--      网站业务     -->
                         <div v-if="button1 == '网站业务'">
                            <div class="dp-row">
                                <div>
                                    <Button type="primary" @click="$router.push('/DDoSAddDomain')">添加域名</Button>
                                    <Poptip
                                    confirm
                                    width="230"
                                    placement="right"
                                    @on-ok="deleteList('domain')"
                                    title="您确认删除选中的域名吗？" style="margin: 0 10px">
                                    <Button type="primary" :disabled='renewDisabled'>删除</Button>
                                    </Poptip>
                                </div>
                                <div>
                                    <Select v-model="domain" style="width:100px">
                                        <Option v-for="item in domainList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                    </Select>
                                    <Input placeholder="请输入域名" v-model="domainName" style="width:180px;margin:0 10px;"></Input>
                                    <Button type="primary" style="width:84px;" @click="queryDomain">查询</Button>
                                </div>
                            </div>
                            <!-- <div class="selectMark">
                                    <img src="../../assets/img/host/h-icon10.png"/>
                                    <span>共 {{ businessData.length }} 项 | 已选择 <span style="color:#FF624B;">{{ overviewSelect.length }} </span>项</span><span style="margin-left:10px;">总价:</span><span style="color:#FF624B;">￥0.00</span>
                            </div> -->
                            <Table :loading='busLoading' :columns="businessList" :data="businessData"  @on-selection-change='overviewTableChange'></Table>
                            <div class="dp-page">
                                <span>总共{{businessData.length}}个项目</span>
                                <Page :total="businessData.length"  @on-change='getDomainList' style="display:inline-block;vertical-align: middle;margin-left:20px;"></Page>
                            </div>
                           
                        </div>
                        <!--     证书管理         -->
                        <div v-if="button1 == '证书管理'">
                            <div class="dp-row">
                                <div>
                                    <Button type="primary"  @click=" addCerShow">添加证书</Button>
                                    <Poptip
                                    confirm
                                    width="230"
                                    placement="right"
                                    @on-ok="deleteList('certificate')"
                                    title="您确认删除选中的证书吗？" style="margin: 0 10px">
                                    <Button type="primary" :disabled='renewDisabled'>删除</Button>
                                     </Poptip>
                                </div>
                                <div>
                                    <Input placeholder="证书名称" v-model="crtName" style="width:180px;margin-right:10px;"></Input>
                                    <Button type="primary" style="width:84px;" @click="queryCertificate">查询</Button>
                                </div>
                            </div>
                            <Table :loading='cerLoading' :columns="certificateList" :data="certificateData" @on-selection-change='overviewTableChange' ></Table>
                            <div class="dp-page">
                                <span>总共{{certificateData.length}}个项目</span>
                                <Page :total="certificateData.length" @on-change='getCertificate'  style="display:inline-block;vertical-align: middle;margin-left:20px;"></Page>
                            </div>
                        </div>

                         <!--     非网站业务         -->
                        <div v-if="button1 == '非网站业务'">
                            <div class="dp-row">
                                <div>
                                    <Button type="primary" @click="goRuleAdd">添加规则</Button>
                                    <Poptip
                                    confirm
                                    width="230"
                                    placement="right"
                                    @on-ok="deleteList('forwardrule')"
                                    title="您确认删除选中的配置吗？" style="margin: 0 10px">
                                    <Button type="primary" :disabled='renewDisabled'>删除</Button>
                                    </Poptip>
                                    <!-- <span class="dp-cn">CNAME：{{ruleData[0].cname||'无'}}</span> -->
                                </div>
                                <div>
                                     <Select v-model="visitPort" style="width:100px">
                                        <Option v-for="item in visitPortSelect" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                    </Select>
                                    <Input placeholder="请输入端口名称" v-model="visitPortNum" style="width:180px;margin-right:10px;"></Input>
                                    <Button type="primary" style="width:84px;" @click="queryRule">查询</Button>
                                </div>
                            </div>
                            <Table :loading='ruleLoading' :columns="ruleList" :data="ruleData" @on-selection-change='overviewTableChange'></Table>
                            <div class="dp-page">
                                <span>总共{{ruleData.length}}个项目</span>
                                <Page :total="ruleData.length" @on-change='getAllforwardrule' :current='ruleDataPage' style="display:inline-block;vertical-align: middle;margin-left:20px;"></Page>
                            </div>
                        </div>
                    </TabPane>
                    <TabPane label="防护管理" name='防护管理'>
                        <div class="dp-row">
                            <div>
                                <span style="font-size:14px;color:#333333;">套餐选择</span>
                                <Select v-model="setMeal" style="width:230px" @on-change='getProtectCC(setMeal)'>
                                    <Option v-for="item in setMealList" :value="item.packageid" :key="item.packageid">{{ item.packageid }}</Option>
                                </Select>
                            </div>
                            <div style="line-height:26px;">
                                <span class='link-te'>查看域名添加指引</span>
                            </div>
                        </div>
                        <div class="dp-box">
                            <div class="dp-grad dp-row">
                                <div>
                                    <span class="b-font">DDoS防护</span>
                                    <span >DDoS防护配置，针对该套餐下的所有网站业务的域名和非网站业务的转发规则都生效。</span>
                                </div>
                            </div>
                            <div style="display:flex;">
                                <div class="dp-fh">
                                    <div>
                                        <div>
                                            <span class="fh-sp">四层DDoS清洗</span>
                                            <i-switch :true-value='true' :false-value='true' v-model="protectSwicth">
                                                <span slot="open">开</span>
                                                <span slot="close">关</span>
                                            </i-switch>
                                        </div>
                                        <div style="margin-top:10px;">
                                            <span style="color:#FF9801;">默认开启，暂不支持修改</span>
                                        </div>
                                    </div>    
                                </div>
                                <div class="dp-fh">
                                    <div>
                                        <div>
                                            <span class="fh-sp">空连接防护</span>
                                            <i-switch v-model="emptyLink" @on-change="updateL4DDoSConfig" :true-value='1' :false-value='0'>
                                                <span slot="open">开</span>
                                                <span slot="close">关</span>
                                            </i-switch>
                                        </div>
                                    </div>
                                </div>
                            </div>   
                        </div>
                        <!-- CC防护 -->
                        <div class="dp-cc">
                            <div class="dp-grad dp-row">
                                <div>
                                    <span class="b-font">CC防护</span>
                                    <span >选择需要修改防护配置的域名，开启或是关闭防护状态，或是修改防护的模式。</span>
                                </div>
                            </div>
                            <Table :columns="ccProtectList" :data="ccProtectData"></Table>
                            <div class="dp-page">
                                <Page :total="ccProtectData.length"  @on-change='getProtectCC(setMeal,1)'   style="display:inline-block;vertical-align: middle;margin-left:20px;"></Page>
                            </div>
                        </div>    
                    </TabPane>
                    <TabPane label="操作日志" name='操作日志'>
                        <div style="margin-bottom:21px;">
                            <span>操作时间</span>
                            <DatePicker :options="options" v-model="logTime" :transfer='true' format='yyyy-MM-dd' type="daterange" placeholder='选择时间'  placement="bottom-end"  style="width: 200px;margin:0 22px 0 10px;"></DatePicker>
                            <span>操作对象</span>
                            <Select v-model="operationObject" style="width:230px;margin:0 22px 0 10px;">
                                <Option v-for="item in setMealList" :value="item.packageid" :key="item.packageid">{{ item.packageid }}</Option>
                            </Select>
                            <Button type="primary" @click="getLog(1)">查询</Button>    
                        </div>
                        <Table :columns="journalList" :data="journalData"></Table>
                        <div class="dp-page">
                            <Page :total="journalData.length" @on-change='getLog' style="display:inline-block;vertical-align: middle;margin-left:20px;"></Page>
                        </div>
                    </TabPane>
                </Tabs>
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
                        <p v-if="overviewSelect.length != 0">{{overviewSelect[0].packageid||"无"}}</p> 
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

        <!-- 新增证书  -->
        <Modal :mask-closable="false" v-model="showModal.certificate">
            <p slot="header" class="modal-header-border">
                <span class="universal-modal-title">新增证书</span>
            </p>
            <div class="dp-er" v-if="renewPrice.status != 1 && renewPrice.status !== undefined">
                 <Icon type="close-circled" color='#ED4014' size='12px'></Icon>
                 <span style="margin-left:4px;">{{renewPrice.message}}</span>
             </div>
            <div class="md-cer">
                 <Form ref="certificateValidate" :model="certificateValidate" :rules="certificateRule" :label-width="80">
                    <FormItem label="证书名称" prop="name">
                        <Input v-model="certificateValidate.name" placeholder="请输入证书名称" :disabled='cIsAdd == "update"?true:false'></Input>
                    </FormItem>
                    <FormItem label="证书文件" prop="file">
                        <Input type="textarea" v-model="certificateValidate.file" placeholder="请输入证书文件">
                        </Input>
                     
                    </FormItem>
                    <FormItem label="秘钥内容" prop="secret">
                        <Input type="textarea" v-model="certificateValidate.secret" placeholder="输入秘钥内容"></Input>
                      
                    </FormItem>
                    <FormItem label="CA内容" prop="ca">
                        <Input type="textarea" v-model="certificateValidate.ca" placeholder="请输入加密后的根证书"></Input>
                     
                    </FormItem>
                    <FormItem label="加密方式">
                        <Select v-model="certificateValidate.pawMode">
                            <Option value="des">des</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="证书备注">
                        <Input v-model="certificateValidate.desc" placeholder="请输入证书备注"></Input>
                    </FormItem>
                 </Form>   
            </div>
            <div slot="footer" class="modal-footer-border">
                <Button type="ghost" @click="showModal.certificate = false">取消</Button>
                <Button type="primary" @click="cerFunChange(cIsAdd)">确定</Button>
            </div>
        </Modal>

        <!-- 添加黑白名单  -->
        <Modal :mask-closable="false" v-model="showModal.nameList">
            <p slot="header" class="modal-header-border">
                <span class="universal-modal-title">添加黑白名单</span>
            </p>
            <div class="dp-er" v-if="renewPrice.status != 1">
                 <Icon type="close-circled" color='#ED4014' size='12px'></Icon>
                 <span style="margin-left:4px;">{{renewPrice.message}}</span>
             </div>
            <div class="md-cer">
                 <Form style="width:430px;margin:0 auto;text-align:left;" ref="nameValidate" :model="nameValidate" :rules="nameRuleValidate" :label-width="90">
                        <FormItem label="IP黑名单" prop="black">
                            <Input v-model="nameValidate.black" type="textarea" :autosize="{minRows: 4,maxRows: 5}" placeholder="如1.1.1.1，多个IP以“；”隔开，暂不支持IP段" style="width:300px;"></Input>
                            <Poptip placement="top">
                                <div slot="content" style="width:145px;white-space: normal;line-height:16px;">
                                    多个使用英文半角分号分隔，不 支持传入 IP 段；最大支持 300 个 IP 
                                </div>
                               <Icon type="ios-help-outline" color='#2A99F2' style="font-size:14px;"></Icon>
                            </Poptip>
                        </FormItem>
                        <FormItem label="IP白名单" prop="white">
                            <Input v-model="nameValidate.white" type="textarea" :autosize="{minRows: 4,maxRows: 5}" placeholder="如1.1.1.1，多个IP以“；”隔开，暂不支持IP段" style="width:300px;"></Input>
                            <Poptip placement="top">
                                <div slot="content" style="width:145px;white-space: normal;">
                                    多个使用英文半角分号分隔，不 支持传入 IP 段；最大支持 300 个 IP 
                                </div>
                               <Icon type="ios-help-outline" color='#2A99F2' style="font-size:14px;"></Icon>
                            </Poptip>
                        </FormItem>
                        <FormItem label="生效域名">
                            <Input v-model="nameValidate.domain" disabled placeholder="www.test.com" style="width:300px;"></Input>
                        </FormItem>
                    </Form>
            </div>
            <div slot="footer" class="modal-footer-border">
                <Button type="ghost" @click="showModal.nameList = false">取消</Button>
                <Button type="primary" @click="addNameList('nameValidate')">确定</Button>
            </div>
        </Modal>

          <!-- 网站关联证书  -->
        <Modal :mask-closable="false" v-model="showModal.changeSource">
            <p slot="header" class="modal-header-border">
                <span class="universal-modal-title">关联证书</span>
            </p>
            <div class="dp-er" v-if="renewPrice.status != 1 && renewPrice.status !== undefined">
                 <Icon type="close-circled" color='#ED4014' size='12px'></Icon>
                 <span style="margin-left:4px;">{{renewPrice.message}}</span>
             </div>
            <div class="md-cer">
                <span>证书ID</span>
               <Select v-model="certificateId" style="width:230px;margin:0 22px;">
                    <Option v-for="item in certificateData" :value="item.crtid" :key="item.crtid">{{ item.crtid }}</Option>
                </Select>
            </div>
            <div slot="footer" class="modal-footer-border">
                <Button type="ghost" @click="showModal.changeSource = false">取消</Button>
                <Button type="primary" @click="updateDomain('source')">确定</Button>
            </div>
        </Modal>

         <!-- 网站换IP  -->
        <Modal :mask-closable="false" v-model="showModal.changeIp">
            <p slot="header" class="modal-header-border">
                <span class="universal-modal-title">域名换源</span>
            </p>
            <div class="dp-er" v-if="renewPrice.status != 1 && renewPrice.status !== undefined">
                 <Icon type="close-circled" color='#ED4014' size='12px'></Icon>
                 <span style="margin-left:4px;">{{renewPrice.message}}</span>
             </div>
            <div class="md-cer">
            <div style='display:flex;'>
                <div style='margin-right:5px;'><span>源站IP/域名</span></div>
                <div>
                    <Input type="textarea" v-model='sourceip' style='width:300px;display:inline-block;'></Input>
                    <p class='dp-bf'>如果源站暴露，请参考使用 <span>高防后源站IP暴露的解决方法</span></p>
                </div>
            </div>
            </div>
            <div slot="footer" class="modal-footer-border">
                <Button type="ghost" @click="showModal.changeIp = false">取消</Button>
                <Button type="primary" @click="updateDomain('ip')">确定</Button>
            </div>
        </Modal>

        <!-- 修改域名 -->
        <Modal :mask-closable="false" v-model="showModal.addDomain">
            <p slot="header" class="modal-header-border">
                <span class="universal-modal-title">修改域名</span>
            </p>
            <div class="dp-er" v-if="renewPrice.status != 1 && renewPrice.status !== undefined">
                 <Icon type="close-circled" color='#ED4014' size='12px'></Icon>
                 <span style="margin-left:4px;">{{renewPrice.message}}</span>
             </div>
            <div class="md-cer">
                 <Form ref="addDomainList" :model="addDomainList" :rules="addDomainListRule" :label-width="80">
                    <FormItem label="套餐选择" prop="attackMeal">
                      <Select size="small" v-model="addDomainList.attackMeal" style="width:231px;">
                            <Option v-for="item in setMealList" :value="item.packageid" :key="item.packageid">{{ item.packageid }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="添加域名" prop="domain">
                        <Input v-model="addDomainList.domain" placeholder="www.test.com">
                        </Input>
                        <p class="y-p">注意：一级域名与二级域名需要分开配置</p>
                    </FormItem>
                    <FormItem label="使用协议" prop="http">
                         <CheckboxGroup v-model="addDomainList.http">
                             <Checkbox label="http"></Checkbox>
                             <Checkbox label="https"></Checkbox>
                         </CheckboxGroup>
                        <p class="y-p">域名添加完成之后，请继续添加证书和私钥</p>
                    </FormItem>
                    <FormItem label="协议端口" prop="agreement">
                        <Input  v-model="addDomainList.agreement" placeholder="请输入协议端口"></Input>
                    </FormItem>
                    <FormItem label="源站IP/域名" prop="ip">
                        <Input type="textarea" v-model="addDomainList.ip" placeholder="多个域名与IP用；隔开"></Input>
                        <p class='dp-bf'>如果源站暴露，请参考使用 <span>高防后源站IP暴露的解决方法</span></p>
                    </FormItem>
                 </Form>   
            </div>
            <div slot="footer" class="modal-footer-border">
                <Button type="ghost" @click="showModal.addDomain = false">取消</Button>
                <Button type="primary" @click="updateDomainTable">确定</Button>
            </div>
        </Modal>

    </div>
</template>
<script>
const echarts =  require('echarts/lib/echarts');
import expandRow from './DDosExpandRow.vue';
import hightIp from '@/echarts/hightIp';
import hightIpBs from '@/echarts/hightIpBs';
import hightIpSl from '@/echarts/hightIpSl';
import hightIpBin from '@/echarts/hightIpBin';
var debounce = require('throttle-debounce/debounce')

const dIp  = JSON.stringify(hightIp);
const flow = JSON.stringify(hightIpBs);
const reque = JSON.stringify(hightIpBs);
const concurrent = JSON.stringify(hightIpBs);
const ccQps = JSON.stringify(hightIp);
const flowBtm = JSON.stringify(hightIpSl);
const bin = JSON.stringify(hightIpBin);
export default {
    components: { expandRow },
  data() {
    const backList =(rule, value, callback)=>{
        if(this.blackName.split(';').length>300){
            return callback(new Error('最大支持300 个 IP'));
        }else{
            callback();
        }
    }
    const whiteList =(rule, value, callback)=>{
        if(this.whiteName.split(';').length>300){
            return callback(new Error('最大支持300 个 IP'));
        }else{
            callback();
        }
    }
    return {
      // 弹窗
      showModal:{
        certificate:false,
        meal:false,
        changeSource:false,
        changeIp:false,
        nameList:false,
        addDomain:false,
      },

      // 日期选择限制
      options: {
            disabledDate (date) {
                return date &&   date.valueOf() < Date.now() - 86400000*30 || date.valueOf() > Date.now() ;
            }
        },

      nameValidate:{
        black:'',
        white:'',
        domain:''
    },
    nameRuleValidate:{
        black:[{required: true, message: '请输入黑名单', trigger: 'blur'},
        {validate:backList}],
        white:[{required: true, message: '请输入白名单', trigger: 'blur'},
        {validate:whiteList}],
    }, 
    blackName: '',
    whiteName: '',
      overviewRadio:'概览',
      button1: "网站业务",
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
     tabsValue:'概览', 
       
    //   概览
        overviewSelect:'',
        overviewList:[
            {
                type: "selection",
                width: 60,
                align: "center"
            },
            {
                key:'packageid',
                title:'套餐ID',
                render:(h,params)=>{
                    return h('span',{
                        style:{
                            color:'#2A99F2',
                            cursor:'pointer'
                        },
                        on:{
                            click:()=>{
                                sessionStorage.setItem('ddopId',params.row.packageid);
                                this.$router.push('ddosipdetails');
                            }
                        }
                    },params.row.packageid.substr(params.row.packageid.indexOf('-')+1,params.row.packageid.length))
                }
            },
            {
                key:'packagename',
                title:'套餐类型'
            },
            {
                key:'endtime',
                title:'有效期'
            },
            {
                key:'createtime',
                title:'购买日期'
            },
            {
                key:'攻击事件',
                title:'攻击事件',
                render:(h,params)=>{
                    return h('span',{},'暂无攻击事件')
                }
            },
            {
                key:'操作',
                title:'操作',
                render:(h,params)=>{
                    return h('span',{
                        style:{
                            color:'#2A99F2',
                            cursor:'pointer'
                        },
                        on:{
                            click:()=>{
                                this.tabsValue = '业务管理';
                                this.tabsId = params.row.packageid;
                            }
                        }
                    },'业务配置')
                }
            },
        ],
        tabsId:'',
        overviewData:[],
        hightIp:JSON.parse(dIp),
        flowOut:JSON.parse(flow),
        reque:JSON.parse(reque),
        concurrent:JSON.parse(concurrent),
        ccQps:JSON.parse(ccQps),
        flowBtm:JSON.parse(flowBtm),
        hightIpBin:JSON.parse(bin),
        ccStatistics:{
            packageid:'',
            date:'',
            domain:''
        },
        price:0,
        overviewPage:1,
        pageSize:10,
        attackMeal:'',
        business:{
            packageId:'',
            date:'',
            domain:'',
            peakTime:'--',
            peakValue:'--',
            totalFlow:'--'
        },
        ddosFlow:{
            time:'--',
            flow:'0Gbps',
            outFlow:'0Gbps'
        },
        // 统计时间
        statisticsTime:'',
        
        renewPrice:{},

        // 业务统计
        concurrentLink:{
            peakTime:'--',
            peakValue:'--'
        },

        // CC统计图表格
        ccAttackList:[
            {
                key:'attackIP',
                title:'攻击者IP'
            },
            {
                key:'time',
                title:'攻击时间'
            },
            {
                key:'attackIP',
                title:'攻击者IP归属地'
            },
            {
                key:'attackDomain',
                title:'被攻击域名'
            },
            {
                key:'action',
                title:'处理动作',
                render:(h,params)=>{
                    return h('span',{},params.row.action == 1 ?'监控':'拦截')
                }
            }
        ],
        ccAttackData:[],
        ccAttDomainList:[
            {
                title:'受攻击域名',
                key:'domain'
            },
            {
                title:'攻击次数',
                key:'value'
            },
        ],
        ccAttDomainData:[],    

        // ddos统计图表格
        ddosAttEventList:[
            {
                key:'starttime',
                title:'攻击开始时间'
            },
            {
                key:'endtime',
                title:'攻击结束时间'
            },
            {
                key:'peakvalue',
                title:'攻击峰值'
            },
            {
                key:'attacktype',
                title:'攻击类型'
            },
        ],
        ddosAttEventData:[],
        ddosAttInfoList:[
            {
                key:'targetIp',
                title:'被攻击的目标IP'
            },
            {
                key:'time',
                title:'被攻击的时间'
            },
            {
                key:'attacktype',
                title:'攻击类型'
            },
            {
                key:'peakvalue',
                title:'攻击峰值'
            },
        ],
        ddosAttInfoData:[],

      // 证书管理
      certificateKyeHide: true,
      cIsAdd:'add',
      cerLoading:false,
      certificateList: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          key: "crtname",
          title: "证书名称"
        },
        {
          key: "crtremark",
          title: "证书备注"
        },
        {
          key: "crtdes",
          title: "证书crt内容",
          render:(h,params)=>{
              return h('p',{
                  style:{
                        textOverflow: '-o-ellipsis-lastline',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis' ,
                        display: '-webkit-box',
                        webkitLineClamp: '2',
                        lineClamp: '2',
                        webkitBoxOrient: 'vertical',
                    },
                   domProps: {
                       title:params.row.crtdes
                   }
              },params.row.crtdes)
          }
        },
        {
          title: "证书key内容",
          render: (h, params) => {
            if(params.row.keydes !== undefined){
                if (this.certificateKyeHide) {
                    return h(
                        "div",
                        {
                        style: {
                            color: "#2A99F2",
                            cursor: "pointer"
                        },
                        on: {
                            click: () => {
                            this.certificateKyeHide = false;
                            }
                        }
                        },
                        "显示内容"
                    );
                    } else {
                    return h("div", [
                        h("p", {
                            style:{
                               textOverflow: '-o-ellipsis-lastline',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis' ,
                                display: '-webkit-box',
                                webkitLineClamp: '2',
                                lineClamp: '2',
                                webkitBoxOrient: 'vertical',
                            },
                            domProps: {
                                title:params.row.keydes
                            }
                        }, params.row.keydes),
                        h(
                        "p",
                        {
                            style: {
                            color: "#2A99F2",
                            cursor: "pointer"
                            },
                            on: {
                            click: () => {
                                this.certificateKyeHide = true;
                            }
                            }
                        },
                        "隐藏内容"
                        )
                    ]);
                    }
            }
            
          }
        },
        {
          key: "cades",
          title: "证书ca内容",
          render:(h,params)=>{
              return h('p',{
                    style:{
                        textOverflow: '-o-ellipsis-lastline',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis' ,
                        display: '-webkit-box',
                        webkitLineClamp: '2',
                        lineClamp: '2',
                        webkitBoxOrient: 'vertical',
                    },
                    domProps: {
                        title:params.row.cades
                    }
              },params.row.cades)
          }
        },
        {
          key: "domainname",
          title: "当前证书使用域名",
          render:(h,params)=>{
              return h('p',{},params.row.domainname||'未关联域名')
          }
        },
        {
          title: "操作",
          render: (h, params) => {
            return h(
              "p",
              {
                style: {
                  color: "#2A99F2",
                  cursor: "pointer"
                },
                on:{
                    click:()=>{
                        this.showModal.certificate = true;
                        this.cIsAdd = 'update';
                        this.certificateValidate.name = params.row.crtname;
                        this.certificateValidate.file = params.row.crtdes;
                        this.certificateValidate.secret = params.row.keydes;
                        this.certificateValidate.ca = params.row.cades;
                        this.certificateValidate.desc = params.row.crtremark;
                        this.certificateValidate.pawMode = params.row.encryptionway;
                        this.certificateValidate.crtId = params.row.crtid;
                        this.certificateValidate.id = params.row.id;
                    }
                }
              },
              "修改"
            );
          }
        }
      ],
      certificateData: [],
      certificateValidate:{
          name:'',
          file:'',
          secret:'',
          ca:'',
          desc:'',
          pawMode:'des',
          crtId:'',
          id:'' 
      },
      certificateRule:{
          name:[{required: true, message: '请输入证书名称', trigger: 'blur'}],
          file:[{required: true, message: '请输入证书文件   ', trigger: 'blur'}],
          secret:[{required: true, message: '请输入秘钥内容', trigger: 'blur'}],
          ca:[{required: true, message: '请输入CA内容', trigger: 'blur'}],
      },

      // 网站业务
      domainList:[
          {
              value:'域名',
              label:'域名'
          }
      ],
      sourceip:'',
      domain:'域名',
      domainName:'',
      busLoading:false,
      businessList:[
          {
              type: "selection",
              width: 60,
              align: "center"
           },
          {
              title:'域名',
              key:'domainname'
          },
          {
              title:'域名信息',
              key:'cname'
          },
          {
              title:'端口',
              key:'port'
          },
          {
              title:'源站IP/域名',
              render:(h,params)=>{
                  return h('div',[
                      h('span',{},params.row.sourceip),
                      h('span',{
                          style:{
                              cursor:'pointer',
                              color:'#2A99F2',
                              marginLeft:'19px'
                          },
                         on:{
                             click:()=>{
                                 this.showModal.changeIp = true;
                                 this.businessSelect = params.row;
                             }
                         } 
                      },'换源')
                  ])
              }
          },
          {
              title:'套餐信息',
              key:'packageusername'
          },
          {
              title:'业务状态',
              render:(h,params)=>{
                  let sty = params.row.httpsstate == 1?'inline-block':'none'
                  return h('div',[
                      h('div',
                        {
                            style:{
                                display:'inline-block'
                            }
                          },
                          [
                        h('p',{},params.row.httpstate == 1 ?'http':''),
                        h('p',{},params.row.httpsstate == 1 ?'https':'')
                      ]),
                     h('span',{
                         style:{
                             display:sty,
                             color:'#2A99F2',
                             cursor:'pointer'
                         },
                         on:{
                              click:()=>{
                                  this.showModal.changeSource = true;
                                  this.businessSelect = params.row;
                              }
                          }
                     },'关联证书')
                  ])
              }
          },
          {
              title:'部署状态',
              key:'deployState',
              render:(h,params)=>{
                  let text = params.row.deploystate ==1?'部署成功':params.row.deploystate ==2?'部署中':params.row.deploystate ==3?'待部署':'部署失败';
                  return h('p',{},text)
              }
          },
          {
              title:'防护状态',
              render:(h,params)=>{
                  return h('div',[
                      h('p',{},params.row.ccprotect == 1?'CC防护:关':'CC防护:开'),
                      h('p',{},params.row.ddosprotect == 0?'DDOS防护:关':'DDOS防护:开'),
                  ])
              }
          },
          {
              title:'操作',
              render: (h, params) => {
                return h(
                "p",
                {
                    style: {
                    color: "#2A99F2",
                    cursor: "pointer"
                    },
                    on:{
                        click:()=>{
                            this.showModal.addDomain = true;
                            this.addDomainList.attackMeal = params.row.packageid;
                            this.addDomainList.domain = params.row.domainname;
                            if(params.row.httpstate == 0 && params.row.httpsstate == 0){
                                this.addDomainList.http = [];
                            }else if(params.row.httpstate == 1 && params.row.httpsstate == 0){
                                this.addDomainList.http = ['http'];
                            }else if(params.row.httpstate == 0 && params.row.httpsstate == 1){
                                this.addDomainList.http = ['https']
                            }else{
                               this.addDomainList.http = ['http','https'] 
                            }
                            this.addDomainList.agreement = params.row.port;
                            this.addDomainList.ip = params.row.sourceip;
                            this.addDomainList.id = params.row.id;
                        }
                    }
                },
                "修改"
                );
            }
          },
      ],
      businessData:[
      ],
      businessSelect:{},
      crtName:'',
      addDomainList: {
        attackMeal: '',
        domain: '',
        http: ['https'],
        agreement: '',
        ip: '',
        id: ''
      },
      addDomainListRule: {
        attackMeal: [
          { required: true, message: '请选择一个套餐', trigger: 'change' }],
        domain: [
          { required: true, message: '请输入域名', trigger: 'blur' }
        ],
        agreement: [
          { required: true, message: '请输入协议端口', trigger: 'blur' }
        ],
        ip: [
          { required: true, message: '请输入源站IP/域名', trigger: 'blur' }
        ],
        id: [
          { required: true, message: '请选择一个证书id', trigger: 'change' }],
      },
      certificateId:'',
      
      // 非网站业务
       ruleList:[
           {
              type: "selection",
              width: 60,
              align: "center"
           },
           {
               key:'accessprotocol',
               title:'协议'
           },
           {
               key:'accessport',
               title:'访问端口'
           },
           {
               key:'sourceport',
               title:'源站端口'
           },
           {
               key:'loadbalance',
               title:'回源负载均衡',
               render:(h,params)=>{
                   return h('span',{},params.row.loadbalance == 1 ?'轮询模式':'其他模式')
               }
           },
           {
               key:'source',
               title:'源站IP/域名'
           },
           {
               key:'deploystate',
               title:'部署状态',
               render:(h,params)=>{
                   return h('span',{},params.row.deploystate== 1?'部署成功':params.row.deploystate== 2 ?'部署中':params.row.deploystate== 3?'待部署':'部署失败')
               }
           },
           {
               key:'ddosprotect',
               title:'防护状态',
               render:(h,params)=>{
                   return h('span',{},params.row.ddosprotect == 0?'关闭':'开启')
               }
           },
           {
               key:'操作',
               title:'操作',
               render:(h,params)=>{
                   return h('div',[
                       h('span',{
                           style:{
                               color:"#2A99F2",
                               cursor:"pointer",
                               marginRight:'10px'
                           },
                           on:{
                               click:()=>{
                                   this.$router.push('ddosipruleadd');
                                   sessionStorage.setItem('ruleList',JSON.stringify(params.row));
                               }
                           }
                       },'修改'),
                       h('span',{
                            style:{
                               color:"#2A99F2",
                               cursor:"pointer"
                           },
                           on:{
                               click:()=>{
                                   this.overviewSelect.push(params.row);
                                   this.$Modal.confirm({
                                       title:'信息',
                                       content:'确认删除所选转发规则吗?',
                                       onOk:()=>{
                                           this.deleteList('forwardrule');
                                       }
                                   })
                               }
                           }
                       },'删除'),
                   ])
               }
           },
       ],
       ruleData:[],
       ruleLoading:false,
       visitPort:'访问端口',
       visitPortNum:'',
       visitPortSelect:[
           {
               value:'访问端口',
               label:'访问'
           }
       ],
       ruleDataPage:1,

    //    防护管理
        setMeal:'',
        setMealList:[       
        ],
        protectSwicth:true,
        emptyLink:false,
        ccIndex:0,
        ccDisabled:true,
        ccProtectList:[
            {
                type: 'expand',
                width: 50,
                render: (h, params) => {
                    return h(expandRow, {
                        props: {
                            row: params.row
                        },
                        on:{
                            'white':(value)=>{
                                this.whiteName = value
                            },
                            'black':(value)=>{
                                this.blackName = value
                            }
                        }
                    })
                }
            },
            {
                key:'domainname',
                title:'域名',
                render:(h,params)=>{
                    return h('p',{
                        style:{
                            color:this.ccDisabled ?'#999999':''
                        }
                    },params.row.domainname)
                }
            },
            {
                key:'sourceip',
                title:'源站IP/域名',
                render:(h,params)=>{
                    return h('p',{
                        style:{
                            color:this.ccDisabled ?'#999999':''
                        }
                    },params.row.sourceip)
                }
            },
            {
                key:'ccProtectionSwitch',
                title:'防护状态',
                render:(h,params)=>{
                    return h('div',[
                        h('span',{
                            style:{
                                marginRight:'5px'
                            },
                           
                        },'cc防护'),
                        h('i-switch',
                        {
                            props:{
                                value:params.row.ccprotect == 0 ?true:false,
                                disabled:this.ccDisabled
                            },
                            on: {
                                'on-change': (value) => {
                                    this.ccProtectData[params.index].ccprotect=value?0:1;
                                }
                            }
                        },
                        [
                            h('span',{
                                slot:'open',
                            },'开'),
                             h('span',{
                                slot:'close'
                            },'关'),
                        ])
                    ]) 
                }
            },
            {
                key:'protecttype',
                title:'防护模式',
                width:260,
                render:(h,params)=>{
                    return h('RadioGroup',
                    {
                        props:{
                            value: params.row.protecttype,
                        },
                        on:{
                            "on-change":(val)=>{    
                              this.ccProtectData[params.index].protecttype=val
                            }
                        }
                    },[
                        h('Radio',{
                            props:{
                                label:0,
                                disabled:this.ccDisabled
                            }
                        },'标准'),
                        h('Radio',{
                            props:{
                                label:1,
                                disabled:this.ccDisabled
                            }
                        },'严格'),
                        h('Radio',{
                            props:{
                                label:2,
                                disabled:this.ccDisabled
                            }
                        },'攻击应急')
                    ])
                }
            },
            {
                title:'黑白名单',
                render:(h,params)=>{
                    return h('span',{
                        style:{
                           color:this.ccDisabled ?'#999999':'#4297F2',
                           cursor:this.ccDisabled ?'':'pointer'
                        },
                        on:{
                            click:()=>{
                                if(!this.ccDisabled){
                                    this.ccIndex = params.row._index;
                                    this.nameValidate.domain = params.row.domainname;
                                    this.showModal.nameList=true;
                                }
                            }
                        }
                    },'添加')
                }
            },
            {
                title:'操作',
                width:100,
                render:(h,params)=>{
                    if(this.ccShow){
                        return h('p',{
                            style:{
                                color:'#4297F2',
                                cursor:'pointer'
                            },
                            on:{
                                click:()=>{
                                    this.ccShow = false;
                                    this.ccDisabled = false;
                                }
                            }
                        },'修改')
                    }else{
                        return h('p',{
                            style:{
                                color:'#4297F2',
                                cursor:'pointer'
                            },
                            on:{
                                click:()=>{
                                    this.saveConfig(params.row._index);
                                }
                            }
                        },'提交')
                    }
                }
            }
        ],
        ccShow:true,
        riadosCC:'严格',
        ccProtectData:[
        ],
        // 操作日志
         operationObject:'',
         operationList:[
             {
                 value:'操作对象',
                 label:'操作对象'
             }
         ],
         journalList:[
             {
                 key:'packageusername',
                 title:'操作对象'
             },
             {
                 key:'createtime',
                 title:'操作时间'
             },
             {
                 key:'isdisplay',
                 title:'操作结果',
                 render:(h,params) =>{
                     return h('p',{

                     },params.row.isdisplay == 1?'成功':'失败')
                 }
             },
             {
                 key:'operatordes',
                 title:'行为描述'
             },
             {
                 key:'packageuserid',
                 title:'关联资源'
             },
         ],
         journalData:[            
         ],
         logTime:[],
         domainAllList:[],

    }
  },
  beforeRouteEnter(to,from,next){
      next(vm=>{
          vm.changeColor()
      })
  },
  created(){
      this.getDdosOverview(1);
      this.getDomainList(1);
      this.getCertificate(1);
      this.getLog(1);
      this.getId();
      this.getAllforwardrule(1);
      this.inmapVoid();
  },
  methods:{

    //   获取用户套餐ID
    getId(){
        let domainList = [];
        this.$http.get('ddosImitationIp/packageIdInfo.do',{}).then(res=>{
            if(res.status == 200 && res.data.status == 1){
                for(let i =0; i<res.data.result.length; i++){
                    for(let key in res.data.result[i]){
                        if(res.data.result[i][key].length != 0){
                          domainList.push(res.data.result[i][key][i].domainname);
                        }else{
                            domainList = [];
                        }
                        this.setMealList.push({'packageid':key,'domainList':domainList});
                    }
                }
                this.setMeal  = this.ccStatistics.packageid = this.operationObject = this.business.packageId =  this.attackMeal = this.setMealList[0].packageid;
                this.domainChange( this.setMeal);
                this.getProtectCC(this.setMeal,1);
               
            }else{
                this.$Message.info(res.data.message);
            }
        })
    },
    domainChange(index){
      let num =   this.setMealList.findIndex(item =>{
            return index == item.packageid
        })
        this.domainAllList = this.setMealList[num].domainList;
    },
    tabsChange(item){
        this.tabsValue = item;
    },

    // 改变统计图样式
    changeColor(){
        this.reque.series[0].lineStyle.normal.shadowColor = 'rgba(181, 229, 173, 0.5)';
        this.reque.series[0].lineStyle.normal.color.colorStops[0].color = 'rgba(76, 165, 75, 1)';
        this.reque.series[0].lineStyle.normal.color.colorStops[1].color = 'rgba(181, 229, 173, 1)';
        this.concurrent.series[0].lineStyle.normal.shadowColor = 'rgba(187, 62, 213, 0.5)';
        this.concurrent.series[0].lineStyle.normal.color.colorStops[0].color = 'rgba(187, 62, 213, 1)';
        this.concurrent.series[0].lineStyle.normal.color.colorStops[1].color = 'rgba(102, 120, 255, 1)';
        this.reque.series[0].name = '请求次数';
        this.reque.series[0].stack = '请求次数';
        this.reque.series[0].itemStyle.normal.color = '#4CA54B';
        this.reque.legend.data  =['请求次数'];
        this.concurrent.series[0].name = '并发连接数';
        this.concurrent.series[0].stack = '并发连接数';
        this.reque.series[0].itemStyle.normal.color = '#BB3ED5';
        this.concurrent.legend.data  = ['并发连接数'];
        this.ccQps.series[1].name = '总请求次数';
        this.ccQps.series[0].name = 'CC攻击次数';
        this.ccQps.series[1].stack= '总请求次数';
        this.ccQps.series[0].stack= 'CC攻击次数';
        this.ccQps.legend.data = ['总请求次数','CC攻击次数'];
    },

    //   套餐表格选项切换
    overviewTableChange(list){
        this.price = 0;
        this.overviewSelect = list;
        list.forEach(item => {
            this.price += item.totalprice; 
        });
    },
      
    //  获取套餐
    getDdosOverview(page){
        this.$http.get('ddosImitationIp/queryAllPackage.do',{
              params:{
                  page:page,
                  pageSize:this.pageSize
              }
        }).then(res=>{
            if(res.status == 200 && res.data.status == 1){
                this.overviewData = res.data.result;
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
                packageId:this.overviewSelect[0].packageid,
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
                packageId:this.overviewSelect[0].packageid,
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


    statisticsChange(value){
        if(value == 'DDoS攻击统计'){

        }else if(value == 'CC统计'){

        }else if(value == '业务统计'){

        }
    },

    // DDOS清洗流量
    getMitigatedBandwidth(){
        let params = {
                packageId:this.attackMeal,
                startdate:this.statisticsTime[0].format('yyyy-MM-dd hh:mm:ss')+'',
                enddate:this.statisticsTime[1].format('yyyy-MM-dd hh:mm:ss')+''
            },
            url1 = this.$http.post('ddosImitationIp/QueryMitigatedBandwidth.do',params),
            url2 = this.$http.post('ddosImitationIp/QueryAttInfoDetail.do',params),
            url3 = this.$http.post('ddosImitationIp/QueryAttEvent.do',params),
            url4 = this.$http.post('ddosImitationIp/queryAttCleanBandWidthType.do',params),
            url5 = this.$http.post('ddosImitationIp/QueryAttTypeDistribution.do',params),
            url6 = this.$http.post('ddosImitationIp/QueryAttInfoDetail.do',params),
            url7 = this.$http.post('ddosImitationIp/QueryAttEvent.do',params);
            Promise.all([url1,url2,url3,url4,url5,url6,url7]).then(res => {
                if(res[0].status == 200 && res[0].data.status == 1){
                    
                }
            })
    },



    // 概览-统计图-请求数
    QueryBusinessBandwidth(){
         this.echartsLodaing('flowOut').showLoading();
        this.$http.post('ddosImitationIp/QueryBusinessBandwidth.do',{
                packageId:this.business.packageId,
                startdate:this.business.date[0].format('yyyy-MM-dd hh:mm:ss')+'',
                enddate:this.business.date[1].format('yyyy-MM-dd hh:mm:ss')+'',
                domains:this.business.domain
        }).then(res =>{
            if(res.status == 200 && res.data.status == 1){
                if(res.data.value){
                    this.flowOut.xAxis.data = res.data.time;
                    this.flowOut.series[0].data = res.data.value;
                }
                this.echartsLodaing('flowOut').hideLoading();
                this.business.peakTime = res.data.peakStat.peakTime;
                this.business.peakValue = res.data.peakStat.peakValue;
                this.business.totalFlow = res.data.peakStat.totalFlow;
                
            }else{
                this.$Message.info(res.data.message);
                this.echartsLodaing('flowOut').hideLoading();
            }
        }).catch(err =>{})
    },

    QueryRequestNum(){
        this.echartsLodaing('reque').showLoading();
        this.$http.post('ddosImitationIp/QueryRequestNum.do',{
            packageId:this.business.packageId,
            startdate:this.business.date[0].format('yyyy-MM-dd hh:mm:ss')+'',
            enddate:this.business.date[1].format('yyyy-MM-dd hh:mm:ss')+'',
            domains:this.business.domain
        }).then(res =>{
            if(res.status == 200 && res.data.status == 1){
                this.echartsLodaing('reque').hideLoading();
                if(res.data.value){
                    this.reque.xAxis.data = res.data.time;
                    this.reque.series[0].data = res.data.value;
                }
            }else{
                this.echartsLodaing('reque').hideLoading();
                this.$Message.info(res.data.message);
            }
        }).catch(err =>{})
    },

    QueryConnectionNum(){
        this.echartsLodaing('concurrent').showLoading(); // echarts加载动画
       this.$http.post('ddosImitationIp/QueryConnectionNum.do',{
            packageId:this.business.packageId,
            startdate:this.business.date[0].format('yyyy-MM-dd hh:mm:ss')+'',
            enddate:this.business.date[1].format('yyyy-MM-dd hh:mm:ss')+'',
            domains:this.business.domain
        }).then(res =>{
            if(res.status == 200 && res.data.status == 1){
                this.echartsLodaing('concurrent').hideLoading();
                if(res.data.value){
                    this.concurrent.xAxis.data = res.data.time;
                    this.concurrent.series[0].data = res.data.value;
                    this.concurrentLink = res.data.peakStat;
                }
            }else{
                this.$Message.info(res.data.message);
                this.echartsLodaing('concurrent').hideLoading();
            }
        }).catch(err =>{}) 
    },

      getAllBusinessMap(){
        this.QueryRequestNum();
        this.QueryBusinessBandwidth();
        this.QueryConnectionNum();
    },

    

    //  // ……CC统计图开始……
    QueryCCAttackQPS(){
        this.echartsLodaing('ccQps').showLoading();
        this.$http.post('ddosImitationIp/QueryCCAttackQPS.do',{
            packageId:this.ccStatistics.packageid,
            startdate:this.ccStatistics.date[0].format('yyyy-MM-dd hh:mm:ss')+'',
            enddate:this.ccStatistics.date[1].format('yyyy-MM-dd hh:mm:ss')+'',
            domains:this.ccStatistics.domain
        }).then(res => {
            if(res.status == 200 && res.data.status == 1){
                if(res.data.hitdeny){
                    this.ccQps.xAxis.data = res.data.time;
                    this.ccQps.series[0].data = res.data.hitdeny;
                    this.ccQps.series[1].data = res.data.hit;
                }
               this.echartsLodaing('ccQps').hideLoading();
            }else{
                this.$Message.info(res.data.message);
                this.echartsLodaing('ccQps').hideLoading();
            }
        })
    },

    QueryCCAttackInfo(){
        this.$http.post('ddosImitationIp/QueryCCAttackInfo.do',{
            packageId:this.ccStatistics.packageid,
            startdate:this.ccStatistics.date[0].format('yyyy-MM-dd hh:mm:ss')+'',
            enddate:this.ccStatistics.date[1].format('yyyy-MM-dd hh:mm:ss')+'',
            domains:this.ccStatistics.domain
        }).then(res => {
            if(res.status == 200 && res.data.status == 1){
                this.ccAttackData = res.data.result;
            }else{
                this.$Message.info(res.data.message);
            }
        })
    },

    QueryCCAttDomain(){
         this.$http.post('ddosImitationIp/QueryCCAttDomain.do',{
             packageId:this.ccStatistics.packageid,
            startdate:this.ccStatistics.date[0].format('yyyy-MM-dd hh:mm:ss')+'',
            enddate:this.ccStatistics.date[1].format('yyyy-MM-dd hh:mm:ss')+'',
            domains:this.ccStatistics.domain
        }).then(res => {
            if(res.status == 200 && res.data.status == 1){
                 this.ccAttDomainData = res.data.result;
            }else{
                this.$Message.info(res.data.message);
            }
        })
    },

    QueryCCAttIPDistribution(){
         this.$http.post('ddosImitationIp/QueryCCAttIPDistribution.do',{
             packageId:this.ccStatistics.packageid,
            startdate:this.ccStatistics.date[0].format('yyyy-MM-dd hh:mm:ss')+'',
            enddate:this.ccStatistics.date[1].format('yyyy-MM-dd hh:mm:ss')+'',
            domains:this.ccStatistics.domain
        }).then(res => {
            if(res.status == 200 && res.data.status == 1){

            }else{
                this.$Message.info(res.data.message);
            }
        })
    },

    getAllCCMap(){
        this.QueryCCAttackQPS();
        this.QueryCCAttackInfo();
        this.QueryCCAttDomain();
        this.QueryCCAttIPDistribution();
    },
    // ……CC统计图结束……

    inmapVoid(){
        console.log(this.$inMap);
        let iMap = this.$inMap;
        var data =[
            {   geometry: {type: 'Point', coordinates: [123, 23]},
                style:{}, 
                name: "",   
                count: 30  
            }
            ]
        var inmap = new iMap.Map({
        id: "topMap",
        // skin: "Blueness",
        // center: [105.403119, 38.028658],
        // zoom: {
        //     value: 5,
        //     show: true,
        //     max: 18,
        //     min: 5
        // }
        });
        var overlay = new iMap.HeatOverlay({
        style: {
            radius: 10, // 半径
            minScope: 0, // 最小区间,小于此区间的不显示
            maxScope: 1 // 最大区间,大于此区间的不显示
        }
        });
        // inmap.add(overlay);
        overlay.setData(data);
        // console.log(overlay.setData(data));
    },
    //统计图结束^ 


    // 获取网站业务
    getDomainList(page){
        this.$http.get('ddosImitationIp/QueryAlldomain.do',{
            params:{
                packageId:this.tabsId,
                page:page,
                pageSize:'10'
            }
        }).then(res => {
            if(res.status == 200 && res.data.status == 1){
                this.businessData = res.data.result;
            }else{
                this.$Message.info(res.data.message);
            }
        })
    },

    // 换源
    updateDomain(name){
        if(this.certificateId == '' && name == 'source'){
            this.$Message.info('请选择需要关联的证书ID');
            return;
        }
        this.$http.get('ddosImitationIp/UpdateDomain.do',{
            params:{
                domain:this.businessSelect.domainname,
                source: name == 'ip' ? this.sourceip : this.businessSelect.sourceip,
                port:this.businessSelect.port,
                crtId:name == 'source' ?this.certificateId : this.businessSelect.crtId,
                http:this.businessSelect.httpstate,
                https:this.businessSelect.httpsstate,
                Id:this.businessSelect.id,
                packageId:this.businessSelect.packageid
            }
        }).then(res =>{
            if(res.status == 200 && res.data.status == 1){
                if(name == 'source'){
                    this.$Message.success('关联成功');
                    this.showModal.changeSource = false;
                    this.getDomainList(1);
                }else{
                     this.$Message.success('源站ip修改成功');
                    this.showModal.changeIp = false;
                     this.getDomainList(1);
                }
                
            }else{
                 this.renewPrice = res.data;
            }   
        }).catch(err =>{})
    },

    updateDomainTable(){
        let http = 0,
            https = 0;
        if(this.addDomainList.http.length != 0){
             http = this.addDomainList.http.join(',').indexOf('http') == -1 ?0 :1;
             https = this.addDomainList.http.join(',').indexOf('https') == -1 ? 0:1;
        }
       this.$http.get('ddosImitationIp/UpdateDomain.do',{
            params:{
                domain:this.addDomainList.domain,
                source:this.addDomainList.ip,
                port:this.addDomainList.agreement,
                http:http,
                https:https,
                Id:this.addDomainList.id,
                packageId:this.addDomainList.attackMeal
            }
        }).then(res =>{
            if(res.status == 200 && res.data.status == 1){
                this.$Message.success('修改成功');
                  this.getDomainList(1);
                this.showModal.addDomain = false;
            }else{
                 this.renewPrice = res.data;
            }   
        }).catch(err =>{})
    },

    addNameList(name) {
        this.$refs[name].validate((valid) => {
        if (valid) {
              this.ccProtectData[this.ccIndex].blacklist+=this.nameValidate.black;
              this.ccProtectData[this.ccIndex].whitelist+=this.nameValidate.white;
              this.showModal.nameList = false;
        }})
    },


    queryDomain(){
        this.busLoading = true;
        this.$http.get('ddosImitationIp/Querydomain.do',{
            params:{
                domain:this.domainName
            }
        }).then(res => {
            if(res.status == 200 && res.data.status == 1){
                this.businessData = [];
                this.businessData.push(res.data.result);
                this.busLoading = false;
            }else{
                this.$Message.info(res.data.message);
                this.busLoading = false;
            }
        })
    },


    /**
     * 业务管理-证书管理
     */
    getCertificate(page){
        this.$http.get('ddosImitationIp/QueryAllCertificate.do',{
            params:{
                page:page,
                pageSize:'10',
            }
        }).then(res =>{
            if(res.status == 200 && res.data.status == 1){
                this.certificateData = res.data.result;
            }else{
                  this.$Message.info(res.data.message);
            }
        }).catch(err =>{})
    },

    createCertificate(name){
        this.$refs.certificateValidate.validate((valid) => {
        if (valid) {
            this.$http.post('ddosImitationIp/AddCertificate.do',{
                crtName:this.certificateValidate.name,
                crtRemark:this.certificateValidate.desc,
                crtDes:this.certificateValidate.file,
                keyDes:this.certificateValidate.secret,
                caDes:this.certificateValidate.ca,
                encryptionWay:this.certificateValidate.encryptionway
        }).then(res => {
            if(res.status == 200 && res.data.status == 1){
                this.$Message.success('新增证书成功');
                this.showModal.certificate = false;
                this.getCertificate(1);
            }else{
                this.$Message.info(res.data.message);
            }
        }).catch(err => {

        })
        }})
    },
    queryCertificate(){
        this.cerLoading = true;
        this.$http.get('ddosImitationIp/QueryCertificate.do',{
            params:{
                crtName:this.crtName
            }
        }).then(res => {
            if(res.status == 200 && res.data.status ==1){
                 this.certificateData = [];
                  this.certificateData.push(res.data.result);
                  this.cerLoading = false;
            }else{
                this.$Message.info(res.data.message);
                this.cerLoading = false;
            }
        }).catch(err =>{})
    },

    updateCertificate(){
        this.$http.post('ddosImitationIp/UpdateCertificate.do',{
            // params:{
                crtId:this.certificateValidate.crtId,
                crtName:this.certificateValidate.name,
                crtRemark:this.certificateValidate.desc,
                crtDes:this.certificateValidate.file,
                keyDes:this.certificateValidate.secret,
                caDes:this.certificateValidate.ca,
                encryptionWay:this.certificateValidate.pawMode,
                id:this.certificateValidate.id
            // }
        }).then(res => {
            if(res.status == 200 && res.data.status == 1){
                this.$Message.success('修改成功');
                this.showModal.certificate = false;
                this.getCertificate(1);
            }else{
                this.renewPrice = res.data;
            }
        }).catch(err =>{})
    },

    cerFunChange(name){
        if(name == 'add'){
            this.createCertificate();
        }else{
            this.updateCertificate();
        }
    },
    
    addCerShow(){
        this.showModal.certificate = true; 
        this.cIsAdd = 'add';
        this.certificateValidate.name ='';
        this.certificateValidate.file = '';
        this.certificateValidate.secret = '';
        this.certificateValidate.ca = '';
        this.certificateValidate.desc = '';
        this.certificateValidate.pawMode = '';
    },
   

    /**
     * 业务管理-非网站业务
     */
    getAllforwardrule(page){
            this.$http.get('ddosImitationIp/QueryAllforwardrule.do',{
                params:{
                    page:page,
                    pageSize:'10',
                    packageUserId:''
                }
            }).then(res => {
                if(res.status == 200 && res.data.status == 1){
                    this.ruleData = res.data.result;
                }else{
                    this.$Message.info(res.data.messae);
                }
            }).catch(err => {

            })
    },   

    goRuleAdd(){
        this.$router.push('ddosipruleadd');
        if(sessionStorage.getItem('ruleList') != undefined){
            sessionStorage.removeItem('ruleList')
        }
    },

    queryRule(){
        this.ruleLoading = true;
        this.$http.get('ddosImitationIp/queryforwardrule.do',{
            params:{
                packageId:'dms-20190719388840',
                accessPort:this.visitPortNum
            }
        }).then(res => {
            if(res.status == 200 && res.data.status == 1){
                this.ruleData = res.data.result;
                this.ruleLoading = false;
            }else{
                this.ruleLoading = false;
                this.$Message.info(res.data.messae);
            }
        }).catch(err =>{
            if(err){
                this.$Message.info('网络异常，请稍后再试');
                this.ruleLoading = false;
            }
              
        })
    },

    /**
     * 防护管理
     */
    getProtectCC(id,page){
        this.getEmptyLink(id);
        this.$http.get('ddosImitationIp/QueryAlldomain.do',{
            params:{
                packageId:id,
                page:'1',
                pageSize:'10'
            }
        }).then(res => {
            if(res.status == 200 && res.data.status == 1){
                this.ccProtectData = res.data.result;
                // this.ccProtectData.forEach(item =>{
                //     item._disableExpand = true;
                // })
            }else{
                this.$Message.info(res.data.message);
            }
        }).catch(err => {})
    },

    getEmptyLink(id){
         this.$http.get('ddosImitationIp/QueryL4DDosConfig.do',{
            params:{
                packageId:id
            }
        }).then(res =>{
            if(res.status == 200 && res.data.status == 1){
                this.emptyLink = res.data.ddosProtect;
            }else{
                this.$Message.info(res.data.message);
            }
        })
    },

    updateL4DDoSConfig:debounce(2000, function(val){
        this.$http.get('ddosImitationIp/UpdateL4DDoSConfig.do',{
            params:{
                packageId:this.setMeal,
                ddosProtect:val
            }
        }).then(res => {
            if(res.status == 200 && res.data.status == 1){
                this.emptyLink = val;
                this.$Message.success('空链接防护开启/关闭成功');
            }else{
                this.$Message.info(res.data.message);
                this.emptyLink = val == 0?1:0;
            }
        }).catch(err =>{
            if(err){
                this.emptyLink = val == 0?1:0;
                this.$Message.info('网络异常');
            }
        })
    }),

    updateddoSConfig(){
        this.$http.get('ddosImitationIp/updateddoSConfig.do')
    },

    // 获取操作日志
    getLog(page){
        this.$http.post('ddosImitationIp/queryLog.do',{
                page:page,
                pageSize:'10',
                packageId:this.operationObject,
                startTime:this.logTime[0] == undefined ?'':this.logTime[0].format('yyyy-MM-dd hh:mm:ss'),
                endTime:this.logTime[1] == undefined ?'':this.logTime[1].format('yyyy-MM-dd hh:mm:ss')
        }).then(res =>{
            if(res.status == 200 && res.data.status == 1){
                this.journalData = res.data.result;
            }else{
                  this.$Message.info(res.data.message);
            }
        })
    },

    deleteList(name){
        let url = '',
        domain = '',
        id='', 
        packageId='';
        this.overviewSelect.forEach(item =>{
            domain +=item.domainname+',';
            id +=item.id+',';
            packageId+=item.packageid+',';

        })
         let params  = {
            domain:domain,
            Id:id,
            packageId:packageId
        };
        if(name == 'certificate' || name == 'forwardrule'){
            params = {
                Id:id
            }
        }
       
        if(name == 'domain'){
            url = 'ddosImitationIp/deletedomain.do'
        }else if(name == 'certificate'){
            url = 'ddosImitationIp/DeleteCertificate.do'
        }else if(name == 'forwardrule'){
            url = 'ddosImitationIp/deleteforwardrule.do'
        }
        this.$http.get(url,{params}).then(res =>{
            if(res.status == 200 && res.data.status == 1){
                this.overviewSelect = [];
                this.$Message.success(res.data.message);
                if(name == 'domain'){
                   this.getDomainList(1);
                }else if(name == 'certificate'){
                     this.getCertificate(1);
                }else if(name == 'forwardrule'){
                      this.getAllforwardrule(1);
                }
            }else{
                this.$Message.info(res.data.message);
            }
        }).catch(err => {})
    },

    saveConfig(index) {
         this.$http.get('ddosImitationIp/updateddoSConfig.do',{params:{
             packageId:this.setMeal,
             domainName: this.ccProtectData[index].domainname,
             ccProtect: this.ccProtectData[index].ccprotect,
             protectType: this.ccProtectData[index].protecttype,
             blackList: this.blackName,
             whiteList: this.whiteName
         }}).then(res =>{
            if(res.status == 200 && res.data.status == 1){
                this.$Message.info(res.data.message);
                this.ccShow = true;
                this.ccDisabled = true;
            } else {
                this.$Message.info(res.data.message);
            }
         })
    },

    echartsLodaing(name){
        let map =  echarts.init(document.getElementById(name));
        return map;
    },

  },
  computed:{
      renewDisabled(){
          if(this.overviewSelect.length == 0 || (this.overviewRadio =='概览' && this.overviewSelect.length > 1)){
              return true;
          }else{
              return false;
          }
      },
  },
  watch:{
      'button1':{
          handler(){
              let list =[];
               this.overviewTableChange(list);
                
          },deep:true
      },
      'overviewRadio':{
           handler(){
              let list =[];
               this.overviewTableChange(list);
          },deep:true
      },
      showModal:{
          handler(){
              this.renewPrice.status = 1;
          },
           deep:true,
            immediate:true
      }
  }
}
</script>

<style lang="less" scoped>
.ivu-input-wrapper textarea.ivu-input {
  resize: none;
}
.ivu-switch-checked {
  border-color: #19be6a;
  background-color: #19be6a;
}
.ivu-switch-checked:after {
  left: 22px;
}
.ivu-switch:after {
  width: 16px;
  height: 16px;
}
.ivu-switch {
  width: 40px;
  height: 20px;
}
.ivu-table-tbody > td.ivu-table-expanded-cell {
  padding: 20px 20px;
}
.i-sw {
  border-color: #19be6a;
  background-color: #19be6a;
}
.dp-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  .dp-cn {
    margin-left: 40px;
    color: #333333;
    font-weight: bold;
  }
}
.dp-bt {
  margin-top: 10px;
  font-size: 18px;
}
.dp-bts {
  margin-top: 10px;
  font-size: 14px;
}
.dp-page {
  text-align: right;
  margin-top: 20px;
}
.md-cer {
//   overflow: auto;
}
.f-p {
  position: absolute;
  right: 11px;
  top: 30px;
  color: #b2b2b2;
}
.dp-box {
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(233, 233, 233, 1);
}
.dp-grad {
  margin-top: 20px;
  height: 40px;
  background: linear-gradient(
    270deg,
    rgba(42, 153, 242, 0) 4%,
    rgba(42, 153, 242, 0.34) 100%,
    rgba(42, 153, 242, 0.3) 27%
  );
  line-height: 40px;
  font-size: 14px;
  color: #666666;
}

.b-font {
  font-size: 18px;
  color: #333333;
  font-weight: bold;
  margin: 0 10px;
}

.o-font {
  color: #ed4014;
}
.l-font {
  color: #2a99f2;
  cursor: pointer;
  font-size: 14px;
}
.dp-more {
  width: 380px;
}
.dp-fh {
  width: 272px;
  height: 100px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 1px 9px -2px rgba(0, 0, 0, 0.2);
  margin-right: 10px;
  position: relative;
  > div {
    margin: 32px 0 10px 20px;
  }
  .fh-sp {
    color: #333333;
    font-size: 14px;
    margin-right: 10px;
  }
}
.dp-fh::before {
  content: "";
  position: absolute;
  width: inherit;
  height: 6px;
  background-color: #666666;
}
.dp-cc {
  margin-top: 18px;
}
.selectMark {
  margin: 10px 0;
  > img {
    position: relative;
    top: 4px;
  }
  > span {
    font-size: 14px;
    font-family: MicrosoftYaHei;
    color: rgba(102, 102, 102, 1);
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
  cursor: pointer;
}
.dp-ds {
  height: 48px;
  background: rgba(245, 245, 245, 1);
  color: #666666;
  padding-left: 21px;
  margin-bottom: 20px;
  > div {
    display: inline-block;
    height: inherit;
    line-height: 48px;
  }
}
.text-box {
  border: 1px solid #2a99f2;
  background-color: RGBA(42, 153, 242, 0.1);
  padding: 7px 10px;
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  border-radius: 4px;
  font-size: 14px;
  color: #666666;
  margin-bottom: 20px;
}
.dp-tis {
  color: #ffffff;
  background-color: #4297f2;
  border: 1px solid #4297f2;
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

.dp-rd {
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}
.y-p {
  margin-top: 5px;
  color: #ff9801;
}
.dp-bf {
  color: #999999;
  margin-top: 10px;
  > span {
    color: #2a99f2;
    cursor: pointer;
  }
}
.dp-inmap {
  width: 620px;
  height: 270px;
}
.dp-tp{
   padding-bottom: 10px;
    border-bottom: 1px solid #E9E9E9;
    margin-bottom: 18px; 
}
.dp-th{
    width: 272px;
  background: rgba(255, 255, 255, 1);
  margin-right: 10px;
  position: relative;
  > div {
    margin: 0 0 10px 20px;
  }
}
.dp-list{
    float: left;
}
.dp-list li:first-child{
        padding: 0px;
        margin-bottom:20px;
}
.dp-item{
    color: #999999;
}
.sp{
    li{
        padding-left: 18px;
    }
    .itemt{
        position: relative;
    }
    .itemt::before{
        content: "";
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: #2a99f2;
        position: absolute;
        top: 4px;
        left: 0;   
    }
     .items{
        position: relative;
    }
    .items::before{
        content: "";
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: #19BE6A;
        position: absolute;
        top: 4px;
        left: 0;   
    }
     .itemf{
        position: relative;
    }
    .itemf::before{
        content: "";
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: #FCCF14;
        position: absolute;
        top: 4px;
        left: 0;   
    }
    .itemw{
        position: relative;
    }
    .itemw::before{
        content: "";
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: #F82B79;
        position: absolute;
        top: 4px;
        left: 0;   
    }
    .iteml{
        position: relative;
    }
    .iteml::before{
        content: "";
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: #723BCA;
        position: absolute;
        top: 4px;
        left: 0;   
    }
}
.dp-mbr{
    border:1px dashed #999999;padding:20px;border-radius:4px;margin-top:20px;
    position: relative;
    height: 470px;
    .no-dataz{
       position: absolute;
        top: 50%;
        left: 24%;
        text-align: center;
        .no-pfb{
            font-size: 18px;
            color: #666666;
            margin-bottom: 10px;
        }
        .no-pfs{
            font-size: 14px;
            color: #999999;
        } 
    }
    .no-data{
        position: absolute;
        top: 50%;
        left: 39%;
        text-align: center;
        .no-pfb{
            font-size: 18px;
            color: #666666;
            margin-bottom: 10px;
        }
        .no-pfs{
            font-size: 14px;
            color: #999999;
        }
    }
}
.link-te{
    color: #2a99f2;
    cursor: pointer;
}
</style>

