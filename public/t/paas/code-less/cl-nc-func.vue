<!-- Create By xBoson System -->

<template>
  <div class='main'>
    <x-ace v-model='opt.code' language='javascript' @editHandle='setEditor'></x-ace>
    <div>
      <h4>函数参数</h4>
      <div class='parmdiv note'>
        <span></span>
        <span>描述名</span>
        <span>形参名</span>
        <span></span>
      </div>
      
      <a-input-group compact v-for='(p, i) in opt.params' class='parmdiv'>
        <a-tooltip placement="left" :title='errMsg[i]' :visible='errMsg[i] != null'>
          <a-input v-model='p.name' @change='onChange'/>
        </a-tooltip>
        <a-input v-model='p.pn' @change='onChange'/>
        <a-popconfirm
          title="删除形参?"
          ok-text="删除"
          okType='danger'
          cancel-text="取消"
          @confirm="removep(i)">
          <a-button icon='delete' type='danger'/>
        </a-popconfirm>
      </a-input-group compact>
      
      <cl-add-button @click='addp' title='添加函数参数'/>
      <hr/>
      <a-button @click='ok' type='primary'>确定</a-button>
      <a-button @click='showVarSelect = true'>引用变量</a-button>
      <a-button @click='showFuncSelect = true'>引用函数</a-button>
      
      <pre class='errormsg'>{{codeErrMsg}}</pre>
    </div>
    
    <a-drawer
      title="选择变量"
      placement="right"
      :visible="showVarSelect"
      @close="showVarSelect = false"
    >
      <cl-list-vars @choose='addVar' :allowProps='true' :allowComputed='true'></cl-list-vars>
    </a-drawer>
    
    <a-drawer
      title="选择函数"
      placement="right"
      :visible="showFuncSelect"
      @close="showFuncSelect = false"
    >
      <cl-list-funcs @choose='addFunc'></cl-list-funcs>
    </a-drawer>
  </div>
</template>

<script>
const tool = require("./tool.js");

export default {
  props: ['id', 'opt'],
  components : tool.loadc('cl-list-vars', 'cl-list-funcs'),
  
  mounted() {
    this.$emit('blockClose', true);
    this.$emit('change');
  },
  
  data() {
    return {
      codeErrMsg: '',
      checkVar : tool.checkVar,
      errMsg : [],
      showVarSelect : false,
      showFuncSelect : false,
      upComments : tool.delayWorker(this.rewriteComments, 500),
      editor : null,
    };
  },
  
  methods: {
    removep(i) {
      this.opt.params.splice(i, 1);
      this.rewriteComments();
    },
    
    ok() {
      if (this.checkNameRule() && this.checkCode()) {
        this.$emit('blockClose', false);
        this.$emit('close');
      }
      // this.$emit('change');
    },
    
    checkNameRule() {
      for (let i=0; i<this.opt.params.length; ++i) {
        let p = this.opt.params[i];
        if (!p.name) {
          this.$set(this.errMsg, i, '描述无效');
          return false;
        }
        else if (!this.checkVar.test(p.pn)) {
          this.$set(this.errMsg, i, '形参名无效');
          return false;
        }
        else {
          this.$set(this.errMsg, i, null);
        }
      }
      return true;
    },
    
    checkCode() {
      try {
        Function(xv.withFileName(this.opt.code, this.opt.name));
        this.codeErrMsg = null;
        return true;
      } catch(err) {
        this.codeErrMsg = '函数语法错误\n'+ err.message;
        console.error(err);
      }
    },
    
    addp() {
      let i = this.opt.params.length;
      this.opt.params.push({
        name : '参数'+ i,
        pn   : 'v'+ i,
      });
      this.rewriteComments();
    },
    
    onChange() {
      this.upComments();
    },
    
    addVar(id, v) {
      this.insert(tool.refVar(id, v.name));
      this.showVarSelect = false;
    },
    
    addFunc(id, f) {
      this.insert(tool.refFunc(id, f.name, f.params));
      this.showFuncSelect = false;
    },
    
    rewriteComments() {
      if (this.checkNameRule()) {
        let c = tool.generateFunctionComments(this.opt);
        this.opt.code = tool.generateReplaceHeader(this.opt.code, c);
        this.editor.setValue(this.opt.code);
      }
      // this.$emit('change');
    },
    
    insert(v) {
      this.editor.insert(v);
    },
    
    setEditor(e) {
      this.editor = e;
    },
  },
}
</script>

<style scoped>
.main {
  display: grid; grid-template-columns: 1fr 300px; gap: 8px;
  height: calc(100vh - 120px);
}
hr {
  border: 0; border-top: 1px dashed #ccc; margin: 25px 0 10px 0;
}
.parmdiv {
  display: grid!important; grid-template-columns: 0 1fr 1fr auto; gap: 2px 0;
}
.errormsg {
  color: red; margin-top: 20px; white-space: pre-wrap;
}
</style>