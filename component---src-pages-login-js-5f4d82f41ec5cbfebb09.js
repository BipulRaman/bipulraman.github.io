(self.webpackChunkgatsby_theme=self.webpackChunkgatsby_theme||[]).push([[875],{2608:function(e,t,n){"use strict";n.d(t,{B:function(){return r},N:function(){return a}});var r={graphMeEndpoint:"https://graph.microsoft.com/v1.0/me"},a={Create:"https://bipulapppublicapi.azurewebsites.net/api/BlogCreate",Delete:"https://bipulapppublicapi.azurewebsites.net/api/BlogDelete",GetById:"https://bipulapppublicapi.azurewebsites.net/api/BlogGetById"}},7703:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return v}});var r=n(7294),a=n(2286),o=n(8063),c=n(453),u=n(920),i=n(5414),s=n(3750),l=n(9879),p=n(2673),h=n(2137),f=n(7757),m=n.n(f),d=n(2608);function g(){return(g=(0,h.Z)(m().mark((function e(t){var n,r,a;return m().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=new Headers,r="Bearer "+t,n.append("Authorization",r),a={method:"GET",headers:n},e.abrupt("return",fetch(d.B.graphMeEndpoint,a).then((function(e){return e.json()})).catch((function(e){return console.log(e)})));case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var b=n(9616),E=(0,u.Z)((function(e){return{root:{margin:20,padding:20},sectionTitle:{paddingBottom:10}}}));function v(){var e=E(),t=(0,s.Fp)(),n=t.instance,u=t.accounts,h=t.inProgress,f=(0,s.mA)(u[0]||{});return f&&h===l.$H.None&&n.acquireTokenSilent(Object.assign({},p.Q,{account:f})).then((function(e){console.log(f.name),function(e){return g.apply(this,arguments)}(e.accessToken).then((function(e){return console.log(e)}))})),(0,b.RY)("20210312064310").then((function(e){return console.log(e)})),r.createElement(a.Z,null,r.createElement(o.Z,{elevation:3,className:e.root},r.createElement(c.Z,{variant:"h6",className:e.sectionTitle},r.createElement(s.NY,null,r.createElement(c.Z,{variant:"h6"},r.createElement("center",null,"Logged-In."))),r.createElement(s.ae,null,r.createElement(c.Z,{variant:"h6"},r.createElement("center",null,"Please sign-in to see your profile information."))))),r.createElement(i.q,null,r.createElement("title",null,"Bipul Raman's Web")))}},9616:function(e,t,n){"use strict";n.d(t,{RY:function(){return u}});var r=n(2137),a=n(7757),o=n.n(a),c=n(2608);function u(e){return i.apply(this,arguments)}function i(){return(i=(0,r.Z)(o().mark((function e(t){var n;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n={method:"GET",headers:{"Content-Type":"application/json"}},e.abrupt("return",fetch(c.N.GetById+"/"+t,n).then((function(e){return e.json()})).catch((function(e){return console.log(e)})));case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}}}]);
//# sourceMappingURL=component---src-pages-login-js-5f4d82f41ec5cbfebb09.js.map