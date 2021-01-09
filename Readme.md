# Features
* Cadastrar vendedor [OK]
* Adicionar catálogo de livros [OK]
* Listagem de livros [OK]
* Submeter Livro [OK]
* Efetuar venda (Download do livro) [NO]

## Listagem de livros (Filtros)
* Melhores preço para o mesmo livro [OK]
* Nome da editora (publisher) [OK]
* Ordenação por data de publicação (asc/desc) [OK]
* Ordenação de preço (asc/desc) [OK]

## Submeter Livro
Ao fazer o upload do livro a aplicação lê: 

1. Titulo do livro
2. Número de paginas
3. O Ano da publicação
4. O Nome da editora

E realizar uma busca por cada um dos itens acima separadamente e depois procura o livro em comum caso tenha mais de um livro com a mesma pontuação a aplicação lê o livro em busca dos nomes dos autores para ter o livro maior acertividade.

caso a aplicação não encontre o livro no catálogo o livro vai ser adicionado no banco sem nenhum catálogo associado e futuramente quando o catalogo for atualizado a aplicação tentára um match novamente.

## Principais dependências do projeto?

* Typescript
* Mongoose
* git-commit-msg-linter: Para forçar os padrões de commits [Convetional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
* Eslint para o typescript: Usando o guia de estilo standart
* Husky
* lint-staged
* yarn-check: Lib usada para testar o uso e versões das dependencies yarn.
* nodemon
* sucrase-node
