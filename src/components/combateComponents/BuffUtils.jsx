function AtualizarBuffs(buffDetails) {
  const novosBuffs = {};

  for (const [nome, buff] of Object.entries(buffDetails)) {
    const novoCD = buff.CD > 0 ? buff.CD - 1 : 0;
    const novoTimeEffect = buff.timeEffect > 0 ? buff.timeEffect - 1 : 0;

    // Só mantém o buff se ainda tiver tempo de efeito ou cooldown
    if (novoCD > 0 || novoTimeEffect > 0) {
      novosBuffs[nome] = {
        CD: novoCD,
        timeEffect: novoTimeEffect
      };
    }
  }

  return novosBuffs;
}

function podeUsarBuff(player, nomeDoBuff) {
  const buff = player.buff[nomeDoBuff];
  console.log('defender', buff)
  return !buff || buff.CD === 0; // true se não existir ou se estiver pronto
}


export default { AtualizarBuffs, podeUsarBuff } ;