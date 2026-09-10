# Design: Conversão dos PDFs do Hinário Novo (Hinos 401-499 e 316, 317, 325, 326) para hinosData.json

## 1. Visão Geral
Este documento especifica a extração, estruturação, revisão, validação e inserção dos novos hinos do **Hinário Novo** contidos nos 83 arquivos PDF em `assets/pdfs/convert-to-text/` no arquivo central `data/hinosData.json` sob a chave `novo`.
Ao término da validação, os 83 arquivos PDF serão excluídos da pasta, as alterações serão commitadas na branch `feat/hinario-novo-novos-pdfs`, enviadas ao repositório remoto e submetidas via Pull Request.

---

## 2. Escopo e Mapeamento dos Arquivos
- **Branch:** `feat/hinario-novo-novos-pdfs` (baseada na `main` atualizada).
- **Entrada:** 83 arquivos PDF de página única escaneados em `assets/pdfs/convert-to-text/`.
- **Mapeamento de Conteúdo:**
  - **Scans 1 a 80:** Hinos 401 a 499 (Páginas 328 a 409 do Hinário Novo).
    - Páginas com múltiplos hinos (ex: 412/413, 415/416, 424/425, 427/428, 430/431, 435/436, 457/458, 459/460, 470/471, 476/477, 480/481, 482/483, 484/485, 489/490, 491/492).
    - Hinos em páginas completas ou sem número de cabeçalho explícito (ex: 408 no scan 7, 443 no scan 33, 444 no scan 34, 445 no scan 35, 448 no scan 38, 462 no scan 50, 463 no scan 51, 488 no scan 71, 496 no scan 77).
  - **Scans 81 a 83:** Hinos 316, 317, 325 e 326 (lacunas remanescentes da primeira fase).
- **Resultado Esperado no Catálogo:** O Hinário Novo (`novo`) passará a contar com todos os hinos de 1 a 499 completos e sem lacunas (totalizando 499 hinos).

---

## 3. Padrão de Estrutura de Dados (`data/hinosData.json`)
Cada hino é adicionado sob a chave `"novo"` com a seguinte assinatura:

```json
{
  "id": "401",
  "numero": 401,
  "titulo": "Separados para o Senhor",
  "categoria": "Hinário Novo",
  "estrofes": [
    "Totalmente entregue\nAo Espír'to sou!\nNão importa o preço,\nDele encher-me vou;",
    "...",
  ],
  "coro": "..." // Opcional, presente apenas quando houver coro explícito
}
```

### Regras de Qualidade e Formatação:
1. `id`: string numérica (ex: `"401"`).
2. `numero`: inteiro correspondente (ex: `401`).
3. `titulo`: subseção temática extraída do cabeçalho da página (ex: `"Separados para o Senhor"`, `"Render tudo ao Senhor"`, `"Por Cristo"`, `"Por Cristo como vida"`, `"Unido a Ele"`). Capitalizado tipo frase, preservando maiúsculas em nomes próprios e divinos (*Senhor*, *Deus*, *Cristo*, *Espírito*).
4. `categoria`: string fixa `"Hinário Novo"`.
5. `estrofes`: lista de estrofes onde cada estrofe tem versos separados por `\n`. Os números de estrofe do livro (1, 2, 3...) são removidos dos inícios dos versos.
6. `coro`: string contendo as linhas do coro separadas por `\n`.
7. `codificação`: UTF-8 sem BOM, mantendo acentuação intacta (`ã`, `é`, `í`, `ç`, `ó`, etc.), com indentação de 2 espaços e `ensure_ascii=False`.

---

## 4. Arquitetura da Implementação
1. **Dados de OCR:**
   - 83 páginas já renderizadas em `scratch/images/*.png` em 200 DPI.
   - Resultados de OCR com caixas delimitadoras espaciais $(x, y, w, h)$ salvos em `scratch/ocr_results.json`.
2. **Módulos Estruturados por Faixa:**
   - `scripts/hinos_data_316_326.py` (Hinos 316, 317, 325, 326)
   - `scripts/hinos_data_401_420.py` (Hinos 401 a 420)
   - `scripts/hinos_data_421_440.py` (Hinos 421 a 440)
   - `scripts/hinos_data_441_460.py` (Hinos 441 a 460)
   - `scripts/hinos_data_461_480.py` (Hinos 461 a 480)
   - `scripts/hinos_data_481_499.py` (Hinos 481 a 499)
3. **Auditoria e Verificação de Qualidade:**
   - Script de conferência cruzada para checar versos truncados, falta de estrofes, erros de OCR conhecidos (`0h!` $\rightarrow$ `Oh!`, traços soltos, `ll` $\rightarrow$ `Ti`), garantindo texto 100% fiel às páginas do livro.
4. **Mesclagem e Validação:**
   - Script `scripts/merge_hinos_novo_batch2.py` para mesclar no `data/hinosData.json` ordenando as chaves numericamente.
   - Teste automatizado `scripts/verify_hinos_data_batch2.py` verificando schema, integridade, e ausência de regressões nos hinos existentes.
5. **Remoção de Arquivos e Git:**
   - Exclusão dos 83 PDFs de `assets/pdfs/convert-to-text/`.
   - Commits granulares seguindo convenção `tipo(contexto): descrição`.
   - Push para origin e criação de Pull Request.
