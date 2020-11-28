<template>
    <view class="taskStatus">
        <t-radio class="sort" padding="7.5px 15px" t-key="text" :current="current" @change="radioChange" :data="sort" ></t-radio>
        <swiper :current="current">
            <swiper-item v-for="(_item,_index) in sort">
                <scroll-view scroll-y @scrolltolower="downUpdate" v-if=" !!list[_index] && list[_index].length !== 0 ">
                    <view class="cu-list menu light bg-blue">
                        <view class="cu-item solids-bottom" style="" v-for="item in list[_index]">
                            <view class="content padding-tb-sm">
                                <view class="text-black padding-right text-sm text-bold" style="display: flex;justify-content: space-between;">
                                    <text>{{item.taskName}}</text>
                                    <text class="light text-xs" :class='item.submitStatus === 0?"text-blue":item.submitStatus ===  1?"text-orange":item.submitStatus === 2?"text-green":"text-gray"'>{{item.submitStatus === 0?"待提交":item.submitStatus ===  1?"审核中":item.submitStatus === 2?"已完成":"失败"}}</text>
                                </view>
                                <view class="text-gray text-sm padding-right" style="display: flex; justify-content: space-between;">
                                    <text>{{item.gameName}}</text>
                                    <text class="text-gray">剩余{{formatEndTime(item.endTime)}}</text>
                                    <text class="text-red">￥{{item.money}}</text>
                                </view>
                            </view>
                            <view class="action" v-if="item.submitStatus === 0">
                                <button class="cu-btn bg-blue round text-sm" @tap="submitTask(item)">立即提交</button>
                            </view>
                        </view>
                    </view>
                    <view class=" text-gray text-center padding-sm" v-if="notMore">
                        <text class="cuIcon-emoji margin-right"></text><text>没有更多了</text>
                    </view>
                    <view class="cu-load cuIcon-loading loading text-black" v-if="loading"></view>
                </scroll-view>
                <view v-if="!list[_index] || list[_index].length === 0 " class="none" style="display: flex; height: calc(100% - 90upx);justify-content: center;align-items: center;margin-top: 30upx;">
                    <image :src="util.getStaticUrl('none.png')" style="width: 80%;"></image>
                </view>
            </swiper-item>
        </swiper>
    </view>
</template>

<script>
    import tradio from "../../components/radio/index.vue"
    export default {
        name: "index",
        data(){
            return {
                sort:[
                    {text:"全部", value:null},
                    {text:"待提交",value:0},
                    {text:"审核中",value:1},
                    {text:"已完成",value:2},
                    {text:"失败",value:3}
                ],
                pages:[],
                current:0,
                list:[ //

                ],
                loginInfo:uni.getStorageSync("loginInfo"),
                notMore:false,
                loading:false
            }
        },
        mounted(){
            // this.getTaskList(1,0)
        },
        onLoad(res){
            let status = parseInt(res.status);
            this.current = status+1;
            this.getTaskList(1,this.current);
        },
        methods:{
            /**
             * 提交任务
             * */
            submitTask(item){
                let $this = this;
                let index = this.current;
                uni.showModal({
                    title:"确认提交?",
                    confirmText:"确认",
                    success(result){
                        let confirm = result.confirm;
                        if (confirm) {
                            uni.showLoading({
                                title:"请稍后..."
                            });
                            let uid = uni.getStorageSync("loginInfo").uid;
                            uni.request({
                                url:$this.util.getApiUrl("/yppTask/submit_task"),
                                data:{
                                    uid,
                                    taskId:item.taskId
                                },
                                method:"POST",
                                success(res){
                                    if (res.data.code === 200) {
                                        uni.hideLoading();
                                        $this.$set($this.list[index],"submitStatus",1);
                                        $this.util.showInfo(1,res.data);
                                    }else{
                                        $this.util.showInfo(0,res.data);
                                    }
                                }
                            })

                        }
                    }
                })

            },
            /**
             * @desc 底部加载下一页
             **/
            downUpdate(){
                let index = this.current;
                let pages = this.pages[index];

                if (pages.page < pages.total){
                    this.loading = true;
                    this.getTaskList(++pages.page,index);
                }
            },
            // radio被点击
            radioChange(item){
                let index = item.index;
                let data = item.data;
                let list = this.list[index];
                this.current = index;
                if (!list) this.getTaskList(1,index);
            },
            // 格式化数据时间
            formatEndTime(time){
                let times = time.split(":");
                if (times.length === 0) return "";
                else if(times.length === 1)return times[0]+"秒";
                else if(times.length === 2)return times[0]+"分"+times[1]+"秒";
                else return times[0]+"时"+times[1]+"分"+times[2]+"秒";
            },
            /**
             * @desc 获取对应的任务数据
             * @params page: 分页
             * @params index 对应sort的索引
             */
            getTaskList(page,index){
                let $this = this;
                let state = this.sort[index];
                this.util.getGameInfo({
                    uid:$this.loginInfo.uid,
                    page,
                    sortType:0,
                    submitStatus:state.value,
                    url:"/yppTask/get_sort_user_tasks_page"
                }).then(res=>{
                    let list = res.result.records;
                    let data = $this.list[index];
                    if (!data) {
                        $this.$set($this.list,index,[])
                    }
                    // 更改显示是否有更多
                    if (res.result.pages >= page)$this.notMore = true;
                    // 添加数据到list
                    for (let i = 0; i < list.length; i++) {
                        $this.list[index].push(list[i]);
                    }
                    $this.pages[index] = {page:page,total:res.result.pages};  // 设置页码 page:当前页码, total:总页码
                    $this.loading = false;  // 是否正在加载
                })
            }
        },
        components:{

            TRadio:tradio
        }
    }
</script>

<style lang="scss" scoped>
    .taskStatus{
        height: 100vh;
        swiper{
            scroll-view{
                height: 100%;
            }
            height: calc(100vh - 102upx);
            /*height: 100px;*/
            border-top: 1px solid #eeeeee;
        }
    }
</style>