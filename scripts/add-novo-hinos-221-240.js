const fs = require('fs');
const path = require('path');

const hinosPath = path.join(__dirname, '../data/hinosData.json');
const rawData = fs.readFileSync(hinosPath, 'utf8');
const data = JSON.parse(rawData);

if (!data.novo) {
  data.novo = {};
}

const novosHinos = {
  "221": {
    "id": "221",
    "numero": 221,
    "titulo": "O batismo",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Senhor, só Teu Espírito\nNos pode saciar;\nSó Seu poder enérgico\nNos põe sob Teu guiar.",
      "Senhor, só Teu Espírito\nNos mostra Teu querer;\nSó Seu poder fortíssimo\nFaz nossa alma arder.",
      "Senhor, só Teu Espírito\nDons almejados traz;\nÉ Seu poder altíssimo\nQue maravilhas faz.",
      "Senhor, que Teu Espírito\nDê chuva a nos regar;\nE ao buscar-Te, vem, Jesus,\nAqui nos motivar."
    ],
    "coro": "Teu Espírito, Senhor,\nDerrama com poder,\nA alcançar quem Te buscar;\nBatiza-nos com poder."
  },
  "222": {
    "id": "222",
    "numero": 222,
    "titulo": "Como o Espírito que habita interiormente",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Mora hoje Deus em nosso interior,\nComo o Espírito excelente em nós.\nHoje somos um espír'to co'o Senhor,\nQue é o Espír'to da vida em nós.",
      "Nosso espírito já clama \"Aba, Pai!\"\nPelo Espírito excelente em nós.\nÉ o Espírito do Filho a clamar\nComo o Espír'to da vida em nós.",
      "Vive o Senhor em nosso interior,\nComo o Espírito excelente em nós.\nNosso gozo é, pois se transfigurou\nComo o Espír'to da vida em nós.",
      "Eis o Espírito da realidade aqui\nComo o Espírito excelente em nós.\nCristo é real, podemos discernir,\nPelo Espír'to da vida em nós.",
      "Vamos despertar tal dom interior\nComo o Espírito excelente em nós.\nNosso espír'to flui, clamando: Ó Senhor!\nCom o Espír'to da vida em nós."
    ],
    "coro": "Oh! Ele é o Espírito em nós,\nExcelente Espírito em nós!\nDeus no Filho está, e o Filho hoje é\nO Espír'to da vida em nós!"
  },
  "223": {
    "id": "223",
    "numero": 223,
    "titulo": "Como o Espírito conformador",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Louvamos-Te, ó Deus,\nPor em nós habitar\nO Espír'to de Cristo\nQue vida nos dá.\nAleluia! Que Espír'to!\nAleluia! Real!\nAleluia! Muito rico,\nDá vida eternal!",
      "Oh! vamos cantar\nAo que veio aqui\nComo o Espír'to da vida\nConosco se unir.\nAleluia! Este é Cristo,\nAleluia! E mais,\nAleluia! É o Espír'to,\nQue vida nos traz!",
      "Deus já nos gerou,\nTransformando está,\nE à imagem do Filho\nIrá conformar.\nAleluia! Sua vida,\nTransformar-nos irá!\nE Ele nosso corpo ainda\nTransfigurará!",
      "Tal conformação\nVai em nós ocorrer\nAo comermos Daquele\nQue tudo provê.\nSalvação tão excelente!\nNosso prêmio final!\nAleluia! Suficiente,\nSegura e eternal!"
    ]
  },
  "224": {
    "id": "224",
    "numero": 224,
    "titulo": "Como a unção, o selo e o penhor",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Na Palavra encontrei\nUm tesouro singular:\nA Unção, não regras, lei,\nPode em mim vir habitar.",
      "Faz de Cristo eu provar,\nNa Palavra, Deus comer;\nEla, o Espírito, está\nBem mesclada a meu ser.",
      "Por Seu sangue remissor,\nCristo, a Unção, se move em mim!\nSeu mover interior\nPurifica-me assim.",
      "Deus em Cristo hoje é\nNo Espír'to vida em mim;\nTé igual a Ele eu ser,\nVem o Santo me ungir.",
      "Deus o Espírito se fez,\nNo espír'to O posso ver;\nMais profundo é cada vez —\nOh! Deus posso conhecer!",
      "Ao seguir-Lhe a Unção,\nPosso Nele sempre estar;\nSeu ensino e infusão,\nMinha alma conquistar."
    ],
    "coro": "Em meu espírito há\nSanta Unção sem par,\nSempre me ungindo!\nDeus de mim fluindo!\nOh! Deus me deu visão\nE revelação\nPara aplicá-la!\nA Unção habita em mim!"
  },
  "225": {
    "id": "225",
    "numero": 225,
    "titulo": "Como a unção, o selo e o penhor",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Seja nosso Deus louvado —\nAo Ungido nos uniu;\nCom a unção do Filho amado,\nEle a todos nós ungiu.",
      "Na unção, em Cristo agora,\nOs ungidos somos Seus;\nTal unguento — oh! que glória —\nSobre os santos se verteu!",
      "Esta unção mui preciosa\nTraz a essência divinal;\nPermanente, prazerosa,\nTudo ensina afinal.",
      "Do Senhor, só, todos somos,\nCom Seu sangue nos comprou;\nEle veio e selou-nos,\nE assim Deus nos marcou.",
      "Dia a dia, sob tal selo,\nComo Cristo vamos ser;\nSua imagem, Seu modelo,\nPoderá em nós se ver.",
      "Antegozo hoje temos;\nBreve, nosso galardão:\nDeus: deleite, gozo pleno,\nEternal celebração.",
      "Deus nos fez com isso em vista,\nConcedeu-nos Seu penhor,\nNossa plena garantia\nDo desfrute do Senhor.",
      "Temos hoje no espír'to\nSelo, unção e o penhor —\nDom excelso, dom bendito\nDo eterno Deus de amor!"
    ]
  },
  "226": {
    "id": "226",
    "numero": 226,
    "titulo": "Como um rio",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Há um rio,\nHá um rio\nQue sai do trono de Deus\nA alcançar\nToda a Terra,\nToda a Terra.",
      "De Seu lado,\nDe Seu lado\nFerido sobre a cruz,\nJesus verteu\nSangue e água,\nSangue e água.",
      "Vida e gozo\nPodemos então desfrutar\nAdentrando,\nMui ousados,\nO Santíssimo.\nAdentrando,\nMui ousados,\nO Santíssimo."
    ],
    "coro": "Esse rio\nAlegra a cidade de Deus,\nA Igreja,\nQue é Seu Corpo,\nSua expressão.\nA Igreja,\nQue é Seu Corpo,\nSua expressão."
  },
  "227": {
    "id": "227",
    "numero": 227,
    "titulo": "Os sete Espíritos",
    "categoria": "Hinário Novo",
    "estrofes": [
      "\"Sete Espíritos\" de Deus —\nEis que a era já mudou;\nCom o Filho, Ele dá,\nÀs igrejas, Seu fulgor.",
      "É o Espír'to sétuplo,\nPois a igreja morta está;\nTodos faz se arrepender,\nPara Cristo os sondar.",
      "Hoje o Espírito de Deus\nQuis intenso se tornar,\nSete vezes, mais e mais,\nPara a igreja saciar.",
      "São os sete Espíritos\nCandelabros a arder;\nPara quentes nos tornar\nE cumprir o que Deus quer.",
      "Estes sete Espíritos,\nCujos olhos a sondar,\nNa igreja nos expõem,\nHão de puros nos tornar.",
      "Sete Espíritos de Deus\nDas igrejas todas são;\nDesfrutemos, povo Seu,\nTal Espír'to em comunhão."
    ],
    "coro": "Vem, ó Sete Espíritos,\nVem, restaura a nós, os Teus!\nQueima e sonda-nos então,\nAs igrejas Tuas são.\nQueima, sonda\nTodo o nosso coração."
  },
  "228": {
    "id": "228",
    "numero": 228,
    "titulo": "Diversos",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Ó Senhor, Espírito,\nRaia em meu íntimo;\nÓ Palavra, luz de Deus,\nDá visão aos olhos meus.",
      "Ó Senhor, Espírito,\nDivinal Amor! Que Tu\nTires o homem natural,\nVis paixões e todo mal.",
      "Ó Senhor, Espírito,\nÓ Poder altíssimo,\nFortalece meu querer\nE me faz por Ti viver.",
      "Ó Senhor, Espírito,\nPaz, Descanso célico,\nTeu sossego, quietação,\nFim de minha agitação.",
      "Ó Senhor, Espírito,\nÓ divino Júbilo,\nNo deserto vou cantar:\n\"Brota, ó Poço\", sem cessar!"
    ]
  },
  "229": {
    "id": "229",
    "numero": 229,
    "titulo": "Diversos",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Ó Senhor, com Tua luz\nNeste pobre ser reluz;\nBane trevas, negridão,\nTorna dia a escuridão.",
      "Ó Senhor, com Teu poder\nVem perdão me conceder;\nO pecado em mim reinou,\nSeu escravo me tornou.",
      "Com Teu gozo divinal\nÀ tristeza põe final;\nManda embora os muitos ais,\nE este pobre ser refaz.",
      "Vem, Espírito, morar,\nNeste pobre ser reinar;\nÓ Senhor, Rei único,\nVence todo ídolo."
    ]
  },
  "230": {
    "id": "230",
    "numero": 230,
    "titulo": "Diversos",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Vês, Senhor, o quanto almeja\nMinha alma Te buscar,\nComo este ser deseja\nO que só Tu podes dar.",
      "Falhas vejo em minha obra,\nTestemunho e viver;\nVida estéril, impiedosa,\nSem louvor a Te render.",
      "Meus pecados e defeitos,\nTe confesso, ó Senhor,\nMinhas falhas que não vejo\nE o orgulho ilusor.",
      "De meu ego, Pai, me salva,\nDo orgulho vão em mim;\nCom Jesus à cruz me leva,\nFaz-me ver que já morri.",
      "Não mais seja minha obra,\nNem saber, poder, amor,\nMas expresse toda hora\nSó a vida do Senhor.",
      "Do Espír'to, a plenitude\nVenha Nele me cobrir.\nEu a outros testemunhe\nRedundando em glória a Ti.",
      "Pai, em Nome de Teu Filho,\nSei, me ouves a oração;\nNa Palavra já me firmo\nE Te rendo gratidão:"
    ],
    "coro": "Busco, sim, busco, sim,\nTeu Espír'to venha a mim."
  },
  "231": {
    "id": "231",
    "numero": 231,
    "titulo": "Diversos",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Do Espírito nascido —\nEis a origem de Jesus;\nTodo cheio do Espír'to —\nEis a essência de Jesus.\nNo Espír'to, com o Espírito,\nPelo Espír'to veio assim;\nHoje Ele é o Espír'to,\nNele somos um enfim.",
      "No Espír'to batizados\nE imersos — que porção!\nDele a igreja foi gerada,\nSem nenhuma tradição!\nNo Espír'to, no Espír'to\nEstejamos, ó irmãos,\nNão em formas, nem ensinos,\nOu doutrinas, credos vãos.",
      "Do Espírito é somente\nNossa rica comunhão;\nSó se ocupam totalmente\nDo Espírito os irmãos.\nO Espír'to nas igrejas\nFala a quem O quer ouvir;\nSete Espír'tos às igrejas:\nQue herança a nossa aqui!",
      "Eis o Espírito e a Noiva\nComo um a proclamar:\n\"Quem tem sede venha agora\nD'água viva se saciar\".\nSer segundo o Espír'to\nDeve ser-nos mui real;\nNas igrejas, é o Espír'to\nA restauração final."
    ]
  },
  "232": {
    "id": "232",
    "numero": 232,
    "titulo": "Amados pelo Senhor",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Do eterno, grande Amor,\nFez-me a Graça alvo ser;\nSeu Espírito o atestou\nE levou-me a perceber.\nOh! perfeita paz real!\nQue deleite tenho eu!\nEm Amor que é sem final,\nEu sou Seu e Ele, meu.",
      "São os céus bem mais azuis,\nE a terra, um verde mar;\nSó quem vive em Jesus\nÉ capaz de contemplar:\nLindos campos a florir,\nPassarinhos pelo céu;\nDesde que um dia vi:\nEu sou Seu e Ele, meu.",
      "Quem roubava minha paz\nNão me ousa perturbar;\nEis-me em Braços eternais,\nEm Seu Seio a descansar.\nQuero aí me restringir,\nRejeitar o que é do eu,\nSua doce Voz ouvir:\nQue sou Seu e Ele, meu.",
      "Seu, só Seu, pra sempre sou:\nDele, quem me levará?\nOh! que gozo superior,\nCristo dentro em mim morar!\nTerra, céus hão de ruir,\nConverter-se alva em breu,\nMas com Deus eis que eu vi\nQue sou Seu e Ele, meu."
    ]
  },
  "233": {
    "id": "233",
    "numero": 233,
    "titulo": "Amados pelo Senhor",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Vinde e vos alegrai!\nPois sempre mendiguei,\nTesouro de amor, porém,\nEterno, encontrei.",
      "Vinde e vos alegrai!\nPois eu estava em dor,\nMas O que me conhece achei,\nE Ele me curou.",
      "Vinde e vos alegrai!\nEm exaustão andei,\nMas Braço em que me apoiar,\nMui forte, encontrei.",
      "Vinde e vos alegrai!\nPois longe vagueei;\nMas houve Alguém que me buscou\nE Nele lar ganhei.",
      "Vinde e vos alegrai!\nTenho um Amigo assim:\nMesmo a sondar meu coração\nMe ama até o fim.",
      "Mesmo sem O amar,\nHá muito me amou;\nTerno e fiel Amor sem par,\nProfundo, com vigor.",
      "Esse Amor provei,\nE Sua voz ouvi,\nMas sem cessar a ouço mais,\nQue gozo e êxtase!"
    ]
  },
  "234": {
    "id": "234",
    "numero": 234,
    "titulo": "Amados pelo Senhor",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Amor tão doce e puro,\nHei sempre de louvar;\nJesus, por mim ferido,\nEm mim veio habitar.\nPaz, vida, concedeu-me,\nCuidado e favor;\nQuão doce o amor de Cristo!\nÉ cada vez melhor.\n\nÉ mais doce Seu amor,\nQue o mel é bem melhor;\nSempre revelou-se\nCada vez mais doce,\nLouvarei Seu doce amor!",
      "Amor profundo e amplo,\nHei sempre de cantar;\nJesus é o mais amável,\nJamais me deixará.\nMelhor que um amigo,\nComigo sempre está;\nAmor tão rico e grande,\nQuem pode mensurar?\n\nÉ mais amplo Seu amor,\nMais profundo, superior;\nÉ imensurável,\nRico, inesgotável.\nLouvarei Seu amplo amor!",
      "Amor suave e firme,\nHei sempre de louvar;\nMais firme que a rocha\nÉ tal Amor sem par.\nHá de passar a terra\nE tudo mudará;\nMas Seu amor não muda,\nJamais acabará.\n\nSeu amor não mudará\nE jamais acabará;\nFirme e eterno,\nPuro e sincero.\nLouvarei Seu forte amor!"
    ]
  },
  "235": {
    "id": "235",
    "numero": 235,
    "titulo": "Amados pelo Senhor",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Ó Jesus! Que Nome\nCheio de dulçor;\nPosso, pobre homem,\nVer o seu valor?",
      "Tinha eu tristeza,\nSó pecado e dor,\nCego à beleza\nDesse Salvador.",
      "Nunca vi que Cristo\nTem amor assim:\nComo sacrifício,\nFoi à cruz por mim.",
      "Foi-me desvendado —\nSou conhecedor\nDesse Nome amado,\nDe Jesus, Senhor.",
      "Minha velha história\nEle converteu,\nPôs-me as culpas fora —\nGlória ao Nome Seu!",
      "Que mercê tão grande;\nTraz-me graça e paz;\nGanha-me, constrange,\nPrisioneiro faz.",
      "Foi Jesus querido\nQuem me quis amar.\nOh! que regozijo\nNeste Nome há!"
    ]
  },
  "236": {
    "id": "236",
    "numero": 236,
    "titulo": "Amados pelo Senhor",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Que Amigo achei! Que Amigo achei!\nHá muito Ele amou-me;\nCom laços de amor, bem sei,\nDe Si aproximou-me;\nMeu coração, com Seu cordão,\nAtou bem apertado,\nPois eu sou Seu, e Ele, meu —\nÉ fato consumado!",
      "Que Amigo achei, leal, fiel!\nSangrou, na cruz salvou-me;\nNão só a mim a vida deu,\nSeu próprio Ser doou-me.\nTudo ao dispor do Doador\nConsagro plenamente;\nMeu coração e vida são\nSó Seus eternamente.",
      "Que Amigo achei, meu Salvador!\nTão terno e verdadeiro,\nQuão eficaz, bom Defensor,\nUm Guia e Conselheiro!\nNão, nada vai me separar\nDe Seu amor ardente,\nNenhum poder, lugar ou ser!\nSou Seu eternamente."
    ]
  },
  "237": {
    "id": "237",
    "numero": 237,
    "titulo": "Amados pelo Senhor",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Que maravilhoso o amor de Jesus por mim,\nTal Graça tão rica me deixa perplexo assim;\nAssombra saber que por mim foi à cruz, se deu,\nPor mim, pecador, padeceu e sangrou, morreu.",
      "Admira-me: Ele Seu trono deixar no céu\nA fim de remir um rebelde tal como eu;\nSeu grande amor estendido a me alcançar,\nCapaz de comprar-me, salvar e justificar.",
      "Seu lado ferido, Seu sangue a jorrar, verter —\nTal Misericórdia e Amor, como esquecer?\nNo trono da graça louvá-Lo vou mais e mais,\nA todo desejo só Ele me satisfaz."
    ],
    "coro": "Maravilhoso é Jesus cuidar de mim,\nNa cruz morrer por mim!\nMaravilhoso é, precioso a mim!"
  },
  "238": {
    "id": "238",
    "numero": 238,
    "titulo": "Amados pelo Senhor",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Com o Jesus, Nazareno,\nEu maravilhado estou:\nAmou a mim, vil, terreno,\nPerdido, réu, pecador!",
      "\"Ó Pai, faz Tua vontade,\nA Minha, não\", Ele orou;\nNão pranteou Seus pesares,\nMas sangue por mim suou.",
      "Os anjos O confortavam\nEm Sua aflição cruel\nQue Ele por minha alma\nÀ noite ali sofreu.",
      "Sim, minhas dores, pecados,\nTomou-os, pois, como Seus;\nLevou o fardo ao Calvário,\nSozinho na cruz morreu.",
      "Com os remidos em glória\nVerei Sua face enfim,\nCantando sempre a história\nDe Seu grande amor por mim."
    ],
    "coro": "Que grande Amor! Que doce Amor!\nSempre vou cantar assim:\nQue grande Amor! Que doce Amor\nTem meu Salvador por mim!"
  },
  "239": {
    "id": "239",
    "numero": 239,
    "titulo": "Amados pelo Senhor",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Que alegria: meu Pai celestial\nMostra na Bíblia o Amor divinal!\nHá neste Livro riquezas sem fim,\nE o mais doce: Jesus me ama, sim!",
      "Posso esquecê-Lo e me afastar,\nMas Ele vem com amor me buscar;\nAo me lembrar que Jesus me amou,\nVolto correndo a Seus braços de amor.",
      "Ele me ama, por mim quis se dar,\nE por amor vir aqui me salvar;\nPor minha causa sofrer numa cruz;\nCreio agora: me ama Jesus.",
      "Posso agora falar deste amor\nMaravilhoso, de grande valor.\nCom Seu Espír'to selou-me na luz\nTestificando: me ama Jesus.",
      "Cheio de paz meu espírito está,\nDe Seu falar não mais vou duvidar;\nFoge o diabo, bem longe de mim,\nQuando lhe digo: Jesus me ama, sim.",
      "Quando, na glória, vir meu grande Rei,\nUma cantiga nos lábios terei;\nE essa eterna canção soará:\n\"Maravilhoso é Jesus me amar\"."
    ],
    "coro": "Alegre estou! Me ama Jesus,\nMe ama, sim, me ama, sim.\nAlegre estou! Me ama Jesus,\nAma até a mim."
  },
  "240": {
    "id": "240",
    "numero": 240,
    "titulo": "Amados pelo Senhor",
    "categoria": "Hinário Novo",
    "estrofes": [
      "Cristo me deu Sua vida,\nEle me alcançou.\nCom Sua misericórdia,\nEle me perdoou.",
      "Cristo levou minhas dores,\nLágrimas me enxugou.\nCom Sua infinita graça\nEle me transformou.",
      "Hoje, descanso em Seu peito,\nFirme nos braços Seus.\nE ao invocar Seu nome\nSalvo estou, em Deus.",
      "Não vivo mais em mim mesmo,\nVivo em Seu amor.\nMeus planos e meus desejos\nConfio ao Senhor."
    ],
    "coro": "Amou-me como eu estava,\nNenhuma exigência me fez;\nTirou meus muitos pecados,\nVenceu toda minha altivez."
  }
};

Object.assign(data.novo, novosHinos);

fs.writeFileSync(hinosPath, JSON.stringify(data, null, 2), 'utf8');
console.log('Successfully added hymns 221 to 240!');
console.log('Total hymns in novo:', Object.keys(data.novo).length);
