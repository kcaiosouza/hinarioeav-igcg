const fs = require('fs');
const path = require('path');

const hinosPath = path.join(__dirname, '../data/hinosData.json');
const rawData = fs.readFileSync(hinosPath, 'utf8');
const data = JSON.parse(rawData);

if (!data.novo) {
  data.novo = {};
}

const novosHinos = {
  "121": {
    "id": "121",
    "numero": 121,
    "titulo": "Seu reino",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Louvai ao Senhor, nosso Deus Salvador,\nContai Suas glórias, Seu nome e favor,\nLevando agora por toda nação,\nTé ilhas remotas, Mercê, Salvação.",
      "Louvai a Jesus, que foi morto na cruz\nE trouxe a vida eterna à luz;\nVirá, sem demora, qual sol a nascer,\nSeu reino em glória estabelecer.",
      "Céus, terra e mar vão se regozijar\nE campos e matas alegres cantar,\nNo seco deserto ribeiros fluir,\nE tudo coberto de glória surgir.",
      "A Noiva leal em seu traje nupcial\nSerá contemplada no dia final;\nVirá, pois, seu Noivo com ela reinar,\nE a céu, terra novos abençoará."
    ],
    "coro": "Porque flui Seu amor como rio perene;\nSua misericórdia é por todo o sempre."
  },
  "122": {
    "id": "122",
    "numero": 122,
    "titulo": "Seu reino",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Vamos Jesus, Rei vindouro, exaltar,\nGlória ao Cordeiro de Deus tributar;\nHá de justiça, paz, gozo haver\nEm Seu reinado ao ser Ele Rei.",
      "Em Sua luz eis que habitarão\nTodos no grande Amor, sem facção;\nVão retidão e verdade nascer\nBem de Seu cetro ao ser Ele Rei.",
      "Sabedoria terá mais e mais\nE liberdade, Seu reino de paz;\nO inimigo, amigo há de ser,\nE espadas, relhas, ao ser Ele Rei.",
      "Conhecimento lá o Seu será\nComo as águas que cobrem o mar;\nTudo estará em perfeito esplendor\nE harmonia, reinando o Senhor.",
      "\"Venha Teu reino\", eis nosso clamor,\nTal grande dia apressa, Senhor;\nNova canção a criação há de ter:\n\"Cristo venceu ao diabo e é Rei!\"."
    ],
    "coro": "Glória a Jesus! Glória a Jesus,\nAo nosso Rei, ao Rei, Jesus!\nVamos cantar, a Jesus bendizer:\nGlória a Jesus, Rei, Jesus nosso Rei!"
  },
  "123": {
    "id": "123",
    "numero": 123,
    "titulo": "Seu amor",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Ó Salvador, com gratidão\nPor Teu grandioso amor,\nConfiamos-Te o coração\nE a vida com fervor.",
      "Amamos-Te ao ver em Ti\nTeu singular valor,\nE por poderes resistir\nÀ cruz de opróbrio e dor.",
      "Quem pelo amigo vai à cruz?\nQuem tem tamanho amor?\nPor inimigos, ó Jesus,\nMorreste — que amor!",
      "Embora sendo o próprio Deus,\nNa glória celestial;\nSofrendo, Tu vieste aos Teus\nEm servidão total.",
      "Vieste em carne, a nós igual,\nMas sem pecado em Ti;\nE vais tornar-nos, afinal,\nEm tudo, iguais a Ti;",
      "Iguais em força e mansidão,\nAmor e vida, enfim;\nTeremos tal transformação\nAté Te ver por fim.",
      "Prezamos Teu amor sem par\nDe todo o coração;\nTeu nome sempre inspirará\nLouvor e gratidão."
    ]
  },
  "124": {
    "id": "124",
    "numero": 124,
    "titulo": "Seu amor",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Embora insondável Teu amor,\nMinh'alma quer, Jesus, meu Salvador,\nSeu comprimento e largura ver,\nProfundidade, altura e seu eternal poder.",
      "Embora inefável Teu amor,\nMeus lábios vão, Jesus, meu Salvador,\nA todos pecadores proclamar\nO amor que, removendo a culpa, pode amor gerar.",
      "Embora incompleto meu louvor,\nMeu coração, Jesus, meu Salvador,\nAmor tão pleno e rico quer cantar,\nQue pode alguém rebelde como eu a Deus levar.",
      "Não posso conhecer, falar, cantar,\nA plenitude deste amor sem par,\nPorém meu vaso posso eu trazer,\nVazio, a Ti, ó Fonte viva, para o encher.",
      "Eu nunca tive para Ti, Senhor,\nUm pensamento ou gesto de amor;\nMas posso a Ti me achegar, assim,\nBaseado em Teu amor que é imutável para mim.",
      "Jesus, me enche de Teu doce amor!\nÀ fonte viva, leva-me, Senhor.\nCom simples fé me aproximarei,\nE nunca outra fonte além de Ti eu buscarei.",
      "Oh! quando Tua face contemplar,\nE junto a Ti no Trono me assentar,\nMinh'alma haverá de compreender,\nDe Teu amor, a plenitude e eternal poder."
    ]
  },
  "125": {
    "id": "125",
    "numero": 125,
    "titulo": "Seu amor",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Cristo algemas me quebrou,\nAs feridas me curou;\nMe buscou e corrigiu,\nMinhas trevas extinguiu.",
      "Pode acaso se esquecer\nUma mãe de seu bebê?\nCaso disso for capaz,\nO Senhor de mim, jamais.",
      "É mais alto que os céus\nE não muda o amor de Deus;\nMui profundo, sem final,\nForte, franco e leal.",
      "Concluindo a graça enfim\nSua terna obra em mim,\nDe Sua glória avistarei\nE com Ele reinarei.",
      "Clamo a Ti, ó meu Senhor,\nPobre, fraco é meu amor;\nMas Te amo e vou buscar,\nPela graça, mais Te amar."
    ]
  },
  "126": {
    "id": "126",
    "numero": 126,
    "titulo": "Seu amor",
    "categoria": "Hinário Novo",
    "estrofes": [
      "De meu Senhor, o amor fiel,\nÉ mais que o mundo pode dar;\nMais alto que os altos céus,\nE mais profundo que o mar.\nAntigo amor,\nSuperior,\nPois antes da criação de Deus\nAmou-me — glória ao nome Seu!",
      "No trono excelso o Senhor,\nDos anjos, tinha adoração;\nMas tudo, por amor, deixou,\nDescendo aqui em servidão.\nMe procurou\nSacrificou\nA alta posição do céu;\nBuscou-me — glória ao nome Seu!",
      "Sozinho a senda percorreu,\nSofreu do homem rejeição,\nE conhecido só por Deus,\nDe angústia, encheu Seu coração.\nNão hesitou\nNem recuou,\nMas, indo aonde estava eu,\nAchou-me — glória ao nome Seu!",
      "Rompendo o dia de temor,\nMui só, mas com intrepidez,\nCruéis escárnios suportou;\nDeus O abandonou e O fez\nPecado, sim,\nNa cruz por mim;\nEm vergonha e dor morreu.\nSalvou-me — glória ao nome Seu!",
      "Enquanto aqui viver, direi\nDas maravilhas desse Amor;\nPor fim com Ele estarei\nProvando a Graça superior.\nOh! que prazer\nSeu rosto ver!\nProstrado, renderei, fiel,\nLouvores — glória ao nome Seu!"
    ]
  },
  "127": {
    "id": "127",
    "numero": 127,
    "titulo": "Seu amor",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Um somos nós e Tu, Jesus?\nProfundo amor o Teu!\nUm, Tu e nós; ali na cruz,\nUm nós e Tu no céu.",
      "Do céu desceste aqui por nós,\nQue Graça e Amor sem fim;\nDe carne e sangue como nós,\nPartilhas nossa dor.",
      "Nossos pecados, Salvador,\nJá carregaste aqui;\nTeus foram cruz, fel e furor,\nA fim de nos remir.",
      "Cabeça da igreja és,\nQue à glória ascendeu;\nNem vida, morte ou revés\nDe Ti separa os Teus!",
      "O eternal mistério Teu,\nFaz-nos, Senhor, possuir:\nUm somos Tu e nós no céu,\nUm, nós e Tu aqui.",
      "Em breve, em Teu dia esplêndido,\nVamos Te ouvir a Voz,\nAnte o mundo atônito:\n\"Um somos Eu e vós!\"."
    ]
  },
  "128": {
    "id": "128",
    "numero": 128,
    "titulo": "Seu amor",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Teu amor foi e achou-nos\nNo deserto, ó Jesus;\nTernamente abraçou-nos\nAo morreres numa cruz.\nAlma, Cristo te amou\nE por ti se entregou!",
      "Eis o som de Quem clamava,\nSolitário no jardim;\nEm vigília, Ele orava,\nMas os Seus, só a dormir.\nAlma, Cristo te amou,\nSim, por ti se entregou.",
      "Ele fala ao Pai, provando\nCálice de amargor;\nMas bebeu-o, se negando;\nFoi por nós que o tomou.\nFoi, minh'alma, por amor\nQue por ti se entregou.",
      "Deus as ondas e as vagas\nSobre Cristo fez passar,\nPara que por Suas chagas\nMe pudesse resgatar.\nQue amor sem par, sem fim;\nOh! Jesus se deu por mim!",
      "Eis no monte do Calvário\nSeu clamor a prorromper:\n\"Deus, meu Deus, Tu desamparas\nQuem fez sempre Teu querer?\".\nAh! minh'alma, por amor,\nSim, por ti se entregou!",
      "Que alegria! pois findaste\nTua obra, Teu sofrer;\nJunto ao Pai te assentaste,\nPara nunca mais morrer.\nVive, ó alma, para Ti\nQuem se deu por ti aqui!",
      "Ó Senhor, Te bendizemos\nPela Graça sem igual;\nFace a face Te veremos,\nBreve, em gozo, afinal.\nMas cantamos hoje assim:\nOh! Jesus se deu por mim!"
    ]
  },
  "129": {
    "id": "129",
    "numero": 129,
    "titulo": "Seu amor",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Eu Te coroo Rei, Senhor,\nRege-me com poder!\nSe me esquecer de Tua dor,\nFaz-me o Calvário ver.",
      "Mostra-me a tumba em que, Jesus,\nForam Te prantear,\nOnde, em trajes fúlgidos,\nOs anjos Te guardar.",
      "Tal qual Maria venho a Ti,\nDádiva oferecer;\nTumba vazia, mostra a mim,\nFaz-me o Calvário ver.",
      "Dia após dia quero eu,\nPor Ti, a cruz tomar;\nTeu cálice de dor, de fel,\nPor Ti irei provar.",
      "Queima com fogo do altar\nMeus lábios, ó Senhor,\nE do Calvário vou falar\nA todo pecador."
    ],
    "coro": "Se me esquecer, Senhor, de Ti,\nDo mui atroz Getsêmani,\nE do amor que tens por mim,\nFaz-me o Calvário ver."
  },
  "130": {
    "id": "130",
    "numero": 130,
    "titulo": "Sua fidelidade",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Oh! a Cristo exaltemos,\nTodos que O conhecemos!\nO que somos e o que temos\nVamos-Lhe render.",
      "De Jesus, o Nome encanta,\nPara a luta nos levanta;\nMal nenhum, pois, nos suplanta;\nNele temos fé.",
      "Ele não nos desampara,\nÉ fiel e nunca falha;\nDele nada nos separa\nNem de Seu amor.",
      "Que a Ti nos apeguemos,\nÓ Senhor, e confiemos,\nTé o dia quando iremos\nTua Esposa ser.",
      "Estaremos noutra esfera,\nNova vida nos espera;\nO que nunca se nos dera,\nNosso então será."
    ]
  },
  "131": {
    "id": "131",
    "numero": 131,
    "titulo": "Sua salvação",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Eis louvores, muitas graças, da feliz multidão,\nEntoando a Jesus esta nova canção:",
      "Nós, outrora, pecadores, vis aos olhos de Deus,\nHoje, brancos qual lã, voz alçamos aos Céus:",
      "De rebeldes, Ele faz-nos sacerdotes e reis,\nCom Seu sangue remiu-nos, Seu povo nos fez.",
      "Quem acaso poderia esperança encontrar\nSe Seu grande amor não viesse salvar?",
      "Todos juntos entoemos esta nova canção,\nE, outros crendo, também cantarão o refrão:"
    ],
    "coro": "Glória Àquele que nos ama, que sangue jorrou,\nDos pecados, do mal, nos lavou, libertou!"
  },
  "132": {
    "id": "132",
    "numero": 132,
    "titulo": "Sua graça",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Mil línguas eu quisera ter,\nE entoar louvor\nÀs glórias de meu Deus e Rei,\nÀ graça do Senhor.",
      "Gracioso Mestre, ó meu Deus,\nAjuda-me a levar\nTeu nome a todos sob os céus\nE a Graça singular.",
      "Jesus, que Nome animador!\nMeu vil temor desfaz;\nE traz a mim, um pecador,\nConsolo, vida e paz.",
      "Eterno escravo quero ser\nDo amor de meu Senhor,\nPois, para me livrar, sofreu\nPrisão, escárnio e dor.",
      "Sim, ao pecado aniquilou\nA fim de me livrar;\nAo mais imundo transgressor\nSeu sangue vem limpar.",
      "Do grande Amor a me salvar\nNão sou merecedor;\nTamanha Graça veio dar\nAo mais vil pecador.",
      "Teu nome amo, meu Senhor,\nE Teu querer é o meu;\nTivesse eu mil corações,\nSeriam todos Teus."
    ]
  },
  "133": {
    "id": "133",
    "numero": 133,
    "titulo": "Sua graça",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Louvo a Ti, pois a glória celeste,\nComo um raio de luz, me inundou;\nAos pecados, perdão concedeste,\nNão me deixa jamais Teu amor.",
      "Se Teus feitos, ó Deus, dão-Te graças,\nE o sol seu louvor ergue a Ti,\nSe o vento soprando na mata\nFaz canção dos ciprestes surgir,",
      "Estes lábios, então, com certeza,\nUm tributo irão ofertar;\nCantará toda a natureza\nE de mim som nenhum se ouvirá?",
      "Salvador, meu Cordeiro amado,\nAdorar-Te desejo bem mais;\nMesmo de mil louvores cercado,\nMinha humilde canção ouvirás."
    ]
  },
  "134": {
    "id": "134",
    "numero": 134,
    "titulo": "Sua graça",
    "categoria": "Hinário Novo",
    "estrofes": [
      "A graça divinal\nSurpreende a mim!\nÀ minha escravidão\nJá pôs um fim!\nQue fez tal ocorrer?\nFoi de Deus, de Seu querer,\nE hoje posso ser\nLivre enfim!",
      "A mim, que nada sou,\nDeus escolheu,\nAo Trono destinou\nAo lado Seu.\nAmor O fez correr\nE ao filho acolher,\nAchando com mercê\nQuem se perdeu!",
      "Oh! Sou um pecador\nSem solução!\nMas Deus, por grande amor,\nFez redenção.\nJesus, o Filho Seu,\nGrande graça concedeu,\nNa cruz por mim morreu —\nQue salvação!",
      "Ao meditar: Por que,\nNo Gólgota,\nA pena quis sofrer\nEm meu lugar?\nOh! sendo o justo Deus,\nA um pecador e réu\nIndigno como eu\nQuis resgatar!",
      "Agora meu clamor\nÉ habitar\nEm Cristo, o Salvador,\nA me abrigar.\nEscudo Ele é\nA cobrir-me e proteger;\nDos dardos a arder\nMe guardará.",
      "Oh! Graça dá-me mais,\nSenhor Jesus!\nSe vêm de Satanás\nIdeias ruins,\nQue as possas dissipar,\nDia a dia me guardar,\nÓ Rei, sob Teu guiar,\nEm plena luz.",
      "Minh'alma, meu saber\nE meu vigor,\nCom todo vivo ser\nRendei louvor\nA Quem, da servidão\nDo pecado e seu ferrão,\nMe deu libertação —\nQue Salvador!"
    ]
  },
  "135": {
    "id": "135",
    "numero": 135,
    "titulo": "Sua bondade",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Meu cântico é Cristo:\nMe cobre de mercê,\nDe bênçãos, tem-me enchido,\nE faz-me O bendizer.\nMeu cântico é Cristo —\nCordeiro de valor —\nNa cruz, por mim, vertido,\nSeu sangue me comprou.",
      "Meu cântico é Cristo;\nAos pés do Salvador,\nRelembro a incrível\nBondade do Senhor.\nMeu cântico é Cristo\nEm toda situação\nE a graça irresistível\nDe Sua salvação.",
      "Meu cântico é Cristo\nEm meu caminho aqui,\nTé o reino refulgindo\nCom glória, enfim, surgir;\nE quando minha alma\nEm tal esfera entrar,\nCanção jamais cantada\nVou sempre entoar."
    ]
  },
  "136": {
    "id": "136",
    "numero": 136,
    "titulo": "Sua bondade",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Glória ao Senhor, Rei poderoso das criaturas!\nAlma, bendiz quem é teu Salvador, vida e cura.\nVós, que escutais,\nVinde e a Ele cantai:\nHosanas mil nas alturas!",
      "Glória ao Senhor! Maravilhoso, o mundo governa,\nE te conduz segura sobre asas mui ternas!\nLouva a Quem\nFaz tudo para teu bem,\nCuja bondade é suprema.",
      "Glória ao Senhor, que te criou de forma assombrosa,\nSaúde dá e te sustém com mão amorosa!\nNa aflição,\nTraz Ele consolação\nSob Suas asas graciosas.",
      "Glória ao Senhor, que te abençoa bondosamente,\nQue faz chover Seus dons e graça torrencialmente.\nQuem sondará\nTudo o que te fará\nCom Seu amor envolvente?",
      "Glória ao Senhor! Oh! tudo que há em mim O bendiga!\nDê-Lhe louvor, sim, todo vivo ser que respira;\nFalam amém\nLábios alegres que têm\nUma canção inaudita."
    ]
  },
  "137": {
    "id": "137",
    "numero": 137,
    "titulo": "Sua bondade",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Entoarei de coração\nA Ti, Senhor, em gratidão;\nCom todos Teus darei louvor:\nBem tudo fez meu Salvador!",
      "Sensacional, grandioso, sim,\nTem sido Teu amor por mim!\nSalvaste-me da morte e horror;\nBem tudo fez meu Salvador!",
      "Por Teu amor eu desfrutar\nFizeste-me mercês provar,\nQue excedem a qualquer louvor;\nBem tudo fez meu Salvador!",
      "E em glória, enfim, ao ressurgir,\nE em coro aos céus eu me unir,\nAssim darei, darei louvor:\nBem tudo fez meu Salvador!"
    ],
    "coro": "E assim darei, darei louvor:\nBem tudo fez meu Salvador!\nE assim darei, darei louvor:\nBem tudo fez meu Salvador!"
  },
  "138": {
    "id": "138",
    "numero": 138,
    "titulo": "Sua beleza",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Vou respirar-Te vez pós vez,\nÓ Brisa de amor;\nQue a mirra, mais perfume tens,\nFragrante Flor de hena* és,\nO Nardo superior.",
      "Vou contemplar-Te, Noivo meu,\nDos belos, és o mais;\nQue êxtase me absorveu\nAo ver na luz do rosto Teu\nBeleza que apraz!",
      "Vou entregar-me, Amo, a Ti,\nAmigo e Salvador;\nLiberto não mais vou sair,\nMas me dispor a Te servir,\nPra sempre, com fervor.",
      "O que posso mais, de Ti, cantar?\nMui doce é Teu Ser;\nMeu coração alegre está,\nLouvar-Te-ei sem descansar,\nVens me satisfazer.",
      "Que mais dizer, dar descrição\nDe tudo o que és, Senhor?\nMui terno é Teu coração,\nAtrais-me a Ti, e ouço então:\n\"Contigo sempre estou!\"."
    ]
  },
  "139": {
    "id": "139",
    "numero": 139,
    "titulo": "Sua beleza",
    "categoria": "Hinário Novo",
    "estrofes": [
      "És mais belo que a alva,\nÓ meu Rei e Salvador!\nA beleza tal, minh'alma\nSe apraz em dar louvor.",
      "Tens, Senhor, luz como manto,\nVestes glória, a de Deus,\nE o cetro soberano\nHoje e para sempre Teu.",
      "Oh! Mercê que não entendo,\nGraça rica, singular,\nE Amor que, em Teu reino,\nMe prepara um lugar!",
      "Em Teu reino, finalmente,\nA coroa ganharei;\nCom milhares, tanta gente,\nPara sempre cantarei."
    ],
    "coro": "És mais belo que a alva,\nMais brilhante que o Sol, Senhor;\nVão-se as trevas assustadas\nAnte todo o Teu fulgor."
  },
  "140": {
    "id": "140",
    "numero": 140,
    "titulo": "Sua beleza",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Cristo formoso,\nRei do céu e terra,\nFilho do homem e de Deus,\nQuero honrar-Te\nE adorar-Te,\nCoroa, Glória e Gozo meus.",
      "Quão lindos prados,\nBosques adornados\nEm trajes mui primaveris;\nÉs bem mais belo,\nPuro e singelo,\nQuem ao aflito faz feliz.",
      "Sol, quão garboso,\nO luar, formoso,\nE belos astros a brilhar;\nÉs mais luzente,\nMais transcendente,\nExcedes toda a luz solar.",
      "Da natureza\nToda a beleza\nEm Ti, Jesus, se pode ver;\nQuem mais chegado,\nBelo ou amado\nQue Tu, meu Salvador, vou ter?"
    ]
  }
};

for (const [key, hymn] of Object.entries(novosHinos)) {
  data.novo[key] = hymn;
}

fs.writeFileSync(hinosPath, JSON.stringify(data, null, 2), 'utf8');
console.log('Successfully updated hinosData.json with hymns 121 through 140!');
console.log('Total hymns in novo:', Object.keys(data.novo).length);
