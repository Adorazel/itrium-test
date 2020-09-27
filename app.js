/* eslint-disable import/no-commonjs */
const express = require('express');
const compression = require('compression');
const path = require('path');
/* eslint-enable import/no-commonjs */

const PORT = 5000;

const app = express();

app.use(compression({ level: 9 }));
app.use(express.static(path.join(__dirname, 'client', 'build'), { maxAge: '1y', index: false }));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`));