zyTabs=function(){var p,e=t.prototype;function t(t,a){return(p=this).opts=$.extend({},p.defaults,a),p.el=t,p.opts.tabs.attr("id",p.opts.id),p.opts.tabs.append(p.opts.tablist),$(p.el).append(p.opts.tabs),p.zytab=$("#"+p.opts.id),p.Init(),this}return e.defaults={id:"zy_tabs",tabs:$("<div></div>"),tablist:$("<ul></ul>"),tab:'<li data-id="#{id}" style="position:relative"><a href="#{href}">#{label}&emsp;&emsp;&emsp;</a></li>',btn:'<span class="air air-top-right delete-tab" style="top:7px;right:7px"><button class="btn btn-xs font-xs btn-default hover-transparent"><i class="fa fa-times"></i></button></span></span>',tabpanel:'<div><p style="margin: 0;"></p></div>'},e.Init=function(){p.zytab.tabs(),p.zytab.on("click","span.delete-tab",function(){var t=$(this).closest("li").remove().attr("aria-controls");$("#"+t).remove(),p.zytab.tabs("refresh");var a=$("#zy_tabs ul li").length;p.active(a-1)})},e.isTab=function(t){return 0<$("#"+t).length},e.AddTab=function(t,a,e,s){var n="zy_tabs-"+t.replace(/[ ]/g,"").replace(/(\/)/g,"");if(p.isTab(n))return String($("#"+n).index()-1);var i=$(p.opts.tab.replace(/#\{id\}/g,t).replace(/#\{href\}/g,"#"+n).replace(/#\{label\}/g,a));e&&i.append($(p.opts.btn)),p.opts.tablist.append(i);var r=$(p.opts.tabpanel).attr("id",n);return s&&r.children("p").html(s),r.hide(),p.opts.tabs.append(r),p.zytab.tabs(),p.zytab.tabs("refresh"),p.zytab.tabs("option","active",i.attr("tabindex")),null},e.getTab=function(t){var a="zy_tabs-"+t.replace(/[ ]/g,"").replace(/(\/)/g,"");if(e.isTab(a))return $("#"+a)},e.getCount=function(){return p.zytab.children("ul").children("li").length},e.active=function(t){p.zytab.tabs("option","active",t)},e.destroy=function(){p.zytab.tabs("destroy"),$("#"+p.opts.id).remove()},t}();