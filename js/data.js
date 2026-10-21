/**
 * SCHOLAR GATE - Scholarship and Demonstration Profile Data
 * Provides local embedded data with graceful fallback for both local file:// and HTTP server execution.
 */

const DEFAULT_SCHOLARSHIPS = [
  {
    "id": "nmmss",
    "name": "National Means-cum-Merit Scholarship Scheme (NMMSS)",
    "nameTe": "నేషనల్ మీన్స్-కమ్-మెరిట్ స్కాలర్‌షిప్ పథకం (NMMSS)",
    "administeringAuthority": "Department of School Education and Literacy, Ministry of Education, Government of India",
    "administeringAuthorityTe": "పాఠశాల విద్య మరియు అక్షరాస్యత విభాగం, విద్యా మంత్రిత్వ శాఖ, భారత ప్రభుత్వం",
    "coverage": "All India",
    "eligibleClasses": [
      8,
      9,
      10,
      11,
      12
    ],
    "selectionClass": 8,
    "categories": [
      "SC",
      "ST",
      "OBC",
      "EBC",
      "Minority",
      "General"
    ],
    "incomeLimitINR": 350000,
    "schoolTypes": [
      "Government",
      "Government-aided",
      "Local body"
    ],
    "disabilityCriteria": null,
    "occupationCriteria": null,
    "academicCriteria": [
      "Minimum 55% marks in Class 7 for General/OBC (50% for SC/ST) to sit for selection test",
      "Must qualify State-level Mental Ability (MAT) & Scholastic Aptitude (SAT) test conducted in Class 8",
      "Minimum 55% marks in Class 8/9/10/11 for annual scholarship renewal (50% for SC/ST)"
    ],
    "benefitDescription": "₹12,000 per annum (₹1,000/month) disbursed directly to student bank accounts to prevent school dropouts after Class 8.",
    "benefitAmountINR": 12000,
    "applicationType": "Fresh / Renewal",
    "applicationStatus": "Check official portal",
    "deadline": "Check official portal (Typically October–December annually on NSP)",
    "requiredDocuments": [
      "Class 7 / Class 8 Marksheet showing minimum qualifying percentage",
      "Valid Family Income Certificate issued by competent revenue authority (<= ₹3.5 Lakhs)",
      "Caste / Category Certificate (for SC/ST/OBC mark relaxation)",
      "School Bonafide / Study Certificate from Govt or Govt-aided school",
      "Aadhaar-seeded Bank Account Passbook copy in student's name",
      "State NMMS Examination Hall Ticket / Merit Result Card"
    ],
    "howToApply": [
      "Apply for the State-level NMMS selection examination through your school in Class 8.",
      "After qualifying the state merit exam, register on the National Scholarship Portal (scholarships.gov.in) with One-Time Registration (OTR).",
      "Select Ministry of Education -> National Means-cum-Merit Scholarship Scheme.",
      "Submit school verification and track application through your District Nodal Officer."
    ],
    "officialInformationUrl": "https://dsel.education.gov.in/scheme/nmmss",
    "officialApplicationUrl": "https://scholarships.gov.in",
    "lastVerifiedDate": "2026-03-15",
    "verificationStatus": "Verified",
    "eligibilityNotes": "Students of Kendriya Vidyalayas, Jawahar Navodaya Vidyalayas, and private residential schools are not eligible under scheme rules.",
    "demoOnly": false,
    "beneficiaryGroup": "Rural & Economically Weaker Section School Students",
    "beneficiaryGroupTe": "గ్రామీణ & EWS పాఠశాల విద్యార్థులు"
  },
  {
    "id": "pmyasasvi_prematric",
    "name": "PM YASASVI Pre-Matric Scholarship for OBC, EBC and DNT Students",
    "nameTe": "పీఎం యశస్వి ప్రీ-మెట్రిక్ స్కాలర్‌షిప్ (OBC, EBC మరియు DNT విద్యార్థుల కోసం)",
    "administeringAuthority": "Ministry of Social Justice and Empowerment, Government of India",
    "administeringAuthorityTe": "సామాజిక న్యాయం మరియు సాధికారత మంత్రిత్వ శాఖ, భారత ప్రభుత్వం",
    "coverage": "All India",
    "eligibleClasses": [
      9,
      10
    ],
    "selectionClass": null,
    "categories": [
      "OBC",
      "EBC",
      "DNT"
    ],
    "incomeLimitINR": 250000,
    "schoolTypes": [
      "Government",
      "Government-aided",
      "Recognized private school"
    ],
    "disabilityCriteria": null,
    "occupationCriteria": null,
    "academicCriteria": [
      "Must be studying as regular, full-time student in Class 9 or 10",
      "Must have passed the previous final examination on first attempt"
    ],
    "benefitDescription": "Consolidated academic allowance of ₹4,000 per annum deposited directly into the student's bank account via Direct Benefit Transfer (DBT).",
    "benefitAmountINR": 4000,
    "applicationType": "Fresh / Renewal",
    "applicationStatus": "Check official portal",
    "deadline": "Check official portal (Typically July–November annually on NSP)",
    "requiredDocuments": [
      "Previous Class passing Marksheet",
      "Valid OBC / EBC / DNT Caste Certificate issued by competent authority",
      "Valid Family Income Certificate (Annual family income <= ₹2.5 Lakhs)",
      "School Bonafide / Enrollment Certificate",
      "Student Aadhaar Card and Aadhaar-seeded Bank Account Passbook",
      "Recent passport-size photograph"
    ],
    "howToApply": [
      "Register on the National Scholarship Portal (scholarships.gov.in) with OTR (One-Time Registration).",
      "Log in with OTR credentials and select Ministry of Social Justice and Empowerment schemes.",
      "Choose PM YASASVI Pre-Matric Scholarship for OBC, EBC and DNT Students.",
      "Upload requested certificates, submit the form, and get it verified by your school headmaster."
    ],
    "officialInformationUrl": "https://socialjustice.gov.in/schemes/23",
    "officialApplicationUrl": "https://scholarships.gov.in",
    "lastVerifiedDate": "2026-03-15",
    "verificationStatus": "Verified",
    "eligibilityNotes": "Beneficiaries must belong to OBC, EBC, or De-Notified Tribes list and study in a government or recognized school.",
    "demoOnly": false,
    "beneficiaryGroup": "OBC, EBC & De-Notified Tribe Secondary Students",
    "beneficiaryGroupTe": "ఓబీసీ, ఈబీసీ & డీఎన్‌టీ ఉన్నత పాఠశాల విద్యార్థులు"
  },
  {
    "id": "depwd_prematric",
    "name": "Pre-Matric Scholarship for Students with Disabilities",
    "nameTe": "దివ్యాంగ విద్యార్థుల కోసం ప్రీ-మెట్రిక్ స్కాలర్‌షిప్",
    "administeringAuthority": "Department of Empowerment of Persons with Disabilities, Ministry of Social Justice & Empowerment, GoI",
    "administeringAuthorityTe": "దివ్యాంగుల సాధికారత విభాగం, సామాజిక న్యాయ మంత్రిత్వ శాఖ, భారత ప్రభుత్వం",
    "coverage": "All India",
    "eligibleClasses": [
      9,
      10
    ],
    "selectionClass": null,
    "categories": [
      "SC",
      "ST",
      "OBC",
      "EBC",
      "Minority",
      "General"
    ],
    "incomeLimitINR": 250000,
    "schoolTypes": [
      "Government",
      "Government-aided",
      "Recognized private school"
    ],
    "disabilityCriteria": "Benchmark disability of 40% or more certified by a competent medical authority or UDID card",
    "occupationCriteria": null,
    "academicCriteria": [
      "Full-time regular student in Class 9 or 10 in a recognized school",
      "Should not be holding any other concurrent central or state scholarship"
    ],
    "benefitDescription": "Maintenance allowance of ₹500/month (Day scholars) or ₹800/month (Hostellers), ₹1,000/year book grant, plus ₹2,000–₹4,000/year disability allowance.",
    "benefitAmountINR": 8000,
    "applicationType": "Fresh / Renewal",
    "applicationStatus": "Check official portal",
    "deadline": "Check official portal (Typically July–November on NSP)",
    "requiredDocuments": [
      "Valid Disability Certificate (UDID card or medical board certificate showing 40%+ disability)",
      "Annual Family Income Certificate (<= ₹2.5 Lakhs)",
      "Previous Class passing marksheet",
      "Bonafide / Enrollment Certificate from recognized school",
      "Student Aadhaar Card and Aadhaar-seeded Bank Passbook",
      "Recent passport-size photograph"
    ],
    "howToApply": [
      "Register on the National Scholarship Portal (scholarships.gov.in) with valid Aadhaar/UDID details.",
      "Select Department of Empowerment of Persons with Disabilities -> Pre-Matric Scholarship for Students with Disabilities.",
      "Enter school details and disability registration number, then submit online.",
      "Submit the printed copy with doctor/hospital disability certificate copy to your school for verification."
    ],
    "officialInformationUrl": "https://depwd.gov.in/en/scholership-schemes-pre-matric/",
    "officialApplicationUrl": "https://scholarships.gov.in",
    "lastVerifiedDate": "2026-03-15",
    "verificationStatus": "Verified",
    "eligibilityNotes": "Applicable to students with 40% or more disability under RPwD Act 2016. Up to 2 disabled children per family can receive this support.",
    "demoOnly": false,
    "beneficiaryGroup": "Differently Abled Students (40%+ Disability)",
    "beneficiaryGroupTe": "దివ్యాంగ విద్యార్థులు (40%+ వైకల్యం)"
  },
  {
    "id": "labour_beedi_prematric",
    "name": "Financial Assistance for Education to Wards of Beedi/Cine/IOMC/LSDM Workers (Pre-Matric)",
    "nameTe": "బీడీ, సినీ, గని కార్మికుల పిల్లల విద్యా సహాయ పథకం (ప్రీ-మెట్రిక్)",
    "administeringAuthority": "Labour Welfare Organization, Ministry of Labour and Employment, Government of India",
    "administeringAuthorityTe": "కార్మిక సంక్షేమ సంస్థ, కార్మిక మరియు ఉపాధి మంత్రిత్వ శాఖ, భారత ప్రభుత్వం",
    "coverage": "All India",
    "eligibleClasses": [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10
    ],
    "selectionClass": null,
    "categories": [
      "SC",
      "ST",
      "OBC",
      "EBC",
      "Minority",
      "General"
    ],
    "incomeLimitINR": 120000,
    "schoolTypes": [
      "Government",
      "Government-aided",
      "Recognized private school"
    ],
    "disabilityCriteria": null,
    "occupationCriteria": "At least one parent must be an identified Beedi worker, eligible Mine worker (IOMC/LSDM), or Cine worker with minimum 6 months continuous service",
    "academicCriteria": [
      "Passed previous examination in first attempt and promoted to the next class",
      "Enrolled as a full-time regular student"
    ],
    "benefitDescription": "Class 1–4: ₹1,000/year; Class 5–8: ₹1,500/year; Class 9–10: ₹2,000/year directly to the student's bank account for books and uniforms.",
    "benefitAmountINR": 1500,
    "applicationType": "Fresh / Renewal",
    "applicationStatus": "Check official portal",
    "deadline": "Check official portal (Typically August–December on NSP)",
    "requiredDocuments": [
      "Parent's valid Beedi / Cine / Mine Worker Identity Card or Welfare Identification Number",
      "Salary / Wages Certificate from employer/contractor or monthly income proof (<= ₹10,000/month for Beedi; <= ₹8,000/month for Cine)",
      "Previous Class Marksheet or promotion certificate",
      "School Bonafide Certificate showing admission number and current class",
      "Student Aadhaar Card and Aadhaar-seeded Bank Passbook",
      "Passport-size photograph"
    ],
    "howToApply": [
      "Register on the National Scholarship Portal (scholarships.gov.in) with One-Time Registration (OTR).",
      "Select Ministry of Labour and Employment -> Financial Assistance for Education of Wards of Beedi/Cine/IOMC/LSDM Workers.",
      "Enter parent's worker identity card number and welfare dispensary / regional office details.",
      "Submit the application and verify through the school principal and regional Welfare Commissioner."
    ],
    "officialInformationUrl": "https://labour.gov.in/schemes",
    "officialApplicationUrl": "https://scholarships.gov.in",
    "lastVerifiedDate": "2026-03-15",
    "verificationStatus": "Verified",
    "eligibilityNotes": "One parent must be an active Beedi worker, Cine worker, or non-coal Mine worker. Correspondence and distance-learning courses are ineligible.",
    "demoOnly": false,
    "beneficiaryGroup": "Children of Registered Beedi, Cine & Mine Workers",
    "beneficiaryGroupTe": "బీడీ, సినీ & గని కార్మికుల పిల్లలు"
  },
  {
    "id": "sc_prematric_central",
    "name": "Centrally Sponsored Pre-Matric Scholarship for Scheduled Caste (SC) Students",
    "nameTe": "షెడ్యూల్డ్ కులాల (SC) విద్యార్థుల కోసం కేంద్ర ప్రాయోజిత ప్రీ-మెట్రిక్ స్కాలర్‌షిప్",
    "administeringAuthority": "Ministry of Social Justice and Empowerment, Government of India (Administered via State Welfare Departments & NSP)",
    "administeringAuthorityTe": "సామాజిక న్యాయ మంత్రిత్వ శాఖ (రాష్ట్ర సంక్షేమ శాఖల ద్వారా అమలు చేయబడుతుంది)",
    "coverage": "All India",
    "eligibleClasses": [
      9,
      10
    ],
    "selectionClass": null,
    "categories": [
      "SC"
    ],
    "incomeLimitINR": 250000,
    "schoolTypes": [
      "Government",
      "Government-aided",
      "Recognized private school"
    ],
    "disabilityCriteria": null,
    "occupationCriteria": null,
    "academicCriteria": [
      "Must be studying in Class 9 or 10 as regular, full-time student",
      "Regular attendance in school"
    ],
    "benefitDescription": "Consolidated academic allowance of ₹3,500/year (Day scholars) or ₹7,000/year (Hostellers) plus 10% extra allowance for disabled SC students.",
    "benefitAmountINR": 3500,
    "applicationType": "Fresh / Renewal",
    "applicationStatus": "Check official portal",
    "deadline": "Check official portal (Varies per state portal window / NSP)",
    "requiredDocuments": [
      "Valid Scheduled Caste (SC) Community Certificate issued by MeeSeva or Tehsildar",
      "Family Income Certificate from Revenue Officer (Annual income <= ₹2.5 Lakhs)",
      "Previous Class passing memo / marksheet",
      "Bonafide Certificate from school",
      "Student Aadhaar Card and Aadhaar-seeded Bank Account Passbook",
      "Passport photograph"
    ],
    "howToApply": [
      "Apply through the National Scholarship Portal (scholarships.gov.in) or state welfare portal (AP JnanaBhumi / Telangana ePASS depending on state).",
      "Fill in student profile, caste certificate number, and family annual income.",
      "Submit application to school headmaster for e-KYC and onward verification."
    ],
    "officialInformationUrl": "https://socialjustice.gov.in/schemes/23",
    "officialApplicationUrl": "https://scholarships.gov.in",
    "lastVerifiedDate": "2026-03-15",
    "verificationStatus": "Verified",
    "eligibilityNotes": "Applicable exclusively to SC students studying in Classes 9 and 10 in recognized institutions.",
    "demoOnly": false,
    "beneficiaryGroup": "Scheduled Caste (SC) Secondary School Students",
    "beneficiaryGroupTe": "ఎస్సీ (SC) ఉన్నత పాఠశాల విద్యార్థులు"
  },
  {
    "id": "st_prematric_central",
    "name": "Centrally Sponsored Pre-Matric Scholarship for Scheduled Tribe (ST) Students",
    "nameTe": "షెడ్యూల్డ్ తెగల (ST) విద్యార్థుల కోసం కేంద్ర ప్రాయోజిత ప్రీ-మెట్రిక్ స్కాలర్‌షిప్",
    "administeringAuthority": "Ministry of Tribal Affairs, Government of India",
    "administeringAuthorityTe": "గిరిజన వ్యవహారాల మంత్రిత్వ శాఖ, భారత ప్రభుత్వం",
    "coverage": "All India",
    "eligibleClasses": [
      9,
      10
    ],
    "selectionClass": null,
    "categories": [
      "ST"
    ],
    "incomeLimitINR": 250000,
    "schoolTypes": [
      "Government",
      "Government-aided",
      "Recognized private school",
      "Ashram School"
    ],
    "disabilityCriteria": null,
    "occupationCriteria": null,
    "academicCriteria": [
      "Must be a regular student in Class 9 or 10 in a recognized school or Ashram school"
    ],
    "benefitDescription": "Annual academic allowance of ₹3,500/year (Day scholars) or ₹7,000/year (Hostellers) directly via DBT to support secondary education retention.",
    "benefitAmountINR": 3500,
    "applicationType": "Fresh / Renewal",
    "applicationStatus": "Check official portal",
    "deadline": "Check official portal (NSP and State Tribal Welfare portals)",
    "requiredDocuments": [
      "Valid Scheduled Tribe (ST) Community Certificate",
      "Income Certificate from authorized revenue officer (<= ₹2.5 Lakhs)",
      "Class 8 or 9 Marksheet",
      "School Bonafide / Study Certificate",
      "Student Bank Account Passbook (Aadhaar linked)",
      "Student Aadhaar Card"
    ],
    "howToApply": [
      "Register on the National Scholarship Portal (scholarships.gov.in) or respective state tribal portal.",
      "Select Ministry of Tribal Affairs -> Pre-Matric Scholarship for ST Students.",
      "Submit student details and upload verified certificates.",
      "School headmaster approves and forwards to District Tribal Welfare Officer (DTWO)."
    ],
    "officialInformationUrl": "https://tribal.nic.in/Scholarship.aspx",
    "officialApplicationUrl": "https://scholarships.gov.in",
    "lastVerifiedDate": "2026-03-15",
    "verificationStatus": "Verified",
    "eligibilityNotes": "Restricted to ST students. Must not receive duplicate scholarship from another ministry.",
    "demoOnly": false,
    "beneficiaryGroup": "Scheduled Tribe (ST) Secondary School Students",
    "beneficiaryGroupTe": "ఎస్టీ (ST) ఉన్నత పాఠశాల విద్యార్థులు"
  },
  {
    "id": "telangana_epass_prematric",
    "name": "Telangana ePASS Pre-Matric Scholarship for SC/ST/BC/Disabled Students",
    "nameTe": "తెలంగాణ ఈ-పాస్ ప్రీ-మెట్రిక్ స్కాలర్‌షిప్ పథకం (SC/ST/BC/దివ్యాంగులు)",
    "administeringAuthority": "Scheduled Castes / Tribal / Backward Classes / Disabled Welfare Departments, Government of Telangana",
    "administeringAuthorityTe": "SC, ST, BC మరియు దివ్యాంగుల సంక్షేమ శాఖలు, తెలంగాణ ప్రభుత్వం",
    "coverage": "Telangana",
    "eligibleClasses": [
      5,
      6,
      7,
      8,
      9,
      10
    ],
    "selectionClass": null,
    "categories": [
      "SC",
      "ST",
      "OBC",
      "EBC",
      "Minority"
    ],
    "incomeLimitINR": 200000,
    "schoolTypes": [
      "Government",
      "Government-aided",
      "Local body"
    ],
    "disabilityCriteria": null,
    "occupationCriteria": null,
    "academicCriteria": [
      "Regular student studying in Class 5 to 10 in Telangana Govt/Aided/Local Body school",
      "Minimum 75% attendance during the academic term"
    ],
    "benefitDescription": "Financial assistance and maintenance allowance of ₹1,000 to ₹3,500/year depending on class and hosteller status.",
    "benefitAmountINR": 2500,
    "applicationType": "Fresh / Renewal",
    "applicationStatus": "Check official portal",
    "deadline": "Check official portal (Telangana ePASS notification window)",
    "requiredDocuments": [
      "Telangana MeeSeva Caste Certificate",
      "Telangana MeeSeva Income Certificate (SC/ST <= ₹2L; BC Rural <= ₹1.5L, Urban <= ₹2L)",
      "Bonafide Certificate from Telangana school",
      "Student Aadhaar Card and Parent Aadhaar Card",
      "Bank Account Passbook (Nationalized bank, student/joint account)",
      "Previous year marks memo / progress card"
    ],
    "howToApply": [
      "Visit the official Telangana ePASS website (telanganaepass.cgg.gov.in).",
      "Click on 'Pre-Matric Scholarships' section.",
      "Select 'Fresh Registration' or 'Renewal Registration' according to your class.",
      "Enter your MeeSeva caste, income certificate numbers, and school U-DISE code.",
      "Submit through your school Headmaster or online directly on the portal."
    ],
    "officialInformationUrl": "https://telanganaepass.cgg.gov.in/",
    "officialApplicationUrl": "https://telanganaepass.cgg.gov.in/",
    "lastVerifiedDate": "2026-03-15",
    "verificationStatus": "Verified",
    "eligibilityNotes": "Domicile of Telangana required. Applied online through Telangana ePASS Pre-Matric portal or through the school Headmaster.",
    "demoOnly": false,
    "beneficiaryGroup": "School Students in Telangana (SC, ST, BC & Disabled)",
    "beneficiaryGroupTe": "తెలంగాణ పాఠశాల విద్యార్థులు (SC, ST, BC & దివ్యాంగులు)"
  },
  {
    "id": "ap_jnanabhumi_prematric",
    "name": "Andhra Pradesh JnanaBhumi Pre-Matric Scholarship for SC/ST/BC/Minorities",
    "nameTe": "ఆంధ్రప్రదేశ్ జ్ఞానభూమి ప్రీ-మెట్రిక్ స్కాలర్‌షిప్ పథకం",
    "administeringAuthority": "Social Welfare / Tribal Welfare / BC Welfare Departments, Government of Andhra Pradesh",
    "administeringAuthorityTe": "సాంఘిక సంక్షేమం, గిరిజన సంక్షేమం, బీసీ సంక్షేమ శాఖలు, ఆంధ్రప్రదేశ్ ప్రభుత్వం",
    "coverage": "Andhra Pradesh",
    "eligibleClasses": [
      5,
      6,
      7,
      8,
      9,
      10
    ],
    "selectionClass": null,
    "categories": [
      "SC",
      "ST",
      "OBC",
      "EBC",
      "Minority"
    ],
    "incomeLimitINR": 250000,
    "schoolTypes": [
      "Government",
      "Government-aided",
      "Local body"
    ],
    "disabilityCriteria": null,
    "occupationCriteria": null,
    "academicCriteria": [
      "Regular student studying in Class 5 to 10 in recognized AP government/aided school",
      "Minimum 75% attendance in school"
    ],
    "benefitDescription": "Direct financial assistance and maintenance grant (₹1,000 to ₹3,500/year) to encourage retention and reduce school dropouts.",
    "benefitAmountINR": 2500,
    "applicationType": "Fresh / Renewal",
    "applicationStatus": "Check official portal",
    "deadline": "Check official portal (JnanaBhumi annual schedule)",
    "requiredDocuments": [
      "AP Grama/Ward Sachivalayam or MeeSeva Integrated Caste Certificate",
      "Income Certificate / White Ration Card / Rice Card (Family income <= ₹2.5L)",
      "School Bonafide & Enrollment Certificate",
      "Student Aadhaar Card & Biometric Authentication",
      "Aadhaar-seeded Bank Account Passbook",
      "Passport photograph"
    ],
    "howToApply": [
      "Visit the official AP JnanaBhumi portal (jnanabhumi.ap.gov.in).",
      "Navigate to the Pre-Matric Scholarship service section.",
      "The school headmaster/in-charge registers eligible students with student Aadhaar and Rice Card.",
      "Biometric e-KYC authentication is completed at the school or local Grama Sachivalayam."
    ],
    "officialInformationUrl": "https://jnanabhumi.ap.gov.in/",
    "officialApplicationUrl": "https://jnanabhumi.ap.gov.in/",
    "lastVerifiedDate": "2026-03-15",
    "verificationStatus": "Verified",
    "eligibilityNotes": "Andhra Pradesh resident required. Applications processed via School Headmaster / Jnanabhumi School Login or Grama Sachivalayam.",
    "demoOnly": false,
    "beneficiaryGroup": "School Students in Andhra Pradesh (SC, ST, BC & Minorities)",
    "beneficiaryGroupTe": "ఆంధ్రప్రదేశ్ పాఠశాల విద్యార్థులు (SC, ST, BC & మైనారిటీలు)"
  },
  {
    "id": "begum_hazrat_mahal",
    "name": "Begum Hazrat Mahal National Scholarship for Minority Girl Students",
    "nameTe": "మైనారిటీ బాలికల కోసం బేగం హజ్రత్ మహల్ జాతీయ స్కాలర్‌షిప్",
    "administeringAuthority": "Ministry of Minority Affairs / Maulana Azad Education Foundation, Government of India",
    "administeringAuthorityTe": "మైనారిటీ వ్యవహారాల మంత్రిత్వ శాఖ, భారత ప్రభుత్వం",
    "coverage": "All India",
    "eligibleClasses": [
      9,
      10,
      11,
      12
    ],
    "selectionClass": null,
    "categories": [
      "Minority"
    ],
    "incomeLimitINR": 200000,
    "schoolTypes": [
      "Government",
      "Government-aided",
      "Recognized private school"
    ],
    "disabilityCriteria": null,
    "occupationCriteria": null,
    "academicCriteria": [
      "Only for girl students belonging to notified minority communities (Muslim, Christian, Sikh, Buddhist, Jain, Parsi)",
      "Minimum 50% marks or equivalent grade in the previous class final examination"
    ],
    "benefitDescription": "Class 9 & 10: ₹5,000 per annum; Class 11 & 12: ₹6,000 per annum disbursed through DBT directly to student account.",
    "benefitAmountINR": 5000,
    "applicationType": "Fresh / Renewal",
    "applicationStatus": "Check official portal",
    "deadline": "Check official portal (National Scholarship Portal window)",
    "requiredDocuments": [
      "Self-declaration / Minority Community Certificate",
      "Family Income Certificate issued by competent authority (<= ₹2 Lakhs)",
      "Previous Year Marksheet with minimum 50% marks",
      "School Bonafide Certificate / School Verification Form",
      "Student Bank Account passbook copy with IFSC",
      "Aadhaar Card of the student"
    ],
    "howToApply": [
      "Access the National Scholarship Portal (scholarships.gov.in).",
      "Complete One-Time Registration (OTR) with student's Aadhaar.",
      "Select Ministry of Minority Affairs -> Begum Hazrat Mahal National Scholarship.",
      "Fill academic score and upload parent income certificate; submit for school nodal officer approval."
    ],
    "officialInformationUrl": "https://scholarships.gov.in",
    "officialApplicationUrl": "https://scholarships.gov.in",
    "lastVerifiedDate": "2026-03-15",
    "verificationStatus": "Verified",
    "eligibilityNotes": "Female students from notified minority communities only. Only two girl students per family are eligible.",
    "demoOnly": false,
    "beneficiaryGroup": "Meritorious Girl Students from Notified Minority Communities",
    "beneficiaryGroupTe": "మైనారిటీ వర్గాల ప్రతిభావంతులైన బాలికలు"
  },
  {
    "id": "yasasvi_topclass",
    "name": "PM YASASVI Top Class School Education for OBC, EBC and DNT Students",
    "nameTe": "ఓబీసీ, ఈబీసీ, డీఎన్‌టీ విద్యార్థుల కోసం పీఎం యశస్వి టాప్ క్లాస్ స్కూల్ ఎడ్యుకేషన్",
    "administeringAuthority": "Ministry of Social Justice and Empowerment, Government of India",
    "administeringAuthorityTe": "సామాజిక న్యాయం మరియు సాధికారత మంత్రిత్వ శాఖ, భారత ప్రభుత్వం",
    "coverage": "All India",
    "eligibleClasses": [
      9,
      11
    ],
    "selectionClass": null,
    "categories": [
      "OBC",
      "EBC",
      "DNT"
    ],
    "incomeLimitINR": 250000,
    "schoolTypes": [
      "Recognized private school",
      "Government"
    ],
    "disabilityCriteria": null,
    "occupationCriteria": null,
    "academicCriteria": [
      "Must be studying in Class 9 or 11 in one of the identified top-performing schools designated by MoSJE",
      "Merit-based admission in shortlisted school"
    ],
    "benefitDescription": "Full tuition fee reimbursement and academic allowance up to ₹75,000/year for Class 9–10 and up to ₹1,25,000/year for Class 11–12.",
    "benefitAmountINR": 75000,
    "applicationType": "Fresh",
    "applicationStatus": "Check official portal",
    "deadline": "Check official portal (NSP annual schedule)",
    "requiredDocuments": [
      "OBC / EBC / DNT Category Certificate",
      "Income Certificate from authorized Tehsildar (<= ₹2.5 Lakhs)",
      "Admission proof in an identified Top Class School",
      "Previous class marksheet",
      "Student Aadhaar Card & Bank Details"
    ],
    "howToApply": [
      "Visit scholarships.gov.in and log in with NSP OTR.",
      "Select Ministry of Social Justice and Empowerment -> PM YASASVI Top Class School Education.",
      "Verify that your school is on the MoSJE shortlisted Top-Class School list.",
      "Submit application and follow up with the school principal for online portal approval."
    ],
    "officialInformationUrl": "https://socialjustice.gov.in/schemes/23",
    "officialApplicationUrl": "https://scholarships.gov.in",
    "lastVerifiedDate": "2026-03-15",
    "verificationStatus": "Verified",
    "eligibilityNotes": "Applicable only to students studying in MoSJE-notified Top Schools across India.",
    "demoOnly": false,
    "beneficiaryGroup": "Meritorious OBC, EBC & DNT Students in Top Notified Schools",
    "beneficiaryGroupTe": "ఎంపిక చేసిన ప్రముఖ పాఠశాలల్లోని ఓబీసీ/ఈబీసీ విద్యార్థులు"
  }
];

const DEFAULT_DEMO_PROFILES = [
  {
    "id": "profile_a",
    "title": "Profile A — Rural student in Andhra Pradesh",
    "titleTe": "ప్రొఫైల్ A — ఆంధ్రప్రదేశ్ గ్రామీణ విద్యార్థిని",
    "description": "Class 8, SC category, Govt school, family income below ₹1 lakh. Tests Andhra Pradesh state schemes, SC category matching, and NMMSS examination stage.",
    "studentName": "Kavitha R.",
    "state": "Andhra Pradesh",
    "currentClass": "8",
    "socialCategory": "SC",
    "familyIncome": "Below ₹1 lakh",
    "schoolType": "Government",
    "hasDisability": "No",
    "parentOccupation": "None of these",
    "academicScore": "Above 55%",
    "preferences": ["Pre-matric assistance", "Merit-based schemes"]
  },
  {
    "id": "profile_b",
    "title": "Profile B — Student in Telangana",
    "titleTe": "ప్రొఫైల్ B — తెలంగాణ విద్యార్థి",
    "description": "Class 10, ST category, Govt-aided school, family income ₹1L–₹2.5L. Tests Telangana ePASS matching, central ST pre-matric, and class 10 coverage.",
    "studentName": "Raju Naik",
    "state": "Telangana",
    "currentClass": "10",
    "socialCategory": "ST",
    "familyIncome": "₹1 lakh–₹2.5 lakh",
    "schoolType": "Government-aided",
    "hasDisability": "No",
    "parentOccupation": "None of these",
    "academicScore": "Above 55%",
    "preferences": ["Pre-matric assistance"]
  },
  {
    "id": "profile_c",
    "title": "Profile C — Student with a disability",
    "titleTe": "ప్రొఫైల్ C — దివ్యాంగ విద్యార్థిని",
    "description": "Class 9, General/Other, Recognized private school, Disability selected (UDID holder), family income ₹1L–₹2.5L. Tests DEPwD disability pre-matric scheme matching.",
    "studentName": "Ananya Sharma",
    "state": "Other Indian state",
    "currentClass": "9",
    "socialCategory": "General/Other",
    "familyIncome": "₹1 lakh–₹2.5 lakh",
    "schoolType": "Recognized private school",
    "hasDisability": "Yes",
    "parentOccupation": "None of these",
    "academicScore": "Above 55%",
    "preferences": ["Disability assistance"]
  },
  {
    "id": "profile_d",
    "title": "Profile D — Parent in an eligible occupation",
    "titleTe": "ప్రొఫైల్ D — బీడీ కార్మికుని బిడ్డ",
    "description": "Class 7, OBC/BC category, Govt school, Beedi worker parent, family income below ₹1 lakh. Tests Ministry of Labour welfare assistance for primary/middle classes.",
    "studentName": "Mahesh B.",
    "state": "Telangana",
    "currentClass": "7",
    "socialCategory": "OBC/BC",
    "familyIncome": "Below ₹1 lakh",
    "schoolType": "Government",
    "hasDisability": "No",
    "parentOccupation": "Beedi worker",
    "academicScore": "Above 55%",
    "preferences": ["Occupation-based assistance"]
  },
  {
    "id": "profile_e",
    "title": "Profile E — General category with higher income",
    "titleTe": "ప్రొఫైల్ E — జనరల్ కేటగిరీ విద్యార్థి (అధిక ఆదాయం)",
    "description": "Class 11, General/Other, Recognized private school, family income above ₹3.5 lakh. Tests non-match rules and transparent portal eligibility feedback.",
    "studentName": "Siddharth V.",
    "state": "Andhra Pradesh",
    "currentClass": "11",
    "socialCategory": "General/Other",
    "familyIncome": "Above ₹3.5 lakh",
    "schoolType": "Recognized private school",
    "hasDisability": "No",
    "parentOccupation": "None of these",
    "academicScore": "Above 55%",
    "preferences": []
  }
];

// Data loader with fetch and memory fallback
let scholarshipsData = [...DEFAULT_SCHOLARSHIPS];
let demoProfilesData = [...DEFAULT_DEMO_PROFILES];

async function loadDataset() {
  try {
    const sRes = await fetch('./data/scholarships.json');
    if (sRes.ok) {
      const data = await sRes.json();
      if (Array.isArray(data) && data.length > 0) {
        scholarshipsData = data;
      }
    }
  } catch (err) {
    console.log('Using embedded scholarship dataset fallback:', err.message);
  }

  try {
    const pRes = await fetch('./data/demo-profiles.json');
    if (pRes.ok) {
      const pData = await pRes.json();
      if (Array.isArray(pData) && pData.length > 0) {
        demoProfilesData = pData;
      }
    }
  } catch (err) {
    console.log('Using embedded demo profiles fallback:', err.message);
  }

  return {
    scholarships: scholarshipsData,
    profiles: demoProfilesData
  };
}
