import React, { useState, useEffect } from 'react';
import { 
  Smartphone, 
  Share2, 
  Download, 
  Copy, 
  Check, 
  X, 
  ExternalLink, 
  QrCode, 
  Sparkles,
  Info
} from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface MobileInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileInstallModal: React.FC<MobileInstallModalProps> = ({ isOpen, onClose }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'iphone' | 'android' | 'qr'>('android');
  const [appUrl, setAppUrl] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Use the actual current URL or window location
      setAppUrl(window.location.href);
      if (isIOS) {
        setActiveTab('iphone');
      } else {
        setActiveTab('android');
      }
    }
  }, [isIOS]);

  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(appUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
      const el = document.createElement('textarea');
      el.value = appUrl;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(
      `Probá la app interactiva de cata sensorial de Warhola Gin Edición Bloody: ${appUrl}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  // Safe QR Code URL generated for mobile scanning
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&color=d4af37&bgcolor=0c0a09&data=${encodeURIComponent(
    appUrl || window.location.href
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div 
        className="w-full max-w-md bg-[var(--card)] border border-[var(--gold)]/40 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        style={{ borderRadius: '2px' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[var(--line)] bg-[#141010]">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full border border-[var(--gold)] flex items-center justify-center bg-[var(--bg)] text-[var(--gold)]">
              <Smartphone className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--gold)] font-medium block">
                Acceso Móvil
              </span>
              <h2 className="serif text-base font-medium text-[var(--ink)] leading-tight">
                Tener la app en el celular
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[var(--mute)] hover:text-[var(--ink)] transition-colors"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content area */}
        <div className="p-5 overflow-y-auto space-y-5 text-[var(--ink)]">
          {/* Quick info badge */}
          <div className="p-3 bg-[var(--bg)] border border-[var(--line)] flex items-start gap-2.5">
            <Info className="w-4 h-4 text-[var(--gold)] flex-shrink-0 mt-0.5" />
            <p className="text-xs text-[var(--mute)] leading-relaxed">
              Esta app funciona como una <strong className="text-[var(--ink)] font-medium">PWA (Progressive Web App)</strong>. No requiere descargar archivos pesados desde Play Store o App Store: se instala y comparte en segundos mediante el enlace o código QR.
            </p>
          </div>

          {/* Quick action: Direct PWA install if available */}
          {isInstallable && !isInstalled && (
            <div className="p-4 bg-[var(--gold)]/10 border border-[var(--gold)] text-center">
              <Sparkles className="w-5 h-5 text-[var(--gold)] mx-auto mb-1.5 animate-bounce" />
              <p className="text-xs font-medium text-[var(--ink)] mb-2.5">
                Tu navegador permite instalar la app con un solo toque:
              </p>
              <button
                onClick={install}
                className="w-full py-2.5 px-4 bg-[var(--gold)] text-black font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
              >
                <Download className="w-4 h-4" />
                Instalar Ahora en tu Teléfono
              </button>
            </div>
          )}

          {isInstalled && (
            <div className="p-3 bg-emerald-950/40 border border-emerald-600/40 text-center">
              <p className="text-xs text-emerald-400 font-medium">
                ✓ Esta app ya se encuentra instalada en tu dispositivo.
              </p>
            </div>
          )}

          {/* Compartir enlace rápido */}
          <div>
            <label className="text-[11px] uppercase tracking-wider text-[var(--gold)] font-medium block mb-1.5">
              Enlace para compartir con otros:
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={appUrl}
                className="flex-1 bg-[var(--bg)] border border-[var(--line)] px-3 py-2 text-xs text-[var(--ink)] font-mono truncate select-all focus:outline-none focus:border-[var(--gold)]"
              />
              <button
                onClick={handleCopy}
                className="px-3 py-2 bg-[var(--bg)] border border-[var(--gold)] text-[var(--gold)] hover:bg-[var(--gold)] hover:text-black transition-all flex items-center gap-1.5 text-xs font-medium flex-shrink-0"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copiado' : 'Copiar'}</span>
              </button>
            </div>

            <div className="flex gap-2 mt-2">
              <button
                onClick={handleWhatsAppShare}
                className="flex-1 py-2 px-3 bg-[#25D366]/15 border border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366]/25 transition-colors text-xs font-medium flex items-center justify-center gap-1.5"
              >
                <Share2 className="w-3.5 h-3.5" />
                Compartir por WhatsApp
              </button>
            </div>
          </div>

          {/* Navigation tabs for instructions */}
          <div className="border-t border-[var(--line)] pt-4">
            <span className="text-[11px] uppercase tracking-wider text-[var(--mute)] block mb-2 font-medium">
              Cómo instalarla paso a paso:
            </span>
            <div className="grid grid-cols-3 gap-1 bg-[var(--bg)] p-1 border border-[var(--line)] mb-4">
              <button
                onClick={() => setActiveTab('android')}
                className={`py-1.5 text-xs font-medium transition-all ${
                  activeTab === 'android'
                    ? 'bg-[var(--card)] text-[var(--gold)] border-b-2 border-[var(--gold)] font-semibold'
                    : 'text-[var(--mute)] hover:text-[var(--ink)]'
                }`}
              >
                Android / Chrome
              </button>
              <button
                onClick={() => setActiveTab('iphone')}
                className={`py-1.5 text-xs font-medium transition-all ${
                  activeTab === 'iphone'
                    ? 'bg-[var(--card)] text-[var(--gold)] border-b-2 border-[var(--gold)] font-semibold'
                    : 'text-[var(--mute)] hover:text-[var(--ink)]'
                }`}
              >
                iPhone / Safari
              </button>
              <button
                onClick={() => setActiveTab('qr')}
                className={`py-1.5 text-xs font-medium transition-all ${
                  activeTab === 'qr'
                    ? 'bg-[var(--card)] text-[var(--gold)] border-b-2 border-[var(--gold)] font-semibold'
                    : 'text-[var(--mute)] hover:text-[var(--ink)]'
                }`}
              >
                Escanear QR
              </button>
            </div>

            {/* TAB: ANDROID */}
            {activeTab === 'android' && (
              <div className="space-y-3 bg-[var(--bg)]/70 p-4 border border-[var(--line)] text-xs">
                <div className="flex gap-3">
                  <span className="w-5 h-5 rounded-full bg-[var(--gold)] text-black flex items-center justify-center font-bold text-[11px] flex-shrink-0">
                    1
                  </span>
                  <p className="leading-relaxed">
                    Abre el enlace en el navegador <strong className="text-[var(--ink)]">Google Chrome</strong> de tu celular.
                  </p>
                </div>
                <div className="flex gap-3">
                  <span className="w-5 h-5 rounded-full bg-[var(--gold)] text-black flex items-center justify-center font-bold text-[11px] flex-shrink-0">
                    2
                  </span>
                  <p className="leading-relaxed">
                    Toca el menú de tres puntos verticales <strong className="text-[var(--gold)] font-bold">(⋮)</strong> en la esquina superior derecha.
                  </p>
                </div>
                <div className="flex gap-3">
                  <span className="w-5 h-5 rounded-full bg-[var(--gold)] text-black flex items-center justify-center font-bold text-[11px] flex-shrink-0">
                    3
                  </span>
                  <p className="leading-relaxed">
                    Selecciona <strong className="text-[var(--gold)]">"Instalar aplicación"</strong> o <strong className="text-[var(--gold)]">"Agregar a la pantalla principal"</strong>.
                  </p>
                </div>
                <div className="flex gap-3">
                  <span className="w-5 h-5 rounded-full bg-[var(--gold)] text-black flex items-center justify-center font-bold text-[11px] flex-shrink-0">
                    4
                  </span>
                  <p className="leading-relaxed text-[var(--mute)]">
                    ¡Listo! Aparecerá el ícono de <strong className="text-[var(--ink)] font-normal">Warhola Gin</strong> junto a tus demás aplicaciones y se abrirá a pantalla completa.
                  </p>
                </div>
              </div>
            )}

            {/* TAB: IPHONE / IOS */}
            {activeTab === 'iphone' && (
              <div className="space-y-3 bg-[var(--bg)]/70 p-4 border border-[var(--line)] text-xs">
                <div className="flex gap-3">
                  <span className="w-5 h-5 rounded-full bg-[var(--gold)] text-black flex items-center justify-center font-bold text-[11px] flex-shrink-0">
                    1
                  </span>
                  <p className="leading-relaxed">
                    Abre el enlace en <strong className="text-[var(--ink)]">Safari</strong> (el navegador oficial de iPhone).
                  </p>
                </div>
                <div className="flex gap-3">
                  <span className="w-5 h-5 rounded-full bg-[var(--gold)] text-black flex items-center justify-center font-bold text-[11px] flex-shrink-0">
                    2
                  </span>
                  <p className="leading-relaxed">
                    Toca el botón <strong className="text-[var(--gold)]">Compartir</strong> (el ícono del cuadrado con la flecha hacia arriba <span className="inline-block px-1 border border-[var(--line)]">⎋</span> en la barra inferior).
                  </p>
                </div>
                <div className="flex gap-3">
                  <span className="w-5 h-5 rounded-full bg-[var(--gold)] text-black flex items-center justify-center font-bold text-[11px] flex-shrink-0">
                    3
                  </span>
                  <p className="leading-relaxed">
                    Baja en las opciones y toca <strong className="text-[var(--gold)]">"Agregar a inicio"</strong> o <strong className="text-[var(--gold)]">"Añadir a pantalla de inicio"</strong> (+).
                  </p>
                </div>
                <div className="flex gap-3">
                  <span className="w-5 h-5 rounded-full bg-[var(--gold)] text-black flex items-center justify-center font-bold text-[11px] flex-shrink-0">
                    4
                  </span>
                  <p className="leading-relaxed text-[var(--mute)]">
                    Toca <strong className="text-[var(--ink)]">Agregar</strong> en la esquina superior derecha. Se creará el ícono en tu pantalla de inicio como una app normal.
                  </p>
                </div>
              </div>
            )}

            {/* TAB: QR CODE */}
            {activeTab === 'qr' && (
              <div className="p-4 bg-[var(--bg)] border border-[var(--line)] text-center flex flex-col items-center">
                <p className="text-xs text-[var(--mute)] mb-3">
                  Apunta la cámara de tu celular hacia este código QR para abrir la app directamente:
                </p>
                <div className="p-3 bg-[#0c0a09] border border-[var(--gold)] shadow-lg inline-block">
                  <img
                    src={qrUrl}
                    alt="Código QR para abrir la app"
                    className="w-48 h-48 block"
                    loading="lazy"
                  />
                </div>
                <span className="text-[10px] uppercase tracking-widest text-[var(--gold)] mt-2 font-mono">
                  WARHOLA GIN · PWA SCAN
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-[var(--line)] bg-[#141010] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 border border-[var(--line)] text-xs text-[var(--mute)] hover:text-[var(--ink)] hover:border-[var(--ink)] transition-colors"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
