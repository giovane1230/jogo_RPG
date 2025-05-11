import React, { useState, useEffect } from "react";
import { useCharacter } from "../../context/CharacterContext";
import SpellSelection from "./SpellSelection";
import { vidaClasse } from "../../api/regras";

const CharStatusCreate = () => {
  const { character, setCharacter } = useCharacter();
  const [alignments, setAlignments] = useState([]);

  const [points, setPoints] = useState(27);
  const [baseAttributes, setBaseAttributes] = useState({
    str: { mod: -1, value: 8 },
    dex: { mod: -1, value: 8 },
    con: { mod: -1, value: 8 },
    int: { mod: -1, value: 8 },
    wis: { mod: -1, value: 8 },
    cha: { mod: -1, value: 8 },
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://www.dnd5eapi.co/api/alignments")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setAlignments(data.results || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao carregar alinhamentos:", err);
        setError("Erro ao carregar alinhamentos.");
        setLoading(false);
      });
  }, []);

  const handleAlignmentChange = (e) => {
    setCharacter({ ...character, alignment: e.target.value });
  };

  const pointBuyCost = {
    8: 0,
    9: 1,
    10: 2,
    11: 3,
    12: 4,
    13: 5,
    14: 7,
    15: 9,
  };

  const mapAbilityNameToKey = (name) => {
    const map = {
      Strength: "str",
      Dexterity: "dex",
      Constitution: "con",
      Intelligence: "int",
      Wisdom: "wis",
      Charisma: "cha",
    };
    return map[name] || name.toLowerCase();
  };

  const racialBonuses =
    character.race?.ability_bonuses?.reduce((acc, bonus) => {
      const key = mapAbilityNameToKey(bonus.ability_score.name);
      acc[key] = bonus.bonus;
      return acc;
    }, {}) || {};

  const handleIncrease = (attr) => {
    const currentValue = baseAttributes[attr].value;
    const nextValue = currentValue + 1;
    const diff =
      (pointBuyCost[nextValue] ?? 99) - (pointBuyCost[currentValue] ?? 0);

    if (nextValue <= 15 && points >= diff) {
      setBaseAttributes((prev) => ({
        ...prev,
        [attr]: {
          value: nextValue,
          mod: getModifier(nextValue),
        },
      }));
      setPoints((prev) => prev - diff);
    }
  };

  const handleDecrease = (attr) => {
    const currentValue = baseAttributes[attr].value;
    const prevValue = currentValue - 1;
    const refund =
      (pointBuyCost[currentValue] ?? 0) - (pointBuyCost[prevValue] ?? 0);

    if (prevValue >= 8) {
      setBaseAttributes((prev) => ({
        ...prev,
        [attr]: {
          value: prevValue,
          mod: getModifier(prevValue),
        },
      }));
      setPoints((prev) => prev + refund);
    }
  };

  const getModifier = (total) => Math.floor((total - 10) / 2);

  const handleFinalizar = () => {
    const finalAttributes = {};

    for (const attr in baseAttributes) {
      const baseValue = baseAttributes[attr].value;
      const racialBonus = racialBonuses[attr] || 0;
      const total = baseValue + racialBonus;
      const modifier = getModifier(total);

      finalAttributes[attr] = {
        base: baseValue,
        bonus: racialBonus,
        total,
        mod: modifier,
      };
    }

    const classe = character.class.index;
    const vidaBase = vidaClasse[classe].vida;
    const modificadorConstituicao = character.attributes.con.mod;

    const vidaCriada = vidaBase + modificadorConstituicao;

    setCharacter((prev) => ({
      ...prev,
      attributes: baseAttributes,
      vidaAtual: vidaCriada,
      vidaInicial: vidaCriada,
    }));

  };

  return (
    <div>
      <h2>Nome do Personagem:</h2>
      <input
        type="text"
        value={character.name || ""}
        onChange={(e) => setCharacter({ ...character, name: e.target.value })}
        placeholder="Digite o nome do personagem"
        style={{ width: "200px" }}
      />

      <h2>Alinhamento:</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <select
        value={character.alignment || ""}
        onChange={handleAlignmentChange}
      >
        <option value="" disabled>
          {loading ? "Carregando..." : "Selecione um alinhamento"}
        </option>
        {alignments.map((a) => (
          <option key={a.index} value={a.name}>
            {a.name}
          </option>
        ))}
      </select>

      <h2>Background:</h2>
      <textarea
        value={character.background || ""}
        onChange={(e) =>
          setCharacter({ ...character, background: e.target.value })
        }
        placeholder="Digite o background"
        style={{ width: "50%", height: "100px" }}
        maxLength={500}
      />

      <h2>Distribuição de Pontos</h2>
      <p>Pontos disponíveis: {points}</p>
      {Object.keys(baseAttributes).map((attr) => {
        const base = baseAttributes[attr].value; // Acessa o valor base
        const bonus = racialBonuses[attr] || 0;
        const total = base + bonus;
        const modifier = getModifier(total);

        return (
          <div key={attr}>
            <strong>{attr.toUpperCase()}:</strong> {base}
            {bonus > 0 && (
              <span>
                {" "}
                + {bonus} = <strong>{total}</strong>
              </span>
            )}
            <span> (Mod: {modifier}) </span>
            <button onClick={() => handleIncrease(attr)}>+</button>
            <button onClick={() => handleDecrease(attr)}>-</button>
          </div>
        );
      })}

      <button
        onClick={handleFinalizar}
        style={{ marginTop: "20px", padding: "10px 20px", fontWeight: "bold" }}
      >
        SALVAR ATRIBUTOS
      </button>

      <SpellSelection />
    </div>
  );
};

export default CharStatusCreate;
