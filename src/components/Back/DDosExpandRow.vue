<template>
    <div class="dp-er">
        <div class="black">
            <div class="dp-row">
                <div>
                    <span class="dp-bf">黑名单</span>
                </div>
                <div>
                    <span class="dp-xg" v-if="isBlckShow" @click="isBlckShow = false">管理</span>
                    <span class="dp-xg" v-else @click="isBlackUpdate">确认修改</span>
                </div>
            </div>
            <div>
                <div style="margin-top:10px;display: flex;flex-wrap: wrap;"  v-if="isBlckShow">
                    <span class="dp-dk"  v-for="(item,index) in blackList" :key="index">{{item}}</span>
                </div>
                <div style="margin-top:10px;" v-else>
                    <Input  type="textarea" v-model="blackValue"> </Input>
                </div>
            </div>
        </div>
        <div class="black">
            <div class="dp-row">
                <div>
                    <span class="dp-bf">白名单</span>
                </div>
                <div>
                    <span class="dp-xg" v-if="isWihtShow" @click="isWihtShow = false">管理</span>
                    <span class="dp-xg" v-else @click="isWihtUpdate">确认修改</span>
                </div>
            </div>
            <div>
                <div style="margin-top:10px;display: flex;flex-wrap: wrap;"  v-if="isWihtShow">
                    <span class="dp-dk"  v-for="(item,index) in whitList" :key="index">{{item}}</span>
                </div>
                <div style="margin-top:10px;" v-else>
                    <Input  type="textarea" v-model="whitValue"> </Input>
                </div>
            </div>
        </div>
    </div>    
</template>

<script>
export default {
    data(){
        return{
            blackList:this.row.blacklist.split(';'),
            blackValue:this.row.blacklist,
            whitValue:this.row.whitelist,
            isBlckShow:true,
            isWihtShow:true,
            whitList:this.row.whitelist.split(';')
        }
    },
    props:{
        row:Object
    },
    created(){
      
    },
    methods:{
        isWihtUpdate(){
            this.whitList = this.whitValue.split(';');
            if(this.whitList.length >300){
                this.$Message.info('最大添加300个白名单');
            }else{
                this.isWihtShow = true;
                this.$emit('white',this.whitValue);
            }
        },
        isBlackUpdate(){
            this.blackList = this.blackValue.split(';');
            if(this.blackList.length >300){
                this.$Message.info('最大添加300个黑名单');
            }else{
                this.isBlckShow = true;
                this.$emit('black',this.blackValue);
            }
        }
    }
}
</script>
<style lang="less" scoped>
.dp-er{
    display: flex;
    .dp-row{
        display: flex;
        justify-content: space-between;
    }
}
    .black{
        width:50%;
        padding: 20px;
        margin-right: 10px;
        height:132px;
        background:rgba(255,255,255,1);
        box-shadow:0px 1px 9px -2px rgba(0,0,0,0.2);
    }
    .dp-xg{
        color: #4297F2;
        font-size: 14px;
        cursor: pointer;
    }
    .dp-bf{
        font-size: 18px;
        color: #333333;
    }
    .dp-dk{
        margin-right:10px;
        font-size: 14px;
        color: #666666;
    }
</style>

