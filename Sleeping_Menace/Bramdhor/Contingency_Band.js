let actor = await game.actors.get("dib6SGETeIV6hC3I"); // Bramdhor
let item = actor.items.find(i => i.id === "jOLGLDduH8XbC4xY"); // Contingency Band

let current_slot1 = item.flags.world.slot1;
let current_slot2 = item.flags.world.slot2;
let current_slot3 = item.flags.world.slot3;

let button_1_label = "Usar";
let slot1_label = "Vacío..."
let displayEmpty1 = "none";
if (current_slot1 === 0) {
  button_1_label = "Rellenar";
  displayEmpty1 = "block";
} else if (current_slot1 === 1) {
  slot1_label = "Potion of Healing\n2d4+2[Healing]";
} else if (current_slot1 === 2) {
  slot1_label = "Potion of Greater Healing\n4d4+4[Healing]";
} else if (current_slot1 === 3) {
  slot1_label = "Potion of Superior Healing\n8d4+8[Healing]";
} else {
  slot1_label = "Potion of Supreme Healing\n10d4+20[Healing]";
}

let button_2_label = "Usar";
let slot2_label = "Vacío..."
let displayEmpty2 = "none";
if (current_slot2 === 0) {
  button_2_label = "Rellenar";
  displayEmpty2 = "block";
} else if (current_slot2 === 1) {
  slot2_label = "Potion of Healing\n2d4+2[Healing]";
} else if (current_slot2 === 2) {
  slot2_label = "Potion of Greater Healing\n4d4+4[Healing]";
} else if (current_slot2 === 3) {
  slot2_label = "Potion of Superior Healing\n8d4+8[Healing]";
} else {
  slot2_label = "Potion of Supreme Healing\n10d4+20[Healing]";
}

let button_3_label = "Usar";
let slot3_label = "Vacío..."
let displayEmpty3 = "none";
if (current_slot3 === 0) {
  button_3_label = "Rellenar";
  displayEmpty3 = "block";
} else if (current_slot3 === 1) {
  slot3_label = "Potion of Healing\n2d4+2[Healing]";
} else if (current_slot3 === 2) {
  slot3_label = "Potion of Greater Healing\n4d4+4[Healing]";
} else if (current_slot3 === 3) {
  slot3_label = "Potion of Superior Healing\n8d4+8[Healing]";
} else {
  slot3_label = "Potion of Supreme Healing\n10d4+20[Healing]";
}

let dialogTemplate = `
  <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100%; width: 100%;">
    <h3 style="text-align:center">Banda de Contingencia</h3>
    <br>
    <div style="display: flex; flex-direction: row; width: 100%;">
      <div style="flex: 1; text-align: center; margin-left: 15px;">
        <label style="font-size: 1.25rem;">Slot 1</label>
        <hr>
        <p>${slot1_label}</p>
        <select id="slot1_replenish" name="slot1_replenish" style="display: ${displayEmpty1}; margin-left: 15px;">
          <option value="option1">Healing</option>
          <option value="option2">Greater</option>
          <option value="option3">Superior</option>
          <option value="option4">Supreme</option>
        </select>
      </div>
      <div style="flex: 1; text-align: center;">
        <label style="font-size: 1.25rem;">Slot 2</label>
        <hr>
        <p>${slot2_label}</p>
        <select id="slot2_replenish" name="slot2_replenish" style="display: ${displayEmpty2}; margin-left: 15px;">
          <option value="option1">Healing</option>
          <option value="option2">Greater</option>
          <option value="option3">Superior</option>
          <option value="option4">Supreme</option>
        </select>
      </div>
      <div style="flex: 1; text-align: center; margin-right: 15px;">
        <label style="font-size: 1.25rem;">Slot 3</label>
        <hr>
        <p>${slot3_label}</p>
        <select id="slot3_replenish" name="slot3_replenish" style="display: ${displayEmpty3}; margin-left: 15px;">
          <option value="option1">Healing</option>
          <option value="option2">Greater</option>
          <option value="option3">Superior</option>
          <option value="option4">Supreme</option>
        </select>
      </div>
    </div>
    <br>
  </div>
`;


new Dialog({
  title: "Gestión Banda de Contingencia",
  content: dialogTemplate,
  buttons: {
    slot1_button: {
      label: button_1_label,
      callback:
      async (html) => {
        if (current_slot1 === 0) {
          let new_potion = html.find("#slot1_replenish").val();
          if (new_potion === "option1") {
            await item.setFlag("world", "slot1", 1);
          } else if (new_potion === "option2") {
            await item.setFlag("world", "slot1", 2);
          } else if (new_potion === "option3") {
            await item.setFlag("world", "slot1", 3);
          } else if (new_potion === "option4") {
            await item.setFlag("world", "slot1", 4);
          }
        } else {
          if (current_slot1 === 1) {
             await item.update({"system.damage.parts.0": ["2d4+2","healing"]}); 
          } else if (current_slot1 === 2) {
             await item.update({"system.damage.parts.0": ["4d4+4","healing"]}); 
          } else if (current_slot1 === 3) {
             await item.update({"system.damage.parts.0": ["8d4+8","healing"]}); 
          } else if (current_slot1 === 4) {
             await item.update({"system.damage.parts.0": ["10d4+20","healing"]}); 
          }
          await item.use();
          await item.update({"system.damage.parts.0": ["0","healing"]}); 
          await item.setFlag("world", "slot1", 0);         
        }
      },
    },
    slot2_button: {
      label: button_2_label,
      callback:
      async (html) => {
        if (current_slot2 === 0) {
          let new_potion = html.find("#slot2_replenish").val();
          if (new_potion === "option1") {
            await item.setFlag("world", "slot2", 1);
          } else if (new_potion === "option2") {
            await item.setFlag("world", "slot2", 2);
          } else if (new_potion === "option3") {
            await item.setFlag("world", "slot2", 3);
          } else if (new_potion === "option4") {
            await item.setFlag("world", "slot2", 4);
          }
        } else {
          if (current_slot2 === 1) {
             await item.update({"system.damage.parts.0": ["2d4+2","healing"]}); 
          } else if (current_slot2 === 2) {
             await item.update({"system.damage.parts.0": ["4d4+4","healing"]}); 
          } else if (current_slot2 === 3) {
             await item.update({"system.damage.parts.0": ["8d4+8","healing"]}); 
          } else if (current_slot2 === 4) {
             await item.update({"system.damage.parts.0": ["10d4+20","healing"]}); 
          }
          await item.use();
          await item.update({"system.damage.parts.0": ["0","healing"]}); 
          await item.setFlag("world", "slot2", 0);			
	}
      },
    },
    slot3_button: {
      label: button_3_label,
      callback:
      async (html) => {
        if (current_slot3 === 0) {
          let new_potion = html.find("#slot3_replenish").val();
          if (new_potion === "option1") {
            await item.setFlag("world", "slot3", 1);
          } else if (new_potion === "option2") {
            await item.setFlag("world", "slot3", 2);
          } else if (new_potion === "option3") {
            await item.setFlag("world", "slot3", 3);
          } else if (new_potion === "option4") {
            await item.setFlag("world", "slot3", 4);
          }
        } else {
          if (current_slot3 === 1) {
             await item.update({"system.damage.parts.0": ["2d4+2","healing"]}); 
          } else if (current_slot3 === 2) {
             await item.update({"system.damage.parts.0": ["4d4+4","healing"]}); 
          } else if (current_slot3 === 3) {
             await item.update({"system.damage.parts.0": ["8d4+8","healing"]}); 
          } else if (current_slot3 === 4) {
             await item.update({"system.damage.parts.0": ["10d4+20","healing"]}); 
          }
          await item.use();
          await item.update({"system.damage.parts.0": ["0","healing"]}); 
	  await item.setFlag("world", "slot3", 0);		
	}
      },
    },
  },
}).render(true);