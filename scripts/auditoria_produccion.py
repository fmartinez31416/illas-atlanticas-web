#!/usr/bin/env python3
"""
Auditoría interna de producción — Illas Atlánticas Ático.
Comprobaciones automáticas contra la web publicada y el repo. Salida: líneas PASS/WARN/FAIL,
registro en /root/illa_auditoria/auditoria.jsonl y aviso por Telegram (solo WARN/FAIL + resumen).
Uso: python3 auditoria_produccion.py [--silencioso]
Diseñado para: (1) gate tras cada despliegue; (2) cron semanal (lunes 08:00).
"""
import json, re, sys, time, urllib.request, urllib.error, gzip, io, os

BASE = "https://illasatlanticasatico.es"
REPO = "/root/illas-atlanticas-web"
LOG = "/root/illa_auditoria/auditoria.jsonl"
os.makedirs("/root/illa_auditoria", exist_ok=True)

ENV = {}
for l in open("/root/.hermes/.env"):
    l = l.strip()
    if "=" in l and not l.startswith("#"):
        k, v = l.split("=", 1)
        ENV[k] = v.strip().strip('"').strip("'")

resultados = []

def check(nombre, ok, detalle=""):
    estado = "PASS" if ok else ("FAIL" if ok is False else "WARN")
    resultados.append((estado, nombre, detalle))
    print(f"{estado}  {nombre}  {detalle}")

def http(url, timeout=30, headers=None, follow=True):
    req = urllib.request.Request(url, headers=headers or {"User-Agent": "AuditoriaInterna/1.0"})
    opener = urllib.request.build_opener()
    if not follow:
        opener = urllib.request.build_opener(urllib.request.HTTPRedirectHandler.__new__(urllib.request.HTTPRedirectHandler))
    try:
        with opener.open(req, timeout=timeout) as r:
            body = r.read()
            return r.status, dict(r.headers), body
    except urllib.error.HTTPError as e:
        return e.code, dict(e.headers), e.read()
    except Exception as e:
        return None, {}, str(e).encode()

def bajar(url):
    try:
        with urllib.request.urlopen(url, timeout=60) as r:
            raw = r.read()
            if r.headers.get("Content-Encoding") == "gzip":
                raw = gzip.GzipFile(fileobj=io.BytesIO(raw)).read()
            return raw.decode("utf-8", errors="ignore")
    except Exception:
        return ""

# --- 1. Rutas públicas ---
rutas = {"portada": "/", "en": "/en/", "gl": "/gl/", "legal": "/legal",
         "puente": "/puente", "lonja": "/lonja", "bitacora": "/bitacora",
         "planificador": "/planificador"}
for nombre, ruta in rutas.items():
    status, h, body = http(BASE + ruta)
    check(f"ruta {nombre}", status == 200, f"HTTP {status}")

# /condiciones y /apartamento: expectativa tras despliegue (301 / 200)
import http.client as hc, urllib.parse as _up
def status_sin_redirect(url):
    p = _up.urlsplit(url)
    conn = hc.HTTPSConnection(p.netloc, timeout=30)
    conn.request("GET", p.path or "/", headers={"User-Agent": "AuditoriaInterna/1.0", "Host": p.netloc})
    r = conn.getresponse()
    s = r.status
    r.read()
    conn.close()
    return s
st_apart = status_sin_redirect(BASE + "/apartamento")
check("301 /apartamento -> /", st_apart == 301, f"HTTP {st_apart}")

# --- 2. HTML de portada: título + JSON-LD ---
html_portada = bajar(BASE + "/")
m = re.search(r"<title>([^<]*)</title>", html_portada)
check("título portada", bool(m) and "Illas Atlánticas" in (m.group(1) or ""), (m.group(1) if m else "SIN TÍTULO")[:70])
m8 = re.search(r'"maximumAttendeeCapacity"\s*:\s*(\d+)', html_portada)
check("JSON-LD capacidad = 6", m8 and m8.group(1) == "6", f"dice {m8.group(1) if m8 else '?'} (debe ser 6)")
mpr = re.search(r'"priceRange"\s*:\s*"([^"]*)"', html_portada)
check("JSON-LD priceRange = 95 €", mpr and "95" in (mpr.group(1) or ""), mpr.group(1) if mpr else "?")

# --- 3. Bundle principal ---
mjs = re.search(r'assets/(index-[A-Za-z0-9_-]+\.js)', html_portada)
if mjs:
    url_bundle = f"{BASE}/assets/{mjs.group(1)}"
    status, h, body = http(url_bundle)
    if h.get("Content-Encoding") == "gzip":
        tam = len(gzip.GzipFile(fileobj=io.BytesIO(body)).read())
    else:
        tam = len(body)
    check("bundle < 900 KB", tam < 900_000, f"{tam/1024:.0f} KB (hash {mjs.group(1)[:14]})")
else:
    check("bundle index-*.js", False, "no encontrado en el HTML")

# --- 4. Repo: .htaccess reglas críticas ---
ht = open(f"{REPO}/public/.htaccess").read()
check(".htaccess 301 /apartamento", "RewriteRule ^apartamento/?$ / [R=301,L]" in ht)
check(".htaccess ruta /condiciones", "condiciones" in ht)

# --- 5. Repo: cadenas hardcodeadas sospechosas en componentes ---
import subprocess
salida = subprocess.run(
    ["grep", "-rIn", "--include=*.tsx", "-E",
     ">[^<{]*[áéíóúñÁÉÍÓÚÑ][^<{]*<",
     f"{REPO}/src/components"], capture_output=True, text=True).stdout
lineas = [l for l in salida.splitlines()
          if "t(" not in l.split(": ", 1)[1] if ": " in l]
lineas = [l for l in lineas if "ILLAS ATLÁNTICAS" not in l and "ILLAS ATLANTICAS" not in l]  # marca, igual en todos los idiomas
lineas = [l for l in lineas if ">Nía<" not in l and ">Nia<" not in l]  # nombre del bot (marca)
check("componentes sin texto ES suelto", len(lineas) == 0, f"{len(lineas)} líneas a revisar")
for l in lineas[:5]:
    print("     ", l[:110])

# --- 6. Coherencia de precio: Beds24 (suelo abierto) vs ancla web (95) ---
try:
    auth = {"apiKey": ENV["BEDS24_API_KEY"], "propKey": ENV["BEDS24_PROPKEY"]}
    body_req = {"authentication": auth, "roomId": "720950",
                "from": time.strftime("%Y%m%d"),
                "to": time.strftime("%Y%m%d", time.gmtime(time.time() + 34 * 86400))}
    req = urllib.request.Request("https://api.beds24.com/json/getRoomDates",
        data=json.dumps(body_req).encode(), headers={"Content-Type": "application/json"})
    fechas = json.loads(urllib.request.urlopen(req, timeout=60).read().decode())
    precios = [float(d["p1"]) for d in fechas.values()
               if isinstance(d, dict) and str(d.get("i")) == "1" and d.get("p1")]
    if precios:
        minimo = min(precios)
        check("suelo Beds24 >= ancla 95 €", minimo >= 95,
              f"mínimo abierto {minimo:.0f} €/noche ({len(precios)} días abiertos)")
    else:
        check("suelo Beds24 >= ancla 95 €", None, "sin días abiertos en la ventana")
except Exception as e:
    check("suelo Beds24 >= ancla 95 €", None, f"no verificable: {str(e)[:60]}")

# --- 7. Proxy Nía vivo ---
status, h, body = http("https://nia.illasatlanticasatico.es/hit?p=auditoria", timeout=20)
check("proxy Nía responde", status == 200, f"HTTP {status}")

# --- Resumen + Telegram + log ---
fails = [r for r in resultados if r[0] == "FAIL"]
warns = [r for r in resultados if r[0] == "WARN"]
resumen = f"🔎 AUDITORÍA WEB · {time.strftime('%d-%m %H:%M')} · {len(resultados)-len(fails)-len(warns)} PASS · {len(warns)} WARN · {len(fails)} FAIL"
if fails or warns:
    cuerpo = resumen + "\n"
    for est, nom, det in fails + warns:
        cuerpo += f"{'❌' if est=='FAIL' else '⚠️'} {nom}: {det}\n"
    try:
        from urllib.parse import urlencode
        data = urlencode({"chat_id": "930983884", "text": cuerpo[:3000]}).encode()
        urllib.request.urlopen(f"https://api.telegram.org/bot{ENV['TELEGRAM_BOT_TOKEN']}/sendMessage",
                               data=data, timeout=20).read()
        print("→ aviso enviado por Telegram")
    except Exception as e:
        print("→ aviso Telegram falló:", str(e)[:80])
else:
    print(resumen)
with open(LOG, "a") as f:
    f.write(json.dumps({"fecha": time.strftime("%F %T"), "resultados": resultados}) + "\n")
sys.exit(1 if fails else 0)
