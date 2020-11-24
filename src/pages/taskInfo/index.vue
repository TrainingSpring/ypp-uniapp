<template>
    <view class="task">
        <card class="header" style="padding: 20upx 35upx;" >
            <view class="dateHint">
                游戏任务时间：{{game.startTime}}-{{game.endTime}}
            </view>
            <view class="gameInfo">
                <view class="logo">
                    <image :src="game.icon"></image>
                    <view class="new" v-if="game.newGame">NEW</view>
                </view>
                <view class="info">
                    <view class="name">{{game.name}}</view>
                    <view class="state">
                        <text style="background: #4BB2FF;color: #FFF;height: 32upx;padding:0 6upx;font-size: 24upx;">
                            {{game.server}}
                        </text>
                        <text class="iconfont icon-tuijian" v-if="game.recommend"></text>
                        <text class="iconfont icon-zuixin" v-if="game.newTask"></text>
                    </view>
                    <view class="source">
                        <text>平台:&nbsp;&nbsp;{{game.source}}</text>
                        <text>类型: &nbsp;&nbsp;{{game.type}}</text>
                    </view>
                </view>
                <view class="other">
                    <view class="money">+{{game.money}}元</view>
                    <view class="date">剩余{{game.time}}</view>
                </view>
            </view>
        </card>
        <card class="userInfo" style="padding: 20upx 35upx;" title="请输入账号信息">
            <view class="right" v-if="!roleInfo">
                <bgi :src="util.getStaticUrl('task/zq.png')" class="btn" @tap="goBindInfo">
                    <text>马上去</text>
                </bgi>
            </view>
            <view class="info" v-if="!!roleInfo">
                <view class="li">账号: {{roleInfo.account}}</view>
                <view class="li">角色: {{roleInfo.role}}</view>
                <view class="li">等级: {{roleInfo.level}}</view>
                <view class="li">充值金额: {{roleInfo.money}}元</view>
                <view class="finish">
                    <view class="getMoney">+{{tools.formatMoney(game.finishedMoney)}}元</view>
                    <view class="getText">奖励已领取</view>
                </view>
            </view>
        </card>
        <card class="desc" style="padding: 20upx 35upx;" title="游戏简介">
            {{game.desc}}
        </card>
        <card class="taskList" title="试玩奖励">
            <view class="tab">
                <view class="tab-item active">任务奖励</view>
                <view class="tab-item">消耗奖励</view>
                <view class="tab-item">额外奖励</view>
            </view>
            <view class="hint"><text>请切勿在其他平台或跳转"应用商店"安装,否则将无法获得奖励</text></view>
            <!--   任务列表   -->
            <task-list v-for="item in task" v-if="task.length >0" :data="item"></task-list>
            <view v-if="task.length <= 0" class="text-center text-gray padding">暂时没有任务</view>
            <!--<view class="task-item" v-for="(item,index) in task">
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
            </view>-->
        </card>
        <view class="space"></view>
        <view class="page-bottom">
            <view class="server">
                <view class="icon">
                    <image :src="util.getStaticUrl('task/server.png')"></image>
                </view>
                <view class="text">联系客服</view>
            </view>
            <view class="btn" @tap="startTry">
                {{!login?"点击登录开始试玩":"开始试玩"}}
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
<!--    任务提示信息模态框    -->
        <view class="cu-modal task-explain" :class="taskModal.show?'show':''">
            <view class="cu-dialog">
                <view class="cu-bar justify-end bg-blue">
                    <view class="content">游戏说明</view>
                    <view class="action" @tap="hideTaskModal">
                        <text class="cuIcon-close text-white"></text>
                    </view>
                </view>
                <view class="padding-xl text-left text-xs">
                    <view class="li">试玩名额: {{taskModal.nums}}人已完成/剩余数:{{taskModal.sum - taskModal.nums}}</view>
                    <view class="li">试玩时间: {{taskModal.endTime}} 截止</view>
                    <view class="li">试玩条件: {{taskModal.condition}}</view>
                    <view class="li">如有其他问题请联系客服（9:00-18:00）</view>
                </view>
                <view class="cu-bar bg-white justify-end">
                    <button class="cu-btn bg-green bg-blue" style="width:80%;margin:0 auto;" @tap="hideModal">确定</button>
                </view>
            </view>
        </view>
        <!--   模态框  绑定游戏账号信息    -->
        <view class="cu-modal bind-account-info" @tap="modalHide(3)" :class="bindModal.show?'show':''">
            <view class="cu-dialog" @tap.stop="clearPre">
                <view class="top">
                    <bgi class="title" :src="util.getStaticUrl('taskInfo/title_bg.png')"><text>请填写游戏信息</text></bgi>
                </view>
                <view class="cu-form-group">
                    <view id="bind_info">
                        <view class="form">
                            <view class="row">
                                <view class="after">
                                    <i class="iconfont icon-ContextPhone"></i>
                                    <input type="text" id="account" v-model="bindModal.account" placeholder="请输入游戏账号">
                                </view>

                                <bgi class="get-info btn" :src="util.getStaticUrl('task/border.png')" @tap="searchRoleInfo"><text>点击查询</text></bgi>
                            </view>
                            <view class="row">
                                <i class="iconfont icon-role"></i>
                                <view class="role">
                                    <text v-if="bindModal.data.length===0">请选择游戏角色</text>
                                    <picker v-else @change="bindPickerChange" :value="bindModal.index" range-key="cp_role_name" :range="bindModal.data" >
                                        <view class="uni-input">{{bindModal.data[bindModal.index].cp_role_name}}</view>
                                    </picker>
                                </view>

                                <!-- <view class="btn select-role">选择</view> -->
                            </view>
                            <view class="row">
                                <i class="iconfont icon-dengji"></i>
                                <view class="level text">游戏等级: {{bindModal.level}}<span></span></view>
                            </view>
                             <!--<view class="row">
                                <i class="iconfont icon-jine"></i>
                                <view class="money text">充值金额:<span></span></view>
                            </view>-->
                        </view>
                        <view id="bind" @tap="bindRoleInfo">立即绑定</view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    import tools from "../../components/plugin/tool"
    import bg from "../../components/bg/index.vue"
    import card from "../../components/card/index.vue"
    import hint from "../../components/hintBox/index.vue"
    import taskList from "../../components/taskList/index.vue"

    export default {
        name: "index",
        data(){
            return {
                login:undefined, // 登录信息
                tools:tools,
                array: [{name:'中国'},{name: '美国'}, {name:'巴西'}, {name:'日本'}],
                index:0,
                game:{ // 游戏信息
                    // icon:"http://entity.90yx.cn/main/img/20201105/5fa3a4b033264.png",        // 游戏图标
                    // name:"游戏名",        // 游戏名
                    // desc:"游戏简介游戏简介游戏简介游戏简介游戏简介游戏简介游戏简介游戏简介游戏简介游戏简介游戏简介游戏简介",        // 描述
                    // progress:80,    // 进度
                    // money:tools.formatMoney(12.5),     // 赚取金额
                    // server:"二区",  // 区服
                    // recommend:true, // 推荐
                    // newGame:true,   // 新游戏
                    // newTask:true,   // 新任务
                    // source:"you迷乐",      // 平台
                    // type:"传奇",          // 游戏类型
                    // id:123,             // 游戏id
                    // time:10,            // 剩余时间
                    // finishedMoney:100  //  已完成的任务的总金额
                },
                roleInfo:  // 该游戏用户绑定信息
                undefined
                //     {
                //         account:"123456789",   // 账号
                //         role:"逆天",  // 角色
                //         level:24,   // 等级
                //         money:tools.formatMoney(145.2)  // 充值金额
                // }
                ,
                task:[  // 任务列表
                ],
                hint:{  // 提示信息
                    show:false,
                    icon:undefined,
                    width:undefined,
                    height:undefined,
                    type:0,
                },
                taskModal:{ // 任务说明模态框
                    show:false,
                    sum:null,
                    nums:null,
                    condition:null,
                    endTime:null
                },
                bindModal:{  // 绑定账号模态框
                    show:false,
                    account:null,
                    level:"",
                    data:[],
                    index:0
                },
                storage:{
                    loginInfo:uni.getStorageSync("loginInfo")
                }
            }
        },
        components:{
            bgi:bg,
            card,
            hint,
            taskList
        },
        onLoad(arg){
            let data = JSON.parse(arg.data);  // 游戏的基本信息;
            let gameId = parseInt(data.gameId);
            let serverId =parseInt(data.serverId);
            let $this = this;
            // this.login = userInfo;
            let loginInfo = uni.getStorageSync("loginInfo"); // 获取用户登录的uid等信息
            // 获取游戏的相关信息
            uni.request({
                url:$this.util.getApiUrl("/yppGame/get_game_gameServer_info"),
                data:{
                    gameId,
                    serverId
                },
                method:"POST",
                success:function (result) {
                    let res_data = result.data;
                    if (res_data.code === 200) {
                        console.log(res_data,"游戏详情");
                        let res = res_data.result;
                        let surTime = $this.util.surplusTime(res.startTime,res.endTime);
                        // console.log(down_str);
                        $this.game = { // 游戏信息
                            android:res.androidDownUrl,  // 安卓下载地址
                            ios:res.iosDownUrl,    // IOS 下载地址
                            icon: data.gameLogo,        // 游戏图标
                            name: res.gameName,        // 游戏名
                            desc: res.gameDesc,        // 描述
                            money: data.money,     // 赚取金额
                            server: data.serverName,  // 区服
                            recommend: data.isRecommend, // 推荐
                            newGame: data.gameTag,   // 新游戏
                            newTask: data.isNewServer,   // 新任务
                            source: res.platformName,      // 平台
                            type: res.typeName,          // 游戏类型
                            gameId: res.gameId,             // 游戏id
                            serverId: res.serverId,         // 区服id
                            time: surTime,            // 剩余时间
                            finishedMoney: 100,  //  已完成的任务的总金额
                            startTime: $this.util.formatDate(res.startTime, 0, "MM月dd日 hh时"),  // 开始时间
                            endTime: $this.util.formatDate(res.endTime, 0, "MM月dd日 hh时"),  // 结束时间
                        };
                        $this.init($this.game);
                    }else{
                        $this.util.showInfo(0,data)
                    }
                }
            });
        },
        onShow(){
            if (this.game.gameId)
                this.init(this.game);
        },
        methods:{
            /**
             * @desc 初始化页面数据:
             *          1 . 登录信息
             *          2 . 角色绑定信息
             *          3. 任务信息
             * */
            init(gameInfo){
                let $this = this;
                let userInfo = this.login = uni.getStorageSync("userInfo");  // 获取用户登录信息
                let uid = !userInfo?null:uni.getStorageSync("loginInfo").uid;
                // 获取游戏任务相关信息
                uni.request({
                    url:$this.util.getApiUrl("/yppTask/get_task_list_and_isreceive"),
                    data:{
                        uid:uid,
                        gameId:$this.game.gameId,
                        serverId:$this.game.serverId,
                        taskType:1
                    },
                    method:"POST",
                    success(res){
                        let r_data = res.data;
                        if (r_data.code === 200) {
                            $this.task = r_data.result.records;
                        }else{
                            $this.util.showInfo(0,r_data);
                        }
                    }
                });
                if (!userInfo) return;
                // 获取角色绑定相关信息
                uni.request({
                    url:$this.util.getApiUrl("/yppUser/get_bind_user_game_acccount"),
                    method:"POST",
                    data:{
                        uid,
                        gameId:gameInfo.gameId,
                        serverId:gameInfo.serverId
                    },
                    success(res){
                        let data = res.data;
                        if (data.code === 200) {
                            $this.roleInfo = {
                                account:data.result.account,
                                role:data.result.roleName
                            };
                        }
                    }
                })
            },
            /**
             * @desc 绑定滑动选择框信息
             * */
            bindPickerChange: function(e) {
                let index = e.detail.value;
                this.bindModal.index = index;
                this.bindModal.level = this.bindModal.data[index]["cp_role_level"];
            },
            /**
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
                            icon:$this.util.getStaticUrl("hint/success.png"),
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
                                    icon:$this.util.getStaticUrl("hint/icon.png"),
                                    type:0,
                                    confirm:"我知道了",
                                    hintTitle:"恭喜领取成功",
                                    hintCont:"您已领取试玩任务成功，请尽快完成试玩任务"
                                });
                                $this.task[index].submitStatus = 0;
                            }else{
                                setInfo({
                                    icon:$this.util.getStaticUrl("hint/fail.png"),
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
            /**
             * 去绑定信息
             * */
            goBindInfo(){
                this.bindModal.show = true;
            },
            /**
             *
             * */
            modalHide(e){
                if (e === 3)
                    this.bindModal.show = false;
                else if(e === 2)
                    this.hint.show = false;
                else
                    this.taskModal.show = false;
            },
            /**去除事件冒泡*/
            clearPre(){},
            /**
             *  当提示框的按钮被点击时
             */
            hintClick(val){
                this.hint.show = false;
            },
            /**
             * 点击任务上的问号 模态框展示
             */
            taskExplain:function(data){
                this.taskModal.show = true;
                this.taskModal.sum = data.taskNum; // 总数
                this.taskModal.nums = data.taskNum - data.remainNum;  // 剩余数
                this.taskModal.condition = data.taskDesc;
                this.taskModal.endTime = data.endTime;

            },
            /**
             * 关闭任务模态框
             */
            hideTaskModal:function () {
                this.taskModal.show = false;
            },
            /**
             * 开始试玩
             */
            startTry(){
                let $this = this;
                if(!this.login){
                    uni.navigateTo({
                        url:"../login/index"
                    })
                }else{
                    uni.getSystemInfo({
                        success(res){
                            uni.setClipboardData({
                                data:$this.game[res.platform],
                                success(){
                                    uni.showToast({
                                        title:"已将下载地址复制到剪切板,请前往浏览器粘贴下载!",
                                        icon:"none",
                                        duration:5000
                                    })
                                }
                            });
                        },
                        fail(err){

                        }
                    })

                }
            },
            /**
             * 查询角色信息
             */
            searchRoleInfo(){
                let $this = this;
                // userId:"56453791",
                // gameName:"轩辕剑群侠录商城版",
                // serverName:"宝石1区"
                if (!$this.bindModal.account)
                    return uni.showToast({
                        title:"请输入账号",
                        icon:"none"
                    });
                uni.request({
                    url:$this.util.getApiUrl("/request/post"),
                    data:{
                        url:"http://sdk.msg.server.90yx.cn/sdk/game_user_role_new",
                            userId: $this.bindModal.account, //56454370, // $this.bindModal.account,
                            gameName: $this.game.name,// "三国计", // $this.game.name,
                            serverName: $this.game.server // "战火连天1区" //$this.game.server

                    },
                    method:"POST",
                    header:{
                      "Content-Type":'application/x-www-form-urlencoded'
                    },
                    success:function (result) {
                        console.log(result.data.result);
                        if (result.data.code === 200) {
                            if (result.data.result.status === 0) {
                                $this.bindModal.data = result.data.result.info;
                                $this.bindModal.level = result.data.result.info[0]["cp_role_level"]
                            }else
                                uni.showToast({
                                    title:result.data.result.info,
                                    icon:"none"
                                })


                        }else{
                            $this.util.showInfo(0,result.data);
                        }
                    }
                })
            },
            /**
             * 绑定游戏角色信息
             * 立即绑定按钮
             */
            bindRoleInfo(){
                let $this = this;
                uni.request({
                    url:$this.util.getApiUrl("/yppUser/bind_user_game_account"),
                    data:{
                        account:$this.roleInfo.account,
                        gameId:$this.info.id,
                        gameName:$this.info.name,
                        roleName:$this.roleInfo.role,
                        serverName:$this.info.server,
                        serverId:$this.info.serverId
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../components/plugin/colorui/icon.css";
    @import "../../components/plugin/colorui/main.css";
    @import "../../components/plugin/colorui/animation.css";
    @import "../../static/css/iconfont.css";
    @import "../../static/css/iconfont_1.css";
    image{
        width: 100%;
        height: 100%;
    }
    page{
        background-color: #F2F2F2;
    }
    /*.card{*/
    /*    background-color: #fff;*/
    /*    border-radius: 10upx;*/
    /*    margin-top: 14upx;*/
    /*    box-shadow:1px 1px 2px 2px #eee;*/
    /*    padding: 0 34upx;*/
    /*}*/
    .task{
        card{

        }
        .dateHint{
            font-size: 24upx;
            font-family: Source Han Sans CN;
            font-weight: bold;
            color: #FEFEFE;
            width: 100%;
            height: 40upx;
            line-height: 40upx;
            background: #95C9FC;
            text-align: center;
            border-radius: 20upx;
        }
        .gameInfo{
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top:20upx;
            .logo{
                width: 136upx;
                height: 136upx;
                overflow: hidden;
                .new{
                    background: red;
                    color: white;
                    font-size: 24upx;
                    width: 200%;
                    text-align: center;
                    height: 24upx;
                    line-height:  24upx;
                    transform: rotateZ(45deg) translateX(-112upx) translateY(-70upx) scale(0.8);
                }
            }
            .info{
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                font-size: 24upx;
                .name{
                    font-size: 28upx;
                    color: #000000;
                    font-weight: bold;
                }
                .state{
                    color: red;
                    text{
                        margin-right: 10upx;
                    }
                }
                .source{
                    color: #535353;
                    text:first-child{
                        margin-right: 20upx;
                    }
                }
            }
            .other{
                font-size: 24upx;
                .money{
                    text-align: right;
                    color: red;
                }
                .date{
                    text-align: center;
                    line-height: 46upx;
                    height: 46upx;
                    width: 175upx;
                    border-radius: 23upx;
                    background-color: #95C9FC;
                    color: #FFFFFF;
                    margin-top: 20upx;
                }
            }

        }
        .userInfo{
            position: relative;
            .right{
                width:152upx;
                height: 50upx;
                color: white;
                text-indent: 1em;
                line-height: 50upx;
                font-size: 24upx;
                position: absolute;
                right: 30upx;
                top: 15upx;
            }
            .info{
                font-size: 24upx;
                color: #535353;
                .li{
                    margin-top: 17upx;
                }

                position: relative;
                .finish{
                    position: absolute;
                    right: 0;
                    top:0;
                    .getMoney{
                        font-size: 46upx;
                        color: #000;
                    }
                    .getText{
                        font-size:26upx;
                        color: #535353;
                        text-align: right;
                    }
                }
            }
        }
        .desc{
            color: #535353;
            font-size: 26upx;
        }
        .taskList{
            font-size: 24upx;
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
        .space{
            height: 132upx;
        }
        .page-bottom{
            position: fixed;
            bottom: 0;
            left: 0;
            height: 131.5upx;
            width: 100%;
            background-color: white;
            display: flex;
            justify-content: space-around;
            align-items: center;
            border-top: 1px solid #eee;
            .server{
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                /*margin-left:58upx;*/
                .icon{
                    width: 77upx;
                    height: 84upx;
                }
                .text{
                    font-size: 24upx;
                    color: #636363;
                }
            }
            .btn{
                width: 514upx;
                height: 86upx;
                border-radius: 43upx;
                text-align: center;
                line-height: 86upx;
                background: linear-gradient(140deg, #50A0FB, #2589F4);
                color: #FFFFFF;
                font-size: 36upx;
                /*margin-right: 41upx;*/
            }
        }
        .hint-msg-1{
            .title{
                font-size: 50upx;
                color: #333333;
                font-weight: bold;
            }
            .detail{
                color: #F56A1F;
                font-size: 40upx;
                margin-top: 31upx;
                text-align: center;
            }
        }
        .hint-msg-0{
            .title{
                font-size: 32upx;
                color: #333333;
            }
            .detail{
                color: #757575;
                font-size: 26upx;
                margin-top: 22upx;
                text-align: center;
                padding: 20upx;
            }
        }
        .task-explain{
            .li{
                margin-bottom: 16upx;
            }
        }
        .bind-account-info{
            .top{
                font-size: 28upx;
                padding: 20upx 0;
                .title{
                    color: #4BB2FF;
                    width:50%;
                    margin: 0 auto;
                }
            }
            #bind_info {
                width: 90%;
                margin: 0 auto;
            }
            #bind_info .form .row{
                font-size: 23.72upx;
                line-height: 62upx;
                height: 62upx;
                margin-top: 25upx;
                position: relative;
                text-align: left;
                .get-info{
                    width: 140upx;
                    height: 48upx;
                }
            }
            #bind_info .form .row .after{
                display: block;
                width: calc(100% - 160upx);
                height: 63upx;
                border-radius: 32.1upx;
                background-color: #F5F5F5;
                position: absolute;
                left: 0;
                top: 0;
                z-index: 0;
            }
            #bind_info .form .row i{
                font-size: 24upx;
                color: #ccc;
                margin-left: 34upx;
                float: left;
            }
            #bind_info .form .row input{
                width: 200upx;
                float: left;
                padding: 10upx;
                height: 100%;
                border: none;
                font-size: 12px;
                background-color: rgba(0,0,0,0);
            }
            #bind_info .form .row .btn{
                float: right;
                color: #4BB2FF;
                text-align: center;
                line-height: 48upx;
                font-size: 20upx;
                margin-top:10upx;
                /*background-image: url(../../images/modify/task-info/border.png);*/
                background-size: 100% 100%;
                background-repeat: no-repeat;
            }
            #bind_info .form .row .btn.select-role{
                /*background-image: url(../../images/modify/task-info/select.png);*/
                text-align: left;
                text-indent: 20upx;
            }
            #bind_info .form .row .role{
                border: 1px solid #eee;
                width: calc(100% - 72upx);
                height: 80%;
                text-indent: 1em;
                margin-top: 6.3upx;
                line-height: 50.4upx;
                position: relative;
                border-radius: 5px;
            }
            #bind_info .form .row .role::after{
                position: absolute;
                content: "\25BC";
                right: 10upx;
                top: 4upx;
                /*margin-right: 10upx;*/
            }
            #bind_info .form .row picker::after{
                content :"" !important;
            }
            #bind_info .form .row .role,#bind_info .form .row .text{
                display: inline-block;
                margin-left: 15upx;
                color:#ccc;
            }
            #bind{
                width: 100%;
                height: 73upx;
                line-height: 73upx;
                color:#fff;
                font-size: 12px;
                text-align: center;
                background-color: #4BB2FF;
                border-radius: 32.5upx;
                margin: 20upx auto;
            }

        }
    }
</style>