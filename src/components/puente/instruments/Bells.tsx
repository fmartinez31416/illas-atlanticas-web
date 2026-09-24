/*
 * instruments/Bells.tsx · Puente de Mando — Illas Atlánticas Ático
 * Portado del diseño validado: mismas clases, rótulos y geometría que el DOM de Arena.
 */
// Campanas del barco (números romanos) y cronómetro de marina.
import * as X from 'react';
import { qn } from '../data';
import { At, Xn, me } from '../astro';
import { $n, il } from '../parts';

export const cy=["XII","I","II","III","IIII","V","","VII","VIII","IX","X","XI"],ur="#1d1812",uy=X.memo(function(){const u=[];for(let d=0;d<60;d++){const m=d%5===0,[y,g]=At(100,100,91,d*6),[h,p]=At(100,100,m?83:87.2,d*6);u.push(
  <line x1={y} y1={g} x2={h} y2={p} stroke={ur} strokeWidth={m?1.7:.6} strokeLinecap="round" />
  )}const r=[];for(let d=0;d<60;d++){const m=d%5===0,[y,g]=At(100,146,18,d*6),[h,p]=At(100,146,m?14.6:16.4,d*6);r.push(
  <line x1={y} y1={g} x2={h} y2={p} stroke="#2a241a" strokeWidth={m?.8:.35} />
  )}const o=[];for(let d=0;d<=8;d++){const m=-60+d*15,[y,g]=At(100,76,18,m),[h,p]=At(100,76,d%2===0?14:15.8,m);if(o.push(
  <line x1={y} y1={g} x2={h} y2={p} stroke="#2a241a" strokeWidth={d%2===0?.8:.45} />
  ),d%2===0){const[b,A]=At(100,76,22.4,m);o.push(
  <text x={b} y={A+1.6} fontSize="4.8" textAnchor="middle" fill="#2a241a" fontFamily="Cormorant Garamond" fontWeight={700}>{d}</text>
  )}}return <g>{
    <circle cx="100" cy="100" r="91.5" fill="none" stroke={ur} strokeWidth="0.6" />
    }{
    <circle cx="100" cy="100" r="86.8" fill="none" stroke={ur} strokeWidth="0.35" />
    }{u}{cy.map((d,m)=>{if(!d)return null;const[y,g]=At(100,100,70,m*30);return <text x={y} y={g+5.2} textAnchor="middle" fontSize="15" fontFamily="Cormorant Garamond" fontWeight={600} fill="#17120c">{d}</text>
    })}{
    <path d={me(100,76,18,-60,60)} fill="none" stroke="#2a241a" strokeWidth="0.5" />
    }{o}{
    <text x="100" y="84.6" textAnchor="middle" fontSize="3.9" letterSpacing="0.9" fontFamily="Cinzel" fill="#3b3226">CAMPANAS</text>
    }{
    <text x="100" y="115.5" textAnchor="middle" fontSize="6.1" letterSpacing="1.3" fontFamily="Cinzel" fontWeight={600} fill="#17120c">ILLAS ATLÁNTICAS</text>
    }{
    <text x="100" y="122.6" textAnchor="middle" fontSize="4.7" fontStyle="italic" fontFamily="Cormorant Garamond" fill="#3b3226">Cronómetro de marina · Nº 007656</text>
    }{
    <circle cx="100" cy="146" r="19" fill="rgba(60,40,10,0.05)" stroke="#2a241a" strokeWidth="0.5" />
    }{[4,7,10].map(d=>
    <circle cx="100" cy="146" r={d} fill="none" stroke="rgba(60,40,10,0.08)" strokeWidth="0.3" />
    )}{r}{[15,30,45,60].map(d=>{const[m,y]=At(100,146,10.4,d*6);return <text x={m} y={y+1.7} textAnchor="middle" fontSize="4.8" fontFamily="Cormorant Garamond" fontWeight={700} fill="#2a241a">{d}</text>
    })}</g>
  });

export function oy({date:s = undefined,offsetMs:u = undefined,bells:r = undefined}){const o=X.useRef(null),d=X.useRef(-1),m=Xn(s),y=(m.hour%12+m.minute/60+m.second/3600)*30,g=(m.minute+m.second/60)*6,h=-60+120*r.watchProgress;return qn(()=>{const p=new Date(Date.now()+u),b=p.getSeconds()+p.getMilliseconds()/1e3,A=Math.floor(b*2)/2;A!==d.current&&o.current&&(d.current=A,o.current.setAttribute("transform",`rotate(${A*6} 100 146)`))}),
  <div className="flex flex-col items-center gap-3">{
    <$n dial="ivory" className="max-w-[300px]">{
      <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full" aria-hidden={true}>{
        <defs>{
          <linearGradient id="clk-blued" x1="0" y1="0" x2="1" y2="1">{
            <stop offset="0" stopColor="#0d1a45" />
            }{
            <stop offset="0.45" stopColor="#2f55ad" />
            }{
            <stop offset="1" stopColor="#12275f" />
            }</linearGradient>
          }</defs>
        }{
        <Uy />
        }{
        <g transform={`rotate(${h} 100 76)`}>{
          <path d="M99.35 78.5 L100 60.6 L100.65 78.5 Z" fill="url(#clk-blued)" />
          }{
          <circle cx="100" cy="76" r="1.7" fill="url(#clk-blued)" />
          }</g>
        }{
        <g ref={o} transform="rotate(0 100 146)">{
          <line x1="100" y1="150.8" x2="100" y2="129.6" stroke="url(#clk-blued)" strokeWidth="0.9" strokeLinecap="round" />
          }{
          <circle cx="100" cy="146" r="1.8" fill="url(#clk-blued)" />
          }</g>
        }{
        <g transform={`rotate(${y} 100 100)`}>{
          <path d="M98.4 109 L99.1 79.8 L100.9 79.8 L101.6 109 Z" fill="url(#clk-blued)" />
          }{
          <circle cx="100" cy="73.6" r="6.1" fill="none" stroke="url(#clk-blued)" strokeWidth="2.3" />
          }{
          <path d="M98.9 67.3 L100 45 L101.1 67.3 Z" fill="url(#clk-blued)" />
          }</g>
        }{
        <g transform={`rotate(${g} 100 100)`}>{
          <path d="M98.7 110 L99.3 63.6 L100.7 63.6 L101.3 110 Z" fill="url(#clk-blued)" />
          }{
          <circle cx="100" cy="58.6" r="5" fill="none" stroke="url(#clk-blued)" strokeWidth="1.8" />
          }{
          <path d="M99.1 53.4 L100 22.5 L100.9 53.4 Z" fill="url(#clk-blued)" />
          }</g>
        }{
        <circle cx="100" cy="100" r="4.3" fill="url(#clk-blued)" />
        }{
        <circle cx="100" cy="100" r="1.6" fill="#e9c979" />
        }</svg>
      }</$n>
    }{
    <Il title="CRONÓMETRO">{r.watch} · {r.bells} {r.bells===1?"campanada":"campanadas"}</Il>
    }</div>
  }
const Il=il, Uy=uy;
