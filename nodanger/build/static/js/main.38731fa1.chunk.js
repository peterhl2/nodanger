(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{116:function(e,t,a){},117:function(e,t,a){e.exports=a.p+"static/media/logo.ee7cd8ed.svg"},141:function(e,t,a){e.exports=a(284)},146:function(e,t,a){},147:function(e,t,a){},149:function(e,t,a){},284:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),s=a(29),o=a.n(s),c=(a(146),a(7)),i=a(8),l=a(10),h=a(9),u=a(11),d=a(3),m=a(117),p=a.n(m),g=(a(147),a(55),a(148),a(286)),y=a(54);var b=function(e){return r.a.createElement("div",{className:"tryagain"},r.a.createElement("h2",{style:{color:"red"}},"Please try a different Username/Password"))},v=(a(149),function(e){function t(){var e;return Object(c.a)(this,t),(e=Object(l.a)(this,Object(h.a)(t).call(this))).state={username:"",password:"",tryAgain:!1},e.handleChange=e.handleChange.bind(Object(d.a)(Object(d.a)(e))),e.handleSubmit=e.handleSubmit.bind(Object(d.a)(Object(d.a)(e))),e}return Object(u.a)(t,e),Object(i.a)(t,[{key:"checkUserExists",value:function(){var e="".concat("http://localhost:8080","/senddata"),t=!1;return fetch(e,{method:"POST",body:JSON.stringify({username:this.state.username})}).then(function(e){return e.json()}).then(function(e){t=e.exists}).catch(console.err),t}},{key:"createUser",value:function(){var e="".concat("http://localhost:8080","/senddata"),t={username:this.state.username,password:this.state.password};fetch(e,{method:"POST",body:JSON.stringify(t)}).then(function(e){return e.json()}).then(console.log).catch(console.err)}},{key:"handleChange",value:function(e){var t=e.target,a=t.name,n=t.value;this.setState(Object(y.a)({},a,[n]))}},{key:"handleSubmit",value:function(e){var t=e.target.name;this.setState({tryAgain:!1});"signup"===t?(this.createUser(),this.props.logIn()):"login"===t&&this.setState({tryAgain:!0})}},{key:"render",value:function(){return r.a.createElement("div",{className:"user"},r.a.createElement("input",{className:"row col",type:"text",placeholder:"Username",name:"username",value:this.state.username,onChange:this.handleChange}),r.a.createElement("input",{className:"row col",type:"text",placeholder:"Password",name:"password",value:this.state.password,onChange:this.handleChange}),r.a.createElement("div",{className:"row"},r.a.createElement("button",{className:"btn btn-primary col-4 btnSpace",name:"login",onClick:this.handleSubmit},"Log In"),r.a.createElement("button",{className:"btn btn-primary col-4 btnSpace",name:"signup",onClick:this.handleSubmit},"Sign Up")),this.state.tryAgain?r.a.createElement(b,null):null)}}]),t}(n.Component)),f=function(e){function t(){return Object(c.a)(this,t),Object(l.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(i.a)(t,[{key:"getTable",value:function(){return r.a.createElement("div",null)}},{key:"render",value:function(){var e=this.getTable();return r.a.createElement("div",{className:"queryResults"},e)}}]),t}(n.Component),E=function(e){function t(){return Object(c.a)(this,t),Object(l.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"selectors"},r.a.createElement("select",{id:"crimeType",name:"crimeType",value:this.props.crimeType,onChange:this.props.handleChange},r.a.createElement("option",{value:"LOST ARTICLES"},"Lost Articles"),r.a.createElement("option",{value:"MIP"},"MIP"),r.a.createElement("option",{value:"NO DRIVERS LICENSE"},"No Drivers License"),r.a.createElement("option",{value:"THEFT-LOST PROPERTY"},"Theft-list property"),r.a.createElement("option",{value:"BURGLARY"},"Burglary"),r.a.createElement("option",{value:"BATTERY"},"Battery")),r.a.createElement("select",{id:"weekday",name:"weekday",value:this.props.weekday,onChange:this.props.handleChange},r.a.createElement("option",{value:"0"},"sunday"),r.a.createElement("option",{value:"1"},"monday"),r.a.createElement("option",{value:"2"},"tuesday"),r.a.createElement("option",{value:"3"},"wednesday"),r.a.createElement("option",{value:"4"},"thursday"),r.a.createElement("option",{value:"5"},"friday"),r.a.createElement("option",{value:"6"},"saturday")),r.a.createElement("input",{name:"latitude",value:this.props.latitude,type:"text",placeholder:"latitude",onChange:this.props.handleChange}),r.a.createElement("input",{name:"longtitude",value:this.props.longtitude,type:"text",placeholder:"longtitude",onChange:this.props.handleChange}))}}]),t}(n.Component),C="http://localhost:8080",O=function(e){function t(){var e;return Object(c.a)(this,t),(e=Object(l.a)(this,Object(h.a)(t).call(this))).state={query:"",queryData:[],start:"",dest:"",fields:"",crimeType:"",weekday:"",latitude:"",longtitude:""},e.handleQuery=e.handleQuery.bind(Object(d.a)(Object(d.a)(e))),e.handleChange=e.handleChange.bind(Object(d.a)(Object(d.a)(e))),e.handleTableChange=e.handleTableChange.bind(Object(d.a)(Object(d.a)(e))),e.handleAdv=e.handleAdv.bind(Object(d.a)(Object(d.a)(e))),e}return Object(u.a)(t,e),Object(i.a)(t,[{key:"handleQuery",value:function(e){var t=e.target.id,a=this.state.query;if(console.log(t,a),"crimes"===t){var n="".concat(C,"/getcrimetypes");fetch(n).then(function(e){return e.text()}).then(console.log).catch(console.err)}else if("query_crime"===t){var r="".concat(C,"/getcrimebyid")+"/"+this.state.query;fetch(r).then(function(e){return e.text()}).then(console.log).catch(console.err)}else if("query_type"===t){var s="".concat(C,"/getcrimebytype")+"/"+this.state.query;fetch(s).then(function(e){return e.text()}).then(console.log).catch(console.err)}}},{key:"handleTableChange",value:function(e){var t=e.target.id;if("insert"===t){var a="".concat(C,"/insert")+"/"+this.state.query+"/"+this.state.fields;fetch(a).then(function(e){return e.text()}).then(console.log).catch(console.err)}else if("delete"===t){var n="".concat(C,"/delete")+"/"+this.state.query+"/"+this.state.fields;fetch(n).then(function(e){return e.text()}).then(console.log).catch(console.err)}else if("update"===t){var r="".concat(C,"/update")+"/"+this.state.query+"/"+this.state.fields;fetch(r).then(function(e){return e.text()}).then(console.log).catch(console.err)}}},{key:"handleAdv",value:function(e){var t=e.target.id;if("adv1"===t){var a="".concat(C,"/getnumberofcrimes");fetch(a).then(function(e){return e.text()}).then(console.log).catch(console.err)}else if("adv2"===t){var n="".concat(C,"/getuserinfo");fetch(n).then(function(e){return e.text()}).then(console.log).catch(console.err)}}},{key:"handleChange",value:function(e){var t=e.target,a=t.name,n=t.value;this.setState(Object(y.a)({},a,[n]))}},{key:"render",value:function(){return r.a.createElement("div",{className:"query"},r.a.createElement("div",{className:"row"},r.a.createElement("input",{className:"col-10",name:"query",type:"text",placeholder:"Query or ID",value:this.state.query,onChange:this.handleChange})),r.a.createElement("div",{className:"row"},r.a.createElement("input",{className:"col-10",name:"start",type:"text",placeholder:"Start Location",value:this.state.start,onChange:this.handleChange})),r.a.createElement("div",{className:"row"},r.a.createElement("input",{className:"col-10",name:"dest",type:"text",placeholder:"Destination",value:this.state.dest,onChange:this.handleChange})),r.a.createElement("div",{className:"row"},r.a.createElement("input",{className:"col-10",name:"fields",type:"text",placeholder:"Argument Fields",value:this.state.fields,onChange:this.handleChange}),r.a.createElement(E,{handleChange:this.handleChange,crimeType:this.state.crimeType,weekday:this.state.weekday,latitude:this.state.latitude,longtitude:this.state.longtitiude})),r.a.createElement("div",{className:"row"},r.a.createElement(g.a,{trigger:r.a.createElement("button",{onClick:this.handleQuery,id:"columns",className:"ui icon btn btn-danger",style:{margin:"10px"}},"Columns"),position:"bottom center",content:"List Col names"}),r.a.createElement(g.a,{trigger:r.a.createElement("button",{onClick:this.handleQuery,id:"crimes",className:"ui icon btn btn-danger",style:{margin:"10px"}},"Crimes"),position:"bottom center",content:"List Crime Types"})),r.a.createElement("div",{className:"row"},r.a.createElement(g.a,{trigger:r.a.createElement("button",{onClick:this.handleQuery,id:"query_crime",className:"ui icon btn btn-primary",style:{margin:"10px"}},"Crime"),position:"bottom center",content:"mm/dd/yyyy"}),r.a.createElement(g.a,{trigger:r.a.createElement("button",{onClick:this.handleQuery,id:"query_time",className:"ui icon btn btn-primary",style:{margin:"10px"}},"Time"),position:"bottom center",content:"24 hour system"}),r.a.createElement(g.a,{trigger:r.a.createElement("button",{onClick:this.handleQuery,id:"query_date",className:"ui icon btn btn-primary",style:{margin:"10px"}},"Date"),position:"bottom center",content:"mm/dd/yyyy"}),r.a.createElement(g.a,{trigger:r.a.createElement("button",{onClick:this.handleQuery,id:"query_type",className:"ui icon btn btn-primary",style:{margin:"10px"}},"Type"),position:"bottom center",content:"Theft, Car, MIP"}),r.a.createElement(g.a,{trigger:r.a.createElement("button",{onClick:this.handleQuery,id:"query_location",className:"ui icon btn btn-primary",style:{margin:"10px"}},"Location"),position:"bottom center",content:"Grainger, ECEB, Bardeen"})),r.a.createElement("div",{className:"row"},r.a.createElement(g.a,{trigger:r.a.createElement("button",{onClick:this.handleTableChange,id:"insert",className:"ui icon btn btn-success",style:{margin:"10px"}},"Insert"),position:"bottom center",content:"fields: /id/cols"}),r.a.createElement(g.a,{trigger:r.a.createElement("button",{onClick:this.handleTableChange,id:"delete",className:"ui icon btn btn-success",style:{margin:"10px"}},"Delete"),position:"bottom center",content:"fields: /id/"}),r.a.createElement(g.a,{trigger:r.a.createElement("button",{onClick:this.handleTableChange,id:"update",className:"ui icon btn btn-success",style:{margin:"10px"}},"Update"),position:"bottom center",content:"fields: /id/cols"})),r.a.createElement("div",{className:"row"},r.a.createElement(g.a,{trigger:r.a.createElement("button",{onClick:this.handleAdv,id:"adv1",className:"ui icon btn btn-info",style:{margin:"10px"}},"Adv 1"),position:"bottom center",content:"fields: /id/cols"}),r.a.createElement(g.a,{trigger:r.a.createElement("button",{onClick:this.handleAdv,id:"adv2",className:"ui icon btn btn-info",style:{margin:"10px"}},"Adv 2"),position:"bottom center",content:"fields: /id/cols"})),r.a.createElement(f,{queryData:this.state.queryData}))}}]),t}(n.Component),k=a(131),j=a.n(k);a(116);var x=function(e){return r.a.createElement("div",{lat:e.lat,lng:e.lng},r.a.createElement("span",{className:"crime"},e.text))},N=function(e){function t(){return Object(c.a)(this,t),Object(l.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e;return this.props.idx==this.props.startIdx?e={backgroundColor:"red"}:this.props.idx==this.props.destIdx&&(e={backgroundColor:"green"}),r.a.createElement("div",{lat:this.props.lat,lng:this.props.lng},r.a.createElement("span",{className:"location",style:e},this.props.text))}}]),t}(n.Component),S=function(e){function t(){var e;return Object(c.a)(this,t),(e=Object(l.a)(this,Object(h.a)(t).call(this))).state={pickStart:!0,start:{},startIdx:0,dest:{},destIdx:0},e.mapClick=e.mapClick.bind(Object(d.a)(Object(d.a)(e))),e}return Object(u.a)(t,e),Object(i.a)(t,[{key:"mapClick",value:function(e,t){this.state.pickStart?(this.setState({pickStart:!1,start:t,startIdx:e}),this.props.setStartDest(t,this.state.dest)):(this.setState({pickStart:!0,dest:t,destIdx:e}),this.props.setStartDest(this.state.start,t))}},{key:"createCrimeMkrs",value:function(e){for(var t=[],a=0;a<e.length;a++)t.push(r.a.createElement(x,{key:a+2,lat:e[a].lat,lng:e[a].lng,text:"Crime!!!!!"}));return t}},{key:"createLocationMkrs",value:function(){for(var e=[],t=0;t<11;t++)for(var a=0;a<12;a++){var n=a+12*t;e.push(r.a.createElement(N,{key:n,idx:n,lat:40.116264-.00318*t,lng:-88.208665-.00318*a,text:"",startIdx:this.state.startIdx,destIdx:this.state.destIdx}))}return e}},{key:"render",value:function(){var e=this.createCrimeMkrs(this.props.crimes),t=this.createLocationMkrs();return r.a.createElement("div",{style:{height:"100vh",width:"100%"}},r.a.createElement(j.a,{bootstrapURLKeys:{key:"AIzaSyC333_Ypsvtldad3Je6VglYXjB7OUf-a1Y"},defaultCenter:this.props.center,defaultZoom:this.props.zoom,onChildClick:this.mapClick},e,t))}}]),t}(n.Component);S.defaultProps={center:{lat:40.1105883,lng:-88.2220708},zoom:15};var w=S,T=function(e){function t(){var e;return Object(c.a)(this,t),(e=Object(l.a)(this,Object(h.a)(t).call(this))).state={loggedIn:!1,start:{lat:"40.1",lng:"-88.24"},dest:{lat:"40.12",lng:"-88.21"}},e.logIn=e.logIn.bind(Object(d.a)(Object(d.a)(e))),e.sendData=e.sendData.bind(Object(d.a)(Object(d.a)(e))),e.setStartDest=e.setStartDest.bind(Object(d.a)(Object(d.a)(e))),e}return Object(u.a)(t,e),Object(i.a)(t,[{key:"sendData",value:function(){var e="".concat("http://localhost:8080","/senddata"),t={start:this.state.start,dest:this.state.dest};fetch(e,{method:"POST",body:JSON.stringify(t)}).then(function(e){return e.json()}).then(console.log).catch(console.err)}},{key:"setStartDest",value:function(e,t){this.setState({start:e,dest:t})}},{key:"getRequest",value:function(){var e="".concat("http://localhost:8080","/getdata");fetch(e).then(function(e){return e.json()}).then(console.log).catch(console.err)}},{key:"postRequest",value:function(e){var t="".concat("http://localhost:8080","/senddata");fetch(t,{method:"POST",body:JSON.stringify(e)}).then(function(e){return e.json()}).then(console.log).catch(console.err)}},{key:"logIn",value:function(e){var t=new Date,a="".concat("http://localhost:8080","/senddata");fetch(a,{method:"POST",body:JSON.stringify({weekday:t.getDay(),day:t.getDate(),month:t.getMonth(),year:t.getFullYear(),hour:t.getHours()})}).then(function(e){return e.json()}).then(console.log).catch(console.err),this.setState({loggedIn:!0})}},{key:"render",value:function(){var e;return e=this.state.loggedIn?r.a.createElement(O,null):r.a.createElement(v,{logIn:this.logIn}),r.a.createElement("div",{className:"App"},r.a.createElement("header",{className:"App-header"},r.a.createElement("img",{src:p.a,className:"App-logo",alt:"logo"}),r.a.createElement("p",null,"Welcome to No Danger 404, a future without risk"),e,r.a.createElement(g.a,{trigger:r.a.createElement("button",{onClick:this.sendData,id:"send",className:"ui icon btn btn-primary",style:{margin:"10px"}},"Send"),position:"bottom center",content:"Send the Start/Dest location"}),r.a.createElement(w,{start:this.state.start,dest:this.state.dest,center:{lat:40.1,lng:-88.2220708},zoom:14.5,setStartDest:this.setStartDest,crimes:[{lat:"40.1105883",lng:"-88.2220708"},{lat:"40.110",lng:"-88.22"}]})))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(T,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[141,1,2]]]);
//# sourceMappingURL=main.38731fa1.chunk.js.map