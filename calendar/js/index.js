
//判断月份共有几天
function getTotalDaysCale(date) {
    //date={
    //  nowYear:
    //  nowMonth:
    //}
    var newDate,
        data;
    newDate = new Date(date.nowYear, (parseInt(date.nowMonth, 10) + 1), 0);
    data = newDate.getDate();
    return data;
}

//索引为0（周日）将索引设置为7；
function setIndex(num) {

    return num === 0 ? 7 : num;

}

//当前时间设置
function getNowTime() {
    var nowDate = new Date(),
        nowYear = nowDate.getFullYear(),
        nowMonth = nowDate.getMonth() + 1,
        nowDay = nowDate.getDate(),
        nowTimeObj,
        nowChageMonth = parseInt(nowMonth, 10) - 1
        indexWeek = new Date(nowYear, nowMonth - 1, 1).getDay();
    //判断当前时间所在月份的第一天是周几
    return nowTimeObj = {
        nowYear: nowYear,
        nowMonth: nowChageMonth,
        nowDay: nowDay,
        indexWeek: indexWeek
    }
}


window.onload=function(){
    function setCale(nowTimeObj) {
        var caleTime = document.getElementsByClassName('cale-top-info')[0],
            caleInfoUl = document.getElementsByClassName('cale-info')[0].getElementsByTagName('ul')[0],
            caleTimeText,
            indexWeek,
            totalDays,
            html = '';
        // 设置时间
        caleTimeText = nowTimeObj.nowYear + '年' + (parseInt(nowTimeObj.nowMonth, 10) + 1) + '月';
        caleTime.innerText=caleTimeText;
        var activeTime = document.getElementsByClassName('cale-top-info')[0],
            caleInfoLi,
            caleInfoLiText,
            activeTimeYear,
            activeTimeMOnth,
            activeTimeDay,
            data_year,
            data_month,
            prevTimeObj,
            prevTotalDays,
            indexEndWeek,
            len,
            data_day;
        //设置日历内容
        //当月第一天的索引
        indexWeek = nowTimeObj.indexWeek;
        indexWeek = setIndex(indexWeek);
        //console.log('indexWeek'+indexWeek)
        //获取这月的天数
        totalDays = getTotalDaysCale(nowTimeObj)
        prevTimeObj = {
            nowYear: nowTimeObj.nowYear,
            nowMonth: nowTimeObj.nowMonth - 1
        }
        //获的上月的天数
        prevTotalDays = getTotalDaysCale(prevTimeObj)
        // console.log(prevTotalDays)
        //将总数与7取余，7-余就是下月的时间排布
        indexEndWeek = (totalDays + indexWeek - 1) % 7;
        indexEndWeek = indexEndWeek === 0 ? 0 : (7 - indexEndWeek);
        for (var i = 0, t = 1, end = 1, len = (totalDays + indexWeek - 1 + indexEndWeek); i < len; i++) {
            //上个月的信息
            if (i < indexWeek - 1) {
                html += '<li class="caleOther">' + (prevTotalDays - indexWeek + 2) + '</li>';
                prevTotalDays++;
            } else if (i < totalDays + indexWeek - 1) {
                html += '<li class="caleDay"><span class="caleDayCircle"><a>' + t + '</a></span></li>';
                t++;
            } else {
                html += '<li class="caleOther">' + end + '</li>';
                end++;
            }
        }
        caleInfoUl.innerHTML=html;
    }

    setCale(getNowTime());

    //日历切换
    var clickL = document.getElementsByClassName('cale-top-l')[0],
        clickR = document.getElementsByClassName('cale-top-r')[0];
    clickL.onclick=function(){
        var caleTime = document.getElementsByClassName('cale-top-info')[0],
            caleInfoUl,
            caleTimeText,
            caleTimeTextMonth,
            indexWeek,
            totalDays,
            changeMonth,
            chageObj,
            time,
            changeIndex,
            indexEndWeek,
            prevTimeObj,
            len,
            html = '';
        //获取索引值
        caleTime;
        caleInfoUl = document.getElementsByClassName('cale-info')[0].getElementsByTagName('ul')[0];
        //获取当前界面的时期
        caleTimeText = caleTime.innerText;
        caleTimeTextYear = caleTimeText.split('年')[0]; //年
        caleTimeTextMonth = caleTimeText.split('年')[1].split('月')[0]; //月
        //
        //左滑月份-1
        changeMonth = parseInt(caleTimeTextMonth, 10) - 1;
        //上一年(年份变化)
        if (changeMonth === 0) {
            caleTimeTextYear = parseInt(caleTimeTextYear, 10) - 1;
            changeMonth = 12;
            //判断当前月第一天的索引
            changeIndex = new Date(caleTimeTextYear, changeMonth - 1, 1).getDay();
            changeIndex = setIndex(changeIndex);
            caleTime.innerText=time;
            //  prevTimeObj={
            //  nowYear:caleTimeTextYear,
            //  nowMonth:12
            // }
        }
        // 获得索引 new Date(2017,3,26)==>2017-4-26==>6
        changeIndex = new Date(caleTimeTextYear, changeMonth - 1, 1).getDay();
        changeIndex = setIndex(changeIndex);
        time = caleTimeTextYear + '年' + (changeMonth) + '月';
        caleTime.innerText=time;
        chageObj = {
            nowYear: caleTimeTextYear,
            nowMonth: changeMonth - 1,
            changeIndex: changeIndex
        }
        //设置日历内容
        //当月第一天的索引
        indexWeek = chageObj.changeIndex;
        //获取这月的天数
        totalDays = getTotalDaysCale(chageObj)
        //获的上月的天数
        //
        prevTimeObj = {
            nowYear: caleTimeTextYear,
            nowMonth: changeMonth - 2
        }
        prevTotalDays = getTotalDaysCale(prevTimeObj)
        //获取当月最后一天的索引
        //
        //将总数与7取余，7-余就是下月的时间排布
        indexEndWeek = (totalDays + indexWeek - 1) % 7;
        indexEndWeek = indexEndWeek === 0 ? 0 : (7 - indexEndWeek);
        for (var i = 0, t = 1, end = 1, len = (totalDays + indexWeek - 1 + indexEndWeek); i < len; i++) {
            if (i < indexWeek - 1) {
                html += '<li class="caleOther">' + (prevTotalDays - indexWeek + 2) + '</li>';
                prevTotalDays++;
            } else if (i < totalDays + indexWeek - 1) {
                html += '<li class="caleDay"><span class="caleDayCircle"><a>' + t + '</a></span></li>';
                t++;
            } else {
                html += '<li class="caleOther">' + end + '</li>';
                end++;
            }
        }
        caleInfoUl.innerHTML=html;
    }; //clickL
    clickR.onclick=function(){
        var caleTime,
            caleInfoUl,
            caleTimeText,
            caleTimeTextYear,
            caleTimeTextMonth,
            indexWeek,
            totalDays,
            prevTotalDays,
            changeMonth,
            chageObj,
            time,
            changeIndex,
            prevTimeObj,
            indexEndWeek,
            html = '',
            caleTime = document.getElementsByClassName('cale-top-info')[0],
            caleInfoUl = document.getElementsByClassName('cale-info')[0].getElementsByTagName('ul')[0],
            caleTimeText = caleTime.innerText,
            caleTimeTextYear = caleTimeText.split('年')[0],
            caleTimeTextMonth = caleTimeText.split('年')[1].split('月')[0],
            changeMonth = parseInt(caleTimeTextMonth, 10) + 1;
        //下一年       
        if (changeMonth === 13) {
            caleTimeTextYear = parseInt(caleTimeTextYear, 10) + 1;
            changeMonth = 1;
            changeIndex = new Date(caleTimeTextYear, changeMonth, 1).getDay();
            changeIndex = setIndex(changeIndex);
            caleTime.innerText=time;
        }
        changeIndex = new Date(caleTimeTextYear, changeMonth - 1, 1).getDay();
        changeIndex = setIndex(changeIndex);
        time = caleTimeTextYear + '年' + (changeMonth) + '月';
        caleTime.innerText=time;
        chageObj = {
            nowYear: caleTimeTextYear,
            nowMonth: changeMonth - 1,
            changeIndex: changeIndex
        }
        //设置日历内容
        //当月第一天的索引
        indexWeek = chageObj.changeIndex;
        //获取这月的天数
        totalDays = getTotalDaysCale(chageObj)
        //获的上月的天数
        prevTimeObj = {
            nowYear: caleTimeTextYear,
            nowMonth: changeMonth - 2
        }
        prevTotalDays = getTotalDaysCale(prevTimeObj)
        // console.log(prevTotalDays)
        //将总数与7取余，7-余就是下月的时间排布
        indexEndWeek = (totalDays + indexWeek - 1) % 7;
        indexEndWeek = indexEndWeek === 0 ? 0 : (7 - indexEndWeek);
        for (var i = 0, t = 1, end = 1, len = (totalDays + indexWeek - 1 + indexEndWeek); i < len; i++) {
            if (i < indexWeek - 1) {
                html += '<li class="caleOther">' + (prevTotalDays - indexWeek + 2) + '</li>';
                prevTotalDays++;
            } else if (i < totalDays + indexWeek - 1) {
                html += '<li class="caleDay"><span class="caleDayCircle"><a>' + t + '</a></span></li>';
                t++;
            } else {
                html += '<li class="caleOther">' + end + '</li>';
                end++;
            }
        }
        caleInfoUl.innerHTML=html;
    }; //clickR 

};

