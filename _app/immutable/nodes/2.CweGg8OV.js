import{s as Ve,x as pt,e as h,b,d as P,g as i,k as E,i as g,C as ht,D as bt,E as _t,F as Qe,G as Ue,a as w,c as x,K as it,m as q,h as M,w as be,o as st,p as ft,t as N,j,n as F,f as A,l as O,L as Xe}from"../chunks/scheduler.DEib646s.js";import{S as He,i as Me,t as v,b as C,c as k,a as D,m as I,d as B,g as ct,f as mt,e as ut}from"../chunks/index.DNYspYh7.js";import{e as G}from"../chunks/each.D6YF6ztN.js";import{i as vt,P as yt,B as Le}from"../chunks/Columns.svelte_svelte_type_style_lang.DKRCLEky.js";import{C as Te}from"../chunks/Card.CWSGuN6G.js";import{M as Ct}from"../chunks/MenuList.DMIG9o7u.js";import{S as gt}from"../chunks/Sidebar.y4ziz5ES.js";import{G as wt,T as xt}from"../chunks/TileDemo.CsMQr426.js";import kt from"../chunks/BarDemo.CXN6ZKJw.js";import Dt from"../chunks/ButtonDemo.BVTrx5mK.js";import It from"../chunks/TypographyDemo.DJ-UAawB.js";import Bt from"../chunks/SplitPaneDemo.DkdN_kSX.js";import St from"../chunks/CheckboxDemo.C3Kz_kXa.js";import Et from"../chunks/RadioButtonDemo.GusvQNsb.js";import Pt from"../chunks/FormItemDemo.CcGyw27O.js";import Tt from"../chunks/VariableDemo.DMC_UYYv.js";import{B as he}from"../chunks/Button.CT4DzT8n.js";import{C as dt}from"../chunks/Code.CnRO-RuN.js";import Vt from"../chunks/PageDemo.CgH8wWfL.js";import Ht from"../chunks/TabDemo.D-_-rIjf.js";import{C as Mt}from"../chunks/Container.w1ylgzzv.js";import Lt from"../chunks/DropdownMenuDemo.CiuG2v1F.js";import{R as $t}from"../chunks/RadioButton.EHf9UBx9.js";import{F as Ye}from"../chunks/FormItem.D4_faTiw.js";import At from"../chunks/CardDemo.DNOyJWcW.js";import zt from"../chunks/RowsAndColumnsDemo.5u3EOEn0.js";import{D as Rt}from"../chunks/Select.DlaWzQcJ.js";import{b as Nt}from"../chunks/paths.D1QsyIrA.js";function jt(c){let e,r;const t=c[6].default,o=pt(t,c,c[5],null);return{c(){e=h("div"),o&&o.c(),this.h()},l(l){e=b(l,"DIV",{class:!0});var a=P(e);o&&o.l(a),a.forEach(i),this.h()},h(){E(e,"class","hero svelte-ouw6xl")},m(l,a){g(l,e,a),o&&o.m(e,null),r=!0},p(l,[a]){o&&o.p&&(!r||a&32)&&ht(o,t,l,l[5],r?_t(t,l[5],a,null):bt(l[5]),null)},i(l){r||(v(o,l),r=!0)},o(l){C(o,l),r=!1},d(l){l&&i(e),o&&o.d(l)}}}function Ft(c,e,r){let{$$slots:t={},$$scope:o}=e,{bg:l=null}=e,{fg:a=null}=e,{padding:n=null}=e,{width:f=null}=e,{height:u=null}=e;return vt(e,"hero",["bg","fg","padding","width","height"]),c.$$set=m=>{r(8,e=Qe(Qe({},e),Ue(m))),"bg"in m&&r(0,l=m.bg),"fg"in m&&r(1,a=m.fg),"padding"in m&&r(2,n=m.padding),"width"in m&&r(3,f=m.width),"height"in m&&r(4,u=m.height),"$$scope"in m&&r(5,o=m.$$scope)},e=Ue(e),[l,a,n,f,u,o,t]}class Wt extends He{constructor(e){super(),Me(this,e,Ft,jt,Ve,{bg:0,fg:1,padding:2,width:3,height:4})}}const qt=`:root {
  --fg: var(--material-color-grey-900);
  --bg: var(--material-color-purple-100);
  --container-bg: #ffefff;
  --menu-item-bg: #ffefff;
  --hero-bg: var(--material-color-purple-500);
  --hero-fg: var(--material-color-grey-100);
  --primary-bg: var(--material-color-purple-500);
  --primary-fg: var(--material-color-grey-100);
  --bar-bg: var(--material-color-purple-800);
  --bar-fg: #ffefff;
  --secondary-bg: var(--material-color-purple-200);
  --secondary-fg: var(--material-color-purple-800);
  --shadow-color: #7773;
  --border-color: var(--material-color-purple-200);
  --tab-bar-bg: #ffefff;
  --tab-bar-fg: var(--material-color-grey-900);
  /* Code */
  --code-bg: var(
    --material-color-grey-900
  ); /* Background color for the code block */
  --code-fg: var(--material-color-purple-50); /* Default text color */

  --code-comment-fg: var(--material-color-light-purple-100); /* Comment color */
  --code-comment-bg: transparent;

  --code-string-fg: var(--material-color-pink-100); /* String color */
  --code-string-bg: transparent;

  --code-keyword-fg: var(--material-color-purple-100); /* Keyword color */
  --code-keyword-bg: transparent;

  --code-attr-name-fg: var(
    --material-color-purple-300
  ); /* Attribute name color */
  --code-attr-name-bg: transparent;

  --code-tag-fg: var(--material-color-light-purple-500); /* Tag color */
  --code-tag-bg: transparent;

  --code-function-fg: var(
    --material-color-purple-900
  ); /* Function name color */
  --code-function-bg: transparent;

  --code-variable-fg: var(--material-color-purple-700); /* Variable color */
  --code-variable-bg: transparent;

  --code-operator-fg: var(--material-color-purple-600); /* Operator color */
  --code-operator-bg: transparent;

  --code-prolog-fg: var(--material-color-purple-500); /* Prolog color */
  --code-prolog-bg: transparent;

  --code-doctype-fg: var(--material-color-purple-500); /* Doctype color */
  --code-doctype-bg: transparent;

  --code-cdata-fg: var(--material-color-purple-500); /* CDATA color */
  --code-cdata-bg: transparent;
}
`,Ot=`:root {
  --font-size: 16px;
  --font-size-small: 12px;
  --heading-size: 1.5rem;
  --text-size: 1.2rem;
  --font-family: sans-serif;
  --heading-font-family: var(--font-family);
  --body-font-family: serif;
  --ui-font-family: var(--font-family);
  --code-font-family: monospace;
  --code-font-size: 0.9em;
  /* Basic typography... */
  --line-height: 1.4;
  --line-width: 30rem;
  --bold: bold;
  --heading-margin: 0.5em 0;
  --first-heading-margin: 0;
  --heading-bg: transparent;
  --heading-fg: var(--primary-bg);
}
`,Gt=`@import url("https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;0,1000;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900;1,1000&Inconsolata:wght@300&display=swap");

:root {
  --font-family: "Nunito", sans-serif;
  --line-height: 1.8;
  --heading-line-height: 1;
  --bold: 400;
  --line-width: 30em;
  --normal: 200;
  --ui-font-weight: 400;
  --code-font-size: 1em;
  --code-font-family: Inconsolata, monospace;
}
`,Kt=`@import url("https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400&family=IBM+Plex+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&family=IBM+Plex+Serif:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&family=Inconsolata:wght@300&family=Nunito:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;0,1000;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900;1,1000&display=swap");

:root {
  --font-family: "IBM Plex Sans", sans-serif;
  --aa-heading-font-family: "IBM Plex Serif", serif;
  --body-font-family: "IBM Plex Sans", sans-serif;
  --ui-font-family: "IBM Plex Sans", sans-serif;
  --code-font-family: "IBM Plex Mono", monospace;
  --code-font-size: 0.9em;
  --font-size: 16px;
  /* Basic typography... */
  --line-height: 1.6;
  --heading-line-height: 1.1;
  --line-width: 30rem;
  --bold: 500;
  --heading-margin: 0.5em 0;
  --first-heading-margin: 0;
  --heading-bg: transparent;
  --heading-fg: var(--primary-bg);
}
`,Jt=`/* light mode */
@media (prefers-color-scheme: light) {
  @import url("./light.css");
}
/* dark mode */
@media (prefers-color-scheme: dark) {
  @import url("./dark.css");
}
`,Qt=`/* light mode */

@import url("./code-light.css");

:root {
  --fg: var(--material-color-grey-800);
  --bg: #fafafa;
  --container-bg: var(--material-color-grey-100);
  --container-fg: var(--material-color-grey-800);
  --sidebar-bg: var(--material-color-grey-100);
  --sidebar-fg: var(--material-color-grey-900);
  --menu-bg: var(--material-color-grey-100);
  --menu-fg: var(--material-color-grey-900);
  --primary-bg: var(--material-color-blue-500);
  --primary-fg: var(--material-color-grey-100);
  --secondary-bg: var(--material-color-grey-400);
  --secondary-fg: var(--material-color-grey-900);
  --stripe-bg: var(--material-color-grey-900);
  --stripe-fg: var(--material-color-grey-100);
  --control-bg: var(--material-color-grey-300);
  --control-fg: var(--material-color-grey-900);
  --border-color: var(--material-color-grey-400);
  --input-bg: #fefefe;
  --input-fg: var(--material-color-grey-900);
  --hover-filter: brightness(0.9) contrast(1.5);
  /* Code */
  --code-bg: #ffffff; /* Background color for the code block */
  --code-fg: #333333; /* Default text color */

  --code-comment-fg: #999999; /* Comment color */
  --code-comment-bg: transparent;

  --code-string-fg: #d14; /* String color */
  --code-string-bg: transparent;

  --code-keyword-fg: #00f; /* Keyword color */
  --code-keyword-bg: transparent;

  --code-attr-name-fg: #ff4500; /* Attribute name color */
  --code-attr-name-bg: transparent;

  --code-tag-fg: #170; /* Tag color */
  --code-tag-bg: transparent;

  --code-function-fg: #005cc5; /* Function name color */
  --code-function-bg: transparent;

  --code-variable-fg: #e90; /* Variable color */
  --code-variable-bg: transparent;

  --code-operator-fg: #9a6e3a; /* Operator color */
  --code-operator-bg: transparent;

  --code-prolog-fg: #999999; /* Prolog color */
  --code-prolog-bg: transparent;

  --code-doctype-fg: #999999; /* Doctype color */
  --code-doctype-bg: transparent;

  --code-cdata-fg: #999999; /* CDATA color */
  --code-cdata-bg: transparent;
}
`,Ut=`:root {
  --fg: var(--material-color-grey-100);
  --bg: var(--material-color-grey-800);
  --body-bg: var(--material-color-grey-800);
  --body-fg: var(--material-color-grey-100);
  --container-bg: var(--material-color-grey-900);
  --container-fg: var(--material-color-grey-100);
  --primary-bg: var(--material-color-light-blue-500);
  --primary-fg: var(--material-color-grey-100);
  --secondary-bg: var(--material-color-grey-300);
  --secondary-fg: var(--material-color-grey-900);
  --hover-filter: brightness(1.1) contrast(1.5);
  /* Code */
  --code-bg: #282c34; /* Background color for the code block */
  --code-fg: #abb2bf; /* Default text color */

  --code-comment-fg: #5c6370; /* Comment color */
  --code-comment-bg: transparent;

  --code-string-fg: #98c379; /* String color */
  --code-string-bg: transparent;

  --code-keyword-fg: #c678dd; /* Keyword color */
  --code-keyword-bg: transparent;

  --code-attr-name-fg: #d19a66; /* Attribute name color */
  --code-attr-name-bg: transparent;

  --code-tag-fg: #e06c75; /* Tag color */
  --code-tag-bg: transparent;

  --code-function-fg: #61afef; /* Function name color */
  --code-function-bg: transparent;

  --code-variable-fg: #e06c75; /* Variable color */
  --code-variable-bg: transparent;

  --code-operator-fg: #d19a66; /* Operator color */
  --code-operator-bg: transparent;

  --code-prolog-fg: #5c6370; /* Prolog color */
  --code-prolog-bg: transparent;

  --code-doctype-fg: #5c6370; /* Doctype color */
  --code-doctype-bg: transparent;

  --code-cdata-fg: #5c6370; /* CDATA color */
  --code-cdata-bg: transparent;
}
`;function Ze(c,e,r){const t=c.slice();return t[8]=e[r],t[10]=r,t}function et(c,e,r){const t=c.slice();return t[8]=e[r],t[10]=r,t}function Xt(c){let e=c[8].name+"",r;return{c(){r=N(e)},l(t){r=j(t,e)},m(t,o){g(t,r,o)},p:F,d(t){t&&i(r)}}}function tt(c){let e,r,t;function o(a){c[4](a)}let l={value:c[10],$$slots:{default:[Xt]},$$scope:{ctx:c}};return c[0]!==void 0&&(l.group=c[0]),e=new $t({props:l}),st.push(()=>ut(e,"group",o)),{c(){k(e.$$.fragment)},l(a){D(e.$$.fragment,a)},m(a,n){I(e,a,n),t=!0},p(a,n){const f={};n&4096&&(f.$$scope={dirty:n,ctx:a}),!r&&n&1&&(r=!0,f.group=a[0],ft(()=>r=!1)),e.$set(f)},i(a){t||(v(e.$$.fragment,a),t=!0)},o(a){C(e.$$.fragment,a),t=!1},d(a){B(e,a)}}}function Yt(c){let e,r="Typography",t,o,l,a=G(c[2]),n=[];for(let u=0;u<a.length;u+=1)n[u]=tt(et(c,a,u));const f=u=>C(n[u],1,1,()=>{n[u]=null});return{c(){e=h("span"),e.textContent=r,t=w();for(let u=0;u<n.length;u+=1)n[u].c();o=q(),this.h()},l(u){e=b(u,"SPAN",{class:!0,"data-svelte-h":!0}),M(e)!=="svelte-1dswt72"&&(e.textContent=r),t=x(u);for(let m=0;m<n.length;m+=1)n[m].l(u);o=q(),this.h()},h(){E(e,"class","label")},m(u,m){g(u,e,m),g(u,t,m);for(let d=0;d<n.length;d+=1)n[d]&&n[d].m(u,m);g(u,o,m),l=!0},p(u,m){if(m&5){a=G(u[2]);let d;for(d=0;d<a.length;d+=1){const p=et(u,a,d);n[d]?(n[d].p(p,m),v(n[d],1)):(n[d]=tt(p),n[d].c(),v(n[d],1),n[d].m(o.parentNode,o))}for(ct(),d=a.length;d<n.length;d+=1)f(d);mt()}},i(u){if(!l){for(let m=0;m<a.length;m+=1)v(n[m]);l=!0}},o(u){n=n.filter(Boolean);for(let m=0;m<n.length;m+=1)C(n[m]);l=!1},d(u){u&&(i(e),i(t),i(o)),be(n,u)}}}function Zt(c){let e=c[8].name+"",r;return{c(){r=N(e)},l(t){r=j(t,e)},m(t,o){g(t,r,o)},p:F,d(t){t&&i(r)}}}function nt(c){let e,r,t;function o(a){c[5](a)}let l={value:c[10],$$slots:{default:[Zt]},$$scope:{ctx:c}};return c[1]!==void 0&&(l.group=c[1]),e=new $t({props:l}),st.push(()=>ut(e,"group",o)),{c(){k(e.$$.fragment)},l(a){D(e.$$.fragment,a)},m(a,n){I(e,a,n),t=!0},p(a,n){const f={};n&4096&&(f.$$scope={dirty:n,ctx:a}),!r&&n&2&&(r=!0,f.group=a[1],ft(()=>r=!1)),e.$set(f)},i(a){t||(v(e.$$.fragment,a),t=!0)},o(a){C(e.$$.fragment,a),t=!1},d(a){B(e,a)}}}function en(c){let e,r="Color",t,o,l,a=G(c[3]),n=[];for(let u=0;u<a.length;u+=1)n[u]=nt(Ze(c,a,u));const f=u=>C(n[u],1,1,()=>{n[u]=null});return{c(){e=h("span"),e.textContent=r,t=w();for(let u=0;u<n.length;u+=1)n[u].c();o=q(),this.h()},l(u){e=b(u,"SPAN",{class:!0,"data-svelte-h":!0}),M(e)!=="svelte-1nez6i6"&&(e.textContent=r),t=x(u);for(let m=0;m<n.length;m+=1)n[m].l(u);o=q(),this.h()},h(){E(e,"class","label")},m(u,m){g(u,e,m),g(u,t,m);for(let d=0;d<n.length;d+=1)n[d]&&n[d].m(u,m);g(u,o,m),l=!0},p(u,m){if(m&10){a=G(u[3]);let d;for(d=0;d<a.length;d+=1){const p=Ze(u,a,d);n[d]?(n[d].p(p,m),v(n[d],1)):(n[d]=nt(p),n[d].c(),v(n[d],1),n[d].m(o.parentNode,o))}for(ct(),d=a.length;d<n.length;d+=1)f(d);mt()}},i(u){if(!l){for(let m=0;m<a.length;m+=1)v(n[m]);l=!0}},o(u){n=n.filter(Boolean);for(let m=0;m<n.length;m+=1)C(n[m]);l=!1},d(u){u&&(i(e),i(t),i(o)),be(n,u)}}}function tn(c){let e,r,t,o;return e=new Ye({props:{fullWidth:!0,$$slots:{default:[Yt]},$$scope:{ctx:c}}}),t=new Ye({props:{fullWidth:!0,$$slots:{default:[en]},$$scope:{ctx:c}}}),{c(){k(e.$$.fragment),r=w(),k(t.$$.fragment)},l(l){D(e.$$.fragment,l),r=x(l),D(t.$$.fragment,l)},m(l,a){I(e,l,a),g(l,r,a),I(t,l,a),o=!0},p(l,[a]){const n={};a&4097&&(n.$$scope={dirty:a,ctx:l}),e.$set(n);const f={};a&4098&&(f.$$scope={dirty:a,ctx:l}),t.$set(f)},i(l){o||(v(e.$$.fragment,l),v(t.$$.fragment,l),o=!0)},o(l){C(e.$$.fragment,l),C(t.$$.fragment,l),o=!1},d(l){l&&i(r),B(e,l),B(t,l)}}}function nn(c,e,r){let t=[{name:"Defaults",css:""},{name:"Browser Defaults",css:Ot},{name:"Airy",css:Gt},{name:"IBM Plex",css:Kt}],o=[{name:"Purple",css:qt},{name:"Light",css:Qt},{name:"Dark",css:Ut},{name:"Light or Dark (Responsive)",css:Jt},{name:"Defaults",css:""}],l=0,a=0,n=!1;it(()=>{n=!0});function f(d,p){if(!n)return;let $=`${d}-injected-style`,S=document.getElementById($);S||(S=document.createElement("style"),S.id=$,document.head.appendChild(S)),S.innerHTML=p}function u(d){l=d,r(0,l)}function m(d){a=d,r(1,a)}return c.$$.update=()=>{c.$$.dirty&1&&f("typography",t[l].css),c.$$.dirty&2&&f("color",o[a].css)},[l,a,t,o,u,m]}class rn extends He{constructor(e){super(),Me(this,e,nn,tn,Ve,{})}}function rt(c,e,r){const t=c.slice();return t[5]=e[r],t}function ot(c,e,r){const t=c.slice();return t[8]=e[r],t}function on(c,e,r){const t=c.slice();return t[11]=e[r],t}function ln(c){let e,r="Meet <em>ContainCSS</em>",t,o,l=`The Simple Svelte Component Library that uses css variables & container
    queries to make your life easier.`;return{c(){e=h("h1"),e.innerHTML=r,t=w(),o=h("p"),o.textContent=l,this.h()},l(a){e=b(a,"H1",{style:!0,"data-svelte-h":!0}),M(e)!=="svelte-1qybmr5"&&(e.innerHTML=r),t=x(a),o=b(a,"P",{"data-svelte-h":!0}),M(o)!=="svelte-14uamxx"&&(o.textContent=l),this.h()},h(){A(e,"text-align","center")},m(a,n){g(a,e,n),g(a,t,n),g(a,o,n)},p:F,d(a){a&&(i(e),i(t),i(o))}}}function an(c){let e;return{c(){e=N("Wow")},l(r){e=j(r,"Wow")},m(r,t){g(r,e,t)},d(r){r&&i(e)}}}function sn(c){let e,r=`Presenting the simple components you would expect to see in any modern
        component library.`,t,o,l=`Using svelte components is easy and supports a number of intuitive
        properties, such as:`,a,n,f,u,m,d,p;return n=new dt({props:{code:`<Button 
  bg="green" 
  fg="white" 
  width="64px" 
  height="64px">
  Wow
</Button>`}}),d=new he({props:{bg:"green",fg:"white",width:"64px",height:"64px",$$slots:{default:[an]},$$scope:{ctx:c}}}),{c(){e=h("p"),e.textContent=r,t=w(),o=h("p"),o.textContent=l,a=w(),k(n.$$.fragment),f=w(),u=h("br"),m=N(`Which produces:
      `),k(d.$$.fragment)},l($){e=b($,"P",{"data-svelte-h":!0}),M(e)!=="svelte-1wi5k4z"&&(e.textContent=r),t=x($),o=b($,"P",{"data-svelte-h":!0}),M(o)!=="svelte-lhtceo"&&(o.textContent=l),a=x($),D(n.$$.fragment,$),f=x($),u=b($,"BR",{}),m=j($,`Which produces:
      `),D(d.$$.fragment,$)},m($,S){g($,e,S),g($,t,S),g($,o,S),g($,a,S),I(n,$,S),g($,f,S),g($,u,S),g($,m,S),I(d,$,S),p=!0},p($,S){const z={};S&16384&&(z.$$scope={dirty:S,ctx:$}),d.$set(z)},i($){p||(v(n.$$.fragment,$),v(d.$$.fragment,$),p=!0)},o($){C(n.$$.fragment,$),C(d.$$.fragment,$),p=!1},d($){$&&(i(e),i(t),i(o),i(a),i(f),i(u),i(m)),B(n,$),B(d,$)}}}function fn(c){let e,r="Simple Components";return{c(){e=h("h2"),e.textContent=r,this.h()},l(t){e=b(t,"H2",{slot:!0,"data-svelte-h":!0}),M(e)!=="svelte-13rhzqo"&&(e.textContent=r),this.h()},h(){E(e,"slot","header")},m(t,o){g(t,e,o)},p:F,d(t){t&&i(e)}}}function cn(c){let e;return{c(){e=N("Home")},l(r){e=j(r,"Home")},m(r,t){g(r,e,t)},d(r){r&&i(e)}}}function mn(c){let e;return{c(){e=N("About")},l(r){e=j(r,"About")},m(r,t){g(r,e,t)},d(r){r&&i(e)}}}function un(c){let e;return{c(){e=N("Contact")},l(r){e=j(r,"Contact")},m(r,t){g(r,e,t)},d(r){r&&i(e)}}}function gn(c){let e,r,t,o,l,a;return e=new he({props:{$$slots:{default:[cn]},$$scope:{ctx:c}}}),t=new he({props:{$$slots:{default:[mn]},$$scope:{ctx:c}}}),l=new he({props:{$$slots:{default:[un]},$$scope:{ctx:c}}}),{c(){k(e.$$.fragment),r=w(),k(t.$$.fragment),o=w(),k(l.$$.fragment)},l(n){D(e.$$.fragment,n),r=x(n),D(t.$$.fragment,n),o=x(n),D(l.$$.fragment,n)},m(n,f){I(e,n,f),g(n,r,f),I(t,n,f),g(n,o,f),I(l,n,f),a=!0},p(n,f){const u={};f&16384&&(u.$$scope={dirty:f,ctx:n}),e.$set(u);const m={};f&16384&&(m.$$scope={dirty:f,ctx:n}),t.$set(m);const d={};f&16384&&(d.$$scope={dirty:f,ctx:n}),l.$set(d)},i(n){a||(v(e.$$.fragment,n),v(t.$$.fragment,n),v(l.$$.fragment,n),a=!0)},o(n){C(e.$$.fragment,n),C(t.$$.fragment,n),C(l.$$.fragment,n),a=!1},d(n){n&&(i(r),i(o)),B(e,n),B(t,n),B(l,n)}}}function dn(c){let e,r=`Our shorthand properties like bg and fg are just syntactic sugar for CSS
        variables scoped to components, like <code>--card-bg</code> and
        <code>--button-width</code>.`,t,o,l=`Because we use CSS variables, you can inject variables wherever you like
        in your component heirarchy, as in this nav bar with custom buttons:`,a,n,f,u,m,d;return n=new dt({props:{code:`<Bar --bar-bg="#333"
  --button-bg="#333"
  --button-fg="#eee"
  --button-height="3rem">
  <Button>Home</Button>
  <Button>About</Button>
  <Button>Contact</Button>
</Bar>`}}),u=new Le({props:{$$slots:{default:[gn]},$$scope:{ctx:c}}}),{c(){e=h("p"),e.innerHTML=r,t=w(),o=h("p"),o.textContent=l,a=w(),k(n.$$.fragment),f=w(),m=h("div"),k(u.$$.fragment),this.h()},l(p){e=b(p,"P",{"data-svelte-h":!0}),M(e)!=="svelte-1fm17v9"&&(e.innerHTML=r),t=x(p),o=b(p,"P",{"data-svelte-h":!0}),M(o)!=="svelte-18eslr1"&&(o.textContent=l),a=x(p),D(n.$$.fragment,p),f=x(p),m=b(p,"DIV",{style:!0});var $=P(m);D(u.$$.fragment,$),this.h()},h(){A(m,"display","contents"),A(m,"--bar-bg","#333"),A(m,"--button-bg","#333"),A(m,"--button-fg","#eee"),A(m,"--button-height","3rem")},m(p,$){g(p,e,$),g(p,t,$),g(p,o,$),g(p,a,$),I(n,p,$),g(p,f,$),g(p,m,$),I(u,m,null),d=!0},p(p,$){const S={};$&16384&&(S.$$scope={dirty:$,ctx:p}),u.$set(S)},i(p){d||(v(n.$$.fragment,p),v(u.$$.fragment,p),d=!0)},o(p){C(n.$$.fragment,p),C(u.$$.fragment,p),d=!1},d(p){p&&(i(e),i(t),i(o),i(a),i(f)),B(n,p),p&&u&&i(m),B(u,p)}}}function $n(c){let e,r="CSS Variables";return{c(){e=h("h2"),e.textContent=r,this.h()},l(t){e=b(t,"H2",{slot:!0,"data-svelte-h":!0}),M(e)!=="svelte-p250vs"&&(e.textContent=r),this.h()},h(){E(e,"slot","header")},m(t,o){g(t,e,o)},p:F,d(t){t&&i(e)}}}function pn(c){let e,r=`This is the same "Sidebar" component that you see on the main page,
            but this time "contained" in a card.`;return{c(){e=h("p"),e.textContent=r},l(t){e=b(t,"P",{"data-svelte-h":!0}),M(e)!=="svelte-asi4q4"&&(e.textContent=r)},m(t,o){g(t,e,o)},p:F,d(t){t&&i(e)}}}function hn(c){let e,r,t,o,l=`We use container queries out of the box, so you can adjust the layout
          of your components based on their size, rather than relying only on
          the viewport size. This "Card" has a sidebar, for example, but because
          the card is small, the sidebar will be in the "expander" small mode in
          the card, regardless of the screen size.`,a;return r=new gt({props:{$$slots:{default:[pn]},$$scope:{ctx:c}}}),{c(){e=h("div"),k(r.$$.fragment),t=w(),o=h("p"),o.textContent=l,this.h()},l(n){e=b(n,"DIV",{style:!0});var f=P(e);D(r.$$.fragment,f),t=x(f),o=b(f,"P",{"data-svelte-h":!0}),M(o)!=="svelte-gxn8ea"&&(o.textContent=l),f.forEach(i),this.h()},h(){A(e,"display","flex"),A(e,"position","relative")},m(n,f){g(n,e,f),I(r,e,null),O(e,t),O(e,o),a=!0},p(n,f){const u={};f&16384&&(u.$$scope={dirty:f,ctx:n}),r.$set(u)},i(n){a||(v(r.$$.fragment,n),a=!0)},o(n){C(r.$$.fragment,n),a=!1},d(n){n&&i(e),B(r)}}}function bn(c){let e,r="Container Queries";return{c(){e=h("h2"),e.textContent=r,this.h()},l(t){e=b(t,"H2",{slot:!0,"data-svelte-h":!0}),M(e)!=="svelte-7oekzb"&&(e.textContent=r),this.h()},h(){E(e,"slot","header")},m(t,o){g(t,e,o)},p:F,d(t){t&&i(e)}}}function _n(c){let e,r,t,o,l,a;return e=new Te({props:{$$slots:{header:[fn],default:[sn]},$$scope:{ctx:c}}}),t=new Te({props:{$$slots:{header:[$n],default:[dn]},$$scope:{ctx:c}}}),l=new Te({props:{fixedHeight:!0,$$slots:{header:[bn],default:[hn]},$$scope:{ctx:c}}}),{c(){k(e.$$.fragment),r=w(),k(t.$$.fragment),o=w(),k(l.$$.fragment)},l(n){D(e.$$.fragment,n),r=x(n),D(t.$$.fragment,n),o=x(n),D(l.$$.fragment,n)},m(n,f){I(e,n,f),g(n,r,f),I(t,n,f),g(n,o,f),I(l,n,f),a=!0},p(n,f){const u={};f&16384&&(u.$$scope={dirty:f,ctx:n}),e.$set(u);const m={};f&16384&&(m.$$scope={dirty:f,ctx:n}),t.$set(m);const d={};f&16384&&(d.$$scope={dirty:f,ctx:n}),l.$set(d)},i(n){a||(v(e.$$.fragment,n),v(t.$$.fragment,n),v(l.$$.fragment,n),a=!0)},o(n){C(e.$$.fragment,n),C(t.$$.fragment,n),C(l.$$.fragment,n),a=!1},d(n){n&&(i(r),i(o)),B(e,n),B(t,n),B(l,n)}}}function vn(c){let e,r="Layout";return{c(){e=h("h2"),e.textContent=r},l(t){e=b(t,"H2",{"data-svelte-h":!0}),M(e)!=="svelte-19krxxg"&&(e.textContent=r)},m(t,o){g(t,e,o)},p:F,d(t){t&&i(e)}}}function yn(c){let e,r="Themes",t,o,l,a,n,f,u,m,d,p,$,S,z,T,y,V,L,R,H,W,K,_e,ge,ve,de,ye,J,Q,Ce,U,Ae="Components",we,X,Y,xe,Z,ee,ke,te,ne,De,re,oe,Ie,le,ae,Be,ie,se,Se,fe,ce,Ee,me,ue,Pe;return o=new rn({}),a=new wt({props:{$$slots:{default:[_n]},$$scope:{ctx:c}}}),u=new Tt({}),p=new It({}),S=new Mt({props:{$$slots:{default:[vn]},$$scope:{ctx:c}}}),y=new kt({}),R=new At({}),K=new xt({}),Q=new zt({}),Y=new Dt({}),ee=new St({}),ne=new Et({}),oe=new Pt({}),ae=new Ht({}),se=new Vt({}),ce=new Bt({}),ue=new Lt({}),{c(){e=h("h2"),e.textContent=r,t=w(),k(o.$$.fragment),l=w(),k(a.$$.fragment),n=w(),f=h("div"),k(u.$$.fragment),m=w(),d=h("div"),k(p.$$.fragment),$=w(),k(S.$$.fragment),z=w(),T=h("div"),k(y.$$.fragment),V=w(),L=h("div"),k(R.$$.fragment),H=w(),W=h("div"),k(K.$$.fragment),_e=w(),ge=h("div"),ve=w(),de=h("div"),ye=w(),J=h("div"),k(Q.$$.fragment),Ce=w(),U=h("h2"),U.textContent=Ae,we=w(),X=h("div"),k(Y.$$.fragment),xe=w(),Z=h("div"),k(ee.$$.fragment),ke=w(),te=h("div"),k(ne.$$.fragment),De=w(),re=h("div"),k(oe.$$.fragment),Ie=w(),le=h("div"),k(ae.$$.fragment),Be=w(),ie=h("div"),k(se.$$.fragment),Se=w(),fe=h("div"),k(ce.$$.fragment),Ee=w(),me=h("div"),k(ue.$$.fragment),this.h()},l(s){e=b(s,"H2",{id:!0,"data-svelte-h":!0}),M(e)!=="svelte-5hc0hq"&&(e.textContent=r),t=x(s),D(o.$$.fragment,s),l=x(s),D(a.$$.fragment,s),n=x(s),f=b(s,"DIV",{id:!0});var _=P(f);D(u.$$.fragment,_),_.forEach(i),m=x(s),d=b(s,"DIV",{id:!0});var $e=P(d);D(p.$$.fragment,$e),$e.forEach(i),$=x(s),D(S.$$.fragment,s),z=x(s),T=b(s,"DIV",{id:!0});var pe=P(T);D(y.$$.fragment,pe),pe.forEach(i),V=x(s),L=b(s,"DIV",{id:!0});var ze=P(L);D(R.$$.fragment,ze),ze.forEach(i),H=x(s),W=b(s,"DIV",{id:!0});var Re=P(W);D(K.$$.fragment,Re),Re.forEach(i),_e=x(s),ge=b(s,"DIV",{id:!0}),P(ge).forEach(i),ve=x(s),de=b(s,"DIV",{id:!0}),P(de).forEach(i),ye=x(s),J=b(s,"DIV",{id:!0});var Ne=P(J);D(Q.$$.fragment,Ne),Ne.forEach(i),Ce=x(s),U=b(s,"H2",{"data-svelte-h":!0}),M(U)!=="svelte-1bt7j1y"&&(U.textContent=Ae),we=x(s),X=b(s,"DIV",{id:!0});var je=P(X);D(Y.$$.fragment,je),je.forEach(i),xe=x(s),Z=b(s,"DIV",{id:!0});var Fe=P(Z);D(ee.$$.fragment,Fe),Fe.forEach(i),ke=x(s),te=b(s,"DIV",{id:!0});var We=P(te);D(ne.$$.fragment,We),We.forEach(i),De=x(s),re=b(s,"DIV",{id:!0});var qe=P(re);D(oe.$$.fragment,qe),qe.forEach(i),Ie=x(s),le=b(s,"DIV",{id:!0});var Oe=P(le);D(ae.$$.fragment,Oe),Oe.forEach(i),Be=x(s),ie=b(s,"DIV",{id:!0});var Ge=P(ie);D(se.$$.fragment,Ge),Ge.forEach(i),Se=x(s),fe=b(s,"DIV",{id:!0});var Ke=P(fe);D(ce.$$.fragment,Ke),Ke.forEach(i),Ee=x(s),me=b(s,"DIV",{id:!0});var Je=P(me);D(ue.$$.fragment,Je),Je.forEach(i),this.h()},h(){E(e,"id","themes"),E(f,"id","variables"),E(d,"id","typography"),E(T,"id","bar"),E(L,"id","cards"),E(W,"id","tiles"),E(ge,"id","grid"),E(de,"id","hero"),E(J,"id","rows-and-columns"),E(X,"id","button"),E(Z,"id","checkbox"),E(te,"id","radio"),E(re,"id","form-item"),E(le,"id","tabs"),E(ie,"id","page"),E(fe,"id","split"),E(me,"id","menu")},m(s,_){g(s,e,_),g(s,t,_),I(o,s,_),g(s,l,_),I(a,s,_),g(s,n,_),g(s,f,_),I(u,f,null),g(s,m,_),g(s,d,_),I(p,d,null),g(s,$,_),I(S,s,_),g(s,z,_),g(s,T,_),I(y,T,null),g(s,V,_),g(s,L,_),I(R,L,null),g(s,H,_),g(s,W,_),I(K,W,null),g(s,_e,_),g(s,ge,_),g(s,ve,_),g(s,de,_),g(s,ye,_),g(s,J,_),I(Q,J,null),g(s,Ce,_),g(s,U,_),g(s,we,_),g(s,X,_),I(Y,X,null),g(s,xe,_),g(s,Z,_),I(ee,Z,null),g(s,ke,_),g(s,te,_),I(ne,te,null),g(s,De,_),g(s,re,_),I(oe,re,null),g(s,Ie,_),g(s,le,_),I(ae,le,null),g(s,Be,_),g(s,ie,_),I(se,ie,null),g(s,Se,_),g(s,fe,_),I(ce,fe,null),g(s,Ee,_),g(s,me,_),I(ue,me,null),Pe=!0},p(s,_){const $e={};_&16384&&($e.$$scope={dirty:_,ctx:s}),a.$set($e);const pe={};_&16384&&(pe.$$scope={dirty:_,ctx:s}),S.$set(pe)},i(s){Pe||(v(o.$$.fragment,s),v(a.$$.fragment,s),v(u.$$.fragment,s),v(p.$$.fragment,s),v(S.$$.fragment,s),v(y.$$.fragment,s),v(R.$$.fragment,s),v(K.$$.fragment,s),v(Q.$$.fragment,s),v(Y.$$.fragment,s),v(ee.$$.fragment,s),v(ne.$$.fragment,s),v(oe.$$.fragment,s),v(ae.$$.fragment,s),v(se.$$.fragment,s),v(ce.$$.fragment,s),v(ue.$$.fragment,s),Pe=!0)},o(s){C(o.$$.fragment,s),C(a.$$.fragment,s),C(u.$$.fragment,s),C(p.$$.fragment,s),C(S.$$.fragment,s),C(y.$$.fragment,s),C(R.$$.fragment,s),C(K.$$.fragment,s),C(Q.$$.fragment,s),C(Y.$$.fragment,s),C(ee.$$.fragment,s),C(ne.$$.fragment,s),C(oe.$$.fragment,s),C(ae.$$.fragment,s),C(se.$$.fragment,s),C(ce.$$.fragment,s),C(ue.$$.fragment,s),Pe=!1},d(s){s&&(i(e),i(t),i(l),i(n),i(f),i(m),i(d),i($),i(z),i(T),i(V),i(L),i(H),i(W),i(_e),i(ge),i(ve),i(de),i(ye),i(J),i(Ce),i(U),i(we),i(X),i(xe),i(Z),i(ke),i(te),i(De),i(re),i(Ie),i(le),i(Be),i(ie),i(Se),i(fe),i(Ee),i(me)),B(o,s),B(a,s),B(u),B(p),B(S,s),B(y),B(R),B(K),B(Q),B(Y),B(ee),B(ne),B(oe),B(ae),B(se),B(ce),B(ue)}}}function Cn(c){let e,r,t,o="<em>ContainCSS</em>",l,a;return{c(){e=h("div"),r=w(),t=h("h1"),t.innerHTML=o,l=w(),a=h("div"),this.h()},l(n){e=b(n,"DIV",{class:!0}),P(e).forEach(i),r=x(n),t=b(n,"H1",{"data-svelte-h":!0}),M(t)!=="svelte-1463n1k"&&(t.innerHTML=o),l=x(n),a=b(n,"DIV",{class:!0}),P(a).forEach(i),this.h()},h(){E(e,"class","icon"),E(a,"class","info")},m(n,f){g(n,e,f),g(n,r,f),g(n,t,f),g(n,l,f),g(n,a,f)},p:F,d(n){n&&(i(e),i(r),i(t),i(l),i(a))}}}function wn(c){let e,r,t;return e=new Le({props:{slot:"header",$$slots:{default:[Cn]},$$scope:{ctx:c}}}),{c(){r=h("div"),k(e.$$.fragment),this.h()},l(o){r=b(o,"DIV",{style:!0});var l=P(r);D(e.$$.fragment,l),this.h()},h(){A(r,"display","contents"),A(r,"--bar-border-top","none")},m(o,l){g(o,r,l),I(e,r,null),t=!0},p(o,l){const a={};l&16384&&(a.$$scope={dirty:l,ctx:o}),e.$set(a)},i(o){t||(v(e.$$.fragment,o),t=!0)},o(o){C(e.$$.fragment,o),t=!1},d(o){o&&e&&i(r),B(e,o)}}}function xn(c){let e,r="by Tom Hinkle";return{c(){e=h("a"),e.textContent=r,this.h()},l(t){e=b(t,"A",{href:!0,"data-svelte-h":!0}),M(e)!=="svelte-1l32epw"&&(e.textContent=r),this.h()},h(){E(e,"href","https://tomhinkle.net"),A(e,"color","var(--body-fg)")},m(t,o){g(t,e,o)},p:F,d(t){t&&i(e)}}}function kn(c){let e,r,t;return e=new Le({props:{slot:"footer",height:"1.5em",marginBottom:"0",$$slots:{default:[xn]},$$scope:{ctx:c}}}),{c(){r=h("div"),k(e.$$.fragment),this.h()},l(o){r=b(o,"DIV",{style:!0});var l=P(r);D(e.$$.fragment,l),this.h()},h(){A(r,"display","contents"),A(r,"--bar-justify","flex-end"),A(r,"--bar-border-top","none"),A(r,"--bar-border-bottom","none")},m(o,l){g(o,r,l),I(e,r,null),t=!0},p(o,l){const a={};l&16384&&(a.$$scope={dirty:l,ctx:o}),e.$set(a)},i(o){t||(v(e.$$.fragment,o),t=!0)},o(o){C(e.$$.fragment,o),t=!1},d(o){o&&e&&i(r),B(e,o)}}}function Dn(c){let e,r;return{c(){e=h("a"),r=N(c[11]),this.h()},l(t){e=b(t,"A",{href:!0,target:!0});var o=P(e);r=j(o,c[11]),o.forEach(i),this.h()},h(){E(e,"href",Nt+"/"+c[11]),E(e,"target","_blank")},m(t,o){g(t,e,o),O(e,r)},p:F,d(t){t&&i(e)}}}function In(c){let e,r=G(["Card","RadioButton","Bar"]),t=[];for(let o=0;o<3;o+=1)t[o]=Dn(on(c,r,o));return{c(){for(let o=0;o<3;o+=1)t[o].c();e=q()},l(o){for(let l=0;l<3;l+=1)t[l].l(o);e=q()},m(o,l){for(let a=0;a<3;a+=1)t[a]&&t[a].m(o,l);g(o,e,l)},p:F,d(o){o&&i(e),be(t,o)}}}function Bn(c){let e,r="Jump to Component";return{c(){e=h("span"),e.textContent=r,this.h()},l(t){e=b(t,"SPAN",{slot:!0,"data-svelte-h":!0}),M(e)!=="svelte-15vapiz"&&(e.textContent=r),this.h()},h(){E(e,"slot","label")},m(t,o){g(t,e,o)},p:F,d(t){t&&i(e)}}}function Sn(c){let e;return{c(){e=N("Right")},l(r){e=j(r,"Right")},m(r,t){g(r,e,t)},d(r){r&&i(e)}}}function En(c){let e;return{c(){e=N("Left")},l(r){e=j(r,"Left")},m(r,t){g(r,e,t)},d(r){r&&i(e)}}}function Pn(c){let e,r;function t(a,n){return a[1]?En:Sn}let o=t(c),l=o(c);return{c(){e=N(`Move Sidebar to
          `),l.c(),r=q()},l(a){e=j(a,`Move Sidebar to
          `),l.l(a),r=q()},m(a,n){g(a,e,n),l.m(a,n),g(a,r,n)},p(a,n){o!==(o=t(a))&&(l.d(1),l=o(a),l&&(l.c(),l.m(r.parentNode,r)))},d(a){a&&(i(e),i(r)),l.d(a)}}}function lt(c){let e,r,t=c[8].title+"",o,l;return{c(){e=h("li"),r=h("a"),o=N(t),l=w(),this.h()},l(a){e=b(a,"LI",{});var n=P(e);r=b(n,"A",{href:!0});var f=P(r);o=j(f,t),f.forEach(i),l=x(n),n.forEach(i),this.h()},h(){E(r,"href",c[8].url),Xe(r,"active",c[0]===c[8].url)},m(a,n){g(a,e,n),O(e,r),O(r,o),O(e,l)},p(a,n){n&5&&Xe(r,"active",a[0]===a[8].url)},d(a){a&&i(e)}}}function at(c){let e,r=c[5].title+"",t,o,l,a=G(c[5].items),n=[];for(let f=0;f<a.length;f+=1)n[f]=lt(ot(c,a,f));return{c(){e=h("h2"),t=N(r),o=w();for(let f=0;f<n.length;f+=1)n[f].c();l=q()},l(f){e=b(f,"H2",{});var u=P(e);t=j(u,r),u.forEach(i),o=x(f);for(let m=0;m<n.length;m+=1)n[m].l(f);l=q()},m(f,u){g(f,e,u),O(e,t),g(f,o,u);for(let m=0;m<n.length;m+=1)n[m]&&n[m].m(f,u);g(f,l,u)},p(f,u){if(u&5){a=G(f[5].items);let m;for(m=0;m<a.length;m+=1){const d=ot(f,a,m);n[m]?n[m].p(d,u):(n[m]=lt(d),n[m].c(),n[m].m(l.parentNode,l))}for(;m<n.length;m+=1)n[m].d(1);n.length=a.length}},d(f){f&&(i(e),i(o),i(l)),be(n,f)}}}function Tn(c){let e,r,t="Standalone Pages",o,l,a,n,f,u,m,d="Jump",p,$,S;l=new Rt({props:{$$slots:{label:[Bn],default:[In]},$$scope:{ctx:c}}}),f=new he({props:{$$slots:{default:[Pn]},$$scope:{ctx:c}}}),f.$on("click",c[3]);let z=G(c[2]),T=[];for(let y=0;y<z.length;y+=1)T[y]=at(rt(c,z,y));return{c(){e=h("li"),r=h("h3"),r.textContent=t,o=w(),k(l.$$.fragment),a=w(),n=h("li"),k(f.$$.fragment),u=w(),m=h("li"),m.textContent=d,p=w(),$=h("li");for(let y=0;y<T.length;y+=1)T[y].c()},l(y){e=b(y,"LI",{});var V=P(e);r=b(V,"H3",{"data-svelte-h":!0}),M(r)!=="svelte-11zpn8n"&&(r.textContent=t),o=x(V),D(l.$$.fragment,V),V.forEach(i),a=x(y),n=b(y,"LI",{});var L=P(n);D(f.$$.fragment,L),L.forEach(i),u=x(y),m=b(y,"LI",{"data-svelte-h":!0}),M(m)!=="svelte-1cdhcmk"&&(m.textContent=d),p=x(y),$=b(y,"LI",{});var R=P($);for(let H=0;H<T.length;H+=1)T[H].l(R);R.forEach(i)},m(y,V){g(y,e,V),O(e,r),O(e,o),I(l,e,null),g(y,a,V),g(y,n,V),I(f,n,null),g(y,u,V),g(y,m,V),g(y,p,V),g(y,$,V);for(let L=0;L<T.length;L+=1)T[L]&&T[L].m($,null);S=!0},p(y,V){const L={};V&16384&&(L.$$scope={dirty:V,ctx:y}),l.$set(L);const R={};if(V&16386&&(R.$$scope={dirty:V,ctx:y}),f.$set(R),V&5){z=G(y[2]);let H;for(H=0;H<z.length;H+=1){const W=rt(y,z,H);T[H]?T[H].p(W,V):(T[H]=at(W),T[H].c(),T[H].m($,null))}for(;H<T.length;H+=1)T[H].d(1);T.length=z.length}},i(y){S||(v(l.$$.fragment,y),v(f.$$.fragment,y),S=!0)},o(y){C(l.$$.fragment,y),C(f.$$.fragment,y),S=!1},d(y){y&&(i(e),i(a),i(n),i(u),i(m),i(p),i($)),B(l),B(f),be(T,y)}}}function Vn(c){let e,r;return e=new Ct({props:{$$slots:{default:[Tn]},$$scope:{ctx:c}}}),{c(){k(e.$$.fragment)},l(t){D(e.$$.fragment,t)},m(t,o){I(e,t,o),r=!0},p(t,o){const l={};o&16387&&(l.$$scope={dirty:o,ctx:t}),e.$set(l)},i(t){r||(v(e.$$.fragment,t),r=!0)},o(t){C(e.$$.fragment,t),r=!1},d(t){B(e,t)}}}function Hn(c){let e,r;return e=new gt({props:{slot:"sidebar",right:c[1],$$slots:{default:[Vn]},$$scope:{ctx:c}}}),{c(){k(e.$$.fragment)},l(t){D(e.$$.fragment,t)},m(t,o){I(e,t,o),r=!0},p(t,o){const l={};o&2&&(l.right=t[1]),o&16387&&(l.$$scope={dirty:o,ctx:t}),e.$set(l)},i(t){r||(v(e.$$.fragment,t),r=!0)},o(t){C(e.$$.fragment,t),r=!1},d(t){B(e,t)}}}function Mn(c){let e,r,t,o;return e=new Wt({props:{center:!0,bg:"var(--primary-bg)",fg:"var(--primary-fg)",$$slots:{default:[ln]},$$scope:{ctx:c}}}),t=new yt({props:{right:c[1],sticky:!0,$$slots:{sidebar:[Hn],footer:[kn],header:[wn],default:[yn]},$$scope:{ctx:c}}}),{c(){k(e.$$.fragment),r=w(),k(t.$$.fragment)},l(l){D(e.$$.fragment,l),r=x(l),D(t.$$.fragment,l)},m(l,a){I(e,l,a),g(l,r,a),I(t,l,a),o=!0},p(l,[a]){const n={};a&16384&&(n.$$scope={dirty:a,ctx:l}),e.$set(n);const f={};a&2&&(f.right=l[1]),a&16387&&(f.$$scope={dirty:a,ctx:l}),t.$set(f)},i(l){o||(v(e.$$.fragment,l),v(t.$$.fragment,l),o=!0)},o(l){C(e.$$.fragment,l),C(t.$$.fragment,l),o=!1},d(l){l&&i(r),B(e,l),B(t,l)}}}function Ln(c,e,r){let t="";const o=()=>{r(0,t=window.location.hash),console.log("Hash is",t)};it(()=>(o(),window.addEventListener("hashchange",o),()=>{window.removeEventListener("hashchange",o)}));const l=[{title:"Overview",items:[{title:"About",url:"#about"},{title:"Themes",url:"#themes"},{title:"Variables",url:"#variables"},{title:"Typography",url:"#typography"}]},{title:"Controls",items:[{title:"Button",url:"#button"},{title:"Checkbox",url:"#checkbox"},{title:"Radio",url:"#radio"},{title:"Input",url:"#input"},{title:"Select",url:"#select"}]},{title:"Layout Components",items:[{title:"Bar",url:"#bar"},{title:"Cards",url:"#cards"},{title:"Tiles",url:"#tiles"},{title:"Grid",url:"#grid"},{title:"Rows & Columns",url:"#rows-and-columns"},{title:"Page",url:"#page"},{title:"Hero",url:"#hero"}]},{title:"Fancy Stuff",items:[{title:"Tabs",url:"#tabs"},{title:"Sidebar",url:"#sidebar"},{title:"Split Pane",url:"#split"}]}];let a=!1;return[t,a,l,()=>{r(1,a=!a)}]}class mr extends He{constructor(e){super(),Me(this,e,Ln,Mn,Ve,{})}}export{mr as component};
