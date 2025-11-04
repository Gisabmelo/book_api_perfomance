

## 🎯 Descrição

Este projeto implementa uma API REST para gerenciar **leitores** e **livros**, com funcionalidades de cadastro de leitores, login, cadastro de livros e trocas entre leitores. Além disso, contém scripts de **teste de desempenho** (usando k6, Mocha, Chai e Supertest) para avaliação de carga.

---

## 📁 Estrutura do Projeto

book_api_perfomance/
├── config/
├── fixtures/
├── helpers/
├── tests/
├── utilis/
├── .gitignore
├── README.md ← (este arquivo)
├── html-report.html
├── package-lock.json
└── …


---

## ⚙️ Funcionalidades Principais

### Leitores
- **Cadastro de leitor**: nome, senha  
- **Login de leitor**: nome, senha, retorno de token JWT

### Livros
- Cadastro de livro (título, autor, quantidade) — via autenticação  
- Listagem de livros (filtros por título e autor) — via autenticação  
- Troca de livro entre leitores (redução da quantidade) — via autenticação  

---

## 🛠️ Tecnologias Utilizadas

- Node.js + Express  
- Banco de dados (SQLite ou outro configurado)  
- Testes de performance: k6  
- Autenticação: JWT (JSON Web Token)  
- Documentação interativa (Swagger, se implementado)  
- Relatório de performance (html-report.html)  

---

## 🏁 Instalação e Execução

1. Clone o repositório e acesse a branch `segunda-branch`  
   ```bash
   git clone https://github.com/Gisabmelo/book_api_perfomance.git
   cd book_api_perfomance
   git checkout segunda-branch

2.Acesse a documentação (se existir):

http://localhost:3000/swagger

✅ Testes
Testes funcionais

Executa todos os testes com Mocha, Chai e Supertest:

npm test

Testes de performance (k6)

Exemplo de execução:

k6 run tests/books-list_auth_performance.js


Você também encontrará cenários de carga com stages (subida/descida), cadastro de livros e trocas.

🌐 Endpoints Principais

POST /api/auth/login — login do leitor

POST /api/leitores/cadastro — cadastro de leitor

POST /api/books — cadastro de livro (requer token)

GET /api/books?title={title}&author={author} — listagem de livros (requer token)

POST /api/books/:id/exchange — troca de livro (requer token)

📝 Observações

A autenticação deve ser feita via header Authorization: Bearer {token}.

Ao trocar um livro, a quantidade disponível deve diminuir em 1 e não pode ficar negativa.

Certifique-se de que o banco de dados está limpo ou com dados válidos para os testes de performance.

O relatório de performance (html-report.html) pode ser gerado após execução dos scripts de k6 e visualizado no navegador.

