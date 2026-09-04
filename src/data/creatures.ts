import type { Creature } from '../types'

export const creatures: Creature[] = [
  {
    "id": "castle-pikeman",
    "faction": "castle",
    "tier": 1,
    "upgraded": false,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Pikeman",
      "pl": "Pikeman"
    },
    "stats": {
      "attack": 4,
      "defense": 5,
      "minDamage": 1,
      "maxDamage": 3,
      "health": 10,
      "speed": 4,
      "growth": 14,
      "aiValue": 80,
      "cost": 60
    },
    "abilities": [],
    "notes": [
      "Immune to Jousting"
    ],
    "spriteKey": "castle-pikeman"
  },
  {
    "id": "castle-halberdier",
    "faction": "castle",
    "tier": 1,
    "upgraded": true,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Halberdier",
      "pl": "Halberdier"
    },
    "stats": {
      "attack": 6,
      "defense": 5,
      "minDamage": 2,
      "maxDamage": 3,
      "health": 10,
      "speed": 5,
      "growth": 14,
      "aiValue": 115,
      "cost": 75
    },
    "abilities": [],
    "notes": [
      "Immune to Jousting"
    ],
    "spriteKey": "castle-halberdier"
  },
  {
    "id": "castle-archer",
    "faction": "castle",
    "tier": 2,
    "upgraded": false,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Archer",
      "pl": "Archer"
    },
    "stats": {
      "attack": 6,
      "defense": 3,
      "minDamage": 2,
      "maxDamage": 3,
      "health": 10,
      "speed": 4,
      "growth": 9,
      "aiValue": 126,
      "cost": 100
    },
    "abilities": [
      "ranged"
    ],
    "notes": [
      "Ranged (12 shots)"
    ],
    "shots": 12,
    "spriteKey": "castle-archer"
  },
  {
    "id": "castle-marksman",
    "faction": "castle",
    "tier": 2,
    "upgraded": true,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Marksman",
      "pl": "Marksman"
    },
    "stats": {
      "attack": 6,
      "defense": 3,
      "minDamage": 2,
      "maxDamage": 3,
      "health": 10,
      "speed": 6,
      "growth": 9,
      "aiValue": 184,
      "cost": 150
    },
    "abilities": [
      "ranged",
      "doubleAttack"
    ],
    "notes": [
      "Ranged (24 shots)",
      "Double attack"
    ],
    "shots": 24,
    "spriteKey": "castle-marksman"
  },
  {
    "id": "castle-griffin",
    "faction": "castle",
    "tier": 3,
    "upgraded": false,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Griffin",
      "pl": "Griffin"
    },
    "stats": {
      "attack": 8,
      "defense": 8,
      "minDamage": 3,
      "maxDamage": 6,
      "health": 25,
      "speed": 6,
      "growth": 7,
      "aiValue": 351,
      "cost": 200
    },
    "abilities": [
      "flying"
    ],
    "notes": [
      "Flying",
      "Two retaliations"
    ],
    "spriteKey": "castle-griffin"
  },
  {
    "id": "castle-royal-griffin",
    "faction": "castle",
    "tier": 3,
    "upgraded": true,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Royal Griffin",
      "pl": "Royal Griffin"
    },
    "stats": {
      "attack": 9,
      "defense": 9,
      "minDamage": 3,
      "maxDamage": 6,
      "health": 25,
      "speed": 9,
      "growth": 7,
      "aiValue": 448,
      "cost": 240
    },
    "abilities": [
      "flying"
    ],
    "notes": [
      "Flying",
      "Unlimited retaliations"
    ],
    "spriteKey": "castle-royal-griffin"
  },
  {
    "id": "castle-swordsman",
    "faction": "castle",
    "tier": 4,
    "upgraded": false,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Swordsman",
      "pl": "Swordsman"
    },
    "stats": {
      "attack": 10,
      "defense": 12,
      "minDamage": 6,
      "maxDamage": 9,
      "health": 35,
      "speed": 5,
      "growth": 4,
      "aiValue": 445,
      "cost": 300
    },
    "abilities": [],
    "notes": [],
    "spriteKey": "castle-swordsman"
  },
  {
    "id": "castle-crusader",
    "faction": "castle",
    "tier": 4,
    "upgraded": true,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Crusader",
      "pl": "Crusader"
    },
    "stats": {
      "attack": 12,
      "defense": 12,
      "minDamage": 7,
      "maxDamage": 10,
      "health": 35,
      "speed": 6,
      "growth": 4,
      "aiValue": 588,
      "cost": 400
    },
    "abilities": [
      "doubleAttack"
    ],
    "notes": [
      "Double attack"
    ],
    "spriteKey": "castle-crusader"
  },
  {
    "id": "castle-monk",
    "faction": "castle",
    "tier": 5,
    "upgraded": false,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Monk",
      "pl": "Monk"
    },
    "stats": {
      "attack": 12,
      "defense": 7,
      "minDamage": 10,
      "maxDamage": 12,
      "health": 30,
      "speed": 5,
      "growth": 3,
      "aiValue": 582,
      "cost": 400
    },
    "abilities": [
      "ranged"
    ],
    "notes": [
      "Ranged (12 shots)"
    ],
    "shots": 12,
    "spriteKey": "castle-monk"
  },
  {
    "id": "castle-zealot",
    "faction": "castle",
    "tier": 5,
    "upgraded": true,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Zealot",
      "pl": "Zealot"
    },
    "stats": {
      "attack": 12,
      "defense": 10,
      "minDamage": 10,
      "maxDamage": 12,
      "health": 30,
      "speed": 7,
      "growth": 3,
      "aiValue": 750,
      "cost": 450
    },
    "abilities": [
      "ranged",
      "noMeleePenalty"
    ],
    "notes": [
      "Ranged (24 shots)",
      "No melee penalty"
    ],
    "shots": 24,
    "spriteKey": "castle-zealot"
  },
  {
    "id": "castle-cavalier",
    "faction": "castle",
    "tier": 6,
    "upgraded": false,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Cavalier",
      "pl": "Cavalier"
    },
    "stats": {
      "attack": 15,
      "defense": 15,
      "minDamage": 15,
      "maxDamage": 25,
      "health": 100,
      "speed": 7,
      "growth": 2,
      "aiValue": 1946,
      "cost": 1000
    },
    "abilities": [],
    "notes": [
      "Jousting"
    ],
    "spriteKey": "castle-cavalier"
  },
  {
    "id": "castle-champion",
    "faction": "castle",
    "tier": 6,
    "upgraded": true,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Champion",
      "pl": "Champion"
    },
    "stats": {
      "attack": 16,
      "defense": 16,
      "minDamage": 20,
      "maxDamage": 25,
      "health": 100,
      "speed": 9,
      "growth": 2,
      "aiValue": 2100,
      "cost": 1200
    },
    "abilities": [],
    "notes": [
      "Jousting"
    ],
    "spriteKey": "castle-champion"
  },
  {
    "id": "castle-angel",
    "faction": "castle",
    "tier": 7,
    "upgraded": false,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Angel",
      "pl": "Angel"
    },
    "stats": {
      "attack": 20,
      "defense": 20,
      "minDamage": 50,
      "maxDamage": 50,
      "health": 200,
      "speed": 12,
      "growth": 1,
      "aiValue": 5019,
      "cost": 3000
    },
    "abilities": [
      "flying"
    ],
    "notes": [
      "Flying",
      "Hates Devils",
      "Morale +1"
    ],
    "spriteKey": "castle-angel"
  },
  {
    "id": "castle-archangel",
    "faction": "castle",
    "tier": 7,
    "upgraded": true,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Archangel",
      "pl": "Archangel"
    },
    "stats": {
      "attack": 30,
      "defense": 30,
      "minDamage": 50,
      "maxDamage": 50,
      "health": 250,
      "speed": 18,
      "growth": 1,
      "aiValue": 8776,
      "cost": 5000
    },
    "abilities": [
      "flying"
    ],
    "notes": [
      "Flying",
      "Hates Devils",
      "Resurrection",
      "Morale +1"
    ],
    "spriteKey": "castle-archangel"
  },
  {
    "id": "rampart-centaur",
    "faction": "rampart",
    "tier": 1,
    "upgraded": false,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Centaur",
      "pl": "Centaur"
    },
    "stats": {
      "attack": 5,
      "defense": 3,
      "minDamage": 2,
      "maxDamage": 3,
      "health": 8,
      "speed": 6,
      "growth": 14,
      "aiValue": 100,
      "cost": 70
    },
    "abilities": [],
    "notes": [],
    "spriteKey": "rampart-centaur"
  },
  {
    "id": "rampart-centaur-captain",
    "faction": "rampart",
    "tier": 1,
    "upgraded": true,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Centaur Captain",
      "pl": "Centaur Captain"
    },
    "stats": {
      "attack": 6,
      "defense": 3,
      "minDamage": 2,
      "maxDamage": 3,
      "health": 10,
      "speed": 8,
      "growth": 14,
      "aiValue": 138,
      "cost": 90
    },
    "abilities": [],
    "notes": [],
    "spriteKey": "rampart-centaur-captain"
  },
  {
    "id": "rampart-dwarf",
    "faction": "rampart",
    "tier": 2,
    "upgraded": false,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Dwarf",
      "pl": "Dwarf"
    },
    "stats": {
      "attack": 6,
      "defense": 7,
      "minDamage": 2,
      "maxDamage": 4,
      "health": 20,
      "speed": 3,
      "growth": 8,
      "aiValue": 138,
      "cost": 120
    },
    "abilities": [],
    "notes": [
      "Resistance (+20%)"
    ],
    "spriteKey": "rampart-dwarf"
  },
  {
    "id": "rampart-battle-dwarf",
    "faction": "rampart",
    "tier": 2,
    "upgraded": true,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Battle Dwarf",
      "pl": "Battle Dwarf"
    },
    "stats": {
      "attack": 7,
      "defense": 7,
      "minDamage": 2,
      "maxDamage": 4,
      "health": 20,
      "speed": 5,
      "growth": 8,
      "aiValue": 209,
      "cost": 150
    },
    "abilities": [],
    "notes": [
      "Resistance (+40%)"
    ],
    "spriteKey": "rampart-battle-dwarf"
  },
  {
    "id": "rampart-wood-elf",
    "faction": "rampart",
    "tier": 3,
    "upgraded": false,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Wood Elf",
      "pl": "Wood Elf"
    },
    "stats": {
      "attack": 9,
      "defense": 5,
      "minDamage": 3,
      "maxDamage": 5,
      "health": 15,
      "speed": 6,
      "growth": 7,
      "aiValue": 234,
      "cost": 200
    },
    "abilities": [
      "ranged"
    ],
    "notes": [
      "Ranged (24 shots)"
    ],
    "shots": 24,
    "spriteKey": "rampart-wood-elf"
  },
  {
    "id": "rampart-grand-elf",
    "faction": "rampart",
    "tier": 3,
    "upgraded": true,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Grand Elf",
      "pl": "Grand Elf"
    },
    "stats": {
      "attack": 9,
      "defense": 5,
      "minDamage": 3,
      "maxDamage": 5,
      "health": 15,
      "speed": 7,
      "growth": 7,
      "aiValue": 331,
      "cost": 225
    },
    "abilities": [
      "ranged",
      "doubleAttack"
    ],
    "notes": [
      "Ranged (24 shots)",
      "Double attack"
    ],
    "shots": 24,
    "spriteKey": "rampart-grand-elf"
  },
  {
    "id": "rampart-pegasus",
    "faction": "rampart",
    "tier": 4,
    "upgraded": false,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Pegasus",
      "pl": "Pegasus"
    },
    "stats": {
      "attack": 9,
      "defense": 8,
      "minDamage": 5,
      "maxDamage": 9,
      "health": 30,
      "speed": 8,
      "growth": 5,
      "aiValue": 518,
      "cost": 250
    },
    "abilities": [
      "flying"
    ],
    "notes": [
      "Flying",
      "Magic damper"
    ],
    "spriteKey": "rampart-pegasus"
  },
  {
    "id": "rampart-silver-pegasus",
    "faction": "rampart",
    "tier": 4,
    "upgraded": true,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Silver Pegasus",
      "pl": "Silver Pegasus"
    },
    "stats": {
      "attack": 9,
      "defense": 10,
      "minDamage": 5,
      "maxDamage": 9,
      "health": 30,
      "speed": 12,
      "growth": 5,
      "aiValue": 532,
      "cost": 275
    },
    "abilities": [
      "flying"
    ],
    "notes": [
      "Flying",
      "Magic damper"
    ],
    "spriteKey": "rampart-silver-pegasus"
  },
  {
    "id": "rampart-dendroid-guard",
    "faction": "rampart",
    "tier": 5,
    "upgraded": false,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Dendroid Guard",
      "pl": "Dendroid Guard"
    },
    "stats": {
      "attack": 9,
      "defense": 12,
      "minDamage": 10,
      "maxDamage": 14,
      "health": 55,
      "speed": 3,
      "growth": 3,
      "aiValue": 517,
      "cost": 350
    },
    "abilities": [],
    "notes": [
      "Binding"
    ],
    "spriteKey": "rampart-dendroid-guard"
  },
  {
    "id": "rampart-dendroid-soldier",
    "faction": "rampart",
    "tier": 5,
    "upgraded": true,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Dendroid Soldier",
      "pl": "Dendroid Soldier"
    },
    "stats": {
      "attack": 9,
      "defense": 12,
      "minDamage": 10,
      "maxDamage": 14,
      "health": 65,
      "speed": 4,
      "growth": 3,
      "aiValue": 803,
      "cost": 425
    },
    "abilities": [],
    "notes": [
      "Binding"
    ],
    "spriteKey": "rampart-dendroid-soldier"
  },
  {
    "id": "rampart-unicorn",
    "faction": "rampart",
    "tier": 6,
    "upgraded": false,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Unicorn",
      "pl": "Unicorn"
    },
    "stats": {
      "attack": 15,
      "defense": 14,
      "minDamage": 18,
      "maxDamage": 22,
      "health": 90,
      "speed": 7,
      "growth": 2,
      "aiValue": 1806,
      "cost": 850
    },
    "abilities": [],
    "notes": [
      "Blinding attack",
      "Aura of Resistance (+20%)"
    ],
    "spriteKey": "rampart-unicorn"
  },
  {
    "id": "rampart-war-unicorn",
    "faction": "rampart",
    "tier": 6,
    "upgraded": true,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "War Unicorn",
      "pl": "War Unicorn"
    },
    "stats": {
      "attack": 15,
      "defense": 14,
      "minDamage": 18,
      "maxDamage": 22,
      "health": 110,
      "speed": 9,
      "growth": 2,
      "aiValue": 2030,
      "cost": 950
    },
    "abilities": [],
    "notes": [
      "Blinding attack",
      "Aura of Resistance (+20%)"
    ],
    "spriteKey": "rampart-war-unicorn"
  },
  {
    "id": "rampart-green-dragon",
    "faction": "rampart",
    "tier": 7,
    "upgraded": false,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Green Dragon",
      "pl": "Green Dragon"
    },
    "stats": {
      "attack": 18,
      "defense": 18,
      "minDamage": 40,
      "maxDamage": 50,
      "health": 180,
      "speed": 10,
      "growth": 1,
      "aiValue": 4872,
      "cost": 2400
    },
    "abilities": [
      "flying"
    ],
    "notes": [
      "Dragon",
      "Flying",
      "Breath attack",
      "1-3 lvl spells immunity"
    ],
    "spriteKey": "rampart-green-dragon"
  },
  {
    "id": "rampart-gold-dragon",
    "faction": "rampart",
    "tier": 7,
    "upgraded": true,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Gold Dragon",
      "pl": "Gold Dragon"
    },
    "stats": {
      "attack": 27,
      "defense": 27,
      "minDamage": 40,
      "maxDamage": 50,
      "health": 250,
      "speed": 16,
      "growth": 1,
      "aiValue": 8613,
      "cost": 4000
    },
    "abilities": [
      "flying"
    ],
    "notes": [
      "Dragon",
      "Flying",
      "Breath attack",
      "1-4 lvl spells immunity"
    ],
    "spriteKey": "rampart-gold-dragon"
  },
  {
    "id": "tower-gremlin",
    "faction": "tower",
    "tier": 1,
    "upgraded": false,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Gremlin",
      "pl": "Gremlin"
    },
    "stats": {
      "attack": 3,
      "defense": 3,
      "minDamage": 1,
      "maxDamage": 2,
      "health": 4,
      "speed": 4,
      "growth": 16,
      "aiValue": 44,
      "cost": 30
    },
    "abilities": [],
    "notes": [],
    "spriteKey": "tower-gremlin"
  },
  {
    "id": "tower-master-gremlin",
    "faction": "tower",
    "tier": 1,
    "upgraded": true,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Master Gremlin",
      "pl": "Master Gremlin"
    },
    "stats": {
      "attack": 4,
      "defense": 4,
      "minDamage": 1,
      "maxDamage": 2,
      "health": 4,
      "speed": 5,
      "growth": 16,
      "aiValue": 66,
      "cost": 40
    },
    "abilities": [
      "ranged"
    ],
    "notes": [
      "Ranged (8 shots)"
    ],
    "shots": 8,
    "spriteKey": "tower-master-gremlin"
  },
  {
    "id": "tower-stone-gargoyle",
    "faction": "tower",
    "tier": 2,
    "upgraded": false,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Stone Gargoyle",
      "pl": "Stone Gargoyle"
    },
    "stats": {
      "attack": 6,
      "defense": 6,
      "minDamage": 2,
      "maxDamage": 3,
      "health": 16,
      "speed": 6,
      "growth": 9,
      "aiValue": 165,
      "cost": 130
    },
    "abilities": [
      "flying"
    ],
    "notes": [
      "Bloodless Unliving",
      "Flying"
    ],
    "spriteKey": "tower-stone-gargoyle"
  },
  {
    "id": "tower-obsidian-gargoyle",
    "faction": "tower",
    "tier": 2,
    "upgraded": true,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Obsidian Gargoyle",
      "pl": "Obsidian Gargoyle"
    },
    "stats": {
      "attack": 7,
      "defense": 7,
      "minDamage": 2,
      "maxDamage": 3,
      "health": 16,
      "speed": 9,
      "growth": 9,
      "aiValue": 201,
      "cost": 160
    },
    "abilities": [
      "flying"
    ],
    "notes": [
      "Bloodless Unliving",
      "Flying"
    ],
    "spriteKey": "tower-obsidian-gargoyle"
  },
  {
    "id": "tower-stone-golem",
    "faction": "tower",
    "tier": 3,
    "upgraded": false,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Stone Golem",
      "pl": "Stone Golem"
    },
    "stats": {
      "attack": 7,
      "defense": 10,
      "minDamage": 4,
      "maxDamage": 5,
      "health": 30,
      "speed": 3,
      "growth": 6,
      "aiValue": 250,
      "cost": 150
    },
    "abilities": [],
    "notes": [
      "Unliving",
      "Spell damage resistance +50%"
    ],
    "spriteKey": "tower-stone-golem"
  },
  {
    "id": "tower-iron-golem",
    "faction": "tower",
    "tier": 3,
    "upgraded": true,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Iron Golem",
      "pl": "Iron Golem"
    },
    "stats": {
      "attack": 9,
      "defense": 10,
      "minDamage": 4,
      "maxDamage": 5,
      "health": 35,
      "speed": 5,
      "growth": 6,
      "aiValue": 412,
      "cost": 200
    },
    "abilities": [],
    "notes": [
      "Unliving",
      "Spell damage resistance +75%"
    ],
    "spriteKey": "tower-iron-golem"
  },
  {
    "id": "tower-mage",
    "faction": "tower",
    "tier": 4,
    "upgraded": false,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Mage",
      "pl": "Mage"
    },
    "stats": {
      "attack": 11,
      "defense": 8,
      "minDamage": 7,
      "maxDamage": 9,
      "health": 25,
      "speed": 5,
      "growth": 4,
      "aiValue": 570,
      "cost": 350
    },
    "abilities": [
      "ranged",
      "noMeleePenalty"
    ],
    "notes": [
      "Ranged (24 shots)",
      "No melee penalty",
      "No obstacle penalty",
      "Magic channeler"
    ],
    "shots": 24,
    "spriteKey": "tower-mage"
  },
  {
    "id": "tower-arch-mage",
    "faction": "tower",
    "tier": 4,
    "upgraded": true,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Arch Mage",
      "pl": "Arch Mage"
    },
    "stats": {
      "attack": 12,
      "defense": 9,
      "minDamage": 7,
      "maxDamage": 9,
      "health": 30,
      "speed": 7,
      "growth": 4,
      "aiValue": 680,
      "cost": 450
    },
    "abilities": [
      "ranged",
      "noMeleePenalty"
    ],
    "notes": [
      "Ranged (24 shots)",
      "No melee penalty",
      "No obstacle penalty",
      "Magic channeler"
    ],
    "shots": 24,
    "spriteKey": "tower-arch-mage"
  },
  {
    "id": "tower-genie",
    "faction": "tower",
    "tier": 5,
    "upgraded": false,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Genie",
      "pl": "Genie"
    },
    "stats": {
      "attack": 12,
      "defense": 12,
      "minDamage": 13,
      "maxDamage": 16,
      "health": 40,
      "speed": 7,
      "growth": 3,
      "aiValue": 884,
      "cost": 550
    },
    "abilities": [
      "flying"
    ],
    "notes": [
      "Flying",
      "Hates Efreet and Efreet Sultans"
    ],
    "spriteKey": "tower-genie"
  },
  {
    "id": "tower-master-genie",
    "faction": "tower",
    "tier": 5,
    "upgraded": true,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Master Genie",
      "pl": "Master Genie"
    },
    "stats": {
      "attack": 12,
      "defense": 12,
      "minDamage": 13,
      "maxDamage": 16,
      "health": 40,
      "speed": 11,
      "growth": 3,
      "aiValue": 942,
      "cost": 600
    },
    "abilities": [
      "flying"
    ],
    "notes": [
      "Flying",
      "Spellcaster",
      "Hates Efreet and Efreet Sultans"
    ],
    "spriteKey": "tower-master-genie"
  },
  {
    "id": "tower-naga",
    "faction": "tower",
    "tier": 6,
    "upgraded": false,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Naga",
      "pl": "Naga"
    },
    "stats": {
      "attack": 16,
      "defense": 13,
      "minDamage": 20,
      "maxDamage": 20,
      "health": 110,
      "speed": 5,
      "growth": 2,
      "aiValue": 2016,
      "cost": 1100
    },
    "abilities": [
      "noRetaliation"
    ],
    "notes": [
      "No enemy retaliation"
    ],
    "spriteKey": "tower-naga"
  },
  {
    "id": "tower-naga-queen",
    "faction": "tower",
    "tier": 6,
    "upgraded": true,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Naga Queen",
      "pl": "Naga Queen"
    },
    "stats": {
      "attack": 16,
      "defense": 13,
      "minDamage": 30,
      "maxDamage": 30,
      "health": 110,
      "speed": 7,
      "growth": 2,
      "aiValue": 2840,
      "cost": 1600
    },
    "abilities": [
      "noRetaliation"
    ],
    "notes": [
      "No enemy retaliation"
    ],
    "spriteKey": "tower-naga-queen"
  },
  {
    "id": "tower-giant",
    "faction": "tower",
    "tier": 7,
    "upgraded": false,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Giant",
      "pl": "Giant"
    },
    "stats": {
      "attack": 19,
      "defense": 16,
      "minDamage": 40,
      "maxDamage": 60,
      "health": 150,
      "speed": 7,
      "growth": 1,
      "aiValue": 3718,
      "cost": 2000
    },
    "abilities": [],
    "notes": [
      "Mind spells immunity"
    ],
    "spriteKey": "tower-giant"
  },
  {
    "id": "tower-titan",
    "faction": "tower",
    "tier": 7,
    "upgraded": true,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Titan",
      "pl": "Titan"
    },
    "stats": {
      "attack": 24,
      "defense": 24,
      "minDamage": 40,
      "maxDamage": 60,
      "health": 300,
      "speed": 11,
      "growth": 1,
      "aiValue": 7500,
      "cost": 5000
    },
    "abilities": [
      "ranged",
      "noMeleePenalty"
    ],
    "notes": [
      "Ranged (24 shots)",
      "No melee penalty",
      "Mind spells immunity",
      "Hates Black Dragons"
    ],
    "shots": 24,
    "spriteKey": "tower-titan"
  },
  {
    "id": "inferno-imp",
    "faction": "inferno",
    "tier": 1,
    "upgraded": false,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Imp",
      "pl": "Imp"
    },
    "stats": {
      "attack": 2,
      "defense": 3,
      "minDamage": 1,
      "maxDamage": 2,
      "health": 4,
      "speed": 5,
      "growth": 15,
      "aiValue": 50,
      "cost": 50
    },
    "abilities": [],
    "notes": [],
    "spriteKey": "inferno-imp"
  },
  {
    "id": "inferno-familiar",
    "faction": "inferno",
    "tier": 1,
    "upgraded": true,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Familiar",
      "pl": "Familiar"
    },
    "stats": {
      "attack": 4,
      "defense": 4,
      "minDamage": 1,
      "maxDamage": 2,
      "health": 4,
      "speed": 7,
      "growth": 15,
      "aiValue": 60,
      "cost": 60
    },
    "abilities": [],
    "notes": [
      "Magic channel"
    ],
    "spriteKey": "inferno-familiar"
  },
  {
    "id": "inferno-gog",
    "faction": "inferno",
    "tier": 2,
    "upgraded": false,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Gog",
      "pl": "Gog"
    },
    "stats": {
      "attack": 6,
      "defense": 4,
      "minDamage": 2,
      "maxDamage": 4,
      "health": 13,
      "speed": 4,
      "growth": 8,
      "aiValue": 159,
      "cost": 125
    },
    "abilities": [
      "ranged"
    ],
    "notes": [
      "Ranged (12 shots)"
    ],
    "shots": 12,
    "spriteKey": "inferno-gog"
  },
  {
    "id": "inferno-magog",
    "faction": "inferno",
    "tier": 2,
    "upgraded": true,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Magog",
      "pl": "Magog"
    },
    "stats": {
      "attack": 7,
      "defense": 4,
      "minDamage": 2,
      "maxDamage": 4,
      "health": 13,
      "speed": 6,
      "growth": 8,
      "aiValue": 240,
      "cost": 175
    },
    "abilities": [
      "ranged"
    ],
    "notes": [
      "Ranged (24 shots)",
      "Fireball attack"
    ],
    "shots": 24,
    "spriteKey": "inferno-magog"
  },
  {
    "id": "inferno-hell-hound",
    "faction": "inferno",
    "tier": 3,
    "upgraded": false,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Hell Hound",
      "pl": "Hell Hound"
    },
    "stats": {
      "attack": 10,
      "defense": 6,
      "minDamage": 2,
      "maxDamage": 7,
      "health": 25,
      "speed": 7,
      "growth": 5,
      "aiValue": 357,
      "cost": 200
    },
    "abilities": [],
    "notes": [],
    "spriteKey": "inferno-hell-hound"
  },
  {
    "id": "inferno-cerberus",
    "faction": "inferno",
    "tier": 3,
    "upgraded": true,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Cerberus",
      "pl": "Cerberus"
    },
    "stats": {
      "attack": 10,
      "defense": 8,
      "minDamage": 2,
      "maxDamage": 7,
      "health": 25,
      "speed": 8,
      "growth": 5,
      "aiValue": 392,
      "cost": 250
    },
    "abilities": [
      "noRetaliation"
    ],
    "notes": [
      "No enemy retaliation",
      "3-headed attack"
    ],
    "spriteKey": "inferno-cerberus"
  },
  {
    "id": "inferno-demon",
    "faction": "inferno",
    "tier": 4,
    "upgraded": false,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Demon",
      "pl": "Demon"
    },
    "stats": {
      "attack": 10,
      "defense": 10,
      "minDamage": 7,
      "maxDamage": 9,
      "health": 35,
      "speed": 5,
      "growth": 4,
      "aiValue": 445,
      "cost": 250
    },
    "abilities": [],
    "notes": [],
    "spriteKey": "inferno-demon"
  },
  {
    "id": "inferno-horned-demon",
    "faction": "inferno",
    "tier": 4,
    "upgraded": true,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Horned Demon",
      "pl": "Horned Demon"
    },
    "stats": {
      "attack": 10,
      "defense": 10,
      "minDamage": 7,
      "maxDamage": 9,
      "health": 40,
      "speed": 6,
      "growth": 4,
      "aiValue": 480,
      "cost": 270
    },
    "abilities": [],
    "notes": [],
    "spriteKey": "inferno-horned-demon"
  },
  {
    "id": "inferno-pit-fiend",
    "faction": "inferno",
    "tier": 5,
    "upgraded": false,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Pit Fiend",
      "pl": "Pit Fiend"
    },
    "stats": {
      "attack": 13,
      "defense": 13,
      "minDamage": 13,
      "maxDamage": 17,
      "health": 45,
      "speed": 6,
      "growth": 3,
      "aiValue": 765,
      "cost": 500
    },
    "abilities": [],
    "notes": [],
    "spriteKey": "inferno-pit-fiend"
  },
  {
    "id": "inferno-pit-lord",
    "faction": "inferno",
    "tier": 5,
    "upgraded": true,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Pit Lord",
      "pl": "Pit Lord"
    },
    "stats": {
      "attack": 13,
      "defense": 13,
      "minDamage": 13,
      "maxDamage": 17,
      "health": 45,
      "speed": 7,
      "growth": 3,
      "aiValue": 1224,
      "cost": 700
    },
    "abilities": [],
    "notes": [
      "Summon demons"
    ],
    "spriteKey": "inferno-pit-lord"
  },
  {
    "id": "inferno-efreeti",
    "faction": "inferno",
    "tier": 6,
    "upgraded": false,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Efreeti",
      "pl": "Efreeti"
    },
    "stats": {
      "attack": 16,
      "defense": 12,
      "minDamage": 16,
      "maxDamage": 24,
      "health": 90,
      "speed": 9,
      "growth": 2,
      "aiValue": 1670,
      "cost": 900
    },
    "abilities": [
      "flying"
    ],
    "notes": [
      "Flying",
      "Fire immunity",
      "Hates Genies"
    ],
    "spriteKey": "inferno-efreeti"
  },
  {
    "id": "inferno-efreet-sultan",
    "faction": "inferno",
    "tier": 6,
    "upgraded": true,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Efreet Sultan",
      "pl": "Efreet Sultan"
    },
    "stats": {
      "attack": 16,
      "defense": 14,
      "minDamage": 16,
      "maxDamage": 24,
      "health": 90,
      "speed": 13,
      "growth": 2,
      "aiValue": 2343,
      "cost": 1100
    },
    "abilities": [
      "flying"
    ],
    "notes": [
      "Flying",
      "Natural Fire Shield",
      "Fire immunity",
      "Hates Genies"
    ],
    "spriteKey": "inferno-efreet-sultan"
  },
  {
    "id": "inferno-devil",
    "faction": "inferno",
    "tier": 7,
    "upgraded": false,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Devil",
      "pl": "Devil"
    },
    "stats": {
      "attack": 19,
      "defense": 21,
      "minDamage": 30,
      "maxDamage": 40,
      "health": 160,
      "speed": 11,
      "growth": 1,
      "aiValue": 5101,
      "cost": 2700
    },
    "abilities": [
      "noRetaliation"
    ],
    "notes": [
      "Teleporting",
      "No enemy retaliation",
      "Luck -1",
      "Hates Angels"
    ],
    "spriteKey": "inferno-devil"
  },
  {
    "id": "inferno-arch-devil",
    "faction": "inferno",
    "tier": 7,
    "upgraded": true,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Arch Devil",
      "pl": "Arch Devil"
    },
    "stats": {
      "attack": 26,
      "defense": 28,
      "minDamage": 30,
      "maxDamage": 40,
      "health": 200,
      "speed": 17,
      "growth": 1,
      "aiValue": 7115,
      "cost": 4500
    },
    "abilities": [
      "noRetaliation"
    ],
    "notes": [
      "Teleporting",
      "No enemy retaliation",
      "Luck -2 1",
      "Hates Angels"
    ],
    "spriteKey": "inferno-arch-devil"
  },
  {
    "id": "necropolis-skeleton",
    "faction": "necropolis",
    "tier": 1,
    "upgraded": false,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Skeleton",
      "pl": "Skeleton"
    },
    "stats": {
      "attack": 5,
      "defense": 4,
      "minDamage": 1,
      "maxDamage": 3,
      "health": 6,
      "speed": 4,
      "growth": 12,
      "aiValue": 60,
      "cost": 60
    },
    "abilities": [],
    "notes": [
      "Undead"
    ],
    "spriteKey": "necropolis-skeleton"
  },
  {
    "id": "necropolis-skeleton-warrior",
    "faction": "necropolis",
    "tier": 1,
    "upgraded": true,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Skeleton Warrior",
      "pl": "Skeleton Warrior"
    },
    "stats": {
      "attack": 6,
      "defense": 6,
      "minDamage": 1,
      "maxDamage": 3,
      "health": 6,
      "speed": 5,
      "growth": 12,
      "aiValue": 85,
      "cost": 70
    },
    "abilities": [],
    "notes": [
      "Undead"
    ],
    "spriteKey": "necropolis-skeleton-warrior"
  },
  {
    "id": "necropolis-walking-dead",
    "faction": "necropolis",
    "tier": 2,
    "upgraded": false,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Walking Dead",
      "pl": "Walking Dead"
    },
    "stats": {
      "attack": 5,
      "defense": 5,
      "minDamage": 2,
      "maxDamage": 3,
      "health": 15,
      "speed": 3,
      "growth": 8,
      "aiValue": 98,
      "cost": 100
    },
    "abilities": [],
    "notes": [
      "Undead"
    ],
    "spriteKey": "necropolis-walking-dead"
  },
  {
    "id": "necropolis-zombie",
    "faction": "necropolis",
    "tier": 2,
    "upgraded": true,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Zombie",
      "pl": "Zombie"
    },
    "stats": {
      "attack": 5,
      "defense": 5,
      "minDamage": 2,
      "maxDamage": 3,
      "health": 20,
      "speed": 4,
      "growth": 8,
      "aiValue": 128,
      "cost": 125
    },
    "abilities": [],
    "notes": [
      "Undead",
      "Disease"
    ],
    "spriteKey": "necropolis-zombie"
  },
  {
    "id": "necropolis-wight",
    "faction": "necropolis",
    "tier": 3,
    "upgraded": false,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Wight",
      "pl": "Wight"
    },
    "stats": {
      "attack": 7,
      "defense": 7,
      "minDamage": 3,
      "maxDamage": 5,
      "health": 18,
      "speed": 5,
      "growth": 7,
      "aiValue": 252,
      "cost": 200
    },
    "abilities": [
      "flying"
    ],
    "notes": [
      "Undead",
      "Flying",
      "Regeneration"
    ],
    "spriteKey": "necropolis-wight"
  },
  {
    "id": "necropolis-wraith",
    "faction": "necropolis",
    "tier": 3,
    "upgraded": true,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Wraith",
      "pl": "Wraith"
    },
    "stats": {
      "attack": 7,
      "defense": 7,
      "minDamage": 3,
      "maxDamage": 5,
      "health": 18,
      "speed": 7,
      "growth": 7,
      "aiValue": 315,
      "cost": 230
    },
    "abilities": [
      "flying"
    ],
    "notes": [
      "Undead",
      "Flying",
      "Regeneration",
      "Mana drain"
    ],
    "spriteKey": "necropolis-wraith"
  },
  {
    "id": "necropolis-vampire",
    "faction": "necropolis",
    "tier": 4,
    "upgraded": false,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Vampire",
      "pl": "Vampire"
    },
    "stats": {
      "attack": 10,
      "defense": 9,
      "minDamage": 5,
      "maxDamage": 8,
      "health": 30,
      "speed": 6,
      "growth": 4,
      "aiValue": 555,
      "cost": 360
    },
    "abilities": [
      "noRetaliation",
      "flying"
    ],
    "notes": [
      "Undead",
      "Flying",
      "No enemy retaliation"
    ],
    "spriteKey": "necropolis-vampire"
  },
  {
    "id": "necropolis-vampire-lord",
    "faction": "necropolis",
    "tier": 4,
    "upgraded": true,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Vampire Lord",
      "pl": "Vampire Lord"
    },
    "stats": {
      "attack": 10,
      "defense": 10,
      "minDamage": 5,
      "maxDamage": 8,
      "health": 40,
      "speed": 9,
      "growth": 4,
      "aiValue": 783,
      "cost": 500
    },
    "abilities": [
      "noRetaliation",
      "flying"
    ],
    "notes": [
      "Undead",
      "Flying",
      "No enemy retaliation",
      "Life drain"
    ],
    "spriteKey": "necropolis-vampire-lord"
  },
  {
    "id": "necropolis-lich",
    "faction": "necropolis",
    "tier": 5,
    "upgraded": false,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Lich",
      "pl": "Lich"
    },
    "stats": {
      "attack": 13,
      "defense": 10,
      "minDamage": 11,
      "maxDamage": 13,
      "health": 30,
      "speed": 6,
      "growth": 3,
      "aiValue": 848,
      "cost": 550
    },
    "abilities": [
      "ranged"
    ],
    "notes": [
      "Ranged (12 shots)",
      "Undead",
      "Death cloud"
    ],
    "shots": 12,
    "spriteKey": "necropolis-lich"
  },
  {
    "id": "necropolis-power-lich",
    "faction": "necropolis",
    "tier": 5,
    "upgraded": true,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Power Lich",
      "pl": "Power Lich"
    },
    "stats": {
      "attack": 13,
      "defense": 10,
      "minDamage": 11,
      "maxDamage": 15,
      "health": 40,
      "speed": 7,
      "growth": 3,
      "aiValue": 1079,
      "cost": 600
    },
    "abilities": [
      "ranged"
    ],
    "notes": [
      "Ranged (24 shots)",
      "Undead",
      "Death cloud"
    ],
    "shots": 24,
    "spriteKey": "necropolis-power-lich"
  },
  {
    "id": "necropolis-black-knight",
    "faction": "necropolis",
    "tier": 6,
    "upgraded": false,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Black Knight",
      "pl": "Black Knight"
    },
    "stats": {
      "attack": 16,
      "defense": 16,
      "minDamage": 15,
      "maxDamage": 30,
      "health": 120,
      "speed": 7,
      "growth": 2,
      "aiValue": 2087,
      "cost": 1200
    },
    "abilities": [],
    "notes": [
      "Undead",
      "Curse"
    ],
    "spriteKey": "necropolis-black-knight"
  },
  {
    "id": "necropolis-dread-knight",
    "faction": "necropolis",
    "tier": 6,
    "upgraded": true,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Dread Knight",
      "pl": "Dread Knight"
    },
    "stats": {
      "attack": 18,
      "defense": 18,
      "minDamage": 15,
      "maxDamage": 30,
      "health": 120,
      "speed": 9,
      "growth": 2,
      "aiValue": 2382,
      "cost": 1500
    },
    "abilities": [],
    "notes": [
      "Undead",
      "Curse",
      "Death blow"
    ],
    "spriteKey": "necropolis-dread-knight"
  },
  {
    "id": "necropolis-bone-dragon",
    "faction": "necropolis",
    "tier": 7,
    "upgraded": false,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Bone Dragon",
      "pl": "Bone Dragon"
    },
    "stats": {
      "attack": 17,
      "defense": 15,
      "minDamage": 25,
      "maxDamage": 50,
      "health": 150,
      "speed": 9,
      "growth": 1,
      "aiValue": 3388,
      "cost": 1800
    },
    "abilities": [
      "flying"
    ],
    "notes": [
      "Dragon",
      "Undead",
      "Flying",
      "Morale -1"
    ],
    "spriteKey": "necropolis-bone-dragon"
  },
  {
    "id": "necropolis-ghost-dragon",
    "faction": "necropolis",
    "tier": 7,
    "upgraded": true,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Ghost Dragon",
      "pl": "Ghost Dragon"
    },
    "stats": {
      "attack": 19,
      "defense": 17,
      "minDamage": 25,
      "maxDamage": 50,
      "health": 200,
      "speed": 14,
      "growth": 1,
      "aiValue": 4696,
      "cost": 3000
    },
    "abilities": [
      "flying"
    ],
    "notes": [
      "Dragon",
      "Undead",
      "Flying",
      "Morale -1",
      "Aging"
    ],
    "spriteKey": "necropolis-ghost-dragon"
  },
  {
    "id": "dungeon-troglodyte",
    "faction": "dungeon",
    "tier": 1,
    "upgraded": false,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Troglodyte",
      "pl": "Troglodyte"
    },
    "stats": {
      "attack": 4,
      "defense": 3,
      "minDamage": 1,
      "maxDamage": 3,
      "health": 5,
      "speed": 4,
      "growth": 14,
      "aiValue": 59,
      "cost": 50
    },
    "abilities": [],
    "notes": [
      "Immune to Blinding and Stone gaze"
    ],
    "spriteKey": "dungeon-troglodyte"
  },
  {
    "id": "dungeon-infernal-troglodyte",
    "faction": "dungeon",
    "tier": 1,
    "upgraded": true,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Infernal Troglodyte",
      "pl": "Infernal Troglodyte"
    },
    "stats": {
      "attack": 5,
      "defense": 4,
      "minDamage": 1,
      "maxDamage": 3,
      "health": 6,
      "speed": 5,
      "growth": 14,
      "aiValue": 84,
      "cost": 65
    },
    "abilities": [],
    "notes": [
      "Immune to Blinding and Stone gaze"
    ],
    "spriteKey": "dungeon-infernal-troglodyte"
  },
  {
    "id": "dungeon-harpy",
    "faction": "dungeon",
    "tier": 2,
    "upgraded": false,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Harpy",
      "pl": "Harpy"
    },
    "stats": {
      "attack": 6,
      "defense": 5,
      "minDamage": 1,
      "maxDamage": 4,
      "health": 14,
      "speed": 6,
      "growth": 8,
      "aiValue": 154,
      "cost": 130
    },
    "abilities": [
      "flying"
    ],
    "notes": [
      "Flying",
      "Strike and return"
    ],
    "spriteKey": "dungeon-harpy"
  },
  {
    "id": "dungeon-harpy-hag",
    "faction": "dungeon",
    "tier": 2,
    "upgraded": true,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Harpy Hag",
      "pl": "Harpy Hag"
    },
    "stats": {
      "attack": 6,
      "defense": 6,
      "minDamage": 1,
      "maxDamage": 4,
      "health": 14,
      "speed": 9,
      "growth": 8,
      "aiValue": 238,
      "cost": 170
    },
    "abilities": [
      "noRetaliation",
      "flying"
    ],
    "notes": [
      "Flying",
      "Strike and return",
      "No enemy retaliation"
    ],
    "spriteKey": "dungeon-harpy-hag"
  },
  {
    "id": "dungeon-beholder",
    "faction": "dungeon",
    "tier": 3,
    "upgraded": false,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Beholder",
      "pl": "Beholder"
    },
    "stats": {
      "attack": 9,
      "defense": 7,
      "minDamage": 3,
      "maxDamage": 5,
      "health": 22,
      "speed": 5,
      "growth": 7,
      "aiValue": 336,
      "cost": 250
    },
    "abilities": [
      "ranged",
      "noMeleePenalty"
    ],
    "notes": [
      "Ranged (12 shots)",
      "No melee penalty"
    ],
    "shots": 12,
    "spriteKey": "dungeon-beholder"
  },
  {
    "id": "dungeon-evil-eye",
    "faction": "dungeon",
    "tier": 3,
    "upgraded": true,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Evil Eye",
      "pl": "Evil Eye"
    },
    "stats": {
      "attack": 10,
      "defense": 8,
      "minDamage": 3,
      "maxDamage": 5,
      "health": 22,
      "speed": 7,
      "growth": 7,
      "aiValue": 367,
      "cost": 280
    },
    "abilities": [
      "ranged",
      "noMeleePenalty"
    ],
    "notes": [
      "Ranged (24 shots)",
      "No melee penalty"
    ],
    "shots": 24,
    "spriteKey": "dungeon-evil-eye"
  },
  {
    "id": "dungeon-medusa",
    "faction": "dungeon",
    "tier": 4,
    "upgraded": false,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Medusa",
      "pl": "Medusa"
    },
    "stats": {
      "attack": 9,
      "defense": 9,
      "minDamage": 6,
      "maxDamage": 8,
      "health": 25,
      "speed": 5,
      "growth": 4,
      "aiValue": 517,
      "cost": 300
    },
    "abilities": [
      "ranged",
      "noMeleePenalty"
    ],
    "notes": [
      "Ranged (4 shots)",
      "No melee penalty",
      "Petrifying attack"
    ],
    "shots": 4,
    "spriteKey": "dungeon-medusa"
  },
  {
    "id": "dungeon-medusa-queen",
    "faction": "dungeon",
    "tier": 4,
    "upgraded": true,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Medusa Queen",
      "pl": "Medusa Queen"
    },
    "stats": {
      "attack": 10,
      "defense": 10,
      "minDamage": 6,
      "maxDamage": 8,
      "health": 30,
      "speed": 6,
      "growth": 4,
      "aiValue": 577,
      "cost": 330
    },
    "abilities": [
      "ranged",
      "noMeleePenalty"
    ],
    "notes": [
      "Ranged (8 shots)",
      "No melee penalty",
      "Petrifying attack"
    ],
    "shots": 8,
    "spriteKey": "dungeon-medusa-queen"
  },
  {
    "id": "dungeon-minotaur",
    "faction": "dungeon",
    "tier": 5,
    "upgraded": false,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Minotaur",
      "pl": "Minotaur"
    },
    "stats": {
      "attack": 14,
      "defense": 12,
      "minDamage": 12,
      "maxDamage": 20,
      "health": 50,
      "speed": 6,
      "growth": 3,
      "aiValue": 835,
      "cost": 500
    },
    "abilities": [],
    "notes": [
      "Positive Morale"
    ],
    "spriteKey": "dungeon-minotaur"
  },
  {
    "id": "dungeon-minotaur-king",
    "faction": "dungeon",
    "tier": 5,
    "upgraded": true,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Minotaur King",
      "pl": "Minotaur King"
    },
    "stats": {
      "attack": 15,
      "defense": 15,
      "minDamage": 12,
      "maxDamage": 20,
      "health": 50,
      "speed": 8,
      "growth": 3,
      "aiValue": 1068,
      "cost": 575
    },
    "abilities": [],
    "notes": [
      "Positive Morale"
    ],
    "spriteKey": "dungeon-minotaur-king"
  },
  {
    "id": "dungeon-manticore",
    "faction": "dungeon",
    "tier": 6,
    "upgraded": false,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Manticore",
      "pl": "Manticore"
    },
    "stats": {
      "attack": 15,
      "defense": 13,
      "minDamage": 14,
      "maxDamage": 20,
      "health": 80,
      "speed": 7,
      "growth": 2,
      "aiValue": 1547,
      "cost": 850
    },
    "abilities": [
      "flying"
    ],
    "notes": [
      "Flying"
    ],
    "spriteKey": "dungeon-manticore"
  },
  {
    "id": "dungeon-scorpicore",
    "faction": "dungeon",
    "tier": 6,
    "upgraded": true,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Scorpicore",
      "pl": "Scorpicore"
    },
    "stats": {
      "attack": 16,
      "defense": 14,
      "minDamage": 14,
      "maxDamage": 20,
      "health": 80,
      "speed": 11,
      "growth": 2,
      "aiValue": 1589,
      "cost": 1050
    },
    "abilities": [
      "flying"
    ],
    "notes": [
      "Flying",
      "Paralyzing venom"
    ],
    "spriteKey": "dungeon-scorpicore"
  },
  {
    "id": "dungeon-red-dragon",
    "faction": "dungeon",
    "tier": 7,
    "upgraded": false,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Red Dragon",
      "pl": "Red Dragon"
    },
    "stats": {
      "attack": 19,
      "defense": 19,
      "minDamage": 40,
      "maxDamage": 50,
      "health": 180,
      "speed": 11,
      "growth": 1,
      "aiValue": 4702,
      "cost": 2500
    },
    "abilities": [
      "flying"
    ],
    "notes": [
      "Dragon",
      "Flying",
      "Breath attack",
      "1-3 lvl spells immunity"
    ],
    "spriteKey": "dungeon-red-dragon"
  },
  {
    "id": "dungeon-black-dragon",
    "faction": "dungeon",
    "tier": 7,
    "upgraded": true,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Black Dragon",
      "pl": "Black Dragon"
    },
    "stats": {
      "attack": 25,
      "defense": 25,
      "minDamage": 40,
      "maxDamage": 50,
      "health": 300,
      "speed": 15,
      "growth": 1,
      "aiValue": 8721,
      "cost": 4000
    },
    "abilities": [
      "flying"
    ],
    "notes": [
      "Dragon",
      "Flying",
      "Breath attack",
      "Magic immunity",
      "Hates Titans"
    ],
    "spriteKey": "dungeon-black-dragon"
  },
  {
    "id": "stronghold-goblin",
    "faction": "stronghold",
    "tier": 1,
    "upgraded": false,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Goblin",
      "pl": "Goblin"
    },
    "stats": {
      "attack": 4,
      "defense": 2,
      "minDamage": 1,
      "maxDamage": 2,
      "health": 5,
      "speed": 5,
      "growth": 15,
      "aiValue": 60,
      "cost": 40
    },
    "abilities": [],
    "notes": [],
    "spriteKey": "stronghold-goblin"
  },
  {
    "id": "stronghold-hobgoblin",
    "faction": "stronghold",
    "tier": 1,
    "upgraded": true,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Hobgoblin",
      "pl": "Hobgoblin"
    },
    "stats": {
      "attack": 5,
      "defense": 3,
      "minDamage": 1,
      "maxDamage": 2,
      "health": 5,
      "speed": 7,
      "growth": 15,
      "aiValue": 78,
      "cost": 50
    },
    "abilities": [],
    "notes": [],
    "spriteKey": "stronghold-hobgoblin"
  },
  {
    "id": "stronghold-wolf-rider",
    "faction": "stronghold",
    "tier": 2,
    "upgraded": false,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Wolf Rider",
      "pl": "Wolf Rider"
    },
    "stats": {
      "attack": 7,
      "defense": 5,
      "minDamage": 2,
      "maxDamage": 4,
      "health": 10,
      "speed": 6,
      "growth": 9,
      "aiValue": 130,
      "cost": 100
    },
    "abilities": [],
    "notes": [],
    "spriteKey": "stronghold-wolf-rider"
  },
  {
    "id": "stronghold-wolf-raider",
    "faction": "stronghold",
    "tier": 2,
    "upgraded": true,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Wolf Raider",
      "pl": "Wolf Raider"
    },
    "stats": {
      "attack": 8,
      "defense": 5,
      "minDamage": 3,
      "maxDamage": 4,
      "health": 10,
      "speed": 8,
      "growth": 9,
      "aiValue": 203,
      "cost": 140
    },
    "abilities": [
      "doubleAttack"
    ],
    "notes": [
      "Double attack"
    ],
    "spriteKey": "stronghold-wolf-raider"
  },
  {
    "id": "stronghold-orc",
    "faction": "stronghold",
    "tier": 3,
    "upgraded": false,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Orc",
      "pl": "Orc"
    },
    "stats": {
      "attack": 8,
      "defense": 4,
      "minDamage": 2,
      "maxDamage": 5,
      "health": 15,
      "speed": 4,
      "growth": 7,
      "aiValue": 192,
      "cost": 150
    },
    "abilities": [
      "ranged"
    ],
    "notes": [
      "Ranged (12 shots)"
    ],
    "shots": 12,
    "spriteKey": "stronghold-orc"
  },
  {
    "id": "stronghold-orc-chieftain",
    "faction": "stronghold",
    "tier": 3,
    "upgraded": true,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Orc Chieftain",
      "pl": "Orc Chieftain"
    },
    "stats": {
      "attack": 8,
      "defense": 4,
      "minDamage": 2,
      "maxDamage": 5,
      "health": 20,
      "speed": 5,
      "growth": 7,
      "aiValue": 240,
      "cost": 165
    },
    "abilities": [
      "ranged"
    ],
    "notes": [
      "Ranged (24 shots)"
    ],
    "shots": 24,
    "spriteKey": "stronghold-orc-chieftain"
  },
  {
    "id": "stronghold-ogre",
    "faction": "stronghold",
    "tier": 4,
    "upgraded": false,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Ogre",
      "pl": "Ogre"
    },
    "stats": {
      "attack": 13,
      "defense": 7,
      "minDamage": 6,
      "maxDamage": 12,
      "health": 40,
      "speed": 4,
      "growth": 4,
      "aiValue": 416,
      "cost": 300
    },
    "abilities": [],
    "notes": [],
    "spriteKey": "stronghold-ogre"
  },
  {
    "id": "stronghold-ogre-mage",
    "faction": "stronghold",
    "tier": 4,
    "upgraded": true,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Ogre Mage",
      "pl": "Ogre Mage"
    },
    "stats": {
      "attack": 13,
      "defense": 7,
      "minDamage": 6,
      "maxDamage": 12,
      "health": 60,
      "speed": 5,
      "growth": 4,
      "aiValue": 672,
      "cost": 400
    },
    "abilities": [],
    "notes": [
      "Spellcaster (Bloodlust)"
    ],
    "spriteKey": "stronghold-ogre-mage"
  },
  {
    "id": "stronghold-roc",
    "faction": "stronghold",
    "tier": 5,
    "upgraded": false,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Roc",
      "pl": "Roc"
    },
    "stats": {
      "attack": 13,
      "defense": 11,
      "minDamage": 11,
      "maxDamage": 15,
      "health": 60,
      "speed": 7,
      "growth": 3,
      "aiValue": 1027,
      "cost": 600
    },
    "abilities": [
      "flying"
    ],
    "notes": [
      "Flying"
    ],
    "spriteKey": "stronghold-roc"
  },
  {
    "id": "stronghold-thunderbird",
    "faction": "stronghold",
    "tier": 5,
    "upgraded": true,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Thunderbird",
      "pl": "Thunderbird"
    },
    "stats": {
      "attack": 13,
      "defense": 11,
      "minDamage": 11,
      "maxDamage": 15,
      "health": 60,
      "speed": 11,
      "growth": 3,
      "aiValue": 1106,
      "cost": 700
    },
    "abilities": [
      "flying"
    ],
    "notes": [
      "Flying",
      "Lightning strike"
    ],
    "spriteKey": "stronghold-thunderbird"
  },
  {
    "id": "stronghold-cyclops",
    "faction": "stronghold",
    "tier": 6,
    "upgraded": false,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Cyclops",
      "pl": "Cyclops"
    },
    "stats": {
      "attack": 15,
      "defense": 12,
      "minDamage": 16,
      "maxDamage": 20,
      "health": 70,
      "speed": 6,
      "growth": 2,
      "aiValue": 1266,
      "cost": 750
    },
    "abilities": [
      "ranged"
    ],
    "notes": [
      "Ranged (16 shots)",
      "Can attack siege walls"
    ],
    "shots": 16,
    "spriteKey": "stronghold-cyclops"
  },
  {
    "id": "stronghold-cyclops-king",
    "faction": "stronghold",
    "tier": 6,
    "upgraded": true,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Cyclops King",
      "pl": "Cyclops King"
    },
    "stats": {
      "attack": 17,
      "defense": 13,
      "minDamage": 16,
      "maxDamage": 20,
      "health": 70,
      "speed": 8,
      "growth": 2,
      "aiValue": 1443,
      "cost": 1100
    },
    "abilities": [
      "ranged"
    ],
    "notes": [
      "Ranged (24 shots)",
      "Can attack siege walls"
    ],
    "shots": 24,
    "spriteKey": "stronghold-cyclops-king"
  },
  {
    "id": "stronghold-behemoth",
    "faction": "stronghold",
    "tier": 7,
    "upgraded": false,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Behemoth",
      "pl": "Behemoth"
    },
    "stats": {
      "attack": 17,
      "defense": 17,
      "minDamage": 30,
      "maxDamage": 50,
      "health": 160,
      "speed": 6,
      "growth": 1,
      "aiValue": 3162,
      "cost": 1500
    },
    "abilities": [],
    "notes": [
      "Ignores 40% of enemy defense value"
    ],
    "spriteKey": "stronghold-behemoth"
  },
  {
    "id": "stronghold-ancient-behemoth",
    "faction": "stronghold",
    "tier": 7,
    "upgraded": true,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Ancient Behemoth",
      "pl": "Ancient Behemoth"
    },
    "stats": {
      "attack": 19,
      "defense": 19,
      "minDamage": 30,
      "maxDamage": 50,
      "health": 300,
      "speed": 9,
      "growth": 1,
      "aiValue": 6168,
      "cost": 3000
    },
    "abilities": [],
    "notes": [
      "Ignores 80% of enemy defense value"
    ],
    "spriteKey": "stronghold-ancient-behemoth"
  },
  {
    "id": "fortress-gnoll",
    "faction": "fortress",
    "tier": 1,
    "upgraded": false,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Gnoll",
      "pl": "Gnoll"
    },
    "stats": {
      "attack": 3,
      "defense": 5,
      "minDamage": 2,
      "maxDamage": 3,
      "health": 6,
      "speed": 4,
      "growth": 12,
      "aiValue": 56,
      "cost": 50
    },
    "abilities": [],
    "notes": [],
    "spriteKey": "fortress-gnoll"
  },
  {
    "id": "fortress-gnoll-marauder",
    "faction": "fortress",
    "tier": 1,
    "upgraded": true,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Gnoll Marauder",
      "pl": "Gnoll Marauder"
    },
    "stats": {
      "attack": 4,
      "defense": 6,
      "minDamage": 2,
      "maxDamage": 3,
      "health": 6,
      "speed": 5,
      "growth": 12,
      "aiValue": 90,
      "cost": 70
    },
    "abilities": [],
    "notes": [],
    "spriteKey": "fortress-gnoll-marauder"
  },
  {
    "id": "fortress-lizardman",
    "faction": "fortress",
    "tier": 2,
    "upgraded": false,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Lizardman",
      "pl": "Lizardman"
    },
    "stats": {
      "attack": 5,
      "defense": 6,
      "minDamage": 2,
      "maxDamage": 3,
      "health": 14,
      "speed": 4,
      "growth": 9,
      "aiValue": 126,
      "cost": 110
    },
    "abilities": [
      "ranged"
    ],
    "notes": [
      "Ranged (12 shots)"
    ],
    "shots": 12,
    "spriteKey": "fortress-lizardman"
  },
  {
    "id": "fortress-lizard-warrior",
    "faction": "fortress",
    "tier": 2,
    "upgraded": true,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Lizard Warrior",
      "pl": "Lizard Warrior"
    },
    "stats": {
      "attack": 6,
      "defense": 8,
      "minDamage": 2,
      "maxDamage": 5,
      "health": 15,
      "speed": 5,
      "growth": 9,
      "aiValue": 156,
      "cost": 140
    },
    "abilities": [
      "ranged"
    ],
    "notes": [
      "Ranged (24 shots)"
    ],
    "shots": 24,
    "spriteKey": "fortress-lizard-warrior"
  },
  {
    "id": "fortress-serpent-fly",
    "faction": "fortress",
    "tier": 3,
    "upgraded": false,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Serpent Fly",
      "pl": "Serpent Fly"
    },
    "stats": {
      "attack": 7,
      "defense": 9,
      "minDamage": 2,
      "maxDamage": 5,
      "health": 20,
      "speed": 9,
      "growth": 8,
      "aiValue": 268,
      "cost": 220
    },
    "abilities": [
      "flying"
    ],
    "notes": [
      "Flying",
      "Dispels beneficial spells"
    ],
    "spriteKey": "fortress-serpent-fly"
  },
  {
    "id": "fortress-dragon-fly",
    "faction": "fortress",
    "tier": 3,
    "upgraded": true,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Dragon Fly",
      "pl": "Dragon Fly"
    },
    "stats": {
      "attack": 8,
      "defense": 10,
      "minDamage": 2,
      "maxDamage": 5,
      "health": 20,
      "speed": 13,
      "growth": 8,
      "aiValue": 312,
      "cost": 240
    },
    "abilities": [
      "flying"
    ],
    "notes": [
      "Flying",
      "Dispels beneficial spells",
      "Weakness"
    ],
    "spriteKey": "fortress-dragon-fly"
  },
  {
    "id": "fortress-basilisk",
    "faction": "fortress",
    "tier": 4,
    "upgraded": false,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Basilisk",
      "pl": "Basilisk"
    },
    "stats": {
      "attack": 11,
      "defense": 11,
      "minDamage": 6,
      "maxDamage": 10,
      "health": 35,
      "speed": 5,
      "growth": 4,
      "aiValue": 552,
      "cost": 325
    },
    "abilities": [],
    "notes": [
      "Petrifying attack"
    ],
    "spriteKey": "fortress-basilisk"
  },
  {
    "id": "fortress-greater-basilisk",
    "faction": "fortress",
    "tier": 4,
    "upgraded": true,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Greater Basilisk",
      "pl": "Greater Basilisk"
    },
    "stats": {
      "attack": 12,
      "defense": 12,
      "minDamage": 6,
      "maxDamage": 10,
      "health": 40,
      "speed": 7,
      "growth": 4,
      "aiValue": 714,
      "cost": 400
    },
    "abilities": [],
    "notes": [
      "Petrifying attack"
    ],
    "spriteKey": "fortress-greater-basilisk"
  },
  {
    "id": "fortress-gorgon",
    "faction": "fortress",
    "tier": 5,
    "upgraded": false,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Gorgon",
      "pl": "Gorgon"
    },
    "stats": {
      "attack": 10,
      "defense": 14,
      "minDamage": 12,
      "maxDamage": 16,
      "health": 70,
      "speed": 5,
      "growth": 3,
      "aiValue": 890,
      "cost": 525
    },
    "abilities": [],
    "notes": [],
    "spriteKey": "fortress-gorgon"
  },
  {
    "id": "fortress-mighty-gorgon",
    "faction": "fortress",
    "tier": 5,
    "upgraded": true,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Mighty Gorgon",
      "pl": "Mighty Gorgon"
    },
    "stats": {
      "attack": 11,
      "defense": 16,
      "minDamage": 12,
      "maxDamage": 16,
      "health": 70,
      "speed": 6,
      "growth": 3,
      "aiValue": 1028,
      "cost": 600
    },
    "abilities": [],
    "notes": [
      "Death stare (10% chance per unit)"
    ],
    "spriteKey": "fortress-mighty-gorgon"
  },
  {
    "id": "fortress-wyvern",
    "faction": "fortress",
    "tier": 6,
    "upgraded": false,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Wyvern",
      "pl": "Wyvern"
    },
    "stats": {
      "attack": 14,
      "defense": 14,
      "minDamage": 14,
      "maxDamage": 18,
      "health": 70,
      "speed": 7,
      "growth": 2,
      "aiValue": 1350,
      "cost": 800
    },
    "abilities": [
      "flying"
    ],
    "notes": [
      "Flying"
    ],
    "spriteKey": "fortress-wyvern"
  },
  {
    "id": "fortress-wyvern-monarch",
    "faction": "fortress",
    "tier": 6,
    "upgraded": true,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Wyvern Monarch",
      "pl": "Wyvern Monarch"
    },
    "stats": {
      "attack": 14,
      "defense": 14,
      "minDamage": 18,
      "maxDamage": 22,
      "health": 70,
      "speed": 11,
      "growth": 2,
      "aiValue": 1518,
      "cost": 1100
    },
    "abilities": [
      "flying"
    ],
    "notes": [
      "Flying",
      "Poisonous"
    ],
    "spriteKey": "fortress-wyvern-monarch"
  },
  {
    "id": "fortress-hydra",
    "faction": "fortress",
    "tier": 7,
    "upgraded": false,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Hydra",
      "pl": "Hydra"
    },
    "stats": {
      "attack": 16,
      "defense": 18,
      "minDamage": 25,
      "maxDamage": 45,
      "health": 175,
      "speed": 5,
      "growth": 1,
      "aiValue": 4120,
      "cost": 2200
    },
    "abilities": [
      "noRetaliation"
    ],
    "notes": [
      "No enemy retaliation",
      "Attacks all adjacent enemies"
    ],
    "spriteKey": "fortress-hydra"
  },
  {
    "id": "fortress-chaos-hydra",
    "faction": "fortress",
    "tier": 7,
    "upgraded": true,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Chaos Hydra",
      "pl": "Chaos Hydra"
    },
    "stats": {
      "attack": 18,
      "defense": 20,
      "minDamage": 25,
      "maxDamage": 45,
      "health": 250,
      "speed": 7,
      "growth": 1,
      "aiValue": 5931,
      "cost": 3500
    },
    "abilities": [
      "noRetaliation"
    ],
    "notes": [
      "No enemy retaliation",
      "Attacks all adjacent enemies"
    ],
    "spriteKey": "fortress-chaos-hydra"
  },
  {
    "id": "conflux-pixie",
    "faction": "conflux",
    "tier": 1,
    "upgraded": false,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Pixie",
      "pl": "Pixie"
    },
    "stats": {
      "attack": 2,
      "defense": 2,
      "minDamage": 1,
      "maxDamage": 2,
      "health": 3,
      "speed": 7,
      "growth": 20,
      "aiValue": 55,
      "cost": 25
    },
    "abilities": [
      "flying"
    ],
    "notes": [
      "Flying"
    ],
    "spriteKey": "conflux-pixie"
  },
  {
    "id": "conflux-sprite",
    "faction": "conflux",
    "tier": 1,
    "upgraded": true,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Sprite",
      "pl": "Sprite"
    },
    "stats": {
      "attack": 2,
      "defense": 2,
      "minDamage": 1,
      "maxDamage": 3,
      "health": 3,
      "speed": 9,
      "growth": 20,
      "aiValue": 95,
      "cost": 30
    },
    "abilities": [
      "noRetaliation",
      "flying"
    ],
    "notes": [
      "Flying",
      "No enemy retaliation"
    ],
    "spriteKey": "conflux-sprite"
  },
  {
    "id": "conflux-air-elemental",
    "faction": "conflux",
    "tier": 2,
    "upgraded": false,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Air Elemental",
      "pl": "Air Elemental"
    },
    "stats": {
      "attack": 9,
      "defense": 9,
      "minDamage": 2,
      "maxDamage": 8,
      "health": 25,
      "speed": 7,
      "growth": 6,
      "aiValue": 356,
      "cost": 250
    },
    "abilities": [],
    "notes": [
      "Elemental",
      "Immune to Meteor Shower",
      "Vulnerable to Lightning Bolt",
      "Chain Lightning",
      "Titan's Lightning Bolt and Armageddon",
      "+100% to basic damage to Earth and Magma Elementals"
    ],
    "spriteKey": "conflux-air-elemental"
  },
  {
    "id": "conflux-storm-elemental",
    "faction": "conflux",
    "tier": 2,
    "upgraded": true,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Storm Elemental",
      "pl": "Storm Elemental"
    },
    "stats": {
      "attack": 9,
      "defense": 9,
      "minDamage": 2,
      "maxDamage": 8,
      "health": 25,
      "speed": 8,
      "growth": 6,
      "aiValue": 486,
      "cost": 275
    },
    "abilities": [
      "ranged"
    ],
    "notes": [
      "Ranged (24 shots)",
      "Elemental",
      "Immune to Meteor Shower",
      "Vulnerable to Lightning Bolt",
      "Chain Lightning",
      "Titan's Lightning Bolt and Armageddon",
      "+100% to basic damage to Earth and Magma Elementals",
      "Spellcaster (Protection from Air)"
    ],
    "shots": 24,
    "spriteKey": "conflux-storm-elemental"
  },
  {
    "id": "conflux-water-elemental",
    "faction": "conflux",
    "tier": 3,
    "upgraded": false,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Water Elemental",
      "pl": "Water Elemental"
    },
    "stats": {
      "attack": 8,
      "defense": 10,
      "minDamage": 3,
      "maxDamage": 7,
      "health": 30,
      "speed": 5,
      "growth": 6,
      "aiValue": 315,
      "cost": 300
    },
    "abilities": [],
    "notes": [
      "Elemental",
      "Immune to Ice Bolt and Frost Ring",
      "Vulnerable to Fireball",
      "Inferno and Armageddon",
      "+100% to basic damage to Fire and Energy Elementals"
    ],
    "spriteKey": "conflux-water-elemental"
  },
  {
    "id": "conflux-ice-elemental",
    "faction": "conflux",
    "tier": 3,
    "upgraded": true,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Ice Elemental",
      "pl": "Ice Elemental"
    },
    "stats": {
      "attack": 8,
      "defense": 10,
      "minDamage": 3,
      "maxDamage": 7,
      "health": 30,
      "speed": 6,
      "growth": 6,
      "aiValue": 380,
      "cost": 375
    },
    "abilities": [
      "ranged"
    ],
    "notes": [
      "Ranged (24 shots)",
      "Elemental",
      "Immune to Ice Bolt and Frost Ring",
      "Vulnerable to Fireball",
      "Inferno and Armageddon",
      "+100% to basic damage to Fire and Energy Elementals",
      "Spellcaster (Protection from Water)"
    ],
    "shots": 24,
    "spriteKey": "conflux-ice-elemental"
  },
  {
    "id": "conflux-fire-elemental",
    "faction": "conflux",
    "tier": 4,
    "upgraded": false,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Fire Elemental",
      "pl": "Fire Elemental"
    },
    "stats": {
      "attack": 10,
      "defense": 8,
      "minDamage": 4,
      "maxDamage": 6,
      "health": 35,
      "speed": 6,
      "growth": 5,
      "aiValue": 345,
      "cost": 350
    },
    "abilities": [],
    "notes": [
      "Elemental",
      "Fire immunity",
      "Vulnerable to Ice Bolt and Frost Ring",
      "+100% to basic damage to Water and Ice Elementals"
    ],
    "spriteKey": "conflux-fire-elemental"
  },
  {
    "id": "conflux-energy-elemental",
    "faction": "conflux",
    "tier": 4,
    "upgraded": true,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Energy Elemental",
      "pl": "Energy Elemental"
    },
    "stats": {
      "attack": 12,
      "defense": 8,
      "minDamage": 4,
      "maxDamage": 6,
      "health": 35,
      "speed": 8,
      "growth": 5,
      "aiValue": 470,
      "cost": 400
    },
    "abilities": [
      "flying"
    ],
    "notes": [
      "Elemental",
      "Flying",
      "Fire immunity",
      "Vulnerable to Ice Bolt and Frost Ring",
      "+100% to basic damage to Water and Ice Elementals",
      "Spellcaster (Protection from Fire)"
    ],
    "spriteKey": "conflux-energy-elemental"
  },
  {
    "id": "conflux-earth-elemental",
    "faction": "conflux",
    "tier": 5,
    "upgraded": false,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Earth Elemental",
      "pl": "Earth Elemental"
    },
    "stats": {
      "attack": 10,
      "defense": 10,
      "minDamage": 4,
      "maxDamage": 8,
      "health": 40,
      "speed": 4,
      "growth": 4,
      "aiValue": 330,
      "cost": 400
    },
    "abilities": [],
    "notes": [
      "Elemental",
      "Immune to Lightning Bolt",
      "Chain Lightning",
      "Titan's Lightning Bolt and Armageddon",
      "Vulnerable to Meteor Shower",
      "+100% to basic damage to Air and Storm Elementals"
    ],
    "spriteKey": "conflux-earth-elemental"
  },
  {
    "id": "conflux-magma-elemental",
    "faction": "conflux",
    "tier": 5,
    "upgraded": true,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Magma Elemental",
      "pl": "Magma Elemental"
    },
    "stats": {
      "attack": 11,
      "defense": 11,
      "minDamage": 6,
      "maxDamage": 10,
      "health": 40,
      "speed": 6,
      "growth": 4,
      "aiValue": 490,
      "cost": 500
    },
    "abilities": [],
    "notes": [
      "Elemental",
      "Immune to Lightning Bolt",
      "Chain Lightning",
      "Titan's Lightning Bolt and Armageddon",
      "Vulnerable to Meteor Shower",
      "+100% to basic damage to Air and Storm Elementals",
      "Spellcaster (Protection from Earth)"
    ],
    "spriteKey": "conflux-magma-elemental"
  },
  {
    "id": "conflux-psychic-elemental",
    "faction": "conflux",
    "tier": 6,
    "upgraded": false,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Psychic Elemental",
      "pl": "Psychic Elemental"
    },
    "stats": {
      "attack": 15,
      "defense": 13,
      "minDamage": 10,
      "maxDamage": 20,
      "health": 75,
      "speed": 7,
      "growth": 2,
      "aiValue": 1669,
      "cost": 950
    },
    "abilities": [
      "noRetaliation"
    ],
    "notes": [
      "Elemental",
      "No enemy retaliation",
      "Attacks all adjacent enemies",
      "-50% damage to creatures with Mind spells immunity"
    ],
    "spriteKey": "conflux-psychic-elemental"
  },
  {
    "id": "conflux-magic-elemental",
    "faction": "conflux",
    "tier": 6,
    "upgraded": true,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Magic Elemental",
      "pl": "Magic Elemental"
    },
    "stats": {
      "attack": 15,
      "defense": 13,
      "minDamage": 15,
      "maxDamage": 25,
      "health": 80,
      "speed": 9,
      "growth": 2,
      "aiValue": 2012,
      "cost": 1200
    },
    "abilities": [
      "noRetaliation"
    ],
    "notes": [
      "Elemental",
      "No enemy retaliation",
      "Attacks all adjacent enemies",
      "Magic immunity",
      "-50% damage to creatures with Magic immunity"
    ],
    "spriteKey": "conflux-magic-elemental"
  },
  {
    "id": "conflux-firebird",
    "faction": "conflux",
    "tier": 7,
    "upgraded": false,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Firebird",
      "pl": "Firebird"
    },
    "stats": {
      "attack": 18,
      "defense": 18,
      "minDamage": 30,
      "maxDamage": 40,
      "health": 150,
      "speed": 15,
      "growth": 1,
      "aiValue": 4336,
      "cost": 2000
    },
    "abilities": [
      "flying"
    ],
    "notes": [
      "Flying",
      "Breath attack",
      "50% Fire resistance Fire immunity"
    ],
    "spriteKey": "conflux-firebird"
  },
  {
    "id": "conflux-phoenix",
    "faction": "conflux",
    "tier": 7,
    "upgraded": true,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Phoenix",
      "pl": "Phoenix"
    },
    "stats": {
      "attack": 21,
      "defense": 18,
      "minDamage": 30,
      "maxDamage": 40,
      "health": 200,
      "speed": 21,
      "growth": 1,
      "aiValue": 6721,
      "cost": 3000
    },
    "abilities": [
      "flying"
    ],
    "notes": [
      "Flying",
      "Breath attack",
      "Fire immunity",
      "Rebirth"
    ],
    "spriteKey": "conflux-phoenix"
  },
  {
    "id": "cove-nymph",
    "faction": "cove",
    "tier": 1,
    "upgraded": false,
    "rulesets": [
      "hota"
    ],
    "name": {
      "en": "Nymph",
      "pl": "Nymph"
    },
    "stats": {
      "attack": 5,
      "defense": 2,
      "minDamage": 1,
      "maxDamage": 2,
      "health": 4,
      "speed": 6,
      "growth": 16,
      "aiValue": 57,
      "cost": 35
    },
    "abilities": [],
    "notes": [
      "Teleporting",
      "Immune to Ice Bolt and Frost Ring"
    ],
    "spriteKey": "cove-nymph"
  },
  {
    "id": "cove-oceanid",
    "faction": "cove",
    "tier": 1,
    "upgraded": true,
    "rulesets": [
      "hota"
    ],
    "name": {
      "en": "Oceanid",
      "pl": "Oceanid"
    },
    "stats": {
      "attack": 6,
      "defense": 2,
      "minDamage": 1,
      "maxDamage": 3,
      "health": 4,
      "speed": 8,
      "growth": 16,
      "aiValue": 75,
      "cost": 45
    },
    "abilities": [],
    "notes": [
      "Teleporting",
      "Immune to Ice Bolt and Frost Ring"
    ],
    "spriteKey": "cove-oceanid"
  },
  {
    "id": "cove-crew-mate",
    "faction": "cove",
    "tier": 2,
    "upgraded": false,
    "rulesets": [
      "hota"
    ],
    "name": {
      "en": "Crew Mate",
      "pl": "Crew Mate"
    },
    "stats": {
      "attack": 7,
      "defense": 4,
      "minDamage": 2,
      "maxDamage": 4,
      "health": 15,
      "speed": 5,
      "growth": 9,
      "aiValue": 155,
      "cost": 110
    },
    "abilities": [],
    "notes": [],
    "spriteKey": "cove-crew-mate"
  },
  {
    "id": "cove-seaman",
    "faction": "cove",
    "tier": 2,
    "upgraded": true,
    "rulesets": [
      "hota"
    ],
    "name": {
      "en": "Seaman",
      "pl": "Seaman"
    },
    "stats": {
      "attack": 8,
      "defense": 6,
      "minDamage": 3,
      "maxDamage": 4,
      "health": 15,
      "speed": 6,
      "growth": 9,
      "aiValue": 174,
      "cost": 140
    },
    "abilities": [],
    "notes": [],
    "spriteKey": "cove-seaman"
  },
  {
    "id": "cove-pirate",
    "faction": "cove",
    "tier": 3,
    "upgraded": false,
    "rulesets": [
      "hota"
    ],
    "name": {
      "en": "Pirate",
      "pl": "Pirate"
    },
    "stats": {
      "attack": 8,
      "defense": 6,
      "minDamage": 3,
      "maxDamage": 7,
      "health": 15,
      "speed": 6,
      "growth": 7,
      "aiValue": 312,
      "cost": 225
    },
    "abilities": [
      "ranged",
      "noMeleePenalty"
    ],
    "notes": [
      "Ranged (4 shots)",
      "No melee penalty"
    ],
    "shots": 4,
    "spriteKey": "cove-pirate"
  },
  {
    "id": "cove-corsair",
    "faction": "cove",
    "tier": 3,
    "upgraded": true,
    "rulesets": [
      "hota"
    ],
    "name": {
      "en": "Corsair",
      "pl": "Corsair"
    },
    "stats": {
      "attack": 10,
      "defense": 8,
      "minDamage": 3,
      "maxDamage": 7,
      "health": 15,
      "speed": 7,
      "growth": 7,
      "aiValue": 407,
      "cost": 275
    },
    "abilities": [
      "ranged",
      "noRetaliation",
      "noMeleePenalty"
    ],
    "notes": [
      "Ranged (4 shots)",
      "No melee penalty",
      "No enemy retaliation"
    ],
    "shots": 4,
    "spriteKey": "cove-corsair"
  },
  {
    "id": "cove-sea-dog",
    "faction": "cove",
    "tier": 3,
    "upgraded": true,
    "rulesets": [
      "hota"
    ],
    "name": {
      "en": "Sea Dog",
      "pl": "Sea Dog"
    },
    "stats": {
      "attack": 12,
      "defense": 11,
      "minDamage": 3,
      "maxDamage": 7,
      "health": 15,
      "speed": 8,
      "growth": 7,
      "aiValue": 602,
      "cost": 375
    },
    "abilities": [
      "ranged",
      "noRetaliation",
      "noMeleePenalty"
    ],
    "notes": [
      "Ranged (12 shots)",
      "No melee penalty",
      "No enemy retaliation",
      "Accurate shot"
    ],
    "shots": 12,
    "spriteKey": "cove-sea-dog"
  },
  {
    "id": "cove-stormbird",
    "faction": "cove",
    "tier": 4,
    "upgraded": false,
    "rulesets": [
      "hota"
    ],
    "name": {
      "en": "Stormbird",
      "pl": "Stormbird"
    },
    "stats": {
      "attack": 10,
      "defense": 8,
      "minDamage": 6,
      "maxDamage": 9,
      "health": 30,
      "speed": 9,
      "growth": 4,
      "aiValue": 502,
      "cost": 275
    },
    "abilities": [
      "flying"
    ],
    "notes": [
      "Flying"
    ],
    "spriteKey": "cove-stormbird"
  },
  {
    "id": "cove-ayssid",
    "faction": "cove",
    "tier": 4,
    "upgraded": true,
    "rulesets": [
      "hota"
    ],
    "name": {
      "en": "Ayssid",
      "pl": "Ayssid"
    },
    "stats": {
      "attack": 11,
      "defense": 8,
      "minDamage": 6,
      "maxDamage": 10,
      "health": 30,
      "speed": 11,
      "growth": 4,
      "aiValue": 645,
      "cost": 325
    },
    "abilities": [
      "flying"
    ],
    "notes": [
      "Flying",
      "Ferocity"
    ],
    "spriteKey": "cove-ayssid"
  },
  {
    "id": "cove-sea-witch",
    "faction": "cove",
    "tier": 5,
    "upgraded": false,
    "rulesets": [
      "hota"
    ],
    "name": {
      "en": "Sea Witch",
      "pl": "Sea Witch"
    },
    "stats": {
      "attack": 12,
      "defense": 7,
      "minDamage": 10,
      "maxDamage": 14,
      "health": 35,
      "speed": 6,
      "growth": 3,
      "aiValue": 790,
      "cost": 515
    },
    "abilities": [
      "ranged"
    ],
    "notes": [
      "Ranged (12 shots)",
      "Spellcaster (after shot",
      "Weakness / Disrupting Ray)"
    ],
    "shots": 12,
    "spriteKey": "cove-sea-witch"
  },
  {
    "id": "cove-sorceress",
    "faction": "cove",
    "tier": 5,
    "upgraded": true,
    "rulesets": [
      "hota"
    ],
    "name": {
      "en": "Sorceress",
      "pl": "Sorceress"
    },
    "stats": {
      "attack": 12,
      "defense": 9,
      "minDamage": 10,
      "maxDamage": 16,
      "health": 35,
      "speed": 7,
      "growth": 3,
      "aiValue": 852,
      "cost": 565
    },
    "abilities": [
      "ranged"
    ],
    "notes": [
      "Ranged (12 shots)",
      "Spellcaster (after shot",
      "Weakness / Disrupting Ray)"
    ],
    "shots": 12,
    "spriteKey": "cove-sorceress"
  },
  {
    "id": "cove-nix",
    "faction": "cove",
    "tier": 6,
    "upgraded": false,
    "rulesets": [
      "hota"
    ],
    "name": {
      "en": "Nix",
      "pl": "Nix"
    },
    "stats": {
      "attack": 13,
      "defense": 16,
      "minDamage": 18,
      "maxDamage": 22,
      "health": 80,
      "speed": 6,
      "growth": 2,
      "aiValue": 1415,
      "cost": 1000
    },
    "abilities": [],
    "notes": [
      "Ignores 30% of enemy attack value"
    ],
    "spriteKey": "cove-nix"
  },
  {
    "id": "cove-nix-warrior",
    "faction": "cove",
    "tier": 6,
    "upgraded": true,
    "rulesets": [
      "hota"
    ],
    "name": {
      "en": "Nix Warrior",
      "pl": "Nix Warrior"
    },
    "stats": {
      "attack": 14,
      "defense": 17,
      "minDamage": 18,
      "maxDamage": 22,
      "health": 90,
      "speed": 7,
      "growth": 2,
      "aiValue": 2116,
      "cost": 1300
    },
    "abilities": [],
    "notes": [
      "Ignores 60% of enemy attack value"
    ],
    "spriteKey": "cove-nix-warrior"
  },
  {
    "id": "cove-sea-serpent",
    "faction": "cove",
    "tier": 7,
    "upgraded": false,
    "rulesets": [
      "hota"
    ],
    "name": {
      "en": "Sea Serpent",
      "pl": "Sea Serpent"
    },
    "stats": {
      "attack": 22,
      "defense": 16,
      "minDamage": 30,
      "maxDamage": 55,
      "health": 180,
      "speed": 9,
      "growth": 1,
      "aiValue": 3953,
      "cost": 2200
    },
    "abilities": [],
    "notes": [
      "Poisonous"
    ],
    "spriteKey": "cove-sea-serpent"
  },
  {
    "id": "cove-haspid",
    "faction": "cove",
    "tier": 7,
    "upgraded": true,
    "rulesets": [
      "hota"
    ],
    "name": {
      "en": "Haspid",
      "pl": "Haspid"
    },
    "stats": {
      "attack": 29,
      "defense": 20,
      "minDamage": 30,
      "maxDamage": 55,
      "health": 300,
      "speed": 12,
      "growth": 1,
      "aiValue": 7220,
      "cost": 4000
    },
    "abilities": [],
    "notes": [
      "Poisonous",
      "Revenge"
    ],
    "spriteKey": "cove-haspid"
  },
  {
    "id": "factory-halfling-factory",
    "faction": "factory",
    "tier": 1,
    "upgraded": false,
    "rulesets": [
      "hota"
    ],
    "name": {
      "en": "Halfling (Factory)",
      "pl": "Halfling (Factory)"
    },
    "stats": {
      "attack": 4,
      "defense": 2,
      "minDamage": 1,
      "maxDamage": 3,
      "health": 4,
      "speed": 5,
      "growth": 15,
      "aiValue": 75,
      "cost": 40
    },
    "abilities": [
      "ranged"
    ],
    "notes": [
      "Ranged (24 shots)",
      "Positive Luck"
    ],
    "shots": 24,
    "spriteKey": "factory-halfling-factory"
  },
  {
    "id": "factory-halfling-grenadier",
    "faction": "factory",
    "tier": 1,
    "upgraded": true,
    "rulesets": [
      "hota"
    ],
    "name": {
      "en": "Halfling Grenadier",
      "pl": "Halfling Grenadier"
    },
    "stats": {
      "attack": 5,
      "defense": 2,
      "minDamage": 2,
      "maxDamage": 3,
      "health": 4,
      "speed": 6,
      "growth": 15,
      "aiValue": 95,
      "cost": 60
    },
    "abilities": [
      "ranged"
    ],
    "notes": [
      "Ranged (24 shots)",
      "Positive Luck",
      "Ranged attack ignores 20% of enemy's defense skill"
    ],
    "shots": 24,
    "spriteKey": "factory-halfling-grenadier"
  },
  {
    "id": "factory-mechanic",
    "faction": "factory",
    "tier": 2,
    "upgraded": false,
    "rulesets": [
      "hota"
    ],
    "name": {
      "en": "Mechanic",
      "pl": "Mechanic"
    },
    "stats": {
      "attack": 6,
      "defense": 5,
      "minDamage": 3,
      "maxDamage": 4,
      "health": 14,
      "speed": 6,
      "growth": 8,
      "aiValue": 186,
      "cost": 140
    },
    "abilities": [],
    "notes": [
      "Breath attack",
      "Repairing (10 HP per unit)"
    ],
    "spriteKey": "factory-mechanic"
  },
  {
    "id": "factory-engineer",
    "faction": "factory",
    "tier": 2,
    "upgraded": true,
    "rulesets": [
      "hota"
    ],
    "name": {
      "en": "Engineer",
      "pl": "Engineer"
    },
    "stats": {
      "attack": 7,
      "defense": 5,
      "minDamage": 3,
      "maxDamage": 5,
      "health": 16,
      "speed": 7,
      "growth": 8,
      "aiValue": 278,
      "cost": 170
    },
    "abilities": [],
    "notes": [
      "Breath attack",
      "Repairing (20 HP per unit)"
    ],
    "spriteKey": "factory-engineer"
  },
  {
    "id": "factory-armadillo",
    "faction": "factory",
    "tier": 3,
    "upgraded": false,
    "rulesets": [
      "hota"
    ],
    "name": {
      "en": "Armadillo",
      "pl": "Armadillo"
    },
    "stats": {
      "attack": 5,
      "defense": 10,
      "minDamage": 3,
      "maxDamage": 5,
      "health": 25,
      "speed": 4,
      "growth": 6,
      "aiValue": 198,
      "cost": 200
    },
    "abilities": [],
    "notes": [],
    "spriteKey": "factory-armadillo"
  },
  {
    "id": "factory-bellwether-armadillo",
    "faction": "factory",
    "tier": 3,
    "upgraded": true,
    "rulesets": [
      "hota"
    ],
    "name": {
      "en": "Bellwether Armadillo",
      "pl": "Bellwether Armadillo"
    },
    "stats": {
      "attack": 6,
      "defense": 11,
      "minDamage": 3,
      "maxDamage": 5,
      "health": 25,
      "speed": 6,
      "growth": 6,
      "aiValue": 256,
      "cost": 230
    },
    "abilities": [],
    "notes": [],
    "spriteKey": "factory-bellwether-armadillo"
  },
  {
    "id": "factory-automaton",
    "faction": "factory",
    "tier": 4,
    "upgraded": false,
    "rulesets": [
      "hota"
    ],
    "name": {
      "en": "Automaton",
      "pl": "Automaton"
    },
    "stats": {
      "attack": 12,
      "defense": 10,
      "minDamage": 7,
      "maxDamage": 7,
      "health": 30,
      "speed": 8,
      "growth": 5,
      "aiValue": 669,
      "cost": 350
    },
    "abilities": [],
    "notes": [
      "Mechanical",
      "Detonation"
    ],
    "spriteKey": "factory-automaton"
  },
  {
    "id": "factory-sentinel-automaton",
    "faction": "factory",
    "tier": 4,
    "upgraded": true,
    "rulesets": [
      "hota"
    ],
    "name": {
      "en": "Sentinel Automaton",
      "pl": "Sentinel Automaton"
    },
    "stats": {
      "attack": 12,
      "defense": 10,
      "minDamage": 9,
      "maxDamage": 9,
      "health": 30,
      "speed": 9,
      "growth": 5,
      "aiValue": 947,
      "cost": 450
    },
    "abilities": [
      "noRetaliation"
    ],
    "notes": [
      "Mechanical",
      "Detonation",
      "No enemy retaliation"
    ],
    "spriteKey": "factory-sentinel-automaton"
  },
  {
    "id": "factory-sandworm",
    "faction": "factory",
    "tier": 5,
    "upgraded": false,
    "rulesets": [
      "hota"
    ],
    "name": {
      "en": "Sandworm",
      "pl": "Sandworm"
    },
    "stats": {
      "attack": 13,
      "defense": 12,
      "minDamage": 12,
      "maxDamage": 16,
      "health": 50,
      "speed": 8,
      "growth": 3,
      "aiValue": 991,
      "cost": 575
    },
    "abilities": [],
    "notes": [
      "Burrowing",
      "Immune to Blinding and Stone gaze"
    ],
    "spriteKey": "factory-sandworm"
  },
  {
    "id": "factory-olgoi-khorkhoi",
    "faction": "factory",
    "tier": 5,
    "upgraded": true,
    "rulesets": [
      "hota"
    ],
    "name": {
      "en": "Olgoi-Khorkhoi",
      "pl": "Olgoi-Khorkhoi"
    },
    "stats": {
      "attack": 15,
      "defense": 12,
      "minDamage": 12,
      "maxDamage": 16,
      "health": 60,
      "speed": 10,
      "growth": 3,
      "aiValue": 1220,
      "cost": 650
    },
    "abilities": [],
    "notes": [
      "Burrowing",
      "Immune to Blinding and Stone gaze",
      "Devours corpses"
    ],
    "spriteKey": "factory-olgoi-khorkhoi"
  },
  {
    "id": "factory-gunslinger",
    "faction": "factory",
    "tier": 6,
    "upgraded": false,
    "rulesets": [
      "hota"
    ],
    "name": {
      "en": "Gunslinger",
      "pl": "Gunslinger"
    },
    "stats": {
      "attack": 17,
      "defense": 12,
      "minDamage": 14,
      "maxDamage": 24,
      "health": 45,
      "speed": 7,
      "growth": 2,
      "aiValue": 1351,
      "cost": 800
    },
    "abilities": [
      "ranged"
    ],
    "notes": [
      "Ranged (16 shots)",
      "Preemptive shot (once per round)"
    ],
    "shots": 16,
    "spriteKey": "factory-gunslinger"
  },
  {
    "id": "factory-bounty-hunter",
    "faction": "factory",
    "tier": 6,
    "upgraded": true,
    "rulesets": [
      "hota"
    ],
    "name": {
      "en": "Bounty Hunter",
      "pl": "Bounty Hunter"
    },
    "stats": {
      "attack": 18,
      "defense": 14,
      "minDamage": 14,
      "maxDamage": 24,
      "health": 45,
      "speed": 8,
      "growth": 2,
      "aiValue": 1454,
      "cost": 1100
    },
    "abilities": [
      "ranged"
    ],
    "notes": [
      "Ranged (24 shots)",
      "Preemptive shot (unlimited)"
    ],
    "shots": 24,
    "spriteKey": "factory-bounty-hunter"
  },
  {
    "id": "factory-couatl",
    "faction": "factory",
    "tier": 7,
    "upgraded": false,
    "rulesets": [
      "hota"
    ],
    "name": {
      "en": "Couatl",
      "pl": "Couatl"
    },
    "stats": {
      "attack": 17,
      "defense": 17,
      "minDamage": 25,
      "maxDamage": 45,
      "health": 160,
      "speed": 11,
      "growth": 1,
      "aiValue": 3574,
      "cost": 2000
    },
    "abilities": [
      "flying"
    ],
    "notes": [
      "Flying",
      "Meditation (skiping a turn)"
    ],
    "spriteKey": "factory-couatl"
  },
  {
    "id": "factory-crimson-couatl",
    "faction": "factory",
    "tier": 7,
    "upgraded": true,
    "rulesets": [
      "hota"
    ],
    "name": {
      "en": "Crimson Couatl",
      "pl": "Crimson Couatl"
    },
    "stats": {
      "attack": 21,
      "defense": 21,
      "minDamage": 25,
      "maxDamage": 45,
      "health": 200,
      "speed": 15,
      "growth": 1,
      "aiValue": 5341,
      "cost": 3500
    },
    "abilities": [
      "flying"
    ],
    "notes": [
      "Flying",
      "Meditation (without skipping a turn)"
    ],
    "spriteKey": "factory-crimson-couatl"
  },
  {
    "id": "factory-dreadnought",
    "faction": "factory",
    "tier": 7,
    "upgraded": false,
    "rulesets": [
      "hota"
    ],
    "name": {
      "en": "Dreadnought",
      "pl": "Dreadnought"
    },
    "stats": {
      "attack": 18,
      "defense": 20,
      "minDamage": 40,
      "maxDamage": 50,
      "health": 200,
      "speed": 6,
      "growth": 1,
      "aiValue": 3879,
      "cost": 2200
    },
    "abilities": [],
    "notes": [
      "Mechanical",
      "Heat stroke"
    ],
    "spriteKey": "factory-dreadnought"
  },
  {
    "id": "factory-juggernaut",
    "faction": "factory",
    "tier": 7,
    "upgraded": true,
    "rulesets": [
      "hota"
    ],
    "name": {
      "en": "Juggernaut",
      "pl": "Juggernaut"
    },
    "stats": {
      "attack": 23,
      "defense": 23,
      "minDamage": 40,
      "maxDamage": 50,
      "health": 300,
      "speed": 7,
      "growth": 1,
      "aiValue": 6433,
      "cost": 3500
    },
    "abilities": [],
    "notes": [
      "Mechanical",
      "Heat stroke"
    ],
    "spriteKey": "factory-juggernaut"
  },
  {
    "id": "bulwark-kobold",
    "faction": "bulwark",
    "tier": 1,
    "upgraded": false,
    "rulesets": [
      "hota"
    ],
    "name": {
      "en": "Kobold",
      "pl": "Kobold"
    },
    "stats": {
      "attack": 3,
      "defense": 4,
      "minDamage": 1,
      "maxDamage": 2,
      "health": 8,
      "speed": 3,
      "growth": 15,
      "aiValue": 54,
      "cost": 40
    },
    "abilities": [],
    "notes": [
      "Generates 1 Gold per unit per day"
    ],
    "spriteKey": "bulwark-kobold"
  },
  {
    "id": "bulwark-kobold-foreman",
    "faction": "bulwark",
    "tier": 1,
    "upgraded": true,
    "rulesets": [
      "hota"
    ],
    "name": {
      "en": "Kobold Foreman",
      "pl": "Kobold Foreman"
    },
    "stats": {
      "attack": 5,
      "defense": 6,
      "minDamage": 1,
      "maxDamage": 2,
      "health": 8,
      "speed": 5,
      "growth": 15,
      "aiValue": 84,
      "cost": 60
    },
    "abilities": [],
    "notes": [
      "Generates 1 Gold per unit per day"
    ],
    "spriteKey": "bulwark-kobold-foreman"
  },
  {
    "id": "bulwark-mountain-ram",
    "faction": "bulwark",
    "tier": 2,
    "upgraded": false,
    "rulesets": [
      "hota"
    ],
    "name": {
      "en": "Mountain Ram",
      "pl": "Mountain Ram"
    },
    "stats": {
      "attack": 7,
      "defense": 6,
      "minDamage": 3,
      "maxDamage": 4,
      "health": 18,
      "speed": 7,
      "growth": 9,
      "aiValue": 228,
      "cost": 135
    },
    "abilities": [],
    "notes": [],
    "spriteKey": "bulwark-mountain-ram"
  },
  {
    "id": "bulwark-argali",
    "faction": "bulwark",
    "tier": 2,
    "upgraded": true,
    "rulesets": [
      "hota"
    ],
    "name": {
      "en": "Argali",
      "pl": "Argali"
    },
    "stats": {
      "attack": 8,
      "defense": 6,
      "minDamage": 3,
      "maxDamage": 4,
      "health": 18,
      "speed": 8,
      "growth": 9,
      "aiValue": 250,
      "cost": 170
    },
    "abilities": [],
    "notes": [
      "Immune to Ice Bolt and Frost Ring",
      "Adjacent enemies receive +20% Spell Damage"
    ],
    "spriteKey": "bulwark-argali"
  },
  {
    "id": "bulwark-snow-elf",
    "faction": "bulwark",
    "tier": 3,
    "upgraded": false,
    "rulesets": [
      "hota"
    ],
    "name": {
      "en": "Snow Elf",
      "pl": "Snow Elf"
    },
    "stats": {
      "attack": 9,
      "defense": 8,
      "minDamage": 4,
      "maxDamage": 6,
      "health": 21,
      "speed": 6,
      "growth": 7,
      "aiValue": 370,
      "cost": 230
    },
    "abilities": [
      "ranged",
      "noMeleePenalty"
    ],
    "notes": [
      "Ranged (4 shots)",
      "No melee penalty"
    ],
    "shots": 4,
    "spriteKey": "bulwark-snow-elf"
  },
  {
    "id": "bulwark-steel-elf",
    "faction": "bulwark",
    "tier": 3,
    "upgraded": true,
    "rulesets": [
      "hota"
    ],
    "name": {
      "en": "Steel Elf",
      "pl": "Steel Elf"
    },
    "stats": {
      "attack": 9,
      "defense": 10,
      "minDamage": 4,
      "maxDamage": 6,
      "health": 24,
      "speed": 7,
      "growth": 7,
      "aiValue": 526,
      "cost": 260
    },
    "abilities": [
      "ranged",
      "noMeleePenalty"
    ],
    "notes": [
      "Ranged (8 shots)",
      "No melee penalty",
      "May shoot while adjacent to enemy creatures"
    ],
    "shots": 8,
    "spriteKey": "bulwark-steel-elf"
  },
  {
    "id": "bulwark-yeti",
    "faction": "bulwark",
    "tier": 4,
    "upgraded": false,
    "rulesets": [
      "hota"
    ],
    "name": {
      "en": "Yeti",
      "pl": "Yeti"
    },
    "stats": {
      "attack": 10,
      "defense": 8,
      "minDamage": 7,
      "maxDamage": 9,
      "health": 40,
      "speed": 6,
      "growth": 4,
      "aiValue": 504,
      "cost": 325
    },
    "abilities": [],
    "notes": [
      "Recovers from negative effects in one round of combat"
    ],
    "spriteKey": "bulwark-yeti"
  },
  {
    "id": "bulwark-yeti-runemaster",
    "faction": "bulwark",
    "tier": 4,
    "upgraded": true,
    "rulesets": [
      "hota"
    ],
    "name": {
      "en": "Yeti Runemaster",
      "pl": "Yeti Runemaster"
    },
    "stats": {
      "attack": 11,
      "defense": 9,
      "minDamage": 7,
      "maxDamage": 9,
      "health": 45,
      "speed": 7,
      "growth": 4,
      "aiValue": 751,
      "cost": 400
    },
    "abilities": [],
    "notes": [
      "Recovers from negative effects in one round of combat",
      "Possesses Runes"
    ],
    "spriteKey": "bulwark-yeti-runemaster"
  },
  {
    "id": "bulwark-shaman",
    "faction": "bulwark",
    "tier": 5,
    "upgraded": false,
    "rulesets": [
      "hota"
    ],
    "name": {
      "en": "Shaman",
      "pl": "Shaman"
    },
    "stats": {
      "attack": 11,
      "defense": 8,
      "minDamage": 11,
      "maxDamage": 13,
      "health": 35,
      "speed": 5,
      "growth": 3,
      "aiValue": 685,
      "cost": 450
    },
    "abilities": [
      "ranged"
    ],
    "notes": [
      "Ranged (12 shots)",
      "Spellcaster (Air Shield)"
    ],
    "shots": 12,
    "spriteKey": "bulwark-shaman"
  },
  {
    "id": "bulwark-great-shaman",
    "faction": "bulwark",
    "tier": 5,
    "upgraded": true,
    "rulesets": [
      "hota"
    ],
    "name": {
      "en": "Great Shaman",
      "pl": "Great Shaman"
    },
    "stats": {
      "attack": 12,
      "defense": 11,
      "minDamage": 11,
      "maxDamage": 13,
      "health": 35,
      "speed": 6,
      "growth": 3,
      "aiValue": 818,
      "cost": 600
    },
    "abilities": [
      "ranged"
    ],
    "notes": [
      "Ranged (24 shots)",
      "Spellcaster (Air Shield)",
      "Freezing Shot"
    ],
    "shots": 24,
    "spriteKey": "bulwark-great-shaman"
  },
  {
    "id": "bulwark-mammoth",
    "faction": "bulwark",
    "tier": 6,
    "upgraded": false,
    "rulesets": [
      "hota"
    ],
    "name": {
      "en": "Mammoth",
      "pl": "Mammoth"
    },
    "stats": {
      "attack": 12,
      "defense": 16,
      "minDamage": 14,
      "maxDamage": 20,
      "health": 120,
      "speed": 5,
      "growth": 2,
      "aiValue": 1359,
      "cost": 850
    },
    "abilities": [],
    "notes": [],
    "spriteKey": "bulwark-mammoth"
  },
  {
    "id": "bulwark-war-mammoth",
    "faction": "bulwark",
    "tier": 6,
    "upgraded": true,
    "rulesets": [
      "hota"
    ],
    "name": {
      "en": "War Mammoth",
      "pl": "War Mammoth"
    },
    "stats": {
      "attack": 14,
      "defense": 18,
      "minDamage": 14,
      "maxDamage": 20,
      "health": 135,
      "speed": 6,
      "growth": 2,
      "aiValue": 1601,
      "cost": 1000
    },
    "abilities": [],
    "notes": [
      "Receives +100% Defense while defending in combat."
    ],
    "spriteKey": "bulwark-war-mammoth"
  },
  {
    "id": "bulwark-jotunn",
    "faction": "bulwark",
    "tier": 7,
    "upgraded": false,
    "rulesets": [
      "hota"
    ],
    "name": {
      "en": "Jotunn",
      "pl": "Jotunn"
    },
    "stats": {
      "attack": 18,
      "defense": 18,
      "minDamage": 40,
      "maxDamage": 50,
      "health": 165,
      "speed": 8,
      "growth": 1,
      "aiValue": 4180,
      "cost": 2000
    },
    "abilities": [
      "flying"
    ],
    "notes": [
      "Teleports allies (once per combat)",
      "-1 enemy flying units' Speed"
    ],
    "spriteKey": "bulwark-jotunn"
  },
  {
    "id": "bulwark-jotunn-warlord",
    "faction": "bulwark",
    "tier": 7,
    "upgraded": true,
    "rulesets": [
      "hota"
    ],
    "name": {
      "en": "Jotunn Warlord",
      "pl": "Jotunn Warlord"
    },
    "stats": {
      "attack": 20,
      "defense": 20,
      "minDamage": 40,
      "maxDamage": 50,
      "health": 300,
      "speed": 10,
      "growth": 1,
      "aiValue": 6694,
      "cost": 3500
    },
    "abilities": [
      "flying"
    ],
    "notes": [
      "Teleports allies (unlimited)",
      "-2 enemy flying units' Speed"
    ],
    "spriteKey": "bulwark-jotunn-warlord"
  },
  {
    "id": "peasant",
    "faction": "neutral",
    "tier": 1,
    "upgraded": false,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Peasant",
      "pl": "Peasant"
    },
    "stats": {
      "attack": 1,
      "defense": 1,
      "minDamage": 1,
      "maxDamage": 1,
      "health": 1,
      "speed": 3,
      "growth": 25,
      "aiValue": 15,
      "cost": 10
    },
    "abilities": [],
    "notes": [],
    "spriteKey": "peasant"
  },
  {
    "id": "halfling",
    "faction": "neutral",
    "tier": 1,
    "upgraded": false,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Halfling",
      "pl": "Halfling"
    },
    "stats": {
      "attack": 4,
      "defense": 2,
      "minDamage": 1,
      "maxDamage": 3,
      "health": 4,
      "speed": 5,
      "growth": 15,
      "aiValue": 75,
      "cost": 40
    },
    "abilities": [
      "ranged"
    ],
    "notes": [
      "Ranged (24 shots)",
      "Positive Luck"
    ],
    "shots": 24,
    "spriteKey": "halfling"
  },
  {
    "id": "boar",
    "faction": "neutral",
    "tier": 2,
    "upgraded": false,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Boar",
      "pl": "Boar"
    },
    "stats": {
      "attack": 6,
      "defense": 5,
      "minDamage": 2,
      "maxDamage": 3,
      "health": 15,
      "speed": 6,
      "growth": 8,
      "aiValue": 145,
      "cost": 150
    },
    "abilities": [],
    "notes": [],
    "spriteKey": "boar"
  },
  {
    "id": "rogue",
    "faction": "neutral",
    "tier": 2,
    "upgraded": false,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Rogue",
      "pl": "Rogue"
    },
    "stats": {
      "attack": 8,
      "defense": 3,
      "minDamage": 2,
      "maxDamage": 4,
      "health": 10,
      "speed": 6,
      "growth": 8,
      "aiValue": 135,
      "cost": 100
    },
    "abilities": [],
    "notes": [
      "Spying"
    ],
    "spriteKey": "rogue"
  },
  {
    "id": "leprechaun",
    "faction": "neutral",
    "tier": 2,
    "upgraded": false,
    "rulesets": [
      "hota"
    ],
    "name": {
      "en": "Leprechaun",
      "pl": "Leprechaun"
    },
    "stats": {
      "attack": 8,
      "defense": 5,
      "minDamage": 3,
      "maxDamage": 5,
      "health": 15,
      "speed": 5,
      "growth": 9,
      "aiValue": 208,
      "cost": 100
    },
    "abilities": [],
    "notes": [
      "Doubles friendly units Luck chance",
      "Spellcaster (Fortune)"
    ],
    "spriteKey": "leprechaun"
  },
  {
    "id": "mummy",
    "faction": "neutral",
    "tier": 3,
    "upgraded": false,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Mummy",
      "pl": "Mummy"
    },
    "stats": {
      "attack": 7,
      "defense": 7,
      "minDamage": 3,
      "maxDamage": 5,
      "health": 30,
      "speed": 5,
      "growth": 7,
      "aiValue": 270,
      "cost": 300
    },
    "abilities": [],
    "notes": [
      "Undead",
      "Curse"
    ],
    "spriteKey": "mummy"
  },
  {
    "id": "nomad",
    "faction": "neutral",
    "tier": 3,
    "upgraded": false,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Nomad",
      "pl": "Nomad"
    },
    "stats": {
      "attack": 9,
      "defense": 8,
      "minDamage": 2,
      "maxDamage": 6,
      "health": 30,
      "speed": 7,
      "growth": 7,
      "aiValue": 345,
      "cost": 200
    },
    "abilities": [],
    "notes": [
      "Sandwalker"
    ],
    "spriteKey": "nomad"
  },
  {
    "id": "sharpshooter",
    "faction": "neutral",
    "tier": 4,
    "upgraded": false,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Sharpshooter",
      "pl": "Sharpshooter"
    },
    "stats": {
      "attack": 12,
      "defense": 10,
      "minDamage": 8,
      "maxDamage": 10,
      "health": 15,
      "speed": 9,
      "growth": 4,
      "aiValue": 585,
      "cost": 400
    },
    "abilities": [
      "ranged"
    ],
    "notes": [
      "Ranged (32 shots)",
      "No range and obstacle penalty"
    ],
    "shots": 32,
    "spriteKey": "sharpshooter"
  },
  {
    "id": "satyr",
    "faction": "neutral",
    "tier": 4,
    "upgraded": false,
    "rulesets": [
      "hota"
    ],
    "name": {
      "en": "Satyr",
      "pl": "Satyr"
    },
    "stats": {
      "attack": 10,
      "defense": 11,
      "minDamage": 6,
      "maxDamage": 10,
      "health": 35,
      "speed": 7,
      "growth": 4,
      "aiValue": 518,
      "cost": 300
    },
    "abilities": [],
    "notes": [
      "Spellcaster (Mirth)"
    ],
    "spriteKey": "satyr"
  },
  {
    "id": "steel-golem",
    "faction": "neutral",
    "tier": 4,
    "upgraded": false,
    "rulesets": [
      "hota"
    ],
    "name": {
      "en": "Steel Golem",
      "pl": "Steel Golem"
    },
    "stats": {
      "attack": 10,
      "defense": 11,
      "minDamage": 6,
      "maxDamage": 8,
      "health": 45,
      "speed": 6,
      "growth": 4,
      "aiValue": 597,
      "cost": 400
    },
    "abilities": [],
    "notes": [
      "Unliving",
      "Spell damage resistance (+80%)"
    ],
    "spriteKey": "steel-golem"
  },
  {
    "id": "troll",
    "faction": "neutral",
    "tier": 5,
    "upgraded": false,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Troll",
      "pl": "Troll"
    },
    "stats": {
      "attack": 14,
      "defense": 7,
      "minDamage": 10,
      "maxDamage": 15,
      "health": 40,
      "speed": 7,
      "growth": 3,
      "aiValue": 1024,
      "cost": 500
    },
    "abilities": [],
    "notes": [
      "Regeneration"
    ],
    "spriteKey": "troll"
  },
  {
    "id": "gold-golem",
    "faction": "neutral",
    "tier": 5,
    "upgraded": false,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Gold Golem",
      "pl": "Gold Golem"
    },
    "stats": {
      "attack": 11,
      "defense": 12,
      "minDamage": 8,
      "maxDamage": 10,
      "health": 50,
      "speed": 5,
      "growth": 3,
      "aiValue": 600,
      "cost": 500
    },
    "abilities": [],
    "notes": [
      "Unliving",
      "Spell damage resistance (+85%)"
    ],
    "spriteKey": "gold-golem"
  },
  {
    "id": "fangarm",
    "faction": "neutral",
    "tier": 5,
    "upgraded": false,
    "rulesets": [
      "hota"
    ],
    "name": {
      "en": "Fangarm",
      "pl": "Fangarm"
    },
    "stats": {
      "attack": 12,
      "defense": 12,
      "minDamage": 8,
      "maxDamage": 12,
      "health": 50,
      "speed": 6,
      "growth": 3,
      "aiValue": 929,
      "cost": 600
    },
    "abilities": [
      "flying"
    ],
    "notes": [
      "Flying",
      "Mind spells immunity",
      "Unlimited retaliations",
      "Hypnotizing attack"
    ],
    "spriteKey": "fangarm"
  },
  {
    "id": "diamond-golem",
    "faction": "neutral",
    "tier": 6,
    "upgraded": false,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Diamond Golem",
      "pl": "Diamond Golem"
    },
    "stats": {
      "attack": 13,
      "defense": 12,
      "minDamage": 10,
      "maxDamage": 14,
      "health": 60,
      "speed": 5,
      "growth": 2,
      "aiValue": 775,
      "cost": 750
    },
    "abilities": [],
    "notes": [
      "Unliving",
      "Spell Damage Resistance (+95%)"
    ],
    "spriteKey": "diamond-golem"
  },
  {
    "id": "enchanter",
    "faction": "neutral",
    "tier": 6,
    "upgraded": false,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Enchanter",
      "pl": "Enchanter"
    },
    "stats": {
      "attack": 17,
      "defense": 12,
      "minDamage": 14,
      "maxDamage": 14,
      "health": 30,
      "speed": 9,
      "growth": 2,
      "aiValue": 1210,
      "cost": 750
    },
    "abilities": [
      "ranged",
      "noMeleePenalty"
    ],
    "notes": [
      "Ranged (32 shots)",
      "No melee and obstacle penalty",
      "Spellcaster"
    ],
    "shots": 32,
    "spriteKey": "enchanter"
  },
  {
    "id": "faerie-dragon",
    "faction": "neutral",
    "tier": 7,
    "upgraded": false,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Faerie Dragon",
      "pl": "Faerie Dragon"
    },
    "stats": {
      "attack": 20,
      "defense": 20,
      "minDamage": 20,
      "maxDamage": 30,
      "health": 500,
      "speed": 15,
      "growth": 1,
      "aiValue": 30501,
      "cost": 10000
    },
    "abilities": [
      "flying"
    ],
    "notes": [
      "Dragon",
      "Flying",
      "Spellcaster",
      "Natural Magic Mirror"
    ],
    "spriteKey": "faerie-dragon"
  },
  {
    "id": "rust-dragon",
    "faction": "neutral",
    "tier": 7,
    "upgraded": false,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Rust Dragon",
      "pl": "Rust Dragon"
    },
    "stats": {
      "attack": 30,
      "defense": 30,
      "minDamage": 50,
      "maxDamage": 50,
      "health": 750,
      "speed": 17,
      "growth": 1,
      "aiValue": 26433,
      "cost": 15000
    },
    "abilities": [
      "flying"
    ],
    "notes": [
      "Dragon",
      "Flying",
      "Breath attack",
      "Acid breath"
    ],
    "spriteKey": "rust-dragon"
  },
  {
    "id": "crystal-dragon",
    "faction": "neutral",
    "tier": 7,
    "upgraded": false,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Crystal Dragon",
      "pl": "Crystal Dragon"
    },
    "stats": {
      "attack": 40,
      "defense": 40,
      "minDamage": 60,
      "maxDamage": 75,
      "health": 800,
      "speed": 16,
      "growth": 1,
      "aiValue": 39338,
      "cost": 20000
    },
    "abilities": [],
    "notes": [
      "Dragon",
      "Crystal generation",
      "Magic resistance (+20%)"
    ],
    "spriteKey": "crystal-dragon"
  },
  {
    "id": "azure-dragon",
    "faction": "neutral",
    "tier": 7,
    "upgraded": false,
    "rulesets": [
      "complete",
      "hota"
    ],
    "name": {
      "en": "Azure Dragon",
      "pl": "Azure Dragon"
    },
    "stats": {
      "attack": 50,
      "defense": 50,
      "minDamage": 70,
      "maxDamage": 80,
      "health": 1000,
      "speed": 19,
      "growth": 1,
      "aiValue": 78845,
      "cost": 30000
    },
    "abilities": [
      "flying"
    ],
    "notes": [
      "Dragon",
      "Flying",
      "Breath attack",
      "Fear",
      "Fearless",
      "1-3 lvl spells immunity"
    ],
    "spriteKey": "azure-dragon"
  }
]
