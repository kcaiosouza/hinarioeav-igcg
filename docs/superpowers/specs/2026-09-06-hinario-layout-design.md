# Especificação de Design: Implementação do Layout de Hinário (hinario_app_v2.html)

**Data**: 2026-09-06  
**Status**: Aprovado para Planejamento  
**Origem**: `hinario_app_v2.html`

---

## 1. Visão Geral
O objetivo é reproduzir com fidelidade absoluta o design, a paleta de cores, a tipografia e a experiência interativa apresentada no protótipo `hinario_app_v2.html` dentro do aplicativo React Native (Expo v57). Nesta fase inicial, o foco é estruturar o layout, a navegação em tela única, os seletores, o teclado numérico customizado e a exibição de resultados com dados mockados.

---

## 2. Tokens de Design & Paleta de Cores

Todas as cores e variáveis visuais seguem estritamente os valores do protótipo:

| Token | Valor Hex/RGBA | Uso no App |
|---|---|---|
| `--bg` | `#263a30` | Fundo principal da aplicação |
| `--bg-page` | `#0e1712` | Fundo externo / bordas (ambiente web/safe area) |
| `--surface` | `#344E41` | Superfície de botões, containers e cards de resultado |
| `--surface-raised`| `#3A5A40` | Estado ativo/pressionado dos botões |
| `--gold` | `#5C7650` | Bordas e realces de destaque |
| `--gold-soft` | `#A3B18A` | Aba ativa do hinário e botão CTA principal "Buscar" |
| `--ink` | `#12201a` | Texto de alto contraste sobre fundos dourados claros |
| `--cream` | `#DAD7CD` | Cor principal de textos, títulos e números no display |
| `--muted` | `#b7c2ab` | Textos secundários, abas inativas e ícones neutros |
| `--muted-dim` | `#5c6c5f` | Cor do placeholder ("Nº do hino") |
| `--line` | `rgba(218, 215, 205, 0.12)` | Linhas de borda e divisórias sutis |
| `--sage` | `#DAD7CD` | Destaques sutis em cartões de sugestão |

---

## 3. Tipografia

O design depende de duas famílias tipográficas que serão carregadas através dos pacotes oficiais do Expo Google Fonts:
1. **Fraunces** (`@expo-google-fonts/fraunces`):
   - `Fraunces_600SemiBold`, `Fraunces_700Bold`
   - Usada em: Wordmark "Hinário", letras das abas (H, C, S, N), display numérico de 56px, nome do livro ativo e títulos dos hinos.
2. **Inter** (`@expo-google-fonts/inter`):
   - `Inter_400Regular`, `Inter_500Medium`, `Inter_600SemiBold`, `Inter_700Bold`
   - Usada em: Botões do teclado numérico (21px), botão de busca CTA (16px bold), textos explicativos e cards informativos.

---

## 4. Arquitetura de Telas & Navegação

### 4.1. Navegação Raiz (`app/_layout.tsx`)
- Carregamento de fontes (`useFonts`) mantendo o splash screen até a conclusão.
- `StatusBar` configurado em `style="light"`.
- Stack de rotas:
  - `index`: Tela principal com `headerShown: false`.
  - `hino/[id]`: Tela de detalhe da letra com `headerShown: false` ou header customizado no mesmo tema escuro floresta.
  - Ocultação da barra de abas inferior antiga em favor da experiência de tela única com menu superior.

### 4.2. Tela Principal (`app/index.tsx`)
Composta pelos seguintes blocos modulares:

1. **TopBar**:
   - Botão de menu (hambúrguer) à esquerda: tamanho 38x38, cantos arredondados (12px), fundo `surface`, borda `line`.
   - Wordmark central: "Hinário" com fonte `Fraunces` 21px `cream`.
   - Espaçador à direita: 38x38 transparente para equilíbrio visual.
2. **BookSelect (Seletor Segmentado)**:
   - Container grid com 4 abas: `H` (Hinos), `C` (Cânticos), `S` (Suplemento), `N` (Hinário Novo).
   - Estilização ativa: fundo `gold-soft`, texto `ink`.
   - Estilização inativa: fundo transparente, texto `muted`.
3. **ActiveBookRow**:
   - Exibição centralizada do nome do livro ativo em `Fraunces` 15px `gold-soft`.
   - Ícone de lápis / renomear quando a aba `N` estiver ativa.
   - Permite alterar o nome do hinário novo inline com confirmação.
4. **DisplayArea**:
   - Exibe o número digitado em `Fraunces` 56px `cream`.
   - Se nenhum número tiver sido digitado, exibe placeholder `"Nº do hino"` em `Inter` 19px `muted-dim`.
5. **Keypad (Teclado Numérico)**:
   - Grade 3x4 contendo dígitos de 1 a 9, 0, botão de backspace com ícone SVG estilizado e borda tracejada, e um espaçador vazio.
   - Proporção e espaçamentos idênticos ao CSS original (raio de 18px, aspecto ~1:0.82, espaçamento 12px).
   - Limite de entrada de até 4 dígitos.
6. **Botão de Busca (CTA)**:
   - Botão com largura total, formato de pílula (`borderRadius: 100`), fundo `gold-soft`, texto em `Inter` 16px bold `ink`.
7. **ResultArea (Área de Resultados Dinâmicos)**:
   - Card de sucesso: exibe livro + número ("Hinos · hino 124") e título em `Fraunces` 18px. Ao pressionar, abre `/hino/[id]`.
   - Card de sugestão inteligente (quando em "Hinário Novo" e o hino existir em livro anterior): exibe aviso de ausência no Novo + sugestão com botão de ação rápida "Ver no [Livro]".
   - Card de aviso vazio: "Digite o número do hino para buscar" ou "Não encontramos o hino nº X neste hinário".

---

## 5. Tela de Leitura da Letra (`app/hino/[id].tsx`)

- Fundo `#263a30`.
- Topbar com botão voltar personalizado em `surface` e título do hino.
- Categoria do hino em destaque suave.
- Título do hino em `Fraunces` 24px `cream`.
- Estrofes em `Inter` com espaçamento confortável e ajuste de tamanho de fonte (`A-` / `A+`).
- Coro estilizado em caixa com destaque visual na tonalidade `surface` e borda `gold-soft`.

---

## 6. Dados Mockados

Estrutura inicial de dados sincronizada com `hinario_app_v2.html` e expandida para suporte a testes:
- **Hinos**:
  - 1: "Chuvas de Bênçãos"
  - 124: "Grande é o Senhor"
- **Cânticos**:
  - 7: "Deus é Amor"
  - 200: "Vaso de Barro"
- **Suplemento**:
  - 45: "Ainda que a Figueira"
  - 82: "Digno é o Senhor"
- **Hinário Novo**:
  - 1: "Chuvas de Bênçãos"
  - 7: "Deus é Amor"
  - 124: "Grande é o Senhor"
  - 200: "Vaso de Barro"
  - 300: "Ele é Fiel"

---

## 7. Critérios de Aceite
1. O layout na tela inicial deve replicar as cores, bordas, raios e proporções de `hinario_app_v2.html`.
2. As fontes `Fraunces` e `Inter` devem renderizar corretamente sem quebras ou desalinhamentos.
3. A digitação pelo teclado numérico customizado e a tecla backspace devem atualizar o visor em tempo real.
4. A troca de abas deve atualizar o nome ativo e limpar/atualizar a busca.
5. A busca deve exibir os cards de resultado correspondentes e suportar o redirecionamento sugerido caso o hino pertença a outro livro quando buscado no Novo.
6. Ao clicar em um hino encontrado, a tela de leitura de letra deve abrir no mesmo padrão estético.
