# Especificação de Design: HymnOptionsSheet (Bottom Drawer) na Tela de Leitura

**Data**: 2026-09-06  
**Status**: Aprovado para Implementação  
**Origem**: Solicitação de substituição dos botões A+/A- por menu de opções inferior (Bottom Sheet)

---

## 1. Visão Geral
Na tela de leitura da letra do hino (`app/hino/[id].tsx`), os botões de ajuste de fonte (`A-` e `A+`) no topo direito serão substituídos por um único botão com ícone de três pontos (`⋮` / `⋯`).
Ao clicar nesse botão, um Bottom Sheet (painel que sobe de baixo para cima) será exibido com:
1. **Controle de tamanho de fonte** (`A-` e `A+` com indicador do tamanho atual).
2. **Botão para favoritar / desfavoritar** o hino.
3. **Botão para visualizar a partitura** do hino.
4. **Botão especial com destaque visual**: *"Ouça esse hino no IGCGMusic"*.

---

## 2. Componente `HymnOptionsSheet` (`components/hinario/HymnOptionsSheet.tsx`)

### 2.1. Estrutura e Animações
- **Backdrop**: Fundo escuro semi-transparente (`rgba(0, 0, 0, 0.65)`) com animação de fade in/out.
- **Painel Inferior**:
  - `backgroundColor`: `#1b2b22` / `THEME_COLORS.surface` (`#344E41`).
  - `borderTopLeftRadius: 24`, `borderTopRightRadius: 24`.
  - `borderTopWidth: 1`, `borderColor: THEME_COLORS.line`.
  - `paddingHorizontal: 20`, `paddingBottom: safeArea.bottom + 16`.
  - Animação: Desliza da parte inferior (`translateY` de `+100%` para `0`).
  - Gesto de fechar: Suporta swipe down (arrastar para baixo), toque no backdrop ou toque no botão "X".

### 2.2. Conteúdo do Painel
1. **Puxador (Drag Handle)**:
   - Barra cinza sutil centralizada (`width: 40`, `height: 4`, `borderRadius: 2`, `backgroundColor: THEME_COLORS.mutedDim`).
2. **Cabeçalho**:
   - Título: "Opções do Hino" em `Fraunces_600SemiBold` 18px `THEME_COLORS.cream`.
   - Botão "X" circular/quadrado no canto direito para fechar.
3. **Controle de Tamanho da Fonte**:
   - Rótulo "Tamanho da fonte" em `Inter_500Medium` 15px `cream`.
   - Indicador de tamanho atual (ex: "18 pt") em `goldSoft`.
   - Botões compactos estilizados `A-` e `A+` com bordas sutis e limites (14px a 28px).
4. **Ação de Favoritar**:
   - Item com ícone de estrela ⭐ (preenchida se favorito, contorno se não favorito).
   - Rótulo dinâmico: *"Adicionar aos Favoritos"* ou *"Remover dos Favoritos"*.
5. **Ação de Partitura**:
   - Item com ícone de partitura 🎼 / 📄 *"Ver Partitura"*.
   - Aciona modal ou aviso informando a partitura disponível do hino.
6. **Card Prominente IGCGMusic**:
   - Fundo `THEME_COLORS.goldSoft` (`#A3B18A`), cantos arredondados (16px), padding confortável.
   - Ícone de fone/música 🎧▶️.
   - Título: *"Ouça esse hino no IGCGMusic"* em `Inter_700Bold` 15px na cor `THEME_COLORS.ink` (`#12201a`).
   - Subtítulo: *"Disponível na plataforma IGCGMusic"* em `Inter_500Medium` 12px `THEME_COLORS.ink`.

---

## 3. Tela de Leitura (`app/hino/[id].tsx`)
- Topbar:
  - Botão de voltar à esquerda.
  - Título centralizado ("Hino [N]").
  - Botão de três pontos (`⋮`) à direita acionando `isOptionsOpen = true`.
- Estado de favorito mantido na sessão e sincronizado.

---

## 4. Critérios de Aceite
1. O botão de três pontos substitui perfeitamente `A-`/`A+` na barra de topo da leitura do hino.
2. O `HymnOptionsSheet` abre com animação fluida de baixo para cima e fecha ao tocar no backdrop, no X ou ao arrastar para baixo.
3. O controle de tamanho altera a fonte das estrofes e coro em tempo real.
4. O botão de favoritar alterna o status com feedback visual imediato.
5. O botão da partitura exibe aviso/modal do recurso.
6. O card especial "Ouça esse hino no IGCGMusic" tem destaque visual diferenciado com tipografia e cores conforme planejado.
7. `npm run typecheck` e `npx expo export --platform web` passam com 0 erros.
