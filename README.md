# 📚 Testes de Performance com K6 – Book API

## ✅ 1. Introdução

Este repositório contém testes de performance desenvolvidos com **K6** para a API de gerenciamento de livros.  
O objetivo é avaliar o desempenho dos principais endpoints, como cadastro de leitores, login, registro de livros, listagem e troca de livros.

---

## ⚙️ 2. Tecnologias Utilizadas

| Tecnologia     | Descrição |
|----------------|-----------|
| **K6**         | Ferramenta open-source para testes de carga e performance. |
| **JavaScript (ESM)** | Linguagem utilizada para escrever os scripts dos testes. |
| **GitHub Actions (opcional)** | Integração contínua para execução automática dos testes. |
| **Node.js (apenas para organização de scripts)** | Utilizado para modularizar e organizar arquivos de teste. |

---

## 📁 3. Estrutura do Repositório

```
book_api_perfomance/
├── helpers/
│   └── autenticacao.js      # Funções para login e obtenção de token JWT
├── tests/
│   ├── books_list.js        # Testes de listagem de livros (GET /books)
│   ├── books_register.js    # Testes de cadastro de livros (POST /books)
│   ├── books_exchange.js    # Testes de troca de livro (POST /books/:id/exchange)
│   └── register_user.js     # Testes de criação de leitor (POST /register)
├── package.json             # Dependências e scripts (se usado Node para organização)
└── README.md
```

---

## 🎯 4. Objetivo de Cada Grupo de Arquivos

| Pasta/Arquivo       | Objetivo |
|---------------------|----------|
| `helpers/autenticacao.js` | Funções para realizar login automático e retornar token JWT para endpoints autenticados. |
| `tests/books_list.js` | Testa a performance do endpoint de listagem de livros. |
| `tests/books_register.js` | Testa o endpoint de cadastro de livros com payload dinâmico. |
| `tests/books_exchange.js` | Testa a troca de livros (reduz quantidade). |
| `tests/register_user.js` | Testa o endpoint de cadastro de leitores. |

---

## 🛠️ 5. Instalação e Configuração

### ✅ Pré-requisitos:
- Node.js (opcional, se quiser gerenciar scripts)
- K6 instalado  
  👉 Baixe em: https://k6.io/docs/getting-started/installation/

### ✅ Clonar o repositório:
```bash
git clone https://github.com/Gisabmelo/book_api_perfomance.git
cd book_api_perfomance
```

### ✅ Variável obrigatória:
Defina a **URL base da API** com a variável de ambiente `BASE_URL`:

Exemplo:
```bash
export BASE_URL="http://localhost:3000"
```
No Windows (PowerShell):
```powershell
$env:BASE_URL="http://localhost:3000"
```

---

## 🚀 6. Como Executar os Testes

### ✅ Execução simples:
```bash
k6 run tests/books_list.js
```

### ✅ Execução com monitoramento em tempo real e exportação de relatório HTML:
```bash
K6_WEB_DASHBOARD=true K6_WEB_DASHBOARD_EXPORT=relatorio.html k6 run tests/books_list.js
```

### ✅ Exemplos adicionais:
| Cenário | Comando |
|---------|---------|
| Rodar cadastro de usuário | `k6 run tests/register_user.js` |
| Rodar cadastro de livros | `k6 run tests/books_register.js` |
| Rodar troca de livros | `k6 run tests/books_exchange.js` |
| Rodar com 50 usuários simultâneos | `k6 run --vus 50 --duration 30s tests/books_list.js` |

---

## 📊 7. Monitoramento e Relatórios

| Tipo de Relatório     | Como Habilitar |
|------------------------|----------------|
| Dashboard web em tempo real | `K6_WEB_DASHBOARD=true` |
| Exportar como HTML | `K6_WEB_DASHBOARD_EXPORT=arquivo.html` |
| Ambos juntos | `K6_WEB_DASHBOARD=true K6_WEB_DASHBOARD_EXPORT=relatorio.html k6 run script.js` |

---

## ✅ Exemplo Completo de Execução

```bash
BASE_URL=https://sua-api.com K6_WEB_DASHBOARD=true K6_WEB_DASHBOARD_EXPORT=html-report.html k6 run tests/books_list.js
```

