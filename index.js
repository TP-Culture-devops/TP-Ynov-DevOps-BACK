const dotenv = require("dotenv");
const { executeFilesCrudOperations } = require("./services/mongoService");
const { ObjectId } = require("mongodb");
dotenv.config();
const cors = require("cors");
const fs = require("fs");

let files = null;

executeFilesCrudOperations().then((fileCollection) => (files = fileCollection));

const express = require("express");
const console = require("console");
const app = express();
const port = 3000;
app.use(cors());
app.get("/", (req, res) => {
  res.send("Bienvenue sur le back !");
});

/*
Renvoie tous les fichiers en base
*/
app.get("/files/", async (req, res) => {
  res.send(await files.find().toArray());
});

app.get("/ContentOf/", async (req, res) => {
  let fileContent;
  fs.readFile(
    "./" + process.env.DATA + "/" + req.query.id,
    "utf8",
    function (err, data) {
      if (err) {
        return console.log(err);
      }
      res.send(data);
    }
  );
});

app.get("/Add/", async (req, res) => {
  await files.insertOne(req.body.path, req.body.description);
  var file = files.findOne({ path: req.body.path });
  fs.appendFile(
    "./" + process.env.DATA + "/" + file._id,
    req.body.content,
    function (err) {
      if (err) throw err;
      res.send("Ajout reussi !");
    }
  );
});

app.get("/download/", async (req, res) => {
  res.download("./files/" + req.query.id);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
