/***
 * @description 获取服务器api公用地址
 * @param url
 */
function getApiUrl(url: string | undefined){
    return "http://192.168.1.44:8001/front" + url;
}
/**
 * 获取静态文件的url前缀
 * */
function getStaticUrl(name:string){
    return "https://kumeng.oss-cn-hangzhou.aliyuncs.com/ypp_2.0/front/mini_images/static/"+name
}
interface Options {
    page:number,
    gameName?:string|null,
    gameType?:string|number|null,
    sortType?:0|1|2|3
    url?:string
    uid?:string|null|undefined
    submitStatus:string|number|null|undefined
}

/**
 * @description 获取游戏信息
 * @param options
 */
function getGameInfo(options:Options = {
    page:1,
    gameName:undefined,
    gameType:null,
    sortType:0,
    url:"/yppGame/get_sort_game_list_page",
    uid:null,
    submitStatus:null
}){
    return new Promise(((resolve, reject) => {
        let sendData:any = {
            gameType:options.gameType,
            page:options.page,
            sortType:options.sortType,
            limit:10
        };
        if (options.gameName)sendData.gameName=options.gameName;
        if (options.uid) sendData.uid = options.uid;
        if (!options.url) options.url = "/yppGame/get_sort_game_list_page";
        if (options.submitStatus !== null) sendData.submitStatus = options.submitStatus;
        uni.request({
            url:getApiUrl(options.url),
            method:"POST",
            data:sendData,
            success:function (res) {
                let data:any = res.data;
                // console.log(data,options,sendData);
                if(data.code === 200){
                    resolve(data)
                }else{
                    reject(`${data.error},${data.msg}`)
                }
            },
            fail:function (error) {
                reject(error)
            }
        });
    }))
}
function showInfo(type:Boolean,data:any) {
    let msg = "";
    if (!type)
        msg = `${data.error},${data.msg}`;
    else
        msg = data.msg;

    uni.showToast({
        title:msg,
        icon:"none",
        duration:3000
    });
}

/**
 * @desc 获取剩余时间
 * @param startTime
 * @param endTime
 */
function surplusTime(endTime:any) {
    // let st = new Date(startTime).getTime(); // 开始时间  start time
    if (typeof endTime === "string") endTime = parseInt(endTime)*1000;
    let st = new Date().getTime(); // 开始时间  start time
    let et = new Date(endTime).getTime();   // 结束时间  end time
    let down = et-st;   // 剩余时间
    let one_minute = 1000*60; // 一分钟的毫秒数
    let one_hour = one_minute*60;  // 一小时的毫秒数
    let one_day = one_hour*24;  // 一天的毫秒数
    if (down > one_day){
        return Math.floor(down/one_day)+"天"
    }else if(down >= one_hour){
        return Math.floor(down/one_hour)+"小时"
    }else if(down < one_hour){
        return Math.floor(down/one_minute)+"分"
    }
}

/**
 * @desc 格式化时间
 * @param date
 * @param type  0 以"-"分隔  1: 以"/"分隔 2:以文字分隔
 * @param fmt
 */
function formatDate(date:any,type:number,fmt:string = "yyyy-MM-dd hh:mm:ss") {
    let time = new Date(date);
    let mart = type === 0?"-":type === 1?"/":null;
    let year = time.getFullYear(); // 年
    let month = time.getMonth()+1;  // 月
    let day = time.getDate();  // 日
    let hour = time.getHours();  // 时
    let minute = time.getMinutes(); // 分
    let second = time.getSeconds(); // 秒
        var o = {
            "M+": month, // 月份
            "d+": day, // 日
            "h+": hour, // 小时
            "m+": minute, // 分
            "s+": second, // 秒
            "q+": Math.floor((minute + 3) / 3), // 季度
            "S": time.getMilliseconds() // 毫秒
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (year + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) { // @ts-ignore
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        return fmt;
}

/***
 * @author Training
 * @description 获取游戏分类
 * @param vue vue中的this
  */
function getGameTypes(vue:any) {
    return new Promise((resolve,reject)=>{
        // 获取游戏类型
        uni.request({
            url:vue.util.getApiUrl("/yppGameType/get_types"),
            method:"POST",
            success:function (result:any) {
                let data = result.data;
                if (data.code === 200) {
                    // 获取游戏列表
                    resolve(data)
                }else{
                    reject(data);
                    showInfo(false,data);
                }
            },
            fail(err){
                reject(err)
            }
        })
    })
}
/**
 * @desc 获取用户信息
 * @param $this: vue对象
 * */
function getUserInfo($this:any) {
    return new Promise((resolve,reject)=>{
        uni.request({
            url:$this.util.getApiUrl("/yppUser/get_user_info"),
            method:"POST",
            data:{
                uid:$this.loginInfo.uid
            },
            success(res){
                let data:any = res.data;
                if (data.code === 200) {
                    resolve(data);
                }else{
                    $this.util.showInfo(0,data);
                    reject(data)
                }

            },
            fail(err){
                uni.showToast({
                    title:err.errMsg,
                    icon:"none"
                });
                reject(err);
            }
        })
    })
}
function getRealInfo($this:any) {
    return new Promise((resolve,reject)=>{
        uni.request({
            url:$this.util.getApiUrl("/yppUser/check_user_is_realName_authentication"),
            data:{
                uid:$this.uid
            },
            method:"POST",
            success(res){
                let data:any = res.data;
                if (data.code === 200) {
                    resolve(data)
                }else{
                    showInfo(false,data)
                }
            }
        })
    })
}
export default{
    getUserInfo,
    getApiUrl,
    getGameInfo,
    showInfo,
    surplusTime,
    formatDate,
    getGameTypes,
    getRealInfo,
    getStaticUrl
}