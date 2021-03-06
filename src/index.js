const express = require('express');
const pdf = require('html-pdf-node');
const ejs = require('ejs');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

const template = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf8');
const content = ejs.render(template, { title: 'Awesome title!' });
fs.writeFile(path.resolve(__dirname, './public/index.html'), content, () => {
  app.use(express.static('src/public'));

  const server = app.listen(port, async () => {
    const url = `http://localhost:${port}`;
    const options = { format: 'A4', path: 'output.pdf' };
    const file = { url };
    await pdf.generatePdf(file, options);

    server.close();
  });
});
