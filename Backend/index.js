const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Enable CORS
const cors = require("cors");
app.use(cors());

const routes = require('./route/routes')

app.use(bodyParser.json());

app.use('/', routes);

console.log('DINESH    99999  sdcas  xcascsa')

app.listen(3007, () => {
    console.log('Server started on port 3007...');
  });