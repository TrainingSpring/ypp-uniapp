<template>
    <view class="withdraw">
       <!-- <view class="title">到账方式</view>
        <card title="微信" class="type" :border="true">
             &lt;!&ndash;<view class="radio">
                 <radio></radio>
             </view>&ndash;&gt;
            <view class="info">
                <view class="key">微信认证姓名</view>
                <view class="val"><input type="text" placeholder="请输入微信认证姓名" v-model="wx_name"></view>
            </view>
        </card>-->
        <bgi class="top" src="../../static/withdraw/bg.png">
            <view class="cont">
                <view class="balance">{{tools.formatMoney(balance)}}</view>
                <view class="text">总余额</view>
            </view>
        </bgi>
        <view class="title">提现金额</view>
        <view class="cu-form-group">
            <view class="title lg" style="font-size: 42upx;">￥</view>
            <input placeholder="请输入提现金额" type="number" name="input" />
            <text class='text'>全部提现</text>
        </view>
        <view class="cu-form-group balance">
            <view class="title lg">可提现金额: </view>
            <view class="balance">￥{{tools.formatMoney(balance)}}元</view>
            <text class='text'>提现记录</text>
        </view>
        <view class="title">提现方式</view>
        <view class="cu-list menu withdraw-type" >
            <view class="cu-item arrow">
                <view class="content">
                    <text class="cuIcon-card text-blue"></text>
                    <text class="text-grey">{{bank.cardName}}</text>
                </view>
            </view>
        </view>
        <view class="desc">
            1、首次1元及可提现；后续满10元即可申请提现！<br><br>
            2、到账时间：微信提现秒到账。<br><br>
            3、提现手续费7%<br><br>
            4、一天只允许提现一次，请勿重复提交<br><br>
        </view>
        <view class="btn-group">
            <button class="cu-btn shadow bg-blue lg" @tap="goWithdraw">立即提现</button>
        </view>
        <view class="real">
            完成实名认证,保障您的资金安全. <navigator src="pages/realName/index">去认证 <text class="cuIcon-right"></text></navigator>
        </view>
        <!--        提现提示模态框   -->
        <view class="cu-modal modal-withdraw">
            <view class="cu-dialog">
                <view class="cu-bar bg-white justify-end">
                    <view class="content">
                        <view>提现到账金额</view>
                        <view>￥ {{tools.formatMoney(withdraw.money * 0.97)}}</view>
                    </view>
                    <view class="action" @tap="hideModal">
                        <text class="cuIcon-close text-blue"></text>
                    </view>
                </view>
                <view class="padding-xl text-gray">
                    <view class="li">
                        <view class="keys">服务费</view>
                        <view class="val">￥{{tools.formatMoney(0)}}</view>
                    </view>
                    <view class="li">
                        <view class="keys">个人所得税</view>
                        <view class="val">{{parseFloat((tax*100).toPrecision(12))}}%(￥ {{tools.formatMoney((1-tax)*withdraw.money)}})</view>
                    </view>
                    <view class="li">
                        <view>根据《中华人民共和国个人所得税法》, 我公司将代收个人偶然所得税.若有疑问,请<text class="connect text-blue">联系客服</text></view>
                    </view>
                </view>
                <view class="cu-bar bg-white justify-end">
                    <view class="action text-center" style="width: 100%">
                        <button class="cu-btn bg-blue margin-left" @tap="hideModal">确定</button>
                    </view>
                </view>
            </view>
        </view>
<!--        模态框    银行卡选择-->
        <view class="cu-modal bottom-modal picker" >
            <view class="cu-dialog">
                <view class="cu-bar bg-white">
             <!--       <view class="action text-blue">取消</view>
                    <view class="action text-green">确定</view>-->
                    <view class="modal-top">
                        <view class="left">
                            <view class="modal-title">我的银行卡</view>
                            <view class="modify">修改银行卡信息 <text class="cuIcon-right"></text></view>
                        </view>
                        <view class="right">
                            <view class="cu-btn bg-white text-blue">确认</view>
                        </view>
                    </view>
                </view>
                <view class="padding-sm">
                    <picker-view v-if="picker.visible" mask-class="picker-mask"  indicator-style="height:100upx;" :value="picker.value" @change="bindChange">
                        <picker-view-column>
                            <view class="list" v-for="(item,index) in bankList" :key="index">
                                <view class="left">
                                    <view class="icon"><text class="cuIcon-card text-gray"></text></view>
                                    <view class="card-info">
                                        <view class="name">{{item.name}}</view>
                                        <view class="number">(尾号{{item.number}}储蓄卡)</view>
                                    </view>
                                </view>

                                <view class="right" v-show="picker.selected === index">
                                    <text class="cuIcon-check text-blue"></text>
                                </view>
                            </view>
                        </picker-view-column>
                    </picker-view>
                    <view class="add">
                        <view class="cuIcon-add"></view>
                        <view class="text-black">添加新储蓄卡</view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    import card from "../../components/card/index.vue"
    import tools from "../../components/plugin/tool"
    import bgi from "../../components/bg/index.vue"
    export default {
        name: "index",
        data(){
            return {
                wx_name:"",  // 微信名称
                balance:1238,  // 余额
                tax:0.07,   // 个人所得税税率
                tools,
                bank:{
                    cardId:null,
                    cardName:"请选择银行卡"
                },
                bankList:[
                    {
                        name:"中国银行",
                        number:"0222"
                    },
                    {
                        name:"中国农业银行",
                        number:"0222"
                    },
                    {
                        name:"中国建设银行",
                        number:"0222"
                    },
                ],
                picker:{
                    visible:true,
                    indicatorStyle:`height: ${Math.round(uni.getSystemInfoSync().screenWidth/(750/100))}px;`,
                    value:[0],
                    selected:0
                },
                withdraw:{
                    money:100
                }
            }
        },
        components:{
            card,
            bgi
        },
        methods: {
            /**
             * 银行卡选项
             * */
            bindChange: function (e) {
                const val = e.detail.value;
                this.$set(this.picker,"selected",val[0]);
                // this.picker.value[0] = val;
                // this.picker.selected = val;
            },
            /**
             * 点击去提现
             */
            goWithdraw(){
                if(!this.bank.cardId){
                    uni.showModal({
                        title:"提示",
                        content:"请先去绑定银行卡",
                        showCancel:false
                    })
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../components/plugin/colorui/main.css";
    @import "../../components/plugin/colorui/icon.css";
    .modal-withdraw{
        .cu-bar{
            height: 120upx;
        }
        .content{
            display: flex;
            line-height: 1;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100upx;
            view{
                margin-bottom: 10upx;
                color: #000;
            }
        }
        .li{
            display: flex;
            font-size: 12px;
            justify-content: space-between;
            align-items: center;
            text-align: left;
            margin-bottom: 10upx;
        }
    }
    picker-view {
        width: 100%;
        height: 300upx;
    }
    .picker{
        .modal-top{
            background: linear-gradient(142deg, #73B9FF 0%, #3FABFF 100%);
            width: 100%;
            height: 126upx;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 30upx 20upx;
            .left{
                color: white;
                text-align: left;
                font-size: 24upx;
                .modal-title{
                    font-size: 28upx;
                    margin-bottom: 10upx;
                }
            }
            .right{
                .cu-btn{
                    border-radius: 4upx;
                }
            }
        }
        .cu-bar{
            font-size: 30upx !important;
        }
        .list{
            display: flex;
            height: 100upx;
            justify-content: space-between;
            align-items: center;
            .left{
                display: flex;
                justify-content: flex-start;
                .icon{
                    padding: 0 25upx;
                }
                .card-info{
                    font-size: 12px;
                    text-align: left;
                }
            }
            .right{
                padding: 20upx;
            }
        }
        .add{
            display: flex;
            justify-content: start;
            align-items: center;
            background-color: white;
            margin-top: 20upx;
            view:first-child{
                padding: 20upx;
            }
            view:last-child{
                font-size: 26upx;
            }
        }
    }
    .withdraw{
        .top{
            .cont{
                width:709upx;
                height: 369upx;
                text-align: center;
                color: white;
                display: flex;
                flex-direction: column;
                justify-content: center;
                .balance{
                    font-size: 59upx;
                }
                .text{
                    font-size: 26upx;
                }
            }
        }
        padding: 0 30upx;
        .title{
            color: #333333;
            font-size: 32upx;
            margin-top:36upx;
            margin-bottom: 26upx;
        }
        .type{
            padding: 17upx 26upx;
            .info{
                margin-top: 18upx;
                .key{
                    color: #333333;
                    font-size: 24upx;
                }
                .val{
                    font-size: 24upx;
                    color: #666666;
                    margin-top: 20upx;
                    input{
                        font-size: 24upx;
                    }
                }
            }
        }
        .cu-form-group{
            border-bottom: 1px solid #eee;
            .text-blue{
            }
            .text{
                color: #62AFFF;
                font-size: 30upx;
            }
        }
        .balance{
            font-size: 30upx;
            border-bottom: none;
            border-top: none;
            .title{
                color: #808080;
            }
            .balance{
                color: #62AFFF;
            }
        }
        .desc{
            font-size: 24upx;
            color: #333333;
            padding: 0 30upx;
            .li{
                margin-bottom: 20upx;
            }
        }
        .btn-group{
            margin-top: 40upx;
            button{
                width: 100%;
            }
        }
        .real{
            font-size:28upx;
            color: #333333;
            text-align: center;
            margin-top: 26upx;
            navigator{
                display: inline;
                color: #44A2FF;
                margin-left: 10upx;
            }
        }
        .withdraw-type{
            margin-bottom: 32upx;
        }
    }
</style>