let actor = await game.actors.get("9PgXuec1aIZsJOAi"); // Ledeh

// Select all his items and filter the Melee Magical Weapons
let itemsEm = actor.items;
let items = itemsEm.filter(item => item.type === "weapon"
                                   && item.system.actionType === "mwak"
                                   && item.system.properties.mgc === true);


// Create the dialog
let dialogTemplate = `
<div>
  <h3 style="text-align:center">Elige tu arma del Pacto</h3>
  <br>
  <div style="text-align:center">
    <select id="option">
      ${items.map(item => `<option value="${item.id}">${item.name}</option>`)}
    </select>
  </div>
  <br>
</div>
`;

new Dialog({
  title: "Arma del Pacto",
  content: dialogTemplate,
  buttons: {
    ok: {
      label: "Seleccionar",
      callback: async (html) => {
        let option = html.find("#option").val();
        let selected = items.find(item => item.id === option);
        if (selected) {
          let selectedItem = await actor.items.find(i => i.id === selected.id);
          if (selectedItem) {
            // Return Weapons to its normal modifier
            await Promise.all(items.map(async (item) => {
              if (item.id !== selected.id) {
                let weapon = await actor.items.find(i => i.id === item.id);
                if (weapon) {
                  if (weapon.system.properties.fin === true) {
                    await weapon.update({ "system.ability": "dex" });
                  } else {
                    await weapon.update({ "system.ability": "str" });
                  }
                }
              }
            }));
            // Realiza acciones en función de la opción seleccionada
            await selectedItem.update({ "system.ability": "cha" });
            ChatMessage.create({
              content: `Ledeh ha seleccionado a ${selected.name} como arma del Pacto`,
              speaker: ChatMessage.getSpeaker({ actor: actor }),
            });
          }
        }
      },
    },
    cancel: {
      label: "Cancelar",
    },
  },
}).render(true);