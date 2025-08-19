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
# sucesso (200)
curl -i -X POST http://127.0.0.1:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"ada@example.com","password":"123456"}'

# senha errada (401)
curl -i -X POST http://127.0.0.1:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"ada@example.com","password":"errada"}'

# campo faltando (400)
curl -i -X POST http://127.0.0.1:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"ada@example.com"}'

```

## 🧪 Testes Automatizados

```text
npm test
```

## Cobertura dos 5 testes:

✅ 200 com token + user quando credenciais válidas

❌ 400 quando faltam campos obrigatórios

🔒 401 quando credenciais inválidas (erro do service mapeado)

💥 500 quando o service lança erro genérico

🛡️ Resposta não vaza password (whitelist no controller)

## 📚 Referências

- Node.js • Express • Mocha • Chai • Sinon • SuperTest • GitHub Actions
