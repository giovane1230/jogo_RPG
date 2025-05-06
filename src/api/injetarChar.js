const personagemPronto = 
    {
        "name": "MOKED",
        "race": {
            "name": "Gnome",
            "starting_proficiencies": [],
            "ability_bonuses": [
                {
                    "ability_score": {
                        "index": "int",
                        "name": "INT",
                        "url": "/api/2014/ability-scores/int"
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
                "base": 12,
                "bonus": 0,
                "total": 12,
                "mod": 1
            },
            "dex": {
                "base": 8,
                "bonus": 0,
                "total": 8,
                "mod": -1
            },
            "con": {
                "base": 8,
                "bonus": 0,
                "total": 8,
                "mod": -1
            },
            "int": {
                "base": 8,
                "bonus": 2,
                "total": 10,
                "mod": 0
            },
            "wis": {
                "base": 8,
                "bonus": 0,
                "total": 8,
                "mod": -1
            },
            "cha": {
                "base": 8,
                "bonus": 0,
                "total": 8,
                "mod": -1
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
        "selectedProficiencies": {
            "0": [
                "Skill: Animal Handling",
                "Skill: Athletics"
            ]
        },
        "selectedEquipments": [
            {
                "index": "greataxe",
                "name": "Greataxe",
                "price": 30,
                "url": "/api/2014/equipment/greataxe",
                "type": "weapon",
                "category": "Martial",
                "status": "1d12",
                "bonusDex": null,
            },
            {
                "index": "club",
                "name": "Club",
                "price": 1,
                "url": "/api/2014/equipment/club",
                "type": "weapon",
                "category": "Simple",
                "status": "1d4",
                "bonusDex": null,
            }
        ],
        "potions": [],
        "background": "MOAKADO",
        "alignment": "Chaotic Evil",
        "gold": 1000,
        "exp": 0,
        "nivel": 1,
        "cArmor": 9,
        "initialSlots": {
            "armor": null,
            "mainHand": null,
            "offHand": null,
            "focus": null,
            "ring": [],
            "wondrousItem": null
        },
        "vidaInicial": 12,
        "spells": []
    }

export default personagemPronto;