<template>
    <div id="background">
        <div id="wrapper">
            <span class="title">云安全 / DDoS高防IP / <span>业务管理</span></span>
             <div id="content">
                <div id="header">
                    <span id="title">DDoS高防IP</span>
                    <button id="refresh_button" @click="$router.go(0)" style="margin-top: 10px;">刷新</button>
                </div>
                 <Tabs type="card">
                    <TabPane label="概览">
                        
                       
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
                            <Table :columns="certificateList" :data="certificateData"></Table>
                            <div class="dp-page">
                                <span>总共{{certificateData.length}}个项目</span>
                                <Page :total="100" style="display:inline-block;vertical-align: middle;margin-left:20px;"></Page>
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
                                    <Option v-for="item in setMealList" :value="item.value" :key="item.value">{{ item.label }}</Option>
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
                    <TabPane label="操作日志">标签三的内容</TabPane>
                </Tabs>
             </div>
        </div>
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
export default {
  data() {
    return {
      // 弹窗
      showModal:{
        certificate:false,
        
      },  

      button1: "网站业务",
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
            {
                value:'套餐ID',
                label:'套餐ID'
            }
        ],
        protectSwicth:true,
        emptyLink:false,
        ccProtectList:[
            {
                type: 'expand',
                width: 50,
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
    };
  },
  methods:{
  
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
.dp-page{
    text-align:right;margin-top:20px;
  }
  .md-cer{
      overflow: auto;
  }
  .f-p{
    position: absolute;
    right: 11px;
    top: 53px;
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
      width:272px;
      height: 6px;
      background-color: #666666;
  }
    .dp-cc{
        margin-top: 18px;
    }
</style>

