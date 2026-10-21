/**
 * SCHOLAR GATE - Main Application Controller
 * Orchestrates multi-step eligibility wizard, rule-based matching, bilingual translation,
 * localStorage persistence, card rendering, filters, modal checklist, and FAQ.
 */

// Global Application State
const AppState = {
  language: 'en',
  scholarships: [],
  demoProfiles: [],
  activeProfile: null,
  activeFilters: {
    state: '',
    class: '',
    category: '',
    status: '',
    search: ''
  },
  currentSort: 'score',
  wizardStep: 1,
  selectedScholarship: null,
  faqCategory: 'all',
  faqSearch: ''
};

// Comprehensive Categorized FAQ Dataset (English and Telugu)
const FAQ_DATA = [
  // 1. General & Basics
  {
    category: "general",
    qEn: "What is SCHOLAR GATE and who is it designed for?",
    qTe: "స్కాలర్ గేట్ (SCHOLAR GATE) అంటే ఏమిటి మరియు ఇది ఎవరి కోసం రూపొందించబడింది?",
    aEn: "SCHOLAR GATE is a free, student-initiated College Community Service Project (CSP). It is designed specifically for school students (Classes 1–12), parents, and rural community workers across Andhra Pradesh, Telangana, and All India to easily identify verified government scholarships without confusion or middlemen.",
    aTe: "స్కాలర్ గేట్ అనేది కళాశాల విద్యార్థుల కమ్యూనిటీ సర్వీస్ ప్రాజెక్ట్ (CSP). ఆంధ్రప్రదేశ్, తెలంగాణ మరియు దేశవ్యాప్తంగా 1 నుండి 12వ తరగతి చదువుతున్న పాఠశాల విద్యార్థులు, వారి తల్లిదండ్రులు మరియు గ్రామీణ సహాయకులు ఎవరి మధ్యవర్తుల ప్రమేయం లేకుండా అర్హత గల ప్రభుత్వ స్కాలర్‌షిప్‌లను సులభంగా కనుగొనడానికి ఇది ఉద్దేశించబడింది."
  },
  {
    category: "general",
    qEn: "Are these government scholarships or loans that need repayment?",
    qTe: "ఇవి ప్రభుత్వ స్కాలర్‌షిప్‌లా లేదా తిరిగి చెల్లించాల్సిన లోన్లా?",
    aEn: "All schemes listed on SCHOLAR GATE are 100% non-repayable government educational grants and welfare stipends. Unlike bank education loans, government scholarships do not have to be paid back under any circumstances.",
    aTe: "ఈ పోర్టల్‌లో ఉన్న అన్ని పథకాలు 100% కేంద్ర మరియు రాష్ట్ర ప్రభుత్వాలు ఉచితంగా అందించే విద్యా సహాయ నిధులు (గ్రాంట్లు). బ్యాంక్ లోన్ల మాదిరిగా వీటిని తిరిగి చెల్లించాల్సిన అవసరం ఎట్టిపరిస్థితుల్లోనూ ఉండదు."
  },
  {
    category: "general",
    qEn: "Does SCHOLAR GATE or any government portal charge an application fee?",
    qTe: "స్కాలర్ గేట్ లేదా ప్రభుత్వ పోర్టల్స్ ఏదైనా దరఖాస్తు రుసుము వసూలు చేస్తాయా?",
    aEn: "No. SCHOLAR GATE is 100% free and open access. Furthermore, applying on official government portals (scholarships.gov.in, jnanabhumi.ap.gov.in, telanganaepass.cgg.gov.in) is completely free. Never pay money to any agent or broker claiming to guarantee a scholarship.",
    aTe: "లేదు. స్కాలర్ గేట్ పూర్తిగా ఉచితం. అలాగే అధికారిక ప్రభుత్వ వెబ్‌సైట్లలో (NSP, జ్ఞానభూమి, ఈపాస్) దరఖాస్తు చేసుకోవడం కూడా పూర్తిగా ఉచితం. స్కాలర్‌షిప్ ఇప్పిస్తామని ఫీజులు అడిగే ఏ దళారులకు లేదా ఏజెంట్లకు ఎప్పుడూ డబ్బు ఇవ్వకండి."
  },

  // 2. Eligibility & Class Levels
  {
    category: "eligibility",
    qEn: "Which scholarships are available for primary school students (Classes 1 to 5)?",
    qTe: "ప్రాథమిక పాఠశాల విద్యార్థులకు (1 నుండి 5 తరగతులు) ఏ స్కాలర్‌షిప్‌లు అందుబాటులో ఉన్నాయి?",
    aEn: "For primary classes, scholarships are primarily offered to students from Scheduled Caste (SC) and Scheduled Tribe (ST) communities, students with disabilities (Divyangjan), and children whose parents work in hazardous occupations (sanitation, ragpicking, flaying). In Andhra Pradesh, schemes like Jagananna Amma Vodi support mothers for educating children in all primary and secondary grades.",
    aTe: "ప్రాథమిక తరగతులకు ఎస్సీ (SC), ఎస్టీ (ST) విద్యార్థులు, దివ్యాంగ విద్యార్థులు మరియు శానిటేషన్ వంటి వృత్తులలో పనిచేసే కార్మికుల పిల్లలకు ప్రీ-మెట్రిక్ స్కాలర్‌షిప్‌లు అందుబాటులో ఉన్నాయి. ఆంధ్రప్రదేశ్‌లో అమ్మఒడి పథకం ద్వారా 1 నుండి 12వ తరగతి వరకు చదువుతున్న పిల్లల తల్లులకు ఆర్థిక సహాయం లభిస్తుంది."
  },
  {
    category: "eligibility",
    qEn: "What are the flagship scholarships for Class 8, 9, and 10 students?",
    qTe: "8, 9, 10వ తరగతి విద్యార్థులకు ఉన్న ప్రధాన స్కాలర్‌షిప్‌లు ఏమిటి?",
    aEn: "The premier scheme is the National Means-cum-Merit Scholarship Scheme (NMMSS), which awards ₹12,000 per year (₹48,000 across Classes 9 to 12) through a state-level selection exam in Class 8. In addition, state welfare departments in AP and Telangana run extensive Pre-Matric SC/ST/BC scholarship programs, and the Ministry of Social Justice offers PM YASASVI for OBC and EBC students.",
    aTe: "ముఖ్యమైన పథకం నేషనల్ మీన్స్-కమ్-మెరిట్ స్కాలర్‌షిప్ (NMMSS). 8వ తరగతిలో పరీక్ష ద్వారా ఎంపికైతే 9 నుండి 12వ తరగతి వరకు ఏడాదికి ₹12,000 (మొత్తం ₹48,000) అందుతాయి. వీటితో పాటు ఏపీ మరియు తెలంగాణ రాష్ట్రాల ప్రీ-మెట్రిక్ సంక్షేమ స్కాలర్‌షిప్‌లు, కేంద్ర ప్రభుత్వం ఇచ్చే PM YASASVI పథకాలు ఉన్నాయి."
  },
  {
    category: "eligibility",
    qEn: "Can students studying in Private or Unaided schools apply?",
    qTe: "ప్రైవేట్ లేదా అన్-ఎయిడెడ్ పాఠశాలల్లో చదువుతున్న విద్యార్థులు దరఖాస్తు చేసుకోవచ్చా?",
    aEn: "Yes, for certain specific schemes. For example, the Pre-Matric Scholarship for Students with Disabilities (DEPwD), stipends for children of Beedi/Cine/Mine workers, and PM YASASVI allow students in recognized private schools. However, schemes like NMMSS and State Government Pre-Matric strictly mandate enrollment in Government, Zilla Parishad, Mandal Parishad, or Government-Aided schools.",
    aTe: "అవును, కొన్ని నిర్దిష్ట పథకాలకు అవకాశం ఉంది. ఉదాహరణకు దివ్యాంగుల స్కాలర్‌షిప్, బీడీ మరియు గని కార్మికుల పిల్లల స్కాలర్‌షిప్, PM YASASVI పథకాలు గుర్తింపు పొందిన ప్రైవేట్ పాఠశాల విద్యార్థులకు వర్తిస్తాయి. అయితే NMMSS మరియు రాష్ట్ర ప్రభుత్వ ప్రీ-మెట్రిక్ పథకాలు కేవలం ప్రభుత్వ మరియు ఎయిడెడ్ పాఠశాలల విద్యార్థులకే వర్తిస్తాయి."
  },
  {
    category: "eligibility",
    qEn: "What minimum academic marks are required to qualify?",
    qTe: "అర్హత పొందడానికి విద్యార్థికి కనీసం ఎంత శాతం మార్కులు ఉండాలి?",
    aEn: "Most welfare pre-matric scholarships require regular attendance (at least 75%) and passing the previous annual examination (minimum 50% to 55%). For merit-cum-means scholarships like NMMSS, students must secure at least 55% marks in Class 7 (50% for SC/ST) and clear the competitive Mental Ability & Scholastic Aptitude tests.",
    aTe: "చాలా సంక్షేమ ప్రీ-మెట్రిక్ పథకాలకు కనీసం 75% హాజరు మరియు మునుపటి వార్షిక పరీక్షల్లో ఉత్తీర్ణత (50% నుండి 55% మార్కులు) అవసరం. NMMSS వంటి మెరిట్ పథకానికి 7వ తరగతిలో కనీసం 55% మార్కులు (SC/ST లకు 50%) ఉండాలి మరియు 8వ తరగతిలో నిర్వహించే ఎంపిక పరీక్షలో ఉత్తీర్ణత సాధించాలి."
  },

  // 3. Family Income & MeeSeva Certificates
  {
    category: "income",
    qEn: "What is the annual family income limit for most scholarships?",
    qTe: "స్కాలర్‌షిప్‌లకు సాధారణంగా కుటుంబ వార్షిక ఆదాయ పరిమితి ఎంత ఉంటుంది?",
    aEn: "For most State Pre-Matric welfare schemes (SC/ST/BC/OBC/Minority), the annual family income ceiling is typically ₹2,00,000 to ₹2,50,000 per year. For NMMSS, the income limit is up to ₹3,50,000 per year. For Beedi and Mine worker educational stipends, the monthly wage ceiling is ₹10,000 (₹1,20,000/year). Income certificates must be issued by a competent Revenue authority (Tahsildar/MRO).",
    aTe: "రాష్ట్ర ప్రీ-మెట్రిక్ సంక్షేమ పథకాలకు సాధారణంగా వార్షిక ఆదాయ పరిమితి ₹2,00,000 నుండి ₹2,50,000 లోపు ఉండాలి. NMMSS పథకానికి ₹3,50,000 వరకు పరిమితి ఉంటుంది. బీడీ మరియు గని కార్మికుల పిల్లలకు నెలకు ₹10,000 లోపు వేతనం ఉండాలి. ఈ ఆదాయాన్ని తహసీల్దార్ జారీ చేసిన మీసేవా ఆదాయ ధృవీకరణ పత్రం ద్వారా ధృవీకరించాలి."
  },
  {
    category: "income",
    qEn: "What if I do not know our family's exact annual income?",
    qTe: "నా కుటుంబ వార్షిక ఆదాయం ఖచ్చితంగా తెలియకపోతే ఏమి చేయాలి?",
    aEn: "In our Student Eligibility Form, simply choose 'Not sure'. The SCHOLAR GATE matching engine will not disqualify you; it will display all potential schemes and show the maximum allowed income ceiling for each, allowing you to cross-verify against your parent's ration card or income certificate.",
    aTe: "మా విద్యార్థి అర్హత ఫారమ్‌లో 'ఖచ్చితంగా తెలియదు' అని ఎంచుకోవచ్చు. స్కాలర్ గేట్ మిమ్మల్ని మినహాయించదు; సంబంధిత పథకాలను చూపిస్తూ వాటి ఆదాయ పరిమితులను సూచిస్తుంది. మీ తల్లిదండ్రుల రేషన్ కార్డ్ లేదా మీసేవా సర్టిఫికెట్ ద్వారా ఖచ్చితమైన ఆదాయాన్ని పరిశీలించుకోవచ్చు."
  },
  {
    category: "income",
    qEn: "How do I obtain a valid Income and Caste Certificate in AP and Telangana?",
    qTe: "ఆంధ్రప్రదేశ్ మరియు తెలంగాణలో కుల మరియు ఆదాయ ధృవీకరణ పత్రాలు ఎలా పొందాలి?",
    aEn: "In Andhra Pradesh, visit your local Village Sachivalayam (గ్రామ సచివాలయం) or Ward Sachivalayam and apply through the Digital Assistant. In Telangana, visit any authorized MeeSeva center. The application requires your ration card, Aadhaar card, and school bonafide. Once verified by the VRO/RI and approved by the Tahsildar, a digitally signed QR-coded certificate is issued.",
    aTe: "ఆంధ్రప్రదేశ్‌లో మీ గ్రామ సచివాలయం లేదా వార్డు సచివాలయంలో డిజిటల్ అసిస్టెంట్ ద్వారా దరఖాస్తు చేసుకోవచ్చు. తెలంగాణలో సమీపంలోని మీసేవా (MeeSeva) కేంద్రాన్ని సంప్రదించవచ్చు. రేషన్ కార్డ్, ఆధార్ కార్డ్ మరియు పాఠశాల బోనఫైడ్ సర్టిఫికెట్ ఆధారంగా తహసీల్దార్ డిజిటల్ సంతకంతో కూడిన సర్టిఫికెట్ జారీ చేస్తారు."
  },

  // 4. Documents & Bank Accounts
  {
    category: "documents",
    qEn: "What essential documents should a student keep ready before applying?",
    qTe: "దరఖాస్తు చేయడానికి ముందు విద్యార్థి ఏయే పత్రాలను సిద్ధంగా ఉంచుకోవాలి?",
    aEn: "Keep the following ready: (1) Student's Aadhaar Card, (2) Current school Study/Bonafide Certificate, (3) Previous class Marksheet/Progress Card, (4) MeeSeva Caste Certificate (for SC/ST/BC), (5) MeeSeva Income Certificate, (6) Student's Bank Passbook with IFSC and Account Number, and (7) Recent passport-size photographs. Specific schemes may also require UDID cards (for disability) or Parent Worker Identity cards.",
    aTe: "సిద్ధంగా ఉంచుకోవాల్సిన పత్రాలు: (1) విద్యార్థి ఆధార్ కార్డు, (2) ప్రస్తుత పాఠశాల బోనఫైడ్/స్టడీ సర్టిఫికెట్, (3) మునుపటి తరగతి మార్కుల జాబితా, (4) మీసేవా కుల ధృవీకరణ పత్రం, (5) మీసేవా ఆదాయ ధృవీకరణ పత్రం, (6) విద్యార్థి బ్యాంక్ పాస్‌బుక్, (7) పాస్‌పోర్ట్ సైజ్ ఫోటోలు. దివ్యాంగులకు UDID కార్డు, కార్మికుల పిల్లలకు గుర్తింపు కార్డు అవసరం."
  },
  {
    category: "documents",
    qEn: "Why must the student's bank account be linked with Aadhaar (DBT/NPCI)?",
    qTe: "విద్యార్థి బ్యాంక్ ఖాతాకు ఆధార్ లింక్ (DBT/NPCI) ఎందుకు తప్పనిసరి?",
    aEn: "Both Central and State Governments disburse scholarships directly through the Direct Benefit Transfer (DBT) system on the Aadhaar Payment Bridge (APB). If the bank account is not seeded with Aadhaar and mapped to NPCI, the funds transfer will fail even if the scholarship application is approved. Visit your bank branch and submit the Aadhaar-DBT consent form.",
    aTe: "కేంద్ర మరియు రాష్ట్ర ప్రభుత్వాలు స్కాలర్‌షిప్ డబ్బులను నేరుగా విద్యార్థి బ్యాంక్ ఖాతాకు DBT (డైరెక్ట్ బెనిఫిట్ ట్రాన్స్‌ఫర్) ద్వారా జమ చేస్తాయి. బ్యాంక్ ఖాతాకు ఆధార్ లింక్ (NPCI మ్యాపింగ్) లేకపోతే, స్కాలర్‌షిప్ మంజూరైనా డబ్బులు ఖాతాలో జమ కావు. మీ బ్యాంక్ బ్రాంచ్‌కు వెళ్లి ఆధార్ లింక్ చేసుకోవడం తప్పనిసరి."
  },
  {
    category: "documents",
    qEn: "What is a UDID Card and who needs it?",
    qTe: "UDID కార్డు అంటే ఏమిటి మరియు ఇది ఎవరికి అవసరం?",
    aEn: "A Unique Disability Identity (UDID) Card is an official smart card issued by the Ministry of Social Justice and Empowerment for persons with disabilities. Students with 40% or more benchmark disability require a UDID card or a District Medical Board certificate to claim disability-specific educational scholarships and equipment grants.",
    aTe: "UDID (యునిక్ డిసేబిలిటీ ఐడెంటిటీ) అనేది కేంద్ర ప్రభుత్వం దివ్యాంగులకు జారీ చేసే అధికారిక గుర్తింపు కార్డు. 40% లేదా అంతకంటే ఎక్కువ వైకల్యం ఉన్న విద్యార్థులు దివ్యాంగుల ప్రత్యేక స్కాలర్‌షిప్‌లు పొందడానికి ఈ కార్డు లేదా జిల్లా మెడికల్ బోర్డు సర్టిఫికెట్ అవసరం."
  },

  // 5. Application Process & Portals
  {
    category: "portals",
    qEn: "Can I apply or upload my documents directly on SCHOLAR GATE?",
    qTe: "స్కాలర్ గేట్ ద్వారా నేరుగా దరఖాస్తు చేసుకోవచ్చా లేదా పత్రాలు అప్‌లోడ్ చేయవచ్చా?",
    aEn: "No. SCHOLAR GATE is an informational, rule-based guidance and discovery portal. To protect your privacy and ensure official validity, final applications must be submitted on verified government portals (scholarships.gov.in, jnanabhumi.ap.gov.in, or telanganaepass.cgg.gov.in) or submitted through your school Headmaster. We provide direct, safe links to these portals.",
    aTe: "లేదు. స్కాలర్ గేట్ అనేది కేవలం సమాచారం, అర్హత పరిశీలన మరియు డాక్యుమెంట్ చెక్‌లిస్ట్ కోసం రూపొందించబడిన మార్గదర్శక వేదిక. మీ భద్రత కొరకు తుది దరఖాస్తులను నేరుగా అధికారిక ప్రభుత్వ పోర్టల్స్ (NSP, జ్ఞానభూమి, ఈపాస్) లేదా మీ పాఠశాల హెడ్‌మాస్టర్ ద్వారా మాత్రమే సమర్పించాలి."
  },
  {
    category: "portals",
    qEn: "When do government scholarship application windows typically open and close?",
    qTe: "ప్రభుత్వ స్కాలర్‌షిప్ దరఖాస్తుల గడువు తేదీలు ఎప్పుడు ఉంటాయి?",
    aEn: "Generally, online scholarship portals open around July to August for the academic year and accept pre-matric applications until October or November. Merit competitive examinations like NMMSS typically open registrations in August–September, with the state examination conducted in November or December. Always verify live deadlines on official portals.",
    aTe: "సాధారణంగా విద్యా సంవత్సరం ప్రారంభంలో జూలై - ఆగస్టు నెలల్లో దరఖాస్తులు ప్రారంభమై, అక్టోబర్ - నవంబర్ వరకు గడువు ఉంటుంది. NMMSS పరీక్ష దరఖాస్తులు ఆగస్టు-సెప్టెంబర్‌లో ప్రారంభమై, నవంబర్-డిసెంబర్‌లో పరీక్ష జరుగుతుంది. ఖచ్చితమైన తేదీల కోసం అధికారిక పోర్టల్‌ను తనిఖీ చేయండి."
  },
  {
    category: "portals",
    qEn: "What is the crucial role of the School Headmaster or Principal in the scholarship process?",
    qTe: "స్కాలర్‌షిప్ ప్రక్రియలో పాఠశాల హెడ్‌మాస్టర్ లేదా ప్రిన్సిపాల్ పాత్ర ఏమిటి?",
    aEn: "The Headmaster or Principal is the primary Institutional Nodal Officer (INO). Once a student submits an online application on NSP or State ePASS, the school Headmaster must log in with their institutional credentials, verify the student's enrollment, caste, and income details, and officially endorse and forward the application to the District Welfare Officer (DWO).",
    aTe: "పాఠశాల హెడ్‌మాస్టర్ లేదా ప్రిన్సిపాల్ నోడల్ అధికారిగా వ్యవహరిస్తారు. విద్యార్థి ఆన్‌లైన్‌లో దరఖాస్తు చేసుకున్న తర్వాత, హెడ్‌మాస్టర్ తమ పాఠశాల లాగిన్ ద్వారా వివరాలు, బోనఫైడ్ మరియు సర్టిఫికెట్లను తనిఖీ చేసి జిల్లా సంక్షేమ అధికారికి ఆమోదించి పంపించాల్సి ఉంటుంది."
  },

  // 6. Safety, Privacy & Scams
  {
    category: "safety",
    qEn: "Does SCHOLAR GATE store my personal credentials or track me?",
    qTe: "స్కాలర్ గేట్ నా వ్యక్తిగత వివరాలను భద్రపరుస్తుందా లేదా ట్రాక్ చేస్తుందా?",
    aEn: "No. SCHOLAR GATE is designed with privacy-by-design. We never collect or store your Aadhaar number, bank account details, caste certificate numbers, or passwords. Any information entered in our eligibility checker is processed in-memory entirely on your device and is not saved to any external database.",
    aTe: "లేదు. స్కాలర్ గేట్ అత్యున్నత గోప్యతా ప్రమాణాలతో పనిచేస్తుంది. మేము ఆధార్ సంఖ్యలు, బ్యాంక్ ఖాతా వివరాలు, కుల ధృవీకరణ సంఖ్యలు లేదా పాస్‌వర్డ్‌లను అడగము లేదా సేకరించము. మీరు ఎంటర్ చేసిన వివరాలు మీ డివైజ్ బ్రౌజర్‌లోనే ఉంటాయి."
  },
  {
    category: "safety",
    qEn: "How can parents and students identify and avoid scholarship scams?",
    qTe: "స్కాలర్‌షిప్ మోసాలు మరియు నకిలీ సందేశాలను ఎలా గుర్తించాలి?",
    aEn: "Always remember three golden rules: (1) Government scholarships are 100% free; anyone demanding 'processing fees' or 'registration money' is a fraud. (2) Government portals end with '.gov.in' or '.nic.in'; never enter details on unverified commercial sites. (3) Never share bank OTPs or ATM PINs with callers claiming your scholarship has been approved.",
    aTe: "మూడు ముఖ్యమైన విషయాలు గుర్తుంచుకోండి: (1) ప్రభుత్వ స్కాలర్‌షిప్‌లు పూర్తిగా ఉచితం; డబ్బులు అడిగే వారు ఖచ్చితంగా మోసగాళ్ళు. (2) ప్రభుత్వ వెబ్‌సైట్లు ఎల్లప్పుడూ '.gov.in' లేదా '.nic.in' తో ముగుస్తాయి. (3) స్కాలర్‌షిప్ వచ్చిందని చెప్పి బ్యాంక్ OTP లు, పిన్ నంబర్లు అడిగే ఎవరికీ సమాచారం ఇవ్వకండి."
  }
];

// Document Object Model References
const DOM = {
  langToggleBtn: document.getElementById('langToggleBtn'),
  langLabel: document.getElementById('langLabel'),
  mobileMenuToggle: document.getElementById('mobileMenuToggle'),
  navMenu: document.getElementById('navMenu'),
  savedCountBadge: document.getElementById('savedCountBadge'),

  // Hero Controls
  heroSearchInput: document.getElementById('heroSearchInput'),
  heroCtaFindBtn: document.getElementById('heroCtaFindBtn'),
  heroCtaBrowseBtn: document.getElementById('heroCtaBrowseBtn'),
  quickPills: document.querySelectorAll('.quick-pill'),
  demoChips: document.querySelectorAll('.demo-chip'),

  // Wizard
  eligibilityForm: document.getElementById('eligibilityForm'),
  progressLineFill: document.getElementById('progressLineFill'),
  stepIndicatorItems: document.querySelectorAll('.step-indicator-item'),
  stepPanes: [
    document.getElementById('wizardStep1'),
    document.getElementById('wizardStep2'),
    document.getElementById('wizardStep3')
  ],
  formPrevBtn: document.getElementById('formPrevBtn'),
  formNextBtn: document.getElementById('formNextBtn'),
  formSubmitBtn: document.getElementById('formSubmitBtn'),
  formResetBtn: document.getElementById('formResetBtn'),

  // Form Inputs
  studentName: document.getElementById('studentName'),
  studentState: document.getElementById('studentState'),
  currentClass: document.getElementById('currentClass'),
  schoolType: document.getElementById('schoolType'),
  socialCategory: document.getElementById('socialCategory'),
  familyIncome: document.getElementById('familyIncome'),
  hasDisabilityRadios: document.getElementsByName('hasDisability'),
  parentOccupation: document.getElementById('parentOccupation'),
  academicScore: document.getElementById('academicScore'),

  // Results & Filters
  filterState: document.getElementById('filterState'),
  filterClass: document.getElementById('filterClass'),
  filterCategory: document.getElementById('filterCategory'),
  filterStatus: document.getElementById('filterStatus'),
  sortOption: document.getElementById('sortOption'),
  resultsCount: document.getElementById('resultsCount'),
  scholarshipsContainer: document.getElementById('scholarshipsContainer'),

  // Saved Section
  savedCardsContainer: document.getElementById('savedCardsContainer'),
  savedEmptyState: document.getElementById('savedEmptyState'),

  // FAQ
  faqSearchInput: document.getElementById('faqSearchInput'),
  faqAccordion: document.getElementById('faqAccordion'),

  // Details Modal
  detailsModal: document.getElementById('detailsModal'),
  modalCloseBtn: document.getElementById('modalCloseBtn'),
  modalCloseFooterBtn: document.getElementById('modalCloseFooterBtn'),
  modalStatusBadge: document.getElementById('modalStatusBadge'),
  modalTitle: document.getElementById('modalTitle'),
  modalAuthority: document.getElementById('modalAuthority'),
  modalExplanationBox: document.getElementById('modalExplanationBox'),
  modalPurposeText: document.getElementById('modalPurposeText'),
  modalAcademicList: document.getElementById('modalAcademicList'),
  modalChecklistItems: document.getElementById('modalChecklistItems'),
  resetChecklistBtn: document.getElementById('resetChecklistBtn'),
  modalHowToApplyList: document.getElementById('modalHowToApplyList'),
  modalOfficialInfoLink: document.getElementById('modalOfficialInfoLink'),
  modalOfficialApplyLink: document.getElementById('modalOfficialApplyLink'),
  modalLastVerifiedDate: document.getElementById('modalLastVerifiedDate'),

  // Admin Modal
  openAdminModalBtn: document.getElementById('openAdminModalBtn'),
  adminModal: document.getElementById('adminModal'),
  adminModalCloseBtn: document.getElementById('adminModalCloseBtn'),
  adminModalCloseFooterBtn: document.getElementById('adminModalCloseFooterBtn'),
  adminJsonView: document.getElementById('adminJsonView'),
  adminAddMockBtn: document.getElementById('adminAddMockBtn'),
  adminResetDatasetBtn: document.getElementById('adminResetDatasetBtn'),

  // Toast
  toastContainer: document.getElementById('toastContainer')
};

/**
 * Main Initialization Routine
 */
async function initApp() {
  // 1. Load language preference
  AppState.language = StorageService.getLanguage();
  applyLanguage(AppState.language);

  // 2. Load dataset
  const dataset = await loadDataset();
  AppState.scholarships = dataset.scholarships;
  AppState.demoProfiles = dataset.profiles;

  // 3. Load active profile from storage if available
  const savedProfile = StorageService.getActiveProfile();
  if (savedProfile) {
    AppState.activeProfile = savedProfile;
    populateFormWithProfile(savedProfile);
  }

  // 4. Parse URL query parameters (cross-page filtering & search)
  const urlParams = new URLSearchParams(window.location.search);
  const paramState = urlParams.get('state');
  const paramSearch = urlParams.get('search');
  const paramCategory = urlParams.get('category');
  const paramClass = urlParams.get('class');

  if (paramState) {
    AppState.activeFilters.state = paramState;
    if (DOM.filterState) DOM.filterState.value = paramState;
    DOM.quickPills.forEach(pill => {
      pill.classList.toggle('active', pill.getAttribute('data-state-filter') === paramState);
    });
  }
  if (paramSearch) {
    AppState.activeFilters.search = paramSearch.toLowerCase();
    if (DOM.heroSearchInput) DOM.heroSearchInput.value = paramSearch;
  }
  if (paramCategory) {
    AppState.activeFilters.category = paramCategory;
    if (DOM.filterCategory) DOM.filterCategory.value = paramCategory;
  }
  if (paramClass) {
    AppState.activeFilters.class = paramClass;
    if (DOM.filterClass) DOM.filterClass.value = paramClass;
  }

  // 5. Highlight active nav link based on current page filename
  highlightActiveNav();

  // 6. Highlight active demo profile chip if profile exists
  if (AppState.activeProfile && AppState.activeProfile.id) {
    document.querySelectorAll('.demo-chip').forEach(c => {
      c.classList.toggle('active', c.getAttribute('data-profile') === AppState.activeProfile.id);
    });
  }

  // 7. Bind event listeners
  bindEventListeners();

  // 6. Initial Render
  updateSavedCountBadge();
  renderActiveProfileBanner();
  renderScholarships();
  renderSavedScholarships();
  renderFaq();
}

/**
 * Multi-Page Navigation Active Link Highlighter
 */
function highlightActiveNav() {
  const navLinks = document.querySelectorAll('.nav-link');
  let currentPath = (window.location.pathname.split('/').filter(Boolean).pop() || 'index.html').split('?')[0].split('#')[0];
  if (!currentPath || currentPath === '/') currentPath = 'index.html';

  navLinks.forEach(link => {
    const href = link.getAttribute('href') || '';
    const linkPath = href.split('?')[0].split('#')[0];
    if (linkPath === currentPath) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Close mobile nav on click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (DOM.navMenu) DOM.navMenu.classList.remove('open');
    });
  });
}

/**
 * Bilingual Text Translation Switcher
 */
function applyLanguage(lang) {
  AppState.language = lang;
  StorageService.setLanguage(lang);

  document.body.className = lang === 'te' ? 'lang-te' : 'lang-en';
  if (DOM.langLabel) {
    DOM.langLabel.textContent = lang === 'te' ? 'English' : 'తెలుగు';
  }

  const dict = TRANSLATIONS[lang] || TRANSLATIONS.en;

  // Update text nodes
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      el.textContent = dict[key];
    }
  });

  // Update placeholders
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    const key = el.getAttribute('data-i18n-ph');
    if (dict[key]) {
      el.setAttribute('placeholder', dict[key]);
    }
  });

  // Re-render dynamic elements
  renderActiveProfileBanner();
  renderScholarships();
  renderSavedScholarships();
  renderFaq();
}

/**
 * Event Listeners Binding
 */
function bindEventListeners() {
  // Language toggle
  if (DOM.langToggleBtn) {
    DOM.langToggleBtn.addEventListener('click', () => {
      const newLang = AppState.language === 'en' ? 'te' : 'en';
      applyLanguage(newLang);
      showToast(newLang === 'te' ? "భాష తెలుగులోకి మార్చబడింది" : "Language switched to English");
    });
  }

  // Mobile menu toggle
  if (DOM.mobileMenuToggle && DOM.navMenu) {
    DOM.mobileMenuToggle.addEventListener('click', () => {
      DOM.navMenu.classList.toggle('open');
    });
  }

  // Hero CTA Find My Scholarships Button
  if (DOM.heroCtaFindBtn) {
    DOM.heroCtaFindBtn.addEventListener('click', (e) => {
      const findSec = document.getElementById('find');
      if (findSec) {
        e.preventDefault();
        goToWizardStep(1);
        findSec.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
          if (DOM.studentState) DOM.studentState.focus();
        }, 400);
      }
    });
  }

  // Featured Section buttons
  document.querySelectorAll('.btn-featured-details').forEach(btn => {
    btn.addEventListener('click', () => {
      const sId = btn.getAttribute('data-id');
      const scheme = AppState.scholarships.find(s => s.id === sId);
      if (scheme) {
        if (!scheme.matchResult) {
          scheme.matchResult = MatchingEngine.evaluate(scheme, AppState.activeProfile);
        }
        openDetailsModal(scheme);
      }
    });
  });

  document.querySelectorAll('.btn-featured-check').forEach(btn => {
    btn.addEventListener('click', () => {
      const profileId = btn.getAttribute('data-profile');
      loadDemoProfile(profileId);
    });
  });

  // Hero Quick Filters
  DOM.quickPills.forEach(pill => {
    pill.addEventListener('click', () => {
      DOM.quickPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const stateFilter = pill.getAttribute('data-state-filter');
      AppState.activeFilters.state = stateFilter;
      if (DOM.filterState) DOM.filterState.value = stateFilter;
      
      if (DOM.scholarshipsContainer) {
        renderScholarships();
        const resEl = document.getElementById('results') || DOM.scholarshipsContainer;
        if (resEl) resEl.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.location.href = `scholarships.html?state=${encodeURIComponent(stateFilter)}`;
      }
    });
  });

  // Hero Search Input
  if (DOM.heroSearchInput) {
    DOM.heroSearchInput.addEventListener('input', (e) => {
      AppState.activeFilters.search = e.target.value.trim().toLowerCase();
      if (DOM.scholarshipsContainer) {
        renderScholarships();
      }
    });

    DOM.heroSearchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const val = DOM.heroSearchInput.value.trim();
        if (DOM.scholarshipsContainer) {
          AppState.activeFilters.search = val.toLowerCase();
          renderScholarships();
          const resEl = document.getElementById('results') || DOM.scholarshipsContainer;
          if (resEl) resEl.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.location.href = `scholarships.html?search=${encodeURIComponent(val)}`;
        }
      }
    });
  }

  // Filter Bar controls
  if (DOM.filterState) {
    DOM.filterState.addEventListener('change', (e) => {
      AppState.activeFilters.state = e.target.value;
      renderScholarships();
    });
  }
  if (DOM.filterClass) {
    DOM.filterClass.addEventListener('change', (e) => {
      AppState.activeFilters.class = e.target.value;
      renderScholarships();
    });
  }
  if (DOM.filterCategory) {
    DOM.filterCategory.addEventListener('change', (e) => {
      AppState.activeFilters.category = e.target.value;
      renderScholarships();
    });
  }
  if (DOM.filterStatus) {
    DOM.filterStatus.addEventListener('change', (e) => {
      AppState.activeFilters.status = e.target.value;
      renderScholarships();
    });
  }
  if (DOM.sortOption) {
    DOM.sortOption.addEventListener('change', (e) => {
      AppState.currentSort = e.target.value;
      renderScholarships();
    });
  }

  // Wizard Step Navigation
  if (DOM.formNextBtn) {
    DOM.formNextBtn.addEventListener('click', () => {
      if (validateWizardStep(AppState.wizardStep)) {
        goToWizardStep(AppState.wizardStep + 1);
      }
    });
  }

  if (DOM.formPrevBtn) {
    DOM.formPrevBtn.addEventListener('click', () => {
      goToWizardStep(AppState.wizardStep - 1);
    });
  }

  // Wizard Form Submission
  if (DOM.eligibilityForm) {
    DOM.eligibilityForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!validateWizardStep(3)) return;

      const profile = getProfileFromForm();
      AppState.activeProfile = profile;
      StorageService.saveActiveProfile(profile);

      showToast(AppState.language === 'te' ? "స్కాలర్‌షిప్ సరిపోలికలు సిద్ధంగా ఉన్నాయి!" : "Scholarship matches generated successfully!");

      if (DOM.scholarshipsContainer) {
        renderActiveProfileBanner();
        renderScholarships();
        const resEl = document.getElementById('results') || DOM.scholarshipsContainer;
        if (resEl) resEl.scrollIntoView({ behavior: 'smooth' });
      } else {
        setTimeout(() => {
          window.location.href = 'scholarships.html';
        }, 350);
      }
    });
  }

  // Form Reset
  if (DOM.formResetBtn && DOM.eligibilityForm) {
    DOM.formResetBtn.addEventListener('click', () => {
      DOM.eligibilityForm.reset();
      AppState.activeProfile = null;
      StorageService.clearActiveProfile();
      goToWizardStep(1);
      if (DOM.scholarshipsContainer) {
        renderScholarships();
      }
      showToast(AppState.language === 'te' ? "ఫారమ్ రీసెట్ చేయబడింది" : "Form has been reset");
    });
  }

  // Demo Profiles Quick Loader Chips
  DOM.demoChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const profileId = chip.getAttribute('data-profile');
      loadDemoProfile(profileId);
    });
  });

  // Modal Closers
  if (DOM.modalCloseBtn) DOM.modalCloseBtn.addEventListener('click', closeDetailsModal);
  if (DOM.modalCloseFooterBtn) DOM.modalCloseFooterBtn.addEventListener('click', closeDetailsModal);
  if (DOM.detailsModal) {
    DOM.detailsModal.addEventListener('click', (e) => {
      if (e.target === DOM.detailsModal) closeDetailsModal();
    });
  }

  // Reset Checklist Button
  if (DOM.resetChecklistBtn) {
    DOM.resetChecklistBtn.addEventListener('click', () => {
      if (!AppState.selectedScholarship) return;
      StorageService.resetChecklist(AppState.selectedScholarship.id);
      renderModalChecklist(AppState.selectedScholarship);
      showToast(AppState.language === 'te' ? "చెక్‌లిస్ట్ రీసెట్ చేయబడింది" : "Document checklist reset");
    });
  }

  // Admin Modal
  if (DOM.openAdminModalBtn) DOM.openAdminModalBtn.addEventListener('click', openAdminModal);
  if (DOM.adminModalCloseBtn) DOM.adminModalCloseBtn.addEventListener('click', closeAdminModal);
  if (DOM.adminModalCloseFooterBtn) DOM.adminModalCloseFooterBtn.addEventListener('click', closeAdminModal);
  if (DOM.adminModal) {
    DOM.adminModal.addEventListener('click', (e) => {
      if (e.target === DOM.adminModal) closeAdminModal();
    });
  }

  if (DOM.adminAddMockBtn) {
    DOM.adminAddMockBtn.addEventListener('click', () => {
      const mockId = 'demo_' + Date.now();
      const mockScheme = {
        id: mockId,
        name: "Special Merit Support Scheme (Prototype Demo Record)",
        nameTe: "ప్రత్యేక మెరిట్ సహాయ పథకం (ప్రోటోటైప్ డెమో)",
        administeringAuthority: "State Education Welfare Directorate",
        administeringAuthorityTe: "రాష్ట్ర విద్యా సంక్షేమ డైరెక్టరేట్",
        coverage: "All India",
        eligibleClasses: [8, 9, 10],
        categories: ["SC", "ST", "OBC", "EBC", "Minority", "General"],
        incomeLimitINR: 300000,
        schoolTypes: ["Government", "Government-aided"],
        disabilityCriteria: null,
        occupationCriteria: null,
        type: "Demo Welfare",
        beneficiaryGroup: "Secondary School Students",
        beneficiaryGroupTe: "ఉన్నత పాఠశాల విద్యార్థులు",
        academicCriteria: ["Minimum 60% marks in previous examination"],
        benefitDescription: "Demonstration scholarship record for testing prototype portal data modifications.",
        benefitAmountINR: 5000,
        applicationType: "Fresh",
        applicationStatus: "Check official portal",
        deadline: "Check official portal (Test Demonstration)",
        requiredDocuments: [
          "Previous Class Marksheet",
          "Income Certificate (<= ₹3.0 Lakhs)",
          "School Bonafide Certificate",
          "Student Aadhaar & Bank Details"
        ],
        howToApply: [
          "Step 1: Test entry for demo administration.",
          "Step 2: Submit sample verification to test portal engine."
        ],
        officialInformationUrl: "https://scholarships.gov.in",
        officialApplicationUrl: "https://scholarships.gov.in",
        lastVerifiedDate: "2026-03-15",
        verificationStatus: "Verified",
        eligibilityNotes: "Created via Prototype Admin manager for evaluation testing.",
        demoOnly: true
      };
      AppState.scholarships.unshift(mockScheme);
      renderScholarships();
      updateAdminJsonView();
      showToast("Added demo test scholarship to active dataset!");
    });
  }

  if (DOM.adminResetDatasetBtn) {
    DOM.adminResetDatasetBtn.addEventListener('click', () => {
      AppState.scholarships = [...DEFAULT_SCHOLARSHIPS];
      renderScholarships();
      updateAdminJsonView();
      showToast("Dataset reset to official defaults.");
    });
  }

  // FAQ Search & Category Filter
  if (DOM.faqSearchInput) {
    DOM.faqSearchInput.addEventListener('input', (e) => {
      AppState.faqSearch = e.target.value.trim().toLowerCase();
      renderFaq();
    });
  }

  document.querySelectorAll('[data-faq-cat]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-faq-cat]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      AppState.faqCategory = btn.getAttribute('data-faq-cat') || 'all';
      renderFaq();
    });
  });

  // Keyboard accessibility: ESC to close modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeDetailsModal();
      closeAdminModal();
    }
  });
}

/**
 * Wizard Step Navigation and Validation
 */
function goToWizardStep(stepNumber) {
  if (stepNumber < 1 || stepNumber > 3) return;
  if (!DOM.progressLineFill || !DOM.stepPanes || !DOM.stepPanes[0]) return;
  AppState.wizardStep = stepNumber;

  // Update panes
  DOM.stepPanes.forEach((pane, idx) => {
    if (pane) pane.classList.toggle('active', idx + 1 === stepNumber);
  });

  // Update Progress line fill & indicators
  const fillPct = ((stepNumber - 1) / 2) * 100;
  DOM.progressLineFill.style.width = `${fillPct}%`;

  DOM.stepIndicatorItems.forEach((item, idx) => {
    if (!item) return;
    const stepIdx = idx + 1;
    item.classList.remove('active', 'completed');
    if (stepIdx === stepNumber) {
      item.classList.add('active');
    } else if (stepIdx < stepNumber) {
      item.classList.add('completed');
    }
  });

  // Update Footer buttons
  if (DOM.formPrevBtn) DOM.formPrevBtn.style.display = stepNumber === 1 ? 'none' : 'inline-flex';
  if (DOM.formNextBtn) DOM.formNextBtn.style.display = stepNumber === 3 ? 'none' : 'inline-flex';
  if (DOM.formSubmitBtn) DOM.formSubmitBtn.style.display = stepNumber === 3 ? 'inline-flex' : 'none';
}

function validateWizardStep(step) {
  if (!DOM.studentState) return true;
  if (step === 1) {
    if (!DOM.studentState.value) {
      DOM.studentState.focus();
      showToast(AppState.language === 'te' ? "దయచేసి రాష్ట్రాన్ని ఎంచుకోండి" : "Please select your state of schooling");
      return false;
    }
    if (!DOM.currentClass.value) {
      DOM.currentClass.focus();
      showToast(AppState.language === 'te' ? "దయచేసి మీ తరగతిని ఎంచుకోండి" : "Please select your current class");
      return false;
    }
    if (!DOM.schoolType.value) {
      DOM.schoolType.focus();
      showToast(AppState.language === 'te' ? "దయచేసి పాఠశాల రకాన్ని ఎంచుకోండి" : "Please select your school institution type");
      return false;
    }
  } else if (step === 2) {
    if (!DOM.socialCategory.value) {
      DOM.socialCategory.focus();
      showToast(AppState.language === 'te' ? "దయచేసి సామాజిక వర్గాన్ని ఎంచుకోండి" : "Please select your social category");
      return false;
    }
    if (!DOM.familyIncome.value) {
      DOM.familyIncome.focus();
      showToast(AppState.language === 'te' ? "దయచేసి కుటుంబ ఆదాయ పరిధిని ఎంచుకోండి" : "Please select your family income range");
      return false;
    }
  }
  return true;
}

/**
 * Extracts student profile from form inputs
 */
function getProfileFromForm() {
  let selectedDisability = 'No';
  for (const radio of DOM.hasDisabilityRadios) {
    if (radio.checked) {
      selectedDisability = radio.value;
      break;
    }
  }

  return {
    studentName: DOM.studentName.value.trim(),
    state: DOM.studentState.value,
    currentClass: DOM.currentClass.value,
    schoolType: DOM.schoolType.value,
    socialCategory: DOM.socialCategory.value,
    familyIncome: DOM.familyIncome.value,
    hasDisability: selectedDisability,
    parentOccupation: DOM.parentOccupation.value,
    academicScore: DOM.academicScore.value
  };
}

/**
 * Populates form with a given profile
 */
function populateFormWithProfile(profile) {
  if (!DOM.studentName) return;
  DOM.studentName.value = profile.studentName || '';
  if (DOM.studentState) DOM.studentState.value = profile.state || '';
  if (DOM.currentClass) DOM.currentClass.value = profile.currentClass || '';
  if (DOM.schoolType) DOM.schoolType.value = profile.schoolType || '';
  if (DOM.socialCategory) DOM.socialCategory.value = profile.socialCategory || '';
  if (DOM.familyIncome) DOM.familyIncome.value = profile.familyIncome || '';

  const disabilityVal = profile.hasDisability || 'No';
  if (DOM.hasDisabilityRadios) {
    for (const radio of DOM.hasDisabilityRadios) {
      radio.checked = (radio.value === disabilityVal);
    }
  }

  if (DOM.parentOccupation) DOM.parentOccupation.value = profile.parentOccupation || 'None of these';
  if (DOM.academicScore) DOM.academicScore.value = profile.academicScore || 'Above 55%';
}

/**
 * Loads a Demonstration Profile
 */
function loadDemoProfile(profileId) {
  const profile = AppState.demoProfiles.find(p => p.id === profileId);
  if (!profile) return;

  AppState.activeProfile = { ...profile };
  StorageService.saveActiveProfile(AppState.activeProfile);

  // Update active state on all demo chips
  document.querySelectorAll('.demo-chip').forEach(c => {
    c.classList.toggle('active', c.getAttribute('data-profile') === profileId);
  });

  if (DOM.eligibilityForm) {
    populateFormWithProfile(profile);
    goToWizardStep(3);
  }

  const profileTitle = AppState.language === 'te' && profile.titleTe ? profile.titleTe : profile.title;
  showToast(`${AppState.language === 'te' ? "డెమో ప్రొఫైల్ లోడ్ అయింది: " : "Loaded demo profile: "} ${profileTitle}`);

  if (DOM.scholarshipsContainer) {
    renderActiveProfileBanner();
    renderScholarships();
    const resultsSec = document.getElementById('results') || DOM.scholarshipsContainer;
    if (resultsSec) resultsSec.scrollIntoView({ behavior: 'smooth' });
  } else if (!DOM.eligibilityForm) {
    setTimeout(() => {
      window.location.href = 'scholarships.html';
    }, 350);
  }
}

/**
 * Renders the Active Profile Banner on the Scholarships Catalog Page
 */
function renderActiveProfileBanner() {
  const container = document.getElementById('activeProfileBanner');
  if (!container) return;

  const isTe = AppState.language === 'te';
  const p = AppState.activeProfile;

  if (p) {
    const studentName = p.studentName || (isTe ? "విద్యార్థి" : "Student");
    container.innerHTML = `
      <div class="active-profile-info">
        <span class="active-profile-tag">✓ ${isTe ? "వ్యక్తిగత సరిపోలికలు" : "Personalized Matches"}</span>
        <span class="active-profile-text">
          <strong>${studentName}</strong> • Class ${p.currentClass || '—'} • ${p.socialCategory || '—'} • ${p.state || '—'} • ${p.familyIncome || '—'}
        </span>
      </div>
      <div class="active-profile-actions">
        <a href="find-scholarships.html" class="btn-secondary" style="font-size:0.82rem; padding:0.4rem 0.8rem;">
          ${isTe ? "ప్రొఫైల్ మార్చండి" : "Edit Profile"}
        </a>
        <button type="button" class="btn-secondary" id="clearActiveProfileBtn" style="font-size:0.82rem; padding:0.4rem 0.8rem;">
          ${isTe ? "రీసెట్" : "Clear Profile"}
        </button>
      </div>
    `;

    const clearBtn = document.getElementById('clearActiveProfileBtn');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        AppState.activeProfile = null;
        StorageService.clearActiveProfile();
        document.querySelectorAll('.demo-chip').forEach(c => c.classList.remove('active'));
        renderActiveProfileBanner();
        renderScholarships();
        showToast(isTe ? "ప్రొఫైల్ రీసెట్ చేయబడింది" : "Active profile cleared");
      });
    }
  } else {
    container.innerHTML = `
      <div class="active-profile-info">
        <span class="active-profile-tag" style="background:#0284C7;">ℹ ${isTe ? "సాధారణ జాబితా" : "General Catalog"}</span>
        <span class="active-profile-text" style="color:#0369A1;">
          ${isTe ? "వ్యక్తిగత స్కాలర్‌షిప్ సరిపోలికలు మరియు అర్హత స్కోర్‌ల కోసం ఫారమ్ పూర్తి చేయండి." : "Complete the 3-step eligibility form to calculate personalized match scores."}
        </span>
      </div>
      <div class="active-profile-actions">
        <a href="find-scholarships.html" class="btn-primary" style="font-size:0.82rem; padding:0.4rem 0.8rem;">
          ${isTe ? "అర్హత చూడండి" : "Start Eligibility Form"}
        </a>
      </div>
    `;
  }
}

/**
 * Renders Scholarship Cards Grid
 */
function renderScholarships() {
  const container = DOM.scholarshipsContainer;
  if (!container) return;

  // Run matching engine for each scheme against active profile
  const matchedList = MatchingEngine.matchAll(AppState.scholarships, AppState.activeProfile);

  // Apply filters
  let filtered = matchedList.filter(item => {
    const f = AppState.activeFilters;

    // State filter
    if (f.state) {
      const coverage = (item.coverage || '').toLowerCase();
      if (coverage !== 'all india' && !coverage.includes(f.state.toLowerCase())) {
        return false;
      }
    }

    // Class filter
    if (f.class) {
      const classNum = parseInt(f.class, 10);
      if (!item.eligibleClasses.includes(classNum)) {
        return false;
      }
    }

    // Category filter
    if (f.category) {
      if (item.categories.length > 0 && !item.categories.includes(f.category) && !item.categories.includes('General')) {
        return false;
      }
    }

    // Status filter
    if (f.status) {
      if (item.matchResult.status !== f.status) {
        return false;
      }
    }

    // Search keyword
    if (f.search) {
      const searchStr = `${item.name} ${item.nameTe || ''} ${item.administeringAuthority} ${item.benefitDescription} ${item.coverage}`.toLowerCase();
      if (!searchStr.includes(f.search)) {
        return false;
      }
    }

    return true;
  });

  // Apply Sorting
  filtered.sort((a, b) => {
    if (AppState.currentSort === 'score') {
      return (b.matchResult.score || 0) - (a.matchResult.score || 0);
    } else if (AppState.currentSort === 'name') {
      return a.name.localeCompare(b.name);
    } else if (AppState.currentSort === 'class') {
      const minA = Math.min(...(a.eligibleClasses || [0]));
      const minB = Math.min(...(b.eligibleClasses || [0]));
      return minA - minB;
    }
    return 0;
  });

  // Update count text
  const isTe = AppState.language === 'te';
  DOM.resultsCount.textContent = isTe
    ? `${filtered.length} పథకాలు చూపబడుతున్నాయి`
    : `Showing ${filtered.length} schemes`;

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: span 2; text-align:center; padding:3rem; background:#FFFFFF; border-radius:var(--radius-lg); border:1px dashed var(--border-color);">
        <p style="font-size:1.1rem; color:var(--text-muted); margin-bottom:1rem;">
          ${isTe ? "ఎంచుకున్న ఫిల్టర్లకు సరిపోయే స్కాలర్‌షిప్‌లు లేవు." : "No scholarships match the selected filter criteria."}
        </p>
        <button type="button" class="btn-secondary" onclick="resetFilters()">
          ${isTe ? "ఫిల్టర్లు క్లియర్ చేయండి" : "Clear All Filters"}
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(scheme => createScholarshipCardHtml(scheme, isTe)).join('');

  // Attach card event listeners
  container.querySelectorAll('.btn-card-details').forEach(btn => {
    btn.addEventListener('click', () => {
      const sId = btn.getAttribute('data-id');
      const scheme = filtered.find(s => s.id === sId);
      if (scheme) openDetailsModal(scheme);
    });
  });

  container.querySelectorAll('.bookmark-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const sId = btn.getAttribute('data-id');
      const isNowBookmarked = StorageService.toggleBookmark(sId);
      btn.classList.toggle('active', isNowBookmarked);
      updateSavedCountBadge();
      renderSavedScholarships();
      showToast(isNowBookmarked
        ? (isTe ? "స్కాలర్‌షిప్ బుక్‌మార్క్‌లలో సేవ్ అయింది" : "Scholarship saved to bookmarks")
        : (isTe ? "బుక్‌మార్క్ తీసివేయబడింది" : "Scholarship removed from bookmarks")
      );
    });
  });
}

/**
 * Creates HTML markup for a single Scholarship Card
 */
function createScholarshipCardHtml(scheme, isTe) {
  const isSaved = StorageService.isBookmarked(scheme.id);
  const status = scheme.matchResult.status;
  const score = scheme.matchResult.score;

  let badgeLabel = "Potential Match";
  if (status === 'needs_verification') {
    badgeLabel = isTe ? "ధృవీకరణ అవసరం" : "Needs Verification";
  } else if (status === 'not_matched') {
    badgeLabel = isTe ? "ప్రస్తుతం సరిపోలలేదు" : "Not Currently Matched";
  } else {
    badgeLabel = isTe ? "అర్హత ఉండే అవకాశం" : "Potential Match";
  }

  const displayName = isTe && scheme.nameTe ? scheme.nameTe : scheme.name;
  const displayAuth = isTe && scheme.administeringAuthorityTe ? scheme.administeringAuthorityTe : scheme.administeringAuthority;

  const minClass = Math.min(...scheme.eligibleClasses);
  const maxClass = Math.max(...scheme.eligibleClasses);
  const classDisplay = minClass === maxClass ? `Class ${minClass}` : `Classes ${minClass}–${maxClass}`;

  const incomeDisplay = scheme.incomeLimitINR
    ? `₹${scheme.incomeLimitINR.toLocaleString('en-IN')}/year`
    : (isTe ? "ఆదాయ పరిమితి లేదు" : "No specific income limit");

  const benefitDisplay = scheme.benefitAmountINR
    ? `₹${scheme.benefitAmountINR.toLocaleString('en-IN')}/year`
    : (isTe ? "అధికారిక పోర్టల్ చూడండి" : "Check official portal");

  const deadlineDisplay = scheme.deadline || (isTe ? "గడువు ధృవీకరించబడలేదు" : "Deadline not verified");
  const statusDisplay = scheme.applicationStatus || (isTe ? "అధికారిక పోర్టల్ చూడండి" : "Check official portal");

  const beneficiaryDisplay = isTe && scheme.beneficiaryGroupTe
    ? scheme.beneficiaryGroupTe
    : (scheme.beneficiaryGroup || (isTe ? "పాఠశాల విద్యార్థులు" : "School Students"));

  let appStatusClass = 'app-status-check';
  let appStatusIcon = '⏱';
  const statusLower = (scheme.applicationStatus || '').toLowerCase();
  if (statusLower.includes('open')) {
    appStatusClass = 'app-status-open';
    appStatusIcon = '✓';
  } else if (statusLower.includes('closed')) {
    appStatusClass = 'app-status-closed';
    appStatusIcon = '✕';
  }

  return `
    <article class="scholarship-card" data-scheme-id="${scheme.id}">
      
      <!-- Top Bar: Status Badge + Bookmark Toggle -->
      <div class="card-top-bar">
        <div class="match-status-badge ${status}">
          <span>●</span>
          <span>${badgeLabel}</span>
          <span style="opacity:0.8; font-size:0.75rem;">(${score}%)</span>
        </div>

        <button type="button" class="bookmark-btn ${isSaved ? 'active' : ''}" data-id="${scheme.id}" title="${isTe ? 'బుక్‌మార్క్ చేయండి' : 'Bookmark this scheme'}">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="${isSaved ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
          </svg>
        </button>
      </div>

      <!-- Scheme Name & Authority -->
      <h3 class="card-title">${displayName}</h3>
      <p class="card-authority">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21h18M3 7v1a3 3 0 0 0 6 0V7m0 1a3 3 0 0 0 6 0V7m0 1a3 3 0 0 0 6 0V7H3l2-4h14l2 4"></path></svg>
        <span>${displayAuth}</span>
      </p>

      <!-- Transparent Rule-Based Match Explanation -->
      <div class="card-explanation-box ${status}">
        <strong>${isTe ? 'పోర్టల్ గమనిక:' : 'Portal Match Note:'}</strong>
        ${scheme.matchResult.explanation}
      </div>

      <!-- Structured Metadata List -->
      <div class="card-meta-list">
        <div class="card-meta-item">
          <span class="meta-label">${isTe ? 'లబ్ధిదారుల సమూహం:' : 'Beneficiary Group:'}</span>
          <span class="meta-value">${beneficiaryDisplay}</span>
        </div>
        <div class="card-meta-item">
          <span class="meta-label">${isTe ? 'కవరేజ్:' : 'Coverage:'}</span>
          <span class="meta-value">${scheme.coverage}</span>
        </div>
        <div class="card-meta-item">
          <span class="meta-label">${isTe ? 'అర్హత గల తరగతులు:' : 'Eligible Classes:'}</span>
          <span class="meta-value meta-badge-class">${classDisplay}</span>
        </div>
        <div class="card-meta-item">
          <span class="meta-label">${isTe ? 'గరిష్ట ఆదాయం:' : 'Income Ceiling:'}</span>
          <span class="meta-value">${incomeDisplay}</span>
        </div>
        <div class="card-meta-item">
          <span class="meta-label">${isTe ? 'ఆర్థిక సహాయం:' : 'Benefit Amount:'}</span>
          <span class="meta-value" style="color:var(--primary-blue); font-weight:700;">${benefitDisplay}</span>
        </div>
        <div class="card-meta-item">
          <span class="meta-label">${isTe ? 'దరఖాస్తు గడువు:' : 'Deadline:'}</span>
          <span class="meta-value" style="font-size:0.8rem; color:var(--text-muted);">${deadlineDisplay}</span>
        </div>
        <div class="card-meta-item" style="border-bottom:none;">
          <span class="meta-label">${isTe ? 'దరఖాస్తు స్థితి:' : 'Status:'}</span>
          <span class="meta-value">
            <span class="app-status-pill ${appStatusClass}">
              <span>${appStatusIcon}</span>
              <span>${statusDisplay}</span>
            </span>
          </span>
        </div>
      </div>

      <!-- Card Action Buttons -->
      <div class="card-actions">
        <button type="button" class="btn-card-details" data-id="${scheme.id}">
          ${isTe ? 'వివరాలు & చెక్‌లిస్ట్' : 'View Details & Checklist'}
        </button>

        <a href="${scheme.officialApplicationUrl}" target="_blank" rel="noopener noreferrer" class="btn-card-apply" title="Opens official government portal in new tab">
          <span>${isTe ? 'అధికారిక వెబ్‌సైట్' : 'Official Portal'}</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
        </a>
      </div>

    </article>
  `;
}

/**
 * Renders Saved Scholarships Section
 */
function renderSavedScholarships() {
  const container = DOM.savedCardsContainer;
  const emptyState = DOM.savedEmptyState;
  if (!container || !emptyState) return;

  const bookmarks = StorageService.getBookmarks();
  const isTe = AppState.language === 'te';

  if (bookmarks.length === 0) {
    container.innerHTML = '';
    container.style.display = 'none';
    emptyState.style.display = 'block';
    return;
  }

  emptyState.style.display = 'none';
  container.style.display = 'grid';

  const savedSchemes = AppState.scholarships
    .filter(s => bookmarks.includes(s.id))
    .map(s => {
      const evalResult = MatchingEngine.evaluate(s, AppState.activeProfile);
      return { ...s, matchResult: evalResult };
    });

  container.innerHTML = savedSchemes.map(s => createScholarshipCardHtml(s, isTe)).join('');

  // Bind details & bookmark buttons
  container.querySelectorAll('.btn-card-details').forEach(btn => {
    btn.addEventListener('click', () => {
      const sId = btn.getAttribute('data-id');
      const scheme = savedSchemes.find(s => s.id === sId);
      if (scheme) openDetailsModal(scheme);
    });
  });

  container.querySelectorAll('.bookmark-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const sId = btn.getAttribute('data-id');
      StorageService.toggleBookmark(sId);
      updateSavedCountBadge();
      renderSavedScholarships();
      renderScholarships();
      showToast(isTe ? "బుక్‌మార్క్ తీసివేయబడింది" : "Scholarship removed from bookmarks");
    });
  });
}

function updateSavedCountBadge() {
  const count = StorageService.getBookmarks().length;
  if (DOM.savedCountBadge) {
    DOM.savedCountBadge.textContent = count;
  }
}

/**
 * Details Modal Display & Interactive Checklist
 */
function openDetailsModal(scheme) {
  if (!scheme.matchResult) {
    scheme.matchResult = MatchingEngine.evaluate(scheme, AppState.activeProfile);
  }
  AppState.selectedScholarship = scheme;
  const isTe = AppState.language === 'te';

  DOM.modalTitle.textContent = isTe && scheme.nameTe ? scheme.nameTe : scheme.name;
  const beneficiaryStr = isTe && scheme.beneficiaryGroupTe
    ? scheme.beneficiaryGroupTe
    : (scheme.beneficiaryGroup || (isTe ? "పాఠశాల విద్యార్థులు" : "School Students"));
  DOM.modalPurposeText.innerHTML = `<strong>${isTe ? 'లబ్ధిదారుల సమూహం:' : 'Target Beneficiary:'}</strong> ${beneficiaryStr}<br><br>${scheme.benefitDescription || ''}`;
  DOM.modalLastVerifiedDate.textContent = scheme.lastVerifiedDate || '2026-03-15';

  // Modal Status Badge
  const status = scheme.matchResult.status;
  DOM.modalStatusBadge.className = `match-status-badge ${status}`;
  let statusText = "Potential Match";
  if (status === 'needs_verification') statusText = isTe ? "ధృవీకరణ అవసరం" : "Needs Verification";
  else if (status === 'not_matched') statusText = isTe ? "ప్రస్తుతం సరిపోలలేదు" : "Not Currently Matched";
  else statusText = isTe ? "అర్హత ఉండే అవకాశం" : "Potential Match";
  DOM.modalStatusBadge.textContent = `${statusText} (${scheme.matchResult.score}%)`;

  // Explanation Box
  let explHtml = `<strong>${isTe ? 'పోర్టల్ సరిపోలిక నివేదిక:' : 'Portal Match Evaluation:'}</strong><br>${scheme.matchResult.explanation}`;
  if (scheme.matchResult.matchedCriteria.length > 0) {
    explHtml += `<ul style="margin-top:0.4rem; padding-left:1.2rem;">${scheme.matchResult.matchedCriteria.map(m => `<li>✓ ${m}</li>`).join('')}</ul>`;
  }
  if (scheme.matchResult.unmatchedCriteria.length > 0) {
    explHtml += `<ul style="margin-top:0.4rem; padding-left:1.2rem; color:#DC2626;">${scheme.matchResult.unmatchedCriteria.map(u => `<li>✕ ${u}</li>`).join('')}</ul>`;
  }
  if (scheme.matchResult.verificationItems.length > 0) {
    explHtml += `<div style="margin-top:0.5rem; font-size:0.8rem; color:#B45309;"><strong>${isTe ? 'ధృవీకరించాల్సినవి:' : 'Items to Verify on Official Portal:'}</strong><ul style="padding-left:1.2rem;">${scheme.matchResult.verificationItems.map(v => `<li>• ${v}</li>`).join('')}</ul></div>`;
  }
  DOM.modalExplanationBox.className = `card-explanation-box ${status}`;
  DOM.modalExplanationBox.innerHTML = explHtml;

  // Academic conditions
  DOM.modalAcademicList.innerHTML = (scheme.academicCriteria || []).map(ac => `<li>${ac}</li>`).join('');

  // Interactive Document Checklist
  renderModalChecklist(scheme);

  // How to apply steps
  DOM.modalHowToApplyList.innerHTML = (scheme.howToApply || []).map(step => `<li>${step}</li>`).join('');

  // Official Links
  DOM.modalOfficialInfoLink.href = scheme.officialInformationUrl || '#';
  DOM.modalOfficialApplyLink.href = scheme.officialApplicationUrl || '#';

  DOM.detailsModal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function renderModalChecklist(scheme) {
  const container = DOM.modalChecklistItems;
  if (!container) return;

  const savedChecklist = StorageService.getChecklist(scheme.id);
  const docs = scheme.requiredDocuments || [];

  if (docs.length === 0) {
    container.innerHTML = `<p style="font-size:0.88rem; color:var(--text-muted);">Please check the official portal for specific document guidelines.</p>`;
    return;
  }

  container.innerHTML = docs.map((doc, idx) => {
    const isChecked = !!savedChecklist[idx];
    return `
      <label class="checklist-row ${isChecked ? 'checked' : ''}" data-idx="${idx}">
        <input type="checkbox" ${isChecked ? 'checked' : ''}>
        <span class="checklist-text">${doc}</span>
      </label>
    `;
  }).join('');

  // Bind checkbox clicks
  container.querySelectorAll('.checklist-row').forEach(row => {
    const idx = parseInt(row.getAttribute('data-idx'), 10);
    const cb = row.querySelector('input[type="checkbox"]');

    cb.addEventListener('change', () => {
      const checked = cb.checked;
      row.classList.toggle('checked', checked);
      StorageService.setChecklistItem(scheme.id, idx, checked);
      showToast(checked
        ? (AppState.language === 'te' ? "డాక్యుమెంట్ పూర్తయినట్లు మార్క్ చేయబడింది" : "Document marked as ready")
        : (AppState.language === 'te' ? "డాక్యుమెంట్ మార్క్ తొలగించబడింది" : "Document unmarked")
      );
    });
  });
}

function closeDetailsModal() {
  DOM.detailsModal.classList.remove('open');
  document.body.style.overflow = '';
  AppState.selectedScholarship = null;
}

/**
 * FAQ Search & Category Accordion
 */
function renderFaq() {
  const container = DOM.faqAccordion;
  if (!container) return;

  const isTe = AppState.language === 'te';
  const cat = AppState.faqCategory || 'all';
  const query = (AppState.faqSearch || '').toLowerCase();

  const catNames = {
    general: isTe ? 'సాధారణం' : 'General',
    eligibility: isTe ? 'అర్హత & తరగతులు' : 'Eligibility',
    income: isTe ? 'ఆదాయం & సర్టిఫికెట్లు' : 'Income',
    documents: isTe ? 'కావాల్సిన పత్రాలు' : 'Documents',
    portals: isTe ? 'దరఖాస్తు & పోర్టల్స్' : 'Application',
    safety: isTe ? 'భద్రత & మోసాల నివారణ' : 'Safety'
  };

  const filtered = FAQ_DATA.filter(item => {
    const matchesCat = cat === 'all' || item.category === cat;
    if (!matchesCat) return false;
    if (!query) return true;
    const q = (isTe ? item.qTe : item.qEn).toLowerCase();
    const a = (isTe ? item.aTe : item.aEn).toLowerCase();
    return q.includes(query) || a.includes(query);
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding:3rem 1.5rem; background:var(--card-bg, #fff); border-radius:var(--radius-lg, 12px); border:1px solid var(--border-color, #E2E8F0); margin: 1rem 0;">
        <p style="font-size:1.1rem; font-weight:600; color:var(--text-main, #1E293B); margin-bottom:0.4rem;">
          ${isTe ? 'సరిపోయే ప్రశ్నలు లేదా సమాధానాలు కనుగొనబడలేదు.' : 'No matching questions found.'}
        </p>
        <p style="font-size:0.88rem; color:var(--text-muted, #64748B);">
          ${isTe ? 'వేరొక కీలకపదంతో ప్రయత్నించండి లేదా "అన్ని విషయాలు" ఎంచుకోండి.' : 'Try a different search keyword or switch to "All Topics".'}
        </p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map((item, index) => {
    const question = isTe ? item.qTe : item.qEn;
    const answer = isTe ? item.aTe : item.aEn;
    const catLabel = catNames[item.category] || item.category;

    return `
      <div class="faq-item" data-faq-index="${index}">
        <button type="button" class="faq-question-btn" aria-expanded="false">
          <div style="display:flex; align-items:center; gap:0.6rem; text-align:left;">
            <span class="faq-cat-badge" style="font-size:0.72rem; padding:0.2rem 0.55rem; background:#EFF6FF; color:#1E40AF; border-radius:999px; font-weight:600; text-transform:uppercase; letter-spacing:0.02em; white-space:nowrap;">${catLabel}</span>
            <span style="font-weight:600;">${question}</span>
          </div>
          <svg class="faq-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
        <div class="faq-answer">
          <div class="faq-answer-inner">${answer}</div>
        </div>
      </div>
    `;
  }).join('');

  container.querySelectorAll('.faq-question-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      item.classList.toggle('open', !isOpen);
      btn.setAttribute('aria-expanded', !isOpen);
    });
  });
}

/**
 * Prototype Admin Modal Management
 */
function openAdminModal() {
  updateAdminJsonView();
  DOM.adminModal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeAdminModal() {
  DOM.adminModal.classList.remove('open');
  document.body.style.overflow = '';
}

function updateAdminJsonView() {
  if (DOM.adminJsonView) {
    DOM.adminJsonView.textContent = JSON.stringify(AppState.scholarships, null, 2);
  }
}

/**
 * Resets search filters
 */
function resetFilters() {
  AppState.activeFilters = { state: '', class: '', category: '', status: '', search: '' };
  DOM.filterState.value = '';
  DOM.filterClass.value = '';
  DOM.filterCategory.value = '';
  DOM.filterStatus.value = '';
  DOM.heroSearchInput.value = '';
  DOM.quickPills.forEach(p => p.classList.remove('active'));
  document.querySelector('.quick-pill[data-state-filter=""]').classList.add('active');
  renderScholarships();
}

/**
 * Toast Notification System
 */
function showToast(message, duration = 3000) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color:var(--accent-teal); flex-shrink:0;">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
    <span>${message}</span>
  `;
  DOM.toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease-out';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

// Global window trigger on DOM ready
document.addEventListener('DOMContentLoaded', initApp);
