export function aplicarDano(alvo, { dano, tipo }, setMensagens) {
  if (alvo.vida == null) {
    alvo.vida = alvo.hit_points;
    console.log(`${alvo.name}.vida inicializada com hit_points: ${alvo.vida}`);
  }
  if (alvo.damage_immunities.includes(tipo)) {
    console.log(`Imune a ${tipo}`);
    setMensagens((prev) => [
      ...prev,
      { tipo: "sistema", texto: `Imune a ${tipo}` },
    ]);
    dano = 0;
  } else if (alvo.damage_vulnerabilities.includes(tipo)) {
    console.log(`Vulnerável a ${tipo}, dano dobrado`);
    setMensagens((prev) => [
      ...prev,
      { tipo: "sistema", texto: `Vulnerável a ${tipo}, dano dobrado` },
    ]);
    dano = dano * 2;
  } else if (alvo.damage_resistances.includes(tipo)) {
    console.log(`Resistente a ${tipo}, dano reduzido pela metade`);
    setMensagens((prev) => [
      ...prev,
      {
        tipo: "sistema",
        texto: `Resistente a ${tipo}, dano reduzido pela metade`,
      },
    ]);
    dano = Math.floor(dano / 2);
  }
  alvo.vida = Math.max(0, alvo.vida - dano);
  setMensagens((prev) => [
    ...prev,
    {
      tipo: "sistema",
      texto: `${alvo.name} recebeu ${dano} de dano (${tipo}), vida agora ${alvo.vida}`,
    },
  ]);
}