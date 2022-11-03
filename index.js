const dotenv = require('dotenv');
const {executeFilesCrudOperations} = require('./services/mongoService');

dotenv.config();

let files = null

executeFilesCrudOperations().then(
    fileCollection => {
        files = fileCollection
        console.log(files)
    }
)

const express = require('express')
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

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

module.exports = {
    app
}