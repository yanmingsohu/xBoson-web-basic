<!-- Create By xBoson System -->

<template>
<div class='fr'>
  <div class='hd'><a href='http://xboson.net' target='_blank' class='tt'>
    xBoson 开放式PaaS平台, 低代码开发平台</a></div>
  
  <div class='bd'>
    <h1 class='an'>{{ title }}</h1>
    <img :src='phone' width='210' class='ph'/>
  </div>
  
  <x-login-form class='lg'/>
  
  <div class='fo cp'>
    <div class="co">
      <div class="ar">
        <div class='h3'>xBoson</div>
        <p>让信息互联互通互信，让信息应用简单、迅速，企业大数据、微服务、区块链的首选平台</p>
        <p>© 2014-{{ y }} xBoson | <a href='http://www.beian.miit.gov.cn/' target='_blank'>沪ICP备18043968号-1</a></p>
      </div>
      
      <div>
        <div class='h5'><a href="http://xboson.net" target="_blank">上海竹呗信息技术有限公司</a></div>
        <p>商务合作：<a href="mailto:1071278001@qq.com">1071278001@qq.com</a></p>
        <p>官方QQ群：<a target="_blank" href="http://shang.qq.com/wpa/qunwpa?idkey=8d2009570e80eb77c5363d4c09839a98f73e71fcb0fbeb582cee8df167345fe0">477460646</a></p>
        <div style="color:#2b2b2b;font-size:0px;line-height:0px;">xBoson 官网, www.xboson.net</div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  props: ['title'],
  
  data() {
    return {
      y : new Date().getFullYear(),
      phone : xv.url_prefix +'/ui/paas/lib/img/demo/iphoneview.png',
    };
  },
}
</script>

<style scoped>
.co { display: grid; grid-template-columns: 3fr 2fr; gap: 85px; }
.fr { display: grid; grid-template-columns: 1fr auto;
  grid-template-rows: 100px auto 1fr; height: 100%; }
.hd, .fo { grid-column: 1 / 3; }
.hd { background-color: #eee; padding: 20px; }
.fo { background-color: #eee; padding: 40px; }
.tt { line-height:33px;width:328px;color:#04888D;text-shadow: 0 1px #021B1B;font-weight:bold;
  font-size:24px; text-decoration: none; }
.bd { text-align: right; display: grid; grid-template-columns: 1fr auto; }
.ph { position: relative; top: -20px; }
.cp { padding-top: 50px; opacity: 0.3; }
.cp p { color: #aaa; display: block; }
.cp a { text-decoration: none; color: #888; }
.ar { text-align: right; }
.h3 { font-size: 30px; color: #000; }
.h5 { font-size: 15px; line-height: 42px; }
.an { padding: 20px; color: #656565; text-shadow: 3px 3px #eee; }

@media screen and (max-width: 900px) {
  .ph, .cp { display: none; }
  .fr { display: flex; flex-direction: column; }
  .lg { width: 100%; }
  .hd { background-color: #fff; }
  .tt { font-size: 18px; }
  .bd { text-align: left; }
  .tt { color: #aaa; text-shadow: 0 0; font-size: 10pt; border-bottom: 1px dashed #eee; }
}
</style>