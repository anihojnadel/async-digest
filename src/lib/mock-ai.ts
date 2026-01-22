/**
 * Mock AI processor for testing and demo purposes.
 * Returns realistic pre-defined digest responses based on the REST app discussion.
 */

import { Digest, NormalizedEntry } from "@/lib/types";

/**
 * Generate a mock digest based on the input entries.
 * Contextually relevant to the REST sleep app welcome screen discussion.
 */
export function generateMockDigest(entries: NormalizedEntry[]): Digest {
  // Extract unique authors from the entries
  const authors = [...new Set(entries.map((e) => e.author))];
  
  // Count entries by source
  const slackCount = entries.filter((e) => e.source === "slack").length;
  const loomCount = entries.filter((e) => e.source === "loom").length;
  
  // Get time range
  const timestamps = entries.map((e) => new Date(e.timestamp).getTime());
  const startTime = new Date(Math.min(...timestamps));
  const endTime = new Date(Math.max(...timestamps));

  return {
    executiveSummary: {
      whatWasDiscussed: `El equipo discutió el rediseño del welcome screen y los disclaimers legales para la app REST. La conversación abarcó ${slackCount} mensajes de Slack y ${loomCount > 0 ? `${loomCount} comentarios de Loom` : "walkthroughs de diseño"}. Participaron ${authors.slice(0, 3).join(", ")}${authors.length > 3 ? ` y ${authors.length - 3} más` : ""}.`,
      whyItMatters: "El welcome screen es el primer punto de contacto con usuarios nuevos y debe balancear cobertura legal (términos, +18, disclaimers de AI) con una buena experiencia de usuario que no aumente el drop-off en el onboarding.",
      whatChanged: "Se decidió usar el copy 'Before We Begin' con CTA visible desde el inicio. Se descartaron los íconos por agregar complejidad visual. El scroll obligatorio se eliminó para reducir fricción, priorizando UX sobre compliance estricto.",
    },

    timeline: [
      {
        timestamp: startTime.toISOString(),
        summary: "Pamela presenta propuestas de diseño para welcome screen y legal disclaimers, basadas en referencia de Ash",
        participants: ["Pamela Rocío Schiavone", "Daniela Riesgo"],
        significance: "high",
      },
      {
        timestamp: new Date(startTime.getTime() + 3600000).toISOString(),
        summary: "Federico da feedback inicial: prefiere versión 2, le gustan los íconos pero preocupa el ícono rojo alarmante",
        participants: ["Federico Arnoletto"],
        significance: "medium",
      },
      {
        timestamp: new Date(startTime.getTime() + 7200000).toISOString(),
        summary: "Debate sobre scroll obligatorio vs CTA visible: tensión entre cobertura legal y drop-off",
        participants: ["Pamela Rocío Schiavone", "Federico Arnoletto"],
        significance: "high",
      },
      {
        timestamp: new Date(startTime.getTime() + 86400000).toISOString(),
        summary: "Eduardo da guidance final: 'Before We Begin', sin íconos, más spacing, CTA visible desde inicio",
        participants: ["Eduardo"],
        significance: "high",
      },
      {
        timestamp: endTime.toISOString(),
        summary: "Decisión tomada: ir con comportamiento de CTA de primera versión, Daniela implementa cambios",
        participants: ["Pamela Rocío Schiavone", "Daniela Riesgo"],
        significance: "high",
      },
    ],

    decisions: {
      decided: [
        {
          description: "Usar copy 'Before We Begin' en lugar de 'Before You Start' o 'Use REST with Confidence'",
          context: "Eduardo consideró que 'Use REST with Confidence' no refleja la verdadera razón del disclaimer (protección legal)",
          participants: ["Eduardo", "Pamela Rocío Schiavone"],
        },
        {
          description: "CTA 'I Understand' visible desde el inicio, sin requerir scroll completo",
          context: "Para reducir drop-off y confusión. El 99% de usuarios no leerá el contenido de todas formas",
          participants: ["Eduardo", "Federico Arnoletto", "Pamela Rocío Schiavone"],
        },
        {
          description: "No incluir íconos en la vista de disclaimers",
          context: "Eduardo consideró que agregan demasiado elemento adicional y hacen más difícil parsear el contenido",
          participants: ["Eduardo"],
        },
        {
          description: "Aumentar spacing entre elementos para mejor legibilidad",
          context: "La versión actual se veía 'apiñada' y costaba separar los renglones visualmente",
          participants: ["Eduardo"],
        },
        {
          description: "Mantener disclaimer 'Powered by AI' en el welcome screen",
          context: "Necesario por el disclaimer que ya existía, texto puede ajustarse después",
          participants: ["Eduardo"],
        },
      ],
      pending: [
        {
          description: "Definir copy final para el welcome screen (varias opciones presentadas)",
          context: "Eduardo confía en el equipo para elegir entre las opciones propuestas",
          participants: ["Pamela Rocío Schiavone", "Daniela Riesgo"],
        },
        {
          description: "Evaluar si 'Work in Progress' debe mantenerse en los disclaimers",
          context: "Eduardo sugiere sacarlo porque alarga el contenido y no es un disclaimer clave",
          participants: ["Eduardo", "Federico Arnoletto"],
        },
        {
          description: "Revisar imagen del welcome screen en el futuro",
          context: "No es prioridad ahora pero hay oportunidad de mejora",
          participants: ["Eduardo"],
        },
      ],
      blocked: [
        {
          description: "Visibilidad del disclaimer +18",
          context: "Federico prefiere que esté siempre visible por temas legales, pero no hay decisión final",
          participants: ["Federico Arnoletto"],
        },
      ],
    },

    actionItems: [
      {
        action: "Implementar ajustes de UI: más spacing, sin íconos, tipografía accesible",
        owner: "Daniela Riesgo",
        status: "pending",
        context: "Puede avanzar inmediatamente con estos cambios",
      },
      {
        action: "Actualizar copy a 'Before We Begin' con estilo REST",
        owner: "Daniela Riesgo",
        status: "pending",
        context: "Pamela pasó el copy aprobado",
      },
      {
        action: "Preparar prototipo con CTA visible desde el inicio",
        owner: "Daniela Riesgo",
        status: "pending",
        context: "Comportamiento de primera versión confirmado",
      },
      {
        action: "Definir copy final para welcome screen entre opciones propuestas",
        owner: "Pamela Rocío Schiavone",
        status: "pending",
        context: "Eduardo confía en el equipo para la decisión",
      },
      {
        action: "Esperar aprobación antes de avanzar con cambios en welcome screen",
        owner: "Daniela Riesgo",
        status: "blocked",
        context: "Vista delicada que requiere OK del equipo",
      },
      {
        action: "Revisar con legales el tema de longitud de disclaimers",
        owner: null,
        status: "pending",
        context: "Pamela mencionó que no es área del equipo de diseño",
      },
    ],

    openQuestions: [
      "¿El disclaimer de +18 debe estar siempre visible o puede ir en el scroll?",
      "¿Mantenemos 'Work in Progress' en los disclaimers o lo eliminamos?",
      "¿Cuál es el copy final para el CTA del welcome screen: 'Get Started' vs 'Let's build better sleep habits'?",
      "¿Cómo linkear visualmente el welcome screen con la splash para mantener identidad de REST?",
    ],

    topicClusters: [
      {
        topic: "Legal Disclaimers & Copy",
        entries: Math.floor(entries.length * 0.4),
        summary: "Discusión sobre longitud del copy, opciones de texto, y balance entre cobertura legal y legibilidad",
      },
      {
        topic: "UX & Interacción",
        entries: Math.floor(entries.length * 0.35),
        summary: "Debate sobre scroll obligatorio, visibilidad del CTA, y preocupaciones por drop-off",
      },
      {
        topic: "Diseño Visual",
        entries: Math.floor(entries.length * 0.25),
        summary: "Feedback sobre íconos, spacing, tipografía accesible, y welcome screen flashy",
      },
    ],

    disagreements: [
      "Pamela quería scroll obligatorio para mayor protección legal; Eduardo y Federico priorizaron reducir drop-off con CTA visible",
      "Federico le gustaban los íconos conceptualmente; Eduardo los consideró demasiado elemento que dificulta el parsing",
      "Tensión entre 'mayor cobertura legal' (Federico) vs 'mejor legibilidad' (equipo general)",
    ],

    repeatedFeedback: [
      "Múltiples menciones de que el 99% de usuarios no leerá el contenido legal",
      "Preocupación recurrente por el drop-off en el onboarding",
      "Énfasis en que la tipografía actual de la referencia (Ash) no pasa accesibilidad",
      "Necesidad de que el usuario pueda 'escanear' rápidamente la información",
    ],
  };
}
