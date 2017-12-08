//判断月份共有几天

function getDays(date) {
    //date={
    //  year:year
    //  month:month
    //}
    var result;
    result = new Date(date.year, (parseInt(date.month, 10) + 1), 0).getDate();

    return result;
}

//索引为0（周日）将索引设置为7；
function setIndex(num) {
    return num === 0 ? 7 : num;
}

//当前时间设置

function getNowTime() {
    var date = new Date(),
        year = date.getFullYear(),
        month = date.getMonth(),
        day = date.getDate(),
        indexWeek = new Date(year, month, 1).getDay();
    return {
        year: year,
        month: month,
        day: day,
        indexWeek: indexWeek
    }
}

function getClass(className) {
    return document.getElementsByClassName(className);
}

window.onload = function() {

    var caleTime = getClass('cale-top-info')[0],
        caleInfoUl = getClass('cale-week-ul')[0],
        caleTimeText;

    function setCale(nowTimeObj) {
        // 设置时间
        caleTimeText = nowTimeObj.year + '年' + (parseInt(nowTimeObj.month, 10) + 1) + '月';
        caleTime.innerText = caleTimeText;
        var totalDays,
            prevTotalDays,
            indexWeek,
            indexEndWeek,
            html = '';
        //设置日历内容
        //当月第一天的索引
        indexWeek = nowTimeObj.indexWeek;

        indexWeek = setIndex(indexWeek);

        //获取这月的天数
        totalDays = getDays(nowTimeObj)

        //获的上月的天数
        prevTotalDays = getDays({
            year: nowTimeObj.year,
            month: nowTimeObj.month - 1
        })
        // console.log(prevTotalDays)
        //将总数与7取余，7-余就是下月的时间排布

        indexEndWeek = (totalDays + indexWeek - 1) % 7;

        indexEndWeek = indexEndWeek === 0 ? 0 : (7 - indexEndWeek);
        for (var i = 0, t = 1, end = 1, len = (totalDays + indexWeek - 1 + indexEndWeek); i < len; i++) {
            //上个月的信息
            if (i < indexWeek - 1) {
                html += '<li class="caleOther">' + (prevTotalDays - (indexWeek - 2 - i)) + '</li>';

            } else if (i < totalDays + indexWeek - 1) {

                if (nowTimeObj.day && parseInt(nowTimeObj.day, 10) === t) {
                    html += '<li class="caleDay"><span class="caleDayCircle current"><a>' + t + '</a></span></li>';
                } else {
                    html += '<li class="caleDay"><span class="caleDayCircle"><a>' + t + '</a></span></li>';
                }
                t++;
            } else {
                html += '<li class="caleOther">' + end + '</li>';
                end++;
            }
        }
        caleInfoUl.innerHTML = html;
    }
    setCale(getNowTime());
    //日历切换
    var changeTime = getClass('cale-top')[0];

    changeTime.addEventListener('click', function(e) {
        console.log(e.target)
        var type = e.target.getAttribute('data-switch');
        type = parseInt(type, 10);

        //获取当前界面的时期
        caleTimeText = caleTime.innerText;
        var caleTimeTextYear = parseInt(caleTimeText.split('年')[0], 10); //年
        var caleTimeTextMonth = parseInt(caleTimeText.split('年')[1].split('月')[0], 10); //月

        //左滑月份-1
        var changeMonth, timeObj = {};

        if (type === 0) {
            //左点击
            changeMonth = caleTimeTextMonth - 1;
            timeObj = {
                year: caleTimeTextYear,
                month: changeMonth - 1,

                indexWeek: new Date(caleTimeTextYear, changeMonth - 1, 1).getDay()
            }
            //上一年(年份变化)
            if (changeMonth === 0) {
                caleTimeTextYear = caleTimeTextYear - 1;
                changeMonth = 12;
                timeObj = {
                    year: caleTimeTextYear,
                    month: changeMonth - 1,
                    indexWeek: new Date(caleTimeTextYear, changeMonth - 1, 1).getDay()
                }
            }
            setCale(timeObj);
        }
        if (type === 1) {
            //右点击
            changeMonth = caleTimeTextMonth + 1;
            timeObj = {
                year: caleTimeTextYear,
                month: changeMonth - 1,
                indexWeek: new Date(caleTimeTextYear, changeMonth - 1, 1).getDay()
            }
            //下一年       
            if (changeMonth === 13) {
                caleTimeTextYear = caleTimeTextYear + 1;
                changeMonth = 0;

                timeObj = {
                    year: caleTimeTextYear,
                    month: changeMonth,
                    indexWeek: new Date(caleTimeTextYear, changeMonth, 1).getDay()
                }
            }
            setCale(timeObj);
        }

    })


};