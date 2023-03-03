let actor = await game.actors.get("dib6SGETeIV6hC3I"); // Bramdhor
let weapon = actor.items.find(i => i.id === "lvOVqH0WuCVJVpXg"); // Ring of the Ram

let usesCharges = weapon.system.uses.value;

let displayValue;
let optionsValue;

if (usesCharges > 0) {
  displayValue = "block";
  optionsValue = '';
  if (usesCharges == 3) {
    optionsValue = '<option value="option1">1</option><option value="option2">2</option><option value="option3">3</option>';
  } 
  if (usesCharges == 2){
    optionsValue = '<option value="option1">1</option><option value="option2">2</option>';
  }
  if (usesCharges == 1) {
    optionsValue = '<option value="option1">1</option>';
  }
} else {
  displayValue = "none";
}

let dialogTemplate = `
<div>  
  <h3 style="text-align:center">Elige el número de cargas</h3>
  <div style="margin-left: 4em;"> 
    <div id="ram-container" style="display: ${displayValue};">
      <label for="scythe">Ring of the Ram (Remaining Charges)</label>
      <br>
      <div style="display: flex; align-items: center;">
        <select id="ram" name="ram">
          ${optionsValue};
        </select>
      </div>
    </div>
  </div>
  <br>
</div>
`;

new Dialog({
  title: "Ataque con Ring of The Ram",
  content: dialogTemplate,
  buttons: {
    ok: {
      label: "Atacar",
      callback:      
      async (html) => {
        
        let ramValue = html.find("#ram").val();
        
        if (await ramValue === "option1") {
          await weapon.use()
        }
        if (await ramValue === "option2") {
          await weapon.update({"system.uses.value": usesCharges-1});
          await weapon.update({"system.damage.parts.0": ["4d10", "force"]});
          await weapon.use()
          await weapon.update({"system.damage.parts.0": ["2d10", "force"]});
        }
        if (await ramValue === "option3") {
          await weapon.update({"system.uses.value": usesCharges-2});
          await weapon.update({"system.damage.parts.0": ["6d10", "force"]});
          await weapon.use()
          await weapon.update({"system.damage.parts.0": ["2d10", "force"]});
        } 
      }
    },
    cancel: {
      label: "Cancelar",
    },
  },
}).render(true);