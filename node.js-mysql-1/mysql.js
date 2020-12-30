var mysql = require("mysql");
//mysql 모듈 사용
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "wkdWkddl1218",
  database: "dbstudy",
});

connection.connect();

connection.query("SELECT * FROM topic", function (error, results, fields) {
  if (error) {
    console.log(error);
  }
  console.log(results);
});

connection.end();
