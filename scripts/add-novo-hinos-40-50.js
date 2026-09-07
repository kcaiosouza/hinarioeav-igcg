const fs = require('fs');
const path = require('path');

const hinosPath = path.join(__dirname, '../data/hinosData.json');
const rawData = fs.readFileSync(hinosPath, 'utf8');
const data = JSON.parse(rawData);

if (!data.novo) {
  data.novo = {};
}

const novosHinos = {
  "40": {
    "id": "40",
    "numero": 40,
    "titulo": "Sua divindade",
    "categoria": "Hinário Novo",
    "estrofes": [
      "És o Unigênito de Deus,\nPalavra eternal,\nRetrato mui exato Seu,\nO Amado celestial,\nÓ Filho, Tu divino és,\nPlen'tude da Deidade tens!",
      "Expressa imagem és do Pai,\nCom glória a refulgir,\nA plenitude Dele vai,\nEterna, estar em Ti,\nÓ Filho, Tu divino és,\nPlen'tude da Deidade tens!",
      "Divina essência em Ti está,\nImagem de Seu Ser,\nLuz incriada a brilhar,\nRevelas Seu querer,\nÓ Filho, Tu divino és,\nPlen'tude da Deidade tens!",
      "Mistérios deste Nome Seu\nQual anjo pode expor?\nSomente o Filho O conheceu!\nGlorioso o clamor:\nÓ Filho, Tu divino és,\nPlen'tude da Deidade tens!",
      "De toda a vasta amplidão,\nÉs centro, sol vivaz;\nE diz a eterna adoração\nDo Amado que compraz:\nÓ Filho, Tu divino és,\nPlen'tude da Deidade tens."
    ]
  },
  "41": {
    "id": "41",
    "numero": 41,
    "titulo": "Sua divindade",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Do amor do Pai proveio,\nAntes de os céus criar;\nÉ o primeiro e derradeiro,\nÉ o Alfa e Ômega;\nO que é e o que era,\nE Aquele que virá,\nPara todo o sempre, amém.",
      "Celebrado no passado\nFoi, à uma, o Senhor,\nNos profetas revelado,\nO Messias Salvador;\nHoje brilha o Esperado;\nTodos deem-Lhe louvor,\nPara todo o sempre, amém.",
      "Adorai-O nas alturas,\nAnjos, glória Lhe entoai;\nE na terra, criaturas,\nAo Senhor e Rei louvai.\nLíngua alguma fique muda,\nMas, com todos, O exaltai,\nPara todo o sempre, amém.",
      "Altas graças, salmos, hinos,\nMais louvor sem se exaurir,\nHonra, glória e domínio,\nE vitória no porvir,\nCom Deus Pai e Deus Espír'to,\nSejam, Cristo, só a Ti,\nPara todo o sempre, amém."
    ]
  },
  "42": {
    "id": "42",
    "numero": 42,
    "titulo": "Sua humanidade",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Glória ao Santíssimo nos céus,\nNa terra, o louvor,\nPelos fiéis caminhos Seus,\nPor Seu falar de amor.",
      "Deus, com saber e compaixão,\nAo transgressão reinar,\nComo o último Adão,\nQuis vir nos resgatar.",
      "Seu sangue e carne — sábio Amor! —\nVindos do velho Adão\nDevem se opor ao tentador,\nE prevalecerão.",
      "Eis o maior poder e dom\nQue limpa o ser carnal:\nTer Deus em nosso coração\nE a Essência divinal.",
      "Grande Amor que esmagou\nEm nós, por nós, o hostil,\nDupla agonia suportou,\nDor que jamais se viu!",
      "Ele em secreto no jardim\nE sobre a cruz de horror,\nComo sofrer, morrer enfim,\nA Seus irmãos mostrou.",
      "Glória ao Santíssimo nos céus,\nNa terra, o louvor,\nPelos fiéis caminhos Seus,\nPor Seu falar de amor."
    ]
  },
  "43": {
    "id": "43",
    "numero": 43,
    "titulo": "Sua humanidade",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Inspirativa história —\nDe Deus, a graça e luz\nEm traços tais de glória\nNo rosto de Jesus!\nImagem da Deidade\nA se nos refletir!\nQue gozo nos invade,\nAo contemplá-Lo aqui.",
      "É Ele o Deus completo,\nPerfeito Homem, sim,\nCom humanais afetos,\nE amor de Deus em Si;\nEm Sua vida e morte,\nSe vê o amor de Deus:\nAqui, humilde Homem —\nExcelso Deus, nos céus!",
      "Imaculada glória!\nOh! Face que reluz!\nQue Tua rica história\nNos molde a Ti, Jesus!\nIguais a Ti seremos,\nEm Ti veremos Deus:\nTeu rosto é doce espelho\nQue nos reflete o Seu."
    ]
  },
  "44": {
    "id": "44",
    "numero": 44,
    "titulo": "Sua humanidade",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Quem é o Homem que céus e terra faz\nInclinar-se ao poder de Seu falar?\nQuem é o Homem que às doenças cura traz\nE que pode todo homem transformar?\nQuem é o Rei que veio em servidão\nE Seu trono quis por mim abandonar?\nQuem é o Rei que, humilde, veio em mansidão\nPara vida, como servo, a todos dar?",
      "Quem é o Homem que sonda o coração\nE conhece cada parte de meu ser?\nQuem é o Homem que em mim faz Sua habitação\nDando vida para vencedor eu ser?\nQuem é o Rei que em servidão morreu\nE, a Seu trono, ressurreto retornou?\nQuem é o Rei que a morte e seu poder venceu,\nE, ao homem, a vitória entregou?"
    ],
    "coro": "Jesus, Filho de Deus,\nHomem que carregou pecados meus,\nIgual não há na terra e céu,\nEm meu lugar, na cruz morreu!\nIncomparável Homem-Deus!"
  },
  "45": {
    "id": "45",
    "numero": 45,
    "titulo": "Seu nome",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Teu nome é nosso amor,\nCristo Jesus!\nQue Nome superior\nO Teu, Jesus!\nTudo de Ti nos vem,\nNão temos outro bem,\nNada de Ti além,\nCristo Jesus!",
      "Um homem foste, sim,\nCristo Jesus!\nPor nós morreste assim,\nCristo Jesus!\nQuão grande é Teu amor,\nNão há igual, Senhor,\nÉs nosso Salvador,\nCristo Jesus!",
      "És nossa retidão,\nCristo Jesus!\nE nossa proteção,\nCristo Jesus!\nPor que perder a paz\nPor provas, fardos, ais,\nSe perto sempre estás,\nCristo Jesus?",
      "Em breve voltarás,\nCristo Jesus!\nE nos alegrarás,\nCristo Jesus!\nVamos ver logo a Ti,\nE ser iguais a Ti,\nPra sempre junto a Ti,\nCristo Jesus!"
    ]
  },
  "46": {
    "id": "46",
    "numero": 46,
    "titulo": "Seu nome",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Quão doce o nome de Jesus\nRessoa ao que crê!\nTemores, dor a nos tirar,\nAlívio conceder.",
      "Traz cura ao espírito,\nAo peito em opressão;\nSacia a alma com maná,\nDá paz ao coração.",
      "Que Nome! Rocha sobre a qual\nHá edificação;\nEscudo, abrigo, manancial\nDe graça e salvação.",
      "Jesus, Amigo, Salvador,\nProfeta, Rei, Senhor,\nPastor, Caminho, Vida, Fim —\nRecebe aqui louvor.",
      "É débil nosso coração\nE frio o sentir;\nMas ao Te vermos, vamos dar\nLouvor mais digno a Ti.",
      "Enquanto em nós Teu sopro houver,\nQueremos Te louvar\nE triunfar no Nome que\nA morte vem tragar."
    ]
  },
  "47": {
    "id": "47",
    "numero": 47,
    "titulo": "Seu nome",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Teu doce nome satisfaz,\nEu quero invocá-lo mais;\nQue pleno gozo e vida traz,\nJesus, Teu rico nome!",
      "Teu nome amo, ó Jesus,\nDo mal me afasta, traz-me luz,\nVai-se o temor, pois me conduz,\nJesus, Teu nome amável.",
      "Teu meigo nome sem igual\nÉ melodia celestial,\nTraz gozo e dá vigor total;\nJesus, Teu nome exalto.",
      "Quem a doçura expressará\nDo Nome que me apraz chamar?\nAo nome de Jesus, cantai\nLouvores para sempre!"
    ],
    "coro": "Nome com dulçor, Jesus!\nCheio de frescor, Jesus!\nDigno de louvor, Jesus,\nAgora e para sempre!"
  },
  "48": {
    "id": "48",
    "numero": 48,
    "titulo": "Seu nome",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Jesus, Teu nome amamos!\nProstramo-nos agora,\nEm nosso andar a Te ofertar\nAdoração e glória.\nLouvamos-Te contentes,\nCom vozes reverentes,\nÉ Teu valor, Jesus, Senhor,\nA tudo transcendente.",
      "Jesus, Teu nome amamos!\nDescreve o amor divino\nAo homem Seu que se perdeu,\nEterno amor genuíno,\nPrecede tudo e todos,\nAchou em nós seu gozo\nE fez-Te vir sofrer aqui,\nTornar-nos Teu tesouro.",
      "Jesus, Teu nome amamos!\nOh! Nome de humildade,\nDe afeição, mercê, perdão,\nDe andar em santidade.\n\"De dores, Homem\" foste,\nLevaste nossas dores,\nBebeste, pois, aqui por nós\nO cálix de amargores.",
      "Jesus, Teu nome amamos!\nDe Deus, és o Cordeiro\nQue nos tirou pecados, dor\nE a culpa por inteiro.\nVitória conquistaste,\nNos céus te assentaste,\nCompleta, então, a redenção,\nTu nos justificaste!"
    ]
  },
  "49": {
    "id": "49",
    "numero": 49,
    "titulo": "Seu nome",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Um Nome há que amo ouvir\nE seu valor cantar:\n\"Jesus\" — é som mais doce a mim,\nNa terra igual não há.",
      "\"Jesus\" me diz de Seu amor:\nMorreu, me desprendeu;\nE diz do Sangue de valor,\nDe minha paz com Deus.",
      "\"Jesus\" me diz que Deus, o Pai\nCom zelo me conduz,\nE mesmo quando a noite cai,\nVislumbro Sua luz.",
      "\"Jesus\" me diz haver Alguém\nQue sente minha dor\nE em sofrimentos me sustém —\nQue Nome superior!"
    ],
    "coro": "Oh! Quanto O amo!\nOh! Quanto O amo!\nOh! Quanto O amo,\nPois Ele me amou."
  },
  "50": {
    "id": "50",
    "numero": 50,
    "titulo": "Seu nome",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Jesus, que Nome com dulçor,\nTão rico em mercê;\nAo perdoado pecador,\nQue outro pode haver?",
      "Teu nome abrange a graça que,\nQual homem, Deus mostrou;\nSó Tu pudeste exibir\nA vida superior.",
      "Teu nome evoca Teu viver\nDe penas, de amor;\nConosco hoje a sofrer,\nPartilhas nossa dor.",
      "Nenhum pecado tens, Jesus;\nPecado, Deus Te fez;\nE, assim, por nós, naquela cruz,\nSalvaste-nos de vez.",
      "Quem, esse Nome, logo, ouviu\nSe prostra em louvor;\nÓ mais distinto em dez mil,\nLivrou-nos Teu amor."
    ]
  }
};

for (const [key, hymn] of Object.entries(novosHinos)) {
  data.novo[key] = hymn;
}

fs.writeFileSync(hinosPath, JSON.stringify(data, null, 2), 'utf8');
console.log('Successfully updated hinosData.json with hymns 40 through 50!');
console.log('Total hymns in novo:', Object.keys(data.novo).length);
