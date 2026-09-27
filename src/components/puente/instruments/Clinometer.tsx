/*
 * instruments/Clinometer.tsx · Puente de Mando — Illas Atlánticas Ático
 * Portado del diseño validado: mismas clases, rótulos y geometría que el DOM de Arena.
 */
// Clinómetro (babor/estribor) y estado de la mar (Douglas).
import * as X from 'react';
import { Ft, Nx, kt, qn, xa } from '../data';
import { Rl, il, wc } from '../parts';
import { t } from '../../../i18n/translate';

export const ll=120,al=12,nl=104,Ii=(s,u)=>[ll+u*Math.sin(s*Math.PI/180),al+u*Math.cos(s*Math.PI/180)],Nc={borderRadius:"18px 18px 50% 50% / 18px 18px 100% 100%"};

export function fr(s,u,r){const[o,d]=Ii(u,s),[m,y]=Ii(r,s);return`M${o.toFixed(2)} ${d.toFixed(2)} A ${s} ${s} 0 0 0 ${m.toFixed(2)} ${y.toFixed(2)}`}

export const Ey=X.memo(function(){const u=[];for(let r=-40;r<=40;r++){const o=r%10===0,d=r%5===0,[m,y]=Ii(r,nl),[g,h]=Ii(r,o?nl-11:d?nl-8:nl-5);if(u.push(
  <line x1={m} y1={y} x2={g} y2={h} stroke="#1d1812" strokeWidth={o?1.1:d?.7:.35} />
  ),o){const[p,b]=Ii(r,nl-19);u.push(
  <text x={p} y={b+2.8} textAnchor="middle" fontSize="8" fontFamily="Cormorant Garamond" fontWeight={700} fill="#17120c">{Math.abs(r)}</text>
  )}}return <g>{
    <path d={fr(nl,-40,40)} fill="none" stroke="#1d1812" strokeWidth="0.5" />
    }{
    <path d={fr(nl+3.4,-40,-1)} fill="none" stroke="#a3342a" strokeWidth="3.2" opacity="0.85" />
    }{
    <path d={fr(nl+3.4,1,40)} fill="none" stroke="#2f6f4a" strokeWidth="3.2" opacity="0.85" />
    }{u}{
    <text x="58" y="44" textAnchor="middle" fontSize="7.4" letterSpacing="1.6" fontFamily="Cinzel" fontWeight={700} fill="#a3342a">BABOR</text>
    }{
    <text x="182" y="44" textAnchor="middle" fontSize="7.4" letterSpacing="1.6" fontFamily="Cinzel" fontWeight={700} fill="#2f6f4a">ESTRIBOR</text>
    }{
    <text x="120" y="58" textAnchor="middle" fontSize="5.4" letterSpacing="1.4" fontFamily="Cinzel" fill="#3a3024">ILLAS ATLÁNTICAS</text>
    }{
    <text x="120" y="65" textAnchor="middle" fontSize="4.6" fontStyle="italic" fontFamily="Cormorant Garamond" fill="#3a3024">{t("Clinómetro de péndulo")}</text>
    }</g>
  });

export function Ty({degree:s = undefined}){return <div className="mt-2 grid grid-cols-10 gap-[3px]">{Array.from({length:10},(u,r)=>
    <div className="flex flex-col items-center gap-0.5">{
      <div className="h-2.5 w-full rounded-[2px]" style={{background:r===s?"#163353":r<s?"rgba(22,51,83,.35)":"transparent",boxShadow:"inset 0 0 0 1px rgba(22,51,83,.45)"}} />
      }{
      <span className={`font-serif text-[11px] font-bold ${r===s?"text-[#163353]":"text-[#8a7a5a]"}`}>{r}</span>
      }</div>
    )}</div>
  }

export function wy({cond:s = undefined}){const u=X.useRef(null),r=Ft(.6+(s.waveHeight??1)*2.6,.5,22),o=Ft(s.wavePeriod??8,4,16),d=Nx(s.waveHeight);return qn(m=>{const y=r*Math.sin(2*Math.PI*m/o)+.3*r*Math.sin(2*Math.PI*m/(o*1.63)+.7)+.1*r*Math.sin(2*Math.PI*m/(o*.53)+2);u.current?.setAttribute("transform",`rotate(${(-y).toFixed(2)} ${ll} ${al})`)}),
  <div className="flex h-full flex-col items-center gap-4">{
    <div className="relative isolate aspect-[2/1.12] w-full max-w-[400px] brass-flat inst-shadow" style={Nc}>{
      <Rl x="7%" y="11%" size="11px" rot={30} />
      }{
      <Rl x="93%" y="11%" size="11px" rot={120} />
      }{
      <div className="absolute overflow-hidden dial-ivory" style={{...Nc,inset:"4.5%"}}>{
        <svg viewBox="0 0 240 134" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMin meet" aria-hidden={true}>{
          <defs>{
            <linearGradient id="cl-blued" x1="0" y1="0" x2="1" y2="1">{
              <stop offset="0" stopColor="#0d1a45" />
              }{
              <stop offset="0.5" stopColor="#2f55ad" />
              }{
              <stop offset="1" stopColor="#12275f" />
              }</linearGradient>
            }{
            <radialGradient id="cl-bob" cx="0.35" cy="0.3" r="0.8">{
              <stop offset="0" stopColor="#fff3c8" />
              }{
              <stop offset="0.45" stopColor="#cfa24c" />
              }{
              <stop offset="1" stopColor="#5e4111" />
              }</radialGradient>
            }</defs>
          }{
          <Ey />
          }{
          <g ref={u} transform={`rotate(0 ${ll} ${al})`}>{
            <path d={`M${ll-.9} ${al} L${ll-.5} ${al+nl-2} L${ll} ${al+nl+2} L${ll+.5} ${al+nl-2} L${ll+.9} ${al} Z`} fill="url(#cl-blued)" />
            }{
            <ellipse cx={ll} cy={al+72} rx="6" ry="8" fill="url(#cl-bob)" stroke="rgba(60,35,5,.6)" strokeWidth="0.4" />
            }</g>
          }{
          <circle cx={ll} cy={al} r="5.4" fill="url(#cl-bob)" stroke="rgba(60,35,5,.6)" strokeWidth="0.5" />
          }{
          <circle cx={ll} cy={al} r="1.6" fill="#1d1812" />
          }</svg>
        }</div>
      }{
      <div className="shade shade-lamp" style={Nc} />
      }{
      <div className="glass" style={{...Nc,inset:"4.5%"}} />
      }</div>
    }{
    <Wc className="w-full max-w-[400px] px-4 py-3">{
      <div className="flex flex-wrap items-baseline justify-between gap-x-3">{
        <span className="font-display text-[10px] tracking-[0.3em] text-[#44506a]">ESTADO DE LA MAR</span>
        }{
        <span className="font-serif text-[15px] font-semibold text-[#163353]">Douglas {d.degree} · {d.name}</span>
        }</div>
      }{
      <Ty degree={d.degree} />
      }{
      <div className="mt-2 grid grid-cols-[auto_1fr] gap-x-4 gap-y-0.5 font-serif text-[14px] leading-snug text-[#1f1810]">{
        <span className="font-display text-[9.5px] tracking-[0.16em] text-[#5a4526] self-center">OLA</span>
        }{
        <span className="text-right font-semibold">{kt(s.waveHeight,1)} m · {kt(s.wavePeriod,0)} s · del {xa(s.waveDir)}</span>
        }{
        <span className="font-display text-[9.5px] tracking-[0.16em] text-[#5a4526] self-center">MAR DE FONDO</span>
        }{
        <span className="text-right font-semibold">{kt(s.swellHeight,1)} m · {kt(s.swellPeriod,0)} s · {xa(s.swellDir)}</span>
        }{
        <span className="font-display text-[9.5px] tracking-[0.16em] text-[#5a4526] self-center">MAR DE VIENTO</span>
        }{
        <span className="text-right font-semibold">{kt(s.windWaveHeight,1)} m</span>
        }{
        <span className="font-display text-[9.5px] tracking-[0.16em] text-[#5a4526] self-center">AGUA</span>
        }{
        <span className="text-right font-semibold">{kt(s.sst,1)} °C</span>
        }{
        <span className="font-display text-[9.5px] tracking-[0.16em] text-[#5a4526] self-center">CORRIENTE</span>
        }{
        <span className="text-right font-semibold">{kt(s.currentVel,1)} kn hacia el {xa(s.currentDir)}</span>
        }</div>
      }</Wc>
    }{
    <Il title="CLINÓMETRO" className="mt-auto">Balance ±{kt(r,1)}° · periodo {kt(o,0)} s</Il>
    }</div>
  }
const Il=il, Wc=wc;
