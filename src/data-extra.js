
/* ---------- mais textos e metadados ---------- */
Object.assign(SENT,{
 t4s1:{en:"Every Saturday morning, the old square fills with colourful stalls.",pt:"Todos os sábados de manhã, a praça antiga enche-se de bancas coloridas."},
 t4s2:{en:"Farmers arrive early to sell fresh bread, cheese and fruit.",pt:"Os agricultores chegam cedo para vender pão fresco, queijo e fruta.",ai:`«To sell» indica a finalidade: chegam cedo para vender. Numa lista de três coisas, o «and» vem antes do último item.`},
 t4s3:{en:"Ana likes to wander between the tables and chat with the sellers.",pt:"A Ana gosta de passear entre as mesas e conversar com os vendedores.",ai:`Depois de «like» podes usar to + verbo (likes to wander) ou o gerúndio (likes wandering). Os dois verbos partilham o «to»: to wander… and (to) chat.`},
 t4s4:{en:"Today she bought a bunch of flowers for her grandmother.",pt:"Hoje comprou um ramo de flores para a avó.",ai:`«Bought» é o passado irregular de buy. «Her» aqui é possessivo (a avó dela).`},
 t4s5:{en:"On the way home, the smell of warm pastries made her hungry.",pt:"No caminho para casa, o cheiro dos bolos quentes deu-lhe fome.",ai:`Estrutura make + pessoa + adjetivo: made her hungry = deixou-a com fome. O sujeito é «the smell», não a Ana.`},
 t5s1:{en:"In 1885, a German scientist named Hermann Ebbinghaus tested his own memory.",pt:"Em 1885, um cientista alemão chamado Hermann Ebbinghaus testou a sua própria memória.",ai:`«Named» = chamado. É um particípio que encurta «who was named». «His own» reforça: a memória dele mesmo.`},
 t5s2:{en:"He discovered that we forget most new information within a few days.",pt:"Descobriu que esquecemos a maior parte da informação nova em poucos dias.",ai:`«Information» é incontável: nunca leva -s nem «an». «A few days» = alguns dias; sem o «a», «few days» soaria a «poucos, quase nenhuns».`},
 t5s3:{en:"However, each review makes the memory stronger and slows down forgetting.",pt:"No entanto, cada revisão torna a memória mais forte e abranda o esquecimento.",ai:`«Each» leva verbo no singular (each review makes). «Forgetting» funciona como nome: o ato de esquecer.`},
 t5s4:{en:"This idea, known as the forgetting curve, inspired modern flashcard apps.",pt:"Esta ideia, conhecida como curva do esquecimento, inspirou as apps modernas de flashcards.",ai:`A parte entre vírgulas é um aposto: dá o nome da ideia. «Flashcard» funciona aqui como adjetivo antes de «apps».`},
 t5s5:{en:"That is why reviewing a word at the right moment works so well.",pt:"É por isso que rever uma palavra no momento certo funciona tão bem.",ai:`«That is why» = é por isso que. O sujeito de «works» é todo o bloco «reviewing a word at the right moment», por isso o verbo vai no singular.`}
});
LESSONS.push(
 {id:'t4',title:'The Morning Market',level:'A2',tag:'Dia a dia',paras:[['t4s1','t4s2','t4s3'],['t4s4','t4s5']],
  qs:[{q:'What does Ana buy?',o:['A bunch of flowers','Fresh bread','A cup of tea'],a:0},{q:'What made her hungry?',o:['The fruit stalls','The smell of warm pastries','Her grandmother'],a:1}]},
 {id:'t5',title:'Why We Forget',level:'B1',tag:'Ciência',paras:[['t5s1','t5s2'],['t5s3','t5s4','t5s5']],
  qs:[{q:'What did Ebbinghaus discover?',o:['Memory never changes','We forget most new information within days','Flashcards are useless'],a:1},{q:'What makes a memory stronger?',o:['Each review','Reading faster','Sleeping less'],a:0}]}
);
EXPR.push(
 {s:'t4s4',w:['a','bunch','of'],pt:'um ramo de; um monte de'},
 {s:'t4s5',w:['on','the','way','home'],pt:'a caminho de casa'},
 {s:'t5s3',w:['slows','down'],pt:'abrandar; phrasal verb «slow down»'},
 {s:'t5s4',w:['known','as'],pt:'conhecido como'},
 {s:'t5s5',w:['that','is','why'],pt:'é por isso que'},
 {s:'t5s2',w:['a','few'],pt:'alguns, uns quantos'}
);
Object.assign(DICT,{
 square:{pt:'praça; quadrado',pos:'subst.',ipa:'/skweə/',ai:`Aqui é a praça da cidade (the old square). Como figura geométrica ou adjetivo, significa quadrado.`},
 colourful:{pt:'colorido',pos:'adj.',ipa:'/ˈkʌləfl/',ai:`Grafia britânica; nos EUA escreve-se colorful. Colour + -ful = cheio de cor.`},
 stall:{pt:'banca, barraca',pos:'subst.',ipa:'/stɔːl/',ai:`Banca de mercado. Como verbo, «stall» é o motor ir abaixo ou empatar alguém.`},
 farmer:{pt:'agricultor',pos:'subst.',ipa:'/ˈfɑːmə/',ai:`Quem trabalha numa farm (quinta). O sufixo -er indica quem faz a ação, como em seller.`},
 fresh:{pt:'fresco',pos:'adj.',ipa:'/freʃ/',ai:`Fresh bread = pão acabado de fazer. Para temperatura usa-se «cool»: a cool evening, não «a fresh evening».`},
 wander:{pt:'passear, deambular',pos:'verbo',ipa:'/ˈwɒndə/',ai:`Andar sem destino fixo. Não confundir com «wonder» (perguntar-se), que soa parecido.`},
 chat:{pt:'conversar',pos:'verbo',ipa:'/tʃæt/',ai:`Conversa descontraída. «Chat with someone» = conversar com alguém.`},
 bunch:{pt:'ramo, molho',pos:'subst.',ipa:'/bʌntʃ/',ai:`«A bunch of flowers» = um ramo de flores; «a bunch of keys» = um molho de chaves. Informalmente, «a bunch of» = muitos.`},
 pastry:{pt:'bolo, pastel',pos:'subst.',ipa:'/ˈpeɪstri/',ai:`Bolos de massa, como os pastéis de nata. Plural: pastries (y → ies).`},
 hungry:{pt:'com fome',pos:'adj.',ipa:'/ˈhʌŋɡri/',ai:`Em inglês é um adjetivo com «be»: I'm hungry (estou com fome), nunca «I have hunger».`},
 smell:{pt:'cheiro; cheirar',pos:'subst.',ipa:'/smel/',ai:`Aqui é substantivo: o cheiro dos bolos. Como verbo: it smells good.`},
 warm:{pt:'quente, morno',pos:'adj.',ipa:'/wɔːm/',ai:`Mais suave do que «hot». Warm pastries = bolos ainda quentes, agradáveis.`},
 scientist:{pt:'cientista',pos:'subst.',ipa:'/ˈsaɪəntɪst/',ai:`Science + -ist. A sílaba tónica é a primeira: SCI-en-tist.`},
 discover:{pt:'descobrir',pos:'verbo',ipa:'/dɪˈskʌvə/',ai:`Usa-se para descobertas (discovered that…). Para informação do dia a dia é mais natural «find out».`},
 forget:{pt:'esquecer',pos:'verbo',ipa:'/fəˈɡet/',ai:`Irregular: forget, forgot, forgotten. Em «slows down forgetting», forgetting é um nome: o esquecimento.`},
 within:{pt:'dentro de, em menos de',pos:'prep.',ipa:'/wɪˈðɪn/',ai:`«Within a few days» = no espaço de poucos dias, sem passar desse prazo.`},
 however:{pt:'no entanto',pos:'adv.',ipa:'/haʊˈevə/',ai:`Introduz um contraste com a frase anterior. No início leva vírgula: However, …`},
 curve:{pt:'curva',pos:'subst.',ipa:'/kɜːv/',ai:`«The forgetting curve» é o gráfico de quanto esquecemos ao longo do tempo.`},
 inspire:{pt:'inspirar',pos:'verbo',ipa:'/ɪnˈspaɪə/',ai:`«Inspired modern apps» = serviu de inspiração às apps modernas.`},
 review:{pt:'revisão; rever',pos:'subst.',ipa:'/rɪˈvjuː/',ai:`Aqui é substantivo (each review). Também é verbo (reviewing a word) e crítica (a film review).`},
 moment:{pt:'momento',pos:'subst.',ipa:'/ˈməʊmənt/',ai:`«At the right moment» = no momento certo. Atenção à preposição: at.`}
});
`saturday=sábado
fill=encher
arrive=chegar
sell=vender
bread=pão
cheese=queijo
fruit=fruta
table=mesa
seller=vendedor
flower=flor
grandmother=avó
today=hoje
way=caminho
her=ela; o seu, a sua (dela)
german=alemão
test=testar
strong=forte
app=aplicação, app
flashcard=cartão de memorização
well=bem
with=com`.split('\n').forEach(r=>{const i=r.indexOf('=');if(i>0)PT[r.slice(0,i)]=r.slice(i+1);});
['ana','hermann','ebbinghaus'].forEach(n=>NAMES.add(n));
Object.assign(FORMS,{bought:'buy',known:'know',forgot:'forget',forgotten:'forget'});
Object.keys(SENT).forEach(buildTok);

const META={
 t1:{coll:'Contos curtos',author:'Glosa Originais',blurb:'Um domingo de chuva, uma chávena de chá e um livro que estava à espera há meses.'},
 t2:{coll:'Aprender a aprender',author:'Glosa Originais',blurb:'Quinze minutos por dia chegam. Como ler para aprender sem dar por isso.'},
 t3:{coll:'Contos curtos',author:'Glosa Originais',blurb:'Quarenta anos sozinho num farol que já ninguém usa. Até àquela noite.'},
 t4:{coll:'Dia a dia',author:'Glosa Originais',blurb:'Bancas, pão quente e um ramo de flores. Um sábado no mercado.'},
 t5:{coll:'Aprender a aprender',author:'Glosa Originais',blurb:'A experiência de 1885 que explica porque é que os flashcards funcionam.'}
};

/* ---------- história escrita com as palavras a aprender (série da Maya) ---------- */
Object.assign(SENT,{
 t6s1:{en:"On Monday, Maya decided to wander along the cliff after work.",pt:"Na segunda-feira, a Maya decidiu passear ao longo da falésia depois do trabalho.",ai:`«Along» = ao longo de. Repara que «decided to» volta a aparecer, tal como no primeiro episódio.`},
 t6s2:{en:"The path was empty, and the air felt fresh and cold.",pt:"O caminho estava vazio e o ar parecia fresco e frio.",ai:`«Felt» (passado de feel) + adjetivo descreve uma sensação: the air felt fresh = o ar parecia fresco.`},
 t6s3:{en:"She tried to guess the names of the birds from their songs.",pt:"Tentou adivinhar os nomes dos pássaros pelos seus cantos.",ai:`«Try to + verbo» = tentar fazer algo. «From their songs» = a partir dos cantos deles.`},
 t6s4:{en:"It was a struggle at first, however she enjoyed the challenge.",pt:"Ao início foi difícil, mas ela gostou do desafio.",ai:`Aqui «struggle» é um nome: uma luta, uma dificuldade. «However» ligado com vírgula é mais informal; num texto cuidado usava-se ponto e vírgula antes.`},
 t6s5:{en:"Walking had become a habit, and it made a real difference to her mood.",pt:"Caminhar tinha-se tornado um hábito e fazia uma diferença real no seu humor.",ai:`«Walking» é o sujeito (gerúndio). «Make a difference to» = fazer diferença em.`},
 t6s6:{en:"Words she had read in context now seemed to stick in her memory.",pt:"As palavras que tinha lido em contexto pareciam agora ficar-lhe na memória.",ai:`Falta o «that»: words (that) she had read. «Seem to + verbo» = parecer.`}
});
LESSONS.push({id:'t6',title:'A Walk on the Cliff',level:'B1',tag:'Conto',paras:[['t6s1','t6s2','t6s3'],['t6s4','t6s5','t6s6']],
  qs:[{q:'Where did Maya walk?',o:['Along the cliff','In the market','To the lighthouse'],a:0},{q:'What did walking change?',o:['Her job','Her mood','Her house'],a:1}]});
EXPR.push(
 {s:'t6s4',w:['at','first'],pt:'no início'},
 {s:'t6s5',w:['made','a','real','difference'],pt:'fazer uma diferença real'},
 {s:'t6s6',w:['stick','in','her','memory'],pt:'ficar na memória'}
);
Object.assign(DICT,{
 challenge:{pt:'desafio',pos:'subst.',ipa:'/ˈtʃælɪndʒ/',ai:`Algo difícil mas estimulante. «Enjoy the challenge» = gostar do desafio.`},
 mood:{pt:'humor, estado de espírito',pos:'subst.',ipa:'/muːd/',ai:`«In a good mood» = bem-disposto. Não confundir com «humour» (sentido de humor).`},
 along:{pt:'ao longo de',pos:'prep.',ipa:'/əˈlɒŋ/',ai:`«Along the cliff» = ao longo da falésia, a seguir a linha dela.`}
});
`monday=segunda-feira
path=caminho, trilho
air=ar
cold=frio
bird=pássaro
song=canção, canto
their=deles, delas`.split('\n').forEach(r=>{const i=r.indexOf('=');if(i>0)PT[r.slice(0,i)]=r.slice(i+1);});
Object.assign(FORMS,{tried:'try'});
PT['try']=PT['try']||'tentar';
Object.keys(SENT).forEach(buildTok);
META.t1.coll='Os dias da Maya';META.t1.ep=1;
META.t6={coll:'Os dias da Maya',ep:2,gen:true,author:'Escrito pela IA com as tuas palavras',blurb:'Maya sai do trabalho e caminha pela falésia. Este episódio usa as palavras que estás a aprender.'};

/* ---------- temas do vocabulário ---------- */
const THEMES={
 'Tempo e natureza':['rainy','grey','stormy','fog','cliff','edge','faint','beam','warm','fresh','smell','mood'],
 'Mar e viagem':['lighthouse','crew','steer','drift','spot','narrow','stair','climb','lamp','light','along','wander'],
 'Aprender':['context','dictionary','meaning','guess','memory','mistake','process','review','curve','forget','discover','scientist','inspire','notice','check','difference','struggle','stick','challenge'],
 'Dia a dia':['square','colourful','stall','farmer','chat','bunch','pastry','hungry','habit','enjoy','enjoyable','empty','decide','pick'],
 'Palavras de ligação':['while','finally','yet','however','within','nearly','dangerously','peacefully','mean','become','afraid','tend','rely','pointless','moment','find']
};
const POS_TIPS={
 'verbo':'Muitos dos teus erros são verbos. Repara nas formas irregulares (find → found, light → lit) e nos phrasal verbs: lê a partícula com o verbo como um só bloco (pick up, find out).',
 'subst.':'Falhas mais em nomes. Liga cada nome a uma imagem da frase onde o viste: cliff com o farol, stall com o mercado. O contexto ajuda mais do que a tradução sozinha.',
 'adj.':'Os adjetivos são o teu ponto fraco. Aprende-os aos pares de opostos (narrow/wide, empty/full, faint/strong): o contraste fixa melhor.',
 'adv.':'Falhas em advérbios e palavras de ligação (however, yet, nearly). Estas mudam o sentido da frase: lê a frase inteira em voz alta antes de responder.',
 'expressão':'As expressões custam-te mais. Revê-as no modo Lacuna: escrever a expressão completa dentro da frase ajuda a guardá-la como bloco.'
};
