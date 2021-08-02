const express = require('express');
const app = express();
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

app.use(express.static(path.resolve('../frontend/build/')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve('../frontend/build/index.html'));
});

app.listen(process.env.PORT);
