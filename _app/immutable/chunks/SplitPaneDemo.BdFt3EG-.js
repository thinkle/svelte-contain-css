import{s as X,F as Q,e as c,b as $,H as ae,y as re,i as p,u as oe,v as L,n as W,g as f,D as ge,I as ue,G as ve,C as q,a as k,h as g,c as S,o as pe,p as he,k as D,d as Y,t as G,j as J,l as ce}from"./scheduler.u48DAPDK.js";import{S as $e,i as me,c as v,a as C,m as b,t as m,b as d,d as w,g as Ce,f as be,e as de}from"./index.DjJW5U3y.js";import{C as we,a as xe}from"./Columns.svelte_svelte_type_style_lang.DtmmySgz.js";import{C as Pe}from"./Card.DwiD4_m8.js";import{g as ke,F as K}from"./Row.svelte_svelte_type_style_lang.Bwa_LHzJ.js";import{S as Z}from"./SplitPane.Dm_ohpOr.js";import{B as Se}from"./Button.Bhr0sXcv.js";function Ie(r){let e,n,t,l=[{placeholder:r[1]},r[2]],a={};for(let s=0;s<l.length;s+=1)a=Q(a,l[s]);return{c(){e=c("input"),this.h()},l(s){e=$(s,"INPUT",{placeholder:!0}),this.h()},h(){ae(e,a),re(e,"svelte-1a0ho9e",!0)},m(s,u){p(s,e,u),e.autofocus&&e.focus(),oe(e,r[0]),n||(t=[L(e,"input",r[7]),L(e,"input",r[3]),L(e,"change",r[4]),L(e,"blur",r[5]),L(e,"focus",r[6])],n=!0)},p(s,[u]){ae(e,a=ke(l,[u&2&&{placeholder:s[1]},u&4&&s[2]])),u&1&&e.value!==s[0]&&oe(e,s[0]),re(e,"svelte-1a0ho9e",!0)},i:W,o:W,d(s){s&&f(e),n=!1,ge(t)}}}function We(r,e,n){const t=["value","placeholder"];let l=ue(e,t),{value:a}=e,{placeholder:s=""}=e;function u(h){q.call(this,r,h)}function x(h){q.call(this,r,h)}function P(h){q.call(this,r,h)}function I(h){q.call(this,r,h)}function M(){a=this.value,n(0,a)}return r.$$set=h=>{e=Q(Q({},e),ve(h)),n(2,l=ue(e,t)),"value"in h&&n(0,a=h.value),"placeholder"in h&&n(1,s=h.placeholder)},[a,s,l,u,x,P,I,M]}class _e extends $e{constructor(e){super(),me(this,e,We,Ie,X,{value:0,placeholder:1})}}function De(r){let e,n,t;function l(s){r[3](s)}let a={};return r[0]!==void 0&&(a.value=r[0]),e=new _e({props:a}),pe.push(()=>de(e,"value",l)),{c(){v(e.$$.fragment)},l(s){C(e.$$.fragment,s)},m(s,u){b(e,s,u),t=!0},p(s,u){const x={};!n&&u&1&&(n=!0,x.value=s[0],he(()=>n=!1)),e.$set(x)},i(s){t||(m(e.$$.fragment,s),t=!0)},o(s){d(e.$$.fragment,s),t=!1},d(s){w(e,s)}}}function He(r){let e,n="leftWidth";return{c(){e=c("span"),e.textContent=n,this.h()},l(t){e=$(t,"SPAN",{slot:!0,"data-svelte-h":!0}),g(e)!=="svelte-tv91ii"&&(e.textContent=n),this.h()},h(){D(e,"slot","label")},m(t,l){p(t,e,l)},p:W,d(t){t&&f(e)}}}function Te(r){let e,n,t;function l(s){r[4](s)}let a={};return r[1]!==void 0&&(a.value=r[1]),e=new _e({props:a}),pe.push(()=>de(e,"value",l)),{c(){v(e.$$.fragment)},l(s){C(e.$$.fragment,s)},m(s,u){b(e,s,u),t=!0},p(s,u){const x={};!n&&u&2&&(n=!0,x.value=s[1],he(()=>n=!1)),e.$set(x)},i(s){t||(m(e.$$.fragment,s),t=!0)},o(s){d(e.$$.fragment,s),t=!1},d(s){w(e,s)}}}function ze(r){let e,n="rightWidth";return{c(){e=c("span"),e.textContent=n,this.h()},l(t){e=$(t,"SPAN",{slot:!0,"data-svelte-h":!0}),g(e)!=="svelte-54kdn7"&&(e.textContent=n),this.h()},h(){D(e,"slot","label")},m(t,l){p(t,e,l)},p:W,d(t){t&&f(e)}}}function Ve(r){let e;return{c(){e=G("Rerender Pane")},l(n){e=J(n,"Rerender Pane")},m(n,t){p(n,e,t)},d(n){n&&f(e)}}}function je(r){let e,n;return e=new Se({props:{$$slots:{default:[Ve]},$$scope:{ctx:r}}}),e.$on("click",r[5]),{c(){v(e.$$.fragment)},l(t){C(e.$$.fragment,t)},m(t,l){b(e,t,l),n=!0},p(t,l){const a={};l&64&&(a.$$scope={dirty:l,ctx:t}),e.$set(a)},i(t){n||(m(e.$$.fragment,t),n=!0)},o(t){d(e.$$.fragment,t),n=!1},d(t){w(e,t)}}}function Ae(r){let e,n,t,l;return t=new xe({props:{code:`
<SplitPane leftWidth={${r[0]}} rightWidth={${r[1]}}>
  <div slot="left">...</div>
  <div slot="right">...</div>
</SplitPane>
            `}}),{c(){e=c("div"),n=G(`These panes are rendered with:
        `),v(t.$$.fragment),this.h()},l(a){e=$(a,"DIV",{slot:!0});var s=Y(e);n=J(s,`These panes are rendered with:
        `),C(t.$$.fragment,s),s.forEach(f),this.h()},h(){D(e,"slot","left")},m(a,s){p(a,e,s),ce(e,n),b(t,e,null),l=!0},p(a,s){const u={};s&3&&(u.code=`
<SplitPane leftWidth={${a[0]}} rightWidth={${a[1]}}>
  <div slot="left">...</div>
  <div slot="right">...</div>
</SplitPane>
            `),t.$set(u)},i(a){l||(m(t.$$.fragment,a),l=!0)},o(a){d(t.$$.fragment,a),l=!1},d(a){a&&f(e),w(t)}}}function Fe(r){let e;return{c(){e=G(`Here is a card so we can we can see responsive behavior as the container
          changes.`)},l(n){e=J(n,`Here is a card so we can we can see responsive behavior as the container
          changes.`)},m(n,t){p(n,e,t)},d(n){n&&f(e)}}}function Le(r){let e,n="<h3>A Card!</h3>";return{c(){e=c("div"),e.innerHTML=n,this.h()},l(t){e=$(t,"DIV",{slot:!0,"data-svelte-h":!0}),g(e)!=="svelte-1blj3if"&&(e.innerHTML=n),this.h()},h(){D(e,"slot","header")},m(t,l){p(t,e,l)},p:W,d(t){t&&f(e)}}}function Me(r){let e,n,t,l;return t=new Pe({props:{$$slots:{header:[Le],default:[Fe]},$$scope:{ctx:r}}}),{c(){e=c("div"),n=G(`Oh how amazing there is also content on the right.

        `),v(t.$$.fragment),this.h()},l(a){e=$(a,"DIV",{slot:!0});var s=Y(e);n=J(s,`Oh how amazing there is also content on the right.

        `),C(t.$$.fragment,s),s.forEach(f),this.h()},h(){D(e,"slot","right")},m(a,s){p(a,e,s),ce(e,n),b(t,e,null),l=!0},p(a,s){const u={};s&64&&(u.$$scope={dirty:s,ctx:a}),t.$set(u)},i(a){l||(m(t.$$.fragment,a),l=!0)},o(a){d(t.$$.fragment,a),l=!1},d(a){a&&f(e),w(t)}}}function fe(r){let e,n;return e=new Z({props:{leftWidth:r[0],rightWidth:r[1],$$slots:{right:[Me],left:[Ae]},$$scope:{ctx:r}}}),{c(){v(e.$$.fragment)},l(t){C(e.$$.fragment,t)},m(t,l){b(e,t,l),n=!0},p(t,l){const a={};l&1&&(a.leftWidth=t[0]),l&2&&(a.rightWidth=t[1]),l&67&&(a.$$scope={dirty:l,ctx:t}),e.$set(a)},i(t){n||(m(e.$$.fragment,t),n=!0)},o(t){d(e.$$.fragment,t),n=!1},d(t){w(e,t)}}}function Ne(r){let e,n="Stretch to change pane on the right";return{c(){e=c("div"),e.textContent=n,this.h()},l(t){e=$(t,"DIV",{slot:!0,"data-svelte-h":!0}),g(e)!=="svelte-7j4czi"&&(e.textContent=n),this.h()},h(){D(e,"slot","left")},m(t,l){p(t,e,l)},p:W,d(t){t&&f(e)}}}function Be(r){let e,n="Inner left side";return{c(){e=c("div"),e.textContent=n,this.h()},l(t){e=$(t,"DIV",{slot:!0,"data-svelte-h":!0}),g(e)!=="svelte-19apf7m"&&(e.textContent=n),this.h()},h(){D(e,"slot","left")},m(t,l){p(t,e,l)},p:W,d(t){t&&f(e)}}}function Ee(r){let e,n="Inner right side";return{c(){e=c("div"),e.textContent=n,this.h()},l(t){e=$(t,"DIV",{slot:!0,"data-svelte-h":!0}),g(e)!=="svelte-10tm7ji"&&(e.textContent=n),this.h()},h(){D(e,"slot","right")},m(t,l){p(t,e,l)},p:W,d(t){t&&f(e)}}}function Re(r){let e,n,t;return n=new Z({props:{border:"1px solid yellow",$$slots:{right:[Ee],left:[Be]},$$scope:{ctx:r}}}),{c(){e=c("div"),v(n.$$.fragment),this.h()},l(l){e=$(l,"DIV",{slot:!0});var a=Y(e);C(n.$$.fragment,a),a.forEach(f),this.h()},h(){D(e,"slot","right")},m(l,a){p(l,e,a),b(n,e,null),t=!0},p(l,a){const s={};a&64&&(s.$$scope={dirty:a,ctx:l}),n.$set(s)},i(l){t||(m(n.$$.fragment,l),t=!0)},o(l){d(n.$$.fragment,l),t=!1},d(l){l&&f(e),w(n)}}}function Oe(r){let e,n="Split Pane",t,l,a=`The <code>&lt;SplitPane&gt;</code> component makes it simple to create divided
    content in resizable panes. Users can set the initial size by passing left and
    right widths as props.`,s,u,x=`A min-size prop determines when the pane will "snap" to closed instead of
    shrunken.`,P,I,M="Finally, panes automatically stack when placed in a small enough component.",h,H,N,T,B,z,E,y=r[2],F,j,ee="Responsive",R,A,te=`Below are some nested split panes so you can see how they behave
    responsively.`,O,V,U;H=new K({props:{$$slots:{label:[He],default:[De]},$$scope:{ctx:r}}}),T=new K({props:{$$slots:{label:[ze],default:[Te]},$$scope:{ctx:r}}}),z=new K({props:{$$slots:{default:[je]},$$scope:{ctx:r}}});let _=fe(r);return V=new Z({props:{border:"1px solid blue",$$slots:{right:[Re],left:[Ne]},$$scope:{ctx:r}}}),{c(){e=c("h2"),e.textContent=n,t=k(),l=c("p"),l.innerHTML=a,s=k(),u=c("p"),u.textContent=x,P=k(),I=c("p"),I.textContent=M,h=k(),v(H.$$.fragment),N=k(),v(T.$$.fragment),B=k(),v(z.$$.fragment),E=k(),_.c(),F=k(),j=c("h2"),j.textContent=ee,R=k(),A=c("p"),A.textContent=te,O=k(),v(V.$$.fragment)},l(i){e=$(i,"H2",{"data-svelte-h":!0}),g(e)!=="svelte-mps92o"&&(e.textContent=n),t=S(i),l=$(i,"P",{"data-svelte-h":!0}),g(l)!=="svelte-i06xkw"&&(l.innerHTML=a),s=S(i),u=$(i,"P",{"data-svelte-h":!0}),g(u)!=="svelte-8uyzd5"&&(u.textContent=x),P=S(i),I=$(i,"P",{"data-svelte-h":!0}),g(I)!=="svelte-14t87r2"&&(I.textContent=M),h=S(i),C(H.$$.fragment,i),N=S(i),C(T.$$.fragment,i),B=S(i),C(z.$$.fragment,i),E=S(i),_.l(i),F=S(i),j=$(i,"H2",{"data-svelte-h":!0}),g(j)!=="svelte-3xgdog"&&(j.textContent=ee),R=S(i),A=$(i,"P",{"data-svelte-h":!0}),g(A)!=="svelte-10ctoid"&&(A.textContent=te),O=S(i),C(V.$$.fragment,i)},m(i,o){p(i,e,o),p(i,t,o),p(i,l,o),p(i,s,o),p(i,u,o),p(i,P,o),p(i,I,o),p(i,h,o),b(H,i,o),p(i,N,o),b(T,i,o),p(i,B,o),b(z,i,o),p(i,E,o),_.m(i,o),p(i,F,o),p(i,j,o),p(i,R,o),p(i,A,o),p(i,O,o),b(V,i,o),U=!0},p(i,o){const ne={};o&65&&(ne.$$scope={dirty:o,ctx:i}),H.$set(ne);const le={};o&66&&(le.$$scope={dirty:o,ctx:i}),T.$set(le);const se={};o&68&&(se.$$scope={dirty:o,ctx:i}),z.$set(se),o&4&&X(y,y=i[2])?(Ce(),d(_,1,1,W),be(),_=fe(i),_.c(),m(_,1),_.m(F.parentNode,F)):_.p(i,o);const ie={};o&64&&(ie.$$scope={dirty:o,ctx:i}),V.$set(ie)},i(i){U||(m(H.$$.fragment,i),m(T.$$.fragment,i),m(z.$$.fragment,i),m(_),m(V.$$.fragment,i),U=!0)},o(i){d(H.$$.fragment,i),d(T.$$.fragment,i),d(z.$$.fragment,i),d(_),d(V.$$.fragment,i),U=!1},d(i){i&&(f(e),f(t),f(l),f(s),f(u),f(P),f(I),f(h),f(N),f(B),f(E),f(F),f(j),f(R),f(A),f(O)),w(H,i),w(T,i),w(z,i),_.d(i),w(V,i)}}}function Ue(r){let e,n;return e=new we({props:{maxWidth:"90%",$$slots:{default:[Oe]},$$scope:{ctx:r}}}),{c(){v(e.$$.fragment)},l(t){C(e.$$.fragment,t)},m(t,l){b(e,t,l),n=!0},p(t,[l]){const a={};l&71&&(a.$$scope={dirty:l,ctx:t}),e.$set(a)},i(t){n||(m(e.$$.fragment,t),n=!0)},o(t){d(e.$$.fragment,t),n=!1},d(t){w(e,t)}}}function qe(r,e,n){let t="2fr",l="1fr",a=0;function s(P){t=P,n(0,t)}function u(P){l=P,n(1,l)}return[t,l,a,s,u,()=>n(2,a++,a)]}class ye extends $e{constructor(e){super(),me(this,e,qe,Ue,X,{})}}export{ye as default};