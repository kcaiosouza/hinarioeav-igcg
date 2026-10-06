# Hinário EAV — Plano Musical

## Mapa Emocional por Momento do Vídeo

| Momento | Tempo | Emoção Desejada | Direção Musical & Dinâmica |
|---|---|---|---|
| **Gancho** | 0–3s | Curiosidade, expectativa, atenção | Minimalista, pulso suave, filtro passa-baixas (low-pass) simulando suspense limpo. |
| **Problema / Dor** | 3–8s | Incômodo, lentidão, frustração | Andamento contido, tom sutilmente tenso, batida abafada evidenciando o atrito da busca em papel/falta de sinal. |
| **Virada** | 8–11s | Alívio, revelação, otimismo | Abertura de frequências agudas (sweeper/riser), beat entra com clareza acompanhando a entrada da marca Hinário EAV. |
| **Funcionalidades** | 11–24s | Confiança, leveza, agilidade, energia | **Upbeat moderno, tom maior, ritmo constante (110-120 BPM)**, percussão orgânica e sintetizadores limpos. Proibido tom melancólico! |
| **Resultado + CTA** | 24–32s | Conquista, plenitude, satisfação | Clímax harmonioso, sensação de missão cumprida e convite caloroso para baixar o app, com fade-out gradual nos últimos 2 segundos. |

---

## Faixa Musical Selecionada

- **Arquivo Principal:** `video-promo/public/audio/bg-music.mp3`
- **Nome da Faixa:** *Happy Beats & Modern Groove (Vol. 1)*
- **Autor / Produtor:** Ende Audio / Free Music Creative Commons Library
- **Gênero / Estilo:** Modern Acoustic Beats / Corporate Upbeat Minimal
- **Licença:** Creative Commons / Royalty-Free para uso comercial e pessoal (sem restrições de direitos autorais em mídias digitais).
- **Tratamento no Remotion:**
  - Volume inicial nos primeiros 8 segundos: `0.30` (com filtro e foco na pergunta/dor).
  - Abertura na virada (frame 240 / 8s): subida suave para `0.45`.
  - Ducking inteligente (se narração estiver ativa): redução automática para `0.18 - 0.22` durante as falas do locutor, retornando a `0.45` nos intervalos.
  - Fade-out suave: frames 900 a 960 (últimos 2 segundos) descendo até `0.0`.
