"use strict";(self.webpackChunkbipul_raman=self.webpackChunkbipul_raman||[]).push([[875],{8729:function(t,e,n){n.d(e,{k:function(){return c}});var r=n(7294),o=n(453),c=function(t){var e=t.error;return r.createElement(o.Z,{variant:"h6"},"An Error Occurred: ",e.errorCode)}},7354:function(t,e,n){n.d(e,{C:function(){return c}});var r=n(7294),o=n(453),c=function(){return r.createElement(o.Z,{variant:"h6"},"Authentication in progress...")}},7467:function(t,e,n){n.r(e),n.d(e,{default:function(){return w}});var r=n(7294),o=n(8063),c=n(453),a=n(920),i=n(8397),u=n(4932),s=n(169),p=n(1587),l=n(9455),f=n(4975),h=n(7354),d=n(8729),g=n(9157),m=(0,a.Z)((function(){return{root:{margin:20,padding:20}}}));function w(){var t=m(),e=(0,i.Fp)().accounts,n=(0,i.mA)(e[0]||{}),a=Object.assign({},f.Qb),w=(0,r.useState)(!1),b=w[0],A=w[1];return(0,r.useEffect)((function(){(0,g.Jc)().then((function(t){void 0!==t&&A(!0)}))}),[]),r.createElement(l.Z,null,r.createElement(o.Z,{elevation:3,className:t.root},r.createElement(i.Kv,{interactionType:u.s_.Redirect,authenticationRequest:a,errorComponent:d.k,loadingComponent:h.C},r.createElement(i.NY,null,n&&r.createElement(c.Z,{variant:"h6"},"Welcome ",n.name,"! You are successfully logged-in."),1==b?r.createElement(c.Z,{paragraph:!0,className:t.sectionTitle},"Blog Creation API is active now."):r.createElement(c.Z,{paragraph:!0,className:t.sectionTitle},"Blog Creation API is not active right now.")))),r.createElement(s.Z,{Title:p.XS.Title,Description:p.XS.Description}))}},9157:function(t,e,n){n.d(e,{uH:function(){return g},ab:function(){return T},RY:function(){return w},I6:function(){return C},jU:function(){return h},Jc:function(){return A},i:function(){return k}});var r=n(8634),o=n(6164),c=n.n(o),a="https://bipulappapi.azurewebsites.net/api/BlogNew",i="https://bipulappapi.azurewebsites.net/api/BlogDelete",u="https://bipulapppublicapi.azurewebsites.net/api/Blog",s="https://bipulapppublicapi.azurewebsites.net/api/SiteConfig",p="https://bipulappstorage.table.core.windows.net/Blogs?sv=2018-03-28&si=ViewBlogs&tn=blogs&sig=mPxjbfPbdqcc3PA%2BNhomdaUkkNAv%2BTUyu8lXC%2Fc2%2FVY%3D",l="https://bipulappstorage.table.core.windows.net/Blogs?sv=2018-03-28&si=ViewBlogs&tn=blogs&sig=mPxjbfPbdqcc3PA%2BNhomdaUkkNAv%2BTUyu8lXC%2Fc2%2FVY%3D&$top=5",f="https://bipulappstorage.table.core.windows.net/Config?sv=2018-03-28&si=ViewConfig&tn=config&sig=xcIl81rzfecn2QMunp5hG4VTp7BzTB4PRLWmSM1Y9Fc%3D";function h(t,e){return d.apply(this,arguments)}function d(){return(d=(0,r.Z)(c().mark((function t(e,n){var r,o,i;return c().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=new Headers,o="Bearer "+e,r.append("Authorization",o),r.append("Access-Control-Allow-Origin","*"),r.append("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept"),i={method:"POST",headers:r,body:n},t.abrupt("return",fetch(a,i).then((function(t){return t.json()})).catch((function(t){return console.log(t)})));case 7:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function g(t,e){return m.apply(this,arguments)}function m(){return(m=(0,r.Z)(c().mark((function t(e,n){var r;return c().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r={method:"DELETE",headers:{"Access-Control-Allow-Origin":"*","Access-Control-Allow-Headers":"Origin, X-Requested-With, Content-Type, Accept",Authorization:"Bearer "+e}},t.abrupt("return",fetch(i+"/"+n,r).then((function(t){return t.json()})).catch((function(t){return console.log(t)})));case 2:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function w(t){return b.apply(this,arguments)}function b(){return(b=(0,r.Z)(c().mark((function t(e){var n;return c().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n={method:"GET",headers:{"Access-Control-Allow-Origin":"*","Access-Control-Allow-Headers":"Origin, X-Requested-With, Content-Type, Accept","Content-Type":"application/json"}},t.abrupt("return",fetch(u+"/"+e,n).then((function(t){return t.json()})).catch((function(t){return console.log(t)})));case 2:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function A(){return v.apply(this,arguments)}function v(){return(v=(0,r.Z)(c().mark((function t(){var e;return c().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e={method:"GET",headers:{"Access-Control-Allow-Origin":"*","Access-Control-Allow-Headers":"Origin, X-Requested-With, Content-Type, Accept"}},t.abrupt("return",fetch(s,e).then((function(t){return t.json()})).catch((function(t){return console.log(t)})));case 2:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function C(t){return y.apply(this,arguments)}function y(){return(y=(0,r.Z)(c().mark((function t(e){var n;return c().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n={method:"GET",headers:{Accept:"application/json;odata=nometadata"}},t.abrupt("return",fetch(p+"&$filter=RowKey%20eq%20'"+e+"'",n).then((function(t){return t.json()})).catch((function(t){return console.log(t)})));case 2:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function T(t){return E.apply(this,arguments)}function E(){return(E=(0,r.Z)(c().mark((function t(e){var n;return c().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n={method:"GET",headers:{Accept:"application/json;odata=nometadata"}},t.abrupt("return",fetch(l+"&$filter=RowKey%20gt%20'"+e+"'",n).then((function(t){return t.json()})).catch((function(t){return console.log(t)})));case 2:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function k(){return B.apply(this,arguments)}function B(){return(B=(0,r.Z)(c().mark((function t(){var e;return c().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e={method:"GET",headers:{Accept:"application/json;odata=nometadata"}},t.abrupt("return",fetch(f,e).then((function(t){return t.json()})).catch((function(t){return console.log(t)})));case 2:case"end":return t.stop()}}),t)})))).apply(this,arguments)}}}]);
//# sourceMappingURL=component---src-pages-login-js-9697239257d3986a8d2e.js.map