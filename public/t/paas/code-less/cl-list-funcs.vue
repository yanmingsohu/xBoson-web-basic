<!-- Create By xBoson System -->

<template>
  <div style='display: grid; grid-template-columns: 1fr; gap: 2px'>
    <a-button v-for='(s, id) in getList()' @click='choose(id, s)'>{{s.name}}</a-button>
  </div>
</template>

<script>
const tool = require("./tool.js");

export default {
  methods: {
    choose(id, cfg) {
      this.$emit('choose', id, cfg);
    },
    
    getList() {
      return tool.getRoot().funcs;
    },
  },
}
</script>

<style scoped>
</style>