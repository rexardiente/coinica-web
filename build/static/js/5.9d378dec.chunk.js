(this.webpackJsonpcoinica=this.webpackJsonpcoinica||[]).push([[5],{444:function(e,r,t){"use strict";t.d(r,"i",(function(){return o})),t.d(r,"k",(function(){return i})),t.d(r,"d",(function(){return c})),t.d(r,"e",(function(){return s})),t.d(r,"a",(function(){return p})),t.d(r,"m",(function(){return u})),t.d(r,"b",(function(){return l})),t.d(r,"l",(function(){return d})),t.d(r,"c",(function(){return f})),t.d(r,"g",(function(){return m})),t.d(r,"f",(function(){return b})),t.d(r,"h",(function(){return h})),t.d(r,"j",(function(){return j}));t(78),t(119),t(120);var a=t(55),n=(t(25),t(151)),o=function(e){var r=Object(n.b)();return a.a.get("/donut/api/v1/account/id/".concat(e),{headers:r})},i=function(e){var r=Object(n.b)();return a.a.get("/donut/api/v1/vip",{params:{id:e},headers:r})},c=function(){return a.a.get("/donut/api/v1/challenge/ranks/daily")},s=function(){return a.a.get("/donut/api/v1/challenge")},p=function(e,r){var t=Object(n.b)();return a.a.post("/donut/api/v1/referral/apply",{code:e,applied_by:r},{headers:t})},u=function(e){var r=Object(n.b)();return a.a.get("/donut/api/v1/referral/history/".concat(e),{headers:r})},l=function(e,r){var t=Object(n.b)();return a.a.get("/donut/api/v1/task/daily",{params:{user:e,game_id:r},headers:t})},d=function(e,r){var t=Object(n.b)();return a.a.get("/donut/api/v1/task/monthly",{params:{user:e,game_id:r},headers:t})},f=function(){return a.a.get("/donut/api/v1/games")},m=function(){return a.a.get("/donut/api/v1/ranking/monthly")},b=function(){return a.a.get("/donut/api/v1/ranking/daily")},h=function(){return a.a.get("/donut/api/v1/news")},j=function(e){var r=Object(n.b)();return a.a.get("/donut/api/v1/get/account/username/by?id=".concat(e),{headers:r})}},446:function(e,r,t){"use strict";var a=t(448),n=t.n(a),o=t(95),i=t(447),c=t.n(i),s=t(2);r.a=function(e){var r=e.title,t=e.instruction,a=e.className;return Object(s.jsxs)("div",{className:[c.a.container,a].join(" "),children:[r&&Object(s.jsx)("h3",{children:r}),Object(s.jsxs)("p",{children:[Object(s.jsx)(n.a,{className:c.a.iconInfo}),Object(o.a)("misc.howItWorks")]}),Object(s.jsx)("ol",{children:t.map((function(e,r){return Object(s.jsx)("li",{children:e},r)}))})]})}},447:function(e,r,t){e.exports={container:"HowItWorks_container__uVCd6",iconInfo:"HowItWorks_iconInfo__1Yh1B"}},448:function(e,r,t){"use strict";var a=t(42),n=t(66);Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var o=n(t(0)),i=(0,a(t(232)).default)(o.createElement("path",{d:"M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"}),"InfoOutlined");r.default=i},449:function(e,r,t){"use strict";var a=t(7),n=t(439),o=t(467),i=t(450),c=t.n(i),s=t(2),p=Object(a.a)((function(e){return Object(n.a)({root:{borderRadius:10},colorPrimary:{backgroundColor:"#191E35"},bar:{borderRadius:10,backgroundColor:"#1785EB"}})}))(o.a);r.a=function(e){var r=e.currentValue,t=e.maxValue;return Object(s.jsxs)("div",{className:c.a.container,children:[Object(s.jsx)(p,{value:r,variant:"determinate",className:c.a.barHeight}),Object(s.jsxs)("div",{className:c.a.barLabel,children:[r,"/",t]})]})}},450:function(e,r,t){e.exports={container:"LinearProgressBar_container__AJCH_",barHeight:"LinearProgressBar_barHeight__2i-G7",barLabel:"LinearProgressBar_barLabel__1dz4S"}},467:function(e,r,t){"use strict";var a=t(1),n=t(3),o=t(0),i=(t(8),t(6)),c=t(11),s=t(7),p=t(19),u=t(39),l=o.forwardRef((function(e,r){var t=e.classes,s=e.className,p=e.color,l=void 0===p?"primary":p,d=e.value,f=e.valueBuffer,m=e.variant,b=void 0===m?"indeterminate":m,h=Object(n.a)(e,["classes","className","color","value","valueBuffer","variant"]),j=Object(u.a)(),g={},v={bar1:{},bar2:{}};if("determinate"===b||"buffer"===b)if(void 0!==d){g["aria-valuenow"]=Math.round(d),g["aria-valuemin"]=0,g["aria-valuemax"]=100;var O=d-100;"rtl"===j.direction&&(O=-O),v.bar1.transform="translateX(".concat(O,"%)")}else 0;if("buffer"===b)if(void 0!==f){var x=(f||0)-100;"rtl"===j.direction&&(x=-x),v.bar2.transform="translateX(".concat(x,"%)")}else 0;return o.createElement("div",Object(a.a)({className:Object(i.a)(t.root,t["color".concat(Object(c.a)(l))],s,{determinate:t.determinate,indeterminate:t.indeterminate,buffer:t.buffer,query:t.query}[b]),role:"progressbar"},g,{ref:r},h),"buffer"===b?o.createElement("div",{className:Object(i.a)(t.dashed,t["dashedColor".concat(Object(c.a)(l))])}):null,o.createElement("div",{className:Object(i.a)(t.bar,t["barColor".concat(Object(c.a)(l))],("indeterminate"===b||"query"===b)&&t.bar1Indeterminate,{determinate:t.bar1Determinate,buffer:t.bar1Buffer}[b]),style:v.bar1}),"determinate"===b?null:o.createElement("div",{className:Object(i.a)(t.bar,("indeterminate"===b||"query"===b)&&t.bar2Indeterminate,"buffer"===b?[t["color".concat(Object(c.a)(l))],t.bar2Buffer]:t["barColor".concat(Object(c.a)(l))]),style:v.bar2}))}));r.a=Object(s.a)((function(e){var r=function(r){return"light"===e.palette.type?Object(p.d)(r,.62):Object(p.b)(r,.5)},t=r(e.palette.primary.main),a=r(e.palette.secondary.main);return{root:{position:"relative",overflow:"hidden",height:4,"@media print":{colorAdjust:"exact"}},colorPrimary:{backgroundColor:t},colorSecondary:{backgroundColor:a},determinate:{},indeterminate:{},buffer:{backgroundColor:"transparent"},query:{transform:"rotate(180deg)"},dashed:{position:"absolute",marginTop:0,height:"100%",width:"100%",animation:"$buffer 3s infinite linear"},dashedColorPrimary:{backgroundImage:"radial-gradient(".concat(t," 0%, ").concat(t," 16%, transparent 42%)"),backgroundSize:"10px 10px",backgroundPosition:"0 -23px"},dashedColorSecondary:{backgroundImage:"radial-gradient(".concat(a," 0%, ").concat(a," 16%, transparent 42%)"),backgroundSize:"10px 10px",backgroundPosition:"0 -23px"},bar:{width:"100%",position:"absolute",left:0,bottom:0,top:0,transition:"transform 0.2s linear",transformOrigin:"left"},barColorPrimary:{backgroundColor:e.palette.primary.main},barColorSecondary:{backgroundColor:e.palette.secondary.main},bar1Indeterminate:{width:"auto",animation:"$indeterminate1 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite"},bar1Determinate:{transition:"transform .".concat(4,"s linear")},bar1Buffer:{zIndex:1,transition:"transform .".concat(4,"s linear")},bar2Indeterminate:{width:"auto",animation:"$indeterminate2 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) 1.15s infinite"},bar2Buffer:{transition:"transform .".concat(4,"s linear")},"@keyframes indeterminate1":{"0%":{left:"-35%",right:"100%"},"60%":{left:"100%",right:"-90%"},"100%":{left:"100%",right:"-90%"}},"@keyframes indeterminate2":{"0%":{left:"-200%",right:"100%"},"60%":{left:"107%",right:"-8%"},"100%":{left:"107%",right:"-8%"}},"@keyframes buffer":{"0%":{opacity:1,backgroundPosition:"0 -23px"},"50%":{opacity:0,backgroundPosition:"0 -23px"},"100%":{opacity:1,backgroundPosition:"-200px -23px"}}}}),{name:"MuiLinearProgress"})(l)},476:function(e,r,t){e.exports={howItWorks:"Tasks_howItWorks__2DiZj"}},477:function(e,r,t){e.exports={container:"GameTask_container__1ixAX",fontWeight_700:"GameTask_fontWeight_700__2LpUx",gameName:"GameTask_gameName__18-pI",textCapitalize:"GameTask_textCapitalize__nNwUg",progress:"GameTask_progress__2CmwM",points:"GameTask_points__1Q8uD"}},478:function(e,r,t){e.exports={container:"GameTaskList_container__1PDuh"}},506:function(e,r,t){"use strict";var a=t(58),n=t(1),o=(t(8),t(97));function i(e,r){var t={};return Object.keys(e).forEach((function(a){-1===r.indexOf(a)&&(t[a]=e[a])})),t}function c(e){var r=function(r){var t=e(r);return r.css?Object(n.a)({},Object(o.a)(t,e(Object(n.a)({theme:r.theme},r.css))),i(r.css,[e.filterProps])):r.sx?Object(n.a)({},Object(o.a)(t,e(Object(n.a)({theme:r.theme},r.sx))),i(r.sx,[e.filterProps])):t};return r.propTypes={},r.filterProps=["css","sx"].concat(Object(a.a)(e.filterProps)),r}var s=c;var p=function(){for(var e=arguments.length,r=new Array(e),t=0;t<e;t++)r[t]=arguments[t];var a=function(e){return r.reduce((function(r,t){var a=t(e);return a?Object(o.a)(r,a):r}),{})};return a.propTypes={},a.filterProps=r.reduce((function(e,r){return e.concat(r.filterProps)}),[]),a},u=t(23),l=t(153);function d(e,r){return r&&"string"===typeof r?r.split(".").reduce((function(e,r){return e&&e[r]?e[r]:null}),e):null}var f=function(e){var r=e.prop,t=e.cssProperty,a=void 0===t?e.prop:t,n=e.themeKey,o=e.transform,i=function(e){if(null==e[r])return null;var t=e[r],i=d(e.theme,n)||{};return Object(l.a)(e,t,(function(e){var r;return"function"===typeof i?r=i(e):Array.isArray(i)?r=i[e]||e:(r=d(i,e)||e,o&&(r=o(r))),!1===a?r:Object(u.a)({},a,r)}))};return i.propTypes={},i.filterProps=[r],i};function m(e){return"number"!==typeof e?e:"".concat(e,"px solid")}var b=p(f({prop:"border",themeKey:"borders",transform:m}),f({prop:"borderTop",themeKey:"borders",transform:m}),f({prop:"borderRight",themeKey:"borders",transform:m}),f({prop:"borderBottom",themeKey:"borders",transform:m}),f({prop:"borderLeft",themeKey:"borders",transform:m}),f({prop:"borderColor",themeKey:"palette"}),f({prop:"borderRadius",themeKey:"shape"})),h=p(f({prop:"displayPrint",cssProperty:!1,transform:function(e){return{"@media print":{display:e}}}}),f({prop:"display"}),f({prop:"overflow"}),f({prop:"textOverflow"}),f({prop:"visibility"}),f({prop:"whiteSpace"})),j=p(f({prop:"flexBasis"}),f({prop:"flexDirection"}),f({prop:"flexWrap"}),f({prop:"justifyContent"}),f({prop:"alignItems"}),f({prop:"alignContent"}),f({prop:"order"}),f({prop:"flex"}),f({prop:"flexGrow"}),f({prop:"flexShrink"}),f({prop:"alignSelf"}),f({prop:"justifyItems"}),f({prop:"justifySelf"})),g=p(f({prop:"gridGap"}),f({prop:"gridColumnGap"}),f({prop:"gridRowGap"}),f({prop:"gridColumn"}),f({prop:"gridRow"}),f({prop:"gridAutoFlow"}),f({prop:"gridAutoColumns"}),f({prop:"gridAutoRows"}),f({prop:"gridTemplateColumns"}),f({prop:"gridTemplateRows"}),f({prop:"gridTemplateAreas"}),f({prop:"gridArea"})),v=p(f({prop:"position"}),f({prop:"zIndex",themeKey:"zIndex"}),f({prop:"top"}),f({prop:"right"}),f({prop:"bottom"}),f({prop:"left"})),O=p(f({prop:"color",themeKey:"palette"}),f({prop:"bgcolor",cssProperty:"backgroundColor",themeKey:"palette"})),x=f({prop:"boxShadow",themeKey:"shadows"});function y(e){return e<=1?"".concat(100*e,"%"):e}var k=f({prop:"width",transform:y}),_=f({prop:"maxWidth",transform:y}),P=f({prop:"minWidth",transform:y}),w=f({prop:"height",transform:y}),C=f({prop:"maxHeight",transform:y}),N=f({prop:"minHeight",transform:y}),T=(f({prop:"size",cssProperty:"width",transform:y}),f({prop:"size",cssProperty:"height",transform:y}),p(k,_,P,w,C,N,f({prop:"boxSizing"}))),I=t(442),z=p(f({prop:"fontFamily",themeKey:"typography"}),f({prop:"fontSize",themeKey:"typography"}),f({prop:"fontStyle",themeKey:"typography"}),f({prop:"fontWeight",themeKey:"typography"}),f({prop:"letterSpacing"}),f({prop:"lineHeight"}),f({prop:"textAlign"})),H=t(3),L=t(0),S=t.n(L),B=t(6),K=t(47),V=t.n(K),W=t(366);function E(e,r){var t={};return Object.keys(e).forEach((function(a){-1===r.indexOf(a)&&(t[a]=e[a])})),t}var A=t(72),D=function(e){var r=function(e){return function(r){var t,a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},o=a.name,i=Object(H.a)(a,["name"]),c=o,s="function"===typeof r?function(e){return{root:function(t){return r(Object(n.a)({theme:e},t))}}}:{root:r},p=Object(W.a)(s,Object(n.a)({Component:e,name:o||e.displayName,classNamePrefix:c},i));r.filterProps&&(t=r.filterProps,delete r.filterProps),r.propTypes&&(r.propTypes,delete r.propTypes);var u=S.a.forwardRef((function(r,a){var o=r.children,i=r.className,c=r.clone,s=r.component,u=Object(H.a)(r,["children","className","clone","component"]),l=p(r),d=Object(B.a)(l.root,i),f=u;if(t&&(f=E(f,t)),c)return S.a.cloneElement(o,Object(n.a)({className:Object(B.a)(o.props.className,d)},f));if("function"===typeof o)return o(Object(n.a)({className:d},f));var m=s||e;return S.a.createElement(m,Object(n.a)({ref:a,className:d},f),o)}));return V()(u,e),u}}(e);return function(e,t){return r(e,Object(n.a)({defaultTheme:A.a},t))}},G=s(p(b,h,j,g,v,O,x,T,I.b,z)),M=D("div")(G,{name:"MuiBox"});r.a=M},525:function(e,r,t){"use strict";t.r(r);var a=t(78),n=t.n(a),o=t(5),i=t(119),c=t(30),s=t(0),p=t(43),u=t(152),l=t(94),d=t(409),f=t(446),m=t(444),b=t(95),h=t(476),j=t.n(h),g=t(506),v=t(449),O=t(477),x=t.n(O),y=t(2),k=function(){return Object(y.jsx)("svg",{width:"25",height:"22",viewBox:"0 0 25 22",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:Object(y.jsx)("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M18.7649 1.24258C17.4354 0.00865918 15.2798 0.00865918 13.9502 1.24258L12.3453 2.73205C12.2769 2.79553 12.212 2.86105 12.1507 2.92838C12.0893 2.86106 12.0244 2.79556 11.9561 2.73209L10.3512 1.24261C9.02162 0.00869623 6.86602 0.00869623 5.53648 1.24261C4.20694 2.47653 4.20694 4.47711 5.53648 5.71103L6.53359 6.63643H0V12.9557H2.26966V21.3814H22.6966V12.9557H24.9663V6.63643H17.7678L18.7649 5.71099C20.0945 4.47707 20.0945 2.4765 18.7649 1.24258ZM15.5551 5.71099L17.16 4.22152C17.6032 3.81021 17.6032 3.14335 17.16 2.73205C16.7168 2.32074 15.9983 2.32074 15.5551 2.73205L13.9502 4.22152C13.5071 4.63283 13.5071 5.29968 13.9502 5.71099C14.3934 6.1223 15.1119 6.1223 15.5551 5.71099ZM10.3512 4.22156L8.74627 2.73209C8.30309 2.32078 7.58455 2.32078 7.14137 2.73209C6.69819 3.14339 6.69819 3.81025 7.14137 4.22156L8.74627 5.71103C9.18945 6.12233 9.90798 6.12233 10.3512 5.71103C10.7943 5.29972 10.7943 4.63286 10.3512 4.22156ZM22.6966 8.74286V10.8493H2.26966V8.74286H22.6966ZM13.5235 12.9557H20.427V19.275H13.5235V12.9557ZM11.443 12.9557V19.275H4.53933V12.9557H11.443Z",fill:"#1785EB"})})},_=function(e){var r=e.gameName,t=e.currentProgress,a=e.maxProgress,n=e.vipPoints,o=r.toLowerCase();return Object(y.jsxs)(g.a,{className:x.a.container,children:[Object(y.jsx)("div",{className:[x.a.gameName,x.a.textCapitalize,x.a.fontWeight_700].join(" "),children:o}),Object(y.jsxs)("div",{className:x.a.progress,children:[Object(y.jsxs)("div",{children:[Object(b.a)("task.play")," ",Object(y.jsx)("span",{className:x.a.textCapitalize,children:o})," ",Object(y.jsxs)("span",{className:x.a.fontWeight_700,children:[t," ",Object(b.a)("task.times")]})]}),Object(y.jsx)(v.a,{currentValue:t,maxValue:a})]}),Object(y.jsxs)("div",{className:[x.a.points,x.a.fontWeight_700].join(" "),children:[Object(y.jsx)(k,{}),Object(b.a)("task.get")," ",n," ",Object(b.a)("task.vip.points")]})]})},P=t(478),w=t.n(P),C=function(e){var r=e.data;return Object(y.jsx)("div",{className:w.a.container,children:r.map((function(e){return Object(y.jsx)(_,{gameName:e.gameName,currentProgress:e.currentProgress,maxProgress:e.maxProgress,vipPoints:e.vipPoints})}))})},N={gameName:"",currentProgress:0,maxProgress:0,vipPoints:0},T=[Object(b.a)("task.instruction.one"),Object(b.a)("task.instruction.two"),Object(b.a)("task.instruction.three")];r.default=function(){var e=Object(p.c)((function(e){return e.platform})).account,r=Object(p.b)(),t=Object(s.useState)({dailyTaskData:[],monthlyTaskData:[]}),a=Object(c.a)(t,2),b=a[0],h=a[1],g=Object(s.useState)(""),v=Object(c.a)(g,2),O=v[0],x=v[1],k=function(){var r=Object(i.a)(n.a.mark((function r(t,a){var c;return n.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(!t.length){r.next=5;break}return r.next=3,Promise.all(t.map(function(){var r=Object(i.a)(n.a.mark((function r(t){var i,c,s;return n.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return i=Object(o.a)({},N),r.next=3,a(e.id,t.id);case 3:return c=r.sent,(s=c.data)?(i.gameName=t.name,i.currentProgress=s.game_count,i.maxProgress=10,i.vipPoints=1):i.gameName=t.name,r.abrupt("return",i);case 7:case"end":return r.stop()}}),r)})));return function(e){return r.apply(this,arguments)}}()));case 3:return c=r.sent,r.abrupt("return",c);case 5:case"end":return r.stop()}}),r)})));return function(e,t){return r.apply(this,arguments)}}(),_=function(){var e=Object(i.a)(n.a.mark((function e(){var t,a,o,i;return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r(Object(u.b)(!0)),e.prev=1,e.next=4,Object(m.c)();case 4:return t=e.sent,a=t.data,e.next=8,k(a,m.b);case 8:return o=e.sent,e.next=11,k(a,m.l);case 11:i=e.sent,h({dailyTaskData:o,monthlyTaskData:i}),e.next=18;break;case 15:e.prev=15,e.t0=e.catch(1),x(e.t0.message);case 18:return e.prev=18,r(Object(u.b)(!1)),e.finish(18);case 21:case"end":return e.stop()}}),e,null,[[1,15,18,21]])})));return function(){return e.apply(this,arguments)}}();return Object(s.useEffect)((function(){e&&_()}),[e]),O?Object(y.jsx)(l.a,{component:"p",align:"center",children:O}):Object(y.jsx)(s.Fragment,{children:Object(y.jsxs)(d.a,{container:!0,xs:!0,children:[Object(y.jsx)(d.a,{item:!0,xs:12,children:Object(y.jsx)(f.a,{className:j.a.howItWorks,instruction:T})}),Object(y.jsxs)(d.a,{item:!0,container:!0,spacing:2,children:[Object(y.jsx)(d.a,{item:!0,xs:6,md:12,children:Object(y.jsx)(C,{data:b.dailyTaskData})}),Object(y.jsx)(d.a,{item:!0,xs:6,md:12,children:Object(y.jsx)(C,{data:b.monthlyTaskData})})]})]})})}}}]);