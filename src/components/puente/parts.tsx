/*
 * parts.tsx · Puente de Mando — Illas Atlánticas Ático
 * Portado del diseño validado: mismas clases, rótulos y geometría que el DOM de Arena.
 */
// Rl = tornillo · $n = esfera con bisel de latón · il = placa grabada · Ga = panel de caoba · wc = tarjeta marfil · th = interruptor · Vi = rótulo · iy = mandos del puente
import { cn } from './util';
import { At, Fe, V1, ap, np } from './astro';
import { t } from '../../i18n/translate';

export function mr({id:s = undefined,r:u = undefined,fraction:r = undefined,limbAngle:o = undefined,earthshine:d=.85,litOpacity:m=1}){const y=np(o),g=ap(u,r);return <g>{
    <defs>{
      <radialGradient id={`${s}-lit`} cx="0.45" cy="0.4" r="0.7">{
        <stop offset="0" stopColor="#fbf8ee" />
        }{
        <stop offset="0.7" stopColor="#e6e0cd" />
        }{
        <stop offset="1" stopColor="#bfb8a2" />
        }</radialGradient>
      }{
      <clipPath id={`${s}-clip`}>{
        <path d={g} transform={`rotate(${y})`} />
        }</clipPath>
      }</defs>
    }{
    <circle r={u} fill="#1c2336" opacity={d} />
    }{g&&
    <path d={g} transform={`rotate(${y})`} fill={`url(#${s}-lit)`} opacity={m} />
    }{g&&
    <g clipPath={`url(#${s}-clip)`} opacity={.3*m}>{
      <ellipse cx={-u*.28} cy={-u*.26} rx={u*.26} ry={u*.2} fill="#7f7c70" />
      }{
      <ellipse cx={u*.12} cy={-u*.1} rx={u*.18} ry={u*.15} fill="#7f7c70" />
      }{
      <ellipse cx={u*.3} cy={u*.08} rx={u*.16} ry={u*.13} fill="#7f7c70" />
      }{
      <ellipse cx={-u*.46} cy={u*.14} rx={u*.2} ry={u*.3} fill="#7f7c70" />
      }{
      <ellipse cx={u*.52} cy={-u*.22} rx={u*.08} ry={u*.07} fill="#7f7c70" />
      }{
      <ellipse cx={u*.04} cy={u*.42} rx={u*.12} ry={u*.08} fill="#7f7c70" />
      }{
      <circle cx={-u*.12} cy={u*.64} r={u*.06} fill="#ffffff" opacity="0.7" />
      }</g>
    }</g>
  }

export function Rl({x:s = undefined,y:u = undefined,size:r = undefined,rot:o=30}){return <span className="screw" style={{left:typeof s=="number"?`${s}%`:s,top:typeof u=="number"?`${u}%`:u,width:typeof r=="number"?`${r}%`:r,height:typeof r=="number"?`${r}%`:r}}>{
    <i style={{transform:`rotate(${o}deg)`}} />
    }</span>
  }

export const ny={ivory:"dial-ivory guilloche",navy:"dial-navy",silver:"dial-silver guilloche"};

export function $n({children:s = undefined,className:u = undefined,dial:r="ivory",screws:o=!0,top:d = undefined}){return <div className={cn("relative isolate aspect-square w-full select-none rounded-full",u)}>{
    <div className="absolute inset-0 rounded-full brass brushed inst-shadow" />
    }{o&&[45,135,225,315].map(m=>{const[y,g]=At(50,50,45.7,m);return <Rl x={y} y={g} size={4.4} rot={m*7%180} />
    })}{
    <div className="absolute inset-[8.6%] rounded-full knurl" />
    }{
    <div className="absolute inset-[10.4%] rounded-full brass-inv" />
    }{
    <div className={cn("absolute inset-[12.8%] overflow-hidden rounded-full",ny[r])}>{s}</div>
    }{
    <div className="shade shade-lamp rounded-full" />
    }{
    <div className="glass inset-[12.8%] rounded-full" />
    }{d}</div>
  }

export function il({title:s = undefined,children:u = undefined,className:r = undefined}){return <div className={cn("relative isolate mx-auto w-fit max-w-full rounded-[5px] px-6 py-1.5 text-center plaque",r)}>{
    <Rl x="9px" y="50%" size="7px" rot={20} />
    }{
    <Rl x="calc(100% - 9px)" y="50%" size="7px" rot={110} />
    }{
    <div className="font-display text-[10px] font-semibold tracking-[0.34em] engraved sm:text-[11px]">{s}</div>
    }{u&&
    <div className="mt-0.5 font-serif text-[13px] font-medium italic leading-tight engraved-soft sm:text-[14px]">{u}</div>
    }{
    <div className="shade shade-lamp-soft rounded-[5px]" />
    }</div>
  }

export function Ga({children:s = undefined,className:u = undefined,innerClassName:r = undefined}){return <section className={cn("relative rounded-[20px] p-[3px] inlay-frame",u)}>{
    <div className="relative isolate h-full overflow-hidden rounded-[17px] wood-burl panel-inset">{
      <div className="lacquer" />
      }{
      <div className="shade" />
      }{
      <div className="pointer-events-none absolute inset-0 z-[6] rounded-[17px] stringing" />
      }{
      <div className={cn("relative z-[7] h-full p-4 sm:p-6",r)}>{s}</div>
      }</div>
    }</section>
  }

export function wc({children:s = undefined,className:u = undefined}){return <div className={cn("relative isolate overflow-hidden rounded-md card-ivory",u)}>{s}{
    <div className="shade shade-lamp-soft rounded-md" />
    }</div>
  }

export function th({on:s = undefined,onChange:u = undefined,label:r = undefined}){return <button type="button" role="switch" aria-checked={s} aria-label={r} data-on={s} onClick={()=>u(!s)} className="toggle cursor-pointer focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-amber-200/70">{
    <span />
    }</button>
  }

export function Vi({children:s = undefined}){return <div className="font-display text-[9.5px] font-semibold tracking-[0.3em] text-[#d9bb73]">{s}</div>
  }

export function iy(s){const u=s.status==="live"?`Open-Meteo en directo · ${s.updatedAt?Fe(new Date(s.updatedAt)):""}`:s.status==="partial"?"Datos parciales · reintentando":s.status==="loading"?t("Conectando con la estación…"):t("Sin conexión · valores de referencia");return <div className="flex h-full flex-col gap-4">{
    <div className="relative isolate flex-1 overflow-hidden rounded-[14px] border border-black/60 bg-[linear-gradient(160deg,#1b1712_0%,#0b0907_55%,#15110c_100%)] p-4 shadow-[inset_0_1px_0_rgba(255,230,170,.12),inset_0_0_30px_rgba(0,0,0,.8)] sm:p-5">{
      <div className="lacquer" />
      }{
      <Rl x="10px" y="10px" size="9px" rot={40} />
      }{
      <Rl x="calc(100% - 10px)" y="10px" size="9px" rot={130} />
      }{
      <Rl x="10px" y="calc(100% - 10px)" size="9px" rot={80} />
      }{
      <Rl x="calc(100% - 10px)" y="calc(100% - 10px)" size="9px" rot={10} />
      }{
      <div className="relative flex items-center justify-between gap-3">{
        <div className="flex items-center gap-2.5">{
          <span className={`jewel ${s.live?"green":"amber"} ${s.live?"pulse-soft":""}`} />
          }{
          <span className="font-display text-[10px] font-semibold tracking-[0.3em] text-[#efd99a]">{s.live?"EN VIVO":"SIMULACIÓN"}</span>
          }</div>
        }{
        <span className="font-serif text-[30px] font-semibold leading-none tabular-nums text-[#f6e7bf]">{V1(s.minutes)}</span>
        }</div>
      }{
      <p className="relative mt-1 text-right font-serif text-[12px] italic text-[#b9a47a]">{u}</p>
      }{
      <div className="relative mt-4">{
        <Vi>HORA DE A BORDO</Vi>
        }{
        <div className="relative mt-1">{
          <input type="range" min={0} max={1439} step={1} value={Math.round(s.minutes)} onChange={r=>s.onScrub(Number(r.target.value))} className="brass-range relative z-[1]" aria-label={t("Hora del día a simular")} />
          }{[s.sunriseMin,s.sunsetMin].map((r,o)=>r!=null?
          <span className="pointer-events-none absolute -top-2.5 -translate-x-1/2 text-[11px] leading-none text-[#f3c33c]" style={{left:`calc(12px + ${r/1439*100}% - ${r/1439*24}px)`}}>☉</span>
          :null)}</div>
        }{
        <div className="mt-0.5 flex justify-between px-0.5 font-serif text-[11px] font-semibold text-[#9f8b62]">{["00","06","12","18","24"].map(r=>
          <span>{r}</span>
          )}</div>
        }</div>
      }{
      <div className="relative mt-3 grid grid-cols-2 gap-2">{
        <button type="button" onClick={s.onPlay} className="brass-btn rounded-full px-3 py-2 font-display text-[10px] font-bold tracking-[0.16em]">{s.playing?"❚❚ PAUSA":"▶ TRAVESÍA 24 H"}</button>
        }{
        <button type="button" onClick={s.onLive} disabled={s.live&&!s.playing} className="rounded-full border border-[#d9bb73]/50 px-3 py-2 font-display text-[10px] font-bold tracking-[0.16em] text-[#efd99a] transition hover:bg-white/5 disabled:opacity-40">● PRESENTE</button>
        }</div>
      }{
      <div className="relative mt-2 grid grid-cols-4 gap-1.5">{s.presets.map(r=>
        <button type="button" disabled={r.minutes==null} onClick={()=>r.minutes!=null&&s.onScrub(r.minutes)} className="rounded-md border border-[#d9bb73]/25 bg-white/[0.03] px-1 py-1.5 text-center transition hover:border-[#d9bb73]/60 hover:bg-white/[0.06] disabled:opacity-30">{
          <span className="block font-display text-[8.5px] font-semibold tracking-[0.14em] text-[#efd99a]">{r.label.toUpperCase()}</span>
          }{
          <span className="block font-serif text-[12px] text-[#b9a47a]">{r.minutes!=null?V1(r.minutes):"—"}</span>
          }</button>
        )}</div>
      }{
      <div className="relative mt-4 space-y-2.5 border-t border-[#d9bb73]/15 pt-3.5">{
        <div className="flex items-center justify-between gap-3">{
          <div>{
            <Vi>SONIDO DEL MAR</Vi>
            }{
            <p className="font-serif text-[12px] italic text-[#9f8b62]">oleaje al ritmo del periodo real</p>
            }</div>
          }{
          <Th on={s.soundOn} onChange={s.onSound} label="Sonido del mar" />
          }</div>
        }{
        <div className="flex items-center justify-between gap-3">{
          <div>{
            <Vi>CAMPANA DE A BORDO</Vi>
            }{
            <p className="font-serif text-[12px] italic text-[#9f8b62]">suena sola cada media hora</p>
            }</div>
          }{
          <button type="button" onClick={s.onBell} className="brass-btn shrink-0 rounded-full px-3 py-1.5 font-display text-[9.5px] font-bold tracking-[0.12em]">🔔 {s.bells}</button>
          }</div>
        }{
        <div className="flex items-center justify-between gap-3">{
          <Vi>LUZ NOCTURNA</Vi>
          }{
          <div className="flex overflow-hidden rounded-full border border-[#d9bb73]/40">{["roja","ambar"].map(r=>
            <button type="button" onClick={()=>s.onLampMode(r)} className={`px-3 py-1 font-display text-[9px] font-bold tracking-[0.14em] transition ${s.lampMode===r?"bg-[#d9bb73] text-[#1b1206]":"text-[#efd99a] hover:bg-white/5"}`}>{r==="roja"?"ROJA":"ÁMBAR"}</button>
            )}</div>
          }</div>
        }{s.compassSupported&&
        <div className="flex items-center justify-between gap-3">{
          <div>{
            <Vi>BRÚJULA DEL MÓVIL</Vi>
            }{
            <p className="font-serif text-[12px] italic text-[#9f8b62]">{t("gire el teléfono: la rosa le sigue")}</p>
            }</div>
          }{
          <Th on={s.compassOn} onChange={s.onCompass} label={t("Brújula del dispositivo")} />
          }</div>
        }{
        <div className="pt-1">{
          <div className="flex items-center justify-between gap-3">{
            <Vi>LUMINOSIDAD</Vi>
            }{
            <span className="font-serif text-[12px] tabular-nums text-[#b9a47a]">{Math.round(s.brightness*100)}%</span>
            }</div>
          }{
          <input type="range" min={1} max={2.2} step={0.05} value={s.brightness} onChange={r=>s.onBrightness(Number(r.target.value))} className="brass-range relative z-[1] w-full" aria-label="Luminosidad del puente" />
          }</div>
        }</div>
      }</div>
    }{
    <Il title="MANDOS DEL PUENTE">{t("Deslice la hora y vea cómo cambia la luz")}</Il>
    }</div>
  }
const Il=il, Th=th;
