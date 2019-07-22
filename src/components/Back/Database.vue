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
    <!-- 修改端口提示框 -->
    <Modal v-model="showModal.beforePortModify" :scrollable="true" :closable="false" :width="390">
      <p slot="header" class="modal-header-border">
        <Icon type="android-alert" class="yellow f24 mr10" style="font-size: 20px"></Icon>
        <span class="universal-modal-title">修改端口</span>
      </p>
      <div class="modal-content-s">
        <div>
          <p class="lh24">修改端口会导致数据库重启，请谨慎操作，是否确认修改端口？</p>
        </div>
      </div>
      <p slot="footer" class="modal-footer-s">
        <Button @click="showModal.beforePortModify = false">取消</Button>
        <Button type="primary" @click="beforePortModify">确定</Button>
      </p>
    </Modal>
    <!-- 修改端口模态框 -->
    <Modal v-model="showModal.portModify" width="550" :scrollable="true">
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
            <span style="color:rgb(42, 153, 242);">{{this.hostCurrentSelected.computername}}</span>解绑公网IP,解绑之后您将不能通过公网访问该数据库，确认解绑？
          </p>
        </div>
      </div>
      <p slot="footer" class="modal-footer-s">
        <Button @click="showModal.unbindIP = false">取消</Button>
        <Button type="primary" @click="unbind">确认解绑</Button>
      </p>
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
    <!-- 云数据库续费弹窗 -->
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
                {{this.hostCurrentSelected.computername}}
              </li>
              <li>
                <span>操作系统：</span>
                {{this.hostCurrentSelected.templatename}}
              </li>
              <li>
                <span>主机配置：</span>
                {{this.hostCurrentSelected.serviceoffername}}
              </li>
              <li>
                <span>剩余时长：</span>
                {{this.hostCurrentSelected.endtime}}
              </li>
            </ul>
          </div>
        </Form>
        <div style="font-size:16px;">
          资费
          <span style="color: #2b85e4; text-indent:4px;display:inline-block;">
            现价
            <span style="font-size:24px;">￥{{cost}}/</span>
          </span>
          <span style="text-decoration: line-through">原价{{originCost}}</span>
        </div>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="ghost" @click="showModal.renewal = false">取消</Button>
        <Button type="primary" @click="renewalok" :disabled="cost=='--'">确认续费</Button>
      </div>
    </Modal>
    <!-- 制作备份弹窗 -->
    <Modal v-model="showModal.newSnapshot" width="550" :scrollable="true" class="create-snas-modal">
      <p slot="header" class="modal-header-border">
        <span class="universal-modal-title">手动备份</span>
      </p>
      <div class="universal-modal-label-14px hide-star-symbol">
        <Form
          :model="createSnapsForm"
          ref="createSnapsForm"
          :rules="createSnapsRule"
          :label-width="130"
          label-position="left"
        >
          <FormItem label="云数据库备份" prop="type" style="margin-bottom:10px;">
            <RadioGroup v-model="createSnapsForm.type">
              <Radio label="1">整体备份</Radio>
              <Radio label="0" v-if="this.hostCurrentSelected.dbBackupDefaultName!='--'">部分备份</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="请输入数据库名称" prop="name" v-if="createSnapsForm.type==0">
            <Input v-model="createSnapsForm.name" placeholder="请输入数据库名称" style="width:300px;"></Input>
          </FormItem>
        </Form>
        <p class="mb20" style="font-size:14px;">备份时间为：{{new Date().format('yyyy-MM-dd hh:mm:ss')}}</p>
        <p style="color:#ed3f14" v-if="createSnapsForm.type==0">提示：请输入数据库名称，默认名称为：{{this.hostCurrentSelected.dbBackupDefaultName}}</p>
      </div>
      <div slot="footer" class="modal-footer-border">
        <Button type="ghost" @click="cancelSnaps('createSnapsForm')">取消</Button>
        <Button type="primary" @click="NewSnaps_ok('createSnapsForm')">确认备份</Button>
      </div>
    </Modal>
    <!-- 数据库重启提示框 -->
    <Modal v-model="showModal.restart" :scrollable="true" :closable="false" :width="390">
      <p slot="header" class="modal-header-border">
        <Icon type="android-alert" class="yellow f24 mr10" style="font-size: 20px"></Icon>
        <span class="universal-modal-title">重启数据库</span>
      </p>
      <div class="modal-content-s">
        <div>
          <p class="lh24">您正在重启数据库，请谨慎操作</p>
        </div>
      </div>
      <p slot="footer" class="modal-footer-s">
        <Button @click="showModal.restart = false">取消</Button>
        <Button type="primary" @click="restart">确定</Button>
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
import debounce from 'throttle-debounce/debounce'

export default {
  data () {
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
    const validChinese = (rule, value, callback) => {
      if (value == '') {
        return callback(new Error("数据库名称不能为空"))
      } else if (/^[0-9a-zA-Z]{1,}$/.test(value)) {
        callback()
      } else {
        return callback(new Error("名称输入有误，只能输入字母与数字"))
      }
    }
    return {
      dilatationCost: '--',
      dilatationForm: {
        databaseSize: 0,
        minDatabaseSize: 0
      },
      portModifyForm: {
        currentPorts: '',
        newPorts: ''
      },
      portModifyRuleValidate: {
        newPorts: [
          { validator: validateNewport, trigger: 'change' }
        ]
      },
      createSnapsForm: {
        name: '',
        type: 1,
      },
      createSnapsRule: {
        name: [
          { required: true, validator: validChinese, trigger: 'blur' }
        ],
      },
      guideStep: 1,
      regExpObj: {
        password: /(?!(^[^a-z]+$))(?!(^[^A-Z]+$))(?!(^[^\d]+$))^[\w~*:,]{8,30}$/
      },
      showModal: {
        selectAuthType: false,
        publicIPHint: false,
        bindIP: false,
        renewal: false,
        backup: false,
        mirror: false,
        unbindIP: false,
        delHostHint: false,
        delHost: false,
        resetPassword: false,
        beforePortModify: false,
        portModify: false,
        dilatation: false,
        newSnapshot: false,
        restart: false,
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
              h('li', {}, '实例名称 / '),
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
            let icon_1 = require('../../assets/img/host/h-icon1.png')
            let icon_2 = require('../../assets/img/host/h-icon2.png')
            let icon_3 = require('../../assets/img/host/h-icon3.png')
            let icon_4 = require('../../assets/img/host/h-icon4.png')
            let icon_5 = require('../../assets/img/host/h-icon5.png')
            let styleInfo = {
              marginLeft: '5px',
              lineHeight: '16px'
            }
            // dbStatus  数据库开启或关闭状态   1开启  0关闭  2开启中  3关闭中   4重启中 5修改端口中 6绑定IP中 7解绑IP中 8数据库扩容中
            // Status 1: 正常   0:余额不足 -1:扣费时除余额不足的其他原因   -2:用户删除实时虚拟机   2创建中   3删除中
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
                      }, '开启')
                    ])
                } else if (params.row.dbStatus == 0) {
                  return h('div', {
                    style: {
                      display: 'flex'
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
                }
                break
              case 2:
                if (params.row.dbStatus == 4) {
                  return h('div', {}, [h('Spin', {
                    style: {
                      display: 'inline-block'
                    }
                  }), h('span', { style: styleInfo }, '重启中')])
                } else if (params.row.dbStatus == 5) {
                  return h('div', {}, [h('Spin', {
                    style: {
                      display: 'inline-block'
                    }
                  }), h('span', { style: styleInfo }, '修改中')])
                } else if (params.row.dbStatus == 8) {
                  return h('div', {}, [h('Spin', {
                    style: {
                      display: 'inline-block'
                    }
                  }), h('span', { style: styleInfo }, '扩容中')])
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
                }
                else if (params.row.dbStatus == 6) {
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
                } else if (params.row.dbStatus == 9) {
                  return h('div', {}, [h('Spin', {
                    style: {
                      display: 'inline-block'
                    }
                  }), h('span', { style: styleInfo }, '升级中')])
                } else {
                  return h('div', {}, [h('Spin', {
                    style: {
                      display: 'inline-block'
                    }
                  }), h('span', { style: styleInfo }, '创建中')])
                }
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
                  marginRight: '5px',
                }
              }, params.row.dbPort), h('span', {
                style: {
                  color: '#4297F2',
                  cursor: 'pointer'
                },
                on: {
                  click: () => {
                    this.hostCurrentSelected = params.row
                    this.showModal.beforePortModify = true
                    this.portModifyForm.currentPorts = params.row.dbPort
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
            // 全部状态值
            // dbStatus  数据库开启或关闭状态   1开启  0关闭  2开启中  3关闭中   4重启中 5修改端口中 6绑定IP中 7解绑IP中 8数据库扩容中 9升级中
            // Status 1: 正常   0:余额不足 -1:扣费时除余额不足的其他原因   -2:用户删除实时虚拟机   2创建中   3删除中 
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
                        this.showModal.renewal = true
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
                  if (params.row.dbStatus == 1 || params.row.dbStatus == 0) {
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
                              case 'bindingIP':
                                this.bindIP()
                                break
                              case 'unbindIP':
                                if (this.hostCurrentSelected.publicip) {
                                  this.showModal.unbindIP = true
                                } else {
                                  this.$Message.warning('该主机没有绑定公网IP')
                                }
                                break
                              case 'dilatation':
                                this.showModal.dilatation = true
                                break
                              case 'renewal':
                                // if (this.hostCurrentSelected.caseType == 3) {
                                //     this.$Message.info('请选择包年包月的云数据库进行续费')
                                //   } else {
                                //     this.showModal.renewal = true
                                //   }
                                this.showModal.renewal = true
                                break
                              case 'upgrade':
                                sessionStorage.setItem('upgradeId', this.hostCurrentSelected.id)
                                sessionStorage.setItem('vmid', this.hostCurrentSelected.computerid)
                                this.$router.push('dataBaseUpgrade')
                                break
                              case 'makeSnapshot':
                                this.showModal.newSnapshot = true
                                break
                              case 'startingUp':
                                this.hostStart()
                                break
                              case 'shutdown':
                                this.hostShutdown()
                                break
                              case 'restart':
                                this.showModal.restart = true
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
                            name: 'dilatation'
                          }
                        }, '数据库扩容'),
                        h('DropdownItem', {
                          attrs: {
                            name: 'renewal'
                          }
                        }, '数据库续费'),
                        h('DropdownItem', {
                          attrs: {
                            name: 'upgrade'
                          }
                        }, '数据库升级'),
                        h('DropdownItem', {
                          attrs: {
                            name: 'restart'
                          }
                        }, '重启数据库'),
                        h('DropdownItem', {
                          attrs: {
                            name: 'shutdown'
                          }
                        }, '关闭数据库'),
                        h('DropdownItem', {
                          attrs: {
                            name: 'startingUp'
                          }
                        }, '开启数据库'),
                        h('DropdownItem', {
                          attrs: {
                            name: 'makeSnapshot'
                          }
                        }, '手动备份'),
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
      hostCurrentSelected: {
        computername: '',
        templatename: '',
        serviceoffername: '',
        endtime: ''
      },
      hostDelWay: 1, // 1：点击按钮删除主机 2： 点击更多操作删除；原因是参数传的不同
      bindForm: {
        publicIP: ''
      },
      bindFormRule: {
        publicIP: [
          { required: true, message: '请选择', trigger: 'change' }
        ]
      },
      publicIPList: [],
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
      // 续费相关
      renewalType: '',
      renewalTime: '',
      originCost: '--',
      cost: '--',
      hostTimer: null
    }
  },
  created () {
    this.toggleZone(this.$store.state.zone.zoneid)
    // 用户未认证，弹出认证提示框
    if (this.$store.state.authInfo == null) {
      this.showModal.selectAuthType = true
    }
    this.getHostList()
  },
  methods: {
    // 重启数据库
    restart () {
      this.showModal.restart = false
      this.hostListData.forEach(host => {
        if (host.id == this.hostCurrentSelected.id) {
          host.status = 2
          host.dbStatus = 4
          host._disabled = true
        }
      })
      this.$http.get('database/rebooteDB.do', {
        params: {
          DBId: this.hostCurrentSelected.computerid
        }
      }).then(response => {
        if (response.status == 200 && response.data.status == 1) {
          this.showModal.restart = false
          this.$Message.success(response.data.message)
          this.timingRefresh(this.hostCurrentSelected.id)
        } else {
          this.$message.info({
            content: response.data.message
          })
        }
      })
    },
    NewSnaps_ok (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.showModal.newSnapshot = false
          this.$http.get('database/DBBackup.do', {
            params: {
              DBId: this.hostCurrentSelected.computerid,
              allDataBases: this.createSnapsForm.type,
              dbName: this.createSnapsForm.name
            }
          }).then(response => {
            if (response.status == 200 && response.data.status == 1) {
              this.$Message.success(response.data.message)
            } else {
              this.$Message.error(response.data.message)
            }
          })
        }
      })
    },
    cancelSnaps (name) {
      this.$refs[name].resetFields()
      this.showModal.newSnapshot = false
    },
    renewalok () {
      let database = [
        { type: 5, id: this.hostCurrentSelected.id }
      ];
      let list = JSON.stringify(database);
      this.$http.post('continue/continueOrder.do', {
        list: list,
        timeType: this.renewalType,
        timeValue: this.renewalTime + ''
      }).then(response => {
        if (response.status == 200 && response.data.status == 1) {
          this.$router.push({ path: 'order' })
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
          DBId: this.hostCurrentSelected.computerid,
          diskSize: this.dilatationForm.databaseSize - this.dilatationForm.minDatabaseSize,
          zoneId: this.hostCurrentSelected.zoneid
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
          DBId: this.hostCurrentSelected.computerid,
          diskSize: this.dilatationForm.databaseSize - this.dilatationForm.minDatabaseSize,
          zoneId: this.hostCurrentSelected.zoneid
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
    beforePortModify () {
      this.showModal.beforePortModify = false
      this.showModal.portModify = true
    },
    portModify_ok (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.hostListData.forEach(host => {
                if (host.id == this.hostCurrentSelected.id) {
                  host.status = 2
                  host.dbStatus = 5
                  host._disabled = true
                }
              })
          this.showModal.portModify = false
          this.$http.get('database/updateDBPort.do', {
            params: {
              DBId: this.hostCurrentSelected.computerid, //(数据库的UUID),
              port: this.portModifyForm.newPorts //(需要更改的端口)
            }
          }).then(res => {
            if (res.status === 200 && res.data.status === 1) {
              this.$Message.success(res.data.message)
              this.timingRefresh(this.hostCurrentSelected.id)
            } else {
              this.$message.info({
                content: res.data.message
              })
            }
          })
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
          this.hostCurrentSelected = res.data.result.info[0]
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
    hostStart () {
      if (this.hostCurrentSelected.dbStatus == '1') {
        this.$Message.info('数据库已处于开启状态')
      } else {
        this.hostListData.forEach(host => {
          if (host.id == this.hostCurrentSelected.id) {
            host.status = 2
            host.dbStatus = 2
            host._disabled = true
          }
        })
        let url = 'database/startDB.do'
        this.$http.get(url, {
          params: {
            DBId: this.hostCurrentSelected.computerid
          }
        }).then(res => {
          if (res.status == 200 && res.data.status == 1) {
            this.$Message.success(res.data.message)
            this.timingRefresh(this.hostCurrentSelected.id)
          } else {
            this.$message.info({
              content: res.data.message
            })
          }
        })
      }
    },
    hostShutdown () {
      if (this.hostCurrentSelected.dbStatus == '0') {
        this.$Message.info('数据库已处于关闭状态')
      } else {
        this.hostListData.forEach(host => {
          if (host.id == this.hostCurrentSelected.id) {
            host.status = 2
            host.dbStatus = 3
            host._disabled = true
          }
        })
        let url = 'database/stopDB.do'
        this.$http.get(url, {
          params: {
            DBId: this.hostCurrentSelected.computerid
          }
        }).then(res => {
          if (res.status == 200 && res.data.status == 1) {
            this.$Message.success(res.data.message)
            this.timingRefresh(this.hostCurrentSelected.id)
          } else {
            this.$message.info({
              content: res.data.message
            })
          }
        })
      }
    },
    hostDelete (val) {
      this.hostDelWay = val
      this.showModal.delHost = true
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
                  host.dbStatus = 6
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
    unbind () {
      this.hostListData.forEach(host => {
        if (host.id == this.hostCurrentSelected.id) {
          host.status = 2
          host.dbStatus = 7
          host._disabled = true
        }
      })
      this.showModal.unbindIP = false
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
    push (type) {
      this.$store.commit('setPane', { vpc: 'VPC', vpn: 'remote', usercenter: type, expenses: 'accountSummary' })
      this.$router.push('/usercenter')
    },
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
  },
  watch: {
    'dilatationForm.databaseSize' () {
      if (this.hostCurrentSelected.disksize == this.dilatationForm.databaseSize) {
        this.dilatationCost = '--'
      } else {
        this.queryDatabaseCost()
      }
    },
    renewalType (type) {
      this.renewalTime = ''
      this.timeOptions.renewalTime = this.timeOptions[type]
    },
    renewalTime (time) {
      if (time == '') {
        this.cost = '--'
      } else {
        this.$http.get('information/getYjPrice.do', {
          params: {
            timeValue: this.renewalTime,
            timeType: this.renewalType,
            dbArr: this.hostCurrentSelected.id,
          }
        }).then((response) => {
          if (response.status == 200 && response.data.status == 1) {
            this.cost = response.data.result
            this.originCost = response.data.result
            if (response.data.cuspon) {
              this.originCost += response.data.cuspon
            }
            if (response.data.continueDiscount) {
              this.originCost += response.data.continueDiscount
            }
            this.cost = this.cost.toFixed(2)
            this.originCost = this.originCost.toFixed(2)
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
    '$store.state.zone': {
      handler: function () {
        this.getHostList()
      },
      deep: true
    },
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
