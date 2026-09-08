const fs = require('fs');
const path = require('path');

const hinosPath = path.join(__dirname, '../data/hinosData.json');
const rawData = fs.readFileSync(hinosPath, 'utf8');
const data = JSON.parse(rawData);

if (!data.novo) {
  data.novo = {};
}

const novosHinos = {
  "51": {
    "id": "51",
    "numero": 51,
    "titulo": "Seu nome",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Que nome excelso o de Jesus,\nNa terra, céu e mar;\nA bendizê-Lo nos conduz,\nO mal faz se afastar!",
      "Que Nome amado, de valor,\nQue ao pecador se deu,\nLhe tira a culpa, o temor,\nE traz-lhe paz do céu!",
      "Que Nome! Faz-nos livres ser\nE calca Satanás;\nAos fracos, dá de Seu poder,\nAos mortos, vida traz!",
      "Oh! queira o mundo ver, provar\nA graça do Senhor!\nE, como eu, se reclinar\nNos Braços de amor.",
      "Eu, Nele, justo hoje sou\nE vivo a clamar:\n\"Eis o Cordeiro redentor\nQue a todos quer salvar!\"",
      "Vou ser feliz se no final\nSeu nome invocar;\n\"Eis o Cordeiro divinal!\",\nAinda proclamar."
    ]
  },
  "52": {
    "id": "52",
    "numero": 52,
    "titulo": "Seu nome",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Oh! que Nome poderoso\nÉ \"Jesus\", que salvação!\nNome excelso, vitorioso —\nDou-Lhe glória, adoração.",
      "Salvador, só em Teu Nome\nTenho toda provisão;\nRespirar Teu vivo Nome\nÉ beber da vida então.",
      "Oh! que Nome poderoso —\nTestificam terra e céu;\nMas o quanto é precioso\nProva só o povo Seu.",
      "É, Jesus, Teu Nome rico,\nNossa espada eficaz;\nTraz vitória, traz domínio,\nE alívio, gozo, paz."
    ]
  },
  "53": {
    "id": "53",
    "numero": 53,
    "titulo": "Seu nome",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Foi a Jesus um Nome dado,\nQue mostra Seu amor fiel;\n\"É meu Irmão\", tem declarado,\nO nome é: Emanuel!\nTrono deixou e Seu renome,\nÀ terra já a nós desceu,\nDeus que se fez eterno homem,\nÉ nosso amor, Emanuel.",
      "Um Nome há mais precioso,\nQue faz perder-nos de amor;\nÉ o de \"Jesus\", maravilhoso,\nCelestial, superior.\nDa morte, dor e do pecado,\nMeu Salvador me salva aqui.\nO Nome de Jesus eu amo,\nPois quis a mim vir redimir.",
      "Se o de Jesus já nos inspira,\nDe Cristo mais, ainda mais!\nDiz de Alguém que nos habita,\nE o coração mui novo faz.\nDo Espírito, traz plenitude\nE o poder dos altos céus.\nÉ Cristo Quem me enche e unge\nDo Espírito, poder de Deus."
    ]
  },
  "54": {
    "id": "54",
    "numero": 54,
    "titulo": "Seu nome",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Oh! Jesus, que Nome amado!\nNome a todos superior!\nFilho do Deus encarnado,\nRei dos reis, Senhor de amor!",
      "Esse Nome é abrigo\nPara a alma em aflição;\nNome perto, mui querido,\nDe quem crê no coração.",
      "\"Ó Senhor!\", sim, sempre invoca\nA Quem pode te salvar\nDo pecado e da cova,\nCom poder te libertar.",
      "Glória e graças ao Amado,\nDia a dia, mais e mais,\nPor salvar-nos do pecado\nE da culpa pertinaz.",
      "É Jesus, do peregrino,\nDoce nota musical,\nE triunfante, belo hino\nDa milícia celestial.",
      "A Jesus, a terra entoa,\nTem-No como o grande EU SOU;\nE louvor o céu ecoa\nAo Cordeiro que sangrou."
    ]
  },
  "55": {
    "id": "55",
    "numero": 55,
    "titulo": "Seu nome",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Só ao Nome excelso\nHão de se dobrar\nTodos os joelhos,\nLínguas confessar:\nCristo, Rei da glória,\nÉ Jesus Senhor,\nSendo desde outrora\nVerbo vencedor.",
      "Tudo a Seu comando\nFez surgir Jesus:\nAnjos e arcanjos,\nBatalhões da luz,\nTronos e domínios,\nAstros na amplidão,\nÓrbitas, caminhos,\nSábia criação.",
      "Humilhado, em dores,\nNome recebeu\nDos vis pecadores\nPara os quais desceu.\nFez Seu nome honroso\nPuro resistir,\nE vitorioso\nFoi ao ressurgir.",
      "Escalou alturas\nCom humana luz,\nDentre as criaturas\nSe elevou Jesus;\nAlcançou vitória,\nJunto de Seu Pai,\nCheio ali de glória,\nEm perfeita paz.",
      "Ó irmãos, chamai-O\nCom amor cabal,\nMui maravilhados,\nEm temor real;\nÉ o Senhor, é Cristo,\nÉ Deus Salvador,\nO EU SOU bendito,\nDigno de louvor.",
      "Reine soberano\nDentro em vós, assim,\nAo que não é santo\nNem veraz, dê fim;\nCapitão, Seu nome,\nTende ao sofrer;\nSeu querer vos tome,\nSua luz, poder.",
      "Ele, sem demora,\nÓ irmãos, virá\nEm divina glória,\nGlória de Seu Pai;\nVão, do mundo, os reinos\nDele se tornar,\nMas O confessemos\nRei da glória já."
    ]
  },
  "56": {
    "id": "56",
    "numero": 56,
    "titulo": "Seu nome",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Seu Nome alçai! Céu, terra e mar,\nBem alto seu poder cantai;\nAo Rei vindouro, vencedor,\nInda vão todos dar louvor.",
      "Seu Nome alçai! Na provação\nEle é refúgio, proteção;\nTal salvação, desfrute e paz,\nSeu vitorioso Nome traz.",
      "Seu Nome alçai! Jesus virá\nE tudo enfim dominará;\nMorte e pecado findarão\nQuando o Senhor reinar então.",
      "Seu Nome alçai! Os reis aqui\nAo Rei Jesus irão seguir;\nOh! sobre todo nome erguei\nO Nome desse amado Rei!",
      "Seu Nome alçai! Pois breve irá\nTodo joelho se dobrar;\nE toda língua dar louvor\nA Jesus Cristo, o Senhor."
    ]
  },
  "57": {
    "id": "57",
    "numero": 57,
    "titulo": "Seu nome",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Louvai ao Rei, Jesus, Senhor,\nQue em majestade está;\nPor todos nós se entregou\nA fim de nos salvar.",
      "Oh! Nome que acima está\nDe todos os demais!\nNome a quem vão adorar\nAs hostes celestiais.",
      "É o Redentor e Salvador\nDo homem, que caiu;\nDa salvação, o Executor,\nMorreu e nos remiu.",
      "Seu Nome há de sempre ser\nO Príncipe da Paz;\nConquistador que vai reger\nPor eras eternais."
    ],
    "coro": "Glória ao Senhor! Glória ao Senhor!\nA Seu Nome, todo o louvor!\nGlória ao Senhor! Glória ao Senhor!\nA Seu Nome todo o louvor!\nAleluia! Aleluia! A Seu Nome todo o louvor!\nAleluia! Aleluia! A Seu Nome todo o louvor!"
  },
  "58": {
    "id": "58",
    "numero": 58,
    "titulo": "Seu nome",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Que nome poderá\nFalar do Salvador,\nQue possa expressar\nSeu singular valor?\nNa terra, algum dos vis mortais,\nOu dentre os celestiais?",
      "Profeta de meu Deus,\nTeu Nome louvarei;\nBaixaste os altos céus\nA fim de nos trazer\nO eterno dom: a salvação\nDa morte e de seu aguilhão.",
      "És Sacerdote-Mor\nQue sangue aqui verteu —\nOferta superior\nQue culpas removeu.\nTeu sangue, autor da redenção,\nTem meu louvor, apreciação.",
      "Meu bom Pastor, me dás\nEm Tua grei estar,\nCom Teu cuidado e paz\nMe apascentar.\nNo seio, Teus cordeiros tens,\nSeus nomes Tu conheces bem.",
      "Meu Salvador, meu Deus,\nConquistador e Rei,\nEspada, cetro Teus\nE graça cantarei;\nEis-me a Teus pés a me prostrar,\nCativo, a Te contemplar."
    ]
  },
  "59": {
    "id": "59",
    "numero": 59,
    "titulo": "Seu nome",
    "categoria": "Hinário Novo",
    "estrofes": [
      "O Senhor, daqueles que O invocam, perto está;\nSe O invocamos, Ele Seu vigor nos dá.\nA Jesus buscando, sempre pronto se nos faz;\nOh! invocar Seu nome traz-nos Seu consolo e paz!",
      "A Jesus invoque, salvo então você será,\n\"Ó Senhor Jesus\" e Ele o libertará!\nTome agora assim o cálice da salvação;\nProvê-nos este Nome grandiosa salvação.",
      "Ao Senhor, judeus e gregos, todos são iguais,\nAos que O invocam, o Seu rico Ser lhes traz.\nÓ Senhor Jesus, que alegria é Te invocar!\nAo respirar Teu nome, quanto gozo nos vens dar.",
      "Desfrutamos sempre o Deus da nossa salvação\nE invocamos este Nome em toda situação.\nInvocar Seu nome em todo o meu viver eu vou,\nPorque os Seus ouvidos para mim Ele inclinou.",
      "Invocamos o que é digno de total louvor;\nNosso coração mui grato adora o Senhor.\nFé, amor, justiça e paz sigamos nós, então,\nCom quem Seu nome invoca com um puro coração!"
    ],
    "coro": "Jesus! Nome tão bom! Este Nome vida nos dá!\nVitorioso, glorioso, exaltado, Nome sem par!\nJesus! Consolador! Este Nome força nos dá!\nPara inspirar, sempre invocar,\nOh! que Nome! Senhor Jesus!"
  },
  "60": {
    "id": "60",
    "numero": 60,
    "titulo": "Seu nome",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Unção é Teu Nome em nós:\nJesus, Jesus, Jesus, Jesus!\nUnção é Teu Nome em nós,\nUnção é Teu Nome em nós.",
      "O Amor das donzelas Tu és:\nJesus, Jesus, Jesus, Jesus!\nO Amor das donzelas Tu és,\nO Amor das donzelas Tu és.",
      "Melhor que o vinho és, Senhor:\nJesus, Jesus, Jesus, Jesus!\nMelhor que o vinho és, Senhor,\nMelhor que o vinho és, Senhor.",
      "Me atrai, correremos pós Ti:\nJesus, Jesus, Jesus, Jesus!\nMe atrai, correremos pós Ti,\nMe atrai, correremos pós Ti.",
      "Senhor, quão formoso Tu és!\nJesus, Jesus, Jesus, Jesus!\nSenhor, quão formoso Tu és!\nSenhor, quão formoso Tu és!",
      "Amor de minh'alma, Te achei:\nJesus, Jesus, Jesus, Jesus!\nAmor de minh'alma, Te achei,\nAmor de minh'alma, Te achei.",
      "A Ti, me agarrei, Noivo meu:\nJesus, Jesus, Jesus, Jesus!\nA Ti, me agarrei, Noivo meu,\nA Ti, me agarrei, Noivo meu.",
      "Vem já, meu Amado Senhor:\nJesus, Jesus, Jesus, Jesus!\nVem já, meu Amado Senhor,\nVem já, meu Amado Senhor.",
      "Senhor, Te amamos demais:\nJesus, Jesus, Jesus, Jesus!\nSenhor, Te amamos demais!\nSenhor, Te amamos demais!"
    ]
  },
  "61": {
    "id": "61",
    "numero": 61,
    "titulo": "Seu nome",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Menino nos nasceu,\nUm Filho se nos deu,\nMaravilhoso o Seu\nNome: Jesus.",
      "É Conselheiro e mais,\nDeus forte, eterno Pai,\nE Príncipe da Paz,\nCristo Jesus.",
      "Ao Deus bendito,\nQue hoje é o Espír'to,\nAo Salvador, Jesus,\nVamos amar, honrar,\nNo espírito adorar;\nQue Nome singular,\nO de Jesus."
    ]
  },
  "62": {
    "id": "62",
    "numero": 62,
    "titulo": "Seu nome",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Ó Jesus, amamos Teu glorioso nome,\nQuer na terra, quer no céu, igual não há.\nInvocar Teu nome aqui\nTrevas e morte faz fugir,\nE a Pessoa do Senhor a nós se dá.",
      "Nossa língua, ó Senhor, alegremente\nTe confessa para a glória de Deus Pai;\nPara nós é Te louvar,\nNosso diário desfrutar;\nÓ Jesus, Teu nome amamos invocar."
    ]
  },
  "63": {
    "id": "63",
    "numero": 63,
    "titulo": "Sua encarnação",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Que bela história de excelsa glória!\nDesceu o Salvador, Jesus, meu Redentor!\nNasceu outrora numa manjedoura,\nHumilde Homem de angústia e dor!",
      "Que obediência, que condescendência!\nNaquela noite atroz, sem esperança, pois;\nBondoso, doce, Deus, sim, humilhou-se,\nSalvou-me e conquistou, me recompôs.",
      "Dom inefável! Tão incomparável!\nO Verbo se encarnou, no Gólgota penou.\nMistério imenso foi ao mundo expresso,\nAgora sei que é o grande EU SOU.",
      "Ressuscitado, foi transfigurado,\nEspírito é a fim de entrar em nós assim;\nQuer, pois, mesclar-se para dispensar-Se,\nE o Triúno Deus nos infundir."
    ],
    "coro": "Ó Cristo amado e adorado!\nÉs minha vida, meu tudo enfim!\nCriador, Seu nome, mas fez-se homem,\nCom plenitude de Deus em Si."
  },
  "64": {
    "id": "64",
    "numero": 64,
    "titulo": "Sua encarnação",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Quantas vozes ecoando\nDocemente pelos céus!\nEis milhares, tantos anjos,\nAleluias dando a Deus.",
      "Que história bela, pura\nCanta esse exército:\n\"Glória, glória nas alturas!\nGlória ao Deus Altíssimo!\"",
      "\"Paz na terra entre os homens\nA quem Deus quer muito bem;\nRedenção há neste Nome,\nGlória demos-Lhe, amém!\"",
      "\"Boa nova trago hoje:\nCristo, o Salvador, nasceu!\nRei, Profeta e Sacerdote!\nAlegrai-vos, terra e céu!\"",
      "\"Homens todos, glória dai-Lhe,\nNele tende júbilo,\nTé um dia entoardes:\nGlória a Ti, Altíssimo!\"",
      "Aprendamos a história\nDo amado Redentor;\nPela terra, Sua glória\nEspalhemos com vigor."
    ]
  },
  "65": {
    "id": "65",
    "numero": 65,
    "titulo": "Sua encarnação",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Cantam hostes celestiais:\n\"Glória ao nato Rei, Jesus!\nPaz na terra aos homens traz,\nPaz com Deus em plena luz\",\nÓ nações, vos ajuntai\nAo triunfo lá do céu,\nCom os anjos proclamai:\n\"Em Belém, o Rei nasceu\".",
      "Adorai, ó terra e céu,\nCristo, o Eterno, o Senhor;\nEm chegando o tempo Seu,\nUma virgem O gerou.\nExultai! Deus se encarnou —\nDivindade sob um véu;\nEntre os homens habitou,\nDeus conosco, Emanuel.",
      "Salve! Sol da Retidão!\nSalve! Príncipe da Paz!\nTraz-nos cura e salvação,\nLuz e vida divinais.\nGlórias quis, por nós, deixar\nPara a morte destruir,\nNascimento novo dar\nE fazer-nos ressurgir.",
      "Ó Desejo das Nações,\nTeu humilde lar nos faz;\nDescendente da Mulher,\nCalca, em nós, a Satanás;\nTira a imagem de Adão,\nPõe a Tua em seu lugar;\nVem, ó Último Adão,\nNo Amor nos restaurar."
    ]
  },
  "66": {
    "id": "66",
    "numero": 66,
    "titulo": "Sua encarnação",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Fiéis, vinde todos!\nBelém procurai,\nAlegres, em coro,\nO Infante saudai;\nEis na manjedoura\nO Rei, Criador;",
      "Celestes criaturas,\nLouvor entoai,\nNas grandes alturas,\nA Deus, glória dai;\nAo Deus de ternura,\nAo Deus de amor,",
      "Ao tão esperado\nReal Salvador,\nO Verbo encarnado,\nQue a virgem gerou,\nPra sempre exaltado\nCom glória e louvor,"
    ],
    "coro": "Ó vinde, adoremos,\nÓ vinde, adoremos,\nÓ vinde, adoremos,\nA Cristo, o Senhor!"
  },
  "67": {
    "id": "67",
    "numero": 67,
    "titulo": "Sua vida",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Lembrando Teu viver, Senhor,\nSe vê nos passos Teus:\nAos homens, Tua graça, amor,\nFidelidade a Deus.",
      "Provou-nos bem mais forte ser\nQue a morte, Teu amor;\nA lança fez de Ti verter\nO sangue redentor;",
      "Embora em penas, dores mil,\nTeus feitos foram bons;\nOh! Quem jamais de Ti ouviu\nVoz de murmuração?",
      "Fiel em meio a infiéis,\nLuz a resplandecer,\nTu confessaste ao Pai de vez,\nAmaste Seu querer.",
      "Tu foste firme nos ardis\nDe perda, opróbrio e dor,\nCaminho de escárnios vis\nA cruz só Te levou.",
      "De Humildade, nos provê,\nIguais a Ti nos faz;\nSenhor, de Ti, ao aprender,\nGanhamos gozo e paz."
    ]
  },
  "68": {
    "id": "68",
    "numero": 68,
    "titulo": "Sua vida",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Quão belos traços divinais\nNas atitudes humanais,\nÓ Filho, Teu viver mostrou\nFormosamente em luz e amor!",
      "Quem como Tu, ó Luz da luz,\nBrilhante e meigo, meu Jesus?\nQuem como Tu já resistiu,\nPaciente, ao mundo triste, vil?",
      "Quem como Tu sofreu desdém,\nHumano escárnio qual ninguém?\nHumilde, mas ainda assim,\nGlorioso, nobre té o fim?",
      "Morte, que traz libertação,\nA Ti foi só dor, aflição;\nEm Teu penar se viu amor,\nMercê, no Sangue remissor.",
      "Belo Senhor, minh'alma quer\nA Ti mais conformada ser;\nVem, ó Humilde, me ensinar\nA como Tu viver e andar."
    ]
  },
  "69": {
    "id": "69",
    "numero": 69,
    "titulo": "Sua vida",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Jesus, beleza e graça tais,\nNos passos Teus, se vê!\nEm Tua vida e morte, ais,\nQue paciente amor!",
      "Teu coração se oprimiu\nDe angústia mais e mais;\nDe Ti, contudo, não se ouviu\nMurmuração jamais.",
      "De inimigos Teus, desdém,\nDe amigos, traição;\nTeu coração de amor, porém,\nInsiste em dar perdão."
    ]
  },
  "70": {
    "id": "70",
    "numero": 70,
    "titulo": "Sua humilhação",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Ó Senhor, Te exaltamos!\nTeus são força e louvor;\nTua graça estimamos,\nSanto, amado Salvador!",
      "Tua glória recusaste,\nPara bênçãos nos doar;\nPobre foste e desejaste\nTua glória nos legar.",
      "Altos céus, por que deixaste\nVindo à terra, só, viver,\nE a glória rejeitaste\nPara até na cruz morrer?",
      "Tinhas no alto glória plena,\nMas na terra, rejeição;\nE levaste nossas penas,\nMesmo ciente de antemão.",
      "Teu amor sem par revendo,\nGozo toma o coração;\nComo, então, Te pagaremos\nEsta grande compaixão?",
      "Breve um dia estaremos\nSem nenhuma restrição,\nQuando em glória serviremos\nSempre a Ti de coração!",
      "\"Esperança, a da glória\"\nAguardamos pela fé,\nA viver por Ti agora,\nTé nos vires receber."
    ]
  },
  "71": {
    "id": "71",
    "numero": 71,
    "titulo": "Seu sofrimento",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Mui só orou o Salvador\nÀ noite no jardim;\nMui só tragou o amargor\nE padeceu por mim.",
      "Mui só Jesus compareceu;\nPilatos O julgou;\nCoroa vil, sim, recebeu,\nAli deixado só.",
      "E para ser o Salvador,\nMui só, a cruz sofreu;\nPor Deus ali deixado, e só\nPor nós, a Vida deu.",
      "Rejeitarás Seu grande amor,\nTão doce doação?\nVem, e jamais O deixes só,\nDá tudo em gratidão."
    ],
    "coro": "Mui só, mui só,\nSofreu aqui mui só;\nPor nos salvar, se entregou,\nMui só penou, sangrou, morreu, mui só."
  },
  "72": {
    "id": "72",
    "numero": 72,
    "titulo": "Seu sofrimento",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Ó meu Senhor, que crime cometeste,\nQue tão mordaz sentença recebeste?\nQue transgressão enfim reconheceste?\nQue, pois, fizeste?",
      "Foste, Senhor, de espinhos coroado,\nSob mui cruéis escárnios maltratado,\nDeram-Te fel e foste abandonado,\nNa cruz pregado.",
      "Que pena mui estranha e perversa:\nMorre o Pastor por Sua grei dispersa;\nPaga o Senhor a dívida imensa\nDe Seus maus servos.",
      "Já que morreu o imaculado Filho,\nPode viver o pecador caído,\nNa divinal justiça absolvido,\nFoi redimido.",
      "Nada, ó Rei, ofusca Tua glória!\nComo espalhar tão deslumbrante História?\nQue acharei a fim de dar-Te em troca?\nÉ tudo escória!",
      "Tua mercê ocupa minha mente;\nGozo nenhum daqui me faz contente;\nSó Teu querer é meu desejo ardente,\nEternamente."
    ]
  },
  "73": {
    "id": "73",
    "numero": 73,
    "titulo": "Seu sofrimento",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Estimamos, Cristo amado,\nTeu caminho d'aflição;\nTua angústia no Calvário,\nPreza nosso coração.",
      "Quão profunda Tua pena,\nNunca havemos de saber;\nSofrimentos, dor extrema,\nNão podemos compreender.",
      "Quem Teus passos seguiria\nAo morreres sobre a cruz?\nSofrimentos sem medida\nForam Teus, só Teus, Jesus!",
      "Em Teu cálix hediondo\nDe ódio, trevas, maldição,\nTraição e abandono,\nTeu amor se vê então."
    ],
    "coro": "Glória, ó Cristo, Te rendemos!\nFoste à cruz por nós morrer!\nGlória, glória Te rendemos!\nNos vieste vida conceder!"
  },
  "74": {
    "id": "74",
    "numero": 74,
    "titulo": "Seu sofrimento",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Meus fardos todos, Salvador,\nTomaste sobre Ti!\nE em meu lugar, um pecador,\nQuiseste à cruz subir.\nAli jorrou, se derramou\nTeu sangue a me remir.",
      "Jesus, de morte e maldição,\nMeu cálix se encheu;\nMas, por amor e compaixão,\nBebeste-o como Teu;\nTornou-se então real porção\nDe bênçãos lá dos céus.",
      "Aprouve a Deus Te oprimir,\nPunir, moer-Te mais,\nPor tal castigo a Te afligir,\nMe concedeste paz;\nE Teu ferir, Teu exaurir,\nA cura eficaz.",
      "Que tempestade desabou,\nÓ Cristo, sobre Ti!\nTeu peito aberto me guardou,\nValente a resistir.\nTeu rosto, em dor, se deformou,\nRaiou a paz aqui.",
      "Deus Sua espada despertou,\nTeu coração feriu!\nTeu sangue abranda Seu furor,\nNão mais Lhe sou hostil.\nA meu favor, a paz criou;\nA Espada então dormiu.",
      "Por mim morreste, Salvador,\nE em Ti morri assim;\nRessuscitaste, ó Senhor,\nE vives hoje em mim.\nVais com calor transformador\nLevar-me à Glória enfim!"
    ]
  },
  "75": {
    "id": "75",
    "numero": 75,
    "titulo": "Seu sofrimento",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Sofreste, Cristo, outrora\nDesdém, ultrajes, dor,\nDe espinhos vil coroa,\nJuízo opressor;\nNa morte subjugado\nLá na maldita cruz,\nMas hoje circundado\nDe majestade e luz.",
      "Ó Sol autor da vida,\nÓ Face de esplendor,\nCuspida e ferida\nDe infâmia e rancor.\nPor causa dos pecados\nNa cruz Tu foste réu;\nO débito quitado,\nTeu sangue nos proveu.",
      "A Ti sinceras graças,\nAmigo, Salvador,\nPois pela humana raça\nSangraste por amor.\nFaz na fidelidade\nDivina nos firmar,\nTé na eternidade\nTeu rosto contemplar."
    ]
  },
  "76": {
    "id": "76",
    "numero": 76,
    "titulo": "Seu sofrimento",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Celebro o vasto amor\nDo Salvador por mim;\nQue alcança um pecador\nPerdido e ruim.\nOh! Quem sou eu,\nQue meu Senhor\nA meu favor\nSofreu, morreu?",
      "Do Trono Ele vem\nA salvação trazer;\nMas, dentre os Seus, ninguém\nQuis Cristo conhecer.\nAmigo meu,\nLeal, sem par,\nPor me salvar\nA vida deu.",
      "Diziam: \"Dai louvor!\nBendito O que vem\nEm nome do Senhor,\nA nós, Jerusalém!\".\nMas, a seguir,\nA meu Jesus,\nClamaram: \"Cruz!\",\nSem desistir.",
      "Da vida o Autor\nO povo quis matar,\nE o rude malfeitor,\nDo cárcere soltar.\nMas foi à cruz\nDisposto, em paz,\nE Seus rivais\nLivrou Jesus.",
      "Em vida, Cristo, pois,\nNão teve casa ou lar;\nEm tumba alheia foi\nNa morte descansar.\nDirei que mais?\nSeu lar, o céu;\nA tumba, o meu,\nOnde Ele jaz.",
      "Rei, Tua história, enfim,\nEu cante em alta voz;\nNão houve iguais, assim,\nAmor, nem dor atroz.\nÓ Deus fiel,\nA Te louvar\nIrei passar\nOs dias meus."
    ]
  },
  "77": {
    "id": "77",
    "numero": 77,
    "titulo": "Seu sofrimento",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Teu sofrimento, Salvador,\nÀs lágrimas nos constrangeu.\nQue graça, amor e resplendor\nEm Ti, Jesus, Emanuel!",
      "Em solidão viveste, mas\nQuanto desdém Te sucedeu:\nGolpes fatais, opróbrio, ais,\nPor nós, Jesus, Emanuel!",
      "Que aflição, angústia atroz,\nQue julgamento tão cruel!\nNa cruz por nós sofreste, pois,\nDe Deus Cordeiro, Emanuel!",
      "Dizem Teu lado, mãos e pés:\nÉs quem morreu e reviveu,\nPor vis rebéis sangraste e és\nQue inda és Emanuel!",
      "Flui dos irmãos, em doce união,\nCelestial louvor fiel\nEm gratidão ao coração\nCheio de amor de Emanuel!",
      "Mas que canção se há de ouvir\nAo contemplar o rosto Teu!\nVamos ali nos dar por Ti,\nEternamente, Emanuel!"
    ]
  },
  "78": {
    "id": "78",
    "numero": 78,
    "titulo": "Seu sofrimento",
    "categoria": "Hinário Novo",
    "estrofes": [
      "És, Jesus, da vida eterna\nE do sopro o Autor!\nSobre as hostes do inferno\nTriunfaste, ó Senhor.\nPor opróbrio, provas, morte,\nAlteraste nossa sorte.\nA Ti mais e mais louvor,\nÓ Senhor de esplendor!",
      "Suportaste, ó Deus Filho,\nZombaria, ódio atroz;\nE coroa de espinhos\nRecebeste, Rei, por nós;\nTua morte libertou-nos\nDo pecado e seus enganos.\nA Ti mais e mais louvor,\nPrecioso Salvador!",
      "Todo opróbrio, paciente,\nTu vieste suportar,\nDor da morte, fel ardente,\nRedenção a nos lograr;\nComo Tu te humilhaste,\nSalvação, pois, nos legaste;\nA Ti mais e mais louvor,\nPrecioso Salvador!",
      "Tua morte que dá vida,\nTua vida d'aflição,\nTe adorando, aprecia,\nNosso grato coração.\nO Teu cálice amargo\nFez-nos bem-aventurados.\nNosso tema de louvor:\nDar-Te graças, ó Senhor."
    ]
  },
  "79": {
    "id": "79",
    "numero": 79,
    "titulo": "Seu sofrimento",
    "categoria": "Hinário Novo",
    "estrofes": [
      "É meia-noite no jardim,\nEstrelas perdem seu fulgor;\nÉ meia-noite, lá, e enfim,\nSó, intercede o Salvador.",
      "É meia-noite, só, Jesus\nEm pranto luta com fervor;\nTé Seus fiéis discípulos\nNão viram Sua angústia e dor.",
      "É meia-noite, e por perdão\nDe outros clama, sofredor;\nProstrado, orava em aflição\nAo Deus que nunca O deixou.",
      "É meia-noite, e nasceu\nUm cântico angelical\nA Lhe abrandar a dor cruel,\nQue não ouviu nenhum mortal."
    ]
  },
  "80": {
    "id": "80",
    "numero": 80,
    "titulo": "Seu sofrimento",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Do universo, o Criador,\nQual Homem, fez-se maldição;\nCumpriu a lei em seu rigor\nE deu-lhe plena quitação.",
      "Foi dos espinhos que criou\nQue Sua fronte se feriu,\nE cada cravo que O pregou,\nDe Suas minas se extraiu.",
      "Formou o bosque que proveu\nMadeiro para O pendurar,\nE o monte onde se ergueu\nA cruz que teve de levar.",
      "O céu que sobre Si curvou,\nUm dia Ele estendeu.\nO Sol que Dele se ocultou,\nFoi Ele quem dispôs no céu.",
      "A lança que Seu lado abriu,\nDeus com Seu fogo temperou.\nDa tumba em que se inseriu,\nAs rochas Sua mão talhou.",
      "O trono em que agora está\nEternamente era Seu;\nMas nova glória Nele há\nE O adoram terra e céus."
    ]
  },
  "81": {
    "id": "81",
    "numero": 81,
    "titulo": "Seu sofrimento",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Ao contemplar aquela cruz\nEm que por mim morreu Jesus,\nTesouros perdem seu valor,\nRejeito o orgulho sedutor.",
      "Em que me posso gloriar,\nSenão em Sua cruz sem par?\nO que me era encantador\nConsagro ao Sangue redentor.",
      "Seus pés e mãos e fronte em dor\nVerteram sangue de amor;\nCoroa de espinhos vil\nMeu Salvador por mim cingiu.",
      "Flui dessa fonte carmesim\nTorrente de amor sem fim;\nO mundo para mim morreu,\nE, para o mundo todo, eu.",
      "Meus fossem terra, céus e mar,\nSeria pouco a ofertar;\nTal grandioso amor requer\nMinh'alma, vida e todo o ser."
    ]
  },
  "82": {
    "id": "82",
    "numero": 82,
    "titulo": "Seu sofrimento",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Foi subindo igual renovo,\nQual raiz de um árido chão;\nNão tinha aspecto formoso\nAgradável à nossa visão;\nDesprezado dentre os homens,\nRejeitado ao máximo até;\nE, como Homem de dores,\nSabe o que é padecer.",
      "Nossas dores e enfermidades,\nCarregou e tomou sobre Si;\nPor nossos pecados, pesares,\nTraspassado e moído ali;\nRude pena a Ele infligida,\nRedimiu-nos e trouxe-nos paz;\nE pelas Suas feridas,\nCura real, eficaz.",
      "Nós, perdidos e desgarrados,\nComo ovelhas, outrora aqui;\nMas todos os nossos pecados\nSobre Ele Deus fez recair.\nOprimido, sob desaforos,\nMas, a boca, Jesus não abriu,\nLevado ao matadouro,\nMudo assim consentiu.",
      "Derramou-se na cruz qual água,\nE secou-se ali Seu vigor,\nQual cera se fez Sua alma,\nDerreteu-se no interior.\nEsvaziou-se completamente,\nHoje pode noss'alma salvar,\nConsigo reis, brevemente,\nNo reino, enfim, nos tornar.",
      "Com perversos Lhe coube a tumba,\nCom o rico, porém, o Senhor;\nEsteve na morte, pois nunca\nInjustiça ou dolo provou.\nVai ver Sua posteridade,\nE Seus dias há de prolongar,\nE em Suas mãos a vontade\nDe Jeová prosperar."
    ]
  },
  "83": {
    "id": "83",
    "numero": 83,
    "titulo": "Sua morte",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Louvor a Quem por nós morreu!\nLouvor a Quem morreu na cruz!\nEmbora aqui desdém sofreu,\nPorção dos santos é na luz.",
      "Bem sobre a Cruz podemos ver\nEm letras vivas: Deus é amor!\nDos céus, Jesus nos fez mercê,\nDe nós, pecados retirou.",
      "A Cruz nos dá total perdão,\nAo fraco espírito, vigor;\nTraz esperança em negridão\nE adoça o cálix de amargor;",
      "É cura à dor, é como unção,\nMedida e penhor de amor,\nAo pecador, é proteção,\nDos anjos, tema de louvor."
    ]
  },
  "84": {
    "id": "84",
    "numero": 84,
    "titulo": "Sua morte",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Oh! aleluia pela Cruz!\nQue morte houve ali!\nNão foi só Cristo que morreu,\nMas tudo o mais se abrangeu;\nPois nela estava Deus,\nTambém você e eu.\nOh! aleluia! Na Cruz morri!",
      "Glória ao Senhor, pois eu em Deus\nAli morri enfim!\nDo velho homem livre estou,\nPois Deus em mim o eliminou!\nQue morte sem igual,\nQue morte sem igual!\nOh! aleluia por esse fim!",
      "Glória ao Senhor, no homem, Deus\nMorreu, se liberou!\nUm grão de trigo que caiu\nNa terra, se reproduziu,\nTornou-se muitos grãos\nCom Sua vida então;\nOh! aleluia, nos avivou!",
      "Todo-inclusiva é Tua cruz,\nOh! Glória a Ti, Jesus!\nEterno é todo o seu valor,\nE tudo gira a seu redor!\nAmamos Tua cruz,\nAmamos Tua cruz;\nOh! aleluia por Tua cruz."
    ]
  },
  "85": {
    "id": "85",
    "numero": 85,
    "titulo": "Sua redenção",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Eis o Cordeiro Redentor\nSobre a cruz! Sobre a cruz!\nPor nós Seu sangue derramou\nSobre a cruz! Sobre a cruz!\nOuvi o forte brado Seu:\n\"Por que deixaste-Me, ó Deus?\";\nChegai e vede que morreu\nSobre a cruz! Sobre a cruz!",
      "Olhai Seus braços que estendeu\nSobre a cruz! Sobre a cruz!\nAs chagas que por nós sofreu\nSobre a cruz! Sobre a cruz!\nO sol reteve seu fulgor,\nO céu vestiu-se de negror,\nEnquanto era Vencedor\nSobre a cruz! Sobre a cruz!",
      "Por fé, O vemos padecer\nSobre a cruz! Sobre a cruz!\nAmargo cálice beber\nSobre a cruz! Sobre a cruz!\nEis montes, terra a oscilar,\nAo vir, por nós, réu se tornar,\nPecados nossos carregar,\nSobre a cruz! Sobre a cruz!",
      "Jesus a obra terminou,\nSobre a cruz! Sobre a cruz!\nTotal vitória conquistou\nSobre a cruz! Sobre a cruz!\nVitorioso, a Fronte ergueu:\n\"Já consumado!\", clama aos céus,\nE, inclinando-se, morreu\nSobre a cruz! Sobre a cruz!",
      "Mas hoje em glória, ascensão,\nEis Jesus! Eis Jesus!\nNo trono em suma posição,\nEis Jesus! Eis Jesus!\nÀ uma, O vamos bendizer,\nProstrados, glória Lhe render:\n\"Cordeiro digno de poder,\nÉs, Jesus, és, Jesus!\""
    ]
  },
  "86": {
    "id": "86",
    "numero": 86,
    "titulo": "Sua redenção",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Por que morreu meu Salvador,\nE sangue o Rei verteu?\nPor mim, um verme, transgressor,\nPor que na cruz se deu?",
      "Por mim, tão vil e pecador,\nJesus fez redenção?\nImensa graça e amor!\nSublime compaixão!",
      "Em trevas se tornou o sol,\nE a luz se escondeu,\nBem quando em carne o Criador,\nNa cruz, por mim morreu.",
      "Meu rosto de vermelhidão\nSe esconde ante a cruz;\nDerrete-se meu coração\nMui grato a Jesus.",
      "Mas lágrimas não vão pagar\nMeu débito de amor.\nSó posso aqui me consagrar:\nSou todo Teu, Senhor!"
    ]
  },
  "87": {
    "id": "87",
    "numero": 87,
    "titulo": "Sua redenção",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Não pôde se salvar,\nMas precisou morrer,\nE ao pecador levar\nA divinal mercê.\nEm meu lugar Jesus sofreu,\nLibertação me concedeu. (bis)",
      "Não pôde se salvar,\nJustiça quis fazer,\nPecados carregar,\nPor mim aqui sofrer.\nDeus me legou, assim, perdão,\nÀ dívida, deu quitação. (bis)",
      "Não pôde se salvar,\nQuis ser meu Fiador;\nFicou em meu lugar,\nMorreu meu Salvador.\nSeu sangue ali na cruz verteu,\nE removeu pecados meus. (bis)",
      "Não pôde se salvar —\nMaravilhoso amor\nQue O fez se entregar!\nMui grande! Superior!\nMeu coração vem derreter\nAté louvor eu Lhe render. (bis)"
    ]
  },
  "88": {
    "id": "88",
    "numero": 88,
    "titulo": "Sua redenção",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Cristo, nosso Salvador,\nVeio ao mundo por amor;\nFez-se um \"varão de dor\".\nAleluia ao Cordeiro!",
      "Ele opróbrio suportou,\nFoi julgado em meu favor.\nE Seu sangue me lavou.\nAleluia ao Cordeiro!",
      "Este nosso ser tão vil\nO Cordeiro já remiu;\nNos amou e atraiu.\nAleluia ao Cordeiro!",
      "Ele sobre a cruz penou,\n\"Consumado está!\", clamou;\nDeus, o Pai, O exaltou.\nAleluia ao Cordeiro!",
      "Quando nosso Rei voltar,\nA Seu reino nos levar,\nVamos outra vez cantar:\nAleluia ao Cordeiro!"
    ]
  },
  "89": {
    "id": "89",
    "numero": 89,
    "titulo": "Sua redenção",
    "categoria": "Hinário Novo",
    "estrofes": [
      "No Santuário Cristo entrou —\nRasgou-se já o véu;\nO incenso que lá se queimou,\nDe glória o encheu.",
      "Lá no Santíssimo Lugar,\nSeu sangue se aspergiu;\nEis Suas chagas a mostrar\nQue a obra concluiu.",
      "E \"Consumado está!\" clamou\nNa cruz em sangue e ais;\nAgora roga o Senhor\nPerante Deus e Pai.",
      "Que Sacrifício eficaz!\nPodemos descansar;\nOh! Sacerdote que nos faz\nAlém do véu entrar!"
    ]
  },
  "90": {
    "id": "90",
    "numero": 90,
    "titulo": "Sua redenção",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Oh! Quão solene, célebre:\nÀ noite, em solidão,\nDe Deus, o Filho único,\nQual Homem, pelos ímpios,\nExpira — que visão!\nSenhor da glória que sofreu!\nSenhor da vida que morreu!",
      "Mistério dos mistérios:\nDe vida e morte — a Cruz!\nO centro és dos séculos,\nQue miram-Te em êxtase,\nAdiante e atrás, na luz,\nÓ Cruz de morte e dor fatal,\nÉs nosso ganho eternal.",
      "Tocado é nosso interior\nAo contemplar a Cruz!\nA morte do encarnado Amor!\nQue opróbrio, dor, prazer maior,\nPor nós morreu Jesus!\nSeu brado é de comover:\n\"Me abandonaste, Deus, por quê?\".",
      "Restava a nós condenação,\nDor, morte e temor;\nMas nos tiraste a transgressão,\nE a autojustificação,\nCordeiro redentor.\nA confiança própria, assim,\nNa cruz Contigo teve fim.",
      "Divina vida, ao ressurgir,\nTornou-nos homens-Deus;\nSim, pertencemos hoje a Ti,\nContigo vamos refulgir,\nCabeça és dos Teus!\nNós, antes réus de eterno ai,\nClamamos hoje: \"Aba, Pai!\"."
    ]
  },
  "91": {
    "id": "91",
    "numero": 91,
    "titulo": "Sua redenção",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Bom é, Senhor, poder\nEm Ti nos ocultar;\nO Deus de amor Teu sangue vê\nA nos justificar.",
      "Quando em Teu nome é\nNosso clamor a Deus,\nDeve o Pai nos acolher\nTal qual ao Filho Seu.",
      "És Quem a lei cumpriu,\nE nos justificou,\nO fel sorveu, nos substituiu\nE vida nos legou.",
      "Amigo és, Jesus,\nDo pecador mortal!\nVoz só dos Teus é que produz,\nA Ti, louvor real.",
      "Só Tua redenção\nFaz-nos comparecer\nAnte o trono, em perfeição,\nE Tua face ver.",
      "Graças e adoração\nPor tudo o que és,\nVamos render de coração,\nProstrados a Teus pés."
    ]
  },
  "92": {
    "id": "92",
    "numero": 92,
    "titulo": "Sua redenção",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Oh! que doce história do amor de Jesus:\nDeixou Ele a glória, morreu sobre a cruz!\nSofreu o castigo em nosso lugar,\nLogrou redenção e nos pôde livrar.",
      "Que maravilhosa é a redenção!\nO sangue de Cristo nos traz o perdão.\nJesus já cumpriu a justiça de Deus;\nEstão mui contentes os homens e Deus.",
      "Fulgente é a glória de Cristo, o Senhor;\nJesus, nome excelso, tão superior!\nÉ Rei coroado de glória e poder,\nE digno de todo louvor receber."
    ],
    "coro": "Exultai, exultai, consumado está!\nAo Senhor, o louvor pela graça sem par!\nOh! nós entoamos infindo louvor\nA nosso glorioso Jesus Salvador!"
  },
  "93": {
    "id": "93",
    "numero": 93,
    "titulo": "Sua redenção",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Como ao Senhor é bom louvar!\nTemos de dar-Lhe adoração;\nE se então alguém calar,\nPedras até proclamarão.",
      "Vamos, irmãos, O bendizer:\nSangue verteu e nos lavou,\nDe volta a Deus, nos quis trazer,\nE nos sustém com Seu amor.",
      "Canta a canção celestial\nQuem Seu amor conhece bem;\nSom de dulçor especial,\nTêm Seus irmãos, e mais ninguém.",
      "Anjos tentaram perscrutar\nComo em Jesus há redenção;\nNunca, porém, vão desfrutar,\nDo Sangue, a purificação;",
      "Podem louvar seu Criador,\nNa condição de ser só Deus,\nNosso, porém, é o louvor:\n\"No trono há um Homem-Deus!\"",
      "Glória, Senhor, a Teu amor —\nFez-Te sangrar, morrer aqui\nPara salvar o pecador\nE junto ao Pai o conduzir!"
    ]
  },
  "94": {
    "id": "94",
    "numero": 94,
    "titulo": "Sua redenção",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Salve, ó Cristo desprezado!\nSalve, ó Rei em rejeição,\nMorto para libertar-nos,\nDar gratuita salvação!\nNosso opróbrio, dor, pecado\nSuportaste ao morrer!\nVida, glória e amparo\nSó Teu nome faz-nos ter.",
      "Sobre Ti, no vil madeiro,\nDeus pôs nossas transgressões,\nSim, ungiu-Te, ó Cordeiro,\nE operaste redenção.\nPerdoados, pois, Teus crentes,\nGozam graça resplandente,\nBênção que do céu desceu.",
      "Salve, ó Cristo entronado,\nSalvador nos altos céus!\nPela fé és adorado\nJunto à destra mão de Deus.\nComo nosso Paracleto,\nCompartilhas nossa dor\nE por nós lá intercedes,\nTé surgirmos em fulgor.",
      "Graças, glória e honores\nÉs mui digno de obter;\nEm mais alta voz louvores\nSempre vamos Te render.\nQuando enfim os santos todos\nTe encontrarem, cantarão;\nCorações mui jubilosos\nSem cessar Te saudarão."
    ]
  },
  "95": {
    "id": "95",
    "numero": 95,
    "titulo": "Sua redenção",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Glória a Cristo sempre,\nQue por mim sofreu\nE precioso Sangue\nSobre a cruz verteu.",
      "Graça e vida eterna\nNesse Sangue há;\nQue Bondade terna,\nGrande, singular!",
      "Glória eterna à Fonte\nRica, carmesim;\nRedimiu os homens\nSeu penar sem fim.",
      "De Abel, o sangue\nClama punição;\nMas, de Cristo, o Sangue,\nJustificação;",
      "E, de má consciência,\nLimpa o coração;\nFoge em falência,\nO diabo então.",
      "Quando a terra exulta,\nHá louvor nos céus:\nCantam nas alturas\nTodos anjos Seus.",
      "Tal pujante Fonte\nExaltai, cantai;\nO precioso Sangue\nMais e mais louvai."
    ]
  },
  "96": {
    "id": "96",
    "numero": 96,
    "titulo": "Sua redenção",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Grande é o Senhor,\nCheio de esplendor!\nSeu domínio é eterno,\nE Seu reino, sempiterno!\nNos mais altos céus,\nSoberano Deus!\nExaltado, em Sua glória,\nReina sempre em vitória!",
      "Sendo o Deus Criador,\nPor amor,\nDe Seu trono desceu,\nTornou-se Emanuel,\nPor mim se entregou!",
      "Ele à cruz foi enfim;\nMorto assim,\nSeu perdão divinal\nE Sua vida eternal\nDeu a mim!",
      "Destruiu\nEgo, morte e pecado,\nFez seu vil poder prostrado,\nRessurgiu!",
      "Eis, na cruz,\nSangue e água de Seu lado;\nEis perdão e vida dados\nPor Jesus!",
      "Moras, ó Senhor,\nEm meu interior!\nHás de Teu labor\nConcluir!",
      "Vou me sujeitar\nA Teu trabalhar\nTé eu expressar\nSó a Ti."
    ]
  },
  "97": {
    "id": "97",
    "numero": 97,
    "titulo": "Sua ressurreição",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Cristo já ressuscitou,\nAleluia!\nSobre a morte triunfou,\nAleluia!\nCéus e terra, exultai,\nAleluia!\nVós, remidos, O louvai,\nAleluia!",
      "Cristo a morte aniquilou,\nAleluia!\nO seu aguilhão quebrou,\nAleluia!\nSim, morreu e nos salvou,\nAleluia!\nE a serpente esmagou,\nAleluia!",
      "Uma vez na cruz sofreu,\nAleluia!\nUma vez por nós morreu,\nAleluia!\nMas agora vivo está,\nAleluia!\nPara sempre reinará!\nAleluia!",
      "Ressurgimos com Jesus,\nAleluia!\nJunto a Ele em glória e luz!\nAleluia!\nDeste mundo nos atrai\nAleluia!\nPara a glória de Deus Pai,\nAleluia!"
    ]
  },
  "98": {
    "id": "98",
    "numero": 98,
    "titulo": "Sua ressurreição",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Ressurgiu! Oh, aleluia!\nCristo a morte derrotou!\nDai-Lhe glória! Aleluia!\nQual Cabeça triunfou.\nGratos, nós O adoramos\nAo surgir Seu esplendor,\nE, alegres, nos prostramos,\nSem tristeza, pranto ou dor.",
      "Ressurgiu! E pelas provas\nDesta vida já passou;\nRessurreto, vida nova,\nEle em Sua glória entrou.\nMorte e Hades derrotados,\nSurge assim o Vencedor,\nVem de glória coroado,\nMajestoso, superior.",
      "Ressurgiu! Não mais a morte\nHaverá de nos prender;\nEis em Cristo nossa sorte,\nSempre tudo, pois, vencer.\nDe temores, desalentos,\nSalvo, nosso coração;\nRessurretos, celebremos\nHoje a ressurreição."
    ],
    "coro": "Ressurgiu! Oh, aleluia!\nCristo a morte derrotou!\nDai-Lhe glória! Aleluia!\nQual Cabeça triunfou."
  },
  "99": {
    "id": "99",
    "numero": 99,
    "titulo": "Sua ressurreição",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Ressurgiu! oh! aleluia!\nCristo ao céu já ascendeu!\nDas prisões da morte, livres,\nAlegrai-vos, santos Seus!\nRessurreto, ressurreto,\nVida Ele dá aos Seus.",
      "Ressurgiu! oh! aleluia!\nE de tudo é Senhor!\nEnviou-nos o Espír'to\nComo nosso Intercessor.\nRessurreto, ressurreto,\nEle justos nos tornou.",
      "Ressurgiu! oh! aleluia!\nPara a morte aniquilar,\nPois o Cristo ressurreto\nDela almeja nos livrar!\nRessurreto, ressurreto,\nBreve Ele voltará."
    ]
  },
  "100": {
    "id": "100",
    "numero": 100,
    "titulo": "Sua ressurreição",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Glória ao Filho, que ressuscitou,\nAlcançou vitória, morte enfim tragou;\nRemovida a pedra foi de seu lugar,\nEis vazia a tumba, ressurreto está.",
      "E, ressurreto, vem-nos encontrar,\nCom amor saudar-nos, medo e dor tirar;\nJá perdeu a morte seu vil aguilhão,\nCristo hoje vive, dai-Lhe adoração!",
      "És Rei da glória, como duvidar?\nNós, Contigo, a morte vamos derrotar;\nFaz-nos vencedores em ressurreição,\nTé chegar Teu reino — nosso galardão."
    ],
    "coro": "Glória ao Filho, que ressuscitou,\nAlcançou vitória, morte enfim tragou."
  }
};

for (const [key, hymn] of Object.entries(novosHinos)) {
  data.novo[key] = hymn;
}

fs.writeFileSync(hinosPath, JSON.stringify(data, null, 2), 'utf8');
console.log('Successfully updated hinosData.json with hymns 51 through 100!');
console.log('Total hymns in novo:', Object.keys(data.novo).length);
