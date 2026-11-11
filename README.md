# Glosa

App para aprender línguas a ler: junta as ideias do **Readlang** (tocar numa palavra para a traduzir, cartões automáticos com a frase) e do **LingQ** (estados das palavras, percentagem conhecida de cada texto, biblioteca e áudio).

> Estado: **demo funcional**. Corre inteiro no navegador, num único ficheiro `index.html`. Os textos de exemplo trazem traduções e explicações pré-escritas; para qualquer outro texto, a IA traduz e explica (ver «IA e voz»).

## Como abrir

Abre o `index.html` num navegador (Chrome, Edge, Firefox ou Safari recentes). Não precisa de instalação.

Os dados ficam guardados no navegador (localStorage). Usa **Definições → Cópia de segurança** para os levar para outro dispositivo.

## IA e voz

O app escolhe sozinho a melhor opção disponível:

| Onde abres o app | IA | Voz | Microfone |
|---|---|---|---|
| Dentro do Claude (artefacto), no Chrome ou na app de computador | Claude, sem configurar nada | Vozes do Claude (4 vozes) | Ditado e «gravar a minha leitura» |
| Dentro do Claude, no Safari ou nas apps móveis | Claude | Voz do dispositivo | — |
| Fora do Claude (GitHub Pages, ficheiro local) | Gemini, com a tua chave grátis | Voz do dispositivo | — |
| Sem nenhuma das anteriores | Respostas de exemplo | Voz do dispositivo | — |

A IA traduz palavras e frases que não estão no dicionário, explica em contexto, responde a perguntas e corrige as tuas traduções na secção Praticar. As respostas ficam guardadas para não repetir pedidos.

**Chave do Gemini (fora do Claude):** cria uma chave grátis em https://aistudio.google.com/apikey e cola-a em Definições → IA e voz. Fica só no teu navegador e não entra na cópia de segurança.

**Vozes do dispositivo:**
- Android: Definições → Sistema → Idiomas → Saída de texto para voz → Serviços de voz da Google → instalar dados de voz.
- Windows 11: Definições → Hora e idioma → Voz → Gerir vozes → Adicionar vozes.

## O que já funciona

**Ler**
- Toca numa palavra: tradução, pronúncia, explicação em contexto (IA pré-escrita) e nota pessoal.
- Estados das palavras: nova, a aprender (1 a 4), conhecida e ignorada, com cores no texto.
- Expressões e phrasal verbs sublinhados; arrastar sobre várias palavras guarda uma expressão.
- Percentagem de palavras conhecidas por texto, glossário "antes de ler" e leitura contínua.
- Voz do dispositivo, frase a frase, com a palavra destacada; temas papel, sépia e noite.

**Importar** (com deteção automática da língua e livros divididos em partes)
- PDF com texto (carrega o pdf.js a partir do cdnjs na primeira vez).
- EPUB, Word (.docx), OpenDocument (.odt), RTF.
- HTML, Markdown, legendas (.srt, .vtt) e texto (.txt), ou texto colado.

**Rever e praticar**
- Cartões com repetição espaçada em 4 modos: virar, lacuna, escolha múltipla e ouvir.
- Sugestão de pausa quando falhas muitos cartões seguidos; exportação para o Anki.
- Tradução inversa, ditado e "ouvir e repetir" (shadowing), com correção palavra a palavra.

**Dados**
- Metas diárias, resumo semanal, mapa de atividade, palavras lidas por dia e vocabulário ao longo do tempo.
- Curva de esquecimento pessoal, previsão de revisões, vocabulário por tema, onde falhas mais, nível estimado (QECR) e tempo até ao próximo nível.
- Relatório mensal.

**Línguas**
- 123 línguas no seletor; o leitor separa palavras em qualquer escrita (incluindo chinês, japonês e tailandês) e suporta escrita da direita para a esquerda.
- Textos de exemplo em inglês, espanhol, francês, alemão, japonês e árabe.

## Estrutura

```
src/
  shell.html     HTML e CSS (design, temas claro/escuro)
  data.js        textos em inglês, dicionário e tokenização
  data-extra.js  mais textos, temas e mini-lições
  langs.js       lista de línguas, segmentação de palavras, textos noutras línguas
  app.js         núcleo: estado, navegação, Hoje, Leitor, Biblioteca, Rever, Palavras, Progresso, Definições
  app2.js        Praticar, leitura contínua, gráficos extra, relatório, seletor de línguas
  import.js      importação de ficheiros e cópia de segurança
  ai.js          IA (Claude ou Gemini), vozes do Claude, ditado e downloads
  boot.js        arranque
build.js         junta tudo em index.html
index.html       o app pronto a abrir
tests/           testes no navegador (Playwright) e ficheiros de exemplo
```

Depois de editar algo em `src/`, gera de novo o `index.html`:

```bash
node build.js
```

## Testes

Os testes abrem o app num Chrome real, numa moldura isolada igual à do artefacto, e clicam em todas as secções.

```bash
pip install playwright
python -m playwright install chromium   # se não tiveres o Chrome instalado
cd tests
python test_geral.py
python test_praticar_dados.py
python test_linguas.py
python test_ia_voz.py      # IA, voz, microfone e downloads com um Claude simulado
python test_gemini.py     # IA pelo Gemini com respostas simuladas
python test_importar.py   # para testar PDF sem internet: npm i pdfjs-dist e PDFJS_DIR=node_modules/pdfjs-dist/legacy/build/
```

As capturas de ecrã ficam em `tests/shots/` (ignorado pelo git).

## Próximos passos (versão real)

- Tradução dedicada (DeepL API Free, Argos/LibreTranslate) como alternativa à IA.
- Conta e sincronização (Supabase ou Firebase), modo offline (PWA) e app Android.
- Extensão do browser para ler qualquer página; YouTube por link.
- OCR para PDFs digitalizados e imagens; transcrição de áudio e vídeo com Whisper.
- Gravação da voz no shadowing fora do Chrome; algoritmo FSRS; lematização completa para todas as línguas.
- Interface traduzida para outras línguas.
