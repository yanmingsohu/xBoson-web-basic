<!-- Create By xBoson System -->

<template>
<div>
  <div v-if='isArray'>
    <div class='items-group arr' v-for='(e, i) in value'>
      <span class='p k'>{{ e[keyName] }}</span>
      <span class='p'>:</span>
      <span class='p'>{{ varInputTransfer(e[varName]) }}</span>
      <a-button icon='edit' size='small' @click='openEdit(i, e)'/>
      <a-popconfirm placement="right" title='立即删除?'
          ok-text="删除" cancel-text="取消" @confirm="value.splice(i, 1)">
        <a-button icon='delete' size='small'/>
      </a-popconfirm>
    </div>
  </div>
  <div v-else>
    <div class='items-group arr' v-for='(v, k) in value'>
      <span class='p k'>{{ k }}</span>
      <span class='p note'>:</span>
      <span class='p'>{{ varInputTransfer(v) }}</span>
      <a-button icon='edit' size='small' @click='openEdit(k, v)'/>
      <a-popconfirm placement="right" title='立即删除?'
          ok-text="删除" cancel-text="取消" @confirm="$delete(value, k)">
        <a-button icon='delete' size='small'/>
      </a-popconfirm>
    </div>
  </div>
  
  <cl-add-button @click='openAdd' :title='title'/>
  
  <a-modal
    :title="title"
    :visible="showAdd"
    :confirmLoading='waiting'
    :closable='! waiting'
    @ok="onOk"
    @cancel="cancel"
  >
    <form class='cl-form'>
      <label>{{ keyLabel }}</label>
      <div class='items-group addtion'>
        <a-input v-model='insert.k' :placeholder='keyPlaceholder'/>
        <slot name='nameAddtion'/>
      </div>
      
      <label>{{ varLabel }}</label>
      <div class='items-group addtion'>
        <a-input v-model='insert.v' :placeholder='varPlaceholder'/>
        <slot name='valueAddtion'/>
      </div>
    </form>
  </a-modal>
  
</div>
</template>

<script>
const tool = require("./tool.js");
// 设置 array/object 的表单组件
export default {
  props: {
    // 用于 v-module 绑定
    value: { type: Object, required: true },
    // Type(value) == array 设置数组元素中, key 的名字
    keyName: { type: String, default: 'key', required: true },
    // Type(value) == array 设置数组元素中, value 的名字
    varName: { type: String, default: 'value', required: true },
    // 按钮/主菜单名
    title: { type: String, default: '添加', required: true },
    // 不允许有重复的 key
    notRepeated: { type: Boolean, default: true },
    // 用于验证参数有效性, 返回一个 Promise, Functoin(key, value) 
    verify: { type: Function, default: null },
    // 不同的 var 值类型在显示到表单时进行的转换
    varInputTransfer: { type: Function, default: function(v) { return v; }, },
    
    keyLabel: { type: String, default: '键' },
    varLabel: { type: String, default: '值' },
    keyPlaceholder: { type:String },
    varPlaceholder: { type:String },
  },
  
  data() {
    return {
      isArray : Array.isArray(this.value),
      showAdd : false,
      insert  : { k:'', v:'' },
      recover : null,
      waiting : false,
      mode    : null,
    };
  },
  
  methods: {
    openAdd() {
      this.insert.i = null;
      this.showAdd = true; 
      this.mode = this.isArray ? this.insertArray : this.insertObject;
    },
    
    openEdit(x, y) {
      if (this.isArray) {
        this.insert.i = x;
        this.insert.k = y[this.keyName];
        this.insert.v = this.varInputTransfer(y[this.varName]);
        this.value.splite(x, 1);
        
        this.recover = ()=>{
          this.value.splite(x, 0, y);  
        };
      } else {
        this.insert.k = x;
        this.insert.v = this.varInputTransfer(y);
        this.$delete(this.value, x);
        // this.value[x] = null;
        
        this.recover = ()=>{
          this.value[x] = y;
        };
      }
      this.showAdd = true;
      this.mode = this.isArray ? this.insertArray : this.insertObject;
    },
    
    onOk() {
      if (! this.insert.k) {
        return antd.message.error(this.keyLabel +" 不能为空");
      }
      if (! this.insert.v) {
        return antd.message.error(this.varLabel +" 不能为空");
      }
      
      let insert = Object.assign({}, this.insert);
      let ok = ()=>{
        this.waiting = false;
        if (this.mode(insert)) {
          this.showAdd = false;
          this.insert.k = this.insert.v = null;
          this.recover = null;
          antd.message.success(this.title +" 成功");
        }
      };
      
      if (this.verify) {
        try {
          this.waiting = true;
          this.verify(insert).then(ok).catch(this._error);
        } catch(e) {
          this._error(e);
        }
      } else {
        ok();
      }
    },
    
    _error(e) {
      this.waiting = false;
      let msg = (e ? (e.message || e) : '未知错误');
      antd.message.error("验证失败: "+ msg);
    },
    
    hasArrRep(insert) {
      let i = this.value.findIndex(e=>{
        return e[this.keyName] == insert.k;
      });
      if (i >= 0) {
        antd.message.error("重复, "+ insert.k +' 已经设置');
        return true;
      }
    },
    
    insertArray(insert) {
      if (this.notRepeated && this.hasArrRep(insert)) {
        return;
      }
      
      let a = {};
      a[this.keyName] = insert.k;
      a[this.varName] = insert.v;
      if (isNaN(insert.i)) {
        this.value.push(a);
      } else {
        this.value.splice(insert.i, 0, a);
      }
      return true;
    },
    
    hasMapRep(insert) {
      if (this.value[insert.k]) {
        antd.message.error("重复, "+ insert.k +' 已经设置');
        return true;
      }
    },
    
    insertObject(insert) {
      if (this.notRepeated && this.hasMapRep(insert)) {
        return;
      }
      
      this.value[insert.k] = insert.v;
      return true;
    },
    
    cancel() {
      if (! this.waiting) {
        this.showAdd = false;
      }
      if (this.recover) {
        this.recover();
        this.recover = null;
      }
    }
  },
}
</script>

<style scoped>
.p { border-bottom: 1px solid #eee; line-height: 23px; padding: 0 2px; }
.arr { grid-template-columns: 1fr auto 2fr auto auto; gap: 2px 0; }
.addtion { grid-template-columns: 1fr auto; gap: 2px }
.k { text-align: right; }
</style>