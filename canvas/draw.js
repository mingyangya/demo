//自适应屏幕
//时钟显示
var WINDOW_WIDTH=1024;
var WINDOW_HEIGHT=768;
var RADIUS=8;
var MARGIN_TOP=60;
var MARGIN_LFET=30;

// //设置截止时间
// const endTime=new Date(2017,2,12,18,47,52);

//定义当前时间
var curShowTimeSeconds=0;

// 声明小球以及颜色值
var ball=[];
var colors=["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"];

window.onload=function(){
	// 获取屏幕宽和高
	WINDOW_WIDTH=document.body.clientWidth;
	WINDOW_HEIGHT=document.body.clientHeight;
	MARGIN_LFET=Math.round(WINDOW_WIDTH/10);
	RADIUS=Math.round(WINDOW_WIDTH*4/5/108)-1;
	MARGIN_TOP=Math.round(WINDOW_HEIGHT/5);
	var canvas=document.getElementById("canvas");
	var context=canvas.getContext("2d");
	
	canvas.width=WINDOW_WIDTH;
	canvas.height=WINDOW_HEIGHT;
	
	
	//获取时间差
	curShowTimeSeconds=getCurShowTimeSeconds();

	//render(context);
	setInterval(function(){
		render(context);
		//更新画布
		update();
	},50);
}
function update(){
	//获取下一个时间
	var nextShowTimeSeconds=getCurShowTimeSeconds();
	var nextHours=parseInt(nextShowTimeSeconds/3600);
	var nextMinutes=parseInt((nextShowTimeSeconds-nextHours*3600)/60);
	var nextSeconds=nextShowTimeSeconds%60;

	//获取当前时间
	var curHours=parseInt(curShowTimeSeconds/3600);
	var curMinutes=parseInt((curShowTimeSeconds-curHours*3600)/60);
	var curSeconds=curShowTimeSeconds%60;
	if(nextSeconds!=curSeconds){
		//判断是哪一位数字发生改变
		
		//小时的十位数
		if(parseInt(curHours/10)!=parseInt(nextHours/10)){
			addBalls(MARGIN_LFET,MARGIN_TOP,parseInt(curHours/10));
		}
		//小时的个位数
		if(parseInt(curHours%10)!=parseInt(nextHours%10)){
			addBalls(MARGIN_LFET+15*(RADIUS+1),MARGIN_TOP,parseInt(curHours%10));
		}
		//分钟的十位数
		if(parseInt(curMinutes/10)!=parseInt(nextMinutes/10)){
			addBalls(MARGIN_LFET+39*(RADIUS+1),MARGIN_TOP,parseInt(curMinutes/10));
		}
		//分钟的个位数
		if(parseInt(curMinutes%10)!=parseInt(nextMinutes%10)){
			addBalls(MARGIN_LFET+54*(RADIUS+1),MARGIN_TOP,parseInt(curMinutes/10));
		}
		//秒的十位数
		if(parseInt(curSeconds/10)!=parseInt(nextSeconds/10)){
			addBalls(MARGIN_LFET+78*(RADIUS+1),MARGIN_TOP,parseInt(curSeconds/10));
		}
		//秒的个位数
		if(parseInt(curSeconds%10)!=parseInt(nextSeconds%10)){
			addBalls(MARGIN_LFET+93*(RADIUS+1),MARGIN_TOP,parseInt(curSeconds%10));
		}
		curShowTimeSeconds=nextShowTimeSeconds;
	}

	updateBalls();
	console.log(ball.length);
}
function updateBalls(){
	for(var i=0;i<ball.length;i++){
		ball[i].x+=ball[i].vx;
		ball[i].y+=ball[i].vy;
		ball[i].vy+=ball[i].g;
		if(ball[i].y>=WINDOW_HEIGHT-RADIUS){
			ball[i].y=WINDOW_HEIGHT-RADIUS;
			ball[i].vy=-ball[i].vy*0.75;

		}
	}

// 性能优化	
//控制小球的个数
	var cont=0;
	for(var i=0;i<ball.length;i++){
		if(ball[i].x+RADIUS>0&&ball[i].x-RADIUS<WINDOW_WIDTH){
			ball[cont++]=ball[i];
		}
	}
	//当小球在不在屏幕内删除
	while(ball.length>Math.min(300,cont)){
			ball.pop();
		}
		

}

function addBalls(x,y,num){
	for(var i=0;i<digit[num].length;i++){
		
		for(j=0;j<digit[num][i].length;j++){

			if(digit[num][i][j]==1){
				var aBall={
					x:x+j*2*(RADIUS+1)+(RADIUS+1),
					y:y+i*2*(RADIUS+1)+(RADIUS+1),
					g:1.5+Math.random(),
					vx:Math.pow(-1,Math.ceil(Math.random()*1000))*4,
					vy:5,
					color:colors[Math.floor(Math.random()*colors.length)]
				}
				ball.push(aBall);
			}
		}
	}


}


//设置获取时间差的方法
function getCurShowTimeSeconds(){
	var curTime=new Date();
	var ret=curTime.getHours()*3600+curTime.getMinutes()*60+curTime.getSeconds();
	// 毫秒转化为秒
	
	return ret;
}


//绘制时钟
function render(cxt){
	//clearRect() 方法清空给定矩形内的指定像素。
	//context.clearRect(x,y,width,height);
	cxt.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);
	var hours=parseInt(curShowTimeSeconds/3600);
	var minutes=parseInt((curShowTimeSeconds-hours*3600)/60);
	var seconds=curShowTimeSeconds%60;

	// var hours=12;
	// var minutes=34;
	// var seconds=56;
	
	renderDigit(MARGIN_LFET,MARGIN_TOP,parseInt(hours/10),cxt);
	renderDigit(MARGIN_LFET+15*(RADIUS+1),MARGIN_TOP,parseInt(hours%10),cxt);
	renderDigit(MARGIN_LFET+30*(RADIUS+1),MARGIN_TOP,10,cxt);
	renderDigit(MARGIN_LFET+39*(RADIUS+1),MARGIN_TOP,parseInt(minutes/10),cxt);
	renderDigit(MARGIN_LFET+54*(RADIUS+1),MARGIN_TOP,parseInt(minutes%10),cxt);
	renderDigit(MARGIN_LFET+69*(RADIUS+1),MARGIN_TOP,10,cxt);
	renderDigit(MARGIN_LFET+78*(RADIUS+1),MARGIN_TOP,parseInt(seconds/10),cxt);
	renderDigit(MARGIN_LFET+93*(RADIUS+1),MARGIN_TOP,parseInt(seconds%10),cxt);
	for(var i=0;i<ball.length;i++){
		cxt.fillStyle=ball[i].color;
		cxt.beginPath();
		cxt.arc(ball[i].x,ball[i].y,RADIUS,0,2*Math.PI,true);
		cxt.closePath();
		cxt.fill();
	}
	

}
// 绘制的坐标以及数字和绘图环境
function renderDigit(x,y,num,cxt){
	cxt.fillStyle="rgb(0,102,153)";
	
	for(var i=0;i<digit[num].length;i++){
		
		for(j=0;j<digit[num][i].length;j++){

			if(digit[num][i][j]==1){
				cxt.beginPath();
				cxt.arc(x+j*2*(RADIUS+1)+(RADIUS+1),y+i*2*(RADIUS+1)+(RADIUS+1),RADIUS,0,2*Math.PI);
				cxt.closePath();
				cxt.fill();
				
				
			}
		}
	}


}