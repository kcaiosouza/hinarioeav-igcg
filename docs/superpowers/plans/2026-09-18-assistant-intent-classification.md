# Assistant Intent Classification, Smart Routing & Proactive CTAs Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement intent classification and smart routing in `C:\igcg-website\api\hinario\ask-ai.js` to accurately route specific hymn inquiries (exact number matches across all books without bias), biblical/conceptual questions (humble brief definitions with zero cards and proactive follow-up invitations), thematic search (2-3 cards matching text), and courtesy queries.

**Architecture:** Fast heuristic router in `api/hinario/ask-ai.js` evaluating query patterns before running heavy operations. If a specific number is detected, directly queries all collections in `_data/hinos_embeddings.json`, emits only matching cards, and instructs the LLM accordingly. If conceptual/theological, returns 0 cards and guides the LLM to provide a humble, brief hymnal explanation followed by a thematic search CTA.

**Tech Stack:** Node.js, Vercel Serverless Function, OpenAI API (`gpt-4o-mini`).

## Global Constraints

* **Target Repository:** `C:\igcg-website` on branch `feat/assistant-intent-routing`.
* **Zero Mobile Changes:** All changes are strictly backend serverless code.
* **No Collection Bias:** If a hymn number exists in multiple books (e.g. 441 in both `hinos` and `novo`), return both cards and explain both.
* **Proactive CTAs:** Every AI response MUST conclude with a contextual follow-up question.
* **Test Verification:** Unit tests and integration tests verifying all 4 intent scenarios.

---

### Task 1: Intent Detection and Number Matcher Helpers

**Files:**
- Modify: `C:\igcg-website\api\hinario\ask-ai.js`
- Create: `C:\igcg-website\tests\intentRouting.test.js`

**Interfaces:**
- Produces:
  - `findHymnsByNumber(hymns: HymnItem[], query: string): HymnItem[] | null`
  - `isConceptualQuery(query: string): boolean`
  - `isCourtesyQuery(query: string): boolean`

- [x] **Step 1: Write unit tests for intent helpers**

Create `C:\igcg-website\tests\intentRouting.test.js`:

```javascript
import assert from 'node:assert/strict';
import {
  findHymnsByNumber,
  isConceptualQuery,
  isCourtesyQuery,
} from '../api/hinario/ask-ai.js';

console.log('Testing intent detection helpers...');

// Mock Hymns
const mockHymns = [
  { id: 'hinos_441', number: 441, title: 'Um Só Corpo', section: 'hinos' },
  { id: 'novo_441', number: 441, title: 'Comunhão no Partir do Pão', section: 'novo' },
  { id: 'novo_1099', number: 1099, title: 'Vitória Final', section: 'novo' },
  { id: 'canticos_12', number: 12, title: 'Cristo Vive', section: 'canticos' },
  { id: 'hinos_12', number: 12, title: 'Firme na Rocha', section: 'hinos' },
];

// Test 1: Specific number found in multiple books
console.log('Test 1: Specific hymn in multiple books...');
const res441 = findHymnsByNumber(mockHymns, 'O hino 441 fala sobre o que?');
assert.ok(res441);
assert.equal(res441.length, 2);
assert.deepEqual(res441.map((h) => h.section), ['hinos', 'novo']);

// Test 2: Specific number unique to one book
console.log('Test 2: Unique hymn number...');
const res1099 = findHymnsByNumber(mockHymns, 'Fale do hino 1099');
assert.ok(res1099);
assert.equal(res1099.length, 1);
assert.equal(res1099[0].id, 'novo_1099');

// Test 3: Number with collection specified
console.log('Test 3: Number with specified collection...');
const res12Canticos = findHymnsByNumber(mockHymns, 'Letra do hino 12 de cânticos');
assert.ok(res12Canticos);
assert.equal(res12Canticos.length, 1);
assert.equal(res12Canticos[0].id, 'canticos_12');

// Test 4: Conceptual query detection
console.log('Test 4: Conceptual query detection...');
assert.equal(isConceptualQuery('O que é comunhão?'), true);
assert.equal(isConceptualQuery('o que significa redenção?'), true);
assert.equal(isConceptualQuery('qual o significado da palavra expiação?'), true);
assert.equal(isConceptualQuery('Hinos sobre fé nas lutas'), false);

// Test 5: Courtesy query detection
console.log('Test 5: Courtesy query detection...');
assert.equal(isCourtesyQuery('Muito obrigado!'), true);
assert.equal(isCourtesyQuery('amém'), true);
assert.equal(isCourtesyQuery('Olá!'), true);
assert.equal(isCourtesyQuery('Hino 50'), false);

console.log('All intent detection tests passed successfully!');
```

- [x] **Step 2: Run test to verify it fails**

Run:
```powershell
node C:\igcg-website\tests\intentRouting.test.js
```
Expected: FAIL (functions not yet exported from `ask-ai.js`).

- [x] **Step 3: Implement helper functions in `C:\igcg-website\api\hinario\ask-ai.js`**

Add the helper functions to `api/hinario/ask-ai.js`:

```javascript
/**
 * Detects explicit hymn number inquiries and retrieves matches across all collections.
 */
export function findHymnsByNumber(hymns, query) {
  if (!Array.isArray(hymns) || typeof query !== 'string') return null;

  // Matches patterns like "hino 441", "hino nº 441", "n 441", "441"
  const numberMatch = query.match(/\b(?:hino|n[ºo°]|número)?\s*(\d{1,4})\b/i);
  if (!numberMatch) return null;

  const targetNumber = parseInt(numberMatch[1], 10);
  if (isNaN(targetNumber) || targetNumber <= 0) return null;

  const normalizedQuery = query.toLowerCase();
  let targetSection = null;
  if (normalizedQuery.includes('cântico') || normalizedQuery.includes('cantico')) targetSection = 'canticos';
  else if (normalizedQuery.includes('suplemento')) targetSection = 'suplemento';
  else if (normalizedQuery.includes('novo')) targetSection = 'novo';
  else if (normalizedQuery.includes('diverso')) targetSection = 'diversos';
  else if (normalizedQuery.includes('hinos')) targetSection = 'hinos';

  let matches = hymns.filter((h) => h.number === targetNumber);
  if (targetSection) {
    const filtered = matches.filter((h) => h.section === targetSection);
    if (filtered.length > 0) matches = filtered;
  }

  return matches.length > 0 ? matches : null;
}

/**
 * Detects conceptual or theological definition inquiries.
 */
export function isConceptualQuery(query) {
  if (typeof query !== 'string') return false;
  const norm = query.toLowerCase().trim();
  return (
    norm.startsWith('o que é') ||
    norm.startsWith('o que e ') ||
    norm.startsWith('o que significa') ||
    norm.startsWith('qual o significado') ||
    norm.startsWith('qual é o significado') ||
    norm.startsWith('defina ') ||
    norm.includes('o que quer dizer')
  );
}

/**
 * Detects courtesy, greetings, or pleasantries.
 */
export function isCourtesyQuery(query) {
  if (typeof query !== 'string') return false;
  const norm = query.toLowerCase().trim();
  return /^(obrigado|valeu|muito obrigado|amém|amen|olá|ola|oi|bom dia|boa tarde|boa noite|paz do senhor)[!.]?$/i.test(norm);
}
```

- [x] **Step 4: Run test to verify it passes**

Run:
```powershell
node C:\igcg-website\tests\intentRouting.test.js
```
Expected: PASS (`All intent detection tests passed successfully!`).

---

### Task 2: System Prompt Refinement and Smart Routing Integration

**Files:**
- Modify: `C:\igcg-website\api\hinario\ask-ai.js`

**Interfaces:**
- Incorporates intent routing in `handleAskAi`:
  - If `findHymnsByNumber` matches:
    - Sets `matchedHymns = foundMatches`.
    - Skips query embedding generation.
    - Custom prompt instructing LLM to explain the specific hymn(s) and conclude asking: *"Com base no hino [X], posso recomendar outros com temas semelhantes. Quer que eu faça essa busca agora?"*
  - If `isConceptualQuery(query)` matches:
    - Sets `matchedHymns = []` (0 cards).
    - Custom prompt instructing LLM to acknowledge humble role, give a very brief explanation based on hymns, and conclude asking: *"Gostaria que eu fizesse uma busca e recomendasse hinos que têm [termo] como tema central?"*
  - If `isCourtesyQuery(query)` matches:
    - Sets `matchedHymns = []` (0 cards).
    - Friendly brief response with open invitation.
  - Otherwise (Default Thematic Search):
    - Runs vector search as usual, emits 2-3 cards, concludes with thematic CTA.

- [x] **Step 1: Update `handleAskAi` in `C:\igcg-website\api\hinario\ask-ai.js`**

Implement the full multi-intent routing logic and update `SYSTEM_PROMPT`.

- [x] **Step 2: Run verification test script**

Test all 4 intents against the updated handler.

---

### Task 3: Comprehensive End-to-End Testing & Git Commit

**Files:**
- Create: `C:\igcg-website\tests\intentsE2E.test.js`

- [x] **Step 1: Write E2E test verifying all 4 intent responses and card emissions**

- [x] **Step 2: Run test suite**

Run:
```powershell
node C:\igcg-website\tests\intentRouting.test.js
node C:\igcg-website\tests\intentsE2E.test.js
```
Expected: PASS with 0 errors.

- [x] **Step 3: Commit and Push**

```powershell
git add api/hinario/ask-ai.js
git commit -m "feat(ai): implementar roteamento de intencoes e fechamento conversacional proativo"
git push -u origin feat/assistant-intent-routing
```
