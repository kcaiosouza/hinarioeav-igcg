# Design: Conversão dos PDFs do Hinário Novo (Hinos 600 a 700) para hinosData.json

## 1. Visão Geral
Este documento especifica a extração, estruturação modular, auditoria de fidelidade poética/textual e inserção dos hinos de número **600 a 700** do **Hinário Novo** a partir dos 90 arquivos PDF escaneados em `assets/pdfs/convert-to-text/` no catálogo central `data/hinosData.json` sob a chave `"novo"`.

Após validação automatizada e regressiva completa:
- Os 90 arquivos PDF em `assets/pdfs/convert-to-text/` serão excluídos.
- As alterações serão commitadas na branch `feat/hinario-novo-600-700` seguindo o padrão de commits atômicos e convencionais de `AGENTS.md`.
- As alterações serão enviadas (push) ao repositório remoto origin e será aberto/orientado o Pull Request para o repositório upstream.

---

## 2. Escopo e Mapeamento
- **Branch:** `feat/hinario-novo-600-700` (criada com base na `main` atualizada).
- **Entrada:** 90 arquivos PDF de página única escaneados em `assets/pdfs/convert-to-text/`.
- **Faixa de Hinos:** Hinos **600 a 700** (total de 101 hinos contínuos).
- **Destino:** Objeto sob a chave `"novo"` no arquivo `data/hinosData.json`.
- **Resultado no Catálogo:** O Hinário Novo passará de 599 hinos para **700 hinos** ininterruptos (chaves `"1"` a `"700"` ordenadas numericamente).

---

## 3. Estrutura de Dados e Padrão de Formatação

Cada hino inserido sob a coleção `"novo"` obedece rigorosamente ao seguinte schema JSON:

```json
{
  "id": "600",
  "numero": 600,
  "titulo": "Seu plano eterno",
  "categoria": "Hinário Novo",
  "estrofes": [
    "Grandioso Deus! Eterno, majestoso!\nTão glorioso Deus, porém, solitário;\n...",
    "..."
  ],
  "coro": "..." // Opcional: incluído somente quando há refrão/coro explícito
}
```

### Regras de Qualidade e Higienização Textual:
1. `id`: String numérica representando o número do hino (ex: `"600"`, `"601"`, ..., `"700"`).
2. `numero`: Inteiro idêntico ao `id` numérico (ex: `600`).
3. `titulo`: Subtema ou título específico limpo de prefixos genéricos de seções (ex: `A EXPERIÊNCIA DE DEUS - `, `O CONSOLO NAS PROVAÇÕES - `, `ENCORAJAMENTO - `, `GLORIAR-SE NA CRUZ - `, `O CAMINHO DA CRUZ - `), mantendo o subtema capitalizado em estilo sentença/frase (ex: `"Seu plano eterno"`, `"Pelo nome do Senhor"`, `"Ganho por meio de perda"`).
4. `categoria`: String fixa `"Hinário Novo"`.
5. `estrofes`: Lista (`array`) de strings com os versos separados por quebras de linha `\n`. Numerais no início das estrofes (`1 `, `2 `, `3 `...) são estritamente removidos.
6. `coro`: String opcional com versos separados por `\n`.
7. `codificação`: UTF-8 sem BOM, preservando integralmente diacríticos e acentuação gráfica da língua portuguesa (`á`, `â`, `ã`, `é`, `ê`, `í`, `ó`, `ô`, `õ`, `ú`, `ç`).
8. `metadados poéticos`: Métrica poética e notas de rodapé de autores/tradução presentes nos escaneamentos não entram nas estrofes.

---

## 4. Arquitetura da Solução

Para garantir isolamento, reprodutibilidade e evitar travamentos:

### 4.1 Módulos de Dados Isolados
Os 101 hinos serão divididos em 4 módulos independentes em `scripts/`:
- `scripts/hinos_data_600_625.py`: Contém os hinos 600 a 625 (26 hinos).
- `scripts/hinos_data_626_650.py`: Contém os hinos 626 a 650 (25 hinos).
- `scripts/hinos_data_651_675.py`: Contém os hinos 651 a 675 (25 hinos).
- `scripts/hinos_data_676_700.py`: Contém os hinos 676 a 700 (25 hinos).

### 4.2 Script de Auditoria Automatizada (`scripts/audit_hinos_batch4.py`)
Valida os 101 hinos antes de qualquer gravação no `data/hinosData.json`:
- Verifica se todos os números de 600 a 700 existem e não há duplicatas.
- Testa regex contra numerais residuais no início de cada verso/estrofe.
- Valida tipos e integridade dos campos (`id`, `numero`, `titulo`, `categoria`, `estrofes`, `coro`).
- Detecta possíveis caracteres inválidos ou corrompidos de OCR.

### 4.3 Script de Mesclagem Segura (`scripts/merge_hinos_novo_batch4.py`)
- Cria cópia física de backup (`data/hinosData.json.bak`).
- Carrega o JSON principal e injeta as novas chaves `"600"` a `"700"`.
- Reordena todas as chaves de `"novo"` numericamente de 1 a 700.
- Grava o arquivo com formatação consistente (indentação de 2 espaços e codificação UTF-8 sem BOM).

### 4.4 Script de Verificação Regressiva (`scripts/verify_hinos_data_batch4.py`)
- Confere se as outras categorias (`hinos`, `canticos`, `suplemento`, `diversos`) mantiveram suas quantidades exatas de itens e chaves.
- Confere se a categoria `"novo"` totaliza exatamente 700 hinos sem lacunas.

### 4.5 Limpeza Final
- Exclusão dos 90 arquivos PDF de `assets/pdfs/convert-to-text/`.
- Remoção do backup local `.bak` após validação bem-sucedida.

---

## 5. Estratégia de Commits Granulares (AGENTS.md)
Todos os commits seguirão a convenção `tipo(contexto): descrição`:
1. `docs(hinario-novo): registrar plano e especificacao da conversao de hinos 600 a 700`
2. `feat(hinario-novo): estruturar hinos 600 a 625 de PDFs`
3. `feat(hinario-novo): estruturar hinos 626 a 650 de PDFs`
4. `feat(hinario-novo): estruturar hinos 651 a 675 de PDFs`
5. `feat(hinario-novo): estruturar hinos 676 a 700 de PDFs`
6. `feat(hinario-novo): criar scripts de auditoria, mesclagem e verificacao do lote 4`
7. `feat(hinario-novo): mesclar hinos 600 a 700 no hinosData.json e remover PDFs`
