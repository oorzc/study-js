 /**
面向对象封装datepicker
*/
;(function (w) {

  function DatePicker(options) {
    console.log(options);
    this.year = options.year || null;
    this.month = options.month || null;
    this.elem = options.elem || null;
    this.opts = options;
    this.wapper = '';
    this.isOpen = false;
    this.init();
  }

  DatePicker.prototype =  {
    constructor :  DatePicker,
        //初始化
        init : function () {
          this.getMonthData(this.year, this.month);
          this.render();
          this.bindEvent();
        },
        //获取整月日期数据
        getMonthData : function (year, month) {
          var self = this;
            //接收结果
            var arr = [];

            if (!this.year || !this.month) {
              self.year = new Date().getFullYear();
              self.month = new Date().getMonth()+1;
            }
            //获取当月第一天
            var firstDay =new Date(self.year, self.month-1, 1);
            //year, month 重新取值
            year = firstDay.getFullYear();
            month = firstDay.getMonth()+1;

            //获取第一周日期   getDay()返回一周中的某一天 (0 ~ 6)。
            var firstDayWeekDay = firstDay.getDay();

            //上月最后一天
            var lastDayOfLastMonth = new Date(year, month-1, 0);
            //存储日期、 getDate() 方法可返回月份的某一天
            var lastDateOfLastMonth = lastDayOfLastMonth.getDate();

            //计算需要显示多少个上个月天数
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
                lastDateOfLastMonth : lastDateOfLastMonth,
                days : arr
              };

            },
        //数据渲染
        render : function (direction) {
          var self = this;
          if (direction == 'prevYear') self.year--;
          if (direction == 'prevMonth') self.month--;
          if (direction == 'nextMonth') self.month++;
          if (direction == 'nextYear') self.year++;

          var html = this.buildUi(self.year, self.month);
            // $wapper = document.querySelector('ui-datepicker');
            if (!this.wapper) {
              this.wapper = document.createElement('div');
              this.wapper.className = 'ui-datepicker';
              document.body.appendChild(this.wapper);
            }
            this.wapper.innerHTML = html;

          },
        //创建ui
        buildUi : function (year, month) {
         monthDate = this.getMonthData(year,  month);
         var html = '<div class="ui-datepicker-header">'+
         '<a href="javascript:;" class="datepicker-header-btn datepicker-header-prevYear-btn">&lt;&lt;</a>'+
         '<a href="javascript:;" class="datepicker-header-btn datepicker-header-prevMonth-btn">&lt;</a>'+
         ' <span>'+monthDate.year+'-'+monthDate.month+'</span>'+
         ' <a href="javascript:;" class="datepicker-header-btn datepicker-header-nextYear-btn">&gt;&gt;</a>'+
         ' <a href="javascript:;" class="datepicker-header-btn datepicker-header-nextMonth-btn">&gt;</a>'+
         '</div>'+
         '<div class="ui-datepicker-body">'+
         ' <table class="ui-datepicker-table">'+
         ' <thead class="header">'+
         ' <tr>'+
         ' <th>一</th>'+
         ' <th>二</th>'+
         ' <th>三</th>'+
         ' <th>四</th>'+
         ' <th>五</th>'+
         ' <th>六</th>'+
         ' <th>日</th>'+
         ' </tr>'+
         ' </thead>'+
         ' <tbody class="body">';

         for (var i = 0, len = monthDate.days.length; i < len; i++) {
          var date = monthDate.days[i];
          if (i % 7 === 0) {
            html += ' <tr>';
          }
          if(monthDate.days[i].date <= 0 || monthDate.days[i].date > monthDate.lastDateOfLastMonth){
            html += '<td class="not" disabled="disabled" data-date="'+ date.showDate +'">' + date.showDate + '</td>';
          }else{
            html += ' <td data-date="'+date.showDate+'">'+date.showDate+'</td>';
          }
          if (i % 7 === 6) {
            html += ' <tr/>';
          }
        }

        html +=  ' </tbody>'+
        ' </table>'+
        '</div>';
        return html;
      },
        //绑定事件
        bindEvent : function () {
          var self = this;
          var $input = document.querySelector(this.elem);

          $input.addEventListener('click',function() {
            if (self.isOpen) {
              self.wapper.classList.remove('ui-datepicker-show');
              self.isOpen = false;
            }else{
              self.wapper.classList.add('ui-datepicker-show');
                    //根据输入框计算datepicker 位置
                    var left = $input.offsetLeft;
                    var top = $input.offsetTop;
                    var height = $input.offsetHeight;

                    self.wapper.style.top = top+height+2+'px';
                    self.wapper.style.left = left+'px';

                    self.isOpen = true;
                  }
                }, false);

          self.wapper.addEventListener('click', function(e) {
            var $target = e.target;
            if (!$target.classList.contains('datepicker-header-btn')){
             return;
           }

           //判断月份，年份选择
           if ($target.classList.contains('datepicker-header-prevMonth-btn')) {
            self.render('prevMonth');
          }else if($target.classList.contains('datepicker-header-nextMonth-btn')) {
           self.render('nextMonth');
         }else if($target.classList.contains('datepicker-header-prevYear-btn')) {
           self.render('prevYear');
         }else if($target.classList.contains('datepicker-header-nextYear-btn')) {
           self.render('nextYear');
         }
       }, false)

          self.wapper.addEventListener('click', function(e) {
            var $target = e.target;
            if ($target.tagName.toLowerCase() !== 'td') {
             return;
           }
           if (self.isOpen) {
            self.wapper.classList.remove('ui-datepicker-show');
            self.isOpen = false;
          }
            //$target.dataset.date   dataset 获取data值
            var date = new Date(self.year, self.month - 1, $target.dataset.date);
            $input.value = format(date);
          }, false)
        },

      }

    //日期补0
    function format(date) {
      var str = '';
      function padding(num) {
        if (num < 10) {
          return '0'+num;
        }
        return num;
      }
      str += date.getFullYear()+'-';
      str += padding(date.getMonth()+1)+'-';
      str += padding(date.getDate());
      return str;
    }

    w.DatePicker = DatePicker;

  })(window)