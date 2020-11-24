<template>
    <view class="gameSort">
        <t-radio v-if="sort.length > 0" :data="sort" t-key="text" @change="radioChange"></t-radio>
<!--        <t-radio class="sort" v-if="type===1" t-key="text" padding="7.5px" style="border-bottom: 1px solid #eeeeee;" margin="0 10px 0 0" :data="sort" ></t-radio>-->
        <scroll-view style="height: calc(100vh - 292upx);" scroll-y @scrolltolower="nextPage">
            <t-item v-if="data.length>0" v-for="item,index in data" :btn-text="type==2?item.btnText+'后开启':!!item.btnText?item.btnText:'马上赚'" :btn-type="type===2?1:0" :show-progress="type === 2?false:true" :data="item" @ontap="type!=2?showDetail(item):undefined"></t-item>
            <view v-if="data.length == 0 || !data" class="none" style="display: flex; height: calc(100% - 90upx);justify-content: center;align-items: center;margin-top: 30upx;">
                <image :src="util.getStaticUrl('none.png')" style="width: 80%;"></image>
            </view>
            <view class=" text-gray text-center padding-sm" v-if="notMore && data.length>0">
                <text class="cuIcon-emoji margin-right"></text><text>没有更多了</text>
            </view>
            <view class="cu-load cuIcon-loading loading text-black" v-if="loading"></view>
        </scroll-view>
    </view>
</template>

<script>
    import tradio from "../radio/index.vue"
    import titem from "../item/index.vue"
    import taskList from "../taskList/index.vue"
    export default {
        name: "game-sort",
        data(){
            return {
                notMore:false,
                page:1,
                loading:false,
                curSort:{
                    text:"综合",
                    value:0
                },
                data:[],
                otherData:[],
                storage:{
                    loginInfo:uni.getStorageSync("loginInfo")
                },
                search:null
            }
        },
        components:{
            tRadio:tradio,
            tItem:titem,
            taskList
        },
        props:{
            sort:{
                type:Array, // 分类数据
                default(){
                    return [
                        {
                            text:"综合",
                            value:0
                        },
                        {
                            text:"收益",
                            value:1
                        },
                        {
                            text:"剩余",
                            value:2
                        },
                        {
                            text:"时间",
                            value:3
                        }
                    ]
                }
            },
            gameType:Object,
            type:{
                type:[Number|String],
                default() {
                    return 0;  // 0 默认模式   1 我的试玩
                }
            },
            currentSort:{
                type:Number,
                default(){
                    return 0;
                }
            },
          /*  search:{
                type:String,
                default() {
                    return null;
                }
            }*/
        },
        mounted(){
            this.init();
            let $this = this;
            this.$on("change",(val,gameType)=>{
                $this.getList(1,val,gameType);
            });
            // 搜索功能
            this.$on("search",(text)=>{
                if (!text) return;
                $this.search = text;
                $this.data = [];
                console.log($this.data);
                $this.getList(1);
            })
        },
        watch:{

        },
        methods:{
            /**
             * 初始化数据
             * */
            init(){
                this.getList(this.page)
            },
            getList(page,sort,gameType){
                let $this = this;
                let sortVal = sort!==undefined&&sort!==null?sort:this.curSort.value;
                gameType = gameType!==undefined?gameType.id:this.gameType.id;
                let gameName = this.search ;
                console.log("search",this.search)
                let url = null;
                let uid = null;
                if (this.type == 1){   // 我的试玩
                    url = "/yppGame/get_sort_user_games_page";
                    uid = $this.storage.loginInfo.uid;
                }else if(this.type == 2){  // 试玩预告
                    url = "/yppGame/get_game_will_be_start_page";
                }
                this.util.getGameInfo({
                    gameType:gameType,
                    page:page,
                    sortType:sortVal,
                    gameName,
                    url,
                    uid
                }).then(res=>{
                    if ($this.type === 2) {
                        let data = res.result.records;
                        for (let i = 0; i < data.length;i++) {
                             let item = data[i];
                             item["btnText"] = $this.util.surplusTime(item.startTime);
                             $this.data.push(item)
                        }
                    }else{
                        $this.data = $this.data.concat(res.result.records);
                    }
                    if (res.result.pages <= $this.page) $this.notMore=true;

                });
                /*else{
                    if (sortVal < 3) {
                        this.util.getGameInfo({
                            url:"/yppGame/get_sort_user_games_page",
                            gameType:gameType,
                            page,
                            sortType:sortVal,
                            uid:$this.storage.loginInfo.uid,
                        }).then(res=>{
                            if (res.result.length === 0) $this.$set($this,"data",[]);
                            else $this.$set($this,"data",res.result.records);
                            if (res.result.pages <= $this.page) $this.notMore=true;
                        })
                    }

                }*/

            },
            /**
             * 下一页
             * */
            nextPage(){
                if (this.notMore) {
                    return false;
                }
                let $this = this;
                let page = this.page;
                page ++;
                this.getList(page);
            },
            /**
             * 单选按钮更改
             * */
            radioChange(val){
                let data = val.data;
                this.data = [];
                this.curSort = data;
                this.getList(1);
            },
            /**
             * 游戏详情
             * */
            showDetail(data){
                uni.navigateTo({
                    url:`/pages/taskInfo/index?data=${JSON.stringify(data)}`
                });
            },
        }
    }
</script>

<style scoped>

</style>