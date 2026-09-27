/*
 * instruments/Bitacora.tsx · Puente de Mando — Illas Atlánticas Ático
 * Portado del diseño validado: mismas clases, rótulos y geometría que el DOM de Arena.
 */
// Bitácora: rosa de los vientos con rumbo y demora magnética.
import * as X from 'react';
import { ah, vc } from '../config';
import { Ft, qn, xa } from '../data';
import { $n, il } from '../parts';
import { t } from '../../../i18n/translate';

export function Mc({a:s = undefined,L:u = undefined,w:r = undefined,dark:o = undefined,light:d = undefined}){const m=r*.95;return <g transform={`rotate(${s} 100 100)`}>{
    <path d={`M100 100 L${100-r} ${100-m} L100 ${100-u} Z`} fill={o} />
    }{
    <path d={`M100 100 L100 ${100-u} L${100+r} ${100-m} Z`} fill={d} />
    }</g>
  }

export const vy=X.memo(function(){const u=[];for(let g=0;g<360;g++){const h=g%10===0,p=g%5===0,b=h?83:p?85.4:87.4,A=(g-90)*Math.PI/180;u.push(
  <line x1={100+90*Math.cos(A)} y1={100+90*Math.sin(A)} x2={100+b*Math.cos(A)} y2={100+b*Math.sin(A)} stroke="#1b2432" strokeWidth={h?.85:p?.55:.28} />
  )}const r=[];for(let g=10;g<360;g+=10){const h=g%90===0;r.push(
  <text x="100" y={h?27.6:24.3} transform={`rotate(${g} 100 100)`} textAnchor="middle" fontSize={h?10:5.6} fontFamily={h?"Cinzel":"Cormorant Garamond"} fontWeight={700} fill={h?"#163353":"#1b2432"}>{h?g===90?"E":g===180?"S":"W":g}</text>
  )}const o=[];for(let g=0;g<16;g++)o.push(
  <Mc a={11.25+g*22.5} L={36} w={2.6} dark="#8c7a58" light="#efe5cc" />
  );const d=[];for(let g=0;g<8;g++)d.push(
  <Mc a={22.5+g*45} L={46} w={4.4} dark="#3d4a5c" light="#e2d6b6" />
  );const m=[];for(let g=0;g<4;g++)m.push(
  <Mc a={45+g*90} L={58} w={7} dark="#1f2d42" light="#c9ac62" />
  );const y=[];for(let g=0;g<4;g++)y.push(
  <Mc a={g*90} L={69} w={9} dark="#163353" light="#d4a017" />
  );return <g>{
    <circle cx="100" cy="100" r="90.4" fill="url(#cmp-card)" stroke="#6b5427" strokeWidth="0.6" />
    }{u}{
    <circle cx="100" cy="100" r="74" fill="none" stroke="#1b2432" strokeWidth="0.5" />
    }{
    <circle cx="100" cy="100" r="72.4" fill="none" stroke="#1b2432" strokeWidth="0.25" />
    }{r}{o}{d}{m}{y}{
    <g transform="translate(100 21.5) scale(0.62)" fill="#b8860b" stroke="#163353" strokeWidth="0.9">{
      <path d="M0 -12 C 4 -6 5 -1 0 5 C -5 -1 -4 -6 0 -12 Z" />
      }{
      <path d="M0 5 C 7 -4 15 -3 12 4 C 10 1 5 2 1.5 8 Z" />
      }{
      <path d="M0 5 C -7 -4 -15 -3 -12 4 C -10 1 -5 2 -1.5 8 Z" />
      }{
      <rect x="-7" y="7.5" width="14" height="3" rx="0.8" />
      }{
      <path d="M0 10.5 L2.5 16 L-2.5 16 Z" />
      }</g>
    }{
    <circle cx="100" cy="100" r="19" fill="#f6efdb" stroke="#163353" strokeWidth="0.8" />
    }{
    <circle cx="100" cy="100" r="17.2" fill="none" stroke="#b8860b" strokeWidth="0.4" />
    }{
    <path id="cmp-ring" d="M100 86.5 A 13.5 13.5 0 1 1 99.99 86.5" fill="none" />
    }{
    <text fontSize="3.5" letterSpacing="0.9" fontFamily="Cinzel" fontWeight={600} fill="#163353">{
      <textPath href="#cmp-ring" startOffset="0">ILLAS ATLÁNTICAS · AGUIÑO · 42°31′N ·</textPath>
      }</text>
    }{
    <circle cx="100" cy="100" r="4" fill="url(#cmp-jewel)" stroke="#6b5427" strokeWidth="0.4" />
    }</g>
  });

export function by({sunAz:s = undefined,sunAlt:u = undefined,moonAz:r = undefined,moonAlt:o = undefined,windDir:d = undefined,waveHeight:m = undefined,wavePeriod:y = undefined,headingRef:g = undefined,deviceActive:h = undefined}){const p=X.useRef(null),b=X.useRef(null),A=X.useRef(null),O=X.useRef({h:vc,v:0,last:0});qn((L,D)=>{const q=Ft(.7+(m??1)*1.7,.6,9),V=Ft(y??8,4,16),et=g.current,ct=et??vc+q*Math.sin(2*Math.PI*L/V)+.35*q*Math.sin(2*Math.PI*L/(V*1.7)+1.3)+.8*Math.sin(L*.05),P=O.current,yt=(ct-P.h+540)%360-180;if(P.v+=(yt*6-P.v*3.2)*D,P.h=(P.h+P.v*D+360)%360,p.current?.setAttribute("transform",`rotate(${(-P.h).toFixed(2)} 100 100)`),L-P.last>.15){P.last=L;const at=Math.round(P.h)%360;b.current&&(b.current.textContent=`${String(at).padStart(3,"0")}°`),A.current&&(A.current.textContent=xa(at))}});const B=[];for(let L=0;L<8;L++){const D=L*Math.PI/4;B.push(
  <line x1={100+4.4*Math.cos(D)} y1={5.2+4.4*Math.sin(D)} x2={100+6.2*Math.cos(D)} y2={5.2+6.2*Math.sin(D)} stroke="#f3cf6b" strokeWidth="0.8" />
  )}return <div className="flex flex-col items-center gap-3">{
    <$n dial="navy" className="max-w-[420px]">{
      <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full" aria-hidden={true}>{
        <defs>{
          <radialGradient id="cmp-card" cx="0.5" cy="0.45" r="0.6">{
            <stop offset="0" stopColor="#fdf8ea" />
            }{
            <stop offset="0.75" stopColor="#f1e6ca" />
            }{
            <stop offset="1" stopColor="#dccba2" />
            }</radialGradient>
          }{
          <radialGradient id="cmp-jewel" cx="0.35" cy="0.3" r="0.8">{
            <stop offset="0" stopColor="#ffe9e3" />
            }{
            <stop offset="0.4" stopColor="#b3261e" />
            }{
            <stop offset="1" stopColor="#4a0a06" />
            }</radialGradient>
          }{
          <radialGradient id="cmp-bowl" cx="0.5" cy="0.5" r="0.5">{
            <stop offset="0.82" stopColor="rgba(0,0,0,0)" />
            }{
            <stop offset="1" stopColor="rgba(0,0,0,0.55)" />
            }</radialGradient>
          }</defs>
        }{[45,90,135,180,225,270,315].map(L=>
        <circle cx={100+95.5*Math.sin(L*Math.PI/180)} cy={100-95.5*Math.cos(L*Math.PI/180)} r="0.9" fill="#dcbc6e" opacity="0.7" />
        )}{
        <g ref={p} transform={`rotate(${-vc} 100 100)`}>{
          <Vy />
          }{u>-2&&
          <g transform={`rotate(${s} 100 100)`}>{
            <circle cx="100" cy="5.2" r="3.4" fill="#f3cf6b" stroke="#8a6120" strokeWidth="0.5" />
            }{B}</g>
          }{o>-2&&
          <g transform={`rotate(${r} 100 100)`}>{
            <circle cx="100" cy="5.2" r="3.3" fill="#e4e9f2" />
            }{
            <circle cx="101.6" cy="4.4" r="2.8" fill="#163353" />
            }</g>
          }{d!=null&&
          <g transform={`rotate(${d} 100 100)`}>{
            <path d="M100 9.8 L96.9 2.2 L100 3.8 L103.1 2.2 Z" fill="#8fc3e6" stroke="#0b1c30" strokeWidth="0.4" />
            }</g>
          }</g>
        }{
        <circle cx="100" cy="100" r="100" fill="url(#cmp-bowl)" />
        }{
        <line x1="100" y1="0" x2="100" y2="17" stroke="#0b0f18" strokeWidth="1.1" />
        }{
        <path d="M100 7 L96.6 0 L103.4 0 Z" fill="#dcbc6e" stroke="#4a3208" strokeWidth="0.4" />
        }{
        <line x1="100" y1="186" x2="100" y2="200" stroke="#dcbc6e" strokeWidth="0.8" opacity="0.8" />
        }</svg>
      }</$n>
    }{
    <Il title="BITÁCORA">Rumbo {
      <span ref={b}>{String(vc).padStart(3,"0")}°</span>
      } · {
      <span ref={A}>S</span>
      } · {h?t("brújula del dispositivo"):t("proa a Sálvora")}{
      <span className="block text-[12px] not-italic tracking-wide opacity-80">Dm {ah} · ☉ {Math.round(s)}° · ☾ {Math.round(r)}°</span>
      }</Il>
    }</div>
  }
const Il=il, Vy=vy;
