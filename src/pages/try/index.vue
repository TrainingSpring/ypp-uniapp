<!--tabbar试玩-->
<template>
    <view class="try">
        <view class="search">
            <search-box style="font-size: 12px;" v-model="keyword" placeholder="搜索你感兴趣的" button="inside" :mode="2" @search="onSearch"></search-box>
        </view>
        <wuc-tab :tabList="tab.tabList" :tabCur="tab.cur" textFlex class="tab" @change="tabChange"></wuc-tab>
<!--        <t-radio :data="sort" @change=" radioChange"></t-radio>-->
        <swiper class="swiper" :current="swiper" @change="swiperChange">
            <swiper-item v-for="item,index in tab.tabList">
                <!--<scroll-view style="height: calc(100vh - 292upx);" scroll-y @scrolltolower="nextPage">
                    <t-item v-if="tab.data[index].length>0" v-for="itm,idx in tab.data[index]" :data="itm" @ontap="showDetail(itm)"></t-item>
                    <view v-if="tab.data[index].length == 0 || !tab.data[index]" class="none" style="display: flex; height: calc(100% - 90upx);justify-content: center;align-items: center;margin-top: 30upx;">
                        <image src="../../static/none.png" style="width: 80%;"></image>
                    </view>
                    <view class=" text-gray text-center padding-sm" v-if="notMore[index]">
                        <text class="cuIcon-emoji margin-right"></text><text>没有更多了</text>
                    </view>
                    <view class="cu-load cuIcon-loading loading text-black" v-if="loading"></view>
                </scroll-view>-->
                <game-sort :game-type="item"></game-sort>
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
                sort:["综合","收益","剩余","时间"],
                curSort:0,
                notMore:[],
                loading:false
            }
        },
        onLoad(res){
            this.init();
        },
        methods:{
            /**
             * 当swiepr改变后触发
             * */
            swiperChange(event){
                let cur = event.detail.current;
                this.$set(this.tab,"cur",cur);
                this.$set(this,"swiper",cur);
            },
            /***
             * 初始化
             * */
            init(){
                this.loading = true;
                let $this = this;
                // 获取游戏类型
                this.util.getGameTypes(this).then(res=>{
                    let tab = [
                        {
                            typeName:"全部",
                            id:""
                        }
                    ];
                    tab = tab.concat(res.result);
                    $this.$set($this.tab,'tabList',tab);
                    // 渲染列表
                    this.getGameList(0,0,1)
                });
                //
            },
            /**
             * 获取类型列表
             * */
            /* getTypeList(){
                let $this = this;
                 return new Promise((resolve,reject)=>{
                     // 获取游戏类型
                     uni.request({
                         url:$this.util.getApiUrl("/yppGameType/get_types"),
                         method:"POST",
                         success:function (result) {
                             let data = result.data;
                             if (data.code === 200) {
                                 $this.$set($this.tab,'tabList',data.result);
                                 // 获取游戏列表
                                 resolve(data)
                             }else{
                                 reject(data)
                                 $this.util.showInfo(0,data);
                             }
                         },
                         fail(err){
                             reject(err)
                         }
                     })
                })
            },*/
            /**
             * 搜索
             * */
            onSearch(){
                uni.navigateTo({
                    url:"/pages/search/index?key="+this.keyword
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
                $this.util.getGameInfo({
                    gameType:$this.tab.tabList[type].id,
                    sortType:sort,
                    page
                }).then((res)=>{
                    res.result.records.page = page;
                    let data = $this.tab.data[type];
                    if (!data)
                       data = res.result.records;
                    else
                        data = data.concat(res.result.records);
                    this.loading = false;
                    $this.$set($this.tab.data,type,data);
                    $this.notMore[type] =  res.result.pages>=res.result.records.page;
                    $this.loading = false;
                })
            },
            /**
             * tab点击
             * */
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
                this.curSort = e;
                let index = this.swiper;
                this.tab.data[index] = [];
                this.getGameList(index,e,1);
            },
            /**
             * 下一页
             * */
            nextPage(){
                let index = this.swiper;
                let data = this.tab.tabList[index];
                let page = data.page;
                if (!this.notMore[index] && !!data && data.length>0){
                    this.loading = true;
                    this.getGameList(index,this.curSort,page+1);
                }
            },
            /**
             * 推荐类目点击
             * @data 点击的内容项
             */
            showDetail(data){
                uni.navigateTo({
                    url:`/pages/taskInfo/index?data=${JSON.stringify(data)}`
                });
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
            // #ifndef MP-WEIXIN
            height: calc(100vh - 82upx - 90upx - 320upx);
            // #endif
            // #ifdef MP-WEIXIN
            height: calc(100vh - 82upx - 90upx - 10upx);
            // #endif
        }
    }
</style>