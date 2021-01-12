module.exports = {
  index: (content) => {
    return `
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <h1><a href="/">Main</a></h1>
        <h1><a href="/users">Users</a></h1>
        <h1><a href="/db">DB</a></h1>
        <p>${content}</p>
    
    </body>
    </html>`;
  },
  yoramCheckDB: (data) => {
    body = `
    <form action="/users/save" method="POST">
       <table border = "1">
    <tr>
        <th>ID</th>
        <th>NAME</th>
        <th>CLASSIFICATION</th>
        <th>RECOMMENDED GRADE</th>
        <th>PREREQUISITE</th>
        <th>CREDIT</th>
        <th>GRUOP</th>
        <th>REMARK</th>
        <th>ADD CLASS</th>
    </tr>`;

    for (let i = 0; i < data.length; i++) {
      body += `      <tr>
          <td>${data[i].id}</td>
          <td>${data[i].name}</td>
          <td>${data[i].classification}</td>
          <td>${data[i].recommendedGrade}</td>
          <td>${data[i].prerequisite}</td>
          <td>${data[i].credit}</td>
          <td>${data[i].group}</td>
          <td>${data[i].remark}</td>
          <td><input type="checkbox" name="class" value="${data[i].name}"></td>
      </tr>`;
    }
    body += `</table>
            <input type="submit" value="save" style ="width:120px;hight:60px; font-size:30px;">
            </form>`;

    return body;
  },
  classification: `   <form action="/users/arrange" method="POST">
  <select name="classification" id="" onchange="this.form.submit()">
  <option value="교필">교양필수</option>
  <option value="전필">전공필수</option>
  <option value="전선">전공선택</option>
  </select>
  <input type="submit" value="submit">

</form>`,
  search: `<form action="/users/search" method="POST">
<input name ="search" type="text">
<input type="submit" value="submit">
</form>`,
  yoramDBAll: (data) => {
    body = `
     <table border = "1">
  <tr>
      <th>ID</th>
      <th>NAME</th>
      <th>CLASSIFICATION</th>
      <th>RECOMMENDED GRADE</th>
      <th>PREREQUISITE</th>
      <th>CREDIT</th>
      <th>GRUOP</th>
      <th>REMARK</th>
  </tr>`;

    for (let i = 0; i < data.length; i++) {
      body += `      <tr>
        <td>${data[i].id}</td>
        <td>${data[i].name}</td>
        <td>${data[i].classification}</td>
        <td>${data[i].recommendedGrade}</td>
        <td>${data[i].prerequisite}</td>
        <td>${data[i].credit}</td>
        <td>${data[i].group}</td>
        <td>${data[i].remark}</td>
    </tr>`;
    }
    body += `</table>`;

    return body;
  },
};
