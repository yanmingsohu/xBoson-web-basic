<!-- Create By xBoson System -->

<template>
  <div class='menu-container'>
    <transition name="menu-rev">
      <el-aside class='menu1' v-show='!showMainMenu' :width='menu2width'
        @mouseover.native='menu1enter=true'
        @click.native='menu1enter=true, menu2enter=false'>
      </el-aside>
    </transition>
    <transition name="menu">
      <el-aside class='menu1' v-show='showMainMenu' :width='menu1width'>
        <el-menu  background-color="#2b2b2b"
                  text-color="#cccccc"
                  active-text-color="#ffd04b"
                  @select='openSubMenu'>
  <div class='title'>{{title}}</div>
  <!-- 主菜单插槽 -->
  <slot name='main'></slot>
  <a class='footer' href='http://xboson.net' v-show='showMainMenu'>上海竹呗信息技术有限公司</a>
        </el-menu>
      </el-aside>
    </transition>
    
    <transition name="menu-rev">
      <el-aside class='menu2' v-show="!showSubMenu"
          @click.native='menu2enter=true, menu1enter=false'
          @mouseover.native='menu2enter=true' :width='menu2width'>
      </el-aside>
    </transition>
    <transition name="menu">
      <el-aside class='menu2' v-show="showSubMenu" :width='menu1width'>
  <!-- 二级菜单插槽 -->
  <slot name='sub'></slot>
      </el-aside>
    </transition>
  </div>
</template>

<script>
//
// 一级菜单插槽 main
// 二级菜单插槽 sub
// 当内容为焦点时, 绑定的变量 hideAll 被修改, 菜单隐藏
// 用 el-menu-item 作为一级菜单项, 点击菜单, 发布 openSubMenu 消息 
// 第一个参数是 index 属性值.
// title 属性作为主菜单标题
//
export default {
  props: ['hideAll', 'title'],
  
  data () {
    return {
      submenuFirstSet : false,
      menu1enter : true,
      menu2enter : false,
      menu1width : '300px',
      menu2width : '50px',
    }
  },
  
  watch : {
    hideAll : function(v) {
      this.menu1enter = false;
      this.menu2enter = false;
    },
  },
  
  computed : {
    showSubMenu() {
      if (!this.submenuFirstSet) {
        return false;
      }
      if (this.menu2enter) {
        return true;
      }
      return false;
    },
    
    showMainMenu() {
      if (!this.submenuFirstSet) {
        return true;
      }
      if (this.menu1enter) {
        return true;
      }
      return false;
    },
  },
  
  methods : {
    openSubMenu(id) {
      // 组件消息
      this.$emit("openSubMenu", id);
      this.submenuFirstSet = true;
      this.menu2enter = true;
    },
    
    onResize() {
      let h = window.innerWidth;
      if (h > 660) {
        this.menu1width = '300px';
        this.menu2width = '50px';
      } else {
        this.menu1width = (h * 0.45)+'px'; //不支持百分比
        this.menu2width = '20px';
      }
    }
  },
  
  mounted() {
    this.onResize();
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    })
  },

  beforeDestroy() { 
    window.removeEventListener('resize', this.onResize); 
  },
}
</script>

<style scoped>
.menu1 {
  transition: width 0.7s;
  background-color: #2b2b2b;
  color: #ccc; 
  overflow-x: hidden!important;
  height: 100%;
}
.menu2 {
  transition: width 0.7s;
  background-color: #796547;
  color: #fff;
  overflow-x: hidden!important;
  height: 100%;
}

.menu-rev-enter-to {
  /*width: 50px!important;*/
}
.menu-rev-leave-to {
  width: 0!important;
}
.menu-rev-enter  {
  width: 0px!important;
}
.menu-rev-leave  {
  width: 50px!important;
}

.menu-enter-to  {
  /*width: 300px!important;*/
}
.menu-leave-to  {
  width: 0px!important;
}
.menu-enter  {
  width: 0px!important;
}
.menu-leave  {
  width: 300px!important;
}

.menu-container {
  display:flex; flex-direction:row; position: absolute; z-index:9999; height:100%;
}
.title {
  font-size: 8px;  color: #777;  border-bottom: 1px dashed; white-space: nowrap;
}
.footer {
  position: fixed; left:0; bottom: 0; font-size: 8px; white-space: nowrap; border-top: 1px dashed;
  color: #3e3e3e; width: 300px; text-decoration:none;
}

@media screen and (max-device-width: 660px) {
  .menu-enter-to  {
    /*max-width: 45%!important;*/
  }
  .menu-leave  {
    max-width: 45%!important;
  }
  .menu-rev-enter-to {
    /*max-width: 20px!important;*/
  }
  .menu-rev-leave  {
    max-width: 20px!important;
  }
  .footer {
    width: 45%;
  }
}
</style>