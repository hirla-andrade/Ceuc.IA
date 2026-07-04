/* ============================================================
   CEUC.IA — Backend (Node.js + Express)
   Banco de dados: arquivo JSON local (backend/data/db.json)
   ============================================================ */

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { buildTrilha } = require('./trilhaEngine');

const app = express();
const PORT = process.env.PORT || 3001;
const DB_PATH = path.join(__dirname, 'data', 'db.json');

app.use(cors());
app.use(express.json());

/* ---------------- "Banco de dados" em JSON ---------------- */
function readDB() {
  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify({ users: {} }, null, 2));
  }
  return JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
}
function writeDB(db) {
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));
}

/* ---------------- Rotas ---------------- */

// Cria um usuário (login ou "continuar como convidada")
app.post('/api/users', (req, res) => {
  const { nome, email, convidada } = req.body;
  const db = readDB();
  const id = crypto.randomUUID();
  db.users[id] = {
    id,
    nome: nome || null,
    email: email || null,
    convidada: !!convidada,
    criadoEm: new Date().toISOString(),
    respostas: null,
    trilha: null
  };
  writeDB(db);
  res.status(201).json({ id });
});

// Busca um usuário (perfil + respostas + trilha salva)
app.get('/api/users/:id', (req, res) => {
  const db = readDB();
  const user = db.users[req.params.id];
  if (!user) return res.status(404).json({ erro: 'Usuária não encontrada' });
  res.json(user);
});

// Salva as respostas do onboarding
app.post('/api/users/:id/answers', (req, res) => {
  const db = readDB();
  const user = db.users[req.params.id];
  if (!user) return res.status(404).json({ erro: 'Usuária não encontrada' });
  user.respostas = req.body.respostas || {};
  writeDB(db);
  res.json({ ok: true });
});

// Gera a trilha a partir das respostas e salva no "banco"
app.post('/api/users/:id/trilha', (req, res) => {
  const db = readDB();
  const user = db.users[req.params.id];
  if (!user) return res.status(404).json({ erro: 'Usuária não encontrada' });

  const respostas = req.body.respostas || {};
  const trilha = buildTrilha(respostas);

  user.respostas = respostas;
  user.trilha = trilha;
  user.trilhaGeradaEm = new Date().toISOString();
  writeDB(db);

  res.json(trilha);
});

// Recupera a última trilha salva de uma usuária
app.get('/api/users/:id/trilha', (req, res) => {
  const db = readDB();
  const user = db.users[req.params.id];
  if (!user) return res.status(404).json({ erro: 'Usuária não encontrada' });
  if (!user.trilha) return res.status(404).json({ erro: 'Trilha ainda não gerada' });
  res.json(user.trilha);
});

// Lista todas as usuárias (uso administrativo / demonstração)
app.get('/api/users', (req, res) => {
  const db = readDB();
  res.json(Object.values(db.users));
});

/* ---------------- Serve o front-end estático (opcional) ---------------- */
app.use(express.static(path.join(__dirname, '..', 'frontend')));

app.listen(PORT, () => {
  console.log(`CEUC.IA backend rodando em http://localhost:${PORT}`);
  console.log(`Front-end também servido em http://localhost:${PORT}`);
});
