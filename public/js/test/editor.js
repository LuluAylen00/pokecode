var jsNewEditor = CodeMirror.fromTextArea(document.getElementById("editor"), {
    lineNumbers: true,
    theme: "material",
    styleActiveLine: true,
    matchBrackets: true,
    mode: "javascript",
    autocomplete: true,
    extraKeys: {
        "Ctrl-Space": "autocomplete"
    },
    autoCloseBrackets: true,
    fontSize: "30px",
    // viewportMargin: Infinity,
    indentUnit: 4,
    indentWithTabs: true,
    placeholder: "Ingresa tu código JS aquí",
    tabSize: 4,
    lineWrapping: true,
    // maxHeight: "200px",
    // gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
    fixedGutter: true
});

var customHint = function (cm) {
    var cursor = cm.getCursor ();
    var token = cm.getTokenAt (cursor);
    var start = token.start;
    var end = cursor.ch;
    var line = cursor.line;
    var currentWord = token.string;
  
    var variables = ["pokemon", "chooseInitial"];
    var properties = ["moveUp","moveDown","moveLeft","moveRight","attack"];
  var initials = ["Bulbasaur", "Charmander", "Squirtle", "Pikachu", "Eevee", "Chikorita", "Cyndaquil", "Totodile", "Treecko", "Torchic", "Mudkip", "Turtwig", "Chimchar", "Piplup"]

  // console.log(token.type, currentWord);
  var list = [];
    var word;
  if ((token.type == null || token.type == "variable") && currentWord != "." && currentWord != "(") {
    for (var i = 0; i < variables.length; i++) {
        word = variables[i];
        list.push ({
          text: word, // el nombre de la opción
          type: "object", // el tipo de la opción
          apply: word, // el texto que se agrega al seleccionar la opción
          detail: "macro" // el detalle de la opción
        });
      }
  } else if (token.type == "property" || currentWord == ".") {
    for (var i = 0; i < properties.length; i++) {
        word = properties[i];
        list.push ({
            text: currentWord == "." ? "."+word+"()" : word+"()", // el nombre de la opción
            label: word,
            type: "object", // el tipo de la opción
              apply: function (cm, data) { // la función que se ejecuta al seleccionar la opción
                cm.replaceRange(data.text == "." ? "."+word+"()" : word+"()", data.from, data.to)
              }, // el texto que se agrega al seleccionar la opción
            // apply: currentWord == "." ? "."+word+"()" : word+"()",
            detail: "macro" // el detalle de la opción
          });
        // if (word.indexOf (currentWord) == 0) {
        //   list.push (word);
        // }
      }
  } else if (currentWord == "(" && jsNewEditor.getLine(line).trim().toLowerCase().includes("chooseInitial(".toLowerCase())){
for (var i = 0; i < initials.length; i++) {
        word = initials[i];
        list.push ({
            text: currentWord == "(" ? "("+word+")" : word+")", // el nombre de la opción
            label: word,
            type: "object", // el tipo de la opción
              apply: function (cm, data) { // la función que se ejecuta al seleccionar la opción
                cm.replaceRange(word+")", data.from, data.to)
              }, // el texto que se agrega al seleccionar la opción
            // apply: currentWord == "." ? "."+word+"()" : word+"()",
            detail: "macro" // el detalle de la opción
          });
        // if (word.indexOf (currentWord) == 0) {
        //   list.push (word);
        // }
      }
  }
  
    return {
      list: list,
      from: CodeMirror.Pos (line, start),
      to: CodeMirror.Pos (line, end)
    };
  };

  jsNewEditor.setOption("fontSize", "30px")

jsNewEditor.setOption("hintOptions", {
    hint: customHint, // tu función personalizada para generar sugerencias
    completeSingle: false, // evita completar automáticamente con una sola opción
    showHint: true, // muestra las sugerencias automáticamente
    hintDelay: 0 // espera medio segundo después de escribir para mostrar las sugerencias
  });

jsNewEditor.on("beforeChange", function(instance, change) {
    // var maxLines = 30; // Límite máximo de líneas permitidas
    // var currentLines = instance.lineCount(); // Obtener el número actual de líneas
    // if (change.origin === "+input" && currentLines >= maxLines) {
    // change.cancel(); // Cancelar la inserción de texto
    // }
})

// Make the DIV element draggable:
dragElement(document.getElementById("editor-div"));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "-header")) {
    // if present, the header is where you move the DIV from:
    // document.getElementById(elmnt.id + "-header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    // elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    elmnt.style.cursor = "move";
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    
        let width = elmnt.offsetWidth;

    if (
        elmnt.offsetTop - pos2 >= 0 /*Arriba mayor a 0*/&& elmnt.offsetLeft - pos1 >= 0 /*Izquierda mayor a 0*/
        // elmnt.offsetTop+elmnt.offsetHeight < window.innerHeight && (elmnt.offsetLeft+elmnt.offsetWidth < window.innerWidth || (elmnt.offsetLeft+elmnt.offsetWidth < window.innerWidth && pos1 != -1))
    ) {
        // let top = 
        elmnt.style.top = ((elmnt.offsetTop + elmnt.offsetHeight) < window.innerHeight -3 ? (elmnt.offsetTop - pos2) : (window.innerHeight-elmnt.offsetHeight-5)) + "px";
        elmnt.style.left = ((elmnt.offsetLeft + elmnt.offsetWidth) < window.innerWidth -3?(elmnt.offsetLeft - pos1):(window.innerWidth-elmnt.offsetWidth-5)) + "px";
    }
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    elmnt.style.cursor = "default";
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

function sleep() {
  var delay = 300;
    return new Promise(resolve => setTimeout(resolve, delay));
 }

 let luckyTurns = 0;
async function defaultTurn() { // CPU Move
    // if (cfg.time) {
        // console.log("Turno de CPU");
        cfg.units.forEach(async (unit) => {
            let moves = ["up","down","right","left"];
            let cpu = cpuRadar(unit)
            if (cpu&&cpu.inmediate && cpu.face == unit.face) {
                // console.log(cpu);
                move[cpu.face](unit);
                // unit.face = cpu.face;
                setImage(cpu.face, unit);
                // console.log("CPU ataca");
                move.attack(unit);
                
              } else {
                // move[moves[Math.floor(Math.random()*moves.length)]](unit)
              }
            })
            // cfg.time++;
    // } else {
        // Math.floor(Math.random()*3) == 0 || luckyTurns == 2 ? cfg.time++ : luckyTurns++;
    // }
    // console.log(cfg.time);
    if (cfg.time % 5 == 4) {
        // console.log(cfg.time);
        //cfg.units.push(new WildPokemon(6, [5,6]))
        let newCoords = [Math.floor(Math.random()*cfg.mapSize[0]),Math.floor(Math.random()*cfg.mapSize[1])]
        // console.log();
        // console.log("En las coordenadas "+newCoords+ " el estado es " +isBusy(newCoords));
        // console.log(isBusy(newCoords));
        let ind = 0
        while (isBusy(newCoords) != false) {
            newCoords = [Math.floor(Math.random()*cfg.mapSize[0]),Math.floor(Math.random()*cfg.mapSize[1])]
            ind++
            if (ind > 40) {
                // alert("Todas las casillas están ocupadas")
                break;
            }
        }
        // cfg.units.push(new WildPokemon(Math.floor(Math.random()*350), newCoords))
        // render(cfg.units[cfg.units.length-1])
    }
    
}

 async function executeMovements(movements) {
    
    movements = movements.filter(move => move.trim().length > 0)
    for (var i = 0; i < movements.length; i++) {
       // Perform some task with the current item
       let command = movements[i]

        if (command.includes("pokemon.")) {
            if (command.includes("(") && command.includes(")")) {
                let splitCommand = command.trim().split(".")[1].split("(")[0];
                let quantity = parseInt(command.trim().split("(")[1].split(")")[0]) || 1;
                // console.log(quantity);
                for (let z = 1; z <= quantity; z++) {
                  switch (splitCommand) {
                    case "moveUp": 
                    console.log(cfg.user);
                        move.up(cfg.user);
                        await sleep();
                        break;
                    case "moveDown": 
                        move.down(cfg.user);
                        await sleep();
                        break;
                    case "moveLeft": 
                        move.left(cfg.user);
                        await sleep();
                        break;
                    case "moveRight": 
                        move.right(cfg.user);
                        await sleep();
                        break;
                    case "attack":
                        move.attack(cfg.user);
                        await sleep();
                        break;
                    default:
                        alert(command+ " no es un comando válido")
                  }
                }
            }
        } else if (command.includes("chooseInitial")){
          if (command.includes("(") && command.includes(")")) {
            let splitCommand = command.trim().split("(")[1].split(")")[0];
            console.log(splitCommand);
            let pokemon = await getPokemon(splitCommand);
            console.log(pokemon);
            if (pokemon) {
              choose(splitCommand)
              resetButton.style.display = "none";
              startButton.style.display = "flex";
            } else {
              alert("No se ha encontrado el pokemon "+splitCommand)
            }
          } else {
            alert("El comando "+command+" está mal cerrado")
          }
        }
        defaultTurn()
        await sleep();
        // if (i % 2 == 1) {
        // }
    }
 }

 function resetLevel() {
  // console.log(cfg.user);
    loadLevel(1);
    loadLevel(1);

 }
 resetLevel();

 let resetButton = document.getElementById("reset");
 resetButton.style.display = "none";
 let startButton = document.getElementById("poke-icon");

 resetButton.addEventListener("click", async (e)=> {
   resetLevel();
   render(cfg.user);
    resetButton.style.display = "none";
    startButton.style.display = "flex";
 })
startButton.addEventListener("click", async (e)=> {
  // resetLevel()
  // console.log(jsNewEditor.getValue().split("\n"));
    let commands = jsNewEditor.getValue().split("\n");
    
    executeMovements(commands)
    startButton.style.display = "none";
    resetButton.style.display = "flex";
})