<template>
     <div id="background">
        <div id="wrapper">
            <span class="title">云安全 / DDoS高防IP / <span>业务管理</span></span>
             <div id="content">
                <div id="header">
                    <span id="title">添加转发规则</span>
                    <button id="refresh_button" @click="$router.go(0)" style="margin-top: 10px;">刷新</button>
                </div>
                <div style="width:900px; margin:0 auto;">
                    <Steps :current="current">
                        <Step title="填写转发规则信息"></Step>
                        <Step title="修改DNS解析"></Step>
                        <Step title="完成"></Step>
                    </Steps>
                 
                <div class="st-box" v-if="current == 0">
                    <Form style="width:430px;margin:0 auto;text-align:left;" ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="90">
                        <FormItem label="使用协议" prop="agreement">
                            <RadioGroup v-model="formValidate.agreement">
                                <Radio label="TCP">
                                    <span>TCP</span>
                                </Radio>
                                <Radio label="UDP" style="margin-left:43px;">
                                    <span>UDP</span>
                                </Radio>
                            </RadioGroup>
                        </FormItem>
                        <FormItem label="访问端口" prop="visitPort">
                            <Input v-model="formValidate.visitPort" placeholder="请输入端口号" style="width:300px;"></Input>
                            <Tooltip placement="right">
                                <div slot="content" style="width:222px;white-space: normal;">
                                    <p class="tp-po">指定接入新睿云DDoS高防IP使用的转发端口。 </p>
                                    <p class="tp-pt">说明：为了便于管理，一般建议与源站端口保持一致。</p>
                                </div>
                               <Icon type="ios-help-outline" color='#2A99F2' size='12px'></Icon>
                            </Tooltip>
                        </FormItem>
                        <FormItem label="回源端口" prop="returnPort">
                            <Input v-model="formValidate.returnPort" placeholder="请输入端口号" style="width:300px;"></Input>
                            <Tooltip placement="right">
                                <div slot="content" style="width:222px;white-space: normal;">
                                    <p class="tp-po">源站端口：指定源站使用的业务端口。</p>
                                </div>
                               <Icon type="ios-help-outline" color='#2A99F2' size='12px'></Icon>
                            </Tooltip>
                        </FormItem>
                        <FormItem label="回源负载均衡" prop="name">
                            <span>轮询模式</span>
                        </FormItem>
                        <FormItem label="源站IP/域名" prop="domain">
                            <Input v-model="formValidate.domain" placeholder="请填写源站服务器地址" style="width:300px;"></Input>
                            <Tooltip placement="right">
                                <div slot="content" style="width:222px;white-space: normal;">
                                    <p class="tp-po">源站IP/域名：填写源站服务器地址。</p>
                                </div>
                               <Icon type="ios-help-outline" color='#2A99F2' size='12px'></Icon>
                            </Tooltip>
                        </FormItem>
                    </Form>
                    <Button style="margin-right:10px;" @click="$router.push('DDoSIPBack')">返回</Button>
                    <Button type="primary" @click="addforwardrule('formValidate')">提交，查看下一步</Button>
                </div>

                <div class="st-box" v-if="current == 1">
                    <p>转发规则添加完成，您还需要将实际业务IP切换到转发规则对应的CNAME。 </p>
                    <p>CNAME：sectest564as65d4a65s4d5as4d5a6s4d6</p>
                    <p style="margin-bottom: 40px;">若您是在新睿云购买的域名，请前往<span style="color:#2A99F2;cursor:pointer;">域名解析</span></p>
                    <Table :columns="ruleList" :data="ruleData"></Table>
                    <div style="margin-top:40px;text-align:right;">
                        <Button style="margin-right:10px;" @click="current -= 1">上一步</Button>
                        <Button type="primary" @click="next">下一步</Button>
                    </div>
                </div>
                </div>
             </div>
        </div>
     </div>
</template>

<script>
export default {
    data(){
        return{
            current:0,
            formValidate:{
                agreement:'TCP',
                visitPort:'',
                returnPort:'',
                domain:''
            },
            ruleValidate:{
                visitPort:[{required: true, message: '请输入端口号', trigger: 'blur'}],
                domain:[{required: true, message: '请输入服务器地址', trigger: 'blur'}]
            },
            ruleList:[
                {
                    key:'域名',
                    title:'域名'
                },
                {
                    key:'端口',
                    title:'端口'
                },
                {
                    key:'acc',
                    title:'源站IP/域名'
                },
                {
                    key:'套餐信息',
                    title:'套餐信息'
                },
            ],
            ruleData:[
                {
                    域名:'11111111',
                    端口:'222222222',
                    acc:'3333333333',
                    套餐信息:'444444444'
                }
            ]
        }
    },
    methods:{
         next () {
                if (this.current == 2) {
                    this.current = 0;
                } else {
                    this.current += 1;
                }
            },
        getAllforwardrule(page){
            this.$http.get('ddosImitationIp/QueryAllforwardrule.do',{
                params:{
                    page:'1',
                    pageSize:'10',
                    packageUserId:''
                }
            }).then(res => {

            }).catch(err => {

            })
        },
        addforwardrule(name){
            this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$http.get('ddosImitationIp/addforwardrule.do',{
                            params:{
                                packageId:'',
                                accessProtocol:this.formValidate.agreement,
                                accessPort:this.formValidate.visitPort,
                                source:this.formValidate.domain,
                                sourcePort:this.formValidate.returnPort
                            }
                        }).then(res => {
                            if(res.status == 200 && res.data.status == 1){
                                this.current += 1;
                            }else{
                                this.$Message.info(res.data.message);
                            }
                        }).catch(err =>{})
                    }})
            
        }    
    },
    created(){
        this.getAllforwardrule(1);
    }
}
</script>

<style lang="less" scoped>
    .st-box{
        text-align: center;
        margin-top: 40px;
        >p:nth-child(2){
            font-weight: bold;
        }
        >p{
            font-size: 18px;
            color: #333333;
            line-height: 25px;
            
        }
    }
    .tp-po{
       color: #FFFFFF;
       line-height: 15px;
    }
    .tp-pt{
        color: #FF392A;
        line-height: 15px;
    }
</style>
