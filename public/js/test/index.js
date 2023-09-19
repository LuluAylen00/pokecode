let divCont = document.getElementById("cont")

function render(state) {
    if (state == "free") {
        return "<img src='/img/maptile0-big.png' />"
    } else if (state == "bush") {
        return "<img src='/img/maptile1-big.png' />"
    } else if ( state == true){
        return "";
    } else {
        state.element.style.backgroundImage = `url('/img/overworld/${state.face}/${state.type}.png')`;
        state.element.style.left = `${state.coords[0] * 64}px`
        state.element.style.top = `${state.coords[1] * 64}px`
        divCont.appendChild(state.element)
        return "<img src='/img/maptile0-big.png' />"
    }
}



function setImage(orientation,unit) {
    // console.log(unit);
    unit.image = `/img/overworld/${orientation}/${unit.type}.png`;
    if (unit.element) {
        unit.element.style.backgroundImage = `url(${unit.image})`;
    }
}

let ul = document.getElementById("poke-list");
let initials = [1,4,7,25,133,152,155,158,252,255,258,387,390,393]
for (let i = 0; i < initials.length; i++) {
    const poke = initials[i];
    let li = document.createElement("li");
    let img = document.createElement("img");
    img.setAttribute("src", `/img/overworld/down/${poke}.png`)
    li.appendChild(img);
    ul.appendChild(li);

    li.addEventListener("click", (e)=> {
        choose(poke, cfg.user.coords)
    })
}



function isBusy(coords) {
    for (let i = 0; i < cfg.busyTiles.length; i++) {
        const tile = cfg.busyTiles[i];
        if (coords[0] == tile[0] && coords[1] == tile[1]) {
            // console.log("Ocupado en x:"+coords[0]+" y:"+coords[1]);
            return "bush";
        };
    };
    for (let i = 0; i < cfg.units.length; i++) {
        const unit = cfg.units[i];
        // console.log(`Comparo ${tile}, con ${coords}`);
        if (coords[0] == unit.coords[0] && coords[1] == unit.coords[1]) {
            return unit;
        };
    };
    if (coords[0] == cfg.user.coords[0] && coords[1] == cfg.user.coords[1]) {
        return "free";
    }
    return false;
}

function renderTerrain() {
    let terrain2 = document.getElementById("terrain2");
    let div = "<div id='table'>"
    for (let i = 0; i < cfg.mapSize[1]; i++) {
        div+= '<div class="row">';
        for (let j = 0; j < cfg.mapSize[0]; j++) {
            let busyElement = isBusy([j,i]);
            if (busyElement) {
                div += render(busyElement);
            } else {
                div += render("free");
            };
        };
        div+="</div>";
    };
    div+="</table>";
    terrain2.innerHTML = div;
}


renderTerrain()
choose(cfg.user.type)
//setImage("down",cfg.user)
// cfg.user.coords = [cfg.user.coords[0], cfg.user.coords[1]]

function checkPosition(unit) { // Verificar si la casilla está dentro del límite y no está ocupada
    // console.log(coords);
    setImage(unit.face,unit)
    // console.log(coords);
    let result = false;
    // console.log(side)
    // console.log(unit.coords);
    switch (unit.face) {
        case "up":
            if ((unit.coords[1]-1) >= 0  && !isBusy([unit.coords[0], unit.coords[1]-1])) {
                result = true;
            };
            break;
        case "down":
            // console.log((unit.coords[1]-1) >= 0);
            // console.log(!isBusy([unit.coords[0], unit.coords[1]+1]));
            // console.log(unit.coords[1]+1);
            if ((unit.coords[1]+1)  < cfg.mapSize[1] && !isBusy([unit.coords[0], unit.coords[1]+1])) {
                result = true;
            };
            break;
        case "left":
            if ((unit.coords[0]-1) >= 0 && !isBusy([unit.coords[0]-1, unit.coords[1]])) {
                result = true;
            };
            break;
        case "right":
            if ((unit.coords[0]+1) < cfg.mapSize[0] && !isBusy([unit.coords[0]+1, unit.coords[1]])) {
                result = true;
            };
            break;
        default:
            break;
    }
    return result;
}

function reset(unit,element) {
    // console.log(unit);
    if (unit.element) {
        
        let newElement = unit.element.cloneNode(false);
        newElement.classList.remove("atk-down");
        newElement.classList.remove("atk-up");
        newElement.classList.remove("atk-right");
        newElement.classList.remove("atk-left");
        // console.log(divCont);
        // console.log(unit.element);
        element.parentNode.removeChild(element);
        unit.element = newElement;
        divCont.appendChild(newElement);
    }
}

function detectProximity(a, b) { // Que tan cerca está B de mi, A
    let result = {
        face: undefined,
        //tiles: ((b.coords[0] - a.coords[0]) * 1) + ((b.coords[1] - a.coords[1])* 1),
        inmediate: false,
        unit: b
    }
    let acc = 0;
    // Lado X
    if (b.coords[0] > a.coords[0]) {
        for (let i = b.coords[0]; i > a.coords[0]; i-- && acc++) {}
    } else if (b.coords[0] < a.coords[0]) {
        for (let i = b.coords[0]; i < a.coords[0]; i++ && acc++) {}
    }
    if (b.coords[1] > a.coords[1]) {
        for (let i = b.coords[1]; i > a.coords[1]; i-- && acc++) {}
    } else if (b.coords[1] < a.coords[1]) {
        for (let i = b.coords[1]; i < a.coords[1]; i++ && acc++) {}
    }
    result.tiles = acc;

    if (result.tiles <= 1 && result.tiles >= -1) {
        result.inmediate = true;
        if (b.coords[0] - a.coords[0] == 0) { // B no está hacia derecha ni izquierda
            if (b.coords[1] - a.coords[1] == 1) { // B abajo inmediato
                result.face = "down";
            } else if (b.coords[1] - a.coords[1] == -1) { // B arriba inmediato
                result.face = "up";
            }
        } else {
            if (b.coords[0] - a.coords[0] == 1) { // B derecha inmediata
                result.face = "right";
            } else if (b.coords[0] - a.coords[0] == -1) { // B izquierda inmediata
                result.face = "left";
            }
        }
        // console.log(result);
    } else if (result.tiles <= 5) {

    }
    // console.log(result.tiles);
    return result;
}

function runAttack(unit) {
    // console.log("Attack");
    // console.log(unit.type + " ataca hacia "+unit.face);
    reset(unit,unit.element);
    unit.element.classList.add(`atk-${unit.face}`);
    radar(unit)
}

function contraryFace(face) {
    let toReturn = ""
    switch (face) {
        case "up":
            toReturn = "down";
            break;
        case "down":
            toReturn = "up";
            break;
        case "left":
            toReturn = "right";
            break;
        case "right":
            toReturn = "left";
            break;
        default:
            break;
    }
    return toReturn;
}

function faint(loser, winner) {
    loser.element.parentNode.removeChild(loser.element);
    cfg.units = cfg.units.filter(u => u != loser)
    delete loser;
    let expPlus = 10
    winner.stats.exp += expPlus
    // console.log(cfg.user);
    if (winner.stats.exp % 25 < expPlus) {
        cfg.user.level++
        cfg.user.stats.maxHp = Math.round(((((cfg.user.base.hp * 2) * cfg.user.level) / 100) + cfg.user.level + 10) * 1.2),
        cfg.user.stats.attack = Math.round(((((cfg.user.base.attack * 2) * cfg.user.level) / 100) + 5) * 1.2),
        document.querySelector("span.level").innerHTML = `Lv${cfg.user.level}`
        healthTo(winner.stats.hp, (winner.stats.hp + 10 <= winner.stats.maxHp) ? 10 : (winner.stats.maxHp - winner.stats.hp), winner.stats.maxHp,winner.stats.hp,(winner.stats.hp + 10) <= 25  ? winner.stats.hp + 10 : 25)
        winner.stats.hp = (winner.stats.hp + 10) <= 25  ? winner.stats.hp + 10 : 25;
    }
}

function runDefense(unit, attacker) {
    // console.log("Attack");
    // console.log(unit.face);
    unit.move = false;
    reset(unit,unit.element);
    setImage(contraryFace(attacker.face), unit);
    unit.element.classList.add(`atk-${attacker.face}`);
    unit.face = contraryFace(attacker.face);
    // console.log(unit.stats);
    // console.log(attacker.stats);
    // console.log(unit.stats.hp);
    // unit.stats.hp -= attacker.stats.attack;
    if (unit.stats.hp <= 0) {
        faint(unit, attacker);
    };
    // console.log("Actual PS", unit.stats.hp);
    if (unit == cfg.user) {
        healthTo(unit.stats.hp, -attacker.stats.attack, unit.stats.maxHp, unit.stats.hp, (unit.stats.hp-attacker.stats.attack));
    };
    unit.stats.hp -= attacker.stats.attack;
}



function radar(u) {
    let units = [cfg.user, ...cfg.units];
    for (let i = 0; i < units.length; i++) {
        const detectedUnit = units[i];
        let scan = detectProximity(u,detectedUnit);
        // console.log(u.face, detectedUnit.face, scan);
        if (scan.inmediate && scan.face == u.face) {
            // console.log("Unidad defendiendo", detectedUnit);
            runDefense(detectedUnit, u)
        }
    }
}




let move = {
    up: (unit)=>{
        unit.face = "up";
        if (unit.move == true) {
            if (checkPosition(unit)) {
                unit.coords[1] --
            }
            runMove(unit);
        } else {
            unit.move = true
        }
    },
    down: (unit)=>{
        // console.log("down");
        // console.log(unit.posY < (cfg.mapSize-1));
        // console.log(cfg.unit);
        unit.face = "down";
        // if (unit.move == true) {
            if (checkPosition(unit)) {
                unit.coords[1] ++
            }
            runMove(unit);
        // } else {
        //     unit.move = true
        // }
    },
    left: (unit)=>{
        unit.face = "left";
        if (unit.move == true) {
            if (checkPosition(unit)) {
                unit.coords[0] --
            }
            runMove(unit);
        } else {
            unit.move = true
        }
    },
    right: (unit)=>{
        unit.face = "right";
        if (unit.move == true) {
            if (checkPosition(unit)) {
                unit.coords[0] ++
            }
            // setTimeout(()=> {
                runMove(unit);
            // } , 1000)
        } else {
            unit.move = true
        }
    },
    attack: (unit)=>{
        runAttack(unit);
    },
}

function cpuRadar(unit) {
    let scan = detectProximity(unit,cfg.user);
    if (scan.inmediate) {
        // console.log(scan.face);
        // move[scan.face](unit);
        // unit.face = scan.face
        return scan;
    } else {
        return false;
    }
}




// document.body.addEventListener("keydown", async (e)=> {

//     let validKey = false;
//     switch (e.key) {
//         case "ArrowUp":
//             move.up(cfg.user);
//             validKey = true;
//             break;
//         case "ArrowDown":
//             move.down(cfg.user);
//             validKey = true;
//             break;
//         case "ArrowLeft":
//             move.left(cfg.user);
//             validKey = true;
//             break;
//         case "ArrowRight":
//             move.right(cfg.user);
//             validKey = true;
//             break;
//         case "z":
//             move.attack(cfg.user);
//             validKey = true;
//             break;
//         default:
//             break;
//     }
//     if (validKey) {
//         defaultTurn();
//         e.preventDefault();
//     }
// })