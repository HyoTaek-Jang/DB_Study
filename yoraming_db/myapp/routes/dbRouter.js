const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  console.log("123");
  res.send("db");
});

module.exports = router;
