const fs = require('fs');
const path = require('path');

const hinosPath = path.join(__dirname, '../data/hinosData.json');
const rawData = fs.readFileSync(hinosPath, 'utf8');
const data = JSON.parse(rawData);

if (!data.novo) {
  data.novo = {};
}

const novosHinos = {
  "141": {
    "id": "141",
    "numero": 141,
    "titulo": "Sua beleza",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Ó Jesus, tão belo,\nCristo, o Rei dos reis!\nAnjos Te veneram,\nProstram-se a Teus pés;\nPor tal formosura,\nRendem-Te louvor;\nNós também, à uma,\nCom canções de amor.",
      "É o prazer mundano\nGélido e vão;\nCéus, sem Ti, se tornam\nDensa escuridão.\nMas é Tua glória\nLuz superior.\nSim, é Tua glória\nVida de amor.",
      "É a vida, morte,\nSem Teu coração;\nMas Teu meigo toque\nTraz ressurreição.\nMundo, homens e anjos —\nTua criação,\nMas foi Teu arranjo\nVir em servidão.",
      "A beleza mora\nPlena, em Ti, Senhor,\nDa divina glória\nÉs o resplendor.\nBem-aventurado\nQuem, pois, contemplar\nTua face, Amado,\nE Te desfrutar."
    ]
  },
  "142": {
    "id": "142",
    "numero": 142,
    "titulo": "Sua beleza",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Satura a face de Jesus\nDoçura singular;\nCoroa Sua fronte a luz,\nNos lábios graça há.",
      "Incomparável Ele é\nEm meio aos mortais,\nE é mais belo que qualquer\nDas hostes celestiais.",
      "A Ele devo a vida, o ar,\nE tudo o mais aqui;\nDa morte faz-me triunfar,\nDa tumba ressurgir.",
      "Meu pés cansados Ele traz\nA Deus, o Pai, meu lar;\nDivinas glórias ver me faz\nE pleno gozo dá.",
      "Por ter as ricas provisões\nReais do amor de Deus,\nTivesse eu mil corações,\nSenhor, seriam Teus."
    ]
  },
  "143": {
    "id": "143",
    "numero": 143,
    "titulo": "Sua beleza",
    "categoria": "Hinário Novo",
    "estrofes": [
      "De Cristo pleno, o coração\nQuer Suas glórias declarar!\nCom tal canção celestial,\nSó O podemos adorar.\nÓ línguas, logo, pois, rendei\nLouvor ao sumo, grande Rei.",
      "Transbordam graça os lábios Teus,\nO mais formoso és, Senhor,\nTe abençoou, pra sempre, Deus,\nTeu coração é todo amor.\nProstrados, vemos residir\nA plenitude toda em Ti."
    ]
  },
  "144": {
    "id": "144",
    "numero": 144,
    "titulo": "Sua beleza",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Quem Te pode resistir?\nQuem se iguala, pois, a Ti?\nTeu formoso Ser, Senhor,\nAtraiu-me e conquistou.",
      "Quem Te pode descrever?\nDesfrutável é Teu Ser!\nMajestoso, mais que os reis,\nFormidável, grande és!",
      "Dos amáveis, és o mais,\nMais distinto, sobressais,\nMais sublime és, Senhor,\nMais querido, o melhor!",
      "Excelente, és o mais,\nGeneroso, bom demais,\nDerradeiro, o final,\nInfinito, eternal!",
      "Ó Senhor, não tens rival,\nÉs completo, sem igual;\nÉs meu tudo a me suprir,\nQue frescor eu provo em Ti!"
    ],
    "coro": "Jesus, quem, a Ti, acaso se igualará?\nNa terra e céu, ninguém jamais haverá!\nÉ tudo vão, se a Ti comparado for,\nA única realidade és, Senhor!"
  },
  "145": {
    "id": "145",
    "numero": 145,
    "titulo": "Sua dignidade",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Glória a Cristo dai!\nTerra e céu, cantai\nDai-Lhe louvor;\nPois nosso Salvador\nVenceu a morte e dor.\nDigno é o Senhor!",
      "Junto ao trono nós\nA Cristo alçamos voz,\nVoz de louvor;\nSeu sangue já verteu,\nE deu-nos paz com Deus;\nBradai o nome Seu:\nDigno é o Senhor!",
      "Vamos O bendizer,\nA Cristo enaltecer,\nDar-Lhe louvor;\nGlória e adoração,\nDe todo o coração,\nCantar com gratidão:\n\"Digno é o Senhor!\".",
      "Nada nos barrará,\nNem mesmo cessará\nNosso louvor;\nA Cristo exaltar,\nA nosso Rei honrar,\nCantando sem cessar:\n\"Digno é o Senhor!\"."
    ]
  },
  "146": {
    "id": "146",
    "numero": 146,
    "titulo": "Sua dignidade",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Ao que no trono está assentado,\nCom alegria rendemos louvor!\nCheios de bênçãos, aqui Te adoramos,\nSó Tu és digno, amado Senhor!",
      "És Deus real, mas qual homem perfeito\nMorte provaste em nosso favor;\nE, da mulher, Descendente esperado,\nQue da serpente a cabeça pisou.",
      "Como a Ti mesmo Tu te humilhaste!\nPelas criaturas pregado na cruz;\nDos homens ódio, de Deus abandono,\nTudo aceitaste por nós, ó Jesus.",
      "Sobre a morte, Senhor, triunfaste,\nA gloriosa vitória é total;\nComo deixar de contar esta história?\nMorte e Hades venceste afinal!"
    ],
    "coro": "Só Tu és digno! Só Tu és digno!\nGlória, pois só Tu és digno, Senhor!\nCheios de bênçãos, aqui Te adoramos,\nSó Tu és digno, amado Senhor!"
  },
  "147": {
    "id": "147",
    "numero": 147,
    "titulo": "Sua dignidade",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Canta a igreja triunfante:\nDigno é o Senhor!\nHá no céu som retumbante:\nDigno é o Senhor!\nPotestades, principados,\nRendem, a Seus pés prostrados,\nDoce aroma ofertado:\nDigno é o Senhor!",
      "Canta toda língua e raça:\nDigno é o Senhor!\nSalvação de Sua graça:\nDigno é o Senhor!\nVoz de povo numeroso,\nQual trovão mui estrondoso,\nO adora, vitorioso:\nDigno é o Senhor!",
      "Vão eternos os louvores:\nDigno é o Senhor!\nGraça sobre pecadores,\nDigno é o Senhor!\nCom Seu sangue resgatou-nos,\nPara Sua grei levou-nos\nE à glória destinou-nos,\nDigno é o Senhor!",
      "Com alegre expectativa,\nDigno é o Senhor!\nQuer em vales, provas, lidas,\nDigno é o Senhor!\nMelodia admirável\nSobre o tema insondável\nDa mensagem inefável:\nDigno é o Senhor!"
    ]
  },
  "148": {
    "id": "148",
    "numero": 148,
    "titulo": "Sua dignidade",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Só Tu és digno, ó Jesus,\nDe louvores receber;\nTua graça, amor, bondade,\nHá quem possa conceber?",
      "Rendemos honra, adoração\nA Teu nome, Salvador,\nE, de Graça transbordando,\nProclamamos Teu valor.",
      "Erguei as vozes, ó irmãos,\nExaltai ao Salvador,\nTé na glória, já perfeitos,\nEntoarmos Seu louvor."
    ]
  },
  "149": {
    "id": "149",
    "numero": 149,
    "titulo": "Sua dignidade",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Alcemos junto ao trono voz,\nAlegres a cantar;\nEmbora muitos, temos, pois,\nUm tema singular;",
      "\"Cordeiro digno, Redentor,\nO que por nós morreu!\nCordeiro digno, Vencedor,\nQue à glória ascendeu!\"",
      "Jesus, és digno de poder\nE honra divinais;\nA Ti que nosso bendizer\nExceda mais e mais.",
      "Mui breve os santos subirão,\nUm hino a entoar;\nE todos sob os céus irão\nPra sempre Te louvar;",
      "À uma, toda a criação\nRemida bendirá\nA Deus e Seu Cordeiro então,\nQue sempre vão reinar."
    ]
  },
  "150": {
    "id": "150",
    "numero": 150,
    "titulo": "Sua dignidade",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Vamos seguir com a canção\nQue começou o povo Seu,\nA Cristo, dar adoração:\nDigno é o Cordeiro que morreu!",
      "Sangue verteu a nos tornar\nReis-sacerdotes para Deus,\nPois nos tirou pecados já;\nDigno é o Cordeiro que morreu!",
      "Nossa canção até o fim\nE a reinar no reino Seu,\nVai, sem cessar, soar assim:\nDigno é o Cordeiro que morreu!"
    ]
  },
  "151": {
    "id": "151",
    "numero": 151,
    "titulo": "Sua dignidade",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Aleluia! Te rendemos\nHoje, ó Senhor.\nNunca, nunca, cantaremos\nTodo o Teu valor!",
      "Glória Àquele que é digno,\nRedenção nos fez,\nPara Deus já constituiu-nos\nSacerdotes-reis!",
      "Ó Jesus, Te exaltamos,\nTens infindo amor;\nPara sempre, Teus nós somos,\nTu e nós, um só.",
      "Novo cântico ao Cordeiro\nCanta a multidão\nCom os Seus do mundo inteiro —\nQue celebração!"
    ],
    "coro": "Ao Cordeiro que é digno,\nEternal louvor.\nAleluia! Aleluia!\nGlória ao Senhor!"
  },
  "152": {
    "id": "152",
    "numero": 152,
    "titulo": "Sua dignidade",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Glória Àquele que nos ama,\nNossas manchas removeu,\nFez-nos reis e sacerdotes\nPra reinar no reino Seu;\nGlória, graças e louvores\nAo Cordeiro que morreu.",
      "\"Glória, graças e louvores\",\nCantam todos os fiéis;\n\"Honra, força e domínio\nSejam, pois, Ao que nos fez;\nTu és digno, Tu és digno,\nÓ Senhor e Rei dos reis\".",
      "Glória, glória ao Rei dos anjos,\nGlória ao Rei da Igreja dai,\nSim, ao Rei dos reis, a glória,\nCéu e terra, proclamai!\nAo Senhor e Rei da Glória,\nHoje e sempre glória dai."
    ]
  },
  "153": {
    "id": "153",
    "numero": 153,
    "titulo": "Sua todo-inclusividade",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Que Ele é? Pai eterno,\nEle é o Pai eterno;\nPrimogênito da criação,\nQue habita em meu coração.\nPai eterno! Maravilhoso!",
      "Que Ele é? Vivo Rio,\nAbundante e vivo Rio,\nNo deserto pode me alcançar,\nJunto às águas faz-me descansar.\nÉ o Rio! Maravilhoso!",
      "Que Ele é? A Videira,\nA Videira verdadeira.\nAcessível, posso O comer,\nSua rica vida receber.\nQue Videira maravilhosa!",
      "Que Ele é? O Cordeiro,\nO Cordeiro sem defeito.\nVou Seu sangue hoje aplicar,\nE de Sua carne me fartar.\nQue Cordeiro maravilhoso!",
      "Que Ele é? O Espírito,\nSim, tornou-se o Espírito;\nComo Espír'to vida Ele dá,\nDá a nós e a todo que O invocar.\nQue Espír'to maravilhoso!",
      "Que Ele é? A Pessoa\nVerdadeira, viva e boa,\nQue habita nosso interior,\nGloriosa, cheia de esplendor!\nQue Pessoa maravilhosa!",
      "Que Ele é? É o Corpo,\nPlenitude da Deidade;\nÉ o centro do que Deus propôs:\nCristo e a igreja, o novo homem, pois.\nAleluia! Maravilhoso!\nAleluia! Maravilhoso!\nAleluia! Maravilhoso!"
    ]
  },
  "154": {
    "id": "154",
    "numero": 154,
    "titulo": "O deleite do Pai",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Ó Jesus, em Ti reunidos,\nTão somente a Te fitar,\nOh! Que gozo pleno, infindo,\nDe Ti, faz-nos recordar!",
      "Com amor que é infinito,\nFoste amado pelo Pai;\nSeu amor por Ti, ó Filho,\nNossa alma ganha e atrai.",
      "Seu descanso e Seu gozo,\nSeu deleite todo em Ti;\nSó Tu sabes — misterioso —\nO que viu Teu Pai em Ti.",
      "Seu amor em Ti fixado,\n\"Filho amado\", Te chamou;\nMas, da morte, não poupado,\nFoste à cruz por nós, Senhor.",
      "Ó Jesus, que alegria,\nTua face ao contemplar!\nSoa a Deus qual melodia\nEste Nome singular.",
      "Sejam notas radiantes,\nDoces hinos de louvor,\nGloriosos, incessantes,\nTributados ao Senhor."
    ]
  },
  "155": {
    "id": "155",
    "numero": 155,
    "titulo": "Satisfeitos com Ele",
    "categoria": "Hinário Novo",
    "estrofes": [
      "És o Prazer dos corações,\nVida a fluir e nossa Luz;\nO mundo vão, de ilusões,\nNão satisfaz; só Tu, Jesus.",
      "Tua verdade é perenal;\nSalvas a quem Te invocar;\nA quem buscar-Te, és leal,\nE tudo pra quem Te achar!",
      "Vamos provar-Te, vivo Pão,\nE inda mais Te festejar;\nÓ Fonte de satisfação,\nDe Ti beber e nos saciar.",
      "O espírito deseja a Ti,\nSeja o que for que nos vier;\nQue gozo é Te ver sorrir,\nQue bênção é em Ti ter fé!",
      "Sê-nos vigor e posição!\nEm calma sempre nos conduz,\nBane de nós a transgressão,\nDerrama em nós a santa Luz."
    ]
  },
  "156": {
    "id": "156",
    "numero": 156,
    "titulo": "Satisfeitos com Ele",
    "categoria": "Hinário Novo",
    "estrofes": [
      "É Cristo viva fonte,\nProfundo manancial,\nRibeiros que me salvam\nDa dor, pesar e mal.\nMercê que me alcança,\nMui vasta como o mar,\nE suficiente Graça\nMe faz aqui provar.",
      "Oh! Sou de meu Amado\nE Ele, todo meu;\nSou pecador indigno\nTrazido ao gozo Seu.\nFirmado em Sua obra,\nSem outra posição,\nMe oculto diante Dele,\nGuardado em Sua mão.",
      "A Noiva adornada\nCom trajes que teceu;\nSó fita o belo rosto\nDo Noivo amado seu.\nContemplo as Mãos feridas\nE não o galardão:\nCordeiro, és toda a glória;\nE minha posição!"
    ]
  },
  "157": {
    "id": "157",
    "numero": 157,
    "titulo": "Satisfeitos com Ele",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Senhor Jesus, pensando em Ti,\nEm Teu amor sem par,\nQuer nosso espírito aqui\nTeu belo Ser fitar.",
      "Embora no deserto hostil,\nEm meio à sequidão,\nPor entre espinhos, cardos mil,\nArdis e oposição;",
      "Tocamos Teu profundo amor,\nAqui a transbordar!\nContentes, vimos, ó Senhor,\nLouvor Te ofertar.",
      "És nosso Escudo, Vida, Paz,\nComida, Rocha, Luz;\nO meditar em Ti nos faz\nRegozijar, Jesus.",
      "Faz nosso espírito, Senhor,\nSeguir de perto a Ti,\nTé Tua face em fulgor\nA nós se exibir."
    ]
  },
  "158": {
    "id": "158",
    "numero": 158,
    "titulo": "Satisfeitos com Ele",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Jesus, Jesus, ó meu Senhor,\nPerdoa-me se eu\nMil vezes hoje invocar\nO santo nome Teu.",
      "Te amo tanto que não sei\nMeu gozo esconder;\nÉ como fogo Teu amor,\nQue inflama o meu ser.",
      "Riqueza e honra para mim,\nMeu tudo és, Senhor;\nO bem-querer do coração,\nDa alma, o vigor.",
      "Oh! arde, amor, no coração,\nSim, arde sem cessar!\nExtingue outro amor qualquer\nAté não perdurar.",
      "Ó Luz nas trevas, Gozo em dor,\nÓ Vida celestial!\nJesus, és meu precioso Amor,\nQual jóia sem igual.",
      "Qual o limite deste amor?\nAté aonde vai?\nA cada dia Teu dulçor\nAvança e não decai."
    ],
    "coro": "Jesus, Jesus, comigo estás,\nÉs meu descanso, minha paz;\nO Teu sorrir me satisfaz,\nTe amo, meu Senhor."
  },
  "159": {
    "id": "159",
    "numero": 159,
    "titulo": "Satisfeitos com Ele",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Meu coração se apraz, Senhor,\nSó em pensar em Ti;\nE tal prazer será maior\nSe Teu semblante eu vir.",
      "Não há palavras nem canção\nNem mesmo um meditar\nQue possam dar definição\nDe Teu dulçor sem par.",
      "És Esperança n'aflição,\nDos mansos, o Prazer;\nPra quem Te busca és tão Bom,\nDos fracos, o Poder.",
      "Pra quem Te encontra, és o quê?\nComo o descreverá?\nSó quem Te ama o pode ver,\nE Teu amor sondar.",
      "Ó viva Fonte a jorrar,\nMinha fulgente Luz!\nTudo o que posso desfrutar,\nTranscendes, ó Jesus!",
      "Fonte não há além de Ti\nQue possa me saciar;\nOh! rica Fonte a fluir!\nOutra igual não há.",
      "Minh'Alegria és, Jesus,\nMeu Galardão serás;\nSê hoje minha Glória e Luz\nE em eras eternais."
    ]
  },
  "160": {
    "id": "160",
    "numero": 160,
    "titulo": "Satisfeitos com Ele",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Achei um grande Amigo: Jesus, o Salvador,\nO Eleito dos milhares para mim;\nDos vales é o Lírio, o forte Mediador,\nNele tenho o que preciso hoje, aqui.\nEm dores me consola, nas provações me diz:\nAs ansiedades lança sobre Mim!\nDos vales é o Lírio, Estrela da manhã,\nO Eleito dos milhares para mim.",
      "Levou-me as dores todas, as mágoas Lhe entreguei,\nNele tenho firme abrigo em tentação;\nDeixei por Ele tudo, os ídolos quebrei,\nEle me conserva santo o coração.\nQue me abandone o mundo, persiga o tentador!\nJesus me guarda até da vida o fim;\nDos vales é o Lírio, Estrela da manhã,\nO Eleito dos milhares para mim.",
      "Jamais irá deixar-me nem me abandonará,\nSe fiel e obediente eu viver;\nCom fogo me circunda, que hei de recear?\nCom o Seu maná minh'alma vem suster.\nArrebatado à glória, Seu rosto eu verei,\nE rios de delícias vão fluir;\nDos vales é o Lírio, Estrela da manhã,\nO Eleito dos milhares para mim."
    ]
  }
};

for (const [key, hymn] of Object.entries(novosHinos)) {
  data.novo[key] = hymn;
}

fs.writeFileSync(hinosPath, JSON.stringify(data, null, 2), 'utf8');
console.log('Successfully updated hinosData.json with hymns 141 through 160!');
console.log('Total hymns in novo:', Object.keys(data.novo).length);
