/**
 * SCHOLAR GATE - Rule-Based Scholarship Matching Engine
 * Compares a student profile against structured eligibility rules and produces
 * transparent, rule-grounded match evaluations with detailed explanations.
 */

const MatchStatus = {
  POTENTIAL_MATCH: 'potential_match',
  NEEDS_VERIFICATION: 'needs_verification',
  NOT_MATCHED: 'not_matched'
};

const MatchingEngine = {
  /**
   * Evaluates a single scholarship against a student profile
   * @param {object} scholarship 
   * @param {object} profile 
   * @returns {object} Evaluation result
   */
  evaluate(scholarship, profile) {
    if (!profile) {
      return {
        scholarshipId: scholarship.id,
        status: MatchStatus.NEEDS_VERIFICATION,
        score: 50,
        explanation: "Enter your student profile to view personalized eligibility analysis.",
        matchedCriteria: [],
        unmatchedCriteria: [],
        verificationItems: ["Complete student profile required to verify eligibility."]
      };
    }

    const matchedCriteria = [];
    const unmatchedCriteria = [];
    const verificationItems = [];

    let scorePoints = 0;
    const maxScore = 100;

    // 1. STATE COVERAGE (Weight: 20 pts)
    const sCoverage = (scholarship.coverage || '').toLowerCase();
    const pState = (profile.state || '').trim();

    if (sCoverage === 'all india') {
      matchedCriteria.push(`State Eligibility: Scheme is available nationwide (All India), including ${pState || 'your state'}.`);
      scorePoints += 20;
    } else if (pState) {
      if (sCoverage.includes(pState.toLowerCase())) {
        matchedCriteria.push(`State Eligibility: Fully matches ${pState} state-specific domicile guidelines.`);
        scorePoints += 20;
      } else {
        unmatchedCriteria.push(`State Mismatch: Scheme is exclusively for students in ${scholarship.coverage}, but your profile lists ${pState}.`);
      }
    } else {
      verificationItems.push("State not provided in profile; verify domicile rules.");
      scorePoints += 10;
    }

    // 2. CURRENT CLASS (Weight: 25 pts)
    const studentClass = profile.currentClass ? parseInt(profile.currentClass, 10) : null;
    const eligibleClasses = scholarship.eligibleClasses || [];

    if (studentClass !== null && !isNaN(studentClass)) {
      if (eligibleClasses.includes(studentClass)) {
        if (scholarship.id === 'nmmss' && studentClass === 8) {
          matchedCriteria.push("Class Stage: In Class 8, you are at the exact stage to write the State NMMS Selection Exam to qualify for Class 9–12 scholarship.");
        } else {
          matchedCriteria.push(`Class Eligibility: Class ${studentClass} is within the eligible range (Classes ${eligibleClasses[0]} to ${eligibleClasses[eligibleClasses.length - 1]}).`);
        }
        scorePoints += 25;
      } else {
        unmatchedCriteria.push(`Class Conflict: Scheme covers Class ${eligibleClasses.join(', ')}, but you selected Class ${studentClass}.`);
      }
    } else {
      verificationItems.push("Current class is unverified; check scheme class range.");
      scorePoints += 10;
    }

    // 3. SOCIAL CATEGORY (Weight: 20 pts)
    const pCategory = (profile.socialCategory || '').trim();
    const sCategories = scholarship.categories || [];

    if (pCategory === 'Prefer not to say' || !pCategory) {
      verificationItems.push("Social Category is unspecified; verify if your community is eligible under official department guidelines.");
      scorePoints += 10;
    } else if (sCategories.length === 0 || sCategories.includes('General')) {
      matchedCriteria.push(`Social Category: Open to all social groups including ${pCategory}.`);
      scorePoints += 20;
    } else {
      let isCategoryMatch = false;

      if (pCategory === 'SC' && sCategories.includes('SC')) isCategoryMatch = true;
      else if (pCategory === 'ST' && sCategories.includes('ST')) isCategoryMatch = true;
      else if ((pCategory === 'OBC/BC' || pCategory === 'OBC' || pCategory === 'BC') && (sCategories.includes('OBC') || sCategories.includes('BC'))) isCategoryMatch = true;
      else if ((pCategory === 'EBC or another eligible category' || pCategory === 'EBC') && (sCategories.includes('EBC') || sCategories.includes('DNT') || sCategories.includes('BC'))) isCategoryMatch = true;
      else if (pCategory === 'Minority' && sCategories.includes('Minority')) isCategoryMatch = true;

      if (isCategoryMatch) {
        matchedCriteria.push(`Social Category: Matches the eligible target beneficiary group (${pCategory}).`);
        scorePoints += 20;
      } else {
        unmatchedCriteria.push(`Category Ineligibility: Scheme is restricted to ${sCategories.join(', ')} categories, whereas you indicated ${pCategory}.`);
      }
    }

    // 4. FAMILY INCOME (Weight: 20 pts)
    const pIncome = (profile.familyIncome || '').trim();
    const incomeLimit = scholarship.incomeLimitINR;

    if (!incomeLimit) {
      matchedCriteria.push("Family Income: No specific parental income ceiling prescribed for this scheme.");
      scorePoints += 20;
    } else if (pIncome === 'Not sure' || !pIncome) {
      verificationItems.push(`Income Unverified: Scheme has a maximum ceiling of ₹${incomeLimit.toLocaleString('en-IN')}/year. Please check your family income certificate.`);
      scorePoints += 10;
    } else if (pIncome === 'Below ₹1 lakh') {
      matchedCriteria.push(`Family Income: Below ₹1 Lakh is comfortably within the scheme's limit of ₹${incomeLimit.toLocaleString('en-IN')}/year.`);
      scorePoints += 20;
    } else if (pIncome === '₹1 lakh–₹2.5 lakh') {
      if (incomeLimit >= 250000) {
        matchedCriteria.push(`Family Income: Your ₹1L–₹2.5L range satisfies the maximum ceiling of ₹${incomeLimit.toLocaleString('en-IN')}/year.`);
        scorePoints += 20;
      } else if (incomeLimit >= 200000) {
        verificationItems.push(`Income Borderline: Scheme limit is ₹${incomeLimit.toLocaleString('en-IN')}/year (e.g. ₹2.0L for SC/ST or urban BC); confirm your MeeSeva income certificate.`);
        scorePoints += 12;
      } else {
        unmatchedCriteria.push(`Income Limit Exceeded: Scheme requires annual family income <= ₹${incomeLimit.toLocaleString('en-IN')}, which is below ₹1L–₹2.5L.`);
      }
    } else if (pIncome === '₹2.5 lakh–₹3.5 lakh') {
      if (incomeLimit >= 350000) {
        matchedCriteria.push(`Family Income: Your income range meets the scheme's ₹${incomeLimit.toLocaleString('en-IN')}/year limit.`);
        scorePoints += 20;
      } else {
        unmatchedCriteria.push(`Income Limit Exceeded: Scheme ceiling is ₹${incomeLimit.toLocaleString('en-IN')}/year; your selected bracket exceeds this.`);
      }
    } else if (pIncome === 'Above ₹3.5 lakh') {
      unmatchedCriteria.push(`Income Limit Exceeded: Annual family income above ₹3.5 Lakhs exceeds the scheme's cap of ₹${incomeLimit.toLocaleString('en-IN')}/year.`);
    }

    // 5. SCHOOL TYPE (Weight: 10 pts)
    const pSchool = (profile.schoolType || '').trim();
    const sSchoolTypes = scholarship.schoolTypes || [];

    if (pSchool === 'Not sure' || !pSchool) {
      verificationItems.push("School Type: Institution type is unverified; ensure your school is recognized under the relevant board/directorate.");
      scorePoints += 5;
    } else if (sSchoolTypes.length === 0 || sSchoolTypes.includes(pSchool)) {
      matchedCriteria.push(`School Type: ${pSchool} is an approved institution type.`);
      scorePoints += 10;
    } else {
      // Check if government or government-aided is required and student is in recognized private
      if (pSchool === 'Recognized private school' && !sSchoolTypes.includes('Recognized private school')) {
        unmatchedCriteria.push(`School Type Restriction: Scheme requires studying in a Government, Aided, or Local Body school. Private schools are excluded.`);
      } else {
        verificationItems.push(`School Affiliation: Confirm your school type (${pSchool}) is registered on the portal.`);
        scorePoints += 5;
      }
    }

    // 6. DISABILITY CRITERIA (Weight: 5 pts)
    const pDisability = (profile.hasDisability || '').trim();
    const sDisability = scholarship.disabilityCriteria;

    if (sDisability) {
      if (pDisability === 'Yes') {
        matchedCriteria.push("Disability Support: Matches scheme dedicated for students with benchmark disability (40%+ with UDID).");
        scorePoints += 5;
      } else if (pDisability === 'Prefer not to say') {
        verificationItems.push("Disability Status: Scheme requires 40%+ benchmark disability; verify UDID certificate.");
        scorePoints += 2;
      } else {
        unmatchedCriteria.push("Disability Requirement: This specific scheme is strictly reserved for students with benchmark disabilities.");
      }
    } else {
      scorePoints += 5;
    }

    // 7. OCCUPATION CRITERIA
    const pOccupation = (profile.parentOccupation || '').trim();
    const sOccupation = scholarship.occupationCriteria;

    if (sOccupation) {
      if (pOccupation === 'Beedi worker' || pOccupation === 'Eligible mine worker' || pOccupation === 'Cine worker') {
        matchedCriteria.push(`Parent Occupation: Parent's work as ${pOccupation} qualifies for Labour Welfare Ministry assistance.`);
      } else if (pOccupation === 'Not sure') {
        verificationItems.push("Parent Occupation: Unverified; parent must have a registered Beedi/Cine/Mine worker identification card.");
      } else {
        unmatchedCriteria.push("Parent Occupation: Scheme is exclusively for children of registered Beedi, Cine, or specified Mine workers.");
      }
    }

    // 8. SPECIAL SCHEME CONDITIONS & GENERAL VERIFICATIONS
    if (scholarship.id === 'nmmss') {
      verificationItems.push("Selection Exam: Requires appearing for and clearing the State NMMS (MAT & SAT) examination with qualifying marks.");
    }
    if (scholarship.id === 'yasasvi_topclass') {
      verificationItems.push("Top School List: Requires being enrolled in an officially designated MoSJE Top-Class school.");
    }
    if (scholarship.id === 'begum_hazrat_mahal') {
      verificationItems.push("Academic Record: Requires minimum 50% marks in the previous class and is for girl students.");
    }

    // Verification of active portal application window (universal note)
    verificationItems.push("Application Window: Must be verified on the official portal for current academic year open dates.");

    // DETERMINE OVERALL STATUS
    let status;
    let finalScore;
    let explanation;

    if (unmatchedCriteria.length > 0) {
      status = MatchStatus.NOT_MATCHED;
      // Approximate score capped low
      finalScore = Math.min(38, Math.max(15, Math.round((scorePoints / maxScore) * 40)));
      explanation = `Did not match ${unmatchedCriteria.length} mandatory requirement(s): ${unmatchedCriteria[0]}`;
    } else if (verificationItems.length > 0 && (
      pIncome === 'Not sure' ||
      pCategory === 'Prefer not to say' ||
      pSchool === 'Not sure' ||
      scholarship.id === 'nmmss' ||
      scholarship.id === 'yasasvi_topclass'
    )) {
      status = MatchStatus.NEEDS_VERIFICATION;
      finalScore = Math.min(84, Math.max(65, Math.round(scorePoints * 0.85)));
      explanation = "Your core class and profile show potential relevance. Verify the items listed below on the official portal before applying.";
    } else {
      status = MatchStatus.POTENTIAL_MATCH;
      finalScore = Math.min(98, Math.max(88, Math.round(scorePoints * 0.96)));
      explanation = "All known mandatory criteria entered in your profile appear to match. Please verify the official application portal dates.";
    }

    return {
      scholarshipId: scholarship.id,
      status,
      score: finalScore,
      explanation,
      matchedCriteria,
      unmatchedCriteria,
      verificationItems
    };
  },

  /**
   * Matches all scholarships against a student profile
   * @param {Array} scholarships 
   * @param {object} profile 
   * @returns {Array} List of evaluated scholarships
   */
  matchAll(scholarships, profile) {
    if (!Array.isArray(scholarships)) return [];
    return scholarships.map(scheme => {
      const evaluation = this.evaluate(scheme, profile);
      return {
        ...scheme,
        matchResult: evaluation
      };
    });
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { MatchStatus, MatchingEngine };
}
