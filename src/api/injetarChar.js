const personagemPronto = {
    "name": "MOK",
    "race": {
        "name": "Half-Elf",
        "starting_proficiencies": [],
        "ability_bonuses": [
            {
                "ability_score": {
                    "index": "cha",
                    "name": "CHA",
                    "url": "/api/2014/ability-scores/cha"
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
            "base": 8,
            "bonus": 0,
            "total": 8,
            "mod": -1
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
            "bonus": 0,
            "total": 8,
            "mod": -1
        },
        "wis": {
            "base": 8,
            "bonus": 0,
            "total": 8,
            "mod": -1
        },
        "cha": {
            "base": 8,
            "bonus": 2,
            "total": 100,
            "mod": 0
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
            "Skill: Intimidation"
        ]
    },
    "potions": [

    ],
    "selectedEquipments": [
        {
            "index": "greataxe",
            "name": "Greataxe",
            "price": 30,
            "url": "/api/2014/equipment/greataxe",
            "type": "weapon",
            "category": "Martial",
            "status": "1d12",
            "bonusDex": null
        },
        {
            "index": "handaxe",
            "name": "Handaxe",
            "price": 5,
            "url": "/api/2014/equipment/handaxe",
            "type": "weapon",
            "category": "Simple",
            "status": "1d6",
            "bonusDex": null
        },
        {
            "index": "spear",
            "name": "Spear",
            "price": 1,
            "url": "/api/2014/equipment/spear",
            "type": "weapon",
            "category": "Simple",
            "status": "1d6",
            "bonusDex": null
        },
        {
            "index": "scale-mail",
            "name": "Scale Mail",
            "price": 50,
            "url": "/api/2014/equipment/scale-mail",
            "type": "armor",
            "category": "Medium",
            "status": 14,
            "bonusDex": false
        },
        {
            "index": "shortsword",
            "name": "Shortsword",
            "price": 10,
            "url": "/api/2014/equipment/shortsword",
            "type": "weapon",
            "category": "Martial",
            "status": "1d6",
            "bonusDex": null
        },
        {
            "index": "leather-armor",
            "name": "Leather Armor",
            "price": 10,
            "url": "/api/2014/equipment/leather-armor",
            "type": "armor",
            "category": "Light",
            "status": 14,
            "bonusDex": true
        },
        {
            "index": "shield",
            "name": "Shield",
            "price": 10,
            "url": "/api/2014/equipment/shield",
            "type": "armor",
            "category": "Shield",
            "status": 2,
            "dex_bonus": false
        }
    ],
    "background": "OASKDOASKDOASD",
    "alignment": "Chaotic Neutral",
    "gold": 853,
    "exp": 0,
    "nivel": 1,
    "cArmor": 10,
    "initialSlots": {
        "armor": null,
        "weapon": null,
        "shield": null,
        "focus": null,
        "ring": [],
        "wondrousItem": null
    },
    "vidaInicial": 12,
    "spells": []
}

export default personagemPronto;