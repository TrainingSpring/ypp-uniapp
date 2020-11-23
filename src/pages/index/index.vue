<template>
	<view id="Home">
        <view class="search">
            <search-box style="font-size: 12px;" v-model="keyword" placeholder="搜索你感兴趣的" @search="onSearch" button="inside" :mode="2"></search-box>
        </view>
        <!--        banner      -->
        <view class="banner">
            <swiper :circular="true" :autoplay="true" :interval="5000">
                <swiper-item class="user-info banner" v-if="!!userInfo">
                    <image src="../../static/home/banner.png" class="background">

                    </image>
                    <view class="wx-info">
                        <view class="left">
                            <view class="circle-white">
                                <image :src="swiperList[0].avatar" style="width: 100%;height: 100%;"></image>
                            </view>
                        </view>
                        <view class="right">
                            <view class="nick">{{swiperList[0].nick}}</view>
<!--                            <view class="recommend">了解试玩游戏 <text class="cuIcon-playfill"></text></view>-->
                        </view>
                    </view>
                    <view class="earning">
                        <view class="earning-item">
                            <view class="money">{{swiperList[0].earning[0]}}</view>
                            <view class="text">今日收益</view>
                        </view>
                        <view class="earning-item">
                            <view class="money">{{swiperList[0].earning[1]}}</view>
                            <view class="text">总收益</view>
                        </view>
                        <view class="earning-item">
                            <view class="money">{{swiperList[0].earning[2]}}</view>
                            <view class="text">总试玩(个)</view>
                        </view>
                    </view>
                </swiper-item>
                <swiper-item class="banner" v-for="item,index in swiperList" v-if="index !== 0">
                    <image class="background" :src="item"></image>
                </swiper-item>

            </swiper>
        </view>
        <!--        menu        -->
        <view class="menu">
            <view class="menu-item" @tap="toNewPage('../try/index')">
                <view class="icon"><image src="../../static/home/menu1.png"></image></view>
                <view class="text">新用户专享</view>
            </view>
            <view class="menu-item" @tap="toNewPage('../myTry/index')">
                <view class="icon"><image src="../../static/home/menu2.png"></image></view>
                <view class="text">我的试玩</view>
            </view>
            <view class="menu-item" @tap="toNewPage('../tryPrediction/index')">
                <view class="icon"><image src="../../static/home/menu3.png"></image></view>
                <view class="text">试玩计划</view>
            </view>
        </view>
        <view class="space"></view>
        <!--   今日推荐     -->
        <view class="today">
            <view class="top">
                <view class="title"><text></text> 今日推荐</view>
                <view class="more" @tap="showMore">查看更多</view>
            </view>
            <scroll-view :scroll-y="true">
                <t-item v-for="item in today" :data="item" @ontap="showDetail(item)"> </t-item>
            </scroll-view>
        </view>
	</view>
</template>

<script lang="ts">
    import Vue from 'vue';
    import search from "../../components/plugin/mehaotian-search-revision/mehaotian-search-revision.vue"
    import Tools from "../../components/plugin/tool"
    import titem from "../../components/item/index.vue"

    export default Vue.extend({
		data() {
			return {
			    tools:Tools,
				keyword:"",
                userInfo:undefined,
                swiperList:[
                    {
                        avatar:"../../static/home/head.png",
                        nick:"微信昵称",
                        earning:[]
                    },
                    "../../static/home/banner1.jpg",
                    "../../static/home/banner2.png"
                ],
                today:[
                    {
                        icon:"http://entity.90yx.cn/main/img/20201105/5fa3a4b033264.png",        // 游戏图标
                        gameName:"游戏名",        // 游戏名
                        desc:"游戏简介游戏简介游戏简介游戏简介游戏简介游戏简介游戏简介游戏简介游戏简介游戏简介游戏简介游戏简介",        // 描述
                        progress:80,    // 进度
                        money:Tools.formatMoney(1000),     // 赚取金额
                        server:"二区",  // 区服
                        recommend:true, // 推荐
                        newGame:true,   // 新游戏
                        newTask:true,   // 新任务
                        gameId:123,         // 游戏id
                        serverId:1, // 区服id
                    }
                ]

			}
		},
        mounted(){
		    this.init();
        },
        components:{
		    "search-box":search,
            tItem:titem,
        },
		onLoad() {

		},
		methods: {
		    /**
             * 页面初始化
             * */
		    init(){
		        let $this = this;
		        // 获取用户登录信息
                this.userInfo = uni.getStorageSync("userInfo");
                let loginInfo = uni.getStorageSync("loginInfo");
                // 服务器用户信息获取
                if(this.userInfo){
                    uni.request({
                        url:$this.util.getApiUrl("/yppUser/get_user_info"),
                        data:{
                            uid:loginInfo.uid
                        },
                        method:"POST",
                        success:function (result) {
                            let data = result.data;
                            let info = data.result;
                            console.log(info);
                            if (data.code === 200) {
                                $this.$set($this.swiperList,0,{
                                    avatar:info.avatar,
                                    nick:info.nickName,
                                    sex:info.sex,
                                    earning:[
                                    info.todayIncome,
                                    info.income,
                                    info.countTask
                                ]
                            })
                               /* $this.swiperList[0] = {
                                    avatar:info.avatar,
                                    nick:info.nickName,
                                    sex:info.sex,
                                    earning:[
                                        info.todayIncome,
                                        info.income,
                                        info.countTask
                                    ]
                                };*/
                                // 检测是否实名:
                                uni.request({
                                    url:$this.util.getApiUrl("/yppUser/check_user_is_realName_authentication"),
                                    method:"POST",
                                    data:{
                                        uid:loginInfo.uid,
                                    },
                                    success(response){
                                        let code = response.data.code;
                                        if (code === 200) {
                                            $this.isRealName = response.data.result;
                                        }else{
                                            $this.util.showInfo(0,response.data);
                                        }
                                    }
                                });
                                uni.setStorage({
                                    key:"phoneNumber",
                                    data:info.phone
                                })
                            }
                        }
                    })
                }
                // 获取今日推荐信息
                uni.request({
                    url:$this.util.getApiUrl("/yppGame/get_index_games"),
                    method:"POST",
                    data:{
                        gameType:null,
                        page:1,
                        limit:10
                    },
                    header:{
                        'Content-Type':'application/json'
                    },
                    success:function (result) {
                        let data:any = result.data;
                        if (data.code === 200) {
                            $this.today = data.result.records;
                        }else{
                            uni.showToast({
                                title:`${data.error},${data.msg}`,
                                icon:"none"
                            })
                        }
                        console.log("gameList",result);
                    },
                    fail:function (err) {
                        console.log("gameListError:",err)
                    }
                })
            },
            /**
             * 搜索
             * */
            onSearch(){
		       uni.navigateTo({
                   url:"/pages/search/index?key="+this.keyword
               })
            },
            /**
             * 跳转到新的页面
             * @param e
             */
            toNewPage:function (e: any) {
                if(!this.userInfo){
                    return uni.navigateTo({
                        url:"../login/index"
                    })
                }
                uni.switchTab({
                    url:e,
                    success:function (result) {
                        console.log("res: " + result)
                    },
                    fail:function (err) {
                        uni.navigateTo({
                            url:e
                        })
                    }
                })
            },
            /**
             * 今日推荐  查看更多
             */
            showMore:function(){
                uni.switchTab({
                    url:"../try/index",
                    success:function (result) {
                        console.log("res: " + result)
                    },
                    fail:function (err) {
                        console.log(err);
                    }
                })
            },
            /**
             * 推荐类目点击
             * @data 点击的内容项
             */
            showDetail(data:Object){
                uni.navigateTo({
                    url:"../taskInfo/index?data="+JSON.stringify(data),
                });
            }
		}
	});
</script>

<style lang="scss">
    @import "../../static/css/iconfont.css";
    page{
        background: #fff;
    }
    image{
        width:100%;
        height:100%;
    }
    .search{
        padding: 8px 16px;
    }
    #Home{
        // banner轮播
        swiper{
            height: 328.9upx;
            box-shadow: 4px 5px 14px 0px #BCDFF6;;
            .background{
                width:100%;
                height: 100%;
                position: absolute;
                top:0;
                left:0;
                z-index: -1;
            }
            .user-info{
                /*background: url("../../static/home/banner.png") no-repeat;*/
                background-size: cover;
                position: relative;
                .wx-info{
                    >view{
                        float: left;
                    }
                    .left{
                        width: 61px;
                        height: 61px;
                        background: rgba(255,255,255,.2);
                        border-radius:50%;
                        margin: 28px 0 0 21px;
                        .circle-white{
                            margin: 2px;
                            width: 57px;
                            height: 57px;
                            border-radius:50%;
                            background: #fff;
                            overflow: hidden;
                        }
                    }
                    .right{
                        margin-left: 12px;
                        color: #ffffff;
                        margin-top: 48px;
                        .nick{
                            font-size: 17px;
                            font-weight: 500;
                        }
                        .recommend{
                            padding:3px 9px;
                            margin-top: 9px;
                            border-radius:10px;
                            border: 1px solid #E3E3E3;
                            font-size: 12px;
                            .cuIcon-playfill{
                                margin-left: 5px;
                            }
                        }
                    }
                }
                .earning{
                    position: absolute;
                    bottom: 24upx;
                    display: flex;
                    width: 100%;
                    justify-content: center;
                    align-items: center;
                    .earning-item{
                        color: #ffffff;
                        flex: 1;
                        text-align: center;
                        .money{
                            font-size: 40upx;
                        }
                        .text{
                            font-size: 24upx;
                            color: #B3DAFF;
                        }

                        position: relative;
                    }
                    .earning-item::after{
                        content: ' ';
                        position: absolute;
                        right: 0;
                        width: 1px;
                        height: 80%;
                        background: #fff;
                        top: 10%;
                    }
                    .earning-item:last-child::after{
                        width: 0;
                    }
                }
            }

        }
        // menu
        .menu{
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 40upx ;
            .menu-item{
                flex: 1;
                color: #000;
                font-size: 14px;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                .icon{
                    width:90upx;
                    height: 90upx;
                }
                .text{
                    margin-top:10px;
                }
            }
        }
        .space{
            width: 100%;
            height:12upx;
            background: #F6F4F4;
            margin-top: 28upx;
        }
        .today{
            .top{
                padding: 30upx;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .title{
                    font-size: 36upx;
                    font-weight: bold;
                    color: #000;
                    text{
                        display: inline-block;
                        width: 7upx;
                        height: 33upx;
                        background: #4BB2FF;
                        border-radius: 3px;
                        margin-right: 10upx;
                    }
                }
                .more{
                    color: #5C5C5C;
                    font-size: 28upx;
                }
            }
            scroll-view{
                // #ifdef MP-WEIXIN
                height: calc(100vh - 750.9upx);
                // #endif
                // #ifndef MP-WEIXIN
                height: calc(100vh - 750.9upx - 200upx);
                // #endif
            }
        }
    }
</style>
