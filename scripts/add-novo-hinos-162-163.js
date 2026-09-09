const fs = require('fs');
const path = require('path');

const hinosPath = path.join(__dirname, '../data/hinosData.json');
const rawData = fs.readFileSync(hinosPath, 'utf8');
const data = JSON.parse(rawData);

if (!data.novo) {
  data.novo = {};
}

data.novo['162'] = {
  id: '162',
  numero: 162,
  titulo: 'Em Sua memória',
  categoria: 'Hinário Novo',
  estrofes: [
    'Jesus, naquela noite,\nDisseste aos Teus assim:\n"Fazei, pois, isto hoje,\nE vos lembrai de Mim".\nÓ Salvador amado,\nPudemos Te ouvir,\nCom coração mui grato,\nLembramo-nos de Ti.',
    'Teu grau de agonia,\nQuem pode conceber?\nO cálice da ira,\nQuiseste receber.\nPor Deus abandonado,\nNa cruz, maldito ali;\nSenhor Jesus, mui gratos,\nLembramo-nos de Ti.',
    'As trevas Te cercavam\nCausando opressão;\nQue ondas Te encrespavam\nO mar do coração!\nOh! Tua graça imensa\nE amor se vê aí;\nCom gozo e com tristeza,\nLembramo-nos de Ti.',
    'Dos mortos, Primogên\'to,\nDeus Te ressuscitou;\nCabeça da Igreja,\nDeus já Te exaltou.\nEm Ti por graça aceitos,\nPodemos refletir\nEm Tua dor e afetos\nE nos lembrar de Ti.',
    'Té vires, pois, em glória,\nLevares-nos, Jesus,\nEm dia de vitória,\nA descansar na luz,\nSim, Tua morte vamos\nAqui anunciar,\nE a ela conformar-nos\nAo nos lembrar de Ti.'
  ]
};

data.novo['163'] = {
  id: '163',
  numero: 163,
  titulo: 'Em Sua memória',
  categoria: 'Hinário Novo',
  estrofes: [
    'Segundo Teu falar, Senhor,\nHumilde e manso aqui;\nTomado por Teu grande amor,\nLembrar-me-ei de Ti.',
    'Teu Corpo, meu celeste pão,\nPartido foi por mim;\nTomando o cálice, então,\nLembrar-me-ei de Ti.',
    'Por Teu conflito ver, Senhor,\nLá no Getsêmani,\nA agonia, o suor,\nLembrar-me-ei de Ti.',
    'Volvendo à cruz os olhos meus,\nDescansarei ali;\nCordeiro, substituto meu,\nLembrar-me-ei de Ti.',
    'De Tua dor, de Teu sofrer,\nDe Teu amor por mim;\nEnquanto vida em mim houver,\nLembrar-me-ei de Ti.',
    'Emudecendo os lábios meus,\nChegando a vida ao fim,\nJesus, ao vir o reino Teu,\nRecorda-te de mim.'
  ]
};

fs.writeFileSync(hinosPath, JSON.stringify(data, null, 2), 'utf8');
console.log('Successfully updated hinosData.json with hymns 162 and 163!');
console.log('Total hymns in novo:', Object.keys(data.novo).length);
