module.exports = {
  index: () => {
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
    
    </body>
    </html>`;
  },
};
