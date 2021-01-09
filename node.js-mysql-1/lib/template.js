module.exports = {
  HTML: function (title, list, body, control) {
    return `
    <!doctype html>
    <html>
    <head>
      <title>WEB1 - ${title}</title>
      <meta charset="utf-8">
    </head>
    <body>
      <h1><a href="/">WEB</a></h1>
      <h2>Search</h2>
    <form action="/search_process" method="POST">
        <select name="kind" id="">
            <option value="author">author</option>
            <option value="topic" selected>topic</option>
        </select>
        <input type="text" name="search" placeholder="입력하세요">
        <input type="submit" value="submit">
        <br>
        <h2>
      <a href="/author">author</a>
      </h2>
      ${list}
      ${control}
      ${body}
    </body>
    </html>
    `;
  },
  list: function (filelist) {
    var list = "<ul>";
    var i = 0;
    while (i < filelist.length) {
      list =
        list +
        `<li><a href="/?id=${filelist[i].id}">${filelist[i].title}</a></li>`;
      i = i + 1;
    }
    list = list + "</ul>";
    return list;
  },
  tag: function (authors, author_id) {
    var tag = ``;
    for (let i = 0; i < authors.length; i++) {
      selected = "";
      if (author_id === authors[i].id) {
        selected = " selected";
      }
      tag += `   <option value="${authors[i].id}"${selected}>${authors[i].name}</option>    `;
    }
    return `<select name="author">${tag}</select>`;
  },
  table: function (author) {
    let tableList = `<table border = "1px">
      <tr>
            <td>NAME</td>
            <td>PROFILE</td>
            <td>update</td>
            <td>del</td>
            </tr>`;
    for (i = 0; i < author.length; i++) {
      tableList += `<tr>
        <td>${author[i].name}</td>
        <td>${author[i].profile}</td>
        <td><a href="/author_update?id=${author[i].id}">update</a></td>
        <td>
        <form action="author_delete_process" method="post">
                  <input type="hidden" name="id" value="${author[i].id}">
                  <input type="submit" value="delete">
                </form>
        
        </td>
        </tr>`;
    }
    tableList += `</table>`;

    return tableList;
  },
};
