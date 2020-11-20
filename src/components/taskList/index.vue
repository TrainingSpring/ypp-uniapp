<template>
    <view class="taskList">
        <view class="task-item" v-for="(item,index) in data">
            <view class="left">
                <view class="top">
                    <text class="iconfont icon-task"></text>
                    <text class="task-title">{{item.taskName}}</text>
                    <text class="iconfont question icon-yiwen" @tap="taskExplain(item)"></text>
                </view>
                <view class="bottom">
                    {{item.submitStatus==-1 ?"待完成":item.submitStatus == 0?"完成中":item.submitStatus == 1 ?"审核中":item.submitStatus==2?"审核结算":"失败"}}
                </view>
            </view>
            <view class="center">
                <view class="top">1</view>
                <view class="bottom">
                    试玩名额：{{item.taskNum - item.remainNum}}/{{item.taskNum}}
                </view>
            </view>
            <view class="right">
                <view class="top">
                    +{{item.awardMoney}}元
                </view>
                <view class="bottom">
                    <view class="btn" :class="item.submitStatus == -1?'bg-blue':item.submitStatus==0?'bg-green':'bg-grey'" @tap="submit(item,index)">{{item.submitStatus == -1?"立即领取":"立即提交"}}</view>
                </view>
            </view>
        </view>
        <!--    领取以及提交任务模态框    -->
        <hint
                :show="hint.show"
                :content="hint.content"
                :icon="hint.icon"
                :width="hint.type===1?'276.5px':'200px'"
                :height="hint.type===1?'289px':'229px'"
                :type="hint.type"
                :icon-width="hint.type===1?'178px':'100px'"
                :icon-height="hint.type===1?'178px':'89px'"
                :confirm="hint.confirm"
                :cancel="hint.cancel"
                :button="hint.button"
                @onTap="hintClick"
        >
            <view class="hint-msg-1" v-if="hint.type === 1">
                <view class="title" style="padding-top:89px;">任务完成</view>
                <view class="detail">提交审核领取试玩奖励！</view>
            </view>
            <view class="hint-msg-0" v-if="hint.type !== 1">
                <view class="title" style="padding-top:50px;">{{hint.hintTitle}}</view>
                <view class="detail">
                    {{hint.hintCont}}
                </view>
            </view>
        </hint>
    </view>
</template>

<script>
    import hint from "../hintBox/index.vue"
    export default {
        name: "task-list",
        data(){
            return{

                hint:{  // 提示信息
                    show:false,
                    icon:undefined,
                    width:undefined,
                    height:undefined,
                    type:0,
                },
                storage:{
                    loginInfo:uni.getStorageSync("loginInfo")
                }
            }

        },
        mounted(){
            debugger;
        },
        components:{
            hint
        },
        methods:{

            /**
             * 点击任务上的问号 模态框展示
             */
            taskExplain:function(data){
                this.taskModal.show = true;
                this.taskModal.sum = data.taskNum; // 总数
                this.taskModal.nums = data.taskNum - data.remainNum;  // 剩余数
                this.taskModal.condition = data.taskDesc;
                this.taskModal.endTime = data.endTime;

            },/**
             * 提交任务
             */
            submit(data,index){
                let state = typeof data.submitStatus === "string"?parseInt(data.submitStatus):data.submitStatus;
                let hint = this.hint;
                let $this = this;
                // 打开模态框
                if (state === 1 || state === 2)return;
                let setInfo = (options={})=>{
                    console.log(this.hint);
                    this.hint = Object.assign(hint,options)
                };
                uni.showLoading({
                    title:"请稍后"
                });
                console.log("状态",state);
                if(state === 0){ // 提交任务
                    // 提交ajax

                    let hintState = 1;   // 0失败
                    uni.hideLoading();
                    $this.hint.show = true;
                    setInfo({
                        icon:"../../static/hint/success.png",
                        type:1,
                        confirm:"确认提交",
                        cancel:"暂不提交",
                        button:'success'
                    });
                    this.hintClick = function (res) {
                        if (res === 0) this.hint.show = false;
                        else {
                            uni.showLoading({
                                title:"请稍后..."
                            });
                            uni.request({
                                url:$this.util.getApiUrl("/yppTask/submit_task"),
                                data:{
                                    uid:$this.storage.loginInfo.uid,
                                    taskId:data.taskId
                                },
                                method:"POST",
                                success(res){
                                    $this.hint.show = false;
                                    if (res.data.code === 200) {
                                        uni.hideLoading();
                                        $this.util.showInfo(1,res.data);
                                    }else{
                                        $this.util.showInfo(0,res.data);
                                    }
                                }
                            })
                        }
                    }
                }else if(state === -1){ // 领取任务
                    uni.request({
                        url:$this.util.getApiUrl("/yppTask/receive_task"),
                        method:"POST",
                        data:{
                            uid:$this.storage.loginInfo.uid,
                            taskId:data.taskId
                        },
                        success(result){
                            let r_data = result.data;
                            $this.hint.show = true;
                            uni.hideLoading();
                            if (r_data.code === 200) {
                                setInfo({
                                    icon:"../../static/hint/icon.png",
                                    type:0,
                                    confirm:"我知道了",
                                    hintTitle:"恭喜领取成功",
                                    hintCont:"您已领取试玩任务成功，请尽快完成试玩任务"
                                });
                                $this.data[index].submitStatus = 0;
                            }else{
                                setInfo({
                                    icon:"../../static/hint/fail.png",
                                    type:0,
                                    confirm:"我知道了",
                                    hintTitle:"很遗憾领取失败", // 很遗憾领取失败
                                    hintCont:r_data.msg, //此任务为新人专享！
                                    button:"fail"
                                });
                            }
                        }
                    });
                }
            },
        },
        props:{
            data:{
                type:Array,
                default(){
                    return []
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .taskList{
        .tab{
            display: flex;
            justify-content: center;
            .tab-item{
                padding: 15upx 47upx;
            }
            .tab-item.active{
                border-bottom:1px solid #4BB2FF;
            }
        }
        .hint{
            width: 681upx;
            height: 52upx;
            background: #F2F2F2;
            border-radius: 26upx;
            text-align: center;
            line-height: 52upx;
            margin: 30upx 0 15upx 0;
        }
        .task-item{
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            padding: 15upx 0;
            border-bottom: 1px solid #eee;
            .bottom{
                margin-top:13upx ;
            }
            .left{
                .icon-task{
                    color: #4BB2FF;
                    margin-right: 10upx;
                }
                .task-title{
                    font-size: 28upx;
                    font-weight: bold;
                }
                .top{
                    position: relative;
                }
                .question{
                    color: #818181;
                    position: absolute;
                    right: -40upx;
                    top: -8upx;
                }
                .bottom{
                    color: #4BB2FF;
                    text-indent: 42upx;
                }
            }
            .center{
                .top{
                    color: #fff;
                }
                .bottom{
                    color: #535353;
                }
            }
            .right{
                .top{
                    color: red;
                }
                .bottom{
                    .btn{
                        font-size: 28upx;
                        text-align: center;
                        width: 159upx;
                        height: 46upx;
                        line-height: 46upx;
                        color: #FFFFFF;
                        /*background: #C1C1C1;*/
                        border-radius: 23upx;
                    }
                }
            }
        }
        .task-item:last-child{
            border: none;
        }
    }

</style>