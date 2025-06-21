import React, { useState } from "react";
import { useCharacter } from "../../context/CharacterContext";
import BuffUtils from "../buffDebuffsComponents/BuffUtils";
import conditionsData from "../buffDebuffsComponents/conditionsData";
import { naoPodeAgir } from "../buffDebuffsComponents/interpretarPenalidades";


const CombatActions = ({
  onEscapeAttempt,
  iniciaTurnoInimigo,
  setMensagens,
}) => {
  const { character, updateCharacter } = useCharacter();
  const [debuffInput, setDebuffInput] = useState();

  function rolarDado(lados) {
    return Math.floor(Math.random() * lados) + 1;
  }

  const fugirBtn = () => {
    if (naoPodeAgir(character, setMensagens)) return;

    const result = rolarDado(20) + character.attributes.dex.mod;

    const sucesso = result >= 10;

    if (onEscapeAttempt) {
      onEscapeAttempt(sucesso); // envia true ou false para o pai
    }

    if (sucesso) {
      console.log("FUGIU!!!!!!!!!", result);
      BuffUtils;
    } else {
      console.log("você sofreu ataque de oportunidade");
      iniciaTurnoInimigo(!sucesso);
    }
  };

  const defenderComEscudo = () => {
    if (naoPodeAgir(character, setMensagens)) return;
    if (!character.equipment.shield) {
      console.log("Escudo não está equipado");
      return;
    }

    if (!BuffUtils.podeUsarBuff(character, "defender")) {
      console.log("Defender em recarga");
      return;
    }

    const tentaDefender = rolarDado(2);
    const sucesso = tentaDefender === 1;

    if (sucesso) {
      const novoBuff = {
        ...character.buff,
        defender: {
          nome: "Defender",
          descricao: "Aumenta a chance de defesa",
          CD: 2,
          timeEffect: 2,
          salvamento: "Força ou cons",
        },
      };

      updateCharacter({ buff: novoBuff });

      console.log("Sucesso");
    } else {
      console.log("Falhou");
      iniciaTurnoInimigo(!sucesso);
    }
  };

  const esquivarAtivar = () => {
    if (naoPodeAgir(character, setMensagens)) return;
    if (!BuffUtils.podeUsarBuff(character, "esquiva")) {
      console.log("Esquiva em recarga");
      return;
    }

    const tentaDefender = rolarDado(2);
    const sucesso = tentaDefender === 1;

    if (sucesso) {
      const novoBuff = {
        ...character.buff,
        esquiva: {
          nome: "Esquivar",
          descricao: "Esquiva dos dois proximos ataques.",
          CD: 2,
          timeEffect: 2,
          salvamento: "Dextreza",
        },
      };

      updateCharacter({ buff: novoBuff });

      console.log("Sucesso");
    } else {
      console.log("Falhou");
      iniciaTurnoInimigo(!sucesso);
    }
  };

  const esconderAtivar = () => {
    if (naoPodeAgir(character, setMensagens)) return;
    if (!BuffUtils.podeUsarBuff(character, "sumir")) {
      console.log("Sumir em recarga");
      return;
    }

    const tentaSumir = rolarDado(2);
    const sucesso = tentaSumir === 1;

    if (sucesso) {
      const novoBuff = {
        ...character.buff,
        sumir: {
          nome: "Sumir",
          descricao: "Fica invisivel e causa ataque de oportunidade (critico)",
          CD: 2,
          timeEffect: 2,
          salvamento: "Dextreza",
        },
      };

      updateCharacter({ buff: novoBuff });

      console.log("Sucesso");
    } else {
      console.log("Falhou");
      iniciaTurnoInimigo(!sucesso);
    }
  };

  const empurrarAtivar = () => {
    if (naoPodeAgir(character, setMensagens)) return;
    if (!BuffUtils.podeUsarBuff(character, "empurrar")) {
      return;
    }

    const tentativa = rolarDado(2);
    const sucesso = tentativa === 1;

    if (sucesso) {
      // Remove a condição "grappled" se existir
      const novoBuff = { ...character.buff };
      delete novoBuff.grappled;

      novoBuff.empurrar = {
        nome: "Empurrar",
        descricao: "Atordoa prevemente e cria distancia",
        CD: 2,
        timeEffect: 2,
        salvamento: "Força",
      };

      updateCharacter({ buff: novoBuff });

      console.log("Sucesso");
    } else {
      console.log("Falhou");
      iniciaTurnoInimigo(!sucesso);
    }
  };

  const pesquisarAtivar = () => {
    if (naoPodeAgir(character, setMensagens)) return;
    if (!BuffUtils.podeUsarBuff(character, "pesquisar")) {
      console.log("Pesquisar em recarga");
      return;
    }

    const tentativa = rolarDado(2);
    const sucesso = tentativa === 1;

    if (sucesso) {
      const novoBuff = {
        ...character.buff,
        pesquisar: {
          CD: 2,
          timeEffect: 2,
          nome: "Pesquisar",
          descricao: "Aumenta a chance de acerto",
          salvamento: "Conhecimento",
        },
      };

      updateCharacter({ buff: novoBuff });

      console.log("Sucesso");
    } else {
      console.log("Falhou");
      iniciaTurnoInimigo(!sucesso);
    }
  };

  return (
    <div style={{ marginBottom: "8px" }}>
      <button onClick={fugirBtn}>Fugir</button>
      <button>Criar distancia</button>
      <button
        onClick={esconderAtivar}
        disabled={!BuffUtils.podeUsarBuff(character, "sumir")}
      >
        {BuffUtils.podeUsarBuff(character, "sumir")
          ? "Esconder-se"
          : "Esconder-se (ativado)"}
      </button>
      <button
        onClick={esquivarAtivar}
        disabled={!BuffUtils.podeUsarBuff(character, "esquiva")}
      >
        {BuffUtils.podeUsarBuff(character, "esquiva")
          ? "Esquivar"
          : "Esquivar (ativado)"}
      </button>
      <button
        onClick={pesquisarAtivar}
        disabled={!BuffUtils.podeUsarBuff(character, "pesquisar")}
      >
        {BuffUtils.podeUsarBuff(character, "pesquisar")
          ? "pesquisar"
          : "pesquisar (ativado)"}
      </button>
      <button
        onClick={empurrarAtivar}
        disabled={!BuffUtils.podeUsarBuff(character, "empurrar")}
      >
        {BuffUtils.podeUsarBuff(character, "empurrar")
          ? "empurrar"
          : "empurrar (ativado)"}
      </button>
      <button
        onClick={defenderComEscudo}
        disabled={!BuffUtils.podeUsarBuff(character, "defender")}
      >
        {!BuffUtils.podeUsarBuff(character, "defender")
          ? "Defendendo"
          : "Defender (requer escudo)"}
      </button>
      <div style={{ marginTop: "8px" }}>
        <input
          type="text"
          placeholder="Nome do debuff (ex: poisoned)"
          value={debuffInput || ""}
          onChange={(e) => setDebuffInput(e.target.value)}
          style={{ marginRight: "4px" }}
        />
        <button
          onClick={() => {
            if (!debuffInput) return;

            const condition = conditionsData[debuffInput];
            if (!condition) {
              alert("Debuff não encontrado.");
              return;
            }

            const novoDebuff = {
              ...character.debuff,
              [debuffInput]: {
                CD: 1,
                timeEffect: condition.duracao,
                desc: condition.descricao,
                salvamento: condition.salvamento,
              },
            };

            updateCharacter({ buff: novoDebuff });

            setDebuffInput("");
          }}
        >
          Aplicar Debuff
        </button>
      </div>
    </div>
  );
};

export default CombatActions;
