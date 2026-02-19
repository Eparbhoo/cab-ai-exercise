// Denticon External API Endpoints catalog and intelligent mapping logic

export const endpoints = {
  // APPOINTMENTS API
  'GET Appointment by ID': {
    category: 'Appointments',
    description: 'Retrieves detail for a specific appointment',
    capabilities: ['single appointment lookup', 'appointment details'],
  },
  'GET Appointments': {
    category: 'Appointments',
    description: 'Retrieves appointments by office/patient with date filters',
    capabilities: ['appointment list', 'schedule view', 'daily schedule', 'appointments by date', 'appointments by patient'],
  },
  'GET Available Appointment Slots': {
    category: 'Appointments',
    description: 'Gets open scheduling slots by criteria',
    capabilities: ['open slots', 'availability check', 'scheduling openings'],
  },
  'GET Recalls': {
    category: 'Appointments',
    description: 'Gets patient recall appointments by office',
    capabilities: ['recall list', 'recall due dates', 'overdue recalls'],
  },

  // PATIENTS API
  'GET Patient by Patient ID': {
    category: 'Patients',
    description: 'Get full patient demographics',
    capabilities: ['patient lookup', 'patient demographics', 'patient details'],
  },
  'GET Patients': {
    category: 'Patients',
    description: 'Get all patients by practice group/office with date filters',
    capabilities: ['patient list', 'patient search', 'patients by office'],
  },
  'GET Contacts by Telephone': {
    category: 'Patients',
    description: 'Find patient/RP records by phone number',
    capabilities: ['phone lookup', 'caller ID', 'find by phone'],
  },
  'POST Check Existing Patient': {
    category: 'Patients',
    description: 'Verify if patient exists (by name + DOB)',
    capabilities: ['duplicate check', 'patient exists', 'patient verification'],
  },
  'GET Appointment Notes': {
    category: 'Patients',
    description: 'Get appointment notes for a patient',
    capabilities: ['appointment notes', 'visit notes'],
  },
  'GET Patient Notes': {
    category: 'Patients',
    description: 'Get patient notes for a patient',
    capabilities: ['patient notes', 'clinical notes'],
  },
  'GET Financial Notes': {
    category: 'Patients',
    description: 'Get financial notes for a patient',
    capabilities: ['financial notes', 'billing notes'],
  },
  'GET Responsible Party Notes': {
    category: 'Patients',
    description: 'Get RP notes for a patient',
    capabilities: ['responsible party notes'],
  },
  'GET Insurance Plans': {
    category: 'Patients',
    description: 'Get insurance plans by office with date filters',
    capabilities: ['insurance plans', 'plan list', 'office insurance'],
  },
  'GET Insurance Plans by Patient ID': {
    category: 'Patients',
    description: 'Get insurance for specific patient',
    capabilities: ['patient insurance', 'insurance lookup', 'coverage details'],
  },
  'GET Medical History': {
    category: 'Patients',
    description: 'Get medical history answers by office',
    capabilities: ['medical history', 'health history', 'medical alerts'],
  },
  'GET Medical History by Patient ID': {
    category: 'Patients',
    description: 'Get medical history for specific patient',
    capabilities: ['patient medical history', 'patient health history'],
  },
  'GET Responsible Parties': {
    category: 'Patients',
    description: 'Get all RPs by office',
    capabilities: ['responsible parties list', 'guarantors'],
  },
  'GET Responsible Party By ID': {
    category: 'Patients',
    description: 'Get specific RP details',
    capabilities: ['responsible party details', 'guarantor details'],
  },
  'GET Responsible Party by Patient ID': {
    category: 'Patients',
    description: 'Get RP for specific patient',
    capabilities: ['patient responsible party', 'patient guarantor'],
  },

  // CLINICAL API
  'GET Treatment Plans': {
    category: 'Clinical',
    description: 'Get treatment plans by office with date filters',
    capabilities: ['treatment plans', 'pending treatment', 'treatment list'],
  },
  'GET Treatment Plans by Patient ID': {
    category: 'Clinical',
    description: 'Get treatment plans for specific patient',
    capabilities: ['patient treatment plan', 'patient treatment history'],
  },

  // PRACTICES API
  'GET Offices': {
    category: 'Practices',
    description: 'Get all offices in practice group',
    capabilities: ['office list', 'locations', 'practice locations'],
  },
  'GET Office by Office ID': {
    category: 'Practices',
    description: 'Get specific office details',
    capabilities: ['office details', 'location details'],
  },
  'GET Providers': {
    category: 'Practices',
    description: 'Get all providers with office filtering',
    capabilities: ['provider list', 'doctor list', 'staff list'],
  },
  'GET Provider by Provider ID': {
    category: 'Practices',
    description: 'Get specific provider details',
    capabilities: ['provider details', 'doctor details'],
  },
  'GET Operatories': {
    category: 'Practices',
    description: 'Get operatories by office',
    capabilities: ['operatory list', 'room list', 'chairs'],
  },
  'GET Procedure Codes': {
    category: 'Practices',
    description: 'Get all procedure codes',
    capabilities: ['procedure codes', 'CDT codes', 'fee schedule reference'],
  },
  'GET Scheduler Production Types': {
    category: 'Practices',
    description: 'Get appointment types by office',
    capabilities: ['appointment types', 'production types', 'scheduling categories'],
  },
  'GET Cancellation Codes': {
    category: 'Practices',
    description: 'Get cancellation reason codes',
    capabilities: ['cancellation reasons', 'cancel codes'],
  },
  'GET Document Types': {
    category: 'Practices',
    description: 'Get document type codes',
    capabilities: ['document types', 'document categories'],
  },
  'GET Medical Alerts': {
    category: 'Practices',
    description: 'Get medical alert definitions by office',
    capabilities: ['medical alerts', 'alert types'],
  },
  'GET Questionnaires': {
    category: 'Practices',
    description: 'Get health form setup by office',
    capabilities: ['questionnaires', 'health forms', 'intake forms'],
  },
  'GET Referral Types': {
    category: 'Practices',
    description: 'Get referral source codes',
    capabilities: ['referral types', 'referral sources'],
  },
  'GET Patient Type Codes': {
    category: 'Practices',
    description: 'Get patient classification codes',
    capabilities: ['patient types', 'patient categories'],
  },
  'GET Preferred Languages': {
    category: 'Practices',
    description: 'Get language options',
    capabilities: ['languages', 'preferred language'],
  },
  'GET Pronouns': {
    category: 'Practices',
    description: 'Get pronoun options',
    capabilities: ['pronouns'],
  },
  'GET Practice Group': {
    category: 'Practices',
    description: 'Get practice-level info',
    capabilities: ['practice group', 'organization info'],
  },

  // RCM (Revenue Cycle) API
  'GET Account Balance by Office ID': {
    category: 'RCM',
    description: 'Get A/R aging by office',
    capabilities: ['ar aging', 'office balance', 'accounts receivable by office'],
  },
  'GET Account Balance by RP ID': {
    category: 'RCM',
    description: 'Get aging for specific responsible party',
    capabilities: ['patient balance', 'rp balance', 'account aging'],
  },
  'GET Appointment Insurance': {
    category: 'RCM',
    description: 'Get insurance for patients with appointments on a date',
    capabilities: ['daily insurance verification', 'appointment insurance'],
  },
  'GET Claims by Date of Service': {
    category: 'RCM',
    description: 'Get claims filtered by DoS, type, status',
    capabilities: ['claims list', 'claims by date', 'claim status', 'denied claims'],
  },
  'GET Claim by Claim UID': {
    category: 'RCM',
    description: 'Get specific claim details',
    capabilities: ['claim details', 'individual claim'],
  },
  'GET Ledger by Ledger ID': {
    category: 'RCM',
    description: 'Get specific ledger record',
    capabilities: ['ledger entry', 'transaction detail'],
  },
  'GET Ledgers by Office ID': {
    category: 'RCM',
    description: 'Get ledger records by office with date filters',
    capabilities: ['office ledger', 'transaction history', 'office transactions'],
  },

  // INSIGHTS API
  'POST Create Insights': {
    category: 'Insights',
    description: 'Submit AI scores/predictions for patients',
    capabilities: ['ai predictions', 'risk scores', 'patient insights'],
  },

  // SUBSCRIPTIONS API
  'POST Create Subscription': {
    category: 'Subscriptions',
    description: 'Subscribe to data sync for entity type + office',
    capabilities: ['data sync', 'real-time data', 'event subscription'],
  },
  'GET Subscriptions': {
    category: 'Subscriptions',
    description: 'List active subscriptions',
    capabilities: ['subscription list', 'active syncs'],
  },
  'GET Slice Locations': {
    category: 'Subscriptions',
    description: 'Get data slice storage locations',
    capabilities: ['data locations', 'slice locations'],
  },
  'GET Slice': {
    category: 'Subscriptions',
    description: 'Download data slice',
    capabilities: ['data download', 'bulk data'],
  },
  'DELETE Subscription': {
    category: 'Subscriptions',
    description: 'Remove subscription',
    capabilities: ['unsubscribe', 'remove sync'],
  },
};

// Mapping rules: keyword patterns → endpoint matches with coverage assessment
const mappingRules = [
  // SCHEDULING
  {
    patterns: [
      /(?:what|who|which|show|list|get).*(?:schedule|appointment|on the schedule|booked)/i,
      /(?:tomorrow|today|this week|next week).*(?:schedule|appointment)/i,
      /(?:schedule|appointment).*(?:tomorrow|today|this week|next week)/i,
      /(?:who|which patients?).*(?:coming in|scheduled|booked)/i,
      /(?:daily|morning|afternoon)\s*schedule/i,
    ],
    endpoints: ['GET Appointments'],
    coverage: 'covered',
    notes: 'GET Appointments supports date and office filtering for schedule views.',
  },
  {
    patterns: [
      /(?:open|available|free)\s*(?:slot|time|appointment|opening)/i,
      /(?:when|what time).*(?:available|open|free)/i,
      /(?:next available|first available|soonest)/i,
      /(?:find|book|schedule).*(?:opening|slot|time)/i,
    ],
    endpoints: ['GET Available Appointment Slots'],
    coverage: 'covered',
    notes: 'GET Available Appointment Slots retrieves open scheduling slots by criteria.',
  },
  {
    patterns: [
      /(?:recall|overdue recall|recall due|due for recall)/i,
      /(?:haven't been in|haven't come back|past due|overdue.*cleaning)/i,
      /(?:recall compliance|recall rate)/i,
    ],
    endpoints: ['GET Recalls'],
    coverage: 'partial',
    notes: 'GET Recalls returns recall data but does not calculate compliance rates or aggregate statistics. Additional computation needed.',
  },
  {
    patterns: [
      /(?:cancel|cancellation|no.?show|missed|broken)\s*(?:appointment|rate|reason)/i,
      /(?:why|how many).*(?:cancel|no.?show)/i,
    ],
    endpoints: ['GET Appointments', 'GET Cancellation Codes'],
    coverage: 'partial',
    notes: 'Can retrieve appointment data and cancellation codes, but no aggregated cancellation/no-show rate calculations.',
  },

  // PATIENT INFO
  {
    patterns: [
      /(?:pull up|look up|find|search|get|show|who is).*(?:patient|chart|record)/i,
      /(?:patient).*(?:information|info|details|demographics)/i,
      /(?:john|jane|patient named)/i,
    ],
    endpoints: ['GET Patient by Patient ID', 'GET Patients'],
    coverage: 'partial',
    notes: 'Can retrieve patient demographics, but no unified "chart" view. Need multiple calls for full patient picture (demographics + treatment + medical history + insurance).',
  },
  {
    patterns: [
      /(?:medical history|health history|allergies|medication|medical alert)/i,
      /(?:medical condition|health condition|medical record)/i,
    ],
    endpoints: ['GET Medical History by Patient ID', 'GET Medical Alerts'],
    coverage: 'covered',
    notes: 'Medical history and alerts are available per patient.',
  },
  {
    patterns: [
      /(?:who.?s calling|caller|phone|called from)/i,
      /(?:find|look up|search).*(?:phone|number|telephone)/i,
    ],
    endpoints: ['GET Contacts by Telephone'],
    coverage: 'covered',
    notes: 'Direct phone number lookup supported.',
  },
  {
    patterns: [
      /(?:new patient|patient exist|duplicate|already in system)/i,
      /(?:check if|verify|is this patient)/i,
    ],
    endpoints: ['POST Check Existing Patient'],
    coverage: 'covered',
    notes: 'Patient existence check by name + DOB supported.',
  },
  {
    patterns: [
      /(?:responsible party|guarantor|parent|guardian)/i,
    ],
    endpoints: ['GET Responsible Party by Patient ID', 'GET Responsible Parties'],
    coverage: 'covered',
    notes: 'Responsible party lookup fully supported.',
  },

  // FINANCIAL & BILLING
  {
    patterns: [
      /(?:balance|owe|outstanding|overdue|past due|unpaid)/i,
      /(?:how much|what).*(?:owe|balance|due)/i,
      /(?:patient|account).*(?:balance|owe)/i,
    ],
    endpoints: ['GET Account Balance by RP ID', 'GET Account Balance by Office ID'],
    coverage: 'partial',
    notes: 'Account balances available by RP or office, but filtering by amount threshold (e.g., "over $500") requires client-side logic.',
  },
  {
    patterns: [
      /(?:aging|a\/?r|accounts receivable|receivable)/i,
      /(?:30|60|90|120)\s*(?:day|days)/i,
    ],
    endpoints: ['GET Account Balance by Office ID'],
    coverage: 'partial',
    notes: 'A/R aging by office available, but cross-office aggregation and trending requires additional computation.',
  },
  {
    patterns: [
      /(?:ledger|transaction|payment history|charge history)/i,
    ],
    endpoints: ['GET Ledgers by Office ID', 'GET Ledger by Ledger ID'],
    coverage: 'covered',
    notes: 'Ledger records retrievable by office with date filters.',
  },
  {
    patterns: [
      /(?:production|revenue|collection|income)\s*(?:number|report|total|daily|monthly|weekly)/i,
      /(?:how much|what|show).*(?:production|revenue|collected)/i,
      /(?:production|revenue).*(?:last month|this month|today|this week)/i,
    ],
    endpoints: [],
    coverage: 'not_covered',
    notes: 'No aggregated production/revenue reporting endpoint. Would need to compute from ledger data — extremely inefficient for large practices. Need a dedicated production/revenue summary endpoint.',
  },
  {
    patterns: [
      /(?:write.?off|adjustment|credit|refund)/i,
    ],
    endpoints: ['GET Ledgers by Office ID'],
    coverage: 'partial',
    notes: 'Ledger entries may contain write-offs/adjustments but no dedicated endpoint for filtering by transaction type.',
  },

  // INSURANCE & CLAIMS
  {
    patterns: [
      /(?:insurance|coverage|benefits|plan|carrier|payer)/i,
      /(?:patient|check).*insurance/i,
      /(?:insurance).*(?:patient|check|verify)/i,
      /(?:eligibility|eligible|verify insurance|insurance verification)/i,
    ],
    endpoints: ['GET Insurance Plans by Patient ID', 'GET Insurance Plans'],
    coverage: 'covered',
    notes: 'Insurance plan lookup by patient or office supported.',
  },
  {
    patterns: [
      /(?:claim|claims)\s*(?:status|denied|rejected|pending|outstanding)/i,
      /(?:denied|rejected|outstanding)\s*claims?/i,
      /(?:how many|which|what|show|list).*claims?/i,
    ],
    endpoints: ['GET Claims by Date of Service', 'GET Claim by Claim UID'],
    coverage: 'partial',
    notes: 'Claims retrievable by date of service and status, but aggregated claim analytics (denial rates, average processing time) not available.',
  },
  {
    patterns: [
      /(?:remaining benefits|annual max|deductible|copay|coinsurance)/i,
      /(?:how much|what).*(?:remaining|left|benefit)/i,
    ],
    endpoints: ['GET Insurance Plans by Patient ID'],
    coverage: 'partial',
    notes: 'Insurance plan info available but real-time remaining benefits may require eligibility verification call.',
  },

  // CLINICAL & TREATMENT
  {
    patterns: [
      /(?:treatment plan|treatment|pending treatment|unscheduled treatment)/i,
      /(?:what treatment|which procedure|recommended|proposed)/i,
    ],
    endpoints: ['GET Treatment Plans by Patient ID', 'GET Treatment Plans'],
    coverage: 'covered',
    notes: 'Treatment plans retrievable by patient or office with date filters.',
  },
  {
    patterns: [
      /(?:treatment acceptance|case acceptance|acceptance rate)/i,
      /(?:how many|what percent).*(?:accept|decline|treatment)/i,
    ],
    endpoints: ['GET Treatment Plans'],
    coverage: 'partial',
    notes: 'Treatment plan data available but acceptance rate calculations require client-side aggregation. No built-in acceptance rate metric.',
  },
  {
    patterns: [
      /(?:procedure code|cdt|fee schedule|code lookup)/i,
    ],
    endpoints: ['GET Procedure Codes'],
    coverage: 'covered',
    notes: 'Procedure code reference fully available.',
  },
  {
    patterns: [
      /(?:perio|periodontal|probing|pocket depth|bleeding)/i,
    ],
    endpoints: [],
    coverage: 'not_covered',
    notes: 'No periodontal charting endpoint. Perio data is clinical/charting data not exposed through current API.',
  },
  {
    patterns: [
      /(?:clinical note|progress note|treatment note|chart note)/i,
    ],
    endpoints: ['GET Patient Notes', 'GET Appointment Notes'],
    coverage: 'partial',
    notes: 'Notes available but these are administrative notes, not full clinical chart notes with procedures, tooth charting, etc.',
  },

  // PROVIDER & STAFF
  {
    patterns: [
      /(?:provider|doctor|dentist|hygienist)\s*(?:schedule|availability|hours)/i,
      /(?:who.?s working|who.?s in|staff on|team on)/i,
    ],
    endpoints: ['GET Providers', 'GET Appointments'],
    coverage: 'partial',
    notes: 'Provider list and appointments available, but no dedicated provider schedule/availability view. Must infer from appointment data.',
  },
  {
    patterns: [
      /(?:provider|doctor|dentist)\s*(?:production|performance|numbers|metrics)/i,
      /(?:how much|what).*(?:provider|doctor|dentist).*(?:produced|collected)/i,
    ],
    endpoints: [],
    coverage: 'not_covered',
    notes: 'No provider-level production/performance reporting. Would need aggregation across ledger entries by provider — not available as an endpoint.',
  },
  {
    patterns: [
      /(?:provider|doctor|dentist)\s*(?:list|details|info|credential)/i,
    ],
    endpoints: ['GET Providers', 'GET Provider by Provider ID'],
    coverage: 'covered',
    notes: 'Provider details and listing fully supported.',
  },

  // PRACTICE OPERATIONS
  {
    patterns: [
      /(?:office|location|practice)\s*(?:list|details|info|all)/i,
      /(?:which|how many|list).*(?:office|location|practice)/i,
    ],
    endpoints: ['GET Offices', 'GET Office by Office ID'],
    coverage: 'covered',
    notes: 'Office listing and details fully supported.',
  },
  {
    patterns: [
      /(?:operatory|room|chair)\s*(?:list|utilization|usage|available)/i,
    ],
    endpoints: ['GET Operatories'],
    coverage: 'partial',
    notes: 'Operatory listing available but utilization/usage metrics not computed.',
  },
  {
    patterns: [
      /(?:compare|comparison|benchmark|rank|ranking).*(?:office|location|practice)/i,
      /(?:office|location).*(?:compare|comparison|versus|vs|benchmark)/i,
      /(?:best|worst|top|bottom).*(?:performing|office|location)/i,
    ],
    endpoints: [],
    coverage: 'not_covered',
    notes: 'No cross-office comparison or benchmarking endpoints. Would need aggregated metrics across offices — production, collections, patient counts, etc.',
  },
  {
    patterns: [
      /(?:kpi|dashboard|metric|report|analytics|overview|summary|snapshot)/i,
      /(?:how.?s|how is|how are).*(?:office|practice|business|we doing)/i,
    ],
    endpoints: [],
    coverage: 'not_covered',
    notes: 'No aggregated dashboard/KPI/summary endpoint. Would need to compile data from multiple endpoints for a practice overview.',
  },
  {
    patterns: [
      /(?:new patient|new patients)\s*(?:count|number|how many|this month|this week|trend)/i,
      /(?:how many|count).*new patient/i,
    ],
    endpoints: ['GET Patients'],
    coverage: 'partial',
    notes: 'Can filter patients by date to find new patients, but no dedicated new patient count/trend endpoint.',
  },
  {
    patterns: [
      /(?:patient retention|attrition|lost patient|inactive patient|active patient)/i,
    ],
    endpoints: [],
    coverage: 'not_covered',
    notes: 'No patient retention/attrition analytics. Would need to define "active" criteria and compute from visit history.',
  },
  {
    patterns: [
      /(?:goal|target|budget|forecast|projection)/i,
    ],
    endpoints: [],
    coverage: 'not_covered',
    notes: 'No goal tracking, budgeting, or forecasting endpoints. Practice goals are not stored in the API.',
  },

  // DOCUMENTS
  {
    patterns: [
      /(?:document|upload|scan|attachment|image|photo|file)/i,
      /(?:consent form|intake form|paperwork|form)/i,
    ],
    endpoints: ['GET Document Types'],
    coverage: 'partial',
    notes: 'Document type codes available, but document retrieval/search requires additional endpoints not in current read-only API. Write endpoints exist for creating documents.',
  },
  {
    patterns: [
      /(?:referral|refer|referred|referral source)/i,
    ],
    endpoints: ['GET Referral Types'],
    coverage: 'partial',
    notes: 'Referral type codes available but referral tracking/analytics not provided.',
  },

  // COMMUNICATION
  {
    patterns: [
      /(?:text|sms|email|message|remind|reminder|confirm|notification|communicate)/i,
      /(?:send|contact|reach out|follow up|outreach)/i,
    ],
    endpoints: [],
    coverage: 'not_covered',
    notes: 'No patient communication/messaging endpoints. Cannot send texts, emails, or reminders through current API.',
  },

  // REPORTING/ANALYTICS
  {
    patterns: [
      /(?:report|generate report|run report|pull report|export)/i,
      /(?:data|download|extract|export)/i,
    ],
    endpoints: ['GET Slice'],
    coverage: 'partial',
    notes: 'Bulk data downloads via Subscriptions API, but no pre-built reports or analytics endpoints.',
  },

  // AI/AUTOMATION
  {
    patterns: [
      /(?:predict|prediction|risk|likelihood|probability|forecast|ai score)/i,
      /(?:which patient.*likely|who.*most likely|at risk)/i,
    ],
    endpoints: ['POST Create Insights'],
    coverage: 'partial',
    notes: 'Can submit AI predictions via Insights API, but no built-in prediction generation. Insights API is write-only for scores.',
  },

  // INTEGRATION / REAL-TIME
  {
    patterns: [
      /(?:real.?time|live|sync|integrate|integration|webhook|notification|alert)/i,
    ],
    endpoints: ['POST Create Subscription', 'GET Subscriptions'],
    coverage: 'partial',
    notes: 'Data sync subscriptions available for real-time data, but limited to specific entity types. No general webhook/notification system.',
  },
];

/**
 * Map a question to relevant API endpoints.
 * Returns { endpoints, coverage, notes, mappedEndpoints }
 */
export function mapQuestionToEndpoints(questionText) {
  const text = questionText.toLowerCase();
  const allMatches = [];

  for (const rule of mappingRules) {
    for (const pattern of rule.patterns) {
      if (pattern.test(text)) {
        allMatches.push(rule);
        break; // Only match once per rule
      }
    }
  }

  if (allMatches.length === 0) {
    return {
      mappedEndpoints: [],
      coverage: 'not_covered',
      notes: 'No matching API endpoints identified. This question may require a new endpoint or capability not currently in the Denticon External API.',
    };
  }

  // Determine overall coverage
  const coverages = allMatches.map((m) => m.coverage);
  let overallCoverage = 'covered';
  if (coverages.includes('not_covered')) {
    overallCoverage = coverages.every((c) => c === 'not_covered') ? 'not_covered' : 'partial';
  } else if (coverages.includes('partial')) {
    overallCoverage = 'partial';
  }

  // Collect unique endpoints
  const endpointSet = new Set();
  allMatches.forEach((m) => m.endpoints.forEach((e) => endpointSet.add(e)));

  // Combine notes
  const notes = allMatches.map((m) => m.notes).join(' ');

  return {
    mappedEndpoints: Array.from(endpointSet),
    coverage: overallCoverage,
    notes,
  };
}

export default endpoints;
