const { Groq } = require('groq-sdk');

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

async function gerarTrilhaComIA(answers) {
  const promptParaIA = `
    Você é a inteligência artificial da CEUC.IA, uma plataforma criada no HackaWoman para acolher e impulsionar mães na sua trajetória de carreira.
    Analise as respostas do formulário de onboarding de forma extremamente empática, considerando a carga de trabalho invisível e a rotina real de uma mãe. 

    Respostas do Onboarding:
    - Rede de Apoio: ${answers.rede_apoio}
    - Momento de Maternidade: ${answers.momento}
    - Área de Atuação/Última Área: ${answers.area}
    - Objetivo de Carreira: ${answers.crescer_migrar}
    - Clareza de objetivos: ${answers.clareza}
    - Objetivo Profissional Principal: ${answers.objetivo}
    - Prazo Desejado: ${answers.prazo}
    - Horas Semanais Disponíveis de Forma Realista: ${answers.horas}h/semana
    - Maior Trava Atual: ${answers.trava}
    - Energia/Bem-estar Emocional: ${answers.bem_estar}

    Com base na quantidade de horas reais e se ela tem ou não rede de apoio, monte um cronograma profissionalizante, indicando cursos, metas tangíveis e caminhos de apoio gratuito ou ONGs se a situação for crítica.

    RETORNE ESTRITAMENTE APENAS UM OBJETO JSON. NÃO COLOQUE EXPLICAÇÕES ANTES OU DEPOIS.

    Formato esperado do JSON:
    {
      "resumo": "Um parágrafo acolhedor validando o momento de vida dela e resumindo o plano.",
      "formato": "Ex: microaulas de 15 min por dia, blocos focados no fim de semana, etc.",
      "prazoDesejado": "${answers.prazo}",
      "prazoEstimado": "Sua estimativa realista de tempo (Ex: '4 meses')",
      "realista": true,
      "alertas": [
        { "label": "Atenção à Rotina", "texto": "Conselho prático baseado na falta de tempo ou de rede de apoio." }
      ],
      "steps": [
        { "title": "Passo 1: Nome do Passo", "why": "O que fazer e onde buscar ajuda/cursos específicos de forma gratuita ou acessível", "tempo": "2 semanas", "tag": "estudo" },
        { "title": "Passo 2: Nome do Passo", "why": "Explicação curta do próximo objetivo", "tempo": "3 semanas", "tag": "prática" }
      ]
    }
  `;

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: 'Você é um microsserviço que responde apenas em formato JSON estrito. Nunca adicione saudações ou markdown fora do bloco JSON.' },
        { role: 'user', content: promptParaIA }
      ],
      model: 'llama3-8b-8192',
      temperature: 0.3,
    });

    const textoResposta = chatCompletion.choices[0].message.content;
    return JSON.parse(textoResposta);
  } catch (error) {
    console.error("Erro no motor da IA (trilhaEngine):", error);
    throw error;
  }
}

module.exports = { gerarTrilhaComIA };