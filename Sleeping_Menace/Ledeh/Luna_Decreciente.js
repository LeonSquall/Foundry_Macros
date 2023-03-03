let actor = await game.actors.get("9PgXuec1aIZsJOAi"); // Nerine
let weapon = actor.items.find(i => i.id === "9c8qDjRanervu2f9"); // Luna Decreciente
let item1 = actor.items.find(i => i.id === "3Zsqs65UtNazwLCU"); // Hex
let item2 = actor.items.find(i => i.id === "MmXm7q45awgBfpNR"); // Hexblade Curse
let item3 = actor.items.find(i => i.id === "s00TpSYmoukdtz6C"); // Booming Blade

let dialogTemplate = `
<div>  
  <br>
  <h3 style="text-align:center">Elige tus habilidades</h3>
  <div style="margin-left: 4em;">
    <div>
      <input type="checkbox" id="hex" name="hex" value="Hex">
      <label for="hex">Hex</label>
    </div>
    <div>
      <input type="checkbox" id="hexblade" name="hexblade" value="Hexblade's Curse">
      <label for="hexblade">Hexblade's Curse</label>
    </div>
    <div>
      <input type="checkbox" id="booming" name="booming" value="Booming Blade">
      <label for="booming">Booming Blade</label>
    </div>
  </div>
  <br>
</div>
`;

new Dialog({
  title: "Ataque con Luna Decreciente",
  content: dialogTemplate,
  buttons: {
    ok: {
      label: "Atacar",
      callback:      
      async (html) => {
        let hex = html.find("#hex").prop("checked");
        let hexblade = html.find("#hexblade").prop("checked");
        let booming = html.find("#booming").prop("checked");

        // Realiza acciones en función de las checkboxes seleccionadas
        if (await hex) {
          item1.use();
        }
        if (await hexblade) {
          await actor.update({"flags.dnd5e.weaponCriticalThreshold": 19});
          item2.use();
        }
        if (await booming) {
          item3.use();
        }
        await weapon.use()
        if (await hexblade) {
          await actor.update({"flags.dnd5e.weaponCriticalThreshold": 20});
        }
      },
    },
    cancel: {
      label: "Cancelar",
    },
  },
}).render(true);