/* ---------- dados: frases, lições ---------- */
const SENT={
 t1s1:{en:"It was a rainy Sunday, so Maya decided to stay at home.",pt:"Era um domingo de chuva, por isso a Maya decidiu ficar em casa.",ai:`«So» liga a consequência: estava a chover, por isso ficou em casa. Depois de «decide» usa-se to + infinitivo (decided to stay).`},
 t1s2:{en:"She made a cup of tea and looked out of the window.",pt:"Fez uma chávena de chá e olhou pela janela."},
 t1s3:{en:"The streets were empty, and the sky was grey.",pt:"As ruas estavam vazias e o céu estava cinzento."},
 t1s4:{en:"After a while, she picked up an old book that she had been meaning to read for months.",pt:"Passado algum tempo, pegou num livro antigo que andava a pensar ler há meses.",ai:`«Had been meaning to read» é o past perfect continuous: uma intenção que já durava antes de «picked up». «That she had been…» é uma oração relativa que descreve o livro.`},
 t1s5:{en:"At first, the story felt slow, but soon she could not put it down.",pt:"No início, a história parecia lenta, mas depressa não conseguia largá-lo.",ai:`«Could not put it down» = não conseguia parar de ler. Nos phrasal verbs separáveis o pronome fica no meio: put it down (e não «put down it»).`},
 t1s6:{en:"When the rain finally stopped, it was already dark outside.",pt:"Quando a chuva finalmente parou, já estava escuro lá fora."},
 t1s7:{en:"Maya smiled. It had been a perfect day.",pt:"A Maya sorriu. Tinha sido um dia perfeito."},
 t2s1:{en:"Many people want to learn English, but they struggle to find time.",pt:"Muitas pessoas querem aprender inglês, mas têm dificuldade em arranjar tempo."},
 t2s2:{en:"The good news is that you do not need hours every day.",pt:"A boa notícia é que não precisas de horas todos os dias."},
 t2s3:{en:"Reading something you enjoy for fifteen minutes can make a real difference.",pt:"Ler algo de que gostas durante quinze minutos pode fazer uma diferença real.",ai:`O sujeito da frase é «Reading something you enjoy» (um gerúndio). Depois de «can» vem o verbo base: can make.`},
 t2s4:{en:"Each time you meet a new word, try to guess its meaning from the context before checking a dictionary.",pt:"Sempre que encontras uma palavra nova, tenta adivinhar o significado pelo contexto antes de consultares um dicionário."},
 t2s5:{en:"Over time, the words you see again and again will stick in your memory.",pt:"Com o tempo, as palavras que vês vezes sem conta ficam na memória.",ai:`«Will stick» é uma previsão com will. Em «the words you see again and again» falta o that: the words (that) you see.`},
 t2s6:{en:"Don't be afraid of making mistakes; they are part of the process.",pt:"Não tenhas medo de errar; fazem parte do processo."},
 t2s7:{en:"Little by little, you will notice that reading becomes easier and more enjoyable.",pt:"Pouco a pouco, vais reparar que ler se torna mais fácil e mais agradável."},
 t3s1:{en:"For nearly forty years, Tom had lived alone at the edge of the cliff, tending the lighthouse.",pt:"Durante quase quarenta anos, o Tom vivera sozinho à beira da falésia, a cuidar do farol.",ai:`«Had lived» é o past perfect: já vivia ali há 40 anos até àquele momento. «Tending the lighthouse» é um particípio presente que explica o que ele fazia.`},
 t3s2:{en:"Ships no longer relied on him, since modern technology had made his work almost pointless.",pt:"Os navios já não dependiam dele, uma vez que a tecnologia moderna tornara o seu trabalho quase inútil.",ai:`«No longer» = já não. Aqui «since» indica causa (uma vez que), não tempo (desde). «Had made» é o past perfect.`},
 t3s3:{en:"Yet every evening he climbed the narrow stairs and lit the lamp out of habit.",pt:"Ainda assim, todas as noites subia as escadas estreitas e acendia a lâmpada por hábito."},
 t3s4:{en:"One stormy night, a small fishing boat drifted dangerously close to the rocks.",pt:"Numa noite de tempestade, um pequeno barco de pesca derivou perigosamente para perto das rochas."},
 t3s5:{en:"Through the fog, the crew spotted the faint beam and steered away just in time.",pt:"Através do nevoeiro, a tripulação avistou o feixe ténue de luz e desviou-se mesmo a tempo.",ai:`Dois verbos no passado ligados por «and»: spotted… and steered. «Just in time» = mesmo a tempo.`},
 t3s6:{en:"Nobody ever found out who had saved them, but Tom slept peacefully that night.",pt:"Ninguém chegou a descobrir quem os salvara, mas o Tom dormiu em paz nessa noite.",ai:`Com «nobody» o verbo fica afirmativo (não há dupla negação como em português). «Who had saved them» é uma oração subordinada no past perfect.`}
};
const LESSONS=[
 {id:'t1',title:'A Rainy Sunday',level:'A2',tag:'Conto',paras:[['t1s1','t1s2','t1s3'],['t1s4','t1s5'],['t1s6','t1s7']],
  qs:[{q:'Why did Maya stay at home?',o:['Because it was raining','Because she was ill','Because she had no money'],a:0},{q:'What did she do after making tea?',o:['She went shopping','She picked up an old book','She called a friend'],a:1}]},
 {id:'t2',title:'Learning on the Go',level:'B1',tag:'Dicas',paras:[['t2s1','t2s2','t2s3'],['t2s4','t2s5'],['t2s6','t2s7']],
  qs:[{q:'How much reading time can make a difference?',o:['Several hours','Fifteen minutes','One minute'],a:1},{q:'What should learners not be afraid of?',o:['Making mistakes','Using a dictionary','Reading aloud'],a:0}]},
 {id:'t3',title:'The Lighthouse Keeper',level:'B2',tag:'Conto',paras:[['t3s1','t3s2'],['t3s3','t3s4','t3s5'],['t3s6']],
  qs:[{q:'Why did Tom still light the lamp?',o:['Out of habit','Because the law required it','To attract fish'],a:0},{q:'What happened to the fishing boat?',o:['It sank near the cliff','The crew saw the light and steered away','Tom rowed out to rescue it'],a:1}]}
];
const EXPR=[
 {s:'t1s4',w:['after','a','while'],pt:'passado algum tempo'},
 {s:'t1s4',w:['picked','up'],pt:'pegar em (algo pousado); phrasal verb «pick up»'},
 {s:'t1s4',w:['meaning','to'],pt:'tencionar, andar a pensar fazer algo («mean to»)'},
 {s:'t1s5',w:['at','first'],pt:'no início'},
 {s:'t1s5',w:['put','it','down'],pt:'pousar; aqui, parar de ler'},
 {s:'t2s3',w:['make','a','real','difference'],pt:'fazer uma diferença real'},
 {s:'t2s5',w:['again','and','again'],pt:'vezes sem conta'},
 {s:'t2s6',w:['afraid','of'],pt:'ter medo de'},
 {s:'t2s7',w:['little','by','little'],pt:'pouco a pouco'},
 {s:'t3s2',w:['no','longer'],pt:'já não'},
 {s:'t3s2',w:['relied','on'],pt:'depender de'},
 {s:'t3s3',w:['out','of','habit'],pt:'por hábito'},
 {s:'t3s5',w:['just','in','time'],pt:'mesmo a tempo'},
 {s:'t3s5',w:['steered','away'],pt:'desviar-se'},
 {s:'t3s6',w:['found','out'],pt:'descobrir; phrasal verb «find out»'}
];
/* palavras a aprender: tradução, IPA e explicação de IA (pré-escrita) */
const DICT={
 rainy:{pt:'chuvoso, de chuva',pos:'adj.',ipa:'/ˈreɪni/',ai:`Descreve o dia: um domingo de chuva. Forma-se com rain + -y (sun → sunny, cloud → cloudy).`},
 empty:{pt:'vazio',pos:'adj.',ipa:'/ˈempti/',ai:`Aqui descreve as ruas: sem gente nem carros. Também se usa para copos, salas e promessas (empty promises).`},
 grey:{pt:'cinzento',pos:'adj.',ipa:'/ɡreɪ/',ai:`É a cor do céu nublado. Em inglês britânico escreve-se grey; em americano, gray.`},
 pick:{pt:'escolher; apanhar (pick up: pegar em)',pos:'verbo',ipa:'/pɪk/',ai:`«Picked up» é o phrasal verb pick up: aqui significa pegar em algo que estava pousado. Noutros contextos pode ser apanhar alguém de carro ou aprender sem esforço.`},
 while:{pt:'momento, período (a while)',pos:'subst.',ipa:'/waɪl/',ai:`Em «after a while» = passado algum tempo. Aqui «while» é um substantivo (um período), não a conjunção «enquanto».`},
 mean:{pt:'querer dizer; tencionar',pos:'verbo',ipa:'/miːn/',ai:`«Had been meaning to read» = tencionava ler há muito tempo (e ainda não tinha lido). «Mean to + verbo» exprime intenção.`},
 finally:{pt:'finalmente, por fim',pos:'adv.',ipa:'/ˈfaɪnəli/',ai:`Indica que a chuva parou só depois de muito tempo. Sinónimos: at last, eventually. Atenção: «eventually» não é «eventualmente», é «por fim».`},
 decide:{pt:'decidir',pos:'verbo',ipa:'/dɪˈsaɪd/',ai:`«Decided to stay» = decidiu ficar. Depois de decide usa-se to + infinitivo.`},
 struggle:{pt:'ter dificuldade; lutar',pos:'verbo',ipa:'/ˈstrʌɡl/',ai:`«Struggle to find time» = ter dificuldade em arranjar tempo. Struggle to + verbo indica esforço com resultado difícil.`},
 enjoy:{pt:'gostar de, desfrutar de',pos:'verbo',ipa:'/ɪnˈdʒɔɪ/',ai:`Verbo transitivo: gostar de algo que se lê. Depois de enjoy usa-se o gerúndio: enjoy reading.`},
 difference:{pt:'diferença',pos:'subst.',ipa:'/ˈdɪfrəns/',ai:`«Make a difference» = fazer diferença. Expressão fixa muito comum. Família: different, differently.`},
 guess:{pt:'adivinhar; supor',pos:'verbo',ipa:'/ɡes/',ai:`«Guess its meaning» = tentar adivinhar o significado. Em «I guess so» quer dizer «acho que sim».`},
 meaning:{pt:'significado',pos:'subst.',ipa:'/ˈmiːnɪŋ/',ai:`Substantivo de mean (querer dizer): o significado da palavra.`},
 context:{pt:'contexto',pos:'subst.',ipa:'/ˈkɒntekst/',ai:`O contexto é o texto à volta da palavra. Daí «from the context» = a partir do que está à volta.`},
 dictionary:{pt:'dicionário',pos:'subst.',ipa:'/ˈdɪkʃənri/',ai:`Plural: dictionaries. Em «checking a dictionary» o verbo check significa consultar.`},
 stick:{pt:'ficar, agarrar-se; pau',pos:'verbo',ipa:'/stɪk/',ai:`«Stick in your memory» = ficar na memória. Aqui stick é «agarrar-se». Também significa «pau» (substantivo) e «colar».`},
 memory:{pt:'memória',pos:'subst.',ipa:'/ˈmeməri/',ai:`Capacidade de lembrar. «In your memory» = na tua memória. No plural, memories são as recordações.`},
 afraid:{pt:'com medo',pos:'adj.',ipa:'/əˈfreɪd/',ai:`«Afraid of + gerúndio/nome»: ter medo de. Só se usa depois do verbo (be afraid), nunca antes do nome.`},
 mistake:{pt:'erro',pos:'subst.',ipa:'/mɪˈsteɪk/',ai:`«Make a mistake» é a combinação natural; não se diz «do a mistake».`},
 process:{pt:'processo',pos:'subst.',ipa:'/ˈprəʊses/',ai:`Sequência de passos até um resultado. Aqui sugere que aprender é um caminho com falhas.`},
 notice:{pt:'reparar, notar',pos:'verbo',ipa:'/ˈnəʊtɪs/',ai:`Aqui é verbo: notice that + frase. Também é substantivo (aviso, anúncio).`},
 become:{pt:'tornar-se',pos:'verbo',ipa:'/bɪˈkʌm/',ai:`«Becomes easier» = torna-se mais fácil. Become + adjetivo exprime mudança de estado. Irregular: become, became, become.`},
 enjoyable:{pt:'agradável',pos:'adj.',ipa:'/ɪnˈdʒɔɪəbl/',ai:`Que dá gosto fazer. Vem de enjoy + -able.`},
 nearly:{pt:'quase',pos:'adv.',ipa:'/ˈnɪəli/',ai:`«Nearly forty years» = quase quarenta anos (ainda não chegou aos 40).`},
 edge:{pt:'beira, limite',pos:'subst.',ipa:'/edʒ/',ai:`«At the edge of the cliff» = à beira da falésia.`},
 cliff:{pt:'falésia, penhasco',pos:'subst.',ipa:'/klɪf/',ai:`Rocha alta e vertical junto ao mar.`},
 tend:{pt:'cuidar de; tender a',pos:'verbo',ipa:'/tend/',ai:`Aqui «tend» é cuidar de (tend the lighthouse). Existe também «tend to + verbo» = costumar, ter tendência para.`},
 lighthouse:{pt:'farol',pos:'subst.',ipa:'/ˈlaɪthaʊs/',ai:`Farol de navegação (light + house).`},
 rely:{pt:'depender, contar com',pos:'verbo',ipa:'/rɪˈlaɪ/',ai:`«Relied on him» = dependiam dele. Rely on + pessoa ou coisa. Sinónimo: depend on.`},
 pointless:{pt:'inútil, sem sentido',pos:'adj.',ipa:'/ˈpɔɪntləs/',ai:`Formado por point + -less (sem ponto, sem objetivo).`},
 yet:{pt:'ainda assim; ainda',pos:'adv.',ipa:'/jet/',ai:`No início da frase, «yet» funciona como «ainda assim». Em frases negativas e perguntas significa «ainda» (not yet).`},
 climb:{pt:'subir, trepar',pos:'verbo',ipa:'/klaɪm/',ai:`O b de climb não se pronuncia.`},
 narrow:{pt:'estreito',pos:'adj.',ipa:'/ˈnærəʊ/',ai:`Oposto: wide.`},
 stair:{pt:'degrau; escadas (stairs)',pos:'subst.',ipa:'/steə/',ai:`No plural, stairs = escadas. Um único degrau é a stair ou a step.`},
 light:{pt:'acender; luz',pos:'verbo',ipa:'/laɪt/',ai:`«Lit the lamp» = acendeu o candeeiro. Verbo irregular: light, lit, lit.`},
 lamp:{pt:'candeeiro, lâmpada',pos:'subst.',ipa:'/læmp/',ai:`Aqui é a luz do farol.`},
 habit:{pt:'hábito',pos:'subst.',ipa:'/ˈhæbɪt/',ai:`«Out of habit» = por hábito, sem pensar.`},
 stormy:{pt:'de tempestade, tempestuoso',pos:'adj.',ipa:'/ˈstɔːmi/',ai:`Storm + -y, como em rainy.`},
 drift:{pt:'ir à deriva',pos:'verbo',ipa:'/drɪft/',ai:`Mover-se sem controlo, levado pela água ou pelo vento.`},
 dangerously:{pt:'perigosamente',pos:'adv.',ipa:'/ˈdeɪndʒərəsli/',ai:`«Dangerously close» = perigosamente perto.`},
 fog:{pt:'nevoeiro',pos:'subst.',ipa:'/fɒɡ/',ai:`Mais denso e baixo do que «mist» (neblina).`},
 crew:{pt:'tripulação',pos:'subst.',ipa:'/kruː/',ai:`Equipa de um barco ou avião.`},
 spot:{pt:'avistar; mancha, sítio',pos:'verbo',ipa:'/spɒt/',ai:`Aqui é verbo: avistar, dar com. Como substantivo significa mancha ou lugar.`},
 faint:{pt:'ténue, fraco',pos:'adj.',ipa:'/feɪnt/',ai:`Quase impercetível: uma luz, um som ou um cheiro faint.`},
 beam:{pt:'feixe de luz',pos:'subst.',ipa:'/biːm/',ai:`Também significa viga (de madeira).`},
 steer:{pt:'guiar, conduzir',pos:'verbo',ipa:'/stɪə/',ai:`«Steer away» = desviar-se de. Usa-se com barcos e carros.`},
 peacefully:{pt:'em paz, tranquilamente',pos:'adv.',ipa:'/ˈpiːsfəli/',ai:`Peace + -ful + -ly.`},
 check:{pt:'consultar, verificar',pos:'verbo',ipa:'/tʃek/',ai:`«Checking a dictionary» = consultar um dicionário.`},
 find:{pt:'encontrar; descobrir (find out)',pos:'verbo',ipa:'/faɪnd/',ai:`«Found out» (find out) = descobrir uma informação. Sozinho, find é encontrar.`}
};
/* palavras básicas: tradução simples (consideradas conhecidas por defeito) */
const PT={};
`it=ele, ela (neutro)
be=ser, estar
a=um, uma
an=um, uma
sunday=domingo
so=por isso
stay=ficar
at=em, a
home=casa
she=ela
make=fazer
cup=chávena
of=de
tea=chá
and=e
look=olhar
out=fora
window=janela
the=o, a
street=rua
sky=céu
after=depois de
up=para cima
old=velho
book=livro
that=que
have=ter
to=para, a
read=ler
for=para, durante
month=mês
first=primeiro
story=história
feel=sentir
slow=lento
but=mas
soon=em breve, depressa
can=poder, conseguir
not=não
put=pôr, pousar
down=para baixo
when=quando
rain=chuva
stop=parar
already=já
dark=escuro
outside=lá fora
smile=sorrir
perfect=perfeito
day=dia
many=muitos
people=pessoas
want=querer
learn=aprender
english=inglês
they=eles, elas
time=tempo
good=bom
news=notícias
you=tu, você
do=fazer (auxiliar)
need=precisar
hour=hora
every=cada, todos os
real=real, verdadeiro
each=cada
meet=encontrar, conhecer
new=novo
word=palavra
try=tentar
its=o seu, a sua (de algo)
from=de, a partir de
before=antes de
over=ao longo de, sobre
see=ver
again=outra vez
will=(auxiliar do futuro)
in=em
your=teu, tua
part=parte
little=pouco, pequeno
by=por
easy=fácil
more=mais
something=algo
long=longo, muito tempo
no=não, nenhum
forty=quarenta
year=ano
live=viver
alone=sozinho
ship=navio
on=em, sobre
him=ele (complemento)
he=ele
his=o seu, a sua (dele)
since=uma vez que, desde
modern=moderno
technology=tecnologia
work=trabalho
almost=quase
evening=fim de tarde
one=um
night=noite
small=pequeno
fishing=pesca
boat=barco
close=perto
rock=rocha
through=através de
away=para longe
just=mesmo, apenas
nobody=ninguém
ever=alguma vez
who=quem
save=salvar
them=eles, os
sleep=dormir
fifteen=quinze
minute=minuto
find=encontrar, descobrir`.split('\n').forEach(r=>{const i=r.indexOf('=');if(i>0)PT[r.slice(0,i)]=r.slice(i+1);});
const COMMON=new Set(`i me my we our us this these those there here what which whom whose where why how all any some none other another such only own same than too very should now also then if or because as until about into under between during above below off further once most both few nor yes would may might must shall has did does doing having go goes went gone going get got know knew think thought take took come came use give tell call ask leave keep let begin seem help talk turn start show hear play run move like believe hold bring happen write provide sit stand lose pay include continue set understand watch follow create speak allow add spend grow open walk win offer remember love consider appear buy wait serve send expect build fall cut reach remain man woman child world life hand place week case point company number group problem fact house car city friend family water room money right study eye job business side kind head service father power game line end member law community name team idea body information back face level office door health person art war history result morning reason air force education last great big high different large next early young important public bad able`.split(/\s+/));
const NAMES=new Set(['maya','tom']);
const FORMS={was:'be',were:'be',is:'be',are:'be',am:'be',been:'be',being:'be',had:'have',made:'make',felt:'feel',could:'can',slept:'sleep',found:'find',lit:'light',relied:'rely',easier:'easy',longer:'long',"don't":'do',"doesn't":'do',"didn't":'do',"can't":'can',"won't":'will',"it's":'it',"i'm":'i'};
const OVR={'t1s4:meaning':'mean'};

/* ---------- processamento de texto ---------- */
function tokenize(text){const out=[];const re=/([A-Za-z]+(?:['’][A-Za-z]+)*)|([^A-Za-z]+)/g;let m;while((m=re.exec(text))){out.push(m[1]?{w:m[1]}:{p:m[2]});}return out;}
function known(x){return !!(DICT[x]||PT[x]||COMMON.has(x)||NAMES.has(x));}
function lemma(w,sid){
  const l=w.toLowerCase().replace(/’/g,"'");
  const o=OVR[sid+':'+l];if(o)return o;
  if(known(l))return l;
  if(FORMS[l])return FORMS[l];
  const c=[l.replace(/ies$/,'y'),l.replace(/s$/,''),l.replace(/es$/,''),l.replace(/ed$/,''),l.replace(/ed$/,'e'),l.replace(/([^aeiou])\1ed$/,'$1'),l.replace(/ing$/,''),l.replace(/ing$/,'e'),l.replace(/([^aeiou])\1ing$/,'$1'),l.replace(/ly$/,''),l.replace(/er$/,''),l.replace(/est$/,'')];
  for(const x of c){if(x!==l&&known(x))return x;}
  return l;
}
const TOK={};
function buildTok(sid){
  const toks=tokenize(SENT[sid].en);const words=[];
  toks.forEach((t,i)=>{if(t.w){t.l=lemma(t.w,sid);words.push(i);}});
  EXPR.forEach((x,xi)=>{
    if(x.s!==sid)return;
    for(let a=0;a+x.w.length<=words.length;a++){
      let ok=true;
      for(let b=0;b<x.w.length;b++){if(toks[words[a+b]].w.toLowerCase()!==x.w[b]){ok=false;break;}}
      if(ok){for(let b=0;b<x.w.length;b++)toks[words[a+b]].x=xi;break;}
    }
  });
  TOK[sid]=toks;
}
Object.keys(SENT).forEach(buildTok);
function isBasic(l){if(l.charAt(0)==='@'){const k=l.indexOf(':'),lg=l.slice(1,k),w=l.slice(k+1);return !!(BASICX[lg]&&BASICX[lg][w]!=null);}return !!(PT[l]||COMMON.has(l)||NAMES.has(l));}
function entry(l){const d=DICT[l];return{pt:(d&&d.pt)||PT[l]||null,pos:d&&d.pos,ipa:d&&d.ipa,ai:d&&d.ai};}

