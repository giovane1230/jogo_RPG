export async function fetchMonster(index) {
  const response = await fetch(`https://www.dnd5eapi.co/api/monsters/${index}`);
  if (!response.ok) throw new Error("Erro ao buscar monstro");
  return await response.json();
}
