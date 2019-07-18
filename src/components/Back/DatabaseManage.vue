<template>
  <div id="background">
    <div id="wrapper">
      <span class="title">云数据库 /
         <span>云数据库实例 / </span>
        <span>管理</span>
      </span>
      <Alert type="warning" show-icon style="margin-bottom:10px" v-if="!auth">您尚未进行实名认证，只有认证用户才能对外提供服务，
        <router-link to="/userCenter">立即认证</router-link>
      </Alert>
      <div class="host-config">
        <div class="config-top">
          <p class="title"><img @click="$router.push('cloudDatabase')" src="../../assets/img/host/h-icon9.png" alt="back to hostList"/> 名称：{{ hostInfo.computername}}
            <!-- <img class="last" @click="renameForm.hostName = '',showModal.rename = true" src="../../assets/img/host/h-icon11.png" alt="modification computerName"/> -->
            <button @click="$router.go(0)">刷新</button>
            <button style="margin-right: 10px;background: #2A99F2;color: #FFF" @click="linkHost" v-if="hostInfo.computerStatus == 1">连接主机</button>
          </p>
          <p>{{ hostInfo.cpuNum }}CPU，{{ hostInfo.memory}}G menory内存，{{ hostInfo.disksize}}G硬盘 | {{ hostInfo.zonename}} <span
            @click="hostUpgrade">[升级]</span>
          </p>
        </div>
        <div class="config-type">
          <ul v-for="item in configTypes" :class="{selected: configType == item}" @click="changeTabs(item)">{{ item }}</ul>
        </div>
      </div>
      <div class="config-info">
        <div class="tab-1" v-show="configType == '基础信息' ">
         <dl>
           <dt>数据库信息</dt>
           <dd>
             <ul>
               <li>
                 <h4>数据库版本</h4>
                 <div>{{hostInfo.templatename}}</div>
               </li>
               <li>
                 <h4>实例类型</h4>
                 <div>单机
                   <!-- <span>[升级主备]</span> -->
                 </div>
               </li>
               <li>
                 <h4>性能规格</h4>
                 <div>{{ hostInfo.cpuNum }}CPU,{{ hostInfo.memory}}G menory内存
                   <span @click="hostUpgrade">[规格升级]</span>
                 </div>
               </li>
             </ul>
             <ul>
               <li>
                 <h4>登陆密码</h4>
                 <div><span :class="[isActive ? 'send' : 'nosend']" @click="lookPassword()">{{codePlaceholder}}</span></div>
               </li>
               <li>
                 <h4>管理员账户名</h4>
                 <div>{{hostInfo.loginname}}</div>
               </li>
               <li>
                 <h4>时区</h4>
                 <div>UTC</div>
               </li>
             </ul>
           </dd>
         </dl>
         <dl>
           <dt>连接信息</dt>
           <dd>
             <ul>
               <li>
                 <h4>内网地址</h4>
                 <div>{{hostInfo.privateip}}
                   <span @click="toVpcMannage">[修改内网地址]</span>
                 </div>

               </li>
               <li>
                 <h4>数据库端口</h4>
                 <div>{{hostInfo.dbPort}}
                   <span @click="portModify">[修改端口]</span>
                 </div>
               </li>
               <li>
                 <h4>建议最大连接数</h4>
                 <div>200
                 </div>
               </li>
             </ul>
             <ul>
               <li>
                 <h4>远程连接</h4>
                 <div>{{hostInfo.publicip?hostInfo.publicip:'---'}}
                   <span v-if="hostInfo.publicip" @click="showModal.unbindIP=true" >[解绑公网IP]</span>
                   <span v-else @click="bindIP">[绑定公网IP]</span>
                 </div>
               </li>
               <li>
                 <h4>所属VPC</h4>
                 <div>
                   <span @click="toVpcMannage">{{hostInfo.vpcname}}</span>
                </div>
               </li>
               <!-- <li>
                 <h4>防火墙</h4>
                 <div>默认防火墙</div>
               </li> -->
             </ul>
           </dd>
         </dl>
         <dl>
           <dt>存储信息</dt>
           <dd>
             <ul>
               <li>
                 <h4>存储空间用量</h4>
                 <div>{{hostInfo.disksize+'GB/'+hostInfo.rootdisksize+'GB'}}
                   <span @click="showModal.dilatation=true">[扩容]</span>
                 </div>
               </li>
             </ul>
           </dd>
         </dl>
         <dl>
           <dt>计费信息</dt>
           <dd>
             <ul>
               <li>
                 <h4>计费类型</h4>
                 <div>{{hostInfo.caseType == 1?'包年':(hostInfo.caseType == 2?'包月':'实时')}}</div>
               </li>
               <li>
                 <h4>订单</h4>
                 <div>
                   <span @click="toOrderPage">{{hostInfo.ordernumber}}</span>
                 </div>
               </li>
               <li>
                 <h4>创建时间/到期时间</h4>
                 <div>{{hostInfo.createtime+'/'+hostInfo.endtime}}
                 </div>
               </li>
             </ul>
           </dd>
         </dl>
        </div>
        <div class="tab-2" v-show="configType == '主机监控'">
          <div class="item" v-for="(item,index) in tab2.monitoringList">
            <div class="item-title">
              <span>{{ item.title}}</span>
              <span>{{  tab2.currentData }}</span>
            </div>
            <div class="item-type">
              <Radio-group v-model="item.type" type="button" @on-change="changeMonitorDate(index)">
                <Radio label="近一天"></Radio>
                <Radio label="最近7天"></Radio>
                <Radio label="最近30天"></Radio>
              </Radio-group>
              <Radio-group v-model="item.showType" type="button" @on-change="changeMonitorShowType(index)" style="float:right">
                <Radio label="折线"></Radio>
                <Radio label="柱状图"></Radio>
              </Radio-group>
            </div>
            <chart :options="item.chart" style="width:100%;height:80%;"></chart>
          </div>
        </div>
        <div class="tab-3" v-show="configType == '修改密码'">
          <div class="hide-star-symbol universal-modal-label-14px">
                <label style="font-size:16px;display: block;padding-bottom: 12px;border-bottom: 1px solid #e9e9e9;">重置数据库密码</label>
                <Form ref="resetPasswordForm" :model="resetPasswordForm" label-position="left" :label-width="100"
                      style="margin-top:20px;"
                      :rules="resetRuleValidate">
                  <Form-item label="请输入旧密码" prop="oldPassword">
                    <Input v-model="resetPasswordForm.oldPassword" placeholder="请输入旧密码" type="password"
                           style="width:250px;"></Input>
                  </Form-item>
                  <Form-item label="请输入新密码" prop="newPassword">
                    <Input v-model="resetPasswordForm.newPassword" placeholder="请输入至少8位包含大小写与数字的密码" type="password" 
                    @on-focus="passwordForm.passwordHint = true" @on-blur="passwordForm.passwordHint = false"
                           style="width:250px;"></Input>
                    <div class="popTip" v-show="passwordForm.passwordHint">
                      <div><i :class="{reach: passwordForm.secondDegree }"></i>
                        <p>不能输入连续6位数字或字母，如123456aA</p></div>
                      <div><i :class="{reach: passwordForm.firstDegree }"></i>
                        <p>长度8~30位，推荐使用12位以上的密码</p></div>
                      <div><i :class="{reach: passwordForm.thirdDegree }"></i>
                        <p>至少包含：小写字母，大写字母，数字</p></div>
                      <div><p style="color:rgba(102,102,102,1);">可用特殊符号：~:，*_</p></div>
                    </div>
                  </Form-item>
                  <Form-item label="请确认新密码" prop="confirmPassword">
                    <Input v-model="resetPasswordForm.confirmPassword" placeholder="请确认新密码" type="password"
                            @on-focus="passwordFormTwo.passwordHint = true" @on-blur="passwordFormTwo.passwordHint = false"
                           style="width:250px;"></Input>
                           <!-- <Input v-model="password" placeholder="请输入至少8位包含大小写与数字的密码"
                       style="width: 300px" @on-change="passwordWarning=''"  ></Input> -->
                    <div class="popTip" v-show="passwordFormTwo.passwordHint">
                      <div><i :class="{reach: passwordFormTwo.secondDegree }"></i>
                        <p>不能输入连续6位数字或字母，如123456aA</p></div>
                      <div><i :class="{reach: passwordFormTwo.firstDegree }"></i>
                        <p>长度8~30位，推荐使用12位以上的密码</p></div>
                      <div><i :class="{reach: passwordFormTwo.thirdDegree }"></i>
                        <p>至少包含：小写字母，大写字母，数字</p></div>
                      <div><p style="color:rgba(102,102,102,1);">可用特殊符号：~:，*_</p></div>
                    </div>
                  </Form-item>
                  <Form-item>
                    <Button type="primary" size="small" style="padding: 5px 15px;" @click="resetConfirm('resetPasswordForm')">
                      {{resetPasswordForm.buttonMessage}}
                    </Button>
                  </Form-item>
                </Form>
              </div>
        </div>
        <div class="tab-5" v-show="configType == '操作日志'">
          <div class="title">
            <RadioGroup v-model="tab5.timeHorizon" type="button" @on-change="logToggle">
              <Radio label="近一天"></Radio>
              <Radio label="近一周"></Radio>
              <Radio label="近一月"></Radio>
            </RadioGroup>
            <Input v-model="tab5.searchName" style="width: 25%" placeholder="请输入搜索的关键字">
            <span slot="prepend">操作名称</span>
            <Button slot="append" icon="ios-search" @click="getHostLog"></Button>
            </Input>
          </div>
          <Table :columns="tab5.logColumns" :data="tab5.logData"></Table>
          <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
              <Page :total="tab5.logPages" :current="tab5.currentPage" :page-size="tab5.pageSize" @on-change="changeLogPage"></Page>
            </div>
          </div>
        </div>
      </div>
    </div>
     <!-- 查看密码弹窗 -->
      <Modal width="550" v-model="showModal.lookPassword" :scrollable="true" class="lookPassword">
        <div slot="header" class="modal-header-border">
          <span class="universal-modal-title">查看登录密码</span>
        </div>
        <div>
          <div class="universal-modal-content-flex">
            <Form :model="lookPasswordForm" ref="lookPasswordForm" :rules="lookPasswordFormRule" @submit.native.prevent>
              <FormItem label="请输入控制台登录密码" prop="input">
                <Input v-model="lookPasswordForm.input" placeholder="请输入控制台登录密码" type="password"></Input>
              </FormItem>
              <!--<input type="text" hidden>-->
            </Form>
          </div>
          <div style="display:flex;">
            <p style=" font-size: 14px;line-height: 22px;">密码接收渠道</p>
            <Checkbox v-model="lookPasswordForm.isemailalarmSec" size="large"
                      style="margin-left: 20px;font-size: 12px;">邮箱
            </Checkbox>
            <Checkbox v-model="lookPasswordForm.issmsalarmSec" size="large" style="margin-left: 20px;font-size: 12px;">
              短信
            </Checkbox>
          </div>
        </div>
        <div slot="footer" class="modal-footer-border">
          <Button type="ghost" @click="showModal.lookPassword=false">取消</Button>
          <Button type="primary" @click="lookPasswordSubm('lookPasswordForm')"
                  :disabled="!(lookPasswordForm.isemailalarmSec || lookPasswordForm.issmsalarmSec)">确定
          </Button>
        </div>
      </Modal>
      <!-- 修改端口模态框 -->
      <Modal v-model="showModal.portModify" width="550" :scrollable="true" >
        <p slot="header" class="modal-header-border">
          <span class="universal-modal-title">修改端口</span>
        </p>
        <div class="universal-modal-content-flex">
          <Form :model="portModifyForm" :rules="portModifyRuleValidate" ref="portModifyForm">
            <Form-item label="当前端口">
              <Input v-model="portModifyForm.currentPorts" :readonly="true"></Input>
            </Form-item>
            <Form-item label="修改端口" prop="newPorts">
              <Input v-model="portModifyForm.newPorts" :maxlength="8"></Input>
            </Form-item>
          </Form>
        </div>
        <div slot="footer" class="modal-footer-border">
          <Button type="ghost" @click="showModal.portModify = false">取消</Button>
          <Button type="primary" @click="portModify_ok('portModifyForm')">确认</Button>
        </div>
      </Modal>
     <!-- 云数据库扩容弹窗 -->
    <Modal v-model="showModal.dilatation" width="590" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">调整容量</span>
      </p>
      <div class="universal-modal-content-flex">
        <Form :model="dilatationForm">
          <Form-item label="扩容后容量" style="width:100%;user-select: none">
            <i-slider
              v-model="dilatationForm.databaseSize"
              unit="G"
              :min="dilatationForm.minDatabaseSize"
              :max="1000"
              :step="10"
              :points="[250,500]"
              style="width:300px;vertical-align: middle;"
            ></i-slider>
            <InputNumber
              :max="1000"
              :min="dilatationForm.minDatabaseSize"
              v-model="dilatationForm.databaseSize"
              :step="10"
              :editable="false"
              style="margin-left: 20px"
              :precision="0"
            ></InputNumber>
            <span style="margin-left: 10px">GB</span>
          </Form-item>
        </Form>
      </div>
      <div slot="footer" class="modal-footer-border">
        <div style="font-size:16px;float:left">
          资费
          <span style="color: #2b85e4; text-indent:4px;display:inline-block;">
            <span style="font-size:24px;">￥{{dilatationCost}}</span>
          </span>
        </div>
        <Button type="ghost" @click="showModal.dilatation = false">取消</Button>
        <Button type="primary" @click="dilatationok" :disabled="dilatationCost=='--'">确认调整</Button>
      </div>
    </Modal>
     <!-- 绑定公网IP -->
    <Modal v-model="showModal.bindIP" width="590" :scrollable="true">
      <div slot="header" class="modal-header-border">
        <span class="universal-modal-title">绑定IP</span>
      </div>
      <div class="universal-modal-content-flex">
        <Form :model="bindForm" ref="bindForm" :rules="bindFormRule">
          <Form-item label="选择弹性IP" prop="publicIP">
            <Select v-model="bindForm.publicIP" placeholder="请选择">
              <Option
                v-for="(item,index) in publicIPList"
                :key="index"
                :value="item.publicipid"
              >{{item.publicip}}</Option>
            </Select>
            <span style="color:#2A99F2;font-size:14px;position:absolute;top:4px;right:-110px;">
              <span style="font-weight:800;font-size:20px;">+</span>
              <span style="cursor:pointer;" @click="$router.push('/buy/elasticip/')">购买弹性IP</span>
            </span>
          </Form-item>
        </Form>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="ghost" @click="showModal.bindIP = false">取消</Button>
        <Button type="primary" @click="bindIpSubmit('bindForm')">确定</Button>
      </div>
    </Modal>
    <!-- 绑定ip时，没有公网ip提示 -->
    <Modal v-model="showModal.publicIPHint" :scrollable="true" :closable="false" :width="390">
      <p slot="header" class="modal-header-border">
        <Icon type="android-alert" class="yellow f24 mr10" style="font-size: 20px"></Icon>
        <span class="universal-modal-title">提示信息</span>
      </p>
      <div class="modal-content-s">
        <div>
          <p class="lh24">您还未拥有剩余公网IP，请先创建公网IP。</p>
        </div>
      </div>
      <p slot="footer" class="modal-footer-s">
        <Button @click="showModal.publicIPHint = false">取消</Button>
        <Button type="primary" @click="$router.push('/buy/elasticip/')">创建公网IP</Button>
      </p>
    </Modal>
    <!-- 解绑公网ip确认框 -->
    <Modal v-model="showModal.unbindIP" :scrollable="true" :closable="false" :width="390">
      <p slot="header" class="modal-header-border">
        <Icon type="android-alert" class="yellow f24 mr10" style="font-size: 20px"></Icon>
        <span class="universal-modal-title">解绑IP</span>
      </p>
      <div class="modal-content-s">
        <div>
          <p class="lh24">
            您正在为
            <span style="color:rgb(42, 153, 242);">{{this.hostInfo.computername}}</span>解绑公网IP,解绑之后您将不能通过公网访问该数据库，确认解绑？
          </p>
        </div>
      </div>
      <p slot="footer" class="modal-footer-s">
        <Button @click="showModal.unbindIP = false">取消</Button>
        <Button type="primary" @click="unbind">确认解绑</Button>
      </p>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
import axios from 'axios'
  import line from '@/echarts/hostManage/line'
  import bar from '@/echarts/hostManage/bar'
  import regExp from '../../util/regExp'
  import {debounce} from 'throttle-debounce'
  export default {
    data() {
      var regExp = /(?!(^[^a-z]+$))(?!(^[^A-Z]+$))(?!(^[^\d]+$))^[\w`~!#$%\\\\^&*|{};:\',\\/<>?@]{6,23}$/
      const validateoldPassword = (rule, value, callback) => {
        if (!value) {
          callback(new Error('密码不能为空'));
        } else if (!regExp.test(value)) {
          callback(new Error('密码由6位及以上23位以下的字母数字组成，必须包含大小写字母、数字'));
        } else {
          callback();
        }
      }
      const validatePassword = (rule, value, callback) => {
        if (!value) {
          callback(new Error('密码不能为空'));
        } else if (!(this.passwordForm.firstDegree&&this.passwordForm.secondDegree&&this.passwordForm.thirdDegree)) {
          callback(new Error('您输入的密码不符合格式要求'));
        } else {
          if (regExp.test(value)) {
            this.$refs.resetPasswordForm.validateField('confirmPassword');
          }
          callback();
        }
      }
      const validatePassCheck = (rule, value, callback) => {
        if (!value) {
          callback(new Error('密码不能为空'));
        } else if (!(this.passwordFormTwo.firstDegree&&this.passwordFormTwo.secondDegree&&this.passwordFormTwo.thirdDegree)) {
          callback(new Error('你输入的密码不符合格式要求'));
        } else if (this.resetPasswordForm.newPassword != value) {
          callback(new Error('两次密码不一致'));
        } else {
          callback();
        }
      }
      const validaSinginName = (rule, value, callback) => {
        if (!value) {
          callback(new Error('密码不能为空'));
        } else if (value.length < 8) {
          callback(new Error('长度至少为8位'));
        } else {
          callback();
        }
      }
      const validateNewport = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入修改后的端口号'))
        } else {
          if (/^[\d]+$/.test(value) && value < 65536 && value > 0) {
            callback()
          } else {
            callback(new Error('请输入正确的端口号'))
          }
        }
      }
      return {
        showModal: {
          portModify: false,
          lookPassword: false,
          publicIPHint: false,
          bindIP: false,
          unbindIP: false,
          dilatation:false,
        },
         bindForm: {
        publicIP: ''
      },
      bindFormRule: {
        publicIP: [
          { required: true, message: '请选择', trigger: 'change' }
        ]
      },
      publicIPList: [],
        dilatationCost: '--',
        dilatationForm: {
          databaseSize: 0,
          minDatabaseSize: 0
        },
        passwordForm: {
          passwordHint: false,
          //密码强度
          firstDegree: false,
          secondDegree: false,
          thirdDegree: false
        },
        passwordFormTwo: {
          passwordHint: false,
          //密码强度
          firstDegree: false,
          secondDegree: false,
          thirdDegree: false
        },
        portModifyForm: {
          currentPorts: '',
          newPorts: ''
        },
        portModifyRuleValidate: {
          newPorts: [
            {validator: validateNewport, trigger: 'change'}
          ]
        },
        isActive: true,
        countdown: 60,
        codePlaceholder: '发送密码',
         resetPasswordForm: {
          oldPassword: '',
          newPassword: '',
          confirmPassword: '',
          buttonMessage: '确认重置',
        },
        resetRuleValidate: {
          oldPassword: [
            {required: true, validator: validateoldPassword, trigger: 'blur'}
          ],
          newPassword: [
            {required: true, validator: validatePassword, trigger: 'blur'}
          ],
          confirmPassword: [
            {required: true, validator: validatePassCheck, trigger: 'blur'}
          ],
        },
        lookPasswordForm: {
          input: '',
          isletterSec: false,
          isemailalarmSec: false,
          issmsalarmSec: true,
          isLetterSec: 0,
          isEmailAlarmSec: 0,
          isSmsAlarmSec: 1,
        },
        lookPasswordFormRule: {
          input: [
            {required: true, validator: validaSinginName, trigger: 'blur'}
          ]
        },
        regExpObj: {
          password: /(?!(^[^a-z]+$))(?!(^[^A-Z]+$))(?!(^[^\d]+$))^[\w~*:,]{8,30}$/
        },
        guideStep: 0,
        hostInfo: {},
        computerId: '',
        configType: '基础信息',
        configTypes: ['基础信息', '主机监控', '修改密码', '操作日志'],
        codePlaceholder: '发送密码',
        publicIPList: [],
        bindForm: {
          publicIP: '',
          bindIpText: '绑定IP',
          unbindText: '解绑IP'
        },
        bindFormRule: {
          publicIP: [
            {required: true, message: '请选择', trigger: 'change'}
          ]
        },
        adjustForm: {
          minBrand: 0,
          brand: 0,
          cost: '0',
          caseType: 0
        },
        tab2: {
          monitoringList: [
            {
              title: 'CPU使用率',
              type: '近一天',
              showType: '折线',
              chart: null
            },
            {
              title: '内存使用率',
              type: '近一天',
              showType: '折线',
              chart: null
            },
            {
              title: '磁盘使用率',
              type: '近一天',
              showType: '折线',
              chart: null
            },
            {
              title: '外网流入量',
              type: '近一天',
              showType: '折线',
              chart: null
            },
            {
              title: '外网流出量',
              type: '近一天',
              showType: '折线',
              chart: null
            }
          ],
          currentData: this.getCurrentDate()
        },
        tab5: {
          timeHorizon: '近一天',
          searchName: '',
          logColumns: [
            {
              title: '操作',
              key: 'operatedes'
            },
            {
              title: '操作结果',
              render: (h, params) => {
                let text = params.row.operatestatus == 1 ? '成功' : '失败'
                return h('span', {}, text)
              },
              filters: [
                {
                  label: '成功',
                  value: 1
                },
                {
                  label: '失败',
                  value: 2
                }
              ],
              filterMultiple: false,
              filterMethod(value, row) {
                if (value === 1) {
                  return row.operatestatus == 1
                } else if (value === 2) {
                  return row.operatestatus != 1
                }
              }
            },
            {
              title: '创建时间',
              key: 'operatortime',
              sortable: true
            }
          ],
          logData: [],
          logPages: 0,
          currentPage: 1,
          pageSize: 10,
          logTime: this.getCurrentDate() + ',' + this.getTomorrow()
        },
      }
    },
    created() {
      this.computerId = sessionStorage.getItem('manageId')
      this.getHostInfo()
    },
    methods: {
      changeTabs(item) {
        this.configType = item
        switch (item) {
          case '基础信息':
            this.getHostInfo()
            break
          case '主机监控':
            this.getComputerMonitor()
            break
          case '修改密码':
            break
          case '操作日志':
            this.getHostLog()
            break
        }
      },
      getHostInfo() {
        let url = 'database/listDB.do'
        this.$http.get(url, {
          params: {
            id: this.computerId
          }
        }).then(res => {
          if (res.status == 200 && res.data.status == 1) {
            this.hostInfo = res.data.result.info[0]
            // this.isAutoRenew = Boolean(this.hostInfo.isAutoRenw)
            console.log(this.hostInfo)
          }
        })
      },
      bindIP () {
        this.bindForm.publicIP = ''
        axios.get('network/listPublicIp.do', {
          params: {
            useType: 0,
            zoneId: this.hostInfo.zoneid,
            vpcId: this.hostInfo.vpcid
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            this.publicIPList = response.data.result
            if (this.publicIPList == '') {
              this.showModal.publicIPHint = true
            } else {
              this.showModal.bindIP = true
            }
          }
        })
    },
    bindIpSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.showModal.bindIP = false
          this.$Message.info({
            content: `<span style="color:#2A99F2">${this.hostInfo.computername}</span>云主机,正在绑定公网IP`
          })
          this.$http.get('network/enableStaticNatByAfter.do', {
            params: {
              ipId: this.bindForm.publicIP,
              VMId: this.hostInfo.computerid
            }
          }).then(response => {
            if (response.status == 200 && response.data.status == 1) {
              this.getHostInfo()
            } else {
              this.$message.info({
                content: response.data.message
              })
            }
          })
        }
      }
      )
    },
    unbind () {
      this.showModal.unbindIP = false
      this.$http.get('network/disableStaticNatByAfter.do', {
        params: {
          ipId: this.hostInfo.publicip,
          VMId: this.hostInfo.computerid
        }
      }).then(response => {
        if (response.status == 200 && response.data.status == 1) {
          this.hostInfo.publicip = ''
        } else {
          this.$message.info({
            content: response.data.message
          })
        }
      })
    },
      // 数据库扩容价格查询
    queryDatabaseCost: debounce(500, function () {
      axios.get('database/upDBCost.do', {
        params: {
          DBId: this.hostInfo.computerid,
          diskSize: this.dilatationForm.databaseSize - this.dilatationForm.minDatabaseSize,
          zoneId: this.hostInfo.zoneid
        }
      }).then(response => {
        if (response.status == 200 && response.data.status == 1) {
          this.dilatationCost = response.data.result
        } else {
          this.$message.info({
            content: response.data.message
          })
        }
      })
    }),
    dilatationok () {
      axios.get('database/upDB.do', {
        params: {
          DBId: this.hostInfo.computerid,
          diskSize: this.dilatationForm.databaseSize - this.dilatationForm.minDatabaseSize,
          zoneId: this.hostInfo.zoneid
        }
      }).then(response => {
        if (response.status == 200 && response.data.status == 1) {
          this.$router.push('order')
        } else {
          this.$message.info({
            content: response.data.message
          })
        }
      })
    },
      portModify() {
        this.$message.confirm({
          title: '修改端口',
          content: '修改端口会导致数据库重启，请谨慎操作，是否确认修改端口？',
          onOk: () => {
            this.portModifyForm.currentPorts = this.hostInfo.dbPort
            this.showModal.portModify = true
          }
        })
      },
      portModify_ok(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.showModal.portModify = false
            this.$http.get('database/updateDBPort.do', {
              params: {
                DBId: this.hostInfo.computerid, //(数据库的UUID),
                port: this.portModifyForm.newPorts //(需要更改的端口)
              }
            }).then(res => {
              if (res.status === 200 && res.data.status === 1) {
                this.$Message.success(res.data.message)
                this.hostInfo.dbPort = this.portModifyForm.newPorts
              } else {
                this.$message.info({
                  content: res.data.message
                })
              }
            })
          }
        })
      },
      inter() {
        this.intervalSnapsList = setInterval(() => {
          axios.get('Snapshot/listVMSnapshot.do', {
            params: {
              zoneId: $store.state.zone.zoneid,
              resourceType: 1,
              resourceId: this.snapsId
            }
          })
            .then(response => {
              if (response.status == 200 && response.data.status == 1) {
                var snapshotData = response.data.result
                snapshotData.forEach(item => {
                  if (this.snapsSelection) {
                    if (this.snapsSelection.id == item.id) {
                      item._checked = true
                    }
                    if (item.status == 2) {
                      item._disabled = true
                    }
                  }
                })
                this.snapshotData = snapshotData
              }
            })
        }, 1000 * 10)
      },
       lookPassword() {
        if (this.isActive) {
          this.showModal.lookPassword = true
        }
      },
      lookPasswordSubm(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.showModal.lookPassword = false
            this.isActive = false
            this.codePlaceholder = '发送密码（60s）'
            var inter = setInterval(() => {
              this.countdown--
              this.codePlaceholder = '发送密码（' + this.countdown + 's）'
              if (this.countdown == 0) {
                clearInterval(inter)
                this.countdown = 60
                this.codePlaceholder = '发送密码'
                this.isActive = true
              }
            }, 1000)
            this.lookPasswordForm.isLetterSec = this.lookPasswordForm.isletterSec == false ? 0 : 1
            this.lookPasswordForm.isSmsAlarmSec = this.lookPasswordForm.issmsalarmSec == false ? 0 : 1
            this.lookPasswordForm.isEmailAlarmSec = this.lookPasswordForm.isemailalarmSec == false ? 0 : 1
            this.$http.post('log/sendVMPassword.do', {
              VMId: this.hostInfo.computerid,
              password: this.lookPasswordForm.input,
              letter: this.lookPasswordForm.isLetterSec,
              meail: this.lookPasswordForm.isEmailAlarmSec,
              phone: this.lookPasswordForm.isSmsAlarmSec
            }).then(response => {
              if (response.status == 200 && response.data.status == 1) {
                this.$Message.success(response.data.message)
              } else {
                this.$message.info({
                  content: response.data.message
                })
              }
              this.lookPasswordForm.input = ''
            })
          }
        })
      },
      resetConfirm(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.resetPasswordForm.buttonMessage = '正在重置中...'
            this.$http.get('database/updateDBPassword.do', {
              params: {
                DBId: this.hostInfo.computerid,
                password: this.resetPasswordForm.newPassword,
                // oldPassword: this.resetPasswordForm.oldPassword
              }
            }).then(response => {
              if (response.status == 200 && response.data.status == 1) {
                this.$Message.success(response.data.message)
              } else {
                this.$message.info({
                  content: response.data.message
                })
              }
              this.resetPasswordForm.buttonMessage = '确认重置'
              this.resetPasswordForm.oldPassword = ''
              this.resetPasswordForm.newPassword = ''
              this.resetPasswordForm.confirmPassword = ''
            })
          }
        })
      },
      hostUpgrade() {
        sessionStorage.setItem('upgradeId', this.hostInfo.id)
        sessionStorage.setItem('vmid', this.hostInfo.computerid)
        this.$router.push('dataBaseUpgrade')
      },
      toVpcMannage() {
        sessionStorage.setItem('vpcId', this.hostInfo.vpcid)
        this.$router.push('vpcManage')
      },
      toOrderPage() {
        sessionStorage.setItem('orderid', this.hostInfo.ordernumber)
        this.$router.push('OrderDetails')
      },
      changeLoginPasType(val) {
        switch (val) {
          case 1:
            this.modifyPasswordForm.oldPasswordInput == 'password' ? this.modifyPasswordForm.oldPasswordInput = 'text' : this.modifyPasswordForm.oldPasswordInput = 'password'
            break
          case 2:
            this.modifyPasswordForm.newPasswordInput == 'password' ? this.modifyPasswordForm.newPasswordInput = 'text' : this.modifyPasswordForm.newPasswordInput = 'password'
            break
          case 3:
            this.modifyPasswordForm.confirmPasswordInput == 'password' ? this.modifyPasswordForm.confirmPasswordInput = 'text' : this.modifyPasswordForm.confirmPasswordInput = 'password'
            break
        }
      },
      toOther(val) {
        switch (val) {
          case 'vpc':
            sessionStorage.setItem('vpcId', this.hostInfo.vpcId)
            this.$router.push('vpcManage')
            break
          case 'firewall':
            if (this.hostInfo.firewall) {
              sessionStorage.setItem('firewallId', this.hostInfo.firewallId)
              this.$router.push('firewallManage')
            }
            break
        }
      },
      getComputerMonitor() {
        this.$http.get('alarm/getVmAlarmByHour.do', {
          params: {
            vmname: this.hostInfo.instancename,
            type: 'core'
          }
        }).then(response => {
          if (response.status == 200 && response.data.status == 1) {
            // 用的以前接口数据格式，只有挨个赋值
            let test = [0, 10, 80, 90, 100, 20, 40, 60, 70, 80, 10, 20, 30, 40, 0, 0, 0, 0, 0, 0, 0, 0, 60, 0]
            let cpuBrokenLine = JSON.parse(JSON.stringify(line))
            let memoryBrokenLine = JSON.parse(JSON.stringify(line))
            let diskBrokenLine = JSON.parse(JSON.stringify(line))
            let networkIn = JSON.parse(JSON.stringify(line))
            let networkOut = JSON.parse(JSON.stringify(line))     
            cpuBrokenLine.xAxis.data = response.data.result.xaxis
            memoryBrokenLine.xAxis.data = response.data.result.xaxis
            diskBrokenLine.xAxis.data = response.data.result.xaxis
            networkIn.xAxis.data = response.data.result.xaxis
            networkOut.xAxis.data = response.data.result.xaxis
            cpuBrokenLine.series.push({
              name: 'CPU使用率（%）',
              type: 'line',
              data: response.data.result.cpuUse,
              barWidth: '15%'
            })
            this.tab2.monitoringList[0].chart = cpuBrokenLine
            memoryBrokenLine.series.push({
              name: '内存使用率（%）',
              type: 'line',
              data: response.data.result.memoryUse,
              barWidth: '15%'
            })
            this.tab2.monitoringList[1].chart = memoryBrokenLine
            diskBrokenLine.series.push({
              name: '磁盘使用率（%）',
              type: 'line',
              data: response.data.result.diskUse,
              barWidth: '15%'
            })
            this.tab2.monitoringList[2].chart = diskBrokenLine
            networkIn.series.push({
              name: '外网流入量（kb/s）',
              type: 'line',
              data: response.data.result.cpuUse,
              barWidth: '15%'
            })
            this.tab2.monitoringList[3].chart = networkIn
            networkOut.series.push({
              name: '外网流出量（kb/s）',
              type: 'line',
              data: response.data.result.cpuUse,
              barWidth: '15%'
            })
            this.tab2.monitoringList[4].chart = networkOut
          }
        })
      },
      changeMonitorDate(index) {
        let url = this.tab2.monitoringList[index].type == '近一天' ? 'alarm/getVmAlarmByHour.do' : 'alarm/getVmAlarmByDay.do'
        let dateType = this.tab2.monitoringList[index].type == '最近7天' ? 'week' : 'month'
        this.$http.get(url, {
          params: {
            vmname: this.hostInfo.instancename,
            type: 'core',
            datetype: dateType
          }
        }).then(res => {
          if (res.data.status == 1) {
            let broken = this.tab2.monitoringList[index].type == 'line' ? JSON.parse(JSON.stringify(line)) : JSON.parse(JSON.stringify(bar))
            let type = this.tab2.monitoringList[index].showType == '折线' ? 'line' : 'bar'
            let name = index == 0 ? 'CPU使用率（%）' : index == 1 ? '内存使用率（%）' : index == 2 ? '磁盘使用率（%）' : index == 3 ? '外网流入量':'外网流出量'
            let data = index == 0 ? res.data.result.cpuUse : index == 1 ? res.data.result.memoryUse : index == 2 ? res.data.result.diskUse : index == 3 ? res.data.result.networkIn : res.data.result.networkOut
            broken.series.push({
              name: name,
              type: type,
              data: data,
              barWidth: '15%'
            })
            broken.xAxis.data = res.data.result.xaxis
            this.tab2.monitoringList[index].chart = broken
          } else {
            this.$message.info({
              content: res.data.message
            })
          }
        })
      },
      changeMonitorShowType(index) {
        let broken = {}
        if (this.tab2.monitoringList[index].showType == '折线') {
          broken = JSON.parse(JSON.stringify(line))
          broken.series.push({
            name: this.tab2.monitoringList[index].chart.series[0].name,
            type: 'line',
            data: this.tab2.monitoringList[index].chart.series[0].data,
            barWidth: '15%'
          })
          broken.xAxis.data = this.tab2.monitoringList[index].chart.xAxis.data
          this.tab2.monitoringList[index].chart = broken
        } else {
          broken = JSON.parse(JSON.stringify(bar))
          broken.series.push({
            name: this.tab2.monitoringList[index].chart.series[0].name,
            type: 'bar',
            data: this.tab2.monitoringList[index].chart.series[0].data,
            barWidth: '15%'
          })
          broken.xAxis.data = this.tab2.monitoringList[index].chart.xAxis.data
          this.tab2.monitoringList[index].chart = broken
        }
      },
      changeLogPage(page) {
        this.tab5.currentPage = page
        this.getHostLog()
      },
      getHostLog() {
        this.$http.get('log/queryLog.do', {
          params: {
            pageSize: this.tab5.pageSize,
            currentPage: this.tab5.currentPage,
            target: 'db',
            queryTime: this.tab5.logTime,
            targetId: this.hostInfo.id,
            message: this.tab5.searchName
          }
        }).then(response => {
          this.tab5.logPages = response.data.total
          this.tab5.logData = response.data.tableData
        })
      },
      logToggle() {
        switch (this.tab5.timeHorizon) {
          case '近一天':
            this.tab5.logTime = this.getCurrentDate() + ',' + this.getTomorrow()
            break
          case '近一周':
            this.tab5.logTime = this.logNearlySevenDays() + ',' + this.getTomorrow()
            break
          case '近一月':
            this.tab5.logTime = this.logNearlyThirtyDays() + ',' + this.getTomorrow()
            break
        }
        this.tab5.currentPage = 1
        this.getHostLog()
      },
      getTomorrow() {
        var day = new Date()
        day.setTime(day.getTime() + 24 * 60 * 60 * 1000)
        return day.getFullYear() + '.' + (day.getMonth() + 1) + '.' + day.getDate()
      },
      logNearlySevenDays() {
        var day = new Date()
        day.setTime(day.getTime() - 24 * 60 * 60 * 1000 * 6)
        return day.getFullYear() + '.' + (day.getMonth() + 1) + '.' + day.getDate()
      },
      logNearlyThirtyDays() {
        var day = new Date()
        day.setTime(day.getTime() - 24 * 60 * 60 * 1000 * 29)
        return day.getFullYear() + '.' + (day.getMonth() + 1) + '.' + day.getDate()
      },
      getCurrentDate() {
        return new Date().getFullYear().toString() + '.' + (new Date().getMonth() + 1).toString() + '.' + new Date().getDate().toString()
      },
    },
    computed: {
      auth() {
        return this.$store.state.authInfo != null
      },
      selectLenght() {
        return this.tab3.selectLenght;
      }
    },
    watch: {
      '$store.state.zone': {
        handler: function () {
          this.$router.push('host')
        },
        deep: true
      },
      'dilatationForm.databaseSize' () {
      if (this.hostInfo.disksize == this.dilatationForm.databaseSize) {
        this.dilatationCost = '--'
      } else {
        this.queryDatabaseCost()
      }
    },
      'resetPasswordForm.newPassword':{
         handler(val) {
           if(val.length >7 && val.length <31){
              this.passwordForm.firstDegree = true
            } else{
              this.passwordForm.firstDegree = false
            }
            let len = val.length
            let reg = /[0-9]/
            let flag = false
            // 当用户输入到第6位时，开始校验是否有6位连续字符
            if(len>5){
              flag = check(len)
              function check(index){
                let count = 0
                for(let i = index- 5; i < index;i++){
                let next = reg.test(val[i]) ? val[i] : val[i].charCodeAt() // 检查字符是数字还是字母
                let current = reg.test(val[i-1]) ? val[i-1] : val[i-1].charCodeAt()
                if(next-current === 1){ // ACSII 码相差1则为连续
                  count +=1
                }
              }
                if(count > 4){ // 有6位连续字符
                  return true
                } else if(count < 5 && index > 6){
                  return check(index - 1) // 递归继续校验
                } else{
                  return false
                }
              }
            }
           if(flag&&len>5){
          this.passwordForm.secondDegree = false
        } else if(!flag && len>5){
          this.passwordForm.secondDegree = true
        }
        if(len === 0) {
           this.passwordForm.secondDegree = false
        }
            if(regExp.hostPassword(val)){
              this.passwordForm.thirdDegree = true
            } else{
              this.passwordForm.thirdDegree = false
            }
          },
          deep: true
        },
        'resetPasswordForm.confirmPassword':{ 
         handler(val) {
           if(val.length >7 && val.length <31){
              this.passwordFormTwo.firstDegree = true
            } else{
              this.passwordFormTwo.firstDegree = false
            }
            let len = val.length
            let reg = /[0-9]/
            let flag = false
            // 当用户输入到第6位时，开始校验是否有6位连续字符
            if(len>5){
              flag = check(len)
              function check(index){
                let count = 0
                for(let i = index- 5; i < index;i++){
                let next = reg.test(val[i]) ? val[i] : val[i].charCodeAt() // 检查字符是数字还是字母
                let current = reg.test(val[i-1]) ? val[i-1] : val[i-1].charCodeAt()
                if(next-current === 1){ // ACSII 码相差1则为连续
                  count +=1
                }
              }
                if(count > 4){ // 有6位连续字符
                  return true
                } else if(count < 5 && index > 6){
                  return check(index - 1) // 递归继续校验
                } else{
                  return false
                }
              }
            }
        if(flag&&len>5){
          this.passwordFormTwo.secondDegree = false
        } else if(!flag && len>5){
          this.passwordFormTwo.secondDegree = true
        }
        if(len === 0) {
           this.passwordFormTwo.secondDegree = false
        }
            if(regExp.hostPassword(val)){
              this.passwordFormTwo.thirdDegree = true
            } else{
              this.passwordFormTwo.thirdDegree = false
            }
          },
          deep: true
        }
    },
    beforeRouteLeave(to, from, next) {
      // 导航离开该组件的对应路由时调用
      next()
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .hint() {
    width: 200px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    position: absolute;
    z-index: 1;
    padding: 20px;
    > p {
      font-size: 14px;
      font-family: MicrosoftYaHei;
      color: #666666;
      line-height: 20px;
      margin-bottom: 20px;
    }
    > span {
      float: right;
      font-size: 14px;
      font-family: MicrosoftYaHei;
      color: rgba(24, 144, 255, 1);
      cursor: pointer;
    }
    span:nth-child(2) {
      margin-left: 10px;
    }
    span:nth-child(4) {
      float: left;
      cursor: auto;
      color: #666666;
    }
    &::after {
      content: '';
      display: inline-block;
      width: 10px;
      height: 10px;
      background: #FFF;
      position: absolute;
      bottom: -6px;
      right: 50%;
      transform: rotate(135deg);
      box-shadow: 1px -1px 0px 0px rgba(0, 0, 0, 0.2);
    }
  }

  .host-config {
    padding: 20px 20px 0;
    background: rgba(246, 250, 253, 1);
    border-radius: 2px;
    position: relative;
    .config-top {
      padding-bottom: 20px;
      > p {
        font-size: 14px;
        font-family: MicrosoftYaHei;
        color: rgba(51, 51, 51, 1);
        line-height: 35px;
        > span {
          cursor: pointer;
          color: #2A99F2;
        }
        > img {
          vertical-align: text-top;
          cursor: pointer;
          &.last {
            position: relative;
            top: -2px;
            margin-left: 5px;
            vertical-align: middle;
          }
        }
        > button {
          float: right;
          background: rgba(255, 255, 255, 1);
          border-radius: 4px;
          cursor: pointer;
          outline: none;
          font-size: 12px;
          line-height: 24px;
          font-family: MicrosoftYaHei;
          color: rgba(42, 153, 242, 1);
          border: 1px solid rgba(42, 153, 242, 1);
          padding: 0px 15px;
          &:hover {
            background: rgba(42, 153, 242, 1);
            color: #FFFFFF;
          }
        }
        &.title {
          font-size: 18px;
        }
      }
    }
    .config-type {
      display: flex;
      > ul {
        font-family: MicrosoftYaHei;
        color: rgba(102, 102, 102, 1);
        line-height: 20px;
        font-size: 14px;
        padding: 10px;
        cursor: pointer;
        &.selected {
          background: #FFF;
          color: #2A99F2;
        }
      }
    }
  }

  .config-info {
    background: #FFF;
    padding: 20px;
    min-height: 660px;
    .tab-1 {
      dl {
        margin-bottom: 18px;
        border-bottom:1px solid rgba(231,231,231,1);
        &:last-child{
          border-bottom: none;
        }
        dt {
          margin-bottom: 20px;
          font-size:18px;
          color:rgba(51,51,51,1);
        }
        dd {
          ul {
            display: flex;
            margin-bottom: 20px; 
            li {
                font-size:14px;
                width: 465px;
                &:nth-of-type(3) {
                  width: 230px;
                }
              h4 {
                margin-bottom: 10px;
                color:rgba(102,102,102,1);
                font-weight: normal;
              }
              div {
                color:rgba(51,51,51,1);
                span {
                  color: #2A99F2;
                  cursor: pointer;
                }
              }
            }
          }
        }
      }
    }
    .tab-2 {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .item {
        border-radius: 4px;
        padding: 20px;
        border: 1px dashed rgba(153, 153, 153, 1);
        width: 570px;
        height: 405px;
        margin-bottom: 20px;
        .item-title {
          border-bottom: 1px solid rgba(233, 233, 233, 1);
          padding-bottom: 10px;
          > span {
            font-size: 14px;
            font-family: MicrosoftYaHei;
            color: rgba(51, 51, 51, 1);
            line-height: 20px;
          }
          span:nth-child(2) {
            float: right;
            color: rgba(153, 153, 153, 1);
          }
        }
        .item-type {
          margin-top: 18px;
        }
      }
    }
    .tab-5 {
      .title {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
      }
    }
  }

  .modal-p {
    font-size: 12px;
    font-family: MicrosoftYaHei;
    color: rgba(102, 102, 102, 1);
    line-height: 20px;
    margin-bottom: 20px;
  }

  .modal-img {
    cursor: pointer;
    position: absolute;
    top: 12px;
    right: 10px;
  }
  .popTip {
    width: 350px;
    padding: 19px 21px;
    position: absolute;
    background: #FFF;
    border-radius: 8px;
    box-shadow: 0 2px 24px 0 rgba(125, 125, 125, 0.35);
    left: 260px;
    bottom: -30px;
    z-index: 3;
    > div {
      display: flex;
      > i {
        display: inline-block;
        border: 1px solid rgba(151, 151, 151, 1);
        margin-right: 3px;
        margin-top: 5px;
        height: 12px;
        width: 12px;
        border-radius: 6px;
        &.reach {
          background: #09BC1D;
          border: 1px solid #09BC1D;
          color: #fff;
          position: relative;
          &:before {
            content: '✓';
            display: inline-block;
            position: absolute;
            top: -11px;
            color: #fff;
          }
        }
      }
      > p {
        font-size: 14px;
        font-family: MicrosoftYaHei;
        color: rgba(51, 51, 51, 1);
        line-height: 24px;
      }
    }
  }
</style>
