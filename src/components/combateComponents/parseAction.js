import detectConditionsFromDesc from "./detectConditionsFromDesc";

export function parseAction(action) {
  if (!action) return {};

  const texto = action.desc || "";

  // 1) attack_bonus
  const bonusMatch = texto.match(/\+(\d+)\s+to hit/i);
  const attack_bonus = bonusMatch ? parseInt(bonusMatch[1], 10) : null;

  // 2) dc (se não vier, extrai do texto)
  const dcMatch = texto.match(
    /DC\s+(\d+)\s+(Strength|Dexterity|Constitution|Intelligence|Wisdom|Charisma)/i
  );
  let dc = action.dc || null;
  if (!dc && dcMatch) {
    const idx = dcMatch[2].slice(0, 3).toLowerCase();
    dc = {
      dc_type: { index: idx, name: dcMatch[2], url: "" },
      dc_value: parseInt(dcMatch[1], 10),
      success_type: /half as much damage/i.test(texto) ? "half" : "none",
    };
  }

  // 3) damage (se não vier, extrai do texto)
  const damageMatches = [
    ...texto.matchAll(
      /\((\d+d\d+(?:\s*\+\s*\d+)?)\)\s*(bludgeoning|slashing|piercing|acid|fire|cold|lightning|poison|necrotic|radiant|force|psychic|thunder)\s+damage/gi
    ),
  ];
  const damageExtracted = damageMatches.map((m) => ({
    damage_type: { index: m[2].toLowerCase(), name: m[2], url: "" },
    damage_dice: m[1].replace(/\s+/g, ""),
  }));

  // 4) condições
  const conditions =
    action.conditions?.length > 0
      ? action.conditions
      : detectConditionsFromDesc(texto);

  // 5) monta o objeto final
  const base = {
    name: action.name,
    desc: texto,
    attack_bonus,
    dc,
    damage: action.damage?.length ? action.damage : damageExtracted,
    conditions,
    usage: action.usage || null,
    multiattack_type: action.multiattack_type || null,
    actions: action.actions || [],
  };

  return base;
}