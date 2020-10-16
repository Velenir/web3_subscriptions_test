(this.webpackJsonpweb3_subscriptions_test=this.webpackJsonpweb3_subscriptions_test||[]).push([[0],{177:function(e,n,t){e.exports=t(453)},183:function(e,n,t){},195:function(e,n){},203:function(e,n){},220:function(e,n){},222:function(e,n){},237:function(e,n){},239:function(e,n){},387:function(e,n){},398:function(e,n){},401:function(e,n){},453:function(e,n,t){"use strict";t.r(n);var r=t(1),c=t.n(r),o=t(176),a=t(10),l=t(22),u=t.n(l),i=t(100),s=(t(183),t(56)),b=t.n(s),f=function(e){var n=function(e){var n=Object(r.useState)({}),t=Object(a.a)(n,2),c=t[0],o=t[1],l=Object(r.useState)(),u=Object(a.a)(l,2),i=u[0],s=u[1];return Object(r.useEffect)((function(){e.send({method:"web3_clientVersion",jsonrpc:"2.0",params:[]},(function(e,n){if(e)return s(e),void o({});n&&(o(n),s(null))}))}),[e]),{clientVersion:c,error:i}}(e.provider),t=n.clientVersion,o=n.error;return c.a.createElement("div",null,o&&c.a.createElement("pre",null,"Error getting client version [["," ",o.message||JSON.stringify(o)," ]]"),t&&c.a.createElement("pre",null,"ClientVersion: ",JSON.stringify(t,null,1)))},d=function(e){var n=Object(r.useState)([]),t=Object(a.a)(n,2),c=t[0],o=t[1];return Object(r.useEffect)((function(){e.eth.getAccounts().then(o)}),[e]),c},g=function(e){var n=e.web3,t=d(n);return c.a.createElement("p",null,"Accounts: ",t)},m={1:"mainnet",3:"ropsten",4:"rinkeby",5:"goerli",42:"kovan"},p=function(e){var n=function(e){var n=Object(r.useState)(),t=Object(a.a)(n,2),c=t[0],o=t[1];return Object(r.useEffect)((function(){e.eth.net.getId().then((function(e){return o(m[e])}))}),[e]),c}(e.web3);return c.a.createElement("p",null,"Network: ",n)},v=function(e){var n=function(e){var n=Object(r.useState)(),t=Object(a.a)(n,2),c=t[0],o=t[1];return Object(r.useEffect)((function(){e.eth.net.getId().then(o)}),[e]),c}(e.web3);return c.a.createElement("p",null,"ChainId: ",n)},E=function(e){var n=function(e){var n=Object(r.useState)(""),t=Object(a.a)(n,2),c=t[0],o=t[1],l=d(e),u=Object(a.a)(l,1)[0];return Object(r.useEffect)((function(){u&&e.eth.getBalance(u).then(o)}),[e,u]),c}(e.web3);return c.a.createElement("p",null,"Balance: ",+n/1e18," ETH")},O=function(e,n){Object(r.useEffect)((function(){e();var t=setInterval(e,n);return function(){return clearInterval(t)}}),[e,n])},w=function(e){var n=e.web3,t=e.interval,o=function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:8e3,t=Object(r.useState)(),c=Object(a.a)(t,2),o=c[0],l=c[1],u=Object(r.useState)(null),i=Object(a.a)(u,2),s=i[0],b=i[1],f=Object(r.useCallback)((function(){return e.eth.getBlock("latest").then((function(e){l(e),b(null)})).catch(b)}),[e]);return O(f,n),{block:o,error:s}}(n,t),l=o.block,u=o.error;return c.a.createElement("div",null,c.a.createElement("h3",null,"Polling Latest Block every ",t/1e3," sec"),l&&c.a.createElement("h4",null,"Current block: ",l.number),u&&c.a.createElement("pre",null,"Error getting client version [["," ",u.message||JSON.stringify(u)," ]]"),l&&c.a.createElement("pre",null,"Block: ",JSON.stringify(l,null,1)))},j=function(e){var n=function(e){var n=Object(r.useState)(),t=Object(a.a)(n,2),c=t[0],o=t[1],l=Object(r.useState)(""),u=Object(a.a)(l,2),i=u[0],s=u[1],b=Object(r.useState)(null),f=Object(a.a)(b,2),d=f[0],g=f[1];return Object(r.useEffect)((function(){var n=e.eth.subscribe("newBlockHeaders",(function(e,n){e?(console.error("CB:newBlockHeaders:error",e),g(e)):console.log("CB:newBlockHeaders:result",n)})).on("connected",(function(e){console.log("connected:newBlockHeaders:id",e),s(e)})).on("changed",(function(e){console.log("changed:newBlockHeaders:id",e)})).on("data",(function(e){console.log("data:newBlockHeaders:blockHeader",e),o(e),g(null)})).on("error",(function(e){console.error("error:newBlockHeaders",e),g(e)}));return function(){n.unsubscribe()}}),[e]),{block:c,error:d,subscriptionId:i}}(e.web3),t=n.block,o=n.error,l=n.subscriptionId;return c.a.createElement("div",null,c.a.createElement("h3",null,"Subscribed to newBlockHeaders, id: ",l),t&&c.a.createElement("h4",null,"Current block: ",t.number),o&&c.a.createElement("pre",null,"Error subscribing to newBlockHeaders [["," ",o.message||JSON.stringify(o)," ]]"),t&&c.a.createElement("pre",null,"Block Header:: ",JSON.stringify(t,null,1)))},h=function(e){var n=function(e){var n=Object(r.useState)({}),t=Object(a.a)(n,2),c=t[0],o=t[1],l=Object(r.useState)(""),u=Object(a.a)(l,2),i=u[0],s=u[1],b=Object(r.useState)(null),f=Object(a.a)(b,2),d=f[0],g=f[1];return Object(r.useEffect)((function(){var n=e.eth.subscribe("logs",{},(function(e,n){e?(console.error("CB:logs:error",e),g(e)):console.log("CB:logs:result",n)})).on("connected",(function(e){console.log("connected:logs:id",e),s(e)})).on("changed",(function(e){console.log("changed:logs:id",e)})).on("data",(function(e){console.log("data:logs:blockHeader",e),o(e),g(null)})).on("error",(function(e){console.error("error:logs",e),g(e)}));return function(){n.unsubscribe()}}),[e]),{logs:c,error:d,subscriptionId:i}}(e.web3),t=n.logs,o=n.error,l=n.subscriptionId;return c.a.createElement("div",null,c.a.createElement("h3",null,"Subscribed to logs, id: ",l),o&&c.a.createElement("pre",null,"Error subscribing to logs [[ ",o.message||JSON.stringify(o)," ","]]"),t&&c.a.createElement("pre",null,"Latest Log:: ",JSON.stringify(t,null,1)))},k=function(e){var n=function(e){var n=Object(r.useState)([]),t=Object(a.a)(n,2),c=t[0],o=t[1],l=Object(r.useState)(""),u=Object(a.a)(l,2),i=u[0],s=u[1],b=Object(r.useState)(null),f=Object(a.a)(b,2),d=f[0],g=f[1];return Object(r.useEffect)((function(){var n=e.eth.subscribe("pendingTransactions",(function(e,n){e?(console.error("CB:pendingTransactions:error",e),g(e)):console.log("CB:pendingTransactions:result",n)})).on("connected",(function(e){console.log("connected:pendingTransactions:id",e),s(e)})).on("changed",(function(e){console.log("changed:pendingTransactions:id",e)})).on("data",(function(e){console.log("data:pendingTransactions:tx",e),o((function(n){return n.concat(e).slice(-10)})),g(null)})).on("error",(function(e){console.error("error:pendingTransactions",e),g(e)}));return function(){n.unsubscribe()}}),[e]),{pendingTransactions:c,error:d,subscriptionId:i}}(e.web3),t=n.pendingTransactions,o=n.error,l=n.subscriptionId;return c.a.createElement("div",null,c.a.createElement("h3",null,"Subscribed to pendingTransactions, id: ",l),o&&c.a.createElement("pre",null,"Error subscribing to pendingTransactions [["," ",o.message||JSON.stringify(o)," ]]"),t&&c.a.createElement("pre",null,"Pending Transactions:: ",JSON.stringify(t,null,1)))},S=function(e){var n=function(e){var n=Object(r.useState)(),t=Object(a.a)(n,2),c=t[0],o=t[1],l=Object(r.useState)(""),u=Object(a.a)(l,2),i=u[0],s=u[1],b=Object(r.useState)(null),f=Object(a.a)(b,2),d=f[0],g=f[1];return Object(r.useEffect)((function(){var n=e.eth.subscribe("syncing",(function(e,n){e?(console.error("CB:syncing:error",e),g(e)):console.log("CB:syncing:result",n)})).on("connected",(function(e){console.log("connected:syncing:id",e),s(e)})).on("changed",(function(e){console.log("changed:syncing:id",e)})).on("data",(function(e){console.log("data:syncing:blockHeader",e),o(e),g(null)})).on("error",(function(e){console.error("error:syncing",e),g(e)}));return function(){n.unsubscribe()}}),[e]),{syncing:c,error:d,subscriptionId:i}}(e.web3),t=n.syncing,o=n.error,l=n.subscriptionId;return c.a.createElement("div",null,c.a.createElement("h3",null,"Subscribed to syncing, id: ",l),o&&c.a.createElement("pre",null,"Error subscribing to syncing [["," ",o.message||JSON.stringify(o)," ]]"),void 0!==t&&c.a.createElement("pre",null,"Logs:: ",JSON.stringify(t,null,1)))};window.Web3=b.a;var y=function(){var e=Object(i.a)(u.a.mark((function e(){var n;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(window.ethereum){e.next=2;break}throw new Error("No provider available on window.ethereum");case 2:return e.next=4,window.ethereum.enable();case 4:return n=e.sent,console.log("accounts:",n),e.abrupt("return",window.ethereum);case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),B=function(){return c.a.createElement("div",{className:"reload"},c.a.createElement("button",{onClick:function(){return window.location.reload()}},"\u21bb"))};function C(){var e=function(){var e=Object(r.useState)(null),n=Object(a.a)(e,2),t=n[0],c=n[1],o=Object(r.useState)(),l=Object(a.a)(o,2),s=l[0],b=l[1];return window.provider=t,{provider:t,setProvider:c,enableProvider:function(){var e=Object(i.a)(u.a.mark((function e(){var n;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,y();case 3:n=e.sent,c(n),b(null),e.next=12;break;case 8:e.prev=8,e.t0=e.catch(0),b(e.t0),c(null);case 12:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(){return e.apply(this,arguments)}}(),error:s}}(),n=e.provider,t=e.setProvider,o=e.error,l=e.enableProvider,s=Object(r.useRef)(null),d=function(e){return Object(r.useMemo)((function(){if(!e)return{web3:null,error:null};"string"===typeof e&&(e=/^wss?:\/\/.*/.test(e)?new b.a.providers.WebsocketProvider(e,{timeout:15e3,reconnect:{auto:!0,delay:5e3,maxAttempts:void 0,onTimeout:!0}}):new b.a.providers.HttpProvider(e)),window.provider=e;try{return{web3:window.web3c=new b.a(e),error:null}}catch(n){return{web3:null,error:n}}}),[e])}(n),m=d.web3,O=d.error,C=Object(r.useState)(0),N=Object(a.a)(C,2),J=N[0],H=N[1];return c.a.createElement("div",{className:"App"},!n&&c.a.createElement(c.a.Fragment,null,c.a.createElement("button",{onClick:l},"connect to injected provider")," | or | ",c.a.createElement("input",{type:"text",placeholder:"input provider url",ref:s}),c.a.createElement("button",{onClick:function(){var e;(null===(e=s.current)||void 0===e?void 0:e.value)&&t(s.current.value)}},"connect")),n&&c.a.createElement("button",{onClick:function(){return t(null)}},"reset"),n&&c.a.createElement("button",{onClick:function(){return H((function(e){return e+1}))}},"reset subs"),o&&c.a.createElement("pre",null,"Error enabling provider: ",JSON.stringify(o,null,1)),O&&c.a.createElement("pre",null,"Error instantiating Web3: ",JSON.stringify(O,null,1)),m&&c.a.createElement(c.a.Fragment,null,c.a.createElement(g,{web3:m,key:J+"DA"}),c.a.createElement(p,{web3:m,key:J+"DN"}),c.a.createElement(v,{web3:m,key:J+"DC"}),c.a.createElement(E,{web3:m,key:J+"DB"}),c.a.createElement("hr",null),n&&"string"!==typeof n&&c.a.createElement(f,{provider:n,key:J+"DCV"}),c.a.createElement("hr",null),c.a.createElement(j,{web3:m,key:J+"LBS"}),c.a.createElement("hr",null),c.a.createElement(w,{web3:m,interval:8e3,key:J+"LBP"}),c.a.createElement("hr",null),c.a.createElement(h,{web3:m,key:J+"LS"}),c.a.createElement("hr",null),c.a.createElement(k,{web3:m,key:J+"PTS"}),c.a.createElement("hr",null),c.a.createElement(S,{web3:m,key:J+"SS"}),c.a.createElement("hr",null)),c.a.createElement(B,null))}var N=document.getElementById("root");Object(o.render)(r.createElement(C,null),N)}},[[177,1,2]]]);
//# sourceMappingURL=main.f084dacc.chunk.js.map