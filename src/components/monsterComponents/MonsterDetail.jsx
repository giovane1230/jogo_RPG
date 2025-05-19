// MonsterDetail.jsx
import React, { useState, useEffect } from "react";

const MonsterDetail = ({ monsterId }) => {
  const [monsterData, setMonsterData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMonsterData = async () => {
      try {
        // Replace with your actual API call or data fetching logic
        const response = await fetch(`your-api-endpoint/${monsterId}`);
        const data = await response.json();
        
        // Ensure the data is in the correct format
        if (data && typeof data === 'object') {
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

  // Make sure you're not rendering the entire object
  return (
    <div className="monster-detail">
      <h2>{monsterData.name || "Unnamed Monster"}</h2>
      
      {/* Access specific properties instead of rendering the whole object */}
      <div>
        <h3>Details:</h3>
        <ul>
          <li>Type: {monsterData.type || "Unknown"}</li>
          <li>HP: {monsterData.hit_points || "Unknown"}</li>
          <li>AC: {monsterData.armor_class || "Unknown"}</li>
          {/* Add more properties as needed */}
        </ul>
      </div>

      {/* If you have nested objects, handle them properly */}
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