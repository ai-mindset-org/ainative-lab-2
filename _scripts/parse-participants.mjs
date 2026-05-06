import { readFileSync, writeFileSync } from 'fs';

const csvPath = '/Users/alex/Downloads/1 AI Mindset participations_exported_1 (4).csv';
const outPath = '/Users/alex/Documents/_code/_dashboards/ainative-knowledge-graph/data/participants.json';

const raw = readFileSync(csvPath, 'utf-8');

// RFC 4180-compliant CSV parser for multiline quoted fields
function parseCSV(text) {
  const rows = [];
  let i = 0;
  const len = text.length;

  function parseField() {
    if (i >= len) return '';
    if (text[i] === '"') {
      // Quoted field — may contain newlines, commas, escaped quotes
      i++; // skip opening quote
      let val = '';
      while (i < len) {
        if (text[i] === '"') {
          if (i + 1 < len && text[i + 1] === '"') {
            val += '"';
            i += 2;
          } else {
            i++; // skip closing quote
            break;
          }
        } else {
          val += text[i];
          i++;
        }
      }
      return val;
    } else {
      // Unquoted field
      let val = '';
      while (i < len && text[i] !== ',' && text[i] !== '\n' && text[i] !== '\r') {
        val += text[i];
        i++;
      }
      return val;
    }
  }

  while (i < len) {
    const row = [];
    while (true) {
      row.push(parseField());
      if (i < len && text[i] === ',') {
        i++; // skip comma
        continue;
      }
      // End of row
      if (i < len && text[i] === '\r') i++;
      if (i < len && text[i] === '\n') i++;
      break;
    }
    rows.push(row);
  }
  return rows;
}

const rows = parseCSV(raw);
const header = rows[0];
console.log('Header:', header);
console.log('Total rows (incl header):', rows.length);

// Build column index
const colIdx = {};
header.forEach((h, idx) => { colIdx[h.trim()] = idx; });

// Filter s2 rows
const s2Rows = rows.slice(1).filter(r => {
  const lab = (r[colIdx['lab']] || '').trim();
  return lab === 's 2';
});
console.log('S2 rows:', s2Rows.length);

// Clean Q field — remove prefix like "Текущий фокус\n\n", "Опыт AI\n\n", "зачем лаба?\n\n", "локация\n\n"
function cleanQ(val) {
  if (!val) return '';
  let cleaned = val.trim();
  // Remove known prefixes (case-insensitive, with optional trailing newlines)
  const prefixes = [
    /^Текущий фокус\s*/i,
    /^Опыт AI\s*/i,
    /^зачем лаба\??\s*/i,
    /^локация\s*/i,
  ];
  for (const p of prefixes) {
    cleaned = cleaned.replace(p, '');
  }
  return cleaned.trim();
}

// Truncate to max chars, break at word boundary
function truncate(str, max) {
  if (!str || str.length <= max) return str;
  const cut = str.slice(0, max);
  const lastSpace = cut.lastIndexOf(' ');
  return (lastSpace > max * 0.5 ? cut.slice(0, lastSpace) : cut) + '...';
}

// Parse each row
const participants = s2Rows.map(r => {
  const get = (col) => (r[colIdx[col]] || '').trim();
  return {
    tg_name: get('tg_name'),
    tg_username: get('tg_username'),
    tg_id: get('tg_id'),
    created_at: get('created_at'),
    updated_at: get('updated_at'),
    q1: cleanQ(get('q1')),
    q2: cleanQ(get('q2')),
    q3: cleanQ(get('q3')),
    q4: cleanQ(get('q4')),
    status: get('status'),
    is_adv: get('is_adv'),
    buddy: get('buddy'),
  };
});

// Deduplicate by tg_username — keep latest updated_at (or created_at if no updated_at)
const byUsername = new Map();
for (const p of participants) {
  const key = p.tg_username.toLowerCase();

  // Skip test accounts
  if (key === 'deleted_test') continue;
  if (p.tg_id === '0' && (!p.tg_name || p.tg_name.length < 3)) continue;
  // Skip entries with tg_id=0 that are duplicates (expert entries)
  if (p.tg_id === '0') continue;

  const existing = byUsername.get(key);
  if (!existing) {
    byUsername.set(key, p);
  } else {
    // Compare dates — prefer the one with more data (updated_at or later created_at)
    const existDate = existing.updated_at || existing.created_at;
    const newDate = p.updated_at || p.created_at;
    if (newDate > existDate) {
      // Merge: keep newer but fill in missing q fields from older
      const merged = { ...p };
      if (!merged.q1 && existing.q1) merged.q1 = existing.q1;
      if (!merged.q2 && existing.q2) merged.q2 = existing.q2;
      if (!merged.q3 && existing.q3) merged.q3 = existing.q3;
      if (!merged.q4 && existing.q4) merged.q4 = existing.q4;
      if (!merged.buddy && existing.buddy) merged.buddy = existing.buddy;
      byUsername.set(key, merged);
    } else {
      // Keep existing but fill missing fields from new
      if (!existing.q1 && p.q1) existing.q1 = p.q1;
      if (!existing.q2 && p.q2) existing.q2 = p.q2;
      if (!existing.q3 && p.q3) existing.q3 = p.q3;
      if (!existing.q4 && p.q4) existing.q4 = p.q4;
      if (!existing.buddy && p.buddy) existing.buddy = p.buddy;
    }
  }
}

console.log('After dedup:', byUsername.size);

// Build output
const output = [];
for (const [, p] of byUsername) {
  // Clean buddy field — remove leading ' and @
  let buddy = p.buddy || '';
  buddy = buddy.replace(/^'+/, '').replace(/^@/, '').trim();
  if (buddy) buddy = '@' + buddy;

  const isAdv = p.is_adv === 'true';

  output.push({
    name: p.tg_name.trim(),
    username: p.tg_username,
    focus: truncate(p.q1, 100) || null,
    location: p.q4 || null,
    isAdvanced: isAdv,
    buddy: buddy || null,
  });
}

// Sort by name
output.sort((a, b) => a.name.localeCompare(b.name));

const meta = {
  total: output.length,
  advanced: output.filter(p => p.isAdvanced).length,
  withBuddy: output.filter(p => p.buddy).length,
};

const result = { participants: output, meta };

writeFileSync(outPath, JSON.stringify(result, null, 2), 'utf-8');
console.log('\nWritten to:', outPath);
console.log('Meta:', JSON.stringify(meta, null, 2));

// Print first 3 for verification
console.log('\nSample participants:');
output.slice(0, 3).forEach(p => console.log(JSON.stringify(p, null, 2)));
