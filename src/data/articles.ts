export interface Article {
  id: string;
  slug?: string;
  category: string;
  title: string;
  excerpt: string;
  readTime: string;
  date: string;
  author?: string;
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
  },
{
    id: 'la-falacia-del-mapa-del-tiempo-microclima-aguiño',
    slug: 'falacia-mapa-tiempo-modelos-neuronales-aguino',
    title: 'La falacia del mapa del tiempo: por qué los modelos neuronales de 1 km dan la razón al marinero de Aguiño',
    category: 'Oceanografía & Ría',
    readTime: '8 min de lectura',
    date: 'Septiembre 2026',
    featured: true,
    excerpt: 'Un análisis físico y tecnológico sobre la brecha entre los modelos meteorológicos convencionales de 25 km y la realidad de la bocana de Arousa. Cómo la inteligencia artificial predictiva de alta resolución valida por fin el conocimiento empírico del mar.',
    tags: ['Microclimas', 'DeepMind MetNet', 'Sálvora & Costa', 'Oceanografía', 'Navegación'],
    content: `
Durante décadas, la percepción meteorológica de Galicia ha sido víctima de una simplificación cartográfica devastadora. El clásico mapa del tiempo televisivo —y más recientemente, las aplicaciones nativas de los teléfonos inteligentes— opera bajo una tiranía de baja resolución: un icono genérico de nube con gotas de agua proyectado sobre todo el cuadrante noroccidental de la península ibérica.

Para el viajero que consulta el móvil desde Madrid, Barcelona o Londres, el veredicto es binario y sumario: «en Galicia llueve». Sin embargo, cualquier observador atento en la costa exterior del Barbanza sabe que esa afirmación carece de rigor físico. La distancia en línea recta entre Santiago de Compostela y el muelle de Aguiño apenas supera los 50 kilómetros; climáticamente, sin embargo, pertenecen a regímenes atmosféricos a menudo disociados.

### La trampa matemática de la malla: el «píxel ciego»
Para entender el origen de este sesgo meteorológico no hay que mirar al cielo, sino al código de los modelos numéricos globales tradicionales, como el GFS estadounidense o las salidas estándar del ECMWF.

Estos sistemas discretizan la atmósfera en cuadrículas tridimensionales que históricamente oscilan entre los 9 y los 25 kilómetros de lado. Dentro de una celda de 15×15 km:
- El modelo calcula un único valor promedio para variables críticas como humedad, temperatura de superficie y condensación.
- En ese mismo píxel computacional conviven la cima de la Sierra del Barbanza (más de 600 metros de altitud) y el nivel cero del mar en la bocana de la ría.
- Cuando una masa de aire húmedo atlántico choca contra el relieve, se produce el ascenso forzado orográfico: el aire se enfría, se satura y descarga lluvia intensa sobre la sierra.

Al promediar la celda, el algoritmo computa precipitación para todo el cuadrante. En el mapa digital del usuario, la costa de Aguiño y el archipiélago de Sálvora quedan teñidos de lluvia, cuando en realidad la nube se está descargando kilómetros tierra adentro.

### La física de la bocana: por qué la costa disuelve la nube
El litoral exterior de la Ría de Arousa no es un receptor pasivo del frente; es un disipador dinámico regulado por tres fuerzas oceanográficas:

1. **Inercia térmica oceánica:** La inmensa masa de agua del Atlántico actúa como un termostato de baja variabilidad. El contraste térmico mar-tierra genera gradientes de presión locales que aceleran las brisas costeras, impidiendo el estancamiento de masas estratiformes.
2. **Efecto pantalla y subsidencia costera:** Gran parte de la nubosidad queda anclada en los primeros relieves del interior, provocando pasillos de subsidencia (aire descendente que se calienta adiabáticamente y se seca) en la franja costera inmediata.
3. **El corredor de vientos de la ría:** La orientación geográfica de la bocana entre la Península del Barbanza y la de O Salnés canaliza corrientes que literalmente «limpian» el techo de nubes, abriendo claros persistentes mientras el interior permanece encapotado.

El marinero tradicional no formulaba ecuaciones diferenciales, pero le bastaba mirar hacia el faro de Sálvora: si el horizonte suroeste abría claros y el viento rolaba a norte-noroeste, la tarde en la ría era de sol y trabajo, dijera lo que dijese el barómetro de tierra adentro.

### La revolución de los modelos neuronales: el caso MetNet-3 de Google DeepMind
La meteorología computacional ha entrado en una nueva era gracias al aprendizaje profundo. La publicación técnica de Google DeepMind sobre MetNet-3 marca un punto de inflexión que reivindica, al fin, la realidad del microclima costero.

A diferencia de los modelos basados exclusivamente en aproximaciones numéricas pesadas —que tardan horas en supercomputadores y pierden la escala local—, MetNet-3 introduce una arquitectura radicalmente distinta:
- **Resolución espacial de 1 a 2 kilómetros:** La sierra, la ría, el muelle de Aguiño y las islas ocupan celdas computacionales independientes.
- **Asimilación continua y predicción al minuto (nowcasting):** Asimila en tiempo real reflectividad de radares meteorológicos terrestres de alta frecuencia, satélites multiespectrales (Meteosat) y estaciones de superficie.
- **Inferencia instantánea:** Mediante aceleradores de hardware (TPUs), la red genera pronósticos probabilísticos de precipitación, viento y radiación a 12-24 horas en cuestión de segundos.

Por primera vez, los modelos algorítmicos confirman lo que la física local demostraba: la lluvia tiene fronteras nítidas, y la bocana de la ría disfruta de ventanas de estabilidad atmosférica invisibles para los mapas comerciales genéricos.

### El observatorio en primera persona
Comprender el microclima de Aguiño no es solo una curiosidad técnica; es una declaración de intenciones para quien visita este territorio. Renunciar a la tiranía del icono de lluvia en el móvil y aprender a leer las mareas, la brisa de la tarde y la visibilidad nítida hacia Sálvora y Ons es el primer paso para habitar la costa con autenticidad.

Sentarse en la terraza frente a las bateas al atardecer, bajo un cielo abierto que los telediarios daban por perdido, es el mejor recordatorio de que en el Atlántico, la verdad meteorológica siempre la dicta el mar.
    `
  },
  {
    id: '6',
    slug: 'guia-aguino-parque-nacional-illas-atlanticas',
    category: 'Guías & Entorno',
    title: 'Guía de Aguiño y el Parque Nacional de las Islas Atlánticas: mar, granito y memoria',
    excerpt: 'Rutas marítimas hacia la Isla de Sálvora, calas recogidas de aguas serenas y la cultura marinera en la bocana de la Ría de Arousa.',
    readTime: '5 min de lectura',
    date: 'Otoño 2026',
    author: 'Cuaderno Atlántico',
    tags: ['Aguiño', 'Sálvora', 'Parque Nacional', 'Playas', 'Gastronomía'],
    featured: false,
    content: `Descubrir Aguiño es situarse en el límite donde la ría se rinde ante la inmensidad del océano. En este confín rocoso de la comarca del Barbanza, la vida cotidiana sigue pautada por las mareas, el viento del sudoeste y la silueta inconfundible del archipiélago de Sálvora recortándose en el horizonte.

### Playas y ensenadas locales: refugio de arena y calma

Lejos del bullicio masificado, el litoral de Aguiño despliega arenales singulares moldeados por el granito:

* **Playa de O Castro:** Aguas cristalinas y tranquilas al abrigo de las corrientes mayores, con una panorámica privilegiada hacia las bateas y la entrada de la ría.
* **Playa de A Catía:** Cala recogida de espíritu salvaje, ideal para el descanso sereno y la contemplación del paisaje costero.
* **Playa de O Carreiro:** Anclada junto al puerto tradicional, donde el pulso marinero convive con la arena fina.

### La Isla de Sálvora: vigía del Parque Nacional

A escasas millas náuticas de Aguiño emerge Sálvora, la joya salvaje del Parque Nacional das Illas Atlánticas:

* **La aldea y el pazo:** Vestigios de piedra de una comunidad que habitó en régimen comunal hasta mediados del siglo XX, vigilada por la leyenda pétrea de la sirena de Sálvora.
* **El faro y la tragedia del Santa Isabel:** Escenario de heroísmo y memoria donde las remeras locales desafiaron la tempestad en 1921.
* **Santuario biológico:** Un ecosistema protegido donde las colonias de aves y la fauna marina conviven entre formaciones graníticas de caprichosa geomorfología.

### Identidad gastronómica: el sabor del mar bravo

La despensa marina de Aguiño no admite intermediarios:

* **El percebe de las rompientes:** Extraído en las piedras más batidas por los percebeiros de la lonja local, reconocido por su sabor concentrado y yodado.
* **Marisco y lonja de proximidad:** Pulpo de roca, nécoras, almejas y el indiscutible mejillón de batea de la ría, directos del barco a la mesa.`
  },
  {
    id: '7',
    slug: 'casa-lee-el-mar-ingenieria-interna-alojamiento-salvora',
    category: 'El Oficio & la Casa',
    title: 'La casa que lee el mar: ingeniería interna de un alojamiento frente a Sálvora',
    excerpt: 'Qué sostiene una estancia frente a la ría: motor de reservas, guardianes automáticos, un puente de mando meteorológico y un agente de a bordo. La capa invisible de un alojamiento independiente.',
    readTime: '6 min de lectura',
    date: 'Otoño 2026',
    author: 'Cuaderno Atlántico',
    tags: ['Digital', 'Oficio', 'Puente de Mando', 'Aguiño'],
    featured: true,
    content: `Un huésped llega al atardecer, sube en el ascensor y abre la terraza. Enfrente, Sálvora y la bocana de la ría. Lo que no ve —porque no debe verlo— es la capa de ingeniería que sostiene esa estancia: sistemas de reserva, guardianes automáticos, un puente de mando meteorológico y un agente de a bordo que trabaja en silencio.

### I. La capa invisible de la reserva

Detrás de cada reserva opera un motor profesional de alojamiento (Beds24) conectado a un sistema de precios dinámicos (PriceLabs) que ajusta la tarifa a la demanda real de la ría, con suelo, base y techo definidos por estación. La estancia mínima sigue un calendario estacional firmado: dos noches en invierno, tres en temporada media, cuatro en junio y septiembre, cinco en julio y hasta siete en agosto, con reglas propias para puentes, Navidad y Semana Santa.

La reserva directa se paga con tarjeta (Stripe) o PayPal: una señal del 30 % y el resto antes de la llegada. El registro de huéspedes es digital (Partee) y genera los partes oficiales obligatorios para las fuerzas de seguridad. Cada noche de ocupación queda registrada conforme a la normativa de viviendas de uso turístico de Galicia.

### II. El Puente de Mando: la casa que lee el mar

En Aguiño el tiempo decide el día: si salen los barcos a Sálvora, si trabaja la flota del marisqueo, si se puede pasear la costa. Por eso el alojamiento publica su propio puente de mando, abierto y gratuito: meteorología local, mareas y avisos oficiales (AEMET y Google Weather) en tiempo real. Lo consultan los huéspedes y también los vecinos.

### III. Los guardianes silenciosos

El sistema se revisa solo para que el anfitrión pueda dedicarse a los huéspedes: un vigía comprueba el calendario tres veces al día, un guardián verifica la estancia mínima cada seis horas frente a cualquier sincronización externa, y el correo se recoge cada diez minutos. Cada mañana, un parte resume el estado de la casa: reservas, precios y tareas.

### IV. La escritura del cuaderno

La bitácora de la web se escribe con una regla propia: ningún dato sin fuente, y antes una ausencia que una imprecisión. Los artículos sobre la ría, Sálvora o el percebe citan fuentes primarias —de la normativa oficial al conocimiento de la lonja— y se publican en tres idiomas: español, inglés y gallego.

### V. Un agente de a bordo

La pieza más nueva del sistema es un agente de inteligencia artificial, Hermes, integrado en la operación diaria: redacta y envía las colaboraciones con instituciones y prensa local, audita las facturas de los servicios, vigila la normativa y prepara los informes de la casa. Nada se ejecuta sin la revisión del anfitrión: el agente hace, la persona manda.

### VI. La arquitectura, pieza a pieza

El sistema no cabe en una sola máquina. El agente y los servicios internos —la puerta de entrada, los vigilantes programados, el cerebro del agente de a bordo— corren en un servidor propio de Contabo, la firma alemana de alojamiento. La web pública se sirve desde Hostinger, con despliegue automático desde el repositorio del código en GitHub: cada cambio pasa antes por una versión previa y solo sube a producción tras la revisión del anfitrión.

Sobre esa base se apilan las piezas: Beds24 como motor de reservas; PriceLabs para el precio dinámico, con suelo, base y techo; Partee para el registro legal de huéspedes; Stripe y PayPal para el cobro; un bot propio en Telegram que informa al anfitrión; y una analítica privada, sin rastreadores de terceros. La meteorología del Puente cruza tres fuentes —AEMET, Google Weather y Open-Meteo— y el agente de a bordo conversa con los huéspedes mediante un modelo de lenguaje servido a través de una pasarela propia, con OpenRouter como respaldo multimodal.

Desde la terraza no se ve nada de esto. Esa es la idea.

### Lo que el huésped ve

Al final, el huésped solo ve la terraza, el mar y Sálvora al fondo. Que no vea el resto es la señal de que el sistema funciona. El mar se lee; la casa lo traduce.`
  },
];

// --- Traducciones (ES fuente de verdad) ---
import { trc } from '../i18n/dataTranslations';
import { Lang } from '../i18n/types';

export function getArticles(lang: Lang): Article[] {
  return ARTICLES.map((a) => ({
    ...a,
    category: trc(`art.${a.id}.category`, lang, a.category),
    title: trc(`art.${a.id}.title`, lang, a.title),
    excerpt: trc(`art.${a.id}.excerpt`, lang, a.excerpt),
    readTime: trc(`art.${a.id}.readTime`, lang, a.readTime),
    date: trc(`art.${a.id}.date`, lang, a.date),
    author: a.author ? trc(`art.${a.id}.author`, lang, a.author) : a.author,
    tags: a.tags.map((t, i) => trc(`art.${a.id}.tag${i}`, lang, t)),
    content: trc(`art.${a.id}.content`, lang, a.content),
  }));
}
