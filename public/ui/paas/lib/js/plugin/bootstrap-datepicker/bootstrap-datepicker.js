!function(b,U){var f=b(window);function M(){return new Date(Date.UTC.apply(Date,arguments))}function h(){var t=new Date;return M(t.getFullYear(),t.getMonth(),t.getDate())}function t(t){return function(){return this[t].apply(this,arguments)}}var e,i=(e={get:function(t){return this.slice(t)[0]},contains:function(t){for(var e=t&&t.valueOf(),i=0,a=this.length;i<a;i++)if(this[i].valueOf()===e)return i;return-1},remove:function(t){this.splice(t,1)},replace:function(t){t&&(b.isArray(t)||(t=[t]),this.clear(),this.push.apply(this,t))},clear:function(){this.length=0},copy:function(){var t=new i;return t.replace(this),t}},function(){var t=[];return t.push.apply(t,arguments),b.extend(t,e),t}),m=function(t,e){this.dates=new i,this.viewDate=h(),this.focusDate=null,this._process_options(e),this.element=b(t),this.isInline=!1,this.isInput=this.element.is("input"),this.component=!!this.element.is(".date")&&this.element.find(".add-on, .input-group-addon, .btn"),this.hasInput=this.component&&this.element.find("input").length,this.component&&0===this.component.length&&(this.component=!1),this.picker=b(S.template),this._buildEvents(),this._attachEvents(),this.isInline?this.picker.addClass("datepicker-inline").appendTo(this.element):this.picker.addClass("datepicker-dropdown dropdown-menu"),this.o.rtl&&this.picker.addClass("datepicker-rtl"),this.viewMode=this.o.startView,this.o.calendarWeeks&&this.picker.find("tfoot th.today").attr("colspan",function(t,e){return parseInt(e)+1}),this._allow_update=!1,this.setStartDate(this._o.startDate),this.setEndDate(this._o.endDate),this.setDaysOfWeekDisabled(this.o.daysOfWeekDisabled),this.fillDow(),this.fillMonths(),this._allow_update=!0,this.update(),this.showMode(),this.isInline&&this.show()};m.prototype={constructor:m,_process_options:function(t){this._o=b.extend({},this._o,t);var e=this.o=b.extend({},this._o),i=e.language;switch(x[i]||(i=i.split("-")[0],x[i]||(i=c.language)),e.language=i,e.startView){case 2:case"decade":e.startView=2;break;case 1:case"year":e.startView=1;break;default:e.startView=0}switch(e.minViewMode){case 1:case"months":e.minViewMode=1;break;case 2:case"years":e.minViewMode=2;break;default:e.minViewMode=0}e.startView=Math.max(e.startView,e.minViewMode),!0!==e.multidate&&(e.multidate=Number(e.multidate)||!1,!1!==e.multidate?e.multidate=Math.max(0,e.multidate):e.multidate=1),e.multidateSeparator=String(e.multidateSeparator),e.weekStart%=7,e.weekEnd=(e.weekStart+6)%7;var a=S.parseFormat(e.format);e.startDate!==-1/0&&(e.startDate?e.startDate instanceof Date?e.startDate=this._local_to_utc(this._zero_time(e.startDate)):e.startDate=S.parseDate(e.startDate,a,e.language):e.startDate=-1/0),e.endDate!==1/0&&(e.endDate?e.endDate instanceof Date?e.endDate=this._local_to_utc(this._zero_time(e.endDate)):e.endDate=S.parseDate(e.endDate,a,e.language):e.endDate=1/0),e.daysOfWeekDisabled=e.daysOfWeekDisabled||[],b.isArray(e.daysOfWeekDisabled)||(e.daysOfWeekDisabled=e.daysOfWeekDisabled.split(/[,\s]*/)),e.daysOfWeekDisabled=b.map(e.daysOfWeekDisabled,function(t){return parseInt(t,10)});var s=String(e.orientation).toLowerCase().split(/\s+/g),n=e.orientation.toLowerCase();if(s=b.grep(s,function(t){return/^auto|left|right|top|bottom$/.test(t)}),e.orientation={x:"auto",y:"auto"},n&&"auto"!==n)if(1===s.length)switch(s[0]){case"top":case"bottom":e.orientation.y=s[0];break;case"left":case"right":e.orientation.x=s[0]}else n=b.grep(s,function(t){return/^left|right$/.test(t)}),e.orientation.x=n[0]||"auto",n=b.grep(s,function(t){return/^top|bottom$/.test(t)}),e.orientation.y=n[0]||"auto";else;},_events:[],_secondaryEvents:[],_applyEvents:function(t){for(var e,i,a,s=0;s<t.length;s++)e=t[s][0],2===t[s].length?(i=U,a=t[s][1]):3===t[s].length&&(i=t[s][1],a=t[s][2]),e.on(a,i)},_unapplyEvents:function(t){for(var e,i,a,s=0;s<t.length;s++)e=t[s][0],2===t[s].length?(a=U,i=t[s][1]):3===t[s].length&&(a=t[s][1],i=t[s][2]),e.off(i,a)},_buildEvents:function(){this.isInput?this._events=[[this.element,{focus:b.proxy(this.show,this),keyup:b.proxy(function(t){-1===b.inArray(t.keyCode,[27,37,39,38,40,32,13,9])&&this.update()},this),keydown:b.proxy(this.keydown,this)}]]:this.component&&this.hasInput?this._events=[[this.element.find("input"),{focus:b.proxy(this.show,this),keyup:b.proxy(function(t){-1===b.inArray(t.keyCode,[27,37,39,38,40,32,13,9])&&this.update()},this),keydown:b.proxy(this.keydown,this)}],[this.component,{click:b.proxy(this.show,this)}]]:this.element.is("div")?this.isInline=!0:this._events=[[this.element,{click:b.proxy(this.show,this)}]],this._events.push([this.element,"*",{blur:b.proxy(function(t){this._focused_from=t.target},this)}],[this.element,{blur:b.proxy(function(t){this._focused_from=t.target},this)}]),this._secondaryEvents=[[this.picker,{click:b.proxy(this.click,this)}],[b(window),{resize:b.proxy(this.place,this)}],[b(document),{"mousedown touchstart":b.proxy(function(t){this.element.is(t.target)||this.element.find(t.target).length||this.picker.is(t.target)||this.picker.find(t.target).length||this.hide()},this)}]]},_attachEvents:function(){this._detachEvents(),this._applyEvents(this._events)},_detachEvents:function(){this._unapplyEvents(this._events)},_attachSecondaryEvents:function(){this._detachSecondaryEvents(),this._applyEvents(this._secondaryEvents)},_detachSecondaryEvents:function(){this._unapplyEvents(this._secondaryEvents)},_trigger:function(t,e){var i=e||this.dates.get(-1),a=this._utc_to_local(i);this.element.trigger({type:t,date:a,dates:b.map(this.dates,this._utc_to_local),format:b.proxy(function(t,e){0===arguments.length?(t=this.dates.length-1,e=this.o.format):"string"==typeof t&&(e=t,t=this.dates.length-1),e=e||this.o.format;var i=this.dates.get(t);return S.formatDate(i,e,this.o.language)},this)})},show:function(){this.isInline||this.picker.appendTo("body"),this.picker.show(),this.place(),this._attachSecondaryEvents(),this._trigger("show")},hide:function(){this.isInline||this.picker.is(":visible")&&(this.focusDate=null,this.picker.hide().detach(),this._detachSecondaryEvents(),this.viewMode=this.o.startView,this.showMode(),this.o.forceParse&&(this.isInput&&this.element.val()||this.hasInput&&this.element.find("input").val())&&this.setValue(),this._trigger("hide"))},remove:function(){this.hide(),this._detachEvents(),this._detachSecondaryEvents(),this.picker.remove(),delete this.element.data().datepicker,this.isInput||delete this.element.data().date},_utc_to_local:function(t){return t&&new Date(t.getTime()+6e4*t.getTimezoneOffset())},_local_to_utc:function(t){return t&&new Date(t.getTime()-6e4*t.getTimezoneOffset())},_zero_time:function(t){return t&&new Date(t.getFullYear(),t.getMonth(),t.getDate())},_zero_utc_time:function(t){return t&&new Date(Date.UTC(t.getUTCFullYear(),t.getUTCMonth(),t.getUTCDate()))},getDates:function(){return b.map(this.dates,this._utc_to_local)},getUTCDates:function(){return b.map(this.dates,function(t){return new Date(t)})},getDate:function(){return this._utc_to_local(this.getUTCDate())},getUTCDate:function(){return new Date(this.dates.get(-1))},setDates:function(){var t=b.isArray(arguments[0])?arguments[0]:arguments;this.update.apply(this,t),this._trigger("changeDate"),this.setValue()},setUTCDates:function(){var t=b.isArray(arguments[0])?arguments[0]:arguments;this.update.apply(this,b.map(t,this._utc_to_local)),this._trigger("changeDate"),this.setValue()},setDate:t("setDates"),setUTCDate:t("setUTCDates"),setValue:function(){var t=this.getFormattedDate();this.isInput?this.element.val(t).change():this.component&&this.element.find("input").val(t).change()},getFormattedDate:function(e){e===U&&(e=this.o.format);var i=this.o.language;return b.map(this.dates,function(t){return S.formatDate(t,e,i)}).join(this.o.multidateSeparator)},setStartDate:function(t){this._process_options({startDate:t}),this.update(),this.updateNavArrows()},setEndDate:function(t){this._process_options({endDate:t}),this.update(),this.updateNavArrows()},setDaysOfWeekDisabled:function(t){this._process_options({daysOfWeekDisabled:t}),this.update(),this.updateNavArrows()},place:function(){if(!this.isInline){var t=this.picker.outerWidth(),e=this.picker.outerHeight(),i=f.width(),a=f.height(),s=f.scrollTop(),n=parseInt(this.element.parents().filter(function(){return"auto"!==b(this).css("z-index")}).first().css("z-index"))+10,r=this.component?this.component.parent().offset():this.element.offset(),h=this.component?this.component.outerHeight(!0):this.element.outerHeight(!1),o=this.component?this.component.outerWidth(!0):this.element.outerWidth(!1),d=r.left,l=r.top;this.picker.removeClass("datepicker-orient-top datepicker-orient-bottom datepicker-orient-right datepicker-orient-left"),"auto"!==this.o.orientation.x?(this.picker.addClass("datepicker-orient-"+this.o.orientation.x),"right"===this.o.orientation.x&&(d-=t-o)):(this.picker.addClass("datepicker-orient-left"),r.left<0?d-=r.left-10:r.left+t>i&&(d=i-t-10));var c,u,p=this.o.orientation.y;"auto"===p&&(c=-s+r.top-e,u=s+a-(r.top+h+e),p=Math.max(c,u)===u?"top":"bottom"),this.picker.addClass("datepicker-orient-"+p),"top"===p?l+=h:l-=e+parseInt(this.picker.css("padding-top")),n<1050&&(n=1051),this.picker.css({top:l,left:d,zIndex:n})}},_allow_update:!0,update:function(){if(this._allow_update){var t=this.dates.copy(),i=[],e=!1;arguments.length?(b.each(arguments,b.proxy(function(t,e){e instanceof Date&&(e=this._local_to_utc(e)),i.push(e)},this)),e=!0):(i=(i=this.isInput?this.element.val():this.element.data("date")||this.element.find("input").val())&&this.o.multidate?i.split(this.o.multidateSeparator):[i],delete this.element.data().date),i=b.map(i,b.proxy(function(t){return S.parseDate(t,this.o.format,this.o.language)},this)),i=b.grep(i,b.proxy(function(t){return t<this.o.startDate||t>this.o.endDate||!t},this),!0),this.dates.replace(i),this.dates.length?this.viewDate=new Date(this.dates.get(-1)):this.viewDate<this.o.startDate?this.viewDate=new Date(this.o.startDate):this.viewDate>this.o.endDate&&(this.viewDate=new Date(this.o.endDate)),e?this.setValue():i.length&&String(t)!==String(this.dates)&&this._trigger("changeDate"),!this.dates.length&&t.length&&this._trigger("clearDate"),this.fill()}},fillDow:function(){var t=this.o.weekStart,e="<tr>";if(this.o.calendarWeeks){var i='<th class="cw">&nbsp;</th>';e+=i,this.picker.find(".datepicker-days thead tr:first-child").prepend(i)}for(;t<this.o.weekStart+7;)e+='<th class="dow">'+x[this.o.language].daysMin[t++%7]+"</th>";e+="</tr>",this.picker.find(".datepicker-days thead").append(e)},fillMonths:function(){for(var t="",e=0;e<12;)t+='<span class="month">'+x[this.o.language].monthsShort[e++]+"</span>";this.picker.find(".datepicker-months td").html(t)},setRange:function(t){t&&t.length?this.range=b.map(t,function(t){return t.valueOf()}):delete this.range,this.fill()},getClassNames:function(t){var e=[],i=this.viewDate.getUTCFullYear(),a=this.viewDate.getUTCMonth(),s=new Date;return t.getUTCFullYear()<i||t.getUTCFullYear()===i&&t.getUTCMonth()<a?e.push("old"):(t.getUTCFullYear()>i||t.getUTCFullYear()===i&&t.getUTCMonth()>a)&&e.push("new"),this.focusDate&&t.valueOf()===this.focusDate.valueOf()&&e.push("focused"),this.o.todayHighlight&&t.getUTCFullYear()===s.getFullYear()&&t.getUTCMonth()===s.getMonth()&&t.getUTCDate()===s.getDate()&&e.push("today"),-1!==this.dates.contains(t)&&e.push("active"),(t.valueOf()<this.o.startDate||t.valueOf()>this.o.endDate||-1!==b.inArray(t.getUTCDay(),this.o.daysOfWeekDisabled))&&e.push("disabled"),this.range&&(t>this.range[0]&&t<this.range[this.range.length-1]&&e.push("range"),-1!==b.inArray(t.valueOf(),this.range)&&e.push("selected")),e},fill:function(){var t,e=new Date(this.viewDate),i=e.getUTCFullYear(),a=e.getUTCMonth(),s=this.o.startDate!==-1/0?this.o.startDate.getUTCFullYear():-1/0,n=this.o.startDate!==-1/0?this.o.startDate.getUTCMonth():-1/0,r=this.o.endDate!==1/0?this.o.endDate.getUTCFullYear():1/0,h=this.o.endDate!==1/0?this.o.endDate.getUTCMonth():1/0,o=x[this.o.language].today||x.en.today||"",d=x[this.o.language].clear||x.en.clear||"";this.picker.find(".datepicker-days thead th.datepicker-switch").text(x[this.o.language].months[a]+" "+i),this.picker.find("tfoot th.today").text(o).toggle(!1!==this.o.todayBtn),this.picker.find("tfoot th.clear").text(d).toggle(!1!==this.o.clearBtn),this.updateNavArrows(),this.fillMonths();var l=M(i,a-1,28),c=S.getDaysInMonth(l.getUTCFullYear(),l.getUTCMonth());l.setUTCDate(c),l.setUTCDate(c-(l.getUTCDay()-this.o.weekStart+7)%7);var u=new Date(l);u.setUTCDate(u.getUTCDate()+42),u=u.valueOf();for(var p,f=[];l.valueOf()<u;){if(l.getUTCDay()===this.o.weekStart&&(f.push("<tr>"),this.o.calendarWeeks)){var g=new Date(+l+(this.o.weekStart-l.getUTCDay()-7)%7*864e5),D=new Date(Number(g)+(11-g.getUTCDay())%7*864e5),v=new Date(Number(v=M(D.getUTCFullYear(),0,1))+(11-v.getUTCDay())%7*864e5),m=(D-v)/864e5/7+1;f.push('<td class="cw">'+m+"</td>")}if((p=this.getClassNames(l)).push("day"),this.o.beforeShowDay!==b.noop){var y=this.o.beforeShowDay(this._utc_to_local(l));y===U?y={}:"boolean"==typeof y?y={enabled:y}:"string"==typeof y&&(y={classes:y}),!1===y.enabled&&p.push("disabled"),y.classes&&(p=p.concat(y.classes.split(/\s+/))),y.tooltip&&(t=y.tooltip)}p=b.unique(p),f.push('<td class="'+p.join(" ")+'"'+(t?' title="'+t+'"':"")+">"+l.getUTCDate()+"</td>"),l.getUTCDay()===this.o.weekEnd&&f.push("</tr>"),l.setUTCDate(l.getUTCDate()+1)}this.picker.find(".datepicker-days tbody").empty().append(f.join(""));var w=this.picker.find(".datepicker-months").find("th:eq(1)").text(i).end().find("span").removeClass("active");b.each(this.dates,function(t,e){e.getUTCFullYear()===i&&w.eq(e.getUTCMonth()).addClass("active")}),(i<s||r<i)&&w.addClass("disabled"),i===s&&w.slice(0,n).addClass("disabled"),i===r&&w.slice(h+1).addClass("disabled"),f="",i=10*parseInt(i/10,10);var k=this.picker.find(".datepicker-years").find("th:eq(1)").text(i+"-"+(i+9)).end().find("td");i-=1;for(var _,C=b.map(this.dates,function(t){return t.getUTCFullYear()}),T=-1;T<11;T++)_=["year"],-1===T?_.push("old"):10===T&&_.push("new"),-1!==b.inArray(i,C)&&_.push("active"),(i<s||r<i)&&_.push("disabled"),f+='<span class="'+_.join(" ")+'">'+i+"</span>",i+=1;k.html(f)},updateNavArrows:function(){if(this._allow_update){var t=new Date(this.viewDate),e=t.getUTCFullYear(),i=t.getUTCMonth();switch(this.viewMode){case 0:this.o.startDate!==-1/0&&e<=this.o.startDate.getUTCFullYear()&&i<=this.o.startDate.getUTCMonth()?this.picker.find(".prev").css({visibility:"hidden"}):this.picker.find(".prev").css({visibility:"visible"}),this.o.endDate!==1/0&&e>=this.o.endDate.getUTCFullYear()&&i>=this.o.endDate.getUTCMonth()?this.picker.find(".next").css({visibility:"hidden"}):this.picker.find(".next").css({visibility:"visible"});break;case 1:case 2:this.o.startDate!==-1/0&&e<=this.o.startDate.getUTCFullYear()?this.picker.find(".prev").css({visibility:"hidden"}):this.picker.find(".prev").css({visibility:"visible"}),this.o.endDate!==1/0&&e>=this.o.endDate.getUTCFullYear()?this.picker.find(".next").css({visibility:"hidden"}):this.picker.find(".next").css({visibility:"visible"})}}},click:function(t){t.preventDefault();var e,i,a,s=b(t.target).closest("span, td, th");if(1===s.length)switch(s[0].nodeName.toLowerCase()){case"th":switch(s[0].className){case"datepicker-switch":this.showMode(1);break;case"prev":case"next":var n=S.modes[this.viewMode].navStep*("prev"===s[0].className?-1:1);switch(this.viewMode){case 0:this.viewDate=this.moveMonth(this.viewDate,n),this._trigger("changeMonth",this.viewDate);break;case 1:case 2:this.viewDate=this.moveYear(this.viewDate,n),1===this.viewMode&&this._trigger("changeYear",this.viewDate)}this.fill(),this._trigger("changeYearFillover",this.viewDate);break;case"today":var r=new Date;r=M(r.getFullYear(),r.getMonth(),r.getDate(),0,0,0),this.showMode(-2);var h="linked"===this.o.todayBtn?null:"view";this._setDate(r,h);break;case"clear":var o;this.isInput?o=this.element:this.component&&(o=this.element.find("input")),o&&o.val("").change(),this.update(),this._trigger("changeDate"),this.o.autoclose&&this.hide()}break;case"span":s.is(".disabled")||(this.viewDate.setUTCDate(1),s.is(".month")?(a=1,i=s.parent().find("span").index(s),e=this.viewDate.getUTCFullYear(),this.viewDate.setUTCMonth(i),this._trigger("changeMonth",this.viewDate),1===this.o.minViewMode&&this._setDate(M(e,i,a))):(a=1,i=0,e=parseInt(s.text(),10)||0,this.viewDate.setUTCFullYear(e),this._trigger("changeYear",this.viewDate),2===this.o.minViewMode&&this._setDate(M(e,i,a))),this.showMode(-1),this.fill(),this._trigger("changeYearFillover",this.viewDate));break;case"td":s.is(".day")&&!s.is(".disabled")&&(a=parseInt(s.text(),10)||1,e=this.viewDate.getUTCFullYear(),i=this.viewDate.getUTCMonth(),s.is(".old")?0===i?(i=11,e-=1):i-=1:s.is(".new")&&(11===i?(i=0,e+=1):i+=1),this._setDate(M(e,i,a)))}this.picker.is(":visible")&&this._focused_from&&b(this._focused_from).focus(),delete this._focused_from},_toggle_multidate:function(t){var e=this.dates.contains(t);if(t?-1!==e?this.dates.remove(e):this.dates.push(t):this.dates.clear(),"number"==typeof this.o.multidate)for(;this.dates.length>this.o.multidate;)this.dates.remove(0)},_setDate:function(t,e){var i;e&&"date"!==e||this._toggle_multidate(t&&new Date(t)),e&&"view"!==e||(this.viewDate=t&&new Date(t)),this.fill(),this.setValue(),this._trigger("changeDate"),this.isInput?i=this.element:this.component&&(i=this.element.find("input")),i&&i.change(),!this.o.autoclose||e&&"date"!==e||this.hide()},moveMonth:function(t,e){if(!t)return U;if(!e)return t;var i,a,s=new Date(t.valueOf()),n=s.getUTCDate(),r=s.getUTCMonth(),h=Math.abs(e);if(e=0<e?1:-1,1===h)a=-1===e?function(){return s.getUTCMonth()===r}:function(){return s.getUTCMonth()!==i},i=r+e,s.setUTCMonth(i),(i<0||11<i)&&(i=(i+12)%12);else{for(var o=0;o<h;o++)s=this.moveMonth(s,e);i=s.getUTCMonth(),s.setUTCDate(n),a=function(){return i!==s.getUTCMonth()}}for(;a();)s.setUTCDate(--n),s.setUTCMonth(i);return s},moveYear:function(t,e){return this.moveMonth(t,12*e)},dateWithinRange:function(t){return t>=this.o.startDate&&t<=this.o.endDate},keydown:function(t){if(this.picker.is(":not(:visible)"))27===t.keyCode&&this.show();else{var e,i,a,s,n=!1,r=this.focusDate||this.viewDate;switch(t.keyCode){case 27:this.focusDate?(this.focusDate=null,this.viewDate=this.dates.get(-1)||this.viewDate,this.fill()):this.hide(),t.preventDefault();break;case 37:case 39:if(!this.o.keyboardNavigation)break;e=37===t.keyCode?-1:1,t.ctrlKey?(i=this.moveYear(this.dates.get(-1)||h(),e),a=this.moveYear(r,e),this._trigger("changeYear",this.viewDate)):t.shiftKey?(i=this.moveMonth(this.dates.get(-1)||h(),e),a=this.moveMonth(r,e),this._trigger("changeMonth",this.viewDate)):((i=new Date(this.dates.get(-1)||h())).setUTCDate(i.getUTCDate()+e),(a=new Date(r)).setUTCDate(r.getUTCDate()+e)),this.dateWithinRange(i)&&(this.focusDate=this.viewDate=a,this.setValue(),this.fill(),t.preventDefault());break;case 38:case 40:if(!this.o.keyboardNavigation)break;e=38===t.keyCode?-1:1,t.ctrlKey?(i=this.moveYear(this.dates.get(-1)||h(),e),a=this.moveYear(r,e),this._trigger("changeYear",this.viewDate)):t.shiftKey?(i=this.moveMonth(this.dates.get(-1)||h(),e),a=this.moveMonth(r,e),this._trigger("changeMonth",this.viewDate)):((i=new Date(this.dates.get(-1)||h())).setUTCDate(i.getUTCDate()+7*e),(a=new Date(r)).setUTCDate(r.getUTCDate()+7*e)),this.dateWithinRange(i)&&(this.focusDate=this.viewDate=a,this.setValue(),this.fill(),t.preventDefault());break;case 32:break;case 13:r=this.focusDate||this.dates.get(-1)||this.viewDate,this._toggle_multidate(r),n=!0,this.focusDate=null,this.viewDate=this.dates.get(-1)||this.viewDate,this.setValue(),this.fill(),this.picker.is(":visible")&&(t.preventDefault(),this.o.autoclose&&this.hide());break;case 9:this.focusDate=null,this.viewDate=this.dates.get(-1)||this.viewDate,this.fill(),this.hide()}if(n)this.dates.length?this._trigger("changeDate"):this._trigger("clearDate"),this.isInput?s=this.element:this.component&&(s=this.element.find("input")),s&&s.change()}},showMode:function(t){t&&(this.viewMode=Math.max(this.o.minViewMode,Math.min(2,this.viewMode+t))),this.picker.find(">div").hide().filter(".datepicker-"+S.modes[this.viewMode].clsName).css("display","block"),this.updateNavArrows()}};var l=function(t,e){this.element=b(t),this.inputs=b.map(e.inputs,function(t){return t.jquery?t[0]:t}),delete e.inputs,b(this.inputs).datepicker(e).bind("changeDate",b.proxy(this.dateUpdated,this)),this.pickers=b.map(this.inputs,function(t){return b(t).data("datepicker")}),this.updateDates()};l.prototype={updateDates:function(){this.dates=b.map(this.pickers,function(t){return t.getUTCDate()}),this.updateRanges()},updateRanges:function(){var i=b.map(this.dates,function(t){return t.valueOf()});b.each(this.pickers,function(t,e){e.setRange(i)})},dateUpdated:function(t){if(!this.updating){this.updating=!0;var i=b(t.target).data("datepicker").getUTCDate(),e=b.inArray(t.target,this.inputs),a=this.inputs.length;if(-1!==e){if(b.each(this.pickers,function(t,e){e.getUTCDate()||e.setUTCDate(i)}),i<this.dates[e])for(;0<=e&&i<this.dates[e];)this.pickers[e--].setUTCDate(i);else if(i>this.dates[e])for(;e<a&&i>this.dates[e];)this.pickers[e++].setUTCDate(i);this.updateDates(),delete this.updating}}},remove:function(){b.map(this.pickers,function(t){t.remove()}),delete this.element.data().datepicker}};var a=b.fn.datepicker;b.fn.datepicker=function(h){var o,d=Array.apply(null,arguments);return d.shift(),this.each(function(){var t=b(this),e=t.data("datepicker"),i="object"==typeof h&&h;if(!e){var a=function(t,e){var i=b(t).data(),a={},s=new RegExp("^"+e.toLowerCase()+"([A-Z])");function n(t,e){return e.toLowerCase()}for(var r in e=new RegExp("^"+e.toLowerCase()),i)e.test(r)&&(a[r.replace(s,n)]=i[r]);return a}(this,"date"),s=function(t){var i={};if(x[t]||(t=t.split("-")[0],x[t])){var a=x[t];return b.each(u,function(t,e){e in a&&(i[e]=a[e])}),i}}(b.extend({},c,a,i).language),n=b.extend({},c,s,a,i);if(t.is(".input-daterange")||n.inputs){var r={inputs:n.inputs||t.find("input").toArray()};t.data("datepicker",e=new l(this,b.extend(n,r)))}else t.data("datepicker",e=new m(this,n))}if("string"==typeof h&&"function"==typeof e[h]&&(o=e[h].apply(e,d))!==U)return!1}),o!==U?o:this};var c=b.fn.datepicker.defaults={autoclose:!1,beforeShowDay:b.noop,calendarWeeks:!1,clearBtn:!1,daysOfWeekDisabled:[],endDate:1/0,forceParse:!0,format:"mm/dd/yyyy",keyboardNavigation:!0,language:"en",minViewMode:0,multidate:!1,multidateSeparator:",",orientation:"auto",rtl:!1,startDate:-1/0,startView:0,todayBtn:!1,todayHighlight:!1,weekStart:0},u=b.fn.datepicker.locale_opts=["format","rtl","weekStart"];b.fn.datepicker.Constructor=m;var x=b.fn.datepicker.dates={en:{days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],daysShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat","Sun"],daysMin:["Su","Mo","Tu","We","Th","Fr","Sa","Su"],months:["January","February","March","April","May","June","July","August","September","October","November","December"],monthsShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],today:"Today",clear:"Clear"}},S={modes:[{clsName:"days",navFnc:"Month",navStep:1},{clsName:"months",navFnc:"FullYear",navStep:1},{clsName:"years",navFnc:"FullYear",navStep:10}],isLeapYear:function(t){return t%4==0&&t%100!=0||t%400==0},getDaysInMonth:function(t,e){return[31,S.isLeapYear(t)?29:28,31,30,31,30,31,31,30,31,30,31][e]},validParts:/dd?|DD?|mm?|MM?|yy(?:yy)?/g,nonpunctuation:/[^ -\/:-@\[\u3400-\u9fff-`{-~\t\n\r]+/g,parseFormat:function(t){var e=t.replace(this.validParts,"\0").split("\0"),i=t.match(this.validParts);if(!e||!e.length||!i||0===i.length)throw new Error("Invalid date format.");return{separators:e,parts:i}},parseDate:function(t,e,i){if(!t)return U;if(t instanceof Date)return t;"string"==typeof e&&(e=S.parseFormat(e));var a,s,n,r=/([\-+]\d+)([dmwy])/,h=t.match(/([\-+]\d+)([dmwy])/g);if(/^[\-+]\d+[dmwy]([\s,]+[\-+]\d+[dmwy])*$/.test(t)){for(t=new Date,n=0;n<h.length;n++)switch(a=r.exec(h[n]),s=parseInt(a[1]),a[2]){case"d":t.setUTCDate(t.getUTCDate()+s);break;case"m":t=m.prototype.moveMonth.call(m.prototype,t,s);break;case"w":t.setUTCDate(t.getUTCDate()+7*s);break;case"y":t=m.prototype.moveYear.call(m.prototype,t,s)}return M(t.getUTCFullYear(),t.getUTCMonth(),t.getUTCDate(),0,0,0)}h=t&&t.match(this.nonpunctuation)||[],t=new Date;var o,d,l={},c=["yyyy","yy","M","MM","m","mm","d","dd"],u={yyyy:function(t,e){return t.setUTCFullYear(e)},yy:function(t,e){return t.setUTCFullYear(2e3+e)},m:function(t,e){if(isNaN(t))return t;for(e-=1;e<0;)e+=12;for(e%=12,t.setUTCMonth(e);t.getUTCMonth()!==e;)t.setUTCDate(t.getUTCDate()-1);return t},d:function(t,e){return t.setUTCDate(e)}};u.M=u.MM=u.mm=u.m,u.dd=u.d,t=M(t.getFullYear(),t.getMonth(),t.getDate(),0,0,0);var p=e.parts.slice();function f(){var t=this.slice(0,h[n].length);return t===h[n].slice(0,t.length)}if(h.length!==p.length&&(p=b(p).filter(function(t,e){return-1!==b.inArray(e,c)}).toArray()),h.length===p.length){var g,D,v;for(n=0,g=p.length;n<g;n++){if(o=parseInt(h[n],10),a=p[n],isNaN(o))switch(a){case"MM":d=b(x[i].months).filter(f),o=b.inArray(d[0],x[i].months)+1;break;case"M":d=b(x[i].monthsShort).filter(f),o=b.inArray(d[0],x[i].monthsShort)+1}l[a]=o}for(n=0;n<c.length;n++)(v=c[n])in l&&!isNaN(l[v])&&(D=new Date(t),u[v](D,l[v]),isNaN(D)||(t=D))}return t},formatDate:function(t,e,i){if(!t)return"";"string"==typeof e&&(e=S.parseFormat(e));var a={d:t.getUTCDate(),D:x[i].daysShort[t.getUTCDay()],DD:x[i].days[t.getUTCDay()],m:t.getUTCMonth()+1,M:x[i].monthsShort[t.getUTCMonth()],MM:x[i].months[t.getUTCMonth()],yy:t.getUTCFullYear().toString().substring(2),yyyy:t.getUTCFullYear()};a.dd=(a.d<10?"0":"")+a.d,a.mm=(a.m<10?"0":"")+a.m,t=[];for(var s=b.extend([],e.separators),n=0,r=e.parts.length;n<=r;n++)s.length&&t.push(s.shift()),t.push(a[e.parts[n]]);return t.join("")},headTemplate:'<thead><tr><th class="prev">&laquo;</th><th colspan="5" class="datepicker-switch"></th><th class="next">&raquo;</th></tr></thead>',contTemplate:'<tbody><tr><td colspan="7"></td></tr></tbody>',footTemplate:'<tfoot><tr><th colspan="7" class="today"></th></tr><tr><th colspan="7" class="clear"></th></tr></tfoot>'};S.template='<div class="datepicker"><div class="datepicker-days"><table class=" table-condensed">'+S.headTemplate+"<tbody></tbody>"+S.footTemplate+'</table></div><div class="datepicker-months"><table class="table-condensed">'+S.headTemplate+S.contTemplate+S.footTemplate+'</table></div><div class="datepicker-years"><table class="table-condensed">'+S.headTemplate+S.contTemplate+S.footTemplate+"</table></div></div>",b.fn.datepicker.DPGlobal=S,b.fn.datepicker.noConflict=function(){return b.fn.datepicker=a,this},b(document).on("focus.datepicker.data-api click.datepicker.data-api",'[data-provide="datepicker"]',function(t){var e=b(this);e.data("datepicker")||(t.preventDefault(),e.datepicker("show"))}),b(function(){b('[data-provide="datepicker-inline"]').datepicker()})}(window.jQuery);