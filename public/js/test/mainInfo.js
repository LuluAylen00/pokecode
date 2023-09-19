let cfg = {
    time: 0,
    user: {
        coords: [1,3],
        // coords: [this.coords[0], this.coords[1]],
        element: document.getElementById("user"),
        type: 1,
        image: "",
        face: "right",
        team: 0,
        move: true,
        stats: {
            hp: 25,
            maxHp: 25,
            exp: 0,
            attack: 60
        }
    },
    time: 0,
    mapSize: [8,7],
    busyTiles: [
        [0,0],[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[7,0],
        [0,1],[0,2],[0,3],[0,4],[0,5],
        [7,1],[7,2],[7,3],[7,4],[7,5],
        [0,6],[1,6],[2,6],[3,6],[4,6],[5,6],[6,6],[7,6],
    ],
    units: []
};



function WildPokemon (type, coords, level) {
    let faces = ["up","down","right","left"]
    let div = document.createElement("div");
    div.classList.add("unit");
    
    this.type = type;
    this.face = faces[Math.floor(Math.random()*faces.length)];
    this.coords = coords;
    this.name = getPokemon(type).name;
    this.team = 1;
    this.level = level;
    this.element = div;
    this.move = true;
    this.stats = {
        hp: 10,
        attack: 2,
        exp: 0
    }
}

function runMove(unit){
    // console.log(`Posición teórica ${(unit.coords[1] * 64)}px,${(unit.coords[0] * 64)}px`);
    // console.log(unit.element.style.left, unit.element.style.top);
    unit.element.style.left = `${(unit.coords[0] * 64)}px`
    unit.element.style.top = `${(unit.coords[1] * 64)}px`
    
}

function ChosePokemon (pokemon, prev = {coords:[0,0], face: "down"}) {
    // console.log(pokemon.stats);
    document.getElementById("type").innerHTML = pokemon.id
    let div = document.createElement("div");
    div.setAttribute("id","user");
    // console.log(div);
    this.type = pokemon.id;
    this.name = pokemon.name;
    this.face = prev.face;
    this.coords = prev.coords;
    this.team = 0;
    this.level = cfg.user.level ? cfg.user.level : 1;
    this.element = div;
    this.move = true;
    // console.log(this);
    this.base = {
        hp: pokemon.stats.hp,
        attack: pokemon.stats.attack
    }
    this.stats = {
        hp: Math.round(((((pokemon.stats.hp * 2) * this.level) / 100) + this.level + 10) * 1.2),
        maxHp: Math.round(((((pokemon.stats.hp * 2) * this.level) / 100) + this.level + 10) * 1.2),
        attack: Math.round(((((pokemon.stats.attack * 2) * this.level) / 100) + 5) * 1.2),
        types: pokemon.types,
        exp: 0
    }
    this.name = pokemon.name
}

async function choose(type) {
    
    /*
    <div class="info you">
        <div class="wrap">
          <span class="name name1"></span>
          <span class="level">Lv1</span>
          <span class="health">25/25</span>
          <span class="healthbar_bg"></span>
          <span class="healthbar"></span>
        </div>
    </div>
    */
    // console.log("prev",cfg.user);
    let divCont = cfg.user.element.parentNode;
    cfg.user.element.parentNode.removeChild(cfg.user.element);
    // console.log(cfg.user);
    let otherUser = cfg.user;
    cfg.user = new ChosePokemon(await getPokemon(type), cfg.user);
    cfg.user.base = otherUser.base;
    cfg.user.element = otherUser.element;
    // console.log(cfg.user);
    let newElement = cfg.user.element;
    divCont.appendChild(newElement);


    setImage(cfg.user.face, cfg.user);
    runMove(cfg.user);

    // console.log(cfg.user);
    let name = document.querySelector(".name");
    name.innerHTML = cfg.user.name;
    let level = document.querySelector(".level");
    level.innerHTML = `Lv${cfg.user.level}`;
    let healthbar = document.querySelector(".health");
    healthbar.innerHTML = `${cfg.user.stats.hp}/${cfg.user.stats.maxHp}`;
}