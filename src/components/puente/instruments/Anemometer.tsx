/*
 * instruments/Anemometer.tsx · Puente de Mando — Illas Atlánticas Ático
 * Portado del diseño validado: mismas clases, rótulos y geometría que el DOM de Arena.
 */
// Anemómetro con rosa de vientos y escala Beaufort.
import * as X from 'react';
import { Ax, kt, qn, xa, zx } from '../data';
import { At, me } from '../astro';
import { $n, il } from '../parts';
import { t } from '../../../i18n/translate';

export const gr=-125,Oh=125,vr=60,ma=s=>gr+Math.min(vr+2,Math.max(0,s))/vr*(Oh-gr),ka="#dcbc6e",rr="#f1e5c4",my=X.memo(function(){const u=[];for(let d=0;d<360;d+=5){const m=d%30===0,y=d%10===0,[g,h]=At(100,100,94,d),[p,b]=At(100,100,m?85.5:y?88:90.5,d);u.push(
  <line x1={g} y1={h} x2={p} y2={b} stroke={ka} strokeWidth={m?1.2:y?.7:.4} />
  )}const r: any=[["N",0,10],["NE",45,6.2],["E",90,8.5],["SE",135,6.2],["S",180,8.5],["SW",225,6.2],["W",270,8.5],["NW",315,6.2]],o=[];for(let d=0;d<=vr;d++){const m=ma(d),y=d%10===0,g=d%5===0,[h,p]=At(100,100,63,m),[b,A]=At(100,100,y?55.5:g?58:60.5,m);if(o.push(
  <line x1={h} y1={p} x2={b} y2={A} stroke={rr} strokeWidth={y?1.1:g?.7:.35} />
  ),y){const[O,B]=At(100,100,47.5,m);o.push(
  <text x={O} y={B+2.6} textAnchor="middle" fontSize="7.6" fontFamily="Cormorant Garamond" fontWeight={700} fill={rr}>{d}</text>
  )}}return <g>{
    <circle cx="100" cy="100" r="94" fill="none" stroke={ka} strokeWidth="0.5" />
    }{
    <circle cx="100" cy="100" r="72" fill="none" stroke={ka} strokeWidth="0.35" opacity="0.6" />
    }{u}{r.map(([d,m,y])=>{const[g,h]=At(100,100,78.5,m);return <text x={g} y={h+y*.36} textAnchor="middle" fontSize={y} fontFamily="Cinzel" fontWeight={700} fill={d==="N"?"#f3d27f":ka}>{d}</text>
    })}{[0,90,180,270].map(d=>
    <path d="M100 100 L97 88 L100 70 L103 88 Z" transform={`rotate(${d} 100 100)`} fill="rgba(220,188,110,0.09)" />
    )}{
    <path d={me(100,100,63,gr,Oh)} fill="none" stroke={rr} strokeWidth="0.45" />
    }{
    <path d={me(100,100,65.6,ma(22),ma(34))} fill="none" stroke="#e0a13c" strokeWidth="2.4" opacity="0.85" />
    }{
    <path d={me(100,100,65.6,ma(34),ma(60))} fill="none" stroke="#c4432f" strokeWidth="2.4" opacity="0.9" />
    }{o}{
    <text x="100" y="121" textAnchor="middle" fontSize="4.6" letterSpacing="1.5" fontFamily="Cinzel" fill={ka}>NUDOS</text>
    }{
    <text x="100" y="160" textAnchor="middle" fontSize="4.4" fontStyle="italic" fontFamily="Cormorant Garamond" fill={ka} opacity="0.85">{t("Illas Atlánticas · Aguiño")}</text>
    }</g>
  });

export function xy({speed:s = undefined,dir:u = undefined,gusts:r = undefined}){const o=X.useRef(null),d=X.useRef(null),m=X.useRef({v:0,d:u??0}),y=s??0,g=Math.max(y,r??y),h=u??0,p=zx(y);return qn((b,A)=>{const O=.5+.5*(.6*Math.sin(.9*b)*Math.sin(.37*b+1)+.4*Math.sin(2.3*b+2)),B=y+(g-y)*O*O*.9,L=m.current;L.v+=(B-L.v)*Math.min(1,A*2.2);const D=(3+y*.22)*(.6*Math.sin(.5*b)+.4*Math.sin(1.7*b+1)),q=(h+D-L.d+540)%360-180;L.d+=q*Math.min(1,A*1.6),o.current?.setAttribute("transform",`rotate(${ma(L.v).toFixed(2)} 100 100)`),d.current?.setAttribute("transform",`rotate(${L.d.toFixed(2)} 100 100)`)}),
  <div className="flex flex-col items-center gap-3">{
    <$n dial="navy" className="max-w-[300px]">{
      <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full" aria-hidden={true}>{
        <defs>{
          <linearGradient id="an-gold" x1="0" y1="0" x2="1" y2="0">{
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
        <g transform={`rotate(${ma(g)} 100 100)`}>{
          <path d="M100 38.5 L97.6 33.2 L102.4 33.2 Z" fill="#e0533a" />
          }</g>
        }{
        <rect x="82" y="129" width="36" height="11" rx="2" fill="#efe4c6" stroke="#8a6120" strokeWidth="0.6" />
        }{
        <text x="100" y="136.9" textAnchor="middle" fontSize="5.6" letterSpacing="0.8" fontFamily="Cinzel" fontWeight={700} fill="#163353">FUERZA {p.force}</text>
        }{
        <g ref={d} transform={`rotate(${h} 100 100)`}>{
          <path d="M100 17 L94.4 4.6 L100 7.4 L105.6 4.6 Z" fill="url(#an-gold)" stroke="#4a3208" strokeWidth="0.4" />
          }{
          <path d="M100 183 L97.6 192.5 L102.4 192.5 Z" fill="none" stroke={ka} strokeWidth="0.8" />
          }</g>
        }{
        <g ref={o} transform={`rotate(${ma(y)} 100 100)`}>{
          <path d="M99.25 114 L99.5 45 L100 39 L100.5 45 L100.75 114 Z" fill="#f4ead0" stroke="#8a6120" strokeWidth="0.3" />
          }</g>
        }{
        <circle cx="100" cy="100" r="5" fill="url(#an-gold)" stroke="#4a3208" strokeWidth="0.4" />
        }{
        <circle cx="100" cy="100" r="1.6" fill="#163353" />
        }</svg>
      }</$n>
    }{
    <Il title="ANEMÓMETRO">{kt(s,0)} kn del {xa(u)} ({Math.round(h)}°) · {Ax(u)} · rachas {kt(r,0)} kn{
      <span className="block text-[12px] not-italic tracking-wide opacity-80">Beaufort {p.force} · {p.name}</span>
      }</Il>
    }</div>
  }
const Il=il, My=my;
