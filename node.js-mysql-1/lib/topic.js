var db = require("./db.js");
var template = require("./template.js");
var url = require("url");
var qs = require("querystring");
var path = require("path");

const { request } = require("http");

exports.home = function (request, response) {
  db.query("SELECT * FROM topic", function (error, topics) {
    var title = "Welcome";
    var description = "Hello, Node.js";
    var list = template.list(topics);
    var html = template.HTML(
      title,
      list,
      `<h2>${title}</h2>${description}`,
      `<a href="/create">create</a>`
    );
    response.writeHead(200);
    response.end(html);
  });
};

exports.page = function (request, response) {
  var _url = request.url;
  var queryData = url.parse(_url, true).query;

  db.query("SELECT * FROM topic", function (error, topics) {
    if (error) throw error;
    db.query(
      `SELECT * FROM topic LEFT JOIN author ON topic.author_id = author.id WHERE topic.id = ?`,
      [queryData.id],
      (err, topic) => {
        if (err) throw error;
        var title = topic[0].title;
        var description = topic[0].description;
        var list = template.list(topics);
        var html = template.HTML(
          title,
          list,
          `<h2>${title}</h2>${description} <h3>by ${topic[0].name} @${topic[0].profile}</h3>`,
          ` <a href="/create">create</a>
                <a href="/update?id=${queryData.id}">update</a>
                <form action="delete_process" method="post">
                  <input type="hidden" name="id" value="${queryData.id}">
                  <input type="submit" value="delete">
                </form>`
        );
        response.writeHead(200);
        response.end(html);
      }
    );
  });
};
exports.create = (request, response) => {
  db.query("SELECT * FROM topic", function (error, topics) {
    db.query("SELECT * FROM author", (err, authors) => {
      var title = "Create";
      var list = template.list(topics);
      var html = template.HTML(
        title,
        list,
        `
              <form action="/create_process" method="post">
                <p><input type="text" name="title" placeholder="title"></p>
                <p>
                  <textarea name="description" placeholder="description"></textarea>
                </p>
  
                <p>
                  ${template.tag(authors)}
                </p>
  
                <p>
                  <input type="submit">
                </p>
              </form>
            `,
        ""
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
    var title = post.title;
    var description = post.description;
    var name = post.author;
    db.query(
      `INSERT INTO topic (title, description, created, author_id) VALUES(?, ?, NOW(), ?)`,
      [post.title, description, post.author],
      (err, result) => {
        if (err) throw err;
        response.writeHead(302, { Location: `/?id=${result.insertId}` });
        response.end();
      }
    );
  });
};

exports.update = (request, response) => {
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  db.query("SELECT * FROM topic", (err, data) => {
    var list = template.list(data);
    db.query(`SELECT * FROM topic WHERE id = ${queryData.id}`, (err, topic) => {
      db.query("SELECT * FROM author", (err, authors) => {
        var html = template.HTML(
          `${topic[0].title} - Update`,
          list,
          "",
          `
            <form action="/update_process" method="post">
              <p><input type="text" name="afterTitle" value = "${
                topic[0].title
              }" placeholder="title"></p>
              <p><input type="hidden" name="id" value = "${queryData.id}"></p>
              <p>
                <textarea name="description" placeholder="description">${
                  topic[0].description
                }</textarea>
              </p>
              <p>
              ${template.tag(authors, topic[0].author_id)}
              </p>
              <p>
                <input type="submit">
              </p>
            </form>
            `
        );
        response.writeHead(200);
        response.end(html);
      });
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
    var afterTitle = post.afterTitle;
    var description = post.description;
    var id = post.id;
    var author = post.author;
    db.query(
      `UPDATE topic SET title = "${afterTitle}", description = "${description}", author_id="${author}" WHERE id = ${id}`,
      (err, data) => {
        if (err) throw err;
        response.writeHead(302, { Location: `/?id=${id}` });
        response.end();
      }
    );
  });
};

exports.delete = (request, response) => {
  var body = "";
  request.on("data", function (data) {
    body = body + data;
  });
  request.on("end", function () {
    var post = qs.parse(body);
    var id = post.id;
    var filteredId = path.parse(id).base;
    db.query(`DELETE FROM topic WHERE id = ?`, [filteredId], (err, data) => {
      response.writeHead(302, { Location: `/` });
      response.end();
    });
  });
};

exports.search_process = (request, response) => {
  var body = ``;
  request.on("data", (data) => {
    body += data;
  });
  request.on("end", () => {
    var post = qs.parse(body);
    var kind = post.kind;
    var search = post.search;
    if (kind == "topic") {
      db.query("SELECT * FROM topic WHERE title = ?", [search], (err, data) => {
        if (data[0] === undefined) {
          response.writeHead(302, { Location: `/` });
          response.end();
        } else {
          response.writeHead(302, { Location: `/?id=${data[0].id}` });
          response.end();
        }
      });
    } else {
      db.query("SELECT * FROM author WHERE name = ?", [search], (err, data) => {
        if (data[0] === undefined) {
          response.writeHead(302, { Location: `/` });
          response.end();
        } else {
          response.writeHead(302, { Location: `/author` });
          response.end();
        }
      });
    }
  });
};
