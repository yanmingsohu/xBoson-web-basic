# xBoson 扩展模块

这些模块可以在 api 脚本中通过 require() 来引用.
模块也可用 npm install 来安装.
部分 ES7 javascript 特性不支持, 比如 const 语法, 尝试安装更低版本的模块可以解决.
当模块加载了 c++ 实现, 这些模块会加载失败.
node_modules 目录中是实际安装的模块.

扩展模块被设计成系统启动后加载一次, 不接受修改后立即生效,
若模块中的脚本改变, 必须重启系统.


模块 `uglify-js-min` 用脚本生成:

```bash
node build-uglify
```