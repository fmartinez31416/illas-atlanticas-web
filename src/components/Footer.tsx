import { useState } from 'react';
import { MapPin, Phone, Mail, MessageCircle, ShieldCheck, FileText, ChevronRight, X, Heart, Sparkles } from 'lucide-react';

export function Footer() {
  const [legalModalContent, setLegalModalContent] = useState<'legal' | 'privacy' | 'terms' | null>(null);

  const openLegal = (type: 'legal' | 'privacy' | 'terms') => {
    setLegalModalContent(type);
  };

  return (
    <footer id="contacto" className="bg-zinc-950 text-zinc-300 border-t border-zinc-800/80 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-zinc-800">
          
          {/* Brand & Manifesto */}
          <div className="space-y-4 lg:col-span-1">
            <div>
              <span className="text-xl font-serif text-zinc-100 uppercase tracking-widest block font-medium">
                Illas Atlánticas
              </span>
              <span className="text-xs text-amber-500 uppercase tracking-widest font-bold">
                Ático Singular · Aguiño
              </span>
            </div>
            <p className="text-xs text-zinc-400 font-light leading-relaxed">
              Refugio atlántico exclusivo frente al Parque Nacional de Sálvora. 48 m² de terraza panorámica, master suite con luz cenital y desconexión absoluta en las Rías Baixas.
            </p>
            <div className="pt-2">
              <span className="inline-block px-3 py-1 rounded-sm bg-zinc-900 border border-zinc-800 text-zinc-300 font-mono text-[11px]">
                Rexistro Oficial: <strong className="text-amber-400">VUT-CO-008942</strong>
              </span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-zinc-200 font-bold mb-4">
              Navegación
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-400 font-light">
              <li>
                <a href="#hero" className="hover:text-amber-400 transition-colors">Inicio</a>
              </li>
              <li>
                <a href="#espacios" className="hover:text-amber-400 transition-colors">Espacios & Terraza</a>
              </li>
              <li>
                <a href="#experiencias" className="hover:text-amber-400 transition-colors">Experiencias & Lonja de Aguiño</a>
              </li>
              <li>
                <a href="#servicios" className="hover:text-amber-400 transition-colors">Equipamiento & Aerotermia</a>
              </li>
              <li>
                <a href="#reservas" className="hover:text-amber-400 transition-colors">Reserva Directa Beds24</a>
              </li>
              <li>
                <a href="#ubicacion" className="hover:text-amber-400 transition-colors">Ubicación & Sálvora</a>
              </li>
            </ul>
          </div>

          {/* Direct Contact & Concierge */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-zinc-200 font-bold mb-4">
              Contacto & Conserjería
            </h4>
            <div className="space-y-3 text-xs text-zinc-400 font-light">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>Rúa Castelao / Porto de Aguiño, 15965 Ribeira (A Coruña, Galicia)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <a href="tel:+34600000000" className="hover:text-white transition-colors">+34 600 000 000</a>
              </div>
              <div className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href="https://wa.me/34600000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:underline"
                >
                  WhatsApp Atención Inmediata
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <a href="mailto:reservas@illasatlanticas-atico.com" className="hover:text-white transition-colors">
                  reservas@illasatlanticas-atico.com
                </a>
              </div>
            </div>
          </div>

          {/* Guarantees & Certifications */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-zinc-200 font-bold mb-4">
              Garantías Oficiales
            </h4>
            <div className="space-y-3 text-xs text-zinc-400 font-light">
              <div className="p-3 rounded-sm bg-zinc-900 border border-zinc-800 space-y-1">
                <span className="text-zinc-200 font-medium block">Motor Oficial Beds24</span>
                <p className="text-[11px] text-zinc-400">Reserva directa cifrada SSL sin intermediarios.</p>
              </div>
              <div className="p-3 rounded-sm bg-zinc-900 border border-zinc-800 space-y-1">
                <span className="text-zinc-200 font-medium block">Partee & SES.Hospedajes</span>
                <p className="text-[11px] text-zinc-400">Cumplimiento del Real Decreto 933/2021 de partes de entrada.</p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Legal bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 font-light">
          <div>
            © {new Date().getFullYear()} Illas Atlánticas Ático. Todos los derechos reservados.
          </div>

          <div className="flex flex-wrap items-center gap-4 text-[11px]">
            <button
              onClick={() => openLegal('legal')}
              className="hover:text-zinc-300 transition-colors underline-offset-2 hover:underline"
            >
              Aviso Legal
            </button>
            <span>·</span>
            <button
              onClick={() => openLegal('privacy')}
              className="hover:text-zinc-300 transition-colors underline-offset-2 hover:underline"
            >
              Política de Privacidad
            </button>
            <span>·</span>
            <button
              onClick={() => openLegal('terms')}
              className="hover:text-zinc-300 transition-colors underline-offset-2 hover:underline"
            >
              Condiciones de Reserva & Cancelación
            </button>
          </div>
        </div>

      </div>

      {/* Legal Information Modal */}
      {legalModalContent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
          onClick={() => setLegalModalContent(null)}
        >
          <div
            className="relative w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-sm p-6 sm:p-8 text-zinc-200 max-h-[85vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLegalModalContent(null)}
              className="absolute top-4 right-4 p-2 rounded-sm bg-zinc-950 text-zinc-400 hover:text-white border border-zinc-800"
            >
              <X className="w-5 h-5" />
            </button>

            {legalModalContent === 'legal' && (
              <div className="space-y-4 text-xs sm:text-sm font-light leading-relaxed">
                <h3 className="text-xl font-serif text-zinc-100">Aviso Legal</h3>
                <p>
                  En cumplimiento del deber de información recogido en la Ley 34/2002 de Servicios de la Sociedad de la Información y del Comercio Electrónico (LSSI-CE):
                </p>
                <p>
                  <strong>Titular:</strong> Explotación Turística Illas Atlánticas Ático.<br />
                  <strong>Registro de Vivienda de Uso Turístico (Xunta de Galicia):</strong> VUT-CO-008942.<br />
                  <strong>Ubicación:</strong> Rúa Castelao / Porto de Aguiño, 15965 Ribeira (A Coruña).<br />
                  <strong>Contacto:</strong> reservas@illasatlanticas-atico.com.
                </p>
                <p>
                  El acceso y navegación por este sitio web atribuye la condición de usuario e implica la aceptación plena de todas las cláusulas de uso y contratación directa.
                </p>
              </div>
            )}

            {legalModalContent === 'privacy' && (
              <div className="space-y-4 text-xs sm:text-sm font-light leading-relaxed">
                <h3 className="text-xl font-serif text-zinc-100">Política de Privacidad y Protección de Datos</h3>
                <p>
                  De conformidad con el Reglamento General de Protección de Datos (RGPD UE 2016/679) y la LOPDGDD 3/2018:
                </p>
                <p>
                  <strong>Finalidad:</strong> Gestión directa de la reserva, facturación, atención a solicitudes del huésped y cumplimiento de la normativa de registro de viajeros (SES.Hospedajes / Partee conforme al Real Decreto 933/2021).
                </p>
                <p>
                  <strong>Legitimación:</strong> Ejecución del contrato de reserva de hospedaje y cumplimiento de obligaciones legales de seguridad ciudadana.
                </p>
                <p>
                  <strong>Derechos:</strong> Puede ejercer sus derechos de acceso, rectificación, supresión y limitación escribiendo a reservas@illasatlanticas-atico.com.
                </p>
              </div>
            )}

            {legalModalContent === 'terms' && (
              <div className="space-y-4 text-xs sm:text-sm font-light leading-relaxed">
                <h3 className="text-xl font-serif text-zinc-100">Condiciones de Reserva Directa y Cancelación</h3>
                <p>
                  <strong>1. Tarifa Garantizada:</strong> Al reservar a través del motor directo Beds24, la propiedad garantiza el mejor precio disponible sin comisiones intermediarias.
                </p>
                <p>
                  <strong>2. Horarios:</strong> Check-in a partir de las 16:00 h (acceso autónomo 24/7 disponible mediante Smart Lock). Check-out hasta las 11:30 h.
                </p>
                <p>
                  <strong>3. Cancelación Flexible:</strong> Cancelación gratuita con reembolso del 100% de los importes abonados hasta 7 días naturales antes de la fecha de entrada.
                </p>
                <p>
                  <strong>4. Normas del Ático:</strong> Capacidad máxima de 4 personas. No se permiten fiestas o eventos no autorizados. Política pet-friendly exclusiva bajo consulta previa.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </footer>
  );
}
