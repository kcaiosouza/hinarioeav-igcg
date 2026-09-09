const fs = require('fs');
const path = require('path');

const hinosPath = path.join(__dirname, '../data/hinosData.json');
const rawData = fs.readFileSync(hinosPath, 'utf8');
const data = JSON.parse(rawData);

if (!data.novo) {
  data.novo = {};
}

const novosHinos = {
  "200": {
    "id": "200",
    "numero": 200,
    "titulo": "Como o Consolador",
    "categoria": "Hinário Novo",
    "estrofes": [
      "As novas propagai, a todos anunciai,\nAo pobre coração que se encontra em ai;\nÓ santos, com fervor, em alta voz falai:\nEis o Consolador!",
      "A noite já passou, a alva já raiou;\nO negro e denso véu de todo se rasgou;\nDos montes através o brado ressoou:\nEis o Consolador!",
      "O Rei dos reis, então, traz cura e salvação,\nLibertação total a todos em prisão;\nPor celas vagas já se ouve a canção:\nEis o Consolador!",
      "Divino amor sem par! Oh! como anunciar\nA todos os mortais tal graça singular:\nQue eu, da morte réu, a Deus vá expressar!\nEis o Consolador!",
      "Cantai, até o louvor da terra ao céu chegar,\nE hostes celestiais em coro ecoar;\nAo infinito Amor, pra sempre hei de louvar!\nEis o Consolador!"
    ],
    "coro": "Eis o Consolador!\nEis o Consolador!\nO Espírito do céu,\nQue Cristo prometeu.\nAs novas propagai,\nA todos anunciai:\nEis o Consolador!"
  },
  "201": {
    "id": "201",
    "numero": 201,
    "titulo": "Como o Consolador",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Fluem rios d'alegria —\nO Consolador chegou;\nPara sempre moradia\nFez em nosso interior.",
      "Tal celeste Convidado\nVida, gozo e cura traz;\nSai descrença, dor, cansaço,\nVem repouso, fé e paz.",
      "Como chuva, neve, orvalho,\nLuz solar vêm lá dos céus,\nÉ o Espír'to derramado,\nVindo a nós do excelso Deus.",
      "No deserto, o juízo,\nNo pomar, a retidão,\nE no ermo, rios vivos,\nInundando a sequidão.",
      "Sua face sempre vemos,\nQue sublime salvação!\nQue tranquila casa temos!\nQue segura habitação!"
    ],
    "coro": "Que repouso bom, que satisfação —\nSegurança a me firmar!\nEle, em mar voraz, me concede paz,\nCessam ondas de rolar!"
  },
  "202": {
    "id": "202",
    "numero": 202,
    "titulo": "Como o Consolador",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Oh! antes de partir ao céu,\nO amado Redentor\nUm guia nos legou, fiel,\nConsolador.",
      "Qual Hóspede mui doce, vem\nNos influenciar;\nNum coração humilde tem\nDescanso e lar.",
      "E ouvimos-Lhe a terna voz,\nQual brisa que apraz,\nImperfeições expõe em nós,\nTemor desfaz.",
      "Se em nosso ser virtude há,\nConquistas ou laurel,\nOu todo bom e são pensar,\nÉ Seu, só Seu.",
      "Senhor Jesus, em compaixão,\nVê nossa invalidez;\nNos faz Teu lar, habitação,\nE a Ti, fiéis."
    ]
  },
  "203": {
    "id": "203",
    "numero": 203,
    "titulo": "Como a água viva",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Quando no deserto\nVinha Israel,\nSequioso, incerto,\nOrdem Deus lhe deu:\nÀ Rocha, vai,\nManda-Lhe fluir,\nEis já fendida,\nNão A vás ferir.\nÀ Rocha, vai,\nManda-Lhe fluir.\n\nÀ Rocha, vai,\nManda-Lhe fluir,\nE águas vivas\nDela vão sair;\nNão mais duvides,\nPois o Espír'to quer,\nGratuitamente,\nDar-te de beber.",
      "Tu, ó Rocha eterna,\nInda aberta estás;\nTeu Espír'to Santo\nQuer encher-nos mais.\nEis Tua voz:\n\"Vão é resistir,\nClama ao Espír'to,\nPara te acudir,\nÀ Rocha, vai,\nManda-Lhe fluir\".",
      "Dá-me fé mais simples\nPara apenas crer,\nCoração sincero\nPara receber;\nComo um bebê,\nCuja mãe lhe praz,\nQue eu encontre\nEm Teu seio paz.\nVenha me encher\nTua vida mais."
    ]
  },
  "204": {
    "id": "204",
    "numero": 204,
    "titulo": "Como a água viva",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Flui, ó Senhor, de mim, um vaso frágil\nQue Teu perdão e vida já ganhou.\nFlui, ó Senhor, de mim; eu me consagro\nA Te servir em tudo, a Teu dispor.",
      "Flui, ó Senhor, de mim, faz que eu leve\nTeu grande amor às almas a sofrer.\nDá-me a fé que as montanhas move,\nA me suster com divinal poder.",
      "Flui, ó Senhor, de mim até, dos pecados,\nO pecador ganhar libertação,\nTé corações poderem, contristados,\nEm Ti achar completa salvação.",
      "Flui! Flui de mim, aos mortos, dando vida,\nE vencerão qualquer tribulação;\nSim, se abrirá a boca emudecida\nA Te louvar com santa multidão.",
      "Flui! Flui de mim pra sequiosa alma\nA lhe matar a sede interior;\nFlui, e virão ao ermo Tuas águas,\nTudo a florir com glória e dulçor.",
      "Flui! Flui de mim, meu coração desperta\nCom Teu amor perfeito e fiel,\nTé nada além de Ti, Senhor, pudera\nMe aprazer, na terra e no céu!"
    ]
  },
  "205": {
    "id": "205",
    "numero": 205,
    "titulo": "Como a água viva",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Rios de água viva,\nRios do trono a fluir,\nCom bênção todo-inclusiva,\nEis de Jesus a provir.",
      "Ah! todos vós sedentos,\nÀs águas vos achegai;\nE, sem dinheiro, sem preço,\nVinho e leite comprai.",
      "Meu Salvador, me limpa\nTé um canal me fazer;\nEnche-me, usa e ensina\nA crer e obedecer.",
      "É só então que os rios,\nLivres, de mim fluirão;\nÉ só assim que os outros\nTua plen'tude verão.",
      "A Ti, eu me dedico,\nTudo a Teus pés renderei;\nPara Teu santo serviço\nCapacitado serei."
    ],
    "coro": "Rios de água viva,\nRios que fluem sem fim,\nMeu Salvador, de Ti saem;\nQue fluam hoje de mim!"
  },
  "206": {
    "id": "206",
    "numero": 206,
    "titulo": "Como a água viva",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Vimos já, vimos já à casa do Senhor,\nDonde flui, donde flui um rio interior;\nTal fluir a seguir nunca cessará,\nNos fará crescer e frutos vivos dar.",
      "Flui daí, flui daí e, aonde quer que vá,\nAos confins, aos confins, a vida levará;\nUm clamor, ó Senhor, temos, pois, a Ti:\nMais e mais nos mede e possui aqui.",
      "Neste rio, neste rio, nos leva, ó Senhor,\nE conduz, e conduz aonde quer que for;\nCresce mais e nos faz mergulhar em Ti,\nE em Deus por todo o sempre imergir.",
      "O lugar, o lugar por onde o rio passar,\nViverá, viverá, sim, tudo viverá;\nEsse rio mui sadio traz propagação\nE igrejas pela terra brotarão."
    ],
    "coro": "Mede mil, mede mil, nos mede sem cessar,\nMede mil, mede mil, té não poder cruzar,\nE o fluir a se expandir cheio de vigor,\nHá de toda a terra inundar, Senhor."
  },
  "207": {
    "id": "207",
    "numero": 207,
    "titulo": "Como o sopro",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Ó, sopra, Sopro, eternal,\nEm meu estéril, pobre ser\nPinheiro e murta afinal\nNo ermo hão de florescer;\nE tudo, tudo viverá\nPor onde este Rio passar.",
      "Em meu querer, falar e agir\nEu obedeça a Ti, Senhor;\nE sempre santo e puro aqui,\nPreserva-me em Teu amor;\nEnsina-me a orar, lutar,\nMeus maus caminhos evitar.",
      "O rio, Teu Espírito,\nBrilhante qual cristal, provém\nDo trono do Altíssimo\nAos corações que sede têm;\nExausto ali mergulharei,\nDe Tuas águas beberei.",
      "Por Ti, rejeito tudo o mais,\nA Ti eu volto e busco assim;\nEsqueço as coisas terrenais,\nSó lembro: \"Há um Deus em mim\".\nTeu Rio e Chuva certos são!\nPor eles não se espera em vão!"
    ]
  },
  "208": {
    "id": "208",
    "numero": 208,
    "titulo": "Como o sopro",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Sopra em nós, Senhor,\nDe vida a nos encher,\nPara amar o que amas Tu,\nE Teu querer fazer.",
      "Sopra em nós, Senhor,\nTé puros nos fazer,\nTé nossa espera ou ação\nTornar-se Teu querer.",
      "Sopra em nós, Senhor,\nGanha-nos todo aqui,\nTé, tudo em nós que é terrenal,\nTeu fogo consumir.",
      "Sopra em nós, Senhor,\nNão vamos mais morrer,\nMas vida em Ti, a eternal,\nHavemos de viver."
    ]
  },
  "209": {
    "id": "209",
    "numero": 209,
    "titulo": "Como o sopro",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Sopra em nós, Senhor Jesus,\nNa oração a nos ungir;\nÉs deste novo dia luz,\nFonte de vida a fluir.",
      "Que bênção: Tu conosco estás,\nMui acessível, próximo;\nSempre conosco falarás,\nEspírito a espírito.",
      "És Advogado celestial,\nEle, Advogado interior,\nContestas o pecado, o mal,\nE da verdade és defensor.",
      "Ah! Meu descrente coração!\nSei do caminho onde andar,\nMas, meu Amigo, dá perdão\nPor muitas vezes me desviar.",
      "Comigo sê ao mais ninguém\nCompartilhar segredos meus,\nE, em medos, eu conheça bem:\nÉs o Consolador dos céus!"
    ]
  },
  "210": {
    "id": "210",
    "numero": 210,
    "titulo": "Como o sopro",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Sopra em mim, oh! sopra o Espír'to,\nMe ensina a Te inspirar,\nE meu ego e pecados,\nÓ Senhor, Te entregar.",
      "Minha vida eu expiro\nPara a Tua me encher;\nTua vida logo inspiro,\nDeixo as coisas de meu ser.",
      "Meus pecados eu expiro,\nCarregaste-os por mim;\nA pureza Tua inspiro,\nE acho minha vida em Ti.",
      "A tristeza eu expiro\nEm Teu seio que me praz;\nTeu consolo então inspiro,\nTeu descanso, gozo e paz.",
      "A doença minha expiro,\nA tomaste sobre Ti;\nTodo o tempo, pois, inspiro\nTua nova cura aqui.",
      "Meus anseios eu expiro,\nNos ouvidos Teus, Senhor;\nA resposta Tua inspiro,\nExtinguindo meu temor."
    ],
    "coro": "Vou tristezas expirando,\nE pecados meus;\nTe inspirando, inspirando,\nÓ Senhor, meu Deus.\nRespirando o tempo todo,\nDe Ti ganho vida assim;\nPor Ti vivo, sopro a sopro,\nTeu Espír'to sopra em mim."
  },
  "211": {
    "id": "211",
    "numero": 211,
    "titulo": "Como a chuva serôdia",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Numa só alma, no cenáculo,\nEis reunidos os discípulos;\nMesma esperança tinha cada um\nE um só alvo grande e comum.",
      "Numa só alma, té do céu descer,\nNo Pentecostes, Seu poder;\nQuais testemunhas do Senhor, então,\nTodos pregavam a ressurreição.",
      "Numa só alma, aleluias seus\nNo templo erguiam dia a dia a Deus,\nA uma voz e mui intrépidos,\nDavam louvor ao nome de Jesus.",
      "Teu Santo Espír'to verte, ó Senhor;\n\"Chuva serôdia!\" — ouve o clamor;\nUne Teu povo \"num só coração\",\nE Pentecostes novos nos virão!"
    ]
  },
  "212": {
    "id": "212",
    "numero": 212,
    "titulo": "Como as chuvas",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Fartas chuvas, sim, de bênção,\nÓ Senhor, dás sem medir;\nDessas chuvas que refrescam,\nCaiam gotas sobre mim.",
      "Pai amado, não me deixes,\nPecador é este ser!\nPeço que não me rejeites,\nMas me cubras de mercê.",
      "Cristo, fora, não me lances!\nApegar-me, faz-me a Ti;\nTua graça me alcance,\nAo chamares, chama a mim.",
      "Não me deixes, ó Espír'to!\nMas faz este cego ver;\nPor Teu rico Testemunho,\nDá palavra de poder.",
      "Tenho estado eu dormente\nEm pecado e aflição?\nE o mundo vil me prende?\nDá perdão e salvação;",
      "Puro amor de Deus, eterno,\nGraça excelsa e sem fim,\nRico sangue do Cordeiro,\nFaz que cresçam dentro em mim;",
      "Não me deixes, mas perdoa,\nPrende a Ti meu coração;\nQuando outros abençoas,\nLembra-te de mim então."
    ],
    "coro": "Sobre mim, sobre mim,\nCaiam gotas sobre mim."
  },
  "213": {
    "id": "213",
    "numero": 213,
    "titulo": "Como o fogo",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Como o Espír'to vem, Senhor,\nGlória vamos Te render;\nÉs, do Pai, o resplendor\nQue podemos hoje ver.",
      "No altar eis tudo então:\nCorpo e alma, todo o ser;\nMata toda vil paixão,\nNos satura té encher!",
      "Ofertamos o melhor,\nMais precioso para o Teu,\nPor amor ao Salvador,\nQue sangrou, por nós morreu.",
      "Tomo pela fé o dom\nQue Seu sangue me comprou;\nAs promessas minhas são,\nPelo Nome vencedor."
    ],
    "coro": "Vem, Senhor Espírito,\nVem, inflama a cada um!\nSatisfaz-nos o querer,\nDá-nos fogo para arder,\nFogo, fogo,\nDá-nos fogo para arder."
  },
  "214": {
    "id": "214",
    "numero": 214,
    "titulo": "Como o fogo",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Mandou Deus Seu poder\nA um pecador aqui,\nMeu protetor quer ser,\nE graça me infundir;\nO Espírito chegou\nA fim de me reger,\nA chama do Amor\nFaz minha alma arder.",
      "Prostrado ante a cruz,\nAlegre a ofertar,\nMeu tudo a Jesus\nColoco no altar.\nSeu sangue eficaz\nRemiu-me com poder;\nCeleste fogo faz\nO sacrifício arder.",
      "Não por fazer o bem,\nEu abracei a fé;\nA salvação, porém,\nPor Sua graça é.\nOh! glória seja a Deus!\nDesejo O bendizer;\nSeu grande amor verteu,\nFaz minha alma arder."
    ],
    "coro": "Faz minha alma arder,\nFaz minha alma arder,\nA chama do Amor\nFaz minha alma arder.\nO Espírito desceu,\nOh! Glória ao nome Seu!\nA chama do Amor\nFaz minha alma arder."
  },
  "215": {
    "id": "215",
    "numero": 215,
    "titulo": "Como o fogo",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Teu vitorioso amor, Senhor,\nMeu coração encheu;\nNão mais serei um viajor,\nSe arraigar-me em Deus.",
      "Que o fogo santo hoje em mim\nComece a arder\nTé, às paixões, impor um fim,\nE montes remover.",
      "Devore a brasa do altar\nOs vis pecados meus;\nMeu coração inflama já,\nEspírito dos céus.",
      "De mim, ó fogo, a remover\nA velha criação,\nPropaga vida em meu ser,\nTraz santificação.",
      "Meu coração sustém assim\nFirmado em Ti, Senhor;\nPois Tu és tudo para mim,\nE Teu é meu amor."
    ]
  },
  "216": {
    "id": "216",
    "numero": 216,
    "titulo": "O encher",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Oh! me enche do Espír'to!\nMeu espírito Te quer;\nDe Teu Ser mui santo e rico\nVem, Senhor, já, me encher.",
      "Oh! me enche do Espír'to,\nQuanto eu não sei dizer;\nComo eu de Ti preciso!\nVem, portanto, me encher.",
      "De fraquezas, eu sou cheio,\nE prostrado a Ti estou;\nTeu Espírito eterno\nVenha encher-me de vigor.",
      "Sim, me limpa e consola,\nAbençoa, salva mais;\nMeu espírito agora\nDocemente encherás."
    ],
    "coro": "Vem me encher, me encher,\nMe encher do Espírito!\nEsvazia-me, despoja\nE enche do Espírito!"
  },
  "217": {
    "id": "217",
    "numero": 217,
    "titulo": "O encher",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Salvador, Te agradeço!\nCapturou-me Teu amor;\nPor Ti salvo, limpo e cheio,\nTeu canal eu hoje sou.",
      "Um canal com Tuas bênçãos,\nAos sedentos corações,\nTransmitindo Tua graça,\nTeu amor e salvação.",
      "Se vazio, Tu me enches,\nVaso sou em Tua mão;\nCom a ordem, graça rendes,\nO poder é Teu então.",
      "Testifico: do pecado\nTua graça me livrou;\nEu sou Teu, já fui comprado,\nEntra, pois, em mim, Senhor.",
      "Corações a Ti rendidos,\nEnche agora, ó Senhor;\nE que, d'água viva, rios\nFluam do interior."
    ],
    "coro": "Só canais, ó Cristo amado,\nMas com Graça a jorrar;\nFlui de nós, Teus enviados,\nToda hora e lugar."
  },
  "218": {
    "id": "218",
    "numero": 218,
    "titulo": "O encher",
    "categoria": "Hinário Novo",
    "estrofes": [
      "De Teu Santo Espírito,\nEnche-me té o final;\nEu Te peço ávido:\nOh! Me torna Teu canal;\nMais e mais Teu rico Ser,\nFaz, Senhor, de mim verter.",
      "De Teu Santo Espírito,\nEnche-me té transbordar;\nCumpre tal propósito,\nFaz segundo Teu falar;\nDe Jesus, a vida assim\nSempre encha té a mim.",
      "De Teu Santo Espírito,\nEnche-me té transbordar;\nPuro, santo, límpido,\nTua vida a expressar;\nQue Teu doce e bom reger\nGuarde sempre meu viver.",
      "De Teu Santo Espírito,\nEnche-me té transbordar,\nQual canal de Teu amor,\nLuz e graça singular;\nTé Teu rosto eu ver, por fim,\nSalvador, me enche, sim."
    ]
  },
  "219": {
    "id": "219",
    "numero": 219,
    "titulo": "O encher",
    "categoria": "Hinário Novo",
    "estrofes": [
      "De Teu Espír'to, enche-me, Senhor,\nFaz-me do mundo vão me desligar;\nGraça infunde em meu interior,\nFaz-me amar-Te como devo amar.",
      "Não peço sonhos, nem romper-se o véu,\nNem, de profeta, grande êxtase,\nAnjos descerem, nem se abrir o céu,\nMas, de minh'alma, trevas excluir.",
      "Não nos mandaste Te amar, ó Rei,\nDe toda alma, força e coração?\nA Cruz contemplo, lá me apegarei.\nQue eu Te busque e encontre então.",
      "Oh! me ensina a perceber-Te aqui,\nÀs lutas d'alma todas suportar,\nA rebeldia, dúvidas banir,\nSe não respondes, calmo aguardar.",
      "Sim, me ensina, em virginal paixão\nE santa chama viva, a Te amar;\nQue um altar, pois, seja o coração\nE Teu amor o fogo a queimar."
    ]
  },
  "220": {
    "id": "220",
    "numero": 220,
    "titulo": "O encher",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Ó Senhor, que maravilha:\nTeu Espírito em mim!\nTraz verdade, luz e vida,\nBrilha e me guia, enfim!",
      "A Promessa tens cumprido:\nTua vida me livrou\nDo pecado e seu domínio,\nE da morte e seu pavor.",
      "Como anela a corça águas,\nEu suspiro só por Ti!\nBeberá de Ti minh'alma,\nTé, de mim, Teu rio fluir.",
      "Morra o ego, minha carne,\nVem, Senhor, em mim reinar;\nTransformado à Tua imagem,\nQuero sempre Te expressar."
    ],
    "coro": "Vem me encher, me encher,\nMe encher do Espírito!\nEsvazia-me, despoja\nE enche do Espírito!"
  }
};

for (const [key, hymn] of Object.entries(novosHinos)) {
  data.novo[key] = hymn;
}

fs.writeFileSync(hinosPath, JSON.stringify(data, null, 2), 'utf8');
console.log('Successfully updated hinosData.json with hymns 200 through 220!');
console.log('Total hymns in novo:', Object.keys(data.novo).length);
