index=function(){var a,g;function n(e,t,r){var o=$.extend({},e.r_parm),i=function(e){e?t&&t(e):r&&r(e)};zy.g.am.mod=e.mod,zy.g.am.app=e.app,"getuserorg"==e.api?zy.net.get("user/"+e.api,i,o,null,null):zy.net.get("api/"+e.api,i,o,null,null)}return function(){return Console.open(),a=zy.cache.get("_zy_user_info","ls"),zy.check_xboson_system(),zy.debug?zy.g.host.ui+"/t":zy.g.host.ui+"/ui",zy.g.comm.openid=$.cookie("openid")||a.get("user_openid"),zy.g.comm.openid?n({api:"getuserorg",app:"ZYAPP_LOGIN",mod:"ZYMODULE_LOGIN"},function(e){if(e&&e.result&&0<e.result.length){a.set("user_org_list",e.result);var r=a.get("user_selected_org");if(r){var t=$.grep(e.result,function(e,t){return e.orgid===r});if(0<t.length)return zy.g.comm.org=r,n({api:"getuserinfo",app:"ZYAPP_LOGIN",mod:"ZYMODULE_LOGIN"},function(e){if(zy.g.user.userid=e.result[0].userid,$("#login_userid").html(e.result[0].name),""===e.result[0].image_path)return!1;$("#show-shortcut img").attr("src",e.result[0].image_path),"function"==typeof i&&i()}),(g=new zyMenu("#left-panel nav")).Init(o),void function(e){var t=a.get("user_org_list");if(t||(a.set("user_org_list",e),t=e),0<t.length){for(var r="",n=$("#project-context"),o=0;o<t.length;o++){1==t.length?n.children("span").eq(1).hide():n.children("span").eq(1).show();var i=t[o].isplatorg?"paas":"saas/"+t[o].orgid;r=t[o].orgid==zy.g.comm.org?(n.children(":first").html(t[o].orgnm),r+'<li style="display: none;"><a href="javascript:void(0);" data-org="'+t[o].orgid+'" data-orgpath="'+i+'" data-orgtype="'+t[o].org_type+'">'+t[o].orgnm+"</a></li>"):r+'<li><a href="javascript:void(0);" data-org="'+t[o].orgid+'" data-orgpath="'+i+'" data-orgtype="'+t[o].org_type+'">'+t[o].orgnm+"</a></li>"}$("#index_org_list").append(r),n.find("ul").find("a").on("click",function(e){var t=$(e.target).data("org"),r=$(e.target).data("orgtype"),o=$(e.target).data("orgpath");n.children(":first").html($(this).text()),$(this).parent("li").hide(),$(this).parent("li").siblings().show(),zy.g.comm.org=t;var i=zy.cache.get("_zy_user_info","ls");i.set("user_selected_org",t),i.set("user_selected_org_type",r),i.set("user_selected_org_path",o),$("#content").empty(),$("#divbigBoxes").empty(),$("#divMiniIcons").empty(),g.Init(),zy.g.comm.org=t})}}(e.result)}}var o,i;zy.net.loadLogin()},null):zy.net.loadLogin(),this}}();