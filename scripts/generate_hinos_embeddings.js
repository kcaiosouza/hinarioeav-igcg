import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SOURCE_PATH = path.resolve(__dirname, '../data/hinosData.json');
const OUTPUT_DIR = path.resolve('C:/igcg-website/data');
const OUTPUT_PATH = path.join(OUTPUT_DIR, 'hinos_embeddings.json');

const BATCH_SIZE = 100;
const EMBEDDING_DIMENSIONS = 512;
const OPENAI_EMBEDDING_URL = 'https://api.openai.com/v1/embeddings';

async function fetchEmbeddingsBatch(texts, apiKey) {
  const response = await fetch(OPENAI_EMBEDDING_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'text-embedding-3-small',
      dimensions: EMBEDDING_DIMENSIONS,
      input: texts,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenAI API error (${response.status}): ${errorText}`);
  }

  const json = await response.json();
  return json.data.map((item) => item.embedding);
}

export function formatHymnForEmbedding(hymn, section) {
  const estrofesText = Array.isArray(hymn.estrofes) ? hymn.estrofes.join('\n\n') : '';
  const coroText = hymn.coro ? `\nCoro:\n${hymn.coro}` : '';
  return `[Hino ${hymn.numero} - ${section}] ${hymn.titulo}\n${estrofesText}${coroText}`.trim();
}

async function main() {
  const isDryRun = process.argv.includes('--dry-run');
  const apiKey = process.env.OPENAI_API_KEY;

  if (!isDryRun && !apiKey) {
    console.error('ERROR: OPENAI_API_KEY environment variable is required (or pass --dry-run for mock validation).');
    process.exit(1);
  }

  console.log(`Reading source hymns from: ${SOURCE_PATH}`);
  const raw = fs.readFileSync(SOURCE_PATH, 'utf-8');
  const hinosData = JSON.parse(raw);

  const hymnItems = [];
  const sections = ['hinos', 'canticos', 'suplemento', 'novo', 'diversos'];

  for (const section of sections) {
    const sectionData = hinosData[section] || {};
    const keys = Object.keys(sectionData).sort((a, b) => Number(a) - Number(b));
    for (const key of keys) {
      const hymn = sectionData[key];
      const textToEmbed = formatHymnForEmbedding(hymn, section);
      const firstStanza = Array.isArray(hymn.estrofes) && hymn.estrofes.length > 0 ? hymn.estrofes[0] : '';

      hymnItems.push({
        id: `${section}_${hymn.numero}`,
        number: hymn.numero,
        title: hymn.titulo,
        section,
        firstStanza,
        textToEmbed,
      });
    }
  }

  console.log(`Total hymns prepared for embedding: ${hymnItems.length}`);

  if (isDryRun) {
    console.log('DRY RUN: Validated format for all hymns. Sample hymn entry:');
    console.log(JSON.stringify(hymnItems[0], null, 2));
    // Generate dummy 512-dim vectors for dry-run verification
    const mockOutput = hymnItems.map((item) => ({
      id: item.id,
      number: item.number,
      title: item.title,
      section: item.section,
      firstStanza: item.firstStanza,
      vector: Array(EMBEDDING_DIMENSIONS).fill(0.01),
    }));

    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }
    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(mockOutput), 'utf-8');
    console.log(`Wrote mock embeddings (${mockOutput.length} items) to: ${OUTPUT_PATH}`);
    return;
  }

  console.log(`Generating embeddings with OpenAI (Batch size: ${BATCH_SIZE}, Dimensions: ${EMBEDDING_DIMENSIONS})...`);
  const finalHymns = [];

  for (let i = 0; i < hymnItems.length; i += BATCH_SIZE) {
    const batch = hymnItems.slice(i, i + BATCH_SIZE);
    const texts = batch.map((b) => b.textToEmbed);

    console.log(`Processing batch ${Math.floor(i / BATCH_SIZE) + 1} / ${Math.ceil(hymnItems.length / BATCH_SIZE)} (hymns ${i + 1} to ${i + batch.length})...`);
    const embeddings = await fetchEmbeddingsBatch(texts, apiKey);

    for (let j = 0; j < batch.length; j++) {
      finalHymns.push({
        id: batch[j].id,
        number: batch[j].number,
        title: batch[j].title,
        section: batch[j].section,
        firstStanza: batch[j].firstStanza,
        vector: embeddings[j],
      });
    }
  }

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(finalHymns), 'utf-8');
  const stats = fs.statSync(OUTPUT_PATH);
  console.log(`Successfully generated and saved ${finalHymns.length} hymn embeddings!`);
  console.log(`File size: ${(stats.size / 1024 / 1024).toFixed(2)} MB at ${OUTPUT_PATH}`);
}

main().catch((err) => {
  console.error('Fatal error in generate_hinos_embeddings:', err);
  process.exit(1);
});
