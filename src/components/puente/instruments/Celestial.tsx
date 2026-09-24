/*
 * instruments/Celestial.tsx · Puente de Mando — Illas Atlánticas Ático
 * Portado del diseño validado: mismas clases, rótulos y geometría que el DOM de Arena.
 */
// Esfera celeste (sol y luna) y almanaque náutico.
import { Ec, qa } from '../config';
import { kt } from '../data';
import { Fe, Ix, X1, ep, lp, ph } from '../astro';
import { il, mr, wc } from '../parts';

export const Un=s=>{const u=((s-Ec)%360+360)%360;return u>qa?null:14+u/qa*332},Yt=s=>128-Math.max(-22,s)*1.45;

export function eh(s){const u=[];let r="";for(const o of s){const d=Un(o.az);if(d==null||o.alt<-20){r&&u.push(r),r="";continue}r+=`${r?"L":"M"}${d.toFixed(1)} ${Yt(o.alt).toFixed(1)} `}return r&&u.push(r),u}

export function Ba({k:s = undefined,v:u = undefined}){return <div className="flex items-baseline justify-between gap-3 border-b border-[#8a6a3a]/20 py-[3px] last:border-0">{
    <span className="font-display text-[9.5px] tracking-[0.18em] text-[#5a4526]">{s}</span>
    }{
    <span className="text-right font-serif text-[14px] font-semibold leading-tight text-[#1f1810]">{u}</span>
    }</div>
  }

export function Ny({almanac:s = undefined,sky:u = undefined,lighting:r = undefined,date:o = undefined,uvMax:d = undefined,sunshine:m = undefined,radiationSum:y = undefined}){const g=Un(u.sunAz),h=Un(u.moonAz),p=u.moonPhase*lp,b=s.sunriseAz!=null?Un(s.sunriseAz):null,A=s.sunsetAz!=null?Un(s.sunsetAz):null,O=r.source==="moon"?"☾":r.source==="night"?"✦":"☉";return <div className="flex h-full flex-col gap-4">{
    <div className="grid gap-4 lg:grid-cols-[1.25fr_1fr]">{
      <div className="relative isolate overflow-hidden rounded-[10px] p-[5px] brass-flat inst-shadow">{
        <div className="relative overflow-hidden rounded-[6px]">{
          <svg viewBox="0 0 360 184" className="block h-auto w-full" aria-label="Trayectoria del Sol y la Luna hoy">{
            <defs>{
              <linearGradient id="alm-sky" x1="0" y1="0" x2="0" y2="1">{
                <stop offset="0" stopColor="#fbf6e8" />
                }{
                <stop offset="1" stopColor="#efe4c8" />
                }</linearGradient>
              }</defs>
            }{
            <rect width="360" height="184" fill="url(#alm-sky)" />
            }{
            <rect x="0" y={Yt(0)} width="360" height={Yt(-6)-Yt(0)} fill="#d6e0ea" />
            }{
            <rect x="0" y={Yt(-6)} width="360" height={Yt(-12)-Yt(-6)} fill="#b3c3d8" />
            }{
            <rect x="0" y={Yt(-12)} width="360" height={Yt(-18)-Yt(-12)} fill="#8c9ebf" />
            }{
            <rect x="0" y={Yt(-18)} width="360" height={184-Yt(-18)} fill="#63759b" />
            }{[15,30,45,60,75].map(B=>
            <g>{
              <line x1="14" x2="346" y1={Yt(B)} y2={Yt(B)} stroke="#b8a27a" strokeWidth="0.4" strokeDasharray="1.5 2.5" />
              }{
              <text x="11" y={Yt(B)+2} textAnchor="end" fontSize="6" fontFamily="Cormorant Garamond" fontWeight={700} fill="#6b5634">{B}°</text>
              }</g>
            )}{[45,90,135,180,225,270,315].map(B=>{const L=Un(B),D={45:"NE",90:"E",135:"SE",180:"S",225:"SW",270:"W",315:"NW"}[B];return <g>{
              <line x1={L} x2={L} y1={Yt(0)} y2={Yt(0)+4} stroke="#3a2c18" strokeWidth="0.6" />
              }{
              <text x={L} y={177} textAnchor="middle" fontSize="7" fontFamily="Cinzel" fontWeight={700} fill="#f4ead0">{D}</text>
              }</g>
            })}{
            <text x="350" y={Yt(-3)+2} textAnchor="end" fontSize="4.6" fontStyle="italic" fontFamily="Cormorant Garamond" fill="#3a4a66">civil</text>
            }{
            <text x="350" y={Yt(-9)+2} textAnchor="end" fontSize="4.6" fontStyle="italic" fontFamily="Cormorant Garamond" fill="#243451">náutico</text>
            }{
            <text x="350" y={Yt(-15)+2} textAnchor="end" fontSize="4.6" fontStyle="italic" fontFamily="Cormorant Garamond" fill="#e8eef8">astronómico</text>
            }{
            <line x1="0" x2="360" y1={Yt(0)} y2={Yt(0)} stroke="#3a2c18" strokeWidth="0.9" />
            }{eh(s.moonPath).map((B,L)=>
            <path d={B} fill="none" stroke="#6f7f9f" strokeWidth="1" strokeDasharray="3 2.2" />
            )}{eh(s.sunPath).map((B,L)=>
            <path d={B} fill="none" stroke="#b8860b" strokeWidth="1.5" />
            )}{b!=null&&
            <text x={b} y={Yt(0)-4} textAnchor="middle" fontSize="5.6" fontFamily="Cormorant Garamond" fontWeight={700} fill="#7a5a14">orto {Fe(s.sunrise)}</text>
            }{A!=null&&
            <text x={A} y={Yt(0)-4} textAnchor="middle" fontSize="5.6" fontFamily="Cormorant Garamond" fontWeight={700} fill="#7a5a14">ocaso {Fe(s.sunset)}</text>
            }{h!=null&&u.moonAlt>-20&&
            <g transform={`translate(${h} ${Yt(u.moonAlt)})`} opacity={u.moonAlt<0?.55:1}>{
              <circle r="9" fill="#dfe6f2" opacity="0.35" />
              }{
              <Mr id="alm-moon" r={6} fraction={u.moonFraction} limbAngle={u.moonLimbAngle} earthshine={.9} />
              }</g>
            }{g!=null&&u.sunAlt>-20&&
            <g transform={`translate(${g} ${Yt(u.sunAlt)})`} opacity={u.sunAlt<0?.5:1}>{
              <circle r="11" fill="#f6c94c" opacity="0.28" />
              }{Array.from({length:12},(B,L)=>{const D=L*Math.PI/6;return <line x1={7.5*Math.cos(D)} y1={7.5*Math.sin(D)} x2={10*Math.cos(D)} y2={10*Math.sin(D)} stroke="#b8860b" strokeWidth="0.8" />
              })}{
              <circle r="5.6" fill="#f3c33c" stroke="#8a6120" strokeWidth="0.7" />
              }</g>
            }{
            <text x="16" y="12" fontSize="6" letterSpacing="1.6" fontFamily="Cinzel" fontWeight={700} fill="#5a4526">ESFERA CELESTE · AGUIÑO</text>
            }</svg>
          }</div>
        }{
        <div className="shade shade-lamp-soft rounded-[10px]" />
        }</div>
      }{
      <div className="grid gap-3">{
        <Wc className="px-4 py-2.5">{
          <div className="mb-1 font-display text-[10px] tracking-[0.3em] text-[#7a5a14]">☉ SOL</div>
          }{
          <Ba k="ORTO" v={`${Fe(s.sunrise)} · ${s.sunriseAz!=null?Math.round(s.sunriseAz):"—"}°`} />
          }{
          <Ba k="OCASO" v={`${Fe(s.sunset)} · ${s.sunsetAz!=null?Math.round(s.sunsetAz):"—"}°`} />
          }{
          <Ba k="CULMINACIÓN" v={`${Fe(s.solarNoon)} · ${kt(s.noonAlt,1)}°`} />
          }{
          <Ba k="DURACIÓN" v={Ix(s.dayLength)} />
          }{
          <Ba k="CREP. NÁUTICO" v={`${Fe(s.nauticalDawn)} – ${Fe(s.nauticalDusk)}`} />
          }</Wc>
        }{
        <Wc className="px-4 py-2.5">{
          <div className="flex items-center gap-3">{
            <svg viewBox="-26 -26 52 52" className="h-14 w-14 shrink-0 rounded-full bg-[#0f1a2e]" aria-hidden={true}>{
              <Mr id="alm-moon-big" r={21} fraction={u.moonFraction} limbAngle={u.moonLimbAngle} />
              }</svg>
            }{
            <div className="min-w-0">{
              <div className="font-display text-[10px] tracking-[0.3em] text-[#44506a]">☾ LUNA</div>
              }{
              <div className="font-serif text-[17px] font-semibold leading-tight text-[#1f1810]">{ep(u.moonPhase)}</div>
              }{
              <div className="font-serif text-[13px] italic text-[#4a3c28]">{Math.round(u.moonFraction*100)} % iluminada · {kt(p,1)} días</div>
              }</div>
            }</div>
          }{
          <Ba k="SALIDA · PUESTA" v={`${Fe(s.moonrise)} · ${Fe(s.moonset)}`} />
          }{
          <Ba k="LLENA · NUEVA" v={`${X1(s.nextFull)} · ${X1(s.nextNew)}`} />
          }</Wc>
        }</div>
      }</div>
    }{
    <Wc className="px-4 py-3">{
      <div className="flex flex-wrap items-center justify-between gap-2">{
        <div className="flex items-center gap-2">{
          <span className="text-xl leading-none text-[#8a6120]">{O}</span>
          }{
          <span className="font-display text-[10px] tracking-[0.3em] text-[#5a4526]">LUZ QUE BAÑA EL PUENTE</span>
          }</div>
        }{
        <span className="font-serif text-[15px] font-semibold text-[#1f1810]">{r.title} · {r.value}</span>
        }</div>
      }{
      <div className="relative mt-2 h-3 overflow-hidden rounded-full bg-[#2a1d0c] shadow-[inset_0_1px_3px_rgba(0,0,0,.6)]">{
        <div className="absolute inset-y-0 left-0 rounded-full transition-[width] duration-1000" style={{width:`${Math.max(2,r.percent)}%`,background:r.source==="moon"||r.source==="night"?"linear-gradient(90deg,#5d6f95,#c9d6f0)":"linear-gradient(90deg,#b8651e,#f3c33c,#fff1c2)"}} />
        }{[25,50,75].map(B=>
        <span className="absolute inset-y-0 w-px bg-black/40" style={{left:`${B}%`}} />
        )}</div>
      }{
      <div className="mt-1.5 flex flex-wrap justify-between gap-2 font-serif text-[13px] italic text-[#4a3c28]">{
        <span>{r.detail}</span>
        }{
        <span>UV máx. hoy {kt(d,0)}</span>
        }</div>
      }{(m!=null||y!=null)&&
      <div className="mt-1 border-t border-[#8a6a3a]/20 pt-1.5 font-serif text-[13px] text-[#2c2216]">{
        <span className="font-display text-[9px] tracking-[0.2em] text-[#5a4526]">INTENSIDAD DEL DÍA · </span>
        }{m!=null&&
        <span>{Math.floor(m/3600)} h {String(Math.round(m%3600/60)).padStart(2,"0")} min de sol efectivo</span>
        }{y!=null&&
        <span> · {kt(y,1)} MJ/m² de radiación</span>
        }</div>
      }</Wc>
    }{
    <Il title="ALMANAQUE NÁUTICO" className="mt-auto">{
      <span className="capitalize">{ph(o)}</span>
      } · efemérides para 42°31′ N 9°01′ W</Il>
    }</div>
  }
const Il=il, Mr=mr, Wc=wc;
