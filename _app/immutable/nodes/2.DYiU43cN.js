import{s as ke,e as v,b,d as E,f as T,i as m,g as a,a as w,t as V,m as F,h as M,c as y,j as A,k as j,l as O,v as ge,n as U,F as Ce,H as ot,y as se,u as rt,D as yt,I as st,G as Ue,r as Dt,x as Tt,z as Pt,A as It,B as St,E as Bt,w as Ge,Q as Ht,U as it,N as xt,W as Lt,q as bt}from"../chunks/scheduler.u48DAPDK.js";import{S as we,i as ye,c as P,a as B,m as I,t as C,b as k,d as S,g as $e,f as he}from"../chunks/index.DjJW5U3y.js";import{B as Ae,g as Mt,i as Et,P as Ot,e as ve}from"../chunks/Row.svelte_svelte_type_style_lang.Bwa_LHzJ.js";/* empty css                            */import{C as Vt}from"../chunks/Card.DwiD4_m8.js";import{S as Ct}from"../chunks/Sidebar.2VVb5RlH.js";import{a as _e,T as At}from"../chunks/Columns.svelte_svelte_type_style_lang.DtmmySgz.js";import{B as G}from"../chunks/Button.Bhr0sXcv.js";import{D as jt,a as Wt}from"../chunks/DialogDemo.C8z-BmGm.js";import{T as Nt,a as qt}from"../chunks/TooltipDemo.BIST2Nfw.js";import{T as kt}from"../chunks/TextLayout.CoMsJZG2.js";import{M as zt}from"../chunks/MenuList.BNZp9mf-.js";import Rt from"../chunks/BarDemo.Bpr9M9_7.js";import Ft from"../chunks/ButtonDemo.CLp407Th.js";import Ut from"../chunks/TypographyDemo.C2zH4wk6.js";import Qt from"../chunks/SplitPaneDemo.BdFt3EG-.js";import Gt from"../chunks/CheckboxDemo.Cslg0n20.js";import Yt from"../chunks/RadioButtonDemo.BYjM4raY.js";import Jt from"../chunks/FormItemDemo.CVltWiFf.js";import Kt from"../chunks/VariableDemo.7V04Yre5.js";import Xt from"../chunks/PageDemo.Ct1pgf2D.js";import Zt from"../chunks/TabDemo.U54mfKjc.js";import en from"../chunks/DropdownMenuDemo.Bii4tk7r.js";import tn from"../chunks/CardDemo.Io3GXvlG.js";import nn from"../chunks/TileDemo.ytfppCb7.js";import ln from"../chunks/RowsAndColumnsDemo.BeC29oTg.js";import{D as on}from"../chunks/Select.BH0jszwB.js";import{b as Qe}from"../chunks/paths.BGfslYRY.js";import rn from"../chunks/ProgressDemo.eKOg1ILf.js";function sn(s){let e;return{c(){e=V("Wow")},l(t){e=A(t,"Wow")},m(t,n){m(t,e,n)},d(t){t&&a(e)}}}function an(s){let e;return{c(){e=V("About")},l(t){e=A(t,"About")},m(t,n){m(t,e,n)},d(t){t&&a(e)}}}function fn(s){let e;return{c(){e=V("Contact")},l(t){e=A(t,"Contact")},m(t,n){m(t,e,n)},d(t){t&&a(e)}}}function un(s){let e,t,n,l,o,r="Home",i;return e=new G({props:{$$slots:{default:[an]},$$scope:{ctx:s}}}),n=new G({props:{$$slots:{default:[fn]},$$scope:{ctx:s}}}),{c(){P(e.$$.fragment),t=w(),P(n.$$.fragment),l=w(),o=v("a"),o.textContent=r,this.h()},l(u){B(e.$$.fragment,u),t=y(u),B(n.$$.fragment,u),l=y(u),o=b(u,"A",{href:!0,id:!0,"data-svelte-h":!0}),M(o)!=="svelte-poxqlw"&&(o.textContent=r),this.h()},h(){j(o,"href","#here"),j(o,"id","here")},m(u,c){I(e,u,c),m(u,t,c),I(n,u,c),m(u,l,c),m(u,o,c),i=!0},p(u,c){const p={};c&32&&(p.$$scope={dirty:c,ctx:u}),e.$set(p);const h={};c&32&&(h.$$scope={dirty:c,ctx:u}),n.$set(h)},i(u){i||(C(e.$$.fragment,u),C(n.$$.fragment,u),i=!0)},o(u){k(e.$$.fragment,u),k(n.$$.fragment,u),i=!1},d(u){u&&(a(t),a(l),a(o)),S(e,u),S(n,u)}}}function mn(s){let e,t=`This is the same "Sidebar" component that you see on the main page,
          but this time "contained" in a card.`;return{c(){e=v("p"),e.textContent=t},l(n){e=b(n,"P",{"data-svelte-h":!0}),M(e)!=="svelte-i966ek"&&(e.textContent=t)},m(n,l){m(n,e,l)},p:U,d(n){n&&a(e)}}}function cn(s){let e,t,n,l,o=`We use container queries out of the box. This "Card" has a sidebar, for
        example, but because the card is small, the sidebar will be in the
        "expander" mode, regardless of the screen size.`,r;return t=new Ct({props:{$$slots:{default:[mn]},$$scope:{ctx:s}}}),{c(){e=v("div"),P(t.$$.fragment),n=w(),l=v("p"),l.textContent=o,this.h()},l(i){e=b(i,"DIV",{style:!0});var u=E(e);B(t.$$.fragment,u),n=y(u),l=b(u,"P",{"data-svelte-h":!0}),M(l)!=="svelte-1vtefdn"&&(l.textContent=o),u.forEach(a),this.h()},h(){T(e,"display","flex"),T(e,"position","relative")},m(i,u){m(i,e,u),I(t,e,null),O(e,n),O(e,l),r=!0},p(i,u){const c={};u&32&&(c.$$scope={dirty:u,ctx:i}),t.$set(c)},i(i){r||(C(t.$$.fragment,i),r=!0)},o(i){k(t.$$.fragment,i),r=!1},d(i){i&&a(e),S(t)}}}function pn(s){let e,t="A Card";return{c(){e=v("div"),e.textContent=t,this.h()},l(n){e=b(n,"DIV",{slot:!0,"data-svelte-h":!0}),M(e)!=="svelte-1ryg955"&&(e.textContent=t),this.h()},h(){j(e,"slot","header")},m(n,l){m(n,e,l)},p:U,d(n){n&&a(e)}}}function $n(s){let e;return{c(){e=V("Orange")},l(t){e=A(t,"Orange")},m(t,n){m(t,e,n)},d(t){t&&a(e)}}}function hn(s){let e;return{c(){e=V("Teal")},l(t){e=A(t,"Teal")},m(t,n){m(t,e,n)},d(t){t&&a(e)}}}function dn(s){let e;return{c(){e=V("Purple")},l(t){e=A(t,"Purple")},m(t,n){m(t,e,n)},d(t){t&&a(e)}}}function _n(s){let e;return{c(){e=V("Popup API")},l(t){e=A(t,"Popup API")},m(t,n){m(t,e,n)},d(t){t&&a(e)}}}function gn(s){let e,t;return e=new G({props:{$$slots:{default:[_n]},$$scope:{ctx:s}}}),e.$on("click",s[3]),{c(){P(e.$$.fragment)},l(n){B(e.$$.fragment,n)},m(n,l){I(e,n,l),t=!0},p(n,l){const o={};l&32&&(o.$$scope={dirty:l,ctx:n}),e.$set(o)},i(n){t||(C(e.$$.fragment,n),t=!0)},o(n){k(e.$$.fragment,n),t=!1},d(n){S(e,n)}}}function vn(s){let e,t=`Which handles overlays for items such as tooltips and dropdown menus,
          which we provide with
          <code>&lt;Tooltip&gt;</code>
          and <code>&lt;DropdownMenu&gt;</code>
          as well as with a custom
          <code>&lt;Select&gt;</code>`;return{c(){e=v("div"),e.innerHTML=t,this.h()},l(n){e=b(n,"DIV",{slot:!0,"data-svelte-h":!0}),M(e)!=="svelte-1d2ygln"&&(e.innerHTML=t),this.h()},h(){j(e,"slot","tooltip")},m(n,l){m(n,e,l)},p:U,d(n){n&&a(e)}}}function at(s){let e,t;return e=new jt({props:{onClose:s[4],$$slots:{default:[bn]},$$scope:{ctx:s}}}),{c(){P(e.$$.fragment)},l(n){B(e.$$.fragment,n)},m(n,l){I(e,n,l),t=!0},p(n,l){const o={};l&2&&(o.onClose=n[4]),l&32&&(o.$$scope={dirty:l,ctx:n}),e.$set(o)},i(n){t||(C(e.$$.fragment,n),t=!0)},o(n){k(e.$$.fragment,n),t=!1},d(n){S(e,n)}}}function bn(s){let e,t="Dialog",n,l,o=`Wow, a dialog! This uses the modern HTML dialog element, so it's ESC
          closable out of the box and follows a11y rules without even trying.`;return{c(){e=v("h1"),e.textContent=t,n=w(),l=v("p"),l.textContent=o,this.h()},l(r){e=b(r,"H1",{"data-svelte-h":!0}),M(e)!=="svelte-1gkcfyo"&&(e.textContent=t),n=y(r),l=b(r,"P",{id:!0,"data-svelte-h":!0}),M(l)!=="svelte-1j9p6z1"&&(l.textContent=o),this.h()},h(){j(l,"id","dialog")},m(r,i){m(r,e,i),m(r,n,i),m(r,l,i)},p:U,d(r){r&&(a(e),a(n),a(l))}}}function Cn(s){let e,t="Simple Components",n,l,o=`Presenting the simple components you would expect to see in any modern
      component library.`,r,i,u=`Using svelte components is easy and supports a number of intuitive
      properties, such as:`,c,p,h,$,x,d,D,H,z="CSS Variables",L,N,ie=`Our shorthand properties like bg and fg are just syntactic sugar for CSS
      variables scoped to components, like <code>--card-bg</code> and
      <code>--button-width</code>.`,Q,g,q=`Because we use CSS variables, you can inject variables wherever you like
      in your component heirarchy, as in this nav bar with custom buttons:`,De,ae,Te,K,R,Pe,Ie,Se,fe,Ye="Container Queries",Be,ee,He,ue,Je="For the Future",xe,me,Ke=`We use modern CSS features like <code>filter</code> and
      <code>transform</code>
      to handle affordances, so changing color schemes should be a snap and only
      require changing a single value.`,Le,ce,Me,pe,Y,te,je,ne,We,le,Ee,J,Ne,oe,Xe="<code>&lt;dialog&gt;</code>",qe,re,ze,Oe,de,Ve,Re,Ze;p=new _e({props:{code:`<Button 
  bg="green" 
  fg="white" 
  height="64px">
  Wow
</Button>`}}),d=new G({props:{bg:"green",fg:"white",height:"64px",$$slots:{default:[sn]},$$scope:{ctx:s}}}),ae=new _e({props:{code:`<Bar --bar-bg="#333"
  --button-bg="var(--material-color-purple)"
  --bar-link-fg="var(--material-color-yellow)"
  --button-fg="#eee"
  --button-height="3rem">  
  <Button>About</Button>
  <Button>Contact</Button>
  <a href="/">Home</a>
</Bar>`}}),K=new Ae({props:{$$slots:{default:[un]},$$scope:{ctx:s}}}),ee=new Vt({props:{$$slots:{header:[pn],default:[cn]},$$scope:{ctx:s}}}),ce=new _e({props:{code:`
      <span style:--button-fg="white">
        <Button bg="var(--material-color-orange)">Orange</Button>
        <Button bg="var(--material-color-teal)">Teal</Button>
        <Button bg="var(--material-color-purple)">Purple</Button>
      </span>`}}),te=new G({props:{bg:"var(--material-color-orange)",$$slots:{default:[$n]},$$scope:{ctx:s}}}),ne=new G({props:{bg:"var(--material-color-teal)",$$slots:{default:[hn]},$$scope:{ctx:s}}}),le=new G({props:{bg:"var(--material-color-purple)",$$slots:{default:[dn]},$$scope:{ctx:s}}}),re=new Nt({props:{$$slots:{tooltip:[vn],default:[gn]},$$scope:{ctx:s}}});let W=s[1]&&at(s);return{c(){e=v("h2"),e.textContent=t,n=w(),l=v("p"),l.textContent=o,r=w(),i=v("p"),i.textContent=u,c=w(),P(p.$$.fragment),h=w(),$=v("br"),x=V(`Which produces:
    `),P(d.$$.fragment),D=w(),H=v("h2"),H.textContent=z,L=w(),N=v("p"),N.innerHTML=ie,Q=w(),g=v("p"),g.textContent=q,De=w(),P(ae.$$.fragment),Te=w(),R=v("div"),P(K.$$.fragment),Pe=w(),Ie=v("hr"),Se=w(),fe=v("h2"),fe.textContent=Ye,Be=w(),P(ee.$$.fragment),He=w(),ue=v("h2"),ue.textContent=Je,xe=w(),me=v("p"),me.innerHTML=Ke,Le=w(),P(ce.$$.fragment),Me=w(),pe=v("p"),Y=v("span"),P(te.$$.fragment),je=w(),P(ne.$$.fragment),We=w(),P(le.$$.fragment),Ee=w(),J=v("p"),Ne=V("We also use features like "),oe=v("a"),oe.innerHTML=Xe,qe=V(`
      and the

      `),P(re.$$.fragment),ze=V(`
      for our overlays, so there's no need for portals or other shenanigans.`),Oe=w(),W&&W.c(),de=F(),this.h()},l(f){e=b(f,"H2",{"data-svelte-h":!0}),M(e)!=="svelte-71l22k"&&(e.textContent=t),n=y(f),l=b(f,"P",{"data-svelte-h":!0}),M(l)!=="svelte-e5q1wz"&&(l.textContent=o),r=y(f),i=b(f,"P",{"data-svelte-h":!0}),M(i)!=="svelte-1us8j9s"&&(i.textContent=u),c=y(f),B(p.$$.fragment,f),h=y(f),$=b(f,"BR",{}),x=A(f,`Which produces:
    `),B(d.$$.fragment,f),D=y(f),H=b(f,"H2",{"data-svelte-h":!0}),M(H)!=="svelte-1wc1vx0"&&(H.textContent=z),L=y(f),N=b(f,"P",{"data-svelte-h":!0}),M(N)!=="svelte-p2lyj9"&&(N.innerHTML=ie),Q=y(f),g=b(f,"P",{"data-svelte-h":!0}),M(g)!=="svelte-1mwrau5"&&(g.textContent=q),De=y(f),B(ae.$$.fragment,f),Te=y(f),R=b(f,"DIV",{style:!0});var _=E(R);B(K.$$.fragment,_),Pe=y(f),Ie=b(f,"HR",{}),Se=y(f),fe=b(f,"H2",{"data-svelte-h":!0}),M(fe)!=="svelte-151z6vr"&&(fe.textContent=Ye),Be=y(f),B(ee.$$.fragment,f),He=y(f),ue=b(f,"H2",{"data-svelte-h":!0}),M(ue)!=="svelte-1blkiif"&&(ue.textContent=Je),xe=y(f),me=b(f,"P",{"data-svelte-h":!0}),M(me)!=="svelte-1050hup"&&(me.innerHTML=Ke),Le=y(f),B(ce.$$.fragment,f),Me=y(f),pe=b(f,"P",{style:!0});var be=E(pe);Y=b(be,"SPAN",{});var X=E(Y);B(te.$$.fragment,X),je=y(X),B(ne.$$.fragment,X),We=y(X),B(le.$$.fragment,X),X.forEach(a),be.forEach(a),Ee=y(f),J=b(f,"P",{});var Z=E(J);Ne=A(Z,"We also use features like "),oe=b(Z,"A",{href:!0,"data-svelte-h":!0}),M(oe)!=="svelte-1dli0fs"&&(oe.innerHTML=Xe),qe=A(Z,`
      and the

      `),B(re.$$.fragment,Z),ze=A(Z,`
      for our overlays, so there's no need for portals or other shenanigans.`),Z.forEach(a),Oe=y(f),W&&W.l(f),de=F(),this.h()},h(){T(R,"display","contents"),T(R,"--bar-bg","#333"),T(R,"--button-bg","var(--material-color-purple)"),T(R,"--button-fg","white"),T(R,"--button-height","3rem"),T(R,"--bar-link-fg","var(--material-color-yellow)"),T(Y,"--button-fg","white"),T(pe,"text-align","center"),j(oe,"href","#dialog")},m(f,_){m(f,e,_),m(f,n,_),m(f,l,_),m(f,r,_),m(f,i,_),m(f,c,_),I(p,f,_),m(f,h,_),m(f,$,_),m(f,x,_),I(d,f,_),m(f,D,_),m(f,H,_),m(f,L,_),m(f,N,_),m(f,Q,_),m(f,g,_),m(f,De,_),I(ae,f,_),m(f,Te,_),m(f,R,_),I(K,R,null),m(f,Pe,_),m(f,Ie,_),m(f,Se,_),m(f,fe,_),m(f,Be,_),I(ee,f,_),m(f,He,_),m(f,ue,_),m(f,xe,_),m(f,me,_),m(f,Le,_),I(ce,f,_),m(f,Me,_),m(f,pe,_),O(pe,Y),I(te,Y,null),O(Y,je),I(ne,Y,null),O(Y,We),I(le,Y,null),m(f,Ee,_),m(f,J,_),O(J,Ne),O(J,oe),O(J,qe),I(re,J,null),O(J,ze),m(f,Oe,_),W&&W.m(f,_),m(f,de,_),Ve=!0,Re||(Ze=ge(oe,"click",s[2]),Re=!0)},p(f,_){const be={};_&32&&(be.$$scope={dirty:_,ctx:f}),d.$set(be);const X={};_&32&&(X.$$scope={dirty:_,ctx:f}),K.$set(X);const Z={};_&32&&(Z.$$scope={dirty:_,ctx:f}),ee.$set(Z);const et={};_&32&&(et.$$scope={dirty:_,ctx:f}),te.$set(et);const tt={};_&32&&(tt.$$scope={dirty:_,ctx:f}),ne.$set(tt);const nt={};_&32&&(nt.$$scope={dirty:_,ctx:f}),le.$set(nt);const lt={};_&34&&(lt.$$scope={dirty:_,ctx:f}),re.$set(lt),f[1]?W?(W.p(f,_),_&2&&C(W,1)):(W=at(f),W.c(),C(W,1),W.m(de.parentNode,de)):W&&($e(),k(W,1,1,()=>{W=null}),he())},i(f){Ve||(C(p.$$.fragment,f),C(d.$$.fragment,f),C(ae.$$.fragment,f),C(K.$$.fragment,f),C(ee.$$.fragment,f),C(ce.$$.fragment,f),C(te.$$.fragment,f),C(ne.$$.fragment,f),C(le.$$.fragment,f),C(re.$$.fragment,f),C(W),Ve=!0)},o(f){k(p.$$.fragment,f),k(d.$$.fragment,f),k(ae.$$.fragment,f),k(K.$$.fragment,f),k(ee.$$.fragment,f),k(ce.$$.fragment,f),k(te.$$.fragment,f),k(ne.$$.fragment,f),k(le.$$.fragment,f),k(re.$$.fragment,f),k(W),Ve=!1},d(f){f&&(a(e),a(n),a(l),a(r),a(i),a(c),a(h),a($),a(x),a(D),a(H),a(L),a(N),a(Q),a(g),a(De),a(Te),a(Pe),a(Ie),a(Se),a(fe),a(Be),a(He),a(ue),a(xe),a(me),a(Le),a(Me),a(pe),a(Ee),a(J),a(Oe),a(de)),S(p,f),S(d,f),S(ae,f),f&&K&&a(R),S(K,f),S(ee,f),S(ce,f),S(te),S(ne),S(le),S(re),W&&W.d(f),Re=!1,Ze()}}}function kn(s){let e,t,n;return e=new kt({props:{id:s[0],$$slots:{default:[Cn]},$$scope:{ctx:s}}}),{c(){t=v("div"),P(e.$$.fragment),this.h()},l(l){t=b(l,"DIV",{style:!0});var o=E(t);B(e.$$.fragment,o),this.h()},h(){T(t,"display","contents"),T(t,"--code-font-size","0.8rem"),T(t,"--code-line-width","70em")},m(l,o){m(l,t,o),I(e,t,null),n=!0},p(l,[o]){const r={};o&1&&(r.id=l[0]),o&34&&(r.$$scope={dirty:o,ctx:l}),e.$set(r)},i(l){n||(C(e.$$.fragment,l),n=!0)},o(l){k(e.$$.fragment,l),n=!1},d(l){l&&e&&a(t),S(e,l)}}}function wn(s,e,t){let n=!1,l=()=>{t(1,n=!n)},{id:o="Intro"}=e;const r=()=>t(1,n=!0),i=()=>t(1,n=!1);return s.$$set=u=>{"id"in u&&t(0,o=u.id)},[o,n,l,r,i]}class yn extends we{constructor(e){super(),ye(this,e,wn,kn,ke,{id:0})}}function Dn(s){let e,t,n,l=[{type:"range"},{min:s[1]},{max:s[2]},{step:s[3]},s[4]],o={};for(let r=0;r<l.length;r+=1)o=Ce(o,l[r]);return{c(){e=v("input"),this.h()},l(r){e=b(r,"INPUT",{type:!0,min:!0,max:!0,step:!0}),this.h()},h(){ot(e,o),se(e,"svelte-1kyxmqy",!0)},m(r,i){m(r,e,i),e.autofocus&&e.focus(),rt(e,s[0]),t||(n=[ge(e,"change",s[5]),ge(e,"input",s[5])],t=!0)},p(r,[i]){ot(e,o=Mt(l,[{type:"range"},i&2&&{min:r[1]},i&4&&{max:r[2]},i&8&&{step:r[3]},i&16&&r[4]])),i&1&&rt(e,r[0]),se(e,"svelte-1kyxmqy",!0)},i:U,o:U,d(r){r&&a(e),t=!1,yt(n)}}}function Tn(s,e,t){const n=["value","min","max","step"];let l=st(e,n),{value:o=0}=e,{min:r=0}=e,{max:i=100}=e,{step:u=1}=e;function c(){o=Dt(this.value),t(0,o)}return s.$$set=p=>{e=Ce(Ce({},e),Ue(p)),t(4,l=st(e,n)),"value"in p&&t(0,o=p.value),"min"in p&&t(1,r=p.min),"max"in p&&t(2,i=p.max),"step"in p&&t(3,u=p.step)},[o,r,i,u,l,c]}class Pn extends we{constructor(e){super(),ye(this,e,Tn,Dn,ke,{value:0,min:1,max:2,step:3})}}function In(s){let e,t;const n=s[6].default,l=Tt(n,s,s[5],null);return{c(){e=v("div"),l&&l.c(),this.h()},l(o){e=b(o,"DIV",{class:!0});var r=E(e);l&&l.l(r),r.forEach(a),this.h()},h(){j(e,"class","hero svelte-d3riu6"),T(e,"--text-align","var(--hero-text-align,center)")},m(o,r){m(o,e,r),l&&l.m(e,null),t=!0},p(o,[r]){l&&l.p&&(!t||r&32)&&Pt(l,n,o,o[5],t?St(n,o[5],r,null):It(o[5]),null)},i(o){t||(C(l,o),t=!0)},o(o){k(l,o),t=!1},d(o){o&&a(e),l&&l.d(o)}}}function Sn(s,e,t){let{$$slots:n={},$$scope:l}=e,{bg:o=null}=e,{fg:r=null}=e,{padding:i=null}=e,{width:u=null}=e,{height:c=null}=e;return Et(e,"hero",["bg","fg","padding","width","height"]),s.$$set=p=>{t(8,e=Ce(Ce({},e),Ue(p))),"bg"in p&&t(0,o=p.bg),"fg"in p&&t(1,r=p.fg),"padding"in p&&t(2,i=p.padding),"width"in p&&t(3,u=p.width),"height"in p&&t(4,c=p.height),"$$scope"in p&&t(5,l=p.$$scope)},e=Ue(e),[o,r,i,u,c,l,n]}class Bn extends we{constructor(e){super(),ye(this,e,Sn,In,ke,{bg:0,fg:1,padding:2,width:3,height:4})}}function Hn(s){let e,t="Installation",n,l,o="Start by installing our library:",r,i,u,c,p=`Once you have that, you will need to make sure to import
    our styles somewhere in your project, such as at the top level,
    in order to define the CSS variables we depend on. You 
    can also select a theme or set of themes if you like.`,h,$,x,d,D=`Now you're ready to import and use our components
    anywhere you like in the project.`,H,z,L,N,ie=`We use CSS variables wherever possible, so if you want
  to change up things like colors at a component level,
  you can simply inject the appropriate CSS variables
  into the component's style tag.`,Q;return i=new _e({props:{language:"none",code:"npm install containcss-svelte"}}),$=new _e({props:{language:"js",code:`
import "contain-css-svelte/vars/defaults.css";
/* Optional color theme */
import "contain-css-svelte/themes/purple.css";
/* Optional typography theme */
import "contain-css-svelte/typography/airy.css";
`}}),z=new _e({props:{language:"html",code:`
<script>
  import Button from "contain-css-svelte/Button.svelte";   
<\/script>
<Button>Hello World</Button> 
`}}),{c(){e=v("h1"),e.textContent=t,n=w(),l=v("p"),l.textContent=o,r=w(),P(i.$$.fragment),u=w(),c=v("p"),c.textContent=p,h=w(),P($.$$.fragment),x=w(),d=v("p"),d.textContent=D,H=w(),P(z.$$.fragment),L=w(),N=v("p"),N.textContent=ie},l(g){e=b(g,"H1",{"data-svelte-h":!0}),M(e)!=="svelte-bdux6k"&&(e.textContent=t),n=y(g),l=b(g,"P",{"data-svelte-h":!0}),M(l)!=="svelte-1b770n5"&&(l.textContent=o),r=y(g),B(i.$$.fragment,g),u=y(g),c=b(g,"P",{"data-svelte-h":!0}),M(c)!=="svelte-kj9jm4"&&(c.textContent=p),h=y(g),B($.$$.fragment,g),x=y(g),d=b(g,"P",{"data-svelte-h":!0}),M(d)!=="svelte-1eq23xc"&&(d.textContent=D),H=y(g),B(z.$$.fragment,g),L=y(g),N=b(g,"P",{"data-svelte-h":!0}),M(N)!=="svelte-twz8v2"&&(N.textContent=ie)},m(g,q){m(g,e,q),m(g,n,q),m(g,l,q),m(g,r,q),I(i,g,q),m(g,u,q),m(g,c,q),m(g,h,q),I($,g,q),m(g,x,q),m(g,d,q),m(g,H,q),I(z,g,q),m(g,L,q),m(g,N,q),Q=!0},p:U,i(g){Q||(C(i.$$.fragment,g),C($.$$.fragment,g),C(z.$$.fragment,g),Q=!0)},o(g){k(i.$$.fragment,g),k($.$$.fragment,g),k(z.$$.fragment,g),Q=!1},d(g){g&&(a(e),a(n),a(l),a(r),a(u),a(c),a(h),a(x),a(d),a(H),a(L),a(N)),S(i,g),S($,g),S(z,g)}}}function xn(s){let e,t;return e=new kt({props:{id:s[0],$$slots:{default:[Hn]},$$scope:{ctx:s}}}),{c(){P(e.$$.fragment)},l(n){B(e.$$.fragment,n)},m(n,l){I(e,n,l),t=!0},p(n,[l]){const o={};l&1&&(o.id=n[0]),l&2&&(o.$$scope={dirty:l,ctx:n}),e.$set(o)},i(n){t||(C(e.$$.fragment,n),t=!0)},o(n){k(e.$$.fragment,n),t=!1},d(n){S(e,n)}}}function Ln(s,e,t){let{id:n="Installation"}=e;return s.$$set=l=>{"id"in l&&t(0,n=l.id)},[n]}class Mn extends we{constructor(e){super(),ye(this,e,Ln,xn,ke,{id:0})}}function ft(s,e,t){const n=s.slice();return n[15]=e[t],n}function Fe(s){const e=s.slice(),t=e[3].find((n,l)=>l>e[0]&&n.component);return e[22]=t,e}function ut(s,e,t){const n=s.slice();return n[15]=e[t],n[19]=t,n}function mt(s,e,t){const n=s.slice();return n[15]=e[t],n}function En(s){let e,t="Meet <em>ContainCSS</em>",n,l,o=`The Simple Svelte Component Library that uses css variables & container
    queries to make your life easier.`;return{c(){e=v("h1"),e.innerHTML=t,n=w(),l=v("p"),l.textContent=o,this.h()},l(r){e=b(r,"H1",{style:!0,"data-svelte-h":!0}),M(e)!=="svelte-1qybmr5"&&(e.innerHTML=t),n=y(r),l=b(r,"P",{"data-svelte-h":!0}),M(l)!=="svelte-14uamxx"&&(l.textContent=o),this.h()},h(){T(e,"text-align","center")},m(r,i){m(r,e,i),m(r,n,i),m(r,l,i)},p:U,d(r){r&&(a(e),a(n),a(l))}}}function ct(s){let e,t,n,l,o,r=s[3][s[0]].demo&&pt(s);var i=s[1];function u(p,h){return{}}i&&(t=it(i,u()));let c=s[0]<s[3].length-1&&$t(Fe(s));return{c(){r&&r.c(),e=w(),t&&P(t.$$.fragment),n=w(),c&&c.c(),l=F()},l(p){r&&r.l(p),e=y(p),t&&B(t.$$.fragment,p),n=y(p),c&&c.l(p),l=F()},m(p,h){r&&r.m(p,h),m(p,e,h),t&&I(t,p,h),m(p,n,h),c&&c.m(p,h),m(p,l,h),o=!0},p(p,h){if(p[3][p[0]].demo?r?r.p(p,h):(r=pt(p),r.c(),r.m(e.parentNode,e)):r&&(r.d(1),r=null),h&2&&i!==(i=p[1])){if(t){$e();const $=t;k($.$$.fragment,1,0,()=>{S($,1)}),he()}i?(t=it(i,u()),P(t.$$.fragment),C(t.$$.fragment,1),I(t,n.parentNode,n)):t=null}p[0]<p[3].length-1?c?(c.p(Fe(p),h),h&1&&C(c,1)):(c=$t(Fe(p)),c.c(),C(c,1),c.m(l.parentNode,l)):c&&($e(),k(c,1,1,()=>{c=null}),he())},i(p){o||(t&&C(t.$$.fragment,p),C(c),o=!0)},o(p){t&&k(t.$$.fragment,p),k(c),o=!1},d(p){p&&(a(e),a(n),a(l)),r&&r.d(p),t&&S(t,p),c&&c.d(p)}}}function pt(s){let e,t,n;return{c(){e=v("a"),t=V("Open separate page to experiment with theming"),this.h()},l(l){e=b(l,"A",{href:!0,target:!0});var o=E(e);t=A(o,"Open separate page to experiment with theming"),o.forEach(a),this.h()},h(){j(e,"href",n=Qe+"/component/"+s[3][s[0]].demo),j(e,"target","_blank")},m(l,o){m(l,e,o),O(e,t)},p(l,o){o&1&&n!==(n=Qe+"/component/"+l[3][l[0]].demo)&&j(e,"href",n)},d(l){l&&a(e)}}}function $t(s){let e,t,n=s[22]&&ht(s);return{c(){n&&n.c(),e=F()},l(l){n&&n.l(l),e=F()},m(l,o){n&&n.m(l,o),m(l,e,o),t=!0},p(l,o){l[22]?n?(n.p(l,o),o&1&&C(n,1)):(n=ht(l),n.c(),C(n,1),n.m(e.parentNode,e)):n&&($e(),k(n,1,1,()=>{n=null}),he())},i(l){t||(C(n),t=!0)},o(l){k(n),t=!1},d(l){l&&a(e),n&&n.d(l)}}}function ht(s){let e,t,n;return e=new Ae({props:{$$slots:{default:[Vn]},$$scope:{ctx:s}}}),{c(){t=v("div"),P(e.$$.fragment),this.h()},l(l){t=b(l,"DIV",{style:!0});var o=E(t);B(e.$$.fragment,o),this.h()},h(){T(t,"display","contents"),T(t,"--bar-justify","end")},m(l,o){m(l,t,o),I(e,t,null),n=!0},p(l,o){const r={};o&8388609&&(r.$$scope={dirty:o,ctx:l}),e.$set(r)},i(l){n||(C(e.$$.fragment,l),n=!0)},o(l){k(e.$$.fragment,l),n=!1},d(l){l&&e&&a(t),S(e,l)}}}function On(s){let e,t=s[22].name+"",n;return{c(){e=V("Next: "),n=V(t)},l(l){e=A(l,"Next: "),n=A(l,t)},m(l,o){m(l,e,o),m(l,n,o)},p(l,o){o&1&&t!==(t=l[22].name+"")&&bt(n,t)},d(l){l&&(a(e),a(n))}}}function Vn(s){let e,t;function n(){return s[12](s[22])}return e=new G({props:{$$slots:{default:[On]},$$scope:{ctx:s}}}),e.$on("click",n),{c(){P(e.$$.fragment)},l(l){B(e.$$.fragment,l)},m(l,o){I(e,l,o),t=!0},p(l,o){s=l;const r={};o&8388609&&(r.$$scope={dirty:o,ctx:s}),e.$set(r)},i(l){t||(C(e.$$.fragment,l),t=!0)},o(l){k(e.$$.fragment,l),t=!1},d(l){S(e,l)}}}function An(s){let e,t=s[15].name+"",n,l;return{c(){e=v("a"),n=V(t),l=w(),this.h()},l(o){e=b(o,"A",{href:!0,target:!0});var r=E(e);n=A(r,t),r.forEach(a),l=y(o),this.h()},h(){j(e,"href",Qe+"/component/"+s[15].demo),j(e,"target","_blank")},m(o,r){m(o,e,r),O(e,n),m(o,l,r)},p:U,d(o){o&&(a(e),a(l))}}}function dt(s){let e,t=s[15].demo&&An(s);return{c(){t&&t.c(),e=V("|")},l(n){t&&t.l(n),e=A(n,"|")},m(n,l){t&&t.m(n,l),m(n,e,l)},p(n,l){n[15].demo&&t.p(n,l)},d(n){n&&a(e),t&&t.d(n)}}}function jn(s){let e,t,n,l,o,r,i,u;e=new yn({props:{id:"Intro"}}),n=new Mn({props:{id:"Installation"}});let c=s[1]&&ct(s),p=ve(s[3]),h=[];for(let $=0;$<p.length;$+=1)h[$]=dt(ft(s,p,$));return{c(){P(e.$$.fragment),t=w(),P(n.$$.fragment),l=w(),o=v("div"),c&&c.c(),r=w(),i=v("div");for(let $=0;$<h.length;$+=1)h[$].c();this.h()},l($){B(e.$$.fragment,$),t=y($),B(n.$$.fragment,$),l=y($),o=b($,"DIV",{id:!0});var x=E(o);c&&c.l(x),x.forEach(a),r=y($),i=b($,"DIV",{class:!0});var d=E(i);for(let D=0;D<h.length;D+=1)h[D].l(d);d.forEach(a),this.h()},h(){j(o,"id","demo-area"),j(i,"class","hidden svelte-3ompmz")},m($,x){I(e,$,x),m($,t,x),I(n,$,x),m($,l,x),m($,o,x),c&&c.m(o,null),m($,r,x),m($,i,x);for(let d=0;d<h.length;d+=1)h[d]&&h[d].m(i,null);u=!0},p($,x){if($[1]?c?(c.p($,x),x&2&&C(c,1)):(c=ct($),c.c(),C(c,1),c.m(o,null)):c&&($e(),k(c,1,1,()=>{c=null}),he()),x&8){p=ve($[3]);let d;for(d=0;d<p.length;d+=1){const D=ft($,p,d);h[d]?h[d].p(D,x):(h[d]=dt(D),h[d].c(),h[d].m(i,null))}for(;d<h.length;d+=1)h[d].d(1);h.length=p.length}},i($){u||(C(e.$$.fragment,$),C(n.$$.fragment,$),C(c),u=!0)},o($){k(e.$$.fragment,$),k(n.$$.fragment,$),k(c),u=!1},d($){$&&(a(t),a(l),a(o),a(r),a(i)),S(e,$),S(n,$),c&&c.d(),Ge(h,$)}}}function _t(s){let e,t;return e=new G({props:{$$slots:{default:[Wn]},$$scope:{ctx:s}}}),e.$on("click",s[8]),{c(){P(e.$$.fragment)},l(n){B(e.$$.fragment,n)},m(n,l){I(e,n,l),t=!0},p(n,l){const o={};l&8388608&&(o.$$scope={dirty:l,ctx:n}),e.$set(o)},i(n){t||(C(e.$$.fragment,n),t=!0)},o(n){k(e.$$.fragment,n),t=!1},d(n){S(e,n)}}}function Wn(s){let e,t="⮕";return{c(){e=v("span"),e.textContent=t,this.h()},l(n){e=b(n,"SPAN",{style:!0,"data-svelte-h":!0}),M(e)!=="svelte-1ap3dw1"&&(e.textContent=t),this.h()},h(){T(e,"transform","rotate(180deg)"),T(e,"display","inline-block")},m(n,l){m(n,e,l)},p:U,d(n){n&&a(e)}}}function Nn(s){let e=s[15].name+"",t;return{c(){t=V(e)},l(n){t=A(n,e)},m(n,l){m(n,t,l)},p:U,d(n){n&&a(t)}}}function gt(s){let e,t,n;function l(){return s[9](s[19])}return t=new G({props:{value:s[19],$$slots:{default:[Nn]},$$scope:{ctx:s}}}),t.$on("click",l),{c(){e=v("li"),P(t.$$.fragment)},l(o){e=b(o,"LI",{});var r=E(e);B(t.$$.fragment,r),r.forEach(a)},m(o,r){m(o,e,r),I(t,e,null),n=!0},p(o,r){s=o;const i={};r&8388608&&(i.$$scope={dirty:r,ctx:s}),t.$set(i)},i(o){n||(C(t.$$.fragment,o),n=!0)},o(o){k(t.$$.fragment,o),n=!1},d(o){o&&a(e),S(t)}}}function qn(s){let e,t,n=ve(s[3]),l=[];for(let r=0;r<n.length;r+=1)l[r]=gt(ut(s,n,r));const o=r=>k(l[r],1,1,()=>{l[r]=null});return{c(){for(let r=0;r<l.length;r+=1)l[r].c();e=F()},l(r){for(let i=0;i<l.length;i+=1)l[i].l(r);e=F()},m(r,i){for(let u=0;u<l.length;u+=1)l[u]&&l[u].m(r,i);m(r,e,i),t=!0},p(r,i){if(i&24){n=ve(r[3]);let u;for(u=0;u<n.length;u+=1){const c=ut(r,n,u);l[u]?(l[u].p(c,i),C(l[u],1)):(l[u]=gt(c),l[u].c(),C(l[u],1),l[u].m(e.parentNode,e))}for($e(),u=n.length;u<l.length;u+=1)o(u);he()}},i(r){if(!t){for(let i=0;i<n.length;i+=1)C(l[i]);t=!0}},o(r){l=l.filter(Boolean);for(let i=0;i<l.length;i+=1)k(l[i]);t=!1},d(r){r&&a(e),Ge(l,r)}}}function zn(s){let e,t=s[3][s[0]].name+"",n;return{c(){e=v("span"),n=V(t),this.h()},l(l){e=b(l,"SPAN",{slot:!0});var o=E(e);n=A(o,t),o.forEach(a),this.h()},h(){j(e,"slot","label")},m(l,o){m(l,e,o),O(e,n)},p(l,o){o&1&&t!==(t=l[3][l[0]].name+"")&&bt(n,t)},d(l){l&&a(e)}}}function Rn(s){let e;return{c(){e=V("⮕")},l(t){e=A(t,"⮕")},m(t,n){m(t,e,n)},d(t){t&&a(e)}}}function Fn(s){let e,t,n,l="<em>ContainCSS</em>",o,r,i,u,c,p,h,$,x,d=s[0]>0&&_t(s);return u=new on({props:{$$slots:{label:[zn],default:[qn]},$$scope:{ctx:s}}}),h=new G({props:{$$slots:{default:[Rn]},$$scope:{ctx:s}}}),h.$on("click",s[10]),{c(){e=v("div"),t=w(),n=v("h1"),n.innerHTML=l,o=w(),r=v("div"),d&&d.c(),i=w(),c=v("div"),P(u.$$.fragment),p=w(),P(h.$$.fragment),this.h()},l(D){e=b(D,"DIV",{class:!0}),E(e).forEach(a),t=y(D),n=b(D,"H1",{"data-svelte-h":!0}),M(n)!=="svelte-1463n1k"&&(n.innerHTML=l),o=y(D),r=b(D,"DIV",{class:!0});var H=E(r);d&&d.l(H),i=y(H),c=b(H,"DIV",{style:!0});var z=E(c);B(u.$$.fragment,z),p=y(H),B(h.$$.fragment,H),H.forEach(a),this.h()},h(){j(e,"class","icon equal-width svelte-3ompmz"),T(c,"display","contents"),T(c,"--bg","#222"),j(r,"class","info equal-width svelte-3ompmz"),xt(()=>s[11].call(r)),T(r,"--button-bg","var(--bar-bg, var(--container-bg))"),T(r,"--button-drop-shadow","none"),T(r,"--button-border","none"),T(r,"--button-shadow-color","transparent")},m(D,H){m(D,e,H),m(D,t,H),m(D,n,H),m(D,o,H),m(D,r,H),d&&d.m(r,null),O(r,i),O(r,c),I(u,c,null),O(r,p),I(h,r,null),$=Lt(r,s[11].bind(r)),x=!0},p(D,H){D[0]>0?d?(d.p(D,H),H&1&&C(d,1)):(d=_t(D),d.c(),C(d,1),d.m(r,i)):d&&($e(),k(d,1,1,()=>{d=null}),he());const z={};H&8388609&&(z.$$scope={dirty:H,ctx:D}),u.$set(z);const L={};H&8388608&&(L.$$scope={dirty:H,ctx:D}),h.$set(L)},i(D){x||(C(d),C(u.$$.fragment,D),C(h.$$.fragment,D),x=!0)},o(D){k(d),k(u.$$.fragment,D),k(h.$$.fragment,D),x=!1},d(D){D&&(a(e),a(t),a(n),a(o),a(r)),d&&d.d(),S(u),S(h),$()}}}function Un(s){let e,t,n,l;return e=new Ae({props:{slot:"header",$$slots:{default:[Fn]},$$scope:{ctx:s}}}),{c(){t=v("div"),P(e.$$.fragment),this.h()},l(o){t=b(o,"DIV",{style:!0});var r=E(t);B(e.$$.fragment,r),this.h()},h(){T(t,"display","contents"),T(t,"--bar-border-top","none"),T(t,"--side-width",n=s[2]+"px")},m(o,r){m(o,t,r),I(e,t,null),l=!0},p(o,r){r&4&&n!==(n=o[2]+"px")&&T(t,"--side-width",n);const i={};r&8388613&&(i.$$scope={dirty:r,ctx:o}),e.$set(i)},i(o){l||(C(e.$$.fragment,o),l=!0)},o(o){k(e.$$.fragment,o),l=!1},d(o){o&&e&&a(t),S(e,o)}}}function Qn(s){let e,t="by Tom Hinkle";return{c(){e=v("a"),e.textContent=t,this.h()},l(n){e=b(n,"A",{href:!0,"data-svelte-h":!0}),M(e)!=="svelte-1l32epw"&&(e.textContent=t),this.h()},h(){j(e,"href","https://tomhinkle.net"),T(e,"color","var(--body-fg)")},m(n,l){m(n,e,l)},p:U,d(n){n&&a(e)}}}function Gn(s){let e,t,n;return e=new Ae({props:{slot:"footer",height:"1.5em",marginBottom:"0",$$slots:{default:[Qn]},$$scope:{ctx:s}}}),{c(){t=v("div"),P(e.$$.fragment),this.h()},l(l){t=b(l,"DIV",{style:!0});var o=E(t);B(e.$$.fragment,o),this.h()},h(){T(t,"display","contents"),T(t,"--bar-justify","flex-end"),T(t,"--bar-border-top","none"),T(t,"--bar-border-bottom","none")},m(l,o){m(l,t,o),I(e,t,null),n=!0},p(l,o){const r={};o&8388608&&(r.$$scope={dirty:o,ctx:l}),e.$set(r)},i(l){n||(C(e.$$.fragment,l),n=!0)},o(l){k(e.$$.fragment,l),n=!1},d(l){l&&e&&a(t),S(e,l)}}}function Yn(s){let e,t=s[15].name+"",n,l,o;function r(){return s[7](s[15])}return{c(){e=v("li"),n=V(t),this.h()},l(i){e=b(i,"LI",{class:!0});var u=E(e);n=A(u,t),u.forEach(a),this.h()},h(){j(e,"class","subheader svelte-3ompmz"),se(e,"active",s[0]===s[3].indexOf(s[15]))},m(i,u){m(i,e,u),O(e,n),l||(o=ge(e,"click",r),l=!0)},p(i,u){s=i,u&9&&se(e,"active",s[0]===s[3].indexOf(s[15]))},d(i){i&&a(e),l=!1,o()}}}function Jn(s){let e,t,n=s[15].name+"",l,o,r,i;function u(){return s[6](s[15])}return{c(){e=v("li"),t=v("a"),l=V(n),o=w(),this.h()},l(c){e=b(c,"LI",{});var p=E(e);t=b(p,"A",{href:!0});var h=E(t);l=A(h,n),h.forEach(a),o=y(p),p.forEach(a),this.h()},h(){j(t,"href","#demo-area"),se(t,"active",s[0]===s[3].indexOf(s[15]))},m(c,p){m(c,e,p),O(e,t),O(t,l),O(e,o),r||(i=ge(t,"click",u),r=!0)},p(c,p){s=c,p&9&&se(t,"active",s[0]===s[3].indexOf(s[15]))},d(c){c&&a(e),r=!1,i()}}}function Kn(s){let e,t,n=s[15].name+"",l,o,r,i;function u(){return s[5](s[15])}return{c(){e=v("li"),t=v("a"),l=V(n),o=w(),this.h()},l(c){e=b(c,"LI",{});var p=E(e);t=b(p,"A",{href:!0});var h=E(t);l=A(h,n),h.forEach(a),o=y(p),p.forEach(a),this.h()},h(){j(t,"href",s[15].link),se(t,"active",s[0]===s[3].indexOf(s[15]))},m(c,p){m(c,e,p),O(e,t),O(t,l),O(e,o),r||(i=ge(t,"click",u),r=!0)},p(c,p){s=c,p&9&&se(t,"active",s[0]===s[3].indexOf(s[15]))},d(c){c&&a(e),r=!1,i()}}}function vt(s){let e;function t(o,r){return o[15].link?Kn:o[15].component?Jn:Yn}let l=t(s)(s);return{c(){l.c(),e=F()},l(o){l.l(o),e=F()},m(o,r){l.m(o,r),m(o,e,r)},p(o,r){l.p(o,r)},d(o){o&&a(e),l.d(o)}}}function Xn(s){let e,t=ve(s[3]),n=[];for(let l=0;l<t.length;l+=1)n[l]=vt(mt(s,t,l));return{c(){for(let l=0;l<n.length;l+=1)n[l].c();e=F()},l(l){for(let o=0;o<n.length;o+=1)n[o].l(l);e=F()},m(l,o){for(let r=0;r<n.length;r+=1)n[r]&&n[r].m(l,o);m(l,e,o)},p(l,o){if(o&9){t=ve(l[3]);let r;for(r=0;r<t.length;r+=1){const i=mt(l,t,r);n[r]?n[r].p(i,o):(n[r]=vt(i),n[r].c(),n[r].m(e.parentNode,e))}for(;r<n.length;r+=1)n[r].d(1);n.length=t.length}},d(l){l&&a(e),Ge(n,l)}}}function Zn(s){let e,t,n;return e=new zt({props:{$$slots:{default:[Xn]},$$scope:{ctx:s}}}),{c(){t=v("div"),P(e.$$.fragment),this.h()},l(l){t=b(l,"DIV",{style:!0});var o=E(t);B(e.$$.fragment,o),this.h()},h(){T(t,"display","contents"),T(t,"--menu-item-justify","start"),T(t,"--menu-item-padding","var(--padding) var(--padding) var(--padding) calc(4*var(--padding))")},m(l,o){m(l,t,o),I(e,t,null),n=!0},p(l,o){const r={};o&8388609&&(r.$$scope={dirty:o,ctx:l}),e.$set(r)},i(l){n||(C(e.$$.fragment,l),n=!0)},o(l){k(e.$$.fragment,l),n=!1},d(l){l&&e&&a(t),S(e,l)}}}function el(s){let e,t;return e=new Ct({props:{slot:"sidebar",right:wt,$$slots:{default:[Zn]},$$scope:{ctx:s}}}),{c(){P(e.$$.fragment)},l(n){B(e.$$.fragment,n)},m(n,l){I(e,n,l),t=!0},p(n,l){const o={};l&8388609&&(o.$$scope={dirty:l,ctx:n}),e.$set(o)},i(n){t||(C(e.$$.fragment,n),t=!0)},o(n){k(e.$$.fragment,n),t=!1},d(n){S(e,n)}}}function tl(s){let e,t,n,l;return e=new Bn({props:{center:!0,bg:"var(--primary-bg)",fg:"var(--primary-fg)",$$slots:{default:[En]},$$scope:{ctx:s}}}),n=new Ot({props:{right:wt,sticky:!0,$$slots:{sidebar:[el],footer:[Gn],header:[Un],default:[jn]},$$scope:{ctx:s}}}),{c(){P(e.$$.fragment),t=w(),P(n.$$.fragment)},l(o){B(e.$$.fragment,o),t=y(o),B(n.$$.fragment,o)},m(o,r){I(e,o,r),m(o,t,r),I(n,o,r),l=!0},p(o,[r]){const i={};r&8388608&&(i.$$scope={dirty:r,ctx:o}),e.$set(i);const u={};r&8388615&&(u.$$scope={dirty:r,ctx:o}),n.$set(u)},i(o){l||(C(e.$$.fragment,o),C(n.$$.fragment,o),l=!0)},o(o){k(e.$$.fragment,o),k(n.$$.fragment,o),l=!1},d(o){o&&a(t),S(e,o),S(n,o)}}}let wt=!1;function nl(s,e,t){let n="";const l=()=>{n=window.location.hash,console.log("Hash is",n)};Bt(()=>(l(),window.addEventListener("hashchange",l),()=>{window.removeEventListener("hashchange",l)}));let o=[{name:"Intro",link:"#Intro"},{name:"Installation",link:"#Installation"},{name:"Layout"},{name:"Typography",component:Ut,demo:"Typography"},{name:"Split Pane",component:Qt,demo:"SplitPane"},{name:"Tabs",component:Zt,demo:"Tab"},{name:"Bar",component:Rt,demo:"Bar"},{name:"Page",component:Xt,demo:"Page"},{name:"Components"},{name:"Card",component:tn,demo:"Card"},{name:"Tile",component:nn,demo:"Tile"},{name:"Rows and Columns",component:ln,demo:"RowsAndColumns"},{name:"Controls"},{name:"Button",component:Ft,demo:"Button"},{name:"Checkbox",component:Gt,demo:"Checkbox"},{name:"Radio Button",component:Yt,demo:"RadioButton"},{name:"Slider",component:Pn},{name:"Form Item",component:Jt,demo:"FormItem"},{name:"Overlays"},{name:"Dialog",component:Wt,demo:"Dialog"},{name:"Tooltip",component:qt,demo:"Tooltip"},{name:"Dropdowns"},{name:"Dropdown Menu",component:en,demo:"DropdownMenu"},{name:"Miscellaneous"},{name:"Progress",component:rn,demo:"Progress"},{name:"Themes",component:At},{name:"Variables",component:Kt,demo:"Variable"}],r=null,i=0;function u(L){let ie=L-i>0?1:-1;t(0,i=L),o[i]&&!o[i].link&&!o[i].component&&t(0,i+=ie);let Q=o[i].link||"#demo-area";Ht().then(()=>{var g;return(g=document.querySelector(Q))==null?void 0:g.scrollIntoView()})}let c=50;const p=L=>{t(0,i=o.indexOf(L))},h=L=>{t(0,i=o.indexOf(L))},$=L=>{t(0,i=o.indexOf(L)+1)},x=()=>u(i-1),d=L=>u(L),D=()=>u(i+1);function H(){c=this.clientWidth,t(2,c)}const z=L=>u(o.indexOf(L));return s.$$.update=()=>{var L;s.$$.dirty&1&&t(1,r=o[i].component||((L=o.find(N=>N.component))==null?void 0:L.component))},[i,r,c,o,u,p,h,$,x,d,D,H,z]}class xl extends we{constructor(e){super(),ye(this,e,nl,tl,ke,{})}}export{xl as component};