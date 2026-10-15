// Datos de opiniones — fuentes: Booking.com y Google (reseñas verificadas por el propietario)
// Última actualización: 2026-10-15 (puntuación Booking: 9,4 — vía espejo Amimir y caché de Google; listado Booking temporalmente desactivado)

export const REVIEW_STATS = {
  score: '9,4',
  total: 54,
  personal: '9,8',
  servicios: '9,6',
  confort: '9,4',
  ubicacion: '9,4',
};

export interface Review {
  name: string;
  country: string;
  score: string;
  title: string;
  date: string;
  details: string;
  comment: string;
}

export const REVIEWS: Review[] = [
  {
    name: 'Manuel',
    country: 'España',
    score: '10',
    title: 'Excelente apartamento y el anfitrión de 10',
    date: 'Abril 2026',
    details: 'Pareja · 3 noches',
    comment:
      'La ubicación permite visitas directas a las islas, el apartamento en buenas condiciones, con muy buenos accesorios. Las habitaciones de 10, amplias. Con baños totalmente equipados. Con parking y acceso directo al apartamento. El trato con el dueño Fernando excelente, nos enseñó el apartamento y nos dio indicaciones para conocer lugares y sitios para comer. A este apartamento y a su anfitrión les doy un 20, no un 10.'
  },
  {
    name: 'Karolina',
    country: 'Polonia',
    score: '10',
    title: 'Terraza frente a las islas',
    date: 'Agosto 2026',
    details: 'Familia · 4 noches',
    comment:
      'Excelente y espacioso apartamento en primera línea, con una preciosa terraza desde la que se contemplan las islas. En el apartamento hay todo lo que necesitas e incluso más; un alojamiento fantásticamente equipado en el que se podría vivir tranquilamente. ¿Qué no gustó? Nada: el apartamento es genial.'
  },
  {
    name: 'Maria',
    country: 'España',
    score: '9,0',
    title: 'Fantástico',
    date: 'Agosto 2026',
    details: 'Grupo · Teletrabajo',
    comment:
      'Perfecto para acoger a 6 personas, con vistas espectaculares. La cercanía del propietario y su disposición para resolver cualquier duda, destacables. Estuvimos como en casa o incluso mejor. Zona muy tranquila.'
  },
  {
    name: 'Raul',
    country: 'España',
    score: '10',
    title: 'Excepcional',
    date: 'Julio 2026',
    details: 'Estancia vacacional',
    comment:
      'Instalaciones y vistas de lujo. Terraza inmejorable al atardecer. Volveré sin duda.'
  },
  {
    name: 'Anne',
    country: 'Francia',
    score: '10',
    title: 'Vue imprenable sur les îles',
    date: 'Junio 2026',
    details: 'Pareja · 5 noches',
    comment:
      'Magnifique appartement, très bien équipé et propre. La terrasse avec vue sur les îles Atlantiques est exceptionnelle au coucher du soleil. Fernando est un hôte attentionné, de très bons conseils pour visiter la région.'
  },
  {
    name: 'Javier',
    country: 'España',
    score: '10',
    title: 'Repetiremos seguro',
    date: 'Mayo 2026',
    details: 'Familia con niños · 4 noches',
    comment:
      'Apartamento enorme, luminoso y con todo lo necesario para venir con niños. La plaza de garaje es un puntazo y la playa está a un paseo. El anfitrión nos recomendó rutas por las islas que fueron lo mejor de las vacaciones.'
  },
  {
    name: 'Gonzalo',
    country: 'Google',
    score: '10',
    title: 'Experiencia inmejorable e indescriptible',
    date: 'Septiembre 2026',
    details: 'Reseña de Google',
    comment:
      'Experiencia inmejorable e indescriptible. En primer lugar destacar la amabilidad del anfitrión, que está siempre disponible y atento para solventar y facilitar cualquier necesidad que surja. El ático está equipado de todo lo que uno puede necesitar, sea para unos días sueltos o una estancia más larga: incluye cualquier equipación y detalle que uno pueda imaginarse (y más). Cuidadas hasta el último detalle, cada una de las estancias está elegantemente decorada, es altamente espaciosa y permite el descanso, el disfrute y la desconexión. Las vistas desde la gran terraza son inigualables; no hay ruidos ni molestias nocturnas que puedan enturbiar el descanso. El alojamiento tiene todo lo indispensable alrededor (playa, restaurantes, comercio, banco…) y está comunicado fácilmente con las localidades aledañas y con la autopista AG11. Sin duda, una experiencia para recordar y repetir en cuanto sea posible. ¡5 estrellas se quedan MUY cortas!'
  },
  {
    name: 'Esther',
    country: 'Google',
    score: '10',
    title: 'Un 20, no un 10',
    date: 'Abril 2026',
    details: 'Reseña de Google',
    comment:
      'Un apartamento de lujo en Aguiño con vistas al mar. Levantarte por la mañana y ver el amanecer desde la terraza, con las islas Cíes y Ons de fondo, NO TIENE PRECIO. El apartamento es una maravilla: unas habitaciones enormes, camas cómodas, salón comedor muy grande y la cocina totalmente equipada, con todo tipo de utensilios y electrodomésticos. Plaza de parking con acceso directo al ático por el ascensor. Qué decir del anfitrión Fernando, encantador y muy atento. Conclusión: este apartamento, para nosotros, un 20, no un 10.'
  },
];
// --- Traducciones (ES fuente de verdad) ---
import { trc } from '../i18n/dataTranslations';
import { Lang } from '../i18n/types';

export function getReviews(lang: Lang): Review[] {
  return REVIEWS.map((r, i) => ({
    ...r,
    title: trc(`rev.r${i}.title`, lang, r.title),
    details: trc(`rev.r${i}.details`, lang, r.details),
    comment: trc(`rev.r${i}.comment`, lang, r.comment),
  }));
}
