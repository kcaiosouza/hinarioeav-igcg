const fs = require('fs');
const path = require('path');

const hinosPath = path.join(__dirname, '../data/hinosData.json');
const rawData = fs.readFileSync(hinosPath, 'utf8');
const data = JSON.parse(rawData);

if (!data.novo) {
  data.novo = {};
}

const novosHinos = {
  "241": {
    "id": "241",
    "numero": 241,
    "titulo": "Amados pelo Senhor",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Que amor sem par, sincero,\nMais profundo que o mar:\nCristo vir e, no madeiro,\nCom Seu sangue, nos comprar!\nQuem acaso poderia\nEsquecer-se desse Amor?\nTens, ó Príncipe da Vida,\nPelos séculos, louvor!",
      "Sobre o monte do Calvário,\nRica fonte se abriu:\nDos depósitos do alto,\nA mercê de Deus fluiu.\nGraça, amor se derramaram,\nComo rios, com vigor,\nE Justiça e Paz beijaram\nEste mundo pecador.",
      "Teu amor que eu desfrute,\nPossa sempre Te amar;\nE somente o reino busque,\nViva para Te louvar;\nHás de ser a minha glória,\nNunca este mundo vão.\nLimpo e santo sou agora,\nSó Tu dás libertação.",
      "Na Palavra Tu me guias\nPelo Espírito, aqui;\nTua graça me sacia,\nConfiando eu em Ti.\nSem medida, em mim derramas\nTeu poder e grande amor,\nPlenamente, pois, me ganhas\nE atrais a Ti, Senhor."
    ]
  },
  "242": {
    "id": "242",
    "numero": 242,
    "titulo": "Perdoados por Deus",
    "categoria": "Hinário Novo",
    "estrofes": [
      "De Sua mercê devedor —\nEis minha canção e prazer!\nSim, Deus já me justificou,\nMeu ser, tudo vou Lhe trazer.\nOs medos da lei e de Deus\nNão me causam mais pavidez,\nPois Cristo Seu sangue verteu,\nMeus muitos pecados desfez.",
      "A obra que em mim Ele tem\nSeu braço há de concluir;\nE, como o Sim e o Amém,\nVai Suas promessas cumprir!\nNem coisas presentes quaisquer,\nNem as do porvir que enfrentar\nSeu plano conseguem deter\nOu de Seu amor me apartar.",
      "Meu nome apagar-Lhe das Mãos\nO tempo não pode, jamais;\nNa tábua de Seu coração\nA Graça, indelével, o faz.\nTé o fim devo perseverar,\nÉ Sua Palavra que diz,\nE quando esta terra deixar,\nCom Deus estarei mais feliz."
    ]
  },
  "243": {
    "id": "243",
    "numero": 243,
    "titulo": "Perdoados por Deus",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Deus meus pecados perdoou,\nAtrás de Si os atirou,\nDos quais jamais se lembrará,\nPor eles não me julgará.",
      "Deus meus pecados perdoou\nE sob Seus pés já os calcou;\nDe modo algum os olhará,\nNem mesmo examinará.",
      "Deus meus pecados perdoou,\nQual pedra, ao mar já os lançou;\nDistantes já estão de mim,\nQual leste do oeste — assim."
    ],
    "coro": "Deus perdoou pecados meus,\nQual nuvem que se dissolveu;\nE transgressões me dissipou\nQual névoa ao sair o sol."
  },
  "244": {
    "id": "244",
    "numero": 244,
    "titulo": "Limpos pelo sangue",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Limpos no Sangue que verteu,\nCheios de todo o Ser de Deus,\nVamos por fé nos passos Seus,\nAleluia! Aleluia!",
      "Vamos em Cristo descansar,\nPaz e alegria desfrutar,\nE Nele o melhor achar,\nAleluia! Aleluia!",
      "Guarda-nos com poder Jesus,\nEm Sua Mão, poder e luz,\nDe glória em glória nos conduz,\nAleluia! Aleluia!",
      "Quem vive em nós é o Senhor,\nDando-nos paz interior,\nDa morte à vida, em Seu vigor,\nAleluia! Aleluia!",
      "Que Salvador! Excelso Dom!\nOuça-nos toda a criação,\nSom de contínua exultação,\nAleluia! Aleluia!"
    ]
  },
  "245": {
    "id": "245",
    "numero": 245,
    "titulo": "Limpos pelo sangue",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Que salvação do mundo e brilho seu,\nNo sangue que Jesus por mim verteu;\nJunto da cruz meu coração está,\nSeu precioso sangue pode me lavar.",
      "Eu, pecador, não tinha direção,\nPreso a paixões cruéis do coração;\nTinha pavor de Deus e Seu furor,\nTé me purificar no sangue do Senhor.",
      "Antes, prisão, mas, já, libertação;\nAntes sem ver, agora sã visão;\nMorto era eu, em Cristo renasci,\nA fim de Sua paz ao mundo transmitir."
    ],
    "coro": "Eu amo a Cristo,\nPois Ele me amou\nE salvação por mim\nLá na cruz comprou."
  },
  "246": {
    "id": "246",
    "numero": 246,
    "titulo": "Justificados em Cristo",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Com Cristo, minha retidão,\nMeu belo traje e condição,\nEm meio ao mundo a arder,\nAlegre posso a fronte erguer.",
      "Por pecadores se verteu,\nSenhor, o rico sangue Teu,\nEternamente eficaz,\nQue à minha alma trouxe paz.",
      "Os ímpios podem exceder\nOs grãos de areia que houver:\nA todos podes dar perdão,\nFazendo plena redenção.",
      "Oh! Já não há condenação,\nQuem me fará acusação?\nPor Ti sou livre de temor,\nPecado, opróbrio, culpa e dor.",
      "Sem mancha a veste se mantém,\nSe anos passam, anos vêm,\nNão perde o viço, a glória, a cor,\nTem novidade, tem frescor.",
      "Deus de amor, Deus de poder,\nMisericórdia vens trazer;\nQual bela veste que reluz,\nJustiça nossa és, Jesus."
    ]
  },
  "247": {
    "id": "247",
    "numero": 247,
    "titulo": "Justificados em Cristo",
    "categoria": "Hinário Novo",
    "estrofes": [
      "E como foi que eu ganhei\nPorção no sangue de Jesus?\nPor mim morreu, O fiz sofrer\nE persegui até a cruz.\nGrande amor! Que ocorreu?!\nPor mim morreste, ó meu Deus!",
      "Pode morrer o Imortal?!\nQuem vai Seu plano perscrutar?\nTenta em vão o serafim\nO divinal Amor sondar.\nTerra, adorai! Mercê sem par!\nCessai, ó anjos, de indagar!",
      "O trono de Seu Pai deixou —\nGratuita Graça é sem fim;\nSe despojou, mas não do amor,\nSangrou por todos nós, assim.\nFranca mercê fenomenal,\nÓ Deus, achou-me afinal.",
      "Meu pobre espírito em prisão\nPecado e trevas só provou;\nMas Teu olhar o reviveu,\nMeu calabouço iluminou;\nSe libertou meu coração,\nErgui-me e Te segui então.",
      "Não temo mais condenação,\nJesus, e tudo Nele, é meu;\nÉ meu Cabeça, vivo estou,\nPois com Justiça me envolveu.\nAo Trono ouso me achegar,\nPor Cristo, o prêmio a clamar."
    ]
  },
  "248": {
    "id": "248",
    "numero": 248,
    "titulo": "Justificados em Cristo",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Oh! não há mais condenação!\nMinh'alma, ouve bem!\nJesus te deu a salvação\nE te curou também.",
      "Qual Advogado junto ao Pai\nEstá o Salvador;\nNo coração, Seus santos traz\nQuais joias de valor.",
      "\"Oh! não há mais condenação!\",\nDeclara Deus a ti;\nNo Cristo da ressurreição\nPerfeita és enfim.",
      "Ensina-me, Deus, a fixar\nEm Cristo os olhos meus,\nAssim vou Teu querer amar,\nE honrar o nome Seu."
    ]
  },
  "249": {
    "id": "249",
    "numero": 249,
    "titulo": "Justificados em Cristo",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Minh'esperança e fundação\nSão Cristo, minha retidão;\nNão ouso em nada mais confiar,\nMas em Seu nome me apoiar.",
      "Se Sua face se encobrir,\nDescanso em Sua graça aqui;\nEm tempestade, escarcéu,\nAncoro, firme, além do véu.",
      "Seu sangue e pacto eternal\nMe susterão no temporal;\nSe ao redor tem tudo fim,\nQue esperança Cristo em mim!",
      "Desejo Nele me achar,\nEm Seu poder, ao retornar;\nE Nele, o Justo, estarei\nPerante o trono de meu Rei."
    ],
    "coro": "Só Cristo é Rocha, firme Chão;\nOs outros mais afundarão,\nOs outros mais afundarão."
  },
  "250": {
    "id": "250",
    "numero": 250,
    "titulo": "Reconciliados com Deus",
    "categoria": "Hinário Novo",
    "estrofes": [
      "A mente em plena paz com Deus —\nQue bênção isso traz!\nO Sangue me reconciliou,\nDe fato isso é paz!",
      "Em natureza e ações,\nDistante estava eu;\nDe Deus a graça me acercou\nNo Sangue que verteu.",
      "Tão perto como o Filho está,\nAssim estou de Deus;\nMais perto eu não posso estar,\nEstou no Filho Seu.",
      "E mui querido sou de Deus,\nQuerido Dele, sim;\nMe ama como ao Filho Seu,\nMe ama Deus, assim.",
      "Que ansiedades posso ter,\nSe esse Deus é meu?\nZeloso, dia e noite diz:\n\"O que é Meu é teu!\""
    ]
  },
  "251": {
    "id": "251",
    "numero": 251,
    "titulo": "Reconciliados com Deus",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Em pé, minh'alma, em pé,\nNão tenhas mais temor;\nVerteu o sangue até\nPor mim o Salvador.\nTraz doce paz e convicção,\nMeu nome ver em Suas mãos.",
      "No céu, eis o Senhor\nPor mim a suplicar,\nCom redentor amor\nE sangue singular.\nSeu sangue, que nos redimiu,\nCaminho a Deus já nos abriu.",
      "O Filho cruz sofreu\nE chagas suportou;\nAgora clama a Deus,\nRogando a meu favor:\nAo pecador, perdoa já,\nResgata-o, comprado está.",
      "O Pai atenderá\nDo Filho, a oração;\nE não Lhe negará\nNenhuma petição.\nO Espírito resposta dá:\nDo alto me gerou Deus Pai.",
      "Em paz com Deus estou,\nPerdão já posso ouvir;\nSeu filho hoje sou,\nE não mais temo aqui.\nIntrépido, a Ele vou,\nE \"Aba, Pai\" é meu clamor."
    ]
  },
  "252": {
    "id": "252",
    "numero": 252,
    "titulo": "Reconciliados com Deus",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Sem esperança, numa prisão,\nCrer já tentamos, sem convicção;\nMas Deus, em Cristo, quis redimir-nos,\nE nos deu salvação!",
      "Triste destino: morte em Adão,\nTão incuráveis e sem perdão;\nDeus, em Seu Filho, disso remiu-nos —\nOh! Que libertação!",
      "Deus, ao pecado já condenou,\nHoje, na graça, fé nos firmou;\nDeus em nós cresce, té que se expresse —\nQue reconciliação!"
    ],
    "coro": "O Sangue fez-nos propiciação,\nDeus nos comprou por tal redenção;\nNão condenados, justificados;\nTemos paz com Deus!"
  },
  "253": {
    "id": "253",
    "numero": 253,
    "titulo": "Redimidos pelo Sangue",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Eu tenho voz, voz de louvor,\nPorque remido fui,\nA meu Senhor e Redentor,\nPorque remido fui.",
      "Meu Salvador me satisfaz,\nPorque remido fui;\nE, Seu querer cumprir, me apraz,\nPorque remido fui.",
      "Há Testemunha dentro em mim,\nPorque remido fui,\nQue a dúvidas, temor, põe fim,\nPorque remido fui.",
      "Que gozo! Que real prazer,\nPorque remido fui!\nOh! Cristo fez-me justo ser,\nPorque remido fui.",
      "Eu tenho um Deus que é por mim,\nPorque remido fui;\nHabitarei com Ele enfim,\nPorque remido fui."
    ],
    "coro": "Porque remido fui,\nPorque remido fui,\nNo Senhor me gloriarei.\nPorque remido fui,\nEm Seu nome eu me gloriarei."
  },
  "254": {
    "id": "254",
    "numero": 254,
    "titulo": "Redimidos pelo Sangue",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Não fui redimido com prata nem ouro,\nNem toda a riqueza minh'alma salvou,\nO Sangue na Cruz: minha única base,\nA morte de Cristo Jesus me curou.",
      "Não fui redimido com prata nem ouro,\nEm minha consciência a culpa pesou.\nO Sangue na Cruz: minha única base,\nA morte de Cristo Jesus me comprou.",
      "Não fui redimido com prata nem ouro,\nDe aproximar-me, a lei me impediu.\nO Sangue na Cruz: minha única base,\nA morte de Cristo Jesus me atraiu.",
      "Não fui redimido com prata nem ouro,\nEntrada no reino, não compra o que é vil.\nO Sangue na Cruz: minha única base,\nA morte de Cristo Jesus me remiu."
    ],
    "coro": "Deus me remiu, mas não com prata,\nNem com ouro me comprou;\nMas com o sangue de Seu Filho —\nAlto preço de amor."
  },
  "255": {
    "id": "255",
    "numero": 255,
    "titulo": "Redimidos pelo Sangue",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Cantarei meu Cristo amado,\nSeu amor e compaixão;\nNuma cruz foi pendurado,\nPondo fim à maldição.",
      "Oh! que doce, terna história:\nEle, a mim em perdição,\nPor Amor, Misericórdia,\nDeu gratuita salvação!",
      "Louvarei meu Cristo amado,\nSeu triunfo e poder;\nSobre a morte, o pecado\nE o Hades faz vencer!",
      "Cantarei de Seu sublime,\nRico amor dos altos céus;\nPois da morte ressurgiu-me,\nPara filho ser de Deus."
    ],
    "coro": "Cantarei meu Cristo amado,\nQue sangrou e me comprou,\nCom perdão na cruz selado,\nMe remiu e libertou."
  },
  "256": {
    "id": "256",
    "numero": 256,
    "titulo": "Redimidos pelo Sangue",
    "categoria": "Hinário Novo",
    "estrofes": [
      "A Jesus pertenço,\nEle me comprou;\nSeu somente há de ser\nO que tenho e sou.",
      "A Jesus pertenço,\nÉ meu Rei, Senhor,\nSoberano a reger\nMeu interior.",
      "A Jesus pertenço,\nVenha o que vier,\nTenho o Braço eternal\nA me envolver.",
      "A Jesus pertenço,\nGrande salvação!\nSeu precioso sangue fez\nMinha redenção.",
      "A Jesus pertenço,\nPois morreu por mim;\nEle é meu e Dele sou,\nSempre, até o fim.",
      "A Jesus pertenço,\nNele salvo estou,\nQuando morte e trevas vêm\nA meu derredor.",
      "A Jesus pertenço,\nBreve reinarei\nCom o amado Salvador,\nMajestoso Rei!"
    ]
  },
  "257": {
    "id": "257",
    "numero": 257,
    "titulo": "Redimidos pelo Sangue",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Meu Salvador Senhor Jesus\nAgonizou, morreu na cruz;\nSeu sangue ali por mim verteu\nE redenção me concedeu.",
      "Em trevas, pois, o céu ficou,\nJesus clamou e expirou;\nRasgou-se o véu e se nos deu\nCaminho que conduz a Deus.",
      "Quiseste vir, por mim, Jesus,\nTe entregar, sofrer na cruz;\nEm rejeição, angústia e dor,\nMorrendo por um pecador!"
    ],
    "coro": "Oh! Gólgota! Oh! Gólgota!\nAli Jesus, por mim, sangrou;\nNo Gólgota, no Gólgota,\nPor mim, morreu meu Salvador!"
  },
  "258": {
    "id": "258",
    "numero": 258,
    "titulo": "Redimidos pelo Sangue",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Um divino Sangue há;\nComo a todos não falar,\nAos impuros transmitir\nEssa fonte a fluir?",
      "Dá-nos vida divinal,\nNão há outro sangue igual;\nPrecioso, nos verteu\nO Cordeiro que morreu.",
      "Poderoso fala a Deus,\nEste Sangue que verteu;\nAnte o trono alça voz,\nIntercede a Deus por nós.",
      "Consciência, luz nos traz,\nNossas falhas ver nos faz,\nNos causando contrição\nE às manchas, aversão.",
      "Seu precioso sangue faz\nOração mui eficaz\nE, rogando com poder,\nFaz-nos Graça receber.",
      "Obras, atos naturais\nSatisfazem Deus jamais;\nEis atento hoje o Céu\nSó ao Sangue que verteu.",
      "O perdão no Sangue há,\nÉ glorioso o encontrar;\nMais que só propiciação,\nTemos purificação.",
      "Consciência, paz achou\nSó no sangue do Senhor;\nTira ruga e máculas,\nMui ousados, pois, nos faz.",
      "É o sangue do Senhor\nInsondável, de valor;\nCantaremos sem cessar,\nNele vamos confiar!"
    ]
  },
  "259": {
    "id": "259",
    "numero": 259,
    "titulo": "Redimidos pelo Sangue",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Meu Salvador lá na cruz morreu,\nSatisfazendo o justo Deus;\nPor meu pecado Seu sangue deu —\nGlória ao Senhor!\n\nGlória ao Senhor!\nGlória ao Senhor!\nPor meu pecado Seu sangue deu —\nGlória ao Senhor!",
      "Ter, do pecado, a salvação\nTraz-nos o gozo da redenção;\nEis nossa eterna, melhor porção,\nGlória ao Senhor!\n\nGlória ao Senhor!\nGlória ao Senhor!\nPor meu pecado Seu sangue deu —\nGlória ao Senhor!",
      "Cristo morreu e nos redimiu,\nNossos pecados já extinguiu,\nFonte de vida assim se abriu!\nGlória ao Senhor!\n\nGlória ao Senhor!\nGlória ao Senhor!\nFonte de vida assim se abriu!\nGlória ao Senhor!",
      "Vida ganhamos e redenção;\nLimpos no Sangue, a nós virão\nÁguas da vida, que gozo dão;\nGlória ao Senhor!\n\nGlória ao Senhor!\nGlória ao Senhor!\nFonte de vida assim se abriu!\nGlória ao Senhor!"
    ]
  },
  "260": {
    "id": "260",
    "numero": 260,
    "titulo": "Redimidos pelo Sangue",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Teu rosto, ó Jesus, Senhor,\nNós vimos desfrutar;\nTeu sangue dá-nos destemor\nPra além do véu entrar.\nJamais em nós, nos méritos,\nPodemos confiar;\nNo sangue e na justiça Teus\nNos vamos basear.",
      "São justos Teus juízos, sim,\nDevemos aceitar,\nNão mais fugir; porém, a Ti,\nPecados confessar.\nJamais usar de vãs razões\nTentando os ocultar;\nTeu sangue faz as transgressões,\nDe nós, se apagar.",
      "Pecado, Deus não tolerou,\nJulgou na cruz, em Ti;\nA Ti, e não a nós, Senhor,\nFez Sua ira vir.\nCaminho a Deus, rasgando o véu,\nAbriste-nos então;\nAli por nós Tu foste réu\nLogrando-nos perdão.",
      "Por redenção mui eficaz,\nQueremos Te adorar;\nTeu sangue que nos traz a paz\nPodemos aplicar.\nOh! que Mercê proposital,\nInfinda, superior!\nCordeiro, a Ti, Deus eternal,\nA glória e o louvor!"
    ]
  }
};

Object.assign(data.novo, novosHinos);

fs.writeFileSync(hinosPath, JSON.stringify(data, null, 2), 'utf8');
console.log('Successfully added hymns 241 to 260!');
console.log('Total hymns in novo:', Object.keys(data.novo).length);
