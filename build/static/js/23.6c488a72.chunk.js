(this.webpackJsonpcoinica=this.webpackJsonpcoinica||[]).push([[23],{1185:function(e,t,n){"use strict";n.r(t);var a=n(113),c=n(50),i=n.n(c),r=n(71),s=n(18),l=n(0),o=n(26),d=n(173),j=n(137),x=n(509),b=n(139),g=n(62),u=n(573),p=n(780),h=n.n(p),m=n(1),f=function(){return Object(m.jsxs)("svg",{width:"38",height:"32",viewBox:"0 0 38 32",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[Object(m.jsx)("path",{d:"M8.09844 0.333252L0.666992 7.02456L2.89743 9.50171L10.3289 2.8104L8.09844 0.333252Z",fill:"#4671F1"}),Object(m.jsx)("path",{d:"M17.3337 10.3333H20.667V16.9999H25.667V20.3333H17.3337V10.3333Z",fill:"#4671F1"}),Object(m.jsx)("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M4.00033 16.9999C4.00033 8.71565 10.7161 1.99992 19.0003 1.99992C27.2846 1.99992 34.0003 8.71565 34.0003 16.9999C34.0003 25.2842 27.2846 31.9999 19.0003 31.9999C10.7161 31.9999 4.00033 25.2842 4.00033 16.9999ZM7.33366 16.9999C7.33366 10.5566 12.557 5.33325 19.0003 5.33325C25.4436 5.33325 30.667 10.5566 30.667 16.9999C30.667 23.4432 25.4436 28.6666 19.0003 28.6666C12.557 28.6666 7.33366 23.4432 7.33366 16.9999Z",fill:"#4671F1"}),Object(m.jsx)("path",{d:"M29.9022 0.333252L37.3337 7.02456L35.1032 9.50171L27.6718 2.8104L29.9022 0.333252Z",fill:"#4671F1"})]})},O=function(e){var t=e.value,n=e.toggleOptions,a=e.onChange;return Object(m.jsxs)("div",{className:h.a.container,children:[Object(m.jsxs)("div",{className:h.a.pageTitleWrapper,children:[Object(m.jsx)(j.a,{component:"h1",variant:"h4",children:Object(g.a)("challenge.title")}),Object(m.jsxs)("div",{className:h.a.icon,children:[Object(m.jsx)(f,{}),Object(m.jsx)("div",{className:h.a.timer,children:"21:02:24"})]})]}),Object(m.jsx)(u.a,{className:h.a.toggle,value:t,options:n,onChange:a})]})},v=n(456),_=n(781),y=n.n(_),w=n(10).e.assets_url,C=["".concat(w,"/imgs/platform/challenge/trophy_gold.png"),"".concat(w,"/imgs/platform/challenge/trophy_silver.png"),"".concat(w,"/imgs/platform/challenge/trophy_bronze.png")],N=function(e){var t=e.playerName,n=e.points,a=e.index;return Object(m.jsxs)("div",{className:y.a.container,children:[Object(m.jsx)(v.a,{variant:"square",className:y.a.avatarBg}),Object(m.jsxs)("div",{className:y.a.playerPoints,children:[Object(m.jsx)("div",{children:t||"---"}),Object(m.jsx)("div",{children:n||0})]}),Object(m.jsx)("img",{className:y.a.trophy,alt:"trophy",src:C[a]})]})},S=n(782),M=n.n(S),W=function(e){var t=e.data;return Object(m.jsx)("div",{className:M.a.container,children:t.length&&t.map((function(e,t){var n=e.username,a=e.points;return Object(m.jsx)(N,{playerName:n,points:a,index:t},t)}))})},k=n(570),B=n(571),L=n(567),H=n(249),T=n(568),z=n(569),D=n(572),R=n(783),P=n.n(R),I=function(e){var t=e.data;return Object(m.jsx)(L.a,{className:P.a.container,component:H.a,children:Object(m.jsxs)(T.a,{className:P.a.table,"aria-label":"leader-board-table",children:[Object(m.jsx)(z.a,{children:Object(m.jsxs)(k.a,{children:[Object(m.jsx)(B.a,{align:"center",children:Object(g.a)("challenge.table.rank")}),Object(m.jsx)(B.a,{align:"center",children:Object(g.a)("challenge.table.player")}),Object(m.jsx)(B.a,{align:"center",children:Object(g.a)("challenge.table.bets")}),Object(m.jsx)(B.a,{align:"center",children:Object(g.a)("challenge.table.payouts")}),Object(m.jsx)(B.a,{align:"center",children:Object(g.a)("challenge.table.ratio")}),Object(m.jsx)(B.a,{align:"center",children:Object(g.a)("challenge.table.vip_points")})]})}),Object(m.jsx)(D.a,{children:t.length?t.map((function(e,t){return Object(m.jsxs)(k.a,{children:[Object(m.jsx)(B.a,{align:"center",children:t+1}),Object(m.jsx)(B.a,{align:"center",children:e.username||"---"}),Object(m.jsx)(B.a,{align:"center",children:e.bets}),Object(m.jsx)(B.a,{align:"center",children:e.wagered}),Object(m.jsx)(B.a,{align:"center",children:e.ratio}),Object(m.jsx)(B.a,{align:"center",children:e.points})]},t)})):Object(m.jsx)(k.a,{children:Object(m.jsx)(B.a,{colSpan:6,className:P.a.emptyData,children:Object(g.a)("misc.noAvailableData")})})})]})})},Z=[{id:1,min:"0",max:"1000"},{id:2,min:"1,001",max:"10,000"},{id:3,min:"10,001",max:"50,000"},{id:4,min:"50,000",max:"100,000"},{id:5,min:"100,001",max:"150,000"},{id:6,min:"150,001",max:"250,000"},{id:7,min:"250,001+"}],E=n(784),F=n.n(E),A=function(){return Object(m.jsxs)("div",{className:F.a.container,children:[Object(m.jsx)(j.a,{component:"h2",variant:"h4",className:F.a.title,children:Object(g.a)("challenge.payout.title")}),Object(m.jsx)(x.a,{container:!0,spacing:2,children:Z.map((function(e,t){return Object(m.jsxs)(x.a,{item:!0,xs:12,sm:6,md:4,children:[Object(m.jsxs)("div",{className:F.a.id,children:[Object(g.a)("challenge.payout.reward")," ",e.id,":"]}),Object(m.jsxs)("div",{className:F.a.minMax,children:[" ",e.min," ",e.max?"- "+e.max:""]})]},t)}))})]})},G=n(785),V=n.n(G),q=[{value:"yesterday",label:Object(g.a)("challenge.yesterday.button")},{value:"today",label:Object(g.a)("challenge.today.button")}];t.default=function(){Object(o.d)((function(e){return e.platform})).account;var e=Object(o.c)(),t=Object(l.useState)([]),n=Object(s.a)(t,2),c=n[0],g=n[1],u=Object(l.useState)("yesterday"),p=Object(s.a)(u,2),h=p[0],f=p[1],v=Object(l.useState)(""),_=Object(s.a)(v,2),y=_[0],w=_[1],C=function(){var t=Object(r.a)(i.a.mark((function t(n){var a;return i.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e(Object(d.b)(!0)),t.prev=1,t.next=4,("yesterday"===n?b.c:b.b)();case 4:a=t.sent,g(a.data),t.next=11;break;case 8:t.prev=8,t.t0=t.catch(1),w(t.t0.message);case 11:return t.prev=11,e(Object(d.b)(!1)),t.finish(11);case 14:case"end":return t.stop()}}),t,null,[[1,8,11,14]])})));return function(e){return t.apply(this,arguments)}}();return Object(l.useEffect)((function(){h&&C(h)}),[h]),y?Object(m.jsx)(j.a,{component:"p",align:"center",children:y}):Object(m.jsx)(l.Fragment,{children:Object(m.jsxs)(x.a,{container:!0,className:V.a.container,children:[Object(m.jsx)(x.a,{item:!0,xs:12,children:Object(m.jsx)(O,{value:h,toggleOptions:q,onChange:function(e,t){f(t)}})}),Object(m.jsx)(x.a,{item:!0,xs:12,children:Object(m.jsx)(W,{data:function(){if(c.length){var e=c.slice(0,3);return e.length<3?[].concat(Object(a.a)(e),Object(a.a)(new Array(3-e.length).fill({}))):e}return new Array(3).fill({})}()})}),Object(m.jsx)(x.a,{item:!0,xs:12,children:Object(m.jsx)(I,{data:c})}),Object(m.jsx)(x.a,{item:!0,xs:12,children:Object(m.jsx)(A,{})})]})})}},509:function(e,t,n){"use strict";var a=n(4),c=n(2),i=n(0),r=(n(3),n(6)),s=n(8),l=[0,1,2,3,4,5,6,7,8,9,10],o=["auto",!0,1,2,3,4,5,6,7,8,9,10,11,12];function d(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,n=parseFloat(e);return"".concat(n/t).concat(String(e).replace(String(n),"")||"px")}var j=i.forwardRef((function(e,t){var n=e.alignContent,s=void 0===n?"stretch":n,l=e.alignItems,o=void 0===l?"stretch":l,d=e.classes,j=e.className,x=e.component,b=void 0===x?"div":x,g=e.container,u=void 0!==g&&g,p=e.direction,h=void 0===p?"row":p,m=e.item,f=void 0!==m&&m,O=e.justify,v=e.justifyContent,_=void 0===v?"flex-start":v,y=e.lg,w=void 0!==y&&y,C=e.md,N=void 0!==C&&C,S=e.sm,M=void 0!==S&&S,W=e.spacing,k=void 0===W?0:W,B=e.wrap,L=void 0===B?"wrap":B,H=e.xl,T=void 0!==H&&H,z=e.xs,D=void 0!==z&&z,R=e.zeroMinWidth,P=void 0!==R&&R,I=Object(a.a)(e,["alignContent","alignItems","classes","className","component","container","direction","item","justify","justifyContent","lg","md","sm","spacing","wrap","xl","xs","zeroMinWidth"]),Z=Object(r.a)(d.root,j,u&&[d.container,0!==k&&d["spacing-xs-".concat(String(k))]],f&&d.item,P&&d.zeroMinWidth,"row"!==h&&d["direction-xs-".concat(String(h))],"wrap"!==L&&d["wrap-xs-".concat(String(L))],"stretch"!==o&&d["align-items-xs-".concat(String(o))],"stretch"!==s&&d["align-content-xs-".concat(String(s))],"flex-start"!==(O||_)&&d["justify-content-xs-".concat(String(O||_))],!1!==D&&d["grid-xs-".concat(String(D))],!1!==M&&d["grid-sm-".concat(String(M))],!1!==N&&d["grid-md-".concat(String(N))],!1!==w&&d["grid-lg-".concat(String(w))],!1!==T&&d["grid-xl-".concat(String(T))]);return i.createElement(b,Object(c.a)({className:Z,ref:t},I))})),x=Object(s.a)((function(e){return Object(c.a)({root:{},container:{boxSizing:"border-box",display:"flex",flexWrap:"wrap",width:"100%"},item:{boxSizing:"border-box",margin:"0"},zeroMinWidth:{minWidth:0},"direction-xs-column":{flexDirection:"column"},"direction-xs-column-reverse":{flexDirection:"column-reverse"},"direction-xs-row-reverse":{flexDirection:"row-reverse"},"wrap-xs-nowrap":{flexWrap:"nowrap"},"wrap-xs-wrap-reverse":{flexWrap:"wrap-reverse"},"align-items-xs-center":{alignItems:"center"},"align-items-xs-flex-start":{alignItems:"flex-start"},"align-items-xs-flex-end":{alignItems:"flex-end"},"align-items-xs-baseline":{alignItems:"baseline"},"align-content-xs-center":{alignContent:"center"},"align-content-xs-flex-start":{alignContent:"flex-start"},"align-content-xs-flex-end":{alignContent:"flex-end"},"align-content-xs-space-between":{alignContent:"space-between"},"align-content-xs-space-around":{alignContent:"space-around"},"justify-content-xs-center":{justifyContent:"center"},"justify-content-xs-flex-end":{justifyContent:"flex-end"},"justify-content-xs-space-between":{justifyContent:"space-between"},"justify-content-xs-space-around":{justifyContent:"space-around"},"justify-content-xs-space-evenly":{justifyContent:"space-evenly"}},function(e,t){var n={};return l.forEach((function(a){var c=e.spacing(a);0!==c&&(n["spacing-".concat(t,"-").concat(a)]={margin:"-".concat(d(c,2)),width:"calc(100% + ".concat(d(c),")"),"& > $item":{padding:d(c,2)}})})),n}(e,"xs"),e.breakpoints.keys.reduce((function(t,n){return function(e,t,n){var a={};o.forEach((function(e){var t="grid-".concat(n,"-").concat(e);if(!0!==e)if("auto"!==e){var c="".concat(Math.round(e/12*1e8)/1e6,"%");a[t]={flexBasis:c,flexGrow:0,maxWidth:c}}else a[t]={flexBasis:"auto",flexGrow:0,maxWidth:"none"};else a[t]={flexBasis:0,flexGrow:1,maxWidth:"100%"}})),"xs"===n?Object(c.a)(e,a):e[t.breakpoints.up(n)]=a}(t,e,n),t}),{}))}),{name:"MuiGrid"})(j);t.a=x},573:function(e,t,n){"use strict";var a=n(402),c=n(1202),i=n(1163),r=n(1),s=Object(a.a)((function(e){return{toggle:{height:"44px",backgroundColor:"#1785eb",padding:"3px",borderRadius:"0","& .MuiButtonBase-root":{color:"#161e2f",backgroundColor:"#1785eb",borderRadius:"0",textTransform:"capitalize",fontWeight:"700"},"& .Mui-selected":{color:"#1785eb",backgroundColor:"#161e2f",pointerEvents:"none","&:hover":{backgroundColor:"#161e2f"}}}}}));t.a=function(e){var t=e.value,n=e.options,a=e.onChange,l=e.className,o=s();return Object(r.jsx)(c.a,{className:[o.toggle,l].join(" "),value:t,onChange:a,exclusive:!0,children:n.length&&n.map((function(e,t){var n=e.label,a=e.value;return Object(r.jsx)(i.a,{value:a,"aria-label":n,children:n},t)}))})}},780:function(e,t,n){e.exports={container:"Header_container__2dKxz",pageTitleWrapper:"Header_pageTitleWrapper__1ZH5E",icon:"Header_icon__2a5g1",timer:"Header_timer__CM98H",toggle:"Header_toggle__3ZDkd"}},781:function(e,t,n){e.exports={container:"Place_container__PmAxR",avatarBg:"Place_avatarBg__sVPaH",playerPoints:"Place_playerPoints__qG8hy",trophy:"Place_trophy__ql5hd"}},782:function(e,t,n){e.exports={container:"TopThree_container__3tzp3"}},783:function(e,t,n){e.exports={container:"LeaderBoardTable_container__LYBeA",table:"LeaderBoardTable_table__3DTDh",emptyData:"LeaderBoardTable_emptyData__w4ciL"}},784:function(e,t,n){e.exports={container:"Rewards_container__3tchk",title:"Rewards_title__3wI_4",id:"Rewards_id__3sT67",minMax:"Rewards_minMax__QksH4"}},785:function(e,t,n){e.exports={container:"Challenge_container__3xWB-"}}}]);