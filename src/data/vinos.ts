// Generado desde /root/indice-g/datos/vinos_v1.json (merge.py). NO editar a mano.
// Fecha de datos: 2026-10-31 · 170 vinos · 167 con Índice G · 18 multi-fuente.

export interface VinoG {
  nombre: string; bodega: string; do: string; subzona: string;
  anada: string; g: number | null; banda: string; estado: string; nf: number;
  nota: string; guardia: boolean;
  fuentes: { f: string; fn: string; raw: number | null; anada: string; ed: string; url: string }[];
}

export const VINOS: VinoG[] = [
 {
  "nombre": "Sorte O Soro",
  "bodega": "Rafael Palacios",
  "do": "Valdeorras",
  "subzona": "",
  "anada": "2023",
  "g": 100.0,
  "banda": "excepcional",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 100.0,
    "anada": "2023",
    "ed": "Cata 2025",
    "url": "https://guiapenin.wine/guide/wine/sorte_o_soro_2023_b/es"
   }
  ]
 },
 {
  "nombre": "Do Ferreiro Cepas Vellas",
  "bodega": "Bodegas Gerardo Méndez",
  "do": "Rías Baixas",
  "subzona": "",
  "anada": "2024",
  "g": 99.0,
  "banda": "excepcional",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "atkin",
    "fn": "Tim Atkin",
    "raw": 99.0,
    "anada": "2024",
    "ed": "",
    "url": "https://whwc.com/do-ferreiro-mendez-albarino-rias-baixas-cepas-vellas-2024"
   }
  ]
 },
 {
  "nombre": "Zárate El Balado",
  "bodega": "Zárate",
  "do": "Rías Baixas",
  "subzona": "Val do Salnés",
  "anada": "2024",
  "g": 96.0,
  "banda": "excepcional",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "atkin",
    "fn": "Tim Atkin",
    "raw": 96.0,
    "anada": "2024",
    "ed": "",
    "url": "https://www.decantalo.co.uk/en/zarate-balado.html"
   }
  ]
 },
 {
  "nombre": "O Luar do Sil Tostado de Seadur",
  "bodega": "O Luar do Sil",
  "do": "Valdeorras",
  "subzona": "",
  "anada": "2021",
  "g": 96.0,
  "banda": "excepcional",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": true,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 98.0,
    "anada": "2021",
    "ed": "Cata 2025",
    "url": "https://guiapenin.wine/guide/wine/o_luar_do_sil_tostado_de_seadur_2021_b/es"
   }
  ]
 },
 {
  "nombre": "La Comtesse Gran Vino de Guarda",
  "bodega": "Pazo de Barrantes",
  "do": "Rías Baixas",
  "subzona": "",
  "anada": "2017",
  "g": 95.0,
  "banda": "excepcional",
  "estado": "ok",
  "nf": 2,
  "nota": "",
  "guardia": true,
  "fuentes": [
   {
    "f": "parker",
    "fn": "Wine Advocate (Parker)",
    "raw": 95.0,
    "anada": "2017",
    "ed": "",
    "url": "https://www.vinissimus.co.uk/en/wine/la-comtesse-de-pazo-barrantes/"
   },
   {
    "f": "suckling",
    "fn": "James Suckling",
    "raw": 95.0,
    "anada": "2017",
    "ed": "",
    "url": "https://www.vinissimus.co.uk/en/wine/la-comtesse-de-pazo-barrantes/"
   }
  ]
 },
 {
  "nombre": "Albamar Finca O Pereiro",
  "bodega": "Bodegas Albamar",
  "do": "Rías Baixas",
  "subzona": "Val do Salnés",
  "anada": "2024",
  "g": 94.8,
  "banda": "excepcional",
  "estado": "ok",
  "nf": 2,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "parker",
    "fn": "Wine Advocate (Parker)",
    "raw": 96.0,
    "anada": "2024",
    "ed": "",
    "url": "https://www.grandcruwijnen.nl/en/2024-albamar-finca-o-pereiro-albarino"
   },
   {
    "f": "suckling",
    "fn": "James Suckling",
    "raw": 95.0,
    "anada": "2024",
    "ed": "",
    "url": "https://www.grandcruwijnen.nl/en/2024-albamar-finca-o-pereiro-albarino"
   }
  ]
 },
 {
  "nombre": "Martín Códax Gallaecia",
  "bodega": "Bodegas Martín Códax",
  "do": "Rías Baixas",
  "subzona": "",
  "anada": "2020",
  "g": 94.0,
  "banda": "excepcional",
  "estado": "ok",
  "nf": 2,
  "nota": "",
  "guardia": true,
  "fuentes": [
   {
    "f": "atkin",
    "fn": "Tim Atkin",
    "raw": 94.0,
    "anada": "2020",
    "ed": "",
    "url": "https://www.bodeboca.com/vino/gallaecia-2020"
   },
   {
    "f": "atkin",
    "fn": "Tim Atkin",
    "raw": 94.0,
    "anada": "",
    "ed": "",
    "url": "https://www.lavozdegalicia.es/noticia/somosagro/agricultura/2025/12/03/tim-atkin-elige-martin-codax-cooperativa-ano/00031764760367797143204.htm"
   }
  ]
 },
 {
  "nombre": "La Val Treixadura",
  "bodega": "Bodegas La Val",
  "do": "Rías Baixas",
  "subzona": "Condado do Tea",
  "anada": "2024",
  "g": 93.0,
  "banda": "excepcional",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "atkin",
    "fn": "Tim Atkin",
    "raw": 93.0,
    "anada": "2024",
    "ed": "",
    "url": "https://bodegaslaval.com/noticias/la-val-tim-atkin-rias-baixas-2025/"
   }
  ]
 },
 {
  "nombre": "Santiago Roma Albariño",
  "bodega": "Bodegas Santiago Roma",
  "do": "Rías Baixas",
  "subzona": "Val do Salnés",
  "anada": "2024",
  "g": 93.0,
  "banda": "excepcional",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "atkin",
    "fn": "Tim Atkin",
    "raw": 93.0,
    "anada": "2024",
    "ed": "",
    "url": "https://vinchicago.com/products/santiago-roma-rias-baixas-albarino-2024"
   }
  ]
 },
 {
  "nombre": "Pazo de Señoráns Albariño",
  "bodega": "Pazo de Señoráns",
  "do": "Rías Baixas",
  "subzona": "Val do Salnés",
  "anada": "2024",
  "g": 93.0,
  "banda": "excepcional",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "atkin",
    "fn": "Tim Atkin",
    "raw": 93.0,
    "anada": "2024",
    "ed": "",
    "url": "https://whwc.com/pazo-de-senorans-albarino-rias-baixas-2024"
   }
  ]
 },
 {
  "nombre": "Forjas del Salnés Leirana",
  "bodega": "Forjas del Salnés",
  "do": "Rías Baixas",
  "subzona": "",
  "anada": "2025",
  "g": 93.0,
  "banda": "excepcional",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "atkin",
    "fn": "Tim Atkin",
    "raw": 93.0,
    "anada": "2025",
    "ed": "",
    "url": "https://www.botilia.gr/en/p/white-wine/Forjas-Del-Salnes-Leirana-Albarino-Rias-Baixas"
   }
  ]
 },
 {
  "nombre": "Castro Martín Family Estate",
  "bodega": "Bodegas Castro Martín",
  "do": "Rías Baixas",
  "subzona": "",
  "anada": "2022",
  "g": 93.0,
  "banda": "excepcional",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "atkin",
    "fn": "Tim Atkin",
    "raw": 93.0,
    "anada": "2022",
    "ed": "",
    "url": "https://bodegascastromartin.com/category/press?lang=en"
   }
  ]
 },
 {
  "nombre": "La Sombrilla",
  "bodega": "Bodegas El Paraguas",
  "do": "Ribeiro",
  "subzona": "",
  "anada": "2022",
  "g": 92.0,
  "banda": "excepcional",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 96.0,
    "anada": "2022",
    "ed": "Guía Peñín 2026",
    "url": "https://guiapenin.wine/guide/wine/la_sombrilla_2022_b/en"
   }
  ]
 },
 {
  "nombre": "As Sortes",
  "bodega": "Rafael Palacios",
  "do": "Valdeorras",
  "subzona": "",
  "anada": "2023",
  "g": 92.0,
  "banda": "excepcional",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 96.0,
    "anada": "2023",
    "ed": "Cata 2025",
    "url": "https://guiapenin.wine/guide/wine/as_sortes_2023_b/es"
   }
  ]
 },
 {
  "nombre": "Martín Códax Lías",
  "bodega": "Bodegas Martín Códax",
  "do": "Rías Baixas",
  "subzona": "",
  "anada": "2022",
  "g": 92.0,
  "banda": "excepcional",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "atkin",
    "fn": "Tim Atkin",
    "raw": 92.0,
    "anada": "2022",
    "ed": "",
    "url": "https://www.lavozdegalicia.es/noticia/somosagro/agricultura/2025/12/03/tim-atkin-elige-martin-codax-cooperativa-ano/00031764760367797143204.htm"
   }
  ]
 },
 {
  "nombre": "Pazo San Mauro",
  "bodega": "Pazo San Mauro (Marqués de Vargas)",
  "do": "Rías Baixas",
  "subzona": "Condado do Tea",
  "anada": "",
  "g": 92.0,
  "banda": "excepcional",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "atkin",
    "fn": "Tim Atkin",
    "raw": 92.0,
    "anada": "",
    "ed": "",
    "url": "https://araex.com/vinos/pazo-de-san-mauro/"
   }
  ]
 },
 {
  "nombre": "Attis Xión",
  "bodega": "Attis Bodegas y Viñedos",
  "do": "Rías Baixas",
  "subzona": "",
  "anada": "2024",
  "g": 92.0,
  "banda": "excepcional",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "atkin",
    "fn": "Tim Atkin",
    "raw": 92.0,
    "anada": "2024",
    "ed": "",
    "url": "https://vinogrande.pt/es/products/attis-xion-albarino-rias-baixas-2024"
   }
  ]
 },
 {
  "nombre": "Alberto Nanclares",
  "bodega": "Nanclares y Prieto",
  "do": "Rías Baixas",
  "subzona": "",
  "anada": "2022",
  "g": 92.0,
  "banda": "excepcional",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "atkin",
    "fn": "Tim Atkin",
    "raw": 92.0,
    "anada": "2022",
    "ed": "",
    "url": "https://www.bodeboca.it/vino/alberto-nanclares-2022"
   }
  ]
 },
 {
  "nombre": "O Raio da Vella Albariño",
  "bodega": "Bodegas Forjas del Salnés",
  "do": "Rías Baixas",
  "subzona": "Val do Salnés",
  "anada": "2023",
  "g": 91.8,
  "banda": "notable",
  "estado": "ok",
  "nf": 3,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 100.0,
    "anada": "2023",
    "ed": "2025",
    "url": "https://guiapenin.wine/guide/wine/o_raio_da_vella_albarino_2023_b/es"
   },
   {
    "f": "atkin",
    "fn": "Tim Atkin",
    "raw": 97.0,
    "anada": "2023",
    "ed": "",
    "url": "https://www.bodeboca.pt/vinho/raio-vella-albarino-2023"
   },
   {
    "f": "parker",
    "fn": "Wine Advocate (Parker)",
    "raw": 93.0,
    "anada": "2023",
    "ed": "",
    "url": "https://www.bodeboca.pt/vinho/raio-vella-albarino-2023"
   }
  ]
 },
 {
  "nombre": "La Fillaboa 1898",
  "bodega": "Bodegas Fillaboa",
  "do": "Rías Baixas",
  "subzona": "",
  "anada": "2020",
  "g": 90.0,
  "banda": "notable",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": true,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 95.0,
    "anada": "2020",
    "ed": "",
    "url": "https://masaveubodegas.com/murua-and-fillaboa-triumph-in-the-guia-penin-2027?lang=en"
   }
  ]
 },
 {
  "nombre": "Zárate El Palomar",
  "bodega": "Zárate",
  "do": "Rías Baixas",
  "subzona": "Val do Salnés",
  "anada": "2023",
  "g": 90.0,
  "banda": "notable",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 95.0,
    "anada": "2023",
    "ed": "2025",
    "url": "https://guiapenin.wine/guide/wine/zarate_el_palomar_2023_b_fb/en"
   }
  ]
 },
 {
  "nombre": "Emilio Rojo",
  "bodega": "Viña Meín - Emilio Rojo",
  "do": "Ribeiro",
  "subzona": "",
  "anada": "2022",
  "g": 90.0,
  "banda": "notable",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 95.0,
    "anada": "2022",
    "ed": "Guía Peñín 2026",
    "url": "https://guiapenin.wine/guide/wine/emilio_rojo_2022_b/en"
   }
  ]
 },
 {
  "nombre": "Fai un Sol de Carallo",
  "bodega": "Bodegas El Paraguas",
  "do": "Ribeiro",
  "subzona": "",
  "anada": "2021",
  "g": 90.0,
  "banda": "notable",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": true,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 95.0,
    "anada": "2021",
    "ed": "Guía Peñín 2026",
    "url": "https://guiapenin.wine/guide/wine/fai_un_sol_de_carallo_2021_b/en"
   }
  ]
 },
 {
  "nombre": "Armán Finca Misenhora",
  "bodega": "Casal de Armán",
  "do": "Ribeiro",
  "subzona": "",
  "anada": "2021",
  "g": 90.0,
  "banda": "notable",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": true,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 95.0,
    "anada": "2021",
    "ed": "Guía Peñín 2025",
    "url": "https://guiapenin.wine/guide/wine/arman_finca_misenhora_2021_b/en"
   }
  ]
 },
 {
  "nombre": "Algueira Patrimonio",
  "bodega": "Algueira",
  "do": "Ribeira Sacra",
  "subzona": "",
  "anada": "2020",
  "g": 90.0,
  "banda": "notable",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": true,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 95.0,
    "anada": "2020",
    "ed": "Guía Peñín 2026 (cata 2025)",
    "url": "https://guiapenin.wine/guide/wine/algueira_patrimonio_2020_t_c/en"
   }
  ]
 },
 {
  "nombre": "Guímaro San Pedro",
  "bodega": "Adegas Guímaro",
  "do": "Ribeira Sacra",
  "subzona": "",
  "anada": "2021",
  "g": 90.0,
  "banda": "notable",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": true,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 95.0,
    "anada": "2021",
    "ed": "Guía Peñín 2026 (cata 2025)",
    "url": "https://guiapenin.wine/guide/wine/guimaro_san_pedro_2021_t/en"
   }
  ]
 },
 {
  "nombre": "Finca Capeliños Guímaro",
  "bodega": "Adegas Guímaro",
  "do": "Ribeira Sacra",
  "subzona": "",
  "anada": "2022",
  "g": 90.0,
  "banda": "notable",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 95.0,
    "anada": "2022",
    "ed": "Guía Peñín 2026 (cata 2025)",
    "url": "https://guiapenin.wine/guide/wine/finca_capelinos_guimaro_2022_t/en"
   }
  ]
 },
 {
  "nombre": "Abadía da Cova Penafión",
  "bodega": "Abadía da Cova",
  "do": "Ribeira Sacra",
  "subzona": "",
  "anada": "2021",
  "g": 90.0,
  "banda": "notable",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": true,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 95.0,
    "anada": "2021",
    "ed": "Guía Peñín 2026 (cata 2025)",
    "url": "https://guiapenin.wine/guide/wine/abadia_da_cova_penafion_2021_t_ba/en"
   }
  ]
 },
 {
  "nombre": "Gorvia Fermentado en Barrica",
  "bodega": "Bodegas y Viñedos Quinta da Muradella",
  "do": "Monterrei",
  "subzona": "",
  "anada": "2019",
  "g": 90.0,
  "banda": "notable",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": true,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 95.0,
    "anada": "2019",
    "ed": "Guía Peñín 2025",
    "url": "https://guiapenin.wine/guide/wine/gorvia_fermentado_en_barrica_2019_b_fb/en"
   }
  ]
 },
 {
  "nombre": "Avancia Nobleza Godello",
  "bodega": "Bodegas Avancia",
  "do": "Valdeorras",
  "subzona": "",
  "anada": "2023",
  "g": 90.0,
  "banda": "notable",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 95.0,
    "anada": "2023",
    "ed": "Cata 2025",
    "url": "https://guiapenin.wine/guide/wine/avancia_nobleza_godello_2023_b/es"
   }
  ]
 },
 {
  "nombre": "Falcoeira Branco",
  "bodega": "Compañía de Vinos Telmo Rodríguez",
  "do": "Valdeorras",
  "subzona": "",
  "anada": "2022",
  "g": 90.0,
  "banda": "notable",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 95.0,
    "anada": "2022",
    "ed": "Cata 2025",
    "url": "https://guiapenin.wine/guide/wine/falcoeira_branco_2022_b/es"
   }
  ]
 },
 {
  "nombre": "Quinta de Couselo Turonia",
  "bodega": "Quinta de Couselo",
  "do": "Rías Baixas",
  "subzona": "",
  "anada": "2024",
  "g": 90.0,
  "banda": "notable",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "atkin",
    "fn": "Tim Atkin",
    "raw": 90.0,
    "anada": "2024",
    "ed": "",
    "url": "https://www.bodeboca.com/vino/turonia-2024"
   }
  ]
 },
 {
  "nombre": "Granbazán Don Álvaro de Bazán",
  "bodega": "Bodega Granbazán",
  "do": "Rías Baixas",
  "subzona": "",
  "anada": "2021",
  "g": 88.0,
  "banda": "notable",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": true,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 94.0,
    "anada": "2021",
    "ed": "2025",
    "url": "https://guiapenin.wine/guide/wine/granbazan_don_alvaro_de_bazan_2021_b/es"
   }
  ]
 },
 {
  "nombre": "Fillaboa Selección Finca Monte Alto",
  "bodega": "Bodegas Fillaboa",
  "do": "Rías Baixas",
  "subzona": "",
  "anada": "2022",
  "g": 88.0,
  "banda": "notable",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 94.0,
    "anada": "2022",
    "ed": "2025",
    "url": "https://guiapenin.wine/guide/wine/fillaboa_seleccion_finca_monte_alto_2022_b/es"
   }
  ]
 },
 {
  "nombre": "Lagar da Condesa",
  "bodega": "Lagar da Condesa",
  "do": "Rías Baixas",
  "subzona": "Val do Salnés",
  "anada": "2023",
  "g": 88.0,
  "banda": "notable",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 94.0,
    "anada": "2023",
    "ed": "2025",
    "url": "https://guiapenin.wine/guide/wine/lagar_da_condesa_2023_b/en"
   }
  ]
 },
 {
  "nombre": "El Paraguas Atlántico",
  "bodega": "Bodegas El Paraguas",
  "do": "Ribeiro",
  "subzona": "",
  "anada": "2022",
  "g": 88.0,
  "banda": "notable",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 94.0,
    "anada": "2022",
    "ed": "Guía Peñín 2025",
    "url": "https://guiapenin.wine/guide/wine/el_paraguas_atlantico_2022_b/en"
   }
  ]
 },
 {
  "nombre": "O Gran Meín",
  "bodega": "Viña Meín - Emilio Rojo",
  "do": "Ribeiro",
  "subzona": "",
  "anada": "2022",
  "g": 88.0,
  "banda": "notable",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 94.0,
    "anada": "2022",
    "ed": "Guía Peñín 2026",
    "url": "https://guiapenin.wine/guide/wine/o_gran_mein_2022_t/en"
   }
  ]
 },
 {
  "nombre": "O Gran Meín Lustro",
  "bodega": "Viña Meín - Emilio Rojo",
  "do": "Ribeiro",
  "subzona": "",
  "anada": "2019",
  "g": 88.0,
  "banda": "notable",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": true,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 94.0,
    "anada": "2019",
    "ed": "Guía Peñín 2026",
    "url": "https://guiapenin.wine/guide/wine/o_gran_mein_lustro_2019_b/en"
   }
  ]
 },
 {
  "nombre": "Armán Finca Os Loureiros",
  "bodega": "Casal de Armán",
  "do": "Ribeiro",
  "subzona": "",
  "anada": "2023",
  "g": 88.0,
  "banda": "notable",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 94.0,
    "anada": "2023",
    "ed": "Guía Peñín 2026",
    "url": "https://guiapenin.wine/guide/wine/arman_finca_os_loureiros_2023_b/en"
   }
  ]
 },
 {
  "nombre": "Lalume",
  "bodega": "Dominio do Bibei",
  "do": "Ribeiro",
  "subzona": "",
  "anada": "2019",
  "g": 88.0,
  "banda": "notable",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": true,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 94.0,
    "anada": "2019",
    "ed": "Guía Peñín 2026",
    "url": "https://guiapenin.wine/guide/wine/lalume_2019_b/en"
   }
  ]
 },
 {
  "nombre": "Gomariz Caste Brancellao",
  "bodega": "Coto de Gomariz",
  "do": "Ribeiro",
  "subzona": "",
  "anada": "2022",
  "g": 88.0,
  "banda": "notable",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 94.0,
    "anada": "2022",
    "ed": "Guía Peñín 2026",
    "url": "https://guiapenin.wine/guide/wine/gomariz_caste_brancellao_2022_t/en"
   }
  ]
 },
 {
  "nombre": "Algueira Escalada",
  "bodega": "Algueira",
  "do": "Ribeira Sacra",
  "subzona": "",
  "anada": "2023",
  "g": 88.0,
  "banda": "notable",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 94.0,
    "anada": "2023",
    "ed": "Guía Peñín 2026 (cata 2025)",
    "url": "https://guiapenin.wine/guide/wine/algueira_escalada_2023_b_fb/en"
   }
  ]
 },
 {
  "nombre": "Algueira Pizarra",
  "bodega": "Algueira",
  "do": "Ribeira Sacra",
  "subzona": "",
  "anada": "2021",
  "g": 88.0,
  "banda": "notable",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": true,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 94.0,
    "anada": "2021",
    "ed": "Guía Peñín 2026 (cata 2025)",
    "url": "https://guiapenin.wine/guide/wine/algueira_pizarra_2021_t_c/en"
   }
  ]
 },
 {
  "nombre": "Finca Pombeiras Guímaro",
  "bodega": "Adegas Guímaro",
  "do": "Ribeira Sacra",
  "subzona": "",
  "anada": "2022",
  "g": 88.0,
  "banda": "notable",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 94.0,
    "anada": "2022",
    "ed": "Guía Peñín 2026 (cata 2025)",
    "url": "https://guiapenin.wine/guide/wine/finca_pombeiras_guimaro_2022_t/en"
   }
  ]
 },
 {
  "nombre": "Gorvia",
  "bodega": "Bodegas y Viñedos Quinta da Muradella",
  "do": "Monterrei",
  "subzona": "",
  "anada": "2019",
  "g": 88.0,
  "banda": "notable",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": true,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 94.0,
    "anada": "2019",
    "ed": "Guía Peñín 2025",
    "url": "https://guiapenin.wine/guide/wine/gorvia_2019_t/en"
   }
  ]
 },
 {
  "nombre": "Pezas da Portela",
  "bodega": "Bodegas Valdesil",
  "do": "Valdeorras",
  "subzona": "",
  "anada": "2023",
  "g": 88.0,
  "banda": "notable",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 94.0,
    "anada": "2023",
    "ed": "Cata 2025",
    "url": "https://guiapenin.wine/guide/wine/pezas_da_portela_2023_b_fb/es"
   }
  ]
 },
 {
  "nombre": "Asadoira",
  "bodega": "Bodegas Valdesil",
  "do": "Valdeorras",
  "subzona": "",
  "anada": "2023",
  "g": 88.0,
  "banda": "notable",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 94.0,
    "anada": "2023",
    "ed": "Cata 2025",
    "url": "https://guiapenin.wine/guide/wine/asadoira_2023_b/es"
   }
  ]
 },
 {
  "nombre": "Godeval Revival",
  "bodega": "Bodegas Godeval",
  "do": "Valdeorras",
  "subzona": "",
  "anada": "2023",
  "g": 88.0,
  "banda": "notable",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 94.0,
    "anada": "2023",
    "ed": "Cata 2025",
    "url": "https://guiapenin.wine/guide/wine/godeval_revival_2023_b/es"
   }
  ]
 },
 {
  "nombre": "Gran Vino Pazo de Barrantes Albariño",
  "bodega": "Pazo de Barrantes",
  "do": "Rías Baixas",
  "subzona": "",
  "anada": "2022",
  "g": 87.7,
  "banda": "muybueno",
  "estado": "ok",
  "nf": 3,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 94.0,
    "anada": "2022",
    "ed": "2025",
    "url": "https://guiapenin.wine/guide/wine/gran_vino_pazo_de_barrantes_albarino_2022_b/es"
   },
   {
    "f": "atkin",
    "fn": "Tim Atkin",
    "raw": 96.0,
    "anada": "2022",
    "ed": "",
    "url": "https://whwc.com/pazo-barrantes-albarino-rias-baixas-gran-vino-2022"
   },
   {
    "f": "parker",
    "fn": "Wine Advocate (Parker)",
    "raw": 94.0,
    "anada": "2022",
    "ed": "",
    "url": "https://marquesdemurrieta.com/en/pages/gran-vino-pazo-barrantes-albarino"
   }
  ]
 },
 {
  "nombre": "Zárate Albariño",
  "bodega": "Zárate",
  "do": "Rías Baixas",
  "subzona": "Val do Salnés",
  "anada": "2024",
  "g": 86.0,
  "banda": "muybueno",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 93.0,
    "anada": "2024",
    "ed": "2025",
    "url": "https://guiapenin.wine/guide/wine/zarate_albarino_2024_b/es"
   }
  ]
 },
 {
  "nombre": "Albariño de Fefiñanes III Año",
  "bodega": "Bodegas del Palacio de Fefiñanes",
  "do": "Rías Baixas",
  "subzona": "",
  "anada": "2022",
  "g": 86.0,
  "banda": "muybueno",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 93.0,
    "anada": "2022",
    "ed": "2025",
    "url": "https://guiapenin.wine/guide/wine/albarino_de_fefinanes_iii_ano_2022_b/es"
   }
  ]
 },
 {
  "nombre": "Nora da Neve",
  "bodega": "Viña Nora",
  "do": "Rías Baixas",
  "subzona": "Condado do Tea",
  "anada": "2023",
  "g": 86.0,
  "banda": "muybueno",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 93.0,
    "anada": "2023",
    "ed": "2025",
    "url": "https://guiapenin.wine/guide/wine/nora_da_neve_2023_b_fb/en"
   }
  ]
 },
 {
  "nombre": "Sin Palabras El Molino",
  "bodega": "Adegas Castrobrey",
  "do": "Rías Baixas",
  "subzona": "Ribeira do Ulla",
  "anada": "2023",
  "g": 86.0,
  "banda": "muybueno",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 93.0,
    "anada": "2023",
    "ed": "2025",
    "url": "https://guiapenin.wine/guide/wine/sin_palabras_el_molino_2023_b/en"
   }
  ]
 },
 {
  "nombre": "Coto de Gomariz Finca O Figueiral",
  "bodega": "Coto de Gomariz",
  "do": "Ribeiro",
  "subzona": "",
  "anada": "2022",
  "g": 86.0,
  "banda": "muybueno",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 93.0,
    "anada": "2022",
    "ed": "Guía Peñín 2026",
    "url": "https://guiapenin.wine/guide/wine/coto_de_gomariz_finca_o_figueiral_2022_b/en"
   }
  ]
 },
 {
  "nombre": "Finca Viñoa Embotellado Tardío",
  "bodega": "Bodega y Viñedos Pazo Casanova",
  "do": "Ribeiro",
  "subzona": "",
  "anada": "2022",
  "g": 86.0,
  "banda": "muybueno",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 93.0,
    "anada": "2022",
    "ed": "Guía Peñín 2026",
    "url": "https://guiapenin.wine/guide/wine/finca_vinoa_embotellado_tardio_2022_b/en"
   }
  ]
 },
 {
  "nombre": "Finca Viñoa Paraje Penaboa",
  "bodega": "Bodega y Viñedos Pazo Casanova",
  "do": "Ribeiro",
  "subzona": "",
  "anada": "2020",
  "g": 86.0,
  "banda": "muybueno",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": true,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 93.0,
    "anada": "2020",
    "ed": "Guía Peñín 2025",
    "url": "https://guiapenin.wine/guide/wine/finca_vinoa_paraje_penaboa_2020_b/en"
   }
  ]
 },
 {
  "nombre": "A Telleira Loureira",
  "bodega": "Bodegas Campante",
  "do": "Ribeiro",
  "subzona": "",
  "anada": "2023",
  "g": 86.0,
  "banda": "muybueno",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 93.0,
    "anada": "2023",
    "ed": "Guía Peñín 2026",
    "url": "https://guiapenin.wine/guide/wine/a_telleira_loureira_2023_b/en"
   }
  ]
 },
 {
  "nombre": "Algueira Carravel",
  "bodega": "Algueira",
  "do": "Ribeira Sacra",
  "subzona": "",
  "anada": "2019",
  "g": 86.0,
  "banda": "muybueno",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": true,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 93.0,
    "anada": "2019",
    "ed": "Guía Peñín 2025 (cata 2024)",
    "url": "https://guiapenin.wine/guide/wine/algueira_carravel_2019_t_c/en"
   }
  ]
 },
 {
  "nombre": "Algueira Finca Cortezada",
  "bodega": "Algueira",
  "do": "Ribeira Sacra",
  "subzona": "",
  "anada": "2024",
  "g": 86.0,
  "banda": "muybueno",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 93.0,
    "anada": "2024",
    "ed": "Guía Peñín 2026 (cata 2025)",
    "url": "https://guiapenin.wine/guide/wine/algueira_finca_cortezada_2024_b/en"
   }
  ]
 },
 {
  "nombre": "Guímaro Mundin",
  "bodega": "Adegas Guímaro",
  "do": "Ribeira Sacra",
  "subzona": "",
  "anada": "2021",
  "g": 86.0,
  "banda": "muybueno",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": true,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 93.0,
    "anada": "2021",
    "ed": "Guía Peñín 2026 (cata 2025)",
    "url": "https://guiapenin.wine/guide/wine/guimaro_mundin_2021_t/en"
   }
  ]
 },
 {
  "nombre": "Abadía da Cova Veitureira",
  "bodega": "Abadía da Cova",
  "do": "Ribeira Sacra",
  "subzona": "",
  "anada": "2022",
  "g": 86.0,
  "banda": "muybueno",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 93.0,
    "anada": "2022",
    "ed": "Guía Peñín 2026 (cata 2025)",
    "url": "https://guiapenin.wine/guide/wine/abadia_da_cova_veitureira_2022_t/en"
   }
  ]
 },
 {
  "nombre": "Abadía da Cova Loia",
  "bodega": "Abadía da Cova",
  "do": "Ribeira Sacra",
  "subzona": "",
  "anada": "2023",
  "g": 86.0,
  "banda": "muybueno",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 93.0,
    "anada": "2023",
    "ed": "Guía Peñín 2026 (cata 2025)",
    "url": "https://guiapenin.wine/guide/wine/abadia_da_cova_loia_2023_b/en"
   }
  ]
 },
 {
  "nombre": "Quinta da Muradella",
  "bodega": "Bodegas y Viñedos Quinta da Muradella",
  "do": "Monterrei",
  "subzona": "",
  "anada": "2021",
  "g": 86.0,
  "banda": "muybueno",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": true,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 93.0,
    "anada": "2021",
    "ed": "Guía Peñín 2025",
    "url": "https://guiapenin.wine/guide/wine/quinta_da_muradella_2021_b/en"
   }
  ]
 },
 {
  "nombre": "Quinta da Muradella Verdello Antiguo",
  "bodega": "Bodegas y Viñedos Quinta da Muradella",
  "do": "Monterrei",
  "subzona": "",
  "anada": "2021",
  "g": 86.0,
  "banda": "muybueno",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": true,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 93.0,
    "anada": "2021",
    "ed": "Guía Peñín 2025",
    "url": "https://guiapenin.wine/guide/wine/quinta_da_muradella_verdello_antiguo_2021_b/en"
   }
  ]
 },
 {
  "nombre": "Quinta da Muradella Bastardo",
  "bodega": "Bodegas y Viñedos Quinta da Muradella",
  "do": "Monterrei",
  "subzona": "",
  "anada": "2022",
  "g": 86.0,
  "banda": "muybueno",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 93.0,
    "anada": "2022",
    "ed": "Guía Peñín 2025",
    "url": "https://guiapenin.wine/guide/wine/quinta_da_muradella_bastardo_2022_t/en"
   }
  ]
 },
 {
  "nombre": "Alanda Barrica",
  "bodega": "Bodegas y Viñedos Quinta da Muradella",
  "do": "Monterrei",
  "subzona": "",
  "anada": "2021",
  "g": 86.0,
  "banda": "muybueno",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": true,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 93.0,
    "anada": "2021",
    "ed": "Guía Peñín 2025",
    "url": "https://guiapenin.wine/guide/wine/alanda_2021_b_ba/en"
   }
  ]
 },
 {
  "nombre": "Louro do Bolo",
  "bodega": "Rafael Palacios",
  "do": "Valdeorras",
  "subzona": "",
  "anada": "2024",
  "g": 86.0,
  "banda": "muybueno",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 93.0,
    "anada": "2024",
    "ed": "Cata 2025",
    "url": "https://guiapenin.wine/guide/wine/louro_do_bolo_godello_2024_b/es"
   }
  ]
 },
 {
  "nombre": "Godeval 1986",
  "bodega": "Bodegas Godeval",
  "do": "Valdeorras",
  "subzona": "",
  "anada": "2024",
  "g": 86.0,
  "banda": "muybueno",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 93.0,
    "anada": "2024",
    "ed": "Cata 2025",
    "url": "https://guiapenin.wine/guide/wine/godeval_1986_2024_b/es"
   }
  ]
 },
 {
  "nombre": "A Coroa 200 Cestos",
  "bodega": "Adega A Coroa",
  "do": "Valdeorras",
  "subzona": "",
  "anada": "2022",
  "g": 86.0,
  "banda": "muybueno",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 93.0,
    "anada": "2022",
    "ed": "Cata 2024",
    "url": "https://guiapenin.wine/guide/wine/a_coroa_200_cestos_2022_b_fb/es"
   }
  ]
 },
 {
  "nombre": "Avancia Godello",
  "bodega": "Bodegas Avancia",
  "do": "Valdeorras",
  "subzona": "",
  "anada": "2023",
  "g": 86.0,
  "banda": "muybueno",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 93.0,
    "anada": "2023",
    "ed": "Cata 2024",
    "url": "https://guiapenin.wine/guide/wine/avancia_godello_2023_b/es"
   }
  ]
 },
 {
  "nombre": "Regueirón",
  "bodega": "Virgen del Galir",
  "do": "Valdeorras",
  "subzona": "",
  "anada": "2023",
  "g": 86.0,
  "banda": "muybueno",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 93.0,
    "anada": "2023",
    "ed": "Cata 2025",
    "url": "https://guiapenin.wine/guide/wine/regueiron_2023_b/es"
   }
  ]
 },
 {
  "nombre": "As 2 Ladeiras",
  "bodega": "Viña Somoza",
  "do": "Valdeorras",
  "subzona": "",
  "anada": "2023",
  "g": 86.0,
  "banda": "muybueno",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 93.0,
    "anada": "2023",
    "ed": "Cata 2025",
    "url": "https://guiapenin.wine/guide/wine/as_2_ladeiras_2023_b/es"
   }
  ]
 },
 {
  "nombre": "Guitián Godello Fermentado en Barrica",
  "bodega": "Bodega La Tapada",
  "do": "Valdeorras",
  "subzona": "",
  "anada": "2023",
  "g": 86.0,
  "banda": "muybueno",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 93.0,
    "anada": "2023",
    "ed": "Cata 2025",
    "url": "https://guiapenin.wine/guide/wine/guitian_godello_2023_b_fb/es"
   }
  ]
 },
 {
  "nombre": "Attis Nana",
  "bodega": "Attis Bodega y Viñedos",
  "do": "Rías Baixas",
  "subzona": "",
  "anada": "2023",
  "g": 85.5,
  "banda": "muybueno",
  "estado": "ok",
  "nf": 3,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 93.0,
    "anada": "2023",
    "ed": "2025",
    "url": "https://guiapenin.wine/guide/wine/attis_nana_2023_b_fb/es"
   },
   {
    "f": "suckling",
    "fn": "James Suckling",
    "raw": 94.0,
    "anada": "2023",
    "ed": "",
    "url": "https://attisbyv.es/4253/"
   },
   {
    "f": "atkin",
    "fn": "Tim Atkin",
    "raw": 93.0,
    "anada": "2023",
    "ed": "",
    "url": "https://attisbyv.es/4253/"
   }
  ]
 },
 {
  "nombre": "Mar de Frades Albariño",
  "bodega": "Bodegas Mar de Frades",
  "do": "Rías Baixas",
  "subzona": "Val do Salnés",
  "anada": "2024",
  "g": 84.0,
  "banda": "muybueno",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 92.0,
    "anada": "2024",
    "ed": "2025",
    "url": "https://guiapenin.wine/guide/wine/mar_de_frades_albarino_2024_b/es"
   }
  ]
 },
 {
  "nombre": "Pazo de Señoráns",
  "bodega": "Pazo de Señorans",
  "do": "Rías Baixas",
  "subzona": "Val do Salnés",
  "anada": "2024",
  "g": 84.0,
  "banda": "muybueno",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 92.0,
    "anada": "2024",
    "ed": "2025",
    "url": "https://guiapenin.wine/guide/wine/pazo_senorans_2024_b/es"
   }
  ]
 },
 {
  "nombre": "Granbazán Limousin",
  "bodega": "Bodega Granbazán",
  "do": "Rías Baixas",
  "subzona": "",
  "anada": "2022",
  "g": 84.0,
  "banda": "muybueno",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 92.0,
    "anada": "2022",
    "ed": "2025",
    "url": "https://guiapenin.wine/guide/wine/granbazan_limousin_2022_b/es"
   }
  ]
 },
 {
  "nombre": "Leirana",
  "bodega": "Bodegas Forjas del Salnés",
  "do": "Rías Baixas",
  "subzona": "Val do Salnés",
  "anada": "2023",
  "g": 84.0,
  "banda": "muybueno",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 92.0,
    "anada": "2023",
    "ed": "2025",
    "url": "https://guiapenin.wine/guide/wine/leirana_2023_b/es"
   }
  ]
 },
 {
  "nombre": "Laxas",
  "bodega": "Bodegas As Laxas",
  "do": "Rías Baixas",
  "subzona": "Condado do Tea",
  "anada": "2024",
  "g": 84.0,
  "banda": "muybueno",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 92.0,
    "anada": "2024",
    "ed": "2025",
    "url": "https://guiapenin.wine/guide/wine/laxas_2024_b/en"
   }
  ]
 },
 {
  "nombre": "Miña Vida",
  "bodega": "Pazo Pondal",
  "do": "Rías Baixas",
  "subzona": "Condado do Tea",
  "anada": "2024",
  "g": 84.0,
  "banda": "muybueno",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 92.0,
    "anada": "2024",
    "ed": "2025",
    "url": "https://guiapenin.wine/guide/wine/mina_vida_2024_b/en"
   }
  ]
 },
 {
  "nombre": "Mar de Envero sobre Lías",
  "bodega": "Mar de Envero",
  "do": "Rías Baixas",
  "subzona": "Ribeira do Ulla",
  "anada": "2023",
  "g": 84.0,
  "banda": "muybueno",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 92.0,
    "anada": "2023",
    "ed": "2025",
    "url": "https://guiapenin.wine/guide/wine/mar_de_envero_sobre_lias_2023_b/en"
   }
  ]
 },
 {
  "nombre": "Eidos de Padriñán",
  "bodega": "Adega Eidos",
  "do": "Rías Baixas",
  "subzona": "Val do Salnés",
  "anada": "2024",
  "g": 84.0,
  "banda": "muybueno",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 92.0,
    "anada": "2024",
    "ed": "2025",
    "url": "https://guiapenin.wine/guide/wine/eidos_de_padrinan_2024_b_1/en"
   }
  ]
 },
 {
  "nombre": "Attis Lías Finas",
  "bodega": "Attis Bodegas y Viñedos",
  "do": "Rías Baixas",
  "subzona": "Val do Salnés",
  "anada": "2024",
  "g": 84.0,
  "banda": "muybueno",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 92.0,
    "anada": "2024",
    "ed": "2025",
    "url": "https://guiapenin.wine/guide/wine/attis_lias_finas_2024_b/en"
   }
  ]
 },
 {
  "nombre": "Desconcierto Albariño",
  "bodega": "Cambados Urban Winery",
  "do": "Rías Baixas",
  "subzona": "Val do Salnés",
  "anada": "2024",
  "g": 84.0,
  "banda": "muybueno",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 92.0,
    "anada": "2024",
    "ed": "2025",
    "url": "https://guiapenin.wine/guide/wine/desconcierto_albarino_2024_b/en"
   }
  ]
 },
 {
  "nombre": "Silandeiro Albariño Granítico",
  "bodega": "Rectoral do Umia",
  "do": "Rías Baixas",
  "subzona": "Val do Salnés",
  "anada": "2023",
  "g": 84.0,
  "banda": "muybueno",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 92.0,
    "anada": "2023",
    "ed": "2025",
    "url": "https://guiapenin.wine/guide/wine/silandeiro_albarino_granitico_2023_b/en"
   }
  ]
 },
 {
  "nombre": "Coto de Gomariz",
  "bodega": "Coto de Gomariz",
  "do": "Ribeiro",
  "subzona": "",
  "anada": "2022",
  "g": 84.0,
  "banda": "muybueno",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 92.0,
    "anada": "2022",
    "ed": "Guía Peñín 2025",
    "url": "https://guiapenin.wine/guide/wine/coto_de_gomariz_2022_b/en"
   }
  ]
 },
 {
  "nombre": "Ponte da Boga Pizarras y Esquistos",
  "bodega": "Adega Ponte da Boga",
  "do": "Ribeira Sacra",
  "subzona": "",
  "anada": "2022",
  "g": 84.0,
  "banda": "muybueno",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 92.0,
    "anada": "2022",
    "ed": "Guía Peñín 2026 (cata 2025)",
    "url": "https://guiapenin.wine/guide/wine/ponte_da_boga_pizarras_y_esquistos_2022_t/en"
   }
  ]
 },
 {
  "nombre": "Regina Viarum Expresión",
  "bodega": "Regina Viarum",
  "do": "Ribeira Sacra",
  "subzona": "",
  "anada": "2022",
  "g": 84.0,
  "banda": "muybueno",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 92.0,
    "anada": "2022",
    "ed": "Guía Peñín 2026 (cata 2025)",
    "url": "https://guiapenin.wine/guide/wine/regina_viarum_expresion_2022_t_ba/en"
   }
  ]
 },
 {
  "nombre": "Pazo de Monterrey Raúl Boo Godello",
  "bodega": "Bodega Pazos del Rey",
  "do": "Monterrei",
  "subzona": "",
  "anada": "2023",
  "g": 84.0,
  "banda": "muybueno",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 92.0,
    "anada": "2023",
    "ed": "Guía Peñín 2025",
    "url": "https://guiapenin.wine/guide/wine/pazo_de_monterrey_raul_boo_godello_2023_b/en"
   }
  ]
 },
 {
  "nombre": "Pazo de Monterrey Raúl Boo Mencía",
  "bodega": "Bodega Pazos del Rey",
  "do": "Monterrei",
  "subzona": "",
  "anada": "2022",
  "g": 84.0,
  "banda": "muybueno",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 92.0,
    "anada": "2022",
    "ed": "Guía Peñín 2024",
    "url": "https://guiapenin.wine/guide/wine/pazo_de_monterrey_raul_boo_mencia_2022_t/en"
   }
  ]
 },
 {
  "nombre": "Godello en Lágrimas de los Bancales de Olivedo",
  "bodega": "Bodegas Sampayolo",
  "do": "Valdeorras",
  "subzona": "",
  "anada": "2023",
  "g": 84.0,
  "banda": "muybueno",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 92.0,
    "anada": "2023",
    "ed": "Cata 2024",
    "url": "https://guiapenin.wine/guide/wine/sampayolo_godello_en_lagrimas_de_los_bancales_de_olivedo_2023_b/es"
   }
  ]
 },
 {
  "nombre": "Ededia",
  "bodega": "Viña Somoza",
  "do": "Valdeorras",
  "subzona": "",
  "anada": "2023",
  "g": 84.0,
  "banda": "muybueno",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 92.0,
    "anada": "2023",
    "ed": "Cata 2025",
    "url": "https://guiapenin.wine/guide/wine/ededia_2023_b_ba/es"
   }
  ]
 },
 {
  "nombre": "Fillaboa",
  "bodega": "Bodegas Fillaboa",
  "do": "Rías Baixas",
  "subzona": "Condado do Tea",
  "anada": "2024",
  "g": 82.0,
  "banda": "bueno",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 91.0,
    "anada": "2024",
    "ed": "2025",
    "url": "https://guiapenin.wine/guide/wine/fillaboa_2024_b/es"
   }
  ]
 },
 {
  "nombre": "1583 Albariño de Fefiñanes",
  "bodega": "Bodegas del Palacio de Fefiñanes",
  "do": "Rías Baixas",
  "subzona": "Val do Salnés",
  "anada": "2024",
  "g": 82.0,
  "banda": "bueno",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 91.0,
    "anada": "2024",
    "ed": "2025",
    "url": "https://guiapenin.wine/guide/wine/1583_albarino_de_fefinanes_2024_b/es"
   }
  ]
 },
 {
  "nombre": "Morgadío",
  "bodega": "Adegas Morgadío",
  "do": "Rías Baixas",
  "subzona": "Condado do Tea",
  "anada": "2024",
  "g": 82.0,
  "banda": "bueno",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 91.0,
    "anada": "2024",
    "ed": "2025",
    "url": "https://guiapenin.wine/guide/wine/morgadio_2024_b/es"
   }
  ]
 },
 {
  "nombre": "Albariño Do Ferreiro",
  "bodega": "Bodegas Gerardo Méndez",
  "do": "Rías Baixas",
  "subzona": "Val do Salnés",
  "anada": "2024",
  "g": 82.0,
  "banda": "bueno",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 91.0,
    "anada": "2024",
    "ed": "2025",
    "url": "https://guiapenin.wine/guide/wine/albarino_do_ferreiro_2024_b/es"
   }
  ]
 },
 {
  "nombre": "Condado Laxas",
  "bodega": "Bodegas As Laxas",
  "do": "Rías Baixas",
  "subzona": "Condado do Tea",
  "anada": "2023",
  "g": 82.0,
  "banda": "bueno",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 91.0,
    "anada": "2023",
    "ed": "2024",
    "url": "https://guiapenin.wine/guide/wine/condado_laxas_2023_b/en"
   }
  ]
 },
 {
  "nombre": "Eidosela Selección",
  "bodega": "Bodegas Eidosela",
  "do": "Rías Baixas",
  "subzona": "Condado do Tea",
  "anada": "2023",
  "g": 82.0,
  "banda": "bueno",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 91.0,
    "anada": "2023",
    "ed": "2025",
    "url": "https://guiapenin.wine/guide/wine/eidosela_seleccion_2023_b/en"
   }
  ]
 },
 {
  "nombre": "Manuel D’Amaro Albariño",
  "bodega": "Señorío de Rubiós",
  "do": "Rías Baixas",
  "subzona": "Condado do Tea",
  "anada": "2024",
  "g": 82.0,
  "banda": "bueno",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 91.0,
    "anada": "2024",
    "ed": "2025",
    "url": "https://guiapenin.wine/guide/wine/manuel_damaro_albarino_2024_b/en"
   }
  ]
 },
 {
  "nombre": "Altos de Torona Barrica",
  "bodega": "Altos de Torona",
  "do": "Rías Baixas",
  "subzona": "O Rosal",
  "anada": "2023",
  "g": 82.0,
  "banda": "bueno",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 91.0,
    "anada": "2023",
    "ed": "2025",
    "url": "https://guiapenin.wine/guide/wine/altos_de_torona_2023_b_ba/en"
   }
  ]
 },
 {
  "nombre": "Gran Novas Albariño",
  "bodega": "Bodegas Aldea de Abaixo",
  "do": "Rías Baixas",
  "subzona": "O Rosal",
  "anada": "2024",
  "g": 82.0,
  "banda": "bueno",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 91.0,
    "anada": "2024",
    "ed": "2025",
    "url": "https://guiapenin.wine/guide/wine/gran_novas_albarino_2024_b/en"
   }
  ]
 },
 {
  "nombre": "Pazo de Seoane O Rosal",
  "bodega": "Lagar de Cervera",
  "do": "Rías Baixas",
  "subzona": "O Rosal",
  "anada": "2024",
  "g": 82.0,
  "banda": "bueno",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 91.0,
    "anada": "2024",
    "ed": "2025",
    "url": "https://guiapenin.wine/guide/wine/pazo_de_seoane_o_rosal_2024_b/en"
   }
  ]
 },
 {
  "nombre": "Quinta de Couselo",
  "bodega": "Quinta de Couselo",
  "do": "Rías Baixas",
  "subzona": "O Rosal",
  "anada": "2024",
  "g": 82.0,
  "banda": "bueno",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 91.0,
    "anada": "2024",
    "ed": "2025",
    "url": "https://guiapenin.wine/guide/wine/quinta_de_couselo_2024_b/en"
   }
  ]
 },
 {
  "nombre": "Sin Palabras",
  "bodega": "Adegas Castrobrey",
  "do": "Rías Baixas",
  "subzona": "Ribeira do Ulla",
  "anada": "2024",
  "g": 82.0,
  "banda": "bueno",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 91.0,
    "anada": "2024",
    "ed": "2025",
    "url": "https://guiapenin.wine/guide/wine/sin_palabras_2024_b/en"
   }
  ]
 },
 {
  "nombre": "Veigas de Padriñán",
  "bodega": "Adega Eidos",
  "do": "Rías Baixas",
  "subzona": "Val do Salnés",
  "anada": "2023",
  "g": 82.0,
  "banda": "bueno",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 91.0,
    "anada": "2023",
    "ed": "2025",
    "url": "https://guiapenin.wine/guide/wine/veigas_de_padrinan_2023_b/en"
   }
  ]
 },
 {
  "nombre": "Terra de Asorei",
  "bodega": "Adegas Terra de Asorei",
  "do": "Rías Baixas",
  "subzona": "Val do Salnés",
  "anada": "2024",
  "g": 82.0,
  "banda": "bueno",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 91.0,
    "anada": "2024",
    "ed": "2025",
    "url": "https://guiapenin.wine/guide/wine/terra_de_asorei_2024_b/en"
   }
  ]
 },
 {
  "nombre": "Albariño de Fefiñanes",
  "bodega": "Bodegas del Palacio de Fefiñanes",
  "do": "Rías Baixas",
  "subzona": "Val do Salnés",
  "anada": "2024",
  "g": 82.0,
  "banda": "bueno",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 91.0,
    "anada": "2024",
    "ed": "2025",
    "url": "https://guiapenin.wine/guide/wine/albarino_de_fefinanes_2024_b/en"
   }
  ]
 },
 {
  "nombre": "Baladiña",
  "bodega": "Lagar de Besada",
  "do": "Rías Baixas",
  "subzona": "Val do Salnés",
  "anada": "2023",
  "g": 82.0,
  "banda": "bueno",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 91.0,
    "anada": "2023",
    "ed": "2025",
    "url": "https://guiapenin.wine/guide/wine/baladina_2023_b/en"
   }
  ]
 },
 {
  "nombre": "Maior de Mendoza sobre Lías",
  "bodega": "Maior de Mendoza",
  "do": "Rías Baixas",
  "subzona": "Val do Salnés",
  "anada": "2023",
  "g": 82.0,
  "banda": "bueno",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 91.0,
    "anada": "2023",
    "ed": "2025",
    "url": "https://guiapenin.wine/guide/wine/maior_de_mendoza_sobre_lias_2023_b/en"
   }
  ]
 },
 {
  "nombre": "Vía Romana do Camiño Mencía Garda",
  "bodega": "Vía Romana | Méndez-Rojo",
  "do": "Ribeira Sacra",
  "subzona": "",
  "anada": "2022",
  "g": 82.0,
  "banda": "bueno",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 91.0,
    "anada": "2022",
    "ed": "Guía Peñín 2026 (cata 2025)",
    "url": "https://guiapenin.wine/guide/wine/via_romana_do_camino_mencia_garda_2022_t/en"
   }
  ]
 },
 {
  "nombre": "Vía Romana do Camiño Godello",
  "bodega": "Vía Romana | Méndez-Rojo",
  "do": "Ribeira Sacra",
  "subzona": "",
  "anada": "2023",
  "g": 82.0,
  "banda": "bueno",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 91.0,
    "anada": "2023",
    "ed": "Guía Peñín 2026 (cata 2025)",
    "url": "https://guiapenin.wine/guide/wine/via_romana_do_camino_godello_2023_b/en"
   }
  ]
 },
 {
  "nombre": "Luxuria",
  "bodega": "Vinos Con Personalidad - Vinos de Guarda de Galicia",
  "do": "Monterrei",
  "subzona": "",
  "anada": "2023",
  "g": 82.0,
  "banda": "bueno",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 91.0,
    "anada": "2023",
    "ed": "Guía Peñín 2025",
    "url": "https://guiapenin.wine/guide/wine/luxuria_2023_b/en"
   }
  ]
 },
 {
  "nombre": "J.L. Vilela Ladairo Crianza",
  "bodega": "Bodega Ladairo",
  "do": "Monterrei",
  "subzona": "",
  "anada": "2020",
  "g": 82.0,
  "banda": "bueno",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": true,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 91.0,
    "anada": "2020",
    "ed": "Guía Peñín 2025",
    "url": "https://guiapenin.wine/guide/wine/jl_vilela_ladairo_2020_t_c/en"
   }
  ]
 },
 {
  "nombre": "Ladairo Fermentado en Barrica Semiseco",
  "bodega": "Bodega Ladairo",
  "do": "Monterrei",
  "subzona": "",
  "anada": "2021",
  "g": 82.0,
  "banda": "bueno",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": true,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 91.0,
    "anada": "2021",
    "ed": "Guía Peñín 2024",
    "url": "https://guiapenin.wine/guide/wine/ladairo_2021_b_fb_ss/en"
   }
  ]
 },
 {
  "nombre": "Joaquín Rebolledo Finca Trasdairelas",
  "bodega": "Joaquín Rebolledo",
  "do": "Valdeorras",
  "subzona": "",
  "anada": "2023",
  "g": 82.0,
  "banda": "bueno",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 91.0,
    "anada": "2023",
    "ed": "Cata 2025",
    "url": "https://guiapenin.wine/guide/wine/joaquin_rebolledo_finca_trasdairelas_2023_b/es"
   }
  ]
 },
 {
  "nombre": "Lagar de Cervera",
  "bodega": "Lagar de Fornelos",
  "do": "Rías Baixas",
  "subzona": "O Rosal",
  "anada": "2024",
  "g": 81.6,
  "banda": "bueno",
  "estado": "ok",
  "nf": 2,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 92.0,
    "anada": "2024",
    "ed": "2025",
    "url": "https://guiapenin.wine/guide/wine/lagar_de_cervera_2024_b/es"
   },
   {
    "f": "atkin",
    "fn": "Tim Atkin",
    "raw": 92.0,
    "anada": "2024",
    "ed": "",
    "url": "https://empirewine.com/wine/lagar-de-cervera-albarino-2024-h73169"
   }
  ]
 },
 {
  "nombre": "Altos de Torona Albariño",
  "bodega": "Altos de Torona",
  "do": "Rías Baixas",
  "subzona": "O Rosal",
  "anada": "2024",
  "g": 81.3,
  "banda": "bueno",
  "estado": "ok",
  "nf": 4,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "atkin",
    "fn": "Tim Atkin",
    "raw": 92.0,
    "anada": "",
    "ed": "",
    "url": "https://hgabodegas.com/producto/altos-de-torona-albarino"
   },
   {
    "f": "suckling",
    "fn": "James Suckling",
    "raw": 91.0,
    "anada": "",
    "ed": "",
    "url": "https://hgabodegas.com/producto/altos-de-torona-albarino"
   },
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 90.0,
    "anada": "2024",
    "ed": "2025",
    "url": "https://guiapenin.wine/guide/wine/altos_de_torona_albarino_2024_b/en"
   },
   {
    "f": "decanter",
    "fn": "Decanter",
    "raw": 91.0,
    "anada": "2024",
    "ed": "",
    "url": "https://www.decanter.com/wine-reviews/spain/galicia/altos-de-torona-albarino-rias-baixas-galicia-spain-2024-96998/"
   }
  ]
 },
 {
  "nombre": "Pazo San Mauro Albariño",
  "bodega": "Bodega Pazo de San Mauro",
  "do": "Rías Baixas",
  "subzona": "Condado do Tea",
  "anada": "2024",
  "g": 80.0,
  "banda": "bueno",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 90.0,
    "anada": "2024",
    "ed": "2025",
    "url": "https://guiapenin.wine/guide/wine/pazo_san_mauro_albarino_2024_b/es"
   }
  ]
 },
 {
  "nombre": "Turonia",
  "bodega": "Quinta de Couselo",
  "do": "Rías Baixas",
  "subzona": "O Rosal",
  "anada": "2024",
  "g": 80.0,
  "banda": "bueno",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 90.0,
    "anada": "2024",
    "ed": "2025",
    "url": "https://guiapenin.wine/guide/wine/turonia_2024_b/es"
   }
  ]
 },
 {
  "nombre": "Abadía de San Campio",
  "bodega": "Terras Gauda",
  "do": "Rías Baixas",
  "subzona": "O Rosal",
  "anada": "2024",
  "g": 80.0,
  "banda": "bueno",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 90.0,
    "anada": "2024",
    "ed": "2025",
    "url": "https://guiapenin.wine/guide/wine/abadia_de_san_campio_2024_b/es"
   }
  ]
 },
 {
  "nombre": "Val Do Sosego Albariño",
  "bodega": "Bodegas As Laxas",
  "do": "Rías Baixas",
  "subzona": "Condado do Tea",
  "anada": "2024",
  "g": 80.0,
  "banda": "bueno",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 90.0,
    "anada": "2024",
    "ed": "2025",
    "url": "https://guiapenin.wine/guide/wine/val_do_sosego_albarino_2024_b/en"
   }
  ]
 },
 {
  "nombre": "Eidosela Albariño",
  "bodega": "Bodegas Eidosela",
  "do": "Rías Baixas",
  "subzona": "Condado do Tea",
  "anada": "2024",
  "g": 80.0,
  "banda": "bueno",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 90.0,
    "anada": "2024",
    "ed": "2025",
    "url": "https://guiapenin.wine/guide/wine/eidosela_albarino_2024_b/en"
   }
  ]
 },
 {
  "nombre": "Señorío de Rubiós Albariño",
  "bodega": "Señorío de Rubiós",
  "do": "Rías Baixas",
  "subzona": "Condado do Tea",
  "anada": "2024",
  "g": 80.0,
  "banda": "bueno",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 90.0,
    "anada": "2024",
    "ed": "2025",
    "url": "https://guiapenin.wine/guide/wine/senorio_de_rubios_albarino_2024_b/en"
   }
  ]
 },
 {
  "nombre": "Serra da Estrela",
  "bodega": "Adegas Valmiñor",
  "do": "Rías Baixas",
  "subzona": "O Rosal",
  "anada": "2024",
  "g": 80.0,
  "banda": "bueno",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 90.0,
    "anada": "2024",
    "ed": "2025",
    "url": "https://guiapenin.wine/guide/wine/serra_da_estrela_2024_b/en"
   }
  ]
 },
 {
  "nombre": "Torroxal Albariño",
  "bodega": "Adegas Valmiñor",
  "do": "Rías Baixas",
  "subzona": "O Rosal",
  "anada": "2024",
  "g": 80.0,
  "banda": "bueno",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 90.0,
    "anada": "2024",
    "ed": "2025",
    "url": "https://guiapenin.wine/guide/wine/torroxal_albarino_2024_b/en"
   }
  ]
 },
 {
  "nombre": "Altos de Torona Caiño",
  "bodega": "Altos de Torona",
  "do": "Rías Baixas",
  "subzona": "O Rosal",
  "anada": "2023",
  "g": 80.0,
  "banda": "bueno",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 90.0,
    "anada": "2023",
    "ed": "2025",
    "url": "https://guiapenin.wine/guide/wine/altos_de_torona_caino_2023_b/en"
   }
  ]
 },
 {
  "nombre": "Altos de Torona Rosal",
  "bodega": "Altos de Torona",
  "do": "Rías Baixas",
  "subzona": "O Rosal",
  "anada": "2024",
  "g": 80.0,
  "banda": "bueno",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 90.0,
    "anada": "2024",
    "ed": "2025",
    "url": "https://guiapenin.wine/guide/wine/altos_de_torona_rosal_2024_b/en"
   }
  ]
 },
 {
  "nombre": "Rosa Ruiz",
  "bodega": "Santiago Ruiz",
  "do": "Rías Baixas",
  "subzona": "O Rosal",
  "anada": "2024",
  "g": 80.0,
  "banda": "bueno",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 90.0,
    "anada": "2024",
    "ed": "2025",
    "url": "https://guiapenin.wine/guide/wine/rosa_ruiz_2024_b/en"
   }
  ]
 },
 {
  "nombre": "Troupe",
  "bodega": "Mar de Envero",
  "do": "Rías Baixas",
  "subzona": "Ribeira do Ulla",
  "anada": "2023",
  "g": 80.0,
  "banda": "bueno",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 90.0,
    "anada": "2023",
    "ed": "2025",
    "url": "https://guiapenin.wine/guide/wine/troupe_2023_b/en"
   }
  ]
 },
 {
  "nombre": "Martín Códax",
  "bodega": "Bodegas Martín Códax",
  "do": "Rías Baixas",
  "subzona": "Val do Salnés",
  "anada": "2024",
  "g": 80.0,
  "banda": "bueno",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 90.0,
    "anada": "2024",
    "ed": "2025",
    "url": "https://guiapenin.wine/guide/wine/martin_codax_2024_b/en"
   }
  ]
 },
 {
  "nombre": "Bouza Do Rei Albariño",
  "bodega": "Bouza do Rei",
  "do": "Rías Baixas",
  "subzona": "Val do Salnés",
  "anada": "2024",
  "g": 80.0,
  "banda": "bueno",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 90.0,
    "anada": "2024",
    "ed": "2025",
    "url": "https://guiapenin.wine/guide/wine/bouza_do_rei_albarino_2024_b/en"
   }
  ]
 },
 {
  "nombre": "Rectoral do Umia Albariño Sobre Lías",
  "bodega": "Rectoral do Umia",
  "do": "Rías Baixas",
  "subzona": "Val do Salnés",
  "anada": "2023",
  "g": 80.0,
  "banda": "bueno",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 90.0,
    "anada": "2023",
    "ed": "2024",
    "url": "https://guiapenin.wine/guide/wine/rectoral_do_umia_albarino_sobre_lias_val_do_salnes_2023_b/en"
   }
  ]
 },
 {
  "nombre": "Adega Viña Almirante",
  "bodega": "Viña Almirante",
  "do": "Rías Baixas",
  "subzona": "Val do Salnés",
  "anada": "2024",
  "g": 80.0,
  "banda": "bueno",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 90.0,
    "anada": "2024",
    "ed": "2025",
    "url": "https://guiapenin.wine/guide/wine/adega_vina_almirante_2024_b/en"
   }
  ]
 },
 {
  "nombre": "Sameirás",
  "bodega": "Adega Sameirás",
  "do": "Ribeiro",
  "subzona": "",
  "anada": "2023",
  "g": 80.0,
  "banda": "bueno",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 90.0,
    "anada": "2023",
    "ed": "Guía Peñín 2025",
    "url": "https://guiapenin.wine/guide/wine/sameiras_2023_b/en"
   }
  ]
 },
 {
  "nombre": "Beade Primacía",
  "bodega": "Señorío de Beade",
  "do": "Ribeiro",
  "subzona": "",
  "anada": "2024",
  "g": 80.0,
  "banda": "bueno",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 90.0,
    "anada": "2024",
    "ed": "Guía Peñín 2026",
    "url": "https://guiapenin.wine/guide/wine/beade_primacia_2024_b/en"
   }
  ]
 },
 {
  "nombre": "Ramón Do Casar Treixadura",
  "bodega": "Ramón do Casar",
  "do": "Ribeiro",
  "subzona": "",
  "anada": "2024",
  "g": 80.0,
  "banda": "bueno",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 90.0,
    "anada": "2024",
    "ed": "Guía Peñín 2026",
    "url": "https://guiapenin.wine/guide/wine/ramon_do_casar_treixadura_2024_b/en"
   }
  ]
 },
 {
  "nombre": "G Godello Ponte da Boga",
  "bodega": "Adega Ponte da Boga",
  "do": "Ribeira Sacra",
  "subzona": "",
  "anada": "2023",
  "g": 80.0,
  "banda": "bueno",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 90.0,
    "anada": "2023",
    "ed": "Guía Peñín 2025 (cata 2024)",
    "url": "https://guiapenin.wine/guide/wine/g_godello_ponte_da_boga_2023_b/en"
   }
  ]
 },
 {
  "nombre": "Regina Viarum Finca La Capitana",
  "bodega": "Regina Viarum",
  "do": "Ribeira Sacra",
  "subzona": "",
  "anada": "2021",
  "g": 80.0,
  "banda": "bueno",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": true,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 90.0,
    "anada": "2021",
    "ed": "Guía Peñín 2026 (cata 2025)",
    "url": "https://guiapenin.wine/guide/wine/regina_viarum_finca_la_capitana_2021_t_c/en"
   }
  ]
 },
 {
  "nombre": "Ladairo Crianza",
  "bodega": "Bodega Ladairo",
  "do": "Monterrei",
  "subzona": "",
  "anada": "2022",
  "g": 80.0,
  "banda": "bueno",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 90.0,
    "anada": "2022",
    "ed": "Guía Peñín 2025",
    "url": "https://guiapenin.wine/guide/wine/ladairo_2022_t_c/en"
   }
  ]
 },
 {
  "nombre": "Ladairo Colección Familia Godello & Treixadura",
  "bodega": "Bodega Ladairo",
  "do": "Monterrei",
  "subzona": "",
  "anada": "2024",
  "g": 80.0,
  "banda": "bueno",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 90.0,
    "anada": "2024",
    "ed": "Guía Peñín 2025",
    "url": "https://guiapenin.wine/guide/wine/ladairo_coleccion_familia_godello__treixadura_2024_b/en"
   }
  ]
 },
 {
  "nombre": "Pazo de Monterrey Mencía",
  "bodega": "Bodega Pazos del Rey",
  "do": "Monterrei",
  "subzona": "",
  "anada": "2023",
  "g": 80.0,
  "banda": "bueno",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 90.0,
    "anada": "2023",
    "ed": "Guía Peñín 2025",
    "url": "https://guiapenin.wine/guide/wine/pazo_de_monterrey_mencia_2023_t/en"
   }
  ]
 },
 {
  "nombre": "Tres Mulleres Godello",
  "bodega": "Bodegas Triay",
  "do": "Monterrei",
  "subzona": "",
  "anada": "2023",
  "g": 80.0,
  "banda": "bueno",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 90.0,
    "anada": "2023",
    "ed": "Guía Peñín 2025",
    "url": "https://guiapenin.wine/guide/wine/tres_mulleres_godello_2023_b/en"
   }
  ]
 },
 {
  "nombre": "Triay 38",
  "bodega": "Bodegas Triay",
  "do": "Monterrei",
  "subzona": "",
  "anada": "2021",
  "g": 80.0,
  "banda": "bueno",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": true,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 90.0,
    "anada": "2021",
    "ed": "Guía Peñín 2025",
    "url": "https://guiapenin.wine/guide/wine/triay_38_2021_t/en"
   }
  ]
 },
 {
  "nombre": "Quintas das Tapias Treixadura",
  "bodega": "Bodega Tapias Mariñán",
  "do": "Monterrei",
  "subzona": "",
  "anada": "2022",
  "g": 80.0,
  "banda": "bueno",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 90.0,
    "anada": "2022",
    "ed": "Guía Peñín 2024",
    "url": "https://guiapenin.wine/guide/wine/quintas_das_tapias_treixadura_2022_b/en"
   }
  ]
 },
 {
  "nombre": "Bágoa do Miño",
  "bodega": "Bodegas As Laxas",
  "do": "Rías Baixas",
  "subzona": "Condado do Tea",
  "anada": "2023",
  "g": 79.4,
  "banda": "correcto",
  "estado": "ok",
  "nf": 3,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 90.0,
    "anada": "2023",
    "ed": "2024",
    "url": "https://guiapenin.wine/guide/wine/bagoa_do_mino_2023_b/en"
   },
   {
    "f": "atkin",
    "fn": "Tim Atkin",
    "raw": 91.0,
    "anada": "2023",
    "ed": "",
    "url": "https://www.bodeboca.pt/vinho/bagoa-mino-2023"
   },
   {
    "f": "suckling",
    "fn": "James Suckling",
    "raw": 91.0,
    "anada": "2023",
    "ed": "",
    "url": "https://www.bodeboca.pt/vinho/bagoa-mino-2023"
   }
  ]
 },
 {
  "nombre": "Granbazán Etiqueta Verde",
  "bodega": "Bodegas Granbazán",
  "do": "Rías Baixas",
  "subzona": "Val do Salnés",
  "anada": "2024",
  "g": 79.4,
  "banda": "correcto",
  "estado": "ok",
  "nf": 2,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 91.0,
    "anada": "2024",
    "ed": "2025",
    "url": "https://guiapenin.wine/guide/wine/granbazan_etiqueta_verde_2024_b/en"
   },
   {
    "f": "decanter",
    "fn": "Decanter",
    "raw": 95.0,
    "anada": "",
    "ed": "",
    "url": "https://www.bodegasgranbazan.com/granbazan-etiqueta-verde-obtiene-95-puntos-y-medalla-de-oro-en-los-decanter-world-wine-awards-2026/"
   }
  ]
 },
 {
  "nombre": "Terras Gauda",
  "bodega": "Terras Gauda",
  "do": "Rías Baixas",
  "subzona": "O Rosal",
  "anada": "2024",
  "g": 79.0,
  "banda": "correcto",
  "estado": "ok",
  "nf": 2,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 91.0,
    "anada": "2024",
    "ed": "2025",
    "url": "https://guiapenin.wine/guide/wine/terras_gauda_2024_b/es"
   },
   {
    "f": "atkin",
    "fn": "Tim Atkin",
    "raw": 92.0,
    "anada": "2024",
    "ed": "",
    "url": "https://www.bodeboca.it/vino/terras-gauda-2024"
   }
  ]
 },
 {
  "nombre": "Santiago Ruiz",
  "bodega": "Santiago Ruiz",
  "do": "Rías Baixas",
  "subzona": "O Rosal",
  "anada": "2024",
  "g": 79.0,
  "banda": "correcto",
  "estado": "ok",
  "nf": 2,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 91.0,
    "anada": "2024",
    "ed": "2025",
    "url": "https://guiapenin.wine/guide/wine/santiago_ruiz_2024_b/es"
   },
   {
    "f": "atkin",
    "fn": "Tim Atkin",
    "raw": 92.0,
    "anada": "2024",
    "ed": "",
    "url": "https://www.noticiasdelvino.com/actualidad/2025/12/11/luisa-freire-enologa-de-santiago-ruiz-elegida-leyenda-del-ano-por-el-critico-tim-atkin-66842/"
   }
  ]
 },
 {
  "nombre": "Nora",
  "bodega": "Viña Nora",
  "do": "Rías Baixas",
  "subzona": "Condado do Tea",
  "anada": "2024",
  "g": 79.0,
  "banda": "correcto",
  "estado": "ok",
  "nf": 2,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 91.0,
    "anada": "2024",
    "ed": "2025",
    "url": "https://guiapenin.wine/guide/wine/nora_2024_b/en"
   },
   {
    "f": "atkin",
    "fn": "Tim Atkin",
    "raw": 92.0,
    "anada": "",
    "ed": "",
    "url": "https://smartbites.net/en/nora-rias-baixas.html"
   }
  ]
 },
 {
  "nombre": "Granbazán Etiqueta Ámbar",
  "bodega": "Bodega Granbazán",
  "do": "Rías Baixas",
  "subzona": "Val do Salnés",
  "anada": "2024",
  "g": 78.7,
  "banda": "correcto",
  "estado": "ok",
  "nf": 2,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 91.0,
    "anada": "2024",
    "ed": "2025",
    "url": "https://guiapenin.wine/guide/wine/granbazan_etiqueta_ambar_2024_b/es"
   },
   {
    "f": "atkin",
    "fn": "Tim Atkin",
    "raw": 93.0,
    "anada": "2024",
    "ed": "",
    "url": "https://www.decantalo.com/us/en/granbazan-etiqueta-ambar.html"
   }
  ]
 },
 {
  "nombre": "Condes de Albarei Albariño",
  "bodega": "Adega Condes de Albarei",
  "do": "Rías Baixas",
  "subzona": "Val do Salnés",
  "anada": "2024",
  "g": 78.0,
  "banda": "correcto",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 89.0,
    "anada": "2024",
    "ed": "2025",
    "url": "https://guiapenin.wine/guide/wine/condes_de_albarei_albarino_2024_b/es"
   }
  ]
 },
 {
  "nombre": "Castro Martín Sobre Lías",
  "bodega": "Bodegas Castro Martín",
  "do": "Rías Baixas",
  "subzona": "Val do Salnés",
  "anada": "2023",
  "g": 78.0,
  "banda": "correcto",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 89.0,
    "anada": "2023",
    "ed": "2025",
    "url": "https://guiapenin.wine/guide/wine/castro_martin_sobre_lias_2023_b/es"
   }
  ]
 },
 {
  "nombre": "Puerta Santa",
  "bodega": "Adegas Morgadío",
  "do": "Rías Baixas",
  "subzona": "Condado do Tea",
  "anada": "2024",
  "g": 78.0,
  "banda": "correcto",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 89.0,
    "anada": "2024",
    "ed": "2025",
    "url": "https://guiapenin.wine/guide/wine/puerta_santa_2024_b/en"
   }
  ]
 },
 {
  "nombre": "Torre La Moreira",
  "bodega": "Bodegas Marqués de Vizhoja",
  "do": "Rías Baixas",
  "subzona": "Condado do Tea",
  "anada": "2024",
  "g": 78.0,
  "banda": "correcto",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 89.0,
    "anada": "2024",
    "ed": "2025",
    "url": "https://guiapenin.wine/guide/wine/torre_la_moreira_2024_b/en"
   }
  ]
 },
 {
  "nombre": "Valmiñor",
  "bodega": "Adegas Valmiñor",
  "do": "Rías Baixas",
  "subzona": "O Rosal",
  "anada": "2024",
  "g": 78.0,
  "banda": "correcto",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 89.0,
    "anada": "2024",
    "ed": "2025",
    "url": "https://guiapenin.wine/guide/wine/valminor_2024_b/en"
   }
  ]
 },
 {
  "nombre": "Benito Santos Albariño",
  "bodega": "Benito Santos",
  "do": "Rías Baixas",
  "subzona": "Val do Salnés",
  "anada": "2023",
  "g": 78.0,
  "banda": "correcto",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 89.0,
    "anada": "2023",
    "ed": "2024",
    "url": "https://guiapenin.wine/guide/wine/benito_santos_albarino_2023_b/en"
   }
  ]
 },
 {
  "nombre": "Segrel Albariño",
  "bodega": "Bodegas Pablo Padín",
  "do": "Rías Baixas",
  "subzona": "Val do Salnés",
  "anada": "2024",
  "g": 78.0,
  "banda": "correcto",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 89.0,
    "anada": "2024",
    "ed": "2025",
    "url": "https://guiapenin.wine/guide/wine/segrel_albarino_2024_b/en"
   }
  ]
 },
 {
  "nombre": "Viña Cartín",
  "bodega": "Viña Cartín",
  "do": "Rías Baixas",
  "subzona": "Val do Salnés",
  "anada": "2024",
  "g": 78.0,
  "banda": "correcto",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 89.0,
    "anada": "2024",
    "ed": "2025",
    "url": "https://guiapenin.wine/guide/wine/vina_cartin_2024_b/en"
   }
  ]
 },
 {
  "nombre": "Paco & Lola",
  "bodega": "Paco & Lola",
  "do": "Rías Baixas",
  "subzona": "Val do Salnés",
  "anada": "2024",
  "g": 76.7,
  "banda": "correcto",
  "estado": "ok",
  "nf": 2,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 90.0,
    "anada": "2024",
    "ed": "2025",
    "url": "https://guiapenin.wine/guide/wine/paco__lola_2024_b/es"
   },
   {
    "f": "atkin",
    "fn": "Tim Atkin",
    "raw": 91.0,
    "anada": "2024",
    "ed": "",
    "url": "https://whwc.com/paco-lola-albarino-rias-baixas-2024"
   }
  ]
 },
 {
  "nombre": "La Val Albariño",
  "bodega": "Bodegas La Val",
  "do": "Rías Baixas",
  "subzona": "Condado do Tea",
  "anada": "2024",
  "g": 76.7,
  "banda": "correcto",
  "estado": "ok",
  "nf": 2,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 90.0,
    "anada": "2024",
    "ed": "2025",
    "url": "https://guiapenin.wine/guide/wine/la_val_albarino_2024_b/es"
   },
   {
    "f": "atkin",
    "fn": "Tim Atkin",
    "raw": 91.0,
    "anada": "2024",
    "ed": "",
    "url": "https://bodegaslaval.com/en/noticias/la-val-tim-atkin-rias-baixas-2025/"
   }
  ]
 },
 {
  "nombre": "La Val Arantei",
  "bodega": "Bodegas La Val",
  "do": "Rías Baixas",
  "subzona": "Condado do Tea",
  "anada": "2024",
  "g": 76.1,
  "banda": "correcto",
  "estado": "ok",
  "nf": 2,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 90.0,
    "anada": "2024",
    "ed": "2025",
    "url": "https://guiapenin.wine/guide/wine/la_val_arantei_2024_b/en"
   },
   {
    "f": "atkin",
    "fn": "Tim Atkin",
    "raw": 93.0,
    "anada": "2024",
    "ed": "",
    "url": "https://bodegaslaval.com/en/noticias/la-val-tim-atkin-rias-baixas-2025/"
   }
  ]
 },
 {
  "nombre": "Veiga Naúm",
  "bodega": "Veiga Naúm",
  "do": "Rías Baixas",
  "subzona": "Val do Salnés",
  "anada": "2024",
  "g": 76.0,
  "banda": "correcto",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 88.0,
    "anada": "2024",
    "ed": "2025",
    "url": "https://guiapenin.wine/guide/wine/veiga_naum_2024_b/es"
   }
  ]
 },
 {
  "nombre": "Lagar de Besada",
  "bodega": "Lagar de Besada",
  "do": "Rías Baixas",
  "subzona": "Val do Salnés",
  "anada": "2024",
  "g": 76.0,
  "banda": "correcto",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 88.0,
    "anada": "2024",
    "ed": "2025",
    "url": "https://guiapenin.wine/guide/wine/lagar_de_besada_2024_b/es"
   }
  ]
 },
 {
  "nombre": "Alargo",
  "bodega": "Gómez y Rial",
  "do": "Rías Baixas",
  "subzona": "Ribeira do Ulla",
  "anada": "2024",
  "g": 76.0,
  "banda": "correcto",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 88.0,
    "anada": "2024",
    "ed": "2025",
    "url": "https://guiapenin.wine/guide/wine/alargo_2024_b/en"
   }
  ]
 },
 {
  "nombre": "Caralludo",
  "bodega": "Mar de Envero",
  "do": "Rías Baixas",
  "subzona": "Ribeira do Ulla",
  "anada": "2024",
  "g": 76.0,
  "banda": "correcto",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 88.0,
    "anada": "2024",
    "ed": "2025",
    "url": "https://guiapenin.wine/guide/wine/caralludo_2024_b/en"
   }
  ]
 },
 {
  "nombre": "Compostelae",
  "bodega": "Gómez y Rial",
  "do": "Rías Baixas",
  "subzona": "Ribeira do Ulla",
  "anada": "2024",
  "g": 74.0,
  "banda": "correcto",
  "estado": "dato_unico",
  "nf": 1,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 87.0,
    "anada": "2024",
    "ed": "2025",
    "url": "https://guiapenin.wine/guide/wine/compostelae_2024_b/en"
   }
  ]
 },
 {
  "nombre": "Leira Pondal",
  "bodega": "Pazo Pondal",
  "do": "Rías Baixas",
  "subzona": "Condado do Tea",
  "anada": "2024",
  "g": 72.9,
  "banda": "correcto",
  "estado": "ok",
  "nf": 2,
  "nota": "",
  "guardia": false,
  "fuentes": [
   {
    "f": "penin",
    "fn": "Guía Peñín",
    "raw": 88.0,
    "anada": "2024",
    "ed": "2025",
    "url": "https://guiapenin.wine/guide/wine/leira_pondal_2024_b/en"
   },
   {
    "f": "suckling",
    "fn": "James Suckling",
    "raw": 90.0,
    "anada": "",
    "ed": "",
    "url": "http://pazopondal.com/wp-content/uploads/2015/07/ficha-de-cata-Leira-Pondal-ENG.pdf"
   }
  ]
 },
 {
  "nombre": "Condes de Albarei",
  "bodega": "Bodegas Condes de Albarei",
  "do": "Rías Baixas",
  "subzona": "Val do Salnés",
  "anada": "",
  "g": null,
  "banda": "sin",
  "estado": "anada_historica",
  "nf": 0,
  "nota": "La puntuación corresponde a una añada que ya no está a la venta (verificado contra la web de la bodega).",
  "guardia": true,
  "fuentes": []
 },
 {
  "nombre": "Terra de Asorei Pago de Xoán",
  "bodega": "Adegas Terra de Asorei",
  "do": "Rías Baixas",
  "subzona": "",
  "anada": "",
  "g": null,
  "banda": "sin",
  "estado": "anada_historica",
  "nf": 0,
  "nota": "La puntuación corresponde a una añada que ya no está a la venta (verificado contra la web de la bodega).",
  "guardia": true,
  "fuentes": []
 },
 {
  "nombre": "Fefiñanes 1583",
  "bodega": "Bodegas del Palacio de Fefiñanes",
  "do": "Rías Baixas",
  "subzona": "",
  "anada": "",
  "g": null,
  "banda": "sin",
  "estado": "anada_historica",
  "nf": 0,
  "nota": "La puntuación corresponde a una añada que ya no está a la venta (verificado contra la web de la bodega).",
  "guardia": true,
  "fuentes": []
 }
];
