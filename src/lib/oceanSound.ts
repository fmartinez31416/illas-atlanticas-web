// Sonido ambiente del puente: mar sintetizado con WebAudio (cero archivos, cero coste)
let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let nodes: AudioNode[] = [];
let started = false;

export function startOcean(): void {
  if (started) return;
  try {
    ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    master = ctx.createGain();
    master.gain.setValueAtTime(0, ctx.currentTime);
    master.gain.linearRampToValueAtTime(0.14, ctx.currentTime + 4);
    master.connect(ctx.destination);

    // Mar: ruido filtrado con oleaje lento (dos bandas + LFO de swell)
    const bufferSize = 2 * ctx.sampleRate;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let last = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      last = (last + 0.02 * white) / 1.02;
      data[i] = last * 3.5;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const lowpass = ctx.createBiquadFilter();
    lowpass.type = 'lowpass';
    lowpass.frequency.value = 520;
    lowpass.Q.value = 0.6;

    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.07;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 180;
    lfo.connect(lfoGain).connect(lowpass.frequency);

    const swell = ctx.createGain();
    const lfo2 = ctx.createOscillator();
    lfo2.frequency.value = 0.045;
    const lfo2Gain = ctx.createGain();
    lfo2Gain.gain.value = 0.05;
    lfo2.connect(lfo2Gain).connect(swell.gain);
    swell.gain.value = 0.06;

    noise.connect(lowpass).connect(swell).connect(master);
    noise.start();
    lfo.start();
    lfo2.start();
    nodes = [noise, lowpass, lfo, lfoGain, swell, lfo2, lfo2Gain];
    started = true;
  } catch {
    /* sin audio disponible: el puente sigue en silencio */
  }
}

export function stopOcean(): void {
  if (!ctx || !started) return;
  try {
    master?.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.2);
    setTimeout(() => {
      nodes.forEach((n) => { try { (n as any).stop?.(); n.disconnect(); } catch { /* */ } });
      ctx?.close().catch(() => {});
      ctx = null; master = null; nodes = []; started = false;
    }, 1400);
  } catch { /* */ }
}

export function isOceanOn(): boolean {
  return started;
}
