# Especificação de Design: Seleção de Letras e Cópia Completa do Hino

**Data:** 10/10/2026  
**Status:** Aprovado  
**Branch:** `feat/selectable-lyrics`  

---

## 1. Contexto e Motivação

Atualmente, na tela de detalhes do hino (`app/hino/[id].tsx`), a propriedade `selectable` foi adicionada em `<Text>` no título, estrofes e coro. No entanto, dois problemas impedem a experiência ideal do usuário:

1. **Bloqueio do Marcador Nativo de Seleção:**
   - O `PanResponder` na tela principal está configurado com `onShouldBlockNativeResponder: () => true` e `onMoveShouldSetPanResponderCapture`, o que bloqueia o responder nativo de seleção de texto no Android/iOS e faz com que o arrasto lateral dos pinos de seleção (marcadores) seja interceptado pelo gesto de troca de hino.
2. **Seleção de Metadados Indesejados:**
   - Se todo o texto do hino fosse unificado em um único nó, rótulos como `"Estrofe 1"` e `"CORO"` seriam selecionados junto com a letra, sujando a cópia. Mantendo a seleção por estrofe/seção, apenas os versos reais do hino são marcados.
3. **Cópia do Hino Completo:**
   - Para usuários que desejam copiar o hino inteiro de uma só vez (sem precisar arrastar marcadores estrofe por estrofe), é conveniente ter uma ação dedicada de "Copiar Letra do Hino" diretamente no menu de opções (`HymnOptionsSheet`).

---

## 2. Arquitetura e Solução Proposta

### 2.1. Desbloqueio e Otimização dos Marcadores de Seleção (`app/hino/[id].tsx`)
- **Liberação de Responders Nativos:**
  - Definir `onShouldBlockNativeResponder: () => false` no `PanResponder`. Isso garante que o sistema nativo do Android e do iOS consiga manipular os pinos/marcadores de seleção sem cancelamento pelo JavaScript.
  - Remover a captura prematura em `onMoveShouldSetPanResponderCapture` (retornar `false`), permitindo que gestos nos filhos (como o arrasto do marcador de texto) tenham prioridade. O `onMoveShouldSetPanResponder` padrão continuará tratando a troca de hino quando o toque for na área vazia da tela.
- **Destaque Visual (`selectionColor`):**
  - Aplicar `selectionColor="rgba(212, 175, 55, 0.45)"` (tom dourado suave alinhado a `THEME_COLORS.goldSoft`) nos nós `<Text selectable>` de título, estrofes e coro.
- **Isolamento de Rótulos:**
  - Manter os rótulos de estrofe (`Estrofe 1`, `Estrofe 2`, etc.) e do coro (`CORO`) como `<Text>` sem a propriedade `selectable`. Dessa forma, ao selecionar uma estrofe, apenas a poesia do hino é marcada.

### 2.2. Ação "Copiar Letra Completa" (`components/hinario/HymnOptionsSheet.tsx`)
- **Nova Opção no Menu:**
  - Inserir um botão no `HymnOptionsSheet`:
    - **Ícone:** Ícone de cópia (dois retângulos sobrepostos em SVG).
    - **Título:** "Copiar Letra do Hino"
    - **Subtítulo:** "Copiar o hino completo para a área de transferência"
  - **Prop no componente:** Adicionar `onCopyLyrics?: () => void` na interface `HymnOptionsSheetProps`.
- **Formatação Limpa da Letra (`utils/hymnDisplay.ts` ou helper dedicado):**
  - Gerar o texto limpo com:
    - Linha 1: `"{numero}. {titulo}"`
    - Linhas subsequentes: Estrofes separadas por linha em branco.
    - Coro destacado caso exista:
      ```text
      [Coro]
      Verso 1...
      Verso 2...
      ```
  - Copiar para o clipboard via `expo-clipboard` (`setStringAsync`).
  - Exibir feedback imediato ao usuário via `Toast.show("Letra do hino copiada!")`.

---

## 3. Dependências e Compatibilidade

- **`expo-clipboard`**: Adicionar a dependência oficial compatível com Expo SDK 57 (`~57.0.2`).
- Compatível com Android, iOS e Web.
- Não introduz quebra com gestos existentes (swipe para voltar e swipe para trocar de hino permanecem funcionando).

---

## 4. Critérios de Aceite e Verificação

1. **Marcador Nativo Funcional:**
   - Ao pressionar e segurar qualquer estrofe ou coro, o marcador nativo de seleção aparece.
   - É possível arrastar os pinos de seleção horizontalmente e verticalmente dentro da estrofe sem disparar troca de hino nem travamento.
2. **Rótulos Não Selecionáveis:**
   - Tocar ou selecionar próximo a "Estrofe 1" ou "CORO" não inclui esses termos na seleção de texto.
3. **Cópia do Hino Inteiro pelo Menu:**
   - Abrir o menu de 3 pontinhos (`Opções do Hino`).
   - Clicar em "Copiar Letra do Hino".
   - O menu fecha, o Toast "Letra do hino copiada!" é exibido, e o conteúdo na área de transferência contém o título e todas as estrofes com coro formatados.
4. **Build & Typecheck:**
   - Executar `npm run typecheck` sem erros de TypeScript.
