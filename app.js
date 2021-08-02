const express = require('express');
const app = express();
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

app.use(express.static(path.resolve('./build/')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve('./build/index.html'));
});

app.listen(process.env.PORT);
