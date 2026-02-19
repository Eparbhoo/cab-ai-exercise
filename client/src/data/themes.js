// Theme definitions with keyword patterns for auto-categorization

export const themes = [
  {
    id: 'scheduling',
    name: 'Scheduling & Availability',
    icon: '📅',
    keywords: [
      'appointment', 'appointments', 'schedule', 'scheduling', 'availability',
      'booking', 'book', 'operatory', 'operatories', 'recall', 'recalls',
      'slot', 'slots', 'open time', 'cancellation', 'cancelled', 'no-show',
      'no show', 'confirm', 'confirmation', 'reschedule', 'waitlist',
      'wait list', 'calendar', 'tomorrow', 'today', 'next week', 'this week',
      'morning', 'afternoon', 'available', 'overbooked', 'double-booked',
    ],
  },
  {
    id: 'patient-info',
    name: 'Patient Information',
    icon: '👤',
    keywords: [
      'patient', 'patients', 'demographics', 'history', 'medical history',
      'contact', 'address', 'phone', 'email', 'birthday', 'dob',
      'date of birth', 'family', 'responsible party', 'guardian',
      'emergency contact', 'allergies', 'medication', 'medications',
      'medical alert', 'health history', 'chart', 'record', 'patient record',
      'lookup', 'look up', 'find patient', 'search patient', 'pull up',
    ],
  },
  {
    id: 'financial',
    name: 'Financial & Billing',
    icon: '💰',
    keywords: [
      'balance', 'balances', 'payment', 'payments', 'collection', 'collections',
      'billing', 'bill', 'accounts receivable', 'a/r', 'ar', 'aging',
      'aged', 'ledger', 'overdue', 'outstanding', 'owe', 'owes', 'owed',
      'revenue', 'production', 'income', 'charge', 'charges', 'fee', 'fees',
      'write-off', 'write off', 'adjustment', 'refund', 'credit',
      'financial', 'money', 'cost', 'price', 'estimate',
    ],
  },
  {
    id: 'insurance',
    name: 'Insurance & Claims',
    icon: '🏥',
    keywords: [
      'insurance', 'claim', 'claims', 'eligibility', 'coverage', 'benefits',
      'denial', 'denied', 'remittance', 'eob', 'explanation of benefits',
      'pre-authorization', 'pre-auth', 'preauth', 'prior authorization',
      'verification', 'verify', 'payer', 'carrier', 'plan',
      'deductible', 'copay', 'co-pay', 'coinsurance', 'maximum',
      'annual max', 'remaining benefits', 'frequency limitation',
      'insurance card', 'subscriber', 'group number', 'member id',
    ],
  },
  {
    id: 'clinical',
    name: 'Clinical & Treatment',
    icon: '🦷',
    keywords: [
      'treatment plan', 'treatment', 'procedure', 'procedures', 'clinical',
      'clinical notes', 'diagnosis', 'perio', 'periodontal', 'chart',
      'charting', 'x-ray', 'xray', 'radiograph', 'crown', 'filling',
      'extraction', 'root canal', 'implant', 'veneer', 'bridge',
      'denture', 'orthodontic', 'braces', 'aligner', 'whitening',
      'prophy', 'prophylaxis', 'scaling', 'treatment acceptance',
      'case acceptance', 'unscheduled treatment', 'pending treatment',
      'completed treatment', 'tooth', 'teeth',
    ],
  },
  {
    id: 'provider-staff',
    name: 'Provider & Staff',
    icon: '👨‍⚕️',
    keywords: [
      'provider', 'providers', 'doctor', 'doctors', 'dentist', 'hygienist',
      'hygienists', 'staff', 'team', 'assistant', 'credentials', 'production',
      'provider production', 'provider schedule', 'hours', 'fte',
      'npi', 'license', 'utilization', 'productivity', 'performance',
      'bonus', 'compensation', 'collections per', 'production per',
    ],
  },
  {
    id: 'operations',
    name: 'Practice Operations',
    icon: '📊',
    keywords: [
      'office', 'offices', 'location', 'locations', 'operatory',
      'production', 'report', 'reports', 'reporting', 'performance',
      'metrics', 'kpi', 'dashboard', 'compare', 'comparison', 'benchmark',
      'trend', 'trends', 'growth', 'decline', 'month over month',
      'year over year', 'new patients', 'patient retention', 'attrition',
      'active patients', 'compliance', 'efficiency', 'overhead',
      'profit', 'loss', 'p&l', 'goal', 'goals', 'target', 'targets',
      'across all', 'all locations', 'enterprise', 'rollup', 'aggregate',
    ],
  },
  {
    id: 'documents',
    name: 'Documents & Records',
    icon: '📄',
    keywords: [
      'document', 'documents', 'upload', 'records', 'notes', 'forms',
      'consent', 'consent form', 'signature', 'scan', 'attachment',
      'file', 'files', 'pdf', 'image', 'photo', 'referral letter',
      'correspondence', 'letter', 'lab', 'lab case', 'prescription',
      'questionnaire', 'intake form', 'paperwork',
    ],
  },
];

/**
 * Detect themes for a given question text.
 * Returns an array of matching theme IDs sorted by relevance (most keywords matched first).
 */
export function detectThemes(questionText) {
  const text = questionText.toLowerCase();
  const matches = [];

  for (const theme of themes) {
    const matchCount = theme.keywords.filter((kw) => text.includes(kw)).length;
    if (matchCount > 0) {
      matches.push({ themeId: theme.id, themeName: theme.name, matchCount });
    }
  }

  // Sort by match count descending
  matches.sort((a, b) => b.matchCount - a.matchCount);

  // Return primary theme (highest match count) or 'uncategorized'
  if (matches.length === 0) {
    return [{ themeId: 'uncategorized', themeName: 'Other / Uncategorized', matchCount: 0 }];
  }

  return matches;
}

export function getPrimaryTheme(questionText) {
  const results = detectThemes(questionText);
  return results[0];
}

export default themes;
