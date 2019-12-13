const express = require('express');
const session = require('express-session');

let app =  express();
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');
const helmet = require('helmet');
const db = require("./bin/database");
const routes = require("./config/routes");
require("./config/passport")(passport);

app.set('trust proxy', 1);
app.use(session({
    secret: 'old cat',
    cookie: {
    }
}));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

console.log("Starting app");
db.initializeDatabase();

app.use('/api/v1', routes);

module.exports = app;