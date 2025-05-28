import conditionsData from "../buffDebuffsComponents/conditionsData";
import { parseAction } from "./parseAction";
import { rolarDado, rolarDadoPersonalizado } from "./rolarDados";


export function turnoInimigoUtil({
  enemy,
  player,
  round,
  setRound,
  setPlayer,
  setMensagens,
  setPlayerHP,
  combateFinalizado,
  BuffUtils,
}) {
  if (!enemy.actions?.length || combateFinalizado) return;

  setRound((r) => r + 1);

  // 1) Atualiza buffs do player
  const buffsAtualizados = BuffUtils.AtualizarBuffs(player.buff);
  setPlayer((prev) => ({ ...prev, buff: buffsAtualizados }));

  // 2) Se estiver sob o buff “empurrar/atordoado”, pula o turno
  if (player.buff.empurrar?.timeEffect > 0) {
    setMensagens((prev) => [
      ...prev,
      { tipo: "buff", texto: `${enemy.name} atordoado!` },
      { tipo: "sistema", texto: `--- Fim do ${round}° Round ---` },
    ]);
    return;
  }

  // 3) Escolhe e parseia a ação
  const raw = enemy.actions[Math.floor(Math.random() * enemy.actions.length)];
  // const raw = enemy.actions[4]; // escolher somente o ataque desejado
  let atk = parseAction(raw);

  console.log("Ataque do inimigo:", atk);

  // 4) Se não tiver dano, DC ou multiattack, usa ataque básico
  if (!atk.damage.length && !atk.dc && !atk.multiattack_type) {
    // fallback não são só esses casos, tem que ver melhor isso depois.
    // possivelmente gerar aleatorio de novo. Caso so tenha ataque "errado", ai fodase ne
    const fallback =
      enemy.actions.find((a) => /slam|bite|claw/i.test(a.name)) ||
      enemy.actions.find((a) => a.attack_bonus != null);
    atk = parseAction(fallback || raw);
  }

  const mensagens = [];
  const acoesParaExecutar = atk.multiattack_type
    ? atk.actions.flatMap((sub) => {
        const full = enemy.actions.find((a) => a.name === sub.action_name);
        return full ? Array(Number(sub.count) || 1).fill(full) : [];
      })
    : [atk];

  let totalDano = 0;

  // 5) Processa cada sub-ação
  for (const rawA of acoesParaExecutar) {
    const acao = parseAction(rawA);
    const roll = rolarDado(20, "acerto inimigo");
    const crit = roll === 20;
    const bonusAtk = acao.attack_bonus ?? 0;
    const modRoll = roll + bonusAtk;
    const defesa = player.cArmor;
    const esquiva = player.buff.esquiva?.timeEffect > 0;
    const invis = player.buff.sumir?.timeEffect > 0;
    const acertou = !esquiva && !invis && modRoll > defesa;

    if (esquiva || invis) {
      mensagens.push({ tipo: "buff", texto: `${player.name} intangível!` });
    }

    let danoAcao = 0;

    // 5.1) Ataque físico
    if (acao.attack_bonus != null) {
      if (acertou) {
        // calcula dano
        for (const d of acao.damage) {
          danoAcao += rolarDadoPersonalizado(d.damage_dice);
        }
        if (crit) danoAcao *= 2;

        mensagens.push({
          tipo: "inimigo",
          texto: `${enemy.name} ${crit ? "CRÍTICO" : "acertou"} com ${
            acao.name
          } 🎲${roll}+${bonusAtk} = ${modRoll}, causando ${danoAcao}💥`,
        });

        // aplica dano imediato
        totalDano += danoAcao;

        // 5.1.1) Salvaguarda + condição (aplica apenas a primeira)
        if (acao.dc && acao.conditions.length) {
          let idx = acao.dc.dc_type?.index || "dexterity";
          if (!player.attributes[idx]) idx = "dexterity";
          const modSal = player.attributes[idx].mod;
          const saveRoll = rolarDado(20, "salvamento") + modSal;
          const DC = acao.dc.dc_value;

          mensagens.push({
            tipo: "sistema",
            texto: `${player.name} rolou salvaguarda (${idx}): ${saveRoll} vs DC ${DC}`,
          });

          if (saveRoll < DC) {
            // aplica apenas a primeira condição
            const cond = acao.conditions[0];
            const data = conditionsData[cond.index];
            setPlayer((prev) => ({
              ...prev,
              buff: {
                ...prev.buff,
                [cond.index]: {
                  nome: data.nome,
                  descricao: data.descricao,
                  timeEffect: data.duracao,
                  penalidades: data.penalidades,
                },
              },
            }));
            mensagens.push({
              tipo: "sistema",
              texto: `${player.name} sofreu a condição ${data.nome}: ${data.descricao}`,
            });
          } else {
            mensagens.push({
              tipo: "sistema",
              texto: `${player.name} resistiu ao efeito de ${acao.name}!`,
            });
          }
        }
      } else {
        mensagens.push({
          tipo: "inimigo",
          texto: `${enemy.name} errou ${acao.name} 🎲${roll}+${bonusAtk} = ${modRoll}🛡️`,
        });
      }
    }
    // 5.2) Ação baseada só em DC (sopro, magia de status...)
    else if (acao.dc) {
      // 1. Descobre qual atributo usar na salvaguarda
      let idx = acao.dc.dc_type?.index || "dexterity";
      if (!player.attributes[idx]) idx = "dexterity";

      // 2. Pega modificador de salvaguarda
      const modSal = player.attributes[idx].mod;

      // 3. Faz rolagem fixa (ou poderia ser um d20 depois)
      const saveRoll = rolarDado(20, "salvamento") + modSal;

      // 4. Valor de dificuldade
      const DC = acao.dc.dc_value;

      // 5. Mostra mensagem da rolagem
      mensagens.push({
        tipo: "sistema",
        texto: `${player.name} rolou salvaguarda (${idx}): ${saveRoll} vs DC ${DC}`,
      });

      // 6. Testa salvaguarda
      if (saveRoll < DC) {
        // Falhou: aplica condição se tiver
        if (acao.conditions.length > 0) {
          const cond = acao.conditions[0];
          const data = conditionsData[cond.index];
          setPlayer((prev) => ({
            ...prev,
            buff: {
              ...prev.buff,
              [cond.index]: {
                nome: data.nome,
                descricao: data.descricao,
                timeEffect: data.duracao,
                penalidades: data.penalidades,
              },
            },
          }));
          mensagens.push({
            tipo: "sistema",
            texto: `${player.name} sofreu a condição ${data.nome}: ${data.descricao}`,
          });
        }

        // Aplica DANO TOTAL
        let totalDmg = 0;
        for (const d of acao.damage) {
          let tmp = rolarDadoPersonalizado(d.damage_dice);
          totalDmg += tmp;
        }

        if (totalDmg) {
          mensagens.push({
            tipo: "inimigo",
            texto: `usou ${acao.name}, causando ${totalDmg}💥 de dano total!`,
          });
          totalDano += totalDmg;
        }
      } else {
        // Passou: verifica se o sucesso leva meio dano
        if (acao.dc.success_type === "half") {
          let halfDmg = 0;
          for (const d of acao.damage) {
            let tmp = rolarDadoPersonalizado(d.damage_dice);
            tmp = Math.floor(tmp / 2);
            halfDmg += tmp;
          }

          if (halfDmg) {
            mensagens.push({
              tipo: "inimigo",
              texto: `usou ${acao.name}, causando metade do dano: ${halfDmg}💥`,
            });
            totalDano += halfDmg;
          }
        }

        // Passou: NÃO sofre condição.
        mensagens.push({
          tipo: "sistema",
          texto: `${player.name} resistiu ao efeito de ${acao.name}!`,
        });
      }
    }

    // 5.3) Outras ações (buffs, etc.)
    else {
      mensagens.push({
        tipo: "inimigo",
        texto: `${enemy.name} usou ${acao.name}: ${acao.desc}`,
      });
    }
  }

  // 6) Aplica dano acumulado
  if (totalDano > 0) {
    setPlayerHP((hp) => Math.max(0, hp - totalDano));
  }

  mensagens.push({ tipo: "sistema", texto: `--- Fim do ${round}° Round ---` });
  setMensagens((prev) => [...prev, ...mensagens]);
}