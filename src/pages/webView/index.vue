<template>
    <view class="webview">
        <web-view>

        </web-view>
    </view>
</template>

<script>
    export default {
        name: "webview",
        data(){
            return {
                url:"#"
            }
        },
        onLoad(res){
            let url = res.url;
            console.log("信息:",res);
        }
    }
</script>

<style scoped>

</style>