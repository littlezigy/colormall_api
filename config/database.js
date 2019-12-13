let config = require("./index");

let dbconfig = config.database;

module.exports = {
    connectionString: dbconfig.connectionString,
    max: 20, 
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000
}