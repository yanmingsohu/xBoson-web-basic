/**
 * Created by liufengyuan on 2014/10/16.
 */
/**
 * 个人信息
 * @class user_view_admin
 */
user_view_admin = (function() {

  var PT = user_view_admin.prototype;
  var thiz;
  var conditions;
  /**
   * 默认配置参数
   * @attribute _g
   * @private
   */
  PT._g = {
    data: [],
    param: {},
    page: 1, //开始页数
    count: 1, //总记录数
    crt_page: 1 //当前页
  };

  //表格元素对象
  var dt = $('#user_view_admin_dt');
  //widget
  var widget = $('#user_view_admin_wid1');

  /**
   * 事件绑定规则定义
   * @property Events
   */
  PT.Events = {};

  /**
   * @class user_view_admin
   * @constructor
   */
  function user_view_admin() {
    thiz = this;
    thiz.Init();
    thiz.Select();
    return this;
  }

  /**
   * 画面初始化
   * @method init
   */
  PT.Init = function() {
    thiz.DataTable();
    thiz.Toolbar();
    $('#user_view_admin_del').btnDisable(true);
    
    var callbackUser = function(msg) {
      if (msg) {
        //为adminFlag赋值
        thiz._g.adminFlag=msg.result[0].adminflag;
      }
    };
    zy.g.am.app = 'ZYAPP_LOGIN';
    zy.g.am.mod = 'ZYMODULE_LOGIN';
    zy.net.get("api/usertype", callbackUser);
  };
  /*窗口改变时，重新调整画面大小*/
  function DynamicWidth() {
      $('.dataTables_scrollHeadInner').css('width', '100%');
      $('.dataTables_scrollBody table').css('width', '100%');
      $('.dataTables_scrollHeadInner table').css('width', '100%');
    }
    /**
     * 表格加载
     * @method DataTable
     * @param {Object} data 数据对象
     */
  PT.DataTable = function(data) {
    //定义绑定数据结构
    var columns = [
      {
        "data": "orgid"
      },
      {
        "data": "de0201039"
      },
      {
        "data": "userid"
      },
      {
        "data": "de0201010"
      },
      {
        "data": "de0201012"
      },
      {
        "render": function(date,type,row,meta){
          return $.format.date(row.createdt,"yyyy-MM-dd HH:mm:ss");
        }
      },
      {
        "data": "last_dt"
      },
      {
        "data": "last_ip"
      },
      {
        "render": function(date,type,row,meta){
          return zy.cache.cd2name("ZR.0008",row.multiflag);
        }
      },
      {
        "render": function(data, type, row, meta) {
          var _data, str, str0, str1;
          // 参数设置
          _data = 'data-pid=\'' + row.pid + '\'';
          _data += ' data-status=\'' + row.status + '\'';
          if (row.status === '1') {
            str0 = '';
            str1 = 'checked=\'checked\'';
          } else {
            str0 = 'checked=\'checked\'';
            str1 = '';
          }
          str = '<div class=\'radio\'><label><input type=\'radio\' name=\'status\' value=\'0\' ' + str0 + '><span>无效</span></label></div>';
          str += '<div class=\'radio\'><label><input type=\'radio\' name=\'status\' value=\'1\' ' + str1 + '><span>有效</span></label></div>';
          return '<a href=\"javascript:void(0);\" rel=\"popover\" data-placement=\"left\" data-original-title=\"<i class=\'fa fa-fw fa-pencil\'></i> 修改状态\" data-content=\"<form id=\'user_view_admin_status_form\' onsubmit=\'return false;\' ' + _data + ' style=\'min-width:170px\'>' + str + '<div class=\'form-actions\'><div class=\'row\'><div class=\'col-md-12\'><button id=\'user_view_admin_status\' class=\'btn btn-primary btn-sm\' type=\'submit\'>保存</button></div></div></div></form>\" data-html=\"true\">' + zy.cache.cd2name("ZR.0001",row.status) + '</a>';
        }
      }
    ];
    //预设初始化参数
    var options = {
      "data": data,
      "columns": columns
    };
    // 合并初始化参数选项
    $.extend(options, zy.ui.dataTable);
    //初始化 DataTable
    dt.dataTable(options);
    DynamicWidth();
  };
  /**
   * Toolbar 事件处理
   * @method Toolbar
   */
  PT.Toolbar = function() {
    // 单击事件
    dt.on('click', 'tr', function(e) {
      // 当前选择行 index
      if ($(this).find('th').is('th') || $(this).find('td').hasClass('dataTables_empty'))
        return false;

      //【修改状态,保存按钮】事件托管
      if ($(e.target).is('button')) {
        thiz.SaveStatus($(e.target).parents("form"));
      }
      // 变换选择行状态颜色
      if (!$(this).find('div').hasClass('popover') && $(this).hasClass('active')) {
        $(this).removeClass('active');
        $('#user_view_admin_del').btnDisable(true);
      } else {
        dt.DataTable().$('tr.active').removeClass('active');
        $(this).addClass('active');
        $('#user_view_admin_del').btnDisable(thiz._g.adminFlag!="1");
      }
    });
    // 注册日期th单击事件
    widget.find('th[name=createdt]').click(function(){
      conditions = $('#user_view_admin_form').serialize();
      if($(this).hasClass('sorting_desc')){
        conditions=conditions+encodeURI('&orderby=createdt&ascdesc=asc');
        $(this).removeClass('sorting_desc').addClass('sorting_asc');
      }else{
        conditions=conditions+encodeURI('&orderby=createdt&ascdesc=desc');
        $(this).removeClass('sorting_asc').addClass('sorting_desc');
      }
      $('#user_view_admin_edit').btnDisable(true);
      $('#user_view_admin_his').btnDisable(true);
      $('#user_view_admin_search').button('loading');
      thiz.Pagination(1);
    });

    //查询
    $('#user_view_admin_search').click(function() {
      widget.find('th[name=createdt]').click();
    });
    
    //删除
    $('#user_view_admin_del').click(function() {
      zy.ui.mask('删除确认', '是否确认删除此条数据', function sure() {
        var data = dt.DataTable().row('.active').data();
        thiz._g.param.pid = data.pid;
        zy.g.am.app = 'c9e98ea6fc7148d186289e8c33776f8a';
        zy.g.am.mod = 'user_manager';
        zy.net.get("api/user_unbind_admin", function(){
          thiz.Pagination(1);
        }, {user_pid:data.pid});
      });
    });
  };

  PT.search = function(orderby) {
    conditions = $('#user_view_admin_form').serialize();
    $('#user_view_admin_search').button('loading');
    thiz.Pagination(1);
  };

  /**
   * 分页处理
   * @method Pagination
   * @param {Number} page 页码
   */
  PT.Pagination = function(page) {
    Console.log('Pagination page = ' + page);
    $.jqPaginator('#user_view_admin_pagination', {
      totalCounts: thiz._g.count,
      pageSize: zy.g.page.pagesize,
      currentPage: page,
      onPageChange: function(num) {
        Console.log('onPageChange num = ' + num);
        thiz._g.crt_page = num; //当前页码
        thiz.SetDt(num);
      }
    });
  };
  /**
   * 设置表格数据
   * @method SetDt
   * @param {Number} page 页码
   */
  PT.SetDt = function(page) {
    var cb = function(msg) {
      $('#user_view_admin_search').button('reset');
      if (msg) {
        $('#user_view_admin_edit').btnDisable(true);
        $('#user_view_admin_his').btnDisable(true);
        //$('#user_view_admin_inituserid').btnDisable(true);
        thiz._g.count = msg.count; //获取总记录数
        thiz._g.data = msg.result;
        widget.find('[name=total_count]').html('总数：'+msg.count);
        thiz.DataTable(msg.result);
        Console.log('if (msg) thiz._g.count = ' + thiz._g.count);
        if (msg.count > 0 && msg.result.length > 0) {
          $('#user_view_admin_pagination').jqPaginator('option', {
            totalCounts: thiz._g.count,
            pageSize: zy.g.page.pagesize,
            currentPage: page
          });
        } else {
          thiz._g.count = 1;
          thiz._g.page = 1;
          $('#user_view_admin_pagination').jqPaginator('destroy');
        }
        // DO NOT REMOVE : GLOBAL FUNCTIONS!
        pageSetUp();
      }
    };
    zy.g.am.app = 'c9e98ea6fc7148d186289e8c33776f8a';
    zy.g.am.mod = 'user_manager';
    zy.net.get("api/user_view_admin", cb, conditions, page);
  };
  /**
   * 更新表格数据
   * @method UpDt
   */
  PT.UpDt = function() {
    thiz.Pagination(1);
  };
  /**
   * 设置和更新行数据
   * @method SetRow
   * @param {Object} msg 数据对象 $('#form_id').form2json()
   */
  PT.SetRow = function(msg) {
    // 当前选择行数据
    var data = dt.DataTable().row('.active').data();
    // 修改数据并刷新 dataTable
    $.extend(data, msg);
    if (data.status === '1') {
      data.statusnm = '有效';
    } else {
      data.statusnm = '失效';
    }
    dt.DataTable().rows().invalidate().draw();
  };
  /**
   * 保存状态修改结果
   * @method SaveStatus
   * @param {Object} el 表单对象
   */
  PT.SaveStatus = function(el) {
    var param = {};
    var st = zy.ui.form.getRadioValue('status', el);
    // 状态值有变化
    if (st == el.data("status")) return;
    var cb = function(msg) {
      if (msg) {
        thiz.SetRow(param);
        $('[rel=popover]').each(function() {
          $(this).popover('hide');
        });
        zy.ui.msg('提示信息：', '保存【状态】成功！', 's');
      }
    };
    param.pid = el.data('pid');
    param.status = st;
    zy.g.am.app = 'c9e98ea6fc7148d186289e8c33776f8a';
    zy.g.am.mod = 'user_manager';
    zy.net.get('api/rm_user_byadmin', cb, param);
  };
  PT.Select = function() {
    // 数据字典处理
    var cb = function() {
      // 字典数据绑定
      $("#user_view_admin_form input[name=status]").zySelect('ZR.0001', true, {
        width: '100%'
      });
      $("#user_view_admin_form input[name=status]").select2('val','1');
      // thiz.search();
    };
    // 预处理该画面所需的字典类型，以 , 号分割
    zy.cache.initDicts('ZR.0001,ZR.0008', cb);
  };
  return user_view_admin;
})();