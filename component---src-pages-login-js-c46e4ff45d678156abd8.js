(self.webpackChunkbipul_raman=self.webpackChunkbipul_raman||[]).push([[875],{3380:function(e,t,n){"use strict";n.d(t,{BE:function(){return i},Ni:function(){return r}});var i={graphMeEndpoint:"https://graph.microsoft.com/v1.0/me"},r={LoginAAD:"https://bipulappapi.azurewebsites.net/.auth/login/aad",Create:"https://bipulappapi.azurewebsites.net/api/BlogCreate",Delete:"https://bipulappapi.azurewebsites.net/api/BlogDelete",GetById:"https://bipulappapi.azurewebsites.net/api/BlogGetById"}},1587:function(e,t,n){"use strict";n.d(t,{LA:function(){return i},xG:function(){return r},v$:function(){return o},rr:function(){return a},XS:function(){return s},ye:function(){return l},G3:function(){return u},gu:function(){return c},$N:function(){return p}});var i={Title:"Error | Bipul's Web",Description:"Error Page"},r={Title:"New Blog by Bipul | Bipul's Web",Description:"Open this link to read this new blog by Bipul Raman. Disclaimer: The views, thoughts, and opinions expressed in the blog belong solely to the author."},o={Title:"Discliamer | Bipul's Web",Description:"Discliamer Statement for Bipul's Web."},a={Title:"Welcome | Bipul's Web",Description:"Welcome to Bipul Raman's website. You can read more on this website about his work, achievements and blogs."},s={Title:"Login | Bipul's Web",Description:"Login to Bipul's Web"},l={Title:"New Blog | Bipul's Web",Description:"Create a new blog on Bipul's Web"},u={Title:"Privacy Policy | Bipul's Blog",Description:"Privacy Policy of Bipul's Blog"},c={Title:"Test Page | Bipul's Blog",Description:"Test Page of Bipul's Blog"},p={Title:"Career Timeline | Bipul's Web",Description:"Graphical timeline view of Bipul's milestone in his career."}},7467:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return b}});var i=n(7294),r=n(6992),o=n(8063),a=n(453),s=n(920),l=n(169),u=n(1587),c=n(3750),p=n(9879),f=n(4975),h=n(9918),g=(0,s.Z)((function(){return{root:{margin:20,padding:20},sectionTitle:{paddingBottom:10}}}));function b(){var e=g(),t=(0,c.Fp)(),n=t.instance,s=t.accounts,b=t.inProgress,m=(0,c.mA)(s[0]||{});return m&&b===p.$H.None&&n.acquireTokenSilent(Object.assign({},f.Qb,{account:m,scopes:f.Qb.graphAPIScopes})).then((function(e){console.log(e),(0,h.L)(e.accessToken).then((function(e){return console.log(e)}))})),i.createElement(r.Z,null,i.createElement(o.Z,{elevation:3,className:e.root},i.createElement("div",{className:e.sectionTitle},i.createElement(c.NY,null,i.createElement(a.Z,{variant:"h6"},i.createElement("center",null,"Logged-In."))),i.createElement(c.ae,null,i.createElement(a.Z,{variant:"h6"},i.createElement("center",null,"Please sign-in to see your profile information."))))),i.createElement(l.Z,{Title:u.XS.Title,Description:u.XS.Description}))}},9918:function(e,t,n){"use strict";n.d(t,{L:function(){return s}});var i=n(2137),r=n(7757),o=n.n(r),a=n(3380);function s(e){return l.apply(this,arguments)}function l(){return(l=(0,i.Z)(o().mark((function e(t){var n,i,r;return o().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=new Headers,i="Bearer "+t,n.append("Authorization",i),r={method:"GET",headers:n},e.abrupt("return",fetch(a.BE.graphMeEndpoint,r).then((function(e){return e.json()})).catch((function(e){return console.log(e)})));case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}}}]);
//# sourceMappingURL=component---src-pages-login-js-c46e4ff45d678156abd8.js.map