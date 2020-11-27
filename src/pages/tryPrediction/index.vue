<!--任务预告-->
<template>
    <view class="try">
        <view class="search">
            <search-box style="font-size: 12px;" v-model="keyword" placeholder="搜索你感兴趣的" button="inside" :mode="2" @search="search"></search-box>
        </view>
        <wuc-tab :tabList="tab.tabList" :tabCur="tab.cur" textFlex class="tab" @change="tabChange"></wuc-tab>
        <swiper class="swiper" :current="swiper">
            <swiper-item v-for="item in tab.tabList">
                <scroll-view>
                    <game-sort :sort="[]" :game-type="item" :search="searchText" :type="2"> </game-sort>
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
    import gameSort from "../../components/gameSort/index.vue"
    import Tools from "@/components/plugin/tool.ts"
    export default {
        name: "index",
        data(){
            return{
                keyword:null,
                tab:{
                    tabList:[],
                    cur:0,
                    data:[]
                },
                swiper:0,
                currentSort:0,
                loginInfo:uni.getStorageSync("loginInfo"),
                loading:false,
                notMore:[],
                searchText:null
            }
        },
        mounted(){
            this.init();
        },
        methods:{
            tabChange(index){
                this.tab.cur = index;
                this.swiper = index;
            },
            /**
             * @desc 获取分类信息
             */
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
                    $this.$set($this.tab,"tabList",tab);
                    $this.getGameList(0,0,1);
                })
            },
            /**
             *
             * @desc 搜索
             * */
            search(){
                this.searchText = this.keyword;
                for (let i = 0; i < this.$children.length; i++) {
                    let item = this.$children[i];
                    if (item.$options.name === "game-sort") {
                        item.$emit("search",this.searchText);
                    }
                }
            },
            /**
             * @desc 获取对应的游戏列表
             * @params type:Number  游戏分类数组中的第type个
             *          sort: 排序 0,1,2,3
             *          page:页码
             * */
            getGameList(type,sort,page){
                let $this = this;
                let uid = this.loginInfo.uid;
                $this.util.getGameInfo({
                    url:"/yppGame/get_game_will_be_start_page",
                    gameType:$this.tab.tabList[type].id,
                    sortType:sort,
                    page,
                    uid
                }).then((res)=>{
                    res.result.records.page = page;
                    let data = $this.tab.data[type];
                    let date = new Date();
                    if (!data)
                        // data = res.result.records;
                        data = []
                    // else
                    //     data = data.concat(res.result.records);

                    for (let i = 0; i < res.result.records.length; i++) {
                        let item = res.result.records[i];

                        item["btnText"] = $this.util.surplusTime(item.endTime);
                        data.push(item);
                    }
                    $this.loading = false;
                    $this.$set($this.tab.data,type,data);
                    $this.notMore[type] =  res.result.pages>=res.result.records.page;
                    $this.loading = false;
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
            height: calc(100vh - 82upx - 90upx);
            // #endif
            // #ifndef MP-WEIXIN
            height: calc(100vh - 82upx - 90upx - 320upx);
            // #endif
        }
    }
</style>