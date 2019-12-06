const express = require('express');

const app =  express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.unsubscribe(cors());
app.use(express.json);
app.use(bodyParser.json());
module.exports = app;