<!-- Create By xBoson System -->

<template>
  <div>
    <div>ID</div>
    <a-input :value='config.id' disabled='true' />
    
    <div v-if='!config.removeTxt' class='spt'>文本</div>
    <a-textarea 
      v-model='config.txt'
      placeholder="组件显示文本"
      v-if='!config.removeTxt'
      @change='fileChanged'
      :auto-size="{ minRows: 2, maxRows: 10 }"/>
      
    <div class='spt'>备注</div>
    <a-textarea 
      v-model='config.note'
      placeholder="备注"
      @change='fileChanged'
      :auto-size="{ minRows: 1, maxRows: 10 }"/>
      
    <a-popconfirm
      title="立即删除选中组件?"
      ok-text="删除!"
      ok-type='danger'
      cancel-text="取消"
      @confirm="removeComponent">
        <a-button type='primary' size='small' block class='space'>删除组件</a-button>
    </a-popconfirm>
    
    <space/>
    
    <div v-for='(p, name) in getComponentProps()' class='spt'>
      <component :is="getGasketName(p, name)"
        :name='name'
        :desc='p.desc'
        :componentName='getComponentName(p)'
        :bind='getOption(name)'
        :props='config.props'
        :propsConfig='config.propsConfig'
        :cid='config.cid'
        :isEventBind='isEventBind(p)'
        @change='fileChanged'
        v-if='p.type != 9'
      />
    </div>
    
    <space/>
    
    <div v-if='config.vspecial'>
      <div @click='showVspecial = !showVspecial' class='clbutton'>
        <a-icon type="caret-down" v-if='showVspecial'/> 
        <a-icon type='vertical-align-bottom' v-else/>
        控制属性
      </div>
      <cl-adj-vspecial :config='config' v-if='showVspecial'/>
    </div>
    
    <div v-if='componentCfg.doc'>
      <div class='note docti'>组件帮助文档</div>
      <pre v-html='componentCfg.doc'></pre>
    </div>
    
  </div>
</template>

<script>
const clib = require("./component-library.js");
const crole = require("./component-role.js");
const tool = require("./tool.js");

export default {
  props: ['config'],
  components : tool.loadc(
    'cl-select-fa-icon', 'cl-attr-dynamic', 'cl-attr-fixed', 
    'cl-attr-bind-data', 'cl-adj-vspecial'),
    
  data() {
    return {
      showVspecial: false,
    };
  },
  
  computed: {
    componentCfg() {
      return clib.getComponent(this.config.cid);
    },
  },
  
  methods: {
    getComponentName(p) {
      if (p.type == 7) {
        if (!p.component) throw new Error("component is null");
        return p.component;
      }
      return crole.propSettingComponent(p.type);
    },
    
    getGasketName(p, name) {
      if (p.propsConfig) {
        switch (p.propsConfig.type) {
        // 设计时属性一定是常量
        case 'design':
          return 'cl-attr-fixed';
          
        case 'event':
          return 'cl-attr-dynamic';
        }
      }
      return p.canDynamic ? 'cl-attr-dynamic' : 'cl-attr-fixed';
    },
    
    getComponentProps() {
      return this.componentCfg.props;
    },
    
    // 返回的所有属性绑定到创建的组件上, 来自组件定义数据
    getOption(name) {
      let p = this.componentCfg.props[name];
      return crole.propSettingComponentOptions(p);
    },
    
    removeComponent() {
      this.$store.commit('removeNestedItem');
      this.fileChanged();
    },
    
    fileChanged() {
      this.$store.commit('setEditFileChanged', true);
    },
    
    isEventBind(p) {
      return (p.type == 8 || (p.propsConfig && p.propsConfig.type == "event"));
    },
  },
}
</script>

<style scoped>
.space {
  margin: 2px 0;
}
space {
  height: 1em; width: 100%; display: block;
}
.clbutton {
  cursor: pointer; color: #999; padding: 3px 1px;
}
.clbutton:hover {
  background-color: #eee; color: #000;
}
.spt { margin-top: 5px; }
.docti { 
  font-weight: bold; border-top: 1px dashed #ccc; margin-top: 20px;
}
</style>