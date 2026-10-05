/*
 * DashboardNautico.tsx — El Puente de Mando · Illas Atlánticas Ático
 *
 * Interior del puente: la ventana sobre la Ría de Arousa, los doce instrumentos de caoba y
 * latón y los mandos de a bordo. Reproduce el diseño validado (Arena): mismas clases Tailwind,
 * mismos rótulos literales y misma geometría de diales que el DOM de referencia.
 *
 * Datos reales: Open-Meteo (api.open-meteo.com + marine-api.open-meteo.com) para Aguiño
 * (42°27′39″ N · 9°00′54″ W — la terraza del ático) — ver puente/data.ts. El reloj se actualiza cada segundo.
 */

import * as X from 'react';

import { Ie } from './puente/config';
import { gx, vx as usePuenteData, Sx as useDeviceHeading, yx, Ex, Ft, Tx } from './puente/data';
import { Dn, Qx, xh, Px, yh, Ux, $1, ce, Fx, ph } from './puente/astro';
import { da as bridgeSound, lh } from './puente/sound';
import { isOceanOn, stopOcean } from '../lib/oceanSound';

import { il as Plaque, Ga as Panel } from './puente/parts';
import { oy as Campanas } from './puente/instruments/Bells';
import { hy as Barometro } from './puente/instruments/Barometer';
import { xy as Anemometro } from './puente/instruments/Anemometer';
import { gy as Termohigrometro } from './puente/instruments/Thermo';
import { Xy as CartaNautica } from './puente/instruments/Chart';
import { by as Bitacora } from './puente/instruments/Bitacora';
import { zy as Mareografo, jy as tideModelOf, Ay as tideStateOf } from './puente/instruments/Tides';
import { Ny as EsferaCeleste } from './puente/instruments/Celestial';
import { wy as Clinometro } from './puente/instruments/Clinometer';
import { Pronostico } from './puente/instruments/Forecast';
import { iy as Mandos } from './puente/parts';
import { Ventana } from './puente/instruments/VentanaFoto';

interface DashboardNauticoProps {
  onBack: () => void;
  onOpenBooking?: () => void;
}

export function DashboardNautico({ onBack, onOpenBooking }: DashboardNauticoProps) {
  const now = gx(1000);
  const { weather, marine, status, updatedAt } = usePuenteData();
  const heading = useDeviceHeading();

  const [scrub, setScrub] = X.useState<number | null>(null);
  const [playing, setPlaying] = X.useState(false);
  const [soundOn, setSoundOn] = X.useState(() => isOceanOn());
  const [lampMode, setLampMode] = X.useState<'roja' | 'ambar'>('ambar');
  const [brightness, setBrightness] = X.useState<number>(() => {
    try {
      const v = Number(window.localStorage.getItem('puenteBrillo'));
      if (v >= 1 && v <= 2.2) return v;
    } catch { /* sin almacenamiento */ }
    return 1;
  });
  const onBrightness = (v: number) => {
    setBrightness(v);
    try { window.localStorage.setItem('puenteBrillo', String(v)); } catch { /* sin almacenamiento */ }
  };

  const dayKey = Qx(now);
  const dayStart = X.useMemo(() => xh(now).getTime(), [dayKey]);
  const live = scrub == null;
  const shown = live ? now : new Date(dayStart + scrub * 6e4);
  const shownMs = shown.getTime();
  const offsetMs = shownMs - now.getTime();

  // Travesía 24 h: avanza la hora simulada en tiempo real mientras está en marcha
  X.useEffect(() => {
    if (!playing) return;
    let raf = 0;
    let last = performance.now();
    const tick = (t: number) => {
      const dt = t - last;
      if (dt > 60) {
        last = t;
        setScrub((v) => {
          const next = (v ?? Dn(new Date())) + (dt / 1e3) * 36;
          return next >= 1440 ? next - 1440 : next;
        });
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing]);

  const almanac = X.useMemo(() => Px(new Date(dayStart + 12 * 36e5)), [dayStart]);
  const sky = X.useMemo(() => yh(new Date(shownMs)), [shownMs]);
  const model = X.useMemo(() => yx(shownMs, weather, marine, live), [shownMs, weather, marine, live]);
  const tideModel = X.useMemo(() => tideModelOf(marine, dayStart), [marine, dayStart]);
  const tide = X.useMemo(() => tideStateOf(tideModel, shownMs), [tideModel, shownMs]);
  const lighting = X.useMemo(
    () => Ux(sky, { cloud: model.cloud, shortwave: model.shortwave }),
    [sky, model.cloud, model.shortwave],
  );
  const bells = $1(shown);

  // Sonido del mar: el motor del puente (oleaje al ritmo del periodo real) toma el relevo
  // del sonido de la puerta al subir a bordo.
  X.useEffect(() => {
    if (isOceanOn()) stopOcean();
    return () => bridgeSound.stopSea();
  }, []);
  X.useEffect(() => {
    if (soundOn) {
      bridgeSound.unlock();
      bridgeSound.startSea(model.wavePeriod ?? 9, model.waveHeight ?? 1.2);
    } else {
      bridgeSound.stopSea();
    }
  }, [soundOn, model.wavePeriod, model.waveHeight]);

  const halfPeriod = Math.round((model.wavePeriod ?? 9) * 2);
  const waveTenths = Math.round((model.waveHeight ?? 1.2) * 10);
  X.useEffect(() => {
    if (soundOn) bridgeSound.updateSea(halfPeriod / 2, waveTenths / 10);
  }, [soundOn, halfPeriod, waveTenths]);

  // La campana suena sola cada media hora (solo con el sonido del mar encendido)
  const lastHalf = X.useRef<number | null>(null);
  X.useEffect(() => {
    if (!live) {
      lastHalf.current = null;
      return;
    }
    if (lastHalf.current != null && lastHalf.current !== bells.halfHourIndex && soundOn) bridgeSound.ringBells(bells.bells);
    lastHalf.current = bells.halfHourIndex;
  }, [bells.halfHourIndex, bells.bells, live, soundOn]);

  const minOf = (d: Date | null | undefined): number | null => (d ? Dn(d) : null);

  const lunarPreset = X.useMemo(() => {
    let best: { t: number; alt: number } | null = null;
    almanac.moonPath.forEach((moon, i) => {
      const sun = almanac.sunPath[i];
      if (sun && sun.alt < -8 && moon.alt > 8 && (!best || moon.alt > best.alt)) best = { t: moon.t, alt: moon.alt };
    });
    const found = best as { t: number; alt: number } | null;
    if (found) return { label: 'Luna', minutes: Dn(new Date(found.t)) };
    const nauticalDusk = almanac.nauticalDusk ? new Date(almanac.nauticalDusk.getTime() + 90 * 6e4) : null;
    return { label: 'Noche', minutes: nauticalDusk && nauticalDusk.getTime() < almanac.dayEnd ? Dn(nauticalDusk) : 1410 };
  }, [almanac]);

  const presets = [
    { label: 'Alba', minutes: almanac.sunrise ? minOf(new Date(almanac.sunrise.getTime() - 12 * 6e4)) : null },
    { label: 'Mediodía', minutes: minOf(almanac.solarNoon) },
    { label: 'Ocaso', minutes: almanac.sunset ? minOf(new Date(almanac.sunset.getTime() + 4 * 6e4)) : null },
    lunarPreset,
  ];

  const onScrub = (minutes: number) => {
    setPlaying(false);
    setScrub(minutes);
  };
  const onLive = () => {
    setPlaying(false);
    setScrub(null);
  };
  const onPlay = () => {
    if (playing) setPlaying(false);
    else {
      setScrub((v) => v ?? Dn(new Date()));
      setPlaying(true);
    }
  };
  const toggleCompass = async () => {
    if (heading.enabled) heading.disable();
    else await heading.enable();
  };

  const lit = Ft(0.3 + lighting.ambientLuma * 0.85 + lighting.lamp * 0.2, 0.3, 1);
  const bridgeVars = {
    '--light-angle': `${lighting.angle.toFixed(1)}deg`,
    '--light-rgb': ce(lighting.lightRGB),
    '--amb-rgb': ce(lighting.ambRGB),
    '--lamp': lighting.lamp.toFixed(3),
    '--lamp-rgb': lampMode === 'roja' ? '255, 62, 40' : '255, 170, 84',
    '--light-int': lighting.intensity.toFixed(3),
    '--sx': `${lighting.shadowX.toFixed(1)}px`,
    '--sy': `${lighting.shadowY.toFixed(1)}px`,
    '--sb': `${lighting.shadowBlur.toFixed(1)}px`,
    '--sa': lighting.shadowAlpha.toFixed(3),
    '--spec-x': `${lighting.specX.toFixed(1)}%`,
    '--spec-y': `${lighting.specY.toFixed(1)}%`,
    '--pool-x': `${lighting.poolX.toFixed(1)}%`,
    '--pool-y': `${lighting.poolY.toFixed(1)}%`,
    '--pool-op': lighting.poolOpacity.toFixed(3),
    '--shaft-skew': `${lighting.shaftSkew.toFixed(1)}deg`,
    '--shaft-len': `${lighting.shaftLen.toFixed(1)}%`,
    '--shaft-op': lighting.shaftOpacity.toFixed(3),
    '--lit': lit.toFixed(3),
  };

  const llueve = (model.precip ?? 0) > 0.05 || Tx(model.code);
  const [avisos, setAvisos] = X.useState<{ titulo: string; texto: string; enlace: string; fuente?: string }[]>([]);
  X.useEffect(() => {
    let vivo = true;
    const cargar = async () => {
      try {
        const r = await fetch('https://api.illasatlanticasatico.es/api/avisos');
        if (!r.ok) return;
        const d = await r.json();
        if (vivo && Array.isArray(d.avisos) && d.avisos.length) {
          setAvisos(d.avisos.slice(0, 3));
        }
      } catch { /* sin avisos: silencio */ }
    };
    cargar();
    return () => { vivo = false; };
  }, []);
  const [trafico, setTrafico] = X.useState<{ nombre: string; km: number; min_con_trafico: number; min_sin_trafico: number; retraso_min: number }[]>([]);
  X.useEffect(() => {
    let vivo = true;
    fetch('https://api.illasatlanticasatico.es/api/trafico')
      .then((r) => r.json())
      .then((d) => { if (vivo && Array.isArray(d.rutas) && d.rutas.length) setTrafico(d.rutas); })
      .catch(() => {});
    return () => { vivo = false; };
  }, []);
  const lightLine =
    llueve
      ? 'AHORA MISMO: LLUVIA SOBRE LA RÍA'
      : lighting.source === 'sun'
        ? `AHORA MISMO: SOL · ${lighting.value.toUpperCase()} SOBRE LA RÍA`
        : lighting.source === 'moon'
          ? `AHORA MISMO: LUNA ${Math.round(sky.moonFraction * 100)} % SOBRE SÁLVORA`
          : lighting.source === 'twilight'
            ? 'AHORA MISMO: CREPÚSCULO SOBRE LA RÍA'
            : 'AHORA MISMO: NOCHE CERRADA · FAROS ENCENDIDOS';

  const header = (
    <div className="relative h-[60px] wood-h shadow-[0_10px_22px_rgba(0,0,0,.6)] sm:h-[68px]">
      <div className="lacquer" />
      <div className="shade" />
      <div className="absolute inset-x-0 bottom-0 z-[6] h-[3px] brass-tube amb" />
      <div className="relative z-[7] mx-auto flex h-full max-w-[1520px] items-center justify-between gap-3 px-3 sm:px-6">
        <button type="button" onClick={onBack} className="group flex min-w-0 items-center gap-3 text-left">
          <span className="relative hidden h-10 w-10 shrink-0 place-items-center rounded-full brass amb inst-shadow sm:grid">
            <span className="font-display text-[12px] font-bold tracking-wider text-[#2a1c07]">IA</span>
          </span>
          <span className="min-w-0 leading-tight">
            <span className="block truncate font-display text-[12.5px] font-semibold tracking-[0.28em] text-[#f1d58f] sm:text-[15px]">
              ILLAS ATLÁNTICAS
            </span>
            <span className="block truncate font-serif text-[12px] italic text-[#e6d3a8]/85 sm:text-[13.5px]">
              Puente de mando · Aguiño, Ría de Arousa
            </span>
          </span>
        </button>

        <div className="relative isolate hidden items-center gap-3 rounded-md px-4 py-1.5 plaque lg:flex">
          <span className={`jewel ${live ? 'green' : 'amber'}`} />
          <span className="font-display text-[10px] font-semibold tracking-[0.3em] engraved">{live ? 'EN VIVO' : 'SIMULACIÓN'}</span>
          <span className="font-serif text-[18px] font-bold tabular-nums engraved">{Fx(shown)}</span>
          <span className="font-serif text-[14px] italic capitalize engraved-soft">{ph(shown)}</span>
          <div className="shade shade-lamp-soft rounded-md" />
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <span className="hidden font-display text-[10px] tracking-[0.2em] text-[#e6d3a8]/80 2xl:block">
            {Ie.latLabel} · {Ie.lonLabel}
          </span>
          <button
            type="button"
            onClick={onBack}
            className="hidden rounded-full border border-[#f1d58f]/40 px-4 py-2 font-display text-[10px] tracking-[0.22em] text-[#f1d58f] transition hover:bg-white/5 sm:inline-flex"
          >
            ← EL ÁTICO
          </button>
          <button
            type="button"
            onClick={() => onOpenBooking?.()}
            className="brass-btn rounded-full px-4 py-2 font-display text-[10px] font-bold tracking-[0.22em]"
          >
            RESERVAR
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div
      className="bridge min-h-screen bg-[#050609]"
      style={{ ...bridgeVars, filter: brightness === 1 ? undefined : `brightness(${brightness.toFixed(2)})` }}
    >
      <Ventana sky={sky} lighting={lighting} cond={model} header={header} />

      {avisos.length > 0 && (
        <div className="relative z-[5] border-b border-[#8a2f22]/60 bg-[#2a0f0a]/92 px-3 py-2 sm:px-6">
          {avisos.map((a, i) => (
            <p key={i} className="mx-auto flex max-w-[1520px] items-baseline gap-2 font-serif text-[12px] italic leading-snug text-[#f0c9a0] sm:text-[13.5px]">
              <span className="shrink-0 font-display text-[9px] font-bold not-italic tracking-[0.24em] text-[#d97a5c]">AVISO {a.fuente || 'AEMET'}</span>
              <span className="min-w-0">{a.titulo}{a.texto ? ` — ${a.texto}` : ''}</span>
            </p>
          ))}
        </div>
      )}

      {trafico.length > 0 && (
        <div className="relative z-[5] border-b border-[#123350]/70 bg-[#071522]/92 px-3 py-2 sm:px-6">
          <div className="mx-auto flex max-w-[1520px] flex-wrap items-baseline gap-x-6 gap-y-1">
            <span className="font-display text-[9px] font-bold tracking-[0.24em] text-[#D4A017]">TRÁFICO EN VIVO</span>
            {trafico.map((t, i) => (
              <span key={i} className="font-serif text-[12px] italic text-[#A9C9DD] sm:text-[13px]">
                {t.nombre}: <span className="not-italic font-mono text-[#EBE6DD]">{t.min_con_trafico} min</span>
                {t.retraso_min > 0 && (
                  <span className="not-italic text-[11px] text-[#d97a5c]"> (+{t.retraso_min}′ tráfico)</span>
                )}
                <span className="not-italic text-[10px] text-[#A9C9DD]/60"> · {t.km} km</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Falsarriba de caoba con los pomos de latón */}
      <div className="relative z-[3]">
        <div className="relative h-[26px] wood-h shadow-[0_12px_24px_rgba(0,0,0,.65)]">
          <div className="lacquer" />
          <div className="shade" />
          {[8, 30, 50, 70, 92].map((left) => (
            <span
              key={left}
              className="absolute top-[3px] z-[6] h-[16px] w-[7px] -translate-x-1/2 rounded-b-sm brass-tube amb"
              style={{ left: `${left}%` }}
            />
          ))}
        </div>
        <div className="absolute inset-x-3 -top-[6px] z-[7] h-[11px] rounded-full brass-tube amb shadow-[0_5px_9px_rgba(0,0,0,.6)] sm:inset-x-10" />
      </div>

      <main className="relative isolate wood">
        <div className="lacquer" />
        <div className="shade" />
        <div className="relative z-[7] mx-auto max-w-[1520px] px-3 pb-16 pt-8 sm:px-6 lg:px-10">
          <div className="mb-7 flex flex-col items-center gap-2 text-center">
            <Plaque title="PUENTE DE MANDO · ILLAS ATLÁNTICAS" className="px-10 py-2.5">
              {Ex(model.code)} en Aguiño · la misma vista que tiene un capitán fondeado frente a Sálvora
            </Plaque>
          </div>

          {/* Previsión a 7 días */}
          <Panel className="mb-6">
            <Pronostico daily={weather?.daily ?? null} />
          </Panel>

          {/* Fila 1 — campanas, barómetro, anemómetro y termohigrómetro */}
          <Panel className="mb-6">
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 xl:grid-cols-4">
              <Campanas date={shown} offsetMs={offsetMs} bells={bells} />
              <Barometro pressure={model.pressure} pressure3h={model.pressure3h} delta={model.pressureDelta} />
              <Anemometro speed={model.windSpeed} dir={model.windDir} gusts={model.gusts} />
              <Termohigrometro temp={model.temp} rh={model.rh} sst={model.sst} apparent={model.apparent} />
            </div>
          </Panel>

          {/* Fila 2 — carta náutica, bitácora y mareógrafo */}
          <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-12">
            <Panel className="md:col-span-2 xl:col-span-5">
              <CartaNautica windDir={model.windDir} windSpeed={model.windSpeed} currentVel={model.currentVel} currentDir={model.currentDir} />
            </Panel>
            <Panel className="xl:col-span-4">
              <Bitacora
                sunAz={sky.sunAz}
                sunAlt={sky.sunAlt}
                moonAz={sky.moonAz}
                moonAlt={sky.moonAlt}
                windDir={model.windDir}
                waveHeight={model.waveHeight}
                wavePeriod={model.wavePeriod}
                headingRef={heading.headingRef}
                deviceActive={heading.enabled}
              />
            </Panel>
            <Panel className="xl:col-span-3">
              <Mareografo model={tideModel} state={tide} at={shownMs} dayStart={dayStart} />
            </Panel>
          </div>

          {/* Fila 3 — esfera celeste y almanaque, estado de la mar y mandos */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-12">
            <Panel className="md:col-span-2 xl:col-span-5">
              <EsferaCeleste
                almanac={almanac}
                sky={sky}
                lighting={lighting}
                date={shown}
                uvMax={model.uvMax}
                sunshine={model.sunshine}
                radiationSum={model.radiationSum}
              />
            </Panel>
            <Panel className="xl:col-span-4">
              <Clinometro cond={model} />
            </Panel>
            <Panel className="xl:col-span-3">
              <Mandos
                live={live}
                minutes={live ? Dn(now) : (scrub as number)}
                onScrub={onScrub}
                onLive={onLive}
                playing={playing}
                onPlay={onPlay}
                presets={presets}
                sunriseMin={minOf(almanac.sunrise)}
                sunsetMin={minOf(almanac.sunset)}
                soundOn={soundOn}
                onSound={(on: boolean) => {
                  bridgeSound.unlock();
                  setSoundOn(on);
                }}
                onBell={() => bridgeSound.ringBells(bells.bells)}
                bells={bells.bells}
                lampMode={lampMode}
                onLampMode={setLampMode}
                brightness={brightness}
                onBrightness={onBrightness}
                compassSupported={heading.supported}
                compassOn={heading.enabled}
                onCompass={toggleCompass}
                status={status}
                updatedAt={updatedAt}
              />
            </Panel>
          </div>
        </div>

        {/* Profundidad de la escena (sin efectos de luz solar: retirados 4-oct por decisión del anfitrión) */}
        <div className="pointer-events-none absolute inset-0 z-[20] overflow-hidden">
          <div
            className="absolute inset-0"
            style={{ background: 'radial-gradient(ellipse 90% 70% at 50% 0%, rgba(0,0,0,0) 55%, rgba(0,0,0,.38) 100%)' }}
          />
        </div>
      </main>

      <footer className="relative wood-h">
        <div className="lacquer" />
        <div className="shade" />
        <div className="absolute inset-x-0 top-0 z-[6] h-[3px] brass-tube amb" />
        <div className="relative z-[7] mx-auto max-w-[1520px] px-4 py-9 text-center">
          <div className="relative isolate mx-auto max-w-3xl rounded-md px-6 py-4 plaque">
            <p className="font-display text-[10px] font-semibold tracking-[0.32em] engraved">
              ILLAS ATLÁNTICAS ÁTICO · AGUIÑO · VUT-CO-007656
            </p>
            <p className="mt-1.5 font-serif text-[14px] italic leading-snug engraved-soft">
              Meteorología y mar en tiempo real: Open-Meteo.com (CC BY 4.0) — modelos DWD, Météo-France y ECMWF. Efemérides
              calculadas para {Ie.latLabel} · {Ie.lonLabel}. Características de los faros según el Libro de Faros. Instrumentos
              ilustrativos: no aptos para la navegación.
            </p>
            <div className="shade shade-lamp-soft rounded-md" />
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={onBack}
              className="rounded-full border border-[#f1d58f]/40 px-5 py-2.5 font-display text-[10.5px] tracking-[0.24em] text-[#f1d58f] transition hover:bg-white/5"
            >
              ← VOLVER AL ÁTICO
            </button>
            <button
              type="button"
              onClick={() => onOpenBooking?.()}
              className="brass-btn rounded-full px-5 py-2.5 font-display text-[10.5px] font-bold tracking-[0.24em]"
            >
              RESERVAR ESTE PUENTE
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default DashboardNautico;
