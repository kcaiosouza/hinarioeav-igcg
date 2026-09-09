# Design: Conversão dos PDFs do Hinário Novo para hinosData.json

## 1. Visão Geral
Este documento especifica o processo de extração, estruturação, validação e inserção dos hinos do **Hinário Novo** (faixa de números 300 a 400) contidos nos 71 arquivos PDF escaneados em `assets/pdfs/convert-to-text/` para o arquivo de dados central `data/hinosData.json`, sob a seção `novo`. Ao final da conversão e validação, os arquivos PDF serão removidos da pasta e as alterações mantidas na branch `feature/convert-hinario-novo-pdfs`.

---

## 2. Contexto e Descobertas do Projeto
- **Branch de Trabalho:** `feature/convert-hinario-novo-pdfs`.
- **Arquivos Fonte:** 71 arquivos PDF de página única em `assets/pdfs/convert-to-text/`, gerados via escaneamento de páginas do hinário físico.
- **Faixa dos Hinos:** Hinos número 300 a 400 do Hinário Novo.
- **Páginas com Múltiplos Hinos:** Diversas páginas contêm 2 ou 3 hinos (ex: 304/305, 307/308/309, 312/313, 314/315, 318/319/320, 327/328, 336/337, 342/343/344, 347/348, 351/352, 355/356, 363/364, 368/369, 370/371, 375/376, 378/379, 381/382, 385/386, 387/388, 391/392/393, 395/396).
- **Hinos em Múltiplas Páginas / Páginas Repetidas:** Scans 62 e 63 são capturas do hino 390; Scan 64 e 65 contêm a transição entre 391, 392 e 393.
- **Lacuna no Material Fornecido:** Hinos 316 e 317 não constam nas páginas digitalizadas (o escaneamento pula da página 261 para 264).

---

## 3. Formato e Padrão de Dados (`data/hinosData.json`)
Cada novo hino será registrado sob a chave `novo` em `data/hinosData.json`, com a seguinte estrutura:

```json
{
  "id": "300",
  "numero": 300,
  "titulo": "Tão grande salvação",
  "categoria": "Hinário Novo",
  "estrofes": [
    "Ah, se não fosse Tu em minha vida,\nAh, sem Teu sangue que me trouxe à luz,\nPaz não veria nem perdão teria,\nÓ meu Senhor Jesus.",
    "Só em Teu seio, tenho segurança,\nOh! Que consolo, gozo sem igual!\nSó Tu és minha firme confiança,\nÓ Rei celestial.",
    "Eu, vil, rebelde, não Te buscaria,\nSe não me amasses antes de eu nascer;\nTeu terno abraço conquistou-me um dia,\nNa divinal mercê.",
    "De coração, Te rendo muitas graças,\nOh! Quanta bênção deste-me, Jesus:\nPaz, comunhão e vida que não passa! -\nFrutos de Tua cruz."
  ],
  "coro": "..." // Opcional, presente apenas quando houver coro explícito
}
```

### Regras de Formatação:
- `id`: string com o número do hino (ex: `"300"`).
- `numero`: inteiro com o número do hino (ex: `300`).
- `titulo`: subseção temática extraída do cabeçalho do hino (ex: `"Tão grande salvação"`, `"Por Deus"`, `"Por obediência a Cristo"`, `"Diversos"`). Se houver apenas seção geral sem subseção (ex: `"ANELOS"` ou `"CONSAGRAÇÃO"`), o título será `"Anelos"` ou `"Consagração"`. O texto segue capitalização tipo frase (primeira letra maiúscula e restante minúsculo, exceto termos sagrados/próprios como *Deus*, *Jesus*, *Cristo*, *Senhor*, *Espírito*).
- `categoria`: string fixa `"Hinário Novo"`.
- `estrofes`: array de strings, onde cada estrofe tem seus versos separados por `\n`. Não deve conter os numerais de estrofe (1, 2, 3...) no corpo do texto.
- `coro`: string com os versos do coro separados por `\n`, caso exista coro.
- **Codificação:** UTF-8 sem BOM, preservando acentuação nativa em português sem caracteres corrompidos.

---

## 4. Pipeline de Processamento
1. **Renderização e OCR:**
   - Imagens renderizadas em alta resolução via `pymupdf`.
   - Extração via `Windows.Media.Ocr` em português (`pt-BR`) com coordenadas espaciais de linhas e palavras.
2. **Segmentação e Parsing de Hinos:**
   - Script em Python dedicado para decompor cada página nos respectivos hinos.
   - Detecção de limites de estrofes através das posições dos numerais e quebras de parágrafo.
   - Isolamento de coros (marcados no hinário com indicador de coro, recuo ou métrica).
3. **Revisão Textual:**
   - Correção de trocas comuns de OCR (`0h!` $\rightarrow$ `Oh!`, traços e pontuações).
   - Verificação visual de quaisquer trechos ambíguos contra os PNGs de alta resolução.
4. **Mesclagem no JSON:**
   - Carregamento de `data/hinosData.json`.
   - Inserção ordenada de todas as novas chaves sob `novo`.
   - Serialização com indentação padrão de 2 espaços e `ensure_ascii=False`.
5. **Validação:**
   - Script de teste automatizado confirmando que:
     - Todas as novas chaves existem em `novo`.
     - Todos os campos obrigatórios estão preenchidos e válidos.
     - Nenhuma estrofe está vazia.
     - Não há numerais de estrofe sobrando no início das linhas.
     - O JSON é 100% válido e legível.
6. **Limpeza e Commit:**
   - Exclusão de todos os 71 arquivos `.pdf` em `assets/pdfs/convert-to-text/`.
   - Remoção de arquivos intermediários do scratch.
   - Commit no git na branch `feature/convert-hinario-novo-pdfs`.
