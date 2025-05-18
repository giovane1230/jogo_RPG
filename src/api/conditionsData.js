const conditionsData = {
  frightened: {
    nome: "Amedrontado",
    descricao: "Desvantagem em testes e ataques enquanto a fonte do medo estiver visível.",
    duracao: 2,
    salvamento: "sabedoria",
    penalidades: ["desvantagem", "restritoAlvo"],
  },
  poisoned: {
    nome: "Envenenado",
    descricao: "Desvantagem em jogadas de ataque e testes de habilidade.",
    duracao: 2,
    salvamento: "constituicao",
    penalidades: ["desvantagem"],
  },
  paralyzed: {
    nome: "Paralisado",
    descricao: "Incapaz de agir ou se mover. Falha testes de FOR/DEX. Ataques corpo-a-corpo têm vantagem e causam crítico.",
    duracao: 2,
    salvamento: "constituicao",
    penalidades: ["semAção", "semMovimento", "criticoAdjacente", "inimigoVantagem"],
  },
  charmed: {
    nome: "Enfeitiçado",
    descricao: "Não pode atacar ou usar habilidades contra o encantador.",
    duracao: 2,
    salvamento: "carisma",
    penalidades: ["ignorarAlvo"],
  },
  stunned: {
    nome: "Atordoado",
    descricao: "Incapaz de agir, falha testes de resistência, ataques contra têm vantagem.",
    duracao: 2,
    salvamento: "constituicao",
    penalidades: ["semAção", "semMovimento", "inimigoVantagem"],
  },
  restrained: {
    nome: "Contido",
    descricao: "Movimento 0, desvantagem em DEX, ataques contra têm vantagem.",
    duracao: 2,
    salvamento: "destreza",
    penalidades: ["semMovimento", "desvantagem", "inimigoVantagem"],
  },
  blinded: {
    nome: "Cego",
    descricao: "Falha testes que requerem visão. Desvantagem em ataques, ataques contra têm vantagem.",
    duracao: 2,
    salvamento: "constituicao",
    penalidades: ["desvantagem", "inimigoVantagem", "semVisao"],
  },
  deafened: {
    nome: "Surdo",
    descricao: "Não pode ouvir. Pode afetar magias baseadas em som.",
    duracao: 2,
    salvamento: "constituicao",
    penalidades: ["semAudio"],
  },
  exhaustion: {
    nome: "Exaustão",
    descricao: "Efeitos acumulativos que incluem desvantagens e redução de atributos.",
    duracao: 3,
    salvamento: "constituicao",
    penalidades: ["nivelExaustao"], // implementar por nível
  },
  grappled: {
    nome: "Agarrado",
    descricao: "Movimento 0, sem outras penalidades.",
    duracao: 2,
    salvamento: "forca",
    penalidades: ["semMovimento"],
  },
  incapacitated: {
    nome: "Incapacitado",
    descricao: "Não pode realizar ações ou reações.",
    duracao: 2,
    salvamento: null,
    penalidades: ["semAção", "semReacao"],
  },
  invisible: {
    nome: "Invisível",
    descricao: "Impossível de ver. Ataques contra têm desvantagem. Ataques do invisível têm vantagem.",
    duracao: 2,
    salvamento: null,
    penalidades: ["invisivel", "inimigoDesvantagem", "vantagemAtaque"],
  },
  petrified: {
    nome: "Petrificado",
    descricao: "Transformado em pedra. Incapaz de agir. Imune a dano.",
    duracao: 5,
    salvamento: "constituicao",
    penalidades: ["semAção", "semMovimento", "imune"],
  },
  prone: {
    nome: "Caído",
    descricao: "Desvantagem em ataques à distância. Vantagem em ataques corpo-a-corpo contra.",
    duracao: 1,
    salvamento: "destreza",
    penalidades: ["desvantagemDistancia", "inimigoVantagemMelee"],
  },
  unconscious: {
    nome: "Inconsciente",
    descricao: "Incapaz de agir. Ataques têm vantagem e são críticos se adjacentes.",
    duracao: 2,
    salvamento: "constituicao",
    penalidades: ["semAção", "semReacao", "inimigoVantagem", "criticoAdjacente"],
  }
};

export default conditionsData;
