const __vite__fileDeps=["./CodeInner.BTe9mfQR.js","./scheduler.Cm714ZyC.js","./index.BcN0WdjQ.js","./Row.svelte_svelte_type_style_lang.D-O52OHj.js","../assets/Row.BG8dEj0H.css","../assets/CodeInner.DWIPNwT5.css"],__vite__mapDeps=i=>i.map(i=>__vite__fileDeps[i]);
import{s as Y,m as P,i as v,g as h,U as le,x as _e,e as w,b as z,d as V,k as T,y as J,z as ye,A as ve,B as ke,F as G,G as Q,a5 as Ae,a as W,S as Se,c as j,T as Ie,H as ie,l as F,v as Ce,I as ce,o as X,E as Pe,w as ae,h as Z,n as R,u as fe,p as $,t as ee,j as ne}from"./scheduler.Cm714ZyC.js";import{S as te,i as re,t as p,g as O,b as _,f as K,c as A,a as E,m as S,d as I,e as oe}from"./index.BcN0WdjQ.js";import{i as Te,g as Be,F as q,e as H,C as we}from"./Row.svelte_svelte_type_style_lang.D-O52OHj.js";import{_ as Ee}from"./preload-helper.D6kgxu3v.js";function se(i){let e,o,t;var r=i[3];function c(n,a){return{props:{language:n[2],code:n[0],inline:n[1]}}}return r&&(e=le(r,c(i))),{c(){e&&A(e.$$.fragment),o=P()},l(n){e&&E(e.$$.fragment,n),o=P()},m(n,a){e&&S(e,n,a),v(n,o,a),t=!0},p(n,a){if(a&8&&r!==(r=n[3])){if(e){O();const l=e;_(l.$$.fragment,1,0,()=>{I(l,1)}),K()}r?(e=le(r,c(n)),A(e.$$.fragment),p(e.$$.fragment,1),S(e,o.parentNode,o)):e=null}else if(r){const l={};a&4&&(l.language=n[2]),a&1&&(l.code=n[0]),a&2&&(l.inline=n[1]),e.$set(l)}},i(n){t||(e&&p(e.$$.fragment,n),t=!0)},o(n){e&&_(e.$$.fragment,n),t=!1},d(n){n&&h(o),e&&I(e,n)}}}function xe(i){let e,o,t=i[4]&&i[3]&&se(i);return{c(){t&&t.c(),e=P()},l(r){t&&t.l(r),e=P()},m(r,c){t&&t.m(r,c),v(r,e,c),o=!0},p(r,[c]){r[4]&&r[3]?t?(t.p(r,c),c&8&&p(t,1)):(t=se(r),t.c(),p(t,1),t.m(e.parentNode,e)):t&&(O(),_(t,1,1,()=>{t=null}),K())},i(r){o||(p(t),o=!0)},o(r){_(t),o=!1},d(r){r&&h(e),t&&t.d(r)}}}function Ne(i,e,o){const t=typeof window<"u";let{code:r}=e,{inline:c=!1}=e,{language:n="html"}=e,a=null;return t&&Ee(async()=>{const{default:l}=await import("./CodeInner.BTe9mfQR.js");return{default:l}},__vite__mapDeps([0,1,2,3,4,5]),import.meta.url).then(({default:l})=>{o(3,a=l)}),i.$$set=l=>{"code"in l&&o(0,r=l.code),"inline"in l&&o(1,c=l.inline),"language"in l&&o(2,n=l.language)},[r,c,n,a,t]}class De extends te{constructor(e){super(),re(this,e,Ne,xe,Y,{code:0,inline:1,language:2})}}function Me(i){let e,o;const t=i[11].default,r=_e(t,i,i[10],null);return{c(){e=w("section"),r&&r.c(),this.h()},l(c){e=z(c,"SECTION",{style:!0,class:!0});var n=V(e);r&&r.l(n),n.forEach(h),this.h()},h(){T(e,"style",i[1]),T(e,"class","svelte-baod7t"),J(e,"border",i[0])},m(c,n){v(c,e,n),r&&r.m(e,null),o=!0},p(c,[n]){r&&r.p&&(!o||n&1024)&&ye(r,t,c,c[10],o?ke(t,c[10],n,null):ve(c[10]),null),(!o||n&1)&&J(e,"border",c[0])},i(c){o||(p(r,c),o=!0)},o(c){_(r,c),o=!1},d(c){c&&h(e),r&&r.d(c)}}}function Fe(i,e,o){let{$$slots:t={},$$scope:r}=e,{bg:c=null}=e,{fg:n=null}=e,{margin:a=null}=e,{maxWidth:l=null}=e,{padding:m=null}=e,{height:C=null}=e,{border:b=!1}=e,{paddingTop:y=null}=e,{borderTop:u=null}=e;const f=Te(e,"container",["bg","fg","margin","maxWidth","padding","height","paddingTop","borderTop"]);return i.$$set=s=>{o(12,e=G(G({},e),Q(s))),"bg"in s&&o(2,c=s.bg),"fg"in s&&o(3,n=s.fg),"margin"in s&&o(4,a=s.margin),"maxWidth"in s&&o(5,l=s.maxWidth),"padding"in s&&o(6,m=s.padding),"height"in s&&o(7,C=s.height),"border"in s&&o(0,b=s.border),"paddingTop"in s&&o(8,y=s.paddingTop),"borderTop"in s&&o(9,u=s.borderTop),"$$scope"in s&&o(10,r=s.$$scope)},e=Q(e),[b,f,c,n,a,l,m,C,y,u,r,t]}class hn extends te{constructor(e){super(),re(this,e,Fe,Me,Y,{bg:2,fg:3,margin:4,maxWidth:5,padding:6,height:7,border:0,paddingTop:8,borderTop:9})}}function Le(i){let e,o,t,r,c,n,a,l,m,C,b,y,u,f,s,x=[{__value:i[1]},{type:"radio"},i[4]],B={};for(let g=0;g<x.length;g+=1)B=G(B,x[g]);const N=i[11].default,d=_e(N,i,i[10],null);return u=Ae(i[13][0]),{c(){e=w("div"),o=w("label"),t=w("input"),r=W(),c=w("span"),d&&d.c(),n=W(),a=w("label"),l=w("input"),m=W(),C=w("span"),b=new Se(!1),this.h()},l(g){e=z(g,"DIV",{class:!0});var k=V(e);o=z(k,"LABEL",{class:!0});var L=V(o);t=z(L,"INPUT",{type:!0}),r=j(L),c=z(L,"SPAN",{class:!0});var D=V(c);d&&d.l(D),D.forEach(h),L.forEach(h),n=j(k),a=z(k,"LABEL",{class:!0});var U=V(a);l=z(U,"INPUT",{type:!0,class:!0}),m=j(U),C=z(U,"SPAN",{class:!0});var M=V(C);b=Ie(M,!1),M.forEach(h),U.forEach(h),k.forEach(h),this.h()},h(){ie(t,B),J(t,"svelte-1lc4f6v",!0),T(c,"class","svelte-1lc4f6v"),T(o,"class","radio-item svelte-1lc4f6v"),T(l,"type","radio"),l.checked="true",T(l,"class","svelte-1lc4f6v"),b.a=null,T(C,"class","svelte-1lc4f6v"),T(a,"class","invisible svelte-1lc4f6v"),T(e,"class","label-sizing-box svelte-1lc4f6v"),u.p(t)},m(g,k){v(g,e,k),F(e,o),F(o,t),t.autofocus&&t.focus(),t.checked=t.__value===i[0],F(o,r),F(o,c),d&&d.m(c,null),i[14](c),F(e,n),F(e,a),F(a,l),F(a,m),F(a,C),b.m(i[3],C),y=!0,f||(s=Ce(t,"change",i[12]),f=!0)},p(g,[k]){ie(t,B=Be(x,[(!y||k&2)&&{__value:g[1]},{type:"radio"},k&16&&g[4]])),k&1&&(t.checked=t.__value===g[0]),J(t,"svelte-1lc4f6v",!0),d&&d.p&&(!y||k&1024)&&ye(d,N,g,g[10],y?ke(N,g[10],k,null):ve(g[10]),null),(!y||k&8)&&b.p(g[3])},i(g){y||(p(d,g),y=!0)},o(g){_(d,g),y=!1},d(g){g&&h(e),d&&d.d(g),i[14](null),u.r(),f=!1,s()}}}function We(i,e,o){const t=["group","value","bg","fg","padding","width","height"];let r=ce(e,t),{$$slots:c={},$$scope:n}=e,{group:a}=e,{value:l}=e,{bg:m=null}=e,{fg:C=null}=e,{padding:b=null}=e,{width:y=null}=e,{height:u=null}=e;Te(e,"radio-button",["bg","fg","padding","width","height"]);let f,s;const x=[[]];function B(){a=this.__value,o(0,a)}function N(d){X[d?"unshift":"push"](()=>{f=d,o(2,f)})}return i.$$set=d=>{o(16,e=G(G({},e),Q(d))),o(4,r=ce(e,t)),"group"in d&&o(0,a=d.group),"value"in d&&o(1,l=d.value),"bg"in d&&o(5,m=d.bg),"fg"in d&&o(6,C=d.fg),"padding"in d&&o(7,b=d.padding),"width"in d&&o(8,y=d.width),"height"in d&&o(9,u=d.height),"$$scope"in d&&o(10,n=d.$$scope)},i.$$.update=()=>{i.$$.dirty&4&&f&&o(3,s=f.innerHTML)},e=Q(e),[a,l,f,s,r,m,C,b,y,u,n,c,B,x,N]}class ze extends te{constructor(e){super(),re(this,e,We,Le,Y,{group:0,value:1,bg:5,fg:6,padding:7,width:8,height:9})}}const je=`:root {
  --fg: var(--material-color-grey-900);
  --bg: var(--material-color-purple-100);
  --container-bg: var(--material-color-purple-50);
  --container-fg: var(--material-color-grey-900);
  --primary-bg: var(--material-color-purple-500);
  --primary-fg: var(--material-color-grey-100);
  --secondary-bg: var(--material-color-purple-200);
  --secondary-fg: var(--material-color-purple-800);
  --shadow-color: #7773;
  --border-color: var(--material-color-purple-200);
  --link-fg: green;
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
`,Ue=`:root {
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
`,Ve=`@import url("https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;0,1000;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900;1,1000&Inconsolata:wght@300&display=swap");

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
`,Re=`@import url("https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400&family=IBM+Plex+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&family=IBM+Plex+Serif:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&family=Inconsolata:wght@300&family=Nunito:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;0,1000;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900;1,1000&display=swap");

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
`,He=`/* light mode */
@media (prefers-color-scheme: light) {
  /* light mode */

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
}
/* dark mode */
@media (prefers-color-scheme: dark) {
  :root {
    --fg: var(--material-color-grey-100);
    --bg: var(--material-color-grey-800);
    --body-bg: var(--material-color-grey-800);
    --body-fg: var(--material-color-grey-100);
    --container-bg: var(--material-color-grey-900);
    --container-fg: var(--material-color-grey-100);
    --primary-bg: var(--material-color-light-blue-500);
    --primary-fg: var(--material-color-grey-100);
    --warning-fg: var(--material-color-white);
    --warning-bg: var(--material-color-red-800);
    --secondary-bg: var(--material-color-grey-300);
    --secondary-fg: var(--material-color-grey-900);
    --hover-filter: brightness(1.1) contrast(1.5);
  }
}
`,Oe=`/* light mode */

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
`,Ke=`:root {
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
`,qe=`:root {
  /* Colors */
  --primary-bg: #007bff;
  --primary-fg: #ffffff;
  --secondary-bg: #6c757d;
  --secondary-fg: #ffffff;
  --success-bg: #28a745;
  --success-fg: #ffffff;
  --danger-bg: #dc3545;
  --danger-fg: #ffffff;
  --warning-bg: #ffc107;
  --warning-fg: #212529;
  --info-bg: #17a2b8;
  --info-fg: #ffffff;
  --bg: #f8f9fa;
  --fg: #212529;
  --dark-bg: #343a40;
  --dark-fg: #ffffff;
  --menu-bg: var(--bg);

  --body-bg: #ffffff;
  --body-fg: #212529;
  --border: 1px solid #dee2e6;
  --border-color: #dee2e6;
  --button-border: none;
  --hover-transform: none;
  --hover-filter: none;
  --button-hover-filter: brightness(0.9);

  --button-active-filter: brightness(0.9);
  --active-transform: none;
  --transition: 0.15s ease-in-out;

  /* Typography */
  --font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol";
  --font-size: 1rem;
  --line-height: 1.5;
  --heading-line-height: 1.2;
  --bold: 700;
  --normal: 400;
  --ui-font-weight: 400;

  /* Code */
  --code-font-family: "Courier New", Courier, monospace;
  --code-font-size: 1rem;
  --code-bg: #f8f9fa;
  --code-fg: #212529;
  --code-comment-fg: #6c757d;
  --code-string-fg: #28a745;
  --code-keyword-fg: #007bff;
  --code-attr-name-fg: #e83e8c;
  --code-tag-fg: #dc3545;
  --code-function-fg: #17a2b8;
  --code-variable-fg: #e83e8c;
  --code-operator-fg: #dc3545;
  --code-prolog-fg: #6c757d;
  --code-doctype-fg: #6c757d;
  --code-cdata-fg: #6c757d;

  /* Spacing */
  --gap: 1rem; /* Using 1rem as a base gap */
  --padding: 1rem; /* Using 1rem for padding */
  --control-padding: 0.375rem 0.75rem;
  --input-padding: 0.375rem 0.75rem;
  --bar-margin-bottom: 1rem;

  /* Layout */
  --bar-height: 3em;
  --bar-align: center;
  --bar-justify: space-between;
  --bar-max-height: auto;
  --bar-min-height: auto;

  /* Misc */
  --border-radius: 0.25rem;
  --border-style: solid;
  --border-width: 1px;

  --checkbox-radius: 0.25em;
  --checkbox-check-mark: "✔";
  --checkbox-check-size: 0.75em;
  --checkbox-left-offset: 0.25em;
}
`,Ge=`@media screen and (max-width: 800px) {
  :root {
    --font-size: 14px;
    --text-size: var(--font-size);
    --ui-size: var(--font-size);
    font-size: var(--font-size);
  }
}
@media screen and (min-width: 800px) and (max-width: 1200px) {
  :root {
    --font-size: 18px;
    --text-size: var(--font-size);
    --ui-size: var(--font-size);
    font-size: var(--font-size);
  }
}

@media screen and (min-width: 1200px) {
  :root {
    --font-size: 20px;
    --text-size: var(--font-size);
    --ui-size: var(--font-size);
    font-size: var(--font-size);
  }
}
`,Xe=`:root {
  --border-radius: 0;
}
`,Je=`:root {
  --first-line-font-variant: small-caps;
  --first-letter-font-weight: bold;
  --first-letter-fg: var(--primary-bg);
}
`;function ge(i,e,o){const t=i.slice();return t[17]=e[o],t[18]=e,t[19]=o,t}function de(i,e,o){const t=i.slice();return t[17]=e[o],t[19]=o,t}function me(i,e,o){const t=i.slice();return t[17]=e[o],t[19]=o,t}function Qe(i){let e=i[17].name+"",o;return{c(){o=ee(e)},l(t){o=ne(t,e)},m(t,r){v(t,o,r)},p:R,d(t){t&&h(o)}}}function ue(i){let e,o,t;function r(n){i[9](n)}let c={value:i[19],$$slots:{default:[Qe]},$$scope:{ctx:i}};return i[2]!==void 0&&(c.group=i[2]),e=new ze({props:c}),X.push(()=>oe(e,"group",r)),{c(){A(e.$$.fragment)},l(n){E(e.$$.fragment,n)},m(n,a){S(e,n,a),t=!0},p(n,a){const l={};a&4194304&&(l.$$scope={dirty:a,ctx:n}),!o&&a&4&&(o=!0,l.group=n[2],$(()=>o=!1)),e.$set(l)},i(n){t||(p(e.$$.fragment,n),t=!0)},o(n){_(e.$$.fragment,n),t=!1},d(n){I(e,n)}}}function Ye(i){let e,o,t=H(i[6]),r=[];for(let n=0;n<t.length;n+=1)r[n]=ue(me(i,t,n));const c=n=>_(r[n],1,1,()=>{r[n]=null});return{c(){for(let n=0;n<r.length;n+=1)r[n].c();e=P()},l(n){for(let a=0;a<r.length;a+=1)r[a].l(n);e=P()},m(n,a){for(let l=0;l<r.length;l+=1)r[l]&&r[l].m(n,a);v(n,e,a),o=!0},p(n,a){if(a&68){t=H(n[6]);let l;for(l=0;l<t.length;l+=1){const m=me(n,t,l);r[l]?(r[l].p(m,a),p(r[l],1)):(r[l]=ue(m),r[l].c(),p(r[l],1),r[l].m(e.parentNode,e))}for(O(),l=t.length;l<r.length;l+=1)c(l);K()}},i(n){if(!o){for(let a=0;a<t.length;a+=1)p(r[a]);o=!0}},o(n){r=r.filter(Boolean);for(let a=0;a<r.length;a+=1)_(r[a]);o=!1},d(n){n&&h(e),ae(r,n)}}}function Ze(i){let e,o="Typography:";return{c(){e=w("span"),e.textContent=o,this.h()},l(t){e=z(t,"SPAN",{slot:!0,"data-svelte-h":!0}),Z(e)!=="svelte-35k3zk"&&(e.textContent=o),this.h()},h(){T(e,"slot","label")},m(t,r){v(t,e,r)},p:R,d(t){t&&h(e)}}}function $e(i){let e=i[17].name+"",o;return{c(){o=ee(e)},l(t){o=ne(t,e)},m(t,r){v(t,o,r)},p:R,d(t){t&&h(o)}}}function pe(i){let e,o,t;function r(n){i[10](n)}let c={value:i[19],$$slots:{default:[$e]},$$scope:{ctx:i}};return i[3]!==void 0&&(c.group=i[3]),e=new ze({props:c}),X.push(()=>oe(e,"group",r)),{c(){A(e.$$.fragment)},l(n){E(e.$$.fragment,n)},m(n,a){S(e,n,a),t=!0},p(n,a){const l={};a&4194304&&(l.$$scope={dirty:a,ctx:n}),!o&&a&8&&(o=!0,l.group=n[3],$(()=>o=!1)),e.$set(l)},i(n){t||(p(e.$$.fragment,n),t=!0)},o(n){_(e.$$.fragment,n),t=!1},d(n){I(e,n)}}}function en(i){let e,o,t=H(i[7]),r=[];for(let n=0;n<t.length;n+=1)r[n]=pe(de(i,t,n));const c=n=>_(r[n],1,1,()=>{r[n]=null});return{c(){for(let n=0;n<r.length;n+=1)r[n].c();e=P()},l(n){for(let a=0;a<r.length;a+=1)r[a].l(n);e=P()},m(n,a){for(let l=0;l<r.length;l+=1)r[l]&&r[l].m(n,a);v(n,e,a),o=!0},p(n,a){if(a&136){t=H(n[7]);let l;for(l=0;l<t.length;l+=1){const m=de(n,t,l);r[l]?(r[l].p(m,a),p(r[l],1)):(r[l]=pe(m),r[l].c(),p(r[l],1),r[l].m(e.parentNode,e))}for(O(),l=t.length;l<r.length;l+=1)c(l);K()}},i(n){if(!o){for(let a=0;a<t.length;a+=1)p(r[a]);o=!0}},o(n){r=r.filter(Boolean);for(let a=0;a<r.length;a+=1)_(r[a]);o=!1},d(n){n&&h(e),ae(r,n)}}}function nn(i){let e,o="Color";return{c(){e=w("span"),e.textContent=o,this.h()},l(t){e=z(t,"SPAN",{slot:!0,"data-svelte-h":!0}),Z(e)!=="svelte-1ecy0bi"&&(e.textContent=o),this.h()},h(){T(e,"slot","label")},m(t,r){v(t,e,r)},p:R,d(t){t&&h(e)}}}function tn(i){let e=i[17].name+"",o;return{c(){o=ee(e)},l(t){o=ne(t,e)},m(t,r){v(t,o,r)},p:R,d(t){t&&h(o)}}}function he(i){let e,o,t;function r(n){i[11](n,i[19])}let c={$$slots:{default:[tn]},$$scope:{ctx:i}};return i[0][i[19]]!==void 0&&(c.checked=i[0][i[19]]),e=new we({props:c}),X.push(()=>oe(e,"checked",r)),{c(){A(e.$$.fragment)},l(n){E(e.$$.fragment,n)},m(n,a){S(e,n,a),t=!0},p(n,a){i=n;const l={};a&4194304&&(l.$$scope={dirty:a,ctx:i}),!o&&a&1&&(o=!0,l.checked=i[0][i[19]],$(()=>o=!1)),e.$set(l)},i(n){t||(p(e.$$.fragment,n),t=!0)},o(n){_(e.$$.fragment,n),t=!1},d(n){I(e,n)}}}function rn(i){let e,o,t=H(i[8]),r=[];for(let n=0;n<t.length;n+=1)r[n]=he(ge(i,t,n));const c=n=>_(r[n],1,1,()=>{r[n]=null});return{c(){for(let n=0;n<r.length;n+=1)r[n].c();e=P()},l(n){for(let a=0;a<r.length;a+=1)r[a].l(n);e=P()},m(n,a){for(let l=0;l<r.length;l+=1)r[l]&&r[l].m(n,a);v(n,e,a),o=!0},p(n,a){if(a&257){t=H(n[8]);let l;for(l=0;l<t.length;l+=1){const m=ge(n,t,l);r[l]?(r[l].p(m,a),p(r[l],1)):(r[l]=he(m),r[l].c(),p(r[l],1),r[l].m(e.parentNode,e))}for(O(),l=t.length;l<r.length;l+=1)c(l);K()}},i(n){if(!o){for(let a=0;a<t.length;a+=1)p(r[a]);o=!0}},o(n){r=r.filter(Boolean);for(let a=0;a<r.length;a+=1)_(r[a]);o=!1},d(n){n&&h(e),ae(r,n)}}}function on(i){let e,o="Extra Settings";return{c(){e=w("span"),e.textContent=o,this.h()},l(t){e=z(t,"SPAN",{slot:!0,"data-svelte-h":!0}),Z(e)!=="svelte-1lv401c"&&(e.textContent=o),this.h()},h(){T(e,"slot","label")},m(t,r){v(t,e,r)},p:R,d(t){t&&h(e)}}}function an(i){let e,o,t;return{c(){e=w("textarea"),this.h()},l(r){e=z(r,"TEXTAREA",{placeholder:!0}),V(e).forEach(h),this.h()},h(){T(e,"placeholder","--bg : red;")},m(r,c){v(r,e,c),fe(e,i[1]),o||(t=Ce(e,"input",i[12]),o=!0)},p(r,c){c&2&&fe(e,r[1])},d(r){r&&h(e),o=!1,t()}}}function ln(i){let e,o="Extra Variables";return{c(){e=w("span"),e.textContent=o,this.h()},l(t){e=z(t,"SPAN",{slot:!0,"data-svelte-h":!0}),Z(e)!=="svelte-1ucp5y"&&(e.textContent=o),this.h()},h(){T(e,"slot","label")},m(t,r){v(t,e,r)},p:R,d(t){t&&h(e)}}}function cn(i){let e;return{c(){e=ee("Show code")},l(o){e=ne(o,"Show code")},m(o,t){v(o,e,t)},d(o){o&&h(e)}}}function fn(i){let e,o,t;function r(n){i[13](n)}let c={$$slots:{default:[cn]},$$scope:{ctx:i}};return i[5]!==void 0&&(c.checked=i[5]),e=new we({props:c}),X.push(()=>oe(e,"checked",r)),{c(){A(e.$$.fragment)},l(n){E(e.$$.fragment,n)},m(n,a){S(e,n,a),t=!0},p(n,a){const l={};a&4194304&&(l.$$scope={dirty:a,ctx:n}),!o&&a&32&&(o=!0,l.checked=n[5],$(()=>o=!1)),e.$set(l)},i(n){t||(p(e.$$.fragment,n),t=!0)},o(n){_(e.$$.fragment,n),t=!1},d(n){I(e,n)}}}function be(i){let e,o;return e=new De({props:{code:i[4],language:"html"}}),{c(){A(e.$$.fragment)},l(t){E(e.$$.fragment,t)},m(t,r){S(e,t,r),o=!0},p(t,r){const c={};r&16&&(c.code=t[4]),e.$set(c)},i(t){o||(p(e.$$.fragment,t),o=!0)},o(t){_(e.$$.fragment,t),o=!1},d(t){I(e,t)}}}function sn(i){let e,o,t,r,c,n,a,l,m,C,b,y;e=new q({props:{fullWidth:!0,$$slots:{label:[Ze],default:[Ye]},$$scope:{ctx:i}}}),t=new q({props:{fullWidth:!0,$$slots:{label:[nn],default:[en]},$$scope:{ctx:i}}}),c=new q({props:{fullWidth:!0,$$slots:{label:[on],default:[rn]},$$scope:{ctx:i}}}),a=new q({props:{$$slots:{label:[ln],default:[an]},$$scope:{ctx:i}}}),m=new q({props:{fullWidth:!0,$$slots:{default:[fn]},$$scope:{ctx:i}}});let u=i[5]&&be(i);return{c(){A(e.$$.fragment),o=W(),A(t.$$.fragment),r=W(),A(c.$$.fragment),n=W(),A(a.$$.fragment),l=W(),A(m.$$.fragment),C=W(),u&&u.c(),b=P()},l(f){E(e.$$.fragment,f),o=j(f),E(t.$$.fragment,f),r=j(f),E(c.$$.fragment,f),n=j(f),E(a.$$.fragment,f),l=j(f),E(m.$$.fragment,f),C=j(f),u&&u.l(f),b=P()},m(f,s){S(e,f,s),v(f,o,s),S(t,f,s),v(f,r,s),S(c,f,s),v(f,n,s),S(a,f,s),v(f,l,s),S(m,f,s),v(f,C,s),u&&u.m(f,s),v(f,b,s),y=!0},p(f,[s]){const x={};s&4194308&&(x.$$scope={dirty:s,ctx:f}),e.$set(x);const B={};s&4194312&&(B.$$scope={dirty:s,ctx:f}),t.$set(B);const N={};s&4194305&&(N.$$scope={dirty:s,ctx:f}),c.$set(N);const d={};s&4194306&&(d.$$scope={dirty:s,ctx:f}),a.$set(d);const g={};s&4194336&&(g.$$scope={dirty:s,ctx:f}),m.$set(g),f[5]?u?(u.p(f,s),s&32&&p(u,1)):(u=be(f),u.c(),p(u,1),u.m(b.parentNode,b)):u&&(O(),_(u,1,1,()=>{u=null}),K())},i(f){y||(p(e.$$.fragment,f),p(t.$$.fragment,f),p(c.$$.fragment,f),p(a.$$.fragment,f),p(m.$$.fragment,f),p(u),y=!0)},o(f){_(e.$$.fragment,f),_(t.$$.fragment,f),_(c.$$.fragment,f),_(a.$$.fragment,f),_(m.$$.fragment,f),_(u),y=!1},d(f){f&&(h(o),h(r),h(n),h(l),h(C),h(b)),I(e,f),I(t,f),I(c,f),I(a,f),I(m,f),u&&u.d(f)}}}function gn(i,e,o){let t=[{name:"Defaults",css:"",file:""},{name:"Browser Defaults",css:Ue,file:"themes/typography-browser.css"},{name:"Airy",css:Ve,file:"themes/typography-airy.css",startsActive:!0},{name:"IBM Plex",css:Re,file:"themes/typography-carbon.css"}],r=[{name:"Purple",css:je,file:"themes/purple.css"},{name:"Light",css:Oe,file:"themes/light.css"},{name:"Dark",css:Ke,file:"themes/dark.css"},{name:"Light or Dark (Responsive)",css:He,startsActive:!0,file:"themes/lightordark.css"},{name:"Defaults",css:"",file:""}],c=[{name:"Responsive Typography",css:Ge,file:"responsive-typography.css"},{name:"Sharp Edges",css:Xe,file:"boxy.css"},{name:"Fancy Paragraphs",css:Je,file:"fancy-paragraphs.css"},{name:"Bootstrap Clone",css:qe,file:"themes/bootstrap.css"}],n={0:!1,1:!1},a="",l=t.findIndex(g=>g.startsActive),m=r.findIndex(g=>g.startsActive),C=!1;Pe(()=>{C=!0,b("typography",t[l].css),b("color",r[m].css)});function b(g,k){if(!C)return;let L=`${g}-injected-style`,D=document.getElementById(L);D||(D=document.createElement("style"),D.id=L,document.head.appendChild(D)),D.innerHTML=k}function y(...g){let D=`<script>
  ${["defaults.css",...g.map(M=>M&&M.file).filter(M=>M)].map(M=>`	import "contain-css-svelte/vars/${M}";`).join(`
`)}
  <\/script>`,U="";return a&&(U=`

<style>
:root {
  ${a.replace(`
`,`
	`)}
}
</style>`),D+U}let u=y(),f=!1;function s(g){l=g,o(2,l)}function x(g){m=g,o(3,m)}function B(g,k){i.$$.not_equal(n[k],g)&&(n[k]=g,o(0,n))}function N(){a=this.value,o(1,a)}function d(g){f=g,o(5,f)}return i.$$.update=()=>{if(i.$$.dirty&4&&b("typography",t[l].css),i.$$.dirty&8&&b("color",r[m].css),i.$$.dirty&2&&b("extra-raw",`:root { ${a} }`),i.$$.dirty&1)for(let g=0;g<c.length;g++)n[g]?b(`extra-${g}`,c[g].css):b(`extra-${g}`,"");i.$$.dirty&15&&o(4,u=y(a,t[l],r[m],...c.map((g,k)=>n[k]?g:null).filter(g=>g)))},[n,a,l,m,u,f,t,r,c,s,x,B,N,d]}class bn extends te{constructor(e){super(),re(this,e,gn,sn,Y,{})}}export{hn as C,ze as R,bn as T,De as a};
