
$(function(){
  var playStart=$('.play-start'),
      playLoading=$('.play-loading'),
      songLine=$('.song-run-line'),
      loadTime=null,
      musicTime,
      i=1,
      secInit,
      lineTotalWidth,
      lineWid
musicTimeInit=0;
  // sec=getTime(time)-1;
  // secInit=getTime(time);
  lineTotalWidth=parseInt($('.song-line').css('width').split('px')[0],10);

  setMussic();
  //获取音乐时长
  $('.audio')[0].addEventListener("canplay", function() {
    musicTime=parseInt($('.audio')[0].duration,10);
    musicTimeInit=musicTime-1;
    $('.song-time').text(setSocond(musicTimeInit));
    console.log(musicTime)
    secInit=musicTime;
    
  });

 

  //播放
  playStart.click(function(){
  	 
    clearInterval(loadTime);

    loadTime=setInterval(function(){
      lineWid=$('.song-run-line').css('width');
      if(musicTimeInit>0){
        console.log(musicTime)
        $('.song-time').text(setSocond(musicTimeInit))

        $('.song-run-line').css({width:i*((lineTotalWidth-10)/secInit)+'px'});
  	
        i+=1;
        musicTimeInit-=1;
      }else{
        clearInterval(loadTime);
          playStart.show();
          playLoading.hide();
          $('.audio')[0].load();
          $('.song-run-line').css('width',0);
          i=1;
      }
    },1000);

    
    $(this).hide();
    playLoading.show();
   
    $('.audio')[0].play(); 


    
  });  
  //暂停
  playLoading.click(function(){
    // clearInterval(t);
    clearInterval(loadTime);
    $(this).hide();
    playStart.show();
    $('.audio')[0].pause();
  });

  var url="./json/data.json"
  $.get(url,function(data){
    console.log(data)
  },'json');


})
/**
 * @mothod  将秒数转化为小时形式方法setSocond的描述
 * @param {Number} second 秒数
 * @return {String} [小时形式]
 */
function setSocond(second){
  var str='-'+Math.floor(second/60)+':'+changeNum(second%60);
  return str;
}

/**
 * @method 将一位数转化为两位数方法的描述
 * @param  {Number} num 要改变的数字
 * @return {Number} num 改变后的数字
 */
function changeNum(num){
  return num>=10?num:'0'+num;
}

/**
* @method 生成音乐标签setMussic方法描述
* @return null
*
*/
function setMussic(){
  $('.audio-player').append('<audio src="./data/Taste.ogg" controls="false" class="audio" preload="preload"></audio>')
}

