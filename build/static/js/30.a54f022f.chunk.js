(this.webpackJsonpcoinica=this.webpackJsonpcoinica||[]).push([[30],{1028:function(e,t,a){e.exports={history_container:"History_history_container__WuJHq",text_win:"History_text_win__2aPuM",text_lose:"History_text_lose__P8mD4",color_red:"History_color_red__14C58",history_header:"History_history_header__2-B5L",history_content:"History_history_content__1zUzw",content_container:"History_content_container__2ZbVg",history_content_result:"History_history_content_result__mW6aX",history_content_rivals:"History_history_content_rivals__1c5oH",history_content_opened:"History_history_content_opened__2B1eE",opened_container:"History_opened_container__Z853U",history_footer:"History_history_footer__2rZ23"}},1029:function(e,t,a){},1144:function(e,t,a){"use strict";a.r(t);var n=a(602),r=a(118),s=a(35),c=a.n(s),i=a(60),o=a(19),l=a(6),u=a(0),d=a(711),m=a(45),p=a(30),j=a(114),h=a(527),_=a(528),b=a(512),g=a(487),x=a(480),O=a(484),y=a(462),v=a(530),f=a(1028),w=a.n(f),N=a(513),H=a(1),T=function(e){var t=e.data,a=t.id,n=t.user,r=t.date,s=t.winnings,c=t.isWin,i=t.rivals,o=t.openedGold,l=t.openedRivals,u=a?"".concat(a.substr(0,14),"..."):"Invalid ID",d=null!=r?"".concat(r.getMonth()+1,"/").concat(r.getDate(),"/").concat(r.getFullYear()," ").concat(r.getHours(),":").concat(r.getMinutes()):"Invalid Date";return Object(H.jsxs)("div",{className:w.a.history_container,children:[Object(H.jsxs)("div",{className:w.a.history_header,children:[Object(H.jsx)("span",{children:"TreasureHunt"}),Object(H.jsxs)("span",{children:["Player: ",n]}),Object(H.jsx)("span",{children:s})]}),Object(H.jsxs)("div",{className:w.a.history_content,children:[Object(H.jsxs)("div",{className:w.a.history_content_result,children:[Object(H.jsx)("small",{children:"Result"}),Object(H.jsx)("div",{className:"".concat(c?w.a.text_win:w.a.text_lose," ").concat(w.a.content_container),children:c?"WIN":"LOSE"})]}),Object(H.jsxs)("div",{className:w.a.history_content_rivals,children:[Object(H.jsx)("small",{children:"Rivals"}),Object(H.jsxs)("div",{className:w.a.content_container,children:[Object(H.jsx)("img",{src:N.j,alt:"rivals"}),Object(H.jsx)("span",{className:w.a.color_red,children:"x".concat(i)})]})]}),Object(H.jsxs)("div",{className:w.a.history_content_opened,children:[Object(H.jsx)("small",{children:"Opened"}),Object(H.jsxs)("div",{className:w.a.opened_container,children:[Object(H.jsxs)("div",{className:w.a.content_container,children:[Object(H.jsx)("img",{src:N.d,alt:"eos-coins"}),Object(H.jsx)("span",{children:"x".concat(o)})]}),Object(H.jsxs)("div",{className:w.a.content_container,children:[Object(H.jsx)("img",{src:N.j,alt:"rivals"}),Object(H.jsx)("span",{className:w.a.color_red,children:"x".concat(l)})]})]})]})]}),Object(H.jsxs)("div",{className:w.a.history_footer,children:[Object(H.jsx)("div",{children:d}),Object(H.jsxs)("div",{children:["TxID: ",u]})]})]})},S=a(529),k=a(121),B=a(140),C=a(54),P=(a(1029),function(e){var t=e.language,a=e.disabled,n=null;switch(t){case"ja":n=Object(H.jsx)("text",{fill:"#E6D9B0",xmlSpace:"preserve",style:{whiteSpace:"pre"},"font-family":"TH Primary","font-size":"30","letter-spacing":"0em",children:Object(H.jsx)("tspan",{x:"84",y:"54.11",children:"\u6b62\u307e\u308b"})});break;default:n=Object(H.jsx)("text",{fill:"#E6D9B0",xmlSpace:"preserve",style:{whiteSpace:"pre"},"font-family":"TH Primary","font-size":"50","letter-spacing":"0em",children:Object(H.jsx)("tspan",{x:"91",y:"60.35",children:"stop"})})}return Object(H.jsxs)("svg",{width:"257",height:"87",viewBox:"0 0 257 87",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[Object(H.jsx)("path",{d:"M244 7.5H12C9.51486 7.5 7.5 9.51486 7.5 12V74C7.5 76.4851 9.51486 78.5 12 78.5H244C246.485 78.5 248.5 76.4851 248.5 74V12C248.5 9.51486 246.485 7.5 244 7.5Z",fill:"#BE5050",stroke:"#987D58"}),Object(H.jsx)("path",{d:"M12 9.5H244C245.381 9.5 246.5 10.6194 246.5 12V74C246.5 75.3806 245.381 76.5 244 76.5H12C10.6194 76.5 9.5 75.3806 9.5 74V12C9.5 10.6194 10.6194 9.5 12 9.5Z",fill:"#BE5050",stroke:"#2F1B1B","stroke-width":"3"}),Object(H.jsx)("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M13 43H243V73H13V43Z",fill:"#901717"}),n,a?Object(H.jsx)("rect",{x:"11",y:"11",width:"234",height:"65",fill:"#9A8887","fill-opacity":"0.9"}):null]})}),E=a(511),A=a(10).e.assets_url,I=("".concat(A,"/imgs/games/treasurehunt_v3/main/bg_map.png"),"".concat(A,"/imgs/games/treasurehunt_v3/main/select_destination.png"),"".concat(A,"/imgs/games/treasurehunt_v3/main/btn_rules.png"),"".concat(A,"/imgs/games/treasurehunt_v3/main/btn_tutorial.png"),"".concat(A,"/imgs/games/treasurehunt_v3/main/btn_autoplay.png"),"".concat(A,"/imgs/games/treasurehunt_v3/main/logo.png"),"".concat(A,"/audio/games/treasurehunt/TH_sys1_01.mp3")),D="".concat(A,"/audio/games/treasurehunt/TH_sysSetSail_01.mp3"),z="".concat(A,"/audio/games/treasurehunt/TH_sysSelect_01.mp3"),M="".concat(A,"/audio/games/treasurehunt/TH_sysHome_01.mp3"),F=[{id:"MAP_A",pattern:[["A","B",0,0],["C","D",0,0],["E","F","G","H"],[0,"I","J",0],[0,"K","L","M"],["N","O","P",0]]},{id:"MAP_B",pattern:[["A","B",0,0],["C",0,0,0],["D","E","F","G"],["H","I","J",0],["K","L","M","N"],[0,"O","P",0]]},{id:"MAP_C",pattern:[["A","B",0,0],["C","D",0,0],["E","F","G",0],[0,"H","I",0],["J","K","L","M"],["N","O","P",0]]}],G=function(e){var t=e.param,a=e.isOpeningTile,n=e.orderOfPanelsToOpen,r=e.isGameEnd,s=null,c={},i=t?n.find((function(e){return e===function(e){if(e)return e.charCodeAt(0)-65}(t)})):null;return 0===i&&(i=1),r&&t?(c={background:"rgba(78,42,26,0.6)"},s=i?Object(H.jsx)("img",{src:E.t,alt:"P",className:"position-absolute"}):Object(H.jsx)("h1",{children:t})):t&&(a&&i?s=Object(H.jsx)(g.a,{animation:"grow",role:"status",children:Object(H.jsx)("span",{className:"sr-only",children:"Loading..."})}):a&&!i?s=Object(H.jsx)("h1",{children:t}):!a&&i&&(s=Object(H.jsx)("img",{src:E.t,alt:"P",className:"position-absolute"}))),Object(H.jsx)(b.a,{id:"tiles-".concat(t?1:0),className:!1===r?"tile-disabled":"",style:Object(l.a)({border:t?"3px solid #4e2a1a":""},c),xs:3,children:s})};t.default=Object(p.b)((function(e){return{platform:e.platform,treasurehunt:e.treasurehunt}}),(function(e){return{dispatch:e}}))((function(e){var t,a=e.platform,s=a.account,l=a.accountBalance,p=a.selectedCurrency,b=a.language,f=e.treasurehunt,w=null===s||void 0===s?void 0:s.username,N=null===s||void 0===s?void 0:s.user_game_id,A=Object(u.useState)({numOfGames:!1,minBalance:!1,maxBalance:!1}),L=Object(o.a)(A,2),W=L[0],q=L[1],V=Object(u.useState)(0),J=Object(o.a)(V,2),R=J[0],Z=J[1],U=Object(u.useState)(""),Y=Object(o.a)(U,2),K=Y[0],X=Y[1],Q=Object(u.useState)(!1),$=Object(o.a)(Q,2),ee=$[0],te=$[1],ae=Object(u.useState)(!1),ne=Object(o.a)(ae,2),re=ne[0],se=ne[1],ce=Object(u.useState)(0),ie=Object(o.a)(ce,2),oe=ie[0],le=ie[1],ue=Object(u.useState)(0),de=Object(o.a)(ue,2),me=de[0],pe=de[1],je=Object(u.useState)(0),he=Object(o.a)(je,2),_e=he[0],be=he[1],ge=Object(u.useState)([]),xe=Object(o.a)(ge,2),Oe=xe[0],ye=xe[1],ve=Object(u.useState)(0),fe=Object(o.a)(ve,2),we=fe[0],Ne=fe[1],He=Object(u.useState)(""),Te=Object(o.a)(He,2),Se=Te[0],ke=Te[1],Be=Object(u.useState)(!1),Ce=Object(o.a)(Be,2),Pe=Ce[0],Ee=Ce[1],Ae=Object(u.useState)(!1),Ie=Object(o.a)(Ae,2),De=Ie[0],ze=Ie[1],Me=Object(u.useState)({state:!1,title:"",subTitle:"",message:"",payload:""}),Fe=Object(o.a)(Me,2),Ge=Fe[0],Le=Fe[1],We=Object(u.useState)([]),qe=Object(o.a)(We,2),Ve=qe[0],Je=qe[1],Re=Object(u.useState)(0),Ze=Object(o.a)(Re,2),Ue=Ze[0],Ye=Ze[1],Ke=Object(u.useState)(0),Xe=Object(o.a)(Ke,2),Qe=Xe[0],$e=Xe[1],et=Object(u.useState)(0),tt=Object(o.a)(et,2),at=tt[0],nt=tt[1],rt=Object(u.useState)({state:!1,text:""}),st=Object(o.a)(rt,2),ct=st[0],it=st[1],ot=Object(u.useState)(0),lt=Object(o.a)(ot,2),ut=lt[0],dt=lt[1],mt=Object(y.a)(I,{volume:.5}),pt=Object(o.a)(mt,1)[0],jt=Object(y.a)(z,{volume:.5}),ht=Object(o.a)(jt,1)[0],_t=Object(y.a)(D,{volume:.5}),bt=Object(o.a)(_t,1)[0],gt=Object(y.a)(M,{volume:.5}),xt=Object(o.a)(gt,1)[0],Ot=F[ut];Object(u.useEffect)((function(){var t=(e.location.state||{}).autoplayParameters;if(t){var a=t.firstScreenState,n=a.destination,r=a.rivals,s=t.secondScreenState,c=s.numOfPanelsToOpen,i=s.orderOfPanelsToOpen,o=t.thirdScreenState,l=o.gamesPlayed,u=o.maxBalance,d=o.minBalance;Z(n),X(r),ye(i),nt(16-r-c);var m={numOfGames:!1,minBalance:!1,maxBalance:!1};l.selected&&""!==l.value&&(le(l.value),m.numOfGames=!0),u.selected&&""!==u.value&&(pe(u.value),m.maxBalance=!0),d.selected&&""!==d.value&&(be(d.value),m.minBalance=!0),q(m);var p=0;switch(n){case 1:p=0;break;case 10:p=1;break;case 20:p=2}dt(p)}else e.history.push("/game/treasurehunt/autoplay")}),[]),Object(u.useEffect)((function(){s&&N&&null!=l[p]&&(it({state:!0,text:""}),Object(S.f)(N).then((function(){var e;ke("".concat(null===(e=l[p])||void 0===e?void 0:e.amount," token")),it({state:!1,text:""}),se(!0)})))}),[s]);var yt=function(){var t=Object(i.a)(c.a.mark((function t(){return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(S.d)({id:N,username:w}).then((function(){e.dispatch(Object(k.b)({game_data:null,game_id:null,total_win:0,username:null})),it({state:!1,text:""}),Ee(!0),bt()})).catch((function(){j.b.error("Error encountered, try refreshing the page"),it({state:!1,text:""}),ze(!0)}));case 2:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();Object(u.useEffect)((function(){var t=f.game_data;re&&(null!==t?window.confirm("You have an existing game. Do you wish to continue?")?(it({state:!0,text:""}),yt()):e.history.push("/game/treasurehunt"):(Ee(!0),bt()))}),[re]);var vt=function(){var e=Object(i.a)(c.a.mark((function e(t){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(S.d)({id:N,username:t}).catch((function(e){Le({state:!0,title:Object(C.a)("th.autoplay.modal.error"),subTitle:Object(C.a)("th.autoplay.modal.sub_title"),message:Object(C.a)("th.autoplay.modal.message"),payload:"error"}),ze(!0)}));case 2:te(!0),ft(t);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),ft=function(){var e=Object(i.a)(c.a.mark((function e(t){var a;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,a={id:null,user:t,date:new Date,winnings:"",isWin:null,rivals:K,openedGold:0,openedRivals:0},e.next=4,Object(S.b)({id:N,destination:R,enemy_count:K,quantity:R,currency:p});case 4:return e.next=6,Object(S.a)({id:N,username:t,panelset:Oe});case 6:return e.next=8,Object(S.g)(N).then((function(e){var t="-".concat(R,".0000 Token");if(e.isWin&&null!=e.prize){var n=(+(e.prize||0)-R).toFixed(4);t="+".concat(n," Token"),0===Qe&&$e(+n)}a.id=null===e||void 0===e?void 0:e.gameId,a.openedRivals=null===e||void 0===e?void 0:e.loseCount,a.openedGold=null===e||void 0===e?void 0:e.winCount,a.winnings=t,a.isWin=null===e||void 0===e?void 0:e.isWin}));case 8:return e.next=10,Object(S.d)({id:N,username:t});case 10:return e.next=12,Object(S.f)(N);case 12:return e.next=14,Object(B.p)();case 14:te(!1),le((function(e){return e-1})),Ne((function(e){return e+1})),Je((function(e){return[].concat(Object(r.a)(e),[a])})),pt(),e.next=29;break;case 21:return e.prev=21,e.t0=e.catch(0),e.next=25,Object(S.d)({id:N,username:t}).catch((function(){j.b.warn("Sorry, there is an error occurred. Please try again"),Le({state:!0,title:Object(C.a)("th.autoplay.modal.error"),subTitle:Object(C.a)("th.autoplay.modal.sub_title"),message:Object(C.a)("th.autoplay.modal.message"),payload:"error"}),ze(!0),te(!1)}));case 25:j.b.warn("Sorry, there is an error occurred. Please try again"),Le({state:!0,title:Object(C.a)("th.autoplay.modal.error"),subTitle:Object(C.a)("th.autoplay.modal.sub_title"),message:Object(C.a)("th.autoplay.modal.message"),payload:"error"}),ze(!0),te(!1);case 29:return e.prev=29,it({state:!1,text:""}),e.finish(29);case 32:case"end":return e.stop()}}),e,null,[[0,21,29,32]])})));return function(t){return e.apply(this,arguments)}}();Object(u.useEffect)((function(){var t=f.game_data,a=e.platform.account,n=null===a||void 0===a?void 0:a.username;if(Pe){var r=function(){var e,t=null===(e=l[p])||void 0===e?void 0:e.amount;return t<R||null==t?{stopFlag:!0,stopParameter:"insufficientBalance"}:W.numOfGames&&0===oe?{stopFlag:!0,stopParameter:"numOfGames"}:W.minBalance&&t<=_e?{stopFlag:!0,stopParameter:"minBalance"}:W.maxBalance&&t>=me?{stopFlag:!0,stopParameter:"maxBalance"}:{stopFlag:!1,stopParameter:""}}();!1===r.stopFlag?null!==t?vt(n):(te(!0),ft(n)):(!function(e){var t={state:!0,title:Object(C.a)("th.autoplay.ended"),subTitle:Object(C.a)("th.autoplay.ended.sub.stop_params"),message:"",payload:"stop_parameter"};switch(e){case"numOfGames":t.message=Object(C.a)("th.autoplay.ended.num_of_games");break;case"minBalance":t.message=Object(C.a)("th.autoplay.ended.min_bal");break;case"maxBalance":t.message=Object(C.a)("th.autoplay.ended.max_bal");break;case"insufficientBalance":t.subTitle=Object(C.a)("th.autoplay.ended.sub.no_balance"),t.message=Object(C.a)("th.autoplay.ended.no_bal")}Le(t)}(r.stopParameter),ze(!0))}}),[Pe,we]),Object(u.useEffect)((function(){if(Ve.length){var e,t=0,a=Object(n.a)(Ve);try{for(a.s();!(e=a.n()).done;){t+=+ +(e.value.winnings+"").replace(" Token","")}}catch(r){a.e(r)}finally{a.f()}Ye(t)}}),[Ve]);var wt,Nt=function(){var e=Object(i.a)(c.a.mark((function e(){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:ht(),Ee(!1),ze(!0),j.b.info("Ending treasurehunt autoplay mode. If there is an in-game progress please wait the game to be finished.",{autoClose:!1});case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),Ht=function(){Le({state:!1,title:"",subTitle:"",message:"",payload:""})};return Object(H.jsxs)(u.Fragment,{children:[Object(H.jsx)(d.a,{children:Object(H.jsx)("title",{children:"Treasurehunt - Autoplay Mode"})}),Object(H.jsx)(v.a,{visible:ct.state,text:ct.text}),Object(H.jsxs)(x.a,{dialogClassName:"TreasurehuntAutoplayGameplay-Error-Modal",show:Ge.state,onHide:function(){return Ht()},backdrop:"static",keyboard:!1,children:[Object(H.jsx)(x.a.Header,{children:Object(H.jsx)(x.a.Title,{style:{margin:"0 auto"},children:Ge.title})}),Object(H.jsxs)(x.a.Body,{style:{textAlign:"center",padding:"20px"},children:[Object(H.jsx)("div",{children:Ge.subTitle}),Object(H.jsx)("div",{children:Ge.message})]}),Object(H.jsx)(x.a.Footer,{style:{justifyContent:"center"},children:"error"===Ge.payload?Object(H.jsxs)(H.Fragment,{children:[Object(H.jsx)(O.a,{variant:"secondary",onClick:function(){return Ht()},children:"Close"}),Object(H.jsx)(O.a,{variant:"primary",onClick:function(){return window.location.reload()},children:"Retry"})]}):Object(H.jsx)(O.a,{variant:"secondary",onClick:function(){return Ht()},children:"Close"})})]}),Object(H.jsxs)("div",{className:"gameplay-container row",style:{maxWidth:"1400px",margin:"0 auto",position:"relative"},children:[Object(H.jsx)("h2",{className:"text_th_primary title",style:{position:"absolute",backgroundImage:"linear-gradient(180deg, #d8091d, #e86370)",zIndex:10,left:De?"32%":"37%",top:"43%",fontSize:"4rem"},children:De?"AUTOPLAY MODE ENDED":"AUTOPLAY MODE"}),Object(H.jsx)("div",{className:"left-container col-md-3",children:Object(H.jsx)("div",{className:"left_wrapper",children:Object(H.jsxs)("div",{className:"left_nav_parent",children:[Object(H.jsxs)("div",{className:"left_nav",children:[Object(H.jsxs)("div",{style:{borderBottom:"1px solid #D8A764"},children:[Object(H.jsx)("div",{style:{marginBottom:"10px",fontSize:"2rem",lineHeight:"30px"},children:Object(H.jsxs)("div",{style:{display:"flex",justifyContent:"space-between"},children:[Object(H.jsx)("div",{children:Object(H.jsx)("span",{className:"".concat("ja"===b?"text_th_primary_jap":"text_th_primary"),children:Object(C.a)("th.selected_dest")})}),Object(H.jsx)("div",{style:{textAlign:"end"},children:Object(H.jsx)("span",{className:"".concat("ja"===b?"text_th_primary_jap":"text_th_primary"),children:"".concat(R," Token")})})]})}),Object(H.jsx)("div",{style:{margin:"10px 0px",fontSize:"2rem",lineHeight:"30px"},children:Object(H.jsxs)("div",{style:{display:"flex",justifyContent:"space-between"},children:[Object(H.jsx)("div",{children:Object(H.jsx)("span",{className:"".concat("ja"===b?"text_th_primary_jap":"text_th_primary"),children:Object(C.a)("th.selected_rivals")})}),Object(H.jsx)("div",{style:{textAlign:"end"},children:Object(H.jsx)("span",{className:"".concat("ja"===b?"text_th_primary_jap":"text_th_primary"),children:K})})]})}),Object(H.jsx)("div",{style:{margin:"10px 0px",fontSize:"2rem",lineHeight:"30px"},children:Object(H.jsxs)("div",{style:{display:"flex",justifyContent:"space-between"},children:[Object(H.jsxs)("span",{className:"".concat("ja"===b?"text_th_primary_jap":"text_th_primary"),style:{fontSize:"1.4rem"},children:[Object(C.a)("th.starting_bal"),": "," "]}),Object(H.jsx)("span",{className:"".concat("ja"===b?"text_th_primary_jap":"text_th_primary"),style:{fontSize:"1.4rem"},children:Se||"..."})]})})]}),Object(H.jsxs)("div",{children:[Object(H.jsx)("div",{className:"".concat("ja"===b?"text_th_primary_jap":"text_th_primary"),children:Object(C.a)("th.recent_history")}),Object(H.jsxs)("div",{className:"recent-history",children:[Ve.length?Ve.map((function(e,t){return Object(H.jsx)(T,{data:e},t)})):!1===ee&&Object(H.jsx)("div",{className:"".concat("ja"===b?"text_th_primary_jap":"text_th_primary"),style:{height:"100%",width:"100%",display:"flex",justifyContent:"center",alignItems:"center"},children:Object(H.jsx)("h2",{children:"No records"})}),ee&&Object(H.jsx)("div",{className:"recent_game_item_spinner",children:Object(H.jsx)(g.a,{animation:"border",role:"status",style:{color:"#D7A764"},children:Object(H.jsx)("span",{className:"sr-only",children:"Loading..."})})})]})]})]}),Object(H.jsx)("div",{className:"left_buttons",children:Object(H.jsx)(m.b,{to:"/game/treasurehunt",onClick:function(){return xt()},children:Object(H.jsx)("div",{className:"img-fluid home_btn"})})})]})})}),Object(H.jsx)("div",{className:"map-container col-md-6",children:Object(H.jsxs)("div",{id:"map-image-container",children:[Object(H.jsx)(h.a,{id:"tiles-container",className:"container-fluid",style:{position:"absolute",top:50,left:50,width:"80%",height:"90%"},children:null===Ot||void 0===Ot||null===(t=Ot.pattern)||void 0===t?void 0:t.map((function(e,t){return Object(H.jsx)(_.a,{id:"tiles-row",style:{height:"15.5%"},children:e.map((function(e,t){return Object(H.jsx)(G,{param:e,isOpeningTile:Pe,orderOfPanelsToOpen:Oe,isGameEnd:De},(null===Ot||void 0===Ot?void 0:Ot.id)+t)}))},t)}))}),Object(H.jsx)("img",{className:"h-100 img-fluid",src:(wt=ut,0===wt?E.o:1===wt?E.p:2===wt?E.q:void 0),alt:"Selected Map"})]})}),Object(H.jsx)("div",{className:"right-container col-md-3",children:Object(H.jsx)("div",{className:"right_wrapper",children:Object(H.jsxs)("div",{className:"right_details",children:[Object(H.jsxs)("div",{style:{borderBottom:"1px solid #D8A764",paddingBottom:"25px"},children:[Object(H.jsx)("span",{className:"".concat("ja"===b?"text_th_primary_jap":"text_th_primary"," stop_param_title"),children:Object(C.a)("th.remaining_games")}),Object(H.jsx)("div",{className:"stop_param_wrapper",children:Object(H.jsx)("span",{className:"".concat("ja"===b?"text_th_primary_jap":"text_th_primary"),style:W.numOfGames?{}:{backgroundImage:"linear-gradient(180deg, #715133, #543a21)"},children:W.numOfGames?oe:"Not set"})}),Object(H.jsx)("span",{className:"".concat("ja"===b?"text_th_primary_jap":"text_th_primary"," stop_param_title"),children:Object(C.a)("th.reach_max_bal")}),Object(H.jsx)("div",{className:"stop_param_wrapper",children:Object(H.jsx)("span",{className:"".concat("ja"===b?"text_th_primary_jap":"text_th_primary"),style:W.maxBalance?{}:{backgroundImage:"linear-gradient(180deg, #715133, #543a21)"},children:W.maxBalance?"".concat(me," Token"):"Not set"})}),Object(H.jsx)("span",{className:"".concat("ja"===b?"text_th_primary_jap":"text_th_primary"," stop_param_title"),children:Object(C.a)("th.reach_min_bal")}),Object(H.jsx)("div",{className:"stop_param_wrapper",children:Object(H.jsx)("span",{className:"".concat("ja"===b?"text_th_primary_jap":"text_th_primary"),style:W.minBalance?{}:{backgroundImage:"linear-gradient(180deg, #715133, #543a21)"},children:W.minBalance?"".concat(_e," Token"):"Not set"})})]}),Object(H.jsxs)("div",{className:"winnings_detail",children:[Object(H.jsxs)("div",{style:{padding:"10px 0px"},children:[Object(H.jsxs)("div",{style:{maxHeight:"85px"},children:[Object(H.jsx)("span",{className:"".concat("ja"===b?"text_th_primary_jap":"text_th_primary"," title"),children:Object(C.a)("th.gameplay.current_winnings")}),Object(H.jsxs)("div",{className:"value_wrapper",children:[Object(H.jsx)("span",{className:"".concat("ja"===b?"text_th_primary_jap":"text_th_primary"," value"),children:Ue.toFixed(4)}),Object(H.jsx)("span",{className:"".concat("ja"===b?"text_th_primary_jap":"text_th_primary"," value_unit"),children:"Token"})]})]}),Object(H.jsxs)("div",{style:{maxHeight:"85px"},children:[Object(H.jsx)("span",{className:"".concat("ja"===b?"text_th_primary_jap":"text_th_primary"," title"),children:Object(C.a)("th.gameplay.next_win")}),Object(H.jsxs)("div",{className:"value_wrapper",children:[Object(H.jsx)("span",{className:"".concat("ja"===b?"text_th_primary_jap":"text_th_primary"," value"),children:Qe.toFixed(4)}),Object(H.jsx)("span",{className:"".concat("ja"===b?"text_th_primary_jap":"text_th_primary"," value_unit"),children:"Token"})]})]}),Object(H.jsxs)("div",{style:{maxHeight:"85px"},children:[Object(H.jsx)("span",{className:"".concat("ja"===b?"text_th_primary_jap":"text_th_primary"," title"),children:Object(C.a)("th.gameplay.odds")}),Object(H.jsx)("div",{className:"value_wrapper",children:Object(H.jsx)("span",{className:"".concat("ja"===b?"text_th_primary_jap":"text_th_primary"," title"),style:{backgroundImage:"linear-gradient(rgb(113, 81, 51), rgb(84, 58, 33))"},children:Object(C.a)("th.autoplaymode")})})]}),Object(H.jsxs)("div",{style:{maxHeight:"85px"},children:[Object(H.jsx)("span",{className:"".concat("ja"===b?"text_th_primary_jap":"text_th_primary"," title"),children:Object(C.a)("th.gameplay.remaining_treasure")}),Object(H.jsx)("div",{className:"value_wrapper",children:Object(H.jsx)("span",{className:"".concat("ja"===b?"text_th_primary_jap":"text_th_primary"," value"),children:at})})]})]}),Object(H.jsx)("div",{className:"stop_btn_wrapper",children:Pe?De&&Pe?Object(H.jsx)("div",{className:"hover-disable",children:Object(H.jsx)(P,{language:b,disabled:!0})}):Object(H.jsx)("div",{className:"hover-cursor",onClick:function(){return Nt()},children:Object(H.jsx)(P,{language:b,disabled:!1})}):Object(H.jsx)("div",{className:"hover-disable",children:Object(H.jsx)(P,{language:b,disabled:!0})})})]})]})})})]})]})}))},511:function(e,t,a){"use strict";a.d(t,"x",(function(){return r})),a.d(t,"v",(function(){return s})),a.d(t,"z",(function(){return c})),a.d(t,"y",(function(){return i})),a.d(t,"w",(function(){return o})),a.d(t,"A",(function(){return l})),a.d(t,"r",(function(){return u})),a.d(t,"m",(function(){return d})),a.d(t,"B",(function(){return m})),a.d(t,"s",(function(){return p})),a.d(t,"n",(function(){return j})),a.d(t,"C",(function(){return h})),a.d(t,"o",(function(){return _})),a.d(t,"p",(function(){return b})),a.d(t,"q",(function(){return g})),a.d(t,"D",(function(){return x})),a.d(t,"u",(function(){return O})),a.d(t,"t",(function(){return y})),a.d(t,"E",(function(){return v})),a.d(t,"a",(function(){return f})),a.d(t,"b",(function(){return w})),a.d(t,"c",(function(){return N})),a.d(t,"l",(function(){return H})),a.d(t,"j",(function(){return T})),a.d(t,"i",(function(){return S})),a.d(t,"h",(function(){return k})),a.d(t,"k",(function(){return B})),a.d(t,"d",(function(){return C})),a.d(t,"e",(function(){return P})),a.d(t,"f",(function(){return E})),a.d(t,"g",(function(){return A}));var n=a(10).e.assets_url,r="".concat(n,"/imgs/games/treasurehunt_v3/gameplay/step1/1eos.png"),s="".concat(n,"/imgs/games/treasurehunt_v3/gameplay/step1/10eos.png"),c="".concat(n,"/imgs/games/treasurehunt_v3/gameplay/step1/20eos.png"),i="".concat(n,"/imgs/games/treasurehunt_v3/gameplay/step1/1eos_active.png"),o="".concat(n,"/imgs/games/treasurehunt_v3/gameplay/step1/10eos_active.png"),l="".concat(n,"/imgs/games/treasurehunt_v3/gameplay/step1/20eos_active.png"),u="".concat(n,"/imgs/games/treasurehunt_v3/gameplay/step2/1rival.png"),d="".concat(n,"/imgs/games/treasurehunt_v3/gameplay/step2/5rivals.png"),m="".concat(n,"/imgs/games/treasurehunt_v3/gameplay/step2/10rivals.png"),p="".concat(n,"/imgs/games/treasurehunt_v3/gameplay/step2/1rival_active.png"),j="".concat(n,"/imgs/games/treasurehunt_v3/gameplay/step2/5rivals_active.png"),h="".concat(n,"/imgs/games/treasurehunt_v3/gameplay/step2/10rivals_active.png"),_=("".concat(n,"/imgs/games/treasurehunt_v3/gameplay/game_start.png"),"".concat(n,"/imgs/games/treasurehunt_v3/gameplay/game_started.png"),"".concat(n,"/imgs/games/treasurehunt_v3/gameplay/withdraw.png"),"".concat(n,"/imgs/games/treasurehunt_v3/gameplay/withdraw_gray.png"),"".concat(n,"/imgs/games/treasurehunt_v3/gameplay/maps/map_a.png")),b="".concat(n,"/imgs/games/treasurehunt_v3/gameplay/maps/map_b.png"),g="".concat(n,"/imgs/games/treasurehunt_v3/gameplay/maps/map_c.png"),x="".concat(n,"/imgs/games/treasurehunt_v3/gameplay/rewards/tile_treasure.png"),O="".concat(n,"/imgs/games/treasurehunt_v3/gameplay/rewards/tile_pirates.png"),y="".concat(n,"/imgs/games/treasurehunt_v3/gameplay/rewards/pirateflag.png"),v=("".concat(n,"/imgs/games/treasurehunt_v3/autoplay/stop_btn.png"),"".concat(n,"/imgs/games/treasurehunt_v3/autoplay/stopped_btn.png"),"".concat(n,"/imgs/games/Treasurehunt/gamelogo.png")),f="".concat(n,"/audio/games/treasurehunt/TH_selectdesA_01.mp3"),w="".concat(n,"/audio/games/treasurehunt/TH_selectdesB_01.mp3"),N="".concat(n,"/audio/games/treasurehunt/TH_selectdesC_01.mp3"),H="".concat(n,"/audio/games/treasurehunt/TH_sys1_01.mp3"),T="".concat(n,"/audio/games/treasurehunt/TH_sysError_01.mp3"),S="".concat(n,"/audio/games/treasurehunt/TH_sysSetSail_01.mp3"),k="".concat(n,"/audio/games/treasurehunt/TH_sysSelect_01.mp3"),B="".concat(n,"/audio/games/treasurehunt/TH_sysHome_01.mp3"),C="".concat(n,"/audio/games/treasurehunt/TH_Hit2_01.mp3"),P="".concat(n,"/audio/games/treasurehunt/TH_Hit3_01.mp3"),E="".concat(n,"/audio/games/treasurehunt/TH_Miss.mp3"),A="".concat(n,"/audio/games/treasurehunt/TH_opne_01.mp3")},513:function(e,t,a){"use strict";a.d(t,"k",(function(){return r})),a.d(t,"e",(function(){return s})),a.d(t,"f",(function(){return c})),a.d(t,"g",(function(){return i})),a.d(t,"h",(function(){return o})),a.d(t,"i",(function(){return l})),a.d(t,"j",(function(){return u})),a.d(t,"d",(function(){return d})),a.d(t,"b",(function(){return m})),a.d(t,"c",(function(){return p})),a.d(t,"a",(function(){return j}));var n=a(10).e.assets_url,r="".concat(n,"/imgs/games/treasurehunt_v3/autoplay/autoplay.png"),s="".concat(n,"/imgs/games/treasurehunt_v3/autoplay/step_progress_01.png"),c="".concat(n,"/imgs/games/treasurehunt_v3/autoplay/step_progress_02.png"),i="".concat(n,"/imgs/games/treasurehunt_v3/autoplay/step_progress_03.png"),o="".concat(n,"/imgs/games/treasurehunt_v3/autoplay/step_progress_04.png"),l="".concat(n,"/imgs/games/treasurehunt_v3/gameplay/maps/step3_setorder.png"),u=("".concat(n,"/imgs/games/treasurehunt_v3/autoplay/btn_change.png"),"".concat(n,"/imgs/games/treasurehunt_v3/autoplay/skull.png")),d="".concat(n,"/imgs/games/treasurehunt_v3/autoplay/coins.png"),m="".concat(n,"/audio/games/treasurehunt/TH_sys1_01.mp3"),p="".concat(n,"/audio/games/treasurehunt/TH_sysNo_01.mp3"),j="".concat(n,"/audio/games/treasurehunt/TH_sysSelect_01.mp3")},529:function(e,t,a){"use strict";a.d(t,"f",(function(){return j})),a.d(t,"g",(function(){return h})),a.d(t,"e",(function(){return _})),a.d(t,"b",(function(){return b})),a.d(t,"d",(function(){return g})),a.d(t,"c",(function(){return x})),a.d(t,"a",(function(){return O}));var n=a(35),r=a.n(n),s=a(60),c=a(141),i=a.n(c),o=a(10),l=a(98),u=a(17),d=a(121),m="".concat(o.e.protocol,"://").concat(o.e.host,"/donut/api/v1/game/treasurehunt"),p=function(e){var t=e.id,a=Object(u.b)(),n={id:t};return i.a.get("".concat(m,"/game/data"),{headers:a,params:n})},j=function(){var e=Object(s.a)(r.a.mark((function e(t){var a,n;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,p(t);case 3:a=e.sent,n=a.data,console.log("ID: ",t," with table data: ",n),n?l.b.dispatch(Object(d.b)({id:null===n||void 0===n?void 0:n.game_id,game_data:n})):l.b.dispatch(Object(d.b)({id:null,game_data:null})),e.next=11;break;case 9:e.prev=9,e.t0=e.catch(0);case 11:case"end":return e.stop()}}),e,null,[[0,9]])})));return function(t){return e.apply(this,arguments)}}(),h=function(){var e=Object(s.a)(r.a.mark((function e(t){var a,n,s,c,i,o,u,m;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a={gameId:null,winCount:null,loseCount:null,isLose:null,prize:null},e.prev=1,e.next=4,p(t);case 4:if(n=e.sent,!(s=n.data)){e.next=20;break}if(c=s.game_id,i=s.panel_set,o=s.win_count,u=s.prize,m=i.filter((function(e){return 1===e.isopen&&0===e.iswin})).length){e.next=12;break}return e.next=12,_({id:t});case 12:a.gameId=c,a.winCount=o||0,a.loseCount=m||0,a.isWin=0===m,a.prize=u,l.b.dispatch(Object(d.b)({id:null===s||void 0===s?void 0:s.game_id,game_data:s})),e.next=21;break;case 20:l.b.dispatch(Object(d.b)({id:null,game_data:null}));case 21:return e.abrupt("return",a);case 24:return e.prev=24,e.t0=e.catch(1),e.abrupt("return",a);case 27:case"end":return e.stop()}}),e,null,[[1,24]])})));return function(t){return e.apply(this,arguments)}}(),_=function(e){var t=e.id,a=Object(u.b)(),n={id:t};return i.a.get("".concat(m,"/withdraw"),{headers:a,params:n})},b=function(e){e.id;var t=e.destination,a=e.enemy_count,n=e.quantity,r=e.currency,s=Object(u.b)(),c={destination:t,enemy:a,quantity:n,currency:(r+"").toUpperCase()};return i.a.post("".concat(m,"/init"),c,{headers:s})},g=function(e){var t=e.id,a=e.username,n=Object(u.b)(),r={id:t,username:a};return i.a.get("".concat(m,"/quit"),{headers:n,params:r})},x=function(e){var t=e.id,a=e.username,n=e.index,r=Object(u.b)(),s={id:t,username:a,tile:n};return i.a.post("".concat(m,"/opentile"),s,{headers:r})},O=function(e){var t=e.id,a=e.username,n=e.panelset,r=Object(u.b)(),s={id:t,username:a,sets:n};return i.a.post("".concat(m,"/autoplay"),s,{headers:r})}},530:function(e,t,a){"use strict";var n=a(6),r=(a(0),a(1));t.a=function(e){var t=e.visible,a=void 0!==t&&t,s=e.text,c=e.style;return Object(r.jsx)("div",{style:Object(n.a)({display:a?"flex":"none",marginLeft:"-15px",height:"92%",width:"100%",position:"absolute",justifyContent:"center",alignItems:"center",zIndex:998,background:"rgba(0, 0, 0, 0.5)"},c),children:Object(r.jsxs)("div",{className:"row m-auto",style:{color:"#fff"},children:[Object(r.jsx)("div",{className:"spinner-grow",role:"status"}),Object(r.jsx)("span",{className:"pl-3 text-black",children:s||"Loading..."})]})})}},602:function(e,t,a){"use strict";a.d(t,"a",(function(){return r}));var n=a(123);function r(e,t){var a;if("undefined"===typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(a=Object(n.a)(e))||t&&e&&"number"===typeof e.length){a&&(e=a);var r=0,s=function(){};return{s:s,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:s}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var c,i=!0,o=!1;return{s:function(){a=e[Symbol.iterator]()},n:function(){var e=a.next();return i=e.done,e},e:function(e){o=!0,c=e},f:function(){try{i||null==a.return||a.return()}finally{if(o)throw c}}}}}}]);