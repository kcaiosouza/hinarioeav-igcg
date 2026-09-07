const fs = require('fs');
const path = require('path');

const hinosPath = path.join(__dirname, '../data/hinosData.json');
const rawData = fs.readFileSync(hinosPath, 'utf8');
const data = JSON.parse(rawData);

if (!data.novo) {
  data.novo = {};
}

const novosHinos = {
  "22": {
    "id": "22",
    "numero": 22,
    "titulo": "Sua predestinação",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Glorioso Pai, Te louvo,\nPois Tua imagem sou;\nA fim de alegrar-Te,\nÀ Tua face estou.\nOs filhos que escolheste,\nÀ glória hás de levar,\nCom Cristo, o Filho amado,\nPra sempre Te expressar.",
      "Ó Pai, me escolheste\nBem antes da criação,\nAssim sou Tua herança,\nE Tu, o meu quinhão.\nSim, me predestinaste\nPra filiação ganhar,\nE ser varão perfeito\nA fim de tudo herdar.",
      "Conforme o Teu plano,\nChamaste-me em amor;\nRemiste, deste vida,\nA mim, um pecador.\nE com o Teu Espír'to\nVieste me selar;\nSou Teu, agora e sempre,\nVou Teu amor gozar.",
      "Quem pode abençoar-me,\nSenão só Tu, ó Deus?\nPois Tu me dispensaste\nA vida e Espír'to Teus.\nEm Tua glória, logo,\nCom Cristo hei de estar,\nAssim Teu plano eterno\nIrá se consumar."
    ]
  },
  "23": {
    "id": "23",
    "numero": 23,
    "titulo": "Sua redenção",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Ó Deus, Tu no Cordeiro estás,\nÉs nosso gozo, paz e fé;\nA glória de Teu nome faz\nAbençoado o nosso ser.",
      "És justo e sábio, grande e bom,\nÓ nosso Deus e nosso Pai!\nVieste pela redenção,\nTeus próprios filhos nos tornar.",
      "A Ti, tal graça nos atou,\nDistante não nos deixa ir;\nAssim, guardados no Senhor,\nPodemos Teu amor fruir.",
      "É o que vem nos alegrar,\nAs densas trevas dissolver,\nE nossa frágil voz alçar\nEnquanto fôlego houver."
    ]
  },
  "24": {
    "id": "24",
    "numero": 24,
    "titulo": "Sua redenção",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Dos dons que Teu amor me deu,\nSupremo Doador,\nNão há melhor, nem lá no céu,\nQue o Sangue redentor.",
      "Também a fé, que Nele crê,\nProvinda desse amor,\nMe faz, ó Pai, prezar e ver\nTeu divinal valor.",
      "Tal como o mar é Teu amor,\nQue em si me imergiu;\nPecados meus e faltas, dor,\nA todos já cobriu.",
      "No Sangue foi que encontrei\nOs passos desse amor.\nEm Ti perdão eterno achei,\nJustiça superior.",
      "Embora frágil seja eu,\nAinda confiarei;\nEmbora passem terra e céu,\nNa fé me firmarei.",
      "E na Cidade Santa enfim,\nVou Teu amor provar;\nMas nele hoje vivo, sim,\nE quero me firmar.",
      "Queremos mais louvor render\nA Ti, ó Deus de amor,\nPois revelaste pela fé\nJesus, o Salvador."
    ]
  },
  "25": {
    "id": "25",
    "numero": 25,
    "titulo": "Sua redenção",
    "categoria": "Hinário Novo",
    "estrofes": [
      "A Deus seja a glória, por Seu grande amor,\nSeu Filho amado nos deu e remiu;\nA graça concede ao vil pecador,\nE a porta da vida a todos abriu.",
      "Perfeita, preciosa é a redenção,\nDe Deus a promessa a todo o que crer;\nAté o mais ímpio recebe perdão\nAssim que em Cristo Jesus ele crê.",
      "Oh! Deus grandes coisas por nós operou,\nE que gozo temos mediante Jesus!\nMas êxtase pleno, mais puro, maior,\nTeremos ao vê-Lo na glória, na luz."
    ],
    "coro": "Glória a Deus! Glória a Deus! Todos vós, exultai!\nGlória a Deus! Glória a Deus! Todos juntos, cantai!\nOh! vinde ao Pai por Seu Filho Jesus,\nE dai glórias por Sua obra na cruz."
  },
  "26": {
    "id": "26",
    "numero": 26,
    "titulo": "Sua redenção",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Louvamos-Te, ó Deus,\nPor Jesus, Filho Teu,\nQue por nós, pecadores,\nMorreu e ascendeu.",
      "Louvamos-Te, ó Deus,\nPelo Espírito, luz,\nQue das trevas tirou-nos,\nMostrando Jesus.",
      "Louvamos-Te, ó Deus,\nNosso Pai de amor,\nPois já nos redimiste\nPor Cristo, o Senhor.",
      "E plenos do amor,\nTe louvamos, ó Deus;\nNosso coração arde\nCom fogo dos céus."
    ],
    "coro": "Aleluia! Te adoramos!\nAleluia, amém!\nAleluia! Te adoramos,\nLouvamos também!"
  },
  "27": {
    "id": "27",
    "numero": 27,
    "titulo": "Sua redenção",
    "categoria": "Hinário Novo",
    "estrofes": [
      "A canção eterna não cansamos de cantar:\nGlória a Deus, aleluia!\nCom espírito mais forte vamos entoar:\nGlória a Deus, aleluia!",
      "Hoje imersos somos em Seu redentor amor:\nGlória a Deus, aleluia!\nDesfrutando sempre toda a graça do Senhor:\nGlória a Deus, aleluia!",
      "Vamos para a glória, como disse o Senhor:\nGlória a Deus, aleluia!\nE do Rei veremos logo todo o esplendor:\nGlória a Deus, aleluia!",
      "Lá nós cantaremos Sua graça em novo som:\nGlória a Deus, aleluia!\nLouvaremos Cristo com a grande multidão:\nGlória a Deus, aleluia!"
    ],
    "coro": "A mais bela das canções têm os filhos do Senhor,\nPois à glória eles vão, por Seu divinal favor.\nTodos com o Rei, então, estaremos sem temor!\nGlória a Deus, aleluia!"
  },
  "28": {
    "id": "28",
    "numero": 28,
    "titulo": "Sua redenção",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Ó Deus, por Ti chamados,\nNo Filho vamos crer;\nÉ Ele Teu Amado,\nQue fez o Teu querer;\nTeu coração tocamos\nAo vermos esse Dom,\nTeu puro amor gozamos\nE temos salvação.",
      "Deus de mercês, Pai santo! —\nDevido é tal clamor,\nPois Vida nós ganhamos\nNo Nome do Senhor,\nQue em Ti, mui docemente,\nSoando, Deus de amor,\nLivrou-nos totalmente\nDe culpa e temor.",
      "O pecador, culpado,\nReceio tem de Deus;\nMas, por um preço pago,\nDeus tudo esqueceu;\nPois quando nada pôde\nNos dar libertação,\nNa cruz, Seu Filho trouxe\nCompleta redenção.",
      "Pai, para os que cremos\nNão tens nenhum furor;\nReceio já não temos,\nGanhamos Teu amor.\nAos regressantes filhos,\nTu beijas, vestes dás;\nAo coração aflito,\nTeu grande amor dá paz.",
      "É Teu amor tamanho\nPor pecadores vis!\nPois não Te odiamos\nE fomos tão hostis?\nUm Deus irresistível,\nDeus santo, Deus de amor,\nOutrora, mui temível,\nNos diz: \"Teu, hoje, sou\"."
    ]
  },
  "29": {
    "id": "29",
    "numero": 29,
    "titulo": "Sua redenção",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Aba, Pai, nós reunidos\nEm Jesus, o Salvador,\nDesfrutamos, como filhos,\nTua bênção, Teu amor.\nVeio o Sangue precioso,\nDos pecados, nos limpar,\nTeu Espírito ensinou-nos\nSempre \"Aba, Pai\" clamar.",
      "Quando pródigos outrora\nEm total dissolução,\nTua graça salvadora\nNos tirou da perdição.\nE, vestidos de justiça,\nPara à Tua mesa estar,\nNessa Graça inaudita,\nVamos, Tu e nós, gozar.",
      "Pai, ao pródigo perdoaste,\n\"Nos beijaste\" com amor;\n\"O novilho imolaste\",\nSaciando o pecador.\nTeu convite logo ouvimos:\n\"Alegrai-vos como Eu,\nPois achado foi Meu filho\nQue morreu e reviveu\".",
      "Aba, Pai, Te adoramos,\nE anjos veem lá dos céus\nMaravilhas que expressamos\nDo amor e graça Teus.\nMuito em breve, estaremos\nAnte o Trono, e então,\nTodos juntos saudaremos\nTeu amor na redenção."
    ]
  },
  "30": {
    "id": "30",
    "numero": 30,
    "titulo": "Sua redenção",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Aba, Pai! Te adoramos,\nVimos juntos Te louvar;\nOh! que bênção conhecer-Te\nE chamar-Te: \"Aba, Pai!\".\nTal gratuito dom herdamos\nPelo sangue de Jesus;\nO Espír'to em nós atesta:\nSomos filhos Teus na luz.",
      "Pai, em Cristo, nos criaste,\nEste foi Teu bom prazer;\nEscolheste-nos no Filho\nPara Tua vida ter.\nCom amor Tu nos geraste,\nPreciosos para Ti;\nA Teu Filho — Teu deleite —\nTu nos deste, então, aqui.",
      "Mesmo em Adão, caídos,\nNeste mundo vil, sem Deus,\nAcercaste-nos em Cristo\nPor Seu sangue que verteu.\nRemissão nós Nele achamos\nDos pecados e do mal;\nE com Ele desfrutamos\nViva união real.",
      "Em problemas e doenças,\nMágoas, penas mil e dor,\nNada muda Teus afetos;\nNos conduzes em amor.\nLogo, todos os remidos\nAnte o trono estarão\nTe louvando para sempre\nPor tal rica salvação."
    ]
  },
  "31": {
    "id": "31",
    "numero": 31,
    "titulo": "Sua graça na filiação",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Pai, Te render adoração,\nA graça aqui nos faz;\nEm alegria e retidão,\nConduz-nos mais e mais.",
      "A confiança que nos dás\nTranspõe qualquer louvor;\nE o coração vai onde estás,\nNo celestial fulgor.",
      "Eternas eras falarão\nDe Tua graça, ó Deus,\nAos que quais filhos herdarão\nCom o Amado Teu.",
      "Desertos temos de enfrentar\nA esperar por fé\nJesus nos vir arrebatar\nDa morte e seu poder,",
      "Teu próprio Filho e Tu, ó Pai:\nQue eternal porção!\nCom Quem iremos sempre estar\nEm mútua habitação!",
      "Pai, nesse Nome de amor,\nNos guarda sempre em paz,\nAndando em Ti, sem vil temor,\nCumprindo o que Te apraz."
    ]
  },
  "32": {
    "id": "32",
    "numero": 32,
    "titulo": "Sua graça na filiação",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Deus Pai, Te bendizemos,\nGloriamo-nos em Ti;\nAlém da morte estamos\nCom o Teu Filho aqui,\nQue como Homem vive,\nNa glória de esplendor,\nEm Tua infinda graça,\nEm Teu eterno amor.",
      "Tu és Seu Pai e nosso,\nSeu Deus e nosso Deus;\nÉ Ele o Filho amado,\nO mais querido Teu,\nA Ti nos conduzindo\nA tal porção obter:\nO Teu amor e graça\nE Tua face ver.",
      "Teu envolvente amor, Pai,\nJamais acabará;\nCentrado está em Cristo\nTal grande amor sem par.\nNo Filho, Tua glória\nE amor, descanso têm;\nTeus muitos filhos, Nele,\nA bênção Tua obtêm."
    ]
  },
  "33": {
    "id": "33",
    "numero": 33,
    "titulo": "O louvor de Seus muitos filhos",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Teu Filho amado faz-nos Te louvar\nPós o banquete santo terminar;\nDoces louvores rende, Pai, a Ti,\nE em Seus louvores somos um aqui.",
      "De Ti somente, precisamos, Deus,\nE do amor mui precioso Teu!\nHoje provamos bênção sem igual:\nTua insondável vida divinal.",
      "Em Teu amor, Pai, cresce o nosso a Ti,\nMuito além dos laços vis daqui,\nE com poder nos traz ao coração\nTua presença de satisfação.",
      "A Teu amado Filho, ao nos unir,\nDamos alegres mais louvor a Ti;\nE como filhos vamos desfrutar,\nEm Teu amor, Teu doce nome, Pai."
    ]
  },
  "34": {
    "id": "34",
    "numero": 34,
    "titulo": "O louvor de Seus muitos filhos",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Deus, nosso Pai, nos achegaste a Ti,\nQuais filhos Teus.\nPois Teu amor nos quis introduzir\nEm Ti, ó Deus.\nQue maravilha: muitos podem ser\nA Cristo iguais só para Teu prazer!",
      "Podemos, Deus, por graça partilhar\nTeu forte amor,\nNo Filho, em Quem Teu bom prazer está,\nÓ Pai de Amor!\nE Sua glória já podemos ver,\nHá Nele amor a nos satisfazer.",
      "Que gozo aqui conosco Ele tem\nEm Te louvar;\nAo passo que Teus filhos todos vêm\nA voz alçar,\nDeus soberano e Pai, em Teu louvor,\nAutor da economia do amor."
    ]
  },
  "35": {
    "id": "35",
    "numero": 35,
    "titulo": "O louvor de Seus muitos filhos",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Mui gratos, Pai, Te vimos adorar,\nCom todos Teus,\nE ante Teu glorioso rosto dar\nLouvor, ó Deus.\nA graça ao lar de volta nos mandou,\nJunto de Teu Filho nos colocou!",
      "Oh! Que prazer aí se sobressai,\nOnde se vê\nTeu doce amor, que Nele goza, ó Pai,\nTodo o que crê.\nTeu Filho aos Seus conduz a Te louvar,\nFilhos do Amor juntos a Te honrar.",
      "Oh! Que louvor precioso a Ti, ó Deus,\nO Filho traz;\nTambém o dos eleitos, filhos Teus,\nA quem os faz\nParticipar de Sua posição,\nTeu bom prazer antes da criação."
    ]
  },
  "36": {
    "id": "36",
    "numero": 36,
    "titulo": "O louvor de Seus muitos filhos",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Deus, nosso Pai, rendemos-Te louvor\nPor Teu amor, que revelou Jesus;\nQuem, por prever o gozo posterior,\nOpróbrio, dores suportou, e cruz.",
      "Pai, é Jesus no meio dos irmãos\nQuem Teu louvor nos leva a cantar;\nAo exaltar-Te na congregação,\nTambém com Ele vamos Te louvar.",
      "Eleitos em Teu Filho, que porção!\nProvamos já do gozo celestial;\nÀ filiação, marcados de antemão,\nLouvamos Tua graça divinal.",
      "Geraste a nós e estás a nos encher\nTé Cristo ser em nós porção sem fim;\nE, para Teu deleite e prazer,\nSeus traços, cada um já traz em si."
    ]
  },
  "37": {
    "id": "37",
    "numero": 37,
    "titulo": "O louvor de Seus muitos filhos",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Ó Deus e Pai, a Ti exaltação,\nPois quem mais digno é além de Ti?\nHoje procuras a adoração\nFeita em espírito e verdade a Ti.",
      "No Filho, o mundo Tu criaste, Deus;\nEle o sustenta pelo Seu poder;\nNele podemos vir a Ti, ó Deus:\nOh! que motivo de Te bendizer!",
      "Ao Te rendermos santa adoração,\nEis na igreja Cristo a nos guiar;\nQue alegria, Ele e Seus irmãos,\nEm liberdade, Pai, a Te louvar!",
      "Nós nos unimos neste cântico!\nE Tu, de fato, tens satisfação;\nNestes louvores que Jesus conduz,\nTens para sempre Tua habitação."
    ]
  },
  "38": {
    "id": "38",
    "numero": 38,
    "titulo": "O louvor de Seus muitos filhos",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Deus, nosso Pai, podemos ir a Ti\nNo sangue de Jesus, a nossa paz;\nLibertos e mui próximos de Ti,\nTe adoramos, nosso Deus e Pai.",
      "O Nome de Teu Filho, amado Deus,\nQueremos vir aqui Te oferecer;\nPois, ao morrer, o Salvador, dos céus,\nA Tua graça pôde nos trazer.",
      "Pai, Teu prazer no Filho nos apraz,\nTeu coração podemos partilhar;\nDos belos, o mais belo, o Primaz;\nOh! Nada Sua glória ofuscará!",
      "No Trono estás, e nós a Te adorar\nPor fé e ver Teu Filho de amor,\nQue aos irmãos lidera a cantar.\nA Ele seja glória e louvor!"
    ]
  },
  "39": {
    "id": "39",
    "numero": 39,
    "titulo": "Seu nome, Sua palavra, Sua glória",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Ó Deus Pai, da vida a fonte és!\nNós, Teus filhos, Te exibimos\nE Teu nome possuímos,\nÓ Deus Pai, da vida a fonte és!",
      "Tua vida, Tua vida,\nTua vida faz-nos um.\nNessa vida, nessa vida,\nNessa vida somos todos um.",
      "Graças pela sã Palavra, Pai,\nDe Ti mesmo, nos satura\nE do mundo nos depura.\nGraças pela sã Palavra, Pai.",
      "A Palavra, a Palavra,\nA Palavra faz-nos um.\nNa Palavra, na Palavra,\nNa Palavra somos todos um.",
      "Quanta glória tens, Triúno Deus!\nHoje, nós Teus filhos somos!\nTua glória expressamos!\nQuanta glória tens, Triúno Deus!",
      "Tua glória, Tua glória,\nTua glória faz-nos um.\nNessa glória, nessa glória,\nNessa glória somos todos um."
    ]
  }
};

for (const [key, hymn] of Object.entries(novosHinos)) {
  data.novo[key] = hymn;
}

fs.writeFileSync(hinosPath, JSON.stringify(data, null, 2), 'utf8');
console.log('Successfully updated hinosData.json with hymns 22 through 39!');
console.log('Total hymns in novo:', Object.keys(data.novo).length);
