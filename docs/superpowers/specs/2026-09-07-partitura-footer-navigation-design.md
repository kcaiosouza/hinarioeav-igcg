# Design Spec: Navegação por Rodapé na Tela de Partituras

## 1. Visão Geral
Adicionar um rodapé fixo minimalista com botões de navegação (setas nas extremidades esquerda e direita) na tela de visualização de partituras (`app/partitura.tsx`), permitindo que o usuário avance ou retroceda sequencialmente entre os hinos do hinário selecionado.

## 2. Requisitos e Comportamento

### 2.1 Requisitos Funcionais
1. **Navegação Sequencial**:
   - Botão Esquerdo (Anterior): Ao ser tocado, navega para o hino anterior (`numero - 1`) dentro do mesmo livro (`book`).
   - Botão Direito (Próximo): Ao ser tocado, navega para o próximo hino (`numero + 1`) dentro do mesmo livro (`book`).
2. **Resolução de Hino e Partitura**:
   - O título correspondente ao número alvo é obtido através de `getHino(book, targetNumber)` ou `getBookTitles(book)`.
   - A partitura correspondente é recuperada através de `getPartitura(book, targetNumber)`.
   - Caso o hino alvo não possua partitura cadastrada, o visualizador exibe o estado padrão "Partitura não disponível", mantendo o rodapé visível para permitir a continuação da navegação.
3. **Controle de Limites (Boundaries)**:
   - Se o hino atual for o primeiro hino existente do livro (ex.: hino 1), o botão da esquerda é desabilitado (`disabled: true`, opacidade reduzida a 0.25).
   - Se o hino atual for o último hino existente do livro (ex.: maior número cadastrado em `getBookTitles(book)`), o botão da direita é desabilitado (`disabled: true`, opacidade reduzida a 0.25).
4. **Sincronização de Estado e Visualização**:
   - Ao trocar de hino, a rota do Expo Router é atualizada com `router.setParams({ hinoNumero: String(novoNumero), hinoTitulo: novoTitulo, book })`.
   - A rolagem vertical do `ScrollView` das partituras é resetada para o topo (`y: 0, animated: false`).

### 2.2 Requisitos Visuais (UI/UX)
1. **Barra de Rodapé**:
   - Posicionamento fixo na base da tela (`SafeAreaView`), imediatamente abaixo do `viewerContainer`.
   - Altura de ~56px a 60px.
   - Fundo com cor do tema `THEME_COLORS.surface` (`#344E41`).
   - Borda superior com cor `THEME_COLORS.line` (`rgba(218,215,205,0.12)`).
   - Espaçamento horizontal interno (`paddingHorizontal: 20`).
2. **Botões nas Extremidades**:
   - Layout com `flexDirection: "row"`, `justifyContent: "space-between"`, `alignItems: "center"`.
   - Botão Esquerdo: Ícone chevron-left SVG, traço `THEME_COLORS.cream` (`#DAD7CD`).
   - Centro: Área vazia flexível (`flex: 1`), mantendo o design limpo e sem poluição visual.
   - Botão Direito: Ícone chevron-right SVG, traço `THEME_COLORS.cream` (`#DAD7CD`).
   - Área de toque mínima de 44x44px em `Pressable`, com feedback visual ao pressionar (`opacity: 0.7` ou fundo destacado).

## 3. Arquitetura e Componentes Impactados
- **`app/partitura.tsx`**:
  - Inclusão de referências de scroll (`useRef<ScrollView>`).
  - Funções auxiliares de navegação (`handlePrevHymn`, `handleNextHymn`).
  - Renderização do componente `<View style={styles.footerBar}>` contendo os botões de navegação.
- **`data/hinosRepository.ts`**:
  - Uso das funções existentes `getBookTitles` e `getHino` para verificação de limites e metadados do hino.

## 4. Testes e Validação
1. **TypeScript Typecheck**:
   - Executar `npm run typecheck` garantindo 0 erros de compilação.
2. **Casos de Teste Manuais**:
   - Abrir hino 1 de Hinos: verificar se botão Anterior está desabilitado e Próximo ativo.
   - Navegar do hino 1 para o hino 2: verificar transição suave da partitura e atualização do cabeçalho.
   - Navegar até o último hino: verificar desabilitação do botão Próximo.
   - Testar navegação em hino sem partitura: verificar que a mensagem de "não disponível" aparece e o footer continua operacional.
