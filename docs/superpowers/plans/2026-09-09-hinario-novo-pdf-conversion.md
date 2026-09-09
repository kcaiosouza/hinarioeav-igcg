# Plano de Implementação: Conversão dos PDFs do Hinário Novo para hinosData.json

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) ou superpowers:executing-plans para implementar este plano tarefa por tarefa. Os passos utilizam a sintaxe de checklist (`- [ ]`) para acompanhamento.

**Goal:** Extrair todos os hinos contidos nos 71 PDFs escaneados em `assets/pdfs/convert-to-text/`, estruturá-los no padrão exato do `data/hinosData.json` sob a chave `novo`, validar a integridade dos dados e excluir os PDFs convertidos na branch `feature/convert-hinario-novo-pdfs`.

**Architecture:** Script em Python que utiliza os dados espaciais de OCR (`pt-BR`) e imagens renderizadas em alta resolução para segmentar hinos individuais (mesmo em páginas com 2 ou 3 hinos), normalizar letras e estrofes, mesclar os novos registros em `data/hinosData.json` com codificação UTF-8 rigorosa, executar testes de validação de integridade e remover os PDFs originais.

**Tech Stack:** Python 3.10, PyMuPDF (fitz), Windows Media OCR (`pt-BR`), JSON UTF-8, Git.

## Global Constraints
- Branch: `feature/convert-hinario-novo-pdfs`.
- Caminho de dados de destino: `data/hinosData.json`.
- Chave de destino: `novo`.
- Categoria fixa: `"Hinário Novo"`.
- Padrão de títulos: subseção temática (ex: `"Tão grande salvação"`, `"Por Deus"`, `"Por obediência a Cristo"`, `"Diversos"`), capitalizada tipo frase.
- Preservar integridade do JSON (UTF-8 sem caracteres corrompidos, indentação 2 espaços, `ensure_ascii=False`).
- Lacuna observada no material: hinos 316 e 317 não constam nas páginas escaneadas fornecidas.
- Após validação bem-sucedida, todos os 71 PDFs em `assets/pdfs/convert-to-text/` devem ser excluídos.

---

### Task 1: Script de Extração e Estruturação dos Hinos
**Files:**
- Create: `scripts/extract_hinos_novo.py`
- Output: `scratch/extracted_novo_hinos.json`

**Interfaces:**
- Consumes: `assets/pdfs/convert-to-text/*.pdf`, `scratch/ocr_results.json`
- Produces: `scratch/extracted_novo_hinos.json` contendo dicionário `{ "<num>": { "id": str, "numero": int, "titulo": str, "categoria": "Hinário Novo", "estrofes": list[str], "coro"?: str } }`

- [ ] **Step 1: Escrever script de extração e segmentação de layout**
Criar `scripts/extract_hinos_novo.py` que:
- Mapeia cada um dos 71 scans para os hinos correspondentes (tratando páginas com múltiplos hinos: 304/305, 307/308/309, 312/313, 314/315, 318/319/320, 327/328, 336/337, 342/343/344, 347/348, 351/352, 355/356, 363/364, 368/369, 370/371, 375/376, 378/379, 381/382, 385/386, 387/388, 391/392/393, 395/396).
- Trata scans duplicados (hino 390 nos scans 62 e 63).
- Remove os números de estrofes (1, 2, 3...) do início dos versos.
- Corrige artefatos conhecidos de OCR (`0h!` -> `Oh!`, traços soltos).
- Salva o resultado preliminar em `scratch/extracted_novo_hinos.json`.

- [ ] **Step 2: Executar o script de extração**
Run: `python scripts/extract_hinos_novo.py`
Expected: Arquivo `scratch/extracted_novo_hinos.json` gerado com todos os hinos extraídos da faixa 300 a 400 (exceto 316 e 317).

- [ ] **Step 3: Commit do script de extração**
Run:
```bash
git add scripts/extract_hinos_novo.py
git commit -m "feat: add extraction script for hinario novo pdfs"
```

---

### Task 2: Revisão Textual e Validação Visual dos Hinos Extraídos
**Files:**
- Modify: `scripts/extract_hinos_novo.py`
- Output: `scratch/extracted_novo_hinos.json`

**Interfaces:**
- Consumes: `scratch/extracted_novo_hinos.json`, imagens em `scratch/images/`
- Produces: `scratch/extracted_novo_hinos.json` 100% revisado

- [ ] **Step 1: Escrever script de auditoria de qualidade textual**
Criar script de auditoria para verificar:
- Contagem de estrofes por hino.
- Presença de versos muito curtos ou truncados.
- Presença de numerais residuais no início de linhas.
- Presença de caracteres impróprios ou mal reconhecidos.

- [ ] **Step 2: Comparar e corrigir quaisquer discrepâncias contra as imagens originais**
Ajustar regras específicas no dicionário/parser do script para garantir fidelidade total às páginas digitalizadas.

- [ ] **Step 3: Regenerar `scratch/extracted_novo_hinos.json` e verificar auditoria**
Run: `python scripts/extract_hinos_novo.py`
Expected: Auditoria limpa com 0 avisos críticos.

---

### Task 3: Mesclagem no Arquivo `data/hinosData.json`
**Files:**
- Modify: `data/hinosData.json`
- Script: `scripts/merge_hinos_novo.py`

**Interfaces:**
- Consumes: `data/hinosData.json`, `scratch/extracted_novo_hinos.json`
- Produces: `data/hinosData.json` atualizado com os novos hinos em `novo`

- [ ] **Step 1: Criar script de mesclagem seguro**
Criar `scripts/merge_hinos_novo.py` que:
- Faz backup em memória de `data/hinosData.json`.
- Carrega o JSON com UTF-8.
- Insere ordenadamente as novas chaves sob `data["novo"]`.
- Salva o arquivo com indentação de 2 espaços e `ensure_ascii=False`.

- [ ] **Step 2: Executar a mesclagem**
Run: `python scripts/merge_hinos_novo.py`
Expected: Mensagem confirmando inserção dos hinos sob `novo` em `data/hinosData.json`.

---

### Task 4: Validação Rigorosa do JSON Final
**Files:**
- Create: `scripts/verify_hinos_data.py`
- Target: `data/hinosData.json`

**Interfaces:**
- Consumes: `data/hinosData.json`
- Produces: Relatório de validação com código de saída 0

- [ ] **Step 1: Criar script de testes automatizados**
Criar `scripts/verify_hinos_data.py` com testes para:
- Validar se `novo` contém todos os hinos esperados.
- Checar se cada novo hino possui `id` (string), `numero` (int), `titulo` (string não vazia), `categoria` ("Hinário Novo"), `estrofes` (lista de strings).
- Checar se o JSON pode ser lido e decodificado em UTF-8 sem erros.
- Checar se nenhum hino existente anteriormente foi corrompido ou modificado indevidamente.

- [ ] **Step 2: Executar a validação**
Run: `python scripts/verify_hinos_data.py`
Expected: Todos os testes passam (código de saída 0).

---

### Task 5: Remoção dos PDFs e Commit Final
**Files:**
- Delete: `assets/pdfs/convert-to-text/*.pdf` (71 arquivos)
- Repository: Git branch `feature/convert-hinario-novo-pdfs`

- [ ] **Step 1: Excluir os 71 arquivos PDF**
Remover todos os arquivos `.pdf` da pasta `assets/pdfs/convert-to-text/`.

- [ ] **Step 2: Verificar status do Git**
Run: `git status`
Expected: 71 arquivos PDF excluídos (untracked desaparecidos ou deleted se tivessem sido adicionados), `data/hinosData.json` modificado, novos scripts presentes.

- [ ] **Step 3: Commitar todas as alterações na branch**
Run:
```bash
git add data/hinosData.json scripts/
git commit -m "feat: convert hinario novo pdfs and insert into hinosData.json"
```
