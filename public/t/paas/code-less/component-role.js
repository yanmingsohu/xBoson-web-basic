const tool = require('./tool.js');

module.exports = {
  createInstance,
  createPropsConfig,
  createProps,
  propSelectOptions,
  propTypeSelectOptions,
  propSettingComponent,
  propSettingComponentOptions,
};


function createInstance(root, component) {
  let cfg = newInstance(root, component);
  initProps(component, cfg);
  marginPlugin(root, component);
  return cfg;
}


function genID(root, component) {
  return component.txt +'-'+ (++root.id);
}


function marginPlugin(root, comp) {
  let p = root.plugins;
  if (!p) {
    p = root.plugins = {};
  }
  for (let n in comp.plugins) {
    p[n] = comp.plugins[n];
  }
}


//
// 创建组建实例对象
//
function newInstance(root, component) {
  let props = createProps(component);
  let propsConfig = {
    // 这是核心内置属性
    style       : { type:'design' },
    nestedList  : { type:'design' },
  };
  
  return {
    id    : genID(root, component),
    note  : '',
    props,
    propsConfig,
    cid         : component.id,
    clid        : component.clid,
    txt         : component.txt,
    removeTxt   : component.removeTxt,
    component   : component.component,
    helpTag     : component.helpTag,
    isInstance  : true,
    isContainer : component.isContainer,
    bindStyle   : {},
    vspecial    : {
      'v-if'  : { value:null, propsConfig: emptyPropsConfig('expr') },
      'v-for' : { value:null, propsConfig: emptyPropsConfig('expr') },
      'key'   : { value:null, propsConfig: emptyPropsConfig('expr') },
      'ref'   : { value:null, propsConfig: emptyPropsConfig('constant') },
      'is'    : { value:null, propsConfig: emptyPropsConfig('expr') },
      'v-slot': { value:null, propsConfig: emptyPropsConfig() },
    },
  }
}


function createProps(component) {
  // let containerStyle = component.isContainer && component.containerStyle;
  let props = {
    style      : Object.assign({}, component.style),
    nestedList : component.isContainer && [],
  };
  // 这样设置会影响配置文件
  // Object.defineProperty(props, 'disabled', {
  //   value: false,
  //   writable: false,
  // });
  return props;
}


function createPropsConfig(name, component) {
  return tool.exts(emptyPropsConfig(), component.props[name].propsConfig);
}


function emptyPropsConfig(_varType, _isExprAttr) {
  return {
    type        : 'attribute',
    varType     : _varType || 'constant', 
    ref         : null,
    expr        : null,
    callParams  : [],
    modifiers   : [],
    isExprAttr  : !!_isExprAttr,
  };
}


//
// 用指定的组件初始化属性实例列表
// 属性:
// desc: '按钮失效状态',                -- 文字说明
// type: 3,                             -- 处理类型
// select: {true:'禁用', false:'启用'}, -- 类型 3,4 的选项列表
// def: false,                          -- 默认值
// min: 0, max:10,                      -- 数字最大最小值, 字符串长度限制
//
function initProps(c, cfg) {
  for (let n in c.props) {
    let p = c.props[n];
    if (!cfg.propsConfig[n]) {
      cfg.propsConfig[n] = createPropsConfig(n, c);
    }
    
    if (cfg.props[n] !== undefined) continue; 
    if (p.def) {
      cfg.props[n] = tool.deepCopy(p.def);
    } 
    else {
      switch (p.type) {
        case 1: // 字符串(允许变量), 
        case 4: // 字符串,并且带有select选项, 
          cfg.props[n] = ''; break;
          
        case 2: // 整数(允许变量), 
          cfg.props[n] = 0; break;
          
        case 3: // 选项select属性
        case 10: // 选项select属性, 多选
        case 5: // 变量(废弃)
        case 6: // 图标选择
        case 7: // 自定义组件
          cfg.props[n] = null; break;
          
        case 8: // 事件
          cfg.propsConfig[n].varType = 'expr';
          cfg.props[n] = null; 
          break;
          
        case 9: // 隐藏, 这个属性配置不会被显示, 通常由其他的属性一同配置
          break;
          
        default:
          throw new Error("init props invaild type val:"+ n +', type:'+ p.type);
      }
    }
  }
}


function propSelectOptions() {
  return [
    { value: 1, label:'字符串' },
    { value: 2, label:'数字' },
    { value: 3, label:'选项列表' },
    // { value: 4, label:'字符串/选项列表' },
    // { value: 5, label:'废弃' },
    { value: 6, label:'图标选择 (fontawesome)' },
    { value: 7, label:'自定义插件' },
    { value: 8, label:'事件' },
    { value: 9, label:'隐藏配置' },
    { value: 10, label:'选项列表, 多选' },
  ];
}


function propSettingComponent(index) {
  return {
    1:'a-input',
    2:'a-input-number',
    3:'a-select',
    4:'a-input',
    5:'a-input',
    6:'cl-select-fa-icon',
    9:'x-null',
    10: 'a-select',
  }[index];
}


function propSettingComponentOptions(cfg) {
  let mode;
  
  switch (cfg.type) {
    case 1:
      return { maxLength: cfg.max };
    case 2:
      return { min: cfg.min, max: cfg.max, };
    case 10:
      mode = 'multiple'; // no break!
    case 3:
      let options = [];
      for (let label in cfg.select) {
        options.push({
          label,
          value : cfg.select[label],
        });
      }
      return { 'default-value': cfg.def, options, style: 'width: 100%', 'allowClear': true, mode };
    case 4:
      return {};
    case 5:
      return {};
    case 6:
      return { style: 'width: 100%' };
    case 7:
      return cfg.props || {};
    case 8:
      return { isEvent : true };
    case 9:
      return { hide: true };
    default:
      throw new Error("无效的值类型"+ cfg.type);
  }
}


function propTypeSelectOptions() {
  return [
    { value:'attribute' , label:'普通属性' },
    { value:'event'     , label:'绑定事件' },
    { value:'design'    , label:'设计时属性' },
  ];
}