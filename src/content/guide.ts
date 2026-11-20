// Esta es la única fuente de contenido de la página. Para cambiar un texto se
// edita este archivo; los componentes solamente se ocupan de mostrarlo.
// Regla del proyecto: no inventar links ni datos normativos (ver CLAUDE.md).
export type NavigationItem = { id: string; label: string };
export type SsrCode = { code: string; meaning: string };
export type JourneyStage = { number: string; title: string; detail: string };
export type Right = { title: string; body: string };
// Ítem del checklist: "reference" es la norma (opcional) y "link" lleva a otra sección de la página (opcional).
export type ChecklistItem = { id: string; text: string; reference?: string; link?: { label: string; target: string } };
// La URL es opcional: si todavía no tenemos el link oficial, la cita se muestra sin botón para abrirla.
export type Source = { citation: string; url?: string };
// Cada pregunta de Sí/No indica a qué paso se va con cada respuesta.
// Un paso puede ser otra pregunta ('stairs', 'cabin', 'extra') o un código de movilidad.
export type QuizStepId = 'walk' | 'stairs' | 'cabin';
export type QuizTarget = QuizStepId | 'extra' | 'WCHR' | 'WCHS' | 'WCHC';
export type QuizQuestion = { id: QuizStepId; text: string; yes: QuizTarget; no: QuizTarget };
export type QuizExtraOption = { code: string; label: string };
export type ComplaintStep = { title: string; body: string };
// Bloque de texto de la sección de la silla; "link" lleva a otra sección (opcional).
export type WheelchairTip = { id: string; title: string; body: string; link?: { label: string; target: string } };
export type WheelchairType = { code: string; type: string; info: string };
// Campo de la ficha imprimible: texto corto, texto largo o lista de opciones.
export type FormField = { id: string; label: string; kind: 'text' | 'textarea' | 'select'; hint?: string; options?: readonly string[] };

// Citas de IATA que se usan en dos lugares (al pie de "Si viajás con tu silla" y en "Fuentes"):
// se definen una sola vez para que no queden dos versiones distintas de la misma cita.
// Links verificados en las páginas oficiales de IATA (accesibilidad y guía de mercancías peligrosas para pasajeros).
const IATA_BATTERY_GUIDE = {
  citation: 'International Air Transport Association. (2026). Battery-powered wheelchair and mobility aid guidance document.',
  url: 'https://www.iata.org/contentassets/6fea26dd84d24b26a7a1fd5788561d6e/mobility-aid-guidance-document.pdf',
} satisfies Source;
const IATA_MOBILITY_AIDS = {
  citation: 'International Air Transport Association. (2023). IATA guidance on the transport of mobility aids (1.ª ed.).',
  url: 'https://www.iata.org/contentassets/7b3762815ac44a10b83ccf5560c1b308/iata-guidance-on-the-transport-of-mobility-aids-final-feb2023.pdf',
} satisfies Source;

export const guide = {
  brand: { name: 'Guía PMR', descriptor: 'TRANSPORTE AÉREO · ARGENTINA' },
  // El orden de este menú es el mismo que el de las secciones en la página.
  navigation: [
    { id: 'inicio', label: 'Inicio' },
    // Etiquetas cortas para que el menú de escritorio entre en una sola línea.
    { id: 'cuestionario', label: '¿Qué necesito?' },
    { id: 'derechos', label: 'Tus derechos' },
    { id: 'antes-de-viajar', label: 'Antes de viajar' },
    { id: 'dia-del-viaje', label: 'El día del viaje' },
    { id: 'silla', label: 'Con tu silla' },
    { id: 'reclamos', label: 'Si algo salió mal' },
    { id: 'fuentes', label: 'Fuentes' },
  ] satisfies NavigationItem[],
  accessibility: {
    skip: 'Saltar al contenido',
    mainNav: 'Navegación principal',
    mobileNav: 'Navegación para pantallas pequeñas',
    openMenu: 'Abrir menú de navegación',
    closeMenu: 'Cerrar menú de navegación',
    menu: 'Menú',
  },
  hero: {
    eyebrow: 'GUÍA PARA PASAJEROS Y FAMILIAS',
    // El título se muestra en dos renglones: el segundo va resaltado en color.
    titleStart: 'Viajar en avión',
    titleAccent: 'con movilidad reducida.',
    intro: 'Esta guía te ayuda a preparar tu viaje paso a paso: qué asistencia pedir, cuáles son tus derechos y qué pasa el día que volás.',
    actionPrimary: { label: '¿Qué asistencia necesito?', target: 'cuestionario' },
    actionSecondary: { label: 'El día del viaje', target: 'dia-del-viaje' },
    bottom: 'ARGENTINA · TRANSPORTE AÉREO',
  },
  // Cuestionario "¿Qué asistencia necesito?".
  quiz: {
    index: '01 / ORIENTACIÓN',
    title: '¿Qué asistencia necesito?',
    lead: 'Respondé unas preguntas de Sí o No y te sugerimos qué códigos de asistencia pedirle a la aerolínea.',
    questionLabel: 'Pregunta',
    yes: 'Sí',
    no: 'No',
    questions: [
      { id: 'walk', text: '¿Podés caminar distancias largas dentro del aeropuerto sin ayuda?', yes: 'extra', no: 'stairs' },
      { id: 'stairs', text: '¿Podés subir y bajar escaleras?', yes: 'WCHR', no: 'cabin' },
      { id: 'cabin', text: '¿Podés caminar por tus medios desde la puerta del avión hasta tu asiento?', yes: 'WCHS', no: 'WCHC' },
    ] satisfies QuizQuestion[],
    extraQuestion: '¿Necesitás además apoyo por alguno de estos motivos?',
    extraHint: 'Podés marcar más de una opción.',
    extraOptions: [
      { code: 'BLND', label: 'Disminución visual' },
      { code: 'DEAF', label: 'Disminución auditiva' },
      { code: 'DPNA', label: 'Discapacidad intelectual o del desarrollo' },
    ] satisfies QuizExtraOption[],
    // Explicación de cada código que puede aparecer en el resultado.
    // Son las definiciones de IATA que la guía académica muestra en su tabla de códigos SSR.
    codes: [
      { code: 'WCHR', meaning: 'Puede caminar y subir escaleras pero necesita silla para distancias largas.' },
      { code: 'WCHS', meaning: 'No puede subir ni bajar escaleras, pero puede llegar a su asiento. Necesita silla para las distancias y que lo carguen en las escaleras.' },
      { code: 'WCHC', meaning: 'Completamente inmóvil. Necesita silla y que lo carguen en las escaleras y hasta su asiento.' },
      { code: 'BLND', meaning: 'Pasajero ciego o con disminución visual.' },
      { code: 'DEAF', meaning: 'Pasajero sordo o con disminución auditiva.' },
      { code: 'DPNA', meaning: 'Pasajero con discapacidad cognitiva, intelectual o del desarrollo.' },
    ] satisfies SsrCode[],
    noneOption: 'Ninguno',
    showResult: 'Ver resultado',
    resultTitle: 'Códigos sugeridos',
    noCodesResult: 'Según tus respuestas, no surge un código de asistencia. Si igual necesitás ayuda en algún momento del viaje, consultalo con la aerolínea.',
    sayTitle: 'Qué decirle a la aerolínea al reservar',
    // {codigos} se reemplaza por la lista de códigos, por ejemplo "WCHR y BLND".
    sayTemplate: '«Hola, quiero solicitar asistencia especial para mi vuelo. Por favor, registren en mi reserva el código {codigos}.»',
    // Versión en plural, para cuando el resultado tiene más de un código.
    sayTemplatePlural: '«Hola, quiero solicitar asistencia especial para mi vuelo. Por favor, registren en mi reserva los códigos {codigos}.»',
    // {codigos} también se usa en el anuncio para lectores de pantalla.
    announcement: 'Resultado listo. Códigos sugeridos: {codigos}.',
    announcementNone: 'Resultado listo. No surge un código de asistencia.',
    warning: 'Esta herramienta es orientativa. La aerolínea es quien registra la asistencia en tu reserva. Avisá con al menos 48 horas de anticipación.',
    restart: 'Volver a empezar',
  },
  // "Tus derechos": lo que dice el art. 31 del Decreto 809/2024, contado en lenguaje simple.
  // No agregar derechos que no estén en la norma citada.
  rights: {
    index: '02 / TUS DERECHOS',
    title: 'Tus derechos',
    lead: 'Si viajás con movilidad reducida, la aerolínea tiene que cumplir con esto.',
    items: [
      {
        title: 'Avisá con al menos 48 horas de anticipación',
        body: 'Contale a la aerolínea qué asistencia necesitás, como mínimo 48 horas antes del vuelo. Así tienen tiempo de organizarla.',
      },
      {
        title: 'El check-in es prioritario y gratuito',
        body: 'En el mostrador te tienen que atender primero, y no te pueden cobrar por eso.',
      },
      {
        title: 'Recibís la asistencia que necesitás',
        body: 'La aerolínea tiene que darte la ayuda que pediste, según los servicios que haya en el aeropuerto. Solo puede negarla si demuestra que pone en riesgo la seguridad del vuelo.',
      },
    ] satisfies Right[],
    reference: '(Decreto 809/2024, art. 31)',
  },
  // Checklist "Antes de viajar": ítems y normas indicados por el equipo del trabajo.
  // El ítem 8 no afirma un derecho porque no tiene norma citada (regla: no inventar datos normativos).
  checklist: {
    index: '03 / ANTES DE VIAJAR',
    title: 'Antes de viajar',
    lead: 'Una lista para repasar en los días previos al vuelo. Marcá cada punto a medida que lo resolvés.',
    items: [
      {
        id: 'avisar',
        text: 'Avisá a la aerolínea, con al menos 48 horas de anticipación, que necesitás asistencia.',
        reference: '(Decreto 809/2024, art. 31)',
      },
      {
        id: 'tipo-asistencia',
        text: 'Indicá qué tipo de asistencia necesitás. Si no sabés cuál, hacé el cuestionario "¿Qué asistencia necesito?".',
        link: { label: 'Ir al cuestionario', target: 'cuestionario' },
      },
      {
        id: 'silla',
        text: 'Si viajás con tu propia silla, informá si es manual o eléctrica, cuánto pesa y cuánto mide y, si es eléctrica, qué tipo de batería tiene. Preguntá dónde te la devuelven: en la puerta del avión o en otro sector.',
      },
      {
        id: 'pasajero-asistente',
        text: 'Consultá si tenés que viajar con un pasajero asistente (una persona que te acompañe). La norma lo exige cuando la persona no puede comprender las instrucciones de seguridad, abrocharse el cinturón, colocarse la máscara de oxígeno, cubrir sus necesidades básicas o colaborar en una evacuación. El pasajero asistente tiene que tener su propio pasaje.',
        reference: '(Decreto 809/2024, art. 31)',
      },
      {
        id: 'autorizacion-medica',
        text: 'Si tenés una condición médica que pueda agravarse durante el vuelo, o una cirugía reciente, consultá si la aerolínea te pide una autorización médica previa.',
        reference: '(Decreto 809/2024, art. 32)',
      },
      {
        id: 'llegar-temprano',
        text: 'Llegá al aeropuerto con tiempo extra: los pasajeros con asistencia suelen embarcar antes que el resto, aunque el horario depende de cada aerolínea. Tenés derecho a check-in prioritario y gratuito.',
        reference: '(Decreto 809/2024, art. 31)',
      },
      {
        id: 'confirmar-reserva',
        text: 'En el mostrador, confirmá que la asistencia figura en tu reserva.',
      },
      {
        id: 'como-ayudarte',
        text: 'Contale al personal cómo preferís que te ayuden: hay quienes prefieren tomarse del brazo y quienes prefieren no ser tocados. Si no te preguntan, decíselo vos.',
      },
      {
        id: 'documentacion',
        text: 'Guardá la documentación del viaje por si necesitás hacer un reclamo.',
        link: { label: 'Ver cómo reclamar', target: 'reclamos' },
      },
    ] satisfies ChecklistItem[],
    note: 'Lo que marques no se guarda: si recargás la página, las casillas vuelven a quedar vacías.',
    print: 'Imprimir checklist',
  },
  // "El día del viaje": el recorrido contado desde lo que vive el pasajero.
  journey: {
    index: '04 / PASO A PASO',
    title: 'El día del viaje',
    lead: 'Así es el recorrido, desde que salís de tu casa hasta que llegás a destino.',
    stages: [
      { number: '01', title: 'Antes de salir', detail: 'Confirmá que avisaste a la aerolínea qué asistencia necesitás. Si todavía no lo hiciste, hacelo con al menos 48 horas de anticipación.' },
      { number: '02', title: 'Check-in', detail: 'Llegás al mostrador y te registrás. Si viajás con una silla de ruedas con batería, en este momento la revisan.' },
      { number: '03', title: 'Embarque', detail: 'Te acompañan hasta la puerta y subís al avión antes que el resto de los pasajeros.' },
      { number: '04', title: 'A bordo', detail: 'Te ubicás en tu asiento. No te pueden sentar en las filas de salida de emergencia.' },
      { number: '05', title: 'Llegada', detail: 'El orden para bajar depende de cada aerolínea y de la seguridad. Podés bajar por la manga, en ambulift (un vehículo con elevador) o en una silla especial de pasillo. El personal del aeropuerto te recibe y te acompaña hasta el equipaje o la salida.' },
    ] satisfies JourneyStage[],
  },
  // "Si viajás con tu silla". Regla: no poner límites de capacidad ni instrucciones técnicas
  // de baterías; eso lo define cada aerolínea según la normativa vigente.
  wheelchair: {
    index: '05 / TU SILLA',
    title: 'Si viajás con tu silla',
    lead: 'Lo que conviene saber y preparar si viajás con tu propia silla de ruedas.',
    intro: {
      id: 'avisar',
      title: 'Avisá con tiempo',
      body: 'Cuando reservás, contale a la aerolínea que viajás con tu propia silla y de qué tipo es. Así pueden planificar cómo trasladarla.',
    } satisfies WheelchairTip,
    types: {
      title: 'Tipos de silla y batería',
      columnType: 'Tipo de silla',
      columnCode: 'Código para la aerolínea',
      columnInfo: 'Qué tenés que informar',
      // Los códigos son los de IATA para cada tipo de silla (los mismos de la guía académica).
      rows: [
        { code: 'WCMP', type: 'Manual', info: 'Que es manual, cuánto pesa, cuánto mide y si se pliega.' },
        { code: 'WCBD', type: 'Eléctrica con batería seca, de gel o no derramable', info: 'Que es eléctrica y qué tipo de batería tiene.' },
        { code: 'WCBW', type: 'Eléctrica con batería húmeda (derramable)', info: 'Que es eléctrica y qué tipo de batería tiene.' },
        { code: 'WCLB', type: 'Eléctrica con batería de litio', info: 'Que es eléctrica y qué tipo de batería tiene.' },
      ] satisfies WheelchairType[],
      note: 'Las sillas eléctricas pueden necesitar una preparación especial de la batería por razones de seguridad. Esa preparación depende del tipo de batería y de lo que indique la aerolínea: consultalo antes de viajar.',
    },
    tips: [
      {
        id: 'datos',
        title: 'Tené a mano los datos de tu silla',
        body: 'Tipo de silla, peso, medidas, si se pliega, y el tipo de batería y cómo se desconecta o se retira (lo dice el manual del fabricante). Si no sabés qué batería tiene, el check-in puede demorarse.',
      },
      {
        id: 'devolucion',
        title: 'Preguntá dónde te la devuelven',
        body: 'Algunas aerolíneas te la entregan en la puerta del avión y otras en otro sector del aeropuerto. Confirmalo antes de viajar.',
      },
      {
        id: 'danos',
        title: 'Si llega dañada o demora',
        body: 'Avisá en el aeropuerto antes de irte y seguí los pasos de la sección "Si algo salió mal".',
        link: { label: 'Ver cómo reclamar', target: 'reclamos' },
      },
    ] satisfies WheelchairTip[],
    // Ficha imprimible: los datos quedan solo en la pantalla, no se guardan ni se envían.
    form: {
      title: 'Ficha "Datos de mi silla"',
      lead: 'Completala en pantalla e imprimila para llevarla al aeropuerto. Los campos que dejes vacíos salen en blanco, para completarlos a mano.',
      privacy: 'Lo que escribas no se guarda ni se envía a ningún lado.',
      print: 'Imprimir ficha',
      fields: [
        { id: 'nombre', label: 'Nombre y apellido', kind: 'text' },
        { id: 'vuelo', label: 'Número de vuelo', kind: 'text' },
        { id: 'tipo', label: 'Tipo de silla', kind: 'select', options: ['Manual', 'Eléctrica', 'No sé'] },
        { id: 'peso', label: 'Peso', kind: 'text', hint: 'En kilos.' },
        { id: 'medidas', label: 'Medidas', kind: 'text', hint: 'Alto, ancho y largo, en centímetros.' },
        { id: 'pliega', label: '¿Se pliega?', kind: 'select', options: ['Sí', 'No', 'No sé'] },
        { id: 'bateria', label: 'Tipo de batería', kind: 'select', options: ['No tiene (silla manual)', 'Seca, de gel o no derramable', 'Húmeda (derramable)', 'De litio', 'No sé'] },
        { id: 'desconexion', label: 'Cómo se desconecta o se retira la batería', kind: 'textarea', hint: 'Según el manual del fabricante.' },
      ] satisfies FormField[],
    },
    sourcesTitle: 'Fuentes de esta sección',
    sources: [IATA_BATTERY_GUIDE, IATA_MOBILITY_AIDS] satisfies Source[],
  },
  // Sección "Si algo salió mal": pasos para reclamar, en lenguaje simple.
  complaints: {
    index: '06 / RECLAMOS',
    title: 'Si algo salió mal',
    lead: 'Si la asistencia no fue la que correspondía, podés reclamar. Estos son los pasos.',
    stepLabel: 'Paso',
    steps: [
      {
        title: 'Reclamá primero a la aerolínea',
        body: 'Según la Resolución ANAC 774/2025, cada aerolínea debe tener al menos un canal gratuito y accesible para reclamos (físico, electrónico o telefónico), darte un número de reclamo único y responder dentro de los 30 días hábiles administrativos. Además, deben ayudarte si tenés dificultades para usar esos canales.',
      },
      {
        title: 'Si no se resuelve, pedí una conciliación en la ANAC',
        body: 'Podés recurrir al Servicio de Conciliación para Pasajeros de Transporte Aéreo de la ANAC, creado por el Decreto 809/2024 y reglamentado por la Resolución ANAC 188/2026. Es voluntario y gratuito, se inicia desde el sitio web de la ANAC, y la instancia de conciliación dura como máximo 30 días hábiles administrativos.',
      },
    ] satisfies ComplaintStep[],
    tipLabel: 'Consejo',
    tip: 'Guardá el número de reclamo y toda la documentación del viaje.',
  },
  // Todas las fuentes que se citan en esta página: normas argentinas y documentos de IATA
  // (códigos del cuestionario y guías sobre sillas de ruedas).
  sources: {
    index: '07 / FUENTES',
    title: 'Fuentes',
    lead: 'Las normas que se citan en esta guía, para que puedas consultarlas. Formato APA 7.',
    primary: 'Fuente primaria',
    open: 'Consultar fuente',
    noLink: 'Link oficial pendiente',
    copy: 'Copiar cita',
    items: [
      {
        citation: 'Decreto 809/2024. (2024, 10 de septiembre). Reglamento del contrato aéreo de pasajeros, equipaje y protección de los derechos del pasajero usuario del transporte aéreo. Boletín Oficial de la República Argentina.',
        url: 'https://www.boletinoficial.gob.ar/detalleAviso/primera/313613/20240910',
      },
      {
        // TODO: agregar link oficial del Boletín Oficial
        // TODO: completar día y mes de publicación en la cita.
        citation: 'Resolución 774/2025. (2025). Administración Nacional de Aviación Civil. Boletín Oficial de la República Argentina.',
      },
      {
        // TODO: agregar link oficial del Boletín Oficial
        // TODO: completar día y mes de publicación en la cita.
        citation: 'Resolución 188/2026. (2026). Administración Nacional de Aviación Civil. Boletín Oficial de la República Argentina.',
      },
      {
        citation: 'International Air Transport Association. (s. f.). Best practices on the application of SSR codes and assistance service.',
        url: 'https://www.iata.org/contentassets/7b3762815ac44a10b83ccf5560c1b308/best-practices-on-the-application-of-ssr-codes-and-assistance-service.pdf',
      },
      // APA 7: con el mismo autor, primero la obra sin fecha y después por año.
      IATA_MOBILITY_AIDS,
      IATA_BATTERY_GUIDE,
    ] satisfies Source[],
  },
  footer: {
    text: 'Guía informativa. Ante cualquier duda, consultá con tu aerolínea.',
    // Enlace de vuelta a la página académica: discreto, para que el pasajero sepa de dónde
    // sale la información sin que lo distraiga de la guía.
    origin: 'Elaborada en el marco de un trabajo académico de la UTN.',
    originLinkLabel: 'Ver la página del trabajo',
    originUrl: 'https://guia-pmr.web.app',
  },
} as const;
