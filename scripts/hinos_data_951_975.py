# -*- coding: utf-8 -*-
import json
import re

HINOS_951_975 = {
    "951": {
        "id": "951",
        "numero": 951,
        "titulo": "Clamar ao Senhor",
        "categoria": "Hinário Novo",
        "estrofes": [
            "Socorre-me, Jesus, porque,\nSenão, eu hei de perecer;\nTens salvação a oferecer —\nMe salva como sou!",
            "Por mim tão vil e pecador\nSangraste lá na cruz, Senhor;\nTransforma este malfeitor —\nMe salva como sou!",
            "Que poderei oferecer?\nSou incapaz de o bem fazer,\nMas, por Teu nome de poder,\nMe salva como sou.",
            "Eis-me a Teus pés, ó Salvador,\nConcede-me de Teu favor,\nEm mim dá fim a Teu labor,\nMe salva como sou."
        ],
        "coro": "Me salva como sou!\nMe salva como sou!\nCom Teu poder, amor, mercê,\nMe salva como sou!"
    },
    "952": {
        "id": "952",
        "numero": 952,
        "titulo": "Clamar ao Senhor",
        "categoria": "Hinário Novo",
        "estrofes": [
            "Carinhoso Salvador,\nQuero a Ti me aconchegar;\nNegras ondas de terror\nAmeaçam-me tragar.\nMeu Abrigo e Proteção\nDa tormenta a me acossar,\nMinha pobre embarcação\nFaz segura atracar.",
            "Outro abrigo, sei, não há,\nSem amparo venho a Ti;\nMe sustém, consolo dá,\nNão me deixes só, aqui.\nSó em Ti, meu Protetor,\nConfiança plena pus;\nCobre-me com Teu amor —\nIndefeso estou, Jesus.",
            "Quanto posso carecer\nAcho em Ti, e muito mais;\nSe cair, me pões em pé,\nMeu gozo, cura e paz.\nJusto e santo é o nome Teu,\nInjustiça apenas sou;\nPecador e vil sou eu,\nÉs verdade, graça, amor.",
            "Essa graça, à qual eu vim\nMeus pecados entregar,\nVenha, em jorros sobre mim,\nPuro e santo me tornar.\nBusco a vida em Ti beber,\nÓ Nascente divinal;\nE farás brotar em mim\nViva fonte perenal."
        ]
    },
    "953": {
        "id": "953",
        "numero": 953,
        "titulo": "Clamar ao Senhor",
        "categoria": "Hinário Novo",
        "estrofes": [
            "Rocha eterna, singular,\nTe fendeste em meu lugar;\nDe Teu lado a fluir,\nSangue e água possam vir\nDupla cura me trazer\nDo pecado e seu poder.",
            "O labor de minhas mãos\nNão me compra a salvação;\nNem esforço, nem fervor,\nNem constante pranto ou dor\nVai pecado apagar;\nSó Tu podes me salvar.",
            "Nada trago a Ti, Jesus,\nMe apego à Tua cruz;\nNu estou, me veste aqui;\nDesvalido, venho a Ti;\nA tal fonte correrei,\nOh! me lava, ou morrerei!",
            "Quando a morte enfrentar\nE meus olhos eu fechar,\nQuando aos ares eu subir\nE Teu rosto em glória vir,\nRocha eterna, singular,\nQuero em Ti me abrigar."
        ]
    },
    "954": {
        "id": "954",
        "numero": 954,
        "titulo": "Clamar ao Senhor",
        "categoria": "Hinário Novo",
        "estrofes": [
            "Junto à cruz almejo estar,\nOnde rica fonte\nCorre franca, salutar,\nDo Calvário, monte.",
            "Junto à cruz e em tremor,\nGraça eterna achou-me;\nLá a Estrela da Manhã\nRaios seus mandou-me.",
            "Desta cruz, ó Salvador,\nSempre vem lembrar-me;\nDela à sombra, meu Senhor,\nQueiras abrigar-me.",
            "Junto à cruz a vigiar,\nMui fiel espero,\nTé Teu rosto contemplar,\nEm Teu reino eterno!"
        ],
        "coro": "Sim, na cruz, só na cruz,\nDevo gloriar-me;\nDela nada e ninguém\nHá de apartar-me."
    },
    "955": {
        "id": "955",
        "numero": 955,
        "titulo": "Clamar ao Senhor",
        "categoria": "Hinário Novo",
        "estrofes": [
            "Tu deixaste, Senhor,\nTua glória, esplendor,\nQuando ao mundo quiseste descer;\nNão puderam achar\nEm Belém um lugar,\nNum estábulo foste nascer.",
            "Desfrutavas nos céus\nEntre os anjos de Deus\nHonra, glória e adoração;\nMas quiseste, Jesus,\nUma vida de cruz,\nEntre os homens, em humilhação.",
            "Têm covis para si\nAs raposas aqui,\nE seus ninhos as aves dos céus;\nSó não teve lugar\nOnde se reclinar\nJesus Cristo, o Filho de Deus.",
            "Com amor singular\nNos vieste salvar,\nTrazendo vida eterna e luz;\nMas com ódio cruel,\nCom espinhos, com fel,\nTe levaram à morte na cruz.",
            "Oh! que gozo nos céus\nEntre as hostes de Deus,\nQuando em glória Teu Pai eu vir;\nHei de, alegre, escutar\nTua voz me chamar:\n\"Vem, Eu tenho lugar para ti!\""
        ],
        "coro": "A meu coração, vem, Cristo!\nNele há para Ti lugar;\nA meu coração, vem, ó Senhor!\nNele há para Ti lugar."
    },
    "956": {
        "id": "956",
        "numero": 956,
        "titulo": "Clamar ao Senhor",
        "categoria": "Hinário Novo",
        "estrofes": [
            "Em meu coração faz morada,\nEu clamo a Ti, Senhor;\nEm meu coração faz morada,\nCansado demais estou.",
            "Em meu coração mui amargo\nVem hoje, Senhor, entrar;\nTem fardo pesado o pecado —\nFaz meu coração Teu lar.",
            "Em meu coração, hoje, entra,\nMe limpa e também traz luz;\nTeu rico Espír'to me encha,\nA me governar, Jesus."
        ],
        "coro": "Faz, ó Senhor, faz, ó Jesus,\nEm meu coração morada!\nVem! Entra em mim e faz, assim,\nEm meu coração morada!"
    },
    "957": {
        "id": "957",
        "numero": 957,
        "titulo": "Confiar no Senhor",
        "categoria": "Hinário Novo",
        "estrofes": [
            "Vou a Tua cruz, Senhor,\nPobre, frágil, sem visão;\nTudo o mais não tem valor,\nE acho plena salvação.",
            "Suspirava eu por Ti,\nMas morava em mim o mal;\n\"Teus pecados vou remir\",\nHoje falas afinal.",
            "Dou-Te tudo o que é meu —\nTempo, amigos, bens também,\nAlma e corpo sejam Teus —\nPara todo o sempre, amém!",
            "Nas promessas hoje cri,\nE Teu sangue me lavou;\nPois já me arrependi,\nE, na cruz, Contigo estou."
        ],
        "coro": "Eu confio em Ti, Jesus,\nE me prostro sob a Cruz;\nÓ Cordeiro Redentor,\nSalva este pecador!"
    },
    "958": {
        "id": "958",
        "numero": 958,
        "titulo": "Confiar no Senhor",
        "categoria": "Hinário Novo",
        "estrofes": [
            "Cristo, em Ti confio\nCom meu coração,\nMesmo réu, perdido,\nE me tornas são.\nQuem, no céu, na terra,\nQuem mais tenho eu?\nPelos pecadores,\nÉs o que morreu.",
            "Cristo, em Ti confio,\nFoi Teu proceder\nDias bem vividos\nEm amor, mercê.\nNunca um leproso\nNem um pecador\nFoi-Te asqueroso —\nOh! Que Salvador!",
            "Cristo, em Ti confio,\nNa Palavra aqui,\nSem ter meu ouvido\nEscutado a Ti.\nDoce é Teu ensino,\nDoce a cada vez!\nMui atento ouvi-lo\nQuero a Teus pés.",
            "Cristo, em Ti confio;\nDuvidar? Jamais!\nQuem vai ter Contigo,\nNão rejeitarás.\nAs fiéis promessas,\nSangue remissor —\nGarantias essas\nDás, ó Salvador!"
        ],
        "coro": "Cristo, em Ti confio\nCom meu coração,\nMesmo réu, perdido,\nE me tornas são."
    },
    "959": {
        "id": "959",
        "numero": 959,
        "titulo": "Testemunho",
        "categoria": "Hinário Novo",
        "estrofes": [
            "É bom contar a história\nDa graça superior,\nDe Cristo e Sua glória,\nDe Cristo e Seu amor.\nÉ bom contar a história,\nPois sei que é veraz;\nSacia-me, renova,\nQual nada mais o faz.",
            "É bom contar a história\nMais bela que escutei,\nBem mais formosa e áurea\nQue tudo o que sonhei.\nÉ bom contar a história\nQue tanto fez por mim;\nPor isso quero agora\nContá-la para ti.",
            "É bom contar a história\nTão cheia de dulçor,\nPois quanto mais se conta,\nMelhor é seu sabor.\nEm tal história bela,\nPõe tua atenção;\nA Bíblia nos revela\nEterna salvação.",
            "É bom contar a história;\nPois quem a sabe bem\nParece que, de ouvi-la,\nMais fome e sede tem.\nE quando, enfim, na glória,\nEu, novo som, cantar,\nSerá a mesma história\nQue há tempos pude amar."
        ],
        "coro": "É bom contar a história —\nMeu tema lá na glória\nA mesma e terna história\nDe Cristo e Seu amor."
    },
    "960": {
        "id": "960",
        "numero": 960,
        "titulo": "Testemunho",
        "categoria": "Hinário Novo",
        "estrofes": [
            "Salvação grandiosa!\nSalvação grandiosa!\nSalvação grandiosa,\nCristo, pois, me dá!",
            "Os pecados perdoou-me!\nDos grilhões libertou-me!\nSua paz inundou-me!\nCristo me salvou!",
            "Nem o mal, nem pecado,\nNem diabo e seus dardos,\nNem do mundo os agrados\nPodem me deter.",
            "Cantarei: \"Aleluia!\"\nCantarei: \"Aleluia!\"\nCantarei: \"Aleluia!\"\nCristo me salvou!"
        ],
        "coro": "Os grilhões, Cristo rompe!\nOs grilhões, Cristo rompe!\nOs grilhões, Cristo rompe!\nJá me libertou!"
    },
    "961": {
        "id": "961",
        "numero": 961,
        "titulo": "Testemunho",
        "categoria": "Hinário Novo",
        "estrofes": [
            "À cruz em que meu Jesus morreu,\nOnde clamei o favor de Deus,\nPor meu pecado Seu sangue deu —\nGlória ao Salvador!",
            "Junto ao madeiro me aceitou,\nDo meu pecado já me salvou,\nMui docemente em mim entrou —\nGlória ao Salvador!",
            "Fonte preciosa a me salvar,\nNela Jesus vem-me branquear;\nEis-me alegre por nela entrar!\nGlória ao Salvador!",
            "Vem a tal fonte de redenção,\nProstra-te a Ele em sujeição,\nHoje mergulha e te torna são;\nGlória ao Salvador!"
        ],
        "coro": "Glória ao Salvador!\nGlória ao Salvador!\nPor meu pecado Seu sangue deu —\nGlória ao Salvador!"
    },
    "962": {
        "id": "962",
        "numero": 962,
        "titulo": "Testemunho",
        "categoria": "Hinário Novo",
        "estrofes": [
            "Houve Alguém decidido, por mim, a morrer\nE minh'alma indigna salvar;\nQue o caminho da cruz se dispôs a correr\nPara meus vis pecados perdoar.",
            "É amável, paciente, com grande mercê\nLimpa todo o meu interior;\nNão mais condenação; livre estou, sei, porque\nMeus pecados na cruz carregou.",
            "Vou a Cristo apegar-me, deixá-Lo jamais —\nSempre sigo alegre e fiel,\nCanta meu coração e meus lábios joviais:\nMeus pecados Jesus removeu!"
        ],
        "coro": "Carregou-os na cruz,\nCarregou-os na cruz,\nQuanto Ele por mim suportou!\nQue angústia Jesus\nPadeceu indo à cruz,\nE ali meus pecados levou!"
    },
    "963": {
        "id": "963",
        "numero": 963,
        "titulo": "Testemunho",
        "categoria": "Hinário Novo",
        "estrofes": [
            "Buscou-me com ternura,\nJesus, o bom Pastor;\nDe volta à grei segura\nNos ombros me levou,\nEnquanto a uma voz nos céus\nSe alegravam anjos Seus.",
            "Com vinho e azeite\nAs chagas me envolveu;\nE segredou-me: \"Achei-te,\nDe hoje em diante és Meu.\"\nTão meiga voz jamais ouvi,\nPrazer maior jamais senti!",
            "Mostrou-me as Mãos e o Lado\nQue em meu lugar sangrou,\nE a Fronte coroada\nDe escárnio e de dor;\nQue poderia em mim achar,\nFazê-Lo afrontas suportar?",
            "Minh'alma embevecida,\nSeu rosto a contemplar,\nRecorda as bênçãos vindas\nDe Seu amor sem par.\nLouvor e glória e adoração\nTributa-Lhe meu coração.",
            "Enquanto vão-se as horas,\nDesfruto paz real,\nAté surgir aurora\nMelhor, mais fulgural;\nE para Si nos tomará,\nQual Noiva nos desposará."
        ],
        "coro": "Oh! que amor grandioso!\nSangue precioso!\nInaudita graça me mostrou,\nE a Seu rebanho me levou."
    },
    "964": {
        "id": "964",
        "numero": 964,
        "titulo": "Testemunho",
        "categoria": "Hinário Novo",
        "estrofes": [
            "Naufragado pecador,\nLonge do firme chão,\nJá me achava sem vigor,\nNo desespero vão;\nO Senhor do mar me viu,\nMe estendeu a Mão\nE salvar-me conseguiu\nDa perdição.",
            "Minha vida, todo o ser,\nQuero Lhe consagrar;\nA Seu lado vou viver,\nE Seu amor cantar,\nA mensagem transmitir\nAos que perdidos são\nE a meu Senhor servir\nCom gratidão.",
            "Tu que estás a soçobrar\nNas ondas de terror,\nCristo pode te salvar\nPor Seu imenso amor.\nEle, o Senhor do mar,\nQue amansa os vagalhões,\nQuer agora te livrar,\nDar salvação."
        ],
        "coro": "Cristo me amou\nE me livrou;\nCom Seu imenso amor\nMe resgatou!\nPor Seu poder\nE Seu querer;\nCristo, meu Salvador,\nMe resgatou!"
    },
    "965": {
        "id": "965",
        "numero": 965,
        "titulo": "Testemunho",
        "categoria": "Hinário Novo",
        "estrofes": [
            "Cristo acolhe o pecador;\nSua graça vou pregar\nPara quem se transviou,\nE em pecado e morte está.",
            "Vem, descanso te dará;\nCrê, confia no Senhor;\nReceber-te Ele irá;\nCristo acolhe o pecador.",
            "Não há mais condenação,\nEis-me puro ante a lei;\nExigência dela, então,\nCristo há muito satisfez.",
            "Cristo acolhe o pecador,\nMesmo a mim, que só pequei;\nRugas, manchas me tirou,\nE na glória entrarei."
        ],
        "coro": "Mais e mais eu vou cantar:\nCristo acolhe o pecador!\nCom fervor a proclamar:\nCristo acolhe o pecador!"
    },
    "966": {
        "id": "966",
        "numero": 966,
        "titulo": "Testemunho",
        "categoria": "Hinário Novo",
        "estrofes": [
            "Tocou-Lhe a veste a mulher\nPor entre a multidão,\nApenas Lha tocou com fé,\nCurada foi então.",
            "Poder tem Ele e é bom;\nVai, toca-O também,\nPor entre esta multidão,\nE Seu poder te vem.",
            "Tocando-O em fé e espírito,\nCurado ficarás;\nHá de te encher de júbilo,\nDe excedente paz."
        ],
        "coro": "Só toca, toca-Lhe as vestes!\nSê livre de teu mal!\nPor Seu poder vais renascer\nDa vida eternal!"
    },
    "967": {
        "id": "967",
        "numero": 967,
        "titulo": "O Senhor batendo à porta",
        "categoria": "Hinário Novo",
        "estrofes": [
            "Bate, bate, quem será?\nSempre, sempre, sempre lá.\nUm Estranho majestoso,\nNunca O viste, sem igual;\nAh! minh'alma, não te apressas\nEm abrir-Lhe teu portal?",
            "Bate, bate, quem será?\nSempre, sempre, sempre lá.\nEmperrada e rija a porta,\nMui custosa de abrir,\nPois pecados arraigados\nTeimam sempre em resistir.",
            "Bate, bate, quem será?\nSempre, sempre, sempre lá.\nBate sempre a Mão ferida\nCom paciente, grande amor;\nTeu descuido lastimando,\nInda espera o Salvador."
        ]
    },
    "968": {
        "id": "968",
        "numero": 968,
        "titulo": "Não há quem se compare a Jesus",
        "categoria": "Hinário Novo",
        "estrofes": [
            "Não há quem se compare a Jesus!\nNão há quem se compare a Jesus!\nNão há quem se compare a Jesus!\nNão há! Não há! Não há!",
            "Procurei e não achei!\nApalpei e não achei!\nGirei, girei, e não achei!\nNão há! Não há! Não há!",
            "Invoquei e achei!\nInvoquei e achei!\nInvoquei e achei!\nAchei! Achei! Achei!"
        ]
    },
    "969": {
        "id": "969",
        "numero": 969,
        "titulo": "Diversos",
        "categoria": "Hinário Novo",
        "estrofes": [
            "Conta-me a velha história\nDa graça superior,\nDe Cristo e Sua glória,\nDe Cristo e Seu amor;\nCom simples narrativa,\nQual conto infantil,\nTrazendo expectativa\nA mim, cansado e vil.",
            "Conta-me bem pausado\nDe Sua salvação,\nDa cura do pecado,\nPerfeita redenção;\nConta de novo agora,\nPois esquecido sou,\nO orvalho da aurora\nSe vai ao vir o sol.",
            "Conta-me com ternura\nQue veio o Salvador\nTirar da desventura\nA mim, um pecador.\nSempre me conta a história\nD'amor e salvação,\nPois ela me consola\nEm tempos d'aflição.",
            "Conta-me a velha história\nSe parecer a ti\nQue a vã, mundana glória\nLogrou me distrair.\nE quando Sua glória\nEm mim se revelar,\nRecorda a velha história:\nJesus me quis salvar."
        ],
        "coro": "Conta-me a velha história,\nVelha e sublime história!\nConta-me a mesma história\nDe Cristo e Seu amor."
    },
    "970": {
        "id": "970",
        "numero": 970,
        "titulo": "Diversos",
        "categoria": "Hinário Novo",
        "estrofes": [
            "Oh! Mostra-me o sentido\nDe a Cruz erguida ser\nCom o Homem — réu — de Dores,\nFadado a morrer.\nCustou-Te um preço infindo\nSalvar um pecador;\nOh! Mostra-me, ó Cristo,\nDe um homem, o valor.",
            "Oh! Mostra-me o sentido\nDa fonte carmesim,\nCom sangue e água vindos\nDo lado Teu por mim.\nTivesse eu pecado,\nSó eu, Senhor Jesus,\nVirias inda, Amado,\nMorrer em uma cruz.",
            "Oh! Mostra-me o sentido\nDe Teu amor sem par,\nProfundo, desmedido,\nA alma a animar.\nSim, mostra-me, Te peço,\nTé o coração poder\nQual pálido reflexo\nDe Teu amor arder.",
            "Oh! Mostra-me o sentido,\nPois sou um pecador;\nTem Graça me atingido\nE me vencido o Amor.\nQue outra esperança,\nSem Ti, possuo eu,\nPior dos pecadores\nPor quem Jesus morreu?",
            "Oh! Mostra-me o sentido\nDe Tua paz que vem\nA todo oprimido\nQue crê e vida tem.\nEmbora um rebelde,\nPerdão já recebi,\nPorque assim me pedes,\nEu posso crer, e cri.",
            "Ó Redentor eterno,\nQue mais Te vou pedir?\nPor Teu convite terno,\nEntrego-me a Ti.\nPorque me aceitas, dou-Te\nAmor e adoração,\nPor Teu amor tão forte,\nPerpétua admiração."
        ]
    },
    "971": {
        "id": "971",
        "numero": 971,
        "titulo": "Diversos",
        "categoria": "Hinário Novo",
        "estrofes": [
            "Noventa e nove ovelhas há,\nSeguras no redil;\nMas uma veio a desgarrar\nEm trevas e no frio;\nPor ermos montes vagueou\nDistante do fiel Pastor,\nDistante do fiel Pastor.",
            "\"Com tantas outras, bom Pastor,\nNão te contentarás?\"\nResponde Ele com amor:\n\"Pertence-Me a fugaz.\nPor toda a parte a buscarei\nE Minha ovelha encontrarei,\nE Minha ovelha encontrarei.\"",
            "Nenhum remido imaginou\nQuão negra escuridão\nQue Ele experimentou\nTrazendo a salvação.\nE, quando foi a socorrer,\nEstava ela a perecer,\nEstava ela a perecer.",
            "\"Na senda donde vens, Senhor,\nQue sangue enxergo ali?\"\n\"O sangue que, com todo amor,\nPor ela Eu verti.\"\n\"Por que feridas tens nas Mãos?\"\n\"Sinais dos cravos de aflição,\nSinais dos cravos de aflição.\"",
            "Nos montes gritos triunfais —\nÉ o Pastor da grei:\n\"Comigo vos regozijai,\nPois Minha ovelha achei!\"\nE os anjos cantam lá nos céus:\n\"Deus traz de volta os que são Seus,\nDeus traz de volta os que são Seus!\""
        ]
    },
    "972": {
        "id": "972",
        "numero": 972,
        "titulo": "Diversos",
        "categoria": "Hinário Novo",
        "estrofes": [
            "Se eu conquistar o mundo inteiro\nE abandonar o Salvador,\nComo achar a paz, descanso pleno,\nNo que é fugaz tal qual a flor?\nSem o Salvador, acaso é ganho\nNisso meu vigor eu empregar?\nGozo terrenal, prazer mundano,\nNunca ao de Jesus se igualará.",
            "De que vale ter amor, amigos,\nAbundantes bens e distinção,\nSem o que esperar e sem abrigo\nPara minha nau em aflição?\nSe o mundo eu ganhar sem Cristo,\nQue na cruz morreu por me salvar,\nQue refúgio me seria isso\nPara d'aflição eu escapar?",
            "Sem o Salvador, há só vaidade,\nEm pecados, em tristeza e ais,\nE é escuridão a eternidade,\nNoite e pranto que não findam mais!\nSem o Salvador, se em vaidade,\nQuando a hora der de eu partir,\nComo encarar a eternidade\nE o sombrio val lá no porvir?",
            "Tudo em Cristo há — oh! que riqueza!\nOh! que bálsamo ao coração!\nHá tristeza que Jesus não veja,\nOu pecado que não dê perdão?\nSe eu tiver Jesus, Jesus apenas,\nNeste mundo vão e nada mais,\nCoisas grandes e também pequenas\nEle proverá e muito mais."
        ]
    },
    "973": {
        "id": "973",
        "numero": 973,
        "titulo": "Diversos",
        "categoria": "Hinário Novo",
        "estrofes": [
            "Uma fonte almejava\nPara a sede satisfazer;\nAo beber de muitas fontes,\nNada pôde me preencher.\nMas um dia encontrei\nQuem pôde me saciar;\nE uma fonte em mim tornou-se,\nSempre a jorrar.\nDele bebo!\nÉ Jesus a minha vida,\nPlenamente me saciou;\nÉ Ele minha vida,\nSatisfeito hoje estou.",
            "Ao provar tal rica fonte,\nQuis com outros O adorar;\nCristo, em visão, mostrou-me\nQue a igreja é tal lugar.\nÀ igreja me levou,\nNão vou mais procurar,\nPois encontrei tal gozo eterno —\nEste é meu lugar.\nAleluia!\nMeu viver é a igreja,\nPlenamente me saciou;\nVivendo na igreja,\nSatisfeito hoje estou.",
            "Tu, que tanto te empenhas,\nVale a pena assim buscar?\nBasta abrir teu ser a Ele,\nClama a Cristo, que entrará.\nSe invocares: \"Ó Senhor!\",\nEnfim O acharás;\nCom Ele unido em Sua vida,\nNovo então serás.\nQue me dizes?\nÉ Jesus a tua vida\nQue desfrute pleno traz?\nÉ Ele tua vida?\nSatisfeito hoje estás?"
        ]
    },
    "974": {
        "id": "974",
        "numero": 974,
        "titulo": "Diversos",
        "categoria": "Hinário Novo",
        "estrofes": [
            "\"Provai e vede que o Senhor é bom\";\n\"Provai e vede que o Senhor é bom\".\nEle é bom pra mim, para ti também;\nQue irás fazer? Só provar e ver!",
            "Se O invocares, salvo então serás;\nSe O invocares, salvo então serás.\nGraça sem igual, vida eternal\nEle vai-te dar — é só invocar.",
            "O amor genuíno provarás enfim;\nO amor genuíno provarás enfim.\nTu irás sentir Deus de ti fluir,\nE conhecerás tal amor veraz.",
            "Agora O louva! Cristo está em ti!\nSim, hoje O louva! Cristo está em ti!\nO espír'to teu o Senhor encheu,\nEia, com fervor, louva ao Senhor!"
        ]
    },
    "975": {
        "id": "975",
        "numero": 975,
        "titulo": "Diversos",
        "categoria": "Hinário Novo",
        "estrofes": [
            "Sabes: foste escolhido\nAntes mesmo de nascer\nE por Deus já incumbido\nDe Seu plano perfazer?\nAlgo o atesta fortemente\nDentro de teu coração;\nEis porque estás presente\nHoje a esta reunião.",
            "Cada um de teus pecados,\nObras feitas sem a luz,\nFoi por Deus já perdoado\nPelo sangue de Jesus.\nNão te esforces, mas crê Nele\nE no que na Bíblia lês;\nGrato apenas deves ser-Lhe,\nPelo que por ti já fez.",
            "Sabes que a Bíblia toda\nTestamento é, fiel?\nSim, de Cristo, toda obra\nVisa a quem de Deus nasceu.\nComo filho, és incluído,\nTe garante Seu falar;\nE, de Deus, os benefícios\nPodes pela fé herdar.",
            "Sabes que Deus tem família? —\nSomos nós, os filhos Seus —\nQue desfruta em harmonia\nTodo o rico Ser de Deus.\nEle é Deus e nós, Seu povo,\nCresce, a Ele, nosso amor;\nTodos gratos, jubilosos,\nVamos dar-Lhe mais louvor.",
            "Só sabemos que O amamos,\nSua obra é incomum;\nDele já nos acercamos\nE, alegres, somos um.\nQue alegria, incluídos,\nComunhão há com os Céus!\nVem, amigo, sê bem-vindo\nÀ família, lar de Deus."
        ]
    }
}
