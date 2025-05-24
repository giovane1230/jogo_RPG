import React from "react";

// const legendaryActions = [
//   {
//     creature: "Aboleth",
//     actions: [
//       {
//         name: "Detect",
//         description: "The aboleth makes a Wisdom (Perception) check.",
//       },
//       {
//         name: "Tail Swipe",
//         description: "The aboleth makes one tail attack.",
//       },
//       {
//         name: "Psychic Drain",
//         cost: 2,
//         description:
//           "One creature charmed by the aboleth takes 10 (3d6) psychic damage, and the aboleth regains hit points equal to the damage the creature takes.",
//       },
//     ],
//   },
//   {
//     creature: "Adult Black Dragon",
//     actions: [
//       {
//         name: "Detect",
//         description: "The dragon makes a Wisdom (Perception) check.",
//       },
//       {
//         name: "Tail Attack",
//         description: "The dragon makes a tail attack.",
//       },
//       {
//         name: "Wing Attack",
//         cost: 2,
//         description:
//           "The dragon beats its wings. Each creature within 10 ft. of the dragon must succeed on a DC 19 Dexterity saving throw or take 13 (2d6 + 6) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed.",
//       },
//     ],
//   },
//   {
//     creature: "Adult Blue Dragon",
//     actions: [
//       {
//         name: "Detect",
//         description: "The dragon makes a Wisdom (Perception) check.",
//       },
//       {
//         name: "Tail Attack",
//         description: "The dragon makes a tail attack.",
//       },
//       {
//         name: "Wing Attack",
//         cost: 2,
//         description:
//           "The dragon beats its wings. Each creature within 10 ft. of the dragon must succeed on a DC 20 Dexterity saving throw or take 14 (2d6 + 7) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed.",
//       },
//     ],
//   },
//   {
//     creature: "Adult Brass Dragon",
//     actions: [
//       {
//         name: "Detect",
//         description: "The dragon makes a Wisdom (Perception) check.",
//       },
//       {
//         name: "Tail Attack",
//         description: "The dragon makes a tail attack.",
//       },
//       {
//         name: "Wing Attack",
//         cost: 2,
//         description:
//           "The dragon beats its wings. Each creature within 10 ft. of the dragon must succeed on a DC 19 Dexterity saving throw or take 13 (2d6 + 6) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed.",
//       },
//     ],
//   },
//   {
//     creature: "Adult Bronze Dragon",
//     actions: [
//       {
//         name: "Detect",
//         description: "The dragon makes a Wisdom (Perception) check.",
//       },
//       {
//         name: "Tail Attack",
//         description: "The dragon makes a tail attack.",
//       },
//       {
//         name: "Wing Attack",
//         cost: 2,
//         description:
//           "The dragon beats its wings. Each creature within 10 ft. of the dragon must succeed on a DC 20 Dexterity saving throw or take 14 (2d6 + 7) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed.",
//       },
//     ],
//   },
//   {
//     creature: "Adult Copper Dragon",
//     actions: [
//       {
//         name: "Detect",
//         description: "The dragon makes a Wisdom (Perception) check.",
//       },
//       {
//         name: "Tail Attack",
//         description: "The dragon makes a tail attack.",
//       },
//       {
//         name: "Wing Attack",
//         cost: 2,
//         description:
//           "The dragon beats its wings. Each creature within 10 ft. of the dragon must succeed on a DC 19 Dexterity saving throw or take 13 (2d6 + 6) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed.",
//       },
//     ],
//   },
//   {
//     creature: "Adult Gold Dragon",
//     actions: [
//       {
//         name: "Detect",
//         description: "The dragon makes a Wisdom (Perception) check.",
//       },
//       {
//         name: "Tail Attack",
//         description: "The dragon makes a tail attack.",
//       },
//       {
//         name: "Wing Attack",
//         cost: 2,
//         description:
//           "The dragon beats its wings. Each creature within 10 ft. of the dragon must succeed on a DC 22 Dexterity saving throw or take 15 (2d6 + 8) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed.",
//       },
//     ],
//   },
//   {
//     creature: "Adult Green Dragon",
//     actions: [
//       {
//         name: "Detect",
//         description: "The dragon makes a Wisdom (Perception) check.",
//       },
//       {
//         name: "Tail Attack",
//         description: "The dragon makes a tail attack.",
//       },
//       {
//         name: "Wing Attack",
//         cost: 2,
//         description:
//           "The dragon beats its wings. Each creature within 10 ft. of the dragon must succeed on a DC 19 Dexterity saving throw or take 13 (2d6 + 6) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed.",
//       },
//     ],
//   },
//   {
//     creature: "Adult Red Dragon",
//     actions: [
//       {
//         name: "Detect",
//         description: "The dragon makes a Wisdom (Perception) check.",
//       },
//       {
//         name: "Tail Attack",
//         description: "The dragon makes a tail attack.",
//       },
//       {
//         name: "Wing Attack",
//         cost: 2,
//         description:
//           "The dragon beats its wings. Each creature within 10 ft. of the dragon must succeed on a DC 22 Dexterity saving throw or take 15 (2d6 + 8) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed.",
//       },
//     ],
//   },
//   {
//     creature: "Adult Silver Dragon",
//     actions: [
//       {
//         name: "Detect",
//         description: "The dragon makes a Wisdom (Perception) check.",
//       },
//       {
//         name: "Tail Attack",
//         description: "The dragon makes a tail attack.",
//       },
//       {
//         name: "Wing Attack",
//         cost: 2,
//         description:
//           "The dragon beats its wings. Each creature within 10 ft. of the dragon must succeed on a DC 22 Dexterity saving throw or take 15 (2d6 + 8) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed.",
//       },
//     ],
//   },
//   {
//     creature: "Adult White Dragon",
//     actions: [
//       {
//         name: "Detect",
//         description: "The dragon makes a Wisdom (Perception) check.",
//       },
//       {
//         name: "Tail Attack",
//         description: "The dragon makes a tail attack.",
//       },
//       {
//         name: "Wing Attack",
//         cost: 2,
//         description:
//           "The dragon beats its wings. Each creature within 10 ft. of the dragon must succeed on a DC 19 Dexterity saving throw or take 13 (2d6 + 6) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed.",
//       },
//     ],
//   },
//   {
//     creature: "Ancient Black Dragon",
//     actions: [
//       {
//         name: "Detect",
//         description: "The dragon makes a Wisdom (Perception) check.",
//       },
//       {
//         name: "Tail Attack",
//         description: "The dragon makes a tail attack.",
//       },
//       {
//         name: "Wing Attack",
//         cost: 2,
//         description:
//           "The dragon beats its wings. Each creature within 15 ft. of the dragon must succeed on a DC 23 Dexterity saving throw or take 15 (2d6 + 8) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed.",
//       },
//     ],
//   },
//   {
//     creature: "Ancient Blue Dragon",
//     actions: [
//       {
//         name: "Detect",
//         description: "The dragon makes a Wisdom (Perception) check.",
//       },
//       {
//         name: "Tail Attack",
//         description: "The dragon makes a tail attack.",
//       },
//       {
//         name: "Wing Attack",
//         cost: 2,
//         description:
//           "The dragon beats its wings. Each creature within 15 ft. of the dragon must succeed on a DC 24 Dexterity saving throw or take 16 (2d6 + 9) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed.",
//       },
//     ],
//   },
//   {
//     creature: "Ancient Brass Dragon",
//     actions: [
//       {
//         name: "Detect",
//         description: "The dragon makes a Wisdom (Perception) check.",
//       },
//       {
//         name: "Tail Attack",
//         description: "The dragon makes a tail attack.",
//       },
//       {
//         name: "Wing Attack",
//         cost: 2,
//         description:
//           "The dragon beats its wings. Each creature within 15 ft. of the dragon must succeed on a DC 22 Dexterity saving throw or take 15 (2d6 + 8) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed.",
//       },
//     ],
//   },
//   {
//     creature: "Ancient Bronze Dragon",
//     actions: [
//       {
//         name: "Detect",
//         description: "The dragon makes a Wisdom (Perception) check.",
//       },
//       {
//         name: "Tail Attack",
//         description: "The dragon makes a tail attack.",
//       },
//       {
//         name: "Wing Attack",
//         cost: 2,
//         description:
//           "The dragon beats its wings. Each creature within 15 ft. of the dragon must succeed on a DC 24 Dexterity saving throw or take 16 (2d6 + 9) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed.",
//       },
//     ],
//   },
//   {
//     creature: "Ancient Copper Dragon",
//     actions: [
//       {
//         name: "Detect",
//         description: "The dragon makes a Wisdom (Perception) check.",
//       },
//       {
//         name: "Tail Attack",
//         description: "The dragon makes a tail attack.",
//       },
//       {
//         name: "Wing Attack",
//         cost: 2,
//         description:
//           "The dragon beats its wings. Each creature within 15 ft. of the dragon must succeed on a DC 23 Dexterity saving throw or take 15 (2d6 + 8) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed.",
//       },
//     ],
//   },
//   {
//     creature: "Ancient Gold Dragon",
//     actions: [
//       {
//         name: "Detect",
//         description: "The dragon makes a Wisdom (Perception) check.",
//       },
//       {
//         name: "Tail Attack",
//         description: "The dragon makes a tail attack.",
//       },
//       {
//         name: "Wing Attack",
//         cost: 2,
//         description:
//           "The dragon beats its wings. Each creature within 15 ft. of the dragon must succeed on a DC 25 Dexterity saving throw or take 17 (2d6 + 10) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed.",
//       },
//     ],
//   },
//   {
//     creature: "Ancient Green Dragon",
//     actions: [
//       {
//         name: "Detect",
//         description: "The dragon makes a Wisdom (Perception) check.",
//       },
//       {
//         name: "Tail Attack",
//         description: "The dragon makes a tail attack.",
//       },
//       {
//         name: "Wing Attack",
//         cost: 2,
//         description:
//           "The dragon beats its wings. Each creature within 15 ft. of the dragon must succeed on a DC 23 Dexterity saving throw or take 15 (2d6 + 8) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed.",
//       },
//     ],
//   },
//   {
//     creature: "Ancient Red Dragon",
//     actions: [
//       {
//         name: "Detect",
//         description: "The dragon makes a Wisdom (Perception) check.",
//       },
//       {
//         name: "Tail Attack",
//         description: "The dragon makes a tail attack.",
//       },
//       {
//         name: "Wing Attack",
//         cost: 2,
//         description:
//           "The dragon beats its wings. Each creature within 15 ft. of the dragon must succeed on a DC 25 Dexterity saving throw or take 17 (2d6 + 10) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed.",
//       },
//     ],
//   },
//   {
//     creature: "Ancient Silver Dragon",
//     actions: [
//       {
//         name: "Detect",
//         description: "The dragon makes a Wisdom (Perception) check.",
//       },
//       {
//         name: "Tail Attack",
//         description: "The dragon makes a tail attack.",
//       },
//       {
//         name: "Wing Attack",
//         cost: 2,
//         description:
//           "The dragon beats its wings. Each creature within 15 ft. of the dragon must succeed on a DC 25 Dexterity saving throw or take 17 (2d6 + 10) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed.",
//       },
//     ],
//   },
//   {
//     creature: "Ancient White Dragon",
//     actions: [
//       {
//         name: "Detect",
//         description: "The dragon makes a Wisdom (Perception) check.",
//       },
//       {
//         name: "Tail Attack",
//         description: "The dragon makes a tail attack.",
//       },
//       {
//         name: "Wing Attack",
//         cost: 2,
//         description:
//           "The dragon beats its wings. Each creature within 15 ft. of the dragon must succeed on a DC 22 Dexterity saving throw or take 15 (2d6 + 8) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed.",
//       },
//     ],
//   },
//   {
//     creature: "Androsphinx",
//     actions: [
//       {
//         name: "Claw Attack",
//         description: "The sphinx makes one claw attack.",
//       },
//       {
//         name: "Teleport",
//         cost: 2,
//         description:
//           "The sphinx magically teleports, along with any equipment it is wearing or carrying, up to 120 feet to an unoccupied space it can see.",
//       },
//       {
//         name: "Cast a Spell",
//         cost: 3,
//         description:
//           "The sphinx casts a spell from its list of prepared spells, using a spell slot as normal.",
//       },
//     ],
//   },
// ];

function agruparLendariasPorCriatura(acoesLendarias) {
  const resultado = {};

  acoesLendarias.forEach((acao) => {
    const { monstro, nome, desc } = acao;

    // Extrai o custo se houver "(Costs X Actions)" no nome
    let cost = undefined;
    let cleanName = nome;
    const match = nome.match(/\(Costs (\d+) Actions\)/i);
    if (match) {
      cost = parseInt(match[1]);
      cleanName = nome.replace(/\s*\(Costs \d+ Actions\)/i, "").trim();
    }

    if (!resultado[monstro]) {
      resultado[monstro] = { creature: monstro, actions: [] };
    }

    resultado[monstro].actions.push({
      name: cleanName,
      ...(cost && { cost }),
      description: desc,
    });
  });

  // Retorna como array
  return Object.values(resultado);
}

// Exemplo de uso:
// import acoesLendarias from "./lendarias.js";
import acoesEspeciais from "./especiais.js";
// import acoesReacao from "./reacao.js";
const agrupado = agruparLendariasPorCriatura(acoesEspeciais);
console.log(agrupado);

const actionCount = {};
agrupado.forEach((monster) => {
  monster.actions.forEach((action) => {
    const key = action.name;
    actionCount[key] = (actionCount[key] || 0) + 1;
  });
});

const uniqueActions = Object.entries(actionCount)
  .filter(([_, count]) => count === 1)
  .map(([name]) => name);

const repeatedActions = Object.entries(actionCount)
  .filter(([_, count]) => count > 1)
  .map(([name, count]) => ({ name, count }));

const LegendaryActionsList = () => (
  <div>
    <h2>Ações Únicas Lendarias</h2>
    <ul>
      {uniqueActions.map((name) => (
        <li key={name}>{name}</li>
      ))}
    </ul>
    <h2>Ações Repetidas Lendarias</h2>
    <ul>
      {repeatedActions.map(({ name, count }) => (
        <li key={name}>
          {name} (aparece {count} vezes)
        </li>
      ))}
    </ul>
  </div>
);

export default LegendaryActionsList;
