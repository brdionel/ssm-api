const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.listen(8000, () => {
  console.log('Server is running on port 8000');
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const router = require('./api/router/router');
router(app);
