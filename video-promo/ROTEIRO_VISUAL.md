# Hinário EAV — Roteiro Visual

## Especificações Técnicas
- **Duração total:** 32 segundos (960 frames @ 30 FPS).
- **Taxa de quadros:** 30 fps.
- **Resoluções:**
  - Vertical: **1080 × 1920** (9:16) — Reels, Instagram Stories, TikTok, YouTube Shorts.
  - Horizontal: **1920 × 1080** (16:9) — YouTube, projeções e apresentações em vídeo.
- **Design System:**
  - Cores: Fundo `#0e1712`, Superfície `#344E41` / `#3A5A40`, Destaques `#A3B18A` e `#5C7650`, Texto `#DAD7CD` e branco puro.
  - Fontes: `Fraunces` (títulos, números, solenidade) e `Inter` (UI, subtítulos, textos de apoio).
  - Safe Zones: Margens de segurança de 15% nas bordas superior e inferior para evitar sobreposição com ícones de redes sociais.

---

## Tabela de Cenas e Vieses Cognitivos

| Cena | Tempo | Frames | Texto na Tela | Animação / O que aparece | Viés Cognitivo Aplicado |
|---|---|---|---|---|---|
| **1. Gancho** | 0–3s | 0–90 | **"Procurando hino na hora do louvor?"** | Fundo escuro com pulsação suave em tom âmbar/vermelho sutil. Ícone do relógio acelerando e interrogação animada com física elástica (`spring`). Tipografia Fraunces com reveal dinâmico. | **Efeito Gancho / Lacuna de Curiosidade** (captura imediata da atenção antes do scroll). |
| **2. Problema** | 3–8s | 90–240 | **"Índice de papel? Sem sinal de internet?"** | Celular em mockup 3D/isométrico tremendo levemente com ícone de "Sem Conexão" (Wi-Fi cortado) e folhas de hinário caindo/desorganizadas. Cores escuras, iluminação dramática. | **Aversão à Perda & Custo de Inação** (evidencia a frustração de perder o início do cântico na reunião). |
| **3. Virada** | 8–11s | 240–330 | **"Hinário EAV: rápido, elegante e sempre à mão."** | Transição luminosa com flash suave verde-esmeralda (`#A3B18A`). Mockup do celular entra com rotação suave em mola (`spring`), exibindo a marca e a tela inicial impecável do app. | **Contraste / Efeito Von Restorff** (quebra a dor com alívio visual imediato e sensação premium). |
| **4. Teclado Rápido** | 11–15s | 330–450 | **"Digite o número e abra em 2 segundos."** | Mockup em close-up. Teclado numérico ativo com toques simulados rápidos nos dígitos ("4", "2", "0") com efeito de ripple/glow. Troca instantânea de livro (Hinos / Novo) e transição para o hino aberto. | **Fluência Cognitiva & Efeito de Simplicidade** (prova a velocidade instantânea em poucos toques). |
| **5. Busca Inteligente** | 15–19s | 450–570 | **"Só lembra um verso? A busca encontra."** | Interface de busca com digitação dinâmica de um trecho da letra. Resultados instantâneos aparecem com os snippets destacados em verde suave, sem espera. | **Ancoragem & Alívio Cognitivo** (elimina a necessidade de decorar números de mais de mil hinos). |
| **6. Partituras & Offline** | 19–24s | 570–720 | **"+1.100 Hinos e Partituras 100% Offline."** | Mockup com partitura musical em alta definição com efeito de zoom suave e deslize de página. Badge brilhante "100% OFFLINE — SEM INTERNET". | **Certeza & Ausência de Atrito** (garante funcionamento irrestrito mesmo dentro de locais sem sinal). |
| **7. Leitura & Gestos** | 24–28s | 720–840 | **"Deslize entre hinos com leitura ajustável."** | Gesto de swipe fluido para o lado revelando o próximo hino com inércia natural. Ícones de ajuste de fonte expandindo o texto para acessibilidade máxima. | **Efeito Zeigarnik / Conexão Emocional** (conforto e continuidade total durante o culto). |
| **8. CTA Final** | 28–32s | 840–960 | **"Baixe agora o Hinário EAV"** | Ícone oficial do app com pulso de brilho refinado. Botões de download animados (App Store e Google Play) com efeito hover/pulso. Tagline: *"O repertório completo no seu bolso"*. | **Urgência Honesta & Chamada à Ação Direta** (baixo atrito para iniciar o download agora). |

---

## Detalhamento de Movimento e Safe Zones

1. **Entradas e Saídas Suaves:** Nenhuma cena é estática. Todos os elementos contam com interpolações contínuas (`interpolate(frame, [0, 90], [1, 1.05])`) para sensação constante de vida.
2. **Mockup Dinâmico:** O celular se move em perspectiva 2.5D, com reflexos simulados no vidro e sombras suaves no fundo.
3. **Safe Zones para Stories e Reels:**
   - Margem superior de 220px (área do topo e identificação do perfil).
   - Margem inferior de 280px (área da descrição, áudio e botão de ação do aplicativo).
   - Todos os textos cruciais estão centralizados na faixa vertical de 300px a 1600px.
