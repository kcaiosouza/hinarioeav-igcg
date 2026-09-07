# Plano de Implementação: Persistência de Favoritos com AsyncStorage

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implementar a persistência durável dos hinos favoritados utilizando AsyncStorage no Expo SDK 57, permitindo salvar pelo menu de opções do leitor e consultar/gerenciar na tela de favoritos.

**Architecture:** Módulo de serviço desacoplado (`services/favoritesService.ts`) que gerencia a serialização em AsyncStorage com chave prefixada, cache em memória e pub/sub de ouvintes para atualização de estado reativa entre telas (`app/hino/[id].tsx` e `app/favorites.tsx`).

**Tech Stack:** React Native 0.86, Expo SDK 57, TypeScript, `@react-native-async-storage/async-storage`.

---

## File Structure

- **New Files**:
  - `services/favoritesService.ts`: Serviço com métodos CRUD e pub/sub de favoritos.
- **Modified Files**:
  - `package.json`: Adição de `@react-native-async-storage/async-storage`.
  - `app/hino/[id].tsx`: Consulta de status e toggle de favorito conectado ao serviço.
  - `app/favorites.tsx`: Carregamento dinâmico dos favoritos do storage com remoção e navegação.

---

## Tasks

### Task 1: Instalação do AsyncStorage e Criação do `services/favoritesService.ts`
- [ ] Instalar `@react-native-async-storage/async-storage` via `npx expo install @react-native-async-storage/async-storage`.
- [ ] Criar `services/favoritesService.ts` com a interface `FavoriteItem`:
  ```ts
  export interface FavoriteItem {
    id: string; // `${bookKey}-${number}`
    number: string;
    title: string;
    bookKey: BookKey;
    bookName: string;
    addedAt: number;
  }
  ```
- [ ] Implementar funções:
  - `getFavorites(): Promise<FavoriteItem[]>`
  - `isFavorite(bookKey: string, number: string | number): Promise<boolean>`
  - `addFavorite(item: Omit<FavoriteItem, 'id' | 'addedAt'>): Promise<FavoriteItem[]>`
  - `removeFavorite(id: string): Promise<FavoriteItem[]>`
  - `toggleFavorite(item: Omit<FavoriteItem, 'id' | 'addedAt'>): Promise<{ isFav: boolean; favorites: FavoriteItem[] }>`
  - `subscribeFavorites(listener: (favorites: FavoriteItem[]) => void): () => void`
- [ ] Executar `npm run typecheck` para assegurar que não há erros de compilação.
- [ ] Commitar: `feat: install async-storage and create favoritesService`.

### Task 2: Integração de Favoritos na Tela do Hino (`app/hino/[id].tsx`)
- [ ] Importar `isFavorite` e `toggleFavorite` de `services/favoritesService.ts`.
- [ ] No `HinoDetailScreen`:
  - Efeito assíncrono para verificar se o hino exibido está favoritado via `isFavorite(currentBookKey, hino.numero)`.
  - Atualizar a função `handleToggleFavorite`:
    ```ts
    const handleToggleFavorite = async () => {
      if (!hino) return;
      const res = await toggleFavorite({
        number: String(hino.numero),
        title: hino.titulo,
        bookKey: currentBookKey,
        bookName: INITIAL_BOOKS[currentBookKey]?.name || 'Hinos',
      });
      setIsFavorite(res.isFav);
      Toast.show(res.isFav ? 'Hino adicionado aos favoritos!' : 'Hino removido dos favoritos');
    };
    ```
- [ ] Executar `npm run typecheck`.
- [ ] Commitar: `feat: connect hymn reader favorite toggle to storage`.

### Task 3: Integração na Tela de Favoritos (`app/favorites.tsx`)
- [ ] Remover dados mockados `INITIAL_FAVORITES`.
- [ ] Utilizar `favoritesService` para carregar `favorites` no carregamento e escutar atualizações com `subscribeFavorites`.
- [ ] No `handleRemoveFavorite`:
  - Chamar `removeFavorite(item.id)`.
  - Exibir `Toast.show('Hino removido dos favoritos')`.
- [ ] Manter estado vazio elegante quando `favorites.length === 0`.
- [ ] Executar `npm run typecheck`.
- [ ] Commitar: `feat: load and manage real favorites in favorites screen`.

### Task 4: Verificação Final e Build
- [ ] Executar `npm run typecheck` (esperado: 0 erros).
- [ ] Executar `npx expo export --platform web` (esperado: sucesso de bundle).
- [ ] Commitar se necessário ou finalizar branch.
