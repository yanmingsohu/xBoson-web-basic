function drawGraphic(e){pageSetUp(),pym_sc.sendHeightToParent()}function clickToLocal(){var e=document.domain,t=window.localStorage.getItem(e+"_zy_user_lastclick");if(t){var i=$('nav a[uri="'+t+'"]');0<i.length&&i.click()}}function add_iframe(e){var t=window.location.href;window.history.pushState("","",t.replace(window.location.hash,"")),$("#left-panel nav").find("li").removeClass(),$(e).closest("li").siblings("li").children("ul").slideUp(),$(e).closest("li").addClass("active"),$(e).closest("li").parents("li").addClass("active open"),$("#content").empty();var i=zy.g.host.ui,r=location.href,a=location.protocol+i+(-1<r.indexOf(i+"/ui")?"/ui/":"/t/")+$(e).attr("uri");-1<$(e).attr("uri").indexOf("http")&&(a=$(e).attr("uri")),pym.Parent("content",a,{renderCallback:drawGraphic})._onHeightMessage($("#left-panel").height()+838);var o=$("iframe");$(o).attr("scroll","auto")}index=function(){var n,s;function o(e,t,i){var r=$.extend({},e.r_parm),a=function(e){e?t&&t(e):i&&i(e)};zy.g.am.mod=e.mod,zy.g.am.app=e.app,"getuserorg"==e.api?zy.net.get("user/"+e.api,a,r,null,null):zy.net.get("api/"+e.api,a,r,null,null)}return function(){return Console.open(),n=zy.cache.get("_zy_user_info","ls"),zy.check_xboson_system(),zy.debug?zy.g.host.ui+"/t":zy.g.host.ui+"/ui",zy.g.comm.openid=$.cookie("openid")||n.get("user_openid"),zy.g.comm.openid?o({api:"getuserorg",app:"ZYAPP_LOGIN",mod:"ZYMODULE_LOGIN"},function(e){if(e&&e.result&&0<e.result.length){n.set("user_org_list",e.result);var i=n.get("user_selected_org");if(i){var t=$.grep(e.result,function(e,t){return e.orgid===i});if(0<t.length)return zy.g.comm.org=i,o({api:"getuserinfo",app:"ZYAPP_LOGIN",mod:"ZYMODULE_LOGIN"},function(e){if(zy.g.user.userid=e.result[0].userid,$("#login_userid").html(e.result[0].name),""===e.result[0].image_path)return!1;$("#show-shortcut img").attr("src",e.result[0].image_path),"function"==typeof a&&a()}),(s=new zyMenu("#left-panel nav")).Init(r),void function(e){var t=n.get("user_org_list");if(t||(n.set("user_org_list",e),t=e),0<t.length){for(var i="",o=$("#project-context"),r=0;r<t.length;r++){1==t.length?o.children("span").eq(1).hide():o.children("span").eq(1).show();var a=t[r].isplatorg?"paas":"saas/"+t[r].orgid;i=t[r].orgid==zy.g.comm.org?(o.children(":first").html(t[r].orgnm),i+'<li style="display: none;"><a href="javascript:void(0);" data-org="'+t[r].orgid+'" data-orgpath="'+a+'" data-orgtype="'+t[r].org_type+'">'+t[r].orgnm+"</a></li>"):i+'<li><a href="javascript:void(0);" data-org="'+t[r].orgid+'" data-orgpath="'+a+'" data-orgtype="'+t[r].org_type+'">'+t[r].orgnm+"</a></li>"}$("#index_org_list").append(i),o.find("ul").find("a").on("click",function(e){var t=$(e.target).data("org"),i=$(e.target).data("orgtype"),r=$(e.target).data("orgpath");o.children(":first").html($(this).text()),$(this).parent("li").hide(),$(this).parent("li").siblings().show(),zy.g.comm.org=t;var a=zy.cache.get("_zy_user_info","ls");a.set("user_selected_org",t),a.set("user_selected_org_type",i),a.set("user_selected_org_path",r),$("#content").empty(),$("#divbigBoxes").empty(),$("#divMiniIcons").empty(),s.Init(),zy.g.comm.org=t})}}(e.result)}}var r,a;zy.net.loadLogin()},null):zy.net.loadLogin(),this}}(),index(),$("#userinfo").click(function(){zy.net.loadHTML("userinfo.html",$("#modal"))}),$("#changepassword").click(function(){zy.net.loadHTML("changepassword.html",$("#modal"))}),$("#bind_wx").click(function(){zy.net.loadHTML("user/wx-bind.htm",$("#modal"))}),$("nav").resize(function(){var e=$(this).height();$("iframe").height()<e&&$("iframe").height(e)});