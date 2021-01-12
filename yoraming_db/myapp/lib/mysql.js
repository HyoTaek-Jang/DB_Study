const db = require("mysql");

const connection = db.createConnection({
  host: "localhost",
  user: "root",
  password: "wkdWkddl1218",
  database: "dbstudy",
});

connection.connect();

module.exports = connection;
