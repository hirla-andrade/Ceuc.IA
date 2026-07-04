require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const { gerarTrilhaComIA } = require('./trilhaEngine');

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'super_secreto_ceucia_2026';

/* --- MIDDLEWARE DE VALIDAÇÃO DE USUÁRIA --- */
function verificarJWT(req, res, next) {
  const tokenHeader = req.headers['authorization'];
  if (!tokenHeader) return res.status(401).json({ error: 'Acesso negado. Token não fornecido.' });

  const token = tokenHeader.split(' ')[1];
  try {
    const autenticado = jwt.verify(token, JWT_SECRET);
    req.userId = autenticado.id;
    next();
  } catch (error) {
    res.status(403).json({ error: 'Token inválido ou expirado.' });
  }
}

/* --- ROTAS DE AUTENTICAÇÃO --- */
app.post('/api/auth/cadastro', async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    const usuarioExistente = await prisma.user.findUnique({ where: { email } });
    if (usuarioExistente) return res.status(400).json({ error: 'E-mail já cadastrado.' });

    const salt = await bcrypt.genSalt(10);
    const senha_hash = await bcrypt.hash(senha, salt);

    const novoUsuario = await prisma.user.create({
      data: { nome, email, senha_hash }
    });

    res.status(201).json({ message: 'Usuária cadastrada!', userId: novoUsuario.id });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao registrar usuária.' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, senha } = req.body;

    const usuario = await prisma.user.findUnique({ where: { email } });
    if (!usuario) return res.status(400).json({ error: 'E-mail ou senha incorretos.' });

    const senhaValida = await bcrypt.compare(senha, usuario.senha_hash);
    if (!senhaValida) return res.status(400).json({ error: 'E-mail ou senha incorretos.' });

    const token = jwt.sign({ id: usuario.id, nome: usuario.nome }, JWT_SECRET, { expiresIn: '2h' });
    res.json({ token, user: { nome: usuario.nome, email: usuario.email } });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao processar o login.' });
  }
});

/* --- ROTA PROTEGIDA DA IA + BANCO DE DADOS --- */
app.post('/api/trilha', verificarJWT, async (req, res) => {
  try {
    const answers = req.body;

    // 1. Gera o plano usando a IA
    const planoPersonalizado = await gerarTrilhaComIA(answers);

    // 2. Salva as respostas no SQLite
    await prisma.questionnaireResponse.create({
      data: {
        userId: req.userId,
        rede_apoio: answers.rede_apoio,
        momento: answers.momento,
        area: answers.area,
        crescer_migrar: answers.crescer_migrar,
        clareza: answers.clareza,
        objetivo: answers.objetivo,
        prazo: answers.prazo,
        horas: String(answers.horas),
        trava: answers.trava,
        bem_estar: answers.bem_estar,
      }
    });

    // 3. Salva o resultado gerado pela IA no SQLite
    await prisma.careerPath.create({
      data: {
        userId: req.userId,
        resumoIA: planoPersonalizado.resumo,
        formato: planoPersonalizado.formato,
        prazoEstimado: planoPersonalizado.prazoEstimado,
        trilhaJSON: JSON.stringify(planoPersonalizado.steps)
      }
    });

    res.json(planoPersonalizado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao gerar ou salvar sua trilha." });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor CEUC.IA rodando na porta ${PORT}`);
});