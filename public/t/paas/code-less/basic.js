module.exports = {
  bc001: {
    txt:'文本', 
    component:'span'
  },
  
  bc002: {
    txt:'标签', 
    component:'label'
  },
  
  bc003: {
    txt:'段落', 
    component:'p'
  },
  
  bc004: {
    txt:'标题1', 
    component:'h1'
  },
  
  bc004h2: {
    txt:'标题2', 
    component:'h2'
  },
  
  bc004h3: {
    txt:'标题3', 
    component:'h3'
  },
  
  bc004h4: {
    txt:'标题4', 
    component:'h4'
  },
  
  bc004h5: {
    txt:'标题5', 
    component:'h5'
  },
  
  bc004h6: {
    txt:'标题6', 
    component:'h6'
  },
  
  bc005: {
    txt:'按钮', 
    component:'a-button',
    props: {
      disabled: {
        desc: '按钮失效状态',
        type: 3,
        select: {'禁用':true, '启用':false},
        def: false,
      },
      shape: {
        desc: '按钮形状',
        type: 3,
        select:{ '方形':'round', '圆形':'circle' },
      },
      icon: {
        desc: '图标类型',
        type: 6,
      },
      loading: {
        desc: '显示加载中',
        type: 3,
        select:{"加载中":true, '正常':false},
      }
    }
  },
  
  bc006: {
    txt:'输入框', 
    component:'a-input',
    props: {
      placeholder: {
        desc: '提示',
        type: 1,
        def: '输入文本',
      },
    }
  },
  
  bc007: {
    txt:'分割线',
    component:'hr',
  },
  
  bc008: {
    txt: '格式化文本',
    component: 'pre',
  }
}