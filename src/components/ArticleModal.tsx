import React, { useEffect } from 'react';
import { X, Clock, Calendar, ArrowLeft, ShieldCheck, MapPin, Compass } from 'lucide-react';

interface ArticleData {
  id: string;
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  readTime: string;
  date: string;
  author: string;
  tags: string[];
}

interface ArticleModalProps {
  article: ArticleData | null;
  onClose: () => void;
  onOpenBooking: () => void;
}

export function ArticleModal({ article, onClose, onOpenBooking }: ArticleModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (article) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [article, onClose]);

  if (!article) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/85 backdrop-blur-md flex justify-center p-0 sm:p-4 md:p-6 animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-[#FAF8F5] text-stone-900 shadow-2xl min-h-screen sm:min-h-0 sm:rounded-sm flex flex-col overflow-hidden border border-stone-200">
        
        {/* Barra superior de navegación */}
        <div className="sticky top-0 z-20 bg-[#FAF8F5]/95 backdrop-blur-md px-6 py-4 border-b border-stone-200 flex items-center justify-between">
          <button
            onClick={onClose}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-stone-600 hover:text-stone-950 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver a la bitácora</span>
          </button>
          
          <button
            onClick={onClose}
            aria-label="Cerrar artículo"
            className="p-1.5 rounded-full text-stone-500 hover:text-stone-950 hover:bg-stone-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Contenido del Artículo */}
        <article className="px-6 sm:px-12 md:px-16 py-10 sm:py-14 space-y-10 max-w-3xl mx-auto">
          
          {/* Metadatos y Encabezado */}
          <header className="space-y-4 border-b border-stone-200 pb-8">
            <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.18em] text-stone-500">
              <span className="font-semibold text-amber-800">{article.category}</span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {article.readTime}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {article.date}
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-stone-900 leading-tight">
              {article.title}
            </h1>

            <p className="text-stone-600 text-base sm:text-lg font-serif italic leading-relaxed pt-2">
              "{article.excerpt}"
            </p>
          </header>

          {/* CUERPO MONOGRÁFICO EXTENSO Y DEFINITIVO */}
          <div className="prose prose-stone max-w-none text-stone-800 font-light leading-relaxed space-y-6 text-sm sm:text-base text-justify">
            
            {/* ============================================================ */}
            {/* ARTÍCULO 1: SÁLVORA Y EL SANTA ISABEL */}
            {/* ============================================================ */}
            {article.id === '1' && (
              <>
                <p className="first-letter:text-6xl first-letter:font-serif first-letter:font-normal first-letter:float-left first-letter:mr-3 first-letter:text-stone-900 leading-relaxed">
                  En la madrugada del 2 de enero de 1921, la boca de la Ría de Arousa fue escenario de una de las mayores catástrofes navales del siglo XX en el litoral español, pero también del testimonio de solidaridad comunitaria más conmovedor registrado en las costas atlánticas. El vapor-correo <em>Santa Isabel</em>, buque insignia de la Compañía Transatlántica Española, botado en Cádiz y dotado de los mejores avances técnicos de la época, navegaba con rumbo final a Buenos Aires realizando escalas de embarque de pasaje migratorio gallego.
                </p>

                <h2 className="font-serif text-2xl text-stone-900 font-normal pt-4 border-t border-stone-200">
                  I. La trampa batimétrica de los Bajos de Pegar
                </h2>
                <p>
                  Aquel invierno de 1921 azotaba Galicia con una sucesión ininterrumpida de frentes del sudoeste. A la 01:50 de la madrugada, con el telón de una niebla espesa y vientos huracanados que desdibujaban las señales lumínicas del faro de Corrubedo y de la propia Sálvora, el capitán del buque calculó erróneamente su posición al intentar tomar abrigo en la ría.
                </p>
                <p>
                  A velocidad de crucero, la quilla de acero colisionó directamente contra las agujas de granito sumergidas conocidas como los <strong>Bajos de Pegar</strong>, a menos de doscientos metros de la costa meridional de la Isla de Sálvora. El impacto desgarró los fondos del buque bajo las salas de calderas. En menos de cinco minutos, la explosión por choque térmico inutilizó los generadores eléctricos: el barco quedó sumido en la oscuridad absoluta, escorado y partido en dos sobre la rompiente, con 268 almas a merced de olas que superaban los siete metros de altura.
                </p>

                <h2 className="font-serif text-2xl text-stone-900 font-normal pt-4 border-t border-stone-200">
                  II. Las Heroínas de Sálvora: coraje en una dornilla de madera
                </h2>
                <p>
                  En la aldea insular de Sálvora la mayoría de los hombres adultos se encontraban en tierra firme celebrando las fiestas de Año Nuevo. Alertadas por los estampidos de la caldera y los gritos desesperados arrastrados por el temporal, cuatro jóvenes mujeres isleñas tomaron la iniciativa: <strong>María Fernández Oujo, Josefa Parada, Cipriana Oujo Maneiro y Cipriana Crujeiras</strong>.
                </p>
                <p>
                  Botaron una humilde <em>dornilla</em> —embarcación tradicional gallega de madera de apenas unos metros de eslora, sin cubierta y de franco bordo bajísimo— impulsada exclusivamente a remo de fuerza. En mitad de la noche ciega, esquivando rocas afiladas y contracorrientes de succión letales, estas cuatro mujeres completaron tres viajes sucesivos entre los restos del naufragio y la playa del Pazo de Sálvora. A pulso, izaron del mar helado y de las rompientes a 56 náufragos que lograron salvar la vida gracias a su determinación.
                </p>
                <p>
                  El farero de la isla y los pocos ancianos presentes improvisaron torniquetes, mantas y lumbre en la aldea para atender a los supervivientes, mientras el mar cobraba el peaje de 212 víctimas mortales en una tragedia que conmocionó a la opinión pública internacional.
                </p>

                <h2 className="font-serif text-2xl text-stone-900 font-normal pt-4 border-t border-stone-200">
                  III. Memoria náutica y custodia del Parque Nacional
                </h2>
                <p>
                  La Real Sociedad de Salvamento de Náufragos condecoró a las remeras de Sálvora con la medalla de oro, reconociendo una de las mayores hazañas civiles en la historia de la marina mercante mundial. Aquel suceso transformó para siempre la reglamentación sobre radiotelegrafía de emergencia y balizamiento en los accesos a las rías gallegas.
                </p>
                <p>
                  En la actualidad, la Isla de Sálvora forma parte indiscutible del <strong>Parque Nacional Marítimo-Terrestre de las Islas Atlánticas de Galicia</strong>. Deshabitada desde mediados del siglo pasado, sus arenales vírgenes, el pazo señorial, las esculturas de piedra modeladas por la erosión eólica y marina, y el faro centenario custodian la memoria del <em>Santa Isabel</em>. Su ecosistema es hoy un santuario biológico donde crían colonias protegidas de cormorán moñudo, halcón peregrino y nutria marina, bajo un estricto régimen de visitas autorizadas que salvaguarda este patrimonio natural e histórico único.
                </p>
              </>
            )}

            {/* ============================================================ */}
            {/* ARTÍCULO 2: EL PERCEBE DE AGUIÑO */}
            {/* ============================================================ */}
            {article.id === '2' && (
              <>
                <p className="first-letter:text-6xl first-letter:font-serif first-letter:font-normal first-letter:float-left first-letter:mr-3 first-letter:text-stone-900 leading-relaxed">
                  El puerto de Aguiño, en el extremo suroccidental de la península del Barbanza, es reconocido unánimemente como una de las capitales mundiales del percebe (<em>Pollicipes pollicipes</em>). No es fruto del azar ni de una estrategia de mercadotecnia: la disposición geográfica de sus bajos rocosos exteriores y los islotes de Sagres y Sálvora genera un escenario de colisión hidrodinámica donde el Atlántico abierto rompe con violencia desmesurada, propiciando el hábitat perfecto para el desarrollo de este crustáceo cirrípedo.
                </p>

                <h2 className="font-serif text-2xl text-stone-900 font-normal pt-4 border-t border-stone-200">
                  I. Biología y biomecánica en la rompiente
                </h2>
                <p>
                  A diferencia de la creencia popular, el percebe no es un molusco, sino un crustáceo hermafrodita que vive anclado permanentemente a la roca de granito. Su anatomía se divide en dos partes diferenciadas: el <strong>capítulo</strong> o uña (formada por placas calcáreas que protegen sus órganos vitales y los cirros filtradores) y el <strong>pedúnculo</strong> carnoso, envuelto en una cutícula elástica de escamas microscópicas.
                </p>
                <p>
                  Para alimentarse de zooplancton y oxígeno, el percebe requiere una renovación masiva y constante de agua marina batida. Cuanto mayor es el impacto continuo del oleaje, mayor esfuerzo muscular genera el animal para sujetarse a la piedra, lo que se traduce en un pedúnculo extraordinariamente denso, carnoso, corto y repleto de concentración sápida.
                </p>

                <h2 className="font-serif text-2xl text-stone-900 font-normal pt-4 border-t border-stone-200">
                  II. Fisiología de lonja: Percebe de rompiente vs. Percebe de sombra
                </h2>
                <p>
                  En la lonja de Aguiño la subasta premia la extracción de riesgo. El ojo profesional clasifica el producto con precisión quirúrgica:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Percebe de rompiente (sol y batida):</strong> Extraído en las cotas más bajas y expuestas de los islotes. Pedúnculo corto y cilíndrico de gran grosor, piel oscura y rugosa, uña limpia de sedimentos calcáreos y carne prieta sin retención superflua de agua.</li>
                  <li><strong>Percebe de sombra o grieta:</strong> Criado en hendiduras protegidas donde la luz no penetra y el agua no golpea con ímpetu. Desarrolla un pedúnculo largo, delgado y tubular para buscar corrientes filtradoras; su carne es acuosa, deshilachada y con una concentración organoléptica sustancialmente inferior.</li>
                </ul>

                <h2 className="font-serif text-2xl text-stone-900 font-normal pt-4 border-t border-stone-200">
                  III. Tratado exacto de salmuera y cocción
                </h2>
                <p>
                  Preparar el percebe fresco de Aguiño no tolera aderezos extraños ni complejidades innecesarias. El axioma secular de las gentes del mar sentencia: <em>«Auga que ferve, percebes bota; auga que ferve, percebes fóra»</em>. Sin embargo, la física culinaria exige respetar estrictamente las proporciones:
                </p>
                <ol className="list-decimal pl-5 space-y-2">
                  <li><strong>Salinidad del medio:</strong> Si no se dispone de agua pura de mar recién extraída, se debe emular su salinidad osmótica exacta: disolver exactamente entre <strong>65 y 70 gramos de sal marina gruesa</strong> por cada litro de agua dulce.</li>
                  <li><strong>Aromático:</strong> Una sola hoja de laurel de buen porte por cada 2 litros de agua. El laurel no debe protagonizar, sino neutralizar suavemente los taninos del agua.</li>
                  <li><strong>La técnica de los dos hervores:</strong> Se lleva el agua a punto de borbollón vivo. Se sumergen los percebes (el calor desciende bruscamente y cesa la ebullición). Se mantiene el fuego a potencia máxima hasta que la olla recupera el segundo hervor. En ese milisegundo exacto, se cronometran <strong>60 segundos</strong> de cocción controlada y se retiran inmediatamente con espumadera.</li>
                  <li><strong>El atemperado:</strong> Deben disponerse en una fuente amplia cubiertos con un paño de lino limpio y ligeramente humedecido durante tres minutos. Este vapor encerrado asienta los jugos interiores del pedúnculo y permite degustarlos en su punto óptimo de temperatura: templados, nunca fríos de cámara.</li>
                </ol>
              </>
            )}

            {/* ============================================================ */}
            {/* ARTÍCULO 3: BATEAS Y LA RÍA DE AROUSA */}
            {/* ============================================================ */}
            {article.id === '3' && (
              <>
                <p className="first-letter:text-6xl first-letter:font-serif first-letter:font-normal first-letter:float-left first-letter:mr-3 first-letter:text-stone-900 leading-relaxed">
                  Frente a la línea costera de Aguiño y extendiéndose hacia el interior de la Ría de Arousa se despliega el mayor parque de cultivo marino de Europa: más de 2.300 bateas ordenadas en cuadrículas poligonales fijadas por la administración marítima. Estas plataformas flotantes representan uno de los triunfos de la ingeniería vernácula gallega, capaces de armonizar la actividad económica primaria con el respeto escrupuloso a la biología oceanográfica del entorno.
                </p>

                <h2 className="font-serif text-2xl text-stone-900 font-normal pt-4 border-t border-stone-200">
                  I. El motor oceanográfico: El fenómeno del Upwelling
                </h2>
                <p>
                  La insólita fecundidad de la Ría de Arousa no proviene del aporte de los ríos terrestres, sino del propio océano. Entre abril y septiembre, la península se ve influenciada por la dorsal de las Azores, generando vientos persistentes de componente norte.
                </p>
                <p>
                  Por la fuerza de Coriolis y el llamado <strong>transporte de Ekman</strong>, las aguas superficiales cálidas son empujadas mar adentro. Para equilibrar esta masa saliente, emerge desde las fosas abisales oceánicas el <strong>Agua Central Noratlántica (ACNA)</strong>: una corriente profunda, extraordinariamente fría y saturada de fosfatos, nitratos y silicatos minerales.
                </p>
                <p>
                  Al entrar este flujo abisal en la cuenca semicerrada y protegida de la ría, y recibir la intensa radiación solar veraniega, se desata una explosión biológica fotosintética masiva de diatomeas y fitoplancton. La ría se transforma en una sopa biológica hipernutritiva, con densidades de biomasa por metro cúbico comparables a las corrientes de Humboldt en Perú o Benguela en Sudáfrica.
                </p>

                <h2 className="font-serif text-2xl text-stone-900 font-normal pt-4 border-t border-stone-200">
                  II. Anatomía de la batea: Madera y equilibrio estático
                </h2>
                <p>
                  Lejos de estructuras metálicas inertes, la batea clásica gallega se construye con vigas maestras de <strong>madera de eucalipto</strong>. La madera seleccionada pasa por un curado prolongado en agua marina que sella sus poros, otorgándole una flexibilidad idónea para acompañar la ondulación del mar de fondo sin fracturarse por cizalladura mecánica.
                </p>
                <p>
                  La parrilla cuadrangular (de unos 500 m² de superficie) descansa sobre flotadores de acero o poliéster revestido de fibra. Todo el conjunto se fondea al lecho marino de arena y fango mediante cables de acero trenzado sujetos a "muertos" de hormigón armado que alcanzan las 20 toneladas de peso, permitiendo que la batea oscile con las mareas vivas manteniendo siempre la verticalidad de su carga.
                </p>

                <h2 className="font-serif text-2xl text-stone-900 font-normal pt-4 border-t border-stone-200">
                  III. El ciclo biológico del Mexillón de Galicia (DOP)
                </h2>
                <p>
                  El mejillón (<em>Mytilus galloprovincialis</em>) no recibe piensos ni suplementos artificiales: es un filtro viviente puro que purifica hasta 8 litros de agua por hora alimentándose exclusivamente de fitoplancton natural. Su ciclo productivo sigue un calendario riguroso:
                </p>
                <ol className="list-decimal pl-5 space-y-2">
                  <li><strong>Recolección de la mexilla:</strong> A finales de invierno, los bateeiros extraen la semilla silvestre adherida a las piedras batidas de las costas de Aguiño y el Parque Nacional de Sálvora.</li>
                  <li><strong>El primer encordado:</strong> En la batea, la semilla se envuelve en cuerdas de esparto y nailon de 12 metros mediante una malla biodegradable de algodón. En tres semanas el mejillón segrega sus propios filamentos de biso para aferrarse a la soga y la malla se desintegra biológicamente en el agua sin dejar residuo.</li>
                  <li><strong>El desdoble:</strong> A los seis meses, el peso del bivalvo es tal que saturaría la cuerda impidiendo la circulación de nutrientes. Se iza la cuerda con la grúa del barco bateeiro, se desprende la piña y se reparte en dos o tres cuerdas nuevas para favorecer un engorde homogéneo.</li>
                  <li><strong>Cosecha y certificación:</strong> Tras 14 a 18 meses de maduración en suspensión hidrodinámica, el mejillón alcanza su calibre óptimo y una carnosidad sobresaliente, avalado por los estrictos controles microbiológicos del Instituto Tecnolóxico para o Control do Medio Mariño (INTECMAR) y la Denominación de Origen Protegida Mexillón de Galicia.</li>
                </ol>
              </>
            )}

          </div>

          {/* Bloque de Cierre y Conversión Directa */}
          <div className="mt-14 p-8 bg-stone-900 text-white rounded-sm space-y-4 shadow-xl">
            <div className="flex items-center gap-2 text-amber-200 text-xs uppercase tracking-[0.2em] font-semibold">
              <MapPin className="w-4 h-4 text-amber-300" />
              <span>Experiencia Directa desde el Ático</span>
            </div>
            
            <h3 className="font-serif text-xl sm:text-2xl font-light text-white leading-snug">
              Vive el Atlántico en primera línea desde nuestra terraza privada
            </h3>

            <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
              Desde el salón y la terraza privada de <em>Illas Atlánticas Ático</em> en Aguiño, el perfil de las islas, las bateas y el puerto presiden el horizonte día y noche. Máxima tranquilidad, confort y autenticidad sin intermediarios.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-stone-800">
              <div className="flex items-center gap-2 text-xs text-stone-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Reserva directa con anfitrión · Licencia VUT-CO-007656</span>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onOpenBooking();
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-white hover:bg-stone-200 text-stone-950 text-xs font-semibold uppercase tracking-[0.15em] transition-all shadow-md"
              >
                Consultar Disponibilidad
              </button>
            </div>
          </div>

        </article>

      </div>
    </div>
  );
}
