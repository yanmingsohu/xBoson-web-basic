/**
 * Created by wyy on 2014/8/8.
 */
/**
 * 个人信息
 * @class MgtOrgList
 */
MgtPersonalList = (function() {

  var PT = MgtPersonalList.prototype;
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
  var dt = $('#mgt_sys_mdm_getpersonallist_dt');

  /**
   * 事件绑定规则定义
   * @property Events
   */
  PT.Events = {};

  /**
   * @class MgtThirdAppList
   * @constructor
   */
  function MgtPersonalList() {
    Console.log("new MgtPersonalList()");
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
    thiz.SelectStatus();
    thiz.DataTable();
    thiz.Toolbar();
    /* thiz.dialogInit();*/
    $('#mgt_sys_mdm_getpersonallist_edit').btnDisable(true);
    $('#mgt_sys_mdm_getpersonallist_delete').btnDisable(true);
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
        "data": "de0201039"
      }, 
      {
        "render": function(data, type, row, meta) {
          return zy.cache.cd2name('GBT.2261.1', row.de0201040);
        }
      }, 
      {
        "render": function(data, type, row, meta) {
          return zy.cache.cd2name('GBT.2261.2', row.de0201018);
        }
      },
      {
        "render": function(data, type, row, meta) {
          return zy.cache.cd2name('GBT.4658', row.de0201041);
        }
      }, 
      {
        "data": "de0810007"
      }, 
      {
        "data": "de0201001"
      },
      {
        "render": function(date,type,row,meta){
          return $.format.date(row.createdt,"yyyy-MM-dd HH:mm:ss");
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
          return '<a href=\"javascript:void(0);\" rel=\"popover\" data-placement=\"left\" data-original-title=\"<i class=\'fa fa-fw fa-pencil\'></i> 修改状态\" data-content=\"<form id=\'mgt_sys_mdm_getpersonallist_status_form\' onsubmit=\'return false;\' ' + _data + ' style=\'min-width:170px\'>' + str + '<div class=\'form-actions\'><div class=\'row\'><div class=\'col-md-12\'><button id=\'mgt_sys_mdm_getpersonallist_status\' class=\'btn btn-primary btn-sm\' type=\'submit\'>保存</button></div></div></div></form>\" data-html=\"true\">' + zy.cache.cd2name("ZR.0001", row.status) + '</a>';
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
      Console.log('this.is("tr") = ' + $(this).find('th').is('th') + ' : ' + $(this).find('td').hasClass('dataTables_empty'));
      if ($(this).find('th').is('th') || $(this).find('td').hasClass('dataTables_empty'))
        return false;
      Console.log($(e.target).is('button') + '==== ' + $(e.target).parents("form").html());
      //【修改状态,保存按钮】事件托管
      if ($(e.target).is('button')) {
        thiz.SaveStatus($(e.target).parents("form"));
      }
      // 变换选择行状态颜色
      if (!$(this).find('div').hasClass('popover') && $(this).hasClass('active')) {
        $(this).removeClass('active');
        $('#mgt_sys_mdm_getpersonallist_edit').btnDisable(true);
      } else {
        dt.DataTable().$('tr.active').removeClass('active');
        $(this).addClass('active');
        $('#mgt_sys_mdm_getpersonallist_edit').btnDisable(false);
      }
    });
    //查询
    $('#mgt_sys_mdm_getpersonallist_search').click(function() {
      conditions = $('#mgt_sys_mdm_getpersonallist_form').serialize();
      $('#mgt_sys_mdm_getpersonallist_edit').btnDisable(true);
      $('#mgt_sys_mdm_getpersonallist_search').button('loading');
      thiz.Pagination(1);
    });
    //添加
    $('#mgt_sys_mdm_getpersonallist_add').click(function() {
      thiz._g.param.flg = 'i'; //设置添加模式标记
      zy.net.loadHTML("mgt/sys_mdm/sys_personal/add_upd_personal.html", $("#mgt_sys_mdm_getpersonallist_form2"));
    });
    //修改
    $('#mgt_sys_mdm_getpersonallist_edit').click(function() {
      // 当前选择行 index
      var rowIdx = dt.DataTable().row('.active').index();
      Console.log("当前选择行 = " + rowIdx);
      // 当前选择行数据
      var data = dt.DataTable().row('.active').data();
      thiz._g.param.flg = 'u'; //设置修改模式标记
      thiz._g.param.pid = data.pid; //获取选择行数据，设置行数据参数
      zy.net.loadHTML("mgt/sys_mdm/sys_personal/add_upd_personal.html", $("#mgt_sys_mdm_getpersonallist_form2"));
    });
  };
  /**
   * 分页处理
   * @method Pagination
   * @param {Number} page 页码
   */
  PT.Pagination = function(page) {
    Console.log('Pagination page = ' + page);
    $.jqPaginator('#mgt_sys_mdm_getpersonallist_pagination', {
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
    Console.log('SetDt page = ' + page);
    var cb = function(msg) {
      $('#mgt_sys_mdm_getpersonallist_search').button('reset');
      if (msg) {
        $('#mgt_sys_mdm_getpersonallist_edit').btnDisable(true);
        // $('#mgt_sys_mdm_getpersonallist_delete').btnDisable(true);
        thiz._g.count = msg.count; //获取总记录数
        thiz._g.data = msg.result;
        thiz.DataTable(msg.result);
        Console.log('if (msg) thiz._g.count = ' + thiz._g.count);
        if (msg.count > 0 && msg.result.length > 0) {
          $('#mgt_sys_mdm_getpersonallist_pagination').jqPaginator('option', {
            totalCounts: thiz._g.count,
            pageSize: zy.g.page.pagesize,
            currentPage: page
          });
        } else {
          thiz._g.count = 1;
          thiz._g.page = 1;
          $('#mgt_sys_mdm_getpersonallist_pagination').jqPaginator('destroy');
        }
        // DO NOT REMOVE : GLOBAL FUNCTIONS!
        pageSetUp();
      }
    };
    Console.close();
    zy.g.am.app = 'd2c8511b47714faba5c71506a5029d94';
    zy.g.am.mod = 'personalinfo';
    zy.net.get("api/getpersonallist", cb, conditions, page);
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
    Console.log("SetRow msg = " + JSON.stringify(msg));
    // 当前选择行数据
    var data = dt.DataTable().row('.active').data();
    // 修改数据并刷新 dataTable
    $.extend(data, msg);
    if (data.status === '1') {
      data.statusnm = '有效';
    } else {
      data.statusnm = '失效';
    }
    Console.log("更新后的行数据 = " + JSON.stringify(data));
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
    // 状态值是否有变化
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
    zy.g.am.app = 'd2c8511b47714faba5c71506a5029d94';
    zy.g.am.mod = 'personalinfo';
    zy.net.get('api/setpersonalstatus', cb, param);
  };
  PT.SelectStatus = function() {
    zy.cache.initDicts('ZR.0001', function() {});
  };
  PT.Select = function() {
    // 数据字典处理
    var cb = function() {
      // 字典数据绑定
      $("#mgt_sys_mdm_getpersonallist_form input[name=status]").zySelect('ZR.0001', true, {
        width: '100%'
      });
      $("#mgt_sys_mdm_getpersonallist_form input[name=de0201040]").zySelect('GBT.2261.1', true, {
        width: '100%'
      });
      $("#mgt_sys_mdm_getpersonallist_form input[name=de0201018]").zySelect('GBT.2261.2', true, {
        width: '100%'
      });
      $("#mgt_sys_mdm_getpersonallist_form input[name=de0201052]").zySelect('GBT.6565', true, {
        width: '100%'
      });
      $("#mgt_sys_mdm_getpersonallist_form input[name=de0201041]").zySelect('GBT.4658', true, {
        width: '100%'
      });
      $("#mgt_sys_mdm_getpersonallist_form input[name=status]").select2('val', '1');
    };
    // 预处理该画面所需的字典类型，以 , 号分割
    zy.cache.initDicts('ZR.0001,GBT.2261.1,GBT.2261.2,GBT.6565,GBT.4658', cb);
  };
  return MgtPersonalList;
})();
