// Datos de opiniones — actualizados manualmente desde Booking.com
// Última actualización: 2026-09-15 (fuente: ficha Booking.com del propietario)

export const REVIEW_STATS = {
  score: '9,5',
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
];