<template>
    <view class="mine">
        <view class="top user-info" v-if="!!userInfo">
                <image src="../../static/home/banner.png" class="background">

                </image>
                <view class="wx-info">
                    <view class="left">
                        <view class="circle-white">
                            <image :src="userInfo.head" style="width: 100%;height: 100%;"></image>
                        </view>
                        <view class="decoration">
                            <image src="../../static/mine/medal.png"></image>
                        </view>
                    </view>
                    <view class="right">
                        <view class="nick">{{userInfo.nick}}</view>
                        <navigator url="../balance/index" class="balance">余额(元)：{{userInfo.balance}}</navigator>
                        <!--                            <view class="recommend">了解试玩游戏 <text class="cuIcon-playfill"></text></view>-->
                    </view>
                </view>
                <view class="earning">
                    <view class="earning-item">
                        <view class="money">{{userInfo.earning[0]}}</view>
                        <view class="text">今日收益(元)</view>
                    </view>
                    <view class="earning-item">
                        <view class="money">{{userInfo.earning[1]}}</view>
                        <view class="text">总收益(元)</view>
                    </view>
                    <view class="earning-item">
                        <view class="money">{{userInfo.earning[2]}}</view>
                        <view class="text">总试玩(个)</view>
                        <view class="question">
                            <view class="iconfont icon-yiwen" @tap="onHint">
                                <bgi class="hint" src="../../static/mine/hint.png" :style="{display:hint?'block':'none'}"><text>总试玩数字为已完成试玩任务</text></bgi>
                            </view>

                        </view>
                    </view>
                </view>
            <view class="menu">
                <view class="menu-item">
                    <navigator url="/pages/myTry/index">
                        <view class="icon"><image src="../../static/mine/icon_1.png"></image></view>
                        <view class="text">我的试玩</view>
                    </navigator>
                </view>
                <view class="menu-item">
                    <navigator url="/pages/myTry/index">
                        <view class="icon"><image src="../../static/mine/icon_2.png"></image></view>
                        <view class="text">待提交</view>
                    </navigator>
                </view>
                <view class="menu-item">
                    <navigator url="/pages/myTry/index">
                        <view class="icon"><image src="../../static/mine/icon_3.png"></image></view>
                        <view class="text">审核中</view>
                    </navigator>
                </view>
                <view class="menu-item">
                    <navigator url="/pages/myTry/index">
                        <view class="icon"><image src="../../static/mine/icon_4.png"></image></view>
                        <view class="text">已完成</view>
                    </navigator>
                </view>
            </view>
        </view>
<!--        未登录状态      -->
        <view class="top user-info" v-if="!userInfo" @tap="goLogin">
                <image src="../../static/home/banner.png" class="background">

                </image>
                <view class="wx-info">
                    <view class="left">
                        <view class="circle-white">
                            <image src="../../static/home/head.png" style="width: 100%;height: 100%;"></image>
                        </view>
                        <view class="decoration">
                            <image src="../../static/mine/medal.png"></image>
                        </view>
                    </view>
                    <view class="right">
                        <view class="nick">前往登录</view>
                        <view class="balance">余额(元)：0</view>
                        <!--                            <view class="recommend">了解试玩游戏 <text class="cuIcon-playfill"></text></view>-->
                    </view>
                </view>
                <view class="earning">
                    <view class="earning-item">
                        <view class="money">0</view>
                        <view class="text">今日收益(元)</view>
                    </view>
                    <view class="earning-item">
                        <view class="money">0</view>
                        <view class="text">总收益(元)</view>
                    </view>
                    <view class="earning-item">
                        <view class="money">0</view>
                        <view class="text">总试玩(个)</view>
                        <view class="question">
                            <view class="iconfont icon-yiwen" @tap="onHint">
                                <bgi class="hint" src="../../static/mine/hint.png" :style="{display:hint?'block':'none'}"><text>总试玩数字为已完成试玩任务</text></bgi>
                            </view>

                        </view>
                    </view>
                </view>
            <view class="menu"  style="filter: grayscale(100%)">
                <view class="menu-item">
                    <view>
                        <view class="icon"><image src="../../static/mine/icon_1.png"></image></view>
                        <view class="text">我的试玩</view>
                    </view>
                </view>
                <view class="menu-item">
                    <view>
                        <view class="icon"><image src="../../static/mine/icon_2.png"></image></view>
                        <view class="text">待提交</view>
                    </view>
                </view>
                <view class="menu-item">
                    <view>
                        <view class="icon"><image src="../../static/mine/icon_3.png"></image></view>
                        <view class="text">审核中</view>
                    </view>
                </view>
                <view class="menu-item">
                    <view url="/pages/myTry/index">
                        <view class="icon"><image src="../../static/mine/icon_4.png"></image></view>
                        <view class="text">已完成</view>
                    </view>
                </view>
            </view>
        </view>
        <!--        已登录状态     -->
        <view v-if="!!userInfo" class="cu-list menu">

            <view class="cu-item">
                <navigator class="content" hover-class="none" url="../phone/index">
                    <text class="cuIcon-mobile text-blue"></text>
                    <text class="text-grey">账号绑定</text>
                </navigator>
                <view class="action">
                    <text class="cuIcon-right text-gray"></text>
                </view>
            </view>
            <view class="cu-item">
                <navigator class="content" hover-class="none" url="../realName/index">
                    <text class="cuIcon-my text-blue"></text>
                    <text class="text-grey">实名认证</text>
                </navigator>
                <view class="action">
                    <text class="cuIcon-right text-gray"></text>
                </view>
            </view>
            <view class="cu-item" >
                <view class="content">
                    <text class="cuIcon-message text-blue"></text>
                    <text class="text-grey">消息推送</text>
                </view>
                <view class="action">
                    <switch style="transform: scale(.7)" :checked="msg" color="#2894FF"></switch>
                </view>
            </view>
            <view class="space"></view>
            <view class="cu-item" @tap="clearCache">
                <view class="content">
                    <text class="cuIcon-magic text-blue"></text>
                    <text class="text-grey">清除缓存</text>
                </view>
                <view class="action">
                    <text class="cuIcon-right text-gray"></text>
                </view>
            </view>
            <view class="cu-item">
                <navigator class="content" hover-class="none" url="../about/index">
                    <text class="cuIcon-info text-blue"></text>
                    <text class="text-grey">关于我们</text>
                </navigator>
                <view class="action">
                    <text class="cuIcon-right text-gray"></text>
                </view>
            </view>
        </view>

        <!--        未登录状态     -->
        <view class="cu-list menu" v-else @tap="goLogin">

            <view class="cu-item">
                <view class="content" hover-class="none" url="../phone/index">
                    <text class="cuIcon-mobile text-blue"></text>
                    <text class="text-grey">账号绑定</text>
                </view>
                <view class="action">
                    <text class="cuIcon-right text-gray"></text>
                </view>
            </view>
            <view class="cu-item">
                <view class="content" hover-class="none" url="../phone/index">
                    <text class="cuIcon-my text-blue"></text>
                    <text class="text-grey">实名认证</text>
                </view>
                <view class="action">
                    <text class="cuIcon-right text-gray"></text>
                </view>
            </view>
            <view class="cu-item" >
                <view class="content">
                    <text class="cuIcon-message text-blue"></text>
                    <text class="text-grey">消息推送</text>
                </view>
                <view class="action">
                    <switch style="transform: scale(.7)" :checked="msg" color="#2894FF"></switch>
                </view>
            </view>
            <view class="space"></view>
            <view class="cu-item" @tap="clearCache">
                <view class="content">
                    <text class="cuIcon-magic text-blue"></text>
                    <text class="text-grey">清除缓存</text>
                </view>
                <view class="action">
                    <text class="cuIcon-right text-gray"></text>
                </view>
            </view>
            <view class="cu-item">
                <view class="content" hover-class="none" url="../phone/index">
                    <text class="cuIcon-info text-blue"></text>
                    <text class="text-grey">关于我们</text>
                </view>
                <view class="action">
                    <text class="cuIcon-right text-gray"></text>
                </view>
            </view>
        </view>
        <view class="padding flex flex-direction" v-if="!!userInfo">
            <button class="cu-btn bg-blue margin-tb-sm lg" style="margin:0;">退出登录</button>
        </view>
    </view>
</template>

<script>
    import tools from "../../components/plugin/tool"
    import bgi from "../../components/bg/index.vue"
    export default {
        name: "index",
        data(){
            return{
                userInfo:
                undefined
                //     {
                //     head:"../../static/home/head.png",
                //     nick:"微信昵称",
                //     balance:tools.formatMoney(200),
                //     earning:[
                //         22.23,
                //         2.55,
                //         0.9
                //     ]
                // }
                ,
                msg:false,
                hint:false
            }
        },
        methods:{
            clearCache(){
                uni.showModal({
                    title:"提示",
                    content:"确定清除本地所有缓存?",
                    showCancel:true,
                    cancelColor:"#ccc",
                    confirmColor:"#2894FF",
                    success:function (res) {
                        let confirm = res.confirm || false;
                        let cancel = res.cancel || false;
                        if (confirm) {
                            uni.showLoading({title:"请稍后..."});
                            setTimeout(function () {
                                uni.clearStorage();
                                uni.hideLoading();
                                uni.showToast({title:"清理完成",icon:"none"})
                            },1000)
                        }
                    }
                });

            },
            /**
             * 打开/关闭 试玩提示
             */
            onHint:function () {
                this.hint = !this.hint;
            },
            /**
             * 前往登录
             */
            goLogin:function () {
                uni.navigateTo({
                    url:"../login/index"
                })
            }
        },
        components:{
            bgi
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../components/plugin/colorui/animation.css";
    @import "../../components/plugin/colorui/icon.css";
    @import "../../components/plugin/colorui/main.css";
    @import "../../static/css/iconfont.css";
    image{
        width: 100%;
        height: 100%;
    }
    .user-info{
        width: 100%;
        height:400upx ;
        position: relative;
        .background{
            width:100%;
            height: 100%;
            position: absolute;
            top:0;
            left:0;
            z-index: -1;
        }
        background-size: cover;
        position: relative;
        .wx-info{
            >view{
                float: left;
            }
            .left{
                width: 114upx;
                height: 114upx;
                background: rgba(255,255,255,.2);
                border-radius:50%;
                margin: 28px 0 0 21px;
                position: relative;
                .circle-white{
                    margin: 4upx;
                    width: 106upx;
                    height: 106upx;
                    border-radius:50%;
                    background: #fff;
                    overflow: hidden;
                }
                .decoration{
                    width: 56upx;
                    height: 65upx;
                    position: absolute;
                    bottom: -20upx;
                    right: -10upx;
                }
            }
            .right{
                width: calc(100vw - 114upx - 86upx);
                display: flex;
                margin-left: 12px;
                color: #ffffff;
                margin-top: 48px;
                justify-content: space-between;
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
                .balance{
                    background: linear-gradient(253deg, #FFC94F, #FF8F00);
                    border-radius: 25upx;
                    height: 50upx;
                    font-size: 24upx;
                    padding: 0 40upx;
                    color: white;
                    line-height: 50upx;
                }
            }
        }
        .earning{
            position: absolute;
            top: 202upx;
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
                .question{
                    position: absolute;
                    top: -10upx;
                    right: 20%;
                    font-size: 12px;
                    .hint{
                        width: 418upx;
                        font-size: 12px;
                        padding: 4upx 0;
                        text-align: center;
                        color: #95C9FC;
                        position: absolute;
                        right: 30upx;
                        display: none;
                        top: -32upx;
                    }
                }
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

        .menu{
            width: 689upx;
            height: 165upx;
            background: #FFFFFF;
            box-shadow: 0 3upx 7upx 0 rgba(0, 136, 237, 0.33);
            border-radius: 82upx;
            position: absolute;
            left: calc((100% - 689upx)/2);
            bottom: -82.5upx;
            display: flex;
            justify-content: space-between;
            align-items: center;
            text-align: center;
            .menu-item{
                flex: 1;
                .icon{
                    width:58upx;
                    height: 51upx;
                    margin: 10upx auto;
                }
                .text{
                    font-size: 24upx;

                }
            }
        }
    }
    .cu-list{
        margin-top: 101.5upx;
        .space{
            height: 10upx;
            width: 100%;
            background-color: #E5E5E5;
        }
    }
</style>