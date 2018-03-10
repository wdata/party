


!function(a){var b={},c={};c.attachEvent=function(b,c,d){return"addEventListener"in a?b.addEventListener(c,d,!1):void 0},c.fireFakeEvent=function(a,b){return document.createEvent?a.target.dispatchEvent(c.createEvent(b)):void 0},c.createEvent=function(b){if(document.createEvent){var c=a.document.createEvent("HTMLEvents");return c.initEvent(b,!0,!0),c.eventName=b,c}},c.getRealEvent=function(a){return a.originalEvent&&a.originalEvent.touches&&a.originalEvent.touches.length?a.originalEvent.touches[0]:a.touches&&a.touches.length?a.touches[0]:a};var d=[{test:("propertyIsEnumerable"in a||"hasOwnProperty"in document)&&(a.propertyIsEnumerable("ontouchstart")||document.hasOwnProperty("ontouchstart")),events:{start:"touchstart",move:"touchmove",end:"touchend"}},{test:a.navigator.msPointerEnabled,events:{start:"MSPointerDown",move:"MSPointerMove",end:"MSPointerUp"}},{test:a.navigator.pointerEnabled,events:{start:"pointerdown",move:"pointermove",end:"pointerup"}}];b.options={eventName:"tap",fingerMaxOffset:11};var e,f,g,h,i={};e=function(a){return c.attachEvent(document.body,h[a],g[a])},g={start:function(a){a=c.getRealEvent(a),i.start=[a.pageX,a.pageY],i.offset=[0,0]},move:function(a){return i.start||i.move?(a=c.getRealEvent(a),i.move=[a.pageX,a.pageY],void(i.offset=[Math.abs(i.move[0]-i.start[0]),Math.abs(i.move[1]-i.start[1])])):!1},end:function(d){if(d=c.getRealEvent(d),i.offset[0]<b.options.fingerMaxOffset&&i.offset[1]<b.options.fingerMaxOffset&&!c.fireFakeEvent(d,b.options.eventName)){if(a.navigator.msPointerEnabled||a.navigator.pointerEnabled){var e=function(a){a.preventDefault(),d.target.removeEventListener("click",e)};d.target.addEventListener("click",e,!1)}d.preventDefault()}i={}},click:function(a){return c.fireFakeEvent(a,b.options.eventName)?void 0:a.preventDefault()}},f=function(){for(var a=0;a<d.length;a++)if(d[a].test)return h=d[a].events,e("start"),e("move"),e("end"),!1;return c.attachEvent(document.body,"click",g.click)},c.attachEvent(a,"load",f),a.Tap=b}(window);
//var mySwiper = new Swiper('.swiper-container', {
//    slidesPerView : 7,
//    slidesPerGroup : 7
//});
(function($){
    $.fn.mdater = function(config){
        var defaults = {
            maxDate : null,
            minDate : new Date(1970, 0, 1)
        };
        var option = $.extend(defaults, config);
        var input = this;

        //通用函数
        var F = {
            //计算某年某月有多少天
            getDaysInMonth : function(year, month){
                return new Date(year, month+1, 0).getDate();
            },
            //计算某月1号是星期几
            getWeekInMonth : function(year, month){
                return new Date(year, month, 1).getDay();
            },
            getMonth : function(m){
                return ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'][m];
            },
            //计算年某月的最后一天日期
            getLastDayInMonth : function(year, month){
                return new Date(year, month, this.getDaysInMonth(year, month));
            }
        }
        //var mySwiper = new Swiper('.swiper-container', {
        //    slidesPerView : 7,
        //    slidesPerGroup : 7
        //});

        //为$扩展一个方法，以配置的方式代理事件
        $.fn.delegates = function(configs) {
            el = $(this[0]);
            for (var name in configs) {
                var value = configs[name];
                if (typeof value == 'function') {
                    var obj = {};
                    obj.tap = value;
                    value = obj;
                };
                for (var type in value) {
                    el.delegate(name, type, value[type]);
                }
            }
            return this;
        }

        var mdater = {
            value : {
                year : '',
                month : '',
                date : ''
            },
            lastCheckedDate : '',
            init : function(){
                this.renderHTML();
                this.initListeners();
                mySwiper.update();
            },
            renderHTML : function(){
                var $html = $('<div class="md_panel">' +
                    '<div class="md_head">' +
                    '<div class="md_selectarea">' +
                    '<a class="md_prev change_month" href="javascript:void(0);"></a>' +
                    '<a class="md_headtext yeartag" href="javascript:void(0);"></a>' +
                    '<a class="md_headtext monthtag" href="javascript:void(0);">月</a> ' +
                    '<a class="md_next change_month" href="javascript:void(0);"></a>' +
                    '</div>' +
                    '<div class="btn">'+
                    '<div onclick="trigger(this)" class="unfinish unfinished"><span>未完成</span><i></i></div>'+
                    '<div onclick="trigger(this)" class="finished unfinished hide"><i></i><span>已完成</span></div>'+
                    '</div></div>');

                $(".mission_list>.head").append($html);

            },
            _showPanel : function(container){
                this.refreshView();
                $('.md_panel, .md_mask').addClass('show');
            },
            _hidePanel : function(){
                $('.md_panel, .md_mask').removeClass('show');
            },
            _changeMonth : function(add, checkDate){
                //先把已选择的日期保存下来
                this.saveCheckedDate();
                var monthTag = $('.md_selectarea').find('.monthtag'),
                    num = ~~monthTag.data('month')+add;
                //月份变动发生了跨年
                if(num>11){
                    num = 0;
                    this.value.year++;
                    $('.yeartag').text(this.value.year+"年").data('year', this.value.year);
                }
                else if(num<0){
                    num = 11;
                    this.value.year--;
                    $('.yeartag').text(this.value.year+"年").data('year', this.value.year);
                }

                var nextMonth = F.getMonth(num)+'月';
                monthTag.text(nextMonth).data('month', num);
                this.value.month = num;
                if(checkDate){
                    this.value.date = checkDate;
                }
                else{
                    //如果有上次选择的数据，则进行赋值
                    this.setCheckedDate();
                }
                this.updateDate(add);
            },
            _changeYear : function(add){
                //先把已选择的日期保存下来
                this.saveCheckedDate();
                var yearTag = $('.md_selectarea').find('.yeartag'),
                    num = ~~yearTag.data('year')+add;
                yearTag.text(num+'年').data('year', num);
                this.value.year = num;

                this.setCheckedDate();

                this.updateDate(add);
            },
            //保存上一次选择的数据
            saveCheckedDate : function(){
                if(this.value.date){
                    this.lastCheckedDate = {
                        year : this.value.year,
                        month : this.value.month,
                        date : this.value.date
                    }
                }
            },
            //将上一次保存的数据恢复到界面
            setCheckedDate : function(){
                if(this.lastCheckedDate && this.lastCheckedDate.year==this.value.year && this.lastCheckedDate.month==this.value.month){
                    this.value.date = this.lastCheckedDate.date;
                }
                else{
                    this.value.date = '';
                }
            },
            //根据日期得到渲染天数的显示的HTML字符串
            getDateStr : function(y, m, d){                                //根据日期更新日期列表
                var swiper_day='';
                //计算1号是星期几，并补上上个月的末尾几天
                var week = F.getWeekInMonth(y, m);
                var lastMonthDays = F.getDaysInMonth(y, m-1);
                for(var j=week-1; j>=0; j--){
                    swiper_day += '<div onclick="swiper_active(this)" class="swiper-slide prevdate" data-day="'+(lastMonthDays-j)+'"><i></i><span>'+(lastMonthDays-j)+'</span></div>';
                }
                //再补上本月的所有天;
                var currentMonthDays = F.getDaysInMonth(y, m);               //根据日期得出的日期天数
                //判断是否超出允许的日期范围
                var startDay = 1,
                    endDay = currentMonthDays,
                    thisDate = new Date(y, m, d),
                    firstDate = new Date(y, m, 1),
                    lastDate =  new Date(y, m, currentMonthDays),
                    minDateDay = option.minDate.getDate();
                if(option.minDate>lastDate){
                    startDay = currentMonthDays+1;
                }
                else if(option.minDate>=firstDate && option.minDate<=lastDate){
                    startDay = minDateDay;
                }
                if(option.maxDate){
                    var maxDateDay = option.maxDate.getDate();
                    if(option.maxDate<firstDate){
                        endDay = startDay-1;
                    }
                    else if(option.maxDate>=firstDate && option.maxDate<=lastDate){
                        endDay = maxDateDay;
                    }
                }
                //将日期按允许的范围分三段拼接
                for(var i=1; i<startDay; i++){
                    swiper_day += '<div onclick="swiper_active(this)" class="swiper-slide disabled"><i></i><span>'+i+'</span></div>';
                }
                for(var j=startDay; j<=endDay; j++){
                    var current = '';
                    if(y==this.value.year && m==this.value.month && d==j){
                        current = 'current';
                    }
                    swiper_day+='<div onclick="swiper_active(this)" class="swiper-slide '+current+'"><i></i><span>'+j+'</span></div>';
                }
                for(var k=endDay+1; k<=currentMonthDays; k++){
                    swiper_day += '<div onclick="swiper_active(this)" class="swiper-slide disabled"><i></i><span>'+k+'</span></div>';
                }
                //再补上下个月的开始几天
                var nextMonthStartWeek = (currentMonthDays + week) % 7;
                if(nextMonthStartWeek!==0){
                    for(var i=1; i<=7-nextMonthStartWeek; i++){
                        swiper_day += '<div onclick="swiper_active(this)" class="swiper-slide nextdate"><i></i><span>'+i+'</span></div>';
                    }
                }
                return swiper_day;
            },
            updateDate : function(add){
                var date_swiper= $(".swiper-wrapper.in");//找到现有的滑动列表
                var dateArea = $('.md_datearea.in');//找到现在的日期列表
                if(add == 1){
                    var c1 = 'out_left';
                    var c2 = 'out_right';
                }
                else{
                    var c1 = 'out_right';
                    var c2 = 'out_left';
                }
                $(".swiper_date>.swiper-wrapper").html(this.getDateStr(this.value.year, this.value.month, this.value.date));
                mySwiper.update();
                $(".swiper_date>.swiper-wrapper").css({"transition-duration":"0ms","transform":"translate3d(0px, 0px, 0px)"});
            },
            //每次调出panel前，对界面进行重置
            refreshView : function(){
                var initVal = input.val(),
                    date = null;
                if(initVal){
                    var arr = initVal.split('-');
                    date = new Date(arr[0], arr[1]-1 , arr[2]);
                }
                else{
                    date = new Date();
                }
                var y = this.value.year = date.getFullYear(),
                    m = this.value.month = date.getMonth(),
                    d = this.value.date = date.getDate();
                $('.yeartag').text(y+"年").data('year', y);//初始化时显示的日期
                $('.monthtag').text(F.getMonth(m)+'月').data('month', m);
                var dayStr = this.getDateStr(y, m, d);
                $(".swiper-wrapper").html(dayStr);
                mySwiper.update();
            },
            initListeners : function(){
                var panel = $('.md_panel'),
                    mask = $('.md_mask'),
                    _this = this;
                window.onload=function(){
                    if(panel.hasClass('show')){
                        _this._hidePanel();
                    }
                    else{
                        _this._showPanel();
                    }
                };
                //input.on('tap', function(){
                //    if(panel.hasClass('show')){
                //        _this._hidePanel();
                //    }
                //    else{
                //        _this._showPanel();
                //    }
                //});

                mask.on('tap', function(){
                    _this._hidePanel();
                });

                panel.delegates({
                    '.change_month' : function(){
                        var add = $(this).hasClass('md_next') ? 1 : -1;
                        _this._changeMonth(add);
                    },
                    '.change_year' : function(){
                        var add = $(this).hasClass('md_next') ? 1 : -1;
                        _this._changeYear(add);
                    },
                    '.out_left, .out_right' : {
                        'webkitTransitionEnd' : function(){
                            $(this).remove();
                        }
                    },
                    '.md_datearea li' : function(){
                        var $this = $(this);
                        if($this.hasClass('disabled')){
                            return;
                        }
                        _this.value.date = $this.data('day');
                        //判断是否点击的是前一月或后一月的日期
                        var add = 0;
                        if($this.hasClass('nextdate')){
                            add = 1;
                        }
                        else if($this.hasClass('prevdate')){
                            add = -1;
                        }

                        if(add !== 0){
                            _this._changeMonth(add, _this.value.date);
                        }
                        else{
                            $this.addClass('current').siblings('.current').removeClass('current');
                        }
                    },
                    '.md_ok' : function(){
                        var monthValue = ~~_this.value.month + 1;
                        if(monthValue < 10){
                            monthValue = '0' + monthValue;
                        }
                        var dateValue = _this.value.date;
                        if(dateValue === ''){
                            dateValue = _this.value.date = 1;
                        }
                        if(dateValue < 10){
                            dateValue = '0' + dateValue;
                        }
                        input.val(_this.value.year + '-' + monthValue + '-' + dateValue);
                        _this._hidePanel();
                    },
                    '.md_cancel' : function(){
                        _this._hidePanel();
                    }
                });

            }
        }
        mdater.init();
    }
})(Zepto);
function trigger(_this){
    $(".btn>.hide").removeClass("hide");
    $(_this).addClass("hide");
}
function swiper_active(_this){
    $(".swiper_date>.swiper-wrapper>.active").removeClass("active");
    $(_this).addClass("active");
}
