# Larzelo — landing page

Site estático em português, sem instalação de dependências e sem etapa de build. HTML, CSS, JavaScript e ilustração SVG locais. Pode ser aberto diretamente pelo index.html ou servido por qualquer hospedagem estática. Criado para o repositório https://github.com/Bielmonteiro1011-png/Lendingpage.

## Estado do repositório

Na consulta de 01/10/2026 UTC (30/09 em Recife), a API informou default_branch main, size 0 e retornou “This repository is empty.” ao consultar o conteúdo. Não existiam arquivos para reaproveitar. A versão inicial foi preparada para publicação; veja os commits e a hospedagem para o estado atual.

## Configuração atual

WhatsApp comercial: (81) 99472-4760. Atendimento exclusivamente em Caruaru/PE. O contato pode ser alterado em `assets/js/config.js`.

A versão pública do repositório usa a logo; o retrato está somente na hospedagem privada, aguardando autorização para exposição pública. O formulário permite até 10 tipos de peças no mesmo pedido, com quantidade por item, lugares/modelo para sofás e tamanho para colchões. Não calcula preço ou grava dados. O visitante confirma o envio dentro do WhatsApp; as fotos são enviadas na conversa.

A galeria antes/depois aguarda fotos reais. A audiência da hospedagem permanece privada até liberação do proprietário.

## Arquivos

| Caminho | Função |
| --- | --- |
| `index.html` | Conteúdo, metadados, navegação, serviços, FAQ e formulário |
| `assets/css/styles.css` | Identidade visual, responsividade e acessibilidade |
| `assets/js/config.js` | Número comercial do WhatsApp |
| `assets/js/app.js` | Menu, seleção de serviços, validação e mensagem |
| `assets/img/living-room.svg` | Ilustração vetorial original da sala |
| `assets/img/favicon.svg` | Ícone do site |
| `.nojekyll` | Publicação de arquivos estáticos no GitHub Pages |
| `.gitignore` | Exclusão de arquivos locais desnecessários |

A identidade desta versão combina verde profundo, marfim, detalhes em verde claro e títulos com contraste tipográfico. A logo oficial enviada está aplicada no cabeçalho, rodapé e favicon. A marca está aplicada na abertura desta versão do repositório; não há imagens de resultados inventados. Não foram inventados depoimentos, avaliações, preços, resultados ou garantias.

## Aplicar pelo navegador

1. Extraia o ZIP e abra a pasta `Lendingpage`.
2. Configure o WhatsApp em `assets/js/config.js`.
3. Abra seu repositório no GitHub. Na página do repositório vazio, use o link para enviar um arquivo existente (uploading an existing file).
4. Envie o CONTEÚDO da pasta `Lendingpage`, preservando a pasta `assets`. O `index.html` precisa estar diretamente na raiz do repositório, não dentro de outra pasta `Lendingpage`.
5. Confirme o primeiro commit na branch `main`. Se o seletor de arquivos ocultar `.nojekyll` e `.gitignore`, crie esses arquivos pela interface ou use o terminal abaixo. `.nojekyll` pode ser vazio.

## Aplicar pelo terminal

Na pasta `Lendingpage` extraída, execute:

```bash
git init -b main
git remote add origin https://github.com/Bielmonteiro1011-png/Lendingpage.git
git add .
git commit -m "Cria landing page inicial da Larzelo"
git push -u origin main
```

É necessário autenticar-se no GitHub. Nunca coloque tokens dentro destes arquivos. Estes comandos pressupõem que o repositório remoto continue vazio. Se alguém tiver criado arquivos, clone o repositório, copie os arquivos deste pacote para dentro dele e faça o commit; não use force push.

## Publicar no GitHub Pages

Após o primeiro commit, acesse **Settings → Pages**. Em **Build and deployment**, selecione **Deploy from a branch**, branch **main** e pasta **/(root)**. Clique **Save** e acompanhe o processamento em Actions/Pages.

Endereço esperado após ativação: https://bielmonteiro1011-png.github.io/Lendingpage/

Todos os caminhos de assets são relativos, permitindo hospedar na subpasta `/Lendingpage/`. Não há comando de build. Para outra hospedagem estática, publique a pasta que contém `index.html`.

Documentação consultada: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## Conferência antes do lançamento

- Preencher e confirmar o número comercial real.
- Abrir no celular e testar se o WhatsApp mostra o destinatário correto antes de enviar.
- Revisar serviços adicionais conforme sua disponibilidade; estão apresentados sob consulta.
- Revisar redação, identidade visual e bairro de atendimento.
- Se adicionar analytics, banco de dados ou novas formas de coleta, atualizar a informação de privacidade.

## Prévia local

Abra `index.html` no navegador. Opcionalmente, com Python instalado, execute na pasta do projeto:

```bash
python -m http.server 8000
```

Abra http://localhost:8000. Para interromper, Ctrl+C.

## Verificações realizadas

Passaram a checagem de sintaxe JavaScript, referências locais, âncoras, IDs únicos e leitura dos SVGs. A lógica do formulário foi executada em DOM simulado, cobrindo contato ausente, campos, acentos, codificação da URL e link alternativo. Nenhuma mensagem foi enviada. A conferência visual em navegador não pôde ser concluída: não havia navegador instalado e o download do Chromium falhou. Portanto, confira a aparência e o fluxo no seu celular antes de divulgar.

## Validação da versão 2

Sintaxe JavaScript, âncoras, IDs e arquivos locais verificados. A conferência visual e o teste de interação em navegador continuam pendentes por indisponibilidade do navegador no ambiente.
