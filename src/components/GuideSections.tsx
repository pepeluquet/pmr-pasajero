import { ArrowDownRight, ArrowUpRight, Check, Info, Printer } from 'lucide-react';
import { CopyButton } from '@/components/ui/copy-button';
import { TextAnimate } from '@/components/ui/text-animate';
import { TextureOverlay } from '@/components/ui/texture-overlay';
import { AssistanceQuiz } from './AssistanceQuiz';
import { guide, type FormField, type Source, type WheelchairTip } from '../content/guide';

// Cada bloque de contenido tiene su propio componente y su propio ancla (el id),
// que es el que usa el menú para saltar a esa sección.
// La ilustración es decorativa: no transmite información que falte en el texto.
function RouteIllustration() {
  return (
    <div className="route-art" aria-hidden="true">
      <svg viewBox="0 0 550 500" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="270" cy="245" r="188" className="route-light-stroke" strokeOpacity=".21"/>
        <circle cx="270" cy="245" r="143" className="route-light-stroke" strokeOpacity=".24"/>
        <circle cx="270" cy="245" r="97" className="route-light-stroke" strokeOpacity=".22"/>
        <path d="M40 246H505M269 21V474" className="route-light-stroke" strokeOpacity=".15"/>
        <path d="M83 337C138 373 190 377 233 305C278 230 305 145 383 165C428 176 447 211 469 190" className="route-accent-stroke" strokeWidth="2.5" strokeDasharray="5 11" strokeLinecap="round"/>
        <circle cx="82" cy="337" r="7" className="route-accent-fill"/><circle cx="469" cy="190" r="7" className="route-accent-fill"/>
        <circle cx="82" cy="337" r="16" className="route-accent-stroke" strokeOpacity=".48"/>
        <circle cx="469" cy="190" r="16" className="route-accent-stroke" strokeOpacity=".48"/>
        <path d="m271 206 14 31 64 12-64 12-14 31-13-31-65-12 65-12 13-31Z" className="route-light-fill" fillOpacity=".88"/>
        <path d="m271 207 14 31 64 11-78 1v-43Z" className="route-accent-fill"/>
        <path d="M119 91h45M141 69v44M397 366h48M421 343v46" className="route-light-stroke" strokeOpacity=".43" strokeWidth="1.5"/>
        <path d="M39 443h105M39 453h61M404 50h90M447 60h47" className="route-light-stroke" strokeOpacity=".3"/>
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
            <a href={`#${c.actionPrimary.target}`} className="hero-link button-primary" data-testid="link-hero-quiz">{c.actionPrimary.label}<ArrowDownRight aria-hidden="true"/></a>
            <a href={`#${c.actionSecondary.target}`} className="hero-link button-secondary" data-testid="link-hero-journey">{c.actionSecondary.label}<ArrowDownRight aria-hidden="true"/></a>
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

// Qué parte de la página se imprime con cada botón.
type PrintMode = 'checklist' | 'ficha-silla';

// Imprime solo una parte de la página. El atributo data-print activa los estilos de
// impresión que ocultan el resto (ver @media print en index.css); sin ese atributo,
// Ctrl + P desde el navegador sigue imprimiendo la página completa.
function printOnly(mode: PrintMode) {
  const page = document.documentElement;
  page.dataset.print = mode;
  // "afterprint" se dispara al cerrar el diálogo de impresión, se haya impreso o no.
  window.addEventListener('afterprint', () => { delete page.dataset.print; }, { once: true });
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
          <button type="button" className="print-button button-primary" onClick={() => printOnly('checklist')} data-testid="button-print-checklist">
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

// Bloque corto de la sección de la silla: título, texto y, si tiene, un link a otra sección.
function WheelchairTipBlock({ tip }: { tip: WheelchairTip }) {
  return (
    <div className="wheelchair-block" data-testid={`wheelchair-${tip.id}`}>
      <h3>{tip.title}</h3>
      <p>{tip.body}</p>
      {tip.link && <a className="checklist-link wheelchair-link" href={`#${tip.link.target}`}>{tip.link.label}<ArrowDownRight aria-hidden="true"/></a>}
    </div>
  );
}

// Tabla de tipos de silla. El envoltorio permite desplazarla de costado si no entra en pantallas muy chicas.
function WheelchairTypesTable() {
  const c = guide.wheelchair.types;
  return (
    <div className="wheelchair-block">
      <h3 id="wheelchair-types-title">{c.title}</h3>
      <div className="chair-table-wrap">
        <table className="chair-table" aria-labelledby="wheelchair-types-title">
          <thead><tr><th scope="col">{c.columnType}</th><th scope="col">{c.columnCode}</th><th scope="col">{c.columnInfo}</th></tr></thead>
          <tbody>{c.rows.map(row => <tr key={row.code} data-testid={`row-chair-${row.code}`}>
            <th scope="row">{row.type}</th><td><span className="table-code">{row.code}</span></td><td>{row.info}</td>
          </tr>)}</tbody>
        </table>
      </div>
      <p className="wheelchair-note">{c.note}</p>
    </div>
  );
}

// Un campo de la ficha. Cada campo tiene su <label> unido por id, para que el lector de pantalla
// diga qué va en cada uno; la ayuda (hint) se asocia con aria-describedby.
function FormFieldInput({ field }: { field: FormField }) {
  const inputId = `silla-${field.id}`;
  const hintId = field.hint ? `${inputId}-ayuda` : undefined;
  return (
    <div className="chair-field">
      <label htmlFor={inputId}>{field.label}</label>
      {field.hint && <span className="chair-hint" id={hintId}>{field.hint}</span>}
      {field.kind === 'textarea' && <textarea id={inputId} rows={3} aria-describedby={hintId} />}
      {field.kind === 'text' && <input id={inputId} type="text" aria-describedby={hintId} />}
      {field.kind === 'select' && <select id={inputId} defaultValue="" aria-describedby={hintId}>
        {/* Opción vacía: si no se elige nada, en la impresión el campo sale en blanco. */}
        <option value="" />
        {field.options?.map(option => <option key={option} value={option}>{option}</option>)}
      </select>}
    </div>
  );
}

// Ficha "Datos de mi silla": campos sin estado de React; lo escrito queda solo en la pantalla.
// Es un <form> para agrupar los campos, pero no se envía: onSubmit lo frena por si alguien aprieta Enter.
function WheelchairForm() {
  const c = guide.wheelchair.form;
  return (
    <div className="info-card chair-form-card">
      <h3 id="chair-form-title">{c.title}</h3>
      <p className="chair-form-lead">{c.lead}</p>
      <p className="chair-privacy">{c.privacy}</p>
      <form className="chair-form" aria-labelledby="chair-form-title" onSubmit={event => event.preventDefault()}>
        {c.fields.map(field => <FormFieldInput field={field} key={field.id} />)}
      </form>
      <button type="button" className="print-button button-primary" onClick={() => printOnly('ficha-silla')} data-testid="button-print-chair-form">
        <Printer aria-hidden="true" />{c.print}
      </button>
    </div>
  );
}

// Fuentes al pie de una sección, con link a cada documento.
function SectionSources({ title, items }: { title: string; items: readonly Source[] }) {
  return (
    <div className="section-sources">
      <h3>{title}</h3>
      <ul>{items.map(source => <li key={source.citation}>
        {source.citation}{' '}
        {source.url && <a href={source.url} target="_blank" rel="noopener noreferrer" aria-label={`${guide.sources.open}: ${source.citation} (se abre en una pestaña nueva)`}>{guide.sources.open}<ArrowUpRight aria-hidden="true"/></a>}
      </li>)}</ul>
    </div>
  );
}

// "Si viajás con tu silla": consejos, tabla de tipos, ficha imprimible y fuentes.
export function WheelchairSection() {
  const c = guide.wheelchair;
  return (
    <section id="silla" className="section wheelchair-section" aria-labelledby="wheelchair-title">
      <div className="container section-grid">
        <div className="section-head">
          <span className="section-index">{c.index}</span>
          <h2 className="section-title" id="wheelchair-title">{c.title}</h2>
          <p className="section-lead">{c.lead}</p>
        </div>
        <div className="wheelchair-body">
          <WheelchairTipBlock tip={c.intro} />
          <WheelchairTypesTable />
          {c.tips.map(tip => <WheelchairTipBlock tip={tip} key={tip.id} />)}
          <WheelchairForm />
          <SectionSources title={c.sourcesTitle} items={c.sources} />
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
