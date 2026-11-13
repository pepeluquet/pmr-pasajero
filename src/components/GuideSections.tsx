import { ArrowDownRight, ArrowUpRight, Check, Info, Printer } from 'lucide-react';
import { CopyButton } from '@/components/ui/copy-button';
import { TextAnimate } from '@/components/ui/text-animate';
import { TextureOverlay } from '@/components/ui/texture-overlay';
import { AssistanceQuiz } from './AssistanceQuiz';
import { guide } from '../content/guide';

// Cada bloque de contenido tiene su propio componente y su propio ancla (el id),
// que es el que usa el menú para saltar a esa sección.
// La ilustración es decorativa: no transmite información que falte en el texto.
function RouteIllustration() {
  return (
    <div className="route-art" aria-hidden="true">
      <svg viewBox="0 0 550 500" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="270" cy="245" r="188" stroke="#91ADA5" strokeOpacity=".21"/>
        <circle cx="270" cy="245" r="143" stroke="#91ADA5" strokeOpacity=".24"/>
        <circle cx="270" cy="245" r="97" stroke="#91ADA5" strokeOpacity=".22"/>
        <path d="M40 246H505M269 21V474" stroke="#91ADA5" strokeOpacity=".15"/>
        <path d="M83 337C138 373 190 377 233 305C278 230 305 145 383 165C428 176 447 211 469 190" stroke="#E6AA86" strokeWidth="2.5" strokeDasharray="5 11" strokeLinecap="round"/>
        <circle cx="82" cy="337" r="7" fill="#E6AA86"/><circle cx="469" cy="190" r="7" fill="#E6AA86"/>
        <circle cx="82" cy="337" r="16" stroke="#E6AA86" strokeOpacity=".48"/>
        <circle cx="469" cy="190" r="16" stroke="#E6AA86" strokeOpacity=".48"/>
        <path d="m271 206 14 31 64 12-64 12-14 31-13-31-65-12 65-12 13-31Z" fill="#D4E0D7" fillOpacity=".88"/>
        <path d="m271 207 14 31 64 11-78 1v-43Z" fill="#E6AA86"/>
        <path d="M119 91h45M141 69v44M397 366h48M421 343v46" stroke="#91ADA5" strokeOpacity=".43" strokeWidth="1.5"/>
        <path d="M39 443h105M39 453h61M404 50h90M447 60h47" stroke="#91ADA5" strokeOpacity=".3"/>
      </svg>
    </div>
  );
}

export function HeroSection() {
  const c = guide.hero;
  return (
    <section id="inicio" className="hero" aria-labelledby="hero-title">
      <div className="container hero-inner">
        <div className="hero-copy">
          <span className="eyebrow">{c.eyebrow}</span>
          <h1 id="hero-title">
            <TextAnimate text={c.titleStart} type="fadeIn" custom={1} className="block" />
            <em><TextAnimate text={c.titleAccent} type="fadeIn" custom={2.4} className="block" /></em>
          </h1>
          <p className="hero-intro">{c.intro}</p>
          <div className="hero-links">
            <a href={`#${c.actionPrimary.target}`} className="hero-link primary" data-testid="link-hero-quiz">{c.actionPrimary.label}<ArrowDownRight aria-hidden="true"/></a>
            <a href={`#${c.actionSecondary.target}`} className="hero-link" data-testid="link-hero-journey">{c.actionSecondary.label}<ArrowDownRight aria-hidden="true"/></a>
          </div>
        </div>
        <RouteIllustration />
        <div className="hero-bottom">{c.bottom}</div>
      </div>
    </section>
  );
}

// Sección del cuestionario: el encabezado es igual al de las demás secciones
// y la lógica interactiva vive en su propio componente (AssistanceQuiz).
export function QuizSection() {
  const c = guide.quiz;
  return (
    <section id="cuestionario" className="section quiz-section" aria-labelledby="quiz-title">
      <div className="container section-grid">
        <div className="section-head">
          <span className="section-index">{c.index}</span>
          <h2 className="section-title" id="quiz-title">{c.title}</h2>
          <p className="section-lead">{c.lead}</p>
        </div>
        <AssistanceQuiz />
      </div>
    </section>
  );
}

// "Tus derechos": una lista de tres derechos y, debajo, la norma de la que salen.
export function RightsSection() {
  const c = guide.rights;
  return (
    <section id="derechos" className="section rights-section" aria-labelledby="rights-title">
      <div className="container section-grid">
        <div className="section-head">
          <span className="section-index">{c.index}</span>
          <h2 className="section-title" id="rights-title">{c.title}</h2>
          <p className="section-lead">{c.lead}</p>
        </div>
        <div className="info-card">
          <TextureOverlay texture="paperGrain" opacity={0.55} />
          <ul className="rights-list">
            {c.items.map(item => <li key={item.title} data-testid="right-item">
              {/* El tilde es solo visual: el título ya dice de qué derecho se trata. */}
              <Check className="rights-icon" aria-hidden="true" />
              <div>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            </li>)}
          </ul>
          <p className="rights-reference" data-testid="text-rights-reference"><small>{c.reference}</small></p>
        </div>
      </div>
    </section>
  );
}

// Imprime solo el checklist. La clase "print-checklist" activa los estilos de
// impresión que ocultan el resto de la página (ver @media print en index.css);
// así Ctrl + P desde el navegador sigue imprimiendo la página completa.
function printChecklist() {
  const page = document.documentElement;
  page.classList.add('print-checklist');
  // "afterprint" se dispara al cerrar el diálogo de impresión, se haya impreso o no.
  window.addEventListener('afterprint', () => page.classList.remove('print-checklist'), { once: true });
  window.print();
}

// "Antes de viajar": casillas nativas del navegador. No usan estado de React
// porque lo marcado no se guarda; el navegador ya recuerda si cada casilla está tildada.
export function ChecklistSection() {
  const c = guide.checklist;
  return (
    <section id="antes-de-viajar" className="section checklist-section" aria-labelledby="checklist-title">
      <div className="container section-grid">
        <div className="section-head">
          <span className="section-index">{c.index}</span>
          <h2 className="section-title" id="checklist-title">{c.title}</h2>
          <p className="section-lead">{c.lead}</p>
        </div>
        <div className="info-card checklist-card">
          <ul className="checklist">
            {c.items.map(item => <li className="checklist-item" key={item.id} data-testid={`checklist-${item.id}`}>
              {/* El label envuelve casilla y texto: tocar cualquier parte del texto marca la casilla. */}
              <label className="checklist-label">
                <input type="checkbox" />
                <span>{item.text}</span>
              </label>
              {item.reference && <p className="checklist-reference"><small>{item.reference}</small></p>}
              {/* El link va fuera del label para que tocarlo no marque la casilla. */}
              {item.link && <a className="checklist-link" href={`#${item.link.target}`}>{item.link.label}<ArrowDownRight aria-hidden="true"/></a>}
            </li>)}
          </ul>
          <p className="checklist-note">{c.note}</p>
          <button type="button" className="print-button" onClick={printChecklist} data-testid="button-print-checklist">
            <Printer aria-hidden="true" />{c.print}
          </button>
        </div>
      </div>
    </section>
  );
}

export function JourneySection() {
  const c = guide.journey;
  return (
    <section id="dia-del-viaje" className="section journey-section" aria-labelledby="journey-title">
      <div className="container">
        <div className="section-head">
          <span className="section-index">{c.index}</span>
          <h2 className="section-title" id="journey-title">{c.title}</h2>
          <p className="section-lead">{c.lead}</p>
        </div>
        <ol className="timeline">{c.stages.map(stage => <li className="stage" key={stage.number} data-testid={`stage-${stage.number}`}>
          <span className="stage-number">{stage.number}</span>
          <h3>{stage.title}</h3><p>{stage.detail}</p>
        </li>)}</ol>
      </div>
    </section>
  );
}

// "Si viajás con tu silla": por ahora solo avisa que el contenido está en preparación.
export function WheelchairSection() {
  const c = guide.wheelchair;
  return (
    <section id="silla" className="section wheelchair-section" aria-labelledby="wheelchair-title">
      <div className="container section-grid">
        <div className="section-head">
          <span className="section-index">{c.index}</span>
          <h2 className="section-title" id="wheelchair-title">{c.title}</h2>
        </div>
        <div className="info-card">
          <TextureOverlay texture="paperGrain" opacity={0.55} />
          <span className="status-tag" data-testid="status-wheelchair">{c.status}</span>
          <p className="info-card-text">{c.text}</p>
        </div>
      </div>
    </section>
  );
}

// Sección "Si algo salió mal": una lista numerada de pasos y un consejo final.
export function ComplaintsSection() {
  const c = guide.complaints;
  return (
    <section id="reclamos" className="section complaints-section" aria-labelledby="complaints-title">
      <div className="container section-grid">
        <div className="section-head">
          <span className="section-index">{c.index}</span>
          <h2 className="section-title" id="complaints-title">{c.title}</h2>
          <p className="section-lead">{c.lead}</p>
        </div>
        <div>
          <ol className="complaint-steps">
            {c.steps.map((step, index) => <li className="complaint-step" key={step.title} data-testid={`complaint-step-${index + 1}`}>
              <span className="micro">{c.stepLabel} {index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </li>)}
          </ol>
          <div className="notice complaint-tip">
            <Info className="notice-icon" aria-hidden="true"/>
            <p><strong>{c.tipLabel}:</strong> {c.tip}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SourcesSection() {
  const c = guide.sources;
  return (
    <section id="fuentes" className="section sources-section" aria-labelledby="sources-title">
      <div className="container section-grid">
        <div className="section-head">
          <span className="section-index">{c.index}</span>
          <h2 className="section-title" id="sources-title">{c.title}</h2>
          <p className="section-lead">{c.lead}</p>
        </div>
        <ol className="sources-list">
          {c.items.map((source, index) => <li className="source-item" key={source.citation}>
            <span className="source-number">{String(index + 1).padStart(2, '0')}</span>
            <div>
              <p>{source.citation}</p>
              <div className="source-actions">
                {/* Si la fuente todavía no tiene link oficial, se avisa en lugar de mostrar un link vacío. */}
                {'url' in source
                  ? <a href={source.url} target="_blank" rel="noopener noreferrer" aria-label={`${c.open}: ${source.citation} (se abre en una pestaña nueva)`} data-testid={`link-source-${index + 1}`}>{c.open}<ArrowUpRight aria-hidden="true"/></a>
                  : <span className="source-pending">{c.noLink}</span>}
                <CopyButton value={source.citation} label={`${c.copy}: ${source.citation}`} className="source-copy" data-testid={`button-copy-source-${index + 1}`} />
              </div>
            </div>
            <span className="source-label">{c.primary}</span>
          </li>)}
        </ol>
      </div>
    </section>
  );
}

export function SiteFooter() {
  return <footer className="site-footer"><div className="container footer-inner"><p>{guide.footer.text}</p><span className="footer-mark" aria-hidden="true">PMR.</span></div></footer>;
}
