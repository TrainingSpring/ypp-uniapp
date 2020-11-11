<!--tabbar试玩-->
<template>
    <view class="try">
        <view class="search">
            <search-box style="font-size: 12px;" v-model="keyword" placeholder="搜索你感兴趣的" button="inside" :mode="2"></search-box>
        </view>
        <wuc-tab :tabList="tab.tabList" :tabCur="tab.cur" textFlex class="tab" @change="tabChange"></wuc-tab>
        <t-radio :data="sort"></t-radio>
        <swiper class="swiper" :current="swiper">
            <swiper-item v-for="item in tab.tabList">
                <scroll-view>
                    <t-item v-for="i,index in item.data" :data="i"></t-item>
                </scroll-view>
                <view v-if="item.data"></view>
            </swiper-item>
        </swiper>
    </view>
</template>

<script>
    import search from "@/components/plugin/mehaotian-search-revision/mehaotian-search-revision.vue"
    import WucTab from '@/components/plugin/wuc-tab/wuc-tab.vue';
    import radio from "@/components/radio/index.vue"
    import titem from "@/components/item/index.vue"
    import Tools from "@/components/plugin/tool.ts"
    export default {
        name: "index",
        data(){
            return{
                keyword:null,
                tab:{
                    tabList:[
                        {
                            name:"免安装",
                            data:[
                                {
                                    icon:"http://entity.90yx.cn/main/img/20201105/5fa3a4b033264.png",        // 游戏图标
                                    name:"游戏名",        // 游戏名
                                    desc:"游戏简介游戏简介游戏简介游戏简介游戏简介游戏简介游戏简介游戏简介游戏简介游戏简介游戏简介游戏简介",        // 描述
                                    progress:80,    // 进度
                                    money:Tools.formatMoney(1000),     // 赚取金额
                                    server:"二区",  // 区服
                                    recommend:true, // 推荐
                                    newGame:true,   // 新游戏
                                    newTask:true,   // 新任务
                                    id:123,         // 任务id
                                },
                                {
                                    icon:"http://entity.90yx.cn/main/img/20201105/5fa3a4b033264.png",        // 游戏图标
                                    name:"游戏名",        // 游戏名
                                    desc:"游戏简介游戏简介游戏简介游戏简介游戏简介游戏简介游戏简介游戏简介游戏简介游戏简介游戏简介游戏简介",        // 描述
                                    progress:80,    // 进度
                                    money:Tools.formatMoney(1000),     // 赚取金额
                                    server:"五区",  // 区服
                                    recommend:true, // 推荐
                                    newGame:false,   // 新游戏
                                    newTask:true,   // 新任务
                                    id:123,         // 任务id
                                },
                                {
                                    icon:"http://entity.90yx.cn/main/img/20201105/5fa3a4b033264.png",        // 游戏图标
                                    name:"游戏名",        // 游戏名
                                    desc:"游戏简介游戏简介游戏简介游戏简介游戏简介游戏简介游戏简介游戏简介游戏简介游戏简介游戏简介游戏简介",        // 描述
                                    progress:80,    // 进度
                                    money:Tools.formatMoney(12.5),     // 赚取金额
                                    server:"二区",  // 区服
                                    recommend:false, // 推荐
                                    newGame:true,   // 新游戏
                                    newTask:true,   // 新任务
                                    id:123,         // 任务id
                                },
                                {
                                    icon:"http://entity.90yx.cn/main/img/20201105/5fa3a4b033264.png",        // 游戏图标
                                    name:"游戏名",        // 游戏名
                                    desc:"游戏简介游戏简介游戏简介游戏简介游戏简介游戏简介游戏简介游戏简介游戏简介游戏简介游戏简介游戏简介",        // 描述
                                    progress:80,    // 进度
                                    money:Tools.formatMoney(555.6),     // 赚取金额
                                    server:"二区",  // 区服
                                    recommend:false, // 推荐
                                    newGame:true,   // 新游戏
                                    newTask:false,   // 新任务
                                    id:123,         // 任务id
                                },
                            ]
                        },
                        {name:"角色"},
                        {name:"回合"},
                        {name:"策略"},
                        {name:"休闲"},
                        {name:"卡牌"},
                        {name:"动作"}
                        ],
                    cur:0
                },
                swiper:0,
                sort:["综合","收益","剩余","时间"]

            }
        },
        methods:{
            tabChange(index){
                this.tab.cur = index;
                this.swiper = index;
            }
        },
        components:{
            "search-box":search,
            WucTab,
            TRadio:radio,
            TItem:titem
        },
    }
</script>

<style lang="scss" scoped>
    .try{
        .search{
            padding: 16upx 30upx;
        }
        .tab{
            font-size: 24upx;
            color: #000;
            border-bottom: 1px solid #ccc;
        }
        .swiper{
            height: calc(100vh - 82upx - 90upx - 320upx);
        }
    }
</style>