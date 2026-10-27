#!/usr/bin/env python3
"""IndexNow: envía URLs nuevas/actualizadas a los buscadores que lo soportan.

Uso:
  indexnow.py sitemap                 -> envía el sitemap.xml completo (deploy)
  indexnow.py urls <url1> <url2> ...  -> envía URLs sueltas

La clave está en public/<key>.txt (se sirve en la raíz). No toca Google (no usa IndexNow);
Bing/Yandex/Seznam/Naver sí lo recogen.
"""
import json, sys, urllib.request, urllib.error

HOST = "illasatlanticasatico.es"
KEY = "b82f7ad94e9e99b7d2487746577b31f2"
KEY_LOC = f"https://{HOST}/{KEY}.txt"

def ping(payload):
    req = urllib.request.Request(
        "https://api.indexnow.org/indexnow",
        data=json.dumps(payload).encode(),
        headers={"Content-Type": "application/json; charset=utf-8"},
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            print("IndexNow:", r.status, r.read().decode()[:120])
    except urllib.error.HTTPError as e:
        print("IndexNow HTTP", e.code, e.read().decode()[:200])
    except Exception as e:
        print("IndexNow ERROR:", type(e).__name__, e)

def submit_sitemap():
    url = f"https://www.bing.com/indexnow?url=https%3A%2F%2F{HOST}%2Fsitemap.xml&key={KEY}"
    try:
        with urllib.request.urlopen(url, timeout=30) as r:
            print("Bing sitemap:", r.status)
    except Exception as e:
        print("Bing sitemap ERROR:", e)

def submit_urls(urls):
    ping({"host": HOST, "key": KEY, "keyLocation": KEY_LOC, "urlList": urls})

if __name__ == "__main__":
    if len(sys.argv) >= 2 and sys.argv[1] == "sitemap":
        submit_sitemap()
        # también la portada + vistas principales como urls sueltas
        base = f"https://{HOST}"
        submit_urls([base + "/", base + "/bitacora", base + "/lonja", base + "/gastronomia",
                     base + "/puente", base + "/planificador", base + "/condiciones", base + "/club"])
    elif len(sys.argv) >= 3 and sys.argv[1] == "urls":
        submit_urls([u if u.startswith("http") else f"https://{HOST}/{u.lstrip('/')}" for u in sys.argv[2:]])
    else:
        print(__doc__)
