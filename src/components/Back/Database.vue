<template>
  <div id="background">
    <div id="wrapper">
      <span class="title">
        云数据库 /
        <span>云数据库实例</span>
      </span>
      <Alert type="warning" show-icon style="margin-bottom:10px" v-if="!auth">
        您尚未进行实名认证，只有认证用户才能对外提供服务，
        <router-link to="/userCenter">立即认证</router-link>
      </Alert>
      <div id="content">
        <div id="header">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#houtaiicon-danxingyunfuwuqiECS"></use>
          </svg>
          <span id="title">云数据库</span>
          <button id="refresh_button" @click="$router.go(0)" style="margin-top: 10px;">刷新</button>
        </div>
        <div class="universal-alert">
          <p>专业的云数据库服务，支持Mysql、SQL Server、PostgreSQL、MangoDB引擎，提供简易方便的Web界面管理、可靠的数据备份和恢复、完备的安全管理、完善的监控等功能。</p>
        </div>
        <div class="operator-bar" style="position: relative">
          <Button
            type="primary"
            @click="$router.push('/buy/database/')"
            style="margin-right:10px"
          >+ 创建</Button>
          <Poptip confirm width="230" placement="right" @on-ok="hostDelete(1)" title="您确认删除选中的主机吗？">
            <Button type="primary" :disabled="deleteDisabled">删除</Button>
          </Poptip>
        </div>
        <div class="selectMark">
          <Icon type="information-circled" style="color:#2A99F2;font-size:18px;margin-right:10px;"></Icon>
          <span>
            共 {{ hostPages}} 项 | 已选择
            <span style="color:#FF624B;">{{ hostSelection.length }}</span>项
          </span>
        </div>
        <Table
          :columns="hostListColumns"
          :data="hostListData"
          @on-selection-change="hostSelectionChange"
        ></Table>
        <div style="margin: 10px 10px 0 0;overflow: hidden">
          <p style="float:left;font-size:14px;">
            点击查看
            <a href="/support_docs/4LlTC3MYo_RjDqVv0ZP.html">如何连接数据库？</a>
          </p>
          <div style="float: right;">
            <Page
              :total="hostPages"
              :current="currentPage"
              :page-size="pageSize"
              @on-change="changePage"
            ></Page>
          </div>
        </div>
      </div>
    </div>
    <!--选择两种认证方式-->
    <Modal
      v-model="showModal.selectAuthType"
      width="590"
      :scrollable="true"
      :styles="{top:'172px'}"
    >
      <div slot="header" class="modal-header-border">
        <span class="universal-modal-title">选择认证方式</span>
      </div>
      <div style="display: flex">
        <div class="selectAuthType" style="border-right: 1px solid #D9D9D9">
          <h2>个人用户</h2>
          <p>
            <i></i>可以使用新睿云所有资源
          </p>
          <p>
            <i></i>个人级别的资源建立额度
          </p>
        </div>
        <div class="selectAuthType">
          <h2>企业用户</h2>
          <p>
            <i></i>可以使用新睿云所有资源
          </p>
          <p>
            <i></i>企业级无限量的资源建立额度
          </p>
          <p>
            <i></i>专业免费的点对点咨询服务
          </p>
        </div>
      </div>
      <div style="display: flex;margin-top:20px">
        <div style="width:50%;text-align: center">
          <Button type="primary" @click="push('personalInfo')">立即认证</Button>
        </div>
        <div style="width:50%;text-align: center">
          <Button type="primary" @click="push('companyInfo')">立即认证</Button>
        </div>
      </div>
      <div slot="footer">
        <p
          class="modal-text-hint-bottom"
        >提示：个人用户账户可以升级为企业用户账户，但企业用户账户不能降级为个人用户账户。完成实名认证的用户才能享受上述资源建立额度与免费试用时长如需帮助请联系：400-050-5565</p>
      </div>
    </Modal>
    <!-- 删除主机关联其他资源确认弹窗 -->
    <Modal v-model="showModal.delHostHint" :scrollable="true" :closable="false" :width="390">
      <p slot="header" class="modal-header-border">
        <Icon type="android-alert" class="yellow f24 mr10" style="font-size: 20px"></Icon>
        <span class="universal-modal-title">提示</span>
      </p>
      <div class="modal-content-s">
        <div>
          <p class="lh24">{{ delHostMessage }}</p>
        </div>
      </div>
      <p slot="footer" class="modal-footer-s">
        <Button @click="showModal.delHostHint = false">取消</Button>
        <Button type="primary" @click="delHostOk">确认删除</Button>
      </p>
    </Modal>
    <!-- 删除主机弹窗 -->
    <Modal v-model="showModal.delHost" :scrollable="true" :closable="false" :width="390">
      <p slot="header" class="modal-header-border">
        <Icon type="android-alert" class="yellow f24 mr10" style="font-size: 20px"></Icon>
        <span class="universal-modal-title">删除数据库</span>
      </p>
      <div class="modal-content-s">
        <div>
          <p
            class="lh24"
          >数据库删除之后将进入回收站（注：资源在回收站中也将会持续扣费，请及时处理），新睿云将为您保留2小时，在2小时之内您可以恢复资源，超出保留时间之后，将彻底删除资源，无法在恢复。</p>
        </div>
      </div>
      <p slot="footer" class="modal-footer-s">
        <Button @click="showModal.delHost = false">取消</Button>
        <Button type="primary" @click="delHostOk">确认删除</Button>
      </p>
    </Modal>
    <!-- 加入负载均衡弹窗 -->
    <Modal v-model="showModal.balance" width="590" :scrollable="true">
      <div slot="header" class="modal-header-border">
        <span class="universal-modal-title">加入负载均衡</span>
      </div>
      <div class="universal-modal-content-flex">
        <Form :model="loadBalanceForm" ref="loadBalanceForm" :rules="loadBalanceFormRule">
          <Form-item label="选择弹性负载均衡名称" prop="loadbalanceroleid">
            <Select
              v-model="loadBalanceForm.loadbalanceroleid"
              placeholder="请选择"
              style="width:240px;"
            >
              <Option
                v-for="(item,index) in listLoadBalanceRole"
                :key="index"
                :value="item.loadbalanceroleid+item.type||item.lbid"
              >
                <span v-if="item.name">{{item.name}}</span>
                <span v-if="item.lbname">{{item.lbname}}</span>
              </Option>
            </Select>
            <span style="color:#2A99F2;font-size:14px;position:absolute;top:4px;right:-110px;">
              <span style="font-weight:800;font-size:20px;">+</span>
              <span style="cursor:pointer;" @click="$router.push('balance')">创建负载均衡</span>
            </span>
          </Form-item>
        </Form>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="ghost" @click="showModal.balance = false">取消</Button>
        <Button type="primary" @click="joinBalanceSubm('loadBalanceForm')">确定</Button>
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
          <p class="lh24">您还未拥有公网IP，请先创建公网IP。</p>
        </div>
      </div>
      <p slot="footer" class="modal-footer-s">
        <Button @click="showModal.publicIPHint = false">取消</Button>
        <Button type="primary" @click="$router.push('/buy/elasticip/')">创建公网IP</Button>
      </p>
    </Modal>
    <!-- 绑定静态IP -->
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
    <!-- 主机重命名弹窗 -->
    <Modal v-model="showModal.rename" width="550" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">主机重命名</span>
      </p>
      <div class="universal-modal-content-flex">
        <Form :model="renameForm" ref="renameForm" :rules="renameFormRule">
          <Form-item label="主机名" prop="hostName">
            <Input v-model="renameForm.hostName" placeholder="请输入新主机名" :maxlength="15"></Input>
          </Form-item>
        </Form>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="ghost" @click="showModal.rename = false">取消</Button>
        <Button type="primary" @click="checkRenameForm">确定</Button>
      </div>
    </Modal>
    <!-- 资费变更弹出框 -->
    <Modal v-model="showModal.ratesChange" width="550" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">变更资费选择（资费变更适用于实时收费转包月/年）</span>
      </p>
      <div class="universal-modal-content-flex">
        <Form>
          <FormItem label="变更类型 :">
            <Select v-model="ratesChangeType">
              <Option
                v-for="(item,index) in timeOptions.renewalType"
                :value="item.value"
                :key="index"
              >{{ item.label }}</Option>
            </Select>
          </FormItem>
          <FormItem label="变更时长 :">
            <Select v-model="ratesChangeTime">
              <Option
                v-for="(item,index) in timeOptions.renewalTime"
                :value="item.value"
                :key="index"
              >{{ item.label }}</Option>
            </Select>
          </FormItem>
          <FormItem label="是否同时变更绑定IP与磁盘" v-if="relevanceDisks||relevanceIps">
            <CheckboxGroup v-model="relevanceAlteration">
              <Checkbox label="ip" v-if="relevanceIps">变更绑定IP</Checkbox>
              <Checkbox label="disk" v-if="relevanceDisks">变更绑定磁盘</Checkbox>
            </CheckboxGroup>
          </FormItem>
        </Form>
        <div style="font-size:16px;">
          资费
          <span style="color: #2b85e4; text-indent:4px;display:inline-block;">
            现价
            <span style="font-size:24px;">￥{{ratesChangeCost}}/</span>
          </span>
          <span style="text-decoration: line-through">原价{{originRatesChangeCost}}</span>
        </div>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="ghost" @click="showModal.ratesChange=false">取消</Button>
        <Button type="primary" @click="ratesChange_ok" :disabled="ratesChangeCost=='--'">确认变更</Button>
      </div>
    </Modal>
    <!-- 包年包月续费弹窗 -->
    <Modal v-model="showModal.renewal" width="590" :scrollable="true">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">续费选择</span>
      </p>
      <div class="universal-modal-content-flex">
        <Form>
          <FormItem label="付费类型 :">
            <Select v-model="renewalType">
              <Option
                v-for="(item,index) in timeOptions.renewalType"
                :value="item.value"
                :key="index"
              >{{ item.label }}</Option>
            </Select>
          </FormItem>
          <FormItem label="付费时长 :">
            <Select v-model="renewalTime">
              <Option
                v-for="(item,index) in timeOptions.renewalTime"
                :value="item.value"
                :key="index"
              >{{ item.label }}</Option>
            </Select>
          </FormItem>
          <div class="renewal-info">
            <ul>
              <li>
                <span>主机名称：</span>
                {{renewalInfo.computername}}
              </li>
              <li>
                <span>操作系统：</span>
                {{renewalInfo.templatename}}
              </li>
              <li>
                <span>主机配置：</span>
                {{renewalInfo.serviceoffername}}
              </li>
              <li>
                <span>剩余时长：</span>
                {{renewalInfo.endtime}}
              </li>
            </ul>
          </div>
          <FormItem label="是否同时续费绑定IP与磁盘" v-if="isDisks||isIps">
            <CheckboxGroup @on-change="bindRenewal" v-model="bindRenewalVal">
              <Checkbox label="ip" v-if="isIps">续费绑定IP</Checkbox>
              <Checkbox label="disk" v-if="isDisks">续费磁盘</Checkbox>
            </CheckboxGroup>
          </FormItem>
          <div class="renewal-upgrade">
            <p>
              如果现在配置内容不支持使用，可进行
              <span style="color:#333;cursor:not-allowed">主机升级</span>
            </p>
          </div>
        </Form>
        <div style="font-size:16px;">
          资费
          <span style="color: #2b85e4; text-indent:4px;display:inline-block;">
            现价
            <span style="font-size:24px;">￥{{cost}}/</span>
          </span>
          <!-- <span v-if="renewalTime != ''">/</span>
          <span style="font-size: 15px;">{{renewalTime}}<span v-if="renewalType == 'year' && renewalTime != ''">年</span>
          <span v-if="renewalType == 'month' && renewalTime != ''">月</span></span>-->
          <span style="text-decoration: line-through">原价{{originCost}}</span>
        </div>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="ghost" @click="showModal.renewal = false">取消</Button>
        <Button type="primary" @click="renewalOk" :disabled="cost=='--'">确认续费</Button>
      </div>
    </Modal>
    <!-- 实时续费 -->
    <Modal v-model="showModal.Renew" width="590" :scrollable="true">
      <div slot="header" class="modal-header-border">
        <span class="universal-modal-title">续费主机</span>
      </div>
      <div class="universal-modal-content-flex">
        <p style="margin-bottom: 20px">
          温馨提示：当前资源已欠费，如需激活需要
          <span class="bluetext">1小时费用</span>
        </p>
        <Form :model="RenewForm" label-position="left">
          <Form-item label="所需资费">
            <span style="font-size: 25px;color: #2b85e4;">￥{{RenewForm.cost}}</span>
          </Form-item>
        </Form>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="ghost" @click="showModal.Renew = false">取消</Button>
        <Button type="primary" @click="renewOk">确定</Button>
      </div>
    </Modal>
    <!-- 制作快照弹窗 -->
    <Modal v-model="showModal.backup" width="590" :scrollable="true" class="create-snas-modal">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">制作快照</span>
      </p>
      <div class="universal-modal-content-flex">
        <p class="mb20">
          您正为
          <span class="bluetext">{{currentHostname}}</span>制作快照
        </p>
        <Form ref="backupForm" :model="backupForm" :rules="backupFormRule">
          <FormItem label="快照名称" prop="name">
            <Input v-model="backupForm.name" placeholder="请输入2-4094范围内任意数字" :maxlength="15"></Input>
          </FormItem>
          <div style="padding-top: 11px;margin-right: 100px;">
            <div style="font-size: 14px;color:#495060;margin-bottom: 15px">
              是否保存内存信息
              <Poptip trigger="hover" width="400">
                <Icon type="ios-help-outline" style="color:#2A99F2;font-size:16px;"></Icon>
                <div slot="content">
                  <div>
                    您可以选择在制作快照的时候保存您主机的当前运行状态。当您选择“保存”之时，
                    当前主机的内存将被记录，在您对快照执行回滚操作的时候，也只能在开机状态下执行；当您选择“不保存”时
                    此次快照将不记录主机内存信息，您在通过该快照回滚的时候只能在关机状态下执行。
                  </div>
                </div>
              </Poptip>
            </div>
            <RadioGroup v-model="backupForm.memory">
              <Radio label="1">保存</Radio>
              <Radio label="0">不保存</Radio>
            </RadioGroup>
          </div>
        </Form>
        <p class="modal-text-hint-bottom">
          提示：云主机快照为每块磁盘提供
          <span>{{ totalQuota }}个</span>快照额度，当某个主机的快照数量达到额度上限，在创建新的快照任务时，系统会删除由自动快照策略所生成的时间最早的自动快照点
        </p>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="ghost" @click="showModal.backup=false">取消</Button>
        <Button type="primary" @click="backupSubmit('backupForm')">制作快照</Button>
      </div>
    </Modal>
    <!-- 解绑公网ip确认框 -->
    <Modal v-model="showModal.unbindIP" :scrollable="true" :closable="false" :width="390">
      <p slot="header" class="modal-header-border">
        <Icon type="android-alert" class="yellow f24 mr10" style="font-size: 20px"></Icon>
        <span class="universal-modal-title">解绑IP</span>
      </p>
      <div class="modal-content-s">
        <div>
          <p class="lh24">您确认解绑选中主机的公网IP吗</p>
          <p class="attention">注意：解绑弹性IP不等于释放弹性IP，IP解绑之后您还需要到弹性IP列表中释放所选IP。</p>
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
import $store from '@/vuex'
import axios from 'axios'
import line from '@/echarts/hostManage/line'
import bar from '@/echarts/hostManage/bar'
import regExp from '../../util/regExp'

export default {
  data () {
    return {
      guideStep: 1,
      regExpObj: {
        password: /(?!(^[^a-z]+$))(?!(^[^A-Z]+$))(?!(^[^\d]+$))^[\w~*:,]{8,30}$/
      },
      showModal: {
        selectAuthType: false,
        balance: false,
        publicIPHint: false,
        bindIP: false,
        rename: false,
        ratesChange: false,
        renewal: false,
        Renew: false,
        backup: false,
        mirror: false,
        unbindIP: false,
        delHostHint: false,
        delHost: false,
        resetPassword: false
      },
      hostListColumns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          ellipsis: true,
          width: 120,
          renderHeader: (h, params) => {
            return h('ul', {}, [
              h('li', {}, '用户名称 / '),
              h('li', {}, '唯一名称')
            ])
          },
          render: (h, params) => {
            let text_1 = params.row.computername ? params.row.computername : '----'
            let text_2 = params.row.instancename ? params.row.instancename : '----'
            if ((params.row.status == 1 && this.auth && this.auth.checkstatus == 0) || (params.row.status == 1 && this.authInfoPersion && this.authInfoPersion.checkstatus == 0)) {
              return h('ul', {}, [
                h('li', {
                  style: {
                    cursor: 'pointer',
                    color: '#2A99F2'
                  },
                  on: {
                    click: () => {
                      sessionStorage.setItem('manageId', params.row.id)
                      this.$router.push('/databaseManage')
                    }
                  }
                }, text_1 + ' / '),
                h('li', {
                  style: {
                    cursor: 'pointer',
                    color: '#2A99F2'
                  },
                  on: {
                    click: () => {
                      sessionStorage.setItem('manageId', params.row.id)
                      this.$router.push('databaseManage')
                    }
                  }
                }, text_2)
              ])
            } else {
              return h('ul', {}, [
                h('li', {}, text_1 + ' / '),
                h('li', {}, text_2)
              ])
            }
          }
        },
        {
          title: '状态/监控',
          width: 110,
          filters: [
            {
              label: '开启',
              value: 1
            },
            {
              label: '关机',
              value: 2
            },
            {
              label: '欠费',
              value: 3
            },
            {
              label: '异常',
              value: 4
            }
          ],
          filterMultiple: false,
          filterMethod (value, row) {
            if (value === 1) {
              return row.status == 1 && row.dbStatus == 1;
            } else if (value === 2) {
              return row.status == 1 && row.dbStatus == 0;
            } else if (value === 3) {
              return row.status == 0;
            } else if (value === 4) {
              return row.status == -1;
            }
          },
          render: (h, params) => {
            let restart = params.row.restart ? params.row.restart : 0
            // let restore = params.row.restore ? params.row.restore : 0
            // let resetpwd = params.row.resetpwd ? params.row.resetpwd : 0
            // let bindip = params.row.bindip ? params.row.bindip : 0
            // let createtemplate = params.row.createtemplate ? params.row.createtemplate : 0
            let icon_1 = require('../../assets/img/host/h-icon1.png')
            let icon_2 = require('../../assets/img/host/h-icon2.png')
            let icon_3 = require('../../assets/img/host/h-icon3.png')
            let icon_4 = require('../../assets/img/host/h-icon4.png')
            let icon_5 = require('../../assets/img/host/h-icon5.png')
            let styleInfo = {
              marginLeft: '5px',
              lineHeight: '16px'
            }
            switch (params.row.status) {
              case -2:
                return h('div', {
                  style: {
                    display: 'flex'
                  }
                }, [
                    h('div', [
                      h('img', {
                        attrs: {
                          src: icon_5
                        }
                      }, ''),
                    ]),
                    h('span', {
                      style: styleInfo
                    }, '删除至回收站')
                  ])
                break
              case -1:
                return h('div', {
                  style: {
                    display: 'flex'
                  }
                }, [
                    h('div', [
                      h('img', {
                        attrs: {
                          src: icon_2
                        }
                      }, ''),
                    ]),
                    h('span', {
                      style: styleInfo
                    }, '异常')
                  ])
                break
              case 0:
                return h('div', {
                  style: {
                    display: 'flex'
                  }
                }, [
                    h('div', [
                      h('img', {
                        attrs: {
                          src: icon_3
                        }
                      }, ''),
                    ]),
                    h('span', {
                      style: styleInfo
                    }, '欠费')
                  ])
                break
              case 1:
                if (params.row.dbStatus == 1) {
                  return h('div', {
                    style: {
                      display: 'flex',
                      cursor: 'pointer',
                    },
                    on: {
                      click: () => {
                        if (this.$refs.monitor.style.width != '600px') {
                          this.showMonitor(params.row.instancename)
                        } else {
                          this.closeMonitor()
                        }
                      }
                    }
                  }, [
                      h('div', [
                        h('img', {
                          attrs: {
                            src: icon_1
                          }
                        }, ''),
                      ]),
                      h('span', {
                        style: styleInfo
                      }, '开启')
                    ])
                } else if (params.row.dbStatus == 0) {
                  return h('div', {
                    style: {
                      display: 'flex',
                      cursor: 'pointer',
                    },
                    on: {
                      click: () => {
                        if (this.$refs.monitor.style.width != '600px') {
                          this.showMonitor(params.row.instancename)
                        } else {
                          this.closeMonitor()
                        }
                      }
                    }
                  }, [
                      h('div', [
                        h('img', {
                          attrs: {
                            src: icon_4
                          }
                        }, ''),
                      ]),
                      h('span', {
                        style: styleInfo
                      }, '关机')
                    ])
                } else if (params.row.dbStatus == 4) {
                  return h('div', {}, [h('Spin', {
                    style: {
                      display: 'inline-block'
                    }
                  }), h('span', { style: styleInfo }, '重启中')])
                } else if (params.row.dbStatus == 6) {
                  return h('div', {}, [h('Spin', {
                    style: {
                      display: 'inline-block'
                    }
                  }), h('span', { style: styleInfo }, '绑定中')])
                } else if (params.row.dbStatus == 7) {
                  return h('div', {}, [h('Spin', {
                    style: {
                      display: 'inline-block'
                    }
                  }), h('span', { style: styleInfo }, '解绑中')])
                } else if (params.row.dbStatus == 3) {
                  return h('div', {}, [h('Spin', {
                    style: {
                      display: 'inline-block'
                    }
                  }), h('span', { style: styleInfo }, '关机中')])
                } else if (params.row.dbStatus == 2) {
                  return h('div', {}, [h('Spin', {
                    style: {
                      display: 'inline-block'
                    }
                  }), h('span', { style: styleInfo }, '开机中')])
                } else if (params.row.status) {
                  return h('div', {
                    style: {
                      display: 'flex'
                    }
                  }, [
                      h('div', [
                        h('img', {
                          attrs: {
                            src: icon_1
                          }
                        }, ''),
                      ]),
                      h('span', {
                        style: styleInfo
                      }, '正常')
                    ])
                }
                break
              case 2:
                return h('div', {}, [h('Spin', {
                  style: {
                    display: 'inline-block'
                  }
                }), h('span', { style: styleInfo }, '创建中')])
                break
            }
          }
        },
        {
          title: '主机配置',
          key: 'serviceoffername',
          render: (h, params) => {
            let textArr = params.row.serviceoffername.split('+')
            let text_1 = 'CPU:' + textArr[0]
            let text_2 = '内存:' + textArr[1]
            return h('ul', {}, [
              h('li', {}, text_1),
              h('li', {}, text_2)
            ])
          }
        },
        {
          title: '镜像系统',
          width: 110,
          key: 'templatename',
          render: (h, params) => {
            let templateName = params.row.templatename.substr(0, 1).toUpperCase() // 用第一个字符判断镜像选用图标
            let icon_1 = require('../../assets/img/host/h-icon12.png')
            let icon_2 = require('../../assets/img/host/h-icon6.png')
            let icon_3 = require('../../assets/img/host/h-icon7.png')
            let icon_4 = require('../../assets/img/host/h-icon8.png')
            let imgStyle = {
              marginRight: '5px',
              width: '16px',
            }
            switch (templateName) {
              case 'W':
                return h('div', {
                  style: {
                    display: 'flex',
                    alignItems: 'center'
                  }
                }, [
                    h('img', {
                      attrs: {
                        src: icon_1,
                        width: '16',
                      },
                      style: imgStyle
                    }, ''),
                    h('span', {}, params.row.templatename)
                  ])
                break
              case 'C':
                return h('div', {
                  style: {
                    display: 'flex',
                    alignItems: 'center'
                  }
                }, [
                    h('img', {
                      attrs: {
                        src: icon_2
                      },
                      style: imgStyle
                    }, ''),
                    h('span', {}, params.row.templatename)
                  ])
                break
              case 'U':
                return h('div', {
                  style: {
                    display: 'flex',
                    alignItems: 'center'
                  }
                }, [
                    h('img', {
                      attrs: {
                        src: icon_3
                      },
                      style: imgStyle
                    }, ''),
                    h('span', {}, params.row.templatename)
                  ])
                break
              case 'D':
                return h('div', {
                  style: {
                    display: 'flex',
                    alignItems: 'center'
                  }
                }, [
                    h('img', {
                      attrs: {
                        src: icon_4
                      },
                      style: imgStyle
                    }, ''),
                    h('span', {}, params.row.templatename)
                  ])
                break
              default:
                return h('span', {}, params.row.templatename)
            }
          }
        },
        {
          title: 'IP地址',
          ellipsis: true,
          render: (h, params) => {
            let text_1 = params.row.publicip ? params.row.publicip + '（公）' : '----'
            let text_2 = params.row.privateip ? params.row.privateip + '（内）' : '----'
            return h('ul', {}, [
              h('li', {}, text_1),
              h('li', {}, text_2)
            ])
          }
        },
        {
          title: '数据库端口',
          ellipsis: true,
          render: (h, params) => {
            if (params.row.status == 1) {
              return h('div', {}, [h('span', {
                style: {
                  marginRight: '10px',
                }
              }, params.row.dbPort), h('span', {
                style: !this.notAuth ? this.styleVisible : this.styleDisable,
                on: {
                  click: () => {
                    if (!this.notAuth) {
                      this.current = params.row
                      this.showModal.beforePortModify = true
                      this.portModifyForm.currentPorts = params.row.dbPort
                      this.currentComputerId = params.row.computerid
                    }
                  }
                }
              }, '修改端口')])
            } else {
              return h('span', {}, params.row.dbPort)
            }
          }
        },
        {
          width: 130,
          renderHeader: (h, params) => {
            return h('ul', {}, [
              h('li', {}, '创建时间 / '),
              h('li', {}, '到期时间')
            ])
          },
          ellipsis: true,
          render: (h, params) => {
            let text_1 = params.row.createtime ? params.row.createtime + ' / ' : '----'
            let text_2 = params.row.endtime ? params.row.endtime : '----'
            return h('ul', {}, [
              h('li', {}, text_1),
              h('li', {}, text_2)
            ])
          }
        },
        {
          title: '计费类型',
          key: 'caseType',
          width: 110,
          filters: [
            {
              label: '包年',
              value: 1
            },
            {
              label: '包月',
              value: 2
            },
            {
              label: '实时',
              value: 3
            },
            {
              label: '7天',
              value: 4
            }
          ],
          filterMultiple: false,
          filterMethod (value, row) {
            if (value === 1) {
              return row.caseType == '1';
            } else if (value === 2) {
              return row.caseType == '2';
            } else if (value === 3) {
              return row.caseType == '3';
            } else if (value === 4) {
              return row.caseType == '4';
            }
          },
          render: (h, params) => {
            let text = params.row.caseType == 1 ? '包年' : params.row.caseType == 2 ? '包月' : params.row.caseType == 3 ? '实时' : '七天'
            return h('span', {}, text)
          }
        },
        {
          title: '操作',
          render: (h, params) => {
            // dbStatus  数据库开启或关闭状态   1开启  0关闭  2开启中  3关闭中   4重启中 5修改端口中 6绑定IP中 7解绑IP中 8数据库扩容中
            // Status 1: 正常   0:余额不足 -1:扣费时除余额不足的其他原因   -2:用户删除实时虚拟机   2创建中   3删除中   5数据库扩容中   6数据库升级中
            if ((!this.auth) || (this.auth && this.auth.authtype == 0 && this.auth.checkstatus != 0) || (!this.authInfoPersion && this.auth && this.auth.authtype == 1 && this.auth.checkstatus != 0) || (this.authInfoPersion && this.authInfoPersion.checkstatus != 0 && this.auth && this.auth.checkstatus != 0)) {
              return h('div', {}, [
                h('p', {
                  style: {
                    lineHeight: '30px',
                    cursor: 'not-allowed'
                  }
                }, '管理'),
                h('p', {
                  style: {
                    lineHeight: '23px',
                    cursor: 'not-allowed'
                  }
                }, '更多操作'),
              ])
            } else {
              switch (params.row.status) {
                case -1:
                  return h('div', {}, [h('span', {
                    style: {
                      cursor: 'pointer',
                      color: '#2A99F2',
                      marginRight: '10px',
                      lineHeight: '74px'
                    },
                    on: {
                      click: () => {
                        window.open('tencent://message/?uin=1014172393&amp;Site=www.cloudsoar.com&amp;Menu=yes', '_blank')
                      }
                    }
                  }, '联系客服'), h('span', {
                    style: {
                      cursor: 'pointer',
                      color: '#2A99F2'
                    },
                    on: {
                      click: () => {
                        this.hostCurrentSelected = params.row
                        this.hostDelete(2)
                      }
                    }
                  }, '删除')])
                  break
                case 0:
                  return h('div', {}, [h('span', {
                    style: {
                      cursor: 'pointer',
                      color: '#2A99F2',
                      marginRight: '10px',
                      lineHeight: '74px'
                    },
                    on: {
                      click: () => {
                        this.hostCurrentSelected = params.row
                        if (this.hostCurrentSelected.freeHostVmConfigId) {
                          sessionStorage.setItem('unfreezeId', this.hostCurrentSelected.freeHostVmConfigId)
                          this.$router.push({ path: 'ThawDeposit', query: { from: "host" } })
                        } else {
                          this.renewHost(this.hostCurrentSelected)
                        }
                      }
                    }
                  }, '续费'), h('span', {
                    style: {
                      cursor: 'pointer',
                      color: '#2A99F2'
                    },
                    on: {
                      click: () => {
                        this.hostCurrentSelected = params.row
                        this.hostDelete(2)
                      }
                    }
                  }, '删除')])
                  break
                case 1:
                  if (params.row.dbStatus == 1) {
                    return h('div', {}, [
                      h('p', {
                        style: {
                          lineHeight: '30px',
                          cursor: 'pointer',
                          color: '#2A99F2'
                        },
                        on: {
                          click: () => {
                            sessionStorage.setItem('manageId', params.row.id)
                            this.$router.push('databaseManage')
                          }
                        }
                      }, '管理'),
                      h('Dropdown', {
                        style: {
                          marginBottom: '5px'
                        },
                        props: {
                          transfer: true
                        },
                        on: {
                          'on-click': (type) => {
                            this.hostCurrentSelected = params.row
                            switch (type) {
                              case 'resetPassword':
                                this.hostResetPassword(2)
                                break
                              case 'joinLoadBalance':
                                this.joinBalance()
                                break
                              case 'bindingIP':
                                this.bindIP()
                                break
                              case 'rename':
                                this.renameForm.hostName = ''
                                this.showModal.rename = true
                                break
                              case 'ratesChange':
                                if (this.hostCurrentSelected.caseType == 3) {
                                  this.ratesChange()
                                } else {
                                  this.$Message.info('资费变更只适用于实时计费的资源')
                                }
                                break
                              case 'hostRenew':
                                if (this.hostCurrentSelected.freeHostVmConfigId) {
                                  sessionStorage.setItem('unfreezeId', this.hostCurrentSelected.freeHostVmConfigId)
                                  this.$router.push({ path: 'ThawDeposit', query: { from: "host" } })
                                } else {
                                  this.renewHost(this.hostCurrentSelected)
                                }
                                break
                              case 'makeSnapshot':
                                this.backupForm.backupName = ''
                                this.backupForm.description = ''
                                this.currentHostname = this.hostCurrentSelected.computername
                                this.showModal.backup = true
                                break
                              case 'unbindIP':
                                if (this.hostCurrentSelected.publicip) {
                                  this.showModal.unbindIP = true
                                } else {
                                  this.$Message.warning('该主机没有绑定公网IP')
                                }
                                break
                              case 'shutdown':
                                this.hostShutdown(2)
                                break
                              case 'restart':
                                this.hostRestart(2)
                                break
                              case 'deleteHost':
                                this.hostDelete(2)
                                break
                            }
                          }
                        }
                      }, [h('a', {}, ['更多操作 ', h('Icon', { attrs: { type: 'arrow-down-b' } })]), h('DropdownMenu', { slot: 'list' }, [
                        h('DropdownItem', {
                          attrs: {
                            name: 'bindingIP'
                          }
                        }, '绑定IP'),
                        h('DropdownItem', {
                          attrs: {
                            name: 'unbindIP'
                          }
                        }, '解绑公网IP'),
                        h('DropdownItem', {
                          attrs: {
                            name: 'ratesChange'
                          }
                        }, '数据库扩容'),
                        h('DropdownItem', {
                          attrs: {
                            name: 'hostRenew'
                          }
                        }, '数据库续费'),
                        h('DropdownItem', {
                          attrs: {
                            name: 'makeSnapshot'
                          }
                        }, '手动备份'),
                        h('DropdownItem', {
                          attrs: {
                            name: 'shutdown'
                          }
                        }, '关闭数据库'),
                        h('DropdownItem', {
                          attrs: {
                            name: 'restart'
                          }
                        }, '重启数据库'),
                        h('DropdownItem', {
                          attrs: {
                            name: 'deleteHost'
                          }
                        }, '删除')])])
                    ])
                  } else {
                    return h('div', {}, [
                      h('p', {
                        style: {
                          lineHeight: '30px',
                          cursor: 'pointer',
                          color: '#2A99F2'
                        },
                        on: {
                          click: () => {
                            sessionStorage.setItem('manageId', params.row.id)
                            this.$router.push('databaseManage')
                          }
                        }
                      }, '管理'),
                      h('Dropdown', {
                        style: {
                          marginBottom: '5px'
                        },
                        props: {
                          transfer: true
                        },
                        on: {
                          'on-click': (type) => {
                            this.hostCurrentSelected = params.row
                            switch (type) {
                              case 'resetPassword':
                                this.hostResetPassword(2)
                                break
                              case 'joinLoadBalance':
                                this.joinBalance()
                                break
                              case 'bindingIP':
                                this.bindIP()
                                break
                              case 'rename':
                                this.renameForm.hostName = ''
                                this.showModal.rename = true
                                break
                              case 'ratesChange':
                                if (this.hostCurrentSelected.caseType == 3) {
                                  this.ratesChange()
                                } else {
                                  this.$Message.info('资费变更只适用于实时计费的资源')
                                }
                                break
                              case 'hostUpgrade':
                                this.$http.get('network/VMIsHaveSnapshot.do', {
                                  params: {
                                    VMId: this.hostCurrentSelected.computerid
                                  }
                                }).then(response => {
                                  if (response.status == 200 && response.data.status == 1) {
                                    if (!response.data.result) {
                                      this.$Modal.confirm({
                                        title: '提示',
                                        content: '您的主机有快照，无法升级，请删除快照再试',
                                        scrollable: true,
                                        okText: '删除快照',
                                        onOk: () => {
                                          this.$router.push('snapshot')
                                        }
                                      })
                                    } else {
                                      sessionStorage.setItem('upgradeId', this.hostCurrentSelected.computerid)
                                      this.$router.push('upgrade')
                                    }
                                  }
                                })
                                break
                              case 'hostRenew':
                                if (this.hostCurrentSelected.freeHostVmConfigId) {
                                  sessionStorage.setItem('unfreezeId', this.hostCurrentSelected.freeHostVmConfigId)
                                  this.$router.push({ path: 'ThawDeposit', query: { from: "host" } })
                                } else {
                                  this.renewHost(this.hostCurrentSelected)
                                }
                                break
                              case 'makeSnapshot':
                                this.backupForm.backupName = ''
                                this.backupForm.description = ''
                                this.currentHostname = this.hostCurrentSelected.computername
                                this.showModal.backup = true
                                break
                              case 'makeMirror':
                                this.mirrorForm.mirrorName = ''
                                this.mirrorForm.description = ''
                                this.showModal.mirror = true
                                break
                              case 'unbindIP':
                                if (this.hostCurrentSelected.publicip) {
                                  this.showModal.unbindIP = true
                                } else {
                                  this.$Message.warning('该主机没有绑定公网IP')
                                }
                                break
                              case 'startingUp':
                                this.hostStart(2)
                                break
                              case 'deleteHost':
                                this.hostDelete(2)
                                break
                            }
                          }
                        }
                      }, [h('a', {
                        style: {
                          marginBottom: '5px'
                        }
                      }, ['更多操作 ', h('Icon', { attrs: { type: 'arrow-down-b' } })]), h('DropdownMenu', { slot: 'list' }, [
                        h('DropdownItem', {
                          attrs: {
                            name: 'bindingIP'
                          }
                        }, '绑定IP'),
                        h('DropdownItem', {
                          attrs: {
                            name: 'unbindIP'
                          }
                        }, '解绑公网IP'),
                        h('DropdownItem', {
                          attrs: {
                            name: 'ratesChange'
                          }
                        }, '数据库扩容'),
                        h('DropdownItem', {
                          attrs: {
                            name: 'hostRenew'
                          }
                        }, '数据库续费'),
                        h('DropdownItem', {
                          attrs: {
                            name: 'hostUpgrade'
                          }
                        }, '数据库升级'),
                        h('DropdownItem', {
                          attrs: {
                            name: 'makeSnapshot'
                          }
                        }, '手动备份'),
                        h('DropdownItem', {
                          attrs: {
                            name: 'startingUp'
                          }
                        }, '开启数据库'),
                        h('DropdownItem', {
                          attrs: {
                            name: 'deleteHost'
                          }
                        }, '删除')])])
                    ])
                  }
                  break
                default:
                  return h('div', {}, [
                    h('p', {
                      style: {
                        lineHeight: '30px',
                        cursor: 'not-allowed'
                      }
                    }, '管理'),
                    h('p', {
                      style: {
                        lineHeight: '23px',
                        cursor: 'not-allowed'
                      }
                    }, '更多操作'),
                  ])
                  break
              }
            }
          }
        },
      ],
      hostListData: [],
      hostPages: 0,
      pageSize: 6,
      currentPage: 1,
      hostSelection: [],
      hostCurrentSelected: null,

      hostDelWay: 1, // 1：点击按钮删除主机 2： 点击更多操作删除；原因是参数传的不同
      delHostMessage: '',
      resetPasswordWay: 1, // 1：点击顶部更多操作重置 2： 点击行内更多操作重置；原因是参数传的不同,
      resetPasswordHostData: [],
      resetPasswordForm: {
        password: '',
        passwordAffirm: '',
        agreeRule: false,
        hintGrade: 0,
        errorMsg: 'passwordHint',
        passwordHint: false,
        //密码强度
        firstDegree: false,
        secondDegree: false,
        thirdDegree: false
      },
      listLoadBalanceRole: [],
      loadBalanceForm: {
        loadbalanceroleid: ''
      },
      loadBalanceFormRule: {
        loadbalanceroleid: [
          { required: true, message: '请选择', trigger: 'change' }
        ]
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
      renameForm: {
        hostName: ''
      },
      renameFormRule: {
        hostName: [
          { required: true, validator: regExp.validaRegisteredName, trigger: 'blur' }
        ]
      },
      timeOptions: {
        renewalType: [{ label: '包年', value: 'year' }, { label: '包月', value: 'month' }],
        renewalTime: [],
        year: [{ label: '1年', value: 1 }, { label: '2年', value: 2 }, { label: '3年', value: 3 }],
        month: [{ label: '1月', value: 1 }, { label: '2月', value: 2 }, { label: '3月', value: 3 }, {
          label: '4月',
          value: 4
        }, { label: '5月', value: 5 }, { label: '6月', value: 6 }, { label: '7月', value: 7 }, {
          label: '8月',
          value: 8
        }, { label: '9月', value: 9 }, { label: '10月', value: 10 }]
      },
      // 变更资费相关
      ratesChangeType: '',
      ratesChangeTime: '',
      originRatesChangeCost: '--',
      ratesChangeCost: '--',
      relevanceAlteration: [],
      relevanceDisks: '',
      relevanceIps: '',
      // 续费相关
      renewalInfo: {},
      renewalType: '',
      renewalTime: '',
      bindRenewalVal: [],
      isDisks: '',
      isIps: '',
      originCost: '--',
      cost: '--',
      RenewForm: {
        cost: 0,
        id: ''
      },
      backupForm: {
        name: '',
        memory: '1'
      },
      currentHostname: [],
      backupFormRule: {
        name: [
          { required: true, validator: regExp.validaRegisteredName, trigger: 'blur' }
        ]
      },
      mirrorForm: {
        mirrorName: '',
        description: ''
      },
      mirrorFormRule: {
        mirrorName: [
          { required: true, validator: regExp.validaRegisteredName, trigger: 'blur' }
        ],
      },
      monitorName: '',
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
        }
      ],
      currentData: this.getCurrentDate(),
      totalQuota: '',
      hostTimer: null
    }
  },
  created () {
    this.toggleZone(this.$store.state.zone.zoneid)
    // 用户未认证，弹出认证提示框
    if (this.$store.state.authInfo == null) {
      this.showModal.selectAuthType = true
    }
    if (sessionStorage.getItem('isSeeHint')) {
      this.guideStep = 0
    }
    this.getHostList()
    this.getResourceAllocation()
  },
  methods: {
    // 获取资源配额
    getResourceAllocation () {
      this.$http.get('user/personalCenterResourceQuota.do', {
        params: {}
      }).then(res => {
        if (res.status == 200 && res.data.status == 1) {
          this.totalQuota = res.data.result[1].totalQuota
        }
      })
    },
    toggleZone (zoneId) {
      // 切换默认区域
      axios.get('user/setDefaultZone.do', { params: { zoneId: zoneId } }).then(response => {
      })
      for (var zone of this.$store.state.zoneList) {
        if (zone.zoneid == zoneId) {
          $store.commit('setZone', zone);
        }
      }
    },
    hideEvent (name) {
      if (name !== 'resetPassword') {
        if (this.hostSelection.length !== 1) {
          return false
        }
        this.hostCurrentSelected = this.hostSelection[0]
        switch (name) {
          case 'joinLoadBalance':
            this.joinBalance()
            break
          case 'bindingIP':
            this.bindIP()
            break
          case 'rename':
            this.renameForm.hostName = ''
            this.showModal.rename = true
            break
          case 'ratesChange':
            if (this.hostCurrentSelected.caseType == 3) {
              this.ratesChange()
            }
            break
          case 'renewal':
            if (this.hostCurrentSelected.freeHostVmConfigId) {
              sessionStorage.setItem('unfreezeId', this.hostCurrentSelected.freeHostVmConfigId)
              this.$router.push({ path: 'ThawDeposit', query: { from: "host" } })
            } else {
              this.renewHost(this.hostCurrentSelected)
            }
            break
          case 'backup':
            this.backupForm.backupName = ''
            this.backupForm.description = ''
            this.currentHostname = this.hostCurrentSelected.computername
            this.showModal.backup = true
            break
          case 'mirror':
            if (this.hostCurrentSelected.status == 1 && this.hostCurrentSelected.dbStatus == 0) {
              this.mirrorForm.mirrorName = ''
              this.mirrorForm.description = ''
              this.showModal.mirror = true
            }
            break
          case 'unbindIP':
            if (this.hostCurrentSelected.publicip) {
              this.showModal.unbindIP = true
            } else {
              this.$Message.warning('该主机没有绑定公网IP')
            }
            break
          case 'upgrade':
            if (this.hostCurrentSelected.status == 1 && this.hostCurrentSelected.dbStatus == 0) {
              this.$http.get('network/VMIsHaveSnapshot.do', {
                params: {
                  VMId: this.hostCurrentSelected.computerid
                }
              }).then(response => {
                if (response.status == 200 && response.data.status == 1) {
                  if (!response.data.result) {
                    this.$Modal.confirm({
                      title: '提示',
                      content: '您的主机有快照，无法升级，请删除快照再试',
                      scrollable: true,
                      okText: '删除快照',
                      onOk: () => {
                        this.$router.push('snapshot')
                      }
                    })
                  } else {
                    sessionStorage.setItem('upgradeId', this.hostCurrentSelected.computerid)
                    this.$router.push('upgrade')
                  }
                }
              })
            }
            break
        }
      } else {
        if (this.hostSelection.length > 5) {
          this.$Message.info('重置密码至多选择 5 项')
          return false
        }
        this.hostResetPassword(1)
      }
    },
    getHostList () {
      let url = 'database/listDB.do'
      this.$http.get(url, {
        params: {
          page: this.currentPage,
          pageSize: this.pageSize
        }
      }).then(res => {
        if (res.data.status == 1 && res.status == 200) {
          this.hostListData = res.data.result.info
          this.hostPages = res.data.result.count
          let ids = []
          this.hostListData.forEach(host => {
            if (host.status == 2 || host.status == -2) {
              host._disabled = true
              ids.push(host.id)
            }
          })
          if (ids.length !== 0) {
            this.timingRefresh(ids + '')
          }
          if ((!this.auth) || (this.auth && this.auth.authtype == 0 && this.auth.checkstatus != 0) || (!this.authInfoPersion && this.auth && this.auth.authtype == 1 && this.auth.checkstatus != 0) || (this.authInfoPersion && this.authInfoPersion.checkstatus != 0 && this.auth && this.auth.checkstatus != 0)) {
            this.hostListData.forEach(host => {
              host._disabled = true
            })
          }
        }
      })
    },
    changePage (page) {
      this.currentPage = page
      this.hostSelection = []
      this.getHostList()
    },
    hostSelectionChange (selected) {
      this.hostSelection = selected
    },
    /* 局部刷新 */
    timingRefresh (ids) {
      this.hostTimer = setInterval(() => {
        let url = 'database/listDB.do'
        this.$http.get(url, {
          params: {
            id: ids
          }
        }).then(res => {
          if (res.data.status == 1 && res.status == 200) {
            let locality = res.data.result.info
            let flag = locality.some(item => {
              return item.status == 2 || item.status == -2
            }) // 操作的主机中是否有过渡状态，没有就清除定时器，取消刷新
            if (!flag) {
              this.hostListData.forEach((host, index) => {
                locality.forEach(item => {
                  if (host.id == item.id) {
                    this.hostListData.splice(index, 1, item)
                  }
                })
              })
              clearInterval(this.hostTimer)
            } else {
              this.hostListData.forEach((host, index) => {
                locality.forEach(item => {
                  if (host.id == item.id && item.status == 1) {
                    this.hostListData.splice(index, 1, item)
                  }
                })
              })
            }
          }
        })
      }, 3000)
    },
    // 通过val来区分是批量选择的还是单个列表里操作的
    hostShutdown () {
      let url = 'database/stopDB.do'
      this.$http.get(url, {        params: {
          DBId: this.hostCurrentSelected.computerid,
        }      }).then(res => {
        if (res.status === 200 && res.data.status === 1) {
          this.$Message.success(res.data.message)
          this.timingRefresh(this.hostCurrentSelected.id)
          this.hostSelection = []
        } else {
          this.getHostList()
          this.$message.info({
            content: res.data.message
          })
        }
      })
    },
    hostStart () {
      let url = 'database/startDB.do'
      this.$http.get(url, {        params: {
          DBId: this.hostCurrentSelected.computerid
        }      }).then(res => {
        if (res.status === 200 && res.data.status === 1) {
          this.$Message.success(res.data.message)
          this.timingRefresh(this.hostCurrentSelected.id)
          this.hostSelection = []
        } else {
          this.getHostList()
          this.$message.info({
            content: res.data.message
          })
        }
      })
    },
    hostRestart (val) {
      let params = {}
      if (val == 1) {
        this.hostListData.forEach(host => {
          this.selectHostIds.forEach(item => {
            if (host.id == item) {
              host.status = 2
              host.restart = 1
              host._disabled = true
            }
          })
        })
        params = {
          VMId: this.selectHostComputerIds + ''
        }
      } else {
        this.hostListData.forEach(host => {
          if (host.id == this.hostCurrentSelected.id) {
            host.status = 2
            host.restart = 1
            host._disabled = true
          }
        })
        params = {
          VMId: this.hostCurrentSelected.computerid,
        }
      }
      let url = 'information/rebootVirtualMachine.do'
      this.$http.get(url, {
        params: params
      }).then(res => {
        if (res.status === 200 && res.data.status === 1) {
          this.$Message.success(res.data.message)
          if (val == 1) {
            this.timingRefresh(this.selectHostIds + '')
          } else {
            this.timingRefresh(this.hostCurrentSelected.id)
          }
          this.hostSelection = []
        } else {
          this.getHostList()
          this.$message.info({
            content: res.data.message
          })
        }
      })
    },
    hostDelete (val) {
      this.delHostMessage = ''
      this.hostDelWay = val
      if (val === 1) {
        /*          if (this.hostSelection.length > 5) {
                    this.$Message.info('删除主机至多选择 5 项')
                    return
                  }*/
        this.showModal.delHost = true
      } else {
        this.showModal.delHost = true
      }
    },
    delHostOk () {
      this.showModal.delHostHint = false;
      let params = {}
      if (this.hostDelWay === 1) {
        this.hostListData.forEach(host => {
          this.selectHostIds.forEach(item => {
            if (host.id == item) {
              host.status = -2
              host._disabled = true
            }
          })
        })
        params = {
          id: this.selectHostIds + ''
        }
      } else {
        this.hostListData.forEach(host => {
          if (host.id == this.hostCurrentSelected.id) {
            host.status = -2
            host._disabled = true
          }
        })
        params = {
          id: this.hostCurrentSelected.id,
        }
      }
      let url = 'information/deleteVM.do'
      this.$http.get(url, {
        params: params
      }).then(res => {
        this.showModal.delHost = false
        if (res.status === 200 && res.data.status === 1) {
          this.$Message.success(res.data.message)
          if (this.hostDelWay === 1) {
            this.timingRefresh(this.selectHostIds + '')
          } else {
            this.timingRefresh(this.hostCurrentSelected.id)
          }
          this.hostSelection = []
        } else {
          this.getHostList()
          this.$message.info({
            content: res.data.message
          })
        }
      })
    },
    hostResetPassword (val) {
      this.resetPasswordWay = val
      this.resetPasswordForm.password = ''
      this.resetPasswordForm.hintGrade = 0
      this.resetPasswordForm.passwordAffirm = ''
      if (val === 1) {
        if (this.hostSelection.length === 0) {
          return false
        }
        this.resetPasswordHostData = this.hostSelection
        this.showModal.resetPassword = true
      } else {
        this.resetPasswordHostData = []
        this.resetPasswordHostData[0] = this.hostCurrentSelected
        this.showModal.resetPassword = true
      }
    },
    toManage (item) {
      sessionStorage.setItem('manageId', item.id)
      this.$router.push('databaseManage')
    },
    changeResetPasswordType (name) {
      this.$refs[name].type === 'password' ? this.$refs[name].type = 'text' : this.$refs[name].type = 'password'
    },
    verifyPassword () {
      if (this.regExpObj.password.test(this.resetPasswordForm.password)) {
        this.resetPasswordForm.errorMsg = 'passwordHintTwo'
      } else {
        this.resetPasswordForm.errorMsg = 'passwordHint'
      }
    },
    resetPasswordNext () {
      let flag = true
      this.resetPasswordForm.errorMsg = ''
      this.resetPasswordHostData.forEach((item, index) => {
        if (item.changepassword && !item.currentPassword) {
          item.errorMsg = 'passwordIsEmpty'
          this.resetPasswordHostData.splice(index, 1, item)
          flag = false
        }
      })
      if (!(this.resetPasswordForm.firstDegree && this.resetPasswordForm.secondDegree && this.resetPasswordForm.thirdDegree)) {
        this.resetPasswordForm.errorMsg = 'passwordUndercapacity'
        return false
      }
      if (this.resetPasswordForm.password !== this.resetPasswordForm.passwordAffirm) {
        this.resetPasswordForm.errorMsg = 'passwordAffirm'
        return false
      }
      if (flag) {
        this.resetPasswordForm.hintGrade = 1
      }
    },
    resetPasswordOk () {
      let flag = true
      this.resetPasswordForm.errorMsg = ''
      this.resetPasswordHostData.forEach((item, index) => {
        if (item.changepassword && !item.currentPassword) {
          item.errorMsg = 'passwordIsEmpty'
          this.resetPasswordHostData.splice(index, 1, item)
          flag = false
        }
      })
      if (flag) {
        let url = 'information/resetPasswordForVirtualMachineBatch.do'
        let list = []
        this.resetPasswordHostData.forEach((item, index) => {
          if (item.changepassword && item.currentPassword) {
            list.push({
              VMId: item.computerid,
              oldPassword: item.currentPassword,
              VMName: item.instancename
            })
          } else {
            list.push({
              VMId: item.computerid,
              VMName: item.instancename
            })
          }
        })
        let params = {
          password: this.resetPasswordForm.password,
          list: JSON.stringify(list)
        }
        this.$http.post(url, params).then(res => {
          if (res.status == 200 && res.data.status == 1) {
            this.$Message.success(res.data.message)
            this.showModal.resetPassword = false
            this.hostListData.forEach(host => {
              this.resetPasswordHostData.forEach(item => {
                if (host.id == item.id) {
                  host.status = 2
                  // host.resetpwd = 1
                  host._disabled = true
                }
              })
            })
            let ids = this.resetPasswordHostData.map(item => {
              return item.id
            })
            this.timingRefresh(ids + '')
            this.hostSelection = []
          } else if (res.status == 200 && res.data.status == 2) {
            if (res.data.result.length != 0) {
              res.data.result.forEach(name => {
                this.resetPasswordHostData.forEach((item, index) => {
                  if (item.computerid == name.errhost) {
                    item.errorMsg = 'passwordMistake'
                    this.resetPasswordHostData.splice(index, 1, item)
                  }
                })
              })
            }
          } else {
            this.$message.info({
              content: res.data.message
            })
          }
        })
      }
    },
    //加入负载均衡
    joinBalance () {
      axios.get('information/isloadbananceRoleAndServiceSchemeMatching.do', {
        params: {
          zoneId: $store.state.zone.zoneid,
          VMIds: this.hostCurrentSelected.computerid,
        }
      }).then(response => {
        if (response.status == 200 && response.data.status == 1) {
          // 成功的情况
          axios.get('information/listVMByComputerId.do', {
            params: {
              VMId: this.hostCurrentSelected.computerid,
              zoneId: this.hostCurrentSelected.zoneid
            }
          }).then((response) => {
            if (response.status == 200 && response.data.status == 1) {
              if (response.data.result.loadbalance != '') {
                this.$message.confirm({
                  title: '提示',
                  content: `该主机已加入负载均衡：${response.data.result.loadbalance[0]}，若您需要修改主机所属负载均衡请先将主机移出该负载均衡在进行操作`,
                  okText: '移出主机',
                  onOk: () => {
                    axios.get('loadbalance/listBalanceRoleAndVMByVMId.do', {
                      params: {
                        computerId: this.hostCurrentSelected.computerid,
                        zoneId: this.hostCurrentSelected.zoneid
                      }
                    }).then(response => {
                      if (response.status == 200 && response.data.status == 1) {
                        sessionStorage.setItem('balanceInfo', JSON.stringify(response.data.result.loadBalance[0]))
                        this.$router.push('BalanceParticulars')
                      }
                    })
                  }
                })
              } else {
                axios.get('loadbalance/listLoadBalanceRoleVM.do', {
                  params: {
                    zoneId: $store.state.zone.zoneid,
                    VMId: this.hostCurrentSelected.computerid
                  }
                }).then(response => {
                  if (response.status == 200 && response.data.status == 1) {
                    var publicLoadbalance = response.data.result.publicLoadbalance
                    publicLoadbalance.forEach(item => {
                      item.type = '#public'
                    })
                    this.listLoadBalanceRole = publicLoadbalance.concat(response.data.result.internalLoadbalance)
                    this.showModal.balance = true
                  }
                })
              }
            }
          })
        } else if (response.status == 200 && response.data.status == 3) {
          // 需要创建公网负载均衡
          this.$message.confirm({
            title: '提示',
            content: '您还未创建一个负载均衡，请先创建公网负载均衡。',
            okText: '创建负载均衡',
            onOk: () => {
              this.$router.push('balance')
            }
          })
        } else if (response.status == 200 && response.data.status == 4) {
          // 需要创建内网负载均衡
          this.$message.confirm({
            title: '提示',
            content: '您还未创建一个负载均衡，请先创建内网负载均衡。',
            okText: '创建负载均衡',
            onOk: () => {
              this.$router.push('balance')
            }
          })
        } else if (response.status == 200 && response.data.status == 5) {
          // 网络不匹配
          this.$message.confirm({
            title: '提示',
            okText: '调整子网',
            content: '您选择的主机子网的网络服务方案为普通网络，不支持负载均衡。若您需要将该主机加入负载均衡，可将该主机移入子网服务方案为：“公网/私网负载均衡网络”的子网之后再进行加入负载均衡操作。',
            onOk: () => {
              sessionStorage.setItem('vpcId', this.hostCurrentSelected.vpcid)
              this.$router.push('vpcManage')
            }
          })
        } else {
          this.$Message.info(response.data.message)
        }
      })
    },
    // 确定加入负载均衡
    joinBalanceSubm (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.showModal.balance = false
          this.$Message.info('主机正在加入负载均衡，请稍后')
          if (this.loadBalanceForm.loadbalanceroleid.split('#')[1] == 'public') {
            axios.get('loadbalance/assignToLoadBalancerRule.do', {
              params: {
                VMIds: this.hostCurrentSelected.computerid,
                zoneId: this.hostCurrentSelected.zoneid,
                roleId: this.loadBalanceForm.loadbalanceroleid.split('#')[0]
              }
            }).then(response => {
              if (response.status == 200 && response.data.status == 1) {
                this.$Message.success(response.data.message)
              } else {
                this.$message.info({
                  content: response.data.message
                })
              }
              this.loadBalanceForm.loadbalanceroleid == ''
            })
          } else {
            axios.get('loadbalance/assignToInternalLoadBalancerRule.do', {
              params: {
                VMIds: this.hostCurrentSelected.computerid,
                zoneId: this.hostCurrentSelected.zoneid,
                roleId: this.loadBalanceForm.loadbalanceroleid,
                lbId: this.loadBalanceForm.loadbalanceroleid
              }
            })
              .then(response => {
                if (response.status == 200 && response.data.status == 1) {
                  this.$Message.success(response.data.message)
                } else {
                  this.$message.info({
                    content: response.data.message
                  })
                }
                this.loadBalanceForm.loadbalanceroleid == ''
              })
          }
        }
      })
    },
    bindIP () {
      if (this.hostCurrentSelected.publicip) {
        this.$Message.warning('已绑定主机无法再次绑定!')
      } else {
        this.bindForm.publicIP = ''
        axios.get('network/listPublicIp.do', {
          params: {
            useType: 0,
            zoneId: this.hostCurrentSelected.zoneid,
            vpcId: this.hostCurrentSelected.vpcid
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
      }
    },
    bindIpSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.hostListData.forEach(host => {
            if (host.id == this.hostCurrentSelected.id) {
              host.status = 2
              // host.bindip = 1
              host._disabled = true
            }
          })
          this.showModal.bindIP = false
          this.$Message.info({
            content: `<span style="color:#2A99F2">${this.hostCurrentSelected.computername}</span>云主机,正在绑定公网IP`
          })
          this.$http.get('network/enableStaticNat.do', {
            params: {
              ipId: this.bindForm.publicIP,
              VMId: this.hostCurrentSelected.computerid
            }
          }).then(response => {
            if (response.status == 200 && response.data.status == 1) {
              this.timingRefresh(this.hostCurrentSelected.id)
              this.hostSelection = []
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
    checkRenameForm () {
      this.$refs.renameForm.validate((valid) => {
        if (valid) {
          this.showModal.rename = false
          this.$http.post('information/changeVmName.do', {
            vmId: this.hostCurrentSelected.computerid,
            name: this.renameForm.hostName
          }).then(response => {
            if (response.status == 200 && response.data.status == 1) {
              this.$Message.success(response.data.message)
              this.hostSelection = []
              this.getHostList()
            } else {
              this.$message.info({
                content: response.data.message
              })
            }
          })
        }
      })
    },
    ratesChange () {
      let url = 'information/listVirtualMachinesById.do'
      axios.get(url, {
        params: {
          VMId: this.hostCurrentSelected.computerid,
          zoneId: this.hostCurrentSelected.zoneid,
          changeCost: '1'
        }
      }).then(response => {
        if (response.status == 200 && response.data.status == 1) {
          var disks = response.data.result[0].attachDisk.map(item => {
            return item.id
          })
          this.relevanceDisks = disks.join()
          var ips = response.data.result[0].attachPublicIp.map(item => {
            return item.id
          })
          this.relevanceIps = ips.join()
          this.relevanceAlteration = ['ip', 'disk']
          this.ratesChangeType = ''
          this.ratesChangeTime = ''
          this.ratesChangeCost = '--'
          this.originRatesChangeCost = '--'
          this.showModal.ratesChange = true
        } else {
          this.$message.info({
            content: response.data.message
          })
        }
      })
    },
    // 确认变更资费
    ratesChange_ok () {
      var selectIp = ''
      var selectDisk = ''
      for (var i = 0; i < this.relevanceAlteration.length; i++) {
        if (this.relevanceAlteration[i] == 'ip') {
          selectIp = this.relevanceIps
        }
        if (this.relevanceAlteration[i] == 'disk') {
          selectDisk = this.relevanceDisks
        }
      }
      var iplist = []
      if (selectIp != '') {
        iplist = selectIp.split(',').map(item => {
          return { type: 2, id: parseInt(item) }
        })
      }
      var disklist = []
      if (selectDisk != '') {
        disklist = selectDisk.split(',').map(item => {
          return { type: 1, id: parseInt(item) }
        })
      }
      var host = [
        { type: 0, id: this.hostCurrentSelected.id }
      ]
      var list = host.concat(iplist, disklist)
      list = JSON.stringify(list)
      let url = 'continue/changeMoney.do'
      this.$http.post(url, {
        list: list,
        timeType: this.ratesChangeType,
        timeValue: this.ratesChangeTime + '',
      }).then(response => {
        if (response.data.status == 1) {
          this.$router.push({ path: 'order' })
        } else {
          this.$message.info({
            content: response.data.message
          })
        }
      })
    },
    bindRenewal () {
      if (this.cost != '--') {
        var selectIp = ''
        var selectDisk = ''
        for (var i = 0; i < this.bindRenewalVal.length; i++) {
          if (this.bindRenewalVal[i] == 'ip') {
            selectIp = this.isIps
          }
          if (this.bindRenewalVal[i] == 'disk') {
            selectDisk = this.isDisks
          }
        }
        this.$http.get('information/getYjPrice.do', {
          params: {
            timeValue: this.renewalTime,
            timeType: this.renewalType,
            hostIdArr: this.hostCurrentSelected.id,
            ipIdArr: selectIp,
            diskArr: selectDisk
          }
        }).then((response) => {
          if (response.status == 200 && response.data.status == 1) {
            this.cost = response.data.result.toFixed(2)
            this.originCost = response.data.result
            if (response.data.cuspon) {
              this.originCost = Number((this.originCost + response.data.cuspon).toFixed(2))
            }
            if (response.data.continueDiscount) {
              this.originCost = (this.originCost + response.data.continueDiscount).toFixed(2)
            }
          } else {
            this.$message.info({
              content: response.data.message
            })
          }
        })
      }
    },
    // 包年/月数据库续费
    renewalOk () {
      var selectIp = ''
      var selectDisk = ''
      for (var i = 0; i < this.bindRenewalVal.length; i++) {
        if (this.bindRenewalVal[i] == 'ip') {
          selectIp = this.isIps
        }
        if (this.bindRenewalVal[i] == 'disk') {
          selectDisk = this.isDisks
        }
      }
      var iplist = []
      if (selectIp != '') {
        iplist = selectIp.split(',').map(item => {
          return { type: 2, id: parseInt(item) }
        })
      }
      var disklist = []
      if (selectDisk != '') {
        disklist = selectDisk.split(',').map(item => {
          return { type: 1, id: parseInt(item) }
        })
      }
      var host = [
        { type: 0, id: this.hostCurrentSelected.id }
      ]
      var list = host.concat(iplist, disklist)
      list = JSON.stringify(list)
      this.$http.post('continue/continueOrder.do', {
        list: list,
        timeType: this.renewalType,
        timeValue: this.renewalTime + ''
      }).then(response => {
        if (response.status == 200 && response.data.status == 1) {
          this.$router.push({ path: 'order' })
        }
      })
    },
    renewalUpgrade () {
      this.$router.push({
        name: 'upgrade'
      })
    },
    // 欠费数据库续费
    renewHost (item) {
      if (item.caseType == 3) {
        if (item.status == 0) {
          this.showModal.Renew = true
          this.RenewForm.id = item.id
          this.RenewForm.cost = item.cpCase
        } else {
          this.$Message.info('请选择包年包月的资源进行续费')
        }
      } else {
        this.renewalInfo = {
          computername: item.computername,
          templatename: item.templatename,
          serviceoffername: item.serviceoffername,
          endtime: item.endtime
        }
        this.renewType()
        this.showModal.renewal = true
      }
    },
    // 查询续费主机下是否有ip或磁盘
    renewType () {
      axios.get('information/listVirtualMachinesById.do', {
        params: {
          VMId: this.hostCurrentSelected.computerid,
          zoneId: this.hostCurrentSelected.zoneid
        }
      }).then(response => {
        if (response.status == 200 && response.data.status == 1) {
          var diskarr = response.data.result[0].attachDisk.map(item => {
            return item.id
          })
          this.isDisks = diskarr.join()
          var iparr = response.data.result[0].attachPublicIp.map(item => {
            return item.id
          })
          this.isIps = iparr.join()
          // 清空续费弹窗数据
          this.bindRenewalVal = ['ip', 'disk']
          this.cost = '--'
          this.originCost = '--'
          this.renewalType = ''
          this.renewalTime = ''
          this.showModal.renewal = true
        }
      })
    },
    // 实时欠费数据库续费确认
    renewOk () {
      this.showModal.Renew = false
      this.$http.get('information/vmRenew.do', {
        params: {
          id: this.RenewForm.id,
        }
      }).then(response => {
        this.getHostList()
        if (response.status == 200 && response.data.status == 1) {
          this.$Message.success('数据库续费成功')
        } else {
          this.$message.info({
            content: response.data.message
          })
        }
      })
    },
    // 生成快照
    backupSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.showModal.backup = false
          axios.get('Snapshot/createVMSnapshot.do', {
            params: {
              VMId: this.hostCurrentSelected.computerid,
              snapshotName: this.backupForm.name,
              memoryStatus: this.backupForm.memory,
              zoneId: this.hostCurrentSelected.zoneid
            }
          }).then(response => {
            if (response.status == 200 && response.data.status == 1) {
              this.$Message.success(response.data.message)
            } else {
              this.$message.info({
                content: response.data.message
              })
            }
          })
        }
      })
    },
    // 创建主机镜像
    mirrorSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.showModal.mirror = false
          this.hostListData.forEach(host => {
            if (host.id == this.hostCurrentSelected.id) {
              host.status = 2
              // host.createtemplate = 1
              host._disabled = true
            }
          })
          axios.get('Snapshot/createTemplate.do', {
            params: {
              rootDiskId: this.hostCurrentSelected.rootdiskid,
              templateName: this.mirrorForm.mirrorName,
              descript: this.mirrorForm.description,
              zoneId: this.hostCurrentSelected.zoneid
            }
          }).then(response => {
            if (response.status == 200 && response.data.status == 1) {
              this.$Message.success({
                content: '请求成功，镜像正在创建中，您可以到<span style="color: #0db4fa;cursor: pointer;">镜像列表</span>查看该镜像。',
                duration: 5
              })
            }
          })
        }
      })
    },
    unbind () {
      this.hostListData.forEach(host => {
        if (host.id == this.hostCurrentSelected.id) {
          host.status = 2
          // host.bindip = 2
          host._disabled = true
        }
      })
      this.showModal.unbindIP = false
      this.$Message.info({
        content: `<span style="color:#2A99F2">${this.hostCurrentSelected.computername}</span>云主机,正在解绑公网IP`
      })
      this.$http.get('network/disableStaticNat.do', {
        params: {
          ipId: this.hostCurrentSelected.publicip,
          VMId: this.hostCurrentSelected.computerid
        }
      }).then(response => {
        if (response.status == 200 && response.data.status == 1) {
          this.timingRefresh(this.hostCurrentSelected.id)
          this.hostSelection = []
        } else {
          this.$message.info({
            content: response.data.message
          })
        }
      })
    },
    showMonitor (name) {
      this.monitorName = name
      this.monitoringList.forEach(item => {
        item.type = '近一天'
        item.showType = '折线'
      })
      this.getComputerMonitor()
      this.$refs.monitor.style.width = '600px'
      this.$refs.monitor.style.opacity = '1'
      this.$refs.monitor.style.display = 'block'
    },
    closeMonitor () {
      this.$refs.monitor.style.width = '0px'
      this.$refs.monitor.style.opacity = '0'
      this.$refs.monitor.style.display = 'none'
    },
    getComputerMonitor () {
      this.$http.get('alarm/getVmAlarmByHour.do', {
        params: {
          vmname: this.monitorName,
          type: 'core'
        }
      }).then(response => {
        if (response.status == 200 && response.data.status == 1) {
          // 用的以前接口数据格式，只有挨个赋值
          let cpuBrokenLine = JSON.parse(JSON.stringify(line))
          let memoryBrokenLine = JSON.parse(JSON.stringify(line))
          cpuBrokenLine.xAxis.data = response.data.result.xaxis
          memoryBrokenLine.xAxis.data = response.data.result.xaxis
          cpuBrokenLine.series.push({
            name: 'CPU使用率（%）',
            type: 'line',
            data: response.data.result.cpuUse,
            barWidth: '15%'
          })
          this.monitoringList[0].chart = cpuBrokenLine
          memoryBrokenLine.series.push({
            name: '内存使用率（%）',
            type: 'line',
            data: response.data.result.memoryUse,
            barWidth: '15%'
          })
          this.monitoringList[1].chart = memoryBrokenLine
        }
      })
    },
    changeMonitorDate (index) {
      let url = this.monitoringList[index].type == '近一天' ? 'alarm/getVmAlarmByHour.do' : 'alarm/getVmAlarmByDay.do'
      let dateType = this.monitoringList[index].type == '最近7天' ? 'week' : 'month'
      this.$http.get(url, {
        params: {
          vmname: this.monitorName,
          type: 'core',
          datetype: dateType
        }
      }).then(res => {
        if (res.data.status == 1) {
          let broken = this.monitoringList[index].type == 'line' ? JSON.parse(JSON.stringify(line)) : JSON.parse(JSON.stringify(bar))
          let type = this.monitoringList[index].showType == '折线' ? 'line' : 'bar'
          let name = index == 0 ? 'CPU使用率（%）' : '内存使用率（%）'
          let data = index == 0 ? res.data.result.cpuUse : res.data.result.memoryUse
          broken.series.push({
            name: name,
            type: type,
            data: data,
            barWidth: '15%'
          })
          broken.xAxis.data = res.data.result.xaxis
          this.monitoringList[index].chart = broken
        } else {
          this.$message.info({
            content: res.data.message
          })
        }
      })
    },
    changeMonitorShowType (index) {
      let broken = {}
      if (this.monitoringList[index].showType == '折线') {
        broken = JSON.parse(JSON.stringify(line))
        broken.series.push({
          name: this.monitoringList[index].chart.series[0].name,
          type: 'line',
          data: this.monitoringList[index].chart.series[0].data,
          barWidth: '15%'
        })
        broken.xAxis.data = this.monitoringList[index].chart.xAxis.data
        this.monitoringList[index].chart = broken
      } else {
        broken = JSON.parse(JSON.stringify(bar))
        broken.series.push({
          name: this.monitoringList[index].chart.series[0].name,
          type: 'bar',
          data: this.monitoringList[index].chart.series[0].data,
          barWidth: '15%'
        })
        broken.xAxis.data = this.monitoringList[index].chart.xAxis.data
        this.monitoringList[index].chart = broken
      }
    },
    getCurrentDate () {
      return new Date().getFullYear().toString() + '.' + (new Date().getMonth() + 1).toString() + '.' + new Date().getDate().toString()
    },
    push (type) {
      this.$store.commit('setPane', { vpc: 'VPC', vpn: 'remote', usercenter: type, expenses: 'accountSummary' })
      this.$router.push('/usercenter')
    },
    guideNext () {
      if (this.hostListData.length != 0) {
        let flag = false
        this.hostListData.forEach(item => {
          if (item.status == 1) {
            flag = true
          }
        })
        if (flag) {
          this.guideStep = 2
        } else {
          this.guideStep = 0
          this.$Message.info('您还没有正常状态的云主机，无法查看指引提示，请先创建主机')
        }
      } else {
        this.guideStep = 0
        this.$Message.info('您还没有云主机，无法查看指引提示，请先创建主机')
      }
    },
    hintToManage () {
      this.guideStep = 0
      this.hostListData.forEach(item => {
        if (item.status == 1) {
          sessionStorage.setItem('guideHint', '1')
          sessionStorage.setItem('manageId', item.id)
          this.$router.push('databaseManage')
        }
      })
    },
    seeAll () {
      sessionStorage.setItem('isSeeHint', '1')
      this.guideStep = 0
    }
  },
  computed: {
    auth () {
      return this.$store.state.authInfo
    },
    authInfoPersion () {
      return this.$store.state.authInfoPersion
    },
    selectHostIds () {
      let ids = []
      if (this.hostSelection.length !== 0) {
        ids = this.hostSelection.map(item => {
          return item.id
        })
      }
      return ids
    },
    selectHostComputerIds () {
      let ids = []
      if (this.hostSelection.length !== 0) {
        ids = this.hostSelection.map(item => {
          return item.computerid
        })
      }
      return ids
    },
    /* 根据主机状态确定可操作功能 */
    shutdownDisabled () {
      let len = this.hostSelection.length
      if (len === 0) {
        return true
      } else {
        // 只有开机状态的主机才能关机
        return !this.hostSelection.every(host => {
          return host.status == 1 && host.dbStatus == 1
        })
      }
    },
    startDisabled () {
      let len = this.hostSelection.length
      if (len === 0) {
        return true
      } else {
        // 只有关机状态的主机才能开机
        return !this.hostSelection.every(host => {
          return host.status == 1 && host.dbStatus == 0
        })
      }
    },
    restartDisabled () {
      let len = this.hostSelection.length
      if (len === 0) {
        return true
      } else {
        // 只有开机状态的主机才能重启
        return !this.hostSelection.every(host => {
          return host.status == 1 && host.dbStatus == 1
        })
      }
    },
    deleteDisabled () {
      let len = this.hostSelection.length
      if (len === 0) {
        return true
      } else {
        // 过渡状态主机不能再次删除
        return this.hostSelection.some(host => {
          return host.status == -2 || host.status == 2
        })
      }
    },
    resetPasswordDisabled () {
      let len = this.hostSelection.length
      if (len === 0) {
        return true
      } else {
        // 开启关闭主机才能重置密码
        return this.hostSelection.some(host => {
          return host.status != 1
        })
      }
    },
    joinLoadBalanceDisabled () {
      let len = this.hostSelection.length
      if (len !== 1) {
        return true
      } else {
        return this.hostSelection[0].status != 1
      }
    },
    bindingIPDisabled () {
      let len = this.hostSelection.length
      if (len !== 1) {
        return true
      } else {
        return this.hostSelection[0].status != 1
      }
    },
    renameDisabled () {
      let len = this.hostSelection.length
      if (len !== 1) {
        return true
      } else {
        return this.hostSelection[0].status != 1
      }
    },
    ratesChangeDisabled () {
      let len = this.hostSelection.length
      if (len !== 1) {
        return true
      } else {
        return !(this.hostSelection[0].status == 1 && this.hostSelection[0].caseType == 3)
      }
    },
    hostRenewDisabled () {
      let len = this.hostSelection.length
      if (len !== 1) {
        return true
      } else {
        return this.hostSelection[0].status != 1 && this.hostSelection[0].status != 0
      }
    },
    hostUpgradeDisabled () {
      let len = this.hostSelection.length
      if (len !== 1) {
        return true
      } else {
        return !(this.hostSelection[0].status == 1 && this.hostSelection[0].dbStatus == 0)
      }
    },
    makeSnapshotDisabled () {
      let len = this.hostSelection.length
      if (len !== 1) {
        return true
      } else {
        return this.hostSelection[0].status != 1
      }
    },
    makeMirrorDisabled () {
      let len = this.hostSelection.length
      if (len !== 1) {
        return true
      } else {
        return !(this.hostSelection[0].status == 1 && this.hostSelection[0].dbStatus == 0)
      }
    },
    unbindIPDisabled () {
      let len = this.hostSelection.length
      if (len !== 1) {
        return true
      } else {
        return this.hostSelection[0].status != 1 && this.hostSelection[0].status != 0
      }
    }
  },
  watch: {
    renewalType (type) {
      this.renewalTime = ''
      this.timeOptions.renewalTime = this.timeOptions[type]
    },
    renewalTime (time) {
      if (time == '') {
        this.cost = '--'
        this.originCost = '--'
      } else {
        var selectIp = ''
        var selectDisk = ''
        for (var i = 0; i < this.bindRenewalVal.length; i++) {
          if (this.bindRenewalVal[i] == 'ip') {
            selectIp = this.isIps
          }
          if (this.bindRenewalVal[i] == 'disk') {
            selectDisk = this.isDisks
          }
        }
        this.$http.get('information/getYjPrice.do', {
          params: {
            timeValue: this.renewalTime,
            timeType: this.renewalType,
            hostIdArr: this.hostCurrentSelected.id,
            ipIdArr: selectIp,
            diskArr: selectDisk
          }
        }).then((response) => {
          if (response.status == 200 && response.data.status == 1) {
            this.cost = response.data.result.toFixed(2)
            this.originCost = response.data.result
            if (response.data.cuspon) {
              this.originCost = Number((this.originCost + response.data.cuspon).toFixed(2))
            }
            if (response.data.continueDiscount) {
              this.originCost = (this.originCost + response.data.continueDiscount).toFixed(2)
            }
          } else {
            this.$message.info({
              content: response.data.message
            })
          }
        })
      }
    },
    // 资费变更
    ratesChangeType (type) {
      this.ratesChangeTime = ''
      this.timeOptions.renewalTime = this.timeOptions[type]
    },
    ratesChangeTime (time) {
      if (time == '') {
        this.ratesChangeCost = '--'
        this.originRatesChangeCost = '--'
      } else {
        var selectIp = ''
        var selectDisk = ''
        for (var i = 0; i < this.relevanceAlteration.length; i++) {
          if (this.relevanceAlteration[i] == 'ip') {
            selectIp = this.relevanceIps
          }
          if (this.relevanceAlteration[i] == 'disk') {
            selectDisk = this.relevanceDisks
          }
        }
        let url = 'information/getYjPrice.do'
        this.$http.get(url, {
          params: {
            timeValue: this.ratesChangeTime,
            timeType: this.ratesChangeType,
            hostIdArr: this.hostCurrentSelected.id,
            ipIdArr: selectIp,
            diskArr: selectDisk
          }
        }).then((response) => {
          if (response.status == 200 && response.data.status == 1) {
            this.ratesChangeCost = response.data.result.toFixed(2)
            this.originRatesChangeCost = response.data.result
            if (response.data.cuspon) {
              this.originRatesChangeCost = Number((this.originRatesChangeCost + response.data.cuspon).toFixed(2))
            }
            if (response.data.continueDiscount) {
              this.originRatesChangeCost = (this.originRatesChangeCost + response.data.continueDiscount).toFixed(2)
            }
          }
        })
      }
    },
    relevanceAlteration () {
      if (this.ratesChangeTime == '') {
        this.ratesChangeCost = '--'
      } else {
        var selectIp = ''
        var selectDisk = ''
        for (var i = 0; i < this.relevanceAlteration.length; i++) {
          if (this.relevanceAlteration[i] == 'ip') {
            selectIp = this.relevanceIps
          }
          if (this.relevanceAlteration[i] == 'disk') {
            selectDisk = this.relevanceDisks
          }
        }
        let url = 'information/getYjPrice.do'
        this.$http.get(url, {
          params: {
            timeValue: this.ratesChangeTime,
            timeType: this.ratesChangeType,
            hostIdArr: this.hostCurrentSelected.id,
            ipIdArr: selectIp,
            diskArr: selectDisk
          }
        })
          .then((response) => {
            if (response.status == 200 && response.data.status == 1) {
              this.ratesChangeCost = response.data.result.toFixed(2)
              this.originRatesChangeCost = response.data.result
              if (response.data.cuspon) {
                this.originRatesChangeCost = Number((this.originRatesChangeCost + response.data.cuspon).toFixed(2))
              }
              if (response.data.continueDiscount) {
                this.originRatesChangeCost = (this.originRatesChangeCost + response.data.continueDiscount).toFixed(2)
              }
            }
          })
      }
    },
    '$store.state.zone': {
      handler: function () {
        this.getHostList()
      },
      deep: true
    },
    'resetPasswordForm.password': {
      handler: function (val) {
        if (val.length > 7 && val.length < 31) {
          this.resetPasswordForm.firstDegree = true
        } else {
          this.resetPasswordForm.firstDegree = false
        }
        let len = val.length
        let reg = /[0-9]/
        let flag = false
        // 当用户输入到第6位时，开始校验是否有6位连续字符
        if (len > 5) {
          flag = check(len)
          function check (index) {
            let count = 0
            for (let i = index - 5; i < index; i++) {
              let next = reg.test(val[i]) ? val[i] : val[i].charCodeAt() // 检查字符是数字还是字母，数字没转原因是9和：ACSII码连续
              let current = reg.test(val[i - 1]) ? val[i - 1] : val[i - 1].charCodeAt()
              if (next - current === 1) { // 字母ACSII 码相差1 则为连续
                count += 1
              }
            }
            if (count > 4) { // 有6位连续字符
              return true
            } else if (count < 5 && index > 6) {
              return check(index - 1) // 递归继续校验
            } else {
              return false
            }
          }
        }
        if (flag && len > 5) {
          this.resetPasswordForm.secondDegree = false
        } else if (!flag && len > 5) {
          this.resetPasswordForm.secondDegree = true
        }
        if (len === 0) {
          this.resetPasswordForm.secondDegree = false
        }
        if (regExp.hostPassword(val)) {
          this.resetPasswordForm.thirdDegree = true
        } else {
          this.resetPasswordForm.thirdDegree = false
        }
      },
      deep: true
    }
  },
  beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    clearInterval(this.hostTimer)
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
    content: "";
    display: inline-block;
    width: 10px;
    height: 10px;
    background: #fff;
    position: absolute;
    bottom: -5px;
    right: 50%;
    transform: rotate(135deg);
    box-shadow: 1px -1px 0px 0px rgba(0, 0, 0, 0.2);
  }
}

.monitor {
  display: none;
  position: absolute;
  right: 0;
  top: 56px;
  width: 0;
  opacity: 0;
  transition: all 0.5s;
  @diff: 102px;
  min-height: calc(~"100% - @{diff}");
  background: rgba(255, 255, 255, 1);
  box-shadow: -5px 0px 14px -7px rgba(148, 148, 148, 0.4);
  border-radius: 2px;
  padding: 20px;
  z-index: 3;
  .title {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    > span {
      font-size: 18px;
      font-family: MicrosoftYaHei;
      color: rgba(51, 51, 51, 1);
    }
  }
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

.selectAuthType {
  width: 50%;
  h2 {
    text-align: center;
    font-size: 16px;
    color: rgba(17, 17, 17, 0.75);
    margin-bottom: 20px;
  }
  p {
    position: relative;
    font-size: 14px;
    color: rgba(17, 17, 17, 0.65);
    margin-bottom: 10px;
    padding-left: 60px;
    i {
      transform: rotate(-45deg);
      position: absolute;
      width: 7px;
      height: 4px;
      top: 5px;
      left: 62px;
      border-left: 1px solid #3dbd7d;
      border-bottom: 1px solid #3dbd7d;
      display: inline-block;
    }
    &::before {
      margin-right: 7px;
      content: "";
      width: 12px;
      height: 12px;
      border: 1px solid #3dbd7d;
      border-radius: 50%;
      display: inline-block;
      vertical-align: middle;
    }
  }
}

.selectMark {
  margin-bottom: 10px;
  position: relative;
  > img {
    position: relative;
    top: 4px;
  }
  > span {
    font-size: 14px;
    font-family: MicrosoftYaHei;
    color: rgba(102, 102, 102, 1);
  }
  .guide {
    float: right;
    cursor: pointer;
    i {
      font-size: 20px;
      &:hover {
        color: #2a99f2;
      }
    }
  }
  .hint_1 {
    .hint();
    right: -60px;
    top: -105px;
  }
  .hint_2 {
    .hint();
    right: 0;
    top: -30px;
  }
  .hint_3 {
    .hint();
    left: 290px;
    top: -215px;
  }
  .hint_4 {
    .hint();
    left: 150px;
    top: -65px;
  }
  .hint_5 {
    .hint();
    left: 10px;
    top: -33px;
  }
  .hint_6 {
    .hint();
    right: 0;
    top: 0;
  }
}

.renewal-info {
  margin-bottom: 20px;
  padding: 20px 10px;
  width: 100%;
  background: rgba(245, 245, 245, 1);
  ul {
    li {
      font-size: 14px;
      line-height: 1.5;
      span {
        color: #666;
      }
    }
  }
}

.renewal-upgrade {
  margin-bottom: 20px;
  width: 100%;
  font-size: 14px;
  span {
    color: #2a99f2;
    cursor: pointer;
  }
}

.resetModal-title {
  font-size: 12px;
  font-family: MicrosoftYaHei;
  color: rgba(102, 102, 102, 1);
  > span {
    font-weight: bold;
    color: #333333;
  }
}

.resetModal-table {
  margin-top: 14px;
  display: flex;
  justify-items: center;
  align-items: center;
  height: 40px;
  background: rgba(246, 250, 253, 1);
  box-shadow: 0px 1px 1px 0px rgba(204, 204, 204, 0.5);
  > li {
    width: 30%;
    font-size: 12px;
    font-family: MicrosoftYaHei;
    color: rgba(51, 51, 51, 1);
    padding-left: 20px;
  }
  li:nth-child(1) {
    width: 10%;
  }
}

.data {
  background: #fff;
  margin-top: 0;
  height: 60px;
  > li {
    > input {
      height: 30px;
      border: 1px solid rgba(225, 225, 225, 1);
      border-radius: 4px;
      padding-left: 5px;
      outline: none;
      &.error {
        border: 1px solid #ff0000;
        color: #ff0000;
      }
    }
    > p {
      color: #ff0000;
      margin-top: 5px;
    }
  }
  li:nth-child(3) {
    color: #2a99f2;
    cursor: pointer;
  }
}

.resetModal-import {
  margin-top: 20px;
  position: relative;
  > span {
    display: inline-block;
    width: 80px;
    font-size: 14px;
    font-family: MicrosoftYaHei;
    color: rgba(51, 51, 51, 1);
  }
  > img {
    cursor: pointer;
    position: absolute;
    left: 54%;
    top: 30%;
  }
  > input {
    height: 30px;
    width: 300px;
    padding-left: 10px;
    border-radius: 2px;
    border: 1px solid rgba(225, 225, 225, 1);
  }
  .popTip {
    width: 350px;
    padding: 19px 21px;
    position: absolute;
    background: #fff;
    border-radius: 8px;
    -webkit-box-shadow: 0 2px 24px 0 rgba(125, 125, 125, 0.35);
    box-shadow: 0 2px 24px 0 rgba(125, 125, 125, 0.35);
    right: -75px;
    bottom: -60px;
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
          background: #09bc1d;
          border: 1px solid #09bc1d;
          &:before {
            content: "";
            display: inline-block;
            background: #fff;
            height: 1px;
            width: 10px;
            transform: translate(3px, -8px) rotate(-55deg);
          }
          &:after {
            content: "";
            display: inline-block;
            background: #fff;
            height: 1px;
            width: 6px;
            transform: translate(0px, -23px) rotate(215deg);
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
}

.resetModal-hint {
  margin-top: 5px;
  > p {
    font-size: 12px;
    font-family: MicrosoftYaHei;
    color: rgba(255, 0, 0, 1);
    line-height: 16px;
    padding-left: 82px;
  }
}

.resetModal-p {
  margin-top: 20px;
  > p {
    font-size: 14px;
    font-family: MicrosoftYaHei;
    color: rgba(102, 102, 102, 1);
    line-height: 20px;
    span {
      color: #ff0000;
    }
  }
}
</style>
