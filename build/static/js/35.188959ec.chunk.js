(this.webpackJsonpcoinica=this.webpackJsonpcoinica||[]).push([[35],{1190:function(e,t,a){"use strict";a.r(t);var n=a(18),c=a(5),r=a(183),s=a(0),o=a(752),i=a.n(o),l=a(450),d=a(392),u=a(390),b=a(261),j=a(247),p=a(434),O=a(1183),m=a(1159),g=a(11).e.assets_url,h="".concat(g,"/imgs/coinica-logo.png"),x=a(771),f=a.n(x),_=a(62),v=a(50),w=a.n(v),S=a(71),k=a(26),C=a(772),N=a.n(C),y=a(249),M=a(137),T=a(507),L=a(428),E=a(1124),F=a(1153),z=a(399),U=a(432),D=a(8),I=a(401),P=a(27),W=a(1154),A=a(1155),B=a(23),K=a(233),R=a(17),q=a(139),J=a(172),V=a(111),G=a(1),H=function(e){var t=e.username,a=e.password;return Object(J.d)({username:t,password:a})},Q=function(e){return Object(q.k)(e)},Y=function(e){return Object(G.jsx)("span",{children:Object(_.a)("signup.msg.add.email",{span:function(t){return Object(G.jsx)("span",{className:"text-warning text-bold",onClick:function(){return e.push("/account/settings")},children:t})}})})},X=Object(D.a)((function(e){return Object(I.a)({root:{"label + &":{marginTop:e.spacing(3.5)}},input:{direction:"ltr",color:"white",borderRadius:10,position:"relative",backgroundColor:"#0E141F",fontSize:16,width:"100%",padding:"14px 12px",transition:e.transitions.create(["border-color","box-shadow"]),"&:focus":{boxShadow:"".concat(Object(P.a)(e.palette.primary.main,.25)," 0 0 0 0.2rem")}}})}))(y.a),Z=Object(k.b)((function(e){return{platform:e.platform}}),(function(e){return{dispatch:e}}))((function(e){var t=e.platform,a=(e.requestResetPassword,e.dispatch),c=e.handleSignUpModalClose,r=(e.handleSignUpModalOpen,e.handleOpenForgotPasswordModal),o=Object(B.g)(),i=Object(s.useState)(""),l=Object(n.a)(i,2),d=l[0],u=l[1],b=Object(s.useState)(""),j=Object(n.a)(b,2),p=j[0],O=j[1],m=Object(s.useState)(!1),g=Object(n.a)(m,2),h=g[0],x=g[1],f=Object(s.useState)(!1),v=Object(n.a)(f,2),k=v[0],C=v[1],y=Object(s.useState)(!1),D=Object(n.a)(y,2),I=D[0],P=D[1],Z=Object(K.a)().formatMessage,$=function(){var e=Object(S.a)(w.a.mark((function e(){var t,n;return w.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,Object(q.l)();case 3:t=e.sent,(n=t.data)&&a(Object(R.k)(n)),e.next=10;break;case 8:e.prev=8,e.t0=e.catch(0);case 10:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(){return e.apply(this,arguments)}}(),ee=function(){var e=Object(S.a)(w.a.mark((function e(t){var n,r,s,i,l,u,b,j,O,m,g,h,x;return w.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.prev=1,C(!0),e.next=5,H({username:d,password:p});case 5:return n=e.sent,r=n.data,s=r.id,i=r.token,Object(J.c)({CLIENT_TOKEN:i,CLIENT_ID:s}),e.next=12,Q(s);case 12:l=e.sent,$(),l.data&&(u=l.data,b=u.username,j=u.email,O=u.is_verified,V.b.success("".concat(Z({id:"signup.msg.welcome"})," ").concat(b||j,"!")),j||O||V.b.info(Y(o),{autoClose:!1}),a(Object(R.j)(l.data)),a(Object(R.i)(null)),c()),e.next=20;break;case 17:e.prev=17,e.t0=e.catch(1),401===(null===e.t0||void 0===e.t0||null===(m=e.t0.response)||void 0===m?void 0:m.status)&&"Unauthorized"===(null===e.t0||void 0===e.t0||null===(g=e.t0.response)||void 0===g?void 0:g.statusText)&&!1===((null===e.t0||void 0===e.t0||null===(h=e.t0.response)||void 0===h||null===(x=h.config)||void 0===x?void 0:x.url)+"").includes("account")?(a(Object(R.i)(Z({id:"login.msg.invalid"}))),P(!0)):a(Object(R.i)(Z({id:"login.msg.error"})));case 20:return e.prev=20,C(!1),e.finish(20);case 23:case"end":return e.stop()}}),e,null,[[1,17,20,23]])})));return function(t){return e.apply(this,arguments)}}();return Object(G.jsxs)(G.Fragment,{children:[Object(G.jsx)(M.a,{className:"".concat(N.a.error),children:t.error}),Object(G.jsx)("form",{onSubmit:ee,children:Object(G.jsxs)(T.a,{container:!0,spacing:4,className:"".concat(N.a.grid),children:[Object(G.jsx)(T.a,{item:!0,xs:12,children:Object(G.jsxs)(L.a,{fullWidth:!0,children:[Object(G.jsx)(E.a,{shrink:!0,className:"".concat(N.a.label),children:Object(_.a)("login.username")}),Object(G.jsx)(X,{id:"bootstrap-input",value:d,onChange:function(e){I&&P(!1);var t=e.target.value;u(t)}})]})}),Object(G.jsx)(T.a,{item:!0,xs:12,children:Object(G.jsxs)(L.a,{fullWidth:!0,children:[Object(G.jsx)(E.a,{shrink:!0,htmlFor:"standard-adornment-password",className:"".concat(N.a.label),children:Object(_.a)("login.password")}),Object(G.jsx)(X,{id:"standard-adornment-password",type:h?"text":"password",value:p,onChange:function(e){I&&P(!1);var t=e.target.value;O(t)},className:"".concat(N.a.password_field),endAdornment:Object(G.jsx)(F.a,{position:"end",className:"".concat(N.a.password_visibility),children:Object(G.jsx)(z.a,{"aria-label":"toggle password visibility",onClick:function(){x(!h)},onMouseDown:function(e){e.preventDefault()},edge:"end",children:h?Object(G.jsx)(W.a,{}):Object(G.jsx)(A.a,{})})})})]})}),Object(G.jsx)(T.a,{item:!0,xs:12,children:Object(G.jsx)(U.a,{variant:"text",color:"primary",onClick:function(){return r()},children:Object(_.a)("login.forgot.password")})}),Object(G.jsx)(T.a,{item:!0,xs:12,className:"".concat(N.a.login_submit," center-content"),children:Object(G.jsx)(U.a,{variant:"contained",color:"primary",size:"large",type:"submit",disabled:k,children:Object(_.a)("login.button")})})]})})]})})),$=a(29),ee=a(773),te=a.n(ee),ae=a(1158),ne=a(1189),ce=a(438),re=a(1156),se=a(1157),oe=Object(D.a)((function(e){return Object(I.a)({root:{"label + &":{marginTop:e.spacing(3.5)}},input:{direction:"ltr",color:"white",borderRadius:10,position:"relative",backgroundColor:"#0E141F",fontSize:16,width:"100%",padding:"14px 12px",transition:e.transitions.create(["border-color","box-shadow"]),"&:focus":{boxShadow:"".concat(Object(P.a)(e.palette.primary.main,.25)," 0 0 0 0.2rem")}}})}))(y.a),ie=Object(k.b)((function(e){return{platform:e.platform}}),(function(e){return{dispatch:e}}))((function(e){e.setTabKey,e.platform;var t=e.dispatch,a=e.handleSignUpModalClose,r=Object(B.g)(),o=Object(s.useState)(function(){for(var e="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",t="",a=7;a>0;--a)t+=e[Math.floor(Math.random()*e.length)];return t}()),i=Object(n.a)(o,2),d=i[0],u=i[1],b=Object(s.useState)(""),j=Object(n.a)(b,2),p=j[0],O=j[1],m=Object(s.useState)({password:"",password2:""}),g=Object(n.a)(m,2),h=g[0],x=g[1],f=Object(s.useState)(!1),v=Object(n.a)(f,2),k=(v[0],v[1],Object(s.useState)(!1)),C=Object(n.a)(k,2),N=C[0],y=C[1],D=Object(s.useState)(!1),I=Object(n.a)(D,2),P=I[0],H=I[1],Q=Object(s.useState)(!1),X=Object(n.a)(Q,2),Z=X[0],ee=X[1],ie=Object(s.useState)(""),le=Object(n.a)(ie,2),de=le[0],ue=le[1],be=Object(s.useState)(""),je=Object(n.a)(be,2),pe=je[0],Oe=je[1],me=Object(s.useState)(!1),ge=Object(n.a)(me,2),he=ge[0],xe=ge[1],fe=Object(K.a)().formatMessage,_e=function(){var e=Object(S.a)(w.a.mark((function e(){var a,n;return w.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,Object(q.l)();case 3:a=e.sent,n=a.data,t(Object(R.k)(n)),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),console.error(e.t0);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(){return e.apply(this,arguments)}}(),ve=function(e){var t=e.target,a=t.name,n=t.value;x(Object(c.a)(Object(c.a)({},h),{},Object($.a)({},a,n))),he&&xe(!1)},we=function(){var e=Object(S.a)(w.a.mark((function e(a){var n,c,s,o,i,l,d,u,b,j,p;return w.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=a.username,c=a.password,e.prev=1,ee(!0),e.next=5,Object(J.d)({username:n,password:c});case 5:return s=e.sent,o=s.data,i=o.id,l=o.token,Object(J.c)({CLIENT_TOKEN:l,CLIENT_ID:i}),e.next=12,_e();case 12:return e.next=14,Object(q.k)(i);case 14:(d=e.sent).data&&(u=d.data,b=u.username,j=u.email,p=u.is_verified,V.b.success("".concat(fe({id:"signup.msg.welcome"})," ").concat(b||j,"!")),j||p||V.b.info(Y(r),{autoClose:!1}),t(Object(R.j)(d.data)),t(Object(R.i)(null)));case 16:return e.prev=16,H(!1),ee(!1),e.finish(16);case 20:case"end":return e.stop()}}),e,null,[[1,,16,20]])})));return function(t){return e.apply(this,arguments)}}(),Se=function(){var e=Object(S.a)(w.a.mark((function e(t){var n,c,r;return w.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),h.password!==h.password2&&(xe(!0),1)){e.next=29;break}return e.prev=2,H(!0),n={username:d,password:h.password},""!==p&&(n.referred_by=p),e.next=8,Object(J.f)(n);case 8:if(c=e.sent,console.log("singup data",c.data),201!==(null===c||void 0===c?void 0:c.status)){e.next=19;break}Oe(""),ue(fe({id:"signup.msg.success"})),u(""),O(""),x({password:"",password2:""}),we({username:d,password:h.password}).then((function(e){setInterval(a(),1e3)})),e.next=20;break;case 19:throw new Error(fe({id:"signup.msg.error"}));case 20:e.next=26;break;case 22:e.prev=22,e.t0=e.catch(2),ue(""),409===(null===e.t0||void 0===e.t0||null===(r=e.t0.response)||void 0===r?void 0:r.status)?Oe(fe({id:"signup.msg.username.exist"})):Oe(fe({id:"signup.msg.server.error"}));case 26:return e.prev=26,H(!1),e.finish(26);case 29:case"end":return e.stop()}}),e,null,[[2,22,26,29]])})));return function(t){return e.apply(this,arguments)}}(),ke=function(){y(!N)},Ce=function(e){e.preventDefault()};return Object(G.jsx)("form",{onSubmit:Se,children:Object(G.jsxs)(T.a,{container:!0,spacing:4,children:[pe&&Object(G.jsx)(T.a,{item:!0,xs:12,className:"".concat(te.a.error_message),children:pe}),de&&Object(G.jsx)(T.a,{item:!0,xs:12,className:"".concat(te.a.success_message),children:de}),Object(G.jsx)(T.a,{item:!0,xs:12,children:Object(G.jsxs)(L.a,{fullWidth:!0,children:[Object(G.jsx)(E.a,{shrink:!0,htmlFor:"username",className:"".concat(te.a.label),children:Object(_.a)("signup.username")}),Object(G.jsx)(oe,{required:!0,id:"username",value:d,onChange:function(e){var t=e.target.value;u(t),pe&&Oe(""),de&&ue("")},endAdornment:""!==d?Object(G.jsx)(F.a,{position:"end",className:"".concat(te.a.adornment_element),children:Object(G.jsx)(z.a,{"aria-label":"toggle password visibility",onClick:function(){return u("")},onMouseDown:function(){return u("")},edge:"end",children:Object(G.jsx)(re.a,{})})}):""}),Object(G.jsxs)(l.a,{display:"flex",className:"".concat(te.a.important),pt:"10px",children:[Object(G.jsx)(M.a,{variant:"caption",color:"secondary",align:"left",gutterBottom:!0,children:Object(_.a)("signup.important",{strong:function(e){return Object(G.jsx)("strong",{children:e})}})}),Object(G.jsx)(se.a,{})]})]})}),Object(G.jsx)(T.a,{item:!0,xs:12,children:Object(G.jsxs)(L.a,{fullWidth:!0,children:[Object(G.jsx)(E.a,{shrink:!0,htmlFor:"password",className:"".concat(te.a.label),children:Object(_.a)("signup.password")}),Object(G.jsx)(oe,{name:"password",type:N?"text":"password",value:h.password,onChange:ve,id:"password",endAdornment:Object(G.jsx)(F.a,{position:"end",className:"".concat(te.a.adornment_element),children:Object(G.jsx)(z.a,{"aria-label":"toggle password visibility",onClick:ke,onMouseDown:Ce,edge:"end",children:N?Object(G.jsx)(W.a,{}):Object(G.jsx)(A.a,{})})})})]})}),Object(G.jsx)(T.a,{item:!0,xs:12,children:Object(G.jsxs)(L.a,{fullWidth:!0,children:[Object(G.jsx)(E.a,{shrink:!0,htmlFor:"confirm-password",className:"".concat(te.a.label),children:Object(_.a)("signup.confirm.password")}),Object(G.jsx)(oe,{name:"password2",type:N?"text":"password",value:h.password2,onChange:ve,id:"confirm-password",endAdornment:Object(G.jsx)(F.a,{position:"end",className:"".concat(te.a.adornment_element),children:Object(G.jsx)(z.a,{"aria-label":"toggle password visibility",onClick:ke,onMouseDown:Ce,edge:"end",children:N?Object(G.jsx)(W.a,{}):Object(G.jsx)(A.a,{})})})})]})}),Object(G.jsx)(T.a,{item:!0,xs:12,children:Object(G.jsxs)(L.a,{fullWidth:!0,children:[Object(G.jsx)(E.a,{shrink:!0,htmlFor:"referral-code",className:"".concat(te.a.label),children:Object(_.a)("signup.referral")}),Object(G.jsx)(oe,{id:"referral-code",name:"code",value:p,onChange:function(e){var t;return O(null===e||void 0===e||null===(t=e.target)||void 0===t?void 0:t.value)}})]})}),Object(G.jsx)(T.a,{item:!0,xs:12,children:Object(G.jsx)(L.a,{className:"".concat(te.a.agreement_label),children:Object(G.jsx)(ae.a,{value:"start",control:Object(G.jsx)(ne.a,{className:"".concat(te.a.agreement)}),label:Object(_.a)("signup.agreement"),labelPlacement:"start"})})}),Object(G.jsx)(T.a,{item:!0,lg:12,children:Object(G.jsx)(ce.a,{className:"".concat(te.a.divider)})}),Object(G.jsx)(T.a,{item:!0,xs:12,className:"".concat(te.a.signup_submit," center-content"),children:Object(G.jsx)(U.a,{variant:"contained",color:"primary",size:"large",disabled:P,type:"submit",children:Z?Object(_.a)("signup.signing.in"):P?Object(_.a)("signup.creating.account"):Object(_.a)("signup.create.account")})})]})})})),le=a(774),de=a.n(le),ue=Object(D.a)((function(e){return Object(I.a)({root:{"label + &":{marginTop:e.spacing(3.5)}},input:{marginTop:"20px",marginBottom:"10px",direction:"ltr",color:"white",borderRadius:10,position:"relative",backgroundColor:"#0E141F",fontSize:16,width:"100%",padding:"14px 12px",transition:e.transitions.create(["border-color","box-shadow"]),"&:focus":{boxShadow:"".concat(Object(P.a)(e.palette.primary.main,.25)," 0 0 0 0.2rem")}}})}))(y.a),be=function(e){var t=e.open,a=e.handleClose,c=Object(s.useState)(""),r=Object(n.a)(c,2),o=r[0],i=r[1];return Object(G.jsx)(d.a,{open:t,onClose:function(){return a()},className:"".concat(de.a.modal),children:Object(G.jsx)(b.a,{in:t,children:Object(G.jsxs)(l.a,{component:"div",className:"".concat(de.a.modal_content),children:[Object(G.jsx)(M.a,{variant:"h4",align:"center",gutterBottom:!0,children:Object(_.a)("forgot.password.title")}),Object(G.jsx)(M.a,{variant:"body1",gutterBottom:!0,children:Object(_.a)("forgot.password.instruction")}),Object(G.jsx)(ue,{id:"bootstrap-input",value:o,onChange:function(e){i(e.target.value)},placeholder:"Email Address",fullWidth:!0}),Object(G.jsx)(U.a,{variant:"contained",color:"primary",fullWidth:!0,onClick:function(){V.b.info(Object(_.a)("forgot.password.email.msg")),Object(J.b)(o)},children:Object(_.a)("forgot.password.title")})]})})})},je=["children","value","index"];function pe(e){var t=e.children,a=e.value,n=e.index,s=Object(r.a)(e,je);return Object(G.jsx)("div",Object(c.a)(Object(c.a)({role:"tabpanel",hidden:a!==n,id:"full-width-tabpanel-".concat(n),"aria-labelledby":"full-width-tab-".concat(n)},s),{},{children:a===n&&Object(G.jsx)(l.a,{p:3,children:t})}))}function Oe(e){return{id:"full-width-tab-".concat(e),"aria-controls":"full-width-tabpanel-".concat(e)}}t.default=function(e){var t=e.openModal,a=e.handleSignUpModalClose,r=e.handleSignUpModalOpen,o=Object(s.useState)(0),g=Object(n.a)(o,2),x=g[0],v=g[1],w=Object(s.useState)(!1),S=Object(n.a)(w,2),k=(S[0],S[1]),C=Object(s.useState)("signup"),N=Object(n.a)(C,2),y=(N[0],N[1]),M=Object(s.useState)(!1),T=Object(n.a)(M,2),L=T[0],E=T[1];return Object(G.jsxs)(G.Fragment,{children:[Object(G.jsx)(be,{open:L,handleClose:function(){E(!1),r()}}),Object(G.jsx)(d.a,{open:t,onClose:function(){return a()},BackdropComponent:u.a,BackdropProps:{timeout:500},closeAfterTransition:!0,className:"".concat(f.a.modal),children:Object(G.jsx)(b.a,{in:t,children:Object(G.jsxs)(j.a,{elevation:3,className:"".concat(f.a.modal_content),children:[Object(G.jsx)(l.a,{className:"".concat(f.a.logo_container),children:Object(G.jsx)("img",{src:h,className:"".concat(f.a.logo)})}),Object(G.jsx)(p.a,{position:"static",color:"transparent",className:"".concat(f.a.appbar),children:Object(G.jsxs)(O.a,{value:x,onChange:function(e,t){v(t)},indicatorColor:"primary",textColor:"primary",variant:"fullWidth",children:[Object(G.jsx)(m.a,Object(c.a)(Object(c.a)({label:Object(_.a)("header.login")},Oe(0)),{},{className:"".concat(f.a.tab)})),Object(G.jsx)(m.a,Object(c.a)(Object(c.a)({label:Object(_.a)("header.signup")},Oe(1)),{},{className:"".concat(f.a.tab)}))]})}),Object(G.jsxs)(i.a,{axis:"x",index:x,onChangeIndex:function(e){v(e)},children:[Object(G.jsx)(pe,{value:x,index:0,dir:"rtl",children:Object(G.jsx)(Z,{setTabKey:y,requestResetPassword:k,handleSignUpModalClose:a,handleSignUpModalOpen:r,handleOpenForgotPasswordModal:function(){E(!0),a()}})}),Object(G.jsx)(pe,{value:x,index:1,dir:"rtl",children:Object(G.jsx)(ie,{setTabKey:y,handleSignUpModalClose:a})})]})]})})})]})}},771:function(e,t,a){e.exports={modal:"SignupModal_modal__1aE5G",modal_content:"SignupModal_modal_content__I4eiW",logo:"SignupModal_logo__3Yd-K",logo_container:"SignupModal_logo_container__1v8An",appbar:"SignupModal_appbar__3i7Kh",tab:"SignupModal_tab__1Lo7g"}},772:function(e,t,a){e.exports={grid:"Login_grid__sQ5pe",input_field:"Login_input_field__1u3Yt",label:"Login_label__2SHP6",agreement:"Login_agreement__2Qq-T",agreement_label:"Login_agreement_label__1T7kh",divider:"Login_divider__1asAQ",login_submit:"Login_login_submit__2YOzB",important:"Login_important__a3JOn",password_field:"Login_password_field__1R8pV",password_visibility:"Login_password_visibility__11H5c",error:"Login_error__3Mcui"}},773:function(e,t,a){e.exports={input_field:"Signup_input_field__2cuBq",error_message:"Signup_error_message__1z-zH",success_message:"Signup_success_message__13Jme",label:"Signup_label__3-JEV",agreement:"Signup_agreement__3ePwC",agreement_label:"Signup_agreement_label__3G5RS",divider:"Signup_divider__2oEUG",signup_submit:"Signup_signup_submit__1cjt9",important:"Signup_important__1nIsC",adornment_field:"Signup_adornment_field__3zS2m",adornment_element:"Signup_adornment_element__XKf97"}},774:function(e,t,a){e.exports={modal:"ForgotPassword_modal__345zV",modal_content:"ForgotPassword_modal_content__10qUV"}}}]);