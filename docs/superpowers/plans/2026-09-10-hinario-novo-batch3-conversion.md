# Hinário Novo (Hinos 500 a 599) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Extrair, revisar e inserir os hinos 500 a 599 do Hinário Novo a partir dos 75 PDFs escaneados em `assets/pdfs/convert-to-text/` no arquivo `data/hinosData.json`, auditar fidelidade textual, remover os PDFs, realizar commits granulares, efetuar push para origin e abrir PR.

**Architecture:** Módulos Python por faixa de hinos (`hinos_data_500_525.py`, `hinos_data_526_550.py`, `hinos_data_551_575.py`, `hinos_data_576_599.py`) alimentados pelo OCR do Windows Media Engine e revisão visual com imagens 200 DPI em `scratch/images/`. Script de auditoria automatizada `audit_hinos_batch3.py`, script de mesclagem `merge_hinos_novo_batch3.py`, script de verificação regressiva `verify_hinos_data_batch3.py`, e git workflow em conformidade com `AGENTS.md`.

**Tech Stack:** Python 3.10 (PyMuPDF / fitz, json, re), PowerShell, Git.

## Global Constraints
- Codificação UTF-8 sem BOM em todos os arquivos JSON e Python.
- Padrão de commits granulares: `tipo(contexto): descrição` (ex: `feat(hinario-novo): estruturar hinos 500 a 525 de PDFs`).
- Preservar integridade dos hinos existentes 1 a 499 em `data/hinosData.json`.
- Remover numerais de estrofes (1, 2, 3...) dos inícios dos versos.
- Remover os 75 PDFs ao final da conversão e validação.

---

### Task 1: Estruturar Hinos 500 a 525
**Files:**
- Create: `scripts/hinos_data_500_525.py`
- Test: `python -c "from scripts.hinos_data_500_525 import HINOS_500_525; assert len(HINOS_500_525) == 26"`

**Interfaces:**
- Produces: `HINOS_500_525: dict[str, dict]` onde as chaves são `"500"` a `"525"`.

- [ ] **Step 1: Criar gerador/extrator e estruturar hinos 500 a 525**
- [ ] **Step 2: Executar teste de sanidade e integridade dos hinos 500 a 525**
- [ ] **Step 3: Commit**
```bash
git add scripts/hinos_data_500_525.py
git commit -m "feat(hinario-novo): estruturar hinos 500 a 525 de PDFs"
```

---

### Task 2: Estruturar Hinos 526 a 550
**Files:**
- Create: `scripts/hinos_data_526_550.py`
- Test: `python -c "from scripts.hinos_data_526_550 import HINOS_526_550; assert len(HINOS_526_550) == 25"`

**Interfaces:**
- Produces: `HINOS_526_550: dict[str, dict]` onde as chaves são `"526"` a `"550"`.

- [ ] **Step 1: Criar gerador/extrator e estruturar hinos 526 a 550**
- [ ] **Step 2: Executar teste de sanidade e integridade dos hinos 526 a 550**
- [ ] **Step 3: Commit**
```bash
git add scripts/hinos_data_526_550.py
git commit -m "feat(hinario-novo): estruturar hinos 526 a 550 de PDFs"
```

---

### Task 3: Estruturar Hinos 551 a 575
**Files:**
- Create: `scripts/hinos_data_551_575.py`
- Test: `python -c "from scripts.hinos_data_551_575 import HINOS_551_575; assert len(HINOS_551_575) == 25"`

**Interfaces:**
- Produces: `HINOS_551_575: dict[str, dict]` onde as chaves são `"551"` a `"575"`.

- [ ] **Step 1: Criar gerador/extrator e estruturar hinos 551 a 575**
- [ ] **Step 2: Executar teste de sanidade e integridade dos hinos 551 a 575**
- [ ] **Step 3: Commit**
```bash
git add scripts/hinos_data_551_575.py
git commit -m "feat(hinario-novo): estruturar hinos 551 a 575 de PDFs"
```

---

### Task 4: Estruturar Hinos 576 a 599
**Files:**
- Create: `scripts/hinos_data_576_599.py`
- Test: `python -c "from scripts.hinos_data_576_599 import HINOS_576_599; assert len(HINOS_576_599) == 24"`

**Interfaces:**
- Produces: `HINOS_576_599: dict[str, dict]` onde as chaves são `"576"` a `"599"`.

- [ ] **Step 1: Criar gerador/extrator e estruturar hinos 576 a 599**
- [ ] **Step 2: Executar teste de sanidade e integridade dos hinos 576 a 599**
- [ ] **Step 3: Commit**
```bash
git add scripts/hinos_data_576_599.py
git commit -m "feat(hinario-novo): estruturar hinos 576 a 599 de PDFs"
```

---

### Task 5: Script de Auditoria e Validação Textual
**Files:**
- Create: `scripts/audit_hinos_batch3.py`
- Test: `python scripts/audit_hinos_batch3.py`

**Interfaces:**
- Consumes: `HINOS_500_525`, `HINOS_526_550`, `HINOS_551_575`, `HINOS_576_599`
- Validates: 100 hinos sem lacunas (500 a 599), campos obrigatórios, ausência de numerais nos versos, formatação de coro e estrofes.

- [ ] **Step 1: Escrever script `audit_hinos_batch3.py`**
- [ ] **Step 2: Executar auditoria e corrigir discrepâncias textuais encontradas**
- [ ] **Step 3: Commit**
```bash
git add scripts/audit_hinos_batch3.py
git commit -m "feat(hinario-novo): adicionar script de auditoria textual para o lote 3"
```

---

### Task 6: Script de Mesclagem e Teste de Verificação
**Files:**
- Create: `scripts/merge_hinos_novo_batch3.py`
- Create: `scripts/verify_hinos_data_batch3.py`
- Test: `python scripts/verify_hinos_data_batch3.py`

**Interfaces:**
- Consumes: Todos os 4 dicionários de hinos do Lote 3
- Produces: Atualização ordenada em `data/hinosData.json`

- [ ] **Step 1: Escrever `merge_hinos_novo_batch3.py` e `verify_hinos_data_batch3.py`**
- [ ] **Step 2: Commit dos scripts**
```bash
git add scripts/merge_hinos_novo_batch3.py scripts/verify_hinos_data_batch3.py
git commit -m "feat(hinario-novo): criar scripts de mesclagem e verificacao do lote 3"
```

---

### Task 7: Executar Mesclagem e Validar `data/hinosData.json`
**Files:**
- Modify: `data/hinosData.json`
- Test: `python scripts/verify_hinos_data_batch3.py`

- [ ] **Step 1: Executar `python scripts/merge_hinos_novo_batch3.py`**
- [ ] **Step 2: Executar `python scripts/verify_hinos_data_batch3.py` para verificar que `novo` contém 1 a 599 sem lacunas**
- [ ] **Step 3: Commit**
```bash
git add data/hinosData.json
git commit -m "feat(hinario-novo): mesclar hinos 500 a 599 no hinosData.json"
```

---

### Task 8: Exclusão dos PDFs, Documentação, Push e Pull Request
**Files:**
- Delete: `assets/pdfs/convert-to-text/*.pdf` (75 arquivos)
- Create: `docs/superpowers/specs/2026-09-10-hinario-novo-batch3-conversion-design.md`
- Create: `docs/superpowers/plans/2026-09-10-hinario-novo-batch3-conversion.md`

- [ ] **Step 1: Excluir os 75 arquivos PDF de `assets/pdfs/convert-to-text/`**
- [ ] **Step 2: Commit da remoção dos PDFs e documentação**
```bash
git add assets/pdfs/convert-to-text docs/
git commit -m "feat(hinario-novo): remover PDFs convertidos e registrar documentacao"
```
- [ ] **Step 3: Push para origin na branch `feat/hinario-novo-pdfs-batch3`**
```bash
git push -u origin feat/hinario-novo-pdfs-batch3
```
- [ ] **Step 4: Fornecer URL e orientações para criação do Pull Request**
