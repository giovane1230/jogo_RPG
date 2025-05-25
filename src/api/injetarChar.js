const personagemPronto = {
    name: "MOKADO",
    race: {
        name: "Halfling",
        starting_proficiencies: [],
        ability_bonuses: [
            {
                ability_score: {
                    index: "dex",
                    name: "DEX",
                    url: "/api/2014/ability-scores/dex",
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
            mod: -1,
            value: 8,
        },
        dex: {
            mod: -1,
            value: 8,
        },
        con: {
            mod: -1,
            value: 8,
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
    bag: [
        // D4 - Bludgeoning
        {
            index: "greatsword",
            name: "D4 (Bludgeoning)",
            price: 1,
            url: "/api/2014/equipment/quarterstaff",
            type: "weapon",
            category: "Simple",
            status: {
                damage_dice: "1d4",
                damage_type: {
                    index: "bludgeoning",
                    name: "Bludgeoning",
                    url: "/api/2014/damage-types/bludgeoning",
                },
            },
            bonusDex: null,
            properties: [],
            twoHandedDamage: null,
            strengthRequirement: null,
            stealthDisadvantage: "No",
        },
        // D6 - Slashing
        {
            index: "halberd",
            name: "D6 (Slashing)",
            price: 1,
            url: "/api/2014/equipment/quarterstaff",
            type: "weapon",
            category: "Simple",
            status: {
                damage_dice: "1d6",
                damage_type: {
                    index: "slashing",
                    name: "Slashing",
                    url: "/api/2014/damage-types/slashing",
                },
            },
            bonusDex: null,
            properties: [],
            twoHandedDamage: null,
            strengthRequirement: null,
            stealthDisadvantage: "No",
        },
        // D8 - Piercing
        {
            index: "handaxe",
            name: "D8 (Piercing)",
            price: 1,
            url: "/api/2014/equipment/quarterstaff",
            type: "weapon",
            category: "Martial",
            status: {
                damage_dice: "1d8",
                damage_type: {
                    index: "piercing",
                    name: "Piercing",
                    url: "/api/2014/damage-types/piercing",
                },
            },
            bonusDex: null,
            properties: [],
            twoHandedDamage: null,
            strengthRequirement: null,
            stealthDisadvantage: "No",
        },
        // D10 - Fire
        {
            index: "hammer",
            name: "D10 (Fire)",
            price: 1,
            url: "/api/2014/equipment/quarterstaff",
            type: "weapon",
            category: "Martial",
            status: {
                damage_dice: "1d10",
                damage_type: {
                    index: "fire",
                    name: "Fire",
                    url: "/api/2014/damage-types/fire",
                },
            },
            bonusDex: null,
            properties: [],
            twoHandedDamage: null,
            strengthRequirement: null,
            stealthDisadvantage: "No",
        },
        // D12 - Cold
        {
            index: "quarterstaff",
            name: "D12 (Cold)",
            price: 1,
            url: "/api/2014/equipment/quarterstaff",
            type: "weapon",
            category: "Martial",
            status: {
                damage_dice: "1d12",
                damage_type: {
                    index: "cold",
                    name: "Cold",
                    url: "/api/2014/damage-types/cold",
                },
            },
            bonusDex: null,
            properties: [],
            twoHandedDamage: null,
            strengthRequirement: null,
            stealthDisadvantage: "No",
        },
    ],
    potions: [
        {
            index: "potion-of-healing-common",
            name: "Potion of Healing",
            price: 0,
            url: "/api/2014/magic-items/potion-of-healing-common",
            type: "potion",
            category: "Misc",
            status: "Misc",
            bonusDex: null,
            properties: null,
            twoHandedDamage: null,
            strengthRequirement: null,
            stealthDisadvantage: "No",
            quantity: 5,
        },
    ],
    background: "PEROSNAFEM MOKADO",
    alignment: "Chaotic Evil",
    gold: 999750,
    exp: 0,
    nivel: 1,
    up: false,
    proficienciesBonus: 2,
    cArmor: 9,
    vidaInicial: 11,
    vidaAtual: 11,
    initialSlots: {
        armor: null,
        mainHand: null,
        offHand: null,
        focus: null,
        ring: [],
        wondrousItem: null,
    },
    selectedProficiencies: {
        0: ["Skill: Animal Handling", "Skill: Intimidation"],
    },
    spells: [],
    buff: {
        frightened: {
            nome: "Amedrontado",
            descricao:
                "Desvantagem em testes e ataques enquanto a fonte do medo estiver visível.",
            timeEffect: 2,
            penalidades: ["desvantagem", "restritoAlvo"],
        },
    },
};

export default personagemPronto;
