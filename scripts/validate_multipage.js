const fs = require('fs');
const path = require('path');

const pages = [
  'index.html',
  'find-scholarships.html',
  'scholarships.html',
  'saved.html',
  'faq.html',
  'about.html'
];

const requiredNavLinks = [
  'index.html',
  'find-scholarships.html',
  'scholarships.html',
  'saved.html',
  'faq.html',
  'about.html'
];

let allPassed = true;

pages.forEach(page => {
  const filePath = path.join(__dirname, '..', page);
  if (!fs.existsSync(filePath)) {
    console.error('MISSING FILE:', page);
    allPassed = false;
    return;
  }
  const html = fs.readFileSync(filePath, 'utf8');

  // Check required nav links
  requiredNavLinks.forEach(link => {
    if (!html.includes(`href="${link}"`)) {
      console.error(`${page} missing nav link to ${link}`);
      allPassed = false;
    }
  });

  // Check script tags
  ['js/data.js', 'js/storage.js', 'js/translations.js', 'js/matching.js', 'js/app.js'].forEach(scr => {
    if (!html.includes(`src="${scr}"`)) {
      console.error(`${page} missing script tag for ${scr}`);
      allPassed = false;
    }
  });

  // Check CSS
  if (!html.includes('href="css/styles.css"')) {
    console.error(`${page} missing css/styles.css`);
    allPassed = false;
  }

  console.log(`PASS: ${page} (${html.length} chars) - Navigation & Assets intact`);
});

if (allPassed) {
  console.log('\nSUCCESS: ALL 6 PAGES FULLY VALIDATED!');
  process.exit(0);
} else {
  console.error('\nFAILURE: Some validation checks failed.');
  process.exit(1);
}
