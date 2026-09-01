# VidFlow

O VidFlow é uma interface responsiva de descoberta de vídeos construída com **HTML, CSS e JavaScript puro**, conforme o briefing visual fornecido. A aplicação traz cabeçalho fixo, busca semântica, filtros por categoria, ordenação, navegação lateral, catálogo local, menus contextuais e feedbacks de interação.

## Como executar

Abra esta pasta em um servidor estático local. A forma mais simples é executar, na raiz do projeto:

```bash
python3 -m http.server 4173
```

Depois, acesse `http://127.0.0.1:4173/` no navegador. O projeto também pode ser publicado em qualquer hospedagem de arquivos estáticos, pois não exige build ou dependências de terceiros para funcionar.

## Estrutura

| Caminho | Finalidade |
| --- | --- |
| `index.html` | Estrutura semântica da página, cabeçalho, menu, filtros e catálogo. |
| `css/estilos.css` | Tokens visuais, layout, responsividade, estados e microinterações. |
| `css/flexbox.css` | Arquivo de compatibilidade da base original, sem sobrescritas conflitantes. |
| `css/reset.css` | Reset CSS fornecido no projeto-base. |
| `script.js` | Busca, filtros, ordenação, carregamento de dados e eventos de interface. |
| `backend/videos.json` | Catálogo local com 12 vídeos de demonstração. |
| `img/` | Logos, avatares e ícones fornecidos no pacote original. |

## Funcionalidades incluídas

A busca filtra o catálogo em tempo real por título, canal, categoria e rótulo. Os chips de categoria podem ser combinados com o termo de pesquisa, e o seletor permite ordenar por data, popularidade ou ordem alfabética. Quando os filtros não encontram resultados, a interface apresenta um estado vazio com ação para limpar os filtros.

O menu lateral funciona em desktop e mobile. No mobile, o botão hambúrguer abre um drawer com overlay e o botão `Escape` fecha os estados abertos. Cada card possui link externo para a busca correspondente no YouTube e um menu contextual para adicionar o vídeo à fila ou salvá-lo para assistir mais tarde, com toast de confirmação. A tecla `/` coloca o foco na busca.

## Dados

A aplicação tenta carregar `backend/videos.json`. Se o arquivo estiver indisponível ou inválido, o próprio `script.js` utiliza um catálogo de reserva para manter a experiência funcional. Os links atuais direcionam para pesquisas do YouTube relacionadas aos títulos de demonstração; basta substituir o campo `url` no JSON para conectar vídeos específicos.

## Validação realizada

A entrega foi verificada com `node --check` para sintaxe JavaScript, parsing do JSON, renderização no navegador, busca, filtros combinados, limpeza de filtros, ordenação por popularidade, menu contextual, feedback por toast, ausência de erros no console e captura em viewport móvel de 390px.
