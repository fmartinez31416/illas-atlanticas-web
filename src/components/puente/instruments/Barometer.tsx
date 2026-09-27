/*
 * instruments/Barometer.tsx · Puente de Mando — Illas Atlánticas Ático
 * Portado del diseño validado: mismas clases, rótulos y geometría que el DOM de Arena.
 */
// Barómetro aneroide en hPa con escala en mm Hg.
import * as X from 'react';
import { kt, wx } from '../data';
import { At, me } from '../astro';
import { $n, il } from '../parts';
import { t } from '../../../i18n/translate';

export const Fi=950,_c=1060,Dc=-135,yr=135,or=.750062,We=s=>Dc+(Math.min(_c+4,Math.max(Fi-4,s))-Fi)/(_c-Fi)*(yr-Dc),ry=[["TEMPESTAD",960],["LLUVIA",985],["VARIABLE",1005],["BUEN TIEMPO",1025],["MUY SECO",1045]];

export function fy({id:s = undefined,text:u = undefined,angle:r = undefined,r:o = undefined,size:d = undefined,color:m = undefined}){const g=Math.abs(r)>95?me(100,100,o+d*.72,r+34,r-34):me(100,100,o,r-34,r+34);return <g>{
    <path id={s} d={g} fill="none" />
    }{
    <text fontSize={d} fontFamily="Cinzel" fontWeight={600} letterSpacing="1.1" fill={m}>{
      <textPath href={`#${s}`} startOffset="50%" textAnchor="middle">{u}</textPath>
      }</text>
    }</g>
  }

export const dy=X.memo(function(){const u=[];for(let d=Fi;d<=_c;d++){const m=We(d),y=d%10===0,g=d%5===0,[h,p]=At(100,100,86.5,m),[b,A]=At(100,100,y?76:g?79.5:82.5,m);u.push(
  <line x1={h} y1={p} x2={b} y2={A} stroke="#1d1812" strokeWidth={y?1.25:g?.8:.42} />
  )}const r=[];for(let d=Fi;d<=_c;d+=10){const[m,y]=At(100,100,66.5,We(d));r.push(
  <text x={m} y={y+2.8} textAnchor="middle" fontSize="8" fontFamily="Cormorant Garamond" fontWeight={700} fill="#17120c">{d}</text>
  )}const o=[];for(let d=714;d<=794;d+=2){const m=We(d/or),y=d%10===0,[g,h]=At(100,100,45,m),[p,b]=At(100,100,y?39.5:42,m);if(o.push(
  <line x1={g} y1={h} x2={p} y2={b} stroke="#3a3024" strokeWidth={y?.8:.4} />
  ),y){const[A,O]=At(100,100,33.5,m);o.push(
  <text x={A} y={O+1.9} textAnchor="middle" fontSize="5.3" fontStyle="italic" fontFamily="Cormorant Garamond" fontWeight={600} fill="#3a3024">{d}</text>
  )}}return <g>{
    <path d={me(100,100,86.5,Dc,yr)} fill="none" stroke="#1d1812" strokeWidth="0.6" />
    }{
    <path d={me(100,100,76,Dc,yr)} fill="none" stroke="#1d1812" strokeWidth="0.35" />
    }{
    <path d={me(100,100,88.8,We(950),We(975))} fill="none" stroke="#8c2f22" strokeWidth="1.6" opacity="0.75" />
    }{
    <path d={me(100,100,88.8,We(1030),We(1060))} fill="none" stroke="#b58a2e" strokeWidth="1.6" opacity="0.8" />
    }{u}{r}{ry.map(([d,m],y)=>
    <Fy id={`baro-w${y}`} text={d} angle={We(m)} r={54} size={6.1} color={y===0?"#7a2a1e":"#2a2217"} />
    )}{
    <path d={me(100,100,45,We(714/or),We(794/or))} fill="none" stroke="#3a3024" strokeWidth="0.4" />
    }{o}{
    <text x="100" y="84" textAnchor="middle" fontSize="5" letterSpacing="1" fontFamily="Cinzel" fill="#2a2217">hPa</text>
    }{
    <text x="100" y="125.5" textAnchor="middle" fontSize="4.6" fontStyle="italic" fontFamily="Cormorant Garamond" fill="#3a3024">mm Hg</text>
    }{
    <text x="100" y="148" textAnchor="middle" fontSize="4.3" letterSpacing="1.6" fontFamily="Cinzel" fill="#3a3024">COMPENSADO</text>
    }{
    <text x="100" y="158" textAnchor="middle" fontSize="6" letterSpacing="1.3" fontFamily="Cinzel" fontWeight={600} fill="#17120c">ILLAS ATLÁNTICAS</text>
    }{
    <text x="100" y="165" textAnchor="middle" fontSize="4.5" fontStyle="italic" fontFamily="Cormorant Garamond" fill="#3a3024">{t("Barómetro aneroide · Aguiño")}</text>
    }</g>
  });

export function hy({pressure:s = undefined,pressure3h:u = undefined,delta:r = undefined}){const o=s??1013,d=u??o,m=[];for(let g=0;g<36;g++){const[h,p]=At(100,100,6.2,g*10),[b,A]=At(100,100,7.6,g*10);m.push(
  <line x1={h} y1={p} x2={b} y2={A} stroke="rgba(60,35,5,0.7)" strokeWidth="0.5" />
  )}const y=r!=null&&r>0?"+":"";return <div className="flex flex-col items-center gap-3">{
    <$n dial="silver" className="max-w-[300px]">{
      <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full" aria-hidden={true}>{
        <defs>{
          <linearGradient id="baro-blued" x1="0" y1="0" x2="1" y2="1">{
            <stop offset="0" stopColor="#0d1a45" />
            }{
            <stop offset="0.5" stopColor="#2f55ad" />
            }{
            <stop offset="1" stopColor="#12275f" />
            }</linearGradient>
          }{
          <linearGradient id="baro-gilt" x1="0" y1="0" x2="1" y2="0">{
            <stop offset="0" stopColor="#8a6120" />
            }{
            <stop offset="0.5" stopColor="#f3d68e" />
            }{
            <stop offset="1" stopColor="#8a6120" />
            }</linearGradient>
          }{
          <radialGradient id="baro-knob" cx="0.38" cy="0.32" r="0.8">{
            <stop offset="0" stopColor="#fff3c8" />
            }{
            <stop offset="0.45" stopColor="#cfa24c" />
            }{
            <stop offset="1" stopColor="#5e4111" />
            }</radialGradient>
          }</defs>
        }{
        <Dy />
        }{
        <g className="needle" style={{transform:`rotate(${We(d)}deg)`,transformOrigin:"100px 100px"}}>{
          <path d="M99.45 100 L99.6 25 L97.9 28.5 L100 15.5 L102.1 28.5 L100.4 25 L100.55 100 Z" fill="url(#baro-gilt)" stroke="rgba(70,45,10,.5)" strokeWidth="0.2" />
          }</g>
        }{
        <g className="needle" style={{transform:`rotate(${We(o)}deg)`,transformOrigin:"100px 100px"}}>{
          <path d="M99.15 121 L99.45 39 L100 14 L100.55 39 L100.85 121 Z" fill="url(#baro-blued)" />
          }{
          <circle cx="100" cy="36" r="3.4" fill="none" stroke="url(#baro-blued)" strokeWidth="1.3" />
          }{
          <path d="M94 122 A 6 6 0 0 0 106 122 A 6 3 0 0 1 94 122 Z" fill="url(#baro-blued)" />
          }</g>
        }{
        <circle cx="100" cy="100" r="7.8" fill="url(#baro-knob)" stroke="rgba(60,35,5,.6)" strokeWidth="0.4" />
        }{m}{
        <circle cx="100" cy="100" r="2.2" fill="url(#baro-blued)" />
        }</svg>
      }</$n>
    }{
    <Il title="BARÓMETRO">{kt(s,1)} hPa · {wx(r)}{r!=null&&isFinite(r)?` (${y}${kt(r,1)} en 3 h)`:""}</Il>
    }</div>
  }
const Dy=dy, Fy=fy, Il=il;
