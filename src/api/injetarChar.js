const personagemPronto = {
  name: "MOK",
  race: {
    name: "Gnome",
    starting_proficiencies: [],
    ability_bonuses: [
      {
        ability_score: {
          index: "int",
          name: "INT",
          url: "/api/2014/ability-scores/int",
        },
        bonus: 2,
      },
    ],
  },
  class: {
    index: "barbarian",
    name: "Barbarian",
  },
  attributes: {
    str: {
      value: 10,
      mod: 0,
    },
    dex: {
      mod: -1,
      value: 8,
    },
    con: {
      value: 15,
      mod: 2,
    },
    int: {
      mod: -1,
      value: 8,
    },
    wis: {
      mod: -1,
      value: 8,
    },
    cha: {
      mod: -1,
      value: 8,
    },
  },
  proficiencies: [
    {
      index: "light-armor",
      name: "Light Armor",
      url: "/api/2014/proficiencies/light-armor",
    },
    {
      index: "medium-armor",
      name: "Medium Armor",
      url: "/api/2014/proficiencies/medium-armor",
    },
    {
      index: "shields",
      name: "Shields",
      url: "/api/2014/proficiencies/shields",
    },
    {
      index: "simple-weapons",
      name: "Simple Weapons",
      url: "/api/2014/proficiencies/simple-weapons",
    },
    {
      index: "martial-weapons",
      name: "Martial Weapons",
      url: "/api/2014/proficiencies/martial-weapons",
    },
    {
      index: "saving-throw-str",
      name: "Saving Throw: STR",
      url: "/api/2014/proficiencies/saving-throw-str",
    },
    {
      index: "saving-throw-con",
      name: "Saving Throw: CON",
      url: "/api/2014/proficiencies/saving-throw-con",
    },
  ],
  bag: [],
  potions: [],
  background: "MOKBACK",
  alignment: "Chaotic Evil",
  gold: 1000,
  exp: 0,
  nivel: 1,
  up: false,
  proficienciesBonus: 2,
  cArmor: 9,
  initialSlots: {
    armor: null,
    mainHand: null,
    offHand: null,
    focus: null,
    ring: [],
    wondrousItem: null,
  },
  vidaAtual: 14,
  vidaInicial: 14,
  selectedProficiencies: {
    0: ["Skill: Animal Handling", "Skill: Athletics"],
  },
  selectedEquipments: [
    {
      index: "warhammer",
      name: "Warhammer",
      price: 15,
      url: "/api/2014/equipment/warhammer",
      type: "weapon",
      category: "Martial",
      status: "1d8",
      bonusDex: null,
    },
    {
      index: "greatclub",
      name: "Greatclub",
      price: 2,
      url: "/api/2014/equipment/greatclub",
      type: "weapon",
      category: "Simple",
      status: "1d8",
      bonusDex: null,
    },
  ],
  spells: [],
};

export default personagemPronto;
