
/* =========================================================
   Línguas: lista completa, segmentação de palavras em qualquer
   escrita e textos de exemplo noutras línguas.
   ========================================================= */
var LANGS=`af|Africânder|Afrikaans
sq|Albanês|Shqip
de|Alemão|Deutsch
am|Amárico|አማርኛ
ar|Árabe|العربية
hy|Arménio|Հայերեն
as|Assamês|অসমীয়া
ay|Aimará|Aymar aru
az|Azerbaijano|Azərbaycanca
bm|Bambara|Bamanankan
eu|Basco|Euskara
bn|Bengali|বাংলা
be|Bielorrusso|Беларуская
my|Birmanês|မြန်မာ
bs|Bósnio|Bosanski
bg|Búlgaro|Български
kn|Canarim|ಕನ್ನಡ
ca|Catalão|Català
kk|Cazaque|Қазақ
ceb|Cebuano|Cebuano
cs|Checo|Čeština
ny|Chichewa|Chichewa
zh|Chinês (simplificado)|中文（简体）
zh-TW|Chinês (tradicional)|中文（繁體）
si|Cingalês|සිංහල
ko|Coreano|한국어
co|Corso|Corsu
ht|Crioulo haitiano|Kreyòl ayisyen
hr|Croata|Hrvatski
ku|Curdo (curmânji)|Kurdî
ckb|Curdo (sorani)|کوردی
da|Dinamarquês|Dansk
sk|Eslovaco|Slovenčina
sl|Esloveno|Slovenščina
es|Espanhol|Español
eo|Esperanto|Esperanto
et|Estónio|Eesti
ee|Ewe|Eʋegbe
fil|Filipino|Filipino
fi|Finlandês|Suomi
fr|Francês|Français
fy|Frísio|Frysk
gd|Gaélico escocês|Gàidhlig
gl|Galego|Galego
cy|Galês|Cymraeg
lg|Ganda|Luganda
ka|Georgiano|ქართული
el|Grego|Ελληνικά
gn|Guarani|Avañe'ẽ
gu|Guzerate|ગુજરાતી
ha|Haúça|Hausa
haw|Havaiano|ʻŌlelo Hawaiʻi
he|Hebraico|עברית
hi|Hindi|हिन्दी
hmn|Hmong|Hmoob
nl|Neerlandês|Nederlands
hu|Húngaro|Magyar
ig|Igbo|Igbo
yi|Iídiche|ייִדיש
id|Indonésio|Bahasa Indonesia
en|Inglês|English
ga|Irlandês|Gaeilge
is|Islandês|Íslenska
it|Italiano|Italiano
ja|Japonês|日本語
jv|Javanês|Basa Jawa
km|Khmer|ខ្មែរ
rw|Kinyarwanda|Kinyarwanda
ky|Quirguiz|Кыргызча
lo|Laosiano|ລາວ
la|Latim|Latina
lv|Letão|Latviešu
ln|Lingala|Lingála
lt|Lituano|Lietuvių
lb|Luxemburguês|Lëtzebuergesch
mk|Macedónio|Македонски
ml|Malaiala|മലയാളം
ms|Malaio|Bahasa Melayu
mg|Malgaxe|Malagasy
mt|Maltês|Malti
mi|Maori|Te Reo Māori
mr|Marata|मराठी
mn|Mongol|Монгол
ne|Nepalês|नेपाली
no|Norueguês|Norsk
or|Oriá|ଓଡ଼ିଆ
om|Oromo|Afaan Oromoo
ps|Pashto|پښتو
fa|Persa|فارسی
pl|Polaco|Polski
pt|Português (Portugal)|Português
pt-BR|Português (Brasil)|Português (Brasil)
pa|Punjabi|ਪੰਜਾਬੀ
qu|Quíchua|Runa Simi
ro|Romeno|Română
ru|Russo|Русский
sm|Samoano|Gagana Sāmoa
sa|Sânscrito|संस्कृतम्
sr|Sérvio|Српски
st|Sesoto|Sesotho
sn|Shona|chiShona
sd|Sindi|سنڌي
so|Somali|Soomaali
sw|Suaíli|Kiswahili
sv|Sueco|Svenska
su|Sundanês|Basa Sunda
tg|Tajique|Тоҷикӣ
th|Tailandês|ไทย
ta|Tâmil|தமிழ்
tt|Tártaro|Татар
te|Telugu|తెలుగు
ti|Tigrínia|ትግርኛ
ts|Tsonga|Xitsonga
tr|Turco|Türkçe
tk|Turcomeno|Türkmençe
uk|Ucraniano|Українська
ug|Uigur|ئۇيغۇرچە
ur|Urdu|اردو
uz|Usbeque|Oʻzbekcha
vi|Vietnamita|Tiếng Việt
xh|Xhosa|isiXhosa
yo|Ioruba|Yorùbá
zu|Zulu|isiZulu`.split('\n').map(r=>{const p=r.split('|');return{code:p[0],pt:p[1],nat:p[2]};}).sort((a,b)=>a.pt.localeCompare(b.pt,'pt'));
var RTL={ar:1,he:1,fa:1,ur:1,ps:1,yi:1,sd:1,ug:1,ckb:1};
var NOSPACE={zh:1,'zh-TW':1,ja:1,th:1,lo:1,km:1,my:1};
var BCP={en:'en-GB',es:'es-ES',fr:'fr-FR',de:'de-DE',ja:'ja-JP',ar:'ar-SA',it:'it-IT',pt:'pt-PT','pt-BR':'pt-BR',zh:'zh-CN','zh-TW':'zh-TW',ko:'ko-KR',ru:'ru-RU',nl:'nl-NL',sv:'sv-SE',pl:'pl-PL',tr:'tr-TR',he:'he-IL',hi:'hi-IN',el:'el-GR',uk:'uk-UA'};
function langName(c){const l=LANGS.find(x=>x.code===c);return l?l.pt:c;}
function langNat(c){const l=LANGS.find(x=>x.code===c);return l?l.nat:c;}
var SENT_LANG={};
var DICTX={},BASICX={};

/* tokenização para qualquer língua */
function segWords(text,lang){
  const out=[];
  const push=(w,isW)=>{if(isW)out.push({w:w});else if(out.length&&out[out.length-1].p!=null)out[out.length-1].p+=w;else out.push({p:w});};
  try{
    if(typeof Intl!=='undefined'&&Intl.Segmenter){const sg=new Intl.Segmenter(lang,{granularity:'word'});for(const s of sg.segment(text))push(s.segment,!!s.isWordLike);return out;}
  }catch(e){}
  let re;try{re=new RegExp("([\\p{L}\\p{M}\\p{N}]+(?:['’][\\p{L}]+)*)|([^\\p{L}\\p{M}\\p{N}]+)","gu");}catch(e){re=/([A-Za-zÀ-ÿ]+)|([^A-Za-zÀ-ÿ]+)/g;}
  let m;while((m=re.exec(text))){if(m[1]&&NOSPACE[lang])Array.from(m[1]).forEach(ch=>push(ch,true));else push(m[1]||m[2],!!m[1]);}
  return out;
}
function lowerL(w,lang){try{return w.toLocaleLowerCase(lang);}catch(e){return w.toLowerCase();}}
function buildTokAny(sid){
  const lang=SENT_LANG[sid]||'en';
  if(lang==='en'){buildTok(sid);return;}
  const toks=segWords(SENT[sid].en,lang);const words=[];
  toks.forEach((t,i)=>{if(t.w){t.l='@'+lang+':'+lowerL(t.w,lang);words.push(i);}});
  EXPR.forEach((x,xi)=>{
    if(x.s!==sid)return;
    for(let a=0;a+x.w.length<=words.length;a++){
      let ok=true;for(let b=0;b<x.w.length;b++){if(lowerL(toks[words[a+b]].w,lang)!==x.w[b]){ok=false;break;}}
      if(ok){for(let b=0;b<x.w.length;b++)toks[words[a+b]].x=xi;break;}
    }
  });
  TOK[sid]=toks;
}
function langOfKey(l){
  if(l.charAt(0)==='@')return l.slice(1,l.indexOf(':'));
  if(l.indexOf('phrase:')===0){const v=typeof S!=='undefined'&&S.vocab[l];return v&&v.ctx?(SENT_LANG[v.ctx.sid]||'en'):'en';}
  return 'en';
}

/* textos de exemplo */
var LX=[
 {lang:'es',id:'es1',title:'Un café en Madrid',level:'A2',tag:'Dia a dia',blurb:'A Lucía tem um café de sempre. Hoje decide mudar.',
  s:[["Cada mañana, Lucía toma un café en una pequeña cafetería cerca de su casa.","Todas as manhãs, a Lucía toma um café num pequeno café perto de casa.","«Cada mañana» = todas as manhãs. «Cerca de» = perto de (e não «cerca de» em português, que é aproximadamente)."],
     ["El camarero ya sabe lo que ella quiere.","O empregado já sabe o que ela quer.","«Lo que» = o que. «Quiere» vem de querer, irregular: quiero, quieres, quiere."],
     ["Hoy, sin embargo, decide probar algo nuevo: un chocolate caliente con churros.","Hoje, no entanto, decide experimentar algo novo: um chocolate quente com churros.","«Sin embargo» = no entanto. «Probar» aqui é experimentar (provar comida também serve)."],
     ["Está tan rico que casi llega tarde al trabajo.","Está tão bom que quase chega atrasada ao trabalho.","«Tan… que» = tão… que. «Rico» com comida quer dizer saboroso, não rico de dinheiro."]],
  qs:[{q:'¿Qué toma Lucía cada mañana?',o:['Un café','Un té','Un zumo'],a:0},{q:'¿Por qué casi llega tarde?',o:['Porque pierde el autobús','Porque el chocolate está muy rico','Porque llueve'],a:1}],
  ex:[[2,['sin','embargo'],'no entanto']],
  d:{mañana:['manhã; amanhã','subst.','/maˈɲana/','Aqui é «manhã» (cada mañana). Sem artigo e como advérbio, «mañana» quer dizer amanhã.'],toma:['toma (de tomar)','verbo','/ˈtoma/','Tomar um café, como em português. Presente: tomo, tomas, toma.'],pequeña:['pequena','adj.','/peˈkeɲa/','Feminino de pequeño, porque concorda com «cafetería».'],cafetería:['café, cafetaria','subst.','/kafeteˈɾia/','O espaço onde se bebe café. A bebida é «café».'],cerca:['perto','adv.','/ˈθeɾka/','Falso amigo: «cerca de» = perto de. Para «aproximadamente» diz-se «unos» ou «alrededor de».'],camarero:['empregado de mesa','subst.','/kamaˈɾeɾo/','Em Espanha diz-se camarero; na América Latina, mesero ou mozo.'],sabe:['sabe (de saber)','verbo','/ˈsaβe/','Saber: sé, sabes, sabe. A primeira pessoa é irregular.'],quiere:['quer (de querer)','verbo','/ˈkjeɾe/','Querer muda e → ie: quiero, quieres, quiere.'],probar:['experimentar, provar','verbo','/pɾoˈβaɾ/','Experimentar algo pela primeira vez.'],nuevo:['novo','adj.','/ˈnweβo/','Algo nuevo = algo novo.'],caliente:['quente','adj.','/kaˈljente/','Temperatura. Para o tempo atmosférico usa-se «calor»: hace calor.'],rico:['saboroso; rico','adj.','/ˈriko/','Com comida, «rico» quer dizer delicioso.'],casi:['quase','adv.','/ˈkasi/','Casi llega tarde = quase chega atrasada.'],llega:['chega (de llegar)','verbo','/ˈʎeɣa/','Llegar tarde = chegar atrasado.'],tarde:['tarde; atrasado','adv.','/ˈtaɾde/','Como advérbio: tarde. Como nome: a tarde.'],trabajo:['trabalho','subst.','/tɾaˈβaxo/','Al trabajo = para o trabalho (a + el = al).']},
  b:'cada=cada|lucía=Lucía|un=um|café=café|en=em|una=uma|de=de|su=seu, sua|casa=casa|el=o|ya=já|lo=o|que=que|ella=ela|hoy=hoje|sin=sem|embargo=(sin embargo) no entanto|decide=decide|algo=algo|chocolate=chocolate|con=com|churros=churros|está=está|tan=tão|al=ao'},
 {lang:'fr',id:'fr1',title:'Le marché du samedi',level:'A2',tag:'Dia a dia',blurb:'Paul e a avó conhecem todas as bancas do mercado.',
  s:[["Le samedi, Paul va au marché avec sa grand-mère.","Ao sábado, o Paul vai ao mercado com a avó.","«Le samedi» com artigo = todos os sábados, por hábito. «Au» = à + le."],
     ["Ils achètent des légumes frais, du fromage et du pain chaud.","Compram legumes frescos, queijo e pão quente.","«Du» e «des» são partitivos: indicam uma quantidade indefinida. Em português ficam sem artigo."],
     ["Sa grand-mère connaît tous les vendeurs par leur prénom.","A avó conhece todos os vendedores pelo nome.","«Connaît» (connaître) é conhecer pessoas ou sítios. Para saber factos usa-se «savoir»."],
     ["Après, ils boivent un chocolat sur une terrasse ensoleillée.","Depois, bebem um chocolate numa esplanada soalheira.","«Boivent» é de boire (beber), irregular: je bois, ils boivent."]],
  qs:[{q:'Avec qui Paul va-t-il au marché ?',o:['Avec son père','Avec sa grand-mère','Seul'],a:1},{q:'Que boivent-ils après ?',o:['Un café','Un jus','Un chocolat'],a:2}],
  ex:[[0,['grand','mère'],'avó'],[2,['grand','mère'],'avó']],
  d:{samedi:['sábado','subst.','/sam.di/','Os dias da semana em francês escrevem-se com minúscula.'],marché:['mercado','subst.','/maʁ.ʃe/','Também «marché aux puces» = feira da ladra.'],achètent:['compram (de acheter)','verbo','/a.ʃɛt/','Acheter ganha acento grave quando a terminação é muda: j’achète, ils achètent.'],légumes:['legumes','subst.','/le.ɡym/','Masculino em francês: des légumes frais.'],frais:['frescos','adj.','/fʁɛ/','Fresco (acabado de colher) e também fresco de temperatura.'],fromage:['queijo','subst.','/fʁɔ.maʒ/','Du fromage = queijo (quantidade indefinida).'],pain:['pão','subst.','/pɛ̃/','Som nasal: /pɛ̃/.'],chaud:['quente','adj.','/ʃo/','O «d» final não se pronuncia.'],connaît:['conhece (de connaître)','verbo','/kɔ.nɛ/','Conhecer pessoas, lugares. Para factos: savoir.'],vendeurs:['vendedores','subst.','/vɑ̃.dœʁ/','De vendre (vender) + -eur.'],prénom:['nome próprio','subst.','/pʁe.nɔ̃/','Prénom = primeiro nome; nom = apelido.'],boivent:['bebem (de boire)','verbo','/bwav/','Boire: je bois, nous buvons, ils boivent.'],terrasse:['esplanada','subst.','/tɛ.ʁas/','A esplanada de um café.'],ensoleillée:['soalheira','adj.','/ɑ̃.sɔ.le.je/','De soleil (sol). Concorda com terrasse (feminino).']},
  b:'le=o|paul=Paul|va=vai|au=ao|avec=com|sa=a sua|grand=grande|mère=mãe|ils=eles|des=uns, umas|du=do; algum|et=e|tous=todos|les=os, as|par=por|leur=o seu (deles)|après=depois|un=um|chocolat=chocolate|sur=sobre, em|une=uma'},
 {lang:'de',id:'de1',title:'Ein Tag im Park',level:'A2',tag:'Dia a dia',blurb:'Um domingo de sol, um livro e um cão com ideias próprias.',
  s:[["Am Sonntag geht Anna mit ihrem Hund in den Park.","No domingo, a Anna vai ao parque com o cão.","O verbo fica em segunda posição: Am Sonntag (1) geht (2) Anna. «In den Park» leva acusativo porque há movimento."],
     ["Die Sonne scheint, und viele Kinder spielen auf der Wiese.","O sol brilha e muitas crianças brincam no relvado.","«Auf der Wiese» leva dativo: é onde estão, sem movimento."],
     ["Anna setzt sich auf eine Bank und liest ein Buch.","A Anna senta-se num banco e lê um livro.","«Sich setzen» é reflexo: sentar-se. «Bank» é banco de jardim e também banco de dinheiro."],
     ["Plötzlich läuft der Hund weg, weil er eine Katze sieht.","De repente, o cão foge, porque vê um gato.","«Weglaufen» é um verbo separável: a partícula «weg» vai para o fim. Depois de «weil», o verbo também vai para o fim: weil er eine Katze sieht."]],
  qs:[{q:'Wohin geht Anna am Sonntag?',o:['In den Park','In die Schule','Ins Kino'],a:0},{q:'Warum läuft der Hund weg?',o:['Er hat Hunger','Er sieht eine Katze','Es regnet'],a:1}],
  ex:[[2,['setzt','sich'],'senta-se (sich setzen)']],
  d:{sonntag:['domingo','subst.','/ˈzɔntaːk/','Am Sonntag = no domingo. Todos os nomes alemães levam maiúscula.'],geht:['vai (de gehen)','verbo','/ɡeːt/','Gehen = ir a pé. De carro diz-se fahren.'],hund:['cão','subst.','/hʊnt/','Der Hund. O «d» final soa como «t».'],sonne:['sol','subst.','/ˈzɔnə/','Die Sonne é feminino em alemão.'],scheint:['brilha (de scheinen)','verbo','/ʃaɪ̯nt/','Die Sonne scheint = está sol. Scheinen também quer dizer «parecer».'],kinder:['crianças','subst.','/ˈkɪndɐ/','Plural de das Kind.'],spielen:['brincar, jogar','verbo','/ˈʃpiːlən/','Sp no início soa «chp».'],wiese:['relvado, prado','subst.','/ˈviːzə/','Die Wiese.'],setzt:['senta (de setzen)','verbo','/zɛt͡st/','Sich setzen = sentar-se (ação). Sitzen = estar sentado.'],bank:['banco','subst.','/baŋk/','Plural de banco de jardim: Bänke; de banco de dinheiro: Banken.'],liest:['lê (de lesen)','verbo','/liːst/','Lesen muda e → ie: ich lese, er liest.'],plötzlich:['de repente','adv.','/ˈplœt͡slɪç/','Muito comum em histórias.'],läuft:['corre (de laufen)','verbo','/lɔʏ̯ft/','Läuft … weg = foge (weglaufen).'],weg:['embora, fora','adv.','/vɛk/','Partícula de weglaufen: ir-se embora a correr.'],weil:['porque','conj.','/vaɪ̯l/','Depois de weil o verbo vai para o fim da frase.'],katze:['gato','subst.','/ˈkat͡sə/','Die Katze é feminino.'],sieht:['vê (de sehen)','verbo','/ziːt/','Sehen: ich sehe, er sieht.']},
  b:'am=no (an dem)|anna=Anna|mit=com|ihrem=o seu (dela)|in=em, para|den=o (acusativo)|park=parque|die=a|und=e|viele=muitos|auf=em, sobre|der=o|sich=se|eine=uma|ein=um|buch=livro|er=ele'},
 {lang:'ja',id:'ja1',title:'雨の日',level:'A2',tag:'Conto',blurb:'Um dia de chuva, um livro e chá quente. Em japonês simples (N5).',
  s:[["今日は朝から雨が降っています。","Hoje está a chover desde manhã.","「〜ています」 indica uma ação em curso: está a chover. 「から」 = desde."],
     ["私は家で本を読みます。","Eu leio um livro em casa.","Ordem japonesa: sujeito は, lugar で, objeto を, verbo no fim."],
     ["温かいお茶を飲みながら、窓の外を見ます。","Enquanto bebo um chá quente, olho para fora da janela.","「〜ながら」 junta duas ações ao mesmo tempo: 飲みながら = enquanto bebo."],
     ["静かな一日です。","É um dia tranquilo.","静か é um adjetivo -na: liga-se ao nome com な (静かな一日)."]],
  qs:[{q:'今日の天気は？',o:['雨','晴れ','雪'],a:0},{q:'何を飲みますか。',o:['コーヒー','お茶','水'],a:1}],
  ex:[[0,['降','って','い','ます'],'está a chover (forma contínua)']],
  d:{'朝':['manhã','subst.','asa','朝から = desde a manhã.'],'雨':['chuva','subst.','ame','雨が降る = chover (a chuva cai).'],'降':['cair (chuva, neve)','verbo','furu','降る só se usa para coisas que caem do céu.'],'家':['casa','subst.','ie / uchi','家で = em casa. で marca o lugar da ação.'],'本':['livro','subst.','hon','本を読む = ler um livro.'],'読み':['ler (読む)','verbo','yomi','Forma -masu de 読む (yomu).'],'温かい':['quente, morno','adj.','atatakai','Quente de forma agradável (bebida, pessoa).'],'お茶':['chá','subst.','ocha','O お é um prefixo de cortesia.'],'飲':['beber (飲む)','verbo','nomu','飲みながら = enquanto bebe.'],'ながら':['enquanto','partícula','nagara','Liga-se à forma -masu sem ます: 飲み + ながら.'],'窓':['janela','subst.','mado','窓の外 = fora da janela.'],'外':['fora, exterior','subst.','soto','O contrário é 中 (naka, dentro).'],'見':['ver (見る)','verbo','miru','見ます = vejo, olho.'],'静か':['tranquilo, silencioso','adj.','shizuka','Adjetivo -na.'],'一日':['um dia','subst.','ichinichi','Também quer dizer «o dia todo».']},
  b:'今日=hoje (kyō)|は=partícula de tema (wa)|から=desde (kara)|が=partícula de sujeito (ga)|って=forma -te do verbo|い=parte de いる (estar)|ます=terminação educada (masu)|私=eu (watashi)|で=em (lugar da ação)|を=partícula de objeto (o)|み=parte do verbo|の=de (no)|な=liga adjetivo -na|です=é (desu)'},
 {lang:'ar',id:'ar1',title:'في المكتبة',level:'A2',tag:'Dia a dia',blurb:'Sábados na biblioteca, histórias curtas e café com uma amiga. Árabe padrão.',
  s:[["أذهب إلى المكتبة كل يوم سبت.","Vou à biblioteca todos os sábados.","«كل يوم سبت» (kull yawm sabt) = todos os sábados, literalmente «cada dia de sábado»."],
     ["أحب قراءة القصص القصيرة.","Gosto de ler contos.","O adjetivo vem depois do nome e também leva «ال»: القصص القصيرة = as histórias curtas."],
     ["المكتبة هادئة وجميلة.","A biblioteca é tranquila e bonita.","Em árabe não há verbo «ser» no presente: المكتبة هادئة = a biblioteca [é] tranquila. «و» (wa, e) cola-se à palavra seguinte."],
     ["بعد القراءة، أشرب القهوة مع صديقتي.","Depois da leitura, bebo café com a minha amiga.","«ـي» no fim de صديقتي = minha. صديقة = amiga."]],
  qs:[{q:'متى أذهب إلى المكتبة؟',o:['كل يوم سبت','كل يوم أحد','كل يوم'],a:0},{q:'ماذا أشرب بعد القراءة؟',o:['الشاي','القهوة','الماء'],a:1}],
  ex:[],
  d:{'أذهب':['vou (ذهب, ir)','verbo','adhhabu','O prefixo أ marca a 1.ª pessoa: eu vou.'],'المكتبة':['a biblioteca','subst.','al-maktaba','Da raiz ك-ت-ب (escrever): كتاب = livro, مكتب = escritório.'],'يوم':['dia','subst.','yawm','يوم سبت = dia de sábado.'],'سبت':['sábado','subst.','sabt','Da mesma origem que «sabat».'],'أحب':['gosto, amo','verbo','uḥibbu','أحب + nome verbal = gostar de fazer algo.'],'قراءة':['leitura, ler','subst.','qirāʾa','Nome verbal de قرأ (ler).'],'القصص':['as histórias','subst.','al-qiṣaṣ','Plural de قصة (qiṣṣa).'],'القصيرة':['as curtas','adj.','al-qaṣīra','Concorda com القصص: plural de coisas usa adjetivo feminino singular.'],'هادئة':['tranquila','adj.','hādiʾa','Feminino porque المكتبة é feminino (termina em ة).'],'وجميلة':['e bonita','adj.','wa-jamīla','و (e) + جميلة (bonita).'],'القراءة':['a leitura','subst.','al-qirāʾa','قراءة com o artigo ال.'],'أشرب':['bebo','verbo','ashrabu','De شرب (beber).'],'القهوة':['o café','subst.','al-qahwa','A palavra «café» vem do árabe قهوة.'],'صديقتي':['a minha amiga','subst.','ṣadīqatī','صديقة (amiga) + ي (minha).']},
  b:'إلى=para, a (ilā)|كل=cada, todo (kull)|بعد=depois de (baʿda)|مع=com (maʿa)'}
];
LX.forEach(x=>{
  DICTX[x.lang]=DICTX[x.lang]||{};BASICX[x.lang]=BASICX[x.lang]||{};
  Object.keys(x.d).forEach(k=>{const v=x.d[k];DICTX[x.lang][k]={pt:v[0],pos:v[1],ipa:v[2],ai:v[3]};});
  x.b.split('|').forEach(p=>{const i=p.indexOf('=');BASICX[x.lang][p.slice(0,i)]=p.slice(i+1);});
  const ids=x.s.map((s,i)=>{const sid=x.id+'s'+(i+1);SENT[sid]={en:s[0],pt:s[1],ai:s[2]};SENT_LANG[sid]=x.lang;return sid;});
  (x.ex||[]).forEach(e=>EXPR.push({s:ids[e[0]],w:e[1],pt:e[2]}));
  ids.forEach(buildTokAny);
  const paras=ids.length>3?[ids.slice(0,2),ids.slice(2)]:[ids];
  LESSONS.push({id:x.id,lang:x.lang,title:x.title,level:x.level,tag:x.tag,paras:paras,qs:x.qs});
  META[x.id]={coll:'Em '+langName(x.lang).toLowerCase(),author:'Glosa Originais',blurb:x.blurb};
});
LESSONS.forEach(L=>{if(!L.lang)L.lang='en';});
