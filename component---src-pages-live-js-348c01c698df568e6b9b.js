(self.webpackChunkbipul_raman=self.webpackChunkbipul_raman||[]).push([[524],{7866:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return h}});var r=n(7294),o=n(920),i=n(8063),a=n(453),c=n(9455),u=n(9157),s=n(5935),p=n(1587),l=n(169),f=(0,o.Z)((function(){return{root:{margin:20,padding:20,height:"80vh"},rootNoLive:{margin:20,padding:20},sectionTitle:{paddingBottom:10},videoContainer:{margin:20,padding:20,position:"relative",paddingBottom:"53%",height:"0"},video:{position:"absolute",top:0,left:0,width:"95%",height:"95%"},img:{maxWidth:"560px",width:"100%"}}}));function h(){var e=f(),t=(0,r.useState)(null),n=t[0],o=t[1];return(0,r.useEffect)((function(){(0,u.i)().then((function(e){if(void 0!==e){console.log(e.value);var t=e.value.find((function(e){return"YTLiveUrlKey"===e.RowKey})).value;o(t)}}))}),[]),r.createElement(c.Z,null,n?r.createElement("div",{className:e.videoContainer},r.createElement("iframe",{title:"LiveStream",src:"https://www.youtube-nocookie.com/embed/"+n,frameborder:"0",allowfullscreen:!0,className:e.video})):r.createElement(i.Z,{elevation:3,className:e.rootNoLive},r.createElement(a.Z,{variant:"h6",className:e.sectionTitle},"Bipul is not Livestreaming right now."),r.createElement("br",null),r.createElement("br",null),r.createElement("img",{src:s.rU.NotLive,className:e.img,alt:"Bipul is not Livestreaming."})),r.createElement(l.Z,{Title:p.FB.Title,Description:p.FB.Description}))}},9157:function(e,t,n){"use strict";n.d(t,{uH:function(){return d},ab:function(){return y},RY:function(){return g},I6:function(){return v},jU:function(){return f},i:function(){return B}});var r=n(2137),o=n(7757),i=n.n(o),a="https://bipulappapi.azurewebsites.net/api/BlogNew",c="https://bipulappapi.azurewebsites.net/api/BlogDelete",u="https://bipulapppublicapi.azurewebsites.net/api/Blog",s="https://bipulappstorage.table.core.windows.net/Blogs?sv=2018-03-28&si=ViewBlogs&tn=blogs&sig=mPxjbfPbdqcc3PA%2BNhomdaUkkNAv%2BTUyu8lXC%2Fc2%2FVY%3D",p="https://bipulappstorage.table.core.windows.net/Blogs?sv=2018-03-28&si=ViewBlogs&tn=blogs&sig=mPxjbfPbdqcc3PA%2BNhomdaUkkNAv%2BTUyu8lXC%2Fc2%2FVY%3D&$top=5",l="https://bipulappstorage.table.core.windows.net/Config?sv=2018-03-28&si=ViewConfig&tn=config&sig=xcIl81rzfecn2QMunp5hG4VTp7BzTB4PRLWmSM1Y9Fc%3D";function f(e,t){return h.apply(this,arguments)}function h(){return(h=(0,r.Z)(i().mark((function e(t,n){var r,o,c;return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=new Headers,o="Bearer "+t,r.append("Authorization",o),r.append("Access-Control-Allow-Origin","*"),r.append("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept"),c={method:"POST",headers:r,body:n},e.abrupt("return",fetch(a,c).then((function(e){return e.json()})).catch((function(e){return console.log(e)})));case 7:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function d(e,t){return m.apply(this,arguments)}function m(){return(m=(0,r.Z)(i().mark((function e(t,n){var r;return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r={method:"DELETE",headers:{"Access-Control-Allow-Origin":"*","Access-Control-Allow-Headers":"Origin, X-Requested-With, Content-Type, Accept",Authorization:"Bearer "+t}},e.abrupt("return",fetch(c+"/"+n,r).then((function(e){return e.json()})).catch((function(e){return console.log(e)})));case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function g(e){return w.apply(this,arguments)}function w(){return(w=(0,r.Z)(i().mark((function e(t){var n;return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n={method:"GET",headers:{"Access-Control-Allow-Origin":"*","Access-Control-Allow-Headers":"Origin, X-Requested-With, Content-Type, Accept","Content-Type":"application/json"}},e.abrupt("return",fetch(u+"/"+t,n).then((function(e){return e.json()})).catch((function(e){return console.log(e)})));case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function v(e){return b.apply(this,arguments)}function b(){return(b=(0,r.Z)(i().mark((function e(t){var n;return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n={method:"GET",headers:{Accept:"application/json;odata=nometadata"}},e.abrupt("return",fetch(s+"&$filter=RowKey%20eq%20'"+t+"'",n).then((function(e){return e.json()})).catch((function(e){return console.log(e)})));case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function y(e){return A.apply(this,arguments)}function A(){return(A=(0,r.Z)(i().mark((function e(t){var n;return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n={method:"GET",headers:{Accept:"application/json;odata=nometadata"}},e.abrupt("return",fetch(p+"&$filter=RowKey%20gt%20'"+t+"'",n).then((function(e){return e.json()})).catch((function(e){return console.log(e)})));case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function B(){return T.apply(this,arguments)}function T(){return(T=(0,r.Z)(i().mark((function e(){var t;return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t={method:"GET",headers:{Accept:"application/json;odata=nometadata"}},e.abrupt("return",fetch(l,t).then((function(e){return e.json()})).catch((function(e){return console.log(e)})));case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}}}]);
//# sourceMappingURL=component---src-pages-live-js-348c01c698df568e6b9b.js.map