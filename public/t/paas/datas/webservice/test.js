(function(data, type, id, handle) {
  var form = {
    url : data.ws_uri,
  };
  
  var d = $("<div title='WSDL 可达测试'></div>");
  d.append('<div>URL:'+ form.url +"</div>");
  
  zy.g.am.app = 'a1e22425b8574d67bf4f200b4ccde506';
  zy.g.am.mod = 'webservice';
  zy.net.get('api/proxy', reciveDataCB, form, 0);
  
  function reciveDataCB(data) {
    var code = data.code  || data.result.code;
    var html = xb.safeHtml(data.result.data);
    var msg  = parseInt(code) - 200 < 10 ? '成功' : '失败';
    
    d.append('<div><b>['+ msg +']</b> 代码:'+ code +"</div><hr/>");
    d.append(html);
    xb.openDialog(d);
  }
})