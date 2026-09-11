# Hinário Novo (Hinos 600 a 700) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Extrair, higienizar, auditar e inserir os hinos 600 a 700 do Hinário Novo a partir dos 90 PDFs escaneados em `assets/pdfs/convert-to-text/` no arquivo central `data/hinosData.json`, auditar fidelidade textual, remover os 90 PDFs, realizar commits granulares, efetuar push para origin e abrir PR para upstream.

**Architecture:** Módulos Python por faixa de hinos (`hinos_data_600_625.py`, `hinos_data_626_650.py`, `hinos_data_651_675.py`, `hinos_data_676_700.py`) alimentados pelo OCR do Windows Media Engine e revisão com imagens 200 DPI em `scratch/images/`. Script de auditoria automatizada `audit_hinos_batch4.py`, script de mesclagem `merge_hinos_novo_batch4.py`, script de verificação regressiva `verify_hinos_data_batch4.py`, e git workflow em conformidade com `AGENTS.md`.

**Tech Stack:** Python 3.10 (PyMuPDF / fitz, json, re), PowerShell, Git.

## Global Constraints
- Codificação UTF-8 sem BOM em todos os arquivos JSON e Python.
- Padrão de commits granulares: `tipo(contexto): descrição` (ex: `feat(hinario-novo): estruturar hinos 600 a 625 de PDFs`).
- Preservar integridade dos hinos existentes 1 a 599 e das outras coleções em `data/hinosData.json`.
- Remover numerais de estrofes (1, 2, 3...) dos inícios dos versos.
- Remover os 90 PDFs ao final da conversão e validação.

---

### Task 1: Estruturar Hinos 600 a 625
**Files:**
- Create: `scripts/hinos_data_600_625.py`
- Test: `python -c "from scripts.hinos_data_600_625 import HINOS_600_625; assert len(HINOS_600_625) == 26; print('OK 600-625')"`

**Interfaces:**
- Produces: `HINOS_600_625: dict[str, dict]` onde as chaves são `"600"` a `"625"`.

- [ ] **Step 1: Criar gerador/extrator e estruturar hinos 600 a 625**
- [ ] **Step 2: Executar teste de sanidade e integridade dos hinos 600 a 625**
- [ ] **Step 3: Commit**
```bash
git add scripts/hinos_data_600_625.py
git commit -m "feat(hinario-novo): estruturar hinos 600 a 625 de PDFs"
```

---

### Task 2: Estruturar Hinos 626 a 650
**Files:**
- Create: `scripts/hinos_data_626_650.py`
- Test: `python -c "from scripts.hinos_data_626_650 import HINOS_626_650; assert len(HINOS_626_650) == 25; print('OK 626-650')"`

**Interfaces:**
- Produces: `HINOS_626_650: dict[str, dict]` onde as chaves são `"626"` a `"650"`.

- [ ] **Step 1: Criar gerador/extrator e estruturar hinos 626 a 650**
- [ ] **Step 2: Executar teste de sanidade e integridade dos hinos 626 a 650**
- [ ] **Step 3: Commit**
```bash
git add scripts/hinos_data_626_650.py
git commit -m "feat(hinario-novo): estruturar hinos 626 a 650 de PDFs"
```

---

### Task 3: Estruturar Hinos 651 a 675
**Files:**
- Create: `scripts/hinos_data_651_675.py`
- Test: `python -c "from scripts.hinos_data_651_675 import HINOS_651_675; assert len(HINOS_651_675) == 25; print('OK 651-675')"`

**Interfaces:**
- Produces: `HINOS_651_675: dict[str, dict]` onde as chaves são `"651"` a `"675"`.

- [ ] **Step 1: Criar gerador/extrator e estruturar hinos 651 a 675**
- [ ] **Step 2: Executar teste de sanidade e integridade dos hinos 651 a 675**
- [ ] **Step 3: Commit**
```bash
git add scripts/hinos_data_651_675.py
git commit -m "feat(hinario-novo): estruturar hinos 651 a 675 de PDFs"
```

---

### Task 4: Estruturar Hinos 676 a 700
**Files:**
- Create: `scripts/hinos_data_676_700.py`
- Test: `python -c "from scripts.hinos_data_676_700 import HINOS_676_700; assert len(HINOS_676_700) == 25; print('OK 676-700')"`

**Interfaces:**
- Produces: `HINOS_676_700: dict[str, dict]` onde as chaves são `"676"` a `"700"`.

- [ ] **Step 1: Criar gerador/extrator e estruturar hinos 676 a 700**
- [ ] **Step 2: Executar teste de sanidade e integridade dos hinos 676 a 700**
- [ ] **Step 3: Commit**
```bash
git add scripts/hinos_data_676_700.py
git commit -m "feat(hinario-novo): estruturar hinos 676 a 700 de PDFs"
```

---

### Task 5: Implementar Script de Auditoria Automatizada e Validar Lote 4
**Files:**
- Create: `scripts/audit_hinos_batch4.py`
- Test: `python scripts/audit_hinos_batch4.py`

**Interfaces:**
- Consumes: `HINOS_600_625`, `HINOS_626_650`, `HINOS_651_675`, `HINOS_676_700`.
- Validates: 101 hinos contínuos (600 a 700), sem numerais no início de estrofes, tipos válidos e ausência de ruídos de OCR.

- [ ] **Step 1: Criar script `scripts/audit_hinos_batch4.py`**
- [ ] **Step 2: Executar auditoria e corrigir quaisquer discrepâncias detectadas**
- [ ] **Step 3: Commit**
```bash
git add scripts/audit_hinos_batch4.py
git commit -m "feat(hinario-novo): adicionar script de auditoria textual para o lote 4"
```

---

### Task 6: Implementar Scripts de Mesclagem Segura e Verificação Regressiva
**Files:**
- Create: `scripts/merge_hinos_novo_batch4.py`
- Create: `scripts/verify_hinos_data_batch4.py`

**Interfaces:**
- `merge_hinos_novo_batch4.py`: Faz backup de `data/hinosData.json` e mescla os hinos 600 a 700.
- `verify_hinos_data_batch4.py`: Verifica se `"novo"` possui exatamente 700 hinos (1 a 700) e se as outras seções permanecem inalteradas.

- [ ] **Step 1: Criar script `scripts/merge_hinos_novo_batch4.py`**
- [ ] **Step 2: Criar script `scripts/verify_hinos_data_batch4.py`**
- [ ] **Step 3: Commit**
```bash
git add scripts/merge_hinos_novo_batch4.py scripts/verify_hinos_data_batch4.py
git commit -m "feat(hinario-novo): criar scripts de mesclagem e verificacao do lote 4"
```

---

### Task 7: Executar Mesclagem no hinosData.json, Remover PDFs e Testar
**Files:**
- Modify: `data/hinosData.json`
- Delete: 90 arquivos PDF em `assets/pdfs/convert-to-text/`
- Test: `python scripts/verify_hinos_data_batch4.py`

- [ ] **Step 1: Executar mesclagem no `data/hinosData.json`**
```bash
python scripts/merge_hinos_novo_batch4.py
```
- [ ] **Step 2: Executar verificação regressiva**
```bash
python scripts/verify_hinos_data_batch4.py
```
- [ ] **Step 3: Remover os 90 arquivos PDF de `assets/pdfs/convert-to-text/`**
- [ ] **Step 4: Commit**
```bash
git add data/hinosData.json assets/pdfs/convert-to-text/
git commit -m "feat(hinario-novo): mesclar hinos 600 a 700 no hinosData.json e remover PDFs"
```

---

### Task 8: Push para o Repositório Remoto e Abertura do Pull Request
- [ ] **Step 1: Push da branch `feat/hinario-novo-600-700` para o origin**
```bash
git push -u origin feat/hinario-novo-600-700
```
- [ ] **Step 2: Criar Pull Request para o repositório Upstream com título e descrição detalhada**
