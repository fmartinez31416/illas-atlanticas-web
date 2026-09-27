import { ArrowLeft } from 'lucide-react';
import { t } from '../i18n/translate';

interface LegalPageProps {
  onBack: () => void;
}

export function LegalPage({ onBack }: LegalPageProps) {
  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 font-sans">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        <button
          onClick={onBack}
          className="mb-10 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-stone-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver</span>
        </button>

        <h1 className="text-3xl sm:text-5xl font-serif text-white font-normal tracking-tight mb-10">
          Aviso Legal, Privacidad <span className="italic font-light text-stone-300">& Cookies</span>
        </h1>

        <div className="space-y-12 text-stone-300 font-light leading-relaxed text-sm sm:text-base">

          <section>
            <h2 className="text-xl font-serif text-white mb-4">{t("1. Aviso Legal")}</h2>
            <p className="mb-3">
              Titular: <span className="text-white">{t("Fernando Martínez Piñeiro")}</span>, anfitrión y responsable de la Vivienda de Uso Turístico <span className="text-white">{t("«Illas Atlánticas Ático»")}</span>, inscrita en el Registro de Empresas y Actividades Turísticas de la Xunta de Galicia con el código <span className="text-white">VUT-CO-007656</span>.
            </p>
            <p className="mb-3">
              Domicilio: Rúa Francisco Lorenzo Mariño 93, Ático F · 15965 Aguiño, Ribeira (A Coruña).
            </p>
            <p>
              Contacto: <span className="text-white">+34 606 025 318</span> · <span className="text-white">reservas@illasatlanticasatico.es</span>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif text-white mb-4">{t("2. Privacidad (RGPD)")}</h2>
            <p className="mb-3">
              Los datos personales que nos facilitas (nombre, contacto y datos de identidad de los viajeros) se tratan únicamente para:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-3">
              <li>{t("gestionar tu reserva y la comunicación contigo;")}</li>
              <li>{t("cumplir obligaciones legales, incluida la comunicación de viajeros a las Fuerzas y Cuerpos de Seguridad (Real Decreto 933/2021) y las obligaciones fiscales.")}</li>
            </ul>
            <p className="mb-3">
              No cedemos tus datos a terceros salvo obligación legal (SES-Hospedajes, Administración tributaria) o proveedores necesarios para el pago (Stripe, PayPal), que actúan como encargados del tratamiento.
            </p>
            <p className="mb-3">
              Conservamos los datos el tiempo exigido por la normativa (los registros de viajeros, tres años conforme al RD 933/2021).
            </p>
            <p>
              Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad escribiendo a <span className="text-white">reservas@illasatlanticasatico.es</span> {t("o llamando al")} <span className="text-white">+34 606 025 318</span>. Si consideras que el tratamiento no es conforme, puedes reclamar ante la Agencia Española de Protección de Datos (aepd.es).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-serif text-white mb-4">3. Cookies</h2>
            <p className="mb-3">
              Esta web <span className="text-white">{t("no utiliza cookies de publicidad ni de seguimiento")}</span>. Medimos las visitas con una baliza propia de un píxel, anónima y sin cookies.
            </p>
            <p className="mb-3">
              Únicamente se emplean los recursos técnicos imprescindibles: las tipografías de Google Fonts, que cargan recursos desde servidores de Google, y el motor de reservas de Beds24 para mostrar disponibilidad y procesar pagos de forma segura (cifrado HTTPS).
            </p>
            <p>
              Puedes desactivar las cookies de tu navegador en cualquier momento; la web seguirá funcionando con normalidad.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}

export default LegalPage;
