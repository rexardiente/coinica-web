(this.webpackJsonpcoinica=this.webpackJsonpcoinica||[]).push([[0],{167:function(e,t,a){e.exports={wrapper:"Layout_wrapper__xHexd",content_container:"Layout_content_container__1qlPw"}},177:function(e,t,a){e.exports={coinica_footer:"Footer_coinica_footer__3Ljvk"}},178:function(e,t,a){e.exports={page_content:"PageContent_page_content__1wYlJ"}},201:function(e,t,a){},222:function(e,t){},227:function(e,t){},229:function(e,t){},239:function(e,t){},241:function(e,t){},310:function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),r=a(10),o=a.n(r),i=a(180),s=a(179),l=a(162),u=a.n(l),d=a(163),O=a.n(d),j=a(24),b=a(111),g=a(164),_=a.n(g),p=a(165),E=a(20),T=a(85),h=a(2),S="GHOST_QUEST/SET_DATA",A="GHOST_QUEST/SET_VOLUME",f="GHOST_QUEST/SET_GAME_HISTORY",w="GHOST_QUEST/UPDATE_GAME_HISTORY",m="GHOST_QUEST/UPDATE_IN_BATTLE_LIST",v="GHOST_QUEST/UPDATE_BATTLE_END_LIST",L="GHOST_QUEST/UPDATE_RANKING_LIST",x=localStorage.getItem("GQ_GAME_VOLUME");null===x&&localStorage.setItem("GQ_GAME_VOLUME",1);var y={game_data:null,username:null,volume:parseInt(x),game_history:[],in_battle_list:[],battle_end_list:[],"earnings-daily":[],"earnings-weekly":[],"earnings-lifetime":[],"win-daily":[],"win-weekly":[],"win-lifetime":[]},R=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:y,t=arguments.length>1?arguments[1]:void 0,a=t.type,n=t.payload;switch(a){case S:return Object(h.a)(Object(h.a)({},e),{},{game_data:n.game_data});case A:var c=parseInt(n.volume);return localStorage.setItem("GQ_GAME_VOLUME",c),Object(h.a)(Object(h.a)({},e),{},{volume:c});case f:return Object(h.a)(Object(h.a)({},e),{},{game_history:n.game_history});case w:var r=n.newData,o=Object(T.a)(e.game_history);return o.find((function(e){return(null===e||void 0===e?void 0:e.id)===(null===r||void 0===r?void 0:r.id)}))?Object(h.a)({},e):(o.unshift(r),o.pop(),Object(h.a)(Object(h.a)({},e),{},{game_history:o}));case m:return Object(h.a)(Object(h.a)({},e),{},{in_battle_list:n.ghost_list});case v:return Object(h.a)(Object(h.a)({},e),{},{battle_end_list:n.ghost_list});case L:var i=n.data,s=n.category;return i&&Array.isArray(i)?Object(h.a)(Object(h.a)({},e),{},Object(E.a)({},s,i)):e;default:return e}},C="MAHJONG_HILO/SET_DATA",I={game_data:null,username:null},U=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:I,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case C:return Object(h.a)(Object(h.a)({},e),{},{game_data:t.payload});default:return e}},N="PLATFORM/SET_ACCOUNT_SUCCESS",D="PLATFORM/SET_ACCOUNT_FAILED",G="LOGOUT_ACCOUNT",M="SET_ENTRY_MODAL_STATE",P="PLATFORM/SET_USER_BALANCE",F="PLATFORM/SET_CURRENCY",k="PLATFORM/RESET_REDUX",B="PLATFORM/WALLET_CONFIG",H="PLATFORM/SET_LANGUAGE_LOCALE",W="PLATFORM/SET_GAME_LIST",Q="PLATFORM/SET_GENRE_LIST",J=function(){localStorage.removeItem("CLIENT_TOKEN"),localStorage.removeItem("CLIENT_ID")},Y={account:null,error:null,entryModalState:!1,accountBalance:{btc:null,eth:null,id:null,usdc:null},selectedCurrency:"usdc",walletConfig:null,language:"en",gameList:[],genreList:[]},V=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Y,t=arguments.length>1?arguments[1]:void 0,a=t.payload,n=t.type;switch(n){case N:return Object(h.a)(Object(h.a)({},e),{},{account:Object(h.a)(Object(h.a)({},e.account),a.data)});case D:return Object(h.a)(Object(h.a)({},e),{},{error:a.error});case G:return J(),Object(h.a)(Object(h.a)({},Y),{},{language:e.language});case k:return Object(h.a)(Object(h.a)({},Y),{},{language:e.language});case M:return Object(h.a)(Object(h.a)({},e),{},{entryModalState:a.state||!1});case P:var c=Object(h.a)(Object(h.a)({},e),{},{accountBalance:Object(h.a)(Object(h.a)({},e.balance),a.state)});return c;case F:var r=a.currency;return Object(h.a)(Object(h.a)({},e),{},{selectedCurrency:r});case B:var o=a.config;return Object(h.a)(Object(h.a)({},e),{},{walletConfig:o});case H:var i=a.lang;return Object(h.a)(Object(h.a)({},e),{},{language:i});case W:return Object(h.a)(Object(h.a)({},e),{},{gameList:null===a||void 0===a?void 0:a.list});case Q:return Object(h.a)(Object(h.a)({},e),{},{genreList:null===a||void 0===a?void 0:a.list});default:return e}},X="SCATTER/CONNECTED",z="SCATTER/ERRORS/CONNECTION_ERROR",K="SCATTER/LOGGED_IN",q="SCATTER/ERRORS/LOGIN_ERROR",Z="SCATTER/LOGGED_OUT",$="UPDATE_TOKEN_BALANCE",ee="UPDATE_USER_UUID",te={UUID:null,scatter:null,connected:!1,connectionError:!1,loggedIn:!1,loginFailed:!1,userAccount:null,balance:"0.0000  EOS"},ae=function(){var e,t,a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:te,n=arguments.length>1?arguments[1]:void 0;switch(n.type){case X:return Object(h.a)(Object(h.a)({},a),{},{connected:!0,connectionError:!1,scatter:n.payload});case z:return Object(h.a)(Object(h.a)({},a),{},{connectionError:!0});case K:null===(e=n.payload)||void 0===e||null===(t=e.accounts[0])||void 0===t||t.name;return Object(h.a)(Object(h.a)({},a),{},{loggedIn:!0,loginFailed:!1,userAccount:n.payload});case q:return Object(h.a)(Object(h.a)({},a),{},{loggedIn:!1,loginFailed:!0,userAccount:null});case Z:return Object(h.a)(Object(h.a)({},a),{},{loggedIn:!1,loginFailed:!1,userAccount:null});case $:return Object(h.a)(Object(h.a)({},a),{},{balance:n.payload});case ee:return Object(h.a)(Object(h.a)({},a),{},{UUID:n.payload});default:return a}},ne="TREASUREHUNT/SET_DATA",ce="TREASUREHUNT/SET_GAME_HISTORY",re="TREASUREHUNT/UPDATE_GAME_HISTORY",oe={game_data:null,id:null,game_history:[]},ie=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:oe,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case ne:return Object(h.a)(Object(h.a)({},e),{},{game_data:t.payload.game_data,id:t.payload.id});case ce:return Object(h.a)(Object(h.a)({},e),{},{game_history:t.payload.game_history});case re:var a=t.payload.newData,n=Object(T.a)(e.game_history);return n.find((function(e){return(null===e||void 0===e?void 0:e.id)===(null===a||void 0===a?void 0:a.id)}))?Object(h.a)({},e):(n.unshift(a),n.pop(),Object(h.a)(Object(h.a)({},e),{},{game_history:n}));default:return e}},se="WALLET/SET_WALLET_SUCCESS",le="WALLET/SET_WALLET_LOGOUT",ue="WALLET/SET_WALLET_ERROR",de="WALLET/SET_ACCOUNT_ADDRESS",Oe="WALLET/SET_CHAIN_ID",je="WALLET/SET_BALANCE",be={wallet:null,balance:0,chainId:null,account_address:null,error:null},ge=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:be,t=arguments.length>1?arguments[1]:void 0,a=t.payload,n=t.type;switch(n){case se:return Object(h.a)(Object(h.a)({},e),{},{wallet:a});case le:return{wallet:null,balance:0,chainId:null,account_address:null,error:null};case ue:return Object(h.a)(Object(h.a)({},e),{},{error:a});case de:return Object(h.a)(Object(h.a)({},e),{},{account_address:a});case Oe:return Object(h.a)(Object(h.a)({},e),{},{chainId:a});case je:return Object(h.a)(Object(h.a)({},e),{},{balance:a});default:return e}},_e=Object(j.combineReducers)({ghost_quest:R,mahjong_hilo:U,platform:V,scatter:ae,treasurehunt:ie,walletExt:ge}),pe={key:"root",storage:_.a,whitelist:["platform"]},Ee=Object(b.a)(pe,_e),Te=Object(j.createStore)(Ee,Object(p.composeWithDevTools)()),he=Object(b.b)(Te),Se=a(166);a(201),a(17),a(202);var Ae=a(181),fe=a(167),we=a.n(fe),me=a(5),ve=a(345),Le=a(361),xe=a(45),ye=a(359),Re=a(350),Ce=a(349),Ie=a(348),Ue=a(173),Ne=a.n(Ue),De=a(172),Ge=a.n(De),Me=a(351),Pe=a(352),Fe=a(353),ke=a(174),Be=a.n(ke),He=a(4),We=Object(ve.a)((function(e){return Object(Le.a)({drawer:{width:240,flexShrink:0,whiteSpace:"nowrap"},drawerOpen:{backgroundColor:"#242D41",width:240,transition:e.transitions.create("width",{easing:e.transitions.easing.sharp,duration:e.transitions.duration.enteringScreen})},drawerClose:Object(E.a)({backgroundColor:"#242D41",transition:e.transitions.create("width",{easing:e.transitions.easing.sharp,duration:e.transitions.duration.leavingScreen}),overflowX:"hidden",width:e.spacing(7)+1},e.breakpoints.up("sm"),{width:e.spacing(9)+1}),toolbar:Object(h.a)(Object(h.a)({display:"flex",alignItems:"center",justifyContent:"flex-end",padding:e.spacing(0,1)},e.mixins.toolbar),{},{color:"#1785EB"}),list:{color:"#1785EB"}})})),Qe=function(e){var t,a,n=e.open,c=e.handleDrawerClose,r=We(),o=Object(xe.a)();return Object(He.jsxs)(ye.a,{variant:"permanent",className:Object(me.a)(r.drawer,(t={},Object(E.a)(t,r.drawerOpen,n),Object(E.a)(t,r.drawerClose,!n),t)),classes:{paper:Object(me.a)((a={},Object(E.a)(a,r.drawerOpen,n),Object(E.a)(a,r.drawerClose,!n),a))},children:[Object(He.jsx)("div",{className:r.toolbar,children:Object(He.jsx)(Ie.a,{onClick:function(){return c()},style:{color:"#1785EB"},children:"rtl"===o.direction?Object(He.jsx)(Ge.a,{}):Object(He.jsx)(Ne.a,{})})}),Object(He.jsx)(Ce.a,{}),Object(He.jsx)(Re.a,{children:["Games","VIP","Referral","Tasks","Challenge","Rank","News"].map((function(e,t){return Object(He.jsxs)(Me.a,{button:!0,children:[Object(He.jsx)(Pe.a,{style:{color:"#1785EB"},children:Object(He.jsx)(Be.a,{})}),Object(He.jsx)(Fe.a,{primary:e,style:{color:"#1785EB"}})]},e)}))})]})},Je=a(354),Ye=a(355),Ve=a(176),Xe=a.n(Ve),ze=a(87),Ke=a(105),qe=a(102),Ze=a.n(qe),$e=a(175),et=a(106),tt=a(107),at=a.n(tt),nt="http",ct="37.44.244.221",rt=parseInt("8888",10),ot="".concat(nt,"://").concat(ct,":").concat(rt),it=new $e.JsSignatureProvider(["5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3"]),st=new Ke.JsonRpc(ot,{}),lt=(new Ke.Api({rpc:st,signatureProvider:it,textDecoder:new et.TextDecoder,textEncoder:new et.TextEncoder}),Ze.a.Network.fromJson({blockchain:"eos",protocol:nt,host:ct,port:rt,chainId:"cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f"}),{assets_url:"https://egs-2.s3.jp-tok.cloud-object-storage.appdomain.cloud/eos-web",protocol:"http",host:"api.coinica.net/s1",ws_url:"ws://api.coinica.net:9000/ws"}),ut=at.a.create({baseURL:"".concat(lt.protocol,"://").concat(lt.host)});ut.defaults.headers.post["Content-Type"]="application/json",at.a.create({baseURL:"".concat(lt.protocol,"://").concat(lt.host)}).defaults.headers.post["Content-Type"]="application/json",console.log({ServerAPI:lt,AxiosMultiCurrency:ut});var dt="".concat(lt.assets_url,"/imgs/coinica-logo.png"),Ot=Object(ve.a)((function(e){return Object(Le.a)({appBar:{color:"#1785EB",backgroundColor:"#242D41",zIndex:e.zIndex.drawer+1,transition:e.transitions.create(["width","margin"],{easing:e.transitions.easing.sharp,duration:e.transitions.duration.leavingScreen})},appBarShift:{marginLeft:240,width:"calc(100% - ".concat(240,"px)"),transition:e.transitions.create(["width","margin"],{easing:e.transitions.easing.sharp,duration:e.transitions.duration.enteringScreen})},menuButton:{marginRight:36},hide:{display:"none"},drawerClose:Object(E.a)({transition:e.transitions.create("width",{easing:e.transitions.easing.sharp,duration:e.transitions.duration.leavingScreen}),overflowX:"hidden",width:e.spacing(7)+1},e.breakpoints.up("sm"),{width:e.spacing(9)+1}),content:{flexGrow:1,padding:e.spacing(3)}})})),jt=function(e){var t=e.open,a=e.handleDrawerOpen,n=Ot();Object(xe.a)();return Object(He.jsx)(Je.a,{position:"fixed",className:Object(me.a)(n.appBar,Object(E.a)({},n.appBarShift,t)),children:Object(He.jsxs)(Ye.a,{children:[Object(He.jsx)(Ie.a,{color:"inherit","aria-label":"open drawer",onClick:function(){return a()},edge:"start",className:Object(me.a)(n.menuButton,Object(E.a)({},n.hide,t)),children:Object(He.jsx)(Xe.a,{})}),Object(He.jsx)(ze.a,{variant:"h6",noWrap:!0,children:Object(He.jsx)("img",{src:dt,width:40,height:40,alt:"logo",className:"logo w-auto"})})]})})},bt=a(356),gt=a(177),_t=a.n(gt),pt=function(){return Object(He.jsxs)(bt.a,{className:"".concat(_t.a.coinica_footer),children:[Object(He.jsxs)(ze.a,{align:"center",variant:"subtitle2",paragraph:!0,children:["Term of Use | Privacy Policy",Object(He.jsx)("br",{}),Object(He.jsx)("i",{children:"2020-2021 EOS game store, All rights reserved"})]}),Object(He.jsx)(Ce.a,{})]})},Et=a(357),Tt=a(178),ht=a.n(Tt),St=function(){return Object(He.jsx)(Et.a,{className:"".concat(ht.a.page_content),maxWidth:"lg"})},At=function(){return Object(He.jsx)(He.Fragment,{})},ft=a(360),wt=a(358),mt=function(){var e=Object(n.useState)(!0),t=Object(Ae.a)(e,2),a=t[0],c=t[1];return Object(He.jsxs)(ft.b,{injectFirst:!0,children:[Object(He.jsx)(wt.a,{}),Object(He.jsxs)("div",{className:"".concat(we.a.wrapper),children:[Object(He.jsx)(jt,{open:a,handleDrawerOpen:function(){c(!0)}}),Object(He.jsx)(At,{}),Object(He.jsx)(Qe,{open:a,handleDrawerClose:function(){c(!1)}}),Object(He.jsx)(St,{}),Object(He.jsx)(pt,{})]})]})},vt=function(){return Object(He.jsx)(He.Fragment,{children:Object(He.jsx)(mt,{})})},Lt=u.a.config();O()(Lt),o.a.render(Object(He.jsx)(c.a.StrictMode,{children:Object(He.jsx)(s.a,{store:Te,children:Object(He.jsx)(Se.a,{loading:null,persistor:he,children:Object(He.jsx)(i.a,{children:Object(He.jsx)(vt,{})})})})}),document.getElementById("root"))}},[[310,1,2]]]);