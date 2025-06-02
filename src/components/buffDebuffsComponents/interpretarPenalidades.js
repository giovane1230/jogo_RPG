export function interpretarPenalidades(entity) {
  const efeitos = {
    podeMover: true,
    podeAgir: true,
    podeReagir: true,
    temDesvantagem: false,
    inimigosTêmVantagem: false,
    inimigosTêmVantagemMelee: false,
    inimigosTêmDesvantagem: false,
    vantagemAtaque: false,
    criticoAdjacente: false,
    imuneADano: false,
    invisivel: false,
    semVisao: false,
    semAudio: false,
    nivelExaustao: 0,
    desvantagemDistancia: false,
    restritoAlvo: false,
    ignorarAlvo: false,
  };

  const buffs = entity?.buff || {};
  console.log("Buffs encontrados:", buffs);

  for (const key in buffs) {
    const cond = buffs[key];
    if (!cond.penalidades) continue;

    for (const penalidade of cond.penalidades) {
      switch (penalidade) {
        case "semMovimento":
          efeitos.podeMover = false;
          break;
        case "semAção":
          efeitos.podeAgir = false;
          break;
        case "semReacao":
          efeitos.podeReagir = false;
          break;
        case "desvantagem":
          efeitos.temDesvantagem = true;
          break;
        case "desvantagemDistancia":
          efeitos.desvantagemDistancia = true;
          break;
        case "restritoAlvo":
          efeitos.restritoAlvo = true;
          break;
        case "ignorarAlvo":
          efeitos.ignorarAlvo = true;
          break;
        case "inimigoVantagem":
          efeitos.inimigosTêmVantagem = true;
          break;
        case "inimigoVantagemMelee":
          efeitos.inimigosTêmVantagemMelee = true;
          break;
        case "inimigoDesvantagem":
          efeitos.inimigosTêmDesvantagem = true;
          break;
        case "vantagemAtaque":
          efeitos.vantagemAtaque = true;
          break;
        case "criticoAdjacente":
          efeitos.criticoAdjacente = true;
          break;
        case "imune":
          efeitos.imuneADano = true;
          break;
        case "invisivel":
          efeitos.invisivel = true;
          break;
        case "semVisao":
          efeitos.semVisao = true;
          break;
        case "semAudio":
          efeitos.semAudio = true;
          break;
        case "nivelExaustao":
          efeitos.nivelExaustao += 1; // supondo acúmulo de níveis
          break;
        default:
          console.warn(`Penalidade desconhecida: ${penalidade}`);
      }
    }
  }

  return efeitos;
}

// função pronta para evitar movimento caso o jogador tenha podeMover/semMovimento
// const efeitos = interpretarPenalidades(personagem);
// if (!efeitos.podeMover) {
//     console.log(`${personagem.name} não pode se mover!`);
// }
