const fs = require('fs');
const readline = require('readline');

const stream = fs.createReadStream('C:\\Users\\saipr\\.gemini\\antigravity-ide\\brain\\842ecdb4-5040-4f01-b287-c2e2a7bcae74\\.system_generated\\logs\\transcript_full.jsonl');
const rl = readline.createInterface({ input: stream });

fs.mkdirSync('scratch', { recursive: true });

let singlePageParts = [];

rl.on('line', (line) => {
  try {
    const obj = JSON.parse(line);
    if ([211, 213, 215, 217, 219].includes(obj.step_index)) {
      singlePageParts.push({ step: obj.step_index, content: obj.content });
    }
  } catch(e) {}
});

rl.on('close', () => {
  console.log('Found single-page parts:', singlePageParts.length);
  let full = '';
  singlePageParts.sort((a,b) => a.step - b.step).forEach(p => {
    const lines = p.content.split('\n');
    lines.forEach(l => {
      const idx = l.indexOf(': ');
      if (idx > 0) {
        const numPart = l.substring(0, idx).trim();
        if (/^\d+$/.test(numPart)) {
          full += l.substring(idx + 2) + '\n';
        }
      }
    });
  });
  fs.writeFileSync('scratch/original_single_page_index.html', full);
  console.log('Saved scratch/original_single_page_index.html (' + full.length + ' chars, ' + full.split('\n').length + ' lines)');
});
