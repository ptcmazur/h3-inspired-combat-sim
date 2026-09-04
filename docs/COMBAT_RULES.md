# Implemented combat rules

The simulator models two stacks on an abstract one-dimensional distance. It does not reproduce the complete game. These rules apply to both selectable rulesets unless explicitly stated otherwise.

| Situation | Implemented behavior |
| --- | --- |
| Distance above zero, ammunition available | Ranged attack; no ordinary retaliation |
| Distance zero | Melee; ranged creatures cannot shoot |
| Ammunition exhausted | Move toward the opponent; attack in melee after contact |
| Double ranged attack | Two separate shots, each consuming one ammunition; only one shot if one remains |
| Double melee attack | First strike, retaliation if eligible, second strike using the surviving stack |
| Double shooter in melee | One strike, including when out of ammunition |
| Ordinary retaliation | At most once per stack per round, only against melee; never chains into another retaliation |
| No retaliation ability | Prevents retaliation without spending the defender's retaliation |
| Dead attacker or defender | Stops the attack sequence immediately |
| Shooter melee damage | Half damage, including retaliation, unless noMeleePenalty applies; rounded down with minimum 1 |
| Equal speed | Side A acts first (explicit MVP simplification) |
| Round limit, both stacks alive | Draw |

Sources checked on 2026-09-05: [ranged attack](https://heroes.thelazy.net/index.php/Ranged_attack), [melee penalty](https://heroes.thelazy.net/index.php/Melee_penalty), [Crusader attack sequence](https://heroes.thelazy.net/index.php/Crusader), [double attack](https://heroes.thelazy.net/index.php/Double_attack).

The 1D distance is not a hex radius: range/obstacle penalties, battlefield positioning, special ranged retaliation and creature-specific exceptions are not implemented. Flying has no distinct effect without obstacles. Only hero attack/defense and positive Leadership/Luck effects are currently used; spells, specialties and other skills are not simulated. Negative morale/luck and creature-specific immunities remain outside this version. Creature descriptions are reference data, not a guarantee that every described ability is supported.

## Input limits

The engine rejects non-integer, non-finite and out-of-range input before simulation: 1–5000 simulations, 1–99999 creatures per stack, 1–100 rounds, distance 0–50, and seed 0–4294967295 (32-bit RNG). Growth controls accept 1–52 weeks. Unknown heroes and ruleset-incompatible selections are rejected. Editing combat parameters clears the previous result; searching and switching language preserve it.
