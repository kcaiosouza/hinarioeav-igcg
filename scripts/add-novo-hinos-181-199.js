const fs = require('fs');
const path = require('path');

const hinosPath = path.join(__dirname, '../data/hinosData.json');
const rawData = fs.readFileSync(hinosPath, 'utf8');
const data = JSON.parse(rawData);

if (!data.novo) {
  data.novo = {};
}

const novosHinos = {
  "181": {
    "id": "181",
    "numero": 181,
    "titulo": "Em Sua memória",
    "categoria": "Hinário Novo",
    "estrofes": [
      "A maldição Jesus levou,\nAmargo fel por mim tomou;\nOh! grande amor! Quem sondará?\nMeu coração deve entoar:"
    ]
  },
  "182": {
    "id": "182",
    "numero": 182,
    "titulo": "Em Sua memória",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Acima de todo principado,\nPoder e domínio, Ele está,\nAcima de todo nome que existe\nE dos que um dia haverá.\nPois Deus sujeitou-Lhe as coisas todas,\nO deu à Igreja, a qual é Seu Corpo\nE aqui Ele está.\nÉ Cristo a Cabeça do Corpo, (bis)\nA imagem do Deus invisível,\nÉ também Primogênito\nDos mortos e criação.",
      "Aqui reunidos, desfrutamos\nO pão e o cálix a lembrar\nA morte que trouxe vida abundante,\nE eis a igreja a cantar:\nQue Cristo é o Senhor,\nQue Cristo, o Senhor, voltará!"
    ]
  },
  "183": {
    "id": "183",
    "numero": 183,
    "titulo": "Sua vitória e exaltação",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Louvor entoaremos,\nGlorificando a Deus;\nEnquanto nós cantamos,\nEscutam anjos Seus.\nO mundo irá ouvir-nos\nDar glórias ao Senhor,\nAs hostes do inimigo\nJá fogem de pavor.",
      "Calados não vencemos,\nE o inimigo ri;\nAbramos nossa boca\nA fim de o perseguir!\nCom gritos de vitória\nAlçando voz aos céus —\nNão nos envergonhemos\nDe loucos ser por Deus.",
      "O mundo nunca ajuda\nAo Salvador louvar,\nTampouco a dar-Lhe glória\nOu gratidão mostrar.\nSerá que precisamos\nPedir-lhe permissão?\nLiberem o espír'to,\nDeus graça dá então.",
      "Irmãos, não fiquem quietos!\nIrmãs, proclamem mais!\nDivulguem o triunfo,\nAs bênçãos divinais;\nNão importando o preço,\nÉ hora de louvar,\nNa Salvação exultem,\nE na Mercê sem par."
    ]
  },
  "184": {
    "id": "184",
    "numero": 184,
    "titulo": "Sua vitória e exaltação",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Eis a igreja proclamando:\nCristo é o Senhor!\nE os santos invocando:\nCristo, Senhor!\nSeu labor foi consumado,\nO inimigo, derrotado,\nE eis no Trono assentado,\nCristo, o Senhor!",
      "É Jesus o vivo Espír'to,\nÉ o Senhor!\nTodos devem hoje ouvi-Lo,\nPois é o Senhor!\nOh! Por que tu te lamentas?\nO invoca, e Ele entra,\nE, glorioso, te orienta,\nCristo, o Senhor!",
      "Mudará a tua vida,\nCristo, o Senhor,\nCom riquezas sem medida;\nCristo é o Senhor!\nHá de ser teu gozo infindo,\nDia a dia te suprindo,\nAo Deus vivo te unindo,\nCristo, o Senhor!",
      "Com Mercê, pois, recebeu-nos,\nCristo, o Senhor!\nE jamais vai esquecer-nos,\nCristo, o Senhor!\nToda a Sua plenitude,\nEm Seu Corpo vemos hoje,\nLogo o inimigo foge —\nCristo é o Senhor!"
    ]
  },
  "185": {
    "id": "185",
    "numero": 185,
    "titulo": "Sua vitória e exaltação",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Teu nome traz admiração\nÀ terra, ó Senhor!\nQue toda língua e nação\nProclamem Seu valor!\nDos pequeninos eis que já\nGanhaste o louvor,\nTeu inimigo a calar,\nDar fim ao tentador.",
      "Ao contemplar os altos céus\nQue Tua mão formou,\nOs astros que lá suspendeu\nO Teu saber, Senhor;\nQue é o homem para que\nLhe dês recordação?\nQue é seu filho, para que\nLhe mostres atenção?",
      "Senhor Jesus, tal homem és\nAlguém que se encarnou;\nA raça humana duma vez\nSe uniu, se humilhou.\nE, em glória, coroado Rei,\nO Soberano és,\nMediante o Corpo a reger,\nTens tudo sob Teus pés.",
      "Teu encarnar-Se, Teu morrer,\nRessuscitar, subir,\nTeu senhorio, e Corpo até,\nPodemos ver aqui.\nPor tal divino laborar,\nMui digno és, Senhor;\nCom corações a transbordar,\nAlçamos-Te louvor.",
      "Mui breve, com aclamação,\nTal Dia chegará,\nMas nas igrejas de antemão\nSeu antegozo há.\nTeu nome traz admiração\nÀ terra, ó Senhor!\nQue toda língua e nação\nProclamem seu valor!"
    ]
  },
  "186": {
    "id": "186",
    "numero": 186,
    "titulo": "Sua vitória e exaltação",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Eis que o reino deste mundo do Senhor já se tornou!\nOh! que gozo traz aos santos este reino superior!\nA uma voz, mui jubilosos, proclamemos Seu louvor —\nÉ Cristo o vencedor!",
      "A serpente vil, antiga, o dragão, sim, Satanás,\nFoi expulso com seus anjos, já ficaram para trás;\nDemos glória ao Senhor com grandes vozes mais e mais:\nÉ Cristo o vencedor!",
      "Veio o reino, o poder e a salvação de nosso Deus,\nPois foi nosso inimigo já expulso lá dos céus;\nSua autoridade Cristo à igreja concedeu —\nÉ Cristo o vencedor!",
      "Já vencemos, pelo sangue do Cordeiro, o acusador,\nE por nosso testemunho dar sem medo ou temor,\nE por nossa própria vida não amar nem dar valor —\nÉ Cristo o vencedor!",
      "Mas ouvi, ó santos, outra forte voz que vem dos céus:\n\"Já caiu a Babilônia!\" — Aleluia! Glória a Deus!\nE por dela retirar-nos, quanta bênção se nos deu —\nÉ Cristo o vencedor!",
      "Ela é mãe de meretrizes e de abominação,\nOdiamos o furor de sua prostituição;\nDeus em dobro castigou-a — jubilemo-nos, irmãos.\nÉ Cristo o vencedor!",
      "Aleluia! Toda a glória e o poder a nosso Deus!\nPois são justos, verdadeiros os juízos todos Seus!\nA fumaça dela sobe pelos séculos aos céus —\nÉ Cristo o vencedor!",
      "Eis a voz qual a de uma numerosa multidão,\nComo voz de muitas águas, como voz de um trovão:\n\"Aleluia! Reina o Todo-Poderoso Deus, então!\"\nÉ Cristo o vencedor!",
      "Alegrai-vos, dai-Lhe glória, todos vós, ó servos Seus,\nPois chegadas são as bodas do Cordeiro, vosso Deus,\nCuja esposa ataviou-se e de linho se envolveu —\nÉ Cristo o vencedor!",
      "No ardente lago em fogo foi lançado Satanás;\nNós não vamos mais ser alvo das astúcias infernais!\nE em glória, triunfantes, cantaremos sempre mais:\nÉ Cristo o vencedor!",
      "Eis a grande maravilha: celestial Jerusalém!\nOh! do céu, qual adornada Noiva para Cristo, vem!\nMoradia mútua, eterna: Deus e o homem, mais ninguém!\nÉ Cristo o vencedor!",
      "Eis de Deus o tabernác'lo — com os homens morará;\nTudo é novo: luto, pranto, morte e dor não haverá.\nDeus, no trono assentado, diz-nos: \"Tudo feito está.\"\nÉ Cristo o vencedor!"
    ],
    "coro": "Que vitória, aleluia!\nQue vitória, aleluia!\nQue vitória, aleluia!\nÉ Cristo o vencedor!"
  },
  "187": {
    "id": "187",
    "numero": 187,
    "titulo": "Como nossa oferta pacífica",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Pacífica Oferta,\nImpomos-Te as mãos;\nNa experiência e fato,\nContigo há união.\nA Deus Te ofertamos\nNa reunião, Senhor;\nE aqui Te desfrutamos\nCom nosso Pai de amor!",
      "O sangue aspergido,\nAo vê-lo, temos paz;\nO sangue desta oferta\nCom Deus nos trouxe paz.\nOusados proclamamos —\nQue ouça o acusador:\n\"Que paz nos dá o Sangue,\nO Sangue remissor!\".",
      "Com base no holocausto,\nNa oferta de manjar,\nOferecemos Cristo\nQual oblação de paz.\nComê-Lo e bebê-Lo\nNos fazem desfrutar\nDe Sua humanidade,\nE juntos festejar.",
      "Porção oculta e doce\nDesfruta Deus aqui,\nE vão os sacerdotes\nDo peito se servir;\nAquele que oferta\nTem parte no melhor,\nPois come um bolo asmo\nE a coxa que se alçou.",
      "É doce este peito,\nO envolvente amor\nDo Cristo ressurreto,\nQue a tudo faz transpor!\nQue força dá a coxa\nDaquele que se alçou!\nA obreia nutre e faz-nos\nAndar tal qual andou.",
      "Com todos festejando,\nQuão rica tal Porção!\nQue comunhão real há\nEm nossa reunião!\nTrazendo ações de graça\nE um voto, pois, fazer:\nPor Cristo e a igreja\nPra sempre vamos ser."
    ],
    "coro": "És nossa paz! És nossa paz!\nA Ti, adoração!\nCom Deus e o homem temos paz,\nQue reconciliação!"
  },
  "188": {
    "id": "188",
    "numero": 188,
    "titulo": "De todas as criaturas de nosso Deus e Rei",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Ó criaturas do Senhor,\nA Deus louvai, Rei, Criador,\nAleluia! Aleluia!\nÓ Sol dourado a refulgir,\nÓ Lua em prata a reluzir,",
      "Ó vento forte a soprar,\nErrantes nuvens a singrar,\nOh! Louvai-O! Aleluia!\nÓ Lua alegre a romper,\nÓ luzes do anoitecer,",
      "Ó cristalinos ribeirões,\nComponde ao Senhor canções,\nOh! louvai-O! Aleluia!\nArdente fogo que reluz,\nQue nos aquece e traz luz,",
      "Ó terra, madre milenar,\nDe ricas bênçãos a fartar,\nOh! Louvai-O! Aleluia!\nTambém as flores, frutos teus\nExpressem o primor de Deus,",
      "Ó homens que, de coração,\nA outros concedeis perdão,\nOh! Louvai-O! Aleluia!\nVós, que tristeza suportais,\nLançai em Deus os vossos ais!",
      "Vós, todas coisas que Ele fez,\nEm humildade e singelez,\nOh! Louvai-O! Aleluia!\nGlória ao Pai e ao Filho dai,\nE ao Espírito louvai!"
    ],
    "coro": "Oh! Louvai-O! Oh! Louvai-O!\nAleluia! Aleluia! Aleluia!"
  },
  "189": {
    "id": "189",
    "numero": 189,
    "titulo": "Glória ao Cordeiro de Deus",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Glória pra sempre ao Cordeiro de Deus,\nA Jesus, o Senhor, ao Leão de Judá,\nÀ Raiz de Davi, que venceu\nE o livro abriu.",
      "O céu, a terra e o mar,\nE tudo o que neles há,\nO adorarão e confessarão:\nQue Jesus Cristo é o Senhor.",
      "Cristo é o Senhor, Ele é o Senhor.\nRessurreto dentre os mortos, Ele é o Senhor,\nTodo joelho se dobrará,\nToda língua confessará\nQue Jesus Cristo é o Senhor."
    ]
  },
  "190": {
    "id": "190",
    "numero": 190,
    "titulo": "Infinita gratidão",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Ao meu Senhor eu vou cantar, pois recebi\nMisericórdia, amor e graça em Cristo Jesus.\nOh! que amor! mesmo não merecendo, entregou-se a mim.\nAbro o meu coração\nPara render-Te louvor;\nHá uma infinita gratidão\nPor tudo o que tens feito a mim!",
      "Em meu lugar cumpriu Jesus toda a lei.\nObedeceu — por Seu sofrer me justificou.\nSatisfez o coração de Deus. Eis a redenção!\nAbro o meu coração\nPara render-Te louvor;\nHá uma infinita gratidão\nPor tudo que tens mostrado a mim!",
      "As boas novas o Senhor me revelou.\nOh! quanta graça — Seu amor jorrou dentro em mim!\nSeu olhar tão cheio de ternura, a Deus me levou.\nAbro o meu coração\nPara render-Te louvor;\nHá uma infinita gratidão\nPor tudo o que tens feito a mim!",
      "Caminho vivo abriu Jesus — rasgou-se o véu.\nRessuscitou — cumpriu-se a obra! Vive o Senhor!\nOh! que paz! no Santo dos Santos posso penetrar!\nAbro o meu coração\nPara render-Te louvor;\nTeu nome rico invocarei,\nÓ Jesus! precioso és para mim!"
    ]
  },
  "191": {
    "id": "191",
    "numero": 191,
    "titulo": "O EU SOU que se tornou o Espírito",
    "categoria": "Hinário Novo",
    "estrofes": [
      "No princípio era o Verbo,\nE o Verbo era Deus,\nPor quem fez-se o Universo\nPra cumprir o plano Seu.\nE estava Nele a vida,\nQue dos homens era a luz;\nO EU SOU tão suficiente,\nDisponível é Jesus!",
      "E o Verbo fez-se carne,\nDeus ao homem se mesclou;\nO Deus antes nunca visto,\nCristo, o Filho, O revelou.\nEis o divinal Cordeiro,\nQue o pecado já tirou;\nSua obra resgatou-me,\nVou segui-Lo aonde for!",
      "Uma vez glorificado,\nComo o Espír'to veio a mim;\nSou por Ele transformado,\nSua casa surge assim.\nGrandioso é ver a escada\nQue a terra une ao céu;\nÉ Jesus, o meu caminho,\nÉ o templo, é Betel."
    ],
    "coro": "O EU SOU, o Deus eterno,\nMinha rica provisão,\nMeu desfrute todo o tempo,\nQue satisfação!"
  },
  "192": {
    "id": "192",
    "numero": 192,
    "titulo": "Diversos",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Quem na manjedoura está,\nE a Seus pés vão se prostrar?",
      "Quem é que em aflição\nFaz jejum em solidão?",
      "Quem louvor receberá\nPelo Seu gentil falar?",
      "Quem é que o sofredor\nBusca em tristeza e dor?",
      "Quem, ao Lázaro dormir,\nChora por se compungir?",
      "Quem recebe a saudação\nMui feliz da multidão?",
      "Quem, à meia-noite ali,\nOra no Getsêmani?",
      "Quem, na cruz de amargor,\nMorre em angústia e dor?",
      "Quem provém da tumba e traz\nSalvação, socorro e paz?",
      "Quem, com Deus no trono Seu,\nÉ Senhor da terra e céus?"
    ],
    "coro": "É o Senhor, que bela história!\nÉ o Senhor, o Rei da glória!\nA Seus pés, em sujeição,\nDemos-Lhe adoração!"
  },
  "193": {
    "id": "193",
    "numero": 193,
    "titulo": "Diversos",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Louvem, louvem nosso Jesus, nosso Cristo!\nCantem, cantem Seu grandioso amor!\nA Seu nome, honra, louvor e domínio!\nToda glória a nosso Salvador!\nA Seu povo, como Pastor, sustenta,\nEm Seus braços sempre o carregará;\nOs que vivem em Sua amada presença,\nLouvem, louvem Seu nome sem cessar!",
      "Louvem, louvem nosso Jesus, nosso Cristo!\nCom Seu sangue Ele nos redimiu;\nGlória à Rocha, nosso seguro Destino,\nFoi à cruz e lá nos substituiu!\nManso, humilde, teve desprezo, escárnio,\nFel, espinhos, dores por nós provou;\nFoi traído, todos O abandonaram,\nMas Deus Pai a Príncipe O exaltou.",
      "Louvem, louvem nosso Jesus, nosso Cristo,\nAlto, alto, ó portas eternais!\nGlória a quem é Rei, Sacerdote divino\nE Profeta, que reina sempre em paz.\nOh! Exultem! Ele venceu a morte!\nOnde, ó morte, tua vitória está?\nCristo vive! É o Senhor e Rei forte,\nPoderoso para nos resgatar."
    ]
  },
  "194": {
    "id": "194",
    "numero": 194,
    "titulo": "Diversos",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Ó Cordeiro, Te adora\nNossa alma, a vislumbrar\nO amor do Pai e a glória\nEm Teu rosto a se expressar;\nTeu saber e força excelsos\nManifesta a criação;\n\"És o grande EU SOU eterno\",\nEis a sua confissão.",
      "Ó Cordeiro, Tua casa\nEra o seio de Teu Pai;\nSendo um em força e graça,\nSeu prazer, em quem se apraz;\nMas a glória, em Seu seio,\nTu deixaste — que mercê!\nPara, como Seu Cordeiro,\nPor amar-nos, vir morrer.",
      "Ó Cordeiro, ao fitar-Te\nEm humilde condição,\nPeregrino em toda parte\nDesta Tua criação;\nNo jardim, quem compreende\nTua angústia, Teu pavor?\nTua graça nos surpreende,\nÓ Cordeiro redentor!",
      "E ao ver-Te pendurado,\nComo réu, na rude cruz,\nNossas culpas e pecados\nRecaindo em Ti, Jesus,\nComovidos, Te adoramos,\nDeste o sangue por amor;\nGlória eterna Te prestamos,\nÓ Cordeiro redentor!",
      "Ó Cordeiro, breve em glória,\nVais à terra retornar;\nInimigos nessa hora\nVão tremer, se lamentar;\nE em Teu reino, reunidos,\nVamos Tu e nós reger;\nTeu, Cordeiro, é o domínio,\nHonra, glória e poder!"
    ]
  },
  "195": {
    "id": "195",
    "numero": 195,
    "titulo": "Diversos",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Que maravilha! Cristo aqui se deu\nPor mim — rebelde, pecador e réu!\nCruz e vergonha, dor por mim sofreu;\nMinh'alma, exulta, louva o nome Seu!",
      "Ele Seu trono já por mim deixou,\nO grande amor do Pai por mim mostrou,\nPor mim na terra tabernaculou,\nPor mim bebeu o cálix de amargor.",
      "Ele, por mim, só teve traição,\nÓdios, açoites e condenação,\nTanta injúria, cruz de maldição,\nPor mim — indigno, vil em perdição.",
      "Morto por mim, já, tudo concluiu,\nA justa lei de Deus por mim cumpriu,\nSangue verteu por mim, me redimiu,\nPor mim triunfante Ele ressurgiu."
    ]
  },
  "196": {
    "id": "196",
    "numero": 196,
    "titulo": "Diversos",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Rompendo a manhã,\nDesperta o coração:\nA Cristo, dá louvor!\nA trabalhar, a orar,\nVou Nele sempre estar,\nA Cristo, dar louvor!",
      "Com terno amor aqui\nDesejo proferir,\nA Cristo, o louvor!\nMais belas graças vêm\nAo coração de quem,\nA Cristo, dá louvor!",
      "Tristezas sobrevêm?\nConsolo há, porém,\nSe, a Cristo, dou louvor!\nMeu gozo se desfaz?\nÉ meu conforto e paz,\nA Cristo, dar louvor!",
      "Dos pensamentos vis\nSou salvo, pois feliz,\nA Cristo, dou louvor!\nAs trevas temerão,\nOuvindo tal canção:\nA Cristo, dou louvor!",
      "Se o sono me faltar,\nBreve vou quieto suspirar:\nA Cristo, dou louvor!\nEsvai-se a escuridão\nSe diz meu coração:\nA Cristo, dou louvor!",
      "Enquanto eu respirar,\nMeu cântico será:\nA Cristo, dou louvor!\nQue seja eternal,\nPor eras sem final,\nA Cristo, o louvor!"
    ]
  },
  "197": {
    "id": "197",
    "numero": 197,
    "titulo": "Diversos",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Mil graças dai a Cristo\nPor nossa salvação,\nSeu sangue precioso\nRemiu a criação;\nQue todos digam isto\nCantando-Lhe louvor:\n\"Mil graças dou a Cristo,\nMeu Rei e Salvador\".",
      "Quem dera, para Cristo,\nMil corações render,\nMil vidas, se possível,\nA Ele oferecer;\nMil línguas que declamem\nMil hinos de louvor,\nEntoem e aclamem\nO Amigo, o Redentor!",
      "Mil graças dai a Cristo\nPor bênçãos nos dispor;\nMil graças dai mil vezes\nPor Seu mui forte amor;\nE em Sua volta em glória,\nO vamos contemplar,\nPor séculos afora,\nSeu doce amor cantar."
    ],
    "coro": "Mil graças dai, mil graças dai,\nLouvores eternais!\nE, por viver com Ele, dai\nMil graças inda mais!"
  },
  "198": {
    "id": "198",
    "numero": 198,
    "titulo": "Diversos",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Graças e honra e glória a Ti,\nE glória a Ti,\nE glória a Ti.\nGraças e honra e glória a Ti,\nAgora e sempre. Amém!\nGlória! Glória,\nDai, ó santos, ao Senhor,\nGlória! Glória,\nAgora e sempre. Amém!\nAleluia!",
      "Graças e honra e glória a Ti,\nE glória a Ti,\nE glória a Ti.\nGraças e honra e glória a Ti,\nAgora e sempre. Amém!"
    ]
  },
  "199": {
    "id": "199",
    "numero": 199,
    "titulo": "Diversos",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Novo louvor ao Cordeiro há:\nGlória ao Senhor! Glória ao Senhor!\nA boa nova, que gozo dá —\nGlória ao Altíssimo!\nTrono deixando lá no céu,\nCristo Jesus aqui nasceu;\nGraça sem par nos concedeu —\nQue maravilhoso é!",
      "Eis vêm do céu vozes de louvor:\nGlória ao Senhor! Glória ao Senhor!\nCristo é luz, vida e amor —\nGlória ao Altíssimo!\nDe todo triste, sofredor,\nDe todo aflito pecador,\nDe todos, seja lá quem for,\nJesus é o Redentor.",
      "Ora não há julgamento algum;\nGlória ao Senhor! Glória ao Senhor!\nNós e o Senhor hoje somos um —\nGlória ao Altíssimo!\nMorte deixamos para trás,\nNão chegará a nós jamais,\nO mundo não nos prende mais,\nDeus já nos justificou.",
      "Breve o Noivo, retornará:\nGlória ao Senhor! Glória ao Senhor!\nDeve a \"Noiva\" se ataviar —\nGlória ao Altíssimo!\nNosso anelo e aspiração\nVão ter, enfim, satisfação,\nCom Cristo em plena união\nTeremos um só querer.",
      "Mais uma vez cantem com fervor:\nGlória ao Senhor! Glória ao Senhor!\nUm novo cântico de louvor —\nGlória ao Altíssimo!\nGozo encherá o coração,\nVozes do céu ecoarão,\nE Seus remidos renderão\nEterna adoração."
    ],
    "coro": "Cantem bem alto e de coração:\nGlória ao Senhor! Glória ao Senhor!\nCântico igual nunca haverá\nA Cristo, o Senhor!"
  }
};

for (const [key, hymn] of Object.entries(novosHinos)) {
  data.novo[key] = hymn;
}

fs.writeFileSync(hinosPath, JSON.stringify(data, null, 2), 'utf8');
console.log('Successfully updated hinosData.json with hymns 181 through 199!');
console.log('Total hymns in novo:', Object.keys(data.novo).length);
