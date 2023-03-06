let actor = await game.actors.get("dib6SGETeIV6hC3I"); // Bramdhor
let weapon = actor.items.find(i => i.id === "wUoqYVSew5EnccMv"); // Hammer of Eruptions
let final = actor.items.find(i => i.id === "eBgfo4n2ePYocai5"); // Final Attack

let dialogTemplate = `
<div>  
  <h3 style="text-align:center">Elige el Turno Actual</h3>
  <div style="margin-left: 4em;"> 
    <div id="eruptions-container">
      <label for="hammer">Turno de Erupción</label>
      <br>
      <div style="display: flex; align-items: center;">
        <select id="eruptions" name="eruptions">
          <option value="option0">Primer Turno</option>
          <option value="option1">Segundo Turno</option>
          <option value="option2">Tercer Turno</option>
          <option value="option3">Ataque Final</option>
        </select>
      </div>
    </div>
  </div>
  <br>
</div>
`;

new Dialog({
  title: "Ataque con Hammer of Eruptions",
  content: dialogTemplate,
  buttons: {
    ok: {
      label: "Atacar",
      callback:      
      async (html) => {
        
        let turnValue = html.find("#eruptions").val();
        
        if (await turnValue === "option0") {
          await weapon.update({"system.damage.parts": [["1d6 + @mod", "bludgeoning"], ["1d6", "fire"]]});
          await weapon.use()
          await weapon.update({"system.damage.parts": [["1d6 + @mod", "bludgeoning"], ["0", "fire"]]});
        }
        if (await turnValue === "option1") {
          await weapon.update({"system.damage.parts": [["1d6 + @mod", "bludgeoning"], ["2d6", "fire"]]});
          await weapon.use()
          await weapon.update({"system.damage.parts": [["1d6 + @mod", "bludgeoning"], ["0", "fire"]]});
        }
        if (await turnValue === "option2") {
          await weapon.update({"system.damage.parts": [["1d6 + @mod", "bludgeoning"], ["3d6", "fire"]]});
          await weapon.use()
          await weapon.update({"system.damage.parts": [["1d6 + @mod", "bludgeoning"], ["0", "fire"]]});
        }
        if (await turnValue === "option3") {
          await final.use()
        }
      }
    },
    cancel: {
      label: "Cancelar",
    },
  },
}).render(true);