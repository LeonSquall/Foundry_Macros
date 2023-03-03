let actor = await game.actors.get("qBj6AzpcRyB06dD7"); // Nerine

if (actor.system.attributes.hp.value < 1) {
  let item = actor.items.find(i => i.id === "YXpBkl0fhyIEOj3d"); // Bastón del Génesis

  let healing = await item.flags.magicitems.uses * 4;
  
  if (healing > 0) {
    await item.update({ "flags.magicitems.uses":  0});

    await actor.update({"system.attributes.hp.value": healing});

    const effectData = {
      label: "Último Aliento",
      icon: "icons/magic/nature/elemental-plant-humanoid.webp",
      changes: [
        {
          key: "data.abilities.wis.value",
          mode: 2, // ADD
          value: 4,
        },
      ],
      duration: {
        seconds: 60,
      },
      origin: `${item.data.name}`,
    };

    await actor.createEmbeddedDocuments("ActiveEffect", [effectData]);

    ChatMessage.create({
      content: `¡Último Aliento! Nerine recupera ${healing} puntos de vida y gana +4 de Sabiduría durante 60 segundos.`,
      speaker: ChatMessage.getSpeaker({ actor: actor }),
    });
  } 
}