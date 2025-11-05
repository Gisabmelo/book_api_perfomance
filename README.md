# book_api_perfomance

## 1. Introdução  
Este repositório contém os **testes de performance** automatizados para a API de livros e leitores, utilizando JavaScript e k6. O objetivo é validar o desempenho dos endpoints da API em diferentes cenários de carga, com foco em autenticação, listagem, cadastro e trocas de livros.

> **Observação:** Para que os scripts funcionem corretamente, é necessário definir a variável de ambiente `BASE_URL`, que representa a URL base da API que será testada (ex: `https://meu-api.com`).

---

## 2. Tecnologias utilizadas  
- **JavaScript** (ES 6+) — para os scripts de teste de performance  
- **k6** — framework de carga e performance testing  
- Node.js — ambiente de desenvolvimento (quando necessário para pré-processamento ou utilitários)  
- Variáveis de ambiente — para parametrização da URL da API e outras configurações de execução  
- (Opcional) HTML export & dashboard do k6 — para relatórios visuais em tempo real e offline

---

## 3. Estrutura do repositório  
├── tests/
│ ├── setup.js # Login, autenticação e utilitários compartilhados
│ ├── books-get.test.js # Listagem de livros com filtros (title + author)
│ ├── books-post.test.js # Cadastro de livros (POST /books)
│ ├── books-exchange.test.js # Troca de livros (POST /books/:id/exchange)
├── .gitignore
├── README.md
└── package.json


---

## 4. Objetivos de cada grupo de arquivos  
- **setup.js** — Contém função(s) de autenticação (login) e preparação comum para os cenários de teste.  
- **books-get.test.js** — Script que testa o endpoint de listagem de livros (`GET /api/books`) com filtros `title` e `author`, validando status de resposta e payload.  
- **books-post.test.js** — Script que testa o cadastro de livros na API (`POST /api/books`), verificando criação e resposta esperada.  
- **books-exchange.test.js** — Script que testa a troca de um livro entre leitores (`POST /api/books/:id/exchange`), validando redução da quantidade e resposta apropriada.  


---

## 5. Modo de instalação e execução do projeto  
### Instalação  
1. Clone o repositório:
   ```bash
   git clone https://github.com/Gisabmelo/book_api_perfomance.git
   cd book_api_perfomance

   2.Instale dependências (caso existam utilitários Node.js):

   npm install
   
 3. Configure a variável de ambiente BASE_URL apontando para a URL da API a ser testada:
   
export BASE_URL=https://sua-api.com         # Linux/Mac
set BASE_URL=https://sua-api.com            # Windows PowerShell

Execução dos testes com k6

Para rodar um script de teste individual, definindo a variável de ambiente BASE_URL, por exemplo:
BASE_URL=https://sua-api.com k6 run tests/books-get.test.js

Relatório e dashboard em tempo real

Você pode ativar o dashboard web do k6 e exportar relatório em HTML com variáveis de ambiente:

BASE_URL=https://sua-api.com K6_WEB_DASHBOARD=true K6_WEB_DASHBOARD_EXPORT=html-report.html k6 run tests/books-stages.test.js

K6_WEB_DASHBOARD=true ativa o painel interativo web.

K6_WEB_DASHBOARD_EXPORT=html-report.html gera um relatório HTML chamado html-report.html.


