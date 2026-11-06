#!/usr/bin/env python3
"""Genera la portada «Escribir en Aguiño» (vertical + cuadrado) en el estilo de las
láminas de la bitácora: navy, crema, dorado, rosa náutica y líneas de escritura
sobre el mar. Salida: public/laminas/escribir-aguino_{v,c}.webp"""
import math, random
from PIL import Image, ImageDraw, ImageFont

random.seed(11)
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

def draw_spaced(d, xy, text, fnt, fill, spacing=0):
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
    pts_long = []
    for i in range(8):
        ang = math.radians(i * 45)
        rr = r if i % 2 == 0 else r * 0.42
        ex, ey = cx + rr * math.sin(ang), cy - rr * math.cos(ang)
        if i % 2 == 0:
            pts_long.append((ex, ey))
        spread = math.radians(7)
        for s in (spread, -spread):
            px = cx + rr * math.sin(ang + s)
            py = cy - rr * math.cos(ang + s)
            d.line([(cx, cy), (px, py)], fill=a, width=lw)
    for p in pts_long:
        d.ellipse([p[0]-4, p[1]-4, p[0]+4, p[1]+4], fill=a)

def lineas_escritura(d, cx, y0, dy, anchos, escala):
    """Líneas de escritura doradas sobre el mar: cada una con su punto de pluma."""
    for i, w in enumerate(anchos):
        y = y0 + i * dy
        half = int(w * escala / 2)
        d.line([(cx - half, y), (cx + half, y)], fill=GOLD + (140,), width=3)
        d.ellipse([cx - half - 9, y - 4, cx - half - 1, y + 4], fill=GOLD + (230,))

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
    # líneas de escritura sobre el mar
    lineas_escritura(d, int(576*s), int(1150 * h / 2048), int(62 * h / 2048),
                     [640, 470, 560, 300], s)
    # monograma
    logo = Image.open(LOGO).convert("RGBA").resize((int(190*s), int(190*s)), Image.LANCZOS)
    img.paste(logo, (int(481*s), int(240 * h / 2048)), logo)
    # categoría
    draw_spaced(d, (int(576*s), int(470 * h / 2048)), "EL OFICIO & LA CASA",
                font(F_CIN, int(34*s)), GOLD, spacing=int(6*s))
    # título
    fT = font(F_CIN, int(112*s))
    draw_spaced(d, (int(576*s), int(560 * h / 2048)), "Escribir en", fT, CREAM, spacing=int(2*s))
    draw_spaced(d, (int(576*s), int(698 * h / 2048)), "Agui\u00f1o", fT, CREAM, spacing=int(2*s))
    # rosa náutica con líneas
    cy = int(860 * h / 2048)
    d.line([(int(576*s) - int(200*s), cy), (int(576*s) - int(26*s), cy)], fill=GOLD+(130,), width=2)
    d.line([(int(576*s) + int(26*s), cy), (int(576*s) + int(200*s), cy)], fill=GOLD+(130,), width=2)
    compass_star(d, int(576*s), cy, int(24*s), GOLD)
    # subtítulo
    draw_spaced(d, (int(576*s), int(940 * h / 2048)),
                "Cuaderno de Bit\u00e1cora \u00b7 Illas Atl\u00e1nticas \u00c1tico",
                font(F_COR_I, int(56*s)), BLUE)
    # pie
    draw_spaced(d, (int(576*s), int(1985 * h / 2048)),
                "ILLAS ATL\u00c1NTICAS \u00c1TICO \u00b7 ILLASATLANTICASATICO.ES",
                font(F_CIN, int(26*s)), FAINT, spacing=int(3*s))
    img.save(out, "WEBP", quality=90)
    print("OK", out, img.size)

hacer(1152, 2048, "/root/illas-atlanticas-web/public/laminas/escribir-aguino_v.webp")
hacer(1600, 1600, "/root/illas-atlanticas-web/public/laminas/escribir-aguino_c.webp")
