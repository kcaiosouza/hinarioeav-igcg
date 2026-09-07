# Especificação de Design: Feedback de Busca em Toast e Limpeza Abaixo do Teclado

**Data:** 2026-09-07  
**Status:** Aprovado pelo usuário  

---

## 1. Contexto e Motivação
Atualmente, quando o usuário pesquisa um número de hino na tela inicial:
- Se o hino não estiver presente no hinário ativo, mas existir em outro hinário, o aplicativo exibia um componente `<ResultArea />` posicionado abaixo do teclado numérico (`<Keypad />`), empurrando a interface ou exigindo rolagem.
- O usuário solicitou explicitamente que **nada apareça abaixo do teclado** e que todos os alertas e avisos (como *"O hino nº X ainda não está no Y"* e *"Encontramos no Z: W"*) sejam exibidos como um **toast** no topo da tela.

---

## 2. Objetivos
- Remover completamente a renderização de elementos de resultado abaixo do teclado numérico na tela inicial.
- Excluir o componente `ResultArea.tsx` obsoleto.
- Aprimorar o componente `ToastNotice` para exibir tanto avisos informativos simples quanto sugestões com botão de ação para navegar ao livro sugerido.
- Manter a área de rolagem limpa e focada exclusivamente no mostrador (`DisplayArea`) e no teclado numérico (`Keypad`).

---

## 3. Arquitetura e Componentes

### 3.1 Atualização de `ToastNotice` (`components/hinario/ToastNotice.tsx`)
O componente `ToastNotice` recebe suporte opcional a `suggestion`:

```typescript
export interface ToastSuggestion {
  title: string;
  actionLabel: string;
  onAction: () => void;
}

export interface ToastNoticeProps {
  visible: boolean;
  bookName: string;
  message: string;
  suggestion?: ToastSuggestion;
  onClose: () => void;
  duration?: number;
}
```

#### Comportamento Visual e Interativo:
- **Posicionamento:** Flutuante no topo (`position: 'absolute'`, `top: 56`, `zIndex: 999`), acima dos demais elementos da tela.
- **Duração do timer:**
  - Aviso simples: 4000ms (4 segundos).
  - Aviso com sugestão: 7000ms (7 segundos), dando tempo adequado para leitura e clique.
- **Cabeçalho:** Nome do livro ativo e botão `✕` para dispensar a qualquer momento.
- **Mensagem principal:** Texto explicativo com cor `THEME_COLORS.cream` (ex: *"O hino nº 500 ainda não está no Hinário Antigo."*).
- **Bloco de Sugestão (quando presente):**
  - Fundo sutil `rgba(218, 215, 205, 0.08)` com borda fina `rgba(218, 215, 205, 0.35)` e raio de 12px.
  - Título da sugestão com cor `THEME_COLORS.sage` (ex: *"Encontramos no Hinário Novo: “Glória ao Redentor”"*).
  - Botão pílula com borda `THEME_COLORS.sage` e texto em destaque (ex: *"Ver no Hinário Novo"*).
  - Ao pressionar o botão de ação: dispara `suggestion.onAction()` e fecha o toast imediatamente.
- **Gesto de arrastar (PanResponder):** Manter o gesto de arrastar para cima para fechar imediatamente o toast.

### 3.2 Limpeza da Tela Principal (`app/index.tsx`)
- Remover a importação e a renderização do `<ResultArea />`.
- Deletar o arquivo [`components/hinario/ResultArea.tsx`](file:///C:/IGCGDev/igcghinario/components/hinario/ResultArea.tsx).
- O `ScrollView` conterá exclusivamente:
  ```tsx
  <ScrollView
    contentContainerStyle={styles.scrollContent}
    showsVerticalScrollIndicator={false}
    keyboardShouldPersistTaps="handled"
  >
    <DisplayArea value={currentNumber} />
    <Keypad
      onDigitPress={handleDigitPress}
      onBackPress={handleBackPress}
    />
  </ScrollView>
  ```
- **Fluxo de Busca (`handleSearch`):**
  - Se `result.type === "empty"`:
    - Exibe `ToastNotice` com `message = result.message` e `suggestion = undefined`.
  - Se `result.type === "found"`:
    - Fecha qualquer toast e navega para `/hino/[id]`.
  - Se `result.type === "suggestion"`:
    - Exibe `ToastNotice` com:
      - `bookName`: `result.activeBookName`
      - `message`: `O hino nº ${result.number} ainda não está no ${result.activeBookName}.`
      - `suggestion`:
        - `title`: `Encontramos no ${result.suggestedBookName}: “${result.title}”`
        - `actionLabel`: `Ver no ${result.suggestedBookName}`
        - `onAction`: Altera `activeKey` para `result.suggestedBookKey`, fecha o toast e navega diretamente para `/hino/[id]` correspondente.
- **Resets de Toast:** Ao digitar dígitos adicionais, apagar dígitos ou selecionar outra aba de livro, qualquer toast aberto é dispensado.

---

## 4. Plano de Testes e Critérios de Sucesso
1. **Busca com sugestão:** Digitar um número que só exista em outro livro.
   - O toast deve surgir com animação deslizante no topo.
   - O toast deve exibir o aviso e o card de sugestão com o botão "Ver no [Livro]".
   - A área abaixo do teclado deve permanecer totalmente vazia (nenhum card visível abaixo do teclado).
2. **Clique na sugestão:** Ao tocar no botão "Ver no [Livro]", o hinário ativo deve mudar para o sugerido e navegar direto para a página do hino com a letra correspondente.
3. **Busca vazia:** Digitar um número inexistente em qualquer livro. O toast simples informativo deve aparecer no topo.
4. **Fechamento:** O toast deve fechar automaticamente após o tempo limite, ou ao clicar no `✕`, ou ao deslizar para cima, ou ao digitar novo número.
