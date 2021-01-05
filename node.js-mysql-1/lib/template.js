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
    tag = ``;
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
};
