const express = require("express");
const template = require("../lib/template");
const router = express.Router();
const db = require("../lib/mysql.js");
const bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: false }));

router.get("/", (req, res) => {
  db.query("SELECT * FROM cyber_ver3 order by id", (err, data) => {
    classification = template.yoramDBAll(data);
    html = template.index(classification);
    res.send(html);
  });
});

module.exports = router;
