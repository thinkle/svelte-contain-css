import{s as y,e as c,a as p,b as _,g as d,c as r,i as f,d as $,t as X,j as Y,n as Z}from"./scheduler.B4k77XW6.js";import{S as ee,i as te,c as b,a as D,m as k,t as h,b as M,d as w}from"./index.B0zWIIln.js";import{B as R}from"./Button.2RcnFZ8j.js";import{a as le,C as ne}from"./Table.svelte_svelte_type_style_lang.B-COgJMS.js";import{C as oe,D as U}from"./CssVariableDemo.C2fIJJqB.js";import{T as ae}from"./TextLayout.CCmn5D3A.js";import{d as se}from"./cssVariableDefs.DjFuqEom.js";function fe(i){let t;return{c(){t=X("Open Modal Dialog")},l(o){t=Y(o,"Open Modal Dialog")},m(o,l){f(o,t,l)},d(o){o&&$(t)}}}function $e(i){let t,o="Modal Dialog",l,n,m=`A modal dialog will display centered over the content and block the
          rest of the page.`;return{c(){t=c("h3"),t.textContent=o,l=p(),n=c("p"),n.textContent=m},l(s){t=_(s,"H3",{"data-svelte-h":!0}),d(t)!=="svelte-yvi4rz"&&(t.textContent=o),l=r(s),n=_(s,"P",{"data-svelte-h":!0}),d(n)!=="svelte-zx9e3m"&&(n.textContent=m)},m(s,u){f(s,t,u),f(s,l,u),f(s,n,u)},p:Z,d(s){s&&($(t),$(l),$(n))}}}function ie(i){let t;return{c(){t=X("Open Non-Modal Dialog")},l(o){t=Y(o,"Open Non-Modal Dialog")},m(o,l){f(o,t,l)},d(o){o&&$(t)}}}function me(i){let t,o="Non-Modal Dialog",l,n,m=`A non-modal dialog will display like a dialog, but will not block the
          rest of the page.`;return{c(){t=c("h3"),t.textContent=o,l=p(),n=c("p"),n.textContent=m},l(s){t=_(s,"H3",{"data-svelte-h":!0}),d(t)!=="svelte-a506q5"&&(t.textContent=o),l=r(s),n=_(s,"P",{"data-svelte-h":!0}),d(n)!=="svelte-ayutxr"&&(n.textContent=m)},m(s,u){f(s,t,u),f(s,l,u),f(s,n,u)},p:Z,d(s){s&&($(t),$(l),$(n))}}}function ue(i){let t,o="Dialogs",l,n,m=`We use the new HTML dialog element in our dialog components for
        simplicity sake.`,s,u,E="Modal Dialogs",P,O,F=`A modal dialog is <em>not</em> &quot;light dismissable&quot; but must be explicitly
        closed.`,T,g,A,v,B,H,L,q,G="Non-Modal Dialog",N,I,J=`A non-modal dialog looks like a dialog, but displays like any other
        block element.`,j,C,z,x,S;return g=new R({props:{$$slots:{default:[fe]},$$scope:{ctx:i}}}),g.$on("click",i[2]),v=new U({props:{modal:!0,onClose:i[3],open:i[0],$$slots:{default:[$e]},$$scope:{ctx:i}}}),H=new ne({props:{language:"svelte",code:`
<Button 
  on:click={() => (modalIsOpen = !modalIsOpen)}
  >
  Open Modal Dialog
</Button>    
<Dialog
  modal={true}
  onClose={() => (modalIsOpen = false)}
  open={modalIsOpen}
>
  ...content
</Dialog>
`}}),C=new R({props:{$$slots:{default:[ie]},$$scope:{ctx:i}}}),C.$on("click",i[4]),x=new U({props:{modal:!1,onClose:i[5],open:i[1],$$slots:{default:[me]},$$scope:{ctx:i}}}),{c(){t=c("h2"),t.textContent=o,l=p(),n=c("p"),n.textContent=m,s=p(),u=c("h3"),u.textContent=E,P=p(),O=c("p"),O.innerHTML=F,T=p(),b(g.$$.fragment),A=p(),b(v.$$.fragment),B=p(),b(H.$$.fragment),L=p(),q=c("h3"),q.textContent=G,N=p(),I=c("p"),I.textContent=J,j=p(),b(C.$$.fragment),z=p(),b(x.$$.fragment)},l(e){t=_(e,"H2",{"data-svelte-h":!0}),d(t)!=="svelte-v2nl8d"&&(t.textContent=o),l=r(e),n=_(e,"P",{"data-svelte-h":!0}),d(n)!=="svelte-au8vqm"&&(n.textContent=m),s=r(e),u=_(e,"H3",{"data-svelte-h":!0}),d(u)!=="svelte-adq9na"&&(u.textContent=E),P=r(e),O=_(e,"P",{"data-svelte-h":!0}),d(O)!=="svelte-17prcgu"&&(O.innerHTML=F),T=r(e),D(g.$$.fragment,e),A=r(e),D(v.$$.fragment,e),B=r(e),D(H.$$.fragment,e),L=r(e),q=_(e,"H3",{"data-svelte-h":!0}),d(q)!=="svelte-a506q5"&&(q.textContent=G),N=r(e),I=_(e,"P",{"data-svelte-h":!0}),d(I)!=="svelte-844pjs"&&(I.textContent=J),j=r(e),D(C.$$.fragment,e),z=r(e),D(x.$$.fragment,e)},m(e,a){f(e,t,a),f(e,l,a),f(e,n,a),f(e,s,a),f(e,u,a),f(e,P,a),f(e,O,a),f(e,T,a),k(g,e,a),f(e,A,a),k(v,e,a),f(e,B,a),k(H,e,a),f(e,L,a),f(e,q,a),f(e,N,a),f(e,I,a),f(e,j,a),k(C,e,a),f(e,z,a),k(x,e,a),S=!0},p(e,a){const K={};a&64&&(K.$$scope={dirty:a,ctx:e}),g.$set(K);const V={};a&1&&(V.onClose=e[3]),a&1&&(V.open=e[0]),a&64&&(V.$$scope={dirty:a,ctx:e}),v.$set(V);const Q={};a&64&&(Q.$$scope={dirty:a,ctx:e}),C.$set(Q);const W={};a&2&&(W.onClose=e[5]),a&2&&(W.open=e[1]),a&64&&(W.$$scope={dirty:a,ctx:e}),x.$set(W)},i(e){S||(h(g.$$.fragment,e),h(v.$$.fragment,e),h(H.$$.fragment,e),h(C.$$.fragment,e),h(x.$$.fragment,e),S=!0)},o(e){M(g.$$.fragment,e),M(v.$$.fragment,e),M(H.$$.fragment,e),M(C.$$.fragment,e),M(x.$$.fragment,e),S=!1},d(e){e&&($(t),$(l),$(n),$(s),$(u),$(P),$(O),$(T),$(A),$(B),$(L),$(q),$(N),$(I),$(j),$(z)),w(g,e),w(v,e),w(H,e),w(C,e),w(x,e)}}}function pe(i){let t,o;return t=new ae({props:{$$slots:{default:[ue]},$$scope:{ctx:i}}}),{c(){b(t.$$.fragment)},l(l){D(t.$$.fragment,l)},m(l,n){k(t,l,n),o=!0},p(l,n){const m={};n&67&&(m.$$scope={dirty:n,ctx:l}),t.$set(m)},i(l){o||(h(t.$$.fragment,l),o=!0)},o(l){M(t.$$.fragment,l),o=!1},d(l){w(t,l)}}}function re(i){let t,o;return t=new oe({props:{variables:se,$$slots:{default:[pe]},$$scope:{ctx:i}}}),{c(){b(t.$$.fragment)},l(l){D(t.$$.fragment,l)},m(l,n){k(t,l,n),o=!0},p(l,n){const m={};n&67&&(m.$$scope={dirty:n,ctx:l}),t.$set(m)},i(l){o||(h(t.$$.fragment,l),o=!0)},o(l){M(t.$$.fragment,l),o=!1},d(l){w(t,l)}}}function ce(i){let t,o;return t=new le({props:{$$slots:{default:[re]},$$scope:{ctx:i}}}),{c(){b(t.$$.fragment)},l(l){D(t.$$.fragment,l)},m(l,n){k(t,l,n),o=!0},p(l,[n]){const m={};n&67&&(m.$$scope={dirty:n,ctx:l}),t.$set(m)},i(l){o||(h(t.$$.fragment,l),o=!0)},o(l){M(t.$$.fragment,l),o=!1},d(l){w(t,l)}}}function _e(i,t,o){let l=!1,n=!1;return[l,n,()=>o(0,l=!l),()=>o(0,l=!1),()=>o(1,n=!n),()=>o(1,n=!1)]}class ke extends ee{constructor(t){super(),te(this,t,_e,ce,y,{})}}export{ke as default};
