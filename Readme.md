# Marketplacecic - API

Este teste técnico foi um grande aprendizado para mim, alguns itens aprendidos ao realizar esté teste técnico:

1. Maior confiança no uso de banco de dados NoSQL
2. Deploy de aplicação Docker usando AWS Azure
3. Gestão de tempo

# Features
* Cadastrar vendedor [OK]
* Adicionar catálogo de livros [OK]
* Listagem de livros [OK]
* Submeter Livro [OK]
* Efetuar venda (Download do livro) [OK]

## Listagem de livros (Filtros)
* Melhores preço para o mesmo livro [OK]
* Nome da editora (publisher) [OK]
* Ordenação por data de publicação (asc/desc) [OK]
* Ordenação por preço (asc/desc) [OK]

## Submeter Livro
Ao fazer o upload do livro a aplicação lê: 

1. Título do livro
2. Número de paginas
3. O Ano da publicação
4. O Nome da editora

E realiza uma busca por cada um dos itens acima separadamente e depois procura o livro em comum, caso tenha mais de um livro com a mesma pontuação a aplicação lê o livro em busca dos nomes dos autores para ter o livro certo com maior acertividade.

caso a aplicação não encontre o livro no catálogo o livro vai ser adicionado no banco sem nenhum catálogo associado e futuramente quando o catalogo for atualizado a aplicação tentára um match novamente.


# Observações
[Documentação da API](https://documenter.getpostman.com/view/9593528/TVzREccr)

> Como você armazena esse dado de maneira eficiente e mantém a segurança
dele? Imagine que um livro vazado pode representar uma grande perda para o
autor e o vendedor.

Por falta de informações o requisíto acima não foi implementado, tendo em vista que para assegurar arquivos podemos usar a autenticação, mas como citado no texto,não temos cadastro de usuários e outro ponto importante, é a encriptação dos livros, mas essa parte ficaria com o serviço de storage para melhor desempenho ou até o mesmo o uso da ferramnta QPDF.

Deploy de nova versão:  
```
$ docker build -t marketplacecicnodeapi.azurecr.io/marketplacecic:latest .
$ docker push marketplacecicnodeapi.azurecr.io/marketplacecic:latest
```
