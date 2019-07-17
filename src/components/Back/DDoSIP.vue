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
                    <p></p>
                </div>
                 <Tabs type="card">
                    <TabPane label="概览">
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
                               <Button type="primary">购买套餐</Button>
                               <Button type="primary" :disabled='renewDisabled' @click="showModal.meal = true">套餐续费</Button>
                           </div>
                           <div>
                               <div class="selectMark">
                                    <img src="../../assets/img/host/h-icon10.png"/>
                                    <span>共 {{ overviewData.length }} 项 | 已选择 <span style="color:#FF624B;">{{ overviewSelect.length }} </span>项</span><span style="margin-left:10px;">总价:</span><span style="color:#FF624B;">￥{{price}}</span>
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
                                    <Select size="small" v-model="attackMeal" style="width:231px;">
                                        <Option v-for="item in setMealList" :value="item.packageid" :key="item.packageid">{{ item.packageid }}</Option>
                                    </Select>
                               </div>
                              <div>
                                   <span>按统计时间</span>
                                   <DatePicker v-model='statisticsTime' format='yyyy-MM-dd' size='small' :transfer='true' type="daterange"  placement="bottom-end" placeholder="Select date" style="width: 231px;"></DatePicker>
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
                                                <span class="b-font" style="margin:0px;">2018-10-05 23:45</span>
                                            </div>
                                        </div> 
                                    </div>
                                    <div class="dp-fh" style="width:380px;">
                                        <div>
                                            <div>
                                                <span class="fh-sp">DDoS攻击带宽峰</span>
                                            </div>
                                            <div class="dp-bt">
                                                <span class="b-font" style="margin:0px;">34.25Gbps</span>
                                            </div>
                                        </div> 
                                    </div>
                                    <div class="dp-fh" style="width:380px;margin:0;">
                                        <div>
                                            <div>
                                                <span class="fh-sp">已清洗流</span>
                                            </div>
                                            <div class="dp-bt">
                                                <span class="b-font" style="margin:0px;">34.25Gbps</span>
                                            </div>
                                        </div> 
                                    </div>
                                </div>

                                <div style="border:1px dashed #999999;padding:20px;border-radius:4px;margin-top:20px;">
                                    <p style="font-size:14px;color:#333333;">清洗流量统计（单位Gbps）</p>
                                    <chart style="width:100%;" ref="cpu" :options="hightIp"></chart>
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
                           <div style='display:flex;'>
                            <div class="dp-row">
                               <div style="border:1px dashed #999999;padding:20px;border-radius:4px;margin-top:20px;margin-right:20px;width:550px;">
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
                                    <chart style="width:100%;" ref="cpu" :options="flowBtm"></chart>
                                </div>
                            </div>
                            <div class="dp-row">
                               <div style="border:1px dashed #999999;padding:20px;border-radius:4px;margin-top:20px;width:550px;">
                                    <div class='dp-tp'>
                                        <span style="font-size:14px;color:#333333;">攻击类型</span>
                                         <span class="l-font" style='float:right;'>刷新</span> 
                                    </div>
                                    <div style='display:flex;'>
                                   
                                    </div>
                                    <chart style="width:100%;" ref="cpu" :options="hightIpBin"></chart>
                                </div>
                            </div>
                           </div>
                            
                       </div>

                         <!-- CC统计  -->
                       <div v-if="overviewRadio == 'CC统计'">
                           <div class="dp-ds">
                               <div> 
                                   <span>套餐选择</span>
                                    <Select size="small" v-model="ccStatistics.packageid" style="width:231px;">
                                        <Option v-for="item in setMealList" :value="item.packageid" :key="item.packageid">{{ item.packageid }}</Option>
                                    </Select>
                               </div>
                                <div>
                                   <span>域名选择</span>
                                   <Select size="small" v-model="ccStatistics.domain" style="width:231px;">
                                        <Option v-for="item in setMealList" :value="item.domain" :key="item.domain">{{ item.domain }}</Option>
                                    </Select>
                               </div>
                                <div>
                                   <span>按统计时间</span>
                                   <DatePicker v-model='ccStatistics.date' format='yyyy-MM-dd' size='small' :transfer='true' type="daterange"  placement="bottom-end" placeholder="Select date" style="width: 231px;"></DatePicker>
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
                                    <span class="l-font">刷新</span> 
                                    </div>
                                </div>
                                <div style="border:1px dashed #999999;padding:20px;border-radius:4px;margin-top:20px;">
                                    <p style="font-size:14px;color:#333333;">CC攻击QPS统计（单位：次）</p>
                                    <chart style="width:100%;" ref="ccQps" :options="ccQps"></chart>
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
                               <div style="border:1px dashed #999999;padding:20px;border-radius:4px;margin-top:20px;">
                                    <p style="font-size:14px;color:#333333;">Top 100IP分布</p>
                                    <div id='topMap' class='dp-inmap'></div>
                                </div>
                           </div>
                       </div>

                        <!-- 业务统计  -->
                       <div v-if="overviewRadio == '业务统计'">
                           <div class="dp-ds">
                               <div> 
                                   <span>套餐选择</span>
                                    <Select size="small" v-model="business.packageId" style="width:231px;">
                                        <Option v-for="item in setMealList" :value="item.packageid" :key="item.packageid">{{ item.packageid }}</Option>
                                    </Select>
                               </div>
                              <div>
                                   <span>按统计时间</span>
                                   <DatePicker v-model='business.date' format='yyyy-MM-dd' size='small' :transfer='true' type="daterange"  placement="bottom-end" placeholder="Select date" style="width: 231px;"></DatePicker>
                                   <Button size='small' type="primary" style="width:54px;" @click="getAllBusinessMap">查询</Button>
                               </div>
                                <div>
                                   <span>域名选择</span>
                                   <Select size="small" v-model="business.domain" style="width:231px;">
                                        <Option v-for="item in setMealList" :value="item.domain" :key="item.domain">{{ item.domain }}</Option>
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

                                <div style="border:1px dashed #999999;padding:20px;border-radius:4px;margin-top:20px;">
                                    <p style="font-size:14px;color:#333333;">带宽流量统计（单位Gbps）</p>
                                    <chart style="width:100%;" ref="flow" :options="flowOut"></chart>
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
                               <div style="border:1px dashed #999999;padding:20px;border-radius:4px;margin-top:20px;">
                                    <p style="font-size:14px;color:#333333;">清洗流量统计（单位Gbps）</p>
                                    <chart style="width:100%;" ref="reque" :options="reque"></chart>
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
                                <div style="border:1px dashed #999999;padding:20px;border-radius:4px;margin-top:20px;">
                                    <p style="font-size:14px;color:#333333;">清洗流量统计（单位Gbps）</p>
                                    <chart style="width:100%;" ref="concurrent" :options="concurrent"></chart>
                                </div>
                           </div>
                       </div>
                    </TabPane>
                    <TabPane label="业务管理">
                        <div class="dp-row">
                            <div>
                                <RadioGroup v-model="button1" type="button">
                                    <Radio label="网站业务"></Radio>
                                    <Radio label="证书管理"></Radio>
                                    <Radio label="非网站业务"></Radio>
                                </RadioGroup>
                            </div>
                            <div style="line-height:26px;">
                                <span>添加域名帮助文档</span>
                            </div>
                        </div>
                        <!--      网站业务     -->
                         <div v-if="button1 == '网站业务'">
                            <div class="dp-row">
                                <div>
                                    <Button type="primary" style="margin-right:10px;" @click="$router.push('/DDoSAddDomain')">添加域名</Button>
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
                                    <Input placeholder="请输入域名" style="width:180px;margin:0 10px;"></Input>
                                    <Button type="primary" style="width:84px;" @click="queryDomain">查询</Button>
                                </div>
                            </div>
                            <!-- <div class="selectMark">
                                    <img src="../../assets/img/host/h-icon10.png"/>
                                    <span>共 {{ businessData.length }} 项 | 已选择 <span style="color:#FF624B;">{{ overviewSelect.length }} </span>项</span><span style="margin-left:10px;">总价:</span><span style="color:#FF624B;">￥0.00</span>
                            </div> -->
                            <Table :columns="businessList" :data="businessData"  @on-selection-change='overviewTableChange'></Table>
                            <div class="dp-page">
                                <span>总共{{businessData.length}}个项目</span>
                                <Page :total="businessData.length"  @on-change='getDomainList' style="display:inline-block;vertical-align: middle;margin-left:20px;"></Page>
                            </div>
                           
                        </div>
                        <!--     证书管理         -->
                        <div v-if="button1 == '证书管理'">
                            <div class="dp-row">
                                <div>
                                    <Button type="primary" style="margin-right:10px;" @click=" addCerShow">添加证书</Button>
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
                            <Table :columns="certificateList" :data="certificateData" @on-selection-change='overviewTableChange' ></Table>
                            <div class="dp-page">
                                <span>总共{{certificateData.length}}个项目</span>
                                <Page :total="certificateData.length" @on-change='getCertificate'  style="display:inline-block;vertical-align: middle;margin-left:20px;"></Page>
                            </div>
                        </div>

                         <!--     非网站业务         -->
                        <div v-if="button1 == '非网站业务'">
                            <div class="dp-row">
                                <div>
                                    <Button type="primary" style="margin-right:10px;" @click="$router.push('ddosipruleadd')">添加规则</Button>
                                    <Poptip
                                    confirm
                                    width="230"
                                    placement="right"
                                    @on-ok="deleteList('forwardrule')"
                                    title="您确认删除选中的配置吗？" style="margin: 0 10px">
                                    <Button type="primary" :disabled='renewDisabled'>删除</Button>
                                    </Poptip>
                                    <span class="dp-cn">CNAME：sectest564as65d4a65s4d5as4d5a6s4d6</span>
                                </div>
                                <div>
                                     <Select v-model="visitPort" style="width:100px">
                                        <Option v-for="item in visitPortSelect" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                    </Select>
                                    <Input placeholder="请输入端口名称" style="width:180px;margin-right:10px;"></Input>
                                    <Button type="primary" style="width:84px;">查询</Button>
                                </div>
                            </div>
                            <Table :columns="ruleList" :data="ruleData" @on-selection-change='overviewTableChange'></Table>
                            <div class="dp-page">
                                <span>总共{{ruleData.length}}个项目</span>
                                <Page :total="ruleData.length" @on-change='getAllforwardrule' :current='ruleDataPage' style="display:inline-block;vertical-align: middle;margin-left:20px;"></Page>
                            </div>
                        </div>
                    </TabPane>
                    <TabPane label="防护管理">
                        <div class="dp-row">
                            <div>
                                <span style="font-size:14px;color:#333333;">套餐选择</span>
                                <Select v-model="setMeal" style="width:230px" @on-change='getProtectCC(setMeal)'>
                                    <Option v-for="item in setMealList" :value="item.packageid" :key="item.packageid">{{ item.packageid }}</Option>
                                </Select>
                                <Button @click="saveConfig()">保存修改</Button>
                            </div>
                            <div style="line-height:26px;">
                                <span>查看域名添加指引</span>
                            </div>
                        </div>
                        <div class="dp-box">
                            <div class="dp-grad dp-row">
                                <div>
                                    <span class="b-font">DDoS防护</span>
                                    <span >DDoS防护配置，针对该套餐下的所有网站业务的域名和非网站业务的转发规则都生效。</span>
                                </div>
                                <div>
                                <span class="o-font">配置变更之后请点击保存！</span> 
                                </div>
                            </div>
                            <div style="display:flex;">
                                <div class="dp-fh">
                                    <div>
                                        <div>
                                            <span class="fh-sp">四层DDoS清洗</span>
                                            <i-switch :true-value='true' :false-value='true' v-model="protectSwicth"></i-switch>
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
                                            <i-switch v-model="emptyLink" @on-change="updateL4DDoSConfig" :true-value='1' :false-value='0'></i-switch>
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
                                <div>
                                <span class="o-font">配置变更之后请点击保存！</span> 
                                </div>
                            </div>
                            <Table :columns="ccProtectList" :data="ccProtectData"></Table>
                            <div class="dp-page">
                                <Page :total="ccProtectData.length"  @on-change='getProtectCC(setMeal,1)'   style="display:inline-block;vertical-align: middle;margin-left:20px;"></Page>
                            </div>
                        </div>    
                    </TabPane>
                    <TabPane label="操作日志">
                        <div style="margin-bottom:21px;">
                            <span>操作时间</span>
                            <DatePicker v-model="logTime" :transfer='true' format='yyyy-MM-dd' type="daterange"  placement="bottom-end" placeholder="Select date" style="width: 200px;margin:0 20px;"></DatePicker>
                            <span>操作对象</span>
                            <Select v-model="operationObject" style="width:230px;margin:0 22px;">
                                <Option v-for="item in setMealList" :value="item.packageid" :key="item.packageid">{{ item.packageid }}</Option>
                            </Select>
                            <Button type="primary" @click="getLog(1)">查询</Button>    
                        </div>
                        <Table :columns="journalList" :data="journalData"></Table>
                        <div class="dp-page">
                            <Page :total="100" @on-change='getLog' style="display:inline-block;vertical-align: middle;margin-left:20px;"></Page>
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
                        <p>DMS-50GB 5656</p> 
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
                <Button type="primary" >确定</Button>
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
                        <Input v-model="certificateValidate.name" placeholder="请输入证书名称"></Input>
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
                        <FormItem label="生效域名" prop="domain">
                            <Input v-model="nameValidate.domain" placeholder="www.test.com" style="width:300px;"></Input>
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
               <Select v-model="operationObject" style="width:230px;margin:0 22px;">
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
import expandRow from './DDosExpandRow.vue';
import hightIp from '@/echarts/hightIp';
import hightIpBs from '@/echarts/hightIpBs';
import hightIpSl from '@/echarts/hightIpSl';
import hightIpBin from '@/echarts/hightIpBin';
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
      nameValidate:{
        black:'',
        white:'',
        domain:''
    },
    nameRuleValidate:{
        black:[{required: true, message: '请输入黑名单', trigger: 'blur'}],
        white:[{required: true, message: '请输入白名单', trigger: 'blur'}],
        domain:[{required: true, message: '请输入生效域名', trigger: 'blur'}]
    }, 
    blackName: '',
    whiteName: '',
      overviewRadio:'概览',
      button1: "网站业务",
      duration:'',
      durationIndex:0,
      durationList:[
          {
              value:'30',
              label:'1个月',
              isTrue:0
          },
          {
              value:'60',
              label:'2个月',
               isTrue:-1
          },
          {
              value:'90',
              label:'3个月',
               isTrue:-2
          },
          {
              value:'120',
              label:'4个月',
                isTrue:-3
          },
          {
              value:'150',
              label:'5个月',
              isTrue:-4
          },
          {
              value:'180',
              label:'6个月',
              isTrue:-5
          },
          {
              value:'360',
              label:'1年',
              isTrue:-6
          },
          {
              value:'720',
              label:'2年',
              isTrue:-7
          },
          {
              value:'1080',
              label:'3年',
              isTrue:-8
          },
      ],
       
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
                title:'攻击事件'
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

                            }
                        }
                    },'业务配置')
                }
            },
        ],
        overviewData:[
            {
                套餐ID:'2019023101240915',
                套餐类型:'DMS-50GB',
                有效期:'2019/3/25 21:29',
                购买日期:'2019/3/25 21:29',
                攻击事件:'次数'
            }
        ],
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
        // 统计时间
        statisticsTime:'',
        renewPrice:{},

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
        ddosAttEventList:[],
        ddosAttEventData:[],
        ddosAttInfoList:[],
        ddosAttInfoData:[],

      // 证书管理
      certificateKyeHide: true,
      cIsAdd:'add',
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
          title: "证书crt内容"
        },
        {
          title: "证书key内容",
          render: (h, params) => {
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
                    'class':'dp-rd'
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
        },
        {
          key: "cades",
          title: "证书ca内容",
          render:(h,params)=>{
              return h('p',{
                    'class':'dp-rd'
              },params.row.cades)
          }
        },
        {
          key: "domainname",
          title: "当前证书使用域名"
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
          crtId:''  
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
                      h('p',{},params.row.ccProtect == 0?'CC防护:关':'CC防护:开'),
                      h('p',{},params.row.ddosProtect == 0?'DDOS防护:关':'DDOS防护:开'),
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
               key:'deployState',
               title:'部署状态',
               render:(h,params)=>{
                   return h('span',{},params.row.deployState== 1?'部署成功':params.row.deployState== 2 ?'部署中':params.row.deployState== 3?'待部署':'部署失败')
               }
           },
           {
               key:'ddosProtect',
               title:'防护状态',
               render:(h,params)=>{
                   return h('span',{},params.row.ddosProtect == 0?'关闭':'开启')
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
                           }
                       },'修改'),
                       h('span',{
                            style:{
                               color:"#2A99F2",
                               cursor:"pointer"
                           },
                           on:{
                               click:()=>{
                                   this.$Modal.info({
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
       visitPort:'访问端口',
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
                               console.log(value);
                                this.whiteName = value
                            },
                            'black':(value)=>{
                                console.log(value);
                                this.blackName = value
                            }
                        }
                    })
                }
            },
            {
                key:'domainname',
                title:'域名'
            },
            {
                key:'sourceip',
                title:'源站IP/域名'
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
                        h('i-switch',{
                            props:{
                                value:params.row.ccprotect == 0 ?true:false,
                            },
                            on: {
                                'on-change': (value) => {
                                    this.ccProtectData[params.index].ccprotect=value?0:1
                                }
                            }
                        })
                    ]) 
                }
            },
            {
                key:'protecttype',
                title:'防护模式',
                render:(h,params)=>{
                    return h('RadioGroup',
                    {
                        props:{
                            value: params.row.protecttype
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
                            }
                        },'标准'),
                        h('Radio',{
                            props:{
                                label:1,
                            }
                        },'严格'),
                        h('Radio',{
                            props:{
                                label:2,
                            }
                        },'攻击应急')
                    ])
                }
            },
            {
                key:'黑白名单',
                title:'黑白名单',
                render:(h,params)=>{
                    return h('span',{
                        style:{
                            color:'#4297F2',
                            cursor:'pointer'
                        },
                        on:{
                            click:()=>{
                                this.renewPrice.status = 1
                                this.showModal.nameList=true
                            }
                        }
                    },'添加')
                }
            }
        ],
        riadosCC:'严格',
        ccProtectData:[
        ],
        // 操作日志
         operationObject:'操作对象',
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
         logTime:[]   
    }
  },
  beforeCreate(){
     
  },
  created(){
    
      this.getDdosOverview(1);
      this.getDomainList(1);
      this.getCertificate(1);
      this.getLog(1);
        this.getId();
      this.getAllforwardrule(1);
      this.changeColor();
       this.inmapVoid();
  },
  methods:{

    //   获取用户套餐ID
    getId(){
        let domainList = '';
        this.$http.get('ddosImitationIp/packageIdInfo.do',{}).then(res=>{
            if(res.status == 200 && res.data.status == 1){
                for(let i =0; i<res.data.result.length; i++){
                    for(let key in res.data.result[i]){
                        if(res.data.result[i][key].length != 0){
                          domainList = res.data.result[i][key][i].domainname;
                        }else{
                            domainList = null;
                        }
                        this.setMealList.push({'packageid':key,domain:domainList});
                        
                        console.log(this.setMealList);
                    }
                }
                this.setMeal = this.ccStatistics.packageid = this.business.packageId =  this.attackMeal = this.setMealList[0].packageid;
              
                this.getProtectCC(this.setMeal,1);
            }else{
                this.$Message.info(res.data.message);
            }
        })
    },

    // 改变统计图线条颜色
    changeColor(){
        this.reque.series[0].lineStyle.normal.shadowColor = 'rgba(181, 229, 173, 0.5)';
        this.reque.series[0].lineStyle.normal.color.colorStops[0].color = 'rgba(76, 165, 75, 1)';
        this.reque.series[0].lineStyle.normal.color.colorStops[1].color = 'rgba(181, 229, 173, 1)';
        this.concurrent.series[0].lineStyle.normal.shadowColor = 'rgba(187, 62, 213, 0.5)';
        this.concurrent.series[0].lineStyle.normal.color.colorStops[0].color = 'rgba(187, 62, 213, 1)';
        this.concurrent.series[0].lineStyle.normal.color.colorStops[1].color = 'rgba(102, 120, 255, 1)';
        this.reque.series[0].name = '请求次数';
        this.reque.series[0].stack = '请求次数';
        this.reque.legend.data  =['请求次数'];
        this.concurrent.series[0].name = '并发连接数';
        this.concurrent.series[0].stack = '并发连接数';
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

            }else{
                // this.$Message.info(res.data.messgae);
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
    QueryRequestNum(){
        this.$http.get('ddosImitationIp/QueryRequestNum.do',{
            params:{
                packageId:this.attackMeal,
                startdate:this.statisticsTime[0].format('yyyy-MM-dd hh:mm:ss')+'',
                enddate:this.statisticsTime[1].format('yyyy-MM-dd hh:mm:ss')+'',
                domains:''
            }
        }).then(res => {
            if(res.status == 200 && res.data.status == 1){

            }else{
                this.$Message.info(res.data.message);
            }
        }).catch(err =>{

        })
    },
    QueryBusinessBandwidth(){
        this.$http.post('ddosImitationIp/QueryBusinessBandwidth.do',{
                packageId:this.business.packageId,
                startdate:this.business.date[0].format('yyyy-MM-dd hh:mm:ss')+'',
                enddate:this.business.date[1].format('yyyy-MM-dd hh:mm:ss')+'',
                domains:this.business.domain
        }).then(res =>{
            if(res.status == 200 && res.data.status == 1){
                this.flowOut.xAxis.data = res.data.time;
                this.flowOut.series[0].data = res.data.value;
                this.business = res.data.peakStat;
            }else{
                this.$Message.info(res.data.message);
            }
        }).catch(err =>{})
    },

    QueryRequestNum(){
        this.$http.post('ddosImitationIp/QueryRequestNum.do',{
            packageId:this.business.packageId,
            startdate:this.business.date[0].format('yyyy-MM-dd hh:mm:ss')+'',
            enddate:this.business.date[1].format('yyyy-MM-dd hh:mm:ss')+'',
            domains:this.business.domain
        }).then(res =>{
            if(res.status == 200 && res.data.status == 1){
                this.reque.xAxis.data = res.data.time;
                this.reque.series[0].data = res.data.value;
            }else{
                this.$Message.info(res.data.message);
            }
        }).catch(err =>{})
    },

    QueryConnectionNum(){
       this.$http.post('ddosImitationIp/QueryConnectionNum.do',{
            packageId:this.business.packageId,
            startdate:this.business.date[0].format('yyyy-MM-dd hh:mm:ss')+'',
            enddate:this.business.date[1].format('yyyy-MM-dd hh:mm:ss')+'',
            domains:this.business.domain
        }).then(res =>{
            if(res.status == 200 && res.data.status == 1){
                this.concurrent.xAxis.data = res.data.time;
                this.concurrent.series[0].data = res.data.value;
            }else{
                this.$Message.info(res.data.message);
            }
        }).catch(err =>{}) 
    },

    

    //  // ……CC统计图开始……
    QueryCCAttackQPS(){
        this.$http.post('ddosImitationIp/QueryCCAttackQPS.do',{
            packageId:this.ccStatistics.packageid,
            startdate:this.ccStatistics.date[0].format('yyyy-MM-dd hh:mm:ss')+'',
            enddate:this.ccStatistics.date[1].format('yyyy-MM-dd hh:mm:ss')+'',
            domains:this.ccStatistics.domain
        }).then(res => {
            if(res.status == 200 && res.data.status == 1){
                this.ccQps.xAxis.data = res.data.time;
                this.ccQps.series[0].data = res.data.hitdeny;
                this.ccQps.series[1].data = res.data.hit;
            }else{
                this.$Messgae.info(res.data.messae);
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
                this.$Messgae.info(res.data.messae);
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
                this.$Messgae.info(res.data.messae);
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
                this.$Messgae.info(res.data.messae);
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



    getAllBusinessMap(){
        this.QueryRequestNum();
        this.QueryBusinessBandwidth();
        this.QueryConnectionNum();
    },

    inmapVoid(){
        let inMaps = this.inMap;
        var data = [{"count":6,"geometry":{"type":"Point","coordinates":["116.395645","39.929986"]}},{"count":6,"geometry":{"type":"Point","coordinates":["121.487899","31.249162"]}},{"count":5,"geometry":{"type":"Point","coordinates":["117.210813","39.14393"]}},{"count":4,"geometry":{"type":"Point","coordinates":["106.530635","29.544606"]}},{"count":4,"geometry":{"type":"Point","coordinates":["117.216005","31.859252"]}},{"count":8,"geometry":{"type":"Point","coordinates":["117.984943","26.050118"]}},{"count":2,"geometry":{"type":"Point","coordinates":["102.457625","38.103267"]}},{"count":9,"geometry":{"type":"Point","coordinates":["113.394818","23.408004"]}},{"count":1,"geometry":{"type":"Point","coordinates":["108.924274","23.552255"]}},{"count":2,"geometry":{"type":"Point","coordinates":["106.734996","26.902826"]}},{"count":0,"geometry":{"type":"Point","coordinates":["109.733755","19.180501"]}},{"count":2,"geometry":{"type":"Point","coordinates":["115.661434","38.61384"]}},{"count":0,"geometry":{"type":"Point","coordinates":["113.486804","34.157184"]}},{"count":9,"geometry":{"type":"Point","coordinates":["128.047414","47.356592"]}},{"count":3,"geometry":{"type":"Point","coordinates":["112.410562","31.209316"]}},{"count":7,"geometry":{"type":"Point","coordinates":["111.720664","27.695864"]}},{"count":7,"geometry":{"type":"Point","coordinates":["119.368489","33.013797"]}},{"count":0,"geometry":{"type":"Point","coordinates":["115.676082","27.757258"]}},{"count":0,"geometry":{"type":"Point","coordinates":["126.262876","43.678846"]}},{"count":4,"geometry":{"type":"Point","coordinates":["122.753592","41.6216"]}},{"count":2,"geometry":{"type":"Point","coordinates":["114.415868","43.468238"]}},{"count":7,"geometry":{"type":"Point","coordinates":["106.155481","37.321323"]}},{"count":5,"geometry":{"type":"Point","coordinates":["96.202544","35.499761"]}},{"count":2,"geometry":{"type":"Point","coordinates":["118.527663","36.09929"]}},{"count":5,"geometry":{"type":"Point","coordinates":["112.515496","37.866566"]}},{"count":7,"geometry":{"type":"Point","coordinates":["109.503789","35.860026"]}},{"count":6,"geometry":{"type":"Point","coordinates":["102.89916","30.367481"]}},{"count":4,"geometry":{"type":"Point","coordinates":["89.137982","31.367315"]}},{"count":1,"geometry":{"type":"Point","coordinates":["85.614899","42.127001"]}},{"count":4,"geometry":{"type":"Point","coordinates":["101.592952","24.864213"]}},{"count":1,"geometry":{"type":"Point","coordinates":["119.957202","29.159494"]}},{"count":8,"geometry":{"type":"Point","coordinates":["114.186124","22.293586"]}},{"count":6,"geometry":{"type":"Point","coordinates":["113.557519","22.204118"]}},{"count":2,"geometry":{"type":"Point","coordinates":["120.961454","23.80406"]}},{"count":0,"geometry":{"type":"Point","coordinates":["117.282699","31.866942"]}},{"count":3,"geometry":{"type":"Point","coordinates":["117.058739","30.537898"]}},{"count":8,"geometry":{"type":"Point","coordinates":["117.35708","32.929499"]}},{"count":5,"geometry":{"type":"Point","coordinates":["115.787928","33.871211"]}},{"count":3,"geometry":{"type":"Point","coordinates":["117.88049","31.608733"]}},{"count":9,"geometry":{"type":"Point","coordinates":["117.494477","30.660019"]}},{"count":3,"geometry":{"type":"Point","coordinates":["118.32457","32.317351"]}},{"count":3,"geometry":{"type":"Point","coordinates":["115.820932","32.901211"]}},{"count":8,"geometry":{"type":"Point","coordinates":["116.791447","33.960023"]}},{"count":9,"geometry":{"type":"Point","coordinates":["117.018639","32.642812"]}},{"count":5,"geometry":{"type":"Point","coordinates":["118.29357","29.734435"]}},{"count":8,"geometry":{"type":"Point","coordinates":["116.505253","31.755558"]}},{"count":1,"geometry":{"type":"Point","coordinates":["118.515882","31.688528"]}},{"count":3,"geometry":{"type":"Point","coordinates":["116.988692","33.636772"]}},{"count":3,"geometry":{"type":"Point","coordinates":["117.819429","30.94093"]}},{"count":9,"geometry":{"type":"Point","coordinates":["118.384108","31.36602"]}},{"count":2,"geometry":{"type":"Point","coordinates":["118.752096","30.951642"]}},{"count":6,"geometry":{"type":"Point","coordinates":["119.330221","26.047125"]}},{"count":2,"geometry":{"type":"Point","coordinates":["117.017997","25.078685"]}},{"count":2,"geometry":{"type":"Point","coordinates":["118.181883","26.643626"]}},{"count":3,"geometry":{"type":"Point","coordinates":["119.542082","26.656527"]}},{"count":9,"geometry":{"type":"Point","coordinates":["119.077731","25.44845"]}},{"count":2,"geometry":{"type":"Point","coordinates":["118.600362","24.901652"]}},{"count":7,"geometry":{"type":"Point","coordinates":["117.642194","26.270835"]}},{"count":7,"geometry":{"type":"Point","coordinates":["118.103886","24.489231"]}},{"count":6,"geometry":{"type":"Point","coordinates":["117.676205","24.517065"]}},{"count":6,"geometry":{"type":"Point","coordinates":["103.823305","36.064226"]}},{"count":4,"geometry":{"type":"Point","coordinates":["104.171241","36.546682"]}},{"count":0,"geometry":{"type":"Point","coordinates":["104.626638","35.586056"]}},{"count":7,"geometry":{"type":"Point","coordinates":["102.917442","34.992211"]}},{"count":6,"geometry":{"type":"Point","coordinates":["98.281635","39.802397"]}},{"count":7,"geometry":{"type":"Point","coordinates":["102.208126","38.516072"]}},{"count":3,"geometry":{"type":"Point","coordinates":["98.508415","39.741474"]}},{"count":4,"geometry":{"type":"Point","coordinates":["103.215249","35.598514"]}},{"count":6,"geometry":{"type":"Point","coordinates":["104.934573","33.39448"]}},{"count":4,"geometry":{"type":"Point","coordinates":["106.688911","35.55011"]}},{"count":6,"geometry":{"type":"Point","coordinates":["107.644227","35.726801"]}},{"count":3,"geometry":{"type":"Point","coordinates":["105.736932","34.584319"]}},{"count":1,"geometry":{"type":"Point","coordinates":["102.640147","37.933172"]}},{"count":2,"geometry":{"type":"Point","coordinates":["100.459892","38.93932"]}},{"count":6,"geometry":{"type":"Point","coordinates":["113.30765","23.120049"]}},{"count":7,"geometry":{"type":"Point","coordinates":["116.630076","23.661812"]}},{"count":4,"geometry":{"type":"Point","coordinates":["113.763434","23.043024"]}},{"count":1,"geometry":{"type":"Point","coordinates":["113.134026","23.035095"]}},{"count":3,"geometry":{"type":"Point","coordinates":["114.713721","23.757251"]}},{"count":7,"geometry":{"type":"Point","coordinates":["114.410658","23.11354"]}},{"count":0,"geometry":{"type":"Point","coordinates":["113.078125","22.575117"]}},{"count":6,"geometry":{"type":"Point","coordinates":["116.379501","23.547999"]}},{"count":7,"geometry":{"type":"Point","coordinates":["110.931245","21.668226"]}},{"count":3,"geometry":{"type":"Point","coordinates":["116.126403","24.304571"]}},{"count":5,"geometry":{"type":"Point","coordinates":["113.040773","23.698469"]}},{"count":9,"geometry":{"type":"Point","coordinates":["116.72865","23.383908"]}},{"count":4,"geometry":{"type":"Point","coordinates":["115.372924","22.778731"]}},{"count":1,"geometry":{"type":"Point","coordinates":["113.594461","24.80296"]}},{"count":7,"geometry":{"type":"Point","coordinates":["114.025974","22.546054"]}},{"count":4,"geometry":{"type":"Point","coordinates":["111.97701","21.871517"]}},{"count":2,"geometry":{"type":"Point","coordinates":["112.050946","22.937976"]}},{"count":8,"geometry":{"type":"Point","coordinates":["110.365067","21.257463"]}},{"count":1,"geometry":{"type":"Point","coordinates":["112.479653","23.078663"]}},{"count":4,"geometry":{"type":"Point","coordinates":["113.42206","22.545178"]}},{"count":8,"geometry":{"type":"Point","coordinates":["113.562447","22.256915"]}},{"count":9,"geometry":{"type":"Point","coordinates":["108.297234","22.806493"]}},{"count":9,"geometry":{"type":"Point","coordinates":["106.631821","23.901512"]}},{"count":8,"geometry":{"type":"Point","coordinates":["109.122628","21.472718"]}},{"count":1,"geometry":{"type":"Point","coordinates":["107.357322","22.415455"]}},{"count":1,"geometry":{"type":"Point","coordinates":["108.351791","21.617398"]}},{"count":8,"geometry":{"type":"Point","coordinates":["110.26092","25.262901"]}},{"count":2,"geometry":{"type":"Point","coordinates":["109.613708","23.103373"]}},{"count":8,"geometry":{"type":"Point","coordinates":["108.069948","24.699521"]}},{"count":4,"geometry":{"type":"Point","coordinates":["111.552594","24.411054"]}},{"count":3,"geometry":{"type":"Point","coordinates":["109.231817","23.741166"]}},{"count":2,"geometry":{"type":"Point","coordinates":["109.422402","24.329053"]}},{"count":7,"geometry":{"type":"Point","coordinates":["108.638798","21.97335"]}},{"count":7,"geometry":{"type":"Point","coordinates":["111.305472","23.485395"]}},{"count":5,"geometry":{"type":"Point","coordinates":["110.151676","22.643974"]}},{"count":7,"geometry":{"type":"Point","coordinates":["106.709177","26.629907"]}},{"count":5,"geometry":{"type":"Point","coordinates":["105.92827","26.228595"]}},{"count":8,"geometry":{"type":"Point","coordinates":["105.300492","27.302612"]}},{"count":8,"geometry":{"type":"Point","coordinates":["104.852087","26.591866"]}},{"count":9,"geometry":{"type":"Point","coordinates":["109.196161","27.726271"]}},{"count":8,"geometry":{"type":"Point","coordinates":["106.93126","27.699961"]}},{"count":3,"geometry":{"type":"Point","coordinates":["104.900558","25.095148"]}},{"count":2,"geometry":{"type":"Point","coordinates":["107.985353","26.583992"]}},{"count":5,"geometry":{"type":"Point","coordinates":["107.523205","26.264536"]}},{"count":2,"geometry":{"type":"Point","coordinates":["110.330802","20.022071"]}},{"count":0,"geometry":{"type":"Point","coordinates":["109.358586","19.216056"]}},{"count":2,"geometry":{"type":"Point","coordinates":["109.656113","18.597592"]}},{"count":1,"geometry":{"type":"Point","coordinates":["109.0113","19.222483"]}},{"count":5,"geometry":{"type":"Point","coordinates":["109.413973","19.571153"]}},{"count":6,"geometry":{"type":"Point","coordinates":["109.996736","19.693135"]}},{"count":7,"geometry":{"type":"Point","coordinates":["108.85101","18.998161"]}},{"count":9,"geometry":{"type":"Point","coordinates":["110.32009","19.490991"]}},{"count":6,"geometry":{"type":"Point","coordinates":["110.414359","19.21483"]}},{"count":1,"geometry":{"type":"Point","coordinates":["109.861849","19.039771"]}},{"count":0,"geometry":{"type":"Point","coordinates":["109.062698","18.658614"]}},{"count":1,"geometry":{"type":"Point","coordinates":["109.724101","19.805922"]}},{"count":3,"geometry":{"type":"Point","coordinates":["109.948661","18.575985"]}},{"count":8,"geometry":{"type":"Point","coordinates":["109.522771","18.257776"]}},{"count":2,"geometry":{"type":"Point","coordinates":["110.063364","19.347749"]}},{"count":8,"geometry":{"type":"Point","coordinates":["110.292505","18.839886"]}},{"count":4,"geometry":{"type":"Point","coordinates":["110.780909","19.750947"]}},{"count":5,"geometry":{"type":"Point","coordinates":["109.51775","18.831306"]}},{"count":7,"geometry":{"type":"Point","coordinates":["114.522082","38.048958"]}},{"count":4,"geometry":{"type":"Point","coordinates":["115.49481","38.886565"]}},{"count":7,"geometry":{"type":"Point","coordinates":["116.863806","38.297615"]}},{"count":4,"geometry":{"type":"Point","coordinates":["117.933822","40.992521"]}},{"count":5,"geometry":{"type":"Point","coordinates":["114.482694","36.609308"]}},{"count":8,"geometry":{"type":"Point","coordinates":["115.686229","37.746929"]}},{"count":7,"geometry":{"type":"Point","coordinates":["116.703602","39.518611"]}},{"count":2,"geometry":{"type":"Point","coordinates":["119.604368","39.945462"]}},{"count":3,"geometry":{"type":"Point","coordinates":["118.183451","39.650531"]}},{"count":3,"geometry":{"type":"Point","coordinates":["114.520487","37.069531"]}},{"count":9,"geometry":{"type":"Point","coordinates":["114.893782","40.811188"]}},{"count":1,"geometry":{"type":"Point","coordinates":["113.649644","34.75661"]}},{"count":1,"geometry":{"type":"Point","coordinates":["114.351807","36.110267"]}},{"count":2,"geometry":{"type":"Point","coordinates":["114.29777","35.755426"]}},{"count":6,"geometry":{"type":"Point","coordinates":["113.211836","35.234608"]}},{"count":7,"geometry":{"type":"Point","coordinates":["114.351642","34.801854"]}},{"count":1,"geometry":{"type":"Point","coordinates":["112.447525","34.657368"]}},{"count":9,"geometry":{"type":"Point","coordinates":["114.046061","33.576279"]}},{"count":0,"geometry":{"type":"Point","coordinates":["112.542842","33.01142"]}},{"count":1,"geometry":{"type":"Point","coordinates":["113.300849","33.745301"]}},{"count":4,"geometry":{"type":"Point","coordinates":["115.026627","35.753298"]}},{"count":0,"geometry":{"type":"Point","coordinates":["111.181262","34.78332"]}},{"count":5,"geometry":{"type":"Point","coordinates":["115.641886","34.438589"]}},{"count":0,"geometry":{"type":"Point","coordinates":["113.91269","35.307258"]}},{"count":3,"geometry":{"type":"Point","coordinates":["114.085491","32.128582"]}},{"count":1,"geometry":{"type":"Point","coordinates":["113.835312","34.02674"]}},{"count":6,"geometry":{"type":"Point","coordinates":["114.654102","33.623741"]}},{"count":4,"geometry":{"type":"Point","coordinates":["114.049154","32.983158"]}},{"count":9,"geometry":{"type":"Point","coordinates":["126.657717","45.773225"]}},{"count":0,"geometry":{"type":"Point","coordinates":["125.02184","46.596709"]}},{"count":2,"geometry":{"type":"Point","coordinates":["124.196104","51.991789"]}},{"count":5,"geometry":{"type":"Point","coordinates":["130.292472","47.338666"]}},{"count":9,"geometry":{"type":"Point","coordinates":["127.50083","50.25069"]}},{"count":0,"geometry":{"type":"Point","coordinates":["130.941767","45.32154"]}},{"count":0,"geometry":{"type":"Point","coordinates":["130.284735","46.81378"]}},{"count":8,"geometry":{"type":"Point","coordinates":["129.608035","44.588521"]}},{"count":2,"geometry":{"type":"Point","coordinates":["131.019048","45.775005"]}},{"count":8,"geometry":{"type":"Point","coordinates":["123.987289","47.3477"]}},{"count":1,"geometry":{"type":"Point","coordinates":["131.171402","46.655102"]}},{"count":0,"geometry":{"type":"Point","coordinates":["126.989095","46.646064"]}},{"count":3,"geometry":{"type":"Point","coordinates":["128.910766","47.734685"]}},{"count":2,"geometry":{"type":"Point","coordinates":["114.3162","30.581084"]}},{"count":6,"geometry":{"type":"Point","coordinates":["114.895594","30.384439"]}},{"count":8,"geometry":{"type":"Point","coordinates":["109.517433","30.308978"]}},{"count":5,"geometry":{"type":"Point","coordinates":["114.906618","30.446109"]}},{"count":2,"geometry":{"type":"Point","coordinates":["115.050683","30.216127"]}},{"count":1,"geometry":{"type":"Point","coordinates":["112.21733","31.042611"]}},{"count":6,"geometry":{"type":"Point","coordinates":["112.241866","30.332591"]}},{"count":0,"geometry":{"type":"Point","coordinates":["112.768768","30.343116"]}},{"count":1,"geometry":{"type":"Point","coordinates":["110.487231","31.595768"]}},{"count":7,"geometry":{"type":"Point","coordinates":["110.801229","32.636994"]}},{"count":0,"geometry":{"type":"Point","coordinates":["113.379358","31.717858"]}},{"count":2,"geometry":{"type":"Point","coordinates":["113.12623","30.649047"]}},{"count":8,"geometry":{"type":"Point","coordinates":["113.387448","30.293966"]}},{"count":1,"geometry":{"type":"Point","coordinates":["114.300061","29.880657"]}},{"count":8,"geometry":{"type":"Point","coordinates":["112.176326","32.094934"]}},{"count":8,"geometry":{"type":"Point","coordinates":["113.935734","30.927955"]}},{"count":4,"geometry":{"type":"Point","coordinates":["111.310981","30.732758"]}},{"count":2,"geometry":{"type":"Point","coordinates":["112.979353","28.213478"]}},{"count":0,"geometry":{"type":"Point","coordinates":["111.653718","29.012149"]}},{"count":5,"geometry":{"type":"Point","coordinates":["113.037704","25.782264"]}},{"count":9,"geometry":{"type":"Point","coordinates":["112.583819","26.898164"]}},{"count":1,"geometry":{"type":"Point","coordinates":["109.986959","27.557483"]}},{"count":2,"geometry":{"type":"Point","coordinates":["111.996396","27.741073"]}},{"count":6,"geometry":{"type":"Point","coordinates":["111.461525","27.236811"]}},{"count":2,"geometry":{"type":"Point","coordinates":["112.935556","27.835095"]}},{"count":9,"geometry":{"type":"Point","coordinates":["109.745746","28.317951"]}},{"count":3,"geometry":{"type":"Point","coordinates":["112.366547","28.588088"]}},{"count":2,"geometry":{"type":"Point","coordinates":["111.614648","26.435972"]}},{"count":3,"geometry":{"type":"Point","coordinates":["113.146196","29.378007"]}},{"count":9,"geometry":{"type":"Point","coordinates":["110.48162","29.124889"]}},{"count":9,"geometry":{"type":"Point","coordinates":["113.131695","27.827433"]}},{"count":7,"geometry":{"type":"Point","coordinates":["118.778074","32.057236"]}},{"count":2,"geometry":{"type":"Point","coordinates":["119.981861","31.771397"]}},{"count":2,"geometry":{"type":"Point","coordinates":["119.030186","33.606513"]}},{"count":9,"geometry":{"type":"Point","coordinates":["119.173872","34.601549"]}},{"count":8,"geometry":{"type":"Point","coordinates":["120.873801","32.014665"]}},{"count":8,"geometry":{"type":"Point","coordinates":["120.619907","31.317987"]}},{"count":7,"geometry":{"type":"Point","coordinates":["118.296893","33.95205"]}},{"count":2,"geometry":{"type":"Point","coordinates":["119.919606","32.476053"]}},{"count":2,"geometry":{"type":"Point","coordinates":["120.305456","31.570037"]}},{"count":0,"geometry":{"type":"Point","coordinates":["117.188107","34.271553"]}},{"count":1,"geometry":{"type":"Point","coordinates":["120.148872","33.379862"]}},{"count":2,"geometry":{"type":"Point","coordinates":["119.427778","32.408505"]}},{"count":8,"geometry":{"type":"Point","coordinates":["119.455835","32.204409"]}},{"count":6,"geometry":{"type":"Point","coordinates":["115.893528","28.689578"]}},{"count":6,"geometry":{"type":"Point","coordinates":["116.360919","27.954545"]}},{"count":5,"geometry":{"type":"Point","coordinates":["114.935909","25.845296"]}},{"count":3,"geometry":{"type":"Point","coordinates":["114.992039","27.113848"]}},{"count":3,"geometry":{"type":"Point","coordinates":["117.186523","29.303563"]}},{"count":8,"geometry":{"type":"Point","coordinates":["115.999848","29.71964"]}},{"count":6,"geometry":{"type":"Point","coordinates":["113.859917","27.639544"]}},{"count":0,"geometry":{"type":"Point","coordinates":["117.955464","28.457623"]}},{"count":5,"geometry":{"type":"Point","coordinates":["114.947117","27.822322"]}},{"count":2,"geometry":{"type":"Point","coordinates":["114.400039","27.81113"]}},{"count":8,"geometry":{"type":"Point","coordinates":["117.03545","28.24131"]}},{"count":8,"geometry":{"type":"Point","coordinates":["125.313642","43.898338"]}},{"count":0,"geometry":{"type":"Point","coordinates":["122.840777","45.621086"]}},{"count":7,"geometry":{"type":"Point","coordinates":["126.435798","41.945859"]}},{"count":8,"geometry":{"type":"Point","coordinates":["126.564544","43.871988"]}},{"count":3,"geometry":{"type":"Point","coordinates":["125.133686","42.923303"]}},{"count":7,"geometry":{"type":"Point","coordinates":["124.391382","43.175525"]}},{"count":7,"geometry":{"type":"Point","coordinates":["124.832995","45.136049"]}},{"count":2,"geometry":{"type":"Point","coordinates":["125.94265","41.736397"]}},{"count":7,"geometry":{"type":"Point","coordinates":["129.485902","42.896414"]}},{"count":7,"geometry":{"type":"Point","coordinates":["123.432791","41.808645"]}},{"count":0,"geometry":{"type":"Point","coordinates":["123.007763","41.118744"]}},{"count":0,"geometry":{"type":"Point","coordinates":["123.778062","41.325838"]}},{"count":1,"geometry":{"type":"Point","coordinates":["120.446163","41.571828"]}},{"count":6,"geometry":{"type":"Point","coordinates":["121.593478","38.94871"]}},{"count":9,"geometry":{"type":"Point","coordinates":["124.338543","40.129023"]}},{"count":8,"geometry":{"type":"Point","coordinates":["123.92982","41.877304"]}},{"count":4,"geometry":{"type":"Point","coordinates":["121.660822","42.01925"]}},{"count":9,"geometry":{"type":"Point","coordinates":["120.860758","40.74303"]}},{"count":2,"geometry":{"type":"Point","coordinates":["121.147749","41.130879"]}},{"count":8,"geometry":{"type":"Point","coordinates":["123.172451","41.273339"]}},{"count":4,"geometry":{"type":"Point","coordinates":["122.073228","41.141248"]}},{"count":3,"geometry":{"type":"Point","coordinates":["123.85485","42.299757"]}},{"count":5,"geometry":{"type":"Point","coordinates":["122.233391","40.668651"]}},{"count":4,"geometry":{"type":"Point","coordinates":["111.660351","40.828319"]}},{"count":6,"geometry":{"type":"Point","coordinates":["105.695683","38.843075"]}},{"count":0,"geometry":{"type":"Point","coordinates":["109.846239","40.647119"]}},{"count":3,"geometry":{"type":"Point","coordinates":["107.423807","40.76918"]}},{"count":8,"geometry":{"type":"Point","coordinates":["118.930761","42.297112"]}},{"count":0,"geometry":{"type":"Point","coordinates":["109.993706","39.81649"]}},{"count":7,"geometry":{"type":"Point","coordinates":["119.760822","49.201636"]}},{"count":1,"geometry":{"type":"Point","coordinates":["122.260363","43.633756"]}},{"count":4,"geometry":{"type":"Point","coordinates":["106.831999","39.683177"]}},{"count":6,"geometry":{"type":"Point","coordinates":["113.112846","41.022363"]}},{"count":4,"geometry":{"type":"Point","coordinates":["116.02734","43.939705"]}},{"count":6,"geometry":{"type":"Point","coordinates":["122.048167","46.083757"]}},{"count":7,"geometry":{"type":"Point","coordinates":["106.206479","38.502621"]}},{"count":5,"geometry":{"type":"Point","coordinates":["106.285268","36.021523"]}},{"count":3,"geometry":{"type":"Point","coordinates":["106.379337","39.020223"]}},{"count":1,"geometry":{"type":"Point","coordinates":["106.208254","37.993561"]}},{"count":1,"geometry":{"type":"Point","coordinates":["105.196754","37.521124"]}},{"count":0,"geometry":{"type":"Point","coordinates":["101.767921","36.640739"]}},{"count":5,"geometry":{"type":"Point","coordinates":["100.223723","34.480485"]}},{"count":6,"geometry":{"type":"Point","coordinates":["102.085207","36.51761"]}},{"count":7,"geometry":{"type":"Point","coordinates":["100.879802","36.960654"]}},{"count":0,"geometry":{"type":"Point","coordinates":["100.624066","36.284364"]}},{"count":2,"geometry":{"type":"Point","coordinates":["97.342625","37.373799"]}},{"count":9,"geometry":{"type":"Point","coordinates":["102.0076","35.522852"]}},{"count":7,"geometry":{"type":"Point","coordinates":["97.013316","33.00624"]}},{"count":4,"geometry":{"type":"Point","coordinates":["117.024967","36.682785"]}},{"count":4,"geometry":{"type":"Point","coordinates":["117.968292","37.405314"]}},{"count":9,"geometry":{"type":"Point","coordinates":["118.583926","37.487121"]}},{"count":0,"geometry":{"type":"Point","coordinates":["116.328161","37.460826"]}},{"count":9,"geometry":{"type":"Point","coordinates":["115.46336","35.26244"]}},{"count":1,"geometry":{"type":"Point","coordinates":["116.600798","35.402122"]}},{"count":4,"geometry":{"type":"Point","coordinates":["117.684667","36.233654"]}},{"count":0,"geometry":{"type":"Point","coordinates":["115.986869","36.455829"]}},{"count":9,"geometry":{"type":"Point","coordinates":["118.340768","35.072409"]}},{"count":6,"geometry":{"type":"Point","coordinates":["120.384428","36.105215"]}},{"count":8,"geometry":{"type":"Point","coordinates":["119.50718","35.420225"]}},{"count":9,"geometry":{"type":"Point","coordinates":["117.089415","36.188078"]}},{"count":9,"geometry":{"type":"Point","coordinates":["122.093958","37.528787"]}},{"count":2,"geometry":{"type":"Point","coordinates":["119.142634","36.716115"]}},{"count":4,"geometry":{"type":"Point","coordinates":["121.309555","37.536562"]}},{"count":8,"geometry":{"type":"Point","coordinates":["117.279305","34.807883"]}},{"count":8,"geometry":{"type":"Point","coordinates":["118.059134","36.804685"]}},{"count":5,"geometry":{"type":"Point","coordinates":["112.550864","37.890277"]}},{"count":0,"geometry":{"type":"Point","coordinates":["113.120292","36.201664"]}},{"count":5,"geometry":{"type":"Point","coordinates":["113.290509","40.113744"]}},{"count":4,"geometry":{"type":"Point","coordinates":["112.867333","35.499834"]}},{"count":2,"geometry":{"type":"Point","coordinates":["112.738514","37.693362"]}},{"count":6,"geometry":{"type":"Point","coordinates":["111.538788","36.099745"]}},{"count":3,"geometry":{"type":"Point","coordinates":["111.143157","37.527316"]}},{"count":1,"geometry":{"type":"Point","coordinates":["112.479928","39.337672"]}},{"count":3,"geometry":{"type":"Point","coordinates":["112.727939","38.461031"]}},{"count":1,"geometry":{"type":"Point","coordinates":["113.569238","37.869529"]}},{"count":7,"geometry":{"type":"Point","coordinates":["111.006854","35.038859"]}},{"count":6,"geometry":{"type":"Point","coordinates":["108.953098","34.2778"]}},{"count":0,"geometry":{"type":"Point","coordinates":["109.038045","32.70437"]}},{"count":4,"geometry":{"type":"Point","coordinates":["107.170645","34.364081"]}},{"count":8,"geometry":{"type":"Point","coordinates":["107.045478","33.081569"]}},{"count":8,"geometry":{"type":"Point","coordinates":["109.934208","33.873907"]}},{"count":9,"geometry":{"type":"Point","coordinates":["108.968067","34.908368"]}},{"count":2,"geometry":{"type":"Point","coordinates":["109.483933","34.502358"]}},{"count":9,"geometry":{"type":"Point","coordinates":["108.707509","34.345373"]}},{"count":5,"geometry":{"type":"Point","coordinates":["109.50051","36.60332"]}},{"count":3,"geometry":{"type":"Point","coordinates":["109.745926","38.279439"]}},{"count":8,"geometry":{"type":"Point","coordinates":["104.067923","30.679943"]}},{"count":5,"geometry":{"type":"Point","coordinates":["102.228565","31.905763"]}},{"count":1,"geometry":{"type":"Point","coordinates":["106.757916","31.869189"]}},{"count":4,"geometry":{"type":"Point","coordinates":["107.494973","31.214199"]}},{"count":0,"geometry":{"type":"Point","coordinates":["104.402398","31.13114"]}},{"count":6,"geometry":{"type":"Point","coordinates":["101.969232","30.055144"]}},{"count":2,"geometry":{"type":"Point","coordinates":["106.63572","30.463984"]}},{"count":5,"geometry":{"type":"Point","coordinates":["105.819687","32.44104"]}},{"count":2,"geometry":{"type":"Point","coordinates":["103.760824","29.600958"]}},{"count":9,"geometry":{"type":"Point","coordinates":["102.259591","27.892393"]}},{"count":6,"geometry":{"type":"Point","coordinates":["105.44397","28.89593"]}},{"count":3,"geometry":{"type":"Point","coordinates":["106.105554","30.800965"]}},{"count":9,"geometry":{"type":"Point","coordinates":["103.84143","30.061115"]}},{"count":7,"geometry":{"type":"Point","coordinates":["104.705519","31.504701"]}},{"count":2,"geometry":{"type":"Point","coordinates":["105.073056","29.599462"]}},{"count":1,"geometry":{"type":"Point","coordinates":["101.722423","26.587571"]}},{"count":0,"geometry":{"type":"Point","coordinates":["105.564888","30.557491"]}},{"count":3,"geometry":{"type":"Point","coordinates":["103.009356","29.999716"]}},{"count":1,"geometry":{"type":"Point","coordinates":["104.633019","28.769675"]}},{"count":7,"geometry":{"type":"Point","coordinates":["104.63593","30.132191"]}},{"count":7,"geometry":{"type":"Point","coordinates":["104.776071","29.359157"]}},{"count":7,"geometry":{"type":"Point","coordinates":["91.111891","29.662557"]}},{"count":6,"geometry":{"type":"Point","coordinates":["81.107669","30.404557"]}},{"count":2,"geometry":{"type":"Point","coordinates":["97.185582","31.140576"]}},{"count":8,"geometry":{"type":"Point","coordinates":["94.349985","29.666941"]}},{"count":7,"geometry":{"type":"Point","coordinates":["92.067018","31.48068"]}},{"count":6,"geometry":{"type":"Point","coordinates":["88.891486","29.269023"]}},{"count":2,"geometry":{"type":"Point","coordinates":["91.750644","29.229027"]}},{"count":2,"geometry":{"type":"Point","coordinates":["87.564988","43.84038"]}},{"count":3,"geometry":{"type":"Point","coordinates":["81.291737","40.61568"]}},{"count":1,"geometry":{"type":"Point","coordinates":["80.269846","41.171731"]}},{"count":5,"geometry":{"type":"Point","coordinates":["88.137915","47.839744"]}},{"count":0,"geometry":{"type":"Point","coordinates":["86.121688","41.771362"]}},{"count":8,"geometry":{"type":"Point","coordinates":["82.052436","44.913651"]}},{"count":7,"geometry":{"type":"Point","coordinates":["87.296038","44.007058"]}},{"count":3,"geometry":{"type":"Point","coordinates":["93.528355","42.858596"]}},{"count":4,"geometry":{"type":"Point","coordinates":["79.930239","37.116774"]}},{"count":7,"geometry":{"type":"Point","coordinates":["75.992973","39.470627"]}},{"count":3,"geometry":{"type":"Point","coordinates":["84.88118","45.594331"]}},{"count":3,"geometry":{"type":"Point","coordinates":["76.137564","39.750346"]}},{"count":2,"geometry":{"type":"Point","coordinates":["86.041865","44.308259"]}},{"count":1,"geometry":{"type":"Point","coordinates":["82.974881","46.758684"]}},{"count":6,"geometry":{"type":"Point","coordinates":["79.198155","39.889223"]}},{"count":3,"geometry":{"type":"Point","coordinates":["89.181595","42.96047"]}},{"count":4,"geometry":{"type":"Point","coordinates":["87.565449","44.368899"]}},{"count":5,"geometry":{"type":"Point","coordinates":["81.297854","43.922248"]}},{"count":8,"geometry":{"type":"Point","coordinates":["102.714601","25.049153"]}},{"count":1,"geometry":{"type":"Point","coordinates":["99.177996","25.120489"]}},{"count":5,"geometry":{"type":"Point","coordinates":["101.529382","25.066356"]}},{"count":5,"geometry":{"type":"Point","coordinates":["100.223675","25.5969"]}},{"count":7,"geometry":{"type":"Point","coordinates":["98.589434","24.44124"]}},{"count":3,"geometry":{"type":"Point","coordinates":["99.713682","27.831029"]}},{"count":6,"geometry":{"type":"Point","coordinates":["103.384065","23.367718"]}},{"count":5,"geometry":{"type":"Point","coordinates":["100.229628","26.875351"]}},{"count":9,"geometry":{"type":"Point","coordinates":["100.092613","23.887806"]}},{"count":9,"geometry":{"type":"Point","coordinates":["98.859932","25.860677"]}},{"count":8,"geometry":{"type":"Point","coordinates":["100.980058","22.788778"]}},{"count":3,"geometry":{"type":"Point","coordinates":["103.782539","25.520758"]}},{"count":1,"geometry":{"type":"Point","coordinates":["103.725021","27.340633"]}},{"count":9,"geometry":{"type":"Point","coordinates":["104.089112","23.401781"]}},{"count":2,"geometry":{"type":"Point","coordinates":["100.803038","22.009433"]}},{"count":3,"geometry":{"type":"Point","coordinates":["102.545068","24.370447"]}},{"count":2,"geometry":{"type":"Point","coordinates":["120.219375","30.259244"]}},{"count":9,"geometry":{"type":"Point","coordinates":["120.137243","30.877925"]}},{"count":2,"geometry":{"type":"Point","coordinates":["120.760428","30.773992"]}},{"count":8,"geometry":{"type":"Point","coordinates":["119.652576","29.102899"]}},{"count":0,"geometry":{"type":"Point","coordinates":["119.929576","28.4563"]}},{"count":7,"geometry":{"type":"Point","coordinates":["121.579006","29.885259"]}},{"count":5,"geometry":{"type":"Point","coordinates":["118.875842","28.95691"]}},{"count":7,"geometry":{"type":"Point","coordinates":["120.592467","30.002365"]}},{"count":3,"geometry":{"type":"Point","coordinates":["121.440613","28.668283"]}},{"count":2,"geometry":{"type":"Point","coordinates":["120.690635","28.002838"]}},{"count":1,"geometry":{"type":"Point","coordinates":["122.169872","30.03601"]}}];
        
        var inmap = new inMaps.Map({
        id: "topMap",
        skin: "Blueness",
        center: [105.403119, 38.028658],
        zoom: {
            value: 5,
            show: true,
            max: 18,
            min: 5
        }
        });
        var overlay = new inMaps.HeatOverlay({
        style: {
            radius: 10, // 半径
            minScope: 0, // 最小区间,小于此区间的不显示
            maxScope: 1 // 最大区间,大于此区间的不显示
        }
        });
        inmap.add(overlay);
        overlay.setData(data);
        // console.log(overlay.setData(data));
    },
    //统计图结束^ 


    // 获取网站业务
    getDomainList(page){
        this.$http.get('ddosImitationIp/QueryAlldomain.do',{
            params:{
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
        if(this.operationObject == '' && name == 'source'){
            this.$Message.info('请选择需要关联的证书ID');
            return;
        }
        this.$http.get('ddosImitationIp/UpdateDomain.do',{
            params:{
                domain:this.businessSelect.domainname,
                source: name == 'ip' ? this.sourceip : this.businessSelect.sourceip,
                port:this.businessSelect.port,
                crtId:name == 'source' ?this.operationObject : this.businessSelect.crtId,
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
                }else{
                     this.$Message.success('源站ip修改成功');
                    this.showModal.changeIp = false;
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

        }})
    },

    addDomain(name){
        this.$refs[name].validate((valid) => {
        if (valid) {
            this.$http.get('ddosImitationIp/AddDomain.do',{
                params:{
                    packageId:this.addDomainList.attackMeal,
                    domain:this.addDomainList.domain,
                    source:this.addDomainList.ip,
                    crtId:'',
                    port:this.addDomainList.agreement,
                    http:1,//this.addDomainList.http.join(','),
                    https:1
                }
            }).then(res =>{
                if(res.status == 200 && res.data.status == 1){
                    this.getDomainList(1);
                }else{
                    this.$Message.info(res.data.message);
                }
            }).catch(err =>{})
        }})
    },

    queryDomain(){
        this.$http.get('ddosImitationIp/Querydomain.do',{
            params:{
                domain:this.domain
            }
        }).then(res => {
            if(res.status == 200 && res.data.status == 1){
                
            }else{
                this.$Message.info(res.data.message);
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

            }else{
                this.$Message.info(res.data.message);
            }
        }).catch(err => {

        })
        }})
    },
    queryCertificate(){
        this.$http.get('ddosImitationIp/QueryCertificate.do',{
            params:{
                crtName:this.crtName
            }
        }).then(res => {
            if(res.status == 200 && res.data.status ==1){
                 this.certificateData = [];
                  this.certificateData.push(res.data.result);
            }else{
                this.$Message.info(res.data.message);
            }
        }).catch(err =>{})
    },

    updateCertificate(){
        this.$http.get('ddosImitationIp/UpdateCertificate.do',{
            params:{
                crtId:this.certificateValidate.crtId,
                crtname:this.certificateValidate.name,
                crtRemark:this.certificateValidate.desc,
                crtDes:this.certificateValidate.file,
                keyDes:this.certificateValidate.secret,
                caDes:this.certificateValidate.ca,
                encryptionWay:this.certificateValidate.pawMode
            }
        }).then(res => {
            if(res.status == 1 && res.data.status == 1){
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
                    page:'1',
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

    // deleteForwardrule(){
    //     this.$http.get('ddosImitationIp/deleteforwardrule.do',{
    //         params:{
    //             Id:this.businessSelect.id
    //         }
    //     }).then(res => {
    //         if(res.status == 200 && res.data.status == 1){
    //             this.$Message.success('删除成功');
    //         }else{
    //             this.$Message.info(res.data.messae);
    //         }
    //     }).catch(err =>{})
    // }, 

    /**
     * 防护管理
     */
    getProtectCC(id,page){
        this.$http.get('ddosImitationIp/QueryAlldomain.do',{
            params:{
                packageId:id,
                page:'1',
                pageSize:'10'
            }
        }).then(res => {
            if(res.status == 200 && res.data.status == 1){
                this.ccProtectData = res.data.result;
                this.emptyLink = res.data.result[0].ddosprotect;
            }else{
                this.$Message.info(res.data.message);
            }
        }).catch(err => {})
    },

    updateL4DDoSConfig(val){
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
    },

    updateddoSConfig(){
        this.$http.get('ddosImitationIp/updateddoSConfig.do')
    },

    // 获取操作日志
    getLog(page){
        this.$http.get('ddosImitationIp/queryLog.do',{
            params:{
                page:page,
                pageSize:'10',
                packageName:this.operationObject,
                // startTime:this.logTime[0].format('yyyy-MM-dd hh:mm:ss') == undefined ?'':this.logTime[0].format('yyyy-MM-dd hh:mm:ss'),
                // endTime:this.logTime[1].format('yyyy-MM-dd hh:mm:ss')== undefined ?'':this.logTime[1].format('yyyy-MM-dd hh:mm:ss')
            }
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
    saveConfig() {
         this.$http.get('ddosImitationIp/updateddoSConfig.do',{params:{
             packageId:this.setMeal,
             domainName: this.ccProtectData[0].domainname,
             ccProtect: this.ccProtectData[0].ccprotect,
             protectType: this.ccProtectData[0].protecttype,
             blackList: this.blackName,
             whiteList: this.whiteName
         }}).then(res =>{
            if(res.status == 200 && res.data.status == 1){
                this.$Message.info(res.data.message);
            } else {
                this.$Message.info(res.data.message);
            }
         })
    }

  },
  computed:{
      renewDisabled(){
          if(this.overviewSelect.length == 0){
              return true;
          }else{
              return false;
          }
      }
  },
  watch:{
      'button1':{
          handler(){
              let list =[];
               this.overviewTableChange(list);
                
          },deep:true
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
  height: 92px;
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
</style>

