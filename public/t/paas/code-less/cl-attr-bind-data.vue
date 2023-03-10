<!-- Create By xBoson System -->

<template>
<div>
  <div class='items-group'>
    <div class='i txt tname note'>{{typeConfig.name}}</div>
    <div class='i txt' v-if='typeVal != null'>
      <div v-if='typeConfig.readonly'>
        {{ typeConfig.disp(typeVal) }}
      </div>
      <div v-else>
        {{ typeVal }}  
      </div>
    </div>
    <div class='i txt nullv' v-else>[空值]</div>
    <a-button class='i' icon='edit' type='primary' @click='openEdit = true'></a-button>
  </div>
  
  <a-drawer
    placement="right"
    width='490px'
    :visible="openEdit"
    :closable='false'
    :destroyOnClose='true'
    @close="openEdit = false">
    
    <template v-slot:title>
      <span class='title'>动态属性配置</span>
      <span class='name animate__bounce animate__animated'>{{desc}}</span>
    </template>
    
    <a-form-item label="属性类型">
      <a-radio-group v-model="config.varType" @change="onChange">
        <a-radio-button v-for='(n, key) in nameMap' :value="key" :key='key' 
          v-if='n.dnotEvent ? (!isEventBind) : true'>
          {{n.name}}
        </a-radio-button>
      </a-radio-group>
      <a-button :key='nullexpr' @click='setNull' style='margin-left: 10px'>
        空
      </a-button>
    </a-form-item>
    
    <a-form-item label='值配置'>
      <a-input-group compact>
        <a-input 
          v-if='typeConfig.readonly'
          :disabled='true' 
          :value='typeConfig.disp(typeVal)'
          class='typevalue'
        />
        <a-input
          v-else
          v-model='typeVal'
          class='typevalue'
        />
        
        <a-button 
          @click='openSelect = true'
          v-if='typeConfig.readonly'
        >
          选择{{ nameMap[config.varType].name }}
        </a-button>
        
        <a-button icon="question"
          @click='showExprHelp = !showExprHelp' v-if='typeConfig.exprHelp'/>
      </a-input-group>
    </a-form-item>
    
    <section v-if='typeConfig.needParams'>
      <div class='g2'>
        <label style='color:black'>实参列表</label>
        <a-button shape="circle" size='small' icon="question" 
          @click='showExprHelp = !showExprHelp' class='fright'/>
      </div>
      
      <div v-if='funcParams != null' class='paramslist'>
        <a-input 
          v-for='(fp, i) in funcParams' 
          :value='getCallParams(i).v' 
          @input='setCallParams($event, i)'
        >
          <template v-slot:addonBefore>
            <span class='cpname'>{{ fp.name }}</span>
          </template>
        </a-input>
      </div>
      <div v-else class='note' style='padding-left: 100px'>
        无参数
      </div>
    </section>
    
    <a-form-item label='事件修饰符' v-if='isEventBind'>
      <cl-attr-dyn-modifiers
        :modifiers='config.modifiers'/>
    </a-form-item>
    
    <a-form-item>
      <a-button type='primary' @click='ok'>确定</a-button>
    </a-form-item>
    
    <cl-expr-help v-if='showExprHelp' @close='showExprHelp = false'/>
    
    <a-drawer
      title='选择'
      placement="right"
      :visible="openSelect"
      :closable='true'
      :destroyOnClose='true'
      @close="openSelect = false"
    >
      <component 
        :is='typeConfig.component'
        v-bind='typeConfig.props'
        @choose='typeConfig.choose'/>
    </a-drawer>
  </a-drawer>
</div>
</template>

<script>
const tool = require("./tool.js");

export default {
  props: ['value', 'config'],
  
  components: tool.loadc('cl-list-vars', 'cl-list-funcs', 'cl-expr-help'),
    
  computed: {
    typeConfig() {
      return this.nameMap[this.config.varType];
    },
    
    typeVal: {
      get() {
        switch (this.config.varType) {
          case 'expr': 
            return this.config.expr;
          case 'constant':
            return this.value;
          default:
            return this.config.ref;
        }
      },
      set(v) {
        // console.log(v, this.config)
        switch (this.config.varType) {
          case 'expr': 
            return this.config.expr = v;
          case 'constant':
            return this.$emit('input', v);
          default:
            return this.config.ref = v;
        }
      }
    },
    
    funcParams() {
      let f = tool.getRoot().funcs[this.config.ref];
      if (f) {
        return f.params;
      }
    },
  },
  
  data() {
    return {
      openSelect : false,
      showExprHelp : false,
      root : tool.getRoot(),
      openEdit : false,
      nameMap : {
        'constant'  : { name : '常量', 
            hide      : true,
            dnotEvent : true },
        'variable'  : { name : '变量', 
            readonly  : true, 
            component : 'cl-list-vars', 
            choose    : this.selectRef,
            disp      : this.dispVar,
            props     : { allowProps: true, allowComputed: true },
            dnotEvent : true},
        'function'  : { name : '函数引用', 
            readonly  : true, 
            component : 'cl-list-funcs',
            choose    : this.selectRef,
            disp      : this.dispFunc},
        'call'      : { name : '函数调用', 
            readonly  : true, 
            needParams: true, 
            component : 'cl-list-funcs',
            choose    : this.selectCall,
            disp      : this.dispFunc },
        'expr'      : { name : '表达式', 
            exprHelp  : true },
      },
      wikiurl : xv.ctx_prefix + "/face/web/wiki-api/index.html#docs/javascript-doc.htm",
    };
  },
  
  methods: {
    selectRef(id, cfg) {
      // console.log('ref', id, cfg);
      this.openSelect = false;
      this.typeVal = id;
    },
    
    selectCall(id, cfg) {
      // console.log('call', id, cfg);
      this.openSelect = false;
      this.typeVal = id;
      
      if (!this.config.callParams) {
        this.$set(this.config, 'callParams', []);
      }
    },
    
    ok() {
      this.openEdit = false;
      this.onChange();
    },
    
    onChange() {
      this.$emit('change');
    },
    
    dispFunc(id) {
      let f = this.root.funcs[id];
      if (f) {
        return f.name;
      }
      this.config.ref = null;
      return null;
    },
    
    dispVar(id) {
      if (id) {
        let map;
        if (id.startsWith('cp$')) {
          map = this.root.computeProps;
        } else if (id.startsWith('v$')) {
          map = this.root.vars;
        } else {
          map = this.root.argProps;
        }
        
        if (map && map[id]) {
          return map[id].name;
        }
      }
      this.config.ref = null;
      return null;
    },
    
    setCallParams(e, i) {
      this.config.callParams[i].v = e.target.value;
    },
    
    getCallParams(i) {
      if (!this.config.callParams[i]) {
        this.$set(this.config.callParams, i, {t:0, v:null, n:null});
      }
      return this.config.callParams[i];
    },
    
    setNull() {
      this.config.varType = 'expr';
      this.config.expr = null;
    },
  },
}
</script>

<style scoped>
.typevalue {
  width: 70%!important;
}
.txt {
  padding: 5px 0 0 9px; border-color: #ccc;
}
.nullv {
  background-color: #ffe6e6; text-align: center;
}
.title {
  margin-right: 8px;
}
.cpname {
  min-width: 100px; display: block;
}
.paramslist>* {
  margin-top: 3px;
}
h4 {
  border-bottom: 1px dashed #eee;
}
section {
  margin-bottom: 24px;
}
.tname {
  word-break: keep-all;
}
.g2 {
  display: grid; grid-template-columns: 1fr auto;
}
</style>