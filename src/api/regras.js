const xpLevels = {
  1: { xp: 0, proficiencia: 2 }, // para chegar no proximo nivel tem que ter o xp do nivel posterior mesmo
  2: { xp: 300, proficiencia: 2 }, //nivel 1 xp max 300 e assim vai
  3: { xp: 900, proficiencia: 2 },
  4: { xp: 2700, proficiencia: 2 },
  5: { xp: 6500, proficiencia: 3 },
  6: { xp: 14000, proficiencia: 3 },
  7: { xp: 23000, proficiencia: 3 },
  8: { xp: 34000, proficiencia: 3 },
  9: { xp: 48000, proficiencia: 4 },
  10: { xp: 64000, proficiencia: 4 },
  11: { xp: 85000, proficiencia: 4 },
  12: { xp: 100000, proficiencia: 4 },
  13: { xp: 120000, proficiencia: 5 },
  14: { xp: 140000, proficiencia: 5 },
  15: { xp: 165000, proficiencia: 5 },
  16: { xp: 195000, proficiencia: 5 },
  17: { xp: 225000, proficiencia: 6 },
  18: { xp: 265000, proficiencia: 6 },
  19: { xp: 305000, proficiencia: 6 },
  20: { xp: 355000, proficiencia: 6 },
};

export default xpLevels;

const magiaLevel = {
  1: [2, 0, 0, 0, 0, 0, 0, 0, 0],
  2: [3, 0, 0, 0, 0, 0, 0, 0, 0],
  3: [4, 2, 0, 0, 0, 0, 0, 0, 0],
  4: [4, 3, 0, 0, 0, 0, 0, 0, 0],
  5: [4, 3, 2, 0, 0, 0, 0, 0, 0],
  6: [4, 3, 3, 0, 0, 0, 0, 0, 0],
  7: [4, 3, 3, 1, 0, 0, 0, 0, 0],
  8: [4, 3, 3, 2, 0, 0, 0, 0, 0],
  9: [4, 3, 3, 3, 1, 0, 0, 0, 0],
  10: [4, 3, 3, 3, 2, 0, 0, 0, 0],
  11: [4, 3, 3, 3, 2, 1, 0, 0, 0],
  12: [4, 3, 3, 3, 2, 1, 0, 0, 0],
  13: [4, 3, 3, 3, 2, 1, 1, 0, 0],
  14: [4, 3, 3, 3, 2, 1, 1, 0, 0],
  15: [4, 3, 3, 3, 2, 1, 1, 1, 0],
  16: [4, 3, 3, 3, 2, 1, 1, 1, 0],
  17: [4, 3, 3, 3, 2, 1, 1, 1, 1],
  18: [4, 3, 3, 3, 3, 1, 1, 1, 1],
  19: [4, 3, 3, 3, 3, 2, 1, 1, 1],
  20: [4, 3, 3, 3, 3, 2, 2, 1, 1],
};

export { magiaLevel };

const vidaClasse = {
  barbarian: { vida: 12 },
  bard: { vida: 8 },
  cleric: { vida: 8 },
  druid: { vida: 8 },
  fighter: { vida: 10 },
  monk: { vida: 8 },
  paladin: { vida: 10 },
  ranger: { vida: 10 },
  rogue: { vida: 8 },
  sorcerer: { vida: 6 },
  warlock: { vida: 8 },
  wizard: { vida: 6 },
};

export { vidaClasse };