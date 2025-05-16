const personagemPronto = {
    "name": "808080",
    "race": {
        "name": "Half-Orc",
        "starting_proficiencies": [
            {
                "index": "skill-intimidation",
                "name": "Skill: Intimidation",
                "url": "/api/2014/proficiencies/skill-intimidation"
            }
        ],
        "ability_bonuses": [
            {
                "ability_score": {
                    "index": "str",
                    "name": "STR",
                    "url": "/api/2014/ability-scores/str"
                },
                "bonus": 2
            },
            {
                "ability_score": {
                    "index": "con",
                    "name": "CON",
                    "url": "/api/2014/ability-scores/con"
                },
                "bonus": 1
            }
        ]
    },
    "class": {
        "index": "wizard",
        "name": "Wizard"
    },
    "attributes": {
        "str": {
            "mod": -1,
            "value": 8
        },
        "dex": {
            "value": 15,
            "mod": 2
        },
        "con": {
            "value": 20,
            "mod": 5
        },
        "int": {
            "value": 10,
            "mod": 0
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
            "index": "daggers",
            "name": "Daggers",
            "url": "/api/2014/proficiencies/daggers"
        },
        {
            "index": "darts",
            "name": "Darts",
            "url": "/api/2014/proficiencies/darts"
        },
        {
            "index": "slings",
            "name": "Slings",
            "url": "/api/2014/proficiencies/slings"
        },
        {
            "index": "quarterstaffs",
            "name": "Quarterstaffs",
            "url": "/api/2014/proficiencies/quarterstaffs"
        },
        {
            "index": "crossbows-light",
            "name": "Crossbows, light",
            "url": "/api/2014/proficiencies/crossbows-light"
        },
        {
            "index": "saving-throw-int",
            "name": "Saving Throw: INT",
            "url": "/api/2014/proficiencies/saving-throw-int"
        },
        {
            "index": "saving-throw-wis",
            "name": "Saving Throw: WIS",
            "url": "/api/2014/proficiencies/saving-throw-wis"
        }
    ],
    "bag": [
        {
            "index": "quarterstaff",
            "name": "Quarterstaff",
            "price": 2,
            "url": "/api/2014/equipment/quarterstaff",
            "type": "weapon",
            "category": "Simple",
            "status": "1d6",
            "bonusDex": null,
            "properties": [
                {
                    "index": "versatile",
                    "name": "Versatile",
                    "url": "/api/2014/weapon-properties/versatile"
                },
                {
                    "index": "monk",
                    "name": "Monk",
                    "url": "/api/2014/weapon-properties/monk"
                }
            ],
            "twoHandedDamage": {
                "damage_dice": "1d8",
                "damage_type": {
                    "index": "bludgeoning",
                    "name": "Bludgeoning",
                    "url": "/api/2014/damage-types/bludgeoning"
                }
            },
            "strengthRequirement": null,
            "stealthDisadvantage": "No"
        },
        {
            "index": "staff",
            "name": "Staff",
            "price": 5,
            "url": "/api/2014/equipment/staff",
            "type": "adventuring gear",
            "category": "Misc",
            "status": "Misc",
            "bonusDex": null,
            "properties": [],
            "twoHandedDamage": null,
            "strengthRequirement": null,
            "stealthDisadvantage": "No"
        },
        {
            "index": "explorers-pack",
            "name": "Explorer's Pack",
            "price": 10,
            "url": "/api/2014/equipment/explorers-pack",
            "type": "adventuring gear",
            "category": "Misc",
            "status": "Misc",
            "bonusDex": null,
            "properties": [],
            "twoHandedDamage": null,
            "strengthRequirement": null,
            "stealthDisadvantage": "No"
        },
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
            "index": "breastplate",
            "name": "Breastplate",
            "price": 400,
            "url": "/api/2014/equipment/breastplate",
            "type": "armor",
            "category": "Medium",
            "status": 14,
            "bonusDex": true,
            "properties": [],
            "twoHandedDamage": null,
            "strengthRequirement": null,
            "stealthDisadvantage": "No",
            "quantity": 1
        },
        {
            "index": "studded-leather-armor",
            "name": "Studded Leather Armor",
            "price": 45,
            "url": "/api/2014/equipment/studded-leather-armor",
            "type": "armor",
            "category": "Light",
            "status": 12,
            "bonusDex": true,
            "properties": [],
            "twoHandedDamage": null,
            "strengthRequirement": null,
            "stealthDisadvantage": "No",
            "quantity": 1
        },
        {
            "index": "shortbow",
            "name": "Shortbow",
            "price": 25,
            "url": "/api/2014/equipment/shortbow",
            "type": "weapon",
            "category": "Simple",
            "status": "1d6",
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
            "index": "quarterstaff",
            "name": "Quarterstaff",
            "price": 2,
            "url": "/api/2014/equipment/quarterstaff",
            "type": "weapon",
            "category": "Simple",
            "status": "1d6",
            "bonusDex": null,
            "properties": [
                {
                    "index": "versatile",
                    "name": "Versatile",
                    "url": "/api/2014/weapon-properties/versatile"
                },
                {
                    "index": "monk",
                    "name": "Monk",
                    "url": "/api/2014/weapon-properties/monk"
                }
            ],
            "twoHandedDamage": {
                "damage_dice": "1d8",
                "damage_type": {
                    "index": "bludgeoning",
                    "name": "Bludgeoning",
                    "url": "/api/2014/damage-types/bludgeoning"
                }
            },
            "strengthRequirement": null,
            "stealthDisadvantage": "No",
            "quantity": 1
        },
        {
            "index": "pike",
            "name": "Pike",
            "price": 5,
            "url": "/api/2014/equipment/pike",
            "type": "weapon",
            "category": "Martial",
            "status": "1d10",
            "bonusDex": null,
            "properties": [
                {
                    "index": "heavy",
                    "name": "Heavy",
                    "url": "/api/2014/weapon-properties/heavy"
                },
                {
                    "index": "reach",
                    "name": "Reach",
                    "url": "/api/2014/weapon-properties/reach"
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
            "index": "morningstar",
            "name": "Morningstar",
            "price": 15,
            "url": "/api/2014/equipment/morningstar",
            "type": "weapon",
            "category": "Martial",
            "status": "1d8",
            "bonusDex": null,
            "properties": [],
            "twoHandedDamage": null,
            "strengthRequirement": null,
            "stealthDisadvantage": "No",
            "quantity": 1
        },
        {
            "index": "maul",
            "name": "Maul",
            "price": 10,
            "url": "/api/2014/equipment/maul",
            "type": "weapon",
            "category": "Martial",
            "status": "2d6",
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
            "stealthDisadvantage": "No",
            "quantity": 1
        },
        {
            "index": "chain-shirt",
            "name": "Chain Shirt",
            "price": 50,
            "url": "/api/2014/equipment/chain-shirt",
            "type": "armor",
            "category": "Medium",
            "status": 13,
            "bonusDex": true,
            "properties": [],
            "twoHandedDamage": null,
            "strengthRequirement": null,
            "stealthDisadvantage": "No",
            "quantity": 1
        },
        {
            "index": "padded-armor",
            "name": "Padded Armor",
            "price": 5,
            "url": "/api/2014/equipment/padded-armor",
            "type": "armor",
            "category": "Light",
            "status": 11,
            "bonusDex": true,
            "properties": [],
            "twoHandedDamage": null,
            "strengthRequirement": null,
            "stealthDisadvantage": "Yes",
            "quantity": 1
        },
        {
            "index": "trident",
            "name": "Trident",
            "price": 5,
            "url": "/api/2014/equipment/trident",
            "type": "weapon",
            "category": "Martial",
            "status": "1d6",
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
        }
    ],
    "potions": [
        {
            "index": "oil-of-etherealness",
            "name": "Oil of Etherealness",
            "equipment_category": {
                "index": "potion",
                "name": "Potion",
                "url": "/api/2014/equipment-categories/potion"
            },
            "rarity": {
                "name": "Rare"
            },
            "variants": [],
            "variant": false,
            "desc": [
                "Potion, rare",
                "Beads of this cloudy gray oil form on the outside of its container and quickly evaporate. The oil can cover a Medium or smaller creature, along with the equipment it's wearing and carrying (one additional vial is required for each size category above Medium). Applying the oil takes 10 minutes. The affected creature then gains the effect of the etherealness spell for 1 hour."
            ],
            "url": "/api/2014/magic-items/oil-of-etherealness",
            "updated_at": "2025-04-08T21:14:05.798Z",
            "quantity": 4
        }
    ],
    "background": "80808080",
    "alignment": "Chaotic Good",
    "gold": 902491,
    "exp": 3157.5,
    "nivel": 3,
    "up": false,
    "proficienciesBonus": 2,
    "cArmor": 18,
    "vidaInicial": 27,
    "vidaAtual": 1,
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
            "Skill: History",
            "Skill: Insight"
        ]
    },
    "spells": [
        {
            "higher_level": [],
            "index": "alarm",
            "name": "Alarm",
            "desc": [
                "You set an alarm against unwanted intrusion. Choose a door, a window, or an area within range that is no larger than a 20-foot cube. Until the spell ends, an alarm alerts you whenever a Tiny or larger creature touches or enters the warded area. When you cast the spell, you can designate creatures that won't set off the alarm. You also choose whether the alarm is mental or audible.",
                "A mental alarm alerts you with a ping in your mind if you are within 1 mile of the warded area. This ping awakens you if you are sleeping.",
                "An audible alarm produces the sound of a hand bell for 10 seconds within 60 feet."
            ],
            "range": "30 feet",
            "components": [
                "V",
                "S",
                "M"
            ],
            "material": "A tiny bell and a piece of fine silver wire.",
            "ritual": true,
            "duration": "8 hours",
            "concentration": false,
            "casting_time": "1 minute",
            "level": 1,
            "area_of_effect": {
                "type": "cube",
                "size": 20
            },
            "school": {
                "index": "abjuration",
                "name": "Abjuration",
                "url": "/api/2014/magic-schools/abjuration"
            },
            "classes": [
                {
                    "index": "ranger",
                    "name": "Ranger",
                    "url": "/api/2014/classes/ranger"
                },
                {
                    "index": "wizard",
                    "name": "Wizard",
                    "url": "/api/2014/classes/wizard"
                }
            ],
            "subclasses": [
                {
                    "index": "lore",
                    "name": "Lore",
                    "url": "/api/2014/subclasses/lore"
                }
            ],
            "url": "/api/2014/spells/alarm",
            "updated_at": "2025-04-08T21:14:16.147Z"
        },
        {
            "index": "burning-hands",
            "name": "Burning Hands",
            "desc": [
                "As you hold your hands with thumbs touching and fingers spread, a thin sheet of flames shoots forth from your outstretched fingertips. Each creature in a 15-foot cone must make a dexterity saving throw. A creature takes 3d6 fire damage on a failed save, or half as much damage on a successful one.",
                "The fire ignites any flammable objects in the area that aren't being worn or carried."
            ],
            "higher_level": [
                "When you cast this spell using a spell slot of 2nd level or higher, the damage increases by 1d6 for each slot level above 1st."
            ],
            "range": "Self",
            "components": [
                "V",
                "S"
            ],
            "ritual": false,
            "duration": "Instantaneous",
            "concentration": false,
            "casting_time": "1 action",
            "level": 1,
            "damage": {
                "damage_type": {
                    "index": "fire",
                    "name": "Fire",
                    "url": "/api/2014/damage-types/fire"
                },
                "damage_at_slot_level": {
                    "1": "3d6",
                    "2": "4d6",
                    "3": "5d6",
                    "4": "6d6",
                    "5": "7d6",
                    "6": "8d6",
                    "7": "9d6",
                    "8": "10d6",
                    "9": "11d6"
                }
            },
            "dc": {
                "dc_type": {
                    "index": "dex",
                    "name": "DEX",
                    "url": "/api/2014/ability-scores/dex"
                },
                "dc_success": "half"
            },
            "area_of_effect": {
                "type": "cone",
                "size": 15
            },
            "school": {
                "index": "evocation",
                "name": "Evocation",
                "url": "/api/2014/magic-schools/evocation"
            },
            "classes": [
                {
                    "index": "sorcerer",
                    "name": "Sorcerer",
                    "url": "/api/2014/classes/sorcerer"
                },
                {
                    "index": "wizard",
                    "name": "Wizard",
                    "url": "/api/2014/classes/wizard"
                }
            ],
            "subclasses": [
                {
                    "index": "lore",
                    "name": "Lore",
                    "url": "/api/2014/subclasses/lore"
                },
                {
                    "index": "fiend",
                    "name": "Fiend",
                    "url": "/api/2014/subclasses/fiend"
                }
            ],
            "url": "/api/2014/spells/burning-hands",
            "updated_at": "2025-04-08T21:14:16.147Z"
        },
        {
            "index": "charm-person",
            "name": "Charm Person",
            "desc": [
                "You attempt to charm a humanoid you can see within range. It must make a wisdom saving throw, and does so with advantage if you or your companions are fighting it. If it fails the saving throw, it is charmed by you until the spell ends or until you or your companions do anything harmful to it. The charmed creature regards you as a friendly acquaintance. When the spell ends, the creature knows it was charmed by you."
            ],
            "higher_level": [
                "When you cast this spell using a spell slot of 2nd level or higher, you can target one additional creature for each slot level above 1st. The creatures must be within 30 feet of each other when you target them."
            ],
            "range": "30 feet",
            "components": [
                "V",
                "S"
            ],
            "ritual": false,
            "duration": "1 hour",
            "concentration": false,
            "casting_time": "1 action",
            "level": 1,
            "dc": {
                "dc_type": {
                    "index": "wis",
                    "name": "WIS",
                    "url": "/api/2014/ability-scores/wis"
                },
                "dc_success": "none"
            },
            "school": {
                "index": "enchantment",
                "name": "Enchantment",
                "url": "/api/2014/magic-schools/enchantment"
            },
            "classes": [
                {
                    "index": "bard",
                    "name": "Bard",
                    "url": "/api/2014/classes/bard"
                },
                {
                    "index": "druid",
                    "name": "Druid",
                    "url": "/api/2014/classes/druid"
                },
                {
                    "index": "sorcerer",
                    "name": "Sorcerer",
                    "url": "/api/2014/classes/sorcerer"
                },
                {
                    "index": "warlock",
                    "name": "Warlock",
                    "url": "/api/2014/classes/warlock"
                },
                {
                    "index": "wizard",
                    "name": "Wizard",
                    "url": "/api/2014/classes/wizard"
                }
            ],
            "subclasses": [
                {
                    "index": "lore",
                    "name": "Lore",
                    "url": "/api/2014/subclasses/lore"
                }
            ],
            "url": "/api/2014/spells/charm-person",
            "updated_at": "2025-04-08T21:14:16.147Z"
        },
        {
            "index": "color-spray",
            "name": "Color Spray",
            "desc": [
                "A dazzling array of flashing, colored light springs from your hand. Roll 6d10; the total is how many hit points of creatures this spell can effect. Creatures in a 15-foot cone originating from you are affected in ascending order of their current hit points (ignoring unconscious creatures and creatures that can't see).",
                "Starting with the creature that has the lowest current hit points, each creature affected by this spell is blinded until the spell ends. Subtract each creature's hit points from the total before moving on to the creature with the next lowest hit points. A creature's hit points must be equal to or less than the remaining total for that creature to be affected."
            ],
            "higher_level": [
                "When you cast this spell using a spell slot of 2nd level or higher, roll an additional 2d10 for each slot level above 1st."
            ],
            "range": "Self",
            "components": [
                "V",
                "S",
                "M"
            ],
            "material": "A pinch of powder or sand that is colored red, yellow, and blue.",
            "ritual": false,
            "duration": "1 round",
            "concentration": false,
            "casting_time": "1 action",
            "level": 1,
            "area_of_effect": {
                "type": "cone",
                "size": 15
            },
            "school": {
                "index": "illusion",
                "name": "Illusion",
                "url": "/api/2014/magic-schools/illusion"
            },
            "classes": [
                {
                    "index": "sorcerer",
                    "name": "Sorcerer",
                    "url": "/api/2014/classes/sorcerer"
                },
                {
                    "index": "wizard",
                    "name": "Wizard",
                    "url": "/api/2014/classes/wizard"
                }
            ],
            "subclasses": [
                {
                    "index": "lore",
                    "name": "Lore",
                    "url": "/api/2014/subclasses/lore"
                }
            ],
            "url": "/api/2014/spells/color-spray",
            "updated_at": "2025-04-08T21:14:16.147Z"
        },
        {
            "higher_level": [],
            "index": "comprehend-languages",
            "name": "Comprehend Languages",
            "desc": [
                "For the duration, you understand the literal meaning of any spoken language that you hear. You also understand any written language that you see, but you must be touching the surface on which the words are written. It takes about 1 minute to read one page of text.",
                "This spell doesn't decode secret messages in a text or a glyph, such as an arcane sigil, that isn't part of a written language."
            ],
            "range": "Self",
            "components": [
                "V",
                "S",
                "M"
            ],
            "material": "A pinch of soot and salt.",
            "ritual": true,
            "duration": "1 hour",
            "concentration": false,
            "casting_time": "1 action",
            "level": 1,
            "school": {
                "index": "divination",
                "name": "Divination",
                "url": "/api/2014/magic-schools/divination"
            },
            "classes": [
                {
                    "index": "bard",
                    "name": "Bard",
                    "url": "/api/2014/classes/bard"
                },
                {
                    "index": "sorcerer",
                    "name": "Sorcerer",
                    "url": "/api/2014/classes/sorcerer"
                },
                {
                    "index": "warlock",
                    "name": "Warlock",
                    "url": "/api/2014/classes/warlock"
                },
                {
                    "index": "wizard",
                    "name": "Wizard",
                    "url": "/api/2014/classes/wizard"
                }
            ],
            "subclasses": [
                {
                    "index": "lore",
                    "name": "Lore",
                    "url": "/api/2014/subclasses/lore"
                }
            ],
            "url": "/api/2014/spells/comprehend-languages",
            "updated_at": "2025-04-08T21:14:16.147Z"
        },
        {
            "higher_level": [],
            "index": "detect-magic",
            "name": "Detect Magic",
            "desc": [
                "For the duration, you sense the presence of magic within 30 feet of you. If you sense magic in this way, you can use your action to see a faint aura around any visible creature or object in the area that bears magic, and you learn its school of magic, if any.",
                "The spell can penetrate most barriers, but it is blocked by 1 foot of stone, 1 inch of common metal, a thin sheet of lead, or 3 feet of wood or dirt."
            ],
            "range": "Self",
            "components": [
                "V",
                "S"
            ],
            "ritual": true,
            "duration": "Up to 10 minutes",
            "concentration": true,
            "casting_time": "1 action",
            "level": 1,
            "area_of_effect": {
                "type": "sphere",
                "size": 30
            },
            "school": {
                "index": "divination",
                "name": "Divination",
                "url": "/api/2014/magic-schools/divination"
            },
            "classes": [
                {
                    "index": "bard",
                    "name": "Bard",
                    "url": "/api/2014/classes/bard"
                },
                {
                    "index": "cleric",
                    "name": "Cleric",
                    "url": "/api/2014/classes/cleric"
                },
                {
                    "index": "druid",
                    "name": "Druid",
                    "url": "/api/2014/classes/druid"
                },
                {
                    "index": "paladin",
                    "name": "Paladin",
                    "url": "/api/2014/classes/paladin"
                },
                {
                    "index": "ranger",
                    "name": "Ranger",
                    "url": "/api/2014/classes/ranger"
                },
                {
                    "index": "sorcerer",
                    "name": "Sorcerer",
                    "url": "/api/2014/classes/sorcerer"
                },
                {
                    "index": "wizard",
                    "name": "Wizard",
                    "url": "/api/2014/classes/wizard"
                }
            ],
            "subclasses": [
                {
                    "index": "lore",
                    "name": "Lore",
                    "url": "/api/2014/subclasses/lore"
                }
            ],
            "url": "/api/2014/spells/detect-magic",
            "updated_at": "2025-04-08T21:14:16.147Z"
        }
    ],
    "buff": {
        "defender": { "CD": 0, "timeEffect": 0 },
        "outroBuff": { "CD": 0, "timeEffect": 0 },
    }
}

export default personagemPronto;
