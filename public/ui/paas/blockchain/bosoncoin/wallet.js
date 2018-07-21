/* Create By xBoson System */
jQuery(function($) {
  var dict = '0123456789qwertyuioplkjhgfdsazxcvbnm_+-=[]{}|/?.,><~`!@#$%^&*()';
  var HEX = '0123456789ABCDEF';
  var mining_tid, key_tid;
  var difficult = 1;
  var lastkey;
  var key_uptime = 5e3;
  
  $('#update').click(updateInfo).click(total);
  $('#mining').click(mining);
  $('#stop_mining').click(stop_mining);
  $('#diff').change(change_diff);
  key_tid = setInterval(update_key, key_uptime);
  updateInfo();
  total();
  
  xb.on('PAGE_DESTROY', null, function() {
    stop_mining();
    clearInterval(key_tid);
  });
  
  
  function change_diff() {
    difficult = parseInt( $("#diff").val() ) || 1;
    log("更改难度为", difficult);
  }
  
  
  function get(app, mod, api, parm, cb) {
    zy.g.am.app = app;
    zy.g.am.mod = mod;
    var api = 'api/'+ api;
    if (cb == null && typeof parm == 'function') {
      cb = parm;
      parm = {};
    }
    zy.net.get(api, cb, parm, null, cb);
  }
  
  function updateInfo() {
    get('81092b8cd82041a2b81296409eba92da', 'bosoncoin', 'wallet', function(ret) {
      var w = ret.result[0];
      $('#coin').html(fixNum(w.coin));
      $('#userid').html(w.user_id);
    });
  }
  
  function getlast(cb) {
    get('81092b8cd82041a2b81296409eba92da', 'bosoncoin', 'lastkey', function(ret) {
      cb(ret.last);
    });
  }
  
  function getblock(key, cb) {
    get('81092b8cd82041a2b81296409eba92da', 'bosoncoin', 'getblock', {key: key}, function(ret) {
      cb(ret.block);
    });
  }
  
  function update_key(cb) {
    getlast(function(key) {
      if (lastkey != key) {
        lastkey = key;
        getblock(key, function(b) {
          log("新的区块已经加入", key, 'hash:', b.hash, 'sign:', b.sign, 'previousKey:', b.previousKey);
        });
      }
      if (typeof cb == 'function') cb();
    });
  }
  
  function log() {
    var buf = ['['+new Date().toLocaleTimeString()+']'];
    for (var i=0; i<arguments.length; ++i) {
      buf.push(arguments[i]);
    }
    var line = $("<div class='item'>").html(buf.join(' '));
    var log = $('#log').prepend(line);
    
    var items = log.find(".item");
    if (items.length > 100) {
      for (var i=items.length-1; i>50; --i) {
        items.eq(i).remove();
      }
    }
  }
  
  function mining() {
    var hashdiv = $("#hash");
    var count = 0;
    var beginTime = Date.now();
    
    update_key(start_compute_hash);
    
    function start_compute_hash() {
      clearInterval(mining_tid);
      
      mining_tid = setInterval(function() {
        var hash = sha256.update(lastkey);
        var rand = rand_string(500);
        hash.update(rand);
        var ret = hash.array();
        
        ++count;
        var speed = parseInt(count/(Date.now()-beginTime)*1000);
        hashdiv.text(rand
          +'\n\nCount: '+ count
          +'  \nSpeed: '+ speed +' count/second'
          +'  \nKey  : '+ lastkey
          +"\n\nHash : "+ hex_string(ret));
        
        switch (difficult) {
          case 1:
            if (ret[0] == 0) 
              do_mining(rand, speed);
            break;
            
          case 2:
            if (ret[0] == 0 && ret[1] == 0) 
              do_mining(rand, speed);
            break;
            
          case 3:
            if (ret[0] == 0 && ret[1] == 0 && ret[2] == 0) 
              do_mining(rand, speed);
            break;
        }
        
      }, 0);
    }
    
    function do_mining(rand, speed) {
      clearInterval(mining_tid);
      var use = xb.stringifyUsedTime(Date.now()-beginTime);
      var cc  = count;
      count = 0;
      beginTime = Date.now();
      var parm = {rand: rand, difficult: difficult};
      
      get('81092b8cd82041a2b81296409eba92da', 'bosoncoin', 'mining', parm, function(ret) {
        log(ret.msg, '挖了', cc, '次,', '用了', use, ', 平均', speed, '次/秒');
        updateInfo();
        total();
        update_key(start_compute_hash);
      });
    }
  }
  
  function stop_mining() {
    clearInterval(mining_tid);
  }
  
  function hex_string(arr) {
    var buf = [];
    for (var i=0; i<arr.length; ++i) {
      var x = arr[i];
      var h = (x & 0xF0)>>4;
      var l =  x & 0xF;
      buf.push(HEX[h]);
      buf.push(HEX[l]);
    }
    return buf.join('');
  }
  
  function rand_string(len) {
    var buf = [];
    var x = dict.length;
    for (var i=0; i<len; ++i) {
      buf[i] = dict[ parseInt(Math.random() * x) ];
    }
    return buf.join('');
  }
  
  function total() {
    get('81092b8cd82041a2b81296409eba92da', 'bosoncoin', 'total', function(ret) {
      $('#total').html(fixNum(ret.result[0].total));
    });
  }
  
  function fixNum(x) {
    return new Decimal(x).toFixed();
  }
});