import{s as S,e as _,t as d,a as x,b as f,d as g,j as h,g as u,c as j,i as m,l as v,u as $,n as E,N as q}from"../chunks/scheduler.DVOaE9AW.js";import{S as y,i as C}from"../chunks/index.BJQOvXO9.js";import{s as H}from"../chunks/entry.BJRhfgzO.js";const N=()=>{const s=H;return{page:{subscribe:s.page.subscribe},navigating:{subscribe:s.navigating.subscribe},updated:s.updated}},P={subscribe(s){return N().page.subscribe(s)}};function k(s){var b;let t,r=s[0].status+"",o,n,i,c=((b=s[0].error)==null?void 0:b.message)+"",l;return{c(){t=_("h1"),o=d(r),n=x(),i=_("p"),l=d(c)},l(e){t=f(e,"H1",{});var a=g(t);o=h(a,r),a.forEach(u),n=j(e),i=f(e,"P",{});var p=g(i);l=h(p,c),p.forEach(u)},m(e,a){m(e,t,a),v(t,o),m(e,n,a),m(e,i,a),v(i,l)},p(e,[a]){var p;a&1&&r!==(r=e[0].status+"")&&$(o,r),a&1&&c!==(c=((p=e[0].error)==null?void 0:p.message)+"")&&$(l,c)},i:E,o:E,d(e){e&&(u(t),u(n),u(i))}}}function w(s,t,r){let o;return q(s,P,n=>r(0,o=n)),[o]}let D=class extends y{constructor(t){super(),C(this,t,w,k,S,{})}};export{D as component};
