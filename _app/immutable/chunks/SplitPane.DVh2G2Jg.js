import{s as Y,x as P,e as R,a as k,b as C,d as B,g as b,c as Z,k as _,i as x,l as I,v as V,z as A,A as N,B as T,D as $,E as tt,F as X,G as U,o as L}from"./scheduler.Cm714ZyC.js";import{S as et,i as it,t as j,b as q}from"./index.BcN0WdjQ.js";import{i as nt}from"./Row.svelte_svelte_type_style_lang.D-O52OHj.js";import"./Columns.svelte_svelte_type_style_lang.BK64ZyYD.js";const st=i=>({}),F=i=>({}),lt=i=>({}),G=i=>({});function ot(i){let n,o,W,d,v,f,w,a,c,m;const E=i[11].left,l=P(E,i,i[10],G),g=i[11].right,s=P(g,i,i[10],F);return{c(){n=R("div"),o=R("div"),l&&l.c(),W=k(),d=R("div"),v=k(),f=R("div"),s&&s.c(),this.h()},l(e){n=C(e,"DIV",{class:!0,style:!0});var r=B(n);o=C(r,"DIV",{class:!0});var z=B(o);l&&l.l(z),z.forEach(b),W=Z(r),d=C(r,"DIV",{class:!0,tabindex:!0,"aria-role":!0}),B(d).forEach(b),v=Z(r),f=C(r,"DIV",{class:!0});var p=B(f);s&&s.l(p),p.forEach(b),r.forEach(b),this.h()},h(){_(o,"class","left svelte-1uz9w48"),_(d,"class","resizer svelte-1uz9w48"),_(d,"tabindex","0"),_(d,"aria-role","resizer"),_(f,"class","right svelte-1uz9w48"),_(n,"class","split-pane svelte-1uz9w48"),_(n,"style",w=i[5]+i[0])},m(e,r){x(e,n,r),I(n,o),l&&l.m(o,null),i[12](o),I(n,W),I(n,d),i[13](d),I(n,v),I(n,f),s&&s.m(f,null),i[14](f),i[15](n),a=!0,c||(m=[V(d,"mousedown",i[6]),V(d,"keydown",i[7])],c=!0)},p(e,[r]){l&&l.p&&(!a||r&1024)&&A(l,E,e,e[10],a?T(E,e[10],r,lt):N(e[10]),G),s&&s.p&&(!a||r&1024)&&A(s,g,e,e[10],a?T(g,e[10],r,st):N(e[10]),F),(!a||r&1&&w!==(w=e[5]+e[0]))&&_(n,"style",w)},i(e){a||(j(l,e),j(s,e),a=!0)},o(e){q(l,e),q(s,e),a=!1},d(e){e&&b(n),l&&l.d(e),i[12](null),i[13](null),s&&s.d(e),i[14](null),i[15](null),c=!1,$(m)}}}function rt(i,n,o){let{$$slots:W={},$$scope:d}=n,{leftWidth:v="1fr"}=n,{rightWidth:f="1fr"}=n;const w=nt(n,"split-pane",["bg","fg","border","height","leftWidth","rightWidth"]);let a="",c,m,E,l,g,s,e;function r(t){E=t.clientX,c=s.getBoundingClientRect().width,m=e.getBoundingClientRect().width,document.addEventListener("mousemove",z),document.addEventListener("mouseup",M)}function z(t){const u=t.clientX-E,S=c+u,h=m-u;p(S,h)}function p(t,u){if(t<32||u<32)return;let h=l.getBoundingClientRect().width,y=g.getBoundingClientRect().width;t+u+y>h&&(u=h-t-y),o(0,a=`grid-template-columns: ${t}px 8px ${u}px`)}function M(){document.removeEventListener("mousemove",z),document.removeEventListener("mouseup",M)}function K(t){if(t.key==="ArrowLeft"||t.key==="ArrowRight"){const S=t.key==="ArrowLeft"?-10:10;c=s.getBoundingClientRect().width,m=e.getBoundingClientRect().width;let h=c+S,y=m-S;p(h,y)}}function D(){if(!a)return;const t=s.getBoundingClientRect().width,u=e.getBoundingClientRect().width;let h=l.getBoundingClientRect().width-t-u;p(t+h/2,u+h/2)}tt(()=>(window&&window.addEventListener("resize",D),()=>window.removeEventListener("resize",D)));function H(t){L[t?"unshift":"push"](()=>{s=t,o(3,s)})}function J(t){L[t?"unshift":"push"](()=>{g=t,o(2,g)})}function O(t){L[t?"unshift":"push"](()=>{e=t,o(4,e)})}function Q(t){L[t?"unshift":"push"](()=>{l=t,o(1,l)})}return i.$$set=t=>{o(23,n=X(X({},n),U(t))),"leftWidth"in t&&o(8,v=t.leftWidth),"rightWidth"in t&&o(9,f=t.rightWidth),"$$scope"in t&&o(10,d=t.$$scope)},n=U(n),[a,l,g,s,e,w,r,K,v,f,d,W,H,J,O,Q]}class ht extends et{constructor(n){super(),it(this,n,rt,ot,Y,{leftWidth:8,rightWidth:9})}}export{ht as S};
