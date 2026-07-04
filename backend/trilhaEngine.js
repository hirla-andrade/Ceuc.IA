/* Motor de geração de trilha — porta em Node.js da lógica do front-end (app.js) */

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

module.exports = { buildTrilha, careerSuggestions };
