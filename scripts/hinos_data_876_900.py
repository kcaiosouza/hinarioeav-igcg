# -*- coding: utf-8 -*-
import json
import re

HINOS_876_900 = {
    "876": {
        "id": "876",
        "numero": 876,
        "titulo": "Vem reinar",
        "categoria": "Hinário Novo",
        "estrofes": [
            "Saudai o grande Ungido,\nO Filho de Davi,\nNo tempo escolhido,\nSeu reino trouxe aqui!\nVem pôr em liberdade\nQuem jaz em aflição,\nReger com equidade,\nBanir a transgressão.",
            "Virá em abundância,\nQual chuva a cair,\nAmor e esperança\nQuais flores vão florir;\nAdiante Dele os montes\nAo povo paz trarão;\nE, de justiça, as fontes\nNos vales jorrarão.",
            "A Ele reis se prostrem,\nPresentes a trazer,\nE todos O adorem,\nLouvor, a Lhe render;\nSerá Seu poderio\nEm rios, terra e mar,\nMais alto e mais longínquo\nQue a águia possa alçar.",
            "Por Ele de contínuo\nA oração será;\nAumenta Seu domínio,\nSem fim, de mar a mar.\nOs cereais ondulem,\nAbundem té os céus;\nQual erva, que pululem\nOs habitantes Seus.",
            "Vencendo aos adversários,\nAo Trono Se erguerá,\nE Bem-aventurado\nNações Lhe vão chamar;\nAliança tal, perene,\nJamais se vai depor;\nSubsista para sempre\nSeu Nome de Amor."
        ]
    },
    "877": {
        "id": "877",
        "numero": 877,
        "titulo": "Preparar-se para a volta de Cristo",
        "categoria": "Hinário Novo",
        "estrofes": [
            "Próximo o fim já está,\nBreve o Senhor voltará;\nProntos devemos ficar —\nOh! vem Jesus outra vez!",
            "Vamos o ego deixar,\nPara Jesus sempre olhar;\nJá não há tempo a gastar —\nOh! vem Jesus outra vez!",
            "Néscias não vão se volver,\nMas só no fim aprender:\nÓleo faltou para arder —\nOh! vem Jesus outra vez!",
            "Virgens prudentes aqui\nNunca se vão distrair,\nMas no Espír'to luzir —\nOh! vem Jesus outra vez!",
            "Vamos azeite obter,\nNossas vasilhas encher,\nLâmpadas ter a arder —\nOh! vem Jesus outra vez!",
            "Cristo a caminho está,\nVamos então vigiar,\nSua presença buscar —\nOh! vem Jesus outra vez!"
        ],
        "coro": "Vem outra vez, vem outra vez,\nPassa o tempo veloz,\nMeia-noite ressoa a voz;\nVem outra vez, vem outra vez!\nVirgens prudentes nós temos de ser!\nOh! vem Jesus outra vez!"
    },
    "878": {
        "id": "878",
        "numero": 878,
        "titulo": "Preparar-se para a volta de Cristo",
        "categoria": "Hinário Novo",
        "estrofes": [
            "Jesus virá; o prazo se abrevia,\nJamais deixeis as horas escoar!\nSenhor, nos faz alertas por Teu dia,\nPossamos bem o tempo aproveitar.\nAo vir Jesus, quem vai a Seu encontro?\nAo vir Jesus, o ego bem negou?\nVirá buscar os que estiverem prontos,\nQueremos ser inscritos nesse rol.",
            "Senhor, nos faz remir preciosas horas,\nNa alma pôr azeite até encher;\nDizer \"amém\" às lutas e às provas,\nQue possa Teu amor em nós crescer.\nJesus virá — agora é tempo ainda\nDe óleo na vasilha armazenar;\nTribulações e provas são bem-vindas,\nPor elas nós havemos de reinar.",
            "Senhor, desfaz prazeres vãos da alma,\nQueremos ver Teu rosto de dulçor,\nPerseverar até surgir a alva\nE Te encontrar, ó Noivo de amor.\nAo vir Jesus, diante Dele iremos?\nHavemos de Seu rosto contemplar?\nInsensatez, preguiça, rejeitemos!\nBusquemos mais com Ele sempre estar.",
            "Saiamos, pois, ao Noivo, em vigília,\nCom lâmpadas brilhantes a queimar,\nPorque contêm azeite as vasilhas,\nSatisfação completa haverá.\nSatisfação têm Cristo e a Noiva,\nSatisfação por eras eternais!\nQue graça, paz, amor e alegria\nA Noiva ser nas Bodas celestiais!"
        ]
    },
    "879": {
        "id": "879",
        "numero": 879,
        "titulo": "Preparar-se para a volta de Cristo",
        "categoria": "Hinário Novo",
        "estrofes": [
            "Temos óleo nas lâmpadas hoje,\nNosso espírito queimando está;\nOh! nos volta, Senhor, ao espírito,\nNele faz-nos todo o tempo estar.",
            "Aleluia! Aleluia!\nNosso espírito queimando está!\nAleluia! Aleluia!\nNele faz-nos sempre estar!",
            "Mas também, nas vasilhas, azeite\nHoje temos de armazenar,\nPara as lâmpadas, té Tua volta,\nNunca virem a se apagar.",
            "Vem encher-nos! Vem encher-nos!\nCada dia dá-nos mais de Ti.\nVem encher-nos! Vem encher-nos!\nNós queremos mais de Ti.",
            "Queimaremos até que retornes,\nTé tal dia glorioso vir;\nPara as bodas iremos Contigo,\nLá, pra sempre vamos refulgir.",
            "Ó Senhor, vem! Ó Senhor, vem!\nNos encontra plenos, a brilhar;\nÓ Senhor, vem! Ó Senhor, vem!\nTua noiva desposar!"
        ]
    },
    "880": {
        "id": "880",
        "numero": 880,
        "titulo": "Preparar-se para a volta de Cristo",
        "categoria": "Hinário Novo",
        "estrofes": [
            "Sabes quando a Noiva isto ouvirá:\n\"Chegou, chegou o Noivo!\"?\nGrito de triunfo logo soará:\n\"Chegou, chegou o Noivo!\"",
            "Lâmpada tens limpa, deixas refulgir?\n\"Chegou, chegou o Noivo!\"\nArmazena óleo, pois irás ouvir:\n\"Chegou, chegou o Noivo!\"",
            "Deixas a Palavra sempre te lavar?\n\"Chegou, chegou o Noivo!\"\nLimpa-te das manchas antes de escutar:\n\"Chegou, chegou o Noivo!\"",
            "Tu és para Cristo complemento e par?\n\"Chegou, chegou o Noivo!\"\nOra te prepara para O desposar:\n\"Chegou, chegou o Noivo!\"",
            "Linho resplendente, puro vestirás?\n\"Chegou, chegou o Noivo!\"\nAtos de justiça tem, e subirás:\n\"Chegou, chegou o Noivo!\"",
            "Bradam o Espír'to e a Noiva assim:\n\"Chegou, chegou o Noivo!\"\nHoje Suas bodas podem ser enfim!\n\"Chegou, chegou o Noivo!\""
        ],
        "coro": "Já podemos Sua glória antever,\nCada dia está mais perto o amanhecer,\nForte brado faz o coração bater:\n\"Chegou, chegou o Noivo!\""
    },
    "881": {
        "id": "881",
        "numero": 881,
        "titulo": "Preparar-se para a volta de Cristo",
        "categoria": "Hinário Novo",
        "estrofes": [
            "Talvez de manhã, quando o dia começa,\nOu na reunião da igreja aconteça;\nÉ certo, irmãos, o Espírito atesta:\nJesus brevemente virá!",
            "Os dias se vão — néscios não nos tornemos;\nEm cada ocasião, vigiemos e oremos,\nE, com gratidão, sempre nos alegremos —\nAssim vamos Cristo saudar.",
            "Jesus descerá, inesperadamente,\nAos Seus voltará em fulgor resplendente.\nQual Noivo virá para Sua Nubente,\nEnfim, a tomar para Si!",
            "Que gozo e dulçor finalmente encontrá-Lo!\nÉ nosso Amor — que deleite saudá-Lo!\nVai nosso Senhor, Vida, Noivo, Amado\nTomar Sua Noiva pra Si!"
        ],
        "coro": "Ó Senhor, logo vens, e então\nSoará o refrão:\n\"Cristo volta! Aleluia!\nAleluia! Amém!\nAleluia! Amém!\""
    },
    "882": {
        "id": "882",
        "numero": 882,
        "titulo": "O dia das bodas",
        "categoria": "Hinário Novo",
        "estrofes": [
            "Oh! Exultemos! Brevemente,\nNosso Noivo voltará;\nEm Suas bodas excelentes\nHaveremos de estar.",
            "Remir os dias nós devemos,\nMais azeite conseguir,\nE as vasilhas preenchamos\nTé o grito se ouvir!",
            "Que grande gozo preparar-nos\nPara esta união,\nEmbora dores mil soframos\nPor ganhar tal galardão!",
            "Em êxtase, com alegria,\nVão as bodas começar;\nSim, por mil anos, não um dia,\nNós e o Noivo festejar."
        ],
        "coro": "Oh! Que manhã! Glorioso dia\nQuando Cristo, enfim, vier;\nTeremos cheias as vasilhas\nCom as lâmpadas a arder!\nOh! Exultemos! Brevemente,\nNosso Noivo voltará;\nEm Suas bodas excelentes\nHaveremos de estar."
    },
    "883": {
        "id": "883",
        "numero": 883,
        "titulo": "A consumação dos séculos",
        "categoria": "Hinário Novo",
        "estrofes": [
            "O que profetas, justos mil,\nQuiseram ver, ouvir,\nNo fim dos séculos surgiu\nCom realidade em si.",
            "Benditos somos nós, porém,\nPor ver e por ouvir\nO que os anjos, qual ninguém,\nTentaram inquirir.",
            "Um Corpo, somos hoje aqui,\nA Graça há que tomar;\nLevando outros a seguir\nE o reino conquistar.",
            "Oh! tal carreira percorrer\nTraz gozo superior!\nPerseverando, vamos ver,\nMui breve, o Senhor."
        ],
        "coro": "Mas chegou o final dos tempos,\nDas eras todas, o cumprimento;\nE os da fé, de idos tempos,\nEm nós perfeitos serão."
    },
    "884": {
        "id": "884",
        "numero": 884,
        "titulo": "O propósito eterno de Deus",
        "categoria": "Hinário Novo",
        "estrofes": [
            "Deus eterno fez um plano,\nMuito, muito tempo atrás,\nQue se estende, soberano,\nTé as eras eternais.\nTempo é um entremeio\nPara ele se cumprir,\nEm que somos passageiros\nTé a eternidade vir.",
            "Povo unido, bem ligado,\nEm Seu plano Deus quer ter,\nNovo homem, coordenado,\nVaso para O conter.\nNele entrar Deus tanto almeja\nE com ele se mesclar,\nSua vida e natureza\nCompartir e expressar.",
            "É Triúno o Deus bendito,\nE Seu plano vai cumprir:\nÉ o Pai, o Filho, o Espír'to,\nPara em nós se infundir.\nCéus e terra concebidos\nPara tal propósito,\nEm um homem tripartido:\nCorpo, alma e espírito.",
            "Como centro desse plano\nNosso espírito está,\nSe Jesus nós invocamos\nVem conosco se mesclar.\nDeus deseja plenamente\nTodo o nosso ser encher:\nEmoção, vontade, mente\nE Seu lar em nós fazer.",
            "Nós, na vida, edificados,\nE unidos em amor;\nDeus, Seu plano terminado,\nFinda todo o Seu labor.\nCresce em nós, ó Cristo vivo,\nEdifica o povo Teu,\nFaz-nos vaso coletivo,\nNos satura só de Deus!",
            "Oh! há muito Deus anela\nSeu propósito cumprir,\nTer a igreja pronta e bela,\nToda em glória a se vestir.\nNesse vaso coletivo\nDeus enfim vai se expressar.\nÓ Senhor, por Teu desígnio\nVamos, pois, nos entregar."
        ]
    },
    "885": {
        "id": "885",
        "numero": 885,
        "titulo": "O propósito eterno de Deus",
        "categoria": "Hinário Novo",
        "estrofes": [
            "Deus por Sua economia\nNos chamou, do alto, um dia;\nE tornou-se nossa vida\nPois, por nós, Se processou!\nComo o Espír'to nos habita;\nQue porção por Deus suprida:\nPlena salvação bendita\nFaz-nos como o Senhor!",
            "Como Homem-Deus, modelo,\nFoi Jesus o pioneiro,\nE, submisso té o madeiro,\nRenegou Seu natural.\nUnigên'to Ele, outrora,\nNós, Seus muitos grãos agora,\nNum só Corpo nos comporta\nComo Sua expressão!",
            "Em ressurreição vivemos,\nPara a carne e o \"eu\" morremos,\nNo espírito andemos,\nSem o homem natural.\nEm Seu Corpo hoje estamos,\nCada dia triunfamos,\nDe Sião já avistamos\nCristo vindo afinal,",
            "Deus e o homem misturados,\nNo espírito mesclados,\nJuntamente incorporados\nSão um vivo Corpo assim!\nTal visão sem par, eterna,\nDia a dia nos governa\nTé surgir a Noiva bela,\nQual Cidade Santa enfim."
        ],
        "coro": "Oh! esta clara e celestial visão\nGoverne, sem cessar, meu coração;\nE queime em mim té meu espírito se inflamar!\nAtivos, fortes vamos prosseguir\nTé Seu querer cumprir:\nNova Jerusalém se concluir!"
    },
    "886": {
        "id": "886",
        "numero": 886,
        "titulo": "Nosso alvo",
        "categoria": "Hinário Novo",
        "estrofes": [
            "Santa Cidade, junto a Ti, Senhor —\nEis nossa meta, onde tens louvor;\nMesmo que nosso corpo viva cá,\nNosso espír'to, lá, Contigo está.",
            "É nosso alvo tal Jerusalém;\nMútua morada Deus e o homem têm;\nPois o remido, que Contigo andar,\nCom Deus vai essa bênção partilhar.",
            "Esta Cidade, ao fitar por fé,\nMuito ansiamos Tua face ver,\nTer Teu chamado para ali entrar,\nTeu Deus Contigo sempre desfrutar.",
            "Nosso desejo, lá, não é a paz,\nNem nossa busca, gozo que apraz;\nMas és Tu mesmo, nosso galardão,\nNossa esperança viva e porção.",
            "Ouve, Amado, nossa oração:\nDo alto traz-nos tal Cidade então!\nA fim de Tua glória partilhar,\nEm Teu amor, a nos deliciar.",
            "Tu já disseste: \"Tudo novo está!\"\nOs céus, a terra, e o que neles há!\nEis nossa herança lá: o próprio Deus;\nVolta, Senhor, e toma logo os Teus!"
        ]
    },
    "887": {
        "id": "887",
        "numero": 887,
        "titulo": "Nosso alvo",
        "categoria": "Hinário Novo",
        "estrofes": [
            "Aguardava a Cidade que tem fundamentos,\nPeregrino, em tendas aqui a viver;\nHerdeiro das promessas divinais,\nNão almejava glórias, tesouros terrenais.",
            "Aguardava a Cidade que Deus lhe preparou,\nE nenhum palácio na terra cobiçou,\nPois tal real morada, na pátria celestial,\nRecebe os peregrinos da senda em seu final.",
            "Aguardava a Cidade, embora a suspirar\nPor negar toda a glória terrena e se arrastar,\nPorém a contemplando, ais eram qual canção,\nPois tal caminho rude tem curta duração.",
            "Aguardava a Cidade, Cidade em esplendor,\nÉ também essa meta a nossa, ó Senhor;\nUm galardão eterno a quem deseja ser\nCom Cristo peregrino, e em tenda aqui viver."
        ],
        "coro": "Nova Jerusalém!\nNova Jerusalém!\nHabitação eterna Deus com o homem tem."
    },
    "888": {
        "id": "888",
        "numero": 888,
        "titulo": "A cidade santa",
        "categoria": "Hinário Novo",
        "estrofes": [
            "És cidade gloriosa\nE tão santa, ó Sião!\nO infalível Deus criou-te\nPara Sua habitação;\nBem fundada sobre a Rocha,\nQue te pode abalar?\nSalvação há em teus muros\nPara assim os teus guardar.",
            "Brota o rio d'águas vivas\nDo eterno, grande amor;\nTeus benditos membros supre\nE remove o temor.\nSaciados por tal rio,\nComo podem fraquejar?\nEsta graça, como Cristo,\nNunca há de esgotar.",
            "Os remidos pelo Sangue\nFazem parte de Sião;\nSacerdotes-reis em Cristo\nPara Deus eis que já são;\nPodem como sacerdotes\nMuitas graças ofertar,\nTer seu ego subjugado\nPara, como reis, reinar.",
            "Salvador, se pela graça,\nDe Sião um membro sou,\nQue o mundo zombe ou chore,\nGloriar-me em Ti eu vou.\nOs prazeres deste mundo,\nSua pompa — tudo é vão;\nGozo eterno e tesouro\nTêm os membros de Sião."
        ]
    },
    "889": {
        "id": "889",
        "numero": 889,
        "titulo": "A vida na eternidade",
        "categoria": "Hinário Novo",
        "estrofes": [
            "Um rio há que vem dos céus,\nDo trono eternal,\nDe Deus e do Cordeiro Seu,\nBrilhante qual cristal.\nA árvore da vida vai\nMargeando tal fluir,\nQue aviva os Seus e os atrai\nSeu gozo a fruir.",
            "Inefável tal prazer,\nTem glórias, glórias mil;\nRiquezas tais que nos provê,\nO mundo nunca viu.\nDeus, para quem amor Lhe tem,\nJá muito preparou;\nNinguém ouviu nem viu, porém\nO Espírito mostrou.",
            "Eu provo Tua graça e amor,\nÉ doce Teu falar,\nMas face a face, ó Senhor,\nTe quero contemplar!\nNo infindo gozo folgarei\nCom todos os irmãos,\nO Deus do gozo bendirei:\nOh! que satisfação!"
        ]
    },
    "890": {
        "id": "890",
        "numero": 890,
        "titulo": "A vida na eternidade",
        "categoria": "Hinário Novo",
        "estrofes": [
            "Tesouro em vaso frágil,\nSenhor, não mais porás,\nMas, num dourado vaso,\nPor mim Te expressarás.",
            "O resplendor divino\nEm vaso assim reluz;\nO sol não é preciso,\nPois Deus será a luz.",
            "Com Cristo, a Cidade\nBelíssima será;\nE Ele, como jaspe,\nCom glória brilhará.",
            "A glória nesse vaso,\nCom nitidez transluz,\nTornando o mundo claro\nCom radiante luz.",
            "Os novos céu e terra\nA glória ali verão:\nA Noiva do Cordeiro,\nGloriosa expressão.",
            "Tal vaso de ouro adora\nQuem quer que o contemplar:\nDeus, no Cordeiro em glória\nPra sempre a se expressar."
        ]
    },
    "891": {
        "id": "891",
        "numero": 891,
        "titulo": "O Salvador",
        "categoria": "Hinário Novo",
        "estrofes": [
            "Por plena redenção,\nPagou o preço do perdão —\nCristo é maravilhoso!",
            "Por mim Seu sangue derramou,\nCristo, o maravilhoso!\nEm paz, com Deus me colocou —\nCristo é maravilhoso!",
            "De meus pecados me lavou,\nCristo, o maravilhoso!\nE reina em mim, é meu Senhor —\nCristo é maravilhoso!",
            "Habita dia a dia em mim,\nCristo, o maravilhoso!\nFiel me guarda até o fim —\nCristo é maravilhoso!",
            "Vitoriosa força dá,\nCristo, o maravilhoso!\nNa luta, faz-me triunfar —\nCristo é maravilhoso!",
            "A Ele a vida já rendi,\nCristo, o maravilhoso!\nJamais o mundo o vai tirar —\nCristo é maravilhoso!"
        ],
        "coro": "Oh! que maravilhoso\nÉ meu Salvador!\nOh! que maravilhoso\nJesus, meu Senhor!"
    },
    "892": {
        "id": "892",
        "numero": 892,
        "titulo": "O Salvador",
        "categoria": "Hinário Novo",
        "estrofes": [
            "Um dia, quando os céus O louvavam,\nQuando o pecado reinava cruel;\nVeio Jesus e nasceu duma virgem,\nDeus entre os homens — Exemplo fiel!",
            "Um dia foi ao Calvário levado,\nUm dia sobre a cruz expirou;\nTeve angústia, desprezo e escárnio;\nCulpas levou-me — é meu Redentor.",
            "Um dia, só, no jardim, foi deixado,\nUm dia teve descanso da dor,\nE o sepulcro por anjos guardado.\nNele espero — é meu Salvador.",
            "Um dia a tumba não mais O reteve,\nUm dia a pedra da entrada rolou;\nEle, da morte, em vitória, ressurge,\nHoje, nos céus, é meu Cristo e Senhor.",
            "Um dia, quando soar a trombeta,\nE derramar-se dos céus Sua luz,\nAjuntará Seus amados remidos —\nQuão glorioso meu Cristo Jesus!"
        ],
        "coro": "Vivo, amou-me; morto, salvou-me;\nE meus pecados na tumba deixou;\nRessuscitado, justificou-me,\nUm dia, em glória, virá o Senhor."
    },
    "893": {
        "id": "893",
        "numero": 893,
        "titulo": "O Salvador",
        "categoria": "Hinário Novo",
        "estrofes": [
            "Cristo Jesus, Salvador, a Belém\nVeio sofrer privação e desdém;\nPelo imenso amor que me tem,\nVeio buscar-me, sim!\nVeio buscar-me, sim!\nVeio buscar-me, sim!\nPelo imenso amor que me tem,\nVeio buscar-me, sim!",
            "Cristo Jesus, pela cruz\nMe transportou para o Reino de luz;\nMaravilhoso o amor de Jesus!\nVeio morrer por mim!\nVeio morrer por mim!\nVeio morrer por mim!\nMaravilhoso o amor de Jesus!\nVeio morrer por mim!",
            "Cristo Jesus, Salvador, me salvou\nQuando eu vagava em trevas e dor;\nAo cativar-me com doce amor,\nVeio chamar-me, sim!\nVeio chamar-me, sim!\nVeio chamar-me, sim!\nAo cativar-me com doce amor,\nVeio chamar-me, sim!",
            "Cristo Jesus, Salvador, voltará,\nSua promessa por fim cumprirá;\nCom os remidos, que glória será\nVê-Lo voltar por mim!\nVê-Lo voltar por mim!\nVê-Lo voltar por mim!\nCom os remidos, que glória será\nVê-Lo voltar por mim!"
        ]
    },
    "894": {
        "id": "894",
        "numero": 894,
        "titulo": "O Salvador",
        "categoria": "Hinário Novo",
        "estrofes": [
            "A terna voz do Salvador\nTe chama comovida;\nQual Médico, ao pecador:\nLiberta e dá vida.",
            "Pecados teus já removeu,\nEscuta a Sua voz;\nA redenção Jesus proveu,\nO véu já foi rasgado.",
            "Eu creio em Quem por mim penou,\nJesus, Cordeiro digno!\nO Nome de meu Salvador\nEu tanto aprecio.",
            "Pecados não me afligem mais,\nMeu coração desfruta paz\nSomente em Seu nome."
        ],
        "coro": "Nunca se ouviu mais belo som,\nMais doce Voz, melhor canção,\nQue o Nome tão bom\nDe Jesus, precioso!"
    },
    "895": {
        "id": "895",
        "numero": 895,
        "titulo": "O Salvador",
        "categoria": "Hinário Novo",
        "estrofes": [
            "Há um amigo igual a Cristo?\nNão, nenhum! Não, nenhum!\nOutro que cure a todo aflito?\nNão, nenhum! Não, nenhum!",
            "Há um amigo tão nobre e santo?\nNão, nenhum! Não, nenhum!\nOutro que seja humilde e manso?\nNão, nenhum! Não, nenhum!",
            "Este Amigo abandonou-nos?\nTempo algum! Tempo algum!\nE Seu amor já desapontou-nos?\nTempo algum! Tempo algum!",
            "Houve um crente desamparado?\nNão, nenhum! Não, nenhum!\nOu pecador que foi rejeitado?\nNão, nenhum! Não, nenhum!",
            "Houve Amigo melhor que Este?\nTempo algum! Tempo algum!\nNos negará o prazer celeste?\nTempo algum! Tempo algum!"
        ],
        "coro": "Cristo sabe de nossas lutas,\nGuiará até o fim chegar.\nHá um amigo igual a Cristo?\nNão, não há! Não, não há!"
    },
    "896": {
        "id": "896",
        "numero": 896,
        "titulo": "O Salvador",
        "categoria": "Hinário Novo",
        "estrofes": [
            "Que mensagem excelente,\nSimples para a fé:\nOntem, para sempre,\nCristo o mesmo é;\nSalva os coxos, os doentes,\nLivra do pecar e o mal,\nAos aflitos, faz contentes —\nNome triunfal!",
            "Quem amava os perdidos\nHoje busca a ti;\nA Seus pés, arrependido,\nVem, te rende aí.\nQuem falou: \"Não te condeno,\nVai, não peques mais\",\nO perdão te dá, mui pleno,\nComo o fez lá atrás.",
            "Cura sempre trouxe à terra\nSua forte Mão;\nE hoje Ele ainda opera:\nMal e dor se vão.\nQuem curou a pobre enferma\nSua graça hoje ordena\nPara a fé que O quer.",
            "Como andou com dois discíp'los\nPara Emaús,\nPróximo, a nosso lado\nSempre vai Jesus.\nBreve vamos vê-Lo um dia,\nNo retorno Seu,\nMas será o mesmo ainda\nQue subiu aos céus."
        ],
        "coro": "Ontem e hoje e para sempre,\nCristo é igual,\nTudo muda; nunca Cristo!\nNome triunfal!\nNome triunfal!\nNome triunfal!\nTudo muda; nunca Cristo!\nNome triunfal!"
    },
    "897": {
        "id": "897",
        "numero": 897,
        "titulo": "O Salvador",
        "categoria": "Hinário Novo",
        "estrofes": [
            "Oh! que Te fez morrer por mim,\nAlguém tão vil, Teu inimigo assim?\nTomaste meu lugar lá na cruz\nE foste maldito por mim, ó Jesus.",
            "Tamanho Amor e tal Mercê\nJamais se viu; não pude entender.\nAmaste alguém tão vil como eu?\nAmaste demais um inimigo Teu.",
            "Oh! que Te fez morrer,\nTeu sangue aqui verter,\nE fez-Te maldição por mim?\nQue misterioso amor\nTe fez morrer, Senhor,\nE dar a vida aqui por mim?",
            "Outrora eu zombei de Ti,\nTe desprezei, por muito tempo aqui;\nCom forte e mui paciente Amor,\nHá muito me amaste, porém, ó Senhor.",
            "Eu fui alguém que só pecou,\nE meu viver pecado expressou;\nRebelde foi o meu coração,\nMas Tu me tocaste com tal compaixão.",
            "Fui inimigo Teu,\nMas Teu amor venceu;\nA mim vieste em amor.\nSomente Teu amor\nMe fez mudar, Senhor;\nSó Teu amor me conquistou.",
            "Voltei a Ti, e estavas lá,\nCom Teu amor fiel a me esperar;\nNão pude mais lutar contra Ti,\nA esse tão forte Amor me rendi."
        ]
    },
    "898": {
        "id": "898",
        "numero": 898,
        "titulo": "O Salvador",
        "categoria": "Hinário Novo",
        "estrofes": [
            "Não podem minhas mãos\nA este réu salvar;\nNem meu carnal esforço vão,\nO espírito avivar.\nTampouco meu labor,\nA paz de Deus comprar;\nNem lágrimas, nem preces, dor,\nO fardo carregar.",
            "Cordeiro, dom de Deus,\nSomente Teu labor\nA culpa já nos removeu,\nDá paz interior.\nSó Teu amor fiel,\nE não o meu, Senhor,\nO espírito me desprendeu,\nO mal-estar tirou.",
            "Só Tua graça, ó Deus,\nMe pôde dar perdão;\nE Teu poder, ó Filho Seu,\nRomper a escravidão.\nSim, Tua obra só,\nTeu sangue e nada mais!\nSó o divinal poder, vigor,\nA salvação me traz.",
            "Bendigo a Cristo então;\nDescanso em Seu amor;\nE diz com fé meu coração:\nÉ meu tal Salvador.\nAs dúvidas, na Cruz,\nAniquiladas são,\nE sepultei, com meu Jesus,\nO medo, a escuridão.",
            "No Deus da graça, eu\nConfio e em Seu poder;\nDiz que sou Seu, e Ele, meu,\nMeu Deus, luz e prazer.\nPerdão, de graça, dá,\nSó Ele é Salvador;\nPorque me amou eu posso amar,\nSe vive, vivo estou."
        ]
    },
    "899": {
        "id": "899",
        "numero": 899,
        "titulo": "O Salvador",
        "categoria": "Hinário Novo",
        "estrofes": [
            "Vivi tão longe do Senhor,\nAssim eu quis andar;\nAté que encontrei o amor\nEm Seu bondoso olhar.",
            "Seu corpo vi na rude cruz,\nSofrendo ali por mim,\nE ouvi a voz de meu Jesus:\n\"Por ti morri assim\".",
            "Em contrição então voltei\nÀ fonte desse amor.\nPerdão e paz em Cristo achei;\nPertenço ao Salvador."
        ],
        "coro": "Seu maravilhoso olhar!\nSeu maravilhoso olhar!\nTransformou meu ser,\nTodo o meu viver\nSeu maravilhoso olhar!"
    },
    "900": {
        "id": "900",
        "numero": 900,
        "titulo": "O Salvador",
        "categoria": "Hinário Novo",
        "estrofes": [
            "Quem pode pecados perdoar\nE a iniquidade retirar?\nQuem pode da cova redimir,\nCom amor, feridas acudir?",
            "Quem pode dar luz na escuridão\nAo aflito e triste coração? (coração)\nQuem ao desvalido pode erguer\nE fazer a estéril conceber,\nDar à luz?",
            "Quem a morte e o Hades subjugou\nE sobre o inimigo triunfou?\nQuem nos trouxe graça, vida e luz?\nSó pode ser um homem: é Jesus!\nDeus Forte e Conselheiro Ele é;\nAutor, Consumador da nossa fé,\nÉ Jesus.\nAutor, Consumador da nossa fé,\nÉ Jesus."
        ]
    }
}

# Verification asserts:
assert len(HINOS_876_900) == 25, f"Expected 25 hymns, got {len(HINOS_876_900)}"
assert all(str(k) in HINOS_876_900 for k in range(876, 901)), "Missing hymn IDs!"

for hid, item in HINOS_876_900.items():
    assert item["id"] == hid, f"ID mismatch for {hid}"
    assert item["numero"] == int(hid), f"Numero mismatch for {hid}"
    assert item["categoria"] == "Hinário Novo", f"Category mismatch for {hid}"
    assert len(item["titulo"]) > 0, f"Empty title for {hid}"
    assert len(item["estrofes"]) > 0, f"Empty estrofes for {hid}"
    for e_idx, e in enumerate(item["estrofes"]):
        assert len(e.strip()) > 0, f"Empty estrofe {e_idx} in {hid}"
        assert not re.match(r'^\d+[\s\.\)]', e.strip()), f"Residual numeral in {hid} estrofe {e_idx}: {e[:20]}"
    if "coro" in item:
        assert len(item["coro"].strip()) > 0, f"Empty coro in {hid}"
        assert not re.match(r'^\d+[\s\.\)]', item["coro"].strip()), f"Residual numeral in {hid} coro"

print("ALL INTERNAL ASSERTS PASSED SUCCESSFULLY!")
