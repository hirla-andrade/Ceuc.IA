const answers = {};

function selectChip(id, el, qIndex) {
  const parent = el.parentElement;
  [...parent.children].forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
  answers[id] = el.dataset.value;
  document.getElementById('next-' + qIndex).disabled = false;
}

function setAnswer(id, val, qIndex) {
  answers[id] = val;
  document.getElementById('next-' + qIndex).disabled = val.trim().length === 0;
}

function goTo(screenId) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(screenId).classList.add('active');
  document.querySelector('.device').scrollTop = 0;
}

function finish() {
  goTo('loading');

  // Recupera o token de autenticação salvo durante o login
  const token = localStorage.getItem('ceucia_token'); 
  const API_URL = 'http://localhost:3001/api/trilha';

  fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // Envia a sessão segura para a API
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
    alert('Sessão expirada ou erro no servidor. Faça login novamente.');
    goTo('intro');
  });
}

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
}