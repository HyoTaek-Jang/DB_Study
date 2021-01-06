var mysql = require("mysql");

var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "wkdWkddl1218",
  database: "dbstudy",
});

db.connect();

module.exports = db;
