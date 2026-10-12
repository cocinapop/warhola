/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import {
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Sun,
  Moon,
  Wine,
  CheckCircle2,
  Share2,
  Droplet,
  GlassWater,
  Smartphone,
  QrCode
} from 'lucide-react';
import { MobileInstallModal } from './components/MobileInstallModal';
import { useOnlineStatus } from './hooks/usePWAInstall';

/* =========================================================================
   1. ARQUITECTURA MODULAR DE DATOS (ESCALABLE PARA 10 EDICIONES)
   ========================================================================= */

export interface BotanicalBranchOption {
  l: string;
  a: string;
  hit?: boolean;
  n?: string;
  f: string;
}

export interface BotanicalPrimaryOption {
  l: string;
  a: string;
  q: string;
  b: BotanicalBranchOption[];
}

export interface TastingLayer {
  k: string;
  t: string;
  s: 'olfato' | 'paladar';
  teach: string;
  tip: string;
  q: string;
  o: BotanicalPrimaryOption[];
}

export interface SensoryAccord {
  b1: string;
  b2: string;
  nombre: string;
  sensacion: string;
  explicacion: string;
}

export interface TonicRing {
  k: string;
  t: string;
  s: 'olfato' | 'paladar';
  tiempo: string;
  tip: string;
  ac: SensoryAccord[];
}

export interface CocktailRecipe {
  nombre: string;
  tag: string;
  cristaleria: string;
  ingredientes: string[];
  garnish: string;
  metodo: string;
  perfil: string;
}

export interface GinEdition {
  id: string;
  nombre: string;
  sub: string;
  tagline: string;
  accentColor: string;
  intro: string;
  ritual: [string, string][];
  capas: TastingLayer[];
  tonica: TonicRing[];
  climax: string;
  alquimia: string;
  historiaEtiqueta: {
    titulo: string;
    personaje: string;
    relato: string;
    notaAutor: string;
  };
  maridaje: [string, string][];
  cocteleria: CocktailRecipe[];
}

export const EDICIONES: Record<string, GinEdition> = {
  bloody: {
    id: 'bloody',
    nombre: 'Warhola Gin',
    sub: 'Edición Bloody',
    tagline: 'A Bloody Mary, Distilled · Gin de Autor',
    accentColor: '#8f171d',
    intro:
      'Tenés en tus manos la Edición Bloody de Warhola Gin. Un destilado de autor que rompe convenciones: capas, matices y acordes que vas a descubrir de a uno con tu nariz y tu paladar. La receta completa y la leyenda detrás de la etiqueta se revelan al final de la cata.',
    ritual: [
      ['La copa Sphere', 'Servilo en copa Sphere: un globo amplio sin tallo para concentrar el mapa aromático.'],
      ['El hielo macizo', 'Hielo abundante, cristalino y macizo para enfriar en segundos sin diluir el destilado.'],
      ['El giro continuo', 'Dos giros suaves para oxigenar el gin y activar los aceites botánicos en las paredes del cristal.']
    ],
    capas: [
      {
        k: 'Base',
        t: 'La base olfativa',
        s: 'olfato',
        teach: 'Esto se huele. Las moléculas aromáticas viajan por la nariz, no por la boca.',
        tip: 'Acercá la nariz al borde de la copa, labios apenas abiertos, y respirá corto tres veces.',
        q: '¿Qué aroma aparece primero?',
        o: [
          {
            l: 'Bosque y resina',
            a: 'Como una ramita de pino o el aire de bosque tras la lluvia.',
            q: "¿Más a pino fresco o a hierba aromática de cocina?",
            b: [
              {
                l: 'Pino fresco',
                a: 'Madera verde, fresca y resinosa.',
                hit: true,
                n: 'Enebro alpino',
                f: 'Esa nota resinosa es el enebro silvestre, la baya sagrada que define a todo gin auténtico. Ya tenés la primera capa en foco.'
              },
              {
                l: 'Hierba de cocina',
                a: 'Tomillo, romero, orégano seco.',
                hit: false,
                f: 'Es una pista muy cercana. Volvé a oler buscando algo más de bosque vivo y corteza que de alacena: ese es el enebro.'
              }
            ]
          },
          {
            l: 'Cítrico seco',
            a: 'Cáscara rallada de limón o pomelo, no su zumo líquido.',
            q: '¿Cáscara fresca oleosa o semilla seca especiada?',
            b: [
              {
                l: 'Semilla especiada',
                a: 'Cítrica, tostada, un poco anisada.',
                hit: true,
                n: 'Coriandro tostado',
                f: '¡Exacto! Es el coriandro. La semilla tostada aporta ese perfil cítrico y seco que no proviene de frutas ácidas.'
              },
              {
                l: 'Cáscara fresca oleosa',
                a: 'Aceite vivo de fruta recién cortada.',
                hit: false,
                f: 'Hay una nota cítrica brillante, sí. Pero volvé a oler buscando la semilla seca y terrosa: ahí late el coriandro.'
              }
            ]
          }
        ]
      },
      {
        k: 'Vegetal',
        t: 'La capa vegetal de huerta',
        s: 'olfato',
        teach:
          'Sigue siendo olfato. Lo verde se aprende con anclas reales: nadie reconoce "planta de tomate" si nunca frotó sus hojas entre los dedos.',
        tip: 'Imaginá el aroma que te queda en las manos al tocar plantas de huerto bajo el sol estival.',
        q: '¿Qué nota verde sentís?',
        o: [
          {
            l: 'Verde punzante',
            a: 'El perfume intenso que desprenden las plantas vivas al rozarlas.',
            q: '¿Es hierba recién cortada o tallo y hoja de huerta frotada?',
            b: [
              {
                l: 'Tallo y hoja frotada',
                a: 'Verde oscuro, algo amargo y balsámico.',
                hit: true,
                n: 'Planta de tomate destilada',
                f: '¡Magistral! Esa es la planta de tomate destilada en alambique de cobre. La mayoría pasa por alto este botánico de autor; vos lo atrapaste.'
              },
              {
                l: 'Hierba cortada',
                a: 'Verde fresco, suave, de parque.',
                hit: false,
                f: 'Es verde, pero más liviano. Frotá mentalmente una hoja de huerto y buscá una intensidad más amarga: ahí está la planta de tomate.'
              }
            ]
          },
          {
            l: 'Fresco y acuoso',
            a: 'Crujiente, limpio, fibroso, casi sin azúcar.',
            q: '¿Como tallo crujiente de apio o como pepino?',
            b: [
              {
                l: 'Tallo de apio',
                a: 'Verde, fibroso, con un fondo apenas salino.',
                hit: true,
                n: 'Apio de huerta',
                f: 'Eso es el apio fresco: arquitectura vegetal crujiente que aporta frescura y una sutil salinidad natural.'
              },
              {
                l: 'Pepino',
                a: 'Más dulce, acuoso y frutal.',
                hit: false,
                f: 'Se asemeja mucho por su frescura acuosa. Buscá algo más fibroso y salino en el final: ese es el apio.'
              }
            ]
          }
        ]
      },
      {
        k: 'Paladar',
        t: 'Paladar, textura y umami',
        s: 'paladar',
        teach:
          'Acá cambia el sentido: esto ya no se huele, se siente en boca. El umami y la salinidad estimulan los laterales de la lengua y activan la saliva.',
        tip: 'Un sorbo pequeño, recorré toda la boca y tragá despacio. Quedate unos segundos en silencio: ¿qué le pasa a tu saliva?',
        q: '¿Qué sentís físicamente en la boca?',
        o: [
          {
            l: 'Salivación instantánea',
            a: 'Como al saborear un caldo concentrado, parmesano curado o salmuera.',
            q: '¿Es salado concentrado o umami profundo y redondeado?',
            b: [
              {
                l: 'Salado concentrado',
                a: 'Como una aceituna o una alcaparra.',
                hit: true,
                n: 'Tomate seco y alcaparra',
                f: '¡Brillante! Salinidad botánica concentrada: tomate seco liofilizado y alcaparras, que actúan en la lengua y no en la nariz.'
              },
              {
                l: 'Umami profundo y redondo',
                a: 'Sabroso, largo, envolvente, sin aristas.',
                hit: true,
                n: 'Salsa inglesa artesanal',
                f: 'Ese es el umami en estado puro. En Edición Bloody lo aporta una maceración sutil de salsa inglesa tradicional.'
              }
            ]
          },
          {
            l: 'Calor tibio y humo suave',
            a: 'Pimiento asado a la brasa. No es picante agresivo.',
            q: '¿Ardor punzante o un cosquilleo templado que sube despacio?',
            b: [
              {
                l: 'Cosquilleo templado',
                a: 'Calor amable en el pecho tras tragar.',
                hit: true,
                n: 'Jalapeño ahumado',
                f: 'Ese calor amable con rastro de leña es el jalapeño deshidratado en horno de brasas. Da longitud sin tapar los botánicos.'
              },
              {
                l: 'Ardor punzante',
                a: 'Pica en la punta de la lengua.',
                hit: false,
                f: 'En Warhola Gin el jalapeño es noble y templado. Buscá un calor reconfortante en retrogusto, nunca un picor abrasivo.'
              }
            ]
          },
          {
            l: 'Textura sedosa',
            a: 'Untuoso, envolvente, casi aterciopelado, sin golpe alcohólico.',
            q: '¿Es una sensación aceitosa pesada o un terciopelo limpio?',
            b: [
              {
                l: 'Terciopelo limpio',
                a: 'Cuerpo suave que acaricia el paladar.',
                hit: true,
                n: 'Base de vodka de papa artesanal',
                f: 'Esa sedosidad es el secreto maestro: nuestra base de vodka de papa fermentada y destilada en casa. Textura táctil antes que sabor.'
              },
              {
                l: 'Aceitosa pesada',
                a: 'Sensación grasa en el paladar.',
                hit: false,
                f: 'Casi. Buscá la caricia limpia y sedosa que arropa la lengua sin dejar película grasa: es la base pura de papa artesanal.'
              }
            ]
          }
        ]
      }
    ],
    tonica: [
      {
        k: 'Salida',
        t: 'Salida: moléculas volátiles',
        s: 'olfato',
        tiempo: 'Los primeros 10 segundos',
        tip: 'Acercá la nariz mientras sube la efervescencia. Lo más liviano escapa primero al aire.',
        ac: [
          {
            b1: 'la hoja de tomate',
            b2: 'el apio',
            nombre: 'Verde Luminoso',
            sensacion: 'un destello verde brillante e hiperfresco',
            explicacion: 'crea una vibración vegetal más intensa que cada botánico en solitario'
          },
          {
            b1: 'el enebro',
            b2: 'el coriandro',
            nombre: 'Bosque Cítrico',
            sensacion: 'un pinar soleado con cáscara de cítricos',
            explicacion: 'la resina del pino y el grano cítrico seco se ensamblan en un acorde clásico'
          },
          {
            b1: 'la planta de tomate',
            b2: 'el coriandro',
            nombre: 'Verde Punzante',
            sensacion: 'un verde fresco con filo eléctrico',
            explicacion: 'aporta una chispa ácida viva que potencia la burbuja de la tónica'
          }
        ]
      },
      {
        k: 'Corazón',
        t: 'Corazón: la estructura aromática',
        s: 'olfato',
        tiempo: 'Después de 30 segundos',
        tip: 'Girá suavemente la copa y aguardá. La efervescencia se estabiliza y el centro se ordena.',
        ac: [
          {
            b1: 'el tomate fresco',
            b2: 'la base floral',
            nombre: 'Jugo Floral',
            sensacion: 'tomate maduro recién abierto con perfume suave',
            explicacion: 'fruta jugosa y dulzor aterciopelado en equilibrio exacto'
          },
          {
            b1: 'el enebro',
            b2: 'las especias',
            nombre: 'Bosque Especiado',
            sensacion: 'madera noble con pimienta tibia',
            explicacion: 'la columna vertebral que sostiene la copa en todo su recorrido'
          },
          {
            b1: 'el apio',
            b2: 'el tomate fresco',
            nombre: 'Huerta Fresca',
            sensacion: 'aroma de ensalada viva de huerto de verano',
            explicacion: 'la savia fibrosa y el dulzor de la pulpa se potencian mutuamente'
          }
        ]
      },
      {
        k: 'Fondo',
        t: 'Fondo: la persistencia y el umami',
        s: 'paladar',
        tiempo: 'Después de tragar el sorbo',
        tip: 'Tragá el sorbo y quedate quieto. Contá diez segundos y registrá el retrogusto.',
        ac: [
          {
            b1: 'el tomate seco',
            b2: 'la alcaparra',
            nombre: 'Salinidad Profunda',
            sensacion: 'sal concentrada que hace brotar saliva continua',
            explicacion: 'salmuera botánica que perdura más de un minuto en retrogusto'
          },
          {
            b1: 'el jalapeño',
            b2: 'la salsa inglesa',
            nombre: 'Calor Umami',
            sensacion: 'calor tibio y sabroso con brasa de fondo',
            explicacion: 'el umami fermentado y el humo suave prolongan la memoria en boca'
          },
          {
            b1: 'el tomate seco',
            b2: 'el jalapeño',
            nombre: 'Dulzor Ahumado',
            sensacion: 'tomate asado a la parrilla de leña',
            explicacion: 'azúcares naturales concentrados que se funden con el ahumado'
          }
        ]
      }
    ],
    climax: 'Lo que acabás de decodificar en tu copa es nuestra Edición Bloody.',
    alquimia:
      'Una base propia de vodka artesanal de papa fermentado y destilado en alambique propio, que otorga untuosidad y suavidad sedosa, combinada con un destilado de cereal tradicional con enebro y coriandro. Sobre esa base reposa la trilogía de tomates (fresco, seco curado y planta destilada en cobre), tallo de apio, jalapeño ahumado a la brasa, salsa inglesa y alcaparras.',
    historiaEtiqueta: {
      titulo: 'La Leyenda detrás de la Etiqueta',
      personaje: 'Mary Tudor & El Mito del Bloody Reeditado',
      relato:
        'La ilustración de la etiqueta rinde tributo a María I de Inglaterra —conocida en la leyenda popular como Mary Tudor—, figura a la que históricamente se le asoció el nacimiento mítico del cóctel Bloody Mary. En esta edición decidimos rescatar ese mito no mediante salsas pesadas ni jugos industriales, sino destilando su alma: transformamos el mito de Mary Tudor en un gin cristalino gastronómico, donde la salinidad, el umami y el tomate viven en armonía sin precedentes.',
      notaAutor: 'Destilado en pequeños lotes con paciencia de perfumista y precisión de cocinero.'
    },
    maridaje: [
      ['Pescados grasos', 'La salinidad y el umami limpian el paladar y acompañan el bocado.'],
      ['Mariscos a la brasa', 'La acidez vegetal fresca resalta la dulzura natural del mar.'],
      ['Ceviches & Tiraditos', 'Frescura botánica y salmuera viva en sincronía perfecta.'],
      ['Cocina de huerta', 'Tomates reliquia, apio tierno y salmueras vivas en la mesa.']
    ],
    cocteleria: [
      {
        nombre: 'Bloody Red Snapper de Autor',
        tag: 'El Clásico Reinterpretado',
        cristaleria: 'Copa Sphere o Vaso Highball con hielo macizo',
        ingredientes: [
          '60 ml Warhola Gin · Edición Bloody',
          '120 ml Agua de tomate clarificada fresca (o filtrado fino)',
          '15 ml Jugo fresco de limón sutil',
          '2 gotas de salsa inglesa artesanal',
          'Pizca de sal marina en escamas y pimienta negra'
        ],
        garnish: 'Tallo tierno de apio de huerta y tomate cherry perforado',
        metodo: 'Integrar suavemente en vaso mezclador con hielo y colar sobre la copa fría. No batir enérgicamente para conservar el brillo cristalino.',
        perfil: 'Umami puro, refrescante, cristalino y elegante.'
      },
      {
        nombre: 'Dry Martini Umami',
        tag: 'Aperitivo de Alta Complejidad',
        cristaleria: 'Copa Nick & Nora o Martini clásica pre-enfriada a -18°C',
        ingredientes: [
          '60 ml Warhola Gin · Edición Bloody',
          '10 ml Vermouth Dry extra seco de autor',
          '2 barspoons de salmuera de alcaparras'
        ],
        garnish: 'Alcaparrón curado y piel de tomate seco',
        metodo: 'Refrescar en vaso mezclador durante 25 segundos con hielo macizo hasta alcanzar temperatura glacial. Servir colado fino.',
        perfil: 'Salino, denso, seco y profundamente sofisticado.'
      },
      {
        nombre: 'Bloody & Tonic de la Casa',
        tag: 'El Perfect Serve Diario',
        cristaleria: 'Copa Sphere con abundante hielo de roca clara',
        ingredientes: [
          '50 ml Warhola Gin · Edición Bloody',
          '150 ml Tónica neutra premium (baja en azúcar)',
          'Espacio para oxigenación'
        ],
        garnish: 'Lámina fina de jalapeño fresco y ramita de romero palmeada',
        metodo: 'Servir el gin sobre el hielo, verter la tónica suavemente deslizándola por la cuchara imperial para conservar la burbuja intacta.',
        perfil: 'Burbuja vibrante, notas herbales y un cosquilleo ahumado sutil.'
      }
    ]
  }
};

/* =========================================================================
   2. COMPONENTE PRINCIPAL
   ========================================================================= */

export default function App() {
  const currentEdition = EDICIONES.bloody;

  const [phaseIndex, setPhaseIndex] = useState<number>(0);
  const [layerIndex, setLayerIndex] = useState<number>(0);
  const [primarySelections, setPrimarySelections] = useState<number[]>(() =>
    currentEdition.capas.map(() => -1)
  );
  const [branchSelections, setBranchSelections] = useState<number[]>(() =>
    currentEdition.capas.map(() => -1)
  );
  const [discoveredNotes, setDiscoveredNotes] = useState<string[]>([]);
  const [tonicActive, setTonicActive] = useState<boolean>(false);
  const [selectedAccord, setSelectedAccord] = useState<{ ring: number; item: number } | null>({
    ring: 0,
    item: 0
  });
  const [accordAnswers, setAccordAnswers] = useState<Record<string, number>>({});
  const [activeCocktailTab, setActiveCocktailTab] = useState<number>(0);
  const [copyFeedback, setCopyFeedback] = useState<boolean>(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [isInstallModalOpen, setIsInstallModalOpen] = useState<boolean>(false);
  const isOnline = useOnlineStatus();

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    if (nextTheme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.removeAttribute('data-theme');
      document.documentElement.classList.remove('light');
    }
  };

  const goToPhase = (p: number, l?: number) => {
    setPhaseIndex(p);
    if (l !== undefined) setLayerIndex(l);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectPrimary = (optIdx: number) => {
    const updatedPrim = [...primarySelections];
    updatedPrim[layerIndex] = optIdx;
    setPrimarySelections(updatedPrim);

    const updatedBranch = [...branchSelections];
    updatedBranch[layerIndex] = -1;
    setBranchSelections(updatedBranch);
  };

  const handleSelectBranch = (branchIdx: number) => {
    const currentLayer = currentEdition.capas[layerIndex];
    const selectedPrimIdx = primarySelections[layerIndex];
    if (selectedPrimIdx === -1 || selectedPrimIdx === 99) return;

    const branch = currentLayer.o[selectedPrimIdx]?.b[branchIdx];
    const updatedBranch = [...branchSelections];
    updatedBranch[layerIndex] = branchIdx;
    setBranchSelections(updatedBranch);

    if (branch && branch.hit && branch.n && !discoveredNotes.includes(branch.n)) {
      setDiscoveredNotes((prev) => [...prev, branch.n!]);
    }
  };

  const handleSkipOrUndecided = () => {
    const updatedPrim = [...primarySelections];
    updatedPrim[layerIndex] = 99;
    setPrimarySelections(updatedPrim);

    const updatedBranch = [...branchSelections];
    updatedBranch[layerIndex] = -1;
    setBranchSelections(updatedBranch);
  };

  const handleSelectAccordArc = (ring: number, item: number) => {
    setSelectedAccord({ ring, item });
  };

  const handleAnswerAccord = (fusionType: number) => {
    if (!selectedAccord) return;
    const key = `${selectedAccord.ring}-${selectedAccord.item}`;
    setAccordAnswers((prev) => ({ ...prev, [key]: fusionType }));

    const accord = currentEdition.tonica[selectedAccord.ring]?.ac[selectedAccord.item];
    if (fusionType === 0 && accord && !discoveredNotes.includes(accord.nombre)) {
      setDiscoveredNotes((prev) => [...prev, accord.nombre]);
    }
  };

  const isRingUnlocked = (ringIdx: number) => {
    if (ringIdx === 0) return true;
    const prevRing = currentEdition.tonica[ringIdx - 1];
    if (!prevRing) return true;
    return prevRing.ac.some((_, i) => accordAnswers[`${ringIdx - 1}-${i}`] !== undefined);
  };

  const allRingsExplored = useMemo(() => {
    return currentEdition.tonica.every((ring, rIdx) =>
      ring.ac.some((_, i) => accordAnswers[`${rIdx}-${i}`] !== undefined)
    );
  }, [currentEdition, accordAnswers]);

  const handleShareSummary = () => {
    const summary = `🍸 Warhola Gin · Edición Bloody\nNotas descubiertas en cata: ${
      discoveredNotes.length > 0 ? discoveredNotes.join(', ') : 'Notas botánicas de autor'
    }\nA Bloody Mary, Distilled.\nSommelier & Perfumista Digital.`;
    navigator.clipboard.writeText(summary);
    setCopyFeedback(true);
    setTimeout(() => setCopyFeedback(false), 2400);
  };

  const FASES_TITULOS = ['Ritual', 'En Puro', 'Con Tónica', 'Revelación'];

  return (
    <div className="min-h-screen bg-deep-editorial transition-colors duration-300 flex flex-col justify-between max-w-[480px] mx-auto px-5 pt-4 pb-12 safe-padding-top safe-padding-bottom selection:bg-[#8f171d] selection:text-white">
      {/* ===================================================================
          1. HEADER LIMPIO, MINIMALISTA Y REFINADO (SIN LA PALABRA GASTRONOMÍA)
          =================================================================== */}
      <header className="mb-6">
        <div className="flex items-center justify-between pb-3 border-b border-[var(--line)]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full border border-[var(--gold)] flex items-center justify-center bg-[var(--card)] shadow-xs">
              <span className="serif text-xs font-semibold tracking-tighter text-[var(--gold)]">W</span>
            </div>

            <div>
              <span className="eyebrow block tracking-[0.24em] text-[var(--gold)]">WARHOLA GIN</span>
              <h1 className="serif text-xl sm:text-2xl font-normal tracking-tight text-[var(--ink)] m-0 leading-none mt-0.5">
                Edición Bloody
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsInstallModalOpen(true)}
              className="px-2.5 py-1.5 border border-[var(--gold)]/60 text-[var(--gold)] hover:bg-[var(--gold)] hover:text-black bg-[var(--card)] transition-colors flex items-center gap-1.5 text-[11px] font-medium tracking-wider uppercase"
              title="Instalar en celular o compartir"
              aria-label="Instalar en celular"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Instalar</span>
            </button>

            <button
              onClick={toggleTheme}
              className="p-1.5 border border-[var(--line)] text-[var(--mute)] hover:text-[var(--gold)] bg-[var(--card)] transition-colors rounded-xs"
              title="Alternar modo oscuro / claro"
              aria-label="Alternar tema"
            >
              {theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-[var(--gold)]" /> : <Moon className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* NAVEGADOR DE FASES DE CATA */}
        <nav className="flex gap-1.5 mt-3">
          {FASES_TITULOS.map((fase, i) => {
            const isCompletedOrActive = i <= phaseIndex;
            const isCurrent = i === phaseIndex;
            return (
              <button
                key={fase}
                onClick={() => goToPhase(i)}
                className={`flex-1 text-left pt-2 pb-1 border-t transition-all ${
                  isCompletedOrActive ? 'border-[var(--gold)]' : 'border-[var(--line)]'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  {isCurrent && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--ac)] inline-block animate-pulse" />
                  )}
                  <span
                    className={`text-[9.5px] uppercase tracking-[0.14em] block ${
                      isCompletedOrActive ? 'text-[var(--ink)] font-semibold' : 'text-[var(--mute)]'
                    }`}
                  >
                    {fase}
                  </span>
                </div>
              </button>
            );
          })}
        </nav>
      </header>

      {/* ===================================================================
          2. CONTENIDO DINÁMICO DE CATA
          =================================================================== */}
      <main className="flex-grow flex flex-col justify-start">
        {/* =================================================================
            FASE 0: RITUAL Y PRESENTACIÓN DE EDICIÓN BLOODY
            ================================================================= */}
        {phaseIndex === 0 && (
          <div className="anim-fade-in">
            <span className="eyebrow block text-[var(--gold)]">Sommelier & Perfumista Digital</span>
            <h1 className="serif text-3xl sm:text-4xl leading-tight my-2 text-[var(--ink)]">
              Tu botella <em>Edición Bloody</em>
            </h1>
            <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--ac)] font-semibold mb-4">
              {currentEdition.tagline}
            </p>

            <p className="text-[14.5px] leading-relaxed text-[var(--ink)] font-normal mb-6">
              {currentEdition.intro}
            </p>

            <div className="h-[1px] bg-[var(--line)] my-5" />

            {/* RITUAL DE SERVICIO EN COPA */}
            <div className="my-6">
              <span className="eyebrow block mb-3 text-[var(--gold)]">El ritual de servicio en copa</span>
              <div className="space-y-3">
                {currentEdition.ritual.map((r, i) => (
                  <div
                    key={i}
                    className="card-tactile flex items-start gap-4 p-3.5 bg-[var(--card)] border border-[var(--line)] hover:border-[var(--gold)]"
                  >
                    <span className="serif text-2xl font-light text-[var(--gold)] leading-none w-6 text-center">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="serif text-lg font-semibold text-[var(--ink)] leading-tight mb-1">
                        {r[0]}
                      </h3>
                      <p className="text-xs text-[var(--mute)] leading-relaxed m-0">{r[1]}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button onClick={() => goToPhase(1, 0)} className="btn-author mt-6 group">
              <span>Iniciar cata en puro</span>
              <span className="transition-transform group-hover:translate-x-1.5 group-active:translate-x-1.5">
                →
              </span>
            </button>
          </div>
        )}

        {/* =================================================================
            FASE 1: EN PURO // CABECERA BODEGÓN BOTÁNICOS 56441.jpg
            ================================================================= */}
        {phaseIndex === 1 && (
          <div className="anim-fade-in">
            <div className="flex items-center justify-between mb-2">
              <span className="eyebrow text-[var(--gold)]">Fase 1 · En puro</span>
              <span className="text-[10px] uppercase tracking-widest font-semibold px-2 py-0.5 border border-[var(--ac)] text-[var(--ac)] bg-[var(--ac-soft)] rounded-full">
                {currentEdition.capas[layerIndex]?.s === 'olfato' ? 'Olfato' : 'Paladar y Umami'}
              </span>
            </div>

            {/* Sub-indicador de capas */}
            <div className="flex gap-2 my-3">
              {currentEdition.capas.map((capa, idx) => (
                <button
                  key={capa.k}
                  onClick={() => setLayerIndex(idx)}
                  className="flex-1 text-left pb-1 transition-all"
                >
                  <div
                    className={`h-[3px] mb-1.5 transition-all duration-300 ${
                      idx < layerIndex
                        ? 'bg-[var(--gold)]'
                        : idx === layerIndex
                        ? 'bg-[var(--ac)]'
                        : 'bg-[var(--line)]'
                    }`}
                  />
                  <span
                    className={`text-[9.5px] uppercase tracking-wider block ${
                      idx === layerIndex ? 'text-[var(--ink)] font-bold' : 'text-[var(--mute)]'
                    }`}
                  >
                    {capa.k}
                  </span>
                </button>
              ))}
            </div>

            {(() => {
              const currentLayer = currentEdition.capas[layerIndex];
              const selPrimIdx = primarySelections[layerIndex];
              const selBranchIdx = branchSelections[layerIndex];
              const chosenPrim = selPrimIdx !== -1 && selPrimIdx !== 99 ? currentLayer.o[selPrimIdx] : null;
              const chosenBranch =
                chosenPrim && selBranchIdx !== -1 ? chosenPrim.b[selBranchIdx] : null;
              const isLayerCompleted = chosenBranch !== null || selPrimIdx === 99;

              return (
                <div className="mt-3">
                  <h2 className="serif text-3xl font-normal text-[var(--ink)] leading-tight mb-2">
                    {currentLayer.t}
                  </h2>
                  <p className="text-[14px] leading-relaxed text-[var(--ink)] mb-3">
                    {currentLayer.teach}
                  </p>


                  {/* Estado de exploración sensorial */}
                  <div className="my-3 p-3 bg-[var(--card)] border border-[var(--line)] flex items-center justify-between text-xs">
                    <span className="text-[var(--gold)] uppercase tracking-wider font-semibold">
                      {currentLayer.s === 'olfato' ? 'Fase Olfativa' : 'Fase Gustativa y Umami'}
                    </span>
                    <span className="text-[var(--mute)]">
                      {chosenBranch ? `Identificado: ${chosenBranch.l}` : chosenPrim ? `Explorando: ${chosenPrim.l}` : 'Selecciona una nota sensorial abajo'}
                    </span>
                  </div>

                  {/* Consejo del Sommelier */}
                  <div className="p-3 my-3 border-l-2 border-[var(--ac)] bg-[var(--ac-soft)] text-xs text-[var(--ink)] leading-relaxed italic">
                    <span className="font-semibold not-italic block uppercase tracking-wider text-[9.5px] text-[var(--gold)] mb-0.5">
                      Consejo del Sommelier:
                    </span>
                    {currentLayer.tip}
                  </div>

                  <span className="eyebrow block mt-5 mb-2.5">{currentLayer.q}</span>

                  {/* Opciones con respuesta táctil */}
                  <div className="space-y-2.5">
                    {currentLayer.o.map((opt, oIdx) => {
                      const isPrimSelected = selPrimIdx === oIdx;

                      return (
                        <div key={oIdx} className="transition-all">
                          <button
                            onClick={() => handleSelectPrimary(oIdx)}
                            className={`card-tactile w-full text-left p-3.5 bg-[var(--card)] border ${
                              isPrimSelected
                                ? 'border-[var(--gold)] shadow-xs'
                                : 'border-[var(--line)] hover:border-[var(--mute)]'
                            }`}
                          >
                            <span className="serif text-xl font-semibold text-[var(--ink)] block leading-tight">
                              {opt.l}
                            </span>
                            <span className="text-xs text-[var(--mute)] mt-1 block leading-normal">
                              {opt.a}
                            </span>
                          </button>

                          {/* Ramificación desplegable */}
                          {isPrimSelected && (
                            <div className="ml-3 pl-3.5 my-3 border-l-2 border-[var(--gold)] anim-branch">
                              <span className="eyebrow block mb-2 text-[var(--gold)]">
                                {opt.q}
                              </span>

                              <div className="space-y-2">
                                {opt.b.map((branchOpt, bIdx) => {
                                  const isBranchSelected = selBranchIdx === bIdx;

                                  return (
                                    <button
                                      key={bIdx}
                                      onClick={() => handleSelectBranch(bIdx)}
                                      className={`card-tactile w-full text-left p-3 bg-[var(--card)] border ${
                                        isBranchSelected
                                          ? branchOpt.hit
                                            ? 'border-[var(--ac)] bg-[var(--ac-soft)]'
                                            : 'border-[var(--gold)]'
                                          : 'border-[var(--line)] hover:border-[var(--mute)]'
                                      }`}
                                    >
                                      <div className="flex items-center justify-between">
                                        <span className="serif text-lg font-semibold text-[var(--ink)]">
                                          {branchOpt.l}
                                        </span>
                                        {isBranchSelected && branchOpt.hit && (
                                          <CheckCircle2 className="w-4 h-4 text-[var(--gold)]" />
                                        )}
                                      </div>
                                      <span className="text-xs text-[var(--mute)] block mt-0.5">
                                        {branchOpt.a}
                                      </span>
                                    </button>
                                  );
                                })}
                              </div>

                              {chosenBranch && (
                                <div
                                  className={`mt-3 p-3.5 border-l-2 text-xs leading-relaxed anim-fade-in ${
                                    chosenBranch.hit
                                      ? 'border-[var(--ac)] bg-[var(--ac-soft)] text-[var(--ink)]'
                                      : 'border-[var(--line)] bg-[var(--card)] text-[var(--mute)]'
                                  }`}
                                >
                                  <span className="serif text-base font-semibold block text-[var(--gold)] mb-0.5">
                                    {chosenBranch.hit ? '¡Exacto!' : 'Una pista cercana...'}
                                  </span>
                                  {chosenBranch.f}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}

                    <button
                      onClick={handleSkipOrUndecided}
                      className={`card-tactile w-full text-left p-3 bg-transparent border border-dashed transition-all mt-3 ${
                        selPrimIdx === 99
                          ? 'border-[var(--gold)] bg-[var(--card)]'
                          : 'border-[var(--line)] hover:border-[var(--mute)]'
                      }`}
                    >
                      <span className="serif text-lg font-normal text-[var(--mute)] block leading-tight">
                        Todavía no lo distingo claramente
                      </span>
                      <span className="text-[11px] text-[var(--mute)] italic block mt-0.5">
                        Es totalmente normal: el paladar se calibra paso a paso.
                      </span>
                    </button>

                    {selPrimIdx === 99 && (
                      <div className="p-3 bg-[var(--card)] border-l-2 border-[var(--line)] text-xs text-[var(--mute)] leading-relaxed anim-fade-in">
                        {currentLayer.tip}
                      </div>
                    )}
                  </div>

                  <div className="mt-8 space-y-2">
                    <button
                      disabled={!isLayerCompleted}
                      onClick={() => {
                        if (layerIndex < currentEdition.capas.length - 1) {
                          setLayerIndex(layerIndex + 1);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        } else {
                          goToPhase(2);
                        }
                      }}
                      className="btn-author group"
                    >
                      <span>
                        {layerIndex < currentEdition.capas.length - 1
                          ? `Siguiente capa: ${currentEdition.capas[layerIndex + 1]?.k}`
                          : 'Añadir la tónica'}
                      </span>
                      <span className="transition-transform group-hover:translate-x-1.5 group-active:translate-x-1.5">
                        →
                      </span>
                    </button>

                    <button
                      onClick={() => {
                        if (layerIndex > 0) {
                          setLayerIndex(layerIndex - 1);
                        } else {
                          goToPhase(0);
                        }
                      }}
                      className="w-full text-center py-2 text-xs uppercase tracking-widest text-[var(--mute)] hover:text-[var(--gold)] transition-colors"
                    >
                      Volver
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* =================================================================
            FASE 2: CON TÓNICA // ACORDES SENSORIALES
            ================================================================= */}
        {phaseIndex === 2 && (
          <div className="anim-fade-in">
            <span className="eyebrow block text-[var(--gold)]">Fase 2 · Con tónica</span>
            <h2 className="serif text-3xl sm:text-4xl font-normal text-[var(--ink)] leading-tight my-2">
              Acordes sensoriales
            </h2>
            <p className="text-[14px] leading-relaxed text-[var(--ink)] mb-4">
              La burbuja no solo abre notas sueltas: une dos botánicos y crea un aroma nuevo que ninguno
              posee por separado. Eso es un <em>acorde</em>. Recorré el círculo desde afuera hacia
              adentro: <strong>Salida</strong>, <strong>Corazón</strong> y <strong>Fondo</strong>.
            </p>

            {!tonicActive ? (
              <div className="p-6 bg-[var(--card)] border border-[var(--line)] text-center my-6">
                <Wine className="w-8 h-8 text-[var(--gold)] mx-auto mb-3 stroke-1" />
                <h3 className="serif text-2xl font-normal text-[var(--ink)] mb-2">
                  Momento de servir la tónica
                </h3>
                <p className="text-xs text-[var(--mute)] max-w-xs mx-auto mb-5 leading-relaxed">
                  Vierte 200ml de tónica seca fría deslizándola suavemente por la copa para no
                  romper la burbuja.
                </p>
                <button
                  onClick={() => setTonicActive(true)}
                  className="btn-author max-w-xs mx-auto group"
                >
                  <span>Agregar la tónica</span>
                  <span className="transition-transform group-hover:translate-x-1.5 group-active:translate-x-1.5">
                    →
                  </span>
                </button>
              </div>
            ) : (
              <div>
                <div className="relative h-8 overflow-hidden my-1">
                  {[12, 28, 44, 60, 76, 90].map((leftPct, bIdx) => (
                    <i
                      key={bIdx}
                      className="bubble-particle"
                      style={{
                        left: `${leftPct}%`,
                        width: `${5 + (bIdx % 3)}px`,
                        height: `${5 + (bIdx % 3)}px`,
                        animationDelay: `${bIdx * 0.45}s`
                      }}
                    />
                  ))}
                </div>

                {/* RUEDA VECTORIAL DE ACORDES */}
                <div className="relative my-3">
                  <div className="w-full max-w-[320px] mx-auto">
                    <svg viewBox="0 0 300 300" className="w-full h-auto select-none">
                      {[
                        { rIdx: 0, rInner: 105, rOuter: 140 },
                        { rIdx: 1, rInner: 72, rOuter: 103 },
                        { rIdx: 2, rInner: 40, rOuter: 70 }
                      ].map(({ rIdx, rInner, rOuter }) => {
                        const isUnlocked = isRingUnlocked(rIdx);
                        const ringData = currentEdition.tonica[rIdx];
                        if (!ringData) return null;

                        return (
                          <g key={rIdx} opacity={isUnlocked ? 1 : 0.32}>
                            {ringData.ac.map((accord, aIdx) => {
                              const angleStep = (2 * Math.PI) / ringData.ac.length;
                              const aStart = aIdx * angleStep - Math.PI / 2 + 0.05;
                              const aEnd = (aIdx + 1) * angleStep - Math.PI / 2 - 0.05;
                              const c = 150;

                              const pt = (radius: number, angle: number) => [
                                c + radius * Math.cos(angle),
                                c + radius * Math.sin(angle)
                              ];

                              const p0 = pt(rOuter, aStart);
                              const p1 = pt(rOuter, aEnd);
                              const p2 = pt(rInner, aEnd);
                              const p3 = pt(rInner, aStart);

                              const pathD = `M ${p0[0]} ${p0[1]} A ${rOuter} ${rOuter} 0 0 1 ${p1[0]} ${p1[1]} L ${p2[0]} ${p2[1]} A ${rInner} ${rInner} 0 0 0 ${p3[0]} ${p3[1]} Z`;

                              const midAngle = (aStart + aEnd) / 2;
                              const midRadius = (rInner + rOuter) / 2;
                              const midPos = pt(midRadius, midAngle);

                              const accordKey = `${rIdx}-${aIdx}`;
                              const isSelected =
                                selectedAccord?.ring === rIdx && selectedAccord?.item === aIdx;
                              const isDiscovered = accordAnswers[accordKey] === 0;

                              return (
                                <g
                                  key={aIdx}
                                  onClick={() => isUnlocked && handleSelectAccordArc(rIdx, aIdx)}
                                  className="cursor-pointer"
                                >
                                  <path
                                    d={pathD}
                                    className={`wheel-path ${isSelected ? 'active' : ''} ${
                                      isDiscovered ? 'discovered' : ''
                                    }`}
                                  />
                                  <circle
                                    cx={midPos[0] - 5}
                                    cy={midPos[1]}
                                    r="6"
                                    className="wheel-circle-marker"
                                  />
                                  <circle
                                    cx={midPos[0] + 5}
                                    cy={midPos[1]}
                                    r="6"
                                    className="wheel-circle-marker"
                                  />
                                </g>
                              );
                            })}
                          </g>
                        );
                      })}

                      <circle cx="150" cy="150" r="34" fill="var(--card)" stroke="var(--ink)" strokeWidth="1" />
                      <text
                        x="150"
                        y="148"
                        textAnchor="middle"
                        className="serif text-xs fill-[var(--ink)] font-semibold tracking-widest uppercase pointer-events-none"
                      >
                        ACORDES
                      </text>
                      <text
                        x="150"
                        y="161"
                        textAnchor="middle"
                        className="text-[8px] fill-[var(--mute)] pointer-events-none"
                      >
                        toca un arco
                      </text>
                    </svg>
                  </div>

                  <div className="text-[10px] uppercase tracking-widest text-[var(--mute)] text-center mt-2">
                    Anillo exterior: Salida · Medio: Corazón · Interior: Fondo
                  </div>
                </div>

                {selectedAccord && (
                  <div className="mt-5 p-4 bg-[var(--card)] border border-[var(--line)] anim-fade-in">
                    {(() => {
                      const ring = currentEdition.tonica[selectedAccord.ring];
                      const accord = ring?.ac[selectedAccord.item];
                      if (!ring || !accord) return null;

                      const key = `${selectedAccord.ring}-${selectedAccord.item}`;
                      const answer = accordAnswers[key];

                      return (
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] uppercase tracking-widest text-[var(--gold)] font-semibold">
                              {ring.t} · {ring.tiempo}
                            </span>
                            <span className="text-[10px] text-[var(--mute)] uppercase tracking-wider">
                              {ring.s === 'olfato' ? 'Olfato' : 'Paladar'}
                            </span>
                          </div>

                          <div className="p-2.5 my-2 border-l border-[var(--ac)] text-xs text-[var(--mute)] italic">
                            {ring.tip}
                          </div>

                          {/* DIAGRAMA DE VENN ELEGANTE */}
                          <div className="flex justify-center items-center my-5">
                            <div className="flex items-center">
                              <div className="w-24 h-24 rounded-full border border-[var(--ink)] flex items-center justify-center text-center p-2.5 text-xs text-[var(--ink)] bg-[var(--card)] -mr-6 z-0">
                                <span className="serif leading-tight">{accord.b1}</span>
                              </div>
                              <div className="w-24 h-24 rounded-full border border-[var(--gold)] flex items-center justify-center text-center p-2.5 text-xs text-[var(--gold)] bg-[var(--ac-soft)] z-10">
                                <span className="serif leading-tight">{accord.b2}</span>
                              </div>
                            </div>
                          </div>

                          <span className="eyebrow block text-center mb-3">
                            ¿Sentís {accord.b1} y {accord.b2} por separado, o se funden en algo nuevo?
                          </span>

                          <div className="space-y-2">
                            <button
                              onClick={() => handleAnswerAccord(0)}
                              className={`card-tactile w-full text-left p-3 border ${
                                answer === 0
                                  ? 'border-[var(--ac)] bg-[var(--ac-soft)]'
                                  : 'border-[var(--line)] hover:border-[var(--gold)] bg-[var(--card)]'
                              }`}
                            >
                              <span className="serif text-lg font-semibold text-[var(--ink)] block">
                                Se funden en algo nuevo
                              </span>
                              <span className="text-xs text-[var(--mute)] block mt-0.5">
                                Algo como: {accord.sensacion}.
                              </span>
                            </button>

                            <button
                              onClick={() => handleAnswerAccord(1)}
                              className={`card-tactile w-full text-left p-3 border ${
                                answer === 1
                                  ? 'border-[var(--gold)]'
                                  : 'border-[var(--line)] hover:border-[var(--gold)] bg-[var(--card)]'
                              }`}
                            >
                              <span className="serif text-lg font-semibold text-[var(--ink)] block">
                                Los siento por separado
                              </span>
                              <span className="text-xs text-[var(--mute)] block mt-0.5">
                                Todavía distingo uno del otro.
                              </span>
                            </button>
                          </div>

                          {answer === 0 && (
                            <div className="mt-3 p-3.5 border-l-2 border-[var(--ac)] bg-[var(--ac-soft)] text-xs text-[var(--ink)] leading-relaxed anim-fade-in">
                              <span className="serif text-base font-semibold block text-[var(--gold)] mb-0.5">
                                ¡Eso es un acorde de autor!
                              </span>
                              {accord.b1} y {accord.b2} se unen y dan nacimiento a{' '}
                              <em>{accord.nombre}</em>: {accord.explicacion}.
                            </div>
                          )}

                          {answer === 1 && (
                            <div className="mt-3 p-3 border-l-2 border-[var(--line)] text-xs text-[var(--mute)] leading-relaxed anim-fade-in">
                              <span className="serif text-sm font-semibold block text-[var(--ink)] mb-0.5">
                                Todavía no se funden del todo
                              </span>
                              Es completamente normal con la copa recién servida. Girá suavemente, aguardá
                              a que la burbuja se calme y buscá {accord.sensacion}.
                            </div>
                          )}
                        </div>
                      );
                    })()}
                  </div>
                )}

                <div className="mt-8 space-y-2">
                  <button
                    disabled={!allRingsExplored}
                    onClick={() => goToPhase(3)}
                    className="btn-author group"
                  >
                    <span>
                      {allRingsExplored ? 'Revelar la edición' : 'Explora los 3 anillos para revelar'}
                    </span>
                    <span className="transition-transform group-hover:translate-x-1.5 group-active:translate-x-1.5">
                      →
                    </span>
                  </button>

                  <button
                    onClick={() => goToPhase(1, currentEdition.capas.length - 1)}
                    className="w-full text-center py-2 text-xs uppercase tracking-widest text-[var(--mute)] hover:text-[var(--gold)] transition-colors"
                  >
                    Volver a cata en puro
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* =================================================================
            FASE 3: REVELACIÓN // MARY TUDOR (56439.jpg), RECETARIO (56444.jpg)
            Y POSTER PROMO (56095.jpg)
            ================================================================= */}
        {phaseIndex === 3 && (
          <div className="anim-fade-in">
            <span className="eyebrow block text-[var(--gold)]">{currentEdition.nombre}</span>
            <h1 className="serif text-4xl sm:text-5xl leading-none my-1 text-[var(--ink)]">
              {currentEdition.sub}
            </h1>

            <p className="serif text-xl sm:text-2xl italic leading-relaxed text-[var(--gold)] my-4">
              "{currentEdition.climax}"
            </p>

            {/* BOTÁNICOS DESCUBIERTOS */}
            {discoveredNotes.length > 0 && (
              <div className="my-5 p-4 bg-[var(--card)] border border-[var(--line)]">
                <span className="eyebrow block mb-2 text-[var(--gold)]">Lo que decodificó tu paladar:</span>
                <div className="flex flex-wrap gap-1.5">
                  {discoveredNotes.map((note) => (
                    <span
                      key={note}
                      className="inline-block text-xs uppercase tracking-wider px-2.5 py-1 border border-[var(--gold)] text-[var(--gold)] bg-[var(--gold-soft)] rounded-full font-medium"
                    >
                      {note}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="h-[1px] bg-[var(--line)] my-6" />

            {/* LA ALQUIMIA SECRETA */}
            <div className="mb-6">
              <span className="eyebrow block mb-2 text-[var(--gold)]">La Alquimia de Autor</span>
              <p className="text-[14.5px] leading-relaxed text-[var(--ink)]">
                {currentEdition.alquimia}
              </p>
            </div>

            <div className="h-[1px] bg-[var(--line)] my-6" />

            {/* =============================================================
                LA LEYENDA DETRÁS DE LA ETIQUETA (MARY TUDOR)
                ============================================================= */}
            <div className="mb-6 p-4 sm:p-5 bg-[var(--card)] border border-[var(--gold)] shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="eyebrow text-[var(--ac)]">
                  {currentEdition.historiaEtiqueta.titulo}
                </span>
                <span className="text-[10px] uppercase tracking-widest text-[var(--gold)]">Mito Reeditado</span>
              </div>

              <h3 className="serif text-2xl font-semibold text-[var(--ink)] mb-3">
                {currentEdition.historiaEtiqueta.personaje}
              </h3>

              <p className="text-[14px] leading-relaxed text-[var(--mute)] mt-3">
                {currentEdition.historiaEtiqueta.relato}
              </p>
              <div className="text-xs text-[var(--gold)] italic serif mt-3">
                {currentEdition.historiaEtiqueta.notaAutor}
              </div>
            </div>

            <div className="h-[1px] bg-[var(--line)] my-6" />

            {/* MARIDAJE */}
            <div className="mb-8">
              <span className="eyebrow block mb-3 text-[var(--gold)]">Maridaje Gastronómico Sugerido</span>
              <div className="space-y-2.5">
                {currentEdition.maridaje.map((m, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-baseline gap-4 p-2.5 border-b border-[var(--line)] text-left"
                  >
                    <h3 className="serif text-lg font-semibold text-[var(--ink)] m-0 leading-tight">
                      {m[0]}
                    </h3>
                    <span className="text-xs text-[var(--mute)] text-right max-w-[60%] leading-normal">
                      {m[1]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* =============================================================
                MÓDULO DE COCTELERÍA & PERFECT SERVE DE AUTOR
                ============================================================= */}
            <div className="my-8 p-5 bg-[var(--card)] border border-[var(--gold)] shadow-xs">
              <div className="flex items-center justify-between mb-3 border-b border-[var(--line)] pb-2.5">
                <div>
                  <span className="eyebrow block text-[var(--gold)]">Laboratorio de Barra</span>
                  <h3 className="serif text-2xl font-semibold text-[var(--ink)] m-0 leading-tight">
                    Recetas de Autor para Edición Bloody
                  </h3>
                </div>
                <GlassWater className="w-5 h-5 text-[var(--gold)]" />
              </div>


              {/* Selector táctil de cócteles */}
              <div className="flex gap-1.5 mb-4 overflow-x-auto pb-1">
                {currentEdition.cocteleria.map((cocktail, cIdx) => (
                  <button
                    key={cIdx}
                    onClick={() => setActiveCocktailTab(cIdx)}
                    className={`card-tactile px-3 py-2 border text-left text-xs uppercase tracking-wider font-semibold whitespace-nowrap transition-all ${
                      activeCocktailTab === cIdx
                        ? 'border-[var(--gold)] bg-[var(--gold)] text-[var(--bg)] font-bold'
                        : 'border-[var(--line)] bg-[var(--card)] text-[var(--mute)] hover:text-[var(--ink)]'
                    }`}
                  >
                    {cocktail.nombre.split(' ')[0]} {cocktail.nombre.split(' ')[1] || ''}
                  </button>
                ))}
              </div>

              {/* Ficha técnica del cóctel activo */}
              {(() => {
                const activeDrink = currentEdition.cocteleria[activeCocktailTab];
                return (
                  <div className="anim-fade-in space-y-3">
                    <div className="flex items-baseline justify-between">
                      <h4 className="serif text-xl font-semibold text-[var(--ink)] m-0">
                        {activeDrink.nombre}
                      </h4>
                      <span className="text-[10px] uppercase tracking-widest text-[var(--ac)] font-semibold">
                        {activeDrink.tag}
                      </span>
                    </div>

                    <div className="p-2.5 bg-[var(--card-subtle)] border border-[var(--line)] text-xs text-[var(--mute)]">
                      <strong className="text-[var(--gold)] font-semibold uppercase tracking-wider text-[10px] block mb-0.5">
                        Cristalería recomendada:
                      </strong>
                      {activeDrink.cristaleria}
                    </div>

                    <div>
                      <span className="eyebrow block mb-1.5 text-[var(--gold)]">Ingredientes de Autor:</span>
                      <ul className="text-xs space-y-1 pl-4 text-[var(--ink)] list-disc">
                        {activeDrink.ingredientes.map((ing, iIdx) => (
                          <li key={iIdx} className="leading-snug">{ing}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-2 border-t border-[var(--line)] text-xs">
                      <strong className="text-[var(--gold)] font-semibold block mb-0.5">Método & Servicio:</strong>
                      <p className="text-[var(--mute)] leading-relaxed m-0">{activeDrink.metodo}</p>
                    </div>

                    <div className="p-2 bg-[var(--ac-soft)] border-l-2 border-[var(--ac)] text-[11px] text-[var(--ink)]">
                      <strong className="font-semibold text-[var(--ac)] block uppercase tracking-wider text-[9.5px]">
                        Perfil en Copa:
                      </strong>
                      {activeDrink.perfil}
                    </div>
                  </div>
                );
              })()}
            </div>


            {/* ACCIONES FINALES */}
            <div className="space-y-3 mt-6">
              <button onClick={handleShareSummary} className="btn-author group">
                <span>{copyFeedback ? '¡Ficha de Cata Copiada!' : 'Copiar Ficha de Cata'}</span>
                <span className="transition-transform group-hover:translate-x-1.5 group-active:translate-x-1.5">
                  <Share2 className="w-3.5 h-3.5" />
                </span>
              </button>

              <button
                onClick={() => {
                  setPhaseIndex(0);
                  setLayerIndex(0);
                  setPrimarySelections(currentEdition.capas.map(() => -1));
                  setBranchSelections(currentEdition.capas.map(() => -1));
                  setDiscoveredNotes([]);
                  setTonicActive(false);
                  setAccordAnswers({});
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="card-tactile w-full text-center py-3 text-xs uppercase tracking-widest text-[var(--mute)] hover:text-[var(--gold)] border border-[var(--line)] bg-[var(--card)] transition-colors flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reiniciar la cata</span>
              </button>
            </div>
          </div>
        )}
      </main>

      {/* ===================================================================
          ACCESO MÓVIL Y COMPARTIR CON LA BARRA
          =================================================================== */}
      <section className="mt-8 p-4 bg-[var(--card)] border border-[var(--gold)]/30 text-center">
        <div className="w-8 h-8 rounded-full border border-[var(--gold)] text-[var(--gold)] flex items-center justify-center mx-auto mb-2 bg-[var(--bg)]">
          <Smartphone className="w-4 h-4" />
        </div>
        <h4 className="serif text-sm font-medium text-[var(--ink)] mb-1">
          ¿Usar en tu celular o compartir con otros?
        </h4>
        <p className="text-xs text-[var(--mute)] leading-relaxed mb-3">
          Instala esta experiencia como app en tu pantalla de inicio o compártela por WhatsApp o código QR con clientes y amigos.
        </p>
        <button
          onClick={() => setIsInstallModalOpen(true)}
          className="w-full py-2.5 px-4 bg-[var(--bg)] border border-[var(--gold)] text-[var(--gold)] hover:bg-[var(--gold)] hover:text-black transition-all text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2"
        >
          <QrCode className="w-3.5 h-3.5" />
          <span>Abrir Enlace, QR e Instrucciones</span>
        </button>
      </section>

      {/* ===================================================================
          FOOTER MINIMALISTA
          =================================================================== */}
      <footer className="mt-8 pt-4 border-t border-[var(--line)] text-center text-[10px] uppercase tracking-widest text-[var(--mute)] flex items-center justify-between">
        <span>Warhola Gin · Edición Bloody</span>
        <span className="serif italic lowercase tracking-normal text-[11px] text-[var(--gold)]">
          a bloody mary, distilled
        </span>
      </footer>

      {/* MODAL DE INSTALACIÓN Y COMPARTIR MÓVIL */}
      <MobileInstallModal
        isOpen={isInstallModalOpen}
        onClose={() => setIsInstallModalOpen(false)}
      />

      {/* INDICADOR DE MODO OFFLINE */}
      {!isOnline && (
        <div className="fixed bottom-4 left-4 right-4 z-40 max-w-[440px] mx-auto p-2.5 bg-amber-950/90 border border-amber-600/50 text-amber-200 text-xs text-center flex items-center justify-center gap-2 backdrop-blur-sm shadow-xl">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span>Modo sin conexión — La app continúa funcionando desde la memoria caché.</span>
        </div>
      )}
    </div>
  );
}
