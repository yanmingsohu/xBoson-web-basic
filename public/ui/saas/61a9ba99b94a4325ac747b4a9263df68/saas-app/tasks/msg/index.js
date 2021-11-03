/* Create By xBoson System */
/* Create By xBoson System */
/**
 * 
 * @class ws.api.v.index
 */
(function(){
  var v_index = $('#ws_api_v_index');
  var v_header = v_index.children("header");
  // var v_modal = $('#ws_api_v_modal');
  var v_ztree = $('#ws_api_v_ztree');
  var v_content = $('#ws_api_v_innercontent');
  var v_nouislider= $("#ws_api_v_nouislider");
  
  var v_filter_form = $("[name=tenant-filter-form]"); //ztree 过滤表单
  
  var ztreeObj = null;  // ztree对象
  var nodeClick = null; // 点击的Tree节点对象
  
  function init(){
    
    //Tree 工具栏事件
    Tree_ToolBar_Event();
    
    
    zy.extend.get({
      app: '78cf8922c5ea4afa9dae8970215ea796',
      mod: 'tenant',
      apinm: 'orgGet'
    }, function (msg) {
      if (msg && msg.result)
        tree(msg.result);
    }, {});
  }

  // zTree初始化处理
  function tree(res) {

    // var _tree = null;
    var treeContariner = v_ztree.find('.ztree');
    var option = {
      view: {
        showTitle: false,
        //dblClickExpand: false
      },
      data: {
        keep:{parent: false},
        key: {
          name: "name",
          isParent: "parent",
          title: "name"
        },
        simpleData: {
          enable: true, //是否用简单数据
          idKey: 'name', //对应json数据中的ID
          pIdKey: 'parentId', //对应json数据中的父ID
          // rootPId: 0 // 用于修正根节点父节点数据，即 pIdKey 指定的属性值
        }
      },
      callback: {
        onClick: click,
        // dblClickExpand: dblClickExpand,
        // onExpand: expand
      }
    };
    // 节点被点击的事件回调函数
    function click(event, treeId, treeNode){
      zy.log('treeNode=',treeNode);
      nodeClick = treeNode;
      //expand(event, treeId, treeNode);
      Right(treeNode);
    }
    function dblClickExpand(treeId, treeNode) {
    	return treeNode.level > 0;
    }
    ztreeObj = $.fn.zTree.init(treeContariner, option, res);
    // _tree.expandAll(true);
  } // tree end
  
  // zTree过滤搜索
  function tree_search(keyword, cb){
    zy.extend.get({
      app: '78cf8922c5ea4afa9dae8970215ea796',
      mod: 'tenant',
      apinm: 'orgGet'
    }, function (msg) {
      if (msg && msg.result)
        tree(msg.result);
        cb && cb();
    }, {keyword:keyword});
  }
  
  // API服务信息加载处理
  function Right(node){
    // if(node.flg!=='0'){return;} // zy.net.loadHTML：app、mod、api管理画面（如：添加、修改等）
    // // 非管理员不可查看编辑
    // if(zy.g.user.userid != node.pid) return ;
    window.tenantID = node._id;
    
    zy.net.loadHTMLs("saas-app/tasks/msg/statistic.html",v_content,function(){
      // main(node);
      // tenant_member_view(node._id);
    });
  }

  //* noUi Sliders 区域范围滑块插件处理
  v_nouislider.noUiSlider({
    range: [0, 100],
    start: 25,
    handles: 1,
    connect: true,
    slide: function(){
      zy.log('noUiSliderEvent');
      var values = $(this).val();
      if(10>values){
        v_ztree.css({'display':'none','width':'0%'});
        v_content.css({'display':"block",'width':"100%"});
        $(this).val(0);
        return false;
      } else {
        v_ztree.css({'display':'block','width': + values + '%'});
      }
      if(33>(100-values)){
        v_content.css({'display':'none'});
      } else {
        v_content.css({'display':'block','width':(100-values) + '%'});
      }
    }
  });
  
  //树形列表显示隐藏
  v_header.children('[name=ws_api_v_tree]').click(function(){
    if(v_ztree.is(':visible')){
      v_nouislider.val(0);
      v_ztree.css({'display':'none','width':'0%'});
      v_content.css({'display':"block",'width':"100%"});
    }else{
     v_nouislider.val(25);
      v_ztree.css({'display':'block','width': '25%'});
      v_content.css({'display':"block",'width':"75%"});
    }
  });
  // 状态选择
  v_header.find(".js-status-update a").click(function () {
    var selText = $(this).text();
    var $this = $(this);
    $this.parents('.btn-group').find('.dropdown-toggle').html(selText + ' <span class="caret"></span>');
    $this.parents('.dropdown-menu').find('li').removeClass('active');
    $this.parent().addClass('active');
	});

  v_content.css({'border-width':"0px 0px 1px 1px",'border-style':"solid",
      'border-color':"#ccc",'background':"#f0f6f1"});
	v_ztree.animate({scrollTop: v_ztree[0].scrollHeight},500);

  init();
  
  // Tree 工具栏事件
  function Tree_ToolBar_Event() {
    
    //筛选表单切换按钮
    v_index.find("#tree_filter").on("click", function () {
      v_filter_form.toggle();
    });
    
    //筛选查询
    v_index.find("#filter_sx").on("click", function () {
      var $this = $(this);
      $this.button("loading");
      var keyword = v_filter_form.find("[name=keywords]").val();
      
      tree_search(keyword,function(){
        $this.button("reset");
      });
      // mdms_datadictD_index_tab.find("#tree_refresh").click();
    });
    //筛选取消
    v_index.find("#filter_qx").on("click", function () {
      // v_filter_form.find("[name=status]").select2("data", null);
      v_filter_form.resetForm();
      v_filter_form.hide();
    });
    
    // // tree刷新按钮
    // v_index.find("#tree_refresh").on("click",function(){
      
    // });
    
  }

 })();