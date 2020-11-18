/***
 * @description 获取服务器api公用地址
 * @param url
 */
function getApiUrl(url: string){
    return "http://192.168.1.44:8001/front" + url;
}
interface Options {
    page:number,
    gameName?:string|null,
    gameType?:string|number|null,
    sortType?:0|1|2|3
}
function getGameInfo(options:Options = {
    page:1,
    gameName:undefined,
    gameType:null,
    sortType:0
}){
    return new Promise(((resolve, reject) => {
        uni.request({
            url:getApiUrl("/yppGame/get_sort_game_list_page"),
            method:"POST",
            data:{
                gameType:options.gameType,
                gameName:options.gameName,
                page:options.page,
                sortType:options.sortType,
                limit:10
            },
            success:function (res) {
                let data:any = res.data;
                console.log(data);
                if(data.code === 200){
                    resolve(data)
                }else{
                    reject(`${data.error},${data.msg}`)
                }
            },
            fail:function (error) {
                reject(error)
            }
        })
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
        icon:"none"
    });
}

/**
 * @desc 获取剩余时间
 * @param startTime
 * @param endTime
 */
function surplusTime(startTime:any,endTime:any) {
    let st = new Date(startTime).getTime(); // 开始时间  start time
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
 * @param precision
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
  /*  switch (precision) {
        case 'y':
            return year;
        case 'm':
            return year+(mart||"年")+month+(mart||"月");
        case 'd':
            return year+(mart||"年")+month+(mart||"月")+day+(mart===null?"日":"");
        case "h":
            return year+(mart||"年")+month+(mart||"月")+day+(mart===null?"日":"")+" "+hour+(mart?":":"时");
        case "min":
            return year+(mart||"年")+month+(mart||"月")+day+(mart===null?"日":"")+" "+hour+(mart?":":"时")+minute+(mart?":":"分");
        case "s":
            return year+(mart||"年")+month+(mart||"月")+day+(mart===null?"日":"")+" "+hour+(mart?":":"时")+minute+(mart?":":"分")+second+(mart?"":"秒");
    }*/
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
export default{
    getApiUrl,
    getGameInfo,
    showInfo,
    surplusTime,
    formatDate
}