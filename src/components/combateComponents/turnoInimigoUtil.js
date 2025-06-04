import conditionsData from "../buffDebuffsComponents/conditionsData";
import { aplicarDano } from "./aplicarDano";
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
  // 0) Checa se inimigo tem ações, se o combate já acabou ou se player está indefinido; caso sim, retorna sem fazer nada
  if (!enemy.actions?.length || combateFinalizado) return;

  console.log("chegou");
  // 1) Incrementa o contador de rounds
  setRound((r) => r + 1);

  // 2) Atualiza os buffs do player no início do turno
  const buffsAtualizados = BuffUtils?.AtualizarBuffs(player.buff);
  setPlayer((prev) => ({ ...prev, buff: buffsAtualizados }));

  // 3) Se o player estiver sob o efeito do buff 'empurrar/atordoado', pula o turno do inimigo e exibe mensagens
  if (player.buff.empurrar?.timeEffect > 0) {
    setMensagens((prev) => [
      ...prev,
      { tipo: "buff", texto: `${enemy.name} atordoado!` },
      { tipo: "sistema", texto: `--- Fim do ${round}° Round ---` },
    ]);
    return;
  }

  // 4) Seleciona uma ação aleatória do inimigo e faz o parsing dessa ação
  let raw = enemy.actions[Math.floor(Math.random() * enemy.actions.length)];
  let atk = parseAction(raw);

  console.log("Ataque do inimigo:", atk);

  // 5) Verifica se a ação selecionada tem dano, DC ou multiattack, caso não, busca um fallback de ataque básico
  if (!atk.damage.length && !atk.dc && !atk.multiattack_type) {
    const fallback =
      enemy.actions.find((a) => /slam|bite|claw/i.test(a.name)) ||
      enemy.actions.find((a) => a.attack_bonus != null);
    atk = parseAction(fallback || raw);
  }

  const mensagens = [];

  // 6) Define quais ações serão executadas: se multiattack, cria uma lista com todas as subações repetidas conforme contagem
  const acoesParaExecutar = atk.multiattack_type
    ? atk.actions.flatMap((sub) => {
        const full = enemy.actions.find((a) => a.name === sub.action_name);
        return full ? Array(Number(sub.count) || 1).fill(full) : [];
      })
    : [atk];

  let totalDano = 0; // acumulador de dano total causado ao player

  // 7) Processa cada sub-ação da ação atual
  for (const rawA of acoesParaExecutar) {
    const acao = parseAction(rawA);

    // 7.1) Rola o dado para acerto do inimigo e calcula se é crítico
    const roll = rolarDado(20, "acerto inimigo");
    const crit = roll === 20;

    const bonusAtk = acao.attack_bonus ?? 0;
    const modRoll = roll + bonusAtk;
    const defesa = player.cArmor;

    // 7.2) Verifica se o player tem buffs de esquiva ou invisibilidade que impedem o acerto
    const esquiva = player.buff.esquiva?.timeEffect > 0;
    const invis = player.buff.sumir?.timeEffect > 0;

    // 7.3) Verifica se o ataque acertou, considerando buffs de esquiva/invisibilidade e a defesa do player
    const acertou = !esquiva && !invis && modRoll > defesa;

    // 7.4) Caso o player esteja intangible (esquiva ou invisível), adiciona mensagem e não causa dano
    if (esquiva || invis) {
      mensagens.push({ tipo: "buff", texto: `${player.name} intangível!` });
    }

    let danoAcao = 0; // dano causado pela ação atual

    // 7.5) Caso a ação seja um ataque físico com bônus de ataque
    if (acao.attack_bonus != null) {
      if (acertou) {
        // 7.5.1) Calcula dano rolando os dados definidos na ação
        for (const d of acao.damage) {
          danoAcao += rolarDadoPersonalizado(d.damage_dice);
        }
        if (crit) danoAcao *= 2; // dano em dobro em caso de crítico

        // 7.5.2) Mensagem do ataque bem-sucedido
        mensagens.push({
          tipo: "inimigo",
          texto: `${enemy.name} ${crit ? "CRÍTICO" : "acertou"} com ${
            acao.name
          } 🎲${roll}+${bonusAtk} = ${modRoll}, causando ${danoAcao}💥`,
        });

        // 7.5.3) Acumula o dano da ação para aplicar depois
        totalDano += danoAcao;

        // 7.5.4) Caso a ação tenha salvaguarda (DC) e condições, realiza a checagem e aplica a condição se falhar
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
            // Aplica a primeira condição da lista
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
        // 7.5.5) Caso ataque físico erre
        mensagens.push({
          tipo: "inimigo",
          texto: `${enemy.name} errou ${acao.name} 🎲${roll}+${bonusAtk} = ${modRoll}🛡️`,
        });
      }
    }
    // 7.6) Caso a ação seja apenas baseada em salvaguarda (DC), como sopro ou magia de status
    else if (acao.dc) {
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
        // Falhou: aplica condição se houver
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

        // Aplica dano total rolando os dados de dano da ação
        let totalDmg = 0;
        for (const d of acao.damage) {
          totalDmg += rolarDadoPersonalizado(d.damage_dice);
        }

        if (totalDmg) {
          mensagens.push({
            tipo: "inimigo",
            texto: `usou ${acao.name}, causando ${totalDmg}💥 de dano total!`,
          });
          totalDano += totalDmg;
        }
      } else {
        // Caso salvaguarda tenha sucesso

        // Verifica se a regra da ação permite meio dano no sucesso
        if (acao.dc.success_type === "half") {
          let halfDmg = 0;
          for (const d of acao.damage) {
            halfDmg += Math.floor(rolarDadoPersonalizado(d.damage_dice) / 2);
          }

          if (halfDmg) {
            mensagens.push({
              tipo: "inimigo",
              texto: `usou ${acao.name}, causando metade do dano: ${halfDmg}💥`,
            });
            totalDano += halfDmg;
          }
        }

        // Não aplica condição em caso de sucesso na salvaguarda
        mensagens.push({
          tipo: "sistema",
          texto: `${player.name} resistiu ao efeito de ${acao.name}!`,
        });
      }
    }
    // 7.7) Caso a ação não seja ataque físico nem baseada em DC (exemplo: buffs, habilidades passivas)
    else {
      mensagens.push({
        tipo: "inimigo",
        texto: `${enemy.name} usou ${acao.name}, mas não causou dano direto.`,
      });
    }
  }

  // 8) Aplica o dano acumulado ao player e atualiza o HP
  if (totalDano > 0) {
    const novaVida = aplicarDano(
      player,
      { dano: totalDano, tipo: "INIMGIO DANO" },
      setMensagens
    );
    setPlayer((prev) => ({ ...prev, vidaAtual: novaVida }));
  }

  // 9) Exibe as mensagens acumuladas, incluindo encerramento do turno
  setMensagens((prev) => [
    ...prev,
    ...mensagens,
    { tipo: "sistema", texto: `--- Fim do ${round}° Round ---` },
  ]);
}
