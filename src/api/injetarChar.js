const personagemPronto = {
    "name": "MOKADO",
    "race": {
        "name": "Halfling",
        "starting_proficiencies": [],
        "ability_bonuses": [
            {
                "ability_score": {
                    "index": "dex",
                    "name": "DEX",
                    "url": "/api/2014/ability-scores/dex"
                },
                "bonus": 2
            }
        ]
    },
    "class": {
        "index": "barbarian",
        "name": "Barbarian"
    },
    "attributes": {
        "str": {
            "value": 10,
            "mod": 0
        },
        "dex": {
            "value": 20,
            "mod": 5
        },
        "con": {
            "value": 10,
            "mod": 0
        },
        "int": {
            "value": 10,
            "mod": 0
        },
        "wis": {
            "value": 10,
            "mod": 0
        },
        "cha": {
            "value": 15,
            "mod": 2
        }
    },
    "proficiencies": [
        {
            "index": "light-armor",
            "name": "Light Armor",
            "url": "/api/2014/proficiencies/light-armor"
        },
        {
            "index": "medium-armor",
            "name": "Medium Armor",
            "url": "/api/2014/proficiencies/medium-armor"
        },
        {
            "index": "shields",
            "name": "Shields",
            "url": "/api/2014/proficiencies/shields"
        },
        {
            "index": "simple-weapons",
            "name": "Simple Weapons",
            "url": "/api/2014/proficiencies/simple-weapons"
        },
        {
            "index": "martial-weapons",
            "name": "Martial Weapons",
            "url": "/api/2014/proficiencies/martial-weapons"
        },
        {
            "index": "saving-throw-str",
            "name": "Saving Throw: STR",
            "url": "/api/2014/proficiencies/saving-throw-str"
        },
        {
            "index": "saving-throw-con",
            "name": "Saving Throw: CON",
            "url": "/api/2014/proficiencies/saving-throw-con"
        }
    ],
    "bag": [
        {
            "index": "leather-armor",
            "name": "Leather Armor",
            "price": 10,
            "url": "/api/2014/equipment/leather-armor",
            "type": "armor",
            "category": "Light",
            "status": 11,
            "bonusDex": true,
            "properties": [],
            "twoHandedDamage": null,
            "strengthRequirement": null,
            "stealthDisadvantage": "No",
            "quantity": 1
        },
        {
            "index": "trident",
            "name": "Trident",
            "price": 5,
            "url": "/api/2014/equipment/trident",
            "type": "weapon",
            "category": "Martial",
            "status": {
                "damage_dice": "1d6",
                "damage_type": {
                    "index": "slashing",
                    "name": "Slashing",
                    "url": "/api/2014/damage-types/slashing"
                }
            },
            "bonusDex": null,
            "properties": [
                {
                    "index": "thrown",
                    "name": "Thrown",
                    "url": "/api/2014/weapon-properties/thrown"
                },
                {
                    "index": "versatile",
                    "name": "Versatile",
                    "url": "/api/2014/weapon-properties/versatile"
                }
            ],
            "twoHandedDamage": {
                "damage_dice": "1d8",
                "damage_type": {
                    "index": "piercing",
                    "name": "Piercing",
                    "url": "/api/2014/damage-types/piercing"
                }
            },
            "strengthRequirement": null,
            "stealthDisadvantage": "No",
            "quantity": 1
        },
        {
            "index": "sickle",
            "name": "Sickle",
            "price": 1,
            "url": "/api/2014/equipment/sickle",
            "type": "weapon",
            "category": "Simple",
            "status": {
                "damage_dice": "1d4",
                "damage_type": {
                    "index": "slashing",
                    "name": "Slashing",
                    "url": "/api/2014/damage-types/slashing"
                }
            },
            "bonusDex": null,
            "properties": [
                {
                    "index": "light",
                    "name": "Light",
                    "url": "/api/2014/weapon-properties/light"
                },
                {
                    "index": "monk",
                    "name": "Monk",
                    "url": "/api/2014/weapon-properties/monk"
                }
            ],
            "twoHandedDamage": null,
            "strengthRequirement": null,
            "stealthDisadvantage": "No",
            "quantity": 1
        },
        {
            "index": "splint-armor",
            "name": "Splint Armor",
            "price": 200,
            "url": "/api/2014/equipment/splint-armor",
            "type": "armor",
            "category": "Heavy",
            "status": 17,
            "bonusDex": false,
            "properties": [],
            "twoHandedDamage": null,
            "strengthRequirement": 15,
            "stealthDisadvantage": "Yes",
            "quantity": 1
        },
        {
            "index": "shortbow",
            "name": "Shortbow",
            "price": 25,
            "url": "/api/2014/equipment/shortbow",
            "type": "weapon",
            "category": "Simple",
            "status": {
                "damage_dice": "1d6",
                "damage_type": {
                    "index": "piercing",
                    "name": "Piercing",
                    "url": "/api/2014/damage-types/piercing"
                }
            },
            "bonusDex": null,
            "properties": [
                {
                    "index": "ammunition",
                    "name": "Ammunition",
                    "url": "/api/2014/weapon-properties/ammunition"
                },
                {
                    "index": "two-handed",
                    "name": "Two-Handed",
                    "url": "/api/2014/weapon-properties/two-handed"
                }
            ],
            "twoHandedDamage": null,
            "strengthRequirement": null,
            "stealthDisadvantage": "No",
            "quantity": 1
        },
        {
            "index": "net",
            "name": "Net",
            "price": 1,
            "url": "/api/2014/equipment/net",
            "type": "weapon",
            "category": "Martial",
            "status": "Misc",
            "bonusDex": null,
            "properties": [
                {
                    "index": "thrown",
                    "name": "Thrown",
                    "url": "/api/2014/weapon-properties/thrown"
                },
                {
                    "index": "special",
                    "name": "Special",
                    "url": "/api/2014/weapon-properties/special"
                }
            ],
            "twoHandedDamage": null,
            "strengthRequirement": null,
            "stealthDisadvantage": "No",
            "quantity": 1
        },
        {
            "index": "shield",
            "name": "Shield",
            "price": 10,
            "url": "/api/2014/equipment/shield",
            "type": "armor",
            "category": "Shield",
            "status": 2,
            "bonusDex": false,
            "properties": [],
            "twoHandedDamage": null,
            "strengthRequirement": null,
            "stealthDisadvantage": "No",
            "quantity": 1
        },
        {
            "index": "whip",
            "name": "Whip",
            "price": 2,
            "url": "/api/2014/equipment/whip",
            "type": "weapon",
            "category": "Martial",
            "status": {
                "damage_dice": "1d4",
                "damage_type": {
                    "index": "slashing",
                    "name": "Slashing",
                    "url": "/api/2014/damage-types/slashing"
                }
            },
            "bonusDex": null,
            "properties": [
                {
                    "index": "finesse",
                    "name": "Finesse",
                    "url": "/api/2014/weapon-properties/finesse"
                },
                {
                    "index": "reach",
                    "name": "Reach",
                    "url": "/api/2014/weapon-properties/reach"
                }
            ],
            "twoHandedDamage": null,
            "strengthRequirement": null,
            "stealthDisadvantage": "No",
            "quantity": 1
        }
    ],
    "potions": [
        {
            "index": "potion-of-healing-common",
            "name": "Potion of Healing",
            "price": 0,
            "url": "/api/2014/magic-items/potion-of-healing-common",
            "type": "potion",
            "category": "Misc",
            "status": "Misc",
            "bonusDex": null,
            "properties": null,
            "twoHandedDamage": null,
            "strengthRequirement": null,
            "stealthDisadvantage": "No",
            "quantity": 5
        }
    ],
    "background": "PEROSNAFEM MOKADO",
    "alignment": "Chaotic Evil",
    "gold": 999746,
    "exp": 0,
    "nivel": 6,
    "up": false,
    "proficienciesBonus": 3,
    "cArmor": 9,
    "vidaInicial": 68,
    "vidaAtual": 68,
    "equipment": {
        "armor": null,
        "mainHand": null,
        "offHand": null,
        "focus": null,
        "ring": [],
        "wondrousItem": null,
        "two-handed": null,
        "weapon": null,
        "shield": null
    },
    "selectedProficiencies": {
        "0": [
            "Skill: Animal Handling",
            "Skill: Intimidation"
        ]
    },
    "spells": [],
    "buff": {
        "frightened": {
            "nome": "Amedrontado",
            "descricao": "Desvantagem em testes e ataques enquanto a fonte do medo estiver visível.",
            "timeEffect": 2,
            "penalidades": [
                "desvantagem",
                "restritoAlvo"
            ]
        }
    }
}

export default personagemPronto;
