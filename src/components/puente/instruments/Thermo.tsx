/*
 * instruments/Thermo.tsx · Puente de Mando — Illas Atlánticas Ático
 * Portado del diseño validado: mismas clases, rótulos y geometría que el DOM de Arena.
 */
// Termohigrómetro: aire, humedad, mar y confort.
import * as X from 'react';
import { kt } from '../data';
import { At, Wt, ce, me } from '../astro';
import { $n, il } from '../parts';
import { t } from '../../../i18n/translate';

export const Ya=s=>-80+(Math.min(41,Math.max(-11,s))+10)/50*160,ha=s=>260-Math.min(100,Math.max(0,s))/100*160;

export function py(s){const u=[61,111,182],r=[214,190,105],o=[184,67,47];return`rgb(${ce(s<17?Wt(u,r,(s+10)/27):Wt(r,o,(s-17)/23))})`}

export const yy=X.memo(function(){const u=[];for(let r=-10;r<=40;r++){const o=Ya(r),d=r%10===0,m=r%5===0,[y,g]=At(100,100,86,o),[h,p]=At(100,100,d?77.5:m?80:82.5,o);if(u.push(
  <line x1={y} y1={g} x2={h} y2={p} stroke="#1d1812" strokeWidth={d?1.15:m?.75:.4} />
  ),d){const[b,A]=At(100,100,69.5,o);u.push(
  <text x={b} y={A+2.7} textAnchor="middle" fontSize="7.8" fontFamily="Cormorant Garamond" fontWeight={700} fill="#17120c">{r}</text>
  )}r<40&&u.push(
  <path d={me(100,100,89.4,Ya(r),Ya(r+1)+.2)} fill="none" stroke={py(r+.5)} strokeWidth="2.6" />
  )}for(let r=0;r<=100;r+=2){const o=ha(r),d=r%10===0,[m,y]=At(100,100,86,o),[g,h]=At(100,100,d?78:82.5,o);if(u.push(
  <line x1={m} y1={y} x2={g} y2={h} stroke="#1d1812" strokeWidth={d?1.05:.42} />
  ),r%20===0){const[p,b]=At(100,100,69.5,o);u.push(
  <text x={p} y={b+2.7} textAnchor="middle" fontSize="7.8" fontFamily="Cormorant Garamond" fontWeight={700} fill="#17120c">{r}</text>
  )}}return <g>{
    <path d={me(100,100,86,Ya(-10),Ya(40))} fill="none" stroke="#1d1812" strokeWidth="0.5" />
    }{
    <path d={me(100,100,86,ha(100),ha(0))} fill="none" stroke="#1d1812" strokeWidth="0.5" />
    }{
    <path d={me(100,100,89.4,ha(100),ha(0))} fill="none" stroke="#cbbf9c" strokeWidth="2.6" />
    }{
    <path d={me(100,100,89.4,ha(60),ha(40))} fill="none" stroke="#4f8a5b" strokeWidth="2.6" />
    }{u}{
    <text x="100" y="53" textAnchor="middle" fontSize="9" fontFamily="Cormorant Garamond" fontWeight={600} fill="#17120c">°C</text>
    }{
    <text x="100" y="61" textAnchor="middle" fontSize="4.3" letterSpacing="1.4" fontFamily="Cinzel" fill="#3a3024">TEMPERATURA</text>
    }{
    <text x="100" y="121" textAnchor="middle" fontSize="5.2" fontStyle="italic" fontFamily="Cormorant Garamond" fill="#3a3024">{t("Illas Atlánticas")}</text>
    }{
    <text x="100" y="141" textAnchor="middle" fontSize="4.3" letterSpacing="1.4" fontFamily="Cinzel" fill="#3a3024">HUMEDAD</text>
    }{
    <text x="100" y="150.5" textAnchor="middle" fontSize="9" fontFamily="Cormorant Garamond" fontWeight={600} fill="#17120c">%</text>
    }{
    <text x="100" y="164" textAnchor="middle" fontSize="3.9" letterSpacing="1" fontFamily="Cinzel" fill="#4f8a5b">CONFORT</text>
    }</g>
  });

export function gy({temp:s = undefined,rh:u = undefined,sst:r = undefined,apparent:o = undefined}){const d=s??18,m=u??70,y=Ya(r??16);return <div className="flex flex-col items-center gap-3">{
    <$n dial="ivory" className="max-w-[300px]">{
      <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full" aria-hidden={true}>{
        <defs>{
          <linearGradient id="th-blued" x1="0" y1="0" x2="1" y2="1">{
            <stop offset="0" stopColor="#0d1a45" />
            }{
            <stop offset="0.5" stopColor="#2f55ad" />
            }{
            <stop offset="1" stopColor="#12275f" />
            }</linearGradient>
          }{
          <linearGradient id="th-gilt" x1="0" y1="0" x2="1" y2="0">{
            <stop offset="0" stopColor="#8a6120" />
            }{
            <stop offset="0.5" stopColor="#f3d68e" />
            }{
            <stop offset="1" stopColor="#8a6120" />
            }</linearGradient>
          }</defs>
        }{
        <Yy />
        }{r!=null&&
        <g transform={`rotate(${y} 100 100)`}>{
          <path d="M100 8.2 L97 3 L103 3 Z" fill="#163353" />
          }{
          <text x="100" y="15.6" textAnchor="middle" fontSize="3.6" fontFamily="Cinzel" fontWeight={700} fill="#163353">MAR</text>
          }</g>
        }{
        <g className="needle" style={{transform:`rotate(${ha(m)}deg)`,transformOrigin:"100px 100px"}}>{
          <path d="M99.3 110 L99.5 26 L100 18 L100.5 26 L100.7 110 Z" fill="#1c1914" />
          }{
          <path d="M99.5 26 L100 18 L100.5 26 Z" fill="url(#th-gilt)" />
          }</g>
        }{
        <g className="needle" style={{transform:`rotate(${Ya(d)}deg)`,transformOrigin:"100px 100px"}}>{
          <path d="M99.2 112 L99.45 30 L100 17 L100.55 30 L100.8 112 Z" fill="url(#th-blued)" />
          }{
          <circle cx="100" cy="112" r="2.4" fill="url(#th-blued)" />
          }</g>
        }{
        <circle cx="100" cy="100" r="4.6" fill="url(#th-gilt)" stroke="rgba(60,35,5,.5)" strokeWidth="0.4" />
        }{
        <circle cx="100" cy="100" r="1.4" fill="#1c1914" />
        }</svg>
      }</$n>
    }{
    <Il title="TERMOHIGRÓMETRO">Aire {kt(s,1)} °C · HR {kt(u,0)} % · Mar {kt(r,1)} °C{
      <span className="block text-[12px] not-italic tracking-wide opacity-80">Sensación térmica {kt(o,1)} °C</span>
      }</Il>
    }</div>
  }
const Il=il, Yy=yy;
