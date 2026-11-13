# PMR Pasajero

## Propósito
Guía práctica para pasajeros con movilidad reducida (PMR) y sus familias que van a viajar en avión en Argentina. Ayuda a preparar el viaje paso a paso: qué asistencia pedir, cuáles son sus derechos, qué pasa el día del viaje y cómo reclamar si algo sale mal.

Nació como copia de "guia-pmr" (la versión académica, que está en la carpeta vecina `APP_GUIA_PMR`). Este proyecto es solo la versión para el pasajero: no lleva contenido académico (comparaciones de normativa, definiciones teóricas, OACI/IATA en desarrollo, referencias a la Práctica Supervisada).

## Público
Personas sin conocimientos técnicos ni aeronáuticos. Muchas usan el celular, algunas usan lector de pantalla o necesitan letra grande.

## Reglas
- **Lenguaje simple y directo, tratando de "vos".** Frases cortas, sin siglas sin explicar ni jerga aeronáutica.
- **Accesibilidad como prioridad:** navegación completa con teclado, contraste alto, letra grande, etiquetas HTML correctas (`button`, `nav`, `label`) y `aria-*` donde corresponda. Respetar `prefers-reduced-motion`.
- **Responsive:** tiene que verse y usarse bien en celular y en PC.
- **Todo el contenido en el archivo de datos** `src/content/guide.ts`. Los componentes solo muestran ese contenido; no escribir textos dentro de los componentes.
- **Comentarios en castellano** que expliquen el porqué.
- **No inventar links ni datos normativos.** Si falta un dato o un link oficial, se deja marcado como pendiente (por ejemplo "Link oficial pendiente") hasta tener la fuente verificada.
- Las fuentes van en formato APA 7 e incluyen solo las normas que se citan en la página.

## Estructura
- `src/content/guide.ts`: todos los textos, en el orden de las secciones.
- `src/components/GuideSections.tsx`: una función por sección.
- `src/components/AssistanceQuiz.tsx`: el cuestionario "¿Qué asistencia necesito?".
- `src/components/SiteHeader.tsx`: encabezado y menú (se arma con `guide.navigation`).
- `src/index.css`: estilos.

## Comandos
- `npm install` · `npm run dev` · `npm run build` · `npm run typecheck`

## Publicación
Todavía no tiene proyecto propio de Firebase. No copiar el `.firebaserc` de guia-pmr: haría que un deploy pise la guía académica publicada.
