/**
 * Mock Slack thread data for testing and demo purposes.
 * Based on real product design discussions about welcome screens and legal disclaimers.
 */

import { NormalizedEntry } from "@/lib/types";

/**
 * Mock Slack thread about REST app welcome screen and legal disclaimers.
 * Contains decisions, disagreements, action items, and open questions.
 */
export const mockSlackThread1: NormalizedEntry[] = [
  {
    source: "slack",
    author: "Federico Arnoletto",
    timestamp: "2026-01-07T02:26:00Z",
    content:
      "Creo que en esta pantalla intentaría errar para el lado de mayor longitud y mayor cobertura legal vs mayor simplificación y mejor 'legibilidad'",
  },
  {
    source: "slack",
    author: "Federico Arnoletto",
    timestamp: "2026-01-07T04:09:00Z",
    content:
      "Genial esto! Me inclino por la 'version 2 - Rest' yo (la primera), me parece que va a ser good enough para la parte legal. La del comportamiento al scroll me gustó pero creo que no es un contenido 'obligatorio' para pushear, y me dan más ganas de dejarle la pelota del lado del usuario si quiere profundizar en el tema.",
  },
  {
    source: "slack",
    author: "Federico Arnoletto",
    timestamp: "2026-01-07T05:04:00Z",
    content:
      "Estoy in con cualquiera de las opciones, me parece que una welcome así aumenta el valor percibido del producto la verdad! Me encantó",
  },
  {
    source: "slack",
    author: "Federico Arnoletto",
    timestamp: "2026-01-07T06:37:00Z",
    content:
      "Me gusta lo de los íconos, no sé si haría alguno que llame mucho la atención / dispare algo muy alarmante como el segundo ícono rojo. Pero me gusta conceptualmente para que no resulte tan pesada la screen",
  },
  {
    source: "slack",
    author: "Pamela Rocío Schiavone",
    timestamp: "2026-01-08T01:00:00Z",
    content:
      "@Martín Siniawski Si entiendo! A ver, la verdadera razón es cuidarnos legalmente nosotros, pero bueno de cara al user lo sentía más como 'lo que tienes que saber para usar REST'. A mí me parece un poco border copiar la refe hasta en el copy, pero si sentimos que no hay nada mejor vamos con eso! Sumo a @Daniela Riesgo así toma esos copy!",
  },
  {
    source: "slack",
    author: "Pamela Rocío Schiavone",
    timestamp: "2026-01-08T02:00:00Z",
    content:
      "Ídem, a mí me da un poco de miedo que si ponemos esta vista porque es 'delicado' lo que puede pasar en casos border, no tengamos algo que al menos obligue a scrollear. No sé si el día de mañana alguien puede alegar 'estaba muy chiquito, casi no se ve... etc'. No sé, lo quería hacer un poco más 'obligatorio' si se quiere por cuidarnos en ese sentido, aunque sabemos que el 99% lo van a pasar sin leer.",
  },
  {
    source: "slack",
    author: "Pamela Rocío Schiavone",
    timestamp: "2026-01-08T03:35:00Z",
    content:
      "@Daniela Riesgo vamos con el comportamiento de CTA como lo teníamos en la primer versión (es decir que no es obligatorio leer para pasar la vista)",
  },
];

/**
 * Alternative mock thread for variety in demos.
 */
export const mockSlackThread2: NormalizedEntry[] = [
  {
    source: "slack",
    author: "Martín Siniawski",
    timestamp: "2026-01-07T10:00:00Z",
    content:
      "Team, revisé las propuestas de welcome screen. Me parece que estamos yendo por buen camino. La pregunta es: ¿priorizamos cobertura legal o experiencia de usuario?",
  },
  {
    source: "slack",
    author: "Daniela Riesgo",
    timestamp: "2026-01-07T10:30:00Z",
    content:
      "Desde diseño, creo que podemos lograr ambas. Los íconos ayudan a que el usuario escanee rápido sin sacrificar el contenido legal.",
  },
  {
    source: "slack",
    author: "Eduardo",
    timestamp: "2026-01-07T11:00:00Z",
    content:
      "De acuerdo con Dani. Pero ojo con el drop-off. Si forzamos mucho el scroll, podemos perder usuarios en el onboarding.",
  },
  {
    source: "slack",
    author: "Pamela Rocío Schiavone",
    timestamp: "2026-01-07T11:30:00Z",
    content:
      "Entiendo el punto del drop-off. Propongo: CTA visible desde el inicio, pero con el disclaimer de términos y condiciones al final del scroll. Así cubrimos lo legal sin forzar.",
  },
  {
    source: "slack",
    author: "Federico Arnoletto",
    timestamp: "2026-01-07T12:00:00Z",
    content:
      "Me gusta esa solución intermedia. @Daniela Riesgo ¿puedes preparar un prototipo con esa interacción?",
  },
];

/**
 * Map of thread identifiers to mock data.
 */
export const slackMockDataMap: Record<string, NormalizedEntry[]> = {
  "welcome-screen": mockSlackThread1,
  "legal-disclaimers": mockSlackThread1,
  "rest-onboarding": mockSlackThread2,
  default: mockSlackThread1,
};

/**
 * Get mock Slack data for a given thread identifier.
 */
export function getMockSlackData(identifier: string): NormalizedEntry[] {
  return slackMockDataMap[identifier] || slackMockDataMap["default"];
}
