async function loadLevel(level) {
    let pokemon = await getPokemon(document.getElementById("type").innerHTML || 1)
    switch (level) {
        case 1: {
            cfg = {
                time: 0,
                user: {
                    base: cfg.user.base,
                    coords: [1,3],
                    // coords: [this.coords[0], this.coords[1]],
                    element: document.getElementById("user"),
                    type: pokemon.id,
                    name: pokemon.name,
                    level: document.getElementById("level").innerHTML || 1,
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
                level: level,
                mapSize: [8,7],
                busyTiles: [
                    [0,0],[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[7,0],
                    [0,1],[0,2],[0,3],[0,4],[0,5],
                    [7,1],[7,2],[7,3],[7,4],[7,5],
                    [0,6],[1,6],[2,6],[3,6],[4,6],[5,6],[6,6],[7,6],
                ],
                units: []
            };
            let prevData = {
                // base: cfg.user.base,
                coords: [1,3],
                // coords: [this.coords[0], this.coords[1]],
                element: document.getElementById("user"),
                // type: document.getElementById("type").innerHTML || 1,
                // level: document.getElementById("level").innerHTML || 1,
                // image: "",
                face: "right",
                // team: 0,
                // move: true,
                // stats: {
                //     hp: 25,
                //     maxHp: 25,
                //     exp: 0,
                //     attack: 60
                // }
            }
            // cfg.user = ChosePokemon(await getPokemon(document.getElementById("type").innerHTML || 1, cfg.user))
            let units = document.querySelectorAll(".unit");
            for (let i = 0; i < units.length; i++) {
                const element = units[i];
                element.remove();
            }
            // if (cfg.user.element) {
                // console.log(cfg.user.element);
                reset(cfg.user, cfg.user.element)
                render(cfg.user)
                // console.log(cfg.user.element);
            // }
            setImage(cfg.user.face,cfg.user)
            cfg.units.push(new WildPokemon(1, [3,4]))
            cfg.units.push(new WildPokemon(4, [5,4]))
            cfg.units.push(new WildPokemon(7, [5,2]))
            renderTerrain()
            break;
        }
        case 2: {
            cfg = {
                time: 0,
                user: {
                    coords: [1,3],
                    // coords: [this.coords[0], this.coords[1]],
                    element: document.getElementById("user"),
                    type: document.getElementById("type").innerHTML || 1,
                    level: document.getElementById("level").innerHTML || 1,
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
                level: level,
                mapSize: [8,7],
                busyTiles: [
                    [0,0],[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[7,0],
                    [0,1],[0,2],[0,3],[0,4],[0,5],
                    [7,1],[7,2],[7,3],[7,4],[7,5],
                    [0,6],[1,6],[2,6],[3,6],[4,6],[5,6],[6,6],[7,6],
                ],
                units: []
            };
            let units = document.querySelectorAll(".unit");
            for (let i = 0; i < units.length; i++) {
                const element = units[i];
                element.remove();
            }
            cfg.units.push(new WildPokemon(4, [5,4]))
            cfg.units.push(new WildPokemon(7, [5,2]))
            renderTerrain()
            break;
        }
        case 3: {
            cfg = {
                time: 0,
                user: {
                    coords: [1,3],
                    // coords: [this.coords[0], this.coords[1]],
                    element: document.getElementById("user"),
                    type: document.getElementById("type").innerHTML || 1,
                    level: document.getElementById("level").innerHTML || 1,
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
                level: level,
                mapSize: [8,7],
                busyTiles: [
                    [0,0],[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[7,0],
                    [0,1],[0,2],[0,3],[0,4],[0,5],
                    [7,1],[7,2],[7,3],[7,4],[7,5],
                    [0,6],[1,6],[2,6],[3,6],[4,6],[5,6],[6,6],[7,6],
                ],
                units: []
            };
            let units = document.querySelectorAll(".unit");
            for (let i = 0; i < units.length; i++) {
                const element = units[i];
                element.remove();
            }
            cfg.units.push(new WildPokemon(4, [5,4]))
            cfg.units.push(new WildPokemon(7, [5,2]))
            renderTerrain()
            break;
        }
        default:
            break;
    }
}

let levels = {
    1: () => {
        
    },
    2: () => {

    },
    3: () => {

    },
    4: () => {

    },
}