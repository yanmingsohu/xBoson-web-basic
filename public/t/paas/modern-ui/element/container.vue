<!-- Create By xBoson System -->

<template>
  <doc>
    <h2>Container 布局容器</h2>
    <p> 用于布局的容器组件，方便快速搭建页面的基本结构：</p>

    <pre>
      <code>&lt;el-container&gt;</code>：外层容器。当子元素中包含 <code>&lt;el-header&gt;</code> 或 <code>&lt;el-footer&gt;</code> 时，全部子元素会垂直上下排列，否则会水平左右排列。
      <code>&lt;el-header&gt;</code>：顶栏容器。
      <code>&lt;el-aside&gt;</code>：侧边栏容器。
      <code>&lt;el-main&gt;</code>：主要区域容器。
      <code>&lt;el-footer&gt;</code>：底栏容器。
    </pre>
    
    <tip><p>以上组件采用了 flex 布局，使用前请确定目标浏览器是否兼容。此外，<code>&lt;el-container&gt;</code> 的子元素只能是后四者，后四者的父元素也只能是 <code>&lt;el-container&gt;</code>。</p></tip>
    
    <h3>常见页面布局</h3>
    <demo-layout>
      <div v-pre>
<el-container>
  <el-header>Header</el-header>
  <el-main>Main</el-main>
</el-container>
      </div>
    </demo-layout>
    
    <demo-layout>
      <div v-pre>
<el-container>
  <el-header>Header</el-header>
  <el-main>Main</el-main>
  <el-footer>Footer</el-footer>
</el-container>
      </div>
    </demo-layout>
    
    <demo-layout>
      <div v-pre>
<el-container>
  <el-aside width="200px">Aside</el-aside>
  <el-main>Main</el-main>
</el-container>
      </div>
    </demo-layout>
    
    <demo-layout>
      <div v-pre>
<el-container>
  <el-header>Header</el-header>
  <el-container>
    <el-aside width="200px">Aside</el-aside>
    <el-main>Main</el-main>
  </el-container>
</el-container>
      </div>
    </demo-layout>
    
    <demo-layout>
      <div v-pre>
<el-container>
  <el-header>Header</el-header>
  <el-container>
    <el-aside width="200px">Aside</el-aside>
    <el-container>
      <el-main>Main</el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </el-container>
</el-container>
      </div>
    </demo-layout>
    
    <demo-layout>
      <div v-pre>
<el-container>
  <el-aside width="200px">Aside</el-aside>
  <el-container>
    <el-header>Header</el-header>
    <el-main>Main</el-main>
  </el-container>
</el-container>
      </div>
    </demo-layout>
    
    <demo-layout>
      <div v-pre>
<el-container>
  <el-aside width="200px">Aside</el-aside>
  <el-container>
    <el-header>Header</el-header>
    <el-main>Main</el-main>
    <el-footer>Footer</el-footer>
  </el-container>
</el-container>
      </div>
    </demo-layout>
    
  </doc>
</template>

<script>
export default {
}
</script>

<style>
</style>