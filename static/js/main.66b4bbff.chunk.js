(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{157:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(76),o=a.n(i),s=(a(88),a(3)),c=a.n(s),l=a(12),u=a(6),h=a(7),d=a(9),m=a(8),p=a(10),f=(a(39),a(16)),b=a.n(f),g=a(158),v=a(159),y=a(161),w=a(53),k=a(81),x=function(e){function t(){var e,a;Object(u.a)(this,t);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(a=Object(d.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r)))).state={video:null,progress:0,stream:null},a}return Object(p.a)(t,e),Object(h.a)(t,[{key:"componentDidMount",value:function(){var e=Object(l.a)(c.a.mark(function e(){var t=this;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.setState({video:document.getElementById("preview-video")});case 2:w.takeSnapShot({webcamVideoElement:this.state.video,keepCameraOn:!0,cameraStream:this.state.stream},function(){var e=Object(l.a)(c.a.mark(function e(a){return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return console.log(a),e.next=3,t.setState({stream:a.cameraStream});case 3:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}());case 3:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"captureGIF",value:function(){var e=this;w.createGIF({gifWidth:352,gifHeight:240,keepCameraOn:!0,cameraStream:this.state.stream,numFrames:15,progressCallback:function(t){e.setState({progress:t})},completeCallback:function(){e.setState({progress:0}),console.log("done")}},function(t){t.error||(console.log(t),e.props.saveGIF(t.image))})}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"video-container",style:{zIndex:100}},r.a.createElement("div",{style:{width:"100px",position:"absolute",bottom:"4rem",left:"50%",transform:"translateX(-50%)"}},r.a.createElement(k.a,{percent:100*this.state.progress,strokeWidth:"10",strokeColor:"#e74c3c"}),r.a.createElement("button",{style:{position:"absolute",left:"50%",transform:"translate(-50%, -50%)",top:"48%",background:"transparent",fontWeight:"bold",color:"white",border:"none",fontSize:"2rem",outline:"none"},onClick:function(){return e.captureGIF()}},"Rec.")),r.a.createElement("video",{className:"video",id:"preview-video"}))}}]),t}(n.Component),I=a(17),j=function(e){function t(){return Object(u.a)(this,t),Object(d.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(h.a)(t,[{key:"submitGIF",value:function(){var e=Object(l.a)(c.a.mark(function e(t){var a,n;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return console.log(this.props.match.params.albumid),e.next=3,b.a.post("https://api.imgur.com/3/image",{image:this.props.gif.split(",")[1]},{headers:{Authorization:"Client-ID "+I.imgur.client_id}});case 3:return a=e.sent,console.log(a),n=a.data.data.deletehash,e.next=8,b.a.post("https://api.imgur.com/3/album/".concat(this.props.match.params.albumid,"/add"),{deletehashes:[n]},{headers:{Authorization:"Client-ID "+I.imgur.client_id}});case 8:this.props.exit();case 9:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()},{key:"render",value:function(){return r.a.createElement("div",{style:{width:"100vw",height:"100vh",overflow:"hidden",display:"flex",alignItems:"center",background:"url(".concat(this.props.gif,") no-repeat center center fixed"),backgroundSize:"cover"}},r.a.createElement("button",{style:{position:"absolute",margin:"0 auto",bottom:"4rem",left:"50%",transform:"translateX(-50%)",fontSize:"2rem",color:"white",fontWeight:"bold",background:"#27ae60",borderRadius:"2rem",border:"none",outline:"none",padding:".5rem 2.5rem"},onClick:this.submitGIF.bind(this)},"Submit"),r.a.createElement("button",{style:{position:"absolute",margin:"0 auto",top:"1rem",left:"1rem",backgroundColor:"#e74c3c",outline:"none",border:"none",height:"2rem",width:"2rem",borderRadius:"50%",fontSize:"1rem",color:"white",fontWeight:"bold"},onClick:this.props.exit.bind(this)},"X"))}}]),t}(n.Component),O=function(e){function t(){var e,a;Object(u.a)(this,t);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(a=Object(d.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r)))).state={gif:"http://i.imgur.com/IUNMjf1.gif",capturing:!0},a}return Object(p.a)(t,e),Object(h.a)(t,[{key:"setGIF",value:function(e){this.setState({gif:e,capturing:!1})}},{key:"capture",value:function(){this.setState({capturing:!0})}},{key:"render",value:function(){return r.a.createElement("div",{style:{width:"100%",height:"100%"}},this.state.capturing?r.a.createElement(x,{saveGIF:this.setGIF.bind(this),albumId:this.props.match.params.albumid}):r.a.createElement(j,{gif:this.state.gif,albumId:this.props.match.params.albumid,exit:this.capture.bind(this)}))}}]),t}(n.Component),E=a(77),S=function(e){function t(){var e,a;Object(u.a)(this,t);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(a=Object(d.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r)))).state={video:null,gifs:[],index:0,progress:0,bpm:60,multi:!0,flip:!1},a}return Object(p.a)(t,e),Object(h.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.getGIFs(),setInterval(function(){e.getGIFs()},3e5),setInterval(function(){e.changeGIF()},15e3)}},{key:"changeGIF",value:function(){this.setState({index:Math.floor(this.state.gifs.length*Math.random()),multi:Math.random()>=.5,flip:Math.random()>=.5})}},{key:"getGIFs",value:function(){var e=Object(l.a)(c.a.mark(function e(){var t,a;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,b.a.get("https://api.imgur.com/3/album/".concat(this.props.match.params.albumid),{headers:{Authorization:"Client-ID "+I.imgur.client_id}});case 2:t=e.sent,a=t.data.data.images,console.log(a),this.setState({gifs:a});case 6:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){return r.a.createElement("div",{className:"App",style:{height:"100vh",width:"100vw"}},this.state.gifs.length>0?r.a.createElement("div",{style:{width:"100%",height:"100%",minHeight:"100vh",transform:"scale(".concat(this.state.flip?-1:1,")"),background:"url(".concat(this.state.gifs[this.state.index].link,") ").concat(this.state.multi?"center center / cover":"")}}):"",this.props.deletehash?r.a.createElement(E,{value:"https://johnnyracket.github.io/gif-beat/#/record/".concat(this.props.deletehash),style:{position:"absolute",bottom:"2rem",right:"2rem",padding:"1rem"}}):"")}}]),t}(n.Component),C=a(78),z=a.n(C),F=function(e){function t(){var e,a;Object(u.a)(this,t);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(a=Object(d.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r)))).state={albumId:"Xb6wU",deletehash:""},a}return Object(p.a)(t,e),Object(h.a)(t,[{key:"createAlbum",value:function(){var e=Object(l.a)(c.a.mark(function e(){var t;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,b.a.post("https://api.imgur.com/3/album",{},{headers:{Authorization:"Client-ID "+I.imgur.client_id}});case 2:return t=e.sent,console.log(t.data.data.id),console.log(t.data.data.deletehash),e.next=7,this.setState({albumId:t.data.data.id,deletehash:t.data.data.deletehash});case 7:this.props.history.push("/view/"+this.state.albumId);case 8:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this;return r.a.createElement("div",{style:{width:"100%",height:"100%",minHeight:"100vh",background:"URL(".concat(z.a,")"),boxSizing:"border-box"}},r.a.createElement(g.a,{path:"/",exact:!0,render:function(){return r.a.createElement("div",{style:{width:"100%",height:"100%",padding:"4rem 1rem",boxSizing:"border-box"}},r.a.createElement("div",{style:{display:"flex",flexDirection:"column",width:"100%",maxWidth:"20rem",margin:"0 auto",background:"white",padding:"2rem",borderRadius:"1rem",boxShadow:"0 0 90px 60px #fff",boxSizing:"border-box"}},r.a.createElement("h1",{style:{color:"#f0932b",fontWeight:"bold",fontSize:"5rem",textAlign:"center",margin:"1rem 0 2rem"}},"Gif Beat"),r.a.createElement("input",{onChange:function(t){return e.setState({albumId:t.target.value})},placeholder:"ID Here...",style:{fontSize:"3rem",borderRadius:".5rem",border:"solid 4px #f0932b",padding:".25rem .5rem",outline:"none"}}),r.a.createElement("div",{style:{display:"flex",flexDirection:"row",margin:"1rem 0",alignItems:"center"}},r.a.createElement(v.a,{to:"/record/"+e.state.albumId,style:{marginRight:"1rem",fontSize:"2rem",flex:1,background:"#f0932b",padding:"1rem 0",borderRadius:".5rem",border:"none",fontWeight:"bold",color:"white",cursor:"pointer",textAlign:"center",textDecoration:"none"}},"Join!"),r.a.createElement(v.a,{to:"/view/"+e.state.albumId,style:{fontSize:"1rem",color:"#f0932b",background:"transparent",outline:"none",border:"none",cursor:"pointer",textAlign:"center",textDecoration:"none"}},"Re-Host")),r.a.createElement("div",{style:{margin:"0 auto",fontSize:"1.5rem",color:"lightgrey"}}," or "),r.a.createElement("button",{onClick:function(){e.createAlbum()},style:{margin:"1rem 0",fontSize:"1.5rem",fontWeight:"bold",color:"#f0932b",background:"transparent",outline:"none",border:"none",cursor:"pointer"}},"Create Party")))}}),r.a.createElement(g.a,{path:"/record/:deletehash",render:function(t){return r.a.createElement(O,Object.assign({albumId:e.state.albumId},t))}}),r.a.createElement(g.a,{path:"/view/:albumid",render:function(t){return r.a.createElement(S,Object.assign({albumId:e.state.albumId,deletehash:e.state.deletehash},t))}}))}}]),t}(n.Component),G=Object(y.a)(F),A=a(160);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(A.a,null,r.a.createElement(G,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},17:function(e){e.exports={imgur:{client_id:"0fca5e3f716e204"},spotify:{client_id:"13b5cdf138ff45839285509dbc633ba1"}}},39:function(e,t,a){},78:function(e,t,a){e.exports=a.p+"static/media/pattern.4c18f130.svg"},83:function(e,t,a){e.exports=a(157)},88:function(e,t,a){}},[[83,2,1]]]);
//# sourceMappingURL=main.66b4bbff.chunk.js.map