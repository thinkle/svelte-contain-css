var z=Object.defineProperty;var B=(t,e,n)=>e in t?z(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var f=(t,e,n)=>B(t,typeof e!="symbol"?e+"":e,n);function I(){}const ut=t=>t;function W(t,e){for(const n in e)t[n]=e[n];return t}function q(t){return t()}function ft(){return Object.create(null)}function R(t){t.forEach(q)}function _t(t){return typeof t=="function"}function dt(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}function ht(t){return Object.keys(t).length===0}function F(t,...e){if(t==null){for(const i of e)i(void 0);return I}const n=t.subscribe(...e);return n.unsubscribe?()=>n.unsubscribe():n}function pt(t,e,n){t.$$.on_destroy.push(F(e,n))}function mt(t,e,n,i){if(t){const s=j(t,e,n,i);return t[0](s)}}function j(t,e,n,i){return t[1]&&i?W(n.ctx.slice(),t[1](i(e))):n.ctx}function yt(t,e,n,i){if(t[2]&&i){const s=t[2](i(n));if(e.dirty===void 0)return s;if(typeof s=="object"){const c=[],r=Math.max(e.dirty.length,s.length);for(let l=0;l<r;l+=1)c[l]=e.dirty[l]|s[l];return c}return e.dirty|s}return e.dirty}function bt(t,e,n,i,s,c){if(s){const r=j(e,n,i,c);t.p(r,s)}}function gt(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let i=0;i<n;i++)e[i]=-1;return e}return-1}function xt(t){const e={};for(const n in t)n[0]!=="$"&&(e[n]=t[n]);return e}function wt(t,e){const n={};e=new Set(e);for(const i in t)!e.has(i)&&i[0]!=="$"&&(n[i]=t[i]);return n}function vt(t){const e={};for(const n in t)e[n]=!0;return e}function Et(t){const e=typeof t=="string"&&t.match(/^\s*(-?[\d.]+)([^\s]*)\s*$/);return e?[parseFloat(e[1]),e[2]||"px"]:[t,"px"]}let b=!1;function Nt(){b=!0}function Tt(){b=!1}function G(t,e,n,i){for(;t<e;){const s=t+(e-t>>1);n(s)<=i?t=s+1:e=s}return t}function U(t){if(t.hydrate_init)return;t.hydrate_init=!0;let e=t.childNodes;if(t.nodeName==="HEAD"){const o=[];for(let a=0;a<e.length;a++){const u=e[a];u.claim_order!==void 0&&o.push(u)}e=o}const n=new Int32Array(e.length+1),i=new Int32Array(e.length);n[0]=-1;let s=0;for(let o=0;o<e.length;o++){const a=e[o].claim_order,u=(s>0&&e[n[s]].claim_order<=a?s+1:G(1,s,D=>e[n[D]].claim_order,a))-1;i[o]=n[u]+1;const A=u+1;n[A]=o,s=Math.max(A,s)}const c=[],r=[];let l=e.length-1;for(let o=n[s]+1;o!=0;o=i[o-1]){for(c.push(e[o-1]);l>=o;l--)r.push(e[l]);l--}for(;l>=0;l--)r.push(e[l]);c.reverse(),r.sort((o,a)=>o.claim_order-a.claim_order);for(let o=0,a=0;o<r.length;o++){for(;a<c.length&&r[o].claim_order>=c[a].claim_order;)a++;const u=a<c.length?c[a]:null;t.insertBefore(r[o],u)}}function C(t,e){t.appendChild(e)}function J(t){if(!t)return document;const e=t.getRootNode?t.getRootNode():t.ownerDocument;return e&&e.host?e:t.ownerDocument}function kt(t){const e=g("style");return e.textContent="/* empty */",K(J(t),e),e.sheet}function K(t,e){return C(t.head||t,e),e.sheet}function Q(t,e){if(b){for(U(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentNode!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;e!==t.actual_end_child?(e.claim_order!==void 0||e.parentNode!==t)&&t.insertBefore(e,t.actual_end_child):t.actual_end_child=e.nextSibling}else(e.parentNode!==t||e.nextSibling!==null)&&t.appendChild(e)}function V(t,e,n){t.insertBefore(e,n||null)}function X(t,e,n){b&&!n?Q(t,e):(e.parentNode!==t||e.nextSibling!=n)&&t.insertBefore(e,n||null)}function m(t){t.parentNode&&t.parentNode.removeChild(t)}function At(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function g(t){return document.createElement(t)}function Y(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function T(t){return document.createTextNode(t)}function Mt(){return T(" ")}function St(){return T("")}function M(t,e,n,i){return t.addEventListener(e,n,i),()=>t.removeEventListener(e,n,i)}function Z(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}const $=["width","height"];function Lt(t,e){const n=Object.getOwnPropertyDescriptors(t.__proto__);for(const i in e)e[i]==null?t.removeAttribute(i):i==="style"?t.style.cssText=e[i]:i==="__value"?t.value=t[i]=e[i]:n[i]&&n[i].set&&$.indexOf(i)===-1?t[i]=e[i]:Z(t,i,e[i])}function jt(t){return t.dataset.svelteH}function Ct(t){let e;return{p(...n){e=n,e.forEach(i=>t.push(i))},r(){e.forEach(n=>t.splice(t.indexOf(n),1))}}}function Ht(t){return t===""?null:+t}function Ot(t){return Array.from(t.childNodes)}function H(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function O(t,e,n,i,s=!1){H(t);const c=(()=>{for(let r=t.claim_info.last_index;r<t.length;r++){const l=t[r];if(e(l)){const o=n(l);return o===void 0?t.splice(r,1):t[r]=o,s||(t.claim_info.last_index=r),l}}for(let r=t.claim_info.last_index-1;r>=0;r--){const l=t[r];if(e(l)){const o=n(l);return o===void 0?t.splice(r,1):t[r]=o,s?o===void 0&&t.claim_info.last_index--:t.claim_info.last_index=r,l}}return i()})();return c.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,c}function tt(t,e,n,i){return O(t,s=>s.nodeName===e,s=>{const c=[];for(let r=0;r<s.attributes.length;r++){const l=s.attributes[r];n[l.name]||c.push(l.name)}c.forEach(r=>s.removeAttribute(r))},()=>i(e))}function Pt(t,e,n){return tt(t,e,n,g)}function et(t,e){return O(t,n=>n.nodeType===3,n=>{const i=""+e;if(n.data.startsWith(i)){if(n.data.length!==i.length)return n.splitText(i.length)}else n.data=i},()=>T(e),!0)}function Dt(t){return et(t," ")}function S(t,e,n){for(let i=n;i<t.length;i+=1){const s=t[i];if(s.nodeType===8&&s.textContent.trim()===e)return i}return-1}function zt(t,e){const n=S(t,"HTML_TAG_START",0),i=S(t,"HTML_TAG_END",n+1);if(n===-1||i===-1)return new x(e);H(t);const s=t.splice(n,i-n+1);m(s[0]),m(s[s.length-1]);const c=s.slice(1,s.length-1);if(c.length===0)return new x(e);for(const r of c)r.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1;return new x(e,c)}function Bt(t,e){e=""+e,t.data!==e&&(t.data=e)}function It(t,e){t.value=e??""}function Wt(t,e,n,i){n==null?t.style.removeProperty(e):t.style.setProperty(e,n,"")}function qt(t,e,n){for(let i=0;i<t.options.length;i+=1){const s=t.options[i];if(s.__value===e){s.selected=!0;return}}(!n||e!==void 0)&&(t.selectedIndex=-1)}function Rt(t,e){for(let n=0;n<t.options.length;n+=1){const i=t.options[n];i.selected=~e.indexOf(i.__value)}}function Ft(t){const e=t.querySelector(":checked");return e&&e.__value}let p;function nt(){if(p===void 0){p=!1;try{typeof window<"u"&&window.parent&&window.parent.document}catch{p=!0}}return p}function Gt(t,e){getComputedStyle(t).position==="static"&&(t.style.position="relative");const i=g("iframe");i.setAttribute("style","display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden; border: 0; opacity: 0; pointer-events: none; z-index: -1;"),i.setAttribute("aria-hidden","true"),i.tabIndex=-1;const s=nt();let c;return s?(i.src="data:text/html,<script>onresize=function(){parent.postMessage(0,'*')}<\/script>",c=M(window,"message",r=>{r.source===i.contentWindow&&e()})):(i.src="about:blank",i.onload=()=>{c=M(i.contentWindow,"resize",e),e()}),C(t,i),()=>{(s||c&&i.contentWindow)&&c(),m(i)}}function Ut(t,e,n){t.classList.toggle(e,!!n)}function it(t,e,{bubbles:n=!1,cancelable:i=!1}={}){return new CustomEvent(t,{detail:e,bubbles:n,cancelable:i})}class st{constructor(e=!1){f(this,"is_svg",!1);f(this,"e");f(this,"n");f(this,"t");f(this,"a");this.is_svg=e,this.e=this.n=null}c(e){this.h(e)}m(e,n,i=null){this.e||(this.is_svg?this.e=Y(n.nodeName):this.e=g(n.nodeType===11?"TEMPLATE":n.nodeName),this.t=n.tagName!=="TEMPLATE"?n:n.content,this.c(e)),this.i(i)}h(e){this.e.innerHTML=e,this.n=Array.from(this.e.nodeName==="TEMPLATE"?this.e.content.childNodes:this.e.childNodes)}i(e){for(let n=0;n<this.n.length;n+=1)V(this.t,this.n[n],e)}p(e){this.d(),this.h(e),this.i(this.a)}d(){this.n.forEach(m)}}class x extends st{constructor(n=!1,i){super(n);f(this,"l");this.e=this.n=null,this.l=i}c(n){this.l?this.n=this.l:super.c(n)}i(n){for(let i=0;i<this.n.length;i+=1)X(this.t,this.n[i],n)}}function Jt(t,e){return new t(e)}let y;function w(t){y=t}function k(){if(!y)throw new Error("Function called outside component initialization");return y}function Kt(t){k().$$.on_mount.push(t)}function Qt(t){k().$$.after_update.push(t)}function Vt(){const t=k();return(e,n,{cancelable:i=!1}={})=>{const s=t.$$.callbacks[e];if(s){const c=it(e,n,{cancelable:i});return s.slice().forEach(r=>{r.call(t,c)}),!c.defaultPrevented}return!0}}function Xt(t,e){const n=t.$$.callbacks[e.type];n&&n.slice().forEach(i=>i.call(this,e))}const h=[],L=[];let d=[];const E=[],P=Promise.resolve();let N=!1;function rt(){N||(N=!0,P.then(ot))}function Yt(){return rt(),P}function ct(t){d.push(t)}function Zt(t){E.push(t)}const v=new Set;let _=0;function ot(){if(_!==0)return;const t=y;do{try{for(;_<h.length;){const e=h[_];_++,w(e),lt(e.$$)}}catch(e){throw h.length=0,_=0,e}for(w(null),h.length=0,_=0;L.length;)L.pop()();for(let e=0;e<d.length;e+=1){const n=d[e];v.has(n)||(v.add(n),n())}d.length=0}while(h.length);for(;E.length;)E.pop()();N=!1,v.clear(),w(t)}function lt(t){if(t.fragment!==null){t.update(),R(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(ct)}}function $t(t){const e=[],n=[];d.forEach(i=>t.indexOf(i)===-1?e.push(i):n.push(i)),n.forEach(i=>i()),d=e}export{it as $,gt as A,yt as B,Xt as C,R as D,Kt as E,W as F,xt as G,Lt as H,wt as I,vt as J,pt as K,_t as L,Qt as M,ct as N,Rt as O,qt as P,Yt as Q,Ft as R,x as S,zt as T,Jt as U,Vt as V,Gt as W,ut as X,Et as Y,J as Z,kt as _,Mt as a,ft as a0,ot as a1,ht as a2,$t as a3,y as a4,w as a5,q as a6,h as a7,rt as a8,Nt as a9,Tt as aa,Ct as ab,Pt as b,Dt as c,Ot as d,g as e,Wt as f,m as g,jt as h,X as i,et as j,Z as k,Q as l,St as m,I as n,L as o,Zt as p,Bt as q,Ht as r,dt as s,T as t,It as u,M as v,At as w,mt as x,Ut as y,bt as z};
