export function aplicarDano(alvo, { dano, tipo }, setMensagens) {
  let novaVida = alvo.vidaAtual ?? alvo.hit_points;
  
  if (alvo.damage_immunities?.includes(tipo)) {
    setMensagens((prev) => [
      ...prev,
      { tipo: "sistema", texto: `Imune a ${tipo}` },
    ]);
    dano = 0;
  } else if (alvo.damage_vulnerabilities?.includes(tipo)) {
    setMensagens((prev) => [
      ...prev,
      { tipo: "sistema", texto: `Vulnerável a ${tipo}, dano dobrado` },
    ]);
    dano *= 2;
  } else if (alvo.damage_resistances?.includes(tipo)) {
    setMensagens((prev) => [
      ...prev,
      { tipo: "sistema", texto: `Resistente a ${tipo}, dano reduzido pela metade` },
    ]);
    dano = Math.floor(dano / 2);
  }

  novaVida = Math.max(0, novaVida - dano);

  setMensagens((prev) => [
    ...prev,
    {
      tipo: "sistema",
      texto: `${alvo.name} recebeu ${dano} de dano (${tipo}), vidaAtual agora ${novaVida}`,
    },
  ]);

  return novaVida;
}
