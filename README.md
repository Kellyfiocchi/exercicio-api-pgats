# 📚 Trabalho – API de Login com Testes Automatizados

![Node](https://img.shields.io/badge/node-%3E%3D18%20%7C%2020%20%7C%2022-339933?logo=node.js)
![License](https://img.shields.io/badge/license-MIT-informational)

## 👩‍🏫 Informações do Trabalho

- **Disciplina**: Automação de Testes na Camada de Serviço (API)
- **Professor(a)**: Julio de Lima
- **Aluno(a)**: Kelly Fiochi
- **Data**: 19/08/2025

---

## 🎯 Objetivo

Construir uma **API simples de Login** em **Node.js + Express** com separação em **Controller, Service e Model**, garantindo qualidade via **testes automatizados** (Mocha, Chai, Sinon, SuperTest), **pipeline no GitHub Actions** e **vídeo** explicando cada linha dos 5 testes.

---

## 📋 Requisitos do Trabalho

- [x] API de Login – `POST /auth/login`
- [x] Camadas: Controller, Service, Model
- [x] 5 testes automatizados (Mocha, Chai, Sinon, SuperTest)
- [x] Controller testado via HTTP isolando o Service (stub)
- [x] CI no GitHub Actions (rodando testes a cada push/PR)
- [x] Vídeo explicando os testes linha a linha

---

## 🛠️ Tecnologias

Node.js, Express, Mocha, Chai, Sinon, SuperTest, GitHub Actions.

---

## 📂 Estrutura do Projeto

```text
📦 projeto-login-api
├─ 📂 src
│  ├─ 📂 controllers
│  │   └─ authController.js
│  ├─ 📂 services
│  │   └─ authService.js
│  ├─ 📂 models
│  │   └─ userModel.js
│  ├─ 📂 routes
│  │   └─ authRoutes.js
│  ├─ app.js
│  └─ index.js
│
├─ 📂 test
│  └─ auth.controller.spec.js
│
├─ 📂 .github
│  └─ 📂 workflows
│       └─ ci.yml
│
├─ .gitignore
├─ package.json
└─ README.md
```

## ▶️ Como Executar Localmente

```text
git clone https://github.com/<seu-usuario>/<seu-repo>.git
cd <seu-repo>
npm install
```

## Subir a API

```text
npm run dev
```

## Testar o Login (3 cenários)

```text
#Teste 1 — Sucesso 200 (Credenciais válidas)

curl -i -X POST http://127.0.0.1:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"ada@example.com","password":"123456"}'

#Teste 2 — 400 Bad Request (Faltando email ou password)

curl -i -X POST http://127.0.0.1:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"ada@example.com"}'  # Sem o campo password

#Teste 3 — 401 Unauthorized (Credenciais inválidas)

curl -i -X POST http://127.0.0.1:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"ada@example.com","password":"wrongpassword"}'

#Teste 4 — 404 Not Found (Rota não encontrada)

curl -i -X POST http://127.0.0.1:3000/auth/nonexistent \
  -H "Content-Type: application/json" \
  -d '{"email":"ada@example.com","password":"123456"}'

#Teste 5  — Sucesso 200  Não Vazar Campos Sensíveis

curl -i -X POST http://127.0.0.1:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"ada@example.com","password":"123456"}'
```

## 🧪 Testes Automatizados

```text
npm test
```

## Cobertura dos 5 testes:

✅ 200 com token + user quando credenciais válidas

❌ 400 quando faltam campos obrigatórios

🔒 401 quando credenciais inválidas (erro do service mapeado)

💥 404 Not Found (Rota não encontrada)

🛡️ 200 Resposta não vaza password (whitelist no controller)

## 📚 Referências

### [Node.js](https://nodejs.org/)
- Plataforma JavaScript para a execução do código no servidor.
- [Documentação do Node.js](https://nodejs.org/en/docs/)

### [Express](https://expressjs.com/)
- Framework web para Node.js que facilita a criação de APIs e servidores.
- [Documentação do Express](https://expressjs.com/en/4x/api.html)

### [Mocha](https://mochajs.org/)
- Framework de testes para JavaScript, usado para realizar testes unitários e de integração.
- [Documentação do Mocha](https://mochajs.org/#getting-started)

### [Chai](https://www.chaijs.com/)
- Biblioteca de asserções usada para escrever testes mais legíveis.
- [Documentação do Chai](https://www.chaijs.com/guide/)

### [Sinon](https://sinonjs.org/)
- Biblioteca para criar **spies**, **stubs**, e **mocks**, utilizada para testes de funções e chamadas assíncronas.
- [Documentação do Sinon](https://sinonjs.org/releases/latest/)

### [SuperTest](https://github.com/visionmedia/supertest)
- Framework de testes para testar APIs HTTP com Mocha.
- [Documentação do SuperTest](https://github.com/visionmedia/supertest#api)

### [GitHub Actions](https://github.com/features/actions)
- Plataforma de CI/CD para automação de fluxos de trabalho no GitHub.
- [Documentação do GitHub Actions](https://docs.github.com/en/actions)
