/*! For license information please see 6.b970cd14.chunk.js.LICENSE.txt */
(this.webpackJsonpcoinica=this.webpackJsonpcoinica||[]).push([[6],{1041:function(e,t,n){"use strict";(function(e){var n="undefined"!==typeof window&&"undefined"!==typeof document&&"undefined"!==typeof navigator,r=function(){for(var e=["Edge","Trident","Firefox"],t=0;t<e.length;t+=1)if(n&&navigator.userAgent.indexOf(e[t])>=0)return 1;return 0}();var o=n&&window.Promise?function(e){var t=!1;return function(){t||(t=!0,window.Promise.resolve().then((function(){t=!1,e()})))}}:function(e){var t=!1;return function(){t||(t=!0,setTimeout((function(){t=!1,e()}),r))}};function i(e){return e&&"[object Function]"==={}.toString.call(e)}function a(e,t){if(1!==e.nodeType)return[];var n=e.ownerDocument.defaultView.getComputedStyle(e,null);return t?n[t]:n}function f(e){return"HTML"===e.nodeName?e:e.parentNode||e.host}function s(e){if(!e)return document.body;switch(e.nodeName){case"HTML":case"BODY":return e.ownerDocument.body;case"#document":return e.body}var t=a(e),n=t.overflow,r=t.overflowX,o=t.overflowY;return/(auto|scroll|overlay)/.test(n+o+r)?e:s(f(e))}function u(e){return e&&e.referenceNode?e.referenceNode:e}var c=n&&!(!window.MSInputMethodContext||!document.documentMode),p=n&&/MSIE 10/.test(navigator.userAgent);function l(e){return 11===e?c:10===e?p:c||p}function d(e){if(!e)return document.documentElement;for(var t=l(10)?document.body:null,n=e.offsetParent||null;n===t&&e.nextElementSibling;)n=(e=e.nextElementSibling).offsetParent;var r=n&&n.nodeName;return r&&"BODY"!==r&&"HTML"!==r?-1!==["TH","TD","TABLE"].indexOf(n.nodeName)&&"static"===a(n,"position")?d(n):n:e?e.ownerDocument.documentElement:document.documentElement}function h(e){return null!==e.parentNode?h(e.parentNode):e}function m(e,t){if(!e||!e.nodeType||!t||!t.nodeType)return document.documentElement;var n=e.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_FOLLOWING,r=n?e:t,o=n?t:e,i=document.createRange();i.setStart(r,0),i.setEnd(o,0);var a=i.commonAncestorContainer;if(e!==a&&t!==a||r.contains(o))return function(e){var t=e.nodeName;return"BODY"!==t&&("HTML"===t||d(e.firstElementChild)===e)}(a)?a:d(a);var f=h(e);return f.host?m(f.host,t):m(e,h(t).host)}function v(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"top",n="top"===t?"scrollTop":"scrollLeft",r=e.nodeName;if("BODY"===r||"HTML"===r){var o=e.ownerDocument.documentElement,i=e.ownerDocument.scrollingElement||o;return i[n]}return e[n]}function g(e,t){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],r=v(t,"top"),o=v(t,"left"),i=n?-1:1;return e.top+=r*i,e.bottom+=r*i,e.left+=o*i,e.right+=o*i,e}function b(e,t){var n="x"===t?"Left":"Top",r="Left"===n?"Right":"Bottom";return parseFloat(e["border"+n+"Width"])+parseFloat(e["border"+r+"Width"])}function w(e,t,n,r){return Math.max(t["offset"+e],t["scroll"+e],n["client"+e],n["offset"+e],n["scroll"+e],l(10)?parseInt(n["offset"+e])+parseInt(r["margin"+("Height"===e?"Top":"Left")])+parseInt(r["margin"+("Height"===e?"Bottom":"Right")]):0)}function y(e){var t=e.body,n=e.documentElement,r=l(10)&&getComputedStyle(n);return{height:w("Height",t,n,r),width:w("Width",t,n,r)}}var E=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},O=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),x=function(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e},L=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e};function M(e){return L({},e,{right:e.left+e.width,bottom:e.top+e.height})}function T(e){var t={};try{if(l(10)){t=e.getBoundingClientRect();var n=v(e,"top"),r=v(e,"left");t.top+=n,t.left+=r,t.bottom+=n,t.right+=r}else t=e.getBoundingClientRect()}catch(d){}var o={left:t.left,top:t.top,width:t.right-t.left,height:t.bottom-t.top},i="HTML"===e.nodeName?y(e.ownerDocument):{},f=i.width||e.clientWidth||o.width,s=i.height||e.clientHeight||o.height,u=e.offsetWidth-f,c=e.offsetHeight-s;if(u||c){var p=a(e);u-=b(p,"x"),c-=b(p,"y"),o.width-=u,o.height-=c}return M(o)}function D(e,t){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],r=l(10),o="HTML"===t.nodeName,i=T(e),f=T(t),u=s(e),c=a(t),p=parseFloat(c.borderTopWidth),d=parseFloat(c.borderLeftWidth);n&&o&&(f.top=Math.max(f.top,0),f.left=Math.max(f.left,0));var h=M({top:i.top-f.top-p,left:i.left-f.left-d,width:i.width,height:i.height});if(h.marginTop=0,h.marginLeft=0,!r&&o){var m=parseFloat(c.marginTop),v=parseFloat(c.marginLeft);h.top-=p-m,h.bottom-=p-m,h.left-=d-v,h.right-=d-v,h.marginTop=m,h.marginLeft=v}return(r&&!n?t.contains(u):t===u&&"BODY"!==u.nodeName)&&(h=g(h,t)),h}function F(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=e.ownerDocument.documentElement,r=D(e,n),o=Math.max(n.clientWidth,window.innerWidth||0),i=Math.max(n.clientHeight,window.innerHeight||0),a=t?0:v(n),f=t?0:v(n,"left"),s={top:a-r.top+r.marginTop,left:f-r.left+r.marginLeft,width:o,height:i};return M(s)}function k(e){var t=e.nodeName;if("BODY"===t||"HTML"===t)return!1;if("fixed"===a(e,"position"))return!0;var n=f(e);return!!n&&k(n)}function N(e){if(!e||!e.parentElement||l())return document.documentElement;for(var t=e.parentElement;t&&"none"===a(t,"transform");)t=t.parentElement;return t||document.documentElement}function C(e,t,n,r){var o=arguments.length>4&&void 0!==arguments[4]&&arguments[4],i={top:0,left:0},a=o?N(e):m(e,u(t));if("viewport"===r)i=F(a,o);else{var c=void 0;"scrollParent"===r?"BODY"===(c=s(f(t))).nodeName&&(c=e.ownerDocument.documentElement):c="window"===r?e.ownerDocument.documentElement:r;var p=D(c,a,o);if("HTML"!==c.nodeName||k(a))i=p;else{var l=y(e.ownerDocument),d=l.height,h=l.width;i.top+=p.top-p.marginTop,i.bottom=d+p.top,i.left+=p.left-p.marginLeft,i.right=h+p.left}}var v="number"===typeof(n=n||0);return i.left+=v?n:n.left||0,i.top+=v?n:n.top||0,i.right-=v?n:n.right||0,i.bottom-=v?n:n.bottom||0,i}function P(e){return e.width*e.height}function j(e,t,n,r,o){var i=arguments.length>5&&void 0!==arguments[5]?arguments[5]:0;if(-1===e.indexOf("auto"))return e;var a=C(n,r,i,o),f={top:{width:a.width,height:t.top-a.top},right:{width:a.right-t.right,height:a.height},bottom:{width:a.width,height:a.bottom-t.bottom},left:{width:t.left-a.left,height:a.height}},s=Object.keys(f).map((function(e){return L({key:e},f[e],{area:P(f[e])})})).sort((function(e,t){return t.area-e.area})),u=s.filter((function(e){var t=e.width,r=e.height;return t>=n.clientWidth&&r>=n.clientHeight})),c=u.length>0?u[0].key:s[0].key,p=e.split("-")[1];return c+(p?"-"+p:"")}function S(e,t,n){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null,o=r?N(t):m(t,u(n));return D(n,o,r)}function H(e){var t=e.ownerDocument.defaultView.getComputedStyle(e),n=parseFloat(t.marginTop||0)+parseFloat(t.marginBottom||0),r=parseFloat(t.marginLeft||0)+parseFloat(t.marginRight||0);return{width:e.offsetWidth+r,height:e.offsetHeight+n}}function B(e){var t={left:"right",right:"left",bottom:"top",top:"bottom"};return e.replace(/left|right|bottom|top/g,(function(e){return t[e]}))}function W(e,t,n){n=n.split("-")[0];var r=H(e),o={width:r.width,height:r.height},i=-1!==["right","left"].indexOf(n),a=i?"top":"left",f=i?"left":"top",s=i?"height":"width",u=i?"width":"height";return o[a]=t[a]+t[s]/2-r[s]/2,o[f]=n===f?t[f]-r[u]:t[B(f)],o}function A(e,t){return Array.prototype.find?e.find(t):e.filter(t)[0]}function R(e,t,n){return(void 0===n?e:e.slice(0,function(e,t,n){if(Array.prototype.findIndex)return e.findIndex((function(e){return e[t]===n}));var r=A(e,(function(e){return e[t]===n}));return e.indexOf(r)}(e,"name",n))).forEach((function(e){e.function&&console.warn("`modifier.function` is deprecated, use `modifier.fn`!");var n=e.function||e.fn;e.enabled&&i(n)&&(t.offsets.popper=M(t.offsets.popper),t.offsets.reference=M(t.offsets.reference),t=n(t,e))})),t}function I(){if(!this.state.isDestroyed){var e={instance:this,styles:{},arrowStyles:{},attributes:{},flipped:!1,offsets:{}};e.offsets.reference=S(this.state,this.popper,this.reference,this.options.positionFixed),e.placement=j(this.options.placement,e.offsets.reference,this.popper,this.reference,this.options.modifiers.flip.boundariesElement,this.options.modifiers.flip.padding),e.originalPlacement=e.placement,e.positionFixed=this.options.positionFixed,e.offsets.popper=W(this.popper,e.offsets.reference,e.placement),e.offsets.popper.position=this.options.positionFixed?"fixed":"absolute",e=R(this.modifiers,e),this.state.isCreated?this.options.onUpdate(e):(this.state.isCreated=!0,this.options.onCreate(e))}}function U(e,t){return e.some((function(e){var n=e.name;return e.enabled&&n===t}))}function V(e){for(var t=[!1,"ms","Webkit","Moz","O"],n=e.charAt(0).toUpperCase()+e.slice(1),r=0;r<t.length;r++){var o=t[r],i=o?""+o+n:e;if("undefined"!==typeof document.body.style[i])return i}return null}function Y(){return this.state.isDestroyed=!0,U(this.modifiers,"applyStyle")&&(this.popper.removeAttribute("x-placement"),this.popper.style.position="",this.popper.style.top="",this.popper.style.left="",this.popper.style.right="",this.popper.style.bottom="",this.popper.style.willChange="",this.popper.style[V("transform")]=""),this.disableEventListeners(),this.options.removeOnDestroy&&this.popper.parentNode.removeChild(this.popper),this}function q(e){var t=e.ownerDocument;return t?t.defaultView:window}function _(e,t,n,r){var o="BODY"===e.nodeName,i=o?e.ownerDocument.defaultView:e;i.addEventListener(t,n,{passive:!0}),o||_(s(i.parentNode),t,n,r),r.push(i)}function z(e,t,n,r){n.updateBound=r,q(e).addEventListener("resize",n.updateBound,{passive:!0});var o=s(e);return _(o,"scroll",n.updateBound,n.scrollParents),n.scrollElement=o,n.eventsEnabled=!0,n}function G(){this.state.eventsEnabled||(this.state=z(this.reference,this.options,this.state,this.scheduleUpdate))}function J(){var e,t;this.state.eventsEnabled&&(cancelAnimationFrame(this.scheduleUpdate),this.state=(e=this.reference,t=this.state,q(e).removeEventListener("resize",t.updateBound),t.scrollParents.forEach((function(e){e.removeEventListener("scroll",t.updateBound)})),t.updateBound=null,t.scrollParents=[],t.scrollElement=null,t.eventsEnabled=!1,t))}function X(e){return""!==e&&!isNaN(parseFloat(e))&&isFinite(e)}function K(e,t){Object.keys(t).forEach((function(n){var r="";-1!==["width","height","top","right","bottom","left"].indexOf(n)&&X(t[n])&&(r="px"),e.style[n]=t[n]+r}))}var Q=n&&/Firefox/i.test(navigator.userAgent);function Z(e,t,n){var r=A(e,(function(e){return e.name===t})),o=!!r&&e.some((function(e){return e.name===n&&e.enabled&&e.order<r.order}));if(!o){var i="`"+t+"`",a="`"+n+"`";console.warn(a+" modifier is required by "+i+" modifier in order to work, be sure to include it before "+i+"!")}return o}var $=["auto-start","auto","auto-end","top-start","top","top-end","right-start","right","right-end","bottom-end","bottom","bottom-start","left-end","left","left-start"],ee=$.slice(3);function te(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=ee.indexOf(e),r=ee.slice(n+1).concat(ee.slice(0,n));return t?r.reverse():r}var ne="flip",re="clockwise",oe="counterclockwise";function ie(e,t,n,r){var o=[0,0],i=-1!==["right","left"].indexOf(r),a=e.split(/(\+|\-)/).map((function(e){return e.trim()})),f=a.indexOf(A(a,(function(e){return-1!==e.search(/,|\s/)})));a[f]&&-1===a[f].indexOf(",")&&console.warn("Offsets separated by white space(s) are deprecated, use a comma (,) instead.");var s=/\s*,\s*|\s+/,u=-1!==f?[a.slice(0,f).concat([a[f].split(s)[0]]),[a[f].split(s)[1]].concat(a.slice(f+1))]:[a];return(u=u.map((function(e,r){var o=(1===r?!i:i)?"height":"width",a=!1;return e.reduce((function(e,t){return""===e[e.length-1]&&-1!==["+","-"].indexOf(t)?(e[e.length-1]=t,a=!0,e):a?(e[e.length-1]+=t,a=!1,e):e.concat(t)}),[]).map((function(e){return function(e,t,n,r){var o=e.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),i=+o[1],a=o[2];if(!i)return e;if(0===a.indexOf("%")){var f=void 0;switch(a){case"%p":f=n;break;case"%":case"%r":default:f=r}return M(f)[t]/100*i}if("vh"===a||"vw"===a)return("vh"===a?Math.max(document.documentElement.clientHeight,window.innerHeight||0):Math.max(document.documentElement.clientWidth,window.innerWidth||0))/100*i;return i}(e,o,t,n)}))}))).forEach((function(e,t){e.forEach((function(n,r){X(n)&&(o[t]+=n*("-"===e[r-1]?-1:1))}))})),o}var ae={placement:"bottom",positionFixed:!1,eventsEnabled:!0,removeOnDestroy:!1,onCreate:function(){},onUpdate:function(){},modifiers:{shift:{order:100,enabled:!0,fn:function(e){var t=e.placement,n=t.split("-")[0],r=t.split("-")[1];if(r){var o=e.offsets,i=o.reference,a=o.popper,f=-1!==["bottom","top"].indexOf(n),s=f?"left":"top",u=f?"width":"height",c={start:x({},s,i[s]),end:x({},s,i[s]+i[u]-a[u])};e.offsets.popper=L({},a,c[r])}return e}},offset:{order:200,enabled:!0,fn:function(e,t){var n=t.offset,r=e.placement,o=e.offsets,i=o.popper,a=o.reference,f=r.split("-")[0],s=void 0;return s=X(+n)?[+n,0]:ie(n,i,a,f),"left"===f?(i.top+=s[0],i.left-=s[1]):"right"===f?(i.top+=s[0],i.left+=s[1]):"top"===f?(i.left+=s[0],i.top-=s[1]):"bottom"===f&&(i.left+=s[0],i.top+=s[1]),e.popper=i,e},offset:0},preventOverflow:{order:300,enabled:!0,fn:function(e,t){var n=t.boundariesElement||d(e.instance.popper);e.instance.reference===n&&(n=d(n));var r=V("transform"),o=e.instance.popper.style,i=o.top,a=o.left,f=o[r];o.top="",o.left="",o[r]="";var s=C(e.instance.popper,e.instance.reference,t.padding,n,e.positionFixed);o.top=i,o.left=a,o[r]=f,t.boundaries=s;var u=t.priority,c=e.offsets.popper,p={primary:function(e){var n=c[e];return c[e]<s[e]&&!t.escapeWithReference&&(n=Math.max(c[e],s[e])),x({},e,n)},secondary:function(e){var n="right"===e?"left":"top",r=c[n];return c[e]>s[e]&&!t.escapeWithReference&&(r=Math.min(c[n],s[e]-("right"===e?c.width:c.height))),x({},n,r)}};return u.forEach((function(e){var t=-1!==["left","top"].indexOf(e)?"primary":"secondary";c=L({},c,p[t](e))})),e.offsets.popper=c,e},priority:["left","right","top","bottom"],padding:5,boundariesElement:"scrollParent"},keepTogether:{order:400,enabled:!0,fn:function(e){var t=e.offsets,n=t.popper,r=t.reference,o=e.placement.split("-")[0],i=Math.floor,a=-1!==["top","bottom"].indexOf(o),f=a?"right":"bottom",s=a?"left":"top",u=a?"width":"height";return n[f]<i(r[s])&&(e.offsets.popper[s]=i(r[s])-n[u]),n[s]>i(r[f])&&(e.offsets.popper[s]=i(r[f])),e}},arrow:{order:500,enabled:!0,fn:function(e,t){var n;if(!Z(e.instance.modifiers,"arrow","keepTogether"))return e;var r=t.element;if("string"===typeof r){if(!(r=e.instance.popper.querySelector(r)))return e}else if(!e.instance.popper.contains(r))return console.warn("WARNING: `arrow.element` must be child of its popper element!"),e;var o=e.placement.split("-")[0],i=e.offsets,f=i.popper,s=i.reference,u=-1!==["left","right"].indexOf(o),c=u?"height":"width",p=u?"Top":"Left",l=p.toLowerCase(),d=u?"left":"top",h=u?"bottom":"right",m=H(r)[c];s[h]-m<f[l]&&(e.offsets.popper[l]-=f[l]-(s[h]-m)),s[l]+m>f[h]&&(e.offsets.popper[l]+=s[l]+m-f[h]),e.offsets.popper=M(e.offsets.popper);var v=s[l]+s[c]/2-m/2,g=a(e.instance.popper),b=parseFloat(g["margin"+p]),w=parseFloat(g["border"+p+"Width"]),y=v-e.offsets.popper[l]-b-w;return y=Math.max(Math.min(f[c]-m,y),0),e.arrowElement=r,e.offsets.arrow=(x(n={},l,Math.round(y)),x(n,d,""),n),e},element:"[x-arrow]"},flip:{order:600,enabled:!0,fn:function(e,t){if(U(e.instance.modifiers,"inner"))return e;if(e.flipped&&e.placement===e.originalPlacement)return e;var n=C(e.instance.popper,e.instance.reference,t.padding,t.boundariesElement,e.positionFixed),r=e.placement.split("-")[0],o=B(r),i=e.placement.split("-")[1]||"",a=[];switch(t.behavior){case ne:a=[r,o];break;case re:a=te(r);break;case oe:a=te(r,!0);break;default:a=t.behavior}return a.forEach((function(f,s){if(r!==f||a.length===s+1)return e;r=e.placement.split("-")[0],o=B(r);var u=e.offsets.popper,c=e.offsets.reference,p=Math.floor,l="left"===r&&p(u.right)>p(c.left)||"right"===r&&p(u.left)<p(c.right)||"top"===r&&p(u.bottom)>p(c.top)||"bottom"===r&&p(u.top)<p(c.bottom),d=p(u.left)<p(n.left),h=p(u.right)>p(n.right),m=p(u.top)<p(n.top),v=p(u.bottom)>p(n.bottom),g="left"===r&&d||"right"===r&&h||"top"===r&&m||"bottom"===r&&v,b=-1!==["top","bottom"].indexOf(r),w=!!t.flipVariations&&(b&&"start"===i&&d||b&&"end"===i&&h||!b&&"start"===i&&m||!b&&"end"===i&&v),y=!!t.flipVariationsByContent&&(b&&"start"===i&&h||b&&"end"===i&&d||!b&&"start"===i&&v||!b&&"end"===i&&m),E=w||y;(l||g||E)&&(e.flipped=!0,(l||g)&&(r=a[s+1]),E&&(i=function(e){return"end"===e?"start":"start"===e?"end":e}(i)),e.placement=r+(i?"-"+i:""),e.offsets.popper=L({},e.offsets.popper,W(e.instance.popper,e.offsets.reference,e.placement)),e=R(e.instance.modifiers,e,"flip"))})),e},behavior:"flip",padding:5,boundariesElement:"viewport",flipVariations:!1,flipVariationsByContent:!1},inner:{order:700,enabled:!1,fn:function(e){var t=e.placement,n=t.split("-")[0],r=e.offsets,o=r.popper,i=r.reference,a=-1!==["left","right"].indexOf(n),f=-1===["top","left"].indexOf(n);return o[a?"left":"top"]=i[n]-(f?o[a?"width":"height"]:0),e.placement=B(t),e.offsets.popper=M(o),e}},hide:{order:800,enabled:!0,fn:function(e){if(!Z(e.instance.modifiers,"hide","preventOverflow"))return e;var t=e.offsets.reference,n=A(e.instance.modifiers,(function(e){return"preventOverflow"===e.name})).boundaries;if(t.bottom<n.top||t.left>n.right||t.top>n.bottom||t.right<n.left){if(!0===e.hide)return e;e.hide=!0,e.attributes["x-out-of-boundaries"]=""}else{if(!1===e.hide)return e;e.hide=!1,e.attributes["x-out-of-boundaries"]=!1}return e}},computeStyle:{order:850,enabled:!0,fn:function(e,t){var n=t.x,r=t.y,o=e.offsets.popper,i=A(e.instance.modifiers,(function(e){return"applyStyle"===e.name})).gpuAcceleration;void 0!==i&&console.warn("WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!");var a=void 0!==i?i:t.gpuAcceleration,f=d(e.instance.popper),s=T(f),u={position:o.position},c=function(e,t){var n=e.offsets,r=n.popper,o=n.reference,i=Math.round,a=Math.floor,f=function(e){return e},s=i(o.width),u=i(r.width),c=-1!==["left","right"].indexOf(e.placement),p=-1!==e.placement.indexOf("-"),l=t?c||p||s%2===u%2?i:a:f,d=t?i:f;return{left:l(s%2===1&&u%2===1&&!p&&t?r.left-1:r.left),top:d(r.top),bottom:d(r.bottom),right:l(r.right)}}(e,window.devicePixelRatio<2||!Q),p="bottom"===n?"top":"bottom",l="right"===r?"left":"right",h=V("transform"),m=void 0,v=void 0;if(v="bottom"===p?"HTML"===f.nodeName?-f.clientHeight+c.bottom:-s.height+c.bottom:c.top,m="right"===l?"HTML"===f.nodeName?-f.clientWidth+c.right:-s.width+c.right:c.left,a&&h)u[h]="translate3d("+m+"px, "+v+"px, 0)",u[p]=0,u[l]=0,u.willChange="transform";else{var g="bottom"===p?-1:1,b="right"===l?-1:1;u[p]=v*g,u[l]=m*b,u.willChange=p+", "+l}var w={"x-placement":e.placement};return e.attributes=L({},w,e.attributes),e.styles=L({},u,e.styles),e.arrowStyles=L({},e.offsets.arrow,e.arrowStyles),e},gpuAcceleration:!0,x:"bottom",y:"right"},applyStyle:{order:900,enabled:!0,fn:function(e){var t,n;return K(e.instance.popper,e.styles),t=e.instance.popper,n=e.attributes,Object.keys(n).forEach((function(e){!1!==n[e]?t.setAttribute(e,n[e]):t.removeAttribute(e)})),e.arrowElement&&Object.keys(e.arrowStyles).length&&K(e.arrowElement,e.arrowStyles),e},onLoad:function(e,t,n,r,o){var i=S(o,t,e,n.positionFixed),a=j(n.placement,i,t,e,n.modifiers.flip.boundariesElement,n.modifiers.flip.padding);return t.setAttribute("x-placement",a),K(t,{position:n.positionFixed?"fixed":"absolute"}),n},gpuAcceleration:void 0}}},fe=function(){function e(t,n){var r=this,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};E(this,e),this.scheduleUpdate=function(){return requestAnimationFrame(r.update)},this.update=o(this.update.bind(this)),this.options=L({},e.Defaults,a),this.state={isDestroyed:!1,isCreated:!1,scrollParents:[]},this.reference=t&&t.jquery?t[0]:t,this.popper=n&&n.jquery?n[0]:n,this.options.modifiers={},Object.keys(L({},e.Defaults.modifiers,a.modifiers)).forEach((function(t){r.options.modifiers[t]=L({},e.Defaults.modifiers[t]||{},a.modifiers?a.modifiers[t]:{})})),this.modifiers=Object.keys(this.options.modifiers).map((function(e){return L({name:e},r.options.modifiers[e])})).sort((function(e,t){return e.order-t.order})),this.modifiers.forEach((function(e){e.enabled&&i(e.onLoad)&&e.onLoad(r.reference,r.popper,r.options,e,r.state)})),this.update();var f=this.options.eventsEnabled;f&&this.enableEventListeners(),this.state.eventsEnabled=f}return O(e,[{key:"update",value:function(){return I.call(this)}},{key:"destroy",value:function(){return Y.call(this)}},{key:"enableEventListeners",value:function(){return G.call(this)}},{key:"disableEventListeners",value:function(){return J.call(this)}}]),e}();fe.Utils=("undefined"!==typeof window?window:e).PopperUtils,fe.placements=$,fe.Defaults=ae,t.a=fe}).call(this,n(34))},1165:function(e,t,n){"use strict";var r=n(2),o=n(4),i=n(0),a=(n(3),n(1041)),f=n(247),s=n(430),u=n(94),c=n(64),p=n(14);function l(e){return"function"===typeof e?e():e}var d="undefined"!==typeof window?i.useLayoutEffect:i.useEffect,h={},m=i.forwardRef((function(e,t){var n=e.anchorEl,m=e.children,v=e.container,g=e.disablePortal,b=void 0!==g&&g,w=e.keepMounted,y=void 0!==w&&w,E=e.modifiers,O=e.open,x=e.placement,L=void 0===x?"bottom":x,M=e.popperOptions,T=void 0===M?h:M,D=e.popperRef,F=e.style,k=e.transition,N=void 0!==k&&k,C=Object(o.a)(e,["anchorEl","children","container","disablePortal","keepMounted","modifiers","open","placement","popperOptions","popperRef","style","transition"]),P=i.useRef(null),j=Object(p.a)(P,t),S=i.useRef(null),H=Object(p.a)(S,D),B=i.useRef(H);d((function(){B.current=H}),[H]),i.useImperativeHandle(D,(function(){return S.current}),[]);var W=i.useState(!0),A=W[0],R=W[1],I=function(e,t){if("ltr"===(t&&t.direction||"ltr"))return e;switch(e){case"bottom-end":return"bottom-start";case"bottom-start":return"bottom-end";case"top-end":return"top-start";case"top-start":return"top-end";default:return e}}(L,Object(f.a)()),U=i.useState(I),V=U[0],Y=U[1];i.useEffect((function(){S.current&&S.current.update()}));var q=i.useCallback((function(){if(P.current&&n&&O){S.current&&(S.current.destroy(),B.current(null));var e=function(e){Y(e.placement)},t=(l(n),new a.a(l(n),P.current,Object(r.a)({placement:I},T,{modifiers:Object(r.a)({},b?{}:{preventOverflow:{boundariesElement:"window"}},E,T.modifiers),onCreate:Object(u.a)(e,T.onCreate),onUpdate:Object(u.a)(e,T.onUpdate)})));B.current(t)}}),[n,b,E,O,I,T]),_=i.useCallback((function(e){Object(c.a)(j,e),q()}),[j,q]),z=function(){S.current&&(S.current.destroy(),B.current(null))};if(i.useEffect((function(){return function(){z()}}),[]),i.useEffect((function(){O||N||z()}),[O,N]),!y&&!O&&(!N||A))return null;var G={placement:V};return N&&(G.TransitionProps={in:O,onEnter:function(){R(!1)},onExited:function(){R(!0),z()}}),i.createElement(s.a,{disablePortal:b,container:v},i.createElement("div",Object(r.a)({ref:_,role:"tooltip"},C,{style:Object(r.a)({position:"fixed",top:0,left:0,display:O||!y||N?null:"none"},F)}),"function"===typeof m?m(G):m))}));t.a=m},397:function(e,t,n){"use strict";n.r(t);var r=n(12);n.d(t,"capitalize",(function(){return r.a}));var o=n(94);n.d(t,"createChainedFunction",(function(){return o.a}));var i=n(51);n.d(t,"createSvgIcon",(function(){return i.a}));var a=n(82);n.d(t,"debounce",(function(){return a.a}));var f=n(81);n.d(t,"deprecatedPropType",(function(){return f.a}));var s=n(83);n.d(t,"isMuiElement",(function(){return s.a}));var u=n(30);n.d(t,"ownerDocument",(function(){return u.a}));var c=n(112);n.d(t,"ownerWindow",(function(){return c.a}));var p=n(462);n.d(t,"requirePropFactory",(function(){return p.a}));var l=n(64);n.d(t,"setRef",(function(){return l.a}));var d=n(464);n.d(t,"unsupportedProp",(function(){return d.a}));var h=n(166);n.d(t,"useControlled",(function(){return h.a}));var m=n(53);n.d(t,"useEventCallback",(function(){return m.a}));var v=n(14);n.d(t,"useForkRef",(function(){return v.a}));var g=n(465);n.d(t,"unstable_useId",(function(){return g.a}));var b=n(167);n.d(t,"useIsFocusVisible",(function(){return b.a}))},462:function(e,t,n){"use strict";function r(e){return function(){return null}}n.d(t,"a",(function(){return r}))},464:function(e,t,n){"use strict";function r(e,t,n,r,o){return null}n.d(t,"a",(function(){return r}))},465:function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));var r=n(0);function o(e){var t=r.useState(e),n=t[0],o=t[1],i=e||n;return r.useEffect((function(){null==n&&o("mui-".concat(Math.round(1e5*Math.random())))}),[n]),i}},469:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return r.createSvgIcon}});var r=n(397)},81:function(e,t,n){"use strict";function r(e,t){return function(){return null}}n.d(t,"a",(function(){return r}))}}]);