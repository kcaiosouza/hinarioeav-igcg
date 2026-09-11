# Design: Conversão dos PDFs do Hinário Novo (Hinos 500 a 599) para hinosData.json

## 1. Visão Geral
Este documento especifica a extração, estruturação, auditoria de fidelidade textual e inserção dos hinos de número **500 a 599** do **Hinário Novo** a partir dos 75 arquivos PDF escaneados em `assets/pdfs/convert-to-text/` no catálogo principal `data/hinosData.json` sob a chave `"novo"`.
Após a validação completa, os 75 arquivos PDF serão removidos da pasta, as alterações serão commitadas na branch `feat/hinario-novo-pdfs-batch3` com commits atômicos e convencionais, enviadas ao repositório remoto e submetidas via Pull Request.

---

## 2. Escopo e Mapeamento dos Arquivos
- **Branch:** `feat/hinario-novo-pdfs-batch3` (criada com base na `main` atualizada).
- **Entrada:** 75 arquivos PDF de página única escaneados em `assets/pdfs/convert-to-text/`.
- **Mapeamento de Conteúdo:**
  - As 75 páginas cobrem as páginas 410 a 496 do Hinário Novo.
  - Várias páginas contêm 2 ou mais hinos (ex: 503/504, 505/506, 510/511/512, 513/514, 515/516, 517/518, 522/523, 528/529, 536/537, 538/539, 549/550, 553/554, 563/564, 567/568, 569/570, 573/574, 575/576, 578/579, 580/581, 582/583, 586/587/588, 589/590/591).
  - Algumas páginas possuem hinos com números no corpo do texto ou título de seção temático (ex: 507, 509, 517, 525, 544, 546, 585).
- **Total de hinos extraídos:** Exatamente 100 hinos (500 a 599).
- **Resultado no Catálogo:** O Hinário Novo passará de 499 para 599 hinos contínuos (1 a 599 sem nenhuma lacuna).

---

## 3. Padrão de Estrutura de Dados (`data/hinosData.json`)
Cada hino é estruturado sob `"novo"` com o seguinte formato:

```json
{
  "id": "500",
  "numero": 500,
  "titulo": "Comunhão com Ele",
  "categoria": "Hinário Novo",
  "estrofes": [
    "Ó Viajante estranho, vem,\nVou apegar-me inda a Ti;\n...",
    "..."
  ],
  "coro": "..." // Opcional, apenas quando presente explicitamente no livro
}
```

### Regras de Formatação e Qualidade:
1. `id`: string numérica (ex: `"500"`).
2. `numero`: inteiro correspondente (ex: `500`).
3. `titulo`: subseção temática ou título do hino, limpo de prefixos genéricos (`A EXPERIÊNCIA DE CRISTO - ` ou `A EXPERIÊNCIA DE DEUS - ` mantendo o subtema capitalizado como sentença/frase, ex: `"Comunhão com Ele"`, `"Permanecer Nele"`, `"Confiar Nele"`, `"Descansar Nele"`, `"Segui-Lo"`, `"Andar com Ele"`, `"Viver Nele"`, `"Expressá-Lo"`, `"Como a Boa Terra"`, `"Como o Pastor"`).
4. `categoria`: string fixa `"Hinário Novo"`.
5. `estrofes`: lista de estrofes com quebras de linha `\n`. Os numerais das estrofes (1, 2, 3...) são estritamente removidos do início dos versos.
6. `coro`: string com versos separados por `\n`.
7. `codificação`: UTF-8 sem BOM, preservando acentuação gráfica portuguesa (`á`, `â`, `ã`, `é`, `ê`, `í`, `ó`, `ô`, `õ`, `ú`, `ç`).

---

## 4. Arquitetura da Implementação
1. **Dados de OCR e Imagens:**
   - 75 páginas renderizadas em PNG em `scratch/images/` a 200 DPI.
   - OCR gerado via Windows Media OCR Engine em `scratch/ocr_results.json`.
2. **Módulos Estruturados por Lotes:**
   - `scripts/hinos_data_500_525.py` (Hinos 500 a 525)
   - `scripts/hinos_data_526_550.py` (Hinos 526 a 550)
   - `scripts/hinos_data_551_575.py` (Hinos 551 a 575)
   - `scripts/hinos_data_576_599.py` (Hinos 576 a 599)
3. **Auditoria Textual Automatizada:**
   - `scripts/audit_hinos_batch3.py` para verificar integridade, schema, numerais residuais, ortografia e consistência.
4. **Mesclagem e Verificação:**
   - `scripts/merge_hinos_novo_batch3.py` para mesclar ordenadamente no `data/hinosData.json`.
   - `scripts/verify_hinos_data_batch3.py` para testar o catálogo completo (1 a 599).
5. **Finalização e Git:**
   - Excluir os 75 arquivos PDF de `assets/pdfs/convert-to-text/`.
   - Commits granulares: `feat(hinario-novo): estruturar hinos 500 a 525 de PDFs`, etc.
   - Push para origin e instruções de PR upstream.
