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
                        <div>
                            <div style="float:left">
                                <RadioGroup v-model="button1" type="button">
                                    <Radio label="网站业务"></Radio>
                                    <Radio label="证书管理"></Radio>
                                    <Radio label="非网站业务"></Radio>
                                </RadioGroup>
                            </div>
                            <div style="float:right">
                                <span>添加域名帮助文档</span>
                            </div>
                        </div>
                        <div>
                            <div>
                                <Button type="primary">添加证书</Button>
                                <Button type="primary">删除</Button>
                            </div>
                            <div>
                                <Input placeholder="证书"></Input>
                                <Button type="primary">查询</Button>
                            </div>
                        </div>
                    </TabPane>
                    <TabPane label="业务管理">标签二的内容</TabPane>
                    <TabPane label="防护管理">标签三的内容</TabPane>
                    <TabPane label="操作日志">标签三的内容</TabPane>
                </Tabs>
             </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            button1:'网站业务'
        }
    }
}
</script>

<style lang="less" scoped>

</style>

