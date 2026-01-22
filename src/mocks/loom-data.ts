/**
 * Mock Loom video data for testing and demo purposes.
 * Based on real product walkthroughs about welcome screens and legal disclaimers.
 */

import { NormalizedEntry } from "@/lib/types";

/**
 * Mock Loom video: Pamela's presentation on welcome screen and legal designs.
 * Combines transcript segments and viewer comments.
 */
export const mockLoomVideo1: NormalizedEntry[] = [
  // Transcript segments from Pamela's presentation
  {
    source: "loom",
    author: "Pamela Rocío Schiavone",
    timestamp: "2026-01-07T14:00:00Z",
    content:
      "[Video Transcript] Hola team, les cuento lo que estuvimos viendo con Dani. Les comparto el proceso: qué cosas puede hacer Dani de inmediato y cuáles necesitan confirmaciones, sobre todo de copy.",
  },
  {
    source: "loom",
    author: "Pamela Rocío Schiavone",
    timestamp: "2026-01-07T14:01:00Z",
    content:
      "[Video Transcript] Arrancamos con la referencia de Ash. Dani tomó lo mismo y lo replicó para REST. El primer ajuste es que la vista de Ash tiene la tipografía muy chiquita - esto no pasa accesibilidad. La tipografía debería ir en este mínimo.",
  },
  {
    source: "loom",
    author: "Pamela Rocío Schiavone",
    timestamp: "2026-01-07T14:02:30Z",
    content:
      "[Video Transcript] Hay propuestas de copy: una muy similar a Ash, y otras más interesantes asociadas a REST. Opciones como 'Use REST with Confidence' o approaches más humanos. Me quedé con el que más me gustaba pero dejo abierto para que veamos juntos.",
  },
  {
    source: "loom",
    author: "Pamela Rocío Schiavone",
    timestamp: "2026-01-07T14:04:00Z",
    content:
      "[Video Transcript] Pasé los copies por GPT para feedback legal. Me generó copies con marco legal. Es importante considerar las longitudes - si el user hace scanning, puede ver los steps con más claridad si no tenemos tanto copy.",
  },
  {
    source: "loom",
    author: "Pamela Rocío Schiavone",
    timestamp: "2026-01-07T14:05:30Z",
    content:
      "[Video Transcript] El tema de edad: si ponemos '+18' entre paréntesis, uno lo escanea rápido. También propongo checkboxes para 'I understand' en términos y condiciones, así el usuario confirma que lo leyó.",
  },
  {
    source: "loom",
    author: "Pamela Rocío Schiavone",
    timestamp: "2026-01-07T14:07:00Z",
    content:
      "[Video Transcript] Respecto al scroll: el botón va a estar siempre visible pero disabled hasta que el usuario scrollea completo. El disclaimer de términos aparece al final. Todo se oculta detrás del título al scrollear.",
  },
  {
    source: "loom",
    author: "Pamela Rocío Schiavone",
    timestamp: "2026-01-07T14:09:00Z",
    content:
      "[Video Transcript] Para la versión con íconos: si uno escanea rápido, ve que hay alguna alerta, algo de +18. Sabemos que la mayoría no lo van a leer, pero queda más robusto con un escaneo visual de la información.",
  },
  {
    source: "loom",
    author: "Pamela Rocío Schiavone",
    timestamp: "2026-01-07T14:11:00Z",
    content:
      "[Video Transcript] Para la welcome screen: se me ocurrió hacerla más flashy. Opciones con el logo de AI, o algo artístico que linkee con la splash. La intención es que el user asocie RESTY con la experiencia AI del programa.",
  },
  {
    source: "loom",
    author: "Pamela Rocío Schiavone",
    timestamp: "2026-01-07T14:13:00Z",
    content:
      "[Video Transcript] Dani puede ir aplicando los cambios de UI. Para la welcome, todavía no va a avanzar porque es una vista delicada y necesitamos el OK de ustedes. Dejo todos los assets en una carpeta.",
  },
];

/**
 * Mock Loom video: Eduardo's feedback on the designs.
 */
export const mockLoomVideo2: NormalizedEntry[] = [
  {
    source: "loom",
    author: "Eduardo",
    timestamp: "2026-01-08T10:00:00Z",
    content:
      "[Video Transcript] Team, muy bueno esto que armaron Pam y Dani. Les doy guidance rápido de por dónde ir. A nivel texto, iría por 'Before We Begin' - me gusta más que 'Before You Start'.",
  },
  {
    source: "loom",
    author: "Eduardo",
    timestamp: "2026-01-08T10:02:00Z",
    content:
      "[Video Transcript] 'Use REST with Confidence' - no sé si esto se trata realmente de usar REST with confidence. La esencia de esto no es esa, es más bien protección legal. Así que no iría con ese approach.",
  },
  {
    source: "loom",
    author: "Eduardo",
    timestamp: "2026-01-08T10:04:00Z",
    content:
      "[Video Transcript] Me gusta el color que usaron. Lo del 'Powered by AI' me parece bien por el disclaimer que teníamos. La duda es el 'Work in Progress' - siento que hace largo el contenido y es más un mensajito buena onda que un disclaimer clave.",
  },
  {
    source: "loom",
    author: "Eduardo",
    timestamp: "2026-01-08T10:06:00Z",
    content:
      "[Video Transcript] El botón que no se activa hasta scrollear: tengo mixed feelings. Por un lado fuerza compliance, por otro puede aumentar drop-off y generar confusión. Creo que dejarlo visible desde el inicio es good enough para lo legal.",
  },
  {
    source: "loom",
    author: "Eduardo",
    timestamp: "2026-01-08T10:08:00Z",
    content:
      "[Video Transcript] Los íconos: creo que es demasiado elemento adicional. No es tan claro y hace más difícil parsear. La clave es que los títulos se lean bien. Lo veo un poco apiñado, me gustaba más spacing.",
  },
  {
    source: "loom",
    author: "Eduardo",
    timestamp: "2026-01-08T10:10:00Z",
    content:
      "[Video Transcript] Para recapitular: texto 'Before We Begin', me gusta el color, ajustar estilos pero con más spacing. Propongo sacar 'Work in Progress'. A nivel CTA iría con 'I Understand' visible desde el principio para no aumentar drop-off.",
  },
  {
    source: "loom",
    author: "Eduardo",
    timestamp: "2026-01-08T10:12:00Z",
    content:
      "[Video Transcript] Para la welcome screen: Get Started me cierra más como CTA. 'Let's build better sleep habits' no me queda claro que sea el core. Confío en ustedes para elegir la opción final. Es un lindo salto de donde estamos.",
  },
  // Comments on Eduardo's video
  {
    source: "loom",
    author: "Pamela Rocío Schiavone",
    timestamp: "2026-01-08T11:30:00Z",
    content:
      "[Loom Comment] Gracias por el feedback Edu! Entendido lo del spacing y los íconos. Vamos con 'Before We Begin' y CTA visible. Le paso a Dani para implementar.",
  },
  {
    source: "loom",
    author: "Daniela Riesgo",
    timestamp: "2026-01-08T12:00:00Z",
    content:
      "[Loom Comment] Perfecto, ajusto el spacing y saco los íconos. Para mañana tengo el prototipo actualizado.",
  },
  {
    source: "loom",
    author: "Federico Arnoletto",
    timestamp: "2026-01-08T12:30:00Z",
    content:
      "[Loom Comment] De acuerdo con todo. Solo un punto: ¿mantenemos el disclaimer de +18 visible o lo movemos al scroll? Por temas legales prefiero que esté siempre visible.",
  },
];

/**
 * Map of video identifiers to mock data.
 */
export const loomMockDataMap: Record<string, NormalizedEntry[]> = {
  "welcome-screen-walkthrough": mockLoomVideo1,
  "design-feedback": mockLoomVideo2,
  "legal-review": mockLoomVideo2,
  default: mockLoomVideo1,
};

/**
 * Get mock Loom data for a given video identifier.
 */
export function getMockLoomData(identifier: string): NormalizedEntry[] {
  return loomMockDataMap[identifier] || loomMockDataMap["default"];
}
