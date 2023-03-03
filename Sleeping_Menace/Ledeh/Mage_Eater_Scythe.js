let actor = await game.actors.get("9PgXuec1aIZsJOAi"); // Ledeh
let weapon = actor.items.find(i => i.id === "2YaUHB0xMGlsx9uG"); // Mage Eater Scythe
let item1 = actor.items.find(i => i.id === "3Zsqs65UtNazwLCU"); // Hex
let item2 = actor.items.find(i => i.id === "MmXm7q45awgBfpNR"); // Hexblade Curse
let item3 = actor.items.find(i => i.id === "s00TpSYmoukdtz6C"); // Booming Blade
let item4 = actor.items.find(i => i.id === "zeXk1om7djyrVxwY"); // Mage Eater Damage

let hitDices = actor.system.attributes.hd;

let displayValue;
let optionsValue;
console.log(weapon);
if (hitDices > 1) {
  displayValue = "block";
  optionsValue = '';
  if (hitDices == 3) {
    optionsValue = '<option value="option3">3</option>';
  } 
  if (hitDices > 3){
    optionsValue = '<option value="option3">3</option><option value="option4">4</option>';
  }
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
    <div id="scythe-container" style="display: ${displayValue};">
      <br>
      <label for="scythe">Mage Eater Scythe (Consume Hit Dices)</label>
      <div style="display: flex; align-items: center;">
        <select id="scythe" name="scythe">
          <option value="option0">0</option>
          <option value="option2">2</option>
          ${optionsValue};
        </select>
        <div style="margin-left: 10px;">
          <input type="checkbox" id="spell" name="spell" value="spell used">
          <label for="spell">¿El enemigo ha usado un hechizo?</label>
        </div>
      </div>
    </div>
  </div>
  <br>
</div>
`;

new Dialog({
  title: "Ataque con Mage Eater Scythe",
  content: dialogTemplate,
  buttons: {
    ok: {
      label: "Atacar",
      callback:      
      async (html) => {
        let hex = html.find("#hex").prop("checked");
        let hexblade = html.find("#hexblade").prop("checked");
        let booming = html.find("#booming").prop("checked");
        let scytheValue = html.find("#scythe").val();
        let spell = html.find("#spell").prop("checked");

        // Realiza acciones en función de las checkboxes seleccionadas
        if (await hex) {
          await item1.use();
        }
        if (await hexblade) {
          await actor.update({"flags.dnd5e.weaponCriticalThreshold": 19});
          await item2.use();
        }
        if (await booming) {
          await item3.use();
        }
        
        if (await scytheValue === "option2") {
          await weapon.update({"system.consume.target": "smallest"});
          await weapon.update({"system.consume.amount": 2});
          if (await spell) {
            await weapon.update({"system.formula": "2d10[Necrotic]"});
          } else {
            await weapon.update({"system.formula": "2d6[Necrotic]"});
          }
        }
        if (await scytheValue === "option3") {
          await weapon.update({"system.consume.target": "smallest"});
          await weapon.update({"system.consume.amount": 3});
          if (await spell) {
            await weapon.update({"system.formula": "3d10[Necrotic]"});
          } else {
            await weapon.update({"system.formula": "3d6[Necrotic]"});
          }        
        }
        if (await scytheValue === "option4") {
          await weapon.update({"system.consume.target": "smallest"});
          await weapon.update({"system.consume.amount": 4});
          if (await spell) {
            await weapon.update({"system.formula": "4d10[Necrotic]"});
          } else {
            await weapon.update({"system.formula": "4d6[Necrotic]"});
          }        
        }        
        await weapon.use()
        if (await hexblade) {
          await actor.update({"flags.dnd5e.weaponCriticalThreshold": 20});
        }
        await weapon.update({"system.formula": ""});
          await weapon.update({"system.consume.target": ""});
          await weapon.update({"system.consume.amount": 0});
      },
    },
    cancel: {
      label: "Cancelar",
    },
  },
}).render(true);