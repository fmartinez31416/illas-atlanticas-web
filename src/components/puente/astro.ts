/*
 * astro.ts · Puente de Mando — Illas Atlánticas Ático
 * Portado del diseño validado: mismas clases, rótulos y geometría que el DOM de Arena.
 */
import { Ie, fx } from './config';
import { Ft, Gn, Jt } from './data';

export function Yn(s){let u=s>>>0;return()=>{u=u+1831565813>>>0;let r=u;return r=Math.imul(r^r>>>15,r|1),r^=r+Math.imul(r^r>>>7,r|61),((r^r>>>14)>>>0)/4294967296}}

export function At(s,u,r,o){const d=(o-90)*Math.PI/180;return[s+r*Math.cos(d),u+r*Math.sin(d)]}

export function me(s,u,r,o,d){const[m,y]=At(s,u,r,o),[g,h]=At(s,u,r,d),p=Math.abs(d-o)>180?1:0,b=d>o?1:0;return`M ${m.toFixed(2)} ${y.toFixed(2)} A ${r} ${r} 0 ${p} ${b} ${g.toFixed(2)} ${h.toFixed(2)}`}

export const Ra=Math.PI/180,sh=180/Math.PI,Wt=(s,u,r)=>[Gn(s[0],u[0],r),Gn(s[1],u[1],r),Gn(s[2],u[2],r)],Cx=(s,u)=>[s[0]*u[0]/255,s[1]*u[1]/255,s[2]*u[2]/255],Ox=s=>(.2126*s[0]+.7152*s[1]+.0722*s[2])/255,ce=s=>s.map(u=>Math.round(Ft(u,0,255))).join(", ");

export function _x(s,u){if(u<=s[0][0])return s[0][1];for(let r=1;r<s.length;r++)if(u<=s[r][0]){const[o,d]=s[r-1],[m,y]=s[r];return Wt(d,y,(u-o)/(m-o))}return s[s.length-1][1]}

export const Dx=[[-6,[176,120,160]],[-2,[255,124,80]],[1,[255,146,88]],[4,[255,178,118]],[9,[255,206,158]],[16,[255,227,190]],[30,[255,240,218]],[55,[255,248,236]]],Rx=[174,198,242];

export function Lx(s){const u=Math.acos(Ft(2*s-1,-1,1))*sh,r=.026*u+4e-9*Math.pow(u,4);return Math.pow(10,-.4*r)}

export function Ux(s,u){const r=Ft((u.cloud??25)/100,0,1),o=s.sunAlt,d=Math.sin(Math.max(0,o)*Ra),m=o>0?1098*d*Math.exp(-.057/Math.max(.03,d)):0;let y=1-.75*Math.pow(r,3.4);const g=u.shortwave!=null&&isFinite(u.shortwave)&&m>60;g&&(y=Ft(u.shortwave/m,.04,1.15));const h=o>0?g?u.shortwave:m*y:0,p=o>0?Jt(.32,.82,y)*Jt(.2,4,o):0,b=Math.pow(Ft(h/950,0,1),.55),A=Jt(-12,-.5,o)*(1-Jt(0,7,o)),O=Lx(s.moonFraction),B=Jt(-.8,8,s.moonAlt),L=Math.pow(Math.sin(Math.max(.02,s.moonAlt)*Ra),.35),D=Math.pow(O,.45)*B*L*(1-.82*r),q=1-Jt(-9,-2,o),V=D*q,et=s.moonAlt>0?.27*O*Math.sin(s.moonAlt*Ra)*(1-.8*r):0,ct=Jt(-8,8,o),P=Wt(_x(Dx,o),[236,238,242],r*.65);let yt=Wt([255,250,243],[206,211,218],Jt(.25,1,r));const at=o>-3?1-Jt(3,20,o):1;yt=Wt(yt,Cx(yt,P),at*.62*(1-.6*r));const W=Gn(.84,1,Ft(b*1.3,0,1));yt=yt.map(te=>te*W);const U=Wt([27,32,52],[88,105,146],Ft(V*1.2,0,1));let dt=Wt(U,yt,ct);dt=Wt(dt,[120,98,150],A*.32*(1-ct*.8));let ot;o>.3?ot="sun":o>-8?ot="twilight":V>.06?ot="moon":ot="night";const it=ot==="moon"?s.moonAz:s.sunAz,Nt=ot==="moon"?s.moonAlt:o,ue=Ft(Nt,2,88),qt=(it-fx+540)%360-180,Ct=Math.sin(qt*Ra),T=Math.cos(qt*Ra),Y=-(.45+.55*(T+1)/2),H=Math.atan2(Ct,-Y)*sh,gt=Ft(1/Math.tan(ue*Ra),.35,3.2),bt=ot==="sun"?p*b:ot==="twilight"?.14*A:ot==="moon"?V*(1-r*.5):0,S=ot==="sun"?b:ot==="twilight"?.14+.22*A:ot==="moon"?V*.6:.03,_=ot==="moon"?Rx:ot==="night"?[140,156,196]:P,k=(2+gt*4)*(.35+bt),Z=Ox(dt),nt=1-Jt(.3,.62,Z),ut=1-Math.sin(ue*Ra);let I="",tt="",rt="",Zt=0;return ot==="sun"?(I="Sol",tt=`${Math.round(h)} W/m²`,rt=`≈ ${Math.round(h*118/1e3)} klx · ${Math.round(Ft(y,0,1)*100)} % de cielo limpio`,Zt=Math.round(Ft(h/1e3,0,1)*100)):ot==="twilight"?(I=o>-6?"Crepúsculo civil":"Crepúsculo náutico",tt=`Sol a ${o.toFixed(1).replace(".",",")}°`,rt=o>-6?"Luz difusa · hora azul":"Horizonte aún visible",Zt=Math.round(A*12)):ot==="moon"?(I="Luna",tt=`${Math.round(s.moonFraction*100)} % iluminada`,rt=`≈ ${et.toFixed(2).replace(".",",")} lx · altura ${Math.round(s.moonAlt)}°`,Zt=Math.round(D*100)):(I="Noche cerrada",tt=s.moonAlt>0?"Luna velada":"Luna bajo el horizonte",rt="Luz de estrellas ≈ 0,002 lx",Zt=0),{source:ot,title:I,value:tt,detail:rt,percent:Zt,sunI:b,moonI:D,intensity:S,beam:p,clearness:y,irradiance:h,lux:ot==="sun"?h*118:et,lightRGB:_,ambRGB:dt,ambientLuma:Z,lamp:nt,angle:H,dx:Ct,front:T,poolX:50+Ct*38,poolY:Gn(-6,34,ut),poolOpacity:ot==="sun"?.25+.55*b:ot==="moon"?V*.75:ot==="twilight"?.22*A:0,shadowX:-Ct*k*1.3,shadowY:4+-Y*k,shadowBlur:10+gt*3+(1-bt)*12,shadowAlpha:.32+.3*bt+(1-ct)*.14,specX:50+Ct*24,specY:50+Y*24,shaftSkew:-Ct*(16+30*ut),shaftLen:38+62*ut,shaftOpacity:ot==="sun"?p*(.35+.65*b)*(T>-.3?1:.45):ot==="moon"?V*(1-r)*.85:0}}

export const{PI:Ll,sin:pt,cos:wt,tan:Lc,asin:Uc,atan2:Bn,acos:ch,sqrt:Hx,abs:Gx,round:uh}=Math,Tt=Ll/180,oh=1e3*60*60*24,rh=2440588,Ki=2451545,Bx=6378.14;

export function Sc(s){return new Date((s+.5-rh)*oh)}

export function Hc(s){return s.valueOf()/oh-.5+rh-Ki}

export function kx(s){const u=2e3+s/365.2425;let r;return u<1920?(r=u-1900,-2.79+r*(1.494119+r*(-.0598939+r*(.0061966-r*197e-6)))):u<1941?(r=u-1920,21.2+r*(.84493+r*(-.0761+r*.0020936))):u<1961?(r=u-1950,29.07+r*(.407+r*(-1/233+r/2547))):u<1986?(r=u-1975,45.45+r*(1.067+r*(-1/260-r/718))):u<2005?(r=u-2e3,63.86+r*(.3345+r*(-.060374+r*(.0017275+r*(651814e-9+r*2373599e-11))))):u<2050?(r=u-2e3,62.92+r*(.32217+r*.005589)):(r=(u-1820)/100,-20+32*r*r-.5628*(2150-u))}

export function Zn(s){return s+kx(s)/86400}

export function fh(s,u,r){return(Bn(pt(s),wt(s)*pt(u)-Lc(r)*wt(u))/Tt+540)%360}

export function Gc(s,u,r){return Uc(pt(u)*pt(r)+wt(u)*wt(r)*wt(s))}

export function Bc(s,u){return Tt*(280.46061837+360.98564736629*s)-u}

export function dh(s){return s<0&&(s=0),2967e-7/Lc(s+.00312536/(s+.08901179))}

export function Pi(s){const u=s/36525,r=Tt*(280.46646+u*(36000.76983+u*3032e-7)),o=Tt*(357.52911+u*(35999.05029-u*1537e-7)),d=pt(o),m=wt(o),y=Tt*((1.914602-u*(.004817+u*14e-6))*d+(.019993-101e-6*u)*2*d*m+289e-6*d*(3-4*d*d)),g=Tt*(125.04-1934.136*u),h=r+y-Tt*(.00569+.00478*pt(g)),p=Tt*(23.439291-u*(.0130042+u*(16e-8-u*504e-9)))+Tt*.00256*wt(g);return{ra:Bn(wt(p)*pt(h),wt(h)),dec:Uc(pt(p)*pt(h))}}

export function Ji(s,u,r=undefined){const o=Tt*9.0192143,d=Tt*u,m=Hc(s),y=Pi(Zn(m)),g=Bc(m,o)-y.ra,h=Gc(g,d,y.dec);return{azimuth:fh(g,d,y.dec),altitude:(h+dh(h))/Tt}}

export const k1: any=[[-.833,"sunrise","sunset"],[-.3,"sunriseEnd","sunsetStart"],[-6,"dawn","dusk"],[-12,"nauticalDawn","nauticalDusk"],[-18,"nightEnd","night"],[6,"goldenHourEnd","goldenHour"]],q1=9e-4;

export function qx(s){return-2.076*Hx(s)/60}

export function hh(s){return s-2*Ll*uh(s/(2*Ll))}

export function Yx(s,u){for(let r=0;r<3;r++){const o=hh(Bc(s,u)-Pi(Zn(s)).ra);s-=o/(2*Ll)}return s}

export function Y1(s,u,r,o,d,m){const y=(pt(s)-pt(d)*pt(m))/(wt(d)*wt(m));if(y<-1||y>1)return NaN;let g=u+r*ch(y)/(2*Ll);for(let h=0;h<2;h++){const p=Pi(Zn(g)),b=hh(Bc(g,o)-p.ra),A=Gc(b,d,p.dec),O=wt(d)*wt(p.dec)*pt(b);if(Gx(O)<1e-6)break;g+=(A-s)/(2*Ll*O)}return g}

export function Zx(s,u,r=undefined,o=0){const d=Tt*9.0192143,m=Tt*u,y=qx(o),g=uh(Hc(s)-q1-d/(2*Ll)),h=Yx(g+q1+d/(2*Ll),d),p=Pi(Zn(h)).dec,b: any={solarNoon:Sc(h+Ki),nadir:Sc(h+Ki-.5)};for(const[A,O,B]of k1){const L=(A+y)*Tt,D=Y1(L,h,-1,d,m,p),q=Y1(L,h,1,d,m,p);b[O]=Number.isNaN(D)?null:Sc(D+Ki),b[B]=Number.isNaN(q)?null:Sc(q+Ki)}if(b.sunrise===null){const A=Gc(0,m,p),O=(k1[0][0]+y)*Tt;b.alwaysUp=A>O,b.alwaysDown=A<=O}return b}

export function Xx(s){const u=Tt*(125.04452-1934.136261*s),r=Tt*(280.4665+36000.7698*s),o=Tt*(218.3165+481267.8813*s),d=(-17.2*pt(u)-1.32*pt(2*r)-.23*pt(2*o)+.21*pt(2*u))/3600,m=(9.2*wt(u)+.57*wt(2*r)+.1*wt(2*o)-.09*wt(2*u))/3600,y=23.439291-s*(.0130042+s*(16e-8-s*504e-9));return{dpsi:d,eps:Tt*(y+m)}}

export const La=new Int32Array([0,0,1,0,6288774,-20905355,2,0,-1,0,1274027,-3699111,2,0,0,0,658314,-2955968,0,0,2,0,213618,-569925,0,1,0,0,-185116,48888,0,0,0,2,-114332,-3149,2,0,-2,0,58793,246158,2,-1,-1,0,57066,-152138,2,0,1,0,53322,-170733,2,-1,0,0,45758,-204586,0,1,-1,0,-40923,-129620,1,0,0,0,-34720,108743,0,1,1,0,-30383,104755,2,0,0,-2,15327,10321,0,0,1,2,-12528,0,0,0,1,-2,10980,79661,4,0,-1,0,10675,-34782,0,0,3,0,10034,-23210,4,0,-2,0,8548,-21636,2,1,-1,0,-7888,24208,2,1,0,0,-6766,30824,1,0,-1,0,-5163,-8379,1,1,0,0,4987,-16675,2,-1,1,0,4036,-12831,2,0,2,0,3994,-10445,4,0,0,0,3861,-11650,2,0,-3,0,3665,14403,0,1,-2,0,-2689,-7003,2,0,-1,2,-2602,0,2,-1,-2,0,2390,10056,1,0,1,0,-2348,6322,2,-2,0,0,2236,-9884,0,1,2,0,-2120,5751,0,2,0,0,-2069,0,2,-2,-1,0,2048,-4950,2,0,1,-2,-1773,4130,2,0,0,2,-1595,0,4,-1,-1,0,1215,-3958,0,0,2,2,-1110,0,3,0,-1,0,-892,3258,2,1,1,0,-810,2616,4,-1,-2,0,759,-1897,0,2,-1,0,-713,-2117,2,2,-1,0,-700,2354,2,1,-2,0,691,0,2,-1,0,-2,596,0,4,0,1,0,549,-1423,0,0,4,0,537,-1117,4,-1,0,0,520,-1571,1,0,-2,0,-487,-1739,2,1,0,-2,-399,0,0,0,2,-2,-381,-4421,1,1,1,0,351,0,3,0,-2,0,-340,0,4,0,-3,0,330,0,2,-1,2,0,327,0,0,2,1,0,-323,1165,1,1,-1,0,299,0,2,0,3,0,294,0,2,0,-1,-2,0,8752]),_n=new Int32Array([0,0,0,1,5128122,0,0,1,1,280602,0,0,1,-1,277693,2,0,0,-1,173237,2,0,-1,1,55413,2,0,-1,-1,46271,2,0,0,1,32573,0,0,2,1,17198,2,0,1,-1,9266,0,0,2,-1,8822,2,-1,0,-1,8216,2,0,-2,-1,4324,2,0,1,1,4200,2,1,0,-1,-3359,2,-1,-1,1,2463,2,-1,0,1,2211,2,-1,-1,-1,2065,0,1,-1,-1,-1870,4,0,-1,-1,1828,0,1,0,1,-1794,0,0,0,3,-1749,0,1,-1,1,-1565,1,0,0,1,-1491,0,1,1,1,-1475,0,1,1,-1,-1410,0,1,0,-1,-1344,1,0,0,-1,-1335,0,0,3,1,1107,4,0,0,-1,1021,4,0,-1,1,833,0,0,1,-3,777,4,0,-2,1,671,2,0,0,-3,607,2,0,2,-1,596,2,-1,1,-1,491,2,0,-2,1,-451,0,0,3,-1,439,2,0,2,1,422,2,0,-3,-1,421,2,1,-1,1,-366,2,1,0,1,-351,4,0,0,1,331,2,-1,1,1,315,2,-2,0,-1,302,0,0,1,3,-283,2,1,1,-1,-229,1,1,0,-1,223,1,1,0,1,223,0,1,-2,-1,-220,2,1,-1,-1,-220,1,0,1,1,-185,2,-1,-2,-1,181,0,1,2,1,-177,4,0,-2,-1,176,4,-1,-1,-1,166,1,0,1,-1,-164,4,0,1,-1,132,1,0,-1,-1,-119,4,-1,0,-1,115,2,-2,0,1,107]);

export function mh(s){const u=s/36525,r=218.3164477+u*(481267.88123421+u*(-.0015786+u*(1/538841-u/65194e3))),o=297.8501921+u*(445267.1114034+u*(-.0018819+u*(1/545868-u/113065e3))),d=357.5291092+u*(35999.0502909+u*(-1536e-7+u/2449e4)),m=134.9633964+u*(477198.8675055+u*(.0087414+u*(1/69699-u/14712e3))),y=93.272095+u*(483202.0175233+u*(-.0036539+u*(-1/3526e3+u/86331e4))),g=119.75+131.849*u,h=53.09+479264.29*u,p=313.45+481266.484*u,b=1-u*(.002516+u*74e-7),A=Tt*o,O=Tt*d,B=Tt*m,L=Tt*y;let D=0,q=0,V=0;for(let U=0;U<La.length;U+=6){const dt=La[U+1],ot=La[U]*A+dt*O+La[U+2]*B+La[U+3]*L,it=dt===1||dt===-1?b:dt===2||dt===-2?b*b:1;D+=La[U+4]*it*pt(ot),q+=La[U+5]*it*wt(ot)}for(let U=0;U<_n.length;U+=5){const dt=_n[U+1],ot=_n[U]*A+dt*O+_n[U+2]*B+_n[U+3]*L,it=dt===1||dt===-1?b:dt===2||dt===-2?b*b:1;V+=_n[U+4]*it*pt(ot)}const et=Tt*g,ct=Tt*r;D+=3958*pt(et)+1962*pt(ct-L)+318*pt(Tt*h),V+=-2235*pt(ct)+382*pt(Tt*p)+175*pt(et-L)+175*pt(et+L)+127*pt(ct-B)-115*pt(ct+B);const{dpsi:P,eps:yt}=Xx(u),at=Tt*(r+D/1e6+P),W=Tt*(V/1e6);return{ra:Bn(pt(at)*wt(yt)-Lc(W)*pt(yt),wt(at)),dec:Uc(pt(W)*wt(yt)+wt(W)*pt(yt)*pt(at)),dist:385000.56+q/1e3}}

export function Sr(s,u,r=undefined){const o=Tt*9.0192143,d=Tt*u,m=Hc(s),y=mh(Zn(m)),g=Bc(m,o)-y.ra,h=Gc(g,d,y.dec),p=h-Uc(Bx/y.dist*wt(h)),b=Bn(pt(g),Lc(d)*wt(y.dec)-pt(y.dec)*wt(g));return{azimuth:fh(g,d,y.dec),altitude:(p+dh(p))/Tt,distance:y.dist,parallacticAngle:b/Tt}}

export function hr(s=new Date){const u=Zn(Hc(s)),r=Pi(u),o=mh(u),d=149598e3,m=ch(pt(r.dec)*pt(o.dec)+wt(r.dec)*wt(o.dec)*wt(r.ra-o.ra)),y=Bn(d*pt(m),o.dist-d*wt(m)),g=Bn(wt(r.dec)*pt(r.ra-o.ra),pt(r.dec)*wt(o.dec)-wt(r.dec)*pt(o.dec)*wt(r.ra-o.ra)),h=g<0;return{fraction:(1+wt(y))/2,phase:.5+.5*y*(h?-1:1)/Ll,angle:g/Tt,waxing:h}}

export const ts="Europe/Madrid",Vx=new Intl.DateTimeFormat("en-GB",{timeZone:ts,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",hourCycle:"h23"});

export function Xn(s){const u: any={};for(const r of Vx.formatToParts(s))u[r.type]=r.value;return{year:+u.year,month:+u.month,day:+u.day,hour:+u.hour%24,minute:+u.minute,second:+u.second}}

export function Z1(s){const u=Xn(s);return Date.UTC(u.year,u.month-1,u.day,u.hour,u.minute,u.second)-Math.floor(s.getTime()/1e3)*1e3}

export function xh(s){const u=Xn(s),r=Date.UTC(u.year,u.month-1,u.day,0,0,0),o=Z1(new Date(r));let d=r-o;const m=Z1(new Date(d));return m!==o&&(d=r-m),new Date(d)}

export function Qx(s){const u=Xn(s);return`${u.year}-${u.month}-${u.day}`}

export function Dn(s){const u=Xn(s);return u.hour*60+u.minute+u.second/60}

export const $x=new Intl.DateTimeFormat("es-ES",{timeZone:ts,hour:"2-digit",minute:"2-digit",hourCycle:"h23"}),Kx=new Intl.DateTimeFormat("es-ES",{timeZone:ts,hour:"2-digit",minute:"2-digit",second:"2-digit",hourCycle:"h23"}),Jx=new Intl.DateTimeFormat("es-ES",{timeZone:ts,weekday:"long",day:"numeric",month:"long"}),Wx=new Intl.DateTimeFormat("es-ES",{timeZone:ts,day:"numeric",month:"short"}),jr=s=>!!s&&!isNaN(s.getTime()),Fe=s=>jr(s)?$x.format(s):"--:--",Fx=s=>jr(s)?Kx.format(s):"--:--:--",ph=s=>Jx.format(s),X1=s=>jr(s)?Wx.format(s).replace(".",""):"—";

export function Ix(s){const u=Math.round(s/6e4);return`${Math.floor(u/60)} h ${String(u%60).padStart(2,"0")} min`}

export function V1(s){const u=(Math.round(s)%1440+1440)%1440;return`${String(Math.floor(u/60)).padStart(2,"0")}:${String(u%60).padStart(2,"0")}`}

export const Q1=[{from:0,to:240,name:"Guardia de media",range:"00–04 h"},{from:240,to:480,name:"Guardia de alba",range:"04–08 h"},{from:480,to:720,name:"Guardia de mañana",range:"08–12 h"},{from:720,to:960,name:"Guardia de tarde",range:"12–16 h"},{from:960,to:1080,name:"Primer cuartillo",range:"16–18 h"},{from:1080,to:1200,name:"Segundo cuartillo",range:"18–20 h"},{from:1200,to:1440,name:"Guardia de prima",range:"20–24 h"}];

export function $1(s){const u=Xn(s),r=u.hour*60+u.minute+u.second/60,o=Math.floor(r/30);let d=o%8;d===0&&(d=8),o>=37&&o<=39&&(d=o-36);const m=Q1.find(y=>r>=y.from&&r<y.to)??Q1[0];return{bells:d,watch:m.name,watchRange:m.range,watchProgress:(r-m.from)/(m.to-m.from),halfHourIndex:o}}

export const{lat:Dl}=Ie,Za=s=>(s%360+360)%360;

export function yh(s){const u=Ji(s,Dl),r=Sr(s,Dl),o=hr(s);return{sunAlt:u.altitude,sunAz:Za(u.azimuth),moonAlt:r.altitude,moonAz:Za(r.azimuth),moonFraction:o.fraction,moonPhase:o.phase,moonLimbAngle:o.angle-r.parallacticAngle,moonDistance:r.distance}}

export const Ua=s=>s&&!isNaN(s.getTime())?s:null;

export function Px(s){const u=xh(s).getTime(),r=u+24*36e5,o=Zx(new Date(u+12*36e5),Dl),d=[],m=[];let y=null,g=null;const h=.26;let p=null;for(let et=u;et<=r;et+=10*6e4){const ct=new Date(et),P=Ji(ct,Dl),yt=Sr(ct,Dl);d.push({t:et,alt:P.altitude,az:Za(P.azimuth)}),m.push({t:et,alt:yt.altitude,az:Za(yt.azimuth)});const at=yt.altitude+h;p&&(p.h<0&&at>=0&&!y?y=new Date(p.t+(et-p.t)*-p.h/(at-p.h)):p.h>=0&&at<0&&!g&&(g=new Date(p.t+(et-p.t)*p.h/(p.h-at)))),p={t:et,h:at}}const b=Ua(o.sunrise),A=Ua(o.sunset),O=Ua(o.solarNoon),B=O?Ji(O,Dl).altitude:0;let L=null,D=null,q=s.getTime(),V=hr(new Date(q)).phase;for(let et=1;et<=768&&(!L||!D);et++){const ct=s.getTime()+et*36e5,P=hr(new Date(ct)).phase;!L&&V<.5&&P>=.5&&(L=new Date(q+(.5-V)/(P-V)*36e5)),!D&&V>.85&&P<.15&&(D=new Date(q+(1-V)/(P+1-V)*36e5)),q=ct,V=P}return{dayStart:u,dayEnd:r,sunrise:b,sunset:A,solarNoon:O,dawn:Ua(o.dawn),dusk:Ua(o.dusk),nauticalDawn:Ua(o.nauticalDawn),nauticalDusk:Ua(o.nauticalDusk),sunriseAz:b?Za(Ji(b,Dl).azimuth):null,sunsetAz:A?Za(Ji(A,Dl).azimuth):null,noonAlt:B,dayLength:b&&A?A.getTime()-b.getTime():0,sunPath:d,moonPath:m,moonrise:y,moonset:g,nextFull:L,nextNew:D}}

export function tp(s,u){const r=[];let o=null;for(let d=s;d<=u;d+=8*6e4){const m=Za(Sr(new Date(d),Dl).azimuth);o&&o.az<180&&m>=180&&m-o.az<30&&r.push(o.t+(d-o.t)*(180-o.az)/(m-o.az)),o={t:d,az:m}}return r}

export function ep(s){return s<.02||s>.98?"Luna nueva":s<.235?"Luna creciente":s<.265?"Cuarto creciente":s<.485?"Gibosa creciente":s<.515?"Luna llena":s<.735?"Gibosa menguante":s<.765?"Cuarto menguante":"Luna menguante"}

export const lp=29.530588853;

export function ap(s,u){if(u<=.004)return"";if(u>=.996)return`M 0 ${-s} A ${s} ${s} 0 1 1 0 ${s} A ${s} ${s} 0 1 1 0 ${-s} Z`;const r=s*Math.abs(1-2*u),o=u<.5?0:1;return`M 0 ${-s} A ${s} ${s} 0 0 1 0 ${s} A ${r.toFixed(3)} ${s} 0 0 ${o} 0 ${-s} Z`}

export const np=s=>-s-90;
