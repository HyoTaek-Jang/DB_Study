var path = require("path");
var db = require("./db.js");
var template = require("./template.js");
var url = require("url");
const { tableList } = require("./template.js");
var qs = require("querystring");
const { request } = require("http");

exports.home = (request, response) => {
  db.query("SELECT * FROM topic", function (error, topics) {
    db.query("SELECT * FROM author", (err, author) => {
      var title = "Welcome";
      var description = "Hello, Node.js";
      var list = template.list(topics);

      let tableList = template.table(author);
      var html = template.HTML(
        title,
        list,
        `${tableList}`,
        `<a href="/author_create">create</a>`
      );
      response.writeHead(200);
      response.end(html);
    });
  });
};

exports.update = (request, response) => {
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  db.query("SELECT * FROM topic", (err, data) => {
    var list = template.list(data);
    db.query("SELECT * FROM author", (err, authors) => {
      let tableList = template.table(authors);
      db.query(
        "SELECT * FROM author WHERE id = ?",
        [queryData.id],
        (err, author) => {
          var html = template.HTML(
            `${author[0].name} - Update`,
            list,
            `<form action="/author_update_process" method="post">
                          <p><input type="text" name="name" value = "${author[0].name}" placeholder="title"></p>
                          <p><input type="hidden" name="id" value = "${author[0].id}"></p>
                          <p>
                            <textarea name="profile" placeholder="description">${author[0].profile}</textarea>
                          </p>
                          <p>
                            <input type="submit">
                          </p>
                        </form>
                        `,
            `<h2>Author update</h2>${tableList}`
          );
          response.writeHead(200);
          response.end(html);
        }
      );
    });
  });
};

exports.update_process = (request, response) => {
  var body = "";
  request.on("data", function (data) {
    body = body + data;
  });
  request.on("end", function () {
    var post = qs.parse(body);
    var name = post.name;
    var profile = post.profile;
    var id = post.id;
    db.query(
      `UPDATE author SET name = "${name}", profile = "${profile}" WHERE id = ${id}`,
      (err, data) => {
        if (err) throw err;
        response.writeHead(302, { Location: `/author` });
        response.end();
      }
    );
  });
};

exports.create = (request, response) => {
  db.query("SELECT * FROM topic", function (error, topics) {
    db.query("SELECT * FROM author", (err, authors) => {
      let tableList = template.table(authors);
      var title = "Create";
      var list = template.list(topics);
      var html = template.HTML(
        title,
        list,
        `
              <form action="/author_create_process" method="post">
                <p><input type="text" name="name" placeholder="name"></p>
                <p>
                  <textarea name="profile" placeholder="profile"></textarea>
                </p>
                <p>
                  <input type="submit">
                </p>
              </form>
            `,
        `<h2>Author create</h2>${tableList}`
      );
      response.writeHead(200);
      response.end(html);
    });
  });
};

exports.create_process = (request, response) => {
  var body = "";
  request.on("data", function (data) {
    body = body + data;
  });
  request.on("end", function () {
    var post = qs.parse(body);
    var name = post.name;
    var profile = post.profile;
    db.query(
      `INSERT INTO author (name, profile) VALUES(?, ?)`,
      [name, profile],
      (err, result) => {
        if (err) throw err;
        response.writeHead(302, { Location: `/author` });
        response.end();
      }
    );
  });
};

exports.delete_process = (request, response) => {
  var body = "";
  request.on("data", function (data) {
    body = body + data;
  });
  request.on("end", function () {
    var post = qs.parse(body);
    var id = post.id;
    var filteredId = path.parse(id).base;
    db.query(
      `DELETE FROM topic WHERE author_id = ?`,
      [filteredId],
      (err, datas) => {}
    );
    db.query(`DELETE FROM author WHERE id = ?`, [filteredId], (err, data) => {
      response.writeHead(302, { Location: `/author` });
      response.end();
    });
  });
};
