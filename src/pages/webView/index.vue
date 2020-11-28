<template>
    <view class="webview">
        <web-view src="https://baidu.com">

        </web-view>
    </view>
</template>

<script>
    export default {
        name: "webview",
        data(){
            return {
                url:"https://baidu.com"
            }
        },
        onLoad(res){
            let url = res.url;
            this.url +=res.data;
            console.log("信息:",res,this.url);
        }
    }
</script>

<style scoped>
.webview{
    width: 100%;
    height:100%;
}
</style>