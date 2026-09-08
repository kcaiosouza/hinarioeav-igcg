const fs = require('fs');
const path = require('path');

const hinosPath = path.join(__dirname, '../data/hinosData.json');
const rawData = fs.readFileSync(hinosPath, 'utf8');
const data = JSON.parse(rawData);

if (!data.novo) {
  data.novo = {};
}

const novosHinos = {
  "161": {
    "id": "161",
    "numero": 161,
    "titulo": "Satisfeitos com Ele",
    "categoria": "Hinário Novo",
    "estrofes": [
      "És Tu, Jesus, meu Salvador!\nDom de Deus Pai, de Seu amor;\nTudo o que és e os feitos Teus\nSão o tesouro caro meu.",
      "Eu, infeliz, a desmaiar,\nPosso em Ti me gloriar;\nJá em Teu sangue me lavei,\nDe Deus justiça me tornei.",
      "Tudo o que tens, por mim o tens,\nEm Ti ocultam-se meus bens;\nEm Ti eu vivo; nada sou,\nMas sou de tudo possuidor.",
      "Sob Teu ferido lado em ais,\nÓ Salvador, morar me faz\nE \"graça sobre graça\" obter\nTé face a face eu Te ver."
    ]
  },
  "164": {
    "id": "164",
    "numero": 164,
    "titulo": "Em Sua memória",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Ó Jesus, em Tua mesa,\nPreparada para os Teus,\nQue banquete, que riqueza,\nSob o estandarte Teu;\nQue momentos excelentes,\nSem receio, sem temor;\nDescansando docemente,\nCheios só de Ti, Senhor.",
      "Junto a Ti, nos alegramos,\nTeu Espír'to nos conduz;\nTernamente nos lembrando\nDe Teus feitos, ó Jesus,\nDe Teu corpo aqui partido,\nSofrimentos tão cruéis,\nDe Teu sangue oferecido\nNo Calvário duma vez.",
      "Nestes símbolos sagrados,\nOh! que gozo é Te ver;\nPão e cálix abençoados\nDão-nos força e prazer.\nReunidos, ó Cabeça,\nUm em Ti, na comunhão\nDeste cálice da bênção,\nDo partido, santo pão.",
      "Que Promessa possuímos:\nTu conosco estarás\nSempre que nos reunirmos\nEm Teu nome eficaz;\nMas promessa mais querida\nAos que estão a esperar\nÉ ver logo Tua vinda\nE Contigo sempre estar."
    ]
  },
  "165": {
    "id": "165",
    "numero": 165,
    "titulo": "Em Sua memória",
    "categoria": "Hinário Novo",
    "estrofes": [
      "À Tua mesa, ó Senhor,\nNos vamos reunir,\nTer esta festa de amor\nObedecendo a Ti.",
      "Os que Te amam, ó Jesus,\nQuão bom é acolher,\nPois temos vida e fé comuns,\nE tudo a Te dever.",
      "Infunde em nós Teu gozo e paz,\nAo termos comunhão,\nTeus pensamentos divinais\nEm nosso coração."
    ]
  },
  "166": {
    "id": "166",
    "numero": 166,
    "titulo": "Em Sua memória",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Foi na noite mais solene\nQue Jesus Senhor\nJunto à mesa os Seus somente\nConvocou.",
      "Ordenou-nos Ele isto:\nFesta superior;\nSão no pão e cálix vistos\nSeu amor.",
      "Sua morte anunciamos\nSimplesmente assim,\nTé que venha, nos lembramos\nDele enfim.",
      "Té o brilho da aurora\nTrevas remover\nE o fulgor de Sua glória\nIrromper.",
      "Vem sem morte e sem sombras\nDia singular,\nQuando vamos Sua glória\nPartilhar."
    ]
  },
  "167": {
    "id": "167",
    "numero": 167,
    "titulo": "Em Sua memória",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Ao, em Teu nome, ó Senhor,\nÀ mesa nos reunir,\nA fim de Tua morte expor,\nLouvor transborda a Ti.",
      "De Ti vem nossa oferta aqui,\nPois tudo nosso é Teu —\nQue a alma possa proferir:\n\"O que é Teu é meu!\".",
      "A graça fez-Te a nós descer,\nBrilhou em Ti o amor;\nVenceste a morte a merecer\nCoroa e louvor.",
      "Quer em silêncio, alta voz,\nTe honramos na reunião;\nPerante Deus, daremos nós\nEterna adoração.",
      "Expomos Tua morte aqui\nTé vires, ó Jesus;\nE seu mistério se exibir\nNa mais intensa luz."
    ]
  },
  "168": {
    "id": "168",
    "numero": 168,
    "titulo": "Em Sua memória",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Ó Cristo, vamos nos lembrar de Ti\nQuando fitamos Tua mesa aqui;\nTeu corpo santo simboliza o pão,\nTeu sangue, o cálix, divinal porção.",
      "Graça celeste, Graça singular,\nPor nós, quiseste servo Te tornar;\nDa Glória excelsa ao madeiro hostil,\nDa opulência à pobreza vil!",
      "Tens, ó Cordeiro, nossa adoração,\nA nossos erros deste solução;\nMorto, proveste remissão e paz,\nVivo, ascendeste, trevas não há mais.",
      "Nome supremo Deus Te concedeu,\nHoje Te vemos sobre o trono Seu;\nA Ti, bendito Salvador, Senhor,\nForça, domínio, glória e louvor!"
    ]
  },
  "169": {
    "id": "169",
    "numero": 169,
    "titulo": "Em Sua memória",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Face a face vemos-Te, Senhor,\nCoisas não vistas pode a fé tocar.\nVamos tomar a Graça com vigor,\nNossas fadigas sobre Ti lançar.",
      "Vamos Contigo o pão de Deus comer\nE o celeste vinho desfrutar;\nFardos terrenos todos devolver,\nE novamente Teu perdão provar.",
      "Não há ajuda outra além de Ti,\nNem outro braço em que se apoiar.\nÉs suficiente para nós aqui,\nA nossa força em Teu poder está.",
      "Esta é a hora para festejar:\nEis posta a mesa — celestial porção!\nNesse desfrute a nos alegrar,\nTemos Contigo doce comunhão.",
      "Logo saímos, símbolos se vão;\nVai-se a festa, mas não o amor.\nSim, pão e vinho passam, já não são,\nMas permaneces sempre em nós, Senhor.",
      "Festa após festa vai com rapidez,\nVisa à grande festa celestial;\nQue antegozo temos vez pós vez\nDas bodas do Cordeiro, sem igual!"
    ]
  },
  "170": {
    "id": "170",
    "numero": 170,
    "titulo": "Em Sua memória",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Pelo cálix e o pão,\nPela aliança, por Teu dom,\nPor Teu terno amor, então,\nGraças a Ti, Senhor!",
      "São apenas vinho e pão,\nMas do amor, a expressão;\nDamos, pois, de coração\nGraças a Ti, Senhor!",
      "Por Teu vero, são falar,\nQue à cruz nos faz voltar,\nE por fé mais perto estar,\nGraças a Ti, Senhor!",
      "Por poder Te festejar,\nTé Teu dia despontar,\nTua morte anunciar,\nGraças a Ti, Senhor!",
      "Pelo Espír'to nos falar,\nTeu querer nos revelar:\n\"Tal fazei té Eu voltar\",\nGraças a Ti, Senhor!",
      "Té Teu reino aparecer,\nVamos deste pão comer\nE de Ti mui fartos ser.\nGraças a Ti, Senhor!",
      "Té o dia em que virás,\nDeste cálix nos darás —\nTua mesa nos refaz!\nGraças a Ti, Senhor!",
      "Por tal vinda do Senhor,\nPor tal dia de fulgor,\nPelo Trono e esplendor,\nGraças a Ti, Senhor!"
    ]
  },
  "171": {
    "id": "171",
    "numero": 171,
    "titulo": "Em Sua memória",
    "categoria": "Hinário Novo",
    "estrofes": [
      "À festa de amor,\nCom este vinho e pão,\nA graça é que nos traz, Senhor,\nOh! que recordação!",
      "E cada um que vem\nAguarda ouvir de Ti\nSegredos que do Pai provêm,\nE a Graça discernir.",
      "Na consciência há paz,\nE à fé apraz provar\nO vivo Pão que satisfaz,\nTeu grande amor sem par.",
      "Em símbolo se vê\nTeu sangue que verteu —\nReal penhor a nos dizer\nQue amados somos Teus!",
      "Se Teu amor aqui\nÉ doce, divinal,\nMelhor será ver Teu sorrir\nNo reino celestial!",
      "Enfim iguais a Ti,\nTé vamos contemplar,\nPor séculos sem fim por vir,\nA Graça declarar."
    ]
  },
  "172": {
    "id": "172",
    "numero": 172,
    "titulo": "Em Sua memória",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Reunidos, ansiamos\nTua graça e luz;\nTua face anelamos,\nÓ Jesus.",
      "Com amor Tu nos trouxeste\nDa dissolução;\nPor Teu sangue nos proveste\nSalvação.",
      "Tu a nós, ó Exaltado,\nTe uniste, pois;\nNos livrando do pecado\nE seus nós.",
      "De Ti vamos recordar-nos\nAo partir o pão —\nTipo de Teu Corpo dado\nPor perdão.",
      "\"Cálice da bênção\" temos,\nCheio de Amor;\nRedenção no Sangue obtemos,\nSem temor.",
      "Teu Calvário contemplamos\nAo lembrar de Ti;\nTua vinda aguardamos\nLogo vir."
    ]
  },
  "173": {
    "id": "173",
    "numero": 173,
    "titulo": "Em Sua memória",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Só em Teu nome, ó Jesus,\nPor Teu pedido aqui,\nCom Teu poder e Tua luz,\nNos vamos reunir.",
      "Tal festa nos pediste já,\nNa noite da traição;\nA Tua morte anunciar\nCom cálice e pão.",
      "Teu corpo vê-se nesse pão,\nNa taça, o sangue Teu;\nPor eles fez-se a remissão\nE plena paz com Deus.",
      "És, ó Senhor, o Anfitrião,\nNos convidaste a vir\nCom gratidão no coração\nNos recordar de Ti!",
      "Nós Te amamos mesmo sem\nTer visto a Ti, Jesus;\nNão almejamos ver ninguém,\nSó Tu que foste à cruz!"
    ]
  },
  "174": {
    "id": "174",
    "numero": 174,
    "titulo": "Em Sua memória",
    "categoria": "Hinário Novo",
    "estrofes": [
      "O Amado entre nós está,\nE Suas mãos nos faz olhar,\nSeu lado, Seus feridos pés,\nDe Sua cruz, sinais cruéis.",
      "Eis provisão superior\nNa santa mesa do Senhor!\nDa vide, o fruto, e o pão,\nQuão farta e doce comunhão!",
      "Se turvos olhos naturais\nNão podem vê-Lo, só sinais,\nO Amor nos dê revelação,\nDe Sua face, a visão!",
      "Glorioso Noivo que nos praz,\nCom Teu sorriso, Graça dás!\nLevanta o véu, se véu houver,\nE faz-nos Tua glória ver!"
    ]
  },
  "175": {
    "id": "175",
    "numero": 175,
    "titulo": "Em Sua memória",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Remidos pelo Salvador\nE restaurados no Senhor,\nQueremos Sua morte expor,\nTé Ele vir.",
      "Seu corpo, visto neste pão,\nPartido foi por nós então,\nPra nosso amor é provisão\nTé Ele vir.",
      "Aflitas gotas de suor,\nSeu sangue que por nós jorrou;\nMistério o vinho vai expor\nTé Ele vir.",
      "Aquela noite infiel\nUnimos ao retorno Seu;\nCom esta festa que nos deu,\nTé Ele vir.",
      "Té Cristo a ordem proferir,\nFinal trombeta retinir,\nSeus santos Ele ressurgir,\nRetornará.",
      "Que esperança, que prazer!\nDesamparados nunca ser,\nMas firmes em paciência e fé\nTé Ele vir."
    ]
  },
  "176": {
    "id": "176",
    "numero": 176,
    "titulo": "Em Sua memória",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Senhor, Tua ceia, reunidos, comemos,\nMostrando a unidade que temos em Ti;\nComendo e bebendo a bênção obtemos,\nPresente e real, Te provamos aqui.",
      "Do pão nós comemos, Teu corpo partido,\nAssim desfrutamos Teu Corpo que é um;\nUm pão sobre a mesa — que gozo, riqueza\nPoder testificar: O Senhor fez-nos um!",
      "Do cálix da bênção agora bebemos,\nDo sangue de Cristo real comunhão;\nRemidos, pois cremos; assim recebemos\nQuem se chegou a Deus por ganhar redenção.",
      "Que mais nós diremos senão: \"Aleluia\",\nPor tal realidade que hoje nos dás?\nTeu sangue aplicamos, Teu Corpo gozamos,\nE Tua igreja então gloriosa terás."
    ]
  },
  "177": {
    "id": "177",
    "numero": 177,
    "titulo": "Em Sua memória",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Senhor, aqui Teu Corpo reunido,\nIrmãos, irmãs, mas todos somos um;\nEm membros Teus tornou-nos Tua vida,\nE nela assim agora somos um.",
      "Um pão aqui Teu corpo prefigura,\nPartido a fim de ser-nos a porção.\nExpomos, pois, a unidade pura\nComendo o pão com todos os irmãos.",
      "Na mesa há um pão, um cálix santos\nA demonstrar que em Ti nós somos um;\nPor redenção, Teu Corpo hoje somos,\nQue mais dizer, senão que: \"Somos um!\".",
      "Sim, somos um; ninguém vai dividir-nos,\nÉ do Senhor a unidade aqui;\nComendo o pão, do cálix compartindo,\nTal união iremos exibir.",
      "Oh! ao provar da unidade o gozo,\nSentimos que contente estás, Senhor;\nPodemos ter um doce antegozo\nDo Noivo com a Noiva em amor!"
    ],
    "coro": "Um Corpo só no universo há;\nNa terra, em nós, tem expressão.\nCidade após cidade atestará:\nO Corpo é um — oh! que visão!"
  },
  "178": {
    "id": "178",
    "numero": 178,
    "titulo": "Em Sua memória",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Que cálix de amor!\nPorção do Salvador;\nSeu sangue eficaz\nFez redenção, dá paz.\nNa cruz Jesus nos redimiu\nE comunhão nos conferiu;\nEntremos, pois o véu se abriu!",
      "Do cálice tomai,\nTal morte anunciai\nTé Cristo vir enfim,\nComei, bebei aqui.\nÀ mesa sã, comei do pão,\nE o cálice bebei — porção\nDe bênçãos — oh! que provisão!",
      "Que sangue de animal\nRemoveria o mal?\nAs transgressões, assim,\nJamais teriam fim.\nUm Homem-Deus se acha aqui,\nCordeiro sem pecado em Si,\nA fim de vir nos redimir.",
      "Seu sangue nos proveu\nAcesso livre a Deus!\nPoder tem de limpar,\nE pode nos lavar.\nNo Sacrifício eficaz\nQue, à consciência, deu-nos paz\nE nos remiu, Deus se apraz.",
      "Rei! Cristo! Salvador!\nCantamos o valor\nDo Sangue em que se vê\nA divinal mercê.\nÉ o cálice porção de Deus,\nAliança que nos concedeu,\nQuão rico é o sangue Teu!"
    ]
  },
  "179": {
    "id": "179",
    "numero": 179,
    "titulo": "Em Sua memória",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Senhor Jesus, à Tua mesa, vendo\nTeus símbolos sagrados, vinho e pão,\nMostrando que Tu és o alimento\nQue a todos dá real satisfação,",
      "Ao Cristo vir com divinais riquezas\nA dispensar a vida eternal,\nO homem quis ensinos — que tristeza! —\nSem aplicar Seu rico Ser vital;\nMas Te comer é nossa precisão;\nExcelso és Tu! Glorioso és Tu!\nAssim nos dás vigor ao coração\nTé nos fazer ser como Tu.",
      "Senhor Jesus, ao homem não vieste\nPara o reger de forma exterior,\nMas como pão, Pão vivo, aqui desceste,\nQue o conduz na vida interior.",
      "Grandioso és! Por isso Te louvamos,\nPor Teu fulgor, grandeza e poder;\nMas graças mui especiais Te damos,\nPois o que és podemos, sim, comer."
    ],
    "coro": "Louvor, então, Te rende nosso ser:\nPequeno és Tu! Pequeno és Tu!\nPra sempre, nós Te havemos de comer;\nPequeno és Tu! Pequeno és Tu."
  },
  "180": {
    "id": "180",
    "numero": 180,
    "titulo": "Em Sua memória",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Quão gloriosa Tua mesa é!\nConvidados Teus nós somos,\nEm Teu lar, Senhor, ceamos;\nQuão gloriosa Tua mesa é!",
      "Desfrutável Tua mesa é!\nNela comunhão gozamos,\nAleluia! a encontramos;\nDesfrutável Tua mesa é!",
      "Pão e cálix preciosos são!\nTua morte contemplamos;\nNosso ego renunciamos,\nPartilhando Tua mesa então.",
      "Que sentido esta mesa tem!\nNeste pão o Corpo é visto —\nExpressão do amor de Cristo;\nQue sentido esta mesa tem!",
      "Refrescante Tua mesa é!\nSatisfaz-nos plenamente;\nE nos supre diariamente;\nRefrescante Tua mesa é!",
      "Que alento esta mesa traz!\nFaz lembrar-nos Tua vinda,\nEsperança que não finda;\nQue alento esta mesa traz!"
    ],
    "coro": "Aleluia! Aleluia!\nQue banquete celestial!\nAleluia! Aleluia!\nQuão gloriosa mesa divinal!"
  }
};

for (const [key, hymn] of Object.entries(novosHinos)) {
  data.novo[key] = hymn;
}

fs.writeFileSync(hinosPath, JSON.stringify(data, null, 2), 'utf8');
console.log('Successfully updated hinosData.json with hymns 161 through 180 (sans 162/163)!');
console.log('Total hymns in novo:', Object.keys(data.novo).length);
