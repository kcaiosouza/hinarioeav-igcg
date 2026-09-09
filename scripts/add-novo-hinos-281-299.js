const fs = require('fs');
const path = require('path');

const hinosPath = path.join(__dirname, '../data/hinosData.json');
const rawData = fs.readFileSync(hinosPath, 'utf8');
const data = JSON.parse(rawData);

if (!data.novo) {
  data.novo = {};
}

const novosHinos = {
  "281": {
    "id": "281",
    "numero": 281,
    "titulo": "Satisfeitos com Cristo",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Procurei por toda a vida\nUma fonte de frescor,\nQue matasse minha sede,\nO vazio interior.",
      "Ao comer de alfarrobas,\nEsvaiu-se meu vigor;\nAnelava minha alma\nUm sustento bem melhor.",
      "Por riquezas ansiava\nPara me satisfazer,\nMas o pó que eu juntava\nSó me vinha escarnecer.",
      "Fonte viva infindável,\nPão da vida, superior,\nQue riqueza inestimável,\nPara mim, meu Salvador!"
    ],
    "coro": "Aleluia! Encontrei-O!\nCristo, enfim, me saciou;\nSatisfez a minha alma,\nSua vida me salvou."
  },
  "282": {
    "id": "282",
    "numero": 282,
    "titulo": "Assegurados pelas provisões divinas",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Perante o Trono de esplendor\nPossuo forte alegação:\nUm Sacerdote, que é Amor,\nPor mim fazendo intercessão.",
      "Nas Mãos meu nome escreveu,\nNo Coração o quis gravar;\nEnquanto Ele está com Deus,\nQuem Dele pode me apartar?",
      "Mas o diabo quando vem\nAcusação me infligir,\nOs olhos ergo, e vejo Quem\nA meus pecados já pôs fim.",
      "O Salvador, porque morreu,\nMeu ser caído libertou,\nPois satisfez o justo Deus,\nQue O olhou e me perdoou.",
      "Eis minha santa Retidão,\nCordeiro que ressuscitou,\nO Rei de glória e compaixão,\nO imutável, grande EU SOU!",
      "Com Ele em mim, não morrerei,\nSeu sangue me comprou, sou Seu;\nEis minha vida, isto sei,\nCom Cristo oculta hoje em Deus."
    ]
  },
  "283": {
    "id": "283",
    "numero": 283,
    "titulo": "Assegurados pelas provisões divinas",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Completo em Ti! Só Teu labor\nTraz salvação a mim, Senhor;\nTeu sangue me comprou perdão,\nCompleto em Ti sou hoje então.",
      "Completo em Ti! Não pecarei,\nA Graça em mim há de reger;\nAo tentador irás banir,\nE firme vou, completo em Ti.",
      "Completo em Ti! Me suprirás,\nE bem nenhum me negarás;\nJá que Tu és meu tudo aqui,\nCompleto em Ti, que mais pedir?",
      "Meu Salvador, ajuntarás\nClãs e nações e os julgarás,\nMas estarei em meio aos Teus,\nCompleto em Ti, ao lado Teu."
    ],
    "coro": "Sou justo em Ti, gratuito dom!\nE santo em Ti, que salvação!\nTeu sangue me comprou perdão,\nVou glória obter — que galardão!"
  },
  "284": {
    "id": "284",
    "numero": 284,
    "titulo": "Assegurados pelas provisões divinas",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Bem firme está a minha fé,\nMas não na tradição;\nCri no Senhor, no Deus que é,\nPor Sua intercessão.\n\nJá não preciso fornecer\nNenhuma alegação;\nBastou Jesus na cruz morrer\nE dar-me salvação.",
      "Ver que Jesus é Salvador\nMeu medo faz findar;\nE mesmo a mim, um pecador,\nJesus acolherá.",
      "Descanso na Palavra sã,\nQue Deus nos escreveu:\nSó em Jesus há salvação,\nNo Sangue que verteu.",
      "Qual Médico, desfaz a dor,\nBuscou quem se perdeu;\nPor mim sofreu, por mim sangrou,\nPor mim a vida deu."
    ]
  },
  "285": {
    "id": "285",
    "numero": 285,
    "titulo": "Assegurados pelas provisões divinas",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Na tribulação, hás de ancorar,\nQuando a escuridão te afrontar;\nVento te arrastar, a maré subir?\nFirme vais ficar ou sucumbir?",
      "Atracada a nau, não soçobrará,\nPois por Sua mão segura está;\nDeus, meu coração já ao Seu atou;\nVenço o furacão em Seu vigor.",
      "Firme a nau irá se perigo houver,\nA maré baixar, temor bater;\nTempestades há, ventos podem vir,\nMas jamais o mar nos imergir.",
      "Ancorados, quem há de balançar\nQuando a morte vem nos sufocar?\nE tal âncora sempre é fiel\nPara quem morar além do véu."
    ],
    "coro": "Âncora temos a nos guardar\nFirmes e sãos ante o bravo mar,\nFundeados em Seu grande amor,\nSobre a Rocha que é o Salvador."
  },
  "286": {
    "id": "286",
    "numero": 286,
    "titulo": "Assegurados pelas provisões divinas",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Ouvi de Seu amor,\nDo Sangue que verteu,\nDo Sacrifício superior,\nE tenho paz com Deus.",
      "Perene a paz dos céus,\nQual Deus, é eternal,\nEstável como o trono Seu,\nPor todo o sempre igual.",
      "As nuvens vêm e vão,\nMau tempo tolda a luz;\nMas imutável comunhão\nHá junto a Sua cruz.",
      "Meu gozo vai e vem,\nÉ fraco meu amor;\nMas paz com Ele se mantém,\nNão muda o Salvador.",
      "Eu mudo, Cristo, não;\nNão morrerá jamais;\nÉ Seu amor habitação\nSegura onde há paz.",
      "A Cruz não se moveu,\nMas Ele aos céus alçou;\nA pedra, um anjo removeu,\nA tumba ali ficou;",
      "Ali descanso eu,\nE têm meus ais um fim;\nO Filho veio e morreu,\nE ressurgiu enfim.",
      "Sei: vive o Redentor,\nCom Deus, no trono está;\nE Seu poder, verdade, amor,\nJá posso desfrutar."
    ]
  },
  "287": {
    "id": "287",
    "numero": 287,
    "titulo": "Assegurados pelas provisões divinas",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Não sei por que de Deus o amor\nA mim se revelou,\nPor que Jesus, o Salvador,\nNa cruz me resgatou.",
      "Não sei, pois, como entrou em mim\nA fé da salvação;\nNem como, crendo, recebi\nA paz no coração.",
      "Não sei o modo como agiu\nO Espírito eternal;\nNos convenceu, mostrou Jesus,\nE deu-nos fé real.",
      "Não sei o que de mal ou bem\nÉ destinado a mim;\nSe maus ou áureos dias vêm,\nAté da vida o fim.",
      "Não sei a hora em que virá\nO meu Senhor e Rei;\nSe vou do corpo me despir,\nOu nele estarei."
    ],
    "coro": "Mas eu sei em quem tenho crido,\nE estou bem certo que é poderoso\nPra guardar o meu tesouro\nAté o dia final."
  },
  "288": {
    "id": "288",
    "numero": 288,
    "titulo": "O Salvador maravilhoso",
    "categoria": "Hinário Novo",
    "estrofes": [
      "É maravilhoso Jesus, Salvador,\nTão maravilhoso pra mim.\nNa fenda da rocha me esconde em amor,\nE dá alegria sem fim.",
      "Jesus, Salvador, meu Senhor singular,\nConsolo de meu coração,\nAmpara meus pés — que me abalará? —\nSegura-me sempre a mão.",
      "Coroa-me sempre de bênçãos dos céus,\nE, pleno do Ser divinal,\nEm êxtase canto: Oh! glória a Deus\nPor tal Redentor sem igual!",
      "E quando os ares, em glória, galgar\nA fim de encontrar o Senhor,\nCom todos remidos eu hei de clamar:\nOh! que Salvação! que Amor!"
    ],
    "coro": "Na fenda da rocha me esconde o Senhor,\nNum árido, tórrido chão,\nOculta-me em Seu mais profundo amor\nE cobre-me com Sua mão.\nE cobre-me com Sua mão."
  },
  "289": {
    "id": "289",
    "numero": 289,
    "titulo": "O Salvador maravilhoso",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Cristo amou-me, maravilhoso!\nCristo amou-me, não sei o porquê;\nVeio aos perdidos e resgatou-os;\nJá me ganhou, vou por Ele viver.",
      "Cristo salvou-me, maravilhoso!\nCristo salvou-me, não sei a razão;\nFoi meu resgate tão precioso,\nMorto na cruz em cruel aflição.",
      "Há de guiar-me, maravilhoso!\nHá de guiar-me, por onde não sei;\nMas, resoluto, em dor ou gozo,\nChuva ou sol, sempre O seguirei.",
      "Vai coroar-me, maravilhoso!\nVai coroar-me, mas quando, não sei;\nCom glória e honra, ante Seu trono,\nAlegremente O aclamarei!"
    ],
    "coro": "Glória ao Cristo maravilhoso!\nGlória a Cristo, a meu Salvador!\nGlória ao Cristo maravilhoso!\nA Jesus Cristo, eterno louvor!"
  },
  "290": {
    "id": "290",
    "numero": 290,
    "titulo": "O Salvador maravilhoso",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Cantarei a linda história\nDe Jesus, meu Salvador,\nQue deixou Seu lar na glória,\nPara ser meu Redentor.",
      "Cristo achou-me só, perdido,\nResgatou-me ao redil,\nAbraçou-me compassivo,\nMeu caminho corrigiu.",
      "Era cego, assustado,\nE estava a desmaiar,\nMas Jesus, de vil estado,\nQuis curar-me e livrar.",
      "Posso dias ter escuros,\nOu caminhos d'aflição,\nVou com Cristo bem seguro,\nPois conduz-me Sua mão.",
      "Ele, até por fim tomar-me,\nVai guardar-me e limpar,\nPor completo transformar-me\nPara em glória me encontrar."
    ],
    "coro": "Cantarei a linda história\nDe Jesus, meu Salvador;\nCantarei na luz da glória,\nPara sempre seu dulçor."
  },
  "291": {
    "id": "291",
    "numero": 291,
    "titulo": "O Salvador maravilhoso",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Precioso é Cristo, meu Rei, Salvador,\nA Quem presto honras com todo louvor\nE sempre me volto por graça e vigor;\nPrecioso é Jesus para mim!",
      "Batendo à porta de meu coração,\nHumilde, paciente, queria admissão.\nPor tempos deixei-O à espera, em vão;\nPrecioso é Jesus para mim!",
      "No monte da bênção, que gozo real,\nSob céu cristalino, sem nuvens de mal,\nVencido o vale, O vejo afinal;\nPrecioso é Jesus para mim!",
      "Já determinou o Senhor um lugar\nEm que Sua face radiante, sem par,\nPor fé vou um dia, por fim, contemplar;\nPrecioso é Jesus para mim!"
    ],
    "coro": "É mui precioso Jesus para mim!\nÉ mui precioso Jesus para mim!\nCeleste prazer é Jesus conhecer!\nPrecioso é Jesus para mim!"
  },
  "292": {
    "id": "292",
    "numero": 292,
    "titulo": "O Salvador maravilhoso",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Eu não tinha em quem confiar,\nQuem pudesse vir me salvar;\nDeus, Seu Filho amado, enviou,\nMe salvou e me libertou!",
      "Eu vivia na escuridão,\nEm pecado e dissolução;\nMas, um dia, Ele me achou\nE Seu sangue me resgatou.",
      "Nele temos a redenção\nE ganhamos a filiação.\nSeu Espír'to e vida nos dão\nGrande e total salvação.",
      "Quando, enfim, o dia chegar\nE Ele ao trono vir nos chamar,\nVamos, por no Espírito andar,\nSua recompensa ganhar."
    ],
    "coro": "O Senhor é meu Salvador,\nÉ a Rocha da salvação.\nÉ a Rocha da salvação,\nÉ a Rocha da salvação."
  },
  "293": {
    "id": "293",
    "numero": 293,
    "titulo": "Uma obra completa",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Chagas por mim, chagas por mim,\nNa cruz Jesus foi ferido por mim;\nDe minhas faltas livrou-me enfim,\nTudo porque foi ferido por mim.",
      "Morto por mim, morto por mim,\nNa cruz Jesus já foi morto por mim;\nFez redenção ao morrer Ele assim,\nTudo porque foi à morte por mim.",
      "Ele por mim, Ele por mim,\nRessuscitou do sepulcro por mim;\nÀ morte e seu aguilhão pôs um fim,\nTudo porque ressurgiu já por mim.",
      "Vive por mim, vive por mim,\nNos céus Jesus eis que vive por mim;\nDia a dia intercede por mim,\nTudo porque Ele vive por mim.",
      "Breve por mim, breve por mim,\nEle virá lá nos ares por mim;\nQue gozo: vou contemplá-Lo enfim!\nComo O louvo, vem breve por mim!"
    ]
  },
  "294": {
    "id": "294",
    "numero": 294,
    "titulo": "Um firme fundamento",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Que firme alicerce à fé já se deu,\nNa mui excelente Palavra de Deus;\nQue mais Ele fala do que já falou\nÀquele que em Cristo refúgio logrou?",
      "\"Não temas, sê forte; contigo estou,\nIrei socorrer-te — teu Deus, sim, Eu sou;\nVou fortalecer-te, em pé te firmar,\nPorque Minha destra te sustentará\".",
      "\"Por águas profundas te faço passar,\nMas rios de dores não vão transbordar,\nPorque nos problemas te abençoarei\nE tua tristeza santificarei\".",
      "\"E quando encontrares cruel provação\nTerás Minha graça por tua porção;\nO fogo não pode ferir-te jamais —\nMas purificado qual ouro serás\".",
      "\"Até na velhice Meu povo irá\nMeu terno e constante amor desfrutar;\nQual nívea coroa as cãs lhes serão,\nE ainda em Meu seio descanso terão\".",
      "\"Aquele que em Cristo repouso achou,\nNão vou desertar à mercê d'opressor;\nPor mais que o Hades o tente abalar,\nEu nunca, não, nunca o hei de deixar\"."
    ]
  },
  "295": {
    "id": "295",
    "numero": 295,
    "titulo": "Um firme fundamento",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Firme nas promessas de meu Cristo e Rei,\nSeus louvores para sempre entoarei;\nGlória nas alturas, eu proclamarei,\nFirme nas promessas de meu Deus.",
      "Firme nas promessas de Jesus, Senhor,\nAnte a descrença ou cruel temor;\nPela sã Palavra tudo vou transpor,\nFirme nas promessas de meu Deus.",
      "Firme nas promessas posso contemplar\nSeu precioso sangue limpo me tornar;\nLiberdade em Cristo vou já desfrutar,\nFirme nas promessas de meu Deus.",
      "Firme nas promessas de Jesus, Senhor,\nPreso nos eternos laços de amor,\nVou com Sua espada ser um vencedor,\nFirme nas promessas de meu Deus.",
      "Firme nas promessas, não desmaiarei,\nSempre o Espírito eu ouvirei,\nEm meu Salvador por fé descansarei,\nFirme nas promessas de meu Deus."
    ],
    "coro": "Firme, firme,\nFirme em Suas santas e fiéis promessas;\nFirme, firme,\nSim, firme nas promessas de meu Deus."
  },
  "296": {
    "id": "296",
    "numero": 296,
    "titulo": "Nossa salvação eterna",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Que alegria! Deus em Cristo me salvou!\nMudou-me a sorte,\nLivrou-me da morte\nE Sua vida me dispensou;\nFui predestinado,\nEleito e chamado,\nCom o Seu Filho herdeiro sou.",
      "Que segurança! O Senhor me resgatou!\nCordeiro amado,\nPor mim imolado,\nCom o Seu sangue já me comprou;\nTirou meus pecados,\nNão mais condenado,\nEm Suas mãos bem seguro estou.",
      "Que salvação, pois, concedeu-me o Senhor!\nJamais vou perdê-la,\nMas desenvolvê-la\nEm santidade e em temor;\nE Cristo, em vitória,\nConduz-me à glória,\nCom os cativos de Seu amor."
    ],
    "coro": "Eis que Deus é minha salvação,\nO meu canto e vigor!\nTirarei com alegria\nÁguas vivas todo dia,\nInvocando-Te, Senhor!"
  },
  "297": {
    "id": "297",
    "numero": 297,
    "titulo": "A alegria da salvação",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Tenho paz como um rio,\nTenho paz como um rio,\nTenho paz como um rio\nNo Senhor.\nTenho paz como um rio,\nTenho paz como um rio,\nTenho paz como um rio\nNo Senhor.",
      "Tenho amor transbordando,\nComo grande oceano;\nTenho amor transbordando\nNo Senhor.\nTenho amor transbordando,\nComo grande oceano;\nTenho amor transbordando\nNo Senhor.",
      "Tenho gozo qual fonte,\nTenho gozo qual fonte,\nTenho gozo qual fonte\nNo Senhor.\nTenho gozo qual fonte,\nTenho gozo qual fonte,\nTenho gozo qual fonte\nNo Senhor.",
      "Tenho paz como um rio,\nTenho amor transbordando,\nTenho gozo qual fonte\nNo Senhor.\nTenho paz como um rio,\nTenho amor transbordando,\nTenho gozo qual fonte\nNo Senhor."
    ]
  },
  "298": {
    "id": "298",
    "numero": 298,
    "titulo": "A alegria da salvação",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Aleluia! Quero expressar cantando,\nAleluia! Quero expressar gritando,\nAleluia! Só posso viver com Deus,\nCom Deus.",
      "Nesta nova criação eu vivo,\nDesta grande salvação eu bebo\nE livre de condenação estou\nEm Deus, em Deus."
    ]
  },
  "299": {
    "id": "299",
    "numero": 299,
    "titulo": "Em Cristo",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Em Cristo hoje exulto,\nLivre estou do velho Adão!\nO velho fez-se novo,\nÉ tudo celestial.\nDesfruto e provo pleno gozo,\nLiberdade, vida e paz,\nEternamente em Cristo estou."
    ]
  }
};

Object.assign(data.novo, novosHinos);

fs.writeFileSync(hinosPath, JSON.stringify(data, null, 2), 'utf8');
console.log('Successfully added hymns 281 to 299!');
console.log('Total hymns in novo:', Object.keys(data.novo).length);
