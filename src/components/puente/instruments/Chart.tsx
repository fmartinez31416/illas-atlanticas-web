/*
 * instruments/Chart.tsx · Puente de Mando — Illas Atlánticas Ático
 * Portado del diseño validado: mismas clases, rótulos y geometría que el DOM de Arena.
 */
// Carta náutica de la Ría de Arousa con los faros y sus características GpD.
import * as X from 'react';
import { Ie, ah, dr } from '../config';
import { kt, qn, xa } from '../data';
import { il } from '../parts';

export function nh(s,u,r=0){const o=s.reduce((m,y)=>m+y,0);let d=((u+r)%o+o)%o;for(let m=0;m<s.length;m++){if(d<s[m])return m%2===0;d-=s[m]}return!1}

export function dx(s,u){const r=(s-Ie.lat)*111.2,o=(u-Ie.lon)*111.32*Math.cos(Ie.lat*Math.PI/180);return{bearing:(Math.atan2(o,r)*180/Math.PI+360)%360,distance:Math.hypot(o,r)}}

export const Cy=-9.14,Oy=42.7,_y=737,Dy=1e3,Dh=324,Rh=350,Kt=(s,u)=>[(u-Cy)*_y,(Oy-s)*Dy];

export function Ry(s,u=!0){const r=s.map(([y,g])=>Kt(y,g)),o=r.length,d=y=>u?r[(y+o)%o]:r[Math.max(0,Math.min(o-1,y))];let m=`M${r[0][0].toFixed(1)} ${r[0][1].toFixed(1)}`;for(let y=0;y<(u?o:o-1);y++){const g=d(y-1),h=d(y),p=d(y+1),b=d(y+2),A=h[0]+(p[0]-g[0])/6,O=h[1]+(p[1]-g[1])/6,B=p[0]-(b[0]-h[0])/6,L=p[1]-(b[1]-h[1])/6;m+=` C${A.toFixed(1)} ${O.toFixed(1)} ${B.toFixed(1)} ${L.toFixed(1)} ${p[0].toFixed(1)} ${p[1].toFixed(1)}`}return m+(u?" Z":"")}

export const Ly=[[42.76,-9.02],[42.7,-9.028],[42.693,-9.034],[42.675,-9.045],[42.655,-9.055],[42.635,-9.068],[42.615,-9.072],[42.598,-9.08],[42.585,-9.083],[42.5763,-9.0902],[42.572,-9.08],[42.57,-9.066],[42.566,-9.058],[42.56,-9.05],[42.55,-9.046],[42.538,-9.043],[42.527,-9.04],[42.517,-9.036],[42.508,-9.031],[42.505,-9.024],[42.509,-9.016],[42.516,-9.012],[42.5245,-9.0125],[42.53,-9.004],[42.531,-8.992],[42.54,-8.985],[42.552,-8.986],[42.56,-8.98],[42.566,-8.972],[42.575,-8.968],[42.587,-8.956],[42.596,-8.945],[42.603,-8.933],[42.606,-8.918],[42.611,-8.902],[42.615,-8.887],[42.624,-8.878],[42.636,-8.878],[42.645,-8.866],[42.65,-8.848],[42.652,-8.83],[42.65,-8.815],[42.657,-8.8],[42.664,-8.785],[42.668,-8.768],[42.672,-8.745],[42.676,-8.72],[42.68,-8.69],[42.68,-8.64],[42.76,-8.64]],Uy=[[42.664,-8.64],[42.664,-8.7],[42.662,-8.722],[42.65,-8.74],[42.636,-8.755],[42.622,-8.772],[42.612,-8.781],[42.602,-8.772],[42.595,-8.77],[42.588,-8.783],[42.581,-8.796],[42.574,-8.808],[42.566,-8.822],[42.56,-8.832],[42.55,-8.828],[42.537,-8.822],[42.525,-8.817],[42.515,-8.816],[42.507,-8.826],[42.503,-8.84],[42.5,-8.853],[42.497,-8.866],[42.503,-8.88],[42.506,-8.893],[42.503,-8.908],[42.497,-8.922],[42.489,-8.933],[42.48,-8.935],[42.471,-8.929],[42.462,-8.915],[42.455,-8.902],[42.448,-8.889],[42.44,-8.877],[42.428,-8.873],[42.418,-8.862],[42.41,-8.845],[42.402,-8.828],[42.398,-8.81],[42.396,-8.79],[42.4,-8.765],[42.405,-8.735],[42.415,-8.71],[42.425,-8.69],[42.425,-8.64]],Hy=[[42.587,-8.872],[42.584,-8.862],[42.577,-8.856],[42.568,-8.851],[42.559,-8.849],[42.55,-8.855],[42.541,-8.861],[42.534,-8.866],[42.535,-8.875],[42.543,-8.879],[42.553,-8.882],[42.563,-8.884],[42.572,-8.886],[42.58,-8.882]],Gy=[[42.493,-9.012],[42.489,-9.003],[42.482,-8.999],[42.474,-9.001],[42.467,-9.006],[42.464,-9.012],[42.468,-9.019],[42.476,-9.021],[42.485,-9.02]],By=[[42.406,-8.931],[42.398,-8.924],[42.387,-8.923],[42.374,-8.925],[42.364,-8.929],[42.357,-8.936],[42.362,-8.944],[42.375,-8.946],[42.389,-8.945],[42.4,-8.941]],ky=[[42.55,-9.12,48],[42.5,-9.12,56],[42.45,-9.12,62],[42.4,-9.12,68],[42.37,-9.08,71],[42.52,-9.085,38],[42.47,-9.07,44],[42.42,-9.06,52],[42.44,-9.03,35],[42.4,-9,46],[42.37,-8.98,54],[42.498,-9,14],[42.47,-8.97,24],[42.49,-8.96,21],[42.45,-8.95,28],[42.42,-8.96,32],[42.43,-8.92,26],[42.41,-8.9,22],[42.52,-8.96,19],[42.53,-8.93,17],[42.51,-8.9,15],[42.55,-8.91,14],[42.57,-8.93,12],[42.585,-8.91,11],[42.6,-8.88,9],[42.595,-8.86,8],[42.61,-8.83,6],[42.63,-8.8,5],[42.64,-8.76,4],[42.54,-8.84,5],[42.52,-8.86,7],[42.5,-8.95,18],[42.62,-9.1,41],[42.66,-9.09,44],[42.6,-9.12,46],[42.69,-9.1,39],[42.38,-8.86,19],[42.37,-8.8,15],[42.36,-8.9,29],[42.39,-8.96,39]],qy=[["Corrubedo",42.586,-9.06],["Aguiño",42.532,-9.026],["Ribeira",42.563,-8.999],["A Pobra",42.618,-8.948],["Boiro",42.657,-8.892],["Rianxo",42.666,-8.83],["Vilagarcía",42.604,-8.748],["Vilanova",42.574,-8.8],["Cambados",42.516,-8.796],["O Grove",42.481,-8.887],["Sanxenxo",42.41,-8.79]],Ln="M"+[Ly,Uy,Hy,Gy,By].map(s=>Ry(s).slice(1)).join(" M"),Yy=X.memo(function(){const[u,r]=Kt(Ie.lat,Ie.lon),[o,d]=Kt(42.51,-9.004),m=[];for(let g=0;g<360;g+=10){const h=g%90===0?14:g%30===0?18:20,p=(g-90)*Math.PI/180;m.push(
  <line x1={28+22*Math.cos(p)} y1={30+22*Math.sin(p)} x2={28+h*Math.cos(p)} y2={30+h*Math.sin(p)} stroke="#6b3a55" strokeWidth={g%90===0?.6:.3} />
  )}const y=[];for(let g=0;g<32;g++){const p=(g*360/32-90)*Math.PI/180;y.push(
  <line x1="28" y1="30" x2={28+22*Math.cos(p)} y2={30+22*Math.sin(p)} stroke="#6b3a55" strokeWidth="0.15" opacity="0.6" />
  )}return <g>{
    <defs>{
      <pattern id="ch-hatch" width="3" height="3" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">{
        <line x1="0" y1="0" x2="0" y2="3" stroke="#a88c5c" strokeWidth="0.35" opacity="0.55" />
        }</pattern>
      }{
      <radialGradient id="ch-glow" cx="0.5" cy="0.5" r="0.5">{
        <stop offset="0" stopColor="#fffbe6" stopOpacity="1" />
        }{
        <stop offset="0.35" stopColor="#ffe28a" stopOpacity="0.8" />
        }{
        <stop offset="1" stopColor="#ffd35a" stopOpacity="0" />
        }</radialGradient>
      }</defs>
    }{
    <rect width={Dh} height={Rh} fill="#eef0e6" />
    }{
    <path d={Ln} fill="none" stroke="#6f93aa" strokeWidth="17" strokeLinejoin="round" opacity="0.7" />
    }{
    <path d={Ln} fill="none" stroke="#eef0e6" strokeWidth="15.6" strokeLinejoin="round" />
    }{
    <path d={Ln} fill="none" stroke="#bcd6e2" strokeWidth="8" strokeLinejoin="round" />
    }{
    <path d={Ln} fill="none" stroke="#a6c8d8" strokeWidth="3.2" strokeLinejoin="round" />
    }{
    <path d={Ln} fill="#eadcb6" stroke="#4d3a24" strokeWidth="0.75" strokeLinejoin="round" />
    }{
    <path d={Ln} fill="url(#ch-hatch)" />
    }{
    <ellipse cx={Kt(42.5494,-8.9386)[0]} cy={Kt(42.5494,-8.9386)[1]} rx="1.6" ry="1.2" fill="#eadcb6" stroke="#4d3a24" strokeWidth="0.5" />
    }{
    <ellipse cx={Kt(42.625,-8.785)[0]} cy={Kt(42.625,-8.785)[1]} rx="3" ry="1.8" fill="#eadcb6" stroke="#4d3a24" strokeWidth="0.5" />
    }{
    <line x1={Kt(42.559,-8.849)[0]} y1={Kt(42.559,-8.849)[1]} x2={Kt(42.56,-8.832)[0]} y2={Kt(42.56,-8.832)[1]} stroke="#4d3a24" strokeWidth="0.9" />
    }{ky.map(([g,h,p],b)=>{const[A,O]=Kt(g,h);return <text x={A} y={O} textAnchor="middle" fontSize="5.4" fontStyle="italic" fontFamily="IM Fell English" fill="#3f5d74">{p}</text>
    })}{
    <text transform={`translate(${Kt(42.574,-8.905).join(" ")}) rotate(-38)`} textAnchor="middle" fontSize="9" letterSpacing="3.2" fontFamily="IM Fell English" fill="#35556e">RÍA DE AROUSA</text>
    }{
    <text transform={`translate(${Kt(42.52,-9.126).join(" ")}) rotate(-90)`} textAnchor="middle" fontSize="7.4" letterSpacing="4" fontFamily="IM Fell English" fill="#35556e">OCÉANO ATLÁNTICO</text>
    }{
    <text x={Kt(42.386,-8.748)[0]} y={Kt(42.386,-8.748)[1]} textAnchor="middle" fontSize="6.2" fontStyle="italic" fontFamily="IM Fell English" fill="#35556e">Ría de Pontevedra</text>
    }{
    <text x={Kt(42.432,-8.99)[0]} y={Kt(42.432,-8.99)[1]} textAnchor="middle" fontSize="5.4" fontStyle="italic" fontFamily="IM Fell English" fill="#3f6b48">P. N. Illas Atlánticas</text>
    }{[["I. de Sálvora",42.479,-8.982],["I. de Ons",42.39,-8.905],["I. de Arousa",42.547,-8.905],["Rúa",42.556,-8.95]].map(([g,h,p])=>
    <text x={Kt(h,p)[0]} y={Kt(h,p)[1]} textAnchor="middle" fontSize="6.2" fontStyle="italic" fontFamily="IM Fell English" fill="#2c2419">{g}</text>
    )}{qy.map(([g,h,p])=>{const[b,A]=Kt(h,p);return <text x={b} y={A} textAnchor="middle" fontSize="6.6" fontStyle="italic" fontFamily="IM Fell English" fill="#3b2c1a">{g}</text>
    })}{
    <circle cx="28" cy="30" r="22" fill="none" stroke="#6b3a55" strokeWidth="0.5" />
    }{
    <circle cx="28" cy="30" r="14" fill="none" stroke="#6b3a55" strokeWidth="0.3" />
    }{y}{m}{
    <path d="M28 8.5 L25.6 30 L28 27 L30.4 30 Z" fill="#6b3a55" />
    }{
    <text x="28" y="6.6" textAnchor="middle" fontSize="5" fontFamily="Cinzel" fontWeight={700} fill="#6b3a55">N</text>
    }{
    <text x="28" y="61" textAnchor="middle" fontSize="4.2" fontStyle="italic" fontFamily="IM Fell English" fill="#6b3a55">Dm {ah}</text>
    }{
    <line x1={o} y1={d} x2={o-.8} y2={d+9} stroke="#55514a" strokeWidth="0.55" strokeDasharray="2 1.4" />
    }{
    <text x={o+4} y={d+2} fontSize="4.4" fontStyle="italic" fontFamily="IM Fell English" fill="#55514a">Rv 175°</text>
    }{
    <path d={`M${o} ${d-3.4} L${o+1.7} ${d+2.4} L${o-1.7} ${d+2.4} Z`} fill="#1a3a5c" transform={`rotate(175 ${o} ${d})`} />
    }{
    <g transform={`translate(${u} ${r})`}>{
      <circle r="5.2" fill="#b8860b" opacity="0.22" />
      }{
      <path d="M0 -3.6 L1 -1.1 L3.5 -1.1 L1.5 0.5 L2.2 3 L0 1.5 L-2.2 3 L-1.5 0.5 L-3.5 -1.1 L-1 -1.1 Z" fill="#b8860b" stroke="#5a3d10" strokeWidth="0.35" />
      }</g>
    }{
    <text x={u-12} y={r+25} textAnchor="middle" fontSize="5" fontFamily="Cinzel" fontWeight={700} letterSpacing="0.4" fill="#7a5a14">ILLAS ATLÁNTICAS ÁTICO</text>
    }{
    <g transform="translate(8 298)">{
      <rect width="124" height="46" fill="#f4efdd" stroke="#4d3a24" strokeWidth="0.6" />
      }{
      <rect x="2" y="2" width="120" height="42" fill="none" stroke="#4d3a24" strokeWidth="0.3" />
      }{
      <text x="62" y="11" textAnchor="middle" fontSize="5" letterSpacing="2" fontFamily="Cinzel" fontWeight={700} fill="#2c2419">CARTA NÁUTICA</text>
      }{
      <text x="62" y="22" textAnchor="middle" fontSize="10" fontStyle="italic" fontFamily="IM Fell English" fill="#1a3a5c">Ría de Arousa</text>
      }{
      <text x="62" y="30.5" textAnchor="middle" fontSize="4.6" fontStyle="italic" fontFamily="IM Fell English" fill="#2c2419">De Corrubedo a la Isla de Ons</text>
      }{
      <text x="62" y="38.5" textAnchor="middle" fontSize="3.9" fontFamily="IM Fell English" fill="#4d3a24">Escala aprox. 1:150 000 · Sondas en metros</text>
      }</g>
    }{
    <g transform="translate(258 334)">{[0,1,2].map(g=>
      <rect x={g*16.67} y="0" width="16.67" height="2.4" fill={g%2?"#f4efdd":"#2c2419"} stroke="#2c2419" strokeWidth="0.3" />
      )}{[0,1,2,3].map(g=>
      <text x={g*16.67} y="8.5" textAnchor="middle" fontSize="4.4" fontFamily="IM Fell English" fill="#2c2419">{g}</text>
      )}{
      <text x="25" y="-2.5" textAnchor="middle" fontSize="4.2" fontStyle="italic" fontFamily="IM Fell English" fill="#2c2419">millas náuticas</text>
      }</g>
    }{
    <g opacity="0.92">{
      <path d="M232 22 L206 82 L207.6 82.6 Z" fill="#c9a24e" stroke="#6b4a14" strokeWidth="0.3" />
      }{
      <path d="M232 22 L262 78 L260.6 79 Z" fill="#b88c3c" stroke="#6b4a14" strokeWidth="0.3" />
      }{
      <circle cx="232" cy="22" r="3.2" fill="#e2c071" stroke="#6b4a14" strokeWidth="0.4" />
      }{
      <circle cx="232" cy="22" r="1" fill="#6b4a14" />
      }</g>
    }</g>
  }),Zy={salvora:[-3,11,"middle"],corrubedo:[-6,-4,"end"],ons:[-6,2,"end"],rua:[5,-3,"start"],cabalo:[-5,-4,"end"]};

export function Xy({windDir:s = undefined,windSpeed:u = undefined,currentVel:r = undefined,currentDir:o = undefined}){const d=X.useRef({});qn(()=>{const L=Date.now()/1e3;dr.forEach((D,q)=>{const V=d.current[D.id];V&&(V.style.opacity=nh(D.seq,L,q*3.7)?"1":"0")})});const[m,y]=Kt(42.49,-9.06),g=u??0,h=[];let p=Math.round(g/5)*5,b=0;for(;p>=50;)h.push(
  <path d={`M0 ${-22+b} L7 ${-20.5+b} L0 ${-18+b} Z`} fill="#1a3a5c" />
  ),p-=50,b+=5;for(;p>=10;)h.push(
  <line x1="0" y1={-22+b} x2="7" y2={-24.5+b} stroke="#1a3a5c" strokeWidth="0.8" />
  ),p-=10,b+=3;p>=5&&h.push(
  <line x1="0" y1={-22+b} x2="3.8" y2={-23.4+b} stroke="#1a3a5c" strokeWidth="0.8" />
  );const[A,O]=Kt(42.455,-9.095),B=8+Math.min(14,(r??0)*18);return <div className="flex h-full flex-col gap-3">{
    <div className="relative isolate rounded-[12px] p-[10px] wood inst-shadow">{
      <div className="lacquer rounded-[12px]" />
      }{["left-0 top-0","right-0 top-0","left-0 bottom-0","right-0 bottom-0"].map(L=>
      <span className={`absolute ${L} h-[10px] w-[10px] rounded-[2px] brass-flat`} />
      )}{
      <div className="shade rounded-[12px]" />
      }{
      <div className="relative isolate z-[6] overflow-hidden rounded-[3px] shadow-[inset_0_0_0_1px_rgba(0,0,0,.4)]">{
        <svg viewBox={`0 0 ${Dh} ${Rh}`} className="block h-auto w-full" aria-label="Carta náutica de la Ría de Arousa">{
          <Yy />
          }{dr.map(L=>{const[D,q]=Kt(L.lat,L.lon),[V,et,ct]=Zy[L.id]??[5,0,"start"];return <g>{
            <path d={`M${D} ${q} C ${D+3} ${q-4} ${D+7} ${q-8} ${D+9} ${q-10} C ${D+8} ${q-6} ${D+5} ${q-2} ${D} ${q} Z`} fill="#b0307a" opacity="0.8" />
            }{
            <circle ref={P=>{d.current[L.id]=P}} cx={D} cy={q} r="7.5" fill="url(#ch-glow)" style={{transition:"opacity 90ms linear",opacity:0}} />
            }{
            <circle cx={D} cy={q} r="1.3" fill="#2c2419" />
            }{
            <text x={D+V} y={q+et} textAnchor={ct} fontSize="4.5" fontFamily="IM Fell English" fill="#6b1f4f">{L.char} {L.range}</text>
            }</g>
          })}{s!=null&&
          <g transform={`translate(${m} ${y}) rotate(${s})`}>{
            <line x1="0" y1="0" x2="0" y2="-22" stroke="#1a3a5c" strokeWidth="0.8" />
            }{h}{
            <circle r="2" fill="none" stroke="#1a3a5c" strokeWidth="0.7" />
            }</g>
          }{
          <text x={m+4} y={y+8} fontSize="4.4" fontStyle="italic" fontFamily="IM Fell English" fill="#1a3a5c">viento {kt(u,0)} kn {xa(s)}</text>
          }{o!=null&&
          <g transform={`translate(${A} ${O}) rotate(${o})`}>{
            <line x1="0" y1={B/2} x2="0" y2={-B/2} stroke="#2f6f8a" strokeWidth="0.9" />
            }{
            <path d={`M0 ${-B/2-3} L-2.2 ${-B/2+1} L2.2 ${-B/2+1} Z`} fill="#2f6f8a" />
            }</g>
          }{
          <text x={A} y={O+14} textAnchor="middle" fontSize="4.4" fontStyle="italic" fontFamily="IM Fell English" fill="#2f6f8a">corriente {kt(r,1)} kn</text>
          }</svg>
        }{
        <div className="pointer-events-none absolute inset-0 mix-blend-multiply" style={{opacity:.55,backgroundImage:`url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.55  0 0 0 0 0.42  0 0 0 0 0.22  0 0 0 0.35 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`}} />
        }{
        <div className="pointer-events-none absolute inset-0" style={{boxShadow:"inset 0 0 40px rgba(120,80,30,.35)"}} />
        }{
        <div className="shade shade-chart" />
        }{
        <div className="pointer-events-none absolute inset-0 z-[6]" style={{background:"linear-gradient(calc(var(--light-angle) + 160deg), rgba(var(--light-rgb), calc(var(--light-int) * .16)) 0%, rgba(255,255,255,0) 30%)"}} />
        }</div>
      }</div>
    }{
    <Il title="CARTA NÁUTICA" className="mt-auto">Faros en servicio con su característica real · Sálvora GpD(3+1) B 20s</Il>
    }</div>
  }
const Il=il;
