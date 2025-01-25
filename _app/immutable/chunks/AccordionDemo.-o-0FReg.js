import{s as L,a as h,c as _,i as l,d as u,e as $,b as c,g as d,n as C}from"./scheduler.B4k77XW6.js";import{S as H,i as A,c as g,a as T,m as y,t as v,b,d as x}from"./index.B0zWIIln.js";import"./Row.svelte_svelte_type_style_lang.BEVlC6u5.js";import{A as M}from"./CssWrapper.jCgY1oy6.js";import{C as w}from"./Table.svelte_svelte_type_style_lang.B-COgJMS.js";import{T as q}from"./TextLayout.CCmn5D3A.js";import{a as D}from"./cssVariableDefs.DjFuqEom.js";import{C as S}from"./CssVariableDemo.C2fIJJqB.js";function G(f){let t,r="Our Accordion is simply some styling around the native <details> element.",s,n,a=`By default, we are in &quot;Highlander&quot; mode 
        (<em>there can be only one</em> item open at a time), but you can turn that 
        off by setting the highlanderMode prop to false.`;return{c(){t=$("p"),t.textContent=r,s=h(),n=$("p"),n.innerHTML=a},l(i){t=c(i,"P",{"data-svelte-h":!0}),d(t)!=="svelte-64es5m"&&(t.textContent=r),s=_(i),n=c(i,"P",{"data-svelte-h":!0}),d(n)!=="svelte-9qo8hq"&&(n.innerHTML=a)},m(i,e){l(i,t,e),l(i,s,e),l(i,n,e)},p:C,d(i){i&&(u(t),u(s),u(n))}}}function E(f){let t,r="<summary>Hello</summary> <h2>Thing 1</h2> <p>This is the first thing</p>",s,n,a="<summary>Goodbye</summary> <h2>Thing 2</h2> <p>This is the second thing</p>",i,e,m="<summary>Goodnight</summary> <h2>Thing 3</h2> <p>This is the third thing</p>";return{c(){t=$("details"),t.innerHTML=r,s=h(),n=$("details"),n.innerHTML=a,i=h(),e=$("details"),e.innerHTML=m},l(o){t=c(o,"DETAILS",{"data-svelte-h":!0}),d(t)!=="svelte-msuc1v"&&(t.innerHTML=r),s=_(o),n=c(o,"DETAILS",{"data-svelte-h":!0}),d(n)!=="svelte-w4nvul"&&(n.innerHTML=a),i=_(o),e=c(o,"DETAILS",{"data-svelte-h":!0}),d(e)!=="svelte-i3mk3b"&&(e.innerHTML=m)},m(o,p){l(o,t,p),l(o,s,p),l(o,n,p),l(o,i,p),l(o,e,p)},p:C,d(o){o&&(u(t),u(s),u(n),u(i),u(e))}}}function I(f){let t,r,s,n,a,i;return t=new q({props:{$$slots:{default:[G]},$$scope:{ctx:f}}}),s=new M({props:{$$slots:{default:[E]},$$scope:{ctx:f}}}),a=new w({props:{code:`<Accordion>
    <details>
        <summary>Hello</summary>
        <h2>Thing 1</h2>
        <p>This is the first thing</p>
    </details>
    <details>
        <summary>Goodbye</summary>
        <h2>Thing 2</h2>
        <p>This is the second thing</p>
    </details>
    <details>
        <summary>Goodnight</summary>
        <h2>Thing 3</h2>
        <p>This is the third thing</p>
    </details>
</Accordion>`}}),{c(){g(t.$$.fragment),r=h(),g(s.$$.fragment),n=h(),g(a.$$.fragment)},l(e){T(t.$$.fragment,e),r=_(e),T(s.$$.fragment,e),n=_(e),T(a.$$.fragment,e)},m(e,m){y(t,e,m),l(e,r,m),y(s,e,m),l(e,n,m),y(a,e,m),i=!0},p(e,m){const o={};m&1&&(o.$$scope={dirty:m,ctx:e}),t.$set(o);const p={};m&1&&(p.$$scope={dirty:m,ctx:e}),s.$set(p)},i(e){i||(v(t.$$.fragment,e),v(s.$$.fragment,e),v(a.$$.fragment,e),i=!0)},o(e){b(t.$$.fragment,e),b(s.$$.fragment,e),b(a.$$.fragment,e),i=!1},d(e){e&&(u(r),u(n)),x(t,e),x(s,e),x(a,e)}}}function P(f){let t,r;return t=new S({props:{variables:D,$$slots:{default:[I]},$$scope:{ctx:f}}}),{c(){g(t.$$.fragment)},l(s){T(t.$$.fragment,s)},m(s,n){y(t,s,n),r=!0},p(s,[n]){const a={};n&1&&(a.$$scope={dirty:n,ctx:s}),t.$set(a)},i(s){r||(v(t.$$.fragment,s),r=!0)},o(s){b(t.$$.fragment,s),r=!1},d(s){x(t,s)}}}function V(f){return[]}class N extends H{constructor(t){super(),A(this,t,V,P,L,{})}}export{N as default};
