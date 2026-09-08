const fs = require('fs');
const path = require('path');

const hinosPath = path.join(__dirname, '../data/hinosData.json');
const rawData = fs.readFileSync(hinosPath, 'utf8');
const data = JSON.parse(rawData);

if (!data.novo) {
  data.novo = {};
}

const novosHinos = {
  "101": {
    "id": "101",
    "numero": 101,
    "titulo": "Sua ressurreição",
    "categoria": "Hinário Novo",
    "estrofes": [
      "À morte e seu poder,\nTu foste só;\nSem corrupção sofrer,\nJusto Senhor!\nMorte venceste e quem\nSeu vil poder detém;\nSó Tu, e mais ninguém,\nÉs vencedor.",
      "Ressuscitaste já,\nMorte jamais\nPôde Te escravizar;\nVivo estás!\nTu és o vencedor\nDa tumba de pavor,\nDa morte, além, Senhor,\nHoje estás.",
      "Todos os Teus troféus\nMui grandes são!\nFrutos Deus recebeu\nDe Tua mão!\nFez Tua morte aqui\nMuitos nascer de Ti\nE em Ti se conduzir,\nPois Teus já são.",
      "Ó Primogênito\nDa criação,\nDo Pai Altíssimo,\nO Coração;\nDe fato és superior,\nSó Tu, merecedor\nDe receber, Senhor,\nToda a afeição!"
    ]
  },
  "102": {
    "id": "102",
    "numero": 102,
    "titulo": "Sua ressurreição",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Foi morto o Salvador\nE sepultado;\nMas com poder, vigor,\nRessuscitou!",
      "Tomaram precaução\nCom Seu sepulcro;\nMas tudo foi em vão\nPara O reter.",
      "A morte não logrou\nMais segurá-Lo;\nCristo os grilhões quebrou\nE ressurgiu."
    ],
    "coro": "Da sepultura saiu,\nCom triunfo e glória ressurgiu;\nRessurgiu, vencendo a morte e seu poder,\nCom os santos para sempre irá reger.\nRessurgiu! Ressurgiu!\nAleluia! Ressurgiu!"
  },
  "103": {
    "id": "103",
    "numero": 103,
    "titulo": "Sua vitória",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Aleluia dai a Cristo!\nCetro e trono já são Seus;\nAleluia, o triunfo\nE vitória recebeu.\nEis que cantam Seus remidos,\nRessoando a canção:\n\"Por Seu sangue redimiu-nos\nDentre todas as nações\".",
      "Aleluia! Não mais órfãos\nNem deixados em pesar;\nAleluia! Crer somente,\nSempre perto Ele está.\nMesmo que não apareça,\nPois ao céu já ascendeu,\nNos lembramos da promessa:\n\"Eis-Me sempre junto aos Meus\".",
      "Aleluia! Pão celeste,\nAlimento, habitação;\nAleluia! Aos famintos,\nSó Tu és satisfação.\nRedentor e Paracleto,\nIntercedes Tu por nós;\nAnte o Grande, Deus completo,\nSoa sempre Tua voz.",
      "Aleluia dai a Cristo!\nCetro e trono já são Seus;\nAleluia, o triunfo\nE vitória recebeu.\nEis que cantam Seus remidos,\nRessoando a canção:\n\"Por Seu sangue redimiu-nos\nDentre todas as nações\"."
    ]
  },
  "104": {
    "id": "104",
    "numero": 104,
    "titulo": "Sua vitória",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Cristo de Deus, a Ti, Senhor,\nSeja a exaltação;\nTomaste o cálix de furor,\nPor nossa salvação.\nTeu braço forte, eficaz,\nO Trono conquistou;\nÀ glória nos conduzirás\nEm Tua graça e amor.",
      "Cristo de Deus, a Ti, Senhor,\nSeja a exaltação;\nTragaste a morte com vigor,\nE seu vil aguilhão.\nA tumba não assusta mais,\nÉs forte em salvar;\nÀ porta do silêncio estás\nVelando sem cessar.",
      "Cristo de Deus, a Ti, Senhor,\nSeja a exaltação;\nPois esmagaste o usurpador\nCom Teu real bordão.\nPrecipitaste tal rebel\nNas trevas abissais,\nE exibiste por troféu\nSeu trono vil, voraz.",
      "Cristo de Deus, a Ti, Senhor,\nSeja a exaltação;\nTeu sangue já nos resgatou\nDe toda corrupção.\nDivino Braço salvador,\nQue à servidão põe fim,\nA Ti e a Teu Deus, louvor\nPor séculos sem fim."
    ]
  },
  "105": {
    "id": "105",
    "numero": 105,
    "titulo": "Sua exaltação",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Clamam vozes aos milhares:\n\"Ao Cordeiro o louvor!\",\nE Seus santos entoando,\nManifestam Seu valor.",
      "\"Ó Cordeiro, sê louvado!\",\nCanta unido todo o céu,\nE exalta toda língua\nO Cordeiro tão fiel.",
      "Tal incenso ao Pai ascende,\nQuão fragrante Seu olor!\nTodo joelho se Lhe dobra,\nDão os céus um só louvor.",
      "O conselho do Pai clama:\n\"Honra igual ao Filho dai\"\nToda glória que há no Filho\nManifesta a Deus Pai.",
      "Reunida ao Cordeiro\nIncontável multidão\nDá ao grande EU SOU eterno\nSeu louvor e saudação.",
      "Mui feliz, em paz repousa\nHoje a nova criação,\nSem tristeza nem cadeias\nNesta Sua salvação.",
      "Eis canção no céu, tão nova,\nRetumbante qual trovão;\n\"Sim, amém, por Tua bênção\",\nCanta assim a criação."
    ]
  },
  "106": {
    "id": "106",
    "numero": 106,
    "titulo": "Sua exaltação",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Foi elevado acima dos céus\nE coroado o Cordeiro de Deus;\nVive e atende a nosso clamor,\nDeus sobre todos a Cristo exaltou.",
      "Se a tormenta agita o mar,\nE bravas ondas nos tentam tragar,\nFirmes, olhamos só para Jesus,\nE Ele nas vagas em paz nos conduz.",
      "Fortes cidades há que combater,\nAltas muralhas nos tentam deter;\nEia, marchemos até as transpor\nPor fé Naquele que Deus exaltou.",
      "De norte a sul Seu reinado está\nE pelos séc'los dos séc'los será,\nOs vencedores com Ele estarão,\nDa realeza participarão."
    ],
    "coro": "Deus O exaltou! Deus O exaltou!\nAo Salvador, Deus exaltou!\nComo Seus membros, eis nosso clamor:\nDeus sobre todos a Cristo exaltou!"
  },
  "107": {
    "id": "107",
    "numero": 107,
    "titulo": "Sua exaltação",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Eis! Ao Cordeiro se Lhe deu\nPoder, exaltação,\nNo universo, terra e céu,\nA suma posição.",
      "O alto trono assumiu,\nGoverna o Senhor;\nÉ a canção dos que remiu\nE de Seu Pai, o amor.",
      "Excelso, aceita o louvor\nDe Sua igreja aqui;\nAté um som inferior\nConsegue Ele ouvir.",
      "Oh! vamos juntos celebrar\nO Nome do Senhor,\nCordeiro que no trono está,\nCordeiro vencedor.",
      "Louvor a Quem aqui sofreu\nDesprezo e desdém;\nA Quem ao céu já ascendeu\nE a coroa tem."
    ]
  },
  "108": {
    "id": "108",
    "numero": 108,
    "titulo": "Sua exaltação",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Eis o Rei em Seu triunfo,\nMajestoso e real,\nIndo sobre brancas nuvens\nA Seu trono celestial;\nCantam anjos com enlevo:\n\"Aleluia! O bendizei!\" —\nAlto, ó portas, sim, erguei-vos,\nRecebei, recebei vosso excelso, grande Rei.",
      "Quem é Esse glorioso\nQue vitória conquistou?\nO Deus forte, poderoso,\nNas batalhas vencedor;\nQuem sofreu na cruz a morte,\nE da tumba ressurgiu,\nMal, pecado e oponentes\nDestruiu, destruiu — Sua morte os destruiu!",
      "Quando Ele mãos erguia,\nBendizendo o povo Seu,\nPouco a pouco, ascendia\nAo mais alto céu dos céus;\nDele aqui Deus agradou-se,\nPois andou com Deus, pregou,\nEle, como nosso Enoque,\nA Seu lar, a Seu lar eternal se trasladou.",
      "Como nosso Arão de cima,\nCom Seu sangue adentra o véu;\nReis qual Josué dizima,\nBoa Terra dá aos Seus;\nDistribui-lhes a herança,\nPrometida possessão;\nComo Elias, Sua graça\nDúplice, dúplice, nos concede por porção.",
      "Nossa humana natureza\nExaltada Cristo faz,\nLá, à destra da Alteza\nNos lugares celestiais.\nEis no Trono, eis em glória,\nDeus e o homem a reger;\nSua ascensão é nossa\nPela fé, pela fé, nossa hoje pela fé."
    ]
  },
  "109": {
    "id": "109",
    "numero": 109,
    "titulo": "Sua exaltação",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Quão bom, Senhor Jesus, saber\nQue a senda deste Teu viver\nDe tanto opróbrio e ais,\nCom Teu labor, já se findou,\nDeus, para sempre, Te exaltou,\nÀ Sua destra estás.",
      "Em vez de espinhos, ó Senhor,\nTens hoje glória e esplendor;\nTeu trono é o de Deus.\nSó Teu, Cordeiro vencedor,\nÉ hoje e sempre o louvor\nEm toda a terra e céus!",
      "Por nós, Cabeça és ali,\nE gozam bênçãos hoje aqui,\nTeus membros pela fé;\nDe Tua glória, reino, amor\nE Teu saber, é possuidor\nQuem em Teu nome crê.",
      "Teu êxito nos faz triunfar,\nTeu gozo, o nosso faz brotar,\nVem do amor de Deus.\nE mesmo a labutar, sofrer,\nNos alegramos só de ver\nQue o trono é sempre Teu!"
    ]
  },
  "110": {
    "id": "110",
    "numero": 110,
    "titulo": "Sua exaltação",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Jesus, amado Salvador,\nDo vil pecado, morte e dor,\nTeu sangue nos remiu.\nOs Teus exultam ao Te ver\nNos céus sentado, com poder,\nEm esplendores mil. (bis)",
      "O Deus de amor Te exaltou,\nÀ Sua destra Te sentou,\nPôs tudo sob Teus pés;\nÓ sempiterno Rei, Senhor,\nA Ti a glória e o louvor,\nTe rendem Teus fiéis. (bis)",
      "Cabeça és do Corpo Teu,\nQue tudo aos membros concedeu,\nE os vem abençoar;\nÉs nossa vida, paz, poder,\nFizeste-nos estar em pé\nE tudo conquistar. (bis)",
      "Glorioso dia chegará\nE Tua noiva subirá,\nVerá o rosto Teu;\nQue gozo iremos possuir:\nContigo estar, Te ver, ouvir\nQue somos sempre Teus! (bis)"
    ]
  },
  "111": {
    "id": "111",
    "numero": 111,
    "titulo": "Sua glória",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Toda glória, glória eterna,\nAo Cordeiro vencedor.\nToda glória, glória eterna,\nA Seu nome de valor;\nNome excelso é na terra,\nNome excelso é no céu.\nToda glória, glória eterna,\nAo precioso nome Seu.",
      "Rei da glória, entronado,\nSendo o próprio Deus no céu,\nVeio para ser escravo,\nCruz, opróbrio, padeceu;\nForte, firme, resoluto\nEm ao Pai obedecer,\nTé a morte por injustos\nPôde Seu amor sofrer.",
      "A coroa fulgurante\nSeja a Quem se humilhou.\nBelo traje, radiante,\nSeja a Cristo e Cristo só.\nToda língua nesta era\nVai um dia confessar\nO Senhor do céu, da terra,\nE Monarca aclamar.",
      "Toda glória, glória eterna,\nAo Precioso, sem igual,\nNa terrena, baixa esfera\nE também na celestial.\nAo Deus nosso, glória seja,\nGlória a Deus, o grande EU SOU;\nToda glória, glória eterna,\nAo Cordeiro vencedor."
    ]
  },
  "112": {
    "id": "112",
    "numero": 112,
    "titulo": "Sua glória",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Meu glorioso Salvador!\nMostra o céu em esplendor\nUm grandioso e belo Ser,\nQue por fé já posso ver.",
      "É mui digno do louvor,\nMais repleto de dulçor,\nEste Homem singular,\nEm Quem Deus vem-se expressar.",
      "Nos demonstra Seu fulgor\nO evangelho: \"Deus é amor\";\nSuas chagas a brilhar,\n\"Deus é luz\" vêm proclamar.",
      "Ouve, ó alma, o Salvador,\nE entoa-Lhe louvor;\nTerna e doce adoração\nRende, pois, com gratidão.",
      "Vem, glorioso Salvador,\nTeu mui belo Ser expor;\nQuero ver-Te, nada mais;\nTua glória me apraz."
    ]
  },
  "113": {
    "id": "113",
    "numero": 113,
    "titulo": "Sua glória",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Contemplamos Tua glória,\nAdorando-Te, Jesus,\nVemos Tua bela história,\nDe opróbrio, dor e cruz.",
      "Toda marca vil, blasfema\nInfligida em Teu Ser,\nTua angústia, pena extrema\nHoje em glória bem se vê.",
      "Só, na cruz, em desamparo,\nSuportaste dor cruel;\nMas ao Trono hoje alçado,\nTeus louvores canta o céu.",
      "Deus, de Ti, lá sobre o monte,\nSua face ocultou;\nGolpeada, Tua fronte\nHoje mostra Seu fulgor.",
      "Santo, Puro, Verdadeiro,\nÉ o precioso nome Teu;\n\"Digno, só Tu és, Cordeiro\",\nCantam juntos terra e céu.",
      "Ao bendito Pai, louvemos\nEntoando-Lhe canção;\nA Deus Pai e ao Filho demos\nHonra, glória, adoração."
    ]
  },
  "114": {
    "id": "114",
    "numero": 114,
    "titulo": "Sua glória",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Saudai o nome de Jesus!\nArcanjos, vos prostrai!\nArcanjos, vos prostrai!\nAo Rei que se humilhou na cruz,",
      "Ó escolhida geração\nDe Deus, o eterno Pai,\nDe Deus, o eterno Pai,\nAo grande Autor da salvação,",
      "Ó perdoados por Jesus,\nAlegres adorai!\nAlegres adorai!\nAo Deus de paz, ao Deus de luz,",
      "Ó raças, povos e nações,\nAo Rei divino honrai,\nAo Rei divino honrai;\nA Quem quebrou os vis grilhões,",
      "Em breve santa multidão\nCurvar-se a Ele vai,\nCurvar-se a Ele vai;\nAlçai com ela a canção:"
    ],
    "coro": "Com glória, glória, glória, glória,\nCom glória coroai!"
  },
  "115": {
    "id": "115",
    "numero": 115,
    "titulo": "Sua glória",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Oh! que vista, contemplai-a!\nCristo, Homem é de dor,\nVitorioso na batalha,\nTem de todos o louvor;\nCoroai-O! Coroai-O!\nCoroai o Vencedor!",
      "Vós, ó anjos, coroai-O!\nSão mui ricos Seus troféus;\nCom poder, sim, entronai-O,\nEntoando com os céus:\nCoroai-O! Coroai-O!\nSalvador e Rei dos reis!",
      "Coroaram-No soldados\nDe escárnio e desdém;\nSantos e anjos, admirados,\nHoje louvam-No, porém;\nCoroai-O! Coroai-O!\nPropagai-O mais além!",
      "Eis clamor mui estrondoso,\nMultidão Lhe dá louvor!\nCristo toma o sumo posto;\nOh! que gozo superior!\nCoroai-O! Coroai-O!\nRei dos reis e o Senhor!"
    ]
  },
  "116": {
    "id": "116",
    "numero": 116,
    "titulo": "Sua glória",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Jesus, coroa vil, cruel,\nUm dia Te cingiu;\nMas a de glória tens no céu,\nE todo o senhorio.",
      "Ó Luz gloriosa celestial,\nDeleite dos fiéis,\nQue Teu profundo amor real\nA conhecer nos dês.",
      "Oh! Sejam nossos, com a cruz,\nOpróbrio e favor;\nSe o mundo não Te quer, Jesus,\nDe Deus Tu tens louvor.",
      "Contigo, hoje, quem sofrer\nContigo reinará;\nTal preço arquemos com prazer,\nE prêmio haverá.",
      "Cruz, morte, opróbrio para Ti,\nPra nós é vida e mais,\nSaúde, força, glória aqui,\nE nossa eterna paz."
    ]
  },
  "117": {
    "id": "117",
    "numero": 117,
    "titulo": "Sua glória",
    "categoria": "Hinário Novo",
    "estrofes": [
      "A Cristo coroai,\nCordeiro vencedor!\nOuvi das hostes celestiais\nO singular louvor!\nDesperta, ó alma, já,\nLouvando, em gratidão,\nA Quem morreu em teu lugar\nE deu-te salvação.",
      "A Cristo coroai!\nDa virgem se encarnou\nE o invisível Deus e Pai\nAos homens revelou.\nRenovo de Jessé\nE a Raiz também,\nQue frutifica a mercê,\nMenino de Belém.",
      "A Cristo coroai!\nOlhai Seu lado e mãos;\nDe Suas chagas contemplai\nGloriosa expressão;\nQue anjo o perscrutou\nOu pode contemplar?\nPerante o místico esplendor\nAbaixa seu olhar.",
      "A Cristo coroai,\nO Príncipe da Paz!\nSeu cetro, autoridade tem,\nCessar as guerras faz.\nSeu reino durará,\nE a Seu redor se vê\nDulçor da glória adornar\nSeus traspassados pés.",
      "A Cristo coroai,\nDas eras, o Senhor,\nDos astros d'amplidão, o Pai,\nSublime Criador!\nAo Redentor saudai,\nAutor da salvação,\nEternamente tributai\nLouvor e adoração."
    ]
  },
  "118": {
    "id": "118",
    "numero": 118,
    "titulo": "Sua glória",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Eis no Trono assentado,\nRessurreto, o Senhor!\nSeu labor foi consumado\nPara todo pecador.\nDeus em glória, Deus em glória\nA Seu Filho exaltou.",
      "Todos hão de confessá-Lo,\nE prostrar-se ao Senhor;\nPelos que vão adorá-Lo,\nTudo Ele suportou;\nE, da glória, e, da glória,\nDeus proclama Seu valor.",
      "Com a cruz foi premiado\nPelos homens, cães cruéis;\nFez o mundo ser julgado,\nAo Deus justo satisfez!\nPela glória, pela glória,\nAclamado foi de vez.",
      "Filho d'Homem trouxe graça\nPela Sua encarnação,\nLíder da eleita raça\nNuma nova criação!\nSim, em glória, sim, em glória,\nTem a suma posição!"
    ]
  },
  "119": {
    "id": "119",
    "numero": 119,
    "titulo": "Seu reino",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Oh! vos regozijai,\nJesus, Senhor, é Rei!\nMortais, O adorai,\nMil graças Lhe rendei.\nO coração e a voz alçai,\nEm Cristo vos regozijai!",
      "Seu reino triunfal\nAbrange terra e céu;\nDo Hades infernal\nAs chaves recebeu;\nO coração e a voz alçai,\nEm Cristo vos regozijai!",
      "Jesus já reina aqui,\nO Deus de luz, de amor;\nApós nos redimir,\nNo Trono se assentou;\nO coração e a voz alçai,\nEm Cristo vos regozijai!",
      "À destra está de Deus\nE aguarda que os rebelis,\nOs inimigos Seus,\nSe prostrem a Seus pés;\nO coração e a voz alçai,\nEm Cristo vos regozijai!"
    ]
  },
  "120": {
    "id": "120",
    "numero": 120,
    "titulo": "Seu reino",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Eis! Celestes vozes soam\nMelodia de louvor,\nE em todo o céu ressoa:\n\"Cristo reina — Deus de amor!\nEm Seu trono Ele está\nSobre o mundo a reinar\"",
      "Oh! cantemos como Ele,\nVindo à terra, a cruz tomou;\nO poder Lhe foi entregue,\nReina em glória o Senhor.\nTema doce como o mel,\nGrande, infindo e fiel.",
      "Tua glória é brilhante,\nÉs da vida o Senhor;\nTeu sorriso, radiante,\nNos atrai e dá vigor.\nAo pensar em Teu amor,\nTe amamos, ó Senhor.",
      "Reinas sempre, Rei da glória!\nA coroa eterna tens;\nNada mais de Ti aparta\nQuem compraste duma vez\nPara Tua graça obter,\nE Teu belo rosto ver.",
      "Oh! apressa Teu retorno!\nFaz tal dia despontar,\nQuando, em mui grande estrondo,\nCéus e terra vão passar;\n\"Glória a nosso Rei!\", então,\nTeus remidos cantarão."
    ],
    "coro": "Aleluia, Aleluia,\nAleluia, Amém."
  }
};

for (const [key, hymn] of Object.entries(novosHinos)) {
  data.novo[key] = hymn;
}

fs.writeFileSync(hinosPath, JSON.stringify(data, null, 2), 'utf8');
console.log('Successfully updated hinosData.json with hymns 101 through 120!');
console.log('Total hymns in novo:', Object.keys(data.novo).length);
