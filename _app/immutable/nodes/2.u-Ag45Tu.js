import{s as Ve,x as pt,e as h,b,d as E,g as i,k as S,i as d,C as ht,D as bt,E as _t,F as Qe,G as Ue,a as C,c as w,K as it,m as z,h as P,w as pe,o as ft,p as st,t as M,j as H,n as L,f as V,l as ce,L as Xe}from"../chunks/scheduler.DEib646s.js";import{S as Me,i as He,t as v,b as y,c as x,a as k,m as D,d as B,g as ct,f as mt,e as ut}from"../chunks/index.DNYspYh7.js";import{e as R}from"../chunks/each.D6YF6ztN.js";import{i as vt,P as yt,B as Le}from"../chunks/Columns.svelte_svelte_type_style_lang.Dna-L0GN.js";import{C as Pe}from"../chunks/Card.f5WXgU53.js";import{M as Ct}from"../chunks/MenuList.D-20bge4.js";import{S as gt}from"../chunks/Sidebar.C8FVp7YY.js";import{G as wt,T as xt}from"../chunks/TileDemo.zwyMeJtq.js";import kt from"../chunks/BarDemo.CO0YFrWa.js";import Dt from"../chunks/ButtonDemo.C4HEHWJb.js";import Bt from"../chunks/TypographyDemo.CgsJn5h0.js";import It from"../chunks/SplitPaneDemo.CfaChSEQ.js";import St from"../chunks/CheckboxDemo.BYSAEUJW.js";import Et from"../chunks/RadioButtonDemo.Ao-dayap.js";import Tt from"../chunks/FormItemDemo.DPoaqPUN.js";import Pt from"../chunks/VariableDemo.CmjhrAHF.js";import{B as $e}from"../chunks/Button.cSXnxJmI.js";import{C as dt}from"../chunks/Code.CpPJrYDO.js";import Vt from"../chunks/PageDemo.q-3dcxaN.js";import Mt from"../chunks/TabDemo.CM4o607U.js";import{C as Ht}from"../chunks/Container.BT8KG5Hm.js";import Lt from"../chunks/DropdownMenuDemo.f1evk2oB.js";import{R as $t}from"../chunks/RadioButton.C7VgfJQa.js";import{F as Ye}from"../chunks/FormItem.DP6qheUs.js";import At from"../chunks/CardDemo.yJgaqE9A.js";import zt from"../chunks/RowsAndColumnsDemo.BZkwpOoK.js";import{D as Rt}from"../chunks/Select.Dsr8Yvzk.js";import{b as Nt}from"../chunks/paths.Bq42uGIg.js";function jt(c){let e,n;const t=c[6].default,o=pt(t,c,c[5],null);return{c(){e=h("div"),o&&o.c(),this.h()},l(l){e=b(l,"DIV",{class:!0});var a=E(e);o&&o.l(a),a.forEach(i),this.h()},h(){S(e,"class","hero svelte-ouw6xl")},m(l,a){d(l,e,a),o&&o.m(e,null),n=!0},p(l,[a]){o&&o.p&&(!n||a&32)&&ht(o,t,l,l[5],n?_t(t,l[5],a,null):bt(l[5]),null)},i(l){n||(v(o,l),n=!0)},o(l){y(o,l),n=!1},d(l){l&&i(e),o&&o.d(l)}}}function Ft(c,e,n){let{$$slots:t={},$$scope:o}=e,{bg:l=null}=e,{fg:a=null}=e,{padding:r=null}=e,{width:m=null}=e,{height:g=null}=e;return vt(e,"hero",["bg","fg","padding","width","height"]),c.$$set=s=>{n(8,e=Qe(Qe({},e),Ue(s))),"bg"in s&&n(0,l=s.bg),"fg"in s&&n(1,a=s.fg),"padding"in s&&n(2,r=s.padding),"width"in s&&n(3,m=s.width),"height"in s&&n(4,g=s.height),"$$scope"in s&&n(5,o=s.$$scope)},e=Ue(e),[l,a,r,m,g,o,t]}class Wt extends Me{constructor(e){super(),He(this,e,Ft,jt,Ve,{bg:0,fg:1,padding:2,width:3,height:4})}}const qt=`:root {
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
`;function Ze(c,e,n){const t=c.slice();return t[8]=e[n],t[10]=n,t}function et(c,e,n){const t=c.slice();return t[8]=e[n],t[10]=n,t}function Xt(c){let e=c[8].name+"",n;return{c(){n=M(e)},l(t){n=H(t,e)},m(t,o){d(t,n,o)},p:L,d(t){t&&i(n)}}}function tt(c){let e,n,t;function o(a){c[4](a)}let l={value:c[10],$$slots:{default:[Xt]},$$scope:{ctx:c}};return c[0]!==void 0&&(l.group=c[0]),e=new $t({props:l}),ft.push(()=>ut(e,"group",o)),{c(){x(e.$$.fragment)},l(a){k(e.$$.fragment,a)},m(a,r){D(e,a,r),t=!0},p(a,r){const m={};r&4096&&(m.$$scope={dirty:r,ctx:a}),!n&&r&1&&(n=!0,m.group=a[0],st(()=>n=!1)),e.$set(m)},i(a){t||(v(e.$$.fragment,a),t=!0)},o(a){y(e.$$.fragment,a),t=!1},d(a){B(e,a)}}}function Yt(c){let e,n="Typography",t,o,l,a=R(c[2]),r=[];for(let g=0;g<a.length;g+=1)r[g]=tt(et(c,a,g));const m=g=>y(r[g],1,1,()=>{r[g]=null});return{c(){e=h("span"),e.textContent=n,t=C();for(let g=0;g<r.length;g+=1)r[g].c();o=z(),this.h()},l(g){e=b(g,"SPAN",{class:!0,"data-svelte-h":!0}),P(e)!=="svelte-1dswt72"&&(e.textContent=n),t=w(g);for(let s=0;s<r.length;s+=1)r[s].l(g);o=z(),this.h()},h(){S(e,"class","label")},m(g,s){d(g,e,s),d(g,t,s);for(let u=0;u<r.length;u+=1)r[u]&&r[u].m(g,s);d(g,o,s),l=!0},p(g,s){if(s&5){a=R(g[2]);let u;for(u=0;u<a.length;u+=1){const $=et(g,a,u);r[u]?(r[u].p($,s),v(r[u],1)):(r[u]=tt($),r[u].c(),v(r[u],1),r[u].m(o.parentNode,o))}for(ct(),u=a.length;u<r.length;u+=1)m(u);mt()}},i(g){if(!l){for(let s=0;s<a.length;s+=1)v(r[s]);l=!0}},o(g){r=r.filter(Boolean);for(let s=0;s<r.length;s+=1)y(r[s]);l=!1},d(g){g&&(i(e),i(t),i(o)),pe(r,g)}}}function Zt(c){let e=c[8].name+"",n;return{c(){n=M(e)},l(t){n=H(t,e)},m(t,o){d(t,n,o)},p:L,d(t){t&&i(n)}}}function nt(c){let e,n,t;function o(a){c[5](a)}let l={value:c[10],$$slots:{default:[Zt]},$$scope:{ctx:c}};return c[1]!==void 0&&(l.group=c[1]),e=new $t({props:l}),ft.push(()=>ut(e,"group",o)),{c(){x(e.$$.fragment)},l(a){k(e.$$.fragment,a)},m(a,r){D(e,a,r),t=!0},p(a,r){const m={};r&4096&&(m.$$scope={dirty:r,ctx:a}),!n&&r&2&&(n=!0,m.group=a[1],st(()=>n=!1)),e.$set(m)},i(a){t||(v(e.$$.fragment,a),t=!0)},o(a){y(e.$$.fragment,a),t=!1},d(a){B(e,a)}}}function en(c){let e,n="Color",t,o,l,a=R(c[3]),r=[];for(let g=0;g<a.length;g+=1)r[g]=nt(Ze(c,a,g));const m=g=>y(r[g],1,1,()=>{r[g]=null});return{c(){e=h("span"),e.textContent=n,t=C();for(let g=0;g<r.length;g+=1)r[g].c();o=z(),this.h()},l(g){e=b(g,"SPAN",{class:!0,"data-svelte-h":!0}),P(e)!=="svelte-1nez6i6"&&(e.textContent=n),t=w(g);for(let s=0;s<r.length;s+=1)r[s].l(g);o=z(),this.h()},h(){S(e,"class","label")},m(g,s){d(g,e,s),d(g,t,s);for(let u=0;u<r.length;u+=1)r[u]&&r[u].m(g,s);d(g,o,s),l=!0},p(g,s){if(s&10){a=R(g[3]);let u;for(u=0;u<a.length;u+=1){const $=Ze(g,a,u);r[u]?(r[u].p($,s),v(r[u],1)):(r[u]=nt($),r[u].c(),v(r[u],1),r[u].m(o.parentNode,o))}for(ct(),u=a.length;u<r.length;u+=1)m(u);mt()}},i(g){if(!l){for(let s=0;s<a.length;s+=1)v(r[s]);l=!0}},o(g){r=r.filter(Boolean);for(let s=0;s<r.length;s+=1)y(r[s]);l=!1},d(g){g&&(i(e),i(t),i(o)),pe(r,g)}}}function tn(c){let e,n,t,o;return e=new Ye({props:{fullWidth:!0,$$slots:{default:[Yt]},$$scope:{ctx:c}}}),t=new Ye({props:{fullWidth:!0,$$slots:{default:[en]},$$scope:{ctx:c}}}),{c(){x(e.$$.fragment),n=C(),x(t.$$.fragment)},l(l){k(e.$$.fragment,l),n=w(l),k(t.$$.fragment,l)},m(l,a){D(e,l,a),d(l,n,a),D(t,l,a),o=!0},p(l,[a]){const r={};a&4097&&(r.$$scope={dirty:a,ctx:l}),e.$set(r);const m={};a&4098&&(m.$$scope={dirty:a,ctx:l}),t.$set(m)},i(l){o||(v(e.$$.fragment,l),v(t.$$.fragment,l),o=!0)},o(l){y(e.$$.fragment,l),y(t.$$.fragment,l),o=!1},d(l){l&&i(n),B(e,l),B(t,l)}}}function nn(c,e,n){let t=[{name:"Defaults",css:""},{name:"Browser Defaults",css:Ot},{name:"Airy",css:Gt},{name:"IBM Plex",css:Kt}],o=[{name:"Purple",css:qt},{name:"Light",css:Qt},{name:"Dark",css:Ut},{name:"Light or Dark (Responsive)",css:Jt},{name:"Defaults",css:""}],l=0,a=0,r=!1;it(()=>{r=!0});function m(u,$){if(!r)return;let p=`${u}-injected-style`,I=document.getElementById(p);I||(I=document.createElement("style"),I.id=p,document.head.appendChild(I)),I.innerHTML=$}function g(u){l=u,n(0,l)}function s(u){a=u,n(1,a)}return c.$$.update=()=>{c.$$.dirty&1&&m("typography",t[l].css),c.$$.dirty&2&&m("color",o[a].css)},[l,a,t,o,g,s]}class rn extends Me{constructor(e){super(),He(this,e,nn,tn,Ve,{})}}function rt(c,e,n){const t=c.slice();return t[5]=e[n],t}function ot(c,e,n){const t=c.slice();return t[8]=e[n],t}function on(c,e,n){const t=c.slice();return t[11]=e[n],t}function ln(c){let e,n="Meet <em>ContainCSS</em>",t,o,l=`The Simple Svelte Component Library that uses css variables & container
    queries to make your life easier.`;return{c(){e=h("h1"),e.innerHTML=n,t=C(),o=h("p"),o.textContent=l,this.h()},l(a){e=b(a,"H1",{style:!0,"data-svelte-h":!0}),P(e)!=="svelte-1qybmr5"&&(e.innerHTML=n),t=w(a),o=b(a,"P",{"data-svelte-h":!0}),P(o)!=="svelte-14uamxx"&&(o.textContent=l),this.h()},h(){V(e,"text-align","center")},m(a,r){d(a,e,r),d(a,t,r),d(a,o,r)},p:L,d(a){a&&(i(e),i(t),i(o))}}}function an(c){let e;return{c(){e=M("Wow")},l(n){e=H(n,"Wow")},m(n,t){d(n,e,t)},d(n){n&&i(e)}}}function fn(c){let e,n=`Presenting the simple components you would expect to see in any modern
        component library.`,t,o,l=`Using svelte components is easy and supports a number of intuitive
        properties, such as:`,a,r,m,g,s,u,$;return r=new dt({props:{code:`<Button 
  bg="green" 
  fg="white" 
  width="64px" 
  height="64px">
  Wow
</Button>`}}),u=new $e({props:{bg:"green",fg:"white",width:"64px",height:"64px",$$slots:{default:[an]},$$scope:{ctx:c}}}),{c(){e=h("p"),e.textContent=n,t=C(),o=h("p"),o.textContent=l,a=C(),x(r.$$.fragment),m=C(),g=h("br"),s=M(`Which produces:
      `),x(u.$$.fragment)},l(p){e=b(p,"P",{"data-svelte-h":!0}),P(e)!=="svelte-1wi5k4z"&&(e.textContent=n),t=w(p),o=b(p,"P",{"data-svelte-h":!0}),P(o)!=="svelte-lhtceo"&&(o.textContent=l),a=w(p),k(r.$$.fragment,p),m=w(p),g=b(p,"BR",{}),s=H(p,`Which produces:
      `),k(u.$$.fragment,p)},m(p,I){d(p,e,I),d(p,t,I),d(p,o,I),d(p,a,I),D(r,p,I),d(p,m,I),d(p,g,I),d(p,s,I),D(u,p,I),$=!0},p(p,I){const T={};I&16384&&(T.$$scope={dirty:I,ctx:p}),u.$set(T)},i(p){$||(v(r.$$.fragment,p),v(u.$$.fragment,p),$=!0)},o(p){y(r.$$.fragment,p),y(u.$$.fragment,p),$=!1},d(p){p&&(i(e),i(t),i(o),i(a),i(m),i(g),i(s)),B(r,p),B(u,p)}}}function sn(c){let e,n="Simple Components";return{c(){e=h("h2"),e.textContent=n,this.h()},l(t){e=b(t,"H2",{slot:!0,"data-svelte-h":!0}),P(e)!=="svelte-13rhzqo"&&(e.textContent=n),this.h()},h(){S(e,"slot","header")},m(t,o){d(t,e,o)},p:L,d(t){t&&i(e)}}}function cn(c){let e;return{c(){e=M("Home")},l(n){e=H(n,"Home")},m(n,t){d(n,e,t)},d(n){n&&i(e)}}}function mn(c){let e;return{c(){e=M("About")},l(n){e=H(n,"About")},m(n,t){d(n,e,t)},d(n){n&&i(e)}}}function un(c){let e;return{c(){e=M("Contact")},l(n){e=H(n,"Contact")},m(n,t){d(n,e,t)},d(n){n&&i(e)}}}function gn(c){let e,n,t,o,l,a;return e=new $e({props:{$$slots:{default:[cn]},$$scope:{ctx:c}}}),t=new $e({props:{$$slots:{default:[mn]},$$scope:{ctx:c}}}),l=new $e({props:{$$slots:{default:[un]},$$scope:{ctx:c}}}),{c(){x(e.$$.fragment),n=C(),x(t.$$.fragment),o=C(),x(l.$$.fragment)},l(r){k(e.$$.fragment,r),n=w(r),k(t.$$.fragment,r),o=w(r),k(l.$$.fragment,r)},m(r,m){D(e,r,m),d(r,n,m),D(t,r,m),d(r,o,m),D(l,r,m),a=!0},p(r,m){const g={};m&16384&&(g.$$scope={dirty:m,ctx:r}),e.$set(g);const s={};m&16384&&(s.$$scope={dirty:m,ctx:r}),t.$set(s);const u={};m&16384&&(u.$$scope={dirty:m,ctx:r}),l.$set(u)},i(r){a||(v(e.$$.fragment,r),v(t.$$.fragment,r),v(l.$$.fragment,r),a=!0)},o(r){y(e.$$.fragment,r),y(t.$$.fragment,r),y(l.$$.fragment,r),a=!1},d(r){r&&(i(n),i(o)),B(e,r),B(t,r),B(l,r)}}}function dn(c){let e,n=`Our shorthand properties like bg and fg are just syntactic sugar for CSS
        variables scoped to components, like <code>--card-bg</code> and
        <code>--button-width</code>.`,t,o,l=`Because we use CSS variables, you can inject variables wherever you like
        in your component heirarchy, as in this nav bar with custom buttons:`,a,r,m,g,s,u;return r=new dt({props:{code:`<Bar --bar-bg="#333"
  --button-bg="#333"
  --button-fg="#eee"
  --button-height="3rem">
  <Button>Home</Button>
  <Button>About</Button>
  <Button>Contact</Button>
</Bar>`}}),g=new Le({props:{$$slots:{default:[gn]},$$scope:{ctx:c}}}),{c(){e=h("p"),e.innerHTML=n,t=C(),o=h("p"),o.textContent=l,a=C(),x(r.$$.fragment),m=C(),s=h("div"),x(g.$$.fragment),this.h()},l($){e=b($,"P",{"data-svelte-h":!0}),P(e)!=="svelte-1fm17v9"&&(e.innerHTML=n),t=w($),o=b($,"P",{"data-svelte-h":!0}),P(o)!=="svelte-18eslr1"&&(o.textContent=l),a=w($),k(r.$$.fragment,$),m=w($),s=b($,"DIV",{style:!0});var p=E(s);k(g.$$.fragment,p),this.h()},h(){V(s,"display","contents"),V(s,"--bar-bg","#333"),V(s,"--button-bg","#333"),V(s,"--button-fg","#eee"),V(s,"--button-height","3rem")},m($,p){d($,e,p),d($,t,p),d($,o,p),d($,a,p),D(r,$,p),d($,m,p),d($,s,p),D(g,s,null),u=!0},p($,p){const I={};p&16384&&(I.$$scope={dirty:p,ctx:$}),g.$set(I)},i($){u||(v(r.$$.fragment,$),v(g.$$.fragment,$),u=!0)},o($){y(r.$$.fragment,$),y(g.$$.fragment,$),u=!1},d($){$&&(i(e),i(t),i(o),i(a),i(m)),B(r,$),$&&g&&i(s),B(g,$)}}}function $n(c){let e,n="CSS Variables";return{c(){e=h("h2"),e.textContent=n,this.h()},l(t){e=b(t,"H2",{slot:!0,"data-svelte-h":!0}),P(e)!=="svelte-p250vs"&&(e.textContent=n),this.h()},h(){S(e,"slot","header")},m(t,o){d(t,e,o)},p:L,d(t){t&&i(e)}}}function pn(c){let e,n=`This is the same "Sidebar" component that you see on the main page,
            but this time "contained" in a card.`;return{c(){e=h("p"),e.textContent=n},l(t){e=b(t,"P",{"data-svelte-h":!0}),P(e)!=="svelte-asi4q4"&&(e.textContent=n)},m(t,o){d(t,e,o)},p:L,d(t){t&&i(e)}}}function hn(c){let e,n,t,o,l=`We use container queries out of the box, so you can adjust the layout
          of your components based on their size, rather than relying only on
          the viewport size. This "Card" has a sidebar, for example, but because
          the card is small, the sidebar will be in the "expander" small mode in
          the card, regardless of the screen size.`,a;return n=new gt({props:{$$slots:{default:[pn]},$$scope:{ctx:c}}}),{c(){e=h("div"),x(n.$$.fragment),t=C(),o=h("p"),o.textContent=l,this.h()},l(r){e=b(r,"DIV",{style:!0});var m=E(e);k(n.$$.fragment,m),t=w(m),o=b(m,"P",{"data-svelte-h":!0}),P(o)!=="svelte-gxn8ea"&&(o.textContent=l),m.forEach(i),this.h()},h(){V(e,"display","flex"),V(e,"position","relative")},m(r,m){d(r,e,m),D(n,e,null),ce(e,t),ce(e,o),a=!0},p(r,m){const g={};m&16384&&(g.$$scope={dirty:m,ctx:r}),n.$set(g)},i(r){a||(v(n.$$.fragment,r),a=!0)},o(r){y(n.$$.fragment,r),a=!1},d(r){r&&i(e),B(n)}}}function bn(c){let e,n="Container Queries";return{c(){e=h("h2"),e.textContent=n,this.h()},l(t){e=b(t,"H2",{slot:!0,"data-svelte-h":!0}),P(e)!=="svelte-7oekzb"&&(e.textContent=n),this.h()},h(){S(e,"slot","header")},m(t,o){d(t,e,o)},p:L,d(t){t&&i(e)}}}function _n(c){let e,n,t,o,l,a;return e=new Pe({props:{$$slots:{header:[sn],default:[fn]},$$scope:{ctx:c}}}),t=new Pe({props:{$$slots:{header:[$n],default:[dn]},$$scope:{ctx:c}}}),l=new Pe({props:{fixedHeight:!0,$$slots:{header:[bn],default:[hn]},$$scope:{ctx:c}}}),{c(){x(e.$$.fragment),n=C(),x(t.$$.fragment),o=C(),x(l.$$.fragment)},l(r){k(e.$$.fragment,r),n=w(r),k(t.$$.fragment,r),o=w(r),k(l.$$.fragment,r)},m(r,m){D(e,r,m),d(r,n,m),D(t,r,m),d(r,o,m),D(l,r,m),a=!0},p(r,m){const g={};m&16384&&(g.$$scope={dirty:m,ctx:r}),e.$set(g);const s={};m&16384&&(s.$$scope={dirty:m,ctx:r}),t.$set(s);const u={};m&16384&&(u.$$scope={dirty:m,ctx:r}),l.$set(u)},i(r){a||(v(e.$$.fragment,r),v(t.$$.fragment,r),v(l.$$.fragment,r),a=!0)},o(r){y(e.$$.fragment,r),y(t.$$.fragment,r),y(l.$$.fragment,r),a=!1},d(r){r&&(i(n),i(o)),B(e,r),B(t,r),B(l,r)}}}function vn(c){let e,n="Layout";return{c(){e=h("h2"),e.textContent=n},l(t){e=b(t,"H2",{"data-svelte-h":!0}),P(e)!=="svelte-19krxxg"&&(e.textContent=n)},m(t,o){d(t,e,o)},p:L,d(t){t&&i(e)}}}function yn(c){let e,n="Themes",t,o,l,a,r,m,g,s,u,$,p,I,T,A,N,he,j,F,be,W,q,_e,me,ve,ue,ye,O,G,Ce,K,Ae="Components",we,J,Q,xe,U,X,ke,Y,Z,De,ee,te,Be,ne,re,Ie,oe,le,Se,ae,ie,Ee,fe,se,Te;return o=new rn({}),a=new wt({props:{$$slots:{default:[_n]},$$scope:{ctx:c}}}),g=new Pt({}),$=new Bt({}),I=new Ht({props:{$$slots:{default:[vn]},$$scope:{ctx:c}}}),N=new kt({}),F=new At({}),q=new xt({}),G=new zt({}),Q=new Dt({}),X=new St({}),Z=new Et({}),te=new Tt({}),re=new Mt({}),le=new Vt({}),ie=new It({}),se=new Lt({}),{c(){e=h("h2"),e.textContent=n,t=C(),x(o.$$.fragment),l=C(),x(a.$$.fragment),r=C(),m=h("div"),x(g.$$.fragment),s=C(),u=h("div"),x($.$$.fragment),p=C(),x(I.$$.fragment),T=C(),A=h("div"),x(N.$$.fragment),he=C(),j=h("div"),x(F.$$.fragment),be=C(),W=h("div"),x(q.$$.fragment),_e=C(),me=h("div"),ve=C(),ue=h("div"),ye=C(),O=h("div"),x(G.$$.fragment),Ce=C(),K=h("h2"),K.textContent=Ae,we=C(),J=h("div"),x(Q.$$.fragment),xe=C(),U=h("div"),x(X.$$.fragment),ke=C(),Y=h("div"),x(Z.$$.fragment),De=C(),ee=h("div"),x(te.$$.fragment),Be=C(),ne=h("div"),x(re.$$.fragment),Ie=C(),oe=h("div"),x(le.$$.fragment),Se=C(),ae=h("div"),x(ie.$$.fragment),Ee=C(),fe=h("div"),x(se.$$.fragment),this.h()},l(f){e=b(f,"H2",{id:!0,"data-svelte-h":!0}),P(e)!=="svelte-5hc0hq"&&(e.textContent=n),t=w(f),k(o.$$.fragment,f),l=w(f),k(a.$$.fragment,f),r=w(f),m=b(f,"DIV",{id:!0});var _=E(m);k(g.$$.fragment,_),_.forEach(i),s=w(f),u=b(f,"DIV",{id:!0});var ge=E(u);k($.$$.fragment,ge),ge.forEach(i),p=w(f),k(I.$$.fragment,f),T=w(f),A=b(f,"DIV",{id:!0});var de=E(A);k(N.$$.fragment,de),de.forEach(i),he=w(f),j=b(f,"DIV",{id:!0});var ze=E(j);k(F.$$.fragment,ze),ze.forEach(i),be=w(f),W=b(f,"DIV",{id:!0});var Re=E(W);k(q.$$.fragment,Re),Re.forEach(i),_e=w(f),me=b(f,"DIV",{id:!0}),E(me).forEach(i),ve=w(f),ue=b(f,"DIV",{id:!0}),E(ue).forEach(i),ye=w(f),O=b(f,"DIV",{id:!0});var Ne=E(O);k(G.$$.fragment,Ne),Ne.forEach(i),Ce=w(f),K=b(f,"H2",{"data-svelte-h":!0}),P(K)!=="svelte-1bt7j1y"&&(K.textContent=Ae),we=w(f),J=b(f,"DIV",{id:!0});var je=E(J);k(Q.$$.fragment,je),je.forEach(i),xe=w(f),U=b(f,"DIV",{id:!0});var Fe=E(U);k(X.$$.fragment,Fe),Fe.forEach(i),ke=w(f),Y=b(f,"DIV",{id:!0});var We=E(Y);k(Z.$$.fragment,We),We.forEach(i),De=w(f),ee=b(f,"DIV",{id:!0});var qe=E(ee);k(te.$$.fragment,qe),qe.forEach(i),Be=w(f),ne=b(f,"DIV",{id:!0});var Oe=E(ne);k(re.$$.fragment,Oe),Oe.forEach(i),Ie=w(f),oe=b(f,"DIV",{id:!0});var Ge=E(oe);k(le.$$.fragment,Ge),Ge.forEach(i),Se=w(f),ae=b(f,"DIV",{id:!0});var Ke=E(ae);k(ie.$$.fragment,Ke),Ke.forEach(i),Ee=w(f),fe=b(f,"DIV",{id:!0});var Je=E(fe);k(se.$$.fragment,Je),Je.forEach(i),this.h()},h(){S(e,"id","themes"),S(m,"id","variables"),S(u,"id","typography"),S(A,"id","bar"),S(j,"id","cards"),S(W,"id","tiles"),S(me,"id","grid"),S(ue,"id","hero"),S(O,"id","rows-and-columns"),S(J,"id","button"),S(U,"id","checkbox"),S(Y,"id","radio"),S(ee,"id","form-item"),S(ne,"id","tabs"),S(oe,"id","page"),S(ae,"id","split"),S(fe,"id","menu")},m(f,_){d(f,e,_),d(f,t,_),D(o,f,_),d(f,l,_),D(a,f,_),d(f,r,_),d(f,m,_),D(g,m,null),d(f,s,_),d(f,u,_),D($,u,null),d(f,p,_),D(I,f,_),d(f,T,_),d(f,A,_),D(N,A,null),d(f,he,_),d(f,j,_),D(F,j,null),d(f,be,_),d(f,W,_),D(q,W,null),d(f,_e,_),d(f,me,_),d(f,ve,_),d(f,ue,_),d(f,ye,_),d(f,O,_),D(G,O,null),d(f,Ce,_),d(f,K,_),d(f,we,_),d(f,J,_),D(Q,J,null),d(f,xe,_),d(f,U,_),D(X,U,null),d(f,ke,_),d(f,Y,_),D(Z,Y,null),d(f,De,_),d(f,ee,_),D(te,ee,null),d(f,Be,_),d(f,ne,_),D(re,ne,null),d(f,Ie,_),d(f,oe,_),D(le,oe,null),d(f,Se,_),d(f,ae,_),D(ie,ae,null),d(f,Ee,_),d(f,fe,_),D(se,fe,null),Te=!0},p(f,_){const ge={};_&16384&&(ge.$$scope={dirty:_,ctx:f}),a.$set(ge);const de={};_&16384&&(de.$$scope={dirty:_,ctx:f}),I.$set(de)},i(f){Te||(v(o.$$.fragment,f),v(a.$$.fragment,f),v(g.$$.fragment,f),v($.$$.fragment,f),v(I.$$.fragment,f),v(N.$$.fragment,f),v(F.$$.fragment,f),v(q.$$.fragment,f),v(G.$$.fragment,f),v(Q.$$.fragment,f),v(X.$$.fragment,f),v(Z.$$.fragment,f),v(te.$$.fragment,f),v(re.$$.fragment,f),v(le.$$.fragment,f),v(ie.$$.fragment,f),v(se.$$.fragment,f),Te=!0)},o(f){y(o.$$.fragment,f),y(a.$$.fragment,f),y(g.$$.fragment,f),y($.$$.fragment,f),y(I.$$.fragment,f),y(N.$$.fragment,f),y(F.$$.fragment,f),y(q.$$.fragment,f),y(G.$$.fragment,f),y(Q.$$.fragment,f),y(X.$$.fragment,f),y(Z.$$.fragment,f),y(te.$$.fragment,f),y(re.$$.fragment,f),y(le.$$.fragment,f),y(ie.$$.fragment,f),y(se.$$.fragment,f),Te=!1},d(f){f&&(i(e),i(t),i(l),i(r),i(m),i(s),i(u),i(p),i(T),i(A),i(he),i(j),i(be),i(W),i(_e),i(me),i(ve),i(ue),i(ye),i(O),i(Ce),i(K),i(we),i(J),i(xe),i(U),i(ke),i(Y),i(De),i(ee),i(Be),i(ne),i(Ie),i(oe),i(Se),i(ae),i(Ee),i(fe)),B(o,f),B(a,f),B(g),B($),B(I,f),B(N),B(F),B(q),B(G),B(Q),B(X),B(Z),B(te),B(re),B(le),B(ie),B(se)}}}function Cn(c){let e,n,t,o="<em>ContainCSS</em>",l,a;return{c(){e=h("div"),n=C(),t=h("h1"),t.innerHTML=o,l=C(),a=h("div"),this.h()},l(r){e=b(r,"DIV",{class:!0}),E(e).forEach(i),n=w(r),t=b(r,"H1",{"data-svelte-h":!0}),P(t)!=="svelte-1463n1k"&&(t.innerHTML=o),l=w(r),a=b(r,"DIV",{class:!0}),E(a).forEach(i),this.h()},h(){S(e,"class","icon"),S(a,"class","info")},m(r,m){d(r,e,m),d(r,n,m),d(r,t,m),d(r,l,m),d(r,a,m)},p:L,d(r){r&&(i(e),i(n),i(t),i(l),i(a))}}}function wn(c){let e,n,t;return e=new Le({props:{slot:"header",$$slots:{default:[Cn]},$$scope:{ctx:c}}}),{c(){n=h("div"),x(e.$$.fragment),this.h()},l(o){n=b(o,"DIV",{style:!0});var l=E(n);k(e.$$.fragment,l),this.h()},h(){V(n,"display","contents"),V(n,"--bar-border-top","none")},m(o,l){d(o,n,l),D(e,n,null),t=!0},p(o,l){const a={};l&16384&&(a.$$scope={dirty:l,ctx:o}),e.$set(a)},i(o){t||(v(e.$$.fragment,o),t=!0)},o(o){y(e.$$.fragment,o),t=!1},d(o){o&&e&&i(n),B(e,o)}}}function xn(c){let e,n="by Tom Hinkle";return{c(){e=h("a"),e.textContent=n,this.h()},l(t){e=b(t,"A",{href:!0,"data-svelte-h":!0}),P(e)!=="svelte-1l32epw"&&(e.textContent=n),this.h()},h(){S(e,"href","https://tomhinkle.net"),V(e,"color","var(--body-fg)")},m(t,o){d(t,e,o)},p:L,d(t){t&&i(e)}}}function kn(c){let e,n,t;return e=new Le({props:{slot:"footer",height:"1.5em",marginBottom:"0",$$slots:{default:[xn]},$$scope:{ctx:c}}}),{c(){n=h("div"),x(e.$$.fragment),this.h()},l(o){n=b(o,"DIV",{style:!0});var l=E(n);k(e.$$.fragment,l),this.h()},h(){V(n,"display","contents"),V(n,"--bar-justify","flex-end"),V(n,"--bar-border-top","none"),V(n,"--bar-border-bottom","none")},m(o,l){d(o,n,l),D(e,n,null),t=!0},p(o,l){const a={};l&16384&&(a.$$scope={dirty:l,ctx:o}),e.$set(a)},i(o){t||(v(e.$$.fragment,o),t=!0)},o(o){y(e.$$.fragment,o),t=!1},d(o){o&&e&&i(n),B(e,o)}}}function Dn(c){let e,n;return{c(){e=h("a"),n=M(c[11]),this.h()},l(t){e=b(t,"A",{href:!0,target:!0});var o=E(e);n=H(o,c[11]),o.forEach(i),this.h()},h(){S(e,"href",Nt+"/"+c[11]),S(e,"target","_blank")},m(t,o){d(t,e,o),ce(e,n)},p:L,d(t){t&&i(e)}}}function Bn(c){let e,n=R(["Card","RadioButton","Bar"]),t=[];for(let o=0;o<3;o+=1)t[o]=Dn(on(c,n,o));return{c(){for(let o=0;o<3;o+=1)t[o].c();e=z()},l(o){for(let l=0;l<3;l+=1)t[l].l(o);e=z()},m(o,l){for(let a=0;a<3;a+=1)t[a]&&t[a].m(o,l);d(o,e,l)},p:L,d(o){o&&i(e),pe(t,o)}}}function In(c){let e,n="Jump to Component";return{c(){e=h("span"),e.textContent=n,this.h()},l(t){e=b(t,"SPAN",{slot:!0,"data-svelte-h":!0}),P(e)!=="svelte-15vapiz"&&(e.textContent=n),this.h()},h(){S(e,"slot","label")},m(t,o){d(t,e,o)},p:L,d(t){t&&i(e)}}}function Sn(c){let e;return{c(){e=M("Right")},l(n){e=H(n,"Right")},m(n,t){d(n,e,t)},d(n){n&&i(e)}}}function En(c){let e;return{c(){e=M("Left")},l(n){e=H(n,"Left")},m(n,t){d(n,e,t)},d(n){n&&i(e)}}}function Tn(c){let e,n;function t(a,r){return a[1]?En:Sn}let o=t(c),l=o(c);return{c(){e=M(`Move Sidebar to
          `),l.c(),n=z()},l(a){e=H(a,`Move Sidebar to
          `),l.l(a),n=z()},m(a,r){d(a,e,r),l.m(a,r),d(a,n,r)},p(a,r){o!==(o=t(a))&&(l.d(1),l=o(a),l&&(l.c(),l.m(n.parentNode,n)))},d(a){a&&(i(e),i(n)),l.d(a)}}}function lt(c){let e,n,t=c[8].title+"",o,l;return{c(){e=h("li"),n=h("a"),o=M(t),l=C(),this.h()},l(a){e=b(a,"LI",{});var r=E(e);n=b(r,"A",{href:!0});var m=E(n);o=H(m,t),m.forEach(i),l=w(r),r.forEach(i),this.h()},h(){S(n,"href",c[8].url),Xe(n,"active",c[0]===c[8].url)},m(a,r){d(a,e,r),ce(e,n),ce(n,o),ce(e,l)},p(a,r){r&5&&Xe(n,"active",a[0]===a[8].url)},d(a){a&&i(e)}}}function at(c){let e,n=c[5].title+"",t,o,l,a=R(c[5].items),r=[];for(let m=0;m<a.length;m+=1)r[m]=lt(ot(c,a,m));return{c(){e=h("h2"),t=M(n),o=C();for(let m=0;m<r.length;m+=1)r[m].c();l=z()},l(m){e=b(m,"H2",{});var g=E(e);t=H(g,n),g.forEach(i),o=w(m);for(let s=0;s<r.length;s+=1)r[s].l(m);l=z()},m(m,g){d(m,e,g),ce(e,t),d(m,o,g);for(let s=0;s<r.length;s+=1)r[s]&&r[s].m(m,g);d(m,l,g)},p(m,g){if(g&5){a=R(m[5].items);let s;for(s=0;s<a.length;s+=1){const u=ot(m,a,s);r[s]?r[s].p(u,g):(r[s]=lt(u),r[s].c(),r[s].m(l.parentNode,l))}for(;s<r.length;s+=1)r[s].d(1);r.length=a.length}},d(m){m&&(i(e),i(o),i(l)),pe(r,m)}}}function Pn(c){let e,n,t,o,l,a,r,m;n=new Rt({props:{$$slots:{label:[In],default:[Bn]},$$scope:{ctx:c}}}),l=new $e({props:{$$slots:{default:[Tn]},$$scope:{ctx:c}}}),l.$on("click",c[3]);let g=R(c[2]),s=[];for(let u=0;u<g.length;u+=1)s[u]=at(rt(c,g,u));return{c(){e=h("li"),x(n.$$.fragment),t=C(),o=h("li"),x(l.$$.fragment),a=C(),r=h("li");for(let u=0;u<s.length;u+=1)s[u].c()},l(u){e=b(u,"LI",{});var $=E(e);k(n.$$.fragment,$),$.forEach(i),t=w(u),o=b(u,"LI",{});var p=E(o);k(l.$$.fragment,p),p.forEach(i),a=w(u),r=b(u,"LI",{});var I=E(r);for(let T=0;T<s.length;T+=1)s[T].l(I);I.forEach(i)},m(u,$){d(u,e,$),D(n,e,null),d(u,t,$),d(u,o,$),D(l,o,null),d(u,a,$),d(u,r,$);for(let p=0;p<s.length;p+=1)s[p]&&s[p].m(r,null);m=!0},p(u,$){const p={};$&16384&&(p.$$scope={dirty:$,ctx:u}),n.$set(p);const I={};if($&16386&&(I.$$scope={dirty:$,ctx:u}),l.$set(I),$&5){g=R(u[2]);let T;for(T=0;T<g.length;T+=1){const A=rt(u,g,T);s[T]?s[T].p(A,$):(s[T]=at(A),s[T].c(),s[T].m(r,null))}for(;T<s.length;T+=1)s[T].d(1);s.length=g.length}},i(u){m||(v(n.$$.fragment,u),v(l.$$.fragment,u),m=!0)},o(u){y(n.$$.fragment,u),y(l.$$.fragment,u),m=!1},d(u){u&&(i(e),i(t),i(o),i(a),i(r)),B(n),B(l),pe(s,u)}}}function Vn(c){let e,n;return e=new Ct({props:{$$slots:{default:[Pn]},$$scope:{ctx:c}}}),{c(){x(e.$$.fragment)},l(t){k(e.$$.fragment,t)},m(t,o){D(e,t,o),n=!0},p(t,o){const l={};o&16387&&(l.$$scope={dirty:o,ctx:t}),e.$set(l)},i(t){n||(v(e.$$.fragment,t),n=!0)},o(t){y(e.$$.fragment,t),n=!1},d(t){B(e,t)}}}function Mn(c){let e,n;return e=new gt({props:{slot:"sidebar",right:c[1],$$slots:{default:[Vn]},$$scope:{ctx:c}}}),{c(){x(e.$$.fragment)},l(t){k(e.$$.fragment,t)},m(t,o){D(e,t,o),n=!0},p(t,o){const l={};o&2&&(l.right=t[1]),o&16387&&(l.$$scope={dirty:o,ctx:t}),e.$set(l)},i(t){n||(v(e.$$.fragment,t),n=!0)},o(t){y(e.$$.fragment,t),n=!1},d(t){B(e,t)}}}function Hn(c){let e,n,t,o;return e=new Wt({props:{center:!0,bg:"var(--primary-bg)",fg:"var(--primary-fg)",$$slots:{default:[ln]},$$scope:{ctx:c}}}),t=new yt({props:{right:c[1],sticky:!0,$$slots:{sidebar:[Mn],footer:[kn],header:[wn],default:[yn]},$$scope:{ctx:c}}}),{c(){x(e.$$.fragment),n=C(),x(t.$$.fragment)},l(l){k(e.$$.fragment,l),n=w(l),k(t.$$.fragment,l)},m(l,a){D(e,l,a),d(l,n,a),D(t,l,a),o=!0},p(l,[a]){const r={};a&16384&&(r.$$scope={dirty:a,ctx:l}),e.$set(r);const m={};a&2&&(m.right=l[1]),a&16387&&(m.$$scope={dirty:a,ctx:l}),t.$set(m)},i(l){o||(v(e.$$.fragment,l),v(t.$$.fragment,l),o=!0)},o(l){y(e.$$.fragment,l),y(t.$$.fragment,l),o=!1},d(l){l&&i(n),B(e,l),B(t,l)}}}function Ln(c,e,n){let t="";const o=()=>{n(0,t=window.location.hash),console.log("Hash is",t)};it(()=>(o(),window.addEventListener("hashchange",o),()=>{window.removeEventListener("hashchange",o)}));const l=[{title:"Overview",items:[{title:"About",url:"#about"},{title:"Themes",url:"#themes"},{title:"Variables",url:"#variables"},{title:"Typography",url:"#typography"}]},{title:"Controls",items:[{title:"Button",url:"#button"},{title:"Checkbox",url:"#checkbox"},{title:"Radio",url:"#radio"},{title:"Input",url:"#input"},{title:"Select",url:"#select"}]},{title:"Layout Components",items:[{title:"Bar",url:"#bar"},{title:"Cards",url:"#cards"},{title:"Tiles",url:"#tiles"},{title:"Grid",url:"#grid"},{title:"Rows & Columns",url:"#rows-and-columns"},{title:"Page",url:"#page"},{title:"Hero",url:"#hero"}]},{title:"Fancy Stuff",items:[{title:"Tabs",url:"#tabs"},{title:"Sidebar",url:"#sidebar"},{title:"Split Pane",url:"#split"}]}];let a=!1;return[t,a,l,()=>{n(1,a=!a)}]}class mr extends Me{constructor(e){super(),He(this,e,Ln,Hn,Ve,{})}}export{mr as component};
