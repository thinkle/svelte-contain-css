import{s as ee,e as C,b as T,d as L,g as h,j as z,G as oe,i as $,q as be,a2 as _e,a as S,P as ve,c as x,Q as ye,y as K,k as N,z as de,u as $e,r as ke,v as we,E as ae,F as le,m as q,l as F,D as ze,h as O,A as te,n as U,o as G,t as Q,p as X}from"./scheduler.Dl5NE-ua.js";import{S as ne,i as re,c as A,a as I,m as E,t as v,b as k,d as D,g as J,f as Y,e as Z}from"./index.DmIGNg4y.js";import{b as Ce,i as Te,F as W,e as H,a as pe}from"./RadioButton.svelte_svelte_type_style_lang.CXn-1AjS.js";function Pe(l){let e,o,t;return o=new Ce({props:{language:l[2],source:l[0]}}),{c(){e=C("div"),A(o.$$.fragment),this.h()},l(s){e=T(s,"DIV",{class:!0});var f=L(e);I(o.$$.fragment,f),f.forEach(h),this.h()},h(){z(e,"class","code svelte-t87b14"),oe(e,"inline",l[1])},m(s,f){$(s,e,f),E(o,e,null),t=!0},p(s,[f]){const r={};f&4&&(r.language=s[2]),f&1&&(r.source=s[0]),o.$set(r),(!t||f&2)&&oe(e,"inline",s[1])},i(s){t||(v(o.$$.fragment,s),t=!0)},o(s){k(o.$$.fragment,s),t=!1},d(s){s&&h(e),D(o)}}}function Be(l,e,o){let{code:t}=e,{inline:s=!1}=e,{language:f="html"}=e;return l.$$set=r=>{"code"in r&&o(0,t=r.code),"inline"in r&&o(1,s=r.inline),"language"in r&&o(2,f=r.language)},[t,s,f]}class Se extends ne{constructor(e){super(),re(this,e,Be,Pe,ee,{code:0,inline:1,language:2})}}function xe(l){let e,o,t,s=!1,f,r,n,u,a,c,i,_,d,g,p,M;const b=l[10].default,w=be(b,l,l[9],null);return g=_e(l[12][0]),{c(){e=C("div"),o=C("label"),t=C("input"),f=S(),r=C("span"),w&&w.c(),n=S(),u=C("label"),a=C("input"),c=S(),i=C("span"),_=new ve(!1),this.h()},l(y){e=T(y,"DIV",{class:!0});var m=L(e);o=T(m,"LABEL",{class:!0});var P=L(o);t=T(P,"INPUT",{type:!0,class:!0}),f=x(P),r=T(P,"SPAN",{class:!0});var V=L(r);w&&w.l(V),V.forEach(h),P.forEach(h),n=x(m),u=T(m,"LABEL",{class:!0});var B=L(u);a=T(B,"INPUT",{type:!0,class:!0}),c=x(B),i=T(B,"SPAN",{class:!0});var R=L(i);_=ye(R,!1),R.forEach(h),B.forEach(h),m.forEach(h),this.h()},h(){t.__value=l[1],K(t,t.__value),z(t,"type","radio"),z(t,"class","svelte-frvvw3"),z(r,"class","svelte-frvvw3"),z(o,"class","radio-item svelte-frvvw3"),z(a,"type","radio"),a.checked="true",z(a,"class","svelte-frvvw3"),_.a=null,z(i,"class","svelte-frvvw3"),z(u,"class","invisible svelte-frvvw3"),z(e,"class","label-sizing-box svelte-frvvw3"),g.p(t)},m(y,m){$(y,e,m),N(e,o),N(o,t),t.checked=t.__value===l[0],N(o,f),N(o,r),w&&w.m(r,null),l[13](r),N(e,n),N(e,u),N(u,a),N(u,c),N(u,i),_.m(l[3],i),d=!0,p||(M=de(t,"change",l[11]),p=!0)},p(y,[m]){(!d||m&2)&&(t.__value=y[1],K(t,t.__value),s=!0),(s||m&1)&&(t.checked=t.__value===y[0]),w&&w.p&&(!d||m&512)&&$e(w,b,y,y[9],d?we(b,y[9],m,null):ke(y[9]),null),(!d||m&8)&&_.p(y[3])},i(y){d||(v(w,y),d=!0)},o(y){k(w,y),d=!1},d(y){y&&h(e),w&&w.d(y),l[13](null),g.r(),p=!1,M()}}}function Ae(l,e,o){let{$$slots:t={},$$scope:s}=e,{group:f}=e,{value:r}=e,{bg:n=null}=e,{fg:u=null}=e,{padding:a=null}=e,{width:c=null}=e,{height:i=null}=e;Te(e,"radio-button",["bg","fg","padding","width","height"]);let _,d;const g=[[]];function p(){f=this.__value,o(0,f)}function M(b){q[b?"unshift":"push"](()=>{_=b,o(2,_)})}return l.$$set=b=>{o(15,e=ae(ae({},e),le(b))),"group"in b&&o(0,f=b.group),"value"in b&&o(1,r=b.value),"bg"in b&&o(4,n=b.bg),"fg"in b&&o(5,u=b.fg),"padding"in b&&o(6,a=b.padding),"width"in b&&o(7,c=b.width),"height"in b&&o(8,i=b.height),"$$scope"in b&&o(9,s=b.$$scope)},l.$$.update=()=>{l.$$.dirty&4&&_&&o(3,d=_.innerHTML)},e=le(e),[f,r,_,d,n,u,a,c,i,s,t,p,g,M]}class he extends ne{constructor(e){super(),re(this,e,Ae,xe,ee,{group:0,value:1,bg:4,fg:5,padding:6,width:7,height:8})}}const Ie=`:root {
  --fg: var(--material-color-grey-900);
  --bg: var(--material-color-purple-100);
  --container-bg: #ffefff;
  --container-fg: var(--material-color-grey-900);
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
`,Ee=`:root {
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
`,De=`@import url("https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;0,1000;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900;1,1000&Inconsolata:wght@300&display=swap");

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
`,Me=`@import url("https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400&family=IBM+Plex+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&family=IBM+Plex+Serif:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&family=Inconsolata:wght@300&family=Nunito:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;0,1000;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900;1,1000&display=swap");

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
`,Ne=`/* light mode */
@media (prefers-color-scheme: light) {
  @import url("./light.css");
}
/* dark mode */
@media (prefers-color-scheme: dark) {
  @import url("./dark.css");
}
`,Fe=`/* light mode */

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
`,Le=`:root {
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
`,Ve=`@media screen and (max-width: 800px) {
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
`,je=`:root {
  --border-radius: 0;
}
`,He=`:root {
  --first-line-font-variant: small-caps;
  --first-letter-font-weight: bold;
  --first-letter-fg: var(--primary-bg);
}
`;function ie(l,e,o){const t=l.slice();return t[17]=e[o],t[18]=e,t[19]=o,t}function se(l,e,o){const t=l.slice();return t[17]=e[o],t[19]=o,t}function ce(l,e,o){const t=l.slice();return t[17]=e[o],t[19]=o,t}function Re(l){let e=l[17].name+"",o;return{c(){o=Q(e)},l(t){o=X(t,e)},m(t,s){$(t,o,s)},p:U,d(t){t&&h(o)}}}function fe(l){let e,o,t;function s(r){l[9](r)}let f={value:l[19],$$slots:{default:[Re]},$$scope:{ctx:l}};return l[2]!==void 0&&(f.group=l[2]),e=new he({props:f}),q.push(()=>Z(e,"group",s)),{c(){A(e.$$.fragment)},l(r){I(e.$$.fragment,r)},m(r,n){E(e,r,n),t=!0},p(r,n){const u={};n&4194304&&(u.$$scope={dirty:n,ctx:r}),!o&&n&4&&(o=!0,u.group=r[2],G(()=>o=!1)),e.$set(u)},i(r){t||(v(e.$$.fragment,r),t=!0)},o(r){k(e.$$.fragment,r),t=!1},d(r){D(e,r)}}}function We(l){let e,o="Typography:",t,s,f,r=H(l[6]),n=[];for(let a=0;a<r.length;a+=1)n[a]=fe(ce(l,r,a));const u=a=>k(n[a],1,1,()=>{n[a]=null});return{c(){e=C("span"),e.textContent=o,t=S();for(let a=0;a<n.length;a+=1)n[a].c();s=F(),this.h()},l(a){e=T(a,"SPAN",{class:!0,"data-svelte-h":!0}),O(e)!=="svelte-17rsjr4"&&(e.textContent=o),t=x(a);for(let c=0;c<n.length;c+=1)n[c].l(a);s=F(),this.h()},h(){z(e,"class","label")},m(a,c){$(a,e,c),$(a,t,c);for(let i=0;i<n.length;i+=1)n[i]&&n[i].m(a,c);$(a,s,c),f=!0},p(a,c){if(c&68){r=H(a[6]);let i;for(i=0;i<r.length;i+=1){const _=ce(a,r,i);n[i]?(n[i].p(_,c),v(n[i],1)):(n[i]=fe(_),n[i].c(),v(n[i],1),n[i].m(s.parentNode,s))}for(J(),i=r.length;i<n.length;i+=1)u(i);Y()}},i(a){if(!f){for(let c=0;c<r.length;c+=1)v(n[c]);f=!0}},o(a){n=n.filter(Boolean);for(let c=0;c<n.length;c+=1)k(n[c]);f=!1},d(a){a&&(h(e),h(t),h(s)),te(n,a)}}}function qe(l){let e=l[17].name+"",o;return{c(){o=Q(e)},l(t){o=X(t,e)},m(t,s){$(t,o,s)},p:U,d(t){t&&h(o)}}}function ge(l){let e,o,t;function s(r){l[10](r)}let f={value:l[19],$$slots:{default:[qe]},$$scope:{ctx:l}};return l[3]!==void 0&&(f.group=l[3]),e=new he({props:f}),q.push(()=>Z(e,"group",s)),{c(){A(e.$$.fragment)},l(r){I(e.$$.fragment,r)},m(r,n){E(e,r,n),t=!0},p(r,n){const u={};n&4194304&&(u.$$scope={dirty:n,ctx:r}),!o&&n&8&&(o=!0,u.group=r[3],G(()=>o=!1)),e.$set(u)},i(r){t||(v(e.$$.fragment,r),t=!0)},o(r){k(e.$$.fragment,r),t=!1},d(r){D(e,r)}}}function Ke(l){let e,o="Color",t,s,f,r=H(l[7]),n=[];for(let a=0;a<r.length;a+=1)n[a]=ge(se(l,r,a));const u=a=>k(n[a],1,1,()=>{n[a]=null});return{c(){e=C("span"),e.textContent=o,t=S();for(let a=0;a<n.length;a+=1)n[a].c();s=F(),this.h()},l(a){e=T(a,"SPAN",{class:!0,"data-svelte-h":!0}),O(e)!=="svelte-1nez6i6"&&(e.textContent=o),t=x(a);for(let c=0;c<n.length;c+=1)n[c].l(a);s=F(),this.h()},h(){z(e,"class","label")},m(a,c){$(a,e,c),$(a,t,c);for(let i=0;i<n.length;i+=1)n[i]&&n[i].m(a,c);$(a,s,c),f=!0},p(a,c){if(c&136){r=H(a[7]);let i;for(i=0;i<r.length;i+=1){const _=se(a,r,i);n[i]?(n[i].p(_,c),v(n[i],1)):(n[i]=ge(_),n[i].c(),v(n[i],1),n[i].m(s.parentNode,s))}for(J(),i=r.length;i<n.length;i+=1)u(i);Y()}},i(a){if(!f){for(let c=0;c<r.length;c+=1)v(n[c]);f=!0}},o(a){n=n.filter(Boolean);for(let c=0;c<n.length;c+=1)k(n[c]);f=!1},d(a){a&&(h(e),h(t),h(s)),te(n,a)}}}function Oe(l){let e=l[17].name+"",o;return{c(){o=Q(e)},l(t){o=X(t,e)},m(t,s){$(t,o,s)},p:U,d(t){t&&h(o)}}}function ue(l){let e,o,t;function s(r){l[11](r,l[19])}let f={$$slots:{default:[Oe]},$$scope:{ctx:l}};return l[0][l[19]]!==void 0&&(f.checked=l[0][l[19]]),e=new pe({props:f}),q.push(()=>Z(e,"checked",s)),{c(){A(e.$$.fragment)},l(r){I(e.$$.fragment,r)},m(r,n){E(e,r,n),t=!0},p(r,n){l=r;const u={};n&4194304&&(u.$$scope={dirty:n,ctx:l}),!o&&n&1&&(o=!0,u.checked=l[0][l[19]],G(()=>o=!1)),e.$set(u)},i(r){t||(v(e.$$.fragment,r),t=!0)},o(r){k(e.$$.fragment,r),t=!1},d(r){D(e,r)}}}function Ue(l){let e,o="Extra Settings",t,s,f,r=H(l[8]),n=[];for(let a=0;a<r.length;a+=1)n[a]=ue(ie(l,r,a));const u=a=>k(n[a],1,1,()=>{n[a]=null});return{c(){e=C("h3"),e.textContent=o,t=S();for(let a=0;a<n.length;a+=1)n[a].c();s=F(),this.h()},l(a){e=T(a,"H3",{class:!0,"data-svelte-h":!0}),O(e)!=="svelte-1sn85o2"&&(e.textContent=o),t=x(a);for(let c=0;c<n.length;c+=1)n[c].l(a);s=F(),this.h()},h(){z(e,"class","label")},m(a,c){$(a,e,c),$(a,t,c);for(let i=0;i<n.length;i+=1)n[i]&&n[i].m(a,c);$(a,s,c),f=!0},p(a,c){if(c&257){r=H(a[8]);let i;for(i=0;i<r.length;i+=1){const _=ie(a,r,i);n[i]?(n[i].p(_,c),v(n[i],1)):(n[i]=ue(_),n[i].c(),v(n[i],1),n[i].m(s.parentNode,s))}for(J(),i=r.length;i<n.length;i+=1)u(i);Y()}},i(a){if(!f){for(let c=0;c<r.length;c+=1)v(n[c]);f=!0}},o(a){n=n.filter(Boolean);for(let c=0;c<n.length;c+=1)k(n[c]);f=!1},d(a){a&&(h(e),h(t),h(s)),te(n,a)}}}function Ge(l){let e,o,t;return{c(){e=C("textarea"),this.h()},l(s){e=T(s,"TEXTAREA",{placeholder:!0}),L(e).forEach(h),this.h()},h(){z(e,"placeholder","--bg : red;")},m(s,f){$(s,e,f),K(e,l[1]),o||(t=de(e,"input",l[12]),o=!0)},p(s,f){f&2&&K(e,s[1])},d(s){s&&h(e),o=!1,t()}}}function Qe(l){let e,o="Extra Variables";return{c(){e=C("span"),e.textContent=o,this.h()},l(t){e=T(t,"SPAN",{slot:!0,"data-svelte-h":!0}),O(e)!=="svelte-1ucp5y"&&(e.textContent=o),this.h()},h(){z(e,"slot","label")},m(t,s){$(t,e,s)},p:U,d(t){t&&h(e)}}}function Xe(l){let e;return{c(){e=Q("Show code")},l(o){e=X(o,"Show code")},m(o,t){$(o,e,t)},d(o){o&&h(e)}}}function Je(l){let e,o,t;function s(r){l[13](r)}let f={$$slots:{default:[Xe]},$$scope:{ctx:l}};return l[5]!==void 0&&(f.checked=l[5]),e=new pe({props:f}),q.push(()=>Z(e,"checked",s)),{c(){A(e.$$.fragment)},l(r){I(e.$$.fragment,r)},m(r,n){E(e,r,n),t=!0},p(r,n){const u={};n&4194304&&(u.$$scope={dirty:n,ctx:r}),!o&&n&32&&(o=!0,u.checked=r[5],G(()=>o=!1)),e.$set(u)},i(r){t||(v(e.$$.fragment,r),t=!0)},o(r){k(e.$$.fragment,r),t=!1},d(r){D(e,r)}}}function me(l){let e,o;return e=new Se({props:{code:l[4],language:"html"}}),{c(){A(e.$$.fragment)},l(t){I(e.$$.fragment,t)},m(t,s){E(e,t,s),o=!0},p(t,s){const f={};s&16&&(f.code=t[4]),e.$set(f)},i(t){o||(v(e.$$.fragment,t),o=!0)},o(t){k(e.$$.fragment,t),o=!1},d(t){D(e,t)}}}function Ye(l){let e,o,t,s,f,r,n,u,a,c,i,_;e=new W({props:{fullWidth:!0,$$slots:{default:[We]},$$scope:{ctx:l}}}),t=new W({props:{fullWidth:!0,$$slots:{default:[Ke]},$$scope:{ctx:l}}}),f=new W({props:{fullWidth:!0,$$slots:{default:[Ue]},$$scope:{ctx:l}}}),n=new W({props:{$$slots:{label:[Qe],default:[Ge]},$$scope:{ctx:l}}}),a=new W({props:{fullWidth:!0,$$slots:{default:[Je]},$$scope:{ctx:l}}});let d=l[5]&&me(l);return{c(){A(e.$$.fragment),o=S(),A(t.$$.fragment),s=S(),A(f.$$.fragment),r=S(),A(n.$$.fragment),u=S(),A(a.$$.fragment),c=S(),d&&d.c(),i=F()},l(g){I(e.$$.fragment,g),o=x(g),I(t.$$.fragment,g),s=x(g),I(f.$$.fragment,g),r=x(g),I(n.$$.fragment,g),u=x(g),I(a.$$.fragment,g),c=x(g),d&&d.l(g),i=F()},m(g,p){E(e,g,p),$(g,o,p),E(t,g,p),$(g,s,p),E(f,g,p),$(g,r,p),E(n,g,p),$(g,u,p),E(a,g,p),$(g,c,p),d&&d.m(g,p),$(g,i,p),_=!0},p(g,[p]){const M={};p&4194308&&(M.$$scope={dirty:p,ctx:g}),e.$set(M);const b={};p&4194312&&(b.$$scope={dirty:p,ctx:g}),t.$set(b);const w={};p&4194305&&(w.$$scope={dirty:p,ctx:g}),f.$set(w);const y={};p&4194306&&(y.$$scope={dirty:p,ctx:g}),n.$set(y);const m={};p&4194336&&(m.$$scope={dirty:p,ctx:g}),a.$set(m),g[5]?d?(d.p(g,p),p&32&&v(d,1)):(d=me(g),d.c(),v(d,1),d.m(i.parentNode,i)):d&&(J(),k(d,1,1,()=>{d=null}),Y())},i(g){_||(v(e.$$.fragment,g),v(t.$$.fragment,g),v(f.$$.fragment,g),v(n.$$.fragment,g),v(a.$$.fragment,g),v(d),_=!0)},o(g){k(e.$$.fragment,g),k(t.$$.fragment,g),k(f.$$.fragment,g),k(n.$$.fragment,g),k(a.$$.fragment,g),k(d),_=!1},d(g){g&&(h(o),h(s),h(r),h(u),h(c),h(i)),D(e,g),D(t,g),D(f,g),D(n,g),D(a,g),d&&d.d(g)}}}function Ze(l,e,o){let t=[{name:"Defaults",css:"",file:""},{name:"Browser Defaults",css:Ee,file:"themes/typography-browser.css"},{name:"Airy",css:De,file:"themes/typography-airy.css"},{name:"IBM Plex",css:Me,file:"themes/typography-carbon.css"}],s=[{name:"Purple",css:Ie,file:"themes/purple.css"},{name:"Light",css:Fe,file:"themes/light.css"},{name:"Dark",css:Le,file:"themes/dark.css"},{name:"Light or Dark (Responsive)",css:Ne,file:"themes/lightordark.css"},{name:"Defaults",css:"",file:""}],f=[{name:"Responsive Typography",css:Ve,file:""},{name:"Sharp Edges",css:je,file:"boxy.css"},{name:"Fancy Paragraphs",css:He,file:"fancy-paragraphs.css"}],r={0:!1,1:!1},n="",u=0,a=0,c=!1;ze(()=>{c=!0});function i(m,P){if(!c)return;let V=`${m}-injected-style`,B=document.getElementById(V);B||(B=document.createElement("style"),B.id=V,document.head.appendChild(B)),B.innerHTML=P}function _(...m){let B=`<script>
  ${["defaults.css",...m.map(j=>j&&j.file).filter(j=>j)].map(j=>`	import "contain-css-svelte/vars/${j}";`).join(`
`)}
  <\/script>`,R="";return n&&(R=`

<style>
:root {
  ${n.replace(`
`,`
	`)}
}
</style>`),B+R}let d=_(),g=!1;function p(m){u=m,o(2,u)}function M(m){a=m,o(3,a)}function b(m,P){l.$$.not_equal(r[P],m)&&(r[P]=m,o(0,r))}function w(){n=this.value,o(1,n)}function y(m){g=m,o(5,g)}return l.$$.update=()=>{if(l.$$.dirty&4&&i("typography",t[u].css),l.$$.dirty&8&&i("color",s[a].css),l.$$.dirty&2&&i("extra-raw",`:root { ${n} }`),l.$$.dirty&1)for(let m=0;m<f.length;m++)r[m]?i(`extra-${m}`,f[m].css):i(`extra-${m}`,"");l.$$.dirty&15&&o(4,d=_(n,t[u],s[a],...f.map((m,P)=>r[P]?m:null).filter(m=>m)))},[r,n,u,a,d,g,t,s,f,p,M,b,w,y]}class rt extends ne{constructor(e){super(),re(this,e,Ze,Ye,ee,{})}}export{Se as C,he as R,rt as T};
