import React, { useState } from "react";
import { useCharacter } from "../../context/CharacterContext";
import xpLevels, { vidaClasse } from "../../api/regras";

function CharActions() {
  const { character, setCharacter } = useCharacter();
  const [points, setPoints] = useState(null);
  const [baseAttributes, setBaseAttributes] = useState(() => {
    return (
      character?.attributes ?? {
        str: { mod: -1, value: 8 },
        dex: { mod: -1, value: 8 },
        con: { mod: -1, value: 8 },
        int: { mod: -1, value: 8 },
        wis: { mod: -1, value: 8 },
        cha: { mod: -1, value: 8 },
      }
    );
  });

  const upar = () => {
    const proximoNivel = character.nivel + 1;
    const vidaExtra =
      vidaClasse[character.class.index].vida + character.attributes.con.mod;
    setPoints(2);

    setCharacter((prev) => ({
      ...prev,
      nivel: proximoNivel,
      proficienciesBonus: xpLevels[proximoNivel].proficiencia,
      vidaInicial: prev.vidaInicial + vidaExtra,
      // up: false, // descomente quando quiser travar a evolução automática
    }));
  };

  const voltarNv = () => {
    setPoints(27);
    const vidaBase =
      vidaClasse[character.class.index].vida + character.attributes.con.mod;

    setCharacter((prev) => ({
      ...prev,
      nivel: 1,
      proficienciesBonus: xpLevels[1].proficiencia,
      vidaAtual: vidaBase,
      vidaInicial: vidaBase,
      attributes: {
        str: { mod: -1, value: 8 },
        dex: { mod: -1, value: 8 },
        con: { mod: -1, value: 8 },
        int: { mod: -1, value: 8 },
        wis: { mod: -1, value: 8 },
        cha: { mod: -1, value: 8 },
      },
    }));
  };

  const getModifier = (total) => Math.floor((total - 10) / 2);
  const pointBuyCost = {
    8: 0,
    9: 1,
    10: 2,
    11: 3,
    12: 4,
    13: 5,
    14: 7,
    15: 9,
    16: 11,
    17: 13,
    18: 15,
    19: 17,
    20: 19,
  };

  const handleIncrease = (attr) => {
    const currentValue = baseAttributes[attr].value;
    const nextValue = currentValue + 1;

    // Impede valores maiores que 20 ou que não existam no pointBuyCost
    if (nextValue > 20 || !(nextValue in pointBuyCost)) return;

    const currentCost = pointBuyCost[currentValue] ?? 0;
    const nextCost = pointBuyCost[nextValue] ?? 99;

    const diff = nextCost - currentCost;

    // Verifica se há pontos suficientes
    if (points >= diff) {
      const updatedAttr = {
        ...baseAttributes,
        [attr]: {
          value: nextValue,
          mod: getModifier(nextValue),
        },
      };

      setBaseAttributes(updatedAttr);
      setPoints((prev) => prev - diff);
      setCharacter((prev) => ({
        ...prev,
        attributes: updatedAttr,
      }));
    }
  };

  const descanso = () => {
    setCharacter((prev) => ({
      ...prev,
      vidaAtual: character.vidaInicial,
    }));
  }

  return (
    <div style={{ marginTop: "20px" }}>
        <div>
          <p>Pontos disponíveis: {points}</p>
          <h2>Distribuição de Pontos</h2>
          {Object.keys(baseAttributes).map((attr) => {
            const base = baseAttributes[attr].value; // Acessa o valor base
            const modifier = getModifier(base);

            return (
              <div key={attr}>
                <strong>{attr.toUpperCase()}:</strong> {base}
                {/* {base > "" && (
                  <span>
                    {" "}
                    + {base} = <strong>{base}</strong>
                  </span>
                )} */}
                <span> ({modifier}) </span>
                {points && (<button
                  onClick={() => handleIncrease(attr)}
                  disabled={
                    base >= 20 ||
                    points < pointBuyCost[base + 1] - pointBuyCost[base]
                  }
                >
                  +
                </button>)}
              </div>
            );
          })}
        </div>
      <button onClick={upar} disabled={character.up}>
        Subir de nivel
      </button>
      <button onClick={voltarNv}>vai pro 1</button>
      <button onClick={descanso}>Descansar</button>
    </div>
  );
}

export default CharActions;
