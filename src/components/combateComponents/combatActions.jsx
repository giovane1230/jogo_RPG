import React from "react";
import { useCharacter } from "../../context/CharacterContext";
import { useCharEquip } from "../../context/charEquipContext";
import { useCombat } from "../../context/CombateContext";
import BuffUtils from "./BuffUtils";

const CombatActions = ({ onEscapeAttempt, iniciaTurnoInimigo }) => {
  const { character } = useCharacter();
  const { equipment } = useCharEquip();
  const { setBuff, player, setPlayer } = useCombat();

  function rolarDado(lados) {
    return Math.floor(Math.random() * lados) + 1;
  }

  const fugirBtn = () => {
    const result = rolarDado(20) + character.attributes.dex.mod;

    const sucesso = result >= 10;

    if (onEscapeAttempt) {
      onEscapeAttempt(sucesso); // envia true ou false para o pai
    }

    if (sucesso) {
      console.log("fugiu???????????", result);
    } else {
      console.log("você sofreu ataque de oportunidade");
    }
  };

  const defenderComEscudo = () => {
    if (!equipment.shield) {
      console.log("Escudo não está equipado");
      return;
    }

    if (!BuffUtils.podeUsarBuff(player, "defender")) {
      console.log("Defender em recarga");
      return;
    }

    const tentaDefender = rolarDado(2);
    const sucesso = tentaDefender === 1;

    if (sucesso) {
      const novoBuff = {
        ...player.buff,
        defender: {
          CD: 5,
          timeEffect: 2, // ou 0 se quiser efeito apenas imediato
          desc: "CA + CON MOD.",
        },
      };

      setPlayer((prev) => ({
        ...prev,
        buff: novoBuff,
      }));

      setBuff(true);
      console.log("Sucesso");
    } else {
      console.log("Falhou");
      iniciaTurnoInimigo(!sucesso);
    }
  };

  const esquivarAtivar = () => {
    if (!BuffUtils.podeUsarBuff(player, "esquiva")) {
      console.log("Esquiva em recarga");
      return;
    }

    const tentaDefender = rolarDado(2);
    const sucesso = tentaDefender === 1;

    if (sucesso) {
      const novoBuff = {
        ...player.buff,
        esquiva: {
          CD: 2,
          timeEffect: 2, // ou 0 se quiser efeito apenas imediato
          desc: "Esquiva do proximo ataque.",
        },
      };

      setPlayer((prev) => ({
        ...prev,
        buff: novoBuff,
      }));

      console.log("Sucesso");
    } else {
      console.log("Falhou");
      iniciaTurnoInimigo(!sucesso);
    }
  };

    const esconderAtivar = () => {
    if (!BuffUtils.podeUsarBuff(player, "sumir")) {
      console.log("Sumir em recarga");
      return;
    }

    const tentaSumir = rolarDado(2);
    const sucesso = tentaSumir === 1;

    if (sucesso) {
      const novoBuff = {
        ...player.buff,
        sumir: {
          CD: 2,
          timeEffect: 2, // ou 0 se quiser efeito apenas imediato
          desc: "Some e causa dano de furtividade.",
        },
      };

      setPlayer((prev) => ({
        ...prev,
        buff: novoBuff,
      }));

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
      <button onClick={esconderAtivar}         disabled={!BuffUtils.podeUsarBuff(player, "sumir")}>Esconder-se</button>
      <button
        onClick={esquivarAtivar}
        disabled={!BuffUtils.podeUsarBuff(player, "esquiva")}
      >
        Esquivar-se
      </button>
      <button>Pesquisa</button>
      <button>Empurrão</button>
      <button
        onClick={defenderComEscudo}
        disabled={!BuffUtils.podeUsarBuff(player, "defender")}
      >
        {!BuffUtils.podeUsarBuff(player, "defender")
          ? "Defendendo o proximo ataque"
          : "Defender (requer escudo)"}
      </button>
    </div>
  );
};

export default CombatActions;
