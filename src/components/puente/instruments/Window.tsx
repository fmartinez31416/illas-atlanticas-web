/*
 * instruments/Window.tsx · Puente de Mando — Illas Atlánticas Ático
 * Portado del diseño validado: mismas clases, rótulos y geometría que el DOM de Arena.
 */
// Ventana del puente: cielo, mar, faros y montantes de caoba (mp = la escena completa).
import * as X from 'react';
import { Ec, dr, qa } from '../config';
import { Ft, Gn, Jt, Tx, bx, qn, xa } from '../data';
import { Wt, Yn, ce } from '../astro';
import { mr } from '../parts';
import { nh, dx } from '../instruments/Chart';
import { t } from '../../../i18n/translate';

export const xr=s=>[parseInt(s.slice(1,3),16),parseInt(s.slice(3,5),16),parseInt(s.slice(5,7),16)],oa: any=[[-18,["#01030a","#040914","#0a1326","#050b17","#010308"]],[-12,["#030817","#08142c","#16254a","#0a1428","#02050c"]],[-8,["#071331","#132a58","#3a4577","#16223f","#040a16"]],[-4,["#0f2350","#2d4b86","#9a6f86","#2a3558","#070f1f"]],[-1,["#1a3568","#4a6fa8","#e89468","#4a4a64","#0c1528"]],[2,["#274b86","#6c93c6","#f6b47c","#5b6a82","#122038"]],[6,["#2f5d9e","#80a8d6","#f5cf9e","#58789a","#16304f"]],[12,["#3567ac","#8ab4df","#e3e4dc","#4f7597","#15385a"]],[25,["#3a70ba","#8fbbe5","#d4e6f3","#3f6f96","#12385c"]],[60,["#2d66b8","#7fb1e7","#cde4f5","#3a6d97","#10355a"]]],ip=["#12213f","#223a63","#34496e","#18284a","#070e1c"].map(xr);

export function sp(s,u,r){let o=oa[oa.length-1],d=o;if(s<=oa[0][0])o=d=oa[0];else for(let h=1;h<oa.length;h++)if(s<=oa[h][0]){o=oa[h-1],d=oa[h];break}const m=d[0]===o[0]?0:Ft((s-o[0])/(d[0]-o[0]),0,1),y=1-Jt(-10,-2,s),g=o[1].map((h,p)=>{let b=Wt(xr(h),xr(d[1][p]),m);b=Wt(b,ip[p],Ft(r*.85,0,1)*y);const A=.2126*b[0]+.7152*b[1]+.0722*b[2];return Wt(b,[A*.97,A,A*1.04],u*.78)});return{top:g[0],mid:g[1],hor:g[2],seaTop:g[3],seaBot:g[4]}}

export const cp=X.memo(function({w:u = undefined,hz:r = undefined}){const o=X.useMemo(()=>{const d=Yn(7);return Array.from({length:190},()=>({x:d()*u,y:Math.pow(d(),1.25)*(r-10),s:.35+Math.pow(d(),3)*1.35,d:2+d()*5,dl:d()*6}))},[u,r]);return <g>{o.map((d,m)=>
    <circle cx={d.x} cy={d.y} r={d.s} fill="#f4f1ff" className="twinkle" style={{"--tw":`${d.d}s`,"--td":`${-d.dl}s`}} />
    )}</g>
  }),up=X.memo(function({w:u = undefined,h:r = undefined,count:o = undefined,lit:d = undefined,shadow:m = undefined,drift:y = undefined}){const g=X.useMemo(()=>{const h=Yn(21);return Array.from({length:12},()=>({x:h()*u,y:r*(.1+h()*.34),s:(.6+h()*1.1)*(r/300),dur:70+h()*90,parts:Array.from({length:5},()=>({dx:(h()-.5)*90,dy:(h()-.5)*16,rx:26+h()*34,ry:10+h()*12}))}))},[u,r]);return <div className="pointer-events-none absolute inset-0 z-[2] overflow-hidden">{g.slice(0,o).map((h,p)=>{const b=190*h.s,A=70*h.s;return <div className="drift absolute" style={{left:h.x-b/2,top:h.y-A/2,width:b,height:A,filter:`blur(${Math.max(4,7*h.s)}px)`,willChange:"transform","--drift":`${y}px`,"--dd":`${h.dur}s`}}>{
      <svg viewBox="-95 -35 190 70" className="h-full w-full overflow-visible" aria-hidden={true}>{h.parts.map((O,B)=>
        <ellipse cx={O.dx} cy={O.dy+4} rx={O.rx} ry={O.ry} fill={m} />
        )}{h.parts.map((O,B)=>
        <ellipse cx={O.dx} cy={O.dy-2} rx={O.rx*.85} ry={O.ry*.7} fill={d} />
        )}</svg>
      }</div>
    })}</div>
  }),op=X.memo(function({w:u = undefined,h:r = undefined,hz:o = undefined,color:d = undefined,period:m = undefined,amp:y = undefined}){const g=X.useMemo(()=>{const h=Yn(33);return Array.from({length:28},(p,b)=>{const A=(b+1)/29;return{y:o+(r-o)*Math.pow(A,1.75)+1,dash:`${(6+h()*30)*(.4+A)} ${(4+h()*22)*(.4+A)}`,off:h()*60,op:.06+.2*A,sw:.4+A*1.3,d:.6+h()*.8}})},[r,o]);return <g>{g.map((h,p)=>
    <line x1={-40} x2={u+40} y1={h.y} y2={h.y} stroke={d} strokeOpacity={h.op} strokeWidth={h.sw} strokeDasharray={h.dash} strokeDashoffset={h.off} className="swell" style={{"--sd":`${m*h.d}s`,"--swell":`${y*(.3+p/28*1.4)}px`}} />
    )}</g>
  }),rp=X.memo(function({x:u = undefined,h:r = undefined,hz:o = undefined,w:d = undefined,color:m = undefined,spread:y = undefined}){const g=X.useMemo(()=>{const h=Yn(55);return Array.from({length:110},()=>({u:h(),v:(h()-.5)*2,len:h(),d:.9+h()*2.4,dl:h()*3}))},[]);return <g>{g.map((h,p)=>{const b=Math.pow(h.u,1.6),A=o+1.2+b*(r-o),O=2+b*d*.07*y,B=2+b*16*(.5+h.len);return <rect x={u+h.v*O-B/2} y={A} width={B} height={.7+b*1.8} rx={.6} fill={m} className="glint" style={{"--gd":`${h.d}s`,"--gl":`${-h.dl}s`}} />
    })}</g>
  }),fp=X.memo(function(){const u=X.useMemo(()=>{const r=Yn(77);return Array.from({length:70},()=>({x:r()*100,d:.5+r()*.6,dl:r()*2,h:10+r()*22}))},[]);return <div className="pointer-events-none absolute inset-0 z-[3] overflow-hidden">{u.map((r,o)=>
    <span className="absolute top-0 w-px" style={{left:`${r.x}%`,height:`${r.h}px`,background:"linear-gradient(180deg, rgba(220,230,245,0), rgba(220,230,245,.55))",animation:`rainfall ${r.d}s linear ${-r.dl}s infinite`,transform:"rotate(8deg)"}} />
    )}</div>
  }),dp=[{id:"barbanza",az0:36,az1:95,h:.09,env:s=>Math.pow(1-s,.45)*(.75+.25*Math.sin(s*9)),seed:11,dist:22,rough:.35},{id:"ribeira",az0:36,az1:77,h:.034,env:s=>Math.pow(1-s,.8),seed:12,dist:7,rough:.3},{id:"salnes",az0:96,az1:147,h:.03,env:s=>Math.pow(Math.sin(Math.PI*s),.5),seed:13,dist:11,rough:.4},{id:"ons",az0:150,az1:163,h:.022,env:s=>Math.pow(Math.sin(Math.PI*s),.6),seed:14,dist:17,rough:.3},{id:"salvora",az0:164.5,az1:184.5,h:.052,env:s=>Math.pow(Math.sin(Math.PI*s),.45)*(1-.35*s),seed:15,dist:5,rough:.3},{id:"nw",az0:281,az1:332,h:.08,env:s=>Math.pow(s,.6),seed:16,dist:4,rough:.3}],K1={salvora:.036,ons:.017,rua:.012,cabalo:.015,corrubedo:.034},hp=[[19.5,-6],[39.5,-2],[60.5,2],[80.5,6]];

export function mp({sky:s = undefined,lighting:u = undefined,cond:r = undefined,header:o = undefined}){const[d,{w:m = undefined,h:y = undefined}]=bx(),g=m||1200,h=y||420,p=h*.66,b=X.useRef({}),A=J=>{let mt=((J-Ec)%360+360)%360;return mt>342&&(mt-=360),mt>qa+18?null:mt/qa*g},O=J=>p-J/62*(p-h*.2),B=Ft((r.cloud??25)/100,0,1),L=sp(s.sunAlt,B,u.moonI),D=Jt(-8,8,s.sunAlt),q=1-Jt(-8,2,s.sunAlt),V=(r.visibility??24e3)/1e3,et=1-Jt(-3,1.5,s.sunAlt),ct=Wt([6,10,18],[50,62,58],D),P=J=>{const mt=1-Math.exp(-J/Math.max(2,V*.55));return ce(Wt(ct,L.hor,Ft(mt*.9,0,.9)))},yt=J=>Jt(J*.5,J*1.05,V),at=X.useMemo(()=>dp.map(J=>{const mt=A(J.az0),Qt=A(J.az1);if(mt==null||Qt==null)return{...J,d:""};const Ce=Yn(J.seed),sl=Array.from({length:13},()=>Ce()),es=hl=>{const Ul=hl*12,Hl=Math.min(11,Math.floor(Ul)),oe=Ul-Hl;return sl[Hl]+(sl[Hl+1]-sl[Hl])*(oe*oe*(3-2*oe))},Va=Math.max(10,Math.round((Qt-mt)/4));let Qa=`M${mt.toFixed(1)} ${p.toFixed(1)}`;for(let hl=0;hl<=Va;hl++){const Ul=hl/Va,Hl=mt+(Qt-mt)*Ul,oe=p-J.h*h*J.env(Ul)*(1-J.rough+J.rough*es(Ul));Qa+=` L${Hl.toFixed(1)} ${oe.toFixed(1)}`}return{...J,d:`${Qa} L${Qt.toFixed(1)} ${p.toFixed(1)} Z`}}),[g,h,p]),W=X.useMemo(()=>dr.map((J,mt)=>{const Qt=dx(J.lat,J.lon);return{...J,...Qt,idx:mt}}),[]);qn(()=>{const J=Date.now()/1e3;for(const mt of W){const Qt=b.current[mt.id];if(!Qt)continue;const Ce=et*Jt(mt.distance*.3,mt.distance*.8,V);Qt.style.opacity=Ce>.01&&nh(mt.seq,J,mt.idx*3.7)?String(Ce):"0"}});const U=A(s.sunAz),dt=O(s.sunAlt),ot=h*.03,it=1-Jt(0,14,s.sunAlt),Nt=Wt([255,250,232],[255,150,90],it),ue=(.3+.7*u.beam)*(s.sunAlt>-1.2?1:0),qt=A(s.moonAz),Ct=O(s.moonAlt),T=h*.024,Y=Gn(.5,1,q)*(1-.7*Jt(.6,1,B));let H=null;U!=null&&s.sunAlt>0?H={x:U,color:`rgb(${ce(Wt([255,246,220],[255,170,100],it))})`,str:.95*Math.max(.15,u.beam)*Jt(0,3,s.sunAlt),spread:1+it}:qt!=null&&s.moonAlt>0&&q>.5&&(H={x:qt,color:"rgb(222,230,248)",str:Ft(u.moonI*1.5,0,1)*(1-B*.75),spread:1.2});const gt=Jt(-11,-1,s.sunAlt)*(1-Jt(3,14,s.sunAlt))*(1-B*.55),bt=U??g/2,S=(1-Jt(-14,-5,s.sunAlt))*(1-B*.92)*(1-u.moonI*.45),_=Math.round(B*12),k=ce(Wt(Wt([28,34,52],[255,255,255],D),u.lightRGB,.25+it*.4*D)),Z=ce(Wt(Wt([12,16,28],[150,162,180],D),L.mid,.3)),nt=r.windDir!=null?Math.sin((r.windDir-180)*Math.PI/180):.5,ut=30+(r.windSpeed??8)*3*(nt>=0?1:-1),I=Jt(.55,1,B)*.85,tt=(1-Jt(800,12e3,r.visibility??24e3))*.88,rt=(r.precip??0)>.05||Tx(r.code),Zt=2+(r.waveHeight??1)*3;return <section ref={d} className="relative h-[48vh] max-h-[540px] min-h-[320px] w-full select-none overflow-hidden bg-black">{
    <svg className="absolute inset-0 z-0 h-full w-full" viewBox={`0 0 ${g} ${h}`} preserveAspectRatio="none" aria-label={t("Vista desde el puente hacia Sálvora")}>{
      <defs>{
        <linearGradient id="ws-sky" x1="0" y1="0" x2="0" y2="1">{
          <stop offset="0" stopColor={`rgb(${ce(L.top)})`} />
          }{
          <stop offset="0.62" stopColor={`rgb(${ce(L.mid)})`} />
          }{
          <stop offset="1" stopColor={`rgb(${ce(L.hor)})`} />
          }</linearGradient>
        }{
        <linearGradient id="ws-sea" x1="0" y1="0" x2="0" y2="1">{
          <stop offset="0" stopColor={`rgb(${ce(L.seaTop)})`} />
          }{
          <stop offset="1" stopColor={`rgb(${ce(L.seaBot)})`} />
          }</linearGradient>
        }{
        <radialGradient id="ws-glow" cx="0.5" cy="0.5" r="0.5">{
          <stop offset="0" stopColor="#ffb07a" stopOpacity="0.85" />
          }{
          <stop offset="0.45" stopColor="#e0708a" stopOpacity="0.3" />
          }{
          <stop offset="1" stopColor="#e0708a" stopOpacity="0" />
          }</radialGradient>
        }{
        <radialGradient id="ws-sunhalo" cx="0.5" cy="0.5" r="0.5">{
          <stop offset="0" stopColor={`rgb(${ce(Nt)})`} stopOpacity="0.9" />
          }{
          <stop offset="0.18" stopColor={`rgb(${ce(Nt)})`} stopOpacity="0.35" />
          }{
          <stop offset="1" stopColor={`rgb(${ce(Nt)})`} stopOpacity="0" />
          }</radialGradient>
        }{
        <radialGradient id="ws-moonhalo" cx="0.5" cy="0.5" r="0.5">{
          <stop offset="0" stopColor="#dfe8ff" stopOpacity="0.55" />
          }{
          <stop offset="1" stopColor="#dfe8ff" stopOpacity="0" />
          }</radialGradient>
        }{
        <radialGradient id="ws-light" cx="0.5" cy="0.5" r="0.5">{
          <stop offset="0" stopColor="#ffffff" stopOpacity="1" />
          }{
          <stop offset="0.2" stopColor="#fff2c8" stopOpacity="0.85" />
          }{
          <stop offset="1" stopColor="#ffd58a" stopOpacity="0" />
          }</radialGradient>
        }{
        <filter id="ws-soft" x="-50%" y="-50%" width="200%" height="200%">{
          <feGaussianBlur stdDeviation="12" />
          }</filter>
        }</defs>
      }{
      <rect width={g} height={p+1} fill="url(#ws-sky)" />
      }{gt>.01&&
      <ellipse cx={bt} cy={p} rx={g*.38} ry={h*.5} fill="url(#ws-glow)" opacity={gt} />
      }</svg>
    }{S>.02&&
    <svg className="pointer-events-none absolute inset-0 z-[1] h-full w-full" viewBox={`0 0 ${g} ${h}`} preserveAspectRatio="none" style={{opacity:S,willChange:"opacity"}} aria-hidden={true}>{
      <Cp w={g} hz={p} />
      }</svg>
    }{
    <svg className="pointer-events-none absolute inset-0 z-[1] h-full w-full" viewBox={`0 0 ${g} ${h}`} preserveAspectRatio="none" aria-hidden={true}>{qt!=null&&s.moonAlt>-1.5&&
      <g transform={`translate(${qt} ${Ct})`}>{
        <circle r={T*7} fill="url(#ws-moonhalo)" opacity={.6*s.moonFraction*q*(1-B*.5)} />
        }{
        <Mr id="ws-moon" r={T} fraction={s.moonFraction} limbAngle={s.moonLimbAngle} earthshine={.85*q} litOpacity={Y} />
        }</g>
      }{U!=null&&ue>0&&
      <g transform={`translate(${U} ${dt})`}>{
        <circle r={ot*9} fill="url(#ws-sunhalo)" opacity={.35+.35*u.beam} />
        }{
        <ellipse rx={ot} ry={ot*(1-.15*it)} fill={`rgb(${ce(Nt)})`} opacity={ue} />
        }</g>
      }{I>.01&&
      <rect width={g} height={p+1} fill={`rgb(${ce(Wt(L.mid,L.hor,.4))})`} opacity={I} />
      }{at.map(J=>J.d?
      <path d={J.d} fill={`rgb(${P(J.dist)})`} opacity={yt(J.dist)} />
      :null)}{(()=>{const J=A(W[0].bearing);if(J==null)return null;const mt=p-K1.salvora*h;return <g opacity={yt(5)}>{
        <rect x={J-1.4} y={mt-1} width="2.8" height={h*.02} fill={D>.5?"#e9e4d8":"#1b2230"} />
        }{
        <rect x={J-1.4} y={mt+h*.006} width="2.8" height={h*.004} fill="#9b3b2c" />
        }</g>
      })()}{
      <rect y={p} width={g} height={h-p} fill="url(#ws-sea)" />
      }{
      <rect y={p-2} width={g} height={h*.05} fill={`rgb(${ce(L.hor)})`} opacity="0.35" filter="url(#ws-soft)" />
      }{H&&H.str>.02&&
      <ellipse cx={H.x} cy={p+(h-p)*.55} rx={g*.05*H.spread} ry={(h-p)*.55} fill={H.color} opacity={.22*H.str} filter="url(#ws-soft)" />
      }</svg>
    }{
    <Up w={g} h count={_} lit={`rgb(${k})`} shadow={`rgb(${Z})`} drift={ut} />
    }{
    <svg className="pointer-events-none absolute inset-0 z-[3] h-full w-full" viewBox={`0 0 ${g} ${h}`} preserveAspectRatio="none" style={{willChange:"transform"}} aria-hidden={true}>{
      <Op w={g} h hz={p} color={`rgb(${ce(Wt(L.hor,[255,255,255],.3))})`} period={Ft(r.wavePeriod??8,4,16)} amp={Zt} />
      }{H&&H.str>.02&&
      <g opacity={H.str}>{
        <rp x={H.x} h hz={p} w={g} color={H.color} spread={H.spread} />
        }</g>
      }{W.map(J=>{const mt=A(J.bearing);if(mt==null)return null;const Qt=p-(K1[J.id]??.012)*h-1,Ce=h*(.018+.03*Math.min(1,5/J.distance));return <g ref={sl=>{b.current[J.id]=sl}} style={{opacity:0,transition:"opacity 110ms linear"}}>{
        <circle cx={mt} cy={Qt} r={Ce} fill="url(#ws-light)" />
        }{
        <circle cx={mt} cy={Qt} r={1.3} fill={`rgb(${J.color})`} />
        }</g>
      })}</svg>
    }{rt&&
    <Fp />
    }{
    <svg className="pointer-events-none absolute inset-0 z-[4] h-full w-full" viewBox={`0 0 ${g} ${h}`} preserveAspectRatio="none" aria-hidden={true}>{tt>.02&&
      <rect width={g} height={h} fill={`rgb(${ce(Wt(L.hor,[200,205,210],.4))})`} opacity={tt} />
      }{
      <rect y={h-22} width={g} height="22" fill="rgba(0,0,0,0.38)" />
      }{Array.from({length:qa/5+1},(J,mt)=>{const Qt=Ec+mt*5,Ce=mt*5*g/qa,sl=Qt%45===0;return <line x1={Ce} x2={Ce} y1={h-22} y2={h-22+(sl?8:Qt%15===0?5:3)} stroke="#dcbc6e" strokeWidth={sl?1:.5} opacity="0.8" />
      })}{[45,90,135,180,225,270,315].map(J=>
      <text x={J===45?6:J===315?g-6:(J-Ec)*g/qa} y={h-5} textAnchor={J===45?"start":J===315?"end":"middle"} fontSize="10" letterSpacing="1.5" fontFamily="Cinzel" fontWeight={700} fill="#e7cd86">{xa(J)} {J%90===0?"":`${J}°`}</text>
      )}{U!=null&&s.sunAlt>-6&&
      <path d={`M${U} ${h-21} l-4 -6 h8 z`} fill="#f3c33c" />
      }{qt!=null&&s.moonAlt>-2&&
      <path d={`M${qt} ${h-21} l-4 -6 h8 z`} fill="#cfd9ef" />
      }</svg>
    }{
    <div className="pointer-events-none absolute inset-0 z-[4]" style={{background:"linear-gradient(112deg, rgba(255,255,255,.055) 0%, rgba(255,255,255,0) 16%, rgba(255,255,255,0) 58%, rgba(255,255,255,.045) 70%, rgba(255,255,255,0) 79%)"}} />
    }{
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[4] h-1/3" style={{background:"linear-gradient(0deg, rgba(var(--lamp-rgb), calc(var(--lamp) * .14)), rgba(0,0,0,0))"}} />
    }{hp.map(([J,mt])=>
    <div className="absolute bottom-0 top-0 z-[5] w-[12px] -translate-x-1/2 overflow-hidden isolate wood sm:w-[18px]" style={{left:`${J}%`,transform:`skewX(${mt}deg)`}}>{
      <div className="lacquer" />
      }{
      <div className="shade" />
      }{
      <div className="absolute inset-0 z-[6]" style={{boxShadow:`inset ${u.dx<0?2:-2}px 0 3px rgba(var(--light-rgb), calc(var(--light-int) * .35)), inset ${u.dx<0?-3:3}px 0 6px rgba(0,0,0,.55)`}} />
      }</div>
    )}{
    <div className="absolute inset-x-0 top-0 z-10">{o}</div>
    }</section>
  }
const Cp=cp, Fp=fp, Mr=mr, Op=op, Up=up;
