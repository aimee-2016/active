<template>
     <div id="background">
        <div id="wrapper">
            <span class="title">云安全 / DDoS高防IP / <span>业务管理</span></span>
             <div id="content">
                <div id="header">
                    <i class="back-btn" @click="$router.push('/ddosipback')">
                        <Icon type="chevron-left" style="font-size:12px;"></Icon>
                    </i>
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
                         <FormItem label="套餐选择" prop="attackMeal">
                            <Select v-model="formValidate.attackMeal" :disabled='disNo' style="width:300px;">
                                <Option
                                v-for="item in setMealList"
                                :value="item.packageid"
                                :key="item.packageid"
                                >{{ item.packageid }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="使用协议" prop="agreement">
                            <RadioGroup v-model="formValidate.agreement" >
                                <Radio label="TCP" :disabled='disNo'>
                                    <span>TCP</span>
                                </Radio>
                                <Radio label="UDP" style="margin-left:43px;" :disabled='disNo'>
                                    <span>UDP</span>
                                </Radio>
                            </RadioGroup>
                        </FormItem>
                        <FormItem label="访问端口" prop="visitPort">
                            <Input v-model="formValidate.visitPort" placeholder="请输入端口号" style="width:300px;" :disabled='disNo'></Input>
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
                    <Button style="margin-right:10px;" @click="clearD">取消</Button>
                    <Button type="primary" @click="addforwardrule('formValidate')">提交，查看下一步</Button>
                </div>

                <div class="st-box" v-if="current == 1">
                    <p>转发规则添加完成，您还需要将实际业务IP切换到转发规则对应的CNAME。 </p>
                    <p>CNAME：{{cname}}</p>
                    <p style="margin-bottom: 40px;">若您是在新睿云购买的域名，请前往<span style="color:#2A99F2;cursor:pointer;">域名解析</span></p>
                    <Table :columns="ruleList" :data="ruleData"></Table>
                    <div style="margin-top:40px;text-align:right;">
                        <Button style="margin-right:10px;" @click="current -= 1">上一步</Button>
                        <Button type="primary" :loading='loading' @click="next">下一步</Button>
                    </div>
                </div>
                <div class="st-box" v-if="current == 2">
                    <div>
                        <img src='../../assets/img/payresult/paySuccess.png'>
                        <p class='st-ok'>添加完成</p>
                        <p>由于解析需要一定时间，请根据列表“部署状态”查询转发规则添加结果</p>
                    </div>
                    <div style="margin-top:40px;">
                        <Button type="primary" :loading='loading' @click="$router.push('ddosipBack')">返回列表</Button>
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
            loading:false,
            formValidate:{
                agreement:'TCP',
                visitPort:'',
                returnPort:'',
                domain:'',
                attackMeal:'',
                id:''
            },
            ruleValidate:{
                visitPort:[{required: true, message: '请输入端口号', trigger: 'blur'}],
                domain:[{required: true, message: '请输入服务器地址', trigger: 'blur'}]
            },
            ruleList:[
                {
                    key:'domain',
                    title:'域名'
                },
                {
                    key:'visitPort',
                    title:'端口'
                },
                {
                    key:'returnPort',
                    title:'源站IP/域名'
                },
                {
                    key:'id',
                    title:'套餐信息'
                },
            ],
            ruleData:[            
            ],
            setMealList:[],
            disNo:false,
            cname:''
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
             //   获取用户套餐ID
        getId() {
            this.$http.get("ddosImitationIp/packageIdInfo.do", {}).then(res => {
                if (res.status == 200 && res.data.status == 1) {
                for (let i = 0; i < res.data.result.length; i++) {
                    for (let key in res.data.result[i]) {
                    this.setMealList.push({ packageid: key});
                    }
                }
                this.formValidate.attackMeal = this.setMealList[0].packageid;
                } else {
                this.$Message.info(res.data.message);
                }
            });
        },
        addforwardrule(){
            let url ='ddosImitationIp/addforwardrule.do',
                params ={
                    packageId:this.formValidate.attackMeal,
                    accessProtocol:this.formValidate.agreement,
                    accessPort:this.formValidate.visitPort,
                    source:this.formValidate.domain,
                    sourcePort:this.formValidate.returnPort,
                };
            if(sessionStorage.getItem('ruleList')!=undefined){
                url = 'ddosImitationIp/updateforwardrule.do';
                params = {
                    packageId:this.formValidate.attackMeal,
                    accessProtocol:this.formValidate.agreement,
                    accessPort:this.formValidate.visitPort,
                    source:this.formValidate.domain,
                    sourcePort:this.formValidate.returnPort,
                    id:this.formValidate.id
                }
            }
            this.$refs.formValidate.validate((valid) => {
                    if (valid) {
                        this.loading = true;
                        this.$http.get(url,{params}).then(res => {
                            if(res.status == 200 && res.data.status == 1){
                                this.loading = false;
                                this.$Message.info(res.data.message);
                                if(sessionStorage.getItem('ruleList')!=undefined){
                                    this.$router.push('ddosipBack');
                                    return;
                                }
                                this.ruleData.push(this.formValidate);
                                this.cname = res.data.CNAME;
                                this.current += 1;
                            }else{
                                this.$Message.info(res.data.message);
                                this.loading = false;
                            }
                        }).catch(err =>{})
                    }})
        },
        clearData(){
            for(let key in this.formValidate){
                if(key != 'agreement' && key != 'attackMeal'){
                    this.formValidate[key] = '';
                }
            }
        },
        clearD(){
            if(sessionStorage.getItem('ruleList')!=undefined){
                for(let key in this.formValidate){
                if(key != 'agreement' && key != 'attackMeal' && key != 'visitPort'){
                    this.formValidate[key] = '';
                }
            }
            }else{
               this.clearData(); 
            }
        }
    },
    created(){
        this.getId();
        if(sessionStorage.getItem('ruleList')!=undefined){
            this.disNo = true;
            let list = JSON.parse(sessionStorage.getItem('ruleList'));
            this.formValidate.attackMeal = list.packageid;
            this.formValidate.agreement = list.accessprotocol;
            this.formValidate.visitPort = list.accessport;
            this.formValidate.returnPort = list.sourceport;
            this.formValidate.id = list.id;
            this.formValidate.domain = list.source;
        }
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
    .st-ok{
        font-size:18px;
        color:#333333;
        font-weight:Bold;
        margin:24px 0 18px 0;
    }
    .back-btn {
  margin-top: 8px;
  display: inline-block;
  width: 25px;
  height: 25px;
  border-radius: 4px;
  border: 1px solid rgba(225, 225, 225, 1);
  color: #999999;
  text-align: center;
  cursor:pointer;
  line-height: 24px;
}
</style>
