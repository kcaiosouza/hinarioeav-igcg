# Especificação de Design: SideMenu (Drawer) & Telas Complementares

**Data**: 2026-09-06  
**Status**: Aprovado para Implementação  
**Escopo**: Menu Lateral (Drawer) com opções de navegação e rodapé institucional, além das telas dedicadas de Busca e Favoritos.

---

## 1. Visão Geral
Implementar um menu lateral deslizante (Drawer) que pode ser aberto a partir do botão hambúrguer na `TopBar`. O menu fornecerá acesso rápido para:
1. **Hinário** (tela inicial)
2. **Buscar** (`app/search.tsx`)
3. **Favoritos** (`app/favorites.tsx`)

Na base do menu lateral, haverá uma mensagem de créditos em tamanho pequeno:
```text
Desenvolvido com 💚
Igreja Em Campina Grande - PB
```

---

## 2. Componente `SideDrawer` (`components/hinario/SideDrawer.tsx`)

### 2.1. Estrutura e Dimensões
- **Overlay/Backdrop**: `rgba(0, 0, 0, 0.6)` com animação de fade in/out. Toque fecha o menu.
- **Painel Lateral**:
  - Largura: ~78% da tela (`maxWidth: 310px`).
  - Fundo: `#1b2b22` / `THEME_COLORS.bg` (`#263a30`).
  - Borda direita sutil em `THEME_COLORS.line` (`rgba(218, 215, 205, 0.12)`).
  - Animação: Desliza da esquerda para a direita (`translateX` de `-100%` para `0`).
  - Suporte a gesto de arrastar para fechar (swipe left).

### 2.2. Cabeçalho
- Título: "Menu" ou wordmark em `Fraunces_600SemiBold` 20px `cream`.
- Botão "X" de fechar no canto superior direito.

### 2.3. Itens de Menu
- Botões interativos com ícone + título:
  - `Hinário`: Ícone 📖, rota `/` (fecha o menu se já estiver na home).
  - `Buscar`: Ícone 🔍, rota `/search`.
  - `Favoritos`: Ícone ⭐, rota `/favorites`.
- Destaque sutil para a rota ativa atual.

### 2.4. Rodapé Institucional
- Fixado na base do painel (respeitando safe area):
  - Linha divisória fina em `THEME_COLORS.line`.
  - Linha 1: `Desenvolvido com 💚` em `Inter_500Medium`, 12px, cor `THEME_COLORS.muted` (`#b7c2ab`).
  - Linha 2: `Igreja Em Campina Grande - PB` em `Inter_400Regular`, 12px, cor `THEME_COLORS.mutedDim` (`#5c6c5f`).

---

## 3. Telas Complementares

### 3.1. Tela de Busca (`app/search.tsx`)
- Fundo `THEME_COLORS.bg` (`#263a30`).
- Barra de topo com botão voltar para a home e título "Buscar Hinos".
- Campo de busca por texto livre (título ou letra) com placeholder claro e ícone de lupa.
- Lista filtrada dos hinos disponíveis em tempo real com cards semelhantes aos da home.
- Toque em um item navega para `/hino/[id]`.

### 3.2. Tela de Favoritos (`app/favorites.tsx`)
- Fundo `THEME_COLORS.bg` (`#263a30`).
- Barra de topo com botão voltar para a home e título "Hinos Favoritos".
- Lista de hinos favoritados com numeração, título e hinário correspondente.
- Toque em um item navega para `/hino/[id]`.

---

## 4. Critérios de Aceite
1. O botão de menu na tela inicial (`TopBar`) abre o `SideDrawer` com animação fluida.
2. O `SideDrawer` fecha ao tocar no backdrop, no botão "X" ou em qualquer item de navegação.
3. O rodapé do `SideDrawer` exibe fielmente as duas linhas com o emoji do coração verde e o nome da igreja.
4. As opções "Buscar" e "Favoritos" abrem suas respectivas telas funcionais no mesmo tema floresta escuro.
5. `npm run typecheck` e `npx expo export --platform web` passam com 0 erros.
