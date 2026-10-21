# SCHOLAR GATE — Scholarship & Sponsorship Portal MVP

> **College & Community Service Project (CSP)**  
> **Target Audience:** School students (Class 1 to 12) across **Andhra Pradesh**, **Telangana**, and **All India**.  
> **Core Focus:** Rural and economically weaker students, parents, and community workers.

---

## 1. Project Overview & Problem Statement

### The Problem
In India, particularly in rural and semi-urban areas of **Andhra Pradesh** and **Telangana**, thousands of promising school students drop out after Class 8 or Class 10. While both Central and State Governments offer numerous pre-matric scholarships, merit-cum-means assistance, and educational stipends, students and parents frequently miss out because:
1. They do not know which schemes they qualify for.
2. Eligibility criteria (income caps, community reservations, exam requirements) are scattered and confusing.
3. Official notification windows are brief and hard to track.
4. Students are misled by unofficial agents charging fees or asking for sensitive credentials.

### The Solution: SCHOLAR GATE
**SCHOLAR GATE** is an open-access, student-first portal designed to bridge this divide. It provides:
- **Guided Student Eligibility Wizard:** Simple 3-step questionnaire without collecting sensitive personal credentials.
- **Rule-Based Matching Engine:** Transparent evaluation of state coverage, class levels, social category, family income ceilings, and special qualifications.
- **Bilingual Interface:** Instant seamless switching between **English** and **Telugu (తెలుగు)**.
- **Interactive Scheme-Specific Checklists:** Local tracking of required certificates with persistent checkboxes (`localStorage`).
- **Direct Official Links:** Safe, separate links to official scheme information pages and verified government application portals (`scholarships.gov.in`, `telanganaepass.cgg.gov.in`, `jnanabhumi.ap.gov.in`).
- **Demo Profiles:** Quick one-click testing profiles for evaluators, faculty, and community workers.

---

## 2. Technology Stack

Built strictly to be lightweight, zero-dependency, and accessible on any device:
- **HTML5:** Semantic, accessible markup with proper headings and ARIA attributes.
- **CSS3:** Custom responsive education design system (Navy `#0A2540`, Royal Blue `#1E40AF`, White, and Teal `#0D9488`). No heavy CSS frameworks.
- **Vanilla JavaScript (ES6+):** Pure client-side logic for the matching engine, state management, modal dialogs, and bilingual dictionary.
- **Local Storage:** Client-side persistence for bookmarks and document checklist progress without external database dependencies.
- **JSON:** Structured datasets for verified government scholarship schemes and sample demonstration student profiles.

---

## 3. Project Directory Structure (Multi-Page Architecture)

```
scholar-gate/
├── index.html               # Home landing page: Hero, How It Works, Featured Flagships, Regional Portals
├── find-scholarships.html   # Dedicated 3-Step Student Eligibility Checker Wizard
├── scholarships.html        # Comprehensive Scholarship Catalog & Filter/Search Engine
├── saved.html               # Saved Scholarships & Document Checklist Tracker
├── faq.html                 # Comprehensive 18-Topic FAQ & Official Helplines Directory
├── about.html               # Community Service Project (CSP) Mission & Team Roles
├── css/
│   └── styles.css           # Premium education design system (Navy #0A2540, Royal Blue #1E40AF, Teal #0D9488)
├── js/
│   ├── app.js               # Multi-page controller, cross-page state, real-time matching & FAQ filter
│   ├── data.js              # Embedded dataset fallback & async loader
│   ├── matching.js          # Deterministic eligibility rule engine & match evaluation
│   ├── storage.js           # LocalStorage client-side persistence (bookmarks & checklist state)
│   └── translations.js      # Centralized English / Telugu (తెలుగు) bilingual dictionary
├── data/
│   ├── scholarships.json    # 10 verified government scholarship scheme records
│   └── demo-profiles.json   # 5 sample test profiles (Profiles A–E)
├── scripts/
│   └── validate_multipage.js# Automated validation script verifying all 6 pages
├── scholar-gate-mvp.zip     # Portable project distribution bundle
└── README.md                # Project documentation & presentation guide
```

---

## 4. How to Run Locally

Because the portal fetches external JSON files (`data/scholarships.json` and `data/demo-profiles.json`), modern web browsers enforce security restrictions (CORS) when opening HTML directly via `file:///`. *Note: Even if opened via `file:///`, SCHOLAR GATE includes built-in fallback data in `js/data.js` so it still operates!*

For the best experience, run a local development server using any of the following standard commands:

### Option A: Using Python 3 (Recommended)
Open your terminal or command prompt in the `scholar-gate` folder and run:
```bash
python -m http.server 8000
```
Then open your browser and navigate to:
```
http://localhost:8000
```

### Option B: Using Node.js / npx
```bash
npx serve .
```

### Option C: VS Code Live Server
Right-click on `index.html` in VS Code and select **"Open with Live Server"**.

---

## 5. Verified Government Schemes Included in MVP

1. **National Means-cum-Merit Scholarship Scheme (NMMSS)**
   - *Authority:* Department of School Education and Literacy, Ministry of Education, GoI.
   - *Classes:* 8 (selection exam), 9–12 (scholarship payout).
   - *Income Ceiling:* ₹3,50,000/year.
   - *Benefit:* ₹12,000/year (₹1,000/month).
   - *Official Portal:* `scholarships.gov.in` & `dsel.education.gov.in`

2. **PM YASASVI Pre-Matric Scholarship for OBC, EBC & DNT Students**
   - *Authority:* Ministry of Social Justice and Empowerment, GoI.
   - *Classes:* 9 & 10.
   - *Income Ceiling:* ₹2,50,000/year.
   - *Benefit:* ₹4,000/year.
   - *Official Portal:* `scholarships.gov.in`

3. **Pre-Matric Scholarship for Students with Disabilities**
   - *Authority:* Department of Empowerment of Persons with Disabilities, MoSJE, GoI.
   - *Classes:* 9 & 10.
   - *Income Ceiling:* ₹2,50,000/year.
   - *Disability Criteria:* 40%+ benchmark disability (UDID).
   - *Benefit:* Maintenance allowance + ₹1,000 book grant + ₹2,000–₹4,000 disability allowance.
   - *Official Portal:* `scholarships.gov.in` & `depwd.gov.in`

4. **Financial Assistance for Education to Wards of Beedi/Cine/IOMC/LSDM Workers (Pre-Matric)**
   - *Authority:* Labour Welfare Organization, Ministry of Labour and Employment, GoI.
   - *Classes:* 1 to 10.
   - *Income Ceiling:* Monthly wages <= ₹10,000 (Beedi) or ₹8,000 (Cine).
   - *Benefit:* ₹1,000 to ₹2,000/year.
   - *Official Portal:* `scholarships.gov.in` & `labour.gov.in`

5. **Centrally Sponsored Pre-Matric Scholarship for Scheduled Caste (SC) Students**
   - *Authority:* Ministry of Social Justice and Empowerment, GoI.
   - *Classes:* 9 & 10.
   - *Income Ceiling:* ₹2,50,000/year.
   - *Benefit:* ₹3,500/year (Day Scholars) / ₹7,000/year (Hostellers).

6. **Centrally Sponsored Pre-Matric Scholarship for Scheduled Tribe (ST) Students**
   - *Authority:* Ministry of Tribal Affairs, GoI.
   - *Classes:* 9 & 10.
   - *Income Ceiling:* ₹2,50,000/year.
   - *Benefit:* ₹3,500/year (Day Scholars) / ₹7,000/year (Hostellers).

7. **Telangana ePASS Pre-Matric Scholarship for SC/ST/BC/Disabled Students**
   - *Authority:* Welfare Departments, Government of Telangana.
   - *Classes:* 5 to 10.
   - *Income Ceiling:* SC/ST <= ₹2 Lakhs; BC Rural <= ₹1.5 Lakhs, Urban <= ₹2 Lakhs.
   - *Benefit:* ₹1,000 to ₹3,500/year.
   - *Official Portal:* `telanganaepass.cgg.gov.in`

8. **Andhra Pradesh JnanaBhumi Pre-Matric Scholarship for SC/ST/BC/Minorities**
   - *Authority:* Social Welfare / Tribal Welfare / BC Welfare Depts, Government of Andhra Pradesh.
   - *Classes:* 5 to 10.
   - *Income Ceiling:* ₹2,50,000/year (Rice card holder).
   - *Benefit:* ₹1,000 to ₹3,500/year.
   - *Official Portal:* `jnanabhumi.ap.gov.in`

9. **Begum Hazrat Mahal National Scholarship for Minority Girl Students**
   - *Authority:* Ministry of Minority Affairs / Maulana Azad Education Foundation, GoI.
   - *Classes:* 9 to 12.
   - *Income Ceiling:* ₹2,00,000/year.
   - *Benefit:* ₹5,000 to ₹6,000/year.

10. **PM YASASVI Top Class School Education for OBC, EBC and DNT Students**
    - *Authority:* Ministry of Social Justice and Empowerment, GoI.
    - *Classes:* 9 & 11 in shortlisted top schools.
    - *Income Ceiling:* ₹2,50,000/year.
    - *Benefit:* Full tuition reimbursement up to ₹75,000/year.

---

## 6. How to Test with Demonstration Profiles

Click the quick-select chips at the top of the portal to immediately evaluate the system:

- **Profile A — Rural student in Andhra Pradesh (Kavitha R.):**  
  *Class 8, SC, Govt School, Income Below ₹1 Lakh.*  
  *Expected Result:* Matches AP JnanaBhumi Pre-Matric (Classes 5–10) and flags NMMSS (Class 8 exam preparation stage).
- **Profile B — Student in Telangana (Raju Naik):**  
  *Class 10, ST, Govt-Aided School, Income ₹1L–₹2.5L.*  
  *Expected Result:* Matches Telangana ePASS Pre-Matric (Class 10) and Central ST Pre-Matric.
- **Profile C — Student with a disability (Ananya Sharma):**  
  *Class 9, Recognized Private School, Disability Yes (UDID), Income ₹1L–₹2.5L.*  
  *Expected Result:* Potential Match for DEPwD Pre-Matric Scholarship for Students with Disabilities.
- **Profile D — Parent in an eligible occupation (Mahesh B.):**  
  *Class 7, OBC/BC, Govt School, Beedi Worker Parent.*  
  *Expected Result:* Matches Ministry of Labour Beedi Worker Pre-Matric Education Assistance and Telangana ePASS Pre-Matric (Class 7).
- **Profile E — General category with higher income (Siddharth V.):**  
  *Class 11, General, Recognized Private School, Income Above ₹3.5 Lakhs.*  
  *Expected Result:* Clearly marks welfare and income-capped pre-matric schemes as "Not Currently Matched" with transparent explanation of income cap and class restrictions.

---

## 7. Testing Checklist & QA Validation

| # | Test Scenario | Steps to Perform | Expected Outcome | Status |
|---|---|---|---|---|
| 1 | Exact Mandatory Match | Load Profile B (Telangana, Class 10, ST, Govt-aided) | Shows "Potential Match" for TS ePASS Pre-Matric and Central ST Pre-Matric with 90%+ match score. | Verified |
| 2 | Mandatory Rule Conflict | Select Class 4 for NMMSS (requires Class 8–12) | Marked as "Not Currently Matched" with explanation: Class Conflict. | Verified |
| 3 | Unknown Family Income | Select "Not sure" for income range | Marked as "Needs Verification"; guidance displays scheme maximum limit (₹2.5L / ₹3.5L). | Verified |
| 4 | Sensitive Category Skipped | Select "Prefer not to say" for social category | Does NOT disqualify immediately; marks category as "Needs Verification". | Verified |
| 5 | State Specific Restriction | Select Telangana student for AP JnanaBhumi | AP JnanaBhumi marked as "Not Currently Matched" due to state domicile restriction. | Verified |
| 6 | Unverified Deadline Handling | View any scheme card | Displays "Check official portal" or verified guidance; never displays fake or fabricated closing dates. | Verified |
| 7 | Application Status Check | View any scheme card | Shows "Check official portal" rather than falsely assuming scheme is active. | Verified |
| 8 | Class Range Filtering | Select Class 7 filter in results bar | Only shows schemes covering Class 7 (Beedi workers, AP/TS pre-matric); filters out secondary-only schemes. | Verified |
| 9 | Bookmark Persistence | Click Bookmark button on any card, refresh page | Card remains highlighted; appears in "Saved Scholarships" section; badge counter reflects count. | Verified |
| 10| Checklist State Persistence | Open details modal, check 2 documents, close and reopen | Checkbox ticks are preserved via `localStorage`; line-through styling active. | Verified |
| 11| Bilingual Telugu Toggle | Click "తెలుగు" button in header | Navigation, form labels, helper tooltips, status badges, FAQ, and footer switch seamlessly into Telugu. | Verified |
| 12| Real Official Government Links | Click "Official Portal / Apply" or "Official Scheme Info" | Safely opens legitimate `.gov.in` or `.nic.in` portal in new browser tab (`target="_blank" rel="noopener noreferrer"`). | Verified |

---

## 8. Free Static Website Deployment Guide

SCHOLAR GATE has no server or database requirements and can be deployed for free on static web hosting platforms in under 3 minutes:

### Deploying to GitHub Pages
1. Initialize git in the `scholar-gate` directory:
   ```bash
   git init
   git add .
   git commit -m "Initial release of SCHOLAR GATE MVP"
   ```
2. Create a repository on GitHub (e.g. `scholar-gate`).
3. Push to GitHub:
   ```bash
   git remote add origin https://github.com/<your-username>/scholar-gate.git
   git branch -M main
   git push -u origin main
   ```
4. In GitHub repository settings, go to **Pages** -> **Branch: main** -> **Folder: / (root)** -> Save.
5. Your portal will be live at `https://<your-username>.github.io/scholar-gate/`.

### Deploying to Netlify / Vercel
1. Drag and drop the `scholar-gate` directory onto [Netlify Drop](https://app.netlify.com/drop) or import your GitHub repository into [Vercel](https://vercel.com).
2. Deployment is instant with zero configuration.

---

## 9. Faculty & Community Presentation Script & Team Roles

### 9.1 Team Member Presentation Roles & Section Assignments
To ensure smooth coordination during viva and evaluator demonstrations, the presentation is divided into 4 focused sections:

| Presenter | Role & Focus | Key Deliverables & Speaking Points |
|---|---|---|
| **Member 1** | **Introduction & Problem Statement** | • Problem background: Dropouts after Class 8 & 10 in AP and Telangana.<br>• Information asymmetry and middleman exploitation.<br>• SCHOLAR GATE project mission and target audience. |
| **Member 2** | **Guided Wizard & Rule Matching Engine** | • Demonstration of 3-step privacy-first eligibility wizard.<br>• Testing Profile A (AP SC Rural) and Profile B (Telangana ST).<br>• Explanation of transparent rule scoring in `matching.js`. |
| **Member 3** | **Interactive Checklists & Official Portals** | • Interactive document checklist with `localStorage` persistence.<br>• Bookmarks functionality and saved schemes badge.<br>• Direct verification links to `.gov.in` and `.nic.in` portals. |
| **Member 4** | **Technical Architecture, QA & Limitations** | • Lightweight zero-dependency stack (HTML5/CSS3/Vanilla JS).<br>• Client-side privacy guarantee (no backend tracking).<br>• Academic project disclaimer, limitations, and future roadmap. |

### 9.2 3-Minute Faculty Demonstration Script

> **"Respected evaluators and community mentors, good morning.**  
>
> Today, we present **SCHOLAR GATE**, a centralized Scholarship and Sponsorship Portal built for our Community Service Project (CSP).
>
> **The Problem:** In rural Andhra Pradesh and Telangana, when we surveyed students and parents, we noticed a heartbreaking pattern: many families stop schooling their children because they cannot afford exam fees, uniforms, and books. Simultaneously, central and state schemes like NMMSS and Pre-Matric welfare stipends have vacant funds because students simply did not know they qualified or were intimidated by complex application portals.
>
> **Our Solution:** We built **SCHOLAR GATE** using clean HTML5, CSS3, and JavaScript with zero backend costs or tracking.  
>
> **Let us demonstrate:**
> 1. *Language Switch:* Notice our bilingual toggle. Rural parents and students can switch the entire portal into **తెలుగు (Telugu)** with one click.
> 2. *Featured Flagship Schemes:* Right at the top, students see flagship schemes like NMMSS (₹12,000/yr), AP JnanaBhumi, and Telangana ePASS.
> 3. *Privacy Guarantee:* We never ask for Aadhaar numbers, caste certificates, or bank passwords.
> 4. *Demo Profile A:* Let us click 'Profile A: AP Rural SC'. The wizard populates Class 8, SC category, Govt School, and income under ₹1 Lakh.
> 5. *Rule-Based Engine:* Looking at the results, the system does not give random percentages. It transparently explains why AP JnanaBhumi matched, and flags that NMMSS requires sitting for the Class 8 selection test.
> 6. *Interactive Document Checklist:* When a student clicks 'View Details', they get an interactive document checklist. A student can check off their bonafide certificate and income certificate, and their progress is automatically saved to their phone's local storage.
> 7. *Official Direct Access:* Every card links directly to official government portals (`scholarships.gov.in`, `telanganaepass.cgg.gov.in`, `jnanabhumi.ap.gov.in`) with prominent disclaimers that SCHOLAR GATE is an informational guidance tool.
>
> Thank you, and we welcome your questions!"

### 9.3 Backup / Offline Demonstration Sequence
If an active internet connection is unavailable during the presentation:
1. Open the local development server URL: `http://localhost:8000` (or `index.html` directly).
2. Click **Profile B: Telangana ST (Class 10)** on the Demo Chip bar.
3. Observe instant matching against **Telangana ePASS** and **Central ST Pre-Matric**.
4. Open the modal, check off the "Bonafide Certificate", refresh the browser page, and show evaluators that the checklist tick persists in `localStorage`.
5. Click **తెలుగు (Telugu)** to show complete offline localization via `translations.js`.

---

## 10. Scope, Limitations & Future Roadmap

### Academic Limitations
- **Informational Guidance Only:** Matching results provided by SCHOLAR GATE are preliminary rule-based suggestions. The official government administering authorities and scheme nodal officers hold sole jurisdiction over final eligibility and fund disbursement.
- **Application Window Verification:** Schemes open and close based on government academic notifications. Students are instructed to verify open portal dates on official websites.
- **Client-Side Privacy:** Student data remains exclusively within the user's browser session and is never transmitted to third-party tracking servers.

### Future Roadmap
1. **SMS & WhatsApp Deadline Alerts:** Opt-in automated reminders when state portal windows (AP JnanaBhumi / TS ePASS) open for fresh registrations.
2. **Grama/Ward Sachivalayam Field Kit:** Offline PWA (Progressive Web App) mode for field volunteers visiting remote tribal hamlets.
3. **Multi-Language Expansion:** Extending localization into Urdu and Hindi for border districts.
4. **MeeSeva Certificate Helper:** Step-by-step guidance on how to obtain caste and income certificates through local citizen service centres.

---

## 11. Master Project Evaluation Checklist (Verified)

All 9 requirement sections are verified and complete:

### 1. Home page and UI design
- [x] Project name and logo: SCHOLAR GATE
- [x] Home page clearly explains the project's purpose
- [x] Navigation links work correctly (`#home`, `#featured`, `#find`, `#results`, `#saved`, `#faq`)
- [x] Find My Scholarships button opens the student form and focuses the first input
- [x] Search bar and featured scholarship section display correctly
- [x] Design works on mobile, tablet, and desktop
- [x] Text is readable and buttons have clear labels
- [x] Footer includes official resources and disclaimer

### 2. Student profile and eligibility form
- [x] State selection: Andhra Pradesh, Telangana, other
- [x] Class selection: Class 1–12
- [x] Category selection includes relevant categories and Prefer not to say
- [x] Annual family income selection and Not sure option
- [x] School type selection (Government, Govt-aided, Private, Not sure)
- [x] Optional disability eligibility field (40%+ with UDID)
- [x] Parent/guardian occupation field for relevant schemes (Beedi, Mine, Cine)
- [x] Form validation and helpful bilingual error messages
- [x] Back, Continue, Reset, and Find Scholarships buttons work
- [x] No unnecessary sensitive information is collected

### 3. Scholarship database and official sources
- [x] 10 verified scholarship records are included (Central, AP, TS)
- [x] Scholarship names and administering departments are accurate
- [x] Eligible classes and state coverage are checked
- [x] Income limits, category rules, and school conditions are verified
- [x] Benefit amounts are verified or marked with official portal guidance
- [x] Every scheme has an official information source URL
- [x] Official application links point to the correct government portal
- [x] Application deadlines and open/closed status are verified with transparent notes
- [x] Last-verified date is displayed on every card modal (2026-03-15)
- [x] Unverified details are clearly labelled rather than invented

### 4. Matching and eligibility logic
- [x] Matching responds to the selected student profile
- [x] Class requirements are checked
- [x] State and national coverage are checked
- [x] Category and income conditions are checked where applicable
- [x] School type, disability, and occupation rules are checked where applicable
- [x] Unknown answers produce Needs verification when relevant
- [x] Mismatched mandatory criteria are explained in red bullet points
- [x] Each result explains why it matched or needs verification
- [x] Results never guarantee a scholarship award (prominent disclaimer banner)
- [x] Search and filters return appropriate results

### 5. Scholarship results and details
- [x] Results appear as readable scholarship cards
- [x] Cards show class range and beneficiary group
- [x] Benefits and income limits show only verified information
- [x] Application status distinguishes Open, Closed, and Check official portal with colored status pills
- [x] View Details opens the correct scheme details modal
- [x] Required documents are shown for each scheme
- [x] How to Apply steps are clear and numbered
- [x] Official information and application links are separate
- [x] External links open safely in a new tab (`target="_blank" rel="noopener noreferrer"`)
- [x] Empty results show a helpful message and Clear Filters button

### 6. Document checklist and bookmarks
- [x] Each scheme has a relevant document checklist
- [x] Students can tick and untick checklist items
- [x] Checklist progress persists after refresh via `localStorage`
- [x] Reset checklist works
- [x] Students can save scholarships (bookmark icon)
- [x] Students can remove saved scholarships
- [x] Saved scholarships persist after refresh
- [x] Empty saved-scholarship section shows descriptive empty state
- [x] No actual certificates or sensitive identifiers are uploaded

### 7. Language, FAQ, and accessibility
- [x] English/Telugu toggle works instantly
- [x] Main navigation, form labels, and messages change language
- [x] FAQ search works in real-time
- [x] FAQ answers are clear and factual
- [x] Labels are visible and inputs are easy to use
- [x] Buttons work using keyboard navigation (Tab, Enter, ESC to close modals)
- [x] Text contrast and font size are readable (WCAG AA compliant)
- [x] Layout works on a small mobile screen (responsive single-column layout)

### 8. Demo data and project setup
- [x] 5 fictional demo profiles are available (Profiles A–E)
- [x] Try Demo loads the selected profile correctly
- [x] Different profiles produce different matching results where expected
- [x] Demo data is clearly labelled fictional/demonstration
- [x] Project runs using the README instructions (`python -m http.server 8000`)
- [x] All required files are present
- [x] No essential feature is left as a placeholder
- [x] No paid API key or external database is required
- [x] A fresh page load does not produce critical console errors

### 9. Final presentation readiness
- [x] Project problem statement and objectives are ready
- [x] A complete student journey can be demonstrated
- [x] At least three different student profiles have been tested (Profiles A, B, and E)
- [x] Official application links have been clicked and checked
- [x] Limitations and future improvements are documented
- [x] Project clearly states it is an informational student project
- [x] Backup demo and test profiles are prepared
- [x] Team members know their assigned presentation sections
