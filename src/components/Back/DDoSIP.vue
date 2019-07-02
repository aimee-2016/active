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
                            <RadioGroup v-model="overviewRadio" type="button">
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
                                <Table no-data-text='暂无攻击数据' :columns="overviewList" :data="overviewData" @on-selection-change='overviewTableChange'></Table>
                                <div class="dp-page">
                                    <Page :total="100" style="display:inline-block;vertical-align: middle;margin-left:20px;" show-sizer :page-size-opts=[10,20,50,100]></Page>
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
                                <Table no-data-text='暂无攻击数据' :columns="overviewList" :data="overviewData" @on-selection-change='overviewTableChange'></Table>
                                <div class="dp-page">
                                    <Page :total="100" style="display:inline-block;vertical-align: middle;margin-left:20px;" show-sizer :page-size-opts=[10,20,50,100]></Page>
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
                                    <Button type="primary" style="margin-right:10px;">添加域名</Button>
                                    <Button type="primary">删除</Button>
                                </div>
                                <div>
                                    <Select v-model="domain" style="width:100px">
                                        <Option v-for="item in domainList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                    </Select>
                                    <Input placeholder="请输入域名" style="width:180px;margin:0 10px;"></Input>
                                    <Button type="primary" style="width:84px;">查询</Button>
                                </div>
                            </div>
                            <div class="selectMark">
                                    <img src="../../assets/img/host/h-icon10.png"/>
                                    <span>共 {{ businessData.length }} 项 | 已选择 <span style="color:#FF624B;">{{ overviewSelect.length }} </span>项</span><span style="margin-left:10px;">总价:</span><span style="color:#FF624B;">￥0.00</span>
                            </div>
                            <Table :columns="businessList" :data="businessData"></Table>
                            <div class="dp-page">
                                <span>总共{{businessData.length}}个项目</span>
                                <Page :total="100"  style="display:inline-block;vertical-align: middle;margin-left:20px;"></Page>
                            </div>
                           
                        </div>
                        <!--     证书管理         -->
                        <div v-if="button1 == '证书管理'">
                            <div class="dp-row">
                                <div>
                                    <Button type="primary" style="margin-right:10px;" @click="showModal. certificate = true">添加证书</Button>
                                    <Button type="primary">删除</Button>
                                </div>
                                <div>
                                    <Input placeholder="证书" style="width:180px;margin-right:10px;"></Input>
                                    <Button type="primary" style="width:84px;">查询</Button>
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
                                    <Button type="primary">删除</Button>
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
                            <Table :columns="ruleList" :data="ruleData"></Table>
                            <div class="dp-page">
                                <span>总共{{ruleData.length}}个项目</span>
                                <Page :total="100" style="display:inline-block;vertical-align: middle;margin-left:20px;"></Page>
                            </div>
                        </div>
                    </TabPane>
                    <TabPane label="防护管理">
                        <div class="dp-row">
                            <div>
                                <span style="font-size:14px;color:#333333;">套餐选择</span>
                                <Select v-model="setMeal" style="width:230px">
                                    <Option v-for="item in setMealList" :value="item.packageid" :key="item.packageid">{{ item.packageid }}</Option>
                                </Select>
                                <Button>保存修改</Button>
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
                                            <i-switch v-model="emptyLink"></i-switch>
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
                                <Page :total="100" style="display:inline-block;vertical-align: middle;margin-left:20px;"></Page>
                            </div>
                        </div>    
                    </TabPane>
                    <TabPane label="操作日志">
                        <div style="margin-bottom:21px;">
                            <span>操作时间</span>
                            <DatePicker :transfer='true' type="daterange"  placement="bottom-end" placeholder="Select date" style="width: 200px;margin:0 20px;"></DatePicker>
                            <span>操作对象</span>
                            <Select v-model="operationObject" style="width:230px;margin:0 22px;">
                                <Option v-for="item in operationList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                            <Button type="primary">查询</Button>    
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
             <div class="dp-er">
                 <Icon type="close-circled" color='#ED4014' size='12px'></Icon>
                 <span style="margin-left:4px;">错误原因</span>
             </div>
             <ul>
                 <li style="display:flex;">
                     <div>
                        <p>续费套餐ID</p>
                     </div>
                     <div>
                        <p>DMS-50GB 5656</p> 
                     </div>
                 </li>
                 <li>
                     <div>
                        <p>购买时长</p>
                     </div>
                     <div>
                        <div class="dp-ti" :class="durationIndex == index?'dp-tis':''" v-for="(item,index) in durationList" :key="item.value" @click="durationIndex = index">{{item.label}}</div> 
                     </div>
                 </li>
                 <li>
                     <div>
                        <p>续费到期时间</p>
                     </div>
                     <div>
                        <p>2019-6-23 12：56</p> 
                     </div>
                 </li>
             </ul>
         </Modal>   

        <!-- 新增业务证书  -->
        <Modal :mask-closable="false" v-model="showModal.certificate">
            <p slot="header" class="modal-header-border">
                <span class="universal-modal-title">新增证书</span>
            </p>
            <div class="md-cer">
                 <Form ref="certificateValidate" :model="certificateValidate" :rules="certificateRule" :label-width="80">
                    <FormItem label="证书名称" prop="name">
                        <Input v-model="certificateValidate.name" placeholder="Enter your name"></Input>
                    </FormItem>
                    <FormItem label="证书文件" prop="file">
                        <Input type="textarea" v-model="certificateValidate.file" placeholder="Enter your name">
                        </Input>
                        <span class="f-p">0/500</span>
                    </FormItem>
                    <FormItem label="秘钥内容" prop="secret">
                        <Input type="textarea" v-model="certificateValidate.secret" placeholder="Enter your name"></Input>
                        <span class="f-p">0/500</span>
                    </FormItem>
                    <FormItem label="CA内容" prop="ca">
                        <Input type="textarea" v-model="certificateValidate.ca" placeholder="Enter your name"></Input>
                        <span class="f-p">0/500</span>
                    </FormItem>
                    <FormItem label="加密方式" prop="name">
                        <Input v-model="certificateValidate.name" placeholder="Enter your name"></Input>
                    </FormItem>
                    <FormItem label="证书备注" prop="name">
                        <Input v-model="certificateValidate.name" placeholder="Enter your name"></Input>
                    </FormItem>
                 </Form>   
            </div>
            <div slot="footer" class="modal-footer-border">
                <Button type="ghost" @click="showModal.certificate = false">取消</Button>
                <Button type="primary" >确定</Button>
            </div>
        </Modal>

    </div>
</template>

<script>
import expandRow from './DDosExpandRow.vue';
import hightIp from '@/echarts/hightIp';
const dIp  = JSON.stringify(hightIp);
export default {
components: { expandRow },
  data() {
    return {
      // 弹窗
      showModal:{
        certificate:false,
        meal:false,
      },  
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
        price:0,
        overviewPage:1,
        renewDisabled:true,
        pageSize:10,
        attackMeal:'',
        // 统计时间
        statisticsTime:'',


      // 证书管理
      certificateKyeHide: true,
      certificateList: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          key: "证书名称",
          title: "证书名称"
        },
        {
          key: "证书备注",
          title: "证书备注"
        },
        {
          key: "证书crt内容",
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
                h("p", {}, params.row.证书key内容),
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
          key: "证书ca内容",
          title: "证书ca内容"
        },
        {
          key: "当前证书使用域名",
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
                }
              },
              "修改"
            );
          }
        }
      ],
      certificateData: [
        {
          证书名称: "ssss",
          证书备注: "ssss",
          证书crt内容: "ssss",
          证书key内容: "ssss",
          证书ca内容: "ssss",
          当前证书使用域名: "ssss"
        }
      ],
      certificateValidate:{
          name:'',
          file:'',
          secret:'',
          ca:'',

      },
      certificateRule:{
          name:[{required: true, message: '请输入证书名称', trigger: 'blur'}],
          file:[{required: true, message: '请输入证书文件   ', trigger: 'blur'}],
          secret:[{required: true, message: '请输入秘钥内容', trigger: 'blur'}],
          ca:[{required: true, message: '请输入CA内容', trigger: 'blur'}]
      },

      // 网站业务
      domainList:[
          {
              value:'域名',
              label:'域名'
          }
      ],
      domain:'域名',
      businessList:[
          {
              type: "selection",
              width: 60,
              align: "center"
           },
          {
              title:'域名',
              key:'域名'
          },
          {
              title:'域名信息',
              key:'域名信息'
          },
          {
              title:'端口',
              key:'端口'
          },
          {
              title:'源站IP/域名',
              render:(h,params)=>{
                  return h('div',[
                      h('span',{},params.row.accct),
                      h('span',{
                          style:{
                              cursor:'pointer',
                              color:'#2A99F2',
                              marginLeft:'19px'
                          }
                      },'换源')
                  ])
              }
          },
          {
              title:'套餐信息',
              key:'套餐信息'
          },
          {
              title:'业务状态',
              key:'业务状态'
          },
          {
              title:'部署状态',
              key:'部署状态'
          },
          {
              title:'防护状态',
              key:'防护状态'
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
                    }
                },
                "修改"
                );
            }
          },
      ],
      businessData:[
          {
              域名:'aaaa',
              域名信息:'aaaa',
              端口:'80',
              accct:'dddd',
              套餐信息:'aaaa',
              业务状态:'aaaa',
              部署状态:'aaaa',
              防护状态:'aaa',
          }
      ],
      
      // 非网站业务
       ruleList:[
           {
              type: "selection",
              width: 60,
              align: "center"
           },
           {
               key:'协议',
               title:'协议'
           },
           {
               key:'访问端口',
               title:'访问端口'
           },
           {
               key:'源站端口',
               title:'源站端口'
           },
           {
               key:'回源负载均衡',
               title:'回源负载均衡'
           },
           {
               key:'acc',
               title:'源站IP/域名'
           },
           {
               key:'部署状态',
               title:'部署状态'
           },
           {
               key:'防护状态',
               title:'防护状态'
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
                           }
                       },'删除'),
                   ])
               }
           },
       ],
       ruleData:[
           {
               协议:'tcp',
               访问端口:'0.0.0.0',
               源站端口:'0.0.0.0',
               回源负载均衡:'轮询模式',
               acc:'192.168.0.0',
               部署状态:'待部署',
               防护状态:'DDoS防护：开',
           }
       ],
       visitPort:'访问端口',
       visitPortSelect:[
           {
               value:'访问端口',
               label:'访问'
           }
       ],

    //    防护管理
        setMeal:'套餐ID',
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
                        }
                    })
                }
            },
            {
                key:'域名',
                title:'域名'
            },
            {
                key:'acc',
                title:'源站IP/域名'
            },
            {
                key:'防护状态',
                title:'防护状态'
            },
            {
                key:'防护模式',
                title:'防护模式'
            },
            {
                key:'黑白名单',
                title:'黑白名单',
                render:(h,params)=>{
                    return h('span',{
                        style:{
                            color:'#4297F2',
                            cursor:'pointer'
                        }
                    },'添加')
                }
            }
        ],
        ccProtectData:[
            {
                域名:'test.com',
                acc:'1.1.1.1',

            }
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
                 key:'packageUserName',
                 title:'操作对象'
             },
             {
                 key:'操作时间',
                 title:'操作时间'
             },
             {
                 key:'isDisplay',
                 title:'操作结果'
             },
             {
                 key:'operatorDes',
                 title:'行为描述'
             },
             {
                 key:'关联资源',
                 title:'关联资源'
             },
         ],
         journalData:[
             {
                 操作对象:'主机',
                 操作时间:'2019-1-1',
                 操作结果:'成功',
                 行为描述:'删除主机',
                 关联资源:'----'
             }
         ]
    };
  },
  created(){
      this.getDdosOverview(1);
      this.getDomainList();
      this.getCertificate(1);

      this.getLog(1);
      this.getId();
  },
  methods:{

    //   获取用户套餐ID
    getId(){
        this.$http.get('ddosImitationIp/packageIdInfo.do',{}).then(res=>{
            if(res.status == 200 && res.data.status == 1){
                this.setMealList = res.data.result;
            }else{
                this.setMealList = res.data.result;
                this.$Message.info(res.data.message);
            }
        })
    },

    //   套餐表格选项切换
    overviewTableChange(list){
        this.price = 0;
        this.overviewSelect = list;
        this.renewDisabled = false;
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

    // DDOS清洗流量
    getMitigatedBandwidth(){
        this.$http.get('ddosImitationIp/QueryMitigatedBandwidth.do',{
            params:{
                packageId:this.attackMeal,
                startdate:this.statisticsTime[0].format('yyyy-MM-dd hh:mm:ss'),
                enddate:this.statisticsTime[1].format('yyyy-MM-dd hh:mm:ss')
            }
        }).then(res => {
            
        })
    },

    // 获取网站业务
    getDomainList(){
        this.$http.get('ddosImitationIp/QueryAlldomain.do',{
            params:{
                page:'1',
                pageSize:'10'
            }
        }).then(res => {
            if(res.status == 200 && res.data.status == 1){
                this.domainData = res.data.result;
            }else{
                  this.$Message.info(res.data.message);
            }
        })
    },

    // 获取证书
    getCertificate(page){
        this.$http.get('ddosImitationIp/QueryAllCertificate.do',{
            params:{
                page:page,
                pageSize:'10',
            }
        }).then(res =>{
            if(res.status == 200 && res.data.status == 1){
                this.ccProtectData = res.data.result;
            }else{
                  this.$Message.info(res.data.message);
            }
        }).catch(err =>{})
    },

    // 获取操作日志
    getLog(page){
        this.$http.get('ddosImitationIp/queryLog.do',{
            params:{
                page:'1',
                pageSize:'10'
            }
        }).then(res =>{
            if(res.status == 200 && res.data.status == 1){
                this.journalData = res.data.result;
            }else{
                  this.$Message.info(res.data.message);
            }
        })
    }

  },
  computed:{
  }
};
</script>

<style lang="less" scoped>
 .ivu-input-wrapper textarea.ivu-input{
          resize: none;
  }
  .ivu-switch-checked{
      border-color: #19BE6A;
      background-color: #19BE6A;
  }
  .ivu-switch-checked:after {
    left: 22px;
  }
  .ivu-switch:after{
    width: 16px;
    height: 16px
  }
  .ivu-switch{
      width: 40px;
      height: 20px;
  }
   .ivu-table-tbody > td.ivu-table-expanded-cell{
        padding: 20px 20px;
    }
.dp-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  .dp-cn{
      margin-left: 40px;
      color: #333333;
      font-weight:bold;
  }
}
.dp-bt{
    margin-top: 10px;
    font-size: 18px;
}
.dp-page{
    text-align:right;margin-top:20px;
  }
  .md-cer{
      overflow: auto;
  }
  .f-p{
    position: absolute;
    right: 11px;
    top: 30px;
    color: #B2B2B2;
  }
  .dp-box{
      padding-bottom: 20px;
      border-bottom:1px solid rgba(233,233,233,1);
  }
  .dp-grad{
      height:40px;
      background:linear-gradient(270deg,rgba(42,153,242,0) 4%,rgba(42,153,242,0.34) 100%,rgba(42,153,242,0.30) 27%);
      line-height: 40px;
      font-size: 14px;
      color: #666666;
  }

  .b-font{
      font-size: 18px;
      color: #333333;
      font-weight: bold;
      margin:0 10px;
  }

  .o-font{
      color: #ED4014;
  }
  .l-font{
      color: #2A99F2;
      cursor: pointer;
      font-size: 14px;
  }
  .dp-more{
      width: 380px;
  }
  .dp-fh{
        width:272px;
        height:92px;
        background:rgba(255,255,255,1);
        box-shadow:0px 1px 9px -2px rgba(0,0,0,0.2);
        margin-right: 10px;
        position: relative;
        >div{
            margin: 32px 0 10px 20px;
        }
        .fh-sp{
            color:#333333;font-size:14px;margin-right:10px;
        }
  }
  .dp-fh::before{
      content: '';
      position: absolute;
      width:inherit;
      height: 6px;
      background-color: #666666;
  }
    .dp-cc{
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
  .dp-er{
      height: 32px;
      line-height: 32px;
      padding:0 20px;
      border:1px solid #ED4014;
      border-radius: 4px;
      background-color:rgba(237, 64, 20, 0.08);
  }
  .dp-ti{
      width: 61px;
      height: 32px;
      line-height: 32px;
      text-align: center;
      border:1px solid #E1E1E1;
      display: inline-block;
      margin-bottom: 10px;
      cursor: pointer;
  }
  .dp-ds{
    height:48px;
    background:rgba(245,245,245,1);
    color: #666666;
    padding-left: 21px;
    margin-bottom: 20px;
    >div{
        display: inline-block;
        height: inherit;
        line-height: 48px;
    }
  }
  .text-box{
  border:1px solid #2A99F2;
  background-color: RGBA(42, 153, 242, 0.1);
  padding: 7px 10px;
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  border-radius: 4px;
  font-size: 14px;
  color: #666666;
  margin-bottom: 20px;
}
.dp-tis{
    color: #FFFFFF;
    background-color: #4297F2;
    border: 1px solid #4297F2;
}
</style>

