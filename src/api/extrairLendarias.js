import fs from 'fs';

function extrairLendarias(texto) {
  const textoCorrigido = texto.trim() + '\n';
  const linhas = textoCorrigido.split('\n').map(l => l.trim()).filter(Boolean);

  const lendarias = [];
  for (let i = 0; i < linhas.length; i++) {
    if (linhas[i].startsWith('Lendária de')) {
      const monstro = linhas[i].replace('Lendária de ', '').trim();
      const nome = linhas[i + 1] || "";
      const desc = linhas[i + 2] || "";
      if (nome && desc) {
        lendarias.push({ monstro, nome, desc });
      } else {
        console.warn(`Entrada incompleta encontrada após linha ${i + 1}`);
      }
      i += 2;  // Pula nome e descrição
    }
  }
  return lendarias;
}

const texto = `Lendária de Aboleth

Detect

The aboleth makes a Wisdom (Perception) check.

Lendária de Aboleth

Tail Swipe

The aboleth makes one tail attack.

Lendária de Aboleth

Psychic Drain (Costs 2 Actions)

One creature charmed by the aboleth takes 10 (3d6) psychic damage, and the aboleth regains hit points equal to the damage the creature takes.

Lendária de Adult Black Dragon

Detect

The dragon makes a Wisdom (Perception) check.

Lendária de Adult Black Dragon

Tail Attack

The dragon makes a tail attack.

Lendária de Adult Black Dragon

Wing Attack (Costs 2 Actions)

The dragon beats its wings. Each creature within 10 ft. of the dragon must succeed on a DC 19 Dexterity saving throw or take 13 (2d6 + 6) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed.

Lendária de Adult Blue Dragon

Detect

The dragon makes a Wisdom (Perception) check.

Lendária de Adult Blue Dragon

Tail Attack

The dragon makes a tail attack.

Lendária de Adult Blue Dragon

Wing Attack (Costs 2 Actions)

The dragon beats its wings. Each creature within 10 ft. of the dragon must succeed on a DC 20 Dexterity saving throw or take 14 (2d6 + 7) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed.

Lendária de Adult Brass Dragon

Detect

The dragon makes a Wisdom (Perception) check.

Lendária de Adult Brass Dragon

Tail Attack

The dragon makes a tail attack.

Lendária de Adult Brass Dragon

Wing Attack (Costs 2 Actions)

The dragon beats its wings. Each creature within 10 ft. of the dragon must succeed on a DC 19 Dexterity saving throw or take 13 (2d6 + 6) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed.

Lendária de Adult Bronze Dragon

Detect

The dragon makes a Wisdom (Perception) check.

Lendária de Adult Bronze Dragon

Tail Attack

The dragon makes a tail attack.

Lendária de Adult Bronze Dragon

Wing Attack (Costs 2 Actions)

The dragon beats its wings. Each creature within 10 ft. of the dragon must succeed on a DC 20 Dexterity saving throw or take 14 (2d6 + 7) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed.

Lendária de Adult Copper Dragon

Detect

The dragon makes a Wisdom (Perception) check.

Lendária de Adult Copper Dragon

Tail Attack

The dragon makes a tail attack.

Lendária de Adult Copper Dragon

Wing Attack (Costs 2 Actions)

The dragon beats its wings. Each creature within 10 ft. of the dragon must succeed on a DC 19 Dexterity saving throw or take 13 (2d6 + 6) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed.

Lendária de Adult Gold Dragon

Detect

The dragon makes a Wisdom (Perception) check.

Lendária de Adult Gold Dragon

Tail Attack

The dragon makes a tail attack.

Lendária de Adult Gold Dragon

Wing Attack (Costs 2 Actions)

The dragon beats its wings. Each creature within 10 ft. of the dragon must succeed on a DC 22 Dexterity saving throw or take 15 (2d6 + 8) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed.

Lendária de Adult Green Dragon

Detect

The dragon makes a Wisdom (Perception) check.

Lendária de Adult Green Dragon

Tail Attack

The dragon makes a tail attack.

Lendária de Adult Green Dragon

Wing Attack (Costs 2 Actions)

The dragon beats its wings. Each creature within 10 ft. of the dragon must succeed on a DC 19 Dexterity saving throw or take 13 (2d6 + 6) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed.

Lendária de Adult Red Dragon

Detect

The dragon makes a Wisdom (Perception) check.

Lendária de Adult Red Dragon

Tail Attack

The dragon makes a tail attack.

Lendária de Adult Red Dragon

Wing Attack (Costs 2 Actions)

The dragon beats its wings. Each creature within 10 ft. of the dragon must succeed on a DC 22 Dexterity saving throw or take 15 (2d6 + 8) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed.

Lendária de Aboleth

Detect

The aboleth makes a Wisdom (Perception) check.

Lendária de Aboleth

Tail Swipe

The aboleth makes one tail attack.

Lendária de Aboleth

Psychic Drain (Costs 2 Actions)

One creature charmed by the aboleth takes 10 (3d6) psychic damage, and the aboleth regains hit points equal to the damage the creature takes.

Lendária de Adult Black Dragon

Detect

The dragon makes a Wisdom (Perception) check.

Lendária de Adult Black Dragon

Tail Attack

The dragon makes a tail attack.

Lendária de Adult Black Dragon

Wing Attack (Costs 2 Actions)

The dragon beats its wings. Each creature within 10 ft. of the dragon must succeed on a DC 19 Dexterity saving throw or take 13 (2d6 + 6) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed.

Lendária de Adult Blue Dragon

Detect

The dragon makes a Wisdom (Perception) check.

Lendária de Adult Blue Dragon

Tail Attack

The dragon makes a tail attack.

Lendária de Adult Blue Dragon

Wing Attack (Costs 2 Actions)

The dragon beats its wings. Each creature within 10 ft. of the dragon must succeed on a DC 20 Dexterity saving throw or take 14 (2d6 + 7) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed.

Lendária de Adult Brass Dragon

Detect

The dragon makes a Wisdom (Perception) check.

Lendária de Adult Brass Dragon

Tail Attack

The dragon makes a tail attack.

Lendária de Adult Brass Dragon

Wing Attack (Costs 2 Actions)

The dragon beats its wings. Each creature within 10 ft. of the dragon must succeed on a DC 19 Dexterity saving throw or take 13 (2d6 + 6) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed.

Lendária de Adult Bronze Dragon

Detect

The dragon makes a Wisdom (Perception) check.

Lendária de Adult Bronze Dragon

Tail Attack

The dragon makes a tail attack.

Lendária de Adult Bronze Dragon

Wing Attack (Costs 2 Actions)

The dragon beats its wings. Each creature within 10 ft. of the dragon must succeed on a DC 20 Dexterity saving throw or take 14 (2d6 + 7) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed.

Lendária de Adult Copper Dragon

Detect

The dragon makes a Wisdom (Perception) check.

Lendária de Adult Copper Dragon

Tail Attack

The dragon makes a tail attack.

Lendária de Adult Copper Dragon

Wing Attack (Costs 2 Actions)

The dragon beats its wings. Each creature within 10 ft. of the dragon must succeed on a DC 19 Dexterity saving throw or take 13 (2d6 + 6) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed.

Lendária de Adult Gold Dragon

Detect

The dragon makes a Wisdom (Perception) check.

Lendária de Adult Gold Dragon

Tail Attack

The dragon makes a tail attack.

Lendária de Adult Gold Dragon

Wing Attack (Costs 2 Actions)

The dragon beats its wings. Each creature within 10 ft. of the dragon must succeed on a DC 22 Dexterity saving throw or take 15 (2d6 + 8) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed.

Lendária de Adult Green Dragon

Detect

The dragon makes a Wisdom (Perception) check.

Lendária de Adult Green Dragon

Tail Attack

The dragon makes a tail attack.

Lendária de Adult Green Dragon

Wing Attack (Costs 2 Actions)

The dragon beats its wings. Each creature within 10 ft. of the dragon must succeed on a DC 19 Dexterity saving throw or take 13 (2d6 + 6) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed.

Lendária de Adult Red Dragon

Detect

The dragon makes a Wisdom (Perception) check.

Lendária de Adult Red Dragon

Tail Attack

The dragon makes a tail attack.

Lendária de Adult Red Dragon

Wing Attack (Costs 2 Actions)

The dragon beats its wings. Each creature within 10 ft. of the dragon must succeed on a DC 22 Dexterity saving throw or take 15 (2d6 + 8) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed.

Lendária de Adult Silver Dragon

Detect

The dragon makes a Wisdom (Perception) check.

Lendária de Adult Silver Dragon

Tail Attack

The dragon makes a tail attack.

Lendária de Adult Silver Dragon

Wing Attack (Costs 2 Actions)

The dragon beats its wings. Each creature within 10 ft. of the dragon must succeed on a DC 22 Dexterity saving throw or take 15 (2d6 + 8) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed.

Lendária de Adult White Dragon

Detect

The dragon makes a Wisdom (Perception) check.

Lendária de Adult White Dragon

Tail Attack

The dragon makes a tail attack.

Lendária de Adult White Dragon

Wing Attack (Costs 2 Actions)

The dragon beats its wings. Each creature within 10 ft. of the dragon must succeed on a DC 19 Dexterity saving throw or take 13 (2d6 + 6) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed.

Lendária de Ancient Black Dragon

Detect

The dragon makes a Wisdom (Perception) check.

Lendária de Ancient Black Dragon

Tail Attack

The dragon makes a tail attack.

Lendária de Ancient Black Dragon

Wing Attack (Costs 2 Actions)

The dragon beats its wings. Each creature within 15 ft. of the dragon must succeed on a DC 23 Dexterity saving throw or take 15 (2d6 + 8) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed.

Lendária de Ancient Blue Dragon

Detect

The dragon makes a Wisdom (Perception) check.

Lendária de Ancient Blue Dragon

Tail Attack

The dragon makes a tail attack.

Lendária de Ancient Blue Dragon

Wing Attack (Costs 2 Actions)

The dragon beats its wings. Each creature within 15 ft. of the dragon must succeed on a DC 24 Dexterity saving throw or take 16 (2d6 + 9) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed.

Lendária de Ancient Brass Dragon

Detect

The dragon makes a Wisdom (Perception) check.

Lendária de Ancient Brass Dragon

Tail Attack

The dragon makes a tail attack.

Lendária de Ancient Brass Dragon

Wing Attack (Costs 2 Actions)

The dragon beats its wings. Each creature within 15 ft. of the dragon must succeed on a DC 22 Dexterity saving throw or take 15 (2d6 + 8) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed.

Lendária de Ancient Bronze Dragon

Detect

The dragon makes a Wisdom (Perception) check.

Lendária de Ancient Bronze Dragon

Tail Attack

The dragon makes a tail attack.

Lendária de Ancient Bronze Dragon

Wing Attack (Costs 2 Actions)

The dragon beats its wings. Each creature within 15 ft. of the dragon must succeed on a DC 24 Dexterity saving throw or take 16 (2d6 + 9) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed.

Lendária de Ancient Copper Dragon

Detect

The dragon makes a Wisdom (Perception) check.

Lendária de Ancient Copper Dragon

Tail Attack

The dragon makes a tail attack.

Lendária de Ancient Copper Dragon

Wing Attack (Costs 2 Actions)

The dragon beats its wings. Each creature within 15 ft. of the dragon must succeed on a DC 23 Dexterity saving throw or take 15 (2d6 + 8) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed.

Lendária de Ancient Gold Dragon

Detect

The dragon makes a Wisdom (Perception) check.

Lendária de Ancient Gold Dragon

Tail Attack

The dragon makes a tail attack.

Lendária de Ancient Gold Dragon

Wing Attack (Costs 2 Actions)

The dragon beats its wings. Each creature within 15 ft. of the dragon must succeed on a DC 25 Dexterity saving throw or take 17 (2d6 + 10) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed.

Lendária de Ancient Green Dragon

Detect

The dragon makes a Wisdom (Perception) check.

Lendária de Ancient Green Dragon

Tail Attack

The dragon makes a tail attack.

Lendária de Ancient Green Dragon

Wing Attack (Costs 2 Actions)

The dragon beats its wings. Each creature within 15 ft. of the dragon must succeed on a DC 23 Dexterity saving throw or take 15 (2d6 + 8) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed.

Lendária de Ancient Red Dragon

Detect

The dragon makes a Wisdom (Perception) check.

Lendária de Ancient Red Dragon

Tail Attack

The dragon makes a tail attack.

Lendária de Ancient Red Dragon

Wing Attack (Costs 2 Actions)

The dragon beats its wings. Each creature within 15 ft. of the dragon must succeed on a DC 25 Dexterity saving throw or take 17 (2d6 + 10) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed.

Lendária de Ancient Silver Dragon

Detect

The dragon makes a Wisdom (Perception) check.

Lendária de Ancient Silver Dragon

Tail Attack

The dragon makes a tail attack.

Lendária de Ancient Silver Dragon

Wing Attack (Costs 2 Actions)

The dragon beats its wings. Each creature within 15 ft. of the dragon must succeed on a DC 25 Dexterity saving throw or take 17 (2d6 + 10) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed.

Lendária de Ancient White Dragon

Detect

The dragon makes a Wisdom (Perception) check.

Lendária de Ancient White Dragon

Tail Attack

The dragon makes a tail attack.

Lendária de Ancient White Dragon

Wing Attack (Costs 2 Actions)

The dragon beats its wings. Each creature within 15 ft. of the dragon must succeed on a DC 22 Dexterity saving throw or take 15 (2d6 + 8) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed.

Lendária de Androsphinx

Claw Attack

The sphinx makes one claw attack.

Lendária de Androsphinx

Teleport (Costs 2 Actions)

The sphinx magically teleports, along with any equipment it is wearing or carrying, up to 120 feet to an unoccupied space it can see.

Lendária de Androsphinx

Cast a Spell (Costs 3 Actions)

The sphinx casts a spell from its list of prepared spells, using a spell slot as normal.

Lendária de Gynosphinx

Claw Attack

The sphinx makes one claw attack.

Lendária de Gynosphinx

Teleport (Costs 2 Actions)

The sphinx magically teleports, along with any equipment it is wearing or carrying, up to 120 feet to an unoccupied space it can see.

Lendária de Gynosphinx

Cast a Spell (Costs 3 Actions)

The sphinx casts a spell from its list of prepared spells, using a spell slot as normal.

Lendária de Kraken

Tentacle Attack or Fling

The kraken makes one tentacle attack or uses its Fling.

Lendária de Kraken

Lightning Storm (Costs 2 Actions)

The kraken uses Lightning Storm.

Lendária de Kraken

Ink Cloud (Costs 3 Actions)

While underwater, the kraken expels an ink cloud in a 60-foot radius. The cloud spreads around corners, and that area is heavily obscured to creatures other than the kraken. Each creature other than the kraken that ends its turn there must succeed on a DC 23 Constitution saving throw, taking 16 (3d10) poison damage on a failed save, or half as much damage on a successful one. A strong current disperses the cloud, which otherwise disappears at the end of the kraken's next turn.

Lendária de Lich

Cantrip

The lich casts a cantrip.

Lendária de Lich

Paralyzing Touch (Costs 2 Actions)

The lich uses its Paralyzing Touch.

Lendária de Lich

Frightening Gaze (Costs 2 Actions)

The lich fixes its gaze on one creature it can see within 10 feet of it. The target must succeed on a DC 18 Wisdom saving throw against this magic or become frightened for 1 minute. The frightened target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. If a target's saving throw is successful or the effect ends for it, the target is immune to the lich's gaze for the next 24 hours.

Lendária de Lich

Disrupt Life (Costs 3 Actions)

Each living creature within 20 feet of the lich must make a DC 18 Constitution saving throw against this magic, taking 21 (6d6) necrotic damage on a failed save, or half as much damage on a successful one.

Lendária de Mummy Lord

Attack

The mummy lord makes one attack with its rotting fist or uses its Dreadful Glare.

Lendária de Mummy Lord

Blinding Dust

Blinding dust and sand swirls magically around the mummy lord. Each creature within 5 feet of the mummy lord must succeed on a DC 16 Constitution saving throw or be blinded until the end of the creature's next turn.

Lendária de Mummy Lord

Blasphemous Word (Costs 2 Actions)

The mummy lord utters a blasphemous word. Each non-undead creature within 10 feet of the mummy lord that can hear the magical utterance must succeed on a DC 16 Constitution saving throw or be stunned until the end of the mummy lord's next turn.

Lendária de Mummy Lord

Channel Negative Energy (Costs 2 Actions)

The mummy lord magically unleashes negative energy. Creatures within 60 feet of the mummy lord, including ones behind barriers and around corners, can't regain hit points until the end of the mummy lord's next turn.

Lendária de Mummy Lord

Whirlwind of Sand (Costs 2 Actions)

The mummy lord magically transforms into a whirlwind of sand, moves up to 60 feet, and reverts to its normal form. While in whirlwind form, the mummy lord is immune to all damage, and it can't be grappled, petrified, knocked prone, restrained, or stunned. Equipment worn or carried by the mummy lord remain in its possession.

Lendária de Solar

Teleport

The solar magically teleports, along with any equipment it is wearing or carrying, up to 120 ft. to an unoccupied space it can see.

Lendária de Solar

Searing Burst (Costs 2 Actions)

The solar emits magical, divine energy. Each creature of its choice in a 10 -foot radius must make a DC 23 Dexterity saving throw, taking 14 (4d6) fire damage plus 14 (4d6) radiant damage on a failed save, or half as much damage on a successful one.

Lendária de Solar

Blinding Gaze (Costs 3 Actions)

The solar targets one creature it can see within 30 ft. of it. If the target can see it, the target must succeed on a DC 15 Constitution saving throw or be blinded until magic such as the lesser restoration spell removes the blindness.

Lendária de Tarrasque

Attack

The tarrasque makes one claw attack or tail attack.

Lendária de Tarrasque

Move

The tarrasque moves up to half its speed.

Lendária de Tarrasque

Chomp (Costs 2 Actions)

The tarrasque makes one bite attack or uses its Swallow.

Lendária de Unicorn

Hooves

The unicorn makes one attack with its hooves.

Lendária de Unicorn

Shimmering Shield (Costs 2 Actions)

The unicorn creates a shimmering, magical field around itself or another creature it can see within 60 ft. of it. The target gains a +2 bonus to AC until the end of the unicorn's next turn.

Lendária de Unicorn

Heal Self (Costs 3 Actions)

The unicorn magically regains 11 (2d8 + 2) hit points.

Lendária de Vampire, Bat Form

Move

The vampire moves up to its speed without provoking opportunity attacks.

Lendária de Vampire, Bat Form

Unarmed Strike

The vampire makes one unarmed strike.

Lendária de Vampire, Bat Form

Bite (Costs 2 Actions)

The vampire makes one bite attack.

Lendária de Vampire, Mist Form

Move

The vampire moves up to its speed without provoking opportunity attacks.

Lendária de Vampire, Mist Form

Unarmed Strike

The vampire makes one unarmed strike.

Lendária de Vampire, Mist Form

Bite (Costs 2 Actions)

The vampire makes one bite attack.

Lendária de Vampire, Vampire Form

Move

The vampire moves up to its speed without provoking opportunity attacks.

Lendária de Vampire, Vampire Form

Unarmed Strike

The vampire makes one unarmed strike.

Lendária de Vampire, Vampire Form

Bite (Costs 2 Actions)

The vampire makes one bite attack.`; // seu texto aqui

const resultado = extrairLendarias(texto);

console.log("Total de lendárias encontradas:", resultado.length);
console.log(JSON.stringify(resultado, null, 2));

// Salvar no arquivo lendarias.json
fs.writeFile('lendarias.json', JSON.stringify(resultado, null, 2), (err) => {
  if (err) {
    console.error('Erro ao salvar o arquivo:', err);
  } else {
    console.log('Arquivo lendarias.json salvo com sucesso!');
  }
});