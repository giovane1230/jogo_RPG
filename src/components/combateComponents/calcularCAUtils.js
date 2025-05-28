export function calcularCA(equipamentos, dexMod, character) {
  if (equipamentos.armor?.category === "Medium" && character.attributes.dex.mod > 2) {
    dexMod = 2;
  }
  let caBase = 10 + dexMod;
  const { armor, shield } = equipamentos;
  if (armor) {
    caBase = armor.status;
    if (armor.bonusDex) caBase += dexMod;
  }
  if (shield) caBase += shield.status;
  return caBase;
}