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
            <input placeholder="请输入提现金额" v-model="withdraw.money" type="number" name="input" />
            <text class='text' @tap="withdrawAll">全部提现</text>
        </view>
        <view class="cu-form-group balance">
            <view class="title lg">可提现金额: </view>
            <view class="balance">￥{{tools.formatMoney(balance)}}元</view>
            <navigator url="../balance/index" class='text'>提现记录</navigator>
        </view>
        <view class="title">提现方式</view>
        <view class="cu-list menu withdraw-type" >
            <view class="cu-item arrow" @tap="selectBank">
                <view class="content">
                    <text class="cuIcon-card text-blue"></text>
                    <text class="text-grey" v-if="!!bank.bankName">{{bank.bankName+`(${bank.bankCardNum})`}}</text>
                    <text class="text-grey" v-if="!bank.bankName">请选择银行卡</text>
                </view>
            </view>
        </view>
        <view class="desc">
            注意：<br />
            1、满10元即可发起申请提现！<br>
            2、到账时间：每个月15号、30号打款！<br>
            3、提现手续费7%。<br>
        </view>
        <view class="btn-group">
            <button class="cu-btn shadow bg-blue lg" @tap="goWithdraw">立即提现</button>
        </view>
        <!--<view class="real text-gray">
            完成实名认证,保障您的资金安全. <navigator src="pages/realName/index">去认证 <text class="cuIcon-right"></text></navigator>
        </view>-->
        <!--     模态框  提现提示   -->
        <view class="cu-modal modal-withdraw" :class="modal.hint?'show':''">
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
                        <button class="cu-btn bg-blue margin-left" @tap.stop="confirmWithdra">确定</button>
                    </view>
                </view>
            </view>
        </view>
<!--        模态框    银行卡选择-->
        <view class="cu-modal bottom-modal picker" @tap="hidePicker" :class="modal.bank?'show':''" >
            <view class="cu-dialog" @tap.stop="cancelPropagation">
                <view class="cu-bar bg-white">
             <!--       <view class="action text-blue">取消</view>
                    <view class="action text-green">确定</view>-->
                    <view class="modal-top">
                        <view class="left">
                            <view class="modal-title">我的银行卡</view>
                            <navigator v-if="bankList.length>0" :url="'../addBankCard/index?bank='+JSON.stringify(this.withdraw.tempBank)" class="modify">修改银行卡信息 <text class="cuIcon-right"></text></navigator>
                        </view>
                        <view class="right">
                            <view class="cu-btn bg-white text-blue" @tap="confirmBank">确认</view>
                        </view>
                    </view>
                </view>
                <view class="padding-sm">
                    <picker-view v-if="picker.visible && bankList.length>0" mask-class="picker-mask"  indicator-style="height:100upx;" :value="picker.value" @change="bindChange">
                        <picker-view-column>
                            <view class="list light bg-blue" v-for="(item,index) in bankList" :key="index">
                                <view class="left">
                                    <view class="icon"><text class="cuIcon-card text-gray"></text></view>
                                    <view class="card-info text-black">
                                        <view class="name">{{item.bankName}}</view>
                                        <view class="number">({{item.bankCardNum}}储蓄卡)</view>
                                    </view>
                                </view>

                                <view class="right" v-show="picker.selected === index">
                                    <text class="cuIcon-check text-blue"></text>
                                </view>
                            </view>
                        </picker-view-column>
                    </picker-view>
                    <navigator url="../addBankCard/index" class="add">
                        <view class="cuIcon-add"></view>
                        <view class="text-black">添加新储蓄卡</view>
                    </navigator>
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
                modal:{
                    hint:false,
                    bank:false
                },
                wx_name:"",  // 微信名称
                balance:1238,  // 余额
                tax:0.07,   // 个人所得税税率
                tools,
                bank:{
                    number:null,
                    name:"请选择银行卡"
                },
                bankList:[],
                picker:{
                    visible:true,
                    indicatorStyle:`height: ${Math.round(uni.getSystemInfoSync().screenWidth/(750/100))}px;`,
                    value:[0],
                    selected:0
                },
                // 提现输入信息
                withdraw:{
                    money:null,
                    // 临时银行卡信息
                    tempBank:undefined
                },
                loginInfo:uni.getStorageSync("loginInfo"),

            }
        },
        onShow(){
            this.getBankList();
            console.log("获取银行卡")
        },
        mounted(){
            this.withdraw.tempBank = this.bankList[0]
            this.getBalance();
        },components:{
            card,
            bgi
        },
        methods: {
            /**
             * @desc 获取用户银行卡列表
             **/
            getBankList(){
                let $this = this;
                uni.request({
                    url:$this.util.getApiUrl("/yppUser/get_user_bankCard_list"),
                    method:"POST",
                    data:{
                        uid:$this.loginInfo.uid
                    },
                    success(res){
                        let data = res.data;
                        if (data.code === 200) {
                            $this.bankList = data.result;
                            console.log(data);
                        }else{
                            $this.util.showInfo(0,data);
                        }
                    },
                    fail:function (err) {
                        console.log(err)
                    }
                })
            },
             /**
             * @desc 获取余额详情
             * */
            getBalance(){
                let $this = this;
                uni.showLoading({
                    title:"请稍后..."
                });
                this.util.getUserInfo(this).then(res=>{
                    $this.$set($this,"balance",parseFloat(res.result.balance));
                   uni.hideLoading();
                })
            },
            /**
             * 银行卡滑动选择
             * */
            bindChange: function (e) {
                const val = e.detail.value[0];
                this.$set(this.picker,"selected",val);
                this.withdraw.tempBank = this.bankList[val];
                console.log(this.withdraw)
            },
            /**
             * 点击去提现
             */
            goWithdraw(){
                if(!this.withdraw.money){
                    return uni.showToast({
                        title:"请输入正确的金额",
                        icon:'none'
                    })
                }else if(this.withdraw.money<10){
                    return uni.showToast({
                        title:"提现金额不得少于10元",
                        icon:"none"
                    })
                }else if (this.withdraw.money > this.balance){
                    return uni.showToast({
                        title:"提现金额不得大于余额",
                        icon:"none"
                    })
                }else if(!this.bank.cardId){
                   return uni.showModal({
                        title:"提示",
                        content:"请选择银行卡",
                        showCancel:false
                    })
                }
                this.$set(this.modal,'hint',true)
            },
            /***
             * 全部提现按钮点击事件
             */
            withdrawAll:function () {
                this.$set(this.withdraw,'money',this.balance);
            },
            /**
             * 选择银行卡按钮点击
             */
            selectBank(){
                this.withdraw.tempBank = this.bankList[0];
                this.$set(this.modal,'bank',true)
            },
            /**
             * 隐藏银行卡选择
             * */
            hidePicker(){
                this.withdraw.tempBank = undefined;
                this.modal.bank =false;
            },
            /***
             * 取消事件冒泡
             */
            cancelPropagation(){
                return false;
            },
            /**
             * 确定选择银行卡
             */
            confirmBank(){
                let bank = this.withdraw.tempBank;
                if (!bank){
                    uni.showToast({
                        title:"请选择银行卡",
                        icon:"none",
                        position :"bottom"
                    })
                }else{
                    console.log(bank)
                    this.bank = bank;
                    this.modal.bank = false;
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
            // #ifndef MPWEIXIN
            line-height: 30upx;
            // #endif
            // #ifndef MPWEIXIN
            line-height: 50upx;
            // #endif
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
            /*color: #333333;*/
            text-align: center;
            margin-bottom:26upx;
            margin-top: 26upx;
            navigator{
                display: inline;
                color: #44A2FF;
                margin-left: 10upx;
            }
        }
        .withdraw-type{
            margin-bottom: 32upx;
            border-bottom: 1px solid #eeeeee;
        }
    }
</style>