const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.resolve('../frontend/build/')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve('../frontend/build/index.html'));
});

app.listen(3000);
