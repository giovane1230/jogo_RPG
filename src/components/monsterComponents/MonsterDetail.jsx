// MonsterDetail.jsx
import React, { useState, useEffect } from "react";

// const conditionsList = [
//   { index: "blinded", name: "Blinded", url: "/api/2014/conditions/blinded" },
//   { index: "charmed", name: "Charmed", url: "/api/2014/conditions/charmed" },
//   { index: "deafened", name: "Deafened", url: "/api/2014/conditions/deafened" },
//   {
//     index: "exhaustion",
//     name: "Exhaustion",
//     url: "/api/2014/conditions/exhaustion",
//   },
//   {
//     index: "frightened",
//     name: "Frightened",
//     url: "/api/2014/conditions/frightened",
//   },
//   { index: "grappled", name: "Grappled", url: "/api/2014/conditions/grappled" },
//   {
//     index: "incapacitated",
//     name: "Incapacitated",
//     url: "/api/2014/conditions/incapacitated",
//   },
//   {
//     index: "invisible",
//     name: "Invisible",
//     url: "/api/2014/conditions/invisible",
//   },
//   {
//     index: "paralyzed",
//     name: "Paralyzed",
//     url: "/api/2014/conditions/paralyzed",
//   },
//   {
//     index: "petrified",
//     name: "Petrified",
//     url: "/api/2014/conditions/petrified",
//   },
//   { index: "poisoned", name: "Poisoned", url: "/api/2014/conditions/poisoned" },
//   { index: "prone", name: "Prone", url: "/api/2014/conditions/prone" },
//   {
//     index: "restrained",
//     name: "Restrained",
//     url: "/api/2014/conditions/restrained",
//   },
//   { index: "stunned", name: "Stunned", url: "/api/2014/conditions/stunned" },
//   {
//     index: "unconscious",
//     name: "Unconscious",
//     url: "/api/2014/conditions/unconscious",
//   },
// ];

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

  const fotinha = `https://www.dnd5eapi.co/api/images/monsters/${monsterId}.png`;

  // Make sure you're not rendering the entire object
  return (
    <div className="monster-detail">
      <h2>{monsterData.name || "Unnamed Monster"}</h2>
      {fotinha && <img src={fotinha} width="300px" alt={monsterData.name} />}

      <div>
        <h3>Details:</h3>
        <ul>
          <li>Type: {monsterData.type || "Unknown"}</li>
          <li>HP: {monsterData.hit_points || "Unknown"}</li>
          <li>
            AC:{" "}
            {Array.isArray(monsterData.armor_class)
              ? monsterData.armor_class[0]?.value || "Unknown"
              : monsterData.armor_class || "Unknown"}
          </li>
        </ul>
        {monsterData.damage_immunities && monsterData.damage_immunities.length > 0 && (
          <div>
            <h3>Damage Immunities:</h3>
            <ul>
              {monsterData.damage_immunities.map((immunity, index) => (
                <li key={index}>
                  <strong>{immunity}</strong>
                </li>
              ))}
            </ul>
          </div>
        )}
        {monsterData.damage_vulnerabilities && monsterData.damage_vulnerabilities.length > 0 && (
          <div>
            <h3>Damage Vulnerabilities:</h3>
            <ul>
              {monsterData.damage_vulnerabilities.map((vulnerability, index) => (
                <li key={index}>
                  <strong>{vulnerability}</strong>
                </li>
              ))}
            </ul>
          </div>
        )}
        {monsterData.damage_resistances && monsterData.damage_resistances.length > 0 && (
          <div>
            <h3>Damage Resistances:</h3>
            <ul>
              {monsterData.damage_resistances.map((resistance, index) => (
                <li key={index}>
                  <strong>{resistance}</strong>
                </li>
              ))}
            </ul>
          </div>
        )}
        {monsterData.condition_immunities && monsterData.condition_immunities.length > 0 && (
          <div>
            <h3>Condition Immunities:</h3>
            <ul>
              {monsterData.condition_immunities.map((immunity, index) => (
                <li key={index}>
                  <strong>{immunity.name || immunity}</strong>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {monsterData.actions && (
        <div>
          <h3>Actions:</h3>
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
          <h3>Legendary Actions:</h3>
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
      {monsterData.reactions && (
        <div>
          <h3>Reactions:</h3>
          <ul>
            {monsterData.reactions.map((ability, index) => (
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
