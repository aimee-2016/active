<template>
  <div class="buy-mirror">
    <div class="wrap">
      <div class="content" :class="{narrow: isNotServer}">
        <h2>镜像选择</h2>
        <div class="mirror-group">
          <span
            v-for="(item,index) in mirrorConfig.mirrorTypeGroup"
            :key="index"
            :class="{selected: mirrorConfig.mirrorType === item.value}"
            @click="changeMirrorType(item)"
          >{{ item.text }}</span>
        </div>
        <div class="mirror-lists">
          <div v-show="mirrorConfig.mirrorType === 'mirrorMarket'">
            <div class="mirror-category">
              <span>镜像类别:</span>
              <span
                class="category"
                v-for="(item,index) in mirrorConfig.mirrorMarketGroup"
                :key="index"
                :class="{selected: mirrorConfig.selectedMirrorMarket === item.mirrorMarketType}"
                @click="changeMirrorMarketType(item)"
              >{{ item.mirrorMarketType }}</span>
            </div>
            <div class="mirror-items">
              <ul
                v-for="(item,index) in mirrorConfig.mirrorMarketItems"
                :key="index"
                :class="{selected: mirrorConfig.mirrorID === item.systemtemplateid}"
                @click="changeMirrorMarketItem(item)"
              >
                <li>图片</li>
                <li>{{item.templatedescript}}</li>
                <li>系统镜像：{{item.ostypename}}</li>
                <li>免费</li>
              </ul>
            </div>
          </div>
          <div v-show="mirrorConfig.mirrorType === 'piblicMirror'">
            <Dropdown
              class="public-mirror-type"
              trigger="click"
              v-for="(item,index) in mirrorConfig.publicMirrorGroup"
              :key="index"
              @on-click="changePublicMirror"
            >
              <span
                class="mirror-type-name"
                :class="{selected: mirrorConfig.mirrorName===item.publicMirrorType}"
              >{{item.publicMirrorType}}</span>
              <DropdownMenu slot="list" style="width:222px">
                <DropdownItem
                  v-for="(mirror,mirrorIndex) in item.publicMirrorList"
                  :key="mirrorIndex"
                  :name="`${mirror.templatename}#${mirror.systemtemplateid}#${index}`"
                >{{mirror.templatename}}</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
          <div v-show="mirrorConfig.mirrorType === 'customMirror'">
            <Select placeholder="请选择自制镜像" v-model="mirrorConfig.ownMirrorID" style="width:338px">
              <Option
                v-for="item in mirrorConfig.ownMirrorGroup"
                :value="item.value"
                :key="item.value"
              >{{ item.label }}</Option>
            </Select>
            <span class="hint">
              点击此处
              <a>新建私有镜像</a>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.buy-mirror {
  margin-top: 10px;
  .wrap {
    .content {
      padding: 30px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 2px 14px -7px rgba(166, 166, 166, 0.3);
      &.narrow {
        width: 800px;
      }
      > h2 {
        font-size: 18px;
        font-family: MicrosoftYaHei-Bold;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
      }
      .mirror-group {
        display: flex;
        flex-wrap: wrap;
        margin-top: 10px;
        > span {
          margin-right: 10px;
          margin-top: 10px;
          font-size: 14px;
          font-family: MicrosoftYaHei;
          color: rgba(102, 102, 102, 1);
          width: 106px;
          text-align: center;
          border: 1px solid rgba(217, 217, 217, 1);
          line-height: 33px;
          cursor: pointer;
          &.selected {
            color: rgba(66, 151, 242, 1);
            box-shadow: 0px 2px 10px -3px rgba(66, 151, 242, 0.49);
            border: 1px solid rgba(66, 151, 242, 1);
          }
        }
      }
      .mirror-lists {
        margin-top: 10px;
        .mirror-category {
          > span {
            margin-right: 20px;
            font-size: 12px;
            font-family: MicrosoftYaHei;
            color: rgba(153, 153, 153, 1);
            &.selected {
              color: #4297f2;
            }
          }
          .category {
            font-weight: bold;
            color: rgba(102, 102, 102, 1);
            cursor: pointer;
          }
        }
        .mirror-items {
          margin-top: 10px;
          width: 700px;
          max-height: 210px;
          overflow-y: auto;
          border: 1px solid rgba(229, 233, 237, 1);
          > ul {
            height: 40px;
            border-bottom: 1px solid rgba(229, 233, 237, 1);
            display: flex;
            justify-content: space-around;
            cursor: pointer;
            &.selected {
              background: rgba(66, 151, 242, 1);
              > li {
                color: #fff;
              }
              li:last-child {
                color: #fff;
              }
            }
            > li {
              text-align: center;
              line-height: 40px;
              font-size: 12px;
              font-family: MicrosoftYaHei;
              color: rgba(51, 51, 51, 1);
              width: 30%;
            }
            li:nth-child(1) {
              width: 20%;
            }
            li:last-child {
              width: 20%;
              font-weight: bold;
              color: rgba(51, 51, 51, 1);
            }
          }
        }
        .hint {
          margin-left: 10px;
          > a {
            color: #4297f2;
          }
        }
        .public-mirror-type {
          margin-top: 10px;
          margin-right: 10px;
          .mirror-type-name {
            text-align: center;
            display: inline-block;
            font-size: 14px;
            font-family: MicrosoftYaHei;
            color: rgba(102, 102, 102, 1);
            width: 222px;
            border: 1px solid rgba(217, 217, 217, 1);
            line-height: 33px;
            cursor: pointer;
            white-space: nowrap;
            &.selected {
              color: rgba(66, 151, 242, 1);
              box-shadow: 0px 2px 10px -3px rgba(66, 151, 242, 0.49);
              border: 1px solid rgba(66, 151, 242, 1);
            }
          }
        }
      }
    }
  }
}
</style>
<script type="text/ecmascript-6">
import axios from "axios";

export default {
  data() {
    return {};
  },
  props: {
    isNotServer: {
      type: String,
      default: ""
    },
    mirrorConfig: {
      type: Object,
      default: () => {
        return new Object();
      }
    }
  },
  created() {},
  methods: {
    changeMirrorType(item) {
      this.$emit("changeMirrorType", item);
    },
    changePublicMirror(val) {
      this.$emit("changePublicMirror", val);
    },
    changeMirrorMarketType(item) {
      this.$emit("changeMirrorMarketType", item);
    },
    changeMirrorMarketItem(item) {
      this.$emit("changeMirrorMarketItem", item);
    }
  },
  computed: {},
  watch: {}
};
</script>