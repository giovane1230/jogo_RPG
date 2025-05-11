const personagemPronto = {
    "name": "808080",
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
            "mod": -1,
            "value": 8
        },
        "dex": {
            "mod": -1,
            "value": 8
        },
        "con": {
            "mod": -1,
            "value": 8
        },
        "int": {
            "mod": -1,
            "value": 8
        },
        "wis": {
            "mod": -1,
            "value": 8
        },
        "cha": {
            "mod": -1,
            "value": 8
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
            "index": "greataxe",
            "name": "Greataxe",
            "price": 30,
            "url": "/api/2014/equipment/greataxe",
            "type": "weapon",
            "category": "Martial",
            "status": "1d12",
            "bonusDex": null,
            "properties": [
                {
                    "index": "heavy",
                    "name": "Heavy",
                    "url": "/api/2014/weapon-properties/heavy"
                },
                {
                    "index": "two-handed",
                    "name": "Two-Handed",
                    "url": "/api/2014/weapon-properties/two-handed"
                }
            ],
            "twoHandedDamage": null,
            "strengthRequirement": null,
            "stealthDisadvantage": "No"
        },
        {
            "index": "handaxe",
            "name": "Handaxe",
            "price": 5,
            "url": "/api/2014/equipment/handaxe",
            "type": "weapon",
            "category": "Simple",
            "status": "1d6",
            "bonusDex": null,
            "properties": [
                {
                    "index": "light",
                    "name": "Light",
                    "url": "/api/2014/weapon-properties/light"
                },
                {
                    "index": "thrown",
                    "name": "Thrown",
                    "url": "/api/2014/weapon-properties/thrown"
                },
                {
                    "index": "monk",
                    "name": "Monk",
                    "url": "/api/2014/weapon-properties/monk"
                }
            ],
            "twoHandedDamage": null,
            "strengthRequirement": null,
            "stealthDisadvantage": "No"
        }
    ],
    "potions": [],
    "background": "80808080",
    "alignment": "Chaotic Good",
    "gold": 1000,
    "exp": 0,
    "nivel": 1,
    "up": false,
    "proficienciesBonus": 2,
    "cArmor": 10,
    "vidaInicial": 11,
    "vidaAtual": 11,
    "initialSlots": {
        "armor": null,
        "mainHand": null,
        "offHand": null,
        "focus": null,
        "ring": [],
        "wondrousItem": null
    },
    "selectedProficiencies": {
        "0": [
            "Skill: Animal Handling",
            "Skill: Athletics"
        ]
    },
    "spells": []
}

export default personagemPronto;
