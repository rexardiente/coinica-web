(this.webpackJsonpcoinica=this.webpackJsonpcoinica||[]).push([[41],{1167:function(t,e,n){t.exports={container:"UserInfo_container__1dzci",emailInput:"UserInfo_emailInput__3gnw-",submitBtn:"UserInfo_submitBtn__1MFHW"}},1218:function(t,e,n){"use strict";n.r(e);var a=n(56),c=n(11),i=n(9),r=n.n(i),s=n(0),o=n(27),u=n(111),b=n(1245),f=n(390),l=n(170),_=n(95),p=n(20),m=n(72),j=n(1167),O=n.n(j),g=n(1);e.default=Object(o.b)((function(t){return{platform:t.platform}}),(function(t){return{dispatch:t}}))((function(t){var e=t.platform,n=t.dispatch,i=(t.showModal,t.setShow),o=e.account,j=Object(s.useState)(!1),d=Object(c.a)(j,2),h=d[0],v=d[1],w=Object(s.useState)(""),I=Object(c.a)(w,2),x=I[0],k=I[1],y=Object(s.useState)(void 0),S=Object(c.a)(y,2),B=S[0],N=S[1];Object(s.useEffect)((function(){o&&N(o.email)}),[o]);return Object(g.jsxs)("div",{className:O.a.container,children:[Object(g.jsx)(b.a,{className:O.a.emailInput,type:"email",variant:"outlined",label:B||"",InputLabelProps:{style:{color:"#427AAD"}},onChange:function(t){var e=t.target.value;k(e)}}),Object(g.jsx)(f.a,{className:O.a.submitBtn,color:"primary",variant:"contained",onClick:function(){return function(){if(o)if(""===x)u.b.warning(Object(m.a)("account_settings.setting_screen.user_information.email_input.toast.warning"),{position:"top-center"});else{if(""!==B){if(x===B)return u.b.error(Object(m.a)("account_settings.setting_screen.user_information.email_input.toast.error"));v(!0),Object(l.a)(x).then(function(){var t=Object(a.a)(r.a.mark((function t(e){var a;return r.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return u.b.success(Object(m.a)("account_settings.setting_screen.user_information.email_input.toast.success"),{position:"top-center"}),t.next=3,Object(_.k)(o.id);case 3:(a=t.sent)&&(n(Object(p.j)(a.data)),N(a.data.email)),i(!1);case 6:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()).catch((function(t){u.b.error(Object(m.a)("account_settings.setting_screen.user_information.update_email.toast.error"))})).finally((function(){v(!1)}))}else Object(l.a)(x);i(!0)}else u.b.error(Object(m.a)("account_settings.setting_screen.user_information.no_account.toast.error"))}()},children:h?"Loading...":Object(m.a)("account_settings.setting_screen.user_information.button.submit")})]})}))}}]);