"use strict";(self.webpackChunkbipul_raman=self.webpackChunkbipul_raman||[]).push([[524],{940:function(t,e,n){n.r(e),n.d(e,{default:function(){return h}});var r=n(7294),o=n(8406),i=n(5604),a=n(6796),c=n(818),u=n(8919),s=n(1334),p=n(1423),l=n(2489),f=(0,o.Z)((function(){return{root:{margin:20,padding:20,height:"80vh"},rootNoLive:{margin:20,padding:20},sectionTitle:{paddingBottom:10},videoContainer:{margin:20,padding:20,position:"relative",paddingBottom:"53%",height:"0"},video:{position:"absolute",top:0,left:0,width:"95%",height:"95%"},img:{maxWidth:"560px",width:"100%"}}}));function h(){var t=f(),e=(0,r.useState)(null),n=e[0],o=e[1];return(0,r.useEffect)((function(){(0,u.i)().then((function(t){if(void 0!==t){console.log(t.value);var e=t.value.find((function(t){return"YTLiveUrlKey"===t.RowKey})).value;o(e)}}))}),[]),r.createElement(c.Z,null,n?r.createElement("div",{className:t.videoContainer},r.createElement("iframe",{title:"LiveStream",src:"https://www.youtube-nocookie.com/embed/"+n,frameborder:"0",allowfullscreen:!0,className:t.video})):r.createElement(i.Z,{elevation:3,className:t.rootNoLive},r.createElement(a.Z,{variant:"h6",className:t.sectionTitle},"Bipul is not Livestreaming right now."),r.createElement("br",null),r.createElement("br",null),r.createElement("img",{src:s.rU.NotLive,className:t.img,alt:"Bipul is not Livestreaming."})),r.createElement(l.Z,{Title:p.FB.Title,Description:p.FB.Description}))}},8919:function(t,e,n){n.d(e,{uH:function(){return m},ab:function(){return B},RY:function(){return w},I6:function(){return y},jU:function(){return h},Jc:function(){return b},i:function(){return E}});var r=n(5861),o=n(4687),i=n.n(o),a="https://bipulappapi.azurewebsites.net/api/BlogNew",c="https://bipulappapi.azurewebsites.net/api/BlogDelete",u="https://bipulapppublicapi.azurewebsites.net/api/Blog",s="https://bipulapppublicapi.azurewebsites.net/api/SiteConfig",p="https://bipulappstorage.table.core.windows.net/Blogs?sv=2018-03-28&si=ViewBlogs&tn=blogs&sig=mPxjbfPbdqcc3PA%2BNhomdaUkkNAv%2BTUyu8lXC%2Fc2%2FVY%3D",l="https://bipulappstorage.table.core.windows.net/Blogs?sv=2018-03-28&si=ViewBlogs&tn=blogs&sig=mPxjbfPbdqcc3PA%2BNhomdaUkkNAv%2BTUyu8lXC%2Fc2%2FVY%3D&$top=5",f="https://bipulappstorage.table.core.windows.net/Config?sv=2018-03-28&si=ViewConfig&tn=config&sig=xcIl81rzfecn2QMunp5hG4VTp7BzTB4PRLWmSM1Y9Fc%3D";function h(t,e){return d.apply(this,arguments)}function d(){return(d=(0,r.Z)(i().mark((function t(e,n){var r,o,c;return i().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=new Headers,o="Bearer "+e,r.append("Authorization",o),r.append("Access-Control-Allow-Origin","*"),r.append("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept"),c={method:"POST",headers:r,body:n},t.abrupt("return",fetch(a,c).then((function(t){return t.json()})).catch((function(t){return console.log(t)})));case 7:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function m(t,e){return g.apply(this,arguments)}function g(){return(g=(0,r.Z)(i().mark((function t(e,n){var r;return i().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r={method:"DELETE",headers:{"Access-Control-Allow-Origin":"*","Access-Control-Allow-Headers":"Origin, X-Requested-With, Content-Type, Accept",Authorization:"Bearer "+e}},t.abrupt("return",fetch(c+"/"+n,r).then((function(t){return t.json()})).catch((function(t){return console.log(t)})));case 2:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function w(t){return v.apply(this,arguments)}function v(){return(v=(0,r.Z)(i().mark((function t(e){var n;return i().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n={method:"GET",headers:{"Access-Control-Allow-Origin":"*","Access-Control-Allow-Headers":"Origin, X-Requested-With, Content-Type, Accept","Content-Type":"application/json"}},t.abrupt("return",fetch(u+"/"+e,n).then((function(t){return t.json()})).catch((function(t){return console.log(t)})));case 2:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function b(){return A.apply(this,arguments)}function A(){return(A=(0,r.Z)(i().mark((function t(){var e;return i().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e={method:"GET",headers:{"Access-Control-Allow-Origin":"*","Access-Control-Allow-Headers":"Origin, X-Requested-With, Content-Type, Accept"}},t.abrupt("return",fetch(s,e).then((function(t){return t.json()})).catch((function(t){return console.log(t)})));case 2:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function y(t){return C.apply(this,arguments)}function C(){return(C=(0,r.Z)(i().mark((function t(e){var n;return i().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n={method:"GET",headers:{Accept:"application/json;odata=nometadata"}},t.abrupt("return",fetch(p+"&$filter=RowKey%20eq%20'"+e+"'",n).then((function(t){return t.json()})).catch((function(t){return console.log(t)})));case 2:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function B(t){return T.apply(this,arguments)}function T(){return(T=(0,r.Z)(i().mark((function t(e){var n;return i().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n={method:"GET",headers:{Accept:"application/json;odata=nometadata"}},t.abrupt("return",fetch(l+"&$filter=RowKey%20gt%20'"+e+"'",n).then((function(t){return t.json()})).catch((function(t){return console.log(t)})));case 2:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function E(){return k.apply(this,arguments)}function k(){return(k=(0,r.Z)(i().mark((function t(){var e;return i().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e={method:"GET",headers:{Accept:"application/json;odata=nometadata"}},t.abrupt("return",fetch(f,e).then((function(t){return t.json()})).catch((function(t){return console.log(t)})));case 2:case"end":return t.stop()}}),t)})))).apply(this,arguments)}}}]);
//# sourceMappingURL=component---src-pages-live-js-30798c2552753b6179ed.js.map