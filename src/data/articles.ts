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
  cover?: string;
  content: string;
}

export const ARTICLES: Article[] = [
  {
    id: '16',
    slug: 'alquiler-vacacional-ribeira',
    cover: '/laminas/atico-aguino_v.webp',
    category: 'Guías & Entorno',
    title: 'Alquiler vacacional en Ribeira: la guía para acertar con la casa',
    excerpt: 'Ribeira no es un destino de folleto: es el puerto pesquero más vivo de la ría de Arousa, con la lonja más importante de Europa en pesca de bajura y el Parque Nacional enfrente. Guía práctica para elegir zona y casa, con los datos que de verdad importan antes de reservar.',
    readTime: '2 min de lectura',
    date: 'Otoño 2026',
    author: 'Cuaderno Atlántico',
    tags: ['Ribeira', 'Aguiño', 'Alquiler Vacacional'],
    featured: true,
    content: `Quien busca «alquiler vacacional ribeira» no busca una casa: busca una decisión. Quiere saber en qué zona estar, qué playa le toca, si podrá comer marisco a dos minutos de la casa y si el sitio es auténtico o un decorado. Esta guía responde a eso con datos, sin humo. Y al final, con la casa que conocemos mejor: la nuestra, en Aguiño.

### Qué hace distinta a Ribeira

Ribeira es el municipio marinero de la península de O Barbanza, en la boca de la ría de Arousa. Aquí está la lonja más importante de Europa en pesca de bajura: cada tarde laborable, la flota descarga en Aguiño y el pescado y el marisco del día salen a la venta. Eso marca todo lo demás: los bares del puerto sirven lo que se descargó por la mañana, y el aire de la villa es el de un lugar que trabaja, no el de un parque temático.

Frente a la costa quedan las islas de Sálvora y Ons, dentro del Parque Nacional Marítimo-Terrestre de las Islas Atlánticas, y al sur, las dunas y playas de Corrubedo. Santiago de Compostela está a 50 minutos por autovía. Es una de las pocas zonas de Galicia donde mar, ría, parque nacional y ciudad están a la misma distancia de una siesta.

### Elegir zona: tres maneras de estar en Ribeira

**Ribeira centro.** La villa, con comercio, paseo marítimo y más bullicio. Buena base si se quiere tener todo a pie de calle.

**Corrubedo.** Las dunas más grandes de la costa atlántica gallega y una playa larguísima. A unos 10 minutos en coche de Aguiño. Para quien prioriza playa abierta y arena.

**Aguiño.** El puerto marinero, a 4 minutos de la lonja, con el mar a 20 metros de la casa y las islas enfrente. Es el lado auténtico: casas de marineros, bateas a la vista y el bullicio de la descarga cada tarde. Nuestra casa está aquí.

### La casa que te proponemos (y por qué lo decimos claro)

Somos propietarios, no una agencia: Illas Atlánticas Ático es nuestra casa y la alquilamos directo. Los datos, sin adornos:

- **3 dormitorios y 3 baños, hasta 6 personas** — espacio real, no un sofá cama contado como habitación.
- **Terraza panorámica de 50 m²** frente a Sálvora y Ons, a 20 metros del agua.
- **A 4 minutos andando de la lonja** (350 m): el marisco y el pescado del día, casi sin desplazarse.
- **Registro oficial VUT-CO-007656** y **9,5 sobre 10 en 54 reseñas verificadas**.
- Playas a 3 minutos andando; Corrubedo a 10 minutos en coche; Santiago a 50 minutos.

La casa se reserva directa por nuestra web, sin comisiones de plataforma: señal del 30 % para confirmar y el resto antes de la entrada, con condiciones claras por escrito y atención directa del propietario.

### Preguntas frecuentes

**¿Qué hay justo al lado de la casa?** El puerto pesquero y la lonja de Aguiño a 350 metros, playas a 3 minutos andando, y enfrente las islas de Sálvora y Ons, dentro del Parque Nacional.

**¿Cuánta gente cabe?** Hasta 6 personas en 3 dormitorios con 3 baños. Los precios publicados son para 2 personas; a partir del tercer huésped se aplica un suplemento por persona y noche que se detalla siempre en el presupuesto.

**¿Se ve el mar desde la casa?** Sí: la terraza, el salón, la cocina y el dormitorio principal miran a las islas. El agua está a 20 metros.

**¿Cómo funciona la reserva?** Todo desde nuestra web: eliges fechas, ves el precio cerrado y confirmas con una señal del 30 %. El resto se paga antes de la entrada, por transferencia, Bizum, PayPal o tarjeta (Stripe).

**¿En qué época está más viva Aguiño?** La temporada de marisco va de noviembre a abril: es cuando la lonja trabaja a pleno rendimiento y la zona muestra su cara más auténtica. El verano es playa, islas y sobremesa larga.

**¿Se puede visitar Sálvora y Ons?** Sí, con los barcos que salen del puerto de Aguiño y de la zona, siempre con autorización del Parque Nacional. En la bitácora de la web contamos la historia de ambas islas.

### La decisión en un minuto

Si buscas mar auténtico, marisco del día y una casa espaciosa con vistas a las islas, reserva directa y ahorra la comisión de las plataformas. Si quieres playa abierta, mira Corrubedo. Si quieres ciudad con paseo, Ribeira centro. Los tres están a diez minutos de distancia entre sí — que es otra manera de decir que desde cualquiera de ellos, la ría es tuya.

*Fuentes: datos de la propia casa y del entorno publicados en illasatlanticasatico.es; Parque Nacional Marítimo-Terrestre de las Islas Atlánticas de Galicia.*`
  },
  {
    id: '14',
    slug: 'cortegada-isla-rey-lauredal-europa',
    cover: '/laminas/cortegada_v.webp',
    category: 'Guías & Entorno',
    title: 'Cortegada: la isla regalada a un rey y el mayor lauredal de Europa',
    excerpt: 'De aldea expropiada a regalo real: la historia de Cortegada, la isla que perdió a sus 211 colonos y ganó el mayor bosque de laurel de Europa.',
    readTime: '2 min de lectura',
    date: 'Otoño 2026',
    author: 'Cuaderno Atlántico',
    tags: ['Cortegada', 'Naturaleza', 'Parque Nacional'],
    featured: false,
    content: `Hay islas que se ven desde la orilla y se confunden con el horizonte. Cortegada no: está a unos doscientos metros de la costa de Carril, en la boca de la ría de Arousa, y sin embargo ha vivido más historia que muchos lugares diez veces mayores. Fue aldea, monasterio, hospital y leprosería; fue regalo de reyes y proyecto de palacio; fue durante décadas un territorio vedado. Hoy es una de las islas del Parque Nacional Marítimo-Terrestre de las Islas Atlánticas de Galicia y guarda en su interior el que las fuentes oficiales y académicas describen sin matices como el mayor bosque de laurel de Europa.

### Una aldea frente a Carril

La isla perteneció al municipio de O Carril, hoy parroquia de Vilagarcía de Arousa, y estuvo habitada hasta finales del siglo XIX. En ella hubo un monasterio, un hospital y un lazareto o leprosería: instituciones que hablan de un lugar de paso, de cultivo y también de aislamiento. De aquel mundo quedan restos visibles. Muros de casas de piedra, una capilla del siglo XVII y un muelle. No son ruinas decorativas: son la prueba física de que Cortegada fue un pueblo, no un despoblado pintoresco.

### Los doscientos once colonos

A comienzos del siglo XX la isla tenía doscientos once colonos, según la documentación que recoge la fuente principal. Y fue entonces cuando se decidió su destino. Cortegada fue expropiada por iniciativa de un empresario local, que la adquirió con un propósito muy concreto: levantar en ella una residencia de verano para la Corona. La operación se presentó como un regalo a Alfonso XIII.

La tradición local añade que fueron los vecinos de O Carril y de Vilagarcía quienes reunieron el dinero por suscripción popular para comprar la isla y ofrecérsela al rey; otras versiones sitúan el impulso decidido en el empresario. Conviene no mezclar ambas cosas. Lo que la documentación sostiene con firmeza es el resultado: la expropiación de los colonos y el ofrecimiento de la isla al monarca, con independencia de quién pusiera el dinero y con qué intención.

### El rey que vino una sola vez

Alfonso XIII visitó Cortegada una única vez, en septiembre de 1907. La visita fue un acto de cortesía y de propaganda, no el inicio de las obras. El palacio real de verano nunca llegó a construirse, y el rey acabó fijando su residencia estival en el palacio de La Magdalena, en Santander. Los vaivenes políticos de los años treinta —la caída de la monarquía y la llegada de la República— cerraron definitivamente la posibilidad.

La isla siguió por entonces un camino administrativo largo. En 1978 don Juan de Borbón la vendió a una empresa privada. Después pasó a manos públicas y en 2002 quedó integrada en el Parque Nacional Marítimo-Terrestre de las Islas Atlánticas, creado por la Ley 15/2002. El regalo a un rey terminó convertido en dominio público y en espacio protegido. Es una de las paradojas más limpias de esta ría.

### La naturaleza que volvió

Cuando los colonos se marcharon, los cultivos cesaron. Los campos dejaron de ser campos y empezaron a ser otra cosa. Sin siega, sin ganado y sin desbroce, la vegetación avanzó sobre las parcelas y los caminos, y la isla entera entró en un proceso de recolonización vegetal que hoy puede leerse como un archivo.

El detalle más interesante es el de los laureles. Los ejemplares que hoy forman la masa forestal descienden de los laureles aislados que se conservaban en los huertos, plantados por los colonos para tener hoja fresca a mano. La especie encontró en Cortegada un suelo profundo, humedad constante y aire salado, y creció hasta ocupar lo que antes era cultivo. No hubo plantación ni repoblación: hubo abandono, y el laurel hizo el resto.

### El mayor lauredal de Europa

El laurel (Laurus nobilis) forma en Cortegada una masa cerrada, densa, de copas que se tocan y filtran la luz. El propio Parque Nacional y las fuentes turísticas oficiales de Galicia lo describen como el mayor bosque de laurel que existe en Europa. El superlativo no es una licencia literaria: es la descripción que sostienen las instituciones que gestionan la isla.

Bajo el dosel el bosque tiene otra escala. Hiedra, helechos como Polypodium interjectum y Davallia canariensis, salvia de bosque y arisarum cubren el suelo y los troncos. Es un sotobosque de sombra y humedad, más atlántico que mediterráneo, que huele a hoja machacada cuando se camina despacio. En primavera el laurel florece y la isla zumba; el resto del año impone silencio.

### Cómo visitarla hoy

Cortegada no se visita por libre. El acceso está sujeto al régimen del Parque Nacional: solo con visitas guiadas organizadas, que son también las que explican la isla mientras se camina. La travesía es corta —la isla está a unos doscientos metros de la costa de Carril—, pero el horario y el aforo dependen de la autorización y de la temporada.

Dentro hay dos senderos principales y una ruta circular de unos tres kilómetros, suficiente para atravesar el lauredal, llegar a los restos de la aldea y asomarse a la orilla. Conviene llevar calzado cerrado: el suelo del bosque es irregular y permanece húmedo. Y conviene ir con la disposición de quien visita un lugar que fue habitado, no un parque temático.

Cortegada no es una isla abandonada. Es una isla que fue abandonada y volvió a crecer. Entre las piedras de las casas y las copas de los laureles hay una lección poco habitual en el turismo de islas: a veces la naturaleza no necesita que la ayuden, solo que la dejen.

*Fuentes: Wikipedia (en), «Cortegada Island»; Parque Nacional Marítimo-Terrestre de las Islas Atlánticas de Galicia, información oficial; Ley 15/2002, de 1 de julio, de creación del Parque Nacional; Turismo de Galicia, ficha oficial de la isla de Cortegada.*`
  },
  {
    id: '15',
    slug: 'sirena-salvora-leyenda-marino-o-almacen',
    cover: '/laminas/salvora-sirena_v.webp',
    category: 'Historia & Navegación',
    title: 'La sirena de Sálvora: leyenda de los Mariño e historia de O Almacén',
    excerpt: 'La estatua de la playa de O Almacén, la leyenda de Mariña y la estirpe de los Mariño, junto a la historia de la fábrica de salazón que Jerónimo de Hijosa levantó en Sálvora en 1770 y que después se convirtió en pazo.',
    readTime: '2 min de lectura',
    date: 'Otoño 2026',
    author: 'Cuaderno Atlántico',
    tags: ['Sálvora', 'Leyendas', 'Patrimonio'],
    featured: false,
    content: `En la playa de O Almacén, a un lado del pazo y frente al agua, hay una figura de piedra sentada sobre una roca. No conmemora un naufragio ni a un farero: es una sirena. La escultura, costeada por los propietarios de la isla, recuerda el origen mítico de la estirpe que durante siglos administró Sálvora.

### La piedra y la placa

Quien desembarca en el muelle de O Almacén la encuentra pronto, en la misma orilla donde se acumulan los bolos de granito. La figura mira hacia la ría, con la cola recogida, y a sus pies una placa resume la leyenda en dos frases: «La sirena de Sálvora tuvo amores con un caballero romano naufragado en la isla. Nació un niño que se llamó Mariño…». Eso es todo lo que la piedra afirma por escrito. Lo demás —los nombres, los detalles, los finales alternativos— pertenece a la tradición oral y conviene tratarlo como tal.

### Mariña, la que no hablaba

La versión más difundida sitúa a un caballero llamado Froilaz —Roldán en algunas variantes recogidas— paseando por la orilla. Allí encontró a una mujer con cola de pez, de nombre Mariña, incapaz de articular palabra. La llevó consigo, se casaron y de esa unión nació un hijo al que llamaron Mariño.

El silencio tenía causa: una espina clavada en la garganta que ningún remedio doméstico lograba vencer. La tradición recoge el ardid que lo resolvió. En la noche de San Juan, el caballero encendió una hoguera y fingió arrojar al niño a las llamas. La madre rompió a gritar; el grito desprendió la espina y le devolvió la voz. Las variantes discrepan en lo accesorio —el nombre del caballero, el motivo del naufragio—, pero coinciden en lo esencial: la palabra se recupera por el miedo a perder al hijo. Es un relato de fundación, no un cuento de hadas.

### De la leyenda al linaje

La historia de los Mariño se remonta, con documentación, a mediados del siglo XVI, cuando la Iglesia entregó la isla en aforo a Marcos Fandiño Mariño. Sus herederos la administraron bajo un régimen feudal: los pobladores entregaban al «amo» parte de las cosechas y del ganado nacido en la isla. La leyenda cumple ahí una función precisa. Una casa que hace descender su apellido de una mujer de agua y de un caballero naufragado no necesita pergaminos para justificar su preeminencia: le basta un origen imposible.

El linaje se prolongó hasta 1820, cuando Isabel de Mariño, heredera de la isla, contrajo matrimonio con Ruperto Antonio de Otero. Con ellos, la saga de los Otero pasó a ser la propietaria de Sálvora. La estatua que hoy se ve en la playa no es medieval ni forma parte del patrimonio original de la isla: la colocaron los propietarios como recordatorio del origen de la estirpe.

### O Almacén: la fábrica de 1770

El edificio que da nombre a la playa tiene un origen muy distinto. La primera construcción la levantó en 1770 el comerciante coruñés Jerónimo de Hijosa con función de fábrica de salazón. El Parque Nacional data la factoría entre 1770 y 1779 y añade un matiz que conviene respetar: para algunos autores es la primera fábrica de salazón de Galicia; para otros es coetánea de las de las demás islas, de principios del siglo XIX. El superlativo se sostiene como atribución, no como certeza.

En 1789 se autorizó una almadraba de atún con uso exclusivo de la isla y de cuatro leguas a la redonda. La concesión levantó a los marineros de la costa, que veían cerradas sus aguas de faena, y provocó pleitos. La explotación nunca llegó a instalarse. La factoría, en cambio, prosperó y atrajo población estable: las familias se agruparon en la aldea, cultivaron maíz, centeno y patatas y pescaron desde dornas sin repartir la captura con el dueño.

### Del saladero al pazo

Los propietarios acabaron instalándose en la antigua factoría y la rehabilitaron como pazo residencial. El edificio actual, conocido también como Pazo de Goyanes, conserva la planta del almacén de salazón y muestra varios escudos o piedras de armas que recuerdan a las familias propietarias. Las dos torres y las almenas se añadieron en 1960, en una reforma que buscaba dar al conjunto un aire señorial que nunca tuvo en su origen industrial. En la misma línea, la única taberna de la isla —junto a la fábrica, lugar donde llegaban las noticias de la costa— se transformó por esas fechas en la capilla de Santa Catalina, patrona de Sálvora según la tradición local. No hubo una capilla histórica consagrada a la santa: hubo un bar que cambió de uso.

### Museo, faro y régimen de parque

Hoy el pazo funciona como museo de la isla. En su interior se exponen piezas etnográficas recuperadas de la aldea y del propio edificio, junto a conchas y otros restos de la fauna del archipiélago. La protección no se limita al edificio: el archipiélago de Sálvora fue declarado bien de interés cultural en la categoría de paisaje cultural por el Decreto 49/2018, de 26 de abril.

La historia moderna explica su aspecto actual. El Estado expropió Sálvora a los Otero en 1904 por motivos de defensa y la familia la recuperó en 1958. El faro actual se inauguró en 1921, después del naufragio del Santa Isabel. Los últimos habitantes abandonaron la aldea a lo largo de los años setenta. Desde 2002 la isla forma parte del Parque Nacional Marítimo-Terrestre de las Islas Atlánticas de Galicia, y el acceso está sujeto a autorización: no se puede desembarcar ni caminar por ella sin permiso.

La sirena sigue allí, mirando a la ría que trajo navegantes, salazoneros y visitantes. Una isla que fue fábrica, pazo y parque nacional conserva en su orilla una figura de piedra que dice lo que no está en los papeles: que la memoria de un lugar también se fabrica, y que a veces dura más que sus edificios.

*Fuentes: Parque Nacional Marítimo-Terrestre de las Islas Atlánticas de Galicia, «Historia y Patrimonio de Sálvora» (illasatlanticas.gal); Turismo de Galicia, ficha «Pazo de Sálvora» (turismo.gal); Decreto 49/2018, de 26 de abril, por el que se declara bien de interés cultural el archipiélago de Sálvora con la categoría de paisaje cultural (DOG núm. 95, 21/05/2018); Wikipedia, «Isla de Sálvora», para la reforma de 1960 y la taberna convertida en capilla; placa de la escultura de la Sirena de Sálvora.*`
  },
  {
    id: '12',
    slug: 'tesoros-rande-drake-galeon-cies',
    cover: '/laminas/rande-tesoros_v.webp',
    category: 'Historia & Navegación',
    title: 'Tesoros de Rande: corsarios, Drake y el galeón perdido en las Cíes',
    excerpt: 'La tradición dice que bajo las Cíes duerme el Santo Cristo de Maracaibo, cargado de oro. Los documentos dicen otra cosa: el barco que se hundió al suroeste del archipiélago en 1702 iba casi vacío.',
    readTime: '2 min de lectura',
    date: 'Otoño 2026',
    author: 'Cuaderno Atlántico',
    tags: ['Cíes', 'Historia Marítima', 'Arqueología'],
    featured: false,
    content: `La ensenada que las Cíes abren por el norte es una de las mejores dársenas naturales del Atlántico ibérico: abrigo frente al oleaje del oeste, agua dulce en tierra y una entrada que exige buen tiempo. Quien controla esa rada controla el paso hacia la ría de Vigo. Esa geografía, más que ninguna otra razón, explica dos siglos de corsarios, escuadras y un naufragio que todavía se busca.

### La rada de los corsarios

Durante los siglos XVI y XVII el archipiélago fue base y abrigo de corsarios. No era un refugio improvisado: la rada permitía carenar cascos, hacer aguada y reparar aparejos sin exponerse a la artillería de las fortalezas de la ría. Desde allí se lanzaban golpes rápidos contra el tráfico de Vigo y se desaparecía antes de que llegara la respuesta.

Sir Francis Drake conoció esa rada y la usó. Sus expediciones contra la ría de Vigo de 1585 y 1589 están documentadas, y en ambas el navegante inglés aprovechó el abrigo de las Cíes para reparar y aprovisionarse de agua antes de atacar. La historiografía local atribuye a ese acoso corsario prolongado el abandono del monasterio de San Estevo, en el propio archipiélago: una comunidad religiosa expuesta, sin defensa posible en un mar donde mandaba quien llevara más cañones.

### 1702: la batalla de Rande

El 23 de octubre de 1702 la armada anglo-holandesa atacó en la ensenada de San Simón a la flota de Indias franco-española. La batalla de Rande —Rande es el estrecho que cierra esa ensenada— fue un combate de horas en aguas estrechas, con fuego directo y sin espacio para maniobrar. El balance documentado por Ramón Patiño en «Los Tesoros de Rande» (2014) es el que se maneja hoy: once naves españolas y diecinueve francesas hundidas según su recuento, más un galeón que el mar se tragó en las Cíes.

Ese último barco es el que alimentó tres siglos de leyenda.

### El galeón perdido: la versión de la leyenda

La tradición popular sostiene que el galeón hundido al suroeste del archipiélago era el Santo Cristo de Maracaibo, repleto de riquezas. Según el relato, las fuerzas anglo-holandesas lo capturaron tras la batalla y, al intentar arrastrarlo a mar abierto, encalló contra los arrecifes del suroeste y se hundió con su carga. De ahí nace la idea de un tesoro accesible, a pocos metros de agua, esperando a quien lo encuentre.

### Lo que dicen los documentos

La investigación documental reciente desmiente esa identificación. Ramón Patiño y Yago Abilleira, con atención recogida por ABC en 2014 y por la Revista General de Marina en diciembre de 2019, y el equipo del Proyecto Cíes dirigido por Xurxo Constela Doce, sostienen que el barco que encalló al salir de la ría el 6 de noviembre de 1702 y naufragó al suroeste de las Cíes no era el Maracaibo. Era el Nuestra Señora de los Remedios, alias San Francisco Javier: 501 toneladas, treinta cañones, construido en el País Vasco y propiedad de Pedro Méndez del Villar. Y, sobre todo, iba prácticamente vacío.

El Maracaibo, en cambio, ardió durante el combate. No hubo arrastre, ni rescate de la carga, ni galeón rico esperando en el fondo.

La Revista General de Marina añade la clave de por qué la leyenda se impuso: los ingleses difundieron que el barco perdido era el más rico de la flota para justificar el escaso botín obtenido. La mentira resultaba útil. Después, los buscadores de tesoros agrandaron la cifra, porque un tesoro fabuloso vende mejor que un pecio vacío.

### Los bajos que explican el naufragio

El suroeste de las Cíes no es un fondo inocente. La guía de arqueología subacuática del Parque Nacional, publicada en illasatlanticas.gal, documenta los bajos que jalonan el paso: el Bajo Carrumeiro, los Bajos Forcados, las Piedras Cantareira y el islote Boeiro. Son nombres que aparecen una y otra vez en los expedientes de naufragio de la zona. Un barco que sale de la ría con el casco tocado, o al que arrastra la mar de fondo contra esa costa, no necesita mala suerte: tiene el mapa en contra.

### Los buscadores y el Proyecto Cíes

Durante tres siglos se buscó el galeón. Hubo expediciones, permisos, detectores y promesas de sociedades extranjeras. Ninguna encontró nada que sostuviera la leyenda.

En 2019 el Proyecto Cíes, con participación de la Armada y de investigadores civiles y dirección de Xurxo Constela Doce, peinó aguas profundas al suroeste del archipiélago con medios técnicos que los buscadores del pasado no tuvieron. Tampoco lo localizó. El pecio sigue sin aparecer.

### Lo que queda

El valor de esta historia no está en el oro. Está en el método: una tradición repetida durante generaciones, un documento que la corrige y un archivo que dice la verdad sobre un barco vacío. El galeón de las Cíes es, por ahora, un yacimiento sin localizar y una lección de rigor. Mientras no aparezca, lo único que puede afirmarse con fuente es lo que los papeles dicen: que el mar se tragó un navío de 501 toneladas, treinta cañones y casi nada dentro; y que la riqueza que le atribuyeron sirvió, primero, para tapar un botín pobre y, después, para vender leyendas.

*Fuentes: Ramón Patiño, «Los Tesoros de Rande» (2014); Ramón Patiño y Yago Abilleira, investigación recogida por ABC (2014); Revista General de Marina, diciembre de 2019; Proyecto Cíes (2019), dirección de Xurxo Constela Doce, Armada y equipo civil; guía de arqueología subacuática del Parque Nacional das Illas Atlánticas (illasatlanticas.gal); historiografía local sobre el monasterio de San Estevo.*`
  },
  {
    id: '13',
    slug: 'buraco-do-inferno-furna-ons',
    cover: '/laminas/ons-buraco-inferno_v.webp',
    category: 'Oceanografía & Ría',
    title: 'O Buraco do Inferno: la furna que ruge en la costa de Ons',
    excerpt: 'La costa occidental de Ons es un frente de acantilados batidos donde el mar ha excavado decenas de furnas. Historia natural del Buraco do Inferno y las leyendas que la tradición oral le cosió encima: las ánimas del Purgatorio, la Santa Compaña, los trasnos de la Cova dos Mouros y el túnel imposible hacia O Cairo.',
    readTime: '2 min de lectura',
    date: 'Otoño 2026',
    author: 'Cuaderno Atlántico',
    tags: ['Ons', 'Geología', 'Leyendas'],
    featured: false,
    content: `Ons tiene dos costas que parecen de islas distintas. La oriental, al abrigo de la ría, se abre en playas de arena fina —Melide, Dornas, Area dos Cans, Canexol, Pereiró— y en un pueblo habitado todo el año. La occidental es la cara que la isla enseña al Atlántico abierto: un frente de acantilados de granito, batido por el oleaje, surcado por ensenadas de cantos y por cuevas marinas. Allí, en esa franja donde el mapa se vuelve vertical, está O Buraco do Inferno.

### I. La costa que no perdona

Ons es la única isla habitada del Parque Nacional Marítimo-Terrestre das Illas Atlánticas de Galicia. No es un jardín intocado: aquí varias generaciones han vivido del mar y de la tierra. Pero la habitación se concentra al este, al abrigo de la ría; al oeste no hay abrigo posible. La guía geológica oficial del Parque describe esa vertiente como un litoral acantilado y expuesto; la divulgación científica gallega ha llegado a catalogar hasta treinta y tres furnas en la isla. El faro de Cucorno es la referencia de quien mira desde el agua: a partir de ahí empieza la costa seria.

### II. Qué es una furna y por qué brama

Una furna es una cueva marina: el resultado de la erosión que el oleaje ejerce sobre la roca. En el granito esa erosión no avanza por igual. Las fracturas, los diques y las zonas de grano más débil se deshacen antes que el resto, y el mar aprovecha esas debilidades para excavar galerías, ensanchar salas y, con el tiempo, hacer caer los techos. El Buraco do Inferno es el caso extremo de ese proceso: una sima de unos cuarenta y tres metros de profundidad, de planta más o menos cruciforme, que alcanza el mar a través de un pozo y una galería. No es una grieta: es un conducto vertical que conecta la superficie de la isla con el agua.

El bramido tiene una explicación física sencilla. Cuando una ola entra en una cavidad semicerrada, comprime el aire que queda dentro; al retirarse, ese aire se expande y sale por bocas y rendijas con un golpe sordo, entre el bufido y el rugido. Cuanto más cerrada es la cueva, más grave resulta el sonido. En 2003, un colapso en la boca de la galería acumuló grandes bloques y estrechó la entrada; desde entonces el agua penetra con más dificultad y el ruido ha cambiado. Lo que no ha cambiado es la geometría del lugar: el mirador superior, protegido por una barandilla, se asoma a un vacío que no se ve terminar. En el borde, una cruz blanca recuerda a un joven guardiamarina desaparecido en 1963.

### III. Las ánimas del Purgatorio

Aquí empieza la leyenda, y conviene decirlo desde el principio: es tradición oral, no crónica. Los relatos recogidos entre la gente de la isla cuentan que, en los días de temporal, del fondo del pozo subían gritos y lamentos. Se decía que eran las almas del Purgatorio, que se quejaban antes de ser llevadas. En esa misma tradición, el Buraco es una de las puertas por las que se dice que pasa la Santa Compaña, la procesión de ánimas que recorre los caminos de noche; una de las leyendas más extendidas de Galicia. Otra versión de la historia pone en el fondo una puerta custodiada por un toro de cuernos de oro.

La explicación naturalista que se ha propuesto es menos literaria y no desmiente del todo a la anterior: aquellos lamentos podían ser el canto del arao común, un ave marina que anidaba en estos acantilados y cuya voz se parece bastante a un gemido humano. El relato oficial del Parque añade un dato que cierra el círculo: cuando estas aves desaparecieron de la isla, en los años ochenta, el agujero dejó de gritar. Una sola ave, amplificada por una chimenea de granito, bastaba para poblar un agujero de fantasmas.

### IV. La Cova dos Mouros y los trasnos

Al otro lado de la isla, sobre un espolón de la costa oriental, se alza el castro de Castelo dos Mouros, un recinto fortificado de la Edad del Hierro documentado por la investigación arqueológica del Parque. Cerca de allí la tradición sitúa la Cova dos Mouros, y con ella una de esas historias que nunca se cuentan sin bajar la voz: la cueva guardaría riquezas antiguas, y los trasnos —los duendes del imaginario gallego— velarían por ellas apagando las luces de quien se atreviera a excavar. De ese tesoro no hay más acta que la palabra de quienes lo cuentan; lo que sí existe, y está estudiado, es el castro, con su muralla sobre la ensenada.

### V. El pasadizo de O Cairo

La leyenda más ambiciosa asegura que la Cova dos Mouros está unida por un túnel subterráneo con el islote de O Cairo y que ese túnel pasa bajo el mar. No hay constancia de semejante conducto, y la geología no lo sostiene: bajo el agua no hay camino practicable, sino roca y sedimento. La imagen, sin embargo, es poderosa, y el motivo del pasadizo secreto se repite en la tradición oral de todo el litoral gallego. Quizá porque una isla se piensa siempre desde dentro: lo que en la superficie son dos peñascos separados, en el relato son dos puertas de la misma casa.

### VI. Mirar sin caer

La costa occidental no es una playa y no se recorre como tal. Se llega por los senderos del Parque, se camina por lo marcado y no se baja al borde del acantilado por buena que sea la luz. La boca del Buraco está protegida por una barandilla, y el descenso al interior está cerrado desde el colapso de 2003; no hay razón para buscar una excepción. Conviene mirar el parte meteorológico, llevar agua y calzado firme, y aceptar que el Atlántico de esta cara no negocia.

El Buraco ya no ruge como antes, porque el derrumbe le tapó parte de la garganta. Pero el lugar sigue enseñando lo mismo: que el mar trabaja despacio, sin testigos, y que hay sitios donde el único gesto sensato es mirar desde la orilla.

*Fuentes: Parque Nacional Marítimo-Terrestre das Illas Atlánticas de Galicia, ficha «Buraco do Inferno» y Guía geológica del Parque (R. Rodríguez Fernández), illasatlanticas.gal; Turismo de Galicia, «O Buraco do Inferno (The Hell Hole)», blog oficial, 2021; GCiencia, «Buraco do Inferno, a forza do mar en estado puro», 2023; Incipit-CSIC, «Ons: una isla habitada»; tradición oral de la isla de Ons, recogida en las fuentes citadas.*`
  },
  {
    id: '10',
    slug: 'laxe-do-crego-sepultura-roca-ons',
    cover: '/laminas/crego_v.webp',
    category: 'Historia & Navegación',
    title: 'A Laxe do Crego: la sepultura tallada en la roca de Ons',
    excerpt: 'En la costa oriental de Ons, a poco más de cien metros de Area dos Cans, una roca guarda una sepultura antropomorfa de época altomedieval. La hipótesis del eremita, la leyenda del monasterio engullido por el mar y la lauda que se salvó de una lareira.',
    readTime: '2 min de lectura',
    date: 'Otoño 2026',
    author: 'Cuaderno Atlántico',
    tags: ['Ons', 'Arqueología', 'Leyendas'],
    featured: false,
    content: `En la costa oriental de la isla de Ons, a poco más de cien metros del arenal de Area dos Cans, emerge una roca de granito que la bajamar deja al descubierto. Sobre ella, alguien excavó hace siglos una sepultura: no un sarcófago exento, sino un hueco de planta antropomorfa abierto en el propio cantero, con paredes verticales y cabecera marcada, donde el mar rompe y se retira cada día. Se la conoce como **A Laxe do Crego** y también como **Laxe do Abade**. Por qué está ahí —y no en el suelo sagrado de una iglesia— sigue abierto.

### Una tumba en la roca, frente a la rompiente

La Guía geológica del Parque Nacional de las Islas Atlánticas de Galicia, en su itinerario de Ons, recoge el conjunto con esos dos nombres y lo describe como una sepultura excavada en la roca granítica. Añade una observación que vale más como pregunta: posiblemente se trata de la tumba de un eremita. La localización la confirma Turismo Rías Baixas, que sitúa la sepultura antropomorfa de A Laxe do Crego en Area dos Cans y advierte de que el acceso depende de la marea. La naviera Mar de Ons la llama «uno de los restos antiguos de Galicia más peculiares» y uno de los rincones menos conocidos de la isla.

El emplazamiento no es cómodo. La roca queda al descubierto en la bajamar y el agua vuelve a visitarla cuando la marea sube; se llega con la tabla de mareas en la cabeza y el tiempo contado. Esa incomodidad es el centro del enigma: una tumba cristiana busca la proximidad de una iglesia, el amparo de una comunidad que rece por el difunto. Aquí no hay nave, ni muro, ni suelo consagrado. Solo granito, marea y una silueta humana vacía.

### Quién era «o Crego»

El nombre popular contiene una pista y, a la vez, una trampa. *Crego* designa al sacerdote en gallego; *abade*, al abad. Los dos apelativos conviven en la tradición y en la toponimia, y ninguno es un documento: son nombres que la gente ha ido dando a la piedra a lo largo de generaciones, sin que sepamos cuándo se fijaron ni quién los puso.

La hipótesis del eremita es la más sugerente. La costa gallega conserva buen número de sepulturas antropomorfas talladas en granito, vinculadas a comunidades altomedievales sin rastro documental. El retiro eremítico buscó siempre lugares apartados, fuera del pulso de la parroquia. La Guía geológica no afirma que A Laxe do Crego sea la tumba de un anacoreta; dice que posiblemente lo sea. La diferencia entre ambas cosas es la que separa el rigor de la fábula.

### El monasterio que se llevó el mar

La tradición oral de la isla, recogida por escrito por Álvaro das Casas en 1934, ofrece otra lectura. Según ese relato, la costa avanzaba antiguamente más mar adentro y en el terreno que hoy cubre el agua existió un monasterio. El mar acabó por engullirlo, y la roca con su sepultura sería el último testigo de aquel conjunto perdido.

Se cuenta como leyenda, y como leyenda debe leerse: no consta documento, ni ruina sumergida identificada, ni excavación que sostenga la existencia de un cenobio en este punto. Lo que sí ha hecho el mar, a lo largo de milenios, es reordenar la línea de costa de las rías, ganar terreno en unos tramos y retirarse en otros. La geología explica el escenario; no confirma el relato. Aun así, la imagen de una comunidad monástica borrada por el Atlántico explica por qué generaciones de isleños han mirado esa piedra con respeto.

### La lauda que estuvo a punto de ser lareira

La memoria local añade un episodio que tiene algo de novela de naufragio. Cuenta que, décadas atrás, apareció en la arena de Area dos Cans una lauda de granito labrada con cubierta en pendiente: la tapa que habría cerrado una sepultura como aquella. La pieza estuvo a punto de terminar como piedra de lareira en una vivienda de la isla. Se evitó. Al medirla, encajaba con las dimensiones de A Laxe do Crego; hoy se conserva, según ese mismo relato, en el Centro de Visitantes de Ons, fuera ya del alcance de las mareas.

El episodio dice mucho: piedras que se salvan por un gesto, por alguien que se dio cuenta a tiempo de lo que tenía entre las manos.

### Una isla de 414 hectáreas

Ons es la única isla habitada del Parque Nacional: unas 414 hectáreas y seis kilómetros de largo, con el faro en lo alto de Cucorno, a 128 metros sobre el mar. Sus playas orientales —Melide, Dornas, Area dos Cans, Canexol, Pereiró— miran a la ría; los barrios de Caño, Curro, Canexol, Pereiró, Cucorno y Centulo reparten las casas entre el puerto y las laderas. A Laxe do Crego está en esa fachada oriental, la que recibe primero la luz y también el golpe del mar.

### Mirar sin tocar

A la sepultura se llega a pie, con la marea en su hora, y conviene ir con calzado que agarre la roca. El conjunto está protegido por las normas del Parque Nacional: no se pica, no se mueve piedra, no se retira arena ni se deja nada sobre la tumba. Si el agua ya cubre la roca, la visita ha terminado: volverá a descubrirse en la siguiente bajamar, como lleva haciéndolo siglos.

La sepultura está vacía y no hay inscripción que nombre a su ocupante. Todo lo que sabemos de él —crego o abade, eremita o monje de un monasterio que el mar se llevó— procede de un nombre popular y de una tradición contada al oído. La piedra, en cambio, no discute: sigue ahí, con su hueco de cuerpo humano, esperando la marea.

*Fuentes: Guía geológica del Parque Nacional de las Islas Atlánticas de Galicia (Xunta de Galicia, itinerario de Ons); Turismo Rías Baixas (Diputación de Pontevedra); Naviera Mar de Ons; tradición oral de Ons recogida por Álvaro das Casas (1934).*`
  },
  {
    id: '11',
    slug: 'julio-cesar-cies-leyenda-herminios',
    cover: '/laminas/cies-julio-cesar_v.webp',
    category: 'Historia & Navegación',
    title: 'Julio César en las Cíes: la leyenda de los herminios y el cerco por hambre',
    excerpt: 'La tradición sitúa a Julio César en las Cíes persiguiendo a los herminios y rindiéndolos por hambre. Dión Casio cuenta parte del episodio; el resto lo añadió la erudición romántica del siglo XIX.',
    readTime: '2 min de lectura',
    date: 'Otoño 2026',
    author: 'Cuaderno Atlántico',
    tags: ['Cíes', 'Historia', 'Leyendas'],
    featured: false,
    content: `Hay una escena que se repite en las guías y en las sobremesas del puerto: Julio César desembarca en las Cíes al frente de dos legiones, fracasa en San Martiño bajo una lluvia de piedras y flechas, rodea el archipiélago y rinde a los herminios por hambre. La escena tiene fuerza. También tiene bastante de literatura.

Conviene separar lo que cuenta la fuente antigua de lo que añadió la erudición local. Entre uno y otro hay un siglo XIX y una isla sin nombre.

### La fuente antigua: dos capítulos y ninguna isla con nombre

Dión Casio, senador romano de origen bitinio que escribió en griego su Historia Romana, dedica al episodio apenas dos capítulos del libro XXXVII. César, que había sido cuestor en Gades y era por entonces propretor de la Hispania Ulterior, ordenó a los habitantes del monte Herminio —la actual Serra da Estrela— que bajaran al llano. El pretexto era impedir sus correrías; el cálculo, según el historiador, era otro: sabía que no obedecerían y tendría motivo de guerra. Los venció, y cuando huyeron los persiguió hasta el océano.

Al llegar al agua, los fugitivos abandonaron el continente y se pasaron a una isla. César se quedó en tierra, sin barcos suficientes; improvisó balsas y envió con ellas a parte de sus tropas. El destacamento desembarcó en un rompeolas cercano, convencido de que podría cruzar a pie, pero la marea volvió y lo dejó aislado. Casi todos murieron combatiendo; solo Publio Escevio, sin escudo y con muchas heridas, se echó al agua y se salvó nadando.

Después de aquel desastre, César mandó traer naves de Gades, cruzó con el ejército completo y doblegó a los isleños sin combatir, acosados por el hambre. De allí navegó a Brigantium, en la Callaecia, y sometió a sus habitantes, que nunca habían visto una flota. El hambre, por tanto, sí está en el texto. Lo que no está es el nombre de la isla.

### La leyenda: Baiona, San Martiño, Rodas

La versión que se cuenta en Vigo añade puerto, playas y barcos de guerra. César zarpa de Erizana —la actual Baiona—, desembarca primero en San Martiño y es rechazado desde los acantilados; rodea el archipiélago, toma tierra en Rodas y establece un bloqueo con trirremes hasta que el hambre rinde a la tribu. Son detalles verosímiles: San Martiño mira al océano abierto por el sur, y Rodas une la isla del Norte con la del Medio por un cordón de arena. Pero ninguno figura en Dión Casio, que no nombra la isla, no menciona Erizana y habla de balsas y de naves traídas de Gades, no de una escuadra de trirremes.

La identificación con las Cíes es una hipótesis razonable y nunca demostrada: encaja por situación y abrigo, pero otras islas atlánticas podrían sostener el mismo relato.

### El relato que fijó la leyenda

Teodosio Vesteiro Torres nació en Vigo en 1847 y murió en Madrid en 1876, con veintinueve años. Fue periodista, profesor de música y escritor; sus Monografías de Vigo aparecieron póstumamente en 1878 e incluyen el relato «Los Herminios». La erudición romántica del XIX mezclaba el dato clásico, la tradición oral y la imaginación patriótica.

El propio Concello lo asume sin complejos: «no se trata de dilucidar qué es realidad y qué ficción… son parte irrenunciable de su corpus patrimonial, como bienes inmateriales». La candidatura de las Cíes a Patrimonio Mundial es más cauta: «diversas fuentes han llegado a sostener» la presencia de César durante su persecución a los herminios, un episodio anecdótico y no confirmado.

### Qué se puede afirmar y qué no

Lo que sostiene la fuente antigua: la campaña de César en la Hispania Ulterior en torno al 61-60 a.C. contra los pueblos del monte Herminio; la huida de estos hasta el océano y su refugio en una isla sin nombre; el primer desembarco fallido por la marea y la muerte de casi todos los soldados; la salvación de Publio Escevio; la rendición por hambre tras llevar barcos desde Gades; la posterior marcha a Brigantium.

Lo que no consta en ella: que se tratara de las Cíes; el embarque en Erizana; el asalto de San Martiño con piedras y flechas; el desembarco en Rodas y el bloqueo con trirremes; las dos legiones.

La arqueología tampoco cierra la pregunta. En 2024, una excavación en Casa Viladomar, junto al antiguo convento de la isla Norte, halló un asentamiento romano del cambio de era; los responsables advirtieron que aún no podía vincularse a César. El hallazgo prueba que las islas estaban habitadas e insertas en las rutas romanas, no la visita del general.

### El escenario, hoy

Las Cíes son tres islas: la del Norte o del Faro, con Monteagudo; la del Medio o do Faro; y la del Sur, San Martiño. La playa de Rodas, ese cordón de arena que une las dos primeras, es hoy la postal del archipiélago y el escenario del desembarco legendario. El conjunto es Parque Nacional y el acceso está regulado: se llega en barco, con autorización y aforo limitado en temporada alta.

Quien suba a Monteagudo y mire al sur verá el canal, San Martiño y, detrás, la ría. No encontrará trirremes varados ni campamentos romanos. Encontrará el escenario exacto de una historia que se contó primero en griego, luego en la prosa romántica de un erudito vigués y hoy en las guías de viaje. Que sea leyenda no la hace menos valiosa: la hace más interesante, porque obliga a distinguir lo que se sabe de lo que se quiere recordar.

*Fuentes: Dión Casio, «Historia Romana», XXXVII, 52-53; Teodosio Vesteiro Torres, «Monografías de Vigo» (1878), «Los Herminios»; Concello de Vigo, ciclo «El enorme patrimonio cultural de las Cíes»; candidatura de las Cíes a Patrimonio Mundial (ciespatrimonio.vigo.org); Parque Nacional das Illas Atlánticas; Vigoé (octubre de 2024); Real Academia de la Historia, ficha de Teodosio Vesteiro Torres.*`
  },
  {
    id: '1',
    slug: 'salvora-tragedia-santa-isabel-parque-nacional',
    cover: '/laminas/salvora-santa-isabel_v.webp',
    category: 'Historia & Navegación',
    title: 'Sálvora y el vapor Santa Isabel: memoria náutica y soberanía del Parque Nacional',
    excerpt: 'Análisis histórico de la noche del 2 de enero de 1921 en la boca de la Ría de Arousa. El rescate de las heroínas de Sálvora, la hidrografía de los bajos de Pegar y el régimen actual de conservación del archipiélago.',
    readTime: '2 min de lectura',
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
    cover: '/laminas/cartografia-linea-recta_v.webp',
    category: 'Cartografía & Territorio',
    title: 'La ilusión de la línea recta: cartografía náutica, distancias reales y el horizonte de Sálvora',
    excerpt: 'Por qué las plataformas de reservas confunden la ría con un mapa llano. La trampa euclidiana entre el Barbanza y O Salnés: 80 km de carretera real frente a la derrota marítima de Aguiño a Sálvora.',
    readTime: '2 min de lectura',
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
    cover: '/laminas/percebe-bajos_v.webp',
    category: 'Tratado de Producto & Lonja',
    title: 'El percebe de los bajos de Aguiño: hidrodinámica de la rompiente y tratado de cocción',
    excerpt: 'Diferenciación morfológica del pollicipes pollicipes extraído en roca batida frente al percebe de sombra. Fisiología, dinámica de mareas vivas y la regla exacta de salinidad y ebullición según la tradición costera.',
    readTime: '1 min de lectura',
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
    cover: '/laminas/bateas-ciclo-mejillon_v.webp',
    category: 'Oceanografía & Ría',
    title: 'La arquitectura flotante de la Ría de Arousa: el afloramiento costero y el ciclo del mejillón',
    excerpt: 'Por qué la Ría de Arousa es el ecosistema marino de mayor productividad de Europa. El fenómeno físico del afloramiento (upwelling), las vigas de madera de eucalipto curadas en salmuera y el ciclo biológico del mejillón.',
    readTime: '4 min de lectura',
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
    cover: '/laminas/falacia-mapa-tiempo_v.webp',
    title: 'La falacia del mapa del tiempo: por qué los modelos neuronales de 1 km dan la razón al marinero de Aguiño',
    category: 'Oceanografía & Ría',
    readTime: '4 min de lectura',
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
    cover: '/laminas/guia-aguino_v.webp',
    category: 'Guías & Entorno',
    title: 'Guía de Aguiño y el Parque Nacional de las Islas Atlánticas: mar, granito y memoria',
    excerpt: 'Rutas marítimas hacia la Isla de Sálvora, calas recogidas de aguas serenas y la cultura marinera en la bocana de la Ría de Arousa.',
    readTime: '2 min de lectura',
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

La despensa marina de Aguiño no admite intermediarios: el percebe de las rompientes, extraído en las piedras más batidas por los percebeiros de la lonja local, y el marisco de proximidad —pulpo de roca, nécoras, almejas y el mejillón de batea—, directos del barco a la mesa.

Dónde probarlos, sitio a sitio y con reseñas verificadas: la guía Dónde comer en Aguiño (/gastronomia), a un paso del ático.

**Web oficial del Parque Nacional Marítimo-Terrestre das Illas Atlánticas de Galicia:** [illasatlanticas.gal · Visita Sálvora](https://illasatlanticas.gal/es/visita-el-parque/visita-salvora) — autorizaciones, navieras y normas de visita, siempre actualizadas.

**Para seguir leyendo:** [Comer y Viajar — Aguiño y el secreto de O Carreiro](https://www.comeryviajar.com/2026/03/aguino-y-el-secreto-de-o-carreiro.html), el paseo de O Carreiro contado por un blog de viajes y gastronomía de Galicia.`
  },
  {
    id: '7',
    slug: 'casa-lee-el-mar-ingenieria-interna-alojamiento-salvora',
    cover: '/laminas/casa-lee-mar_v.webp',
    category: 'El Oficio & la Casa',
    title: 'La casa que lee el mar: ingeniería interna de un alojamiento frente a Sálvora',
    excerpt: 'Qué sostiene una estancia frente a la ría: motor de reservas, guardianes automáticos, un puente de mando meteorológico y un agente de a bordo. La capa invisible de un alojamiento independiente.',
    readTime: '3 min de lectura',
    date: 'Otoño 2026',
    author: 'Cuaderno Atlántico',
    tags: ['Digital', 'Oficio', 'Puente de Mando', 'Aguiño'],
    featured: true,
    content: `Un huésped llega al atardecer, sube en el ascensor y abre la terraza. Enfrente, Sálvora y la bocana de la ría. Lo que no ve —porque no debe verlo— es la capa de ingeniería que sostiene esa estancia: sistemas de reserva, guardianes automáticos, un puente de mando meteorológico y un agente de a bordo que trabaja en silencio.

### I. La capa invisible de la reserva

Detrás de cada reserva opera un motor profesional de alojamiento (Beds24) conectado a un sistema de precios dinámicos (PriceLabs) que ajusta la tarifa a la demanda real de la ría, con suelo, base y techo definidos por estación. La estancia mínima sigue un calendario estacional firmado: dos noches en invierno, tres en temporada media, cuatro en junio y septiembre, cinco en julio y hasta siete en agosto, con reglas propias para puentes, Navidad y Semana Santa.

La reserva directa se paga con tarjeta (Stripe) o PayPal: una señal del 30 % y el resto antes de la llegada. El registro de huéspedes es digital (Partee) y genera los partes oficiales obligatorios para las fuerzas de seguridad. Cada noche de ocupación queda registrada conforme a la normativa de viviendas de uso turístico de Galicia.

### II. El Puente de Mando: la casa que lee el mar

En Aguiño el tiempo decide el día: si salen los barcos a Sálvora, si trabaja la flota del marisqueo, si se puede pasear la costa. Por eso el alojamiento publica su propio [puente de mando](https://illasatlanticasatico.es/puente), abierto y gratuito: meteorología local, mareas y avisos oficiales (AEMET y Google Weather) en tiempo real. Lo consultan los huéspedes y también los vecinos.

### III. Los guardianes silenciosos

El sistema se revisa solo para que el anfitrión pueda dedicarse a los huéspedes: un vigía comprueba el calendario tres veces al día, un guardián verifica la estancia mínima cada seis horas frente a cualquier sincronización externa, y el correo se recoge cada diez minutos. Cada mañana, un parte resume el estado de la casa: reservas, precios y tareas.

### IV. La escritura del cuaderno

La bitácora de la web se escribe con una regla propia: ningún dato sin fuente, y antes una ausencia que una imprecisión. Los artículos sobre la ría, Sálvora o el percebe citan fuentes primarias —de la normativa oficial al conocimiento de la lonja— y se publican en tres idiomas: español, inglés y gallego.

### V. Un agente de a bordo

La pieza más nueva del sistema es un agente de inteligencia artificial, Hermes, integrado en la operación diaria: redacta y envía las colaboraciones con instituciones y prensa local, audita las facturas de los servicios, vigila la normativa y prepara los informes de la casa. Nada se ejecuta sin la revisión del anfitrión: el agente hace, la persona manda.

### VI. La arquitectura, pieza a pieza

El sistema no cabe en una sola máquina. El agente y los servicios internos —la puerta de entrada, los vigilantes programados, el cerebro del [agente de a bordo](https://nia.illasatlanticasatico.es/)— corren en un servidor propio de Contabo, la firma alemana de alojamiento. La web pública se sirve desde Hostinger, con despliegue automático desde el [repositorio del código en GitHub](https://github.com/fmartinez31416/illas-atlanticas-web): cada cambio pasa antes por una versión previa y solo sube a producción tras la revisión del anfitrión.

Sobre esa base se apilan las piezas: Beds24 como motor de reservas; PriceLabs para el precio dinámico, con suelo, base y techo; Partee para el registro legal de huéspedes; Stripe y PayPal para el cobro; un bot propio en Telegram que informa al anfitrión; y una analítica privada, sin rastreadores de terceros. La meteorología del Puente cruza tres fuentes —AEMET, Google Weather y Open-Meteo— y el agente de a bordo conversa con los huéspedes mediante un modelo de lenguaje servido a través de una pasarela propia, con OpenRouter como respaldo multimodal.

Desde la terraza no se ve nada de esto. Esa es la idea.

### Lo que el huésped ve

Al final, el huésped solo ve la terraza, el mar y Sálvora al fondo. Que no vea el resto es la señal de que el sistema funciona. El mar se lee; la casa lo traduce.`
  },
  {
    id: '8',
    slug: 'faros-boca-ria-salvora-corrubedo-ons',
    cover: '/laminas/faros-boca-ria_v.webp',
    category: 'Historia & Navegación',
    title: 'Los faros de la boca de la ría: Sálvora, Corrubedo y Ons, la señal que ordena el mar',
    excerpt: 'Tres luces guardan la entrada de la Ría de Arousa: su historia, sus firmas de destellos y desde dónde se ven —dos desde la terraza de Aguiño, tres desde A Pedra da Ra.',
    readTime: '4 min de lectura',
    date: 'Otoño 2026',
    author: 'Cuaderno Atlántico',
    tags: ['Faros', 'Navegación', 'Sálvora', 'Aguiño'],
    featured: false,
    content: `Quien mira de noche hacia la bocana de la Ría de Arousa desde Aguiño ve luces que parpadean con ritmos distintos. No parpadean por azar: cada una es una firma, un patrón de destellos pensado para que el navegante identifique de qué faro se trata sin ver la costa. Son los centinelas de la entrada de la ría —Sálvora, Corrubedo y Ons—, cada uno con su historia, su altura y su manera de hablar en la oscuridad. Desde la terraza de la casa se ven dos; desde el mirador de A Pedra da Ra, los tres. Y esa diferencia también es parte de su historia.

### Sálvora: el centinela que nació de una tragedia

El primer faro de Sálvora se levantó a mediados del siglo XIX, pero su posición y su potencia resultaron insuficientes para una de las bocanas más traicioneras del Atlántico gallego. La noche del 2 de enero de 1921, con niebla cerrada y mar de fondo, el vapor Santa Isabel se partió contra los bajos de Pegar con más de doscientas víctimas: el desastre que esta casa ha contado con detalle en su bitácora.

La respuesta llegó el mismo año: el faro actual, en Punta Besugueiros, inaugurado en 1921. Torre octogonal blanca con una franja roja, elevada sobre el granito de la isla. Su historia posterior no es menos curiosa: durante la Segunda Guerra Mundial sirvió como observatorio de tráfico marítimo de la Armada, y hubo que volar toneladas de roca del sector noroeste porque estorbaban al haz de luz. Habitado por fareros durante décadas, hoy funciona automatizado con energía solar, bajo la Autoridad Portuaria de Vilagarcía. Desde la terraza de esta casa, su luz es la primera referencia nocturna de la ría.

### Corrubedo: el faro que fue una maravilla universal

El faro de Corrubedo se encendió el 20 de febrero de 1854, obra del ingeniero Celedonio de Uribe, en el punto más occidental de la península del Barbanza. Su edificio semicircular de sillería, con la torre en el centro, fue lo bastante notable para que en 1867 se exhibiera como una de las maravillas del mundo en la Exposición Universal de París, inaugurada por Napoleón III.

Su firma luminosa es de las más elegantes del litoral: dos destellos y tres destellos alternados, en blanco y rojo, cada veinte segundos. El sector rojo no es decorativo: señala el cuadrante de peligro, el que cubre las agujas y los bajos de roca que hicieron de este cabo un cementerio de naves. A su lado queda la torre de la sirena de niebla, hoy en desuso: durante un siglo, cuando la niebla apagaba la luz, el faro gritaba. Desde la terraza su luz no se alcanza: queda detrás del Barbanza. Hay que subir al mirador de A Pedra da Ra, en lo alto del pueblo, para verla asomar por encima de la península.

### Ons: la luz en el punto más alto

Al sur de la bocana, el faro de la isla de Ons se encendió por primera vez el 13 de abril de 1865. Su torre mide solo 12 metros —la menor de los tres—, pero está plantada en el punto más alto de la isla: el plano focal queda a unos 127 metros sobre el mar. Resultado: un alcance que ronda las 25 millas náuticas, uno de los más altos de los faros gallegos. Desde Bueu hasta la entrada de la ría, su luz blanca barre el horizonte como un reloj.

### Cómo se lee un faro

Los faros no dicen «aquí estoy» una sola vez por noche: repiten su patrón sin descanso, y ese patrón es su identidad. Un faro con destellos en grupos (como el 2+3 de Corrubedo), otro de luz blanca de barrido (como Ons visto desde lejos) y otro con su cadencia propia (Sálvora) permiten a un marinero saber en qué punto de la costa está sin GPS, solo contando segundos. Los sectores de color —el rojo de Corrubedo— marcan zonas prohibidas. Y cuando la niebla mata la luz, históricamente entraban las sirenas: la de Corrubedo sigue en pie como testigo mudo de aquella época.

En el Puente de esta web, la carta náutica de la ría reproduce estas firmas: cada faro con su cadencia real de destellos, para que se pueda contrastar lo que se lee con lo que se ve desde la costa.

### Verlas desde Aguiño

No hace falta barco: en una noche despejada, desde la terraza de la casa se distinguen dos luces —Sálvora al frente y, hacia el sur, Ons—. Para ver la tercera hay que subir al mirador de A Pedra da Ra, en lo alto del pueblo: desde allí, Corrubedo asoma por encima del Barbanza y se ven los tres faros de la bocana a la vez.

El mejor momento es la primera hora tras la puesta de sol, cuando el cielo aún conserva luz y las linternas ya han encendido. Un té en la terraza y los faros contando sus destellos: la manera más barata y más antigua de entender este mar.`,
  },
  {
    id: '9',
    slug: 'indice-atlantico-como-puntuamos-gastronomia-barbanza',
    cover: '/laminas/indice-atlantico_v.webp',
    category: 'El Oficio & la Casa',
    title: 'El Índice Atlántico: cómo puntuamos la gastronomía de la ría',
    excerpt: 'La guía gastronómica de la casa no ordena por estrellas: ordena por un modelo estadístico que normaliza escalas, pondera la fiabilidad de cada fuente y encoge las muestras pequeñas. Seis pasos, publicados en abierto.',
    readTime: '4 min de lectura',
    date: 'Octubre 2026',
    author: 'Cuaderno Atlántico',
    tags: ['Gastronomía', 'Índice Atlántico', 'Datos reales'],
    featured: false,
    content: `En Aguiño no hace falta crítico gastronómico para saber dónde se come bien: hace falta el mismo pueblo. Pero un huésped que llega por primera vez no tiene el pueblo al lado — tiene Google. Y Google es un problema: una media de estrellas no es una medida, es el resultado de un proceso con sesgos, volúmenes desiguales y escalas incomparables. Un local reabierto con cuatro reseñas de cinco estrellas no es mejor que una marisquería con novecientas de cuatro y media. La estadística, sin embargo, puede separarlos con justicia. Eso es el Índice Atlántico.\n\n### El problema, con nombres\n\nO Furón Brunch, el histórico del pulpo, reabrió este año bajo nuevos dueños. Cuatro reseñas, tres de ellas excelentes. A Bodega acumula 1.364 en Google. Una media simple colocaría al recién llegado por encima del consolidado solo por tener pocas voces. El índice existe para que eso no ocurra: con cuatro reseñas, la incertidumbre es enorme, y el número debe decirlo.\n\n### La cadena de cálculo, paso a paso\n\nToda la puntuación se construye en seis pasos, y cada paso queda publicado en la ficha de cada local:\n\n1. **Normalización.** Google y TripAdvisor puntúan sobre 5; TheFork sobre 10. Todo se lleva a una escala común de 0 a 100. Un 9,3 en TheFork y un 4,65 en Google son exactamente lo mismo: 93,0. Solo entonces se comparan.\n\n2. **Muestra efectiva.** No todas las reseñas pesan igual. Cada fuente tiene una fiabilidad publicada (Google 0,95; TripAdvisor 0,90; Facebook 0,55; la verificación directa del anfitrión, 1,00) y los datos envejecen: una extracción pierde la mitad de su peso cada 540 días, porque un local cambia de dueño, de cocinero o de carta.\n\n3. **Encogimiento bayesiano.** Cada local se ancla a la media del corredor con una fuerza de 25 reseñas equivalentes. Con mucha muestra, el ancla apenas se nota; con poca, protege de los espejismos. O Furón, con sus cuatro reseñas, queda cerca de la media del corredor por muy buenas que sean. Es intencional.\n\n4. **Cota inferior de Wilson.** Sobre la proporción estimada de comensales que puntuarían 4 estrellas o más, se publica el límite inferior del intervalo de confianza al 95 %: el valor que, con esa certeza, no se supera. Dos locales con la misma media quedan separados por su volumen, y gana el de más reseñas.\n\n5. **Penalización por heterogeneidad.** Cuando dos fuentes con muestra suficiente discrepan más de 12 puntos, la discrepancia es información — turista frente a local, o inconstancia real. El caso extremo del corredor es Garsán: 4,3 en Google, 3,5 en TripAdvisor. La penalización es moderada, visible y queda registrada.\n\n6. **Composición y confianza.** El índice final combina la media encogida con la cota de Wilson, y se acompaña de una confianza de 0 a 100 que dice cuánto fiarse del número: 55 % por el volumen de muestra, 30 % por las fuentes independientes, 15 % por la vigencia.\n\n### La regla de la casa: lo que no está verificado, no se inventa\n\nEl índice solo puntúa lo que las reseñas públicas documentan. Los datos operativos —mesas, horarios, teléfonos— son otra cosa: muchos no son públicos, y cuando no están contrastados la ficha muestra «pendiente de verificar» en lugar de una estimación. En cada ficha hay una cola de curación: cualquiera puede enviar un dato, pero una corrección sin verificar contra la fuente original no entra nunca. Un número publicado aquí se puede reconstruir a mano con la información de la propia ficha.\n\n### Transparencia total\n\nLas fórmulas completas, la tabla de fiabilidades de las catorce fuentes y la lista de lo que el modelo no hace —no mide la calidad objetiva de un plato, no corrige el sesgo de selección de las plataformas— están publicadas en la [metodología](/gastronomia/metodologia). La guía entera, con sus 27 locales y sus desgloses, en [la guía gastronómica](/gastronomia).\n\nUn índice no sustituye a una comida en la barra del puerto. Pero al menos, antes de sentarse, el huésped sabe exactamente por qué aparece cada local donde aparece — y qué confianza merece el número. Eso, en una ría donde la despensa es de verdad, es lo mínimo.\n\nFuentes: reseñas públicas de Google, TripAdvisor, TheFork, Facebook, GastroRanking, Carta.menu, Guía Repsol, Guía Michelin, Turismo Ribeira, Turismo de Galicia, Páxinas Galegas y La Voz de Galicia (extracción del 17 de octubre de 2026); verificación directa del anfitrión. Modelo v1.3, publicado el 18 de octubre de 2026.`,
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
