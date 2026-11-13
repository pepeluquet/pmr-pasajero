// Esta es la única fuente de contenido de la página. Para cambiar un texto se
// edita este archivo; los componentes solamente se ocupan de mostrarlo.
// Regla del proyecto: no inventar links ni datos normativos (ver CLAUDE.md).
export type NavigationItem = { id: string; label: string };
export type SsrCode = { code: string; meaning: string };
export type JourneyStage = { number: string; title: string; detail: string };
export type Right = { title: string; body: string };
// La URL es opcional: si todavía no tenemos el link oficial, la cita se muestra sin botón para abrirla.
export type Source = { citation: string; url?: string };
// Cada pregunta de Sí/No indica a qué paso se va con cada respuesta.
// Un paso puede ser otra pregunta ('stairs', 'cabin', 'extra') o un código de movilidad.
export type QuizStepId = 'walk' | 'stairs' | 'cabin';
export type QuizTarget = QuizStepId | 'extra' | 'WCHR' | 'WCHS' | 'WCHC';
export type QuizQuestion = { id: QuizStepId; text: string; yes: QuizTarget; no: QuizTarget };
export type QuizExtraOption = { code: string; label: string };
export type ComplaintStep = { title: string; body: string };

export const guide = {
  brand: { name: 'Guía PMR', descriptor: 'TRANSPORTE AÉREO · ARGENTINA' },
  // El orden de este menú es el mismo que el de las secciones en la página.
  navigation: [
    { id: 'inicio', label: 'Inicio' },
    // Etiquetas cortas para que el menú de escritorio entre en una sola línea.
    { id: 'cuestionario', label: '¿Qué necesito?' },
    { id: 'derechos', label: 'Tus derechos' },
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
  // "El día del viaje": el recorrido contado desde lo que vive el pasajero.
  journey: {
    index: '03 / PASO A PASO',
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
  // "Si viajás con tu silla": sección todavía sin contenido, se completa cuando tengamos fuentes verificadas.
  wheelchair: {
    index: '04 / TU SILLA',
    title: 'Si viajás con tu silla',
    status: 'En preparación',
    text: 'Esta sección va a explicar qué datos de tu silla de ruedas y de su batería conviene tener a mano antes de viajar.',
  },
  // Sección "Si algo salió mal": pasos para reclamar, en lenguaje simple.
  complaints: {
    index: '05 / RECLAMOS',
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
  // Solo las normas que se citan en esta página (y el documento de IATA del que salen los códigos del cuestionario).
  sources: {
    index: '06 / FUENTES',
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
    ] satisfies Source[],
  },
  footer: {
    text: 'Guía informativa. Ante cualquier duda, consultá con tu aerolínea.',
  },
} as const;
