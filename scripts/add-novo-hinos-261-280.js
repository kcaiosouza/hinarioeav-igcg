const fs = require('fs');
const path = require('path');

const hinosPath = path.join(__dirname, '../data/hinosData.json');
const rawData = fs.readFileSync(hinosPath, 'utf8');
const data = JSON.parse(rawData);

if (!data.novo) {
  data.novo = {};
}

const novosHinos = {
  "261": {
    "id": "261",
    "numero": 261,
    "titulo": "Redimidos pelo Sangue",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Com sangue mui precioso\nCristo alto preço pagou;\nDe vã maneira de vida\nNos redimiu em amor.",
      "Velha maneira de vida,\nConcupiscências sem fim,\nNão tinha alvo ou sentido,\nEra tão vã, tão ruim.",
      "Unicamente Seu sangue\nÉ digno de nos remir;\nComo Cordeiro perfeito,\nÀ cruz, por nós, quis subir.",
      "Dentre tantas pessoas\nNós já não somos comuns;\nFomos por Deus escolhidos,\nSalvos com Sangue, na Cruz.",
      "Por redenção desmedida,\nDe inestimável valor,\nVamos viver uma vida\nCheia de santo temor.",
      "Hoje ao ver esse quadro,\nTemos de nos consagrar\nComo um vivo holocausto,\nSeu coração agradar."
    ],
    "coro": "Sim, com Seu sangue\nCristo remiu nosso ser\nPara poder expressar-se\nEm nosso santo viver."
  },
  "262": {
    "id": "262",
    "numero": 262,
    "titulo": "Nascidos do Espírito",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Que segurança! Sou de Jesus!\nQue antegozo provo da luz!\nDeus fez-me herdeiro ao me remir,\nDe Seu Espírito, pois, nasci.",
      "Sendo submisso, há só prazer!\nDia glorioso já posso ver;\nAnjos descendo, trazem dos céus\nEcos de amor e graça de Deus.",
      "Sendo submisso, tudo é paz,\nGozo e bênção Cristo me traz;\nEnquanto aguardo vir meu Senhor,\nOro e vigio em Seu amor."
    ],
    "coro": "Eis minha história: rendo louvor\nHora após hora ao Salvador;\nEis minha história: rendo louvor\nHora após hora ao Salvador."
  },
  "263": {
    "id": "263",
    "numero": 263,
    "titulo": "Mudados em vida",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Que mudança total em meu ser se operou,\nCom Cristo no meu coração!\nMinha alma tem luz que há muito buscou,\nCom Cristo no meu coração!",
      "Já liberto estou do pecado voraz,\nCom Cristo no meu coração!\nNão vão mais me prender, as paixões vis, carnais,\nCom Cristo no meu coração!",
      "O mundano prazer cor, sabor já não tem,\nCom Cristo no meu coração!\nAnsiedades quaisquer nunca mais me detêm,\nCom Cristo no meu coração!",
      "Já deixei de vagar e o caminho errar,\nCom Cristo no meu coração!\nPaz real do Senhor posso agora provar,\nCom Cristo no meu coração!",
      "O passado se foi, para trás já deixei,\nCom Cristo no meu coração!\nNo caminho da luz para sempre irei,\nCom Cristo no meu coração!"
    ],
    "coro": "Com Cristo no meu coração!\nCom Cristo no meu coração!\nAlegria sem par vem meu ser inundar,\nCom Cristo no meu coração!"
  },
  "264": {
    "id": "264",
    "numero": 264,
    "titulo": "Mudados em vida",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Oh! Que alegria enche meu coração! —\nSim, meu coração!\nNão mais é de pedra meu coração,\nDeus mo renovou, novo homem me fez,\nOh! Que alegria enche meu coração!",
      "O Santo Espírito enche meu ser!\nSim, enche meu ser!\nRemove fraquezas e transgressões,\nE faz-me dar frutos em santo viver.\nO Santo Espírito enche meu ser!"
    ]
  },
  "265": {
    "id": "265",
    "numero": 265,
    "titulo": "Salvos pela Graça",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Tudo o que tenho de Deus recebi,\nCom Sua graça depois que eu cri.\nFora o orgulho, pois hoje sou\nSó um pecador que graça ganhou!",
      "De meus pecados, escravo era eu,\nUm pobre errante distante de Deus.\nCristo buscou-me, grato Lhe sou!\nSou um pecador que graça ganhou!",
      "Era inútil, não tinha valor,\nMe perderia sem o Seu favor.\nDe Deus fugia quando me achou.\nSou um pecador que graça ganhou!",
      "De alegria, eu vou transbordar!\nQuero tal graça a todos falar.\nE novamente clamo que sou\nSó um pecador que graça ganhou!"
    ],
    "coro": "Um pecador que graça ganhou!\nUm pecador que graça ganhou!\nEis minha história, a Deus seja a glória,\nSou pecador que graça ganhou!"
  },
  "266": {
    "id": "266",
    "numero": 266,
    "titulo": "Salvos pela Graça",
    "categoria": "Hinário Novo",
    "estrofes": [
      "A graça! Doce som\nTão bom de escutar,\nQue céus sem fim ressoarão\nE a terra ouvirá.",
      "No livro eternal\nA graça me arrolou;\nE ao Cordeiro divinal,\nAlegre, me entregou.",
      "A peregrino ser,\nA graça me levou;\nE novas provisões provê\nEnquanto avante vou.",
      "A graça me ensinou\nO coração a orar;\nTé hoje sempre me guardou\nE não me deixará;",
      "A todo o labor\nVai dar seu galardão\nE a pedra de remate pôr,\nEm meio a aclamação.",
      "Tal graça, o coração,\nMe inspire com vigor;\nSê toda minha aspiração,\nE meu viver, Senhor."
    ],
    "coro": "Graça — que porção,\nPlena provisão!\nÉ o Cristo vivo em mim,\nEm Sua amplidão!"
  },
  "267": {
    "id": "267",
    "numero": 267,
    "titulo": "Salvos pela Graça",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Sublime a graça de Jesus\nA mim, um pecador,\nQue se perdeu, não tinha luz!\nMas ela me encontrou;",
      "Foi quem meus medos dissipou,\nA Deus me fez temer;\nPreciosa a mim se revelou\nBem quando vim a crer.",
      "Promessas deu-me o Senhor,\nSeguro, posso crer;\nÉ Provisão, meu Protetor\nEnquanto eu viver!",
      "Qual sol, iremos fulgurar\nNo reino eternal,\nLouvor render e aclamar\nA graça divinal."
    ]
  },
  "268": {
    "id": "268",
    "numero": 268,
    "titulo": "Salvos pela Graça",
    "categoria": "Hinário Novo",
    "estrofes": [
      "\"Reina a graça abundante\",\nÓ remidos, proclamai;\nSeus limites deslumbrantes\nQuem os pode perscrutar?\nNessa graça, nessa graça,\nSempre hei de habitar!\nNessa graça, nessa graça,\nSempre hei de habitar!",
      "Que separa, pois, de Cristo,\nDe Seus laços de amor,\nQuem a Ele está unido\nN'aliança superior?\nNada pode, nada pode\nSeparar-nos do Senhor!\nNada pode, nada pode\nSeparar-nos do Senhor!",
      "Com Jesus de Deus herdeiros\nAntes mesmo da criação;\nQue amor! Que grandes feitos!\nA Seu nome adoração!\nNós e Cristo, nós e Cristo,\nQue eterna união!\nNós e Cristo, nós e Cristo,\nQue eterna união!",
      "Nesse amor sem par medita,\nÓ minh'alma, sem cessar;\nQue motivo haveria\nPara tanto me amar?\nAleluia! Aleluia!\nGraça sempre reinará!\nAleluia! Aleluia!\nGraça sempre reinará!"
    ]
  },
  "269": {
    "id": "269",
    "numero": 269,
    "titulo": "Salvos pela Graça",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Salvo ao máximo, sou do Senhor!\nExcelsa dádiva do Salvador!\nDiz-me o Espírito ao coração\nQue do pecado já deu-me perdão.",
      "Salvo ao máximo, perto o Senhor\nSempre me guarda e tira o temor;\nPor nas Promessas crer, fausto me faz,\nPor Nele me apoiar, há doce paz.",
      "Salvo ao máximo, isto direi:\n\"Foi-se a escuridão, já posso ver!\".\nBelas revelações, glória sem fim,\nCristo em esplendor visto por mim.",
      "Salvo ao máximo, eu cantarei\nMil aleluias a Cristo, meu Rei,\nSeu sangue me remiu, trouxe perdão,\nE, justo, dou a Deus adoração!"
    ],
    "coro": "Salvo, salvo ao máximo\nPelo poder do Senhor;\nSalvo, sou salvo ao máximo;\nTenho Jesus, Salvador!"
  },
  "270": {
    "id": "270",
    "numero": 270,
    "titulo": "Salvos pela Graça",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Um dia ao fim a vida irá,\nAqui não mais eu cantarei;\nPorém, feliz vou despertar\nLá na presença de meu Rei!",
      "Um dia fim tem meu vigor,\nQuão breve, eu, dizer, não sei,\nMas certo estou: com meu Senhor,\nLugar eterno herdarei.",
      "Um dia, enfim, ao vir do céu,\nMe falará o Redentor:\n\"Meu servo bom, leal, fiel,\nAdentra o gozo do Senhor!\".",
      "Um dia, após eu vigiar\nCom minha luz a resplender,\nMeu Salvador irei saudar,\nTornar-se-á em vista a fé."
    ],
    "coro": "E face a face O verei,\nE Sua graça cantarei.\nE face a face O verei,\nE Sua graça cantarei."
  },
  "271": {
    "id": "271",
    "numero": 271,
    "titulo": "Salvos pela Graça",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Em mim estás, Senhor,\nQue doce reflexão;\nTeu nome é meu louvor,\nÉ Teu meu coração.",
      "De todo pecador,\nAmigo és, leal;\nSalvou-me Teu amor\nCom graça sem igual.",
      "Meu duro coração\nPerdão dos Céus ganhou,\nE paz, satisfação\nAo Te ouvir, Senhor.",
      "Então Te louvarei,\nEm mim estás, Senhor.\nJamais duvidarei,\nPois sei que Teu eu sou."
    ],
    "coro": "Sei, sei, sei:\nHabitas em mim!\nMeu Salvador, sei:\nHabitas em mim!"
  },
  "272": {
    "id": "272",
    "numero": 272,
    "titulo": "Salvos pela Graça",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Salvador, Tu me salvaste,\nTeu, somente Teu, eu sou!\nCom Teu sangue me alcançaste,\nÓ Cordeiro redentor!",
      "Eu lutava o tempo todo\nPor descanso receber;\nMas, cessando meus esforços,\nConfiando, descansei.",
      "Confiando cada instante,\nSinto o Sangue me lavar,\nMergulhado nessa fonte\nDe Teu lado a jorrar.",
      "Consagrado a Teu serviço,\nVivo e morro para Ti;\nTua glória testifico,\nSalvação de graça aqui.",
      "Falarei que o Cristo amado\nDocemente me salvou;\nDa ruína do pecado\nMe lavou e me curou.",
      "Com poder Tu me compraste,\nGlória, glória seja a Ti!\nGlória a Ti que me guardaste,\nGlória hoje e no porvir!"
    ],
    "coro": "A Ti, glória! Aleluia!\nÓ Cordeiro redentor!\nCom Teu sangue me alcançaste,\nA Ti, todo o louvor!"
  },
  "273": {
    "id": "273",
    "numero": 273,
    "titulo": "Salvos pela Graça",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Vem, ó Fonte só de bênçãos,\nFaz que eu cante Teu favor;\nAs mercês que nunca cessam,\nPedem mais e mais louvor.\nQuando era forasteiro,\nVagueando e sem Deus,\nCom Seu sangue, o Cordeiro,\nMe buscou e socorreu.",
      "Devedor à Tua graça —\nMinha doce sensação!\nCom seus elos, ela faça\nPreso a Ti meu coração.\nÓ Senhor, vou, irrestrito,\nTua graça desfrutar,\nE os tesouros infinitos\nDo amor de Deus cantar.",
      "Sou propenso a ser errante,\nA deixar meu Deus de amor;\nTeu Espírito pujante\nSele-me, ó Salvador.\nDo pecado redimido,\nPor Teu sangue que verteu,\nHoje aqui um peregrino,\nFilho e herdeiro sou de Deus."
    ]
  },
  "274": {
    "id": "274",
    "numero": 274,
    "titulo": "Salvos pela Graça",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Em Seu amor e compaixão\nJesus tocou meu coração,\nE na maior vil transgressão\nMe achou, me levantou.",
      "Chamou-me sem nascido eu ser,\nBem antes de O escolher,\nMas, quando vim a Nele crer,\nSalvou-me e levantou.",
      "Espinhos de desdém sofreu,\nCravado à cruz, dor padeceu,\nEm meu lugar tornou-se réu,\nMe amou, me levantou.",
      "No alto, pôs-me a morar,\nMeu coração feliz está;\nMas quem dirá, explicará\nPor que me levantou?"
    ],
    "coro": "Do lamaçal me levantou,\nCom terna Mão me levantou,\nDo negro véu ao claro céu,\nO Salvador me levantou!"
  },
  "275": {
    "id": "275",
    "numero": 275,
    "titulo": "Salvos pela Graça",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Salvação tão grande, plena!\nEis aberta a fonte enfim,\nÀs nações de toda a terra,\nFlui de Cristo, flui sem fim.\nSalvação tão grande, plena,\nFranca, viva, carmesim,\nFranca, viva, carmesim!",
      "Que visão sem par, imensa,\nEsta fonte pura e sã,\nLava culpas e ofensas,\nFaz-me alvo mais que a lã.\nSalvação tão grande, plena!\nBênção ímpar, que porção!\nBênção ímpar, que porção!",
      "Flui o Amor e me invade\nMais profundo, mais além;\nMente, emoção, vontade\nSempre limpas me mantém.\nSalvação tão grande e plena\nDo pecado e seu poder,\nDo pecado e seu poder!",
      "Desce Cristo, o Enviado;\nCristo, a Vida imortal;\nDeus e o homem são mesclados,\nEm um templo terrenal!\nSalvação tão grande e plena!\nTenho a vida divinal,\nTenho a vida divinal.",
      "Não mais medo, nem tristezas,\nDúvidas, opróbrio, ai;\nFé jamais há de ver trevas,\nPois à frente Cristo vai;\nSalvação tão grande, plena!\nFranca, eterna, não decai,\nFranca, eterna, não decai!"
    ]
  },
  "276": {
    "id": "276",
    "numero": 276,
    "titulo": "Satisfeitos com Cristo",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Melodia tenho, que apraz,\nÉ Jesus, meu Amo e Rei,\nQue me diz: \"Não temas; fica em paz,\nPois contigo estarei\"!",
      "O pecado, como me arruinou!\nDor me enchia o coração;\nMinhas cordas Cristo renovou,\nFez vibrarem em canção.",
      "Sempre Sua graça compartir,\nEm Seu seio descansar,\nSua bela face a sorrir,\nEis o que me faz cantar.",
      "Por profundas águas, provações,\nCaso Ele me fizer passar,\nOu caminhos rudes, privações,\nPosso vê-Lo me guiar.",
      "Brevemente Cristo há de vir,\nE tomado aos céus serei;\nDe poder e glória a me vestir,\nLá, com Ele reinarei."
    ],
    "coro": "Oh! Jesus! que Nome\nDúlcido, sem par!\nSatisfaz minh'alma,\nCoração me faz cantar."
  },
  "277": {
    "id": "277",
    "numero": 277,
    "titulo": "Satisfeitos com Cristo",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Já estive tanto tempo a procurar\nUma fonte eternal;\nNada neste mundo pôde me saciar,\nNem me dar prazer real.",
      "Nos pecados nunca mais irei vagar,\nPois a Fonte viva achei;\nE de alegria eis-me a transbordar,\nCristo é meu Senhor e Rei!",
      "Sempre aqui encontro bom descanso, paz\nE real satisfação;\nHá consolo e ricas bênçãos mais e mais,\nGrato está meu coração.",
      "Mesmo ao passar dos anos tenho aqui\nInfindável provisão;\nCura e descanso sempre hão de vir\nAo cansado coração."
    ],
    "coro": "Hoje estou bebendo da Fonte eternal,\nViva, inesgotável e mui real;\nTenho sem medida\nGozo e alegria\nQuando bebo desta Fonte eternal."
  },
  "278": {
    "id": "278",
    "numero": 278,
    "titulo": "Satisfeitos com Cristo",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Do coração, flui melodia:\nÉ meu Cristo, divinal;\nNão, nunca houve outra em mim igual,\nTraz-me gozo celestial.",
      "Imenso amor! Jesus salvou-me,\nGozo e vida me outorgou;\nQue graça! Vive em mim o Salvador,\nProvo Sua graça e amor.",
      "Que plena luz! Jesus me guia,\nPasso a passo canto assim;\nQue paz! Agora Cristo habita em mim,\nMeus louvores não têm fim.",
      "Que glória! Aos céus arrebatado,\nCom Seus santos vou cantar;\nQue honra! Com meu Cristo, enfim, reinar,\nE os anjos festejar.",
      "Que bênção! Na Cidade Santa,\nÁguas vivas vou fruir;\nDa árvore da vida, sempre ali,\nRicos frutos compartir."
    ],
    "coro": "De meu coração, flui melodia,\nBela melodia,\nCheia de dulçor!\nDe meu coração, flui melodia,\nMelodia de amor!"
  },
  "279": {
    "id": "279",
    "numero": 279,
    "titulo": "Satisfeitos com Cristo",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Ouvi Jesus me convidar:\n\"Cansado, vem a Mim,\nNo peito Meu descanso há,\nReclina-te assim\".\nEu, como estava, me acheguei,\nExausto, infeliz;\nMas em Jesus descanso achei,\nE Nele sou feliz.",
      "Ouvi Jesus que exclamou:\n\"A quem tem sede, eis\nDe graça, a água viva dou,\nBebei e vivereis\".\nA Ele vim, e então bebi\nDo rio do Senhor;\nMe saciei, sim, revivi,\nE Nele vivo estou.",
      "Ouvi Jesus me afirmar:\n\"Do mundo, a Luz Eu sou;\nSe olhares para Mim, virá\nTeu dia de esplendor\".\nEu pra Jesus olhei, e achei\nA minha Estrela e Sol;\nE nesta Luz da vida, sei,\nPor toda a vida vou."
    ]
  },
  "280": {
    "id": "280",
    "numero": 280,
    "titulo": "Satisfeitos com Cristo",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Bem ao longe, o rumor e sons de luta escuto,\nSei que tentam terrenais pecados me cercar,\nDúvidas, temores ou as coisas deste mundo,\nDe \"Beulá\", não podem me afastar!",
      "Dúvidas, ao mundo, vêm, abatem qual tormenta,\nE ao inimigo vil se busca derrotar;\nMas é a Palavra do Senhor que me sustenta;\nNada então me fere — eis-me em \"Beulá\"!",
      "Sopram vendavais, mas seu ruído não me aflige,\nPois a mão de meu Senhor me protegendo está.\nBrilha aqui a luz do sol, o mal não me atinge;\nSempre estou seguro — eis-me em \"Beulá\"!",
      "Vejo aqui as obras de meu Deus, sublimes, belas,\nPosso Sua voz ouvir, Seu plano enxergar.\nSei em meu espírito da salvação completa,\nHoje e para sempre, eis-me em \"Beulá\"!"
    ],
    "coro": "Eu vivo sobre o monte, sob um claro, limpo céu,\nE bebo desta fonte, que nunca secará.\nOh! sim, desfruto esta terra, onde manam leite e mel;\nOh! que riqueza há em \"Beulá\"!"
  }
};

Object.assign(data.novo, novosHinos);

fs.writeFileSync(hinosPath, JSON.stringify(data, null, 2), 'utf8');
console.log('Successfully added hymns 261 to 280!');
console.log('Total hymns in novo:', Object.keys(data.novo).length);
