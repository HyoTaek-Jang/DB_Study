var express = require("express");
const template = require("../lib/template");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  html = template.index();
  res.send(html);
});

module.exports = router;
