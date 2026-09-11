# Expo HAS CHANGED

Read the exact versioned docs at https://docs.expo.dev/versions/v57.0.0/ before writing any code.

---

# GITHUB

Quando for realizar uma nova demanda, seguir o seguinte passo-a-passo rigoroso no git:

```text
1. Crie uma branch com base na main atualizada: git checkout -b feat/nome-da-demanda
2. Realize a demanda de forma modular
3. Commit as changes de forma granularizada, seguindo o padrão: tipo(contexto): descrição
   Exemplos:
     - feat(hinario-novo): estruturar hinos 600 a 625 de PDFs
     - feat(catalog): subir 2 patches de versao para 1.0.4 apos adicao de hinos
     - docs(readme): atualizar progresso do Hinário Novo para 700 de 1100 hinos
4. Faça o push para o meu repositório: git push -u origin feat/nome-da-demanda
5. Abra um PR para o repositório Upstream
```

---

# 🚀 GUIA OPERACIONAL: CONVERSÃO DE HINOS EM LOTE (HINÁRIO NOVO / PDFS)

Este guia sintetiza as melhores práticas, regras e padrões validados para converter lotes de PDFs de hinos sem travamentos, sem lentidão e com 100% de precisão textual.

## 1. Princípios Fundamentais e Arquitetura de Execução

1. **SEMPRE USAR SUBAGENTES EM PARALELO:**
   - **Nunca** processe dezenas de hinos de forma sequencial na sessão principal. O acúmulo de contexto torna comandos simples (como `git status` ou chamadas de ferramenta) extremamente lentos e provoca erros de autenticação (`401`) e timeouts.
   - Divida o lote em blocos de **25 hinos** (ex.: 701-725, 726-750, 751-775, 776-800).
   - Dispare os subagentes em paralelo com uma única chamada `invoke_subagent`.

2. **REGRA DE OURO ANTI-GARGALO (IMAGENS E CONTEXTO LEVE):**
   - **PROIBIDO** usar `view_file` diretamente em imagens PNG pesadas (200 DPI / 3000px). Isso sobrecarrega a janela de contexto do subagente instantaneamente.
   - **Estratégia correta:** O agente coordenador pré-extrai o OCR de todos os scans usando o Windows Media OCR (`Windows.Media.Ocr`) via PowerShell para um arquivo `.txt` leve em `scratch/scans_XXX_YYY.txt`. Os subagentes leem apenas texto puro.

3. **FONTE DA VERDADE ABSOLUTA (TEXTO EM PORTUGUÊS):**
   - A única verdade oficial é o **texto em português escaneado dos PDFs físicos**.
   - **NÃO TRADUZIR DO INGLÊS:** Os hinos em português no Brasil têm métrica, rimas, adaptações poéticas e estrofes próprias consagradas pela igreja ao longo de décadas. Traduzir do inglês adulteraria o hinário oficial.
   - **Consultar o `data/hinosData.json` primeiro:** Muitos hinos do Hinário Novo coincidem com hinos já existentes em outras seções (`hinos`, `canticos`, `suplemento`). Se encontrar um hino idêntico, use-o como gabarito de acentuação e pontuação.

4. **TRATAMENTO DE RUÍDO E VAZAMENTO DE TINTA (BLEED-THROUGH):**
   - Se o scan tiver sombra ou texto do verso vazado dificultando o OCR:
     a) Crie um script rápido em `scratch/` usando **Pillow (PIL)** para recortar **apenas** o retângulo exato daquela linha e aplicar aumento de contraste/threshold binário;
     b) Ou busque a frase exata em português na web/Google (ex.: `"De Tuas mãos vem meu quinhão"`) para conferir a letra oficial idêntica.

5. **MONITORAMENTO ATIVO DE SUBAGENTES:**
   - Monitore o progresso checando os arquivos gerados e o tamanho do transcript.
   - Se um subagente começar a demorar em comandos simples (mais de 1 minuto por passo), encerre-o (`manage_subagents kill`), compacte o contexto com o que já foi feito e inicie um novo com instruções focadas apenas nos hinos restantes.

---

## 2. Padrão Estrito dos Dados (`scripts/hinos_data_XXX_YYY.py`)

Cada arquivo de lote deve exportar um dicionário `HINOS_XXX_YYY`:

```python
# -*- coding: utf-8 -*-
"""
Hinos 701 a 725 do Hinário Novo.
"""

HINOS_701_725 = {
    "701": {
        "id": "701",
        "numero": 701,
        "titulo": "Pela graça de Deus",  # Sentence case, SEM categoria genérica ("O CONSOLO NAS PROVAÇÕES - ")
        "categoria": "Hinário Novo",
        "estrofes": [
            "Primeiro verso da estrofe 1\nSegundo verso da estrofe 1",
            "Primeiro verso da estrofe 2\nSegundo verso da estrofe 2"
        ],
        "coro": "Verso 1 do coro\nVerso 2 do coro"  # Opcional, apenas quando houver coro explícito
    }
}
```

### Regras de Formatação Textual:
* **Sem numerais iniciais:** Remova estritamente numerais no início de estrofes ou versos (`"1 "`, `"2."`, etc.).
* **Sem métricas poéticas nem autores:** Remova indicações como `8.7.8.7.`, `D.C.`, e notas de rodapé de autoria.
* **Títulos limpos:** Remova prefixos genéricos em caixa alta (ex.: `"A EXPERIÊNCIA DE DEUS - "`, `"O CONSOLO NAS PROVAÇÕES - "`), mantendo o subtítulo temático capitalizado em estilo frase (ex.: `"Pelo amor do Senhor"`).
* **UTF-8 sem BOM:** Garanta codificação UTF-8 pura.

---

## 3. Template de Prompt para Disparo de Subagentes

Ao disparar um subagente para uma faixa (ex.: 701 a 725), use o prompt estruturado abaixo:

```text
Você é o subagente especializado responsável por implementar a estruturação dos Hinos {START} a {END} (exatamente {COUNT} hinos) no arquivo scripts/hinos_data_{START}_{END}.py.

DIRETRIZES CRÍTICAS ANTI-GARGALO:
1. NÃO use a ferramenta view_file em imagens PNG pesadas! Isso sobrecarrega o contexto e gera travamentos e erros de autenticação (401).
2. A verdade absoluta de cada hino é o texto em português escaneado dos PDFs. NÃO traduza do inglês nem invente letras.
3. Leia o texto OCR já extraído disponível no arquivo de texto leve:
   scratch/scans_{START}_{END}.txt
4. Dica: Consulte data/hinosData.json para verificar se a letra coincide com hinos existentes em 'hinos', 'canticos' ou 'suplemento'.
5. Tratamento de ruído: Se houver linhas com vazamento de verso (bleed-through), crie um script rápido em scratch/ com Pillow (PIL) para recortar APENAS aquele retângulo de coordenadas específico da imagem e aplicar contraste/threshold, ou pesquise a frase exata em português na web.
6. Formato exigido:
   Siga como referência scripts/hinos_data_626_650.py.
   - "id": string numérica (ex: "{START}")
   - "numero": inteiro (ex: {START})
   - "titulo": subtema sem prefixo de categoria em maiúsculas, em sentence case (ex: "Pela direção do Senhor")
   - "categoria": "Hinário Novo"
   - "estrofes": lista de strings com versos separados por \n. REMOVA numerais iniciais (1, 2, 3...). Descarte métricas e notas de autores.
   - "coro": string com versos separados por \n (apenas se houver coro explícito).
7. Salve em:
   scripts/hinos_data_{START}_{END}.py com o dicionário HINOS_{START}_{END}.
8. Valide rodando:
   python -c "from scripts.hinos_data_{START}_{END} import HINOS_{START}_{END}; assert len(HINOS_{START}_{END}) == {COUNT}; assert all(k in HINOS_{START}_{END} for k in map(str, range({START}, {END} + 1))); print('TESTE PASSOU COM SUCESSO')"
9. NÃO execute git commit. Apenas retorne a confirmação dos testes.
```

---

## 4. Checklist do Fluxo de Conclusão do Lote

Ao finalizar todos os lotes de hinos de uma demanda:

1. **Commitar os lotes de hinos:**
   `feat(hinario-novo): estruturar hinos XXX a YYY de PDFs`
2. **Executar Auditoria Textual:**
   Criar e rodar `scripts/audit_hinos_batchX.py` (verificando os 101 hinos, checando numerais residuais, títulos e campos vazios).
   `feat(hinario-novo): adicionar script de auditoria textual para o lote X`
3. **Commitar Scripts de Mesclagem e Verificação:**
   `feat(hinario-novo): criar scripts de mesclagem e verificacao do lote X`
4. **Mesclar no `data/hinosData.json` e Excluir PDFs:**
   - Rodar script de mesclagem (ordenando numericamente as chaves).
   - Rodar script de verificação (confirmando total de hinos em `novo` e integridade das demais coleções).
   - Deletar os PDFs convertidos em `assets/pdfs/convert-to-text/*.pdf`.
   - `feat(hinario-novo): mesclar hinos XXX a YYY no hinosData.json e remover PDFs`
5. **Atualizar Versão do Catálogo (`data/catalogVersion.json`):**
   - Incrementar **2 patches** na versão (ex.: `1.0.2` -> `1.0.4`).
   - Atualizar data ISO e descrição.
   - `feat(catalog): subir 2 patches de versao para X.Y.Z apos adicao de hinos`
6. **Atualizar `README.md`:**
   - Atualizar a contagem do Hinário Novo na tabela de Hinários Disponíveis (ex.: `(700/1100)`).
   - Atualizar a contagem no Roadmap.
   - `docs(readme): atualizar progresso do Hinário Novo para XXX de 1100 hinos`
7. **Push e PR:**
   - `git push -u origin feat/nome-da-branch`
   - Abrir o PR para o repositório Upstream.