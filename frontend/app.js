/* ---------------- DATA: QUESTIONS ---------------- */
const questions = [
  {
    id:'idade', block:'Bloco 1 — Quem ela é',
    title:'Qual sua idade?',
    type:'chip',
    options:['18–24','25–30','31–36','37 ou mais']
  },
  {
    id:'filhos', block:'Bloco 1 — Quem ela é',
    title:'Quantos filhos você tem?',
    type:'chip',
    options:['1','2','3 ou mais']
  },
  {
    id:'rede_apoio', block:'Bloco 1 — Quem ela é',
    title:'Você tem rede de apoio para dividir o cuidado com os filhos?',
    type:'chip',
    options:['Forte','Parcial','Não tenho']
  },
  {
    id:'momento', block:'Bloco 1 — Quem ela é',
    title:'Como você descreveria seu momento de maternidade hoje?',
    type:'chip',
    options:['Licença-maternidade','Retorno recente ao trabalho','Filhos maiores, mais independentes']
  },
  {
    id:'area', block:'Bloco 2 — Onde ela está',
    title:'Qual sua área de atuação hoje (ou a última em que atuou)?',
    type:'text', placeholder:'ex: Marketing, Educação, Varejo, ou "não estou atuando agora"'
  },
  {
    id:'crescer_migrar', block:'Bloco 2 — Onde ela está',
    title:'Você quer crescer na carreira atual ou migrar para outra área?',
    type:'chip',
    options:['Crescer na carreira atual','Migrar de área','Não estou atuando no momento']
  },
  {
    id:'clareza', block:'Bloco 2 — Onde ela está',
    title:'Você sabe claramente o que quer ser ou fazer daqui pra frente?',
    type:'chip',
    options:['Sim, tenho clareza','Tenho uma ideia, mas não certeza','Ainda estou descobrindo']
  },
  {
    id:'profissao', block:'Bloco 2 — Onde ela está',
    title:'Me conta em poucas palavras: qual profissão ou objetivo você já tem em mente?',
    type:'text', placeholder:'ex: quero trabalhar com gestão de projetos...'
  },
  {
    id:'apt1', block:'Descobrindo seu caminho',
    title:'Do que você mais gosta no seu dia a dia?',
    type:'chip',
    options:['Organizar e planejar coisas','Conversar e ajudar pessoas','Criar conteúdo ou soluções visuais','Analisar números e processos','Cuidar, ensinar ou orientar pessoas','Vender ou negociar']
  },
  {
    id:'apt2', block:'Descobrindo seu caminho',
    title:'Você prefere tarefas mais práticas ou mais criativas?',
    type:'chip',
    options:['Práticas e objetivas','Criativas e livres','Um pouco dos dois']
  },
  {
    id:'objetivo', block:'Bloco 3 — Para onde ela vai',
    title:'Qual seu objetivo profissional principal?',
    type:'chip',
    options:['Crescer de cargo','Conseguir um novo emprego','Conseguir meu primeiro emprego','Voltar a atuar depois de um tempo fora','Empreender']
  },
  {
    id:'prazo', block:'Bloco 3 — Para onde ela vai',
    title:'Em quanto tempo você gostaria de atingir esse objetivo?',
    type:'chip',
    options:['3 meses','6 meses','1 ano ou mais']
  },
  {
    id:'formato', block:'Bloco 3 — Para onde ela vai',
    title:'Pensando no formato, o que combina mais com você?',
    type:'chip',
    options:['Emprego fixo (CLT)','Trabalhar por conta própria (PJ)','Empreender com um negócio','Ainda não sei']
  },
  {
    id:'horas', block:'Bloco 4 — Rotina real',
    title:'Quantas horas por semana você consegue dedicar, de forma realista?',
    type:'slider', min:1, max:20, default:6, unit:'h/semana'
  },
  {
    id:'aprendizado', block:'Bloco 4 — Rotina real',
    title:'Como você aprende melhor?',
    type:'chip',
    options:['Sozinha, no meu ritmo','Em grupo, trocando com outras pessoas','Com alguém me acompanhando de perto']
  },
  {
    id:'limitacao', block:'Bloco 4 — Rotina real',
    title:'Existe alguma limitação financeira que devemos considerar?',
    type:'chip',
    options:['Só posso usar conteúdo gratuito','Tenho um orçamento pequeno','Posso investir sem grande restrição']
  },
  {
    id:'trava', block:'Bloco 5 — O que mais trava',
    title:'O que mais te trava hoje?',
    type:'chip',
    options:['Falta de tempo','Falta de clareza sobre o próximo passo','Falta de confiança','Viés de mercado por ser mãe']
  },
  {
    id:'financeiro', block:'Bloco 5 — O que mais trava',
    title:'Você sente que tem liberdade sobre seu próprio dinheiro e documentos?',
    type:'chip',
    options:['Sim, decido livremente sobre meus recursos','Divido essas decisões em conjunto, sem problema','Não, alguém controla meu dinheiro, cartões ou documentos']
  },
  {
    id:'bem_estar', block:'Bloco 5 — Cuidado com você',
    title:'Como está sua energia e bem-estar emocional nesse momento?',
    type:'chip',
    options:['Bem, me sinto com energia','Cansada, mas dando conta','Precisando de mais apoio']
  }
];

const careerSuggestions = {
  "Organizar e planejar coisas": [
    { t: "Assistente administrativo", d: "Boa entrada pra quem já organiza rotinas complexas em casa ou no trabalho." },
    { t: "Gestão de projetos", d: "Para quem gosta de planejar prazos e acompanhar entregas." },
    { t: "Logística e operações", d: "Combina organização com resolução prática de problemas do dia a dia." },
    { t: "Secretariado executivo", d: "Organização de agendas, processos e comunicação em nível estratégico." },
    { t: "Facilities e gestão predial", d: "Coordenação de rotinas e fornecedores, com processos bem definidos." }
  ],
  "Conversar e ajudar pessoas": [
    { t: "Atendimento e vendas", d: "Aproveita habilidades de comunicação já desenvolvidas no dia a dia." },
    { t: "Recursos Humanos", d: "Para quem gosta de mediar pessoas e organizar processos de equipe." },
    { t: "Educação infantil", d: "Combina experiência prática com maternidade e abre espaço pra formalização." },
    { t: "Atendimento ao cliente (CS)", d: "Resolver problemas e manter relacionamento com clientes de uma empresa." },
    { t: "Terapias e cuidado (com formação)", d: "Para quem se identifica com escuta e cuidado, com formação específica depois." }
  ],
  "Criar conteúdo ou soluções visuais": [
    { t: "Gestão de redes sociais", d: "Baixo custo pra começar, boa opção pra quem quer flexibilidade de horário." },
    { t: "Design gráfico", d: "Para quem gosta de criar peças visuais e já tem esse olhar apurado." },
    { t: "Produção de conteúdo", d: "Escrever, gravar ou editar para marcas e perfis, com rotina flexível." },
    { t: "UX/UI (design de produto)", d: "Área em alta, para quem gosta de resolver problemas através do visual." },
    { t: "Fotografia e edição", d: "Pode começar como serviço autônomo, com equipamento simples." }
  ],
  "Analisar números e processos": [
    { t: "Administrativo-financeiro", d: "Para quem se sente confortável com planilhas e controle de contas." },
    { t: "Análise de dados", d: "Área em crescimento, com bons cursos introdutórios gratuitos." },
    { t: "Controladoria", d: "Combina atenção a detalhes com organização de processos." },
    { t: "Contabilidade", d: "Estável e com demanda constante, exige formação técnica específica." },
    { t: "Compras e suprimentos", d: "Negociação e controle de custos dentro de uma empresa." }
  ],
  "Cuidar, ensinar ou orientar pessoas": [
    { t: "Educação infantil", d: "Combina experiência prática com maternidade e abre espaço pra formalização." },
    { t: "Recursos Humanos", d: "Para quem gosta de apoiar o desenvolvimento de outras pessoas." },
    { t: "Mentoria e treinamento corporativo", d: "Compartilhar experiência prática de forma estruturada." },
    { t: "Cuidados de saúde (com formação)", d: "Área com alta demanda, exige qualificação técnica específica." }
  ],
  "Vender ou negociar": [
    { t: "Vendas B2B ou B2C", d: "Boa remuneração por resultado, para quem gosta de negociar." },
    { t: "Representação comercial", d: "Flexibilidade de rotina, com ganhos ligados a performance." },
    { t: "Empreendedorismo", d: "Para quem já tem ideia de negócio e perfil de vendas natural." },
    { t: "Corretagem (imóveis, seguros)", d: "Rotina flexível e ganhos por comissão, exige registro específico." }
  ]
};
const answers = {};
let currentIndex = 0;

window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => goTo('intro'), 1600);
});

const API_BASE = window.CEUC_API_BASE || 'http://localhost:3001/api';
let userId = null;
let userName = '';
let userEmail = '';

async function loginContinue(asGuest) {
  if (!asGuest) {
    const nameEl = document.getElementById('login-name');
    const emailEl = document.getElementById('login-email');
    userName = nameEl ? nameEl.value.trim() : '';
    userEmail = emailEl ? emailEl.value.trim() : '';
  }
  try {
    const res = await fetch(`${API_BASE}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome: userName, email: userEmail, convidada: asGuest })
    });
    const data = await res.json();
    userId = data.id;
  } catch (e) {
    console.warn('Backend indisponível, seguindo apenas no front-end.', e);
  }
  goTo('q-0');
}

/* ---------------- BUILD QUESTION SCREENS ---------------- */
const mount = document.getElementById('questions-mount');

questions.forEach((q, i) => {
  const screen = document.createElement('div');
  screen.className = 'screen';
  screen.id = 'q-' + i;

  const totalSegs = questions.length;
  let segsHtml = '';
  for (let s = 0; s < totalSegs; s++) {
    segsHtml += `<div class="progress-seg" data-seg="${s}"></div>`;
  }

  let fieldHtml = '';
  if (q.type === 'chip') {
    fieldHtml = `<div class="chip-grid">` + q.options.map(opt =>
      `<button class="chip" data-value="${opt}" onclick="selectChip('${q.id}', this, '${i}')">${opt}</button>`
    ).join('') + `</div>`;
  } else if (q.type === 'text') {
    fieldHtml = `<input class="text-input" type="text" placeholder="${q.placeholder}" oninput="setAnswer('${q.id}', this.value, '${i}')">`;
  } else if (q.type === 'slider') {
    fieldHtml = `
      <div class="slider-wrap">
        <div class="slider-value"><span id="val-${q.id}">${q.default}</span> <span>${q.unit}</span></div>
        <input type="range" min="${q.min}" max="${q.max}" value="${q.default}"
          oninput="document.getElementById('val-${q.id}').textContent=this.value; setAnswer('${q.id}', this.value, '${i}')">
      </div>`;
    answers[q.id] = q.default;
  }

  screen.innerHTML = `
    <div class="progress-trail">${segsHtml}</div>
    <div class="q-block-label">${q.block}</div>
    <div class="q-title">${q.title}</div>
    ${fieldHtml}
    <div class="spacer"></div>
    <div class="btn-row">
      <button class="btn btn-ghost" onclick="goTo(${i === 0 ? "'login'" : "'q-" + (i - 1) + "'"})">Voltar</button>
      <button class="btn btn-primary" id="next-${i}" ${q.type !== 'slider' ? 'disabled' : ''}
        onclick="${i === questions.length - 1 ? 'finish()' : `goTo('q-${i + 1}')`}">
        ${i === questions.length - 1 ? 'Gerar minha trilha' : 'Próxima'}
      </button>
    </div>
  `;
  mount.appendChild(screen);
});

/* ---------------- BRANCHING OVERRIDES ---------------- */
// index map: 0 idade,1 filhos,2 rede_apoio,3 momento,4 area,5 crescer_migrar,
// 6 clareza,7 profissao,8 apt1,9 apt2,10 objetivo,11 prazo,12 formato,
// 13 horas,14 aprendizado,15 limitacao,16 trava,17 financeiro,18 bem_estar
document.getElementById('next-6').onclick = function () {
  if (answers['clareza'] === 'Ainda estou descobrindo') { goTo('q-8'); }
  else { goTo('q-7'); }
};
document.getElementById('next-7').onclick = function () { goTo('q-10'); };
document.getElementById('next-9').onclick = function () { goTo('explainer'); renderExplainer(); };
document.getElementById('next-17').onclick = function () {
  if ((answers['financeiro'] || '').indexOf('Não, alguém controla') === 0) { goTo('support'); }
  else { goTo('q-18'); }
};

function renderExplainer() {
  const list = document.getElementById('explainer-list');
  const continueBtn = document.getElementById('explainer-continue');
  const freeInput = document.getElementById('explainer-free');
  const options = careerSuggestions[answers['apt1']] || careerSuggestions['Organizar e planejar coisas'];
  list.innerHTML = '';
  freeInput.value = '';
  continueBtn.disabled = true;
  continueBtn.textContent = 'Seguir com esse caminho';
  options.forEach((c) => {
    const btn = document.createElement('button');
    btn.className = 'chip';
    btn.style.textAlign = 'left';
    btn.innerHTML = `<b>${c.t}</b><br><span style="font-weight:400; font-size:13px; opacity:0.85;">${c.d}</span>`;
    btn.addEventListener('click', () => {
      [...list.children].forEach((c2) => c2.classList.remove('selected'));
      btn.classList.add('selected');
      answers['carreira_escolhida'] = c.t;
      continueBtn.disabled = false;
      continueBtn.textContent = 'Seguir com ' + c.t;
    });
    list.appendChild(btn);
  });
  freeInput.addEventListener('input', () => {
    if (freeInput.value.trim()) {
      [...list.children].forEach((c2) => c2.classList.remove('selected'));
      answers['carreira_escolhida'] = freeInput.value.trim();
      continueBtn.disabled = false;
      continueBtn.textContent = 'Seguir com ' + freeInput.value.trim();
    }
  });
}

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
  updateProgress(screenId);
  document.querySelector('.device').scrollTop = 0;
}
function updateProgress(screenId) {
  if (!screenId.startsWith('q-')) return;
  const idx = parseInt(screenId.split('-')[1]);
  document.querySelectorAll(`#${screenId} .progress-seg`).forEach(seg => {
    const s = parseInt(seg.dataset.seg);
    seg.classList.toggle('done', s <= idx);
  });
}

/* ---------------- FINISH → GENERATE TRILHA ---------------- */
let lastTrilha = null;
async function finish() {
  goTo('loading');
  let trilha = null;
  try {
    const res = await fetch(`${API_BASE}/users/${userId}/trilha`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ respostas: answers })
    });
    if (res.ok) trilha = await res.json();
  } catch (e) {
    console.warn('Backend indisponível, gerando trilha localmente.', e);
  }
  setTimeout(() => {
    lastTrilha = trilha || buildTrilha(answers);
    renderResult(lastTrilha);
    goTo('result');
  }, 1400);
}

function buildTrilha(a) {
  // ---- RITMO: rede de apoio + horas/semana ----
  const horas = parseInt(a.horas || 6);
  const redeFraca = a.rede_apoio === 'Não tenho' || a.rede_apoio === 'Parcial';
  let numPassos, duracaoMeses, formato;
  if (redeFraca && horas <= 5) {
    numPassos = 3; duracaoMeses = 6; formato = 'microaulas de 20–30 min';
  } else if (horas >= 12) {
    numPassos = 5; duracaoMeses = 2; formato = 'blocos de estudo mais longos, poucas vezes por semana';
  } else {
    numPassos = 4; duracaoMeses = 4; formato = 'blocos curtos e frequentes';
  }

  // ---- CONTEÚDO: crescer/migrar + clareza ----
  const migrando = a.crescer_migrar === 'Migrar de área';
  const foraDoMercado = a.crescer_migrar === 'Não estou atuando no momento';
  const semClareza = a.clareza === 'Ainda estou descobrindo';
  const steps = [];

  if (a.carreira_escolhida) {
    steps.push({ title:`Primeiros passos em ${a.carreira_escolhida}`, why:'Você chegou a esse caminho a partir do que gosta de fazer — a trilha começa pelo essencial para dar os primeiros passos nessa direção.', tempo:'2 semanas', tag:'direção' });
  } else if (foraDoMercado) {
    steps.push({ title:'Atualizar currículo e LinkedIn do zero', why:'Como você não está atuando agora, o primeiro passo é reconstruir sua apresentação profissional, destacando também habilidades adquiridas fora do trabalho formal.', tempo:'2 semanas', tag:'recolocação' });
  } else if (migrando && semClareza) {
    steps.push({ title:'Explorar 2–3 áreas antes de escolher', why:`Como você ainda está descobrindo o que quer, a trilha começa testando caminhos em vez de indicar um curso específico direto.`, tempo:'2 semanas', tag:'exploração' });
  }
  if (migrando && !semClareza && !a.carreira_escolhida) {
    steps.push({ title:`Mapear a transição de ${a.area || 'sua área atual'} para a nova área`, why:'Você já sabe o que quer — o foco é encurtar o caminho, não explorar do zero.', tempo:'2 semanas', tag:'transição' });
  }
  if (!migrando && !foraDoMercado && !a.carreira_escolhida) {
    steps.push({ title:`Aprofundar competência em ${a.area || 'sua área'}`, why:'Como o objetivo é crescer onde você já está, o caminho prioriza especialização e visibilidade, não recomeço.', tempo:'3 semanas', tag:'especialização' });
  }

  steps.push({ title:'Construir uma prova concreta (projeto, certificação ou portfólio)', why:'Um resultado tangível pesa mais que tempo de estudo isolado na hora de mostrar valor.', tempo:'3–4 semanas', tag:'visibilidade' });

  if (a.trava === 'Viés de mercado por ser mãe') {
    steps.push({ title:'Preparar o discurso para entrevistas e networking', why:'Como o viés por ser mãe foi identificado como a maior trava, a trilha inclui um passo dedicado a como posicionar esse tema com confiança.', tempo:'1 semana', tag:'discurso' });
  } else if (a.trava === 'Falta de confiança') {
    steps.push({ title:'Registrar 3 conquistas concretas da sua trajetória', why:'Antes do próximo passo técnico, vale reconstruir a confiança com evidências reais do que você já entregou.', tempo:'1 semana', tag:'confiança' });
  } else if (a.trava === 'Falta de clareza sobre o próximo passo') {
    steps.push({ title:'Conversar com 2 profissionais da área desejada', why:'Clareza vem mais rápido de conversas reais do que de mais pesquisa sozinha.', tempo:'2 semanas', tag:'clareza' });
  }

  if (a.objetivo === 'Conseguir um novo emprego' || a.objetivo === 'Voltar a atuar depois de um tempo fora') {
    steps.push({ title:'Ativar a rede para recolocação ativa', why:'Prioriza resultado visível e rápido: candidaturas e indicações pesam mais nesse momento do que mais estudo isolado.', tempo:'2 semanas', tag:'ação' });
  } else if (a.objetivo === 'Conseguir meu primeiro emprego') {
    steps.push({ title:'Montar um currículo de entrada, mesmo sem experiência formal', why:'Sem experiência prévia registrada, o currículo precisa destacar habilidades práticas, cursos e projetos pessoais.', tempo:'2 semanas', tag:'entrada' });
  } else if (a.objetivo === 'Empreender') {
    steps.push({ title:'Validar a ideia com 5 conversas reais de potenciais clientes', why:'Prioriza resultado visível e rápido, já que o objetivo pessoal costuma ter prazo mais curto que o profissional.', tempo:'2 semanas', tag:'ação' });
  }

  const finalSteps = steps.slice(0, numPassos);

  // ---- RECURSOS: cursos, artigos e vídeos, gratuito x pago ----
  const alvo = a.carreira_escolhida || a.profissao || a.area || 'sua área';
  const gratuito = [
    { t:`Vídeo · Fundamentos de ${alvo}`, d:'Aulas introdutórias, direto ao ponto, sem precisar de curso longo.', why:'Fecha as lacunas mais básicas antes de qualquer entrevista ou candidatura.', tags:['Gratuito','1–2h'], link:'https://www.youtube.com/results?search_query=' + encodeURIComponent(alvo) },
    { t:'Artigo · Tendências do mercado', d:'Panorama atualizado da área, direto no portal público de emprego.', why:'Evita chegar a uma entrevista com informação desatualizada sobre a área.', tags:['Gratuito','Leitura rápida'], link:'https://www.gov.br/pt-br/servicos/emprega-brasil' },
    { t:'Comunidade de apoio', d:'Grupo de mães no mercado de trabalho, para trocar experiências e indicações.', why:'Boa parte das vagas circula por indicação antes de virar anúncio público.', tags:['Gratuito','Networking'], link:'https://www.linkedin.com/search/results/groups/?keywords=m%C3%A3es%20no%20mercado%20de%20trabalho' },
    { t:'Curso gratuito · Sebrae', d:'Cursos introdutórios de gestão, vendas e empreendedorismo, com certificado.', why:'Referência nacional e gratuita para quem está começando a estruturar um negócio ou uma nova área.', tags:['Gratuito','Certificado'], link:'https://sebrae.com.br/sites/PortalSebrae/cursosonline' }
  ];
  const pago = [
    { t:`Certificação · ${alvo}`, d:'Curso curto para reforçar o currículo com algo recente e reconhecido.', why:'Uma certificação recente pesa mais que anos de experiência não atualizada.', tags:['Pago','2 semanas'], link:'https://www.alura.com.br/' },
    { t:'Mentoria individual', d:'Acompanhamento próximo para currículo, LinkedIn e simulação de entrevista.', why:'Feedback de alguém da área corrige em uma sessão o que sozinha levaria semanas.', tags:['Pago','1 sessão'], link:'https://www.gov.br/pt-br/servicos/emprega-brasil' }
  ];
  if (a.limitacao === 'Só posso usar conteúdo gratuito') { pago.length = 0; }
  if (a.aprendizado === 'Em grupo, trocando com outras pessoas') {
    gratuito.push({ t:'Grupo de estudo', d:'Buscar ou formar um grupo pequeno pra estudar o mesmo conteúdo junto.', why:'Você indicou que aprende melhor trocando com outras pessoas — isso mantém a constância.', tags:['Gratuito','Constância'], link:'https://www.linkedin.com/search/results/groups/?keywords=' + encodeURIComponent(alvo) });
  }

  // ---- APOIO INSTITUCIONAL: ONGs, benefícios e programas ----
  const apoioInstitucional = [
    { t:'Contrate uma Mãe', d:'Banco de currículos gratuito, nacional, para recolocação profissional de mães.', link:'https://www.contrateumamae.com.br/' },
    { t:'Sebrae', d:'Apoio gratuito a quem quer empreender: cursos, orientação e formalização (MEI).', link:'https://sebrae.com.br/' },
    { t:'Salário-maternidade (INSS)', d:'Benefício previdenciário para mães seguradas do INSS durante a licença.', link:'https://www.gov.br/inss/pt-br' },
    { t:'Centro de Apoio ao Trabalho e Empreendedorismo (CATE)', d:'Cursos gratuitos de capacitação e vagas de recolocação, oferecidos por prefeituras (verifique disponibilidade na sua cidade).', link:'https://cate.prefeitura.sp.gov.br' },
    { t:'Mulheres de Produto', d:'Comunidade brasileira de mulheres em tecnologia e produto, com conteúdo e networking.', link:'https://www.mulheresdeproduto.com.br/' }
  ];

  // ---- POSICIONAMENTO: conforme formato desejado ----
  const posicionamentoMap = {
    'Emprego fixo (CLT)': [
      { t:'LinkedIn', d:'Perfil atualizado com foco em resultados, não em tarefas.', link:'https://www.linkedin.com/' },
      { t:'Currículo', d:'Objetivo, sem lacunas destacadas — o tempo parado não precisa ser o centro da história.', link:'https://www.canva.com/curriculos/' },
      { t:'Discurso', d:'Resposta pronta e natural para perguntas sobre maternidade em entrevista.' }
    ],
    'Trabalhar por conta própria (PJ)': [
      { t:'Portfólio', d:'Cases reais que mostrem o que você já entregou.' },
      { t:'Presença profissional', d:'Perfil ativo em pelo menos uma rede social profissional.', link:'https://www.linkedin.com/' },
      { t:'Proposta de valor', d:'Uma frase clara sobre o que você resolve para quem te contrata.' }
    ],
    'Empreender com um negócio': [
      { t:'Identidade de marca', d:'Nome, cores e discurso simples e consistente desde o início.' },
      { t:'Canal de venda', d:'Escolher onde vender primeiro: Instagram, marketplace ou indicação.' },
      { t:'Formalização (MEI)', d:'Regularizar o negócio simplifica emissão de nota e acesso a crédito.', link:'https://www.gov.br/mei/pt-br' }
    ],
    'Ainda não sei': [
      { t:'Comparar caminhos', d:'Vale entender as diferenças entre CLT, PJ e empreendedorismo antes de decidir.', link:'https://www.gov.br/pt-br/servicos/emprega-brasil' }
    ]
  };
  const posicionamento = posicionamentoMap[a.formato] || posicionamentoMap['Ainda não sei'];

  // ---- ALERTAS: rede de apoio + bem-estar ----
  const alertas = [];
  if (redeFraca) {
    alertas.push({
      label:'Alerta de rotina',
      texto: a.rede_apoio === 'Não tenho'
        ? 'Sem rede de apoio hoje, o ritmo da trilha foi reduzido de propósito: menos passos simultâneos, prazos mais longos e formato em microaulas — para caber na rotina real, não na ideal.'
        : 'Com rede de apoio parcial, os passos foram espaçados para não sobrecarregar as janelas de tempo disponíveis.'
    });
  }
  if (a.bem_estar === 'Precisando de mais apoio') {
    alertas.push({
      label:'Cuidado com você',
      texto:'Antes de qualquer passo de carreira, vale reservar espaço para cuidar de você — inclusive procurando apoio profissional se fizer sentido. A trilha não substitui isso, ela caminha junto.'
    });
  }

  // ---- PRAZO ----
  const prazoDesejadoMap = { '3 meses': 3, '6 meses': 6, '1 ano ou mais': 12 };
  const prazoDesejado = prazoDesejadoMap[a.prazo] || 6;
  const realista = duracaoMeses <= prazoDesejado;

  const resumo = foraDoMercado
    ? `Você está fora do mercado de trabalho no momento, com rede de apoio ${(a.rede_apoio||'').toLowerCase()} e ${horas}h/semana disponíveis. A maior trava hoje é ${(a.trava||'').toLowerCase()}.`
    : `Você atua em ${a.area || 'sua área'}, no momento de "${(a.momento||'').toLowerCase()}", com rede de apoio ${(a.rede_apoio||'').toLowerCase()} e ${horas}h/semana disponíveis. A maior trava hoje é ${(a.trava||'').toLowerCase()}.`;

  return {
    resumo,
    steps: finalSteps,
    alertas,
    formato,
    recursos: { gratuito, pago },
    posicionamento,
    apoioInstitucional,
    prazoDesejado: a.prazo,
    prazoEstimado: `${duracaoMeses} ${duracaoMeses === 1 ? 'mês' : 'meses'}`,
    duracaoMeses,
    realista
  };
}

function renderResult(t) {
  document.getElementById('result-title').textContent = userName ? `${userName}, sua trilha` : 'Sua trilha, passo a passo';
  document.getElementById('result-summary').textContent = t.resumo + ` Formato recomendado: ${t.formato}.`;

  const alertMount = document.getElementById('alert-mount');
  alertMount.innerHTML = t.alertas.map(al =>
    `<div class="alert-card"><b>${al.label}</b>${al.texto}</div>`
  ).join('');

  const stepsMount = document.getElementById('steps-mount');
  stepsMount.innerHTML = t.steps.map((s, i) => `
    <div class="step">
      <div class="step-marker">${String(i+1).padStart(2,'0')}</div>
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

  const gratuitoMount = document.getElementById('res-gratuito-mount');
  gratuitoMount.innerHTML = t.recursos.gratuito.map(r => `
    <div class="res-card">
      <h6>${r.t}</h6>
      <p>${r.d}</p>
      ${r.why ? `<p style="font-style:italic; color:#a892c4; font-size:11.5px;">Por quê: ${r.why}</p>` : ''}
      ${r.tags ? `<div style="display:flex; gap:6px; flex-wrap:wrap; margin-bottom:6px;">${r.tags.map(tg=>`<span class="res-col-head free" style="font-size:9.5px;">${tg}</span>`).join('')}</div>` : ''}
      ${r.link ? `<a href="${r.link}" target="_blank" rel="noopener">Acessar →</a>` : ''}
    </div>
  `).join('');

  const pagoMount = document.getElementById('res-pago-mount');
  pagoMount.innerHTML = t.recursos.pago.length
    ? t.recursos.pago.map(r => `
      <div class="res-card">
        <h6>${r.t}</h6>
        <p>${r.d}</p>
        ${r.why ? `<p style="font-style:italic; color:#a892c4; font-size:11.5px;">Por quê: ${r.why}</p>` : ''}
        ${r.tags ? `<div style="display:flex; gap:6px; flex-wrap:wrap; margin-bottom:6px;">${r.tags.map(tg=>`<span class="res-col-head paid" style="font-size:9.5px;">${tg}</span>`).join('')}</div>` : ''}
        ${r.link ? `<a href="${r.link}" target="_blank" rel="noopener">Acessar →</a>` : ''}
      </div>
    `).join('')
    : `<div class="res-card"><p>Você indicou preferência só por conteúdo gratuito — nenhuma recomendação paga foi incluída de propósito.</p></div>`;

  const posMount = document.getElementById('pos-mount');
  posMount.innerHTML = t.posicionamento.map(p => `
    <div class="pos-card">
      <h6>${p.t}</h6>
      <p>${p.d}</p>
      ${p.link ? `<a href="${p.link}" target="_blank" rel="noopener">Ver mais →</a>` : ''}
    </div>
  `).join('');

  const apoioMount = document.getElementById('apoio-mount');
  apoioMount.innerHTML = t.apoioInstitucional.map(ap => `
    <div class="apoio-card">
      <h6>${ap.t}</h6>
      <p>${ap.d}</p>
      <a href="${ap.link}" target="_blank" rel="noopener">Acessar →</a>
    </div>
  `).join('');

  document.getElementById('prazo-desejado').textContent = t.prazoDesejado;
  document.getElementById('prazo-estimado').textContent = t.prazoEstimado;
  document.getElementById('prazo-verdict').innerHTML = t.realista
    ? `<b>Realista:</b> a trilha estimada cabe dentro do prazo que você pediu.`
    : `<b>Atenção:</b> a trilha estimada passa do prazo pedido — vale ajustar expectativa ou aumentar horas/semana.`;
}

/* ---------------- CRONOGRAMA MENSAL ---------------- */
function renderCronograma() {
  if (!lastTrilha) return;
  const mount = document.getElementById('cronograma-mount');
  const meses = Math.max(1, lastTrilha.duracaoMeses);
  const steps = lastTrilha.steps;
  const perMonth = Math.ceil(steps.length / meses) || 1;

  const recorrentes = [
    'Manter candidaturas ou contatos ativos',
    'Revisar LinkedIn e currículo com o progresso do mês',
    'Reservar 1 momento de descanso na semana'
  ];

  let html = '';
  let stepCursor = 0;
  for (let m = 1; m <= meses; m++) {
    const monthSteps = steps.slice(stepCursor, stepCursor + perMonth);
    stepCursor += perMonth;
    const items = monthSteps.map(s => s.title);
    if (m === meses) items.push(recorrentes[2]);
    else items.push(recorrentes[m % 2 === 0 ? 1 : 0]);

    html += `
      <div class="month-block">
        <div class="month-head">
          <div class="month-name">Mês ${m}</div>
          <div class="month-count" data-total="${items.length}" data-done="0">0/${items.length}</div>
        </div>
        <div class="month-card">
          ${items.map((it, i) => `
            <label class="check-item" data-month="${m}">
              <input type="checkbox" onchange="toggleCheck(this)">
              <span>${it}</span>
            </label>
          `).join('')}
        </div>
      </div>
    `;
  }
  mount.innerHTML = html;
}

function toggleCheck(el) {
  const item = el.closest('.check-item');
  item.classList.toggle('checked', el.checked);
  const monthBlock = item.closest('.month-block');
  const counter = monthBlock.querySelector('.month-count');
  const total = parseInt(counter.dataset.total);
  const done = monthBlock.querySelectorAll('.check-item input:checked').length;
  counter.textContent = `${done}/${total}`;
}

function restart() {
  Object.keys(answers).forEach(k => delete answers[k]);
  userName = '';
  document.querySelectorAll('.chip.selected').forEach(c => c.classList.remove('selected'));
  document.querySelectorAll('.text-input').forEach(inp => inp.value = '');
  document.querySelectorAll('[id^="next-"]').forEach((btn, i) => {
    const q = questions[i];
    btn.disabled = q.type !== 'slider';
  });
  const explainerContinue = document.getElementById('explainer-continue');
  if (explainerContinue) { explainerContinue.disabled = true; explainerContinue.textContent = 'Seguir com esse caminho'; }
  goTo('intro');
}
