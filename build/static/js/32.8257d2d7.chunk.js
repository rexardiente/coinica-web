(this.webpackJsonpcoinica=this.webpackJsonpcoinica||[]).push([[32],{1233:function(e,a,t){"use strict";t.r(a);var n=t(56),r=t(11),c=t(9),i=t.n(c),o=t(0),l=t(27),s=t(166),u=t(135),b=t(498),d=t(95),j=t(72),p=t(558),f=t(789),h=t.n(f),O=t(1),g=function(e){var a=e.value,t=e.toggleOptions,n=e.onChange;return Object(O.jsxs)("div",{className:h.a.container,children:[Object(O.jsx)("div",{className:h.a.pageTitleWrapper,children:Object(O.jsx)(u.a,{component:"h1",variant:"h4",children:Object(j.a)("ranking.title")})}),Object(O.jsx)(p.a,{className:h.a.toggle,value:a,options:t,onChange:n})]})},v=t(399),x=t(1206),m=o.createContext(null);function _(e){var a=e.children,t=e.value,n=function(){var e=o.useState(null),a=e[0],t=e[1];return o.useEffect((function(){t("mui-p-".concat(Math.round(1e5*Math.random())))}),[]),a}(),r=o.useMemo((function(){return{idPrefix:n,value:t}}),[n,t]);return o.createElement(m.Provider,{value:r},a)}function C(){return o.useContext(m)}function k(e,a){return null===e.idPrefix?null:"".concat(e.idPrefix,"-P-").concat(a)}function y(e,a){return null===e.idPrefix?null:"".concat(e.idPrefix,"-T-").concat(a)}var T=t(2),N=t(4),w=t(1231),E=o.forwardRef((function(e,a){var t=e.children,n=Object(N.a)(e,["children"]),r=C();if(null===r)throw new TypeError("No TabContext provided");var c=o.Children.map(t,(function(e){return o.cloneElement(e,{"aria-controls":k(r,e.props.value),id:y(r,e.props.value)})}));return o.createElement(w.a,Object(T.a)({},n,{ref:a,value:r.value}),c)})),P=t(6),D=t(8),H=o.forwardRef((function(e,a){var t=e.children,n=e.className,r=e.classes,c=e.value,i=Object(N.a)(e,["children","className","classes","value"]),l=C();if(null===l)throw new TypeError("No TabContext provided");var s=k(l,c),u=y(l,c);return o.createElement("div",Object(T.a)({"aria-labelledby":u,className:Object(P.a)(r.root,n),hidden:c!==l.value,id:s,ref:a,role:"tabpanel"},i),c===l.value&&t)})),S=Object(D.a)((function(e){return{root:{padding:e.spacing(3)}}}),{name:"MuiTabPanel"})(H),M=t(555),R=t(556),B=t(552),W=t(246),I=t(553),L=t(554),q=t(557),z=t(790),F=t.n(z),J=function(e){var a=e.theadData,t=e.tbodyData;return Object(O.jsx)(B.a,{className:F.a.container,component:W.a,children:Object(O.jsxs)(I.a,{className:F.a.table,"aria-label":"leader-board-table",children:[Object(O.jsx)(L.a,{children:Object(O.jsx)(M.a,{children:a.map((function(e,a){return Object(O.jsx)(R.a,{align:"center",children:e},a)}))})}),Object(O.jsx)(q.a,{children:function(){if(!t.length)return Object(O.jsx)(M.a,{children:Object(O.jsx)(R.a,{colSpan:a.length,className:F.a.emptyData,children:Object(j.a)("misc.noAvailableData")})});var e=t.length&&Object.keys(t[0]);return t.map((function(a,t){return Object(O.jsxs)(M.a,{children:[Object(O.jsx)(R.a,{align:"center",children:t+1}),Object(O.jsx)(R.a,{align:"center",children:a[e[1]]||"---"}),Object(O.jsx)(R.a,{align:"center",children:a[e[2]]}),Object(O.jsx)(R.a,{align:"center",children:a[e[3]]})]},t)}))}()})]})})},A=t(791),G=t.n(A),U=Object(v.a)((function(e){return{root:{flexGrow:1,borderBottom:"2px solid #405680","& .Mui-selected":{color:e.palette.primary.main},"& .PrivateTabIndicator-colorPrimary-21":{height:4}}}})),X=function(e){var a=e.data,t=e.selectedTab,n=e.onChangeTab,r=U(),c=Object.entries(a);return Object(O.jsx)("div",{className:G.a.container,children:Object(O.jsxs)(_,{value:t,children:[Object(O.jsx)(E,{onChange:n,"aria-label":"ranking tab",className:[r.root,G.a.tabListHeader].join(" "),indicatorColor:"primary",children:c.map((function(e,a){return Object(O.jsx)(x.a,{label:Object(j.a)("ranking.tab.".concat(e[0])),value:e[0]},a)}))}),function(){var e=[Object(j.a)("ranking.table.rank"),Object(j.a)("ranking.table.player"),Object(j.a)("ranking.table.bets")];return c.map((function(a){return Object(O.jsx)(S,{value:a[0],children:Object(O.jsx)(J,{theadData:[].concat(e,[Object(j.a)("ranking.tab.".concat(a[0]))]),tbodyData:a[1]})},a[0])}))}()]})})},K=t(792),Q=t.n(K),V=[{value:"history",label:Object(j.a)("ranking.history.button")},{value:"24",label:Object(j.a)("ranking.hours.button")}],Y={profits:[],payouts:[],wagered:[],multipliers:[]};a.default=function(){Object(l.d)((function(e){return e.platform})).account;var e=Object(l.c)(),a=Object(o.useState)(Y),t=Object(r.a)(a,2),c=t[0],j=t[1],p=Object(o.useState)("24"),f=Object(r.a)(p,2),h=f[0],v=f[1],x=Object(o.useState)("profits"),m=Object(r.a)(x,2),_=m[0],C=m[1],k=Object(o.useState)(""),y=Object(r.a)(k,2),T=y[0],N=y[1],w=function(){var a=Object(n.a)(i.a.mark((function a(t){var n,r,c,o,l,u;return i.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return e(Object(s.b)(!0)),a.prev=1,a.next=4,("24"===t?d.d:d.e)();case 4:n=a.sent,r=n.data,c=r.profits,o=r.payouts,l=r.wagered,u=r.multipliers,j({profits:c,payouts:o,wagered:l,multipliers:u}),a.next=16;break;case 13:a.prev=13,a.t0=a.catch(1),N(a.t0.message);case 16:return a.prev=16,e(Object(s.b)(!1)),a.finish(16);case 19:case"end":return a.stop()}}),a,null,[[1,13,16,19]])})));return function(e){return a.apply(this,arguments)}}();return Object(o.useEffect)((function(){h&&w(h)}),[h]),T?Object(O.jsx)(u.a,{component:"p",align:"center",children:T}):Object(O.jsx)(o.Fragment,{children:Object(O.jsxs)(b.a,{container:!0,className:Q.a.container,children:[Object(O.jsx)(b.a,{item:!0,xs:12,children:Object(O.jsx)(g,{value:h,toggleOptions:V,onChange:function(e,a){v(a)}})}),Object(O.jsx)(b.a,{item:!0,xs:12,children:Object(O.jsx)(X,{data:c,onChangeTab:function(e,a){C(a)},selectedTab:_})})]})})}},558:function(e,a,t){"use strict";var n=t(399),r=t(1246),c=t(1207),i=t(1),o=Object(n.a)((function(e){return{toggle:{height:"44px",backgroundColor:"#1785eb",padding:"3px",borderRadius:"0","& .MuiButtonBase-root":{color:"#161e2f",backgroundColor:"#1785eb",borderRadius:"0",textTransform:"capitalize",fontWeight:"700"},"& .Mui-selected":{color:"#1785eb",backgroundColor:"#161e2f",pointerEvents:"none","&:hover":{backgroundColor:"#161e2f"}}}}}));a.a=function(e){var a=e.value,t=e.options,n=e.onChange,l=e.className,s=o();return Object(i.jsx)(r.a,{className:[s.toggle,l].join(" "),value:a,onChange:n,exclusive:!0,children:t.length&&t.map((function(e,a){var t=e.label,n=e.value;return Object(i.jsx)(c.a,{value:n,"aria-label":t,children:t},a)}))})}},789:function(e,a,t){e.exports={container:"Header_container__-EpSz",pageTitleWrapper:"Header_pageTitleWrapper__2RXxB",icon:"Header_icon__2t-RI",timer:"Header_timer__1uFpp",toggle:"Header_toggle__sI0wq"}},790:function(e,a,t){e.exports={container:"Table_container__31SUN",table:"Table_table__m9s7R",emptyData:"Table_emptyData__3jrEn"}},791:function(e,a,t){e.exports={tabListHeader:"Tabs_tabListHeader__12q6C"}},792:function(e,a,t){e.exports={container:"Challenge_container__3181p"}}}]);