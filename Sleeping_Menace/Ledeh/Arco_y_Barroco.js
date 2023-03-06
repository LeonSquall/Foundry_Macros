let actor = await game.actors.get("9PgXuec1aIZsJOAi"); // Nerine
let weapon = actor.items.find(i => i.id === "vwrSwwOLxmpvWU6C"); // Arco y Barroco
let item1 = actor.items.find(i => i.id === "3Zsqs65UtNazwLCU"); // Hex
let item2 = actor.items.find(i => i.id === "MmXm7q45awgBfpNR"); // Hexblade Curse
let item3 = actor.items.find(i => i.id === "s00TpSYmoukdtz6C"); // Booming Blade

let bardic = actor.items.find(i => i.id === "VChsoZzlJ2GgXE8C"); // Bardic Inspiration
const bardicUses = bardic.system.uses.value;

let displayValue;

if (bardicUses > 0) {
  displayValue = "block";
} else {
  displayValue = "none";
}

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
    <div id="hoja-container" style="display: ${displayValue};"> 
      <input type="checkbox" id="hoja" name="hoja" value="Hoja Musical">
      <label for="hoja">Hoja Musical (Consume Inspiración Bárdica)</label>
    </div>
  </div>
  <br>
</div>
`;

new Dialog({
  title: "Ataque con Arco y Barroco",
  content: dialogTemplate,
  buttons: {
    ok: {
      label: "Atacar",
      callback:      
      async (html) => {
        let hex = html.find("#hex").prop("checked");
        let hexblade = html.find("#hexblade").prop("checked");
        let booming = html.find("#booming").prop("checked");
        let hoja = html.find("#hoja").prop("checked");


        // Realiza acciones en función de las checkboxes seleccionadas
        if (await hex) {
          item1.use();
        }
        if (await hexblade) {
          await actor.update({"flags.dnd5e.weaponCriticalThreshold": 19});
          await item2.use();
        }
        if (await booming) {
          await item3.use();
        }
        if (await hoja) {
          await bardic.update({"system.uses.value": bardicUses - 1});
          await weapon.update({"system.attackBonus": "@abilities.cha.mod"});
          await weapon.update({"system.damage.parts.0": ["1d8 + @mod + @item.attackBonus", "piercing"]});          
        }
        
        await weapon.use()
        if (await hexblade) {
          await actor.update({"flags.dnd5e.weaponCriticalThreshold": 20});
        }
        if (await hoja) {
          await weapon.update({"system.attackBonus": ""});
          await weapon.update({"system.damage.parts.0": ["1d8 + @mod", "piercing"]});          
        }
      },
    },
    cancel: {
      label: "Cancelar",
    },
  },
}).render(true);