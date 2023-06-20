let actor = await game.actors.get("qBj6AzpcRyB06dD7"); // Nerine

let effectToFind = "Último Aliento";
let moduleToFind = "Custom Convenient Effects";
let effect = null;

for (let i = 0; i < game.data.items.length; i++) {
  if (game.data.items[i].name === moduleToFind ) {
    for (let j = 0; j < game.data.items[i].effects.length; j++) {
      if (game.data.items[i].effects[j].label === effectToFind ) {
        effect = game.data.items[i].effects[j];
      }
    }
  }
}

console.log(game.data)
if (actor.system.attributes.hp.value < 1) {
  let item = actor.items.find(i => i.id === "YXpBkl0fhyIEOj3d"); // Bastón del Génesis

  let healing = await item.flags.magicitems.uses * 4;
  
  if (healing > 0) {
    await item.update({ "flags.magicitems.uses":  0});

    await actor.update({"system.attributes.hp.value": healing});
    await actor.createEmbeddedDocuments("ActiveEffect", [effect]);

    ChatMessage.create({
      content: `¡Último Aliento! Nerine recupera ${healing} puntos de vida y gana +4 de Sabiduría durante 60 segundos.`,
      speaker: ChatMessage.getSpeaker({ actor: actor }),
    });
  } 
}