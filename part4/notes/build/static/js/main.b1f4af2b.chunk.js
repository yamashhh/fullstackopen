(this["webpackJsonppart2-notes"]=this["webpackJsonppart2-notes"]||[]).push([[0],{47:function(t,e,n){},48:function(t,e,n){"use strict";n.r(e);var r=n(21),c=n.n(r),a=n(12),u=n(22),o=n(1),s=n.n(o),i=n(4),p=n(6),f=n(3),l=n(0),j=function(t){var e=t.note,n=t.toggleImportance,r=e.important?"make not important":"make important";return Object(l.jsxs)("li",{className:"note",children:[e.content,Object(l.jsx)("button",{onClick:n,children:r})]})},b=n(10),d=n.n(b),O="/api/notes",m=function(){var t=Object(i.a)(s.a.mark((function t(){return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,d.a.get(O);case 2:return t.abrupt("return",t.sent.data);case 3:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),h=function(){var t=Object(i.a)(s.a.mark((function t(e){return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,d.a.post(O,e);case 2:return t.abrupt("return",t.sent.data);case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),v=function(){var t=Object(i.a)(s.a.mark((function t(e,n){return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,d.a.put("".concat(O,"/").concat(e),n);case 2:return t.abrupt("return",t.sent.data);case 3:case"end":return t.stop()}}),t)})));return function(e,n){return t.apply(this,arguments)}}(),x={getAll:m,create:h,update:v},g=function(t){var e=t.message;return null===e?null:Object(l.jsx)("div",{className:"error",children:e})},w=function(){return Object(l.jsxs)("div",{style:{color:"green",fontStyle:"italic",fontSize:16},children:[Object(l.jsx)("br",{}),Object(l.jsx)("em",{children:"Note app, Department of Computer Science, University of Helsinki 2021"})]})},k=function(){var t=Object(f.useState)([]),e=Object(p.a)(t,2),n=e[0],r=e[1],c=Object(f.useState)(""),o=Object(p.a)(c,2),b=o[0],d=o[1],O=Object(f.useState)(!0),m=Object(p.a)(O,2),h=m[0],v=m[1],k=Object(f.useState)(null),y=Object(p.a)(k,2),S=y[0],N=y[1];Object(f.useEffect)((function(){console.log("effect");var t=function(){var t=Object(i.a)(s.a.mark((function t(){return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.t0=r,t.next=3,x.getAll();case 3:t.t1=t.sent,(0,t.t0)(t.t1),console.log("promise fulfilled");case 6:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();t()}),[]),console.log("render",n.length,"notes");var _=h?n:n.filter((function(t){return t.important})),C=function(){var t=Object(i.a)(s.a.mark((function t(e){var n;return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e.preventDefault(),t.next=3,x.create({content:b,date:(new Date).toISOString(),important:Math.random()>.5});case 3:n=t.sent,r((function(t){return[].concat(Object(u.a)(t),[n])})),d("");case 6:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),I=function(){var t=Object(i.a)(s.a.mark((function t(e){var c,u;return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return c=n.find((function(t){return t._id===e})),t.prev=1,t.next=4,x.update(e,Object(a.a)(Object(a.a)({},c),{},{important:!c.important}));case 4:u=t.sent,r((function(t){return t.map((function(t){return t._id===e?u:t}))})),t.next=13;break;case 8:t.prev=8,t.t0=t.catch(1),404===t.t0.request.status||404===t.t0.response.status?N("the note '".concat(c.content,"' was already deleted from the server")):N(JSON.stringify(t.t0)),setTimeout((function(){return N(null)}),5e3),r((function(t){return t.filter((function(t){return t._id!==e}))}));case 13:case"end":return t.stop()}}),t,null,[[1,8]])})));return function(e){return t.apply(this,arguments)}}();return Object(l.jsxs)("div",{children:[Object(l.jsx)("h1",{children:"Notes"}),Object(l.jsx)(g,{message:S}),Object(l.jsxs)("button",{onClick:function(){return v((function(t){return!t}))},children:["show ",h?"important":"all"]}),Object(l.jsx)("ul",{children:_.map((function(t){return Object(l.jsx)(j,{note:t,toggleImportance:function(){return I(t._id)}},t._id)}))}),Object(l.jsxs)("form",{onSubmit:C,children:[Object(l.jsx)("input",{type:"text",value:b,onChange:function(t){return d(t.target.value)}}),Object(l.jsx)("button",{type:"submit",children:"save"})]}),Object(l.jsx)(w,{})]})};n(47);c.a.render(Object(l.jsx)(k,{}),document.getElementById("root"))}},[[48,1,2]]]);
//# sourceMappingURL=main.b1f4af2b.chunk.js.map