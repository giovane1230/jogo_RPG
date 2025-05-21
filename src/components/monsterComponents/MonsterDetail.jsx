// MonsterDetail.jsx
import React, { useState, useEffect } from "react";

const conditionsList = [
  { index: "blinded", name: "Blinded", url: "/api/2014/conditions/blinded" },
  { index: "charmed", name: "Charmed", url: "/api/2014/conditions/charmed" },
  { index: "deafened", name: "Deafened", url: "/api/2014/conditions/deafened" },
  {
    index: "exhaustion",
    name: "Exhaustion",
    url: "/api/2014/conditions/exhaustion",
  },
  {
    index: "frightened",
    name: "Frightened",
    url: "/api/2014/conditions/frightened",
  },
  { index: "grappled", name: "Grappled", url: "/api/2014/conditions/grappled" },
  {
    index: "incapacitated",
    name: "Incapacitated",
    url: "/api/2014/conditions/incapacitated",
  },
  {
    index: "invisible",
    name: "Invisible",
    url: "/api/2014/conditions/invisible",
  },
  {
    index: "paralyzed",
    name: "Paralyzed",
    url: "/api/2014/conditions/paralyzed",
  },
  {
    index: "petrified",
    name: "Petrified",
    url: "/api/2014/conditions/petrified",
  },
  { index: "poisoned", name: "Poisoned", url: "/api/2014/conditions/poisoned" },
  { index: "prone", name: "Prone", url: "/api/2014/conditions/prone" },
  {
    index: "restrained",
    name: "Restrained",
    url: "/api/2014/conditions/restrained",
  },
  { index: "stunned", name: "Stunned", url: "/api/2014/conditions/stunned" },
  {
    index: "unconscious",
    name: "Unconscious",
    url: "/api/2014/conditions/unconscious",
  },
];

const MonsterDetail = ({ monsterId }) => {
  const [monsterData, setMonsterData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMonsterData = async () => {
      try {
        const response = await fetch(
          `https://www.dnd5eapi.co/api/monsters/${monsterId}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (data && typeof data === "object") {
          setMonsterData(data);
        } else {
          throw new Error("Invalid data format");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMonsterData();
  }, [monsterId]);

  if (loading) return <p>Loading monster data...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!monsterData) return <p>No monster data found</p>;

  function detectConditions(texto) {
    const lower = texto.toLowerCase();
    return conditionsList.filter((cond) =>
      lower.includes(cond.name.toLowerCase())
    );
  }

  function useRegex() {
    const texto =
      "Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) slashing damage plus 3 (1d6) acid damage. If the target is a Large or smaller creature, it is grappled (escape DC 13). Until this grapple ends, the ankheg can bite only the grappled creature and has advantage on attack rolls to do so.";
    const bonusMatch = texto.match(/\+(\d+)\s+to hit/);
    const attack_bonus = bonusMatch ? parseInt(bonusMatch[1]) : null;

    // 2. Pega o DC
    const dcMatch = texto.match(
      /DC\s+(\d+)\s+(Strength|Dexterity|Constitution|Intelligence|Wisdom|Charisma)/i
    );
    const dc = dcMatch
      ? {
          dc_type: {
            index: dcMatch[2].slice(0, 3).toLowerCase(),
            name: dcMatch[2].toUpperCase(),
            url: `/api/2014/ability-scores/${dcMatch[2]
              .slice(0, 3)
              .toLowerCase()}`,
          },
          dc_value: parseInt(dcMatch[1]),
          success_type: "none",
        }
      : null;

    // 3. Pega os danos
    const damageMatches = [
      ...texto.matchAll(
        /\(([\dd\s\+\-]+)\)\s*(bludgeoning|slashing|piercing|acid|fire|cold|lightning|poison|necrotic|radiant|force|psychic|thunder)\s+damage/gi
      ),
    ];

    const damage = damageMatches.map((match) => ({
      damage_type: {
        index: match[2].toLowerCase(),
        name: match[2].charAt(0).toUpperCase() + match[2].slice(1),
      },
      damage_dice: match[1].replace(/\s+/g, ""),
    }));

    // 4. Monta o objeto final

    const conditions = detectConditions(texto);

    const ataque = {
      attack_bonus,
      ...(dc && { dc }),
      damage,
      ...(conditions.length > 0 && { conditions }),
    };

    console.log(monsterData);
    console.log(ataque);
  }

  const fotinha = `https://www.dnd5eapi.co/api/images/monsters/${monsterId}.png`;

  // Make sure you're not rendering the entire object
  return (
    <div className="monster-detail">
      <button onClick={useRegex}> monste </button>
      <h2>{monsterData.name || "Unnamed Monster"}</h2>
      <img src={fotinha} width="300px"></img>

      {/* Access specific properties instead of rendering the whole object */}
      <div>
        <h3>Details:</h3>
        <ul>
          <li>Type: {monsterData.type || "Unknown"}</li>
          <li>HP: {monsterData.hit_points || "Unknown"}</li>
          <li>AC: {monsterData.armor_class[0].value || "Unknown"}</li>
          {/* Add more properties as needed */}
        </ul>
      </div>

      {/* If you have nested objects, handle them properly */}
      {monsterData.actions && (
        <div>
          <h3>actions:</h3>
          <ul>
            {monsterData.actions.map((ability, index) => (
              <li key={index}>
                <strong>{ability.name}:</strong> {ability.desc}
              </li>
            ))}
          </ul>
        </div>
      )}
      {monsterData.legendary_actions && (
        <div>
          <h3>legendary_actions:</h3>
          <ul>
            {monsterData.legendary_actions.map((ability, index) => (
              <li key={index}>
                <strong>{ability.name}:</strong> {ability.desc}
              </li>
            ))}
          </ul>
        </div>
      )}
      {monsterData.special_abilities && (
        <div>
          <h3>Special Abilities:</h3>
          <ul>
            {monsterData.special_abilities.map((ability, index) => (
              <li key={index}>
                <strong>{ability.name}:</strong> {ability.desc}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MonsterDetail;
