 (function (w) {
    var datepicker= {};
    /**
     * [getMonthData 获取月份数据]
     * @param  {[string]} year
     * @param  {[string]} month
     */
     datepicker.getMonthData = function(year, month) {
    //接收结果
    var arr = [];

    if (!year || !month) {
        var today = new Date();
        year = today.getFullYear();
        month = today.getMonth()+1;
    }

    //获取当月第一天
    var firstDay =new Date(year, month-1, 1);
    //year, month 重新取值
    year = firstDay.getFullYear();
    month = firstDay.getMonth()+1;

    //获取第一周日期   getDay()返回一周中的某一天 (0 ~ 6)。
    var firstDayWeekDay = firstDay.getDay();

    //如果为周天 赋值7
    // if (firstDayWeekDay === 0) firstDayWeekDay = 7;

    //上月最后一天
    var lastDayOfLastMonth = new Date(year, month-1, 0);
    //存储日期、 getDate() 方法可返回月份的某一天
    var lastDateOfLastMonth = lastDayOfLastMonth.getDate();

    //计算需要显示多少个上个月天数 第一周第几天减一
    var getLastMonthDayCount = firstDayWeekDay;

    //当月最后一天
    var lastDay = new Date(year, month, 0);
    var lastDate = lastDay.getDate();

    for (var i = 0; i < 7*6; i++) {
        //每一天的日期
        var date = i + 1 - getLastMonthDayCount;
        //实际显示日期
        var showDate = date;
        var thisMonth = month;

        if (date <= 0) {
            //上月
            thisMonth = month -1;
            showDate = lastDateOfLastMonth + date;
        }else if(date > lastDate){
            //下月
            thisMonth = month +1;
            showDate = showDate - lastDate;
        }
        //上年12月
        if (thisMonth === 0) thisMonth = 12;
        //下一年1月
        if (thisMonth === 13) thisMonth = 1;

        arr.push({
            //当前月份
            month : thisMonth,
            date : date,
            showDate : showDate
        });
    }
    return {
        year : year,
        month : month,
        days : arr
    };
}

w.datepicker = datepicker;
})(window)

