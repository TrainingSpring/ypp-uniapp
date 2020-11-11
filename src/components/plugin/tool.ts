/**
 * @param {Object} dom
 * @param {Object} className
 * 
 * 
 */
function Tools(){

}
/** 格式化钱 */ 
Tools.prototype.formatMoney = function(num:Number){
	var ts = num.toString(); // num to string -> ts
	var ta = (ts.indexOf(".")!==-1)?ts.split('.'):[ts]; // num to array -> ta
	if(ta.length>2){
		return new Error("您输入的数据错误")
	}else{
		if(ta.length === 1){
			return ta[0] + ".00"
		}else{
			if(ta[1].length === 1){
				return ta[0] + "." + ta[1] + "0";
			}else{
				return num;
			}
		}
	}
};
/**
 * @param {data:String(身份证号码),type:Number(加密类型: 0 身份证, 1 名字)}  
 * @description 加密名字和身份证号码
 * @return {String}
 */
Tools.prototype.secretInfo=function(data:String,type:Number){
	type = !type?0:type;
	var id = data+"";
	var format = "";
		for(var i = 0,len = id.length;i<len;i++){
			if(type === 0){
				if(i > 4 && i<len-4){
					format+="*"
				}else{
					format+=id[i];
				}
			}else{
				if(i<len-1) format+="*";
				else format+=id[i];
			}
		}
	return format;
};
/**
 * @description 检测输入框内容正确与否
 * @param {type,data}  
 * 		type: 
 * 			number: 输入数据是否为数字(或者小数)
 * 			phone : 输入数据与电话号码匹配
 * 			email : 输入数据是否为邮箱
 * 			id	  : 输入数据  身份证
 * 			bank  : 输入数据是否为银行卡号
 * 		data: 数据
 * */
Tools.prototype.checkInput=function(type:string,data:any){
	var reg: any = false;
	switch(type){
		case "number":
			reg = /^[0-9.]+$/;
		break;
		case "phone":
			reg = /^1[1,3,5,6,7,8,9][0-9]{9}$/;
		break;
		case "email":
			reg = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/;
		break;
		case "id":
			reg = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|[X,x]){1}$/;
		break;
		case "bank":
			reg = /^([1-9]{1})(\d{16}|\d{15}|\d{18})$/;
		break;
		case "qq":
			reg = /^[1-9][0-9]{4,9}$/;
	}
	
	return reg && reg.test(data);
};
/**
  * nums: 毫秒数
  * 倒计时 
  **/
Tools.prototype.count_down=function(nums:number,callback:any){
	callback = !callback?function(){}:callback;
	var hours = Math.floor(nums/(3600000)); // 时
	var min = Math.floor((nums - hours*3600000)/60000); // 分
	var sec = Math.floor((nums - hours * 3600000 - min * 60000)/1000); // 秒
	var timer = setInterval(function(){
		sec --;
		if(sec < 0){
			min --;
			if(min<0){
				hours --;
				if(hours<0){
					clearInterval(timer);
					hours = 0;
					min = 0;
					sec = 0;
					callback(timer,[hours,min,sec]);
					return
				}
				min = 59;
			}
			sec = 59;
		}
		callback(timer,[hours,min,sec])
	},1000)
	
};
/**
 * @Author: Training
 * @Description:检测元素是否在页面中可视部分
 * @Params: dom: 要检测的页面元素
 * @Think: 
 **/
 Tools.prototype.inWindow = function(dom:any){
 	let scrollY = window.scrollY; // Y滚动距离
 	let scrollX = window.scrollX; // X滚动距离
 	let w_height = window.innerHeight; // 窗口的高
 	let w_width = window.innerWidth; // 窗口的宽度
 	return (w_height + scrollY) > dom.offsetTop && (w_width + scrollX) > dom.offsetLeft;
 };
 // @ts-ignore
let t = new Tools();
 export default t