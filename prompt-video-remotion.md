# MISSÃO

Você é um agente de código especialista em Remotion, motion design e copywriting de conversão. Sua tarefa é criar um **vídeo promocional animado** (motion graphics) que mostre as funcionalidades reais deste aplicativo e leve quem assiste a **baixar o app**.

O trabalho acontece em **duas fases**, separadas por uma **confirmação minha**:

- **FASE 1: PREPARAÇÃO** → você entende o app, monta o projeto, escreve os roteiros (visual, texto de apresentação e de narração) e planeja a trilha. No fim, **PARA e espera minha confirmação**.
- **FASE 2: PRODUÇÃO** → só começa quando eu **confirmar que pode iniciar**. Você verifica se existem áudios de narração, constrói o vídeo e renderiza.

> 🛑 **Regra de ouro:** não pule para a Fase 2 sozinho. Não renderize nada antes da minha confirmação.

---

# FASE 1: PREPARAÇÃO

## 1.1 Entender o app (não pule)

1. **Leia o código do projeto**: estrutura de pastas, rotas/telas, componentes principais, nome do app, descrição no README, textos da interface e features implementadas.
2. **Visualize a interface**: rode o app (ou o preview/emulador, se possível) e capture screenshots das telas principais. Se não conseguir rodar, reconstrua a interface fielmente a partir do código (cores, fontes, ícones, layout).
3. **Extraia a identidade visual**: paleta de cores, tipografia, estilo de bordas/sombras, logo e tom de voz.
4. Escreva `video-promo/VIDEO_BRIEF.md` com:
   - O que o app faz, em uma frase.
   - Público-alvo provável.
   - As 3 a 5 funcionalidades mais fortes (baseadas só no que existe no código).
   - A principal dor que o app resolve.

> ⚠️ Só mostre funcionalidades que realmente existem. Não invente recursos, números ou depoimentos.

## 1.2 Criar a estrutura de pastas

Crie esta estrutura na raiz do projeto:

```
video-promo/                  ← projeto Remotion (npm install, npm run dev)
├── src/
│   ├── Root.tsx
│   ├── Video.tsx
│   ├── scenes/               ← uma cena por arquivo
│   ├── components/           ← mockup de celular, textos animados, botões
│   └── assets/               ← screenshots, logo, fontes
├── public/
│   ├── audio/                ← trilha sonora (música de fundo)
│   └── voiceover/            ← ★ falas da narração (.mp3) que EU vou gerar e colocar aqui
├── output/                   ← ★ SOMENTE os vídeos finais renderizados
│   ├── promo-vertical-9x16.mp4
│   └── promo-horizontal-16x9.mp4
├── VIDEO_BRIEF.md            ← resumo do app
├── ROTEIRO_VISUAL.md         ← cenas, textos na tela, vieses por cena
├── ROTEIRO_NARRACAO.md       ← falas separadas, para eu gerar no ElevenLabs
├── PLANO_MUSICAL.md          ← mapa emocional da trilha por cena
├── package.json
└── README.md                 ← como rodar e renderizar
```

Inicialize com `npx create-video@latest` (template em branco, TypeScript), instale as dependências (`@remotion/transitions`, etc.) e garanta que `npm run dev` abre o Remotion Studio. A renderização final deve salvar dentro de `video-promo/output/`.

## 1.3 Especificações técnicas do vídeo

- **Duração:** 25 a 35 segundos.
- **FPS:** 30.
- **Formatos:** vertical **1080×1920** (principal, para Reels/TikTok/Shorts) e horizontal **1920×1080**. Use `useVideoConfig()` para o layout se adaptar às duas composições.
- **Animações com MOTION de verdade**, usando as APIs do Remotion:
  - `spring()` e `interpolate()` para entradas e saídas com física natural.
  - `<Sequence>` e `<TransitionSeries>` (`@remotion/transitions`) para transições entre cenas (slide, fade, wipe).
  - Texto com animação (palavra por palavra, máscara/reveal, scale + blur).
  - Mockup de celular com as telas reais do app entrando, girando levemente, com zoom e parallax.
  - Cursor/toque simulando o uso (taps, scroll, destaque em botões).
  - Elementos de apoio (formas, partículas, gradientes animados) sem poluir.
- Nada de slides estáticos: **sempre algo em movimento**, com easing suave.
- Legibilidade: texto grande, alto contraste, dentro das "safe zones" de redes sociais. O vídeo deve funcionar **sem som** (o texto conta a história).

## 1.4 Estrutura sugerida do roteiro visual

| Tempo | Cena | Objetivo |
|---|---|---|
| 0–3s | **Gancho** | Parar o scroll com uma pergunta ou dor forte |
| 3–8s | **Problema** | Mostrar o custo de continuar como está |
| 8–22s | **Solução / Funcionalidades** | 3 a 4 features reais, 3–4s cada, com a interface em movimento |
| 22–28s | **Prova + benefício final** | Reforçar o resultado/transformação |
| 28–35s | **CTA** | Logo + "Baixe agora" + botão animado de download (App Store / Google Play, conforme a plataforma do app) |

Registre o roteiro final em `ROTEIRO_VISUAL.md`: para cada cena, o tempo, o texto na tela, o que aparece/anima e qual viés cognitivo está sendo aplicado.

## 1.5 Copywriting com vieses cognitivos

Escreva todos os textos (tela e narração) em **português do Brasil**, curtos (máx. 7–8 palavras por tela), diretos e com verbos de ação. Baseie-se **no que você descobriu sobre o app** (dor real, funcionalidades reais, público real) e aplique de forma **ética e verdadeira** os vieses abaixo:

- **Efeito gancho / Lacuna de curiosidade:** abra com uma pergunta ou afirmação que gera curiosidade.
- **Aversão à perda:** mostre o que a pessoa perde (tempo, dinheiro, oportunidade) ao não agir.
- **Contraste / Efeito Von Restorff:** destaque visualmente a solução contra a dor (cores e animação diferentes).
- **Ancoragem:** compare o "antes" (complicado, lento) com o "depois" (simples, rápido).
- **Fluência cognitiva / Efeito de simplicidade:** frases simples, uma ideia por tela, "em 3 toques".
- **Prova social e Autoridade:** use APENAS dados reais (nº de downloads, avaliações) se existirem no código/README. Se não houver, **omita**. Não invente números.
- **Efeito Zeigarnik / Open loop:** deixe uma promessa em aberto no começo que só se fecha no CTA.
- **Reciprocidade e baixo atrito:** se for grátis, destaque ("Grátis para começar"). Só diga se for verdade.
- **Urgência honesta:** convide à ação imediata ("Comece hoje"), sem escassez falsa ou prazos inventados.

**CTA final:** claro, único e específico. Inclua o botão visual de download animado (pulso sutil) e o nome do app em destaque.

## 1.6 Roteiro de narração (`ROTEIRO_NARRACAO.md`)

Eu vou gerar a voz no **ElevenLabs** (tenho ~10.000 créditos, então o texto precisa ser enxuto). Escreva as falas **a partir do app real e dos vieses acima**, divididas em **trechos curtos e independentes**, para que depois você decida quando cada um entra no vídeo.

Regras:

- **Total de até ~900 caracteres** somando todos os trechos (economiza créditos e deixa margem para refazer takes).
- Cada trecho = **uma ideia**, uma ou duas frases curtas, com ritmo falado natural (sem siglas difíceis, sem números por extenso confusos).
- Os trechos devem funcionar **em ordem** e também **isolados**, pois você poderá reposicionar ou omitir algum.
- Se algum trecho citar algo que depende de informação que não existe no projeto (ex.: "grátis", número de usuários), **não inclua**.

Formato obrigatório de cada trecho no arquivo:

```
### 01-gancho.mp3
Texto: "..."
Cena sugerida: Gancho (0–3s)
Viés aplicado: Lacuna de curiosidade
Caracteres: 38 | Duração estimada: ~2,5s
Emoção/tom da voz: curioso, direto
```

Nomeie os arquivos com número + função (`01-gancho.mp3`, `02-problema.mp3`, `03-virada.mp3`, `04-feature-nome.mp3`, ..., `99-cta.mp3`). **Eu vou salvar os MP3 com exatamente esses nomes** em `video-promo/public/voiceover/`.

No final do `ROTEIRO_NARRACAO.md`, inclua uma mini-seção **"Como gerar no ElevenLabs"** com dicas: usar a mesma voz e as mesmas configurações em todos os trechos, escolher uma voz em português do Brasil, modelo multilíngue, exportar em MP3 e cortar silêncios no início e no fim de cada arquivo.

## 1.7 Plano musical (`PLANO_MUSICAL.md`)

A música deve **acompanhar a emoção de cada momento do vídeo**, e não ser uma faixa única qualquer.

| Momento | Emoção desejada | Direção musical |
|---|---|---|
| Gancho | Curiosidade, tensão leve | Minimalista, suspense suave |
| Problema / dor | Incômodo, frustração | Tom menor, mais lento, levemente melancólico |
| Virada | Alívio, expectativa | Build-up, a música "abre" |
| **Funcionalidades** | **Leveza, confiança, energia** | **Upbeat, positiva, ritmo médio, tom maior** |
| Resultado + CTA | Conquista, motivação | Mais energia, resolução satisfatória |

**Regras:**

- ❌ **Proibido** música triste, sombria ou melancólica durante a demonstração das funcionalidades. Melancolia só é permitida no momento do problema/dor.
- Se não houver uma única faixa com esse arco, use **duas faixas** (uma mais sombria para o problema, outra positiva para a solução) com **crossfade** na cena de virada, e sincronize a mudança com a transição visual.
- Estilo geral: instrumental, moderno, sem vocal.
- Fontes **livres de direitos autorais e que permitam uso comercial**: **Pixabay Music**, **YouTube Audio Library** (faixas sem atribuição), **Free Music Archive (CC0)**, **Uppbeat** (plano gratuito, conferir regras).
- **Nunca** use músicas comerciais.
- Documente em `PLANO_MUSICAL.md` e no `README.md` a faixa escolhida para cada momento: nome, autor, link e tipo de licença.
- Se não conseguir baixar áudio por falta de acesso à internet, gere uma trilha instrumental simples e original, de forma procedural (Web Audio / script), respeitando o arco emocional acima, e me avise.

## 1.8 ✋ PARAR E AVISAR O USUÁRIO

Ao terminar a Fase 1, **não renderize nada**. Verifique que existem: `VIDEO_BRIEF.md`, `ROTEIRO_VISUAL.md`, `ROTEIRO_NARRACAO.md`, `PLANO_MUSICAL.md`, e que o Remotion Studio abre sem erros.

Depois envie **exatamente** uma mensagem neste formato:

```
✅ Tudo pronto para dar início!

📁 Projeto criado em: video-promo/
📝 Roteiro de narração: video-promo/ROTEIRO_NARRACAO.md  (X trechos, Y caracteres)
🎬 Roteiro visual: video-promo/ROTEIRO_VISUAL.md
🎵 Plano musical: video-promo/PLANO_MUSICAL.md

👉 Se quiser narração, gere os áudios no ElevenLabs com os nomes indicados
   e salve em: video-promo/public/voiceover/
   (se preferir sem voz, não precisa fazer nada).

⏳ Aguardando sua confirmação. Responda "INICIAR" quando estiver pronto.
```

**Depois disso, não faça mais nada até receber "INICIAR".**

---

# FASE 2: PRODUÇÃO (só após eu escrever "INICIAR")

## 2.1 Verificar os áudios de narração

Liste os arquivos em `video-promo/public/voiceover/` e compare com `ROTEIRO_NARRACAO.md`.

**CASO A: existem áudios (todos ou parte):**

1. Use apenas os que existem. Leia a duração real de cada um (ex.: `ffprobe`) e **ajuste o tempo das cenas** para a fala caber com folga (deixe ~0,3s de respiro antes e depois).
2. Decida o ponto de entrada de cada fala dentro do vídeo, sincronizando com a animação correspondente (a fala deve começar quando o elemento visual entra ou logo depois).
3. Importe com `<Audio src={staticFile('voiceover/NN-nome.mp3')} />` dentro de uma `<Sequence from={...}>`.
4. **Faça "ducking"**: abaixe o volume da música (para ~0.15–0.25) enquanto a voz fala e suba suavemente (~0.4–0.5) nos intervalos.
5. Se faltar algum arquivo, esse trecho fica **somente com texto na tela**, sem quebrar o vídeo.
6. Os textos na tela continuam existindo, pois o vídeo precisa funcionar também sem som.

**CASO B: a pasta está vazia ou não há áudios:**

1. **Não trave e não peça nada.** Produza o vídeo **sem narração**, só com texto animado + música.
2. Garanta que o ritmo funcione apenas com leitura (tempo suficiente por texto) e que a música tenha volume normal (~0.4–0.6), sem ducking.
3. Mencione isso no resumo final.

## 2.2 Produzir o vídeo

1. Construa todas as cenas conforme `ROTEIRO_VISUAL.md` e o plano de `PLANO_MUSICAL.md`.
2. Aplique **fade-in** (~1s) e **fade-out** (~2s) na música; sincronize a virada musical com a virada visual.
3. Confira cada cena no Studio (`npm run dev`): sem cortes, sem texto fora da tela, sem sobreposições, sem áudio estourando.

## 2.3 Renderização e entrega

```bash
npx remotion render <CompositionVertical> output/promo-vertical-9x16.mp4
npx remotion render <CompositionHorizontal> output/promo-horizontal-16x9.mp4
```

Confirme que os arquivos existem em `video-promo/output/` e que abrem com áudio. Atualize o `README.md` com: como instalar, rodar, editar textos, trocar/adicionar áudios de narração e renderizar.

---

# CHECKLIST FINAL (valide antes de concluir a Fase 2)

- [ ] A Fase 1 terminou com a mensagem de confirmação e **esperei o "INICIAR"**.
- [ ] Usei telas/funcionalidades reais do app, sem inventar nada.
- [ ] Cores, fontes e logo seguem a identidade do app.
- [ ] Há movimento fluido em todas as cenas (spring, interpolate, transições).
- [ ] O gancho aparece nos primeiros 3 segundos.
- [ ] Textos curtos, legíveis e em português do Brasil.
- [ ] Apliquei pelo menos 5 vieses cognitivos de forma honesta.
- [ ] O CTA de download é claro e visível nos últimos segundos.
- [ ] Verifiquei `public/voiceover/` e usei os áudios existentes (com ducking) **ou** produzi sem voz.
- [ ] A música acompanha a emoção de cada cena e **não é triste durante as funcionalidades**.
- [ ] A trilha é livre de copyright e a licença está documentada.
- [ ] Os vídeos finais estão em `video-promo/output/`.
- [ ] O vídeo funciona mesmo sem som.

Ao terminar, responda com: caminho dos arquivos gerados, resumo do roteiro, vieses usados em cada cena, se a narração foi usada (e quais trechos), e a fonte/licença da música.
