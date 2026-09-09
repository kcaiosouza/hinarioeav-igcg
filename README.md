<div align="center">

<img src="./assets/images/icon.png" alt="Hinário EAV" width="150" height="150" style="border-radius: 32px;" />

# Hinário EAV

**O hinário digital da Igreja em Campina Grande — rápido, bonito e sempre à mão.**

[![Expo](https://img.shields.io/badge/Expo-57.0-000020?style=flat-square&logo=expo&logoColor=white)](https://expo.dev)
[![React Native](https://img.shields.io/badge/React_Native-0.86-61DAFB?style=flat-square&logo=react&logoColor=black)](https://reactnative.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![NativeWind](https://img.shields.io/badge/NativeWind-4.2-38BDF8?style=flat-square&logo=tailwindcss&logoColor=white)](https://www.nativewind.dev)

</div>

---

## 📖 Sobre o Projeto

O **Hinário EAV** é um aplicativo mobile desenvolvido pela [Igreja em Campina Grande (IGCG)](https:/igrejaemcampinagrande.com.br), oferecendo acesso rápido e elegante a todo o repertório de hinos utilizados nas reuniões.

O app foi concebido principalmente pensando nos usuários de dispositivos Apple, que recentemente o único app que tinha saiu da loja.

### Por que este app?

- 📱 **Sempre disponível** — acesse os hinos offline, sem precisar de internet
- 🔢 **Busca por número** — teclado numérico dedicado para encontrar hinos em segundos
- 🔍 **Busca inteligente** — pesquise por título, número ou qualquer trecho da letra
- 🎼 **Partituras** — visualize as partituras diretamente no app
- ⭐ **Favoritos** — marque os hinos mais cantados para acesso rápido
- 🌿 **Design refinado** — tema verde escuro com tipografia elegante (Fraunces + Inter)

---

## 📚 Hinários Disponíveis

O app reúne os quatro livros do hinário da EAV:

| Chave | Nome | Descrição |
|-------|------|-----------|
| `H` | **Hinos** | Hinário principal da Irmandade |
| `C` | **Cânticos** | Cânticos complementares |
| `S` | **Suplemento** | Suplemento ao hinário |
| `N` | **Hinário Novo** | Novo hinário em implantação *(299/1100)* |
| `D` | **Diversos** | Hinos avulsos e especiais (acesso via busca) |

---

## ✨ Funcionalidades

### ✅ Implementadas

#### 🏠 Tela Principal — Teclado Numérico

- Teclado numérico dedicado para digitar o número do hino
- Seletor de livro ativo (Hinos, Cânticos, Suplemento, Hinário Novo)
- Busca inteligente com sugestão de livro alternativo quando o hino não está no livro atual
- Toast de notificação com ação rápida para navegar entre livros

#### 📄 Visualização do Hino

- Exibição completa com estrofes, coro e categoria
- **Navegação por swipe** — deslize para ir ao hino anterior ou próximo
- Ajuste de tamanho de fonte (acessibilidade)
- Botão de opções com bottom sheet
- Integração com **IGCGMusic** para ouvir o hino

#### ⭐ Favoritos

- Marque e desmarque hinos favoritos com um toque
- Lista de favoritos persistida localmente (AsyncStorage)
- Sincronização reativa em tempo real entre telas

#### 🔍 Busca Avançada

- Pesquisa full-text por título, número ou trecho de letra
- Sistema de pontuação (scoring) para ordenar resultados por relevância
- Busca normalizada — ignora acentos, maiúsculas e pontuação
- Snippets contextuais mostrando o trecho exato encontrado

#### 🎼 Partituras

- Visualizador de partituras em imagem (PNG)
- Suporte a partituras com múltiplas páginas
- Zoom e scroll para leitura confortável

#### 🗂️ Menu Lateral (Side Drawer)

- Navegação entre seções do app
- Acesso rápido a Favoritos e Busca
- Exibição da versão atual do catálogo e botão de sincronização manual com feedback visual

#### 🔄 Atualização Remota e Versionamento Offline-First

- **Arquitetura Offline-First**: O app inicia instantaneamente usando o catálogo local embutido ou a versão mais recente salva em cache local (`AsyncStorage` + `Expo FileSystem`), funcionando com total autonomia sem conexão com a internet.
- **Verificação Leve de Versão**: Ao inicializar ou por solicitação manual, o app consulta apenas um arquivo leve de metadados (`catalogVersion.json` via GitHub Raw) com versionamento SemVer (`major.minor.patch`), evitando tráfego de dados desnecessário.
- **Download Atômico com Barra de Progresso**: Ao identificar uma versão mais recente, o catálogo completo (`hinosData.json`) é baixado de forma atômica e validado, acompanhado por uma barra de progresso discreta no topo da tela (estilo NProgress).
- **Recarregamento Reativo em Tempo Real**: Concluído o download e validação, o catálogo em memória é recarregado e os componentes inscritos são notificados automaticamente, sem necessidade de reiniciar o aplicativo.
- **Resiliência e Tolerância a Falhas**: Quedas de conexão ou indisponibilidade temporária de servidores são tratadas silenciosamente, garantindo estabilidade e disponibilidade contínua dos dados existentes.
- **Sincronização Manual**: Opção acessível no menu lateral para verificar novas versões e atualizar o acervo quando desejado.

---

## 🗺️ Roadmap

### 🚧 Em Desenvolvimento

```
[ ] Hinário Novo (book key: "novo") — (100/1100)
    - Cadastro completo das letras dos hinos do Hinário Novo
    - Integração com o seletor de livros já existente
    - Sugestão de livro alternativo funcionando (infra pronta)

[x] Hinos Diversos / Especiais (book key: "diversos")
    - Hinos avulsos
    - Categoria própria na busca

[x] Atualização remota e versionamento offline-first
    - Checagem remota leve via catalogVersion.json
    - Download atômico em background com barra de progresso estilo NProgress
    - Recarregamento em tempo real do catálogo sem reiniciar o app
    - Suporte a sincronização manual no menu lateral
```

### 🔮 Planejado (Futuro)

```
[ ] Partituras para todos os hinos dos livros já implementados
[ ] Compartilhamento de hinos via texto/link
[ ] Sincronização com o IGCGMusic para reprodução integrada
```

---

## 🛠️ Stack Tecnológica

| Tecnologia                                                                     | Versão | Uso                      |
| ------------------------------------------------------------------------------ | ------ | ------------------------ |
| [Expo](https://expo.dev)                                                       | ~57.0  | Plataforma base          |
| [React Native](https://reactnative.dev)                                        | 0.86   | Framework mobile         |
| [Expo Router](https://expo.github.io/router)                                   | ~57.0  | Navegação file-based     |
| [NativeWind](https://nativewind.dev)                                           | ^4.2   | Estilização com Tailwind |
| [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/) | 4.5    | Animações fluidas        |
| [AsyncStorage](https://react-native-async-storage.github.io/async-storage/)    | 2.2    | Persistência local       |
| [React Native SVG](https://github.com/software-mansion/react-native-svg)       | 15.15  | Ícones vetoriais         |
| TypeScript                                                                     | ~6.0   | Tipagem estática         |

### Tipografia

- **Fraunces** — títulos e elementos de destaque (fonte serif elegante)
- **Inter** — corpo de texto e interface

### Paleta de Cores

```
Background:  #263a30  (verde escuro)
Surface:     #344E41  (verde médio)
Cream:       #DAD7CD  (bege claro — texto)
Gold Soft:   #A3B18A  (verde acinzentado — badges)
```

---

## 🚀 Como Executar

### Pré-requisitos

- [Node.js](https://nodejs.org) (LTS)
- [Expo CLI](https://docs.expo.dev/more/expo-cli/)
- iOS Simulator / Android Emulator, ou o app **Expo Go** no seu celular

### Instalação

```bash
# Clone o repositório
git clone https://github.com/kcaiosouza/hinarioeav-igcg.git
cd hinarioeav-igcg

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm start
```

### Scripts disponíveis

```bash
npm start          # Expo Dev Server (modo interativo)
npm run android    # Abre no Android
npm run ios        # Abre no iOS
npm run web        # Abre no navegador
npm run typecheck  # Verifica tipos TypeScript
```

---

## 📁 Estrutura do Projeto

```
igcghinario/
├── app/                    # Rotas (Expo Router)
│   ├── _layout.tsx         # Layout raiz com Drawer, sincronização e TopProgressBar
│   ├── index.tsx           # Tela principal (teclado numérico)
│   ├── search.tsx          # Busca avançada
│   ├── favorites.tsx       # Favoritos
│   ├── partitura.tsx       # Visualizador de partituras
│   └── hino/[id].tsx       # Detalhe do hino
├── assets/
│   ├── images/             # Ícone, splash, favicon
│   └── partituras/         # Imagens das partituras (PNG)
├── components/
│   ├── hinario/            # Componentes da tela principal
│   ├── hino/               # Componentes da tela de hino
│   ├── CustomDrawerContent.tsx # Menu lateral com status e ação de sincronização
│   └── TopProgressBar.tsx  # Barra de progresso discreta estilo NProgress no topo
├── constants/
│   ├── config.ts           # Configurações de sincronização e URLs remotas
│   └── theme.ts            # Cores e fontes do tema
├── data/
│   ├── catalogVersion.json # Versão SemVer atual embutida no app
│   ├── hinosData.json      # Base de dados dos hinos
│   ├── hinosRepository.ts  # Repositório reativo de acesso aos dados
│   └── partiturasManifest.ts # Mapeamento das partituras
├── services/
│   ├── catalogSyncService.ts # Serviço de sincronização e download do catálogo
│   └── favoritesService.ts # Gerenciamento de favoritos
├── types/                  # Definições TypeScript
└── utils/                  # Utilitários (normalização, semver, validação)
```

---

## 🏛️ Sobre a Igreja em Campina Grande

Este aplicativo é desenvolvido pela **Igreja em Campina Grande (IGCG)**, para uso de **todos so santos**. O app é mantido com amor pela equipe de tecnologia da igreja.

---

<div align="center">

Feito com 🌿 para a glória de Deus

**Igreja em Campina Grande — IGCG**

</div>
