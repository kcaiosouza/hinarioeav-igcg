# Especificação de Design: Persistência de Favoritos com AsyncStorage

**Data**: 2026-09-07  
**Status**: Aprovado para Implementação  
**Origem**: Solicitação do usuário para salvar e carregar os hinos favoritados via armazenamento local (localStorage / AsyncStorage).

---

## 1. Visão Geral
Atualmente, a tela `app/favorites.tsx` exibe dados mockados estáticos e a tela `app/hino/[id].tsx` possui um estado em memória volátil de favoritos.
O objetivo desta funcionalidade é persistir os hinos favoritados pelo usuário de forma durável entre sessões do aplicativo, funcionando offline no iOS, Android e Web.

---

## 2. Dependência e Armazenamento
- **Pacote**: `@react-native-async-storage/async-storage` (oficialmente recomendado para Expo SDK 57).
- **Chave de armazenamento**: `@igcg_hinario_favorites_v1`.
- **Estratégia**:
  - Armazenamento em JSON serializado no AsyncStorage.
  - No Web, opera diretamente sobre o `localStorage` do navegador.
  - No iOS e Android, opera sobre arquivos locais nativos/SQLite com alta performance e sem limite de 5MB do browser.

---

## 3. Modelo de Dados (`types/favorites.ts` ou `services/favoritesService.ts`)

```ts
export interface FavoriteItem {
  id: string;          // Chave única composta: `${bookKey}-${number}` (ex: "hinos-100", "canticos-5")
  number: string;      // Número do hino ("100")
  title: string;       // Título ("Grande é o Senhor")
  bookKey: BookKey;    // 'hinos' | 'canticos' | 'suplemento' | 'novo'
  bookName: string;    // 'Hinos' | 'Cânticos' | 'Suplemento' | 'Hinário Novo'
  addedAt: number;     // Timestamp de inclusão (Date.now()) para ordenação
}
```

---

## 4. Serviço de Favoritos (`services/favoritesService.ts`)
O serviço encapsula as operações de I/O e provê um padrão de emissão de eventos/assinantes simples para atualização reativa em tempo real:
- `getFavorites(): Promise<FavoriteItem[]>`: lê e faz parse da lista ordenada por `addedAt` decrescente.
- `isFavorite(bookKey: string, number: string | number): Promise<boolean>`: checa se o hino está favoritado.
- `addFavorite(item: Omit<FavoriteItem, 'id' | 'addedAt'>): Promise<FavoriteItem[]>`: adiciona novo favorito ao topo da lista, evitando duplicatas.
- `removeFavorite(id: string): Promise<FavoriteItem[]>`: remove o item pela chave única.
- `toggleFavorite(item: Omit<FavoriteItem, 'id' | 'addedAt'>): Promise<{ isFav: boolean; favorites: FavoriteItem[] }>`: alterna o status e retorna o novo estado.
- `subscribeFavorites(callback: (favorites: FavoriteItem[]) => void): () => void`: permite que telas inscritas atualizem seus estados imediatamente quando houver alteração em qualquer lugar do app.

---

## 5. Integração na Tela de Leitura (`app/hino/[id].tsx`)
- Mantém o botão de favoritar **dentro do menu de opções** (`HymnOptionsSheet`), conforme preferência do usuário.
- Ao carregar o hino ou ao navegar entre hinos via gesto/parâmetros:
  - Consulta assíncrona rápida a `isFavorite(currentBookKey, hino.numero)` para definir `isFavorite`.
- Ao acionar o botão de favoritar no menu:
  - Chama `toggleFavorite` com os dados do hino e do livro ativo.
  - Atualiza o estado `isFavorite` local.
  - Dispara o `Toast.show('Hino adicionado aos favoritos!')` ou `Toast.show('Hino removido dos favoritos')`.

---

## 6. Integração na Tela de Favoritos (`app/favorites.tsx`)
- Substitui o mock estático `INITIAL_FAVORITES` pelo carregamento real do AsyncStorage.
- Utiliza `useFocusEffect` e/ou a assinatura do serviço para recarregar automaticamente sempre que a tela ganhar foco.
- **Ações na lista:**
  - **Toque no card**: Navega para `app/hino/[id].tsx` com `{ id: item.number, book: item.bookKey, title: item.title }`.
  - **Botão de remover**: Executa `removeFavorite(item.id)`, removendo o item da lista visual e persistindo no storage com feedback `Toast`.
- **Estado Vazio**:
  - Exibe mensagem limpa *"Nenhum hino favoritado ainda"* com ícone e sugestão para favoritar hinos durante a leitura.

---

## 7. Critérios de Aceite
1. Instalação e compatibilidade do `@react-native-async-storage/async-storage` no Expo SDK 57 sem erros de build.
2. Favoritar um hino no menu de opções salva o hino no storage.
3. Ao fechar o app e reabrir, os hinos favoritados continuam listados em `app/favorites.tsx`.
4. Ao abrir a tela do hino já favoritado, o menu de opções reflete *"Remover dos Favoritos"* e a estrela preenchida.
5. Remover um favorito pela tela de favoritos ou pelo leitor sincroniza a persistência imediatamente.
6. `npm run typecheck` e `npx expo export --platform web` passam com 0 erros.
