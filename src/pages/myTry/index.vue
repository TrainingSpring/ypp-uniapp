<!--我的试玩-->
<template>
    <view class="try">
        <view class="search">
            <search-box style="font-size: 12px;" v-model="keyword" placeholder="搜索你感兴趣的" button="inside" :mode="2"></search-box>
        </view>
        <wuc-tab :tabList="tab.tabList" :tabCur="tab.cur" textFlex class="tab" @change="tabChange"></wuc-tab>
        <t-radio class="sort" padding="7.5px" :data="sort"></t-radio>
        <swiper class="swiper" :current="swiper">
            <swiper-item v-for="item in tab.tabList">
                <scroll-view>
                    <t-item v-for="i,index in item.data" :btn-state="i.state" :btn-text="i.state===0?'继续试玩':i.state===1?'提交任务':'已提交'" :data="i"></t-item>
                </scroll-view>
                <view v-if="item.data"></view>
            </swiper-item>
        </swiper>
<!--    提示模态框    -->
        <view class="hintBox" :style="{display:modal.show?'block':'none'}">
            <view class="hint">
                <view class="icon">
                    <image src="../../static/try/icon.png"></image>
                </view>
                <view class="text">任务提交成功</view>
                <view class="btn" @tap.prevent="hideModal">我知道了</view>
            </view>
        </view>
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
                                    state:0,         // 任务状态
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
                                    state:0,         // 任务状态
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
                                    state:1,         // 任务状态
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
                                    state:2,         // 任务状态
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
                sort:["默认排序","最近试玩","即将到期","已完成","已失效"],
                modal:{
                    show:false,
                }
            }
        },
        methods:{
            tabChange(index){
                this.tab.cur = index;
                this.swiper = index;
            },
            hideModal(){
                this.modal.show = false;
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
            // #ifdef MP-WEIXIN
            height: calc(100vh - 92upx - 90upx - 102upx);
            // #endif
            // #ifndef MP-WEIXIN
            height: calc(100vh - 82upx - 90upx - 220upx);
            // #endif
        }
        image{
            width: 100%;
            height: 100%;
        }
        .hintBox{
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background-color: rgba(0,0,0,.6);
            z-index: 99;
            .hint{
                width: 400upx;
                height: 428upx;
                background: #FFFFFF;
                border-radius: 40upx;
                margin: calc((100vh - 400upx)/2) auto;
                position: relative;
                text-align: center;
                .icon{
                    width: 235upx;
                    height: 204upx;
                    position: absolute;
                    top: -82upx;
                    left: 82.5upx;
                }
                .text{
                    padding-top: 152upx;
                    font-size: 32upx;
                }
                .btn{
                    position: absolute;
                    bottom: 60upx;
                    width: 266upx;
                    line-height: 100upx;
                    background-color:#4BB2FF ;
                    border-radius: 100upx;
                    left: 67upx;
                    box-shadow: 8upx 8upx 44upx 0px #4BB2FF;
                    color: white;
                    font-size: 32upx;
                }
            }
        }
    }
</style>