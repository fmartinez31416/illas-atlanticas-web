#!/usr/bin/env python3
"""Genera la portada «Volver a tener equipo» (vertical + cuadrado) en el estilo
de las láminas de la bitácora: navy, crema, dorado, monograma, rosa náutica y
constelación-organigrama. Salida: public/laminas/volver-equipo_{v,c}.webp"""
import math, random
from PIL import Image, ImageDraw, ImageFilter, ImageFont

random.seed(7)
NAVY_TOP = (10, 26, 44)
NAVY_BOT = (5, 16, 29)
CREAM = (235, 230, 221)
GOLD = (212, 160, 23)
BLUE = (159, 178, 196)
FAINT = (92, 110, 130)
SEA = (13, 34, 51)

F_CIN = "/tmp/fonts/cinzel.ttf"
F_COR = "/tmp/fonts/cormorant.ttf"
F_COR_I = "/tmp/fonts/cormorant_i.ttf"
LOGO = "/root/illas-atlanticas-web/public/logo_white.png"

def font(path, size):
    return ImageFont.truetype(path, size)

def draw_spaced(d, xy, text, fnt, fill, spacing=0, anchor_center=True):
    # texto centrado con letter-spacing manual
    widths = [d.textlength(c, font=fnt) for c in text]
    total = sum(widths) + spacing * (len(text) - 1)
    x = xy[0] - total / 2
    y = xy[1]
    for c, w in zip(text, widths):
        d.text((x, y), c, font=fnt, fill=fill, anchor="la")
        x += w + spacing
    return total

def compass_star(d, cx, cy, r, fill, lw=3, alpha=255):
    """Rosa náutica de 8 puntas (4 largas + 4 cortas)."""
    a = fill + (alpha,)
    pts_long, pts_short = [], []
    for i in range(8):
        ang = math.radians(i * 45)
        rr = r if i % 2 == 0 else r * 0.42
        ex, ey = cx + rr * math.sin(ang), cy - rr * math.cos(ang)
        if i % 2 == 0:
            pts_long.append((ex, ey))
        else:
            pts_short.append((ex, ey))
        # brazos en cuña
        spread = math.radians(7)
        for s in (spread, -spread):
            px = cx + rr * math.sin(ang + s)
            py = cy - rr * math.cos(ang + s)
            d.line([(cx, cy), (px, py)], fill=a, width=lw)
    for p in pts_long:
        d.ellipse([p[0]-4, p[1]-4, p[0]+4, p[1]+4], fill=a)

def constelacion(d, cx, cy, escala):
    """Organigrama-constelación: nodo central + satélites unidos por hilos dorados."""
    sat = [(-0.30,-0.20),(0.28,-0.18),(-0.32,0.16),(0.30,0.18),(0.00,-0.34),(0.0,0.30)]
    sat = [(cx + sx*escala, cy + sy*escala) for sx, sy in sat]
    for s in sat:
        d.line([(cx, cy), s], fill=GOLD+(95,), width=2)
        d.ellipse([s[0]-5, s[1]-5, s[0]+5, s[1]+5], fill=GOLD+(230,))
        d.ellipse([s[0]-13, s[1]-13, s[0]+13, s[1]+13], outline=GOLD+(60,), width=2)
    d.ellipse([cx-8, cy-8, cx+8, cy+8], fill=GOLD+(255,))
    d.ellipse([cx-18, cy-18, cx+18, cy+18], outline=GOLD+(90,), width=2)

def fondo(w, h):
    img = Image.new("RGB", (w, h), NAVY_TOP)
    grad = Image.new("RGB", (w, h))
    for y in range(h):
        t = y / h
        c = tuple(int(NAVY_TOP[i] + (NAVY_BOT[i] - NAVY_TOP[i]) * t) for i in range(3))
        grad.paste(Image.new("RGB", (w, 1), c), (0, y))
    img = grad
    d = ImageDraw.Draw(img, "RGBA")
    # estrellas sutiles en el cielo
    for _ in range(int(w * h / 22000)):
        x, y = random.randint(0, w-1), random.randint(0, int(h*0.55))
        r = random.choice([1, 1, 2])
        a = random.randint(30, 90)
        d.ellipse([x-r, y-r, x+r, y+r], fill=(235, 230, 221, a))
    return img, d

def hacer(w, h, out):
    img, d = fondo(w, h)
    s = w / 1152  # escala respecto al diseño vertical base
    # horizonte dorado + mar
    hy = int(1500 * h / 2048)
    d.line([(int(260*s), hy), (int(892*s), hy)], fill=GOLD+(95,), width=2)
    for yy in range(hy, h):
        d.line([(0, yy), (w, yy)], fill=SEA, width=1)
    # constelación-organigrama sobre el mar/cielo
    constelacion(d, int(576*s), int(1250 * h / 2048), 200*s)
    # monograma
    logo = Image.open(LOGO).convert("RGBA").resize((int(190*s), int(190*s)), Image.LANCZOS)
    img.paste(logo, (int(481*s), int(240 * h / 2048)), logo)
    # categoría
    draw_spaced(d, (int(576*s), int(470 * h / 2048)), "EL OFICIO & LA CASA",
                font(F_CIN, int(34*s)), GOLD, spacing=int(6*s))
    # título
    fT = font(F_CIN, int(118*s))
    draw_spaced(d, (int(576*s), int(560 * h / 2048)), "Volver a", fT, CREAM, spacing=int(2*s))
    draw_spaced(d, (int(576*s), int(700 * h / 2048)), "tener equipo", fT, CREAM, spacing=int(2*s))
    # rosa náutica con líneas
    cy = int(860 * h / 2048)
    d.line([(int(576*s) - int(200*s), cy), (int(576*s) - int(26*s), cy)], fill=GOLD+(130,), width=2)
    d.line([(int(576*s) + int(26*s), cy), (int(576*s) + int(200*s), cy)], fill=GOLD+(130,), width=2)
    compass_star(d, int(576*s), cy, int(24*s), GOLD)
    # subtítulo
    draw_spaced(d, (int(576*s), int(940 * h / 2048)),
                "Cuaderno de Bitácora · por Fernando Martínez",
                font(F_COR_I, int(56*s)), BLUE)
    # pie
    draw_spaced(d, (int(576*s), int(1985 * h / 2048)),
                "ILLAS ATLÁNTICAS ÁTICO · ILLASATLANTICASATICO.ES",
                font(F_CIN, int(26*s)), FAINT, spacing=int(3*s))
    img.save(out, "WEBP", quality=90)
    print("OK", out, img.size)

hacer(1152, 2048, "/root/illas-atlanticas-web/public/laminas/volver-equipo_v.webp")
hacer(1600, 1600, "/root/illas-atlanticas-web/public/laminas/volver-equipo_c.webp")
