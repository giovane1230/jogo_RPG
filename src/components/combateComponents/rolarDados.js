// Função auxiliar para rolar expressões de dano como "2d6+3"
export function rolarDadoPersonalizado(diceExpr) {
  const match = diceExpr.match(/^(\d+)d(\d+)([+-]\d+)?$/i);
  if (!match) {
    console.error("Expressão inválida de dado:", diceExpr);
    return 0;
  }
  const quantidade = parseInt(match[1], 10);
  const lados = parseInt(match[2], 10);
  const modificador = match[3] ? parseInt(match[3], 10) : 0;
  console.log("QTD DADOS ROLADOS", quantidade);

  let total = 0;
  for (let i = 0; i < quantidade; i++) {
    total += rolarDado(lados, "personalizado");
  }
  total += modificador;
  return total;
}

// Função para rolar dado padrão
export function rolarDado(lados, qual) {
  const result = Math.floor(Math.random() * lados) + 1;
  console.log("ROLL", result, "Lados", lados, qual);
  return result;
}

export function rolarDadoAtaque(lados, modo = "normal") {
  const rolar = () => Math.floor(Math.random() * lados) + 1;

  const d1 = rolar();
  const d2 = rolar();

  switch (modo) {
    case "vantagem":
      return Math.max(d1, d2);
    case "desvantagem":
      return Math.min(d1, d2);
    default:
      return d1;
  }
}