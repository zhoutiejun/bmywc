class Time {
    constructor(el) {
        this.el = el;
    }
    // 开始计时器
    startTime() {
        this.timer = setInterval(()=>{
            let value = this.el.innerHTML.replace(/\s/g, "");
            value = value.split(":");
            this.el.innerHTML = this.timing(value[0], value[1]);
        }, 1000);
    }
    // 停止计时器
    stopTime() {
        clearInterval(this.timer);
    }
    // 计算时间
    timing(min, sec) {
        min = parseInt(min);
        sec = parseInt(sec);
        if(++sec >= 60) {
            sec = 0;
            min++;
        }
        return this.add0(min) + ":" + this.add0(sec);
    }
    // 小于9 补0
    add0(value) {
        return value > 9?value: `0${value}`;
    }
    // 读取时间 type = 0输入 xx:xx 输入1 返回毫秒
    getTime(type) {
        let value = this.el.innerHTML.replace(/\s/g, "");
        value = value.split(":");
        let min = parseInt(value[0]);
        let sec = parseInt(value[1]);
        switch(type) {
            case 0:
                return this.add0(min) + ":" + this.add0(sec);
                break;
            case 1:
                return min*60 + sec;
                break;
        }
    }
}
let element = [
    "xny",
    "i_x", 
    "i_y", 
    "i_in", 
    "i_count",
    "d_a",
    "d_b",
    "d_notb",
    "d_c",
    "d_shift",
    "d_alu",
    "d_a_alu",
    "d_b_alu",
    "d_notb_alu",
    "d_in_a",
    "d_in_b",
    "o_a_alu",
    "o_b_alu",
    "o_notb_alu",
    "o_alu_add1",
    "o_cnt_sub1",
    "o_in_a",
    "o_in_b",
    "o_in_c",
    "o_alu_half",
    "o_alu_init",
    "o_2_alu",
    "o_c_half",
    "o_c",
	"o_s_a",
    "_2c",
    "s_a",
    "value",
    "time"
];
const query = (json) => {
    json = json.substr(json.indexOf("?") + 1, json.length);
    json = json.substr(0, json.indexOf("#") != -1 && json.indexOf("#") || json.length).split("&");
    let query = {};
    for(let i = 0; json[i]; i++ ) {
        let value = json[i].split("=");
        query[value[0]] = value[1];
    }
    return query;
}
// 解析search
let data = query(window.location.search);
// document.getElementsByClassName("xny")[0].innerHTML = data.content + "=";

let el = [];
// 复位
function reset() {
    window.sessionStorage.setItem("type", 1);
    history.go(0);
}
// 继续
function go() {
	// 插入A的值
	if(el.o_in_a.value == 1){
		el.d_a.innerHTML = el.i_in.value;
	}
    
	// 插入B的值 还要取反
	if(el.o_in_b.value == 1){
		el.d_b.innerHTML = el.i_in.value;
		//取反
		var arr = el.i_in.value.split("");
		
		for(var i=0;i<arr.length;i++){
		
			
			if (arr[i] == 0) {
				arr[i] = 1;
			} else if (arr[i] == 1) {
				arr[i] = 0;
			}
		}
		el.d_notb.innerHTML = arr.join("");
	}
	 
	// 插入C的值
	if(el.o_in_c.value == 1){
		el.d_c.innerHTML = el.i_in.value;
	}
	
	
	
	
	var plusA = '0';
	var plusB = '0';
	
	
	// 设置值到 B-> Alu 中
	if(el.o_b_alu.value == 1){
		plusB = el.d_b.innerHTML;
		 
	}
	
	// 设置值到 /B-> Alu 中
	if(el.o_notb_alu.value == 1){
		plusB = el.d_notb.innerHTML;
		 
	}
	
	// 设置值到 A-> Alu 中
	if(el.o_a_alu.value == 1){
		plusA = el.d_a.innerHTML;
		
		el.d_alu.innerHTML =  el.d_a.innerHTML;
		
		// 设置值到 Alu+1 中  计算所得	
		if(el.o_alu_add1.value == 1){
			
			el.d_alu.innerHTML = plus(plusA, plusB, 1);
			 
		}else{
			el.d_alu.innerHTML = plus(plusA, plusB, 0);
		}
	}
	
	
	// 右移移位的元素
	var popRightEle = "";
	
	// ALU右移1位
	if(el.o_alu_half.value == 1){
		var arr = el.d_alu.innerHTML.split("");
		// 判断是不是小数 是小数就把小数点往前移动一位  因为等会儿还要补
		if(arr[2] == "."){
			arr[2]= arr[1];
			arr[1]=".";
		}
		// 移除的元素
		popRightEle = arr.pop();
		
		// 左边补一位
		var first = arr[0];
		el.d_shift.innerHTML = first+arr.join("");
	}else if(el.o_alu_init.value == 1){
		// 不移位 说明值获取到了  去掉C最后两位
		var arr = el.d_c.innerHTML.split("");
		// 移除末尾元素
		arr.pop();
		arr.pop();
		
		el.value.innerHTML = el.d_alu.innerHTML+arr.join("");
	}
	
	
	
	
	
	// C右移1位
	if(el.o_c_half.value == 1){
		var arr = el.d_c.innerHTML.split("");
		// 移除末尾元素
		arr.pop();
		
		// 左边补一位
		el.d_c.innerHTML = popRightEle+arr.join("");
	}
	
	
	// 设置值到 S-> A 中
	if(el.o_s_a.value == 1){
		el.d_a.innerHTML = el.d_shift.innerHTML;
	}
	
	
	// 设置值到 CNT-1
	if(el.o_cnt_sub1.value == 1){
		el.i_count.value = parseInt(el.i_count.value)-1;
	}
	
}


function plus(plusA, plusB, preInit){
	if(plusB == '0'){
		return plusA;
	}
	
	var arr = plusA.split("");
	var arr2 = plusB.split("");
	
	// 倒叙相加
	var pre = preInit;
	for (var i = ( arr.length- 1); i >= 0 ; i--) {
		
		if(arr[i] == "."){
			continue;
		}
		
		var res = parseInt(arr[i])+parseInt(arr2[i])+parseInt(pre);
		
		console.log("res"+res);
		
		console.log("[i]"+i);
		if( res > 1){
			arr2[i] = res%2;
			pre = 1;
		}else{
			arr2[i] = res;
		
			pre = 0;
		}
	}
	return arr2.join("");
}

// 提交
function sumbit() {
    time.stopTime();
    console.log(time.getTime(1));
    console.log(time.getTime(0));
    console.log(el.i_x.value);
    console.log(el.i_y.value);
    console.log(document.getElementById("xny").innerHTML);
    console.log(document.getElementById("valueText").innerHTML);

    var content = "x="+el.i_x.value+", y="+el.i_y.value+", "+document.getElementById("xny").innerHTML+document.getElementById("valueText").innerHTML;

    // 上传记录
    $.ajax({
        url : "/record/upload",
        type: 'POST',
        data: {username:"username", content:content, userTime: time.getTime(1)},
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        success : function(msg){
            alert("成功提交")
        },
        error : function(msg){
        }
    });
}
// 退出
function exit() {
    window.sessionStorage.setItem("type", 0);
    history.go(0);
}
let btnFun = [reset, go, sumbit, exit]
// 初始化
function init() {
    let child = document.getElementsByTagName("body")[0].
    getElementsByClassName("box")[0].children;
    for(let i = 0; child[i]; i++) {
        for(let j = 0; element[j]; j++) {
            // 获取class
            let c = child[i].className.split(" ");
            console.log(c);
            for(let s = 0; c[s]; s++) {
                if(c[s] == element[j]) {
                    let attr = element[j].replace(/^\_{0,}/g, "");
                    el[attr] = child[i];
                }
            }
        }
    }
    console.log(el);
}
init();
// 绑定事件
let btn = document.getElementsByTagName("button");
for(let i = 0; btn[i]; i++) {
    btn[i].onclick = btnFun[i];
}
// 判断是否点击复位
let type = window.sessionStorage.getItem("type");
let time = new Time(el.time);
console.log(type);
if(type == 1) {
    time = new Time(el.time);
    time.startTime();
}

/**
 * i_ 输入
 * d_ 推入
 * o_ 选择
 * 使用方式el.xx
 * "i_x", 
    "i_y", 
    "i_count",
    "d_a",
    "d_b",
    "d_notb",
    "d_c",
    "d_shift",
    "d_alu",
    "d_a_alu",
    "d_b_alu",
    "d_notb_alu",
    "d_in_a",
    "d_in_b",
    "o_a_alu",
    "o_b_alu",
    "o_notb_alu",
    "o_alu_add1",
    "o_cnt_sub1",
    "o_in_a",
    "o_in_b",
    "o_in_c",
    "o_alu_half",
    "o_alu_init",
    "o_2_alu",
    "o_c_half",
    "o_c",
    "_2c",
    "value",
    "s_a",
 */