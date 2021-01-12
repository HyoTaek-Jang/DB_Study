const express = require("express");
const template = require("../lib/template");
const router = express.Router();
const db = require("../lib/mysql.js");
const bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: false }));

router.get("/", (req, res) => {
  db.query("SELECT * FROM cyber_ver3", (err, data) => {
    classification = template.classification;
    classification += template.yoramDBAll(data);
    html = template.index(classification);
    res.send(html);
  });
});

router.get("/123", (req, res) => {
  res.send("123");
});

router.post("/arrange", (req, res) => {
  console.log(req.body.classification);
  db.query(
    "SELECT * FROM cyber_ver3 WHERE classification=?",
    [req.body.classification],
    (err, data) => {
      console.log(data);
      classcification = template.classification;
      classcification += template.yoramDBAll(data);
      html = template.index(classcification);
      res.send(html);
    }
  );
});

module.exports = router;
