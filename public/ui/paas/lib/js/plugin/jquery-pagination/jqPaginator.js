!function(i){"use strict";i.jqPaginator=function(t,a){if(!(this instanceof i.jqPaginator))return new i.jqPaginator(t,a);var l=this;return l.$container=i(t),l.$container.data("jqPaginator",l),l.init=function(){l.options=i.extend({},i.jqPaginator.defaultOptions,a),l.verify(),l.extendJquery(),l.render(),l.fireEvent(this.options.currentPage)},l.verify=function(){var t=l.options;if(!t.totalPages&&!t.totalCounts)throw new Error("[jqPaginator] totalCounts or totalPages is required");if(!t.totalPages&&t.totalCounts&&!t.pageSize)throw new Error("[jqPaginator] pageSize is required");if(t.totalCounts&&t.pageSize&&(t.totalPages=Math.ceil(t.totalCounts/t.pageSize)),t.currentPage<1||t.currentPage>t.totalPages)throw new Error("[jqPaginator] currentPage is incorrect");if(t.totalPages<1)throw new Error("[jqPaginator] totalPages cannot be less currentPage")},l.extendJquery=function(){i.fn.jqPaginatorHTML=function(t){return t?this.before(t).remove():i("<p>").append(this.eq(0).clone()).html()}},l.render=function(){l.renderHtml(),l.setStatus(),l.bindEvents()},l.renderHtml=function(){for(var t=[],a=l.getPages(),e=0,n=a.length;e<n;e++)t.push(l.buildItem("page",a[e]));l.isEnable("prev")&&t.unshift(l.buildItem("prev",l.options.currentPage-1)),l.isEnable("first")&&t.unshift(l.buildItem("first",1)),l.isEnable("statistics")&&t.unshift(l.buildItem("statistics")),l.isEnable("next")&&t.push(l.buildItem("next",l.options.currentPage+1)),l.isEnable("last")&&t.push(l.buildItem("last",l.options.totalPages)),l.options.wrapper?l.$container.html(i(l.options.wrapper).html(t.join("")).jqPaginatorHTML()):l.$container.html(t.join(""))},l.buildItem=function(t,a){var e=l.options[t].replace(/{{page}}/g,a).replace(/{{totalPages}}/g,l.options.totalPages).replace(/{{totalCounts}}/g,l.options.totalCounts);return i(e).attr({"jp-role":t,"jp-data":a}).jqPaginatorHTML()},l.setStatus=function(){var t=l.options;l.isEnable("first")&&1!==t.currentPage||i("[jp-role=first]",l.$container).addClass(t.disableClass),l.isEnable("prev")&&1!==t.currentPage||i("[jp-role=prev]",l.$container).addClass(t.disableClass),(!l.isEnable("next")||t.currentPage>=t.totalPages)&&i("[jp-role=next]",l.$container).addClass(t.disableClass),(!l.isEnable("last")||t.currentPage>=t.totalPages)&&i("[jp-role=last]",l.$container).addClass(t.disableClass),i("[jp-role=page]",l.$container).removeClass(t.activeClass),i("[jp-role=page][jp-data="+t.currentPage+"]",l.$container).addClass(t.activeClass)},l.getPages=function(){var t=[],a=l.options.visiblePages,e=l.options.currentPage,n=l.options.totalPages;n<a&&(a=n);var i=Math.floor(a/2),r=e-i+1-a%2,o=e+i;r<1&&(r=1,o=a),n<o&&(r=1+(o=n)-a);for(var s=r;s<=o;)t.push(s),s++;return t},l.isEnable=function(t){return l.options[t]&&"string"==typeof l.options[t]},l.switchPage=function(t){l.options.currentPage=t,l.render()},l.fireEvent=function(t){return"function"!=typeof l.options.onPageChange||!1!==l.options.onPageChange(t)},l.callMethod=function(t,a){switch(t){case"option":l.options=i.extend({},l.options,a),l.verify(),l.render();break;case"destroy":l.$container.empty(),l.$container.removeData("jqPaginator");break;default:throw new Error('[jqPaginator] method "'+t+'" does not exist')}return l.$container},l.bindEvents=function(){var e=l.options;l.$container.off(),l.$container.on("click","[jp-role]",function(){var t=i(this);if(!t.hasClass(e.disableClass)&&!t.hasClass(e.activeClass)){var a=+t.attr("jp-data");l.fireEvent(a)&&l.switchPage(a)}})},l.init(),l.$container},i.jqPaginator.defaultOptions={wrapper:'<ul class="pagination pagination-xs pagination-alt"></ul>',first:'<li class="first"><a href="javascript:void(0);"><i title="首　页" class="fa fa-step-backward"></i></a></li>',prev:'<li class="prev"><a href="javascript:void(0);"><i title="上一页" class="fa fa-backward"></i></a></li>',next:'<li class="next"><a href="javascript:void(0);"><i title="下一页" class="fa fa-forward"></i></a></li>',last:'<li class="last"><a href="javascript:void(0);"><i title="末　页" class="fa fa-step-forward"></i></a></li>',page:'<li class="page"><a href="javascript:void(0);">{{page}}</a></li>',totalPages:0,totalCounts:0,pageSize:0,currentPage:1,visiblePages:8,disableClass:"disabled",activeClass:"active",onPageChange:null},i.fn.jqPaginator=function(){var t=Array.prototype.slice.call(arguments);if("string"!=typeof t[0])return new i.jqPaginator(this,t[0]);var a=i(this).data("jqPaginator");if(a)return a.callMethod(t[0],t[1]);throw new Error("[jqPaginator] the element is not instantiated")}}(jQuery);