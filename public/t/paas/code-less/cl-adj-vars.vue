<!-- Create By xBoson System -->

<template>
<div>
  <cl-adj-context-basic
    :value='value'
    pname='变量'
    pid='v$'
    configTitle='变量'
    configComponent='cl-nc-var'
    :initItem='initItem'
    :createConfigData='createConfigData'
    @change='onChange'
  >
  </cl-adj-context-basic>
</div>
</template>

<script>
export default {
  props: ['value'],
  
  methods: {
    initItem(opt) {
      opt.type = 'String';
      opt.def = '';
    },
    
    createConfigData(opt, id) {
      return { id, opt };
    },
    
    onChange() {
      this.$store.commit('setEditFileChanged', true);
    },
  },
}
</script>

<style scoped>
</style>