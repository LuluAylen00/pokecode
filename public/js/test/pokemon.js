async function getPokemon(id = null){
    let result = null;
    try{
        if (!id) {
            let list = await fetch("/api/pokemon/list")
            let resp = await list.json();
            result = resp["pokemon_entries"]
        } else {
            let pokemon = await fetch("/api/pokemon/"+id)
            let resp = await pokemon.json();
            return resp;
        }
    }
    catch(e){
        console.log(e);
    }
    return result
}