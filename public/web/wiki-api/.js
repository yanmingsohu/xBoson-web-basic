////////////////////////////////////////////////////////////////////////////////
//
// Copyright 2017 本文件属于 xBoson 项目, 该项目由 J.yanming 维护,
// 本文件和项目的全部权利由 [荆彦铭] 和 [王圣波] 个人所有, 如有对本文件或项目的任何修改,
// 必须通知权利人; 该项目非开源项目, 任何将本文件和项目未经权利人同意而发行给第三方
// 的行为都属于侵权行为, 权利人有权对侵权的个人和企业进行索赔; 未经其他合同约束而
// 由本项目(程序)引起的计算机软件/硬件问题, 本项目权利人不负任何责任, 切不对此做任何承诺.
//
// 文件创建日期: 17-12-27 上午10:32
// 原始文件路径: web/wiki-api/.js
// 授权说明版本: 1.1
//
// [ J.yanming - Q.412475540 ]
//
////////////////////////////////////////////////////////////////////////////////
jQuery(function($) {

var menu = $("#menu");
var content = $('#content');
var current_select;
var default_page;
var contextUrl;
var faceUrl;
var savedScorlls = {};

if (Math.random() * 1000 <= 1) {
  menu.addClass("black_menu");
}

get_context_path((ctx, face)=>{
  contextUrl = ctx;
  faceUrl = face;
  load_menu();
});


function restoreScroll(name) {
  content.scrollTop(savedScorlls[name] || 0);
}

function saveScroll(name) {
  if (!name) name = location.hash;
  savedScorlls[name] = content.scrollTop();
}


//
// 得到当前上下文 URL 前缀
// cb - Function(contextUrlPrefix, uiUrlPrefix)
//
function get_context_path(cb) {
  var file = location.href;
  $.ajax(file, {
    type : 'head',
    success(msg, text, x) {
      let path = x.getResponseHeader('Full-Path');
      let i = file.indexOf(path);
      let faceUrl = file.substring(0, i);
      let j = faceUrl.indexOf('/face');
      let contextUrl = faceUrl.substring(0, j);
      cb && cb(contextUrl, faceUrl);
    },
  });
}


function load_cdn_list(cb) {
  let path = '/app/a297dfacd7a84eab9656675f61750078/ZYAPP_IDE/ZYMODULE_UI_IDE/cdnlist';
  $.get(contextUrl +path, (ret)=>{
    if (ret.code) {
      console.error('加载CDN文档失败', ret.msg);
      return;
    }
    cb(ret);
  });
}


function load_menu() {
  var open_page = jump_url_hash() || setPage();
  console.debug("OPEN", open_page);

  $.get('menu.json', function(menu_data) {
    console.debug('load', menu_data)
    menu.html("");
    menu_data.forEach(function(d) { 
      build_menu(d, null, 0, d.basepath) ;
    });
    
    load_cdn_list(build_cdn);
  });
  
  //
  // index.html#ui-docs/xboson-vue.md 可跳转到指定文档
  //
  function jump_url_hash() {
    let h = location.hash;
    if (h) {
      h = h.substr(1);
      let i = h.lastIndexOf('.');
      // 不自动添加后缀: 可能导致文件加载失败?
      // if (i <= 0) {
      //   h += '.md';
      // }
      // menu.find('a[file="'+ h +'"]').click();
      return h;
    }
  }
  
  function build_cdn(ret) {
    var data = {
      name : 'CDN',
      file : 'cdn.md',
      sub  : [],
    };
    ret.data.forEach(f=>{
      data.sub.push({
        name : f.name,
        file : f.path,
        open : makeCdnPage(f),
      });
    });
    data.sub.sort((a, b)=>{
      return a.name < b.name ? -1 : (a.name > b.name ? 1 : 0);
    });
    
    build_menu(data, null, 0, 'ui-docs');
    
    function makeCdnPage(file) {
      function render(buf) {
        var html = markdownit({highlight:highlight}).render(buf.join(''));
        content.html(html);
      }
      
      function makeVersions(buf, files) {
        const prefix = '/web/';
        files.forEach(v=>{
          if (v.isdir) {
            buf.push('## ver: ', v.name, '\n');
            buf.push('文件列表\n');
            
            v.files.forEach(n=>{
              if (n.startsWith(prefix)) {
                n = n.substr(prefix.length);
              }
              buf.push('* ', n, '\n');
            });
          }
        });
      }
      
      function makeReadme(file, buf, cb) {
        $.get(faceUrl + file, (txt)=>{
          buf.push('\n', txt);
          cb(buf);
        });
      }
      
      return ()=>{
        console.debug('open', file);
        let hash = location.href = '#ui-docs'+ file.path;
        var buf = [];
        if (file.readme) {
          makeVersions(buf, file.files);
          makeReadme(file.readme, buf, ()=>{
            render(buf);
            restoreScroll(hash);
          });
        } else {
          buf.push('# ', file.name, ' on CDN\n');
          makeVersions(buf, file.files);
          render(buf);
          restoreScroll(hash);
        }
        return false;
      };
    }
  }

  function build_menu(data, parent, level, basepath) {
    var ext = extAttribute(data.ext);
    // console.log(data.file, basepath, '-------------')
    if (basepath && data.file) {
      if (ext['absolute']) {
        console.debug("Absolute path", data);
      } else {
        if (data.file[0] == '/') {
          data.file = basepath + data.file;  
        } else {
          data.file = basepath +'/'+ data.file;
        }
      }
    }
    
    var m = $("<a class='menu_item'>");
    if (level) {
      m.css('padding-left', level * 20);
    } else {
      m.css('margin-top', 20);
    }
    m.attr("file", data.file);
    m.html(data.name);
    
    let hash = "#"+ data.file;

    if (typeof data.open == 'function') {
      m.attr('href', hash);
      m.click(()=>{
        saveScroll();
        data.open();
        return false;
      });
    }
    else if (data.file) {
      if (ext['_blank']) {
        m.attr('href', data.file);
        m.attr('target', '_blank');
      } else {
        m.attr("href", hash);
        
        m.click(function() {
          saveScroll();
          open_doc(data, ()=>{
            restoreScroll(hash)
          });
          
          if (current_select) {
            current_select.removeClass("selected_menu");
          }
          m.addClass('selected_menu');
          current_select = m;
          location.href = hash;
          return false;
        });
      }
    }
    
    m.appendTo(menu);

    if (data.sub && data.sub.length > 0) {
      data.sub.forEach(function(d) {
        build_menu(d, m, level+1, basepath);
      });
    }

    if (data.file == open_page) {
      m.click();
    }
    else if (open_page == null && data.default) {
      m.click();
    }
  }
}


function setPage(page) {
  if (page) {
    sessionStorage.wikiPage = page;
  }
  return sessionStorage.wikiPage;
}


function isMD(file) {
  return file.lastIndexOf(".md") > 0 
      || file.lastIndexOf(".markdown") > 0;
}


function highlight(str, lang) {
  var code;
  var codelang = aliasName(lang);
  try {
    code = hljs.highlight(codelang, str).value;
  } catch(e) {
    code = $("<b>").text(str).html();
    console.error(e);
  }
  var buf = ["<pre>", "<div class='firstLine'>", lang.toUpperCase(), "</div>"];
  buf.push("<code class='language-", codelang, "'>", code, "</code>", "</pre>");
  return buf.join('');
}


function open_doc(data, _success) {
  $.get(data.file, function(txt) {
    var html;
    if (isMD(data.file)) {
      html = markdownit({highlight:highlight}).render(txt);
    } else {
      html = txt;
    }
    content.html(html);

    content.find("code").each(function() {
      var thiz = $(this);
      // `anchor=` 作为锚点前缀
      if (thiz.text().indexOf('anchor=') == 0) {
        var name = thiz.text().split("=");
        thiz.html("<a name='"+ name[1] +"'></a>");
      }
    });
    setPage(data.file);
    
    //
    // 文档内链接
    // 如果连接在菜单中能找到, 则内页跳转到指定页面, 支持 md 格式.
    // 路径必须是 'docs/' 开头.
    //
    var href = content.find('a');
    href.click(function() {
      var a = $(this);
      var find = $("[file='"+ a.attr('href') +"']");
      if (find.length > 0) {
        find.trigger('click');
        return false;
      }
    });
    
    // hljs.initHighlighting.called = null;
    // hljs.initHighlighting();
    _success && _success();
  });
  console.debug("Open", data.file);
} 


function aliasName(name) {
  name = name.toLowerCase()
  switch (name) {
    case 'sh':
    case 'shell':
      return 'bash';
    case 'vue':
      return 'html';
    case 'scss':
      return 'css';
    case 'url':
      return 'text';
    default:
      return name || 'text';
  }
}


// 扩展参数用逗号分隔
function extAttribute(a) {
  if (!a) return {};
  var ext = a.split(',');
  var ret = {};
  ext.forEach(function(n) {
    ret[n.trim()] = 1;
  });
  return ret;
}


});