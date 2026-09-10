# Plano de Implementação: Conversão dos PDFs do Hinário Novo (Hinos 401-499 e 316, 317, 325, 326)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) ou superpowers:executing-plans para implementar este plano tarefa por tarefa. Os passos utilizam a sintaxe de checklist (`- [ ]`) para acompanhamento.

**Goal:** Extrair todos os hinos contidos nos 83 PDFs escaneados em `assets/pdfs/convert-to-text/` (hinos 401 a 499 e as lacunas 316, 317, 325 e 326), estruturá-los com qualidade no padrão de `data/hinosData.json` sob a chave `novo`, validar a integridade dos dados, remover os PDFs e comitar de forma granularizada na branch `feat/hinario-novo-novos-pdfs`.

**Architecture:** Módulos em Python por faixas de hinos para isolamento e facilidade de auditoria (`scripts/hinos_data_316_326.py`, `scripts/hinos_data_401_430.py`, `scripts/hinos_data_431_460.py`, `scripts/hinos_data_461_499.py`), auditados contra imagens escaneadas e OCR spatial (`scratch/ocr_results.json`), mesclados ordenadamente no `data/hinosData.json` em UTF-8 com script de validação de integridade antes da remoção dos PDFs.

**Tech Stack:** Python 3.10, PyMuPDF, Windows Media OCR (`pt-BR`), JSON UTF-8, Git.

## Global Constraints
- Branch: `feat/hinario-novo-novos-pdfs`.
- Caminho de dados de destino: `data/hinosData.json`.
- Chave de destino: `novo`.
- Categoria fixa: `"Hinário Novo"`.
- Padrão de títulos: subseção temática capitalizada tipo frase (ex: `"Separados para o Senhor"`, `"Render tudo ao Senhor"`, `"Por Cristo"`, `"Por Cristo como vida"`).
- Preservar integridade do JSON (UTF-8 sem BOM, indentação 2 espaços, `ensure_ascii=False`).
- Total de novos hinos inseridos: 103 (99 da faixa 401-499 + 4 das lacunas 316, 317, 325, 326).
- Após validação bem-sucedida, todos os 83 PDFs em `assets/pdfs/convert-to-text/` devem ser excluídos.
- Seguir padrão de commit: `tipo(contexto): descrição`.

---

### Task 1: Estruturação dos Hinos das Lacunas (316, 317, 325 e 326)
**Files:**
- Create: `scripts/hinos_data_316_326.py`
- Consumes: `scratch/ocr_results.json` (scans 81, 82 e 83), imagens de referência em `scratch/images/`
- Produces: Dicionário `HINOS_316_326` com 4 hinos

- [ ] **Step 1: Criar o módulo com os hinos 316, 317, 325 e 326 revisados**
Criar `scripts/hinos_data_316_326.py` com o dicionário `HINOS_316_326` contendo os 4 hinos com estrofes, pontuação e acentuação corrigidas.

- [ ] **Step 2: Validar o módulo**
Run: `python -c "from scripts.hinos_data_316_326 import HINOS_316_326; assert len(HINOS_316_326) == 4; print('OK')"`
Expected: `OK`

- [ ] **Step 3: Commit**
```bash
git add scripts/hinos_data_316_326.py
git commit -m "feat(hinario-novo): estruturar hinos 316, 317, 325 e 326 das lacunas"
```

---

### Task 2: Estruturação dos Hinos 401 a 430
**Files:**
- Create: `scripts/hinos_data_401_430.py`
- Consumes: `scratch/ocr_results.json` (scans 1 a 23), imagens de referência em `scratch/images/`
- Produces: Dicionário `HINOS_401_430` com 30 hinos (401 a 430)

- [ ] **Step 1: Criar o módulo dos hinos 401 a 430**
Criar `scripts/hinos_data_401_430.py` com os hinos 401 a 430 revisados.

- [ ] **Step 2: Validar o módulo**
Run: `python -c "from scripts.hinos_data_401_430 import HINOS_401_430; assert len(HINOS_401_430) == 30; print('OK')"`
Expected: `OK`

- [ ] **Step 3: Commit**
```bash
git add scripts/hinos_data_401_430.py
git commit -m "feat(hinario-novo): estruturar hinos 401 a 430 de PDFs"
```

---

### Task 3: Estruturação dos Hinos 431 a 460
**Files:**
- Create: `scripts/hinos_data_431_460.py`
- Consumes: `scratch/ocr_results.json` (scans 24 a 48), imagens de referência em `scratch/images/`
- Produces: Dicionário `HINOS_431_460` com 30 hinos (431 a 460)

- [ ] **Step 1: Criar o módulo dos hinos 431 a 460**
Criar `scripts/hinos_data_431_460.py` com os hinos 431 a 460 revisados.

- [ ] **Step 2: Validar o módulo**
Run: `python -c "from scripts.hinos_data_431_460 import HINOS_431_460; assert len(HINOS_431_460) == 30; print('OK')"`
Expected: `OK`

- [ ] **Step 3: Commit**
```bash
git add scripts/hinos_data_431_460.py
git commit -m "feat(hinario-novo): estruturar hinos 431 a 460 de PDFs"
```

---

### Task 4: Estruturação dos Hinos 461 a 499
**Files:**
- Create: `scripts/hinos_data_461_499.py`
- Consumes: `scratch/ocr_results.json` (scans 49 a 80), imagens de referência em `scratch/images/`
- Produces: Dicionário `HINOS_461_499` com 39 hinos (461 a 499)

- [ ] **Step 1: Criar o módulo dos hinos 461 a 499**
Criar `scripts/hinos_data_461_499.py` com os hinos 461 a 499 revisados.

- [ ] **Step 2: Validar o módulo**
Run: `python -c "from scripts.hinos_data_461_499 import HINOS_461_499; assert len(HINOS_461_499) == 39; print('OK')"`
Expected: `OK`

- [ ] **Step 3: Commit**
```bash
git add scripts/hinos_data_461_499.py
git commit -m "feat(hinario-novo): estruturar hinos 461 a 499 de PDFs"
```

---

### Task 5: Script de Auditoria e Validação Textual Integrada
**Files:**
- Create: `scripts/audit_hinos_batch2.py`
- Consumes: todos os 4 módulos (`HINOS_316_326`, `HINOS_401_430`, `HINOS_431_460`, `HINOS_461_499`)
- Produces: relatório com 0 erros de OCR, numerais espúrios ou versos faltantes

- [ ] **Step 1: Criar script de auditoria**
Verificar:
- Total exato de 103 hinos.
- Ausência de numerais no início de estrofes.
- Ausência de artefatos de OCR (`0h!`, `Il` em vez de `Ti`, etc.).
- Presença de estrofes não vazias em todos os hinos.

- [ ] **Step 2: Executar a auditoria**
Run: `python scripts/audit_hinos_batch2.py`
Expected: `Auditoria concluída com sucesso: 103 hinos válidos.`

- [ ] **Step 3: Commit**
```bash
git add scripts/audit_hinos_batch2.py
git commit -m "feat(hinario-novo): adicionar script de auditoria textual para o lote 2"
```

---

### Task 6: Mesclagem no `data/hinosData.json` e Validação Automatizada
**Files:**
- Create: `scripts/merge_hinos_novo_batch2.py`
- Create: `scripts/verify_hinos_data_batch2.py`
- Modify: `data/hinosData.json`

- [ ] **Step 1: Criar e rodar script de teste antes da mesclagem**
Criar `scripts/verify_hinos_data_batch2.py` que testa integridade do arquivo antes e depois.

- [ ] **Step 2: Executar script de mesclagem**
Criar e rodar `scripts/merge_hinos_novo_batch2.py` que insere os 103 hinos sob `novo` em `data/hinosData.json` e reordena todas as chaves numericamente.

- [ ] **Step 3: Executar a validação pós-mesclagem**
Run: `python scripts/verify_hinos_data_batch2.py`
Expected: Validação aprovada com `novo` contendo exatamente 499 hinos contínuos (1 a 499).

- [ ] **Step 4: Commit**
```bash
git add data/hinosData.json scripts/merge_hinos_novo_batch2.py scripts/verify_hinos_data_batch2.py
git commit -m "feat(hinario-novo): mesclar hinos 401 a 499 e 316 a 326 no hinosData.json"
```

---

### Task 7: Remoção dos PDFs e Push para o Repositório
**Files:**
- Delete: `assets/pdfs/convert-to-text/*.pdf` (todos os 83 arquivos)

- [ ] **Step 1: Excluir os 83 PDFs de `assets/pdfs/convert-to-text/`**
- [ ] **Step 2: Verificar `git status`**
- [ ] **Step 3: Commit da remoção**
```bash
git add assets/pdfs/convert-to-text/
git commit -m "chore(assets): remover PDFs processados do Hinário Novo"
```
- [ ] **Step 4: Push da branch para o repositório do usuário**
```bash
git push -u origin feat/hinario-novo-novos-pdfs
```
- [ ] **Step 5: Abrir PR para o repositório Upstream conforme o passo 5 do AGENTS.md**
