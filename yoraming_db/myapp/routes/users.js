const express = require("express");
const template = require("../lib/template");
const router = express.Router();
const db = require("../lib/mysql.js");
const bodyParser = require("body-parser");
const { classification } = require("../lib/template");

router.use(bodyParser.urlencoded({ extended: false }));

// router.use((req, res, next) => {
//   console.log(req.body);
//   res.send("♥사랑해 능력자 용진♥나만의 어벤져스♥");
// });

router.post("/", (req, res) => {
  console.log(req.body);
  res.redirect("/");
});

router.get("/", (req, res) => {
  db.query("SELECT * FROM cyber_ver3", (err, data) => {
    db.query("SELECT * FROM user order by id", (err, user) => {
      let classification = ``;
      if (user != undefined) {
        userList = template.yoramDBAll(user);
        classification += userList;
        classification += `    <form action="/users/deleteAll" method="POST">
        <input type="submit" value="DELETE ALL">
</form>`;
      }
      classification += template.classification;
      classification += template.search;
      classification += template.yoramCheckDB(data);
      html = template.index(classification);
      res.send(html);
    });
  });
});

router.post("/deleteAll", (req, res) => {
  db.query("DELETE FROM user", (err, data) => {
    res.redirect("/users");
  });
});

router.post("/arrange", (req, res) => {
  db.query(
    "SELECT * FROM cyber_ver3 WHERE classification=?",
    [req.body.classification],
    (err, data) => {
      db.query("SELECT * FROM user", (err, user) => {
        let classification = ``;
        if (user != undefined) {
          userList = template.yoramDBAll(user);
          classification += userList;
          classification += `    <form action="/users/deleteAll" method="POST">
          <input type="submit" value="DELETE ALL">
  </form>`;
        }
        classification += template.classification;
        classification += template.search;
        classification += template.yoramCheckDB(data);
        html = template.index(classification);
        res.send(html);
      });
    }
  );
});

router.post("/search", (req, res) => {
  db.query(
    "SELECT * FROM cyber_ver3 WHERE name like ?",
    [`%${req.body.search}%`],
    (err, data) => {
      db.query("SELECT * FROM user", (err, user) => {
        let classification = ``;
        if (user != undefined) {
          userList = template.yoramDBAll(user);
          classification += userList;
          classification += `    <form action="/users/deleteAll" method="POST">
          <input type="submit" value="DELETE ALL">
  </form>`;
        }
        classification += template.classification;
        classification += template.search;
        classification += template.yoramCheckDB(data);
        html = template.index(classification);
        res.send(html);
      });
    }
  );
});

router.get("/exam", (req, res) => {
  res.send("blaahal");
});

router.post("/save", (req, res) => {
  body = ``;
  console.log(req.body.class);
  for (var value of req.body.class) {
    console.log(value);
    db.query(
      "SELECT * FROM cyber_ver3 WHERE name = ?",
      [value],
      (err, data) => {
        console.log(data);

        db.query(
          "INSERT INTO user VALUES(?,?,?,?,?,?,?,?)",
          [
            data[0].id,
            data[0].name,
            data[0].classification,
            data[0].recommendedGrade,
            data[0].prerequisite,
            data[0].credit,
            data[0].group,
            data[0].remark,
          ],
          (err, insertedData) => {}
        );
      }
    );
  }
  res.redirect("/users");
});

module.exports = router;
