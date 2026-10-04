import React, { useState, useEffect } from 'react';
import { ArrowLeft, Clock, Compass, Tag, MapPin, Gauge } from 'lucide-react';
import { getArticles, ARTICLES as RAW_ARTICLES, Article } from '../data/articles';
import { ArticleModal } from './ArticleModal';
import { PuenteView } from './PuenteView';
import { t } from '../i18n/translate';
import { useI18n } from '../i18n/LangContext';

interface BitacoraPageProps {
  onBack: () => void;
  onOpenBooking: () => void;
  initialArticleSlug?: string | null;
}

export function BitacoraPage({ onBack, onOpenBooking, initialArticleSlug }: BitacoraPageProps) {
  const { lang } = useI18n();
  const articles = getArticles(lang);
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [showDashboard, setShowDashboard] = useState<boolean>(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (initialArticleSlug) {
      const art = getArticles(lang).find((a) => a.slug === initialArticleSlug);
      if (art) setSelectedArticle(art);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // URL y meta propios por artículo (SEO): /bitacora/<slug>
  useEffect(() => {
    if (selectedArticle && selectedArticle.slug) {
      document.title = `${selectedArticle.title} · Illas Atlánticas Ático`;
      window.history.pushState(null, '', `/bitacora/${selectedArticle.slug}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedArticle]);

  // Si el usuario activa el Puente de Mando, la puerta primero (con sonido / en silencio)
  if (showDashboard) {
    return (
      <PuenteView
        onBackHome={() => setShowDashboard(false)}
        onOpenBooking={onOpenBooking}
      />
    );
  }

  const categories = ['Todas', 'Historia & Navegación', 'Cartografía & Territorio', 'Tratado de Producto & Lonja', 'Oceanografía & Ría', 'Guías & Entorno', 'Experiencias atlánticas'];

  const filteredArticles = selectedCategory === 'Todas'
    ? articles
    : articles.filter((a, i) => RAW_ARTICLES[i]?.category === selectedCategory);

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 selection:bg-amber-200 selection:text-stone-950 font-sans">
      
      {/* CABECERA CON TIRO BAJO: ENFOCADA AL MAR Y A PEDRA DA RÁ */}
      <header className="relative h-[75vh] min-h-[560px] max-h-[750px] w-full bg-stone-950 flex items-end overflow-hidden border-b border-stone-800">
        <img
          src="mirador-pedra-da-ra-ribeira-atlantico.webp"
          alt={t("Mirador da Pedra da Rá en Ribeira con vistas al Océano Atlántico")}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: 'center 78%' }}
        />

        {/* Sombra sutil para lectura sin tapar el agua */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />

        {/* Barra superior con navegación y acceso al Puente de Mando */}
        <div className="absolute top-0 left-0 right-0 z-20 px-6 sm:px-10 py-6 max-w-7xl mx-auto flex items-center justify-between gap-3">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-stone-950/70 hover:bg-white hover:text-stone-950 backdrop-blur-md border border-stone-700/60 text-white text-xs uppercase tracking-[0.2em] font-medium transition-all shadow-xl group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>{t("Volver al Ático")}</span>
          </button>

          <div className="flex items-center gap-3">
            {/* BOTÓN DE ACCESO AL INSTRUMENTAL */}
            <button
              onClick={() => setShowDashboard(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-amber-500/20 hover:bg-amber-400 hover:text-stone-950 backdrop-blur-md border border-amber-400/60 text-amber-200 text-xs uppercase tracking-[0.2em] font-medium transition-all shadow-xl group"
            >
              <Gauge className="w-4 h-4 text-amber-300 group-hover:text-stone-950 transition-colors" />
              <span>{t("Puente de Mando")}</span>
            </button>

            <span className="hidden md:inline-block text-[11px] uppercase tracking-[0.2em] text-white/90 bg-stone-950/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-stone-700/50 shadow-lg">
              Mirador da Pedra da Rá · Ribeira
            </span>
          </div>
        </div>

        {/* Textos de cabecera */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 pb-12 sm:pb-16 w-full space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-950/80 border border-amber-400/40 text-amber-200 text-xs uppercase tracking-[0.25em] backdrop-blur-md shadow-lg">
            <Compass className="w-3.5 h-3.5 text-amber-300" />
            <span>{t("Archivo Territorial & Crónicas de Mar")}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light text-white tracking-tight max-w-3xl leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            Cuaderno de <span className="italic font-serif text-amber-100">Bitácora</span>
          </h1>

          <p className="text-stone-200 text-sm sm:text-base font-light max-w-2xl leading-relaxed drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
            Monográficos documentados con rigor científico e histórico sobre la Ría de Arousa, el Parque Nacional de Sálvora, la cartografía náutica y la verdad gastronómica de lonja.
          </p>
        </div>
      </header>

      {/* CUERPO DEL ARCHIVO */}
      <main className="max-w-7xl mx-auto px-6 sm:px-10 py-16 space-y-12">
        <div className="flex flex-wrap items-center gap-2 pb-6 border-b border-stone-800/80">
          <span className="text-xs uppercase tracking-[0.2em] text-stone-400 mr-2 flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5" />
            <span>{t('Filtrar:')}</span>
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs uppercase tracking-[0.15em] transition-all ${
                selectedCategory === cat
                  ? 'bg-amber-100 text-stone-950 font-semibold shadow-md'
                  : 'bg-stone-900/90 text-stone-400 hover:text-white hover:bg-stone-800 border border-stone-800'
              }`}
            >
              {t(cat)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredArticles.map((article) => (
            <article
              key={article.id}
              onClick={() => setSelectedArticle(article)}
              className="group bg-stone-900/40 border border-stone-800/90 hover:border-amber-200/40 rounded-sm p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:bg-stone-900/70 cursor-pointer shadow-xl"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.18em] text-stone-400">
                  <span className="text-amber-200/90 font-medium">{article.category}</span>
                  <span className="flex items-center gap-1 text-stone-400">
                    <Clock className="w-3.5 h-3.5" />
                    {article.readTime}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-serif text-white font-light leading-snug group-hover:text-amber-100 transition-colors">
                  {article.title}
                </h2>

                <p className="text-stone-300/90 text-sm font-light leading-relaxed">
                  {article.excerpt}
                </p>
              </div>

              <div className="pt-6 mt-8 border-t border-stone-800/80 flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] uppercase tracking-wider bg-stone-950 text-stone-400 px-2.5 py-1 rounded-sm border border-stone-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <span className="text-xs uppercase tracking-[0.18em] text-amber-200 font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  Leer Crónica →
                </span>
              </div>
            </article>
          ))}
        </div>

        <section className="mt-20 p-8 sm:p-12 bg-gradient-to-br from-stone-900 to-stone-950 border border-stone-800 rounded-sm flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 text-amber-300 text-xs uppercase tracking-[0.2em] font-semibold">
              <MapPin className="w-4 h-4" />
              <span>{t("Observatorio Privado en Aguiño")}</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl text-white font-light">
              Descubre este horizonte desde la terraza de Illas Atlánticas Ático
            </h3>
            <p className="text-stone-400 text-xs sm:text-sm font-light leading-relaxed">
              Un refugio frente al océano y a las bateas de la ría para quienes valoran la autenticidad, la calma y el conocimiento del territorio sin intermediarios.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <button
              onClick={() => setShowDashboard(true)}
              className="px-6 py-3.5 rounded-full border border-amber-500/40 bg-amber-950/30 hover:bg-amber-400 hover:text-stone-950 text-amber-200 text-xs uppercase tracking-[0.18em] transition-all text-center"
            >
              {t("Abrir Puente de Mando")}
            </button>
            <button
              onClick={() => {
                onBack();
                setTimeout(() => onOpenBooking(), 200);
              }}
              className="px-6 py-3.5 rounded-full bg-white hover:bg-stone-200 text-stone-950 text-xs font-semibold uppercase tracking-[0.18em] transition-all text-center shadow-lg"
            >
              {t("Consultar Fechas")}
            </button>
          </div>
        </section>
      </main>

      <ArticleModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
        onOpenBooking={() => {
          setSelectedArticle(null);
          onBack();
          setTimeout(() => onOpenBooking(), 250);
        }}
      />
    </div>
  );
}

export default BitacoraPage;
