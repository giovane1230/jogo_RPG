import React from "react";

function MonsterDetalhes({ dados }) {
  if (!dados) return null;

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>{dados.name}</h2>
      <p><strong>Tamanho:</strong> {dados.size}</p>
      <p><strong>Tipo:</strong> {dados.type}</p>
      <p><strong>Alinhamento:</strong> {dados.alignment}</p>
      <p><strong>Classe de Armadura:</strong> {dados.armor_class.valeu}</p>
      <p><strong>Vida Fixo: </strong>{dados.hit_points} - <strong>Rolagem de vida: </strong>({dados.hit_points_roll})</p>
      <p><strong>Velocidade:</strong> {Object.entries(dados.speed).map(([tipo, valor]) => `${tipo}: ${valor}`).join(', ')}</p>

      <h4>Atributos</h4>
      <ul>
        <li>Força: {dados.strength}</li>
        <li>Destreza: {dados.dexterity}</li>
        <li>Constituição: {dados.constitution}</li>
        <li>Inteligência: {dados.intelligence}</li>
        <li>Sabedoria: {dados.wisdom}</li>
        <li>Carisma: {dados.charisma}</li>
      </ul>
      <h4>Proeficiencias</h4>
      {dados.proficiencies && (
        <ul> {dados.proficiencies.map((prof, inx) => (
          <li key={inx}>
            {prof.proficiency.name}: {prof.value}
          </li>
        ))}
        </ul>
      )}

      {dados.xp && (
        <>
        <p><strong>Experiencia: </strong>{dados.xp}</p>
        <p><strong>Classe de dificuldade: </strong>{dados.challenge_rating}</p>
        </>
      )}

      {dados.damage_vulnerabilities.length > 0 && (
        <p><strong>Vulnerabilidades:</strong> {dados.damage_vulnerabilities.join(', ')}</p>
      )}
      {dados.damage_resistances.length > 0 && (
        <p><strong>Resistências:</strong> {dados.damage_resistances.join(', ')}</p>
      )}
      {dados.damage_immunities.length > 0 && (
        <p><strong>Imunidades a Dano:</strong> {dados.damage_immunities.join(', ')}</p>
      )}
      {dados.condition_immunities.length > 0 && (
        <p><strong>Imunidades a Condição:</strong> {dados.condition_immunities.map(ci => ci.name).join(', ')}</p>
      )}

      {dados.special_abilities && dados.special_abilities.length > 0 && (
        <>
          <h4>Habilidades Especiais</h4>
          <ul>
            {dados.special_abilities.map((hab, idx) => (
              <li key={idx}>
                <strong>{hab.name}:</strong> {hab.desc}
              </li>
            ))}
          </ul>
        </>
      )}

      {dados.actions && dados.actions.length > 0 && (
        <>
          <h4>Ações</h4>
          <ul>
            {dados.actions.map((acao, idx) => (
              <li key={idx}>
                <strong>{acao.name}:</strong> {acao.desc}
              </li>
            ))}
          </ul>
        </>
      )}

      {dados.legendary_actions && dados.legendary_actions.length > 0 && (
        <>
          <h4>Ações Lendárias</h4>
          <ul>
            {dados.legendary_actions.map((acao, idx) => (
              <li key={idx}>
                <strong>{acao.name}:</strong> {acao.desc}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default MonsterDetalhes;
