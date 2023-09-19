const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path")

app.listen(process.env.PORT || 3418, ()=> console.log(`Servidor corriendo en el puerto ${process.env.PORT || 3418}`))

app.use(express.static(path.resolve(__dirname, "../public")));

app.get("/", (req,res) => {
    return res.sendFile(path.resolve(__dirname, "./views/index.html"))
})

app.get("/test", (req,res) => {
    return res.sendFile(path.resolve(__dirname, "./views/test.html"))
})

app.get("/api/pokemon/list", (req, res) => {
    let result = JSON.parse(fs.readFileSync(path.resolve(__dirname, "./data/pokemon.json"),"utf-8"))
    res.json(result)
})

app.get("/api/pokemon/:id", (req, res) => {
    let result = JSON.parse(fs.readFileSync(path.resolve(__dirname, "./data/pokemon.json"),"utf-8"))
    let poke = result.find(p => p.id == req.params.id)
    res.json(poke)
})

app.get("/api/types/list", (req, res) => {
    let result = JSON.parse(fs.readFileSync(path.resolve(__dirname, "./data/types.json"),"utf-8"))
    res.json(result)
})

app.get("/api/types/:id", (req, res) => {
    let result = JSON.parse(fs.readFileSync(path.resolve(__dirname, "./data/types.json"),"utf-8"))
    let type = result.find(p => p.id == req.params.id)
    res.json(type)
})

app.use((req,res,next) => {
    return res.redirect("/");
})
