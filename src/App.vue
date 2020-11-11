<script lang="ts">
    import Vue from 'vue';
    export default Vue.extend({
        mpType: 'app',
        mounted(){

        },
        onLaunch() {
            console.log('App Launch')
        },
        onShow() {
            console.log('App Show')
        },
        onHide() {
            console.log('App Hide')
        }
    });
</script>

<style>
    /*每个页面公共css */
    /*@import "./components/plugin/colorui/main.css";*/
    /*@import "./components/plugin/colorui/icon.css";*/
    *{
        font-family:微团雅黑, "Mircrosoft YaHei";
    }
</style>
