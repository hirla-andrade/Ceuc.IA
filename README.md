# CEUC.IA — Protótipo completo (Front-end + Back-end)

Aplicação de trilha de carreira para mães, feita para o HackaWoman 2026.

## Estrutura

```
ceuc-ia-projeto/
├── frontend/
│   ├── index.html      # telas da aplicação (splash, login, perguntas, resultado, cronograma)
│   ├── styles.css       # identidade visual (roxo/lilás, fonte Inter)
│   └── app.js           # lógica de onboarding, motor de trilha (fallback local) e chamadas à API
└── backend/
    ├── server.js         # servidor Node.js + Express (API REST)
    ├── trilhaEngine.js    # motor de geração da trilha (mesma lógica do front-end, em Node)
    ├── package.json
    └── data/
        └── db.json       # "banco de dados" em arquivo JSON
```

## Como rodar

```bash
cd backend
npm install
npm start
```

O servidor sobe em `http://localhost:3001` e já serve o front-end nesse mesmo endereço
(não precisa de outro servidor para os arquivos estáticos).

Abra `http://localhost:3001` no navegador para usar a aplicação.

## API (backend)

| Método | Rota                          | O que faz                                              |
|--------|-------------------------------|---------------------------------------------------------|
| POST   | `/api/users`                  | Cria uma usuária (nome, e-mail ou convidada)             |
| GET    | `/api/users/:id`               | Busca perfil, respostas e trilha salva de uma usuária    |
| POST   | `/api/users/:id/answers`       | Salva as respostas do onboarding                         |
| POST   | `/api/users/:id/trilha`        | Gera a trilha a partir das respostas e salva no banco     |
| GET    | `/api/users/:id/trilha`        | Recupera a última trilha gerada                          |
| GET    | `/api/users`                   | Lista todas as usuárias (uso administrativo/demo)         |

## Banco de dados

Por simplicidade (e por ser um protótipo de hackathon), o banco de dados é um único
arquivo JSON (`backend/data/db.json`), lido e escrito a cada requisição. Cada usuária
vira uma entrada no objeto `users`, com respostas e trilha salvas juntas.

Para produção, esse arquivo seria substituído por um banco de verdade (Postgres/MySQL
via DBaaS da Magalu Cloud, como já descrito no roteiro técnico anterior), mantendo a
mesma lógica de `trilhaEngine.js`.

## Resiliência do front-end

O `app.js` tenta sempre falar com o backend (criar usuária, gerar e salvar a trilha).
Se o backend estiver fora do ar, a aplicação recalcula a trilha localmente no navegador
(a mesma lógica existe duplicada em `app.js` e `trilhaEngine.js`), então a demonstração
nunca trava mesmo sem servidor rodando.
