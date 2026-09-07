export interface Article {
  id: string;
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  readTime: string;
  date: string;
  author: string;
  tags: string[];
  featured: boolean;
  content: string;
}

export const ARTICLES: Article[] = [
  {
    id: '1',
    slug: 'salvora-tragedia-santa-isabel-parque-nacional',
    category: 'Historia & Navegación',
    title: 'Sálvora y el vapor Santa Isabel: memoria náutica y soberanía del Parque Nacional',
    excerpt: 'Análisis histórico de la noche del 2 de enero de 1921 en la boca de la Ría de Arousa. El rescate de las heroínas de Sálvora, la hidrografía de los bajos de Pegar y el régimen actual de conservación del archipiélago.',
    readTime: '8 min de lectura',
    date: 'Otoño 2026',
    author: 'Cuaderno Atlántico',
    tags: ['Sálvora', 'Historia Marítima', 'Parque Nacional'],
    featured: true,
    content: `En la madrugada del 2 de enero de 1921, la boca de la Ría de Arousa fue escenario de una de las mayores catástrofes navales del siglo XX en el litoral español, pero también del testimonio de solidaridad comunitaria más conmovedor registrado en las costas atlánticas. El vapor-correo *Santa Isabel*, buque insignia de la Compañía Transatlántica Española, navegaba con rumbo final a Buenos Aires realizando escalas de pasaje migratorio gallego.

### I. La trampa batimétrica de los Bajos de Pegar

Aquel invierno azotaba Galicia con una sucesión ininterrumpida de frentes del sudoeste. A la 01:50 de la madrugada, bajo una niebla cerrada y vientos huracanados que desdibujaban las señales lumínicas de los faros de Corrubedo y Sálvora, el buque calculó erróneamente su posición al intentar tomar abrigo en la ría.

A velocidad de crucero, la quilla colisionó contra las agujas de granito sumergidas de los **Bajos de Pegar**, a menos de doscientos metros de la costa meridional de Sálvora. El impacto desgarró el casco bajo las salas de calderas; la nave quedó sumida en la oscuridad, escorada y partida en dos sobre la rompiente con 268 almas a merced de olas de más de siete metros.

### II. Las Heroínas de Sálvora: coraje en una dornilla de madera

Con la mayoría de los hombres adultos en tierra firme, cuatro jóvenes mujeres isleñas tomaron la iniciativa: **María Fernández Oujo, Josefa Parada, Cipriana Oujo Maneiro y Cipriana Crujeiras**.

Botaron una humilde *dornilla* de madera sin cubierta impulsada únicamente a remo de fuerza. En mitad de la noche ciega, esquivando rocas afiladas y contracorrientes de succión, completaron tres viajes sucesivos entre los restos del naufragio y la playa del Pazo, rescatando a pulso de remo a 56 supervivientes.

### III. Memoria náutica y custodia del Parque Nacional

La Real Sociedad de Salvamento de Náufragos condecoró a las remeras con la medalla de oro, reconociendo una de las mayores hazañas civiles en la historia de la marina mercante. Aquel suceso transformó la reglamentación de balizamiento y radiotelegrafía en las rías.

En la actualidad, la Isla de Sálvora forma parte del **Parque Nacional Marítimo-Terrestre de las Islas Atlánticas de Galicia**. Sus arenales vírgenes, el faro centenario y sus roquedos son hoy un santuario biológico donde crían colonias protegidas de cormorán moñudo y nutria marina bajo un estricto régimen de visitas reguladas.`
  },
  {
    id: '2',
    slug: 'la-ilusion-de-la-linea-recta-cartografia-aguiño-salvora',
    category: 'Cartografía & Territorio',
    title: 'La ilusión de la línea recta: cartografía náutica, distancias reales y el horizonte de Sálvora',
    excerpt: 'Por qué las plataformas de reservas confunden la ría con un mapa llano. La trampa euclidiana entre el Barbanza y O Salnés: 80 km de carretera real frente a la derrota marítima de Aguiño a Sálvora.',
    readTime: '7 min de lectura',
    date: 'Temporada 2026',
    author: 'Cuaderno Atlántico',
    tags: ['Cartografía', 'GEO-SEO', 'Navegación', 'Barbanza'],
    featured: true,
    content: `Todo motor de reservas masivo —Booking, Airbnb y sus derivados comerciales— construye sus algoritmos de recomendación sobre una capa cartográfica bidimensional plana. Al calcular la proximidad entre un viajero y un punto de interés, el sistema traza una línea recta geométrica ignorando la orografía del terreno y las barreras hidrográficas.

### I. La ceguera del algoritmo en una ría

En la Ría de Arousa, la orilla norte (comarca do Barbanza) y la orilla sur (península de O Salnés) aparecen en pantalla separadas por una franja azul de apenas 4 o 5 millas náuticas (unos 8 km). El algoritmo comete el error de sugerir la playa de A Lanzada o las tabernas de O Grove como "puntos cercanos" para un huésped en Aguiño.

Pero ese segmento azul es la ría más caudalosa de Galicia: no existen puentes exteriores ni transbordadores de vehículos. El mapa plano promete una cercanía que la física niega.

### II. La barrera líquida y los canales náuticos

La bocana exterior de la ría es un espacio de gran complejidad técnica. El archipiélago de Sálvora y los islotes de Sagres fragmentan la entrada atlántica en pasos como el canal principal (con fondos de hasta 70 metros) y el angosto paso do Carreiro frente a Aguiño.

Esta hidrografía convierte a **Aguiño en el puerto natural de acceso a Sálvora**, a tan solo dos millas de derrota directa y abrigada. Por el contrario, cruzar desde la orilla sur implica atravesar toda la bocana expuesto al mar de fondo del sudoeste y a las corrientes de marea de los bajos de Lobeira.

### III. La realidad terrestre: 80 km de asfalto

En carretera, salvar la ría exige bordearla en su totalidad: tomar la **autovía AG-11 (Autovía do Barbanza)** hasta Dodro/Padrón, cruzar el estuario del río Ulla por la AP-9 o Catoira, y descender hacia el sur por O Salnés.

El trayecto real entre Aguiño y O Grove o A Lanzada se sitúa entre los **75 y 80 kilómetros efectivos de conducción** (55 a 65 minutos reales). Promocionar la orilla de enfrente como entorno inmediato es un error de bulto que ignora la identidad marina y bravía del Barbanza.`
  },
  {
    id: '3',
    slug: 'percebe-bravura-rompiente-aguiño-tabla-salmuera',
    category: 'Tratado de Producto & Lonja',
    title: 'El percebe de los bajos de Aguiño: hidrodinámica de la rompiente y tratado de cocción',
    excerpt: 'Diferenciación morfológica del pollicipes pollicipes extraído en roca batida frente al percebe de sombra. Fisiología, dinámica de mareas vivas y la regla exacta de salinidad y ebullición según la tradición costera.',
    readTime: '6 min de lectura',
    date: 'Temporada 2026',
    author: 'Cuaderno Atlántico',
    tags: ['Gastronomía', 'Lonja de Aguiño', 'Marisco'],
    featured: true,
    content: `El puerto de Aguiño y los bajos exteriores de Sagres y Sálvora constituyen uno de los grandes santuarios mundiales del percebe (*Pollicipes pollicipes*). La colisión hidrodinámica del Atlántico abierto contra el batolito granítico genera aguas hiperoxigenadas, imprescindibles para su desarrollo.

### I. Biología y biomecánica en la rompiente

El percebe es un crustáceo cirrípedo que vive anclado a la roca mediante un pedúnculo carnoso rematado en una uña calcárea. Para filtrar zooplancton requiere un embate constante de oleaje: cuanto mayor es la fuerza del mar, mayor musculatura y densidad concentra su carne.

### II. Percebe de rompiente vs. Percebe de sombra

En lonja se diferencian dos tipologías claras:
* **Percebe de sol y rompiente:** Extraído en roca batida exterior. Pedúnculo corto, grueso, oscuro y cilíndrico, uña sin sedimentos y sabor a yodo puro de alta intensidad.
* **Percebe de sombra o grieta:** Criado en hendiduras resguardadas sin batida. Pedúnculo largo, fino y acuoso, de menor concentración gastronómica.

### III. Tratado exacto de cocción

La regla tradicional sentencia: *«Auga que ferve, percebes bota; auga que ferve, percebes fóra»*.
1. **Salinidad:** Disolver exactamente entre **65 y 70 gramos de sal marina gruesa** por litro de agua dulce (o agua pura de mar).
2. **Aromático:** Una única hoja de laurel seco de calidad por cada 2 litros.
3. **Punto térmico:** Se introducen en ebullición viva; al recuperar el segundo hervor, se cronometran exactamente **60 segundos** y se retiran a una fuente cubierta con paño de lino para atemperar.`
  },
  {
    id: '4',
    slug: 'cultivo-mejillon-ria-arousa-dinamica-bateas',
    category: 'Oceanografía & Ría',
    title: 'La arquitectura flotante de la Ría de Arousa: el afloramiento costero y el ciclo del mejillón',
    excerpt: 'Por qué la Ría de Arousa es el ecosistema marino de mayor productividad de Europa. El fenómeno físico del afloramiento (upwelling), las vigas de madera de eucalipto curadas en salmuera y el ciclo biológico del mejillón.',
    readTime: '7 min de lectura',
    date: 'Verano 2026',
    author: 'Cuaderno Atlántico',
    tags: ['Bateas', 'Ría de Arousa', 'Oceanografía'],
    featured: false,
    content: `Frente a la costa de Aguiño se despliegan más de 2.300 bateas ordenadas en cuadrículas poligonales. Estas estructuras flotantes de madera representan un triunfo de la ingeniería vernácula gallega en armonía con la física oceánica.

### I. El motor del Upwelling (Afloramiento)

Entre abril y septiembre, los vientos del norte empujan las aguas cálidas superficiales hacia el océano exterior. Por compensación física, asciende desde las fosas abisales el **Agua Central Noratlántica (ACNA)**: gélida y cargada de sales de fósforo, nitrógeno y silicio.

Al penetrar en la ría y recibir radiación solar, se produce una fotosíntesis masiva de fitoplancton que sitúa a la ría entre los ecosistemas biológicos más productivos de la Tierra.

### II. Anatomía de la batea de eucalipto

La parrilla cuadrangular se construye con vigas maestras de madera de eucalipto, curadas en agua marina para dotarlas de flexibilidad frente a la mar de fondo. Se fondean al lecho marino con cables de acero amarrados a bloques de hormigón de hasta 20 toneladas.

### III. El ciclo del Mexillón de Galicia (DOP)

El mejillón (*Mytilus galloprovincialis*) filtra hasta 8 litros de agua por hora sin piensos artificiales:
1. **Mexilla:** Recolección de la cría en las rocas batidas de Sálvora y Aguiño.
2. **Encordado:** Sujeción a cuerdas de 12 metros con malla de algodón biodegradable.
3. **Desdoble:** A los seis meses, la piña de mejillón se reparte en nuevas cuerdas para garantizar un engorde uniforme.
4. **Cosecha:** Tras 14-18 meses de maduración se extrae un bivalvo de carnosidad excepcional.`
  }
];
