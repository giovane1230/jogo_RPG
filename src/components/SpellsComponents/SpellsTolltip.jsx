import React, { useEffect, useState } from "react";

const SpellTolltip = ({ spell, children }) => {
  const [details, setDetails] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!show || !show) return;

    const fetchDetails = async () => {
      try {
        const res = await fetch(`https://www.dnd5eapi.co/api/spells/${spell}`);
        const data = await res.json();
        setDetails(data);
      } catch (err) {
        console.error("Erro ao buscar detalhes da magia:", err);
      }
    };

    fetchDetails();
  }, [spell, show]);

return (
  <span
    onMouseEnter={() => setShow(true)}
    onMouseLeave={() => setShow(false)}
    style={{ position: "relative", cursor: "help" }}
  >
    {children}
    {show && details && (
      <div
        style={{
          position: "absolute",
          top: "120%",
          left: "0",
          zIndex: "999",
          backgroundColor: "#222",
          color: "#fff",
          padding: "10px",
          border: "1px solid #aaa",
          borderRadius: "6px",
          width: "320px",
          fontSize: "0.85rem",
          lineHeight: "1.4",
        }}
      >
        <strong style={{ fontSize: "1rem" }}>{details.name}</strong>
        <p><em>{details.school?.name} - Nível {details.level}</em></p>
        <hr style={{ borderColor: "#444" }} />

        <p><strong>Alcance:</strong> {details.range}</p>
        <p><strong>Duração:</strong> {details.duration}</p>
        <p><strong>Tempo de Conjuração:</strong> {details.casting_time}</p>
        <p><strong>Componentes:</strong> {details.components?.join(", ")}</p>
        {details.material && <p><strong>Material:</strong> {details.material}</p>}
        <p><strong>Ritual:</strong> {details.ritual ? "Sim" : "Não"}</p>
        <p><strong>Concentração:</strong> {details.concentration ? "Sim" : "Não"}</p>
        {details.attack_type && <p><strong>Tipo de Ataque:</strong> {details.attack_type}</p>}
        {details.damage?.damage_type?.name && (
          <p><strong>Tipo de Dano:</strong> {details.damage.damage_type.name}</p>
        )}

        {details.damage?.damage_at_slot_level && (
          <>
            <p><strong>Dano por nível de slot:</strong></p>
            <ul style={{ paddingLeft: "1.2rem" }}>
              {Object.entries(details.damage.damage_at_slot_level).map(
                ([level, damage]) => (
                  <li key={level}>
                    Nível {level}: {damage}
                  </li>
                )
              )}
            </ul>
          </>
        )}

        <hr style={{ borderColor: "#444" }} />
        <p><strong>Descrição:</strong></p>
        {details.desc?.map((line, i) => (
          <p key={`desc-${i}`}>{line}</p>
        ))}

        {details.higher_level?.length > 0 && (
          <>
            <p><strong>Em níveis superiores:</strong></p>
            {details.higher_level.map((line, i) => (
              <p key={`higher-${i}`}>{line}</p>
            ))}
          </>
        )}

        {details.classes?.length > 0 && (
          <>
            <p><strong>Classes:</strong></p>
            <ul style={{ paddingLeft: "1.2rem" }}>
              {details.classes.map((cls) => (
                <li key={cls.index}>{cls.name}</li>
              ))}
            </ul>
          </>
        )}

        {details.subclasses?.length > 0 && (
          <>
            <p><strong>Subclasses:</strong></p>
            <ul style={{ paddingLeft: "1.2rem" }}>
              {details.subclasses.map((subcls) => (
                <li key={subcls.index}>{subcls.name}</li>
              ))}
            </ul>
          </>
        )}
      </div>
    )}
  </span>
);


};

export default SpellTolltip;
