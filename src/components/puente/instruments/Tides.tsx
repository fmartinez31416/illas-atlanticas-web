/*
 * instruments/Tides.tsx · Puente de Mando — Illas Atlánticas Ático
 * Portado del diseño validado: mismas clases, rótulos y geometría que el DOM de Arena.
 */
// Mareógrafo: pleamar, bajamar, vaciante, llenante y coeficiente.
import * as X from 'react';
import { Tc } from '../config';
import { kt, xx } from '../data';
import { At, Fe, me, tp, yh } from '../astro';
import { $n, il } from '../parts';

export function _h(s,u){let r=[];for(let o=1;o<u.length-1;o++){const d=u[o-1],m=u[o],y=u[o+1];if(!isFinite(d)||!isFinite(m)||!isFinite(y))continue;const g=m>d&&m>=y,h=m<d&&m<=y;if(!g&&!h)continue;const p=d-2*m+y,b=p!==0?Math.max(-.5,Math.min(.5,.5*(d-y)/p)):0;r.push({t:s[o]+b*(s[o+1]-s[o]),h:m-.25*(d-y)*b,type:g?"high":"low"})}for(let o=0;o<4;o++){const d=[];for(const m of r){const y=d[d.length-1];if(y&&y.type===m.type){(m.type==="high"&&m.h>y.h||m.type==="low"&&m.h<y.h)&&(d[d.length-1]=m);continue}if(y&&Math.abs(m.h-y.h)<.1){d.pop();continue}d.push(m)}if(d.length===r.length){r=d;break}r=d}return r}

export function Sy(s){const u=s-144e6,r=s+80*36e5,o=tp(u-28*36e5,r+4*36e5),d=2.4*36e5,m=12.4206*36e5,y=[];for(const p of o)y.push(p+d,p+d+m);y.sort((p,b)=>p-b);const g=[],h=[];for(let p=u;p<=r;p+=36e5){let b=y[0]??s;for(const L of y)Math.abs(L-p)<Math.abs(b-p)&&(b=L);const A=yh(new Date(p)).moonPhase,B=(2.3+.95*Math.cos(4*Math.PI*(A-.05)))/2;g.push(p),h.push(B*Math.cos(2*Math.PI*(p-b)/m))}return{source:"estimación",t:g,h,extremes:_h(g,h)}}

export function jy(s,u){if(s){const{t:r = undefined,seaLevel:o = undefined}=s.hourly;if(o.filter(m=>isFinite(m)).length>30){const m=[...o];for(let p=0;p<m.length;p++){if(isFinite(m[p]))continue;let b=p-1;for(;b>=0&&!isFinite(m[b]);)b--;let A=p+1;for(;A<m.length&&!isFinite(m[A]);)A++;b>=0&&A<m.length?m[p]=m[b]+(m[A]-m[b])*(p-b)/(A-b):m[p]=b>=0?m[b]:A<m.length?m[A]:0}const y=o.filter(p=>isFinite(p)),g=y.reduce((p,b)=>p+b,0)/y.length;for(let p=0;p<m.length;p++)m[p]-=g;const h=_h(r,m);if(h.length>=4)return{source:"modelo",t:r,h:m,extremes:h}}}return Sy(u)}

export function Cc(s,u){return xx(s.t,s.h,u)??0}

export function Ay(s,u){const r=Cc(s,u);let o=null,d=null;for(const b of s.extremes)if(b.t<=u)o=b;else{d=b;break}const m=d?d.type==="high":o?o.type==="low":!0,y=o&&d?Math.min(1,Math.max(0,(u-o.t)/(d.t-o.t))):.5,g=(Cc(s,u+15*6e4)-Cc(s,u-15*6e4))*2;let h=null;if(o&&d){const b=Math.abs(d.h-o.h);h=Math.round(Math.min(120,Math.max(20,100*(b/2)/1.62)))}const p=m?180+180*y:180*y;return{h:r,hCD:r+Tc,prev:o,next:d,rising:m,progress:y,coef:h,rate:g,dialAngle:p}}

export const Xa="#dcbc6e";

export function zc({id:s = undefined,text:u = undefined,angle:r = undefined,r:o = undefined,size:d = undefined}){const y=Math.abs(r)>95?me(100,100,o+d*.72,r+40,r-40):me(100,100,o,r-40,r+40);return <g>{
    <path id={s} d={y} fill="none" />
    }{
    <text fontSize={d} fontFamily="Cinzel" fontWeight={700} letterSpacing="1.4" fill={Xa}>{
      <textPath href={`#${s}`} startOffset="50%" textAnchor="middle">{u}</textPath>
      }</text>
    }</g>
  }

export const My=X.memo(function(){const u=[];for(let o=.5;o<6.21;o+=.5){const d=Math.abs(o-Math.round(o))<.01;for(const m of[0,180]){const y=m+180*(1-o/6.21),[g,h]=At(100,100,76,y),[p,b]=At(100,100,d?69:72.5,y);if(u.push(
  <line x1={g} y1={h} x2={p} y2={b} stroke={Xa} strokeWidth={d?1.1:.5} />
  ),d){const[A,O]=At(100,100,61,y);u.push(
  <text x={A} y={O+3.4} textAnchor="middle" fontSize="9.5" fontFamily="Cormorant Garamond" fontWeight={700} fill="#efe3c2">{o}</text>
  )}}}return <g>{
    <circle cx="100" cy="100" r="76" fill="none" stroke={Xa} strokeWidth="0.5" />
    }{
    <circle cx="100" cy="100" r="90" fill="none" stroke={Xa} strokeWidth="0.35" opacity="0.6" />
    }{[0,180].map(o=>{const[d,m]=At(100,100,78,o),[y,g]=At(100,100,66,o);return <line x1={d} y1={m} x2={y} y2={g} stroke="#f3d27f" strokeWidth="2" />
    })}{u}{
    <Zc id="td-pm" text="PLEAMAR" angle={0} r={82} size={7.4} />
    }{
    <Zc id="td-bm" text="BAJAMAR" angle={180} r={82} size={7.4} />
    }{
    <Zc id="td-va" text="VACIANTE" angle={90} r={82} size={5.6} />
    }{
    <Zc id="td-ll" text="LLENANTE" angle={270} r={82} size={5.6} />
    }{
    <text x="100" y="152" textAnchor="middle" fontSize="4.2" fontStyle="italic" fontFamily="Cormorant Garamond" fill={Xa} opacity="0.85">horas hasta la próxima</text>
    }</g>
  }),fl=20,Qi=292,fa=100,$i=19;

export function zy({model:s = undefined,state:u = undefined,at:r = undefined,dayStart:o = undefined}){const d=o+864e5,m=D=>fl+(D-o)/(d-o)*(Qi-fl),y=D=>fa-Math.min(4.9,Math.max(-.3,D+Tc))*$i,g=X.useMemo(()=>{const D=[];for(let q=o;q<=d;q+=10*6e4)D.push([q,m(q),y(Cc(s,q))]);return D},[s,o]),h=g.filter(D=>D[0]<=r),p=g.filter(D=>D[0]>=r-10*6e4),b=D=>D.map((q,V)=>`${V?"L":"M"}${q[1].toFixed(1)} ${q[2].toFixed(1)}`).join(" "),A=s.extremes.filter(D=>D.t>=o&&D.t<=d),O=m(Math.min(d,Math.max(o,r))),B=y(u.h),L=u.next;return <div className="flex flex-col items-center gap-3">{
    <$n dial="navy" className="max-w-[250px]">{
      <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full" aria-hidden={true}>{
        <defs>{
          <linearGradient id="td-gold" x1="0" y1="0" x2="1" y2="0">{
            <stop offset="0" stopColor="#8a6120" />
            }{
            <stop offset="0.5" stopColor="#f6dc95" />
            }{
            <stop offset="1" stopColor="#8a6120" />
            }</linearGradient>
          }</defs>
        }{
        <My />
        }{
        <text x="100" y="80" textAnchor="middle" fontSize="5.6" letterSpacing="1.4" fontFamily="Cinzel" fontWeight={700} fill={Xa}>{u.rising?"▲ SUBIENDO":"▼ BAJANDO"}</text>
        }{
        <text x="100" y="133" textAnchor="middle" fontSize="12" fontFamily="Cormorant Garamond" fontWeight={700} fill="#f4ead0">{kt(u.hCD,2)} m</text>
        }{
        <text x="100" y="140.5" textAnchor="middle" fontSize="4.3" letterSpacing="0.8" fontFamily="Cinzel" fill={Xa}>SOBRE EL CERO</text>
        }{
        <g transform={`rotate(${u.dialAngle} 100 100)`}>{
          <path d="M99.2 112 L99.5 34 L100.5 34 L100.8 112 Z" fill="url(#td-gold)" />
          }{
          <path d="M100 25 L96 36 L104 36 Z" fill="url(#td-gold)" stroke="#4a3208" strokeWidth="0.3" />
          }{
          <circle cx="100" cy="117" r="6" fill="url(#td-gold)" />
          }{
          <circle cx="102.6" cy="115.4" r="5.2" fill="#163353" />
          }</g>
        }{
        <circle cx="100" cy="100" r="4.6" fill="url(#td-gold)" stroke="#4a3208" strokeWidth="0.4" />
        }{
        <circle cx="100" cy="100" r="1.5" fill="#163353" />
        }</svg>
      }</$n>
    }{
    <div className="relative isolate w-full max-w-[340px] overflow-hidden rounded-[7px] p-[5px] brass-flat inst-shadow">{
      <div className="relative overflow-hidden rounded-[4px]">{
        <svg viewBox="0 0 300 122" className="block h-auto w-full" aria-label="Curva de marea del día">{
          <rect x="0" y="0" width="300" height="122" fill="#f4ecd6" />
          }{Array.from({length:25},(D,q)=>
          <line x1={fl+q*(Qi-fl)/24} y1={fa-4.9*$i} x2={fl+q*(Qi-fl)/24} y2={fa+3} stroke="#b89c6a" strokeWidth={q%3===0?.55:.22} />
          )}{Array.from({length:10},(D,q)=>
          <line x1={fl} y1={fa-q*.5*$i} x2={Qi} y2={fa-q*.5*$i} stroke="#b89c6a" strokeWidth={q%2===0?.45:.2} />
          )}{[0,1,2,3,4].map(D=>
          <text x={fl-3} y={fa-D*$i+2} textAnchor="end" fontSize="6" fontFamily="Cormorant Garamond" fontWeight={700} fill="#5a4526">{D}</text>
          )}{Array.from({length:9},(D,q)=>
          <text x={fl+q*3*(Qi-fl)/24} y={fa+12} textAnchor="middle" fontSize="6" fontFamily="Cormorant Garamond" fontWeight={700} fill="#5a4526">{String(q*3).padStart(2,"0")}</text>
          )}{
          <path d={b(p)} fill="none" stroke="#6b5b95" strokeWidth="1" strokeDasharray="2.4 1.8" opacity="0.8" />
          }{
          <path d={b(h)} fill="none" stroke="#1a3a5c" strokeWidth="1.5" strokeLinejoin="round" />
          }{A.map(D=>{const q=m(D.t),V=y(D.h),et=D.type==="high";return <g>{
            <circle cx={q} cy={V} r="1.6" fill={et?"#1a3a5c":"#7a2a1e"} />
            }{
            <text x={q} y={et?V-4:V+8} textAnchor="middle" fontSize="5.4" fontFamily="Cormorant Garamond" fontWeight={700} fill={et?"#1a3a5c":"#7a2a1e"}>{et?"PM":"BM"} {Fe(new Date(D.t))} · {kt(D.h+Tc,1)}</text>
            }</g>
          })}{
          <line x1={O} y1="0" x2={O} y2={fa+3} stroke="#8a6120" strokeWidth="0.7" />
          }{
          <path d={`M${O-5} 0 L${O+5} 0 L${O+1.2} 7 L${O-1.2} 7 Z`} fill="#b88c3c" />
          }{
          <circle cx={O} cy={B} r="2.3" fill="#b3261e" stroke="#fff" strokeWidth="0.5" />
          }{
          <text x="296" y="9" textAnchor="end" fontSize="5" fontStyle="italic" fontFamily="Cormorant Garamond" fill="#5a4526">m s/ cero hidrográfico</text>
          }</svg>
        }{
        <div className="pointer-events-none absolute inset-0" style={{background:"linear-gradient(180deg, rgba(40,25,5,.38) 0%, rgba(255,255,255,.06) 42%, rgba(255,255,255,0) 58%, rgba(40,25,5,.42) 100%)"}} />
        }</div>
      }{
      <div className="shade shade-lamp-soft rounded-[7px]" />
      }</div>
    }{
    <Il title="MAREÓGRAFO">{u.rising?"Llenante":"Vaciante"} · {kt(u.hCD,2)} m · Coef. {u.coef??"—"}{L&&
      <span className="block text-[12px] not-italic tracking-wide opacity-80">Próxima {L.type==="high"?"pleamar":"bajamar"} {Fe(new Date(L.t))} · {kt(L.h+Tc,2)} m · {s.source==="modelo"?"modelo oceánico":"estimación astronómica"}</span>
      }</Il>
    }</div>
  }
const Il=il, Zc=zc;
