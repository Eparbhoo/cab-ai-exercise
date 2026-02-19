import { detectThemes, getPrimaryTheme, themes } from '../data/themes';
import { mapQuestionToEndpoints } from '../data/endpoints';
import { personas } from '../data/personas';

/**
 * Analyze a single question: detect theme + map to endpoints
 */
export function analyzeQuestion(questionText) {
  const themeResults = detectThemes(questionText);
  const primaryTheme = themeResults[0];
  const endpointMapping = mapQuestionToEndpoints(questionText);

  return {
    theme: primaryTheme,
    allThemes: themeResults,
    ...endpointMapping,
  };
}

/**
 * Analyze all submissions for the admin dashboard.
 * Groups by persona, theme, and endpoint coverage.
 */
export function analyzeAllSubmissions(submissions) {
  // Enrich each submission with analysis
  const enriched = submissions.map((sub) => {
    const analysis = analyzeQuestion(sub.questionText);
    return { ...sub, analysis };
  });

  // Group by persona
  const byPersona = {};
  for (const sub of enriched) {
    const personaId = sub.personaId;
    if (!byPersona[personaId]) {
      const persona = personas.find((p) => p.id === personaId) || {
        name: sub.personaName,
        role: sub.personaRole,
      };
      byPersona[personaId] = {
        persona,
        submissions: [],
        themes: {},
      };
    }
    byPersona[personaId].submissions.push(sub);

    const themeId = sub.analysis.theme.themeId;
    if (!byPersona[personaId].themes[themeId]) {
      byPersona[personaId].themes[themeId] = {
        ...sub.analysis.theme,
        questions: [],
      };
    }
    byPersona[personaId].themes[themeId].questions.push(sub);
  }

  // Group by theme only
  const byTheme = {};
  for (const sub of enriched) {
    const themeId = sub.analysis.theme.themeId;
    if (!byTheme[themeId]) {
      const themeInfo = themes.find((t) => t.id === themeId) || {
        id: themeId,
        name: sub.analysis.theme.themeName,
        icon: '❓',
      };
      byTheme[themeId] = {
        ...themeInfo,
        questions: [],
      };
    }
    byTheme[themeId].questions.push(sub);
  }

  // Sort themes by question count
  const sortedThemes = Object.values(byTheme).sort(
    (a, b) => b.questions.length - a.questions.length
  );

  // Group by endpoint coverage
  const byCoverage = {
    covered: [],
    partial: [],
    not_covered: [],
  };
  for (const sub of enriched) {
    byCoverage[sub.analysis.coverage].push(sub);
  }

  return {
    enriched,
    byPersona,
    byTheme: sortedThemes,
    byCoverage,
    stats: {
      totalSubmissions: submissions.length,
      totalQuestions: submissions.length,
      uniqueParticipants: new Set(submissions.map((s) => s.participantName)).size,
      coveredCount: byCoverage.covered.length,
      partialCount: byCoverage.partial.length,
      notCoveredCount: byCoverage.not_covered.length,
    },
  };
}

/**
 * Generate CSV content from submissions
 */
export function generateCSV(submissions) {
  const enriched = submissions.map((sub) => ({
    ...sub,
    analysis: analyzeQuestion(sub.questionText),
  }));

  const headers = [
    'Participant Name',
    'Organization',
    'Persona Name',
    'Persona Role',
    'Question Text',
    'Theme',
    'Mapped Endpoints',
    'Coverage Status',
    'Gap Notes',
    'Submitted At',
  ];

  const rows = enriched.map((sub) => [
    sub.participantName,
    sub.organization || '',
    sub.personaName,
    sub.personaRole,
    `"${sub.questionText.replace(/"/g, '""')}"`,
    sub.analysis.theme.themeName,
    `"${sub.analysis.mappedEndpoints.join('; ')}"`,
    sub.analysis.coverage === 'covered'
      ? 'Fully Covered'
      : sub.analysis.coverage === 'partial'
        ? 'Partially Covered'
        : 'Not Covered',
    `"${sub.analysis.notes.replace(/"/g, '""')}"`,
    sub.submittedAt,
  ]);

  return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
}
