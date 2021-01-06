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
      <a href="/author">author</a>
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
      tag += `   <option value="${i + 1}"${selected}>${
        authors[i].name
      }</option>    `;
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
        <td><a href="/author_del">del</a></td>
        </tr>`;
    }
    tableList += `</table>`;

    console.log(tableList);
    return tableList;
  },
};
