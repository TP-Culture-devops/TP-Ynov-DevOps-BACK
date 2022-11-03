const dotenv = require('dotenv');
const {executeFilesCrudOperations} = require('./services/mongoService');
const {ObjectId} = require("mongodb");
dotenv.config();
const fs = require('fs')

let files = null

executeFilesCrudOperations().then(
    fileCollection => files = fileCollection
)

const express = require('express');
const console = require('console');
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Bienvenue sur le back !')
})

/*
Renvoie tous les fichiers en base
*/
app.get('/files/', async (req, res) =>  {
    res.send(await files.find().toArray())
})

app.get('/ContentOf/', async (req, res) =>  {
    let fileContent;
    fs.readFile("./files/"+req.query.id, 'utf8', function (err,data) {
    if (err) {
        return console.log(err);
    }
    res.send(data )
    });
    
})

app.get('/download/', async (req, res) =>  {
    res.download("./files/"+req.query.id )
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})