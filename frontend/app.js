const API_BASE = (location.hostname === 'localhost' || location.hostname === '127.0.0.1')
  ? 'http://localhost:3001'
  : ''; // em produção, o front é servido pelo mesmo host do backend

const answers = {};
const userName = { value: '' };

/* =========================================================
   NAVEGAÇÃO ENTRE TELAS
   ========================================================= */
function goTo(screenId) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(screenId).classList.add('active');
  const scroller = document.getElementById(screenId).querySelector('.scroll-area') || document.getElementById(screenId);
  scroller.scrollTop = 0;
}

// Splash -> Intro depois de um instante
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => goTo('intro'), 1600);
});

/* =========================================================
   LOGIN SILENCIOSO (conta convidada, sem tela extra)
   ========================================================= */
async function loginContinue() {
  const nameInput = document.getElementById('login-name');
  const statusEl = document.getElementById('login-status');
  const btn = document.getElementById('login-btn');
  const nome = (nameInput.value || '').trim() || 'Mãe convidada';
  userName.value = nome.split(' ')[0];

  btn.disabled = true;
  statusEl.textContent = 'preparando sua sessão...';

  const guestId = 'guest_' + Date.now() + '_' + Math.floor(Math.random() * 100000);
  const email = `${guestId}@convidada.ceucia.local`;
  const senha = guestId; // gerada, nunca exposta à usuária

  try {
    const cadastro = await fetch(`${API_BASE}/api/auth/cadastro`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, email, senha })
    });
    if (!cadastro.ok) throw new Error('Falha no cadastro convidado');

    const login = await fetch(`${API_BASE}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha })
    });
    if (!login.ok) throw new Error('Falha no login convidado');

    const data = await login.json();
    localStorage.setItem('ceucia_token', data.token);
    localStorage.setItem('ceucia_nome', userName.value);

    startChat();
  } catch (err) {
    console.error(err);
    statusEl.textContent = 'Sem conexão com o servidor agora — seguindo no modo local.';
    localStorage.removeItem('ceucia_token');
    setTimeout(startChat, 700);
  }
}

/* =========================================================
   MOTOR DE CONVERSA
   Cada etapa: pergunta da IA + chips fixos + campo aberto sempre disponível.
   O fluxo cobre exatamente os campos que o backend espera:
   rede_apoio, momento, area, crescer_migrar, clareza, objetivo,
   prazo, horas, trava, bem_estar.
   ========================================================= */
const FLOW = [
  {
    field: 'rede_apoio',
    msg: () => `${userName.value ? userName.value + ', hoje' : 'Hoje'} você tem alguém que te ajuda a cuidar das crianças enquanto estuda ou trabalha?`,
    chips: [
      { label: 'Sim, tenho apoio constante', value: 'apoio_constante' },
      { label: 'Só às vezes', value: 'apoio_parcial' },
      { label: 'Não tenho apoio', value: 'sem_apoio' }
    ]
  },
  {
    field: 'momento',
    msg: () => 'Qual dessas opções te descreve melhor agora?',
    chips: [
      { label: 'Estou grávida', value: 'gestante' },
      { label: 'Bebê de 0 a 1 ano', value: 'bebe_0_1' },
      { label: 'Criança pequena (1 a 5 anos)', value: 'crianca_pequena' },
      { label: 'Já não preciso de cuidados tão intensos', value: 'cuidados_reduzidos' }
    ]
  },
  {
    field: 'area',
    msg: () => 'Antes da maternidade (ou antes de pausar), em qual área você trabalhava ou estudava?',
    chips: [
      { label: 'Tecnologia', value: 'tecnologia' },
      { label: 'Administração e negócios', value: 'administracao' },
      { label: 'Saúde', value: 'saude' },
      { label: 'Educação', value: 'educacao' },
      { label: 'Outra área', value: 'outra' }
    ]
  },
  {
    field: 'crescer_migrar',
    msg: () => 'Pensando no que vem agora, você prefere...',
    chips: [
      { label: 'Crescer na área atual', value: 'crescer' },
      { label: 'Migrar de área', value: 'migrar' },
      { label: 'Ainda não sei', value: 'ainda_nao_sei' }
    ],
    onAnswer: (value) => {
      if (value === 'ainda_nao_sei') return 'explainer';
      return null;
    }
  },
  {
    field: 'clareza',
    msg: () => 'E hoje, você sente que já tem clareza do que quer, ou ainda está se encontrando?',
    chips: [
      { label: 'Tenho clareza', value: 'clara' },
      { label: 'Ainda estou me encontrando', value: 'em_construcao' }
    ]
  },
  {
    field: 'objetivo',
    msg: () => 'Qual é o seu objetivo profissional principal agora?',
    chips: [
      { label: 'Conseguir uma recolocação', value: 'recolocacao' },
      { label: 'Uma promoção', value: 'promocao' },
      { label: 'Uma nova certificação', value: 'certificacao' },
      { label: 'Empreender', value: 'empreender' }
    ],
    skipIf: () => !!answers.objetivo // pulada se o explainer já preencheu
  },
  {
    field: 'prazo',
    msg: () => 'Em quanto tempo você gostaria de estar encaminhada?',
    chips: [
      { label: '1 a 2 meses', value: '1_2_meses' },
      { label: '3 a 4 meses', value: '3_4_meses' },
      { label: '5 a 6 meses', value: '5_6_meses' },
      { label: 'Mais de 6 meses', value: 'mais_6_meses' }
    ]
  },
  {
    field: 'horas',
    msg: () => 'De forma realista, quantas horas por semana você consegue dedicar a isso?',
    chips: [
      { label: 'Menos de 2h', value: 'menos_2h' },
      { label: '2 a 5h', value: '2_5h' },
      { label: '5 a 10h', value: '5_10h' },
      { label: 'Mais de 10h', value: 'mais_10h' }
    ]
  },
  {
    field: 'trava',
    msg: () => 'O que mais trava você hoje?',
    chips: [
      { label: 'Falta de tempo', value: 'falta_tempo' },
      { label: 'Falta de rede de apoio', value: 'falta_rede' },
      { label: 'Insegurança ou autoestima', value: 'inseguranca' },
      { label: 'Alguém controla meu dinheiro ou minhas decisões', value: 'controle_financeiro' }
    ],
    onAnswer: (value) => {
      if (value === 'controle_financeiro') return 'support';
      return null;
    }
  },
  {
    field: 'bem_estar',
    msg: () => 'E como está sua energia emocional nesses dias?',
    chips: [
      { label: 'Bem, me sinto motivada', value: 'motivada' },
      { label: 'Cansada, mas indo', value: 'cansada' },
      { label: 'Esgotada', value: 'esgotada' },
      { label: 'Prefiro não dizer', value: 'prefere_nao_dizer' }
    ]
  }
];

const EXPLAINER_PATHS = {
  tecnologia: ['Suporte técnico e atendimento', 'Análise de dados', 'Desenvolvimento web'],
  administracao: ['Gestão de projetos', 'Financeiro e controladoria', 'Atendimento e vendas'],
  saude: ['Cuidados e bem-estar', 'Gestão em clínicas', 'Educação em saúde'],
  educacao: ['Educação infantil', 'Tutoria e reforço', 'Produção de conteúdo educacional'],
  outra: ['Atendimento ao cliente', 'Organização e processos', 'Criação de conteúdo']
};

let stepIndex = 0;
let waitingForAnswer = false;

function startChat() {
  goTo('chat');
  buildProgressDots();
  askNextStep();
}

function buildProgressDots() {
  const wrap = document.getElementById('chat-progress');
  wrap.innerHTML = '';
  FLOW.forEach(() => {
    const seg = document.createElement('div');
    seg.className = 'progress-seg';
    wrap.appendChild(seg);
  });
}

function updateProgress() {
  const segs = document.querySelectorAll('#chat-progress .progress-seg');
  segs.forEach((seg, i) => seg.classList.toggle('done', i < stepIndex));
}

function appendMessage(role, html) {
  const container = document.getElementById('chat-messages');
  const bubble = document.createElement('div');
  bubble.className = role === 'user' ? 'msg msg-user' : (role === 'support' ? 'msg msg-support' : 'msg msg-ai');
  bubble.innerHTML = html;
  container.appendChild(bubble);
  container.scrollTop = container.scrollHeight;
  return bubble;
}

function showTyping() {
  const container = document.getElementById('chat-messages');
  const typing = document.createElement('div');
  typing.className = 'typing';
  typing.id = 'typing-indicator';
  typing.innerHTML = '<span></span><span></span><span></span>';
  container.appendChild(typing);
  container.scrollTop = container.scrollHeight;
}

function hideTyping() {
  const t = document.getElementById('typing-indicator');
  if (t) t.remove();
}

function setComposerChips(chips) {
  const chipsWrap = document.getElementById('chat-chips');
  chipsWrap.innerHTML = '';
  (chips || []).forEach(chip => {
    const btn = document.createElement('button');
    btn.className = 'chat-chip';
    btn.textContent = chip.label;
    btn.onclick = () => submitAnswer(chip.value, chip.label);
    chipsWrap.appendChild(btn);
  });
}

function disableComposer() {
  waitingForAnswer = false;
  document.querySelectorAll('.chat-chip').forEach(c => c.disabled = true);
  document.getElementById('chat-input').disabled = true;
  document.getElementById('chat-send-btn').disabled = true;
}

function enableComposer() {
  waitingForAnswer = true;
  document.getElementById('chat-input').disabled = false;
  document.getElementById('chat-send-btn').disabled = false;
}

function askNextStep() {
  customTextHandler = null;

  if (stepIndex >= FLOW.length) {
    setComposerChips([]);
    document.getElementById('chat-input').placeholder = 'Escreva sua resposta...';
    finish();
    return;
  }

  const step = FLOW[stepIndex];
  if (step.skipIf && step.skipIf()) {
    stepIndex++;
    askNextStep();
    return;
  }

  updateProgress();
  document.getElementById('chat-header-sub').textContent = `pergunta ${stepIndex + 1} de ${FLOW.length}`;

  showTyping();
  setTimeout(() => {
    hideTyping();
    appendMessage('ai', step.msg());
    setComposerChips(step.chips);
    enableComposer();
    document.getElementById('chat-input').focus();
  }, 550);
}

function submitAnswer(value, label) {
  if (!waitingForAnswer) return;
  disableComposer();
  appendMessage('user', label);

  const step = FLOW[stepIndex];
  answers[step.field] = value;

  const branch = step.onAnswer ? step.onAnswer(value) : null;
  stepIndex++;

  if (branch === 'explainer') {
    runExplainerBranch();
  } else if (branch === 'support') {
    runSupportBranch();
  } else {
    askNextStep();
  }
}

// Quando não-nulo, o texto livre é roteado para cá em vez do fluxo padrão
// (usado pelo ramo do "explainer", onde a resposta livre vira o objetivo).
let customTextHandler = null;

function handleSend() {
  if (!waitingForAnswer) return;
  const input = document.getElementById('chat-input');
  const text = input.value.trim();
  if (!text) return;
  input.value = '';

  if (customTextHandler) {
    const handler = customTextHandler;
    customTextHandler = null;
    disableComposer();
    appendMessage('user', text);
    handler(text);
    return;
  }

  submitAnswer(text, text);
}

/* ---------- Ramo: "ainda não sei" -> sugestão de caminhos ---------- */
function runExplainerBranch() {
  const areaPaths = EXPLAINER_PATHS[answers.area] || EXPLAINER_PATHS.outra;

  showTyping();
  setTimeout(() => {
    hideTyping();
    appendMessage('ai', 'Sem problema — a partir do que você me contou, esses caminhos costumam fazer sentido. Algum combina com você?');

    const chipsWrap = document.getElementById('chat-chips');
    chipsWrap.innerHTML = '';
    areaPaths.forEach(pathLabel => {
      const btn = document.createElement('button');
      btn.className = 'chat-chip';
      btn.textContent = pathLabel;
      btn.onclick = () => {
        disableComposer();
        appendMessage('user', pathLabel);
        answers.objetivo = pathLabel;
        askNextStep();
      };
      chipsWrap.appendChild(btn);
    });
    document.getElementById('chat-input').placeholder = 'Ou escreva o que você tem em mente...';
    enableComposer();

    customTextHandler = (text) => {
      answers.objetivo = text;
      askNextStep();
    };
  }, 550);
}

/* ---------- Ramo: sinal de violência patrimonial ---------- */
function runSupportBranch() {
  showTyping();
  setTimeout(() => {
    hideTyping();
    appendMessage('support', `
      <b>Antes de seguir</b>
      Isso tem nome, e você não está sozinha. Controlar o dinheiro, os documentos ou as oportunidades de trabalho de outra pessoa é uma forma de violência patrimonial — reconhecida por lei no Brasil (Lei Maria da Penha) como parte da violência doméstica.
      <br><br>
      Sua trilha de carreira pode caminhar em paralelo a isso, mas sua segurança vem primeiro. Você pode ligar gratuita e confidencialmente para a <b style="color:var(--lavender-dark);">Central de Atendimento à Mulher, no 180</b>, disponível 24h, ou procurar a Delegacia da Mulher mais próxima.
      <br><br>
      Você pode continuar sua trilha normalmente quando quiser. Isso fica só entre você e a aplicação.
    `);

    setComposerChips([{ label: 'Continuar minha trilha', value: 'continuar' }]);
    document.getElementById('chat-input').placeholder = 'Escreva sua resposta...';
    enableComposer();

    document.getElementById('chat-chips').querySelector('.chat-chip').onclick = () => {
      disableComposer();
      askNextStep();
    };
  }, 550);
}

/* =========================================================
   ENVIO FINAL PARA A IA
   ========================================================= */
function finish() {
  showLoadingBubble();

  const token = localStorage.getItem('ceucia_token');

  fetch(`${API_BASE}/api/trilha`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(answers)
  })
    .then(response => {
      if (!response.ok) throw new Error('Não autenticado ou erro na IA');
      return response.json();
    })
    .then(data => {
      renderResult(data);
      goTo('result');
    })
    .catch(error => {
      console.error('Erro:', error);
      appendMessage('ai', 'Deu um problema pra gerar sua trilha agora (sessão expirada ou servidor fora do ar). Você pode tentar de novo.');
    });
}

function showLoadingBubble() {
  document.getElementById('chat-header-sub').textContent = 'cruzando suas respostas...';
  showTyping();
}

/* =========================================================
   RENDER DO RESULTADO
   ========================================================= */
function renderResult(t) {
  document.getElementById('result-title').textContent = 'Sua trilha, passo a passo';
  document.getElementById('result-summary').textContent = `${t.resumo} Formato sugerido: ${t.formato}.`;

  const alertMount = document.getElementById('alert-mount');
  alertMount.innerHTML = (t.alertas || []).map(al =>
    `<div class="alert-card"><b>${al.label}</b>${al.texto}</div>`
  ).join('');

  const stepsMount = document.getElementById('steps-mount');
  stepsMount.innerHTML = (t.steps || []).map((s, i) => `
    <div class="step">
      <div class="step-marker">${String(i + 1).padStart(2, '0')}</div>
      <div class="step-card">
        <div class="step-title">${s.title}</div>
        <div class="step-why">${s.why}</div>
        <div class="step-meta">
          <span class="tag">${s.tempo}</span>
          <span class="tag">${s.tag}</span>
        </div>
      </div>
    </div>
  `).join('');

  document.getElementById('prazo-desejado').textContent = t.prazoDesejado;
  document.getElementById('prazo-estimado').textContent = t.prazoEstimado;

  const verdictEl = document.getElementById('prazo-verdict');
  if (t.realista) {
    verdictEl.innerHTML = `<b>Realista:</b> a trilha se encaixa na sua disponibilidade semanal de tempo.`;
  } else {
    verdictEl.innerHTML = `<b>Ajuste necessário:</b> o plano requer um pouco mais de tempo devido à sua rotina atual.`;
  }

  window._lastTrilha = t;
}

/* =========================================================
   CRONOGRAMA MENSAL (a partir dos steps retornados pela IA)
   ========================================================= */
function renderCronograma() {
  const t = window._lastTrilha;
  const mount = document.getElementById('cronograma-mount');
  if (!t || !t.steps || !t.steps.length) {
    mount.innerHTML = '<p style="color:var(--ink-soft); font-size:13.5px;">Gere sua trilha primeiro para ver o cronograma.</p>';
    return;
  }

  // Agrupa os steps em meses, na ordem em que a IA os retornou.
  const stepsPerMonth = 2;
  const months = [];
  for (let i = 0; i < t.steps.length; i += stepsPerMonth) {
    months.push(t.steps.slice(i, i + stepsPerMonth));
  }

  mount.innerHTML = months.map((group, mi) => `
    <div class="month-block">
      <div class="month-head">
        <div class="month-name">Mês ${mi + 1}</div>
        <div class="month-count">${group.length} ${group.length === 1 ? 'item' : 'itens'}</div>
      </div>
      <div class="month-card">
        ${group.map((s, si) => `
          <label class="check-item" onclick="this.classList.toggle('checked')">
            <input type="checkbox">
            <span>${s.title}</span>
          </label>
        `).join('')}
      </div>
    </div>
  `).join('');
}

/* =========================================================
   REINICIAR ONBOARDING
   ========================================================= */
function restart() {
  Object.keys(answers).forEach(k => delete answers[k]);
  stepIndex = 0;
  document.getElementById('chat-messages').innerHTML = '';
  goTo('chat');
  buildProgressDots();
  askNextStep();
}