!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e=e||self).SmoothDnD={})}(this,function(e){"use strict";var i,r="smooth-dnd-container-instance",v="smooth-dnd-draggable-wrapper",o="animated",c="__smooth_dnd_draggable_translation_value",a="__smooth_dnd_draggable_visibility_value",f="smooth-dnd-ghost",y="smooth-dnd-container",u="smooth-dnd-extra-size-for-insertion",d="smooth-dnd-stretcher-element",g="smooth-dnd-stretcher-instance",l="smooth-dnd-disable-touch-action",s="smooth-dnd-no-user-select",m="smooth-dnd-prevent-auto-scroll-class",p="smooth-dnd-drop-preview-default-class",h="smooth-dnd-drop-preview-inner-class",b="smooth-dnd-drop-preview-constant-class",w="smooth-dnd-drop-preview-flex-container-class",t=Object.freeze({containerInstance:r,defaultGroupName:"@@smooth-dnd-default-group@@",wrapperClass:v,defaultGrabHandleClass:"smooth-dnd-default-grap-handle",animationClass:o,translationValue:c,visibilityValue:a,ghostClass:f,containerClass:y,extraSizeForInsertion:u,stretcherElementClass:d,stretcherElementInstance:g,isDraggableDetached:"smoth-dnd-is-draggable-detached",disbaleTouchActions:l,noUserSelectClass:s,preventAutoScrollClass:m,dropPlaceholderDefaultClass:p,dropPlaceholderInnerClass:h,dropPlaceholderWrapperClass:b,dropPlaceholderFlexContainerClass:w}),x={groupName:void 0,behaviour:"move",orientation:"vertical",getChildPayload:void 0,animationDuration:250,autoScrollEnabled:!0,shouldAcceptDrop:void 0,shouldAnimateDrop:void 0};function E(e){return(E="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function n(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function C(e){return function(e){if(Array.isArray(e))return S(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(e){if("string"==typeof e)return S(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Map"===(n="Object"===n&&e.constructor?e.constructor.name:n)||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?S(e,t):void 0}}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function S(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=new Array(t);n<t;n++)o[n]=e[n];return o}(Nt=i=i||{}).x="x",Nt.y="y",Nt.xy="xy";function D(e){var t=window.getComputedStyle(e);return"auto"===(e=t.overflow)||"scroll"===e?i.xy:(e="auto"===(e=t["overflow-x"])||"scroll"===e,t="auto"===(t=t["overflow-y"])||"scroll"===t,e&&t?i.xy:e?i.x:t?i.y:null)}function O(e,t){var n=window.getComputedStyle(e),e=n.overflow,t=n["overflow-".concat(t)];return"auto"===e||"scroll"===e||("auto"===t||"scroll"===t)}function R(e,t){for(var n=e,o=t||B(e),n=e.parentElement;n;)T(n,"x")&&P(n,"x")&&(o=I(o,n.getBoundingClientRect(),"x")),T(n,"y")&&P(n,"y")&&(o=I(o,n.getBoundingClientRect(),"y")),n=n.parentElement;return o}function A(e,t){return-1<e.className.split(" ").map(function(e){return e}).indexOf(t)}var I=function(e,t,n){return"x"===n?{left:Math.max(e.left,t.left),top:e.top,right:Math.min(e.right,t.right),bottom:e.bottom}:{left:e.left,top:Math.max(e.top,t.top),right:e.right,bottom:Math.min(e.bottom,t.bottom)}},B=function(e){var t,n=e.getBoundingClientRect(),n={left:n.left,right:n.right,top:n.top,bottom:n.bottom};return T(e,"x")&&!P(e,"x")&&(t=n.right-n.left,n.right=n.right+e.scrollWidth-t),T(e,"y")&&!P(e,"y")&&(t=n.bottom-n.top,n.bottom=n.bottom+e.scrollHeight-t),n},P=function(e,t){var n=window.getComputedStyle(e),e=n.overflow,t=n["overflow-".concat(t)];return"auto"===e||"scroll"===e||"hidden"===e||("auto"===t||"scroll"===t||"hidden"===t)},T=function(e,t){return"x"===t?e.scrollWidth>e.clientWidth:e.scrollHeight>e.clientHeight},z=function(t,n){var o=[];function e(){o&&(o.forEach(function(e){return e.removeEventListener("scroll",n)}),window.removeEventListener("scroll",n))}return function(){var e=t;for(;e;)(O(e,"x")||O(e,"y"))&&o.push(e),e=e.parentElement}(),{dispose:function(){e(),o=null},start:function(){o&&(o.forEach(function(e){return e.addEventListener("scroll",n)}),window.addEventListener("scroll",n))},stop:e}},N=function(e,t){for(var n=e;n;){if(n.matches(t))return n;n=n.parentElement}return null},L=function(e,t){var n;e&&e.className&&(-1===(n=e.className.split(" ").filter(function(e){return e})).indexOf(t)&&(n.unshift(t),e.className=n.join(" ")))},M=function(e,t){var n;e&&e.className&&(n=e.className.split(" ").filter(function(e){return e&&e!==t}),e.className=n.join(" "))},j=function(){window.getSelection?window.getSelection().empty?window.getSelection().empty():window.getSelection().removeAllRanges&&window.getSelection().removeAllRanges():window.document.selection&&window.document.selection.empty()},_=function(e){if(e){e=window.getComputedStyle(e);if(e)return e.cursor}return null};function F(e){return!(e.bottom<=e.top||e.right<=e.left)}function V(e){var l=e.element,s=e.draggables;return function(e,t){var n,o=e.removedIndex,r=e.addedIndex,i=e.droppedElement,a=null;null!==o&&(a=l.removeChild(l.children[o]),s.splice(o,1)),null!==r&&((n=window.document.createElement("div")).className="".concat(v),n.appendChild(a&&a.firstElementChild?a.firstElementChild:i),o=n,(a=r)>=(i=l).children.length?i.appendChild(o):i.insertBefore(o,i.children[a]),r>=s.length?s.push(n):s.splice(r,0,n)),t&&t(e)}}var X=Object.freeze({domDropHandler:V,reactDropHandler:function(){return{handler:function(){return function(e,t){t&&t(e)}}}}}),H={size:"offsetWidth",distanceToParent:"offsetLeft",translate:"transform",begin:"left",end:"right",dragPosition:"x",scrollSize:"scrollWidth",offsetSize:"offsetWidth",scrollValue:"scrollLeft",scale:"scaleX",setSize:"width",setters:{translate:function(e){return"translate3d(".concat(e,"px, 0, 0)")}}},Y={size:"offsetHeight",distanceToParent:"offsetTop",translate:"transform",begin:"top",end:"bottom",dragPosition:"y",scrollSize:"scrollHeight",offsetSize:"offsetHeight",scrollValue:"scrollTop",scale:"scaleY",setSize:"height",setters:{translate:function(e){return"translate3d(0,".concat(e,"px, 0)")}}};function k(o){return{get:function(e,t){return e[o[t]||t]},set:function(e,t,n){e[o[t]]=o.setters[t]?o.setters[t](n):n}}}function G(n,l){n[u]=0;var o=k("horizontal"===l?H:Y),s={translation:0};function e(){var e,t;r(n),t=(e=n).getBoundingClientRect(),s.scaleX=e.offsetWidth?(t.right-t.left)/e.offsetWidth:1,s.scaleY=e.offsetHeight?(t.bottom-t.top)/e.offsetHeight:1}function r(e){s.rect=B(e);e=R(e,s.rect);F(e)&&(s.lastVisibleRect=s.visibleRect),s.visibleRect=e}function i(e){var t=e;if(t.tagName){t=t.getBoundingClientRect();return"vertical"===l?t.bottom-t.top:t.right-t.left}return o.get(e,"size")*o.get(s,"scale")}function t(e){return o.get(e,"dragPosition")}return window.addEventListener("resize",function(){r(n)}),setTimeout(function(){e()},10),{getSize:i,getContainerRectangles:function(){return{rect:s.rect,visibleRect:s.visibleRect,lastVisibleRect:s.lastVisibleRect}},getBeginEndOfDOMRect:function(e){return{begin:o.get(e,"begin"),end:o.get(e,"end")}},getBeginEndOfContainer:function(){return{begin:o.get(s.rect,"begin")+s.translation,end:o.get(s.rect,"end")+s.translation}},getBeginEndOfContainerVisibleRect:function(){return{begin:o.get(s.visibleRect,"begin")+s.translation,end:o.get(s.visibleRect,"end")+s.translation}},getBeginEnd:function(e){var t=(t=e,(o.get(t,"distanceToParent")+(t[c]||0))*o.get(s,"scale")+(o.get(s.rect,"begin")+s.translation)-o.get(n,"scrollValue"));return{begin:t,end:t+i(e)*o.get(s,"scale")}},getAxisValue:t,setTranslation:function(e,t){t?o.set(e.style,"translate",t):e.style.removeProperty("transform"),e[c]=t},getTranslation:function(e){return e[c]},setVisibility:function(e,t){void 0!==e[a]&&e[a]===t||(t?e.style.removeProperty("visibility"):e.style.visibility="hidden",e[a]=t)},isVisible:function(e){return void 0===e[a]||e[a]},isInVisibleRect:function(e,t){var n=s.visibleRect,o=n.left,r=n.top,i=n.right,a=n.bottom;return a-r<2&&(a=r+30),n=s.rect,"vertical"===l?e>n.left&&e<n.right&&r<t&&t<a:o<e&&e<i&&t>n.top&&t<n.bottom},setSize:function(e,t){o.set(e,"setSize",t)},getTopLeftOfElementBegin:function(e){var t=0;return{top:"horizontal"===l?(t=e,s.rect.top):(t=s.rect.left,e),left:t}},getScrollSize:function(e){return o.get(e,"scrollSize")},getScrollValue:function(e){return o.get(e,"scrollValue")},setScrollValue:function(e,t){return o.set(e,"scrollValue",t)},invalidate:e,invalidateRects:function(){r(n)},getPosition:t,setBegin:function(e,t){o.set(e,"begin",t)}}}var W=1500;function q(e,t,n){var o,r,i=n.left,a=n.right,l=n.top,s=n.bottom,n=e.x,e=e.y;if(n<i||a<n||e<l||s<e)return null;s="x"===t?(o=i,r=a,n):(o=l,r=s,e),e=r-o,e=400<e?100:e/4;return r-s<e?{direction:"end",speedFactor:(e-(r-s))/e}:s-o<e?{direction:"begin",speedFactor:(e-(s-o))/e}:null}function U(e,t,n){e&&(e!==window?"x"===t?e.scrollLeft+=n:e.scrollTop+=n:"x"===t?e.scrollBy(n,0):e.scrollBy(0,n))}function $(o){var r=1<arguments.length&&void 0!==arguments[1]?arguments[1]:"y",i=null,a=null,l=null,s=null;return{animate:function(e,t){l=e,s=t,function n(){null===i&&(i=requestAnimationFrame(function(e){var t=e-(a=null===a?e:a);a=e;t=t/1e3*s;U(o,r,t="begin"===l?0-t:t),i=null,n()}))}()},stop:function(){null!==i&&(cancelAnimationFrame(i),i=null),a=null}}}function J(e){for(var t=[],n=e.element;n;){var o=D(n);if(o&&!A(n,m)){var r={};switch(o){case i.xy:r.x={animator:$(n,"x")},r.y={animator:$(n,"y")};break;case i.x:r.x={animator:$(n,"x")};break;case i.y:r.y={animator:$(n,"y")}}t.push({axisAnimations:r,getRect:function(e){return function(){return R(e,e.getBoundingClientRect())}}(n),scrollerElement:n})}n=n.parentElement}return t}function K(e){var r=1<arguments.length&&void 0!==arguments[1]?arguments[1]:W,i=e.reduce(function(e,t){t=J(t).filter(function(t){return!e.find(function(e){return e.scrollerElement===t.scrollerElement})});return[].concat(C(e),C(t))},[]);return function(e){var t,o,n=e.draggableInfo;e.reset?i.forEach(function(e){e.axisAnimations.x&&e.axisAnimations.x.animator.stop(),e.axisAnimations.y&&e.axisAnimations.y.animator.stop()}):n&&(o=n.mousePosition,i.forEach(function(e){var t=e.axisAnimations,n=(0,e.getRect)();t.x&&(t.x.scrollParams=q(o,"x",n),e.cachedRect=n),t.y&&(t.y.scrollParams=q(o,"y",n),e.cachedRect=n)}),i.forEach(function(e){var t,n=e.axisAnimations,o=n.x,e=n.y;o&&(o.scrollParams?(n=(t=o.scrollParams).direction,t=t.speedFactor,o.animator.animate(n,t*r)):o.animator.stop()),e&&(e.scrollParams?(o=(t=e.scrollParams).direction,t=t.speedFactor,e.animator.animate(o,t*r)):e.animator.stop())}),(e=i.filter(function(e){return e.cachedRect})).length&&1<e.length&&((t=function(e,t){for(var n=document.elementFromPoint(t.x,t.y);n;){var o=e.find(function(e){return e.scrollerElement===n});if(o)return o;n=n.parentElement}return null}(e,n.mousePosition))&&e.forEach(function(e){e!==t&&(e.axisAnimations.x&&e.axisAnimations.x.animator.stop(),e.axisAnimations.y&&e.axisAnimations.y.animator.stop())})))}}var Q;"undefined"!=typeof window&&((Q=Element)&&Q.prototype&&!Q.prototype.matches&&(Q.prototype.matches=Q.prototype.matchesSelector||Q.prototype.mozMatchesSelector||Q.prototype.msMatchesSelector||Q.prototype.oMatchesSelector||Q.prototype.webkitMatchesSelector||function(e){for(var t=(this.document||this.ownerDocument).querySelectorAll(e),n=t.length;0<=--n&&t.item(n)!==this;);return-1<n}),(Q=Node||Element)&&Q.prototype&&null==Q.prototype.firstElementChild&&Object.defineProperty(Q.prototype,"firstElementChild",{get:function(){for(var e,t=this.childNodes,n=0;e=t[n++];)if(1===e.nodeType)return e;return null}}),Array.prototype.some||(Array.prototype.some=function(e){if(null==this)throw new TypeError("Array.prototype.some called on null or undefined");if("function"!=typeof e)throw new TypeError;for(var t=Object(this),n=t.length>>>0,o=2<=arguments.length?arguments[1]:void 0,r=0;r<n;r++)if(r in t&&e.call(o,t[r],r,t))return!0;return!1}));var Z={overflow:"hidden",display:"block"},ee={height:"100%",display:"table-cell","vertical-align":"top"},te=(n(Nt={},".".concat(y),{position:"relative","min-height":"30px","min-width":"30px"}),n(Nt,".".concat(y,".horizontal"),{display:"table"}),n(Nt,".".concat(y,".horizontal > .").concat(d),{display:"inline-block"}),n(Nt,".".concat(y,".horizontal > .").concat(v),ee),n(Nt,".".concat(y,".vertical > .").concat(v),Z),n(Nt,".".concat(v),{"box-sizing":"border-box"}),n(Nt,".".concat(v,".horizontal"),ee),n(Nt,".".concat(v,".vertical"),Z),n(Nt,".".concat(v,".animated"),{transition:"transform ease"}),n(Nt,".".concat(f),{"box-sizing":"border-box"}),n(Nt,".".concat(f,".animated"),{transition:"all ease-in-out"}),n(Nt,".".concat(f," *"),{"pointer-events":"none"}),n(Nt,".".concat(l," *"),{"touch-action":"none","-ms-touch-action":"none"}),n(Nt,".".concat(s),{"-webkit-touch-callout":"none","-webkit-user-select":"none","-khtml-user-select":"none","-moz-user-select":"none","-ms-user-select":"none","user-select":"none"}),n(Nt,".".concat(h),{flex:"1"}),n(Nt,".".concat(y,".horizontal > .").concat(b),{height:"100%",overflow:"hidden",display:"table-cell","vertical-align":"top"}),n(Nt,".".concat(y,".vertical > .").concat(b),{overflow:"hidden",display:"block",width:"100%"}),n(Nt,".".concat(w),{width:"100%",height:"100%",display:"flex","justify-content":"stretch","align-items":"stretch"}),n(Nt,".".concat(p),{"background-color":"rgba(150, 150, 150, 0.1)",border:"1px solid #ccc"}),Nt);function ne(o){return Object.keys(o).reduce(function(e,t){var n=o[t];return"object"===E(n)?"".concat(e).concat(t,"{").concat(ne(n),"}"):"".concat(e).concat(t,":").concat(n,";")},"")}function oe(e){if(e&&"undefined"!=typeof window){var t=window.document.head||window.document.getElementsByTagName("head")[0],n=window.document.createElement("style"),e=ne({"body *":{cursor:"".concat(e," !important")}});return n.type="text/css",n.styleSheet?n.styleSheet.cssText=e:n.appendChild(window.document.createTextNode(e)),t.appendChild(n),n}return null}var re,ie,ae=["mousedown","touchstart"],le=["mousemove","touchmove"],se=["mouseup","touchend"],ce=null,ue=null,de=null,fe=null,ge=[],me=!1,pe=!1,he=!1,ve=!1,ye=null,be=null,we=null,xe=null,Ee=(re=null,ie=!1,{start:function(){ie||(ie=!0,function e(){re=requestAnimationFrame(function(){ce.forEach(function(e){return e.layout.invalidateRects()}),setTimeout(function(){null!==re&&e()},50)})}())},stop:function(){null!==re&&(cancelAnimationFrame(re),re=null),ie=!1}}),Ce="undefined"!=typeof window&&!!(window.navigator.userAgent.match(/Android/i)||window.navigator.userAgent.match(/webOS/i)||window.navigator.userAgent.match(/iPhone/i)||window.navigator.userAgent.match(/iPad/i)||window.navigator.userAgent.match(/iPod/i)||window.navigator.userAgent.match(/BlackBerry/i)||window.navigator.userAgent.match(/Windows Phone/i));function Se(){"undefined"!=typeof window&&ae.forEach(function(e){window.document.addEventListener(e,Ve,{passive:!1})})}function De(){return fe&&fe.ghostParent?fe.ghostParent:ue&&ue.parentElement||window.document.body}function Oe(e,t,n,o){var r=t.x,i=t.y,a=e.getBoundingClientRect(),l=a.left,s=a.top,c=a.right,u=a.bottom,t=(t=n.layout.getContainerRectangles().visibleRect,a=a,{left:Math.max(t.left,a.left),top:Math.max(t.top,a.top),right:Math.min(t.right,a.right),bottom:Math.min(t.bottom,a.bottom)}),a=t.left+(t.right-t.left)/2,t=t.top+(t.bottom-t.top)/2,d=e.cloneNode(!0);return d.style.zIndex="1000",d.style.boxSizing="border-box",d.style.position="fixed",d.style.top="0px",d.style.left="0px",d.style.transform=null,d.style.removeProperty("transform"),n.shouldUseTransformForGhost()?d.style.transform="translate3d(".concat(l,"px, ").concat(s,"px, 0)"):(d.style.top="".concat(s,"px"),d.style.left="".concat(l,"px")),d.style.width=c-l+"px",d.style.height=u-s+"px",d.style.overflow="visible",d.style.transition=null,d.style.removeProperty("transition"),d.style.pointerEvents="none",d.style.userSelect="none",n.getOptions().dragClass?setTimeout(function(){L(d.firstElementChild,n.getOptions().dragClass);var e=window.getComputedStyle(d.firstElementChild).cursor;xe=oe(e)}):xe=oe(o),L(d,n.getOptions().orientation||"vertical"),L(d,f),{ghost:d,centerDelta:{x:a-r,y:t-i},positionDelta:{left:l-r,top:s-i},topLeft:{x:l,y:s}}}function Re(e){function r(){M(de.ghost,"animated"),de.ghost.style.transitionDuration=null,De().removeChild(de.ghost),e()}function t(e,t,n){var o=e.top,e=e.left;L(de.ghost,"animated"),n&&L(de.ghost.firstElementChild,n),de.topLeft.x=e,de.topLeft.y=o,it(t),setTimeout(function(){r()},t+20)}function n(e,t){L(de.ghost,"animated"),it(e,.9,!0),setTimeout(function(){t()},e+20)}var o,i,a,l,s,c;fe.targetElement?(o=ge.filter(function(e){return e.element===fe.targetElement})[0],!(c=o.getOptions()).shouldAnimateDrop||c.shouldAnimateDrop(fe.container.getOptions(),fe.payload)?t(o.getDragResult().shadowBeginEnd.rect,Math.max(150,o.getOptions().animationDuration/2),o.getOptions().dropClass):r()):(i=ge.filter(function(e){return e===fe.container})[0])?(l=(a=i.getOptions()).behaviour,s=a.removeOnDropOut,"move"!==l&&"contain"!==l||!pe&&s||!i.getDragResult()?n(i.getOptions().animationDuration,r):!F((a=i.layout.getContainerRectangles()).visibleRect)&&F(a.lastVisibleRect)?t({top:a.lastVisibleRect.top,left:a.lastVisibleRect.left},i.getOptions().animationDuration,i.getOptions().dropClass):(s=(l=i.getDragResult()).removedIndex,a=l.elementSize,l=i.layout,i.getTranslateCalculator({dragResult:{removedIndex:s,addedIndex:s,elementSize:a,pos:void 0,shadowBeginEnd:void 0}}),s=0<s?l.getBeginEnd(i.draggables[s-1]).end:l.getBeginEndOfContainer().begin,t(l.getTopLeftOfElementBegin(s),i.getOptions().animationDuration,i.getOptions().dropClass))):n(x.animationDuration,r)}var Ae,Ie,Be,Pe,Te,ze,Ne=(Te=1,ze=5,function(e,t,n){Ae=$e(e),Be=n,(Ie="number"==typeof t?t:Ce?200:0)&&(Pe=setTimeout(Fe,Ie)),le.forEach(function(e){return window.document.addEventListener(e,Le)},{passive:!1}),se.forEach(function(e){return window.document.addEventListener(e,Me)},{passive:!1}),window.document.addEventListener("drag",je,{passive:!1})});function Le(e){var t=$e(e),e=t.clientX,t=t.clientY;if(Ie)(Math.abs(Ae.clientX-e)>ze||Math.abs(Ae.clientY-t)>ze)&&_e();else if(Math.abs(Ae.clientX-e)>Te||Math.abs(Ae.clientY-t)>Te)return Fe()}function Me(){_e()}function je(){_e()}function _e(){clearTimeout(Pe),le.forEach(function(e){return window.document.removeEventListener(e,Le)},{passive:!1}),se.forEach(function(e){return window.document.removeEventListener(e,Me)},{passive:!1}),window.document.removeEventListener("drag",je,{passive:!1})}function Fe(){clearTimeout(Pe),_e(),Be()}function Ve(e){var t,n,o,r,i,a=$e(e);me||void 0!==a.button&&0!==a.button||(ue=N(a.target,"."+v))&&(t=N(ue,"."+y),(n=ge.filter(function(e){return e.element===t})[0])&&(o=n.getOptions().dragHandleSelector,i=n.getOptions().nonDragAreaSelector,r=!0,o&&!N(a.target,o)&&(r=!1),(r=i&&N(a.target,i)?!1:r)&&(n.layout.invalidate(),L(window.document.body,l),L(window.document.body,s),i=function e(){M(window.document.body,l),M(window.document.body,s),window.document.removeEventListener("mouseup",e)},window.document.addEventListener("mouseup",i)),r&&Ne(a,n.getOptions().dragBeginDelay,function(){j(),et(a,_(e.target)),le.forEach(function(e){window.document.addEventListener(e,Xe,{passive:!1})}),se.forEach(function(e){window.document.addEventListener(e,Ue,{passive:!1})})})))}function Xe(e){e.preventDefault();var t,n=$e(e);fe?("contain"===(t=fe.container.getOptions()).behaviour?function(e,t){var n,o,r=e.clientX,i=e.clientY,e=1<arguments.length&&void 0!==t?t:"vertical",t=fe.container.layout.getBeginEndOfContainerVisibleRect(),e="vertical"===e?(n=i,o="y",a="top",fe.size.offsetHeight):(n=r,o="x",a="left",fe.size.offsetWidth),i=t.begin,r=t.end-e,a=Math.max(i,Math.min(r,n+de.positionDelta[a]));de.topLeft[o]=a,fe.position[o]=Math.max(t.begin,Math.min(t.end,n+de.centerDelta[o])),fe.mousePosition[o]=Math.max(t.begin,Math.min(t.end,n)),fe.position[o]<t.begin+e/2&&(fe.position[o]=t.begin+2),fe.position[o]>t.end-e/2&&(fe.position[o]=t.end-2)}(n,t.orientation):we?"y"===we?(de.topLeft.y=n.clientY+de.positionDelta.top,fe.position.y=n.clientY+de.centerDelta.y,fe.mousePosition.y=n.clientY):"x"===we&&(de.topLeft.x=n.clientX+de.positionDelta.left,fe.position.x=n.clientX+de.centerDelta.x,fe.mousePosition.x=n.clientX):(de.topLeft.x=n.clientX+de.positionDelta.left,de.topLeft.y=n.clientY+de.positionDelta.top,fe.position.x=n.clientX+de.centerDelta.x,fe.position.y=n.clientY+de.centerDelta.y,fe.mousePosition.x=n.clientX,fe.mousePosition.y=n.clientY),it(),(ve=!ye(fe))&&We()):et(n,_(e.target))}var He,Ye,ke,Ge,We=(He=qe,ke=!(Ye=20),function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];Ge&&clearTimeout(Ge),ke&&!Ge?He.call.apply(He,[null].concat(t)):Ge=setTimeout(function(){Ge=null,He.call.apply(He,[null].concat(t))},Ye)});function qe(){ve&&(ve=!1,Je(fe,ce))}function Ue(){var e;le.forEach(function(e){window.document.removeEventListener(e,Xe,{passive:!1})}),se.forEach(function(e){window.document.removeEventListener(e,Ue,{passive:!1})}),be({reset:!0}),xe&&((e=xe)&&"undefined"!=typeof window&&(window.document.head||window.document.getElementsByTagName("head")[0]).removeChild(e),xe=null),fe&&(Ee.stop(),qe(),he=!0,Re(function(){Ze(me=!1);for(var e=ce||[],t=e.shift();void 0!==t;)t.handleDrop(fe),t=e.shift();ye=we=fe=de=ue=ce=null,he=!1}))}function $e(e){return e.touches?e.touches[0]:e}function Je(t,e){var n=!1;e.forEach(function(e){e=e.handleDrag(t);n=!!e.containerBoxChanged||!1,e.containerBoxChanged=!1}),n&&(n=!1,requestAnimationFrame(function(){ge.forEach(function(e){e.layout.invalidateRects(),e.onTranslated()})}))}function Ke(e){var t=e,n=null;return function(e){return!(null!==n||!me||he)&&(n=requestAnimationFrame(function(){me&&!he&&(Je(e,t),be({draggableInfo:e})),n=null}),!0)}}function Qe(e,t){return e.getOptions().autoScrollEnabled?K(t,e.getScrollMaxSpeed()):function(e){return null}}function Ze(o){ge.forEach(function(e){var t,n=o?e.getOptions().onDragStart:e.getOptions().onDragEnd;n&&(t={isSource:e===fe.container,payload:fe.payload},e.isDragRelevant(fe.container,fe.payload)?t.willAcceptDrop=!0:t.willAcceptDrop=!1,n(t))})}function et(e,t){var n,o,r,i,a,l;null!==ue&&(me=!0,(n=ge.filter(function(e){return ue.parentElement===e.element})[0]).setDraggables(),we=n.getOptions().lockAxis?n.getOptions().lockAxis.toLowerCase():null,o=ue,r=ge.filter(function(e){return o.parentElement===e.element})[0],i=r.draggables.indexOf(o),a=r.getOptions().getGhostParent,l=o.getBoundingClientRect(),fe={container:r,element:o,size:{offsetHeight:l.bottom-l.top,offsetWidth:l.right-l.left},elementIndex:i,payload:r.getOptions().getChildPayload?r.getOptions().getChildPayload(i):void 0,targetElement:null,position:{x:0,y:0},groupName:r.getOptions().groupName,ghostParent:a?a():null,invalidateShadow:null,mousePosition:null,relevantContainers:null},de=Oe(ue,{x:e.clientX,y:e.clientY},fe.container,t),fe.position={x:e.clientX+de.centerDelta.x,y:e.clientY+de.centerDelta.y},fe.mousePosition={x:e.clientX,y:e.clientY},ce=ge.filter(function(e){return e.isDragRelevant(n,fe.payload)}),fe.relevantContainers=ce,ye=Ke(ce),be&&be({reset:!0,draggableInfo:void 0}),be=Qe(n,ce),ce.forEach(function(e){return e.prepareDrag(e,ce)}),Ze(!0),ye(fe),De().appendChild(de.ghost),Ee.start())}var tt,nt,ot,rt=Ge=Pe=null;function it(e,t,n){var e=0<arguments.length&&void 0!==e?e:0,t=1<arguments.length&&void 0!==t?t:1,o=2<arguments.length&&void 0!==n&&n,n=de,r=n.ghost,n=n.topLeft,i=n.x,a=n.y,l=!fe.container||fe.container.shouldUseTransformForGhost(),s=l?"translate3d(".concat(i,"px,").concat(a,"px, 0)"):null;if(1!==t&&(s=(s?"".concat(s," scale("):"scale(").concat(t,")")),0<e)return de.ghost.style.transitionDuration=e+"ms",void requestAnimationFrame(function(){s&&(r.style.transform=s),l||(r.style.left=i+"px",r.style.top=a+"px"),rt=null,o&&(r.style.opacity="0")});null===rt&&(rt=requestAnimationFrame(function(){s&&(r.style.transform=s),l||(r.style.left=i+"px",r.style.top=a+"px"),rt=null,o&&(r.style.opacity="0")}))}function at(){var t;!me||pe||he||(ve=!(pe=!0),t=Object.assign({},fe,{targetElement:null,position:{x:Number.MAX_SAFE_INTEGER,y:Number.MAX_SAFE_INTEGER},mousePosition:{x:Number.MAX_SAFE_INTEGER,y:Number.MAX_SAFE_INTEGER}}),ce.forEach(function(e){e.handleDrag(t)}),fe.targetElement=null,fe.cancelDrop=!0,Ue(),pe=!1)}"undefined"!=typeof window&&"undefined"!=typeof window&&(tt=window.document.head||window.document.getElementsByTagName("head")[0],(nt=window.document.createElement("style")).id="smooth-dnd-style-definitions",ot=ne(te),nt.type="text/css",nt.styleSheet?nt.styleSheet.cssText=ot:nt.appendChild(window.document.createTextNode(ot)),tt.appendChild(nt));var lt=(Se(),{register:function(e){e=e,ge.push(e),me&&fe&&e.isDragRelevant(fe.container,fe.payload)&&(ce.push(e),e.prepareDrag(e,ce),be&&be({reset:!0,draggableInfo:void 0}),be=Qe(e,ce),ye=Ke(ce),e.handleDrag(fe))},unregister:function(e){var t;t=e,ge.splice(ge.indexOf(t),1),me&&fe&&(fe.container===t&&t.fireRemoveElement(),fe.targetElement===t.element&&(fe.targetElement=null),-1<(e=ce.indexOf(t))&&(ce.splice(e,1),be&&be({reset:!0,draggableInfo:void 0}),be=Qe(t,ce),ye=Ke(ce)))},isDragging:function(){return me},cancelDrag:at});function st(e,t,n){n=2<arguments.length&&void 0!==n?n:x.animationDuration;t?(L(e,o),e.style.transitionDuration=n+"ms"):(M(e,o),e.style.removeProperty("transition-duration"))}function ct(n){var o=[];return Array.prototype.forEach.call(n.children,function(e){var t;e.nodeType===Node.ELEMENT_NODE?((t=!A(t=e,v)?function(e){if(Tt.wrapChild){var t=window.document.createElement("div");return t.className="".concat(v),e.parentElement.insertBefore(t,e),t.appendChild(e),t}return e}(e):t)[c]=0,o.push(t)):n.removeChild(e)}),o}function ut(e){function s(e,t,n,o){var r=4<arguments.length&&void 0!==arguments[4]&&arguments[4];if(o<n)return n;if(n!==o)return i=Math.floor((o+n)/2),l=c.getBeginEnd(e[i]),a=l.begin,l=l.end,t<a?s(e,t,n,i-1,r):l<t?s(e,t,i+1,o,r):!r||t<(l+a)/2?i:i+1;var i=c.getBeginEnd(e[n]),a=i.begin,l=i.end;return!r||t<(l+a)/2?n:n+1}var c=e.layout;return function(e,t){return s(e,t,0,e.length-1,2<arguments.length&&void 0!==arguments[2]&&arguments[2])}}function dt(e){var t,n,o,r=e.element,i=e.draggables,a=e.layout,l=e.getOptions,s=(t=(e={element:r,draggables:i,layout:a,getOptions:l}).element,n=e.draggables,o=e.layout,function(){n.forEach(function(e){st(e,!1),o.setTranslation(e,0),o.setVisibility(e,!0)}),t[g]&&(t[g].parentNode.removeChild(t[g]),t[g]=null)}),c=(Tt.dropHandler||V)({element:r,draggables:i,layout:a,getOptions:l});return function(e,t){var n=t.addedIndex,o=t.removedIndex,t=2<arguments.length&&void 0!==arguments[2]&&arguments[2];s(),e.cancelDrop||(e.targetElement||l().removeOnDropOut||t)&&(e={removedIndex:o,addedIndex:null!==n?null!==o&&o<n?n-1:n:null,payload:e.payload},c(e,l().onDrop))}}function ft(e){var n=e.element,o=e.getOptions,r=null;return function(e){var t=e.draggableInfo,e=r;return{removedIndex:e=null==r&&t.container.element===n&&"copy"!==o().behaviour?r=t.elementIndex:e}}}function gt(e){var t=e.draggables,n=e.layout;return function(e){e=e.dragResult;null!==e.removedIndex&&n.setVisibility(t[e.removedIndex],!1)}}function mt(e){var n=e.element,o=e.layout;return function(e){var t=e.draggableInfo,e=document.elementFromPoint(t.position.x,t.position.y);if(e){e=function(e,n){for(var o=e;o;){if(o[r]){var t=function(){var t=o[r];if(n.some(function(e){return e===t}))return{v:t}}();if("object"===E(t))return t.v}o=o.parentElement}return null}(e,t.relevantContainers);if(e&&e.element===n)return{pos:o.getPosition(t.position)}}return{pos:null}}}function pt(e){var n=e.layout,o=null;return function(e){var t=e.draggableInfo;return null===e.dragResult.pos?o=null:{elementSize:o=o||n.getSize(t.size)}}}function ht(e){var n=e.element;return function(e){var t=e.draggableInfo,e=e.dragResult;!function(e,t,n){t&&(!(2<arguments.length&&void 0!==n)||n)?e.targetElement=t:e.targetElement===t&&(e.targetElement=null)}(t,n,!!e.pos)}}function vt(){return function(e){return null!==e.dragResult.pos?{addedIndex:0}:{addedIndex:null}}}function yt(e){var n=e.layout,o=null;return function(e){var t=e.dragResult.addedIndex;if(t===o)return null;o=t;e=n.getBeginEndOfContainer(),t=e.begin,e.end;return{shadowBeginEnd:{rect:n.getTopLeftOfElementBegin(t)}}}}function bt(e){var c=e.layout,u=e.element,d=e.getOptions,f=null;return function(e){var t=e.dragResult,n=t.elementSize,o=t.shadowBeginEnd,r=t.addedIndex,i=t.dropPlaceholderContainer,a=d();if(a.dropPlaceholder){var l="boolean"==typeof a.dropPlaceholder?{}:a.dropPlaceholder,s=l.animationDuration,e=l.className,t=l.showOnTop;return null===r?(i&&null!==f&&u.removeChild(i),f=null,{dropPlaceholderContainer:void 0}):(i||(a=document.createElement("div"),(l=document.createElement("div")).className=w,a.className="".concat(h," ").concat(e||p),(i=document.createElement("div")).className="".concat(b),i.style.position="absolute",void 0!==s&&(i.style.transition="all ".concat(s,"ms ease")),i.appendChild(l),l.appendChild(a),c.setSize(i.style,n+"px"),i.style.pointerEvents="none",t?u.appendChild(i):u.insertBefore(i,u.firstElementChild)),f!==r&&o.dropArea&&c.setBegin(i.style,o.dropArea.begin-c.getBeginEndOfContainer().begin+"px"),f=r,{dropPlaceholderContainer:i})}return null}}function wt(e){var n=Dt(e);return function(e){var t=e.draggableInfo,e=e.dragResult;return t.invalidateShadow?n({draggableInfo:t,dragResult:e}):null}}function xt(e){var n,o,r=(n=e.draggables,o=ut({layout:e.layout}),function(e){var t=e.dragResult,e=t.shadowBeginEnd,t=t.pos;if(e)return e.begin+e.beginAdjustment<=t&&e.end>=t?null:t<e.begin+e.beginAdjustment?o(n,t):t>e.end?o(n,t)+1:n.length;t=o(n,t,!0);return null!==t?t:n.length});return function(e){var t=e.dragResult,e=null;return{addedIndex:e=null!==t.pos&&null===(e=r({dragResult:t}))?t.addedIndex:e}}}function Et(){var n=null;return function(e){var t=e.dragResult,e=t.addedIndex,t=t.shadowBeginEnd;e!==n&&null!==n&&t&&(t.beginAdjustment=0),n=e}}function Ct(e){var r=e.element,i=e.draggables,a=e.layout,l=e.getOptions,s=null;return function(e){var t=e.dragResult,n=t.addedIndex,e=t.removedIndex,t=t.elementSize;if(null===e)if(null!==n){if(!s){e=a.getBeginEndOfContainer();e.end=e.begin+a.getSize(r);n=a.getScrollSize(r)>a.getSize(r)?e.begin+a.getScrollSize(r)-a.getScrollValue(r):e.end,e=0<i.length?a.getBeginEnd(i[i.length-1]).end-i[i.length-1][c]:e.begin;if(n<e+t){(s=window.document.createElement("div")).className=d+" "+l().orientation;var o=0<i.length?t+e-n:t;return a.setSize(s.style,"".concat(o,"px")),r.appendChild(s),r[g]=s,{containerBoxChanged:!0}}}}else if(s){a.setTranslation(s,0);o=s;return s=null,r.removeChild(o),{containerBoxChanged:!(r[g]=null)}}}}function St(e){var l=e.draggables,s=e.layout,c=null,u=null;return function(e){var e=e.dragResult,t=e.addedIndex,n=e.removedIndex,o=e.elementSize;if(t!==c||n!==u){for(var r,i,a=0;a<l.length;a++)a!==n&&(r=l[a],i=0,null!==n&&n<a&&(i-=o),null!==t&&t<=a&&(i+=o),s.setTranslation(r,i));return{addedIndex:c=t,removedIndex:u=n}}}}function Dt(e){var d=e.draggables,f=e.layout,g=null;return function(e){var t=e.draggableInfo,n=e.dragResult,o=n.addedIndex,r=n.removedIndex,i=n.elementSize,a=n.pos,l=n.shadowBeginEnd;if(null===a)return{shadowBeginEnd:g=null};if(null===o||!t.invalidateShadow&&o===g)return null;var s=o-1,c=Number.MIN_SAFE_INTEGER,e=0,n=0,a=null,t=null;s===r&&s--;var e=-1<s?(u=f.getSize(d[s]),t=f.getBeginEnd(d[s]),c=i<u?t.end-(u-i)/2:t.end,t.end):(t={end:f.getBeginEndOfContainer().begin},f.getBeginEndOfContainer().begin),s=Number.MAX_SAFE_INTEGER,u=o;u===r&&u++;n=u<d.length?(r=f.getSize(d[u]),a=f.getBeginEnd(d[u]),s=i<r?a.begin+(r-i)/2:a.begin,a.begin):(a={begin:f.getContainerRectangles().rect.end},f.getContainerRectangles().rect.end-f.getContainerRectangles().rect.begin),t=t&&a?f.getTopLeftOfElementBegin(t.end):null;return g=o,{shadowBeginEnd:{dropArea:{begin:e,end:n},begin:c,end:s,rect:t,beginAdjustment:l?l.beginAdjustment:0}}}}function Ot(){var o=null;return function(e){var t=e.dragResult,n=t.pos,e=t.addedIndex,t=t.shadowBeginEnd;null!==n?null!=e&&null===o&&(n<t.begin&&(n=n-t.begin-5,t.beginAdjustment=n),o=e):o=null}}function Rt(e){var e=e.getOptions,t=!1,n=e();return function(e){e=!!e.dragResult.pos;e!==t&&((t=e)?n.onDragEnter&&n.onDragEnter():n.onDragLeave&&n.onDragLeave())}}function At(e){var e=e.getOptions,i=null,a=e();return function(e){var t=e.dragResult,n=t.addedIndex,o=t.removedIndex,r=e.draggableInfo,t=r.payload,e=r.element;a.onDropReady&&null!==n&&i!==n&&(r=i=n,null!==o&&o<n&&r--,a.onDropReady({addedIndex:r,removedIndex:o,payload:t,element:e?e.firstElementChild:void 0}))}}function It(e){return"drop-zone"===e.getOptions().behaviour?Bt(e)(ft,gt,mt,pt,ht,vt,yt,Rt,At):Bt(e)(ft,gt,mt,pt,ht,wt,xt,Et,Ct,St,Dt,bt,Ot,Rt,At)}function Bt(i){return function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];var o=t.map(function(e){return e(i)}),r=null;return function(n){return r=o.reduce(function(e,t){return Object.assign(e,t({draggableInfo:n,dragResult:e}))},r||{addedIndex:null,removedIndex:null,elementSize:null,pos:null,shadowBeginEnd:null})}}}function Pt(h){return function(e){var t,n,o,r,i,a=Object.assign({},x,e),l=null,s=null,c=(n=p,o=ct(t=h),e=n(),L(t,"".concat(y," ").concat(e.orientation)),{element:t,draggables:o,getOptions:n,layout:G(t,e.orientation,e.animationDuration)}),u=It(c),d=dt(c),f=z(h,function(){c.layout.invalidateRects(),g()});function g(){null!==s&&(s.invalidateShadow=!0,l=u(s),s.invalidateShadow=!1)}function m(e,t){for(var n=ct(t),o=0;o<n.length;o++)e[o]=n[o];for(var r=0;r<e.length-n.length;r++)e.pop()}function p(){return a}return{element:h,draggables:c.draggables,isDragRelevant:(r=(e=c).element,i=e.getOptions,function(e,t){var n=i();if(n.shouldAcceptDrop)return n.shouldAcceptDrop(e.getOptions(),t);t=e.getOptions();return"copy"!==n.behaviour&&(N(r,"."+v)!==e.element&&(e.element===r||!(!t.groupName||t.groupName!==n.groupName)))}),layout:c.layout,dispose:function(e){var t;f.dispose(),t=e.element,Tt.wrapChild&&Array.prototype.forEach.call(t.children,function(e){e.nodeType===Node.ELEMENT_NODE&&A(e,v)&&(t.insertBefore(e.firstElementChild,e),t.removeChild(e))})},prepareDrag:function(e,t){var n=e.element,o=c.draggables;m(o,n),e.layout.invalidateRects(),o.forEach(function(e){return st(e,!0,a.animationDuration)}),f.start()},handleDrag:function(e){return l=u(s=e)},handleDrop:function(e){f.stop(),l&&l.dropPlaceholderContainer&&h.removeChild(l.dropPlaceholderContainer),s=null,u=It(c),d(e,l),l=null},fireRemoveElement:function(){d(s,Object.assign({},l,{addedIndex:null}),!0),l=null},getDragResult:function(){return l},getTranslateCalculator:function(e){return St(c)(e)},onTranslated:function(){g()},setDraggables:function(){m(c.draggables,h)},getScrollMaxSpeed:function(){return Tt.maxScrollSpeed},shouldUseTransformForGhost:function(){return!0===Tt.useTransformForGhost},getOptions:p,setOptions:function(e){a=!1===(!(1<arguments.length&&void 0!==arguments[1])||arguments[1])?Object.assign({},x,e):Object.assign({},x,a,e)}}}}var Tt=function(e,t){var n=Pt(e)(t);return e[r]=n,lt.register(n),{dispose:function(){lt.unregister(n),n.dispose(n)},setOptions:function(e,t){n.setOptions(e,t)}}};function zt(e,t,n){Object.defineProperty(e,n,{set:function(e){t[n]=e},get:function(){return t[n]}})}Tt.wrapChild=!0,Tt.cancelDrag=function(){lt.cancelDrag()},Tt.isDragging=function(){return lt.isDragging()};var Nt=function(e,t){return console.warn('default export is deprecated. please use named export "smoothDnD"'),Tt(e,t)};Nt.cancelDrag=function(){Tt.cancelDrag()},Nt.isDragging=function(){return Tt.isDragging()},zt(Nt,Tt,"useTransformForGhost"),zt(Nt,Tt,"maxScrollSpeed"),zt(Nt,Tt,"wrapChild"),zt(Nt,Tt,"dropHandler"),e.smoothDnD=Tt,e.constants=t,e.dropHandlers=X,e.default=Nt,Object.defineProperty(e,"__esModule",{value:!0})});
