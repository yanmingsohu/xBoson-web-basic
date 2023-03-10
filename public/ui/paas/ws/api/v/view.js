/* Create By xBoson System */
// 数据字典一览
api_view = (function(){
  var _m = {param:"",pam:null}; //API请求参数
  var pt = api_view.prototype;
  pt.node=null; //tree节点数据

  // 表格元素对象
  var v_tb = $('#ws_api_v_view_tb');
  var v_requests = $('#ws_api_v_view_requests');
  var v_url = $('#ws_api_v_view_url');
  
  // 构造方法
  // 参数 node
  function api_view(node){
    pt.node=node;
    Init();
  }
  
  // 初始化
  function Init(){
    _m.path = {
      method: "01",
      host: zy.g.host.api,
      auth: "app",
      org: "/"+zy.g.comm.org,
      api: '/'+pt.node.uri,
      sys: "?s=d&ems=ems"
    };
    zy.cache.initDicts("ZR.0052,ZR.0053", ViewInit);
  }
  
  // 画面 init
  function ViewInit(){
    $('#ws_api_v_view_apinm').html(' '+pt.node.apinm+'【'+pt.node.id+'】');
    $('#ws_api_v_view_sta').html(pt.node.sta);
    v_url.val(pt.FullUrl(null));
    $('#ws_api_v_view_cdt').html(pt.node.createdt);
    $('#ws_api_v_view_udt').html(pt.node.updatedt);

    // 获取API帮助信息
    _m.appid=pt.node.aid;
    _m.moduleid=pt.node.pid;
    _m.apiid=pt.node.id;

    zy.extend.get({
      app: 'apils',
      mod: 'apihelp',
      apinm: 'getapiinfo'
    }, function (msg) {
      // API 帮助信息
      if (msg.result[0].help_info){
        _m.help_info = msg.result[0].help_info;
        var _h = JSON.parse(_m.help_info);
        _m.help_info_obj=_h;
        if(_h.requests) _m.path.method =_h.requests;
        // $('#ws_api_v_view_classify').html(_h.api_classify?_h.api_classify:'API');
        $('#ws_api_v_view_classify').html(_h.api_classify?zy.cache.cd2name("ZR.0053", _h.api_classify):'API');
        $('#ws_api_v_view_desc').append(_h.api_desc?_h.api_desc:'');
        v_requests.data("id",_m.path.method);
        v_requests.html(_h.method?_h.method+' <span class="caret"></span>':'GET <span class="caret"></span>');
        var list=zy.cache.getDict("ZR.0052");
        var txtColor={
          '01':'txt-color-green',
          '02':'txt-color-red',
          '03':'txt-color-yellow',
          '04':'txt-color-blue',
          '05':'txt-color-red',
          '06':'txt-color-pink',
          '07':'txt-color-yellow',
          '08':'txt-color-orange',
        };
        for (var i in list) {
          if (list[i].id === _m.path.method)
            $('.request-method-update').append('<li class="active"><a href="javascript:void(0);" data-id="'+list[i].id+'"><i class="fa fa-circle '+txtColor[list[i].id]+'"></i> '+list[i].name+'</a></li>');
          else
            $('.request-method-update').append('<li><a href="javascript:void(0);" data-id="'+list[i].id+'"><i class="fa fa-circle '+txtColor[list[i].id]+'"></i> '+list[i].name+'</a></li>');
        }

        // 参数列表项
        if(_h.param) {
          _m.pam = _h.param;
          pt.DataTable(_m.pam);
          // 获取完整URL
          v_url.val(pt.FullUrl(_m.pam));
          // API返回数据JSON内容
          // var jsonEditor = new JSONEditor($('#ws_api_v_view_jsoneditor'), {mode: 'view'},_m.help_info);
          jsoneditorInit(_m.help_info_obj.result);
          // jsonEditor.set(_m.help_info);
        }
      } else {}
      //事件绑定
      pt.Events.methodBtn();
      pt.Events.authBtn();
      pt.Events.testBtn();
    },_m);
  }

  //JsonEditor初始化,可以两种只读模式切换
  function jsoneditorInit(_data){
    var container = document.getElementById('ws_api_v_view_jsoneditor');
    var options = {
      mode: 'view',
      modes: ['view', 'preview'], //['code', 'form', 'text', 'tree', 'view', 'preview'], // allowed modes
      onError: function (err) {
        alert(err.toString());
      }
    };
    jsonEditor = new JSONEditor(container, options, _data); 
  }

  /**
   * API 参数列表项【表格加载】
   * @method DataTable
   * @param {Object} data 数据对象
   */
  pt.DataTable = function(data) {
    //定义绑定数据结构
    var columns = [
      {"data": "key"},
      {"data": null},
      // {"render":function(data,type,row,meta) {return row.operation_type?null:'String'}},
      {"data": "value"}, 
      {"data": "desc"},
    ];
    //预设初始化参数
    var options = {
      "data": data,
      "columns": columns
    };
    // 合并初始化参数选项
    $.extend(options, zy.ui.dataTable);
    //初始化 DataTable
    v_tb.dataTable(options);
  };

  /**
    * 事件绑定规则定义
    * @property Events
    */
  pt.Events = {
    //请求方式选择
    methodBtn: function(){
      // 请求方式选择
      $('.request-method-update a').click(function () {
        var selId = $(this).data("id");
        var selText = $(this).text();
        var $this = $(this);
        _m.path.method = selId;
        v_requests.data("id",selId);
        v_requests.html(selText + ' <span class="caret"></span>');
        if("01"===selId){ // GET
          v_url.val(pt.FullUrl(_m.pam));
        }else{
          v_url.val(pt.FullUrl(null));
        }
        $this.parents('.dropdown-menu').find('li').removeClass('active');
        $this.parent().addClass('active');
    	});
    },
    authBtn: function(){
      // 访问授权模式选择
      $('.auth-method-update a').click(function () {
        var selText = $(this).html();
        var $this = $(this);
        $('#ws_api_v_view_auth').html($this.html() + ' <span class="caret"></span>');
        if (selText.indexOf('fa-eye-slash') >= 0){
          _m.path.auth = "openapp";
        }else{
          _m.path.auth = "app";
        }
        v_url.val(pt.FullUrl(_m.pam));
        $this.parents('.dropdown-menu').find('li').removeClass('active');
        $this.parent().addClass('active');
    	});
    },
    testBtn: function(){
      $('#ws_api_v_view_test').click(function () {
        zy.net.loadHTML('ws/api/v/run.html',$('#ws_api_v_test_modal'),function(r){
          // JYM: 缓存api测试页, 使之打开更快
          // _m.ide_run_html_cache = r;
          // 打开测试页
          RunApi(_m, _m.help_info_obj);
        });
        // $('#ws_api_v_modal').html(_m.ide_run_html_cache);
      });
    },
  };

  /**
   * 获取 API 完整URL
   * @method FullUrl
   * @param {Object} pam GET参数对象
   * @return {String} url 路径
   */
  pt.FullUrl = function(pam) {
    _m.url=_m.path.host+_m.path.auth+_m.path.org;
    // method=GET
    if('01'===_m.path.method){
      if(!pam){
        _m.fullurl = _m.url+_m.path.api+_m.path.sys+_m.param;
        return _m.fullurl;
      }
      var tt = [];
      // _m.pam=pam;
      $.each(pam,function(i,v){
        var _tmp = [v.key,encodeURIComponent(v.value)];
        tt.push(_tmp.join('='));
      });
      _m.param='&'+tt.join('&');
// zy.log("_m.param==="+_m.param);
      _m.fullurl = _m.url+_m.path.api+_m.path.sys+_m.param;
    }else{ //post等
      _m.fullurl = _m.url+_m.path.api+_m.path.sys;
    }
    return _m.fullurl;
  };
  return api_view;
})();