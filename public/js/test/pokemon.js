async function getPokemon(id = null){
    let result = null;
    console.log(parseInt(id));
    try{
        if (!id) {
            let list = await fetch("/api/pokemon/list")
            let resp = await list.json();
            result = resp
        } else if(!parseInt(id)){
            let list = await fetch("/api/pokemon/list")
            let resp = await list.json();
            result = resp
            result = result.find(p => p.name.toLowerCase().trim() == id.toLowerCase().trim())
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