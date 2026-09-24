/*
 * data.ts · Puente de Mando — Illas Atlánticas Ático
 * Portado del diseño validado: mismas clases, rótulos y geometría que el DOM de Arena.
 */
import * as X from 'react';
import { Ie, R1 } from './config';

export const dl=s=>Array.isArray(s)?s.map(u=>typeof u=="number"&&isFinite(u)?u:NaN):[],Wi=s=>typeof s=="number"&&isFinite(s)?s:NaN,U1=[["temp","temperature_2m"],["rh","relative_humidity_2m"],["apparent","apparent_temperature"],["dewPoint","dew_point_2m"],["pressure","pressure_msl"],["cloud","cloud_cover"],["shortwave","shortwave_radiation"],["visibility","visibility"],["windSpeed","wind_speed_10m"],["windDir","wind_direction_10m"],["gusts","wind_gusts_10m"],["code","weather_code"],["precip","precipitation"]],H1=[["waveHeight","wave_height"],["waveDir","wave_direction"],["wavePeriod","wave_period"],["swellHeight","swell_wave_height"],["swellDir","swell_wave_direction"],["swellPeriod","swell_wave_period"],["windWaveHeight","wind_wave_height"],["sst","sea_surface_temperature"],["seaLevel","sea_level_height_msl"],["currentVel","ocean_current_velocity"],["currentDir","ocean_current_direction"]];

export async function ih(s,u){const r=await fetch(s,{signal:u});if(!r.ok)throw new Error(`HTTP ${r.status}`);const o=await r.json();if(o?.error)throw new Error(o.reason??"API error");return o}

export async function hx(s){const u=U1.map(p=>p[1]).join(","),r=`https://api.open-meteo.com/v1/forecast?latitude=${Ie.lat}&longitude=${Ie.lon}&current=${u},is_day&hourly=${u}&daily=uv_index_max,shortwave_radiation_sum,sunshine_duration,temperature_2m_max,temperature_2m_min&timezone=Europe%2FMadrid&wind_speed_unit=kn&past_days=1&forecast_days=3&timeformat=unixtime`,o=await ih(r,s),d=o.hourly??{},m=o.current??{},y=o.daily??{},g={t:dl(d.time).map(p=>p*1e3)},h={t:Wi(m.time)*1e3,isDay:Wi(m.is_day)};for(const[p,b]of U1)g[p]=dl(d[b]),h[p]=Wi(m[b]);return{fetchedAt:Date.now(),current:h,hourly:g,daily:{t:dl(y.time).map(p=>p*1e3),uvMax:dl(y.uv_index_max),radiationSum:dl(y.shortwave_radiation_sum),sunshine:dl(y.sunshine_duration),tMax:dl(y.temperature_2m_max),tMin:dl(y.temperature_2m_min)}}}

export async function mx(s){const u=H1.map(h=>h[1]).join(","),r=`https://marine-api.open-meteo.com/v1/marine?latitude=${R1.lat}&longitude=${R1.lon}&current=${u}&hourly=${u}&timezone=Europe%2FMadrid&past_days=1&forecast_days=3&timeformat=unixtime&cell_selection=sea`,o=await ih(r,s),d=o.hourly??{},m=o.current??{},y: any={t:dl(d.time).map(h=>h*1e3)},g: any={t:Wi(m.time)*1e3};for(const[h,p]of H1)y[h]=dl(d[p]),g[h]=Wi(m[p]);return y.currentVel=y.currentVel.map(h=>h/1.852),g.currentVel=g.currentVel/1.852,{fetchedAt:Date.now(),current:g,hourly:y}}

export function Rc(s,u){let r=0,o=s.length-1;for(;o-r>1;){const d=r+o>>1;s[d]<=u?r=d:o=d}return r}

export function Hn(s,u,r){if(!s.length||!u.length)return null;if(r<=s[0])return isFinite(u[0])?u[0]:null;if(r>=s[s.length-1]){for(let y=u.length-1;y>=0;y--)if(isFinite(u[y]))return u[y];return null}const o=Rc(s,r),d=u[o],m=u[o+1];return!isFinite(d)||!isFinite(m)?isFinite(d)?d:isFinite(m)?m:null:d+(m-d)*(r-s[o])/(s[o+1]-s[o])}

export function bc(s,u,r){if(!s.length)return null;const o=r<=s[0]?0:r>=s[s.length-1]?s.length-2:Rc(s,r),d=u[o],m=u[Math.min(o+1,u.length-1)];if(!isFinite(d)||!isFinite(m))return isFinite(d)?d:isFinite(m)?m:null;const y=Math.min(1,Math.max(0,(r-s[o])/(s[o+1]-s[o]||1))),g=d*Math.PI/180,h=m*Math.PI/180,p=Math.cos(g)*(1-y)+Math.cos(h)*y,b=Math.sin(g)*(1-y)+Math.sin(h)*y;return(Math.atan2(b,p)*180/Math.PI+360)%360}

export function xx(s,u,r){if(s.length<4||r<=s[1]||r>=s[s.length-2])return Hn(s,u,r);const o=Rc(s,r),d=u[o-1],m=u[o],y=u[o+1],g=u[o+2];if(![d,m,y,g].every(isFinite))return Hn(s,u,r);const h=(r-s[o])/(s[o+1]-s[o]),p=h*h,b=p*h;return .5*(2*m+(-d+y)*h+(2*d-5*m+4*y-g)*p+(-d+3*m-3*y+g)*b)}

export function px(s,u,r){if(!s.length)return null;const o=Rc(s,r),d=o+1<s.length&&Math.abs(s[o+1]-r)<Math.abs(s[o]-r)?o+1:o;return isFinite(u[d])?u[d]:null}

export const Yi={temp:17.5,rh:76,apparent:17,dewPoint:13,pressure:1017,pressure3h:1016.2,pressureDelta:.8,cloud:30,shortwave:null,visibility:24e3,windSpeed:9,windDir:35,gusts:15,code:1,precip:0,uvMax:6,sunshine:null,radiationSum:null,waveHeight:1.2,waveDir:300,wavePeriod:9,swellHeight:1.1,swellDir:295,swellPeriod:11,windWaveHeight:.3,sst:16.2,currentVel:.3,currentDir:20,hasWeather:!1,hasMarine:!1},Zi=s=>s!=null&&isFinite(s)?s:null;

export function yx(s,u,r,o){const d={...Yi};if(u&&u.hourly.t.length){const m=u.hourly,y=o&&isFinite(u.current.t)&&Math.abs(s-u.current.t)<2*36e5,g=A=>Hn(m.t,m[A],s),h=A=>y?Zi(u.current[A]):null;d.temp=h("temp")??g("temp"),d.rh=h("rh")??g("rh"),d.apparent=h("apparent")??g("apparent"),d.dewPoint=h("dewPoint")??g("dewPoint"),d.pressure=h("pressure")??g("pressure"),d.cloud=h("cloud")??g("cloud"),d.shortwave=h("shortwave")??g("shortwave"),d.visibility=h("visibility")??g("visibility"),d.windSpeed=h("windSpeed")??g("windSpeed"),d.windDir=h("windDir")??bc(m.t,m.windDir,s),d.gusts=h("gusts")??g("gusts"),d.code=h("code")??px(m.t,m.code,s),d.precip=h("precip")??g("precip"),d.pressure3h=Hn(m.t,m.pressure,s-3*36e5),d.pressureDelta=d.pressure!=null&&d.pressure3h!=null?d.pressure-d.pressure3h:null;const p=u.daily,b=p.t.findIndex((A,O)=>s>=A&&(O===p.t.length-1||s<p.t[O+1]));b>=0&&(d.uvMax=Zi(p.uvMax[b]),d.sunshine=Zi(p.sunshine[b]),d.radiationSum=Zi(p.radiationSum[b])),d.hasWeather=!0}if(r&&r.hourly.t.length){const m=r.hourly,y=o&&isFinite(r.current.t)&&Math.abs(s-r.current.t)<2*36e5,g=p=>Hn(m.t,m[p],s),h=p=>y?Zi(r.current[p]):null;d.waveHeight=h("waveHeight")??g("waveHeight")??Yi.waveHeight,d.waveDir=h("waveDir")??bc(m.t,m.waveDir,s)??Yi.waveDir,d.wavePeriod=h("wavePeriod")??g("wavePeriod")??Yi.wavePeriod,d.swellHeight=h("swellHeight")??g("swellHeight"),d.swellDir=h("swellDir")??bc(m.t,m.swellDir,s),d.swellPeriod=h("swellPeriod")??g("swellPeriod"),d.windWaveHeight=h("windWaveHeight")??g("windWaveHeight"),d.sst=h("sst")??g("sst")??Yi.sst,d.currentVel=h("currentVel")??g("currentVel"),d.currentDir=h("currentDir")??bc(m.t,m.currentDir,s),d.hasMarine=!0}return d}

export function gx(s=1e3){const[u,r]=X.useState(()=>new Date);return X.useEffect(()=>{let o=0;const d=()=>{o=window.setTimeout(()=>{r(new Date),d()},s-Date.now()%s+4)};return d(),()=>window.clearTimeout(o)},[s]),u}

export function vx(){const[s,u]=X.useState(null),[r,o]=X.useState(null),[d,m]=X.useState("loading"),[y,g]=X.useState(null);return X.useEffect(()=>{let h=!0;const p=new AbortController,b=async()=>{const[O,B]=await Promise.allSettled([hx(p.signal),mx(p.signal)]);if(!h)return;const L=O.status==="fulfilled",D=B.status==="fulfilled";L&&u(O.value),D&&o(B.value),m(q=>L&&D?"live":L||D?"partial":q==="loading"?"offline":q),g(Date.now())};b();const A=window.setInterval(b,10*6e4);return()=>{h=!1,p.abort(),window.clearInterval(A)}},[]),{weather:s,marine:r,status:d,updatedAt:y}}

export function qn(s,u=!0){const r=X.useRef(s);X.useLayoutEffect(()=>{r.current=s}),X.useEffect(()=>{if(!u)return;let o=0,d=performance.now();const m=y=>{const g=Math.min(.1,(y-d)/1e3);d=y,r.current(y/1e3,g),o=requestAnimationFrame(m)};return o=requestAnimationFrame(m),()=>cancelAnimationFrame(o)},[u])}

export function bx(){const s=X.useRef(null),[u,r]=X.useState({w:0,h:0});return X.useLayoutEffect(()=>{const o=s.current;if(!o)return;const d=()=>r({w:o.clientWidth,h:o.clientHeight});d();const m=new ResizeObserver(d);return m.observe(o),()=>m.disconnect()},[]),[s,u]}

export function Sx(){const s=X.useRef(null),[u,r]=X.useState(!1),o=typeof window<"u"&&"DeviceOrientationEvent"in window&&("ontouchstart"in window||navigator.maxTouchPoints>0);X.useEffect(()=>{if(!u){s.current=null;return}const y=g=>{const h=g;typeof h.webkitCompassHeading=="number"&&isFinite(h.webkitCompassHeading)?s.current=h.webkitCompassHeading:h.alpha!=null&&(h.absolute||g.type==="deviceorientationabsolute")&&(s.current=(360-h.alpha)%360)};return window.addEventListener("deviceorientationabsolute",y,!0),window.addEventListener("deviceorientation",y,!0),()=>{window.removeEventListener("deviceorientationabsolute",y,!0),window.removeEventListener("deviceorientation",y,!0)}},[u]);const d=X.useCallback(async()=>{const y: any=window.DeviceOrientationEvent;if(y&&typeof y.requestPermission=="function")try{if(await y.requestPermission()!=="granted")return!1}catch{return!1}return r(!0),!0},[]),m=X.useCallback(()=>r(!1),[]);return{headingRef:s,supported:o,enabled:u,enable:d,disable:m}}

export const jx=["N","NNE","NE","ENE","E","ESE","SE","SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"];

export function xa(s){return s==null||!isFinite(s)?"—":jx[Math.round((s%360+360)%360/22.5)%16]}

export function Ax(s){if(s==null||!isFinite(s))return"";const u=(s%360+360)%360;return["Norte","Nordés","Leste","Sueste","Sur","Vendaval","Travesía","Noroeste"][Math.round(u/45)%8]}

export const G1=[1,4,7,11,17,22,28,34,41,48,56,64],Mx=["Calma","Ventolina","Flojito","Flojo","Bonancible","Fresquito","Fresco","Frescachón","Temporal","Temporal fuerte","Temporal duro","Temporal muy duro","Temporal huracanado"];

export function zx(s){if(s==null||!isFinite(s))return{force:0,name:"—"};let u=0;for(;u<G1.length&&s>=G1[u];)u++;return{force:u,name:Mx[u]}}

export const B1=[{max:.001,name:"Calma (como un espejo)"},{max:.1,name:"Rizada"},{max:.5,name:"Marejadilla"},{max:1.25,name:"Marejada"},{max:2.5,name:"Fuerte marejada"},{max:4,name:"Gruesa"},{max:6,name:"Muy gruesa"},{max:9,name:"Arbolada"},{max:14,name:"Montañosa"},{max:1/0,name:"Enorme"}];

export function Nx(s){if(s==null||!isFinite(s))return{degree:0,name:"—"};const u=B1.findIndex(r=>s<=r.max);return{degree:u,name:B1[u].name}}

export function Ex(s){return s==null||!isFinite(s)?"Sin datos":s===0?"Despejado":s===1?"Poco nuboso":s===2?"Intervalos nubosos":s===3?"Cubierto":s===45||s===48?"Niebla":s>=51&&s<=57?"Llovizna":s>=61&&s<=67?"Lluvia":s>=71&&s<=77?"Nieve":s>=80&&s<=82?"Chubascos":s>=85&&s<=86?"Chubascos de nieve":s>=95?"Tormenta":"Variable"}

export function Tx(s){return s==null?!1:s>=51&&s<=67||s>=80&&s<=82||s>=95}

export function wx(s){if(s==null||!isFinite(s))return"Tendencia sin datos";const u=Math.abs(s);if(u<.4)return"Estable";const r=s>0?"Subiendo":"Bajando";return u<=1.5?`${r} lentamente`:u<=3.5?r:u<=6?`${r} rápidamente`:`${r} muy rápidamente`}

export const kt=(s,u=1)=>s==null||!isFinite(s)?"—":s.toLocaleString("es-ES",{minimumFractionDigits:u,maximumFractionDigits:u}),Ft=(s,u,r)=>Math.min(r,Math.max(u,s)),Gn=(s,u,r)=>s+(u-s)*r,Jt=(s,u,r)=>{const o=Ft((r-s)/(u-s),0,1);return o*o*(3-2*o)};
