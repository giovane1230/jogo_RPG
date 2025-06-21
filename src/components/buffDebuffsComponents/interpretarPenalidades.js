export function naoPodeAgir(character, setMensagens) {
  // 1. Verifica condições que impedem fugir
  const condicoes = character.buff || {};
  if (
    condicoes.paralyzed ||
    condicoes.stunned ||
    condicoes.incapacitated ||
    condicoes.unconscious ||
    condicoes.petrified ||
    condicoes.grappled
  ) {
    setMensagens((prev) => [
      ...prev,
      {
        tipo: "buff",
        texto: "Você está impossibilitado de agir devido a uma condição!",
      },
    ]);
    return true;
  }
  return false;
}

export function naoPodeAndar(character, setMensagens) {
  // 1. Verifica condições que impedem andar
  const condicoes = character.buff || {};
  if (
    condicoes.paralyzed ||
    condicoes.stunned ||
    condicoes.incapacitated ||
    condicoes.unconscious ||
    condicoes.petrified
  ) {
    setMensagens((prev) => [
      ...prev,
      {
        tipo: "buff",
        texto: "Você está impossibilitado de se movimentar devido a uma condição!",
      },
    ]);
    return true;
  }
  return false;
}
