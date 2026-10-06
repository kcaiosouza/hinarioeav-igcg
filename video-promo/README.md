# Vídeo Promocional — Hinário EAV (Remotion)

Projeto de motion design e vídeo institucional/promocional desenvolvido com [Remotion](https://www.remotion.dev/) para divulgação do aplicativo **Hinário EAV** (Igreja em Campina Grande).

---

## 📐 Especificações Técnicas

- **Duração:** ~51,6 segundos (1550 frames @ 30 FPS).
- **Formatos:**
  - Vertical: `1080x1920` (9:16) — Reels, TikTok, Shorts.
  - Horizontal: `1920x1080` (16:9) — YouTube, telões e apresentações.
- **Trilha Sonora:** `public/audio/bg-music.mp3` (*Happy Beats*, Royalty-Free).
- **Narração:** 8 faixas sincronizadas em `public/voiceover/` (`01-gancho.mp3` a `99-cta.mp3`) com ducking inteligente da trilha sonora.

---

## 🚀 Como Rodar o Preview (Remotion Studio)

1. Entre na pasta do projeto:
   ```bash
   cd video-promo
   ```
2. Instale as dependências (se ainda não tiver instalado):
   ```bash
   npm install
   ```
3. Inicie o servidor interativo:
   ```bash
   npm run dev
   ```
4. O Remotion Studio abrirá no seu navegador (geralmente em `http://localhost:3000`), permitindo navegar frame a frame e conferir as animações e safe zones em tempo real.

---

## 🎙️ Como Adicionar / Trocar a Narração (ElevenLabs)

1. Consulte o arquivo [`ROTEIRO_NARRACAO.md`](./ROTEIRO_NARRACAO.md) para ver os textos e instruções.
2. Gere os arquivos de voz no ElevenLabs ou gravador de sua preferência.
3. Salve os arquivos com a nomenclatura correspondente dentro de `public/voiceover/`:
   - `01-gancho.mp3`
   - `02-problema.mp3`
   - `03-virada.mp3`
   - `04-teclado.mp3`
   - `05-busca.mp3`
   - `06-offline.mp3`
   - `07-leitura.mp3`
   - `99-cta.mp3`
4. Se a pasta `public/voiceover/` estiver vazia, o vídeo é reproduzido e renderizado automaticamente no modo **sem narração**, mantendo o ritmo visual dinâmico com a trilha sonora.

---

## 🎬 Como Renderizar os Vídeos Finais

> ⚠️ A renderização final faz parte da **Fase 2** e só deve ser executada após confirmação.

Para renderizar o formato vertical (9:16):
```bash
npm run render:vertical
```

Para renderizar o formato horizontal (16:9):
```bash
npm run render:horizontal
```

Os arquivos de vídeo finais serão salvos em:
- `video-promo/output/promo-vertical-9x16.mp4`
- `video-promo/output/promo-horizontal-16x9.mp4`
