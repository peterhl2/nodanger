(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{116:function(e,t,a){},117:function(e,t,a){e.exports=a.p+"static/media/logo.ee7cd8ed.svg"},141:function(e,t,a){e.exports=a(284)},146:function(e,t,a){},147:function(e,t,a){},149:function(e,t,a){},284:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),s=a(29),i=a.n(s),o=(a(146),a(7)),c=a(8),l=a(10),h=a(9),u=a(11),d=a(3),m=a(117),p=a.n(m),g=(a(147),a(55),a(148),a(54));var b=function(e){return r.a.createElement("div",{className:"tryagain"},r.a.createElement("h2",{style:{color:"red"}},"Please try a different Username/Password"))},y=(a(149),"http://cs411-nodanger.herokuapp.com"),f=function(e){function t(){var e;return Object(o.a)(this,t),(e=Object(l.a)(this,Object(h.a)(t).call(this))).state={username:"",password:"",tryAgain:!1,exists:!1},e.handleChange=e.handleChange.bind(Object(d.a)(Object(d.a)(e))),e.handleSubmit=e.handleSubmit.bind(Object(d.a)(Object(d.a)(e))),e.checkUserExists=e.checkUserExists.bind(Object(d.a)(Object(d.a)(e))),e.createUser=e.createUser.bind(Object(d.a)(Object(d.a)(e))),e}return Object(u.a)(t,e),Object(c.a)(t,[{key:"checkUserExists",value:function(){var e=this,t="".concat(y,"/senduserexists"),a=!1,n={username:this.state.username,password:this.state.password};return fetch(t,{method:"POST",body:JSON.stringify(n)}).then(function(e){return e.json()}).then(function(t){a=t,e.setState({exists:t})}).catch(console.err),a}},{key:"createUser",value:function(){var e="".concat(y,"/sendusersignup"),t={username:this.state.username,password:this.state.password};fetch(e,{method:"POST",body:JSON.stringify(t)}).then(function(e){return e.json()}).then(console.log).catch(console.err)}},{key:"handleChange",value:function(e){var t=e.target,a=t.name,n=t.value;this.setState(Object(g.a)({},a,[n]))}},{key:"handleSubmit",value:function(e){var t=e.target.name;this.setState({tryAgain:!1}),this.checkUserExists();var a=this.state.exists;"signup"===t?a?this.setState({tryAgain:!0}):(this.createUser(),this.props.logIn()):"login"===t&&(a?this.props.logIn():this.setState({tryAgain:!0}))}},{key:"render",value:function(){return this.state.exists&&this.props.logIn(),r.a.createElement("div",{className:"user"},r.a.createElement("input",{className:"row col",type:"text",placeholder:"Username",name:"username",value:this.state.username,onChange:this.handleChange}),r.a.createElement("input",{className:"row col",type:"text",placeholder:"Password",name:"password",value:this.state.password,onChange:this.handleChange}),r.a.createElement("div",{className:"row"},r.a.createElement("button",{className:"btn btn-primary col-4 btnSpace",name:"login",onClick:this.handleSubmit},"Log In"),r.a.createElement("button",{className:"btn btn-primary col-4 btnSpace",name:"signup",onClick:this.handleSubmit},"Sign Up")),this.state.tryAgain?r.a.createElement(b,null):null)}}]),t}(n.Component),v=function(e){function t(){return Object(o.a)(this,t),Object(l.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(c.a)(t,[{key:"getTable",value:function(){return r.a.createElement("div",null)}},{key:"render",value:function(){var e=this.getTable();return r.a.createElement("div",{className:"queryResults"},e)}}]),t}(n.Component),k=a(286),E=function(e){function t(){return Object(o.a)(this,t),Object(l.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"selectors"},r.a.createElement("select",{id:"crimeType",name:"crimeType",value:this.props.crimeType,onChange:this.props.handleChange},r.a.createElement("option",{value:"LOST ARTICLES"},"Lost Articles"),r.a.createElement("option",{value:"MIP"},"MIP"),r.a.createElement("option",{value:"NO DRIVERS LICENSE"},"No Drivers License"),r.a.createElement("option",{value:"THEFT-LOST PROPERTY"},"Theft-list property"),r.a.createElement("option",{value:"BURGLARY"},"Burglary"),r.a.createElement("option",{value:"BATTERY"},"Battery")),r.a.createElement("select",{id:"weekday",name:"weekday",value:this.props.weekday,onChange:this.props.handleChange},r.a.createElement("option",{value:"0"},"sunday"),r.a.createElement("option",{value:"1"},"monday"),r.a.createElement("option",{value:"2"},"tuesday"),r.a.createElement("option",{value:"3"},"wednesday"),r.a.createElement("option",{value:"4"},"thursday"),r.a.createElement("option",{value:"5"},"friday"),r.a.createElement("option",{value:"6"},"saturday")),r.a.createElement("input",{name:"latitude",value:this.props.latitude,type:"text",placeholder:"latitude",onChange:this.props.handleChange}),r.a.createElement("input",{name:"longtitude",value:this.props.longtitude,type:"text",placeholder:"longtitude",onChange:this.props.handleChange}))}}]),t}(n.Component);var C=function(e){return r.a.createElement("div",{className:"date"},r.a.createElement("input",{className:"col-10",name:"startDate",type:"text",placeholder:"Earliest Crime Date",value:e.startDate,onChange:e.handleDateChange}),r.a.createElement("input",{className:"col-10",name:"endDate",type:"text",placeholder:"Latest Crime Date",value:e.endDate,onChange:e.handleDateChange}))},O="http://cs411-nodanger.herokuapp.com",j=function(e){function t(){var e;return Object(o.a)(this,t),(e=Object(l.a)(this,Object(h.a)(t).call(this))).state={query:"",queryData:[],fields:"",crimeType:"",weekday:"",latitude:"",longtitude:"",startDate:"",endDate:"",startDateObj:{},endDateObj:{}},e.handleQuery=e.handleQuery.bind(Object(d.a)(Object(d.a)(e))),e.handleChange=e.handleChange.bind(Object(d.a)(Object(d.a)(e))),e.handleDateChange=e.handleDateChange.bind(Object(d.a)(Object(d.a)(e))),e.handleTableChange=e.handleTableChange.bind(Object(d.a)(Object(d.a)(e))),e}return Object(u.a)(t,e),Object(c.a)(t,[{key:"handleQuery",value:function(e){var t=this,a=e.target.id;this.state.query;if("crimes_types"===a){var n="".concat(O,"/getcrimetypes");fetch(n).then(function(e){return e.text()}).then(console.log).catch(console.err)}else if("senddate"===a){var r="".concat(O,"/senddate");fetch(r,{method:"POST",body:JSON.stringify({start:this.state.startDateObj,end:this.state.endDateObj})}).then(function(e){return e.text()}).then(console.log).catch(console.err)}else if("query_crime"===a){var s="".concat(O,"/getcrime")+"/"+this.state.query;fetch(s).then(function(e){return e.json()}).then(function(e){t.props.setCrimeMkrs(e)}).catch(console.err)}else if("query_type"===a){var i="".concat(O,"/getcrimebytype")+"/"+this.state.query;fetch(i).then(function(e){return e.text()}).then(console.log).catch(console.err)}}},{key:"handleTableChange",value:function(e){var t=e.target.id;if("insert"===t){var a="".concat(O,"/insert")+"/"+this.state.query+"/"+this.state.fields;fetch(a).then(function(e){return e.text()}).then(console.log).catch(console.err)}else if("delete"===t){var n="".concat(O,"/delete")+"/"+this.state.query+"/"+this.state.fields;fetch(n).then(function(e){return e.text()}).then(console.log).catch(console.err)}else if("update"===t){var r="".concat(O,"/update")+"/"+this.state.query+"/"+this.state.fields;fetch(r).then(function(e){return e.text()}).then(console.log).catch(console.err)}}},{key:"handleChange",value:function(e){var t=e.target,a=t.name,n=t.value;this.setState(Object(g.a)({},a,[n]))}},{key:"handleDateChange",value:function(e){this.handleChange(e);var t=e.target,a=t.name,n=t.value.split("/");3!=n.length||n[2].length<4||("startDate"===a?this.setState({startDateObj:{month:parseInt(n[0]),day:parseInt(n[1]),year:parseInt(n[2])}}):this.setState({endDateObj:{month:parseInt(n[0]),day:parseInt(n[1]),year:parseInt(n[2])}}),console.log(this.state.startDateObj),console.log(this.state.endDateObj))}},{key:"render",value:function(){return r.a.createElement("div",{className:"query"},r.a.createElement("div",{className:"row"},r.a.createElement("input",{className:"col-10",name:"query",type:"text",placeholder:"Query or ID",value:this.state.query,onChange:this.handleChange})),r.a.createElement("div",{className:"row"},r.a.createElement("input",{className:"col-10",name:"fields",type:"text",placeholder:"Argument Fields",value:this.state.fields,onChange:this.handleChange}),r.a.createElement(E,{handleChange:this.handleChange,crimeType:this.state.crimeType,weekday:this.state.weekday,latitude:this.state.latitude,longtitude:this.state.longtitiude})),r.a.createElement("div",{className:"row"},r.a.createElement(C,{startDate:this.state.startDate,endDate:this.state.endDate,handleDateChange:this.handleDateChange})),r.a.createElement("div",{className:"row"},r.a.createElement(k.a,{trigger:r.a.createElement("button",{onClick:this.handleQuery,id:"crimes_types",className:"ui icon btn btn-danger",style:{margin:"10px"}},"Crimes Types"),position:"bottom center",content:"List Crime Types"}),r.a.createElement(k.a,{trigger:r.a.createElement("button",{onClick:this.handleQuery,id:"senddate",className:"ui icon btn btn-danger",style:{margin:"10px"}},"Send Dates"),position:"bottom center",content:"List Crime Types"})),r.a.createElement("div",{className:"row"},r.a.createElement(k.a,{trigger:r.a.createElement("button",{onClick:this.handleQuery,id:"query_crime",className:"ui icon btn btn-primary",style:{margin:"10px"}},"Crime"),position:"bottom center",content:"mm/dd/yyyy"}),r.a.createElement(k.a,{trigger:r.a.createElement("button",{onClick:this.handleQuery,id:"query_time",className:"ui icon btn btn-primary",style:{margin:"10px"}},"Time"),position:"bottom center",content:"24 hour system"}),r.a.createElement(k.a,{trigger:r.a.createElement("button",{onClick:this.handleQuery,id:"query_date",className:"ui icon btn btn-primary",style:{margin:"10px"}},"Date"),position:"bottom center",content:"mm/dd/yyyy"}),r.a.createElement(k.a,{trigger:r.a.createElement("button",{onClick:this.handleQuery,id:"query_type",className:"ui icon btn btn-primary",style:{margin:"10px"}},"Type"),position:"bottom center",content:"Theft, Car, MIP"}),r.a.createElement(k.a,{trigger:r.a.createElement("button",{onClick:this.handleQuery,id:"query_location",className:"ui icon btn btn-primary",style:{margin:"10px"}},"Location"),position:"bottom center",content:"Grainger, ECEB, Bardeen"})),r.a.createElement("div",{className:"row"},r.a.createElement(k.a,{trigger:r.a.createElement("button",{onClick:this.handleTableChange,id:"insert",className:"ui icon btn btn-success",style:{margin:"10px"}},"Insert"),position:"bottom center",content:"fields: /id/cols"}),r.a.createElement(k.a,{trigger:r.a.createElement("button",{onClick:this.handleTableChange,id:"delete",className:"ui icon btn btn-success",style:{margin:"10px"}},"Delete"),position:"bottom center",content:"fields: /id/"}),r.a.createElement(k.a,{trigger:r.a.createElement("button",{onClick:this.handleTableChange,id:"update",className:"ui icon btn btn-success",style:{margin:"10px"}},"Update"),position:"bottom center",content:"fields: /id/cols"})),r.a.createElement("div",{className:"row"},r.a.createElement(k.a,{trigger:r.a.createElement("button",{onClick:this.props.sendsafe,id:"send",className:"ui icon btn btn-warning",style:{margin:"10px"}},"Path"),position:"bottom center",content:"Send the Start/Dest location"}),r.a.createElement(k.a,{trigger:r.a.createElement("button",{onClick:this.props.groupDanger,id:"group",className:"ui icon btn btn-warning",style:{margin:"10px"}},"Groups"),position:"bottom center",content:"Group most dangerous areas"}),r.a.createElement(k.a,{trigger:r.a.createElement("button",{onClick:this.props.clearColors,id:"reset",className:"ui icon btn btn-warning",style:{margin:"10px"}},"Reset"),position:"bottom center",content:"Clear map colors"})),r.a.createElement(v,{queryData:this.state.queryData}))}}]),t}(n.Component),x=a(131),D=a.n(x);a(116);var S=function(e){return r.a.createElement("div",{lat:e.lat,lng:e.lng,style:e.style},r.a.createElement("span",{className:"crime",style:e.style},e.text))},I=function(e){function t(){var e;return Object(o.a)(this,t),(e=Object(l.a)(this,Object(h.a)(t).call(this))).checkPath=e.checkPath.bind(Object(d.a)(Object(d.a)(e))),e}return Object(u.a)(t,e),Object(c.a)(t,[{key:"checkPath",value:function(e){var t=this.props.pathIdx;if(0===t.length)return!1;for(var a=0;a<t.length;a++)if(t[a]===e)return!0;return!1}},{key:"checkGroup",value:function(e){var t=this.props.groupDanger;if(0===t.length)return 0;for(var a=0;a<t.length;a++)if(t[a].idx===e)return t[a].value;return 0}},{key:"render",value:function(){var e,t="";if(this.props.idx===parseInt(this.props.startIdx))e={backgroundColor:"red"};else if(this.props.idx===parseInt(this.props.destIdx))e={backgroundColor:"green"};else if(this.checkPath(this.props.idx))e={backgroundColor:"DeepSkyBlue",opacity:"1"};else if(0!==this.checkGroup(this.props.idx)){e={backgroundColor:"yellow",opacity:"1",borderRadius:"0%",color:"black"};var a=this.checkGroup(this.props.idx);t=Math.round(a)}return r.a.createElement("div",{lat:this.props.lat,lng:this.props.lng},r.a.createElement("span",{className:"location",style:e},t))}}]),t}(n.Component),N={1:"violet",2:"orchid",3:"mediumpurple",4:"mediumorchid",5:"darkorchid",6:"blueviolet",7:"darkviolet",8:"darkmegenta",9:"purple",10:"indigo"},w=function(e){function t(){var e;return Object(o.a)(this,t),(e=Object(l.a)(this,Object(h.a)(t).call(this))).state={pickStart:!0,start:{},startIdx:0,dest:{},destIdx:0},e.mapClick=e.mapClick.bind(Object(d.a)(Object(d.a)(e))),e}return Object(u.a)(t,e),Object(c.a)(t,[{key:"mapClick",value:function(e,t){this.state.pickStart?(this.setState({pickStart:!1,start:t,startIdx:e}),this.props.setStartDest(e,this.state.destIdx)):(this.setState({pickStart:!0,dest:t,destIdx:e}),this.props.setStartDest(this.state.startIdx,e))}},{key:"createCrimeMkrs",value:function(e){for(var t=[],a=0;a<e.length;a++){var n=e[a],s={backgroundColor:N[n[2]]};t.push(r.a.createElement(S,{key:a+2,lat:n[0],lng:n[1],style:s,text:"Crime!!!!!"}))}return t}},{key:"createLocationMkrs",value:function(){for(var e=[],t=0;t<11;t++)for(var a=0;a<12;a++){var n=a+12*t;e.push(r.a.createElement(I,{key:n,idx:n,lat:40.116264-.00318*t,lng:-88.208665-.00318*a,text:"",startIdx:this.state.startIdx,destIdx:this.state.destIdx,pathIdx:this.props.pathIdx,groupDanger:this.props.groupDanger}))}return e}},{key:"render",value:function(){var e=this.createCrimeMkrs(this.props.crimes),t=this.createLocationMkrs();return r.a.createElement("div",{style:{height:"100vh",width:"100%"}},r.a.createElement(D.a,{bootstrapURLKeys:{key:"AIzaSyC333_Ypsvtldad3Je6VglYXjB7OUf-a1Y"},defaultCenter:this.props.center,defaultZoom:this.props.zoom,onChildClick:this.mapClick},e,t))}}]),t}(n.Component);w.defaultProps={center:{lat:40.1105883,lng:-88.2220708},zoom:15};var T=w,q="http://cs411-nodanger.herokuapp.com",P=function(e){function t(){var e;return Object(o.a)(this,t),(e=Object(l.a)(this,Object(h.a)(t).call(this))).state={loggedIn:!1,startIdx:0,destIdx:1,pathIdx:[],groupDanger:[],crimes:[]},e.logIn=e.logIn.bind(Object(d.a)(Object(d.a)(e))),e.setCrimeMkrs=e.setCrimeMkrs.bind(Object(d.a)(Object(d.a)(e))),e.sendsafe=e.sendsafe.bind(Object(d.a)(Object(d.a)(e))),e.groupDanger=e.groupDanger.bind(Object(d.a)(Object(d.a)(e))),e.clearColors=e.clearColors.bind(Object(d.a)(Object(d.a)(e))),e.setStartDest=e.setStartDest.bind(Object(d.a)(Object(d.a)(e))),e}return Object(u.a)(t,e),Object(c.a)(t,[{key:"setCrimeMkrs",value:function(e){this.setState({crimes:e})}},{key:"sendsafe",value:function(){var e=this,t="".concat(q,"/sendsafe"),a={start:this.state.startIdx,dest:this.state.destIdx};fetch(t,{method:"POST",body:JSON.stringify(a)}).then(function(e){return e.json()}).then(function(t){e.setState({pathIdx:t})}).then(console.log).catch(console.err)}},{key:"groupDanger",value:function(){var e=this,t="".concat(q,"/groupdanger");fetch(t,{method:"POST",body:JSON.stringify({})}).then(function(e){return e.json()}).then(function(t){e.setState({groupDanger:t})}).catch(console.err)}},{key:"clearColors",value:function(){console.log("clear"),this.setState({pathIdx:[],groupDanger:[],crimes:[]})}},{key:"setStartDest",value:function(e,t){this.setState({startIdx:e,destIdx:t})}},{key:"getRequest",value:function(){var e="".concat(q,"/getdata");fetch(e).then(function(e){return e.json()}).then(console.log).catch(console.err)}},{key:"postRequest",value:function(e){var t="".concat(q,"/senddata");fetch(t,{method:"POST",body:JSON.stringify(e)}).then(function(e){return e.json()}).then(console.log).catch(console.err)}},{key:"logIn",value:function(e){var t=new Date,a="".concat(q,"/sendlogin");fetch(a,{method:"POST",body:JSON.stringify({weekday:t.getDay(),day:t.getDate(),month:t.getMonth(),year:t.getFullYear(),hour:t.getHours()})}).then(function(e){return e.json()}).then(console.log).catch(console.err),this.setState({loggedIn:!0})}},{key:"render",value:function(){var e;return e=this.state.loggedIn?r.a.createElement(j,{sendsafe:this.sendsafe,groupDanger:this.groupDanger,clearColors:this.clearColors,setCrimeMkrs:this.setCrimeMkrs}):r.a.createElement(f,{logIn:this.logIn}),r.a.createElement("div",{className:"App"},r.a.createElement("header",{className:"App-header"},r.a.createElement("img",{src:p.a,className:"App-logo",alt:"logo"}),r.a.createElement("p",null,"Welcome to No Danger 404, a future without risk"),e,r.a.createElement(T,{start:this.state.start,dest:this.state.dest,pathIdx:this.state.pathIdx,groupDanger:this.state.groupDanger,center:{lat:40.1,lng:-88.2220708},zoom:14.5,setStartDest:this.setStartDest,crimes:this.state.crimes})))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(P,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[141,1,2]]]);
//# sourceMappingURL=main.f6c84659.chunk.js.map