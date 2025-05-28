// buffsDebuffs.js

const buffsDebuffs = {
  desvantagem: (context) => {
    // Aplica desvantagem em testes, ataques ou defesas
    context.desvantagem = true;
  },

  restritoAlvo: (context) => {
    // Limita os alvos disponíveis
    context.alvoRestringido = true;
  },

  semAção: (context) => {
    // Impede de realizar ações
    context.podeAgir = false;
  },

  semMovimento: (context) => {
    // Impede de se mover
    context.movimento = 0;
  },

  criticoAdjacente: (context) => {
    // Ataques adjacentes sempre causam crítico
    context.criticoAdjacente = true;
  },

  inimigoVantagem: (context) => {
    // Ataques contra este personagem têm vantagem
    context.vulneravel = true;
  },

  ignorarAlvo: (context) => {
    // Não pode atacar ou usar habilidades contra o alvo
    context.ignorarAlvo = true;
  },

  semReacao: (context) => {
    // Não pode realizar reações
    context.podeReagir = false;
  },

  semVisao: (context) => {
    // Não pode perceber inimigos visualmente
    context.visao = false;
  },

  semAudio: (context) => {
    // Não pode ouvir
    context.audio = false;
  },

  nivelExaustao: (context) => {
    // Exaustão: cada nível adiciona penalidades
    context.nivelExaustao = (context.nivelExaustao || 0) + 1;
  },

  invisivel: (context) => {
    // Fica invisível
    context.invisivel = true;
  },

  inimigoDesvantagem: (context) => {
    // Ataques contra este personagem sofrem desvantagem
    context.inimigoDesvantagem = true;
  },

  vantagemAtaque: (context) => {
    // Este personagem tem vantagem ao atacar
    context.vantagemAtaque = true;
  },

  imune: (context) => {
    // Imune a dano
    context.imune = true;
  },

  desvantagemDistancia: (context) => {
    // Desvantagem apenas para ataques à distância
    context.desvantagemDistancia = true;
  },

  inimigoVantagemMelee: (context) => {
    // Inimigos adjacentes têm vantagem nos ataques
    context.inimigoVantagemMelee = true;
  }
};

export default buffsDebuffs;
