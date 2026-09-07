const fs = require('fs');
const path = require('path');

const SOURCE_BASE = 'C:/igcg-website/old/Hinario_Online';
const OUTPUT_DATA_JSON = path.join(__dirname, '../data/hinosData.json');

function cleanHtml(s) {
  if (!s) return '';
  return s
    .replace(/&nbsp;/g, ' ')
    .replace(/&iacute;/g, 'í')
    .replace(/&Iacute;/g, 'Í')
    .replace(/&ccedil;/g, 'ç')
    .replace(/&Ccedil;/g, 'Ç')
    .replace(/&atilde;/g, 'ã')
    .replace(/&Atilde;/g, 'Ã')
    .replace(/&eacute;/g, 'é')
    .replace(/&Eacute;/g, 'É')
    .replace(/&oacute;/g, 'ó')
    .replace(/&Oacute;/g, 'Ó')
    .replace(/&uacute;/g, 'ú')
    .replace(/&Uacute;/g, 'Ú')
    .replace(/&acirc;/g, 'â')
    .replace(/&Acirc;/g, 'Â')
    .replace(/&ecirc;/g, 'ê')
    .replace(/&Ecirc;/g, 'Ê')
    .replace(/&ocirc;/g, 'ô')
    .replace(/&Ocirc;/g, 'Ô')
    .replace(/&quot;/g, '"')
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8212;/g, '—')
    .trim();
}

function parseHymnHtml(rawHtml, bookName, fileNum) {
  let title = '';

  // Special cases
  if (bookName === 'Hinos' && fileNum === 193) {
    title = 'Por Semelhança com Cristo';
  } else {
    const titM = rawHtml.match(/T(?:&iacute;|í|i)tulo:[\s\S]*?<\/td>\s*<td[^>]*>([\s\S]*?)<\/td>/i);
    if (titM) {
      title = cleanHtml(titM[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ')).trim();
    }
  }

  const m = rawHtml.match(/Letra:[\s\S]*?<td[^>]*>([\s\S]*?)<\/td>/i);
  if (!m) return null;
  let letra = m[1];

  // Remove notes and formatting spans
  letra = letra.replace(/<span style="font-size: 7pt; font-style: italic"[\s\S]*?<\/span>/gi, '');
  letra = letra.replace(/<span[^>]*>[\s\S]*?<\/span>/gi, '');
  letra = letra.replace(/<div[^>]*>/gi, '').replace(/<\/div>/gi, '');
  letra = letra.replace(/<p[^>]*>/gi, '<br><br>').replace(/<\/p>/gi, '');

  // Normalize break sequences around inline / block closing tags
  letra = letra.replace(/<br\s*\/?>\s*((?:<\/(?:b|i|strong|em|span)>\s*)+)<br\s*\/?>/gi, (m, g1) => g1 + '<br><br>');
  letra = letra.replace(/((?:<\/(?:b|i|strong|em|span)>\s*)+)(?:<br\s*\/?>\s*){2,}/gi, '$1<br><br>');

  const rawChunks = letra
    .split(/(?:\s*<br\s*\/?>\s*){2,}/i)
    .map(c => c.trim())
    .filter(Boolean);

  if (rawChunks.length === 0) return null;

  let bodyChunks = [];
  for (let i = 0; i < rawChunks.length; i++) {
    const chunk = rawChunks[i];
    const textOnly = cleanHtml(chunk.replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim();

    if (i === 0) {
      // In Hinos 261, line 1 is "261 - COMO TUDO (C-393)" and line 2 is "1 Meu Gozo é Jesus!"
      const lines = chunk.split(/<br\s*\/?>/i).map(l => l.trim()).filter(Boolean);
      if (lines.length > 2 && /^\d+\s*-\s*[A-ZÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇ\s]+/i.test(lines[0].replace(/<[^>]+>/g, ''))) {
        bodyChunks.push(lines.slice(1).join('<br>'));
        continue;
      }

      const isHeader =
        /^\d+\s*-\s*/.test(textOnly) ||
        /^S\d+\s+/.test(textOnly) ||
        /^[A-Z0-9\s\.\:\,\;\-\(\)]+$/.test(textOnly) ||
        textOnly.toLowerCase() === title.toLowerCase() ||
        /^(?:Salmo|Cor[ií]ntios|João|Romanos|G[aá]latas|Ef[eé]sios|Filipenses|Colossenses|Hebreus|Apocalipse|Isa[ií]as|Jeremias|Mateus|Marcos|Lucas|Atos)\b/i.test(textOnly);

      if (isHeader && rawChunks.length > 1) {
        continue;
      }
    }
    bodyChunks.push(chunk);
  }

  if (!title && rawChunks.length > 0) {
    title = cleanHtml(rawChunks[0].replace(/<[^>]+>/g, '')).split(/<br>/i)[0].trim();
  }

  // Format chunks into stanzas & detect chorus
  const chunkInfos = bodyChunks.map((chunk, idx) => {
    const stripped = cleanHtml(chunk.replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim();
    const boldMatches = chunk.match(/<(?:b|strong)\b[\s\S]*?<\/(?:b|strong)>/gi);
    let boldTextLen = 0;
    if (boldMatches) {
      boldTextLen = boldMatches
        .map(b => cleanHtml(b.replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim())
        .join('').length;
    }
    const isBold = stripped.length > 0 && boldTextLen >= stripped.length * 0.6;

    const lines = chunk
      .split(/<br\s*\/?>/i)
      .map(l => cleanHtml(l.replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim())
      .filter(Boolean);

    if (lines.length > 0) {
      lines[0] = lines[0].replace(/^\d+[\.\s\-\*]+\s*/, '');
    }

    return {
      index: idx,
      isBold,
      text: lines.join('\n'),
    };
  }).filter(info => info.text.length > 0);

  const boldChunks = chunkInfos.filter(c => c.isBold);

  let coro;
  let estrofes = [];

  // Per user rule:
  // "Observa os que estão em negrito, eles são os coros. Se uma musica tiver mais de um coro, Você ignora,
  // e passa a tratar como se os coros fossem estrofes normais, dessa forma não buga nada."
  if (boldChunks.length === 1) {
    coro = boldChunks[0].text;
    estrofes = chunkInfos.filter(c => !c.isBold).map(c => c.text);
  } else {
    estrofes = chunkInfos.map(c => c.text);
  }

  return {
    id: String(fileNum),
    numero: fileNum,
    titulo: title,
    categoria: bookName,
    estrofes,
    coro,
  };
}

function run() {
  console.log('Starting Hymnal parser...');
  const collections = [
    { dir: 'Hinos', bookKey: 'hinos', bookName: 'Hinos' },
    { dir: 'Canticos', bookKey: 'canticos', bookName: 'Cânticos' },
    { dir: 'Suplementos', bookKey: 'suplemento', bookName: 'Suplemento' },
  ];

  const results = {
    hinos: {},
    canticos: {},
    suplemento: {},
    novo: {},
  };

  const report = {};

  for (const { dir, bookKey, bookName } of collections) {
    const dirPath = path.join(SOURCE_BASE, dir);
    if (!fs.existsSync(dirPath)) {
      console.error(`Directory not found: ${dirPath}`);
      continue;
    }

    const files = fs.readdirSync(dirPath);
    const ignoredV2 = [];
    const ignoredOther = [];
    const parsedHymns = [];
    const numbersFound = new Set();

    for (const f of files) {
      if (!f.endsWith('.htm') && !f.endsWith('.html')) continue;

      // 1. Ignore v2 files
      if (/v2/i.test(f)) {
        ignoredV2.push(f);
        continue;
      }

      // 2. Ignore known empty/duplicate files
      if (f === 'Cópia de 07.htm' || f === '010.htm' || (dir === 'Suplementos' && f === '011.htm') || (dir === 'Canticos' && f === '011.htm')) {
        ignoredOther.push(f);
        continue;
      }

      const fileNumMatch = f.match(/^0*(\d+)\.html?$/i);
      if (!fileNumMatch) {
        ignoredOther.push(f);
        continue;
      }

      const fileNum = parseInt(fileNumMatch[1], 10);
      const rawHtml = fs.readFileSync(path.join(dirPath, f), 'utf16le');
      const hymn = parseHymnHtml(rawHtml, bookName, fileNum);

      if (hymn) {
        parsedHymns.push(hymn);
        numbersFound.add(fileNum);
        results[bookKey][String(fileNum)] = hymn;
      } else {
        console.warn(`Could not parse: ${dir}/${f}`);
      }
    }

    parsedHymns.sort((a, b) => a.numero - b.numero);

    // Sequence check: check 1..max
    const maxNum = Math.max(...Array.from(numbersFound), 0);
    const missingNumbers = [];
    for (let i = 1; i <= maxNum; i++) {
      if (!numbersFound.has(i)) {
        missingNumbers.push(i);
      }
    }

    report[bookKey] = {
      bookName,
      totalParsed: parsedHymns.length,
      range: `1..${maxNum}`,
      missingNumbers,
      ignoredV2Count: ignoredV2.length,
      ignoredV2Files: ignoredV2,
      ignoredOtherFiles: ignoredOther,
      chorusCount: parsedHymns.filter(h => !!h.coro).length,
    };
  }

  // Write JSON
  fs.writeFileSync(OUTPUT_DATA_JSON, JSON.stringify(results, null, 2), 'utf-8');
  console.log(`Saved output to ${OUTPUT_DATA_JSON}`);

  console.log('\n================ PARSER REPORT ================');
  for (const [key, rep] of Object.entries(report)) {
    console.log(`\n[${rep.bookName} (${key})]`);
    console.log(`- Total hymns parsed: ${rep.totalParsed}`);
    console.log(`- Sequence range: ${rep.range}`);
    console.log(`- Missing sequence numbers: ${rep.missingNumbers.length === 0 ? 'NONE' : rep.missingNumbers.join(', ')}`);
    console.log(`- Single chorus hymns: ${rep.chorusCount}`);
    console.log(`- Multiple or 0 chorus hymns (treated as normal stanzas): ${rep.totalParsed - rep.chorusCount}`);
    console.log(`- Ignored v2 files: ${rep.ignoredV2Count} (${rep.ignoredV2Files.join(', ')})`);
    console.log(`- Ignored duplicates/templates: ${rep.ignoredOtherFiles.join(', ')}`);
  }
  console.log('================================================\n');
}

run();
