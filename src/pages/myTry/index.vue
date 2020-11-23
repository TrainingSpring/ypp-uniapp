<!--我的试玩-->
<template>
    <view class="try">
        <view class="search">
            <search-box style="font-size: 12px;" v-model="keyword" placeholder="搜索你感兴趣的" button="inside" :mode="2" @search="onSearch"></search-box>
        </view>
        <wuc-tab :tabList="tab.tabList" :tabCur="tab.cur" textFlex class="tab" @change="tabChange"></wuc-tab>
<!--        <t-radio class="sort" padding="7.5px" t-key="text" style="border-bottom: 1px solid #eeeeee;" margin="0 10px 0 0" @change="radioChange" :data="sort" ></t-radio>-->
        <swiper class="swiper" :current="swiper" disabled-touch>
            <swiper-item v-for="item in tab.tabList" scroll-y @scrolltolower="nextPage">
                <scroll-view>
                    <game-sort :sort="sort" :type="1" :current-sort="curSort" :game-type="item"> </game-sort>
                </scroll-view>
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
    import gameSort from "@/components/gameSort/index.vue"
    export default {
        name: "index",
        data(){
            return{
                keyword:null,
                tab:{
                    tabList:[],
                    data:[],
                    cur:0,
                    sort:[]
                },
                swiper:0,
                curSort:0,
                notMore:[],
                loading:false,
                sort:[
                    {text:"默认排序",value:0},
                    {text:"最近试玩",value:1},
                    {text:"即将到期",value:2}
                ],
                modal:{
                    show:false,
                }
            }
        },
        mounted(){
            this.init();
        },
        methods:{
            init(){
                let $this = this;
                this.util.getGameTypes($this).then(res=>{
                    let tab = [
                        {
                            createTime: null,
                            id: null,
                            imagePath: null,
                            parentId: 0,
                            typeName: "全部",
                        }
                    ];
                    tab = tab.concat(res.result);
                    console.log("//////////////////////////////////",tab);
                    $this.$set($this.tab,"tabList",tab);
                   // $this.$set($this.tab,"tabList",res.result);
                    $this.getGameList(0,0,1);
                })

            },
            /**
             * @desc 获取对应的游戏列表
             * @params type:Number  游戏分类数组中的第type个
             *          sort: 排序 0,1,2,3
             *          page:页码
             * */
            getGameList(type,sort,page){
                let $this = this;
                console.log(type,$this.tab.tabList[type].id);
                let uid = uni.getStorageSync("loginInfo").uid;
                $this.util.getGameInfo({
                    url:"/yppGame/get_sort_user_games_page",
                    gameType:$this.tab.tabList[type].id,
                    sortType:sort,
                    page,
                    uid
                }).then((res)=>{
                    res.result.records.page = page;
                    let data = $this.tab.data[type];
                    if (!data)
                        data = res.result.records;
                    else
                        data = data.concat(res.result.records);
                    $this.loading = false;
                    $this.$set($this.tab.data,type,data);
                    $this.notMore[type] =  res.result.pages>=res.result.records.page;
                    $this.loading = false;
                })
            },
            tabChange(index){
                this.tab.cur = index;
                this.swiper = index;
                let sort = this.tab.sort[index];
                if(sort === undefined){
                    this.tab.sort[index] = sort = 0;
                    this.getGameList(index,sort,1);
                }
            },
            /**
             * 单选按钮更改
             */
            radioChange(e){
                this.curSort = e.index;
                this.$children[5].$emit('change',this.curSort,this.tab.tabList[this.swiper])
            },
            hideModal(){
                this.modal.show = false;
            },
            /**
             * 推荐类目点击
             * @data 点击的内容项
             */
            showDetail(data){
                uni.navigateTo({
                    url:"../taskInfo/index",
                    events:data
                });
            },
            /**
             * 搜索
             * */
            onSearch(){
                uni.navigateTo({
                    url:"/pages/search/index?key="+this.keyword
                })
            },
        },
        components:{
            "search-box":search,
            WucTab,
            TRadio:radio,
            TItem:titem,
            gameSort
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