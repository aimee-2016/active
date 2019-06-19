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
                                    <Button type="primary" style="margin-right:10px;">添加证书</Button>
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
                                    <Button type="primary" style="margin-right:10px;">添加规则</Button>
                                    <Button type="primary">删除</Button>
                                    <span class="dp-cn">CNAME：sectest564as65d4a65s4d5as4d5a6s4d6</span>
                                </div>
                                <div>
                                     <Select v-model="domain" style="width:100px">
                                        <Option v-for="item in domainList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                    </Select>
                                    <Input placeholder="请输入端口名称" style="width:180px;margin-right:10px;"></Input>
                                    <Button type="primary" style="width:84px;">查询</Button>
                                </div>
                            </div>
                            <Table :columns="certificateList" :data="certificateData"></Table>
                            <div class="dp-page">
                                <span>总共{{certificateData.length}}个项目</span>
                                <Page :total="100" style="display:inline-block;vertical-align: middle;margin-left:20px;"></Page>
                            </div>
                        </div>
                       
                    </TabPane>
                    <TabPane label="业务管理">标签二的内容</TabPane>
                    <TabPane label="防护管理">标签三的内容</TabPane>
                    <TabPane label="操作日志">标签三的内容</TabPane>
                </Tabs>
             </div>
        </div>
        <Modal :mask-closable="false">
            <p slot="header" class="modal-header-border">
                <span class="universal-modal-title">新增证书</span>
            </p>
            <div >

            </div>
        </Modal>
    </div>
</template>

<script>
export default {
  data() {
    return {
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
      ]  

    };
  }
};
</script>

<style lang="less" scoped>
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
</style>

