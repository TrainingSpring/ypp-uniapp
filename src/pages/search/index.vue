<template>
    <view class="search">
        <search-box style="font-size: 12px;" v-model="keyword" placeholder="搜索你感兴趣的" button="inside" :mode="2"></search-box>
        <scroll-view scroll-y v-if="list.length>0" @scrolltolower="nextPage">
            <t-item v-for="item,index in list" :data="item" @ontap="showDetail(item)"></t-item>
            <view class=" text-gray text-center padding-sm" v-if="notMore">
                <text class="cuIcon-emoji margin-right"></text><text>没有更多了</text>
            </view>
        </scroll-view>
        <view class="none" v-else>
            <image :src="util.getStaticUrl('none.png')" style="width: 80%;"></image>
        </view>
    </view>
</template>

<script>
    import search from "../../components/plugin/mehaotian-search-revision/mehaotian-search-revision.vue"
    import titem from "../../components/item/index.vue"
    export default {
        name: "index",
        data(){
            return {
                keyword:null,
                list:[],
                page:1,
                notMore:false
            }
        },
        onLoad(arg){
            this.init(arg)
        },
        methods:{
            /**
             * 游戏详情
             * */
            showDetail(data){
                uni.navigateTo({
                    url:`/pages/taskInfo/index?data=${JSON.stringify(data)}`
                });
            },
             /**
              * 初始化
              */
              init(arg){
                  let $this = this;
                  this.keyword = arg.key;
                  this.util.getGameInfo({
                      page:this.page,
                      gameName:this.keyword
                  }).then((res)=>{
                      $this.list = res.result.records;
                      $this.notMore = res.result.pages>=$this.page;
                  }).catch((err)=>{
                      uni.showToast({
                          title:err,
                          icon:"none"
                      })
                  })
             },
            nextPage(){
              this.page ++;
                this.util.getGameInfo({
                    page:this.page,
                    gameName:this.keyword
                }).then((res)=>{
                    $this.list = this.list.concat(res.result.records);
                    $this.notMore = res.result.pages>=$this.page;
                }).catch((err)=>{
                    uni.showToast({
                        title:err,
                        icon:"none"
                    })
                })
            }
        },
        components:{
            searchBox:search,
            tItem :titem
        }
    }
</script>

<style lang="scss" scoped>
    .search{
        padding: 30upx;
        height: 100vh;
        scroll-view{
            width: 100%;
            max-height: calc(100% - 90upx);
            margin-top: 30upx;
        }
        .none{
            display: flex;
            height: calc(100% - 90upx);
            justify-content: center;
            align-items: center;
            margin-top: 30upx;
        }
    }
</style>