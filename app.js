console.log('NODE ENV',process.env.NODE_ENV);

const express = require('express');

let app =  express();
const session = require('express-session');
const pgsessionstore = require('connect-pg-simple')(session);
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');
const helmet = require('helmet');
const db = require("./bin/database");
const routes = require("./config/routes");
require("./config/passport")(passport);
const appconfig = require('./config');
const uuidv1 = require('uuid/v1');

const errorhelper = require("./middlewares/errorhelper");

const sessionConfig = {
    store: new pgsessionstore({
        conString: appconfig.database.connectionString,
        tableName: 'session'
    }),
    name: 'SID',
    secret: uuidv1(),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        sameSite: true
    }
}

app.set('trust proxy', 1);
app.use(session(sessionConfig));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(errorhelper);
app.use(passport.initialize());
app.use(passport.session());

console.log("Starting app");
db.initializeDatabase();

app.use('/api/v1', routes);

module.exports = { app, session: sessionConfig.store}
