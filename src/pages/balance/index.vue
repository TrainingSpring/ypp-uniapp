<template>
    <view class="balance">
        <bgi src="balance/bg.png" class="top">
            <view class="info">
                <view class="title">我的余额</view>
                <view class="money">￥ {{balance}}</view>
                <view class="hint">
                    <view class="li">注意：</view>
                    <view class="li">1、首次1元及可提现；后续满10元即可申请提现！</view>
                    <view class="li">2、到账时间：根据各银行情况。</view>
                    <view class="li">3、提现手续费7%。</view>
                    <view class="li">4、一天只允许提现一次，请勿重复提交</view>
                </view>
            </view>
        </bgi>
        <view class="content">
            <view class="title">余额明细</view>
            <card title="提现" class="item" v-for="item in details">
                <view class="li">
                    <view>卡号: {{item.bankNum}}</view>
                    <view>{{item.status === 0?'已提交':item.status === 1?'成功':'失败'}}</view>
                </view>
                <view class="li">
                    <view>提现编号:{{item.recordNum}}</view>
                    <view>{{item.createTime}}</view>
                </view>
                <view class="money">+{{item.withdrawMoney}}</view>
            </card>
            <view v-if="details.length === 0" class="text-center text-sm text-gray padding">暂无提现记录</view>
        </view>
        <view class="btn-group withdraw">
            <view class="cu-btn bg-blue lg" style="width: 100%;" @tap="gotoWithdraw">去提现</view>
        </view>

    </view>
</template>

<script>
    import bgi from "../../components/bg/index.vue"
    import card from "../../components/card/index.vue"
    import tools from "../../components/plugin/tool"
    export default {
        name: "index",
        data(){
            return {
                balance:10000,
                tools:tools,
                details:[
                ],
                loginInfo:uni.getStorageSync("loginInfo")
            }
        },
        mounted(){
            this.init();
        },
        methods:{
            gotoWithdraw(){
                let real = null;
                let uid = uni.getStorageSync("loginInfo").uid;
                let $this = this;
                uni.request({
                    url:$this.util.getApiUrl("/yppUser/check_user_is_realName_authentication"),
                    method:"POST",
                    data:{
                        uid
                    },
                    success(res){
                        let data = res.data;
                        if (data.code === 200 && !!data.result) {
                            uni.navigateTo({
                                url:"../withdraw/index",
                            })
                        }else{
                            uni.showModal({
                                title:"请先实名认证",
                                confirmText:"去实名",
                                success(res){
                                    let confirm = res.confirm;
                                    if (confirm)
                                        uni.navigateTo({
                                            url:"../realName/index"
                                        });
                                }
                            });
                        }
                    }
                })
            },
            /**
             * 初始化
             */
            init(){
                let $this = this;
                uni.showLoading({
                    title:"请稍后"
                });
                // 获取用户余额
                this.util.getUserInfo(this).then(res=>{
                    $this.$set($this,"balance",res.result.balance);
                    uni.hideLoading();
                })
            },
            /**
             * @desc 获取提现记录
             * */
            getRecord(page){
                uni.showLoading({
                    title:"请稍后..."
                });
                let $this = this;
                uni.request({
                    url:"/yppUser/get_balance_detail",
                    data:{
                        uid:$this.loginInfo.uid,
                        page,
                        limit:10
                    },
                    method:"POST",
                    success(res){
                        let data = res.data;
                        if (data.code === 200) {
                            $this.details=data.result.records;
                        }else{
                            $this.util.showInfo(0,data);
                        }
                    }
                })
            }
        },
        components:{
            card,
            bgi
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../components/plugin/colorui/main.css";
    @import "../../components/plugin/colorui/icon.css";
    .balance{
        .top{
            .info{
                width: 749.4upx;
                height: 326.3upx;
                position: relative;
                color: #FFFFFF;
                text-align: center;
            }

            .title{
                font-size: 36upx;
                padding-top:54upx;
            }
            .money{
                font-size: 86upx;
                margin-top: 15upx;
            }
            .hint{
                text-align: left;
                color: #626262;
                font-size: 26upx;
                padding: 16upx 0;
                width: 689upx;
                height: 199upx;
                background: #FFFFFF;
                box-shadow: 0px 3upx 7upx 0px rgba(0, 136, 237, 0.33);
                border-radius: 88upx;
                margin: 10upx auto 0;
                text-indent: 75upx;
                position: absolute;
                bottom: -100upx;
                left: calc((100vw - 689upx)/2);
            }
        }
        .content{
            padding:  50upx 30upx;
            margin-top: 106upx;
            .title{
                font-size: 36upx;
                color: #1a1a1a;
                font-weight: 400;
            }
            .item{
                padding:20upx 25upx;
                color: #808080;
                font-size: 24upx;
                position: relative;
                margin-bottom: 20upx;
                .li{
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 20upx;
                }
                .money{
                    position: absolute;
                    right: 22upx;
                    top: 23upx;
                    font-size: 28upx;
                    color: red;
                }
            }
        }
        .withdraw{
            padding: 20upx 43upx;
            navigator{
                width: 100%;
            }
        }
    }
</style>