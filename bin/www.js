const {app} = require('../app');
const { session } = require('../app')
const http = require('http');

console.log("Starting app in ", process.env.NODE_ENV, "mode");

const port = process.env.PORT || 3001;
app.set("port", port);

let httpserver = http.createServer(app);

if(process.env.NODE_ENV !== 'test' && process.env.NODE_ENV!=='devtest') {
    console.log("Will now listen on port");
    
    httpserver.listen(port);

    httpserver.timeout = 500000;

}
function shutdown() {
    console.log("Shutting down server");
    httpserver.removeAllListeners();
    httpserver.close();
    session.close();
}

module.exports = httpserver;